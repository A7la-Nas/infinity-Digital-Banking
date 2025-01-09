define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
   var isSliderOrGoalTbxChanged = false;
  return {
        oldGoalData: {},
        maxLimitMonth: 0,
        maxLimitAmount: 0,
        minLimitMonth: 0,
        minLimitAmount: 0,
        endDate: new Date(),
        previousGoalAmount: 0,
        accountCurrencyCode: "USD",
    /*
     * updateFormUI - it updates the form ui
     * @param {Object} createsavingsGoal view model object
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
    updateFormUI: function(uiData) {
      if (uiData) {
        if (uiData.serverError) {
          this.showServerError(uiData.serverError);
        } else {
          this.showServerError(false);
          if (uiData.showLoadingIndicator) {
            if (uiData.showLoadingIndicator.status === true) {
              FormControllerUtility.showProgressBar(this.view)
            } else {
              FormControllerUtility.hideProgressBar(this.view)
            }
          }
                    if (uiData.editGoalData) {
            this.setDataToForm(uiData.editGoalData);
          }
                    if (uiData.modifyEditGoalData) {
            this.setDataToForm(uiData.modifyEditGoalData);
          }
        }
      }
    },
    /*
     * initSlider -  Method to initialize the Slider with values & adding callback methods for the sliders
     * @param {} 
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
    initSlider: function() {
      var scope = this;
            var minLimit = "0"; //applicationManager.getConfigurationManager().getMinMonthlyDebitAmount();
      var maxLimit = applicationManager.getConfigurationManager().getMaxMonthlyDebitAmount();
            var defaultValue = 0; //applicationManager.getConfigurationManager().getMinMonthlyDebitAmount();
      var stepLimit = 1000;
      var config = applicationManager.getConfigurationManager();
      var currencySymbol = config.getCurrency(this.accountCurrencyCode);
      scope.view.slider.initialize(minLimit, maxLimit, defaultValue, stepLimit, true, currencySymbol, "");
      this.maxLimitAmount = Number(maxLimit);
      this.minLimitAmount = Number(minLimit);
            var minLimit2 = "0"; //applicationManager.getConfigurationManager().getMinMonths();
      var maxLimit2 = applicationManager.getConfigurationManager().getMaxMonths();
      var defaultValue2 = 0;
      var stepLimit2 = 5;
            scope.view.slider1.initialize(minLimit2, maxLimit2, defaultValue2, stepLimit2, false, "", "months");
      this.maxLimitMonth = Number(maxLimit2);
      this.minLimitMonth = Number(minLimit2);
      this.view.lblMonthlyAmount.text = "-";
      this.view.lblMonthValue.text = "-";
      this.view.lblDateToAchieve.text = "-";
      this.view.slider1.setOnTouchEndCallback(scope.termSliderCallBack);
      this.view.slider.setOnTouchEndCallback(scope.amountSliderCallback);
    },
    /*
     * setError -  method to set error message 
     * @param {boolean} flag to show the error or not
     * @param {errorMessage} the error message to be displayed
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
        setError: function(flag, errorMessage) {
            if (flag) {
        this.view.lblWarningNameExists.text = errorMessage;
        this.view.lblWarningNameExists.setFocus(true);
        CommonUtilities.disableButton(this.view.btnContinue);
      }
      this.view.lblWarningNameExists.isVisible = flag;
    },
    /*
     * amountSliderCallback -  callback method triggered when amountSlider is changed 
     * @param {} 
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
    amountSliderCallback: function() {
      isSliderOrGoalTbxChanged = true;
      var monthlyAmount = this.view.slider.getValue();
      this.setMonthSlider(monthlyAmount);
      this.enableOrDisableContinue();
    },
    /*
     * termSliderCallBack -  callback method triggered when termSlider is changed
     * @param {} 
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
    termSliderCallBack: function() {
      isSliderOrGoalTbxChanged = true;
      var months = this.view.slider1.getValue();
      this.setAmountSlider(months);
      this.enableOrDisableContinue();
    },
     /*
     * setMonthSlider -  logic for setting month Slider based on number of months
     * @param {value} number of months
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
    setMonthSlider: function(value) {
      var self = this;
      var target;
            if (isSliderOrGoalTbxChanged) {
        target = Number(this.deformatAmount(this.view.lblRemainingAmount.text));
            } else {
          target = Number(this.deformatAmount(this.view.tbxGoalAmount.text));
      }
            if (value > 0) {
                this.view.lblMonthlyAmount.text = CommonUtilities.formatCurrencyWithCommas(value, false, self.accountCurrencyCode);
        var sliderValue = (target / value);
                this.view.lblMonthValue.text = String(sliderValue) + " " + kony.i18n.getLocalizedString("i18n.savingsPot.months");
        if ((sliderValue * value) == target &&  Math.round(sliderValue) == sliderValue && sliderValue <= this.view.slider1.sldSlider.max && sliderValue >= this.view.slider1.sldSlider.min) {
            this.view.slider1.setValue(sliderValue);
            this.setError(false);
            this.setFinalDate();
            if (this.view.imgRadioBtn21.text == OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED) {
                        this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(value, false, self.accountCurrencyCode);
            } else {
                        this.view.tbxFreqAmount.text = this.formatCurrencyWithCommasAndDots(value / 2, false, self.accountCurrencyCode);
            }
                } else if ((sliderValue * value) != target || Math.round(sliderValue) != sliderValue) {
            var roundedValue = Math.ceil(sliderValue);
                    this.view.lblMonthValue.text = String(roundedValue) + " " + kony.i18n.getLocalizedString("i18n.savingsPot.months");
            var newValue = (target / roundedValue);
                    newValue = applicationManager.getFormatUtilManager().ceilDecimalString(newValue, -2);
                    this.view.lblMonthlyAmount.text = CommonUtilities.formatCurrencyWithCommas(newValue, false, self.accountCurrencyCode);
            this.view.slider.setValue(Math.round(newValue));
            this.view.slider1.setValue(roundedValue);
            this.setError(false);
            this.setFinalDate();
            if (this.view.imgRadioBtn21.text == OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED) {
                        this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(newValue, false, self.accountCurrencyCode);
            } else {
                        this.view.tbxFreqAmount.text = this.formatCurrencyWithCommasAndDots(newValue / 2, false, self.accountCurrencyCode);
         }
                } else {
          var errText = kony.i18n.getLocalizedString("i18n.savingsPot.goalPeriodError") + String(this.view.slider1.sldSlider.max);
          this.setError(true, errText);
          this.view.lblDateToAchieve.text = "-";
          }
            } else {
        this.initSlider();
        this.view.slider1.sldSlider.setEnabled(true);
        this.view.slider.sldSlider.setEnabled(true);
        this.view.lblDateToAchieve.text = "-";
       }
    },
     /*
     * setAmountSlider -  logic for setting amount Slider based on number of months
     * @param {Integer} value - number of months
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
    setAmountSlider: function(value) {
      var self = this;
      var target;
            if (isSliderOrGoalTbxChanged) {
        target = Number(this.deformatAmount(this.view.lblRemainingAmount.text));
            } else {
          target = Number(this.deformatAmount(this.view.tbxGoalAmount.text));
      }
            if (value > 0) {
        var sliderValue = (target / value);
                sliderValue = applicationManager.getFormatUtilManager().ceilDecimalString(sliderValue, -2);
                this.view.lblMonthValue.text = String(value) + " " + kony.i18n.getLocalizedString("i18n.savingsPot.months");
                this.view.lblMonthlyAmount.text = CommonUtilities.formatCurrencyWithCommas(sliderValue, false, self.accountCurrencyCode);
        if ((sliderValue * value) == target && Math.round(sliderValue) == sliderValue && sliderValue <= this.view.slider.sldSlider.max && sliderValue >= this.view.slider.sldSlider.min) {
            this.view.slider.setValue(sliderValue);
            this.setError(false);
            this.setFinalDate();
            if (this.view.imgRadioBtn21.text == OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED) {
                        this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(sliderValue, false, self.accountCurrencyCode);
            } else {
                        this.view.tbxFreqAmount.text = this.formatCurrencyWithCommasAndDots(sliderValue / 2, false, self.accountCurrencyCode);
            }
                } else if ((sliderValue * value) != target || Math.round(sliderValue) != sliderValue) {
                    var roundedValue = applicationManager.getFormatUtilManager().ceilDecimalString(sliderValue, -2);
                    this.view.lblMonthlyAmount.text = CommonUtilities.formatCurrencyWithCommas(roundedValue, false, self.accountCurrencyCode);
                    var newValue = Math.ceil(target / roundedValue);
                    this.view.lblMonthValue.text = String(newValue) + " " + kony.i18n.getLocalizedString("i18n.savingsPot.months");
            this.view.slider1.setValue(newValue);
            var roundedAmount = Math.ceil(roundedValue);
            this.view.slider.setValue(roundedAmount);
            this.setError(false);
            this.setFinalDate();
            if (this.view.imgRadioBtn21.text == OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED) {
                        this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(roundedValue, false, self.accountCurrencyCode);
            } else {
                        this.view.tbxFreqAmount.text = this.formatCurrencyWithCommasAndDots(roundedValue / 2, false, self.accountCurrencyCode);
        }
                } else {
          var errText = kony.i18n.getLocalizedString("i18n.savingsPot.monthlyDebitAmountError") + String(this.view.slider.sldSlider.max);
          this.setError(true, errText);
          this.view.lblDateToAchieve.text = "-";
                    this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, self.accountCurrencyCode);
      }
            } else {
        this.initSlider();
        this.view.slider1.sldSlider.setEnabled(true);
        this.view.slider.sldSlider.setEnabled(true);
        this.view.lblDateToAchieve.text = "-";
      }
    },
        /*
     * setDataToForm - set data to form 
     * @param {Object} goalData - contains th =e goal details
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
        setDataToForm: function(editGoalData) {
      var self = this;
      var goalData;
      var config = applicationManager.getConfigurationManager();
      this.accountCurrencyCode = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();  
      this.view.lblCurrency.text = config.getCurrency(self.accountCurrencyCode);
            if (editGoalData.potName) {
                goalData = editGoalData;
            } else {
        goalData = this.savingsPotPresentationController.getSavingPotForId(editGoalData.savingsPotId);  
                goalData.savingsPotId = editGoalData.savingsPotId;
        this.oldGoalData = goalData;
      }
      this.view.tbxGoalName.text = goalData.potName;
      var length = this.view.tbxGoalName.text.length;
            this.view.lblNameCharCount.text = length + "/30";
            this.view.lblGoalAmtResult.text = CommonUtilities.formatCurrencyWithCommas(goalData.targetAmount, false, self.accountCurrencyCode);
            this.view.lblCurrentAmount.text = CommonUtilities.formatCurrencyWithCommas(goalData.availableBalance, false, self.accountCurrencyCode);
      var res = Number(goalData.remainingSavings);
            this.view.lblRemainingAmount.text = CommonUtilities.formatCurrencyWithCommas(res, false, self.accountCurrencyCode);
            this.view.tbxGoalAmount.text = CommonUtilities.formatCurrencyWithCommas(goalData.targetAmount, true, self.accountCurrencyCode);
      this.previousGoalAmount = parseInt(goalData.targetAmount);
            this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(goalData.periodicContribution, false, self.accountCurrencyCode);
            if (goalData.savingsTypeKey) {
     	 this.view.lstGoalType.selectedKey = goalData.savingsTypeKey;
            } else {
         this.view.lstGoalType.selectedKey = goalData.savingsType;
      }
      var finalDate = new Date(goalData.endDate).toDateString().split(" ");;
      this.view.lblDateToAchieve.text = finalDate[2] + " " + finalDate[1] + " " + finalDate[3];
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      var startDateObj = new Date(goalData.startDate);
      this.startDate = startDateObj;
            if (goalData.frequency == OLBConstants.SAVINGS_POT_TRANSACTION_RECURRENCE.MONTHLY) {
          this.view.imgRadioBtn12.text = OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED;
          this.view.imgRadioBtn21.text = OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED;
                this.view.lblFreqDay.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDate");
                var startDate = String(startDateObj.getDate());
          this.setDataToListbox(true);
          this.view.lstDates.selectedKey = startDate;
      	 	CommonUtilities.setText(this.view.lblFreqDay, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDate"), accessibilityConfig); 
            } else {
        this.view.imgRadioBtn12.text = OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED;
        this.view.imgRadioBtn21.text = OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED;
                this.view.lblFreqDay.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDayAck");
                var startDay = String(startDateObj.getDay());
      this.setDataToListbox(false);
      this.view.lstDates.selectedKey = startDay;
       CommonUtilities.setText(this.view.lblFreqDay, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDayAck"), accessibilityConfig); 
      }
      this.view.slider.setValue(Math.ceil(Number(goalData.periodicContribution)));
      this.view.slider1.setValue(goalData.targetPeriod);
            this.view.lblMonthlyAmount.text = CommonUtilities.formatCurrencyWithCommas(goalData.periodicContribution, false, self.accountCurrencyCode);
            this.view.lblMonthValue.text = goalData.targetPeriod + " " + kony.i18n.getLocalizedString("i18n.savingsPot.months");
            this.view.btnContinue.onClick = this.onClickContinue.bind(this, goalData);
      //var dateInParts = goalData.startDate.split('/');
      //var myDate = new Date(dateInParts[2],dateInParts[1]-1, dateInParts[0]);
      //this.setFrequencyLabel(myDate);
      if (this.view.imgRadioBtn12.text === OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED) {
                this.view.lblInfoFreqDay.text = "(" + goalData.frequencyDay + ")";
            } else {
        this.view.lblInfoFreqDay.text = "(" + kony.i18n.getLocalizedString("i18n.savingsPot.everyTwoWeeks") + " " + goalData.frequencyDay + ")";
      }
      // this.view.lstDates.onSelection = this.onSelectionStartDay;
      this.formatAndSetAmount();
    },
      /*
             * setDataToListbox - sets data to startDay list box
             * @param {Boolean} isMonthly is true/false 
             * @member of {frmEditGoalController}
             * @return {}
             * @throws {}
            */
                      setDataToListbox: function(isMonthly) {
            if (isMonthly) {
                          var monthData = [];
                          var date = new Date();
                          for (var i = 1; i <= 31; i++) {
                            var temp = [];
                            var day = String(i);             
                    if (i <= 9) {
                        day = "0" + String(i);
                            }                        
                    temp.push(String(i), day);
                            monthData.push(temp);
                          }
                          this.view.lstDates.masterData = monthData;
                          this.view.lstDates.selectedKey = "1";
            } else {
                var weekData = [
                    ["0", ViewConstants.DAYS.Sunday],
                    ["1", ViewConstants.DAYS.Monday],
                    ["2", ViewConstants.DAYS.Tuesday],
                    ["3", ViewConstants.DAYS.Wednesday],
                    ["4", ViewConstants.DAYS.Thursday],
                    ["5", ViewConstants.DAYS.Friday],
                    ["6", ViewConstants.DAYS.Saturday]
                ];
                          this.view.lstDates.masterData = weekData;
                          this.view.lstDates.selectedKey = "0";
                        }
                      },
     /*
     * setFinalDate - sets the final Date on which the goal will be achieved
     * @param {} 
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
        fetchNextOccurrence: function() {
    var startDateObj = new Date(this.oldGoalData.startDate);
    var nextOccurentDate;
    var date = new Date();
            var edgeDates = [29, 30, 31];
    var lastDayOfStartMonth = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 1, 0);
    var lastDateOfPresentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            if (startDateObj.getTime() < date.getTime()) {
                if (this.oldGoalData.frequency == OLBConstants.SAVINGS_POT_TRANSACTION_RECURRENCE.MONTHLY) {
                    if (date.getDate() <= startDateObj.getDate()) {
                        if ((edgeDates.indexOf(startDateObj.getDate()) > -1) && (lastDayOfStartMonth.getDate() !== lastDateOfPresentMonth.getDate()) && (lastDateOfPresentMonth.getDate() < startDateObj.getDate())) {
             nextOccurentDate = lastDateOfPresentMonth;
                        } else {
             nextOccurentDate = new Date(date.getFullYear(), date.getMonth(), startDateObj.getDate());
          }
                    } else {
                        if (startDateObj.getDate() === lastDayOfStartMonth.getDate()) {
           nextOccurentDate = lastDateOfPresentMonth;
                        } else {
                            nextOccurentDate = new Date(date.getFullYear(), date.getMonth() + 1, startDateObj.getDate());
        }
     
       }
                } else {
      var requiredDays = startDateObj.getDay() - date.getDay();
                    if (date.getDay() > startDateObj.getDay()) {
        requiredDays =  requiredDays + 7;
      }
                    nextOccurentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + requiredDays);
    }
    return nextOccurentDate;
            } else {
      return startDateObj;
  }
   
  },
    /*
   * setFinalDate - sets the final Date on which the goal will be achieved
   * @param {} 
   * @member of {frmCreateSavingsGoalController}
   * @return {}
   * @throws {}
  */
        setFinalDate: function() {
  var startDate = this.fetchNextOccurrence();
  this.startDate = startDate;
  var months = this.view.slider1.getValue();
  months = months == 0  ? 1 : months;
  var goalAmount = this.deformatAmount(this.view.tbxGoalAmount.text);
  var periodicContribution = this.deformatAmount(this.view.lblMonthlyAmount.text);
  var endDate = new Date();
            if (this.oldGoalData.frequency == OLBConstants.SAVINGS_POT_TRANSACTION_RECURRENCE.MONTHLY) {
                endDate = this.getFinalDateForMonthly(startDate, months - 1);
            } else {
                endDate = this.getFinalDateForBiWeekly(startDate, goalAmount, periodicContribution);
  }
  this.endDate = endDate;
  var finalDate = endDate.toDateString().split(" ");
            this.view.lblDateToAchieve.text = finalDate[2] + " " + finalDate[1] + " " + finalDate[3];
        },


 /*
 * getFinalDateForMonthly - calculates final date when monthly option is selected
 * @param {Date} startDate - start date of the pot is passed 
         * @param {Integer} months - number of months 
 * @member of {frmCreateSavingsGoalController}
 * @return {}
 * @throws {}
         */
        getFinalDateForMonthly: function(startDate, months) {
    var tempDate = new Date(startDate);
            var finalDate = new Date(tempDate.setMonth(tempDate.getMonth() + months));
            if (finalDate.getDate() == startDate.getDate()) {
        return finalDate;
            } else {
                var endDate = new Date(finalDate.setMonth(finalDate.getMonth() - 1));
    var lastDay = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
    return lastDay;
  }
        },
        /*
 * getFinalDateForBiWeekly - calculates final date when biweekly option is selected
 * @param {Date} - start Date of the pot
         * @param {Integer} - target amount of the pot
         * @param {Integer} - monthly debit amount
 * @member of {frmCreateSavingsGoalController}
 * @return {}
 * @throws {}
         */
        getFinalDateForBiWeekly: function(startDate, goalAmount, periodicContribution) {
            periodicContribution = periodicContribution / 2;
            var occurences = Math.ceil(goalAmount / periodicContribution);
            var days = (occurences - 1) * 14;
            var endDate = startDate.setDate(startDate.getDate() + days);
  var finalDate = new Date(endDate);
  return finalDate;
        },

    /*
     * fetchDay - fetching the day of the week based on number 
     * @param {Integer} day - number of the day ex: 1 for Monday etc.
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */ 
        fetchDay: function(day) {
      switch (day) {
        case 0:
          return ViewConstants.DAYS.Sunday;
        case 1:
          return ViewConstants.DAYS.Monday;
        case 2:
          return ViewConstants.DAYS.Tuesday;
        case 3:
          return ViewConstants.DAYS.Wednesday;
        case 4:
          return ViewConstants.DAYS.Thursday;
        case 5:
          return ViewConstants.DAYS.Friday;
        case 6:
          return ViewConstants.DAYS.Saturday;
      }
    },
     /*
     * setFrequencyLabel - sets the frequency label based on the Monthly/Biweekly selection
     * @param {} 
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
        setFrequencyLabel: function(date) {
            if (this.view.imgRadioBtn12.text === OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED) {
                if (date.getDate()) {
                    this.view.lblInfoFreqDay.text = "(" + String(date.getDate()).padStart(2, '0') + " " + kony.i18n.getLocalizedString("i18n.savingsPot.ofEveryMonth") + ")";
        
                } else {
                    this.view.lblInfoFreqDay.text = "(" + date.getDate() + " " + kony.i18n.getLocalizedString("i18n.savingsPot.ofEveryMonth") + ")";
        
          }
            } else {
                this.view.lblInfoFreqDay.text = "(" + kony.i18n.getLocalizedString("i18n.savingsPot.everyTwoWeeks") + " " + this.fetchDay(date.getDay()) + ")";
        }
      },
     //UI Code
   /**
  * onBreakpointChange : Handles ui changes on .
  * @member of {frmEditGoalController}
  * @param {integer} width - current browser width
  * @return {}
  * @throws {}
  */
        onBreakpointChange: function(form, width) {
        var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
        FormControllerUtility.setupFormOnTouchEnd(width);
        responsiveUtils.onOrientationChange(this.onBreakpointChange);
        this.view.customheadernew.onBreakpointChangeComponent(width);
        this.view.customfooter.onBreakpointChangeComponent(width);
      },
     /*
     * showServerError - Method to show server error
     * @param {Boolean} status true/false
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
        showServerError: function(status) {
          if (status === false) {
            // this.view.flxMakeTransferError.setVisibility(false);
          } else {

            FormControllerUtility.hideProgressBar(this.view);
          }
          this.view.forceLayout();
        },
       /*
     * init - Method triggered when form is initialized
     * @param {} 
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
        init: function() {
          this.view.preShow = this.preShow;
          this.view.postShow = this.postShow;
          this.view.onDeviceBack = function() {};
          this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnBack.onClick = this.onClickCancel;
          this.view.AllForms.isVisible = false;
          this.restrictSpecialCharacters();
          this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
          FormControllerUtility.wrapAmountField(this.view.tbxGoalAmount).onEndEditing(this.formatAndSetAmount).onKeyUp(this.onKeyUpGoalAmount);
            this.view.tbxGoalName.onEndEditing = this.enableOrDisableContinue;
          this.view.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
          this.setConfig();
      this.initSlider(); 
      this.view.slider.sldSlider.thumbHeight = 38;
      this.view.slider.sldSlider.thumbWidth = 38;
      this.view.slider1.sldSlider.thumbHeight = 38;
      this.view.slider1.sldSlider.thumbWidth = 38;
          this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false);
            this.view.AllForms.flxCross.onTouchEnd = function() {
              this.view.AllForms.isVisible = false;
          }.bind(this);
            this.view.flxWhatisFreqDay.onTouchEnd = function() {
            this.view.AllForms.isVisible = true;
          }.bind(this);
            this.view.tbxGoalName.onTextChange = function() {
            var length = this.view.tbxGoalName.text.length;
                this.view.lblNameCharCount.text = length + "/30";
        }.bind(this);  
          this.view.slider1.sldSlider.setEnabled(true);
          this.view.slider.sldSlider.setEnabled(true);
            this.view.tbxGoalName.onKeyUp = function() {
              //  this.view.tbxGoalName.skin = ViewConstants.SKINS.RECURRENCE_FIELD_FAST_TRANSFER;
            this.setError(false);
          	  CommonUtilities.enableButton(this.view.btnContinue);
			  }.bind(this);

        },
     /*
     * formatAndSetAmount - onEndEditing method for  amount textbox
     * @param {} 
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
        formatAndSetAmount: function() {
              var currCode = this.accountCurrencyCode;
              var config = applicationManager.getConfigurationManager();
              var goalAmount = this.deformatAmount(this.view.tbxGoalAmount.text);
              var currBalAmount = this.deformatAmount(this.view.lblCurrentAmount.text);
            if (isNaN(goalAmount) === false) {
                var roundedOffAmt = Number(goalAmount);
                this.view.tbxGoalAmount.text = CommonUtilities.formatCurrencyWithCommas(roundedOffAmt, true);
                var maxAmt = Number(applicationManager.getConfigurationManager().getMaxGoalAmount());
          		var minAmt = Number(applicationManager.getConfigurationManager().getMinGoalAmount());
                if (roundedOffAmt <= maxAmt && roundedOffAmt >= minAmt) {
                    if (goalAmount > Number(currBalAmount)) {
                isSliderOrGoalTbxChanged = true;
                this.setError(false);
                var result = roundedOffAmt - Number(currBalAmount);
                result = Number(result);
                        this.view.lblRemainingAmount.text = CommonUtilities.formatCurrencyWithCommas(result, false, currCode);
                    } else {
                  isSliderOrGoalTbxChanged = false;
                  var scope = this;
                  scope.setError(true, kony.i18n.getLocalizedString("i18n.savingsPot.errorGoalAmountLessThanCurrBal"));
                  scope.initSlider();
                  scope.view.slider1.sldSlider.setEnabled(false);
                  scope.view.slider.sldSlider.setEnabled(false);
                        scope.view.lblRemainingAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, currCode);
                  return;
                }
                    this.view.lblGoalAmtResult.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxGoalAmount.text, false, currCode);
                } else {
                    this.setError(true, kony.i18n.getLocalizedString("i18n.savingsPot.maxLimitAmountError") + CommonUtilities.formatCurrencyWithCommas(minAmt, true) + " & " + CommonUtilities.formatCurrencyWithCommas(maxAmt, true));
                  this.previousGoalAmount = roundedOffAmt;
				  this.initSlider();
                  this.view.slider1.sldSlider.setEnabled(false);
                  this.view.slider.sldSlider.setEnabled(false);
                  this.view.lblDateToAchieve.text = "-";
                    this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, currCode);
                    this.view.lblRemainingAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, currCode);
                  return;
                }
            } else {
                isSliderOrGoalTbxChanged = false;
                this.view.lblGoalAmtResult.text = config.getCurrency(currCode) + "0.00";
              }
            if (this.previousGoalAmount !== Number(goalAmount) || this.previousGoalAmount === 0) {
        	 this.initSlider();
			 this.previousGoalAmount = Number(goalAmount);
        	 if (Number(goalAmount) > 0) {
             	 this.view.slider1.sldSlider.setEnabled(true);
             	 this.view.slider.sldSlider.setEnabled(true);
          	} else {
              	this.view.slider1.sldSlider.setEnabled(false);
              	this.view.slider.sldSlider.setEnabled(false);
        	  }
           		this.view.lblMonthValue.text = "-";
                this.view.lblMonthlyAmount.text = "-";
        		this.enableOrDisableContinue();
       		 }
            },
             /*
     * deformatAmount - used to deformat the amount
     * @param {} 
     * @member of {frmCreateSavingsGoalController}
     * @return {}
     * @throws {}
    */
   deFormatAmountWithoutPrecision: function() {
    var amount = this.view.tbxGoalAmount.text;
    var deformattedAmount = applicationManager.getFormatUtilManager().deFormatAmountWithoutPrecision(amount);
    this.view.tbxGoalAmount.text = deformattedAmount ? String(deformattedAmount) : "";
 },    
          /*
         * restrictSpecialCharacters - Method to restrict Special Characters entry in textbox
         * @param {} 
         * @member of {frmEditGoalController}
         * @return {}
         * @throws {}
        */
        restrictSpecialCharacters: function() {
              var scopeObj = this;
              var specialCharactersSet =  "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\";
              var specialCharactersSet1 =  "!@#&*_'-~^|$%()+=}{][/|?,.><`:;\"\\";
              var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            scopeObj.view.tbxGoalAmount.restrictCharactersSet = specialCharactersSet1.replace(',', '') + alphabetsSet + alphabetsSet.toUpperCase();
              scopeObj.view.tbxGoalName.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.", '');
            },
          /*
         * setActiveHeaderHamburger - Method to highlight active header and hamburger
         * @param {} 
         * @member of {frmEditGoalController}
         * @return {}
         * @throws {}
         */
                  setActiveHeaderHamburger: function() {
                    this.view.customheadernew.activateMenu("Accounts", "My Accounts");
                    this.view.customheadernew.flxContextualMenu.setVisibility(false);
                    this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
                  },
           /*
           * setConfig - setting toolTIp and accessibility configs
           * @param {} 
           * @member of {frmEditGoalController}
           * @return {}
           * @throws {}
           */
        setConfig: function() {
                      this.view.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
                      this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
                      this.view.lblGoalName.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalName");
                      this.view.lblGoalType.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalType");
                      this.view.lblGoalAmount.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
                      this.view.lblTitleFreq.toolTip = kony.i18n.getLocalizedString("i18n.PayPerson.frequency");
                      this.view.lblFreqDay.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDay");
                      this.view.lblTitleDate.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.dateToAchieve");
                      this.view.lblTitleGoalAmt.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
                      this.view.tbxGoalAmount.placeholder = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
                      this.view.tbxGoalName.placeholder =  kony.i18n.getLocalizedString("i18n.savingsPot.typeYourGoalName");
                      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                      CommonUtilities.setText(this.view.btnContinue, kony.i18n.getLocalizedString("i18n.PayAPerson.Update"), accessibilityConfig);
                      CommonUtilities.setText(this.view.btnBack, kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK"), accessibilityConfig);
                      CommonUtilities.setText(this.view.lblGoalType, kony.i18n.getLocalizedString("i18n.savingsPot.goalType"), accessibilityConfig);
                      CommonUtilities.setText(this.view.lblGoalName, kony.i18n.getLocalizedString("i18n.savingsPot.goalName"), accessibilityConfig);
                      CommonUtilities.setText(this.view.lblGoalAmount, kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount"), accessibilityConfig);
                      CommonUtilities.setText(this.view.lblTitleFreq, kony.i18n.getLocalizedString("i18n.PayPerson.frequency"), accessibilityConfig);
                      CommonUtilities.setText(this.view.lblFreqDay, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDay"), accessibilityConfig);
                      CommonUtilities.setText(this.view.lblTitleDate, kony.i18n.getLocalizedString("i18n.savingsPot.dateToAchieve"), accessibilityConfig);
                      CommonUtilities.setText(this.view.lblTitleGoalAmt, kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount"), accessibilityConfig);
                    },
          /*
           * deformatAmount - used to deformat the amount
           * @param {} 
           * @member of {frmEditGoalController}
           * @return {}
           * @throws {}
          */
                        deformatAmount: function(amount) {
            return applicationManager.getFormatUtilManager().deFormatAmount(amount, ["$", "€", "£"]);
                        },
             /*
             * postShow - post show Method 
             * @param {} 
             * @member of {frmEditGoalController}
             * @return {}
             * @throws {}
            */
                          postShow: function() {
                            this.view.customheadernew.forceCloseHamburger();
                            this.setActiveHeaderHamburger();
                            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.editGoal");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
                            var currBreakpoint = kony.application.getCurrentBreakpoint();
                            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                              this.view.flxMain.height = "1400dp";
                            }
                            if (currBreakpoint === 1024 || orientationHandler.isTablet) {
                              this.view.flxCreateSavingsGoals.height = "840dp";
                            }
                            applicationManager.getNavigationManager().applyUpdates(this);
                            FormControllerUtility.hideProgressBar(this.view);
                          },
             /*
             * preShow - pre show Method
             * @param {} 
             * @member of {frmEditGoalController}
             * @return {}
             * @throws {}
            */
                            preShow: function() {
                              this.previousGoalAmount = 0;
          //  this.view.tbxGoalName.skin = ViewConstants.SKINS.RECURRENCE_FIELD_FAST_TRANSFER;
        					  this.setError(false);
                              this.setDataToCategoryList();
                              this.view.customheadernew.setFocus(true);
                              this.view.customheadernew.flxContextualMenu.setVisibility(false);
                              this.view.tbxFreqAmount.setEnabled(false);
                              this.view.flxRadioBtn1.setEnabled(false);
                              this.view.flxRadioBtn2.setEnabled(false);
                              this.view.lstDates.setEnabled(false);
                              FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
                            },
     /*
     * checkDuplicateName - Method to check duplicate goal name
     * @param {} 
     * @member of {frmEditGoalController}
     * @return {}
     * @throws {}
    */
        checkDuplicateName: function(goalData) {
        var name = this.view.tbxGoalName.text;
            var potList = this.savingsPotPresentationController.getGoalList();
            for (var index in potList) {
                if (name.toUpperCase() === potList[index].potName.toUpperCase()) {
                    if (goalData.savingsPotId !== potList[index].savingsPotId) {
                        this.view.tbxGoalName.skin = ViewConstants.SKINS.FLEX_ERROR_SKIN;
                    this.setError(true, kony.i18n.getLocalizedString("i18n.savingsPot.warningGoalNameExists"))
                    }
                }
            }
        
      },
    
            /*
           * onClickContinue - Method that navigates to confirmation form
           * @param {} 
           * @member of {frmEditGoalController}
           * @return {}
           * @throws {}
          */
        onClickContinue: function(goalData) {
                                var self = this;
                                this.checkDuplicateName(goalData);
            if (!this.view.lblWarningNameExists.isVisible) {
              FormControllerUtility.showProgressBar(this.view);
              var formatUtil = applicationManager.getFormatUtilManager();    
              //goalData.savingsTypeKey = this.view.lstGoalType.selectedKey;
              //goalData.savingsType = this.view.lstGoalType.selectedKeyValue[1],
              goalData.savingsType = this.view.lstGoalType.selectedKey;
              goalData.potName = this.view.tbxGoalName.text;
              goalData.targetAmount = this.deformatAmount(this.view.tbxGoalAmount.text);
              goalData.targetPeriod = this.getPeriod(this.view.lblMonthValue.text);
                if (this.startDate !== undefined) {
                                    goalData.startDate = formatUtil.getFormatedDateString(this.startDate, formatUtil.getBackendDateFormat());
                                  }
                                  goalData.periodicContribution = this.deformatAmount(this.view.tbxFreqAmount.text);
                                goalData.remainingSavings = this.deformatAmount(this.view.lblRemainingAmount.text);
              var finalDate = new Date(goalData.endDate).toDateString().split(" ");
              var oldDate = finalDate[2] + " " + finalDate[1] + " " + finalDate[3];
              if (oldDate === this.view.lblDateToAchieve.text) {
                // Do Nothing, goalData.endDate remains same
              } else { //when the Date to Achieve is changed, goalData.endDate is also updated
                goalData.endDate = formatUtil.getFormatedDateString(this.endDate, formatUtil.getBackendDateFormat());
              }
                if (this.view.imgRadioBtn12.text == OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED) {
                                  goalData.frequency = OLBConstants.SAVINGS_POT_TRANSACTION_RECURRENCE.MONTHLY;
                } else {
                                  goalData.frequency = OLBConstants.SAVINGS_POT_TRANSACTION_RECURRENCE.BIWEEKLY;  
                                }
                                goalData.frequencyDate = goalData.frequencyDay;   
                                goalData.currency = self.accountCurrencyCode;
                                FormControllerUtility.showProgressBar(this.view);
                this.savingsPotPresentationController.presentUserInterface("frmCreateGoalConfirm", {
                    editGoalData: goalData
                });
                                }
                              },
     			 /*
                 * getPeriod - Method that returns the Number of months
                 * @param {String}- period 
                 * @member of {frmEditGoalController}
                 * @return {}
                 * @throws {}
                */
        getPeriod: function(period) {
            if (period.indexOf(" ") != -1) {
                                  return period.split(" ")[0];
                                }
                            },
                  /*
                 * enableOrDisableContinue - Method that enables or disbles Continue based on fields 
                 * @param {} 
                 * @member of {frmEditGoalController}
                 * @return {}
                 * @throws {}
                */
        enableOrDisableContinue: function() {
                                this.view.tbxGoalName.text = this.view.tbxGoalName.text.trim();
								              var length = this.view.tbxGoalName.text.length;
           	         					this.view.lblNameCharCount.text = length + "/30";
                                var enableContinue = this.checkAllFields();
                                if (enableContinue) {
                                  CommonUtilities.enableButton(this.view.btnContinue);
            } else {
                                  CommonUtilities.disableButton(this.view.btnContinue);
                                }
                              },
                 /*
                 * checkAllFields - Method that checks the values of all the textboxes before continuing to next Page
                 * @param {} 
                 * @member of {frmEditGoalController}
                 * @return {}
                 * @throws {}
                */
        checkAllFields: function() {
                                    var self = this;
                                    var re = new RegExp("^([0-9])+(\.[0-9]{1,2})?$");
                                    var amount = this.view.tbxGoalAmount.text;
            if (this.view.lstGoalType.selectedKey === "" || this.view.lstGoalType.selectedKey === null)
                                    return false;
            else if (this.view.tbxGoalName.text === "" || this.view.tbxGoalName.text === null)
                                      return false;
                                    else if (this.view.lblDateToAchieve.text == "-") 
                                      return false;
                                    else  if (amount === null || amount === "" || isNaN(self.deformatAmount(amount)) || !re.test(self.deformatAmount(amount)) || (parseFloat(self.deformatAmount(amount)) <= 0))
                                      return false;
            else if (this.view.lblMonthValue.text == "-")
                                      return false;
                                    else
                                      return true;
                                  },
                       /*
                       * onClickCancel - Method that navigates to previous form frmCreateSavingsPot
                       * @param {} 
                       * @member of {frmEditGoalController}
                       * @return {}
                       * @throws {}
                      */
        onClickCancel: function() {
                                      FormControllerUtility.showProgressBar(this.view);
                                      var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
                                      this.savingsPotPresentationController.fetchSavingsPot(accountID);
                                    },
                       /*
                       * onKeyUpGoalAmount - Method called on onKeyUp of GoalAmount - to set RemainingSavings as zero
                       * @param {} 
                       * @member of {frmEditGoalController}
                       * @return {}
                       * @throws {}
                      */
        onKeyUpGoalAmount: function() {
                                  var self = this;
            this.view.lblRemainingAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, self.accountCurrencyCode);
                                },
                                 /*
     * setDataToCategoryList - sets data to goal type listbox 
     * @param {} 
     * @member of {frmCreateSavingsGoalController}
     * @return {}
     * @throws {}
    */
        setDataToCategoryList: function() {
          var categResult = [];
          categResult = this.savingsPotPresentationController.getSavingsPotCategories({});
          var categArr = [];
          for (var i = 0; i < categResult.length; i++) {
            var temp = [];
            temp.push(String(categResult[i].name), String(categResult[i].description));
            categArr.push(temp);
          }
           this.view.lstGoalType.masterData = categArr;
           this.view.lstGoalType.selectedKey = categArr[0][0];
      },

        formatCurrencyWithCommasAndDots: function(amount, currencySymbolNotRequired, currencySymbolCode) {
        var formatManager = applicationManager.getFormatUtilManager();
            amount = formatManager.deFormatAmount(amount, ["$", "€", "£"]);
        if (currencySymbolNotRequired) {
           return formatManager.formatAmount(amount);
            } else if (currencySymbolCode) {
                return formatManager.formatAmountandAppendCurrencySymbol(amount, currencySymbolCode);
        } else {
           return formatManager.formatAmountandAppendCurrencySymbol(amount);
      }
    }
                   
  
    };
});