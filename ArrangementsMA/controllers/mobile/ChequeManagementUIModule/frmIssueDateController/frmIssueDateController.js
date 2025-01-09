define({
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
   this.view.customCalendar.selectedDate = '';
    this.initActions();
  },
  backOnClick: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            var navManager = applicationManager.getNavigationManager();
            var currentForm = navManager.getCurrentForm();
            loggerManager.log("#### start : " + currentForm + " :  backOnClick  ####");
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"AccountUIModule"});
            manageCardsModule.presentationController.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmChequeNumber"});
        } catch (exc) {
            loggerManager.log("#### in catch " + exc + " ####");
        }
    }, 
  preShow: function() {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.view.customHeader.btnRight.onClick =this.cancelOnClick;
    this.view.btnSkip.onClick =this.skipOnClick;
    this.view.customHeader.flxBack.onClick = this.backOnClick;
//    this.view.customHeader.flxBack.onClick = function(){
//    var commonBack = applicationManager.getModulesPresentationController("ChequeManagementModule");
//    commonBack.commonFunctionForgoBack();
//    };
    this.view.customCalendar.preShow();
    if (this.view.customCalendar.selectedDate === '') {
      this.view.btnContinue.setEnabled(false);
    } else {
      this.view.btnContinue.setEnabled(true);
    }
    this.view.customCalendar.firstEnabledDate = "";
    this.view.customCalendar.selectedDate = '';
    // this.view.customCalendar.isCalendarEndDateFrm = true;
    this.view.customCalendar.triggerContinueAction = false;
    //this.view.customCalendar.isOnceTransaction = false;
    this.view.customCalendar.updateDateBullets();
    //  this.view.customCalendar.unHighlightAllDays();
//    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementModule");
 //   var startdate = moneyMovementModule.getTransObject();
    var chequeManagementModule = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    var startdate = chequeManagementModule.getTransObject();
    var formattedDate = this.getStartDate(startdate.scheduledDate);
    this.view.customCalendar.setFirstEnabledDate(formattedDate);
    //var enddate = this.getStartDate(startdate.tomorrowsDate);
    //this.view.customCalendar.setFirstEnabledDate(enddate);
    var enddate = this.getTodaysDate(startdate.todaysDate);
    this.view.customCalendar.setLastEnabledDate(enddate);
    if (startdate.checkDateOfIssue !== null && startdate.checkDateOfIssue !== undefined && startdate.checkDateOfIssue !== "") {
        this.setDateToCalendar(startdate.checkDateOfIssue);
    } else if (startdate.frequencyEndDate !== null && startdate.frequencyEndDate !== undefined && startdate.frequencyEndDate !== "") {
        this.setDateToCalendar(startdate.frequencyEndDate);
    } else {
      var today = this.getTomorrowsDate(startdate.tomorrowsDate);
      this.setDateToCalendar(today);
    }
     this.view.customCalendar.resetCal();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    this.updateUI();
  },
  updateUI:function(){
    var transObj = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    var objData=transObj.getTransObject();
    if(objData.checkDateOfIssue===null || this.getPreviousForm() === "frmChequeNumber"){
      this.view.lblDayOne.text="M";
      this.view.lblDayTwo.text="M";
      this.view.lblMonthOne.text="D";
      this.view.lblMonthTwo.text="D";
      this.view.lblYearOne.text="Y";
      this.view.lblYearTwo.text="Y";
      this.view.lblYearThree.text="Y";
      this.view.lblYearFour.text="Y";
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
    }},
  initActions: function() {
    this.view.btnContinue.onClick = this.continueAction;
  },
  setDateToCalendar: function(dateString) {
    var forUtility = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    var date = dateString;
    var str = date.toString();
    var year = str.substring(0,4);
    var month = str.substring(4,6);
    var day= str.substring(6,8);       
    date = month + "/" + day + "/" + year;
    var frequencyEndDate = forUtility.getDateObjectFromCalendarString(date, configManager.getCalendarDateFormat());
    frequencyEndDate = forUtility.getFormattedSelectedDate(frequencyEndDate);
    this.view.customCalendar.setSelectedDate(frequencyEndDate);
  },
skipOnClick: function(){
  this.view.customCalendar.selectedDate = '';
  var selectedDate= "";
    var issueDate = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    issueDate.setIssueDate(selectedDate);
    var navMan = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    navMan.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmAmount"});
},
  cancelOnClick: function() {
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.commonCancel();
  },
  continueAction: function() {
var dayOne = this.view.lblDayOne.text;
var dayTwo = this.view.lblDayTwo.text;
var stashDay = this.view.lblSlashDay.text;
var monthOne = this.view.lblMonthOne.text;
var monthTwo = this.view.lblMonthTwo.text;
var stashMonth = this.view.lblSlashMonth.text;
var yearOne = this.view.lblYearOne.text;
var yearTwo = this.view.lblYearTwo.text;
var yearThree = this.view.lblYearThree.text;
var yearFour = this.view.lblYearFour.text;
// var selectedDate= dayOne+dayTwo+stashDay+monthOne+monthTwo+stashMonth+yearOne+yearTwo+yearThree+yearFour;
    scope_ChequePresentationController.chequeIssuedDate= dayOne+dayTwo+stashDay+monthOne+monthTwo+stashMonth+yearOne+yearTwo+yearThree+yearFour;
    var selectedDate=yearOne+yearTwo+yearThree+yearFour+dayOne+dayTwo+monthOne+monthTwo;
    var issueDate = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    issueDate.setIssueDate(selectedDate);
    var navMan = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
                if( scope_ChequePresentationController.isReview===true){
         navMan.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmSCReview"});
    }else{
             navMan.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmAmount"});
            }
  },
  getStartDate: function(scheduledDate) {
    // var dateObject = new Date(scheduledDate);
    if(scheduledDate !== null){
      var dateObject = new Date(scheduledDate);
    }
    else{
      var dateObject = new Date(); 
    }
    dateObject.setDate(dateObject.getDate() + 1);
    var month = dateObject.getMonth() - 5;
    var date = dateObject.getDate() - 1;
    var year = dateObject.getFullYear() - 1;
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }
    return month + "/" + date  + "/" + year;
  },
  getTodaysDate: function(todaysDate) {
        var dateObject = new Date();
        dateObject.setDate(dateObject.getDate() + 1);
        var month = dateObject.getMonth() + 1;
        var date = dateObject.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        return month + "/" + date + "/" + dateObject.getFullYear();
    },
  getTomorrowsDate: function(tomorrowsDate) {
        var dateObject = new Date();
        dateObject.setDate(dateObject.getDate() + 1);
        var month = dateObject.getMonth() + 1;
        var date = dateObject.getDate() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        return  dateObject.getFullYear().toString() + month.toString() + date.toString();
    }
   });
