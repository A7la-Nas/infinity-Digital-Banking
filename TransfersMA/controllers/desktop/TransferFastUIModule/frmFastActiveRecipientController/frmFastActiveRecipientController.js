define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
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
            scopeObj.view.flxServerError.setVisibility(false);
            scopeObj.view.flxDialogs.setVisibility(false);
            scopeObj.view.imgChkBox.src = ViewConstants.IMAGES.UNCHECKED_IMAGE;
            scopeObj.view.btnContinue.setEnabled(false);
            scopeObj.view.btnContinue.skin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnContinue.hoverSkin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnContinue.focusSkin = ViewConstants.SKINS.BLOCKED;
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
            scopeObj.view.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            scopeObj.view.btnContinue.onClick = function () {
                scopeObj.transfersFastPresentationController.fetchP2Pdata();
            };
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CancelCustomPopup.onBreakpointChangeComponent(scope.view.CancelCustomPopup, width);
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
            }
        },
        /**
         * This method is used to set I agree checkbox.
         */
        setIAgreeCheckBoxState: function () {
            var scopeObj = this;
            if (scopeObj.view.imgChkBox.src === ViewConstants.IMAGES.UNCHECKED_IMAGE) {
                scopeObj.view.imgChkBox.src = ViewConstants.IMAGES.CHECKED_IMAGE;
                scopeObj.view.btnContinue.setEnabled(true);
                scopeObj.view.btnContinue.skin = ViewConstants.SKINS.NORMAL;
                scopeObj.view.btnContinue.hoverSkin = ViewConstants.SKINS.HOVER;
                scopeObj.view.btnContinue.focusSkin = ViewConstants.SKINS.FOCUS;
            } else {
                scopeObj.view.imgChkBox.src = ViewConstants.IMAGES.UNCHECKED_IMAGE;
                scopeObj.view.btnContinue.setEnabled(false);
                scopeObj.view.btnContinue.skin = ViewConstants.SKINS.BLOCKED;
                scopeObj.view.btnContinue.hoverSkin = ViewConstants.SKINS.BLOCKED;
                scopeObj.view.btnContinue.focusSkin = ViewConstants.SKINS.BLOCKED;
            }
            scopeObj.view.forceLayout();
        },
        /**
         * shows Terms and Conditions flex.
         */
        showTermsAndConditions: function () {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxTermsAndConditions.setVisibility(true);
            scopeObj.view.forceLayout();
        },
        /**
         * hides Terms and Conditions flex.
         */
        hideTermsAndConditions: function () {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(false);
            scopeObj.view.flxTermsAndConditions.setVisibility(false);
            scopeObj.view.forceLayout();
        },
    };
});