define(["CommonUtilities"], function (CommonUtilities){
  return{
    scinstance:null,
init: function () {
var scope=this;
var currentFormObject = kony.application.getCurrentForm();
var currentForm=currentFormObject.id;
applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
},
      addComponentforSCA : function()
      {
        if(this.scinstance!=null)
          return;
          var currform = kony.application.getCurrentForm();
        this.scinstance = new com.temenos.infinity.mb.sca.transactions.SCAComponent({
          "height": "100%",
          "id": "SCAComponent",
          "isVisible": true,
          "left": "0dp",
          "masterType": constants.MASTER_TYPE_USERWIDGET,
          "isModalContainer": false,
          "skin": "slFboxmb",
          "top": "0dp",
          "width": "100%",
          "appName": "ResourcesHIDMA",
          "viewType": "SCAComponent",
          "shouldGroup": false,
          "overrides": {
            "SCAComponent": {
              "right": "viz.val_cleared",
              "bottom": "viz.val_cleared",
              "minWidth": "viz.val_cleared",
              "minHeight": "viz.val_cleared",
              "maxWidth": "viz.val_cleared",
              "maxHeight": "viz.val_cleared",
              "centerX": "viz.val_cleared",
              "centerY": "viz.val_cleared"
            }
          }
        }, {
          "paddingInPixel": false,
          "overrides": {}
        }, {
          "overrides": {}
        });
        this.scinstance.flowType = "";
        this.scinstance.servicekey = "";
        currform.add(this.scinstance);

      },
preShow: function () {
 if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      		this.view.flxHeader.isVisible = true;
    	}
    	else{
      		this.view.flxHeader.isVisible = false;
this.view.title= kony.i18n.getLocalizedString("kony.mb.MM.Confirmation");
   		 }
this.initActions();
this.setupUI();
          if (1 === CommonUtilities.getSCAType()) {
            this.addComponentforSCA();
          }
// this.view.lblSuccessMsg.isVisible=false;
  //this.view.btnDisposeCard.isVisible=false;
var navManager = applicationManager.getNavigationManager();
var currentForm = navManager.getCurrentForm();
applicationManager.getPresentationFormUtility().logFormName(currentForm);
},
initActions: function () {
var scope = this;
scope.view.btnDisposeCard.onClick=function(){
kony.application.openURL("https://www.google.com/");
};
scope.view.btnMyAccounts.onClick=function(){
scope_ManageCards_Pres.activeCardsScenario=true;
var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
manageCardsModule.presentationController.showCardsHome();
};
},
setupUI : function () {
if (scope_ManageCards_Pres.ackFlag===true){
this.view.flxReplaceCardSuccess.isVisible = true;
this.view.flxFailure.isVisible = false;
  if(scope_ManageCards_Pres.isReplaceCardScenario===true)
    {
      scope_ManageCards_Pres.isReplaceCardScenario=false;
      this.view.lblSuccessMsg.setVisibility(true);
      this.view.btnDisposeCard.setVisibility(true);
      this.view.lblSuccessMessage.setVisibility(true);
      this.view.btnDisposeCard.text=kony.i18n.getLocalizedString("kony.mb.cards.dispose");
      this.view.lblSuccessMsg.text=kony.i18n.getLocalizedString("kony.mb.cards.disposeCards");
     this.view.lblSuccessMessage.text=  scope_ManageCards_Pres.reqID !== "" ?kony.i18n.getLocalizedString("kony.mb.cards.replacecards") + " " + kony.i18n.getLocalizedString("i18n.CardManagement.OrderId") + " " + scope_ManageCards_Pres.reqID : kony.i18n.getLocalizedString("kony.mb.cards.replacecards");
    }
  else
    {
      this.view.lblSuccessMsg.setVisibility(false);
      this.view.btnDisposeCard.setVisibility(false);
      this.view. lblSuccessMessage.isVisible=true;
       this.view.lblSuccessMessage.text= scope_ManageCards_Pres.reqID !== "" ? kony.i18n.getLocalizedString("kony.mb.cards.activate") + " " + kony.i18n.getLocalizedString("i18n.CardManagement.OrderId") + " " + scope_ManageCards_Pres.reqID :  kony.i18n.getLocalizedString("kony.mb.cards.activate");
    }
// this.view.lblError.text = "Invalid Params";
}
else {
this.view.flxFailure.isVisible = true;
this.view.flxReplaceCardSuccess.isVisible = false;
  this.view.btnDisposeCard.setVisibility(false);
this.view.lblMessage.text = scope_ManageCards_Pres.errorMsg;
scope_ManageCards_Pres.lblMessage="";
}
scope_ManageCards_Pres.ackFlag=false;
  scope_ManageCards_Pres.reqID.reqID="";
applicationManager.getPresentationUtility().dismissLoadingScreen();
},
ComponentChangePinCall: function(response){
  this.view.SCAComponent.onSuccessCallback = this.scaSuccessCallback;
  this.view.SCAComponent.onFailureCallback =this.scaFailureCallback;
  var scopeObj =this;
  const userManager = applicationManager.getUserPreferencesManager();
  const userName = userManager.getUserObj().userName;
  response.userName = userName;
  response.userDetails={
    "data1": response.flowType,
    "data2": response.action
  };
  applicationManager.getMFAManager().setMFAFlowType(response.flowType);
  if (1===CommonUtilities.getSCAType()){
    try{
      scopeObj.view.SCAComponent.setVisibility(true);
      scopeObj.view.SCAComponent.setContext(response);
    }catch(e){
      kony.print(" Change PIN SCAComponent Call-->"+e);
      kony.print(e);
    }
  }
},
scaSuccessCallback :function(response) {
  applicationManager.getPresentationUtility().MFA.navigateToAckScreen(response);
},
scaFailureCallback : function(response) {
  if(response.hasOwnProperty("isLogoutUser") && response.isLogoutUser ) {
    let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLoginToast");
    loginData = loginData ? loginData : {};
    loginData.toastMessage = response.errorMessage;
    applicationManager.getNavigationManager().setCustomInfo("frmLoginToast", loginData);
    const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
    authMod.presentationController.onLogout();
  } else {
    applicationManager.getPresentationUtility().MFA.onMFAError(response);
  }
}
  }
});