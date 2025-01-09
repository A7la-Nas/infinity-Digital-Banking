/**
 * Description of Module representing a Confirm form.
 * @module frmBulkPayeesController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
     
    var orientationHandler = new OrientationHandler();
    var fromAccounts;

    return /** @alias module:frmBulkPayeesController */ {
        /** updates the present Form based on required function.
         * @param {uiDataMap[]} uiDataMap
         */
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            }
            if (!uiDataMap.isLoading) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.serverError) {
                this.setServerError(uiDataMap.serverError);
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            if (uiDataMap.selectedBeneficiaries) {
                this.setSelectedBeneficiariesData(uiDataMap);
            }
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayMultipleBeneficiariesUIModule").presentationController;
            this.initActions();
        },
        preShow: function() {
            var scope = this;
            this.view.customheadernew.activateMenu("Bill Pay", "Pay a Bill");
            this.view.btnBulkConfirm.onClick = this.onContinueClicked;
            var data = this.view.segmentBillpay.data;
            if (data) {
                this.calculateTotalAmount();
            }

            this.view.customheadernew.btnSkipNav.onClick = function(){
                scope.view.lblTransactions.setActive(true);
            }

            this.view.title= kony.i18n.getLocalizedString("i18n.Transfers.PayMultipleBeneficiaries");

            this.view.btnBulkConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            this.view.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
            this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.common.no");
        },
        
        /**
         * used perform the initialize activities.
         *
         */
        initActions: function() {
            var scopeObj = this;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayMultipleBeneficiariesUIModule").presentationController;
            this.view.flxAddABeneficiaryWrapper.onClick = function() {
                this.presenter.showPayMultipleBeneficiaries({
                    "showAddBeneficiary": true
                })
            }.bind(this);
            //scopeObj.setSorting();
        },
        /**
         * sorting configurations to beneficiaries
         */
        setSorting: function() {
            var scopeObj = this;
            scopeObj.beneficiaryNameSortMap = [{
                name: 'beneficiaryName',
                imageFlx: scopeObj.view.imgSortBeneficiaryName,
                clickContainer: scopeObj.view.flxBeneficiaryNameWrapper
            }];
            FormControllerUtility.setSortingHandlers(scopeObj.beneficiaryNameSortMap, scopeObj.onBeneficiaryNameClickHandler, scopeObj);
        },
        /**
         * Manage payee biller name sorting handler
         * @param {object} event
         * @param {object} data
         */
        onBeneficiaryNameClickHandler: function(event, data) {
            FormControllerUtility.showProgressBar(this.view);
            //this.presenter.manageBeneficiaryPagination(data);
        },
        /**
         * used to perform the post show activities
         *
         */
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
        },
        showAddBeneficiaryFlx: function() {
            this.view.flxAddABeneficiaryWrapper.setVisibility(true);
        },
        hideAddBeneficiaryFlx: function() {
            this.view.flxAddABeneficiaryWrapper.setVisibility(false);
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmConfirmtransferController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },

        setServerError: function(errorMessage) {
            this.view.rtxDowntimeWarning.text = errorMessage;
            this.view.flxDowntimeWarning.setVisibility(true);
            this.view.flxFormContent.forceLayout();
        },

        hideErrorFlex: function() {
            this.view.flxDowntimeWarning.setVisibility(false);
        },

        setSelectedBeneficiariesData: function(data) {
            FormControllerUtility.showProgressBar(this.view);
            var scopeObj = this;
            beneficiariesData = data.selectedBeneficiaries;
            fromAccounts = data.fromAccounts;
            preferredFromAccount = this.presenter.getDefaultFromAccount();
            var dataMap = {
                "flxBeneficiariesSelected": "flxBeneficiariesSelected",
                "flxIdentifier": "flxIdentifier",
                "lblIdentifier": "lblIdentifier",
                "flxContent": "flxContent",
                "flxBillPayAllPayees": "flxBillPayAllPayees",
                "flxBillPayAllPayeesWrapper": "flxBillPayAllPayeesWrapper",
                "flxDropdown": "flxDropdown",
                "lblDropdown": "lblDropdown",
                "flxWrapper": "flxWrapper",
                "flxPayee": "flxPayee",
                "flxBill": "flxBill",
                "flxAmount": "flxAmount",
                "flxPayeeWrapper": "flxPayeeWrapper",
                "lblBeneficiaryName": "lblBeneficiaryName",
                "lblBankDetails": "lblBankDetails",
                "lblAccountName": "lblAccountName",
                "flxAmountDollar": "flxAmountDollar",
                "lblDollar": "lblDollar",
                "txtAmount": "txtAmount",
                "lblSeparator": "lblSeparator",
                "lblError": "lblError",
                "flxdetails": "flxdetails",
                "flxPayFrom": "flxPayFrom",
                "flxInstantTransfer": "flxInstantTransfer",
                "flxPaymentReference": "flxPaymentReference",
                "flxAttachmentAndDelete": "flxAttachmentAndDelete",
                "lblPayFrom": "lblPayFrom",
                "lstPayFrom": "lstPayFrom",
                "lblInstantTransfer": "lblInstantTransfer",
                "lblPaymentReference": "lblPaymentReference",
                "flxNotesValue": "flxNotesValue",
                "txtNotes": "txtNotes",
                "flxAttachDocuments": "flxAttachDocuments",
                "lblAttachment": "lblAttachment",
                "flxViewEBill": "flxViewEBill",
                "btnViewEBill": "btnViewEBill",
                "flxCheckbox": "flxCheckbox",
                "lblCheckbox": "lblCheckbox",
                "lblBankName": "lblBankName",
                "lblAccountNumber": "lblAccountNumber",
                "lblSeparatorBottom": "lblSeparatorBottom",
                "lblBankNameWithAccountNumber": "lblBankNameWithAccountNumber",
                "lblPaymentType": "lblPaymentType",
                "lblEndingBalance": "lblEndingBalance",
                "fromAccountCurrency": "fromAccountCurrency",
                "isInstantPayAvailable": "isInstantPayAvailable"
            };
            const specialCharactersSet = "!@#&*_'-~^|$%()+=}{][/|?,.><`:;\"\\";
            const alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            if (beneficiariesData.length > 0) {
                this.view.lblBeneficiariesSelected.text = beneficiariesData.length + " " + kony.i18n.getLocalizedString("i18n.Transfers.BeneficiariesSelected");
                var manageBeneficiaries = beneficiariesData.map(function(dataItem, index) {
                    var manageBeneficiary = {
                        "flxBeneficiariesSelected": {
                            "height": "80dp"
                        },
                        "flxdetails": {
                            "isVisible": false
                        },
                        "flxBillPayAllPayees": {
                            "height": "80dp"
                        },
                        "lblPayFrom": {
                            "text": kony.i18n.getLocalizedString("i18n.billPay.PayFrom")
                        },
                        "lblSeparatorBottom": {
                            "text": ""
                        },
                        "lblBeneficiaryName": {
                            "text": dataItem.lblBeneficiaryName
                        },
                        "lblBankDetails": {
                            "text": dataItem.lblBankNameWithAccountNumber
                        },
                        "lstPayFrom": {
                            "masterData": FormControllerUtility.getListBoxDataFromObjects(fromAccounts, "accountID", CommonUtilities.getAccountDisplayNameWithBalance),
                            "selectedKey": preferredFromAccount.accountID ? preferredFromAccount.accountID : fromAccounts[0].accountID,
                            "onSelection": scopeObj.setSelectedKeyValueForListbox.bind(this, index, fromAccounts)
                        },
                        "lblAccountName": {
                            "text": preferredFromAccount.accountID ? CommonUtilities.getAccountDisplayName(preferredFromAccount) : CommonUtilities.getAccountDisplayName(fromAccounts[0])
                        },
                        "lblDollar": applicationManager.getConfigurationManager().getCurrencyCode(),
                        "flxAttachDocuments": {
                            "onTouchStart": scopeObj.attachDocuments.bind(this)
                        },
                        "fromAccountCurrency": {
                            "text": preferredFromAccount.accountID ? preferredFromAccount.transactionCurrency || preferredFromAccount.currencyCode : fromAccounts[0].transactionCurrency || fromAccounts[0].currencyCode
                        },
                        "lblBankName": {
                            "text": dataItem.bankName
                        },
                        "lblAccountNumber": {
                            "text": dataItem.accountNumber
                        },
                        "lblBankNameWithAccountNumber": {
                            "text": dataItem.lblBankNameWithAccountNumber
                        },
                        "txtNotes": {
                            "placeholder": kony.i18n.getLocalizedString("i18n.transfers.optional")
                        },
                        "lblCheckbox": {
                            "text": "D",
                            "skin": dataItem.isInstantPayAvailable === true ? "sknlblDelete20px" : "sknFontIconCheckBoxDisabled",
                            "onTouchStart": dataItem.isInstantPayAvailable === true ? scopeObj.toggleCheckbox.bind(this, index, fromAccounts) : function() {}
                        },
                        "lblInstantTransfer": {
                            "text": kony.i18n.getLocalizedString("i18n.Transfers.InstantTransfer")
                        },
                        "lblPaymentReference": {
                            "text": kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference")
                        },
                        "lblAttachment": {
                            "text": kony.i18n.getLocalizedString("i18n.TransfersEur.AttachSupportingDocuments")
                        },
                        "btnViewEBill": {
                            "text": kony.i18n.getLocalizedString("i18n.Transfers.DeleteFromThisList"),
                            "onClick": scopeObj.deleteFromList.bind(this, index, fromAccounts)
                        },
                        "lblDropdown": {
                            "text": "O"
                        },
                      "lblSeparator": {"isVisible": false},
                        "txtAmount": {
                            "placeholder": kony.i18n.getLocalizedString("i18n.common.EnterAmount"),
                            "text": "",
                            "onTextChange": scopeObj.calculateTotalAmount.bind(this, index),
                            "restrictCharactersSet": specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase()
                        },
                        "flxIdentifier": {
                            "skin": "sknFlxIdentifier",
                            "isVisible": false
                        },
                        "lblIdentifier": {
                            "skin": "sknffffff15pxolbfonticons"
                        },
                        "flxBeneficiariesWrapper": {
                            "height": "50dp",
                            "skin": "sknflxffffffnoborder"
                        },
                        "lblPaymentType": {
                            "text": kony.i18n.getLocalizedString("i18n.payments.Standard")
                        },
                        "lblEndingBalance": {
                            "text": applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(fromAccounts[0].availableBalance, applicationManager.getConfigurationManager().getCurrencyCode())
                        },
                        "isInstantPayAvailable": dataItem.isInstantPayAvailable
                    };
                    return manageBeneficiary;
                });
            }
            if (beneficiariesData.length === 1) {
                manageBeneficiaries[0].btnViewEBill.text =kony.i18n.getLocalizedString("i18n.payments.backBeneficiaries") ;
            }
            this.view.segmentBillpay.widgetDataMap = dataMap;
            this.view.segmentBillpay.setData(manageBeneficiaries);
            this.view.btnBack.onClick = this.onBackClicked.bind(this, beneficiariesData);
            this.calculateTotalAmount();
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        calculateTotalAmount: function (index) {
            var self = this;
            const segData = this.view.segmentBillpay.data;
            const errMsg = kony.i18n.getLocalizedString("i18n.Profilemanagement.lblInvalidAmount");
            if (!kony.sdk.isNullOrUndefined(index)) {
                const enteredAmount = segData[index].txtAmount.text;
                if (enteredAmount && isNaN(enteredAmount) && enteredAmount > 0) {
                    self.setServerError(errMsg);
                    CommonUtilities.disableButton(this.view.btnBulkConfirm);
                    return;
                }
            }
            let totalAmount = 0, rowCount = 0;
            for (const data of segData) {
              var amount = data.txtAmount.text
                if (amount && !isNaN(amount) && amount > 0) {
                    totalAmount += parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(amount));
                    rowCount++;
                }else{
                    CommonUtilities.disableButton(this.view.btnBulkConfirm);
                    return;
                }
            }
            currencySymbol = applicationManager.getConfigurationManager().getCurrencyCode();
            this.view.lblTotalAmount.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(totalAmount, currencySymbol);
            if (rowCount === segData.length) {
                CommonUtilities.enableButton(this.view.btnBulkConfirm);
                this.view.flxDowntimeWarning.setVisibility(false);
            } else {
                CommonUtilities.disableButton(this.view.btnBulkConfirm);
            }
        },

        setSelectedKeyValueForListbox: function(index, fromAccounts) {
            var data = this.view.segmentBillpay.data;
            var selectedKey = data[index].lstPayFrom.selectedKey;
            var selectedAccount = fromAccounts.filter(function(account) {
                if (account.accountID === selectedKey)
                    return account;
            })
            data[index].lblAccountName.text = CommonUtilities.getAccountDisplayName(selectedAccount[0]);
            data[index].lblEndingBalance.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(selectedAccount[0].availableBalance, applicationManager.getConfigurationManager().getCurrencyCode());
            data[index].fromAccountCurrency.text = selectedAccount[0].transactionCurrency || selectedAccount[0].currencyCode;
            this.view.segmentBillpay.setDataAt(data[index], index);
        },
        onContinueClicked: function() {
            var data = this.view.segmentBillpay.data;
            var records = [];
            var self = this;
            var isInputSelected = false;
            var errMsg = kony.i18n.getLocalizedString("i18n.Profilemanagement.lblInvalidAmount");
            for (var record in data) {
                var amount = parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(data[record].txtAmount.text));
                if (!isNaN(amount)) {
                    isInputSelected = true;
                    records.push({
                        "lblBeneficiaryName": data[record].lblBeneficiaryName.text,
                        "lblBankName": data[record].lblBankName.text,
                        "toAccountNumber": data[record].lblAccountNumber.text,
                        "lblAccountNumber": data[record].lstPayFrom.selectedKey,
                        "lblBankNameWithAccountNumber": data[record].lblBankNameWithAccountNumber.text,
                        "lblAccountName": data[record].lblAccountName.text,
                        "paymentType": data[record].isInstantPayAvailable === true ? data[record].lblPaymentType.text : "Standard",
                        "lblEndingBalance": "Ending balance : " + data[record].lblEndingBalance.text,
                        "lblAmount": applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(amount),
                        "transactionNotes": data[record].txtNotes.text,
                        "fromAccountCurrency": data[record].fromAccountCurrency.text
                    });
                } else {
                    isInputSelected = false;
                    break;
                }
            }
            if (isInputSelected) {
                self.hideErrorFlex();
                var beneficiaries = {};
                beneficiaries.records = records;
                beneficiaries.totalAmount = this.view.lblTotalAmount.text;
                beneficiaries.fromAccounts = fromAccounts;
                this.presenter.showPayMultipleBeneficiaries({
                    "selectedBeneficiariesConfirm": beneficiaries
                });
            } else {
                self.setServerError(errMsg);
            }
        },

        onBackClicked: function(data) {
            this.presenter.showPayMultipleBeneficiaries({
                "backToBeneficiariesLandingPage": data || true
            });
        },

        attachDocuments: function() {

        },

        toggleCheckbox: function(index) {
            var data = this.view.segmentBillpay.data;
            if (data[index].lblCheckbox.text === "D") {
                data[index].lblCheckbox.text = "C";
                data[index].lblPaymentType.text = kony.i18n.getLocalizedString("i18n.unified.paymentMethodHeader2");
            } else {
                data[index].lblCheckbox.text = "D";
                data[index].lblPaymentType.text =kony.i18n.getLocalizedString("i18n.payments.Standard");
            }
            this.view.segmentBillpay.setDataAt(data[index], index);
        },

        deleteFromList: function(index, fromAccounts) {
            var self = this;
            var data = self.view.segmentBillpay.data;
            self.view.flxDialogs.setVisibility(true);
            self.view.flxCancelPopup.setVisibility(true);
            self.view.CustomPopupCancel.lblHeading.setFocus(true);
            this.view.CustomPopupCancel.lblPopupMessage.text = data.length === 1 ? kony.i18n.getLocalizedString("i18n.payments.backToBeneficiariesList"): kony.i18n.getLocalizedString("i18n.payments.deleteBeneficiariesList");
            this.view.CustomPopupCancel.btnYes.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                if (data.length === 1) {
                    self.onBackClicked();
                }
				beneficiariesData.splice(index, 1);
                data.splice(index, 1);
                for (var i = index; i < data.length; i++) {
                    data[i].lblCheckbox.onTouchStart = self.toggleCheckbox.bind(self, i);
                    data[i].txtAmount.onTextChange = self.calculateTotalAmount.bind(self, i);
                    data[i].btnViewEBill.onClick = self.deleteFromList.bind(self, i, fromAccounts);
                }
                if (data.length === 1) {
                    data[0].btnViewEBill.text = kony.i18n.getLocalizedString("i18n.payments.backBeneficiaries");
                }
              	self.view.lblBeneficiariesSelected.text = data.length + " " + kony.i18n.getLocalizedString("i18n.Transfers.BeneficiariesSelected");
                self.view.segmentBillpay.setData(data);
                self.calculateTotalAmount();
            };
            this.view.CustomPopupCancel.btnNo.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.view.forceLayout();
            };
            this.view.CustomPopupCancel.flxCross.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.view.forceLayout();
            };
        }
    };
});