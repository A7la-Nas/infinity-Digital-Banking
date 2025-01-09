define({
    keypadString: '',
    timerCounter: 0,
  locale : kony.i18n.getCurrentLocale(),
//  locale : "en",
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
 },
  preShow: function () {
        this.view.flxPopup.setVisibility(false);
		this.locale = kony.i18n.getCurrentLocale();
        this.initActions();
        this.renderTitleBar();
		this.setDummyText();
        this.handleData();
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.ForgotLoginCredentials");
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.title=kony.i18n.getLocalizedString("kony.mb.ForgotLoginCredentials");
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
   	    var currentForm=navManager.getCurrentForm();
   		applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
  renderTitleBar :function(){
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if(!isIphone){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
  },
   handleData : function(){
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        var forgotObj = authModule.presentationController.getForgotObjectForView();
        var dateOfBirthInLocaleFormat = "";
        var dateOfBirthInBackendFormat = forgotObj.dateOfBirth;
        if (dateOfBirthInBackendFormat) {
            dateOfBirthInLocaleFormat = authModule.presentationController.getLocaleDOB(dateOfBirthInBackendFormat);
        } else {
            dateOfBirthInLocaleFormat = "";
        }
        if (dateOfBirthInLocaleFormat !== null && dateOfBirthInLocaleFormat !== "" && dateOfBirthInLocaleFormat !== undefined) {
            this.view.btnVerify.skin = "sknBtn055BAF26px";
            this.view.btnVerify.setEnabled(true);
            this.keypadString = dateOfBirthInLocaleFormat;
            this.updateInputBullets();
        }
        else {
            this.view.btnVerify.skin = "sknBtna0a0a0SSPReg26px";
            this.view.btnVerify.setEnabled(false);
            this.keypadString = '';
            this.updateInputBullets();
        }
    },
  initActions:function()
  {
      this.view.btnVerify.onClick=this.validateDOB;
      this.view.customHeader.flxBack.onClick=this.goBack;
      this.view.customHeader.btnRight.onClick = this.onCancel;
  },
    //KEYPAD OPS:
    updateInputBullets: function () {
        var scope = this, dummyString;
       if(this.locale=="en_US" || this.locale=="en"){
          dummyString = 'MM/DD/YYYY';
        }
        else if(this.locale=="en_GB" || this.locale === "fr_FR"  || this.locale === "es_ES" || this.locale==="ar_AE"){
          dummyString = 'DD/MM/YYYY';
        }
         else if(this.locale=="de_DE"){
          dummyString = 'DD.MM.YYYY';
        }
        else if(this.locale=="sv_SE"){
          dummyString = 'YYYY-DD-MM';
        }
        else{
          dummyString = 'MM/DD/YYYY';
        }
        var widgets = this.view["flxInputDOB"].widgets();
        for (var i = 0; i < this.keypadString.length; i++) {
            widgets[i].skin = "sknLbl979797SSP60px";
            widgets[i].text = this.keypadString[i];
        }
        for (var i = this.keypadString.length; i < widgets.length; i++) {
            widgets[i].skin = "sknLble3e3e3SSP60px";
            widgets[i].text = dummyString[i];
        }
       if(this.keypadString.length !== 10)
          {
            this.view.btnVerify.skin = "sknBtna0a0a0SSPReg26px";
    		this.view.btnVerify.setEnabled(false);
      	  }
    	else
      	 {
       	   this.view.btnVerify.skin = "sknBtn055BAF26px";
       	   this.view.btnVerify.setEnabled(true);
      	 }
        this.view.forceLayout();
    },
    setKeypadChar: function (char) {
        if (this.keypadString.length === 10) return;
        this.keypadString = this.keypadString + char;
      if(this.locale=="en_US" || this.locale=="en" || this.locale=="en_GB" || this.locale === "fr_FR" || this.locale === "es_ES" || this.locale==="ar_AE"){
        if (this.keypadString.length === 2 || this.keypadString.length === 5) {
          this.keypadString = this.keypadString + '/';
        }
      }
      else if(this.locale=="de_DE"){
        if (this.keypadString.length === 2 || this.keypadString.length === 5) {
          this.keypadString = this.keypadString + '.';
        }
      }
       else if(this.locale=="sv_SE"){
        if (this.keypadString.length === 4 || this.keypadString.length === 7) {
          this.keypadString = this.keypadString + '-';
        }
      }
        this.updateInputBullets();
    },
    clearKeypadChar: function () {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
            this.updateInputBullets();
        }
        if (this.keypadString.length !== 0) {
          if (this.keypadString[this.keypadString.length - 1] === '/' || this.keypadString[this.keypadString.length - 1] === '.' || this.keypadString[this.keypadString.length - 1] === '-') {
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
          }
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            this.updateInputBullets();
        }
    },
  setDummyText : function(){
    var configManager = applicationManager.getConfigurationManager();
    var dummy = configManager.getCalendarDateFormat();
    var widgets = this.view["flxInputDOB"].widgets();
    for (var i = 0; i < this.keypadString.length; i++) {
      widgets[i].skin = "sknLbl979797SSP60px";
      widgets[i].text = dummy[i];
    }
  },
  validateDOB:function() {
    var dob  = this.keypadString;
    if (dob.indexOf(".") != -1) {
        dob = dob.replace(".", "/").replace(".", "/");
    } else if (dob.indexOf("-") != -1) {
        dob = dob.replace(/-/g, "/");
    }
    if (dob.length < 10) {
        this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.validDOB"));
    } else {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        const navManager = applicationManager.getNavigationManager();
        let previousData = navManager.getCustomInfo("frmForgot");
        previousData.dob = dob;        
        navManager.setCustomInfo("frmForgot", previousData);
        authModule.presentationController.verifyDOB(previousData);
    }
  },
    cleardobfields:function()
  {
    this.setDummyText();
    this.view.btnVerify.skin = "sknBtna0a0a0SSPReg26px";
    this.view.btnVerify.setEnabled(false);
    this.keypadString = '';
    this.updateInputBullets();
  },
  bindViewError : function(msg)
  {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
    var navManager = applicationManager.getNavigationManager();
     let previousData = navManager.getCustomInfo("frmForgot");
     previousData.dob = "";  
    navManager.setCustomInfo("frmForgot", previousData);
    this.cleardobfields();
  },
  
  bindVerifyError: function() {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
     let previousData = navManager.getCustomInfo("frmForgot");
     previousData.dob = "";  
    navManager.setCustomInfo("frmForgot", previousData);
    navManager.navigateTo("frmForgotEnterEmailID");
  },
  goBack:function()
  {
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  onCancel : function()
  {
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmForgot", undefined);
    navManager.clearStack();
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authModule.presentationController.navigateToLogin();
  }
});