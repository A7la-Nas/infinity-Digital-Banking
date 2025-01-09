define({ 
  keypadBelowString: '',
  keypadAboveString: '',
  enteredBelowAmount: false,
  enteredAboveAmount: false,
  accountIsValid:true,
  /**
   * init is called when the form is loaded , initialisation happen here
   */
  init: function () {
    this.view.preShow = this.preShowForm;
    this.view.postShow = this.postShowForm;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "NO", this.view.id, this.navigateCustomBack);
    this.presenter = applicationManager.getModulesPresentationController({"moduleName" : "AccountSweepsUIModule", "appName" : "AccountSweepsMA"});
    this.formatUtilManager = applicationManager.getFormatUtilManager();
  },

  /***
   * navigateCustomBack is triggered native/ ios back event
   */
  navigateCustomBack: function() {
    this.resetVariables();
    this.presenter.commonFunctionForgoBack();
  },

  /***
   * native/ios cancel event
   */
  cancelOnClick: function () {
    this.resetVariables();
    if(this.presenter.flowType === "AccountSweep"){
    this.presenter.cancelCommon("frmAccountSweepsDashBoard");
    } else if(this.presenter.flowType === "AccountDetails"){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"friendlyName": "AccountUIModule/frmAccountDetails","appName": "ArrangementsMA"});
  }
  },
  /**
   * preShowForm is called when the form is pre loaded 
   */
  preShowForm: function(){
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else{
      this.view.flxHeader.isVisible = true;
    }
    this.initActions();
    this.setAccountsData();
  },
  
  /**
   * initActions has all form action declarations
   */
  initActions: function(){
    this.view.flxBelowKeypad.setVisibility(false);
    this.view.flxAboveKeypad.setVisibility(false);
    this.view.flxAmountError.setVisibility(false);
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.flxBelowCheckBox.onClick = this.setBelowAmountUI;
    this.view.flxAboveCheckBox.onClick = this.setAboveAmountUI;
    this.view.flxBelowClearImage.onClick = this.clearKeypad.bind(this,"Below");;
    this.view.flxAboveClearImage.onClick = this.clearKeypad.bind(this,"Above");;
    this.view.flxBelowAmountTextbox.onClick = this.enableKeyPad.bind(this,"Below");
    this.view.flxAboveAmountTextbox.onClick = this.enableKeyPad.bind(this, "Above");
    this.view.lblFromAccountValue.onTouchStart = this.accountNavigation.bind(this, "frmAccountSweepsPrimaryAccount");
    this.view.lblToAccountValue.onTouchStart = this.accountNavigation.bind(this, "frmAccountSweepsSecondaryAccount");
    this.view.btnTransfer.onClick = this.onContinueClick;
    this.view.flxbtnTransfer.setVisibility(true);
    this.view.flxbtnTransfer.bottom = "0%";
    this.view.flxReviewMain.bottom = "0%";
    this.view.flxBelowClearImage.setVisibility(false);
    this.view.flxAboveClearImage.setVisibility(false);
    this.view.lblBelowAmount.text = "";
    this.view.lblAboveAmount.text = "";
  },

  accountNavigation: function(formName) {
    this.presenter.setSweepsAttribute("belowSweepAmount", this.keypadBelowString);
    this.presenter.setSweepsAttribute("aboveSweepAmount", this.keypadAboveString);
    this.presenter.isEmptyNullUndefined(this.keypadAboveString) ? this.presenter.setSweepsAttribute("processedAboveSweepAmount", "") : this.presenter.setSweepsAttribute("processedAboveSweepAmount", this.view.lblAboveAmount.text);
    this.presenter.isEmptyNullUndefined(this.keypadBelowString) ? this.presenter.setSweepsAttribute("processedBelowSweepAmount", "") : this.presenter.setSweepsAttribute("processedBelowSweepAmount", this.view.lblAboveAmount.text);
    this.presenter.commonFunctionForNavigation(formName);
},
 
  enableKeyPad: function(keypadName) {
    if(keypadName === "Below"){
      this.view.flxBelowKeypad.setVisibility(true);
      this.view.flxAboveKeypad.setVisibility(false);
      this.view.flxbtnTransfer.bottom = "32%";
      this.view.flxReviewMain.bottom = "32%";
    }
    else if (keypadName === "Above"){
      this.view.flxBelowKeypad.setVisibility(false);
      this.view.flxAboveKeypad.setVisibility(true);
      this.view.flxbtnTransfer.bottom = "32%";
      this.view.flxReviewMain.bottom = "32%";
    } else{
      this.view.flxBelowKeypad.setVisibility(false);
      this.view.flxAboveKeypad.setVisibility(false);
      this.view.flxbtnTransfer.bottom = "0%";
      this.view.flxReviewMain.bottom = "0%";
    }
  },

  setKeypadChar: function (char) {
    if(this.enteredBelowAmount && this.view.flxBelowKeypad.isVisible) {
      this.keypadBelowString = this.keypadBelowString + char;
      this.view.flxBelowAmountTextbox.skin = "sknFlxRounded3e4f56Op10Border";
    } 
    if(this.enteredAboveAmount && this.view.flxAboveKeypad.isVisible) {
      this.keypadAboveString = this.keypadAboveString + char ;
      this.view.flxAboveAmountTextbox.skin = "sknFlxRounded3e4f56Op10Border";
    } 
    this.updateAmountValue();
  },
  
  clearKeypadChar: function () {
    if (this.keypadBelowString === '' || this.keypadBelowString === null) return;
    if (this.keypadAboveString === '' || this.keypadAboveString === null) return;
    (this.enteredBelowAmount && this.view.flxBelowKeypad.isVisible) ? this.keypadBelowString = this.keypadBelowString.substring(0, this.keypadBelowString.length - 1) : "";
    (this.enteredAboveAmount && this.view.flxAboveKeypad.isVisible) ? this.keypadAboveString = this.keypadAboveString.substring(0, this.keypadAboveString.length - 1) : "";
    this.updateAmountValue();
  },
  
  clearKeypad: function(clearKeypadOf){
    ((this.enteredAboveAmount && this.view.flxAboveKeypad.isVisible) && clearKeypadOf === "Above")? this.keypadAboveString = "" : this.keypadBelowString = "";
    this.updateAmountValue();
  },

  updateAmountValue: function () {
      if(this.view.imgBelowCheckBox.src === "checkbox2.png" && this.enteredBelowAmount){
        if(this.keypadBelowString.length<16)
        {
       this.view.lblBelowAmount.text = this.formatUtilManager.formatAmount(this.keypadBelowString);
       this.view.flxBelowClearImage.setVisibility(true);
        }
      }
      if(this.view.imgAboveCheckBox.src === "checkbox2.png" && this.enteredAboveAmount){
        if(this.keypadAboveString.length<16)
        {
        this.view.lblAboveAmount.text = this.formatUtilManager.formatAmount(this.keypadAboveString);
        this.view.flxAboveClearImage.setVisibility(true); 
        }
      }
      this.buttonVisibilityHandler();
    },
    
    buttonVisibilityHandler: function() {
      if ((Number(this.keypadBelowString) !== 0 || Number(this.keypadAboveString) !== 0)
         && (this.view.lblToAccountValue.text &&  this.view.lblToAccountValue.text !==kony.i18n.getLocalizedString("kony.mb.ChequeManagement.selectAnAccount"))
        ) {
        this.view.flxAmountError.setVisibility(false);
      	this.view.btnTransfer.skin = "sknBtn0095e4RoundedffffffSSP26px";
      	this.view.btnTransfer.setEnabled(true);
      }
      else {
        this.view.btnTransfer.setEnabled(false);
        this.view.btnTransfer.skin = "sknBtnOnBoardingInactive";
      }
    },

    setBelowAmountUI: function(){
      if(this.view.imgBelowCheckBox.src === "inactivecheckbox.png"){
        this.enableKeyPad("Below");
        this.enteredBelowAmount = true;
        this.view.imgBelowCheckBox.src = "checkbox2.png";
        this.view.lblBelowAmount.skin = "sknlbl424242semibold15px";
        this.view.flxBelowClearImage.setVisibility(false);
        this.view.flxBelowAmountTextbox.skin = "sknFlxRounded3e4f56Op10Border";
        this.view.flxBelowAmountTextbox.setEnabled(true);
      }
      else{
        this.enableKeyPad();
        this.enteredBelowAmount = false;
        this.keypadBelowString = "";
        this.view.lblBelowAmount.text = this.formatUtilManager.formatAmount(this.keypadBelowString);
        if(this.keypadAboveString === "") {
          this.view.btnTransfer.skin = "sknBtnOnBoardingInactive";
          this.view.btnTransfer.setEnabled(false);
        }
        this.view.imgBelowCheckBox.src = "inactivecheckbox.png";
        this.view.flxBelowClearImage.setVisibility(false);
        this.view.lblBelowAmount.skin = "sknLblBga0a0a0SourceSansPro32pxTab";
        this.view.flxBelowAmountTextbox.skin = "sknflxbgf7f7f7op100Bordere3e3e3radius2px";
        this.view.flxBelowAmountTextbox.setEnabled(false);
      }
    },

    setAboveAmountUI: function(){
      if(this.view.imgAboveCheckBox.src === "inactivecheckbox.png"){
        this.enableKeyPad("Above");
        this.enteredAboveAmount = true;
        this.view.imgAboveCheckBox.src = "checkbox2.png";
        this.view.flxAboveClearImage.setVisibility(false);
        this.view.lblAboveAmount.skin = "sknlbl424242semibold15px";
        this.view.flxAboveAmountTextbox.skin = "sknFlxRounded3e4f56Op10Border";
        this.view.flxAboveAmountTextbox.setEnabled(true);
      }
      else{
        this.enableKeyPad();
        this.enteredAboveAmount = false;
        this.keypadAboveString = "";
        this.view.lblAboveAmount.text = this.formatUtilManager.formatAmount(this.keypadAboveString);
        if(this.keypadBelowString === "") {
          this.view.btnTransfer.skin = "sknBtnOnBoardingInactive";
          this.view.btnTransfer.setEnabled(false);
        }
        this.view.imgAboveCheckBox.src = "inactivecheckbox.png";
        this.view.flxAboveClearImage.setVisibility(false);
        this.view.lblAboveAmount.skin = "sknLblBga0a0a0SourceSansPro32pxTab";
        this.view.flxAboveAmountTextbox.skin = "sknflxbgf7f7f7op100Bordere3e3e3radius2px";
        this.view.flxAboveAmountTextbox.setEnabled(false);
      }
    },

    setAccountsData: function() {
      let navMan = applicationManager.getNavigationManager();
      let sweepflow = applicationManager.getNavigationManager().getEntryPoint("AccountSweepsFlow");
      if(sweepflow === "Create"){
       this.view.lblFromAccountValue.setEnabled(true);
       this.view.lblFromAccountValue.skin = "sknMMBlueLabel";
       this.view.flxFromImage.setVisibility(true);
       this.view.lblFromAccountValue.right = "50dp";
      }
      if(sweepflow === "Edit" || sweepflow === "CreateFromAccountDetails"){
       this.view.lblFromAccountValue.setEnabled(false);
       this.view.lblFromAccountValue.skin = "sknLbl424242SSP93prSansRegularPro";
       this.view.flxFromImage.setVisibility(false);
       this.view.lblFromAccountValue.right = "20dp";
      }
      this.setDataonWidgets();
      this.updateAmountValue();
    },
    
    setDataonWidgets: function() {
      let sweepsObj = this.presenter.getAccountSweepsObject();
       let sweepflow = applicationManager.getNavigationManager().getEntryPoint("AccountSweepsFlow");
      if(sweepflow === "Create"){
        this.view.title = kony.i18n.getLocalizedString("i18n.accountsweeps.createNewSweep")
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.accountsweeps.createNewSweep")
      let allSweeps = applicationManager.getNavigationManager().getCustomInfo("AllSweeps");
      var x=[];
      for(var i in allSweeps)
        x.push(allSweeps[i].primaryAccountNumber)
        if(x.indexOf(sweepsObj.primaryAccountNumber)!=-1)
        {
          this.accountIsValid=false
          this.view.flxAmountError.setVisibility(true);
          this.view.lblError.text =kony.i18n.getLocalizedString("i18n.accountSweeps.sweepAlreadyExists");
          this.view.btnTransfer.setEnabled(false);
          this.view.btnTransfer.skin = "sknBtnOnBoardingInactive";
        }
      else
      {
        this.accountIsValid=true
        this.view.flxAmountError.setVisibility(false);
        this.view.btnTransfer.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnTransfer.setEnabled(true);

      }
      }
      else
      {
        if(sweepflow === "CreateFromAccountDetails") {
        this.view.title = kony.i18n.getLocalizedString("i18n.accountsweeps.createNewSweep")
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.accountsweeps.createNewSweep")
       } else {
        this.view.title = kony.i18n.getLocalizedString("i18n.accountSweeps.editAccountSweep")
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.accountSweeps.editAccountSweep")
       }
      }
      this.view.lblFromAccountValue.text = sweepsObj.processedPrimaryName ? sweepsObj.processedPrimaryName :"";
      if(this.presenter.flowType === "AccountDetails" && kony.application.getPreviousForm().id == 'frmAccountDetails'){
         this.view.lblToAccountValue.text = kony.i18n.getLocalizedString("kony.mb.ChequeManagement.selectAnAccount");
         this.view.lblBelowAmount.text = "0.00";
         this.view.lblAboveAmount.text = "0.00";
         this.view.imgAboveCheckBox.src = "inactivecheckbox.png";
         this.view.imgBelowCheckBox.src = "inactivecheckbox.png";
         this.keypadBelowString = "";
         this.keypadAboveString = "";
         this.view.flxBelowAmountTextbox.setEnabled(false);
         this.view.flxAboveAmountTextbox.setEnabled(false);
      } else {
      this.view.lblToAccountValue.text = sweepsObj.processedSecondaryName ? sweepsObj.processedSecondaryName : kony.i18n.getLocalizedString("kony.mb.ChequeManagement.selectAnAccount");
      this.view.lblBelowAmount.text = sweepsObj.processedBelowSweepAmount ? sweepsObj.processedBelowSweepAmount: this.formatUtilManager.formatAmount(this.keypadBelowString);
      this.view.lblAboveAmount.text = sweepsObj.processedAboveSweepAmount ? sweepsObj.processedAboveSweepAmount: this.formatUtilManager.formatAmount(this.keypadAboveString);
      this.view.imgAboveCheckBox.src =  sweepsObj.aboveSweepAmount ? "checkbox2.png" : "inactivecheckbox.png";
      this.view.imgBelowCheckBox.src =  sweepsObj.belowSweepAmount? "checkbox2.png" : "inactivecheckbox.png";
      sweepsObj.belowSweepAmount ? this.keypadBelowString = sweepsObj.belowSweepAmount : this.keypadBelowString = "";
      sweepsObj.aboveSweepAmount ? this.keypadAboveString = sweepsObj.aboveSweepAmount : this.keypadAboveString = "";
      sweepsObj.processedBelowSweepAmount ? this.view.flxBelowAmountTextbox.setEnabled(true) : this.view.flxBelowAmountTextbox.setEnabled(false);
      sweepsObj.processedAboveSweepAmount  ? this.view.flxAboveAmountTextbox.setEnabled(true) : this.view.flxAboveAmountTextbox.setEnabled(false);     
      }
      this.view.lblAboveCurrency.text = sweepsObj.currencyCode ? this.formatUtilManager.getCurrencySymbol(sweepsObj.currencyCode) : applicationManager.getConfigurationManager().getCurrencyCode();
      this.view.lblBelowCurrency.text = sweepsObj.currencyCode ? this.formatUtilManager.getCurrencySymbol(sweepsObj.currencyCode) :applicationManager.getConfigurationManager().getCurrencyCode(); 
      if(this.view.imgAboveCheckBox.src === "checkbox2.png") {
        this.enteredAboveAmount = true;
      }
      if(this.view.imgBelowCheckBox.src === "checkbox2.png") {
        this.enteredBelowAmount = true;
      }
      if(!this.view.imgBelowCheckBox.src === "checkbox2.png" && !this.view.imgAboveCheckBox.src === "checkbox2.png"){
        this.enteredAboveAmount = false;
        this.enteredBelowAmount = false;
      }
      this.setAboveAmountTextBox(sweepsObj);
      this.setBelowAmountTextBox(sweepsObj);
    },

    setAboveAmountTextBox: function(sweepsObj) {
      if(sweepsObj.aboveSweepAmount) {
        this.view.lblAboveAmount.skin = "sknlbl424242semibold15px";
        this.view.flxAboveAmountTextbox.skin = "sknFlxRounded3e4f56Op10Border";
        this.view.flxAboveAmountTextbox.setEnabled(true);
        this.view.flxbtnTransfer.setVisibility(true);
      } else {
        this.view.lblAboveAmount.skin = "sknLblBga0a0a0SourceSansPro32pxTab";
        this.view.flxAboveAmountTextbox.skin = "sknflxbgf7f7f7op100Bordere3e3e3radius2px";
        this.view.flxAboveAmountTextbox.setEnabled(false);
      }
    },

    setBelowAmountTextBox: function(sweepsObj) {
      if(sweepsObj.belowSweepAmount) {
        this.view.lblBelowAmount.skin = "sknlbl424242semibold15px";
        this.view.flxBelowAmountTextbox.skin = "sknFlxRounded3e4f56Op10Border";
        this.view.flxBelowAmountTextbox.setEnabled(true);
        this.view.flxbtnTransfer.setVisibility(true);
      } else {
        this.view.lblBelowAmount.skin = "sknLblBga0a0a0SourceSansPro32pxTab";
        this.view.flxBelowAmountTextbox.skin = "sknflxbgf7f7f7op100Bordere3e3e3radius2px";
        this.view.flxBelowAmountTextbox.setEnabled(false);
      }
    },

    onContinueClick: function(){
         if (!this.accountIsValid) {
        this.view.flxAmountError.setVisibility(true);
        this.view.flxAboveAmountTextbox.skin = "sknborderff0000error";
        this.view.lblError.text = kony.i18n.getLocalizedString("i18n.accountSweeps.sweepAlreadyExists");
        this.view.btnTransfer.setEnabled(false);
        this.view.btnTransfer.skin = "sknBtnOnBoardingInactive";
        return;
      }
      if(this.view.imgAboveCheckBox.src === "checkbox2.png" && this.view.imgBelowCheckBox.src === "checkbox2.png" ){
        this.presenter.setSweepsAttribute("sweepType",kony.i18n.getLocalizedString("i18n.accountsweeps.both")); 
        if(this.keypadBelowString === "" || this.keypadAboveString ===""){
          this.view.flxAmountError.setVisibility(true);
          this.view.lblError.text = kony.i18n.getLocalizedString("i18n.accountsweeps.pleaseEnterAmount"); 
          this.view.btnTransfer.setEnabled(false);
          this.view.btnTransfer.skin = "sknBtnOnBoardingInactive";
          if(this.keypadBelowString === ""){
            this.view.flxBelowAmountTextbox.skin = "sknborderff0000error";
          }
          else if(this.keypadAboveString === ""){
            this.view.flxAboveAmountTextbox.skin = "sknborderff0000error";
          }
          return;
        }
        if (Number(this.keypadBelowString) > Number(this.keypadAboveString)) {
          this.view.flxAmountError.setVisibility(true);
          this.view.flxAboveAmountTextbox.skin = "sknborderff0000error";
          this.view.lblError.text = kony.i18n.getLocalizedString("i18n.accountSweeps.aboveBelowAmountValidation");
          this.view.btnTransfer.setEnabled(false);
          this.view.btnTransfer.skin = "sknBtnOnBoardingInactive";
          return;
        }
      }
      else if(this.view.imgAboveCheckBox.src === "checkbox2.png"){
        this.presenter.setSweepsAttribute("sweepType",kony.i18n.getLocalizedString("i18n.signatory.above")); 
      }
      else{
        this.presenter.setSweepsAttribute("sweepType",kony.i18n.getLocalizedString("i18n.accountsweeps.below")); 
      }
      let sweepsObj = this.presenter.getAccountSweepsObject();
      !sweepsObj.frequency ?  this.presenter.setSweepsAttribute("frequency", kony.i18n.getLocalizedString("i18n.Transfers.Daily")): "";
      !sweepsObj.endDate ?  this.presenter.setSweepsAttribute("endDate",""): "";
      !sweepsObj.endDate ? this.presenter.setSweepsAttribute("formattedEndDate", "") : "";
      this.presenter.setSweepsAttribute("processedBelowSweepAmount", this.view.lblBelowAmount.text);
      this.presenter.setSweepsAttribute("processedAboveSweepAmount", this.view.lblAboveAmount.text);
      this.presenter.setSweepsAttribute("belowSweepAmount", this.keypadBelowString);
      this.presenter.setSweepsAttribute("aboveSweepAmount", this.keypadAboveString);
      this.presenter.commonFunctionForNavigation("frmCreateVerifyDetails");
	  if(this.presenter.flowType === "AccountDetails"){
        this.presenter.startDate = sweepsObj.startDate;
        this.presenter.formattedNewStartDate = sweepsObj.formattedStartDate;
      }
      this.resetVariables();
    },

    resetVariables: function() {
      this.keypadAboveString ="";
      this.keypadBelowString = "";
      this.enteredBelowAmount = false;
      this.enteredAboveAmount = false;
	  this.accountIsValid = true;
    }
});