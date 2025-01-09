define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        init: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.initActions();
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
        },
        preShow: function() {
            this.view.customheadernew.activateMenu("Bill Pay", "Add Payee");
            this.view.CustomPopupCancel.btnYes.onClick = this.viewallpayeesbtnaction;
            this.view.CustomPopupCancel.btnNo.onClick = this.hideCancelPopup;
            this.view.CustomPopupCancel.flxCross.onClick = this.hideCancelPopup;
            this.view.flxServerError.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            this.view.contractList.setVisibility(false);
            this.view.flxAddBillerDetails.setVisibility(true);
            this.view.customheadernew.btnSkipNav.onClick = this.skipNav;
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
            if(this.view.contractList.isVisible==true){
                this.view.flxCancelPopup.onKeyPress = this.onKeyPressCallBack;
            } 
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            //this.view.btnDetailsConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.next");
            //this.view.btnDetailsBack.toolTip = kony.i18n.getLocalizedString("i18n.wealth.back");
            //this.view.btnDetailsCancel.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
            this.view.lblAddPayee.text="Add Payee";
            this.view.flxCancelPopup.accessibilityConfig={
                "a11yARIA" : {
                    "tabindex" : -1,
                    "role" : "dialog"
                }
                }
        this.view.lblError.accessibilityConfig = {
            "a11yARIA": {
                "tabindex": -1,
                "role": "alert"
            }
        }

        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {                
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxDialogs.setVisibility(false);
                    self.view.flxLogout.setVisibility(false);
                    self.view.customheadernew.btnLogout.setActive(true);
                }
				if (self.view.flxCancelPopup.isVisible === true) {
                    self.view.flxDialogs.setVisibility(false);
                    self.view.flxCancelPopup.setVisibility(false);
                    self.view.btnDetailsCancel.setActive(true);
                }
            }
        },
        skipNav: function() {
            this.view.lblAddPayee.setActive(true);
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        initActions: function() {
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
        },
        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scopeObj.view.CustomPopupCancel, width);
        },
        /** updates the present Form based on required function.
         * @param {list} uiDataMap used to load a view
         */
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.ProgressBar) {
                if (uiDataMap.ProgressBar.show) {
                    FormControllerUtility.showProgressBar(this.view);
                } else {
                    FormControllerUtility.hideProgressBar(this.view);
                }
            }
            if (uiDataMap.payeeUpdateDetails) {
                this.prePopulatePayeeDetails(uiDataMap.payeeUpdateDetails, uiDataMap.frm);
            }
            if (uiDataMap.contracts) {
                this.setContractsData(uiDataMap.contracts);
            }
            if (uiDataMap.serverError) {
                this.view.rtxErrorMessage.text = uiDataMap.serverError;
                this.view.flxServerError.setVisibility(true);
                FormControllerUtility.hideProgressBar(this.view);
                this.view.flxFormContent.forceLayout();
            }
        },
        /**
         * used to show the payee details
         * @param {object} payeeDetails payee details
         */
        prePopulatePayeeDetails: function(payeeDetails, frm) {
            var scopeObj = this;
            if (payeeDetails.accountNumber === "") {
                CommonUtilities.setText(scopeObj.view.lblAddAccNumValue, kony.i18n.getLocalizedString("i18n.common.NotAvailable"), CommonUtilities.getaccessibilityConfig());
            } else {
                CommonUtilities.setText(scopeObj.view.lblAddAccNumValue, payeeDetails.accountNumber, CommonUtilities.getaccessibilityConfig());
            }
            CommonUtilities.setText(scopeObj.view.lblAddBillerValue, payeeDetails.billerName, CommonUtilities.getaccessibilityConfig());
            scopeObj.view.rtxAddAddressValue.text = payeeDetails.billerAddress;
            scopeObj.view.tbxAddNickValue.restrictCharactersSet = "1234567890~!#$%^&*()_-\\?/+={[]}:;,<>'`|\"";
            scopeObj.view.tbxAddNameOnBillValue.restrictCharactersSet = "1234567890~!#$%^&*()_-\\?/+={[]}:;,<>'`|\"";
            scopeObj.view.tbxAddNickValue.text = payeeDetails.payeeNickName;
            scopeObj.view.tbxAddNameOnBillValue.text = payeeDetails.nameOnBill;
            // scopeObj.view.btnDetailsConfirm.onClick = this.goToVerifyPayeeDetails.bind(this,frm);
            scopeObj.view.btnDetailsConfirm.onClick = function() {
                //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
                //    if(applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false){
                //    scopeObj.goToAddRecepientDetails(frm);
                //  }
                //   else{
                //     scopeObj.goToVerifyPayeeDetails(frm);
                //   }

                scopeObj.getContracts(frm, payeeDetails.modify);

            };
            scopeObj.view.btnDetailsBack.onClick = function () {
                scopeObj.presenter.showBillPaymentScreen({
                    context: "BulkPayees",
                    loadBills: true
                });
            };
            scopeObj.view.btnDetailsCancel.onClick = function() {
                scopeObj.showCancelPopup();
            };

            scopeObj.view.forceLayout();
        },
        /**
         * used to show the confirmation payee details screen  onClick of btnDetailsConfirm
         */
        goToVerifyPayeeDetails: function(frm) {
            var data = {
                payeeNickName: null,
                nameOnBill: null,
                isBusinessPayee: null
            };
            data.payeeNickName = this.view.tbxAddNickValue.text;
            data.nameOnBill = this.view.tbxAddNameOnBillValue.text;
            if (applicationManager.getConfigurationManager().isSMEUser === "true") {
                data.isBusinessPayee = "1";
            }
            if (applicationManager.getConfigurationManager().isRBUser === "true") {
                data.isBusinessPayee = "0";
            }
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                if (this.view.lblPersonalBankingSelect.text === "M") {
                    data.isBusinessPayee = "0";
                } else {
                    data.isBusinessPayee = "1";
                }
                if (this.view.lblBusinessBankingSelect.text === "M") {
                    data.isBusinessPayee = "1";
                } else {
                    data.isBusinessPayee = "0";
                }
            }
            if (this.cif) {
                data.cif = this.cif;
            }
            data.contractsData = this.view.contractList.segContract.data;
            this.presenter.showAddPayeeConfirmPage(data, frm);
        },
        /**
         * show or hide cancel popup
         */
        showCancelPopup: function() {
            var scopeObj = this;
            scopeObj.view.CustomPopupCancel.lblHeading.text="Cancel";
            this.view.CustomPopupCancel.flxCross.accessibilityConfig = {
                "a11yLabel" : "Close this Popup",
                "a11yARIA": {
                    "tabindex": 0,
                    "role": "button"
                }
            }
            this.view.CustomPopupCancel.btnYes.accessibilityConfig={
                "a11yLabel" : "Yes, cancel add payee process",
                        "a11yARIA" : {
                          "tabindex" : 0,
                          "role" : "button"
                        }
                      }
            this.view.CustomPopupCancel.btnNo.accessibilityConfig={
                    "a11yLabel" : "No, don't cancel add payee process.",
                    "a11yARIA" : {
                        "tabindex" : 0,
                        "role" : "button"
                    }
                    }
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.CustomPopupCancel.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.presenter.showBillPaymentScreen({
                    context: "BulkPayees",
                    loadBills: true
                });
            };
            scopeObj.view.CustomPopupCancel.btnNo.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.contractList.btnAction4.setActive(true);
            }
            scopeObj.view.CustomPopupCancel.flxCross.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.contractList.btnAction4.setActive(true);
            }
        scopeObj.view.CustomPopupCancel.lblHeading.setActive(true);
        },

        goToAddRecepientDetails: function(frm) {
            var scopeObj = this;
            scopeObj.view.flxAddBillerDetails.setVisibility(false);
            scopeObj.view.flxAddRecepientTo.setVisibility(true);
            scopeObj.radioButtonClick();
            scopeObj.view.btnRecepientBack.onClick = function() {
                scopeObj.view.flxAddBillerDetails.setVisibility(true);
                scopeObj.view.flxAddRecepientTo.setVisibility(false);
            };
            scopeObj.view.btnRecepientCancel.onClick = function() {
                scopeObj.showCancelPopup();
            };
            scopeObj.view.btnAddRecepientContinue.onClick = function() {
                scopeObj.goToVerifyPayeeDetails(frm);
            };
        },

        radioButtonClick: function() {
            var scopeObj = this;
            scopeObj.view.lblPersonalBankingSelect.text = "M";
            scopeObj.view.lblBusinessBankingSelect.text = "L";
            scopeObj.view.lblPersonalBankingSelect.onTouchStart = function() {
                scopeObj.view.lblPersonalBankingSelect.text = "M";
                scopeObj.view.lblBusinessBankingSelect.text = "L";
            };
            scopeObj.view.lblBusinessBankingSelect.onTouchStart = function() {
                scopeObj.view.lblPersonalBankingSelect.text = "L";
                scopeObj.view.lblBusinessBankingSelect.text = "M";
            };
        },

        formValidations: function(){
            var isValid = /^[a-zA-z]+([\s][a-zA-Z]+)*$/.test(this.view.tbxAddNickValue.text) && /^[a-zA-z]+([\s][a-zA-Z]+)*$/.test(this.view.tbxAddNameOnBillValue.text);
            return isValid;
        },
        getContracts: function(data, modify) {
            this.frm = data;
            var valid = this.formValidations();
            if(valid){
                this.view.lblError.setVisibility(false);
            } 
            else{this.view.lblError.setVisibility(true);
                return;
            }
            if (!modify) {
                this.presenter.getContracts("BILL_PAY_CREATE_PAYEES");
            } else if (this.cif) {
                this.goToVerifyPayeeDetails(this.frm)
            } else {
                this.view.contractList.setVisibility(true);
                this.view.flxAddBillerDetails.setVisibility(false);
            }
        },

        setContractsData: function(contractsData) {

            if (contractsData.contracts.length > 0) {
                if (contractsData.contracts.length == 1 && contractsData.contracts[0].contractCustomers.length == 1) {
                    this.view.contractList.segContract.data = [];
                    this.cif = JSON.stringify([{
                        "contractId": contractsData.contracts[0].contractId,
                        "coreCustomerId": contractsData.contracts[0].contractCustomers[0].coreCustomerId
                    }]);
                    this.view.contractList.setVisibility(false);
                    // this.view.flxAddBillerDetails.setVisibility(true);
                    this.goToVerifyPayeeDetails(this.frm)
                } else {
                    this.view.contractList.setVisibility(true);
                    this.view.flxAddBillerDetails.setVisibility(false);

                    contractsData.isCombinedUser = applicationManager.getUserPreferencesManager().profileAccess == "both" ? true : false;

                    if (this.isEdit) {
                        this.view.contractList.preshow(contractsData, editPayeeData.payee.cif);
                    } else {
                        this.view.contractList.preshow(contractsData);
                    }

                    this.view.contractList.btnAction4.onClick = this.showCancelPopup;
                    this.view.contractList.btnAction5.onClick = function() {
                        this.view.flxAddBillerDetails.setVisibility(true);
                        this.view.contractList.setVisibility(false);
                        this.view.btnDetailsConfirm.onClick = function() {
                            this.getContracts(this.frm, true);
                        }.bind(this);

                    }.bind(this);
                    this.view.contractList.btnAction6.onClick = this.goToVerifyPayeeDetails.bind(this, this.frm);
                }
            } else {
               kony.print("You Do not have permission for any contract")
            }
        },

    };
});