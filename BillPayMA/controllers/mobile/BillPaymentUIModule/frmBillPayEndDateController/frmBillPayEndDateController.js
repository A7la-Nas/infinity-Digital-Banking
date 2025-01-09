define({
	 init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function(){
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
      }
      if(this.view.customCalendar.selectedDate===''){
        this.view.btnContinue.setEnabled(false);
      }else{
        this.view.btnContinue.setEnabled(true);
      }
      var navMan = applicationManager.getNavigationManager();
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var billObj = navMan.getCustomInfo("billPayObj");
      this.view.customCalendar.transitDays = billPayMod.presentationController.getTransitDays();
      this.view.customCalendar.prevSelectedDate = billObj.startDate;
      this.view.customCalendar.deliverDate = billObj.deliverDate;
      this.view.customCalendar.preShow();
      this.view.customCalendar.selectedDate='';
      this.view.customCalendar.triggerContinueAction = false;
 //     this.view.customCalendar.isCalendarEndDateFrm = true;
  //    this.view.customCalendar.isOnceTransaction = false;
      this.view.customCalendar.updateDateBullets();
   //   this.view.customCalendar.unHighlightAllDays();
      var startdate= billPayMod.presentationController.getTransObject();
      this.view.customCalendar.prevSelectedDate = this.view.customCalendar.stringToDate(startdate.scheduledDate);
	  this.view.customCalendar.setFirstEnabledDate(startdate.scheduledDate);
      var forUtility=applicationManager.getFormatUtilManager();
     if(startdate.endCalendarDate!== null && startdate.endCalendarDate !== undefined && startdate.endCalendarDate !== ""){
        var strdate=new Date(startdate.scheduledCalendarDate);
        var enddate=new Date(startdate.endCalendarDate);
        if(enddate>strdate)
          {
        this.setDateToCalendar(startdate.endCalendarDate);
          }
      }
      else if(startdate.frequencyEndDate!== null && startdate.frequencyEndDate !== undefined && startdate.frequencyEndDate !== ""){
         var strdate=new Date(startdate.scheduledDate);
        var enddate=new Date(startdate.frequencyEndDate);
         if(enddate>strdate)
          {
        this.setDateToCalendar(startdate.frequencyEndDate);
          }
      }else{
        this.view.customCalendar.setSelectedDate(startdate.frequencyEndDate);
      }
      this.view.customCalendar.resetCal();
      this.initActions();
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      this.view.postShow = this.postShow;
    },
    postShow : function(){
    if(this.view.customCalendar.selectedDate===''){
        this.view.btnContinue.setEnabled(false);
    }else{
        this.view.btnContinue.setEnabled(true);
    }
  },
    initActions: function(){
        var scope = this;
       this.view.btnContinue.onClick = this.continueAction;
        this.view.customHeader.btnRight.onClick = function(){
            var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        	billPayModule.presentationController.cancelCommon();
        }
        this.view.customHeader.flxBack.onClick = function(){
            var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
            billPayMod.presentationController.commonFunctionForNavigation("frmBillPayStartDate");
        }
    },
  setDateToCalendar:function(dateString){
    var forUtility=applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    var frequencyEndDate = forUtility.getDateObjectFromCalendarString(dateString,configManager.getCalendarDateFormat());
    frequencyEndDate = forUtility.getFormattedSelectedDate(frequencyEndDate);
    this.view.customCalendar.setSelectedDate(frequencyEndDate);
  },
     continueAction: function(){
         var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayModule.presentationController.transferScheduledEndDate(this.view.customCalendar.getSelectedDate());
}
});