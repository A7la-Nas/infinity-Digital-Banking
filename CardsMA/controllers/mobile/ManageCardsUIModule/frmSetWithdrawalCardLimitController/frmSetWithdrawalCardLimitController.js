define({ 

 //Type your controller code here 
  
  cardId:"",
  minLimit: 0,
  maxLimit: 5000,
  actualLimit: 0,  
  currencySymbol: "",
  currencyCode: "",
  stepAmount: 50,
  newWithdrawalLimit: 0,
  
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  
  preShow: function() {

    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIPhone = deviceUtilManager.isIPhone();
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});

    this.view.flxHeader.setVisibility(!isIPhone);
  
    this.initLimitValues();
    this.initActions();
    this.initUX();
  },
  
  initLimitValues: function() {
    var navManager = applicationManager.getNavigationManager();
    var formatManager = applicationManager.getFormatUtilManager();
	var cardLimitDetails = navManager.getCustomInfo("frmSetWithdrawalCardLimit");
    
    if(cardLimitDetails !== null && cardLimitDetails !== undefined){
      var withdrawalMinLimit = + parseFloat(cardLimitDetails.withdrawalMinLimit).toFixed(2);
      var withdrawalMaxLimit = + parseFloat(cardLimitDetails.withdrawalMaxLimit).toFixed(2);
      var withdrawalLimit = + parseFloat(cardLimitDetails.withdrawalLimit).toFixed(2);
      var withdrawalStep = + parseFloat(cardLimitDetails.withdrawalStepLimit).toFixed(2);
      this.minLimit = withdrawalMinLimit > 0 ? withdrawalMinLimit : this.minLimit;
      this.maxLimit = withdrawalMaxLimit > 0 ? withdrawalMaxLimit : this.maxLimit;
      this.actualLimit = withdrawalLimit;
      this.stepAmount = withdrawalStep > 0 ? withdrawalStep : this.stepAmount;
      this.currencyCode = cardLimitDetails.currencyCode;
      this.cardId = cardLimitDetails.cardId;
	}
    
    this.newWithdrawalLimit = this.actualLimit;
    this.view.lblAmount.text = formatManager.getCurrencySymbol(this.currencyCode) + " " + formatManager.formatAmount(this.newWithdrawalLimit);   
  },
  
  initUX: function() {
    this.view.btnConfirm.skin = "sknBtnConfirmInactive";
    this.view.btnConfirm.setEnabled(false);
    this.view.btnPlus.setVisibility(this.actualLimit < this.maxLimit);
    this.view.btnMinus.setVisibility(this.actualLimit > this.minLimit);
  },

  initActions: function () {
    //    var scope = this;

    this.view.customHeader.flxBack.onClick = this.goBack;
    this.view.customHeader.btnRight.onClick = this.goBack;
    this.view.btnConfirm.onClick = this.onConfirm;
    this.view.btnMinus.onClick = this.onMinusBtn;
    this.view.btnPlus.onClick = this.onPlusBtn;
    this.view.onDeviceBack = this.goBack;
  },

  goBack: function() {
//    scope_ManageCards_Pres.activeCardsScenario=true;
//    var navManager = applicationManager.getNavigationManager();
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
//    navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
    manageCardsModule.presentationController.showCardsHome();
    
  },
  
  onConfirm: function() {
    var self = this;
    applicationManager.getPresentationUtility().showLoadingScreen();   
    var formatManager = applicationManager.getFormatUtilManager();
    this.newWithdrawalLimit = formatManager.deFormatAmount(self.newWithdrawalLimit);
    var inputParams = {
      "Action": "updateWithdrawalLimit",
      "cardId": this.cardId,
      "withdrawalLimit": this.newWithdrawalLimit
    };
    
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.updateWithdrawalLimit(inputParams);
  },
  
  onPlusBtn: function() {
    var formatManager = applicationManager.getFormatUtilManager();
    this.newWithdrawalLimit += this.stepAmount;
    if (this.newWithdrawalLimit >= this.maxLimit){
      this.view.btnPlus.isVisible = false;
      this.newWithdrawalLimit = this.maxLimit;
    } 
    if (this.newWithdrawalLimit > this.minLimit){
     this.view.btnMinus.isVisible = true;
    }   
    if (this.newWithdrawalLimit === this.actualLimit){
      this.view.btnConfirm.skin = "sknBtnConfirmInactive";
      this.view.btnConfirm.setEnabled(false);
    } else{
      this.view.btnConfirm.skin = "sknBtnConfirm";
      this.view.btnConfirm.setEnabled(true);
    }
    this.view.lblAmount.text = formatManager.getCurrencySymbol(this.currencyCode) + " " + formatManager.formatAmount(this.newWithdrawalLimit); 

  },
  
  onMinusBtn: function() {
    var formatManager = applicationManager.getFormatUtilManager();
    this.newWithdrawalLimit -= this.stepAmount;
    if (this.newWithdrawalLimit <= this.minLimit){
      this.view.btnMinus.isVisible = false;
      this.newWithdrawalLimit = this.minLimit;

    } 
    if (this.newWithdrawalLimit < this.maxLimit){
     this.view.btnPlus.isVisible = true;
    }   
    if (this.newWithdrawalLimit === this.actualLimit){
      this.view.btnConfirm.skin = "sknBtnConfirmInactive";
      this.view.btnConfirm.setEnabled(false);
    } else{
      this.view.btnConfirm.skin = "sknBtnConfirm";
      this.view.btnConfirm.setEnabled(true);
    }
    this.view.lblAmount.text = formatManager.getCurrencySymbol(this.currencyCode) + " " + formatManager.formatAmount(this.newWithdrawalLimit); 
  }

 });
