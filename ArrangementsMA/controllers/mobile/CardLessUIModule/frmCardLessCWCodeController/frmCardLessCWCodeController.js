define({
    popupMsg: '',
   cardlessTxnDetails:'',
   createDetails:'',
   userdetails:'',
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
		this.populateDetails();
    },
    preShow: function() {
      	this.view.customHeader.flxBack.isVisible=false;
		this.view.btnViewTransactionDetails.text="";
        if ((this.popupMsg !== null) && (this.popupMsg !== '')) {
            this.showPopupSuccess();
        }
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }else{
            this.view.flxHeader.isVisible = true;
        }
	  var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      	var transactionID =  cardlessModule.presentationController.getTransactionId();
        if(transactionID)
          {
            this.showTransactionWithdrawalToastMessage(transactionID);
            cardlessModule.presentationController.setTransactionId();
          }
		this.view.btnSeeWithdrawCash.onClick=this.btnSeeWithdrawCashOnClick;
		this.view.btnDone.onClick = this.btnDoneOnClick;
      	this.view.btnFindNearByAtm.onClick=this.findNearByATM;
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
		applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    init : function(){
      var scope=this;
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
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "moduleName": "LocateUsUIModule",
      "appName": "AboutUsMA"
    });
    locateUsModule.presentationController.presentLocateUsView(true,scope);
  },
   showMsg:function()
  {
   // alert(this.cardlessTxnDetails);
 if(this.userdetails.phone){
   			kony.phone.sendSMS(this.cardlessTxnDetails.cashlessPhone,"Dear "+this.cardlessTxnDetails.cashlessPersonName+", You have received "+this.cardlessTxnDetails.amount+" from mobile "+this.userdetails.phone+". To withdraw cash, please enter the Withdrawal Code - "+this.createDetails.otp+" and 4-digit Secure Code shared by the sender at the ATM.");
        }
  		else if(this.userdetails.email){
          	kony.phone.sendSMS(this.cardlessTxnDetails.cashlessPhone,"Dear "+this.cardlessTxnDetails.cashlessPersonName+", You have received "+this.cardlessTxnDetails.amount+" from email "+this.userdetails.email+". To withdraw cash, please enter the Withdrawal Code - "+this.createDetails.otp+" and 4-digit Secure Code shared by the sender at the ATM.");
        }
  		else{
          	kony.phone.sendSMS(this.cardlessTxnDetails.cashlessPhone,"Dear "+this.cardlessTxnDetails.cashlessPersonName+", You have received "+this.cardlessTxnDetails.amount+". To withdraw cash, please enter the Withdrawal Code - "+this.createDetails.otp+" and 4-digit Secure Code shared by the sender at the ATM.");
        }
  },
  showMail:function()
  {
   // alert(this.cardlessTxnDetails);
     if(this.userdetails.phone){
  			kony.phone.openEmail([this.cardlessTxnDetails.cashlessEmail],[],[],"Cardless Cash Withdrawal","Dear "+this.cardlessTxnDetails.cashlessPersonName+", You have received "+this.cardlessTxnDetails.amount+" from mobile "+this.userdetails.phone+". To withdraw cash, please enter the Withdrawal Code - "+this.createDetails.otp+" and 4-digit Secure Code shared by the sender at the ATM.");
        }
  		else if(this.userdetails.email){
            kony.phone.openEmail([this.cardlessTxnDetails.cashlessEmail],[],[],"Cardless Cash Withdrawal","Dear "+this.cardlessTxnDetails.cashlessPersonName+", You have received "+this.cardlessTxnDetails.amount+" from email "+this.userdetails.email+". To withdraw cash, please enter the Withdrawal Code - "+this.createDetails.otp+" and 4-digit Secure Code shared by the sender at the ATM.");
        }
  		else{
    		kony.phone.openEmail([this.cardlessTxnDetails.cashlessEmail],[],[],"Cardless Cash Withdrawal","Dear "+this.cardlessTxnDetails.cashlessPersonName+", You have received "+this.cardlessTxnDetails.amount+". To withdraw cash, please enter the Withdrawal Code - "+this.createDetails.otp+" and 4-digit Secure Code shared by the sender at the ATM.");
        }
  },
    showPopupSuccess: function() {
        var scopeObj = this;
        this.timerCounter = parseInt(this.timerCounter) + 1;
        var timerId = "timerPopupSuccess" + this.timerCounter;
        this.view.flxPopup.skin = "sknFlx43ce6e";
        this.view.customPopup.imgPopup.src = "confirmation.png";
        this.view.customPopup.lblPopup.text = this.popupMsg;
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
        }, 3, false);
    },
	bindGenericSuccess : function(msg){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg);
	},
	showTransactionWithdrawalToastMessage:function(transactionID){
   		this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardless.withdrawalMessage")+transactionID);
    },
    btnDoneOnClick:function(){
		applicationManager.getPresentationUtility().showLoadingScreen();
		var cardLessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      	cardLessModule.presentationController.getCardlessPendingAndPostedTransactions();
    },
  	btnSeeWithdrawCashOnClick:function(){
  		kony.application.openURL("https://youtu.be/UGJMk5_ZNrk");
	},
  	populateDetails:function(){
      var navMan=applicationManager.getNavigationManager();
      var txnDetails=navMan.getCustomInfo("frmCardLessCWCode");
      this.createDetails=txnDetails.createResponse;
      this.cardlessTxnDetails=txnDetails.transnDetails;
	  this.cardlessTxnDetails=JSON.parse(JSON.stringify(txnDetails.transnDetails));
      var cardLessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      this.cardlessTxnDetails.amount=cardLessModule.presentationController.processAmount(this.cardlessTxnDetails.amount);
      this.userdetails=txnDetails.userDetails;
      this.view.lblCashWithdrawalCodeVal.text=this.createDetails.otp;
      this.view.lblExpiresIn.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardLess.ExpiresIn")+this.createDetails.validDate;
      if(this.cardlessTxnDetails.cashlessMode==="Self"){
	  	this.view.flxShareWithdrawCode.isVisible=false;
      }
      else{
        this.view.flxShareWithdrawCode.isVisible=true;
        this.view.flxMsg.onClick=this.showMsg;
        this.view.flxMail.onClick=this.showMail;
      }
    }
});