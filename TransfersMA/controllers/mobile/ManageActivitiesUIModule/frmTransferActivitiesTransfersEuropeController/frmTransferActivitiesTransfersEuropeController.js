define(['CommonUtilities'],function(CommonUtilities){ 
  return{
  init: function () {
    var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxTransfersList.top = "132dp"; 
    }
    else {
      this.view.flxHeader.isVisible = true;
      this.view.flxTransfersList.top = "188dp"; 
    }
    var config = applicationManager.getConfigurationManager();
    config.getDisputeConfigurations();
    var navManager = applicationManager.getNavigationManager();
    
    this.initActions();
    
    if (navManager.getCustomInfo("frmTransferActivitiesTransfersEurope")) {
      var response = navManager.getCustomInfo("frmTransferActivitiesTransfersEurope").DELETE;
      if(response) {
        this.showToastMessage(response);
      }
      navManager.setCustomInfo("frmTransferActivitiesTransfersEurope", null);
    }
    
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  
  showToastMessage: function(response) {
    var scope = this;
    var formattedText =  kony.i18n.getLocalizedString('i18n.kony.transfers.transactionCancelSuccess');
    response.formattedSuccessText = formattedText;
    response.isSuccess = true;
    this.view.CancelTransactionPopup.setContext(response);
    this.view.flxCancelPopup.setVisibility(true);
    this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
      if(btnAction)
        scope.view.flxCancelPopup.setVisibility(false);
    };
  },
  
  showToastMessageErr: function(err) {
    var scope = this;
    var errorObject = {};
    if (err.serverErrorRes.errorDetails) {
      errorObject.messageDetails = err.serverErrorRes.errorDetails;
    } else {
      var formattedResponse = [];
      var errMsg = {};
      errMsg.message = err.errorMessage;
      errMsg.imgIcon = " ";
      formattedResponse.push(errMsg);
      errorObject.messageDetails = JSON.stringify(formattedResponse);
    }
    if(err.formattedText){
        errorObject.formattedFailedText = err.formattedText;
      }
    errorObject.isSuccess = false;
    this.view.CancelTransactionPopup.setContext(errorObject);
    this.view.flxCancelPopup.setVisibility(true);
    this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
      if(btnAction)
        scope.view.flxCancelPopup.setVisibility(false);
    };
  },
  
  bindGenericError: function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scope = this;
    var formattedText = kony.i18n.getLocalizedString("i18n.payments.errorInFetchingAttachements");
    error.formattedText = formattedText;
    scope.showToastMessageErr(error);
  },
  
  initActions: function () {
    var scope = this;
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
    var navMan = applicationManager.getNavigationManager();
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    //osama
    this.view.onDeviceBack = this.navigateCustomBack;
    this.view.TransfersListMobileNative.onRequestStart = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
    };
    this.view.TransfersListMobileNative.onRequestEnd = function() {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    
    this.view.TransfersListMobileNative.getTransactionsData = function(){};
    this.view.TransfersListMobileNative.onSwipeButtonClick = function(rowData){
      if (rowData.id === "repeat") {
        scope.repeatTrans(rowData);
      }
      else if (rowData.id === "edit") {
        scope.editTrans(rowData)
      }
    };
    this.view.TransfersListMobileNative.onDeleteSuccess = function(response){
      scope.showToastMessage(response);
    };
    this.view.TransfersListMobileNative.onDeleteError = function(err){
      var formattedText = kony.i18n.getLocalizedString('i18n.kony.transfers.transactionCancelFailed');
      err.formattedText = formattedText;
      scope.errorMessage(err);
    };
    this.view.TransfersListMobileNative.onRowClick = function(data) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
      transferModPresentationController.retriveAttachments(data, scope.attachmentsSuccessCallback.bind(this,data));
    };
    this.view.TransfersListMobileNative.onFetchError = function(err){
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else { 
        applicationManager.getDataProcessorUtility().showToastMessageError(scope, err["errorMessage"]);
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    
  },
  errorMessage: function(err) {
    var scope = this;
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else { 
        scope.showToastMessageErr(err);
    } 
  },
	attachmentsSuccessCallback : function(data,response){
    if(response.fileNames){
    data.fileNames = response.fileNames;
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmTransfersDetailsEurope", data);
    navMan.setEntryPoint("europeTransferFlow", "frmTransferActivitiesTransfersEurope");
    navMan.navigateTo("ManageActivitiesUIModule/frmTransfersDetailsEurope");
    }
  },
  navigateCustomBack: function () {
    var navManager = applicationManager.getNavigationManager();
    var entryPoint = navManager.getEntryPoint("acknowledgementform");
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
    accountMod.presentationController.showDashboard();
  },
  onNavigate: function() {
   applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scope = this;
    var params = {};
    if (CommonUtilities.getSCAType() == 1) {
    var tokenParams = kony.sdk.getCurrentInstance().tokens.CIBACustomIdentity.provider_token.params.security_attributes;
     }
     else{
     var tokenParams = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.security_attributes;
      }
    //var isCombinedUser = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.user_attributes.isCombinedUser;
    var accountManager = applicationManager.getAccountManager();
    var accountNumberBusinessAccountMap = this.getAccountMap(accountManager.getInternalAccounts());
    var isCombinedUser = this.getCombinedUserFlag(accountNumberBusinessAccountMap);
    params.entitlement = {};
    params.isCombinedUser = isCombinedUser;
    params.accountNumberBusinessAccountMap = accountNumberBusinessAccountMap;
    params.entitlement.features = JSON.parse(tokenParams.features);
    params.entitlement.permissions = JSON.parse(tokenParams.permissions);
    this.view.tabs.setContext(params);
    var selectedTab = this.view.tabs.defaultTab;
    this.view.tabs.setSelectedTab(selectedTab);
    this.view.tabs.onError=this.onError;
    this.view.tabs.onTabClick=this.onTabClick;
    this.view.SearchAndFilter.onFilterSelect = this.setFilteredValues;
    this.view.SearchAndFilter.onSearchTextChange = this.setSearchedValues;
    this.view.SearchAndFilter.onError = this.onError;
    this.view.TransfersListMobileNative.setContext(params);
  },
  
  getCombinedUserFlag: function(accountMap) {
    let booleanSet = new Set();
    for (let key in accountMap) {
      booleanSet.add(accountMap[key]);
    }
    return booleanSet.size > 1;
  },

  getAccountMap: function(accountList) {
  	  var accountMap = {};
      accountList.forEach(function(account) {
        accountMap[account.accountID] = account.isBusinessAccount;
      });
      return accountMap;
  },
  
  onError: function(err){
    kony.application.dismissLoadingScreen();
   kony.print(JSON.stringify(err));
  },
  onTabClick: function(tabId){
    var navMan = applicationManager.getNavigationManager();
    if(tabId == "Recurring")
     {
       navMan.navigateTo("ManageActivitiesUIModule/frmTransferActivitiesRecurringEurope");
     } else if (tabId == "Direct Debits") {
       navMan.navigateTo("ManageActivitiesUIModule/frmTransferActivitiesDirectDebitsEurope");
     } else {
       navMan.navigateTo("ManageActivitiesUIModule/frmTransferActivitiesTransfersEurope");
     }
  },
  setFilteredValues: function(params,visibility,headerHeight) {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxTransfersList.top = (visibility) ? 132 + Number(headerHeight)  + "dp": "132dp"; 
    }
    else {
      this.view.flxTransfersList.top = (visibility) ? 188 + Number(headerHeight)  + "dp": "188dp"; 
    }
    this.view.TransfersListMobileNative.onFilterSelect(params);
  },
  setSearchedValues: function(params) {
    this.view.TransfersListMobileNative.onSearch(params);
  },
  
  repeatTrans: function(transactionData) {
    var navMan = applicationManager.getNavigationManager();
    var transferModPresentationController;
    if(scope_configManager.TransferFlowType === "UTF"){
      transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName": "ManageActivitiesUIModule","appName": "TransfersMA"});
    } else {
      transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName": "TransferEuropeUIModule","appName": "TransfersMA"});
    }
    transferModPresentationController.initializeStateData(false, "");
    if (transactionData)
      transferModPresentationController.setTransactionMode(transactionData.serviceName);
    if (transferModPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts")) {
      transferModPresentationController.setEuropeFlowType("INTERNAL");
      transferModPresentationController.getFromAccounts(function(res) {
        transferModPresentationController.setFromAndToAccounts(res);
        transferModPresentationController.repeatTransfer(transactionData);
      });
    }
    else {
      transferModPresentationController.setEuropeFlowType("EXTERNAL");
      transferModPresentationController.getFromAndToAccounts(function(res) {
        transferModPresentationController.setFromAndToAccounts(res);
        transferModPresentationController.repeatTransfer(transactionData);
      });
    }  
  },

  editTrans: function(transactionData) {
    var navMan=applicationManager.getNavigationManager();
    var transferModPresentationController;
    if(scope_configManager.TransferFlowType === "UTF"){
      transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName": "ManageActivitiesUIModule","appName": "TransfersMA"});
    } else {
      transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName": "TransferEuropeUIModule","appName": "TransfersMA"});
    }
    transferModPresentationController.initializeStateData(false, "");
    if (transactionData) {
      transferModPresentationController.setTransactionMode(transactionData.serviceName);
      navMan.setCustomInfo("existingAttachments", transactionData.fileNames);
    }  
    if (transferModPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts")) {
      transferModPresentationController.setEuropeFlowType("INTERNAL");
      transferModPresentationController.getFromAccounts(function(res) {
        transferModPresentationController.setFromAndToAccounts(res);
        transferModPresentationController.setTransactionObject(transactionData);
      });
    }
    else {
      transferModPresentationController.setEuropeFlowType("EXTERNAL");
      transferModPresentationController.getFromAndToAccounts(function(res){
        transferModPresentationController.setFromAndToAccounts(res);
        transferModPresentationController.setTransactionObject(transactionData);
      });
    } 
  }
}
});