define({ 

    //Type your controller code here 
    init : function(){
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },

    preshow : function(){
      	var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var navManager = applicationManager.getNavigationManager();
      var entities = navManager.getCustomInfo("frmEBankingAccessAck");
        var isIphone = deviceUtilManager.isIPhone();
        if(isIphone){
            this.view.flxHeader.isVisible = false;
        }
        else
            this.view.flxHeader.isVisible = true;
       this.setAcknowledgementScreen(entities);
        this.setFlowActions();
    },

   setAcknowledgementScreen: function(data){
     var flowType = data.flowType;
     
       if( flowType === "All Entities" || flowType === "Default Entity Equalto Current Entity" || flowType === "Current Entity"){
         this.view.lblConfirmationDescription.text = (flowType === "All Entities") ?
           "You have to reach out to the bank to unblock e-Banking access" : kony.i18n.getLocalizedString("kony.mb.logout.eBankingAccessSuccessInfo");
         this.view.btnContinue.text = "Sign In";
       }
       if( flowType === "Default Entity NotEqualto Current Entity" || flowType === "Neither Current Nor Default Entity"){
         this.view.lblConfirmationDescription.text = " Your default entity has been disabled. Go to entity preference to select default entity.";
         this.view.lblConfirmationDescription.isVisible = (flowType === "Default Entity NotEqualto Current Entity") ? true : false;
         this.view.btnContinue.text = "Done";
       }
     
     applicationManager.getPresentationUtility().dismissLoadingScreen();
   },
  
    setFlowActions: function(){
        this.view.btnContinue.onClick = this.continueOnClick;
    },
  
  continueOnClick: function(){
    if(this.view.btnContinue.text !== "Sign In") {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      settingsMod.presentationController.getLegalEntities();
    } else {
      var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AuthUIModule","appName":"AuthenticationMA"});
      authMod.presentationController.disableEBankingLogout();
    }
  },
  
    bindViewError : function(msg){
        this.hidePopup();
        applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    },

    });