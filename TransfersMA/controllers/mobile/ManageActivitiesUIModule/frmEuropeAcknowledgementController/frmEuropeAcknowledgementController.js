define({
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
    },

  preShow:function(){
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }  
    this.setupUI();
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  
  initActions: function() {
    this.view.btnManageBeneficiary.onClick=this.navigateToManageBeneficiaries;
    this.view.btnDashboard.onClick = this.navigateToDashboard;
    this.view.btnNewTransfer.onClick = this.navigateToMakeaPayment;
    this.view.btnTryAgain.onClick = this.navigateToManageBeneficiaries;
  },

  navigateToManageBeneficiaries: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
    transMod.enterManageRecipientsFlow();
  },
  
  navigateToMakeaPayment: function() {
    var navMan = applicationManager.getNavigationManager();
	if(scope_configManager.TransferFlowType === "UTF"){
      navMan.navigateTo("UnifiedTransferFlowUIModule/frmSelectTransferTypeNew");
    } else {    
    navMan.setEntryPoint("europeTransferFlow", "frmEuropeAcknowledgement");
    navMan.setEntryPoint("startFromFlow", "frmEuropeTransferFromAccount");
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.setTransferToAccountFromManageFlow();
	}
  },

  navigateCustomBack: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
    transMod.enterManageRecipientsFlow();
  },

  navigateToDashboard: function() {
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
    accountMod.presentationController.showDashboard();
  },

  setupUI: function() {
    var navMan = applicationManager.getNavigationManager();
    var formData = navMan.getCustomInfo("frmEuropeAcknowledgement");
    if (kony.sdk.isNullOrUndefined(formData.segData)) {
      this.view.flxError.isVisible = true;
      this.view.flxSuccessTransaction.isVisible = false;
      this.view.lblTitle.text = formData.title;
    }
    else {
      this.view.flxError.isVisible = false;
      this.view.flxSuccessTransaction.isVisible = true;
      if (formData.screenType === "DELETE") {
        this.view.btnNewTransfer.isVisible = false;
        this.view.btnDashboard.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.PFM.Home");
      }
      else {
        this.view.btnNewTransfer.isVisible = true;
        this.view.btnDashboard.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MyAccounts.Title");
      }
      this.view.lblSuccessMessage.text = formData.title;
      this.view.segDetails.widgetDataMap = this.getWidgetDataMap();
      var segmentData = applicationManager.getDataProcessorUtility().removeRowsWithEmptyValueFromSegmentData(formData.segData, this.view.segDetails.widgetDataMap.lblDetails);
      this.view.segDetails.setData(segmentData);
    }
  },

  getWidgetDataMap : function () {
    var map = {
      lblTitle:"property",
      lblDetails:"value"
    };
    return map;
  },

   postShow:function()
  {
    
  }
      
  });