define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    return /** @alias module:frmCreateCustomRoleName*/ {
        /**
         * Method to display the footer at the end of the screen by calculating the size of screen dynamically
         * @param {integer} data value
         **/
        adjustScreen: function() {
            this.view.forceLayout();
            this.view.flxFooter.isVisible = true;
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - this.view.flxFooter.info.frame.height;
                if (diff > 0) {
                    this.view.flxFooter.top = mainheight + diff + "dp";
                } else {
                    this.view.flxFooter.top = mainheight + "dp";
                }
                this.view.forceLayout();
            } else {
                this.view.flxFooter.top = mainheight + "dp";
                this.view.forceLayout();
            }

        },
        /**
         * Breakpont change
         */
        onBreakpointChange: function(width) {
            this.view.customheadernew.onBreakpointChangeComponent(width);
        },
        /**
         * hide all ui flexes in user management form
         */
        resetUI: function() {

            this.adjustScreen();
        },
        /**
         * Method will invoke on form init
         */
        initActions: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnProceedCreate.onClick = function() {
                scopeObj.navToNextForm();
            };
        },


        /**
         * Method will invoke on form pre show
         */
        preShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            //this.view.customheadernew.customhamburger.activateMenu("User Management","Create A User");                     
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter']);
        },





        /**
         * Method will invoke on form post show
         */
        postShow: function() {
            this.onBreakpointChange();
            var data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
        },


        /**
         * Method to update form using given context
         * @param {object} context depending on the context the appropriate function is executed to update view
         */
        updateFormUI: function() {

        },

        navToNextForm: function() {
            applicationManager.getNavigationManager().navigateTo("frmUserManagementTransactionLimit");
        },

    };
});