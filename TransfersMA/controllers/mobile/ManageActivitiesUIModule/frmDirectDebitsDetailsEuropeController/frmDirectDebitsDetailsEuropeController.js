define({ 
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
    navManager.setEntryPoint("acknowledgementform", "frmDirectDebitsDetailsEurope");
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function () {
    // var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
    var navMan = applicationManager.getNavigationManager();
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
  },
  navigateCustomBack: function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },

  onNavigate : function(){
   var navMan = applicationManager.getNavigationManager();
    var transactionData =navMan.getCustomInfo("frmDirectDebitsDetailsEurope");
    try{
    var tokenParams = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.security_attributes;
   // var isCombinedUser = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.user_attributes.isCombinedUser;
    transactionData.entitlement = {};
   // transactionData.isCombinedUser = isCombinedUser;
    transactionData.entitlement.features = JSON.parse(tokenParams.features);
    transactionData.entitlement.permissions = JSON.parse(tokenParams.permissions);
    this.view.DetailsMain.setContext(transactionData);
    this.view.DetailsMain.onSuccess = this.onCancelDirectDebitSuccess;
    this.view.DetailsMain.onButtonAction =this.onButtonAction;
    this.view.DetailsMain.onError = this.onError;
    this.view.DetailsMain.showLoading= function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
    };
    this.view.DetailsMain.dismissLoading= function() {
       applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    }catch(e){
    this.view.DetailsMain.setContext(transactionData);
    this.view.DetailsMain.onSuccess = this.onCancelDirectDebitSuccess;
    this.view.DetailsMain.onButtonAction =this.onButtonAction;
    this.view.DetailsMain.onError = this.onError;
    }
  },
  onCancelDirectDebitSuccess : function(response){
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmTransferActivitiesDirectDebitsEurope", {"DELETE" : response});
    navMan.navigateTo("ManageActivitiesUIModule/frmTransferActivitiesDirectDebitsEurope",response);
  },
  onButtonAction : function(buttonId, details){
    //No actions in Direct Debits
    }, 
  showToastMessageErr : function(err){
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
    if(err.buttonIdentifier){
      if(err.buttonIdentifier ==="Cancel1"){
      var cancel1Text =  kony.i18n.getLocalizedString('i18n.kony.common.failedTitle');
      errorObject.formattedFailedText = cancel1Text;
      errorObject.isSuccess = false;
      this.view.CancelTransactionPopup.setContext(errorObject);
      this.view.flxErrorPopup.setVisibility(true);
      this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
        if(btnAction)
          scope.view.flxErrorPopup.setVisibility(false);
      };
      } 
      if(err.buttonIdentifier ==="Cancel2"){
        var cancel2Text = kony.i18n.getLocalizedString('i18n.kony.directDebit.skipNextPaymentFailed');
        errorObject.formattedFailedText = cancel2Text;
        errorObject.isSuccess = false;
        this.view.CancelTransactionPopup.setContext(errorObject);
        this.view.flxErrorPopup.setVisibility(true);
        this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
          if(btnAction)
            scope.view.flxErrorPopup.setVisibility(false);
        };
      }
    }
  },
  onError : function(err){
    var scope = this;
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else { 
      scope.showToastMessageErr(err);
    }  
  }
  });