define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        profileAccess: "",
        init: function () {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.initActions();
            this.view.onBreakpointChange = function () {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
        },
        preShow: function () {
            var scopeObj = this;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            scopeObj.view.customheadernew.activateMenu("FASTTRANSFERS", "Transfer Money");
            scopeObj.view.forceLayout();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
        },
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        initActions: function () {
            var scopeObj = this;
            scopeObj.view.btnAccounts.toolTip = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
            scopeObj.view.btnNewTransfer.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.NewTransfer");
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            scopeObj.view.btnAccounts.onClick = function () {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                }).presentationController.showAccountsDashboard();
            };
            scopeObj.view.btnNewTransfer.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen();
            };
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CancelCustomPopup.onBreakpointChangeComponent(scope.view.CancelCustomPopup, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object}  viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            } else {
                this.showAcknowledgement(viewModel);
            }
        },
        /**
         * shows the activation acknowledgement page.
         */
        showAcknowledgement: function (userData) {
            var scopeObj = this;
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "HomepageMA"
            });
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (this.profileAccess === "both") {
                scopeObj.view.flxDefaultAccountTypeValueUser.setVisibility(true);
                scopeObj.view.lblDefaultAccountTypeValueUser.text = accountsModule.presentationController.fetchIsBusinessAccount(applicationManager.getUserPreferencesManager().getDefaultToAccountforP2P()) === "true" ? "r" : "s"
            } else {
                scopeObj.view.flxDefaultAccountTypeValueUser.setVisibility(false);
            }
            CommonUtilities.setText(scopeObj.view.lblRegNameValue, userData.userName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblRegNumberValue, userData.phone, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblRegEmailValue, userData.email, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblDefaultAccountTypeValue, applicationManager.getUserPreferencesManager().getDefaultToAccountforP2P(), CommonUtilities.getaccessibilityConfig());
            scopeObj.view.forceLayout();
        }
    };
});