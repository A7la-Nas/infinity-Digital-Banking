define(['OLBConstants', 'FormControllerUtility'], function (OLBConstants, FormControllerUtility) {
  return {
    postShow: function () {
      this.setFooterCopyrightText();
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['btnLocateUs', 'btnContactUs']);
      this.view.onBreakpointChange = function (sourceWidget, breakpoint) {
        this.onBreakpointChangeComponent(breakpoint);
      }.bind(this);
      this.view.btnLocateUs.accessibilityConfig={
        a11yARIA:{
          "role":"link",
          "tabindex":0
        }
      }
      this.view.btnContactUs.accessibilityConfig={
        a11yARIA:{
          "role":"link",
          "tabindex":0
        }
      }
      this.view.btnFaqs.accessibilityConfig={
        a11yARIA:{
          "role":"link",
          "tabindex":0
        }
      }
      this.view.btnPrivacy.accessibilityConfig={
        a11yARIA:{
          "role":"link",
          "tabindex":0
        }
      }
      this.view.btnTermsAndConditions.accessibilityConfig={
        a11yARIA:{
          "role":"link",
          "tabindex":0
        }
      }
      this.view.flxVBar1.accessibilityConfig={
        "a11yHidden":true,
        a11yARIA:{
          "tabindex": -1
        }
      }
       this.view.flxVBar2.accessibilityConfig={
        "a11yHidden":true,
        a11yARIA:{
          "tabindex": -1
        }
      }
       this.view.flxVBar3.accessibilityConfig={
        "a11yHidden":true,
        a11yARIA:{
          "tabindex": -1
        }
      }
       this.view.flxVBar4.accessibilityConfig={
        "a11yHidden":true,
        a11yARIA:{
          "tabindex": -1
        }
      }
      this.view.lblCopyright.accessibilityConfig={
        a11yARIA:{
          "tabindex":-1
        }
      }
      var currBreakpoint = kony.application.getCurrentBreakpoint();
      this.onBreakpointChangeComponent(currBreakpoint);
    },
    onBreakpointChangeComponent: function (width) {
      if (width == undefined) width = kony.application.getCurrentBreakpoint();
      if (width === 640) {
        this.view.btnContactUs.left = "55%";
        this.view.btnLocateUs.left = "";
        this.view.btnLocateUs.width = "";
        this.view.btnLocateUs.text = kony.i18n.getLocalizedString("i18n.footer.locateUs");
      } if(width === 1024){
        this.view.btnLocateUs.left = "0dp";
        this.view.btnContactUs.left = "20dp";
        this.view.btnPrivacy.left = "20dp";
        this.view.btnTermsAndConditions.left = "20dp";
        this.view.btnFaqs.left = "20dp";
        this.view.flxVBar1.left = "20dp";
        this.view.flxVBar2.left = "20dp";
        this.view.flxVBar3.left = "20dp";
        this.view.flxVBar4.left = "20dp";
      }
      this.view.forceLayout();
    },
    setPosition: function (callback) {
      this.view.forceLayout();
      FormControllerUtility.updateWidgetsHeightInInfo(this, ['customheader', 'flxMain', 'flxFooter']);
      var mainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      mainheight = this.view.customheader.info.frame.height + this.view.flxMain.info.frame.height;
      var diff = screenheight - mainheight;
      if (mainheight < screenheight) {
        diff = diff - this.view.flxFooter.info.frame.height;
        if (diff > 0) {
          this.view.flxFooter.top = mainheight + diff + ViewConstants.POSITIONAL_VALUES.DP;
        } else {
          this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
        }
      } else {
        this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
      }
      this.view.forceLayout();

      if (callback != null || callback != undefined) {
        callback();
      }
    },

    /**
       * This function is called to set footer copyright text based on the last logged in user
       * @param {}
       */
    setFooterCopyrightText: function () {
      var configurationManager = applicationManager.getConfigurationManager();
      if (configurationManager.isSMEUser === "true")
        this.view.lblCopyright.text = kony.i18n.getLocalizedString("i18n.footer.copyrightsme");
      else
        this.view.lblCopyright.text = kony.i18n.getLocalizedString("i18n.footer.copyright");
    },

    /**
      * Method to laad Information Module and show Locate us
      * @memberof customFooterController
      * @param {void}  - None
      * @returns {void} - None. 
      * @throws Exception - None
      */
    showLocateUsPage: function () {
      var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "LocateUsUIModule" });
      locateUsModule.presentationController.showLocateUsPage();
    },

    /**
    * Method to laad Information Module and show FAQs
    * @memberof customFooterController
    * @param {void}  - None
    * @returns {void} - None. 
    * @throws Exception - None
    */
    showFAQs: function () {
      var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "InformationContentUIModule" });
      InformationContentModule.presentationController.showFAQs();
    },
    /**
   * Method to laad Information Module and show terms and conditions page
   * @memberof customFooterController
   * @param {void}  - None
   * @returns {void} - None. 
   * @throws Exception - None
   */
    showTermsAndConditions: function () {
      var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "InformationContentUIModule" });
      termsAndConditionModule.presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.Footer_TnC);
    },
    /**
* Method to laad Information Module and show ContactUs Page.
* @memberof customFooterController
* @param {void}  - None
* @returns {void} - None. 
* @throws Exception - None
*/

    showContactUsPage: function () {
      var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "InformationContentUIModule" });
      InformationContentModule.presentationController.showContactUsPage();
    },
    /**
* Method to laad Information Module and show privacy policy page.
* @memberof customFooterController
* @param {void}  - None
* @returns {void} - None. 
* @throws Exception - None
*/

    showPrivacyPolicyPage: function () {
      var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "InformationContentUIModule" });
      InformationContentModule.presentationController.showPrivacyPolicyPage();
    },
    screenHeightGbl: 0,
    /**
       * sets the min height of the flxMain flex
       * @param {Object} formScope
       */
    setMinHeight: function (mainFlex) {
      if (this.screenHeightGbl === kony.os.deviceInfo().screenHeight) {
        //return if browser is resized horizontally
        return;
      }
      this.screenHeightGbl = kony.os.deviceInfo().screenHeight;
      var minHeight = this.screenHeightGbl - 270;
      if (kony.application.getCurrentBreakpoint() === 640) {
        minHeight = minHeight + 60;
      }
      mainFlex.minHeight = minHeight + "dp";
    }

  };
});