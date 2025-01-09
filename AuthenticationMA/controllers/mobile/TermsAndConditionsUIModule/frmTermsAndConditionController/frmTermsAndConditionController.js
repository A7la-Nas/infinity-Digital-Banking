define({
 init : function(){
    var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
     applicationManager.getPresentationFormUtility().initCommonActions(this,"CALLBACK",currentForm,scope.mfaDeviceBack);
  },
  mfaDeviceBack:function()
  {
    var navigationMan=applicationManager.getNavigationManager();
    var formdata=navigationMan.getCustomInfo("frmTermsAndCondition");
    switch(formdata.flowType)
      {
        case "Enroll": navigationMan.goBack();
          break;
        case "LockCard": navigationMan.goBack();
          break;
        case "CancelCard": navigationMan.goBack();
          break;
        case "DisableEBanking": navigationMan.goBack();
          break;
      }
  },
  preShow : function(){
    this.populateData();
    var navigationMan=applicationManager.getNavigationManager();
    var formdata=navigationMan.getCustomInfo("frmTermsAndCondition");
    this.view.onDeviceBack = this.onCancelClick;
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      if(formdata.flowType === "DisableEBanking")
        {
          /*this.view.customHeader.flxBack.onClick = function(){
            navigationMan.goBack();
          };
          this.view.customHeader.flxBack.setVisibility(false);*/
          this.setDisableEBankingData();
        }
      else
        this.view.customHeader.flxBack.setVisibility(true);
        //osama
        // this.view.customHeader.flxBack.onClick = function(){
        //     navigationMan.goBack();
        //   };
        this.view.customHeader.flxBack.onClick = this.onCancelClick;
      this.view.flxHeader.isVisible = true;
    }
    else{
      if(formdata.flowType === "DisableEBanking"){
        this.view.setHidesBackButton({
          "hidesBackButton": true,
          "animated": false
        });
        this.view.title=kony.i18n.getLocalizedString("kony.mb.settings.termsAndConditions");
        this.setDisableEBankingData();
      }
      else{
        this.view.setHidesBackButton({
          "hidesBackButton": false,
          "animated": false
        });
        this.view.title=kony.i18n.getLocalizedString("kony.mb.TermsAndConditions.Title");
      }
      this.view.flxHeader.isVisible = false;
    }
    if(formdata.flowType === "DisableEBanking"){
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.settings.termsAndConditions");
      var btntxt=kony.i18n.getLocalizedString("kony.mb.settings.termsAndConditions");
      this.view.lblRichTxt.text= kony.i18n.getLocalizedString("i18n.savingspot.Iaccept")+"  "+"<a href=''>"+btntxt+"</a>";
    }else{
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.TermsAndConditions.Title");
      var btntxt=kony.i18n.getLocalizedString("kony.mb.TermsAndConditions.Title");
      this.view.lblRichTxt.text= kony.i18n.getLocalizedString("kony.mb.externalAccounts.termnsConditionsChk")+"  "+"<a href=''>"+btntxt+"</a>";
    }
    this.view. lblRichTxt.linkSkin= "sknBtn0095e428px";
    this.view.lblRichTxt.onClick=this. btnOnClick;
    this.view.imgTermsAccepted.src="tickmarkbox.png";
    this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    this.view.btntermsandconditions.onClick=this.btnOnClick;
    this.view.btnContinue.onClick=this.btnContinueFunction;
    this.view.flxCheckBox.onClick=this.toggleCheckBox;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  postShow:function()
  {
    this.view.brsrTerms.enableParentScrollingWhenReachToBoundaries=false;
  },
  populateData:function()
  {
    var navigationMan=applicationManager.getNavigationManager();
    var formdata=navigationMan.getCustomInfo("frmTermsAndCondition");
  //  this.view.rtxTermsConditionsValue.text=formdata.content;
    this.view.brsrTerms.htmlString=formdata.content;
  //  
  //  this.view.brsrTerms.htmlString=formdata.content;
    switch(formdata.flowType)
      {
        case "Login": this.view.flxMainContainer.setVisibility(true);
                      this.view.flxTermsConditions.setVisibility(false);
          break;
		case "Enroll":  this.view.flxMainContainer.setVisibility(false);
                        this.view.flxTermsConditions.setVisibility(true);
          break;
        case "LockCard": this.view.flxMainContainer.setVisibility(true);
                      this.view.flxTermsConditions.setVisibility(false);
          break;
        case "CancelCard": this.view.flxMainContainer.setVisibility(true);
                      this.view.flxTermsConditions.setVisibility(false);
          break;
        case "DisableEBanking": this.view.flxMainContainer.setVisibility(false);
                      this.view.flxTermsConditions.setVisibility(true);
          break;
      }
  },
  
  setDisableEBankingData: function(){
    var formdata =  applicationManager.getNavigationManager().getCustomInfo("frmTermsAndCondition");
    if(formdata.contentTypeID == "URL"){
      kony.application.openURL(formdata.content);
    }
    else{
      this.view.customHeader.flxBack.setVisibility(false);
    }

  },
  
  btnOnClick:function()
  {
    var formdata =  applicationManager.getNavigationManager().getCustomInfo("frmTermsAndCondition");
    if(formdata.contentTypeID == "URL"){
            kony.application.openURL(formdata.content);
    }
    else{
    this.view.customHeader.flxBack.setVisibility(true);
    this.view.flxMainContainer.setVisibility(false);
    this.view.flxTermsConditions.setVisibility(true);
    }
  },
  btnContinueFunction:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    const configManager = applicationManager.getConfigurationManager();
    const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
    if(isAboutUsMAPresent){
      const informationModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "AboutUsMA", moduleName: "InformationUIModule" });
      informationModule.presentationController.acceptTermsAndCondition();
    } else {
      kony.print("Please Add AboutUsMA MicroApp to proceed");
    }
  },
  onCancelClick : function(){
    var navigationMan=applicationManager.getNavigationManager();
    var formdata=navigationMan.getCustomInfo("frmTermsAndCondition");
    switch(formdata.flowType)
    {
      case "Login": this.loginCancel();
        break;
      case "Enroll": this.enrollCancel();
        break;
      case "LockCard":this.lockCancel();
        break;
      case "CancelCard":this.loginCancel();
        break;
      case "DisableEBanking":this.disableEBankingCancel();
        break;
    }
  },
  enrollCancel:function()
  {
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
  
    disableEBankingCancel: function()
  {
    var navigationMan=applicationManager.getNavigationManager();
    new kony.mvc.Navigation({
                "friendlyName": "frmEBankingAccess",
                "appName": "ManageProfileMA"
            }).navigate();
  },
  
  lockCancel:function()
  {
    var navigationMan=applicationManager.getNavigationManager();
   new kony.mvc.Navigation({
                "friendlyName": "ManageCardsUIModule/frmCardManageHome",
                "appName": "CardsMA"
            }).navigate();
  },
  loginCancel:function()
  {
     if(this.view.flxTermsConditions.isVisible===true)
      {
     //  this.view.imgTermsAccepted.src="tickmarkbox.png";
   // this.view.btnContinue.setEnabled(false);
    //this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    var navigationMan=applicationManager.getNavigationManager();
    var formdata=navigationMan.getCustomInfo("frmTermsAndCondition");
    if(formdata.flowType === "DisableEBanking")
      this.view.customHeader.flxBack.setVisibility(true);
    this.view.flxMainContainer.setVisibility(true);
    this.view.flxTermsConditions.setVisibility(false);
      }
    else {
      const configManager = applicationManager.getConfigurationManager();
      const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
      if(isAboutUsMAPresent){
        const informationModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "AboutUsMA", moduleName: "InformationUIModule" });
        informationModule.presentationController.cancelOnClick();
      } else {
        kony.print("Please Add AboutUsMA MicroApp to proceed");
      }
    }
  },
  toggleCheckBox:function()
  {
    if(this.view.imgTermsAccepted.src==="tickmarkbox.png")
    {
      this.view.imgTermsAccepted.src="a.png";
      this.view.btnContinue.setEnabled(true);
      this.view.btnContinue.skin = "sknBtn0095e426pxEnabled";
    }
    else
    {
      this.view.imgTermsAccepted.src="tickmarkbox.png";
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    }
  },
   bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});