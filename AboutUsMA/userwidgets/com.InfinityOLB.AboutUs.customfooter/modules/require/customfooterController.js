define(['OLBConstants','FormControllerUtility'], function(OLBConstants, FormControllerUtility) {
	var orientationHandler = new OrientationHandler();
	return {
        postshow : function(){
          this.setFooterCopyrightText();
          var currBreakpoint = kony.application.getCurrentBreakpoint();
          this.onBreakpointChangeComponent(currBreakpoint);
        },
        onBreakpointChangeComponent: function(width){
           FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['btnLocateUs','btnContactUs']);
          if(width===undefined)
            width = kony.application.getCurrentBreakpoint();
          if(width===640 || orientationHandler.isMobile){
            var menuWidth = this.view.btnLocateUs.info.frame.width+43+this.view.btnContactUs.info.frame.width;
            if(menuWidth<100){
              menuWidth = 175;
            }
            //this.view.flxFooterMenu.width = menuWidth+"dp";
            //this.view.flxFooterMenu.centerX = "50%";

            //this.view.lblCopyright.centerX = "50%";
            //this.view.lblCopyright.width = kony.flex.USE_PREFERRED_SIZE;
            this.view.lblCopyright.contentAlignment = constants.CONTENT_ALIGN_CENTER;
            this.view.btnLocateUs.hoverSkin="sknBtnSSP0273e313Px";
            this.view.btnContactUs.hoverSkin="sknBtnSSP0273e313Px";
          }else if(width<=1024 || orientationHandler.isTablet){
            //this.view.flxFooterMenu.width = '91%';
            //this.view.flxFooterMenu.left = '20%';
            this.view.lblCopyright.centerX = "";
            //this.view.flxFooterMenu.centerX = "";
            this.view.btnLocateUs.setVisibility(false);
            this.view.flxVBar1.setVisibility(false);
            //this.view.lblCopyright.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        if(screen.height=== 1024 && screen.width < screen.height ){
          //this.view.flxFooterMenu.left = "0%";
          //this.view.flxFooterMenu.left = '10%';
          this.view.lblCopyright.centerX = "";
        }
        else{
          //this.view.flxFooterMenu.left = "0.5%";
        }
          }else if(width==1366){
            this.view.lblCopyright.centerX = "";
            this.view.flxFooterMenu.centerX = "";
            this.view.lblCopyright.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
          }
          else {
                if(kony.application.getCurrentForm().id === "frmEnrollBusiness"){
                    this.view.width = "100%";
                    this.view.lblCopyright.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
                }            	
          }
          this.view.forceLayout();
        },
        setPosition: function(callback){
          this.view.forceLayout();
          
          FormControllerUtility.updateWidgetsHeightInInfo(this, ['customheader','flxMain','flxFooter']);
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

            if(callback!=null || callback!=undefined){
              callback();
            }
        },
      
      	/**
           * This function is called to set footer copyright text based on the last logged in user
           * @param {}
           */
        setFooterCopyrightText : function() {
          var configurationManager = applicationManager.getConfigurationManager();
          if(configurationManager.isSMEUser === "true")
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
		    showLocateUsPage : function() {
          var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName" : "LocateUsUIModule"});
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
        var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName" : "InformationContentUIModule"});
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
          var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName" : "InformationContentUIModule"});
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
          var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName" : "InformationContentUIModule"});
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
       	var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName" : "InformationContentUIModule"});
         InformationContentModule.presentationController.showPrivacyPolicyPage();
    	}
      	
	};
});