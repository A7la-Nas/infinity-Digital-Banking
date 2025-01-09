define(['commonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function (commonUtilities, OLBConstants, ViewConstants, FormControllerUtility, CampaignUtility) {
     
    return {
        headerTitle: "",
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onHide = this.onHide;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            var scopeObj = this;
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
        },
        onHide: function () {
            this.headerTitle = "";
        },
        onError: function (err) {
            kony.application.dismissLoadingScreen();
           kony.print(JSON.stringify(err));
        },
        setHeaderTitleText: function () {
            if (!this.headerTitle) {
                var params = applicationManager.getNavigationManager().getCustomInfo("componentP2P");
                if (params) {
                    if (params.beneficiaryType === "Same Bank") {
                        this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.FastTransfers.AddDBXAccount");
                    } else if (params.beneficiaryType === "External") {
                        this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.AccountsAggregation.AddExternalBankAccount");
                    } else if (params.beneficiaryType === "International") {
                        this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.FastTransfers.AddInternationalAccount");
                    } else if (params.beneficiaryType === "P2P") {
                        this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.FastTransfers.AddPersonToPersonRecipient");
                    }
                } else {
                    var params = applicationManager.getNavigationManager().getCustomInfo("editComponentP2P");
                    if (params.beneficiaryType === "Same Bank") {
                        this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.payments.editInfinityBankAccount");
                    } else if (params.beneficiaryType === "External") {
                        this.view.customheadernew.lblHeaderMobile.text =  kony.i18n.getLocalizedString("i18n.payments.editExternalBankAccount");
                    } else if (params.beneficiaryType === "International") {
                        this.view.customheadernew.lblHeaderMobile.text =  kony.i18n.getLocalizedString("i18n.payments.editInternationalBankAccount");
                    } else if (params.beneficiaryType === "P2P") {
                        this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.PayAPerson.EditRecipient");
                    }
                }
                this.headerTitle = this.view.customheadernew.lblHeaderMobile.text;
                this.view.customheadernew.isVisible = true;
                if (kony.application.getCurrentBreakpoint() == 640) this.view.customheadernew.lblHeaderMobile.isVisible = false;
            }
            if (kony.application.getCurrentBreakpoint() == 640) {
                this.view.customheadernew.lblHeaderMobile.isVisible = true;
                this.view.customheadernew.lblHeaderMobile.text = this.headerTitle;
            } else this.view.customheadernew.lblHeaderMobile.isVisible = false;
        },
        onNavigate: function (params) {
            if (!(params && params.refreshComponent == false)) {
                var scope = this;
                var params = applicationManager.getNavigationManager().getCustomInfo("componentP2P");
                if (!params) {
                    params = applicationManager.getNavigationManager().getCustomInfo('editComponentP2P');
                }
                this.setHeaderTitleText();
                try {
                    var tokenParams = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.security_attributes;
                    params.entitlement = {};
                    params.entitlement.features = JSON.parse(tokenParams.features);
                    params.entitlement.permissions = JSON.parse(tokenParams.permissions);
                    this.view.addBenificiary.setContext(params, scope);
                    this.view.addBenificiary.onError = this.onError;
                    applicationManager.getNavigationManager().setCustomInfo('componentP2P', "");
                    applicationManager.getNavigationManager().setCustomInfo('editComponentP2P', "");
                } catch (e) {
                    this.view.addBenificiary.setContext(params, scope);
                    this.view.addBenificiary.onError = this.onError;
                }
            }
        },
        preShow: function () {
            var scope=this;
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "Add Infinity Accounts");
            CampaignUtility.fetchPopupCampaigns();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.customheadernew.btnSkipNav.onClick = function() {
                scope.view.addBenificiary.lblsetActive();
            };
        },
        postShow: function () {
            this.setHeaderTitleText();
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.title=this.headerTitle;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.doLayout = commonUtilities.centerPopupFlex;
            this.view.customheadernew.collapseAll();
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxDialogs.isVisible = false;
                    this.view.flxLogout.isVisible = false;
                    this.view.customheadernew.btnLogout.setFocus(true);
                }
            }
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            scope.view.customheadernew.onBreakpointChangeComponent(width);
            this.setHeaderTitleText();
        },
        internalAccountOnClick: function () {
            this.transfersFastPresentationController.showTransferScreen({
                initialView: "addDBXAccount"
            });
        },
        externalAccountOnClick: function () {
            this.transfersFastPresentationController.showTransferScreen({
                initialView: "addExternalAccount"
            });
        },
        internationalAccountOnClick: function () {
            this.transfersFastPresentationController.showTransferScreen({
                initialView: "addInternationalAccount"
            });
        },
        reviewCancelYesAction: function () {
            /*applicationManager.getModulesPresentationController({
                appName: 'HomepageMA',
                moduleName: 'AccountsUIModule'
            }).showAccountsDashboard();*/
            this.transfersFastPresentationController.showTransferScreen({
                    showRecipientGateway: true
                });
        },
        viewP2PSettings: function () {
            this.transfersFastPresentationController.fetchP2PdataSettings(kony.application.getCurrentForm().id);
        },
        deactivateP2PSettings: function () {
            this.transfersFastPresentationController.showTransferScreen({
                deactivateRecipient: true
            });
        },
        cancelClick: function () {
            var flowType = this.view.addBenificiary.getContext("cancel");
            if (flowType == "EDIT") {
                /*                applicationManager.getNavigationManager().navigateTo("frmFastManagePayee", undefined, {
                                    "refreshComponent": false,
                                    "showPreviousTab": true
                                });
                */
                this.navigatetofrmFastManagePayee();
            } else {
                this.transfersFastPresentationController.showTransferScreen({
                    showRecipientGateway: true
                });
            }
        },
        addAnotherRecepientAction: function () {
            this.transfersFastPresentationController.showTransferScreen({
                showRecipientGateway: true
            });
        },
        newTransferAction: function () {
            var scope = this;
            var data = this.view.addBenificiary.getContext();
            if (data['accountTo'] !== null && data['accountTo'] !== undefined) {
                scope.transfersFastPresentationController.showTransferScreen({
                    accountTo: data.accountTo,
                    ID: data.ID,
                    displayName: data.displayName
                });
            } else {
                scope.transfersFastPresentationController.showTransferScreen({
                    accountTo: data.PayPersonId,
                    displayName: data.name
                });
            }
        },
        navigatetofrmCombinedAccountsLanding: function () {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "HomepageMA"
            }).presentationController.showAccountsDashboard();
        },
        navigatetofrmFastManagePayee: function () {
            this.transfersFastPresentationController.showTransferScreen({
                showManageRecipients: true
            });
        },
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.initialView) {
                viewModel.flowType = "ADD";
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.FastTransfers.AddPersonToPersonRecipient");
            }
            if (viewModel.editDetails) {
                viewModel.flowType = "EDIT";
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.PayAPerson.EditRecipient");
            }
            if (viewModel.serverError) {
                this.view.rtxDowntimeWarning.text = viewModel.serverError;
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.flxFormContent.forceLayout();
            }
            if (viewModel.campaign) {
                CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMain");
            }
            this.setHeaderTitleText();
        },
    };
});