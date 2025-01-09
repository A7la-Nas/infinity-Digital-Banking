define(['OLBConstants'], function(OLBConstants) {
  return {
    postshow : function(){
      var currBreakpoint = kony.application.getCurrentBreakpoint();
      this.onBreakpointChangeComponent(currBreakpoint);

      this.view.btnLocateUs.skin="sknBtnSSP0273e315px";
      //this.view.btnLocateUs.hoverSkin="sknbtn0161C115pxFocus";
      this.view.btnContactUs.skin="sknBtnSSP0273e315px";
      //this.view.btnContactUs.hoverSkin="sknbtn0161C115pxFocus";
      this.view.btnPrivacy.skin="sknBtnSSP0273e315px";
      //this.view.btnPrivacy.hoverSkin="sknbtn0161C115pxFocus";
      this.view.btnTermsAndConditions.skin="sknBtnSSP0273e315px";
      //this.view.btnTermsAndConditions.hoverSkin="sknbtn0161C115pxFocus";
      this.view.btnFaqs.skin="sknBtnSSP0273e315px";
      //this.view.btnFaqs.hoverSkin="sknbtn0161C115pxFocus";
      //this.view.btnLocateUs.toolTip = kony.i18n.getLocalizedString("i18n.footer.locateUs");
      //this.view.btnContactUs.toolTip = kony.i18n.getLocalizedString("i18n.footer.contactUs");
      //this.view.btnPrivacy.toolTip = kony.i18n.getLocalizedString("i18n.footer.privacy");
      //this.view.btnTermsAndConditions.toolTip = kony.i18n.getLocalizedString("i18n.common.TnC");
      //this.view.btnFaqs.toolTip = kony.i18n.getLocalizedString("i18n.footer.faqs");
      this.view.btnLocateUs.accessibilityConfig = {
        "a11yARIA":{
          "role":"link",
          "tabindex":0
        }
      }
      this.view.btnContactUs.accessibilityConfig = {
        "a11yARIA":{
          "role":"link",
          "tabindex":0
        }
      }
      this.view.btnPrivacy.accessibilityConfig = {
        "a11yARIA":{
          "role":"link",
          "tabindex":0
        }
      }
      this.view.btnTermsAndConditions.accessibilityConfig = {
        "a11yARIA":{
          "role":"link",
          "tabindex":0
        }
      }
      this.view.btnFaqs.accessibilityConfig = {
        "a11yARIA":{
          "role":"link",
          "tabindex":0
        }
      }
      this.view.lblCopyright.accessibilityConfig = {
        "a11yARIA":{
          tabindex : -1,
        }
      }
      this.view.flxVBar1.accessibilityConfig = {
        "a11yHidden":true,
         "a11yARIA":{
          tabindex : -1,
        }
      }
      this.view.flxVBar2.accessibilityConfig = {
        "a11yHidden":true,
         "a11yARIA":{
          tabindex : -1,
        }
      }
      this.view.flxVBar3.accessibilityConfig = {
        "a11yHidden":true,
         "a11yARIA":{
          tabindex : -1,
        }
      }
      this.view.flxVBar4.accessibilityConfig = {
        "a11yHidden":true,
         "a11yARIA":{
          tabindex : -1,
        }
      }
      
    },
   onBreakpointChangeComponent: function(width){
      if(width==undefined)
      width = kony.application.getCurrentBreakpoint();
     this.view.forceLayout();
     if (width === 640) {
        this.view.btnLocateUs.left = "";
        this.view.btnLocateUs.width = "";
      }
   },
    setPosition: function(callback){
      this.view.forceLayout();
      var mainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      mainheight = this.view.customheader.frame.height + this.view.flxMain.frame.height;
      var diff = screenheight - mainheight;
      if (mainheight < screenheight) {
        diff = diff - this.view.flxFooter.frame.height;
        if (diff > 0) {
          this.view.flxFooter.top = mainheight + diff + ViewConstants.POSITIONAL_VALUES.DP;
        } else {
          this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
        }
      } else {
        this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
      }
      this.view.forceLayout();

      if(callback!=null || callback!=undefined){
        callback();
      }
    },
    /**
        * Method to laad Information Module and show Locate us
        * @memberof customFooterController
        * @param {void}  - None
        * @returns {void} - None. 
        * @throws Exception - None
        */
    showLocateUsPage : function() {
      var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
      locateUsModule.presentationController.showLocateUsPage();
    },

    /**
        * Method to laad Information Module and show FAQs
        * @memberof customFooterController
        * @param {void}  - None
        * @returns {void} - None. 
        * @throws Exception - None
        */
    showFAQs : function(){
      var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"InformationContentUIModule"});
      InformationContentModule.presentationController.showFAQs();
    },
    /**
        * Method to laad Information Module and show terms and conditions page
        * @memberof customFooterController
        * @param {void}  - None
        * @returns {void} - None. 
        * @throws Exception - None
        */
    showTermsAndConditions:function(){
      var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"InformationContentUIModule"});
      termsAndConditionModule.presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.Footer_TnC);
    },
    /**
        * Method to laad Information Module and show ContactUs Page.
        * @memberof customFooterController
        * @param {void}  - None
        * @returns {void} - None. 
        * @throws Exception - None
        */

    showContactUsPage:function(){
      var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"InformationContentUIModule"});
      InformationContentModule.presentationController.showContactUsPage();
    },
    /**
        * Method to laad Information Module and show privacy policy page.
        * @memberof customFooterController
        * @param {void}  - None
        * @returns {void} - None. 
        * @throws Exception - None
        */

    showPrivacyPolicyPage:function(){
      var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"InformationContentUIModule"});
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

  }
});