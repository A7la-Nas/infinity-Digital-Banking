define({
  popupMsg: '',
  onNavigate: function(obj) {
    if (obj === undefined) {
      var newObj = {
        "popup": "none"
      };
      obj = newObj;
    }
    if (obj.popup === "sucessCashWithdraw") {
      this.popupMsg = "Cash withdrawal has been placed successfully with transaction ID:773992HGV839";
    }
    if (obj.popup === "none") {
      this.popupMsg = '';
    }
  },
  preShow: function() {
    this.view.btnViewTransactionDetails.text="";
    this.populateDetails();
   	if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  init : function(){
    var scope=this;
    this.view.btnSeeWithdrawCash.onClick=this.btnSeeWithdrawCashOnClick;
    this.view.btnDone.onClick = this.btnDoneOnClick;
    this.view.flxQRCode.onClick = this.flxQROnClick;
    this.view.btnFindNearByAtm.onClick=this.findNearByATM;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"CALLBACK",currentForm,scope.navigateToAccountsDashboard);
  },
  	navigateToAccountsDashboard:function(){
      var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      cardlessModule.presentationController.commonFunctionForNavigation("frmDashboardAggregated")
    },
  findNearByATM:function(){
    var scope=this;
    var  locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LocateUsModule");
    locateUsModule.presentationController.presentLocateUsView(true,scope);
  },
  btnDoneOnClick:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var cardLessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cardLessModule.presentationController.setcardlessTransactionId("");
    cardLessModule.presentationController.getCardlessPendingAndPostedTransactionsQRScanner();
    cardLessModule.presentationController.qrSuccessFlag=false;
  },
  flxQROnClick:function(){
    var cardLessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cardLessModule.presentationController.invokeQRCodeFunctionality();
  },
  btnSeeWithdrawCashOnClick:function(){
    kony.application.openURL("https://youtu.be/UGJMk5_ZNrk");
  },
  populateDetails:function(){
    var navMan=applicationManager.getNavigationManager();
    var txnDetails=navMan.getCustomInfo("frmCardLessQRCode");
    var createDetails=txnDetails.createResponse;
    var cardlessTxnDetails=txnDetails.transnDetails;
    this.view.lblExpiresIn.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardLess.ExpiresIn")+createDetails.validDate;
  },
  	bindGenericSuccess : function(msg){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg);
	},
	showTransactionWithdrawalToastMessage:function(transactionID){
   		this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardless.withdrawalMessage")+transactionID);
    }
});