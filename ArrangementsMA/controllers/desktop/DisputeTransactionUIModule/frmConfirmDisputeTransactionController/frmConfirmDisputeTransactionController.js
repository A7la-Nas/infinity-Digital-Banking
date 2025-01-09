define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
    var responsiveUtils = new ResponsiveUtils();
    return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DisputeTransactionUIModule").presentationController;
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            this.view.customheadernew.activateMenu("EUROTRANSFERS", "Manage Beneficiaries");
            	var scope=this;
          this.view.customheadernew.btnSkipNav.onClick = function() {
           scope.view.lblAddBeneficiary.setActive(true);

             },
			 
			 this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
             this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
        scope.view.flxCancelPopup.onKeyPress = this.onKeyPressCallBack;
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
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
            }
            if (viewModel.disputeDetails) {
                this.showConfirmDisputeTransactionPage(viewModel.disputeDetails);
            }
        },
        
			 onKeyPressCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxDialogs.isVisible = false;
                    this.view.customheadernew.btnLogout.setFocus(true);
                }
else if (this.view.flxCancelPopup.isVisible === true) {
                this.view.flxDialogs.isVisible = false;
                    this.view.flxCancelPopup.isVisible = false;
                    this.view.btnCancel.setFocus(true);
                }
            }
},

        showCancelPopup: function() {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.CustomPopupCancel.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.btnCancel.setFocus(true);
                scopeObj.presenter.showTransferScreen({
                    context: "ManageBeneficiaries"
                });
            };
            scopeObj.view.CustomPopupCancel.btnNo.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.btnCancel.setFocus(true);
            };
            scopeObj.view.CustomPopupCancel.flxCross.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                 scopeObj.view.btnCancel.setFocus(true);
            };
        },

        showConfirmDisputeTransactionPage: function(viewModel) {
            var self = this;
            var isBusinessAccount = "false";
            // var accounts = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule").presentationController.accounts;
            // var combinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            // this.showDisputeTransactionDetail();
            // Disputeflag = 1;
            // this.setDisputeTransactionReasonsDropdown({
            //     ddnList: self.loadDisputeTransactionPresentationController().getdisputeTransactionReasonsListViewModel(),
            //     selectedValue: viewModel.checkReason || null
            // });
            // for (i = 0; i < accounts.length; i++) {
            //     if (accounts[i].accountID === viewModel.data.accountNumber) isBusinessAccount = accounts[i].isBusinessAccount
            // }
            // if (combinedUser) {
            //     this.view.DisputeTransactionDetail.keyValue1.flxIcon.setVisibility(true);
            //     this.view.DisputeTransactionDetail.keyValue1.lblIcon.text = isBusinessAccount === "true" ? "r" : "s";
            //     this.view.DisputeTransactionDetail.keyValue1.lblValue.left = "5%";
            //     this.view.DisputeTransactionDetail.keyValue1.flxIcon.left = "26%";
            // }
            if (viewModel.data.fromAccountType === "CreditCard") {
                this.view.flxMerchantAddress.setVisibility(true);
                this.view.flxMerchantCity.setVisibility(true);
                this.view.lblMerchantAddressValue.text = viewModel.data.merchantAddressName || kony.i18n.getLocalizedString("i18n.common.none");
                this.view.lblMerchantCityValue.text = viewModel.data.merchantCity || kony.i18n.getLocalizedString("i18n.common.none");
            } else {
                this.view.flxMerchantAddress.setVisibility(false);
                this.view.flxMerchantCity.setVisibility(false);
            }
            this.view.lblFromValue.text = viewModel.data.fromAccountNumber || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblToValue.text = viewModel.data.toAccount || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblAmountValue.text = viewModel.data.amount;
            var date = viewModel.data.date;
            this.view.lblDateValue.text = date;
            this.view.lblTypesValue.text = viewModel.data.types;
            this.view.lblReferenceNumberValue.text = viewModel.data.referenceNumber;
            this.view.lblNotesValue.text = viewModel.data.notes;
            this.view.lblDisputeDescriptionValue.text = viewModel.data.description.length > 0 ? viewModel.data.description : kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblDisputeReasonValue.text = viewModel.data.reason;
            this.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.btnConfirm.text = kony.i18n.getLocalizedString("i18n.transfers.Confirm");
          
            //this.view.btnCancel.onClick = viewModel.onCancel || viewModel.data.onBacktoAccountDetails;
            self.view.btnCancel.onClick = function() {
                self.showCancelPopup();
            };
            this.view.btnModify.onClick = function() {
                // var viewModel = {
                //         data: input
                //     };
                //     self.showDisputeTransactionDetail(viewModel);
                self.presenter.showDisputeTransactionModule({
                    "backToDisputeDetailPage": viewModel.data || true
                });
            }
            this.view.btnConfirm.onClick = function() {
                // var params = {
                //   transactionId: viewModel.data.referenceNumber,
                //   disputeReason: viewModel.data.reason,
                //   disputeDescription: viewModel.data.description,
                //   transactionType: viewModel.data.types
                // };
                self.presenter.createDisputeTransaction(viewModel.transactionData, viewModel.data);
            };
        }
    };
});