define(['CommonUtilities'],function(CommonUtilities){ 
  return{

  userContext: [],
  transferFlowType: [],
  visibleDescription: [],
  onNavigate:function(){
   var scope = this;
    var userContext = applicationManager.getUserPreferencesManager().getUserObj();
    if(applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")) {
    if(!kony.sdk.isNullOrUndefined(userContext) && userContext !== "") {
      this.userContext = userContext;
      if(scope.userContext.isP2PActivated === "true" && scope.userContext.hasOwnProperty("isP2PActivated")) {
        this.view.flxTransferType4.setVisibility(true);
        this.view.flxP2PActivation.setVisibility(false);
      } else {
        this.view.flxTransferType4.setVisibility(false);
        this.view.flxP2PActivation.setVisibility(true);
        } 
      }
    } else {
      this.view.flxTransferType4.setVisibility(false);
      this.view.flxP2PActivation.setVisibility(false);
    }
   if(kony.os.deviceInfo().name === "iPhone") {
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["shadowImage"] = "transparentbox.png";
      this.view.titleBarAttributes = titleBarAttributes;
      this.view.setBackgroundImageForNavbar({
        "image": "transparentbox.png",
        "barMetrics": constants.BAR_METRICS_DEFAULT
      });
     this.view.flxTop.setVisibility(false);
    } else {
      this.view.flxTop.setVisibility(true);
    }
   var params = {};
   if (CommonUtilities.getSCAType() == 1) {
   var tokenParams = kony.sdk.getCurrentInstance().tokens.CIBACustomIdentity.provider_token.params.security_attributes;
   }
   else{
   var tokenParams = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.security_attributes;
    }
   params.entitlement = {};
   params.entitlement.features = JSON.parse(tokenParams.features);
   params.entitlement.permissions = JSON.parse(tokenParams.permissions);
    this.view.transferType1.setContext(params);
    this.view.transferType2.setContext(params);
    this.view.transferType3.setContext(params);
    this.view.transferType4.setContext(params);
    this.view.P2PActivationTile.setContext(params);
    this.view.flxSelectTransferType.onScrolling = this.iPhoneHeaderHandler;
    this.view.transferType1.enableHideDescription = function(visibleDesc){
      scope.transferFlowType = "transferType1";
      if(visibleDesc){
        scope.enablingDetails();
      }else{
        scope.hideDetailsPage(); 
      }
    };
    this.view.transferType2.enableHideDescription = function(visibleDesc){
      scope.transferFlowType = "transferType2";
      if(visibleDesc){
        scope.enablingDetails();
      }else{
        scope.hideDetailsPage(); 
      }
    };
    this.view.transferType3.enableHideDescription = function(visibleDesc){
      scope.transferFlowType = "transferType3";
      if(visibleDesc){
        scope.enablingDetails();
      }else{
        scope.hideDetailsPage(); 
      }
    };
    this.view.transferType4.enableHideDescription = function(visibleDesc){
      scope.transferFlowType = "transferType4";
      if(visibleDesc){
        scope.enablingDetails();
      }else{
        scope.hideDetailsPage(); 
      }
    };
    this.view.transferType1.buttonActionHandling = function(trannsferTypeDetails){
      if(trannsferTypeDetails["id"] === "MakeTransfer"){
        scope.navigatePage(trannsferTypeDetails);
      } else {
        scope.navigateAddAccount(trannsferTypeDetails);
      }
    };
    this.view.transferType2.buttonActionHandling = function(trannsferTypeDetails){
     if(trannsferTypeDetails["id"] === "MakeTransfer"){
        scope.navigatePage(trannsferTypeDetails);
      } else {
        scope.navigateAddAccount(trannsferTypeDetails);
      }
    };
    this.view.transferType3.buttonActionHandling = function(trannsferTypeDetails){
       if(trannsferTypeDetails["id"] === "MakeTransfer"){
        scope.navigatePage(trannsferTypeDetails);
      } else {
        scope.navigateAddAccount(trannsferTypeDetails);
      }
    };
    this.view.transferType4.buttonActionHandling = function(trannsferTypeDetails){
      if(trannsferTypeDetails["id"] === "MakeTransfer"){
        scope.navigatePage(trannsferTypeDetails);
      } else {
        scope.navigateAddAccount(trannsferTypeDetails);
      }
    };
    this.view.P2PActivationTile.enableHideDescription = function(visibleDesc){
      if(visibleDesc){
        scope.enablingDetails();
      }else{
        scope.hideDetailsPage(); 
      }
    };
    this.view.P2PActivationTile.buttonActionHandling = function(transferTypeDetails){
      scope.navigateToActivateP2P();
    };
    this.view.transferType1.hideTile = function() {
      scope.view.flxTransferType1.setVisibility(false);
    };
    this.view.transferType2.hideTile = function() {
      scope.view.flxTransferType2.setVisibility(false);
    };
    this.view.transferType3.hideTile = function() {
      scope.view.flxTransferType3.setVisibility(false);
    };
    this.view.transferType4.hideTile = function() {
      scope.view.flxTransferType4.setVisibility(false);
    };
    this.view.P2PActivationTile.hideTile = function() {
      scope.view.flxP2PActivation.setVisibility(false);
    };
    // Footer Menu
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        //osama
     /* var footerMenuUtility = require("FooterMenuUtility");
      this.footerMenuUtility =
        footerMenuUtility.getFooterMenuUtilityInstance();
      var cm = applicationManager.getConfigurationManager();
      this.footerMenuUtility.entitlements = {
        features: cm.getUserFeatures(),
        permissions: cm.getUserPermissions(),
      };
      this.footerMenuUtility.scope = this;
      this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");*/
      this.view.imgBack.setVisibility(true);
    }
  },

  enablingDetails:function() {
    var scope = this;
    this.visibleDescription = true;
    this.view.flxSelectTransferType.setVisibility(false);
    this.view.flxSelectTransferType.forceLayout();
  }, 

  hideDetailsPage:function(){
    this.visibleDescription = false;
    this.view.flxSelectTransferType.setVisibility(true);
    this.view.flxSelectTransferType.forceLayout();
  },

  navigatePage:function(transferTypeDetails) {
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("UTFFlow","UTFNew");
    if(transferTypeDetails["transferType"] === "Within Same Bank") {
//       var ntf = new kony.mvc.Navigation("frmSameBank");
      navMan.setCustomInfo("frmSameBank", transferTypeDetails);
      navMan.navigateTo("UnifiedTransferFlowUIModule/frmSameBankNew");
      
    } else if(transferTypeDetails["transferType"] === "Domestic Transfer") {
//       var ntf = new kony.mvc.Navigation("frmDomesticTransfer");
      navMan.setCustomInfo("frmDomesticTransferNew", transferTypeDetails);
      navMan.navigateTo("UnifiedTransferFlowUIModule/frmDomesticTransferNew");
    } else if (transferTypeDetails["transferType"] === "International Transfer") {
//       var ntf = new kony.mvc.Navigation("frmInternationalTransfer");
      navMan.setCustomInfo("frmInternationalTransferNew", transferTypeDetails);
      navMan.navigateTo("UnifiedTransferFlowUIModule/frmInternationalTransferNew");
    }
    else {
      navMan.setCustomInfo("frmP2PTransferNew", transferTypeDetails);
      navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "UnifiedTransferFlowUIModule/frmP2PTransferNew"});
    } 
//     ntf.navigate(transferTypeDetails);
  },
  
  navigateAddAccount:function(transferTypeDetails) {
     var navMan = applicationManager.getNavigationManager();
   
    if(transferTypeDetails["transferType"] === "Within Same Bank") {
      navMan.navigateTo("UnifiedAddBeneficiaryUIModule/frmSameBankAddAccountNew");
      
    } else if(transferTypeDetails["transferType"] === "Domestic Transfer") {
      navMan.navigateTo("UnifiedAddBeneficiaryUIModule/frmDomesticAddAccountNew");
      
    } else if(transferTypeDetails["transferType"] === "International Transfer"){
      navMan.navigateTo("UnifiedAddBeneficiaryUIModule/frmInternationalAddAccountNew");
    }
    else {
      navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "UnifiedAddBeneficiaryUIModule/frmP2PAddAccountNew"});
    }
  },

  navigateToActivateP2P :  function() {
    var navMan = applicationManager.getNavigationManager();
    this.userContext["flowType"] = "Activation";
    navMan.setCustomInfo("frmP2PActivation", this.userContext);
    navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "P2PActivationDeactivationUIModule/frmP2PActivation"});
  },

  iPhoneHeaderHandler: function(){
    var scope = this;
    if(this.view.flxSelectTransferType.contentOffsetMeasured.y > 50){
      scope.view.title = kony.i18n.getLocalizedString("i18n.konybb.transfers.TransferType");
    }
    else if(this.view.flxSelectTransferType.contentOffsetMeasured.y < 45){
      scope.view.title = "";
    }
  },

  onDeactivate :  function() {
    var navMan = applicationManager.getNavigationManager();
    this.userContext["flowType"] = "Deactivation";
    navMan.setCustomInfo("frmP2PActivation", this.userContext);
    navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "P2PActivationDeactivationUIModule/frmP2PActivation"});
  },
   
  backNavigation: function(){
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    if(this.visibleDescription === true)   {
      if (kony.os.deviceInfo().name === "iPhone") {
      scope.hideDescriptionBack();
       }
    } else {
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
      accountMod.presentationController.showDashboard();
    }
  },

  hideDescriptionBack: function() {
    var scope = this;
      if(scope.transferFlowType === "transferType1"){
      this.view.transferType1.closeDescription();
      } else if (scope.transferFlowType === "transferType2"){
      this.view.transferType2.closeDescription(); 
      } else if (scope.transferFlowType === "transferType3"){
      this.view.transferType3.closeDescription(); 
      } else if (scope.transferFlowType === "transferType4"){
      this.view.transferType4.closeDescription(); 
      } else {
      this.view.P2PActivationTile.closeDescription();
      }
  }
}
});