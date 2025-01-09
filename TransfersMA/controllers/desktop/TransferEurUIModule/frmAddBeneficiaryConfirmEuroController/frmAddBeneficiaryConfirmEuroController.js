define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
 	return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.euroPresenter =   applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferEurUIModule"});
            this.ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "ManageActivitiesUIModule"});
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            var self=this;
            this.view.customheadernew.activateMenu("EUROTRANSFERS", "Manage Beneficiaries");
            //this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Confirm");
            //this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Modify");
            //this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.unifiedBeneficiary.Cancel");
            this.view.btnConfirm.accessibilityConfig = {
                a11yLabel:"Confirm new beneficiary details"
            };
            this.view.btnModify.accessibilityConfig = {
                a11yLabel:"Modify new beneficiary details"
            };
            this.view.btnCancel.accessibilityConfig = {
                a11yLabel:"Cancel add new beneficiary process"
            };
            this.view.customheadernew.btnSkipNav.onClick = function() {
                self.view.lblAddBeneficiary.setActive(true);
                }
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
          	this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopupCancel.onKeyPress = this.onKeyPressCallBack;
          	this.view.CustomPopupCancel.doLayout = CommonUtilities.centerPopupFlex;
            this.view.screenConfirm.imgSortColumn1.src = "sorting_previous.png";
            this.view.CustomPopupCancel.accessibilityConfig = {
                a11yARIA:{
                    "role":"dialog",
                    "tabindex":-1
                }
            }
        },

        onKeyPressCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxDialogs.isVisible = false;
                    this.view.customheadernew.btnLogout.setFocus(true);
                }
                else if(this.view.flxCancelPopup.isVisible === true){
                    this.view.flxDialogs.isVisible = false;
                    this.view.btnCancel.setFocus(true);
                }
                this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
            }
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            } else {
                this.setBeneficiaryData(viewModel);
            }
        },
        /**
         * Method to set beneficiary data for confirmation
         * @param {Object} data beneficiary data
         */
        setBeneficiaryData: function(data) {
            var scopeObj = this;
            scopeObj.setFormattedAddress(data);
            var payment_method;
            if ((data.isInternationalAccount === false || data.isInternationalAccount === "false") && (data.isSameBankAccount === false || data.isSameBankAccount === "false")) {
                payment_method = "Domestic";
            } else if ((data.isInternationalAccount === true || data.isInternationalAccount === "true") && (data.isSameBankAccount === false || data.isSameBankAccount === "false")) {
                payment_method = "International";
            } else if ((data.isInternationalAccount === false || data.isInternationalAccount === "false") && (data.isSameBankAccount === true || data.isSameBankAccount === "true")) {
                payment_method = "Within Bank";
            }
            var bankDetails = "-";
            if (data.bankName || data.bankCountry) {
                bankDetails = [data.bankName, data.bankCountry].filter(function(string) {
                    if (string) {
                        return true;
                    }
                    return false;
                }).join(', ');
            }
            if (data.isSameBankAccount || JSON.parse(data.isSameBankAccount)) {
                scopeObj.view.flxSwiftCode.setVisibility(false);
                scopeObj.view.flxBank.setVisibility(false);
            } else {
                scopeObj.view.flxSwiftCode.setVisibility(true);
                scopeObj.view.flxBank.setVisibility(true);
            }
            scopeObj.view.lblAccountNumberValue.text = data.accountNumber;
            if(data.swiftCode){
                scopeObj.view.lblSwiftCodeValue.text = data.swiftCode; 
            }
            else{
                scopeObj.view.lblSwiftCodeValue.text = kony.i18n.getLocalizedString("i18n.common.none");
            }
            scopeObj.view.lblBankValue.text = bankDetails;
            scopeObj.view.lblNameValue.text = data.beneficiaryName;
            if(data.swiftCode){
                scopeObj.view.lblNicknameValue.text = data.nickName; 
            }
            else{
                scopeObj.view.lblNicknameValue.text = kony.i18n.getLocalizedString("i18n.common.none");
            }
            if(data.phone){
                scopeObj.view.lblPhoneNumberValue.text = data.nickName; 
            }
            else{
                scopeObj.view.lblPhoneNumberValue.text = kony.i18n.getLocalizedString("i18n.common.none");
            }
            if(data.phone){
                scopeObj.view.lblEmailAddressValue.text = data.email; 
            }
            else{
                scopeObj.view.lblEmailAddressValue.text = kony.i18n.getLocalizedString("i18n.common.none");
            }
            scopeObj.view.lblPaymentMethodKey.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentMethod");
            scopeObj.view.lblPaymentMethodValue.text = payment_method;
            scopeObj.view.forceLayout();
            scopeObj.view.btnCancel.onClick = function() {
                scopeObj.showCancelPopup(data.isEdit);
            };
            scopeObj.view.btnConfirm.onClick = function() {
                if (scopeObj.view.flxContractsComponent.isVisible) {
                    data.cif = scopeObj.view.screenConfirm.createCIFDataForAddBenificiary(scopeObj.view.screenConfirm.segContracts.data);
                    data.cifSegData = scopeObj.view.screenConfirm.segContracts.data;
                }
                scopeObj.euroPresenter.addBeneficiaryDetails(data, "frmAddBeneficiaryAcknowledgementEuro");
            };
            if (data.isEdit) {
                scopeObj.view.lblAddBeneficiary.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AddNewBeneficiaryConfirm");
                scopeObj.view.btnConfirm.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Save");
                scopeObj.view.btnConfirm.onClick = function() {
                    scopeObj.euroPresenter.saveChangedBeneficiaryDetails(data, data.editedField);
                    data.cifSegData = scopeObj.view.screenConfirm.segContracts.data;
                };
            } else {
                scopeObj.view.lblAddBeneficiary.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AddNewBeneficiaryConfirm");
                scopeObj.view.btnConfirm.text = kony.i18n.getLocalizedString("i18n.transfers.Confirm");
                scopeObj.view.btnConfirm.onClick = function() {
                    if (scopeObj.view.flxContractsComponent.isVisible) {
                        data.cif = scopeObj.view.screenConfirm.createCIFDataForAddBenificiary(scopeObj.view.screenConfirm.segContracts.data);
                        data.cifSegData = scopeObj.view.screenConfirm.segContracts.data;
                    }
                    scopeObj.euroPresenter.addBeneficiaryDetails(data, "frmAddBeneficiaryAcknowledgementEuro");
            };
            }

          	scopeObj.view.btnModify.onClick = function() {
            	scopeObj.euroPresenter.showView("frmAddBeneficiaryEuro", {
              		"modifyBeneficiary": data
            	});
            // applicationManager.getNavigationManager().navigateTo("frmAddBeneficiaryEuro");
          };
            if (data.contractsData && data.contractsData.length > 0) {
                scopeObj.view.flxContractsComponent.setVisibility(true);
				scopeObj.view.flxButtons.top = "0dp";
				scopeObj.view.flxHorizontalLine2.width = "100%";
                scopeObj.setContractsData(data.contractsData);
            } else {
				scopeObj.view.flxButtons.top = "30dp";
				scopeObj.view.flxHorizontalLine2.width = "96%";
                scopeObj.view.flxContractsComponent.setVisibility(false)
            }
        },

        setContractsData: function(data) {
            this.view.screenConfirm.setConfirmScreenContractsData(data);
        },
        /**
         * Method to set formatted beneficiary address
         * @param {Object} data - beneficiary data
         */
        setFormattedAddress: function(data) {
            var scopeObj = this;
            if (!data.addressLine1 && !data.addressLine2 && !data.city && !data.zipcode && !data.country) {
                scopeObj.view.lblAddress1.setVisibility(true);
                scopeObj.view.lblAddress2.setVisibility(false);
                scopeObj.view.lblAddress3.setVisibility(false);
                scopeObj.view.lblAddress1.text = kony.i18n.getLocalizedString("i18n.common.none");
                return;
            }
            if (!data.addressLine1) {
                scopeObj.view.lblAddress1.setVisibility(false);
            } else {
                scopeObj.view.lblAddress1.setVisibility(true);
                scopeObj.view.lblAddress1.text = data.addressLine1;
            }
            if (!data.addressLine2) {
                scopeObj.view.lblAddress2.setVisibility(false);
            } else {
                scopeObj.view.lblAddress2.setVisibility(true);
                scopeObj.view.lblAddress2.text = data.addressLine2;
            }
            if (!data.city && !data.zipcode && !data.country) {
                scopeObj.view.lblAddress3.setVisibility(false);
            } else {
                scopeObj.view.lblAddress3.setVisibility(true);
                var strings = [data.city, data.country, data.zipcode];
                CommonUtilities.setText(scopeObj.view.lblAddress3, strings.filter(function(string) {
                    if (string) {
                        return true;
                    }
                    return false;
                }).join(', '), CommonUtilities.getaccessibilityConfig());
            }
            scopeObj.view.forceLayout();
        },
        /**
         * show or hide cancel popup
         */
        showCancelPopup: function(isEdit) {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.CustomPopupCancel.lblHeading.accessibilityConfig = {
                a11yARIA:{
                    tabindex:-1
                }
            }
            scopeObj.view.CustomPopupCancel.flxCross.accessibilityConfig = {
                a11yLabel : kony.i18n.getLocalizedString("i18n.common.close")+"this Cancel dialog",
                a11yARIA : {
                  tabindex : 0,
                  role : "button"
                }
            }
            scopeObj.view.CustomPopupCancel.btnYes.accessibilityConfig = {
                a11yLabel : "Yes, cancel this process",
                a11yARIA : {
                    tabindex : 0,
                    role : "button"
                  }
            }
            scopeObj.view.CustomPopupCancel.btnNo.accessibilityConfig = {
                a11yLabel : "No, don't cancel this process",
                a11yARIA : {
                    tabindex : 0,
                    role : "button"
                  }
            }
            scopeObj.view.CustomPopupCancel.lblHeading.setActive(true);
            if (isEdit === true) {
                scopeObj.view.CustomPopupCancel.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.payments.editingBeneficiary");
            } else {
                scopeObj.view.CustomPopupCancel.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AddBeneficiaryCancelMessage");
            }
            scopeObj.view.CustomPopupCancel.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.ManageActivitiesPresenter.showTransferScreen({
                    context: "ManageBeneficiaries"
                });
            };
            scopeObj.view.CustomPopupCancel.btnNo.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.btnCancel.setActive(true);
            };
            scopeObj.view.CustomPopupCancel.flxCross.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.btnCancel.setActive(true);
            };
        }
    };
});