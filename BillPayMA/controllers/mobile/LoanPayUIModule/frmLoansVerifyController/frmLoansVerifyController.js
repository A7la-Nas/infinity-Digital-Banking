define({

  init: function() {
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },

  preShow: function() {
    var navManager = applicationManager.getNavigationManager();
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else {
      this.view.flxHeader.isVisible = false;
    }  
    this.initActions();
    this.setupUI();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  
  postShow: function() {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  cancelOnClick: function() {
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    loansMod.cancelCommon();
  },

  goBack: function() {
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },

  initActions: function() {
    this.view.btnContinue.onClick = function() {
      var navigationManager = applicationManager.getNavigationManager();
      navigationManager.navigateTo("frmLoansAcknowledgement");
    }
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.btntermsandconditions.onClick=this.btnTnCOnClick;
    this.view.flxCheckBox.onClick=this.toggleCheckBox;
    this.view.customHeader.flxBack.onClick = this.goBack;
    this.view.btnContinue.onClick = this.continueOnClick;
  },

  setupUI: function() {
    var transactionManager = applicationManager.getTransactionManager();
    var transactionObject = transactionManager.getTransactionObject();
    this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    this.view.imgTermsAccepted.src="tickmarkbox.png";
    var btntxt=kony.i18n.getLocalizedString("kony.mb.TermsAndConditions.Title");
    this.view.lblRichTxt.text= kony.i18n.getLocalizedString("kony.mb.externalAccounts.termnsConditionsChk")+"  "+"<a href=''>"+btntxt+"</a>";
    this.view. lblRichTxt.linkSkin= "sknBtn0095e428px";
    this.view.lblRichTxt.onClick=this.btnTnCOnClick;
    var forUtility = applicationManager.getFormatUtilManager();
    this.view.lblAmount.text = forUtility.formatAmountandAppendCurrencySymbol(transactionObject.payoffAmount, transactionObject.transactionCurrency);
    this.setSegmentData();
  },

  setSegmentData: function() {
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    var segData = loansMod.getVerifyScreenData();
    this.view.segDetails.widgetDataMap = this.getWidgetDataMap();
    this.view.segDetails.setData(segData);
  },

  getWidgetDataMap: function() {
    var map = {
      lblTitle:"property",
      lblDetails:"value1",
      lblExtras:"value2"
    };
    return map;
  },

  toggleCheckBox: function() {
      if(this.view.imgTermsAccepted.src==="tickmarkbox.png")
      {
        this.view.imgTermsAccepted.src="a.png";
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
      }
      else
      {
        this.view.imgTermsAccepted.src="tickmarkbox.png";
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
      }
  },

  btnTnCOnClick: function() {
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    loansMod.getTermsAndConditions();
  },

  bindGenericError  : function(errorMsg){
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj,errorMsg);
  },
  
  continueOnClick: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    loansMod.makeATransfer();
  }

});
