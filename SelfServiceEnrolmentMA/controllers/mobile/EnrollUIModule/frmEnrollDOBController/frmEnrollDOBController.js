define({
  timerCounter: 0,
  keypadString: '',
  locale : kony.i18n.getCurrentLocale(),
 // locale : "sv",
  init : function(){
    var FormValidator = require("FormValidatorManager")
	this.fv = new FormValidator(1);
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function () {
    this.view.customHeaderPersonalInfo.lblLocateUs.text = kony.i18n.getLocalizedString("Kony.mb.userdetail.dob");
    //this.view.customHeaderPersonalInfo.btnRight.text = "Cancel";
	this.locale = kony.i18n.getCurrentLocale();
    if(this.locale=="ar_AE"){
      this.view.lblMonthOne.text="D";
      this.view.lblMonthTwo.text="D";
      this.view.lblDayOne.text="M";
      this.view.lblDayTwo.text="M";
    }
    this.setDummyText();
	var dateOfBirthInLocaleFormat = "";
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    dateOfBirthInBackendFormat = enrollMod.presentationController.getEnrollDOB();
    if (dateOfBirthInBackendFormat){
        dateOfBirthInLocaleFormat = enrollMod.presentationController.getLocaleDOB(dateOfBirthInBackendFormat);
	}
    else {
        dateOfBirthInLocaleFormat = "";
    }
    if(dateOfBirthInLocaleFormat !== null && dateOfBirthInLocaleFormat !== "" && dateOfBirthInLocaleFormat !== undefined){
      this.view.btnVerifyDOB.skin = "sknBtn0095e4RoundedffffffSSP26px";
      this.view.btnVerifyDOB.setEnabled(true);
      this.keypadString = dateOfBirthInLocaleFormat;
      this.updateInputBullets();
    }
    else{
      this.view.btnVerifyDOB.skin = "sknBtnOnBoardingInactive";
      this.view.btnVerifyDOB.setEnabled(false);
      this.keypadString = '';
      this.updateInputBullets();
    }
    this.setFlowActions();
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeaderPersonalInfo.isVisible = true;
    }
    else{
      this.view.flxHeaderPersonalInfo.isVisible = false;
    }
    this.fv.submissionView(this.view.btnVerifyDOB);
    this.fv.checkDOBLength(this.keypadString);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    //applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
   setDummyText : function(){
    var configManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ConfigurationManager","appName":"CommonsMA"}).businessController;
    var dummy = 'MM/DD/YYYY';//configManager.getCalendarDateFormat();
    var widgets = this.view["flxDOB"].widgets();
    for (var i = 0; i < this.keypadString.length; i++) {
      widgets[i].skin = "sknLbl979797SSP60px";
      widgets[i].text = dummy[i];
    }
  },
  setFlowActions : function(){
    var scope = this;
    this.view.btnVerifyDOB.onClick = function(){
      scope.validateDOB();
    };
    this.view.customHeaderPersonalInfo.flxBack.onClick = function(){
      scope.navToLastName();
    };
    this.view.customHeaderPersonalInfo.btnRight.onClick = function(){
      scope.onClickCancel();
    };
  },
  navToSSN : function(){
      var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
      enrollMod.presentationController.commonFunctionForNavigation("frmEnrollSSn");
  },
  navToLastName : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  onClickCancel : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.resetEnrollObj();
  },
  setKeypadChar: function (char) {
    this.char = char.toString();
    if (this.keypadString.length === 10) return;
    this.keypadString = this.keypadString + char;
     if(this.locale=="en_US" || this.locale=="en" || this.locale=="en_GB" || this.locale === "fr_FR" || this.locale === "es_ES" || this.locale === "ar_AE"){
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
    this.fv.checkDOBLength(this.keypadString);
    //     if(this.view.lblYearFour.text !== "" && this.view.lblYearFour.text !== "_")
    //       this.view.btnVerifyDOB.skin = "sknBtn0095e4RoundedffffffSSP26px";
    //    else
    //     this.view.btnVerifyDOB.skin = "sknBtnOnBoardingInactive";
  },
  clearKeypadChar: function () {
    this.char = "";
    if (this.keypadString.length === 1) {
      this.keypadString = '';
      this.updateInputBullets();
    }
    if (this.keypadString.length !== 0) {
      if (this.keypadString[this.keypadString.length - 1] === '/' || this.keypadString[this.keypadString.length - 1] === '.' ) {
        this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
      }
      this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
      this.updateInputBullets();
    }
    this.fv.checkDOBLength(this.keypadString);
  },
  updateInputBullets: function () {
    var scope = this;
    var scope = this, dummyString;
        if(this.locale=="en_US" || this.locale=="en"){
          dummyString = 'MM/DD/YYYY';
        }
        else if(this.locale=="en_GB" || this.locale === "fr_FR"  || this.locale === "es_ES"){
          dummyString = 'DD/MM/YYYY';
        }
         else if(this.locale=="de_DE"){
          dummyString = 'DD.MM.YYYY';
        }
        else if(this.locale=="sv_SE"){
          dummyString = 'YYYY-DD-MM';
        }
    	else if(this.locale=="ar_AE"){
         // dummyString = "DD/MM/YYYY";
         dummyString = 'DD/MM/YYYY';
        }
        else{
          dummyString = 'MM/DD/YYYY';
        }
    //var dummyString = 'MM/DD/YYYY';
    // if (this.keypadString.length === 3 || this.keypadString.length === 6) {
    //   this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
    // } else if (this.keypadString.length === 2 || this.keypadString.length === 5) {
    //   this.keypadString = this.keypadString + '/';
    // }
    var widgets = this.view["flxDOB"].widgets();
   if(this.locale!=="ar_AE"){
      for (var i = 0; i < this.keypadString.length; i++) {
        widgets[i].skin = "sknLbl979797SSP60px";
        widgets[i].text = this.keypadString[i];
      }
      for (var i = this.keypadString.length; i < widgets.length; i++) {
        widgets[i].skin = "sknLble3e3e3SSP60px";
        widgets[i].text = dummyString[i];
      }
    }
    else{
      if(this.char === ""){
        for (var i = 0; i < this.keypadString.length; i++) {
          widgets[i].skin = "sknLbl979797SSP60px";
          widgets[i].text = this.keypadString[i];
        }
        for (var i = this.keypadString.length; i < widgets.length; i++) {
          widgets[i].skin = "sknLble3e3e3SSP60px";
          widgets[i].text = dummyString[i];
        }
      }
      else{
        if(this.keypadString.length === 1)
        {
          this.view.lblMonthTwo.skin = "sknLbl979797SSP60px";
          this.view.lblMonthTwo.text = this.char;
        }
        if(this.keypadString.length === 3)
        {
          this.view.lblMonthOne.skin = "sknLbl979797SSP60px";
          this.view.lblMonthOne.text = this.char;
          this.view.lblSlashMonth.skin = "sknLbl979797SSP60px";
          this.view.lblSlashMonth.text = "/";
        }
        if(this.keypadString.length === 4)
        {
          this.view.lblDayTwo.skin = "sknLbl979797SSP60px";
          this.view.lblDayTwo.text = this.char;
        }
        if(this.keypadString.length === 6)
        {
          this.view.lblDayOne.skin = "sknLbl979797SSP60px";
          this.view.lblDayOne.text = this.char;
          this.view.lblSlashDay.skin = "sknLbl979797SSP60px";
          this.view.lblSlashDay.text = "/";
        }
        if(this.keypadString.length === 7)
        {
          this.view.lblYearFour.skin = "sknLbl979797SSP60px";
          this.view.lblYearFour.text = this.char;
        }
        if(this.keypadString.length === 8)
        {
          this.view.lblYearThree.skin = "sknLbl979797SSP60px";
          this.view.lblYearThree.text = this.char;
        }
        if(this.keypadString.length === 9)
        {
          this.view.lblYearTwo.skin = "sknLbl979797SSP60px";
          this.view.lblYearTwo.text = this.char;
        }
        if(this.keypadString.length === 10)
        {
          this.view.lblYearOne.skin = "sknLbl979797SSP60px";
          this.view.lblYearOne.text = this.char;
        }
      }
    }
    
    this.view.forceLayout();
  },
  validateAndNavigate : function(){
    var  date = this.keypadString;
    if(date.length === 10)
    {
      var NUOMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NewUserModule");
      //to be replaced 4315
      NUOMod.presentationController.validateDOBAndNavigate(date);
    }
    else
    {
      this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.validDOB"));
    }
  },
  assignDataToForm : function(newUserJSON){
    var scope = this;
    var dob = (newUserJSON.dateOfBirth && newUserJSON.dateOfBirth !== "" && newUserJSON.dateOfBirth !== null)?newUserJSON.dateOfBirth:"";
    if(dob!==""){
      dob = dob.substr(0,10);
      dob = dob.split("-");
      var dobText = dob[1]+dob[2]+dob[0];
      for(var i=0;i<dobText.length;i++)
      {
        this.setKeypadChar(dobText.charAt(i));
      }
    }
    else
    {
      this.keypadString = "";
      this.updateInputBullets();
    }
    this.view.forceLayout();
  },
  //Development
  /**
  * validates Date of Birth
  */
  validateDOB: function() {
        var dob = this.keypadString;
    	var forUtility = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"FormatUtilManager","appName":"CommonsMA"}).businessController;
        if(dob.indexOf(".")!= -1){
            dob = dob.replace(".", "/").replace(".","/");
        }
        else if(dob.indexOf("-")!=-1){
            dob = dob.replace(/-/g, "/");
        }
        if (dob.length < 10) {
            this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.validDOB"));
        } else {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
            var userDOB = forUtility.getDateForFormatting(dob);
      		var dateOfBirth = forUtility.getFormatedDateString(new Date(userDOB),forUtility.getBackendDateFormat());
          	var params = {
                  "dateOfBirth":dateOfBirth,
                  "ssn":enrollMod.presentationController.getEnrollSSN(),
                  "userlastname":enrollMod.presentationController.getEnrollLastName(),
                };
          if ( enrollMod.presentationController.validateDOB(dob))
               enrollMod.presentationController.commonFunctionForNavigation("frmEnroll");
              //enrollMod.presentationController.checkUserEnrolled(params);
      	}
    },
  /**
  * Shows Toast Message with red skin
  */
  bindViewError : function(msg)
  {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  },
});