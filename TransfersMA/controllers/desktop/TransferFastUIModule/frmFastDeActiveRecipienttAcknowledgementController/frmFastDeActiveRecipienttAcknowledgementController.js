define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnAccounts.toolTip = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
            var scopeObj = this;
            scopeObj.view.btnAccounts.onClick = function () {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                }).presentationController.showAccountsDashboard();
            };
        },
        preShow: function () {
            var scopeObj = this;
            scopeObj.view.flxWarning.setVisibility(false);
            scopeObj.view.customheadernew.activateMenu("FASTTRANSFERS", "Transfer Money");
            scopeObj.view.forceLayout();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
        },
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent();
            this.view.customfooternew.onBreakpointChangeComponent();
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
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
         * shows the deactivation acknowledgement page.
         */
        showAcknowledgement: function (viewModel) {
            var scopeObj = this;
            CommonUtilities.setText(scopeObj.view.lblRegNameValue, viewModel.userName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblRegNumberValue, viewModel.phone, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblRegEmailValue, viewModel.email, CommonUtilities.getaccessibilityConfig());
            scopeObj.view.forceLayout();
        }
    };
});