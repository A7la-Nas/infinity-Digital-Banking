define({
  /**
   * init is called when the form is loaded , initialisation happen here
   */
  init: function () {
    var scope = this;
    scope.view.preShow = scope.preShowForm;
    scope.view.postShow = scope.postShowForm;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "NO", this.view.id, scope.navigateCustomBack);
  },
  /***
   * navigateCustomBack is triggered native/ ios back event
   */
  navigateCustomBack: function () {
    this.sweepsModule.commonFunctionForgoBack();
  },

  /***
   * native/ios cancel event
   */
  cancelOnClick: function () {
    if(this.presenter.flowType === "AccountSweep"){
    this.sweepsModule.cancelCommon("frmAccountSweepsDashBoard");
    } else if(this.presenter.flowType === "AccountDetails"){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"friendlyName": "AccountUIModule/frmAccountDetails","appName": "ArrangementsMA"});
  }
  },
  /**
   * preShowForm is called when the form is pre loaded
   */
  preShowForm: function () {
    var scope = this;
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }
    this.sweepsModule = applicationManager.getModulesPresentationController({
      moduleName: "AccountSweepsUIModule",
      appName: "AccountSweepsMA",
    });
    this.view.customCalendar.lblMonth.skin = "sknLbl4176A4spsemibold18px";
    var navManager = applicationManager.getNavigationManager();
    this.sweepflow = navManager.getEntryPoint("AccountSweepsFlow");
    this.view.customCalendar.preShow();

    this.initActions();
    this.updateForm();
  },

  /*
  It is used updating form widgets
  */
  updateForm: function () {
    if (this.sweepflow === "Edit") {
      {
        if (
          applicationManager.getAccountSweepsManager().getSweepsObject()
            .endDate === ""
        ) {
          this.imgEndManuallyUpdation();
          this.view.customCalendar.selectedDate = "";
        } else {
          this.imgCustomDateUpdation();
        }
      }
    } else {
      if (
        this.view.imgCustomDate.src === "radiobuttoninactive_big.png" ||
        applicationManager.getAccountSweepsManager().getSweepsObject()
          .endDate === ""
      ) {
        this.imgEndManuallyUpdation();
        this.view.customCalendar.selectedDate = "";
      } else {
        this.imgCustomDateUpdation();
      }
    }
  },
  /**
   * Method used to get the next date for selected date
   */
  getTomorrowsDate: function (scheduledDate) {
    var dateObject = new Date(scheduledDate);
    dateObject.setDate(dateObject.getDate() + 1);
    return applicationManager
      .getFormatUtilManager()
      .getFormattedSelectedDate(dateObject);
  },
  /**
   * sets the calender widget to the form
   */
  setCalender: function () {
    this.view.customCalendar.selectedDate = "";
    this.view.customCalendar.firstEnabledDate = "";
    var startdate = this.sweepsModule.getAccountSweepsObject();
    //get the start date from object
    var formattedDate = this.getTomorrowsDate(startdate.startDate);
    this.view.customCalendar.setFirstEnabledDate(formattedDate);
    var startTime = new Date(startdate.startDate);
    var endTime = new Date(startdate.endDate);
    if (
      this.sweepflow == "Edit" &&
      !this.sweepsModule.isEmptyNullUndefined(startdate.endDate) &&
      endTime.getTime() > startTime.getTime()
    ) {
      this.view.customCalendar.setSelectedDate(startdate.endDate);
    } else {
         if(startdate.endDate)
    this.view.customCalendar.setSelectedDate(startdate.endDate);
else
      this.view.customCalendar.setSelectedDate(formattedDate);
    }
    this.view.btnContinue.skin = "sknBtn055BAF26px";
    this.view.customCalendar.updateDateBullets();
    this.view.customCalendar.lastEnabledDate = "";
    var lastEnabledDate = new Date(startdate.startDate);
    lastEnabledDate.setYear(lastEnabledDate.getFullYear() + 3);
    var setLastDate = applicationManager
      .getFormatUtilManager()
      .getFormattedSelectedDate(lastEnabledDate);
    this.view.customCalendar.setLastEnabledDate(setLastDate);
    this.view.customCalendar.resetCal();
  },
  /**
   * Method to update the EndManually image
   */
  imgEndManuallyUpdation: function () {
    this.view.customCalendar.selectedDate = "";
    this.view.btnContinue.setEnabled(true);
    this.view.imgEndManually.src = "confirmation_tick.png";
    this.view.imgCustomDate.src = "oval.png";
    this.view.flxEndManually.skin="flxGreenMShadow"
    this.view.flxCustomDate.skin="sknFlxffffffBorder5x5yroundedradius8px"
    this.view.customCalendar.isVisible = false;
    this.view.lblEndManuallyDesc.skin = "ICSknLbl42424215pxSSPR";
    this.view.lblCustomDateDesc.skin = "ICSknLabel72727215PxNew";
    this.view.btnContinue.skin = "sknBtn055BAF26px";
  },
  /**
   * Method to update the Customdate image
   */
  imgCustomDateUpdation: function () {
    this.view.customCalendar.triggerContinueAction = false;
    this.view.imgCustomDate.src = "confirmation_tick.png";
    this.view.imgEndManually.src = "oval.png";
    this.view.flxCustomDate.skin="flxGreenMShadow"
    this.view.flxEndManually.skin="sknFlxffffffBorder5x5yroundedradius8px"
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    this.view.lblEndManuallyDesc.skin = "ICSknLabel72727215PxNew";
    this.view.lblCustomDateDesc.skin = "ICSknLbl42424215pxSSPR";
    this.view.customCalendar.isVisible = true;
    this.setCalender();
  },
  /**
   * initActions has all form action declarations
   */
  initActions: function () {
    var scope = this;
    this.view.flxImgEndManually.onClick = this.imgEndManuallyUpdation;
    this.view.flxImgCustomDate.onClick = this.imgCustomDateUpdation;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.btnContinue.onClick = this.continueAction;
    this.view.customHeader.btnRight.onClick = function () {
      scope.cancelOnClick();
    };
  },
  /**
   * performs the actions on continue onclick
   */
  continueAction: function () {
    //here you will set the sweepObj of selected date
    if (this.view.customCalendar.getSelectedDate()) {
         var dateObject=applicationManager.getFormatUtilManager().getDateObjectfromString(this.view.customCalendar.getSelectedDate()).toLocaleDateString('en-GB')
      this.sweepsModule.setSweepsAttribute(
        "endDate",
        this.view.customCalendar.getSelectedDate()
      );
       this.sweepsModule.setSweepsAttribute("formattedEndDate",dateObject );
    } else {
      this.sweepsModule.setSweepsAttribute("endDate", "");
      this.sweepsModule.setSweepsAttribute("formattedEndDate","" );

    }

    this.sweepsModule.commonFunctionForNavigation("frmCreateVerifyDetails");
  },
});
