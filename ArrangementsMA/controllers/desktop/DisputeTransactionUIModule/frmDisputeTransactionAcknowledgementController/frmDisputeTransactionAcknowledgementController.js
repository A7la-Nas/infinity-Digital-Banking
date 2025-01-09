define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
    var responsiveUtils = new ResponsiveUtils();
    return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            var scopeObj = this;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DisputeTransactionUIModule").presentationController;
            this.accountsPresenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule").presentationController;
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            var scopeObj= this;
            this.view.customheadernew.activateMenu("EUROTRANSFERS", "Manage Beneficiaries");
            this.view.customheadernew.btnSkipNav.onClick = function () {
                scopeObj.view.lblAddBeneficiary.setActive(true);
            };
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;       
            this.view.lblAddBeneficiary.text = "Dispute Transaction - Acknowledgement";
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxLogout.isVisible = false;
                    self.view.flxDialogs.isVisible = false;
                    self.view.customheadernew.btnLogout.setFocus(true);
                }
            }
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.title="Dispute Transaction Acknowledgement"
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
            if (viewModel.disputeTransactionResponse) {
                this.showAcknowledgmentDetails(viewModel.disputeTransactionResponse);
            }
        },

        showAcknowledgmentDetails: function(viewModel) {
            var self = this;
            if (viewModel.data.fromAccountType === "CreditCard") {
                this.view.flxMerchantAddress.setVisibility(true);
                this.view.flxMerchantCity.setVisibility(true);
                this.view.lblMerchantAddressValue.text = viewModel.data.merchantAddressName || kony.i18n.getLocalizedString("i18n.common.none");
                this.view.lblMerchantCityValue.text = viewModel.data.merchantCity || kony.i18n.getLocalizedString("i18n.common.none");
            } else {
                this.view.flxMerchantAddress.setVisibility(false);
                this.view.flxMerchantCity.setVisibility(false);
            }
            if (viewModel.errorResponse) {
                this.view.lblMessageSentToBank.setVisibility(false);
            } else {
                this.view.lblMessageSentToBank.setVisibility(true);
            }
            this.view.lblRefrenceNumberValue.text = viewModel.referenceId;
            this.view.lblFromValue.text = viewModel.data.fromAccountNumber || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblToValue.text = viewModel.data.toAccount || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblAmountValue.text = viewModel.data.amount;
            var date = viewModel.data.date;
            this.view.lblDateValue.text = date;
            this.view.lblTypesValue.text = viewModel.data.types;
            this.view.lblReferenceNumberValue.text = viewModel.data.referenceNumber;
            this.view.lblNotesValue.text = viewModel.data.notes;
            this.view.lblDisputeDescriptionValue.text = viewModel.data.description !== "" ? viewModel.data.description : kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblDisputeReasonValue.text = viewModel.data.reason;

            this.view.btnManageBeneficiaries.onClick = viewModel.onCancel || viewModel.data.onBacktoAccountDetails;
            this.view.btnAddAnotherBeneficiary.onClick = function() {
                var view = {
                    show: OLBConstants.ACTION.SHOW_DISPUTE_LIST,
                };
                self.presenter.showDisputeTransactionModule(view);
            };
        }
    };
});