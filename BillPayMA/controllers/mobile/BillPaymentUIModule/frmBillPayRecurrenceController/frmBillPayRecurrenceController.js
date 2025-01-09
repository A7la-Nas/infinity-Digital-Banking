define({
    keypadString:'',
    timerCounter: 0,
	init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function(){
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }
      	 this.keypadString='';
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var recur= billPayMod.presentationController.getTransObject();
   //   var navMan=applicationManager.getNavigationManager();
     // var recurrence=navMan.getCustomInfo("frmTransfersRecurrence");
      if(recur.numberOfRecurrences!==null&&recur.numberOfRecurrences!==""&&recur.numberOfRecurrences!==undefined)
        {
          this.keypadString=recur.numberOfRecurrences;
        }
		this.updateInputBullets();
        this.initActions();
		var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    initActions: function(){
        this.view.btnContinue.onClick = this.clickOnContinue;
        this.view.customHeader.flxBack.onClick = function(){
           var navMan=applicationManager.getNavigationManager();
           navMan.goBack();
        }
        this.view.customHeader.btnRight.onClick = function(){
        var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayModule.presentationController.cancelCommon();
        }
    },
   clickOnContinue:function()
  {
 var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var rec =Number(this.keypadString);
    if(rec===0)
       this.showErrorPopup(kony.i18n.getLocalizedString("kony.mb.billPay.validRecurrence"));
    else
      billPayModule.presentationController.transferSetRecurrence(this.keypadString);
  },
  showErrorPopup: function(errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
    updateInputBullets: function () {
        var scope = this;
        var widgets = this.view["flxInputRecurrenceNumber"].widgets();
        var dummyString = "__";
        for (var i = 0; i < this.keypadString.length; i++) {
            widgets[i].text = this.keypadString[i];
            widgets[i].skin = "sknLbl979797SSP60px";
        }
        for (var i = this.keypadString.length; i < widgets.length ; i++) {
            widgets[i].text = dummyString[i];
            widgets[i].skin = "sknLble3e3e3SSP60px";
        }
        if(this.keypadString.length!==0){
            this.view.btnContinue.setEnabled(true);
            this.view.btnContinue.skin = "sknBtn055BAF26px";
            this.view.btnContinue.focusSkin = "sknBtn004B9526pxFocus";
        }else{
            this.view.btnContinue.setEnabled(false);
            this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
            this.view.btnContinue.focusSkin = "sknBtna0a0a0SSPReg26px";
        }
        this.view.forceLayout();
    },
    setKeypadChar: function (char) {
        if (this.keypadString.length === 2) return;
        this.keypadString = this.keypadString + char;
        this.updateInputBullets();
    },
    clearKeypadChar: function () {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
            this.updateInputBullets();
        }
        if (this.keypadString.length !== 0) {
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            this.updateInputBullets();
        }
    }
 });