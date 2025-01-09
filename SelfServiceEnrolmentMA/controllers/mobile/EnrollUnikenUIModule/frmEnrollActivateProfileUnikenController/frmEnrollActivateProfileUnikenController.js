define({ 
  
  frmEnrollActivateProfilePreShow: function(){
     var locale  = kony.i18n.getCurrentLocale();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    this.view.customHeader.lblLocateUs.skin="sknLblffffffSSP30px";
    this.view.flxOption.shadowDepth = 1;
    this.resetUI();
    this.setFlowActions();
    
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible=true;
      this.view.flxMainContainer.top = "0dp";
//       var currForm = kony.application.getCurrentForm();
//       var titleBarAttributes = currForm.titleBarAttributes;
//       titleBarAttributes["navigationBarHidden"] = false;
//       currForm.titleBarAttributes = titleBarAttributes;
      if (this.view.customHeader.btnRight.info === "Activate") {
         this.view.flxEnrollAccountContainer.setVisibility(false);
         this.view.flxOR.setVisibility(false);
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.LoginActivation.ActivateYourProfile");
      }else {
        this.view.flxEnrollAccountContainer.setVisibility(true);
         this.view.flxOR.setVisibility(true);
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.Login.EnrollActivate");
      }
    }
    else{
      this.view.flxHeader.isVisible=true;
      this.view.flxMainContainer.top = "96dp";
      this.view.customHeader.btnRight.top = "0dp";
      if (this.view.customHeader.btnRight.info === "Activate") {
         this.view.flxEnrollAccountContainer.setVisibility(false);
         this.view.flxOR.setVisibility(false);
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.LoginActivation.ActivateYourProfile");
         
      }else {
        this.view.flxEnrollAccountContainer.setVisibility(true);
         this.view.flxOR.setVisibility(true);
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.Login.EnrollActivate");
      }
    }
    var profileActivation = navManager.getCustomInfo("profileActivation");
    if(!kony.sdk.isNullOrUndefined(profileActivation)){
      if(profileActivation === "profileActivation"){
         navManager.setCustomInfo("profileActivation", " ");
         this.view.activateProfile.setVisibility(true);
        this.view.flxMainContainer.setVisibility(false);
       
      }
     
    }
     if (locale == "ar_AE") {
     this.view.imgRightArrow1.src = "chevron_reverse.png";
     this.view.imgRightArrow2.src = "chevron_reverse.png";
     this.view.customHeader.imgBack.src = "backbutton_reverse.png";
      this.view.imgInformationIcon.top = 0;
    }else if (locale == "en_US" || locale == "en") {
      this.view.imgRightArrow1.src = "segmentarrow.png";
      this.view.imgRightArrow2.src = "segmentarrow.png";
      this.view.customHeader.imgBack.src = "backbutton.png";
      this.view.imgInformationIcon.top = 7;
    }
  },
  
  resetUI: function(){
    this.view.activateProfile.setVisibility(false);
    this.view.flxMainContainer.setVisibility(true);
  },

  setFlowActions: function(){
   const scopeObj = this;
    this.view.customHeader.flxBack.onTouchEnd = function(){
      //scopeObj.navigateToFrmLogin();
      scopeObj.navBack();
    };
    this.view.customHeader.btnRight.onClick = function(){
      //scopeObj.navigateToFrmLogin();
			scopeObj.navBack();
    };
    this.view.flxEnrollAccount.onTouchEnd = function(){
      // Enroll Your Account Flow
      const navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("userFlow", "enrollActivate");
      navManager.navigateTo({"appName" :"AuthenticationMA","friendlyName" : "AuthUIModule/frmLegalEntity"});
    };
    this.view.flxActivateAccount.onTouchEnd = function(){
      // Activation Flow Component
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        var currForm = kony.application.getCurrentForm();
        var titleBarAttributes = currForm.titleBarAttributes;
          titleBarAttributes["navigationBarHidden"] = true;
          currForm.titleBarAttributes = titleBarAttributes;
//         scopeObj.view.title="Profile Activation";
//         scopeObj.view.activateProfile.height="80%";
//         scopeObj.view.activateProfile.top="10%";
      }else{
//         scopeObj.view.activateProfile.height="100%";
//         scopeObj.view.activateProfile.top="0dp";
      }
      scopeObj.view.flxMainContainer.setVisibility(false);
      scopeObj.view.activateProfile.setVisibility(true);
      
      // TODO - Make Backend Call to send Activation Code
    };
  },
  
  closeActivateProfileFlow: function(){
    this.view.activateProfile.setVisibility(false);
    this.view.flxMainContainer.setVisibility(true);
  },
  
  navigateToFrmLogin: function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },

navBack : function(){
    RDNAAPI.resetAuthState();
var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('EnrollUIModule');
enrollMod.presentationController.resetEnrollObj('frmEnrollActivateProfileUniken');
},

});