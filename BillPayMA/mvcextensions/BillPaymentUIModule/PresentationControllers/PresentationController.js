define(['CommonUtilities', 'OLBConstants'], function (CommonUtilities, OLBConstants) {

    //Forms
    const frmBillPayActivation = "frmBillPayActivation",
        frmBillPayActivationNotEligible = "frmBillPayActivationNotEligible",
        frmBillPayScheduled = "frmBillPayScheduled",
        frmManagePayees = "frmManagePayees",
        frmBillPayActivationAcknowledgement = "frmBillPayActivationAcknowledgement",
        frmPaymentActivity = "frmPaymentActivity",
        frmPayABill = "frmPayABill",
        frmPayBillConfirm = "frmPayBillConfirm",
        frmPayBillAcknowledgement = "frmPayBillAcknowledgement",
        frmAddPayee1 = "frmAddPayee1",
        frmMakeOneTimePayee = "frmMakeOneTimePayee",
        frmBillPayHistory = "frmBillPayHistory",
        frmBulkPayees = "frmBulkPayees",
        frmBulkBillPayConfirm = "frmBulkBillPayConfirm",
        frmBulkBillPayAcknowledgement = "frmBulkBillPayAcknowledgement",
        frmPayeeDetails = "frmPayeeDetails",
        frmBillPaymentDue = "frmBillPaymentDue",
        frmPaymentDueConfirm = "frmPaymentDueConfirm",
        frmPaymentDueAcknowledgement = "frmPaymentDueAcknowledgement",
        frmVerifyPayee = "frmVerifyPayee",
        frmPayeeAcknowledgement = "frmPayeeAcknowledgement",
        frmMakeOneTimePayment = "frmMakeOneTimePayment",
        frmOneTimePaymentAcknowledgement = "frmOneTimePaymentAcknowledgement",
        frmOneTimePaymentConfirm = "frmOneTimePaymentConfirm";

    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    var MDABasePresenter = kony.mvc.Presentation.BasePresenter;

    /**
     * Description of BillPayment Presentation Controller.
     * @class
     * @alias module:BillPaymentPresentationController
     */
    function BillPaymentPresentationController() {
        //Managers
        this.accountManager = applicationManager.getAccountManager();
        this.asyncManager = applicationManager.getAsyncManager();
        this.billManager = applicationManager.getBillManager();
        this.configurationManager = applicationManager.getConfigurationManager();
        this.formatUtilManager = applicationManager.getFormatUtilManager();
        this.mfaManager = applicationManager.getMFAManager();
        this.navigationManager = applicationManager.getNavigationManager();
        this.paginationManager = applicationManager.getPaginationManager();
        this.presentationUtility = applicationManager.getPresentationUtility();
        this.recipientsManager = applicationManager.getRecipientsManager();
        this.termsAndConditionsManager = applicationManager.getTermsAndConditionsManager();
        this.transactionManager = applicationManager.getTransactionManager();
        this.typeManager = applicationManager.getTypeManager();
        this.userPreferencesManager = applicationManager.getUserPreferencesManager();

        //History configuration
        this.historyConfig = {
            'sortBy': 'transactionDate',
            'defaultSortBy': 'transactionDate',
            'order': OLBConstants.DESCENDING_KEY,
            'defaultOrder': OLBConstants.DESCENDING_KEY,
            'offset': OLBConstants.DEFAULT_OFFSET,
            'limit': OLBConstants.PAGING_ROWS_LIMIT
        };
        //Scheduled configuration
        this.scheduledConfig = {
            'sortBy': 'scheduledDate',
            'defaultSortBy': 'scheduledDate',
            'order': OLBConstants.DESCENDING_KEY,
            'defaultOrder': OLBConstants.DESCENDING_KEY
        };
        //Manage Payee Configuration
        this.managePayeeConfig = {
            'sortBy': 'payeeNickName',
            'defaultSortBy': 'payeeNickName',
            'order': OLBConstants.ASCENDING_KEY,
            'defaultOrder': OLBConstants.ASCENDING_KEY,
            'offset': OLBConstants.DEFAULT_OFFSET,
            'limit': OLBConstants.PAGING_ROWS_LIMIT
        };
        //Payment Due configuration
        this.paymentDueConfig = {
            'sortBy': 'billDueDate',
            'defaultSortBy': 'billDueDate',
            'order': OLBConstants.DESCENDING_KEY,
            'defaultOrder': OLBConstants.DESCENDING_KEY
        };
        // Bulk payees configuration
        this.bulkPayeesConfig = {
            'sortBy': 'payeeNickName',
            'defaultSortBy': 'payeeNickName',
            'order': OLBConstants.ASCENDING_KEY,
            'defaultOrder': OLBConstants.ASCENDING_KEY
        };
        MDABasePresenter.call(this);
    }
    inheritsFrom(BillPaymentPresentationController, MDABasePresenter);

    var featureAction = "BILL_PAY_CREATE";
    var billPaymentLimits = {};
    var payeeTypeList = [];
    var payeeAddressList = [];
    var payeeBalanceList = [];

    /**
     * payee details information
     */
    var payeeDetails = {
        /**
         * initialization
         */
        init: function () {
            this.selectedBillerDetails = {
                billerId: null,
                billerName: null,
                billerCategoryName: null,
                billerAddress: null,
                city: null,
                state: null
            };
            //Biller Details if Biller not present
            this.billerId = null;
            this.billerName = null; //  PayeeName
            this.addressLine1 = null; // (Street)
            this.addressLine2 = null;
            this.address = null;
            this.billerCategoryName = null;
            this.cityName = null;
            //Payee Details
            this.zipCode = null;
            this.accountNumber = null;
            this.policyNumber = null;
            this.mobileNumber = null;
            this.payeeNickName = null;
            this.isBusinessPayee = "";
            this.nameOnBill = null;
            this.note = null;
            this.ackPayABill = "";
        },
        /**
         * used to get the payee details payement screen
         * @returns {object} payement object
         */
        getPayeeDetailsForPayment: function () {
            return {
                billerName: this.billerName,
                billerAddress: this.billerAddress,
                accountNumber: this.accountNumber,
                payeeNickname: this.payeeNickName,
                nameOnBill: this.nameOnBill,
                payeeId: this.payeeId,
                isBusinessPayee: this.isBusinessPayee,
                show: "PayABill"
            };
        },
        /**
         * used to update the selected Biller Details
         * @param {object} biller biller Details
         */
        updateSelectedBiller: function (biller) {
            this.selectedBillerDetails = biller;
        },
        /**
         * used to validate the biller details
         * @param {object} payeeInfo payee information
         * @returns {boolean} status
         */
        isBillerDetailValid: function (payeeInfo) {
            if (payeeInfo.isManualUpdate || (this.selectedBillerDetails.billerName !== null && this.selectedBillerDetails.billerName.trim() !== "" && this.selectedBillerDetails.billerName == payeeInfo.billerName)) {
                return true;
            }
            return false;
        },
        /**
         * used to update the confirmation payee details
         * @param {object} payeeInfo payee information
         */
        updateConfirmPayeeDetails: function (payeeInfo) {
            // If the user input empty retain the default value.
            //if (payeeInfo.payeeNickName.trim() !== "") {
            this.payeeNickName = payeeInfo.payeeNickName;
            // }
            // if (payeeInfo.nameOnBill.trim() !== "") {
            this.nameOnBill = payeeInfo.nameOnBill;
            //  }
            if (payeeInfo.isBusinessPayee !== "") {
                this.isBusinessPayee = payeeInfo.isBusinessPayee;
            }
            this.contractsData = payeeInfo.contractsData;
            this.cif = payeeInfo.cif;
        },
        /**
         * used to get the payee details confirmation screen
         * @returns {object} confirmation information
         */
        getPayeeDetailsConfirmPage: function () {
            return {
                billerName: this.billerName,
                billerAddress: this.billerAddress,
                accountNumber: this.accountNumber,
                payeeNickName: this.payeeNickName,
                nameOnBill: this.nameOnBill,
                isBusinessPayee: this.isBusinessPayee,
                cif: this.cif,
                contractsData: this.contractsData

            };
        },
        /**
         * used to get the one time payment information.
         * @returns {object} one time object
         */
        getOneTimePayeeInfo: function () {
            return {
                billerId: this.billerId,
                billerCategoryName: this.billerCategoryName,
                zipCode: this.zipCode,
                mobileNumber: this.mobileNumber,
                billerName: this.billerName,
                billerAddress: this.billerAddress,
                accountNumber: this.accountNumber,
            };
        },
        /**
         * used to get the request
         * @returns {object} one time object
         */
        getRequestObject: function () {
            return {
                accountNumber: this.accountNumber,
                addressLine1: this.addressLine1,
                addressLine2: this.addressLine2,
                cityName: this.cityName,
                payeeNickName: this.payeeNickName,
                zipCode: this.zipCode,
                companyName: this.billerName,
                notes: this.note,
                isBusinessPayee: this.isBusinessPayee,
                nameOnBill: this.nameOnBill,
                billerId: this.billerId,
                phone: this.mobileNumber,
                state: this.state
            };
        },
        /**
         * used to update the payee.
         * @param {object} payee payee information
         */
        updatePayeeId: function (payee) {
            this.payeeId = payee.payeeId;
        },
        /**
         * used to get the transaction id
         * @returns {string} transactionId
         */
        getTransationId: function () {
            return this.transactionId;
        },
        /**
         * used to get the payee details success screen
         * @returns {object} success object
         */
        getPayeeDetailsSuccessPage: function () {
            return {
                payeeId: this.payeeId,
                billerName: this.billerName,
                billerAddress: this.billerAddress,
                accountNumber: this.accountNumber,
                payeeNickName: this.payeeNickName,
                isBusinessPayee: this.isBusinessPayee,
                nameOnBill: this.nameOnBill
            };
        },
        /**
         * used to get the payee details updated biller information
         * @returns {object} biller details information
         */
        getPayeeDetailsToUpdatePage: function () {
            return {
                billerName: this.billerName,
                billerAddress: this.billerAddress,
                accountNumber: this.accountNumber,
                payeeNickName: this.payeeNickName,
                nameOnBill: this.nameOnBill,
                modify: this.modify
            };
        },
        /**
         * used to update the payee details
         * @param {object} payeeInfo payee information
         */
        updatePayeeDetails: function (payeeInfo) {
            const userObj = applicationManager.getUserPreferencesManager().getUserObj();
            if (payeeInfo.isManualUpdate) {
                this.selectedBillerDetails = null;
                this.billerId = null;
                this.billerName = payeeInfo.billerName;
                this.addressLine1 = payeeInfo.addressLine1;
                this.addressLine2 = payeeInfo.addressLine2;
                this.cityName = payeeInfo.cityName;
                this.billerAddress = this.addressLine1 + " , " + (this.addressLine2 ? (this.addressLine2 + " , ") : " ") + this.cityName + " , " + payeeInfo.zipCode;
                if (payeeInfo.noAccountNumber) {
                    this.note = payeeInfo.note;
                    this.accountNumber = "";
                } else {
                    this.note = null;
                    this.accountNumber = payeeInfo.accountNumber;
                }
                this.mobileNumber = null;
            } else {
                //update selected biller
                this.billerId = this.selectedBillerDetails.billerId;
                this.billerName = this.selectedBillerDetails.billerName;
                this.billerAddress = this.selectedBillerDetails.billerAddress || payeeInfo.zipCode;
                this.billerCategoryName = this.selectedBillerDetails.billerCategoryName;
                this.addressLine1 = null;
                this.addressLine2 = null;
                this.cityName = this.selectedBillerDetails.city;
                this.addressLine1 = this.selectedBillerDetails.billerAddress;
                this.state = this.selectedBillerDetails.state;
                //update account number
                if (this.billerCategoryName == 'Credit Card' || (this.billerCategoryName == 'Utilities')) {
                    this.accountNumber = payeeInfo.accountNumber;
                    this.mobileNumber = null;
                } else if (this.billerCategoryName == 'Phone') {
                    this.accountNumber = payeeInfo.relationShipNumber || payeeInfo.accountNumber;
                    this.mobileNumber = payeeInfo.mobileNumber;
                } else if (this.billerCategoryName == 'Insurance') {
                    this.accountNumber = payeeInfo.accountNumber;
                    this.mobileNumber = payeeInfo.policyNumber || payeeInfo.mobileNumber;
                }
            }
            this.nameOnBill = userObj.userfirstname + " " + userObj.userlastname;
            this.payeeNickName = this.billerName;
            this.zipCode = payeeInfo.zipCode;
            this.modify = payeeInfo.modify;
        },
    };
    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    BillPaymentPresentationController.prototype.initializePresentationController = function () { };

    /**Entry Point method for BillPayModule
     * @param {Object} param.context  - used to load a particular module in billPay
     * @param {Object} param.sender  - used to know the sender, where i get the requested.
     * @param {string} [param.context.History] loads the history flow in  billPay.
     * @param {string} [param.context.PayABill] loads the single billPay screen.
     * @param {string} [param.context.AllPayees] - loads the AllPayees flow in billPay.
     * @param {string} [param.context.ScheduleBills] - loads the scheule Bills flow in billPay.
     * @param {string} [param.context.DueBills] - loads the scheule Bills flow in billPay.
     * @param {string} [param.context.ManagePayees] - loads the managePayees flow in billPay.
     * @param {boolean} param.loadBills -- used to handle the hamburger menu loading
     * @param {object} param.data -- data
     */
    BillPaymentPresentationController.prototype.showBillPaymentScreen = function (param) {
        var scopeObj = this;
        var billPayEligibility = this.userPreferencesManager.checkBillPayEligibilityForUser();
        if (billPayEligibility === "Activated") {
            scopeObj.getBillPaymentLimits();
            switch (param.context) {
                case "ScheduleBills":
                    if (param.loadBills) {
                        scopeObj.loadScheduledPaymentsWithBills();
                    } else {
                        scopeObj.loadScheduledPayments();
                    }
                    break;
                case "ManagePayees":
                    this.showView({
                        form: frmManagePayees,
                        data: {},
                        callbackModelConfig: {
                            managePayees: true
                        }
                    });
                    if (param.loadBills) {
                        scopeObj.loadManagePayeesWithBills();
                    } else {
                        scopeObj.showManagePayees();
                    }
                    break;
                case "PayABill":
                    scopeObj.getTransitDays(param);
                    break;
                case "PayABillWithContext":
                    this.showView({
                        form: frmPayABill,
                        data: {
                            isLoading: true
                        },
                        callbackModelConfig: {
                            payABill: true
                        }
                    });
                    scopeObj.loadPayABillWithPayees(param.data, param.sender);
                    break;
                case "AddPayee":
                    scopeObj.showAddPayee();
                    break;
                case "History":
                    if (param.loadBills) {
                        scopeObj.loadHistoryWithBills();
                    } else {
                        scopeObj.loadHistory();
                    }
                    break;
                case "BulkPayees":
                    if (param.loadBills) {
                        scopeObj.loadBulkPayeesWithBills();
                    } else {
                        scopeObj.loadBulkPayees();
                    }
                    break;
                case "DueBills":
                    scopeObj.loadDueBills();
                    break;
                case "MakeOneTimePayment":
                    scopeObj.loadOneTimePayement(param);
                    break;
                default:
            }
        } else if (billPayEligibility === "NotActivated") {
            scopeObj.showView({
                form: frmBillPayActivation,
                data: {
                    isLoading: true
                },
                callbackModelConfig: {
                    activate: true
                }
            });
            scopeObj.getTnCBillPayActivate();
        } else {
            scopeObj.showView({
                form: frmBillPayActivationNotEligible,
                callbackModelConfig: {
                    notEligible: true
                }
            });
            scopeObj.showBillPayNotEligibleView();
        }
    };
    /**
     * used to show the billPay Page and executes the particular Page.
     * @param {string} frm  used to load the form
     * @param {object}  data  used to load the particular form and having key value pair.
     */
    BillPaymentPresentationController.prototype.getBillPaymentLimits = function () {
        if (Object.keys(billPaymentLimits).length == 0) {
            this.configurationManager.fetchLimitsForAnAction(featureAction, function (respone) {
                billPaymentLimits = respone
            }, function () {
                billPaymentLimits = {};
            });
        }
    };
    /**
     * used to show the holidays in the calender.
     */
    BillPaymentPresentationController.prototype.getHolidays = function () {
        var self = this;
        this.billManager.getHolidays(self.getHolidaysSuccessCallBack, self.getHolidaysErrorCallBack);
    };
    BillPaymentPresentationController.prototype.getHolidaysSuccessCallBack = function (response) {
        var holidays = [];
        if (response) {
            response.forEach(function (data) {
                if (data.holidayDate) {
                    var date = data.holidayDate.split(" ");
                    holidays.push(date[0]);
                }
            });
        }
        this.navigationManager.setCustomInfo("customCalendar", holidays);
    };
    BillPaymentPresentationController.prototype.getHolidaysErrorCallBack = function (response) {
        var holidays = [];
        this.navigationManager.setCustomInfo("customCalendar", holidays);
        this.hideProgressBar();
        this.showView({
            form: frmBulkPayees, 
            data: {
                "serverError": response.err
            },
            callbackModelConfig: {
                bulkPayees: true
            }
        });
    };
    /**
     * used to get bill pay activate terms & conditions
     */
    BillPaymentPresentationController.prototype.getTnCBillPayActivate = function () {
        var self = this;
        self.showProgressBar();
        const params = {
            "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
            "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.BillPay_Activation_TnC
        }
        this.termsAndConditionsManager.fetchTermsAndConditionsPostLogin(params, self.getTnCBillPayActivateSuccess.bind(self), self.getTnCBillPayActivateFailure.bind(self));
    };
    /**
     * success callback for fetch billpay activate terms & conditions  
     * @param {object} response conatins activate billpay TnC
     */
    BillPaymentPresentationController.prototype.getTnCBillPayActivateSuccess = function (response) {
        var scopeObj = this;
        const billPayAcccounts = scopeObj.getSingelBillPaySupportedAccounts();
        scopeObj.showView({
            form: frmBillPayActivation,
            data: {
                "showDeactivatedView": true,
                "billPayAcccounts": billPayAcccounts,
                "TnCcontent": response
            },
            callbackModelConfig: {
                activate: true
            }
        });
        scopeObj.hideProgressBar();
    };
    /**
     * failure callback for fetch billpay activate terms & conditions 
     * @param {object} response cotains error message details
     */
    BillPaymentPresentationController.prototype.getTnCBillPayActivateFailure = function (response) {
        this.hideProgressBar();
        if (response.isServerUnreachable) {
            CommonUtilities.showServerDownScreen();
        } else {
            this.showView({
                form: frmBillPayActivation, 
                data: {
                    "serverError": response
                },
                callbackModelConfig: {
                    activate: true
                }
            });
        }
    };
    /**
     * used to show the billPay Page and executes the particular Page.
     * @param {string} frm  used to load the form
     * @param {object}  data  used to load the particular form and having key value pair.
     */
    BillPaymentPresentationController.prototype.showView = function ({ appName, form, data, callbackModelConfig}) {
        if (kony.application.getCurrentForm().id !== form) {
            // const navObj = { 
            //     context: this,
            //     callbackModelConfig
            // }; 
            // kony.mvc.getNavigationManager().navigate(navObj); 
            const navObj = {
                appName: appName || 'BillPayMA',
                friendlyName: form
            };
            this.navigationManager.navigateTo(navObj);
        }
        if (!this.isEmptyNullOrUndefined(data)) {
            this.navigationManager.updateForm(data, form);
        }
    };
    /**
     * used to update the form with some data.
     * @param {string} frm form to be updated
     * @param {object}  data data to be set in the form
     */
    BillPaymentPresentationController.prototype.updateView = function (data, frm) {
        if (!this.isEmptyNullOrUndefined(data)) {
            this.navigationManager.updateForm(data, frm || kony.application.getCurrentForm().id);
        }
    };
    /**
      * @api : isEmptyNullOrUndefined
      * Verifies if the value is empty, null or undefined
      * data {any} - value to be verified
      * @return : {boolean} - validity of the value passed
      */
    BillPaymentPresentationController.prototype.isEmptyNullOrUndefined = function (data) {
        if (data === null || data === undefined || data === "") return true;
        if (typeof data === "object") {
            if (Array.isArray(data)) return data.length === 0;
            return Object.keys(data).length === 0;
        }
        return false;
    };
    /**
     * Method for used to display the BillPay Not Eligibility View.
     */
    BillPaymentPresentationController.prototype.showBillPayNotEligibleView = function (frm) {
        this.updateView({
            "showNotEligibleView": "showNotEligibleView"
        }, frmBillPayActivationNotEligible);
    };
    /**
     * hideProgressBar - This method is used to hide ProgressBar
     * @param {string} frm form Name
     */
    BillPaymentPresentationController.prototype.hideProgressBar = function () {
        this.updateView({
            isLoading: false
        });
    };
    /**
     * used to show the loading indicator
     * @param {string} frm form Name
     */
    BillPaymentPresentationController.prototype.showProgressBar = function () {
        this.updateView({
            isLoading: true
        });
    };
    /**
     * used to get the transit days
     */
    BillPaymentPresentationController.prototype.getTransitDays = function (param) {
        var scopeObj = this;
        if (param.data && param.data.transitDays) {
            scopeObj.getSingleBillPay(param.data, param.sender);
        } else {
            this.showProgressBar();
            this.recipientsManager.fetchPayeesList({}, this.loadSingleBillPay.bind(this, param), this.loadSingleBillPay.bind(this, param));
        }
    };
    BillPaymentPresentationController.prototype.loadSingleBillPay = function (param, response) {
        this.hideProgressBar();
        var scopeObj = this, transitDays = 0, selectedPayee = param.data;
        if (response && response.length > 0) {
            response.forEach(payee => {
                if (payee.payeeId === selectedPayee.payeeId) transitDays = payee.transitDays;
            });
        }
        param.data.transitDays = transitDays;
        scopeObj.getSingleBillPay(param.data, param.sender);
    };
    /**
     *  used to Navigate the scheduled payments
     */
    BillPaymentPresentationController.prototype.loadScheduledPayments = function () {
        var scopeObj = this;
        scopeObj.showView({
            form: frmBillPayScheduled,
            data: {
                isLoading: true
            },
            callbackModelConfig: {
                scheduled: true
            }
        });
        scopeObj.fetchScheduledBills();
    };
    /**
     *  used to get scheduled bills for user.
     *  @param {object} sortingInputs sorting inputs
     */
    BillPaymentPresentationController.prototype.fetchScheduledBills = function (sortingInputs) {
        var scopeObj = this;
        var params = this.paginationManager.getValues(scopeObj.scheduledConfig, sortingInputs);
        var criteria = {
            "firstRecordNumber": 1,
            "lastRecordNumber": 100,
            "sortBy": params.sortBy,
            "order": params.order
        };
        this.transactionManager.fetchUserBillPayScheduledTransactions(criteria, this.fetchScheduledBillsSuccessCallback.bind(this), this.fetchScheduledBillsErrorCallback.bind(this));
    };
    /**
     * scheduleBillPay success schenario
     * @param {object} response list of schedudle bills
     */
    BillPaymentPresentationController.prototype.fetchScheduledBillsSuccessCallback = function (response) {
        var scopeObj = this;
        var sortingInputs = this.paginationManager.getValues(scopeObj.scheduledConfig);
        scopeObj.updateView({
            'scheduledBills': response,
            "sortingInputs": sortingInputs
        }, frmBillPayScheduled);
    };
    /**
     * scheduleBillPay Error Schenario
     * @param {object} res error object
     */
    BillPaymentPresentationController.prototype.fetchScheduledBillsErrorCallback = function (res) {
        var scopeObj = this;
        scopeObj.showView({
            form: frmBillPayScheduled,
            data: {
                "serverError": res.errorMessage
            },
            callbackModelConfig: {
                scheduled: true
            }
        });
    };
    /**
     * used to load the manage payees with bills
     */
    BillPaymentPresentationController.prototype.loadManagePayeesWithBills = function () {
        var scopeObj = this;
        this.showProgressBar();
        this.paginationManager.resetValues();
        var billParams = [];
        var manageParams = [];
        billParams.push(this.paginationManager.getValues(scopeObj.paymentDueConfig));
        var params = this.paginationManager.getValues(this.managePayeeConfig);
        var criteria = params;
        //     criteria = kony.mvc.Expression.and(
        //       criteria,
        //       kony.mvc.Expression.eq("limit", params.limit),
        //       kony.mvc.Expression.eq("offset", params.offset),
        //       kony.mvc.Expression.eq("sortBy", params.sortBy),
        //       kony.mvc.Expression.eq("order", params.order)
        //     )
        manageParams.push(criteria);
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.recipientsManager, 'fetchPayeesList', manageParams),
                this.asyncManager.asyncItem(this.billManager, 'fetchUserBillPayPendingTransactions', billParams)
            ],
            scopeObj.loadManagePayeeWithBillCompletionCallBack.bind(scopeObj)
        );
    };
    /**
     * used  to load the manage payee with bill success schenario
     * @param {Object} syncResponseObject response
     */
    BillPaymentPresentationController.prototype.loadManagePayeeWithBillCompletionCallBack = function (syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.isAllSuccess()) {
            scopeObj.fetchManagePayeesSuccessCallBack(syncResponseObject.responses[0].data);
            scopeObj.fetchDueBillsSuccessCallBack({
                "dueBills": true,
                "frm": frmManagePayees
            }, syncResponseObject.responses[1].data);
        } else {
            scopeObj.updateView({
                "hideProgressBar": true
            });
            CommonUtilities.showServerDownScreen();
        }
    };
    /**
     * used to show managePayee flow.
     * @param {object} response list of payees
     */
    BillPaymentPresentationController.prototype.fetchManagePayeesSuccessCallBack = function (response) {
        var viewProperties = {};
        if (response.length > 0) {
            this.paginationManager.updatePaginationValues();
            viewProperties.noOfRecords = this.paginationManager.getValues(this.managePayeeConfig);
            viewProperties.managePayee = response;
        } else {
            var values = this.paginationManager.getValues();
            if (values.offset === 0) {
                viewProperties.noHistory = true;
            } else {
                viewProperties.noMoreRecords = true;
                this.hideProgressBar();
            }
        }
        this.updateView({
            "managePayee": viewProperties
        }, "frmManagePayees");
    };
    /**
     * used to show manage payees error schenario
     * @param {object} res error object
     */
    BillPaymentPresentationController.prototype.fetchManagePayeesErrorCallBack = function (response) {
        this.hideProgressBar();
        this.showView({
            form: frmManagePayees, 
            data: {
                "serverError": response.errorMessage
            },
            callbackModelConfig: {
                managePayees: true
            }
        });
    };
    /**
     * handels the dueBills count and total DueBills Amount and dueBills List.
     * @param {boolean} loadBills status of bills loaded or not
     * @param {object} response list of due Bills
     */
    BillPaymentPresentationController.prototype.fetchDueBillsSuccessCallBack = function (loadBills, response) {
        var scopeObj = this;
        var viewProperties = {};
        var billDueData = {
            count: response.length,
            totalDueAmount: 0
        };
        viewProperties.noOfRecords = this.paginationManager.getValues(this.paymentDueConfig);
        if (loadBills.dueBills) {
            billDueData.dueBills = response.map(function (dataItem) {
                billDueData.totalDueAmount += parseFloat(dataItem.dueAmount);
            });
            scopeObj.updateView({
                "billDueData": billDueData
            }, loadBills.frm);
        } else {
            scopeObj.updateView({
                "paymentDueBills": response,
                "noOfRecords": viewProperties.noOfRecords,
                "billPayAccounts": scopeObj.getSingelBillPaySupportedAccounts()
            }, loadBills.frm);
        }
    };
    /**
     * used to hadle the Due Bills Error Schenario
     * @param {object} res error object
     */
    BillPaymentPresentationController.prototype.fetchDueBillsErrorCallBack = function (res) {
        var scopeObj = this;
        scopeObj.showView({
            form: frmBillPaymentDue,
            data: {
                "serverError": res.errorMessage
            },
            callbackModelConfig: {
                duePayment: true
            }
        });
    };
    /**
     * used to get billPayAccounts
     * @returns {object} -- list of bill Pay accounts
     */
    BillPaymentPresentationController.prototype.getSingelBillPaySupportedAccounts = function () {
        var accounts = this.accountManager.getInternalAccounts();
        if (kony.sdk.isNullOrUndefined(accounts) || accounts === "") {
            return [];
        }
        let allowedaccounts =  accounts.filter(function (account) {
            return this.configurationManager.checkAccountAction(account.accountID, "BILL_PAY_CREATE");
        }.bind(this));
        return allowedaccounts.filter(function (account) {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
        })  
    };
    /**
     * used to get billPayAccounts
     * @returns {object} -- list of bill Pay accounts
     */
    BillPaymentPresentationController.prototype.getBulkBillPaySupportedAccounts = function () {
        var accounts = this.accountManager.getInternalAccounts();
        if (kony.sdk.isNullOrUndefined(accounts) || accounts === "") {
            return [];
        }
        let allowedaccounts =  accounts.filter(function (account) {
            return this.configurationManager.checkAccountAction(account.accountID, "BILL_PAY_BULK");
        }.bind(this));
        return allowedaccounts.filter(function (account) {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
        }) 
    };
    /**
     * used to show Manage Payees
     * @param {string} offSetVal used to set offSet Value
     */
    BillPaymentPresentationController.prototype.showManagePayees = function () {
        var scopeObj = this;
        this.showProgressBar();
        this.paginationManager.resetValues();
        scopeObj.managePayeePagination();
    };
    /**
     * used to perform the pagination
     * @param {object} sortingInputs sorting input values
     */
    BillPaymentPresentationController.prototype.managePayeePagination = function (sortingInputs) {
        var params = this.paginationManager.getValues(this.managePayeeConfig, sortingInputs);
        var criteria = params;
        //     criteria = kony.mvc.Expression.and(
        //       criteria,
        //       kony.mvc.Expression.eq("limit", params.limit),
        //       kony.mvc.Expression.eq("offset", params.offset),
        //       kony.mvc.Expression.eq("sortBy", params.sortBy),
        //       kony.mvc.Expression.eq("order", params.order)
        //     )
        this.recipientsManager.fetchPayeesList(criteria, this.fetchManagePayeesSuccessCallBack.bind(this), this.fetchManagePayeesErrorCallBack.bind(this));
    };
    /**
     * used to Format the amount
     * @param {string} amount amount
     * @param {boolean} currencySymbolNotRequired currency symbol required
     * @returns {string} formated amount
     */
    BillPaymentPresentationController.prototype.formatAmount = function (amount, currencySymbolNotRequired) {
        if (currencySymbolNotRequired) {
            return this.formatUtilManager.formatAmount(amount);
        } else {
            return this.formatUtilManager.formatAmountandAppendCurrencySymbol(amount);
        }
    };
    /**
     * used to activte the BillPay and set default billPay Account Number
     * @param {string}  accountNumber Selected BillPay Account Number
     */
    BillPaymentPresentationController.prototype.activateBillPay = function (accountNumber) {
        this.showProgressBar();
        const param = {
            "userName": this.userPreferencesManager.getUserObj().userName
        };
        this.userPreferencesManager.activateBillPay(param, this.activateBillPaySuccess.bind(this, accountNumber), this.activateBillPayFailure.bind(this));
    };
    /**
     * handels the billPay  Activation Success scenario
     *  @param {accountNumber} string Selected BillPay Account Number
     */
    BillPaymentPresentationController.prototype.activateBillPaySuccess = function (accountNumber) {
        this.showView({
            form: frmBillPayActivationAcknowledgement,
            callbackModelConfig: {
                activateAcknowledgement: true
            }
        });
        if (this.configurationManager.defaultBillPayAccountSelection === 'true') {
            this.updateView({
                "showBillPayActivationAck": true
            }, frmBillPayActivationAcknowledgement);
        } else {
            const param = {
                "userName": this.userPreferencesManager.getUserObj().userName,
                "default_account_billPay": accountNumber
            };
            this.userPreferencesManager.updateBillPayPreferedAccountNumber(param, this.updateBillPayPreferedAccountNumberSuccessCallBack.bind(this), this.updateBillPayPreferedAccountNumberFailureCallBack.bind(this));
        }
        this.hideProgressBar();
    };
    /**
     * handels the billPay  Activation Error scenario
     * @param {object} response error response
     */
    BillPaymentPresentationController.prototype.activateBillPayFailure = function (response) {
        var self = this;
        if (response.errorMessage) {
            self.showView({
                form: frmBillPayActivation, 
                data:{
                    "serverError": response.errorMessage
                },
                callbackModelConfig: {
                    activate: true
                }
            });
        } else {
            self.showView({
                form: frmBillPayActivation,
                callbackModelConfig: {
                    activate: true
                }
            });
        }
        this.hideProgressBar();
    };
    /**
     * billPay default Account Number Success Scehnario.
     * @param {param}  param used to send userName with Default BillPay Account Number
     */
    BillPaymentPresentationController.prototype.updateBillPayPreferedAccountNumberSuccessCallBack = function (param) {
        this.updateView({
            "showBillPayActivationAck": true
        }, frmBillPayActivationAcknowledgement);
    };
    /**
     * used to handle the billPay error schenario.
     */
    BillPaymentPresentationController.prototype.updateBillPayPreferedAccountNumberFailureCallBack = function (response) {
        var self = this;
        if (response.errorMessage) {
            self.showView({
                form: frmBillPayActivation, 
                data:{
                    "serverError": response.errorMessage
                },
                callbackModelConfig: {
                    activate: true
                }
            });
        } else {
            self.showView({
                form: frmBillPayActivation,
                callbackModelConfig: {
                    activate: true
                }
            });
        }
    };
    /**
     * Method to cancel transaction occurrence
     * @param {object} transaction object
     */
    BillPaymentPresentationController.prototype.cancelScheduledTransactionOccurrence = function (transaction) {
        this.showProgressBar();
        this.transactionManager.deleteBillPayOcurrenceTransaction(transaction, this.deleteTransactionSuccessCallBack.bind(this), this.deleteTransactionFailureCallBack.bind(this));
    };
    /**
     * used to delete the scheduled  BillPay Transaction
     * @param {object} params transaction object
     */
    BillPaymentPresentationController.prototype.deleteScheduledTransaction = function (params) {
        this.showProgressBar();
        this.transactionManager.deleteBillPayTransaction(params, this.deleteTransactionSuccessCallBack.bind(this), this.deleteTransactionFailureCallBack.bind(this));
    };
    /**
     * handels the transaction success call Back
     * @param {object} response success response
     */
    BillPaymentPresentationController.prototype.deleteTransactionSuccessCallBack = function (response) {
        var scopeObj = this;
        scopeObj.fetchScheduledBills();
        this.hideProgressBar();
    };
    /**
     * handels the transaction delete error call Back
     * @param {object} response error response
     */
    BillPaymentPresentationController.prototype.deleteTransactionFailureCallBack = function (response) {
        var scopeObj = this;
        scopeObj.showView({
            form: frmBillPayScheduled, 
            data: {
                "serverError": response.errorMessage
            },
            callbackModelConfig: {
                scheduled: true
            }
        });
        this.hideProgressBar();
    };
    /**
     * used to load the Scheduled Payements with bills
     */
    BillPaymentPresentationController.prototype.loadScheduledPaymentsWithBills = function (sortingInputs) {
        var scopeObj = this;
        scopeObj.showView({
            form: frmBillPayScheduled,
            data: {
                isLoading: true
            },
            callbackModelConfig: {
                scheduled: true
            }
        });
        this.paginationManager.resetValues();
        var billParams = [];
        var scheduleParams = [];
        billParams.push(this.paginationManager.getValues(scopeObj.paymentDueConfig));
        var params = this.paginationManager.getValues(scopeObj.scheduledConfig, sortingInputs);
        var criteria = {
            "firstRecordNumber": 1,
            "lastRecordNumber": 100,
            "sortBy": params.sortBy,
            "order": params.order
        };
        scheduleParams.push(criteria);
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.transactionManager, 'fetchUserBillPayScheduledTransactions', scheduleParams),
                this.asyncManager.asyncItem(this.billManager, 'fetchUserBillPayPendingTransactions', billParams)
            ],
            scopeObj.loadScheduledPaymentsWithBillsCompletionCallBack.bind(scopeObj)
        );
    };
    /** 
     * Scheduled Payements with bills success callBack
     */
    BillPaymentPresentationController.prototype.loadScheduledPaymentsWithBillsCompletionCallBack = function (syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.isAllSuccess()) {
            scopeObj.fetchScheduledBillsSuccessCallback(syncResponseObject.responses[0].data);
            scopeObj.fetchDueBillsSuccessCallBack({
                "dueBills": true,
                "frm": frmBillPayScheduled
            }, syncResponseObject.responses[1].data);
        } else {
            scopeObj.hideProgressBar();
            CommonUtilities.showServerDownScreen();
        }
    };
    /**
     * Method to fetch all payment activity by a payee
     * @param {object} params payeeId
     */
    BillPaymentPresentationController.prototype.fetchPayeeBills = function (params) {
        this.showProgressBar();
        var billParams = [];
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.billManager, 'fetchUserBillPayPendingTransactions', billParams)
            ], this.fetchPayeeBillsWithDueBillsSuccessCallback.bind(this)
        );
        params.limit = this.configurationManager.payeeBillsLimit;
        this.transactionManager.fetchPayeeBill(params, this.fetchPayeeBillsSuccessCallBack.bind(this, params), this.fetchPayeeBillsErrorCallBack.bind(this));
    };
    /**
     * Method to set DueBills in payment activity
     * @param {object} syncResponseObject contains DueBills data
     */
    BillPaymentPresentationController.prototype.fetchPayeeBillsWithDueBillsSuccessCallback = function (syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.responses[0].data) {
            scopeObj.fetchDueBillsSuccessCallBack({
                "dueBills": true,
                "frm": frmPaymentActivity
            }, syncResponseObject.responses[0].data);
        }
    };
    /**
     * fetch payment activity success callback
     * @param {object} repsponse list of transactions by the payee
     */
    BillPaymentPresentationController.prototype.fetchPayeeBillsSuccessCallBack = function (params, response) {
        this.showView({
            form: frmPaymentActivity,
            data: {
                'data': params,
                'payeeActivities': response
            },
            callbackModelConfig: {
                paymentActivity: true
            }
        });
        this.hideProgressBar();
    };
    /**
     * fetch payment activity failure callback
     * @param {object} response error object
     */
    BillPaymentPresentationController.prototype.fetchPayeeBillsErrorCallBack = function (response) {
        this.showView({
            form: frmManagePayees, 
            data:{
                "serverError": response
            },
            callbackModelConfig: {
                managePayees: true
            }
        });
        this.hideProgressBar();
    };
    /**
     * used to get the default billPay Account Number
     * @returns {accountNumber} accountNumber for BillPay
     */
    BillPaymentPresentationController.prototype.getBillPayPreferedAccountNumber = function () {
        return this.userPreferencesManager.getDefaultAccountforBillPay();
    };
    /**
     * method for getting frequencies
     */
    BillPaymentPresentationController.prototype.getFrequencies = function () {
        var self = this;
        self.frequencies = {
            "Once": "i18n.transfers.frequency.once",
            "Daily": "i18n.Transfers.Daily",
            "Weekly": "i18n.Transfers.Weekly",
            "BiWeekly": "i18n.Transfers.EveryTwoWeeks",
            "Monthly": "i18n.Transfers.Monthly",
            "Quarterly": "i18n.Transfers.Quaterly",
            "Half Yearly": "i18n.Transfers.HalfYearly",
            "Yearly": "i18n.Transfers.Yearly"
        };
        var frequencies = self.frequencies;
        var list = [];
        for (var key in frequencies) {
            if (frequencies.hasOwnProperty(key)) {
                list.push([key, kony.i18n.getLocalizedString(frequencies[key])]);
            }
        }
        return list;
    };
    /**
     * method for getting for howLong values
     */
    BillPaymentPresentationController.prototype.getHowLongValues = function () {
        var self = this;
        var howLongValues = {
            ON_SPECIFIC_DATE: "i18n.transfers.lbxOnSpecificDate",
            NO_OF_RECURRENCES: "i18n.transfers.lblNumberOfRecurrences"
        };
        var list = [];
        for (var key in howLongValues) {
            if (howLongValues.hasOwnProperty(key)) {
                list.push([key, kony.i18n.getLocalizedString(howLongValues[key])]);
            }
        }
        return list;
    };
    /**
     * used to navigate the single BillPayment screen
     * @param {object} data  data
     * @param {string} sender sender
     */
    BillPaymentPresentationController.prototype.getSingleBillPay = function (data, sender) {
        if (sender === "quickAction") {
            this.showView({
                form: frmPayABill,
                data: {
                    "singleBillPayData": data,
                    "context": sender
                },
                callbackModelConfig: {
                    payABill: true
                }
            });
        } else {
            this.showView({
                form: frmPayABill,
                data: {
                    "singleBillPayData": data
                },
                callbackModelConfig: {
                    payABill: true
                }
            });
        }
    };
    /**
     * used to get the termsandconditions.
     * @param {object} data  data
     * @param {string} sender sender
     */
    BillPaymentPresentationController.prototype.getTnCBillPayTransfer = function (tncObj) {
        var self = this;
        this.showProgressBar();
        const params = {
            "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
            "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.BillPay_TnC
        };
        this.termsAndConditionsManager.fetchTermsAndConditionsPostLogin(params, self.getTnCTransferSuccess.bind(self, tncObj), self.getTnCTransferFailure.bind(self));
    };
    /**
     * used to get the termsandconditions success callback.
     * @param {object} data  data
     * @param {string} sender sender
     */
    BillPaymentPresentationController.prototype.getTnCTransferSuccess = function (tncObj, TnCresponse) {
        if (tncObj.isPayDue) {
            this.showView({
                form: frmPaymentDueConfirm,
                data: {
                    "TnCcontentTransfer": TnCresponse,
                    "bulkData": tncObj.data,
                    "context": tncObj.context
                },
                callbackModelConfig: {
                    duePaymentConfirm: true
                }
            });
        } else if (tncObj.isBulkBillPay) {
            this.showView({
                form: frmBulkBillPayConfirm,
                data: {
                    "TnCcontentTransfer": TnCresponse,
                    "bulkData": tncObj.data,
                    "context": tncObj.context
                },
                callbackModelConfig: {
                    bulkPayeesConfirm: true
                }
            });
        } else if (tncObj.isOneTimePayment) {
            this.showView({
                form: frmMakeOneTimePayment,
                data: {
                    "TnCcontentTransfer": TnCresponse,
                    "oneTimeData": tncObj.data,
                    "context": tncObj.context
                },
                callbackModelConfig: {
                    oneTimePayment: true
                }
            });
        } else {
            this.showView({
                form: frmPayBillConfirm,
                data: {
                    "TnCcontentTransfer": TnCresponse,
                    "payABill": tncObj.data,
                    "context": tncObj.context
                },
                callbackModelConfig: {
                    payABillConfirm: true
                }
            });
        }
        this.hideProgressBar();
    };
    /**
     * used to get the termsandconditions failure callback.
     * @param {string} response response
     */
    BillPaymentPresentationController.prototype.getTnCTransferFailure = function (response) {
        this.hideProgressBar();
        if (response.isServerUnreachable) {
            CommonUtilities.showServerDownScreen();
        } else {
            this.updateView({ "serverError": response });
        }
    };
    /**
     * used to navigate the Add Payee screen
     */
    BillPaymentPresentationController.prototype.showAddPayee = function () {
        this.showView({
            form: frmAddPayee1,
            data: {
                "firstLoad": true
            },
            callbackModelConfig: {
                addPayee: true
            }
        });
        this.showProgressBar();
        this.getRegisteredPayeeList(frmAddPayee1);
    };
    /**
     * used to get the registered payees list
     */
    BillPaymentPresentationController.prototype.getRegisteredPayeeList = function (frm) {
        var criteria = {
            "sortBy": "billDueDate",
            "order": "desc"
        };
        //     criteria = kony.mvc.Expression.and(
        //       criteria,
        //       kony.mvc.Expression.eq("sortBy", "billDueDate"),
        //       kony.mvc.Expression.eq("order", "desc")
        //     )
        this.recipientsManager.fetchPayeesList(criteria, this.fetchGetRegisteredPayeeListSuccessCallBack.bind(this, frm), this.fetchGetRegisteredPayeeListErrorCallBack.bind(this, frm));
    };
    /**
     * used to handels the get registered payee success schenario
     * @param {object} response list of payees
     */
    BillPaymentPresentationController.prototype.fetchGetRegisteredPayeeListSuccessCallBack = function (frm, response) {
        var self = this;
        self.showRegisteredPayeeList(frm, response);
    }
    /**
     * used to handels the get registered payees error schenario
     * @param {object} response error response
     */
    BillPaymentPresentationController.prototype.fetchGetRegisteredPayeeListErrorCallBack = function (frm, response) { }
    /**
     * used to show the list of all payees on the screen.
     * @param {object} payeeList list of payees
     */
    BillPaymentPresentationController.prototype.showRegisteredPayeeList = function (frm, payeeList) {
        var self = this;
        /**
         * payee list informtion
         * @param {object} payee payee
         * @returns {object} payeeObj payee object
         */
        var createPayeeList = function (payee) {
            var payeeObj = {
                payeeName: payee.payeeNickName || payee.companyName,
                lastPaidDate: payee.lastPaidDate,
                lastPaidAmount: payee.lastPaidAmount,
                payeeId: payee.payeeId,
                accountNumber: payee.accountNumber,
                billDueDate: payee.billDueDate,
                billid: payee.billid,
                dueAmount: payee.dueAmount,
                payeeNickname: payee.payeeNickName || payee.companyName,
                eBillStatus: payee.eBillStatus,
                isBusinessPayee: payee.isBusinessPayee,
                cif: payee.cif,
                show: "PayABill",
                /**
                 * used to navigate the view details
                 */
                onViewDetailsClick: function () {
                    self.showBillPaymentScreen({
                        context: "ManagePayees"
                    });
                },
                /**
                 * used to navigate the make payement screen
                 */
                onPayBillsClick: function () {
                    self.makePayment(payeeObj);
                }
            };
            return payeeObj;
        };
        self.updateView({
            "registeredPayeeList": payeeList.map(createPayeeList)
        }, frm);
        self.hideProgressBar(frm);
    };
    /**
     * used to navigate the make billPayement screen
     * @param {object} payee payee information
     */
    BillPaymentPresentationController.prototype.makePayment = function (payee) {
        var self = this;
        if (payee) {
            payee.onCancel = self.showBillPaymentScreen.bind(self, {
                context: "BulkPayees",
                loadBills: true
            });
            self.showBillPaymentScreen({
                context: "PayABill",
                "loadBills": true,
                "data": payee
            });
        } else {
            var payeeObj = payeeDetails.getPayeeDetailsForPayment();
            payeeObj.onCancel = self.showBillPaymentScreen.bind(self, {
                context: "BulkPayees",
                loadBills: true
            });
            self.showBillPaymentScreen({
                context: "PayABill",
                "loadBills": true,
                "data": payeeObj
            });
        }
    };
    /**
     * used to fetch the billers
     * @param {string} searchValue search string
     */
    BillPaymentPresentationController.prototype.fetchBillerList = function (searchValue) {
        var self = this;
        if (searchValue === null || searchValue.trim() === "") {
            return;
        }
        self.showProgressBar(frmAddPayee1);
        lastSearchValue = searchValue;
        this.recipientsManager.fetchPayeeSuggestions(searchValue, self.fetchBillerListSuccessCallBack.bind(this, searchValue, frmAddPayee1), self.fetchBillerListFailureCallBack.bind(this, frmAddPayee1));
    };
    /**
     * handels the fetch biller success schenario
     * @param {string} searchValue search value
     * @param {object} response list of billers
     */
    BillPaymentPresentationController.prototype.fetchBillerListSuccessCallBack = function (searchValue, frm, response) {
        var self = this;
        if (lastSearchValue === searchValue) { // because response is async.
            self.hideProgressBar(frm);
            self.getBillerList(frm, response);
        }
    };
    /**
     * handels the fetch biller failure schenario
     * @param {object} response error response
     */
    BillPaymentPresentationController.prototype.fetchBillerListFailureCallBack = function () {
        var self = this;
        self.hideProgressBar(frm);
    };
    /**
     * used to set the biller list
     * @param {object} billersList biller list
     */
    BillPaymentPresentationController.prototype.getBillerList = function (frm, billersList) {
        var self = this;
        /**
         * used to create the biller information
         * @param {object} biller biller object
         * @returns {object} billerObj biller object
         */
        var createBillerList = function (biller) {
            var billerObj = {
                billerName: biller.billerName,
                billerId: biller.id,
                billerCategoryId: biller.billerCategoryId,
                billerCategoryName: biller.billerCategoryName,
                billerAddress: biller.address,
                city: biller.city,
                state: biller.state,
                /**
                 * used to set the biller selection
                 * @returns {object} biller information
                 */
                onBillerSelection: function () {
                    return self.updateBillerDetails(billerObj, frm);
                }
            };
            return billerObj;
        };
        self.updateView({
            "billersList": billersList.map(createBillerList)
        }, frm)
    };
    /**
     * used to update the biller details
     * @param {object} biller biller information
     */
    BillPaymentPresentationController.prototype.updateBillerDetails = function (biller, frm) {
        this.updateView({
            "billerDetails": biller
        }, frm);
        payeeDetails.updateSelectedBiller(biller);
    };
    /**
     * used to update the biller page
     * @param {object} payeeInfo payee information
     */
    BillPaymentPresentationController.prototype.showUpdateBillerPage = function (frm, payeeInfo) {
        if (payeeInfo && !payeeDetails.isBillerDetailValid(payeeInfo)) {
            this.updateView({
                isInvalidPayee: true
            }, frm);
        } else {
            if (payeeInfo) {
                payeeDetails.updatePayeeDetails(payeeInfo);
            }
            this.showView({
                form: frmPayeeDetails,
                data: {
                    "payeeUpdateDetails": payeeDetails.getPayeeDetailsToUpdatePage(),
                    "frm": frm
                },
                callbackModelConfig: {
                    addPayeeDetails: true
                }
            });
        }
    };
    /**
     * used to navigate the make one time payement screen
     * @param {function} isCancelCallBack cancel callback
     */
    BillPaymentPresentationController.prototype.navigateToOneTimePayement = function (isCancelCallBack) {
        if (isCancelCallBack !== true) {
            // payeeDetails.init();
            this.showView({
                form: frmMakeOneTimePayee,
                data: {
                    "initOneTimePayee": true
                },
                callbackModelConfig: {
                    oneTimePayee: true
                }
            });
            this.showProgressBar();
            this.getRegisteredPayeeList();
        } else {
            this.showView({
                form: frmAddPayee1,
                data: {},
                callbackModelConfig: {
                    addPayee: true
                }
            });
        }
    };
    /**f
     * used to navigate the new acount opening flow
     */
    BillPaymentPresentationController.prototype.openNewBillPayAccount = function () {
        var nuoModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NAOModule");
        nuoModule.presentationController.showNewAccountOpening();
    };
    /**
     * used to navigate the new acount opening flow
     */
    BillPaymentPresentationController.prototype.cancelEligibile = function () {
        applicationManager.getModulesPresentationController({ 'appName': 'HomepageMA', 'moduleName': 'AccountsUIModule' }).presentAccountsLanding();
    };
    /**
     * used to load the  history and bills
     */
    BillPaymentPresentationController.prototype.loadHistoryWithBills = function () {
        var scopeObj = this;
        scopeObj.showView({
            form: frmBillPayHistory,
            data: {
                isLoading: true
            },
            callbackModelConfig: {
                history: true
            }
        });
        this.paginationManager.resetValues();
        var billParams = [];
        billParams.push(this.paginationManager.getValues(scopeObj.paymentDueConfig));
        var params = this.paginationManager.getValues(scopeObj.historyConfig);
        var historyParams = [];
        historyParams.push(params);
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.transactionManager, 'fetchUserBillPayPostedTransactions', historyParams),
                this.asyncManager.asyncItem(this.billManager, 'fetchUserBillPayPendingTransactions', billParams)
            ],
            scopeObj.loadHistoryWithBillCompletionCallBack.bind(scopeObj)
        );
    };
    /**
     * used to fetch Both allPayees and BillS success scheanrio
     * @param {Object} syncResponseObject response
     */
    BillPaymentPresentationController.prototype.loadHistoryWithBillCompletionCallBack = function (syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.isAllSuccess()) {
            scopeObj.fetchUserbillPayHistorySuccessCallback(syncResponseObject.responses[0].data);
            scopeObj.fetchDueBillsSuccessCallBack({
                "dueBills": true,
                "frm": frmBillPayHistory
            }, syncResponseObject.responses[1].data);
        } else {
            scopeObj.hideProgressBar();
            CommonUtilities.showServerDownScreen();
        }
    };
    /**
     *  used to Navigate the History payments
     */
    BillPaymentPresentationController.prototype.loadHistory = function () {
        var scopeObj = this;
        scopeObj.showView({
            form: frmBillPayHistory,
            data: {
                isLoading: true
            },
            callbackModelConfig: {
                history: true
            }
        });
        scopeObj.fetchHistory();
    };
    /**
     * used to fetch BillPay History
     */
    BillPaymentPresentationController.prototype.fetchHistory = function () {
        this.paginationManager.resetValues();
        this.fetchUserBillPayHistory();
    };
    /**
     * used to show the billPay History page
     * @param {object} response getting billpay history with pagination
     */
    BillPaymentPresentationController.prototype.fetchUserbillPayHistorySuccessCallback = function (response) {
        var viewProperties = {};
        var scopeObj = this;
        if (response.length > 0) {
            this.paginationManager.updatePaginationValues();
            viewProperties.noOfRecords = this.paginationManager.getValues(this.historyConfig);
            viewProperties.billpayHistory = response;
        } else {
            var values = this.paginationManager.getValues();
            if (values.offset === 0) {
                viewProperties.noHistory = true;
            } else {
                viewProperties.noMoreRecords = true;
                scopeObj.hideProgressBar();
            }
        }
        scopeObj.updateView({
            "billpayHistory": viewProperties
        }, frmBillPayHistory);
    };
    /**
     * used to show the error message
     * @param {object} res error object
     */
    BillPaymentPresentationController.prototype.fetchUserbillPayHistoryErrorCallback = function (res) {
        var self = this;
        self.showView({
            form: frmBillPayHistory, 
            data: {
                "serverError": res.errorMessage
            },
            callbackModelConfig: {
                history: true
            }
        });
    };
    /**
     * used to fetch the history of past bills
     * @param {object} sortingInputs sorting inputs
     */
    BillPaymentPresentationController.prototype.fetchUserBillPayHistory = function (sortingInputs) {
        var self = this;
        self.showView({
            form: frmBillPayHistory,
            data: {
                isLoading: true
            },
            callbackModelConfig: {
                history: true
            }
        });
        var params = this.paginationManager.getValues(this.historyConfig, sortingInputs);
        this.transactionManager.fetchUserBillPayPostedTransactions(params, this.fetchUserbillPayHistorySuccessCallback.bind(this), this.fetchUserbillPayHistoryErrorCallback.bind(this));
    };
    /**
     * used to fetch the history of next past bills
     * pagination next button on-Click
     */
    BillPaymentPresentationController.prototype.fetchNextUserBillPayHistory = function () {
        this.paginationManager.getNextPage();
        this.fetchUserBillPayHistory();
    };
    /**
     * used to fetch the history of previous past bills
     * pagination previous button on-click
     */
    BillPaymentPresentationController.prototype.fetchPreviousUserBillPayHistory = function () {
        this.paginationManager.getPreviousPage();
        this.fetchUserBillPayHistory();
    };
    /**
     * All Payees Flow
     * @param {obejct} sortingInputs sorting inputs
     */
    BillPaymentPresentationController.prototype.loadBulkPayees = function (sortingInputs) {
        var scopeObj = this;
        scopeObj.showView({
            form: frmBulkPayees,
            data: {
                isLoading: true
            },
            callbackModelConfig: {
                bulkPayees: true
            }
        });
        this.paginationManager.resetValues();
        var params = this.paginationManager.getValues(scopeObj.bulkPayeesConfig, sortingInputs);
        var criteria = {
            "sortBy": params.sortBy,
            "order": params.order
        };
        //     criteria = kony.mvc.Expression.and(
        //       criteria,
        //       kony.mvc.Expression.eq("sortBy", params.sortBy),
        //       kony.mvc.Expression.eq("order", params.order)
        //     )
        this.recipientsManager.fetchPayeesList(criteria, this.fetchBulkPayeesSuccessCallBack.bind(this), this.fetchBulkPayeesErrorCallBack.bind(this));
    };
    /**
     * used to fetch Both BulkPayees and BillS
     */
    BillPaymentPresentationController.prototype.loadBulkPayeesWithBills = function () {
        var scopeObj = this;
        scopeObj.showView({
            form: frmBulkPayees,
            data: {
                isLoading: true
            },
            callbackModelConfig: {
                bulkPayees: true
            }
        });
        var params = this.paginationManager.getValues(scopeObj.bulkPayeesConfig);
        var criteria = {
            "sortBy": params.sortBy,
            "order": params.order
        };
        //     criteria = kony.mvc.Expression.and(
        //       criteria,
        //       kony.mvc.Expression.eq("sortBy", params.sortBy),
        //       kony.mvc.Expression.eq("order", params.order)
        //     );
        var payeeParams = [];
        payeeParams.push(criteria);
        var billParams = [];
        billParams.push(this.paginationManager.getValues(this.paymentDueConfig));
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.recipientsManager, 'fetchPayeesList', payeeParams),
                this.asyncManager.asyncItem(this.billManager, 'fetchUserBillPayPendingTransactions', billParams)
            ],
            this.fetchBulkPayeesWithBillsSuccessCallBack.bind(this)
        );
    };
    /**
     * used to fetch categoris and payees
     * @param {object} syncResponseObject syncResponseObject
     */
    BillPaymentPresentationController.prototype.fetchBulkPayeesWithBillsSuccessCallBack = function (syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.isAllSuccess()) {
            scopeObj.fetchBulkPayeesSuccessCallBack(syncResponseObject.responses[0].data);
            scopeObj.fetchDueBillsSuccessCallBack({
                "dueBills": true
            }, syncResponseObject.responses[1].data);
        } else {
            scopeObj.hideProgressBar();
            CommonUtilities.showServerDownScreen();
        }
    };
    /**
     * get All Payees success schenario
     * @param {object} response all payees response
     */
    BillPaymentPresentationController.prototype.fetchBulkPayeesSuccessCallBack = function (response) {
        var self = this;
        var sortingValues = this.paginationManager.getValues(self.bulkPayeesConfig);
        self.updateView({
            "isLoading": true,
            "bulkPayees": response,
            "sortingInputs": sortingValues,
            "billPayAccounts": self.getSingelBillPaySupportedAccounts()
        }, frmBulkPayees);
    };
    /**
     * get All Payees error schenario.
     * @param {object} res response
     */
    BillPaymentPresentationController.prototype.fetchBulkPayeesErrorCallBack = function (res) {
        var scopeObj = this;
        scopeObj.showView({
            form: frmBulkPayees, 
            data: {
                "serverError": res.errorMessage
            },
            callbackModelConfig: {
                bulkPayees: true
            }
        });
    };
    /**
     * method to call Update Command Handler to update edited details in manage payee edit.
     * @param {object} payeeRecord from updateBillPayee command handler
     */
    BillPaymentPresentationController.prototype.updateManagePayee = function (payeeRecord, segManagePayeeData) {
        this.showProgressBar();
        this.recipientsManager.updatePayeeDetails(payeeRecord, this.editManagePayeeSuccessCallBack.bind(this, payeeRecord, segManagePayeeData), this.updateManagePayeeErrorCallBack.bind(this));
    };
    /**
     * Method to call delete Command Handler to delete biller in manage payee.
     * @param {object} request delete object
     */
    BillPaymentPresentationController.prototype.deleteManagePayee = function (request) {
        this.showProgressBar();
        this.recipientsManager.deletePayeeById(request.payeeId, this.updateManagePayeeSuccessCallBack.bind(this), this.updateManagePayeeErrorCallBack.bind(this));
    };
    /**
     * sucess callback for manage payee updates
     * @param {object} response success reponse
     */
    BillPaymentPresentationController.prototype.updateManagePayeeSuccessCallBack = function (response) {
        var self = this;
        self.managePayeePagination();
    };
    /**
     * sucess callback for manage payee updates
     * @param {object} response success reponse
     */
    BillPaymentPresentationController.prototype.editManagePayeeSuccessCallBack = function (updatePayeeSuccessData, segManagePayeeData, response) {
        if (response.payeeId !== undefined && response.payeeId !== "") {
            this.showView({
                form: frmPayeeAcknowledgement,
                data: {
                    "updatePayeeSuccess": updatePayeeSuccessData,
                    "segManagePayeeData": segManagePayeeData
                },
                callbackModelConfig: {
                    addPayeeAcknowledgement: true
                }
            });
            this.hideProgressBar();
        } else {
            this.updateManagePayeeErrorCallBack();
        }
    };
    /**
     * error callback for manage payee updates
     * @param {object} response error response
     */
    BillPaymentPresentationController.prototype.updateManagePayeeErrorCallBack = function (response) {
        this.hideProgressBar();
        this.showView({
            form: frmManagePayees, 
            data: {
                "serverError": response.errorMessage
            },
            callbackModelConfig: {
                managePayees: true
            }
        });
    };
    /**
     * Method to activate EBill in manage payee.
     * @param {String} data payee id
     * @param {string} selectedTab selected tab
     */
    BillPaymentPresentationController.prototype.activateEbill = function (data, selectedTab) {
        var self = this;
        this.showProgressBar();
        var EbillChangeJSON = {
            "payeeId": data["payeeId"],
            "EBillEnable": 1
        };
        if (selectedTab === "frmManagePayees") {
            this.recipientsManager.updatePayeeDetails(EbillChangeJSON, this.updateManagePayeeSuccessCallBack.bind(this), this.updateManagePayeeErrorCallBack.bind(this));
        } else {
            this.recipientsManager.updatePayeeDetails(EbillChangeJSON, this.updateDueBillsSuccessCallBack.bind(this, selectedTab), this.updateDueBillsErrorCallBack.bind(this, selectedTab));
        }
    };
    /**
     * used to navigate the allPayees flow
     * @param {object} response reponse
     */
    BillPaymentPresentationController.prototype.updateDueBillsSuccessCallBack = function (selectedTab, response) {
        var self = this;
        if (selectedTab === "frmBulkPayees") {
            self.loadBulkPayeesWithBills();
        } else {
            self.loadDueBills();
        }
    };
    /**
     * error callback for manage payee updates
     * @param {object} response error response
     */
    BillPaymentPresentationController.prototype.updateDueBillsErrorCallBack = function (selectedTab, response) {
        this.updateView({ "serverError": response }, selectedTab);
        this.hideProgressBar();
    };
    /**
     * Method to deactivate EBill in manage payee.
     * @param {object} payeeId    payee id
     */
    BillPaymentPresentationController.prototype.deactivateEbill = function (payeeId) {
        this.showProgressBar();
        var eBillJson = {
            "payeeId": payeeId,
            "EBillEnable": 0
        };
        this.recipientsManager.updatePayeeDetails(eBillJson, this.updateManagePayeeSuccessCallBack.bind(this), this.updateManagePayeeErrorCallBack.bind(this));
    };
    /**
     * used to fetch the previous payees
     */
    BillPaymentPresentationController.prototype.fetchPreviousManagePayees = function () {
        this.showProgressBar();
        this.paginationManager.getPreviousPage();
        this.managePayeePagination();
    };
    /**
     * used to fetch the next payees
     */
    BillPaymentPresentationController.prototype.fetchNextManagePayees = function () {
        this.showProgressBar();
        this.paginationManager.getNextPage();
        this.managePayeePagination();
    };
    /**
     * to Validate transfer limits
     * @param {object} data - contains amount value to validate and fromAccountNumber
     * @returns {object} result - object contains isAmountValid and errMsg
     */
    BillPaymentPresentationController.prototype.validateBillPayAmount = function (data) {
        if (Object.keys(billPaymentLimits).length == 0) {
            var result = this.fetchLimits(data);
            return result;
        }
        return this.validateBillPayAmountWithLimits(data);
    };
    /**
     * to Validate transfer limits
     * @param {object} data - contains amount value to validate and fromAccountNumber
     * @returns {object} result - object contains isAmountValid and errMsg
     */
    BillPaymentPresentationController.prototype.validateBillPayAmountWithLimits = function (data) {
        var result = {
            isAmountValid: false
        };
        var userAccounts = billPaymentLimits.accounts;
        var userLimits = {};
        for (var i = 0; i < userAccounts.length; i++) {
            if (userAccounts[i].accountId === data.fromAccountNumber) {
                userLimits = userAccounts[i].limits;
                break;
            }
        }
        if (parseFloat(data.amount) < parseFloat(userLimits.MIN_TRANSACTION_LIMIT)) {
            result.errMsg = kony.i18n.getLocalizedString("i18n.common.minTransactionError") + " " + this.formatAmount(userLimits.MIN_TRANSACTION_LIMIT);
        } else {
            if (userLimits.AUTO_DENIED_TRANSACTION_LIMIT) {
                var minValue = Math.min(parseFloat(userLimits.AUTO_DENIED_TRANSACTION_LIMIT), parseFloat(userLimits.MAX_TRANSACTION_LIMIT));
            } else {
                var minValue = parseFloat(userLimits.MAX_TRANSACTION_LIMIT);
            }
            if (parseFloat(data.amount) > parseFloat(minValue)) {
                result.errMsg = kony.i18n.getLocalizedString("i18n.common.maxTransactionError") + " " + this.formatAmount(minValue);
            } else {
                result.isAmountValid = true;
            }
        }
        return result;
    };
    /**
     * search BillPay Payees with some keyword.
     * @param {object}  data search string
     */
    BillPaymentPresentationController.prototype.searchBillPayPayees = function (data) {
        this.showProgressBar();
        if (data && data.searchKeyword.length > 0) {
            var criteria = {
                "searchString": data.searchKeyword
            }; //kony.mvc.Expression.eq("searchString", data.searchKeyword);
            this.recipientsManager.fetchPayeesList(criteria, this.fetchSearchPayeesListSuccessCallBack.bind(this, {
                "searchString": data.searchKeyword
            }), this.fetchSearchPayeesListFailureCallBack.bind(this));
        } else {
            this.recipientsManager.fetchPayeesList({}, this.fetchSearchPayeesListSuccessCallBack.bind(this, true), this.fetchSearchPayeesListFailureCallBack.bind(this));
        }
    };
    /**
     * keyword search payee success callback
     */
    BillPaymentPresentationController.prototype.fetchSearchPayeesListSuccessCallBack = function (searchInputs, response) {
        var dataModel = {};
        dataModel.managePayee = response;
        dataModel.searchvisibility = true;
        this.updateView({
            "managePayee": dataModel
        }, frmManagePayees);
        this.hideProgressBar();
    };
    /**
     * keyword search payee failure callback
     * @param {object} response response
     */
    BillPaymentPresentationController.prototype.fetchSearchPayeesListFailureCallBack = function (response) {
        this.showView({
            form: frmManagePayees, 
            data: {
                "serverError": response
            },
            callbackModelConfig: {
                managePayees: true
            }
        });
        this.hideProgressBar();
    };
    /**
     * search BillPay Payees with some keyword.
     * @param {object}  data search string
     */
    BillPaymentPresentationController.prototype.searchBillPayAllPayees = function (data) {
        this.showProgressBar();
        if (data && data.searchKeyword.length > 0) {
            var criteria = kony.mvc.Expression.eq("searchString", data.searchKeyword);
            this.recipientsManager.fetchPayeesList(criteria, this.fetchBulkPayeesSuccessCallBack.bind(this), this.fetchSearchAllPayeesListFailureCallBack.bind(this));
        } else {
            this.recipientsManager.fetchPayeesList({}, this.fetchSearchAllPayeesListSuccessCallBack.bind(this, true), this.fetchSearchAllPayeesListFailureCallBack.bind(this));
        }
    };
    /**
     * search BillPay Payees with some keyword.
     * @param {object}  data search string
     */
    BillPaymentPresentationController.prototype.searchBillPayHistoryPayees = function (data) {
        this.showProgressBar();
        if (data && data.searchKeyword.length > 0) {
            var criteria = kony.mvc.Expression.eq("searchString", data.searchKeyword);
            this.recipientsManager.fetchPayeesList(criteria, this.fetchSearchHistoryPayeesListSuccessCallBack.bind(this, {
                "searchString": data.searchKeyword
            }), this.fetchSearchHistoryPayeesListFailureCallBack.bind(this));
        } else {
            this.recipientsManager.fetchPayeesList({}, this.fetchSearchHistoryPayeesListSuccessCallBack.bind(this, true), this.fetchSearchHistoryPayeesListFailureCallBack.bind(this));
        }
    };
    /**
     * keyword search payee success callback
     */
    BillPaymentPresentationController.prototype.fetchSearchAllPayeesListSuccessCallBack = function (searchInputs, response) {
        var dataModel = {};
        dataModel.bulkpayees = response;
        dataModel.searchvisibility = true;
        this.updateView({
            "bulkPayees": dataModel
        }, frmBulkPayees);
    };
    BillPaymentPresentationController.prototype.fetchSearchHistoryPayeesListSuccessCallBack = function (searchInputs, response) {
        var dataModel = {};
        dataModel.billpayHistory = response;
        dataModel.searchvisibility = true;
        this.updateView({
            "billpayHistory": dataModel
        }, frmBillPayHistory);

        this.hideProgressBar();
    };
    /**
     * keyword search payee failure callback
     * @param {object} response response
     */
    BillPaymentPresentationController.prototype.fetchSearchAllPayeesListFailureCallBack = function (response) {
        this.showView({
            form: frmBulkPayees, 
            data: {
                "serverError": response
            },
            callbackModelConfig: {
                bulkPayees: true
            }
        });
        this.hideProgressBar();
    };
    BillPaymentPresentationController.prototype.fetchSearchHistoryPayeesListFailureCallBack = function (response) {
        this.showView({
            form: frmBillPayHistory,
            data: {
                "serverError": response
            },
            callbackModelConfig: {
                history: true
            }
        });
        this.hideProgressBar();
    };
    /**
     * shows the add payee confirmation screen
     * @param {object} payeeInfo payee information
     */
    BillPaymentPresentationController.prototype.showAddPayeeConfirmPage = function (payeeInfo, frm) {
        payeeDetails.updateConfirmPayeeDetails(payeeInfo);
        this.showView({
            form: frmVerifyPayee,
            data: {
                "payeeConfirmDetails": payeeDetails.getPayeeDetailsConfirmPage(),
                "frm": frm
            },
            callbackModelConfig: {
                addPayeeConfirm: true
            }
        });
    };
    /**
     * used to create the payee
     */
    BillPaymentPresentationController.prototype.addPayeeDetails = function (frm, cif, segData) {
        this.showProgressBar();
        var criteria = payeeDetails.getRequestObject();
        var errFormName;
        criteria.cif = cif;
        if (frm === "frmOneTimePaymentAcknowledgement") {
            errFormName = "frmPayeeDetails";
        } else {
            errFormName = frm;
        }
        this.recipientsManager.createPayee(criteria, this.addPayeeSuccessCallBack.bind(this, cif, segData), this.addPayeeFailureCallBack.bind(this, errFormName));
    };
    /**
     * add payee success schenario
     * @param {object} response success response
     */
    BillPaymentPresentationController.prototype.addPayeeSuccessCallBack = function (cif, segData, response) {
        var self = this;
        if (response.payeeId !== undefined && response.payeeId !== "") {
            payeeDetails.updatePayeeId({
                payeeId: response.payeeId
            });
            if (payeeDetails.getTransationId()) {
                this.updateOneTimePayment({
                    payeeId: response.payeeId,
                    transactionId: payeeDetails.getTransationId()
                });
            }
            var successData = payeeDetails.getPayeeDetailsSuccessPage();
            successData.cif = cif;
            successData.cifSegData = segData;
            this.showView({
                form: frmPayeeAcknowledgement,
                data: {
                    payeeSuccessDetails: successData
                },
                callbackModelConfig: {
                    addPayeeAcknowledgement: true
                }
            });
            this.hideProgressBar();
        } else {
            this.addPayeeFailureCallBack();
        }
    };
    /**
     * add payee failure schenario
     * @param {object} response error response
     */
    BillPaymentPresentationController.prototype.addPayeeFailureCallBack = function (frm, response) {
        const errMsg = (response && response.errorMessage) ? response.errorMessage : "Server error";
        this.showView({
            form: frm,
            data: {
                "serverError": errMsg
            },
            callbackModelConfig: {
                bulkPayees: this.gettingFromBulkBillPayment,
                duePayment: !this.gettingFromBulkBillPayment
            }
        });
        this.hideProgressBar();
    };
    /**
     * used to update the one time payement
     * @param {object} data data
     */
    BillPaymentPresentationController.prototype.updateOneTimePayment = function (data) {
        this.recipientsManager.linkPayeetoTransaction(data, function () { }, function () { });
    };
    /**
     * used to cancel the bulkBillPay
     */
    BillPaymentPresentationController.prototype.cancelBulkPay = function () {
        this.showBillPaymentScreen({
            "context": "BulkPayees",
            "loadBills": true
        });
    };
    /**
     * used to modify the bulk billPay screen
     */
    BillPaymentPresentationController.prototype.modifyBulkPayement = function () {
        this.showView({
            form: frmBulkPayees,
            callbackModelConfig: {
                bulkPayees: true
            }
        });
    };
    /**
     * used to create the bulkPayment transaction
     * @param {list} bulkPayRecords list of transactions.
     */
    BillPaymentPresentationController.prototype.createBulkPayments = function (bulkPayRecordsData) {
        var transactions = [];
        var self = this;
        self.showProgressBar();
        var bulkPayRecords = bulkPayRecordsData.records;
        this.gettingFromBulkBillPayment = bulkPayRecordsData.gettingFromBulkBillPayment;
        var displayName = "BillPay";
        this.presentationUtility.MFA.getServiceIdBasedOnDisplayName(displayName);
        for (var index in bulkPayRecords) {
            var record = bulkPayRecords[index];
            payeeTypeList[index] = record.isBusinessPayee;
            payeeAddressList[index] = record.lblPayeeAddress.text;
            payeeBalanceList[index] = record.lblEndingBalanceAccount.text;
            transactions.push({
                'fromAccountNumber': record.accountNumber,
                'scheduledDate': this.formatUtilManager.convertToUTC(record.lblSendOn),
                'Bill_id': record.billid,
                'payeeId': record.payeeId,
                "transactionCurrency": this.configurationManager.getDeploymentGeography() === "EUROPE" ? "EUR" : "USD",
                'amount': this.formatUtilManager.deFormatAmount(record.lblAmount.text.replace(this.configurationManager.getCurrencyCode(), "")),
                'deliverBy': this.formatUtilManager.convertToUTC(record.lblDeliverBy),
                'transactionsNotes': record.transactionsNotes,
                'payeeName': record.lblPayee.text,
                'toAccountNumber': record.payeeAccountNumber
            });
        }
        var transactionsList = JSON.stringify(transactions);
        transactionsList.replace(/"/g, "'");
        var params = {
            'bulkPayString': transactionsList
        };
        this.transactionManager.createBulkBillPayTransaction(params, this.createBulkPaymentsSuccessCallBack.bind(this, transactions), this.createBulkPaymentsErrorCallBack.bind(this));
    };
    /**
     * used to handle the bulk payement success schenario
     * @param {list} response -- list of response records
     *
     */
    BillPaymentPresentationController.prototype.createBulkPaymentsSuccessCallBack = function (transactions, response) {
        var frm = this.gettingFromBulkBillPayment ? frmBulkBillPayAcknowledgement : frmPaymentDueAcknowledgement;
        if (response && response.Transactions) {
            for (i = 0; i < response.Transactions.length; i++) {
                if (kony.sdk.isNullOrUndefined(response.Transactions[i].deliverBy)) {
                    response.Transactions[i].Bill_id = transactions[i].Bill_id;
                    response.Transactions[i].amount = transactions[i].amount;
                    response.Transactions[i].deliverBy = transactions[i].deliverBy;
                    response.Transactions[i].fromAccountNumber = transactions[i].fromAccountNumber;
                    response.Transactions[i].payeeId = transactions[i].payeeId;
                    response.Transactions[i].payeeName = transactions[i].payeeName;
                    response.Transactions[i].scheduledDate = transactions[i].scheduledDate;
                    response.Transactions[i].toAccountNumber = transactions[i].toAccountNumber;
                    response.Transactions[i].transactionNotes = transactions[i].transactionNotes;
                }
                response.Transactions[i].isBusinessPayee = payeeTypeList[i];
                response.Transactions[i].payeeAddressLine1 = payeeAddressList[i];
                response.Transactions[i].fromAccountBalance = payeeBalanceList[i];
            }
        }
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": this.mfaManager.getServiceId(),
                "flowType": "BULK_BILL_PAYMENT",
                "response": response,
                "objectServiceDetails": {
                    "action": "createPayment_bulk",
                    "serviceName": "BillPay",
                    "dataModel": "Payment",
                    "verifyOTPOperationName": "createPayment_bulk",
                    "requestOTPOperationName": "createPayment_bulk",
                    "resendOTPOperationName": "createPayment_bulk",
                }
            };
            this.mfaManager.initMFAFlow(mfaJSON);
        } else {
            this.showView({
                form: frm,
                data: {
                    "bulkPay": response
                },
                callbackModelConfig: {
                    bulkPayeesAcknowledgement: this.gettingFromBulkBillPayment,
                    duePaymentAcknowledgement: !this.gettingFromBulkBillPayment
                }
            });
        }
    };
    /**
     *used to handle the bulk payement error schenario.
     * @param {object} response bulk bill pay response
     */
    BillPaymentPresentationController.prototype.createBulkPaymentsErrorCallBack = function (response) {
        var self = this;
        var frm = this.gettingFromBulkBillPayment ? frmBulkPayees : frmBillPaymentDue;
        response.bulkBillPayement = true;
        self.showView({
            form: frm,
            data: {
                "serverError": response
            },
            callbackModelConfig: {
                bulkPayees: this.gettingFromBulkBillPayment,
                duePayment: !this.gettingFromBulkBillPayment
            }
        });
    };
    /**
     * method for handling MFA for SingleBillPay
     * @param {object} ackPayABill input transaction
     */
    BillPaymentPresentationController.prototype.checkMFASingleBillPay = function (ackPayABill) {
        var self = this;
        this.showProgressBar();
        this.ackPayABill = ackPayABill;
        var date = ackPayABill.sendOn;
        var displayName = "BillPay";
        this.presentationUtility.MFA.getServiceIdBasedOnDisplayName(displayName);
        var addPayABillData = {
            amount: this.ackPayABill.amount,
            payeeId: this.ackPayABill.payeeId,
            Bill_id: this.ackPayABill.billid,
            fromAccountNumber: this.ackPayABill.fromAccountNumber,
            transactionsNotes: this.ackPayABill.notes,
            scheduledDate: date,
            isBusinessPayee: this.ackPayABill.isBusinessPayee,
            transactionType: "BillPay",
            toAccountNumber: this.ackPayABill.accountNumber,
            //transactionType: this.typeManager.getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.BILLPAY),
            //"deliverBy": this.formatUtilManager.convertToUTC(this.ackPayABill.deliveryDate),
            transactionCurrency: this.ackPayABill.transactionCurrency
        };
        if (this.ackPayABill.frequencyType == kony.i18n.getLocalizedString("i18n.transfers.frequency.once")) {
            addPayABillData.numberOfRecurrences = "";
            addPayABillData.frequencyStartDate = "";
            addPayABillData.frequencyEndDate = "";
            addPayABillData.frequencyType = this.ackPayABill.frequencyType;
        } else if (this.ackPayABill.hasHowLong == "NO_OF_RECURRENCES") {
            addPayABillData.frequencyStartDate = "";
            addPayABillData.frequencyEndDate = "";
            addPayABillData.frequencyType = this.ackPayABill.frequencyType;
            addPayABillData.numberOfRecurrences = this.ackPayABill.numberOfRecurrences;
        } else if (this.ackPayABill.hasHowLong == "ON_SPECIFIC_DATE") {
            addPayABillData.numberOfRecurrences = "";
            addPayABillData.frequencyType = this.ackPayABill.frequencyType;
            addPayABillData.frequencyEndDate = this.ackPayABill.frequencyEndDate;
            addPayABillData.frequencyStartDate = this.ackPayABill.frequencyStartDate;
        }
        if (this.ackPayABill.isScheduled === "false" || !this.ackPayABill.referenceNumber) {
            this.mfaManager.setMFAFlowType("SINGLE_BILL_PAYMENT");
            this.transactionManager.createBillPayTransaction(addPayABillData, self.singleBillPaySuccessCallBack.bind(this), self.singleBillPayFailureCallBack.bind(this));
        } else {
            this.mfaManager.setMFAFlowType("UPDATE_BILL_PAYMENT");
            addPayABillData.transactionId = this.ackPayABill.referenceNumber;
            this.transactionManager.updateBillPayTransaction(addPayABillData, self.singleBillPaySuccessCallBack.bind(this), self.singleBillPayFailureCallBack.bind(this));
        }
    };
    /**
     * method for handling MFA for SingleBillPay in onetimepayment
     * @param {object} ackPayABill input transaction
     */
    BillPaymentPresentationController.prototype.checkMFAForOneTimePayment = function (ackPayABill) {
        var self = this;
        this.showProgressBar();
        this.ackPayABill = ackPayABill;
        var date = ackPayABill.sendOn;
        var displayName = "BillPay";
        this.presentationUtility.MFA.getServiceIdBasedOnDisplayName(displayName);
        var addPayABillData = {
            amount: this.ackPayABill.amount,
            payeeId: this.ackPayABill.payeeId,
            Bill_id: this.ackPayABill.billid,
            fromAccountNumber: this.ackPayABill.fromAccountNumber,
            transactionsNotes: this.ackPayABill.notes,
            scheduledDate: date,
            transactionType: "BillPay",
            "deliverBy": this.formatUtilManager.convertToUTC(this.ackPayABill.deliveryDate),
            transactionCurrency: this.ackPayABill.transactionCurrency,
            toAccountNumber: this.ackPayABill.accountNumber,
            zipCode: this.ackPayABill.zipCode,
            billerId: this.ackPayABill.billerId,
            isBusinessPayee: this.ackPayABill.isBusinessPayee
        };
        if (this.ackPayABill.isScheduled === "false" || !this.ackPayABill.referenceNumber) {
            this.mfaManager.setMFAFlowType("SINGLE_BILL_PAYMENT");
            this.transactionManager.createBillPayTransaction(addPayABillData, self.singleBillPaySuccessCallBack.bind(this), self.singleBillPayFailureCallBack.bind(this));
        } else {
            this.mfaManager.setMFAFlowType("UPDATE_BILL_PAYMENT");
            addPayABillData.transactionId = this.ackPayABill.referenceNumber;
            this.transactionManager.updateBillPayTransaction(addPayABillData, self.singleBillPaySuccessCallBack.bind(this), self.singleBillPayFailureCallBack.bind(this));
        }
    };
    /**
     * used to handle the single billPay success scenario
     * @param {object} ackPayABill input data
     * @param {object} response reposne data
     */
    BillPaymentPresentationController.prototype.singleBillPaySuccessCallBack = function (response) {
        var self = this;
        const operationName = this.getOperationName();
        const navObj = {
            form: this.ackPayABill.gettingFromOneTimePayment ? frmOneTimePaymentAcknowledgement : frmPayBillAcknowledgement,
            callbackModelConfig: {
                oneTimePaymentAcknowledgement: this.ackPayABill.gettingFromOneTimePayment,
                payABillAcknowledgement: !this.ackPayABill.gettingFromOneTimePayment
            }
        };
        if (response.status && !response.transactionId) {
            self.getAccountDataByAccountId(this.ackPayABill, response, navObj);
        } else if (response.transactionId) {
            self.getAccountDataByAccountId(this.ackPayABill, response, navObj);
        } else {
            const mfaJSON = {
                "serviceName": this.mfaManager.getServiceId(),
                "flowType": this.mfaManager.getMFAFlowType(),
                "response": response,
                "objectServiceDetails": {
                    "action": "createPayment",
                    "serviceName": "BillPay",
                    "dataModel": "Payment",
                    "verifyOTPOperationName": operationName,
                    "requestOTPOperationName": operationName,
                    "resendOTPOperationName": operationName,
                }
            };
            this.mfaManager.initMFAFlow(mfaJSON);
        }
    };
    /**
     * used to handle the single billPay failure scenario
     * @param {object} ackPayABill input data
     * @param {object} response respone data
     */
    BillPaymentPresentationController.prototype.singleBillPayFailureCallBack = function (response) {
        var self = this;
        const frm = this.ackPayABill.gettingFromOneTimePayment ? frmMakeOneTimePayment : frmPayABill;
        this.hideProgressBar();
        this.showView({
            form: frm,
            data: {
                "serverError": response.errorMessage
            },
            callbackModelConfig: {
                oneTimePayment: this.ackPayABill.gettingFromOneTimePayment,
                payABill: !this.ackPayABill.gettingFromOneTimePayment
            }
        });
    };
    /**
     * fetch the billPay account
     * @param {Object} ackPayABill input data
     * @param {string} referenceId reference id
     */
    BillPaymentPresentationController.prototype.getAccountDataByAccountId = function (ackPayABill, successObj, navObj) {
        var self = this;
        this.accountManager.fetchInternalAccounts(self.billPayAccountsSuccessCallBack.bind(this, ackPayABill, successObj, navObj), self.billPayAccountsErrorCallBack.bind(this, ackPayABill, successObj, navObj));
    };
    /**
     * used to navigate the acknowledgement screen
     * @param {object} ackPayABill input data
     * @param {object} referenceId  reference id
     * @param {object} response response data
     */
    BillPaymentPresentationController.prototype.billPayAccountsSuccessCallBack = function (ackPayABill, successObj, navObj, response) {
        var accountData = this.accountManager.getInternalAccountByID(ackPayABill.fromAccountNumber);
        this.showView({
            form: navObj.form,
            data: {
                "ackPayABill": {
                    "savedData": ackPayABill,
                    "response": successObj,
                    "accountData": accountData
                }
            },
            callbackModelConfig: navObj.callbackModelConfig
        });
        this.hideProgressBar();
    };
    /**
     * used to navigate the acknowledgement screen
     * @param {object} addPayABillData input data
     * @param {object} referenceId  reference id
     * @param {object} response  response data
     */
    BillPaymentPresentationController.prototype.billPayAccountsErrorCallBack = function (addPayABillData, successObj, navObj, response) {
        var accountData = this.accountManager.getInternalAccountByID(addPayABillData.fromAccountNumber);
        this.showView({
            form: navObj.form,
            data: {
                "ackPayABill": {
                    "savedData": addPayABillData,
                    "response": successObj,
                    "accountData": accountData
                }
            },
            callbackModelConfig: navObj.callbackModelConfig
        });
        this.hideProgressBar();
    };
    /**
     * used to show the billPay due flow.
     * @param {object} dataInputs  sorting parameters
     * @param {boolean} loadBills status of bills loaded or not
     */
    BillPaymentPresentationController.prototype.loadDueBills = function () {
        var scopeObj = this;
        scopeObj.showView({
            form: frmBillPaymentDue,
            data: {
                isLoading: true
            },
            callbackModelConfig: {
                duePayment: true
            }
        });
        var params = this.paginationManager.getValues(scopeObj.paymentDueConfig, {});
        this.billManager.fetchUserBillPayPendingTransactions(params, this.fetchDueBillsSuccessCallBack.bind(this, {
            "dueBills": false,
            "frm": frmBillPaymentDue
        }), this.fetchDueBillsErrorCallBack.bind(this));
    };
    /**
     * used to modify the payment due screen
     */
    BillPaymentPresentationController.prototype.modifyPaymentDue = function () {
        this.showView({
            form: frmBillPaymentDue,
            callbackModelConfig: {
                duePayment: true
            }
        });
    };
    /**
     * used to modify the payment due screen
     */
    BillPaymentPresentationController.prototype.cancelPaymentDue = function () {
        this.showBillPaymentScreen({
            context: "DueBills",
            loadBills: true
        });
    };
    /**
     * used to navigate the make one time payement screen
     * @param {function} isCancelCallBack cancel callback
     */
    BillPaymentPresentationController.prototype.loadOneTimePayement = function ({ callbackModelConfig }) {
        var self = this;
        payeeDetails.init();
        this.showView({
            form: frmMakeOneTimePayee,
            data: {
                "initOneTimePayee": true,
                callbackModelConfig
            },
            callbackModelConfig: {
                oneTimePayee: true
            }
        });
        this.showProgressBar();
        this.getRegisteredPayeeList(frmMakeOneTimePayee);
    };
    /**
     * used to fetch the billers
     * @param {string} searchValue search string
     */
    BillPaymentPresentationController.prototype.fetchBillerListForOneTimePayment = function (searchValue) {
        var self = this;
        if (searchValue === null || searchValue.trim() === "") {
            return;
        }
        self.showProgressBar(frmMakeOneTimePayee);
        lastSearchValue = searchValue;
        this.recipientsManager.fetchPayeeSuggestions(searchValue, self.fetchBillerListSuccessCallBack.bind(this, searchValue, frmMakeOneTimePayee), self.fetchBillerListFailureCallBack.bind(this, frmMakeOneTimePayee));
    };
    /**
     * used to load the all payees
     * @param {object} data data
     * @param {object} sender sender
     */
    BillPaymentPresentationController.prototype.loadPayABillWithPayees = function (data, sender) {
        var params = [];
        params.push(this.paginationManager.getValues(this.paymentDueConfig));
        var criteria = kony.mvc.Expression.eq("searchString", "");
        var payeeParams = [];
        payeeParams.push(criteria);
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.recipientsManager, 'fetchPayeesList', payeeParams),
                this.asyncManager.asyncItem(this.billManager, 'fetchUserBillPayPendingTransactions', params)
            ],
            this.loadPayABillWithPayeesCompletionCallBack.bind(this, data, sender)
        );
    };
    /**
     * Method used as completion call back for the async call to bills and payees.
     * @param {object} sender sender name
     * @param {Object} data - contains the addNewTravelPlan property.
     * @param {Object} syncResponseObject - contains the async manager respnose.
     */
    BillPaymentPresentationController.prototype.loadPayABillWithPayeesCompletionCallBack = function (data, sender, syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.isAllSuccess()) {
            this.showView({
                form: frmPayABill,
                data: {
                    payees: syncResponseObject.responses[0].data,
                    sender: sender
                },
                callbackModelConfig: {
                    payABill: true
                }
            });
            if(syncResponseObject.responses[0].data[0]){
                data.billid = syncResponseObject.responses[0].data[0].billid;
                data.billDueDate = syncResponseObject.responses[0].data[0].billDueDate;
                data.dueAmount = syncResponseObject.responses[0].data[0].dueAmount;
                data.eBillSupport = syncResponseObject.responses[0].data[0].eBillSupport;
                data.eBillStatus = syncResponseObject.responses[0].data[0].eBillStatus;
                data.billGeneratedDate = syncResponseObject.responses[0].data[0].billGeneratedDate;
                data.ebillURL = syncResponseObject.responses[0].data[0].ebillURL;
            }
            scopeObj.getSingleBillPay(data, "quickAction");
            scopeObj.fetchDueBillsSuccessCallBack({
                "dueBills": true,
                "frm": frmPayABill
            }, syncResponseObject.responses[1].data);
            scopeObj.hideProgressBar();
        } else {
            scopeObj.updateView({
                "hideProgressBar": true
            });
            CommonUtilities.showServerDownScreen();
        }
    };
    /**
     * Method used as completion call back for the async call to bills and payees.
     * @param {Object} data - contains the addNewTravelPlan property.
     */
    BillPaymentPresentationController.prototype.navigateToOneTimePayment = function (payeeInfo) {
        var scopeObj = this;
        if (payeeInfo && !payeeDetails.isBillerDetailValid(payeeInfo)) {
            scopeObj.updateView({
                isInvalidPayee: true
            }, frmMakeOneTimePayee);
        } else {
            if (payeeInfo) {
                payeeDetails.updatePayeeDetails(payeeInfo);
            }
            var params = this.paginationManager.getValues(scopeObj.paymentDueConfig, {});
            var payeeObj = payeeDetails.getOneTimePayeeInfo();
            scopeObj.showView({
                form: frmMakeOneTimePayment,
                data: {
                    isLoading: true
                },
                callbackModelConfig: {
                    oneTimePayment: true
                }
            });
            this.billManager.fetchUserBillPayPendingTransactions(params, this.fetchDueBillsSuccessCallBack.bind(this, {
                "dueBills": true,
                "frm": frmMakeOneTimePayment
            }), this.fetchDueBillsErrorCallBack.bind(this));
            scopeObj.updateView({
                "billPayAccounts": scopeObj.getSingelBillPaySupportedAccounts(),
                "payeeData": payeeObj,
                "initOneTimePayment": true
            }, frmMakeOneTimePayment);

        }
    };
    /**
     * used to navigate the payABill confirmation screen
     * @returns {boolean} returns true or false
     */
    BillPaymentPresentationController.prototype.getDefaultBillPayPopUp = function () {
        return this.userPreferencesManager.isSetAccountPopupEnabled()
    };
    /**
     * used to update the billPayPrefered Account number
     * @param {string} accountNumber account number
     */
    BillPaymentPresentationController.prototype.updateBillPayPreferedAccount = function (accountNumber) {
        var param = {
            "userName": this.userPreferencesManager.getUserObj().userName,
            "default_account_billPay": accountNumber
        }
        this.userPreferencesManager.updateBillPayPreferedAccountNumber(param, function () { }, function () { });
    };
    /**
     * used to update the showBillPayPoPUp
     */
    BillPaymentPresentationController.prototype.updateShowBillPayFromAccPop = function () {
        var param = {
            showBillPayFromAccPopup: false
        };
        this.userPreferencesManager.updateUserDetails(param, function () { }, function () { });
    };
    /**
     * used to navigate the onetime payment confirmation screen
     * @param {object} payABill input transaction
     */
    BillPaymentPresentationController.prototype.navigateToOneTimePaymentConfirmation = function (payABill) {
        var self = this;
        self.showView({
            form: frmOneTimePaymentConfirm,
            data: {
                "payABill": payABill
            },
            callbackModelConfig: {
                oneTimePaymentConfirm: true
            }
        });
    };
    /**
     * used to fetch transaction limits
     */
    BillPaymentPresentationController.prototype.fetchLimits = function (data) {
        this.configurationManager.fetchLimitsForAnAction(featureAction, this.fetchLimitsSuccess.bind(this, data), this.fetchLimitsError);
    };
    /**
     * fetch transaction limits succcess callback
     */
    BillPaymentPresentationController.prototype.fetchLimitsSuccess = function (data, response) {
        billPaymentLimits = response;
        return this.validateBillPayAmountWithLimits(data);
    };
    /**
     * fetch transaction limits failure callback
     */
    BillPaymentPresentationController.prototype.fetchLimitsError = function (response) {
        CommonUtilities.showServerDownScreen();
    };
    /** 
     * method to print bill payment acknowledgement page
     * @param {object} data details of payment to be printed
     */
    BillPaymentPresentationController.prototype.showPrintPage = function (data) {
        this.showView({
            appName: 'CommonsMA',
            form: 'frmPrintTransfer',
            data,
            callbackModelConfig: {
                printPage: true
            }
        });
    };
    /** 
     * method to download bill paid transaction report
     * @param {object} transactionObj  details of transaction
     */
    BillPaymentPresentationController.prototype.downloadTransactionReport = function (transactionId) {
        this.showProgressBar();
        const params = {
            transactionId
        };
        this.transactionManager.generateTransactionReport(params, this.generateTransactionReportSuccess.bind(this), this.generateTransactionReportFailure.bind(this));
    };
    BillPaymentPresentationController.prototype.generateTransactionReportSuccess = function (successResponse) {
        var downloadReportURL = this.transactionManager.fetchTransactionReport(successResponse);
        var data = {
            "url": downloadReportURL
        };
        CommonUtilities.downloadFile(data);
        this.hideProgressBar();
    };
    BillPaymentPresentationController.prototype.generateTransactionReportFailure = function (error) {
        this.hideProgressBar();
        this.updateView({
            "serverError": error
        });
    };
    BillPaymentPresentationController.prototype.getOperationName = function () {
        var operationName = "";
        var flowType = this.mfaManager.getMFAFlowType();
        switch (flowType) {
            case "SINGLE_BILL_PAYMENT":
                operationName = "createPayment";
                break;
            case "UPDATE_BILL_PAYMENT":
                operationName = "updatePayment";
                break;
            case "BULK_BILL_PAYMENT":
                operationName = "createPayment_bulk";
                break;
        }
        return operationName;
    };
    BillPaymentPresentationController.prototype.getContracts = function (action) {
        this.showProgressBar();
        this.recipientsManager.fetchContractDetails(action, this.getContractsSuccess.bind(this), this.getContractsFailure.bind(this));
    };
    BillPaymentPresentationController.prototype.getContractsSuccess = function (contracts) {
        this.hideProgressBar();
        this.updateView({
            "contracts": contracts,
        });
    };
    BillPaymentPresentationController.prototype.getContractsFailure = function () {
        this.hideProgressBar();
        CommonUtilities.showServerDownScreen()
    };
    /**
     * Method to check whether an account is business account or not
     */
    BillPaymentPresentationController.prototype.isBusinessAccount = function (accountNumber) {
        const accounts = this.accountManager.getInternalAccounts() || [];
        for (const account of accounts) {
            if (account.accountID === accountNumber) return account.isBusinessAccount || 'false';
        }
        return 'false';
    };

    return BillPaymentPresentationController;
});