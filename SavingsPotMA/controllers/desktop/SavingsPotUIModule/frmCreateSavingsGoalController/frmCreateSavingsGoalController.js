define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();

    return {
        endDate: new Date(),
        maxLimitMonth: 0,
        maxLimitAmount: 0,
        minLimitMonth: 0,
        minLimitAmount: 0,
        previousGoalAmount: 0,
        accountCurrencyCode: "USD",

        /*
         * updateFormUI - it updates the form ui
         * @param {Object} createsavingsGoal view model object
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.serverError) {
                    this.showServerError(uiData.serverError);
                } else {
                    //this.showServerError(false);
                    if (uiData.showLoadingIndicator) {
                        if (uiData.showLoadingIndicator.status === true) {
                            FormControllerUtility.showProgressBar(this.view)
                        } else {
                            FormControllerUtility.hideProgressBar(this.view)
                        }
                    }
                    if (uiData.createGoalData) {
                        this.setGoalDataToUI(uiData.createGoalData);
                    }

                }
            }
        },
        /*
         * initSlider -  Method to initialize the Slider with values & adding callback methods for the sliders
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        initSlider: function() {
            var minLimit = 0; //applicationManager.getConfigurationManager().getMinMonthlyDebitAmount();
            var maxLimit = applicationManager.getConfigurationManager().getMaxMonthlyDebitAmount();
            var defaultValue = 0; //applicationManager.getConfigurationManager().getMinMonthlyDebitAmount();
            var stepLimit = 1000;
            var config = applicationManager.getConfigurationManager();
            var currencySymbol = config.getCurrency(this.accountCurrencyCode);
            this.view.slider.initialize(minLimit, maxLimit, defaultValue, stepLimit, true, currencySymbol, "");
            this.maxLimitAmount = Number(maxLimit);
            this.minLimitAmount = Number(minLimit);
            var minLimit2 = 0; //applicationManager.getConfigurationManager().getMinMonths();
            var maxLimit2 = applicationManager.getConfigurationManager().getMaxMonths();
            var defaultValue2 = 0; //applicationManager.getConfigurationManager().getMinMonths();
            var stepLimit2 = 5;
            this.view.slider1.initialize(minLimit2, maxLimit2, defaultValue2, stepLimit2, false, "", "months");
            this.maxLimitMonth = Number(maxLimit2);
            this.minLimitMonth = Number(minLimit2);
            this.view.lblMonthlyAmount.text = "-";
            this.view.lblMonthValue.text = "-";
            this.view.slider1.setOnTouchEndCallback(this.termSliderCallBack);
            this.view.slider.setOnTouchEndCallback(this.amountSliderCallback);
        },
        /*
         * setError -  method to set error message 
         * @param {boolean} flag to show the error or not
         * @param {errorMessage} the error message to be displayed
         * @member of {frmCreateSavingsGoalController}
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
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        amountSliderCallback: function() {
            var monthlyAmount = this.view.slider.getValue();
            this.setMonthSlider(monthlyAmount);
            this.enableOrDisableContinue();
        },
        /*
         * termSliderCallBack -  callback method triggered when termSlider is changed
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        termSliderCallBack: function() {
            var months = this.view.slider1.getValue();
            this.setAmountSlider(months);
            this.enableOrDisableContinue();
        },
        /*
         * setMonthSlider -  logic for setting month Slider based on number of months
         * @param {value} number of months
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        setMonthSlider: function(value) {
            var self = this;
            var target = Number(this.deformatAmount(this.view.tbxGoalAmount.text));
            if (value > 0) {
                this.view.lblMonthlyAmount.text = CommonUtilities.formatCurrencyWithCommas(value, false, self.accountCurrencyCode);
                var sliderValue = (target / value);
                this.view.lblMonthValue.text = String(sliderValue) + " " + kony.i18n.getLocalizedString("i18n.savingsPot.months");
                if ((sliderValue * value) == target && Math.round(sliderValue) == sliderValue && sliderValue <= this.view.slider1.sldSlider.max && sliderValue >= this.view.slider1.sldSlider.min) {
                    this.view.slider1.setValue(sliderValue);
                    this.setError(false);
                    this.setFinalDate();
                    if (this.view.imgRadioBtn21.text == OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED) {
                        this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(value, false, self.accountCurrencyCode);
                    } else {
                        this.view.tbxFreqAmount.text = this.formatCurrencyWithCommasAndDots(value / 2, false, self.accountCurrencyCode);
                    }
                    this.enableFreqRadioButtons(true);
                } else if ((sliderValue * value) != target || Math.round(sliderValue) != sliderValue) {
                    /* this.setError(true, kony.i18n.getLocalizedString("i18n.savingsPot.periodOfMonthsSliderError"));
                    this.view.lblDateToAchieve.text = "-";
                    this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false);
                    this.enableFreqRadioButtons(false);*/
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
                    this.enableFreqRadioButtons(true);
                } else if (sliderValue > this.view.slider1.sldSlider.max) {
                    var errText = kony.i18n.getLocalizedString("i18n.savingsPot.goalPeriodError") + String(this.view.slider1.sldSlider.max);
                    this.setError(true, errText);
                    this.view.lblDateToAchieve.text = "-";
                    this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, self.accountCurrencyCode);
                    this.enableFreqRadioButtons(false);
                } else if (sliderValue < this.view.slider1.sldSlider.min) {
                    var errText = kony.i18n.getLocalizedString("i18n.savingsPot.goalPeriodMinError") + String(this.view.slider1.sldSlider.min);
                    this.setError(true, errText);
                    this.view.lblDateToAchieve.text = "-";
                    this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, self.accountCurrencyCode);
                    this.enableFreqRadioButtons(false);
                }
            } else {
                this.initSlider();
                this.view.slider1.sldSlider.setEnabled(true);
                this.view.slider.sldSlider.setEnabled(true);
                this.view.lblDateToAchieve.text = "-";
                this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, self.accountCurrencyCode);
                this.enableFreqRadioButtons(false);
            }
        },
        /*
         * setAmountSlider -  logic for setting amount Slider based on number of months
         * @param {Integer} value - number of months
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        setAmountSlider: function(value) {
            var self = this;
            var target = Number(this.deformatAmount(this.view.tbxGoalAmount.text));
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
                    this.enableFreqRadioButtons(true);
                } else if ((sliderValue * value) != target || Math.round(sliderValue) != sliderValue) {
                    /*  this.setError(true, kony.i18n.getLocalizedString("i18n.savingsPot.monthlyDebitAmountSliderError"));
                    this.view.lblDateToAchieve.text = "-";
                    this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false);
                    this.enableFreqRadioButtons(false);*/
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
                    this.enableFreqRadioButtons(true);
                } else if (sliderValue > this.view.slider.sldSlider.max) {
                    var errText = kony.i18n.getLocalizedString("i18n.savingsPot.monthlyDebitAmountError") + String(this.view.slider.sldSlider.max);
                    this.setError(true, errText);
                    this.view.lblDateToAchieve.text = "-";
                    this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, self.accountCurrencyCode);
                    this.enableFreqRadioButtons(false);
                } else if (sliderValue < this.view.slider.sldSlider.min) {
                    var errText = kony.i18n.getLocalizedString("i18n.savingsPot.monthlyDebitAmountMinError") + String(this.view.slider.sldSlider.min);
                    this.setError(true, errText);
                    this.view.lblDateToAchieve.text = "-";
                    this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, self.accountCurrencyCode);
                    this.enableFreqRadioButtons(false);
                }
            } else {
                this.initSlider();
                this.view.slider1.sldSlider.setEnabled(true);
                this.view.slider.sldSlider.setEnabled(true);
                this.view.lblDateToAchieve.text = "-";
                this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, self.accountCurrencyCode);
                this.enableFreqRadioButtons(false);
            }
        },
        /*
         * fetchDay - fetching the day of the week based on number 
         * @param {Integer} day - number of the day ex: 1 for Monday etc.
         * @member of {frmCreateSavingsGoalController}
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
         * setGoalDataToUI - setting Goal Data to UI
         * @param {Object} goal Data to be set to the form is passed 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        setGoalDataToUI: function(createGoalData) {
            var self = this;
            var length = this.view.tbxGoalName.text.length;
            this.view.lblNameCharCount.text = length + "/30";
            var today = new Date();
            var config = applicationManager.getConfigurationManager();
            this.accountCurrencyCode = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            this.view.CalenderPayOffDate.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
            CommonUtilities.disableOldDaySelection(this.view.CalenderPayOffDate);
            this.view.CalenderPayOffDate.onSelection = this.onDateChanged;
            this.view.CalenderPayOffDate.hidePreviousNextMonthDates = true;
            this.setFrequencyLabel();
            this.formatAndSetAmount();
            this.view.lblCurrency.text = config.getCurrency(self.accountCurrencyCode);
            this.view.btnContinue.onClick = this.onClickContinue.bind(this, createGoalData);
            if (createGoalData.isModify) {
                this.view.lstGoalType.selectedKey = createGoalData.savingsTypeKey;
                this.view.tbxGoalName.text = createGoalData.potName;
                var length = this.view.tbxGoalName.text.length;
                this.view.lblNameCharCount.text = length + "/30";
                this.view.lblInfoFreqDay.text = "(" + createGoalData.frequencyDate + ")";
                this.view.tbxGoalAmount.text = CommonUtilities.formatCurrencyWithCommas(createGoalData.targetAmount, true);
                this.previousGoalAmount = Number(createGoalData.targetAmount);
                this.view.lblGoalAmtResult.text = CommonUtilities.formatCurrencyWithCommas(createGoalData.targetAmount, false, self.accountCurrencyCode);
                this.view.lblMonthlyAmount.text = CommonUtilities.formatCurrencyWithCommas(createGoalData.periodicContribution, false, self.accountCurrencyCode);
                this.view.lblMonthValue.text = createGoalData.targetPeriod + " " + kony.i18n.getLocalizedString("i18n.savingsPot.months");
                if (createGoalData.frequency == OLBConstants.SAVINGS_POT_TRANSACTION_RECURRENCE.MONTHLY) {
                    this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(createGoalData.periodicContribution, false, self.accountCurrencyCode);
                    this.view.imgRadioBtn12.text = OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED;
                    this.view.imgRadioBtn21.text = OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED;
                } else {
                    this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas((createGoalData.periodicContribution) / 2, false, self.accountCurrencyCode);
                    this.view.imgRadioBtn12.text = OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED;
                    this.view.imgRadioBtn21.text = OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED;
                }
                var dateInParts = createGoalData.startDate.split('-');
                this.view.CalenderPayOffDate.dateComponents = [dateInParts[2], dateInParts[1], dateInParts[0]];
                this.view.slider.setValue(parseInt(createGoalData.periodicContribution));
                this.view.slider1.setValue(parseInt(createGoalData.targetPeriod));
                this.view.slider1.sldSlider.setEnabled(true);
                this.view.slider.sldSlider.setEnabled(true);
                this.setFinalDate();
                CommonUtilities.enableButton(this.view.btnContinue);
                /*  var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                  if(goalData.frequency== OLBConstants.SAVINGS_POT_TRANSACTION_RECURRENCE.MONTHLY){
                      this.view.lblFreqDay.toolTip=kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDate");
                      CommonUtilities.setText(this.view.lblFreqDay, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDate"), accessibilityConfig); 
                  }
                  else{
                      this.view.lblFreqDay.toolTip=kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDay");
                      CommonUtilities.setText(this.view.lblFreqDay, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDay"), accessibilityConfig); 
                  }*/
            }
        },
        /*
         * setFrequencyLabel - sets the frequency label based on the Monthly/Biweekly selection
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        setFrequencyLabel: function() {
            var dateString = this.view.CalenderPayOffDate.formattedDate;
            var date = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(dateString, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
            if (this.view.imgRadioBtn12.text === OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED) {
                if (date.getDate() < 10) {
                    this.view.lblInfoFreqDay.text = "(" + String(date.getDate()).padStart(2, '0') + " " + kony.i18n.getLocalizedString("i18n.savingsPot.ofEveryMonth") + ")";
                } else {
                    this.view.lblInfoFreqDay.text = "(" + date.getDate() + " " + kony.i18n.getLocalizedString("i18n.savingsPot.ofEveryMonth") + ")";
                }

            } else {
                this.view.lblInfoFreqDay.text = "(" + kony.i18n.getLocalizedString("i18n.savingsPot.everyTwoWeeks") + " " + this.fetchDay(date.getDay()) + ")";
            }
        },
        onDateChanged: function() {
            this.setFrequencyLabel();
            if (this.view.flxRadioBtn1.enable) {
                this.setFinalDate();
            }
        },
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmCreateSavingsGoalController}
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
          	this.enableOrDisableContinue();
        },
        /*
         * setFinalDate - sets the final Date on which the goal will be achieved
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        setFinalDate: function() {
            var startDate = new Date(this.view.CalenderPayOffDate.formattedDate);
            var months = this.view.slider1.getValue();
            var goalAmount = this.deformatAmount(this.view.tbxGoalAmount.text);
            var periodicContribution = this.deformatAmount(this.view.lblMonthlyAmount.text);
            var endDate = new Date();
            if (this.view.imgRadioBtn12.text == OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED) {
                endDate = this.getFinalDateForMonthly(startDate, months - 1);
            } else if (this.view.imgRadioBtn21.text == OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED) {
                endDate = this.getFinalDateForBiWeekly(startDate, goalAmount, periodicContribution);
            }
            this.endDate = endDate;
            var finalDate = endDate.toDateString().split(" ");
            this.view.lblDateToAchieve.text = finalDate[1] + " " + finalDate[2] + " " + finalDate[3];
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
         * showServerError - Method to show server error
         * @param {Boolean} status true/false
         * @member of {frmCreateSavingsGoalController}
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
         * restrictSpecialCharacters - Method to restrict Special Characters entry in textbox
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        restrictSpecialCharacters: function() {
            var scopeObj = this;
            var specialCharactersSet = "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\";
            var specialCharactersSet1 = "!@#&*_'-~^|$%()+=}{][/|?,.><`:;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            scopeObj.view.tbxGoalAmount.restrictCharactersSet = specialCharactersSet1.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
            scopeObj.view.tbxGoalName.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.", '');
        },
        /*
         * init - Method trigegred when form is initialized
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnBack.onClick = this.onClickCancel;
            this.view.startDateInfo.isVisible = false;
            CommonUtilities.disableButton(this.view.btnContinue);
            this.initSlider();
            this.view.slider.sldSlider.thumbHeight = 38;
            this.view.slider.sldSlider.thumbWidth = 38;
            this.view.slider1.sldSlider.thumbHeight = 38;
            this.view.slider1.sldSlider.thumbWidth = 38;
            this.view.lblDateToAchieve.text = "-";
            this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false);
            this.setConfig();
            this.restrictSpecialCharacters();
            FormControllerUtility.wrapAmountField(this.view.tbxGoalAmount).onEndEditing(this.formatAndSetAmount);
            this.view.tbxGoalName.onEndEditing = this.enableOrDisableContinue;
            this.view.CalenderPayOffDate.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            var context1 = {
                "widget": this.view.flxCalendarAchor,
                "anchor": "top"
            };
            this.view.CalenderPayOffDate.setContext(context1);
            var today = new Date();
            this.view.CalenderPayOffDate.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
            this.enableFreqRadioButtons(false);
            this.view.startDateInfo.flxCross.onTouchEnd = function() {
                this.view.startDateInfo.isVisible = false;
            }.bind(this);
            this.view.flxWhatisFreqDay.onTouchEnd = function() {
                this.view.startDateInfo.isVisible = true;
            }.bind(this);
            this.view.tbxGoalName.onTextChange = function() {
                var length = this.view.tbxGoalName.text.length;
                this.view.lblNameCharCount.text = length + "/30";
            }.bind(this);
            this.view.flxRadioBtn1.onTouchEnd = this.onClickMonthly;
            this.view.flxRadioBtn2.onTouchEnd = this.onClickBiweekly;
            this.view.tbxGoalName.onKeyUp = function() {
                // this.view.tbxGoalName.skin = ViewConstants.SKINS.RECURRENCE_FIELD_FAST_TRANSFER;
                this.setError(false);
                if (this.view.tbxGoalAmount.text !== "") {
                    CommonUtilities.enableButton(this.view.btnContinue);
                }
            }.bind(this);
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
        },
        /*
         * deFormatAmountWithoutPrecision - used to deformat the amount without decimal precision
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
         * formatAndSetAmount - onEndEditing method for  amount textbox
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        formatAndSetAmount: function() {
            var currCode = this.accountCurrencyCode;
            var config = applicationManager.getConfigurationManager();
            this.view.lblGoalAmtResult.text = config.getCurrency(currCode) + "0.00";
            this.setError(false);
            var text = this.deformatAmount(this.view.tbxGoalAmount.text);
            if (isNaN(text) === false) {
                var roundedOffAmt = Number(text);
                this.view.tbxGoalAmount.text = CommonUtilities.formatCurrencyWithCommas(roundedOffAmt, true);
                var maxAmt = Number(applicationManager.getConfigurationManager().getMaxGoalAmount());
                var minAmt = Number(applicationManager.getConfigurationManager().getMinGoalAmount());
                if ((roundedOffAmt > maxAmt) || (roundedOffAmt < minAmt)) {
                    this.setError(true, kony.i18n.getLocalizedString("i18n.savingsPot.maxLimitAmountError") + CommonUtilities.formatCurrencyWithCommas(minAmt, true) + " & " + CommonUtilities.formatCurrencyWithCommas(maxAmt, true));
                    this.view.slider.setValue(0);
                    this.view.slider1.setValue(0);
                    this.view.slider1.sldSlider.setEnabled(false);
                    this.view.slider.sldSlider.setEnabled(false);
                    this.previousGoalAmount = roundedOffAmt;
                    this.enableFreqRadioButtons(false);
                    this.view.lblDateToAchieve.text = "-";
                    this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false, currCode);
                    return;
                }
                this.view.lblGoalAmtResult.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxGoalAmount.text, false, currCode);
            } else {
                this.view.lblGoalAmtResult.text = config.getCurrency(currCode) + "0.00";
                this.view.tbxFreqAmount.text = config.getCurrency(currCode) + "0.00";
            }
            if (this.previousGoalAmount !== Number(text) || this.previousGoalAmount === 0) {
                this.initSlider();
                this.previousGoalAmount = Number(text);
                if (parseInt(text) > 0) {
                    this.view.slider1.sldSlider.setEnabled(true);
                    this.view.slider.sldSlider.setEnabled(true);
                } else {
                    this.view.slider1.sldSlider.setEnabled(false);
                    this.view.slider.sldSlider.setEnabled(false);
                }
                this.enableOrDisableContinue();
            }
        },
        /*
         * onClickBiweekly - method to calculate biweekly amount on click of RadioButton
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        onClickBiweekly: function() {
            var self = this;
            this.view.imgRadioBtn12.text = OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED;
            this.view.imgRadioBtn21.text = OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            /*        this.view.lblFreqDay.toolTip=kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDayAck");
                    CommonUtilities.setText(this.view.lblFreqDay, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDayAck"), accessibilityConfig); 
                    */
            var temp = this.deformatAmount(this.view.lblMonthlyAmount.text);
            if (isNaN(temp) === false) {
                var result = temp / 2;
                this.view.tbxFreqAmount.text = this.formatCurrencyWithCommasAndDots(result, false, self.accountCurrencyCode);
            }
            this.setFrequencyLabel();
            this.setFinalDate();
        },
        /*
         * onClickMonthly - method to calculate monthly amount on click of RadioButton
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        onClickMonthly: function() {
            var self = this;
            this.view.imgRadioBtn12.text = OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED;
            this.view.imgRadioBtn21.text = OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED;
            /*var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.lblFreqDay.toolTip=kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDate");
            CommonUtilities.setText(this.view.lblFreqDay, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDate"), accessibilityConfig); 
            */
            var temp = this.deformatAmount(this.view.lblMonthlyAmount.text);
            if (isNaN(temp) === false) {
                var result = temp;
                this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(result, false, self.accountCurrencyCode);
            }
            this.setFrequencyLabel();
            this.setFinalDate();
        },
        /*
         * setActiveHeaderHamburger - Method to highlight active header and hamburger
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
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
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        setConfig: function() {
            this.view.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.lblGoalName.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalName");
            this.view.lblGoalType.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalType");
            this.view.lblGoalAmount.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
            this.view.lblTitleFreq.toolTip = kony.i18n.getLocalizedString("i18n.PayPerson.frequency");
            this.view.lblFreqDay.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDay");
            this.view.lblTitleDate.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.dateToAchieve");
            this.view.lblTitleGoalAmt.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
            this.view.tbxGoalAmount.placeholder = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmountPlaceHolder");
            this.view.tbxGoalName.placeholder = kony.i18n.getLocalizedString("i18n.savingsPot.typeYourGoalName");
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.btnContinue, kony.i18n.getLocalizedString("i18n.userManagement.Continue"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnBack, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
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
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        deformatAmount: function(amount) {
            return applicationManager.getFormatUtilManager().deFormatAmount(amount, ["$", "€", "£"]);
        },
        /*
         * postShow - post show Method 
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.setActiveHeaderHamburger();
            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.lblTitleCreateGoal");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            FormControllerUtility.hideProgressBar(this.view);
        },
        /*
         * preShow - pre show Method
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        preShow: function() {
            this.previousGoalAmount = 0;
            // this.view.tbxGoalName.skin = ViewConstants.SKINS.RECURRENCE_FIELD_FAST_TRANSFER;
            this.setError(false);
            this.setDataToCategoryList();
            this.view.tbxGoalName.text = "";
            this.view.tbxGoalAmount.text = "";
            this.view.lblDateToAchieve.text = "-";
            this.view.tbxFreqAmount.text = CommonUtilities.formatCurrencyWithCommas(0, false);
            this.view.lblGoalAmtResult.text = CommonUtilities.formatCurrencyWithCommas(0, false);
            this.initSlider();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.tbxFreqAmount.setEnabled(false);
            this.view.lblGoalAmtResult.text = "-";
            this.view.imgRadioBtn12.text = OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED;
            this.view.imgRadioBtn21.text = OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED;
            CommonUtilities.disableButton(this.view.btnContinue);
        },
        /*
         * checkDuplicateName - Method to check duplicate goal name
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        checkDuplicateName: function() {
            var name = this.view.tbxGoalName.text;
            var potList = this.savingsPotPresentationController.getGoalList();
            for (var index in potList) {
                if (name.toUpperCase() === potList[index].potName.toUpperCase()) {
                    this.view.tbxGoalName.skin = ViewConstants.SKINS.FLEX_ERROR_SKIN;
                    this.setError(true, kony.i18n.getLocalizedString("i18n.savingsPot.warningGoalNameExists"))
                }
            }

        },
        /*
         * onClickContinue - Method that navigates to confirmation form
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        onClickContinue: function(goalData) {
            this.checkDuplicateName();
            if (!this.view.lblWarningNameExists.isVisible) {
                FormControllerUtility.showProgressBar(this.view);
                goalData.savingsTypeKey = this.view.lstGoalType.selectedKey;
                goalData.currency = this.accountCurrencyCode;
                goalData.savingsType = this.view.lstGoalType.selectedKeyValue[1],
                    goalData.potName = this.view.tbxGoalName.text;
                goalData.targetAmount = this.deformatAmount(this.view.tbxGoalAmount.text);
                goalData.targetPeriod = this.getPeriod(this.view.lblMonthValue.text);
                goalData.periodicContribution = this.deformatAmount(this.view.tbxFreqAmount.text);
                if (this.view.imgRadioBtn12.text == OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED) {
                    goalData.frequency = OLBConstants.SAVINGS_POT_TRANSACTION_RECURRENCE.MONTHLY;
                } else {
                    goalData.frequency = OLBConstants.SAVINGS_POT_TRANSACTION_RECURRENCE.BIWEEKLY;
                }
                goalData.frequencyDate = this.view.lblInfoFreqDay.text.substring(1, this.view.lblInfoFreqDay.text.length - 1)
                var formatUtil = applicationManager.getFormatUtilManager();
                var startDate = new Date(this.view.CalenderPayOffDate.formattedDate);
                goalData.startDate = formatUtil.getFormatedDateString(startDate, formatUtil.getBackendDateFormat());
                goalData.endDate = formatUtil.getFormatedDateString(this.endDate, formatUtil.getBackendDateFormat());
                goalData.isModify = true;
                this.savingsPotPresentationController.presentUserInterface("frmCreateGoalConfirm", {
                    createGoalData: goalData
                });
            }
        },

        getPeriod: function(period) {
            if (period.indexOf(" ") != -1) {
                return period.split(" ")[0];
            }
        },

        /*
         * enableOrDisableContinue - Method that enables or disbles Continue based on fields 
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
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
         * @member of {frmCreateSavingsGoalController}
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
            else if (amount === null || amount === "" || isNaN(self.deformatAmount(amount)) || !re.test(self.deformatAmount(amount)) || (parseFloat(self.deformatAmount(amount)) <= 0))
                return false;
            else if (this.view.lblDateToAchieve.text == "-")
                return false;
            else if (Number(this.deformatAmount(this.view.tbxFreqAmount.text)) == 0)
                return false;
            else
                return true;
        },
        /*
         * onClickCancel - Method that navigates to previous form frmCreateSavingsPot
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        onClickCancel: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            this.savingsPotPresentationController.fetchSavingsPot(accountID);
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
        /*
         * enableFreqRadioButtons - enables or disables radioButtons
         * @param {Boolean} isEnabled - true/false - enables or disables the radioButtons 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        enableFreqRadioButtons: function(isEnabled) {
            if (isEnabled) {
                this.view.flxRadioBtn1.setEnabled(true);
                this.view.flxRadioBtn2.setEnabled(true);
                this.view.imgRadioBtn12.skin = ViewConstants.SKINS.RADIOBTN_ENABLE_SKIN;
                this.view.imgRadioBtn21.skin = ViewConstants.SKINS.RADIOBTN_ENABLE_SKIN;
            } else {
                this.view.flxRadioBtn1.setEnabled(false);
                this.view.flxRadioBtn2.setEnabled(false);
                this.view.imgRadioBtn12.skin = ViewConstants.SKINS.RADIOBTN_DISABLE_SKIN;
                this.view.imgRadioBtn21.skin = ViewConstants.SKINS.RADIOBTN_DISABLE_SKIN;
            }
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