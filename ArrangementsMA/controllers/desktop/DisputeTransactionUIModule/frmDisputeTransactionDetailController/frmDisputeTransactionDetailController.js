define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
    var responsiveUtils = new ResponsiveUtils();
    return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onKeyPress = this.onKeyPressCallBack;
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
         this.view.title = "Dispute Transaction Detail";
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
           // this.accessibilityFocusSetup();
            this.view.customheadernew.btnSkipNav.onClick = this.onSkipNav;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex
             this.view.btnConfirm.accessibilityConfig = {
                    "a11yLabel": "continue disputed transactions"
                };
				this.view.btnCancel.accessibilityConfig = {
                    "a11yLabel": "cancel disputed transactions"
                };
				this.view.flxViewDisputedTransactions.accessibilityConfig = {
                     "a11yARIA": {
                        "role": "link",
                        "tabindex": 0
                    }
                };
				this.view.flxAdWrapper.accessibilityConfig = {
                     "a11yARIA": {
                        "role": "presentation",
                        "tabindex": -1
                    }
                };
				this.view.txtDisputeDescription.accessibilityConfig = {
                     "a11yARIA": {
                        "aria-labelledby": "lblDisputeDescription",
						"role": "textbox",
						"tabindex": 0
                    }
                };
                this.view.btnByPass.onClick = this.byPassFunction;
            this.view.btnByPass.accessibilityConfig = {
                "a11yLabel": "Skip to view other Disputed Transactions",
                a11yARIA: {
                    role: "button"
                },
            };
            this.view.flxReasonForDispute = this.flxReasonForDispute_onkeyclickCB;
        },
        flxReasonForDispute_onkeyclickCB : function(){
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                    eventPayload.preventDefault();
                    this.view.btnByPass.isVisible ? this.view.btnByPass.setActive(true) : this.view.lblAddBeneficiary.setActive(true);
              
            }
        },
        byPassFunction : function(){
            this.view.flxViewDisputedTransactions.setActive(true);

        },
		onSkipNav : function(){
			this.view.lblAddBeneficiary.setActive(true);
		},
        onKeyPressCallBack : function(eventObj,eventPayload){
            if(eventPayload.keycode === 27){
                if(this.view.flxDialogs.isVisible){
                  this.view.flxDialogs.isVisible = false;  
                }
            }
        },
          accessibilityFocusSetup: function() {
      let widgets = [
        [this.view.txtDisputeDescription, this.view.flxDisputeDescription],
       
      ];
            for (let i = 0; i < widgets.length; i++) {
        CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this);
      }
    },
        loadDisputeTransactionPresentationController: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DisputeTransactionUIModule").presentationController;
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
            if (viewModel.disputeTransactionObject) {
                this.showDisputeTransactionDetailPage(viewModel.disputeTransactionObject);
            }
        },

        /**
         * setDisputeTransactionReasonsDropdown : Method to set dispute transaction reasons dropdown
         * @param {object} viewModel - dropdown view model
         */
        setDisputeTransactionReasonsDropdown: function(viewModel) {
            var scopeObj = this;
            if (viewModel && viewModel.ddnList && viewModel.ddnList.length) {
                scopeObj.bindDisputeTransactionReasonsDropdown({
                    list: viewModel.ddnList
                });
            }
            this.view.lbxReasonForDispute.selectedKey = viewModel.selectedValue || scopeObj.savedSeriesCheckReason || this.view.lbxReasonForDispute.masterData[0][0];
        },

        /**
         * bindDisputeTransactionReasonsDropdown : Method to bind Stop checks form reasons dropdown
         * @param {object} viewModel dropdown view model
         */
        bindDisputeTransactionReasonsDropdown: function(viewModel) {
            var scopeObj = this;
            if (viewModel && viewModel.list.length) {
                this.view.lbxReasonForDispute.masterData = viewModel.list.map(function(reason) {
                    return [reason.id, reason.name];
                });
            }
        },

        /**
         * showDisputeTransactionDetail : update flexes visibility w.r.t dispute transaction form
         */
        showDisputeTransactionDetail: function() {
            // this.hideAll();
            // this.setBreadcrumb([{
            //     label: kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
            //     toolTip: kony.i18n.getLocalizedString("i18n.topmenu.accounts")
            // }, {
            //     label: kony.i18n.getLocalizedString("i18n.accounts.disputeTransaction"),
            //     toolTip: kony.i18n.getLocalizedString("i18n.accounts.disputeTransaction")
            // }, ]);
            // this.view.flxDisputedTransactionDetail.setVisibility(false);
            // this.view.lblStopPayments.setVisibility(true);
            // this.view.flxActionsDisputeTransactionDetails.setVisibility(false);
            // this.view.flxDisputedTransactionDetails.setVisibility(false);
            // this.view.DisputeTransactionDetail.setVisibility(true);
            // this.view.StopCheckPaymentSeriesMultiple.setVisibility(false);

            // this.AdjustScreen();
        },

        /**
         * showDisputeTransactionDetailPage : Method to show showDisputeTransactionDetailPage
         * @param {object} viewModel object
         */
        showDisputeTransactionDetailPage: function(viewModel) {
            var self = this;
            var isBusinessAccount = "false";
            var accounts = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"}).presentationController.accounts;
            // var combinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            this.showDisputeTransactionDetail();
            Disputeflag = 1;
            this.setDisputeTransactionReasonsDropdown({
                ddnList: self.loadDisputeTransactionPresentationController().getdisputeTransactionReasonsListViewModel(),
                selectedValue: viewModel.checkReason || null
            });
            for (i = 0; i < accounts.length; i++) {
                if (accounts[i].accountID === viewModel.data.accountNumber) isBusinessAccount = accounts[i].isBusinessAccount
            }
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
            this.view.txtDisputeDescription.text = "";
            // this.view.DisputeTransactionDetail.keyValue3.lblKey.text = kony.i18n.getLocalizedString("i18n.StopCheckPayments.Amount($)");
            this.view.lblFromValue.text = viewModel.data.fromAccountNumber || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblToValue.text = viewModel.data.toAccount || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblAmountValue.text = CommonUtilities.formatCurrencyWithCommas(viewModel.data.displayAmount) || kony.i18n.getLocalizedString("i18n.common.none");
            var date = viewModel.data.date;
            this.view.lblDateValue.text = date || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblTypesValue.text = viewModel.data.types || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblReferenceNumberValue.text = viewModel.data.referenceNumber || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblNotesValue.text = viewModel.data.notes || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.txtDisputeDescription.maxTextLength = OLBConstants.NOTES_MAX_LENGTH;
            this.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.btnConfirm.text = kony.i18n.getLocalizedString("i18n.common.proceed");
            this.view.btnCancel.toolTip = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.transfers.Cancel"));
            this.view.btnConfirm.toolTip = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.common.proceed"));
            this.view.btnCancel.onClick = viewModel.onCancel;
            viewModel.transactionData.disputeDescription = self.view.txtDisputeDescription.text;
            viewModel.transactionData.disputeReason = self.view.lbxReasonForDispute.selectedKeyValue[1];
            this.view.btnConfirm.onClick = function() {
                var input = {
                    fromAccountNumber: viewModel.data.fromAccountNumber,
                    toAccount: viewModel.data.toAccount,
                    amount: CommonUtilities.formatCurrencyWithCommas(viewModel.data.amount),
                    date: viewModel.data.date,
                    types: viewModel.data.types || kony.i18n.getLocalizedString("i18n.common.none"),
                    referenceNumber: viewModel.data.referenceNumber,
                    notes: viewModel.data.notes || kony.i18n.getLocalizedString("i18n.common.none"),
                    reason: self.view.lbxReasonForDispute.selectedKeyValue[1],
                    description: self.view.txtDisputeDescription.text,
                    onBacktoAccountDetails: viewModel.onBacktoAccountDetails || null,
                    fromAccountType: viewModel.data.fromAccountType,
                    merchantAddressName: viewModel.data.merchantAddressName || kony.i18n.getLocalizedString("i18n.common.none"),
                    merchantCity: viewModel.data.merchantCity || kony.i18n.getLocalizedString("i18n.common.none"),
                    isBusinessAccount: isBusinessAccount
                };
                self.onBtnContinueDisputeTransaction(input, viewModel.onCancel, viewModel.transactionData);
                // self.AdjustScreen();
            };
            this.view.flxViewDisputedTransactions.onClick = function() {
                var view = {
                    show: OLBConstants.ACTION.SHOW_DISPUTE_LIST,
                };
                self.presenter.showDisputeTransactionModule(view);
            };
        },

        /**
         * onBtnContinueDisputeTransaction : Method to show confirmation page for dispute a transaction
         * @param {object} input input
         * @param {function} onCancelAction onCancel Action
         */
        onBtnContinueDisputeTransaction: function(input, onCancelAction, transactionData) {
            this.loadDisputeTransactionPresentationController().navigateToConfirmScreen({
                disputeDetails: {
                    data: input,
                    onCancel: onCancelAction,
                    transactionData: transactionData
                }
            });

            // this.view.ConfirmDetailsSingleMultiple.btnCancel.onClick = onCancelAction;
            // this.view.ConfirmDetailsSingleMultiple.btnModify.onClick = function() {
            //     var viewModel = {
            //         data: input
            //     };
            //     self.showDisputeTransactionDetail(viewModel);
            // };
            // this.view.ConfirmDetailsSingleMultiple.btnConfirm.onClick = function() {
            //     var params = {
            //         transactionId: input.referenceNumber,
            //         disputeReason: input.reason,
            //         disputeDescription: input.description
            //     };
            //     self.loadStopPaymentsModule().presentationController.createDisputeTransaction(params, input);
            // };
            // }
        },

        showCancelPopup: function() {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.CustomPopupCancel.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.presenter.showTransferScreen({
                    context: "ManageBeneficiaries"
                });
            };
            scopeObj.view.CustomPopupCancel.btnNo.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
            };
            scopeObj.view.CustomPopupCancel.flxCross.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
            };
        }
    };
});