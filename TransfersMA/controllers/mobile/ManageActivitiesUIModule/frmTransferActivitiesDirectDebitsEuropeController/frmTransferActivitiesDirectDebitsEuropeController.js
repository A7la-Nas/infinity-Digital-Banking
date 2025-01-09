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
    }
    else {
      this.view.flxHeader.isVisible = true;
    }
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    if (navManager.getCustomInfo("frmTransferActivitiesDirectDebitsEurope")) {
      var response = navManager.getCustomInfo("frmTransferActivitiesDirectDebitsEurope").DELETE;
      this.showToastMessage(response);
      navManager.setCustomInfo("frmTransferActivitiesDirectDebitsEurope", null);
    }
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  showToastMessage: function(response) {
    var scope = this;
    if(response.buttonIdentifier){
      if(response.buttonIdentifier ==="Cancel1"){
      var cancel1Text =  kony.i18n.getLocalizedString('i18n.kony.common.successTitle');
      response.formattedSuccessText = cancel1Text;
      response.referenceId = response.orderId;
      response.isSuccess = true;
      this.view.CancelTransactionPopup.setContext(response);
      this.view.flxCancelPopup.setVisibility(true);
      this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
        if(btnAction)
          scope.view.flxCancelPopup.setVisibility(false);
      };
      } 
      if(response.buttonIdentifier ==="Cancel2"){
        var cancel2Text = kony.i18n.getLocalizedString('i18n.kony.directDebit.skipNextPaymentSuccess');
        response.formattedSuccessText = cancel2Text;
        var referenceId = response.orderId;
        response.referenceId = referenceId;
        response.isSuccess = true;
        this.view.CancelTransactionPopup.setContext(response);
        this.view.flxCancelPopup.setVisibility(true);
        this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
          if(btnAction)
            scope.view.flxCancelPopup.setVisibility(false);
        };
      }
    } else {
      var formattedText =  kony.i18n.getLocalizedString('i18n.kony.common.successTitle');
      response.formattedSuccessText = formattedText;
      response.isSuccess = true;
      this.view.CancelTransactionPopup.setContext(response);
      this.view.flxCancelPopup.setVisibility(true);
      this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
        if(btnAction)
          scope.view.flxCancelPopup.setVisibility(false);
      };
    }
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
    var formattedText = kony.i18n.getLocalizedString('i18n.kony.common.failedTitle');
    errorObject.formattedFailedText = formattedText;
    errorObject.isSuccess = false;
    this.view.CancelTransactionPopup.setContext(errorObject);
    this.view.flxCancelPopup.setVisibility(true);
    this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
      if(btnAction)
        scope.view.flxCancelPopup.setVisibility(false);
    };
  },
  
  initActions: function () {
    var scope = this;
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
    var navMan = applicationManager.getNavigationManager();
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.TransfersListMobileNative.onRequestStart = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
    };
    this.view.TransfersListMobileNative.onRequestEnd = function() {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    this.view.TransfersListMobileNative.getTransactionsData = function() {};
    this.view.TransfersListMobileNative.onSwipeButtonClick = function(rowData) {};
    this.view.TransfersListMobileNative.onDeleteSuccess = function(response) {
      scope.showToastMessage(response);
    };
    this.view.TransfersListMobileNative.onDeleteError = function(err) {
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else {
          scope.showToastMessageErr(err);
      }
    };
    this.view.TransfersListMobileNative.onRowClick = function(data) {
      navMan.setCustomInfo("frmDirectDebitsDetailsEurope", data);
      navMan.navigateTo("ManageActivitiesUIModule/frmDirectDebitsDetailsEurope");
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
  navigateCustomBack: function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.setEntryPoint("acknowledgementform", "frmTransferActivitesDirectDebitsEurope");
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
    accountMod.presentationController.showDashboard();
  },
  onNavigate: function() {
   applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scope = this;
    var params = {};
    if (CommonUtilities.getSCAType() == 1) {
        var tokenParams = kony.sdk.getCurrentInstance().tokens.CIBACustomIdentity.provider_token.params.security_attributes;
        var isCombinedUser = kony.sdk.getCurrentInstance().tokens.CIBACustomIdentity.provider_token.params.user_attributes.isCombinedUser;
       }
       else{
       var tokenParams = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.security_attributes;
       var isCombinedUser = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.user_attributes.isCombinedUser;
        }  
    params.entitlement = {};
    params.isCombinedUser = isCombinedUser;
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
    this.view.TransfersListMobileNative.onFilterSelect(params);
  },
  setSearchedValues: function(params) {
    this.view.TransfersListMobileNative.onSearch(params);
  },
}
});