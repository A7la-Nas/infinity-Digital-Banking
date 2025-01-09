define(["CommonUtilities"], function (CommonUtilities) {
  return {
    keypadString: '0',
    isPeriodUsed: false,
    timerCounter: 0,
    init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm, scope.navigateCustomBack);
    },

    preShow: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxHeader.setVisibility(false);
      }
      this.view.flxKeypad.setVisibility(false);
      var configManager = applicationManager.getConfigurationManager();
      var maxAmount = configManager.getMaxMonthlyDebitAmount();
      var maxMonth = configManager.getMaxMonths();
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      this.view.lblMaxVal.text = maxMonth.toString();
      this.view.lblDollar.text = currencySymbol;
      this.view.lblMinValue.text = currencySymbol + "0";
      this.view.lblMaxValue.text = currencySymbol + maxAmount;
      this.view.SliderAmount.max = maxAmount;
      this.view.SliderMonth.max = maxMonth;
      this.view.btnContinue.onClick = this.continueOnClick;
      this.view.customHeader.flxBack.onTouchEnd = this.navigateCustomBack;
      this.view.customHeader.btnRight.onClick = this.onCancelClick;
      this.view.flxAmountWrapper.onClick = this.showKeypad;
      this.view.lblDone.onTouchStart = this.hideKeypad;
      this.view.lblMonthlyDebitValue.onTouchStart = this.navToAmount;
      this.view.lblMonthsValue.onTouchStart = this.navToMonths;
      this.view.lblError.setVisibility(false);
      var savingsObj = SavingsPotMod.presentationController.getCreateObject();
      this.view.lblGoalname.text = savingsObj.potName;
      var navManager = applicationManager.getNavigationManager();
      var previousForm = navManager.getPreviousForm();
      if (previousForm.friendlyName === "frmCreateGoalMonths" || previousForm.friendlyName === "frmGoalAmount") {
          savingsObj.targetAmount = SavingsPotMod.presentationController.targetAmount;
          savingsObj.targetPeriod = SavingsPotMod.presentationController.targetPeriod;
          savingsObj.periodicContribution = SavingsPotMod.presentationController.periodicContribution;
      }
      this.setReference(savingsObj.targetAmount, savingsObj.targetPeriod, savingsObj.periodicContribution);
      this.setDataToForm();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    postShow: function () {
      this.btnEnabling();
      this.calculation();
      this.view.SliderAmount.onSelection = this.monthsCalculation;
      this.view.SliderMonth.onSelection = this.amountCalculation;
    },
    btnEnabling: function () {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
       if (this.keypadString === '0' || this.view.lblMonthlyDebitValue.text === currencySymbol +" 0.00" || this.view.lblMonthsValue.text === "0 Months") {
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnContinue.setEnabled(false);
        this.view.lblAmount.text = this.view.keypad.formatAmount(this.keypadString);
      }
      else {
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnContinue.setEnabled(true);
      }
      var today = new Date();
      if (this.view.lblMonthsValue.text === "0 Months") {
        this.view.lblFromValue.text = "-";
      }
      else {
        var date = today.getDate();
        if (date < 10) {
          date = "0" + date;
        }
        var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var monthVal = this.view.lblMonthsValue.text;
        var month = monthVal.split(" ")[0];
        var targetPeriod = today.getMonth() + 1 + JSON.parse(month);
        var targetYear = targetPeriod;
        var year = today.getFullYear();
        if (targetPeriod > 12) {
          targetPeriod = targetPeriod % 12;
          var period = targetYear / 12;
          if (period == 1 || period == 2 || period == 3 || period == 4 || period == 5 || period == 6 || period == 7 || period == 8 || period == 9 || period == 10) {
            period = period - 1;
          }
          year = year + Math.floor(period);
        }
        if (targetPeriod == 1) {
          this.view.lblFromValue.text = date + " " + shortMonths[0] + " " + year;
        }
        else if (targetPeriod == 2) {
          this.view.lblFromValue.text = date + " " + shortMonths[1] + " " + year;
        }
        else if (targetPeriod == 3) {
          this.view.lblFromValue.text = date + " " + shortMonths[2] + " " + year;
        }
        else if (targetPeriod == 4) {
          this.view.lblFromValue.text = date + " " + shortMonths[3] + " " + year;
        }
        else if (targetPeriod == 5) {
          this.view.lblFromValue.text = date + " " + shortMonths[4] + " " + year;
        }
        else if (targetPeriod == 6) {
          this.view.lblFromValue.text = date + " " + shortMonths[5] + " " + year;
        }
        else if (targetPeriod == 7) {
          this.view.lblFromValue.text = date + " " + shortMonths[6] + " " + year;
        }
        else if (targetPeriod == 8) {
          this.view.lblFromValue.text = date + " " + shortMonths[7] + " " + year;
        }
        else if (targetPeriod == 9) {
          this.view.lblFromValue.text = date + " " + shortMonths[8] + " " + year;
        }
        else if (targetPeriod == 10) {
          this.view.lblFromValue.text = date + " " + shortMonths[9] + " " + year;
        }
        else if (targetPeriod == 11) {
          this.view.lblFromValue.text = date + " " + shortMonths[10] + " " + year;
        }
        else {
          this.view.lblFromValue.text = date + " " + shortMonths[11] + " " + year;
        }
      }
    },
    monthsCalculation: function () {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
        var configManager = applicationManager.getConfigurationManager();
        var maxMonth = configManager.getMaxMonths();
        var debitAmount = this.view.SliderAmount.selectedValue;
        if (this.keypadString !== '0') {
          var targetAmount = this.keypadString.replace(/[\\. ]+/g, "");
          targetAmount = targetAmount.replace(",",".");
          if (targetAmount < debitAmount) {
            this.view.lblError.setVisibility(true);
            this.view.lblError.text = "Monthly Debit Amount is greater than Goal Amount";
            this.view.SliderAmount.selectedValue = "0";
            this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
            this.view.lblMonthsValue.text = "0 Months";
            this.view.SliderMonth.selectedValue = "0";
            this.btnEnabling();
          }
          else {
            var val = this.keypadString;
            var value = val.replace(/[\\. ]+/g, "");
            this.view.lblMonthlyDebitValue.text = currencySymbol +" " + debitAmount + ",00";
            this.view.lblError.setVisibility(false);
            if (debitAmount !== 0) {
              this.view.lblMonthlyDebitValue.text = currencySymbol +" " + debitAmount + ",00";
              value = value.replace(",",".");
              var noOfMonths = JSON.parse(value) / debitAmount;
              this.view.lblMonthsValue.text = noOfMonths + " Months";
              this.view.SliderMonth.selectedValue = noOfMonths;
              this.updateAmountValue();
              this.roundOff("true");
              if (this.view.lblMonthsValue.text !== "0 Months") {
                var noOfMonth = this.view.lblMonthsValue.text;
                var month = noOfMonth.split(" ")[0];
                var monthlyDebitAmt = JSON.parse(value) % debitAmount;
                if (monthlyDebitAmt != 0) {
                  var monthlyDebit = JSON.parse(value) / month;
                  this.view.lblError.text = "Monthly debit amount is adjusted based on period of months";
                  this.view.lblError.setVisibility(true);
                  this.view.SliderAmount.selectedValue = monthlyDebit;
                  var monthlyDA = String(Math.ceil(monthlyDebit)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                  this.view.lblMonthlyDebitValue.text = currencySymbol +" " + monthlyDA +",00";
                }
              }
              this.btnEnabling();
            }
            else {
              this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
              this.view.lblMonthsValue.text = "0 Months";
              this.view.SliderMonth.selectedValue = "0";
              this.updateAmountValue();
              this.btnEnabling();
            }
            if (noOfMonths > maxMonth) {
              this.view.lblError.text = "Number of months is greater than " + maxMonth.toString();
              this.view.lblError.setVisibility(true);
              this.view.SliderAmount.selectedValue = "0";
              this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
              this.view.lblMonthsValue.text = "0 Months";
              this.view.SliderMonth.selectedValue = "0";
              this.btnEnabling();
            }
          }
        }
        else {
          this.view.lblError.text = "Please enter the goal amount";
          this.view.lblError.setVisibility(true);
          this.view.SliderAmount.selectedValue = "0";
          this.view.SliderMonth.selectedValue = "0";
        }
      }
      else {
        var configManager = applicationManager.getConfigurationManager();
        var maxMonth = configManager.getMaxMonths();
        var debitAmount = this.view.SliderAmount.selectedValue;
        if (this.keypadString !== '0') {
          var targetAmount = this.keypadString.replace(/[, ]+/g, "");
          if (targetAmount < debitAmount) {
            this.view.lblError.setVisibility(true);
            this.view.lblError.text = "Monthly Debit Amount is greater than Goal Amount";
            this.view.SliderAmount.selectedValue = "0";
            this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
            this.view.lblMonthsValue.text = "0 Months";
            this.view.SliderMonth.selectedValue = "0";
            this.btnEnabling();
          }
          else {
            var val = this.keypadString;
            var value = val.replace(/[, ]+/g, "");
            this.view.lblMonthlyDebitValue.text = currencySymbol +" " + debitAmount + ".00";
            this.view.lblError.setVisibility(false);
            if (debitAmount !== 0) {
              this.view.lblMonthlyDebitValue.text = currencySymbol +" " + debitAmount + ".00";
              var noOfMonths = JSON.parse(value) / debitAmount;
              this.view.lblMonthsValue.text = noOfMonths + " Months";
              this.view.SliderMonth.selectedValue = noOfMonths;
              this.updateAmountValue();
              this.roundOff();
              if (this.view.lblMonthsValue.text !== "0 Months") {
                var noOfMonth = this.view.lblMonthsValue.text;
                var month = noOfMonth.split(" ")[0];
                var monthlyDebitAmt = JSON.parse(value) % debitAmount;
                if (monthlyDebitAmt != 0) {
                  var monthlyDebit = JSON.parse(value) / month;
                  this.view.lblError.text = "Monthly debit amount is adjusted based on period of months";
                  this.view.lblError.setVisibility(true);
                  this.view.SliderAmount.selectedValue = monthlyDebit;
                  this.view.lblMonthlyDebitValue.text = currencySymbol +" " + Math.ceil(monthlyDebit) + ".00";
                }
              }
              this.btnEnabling();
            }
            else {
              this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
              this.view.lblMonthsValue.text = "0 Months";
              this.view.SliderMonth.selectedValue = "0";
              this.updateAmountValue();
              this.btnEnabling();
            }
            if (noOfMonths > maxMonth) {
              this.view.lblError.text = "Number of months is greater than " + maxMonth.toString();
              this.view.lblError.setVisibility(true);
              this.view.SliderAmount.selectedValue = "0";
              this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
              this.view.lblMonthsValue.text = "0 Months";
              this.view.SliderMonth.selectedValue = "0";
              this.btnEnabling();
            }
          }
        }
        else {
          this.view.lblError.text = "Please enter the goal amount";
          this.view.lblError.setVisibility(true);
          this.view.SliderAmount.selectedValue = "0";
          this.view.SliderMonth.selectedValue = "0";
        }
      }
    },
    amountCalculation: function () {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
        var configManager = applicationManager.getConfigurationManager();
        var maxAmount = configManager.getMaxMonthlyDebitAmount();
        var months = this.view.SliderMonth.selectedValue;
        if (this.keypadString !== '0') {
          var val = this.keypadString;
          var value = val.replace(/[\\. ]+/g, "");
          this.view.lblMonthsValue.text = months + " Months";
          if (months !== 0) {
            this.view.lblError.setVisibility(false);
            this.view.lblMonthsValue.text = months + " Months";
            value = value.replace(",",".");
            var periodicContribution = JSON.parse(value) / months;
            this.view.lblMonthlyDebitValue.text = currencySymbol +" " + periodicContribution;
            this.view.SliderAmount.selectedValue = periodicContribution;
            this.updateAmountValue();
            this.roundOff();
            this.btnEnabling();
          }
          else {
            this.view.lblMonthsValue.text = "0 Months";
            this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
            this.view.SliderAmount.selectedValue = "0";
            this.updateAmountValue();
            this.btnEnabling();
          }
          if (periodicContribution > maxAmount) {
            this.view.lblError.text = "Monthly debit amount is greater than " + maxAmount;
            this.view.lblError.setVisibility(true);
            this.view.SliderAmount.selectedValue = "0";
            this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
            this.view.lblMonthsValue.text = "0 Months";
            this.view.SliderMonth.selectedValue = "0";
            this.btnEnabling();
          }
        }
        else {
          this.view.lblError.text = "Please enter the goal amount";
          this.view.lblError.setVisibility(true);
          this.view.SliderAmount.selectedValue = "0";
          this.view.SliderMonth.selectedValue = "0";
        }
      }
      else {
        var configManager = applicationManager.getConfigurationManager();
        var maxAmount = configManager.getMaxMonthlyDebitAmount();
        var months = this.view.SliderMonth.selectedValue;
        if (this.keypadString !== '0') {
          var val = this.keypadString;
          var value = val.replace(/[, ]+/g, "");
          this.view.lblMonthsValue.text = months + " Months";
          if (months !== 0) {
            this.view.lblError.setVisibility(false);
            this.view.lblMonthsValue.text = months + " Months";
            var periodicContribution = JSON.parse(value) / months;
            this.view.lblMonthlyDebitValue.text = currencySymbol +" " + periodicContribution;
            this.view.SliderAmount.selectedValue = periodicContribution;
            this.updateAmountValue();
            this.roundOff();
            this.btnEnabling();
          }
          else {
            this.view.lblMonthsValue.text = "0 Months";
            this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
            this.view.SliderAmount.selectedValue = "0";
            this.updateAmountValue();
            this.btnEnabling();
          }
          if (periodicContribution > maxAmount) {
            this.view.lblError.text = "Monthly debit amount is greater than " + maxAmount;
            this.view.lblError.setVisibility(true);
            this.view.SliderAmount.selectedValue = "0";
            this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
            this.view.lblMonthsValue.text = "0 Months";
            this.view.SliderMonth.selectedValue = "0";
            this.btnEnabling();
          }
        }
        else {
          this.view.lblError.text = "Please enter the goal amount";
          this.view.lblError.setVisibility(true);
          this.view.SliderAmount.selectedValue = "0";
          this.view.SliderMonth.selectedValue = "0";
        }
      }
    },
    calculation: function () {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
        var configManager = applicationManager.getConfigurationManager();
        var maxAmount = configManager.getMaxMonthlyDebitAmount();
        var maxMonth = configManager.getMaxMonths();
        var debitValue = this.view.lblMonthlyDebitValue.text;
        var monthlyValue = debitValue.split(" ")[1];
        var monthlyDebit = monthlyValue.split(",")[0];
        var monthsValue = this.view.lblMonthsValue.text;
        var months = monthsValue.split(" ")[0];
        var val = this.keypadString;
        var value = val.replace(/[\\. ]+/g, "");
        if (this.keypadString !== '0') {
          var SavingsPotModule = applicationManager.getModulesPresentationController("SavingsPotUIModule");
          var type = SavingsPotModule.getSavingsType();
          if (monthlyDebit !== "0" && type === "periodicContribution") {
            this.view.lblError.setVisibility(false);
            var amountVal = monthlyDebit.replace(/[\\. ]+/g, "");
            var monthlyAmount = JSON.parse(amountVal);
            this.view.SliderAmount.selectedValue = monthlyAmount;
            value = value.replace(",", ".");
            var noOfMonths = JSON.parse(value) / monthlyAmount;
            if (noOfMonths > maxMonth) {
              this.view.lblError.text = "Number of months is greater than " + maxMonth.toString();
              this.view.lblError.setVisibility(true);
              this.view.SliderAmount.selectedValue = "0";
              this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
              this.view.lblMonthsValue.text = "0 Months";
              this.view.SliderMonth.selectedValue = "0";
              this.btnEnabling();
            }
            else {
              this.view.lblMonthsValue.text = noOfMonths + " Months";
              this.view.SliderMonth.selectedValue = noOfMonths;
              this.setDataToMonths(maxAmount);
              this.updateAmountValue();
              this.roundOff("true");
              if (this.view.lblMonthsValue.text !== "0 Months") {
                var noOfMonth = this.view.lblMonthsValue.text;
                var month = noOfMonth.split(" ")[0];
                var monthlyDebitAmt = JSON.parse(value) % monthlyAmount;
                if (monthlyDebitAmt != 0) {
                  var monthlyDebitAmount = JSON.parse(value) / month;
                  this.view.lblError.text = "Monthly debit amount is adjusted based on period of months";
                  this.view.lblError.setVisibility(true);
                  this.view.SliderAmount.selectedValue = monthlyDebitAmount;
                  this.view.lblMonthlyDebitValue.text = currencySymbol +" " + Math.ceil(monthlyDebitAmount) + ",00";
                }
              }
              this.btnEnabling();
            }
          }

          if (months !== "0" && type === "targetPeriod") {
            this.view.lblError.setVisibility(false);
            this.view.SliderMonth.selectedValue = months;
            value = value.replace(",", ".");
            var periodicContribution = JSON.parse(value) / months;
            if (periodicContribution > maxAmount || value < JSON.parse(periodicContribution)) {
              if (periodicContribution > maxAmount) {
                this.view.lblError.text = "Monthly debit amount is greater than " + maxAmount;
                this.view.lblError.setVisibility(true);
              }
              if (value < JSON.parse(periodicContribution)) {
                this.view.lblError.text = "Monthly debit Amount is greater than Goal amount";
                this.view.lblError.setVisibility(true);
              }
              this.view.SliderAmount.selectedValue = "0";
              this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
              this.view.lblMonthsValue.text = "0 Months";
              this.view.SliderMonth.selectedValue = "0";
              this.btnEnabling();
            }
            else {
              this.view.lblMonthlyDebitValue.text = currencySymbol +" " + periodicContribution;
              this.view.SliderAmount.selectedValue = periodicContribution;
              this.setDataToAmount(maxMonth);
              this.updateAmountValue();
              this.roundOff();
              this.btnEnabling();
            }
          }
        }
        else {
          this.view.SliderAmount.selectedValue = "0";
          this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
          this.view.lblMonthsValue.text = "0 Months";
          this.view.SliderMonth.selectedValue = "0";
          this.btnEnabling();
        }
        if (this.view.lblMonthlyDebitValue.text == "$ null" || this.view.lblMonthsValue.text == "null Months" || this.view.lblMonthsValue.text == "0 Months") {
          this.view.SliderAmount.selectedValue = "0";
          this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
          this.view.lblMonthsValue.text = "0 Months";
          this.view.SliderMonth.selectedValue = "0";
        }
      }
      else {
        var configManager = applicationManager.getConfigurationManager();
        var maxAmount = configManager.getMaxMonthlyDebitAmount();
        var maxMonth = configManager.getMaxMonths();
        var debitValue = this.view.lblMonthlyDebitValue.text;
        var monthlyValue = debitValue.split(" ")[1];
        var monthlyDebit = monthlyValue.split(".")[0];
        var monthsValue = this.view.lblMonthsValue.text;
        var months = monthsValue.split(" ")[0];
        var val = this.keypadString;
        var value = val.replace(/[, ]+/g, "");
        if (this.keypadString !== '0') {
          var SavingsPotModule = applicationManager.getModulesPresentationController("SavingsPotUIModule");
          var type = SavingsPotModule.getSavingsType();
          if (monthlyDebit !== "0" && type === "periodicContribution") {
            this.view.lblError.setVisibility(false);
            var amountVal = monthlyDebit.replace(/[, ]+/g, "");
            var monthlyAmount = JSON.parse(amountVal);
            this.view.SliderAmount.selectedValue = monthlyAmount;
            var noOfMonths = JSON.parse(value) / monthlyAmount;
            if (noOfMonths > maxMonth) {
              this.view.lblError.text = "Number of months is greater than " + maxMonth.toString();
              this.view.lblError.setVisibility(true);
              this.view.SliderAmount.selectedValue = "0";
              this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
              this.view.lblMonthsValue.text = "0 Months";
              this.view.SliderMonth.selectedValue = "0";
              this.btnEnabling();
            }
            else {
              this.view.lblMonthsValue.text = noOfMonths + " Months";
              this.view.SliderMonth.selectedValue = noOfMonths;
              this.setDataToMonths(maxAmount);
              this.updateAmountValue();
              this.roundOff();
              if (this.view.lblMonthsValue.text !== "0 Months") {
                var noOfMonth = this.view.lblMonthsValue.text;
                var month = noOfMonth.split(" ")[0];
                var monthlyDebitAmt = JSON.parse(value) % monthlyAmount;
                if (monthlyDebitAmt != 0) {
                  var monthlyDebitAmount = JSON.parse(value) / month;
                  this.view.lblError.text = "Monthly debit amount is adjusted based on period of months";
                  this.view.lblError.setVisibility(true);
                  this.view.SliderAmount.selectedValue = monthlyDebitAmount;
                  this.view.lblMonthlyDebitValue.text = currencySymbol +" " + Math.ceil(monthlyDebitAmount) + ".00";
                }
              }
              this.btnEnabling();
            }
          }

          if (months !== "0" && type === "targetPeriod") {
            this.view.lblError.setVisibility(false);
            this.view.SliderMonth.selectedValue = months;
            var periodicContribution = JSON.parse(value) / months;
            if (periodicContribution > maxAmount || value < JSON.parse(periodicContribution)) {
              if (periodicContribution > maxAmount) {
                this.view.lblError.text = "Monthly debit amount is greater than " + maxAmount;
                this.view.lblError.setVisibility(true);
              }
              if (value < JSON.parse(periodicContribution)) {
                this.view.lblError.text = "Monthly debit Amount is greater than Goal amount";
                this.view.lblError.setVisibility(true);
              }
              this.view.SliderAmount.selectedValue = "0";
              this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
              this.view.lblMonthsValue.text = "0 Months";
              this.view.SliderMonth.selectedValue = "0";
              this.btnEnabling();
            }
            else {
              this.view.lblMonthlyDebitValue.text = currencySymbol +" " + periodicContribution;
              this.view.SliderAmount.selectedValue = periodicContribution;
              this.setDataToAmount(maxMonth);
              this.updateAmountValue();
              this.roundOff();
              this.btnEnabling();
            }
          }
        }
        else {
          this.view.SliderAmount.selectedValue = "0";
          this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
          this.view.lblMonthsValue.text = "0 Months";
          this.view.SliderMonth.selectedValue = "0";
          this.btnEnabling();
        }
        if (this.view.lblMonthlyDebitValue.text == "$ null" || this.view.lblMonthsValue.text == "null Months") {
          this.view.SliderAmount.selectedValue = "0";
          this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
          this.view.lblMonthsValue.text = "0 Months";
          this.view.SliderMonth.selectedValue = "0";
        }
      }
    },
    setDataToMonths: function (maxAmount) {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      var budgetDetails = SavingsPotMod.presentationController.getBudgetDetails();
      if (budgetDetails.periodicContribution !== undefined) {
        this.view.lblMonthlyDebitValue.text = currencySymbol +" " + budgetDetails.periodicContribution;
      }
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
        var periodicContri = budgetDetails.periodicContribution;
        var split = periodicContri.split(",");
        var amount = split[0];
        var monthlyAmount = amount.replace(/[\\. ]+/g, "");
        var targetAmount = this.keypadString.replace(/[\\. ]+/g, "");
        if (monthlyAmount > maxAmount || targetAmount < JSON.parse(monthlyAmount)) {
          if (monthlyAmount > maxAmount) {
            this.view.lblError.text = "Monthly debit amount is greater than " + maxAmount;
            this.view.lblError.setVisibility(true);
          }
          if (targetAmount < JSON.parse(monthlyAmount)) {
            this.view.lblError.text = "Monthly debit amount is greater than Goal amount";
            this.view.lblError.setVisibility(true);
          }
          this.view.SliderAmount.selectedValue = "0";
          this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
          this.view.lblMonthsValue.text = "0 Months";
          this.view.SliderMonth.selectedValue = "0";
        }
      }
      else {
        var periodicContri = budgetDetails.periodicContribution;
        var split = periodicContri.split(".");
        var amount = split[0];
        var monthlyAmount = amount.replace(/[, ]+/g, "");
        var targetAmount = this.keypadString.replace(/[, ]+/g, "");
        if (monthlyAmount > maxAmount || targetAmount < JSON.parse(monthlyAmount)) {
          if (monthlyAmount > maxAmount) {
            this.view.lblError.text = "Monthly debit amount is greater than " + maxAmount;
            this.view.lblError.setVisibility(true);
          }
          if (targetAmount < JSON.parse(monthlyAmount)) {
            this.view.lblError.text = "Monthly debit amount is greater than Goal amount";
            this.view.lblError.setVisibility(true);
          }
          this.view.SliderAmount.selectedValue = "0";
          this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
          this.view.lblMonthsValue.text = "0 Months";
          this.view.SliderMonth.selectedValue = "0";
        }
      }
    },
    setDataToAmount: function (maxMonth) {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      var budgetDetails = SavingsPotMod.presentationController.getBudgetDetails();
      if (budgetDetails.targetPeriod !== undefined) {
        this.view.lblMonthsValue.text = budgetDetails.targetPeriod + " Months";
      }var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
        if (budgetDetails.targetPeriod > maxMonth) {
          this.view.lblError.text = "Number of months is greater than " + maxMonth.toString();
          this.view.lblError.setVisibility(true);
          this.view.SliderAmount.selectedValue = "0";
          this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
          this.view.lblMonthsValue.text = "0 Months";
          this.view.SliderMonth.selectedValue = "0";
        }
      }
      else {
        if (budgetDetails.targetPeriod > maxMonth) {
          this.view.lblError.text = "Number of months is greater than " + maxMonth.toString();
          this.view.lblError.setVisibility(true);
          this.view.SliderAmount.selectedValue = "0";
          this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
          this.view.lblMonthsValue.text = "0 Months";
          this.view.SliderMonth.selectedValue = "0";
        }
      }
    },
    roundOff: function (fromManaual) {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
        var monthlyDebit = this.view.lblMonthlyDebitValue.text;
        var months = this.view.lblMonthsValue.text;
        var monthlyVal = monthlyDebit.split(" ")[1];
        var monthlyAmount = monthlyVal;
        var monthsVal = months.split(" ")[0];
        if (fromManaual === "true") {
          monthlyAmount = monthlyAmount.replace(/[\\. ]+/g, "");
          monthlyAmount = monthlyAmount.replace(",", ".");
        }
        var periodicContribution = Math.ceil(monthlyAmount);
        var targetPeriod = Math.ceil(monthsVal);
        periodicContribution = periodicContribution + "";
        periodicContribution = periodicContribution.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        this.view.lblMonthlyDebitValue.text = currencySymbol +" " + periodicContribution + ",00";
        this.view.lblMonthsValue.text = targetPeriod + " Months";

      }
      else {
        var monthlyDebit = this.view.lblMonthlyDebitValue.text;
        var months = this.view.lblMonthsValue.text;
        var monthlyVal = monthlyDebit.split(" ")[1];
        var monthlyAmount = monthlyVal.replace(/[, ]+/g, "");
        var monthsVal = months.split(" ")[0];
        var periodicContribution = Math.ceil(monthlyAmount);
        var targetPeriod = Math.ceil(monthsVal);
        this.view.lblMonthlyDebitValue.text = currencySymbol +" " + periodicContribution + ".00";
        this.view.lblMonthsValue.text = targetPeriod + " Months";
      }
    },
    setDataToForm: function () {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      var budgetDetails = SavingsPotMod.presentationController.getBudgetDetails();
      if (budgetDetails.periodicContribution !== undefined) {
        var locale = kony.i18n.getCurrentLocale();
        locale = locale.toLowerCase();
        locale = locale.replace("_", "-");
        if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") 
        this.view.lblMonthlyDebitValue.text = currencySymbol +" " + budgetDetails.periodicContribution.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		else
        this.view.lblMonthlyDebitValue.text = currencySymbol +" " + budgetDetails.periodicContribution;
      }
      if (budgetDetails.targetPeriod !== undefined) {
        this.view.lblMonthsValue.text = budgetDetails.targetPeriod + " Months";
      }
    },
    setReference: function (targetAmount, targetPeriod, periodicContribution) {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      if (targetAmount) {
        var locale = kony.i18n.getCurrentLocale();
        locale = locale.toLowerCase();
        locale = locale.replace("_", "-");
        if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") 
         this.keypadString = targetAmount.split(",")[0].replace(/[\\.]+/g,"");
        else
        this.keypadString = targetAmount;
        this.view.lblAmount.text = targetAmount;
      }
      else {
        this.view.lblAmount.text = "0";
        this.keypadString = "0";
      }
      if (targetPeriod) {
        this.view.lblMonthsValue.text = targetPeriod;
      }
      else {
        this.view.lblMonthsValue.text = "0 Months";
      }
      if (periodicContribution) {
        this.view.lblMonthlyDebitValue.text = periodicContribution;
      }
      else {
        var locale = kony.i18n.getCurrentLocale();
        locale = locale.toLowerCase();
        locale = locale.replace("_", "-");
        if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") 
          this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
        else
          this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
      }
    },
    navigateCustomBack: function () {
      var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
      SavingsPotMod.commonFunctionForgoBack();
    },
    showKeypad: function () {
      this.view.flxKeypad.setVisibility(true);
    },
    hideKeypad: function () {
      var targetAmount = this.view.lblAmount.text;
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
    //  SavingsPotMod.presentationController.updateTargetAmount(targetAmount);
      this.view.SliderAmount.selectedValue = "0";
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") 
        this.view.lblMonthlyDebitValue.text = currencySymbol +" 0,00";
      else
        this.view.lblMonthlyDebitValue.text = currencySymbol +" 0.00";
      this.view.lblMonthsValue.text = "0 Months";
      this.view.SliderMonth.selectedValue = "0";
      this.view.flxKeypad.setVisibility(false);
      this.view.lblError.setVisibility(false);
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnContinue.setEnabled(false);
 
    },
    setKeypadChar: function (char) {
      CommonUtilities.setKeypadCharWOD(this, char);
      this.updateAmountValue();
    },
    clearKeypadChar: function () {
      CommonUtilities.clearKeypadCharWOD(this);
      this.updateAmountValue();
    },
    updateAmountValue: function () {
      if (this.keypadString === '0') {
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnContinue.setEnabled(false);
        this.view.lblAmount.text = this.view.keypad.formatAmount(this.keypadString);
      } else {
        var finalValue = CommonUtilities.updateAmountValueWOD(this);
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnContinue.setEnabled(true);
        this.view.lblAmount.text = this.view.keypad.formatAmount(finalValue);
      }
    },
    onCancelClick: function () {
      var navManager = applicationManager.getNavigationManager();
      var previousForm = navManager.getPreviousForm();
      var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
      if (previousForm === "frmCreateGoalVerifyDetails") {
        SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalVerifyDetails"});
      } else {
        SavingsPotMod.clearCreateData();
        this.view.lblError.setVisibility(false);
        this.view.SliderAmount.selectedValue = "0";
        this.view.SliderMonth.selectedValue = "0";
        var createBudgetPermission = applicationManager.getConfigurationManager().checkUserPermission("BUDGET_POT_CREATE");
        (createBudgetPermission) ? navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsType"}) : navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmMySavingsPot"});
      }
    },
    navToAmount: function () {
      if (this.view.lblAmount.text !== "0") {
        var contribution = this.view.lblMonthlyDebitValue.text;
        var monthlycontribution = contribution.split(" ");
        var periodicContribution = monthlycontribution[1];
        var locale = kony.i18n.getCurrentLocale();
        locale = locale.toLowerCase();
        locale = locale.replace("_", "-");
        if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") 
          periodicContribution = periodicContribution.replace(/[\\.]+/g,"");
        var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
        SavingsPotMod.presentationController.targetAmount = this.view.lblAmount.text || "";
        SavingsPotMod.presentationController.targetPeriod = this.view.lblMonthsValue.text || "";
        SavingsPotMod.presentationController.periodicContribution = this.view.lblMonthlyDebitValue.text || "";
        SavingsPotMod.presentationController.updatePeriodicContribution(periodicContribution);
		SavingsPotMod.presentationController.updateTargetAmount(this.view.lblAmount.text);
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmGoalAmount"});
      } else {
        this.view.lblError.text = "Please enter the goal amount";
        this.view.lblError.setVisibility(true);
      }
    },
    navToMonths: function () {
      if (this.view.lblAmount.text !== "0") {
        var period = this.view.lblMonthsValue.text;
        var periodOfMonths = period.split(" ");
        var targetPeriod = periodOfMonths[0];
        var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
        SavingsPotMod.presentationController.targetAmount = this.view.lblAmount.text || "";
        SavingsPotMod.presentationController.targetPeriod = this.view.lblMonthsValue.text || "";
        SavingsPotMod.presentationController.periodicContribution = this.view.lblMonthlyDebitValue.text || "";
        SavingsPotMod.presentationController.updateTargetPeriod(targetPeriod);
		SavingsPotMod.presentationController.updateTargetAmount(this.view.lblAmount.text);
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalMonths"});
      } else {
        this.view.lblError.text = "Please enter the goal amount";
        this.view.lblError.setVisibility(true);
      }
    },
    continueOnClick: function () {
      var targetAmount = this.view.lblAmount.text;
      var period = this.view.lblMonthsValue.text;
      var periodOfMonths = period.split(" ");
      var targetPeriod = periodOfMonths[0];
      var contribution = this.view.lblMonthlyDebitValue.text;
      var monthlycontribution = contribution.split(" ");
      var periodicContribution = monthlycontribution[1];
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") 
        periodicContribution = periodicContribution.replace(/[\\.]+/g,"");
      var navManager = applicationManager.getNavigationManager();
      var previousForm = navManager.getPreviousForm();
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
     //   var targetAmount = this.view.lblAmount.text;
   //   var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
   //   var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      SavingsPotMod.presentationController.updateTargetAmount(targetAmount);
    
      if (previousForm === "frmCreateGoalVerifyDetails") {
        SavingsPotMod.presentationController.navToGoalFrequency(targetAmount, targetPeriod, periodicContribution, {"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalVerifyDetails"});
      }
      else {
        SavingsPotMod.presentationController.navToGoalFrequency(targetAmount, targetPeriod, periodicContribution, {"appName" : "SavingsPotMA", "friendlyName" : "frmCreateSavingsGoalFrequency"});
      }
    }
  };
});
