/**
 * Description of Module representing a Confirm form.
 * @module frmAckowledgementController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility, CampaignUtility) {
     
    var orientationHandler = new OrientationHandler();
    return {
        profileAccess: "",
        init: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            this.initActions();
        },
        preShow: function() {
            var scope = this;
			this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.data = applicationManager.getNavigationManager().getCustomInfo("frmAddPayee1");
            applicationManager.getNavigationManager().setCustomInfo("frmAddPayee1", null);
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Add Payee");
            this.view.flxDowntimeWarning.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain']);
            if (this.data) {
                this.data["isCombinedUser"] = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.user_attributes.isCombinedUser;
                var tokenParams = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.security_attributes;
                this.data.entitlement = {};
                this.data.entitlement.features = JSON.parse(tokenParams.features);
                this.data.entitlement.permissions = JSON.parse(tokenParams.permissions);
                this.data.userName = applicationManager.getUserPreferencesManager().getUserObj().userfirstname + " " + applicationManager.getUserPreferencesManager().getUserObj().userlastname;
                this.data["flowType"] = "EDIT";
                this.view.addPayee.setContext(this.data, this);
                this.view.addPayee.getEditBillerScreen(this.data);
                this.view.addPayee.onError = this.onError;
            } else {
                this.addpayeeComponentLaunch();
            }
            this.view.customheadernew.btnSkipNav.onClick = function() {
            scope.view.addPayee.lblsetActive();
                };
		
           
		
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxDialogs.isVisible = false;
                    this.view.customheadernew.btnLogout.setActive(true);
                }

            }
            this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
        },
                
        addpayeeComponentLaunch: function(inputs) {
            var scope = this;
            try {
                var params = {
                    "billerCategory": "",
                    "phone": "",
                    "companyName": "",
                    "accountNumber": "",
                    "cityName": "",
                    "isManuallyAdded": "true",
                    "payeeAccountNumber": "",
                    "payeeName": "",
                    "flowType": "ADD",
                    "payeeId": "",
                    "payeeNickName": "nickname",
                    "state": "",
                    "zipCode": "",
                    "country": "",
                    "nameOnBill": "nameonbill",
                    "street": "",
                    "addressLine2": ""
                }
                if (inputs === "add") {
                    params["payeeId"] = "";
                    params["flowType"] = "ADD";
                }
                params["isCombinedUser"] = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.user_attributes.isCombinedUser;
                var tokenParams = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.security_attributes;
                params.entitlement = {};
                params.entitlement.features = JSON.parse(tokenParams.features);
                params.entitlement.permissions = JSON.parse(tokenParams.permissions);
                params.userName = applicationManager.getUserPreferencesManager().getUserObj().userfirstname + " " + applicationManager.getUserPreferencesManager().getUserObj().userlastname;
                this.view.addPayee.setContext(params, this);
                this.view.addPayee.onError = this.onError;
            } catch (e) {
                var params = {
                    "billerCategory": "",
                    "phone": "",
                    "companyName": "",
                    "accountNumber": "",
                    "cityName": "",
                    "isManuallyAdded": "true",
                    "payeeAccountNumber": "",
                    "payeeName": "",
                    "flowType": "ADD",
                    "payeeId": "",
                    "payeeNickName": "nickname",
                    "state": "",
                    "zipCode": "",
                    "country": "",
                    "nameOnBill": "nameonbill",
                    "street": "",
                    "addressLine2": ""
                }
                if (inputs === "add") {
                    params["payeeId"] = "";
                    params["flowType"] = "ADD";
                }
                params["isCombinedUser"] = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.user_attributes.isCombinedUser;
                params.userName = applicationManager.getUserPreferencesManager().getUserObj().userfirstname + " " + applicationManager.getUserPreferencesManager().getUserObj().userlastname;
                this.view.addPayee.setContext(params, this);
                this.view.addPayee.onError = this.onError;
            }
        },
        enterInformationManually: function() {
           
        },
        /**
         * onError
         * Error thrown from catch block and shown on the form
         *  */
        onError: function(err) {
            kony.application.dismissLoadingScreen();
           kony.print(JSON.stringify(err));
        },
        postShow: function() {
           this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.view.segRegisteredPayees.accessibilityConfig={
                "a11yARIA": {
                    "tabindex": -1
                }
            }
        },
        initActions: function() {
            var scope = this;
            this.view.flxBillPayActivities.onClick = function() {
                this.presenter.showBillPaymentScreen({
                    context: "History",
                    loadBills: true
                });
            }.bind(this);
            this.view.addPayee.navigateToViewAllPayees = function(context) {
                this.presenter.showBillPaymentScreen({
                    context: "BulkPayees",
                    loadBills: true
                });
            }.bind(this);
            this.view.addPayee.navigateToManagePayees = function(context) {
                this.presenter.showBillPaymentScreen({
                    context: "ManagePayees",
                    loadBills: true
                });
            }.bind(this);
            this.view.addPayee.navigateToPayABill = function(context) {
                scope.presenter.makePayment(context);
            }.bind(this);
            this.view.addPayee.hideRightFlx = function() {
                if (kony.application.getCurrentBreakpoint() != 640 && kony.application.getCurrentBreakpoint() != 1024) {
                    if (scope.view.flxRight.isVisible) scope.view.flxRight.isVisible = false;
                    else scope.view.flxRight.isVisible = true;
                }
            };
            },
        onBreakpointChange: function(form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
        },
        /** @alias module:frmAddPayeeController */
        /** updates the present Form based on required function.
         * @param {list} viewModel used to load a view
         */
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.firstLoad) {
                this.initiateAddPayee(viewModel.firstLoad);
            }
            if (viewModel.registeredPayeeList) {
                this.updateRegisteredPayees(viewModel.registeredPayeeList);
            }
            if (viewModel.billersList) {
                this.showPayeeList(viewModel.billersList);
            }
            if (viewModel.billerDetails) {
                this.selectPayeeName(viewModel.billerDetails);
            }
            if (viewModel.isInvalidPayee) {
                this.enterCorrectBillerName();
            }
            if (viewModel.serverError) {
                this.view.rtxDowntimeWarning.text = viewModel.serverError;
                this.view.flxDowntimeWarning.setVisibility(true);
                FormControllerUtility.hideProgressBar(this.view);
                this.view.flxFormContent.forceLayout();
            }
            if (viewModel.campaign) {
                CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMain");
            }
        },
        /**
         * higlightBoxes
         */
        higlightBoxes: function() {
            for (var i = 0; i < arguments.length; i++) {
                arguments[i].skin = 'sknTbxSSPffffff15PxBorderFF0000opa50';
            }
        },
        /**
         * normalizeBoxes
         */
        normalizeBoxes: function() {
            for (var i = 0; i < arguments.length; i++) {
                arguments[i].skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
            }
        },
        /**
         * used to show the payee
         * @param {list} payeeList list of payees
         */
        showPayeeList: function(payeeList) {
            this.view.segPayeesName.widgetDataMap = {
                "flxNewPayees": "flxNewPayees",
                "lblNewPayees": "lblNewPayees"
            };
            if (payeeList.length > 0) {
                this.view.segPayeesName.setData(this.createNewPayeeModel(payeeList));
                this.view.flxPayeeList.isVisible = true;
                this.view.forceLayout();
            } else {
                this.view.flxPayeeList.isVisible = false;
                this.view.forceLayout();
            }
        },
        /**
         * used to navigate the history tab(On click on RightBar)
         */
        navigateToBillPayHistoryTab: function() {
            this.presenter.showBillPaymentScreen({
                context: "History"
            });
        },
        /**
         * used to create the new payee
         *  @param {list} billerList list of billers
         * @returns {object} list of billers
         */
        createNewPayeeModel: function(billerList) {
            return billerList.map(function(biller) {
                return {
                    "lblNewPayees": biller.billerName,
                    "flxNewPayees": {
                        "onClick": biller.onBillerSelection
                    }
                };
            }).reduce(function(p, e) {
                return p.concat(e);
            }, []);
        },
        /**
         * used to show the add payee screen
         */
        initiateAddPayee: function() {
            this.accountNumberAvailable = true;
        },
        /**
         * used to validates the on key up information
         */
        callOnKeyUp: function() {
            this.presenter.fetchBillerList(this.view.tbxCustomerName.text);
          
        },
        /**
         * used to set the payee widget Map
         * @param {list} registeredPayees list of payees
         */
        updateRegisteredPayees: function(registeredPayees) {
            this.view.segRegisteredPayees.widgetDataMap = {
                "flxRegistered": "flxRegistered",
                "lblCustomer": "lblCustomer",
                "lblAmount": "lblAmount",
                "lblDate": "lblDate",
                "btnViewDetails": "btnViewDetails",
                "btnPayBills": "btnPayBills",
                "lblHorizontalLine": "lblHorizontalLine",
                "lblIcon": "lblIcon",
                "flxIcon": "flxIcon"
            };
            if (registeredPayees.length === 0) {
                this.view.flxRegisteredPayees.setVisibility(false);
            } else {
                const regPayeeFlexHeight = registeredPayees.length * 120 + 50;
                this.view.flxRegisteredPayees.height = regPayeeFlexHeight > 537 ? "537dp" : regPayeeFlexHeight + "dp";
                this.view.flxRegisteredPayees.setVisibility(true);
                this.view.segRegisteredPayees.setData(this.createRegisteredPayeesSegmentModel(registeredPayees));
            }
            this.view.forceLayout();
        },
        /**
         * used to show the  list of all payees
         * @param {list} payees list of payees
         * @returns {object} payees object
         */
        createRegisteredPayeesSegmentModel: function(payees) {
            return payees.map(function(payee) {
                return {
                    "lblCustomer":
                    {
                       width:"90%",
						text:payee.payeeName
                    } ,
                    "lblHorizontalLine": "A",
                    "lblDate": CommonUtilities.getFrontendDateString(payee.lastPaidDate),
                    "lblAmount": CommonUtilities.formatCurrencyWithCommas(payee.lastPaidAmount),
                    "btnViewDetails": {
                        text: kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                        isVisible: applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES"),
                        accessibilityConfig: {
                            "a11yLabel": "View details for payee "+ payee.payeeName,
                            "a11yARIA": {
                                role: "button",
                                "tabindex": 0
                                
                            }
                        },
                        onClick: payee.onViewDetailsClick
                    },
                    "btnPayBills": {
                        text: kony.i18n.getLocalizedString("i18n.Pay.PayBills"),
                        isVisible: applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE"),
                        accessibilityConfig: {
                            "a11yLabel": "Pay bills for payee "+ payee.payeeName,
                            "a11yARIA": {
                                role: "button",
                                "tabindex": 0
                                
                            }
                        },
                        onClick: payee.onPayBillsClick
                    },
                    "lblIcon": {
                      
                        isVisible: this.profileAccess === "both" ? true : false,
                        text: payee.isBusinessPayee === "1" ? "r" : "s"
                    },
                    "flxIcon": {
                        isVisible: false, //this.profileAccess === "both" ? true : false,
                       
                    }
                };
            }).reduce(function(p, e) {
                return p.concat(e);
            }, []);
        },
        /**
         * used to select the payee name
         * @param {object} viewModel object
         */
        selectPayeeName: function(viewModel) {
            this.view.flxPayeeList.isVisible = false
            this.setDynamicFields(viewModel.billerCategoryName);
            this.view.forceLayout();
        },
        /**
         * used to set the payee data dynamicllay
         * @param {object} billerCategory billerCategory
         */
        setDynamicFields: function(billerCategory) {
            if (billerCategory == 'Credit Card' || billerCategory == 'Utilities') {
                this.doDynamicChangesAccordingToCategory(kony.i18n.getLocalizedString("i18n.common.accountNumber"), kony.i18n.getLocalizedString("i18n.common.AccountNumberPlaceholder"), {
                    'fieldHolds': 'AccountNumber'
                }, kony.i18n.getLocalizedString("i18n.addPayee.ConfirmRelationshipNumber"), kony.i18n.getLocalizedString("i18n.addPayee.ConfirmRelationshipNumber"));
            } else if (billerCategory == 'Phone') {
                this.doDynamicChangesAccordingToCategory(kony.i18n.getLocalizedString("i18n.common.accountNumber"), kony.i18n.getLocalizedString("i18n.addPayee.RelationshipNumberPlaceholder"), {
                    'fieldHolds': 'RelationshipNumber'
                }, kony.i18n.getLocalizedString("i18n.addPayee.ConfirmRelationshipNumber"), kony.i18n.getLocalizedString("i18n.addPayee.ConfirmRelationshipNumber"), kony.i18n.getLocalizedString("i18n.common.MobilePhone"), kony.i18n.getLocalizedString("i18n.common.MobilePhonePlaceholder"), {
                    'fieldHolds': 'MobileNumber'
                });
            } else if (billerCategory == 'Insurance') {
                this.doDynamicChangesAccordingToCategory(kony.i18n.getLocalizedString("i18n.common.accountNumber"), kony.i18n.getLocalizedString("i18n.common.AccountNumberPlaceholder"), {
                    'fieldHolds': 'AccountNumber'
                }, kony.i18n.getLocalizedString("i18n.addPayee.ConfirmRelationshipNumber"), kony.i18n.getLocalizedString("i18n.addPayee.ConfirmRelationshipNumber"), kony.i18n.getLocalizedString("i18n.addPayee.PolicyNumber"), kony.i18n.getLocalizedString("i18n.addPayee.PolicyNumberPlaceholder"), {
                    'fieldHolds': 'PolicyNumber'
                });
            }
        },
        /**
         * used to change the fields according to category.
         * @param {string} displaylabel1 label information
         * @param {string} placeholder1  place holder information
         * @param {string} info1 description
         * @param {string} displaylabel2 label information
         * @param {string} placeholder2  place holder information
         * @param {string} displaylabel3 label information
         * @param {string} placeholder3  place holder information
         * @param {string} info3 description
         */
        doDynamicChangesAccordingToCategory: function(displaylabel1, placeholder1, info1, displaylabel2, placeholder2, displaylabel3, placeholder3, info3) {
     //  CommonUtilities.setText(this.view.lblAccountNumber, displaylabel1, CommonUtilities.getaccessibilityConfig());
           this.view.lblAccountNumber.text=displaylabel1;
            this.view.tbxAccountNumber.info = info1;
           // CommonUtilities.setText(this.view.lblConfirmAccountNumber, displaylabel2, CommonUtilities.getaccessibilityConfig());
           this.view.lblConfirmAccountNumber.text=displaylabel2;
            this.view.tbxConfirmAccountNumber.placeholder = placeholder2;
            if (displaylabel3 !== undefined && placeholder3 !== undefined && info3 !== undefined) {
                //CommonUtilities.setText(this.view.lblPhoneNumber, displaylabel3, CommonUtilities.getaccessibilityConfig());
                this.view.lblPhoneNumber.text=displaylabel3;
                this.view.tbxPhoneNumber.placeholder = placeholder3;
                this.view.tbxPhoneNumber.info = info3;
                this.view.lblPhoneNumber.isVisible = true;
                this.view.tbxPhoneNumber.isVisible = true;
            } else {
                this.view.lblPhoneNumber.isVisible = false;
                this.view.tbxPhoneNumber.isVisible = false;
            }
        },
        /**
         * used to search the biller details(Onclick of btnNext)
         */
        goToSerchedBillerDetails: function() {
            var manuallyAddedPayee = {};
            this.view.flxMisMatch.isVisible = false;
            if (this.handleErrorInBillerSearch()) {
                manuallyAddedPayee.isManualUpdate = false;
                this.view.flxPayeeList.isVisible = false;
                if (this.view.tbxAccountNumber.info.fieldHolds === 'AccountNumber') {
                    manuallyAddedPayee.accountNumber = this.view.tbxAccountNumber.text;
                    if (this.view.tbxPhoneNumber.isVisible) {
                        if (this.view.tbxPhoneNumber.info.fieldHolds === 'PolicyNumber') {
                            manuallyAddedPayee.policyNumber = this.view.tbxPhoneNumber.text;
                        }
                    }
                } else if (this.view.tbxAccountNumber.info.fieldHolds === 'RelationshipNumber') {
                    manuallyAddedPayee.relationShipNumber = this.view.tbxAccountNumber.text;
                    manuallyAddedPayee.mobileNumber = this.view.tbxPhoneNumber.text;
                }
                manuallyAddedPayee.billerName = this.view.tbxCustomerName.text;
                manuallyAddedPayee.zipCode = this.view.tbxZipcode.text;
                let previousForm = kony.application.getPreviousForm().id;
                if (previousForm === "frmPayeeDetails" || previousForm === "frmVerifyPayee") {
                    manuallyAddedPayee.modify = true;
                } else {
                    manuallyAddedPayee.modify = false;
                }
                this.presenter.showUpdateBillerPage("frmAddPayee1", manuallyAddedPayee);
               
            }
        },
        /**
         * used to handle the error schenarion in biller search
         * @returns {boolean} status
         */
        handleErrorInBillerSearch: function() {
            var response = this.validateSearchedPayeeDetails();
            if (response === 'VALIDATION_SUCCESS') {
                this.normalizeBoxes(this.view.tbxAccountNumber, this.view.tbxConfirmAccountNumber);
                this.view.lblNotMatching.isVisible = false;
                return true;
            } else if (response === 'IDENTITY_NUMBER_MISMATCH') {
                if (this.view.tbxAccountNumber.info.fieldHolds === 'AccountNumber') {
                  //  CommonUtilities.setText(this.view.lblNotMatching, kony.i18n.getLocalizedString("i18n.addPayee.AccountNumberMismatch"), CommonUtilities.getaccessibilityConfig());
                this.view.lblNotMatching.text=kony.i18n.getLocalizedString("i18n.addPayee.AccountNumberMismatch");
                } else if (this.view.tbxAccountNumber.info.fieldHolds === 'RelationshipNumber') {
                   // CommonUtilities.setText(this.view.lblNotMatching, kony.i18n.getLocalizedString("i18n.addPayee.RelationshipNumberMismatch"), CommonUtilities.getaccessibilityConfig());
                this.view.lblNotMatching.text=kony.i18n.getLocalizedString("i18n.addPayee.RelationshipNumberMismatch");
                }
                this.view.flxMisMatch.isVisible = false;
                this.view.lblNotMatching.isVisible = true;
                FormControllerUtility.disableButton(this.view.btnNext);
                this.higlightBoxes(this.view.tbxAccountNumber, this.view.tbxConfirmAccountNumber);
                this.view.forceLayout();
                return false;
            } else if (response === 'NO_BILLER_SELECTED_FROM_LIST') {
               // CommonUtilities.setText(this.view.lblNotMatching, kony.i18n.getLocalizedString("i18n.addPayee.SelectBiller"), CommonUtilities.getaccessibilityConfig());
               this.view.lblNotMatching.text=kony.i18n.getLocalizedString("i18n.addPayee.SelectBiller");
                this.view.flxMisMatch.isVisible = false;
                this.view.lblNotMatching.isVisible = true;
                FormControllerUtility.disableButton(this.view.btnNext);
                this.view.forceLayout();
                return false;
            }
        },
        /**
         * used to validate the payee details
         * @returns {string} status of payee validation
         */
        validateSearchedPayeeDetails: function() {
            var identityNumber = this.view.tbxAccountNumber.text;
            var duplicateIdentityNumber = this.view.tbxConfirmAccountNumber.text;
            if (this.view.tbxAccountNumber.info === undefined) {
                return 'NO_BILLER_SELECTED_FROM_LIST';
            } else {
                if (identityNumber === duplicateIdentityNumber) {
                    return 'VALIDATION_SUCCESS';
                } else {
                    return 'IDENTITY_NUMBER_MISMATCH';
                }
            }
        },
        /**
         * validate  the biller Name
         */
        enterCorrectBillerName: function() {
            this.view.rtxMisMatch.text = kony.i18n.getLocalizedString("i18n.addPayee.SelectBiller");
            this.view.lblNotMatching.isVisible = false;
            this.view.flxMisMatch.isVisible = true;
            FormControllerUtility.disableButton(this.view.btnNext2);
            this.view.forceLayout();
        },
        /**
         * used to show the permission based UI
         */
        showHistoryOption: function() {
            this.view.flxBillPayActivities.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideHistoryOption: function() {
            this.view.flxBillPayActivities.setVisibility(false);
        },
        restrictSpecialCharacters: function() {
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var numericSet = "0123456789";
            this.view.tbxCustomerName.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
            this.view.tbxZipcode.restrictCharactersSet = alphabetsSet + specialCharactersSet;
            this.view.tbxAccountNumber.restrictCharactersSet = specialCharactersSet;
            this.view.tbxConfirmAccountNumber.restrictCharactersSet = specialCharactersSet;
        },
    };
	
});