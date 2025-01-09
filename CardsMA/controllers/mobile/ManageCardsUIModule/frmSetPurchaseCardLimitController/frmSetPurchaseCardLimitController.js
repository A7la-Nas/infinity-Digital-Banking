define({ 

 //Type your controller code here 
  cardId:"",
  currencySymbol: "",
  currencyCode: "",
  minLimit: 0,
  maxLimit: 5000,
  actualLimit: 0,
  newPurchaseLimit: 0,
  stepAmount: 50,
  
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
	var cardLimitDetails = navManager.getCustomInfo("frmSetPurchaseCardLimit");
    
    if(cardLimitDetails !== null && cardLimitDetails !== undefined){
      var purchaseMinLimit = + parseFloat(cardLimitDetails.purchaseMinLimit).toFixed(2);
      var purchaseMaxLimit = + parseFloat(cardLimitDetails.purchaseMaxLimit).toFixed(2);
      var purchaseLimit = + parseFloat(cardLimitDetails.purchaseLimit).toFixed(2);
      var purchaseStep = + parseFloat(cardLimitDetails.purchaseStepLimit).toFixed(2);
      this.minLimit = purchaseMinLimit > 0 ? purchaseMinLimit : this.minLimit;
      this.maxLimit = purchaseMaxLimit > 0 ? purchaseMaxLimit : this.maxLimit;
      this.actualLimit = purchaseLimit;
      this.stepAmount = purchaseStep > 0 ? purchaseStep : this.stepAmount;
      this.currencyCode = cardLimitDetails.currencyCode;
      this.cardId = cardLimitDetails.cardId;
	}
    
    this.newPurchaseLimit = this.actualLimit;
    this.view.lblAmount.text = formatManager.getCurrencySymbol(this.currencyCode) + " " + formatManager.formatAmount(this.newPurchaseLimit);   
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
//	var navManager = applicationManager.getNavigationManager();
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
//    navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
    manageCardsModule.presentationController.showCardsHome();
  },
  
  onConfirm: function() {
    var self = this;
    applicationManager.getPresentationUtility().showLoadingScreen();  
    var formatManager = applicationManager.getFormatUtilManager();
   // this.newPurchaseLimit = formatManager.formatAmount(self.newPurchaseLimit);
    this.newPurchaseLimit = formatManager.deFormatAmount(self.newPurchaseLimit);
    var inputParams = {
      "Action": "updatePurchaseLimit",
      "cardId": this.cardId,
      "purchaseLimit": this.newPurchaseLimit
    };
    
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.updatePurchaseLimit(inputParams);
  },
  
  onPlusBtn: function() {
    var formatManager = applicationManager.getFormatUtilManager();
    this.newPurchaseLimit += this.stepAmount;
    if (this.newPurchaseLimit >= this.maxLimit){
      this.view.btnPlus.isVisible = false;     
      this.newPurchaseLimit = this.maxLimit;
    } 
    if (this.newPurchaseLimit > this.minLimit){
      this.view.btnMinus.isVisible = true;
    }   
    if (this.newPurchaseLimit === this.actualLimit){
      this.view.btnConfirm.skin = "sknBtnConfirmInactive";
      this.view.btnConfirm.setEnabled(false);
    } else{
      this.view.btnConfirm.skin = "sknBtnConfirm";
      this.view.btnConfirm.setEnabled(true);
    }
    this.view.lblAmount.text = formatManager.getCurrencySymbol(this.currencyCode) + " " + formatManager.formatAmount(this.newPurchaseLimit);

  },

  onMinusBtn: function() {
    var formatManager = applicationManager.getFormatUtilManager();
    this.newPurchaseLimit -= this.stepAmount;
    if (this.newPurchaseLimit <= this.minLimit){
      this.view.btnMinus.isVisible = false;
      this.newPurchaseLimit = this.minLimit;
    } 
    if (this.newPurchaseLimit < this.maxLimit){
     this.view.btnPlus.isVisible = true;
    }   
    if (this.newPurchaseLimit === this.actualLimit){
      this.view.btnConfirm.skin = "sknBtnConfirmInactive";
      this.view.btnConfirm.setEnabled(false);
    } else{
      this.view.btnConfirm.skin = "sknBtnConfirm";
      this.view.btnConfirm.setEnabled(true);
    }
    this.view.lblAmount.text = formatManager.getCurrencySymbol(this.currencyCode) + " " + formatManager.formatAmount(this.newPurchaseLimit);
  }

 });