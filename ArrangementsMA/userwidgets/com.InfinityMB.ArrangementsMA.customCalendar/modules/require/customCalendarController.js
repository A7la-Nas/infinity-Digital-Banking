define(function () {
  return {
    updateBottomLabel: false,
    currMonth: 0,
    currYear: 0,
    selectedDate: '',
    deliverDate: '',
    prevSelectedDate: '',
    transitDays: 0,
    holidays: [],
    firstEnabledDate: '',
    lastEnabledDate: '',
    singleSelect: true,
    fromDate: '',
    toDate: '',
    currentDate: '',
    currentDateSkin: 'sknLbl0095e4SSPRegular26px',
    selectedDateSkin: 'sknLbl0095e4ffffffSSPReg26px',
    unSelectedDateSkin: 'sknLbl4176A4SSPReg26px',
    selectedRangeSkin: 'sknLblE9E9E9bg4176A4SSPReg26px',
    diabledDateSkin: 'sknLbl72727SSPReg26px',
    weekEndSkin: 'sknLbl72727SSPReg26px',
    startDateRangeSkin: 'sknLbl0273E3bor4176A4SSP26px',
    unSelectedRangeSkin: 'sknLblE9E9E9bg4176A4SSPReg26px',
    disabledRangeSkin: 'sknLblE9E9E9bg727272SSP26px',
    triggerContinueAction: true,
    isRangeSelectable: false,
    isSwiped : false,
    resetCal: function () {
      this.view.flxMonth.removeAll();
      var month1 = this.view.flxMonthOneDummy.clone("m1");
      var month2 = this.view.flxMonthOneDummy.clone("m2");
      var month3 = this.view.flxMonthOneDummy.clone("m3");
      month1.left = "-100%";
      month3.left = "100%";
      kony.print("in reset cal function :" + this.currentDate);
      kony.print("in reset cal current month :" + this.currMonth);
      this.view.flxMonth.add(month1, month2, month3);
      this.setMonthData(0, this.currMonth, this.currYear);
      this.setMonthData(1, this.currMonth, this.currYear);
      this.setMonthData(2, this.currMonth, this.currYear);
      this.setMonthLabelText();
    },
    setMonthData: function (monthOffset, month, year) {
      if (month == -1) {
        month = 11;
        year -= 1;
      } else if (month == 12) {
        month = 0;
        year += 1;
      }
      if (monthOffset == 0 && month == 0) {
        year--;
        month = 11;
      } else if (monthOffset == 2 && month == 11) {
        year++;
        month = 0;
      } else {
        month = month - 1 + monthOffset;
      }
      var maxDays = this.setMaxDays(month, year);
      var d2 = new Date();
      d2.setDate(1);
      d2.setMonth(month);
      d2.setFullYear(year);
      var j = d2.getDay();
      var dateValue = 1;
      var week = this.view.flxMonth.widgets()[monthOffset].widgets()[0].widgets();
      for (var temp = 0; temp < j; temp++) {
        week[temp].isVisible = false;
      }
      for (var i = 0; i < 6; i++) {
        var week = this.view.flxMonth.widgets()[monthOffset].widgets()[i].widgets();
        for (; j < 7; j++) {
          if (dateValue > maxDays) {
            for (var k = j; k < 7; k++) {
              week[k].isVisible = false;
            }
            if (i == 4) {
              var weekSix = this.view.flxMonth.widgets()[monthOffset].widgets()[5].widgets();
              for (var k = 0; k < 7; k++) {
                weekSix[k].isVisible = false;
              }
            }
            if (i == 5) {
              var weekSix = this.view.flxMonth.widgets()[monthOffset].widgets()[5].widgets();
              for (var k = j; k < 7; k++) {
                weekSix[k].isVisible = false;
              }
            }
            break;
          }
          week[j].isVisible = true;
          week[j].text = "" + parseInt(dateValue);
          week[j].skin = this.setDateSkin(dateValue, month, year);
          dateValue++;
        }
        j = 0;
      }
    },
    reRenderCurrentMonthSkins: function () {
      kony.print("Pooja   " +this.view.flxMonth.widgets().length);
      kony.print("inside reRenderCurrentMonthSkins function");
      if (this.view.flxMonth.widgets().length == 1) {
        // this.resetCal();
        return;
      }
      for (var monthOffset = 0; monthOffset < this.view.flxMonth.widgets().length; monthOffset++) {
        for (var i = 0; i < 6; i++) {
          var week = this.view.flxMonth.widgets()[monthOffset].widgets()[i].widgets();
          for (var j = 0; j < 7; j++) {
            if (week[j].isVisible) {
              week[j].skin = this.setDateSkin(week[j].text, this.currMonth - 1 + monthOffset, this.currYear);
            }
          }
        }
      }
    },
    setDateSkin: function (date, month, year) {
      var d = new Date(year, month, date);
      if (this.lastEnabledDate == '' || this.lastEnabledDate == undefined || this.firstEnabledDate == '' || this.firstEnabledDate == undefined) {
        this.setFirstEnabledDate();
        this.setLastEnabledDate();
      }
      if (d.getTime() < this.lastEnabledDate.getTime() && d.getTime() >= this.firstEnabledDate.getTime()) {
        if (this.isRangeSelectable) {
          if (this.fromDate == '' || this.fromDate == undefined) {
            if (d.getTime() == this.currentDate.getTime()) {
              return this.currentDateSkin;
            } else {
              return this.unSelectedDateSkin;
            }
          } else if (this.toDate == '' || this.toDate == undefined) {
            if (d.getTime() == this.fromDate.getTime()) {
              return this.selectedDateSkin;
            } else if (d.getTime() == this.currentDate.getTime()) {
              return this.currentDateSkin;
            } else {
              return this.unSelectedDateSkin;
            }
          } else {
            if (d.getTime() >= this.fromDate.getTime() || d.getTime() <= this.toDate.getTime()) {
              return this.selectedDateSkin;
            } else if (d.getTime() == this.currentDate.getTime()) {
              return this.currentDateSkin;
            } else {
              return this.unSelectedDateSkin;
            }
          }
        } else {
          if (this.selectedDate != '' && this.selectedDate != undefined) {
            if (d.getTime() == this.selectedDate.getTime()) {
              return this.selectedDateSkin;
            }
          }
          if (d.getTime() == this.currentDate.getTime()) {
            return this.currentDateSkin;
          } else {
            return this.unSelectedDateSkin;
          }
        }
      } else {
        return this.diabledDateSkin;
      }
    },
    setFirstEnabledDate: function (dateParam) { //dateParam : mm/dd/yyyy
      kony.print("dateParam : "+dateParam);
      if (dateParam == undefined || dateParam == "") {
        kony.print("in setFirstEnabledDate function - firstEnabledDate : "+this.firstEnabledDate +", currMonth : "+this.currMonth);
        if (this.firstEnabledDate == "" || this.firstEnabledDate == undefined) {
          this.firstEnabledDate = this.currentDate;
          this.currMonth = this.firstEnabledDate.getMonth();
          this.currYear = this.firstEnabledDate.getFullYear();
          kony.print("dateParam is undefined setting current date as firstEnabledDate-"+this.firstEnabledDate +"- currMonth-"+this.currMonth);
        } else if (isNaN(this.firstEnabledDate.getTime())) {
          this.firstEnabledDate = this.firstEnabledDate;
          this.currMonth = this.firstEnabledDate.getMonth();
          this.currYear = this.firstEnabledDate.getFullYear();
          kony.print("dateParam is undefined setting firstEnabledDate is already defined -"+this.firstEnabledDate +"- currMonth-"+this.currMonth);
        }
      } else {
        var dateSplit ;
        kony.print("174 datesplit "+ dateSplit);
        if (dateParam.indexOf('/')!= -1) {
          kony.print("date param has slashes");
          dateSplit = dateParam.split("/");  
        } else if(dateParam.indexOf('-')!= -1){
          kony.print("date param has hiphens!!!");
          dateSplit = dateParam.split("-"); //mm,dd,yyyy  
        }
        kony.print("dateSplit" + dateSplit);
        this.firstEnabledDate = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
        this.currMonth = this.firstEnabledDate.getMonth();
        this.currYear = this.firstEnabledDate.getFullYear();
        kony.print("dateParam is -"+dateParam+"- setting current date as firstEnabledDate -"+this.firstEnabledDate +"- currMonth-"+this.currMonth);
      }
    },
    setLastEnabledDate: function (dateParam) { //dateParam : mm/dd/yyyy
      kony.print("in start of set last enabled date function");
      if (dateParam == undefined) {
        if (this.lastEnabledDate == "" || this.lastEnabledDate == undefined) {
          kony.print("lastenabled date is undefined or empty");
          this.lastEnabledDate = new Date(this.firstEnabledDate);
          this.lastEnabledDate.setFullYear(this.lastEnabledDate.getFullYear() + 1);
        } else if (isNaN(this.lastEnabledDate.getTime())) {
          kony.print("lastEnabled Date is NAN");
          this.lastEnabledDate = new Date(this.firstEnabledDate);
          this.lastEnabledDate.setFullYear(this.lastEnabledDate.getFullYear() + 1);
        }
      } else {
        kony.print("date param is present"+ dateParam);
        var dateSplit = dateParam.split("/"); //mm,dd,yyyy
        kony.print("dateSplit" + dateSplit);
        this.lastEnabledDate = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
        kony.print("last enabled date is set - "+ this.lastEnabledDate);
      }
      kony.print("in end of set last enabled date function");
    },
    setSelectedDate: function (dateParam) {
      if(dateParam == "" || dateParam == undefined || dateParam == null){
        kony.print("returning as dateParam is empty");
        return;
      }
      kony.print("inside setSelectedDate function");
      var dateSplit;
      if (dateParam.indexOf('/')!= -1) {
          kony.print("date param has slashes");
          dateSplit = dateParam.split("/");  
        } else if(dateParam.indexOf('-')!= -1){
          kony.print("date param has hiphens!!!");
          dateSplit = dateParam.split("-"); //mm,dd,yyyy  
        } else if(dateParam.indexOf('.')!= -1){
          kony.print("date param has dots!!!");
          dateSplit = dateParam.split("."); //mm,dd,yyyy  
        }
      var d = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
      kony.print("date param date obj : " + d);
      if (this.isRangeSelectable) {
        kony.print("range selectable is true so setting from date");
        this.setFromDate(dateParam);
      } else if (this.selectedDate == '' || this.selectedDate == undefined) {
        kony.print("selected date is empty. setting " + d + " as selected date");
        this.selectedDate = d;
        this.currMonth = this.selectedDate.getMonth();
        this.currYear = this.selectedDate.getFullYear();
      } else {
        if (this.selectedDate.getTime() == d.getTime()) {
          kony.print("range is not selectable and selected date the same date -"+this.selectedDate+"-so unselecting date");
          this.selectedDate = '';
        } else {
          kony.print("range is not selectable and selected date is changed. setting -" + d + "- as selected date");
          this.selectedDate = d;
          this.currMonth = this.selectedDate.getMonth();
          this.currYear = this.selectedDate.getFullYear();
        }
      }
      this.reRenderCurrentMonthSkins();
      this.addHolidays();
      this.updateDateBullets();
      kony.print("setSelectedDate function ended");
    },
    setFromDate: function (dateParam) {
      var dateSplit = dateParam.split("/"); //mm,dd,yyyy
      var d = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
      if (this.fromDate == '' || this.fromDate == undefined) {
        this.fromDate = d;
      } else if (this.fromDate.getTime() == d.getTime()) {
        this.fromDate = '';
      } else {
        this.setToDate(dateParam);
      }
    },
    setToDate: function (dateParam) {
      var dateSplit = dateParam.split("/"); //mm,dd,yyyy
      this.toDate = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
    },
    preShow: function () {
      var d2 = new Date();
      if (this.currentDate === "" || this.currentDate === undefined) {
        this.currentDate = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
      }
      this.currMonth = this.currentDate.getMonth();
      this.currYear = this.currentDate.getFullYear();
      kony.print("in preshow before initActions currentMonth : " + this.currMonth);
      var scope = this;
      this.initActions();
      kony.print("in preshow after init Actions currentMonth : " + this.currMonth);
      this.setFirstEnabledDate();
      kony.print("in preshow after setFirstEnabledDate currentMonth : " + this.currMonth);
      this.setLastEnabledDate();
      kony.print("in preshow currentMonth : " + this.currMonth);
      this.resetCal();
      this.setDeliverDateToLabel();
      var navManager = applicationManager.getNavigationManager();
      this.holidays = navManager.getCustomInfo("customCalendar");
      if(!this.holidays)
        this.holidays = new Set();
      this.addHolidays();
      if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
      this.setRangeSkins();
    },
    getDate:function(day){
      day = Number(day);
      var currentMonth = this.currMonth + 1;
      if(currentMonth < 10)
        currentMonth = "0" + currentMonth;
      if(day < 10)
        day = "0" + day;
      return (this.currYear + "-" + currentMonth + "-" + day);
    },
    addHolidays:function(){
        for (var i = 0; i < 6; i++) {
          var week = this.view.flxMonth.widgets()[1].widgets()[i].widgets();
          for (var j = 0; j < 7; j++) {
            if (week[j].text != "S" && week[j].isVisible && this.holidays.has(this.getDate(week[j].text))) {
              week[j].skin = this.weekEndSkin;
              week[j].setEnabled(false);
            }
          }
        }
    },
    setRangeSkins: function(){
      var startDate = this.prevSelectedDate;
      var deliverDate = this.deliverDate;
      for (var i = 0; i < 6; i++) {
          var week = this.view.flxMonth.widgets()[1].widgets()[i].widgets();
          for (var j = 0; j < 7; j++) {
            if(week[j].text == 'S')
              continue;
            var current = new Date(this.currYear,this.currMonth,week[j].text);
            if(this.selectedDate!=='' && current.getTime() == startDate.getTime() && this.selectedDate.getTime()==startDate.getTime())
              {
                week[j].skin = this.selectedDateSkin;
                continue;
              }
            if(current.getTime() == startDate.getTime())
              {
                if(this.transitDays!=0)
                week[j].setEnabled(false);
                week[j].skin = this.startDateRangeSkin;
              }
            else if(current>startDate && current<deliverDate)
              {
                if(week[j].skin == this.unSelectedDateSkin)
                  week[j].skin = this.unSelectedRangeSkin;
                else if(week[j].skin == this.diabledDateSkin)
                  week[j].skin = this.disabledRangeSkin;
                week[j].setEnabled(false);
              }
            else if((current.getTime() == deliverDate.getTime())||(this.selectedDate !== '' && current>deliverDate && current<this.selectedDate))
              {
                if(week[j].skin == this.unSelectedDateSkin)
                  week[j].skin = this.unSelectedRangeSkin;
                else if(week[j].skin == this.diabledDateSkin)
                  week[j].skin = this.disabledRangeSkin;
              }
            else if(current<startDate)
              week[j].setEnabled(false);
            else
              continue;
          }
        }
    },
    setMonthLabelText: function () {
      var currMonth = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
      };
      this.view.lblMonth.text = currMonth[this.currMonth] + " " + this.currYear;
      if(kony.application.getCurrentForm().id === "frmLRStartDateSelection"){
        this.view.lblMonth.text = currMonth[this.currMonth];
      }
    },
    setMaxDays: function (month, year) {
      if (month == 1 && year % 4 == 0) {
        return 29;
      } else if (month == 1) {
        return 28;
      }
      var monthMaxDays = {
        0: 31,
        2: 31,
        3: 30,
        4: 31,
        5: 30,
        6: 31,
        7: 31,
        8: 30,
        9: 31,
        10: 30,
        11: 31,
      };
      return monthMaxDays[month];
    },
    clickedOnDate: function (widgetRef) { //triggered on touch end of a date
      kony.print("inside clickedOnDate Function");
      if (widgetRef.skin == this.diabledDateSkin ||widgetRef.skin == this.disabledRangeSkin) {
        return;
      }
      kony.print("called setSelectedDate(" + ((this.currMonth + 1) + "/" + widgetRef.text + "/" + this.currYear) + ")");
      this.setSelectedDate((this.currMonth + 1) + "/" + widgetRef.text + "/" + this.currYear); //mm/dd/yyyy
      this.setMonthLabelText();
      if (this.triggerContinueAction) {
        kony.print("about to call triggerContinue Function");
        this.triggerContinue();
      }
      this.setDeliverDateToLabel();
    },
    setDeliverDateToLabel:function(){
      var currForm = kony.application.getCurrentForm();
      if(currForm.id == "frmBillPayStartDate" && this.selectedDate){
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
        var transObj = billPayMod.presentationController.getTransObject();
        if(transObj.frequencyType == "Once")
        currForm.lblDeliverDate.text = this.getDeliverDate(this.selectedDate);
        else{
        //  this.getDeliverDate(this.selectedDate);
        currForm.lblDeliverDate.text = kony.i18n.getLocalizedString("kony.mb.BillPay.DeliveredIn") + this.transitDays +kony.i18n.getLocalizedString("kony.mb.BillPay.TransactionDays") ;
        }
      }
      else if(currForm.id == "frmBillPayEndDate"){
        // this.getDeliverDate(this.selectedDate);
        currForm.lblDeliverDate.text = kony.i18n.getLocalizedString("kony.mb.BillPay.DeliveredIn") + this.transitDays +kony.i18n.getLocalizedString("kony.mb.BillPay.TransactionDays") ;
      }
      else if(currForm.id == "frmBillPayStartDate")
        currForm.lblDeliverDate.text = "";
    },
    getDeliverDate:function(selectedDate){
      if(selectedDate === '')
        return '';
      var requiredDate = new Date(selectedDate);
      var holidaysInBetween = 0;
      for(var i = 1;i <= this.transitDays; i++){
       requiredDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + i);
        var currentMonth = (requiredDate.getMonth()+1);
        var day = requiredDate.getDate();
        if(currentMonth < 10)
        	currentMonth = "0" + currentMonth;
      	if(day < 10)
        	day = "0" + day;
       var currDate = requiredDate.getFullYear() + "-" + currentMonth + "-" + day;
        if(this.holidays.has(currDate))
          holidaysInBetween++;
      }
      var counter = 1;
      for(var j = 1;j <= holidaysInBetween; ){
       requiredDate = new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate() + this.transitDays + counter);  
       var currentMonth = (requiredDate.getMonth() + 1);
       var day = requiredDate.getDate();
       if (currentMonth < 10) currentMonth = "0" + currentMonth;
       if (day < 10) day = "0" + day;
       var currDate = requiredDate.getFullYear() + "-" + currentMonth + "-" + day;
       if (!this.holidays.has(currDate)) j++;
          counter++;
      }
      var deliverMonth = (requiredDate.getMonth()+1);
      var deliverDate = requiredDate.getDate();
      if(deliverMonth < 10)
       	deliverMonth = "0" + deliverMonth;
      if(deliverDate < 10)
       	deliverDate = "0" + deliverDate;
      var date = deliverMonth + "/" + deliverDate + "/" + requiredDate.getFullYear();
      this.deliverDate = date;
      return kony.i18n.getLocalizedString("kony.mb.BillPay.DeliverBy") + date;
    },
    initActions: function () {
      var scope = this;
      
      this.view.flxMonth.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
          fingers: 1
        },
        function (widgetRef, gestureInfo) {
          kony.print("swiped isSwiped:"+scope.isSwiped);
          if (scope.isSwiped == true) {
            return;
          }
          scope.isSwiped=true;
          if (gestureInfo.swipeDirection === 1) {
            kony.print("swiped right");
            scope.view.flxNextMonth.onClick();
          } else if (gestureInfo.swipeDirection === 2) {
            kony.print("swiped left");
            scope.view.flxPreviousMonth.onClick();
          }
        }
      );
      this.view.flxNextMonth.onClick = function () {
        scope.view.flxNextMonth.setEnabled(false);
        scope.view.flxPreviousMonth.setEnabled(false);
        scope.unHighlightRange();
        scope.view.flxMonth.widgets()[1].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "-100%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {}
          });
        scope.view.flxMonth.widgets()[2].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {
              var month = scope.view.flxMonthOneDummy.clone(scope.view.flxMonth.widgets()[0].id.slice(0, 2));
              scope.view.flxMonth.removeAt(0);
              month.left = "100%";
              scope.view.flxMonth.addAt(month, 2);
              scope.currMonth += 1;
              if (scope.currMonth == 12) {
                var tempYear = parseInt(scope.currYear) + 1;
                scope.currYear = tempYear;
                scope.currMonth = 0;
              }
              scope.setMonthData(2, scope.currMonth, scope.currYear);
              scope.setMonthLabelText();
              scope.addHolidays();
              if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
                scope.setRangeSkins();
              scope.view.flxNextMonth.setEnabled(true);
              scope.view.flxPreviousMonth.setEnabled(true);
              scope.isSwiped = false;
            }
          });
      }
      this.view.flxPreviousMonth.onClick = function () {
        scope.view.flxNextMonth.setEnabled(false);
        scope.view.flxPreviousMonth.setEnabled(false);
        scope.unHighlightRange();
        scope.view.flxMonth.widgets()[1].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "100%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {}
          });
        scope.view.flxMonth.widgets()[0].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {
              var month = scope.view.flxMonthOneDummy.clone(scope.view.flxMonth.widgets()[2].id.slice(0, 2));
              scope.view.flxMonth.removeAt(2);
              month.left = "-100%";
              scope.view.flxMonth.addAt(month, 0);
              scope.currMonth -= 1;
              if (scope.currMonth == -1) {
                scope.currMonth = 11;
                scope.currYear -= 1;
              }
              scope.setMonthData(0, scope.currMonth, scope.currYear);
              scope.setMonthLabelText();
              scope.addHolidays();
              if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
                scope.setRangeSkins();
              scope.view.flxNextMonth.setEnabled(true);
              scope.view.flxPreviousMonth.setEnabled(true);
              scope.isSwiped = false;
            }
          });
      }
      for (var i = 0; i < 6; i++) {
        var week = this.view.flxMonthDummy.widgets()[0].widgets()[i].widgets();
        for (var j = 0; j < 7; j++) {
          week[j].onTouchEnd = function (widgetRef) {
            scope.clickedOnDate(widgetRef);
            if(kony.application.getCurrentForm().id == "frmBillPayEndDate"){
                  scope.setRangeSkins();
            }
          }
        }
      }
    },
    unHighlightRange: function () {
      for (i = 0; i < this.view.flxHighlight.widgets().length; i++) {
        this.view.flxHighlight.widgets()[i].width = '0%';
        this.view.flxHighlight.widgets()[i].left = '0%';
      }
    },
    hightlightRange: function () { //need to refactor
      if (this.selectedDate === '') {
        return;
      }
      var breakFlag = false;
      var selectedDate = this.dateToString(this.toDate).split("/");
      selectedDate = selectedDate.map(function (e) {
        return parseInt(e);
      });
      var fromDate = this.fromDate.split("/");
      fromDate = fromDate.map(function (e) {
        return parseInt(e);
      });
      var i;
      if (this.currMonth < fromDate[0] || this.currMonth > selectedDate[0]) {
        return;
      }
      if (fromDate[0] < (this.currMonth)) {
        fromDate[1] = 1;
      }
      if (this.currMonth < selectedDate[0]) {
        selectedDate[1] = this.setMaxDays(this.currMonth, this.currYear);
      }
      for (i = 0; i < 6; i++) {
        var week = this.view.flxMonth.widgets()[1].widgets()[i].widgets();
        for (var j = 0; j < 7; j++) {
          if (week[j].text == fromDate[1] && week[j].isVisible) {
            this.view.flxHighlight.widgets()[i].left = j * 35 + "dp";
            this.view.flxHighlight.widgets()[i].width = (7 - j) * 35 + "dp";
            for (let k = j; k < 7; k++) { //setting selected skin
              week[k].skin = this.selectedDateSkin;
            }
            if (selectedDate[1] - fromDate[1] < 7 - j) { //same week
              this.view.flxHighlight.widgets()[i].width = (selectedDate[1] - fromDate[1] + 1) * 35 + "dp";
              for (k = j + selectedDate[1] - fromDate[1] + 1; k < 7; k++) { //setting unselected skin
                week[k].skin = this.unSelectedDateSkin;
              }
              i = 10;
            }
            breakFlag = true;
            break;
          }
        }
        if (breakFlag == true) {
          break;
        }
      }
      breakFlag = false;
      for (i = i + 1; i < 6; i++) {
        var week = this.view.flxMonth.widgets()[1].widgets()[i].widgets();
        for (var j = 0; j < 7; j++) {
          if (week[j].text == selectedDate[1]) {
            this.view.flxHighlight.widgets()[i].left = "0%";
            this.view.flxHighlight.widgets()[i].width = (j + 1) * 35 + "dp";
            for (k = 0; k < j + 1; k++) { //setting selected skin
              week[k].skin = this.selectedDateSkin;
            }
            breakFlag = true;
            break;
          }
        }
        if (breakFlag == true) {
          break;
        }
        this.view.flxHighlight.widgets()[i].left = "0%";
        this.view.flxHighlight.widgets()[i].width = "100%";
        for (k = 0; k < 7; k++) { //setting selected skin
          week[k].skin = this.selectedDateSkin;
        }
      }
    },
    dateToString: function (dateObj) {
      if (dateObj instanceof Date) {
        if (!isNaN(dateObj.getTime())) {
          return ((dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear());
        }
      }
      return "";
    },
    stringToDate: function(date){
      var temp = date.split('/');
      var dateObj = new Date(temp[2],temp[0]-1,temp[1]);
      return dateObj;
    },
    getSelectedDate: function () {
      var dateVal;
      kony.print("inside getSelectedDate function selectedDate: " + this.selectedDate);
      if (this.selectedDate == '' || this.selectedDate == undefined) {
        kony.print("inside getSelectedDate selectedDate: " + this.selectedDate);
        return '';
      } else {
        dateVal = this.dateToString(this.selectedDate);
      }
      kony.print("dateVal: " + dateVal);
      var temp = dateVal.split('/');
      kony.print("temp[0]: " + temp[0] + "  -- temp[1]: " + temp[1] + "  --temp[2]" + temp[2]);
      if (temp[0].length == 1) {
        temp[0] = '0' + temp[0];
      }
      if (temp[1].length == 1) {
        temp[1] = '0' + temp[1];
      }
      dummy = temp[0] + '/' + temp[1] + '/' + temp[2];
      return dummy;
    },
    updateDateBullets: function () {
      kony.print("inside update bullets function");
      var currForm = kony.application.getCurrentForm();
      var dateLabels = currForm.flxDateValue.widgets();
      var dummy = '';
      var skin = '';
      var locale = kony.i18n.getCurrentLocale();
      locale=locale.toLowerCase();
      locale=locale.replace("_","-");
      //var locale = "sv"
      if (this.selectedDate === '') {
        currForm.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        currForm.btnContinue.setEnabled(false);
//         dummy = 'MM/DD/YYYY';
        if(locale=="en-us" || locale=="en"){
          dummy = 'MM/DD/YYYY';
        }
        else if(locale=="en-gb" || locale === "fr-fr" || locale=="es-es"){
          dummy = 'DD/MM/YYYY';
        }
         else if(locale=="de-de"){
          dummy = 'DD.MM.YYYY';
        }
        else if(locale=="sv-se"){
          dummy = 'YYYY-DD-MM';
        }
         
        skin = 'sknLble3e3e3SSPReg40px';
      } else {
        //sknBtn0095e4RoundedffffffSSP26px
        currForm.btnContinue.skin = "sknBtn055BAF26px";
        currForm.btnContinue.setEnabled(true);
        skin = 'sknLbl424242SSPReg40px';
        var options={
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        };
        dummy=this.selectedDate.toLocaleDateString(locale,options);
//         dummy = this.getSelectedDate();
        kony.print("In update bullets getselectedDate mein ka dummy" + dummy)
      }
      for (var i = 0; i < dateLabels.length; i++) {
        dateLabels[i].text = dummy[i];
        dateLabels[i].skin = skin;
      }
      currForm.forceLayout();
      kony.print("update bullets function ended");
    },
    triggerContinue: function () {
      if(this.updateBottomLabel){
         var currForm = kony.application.getCurrentForm();
        currForm.customCalendar.onTouchEnd();
      }
      else{
      if (this.selectedDate === '') {
        kony.print("selected date is null");
        return;
      }
      kony.print("about to call onClick of btnContinue in Form controller");
      var currForm = kony.application.getCurrentForm();
      currForm.btnContinue.onClick();
      kony.print("called onClick of btnContinue in Form controller");
    }},
    diffDays :   function (fromDate, toDate) {
      fromDate  =  fromDate.split('/');
      toDate  =  toDate.split('/');
      fromDate  =  new  Date(fromDate[2],  fromDate[0],  fromDate[1]);
      toDate  =  new  Date(toDate[2],  toDate[0],  toDate[1]);
      fromDate_unixtime  =  parseInt(fromDate.getTime()  /  1000);
      toDate_unixtime  =  parseInt(toDate.getTime()  /  1000);
      var  timeDifference  =  toDate_unixtime  -  fromDate_unixtime;
      var  timeDifferenceInDays  =  timeDifference  /  60  /  60  /  24;
      return  timeDifferenceInDays - 1;
    }
  };
});