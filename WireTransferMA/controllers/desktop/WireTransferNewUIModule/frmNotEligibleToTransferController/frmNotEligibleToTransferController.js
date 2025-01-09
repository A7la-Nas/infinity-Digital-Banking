define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'IBANUtils', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, IBANUtils, OLBConstants) {
     
    var orientationHandler = new OrientationHandler();
    return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        },
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            //this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height +"dp";
            this.view.customheadernew.activateMenu("Wire Transfer");
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        updateFormUI: function(context) {
            if (context.notEligible) {
                this.showNoCheckingAccountUI();
            }
        },

        showNoCheckingAccountUI: function() {
            var userPreferencesManager = applicationManager.getUserPreferencesManager();
            if (applicationManager.getConfigurationManager().getConfigurationValue("isSMEUser") === "true") {
                this.view.flxSeperatorNotEligibleToTransfer.setVisibility(false);
                this.view.flxButtons.setVisibility(false);
                this.view.txtMessage.text = kony.i18n.getLocalizedString("i18n.WireTransfer.Hi") + " " + userPreferencesManager.getUserName() + ", " + kony.i18n.getLocalizedString("i18n.wiretransfer.smeNotEligibleMessage");
            } else {
                this.view.flxSeperatorNotEligibleToTransfer.setVisibility(true);
                this.view.flxButtons.setVisibility(true);
                this.view.txtMessage.text = kony.i18n.getLocalizedString("i18n.WireTransfer.Hi") + " " + userPreferencesManager.getUserName() + ", " + kony.i18n.getLocalizedString("i18n.WireTransfer.NotEligibleToTransfer");
            }
            this.view.forceLayout();
        }
    };
});