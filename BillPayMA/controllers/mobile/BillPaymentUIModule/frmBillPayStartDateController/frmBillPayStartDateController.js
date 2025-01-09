define({
  	transObj:{},
  	frequencyTypes:{},
    startDateKey: '',
	 init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function(){
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
      }
//       var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
//       billPayMod.presentationController.getHolidays();
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var transitDays = billPayMod.presentationController.getTransitDays();
      this.view.customCalendar.transitDays = transitDays;
      this.view.customCalendar.preShow();
      this.initActions();
      this.view.customCalendar.selectedDate='';
      //this.view.customCalendar.firstEnabledDate ="";
      this.view.customCalendar.triggerContinueAction = true;
      //this.view.customCalendar.isCalendarEndDateFrm = false;
    //  this.view.customCalendar.isOnceTransaction = false;
      this.view.customCalendar.updateDateBullets();
    //  this.view.customCalendar.unHighlightAllDays();
      this.view.customCalendar.setFirstEnabledDate();
      var forUtility=applicationManager.getFormatUtilManager();
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      this.transObj= billPayMod.presentationController.getTransObject();
      this.frequencyTypes=billPayMod.presentationController.getAvailableFrequencyType();
//       if(this.transObj.frequencyType==this.frequencyTypes.ONCE){
//         this.view.customCalendar.isOnceTransaction = true;
//       }
      if(this.transObj.scheduledCalendarDate!== null && this.transObj.scheduledCalendarDate !== undefined && this.transObj.scheduledCalendarDate !== ""){
          this.setDateToCalendar(this.transObj.scheduledCalendarDate);
        }
        else if(this.transObj.scheduledDate!== null && this.transObj.scheduledDate !== undefined && this.transObj.scheduledDate !== "")
        {
          this.setDateToCalendar(this.transObj.scheduledDate);
        }else{
        var startDate=new Date();
        var currentMonth = (startDate.getMonth() + 1);
        var day = startDate.getDate();
        if (currentMonth < 10) currentMonth = "0" + currentMonth;
        if (day < 10) day = "0" + day;
        currentDate = startDate.getFullYear() + "-" + currentMonth + "-" + day;
        // var startDateFeed1 = (startDate.getMonth() + 1) + "/" + startDate.getDate() + "/" + startDate.getFullYear();
        var firstEnabledDate = billPayMod.presentationController.getSendOnDate(this.view.customCalendar.holidays,currentDate,startDate);
        this.view.customCalendar.selectedDate = firstEnabledDate;
        var month = firstEnabledDate.getMonth()+1;
        firstEnabledDate = (Number(month) >9 ? month : "0" + month) + "/" + (Number(firstEnabledDate.getDate()) >9 ? firstEnabledDate.getDate() : "0" + firstEnabledDate.getDate()) + "/" + firstEnabledDate.getFullYear();
        this.view.customCalendar.setFirstEnabledDate(firstEnabledDate);
        this.setDateToCalendar(firstEnabledDate);
        this.view.customCalendar.updateDateBullets();
       // this.view.btnContinue.skin = "sknBtn055BAF26px";
        }
        // this.setDateToCalendar(firstEnabledDate);
        //this.view.customCalendar.setSelectedDateValue('');
      // }
//       if(this.view.customCalendar.selectedDate===''){
//         this.view.btnContinue.setEnabled(false);
//       }else{
//         this.view.btnContinue.setEnabled(true);
//       }
      if(this.transObj.frequencyType==this.frequencyTypes.ONCE){
        // this.view.customHeader.lblLocateUs.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.sendDateCaps");
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.Transfers.sendDate");
        this.view.btnContinue.isVisible = true;
        this.view.customCalendar.triggerContinueAction = false;
      }else{
        // this.view.customHeader.lblLocateUs.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.startDateCaps");
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.Transfers.StartDate");
        this.view.btnContinue.isVisible = true;
        this.view.customCalendar.triggerContinueAction = false;
      }
      this.view.customCalendar.resetCal();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    initActions: function(){
      var scope = this;
      this.view.customHeader.flxBack.onClick = function(){
        var navMan=applicationManager.getNavigationManager();
        navMan.goBack();
      }
      this.view.btnContinue.onClick = this.continueAction;
      this.view.customHeader.btnRight.onClick = function(){
        var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayModule.presentationController.cancelCommon();
      }
    },
  postshow : function(){
    if(this.view.customCalendar.selectedDate===''){
        this.view.btnContinue.setEnabled(false);
    }else{
        this.view.btnContinue.setEnabled(true);
    }
  },
  setDateToCalendar:function(dateString){
    var forUtility=applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    var scheduledDate = forUtility.getDateObjectFromCalendarString(dateString,configManager.getCalendarDateFormat());
    scheduledDate = forUtility.getFormattedSelectedDate(scheduledDate);
    this.view.customCalendar.setSelectedDate(scheduledDate);
  },
   continueAction: function(){
    var navMan = applicationManager.getNavigationManager();
    var startDate = this.view.customCalendar.selectedDate;
    var deliverDate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate() + this.view.customCalendar.transitDays);
    var billObj = {
        "startDate": startDate,
        "deliverDate": deliverDate
    };
    navMan.setCustomInfo("billPayObj", billObj);
     if((this.transObj.frequencyType==this.frequencyTypes.ONCE||this.transObj.numberOfRecurrences)){
        var selectedDate = this.view.customCalendar.getSelectedDate();
        var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
//        	billPayModule.presentationController.transferDeliverDate(this.view.customCalendar.deliverDate,this.view.customCalendar.transitDays);
        billPayModule.presentationController.transferScheduledDate(selectedDate);
        }
      else
        {
        var selectedDate = this.view.customCalendar.getSelectedDate();
        var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
//         billPayModule.presentationController.transferDeliverDate(this.view.customCalendar.deliverDate,this.view.customCalendar.transitDays);
        billPayModule.presentationController.transferScheduledStrtDate(this.view.customCalendar.getSelectedDate());
        }
    }
});