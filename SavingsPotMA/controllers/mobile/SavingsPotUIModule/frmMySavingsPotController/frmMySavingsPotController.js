define(["CommonUtilities"], function (CommonUtilities) {
  return {
    init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "NO", currentForm);
    },
    preShow: function () {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxHeader.setVisibility(false);
        this.view.flxNoTransactions.top = "0";
        this.view.flxNoTransactions.height = "100%";
      }
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      SavingsPotMod.presentationController.setInitiateTransfer("");
      this.view.lblBalanceValue1.text = currencySymbol+ "0.00";
      var accountName = SavingsPotMod.presentationController.getMaskedAccountName();
      this.view.lblAvailableBalance.text = accountName;
      this.view.lblAvailableBalance1.text = accountName;
      this.initActions();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var accountsDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmMySavingsPot"});
      this.setDataToForm(accountsDetails);
    },
    initActions : function(){
      var configManager = applicationManager.getConfigurationManager();
      var createGoalPermission  = configManager.checkUserPermission("GOAL_POT_CREATE");
      var createBudgetPermission  = configManager.checkUserPermission("BUDGET_POT_CREATE");
      if(!createGoalPermission && !createBudgetPermission){
        this.view.btnCreateSavingsPot.setVisibility(false);
        this.view.btnCreateSavingsPot1.setVisibility(false);
      }
      else{
        this.view.btnCreateSavingsPot.setVisibility(true);
        this.view.btnCreateSavingsPot1.setVisibility(true);
        this.view.btnCreateSavingsPot.onClick = this.continueOnClick;
        this.view.btnCreateSavingsPot1.onClick = this.continueOnClick;
      } 
      //osama
      this.view.onDeviceBack = this.onBack;
      this.view.customHeader.flxBack.onClick = this.onBack;
      this.view.segMyGoals.onRowClick = this.viewGoalDetails;
      this.view.segMyBudgets.onRowClick = this.viewBudgetDetails;
    },
    setDataToForm: function (potDetails) {
      scope = this;
      var configManager = applicationManager.getConfigurationManager();     
      var formatUtil = applicationManager.getFormatUtilManager();
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencyCode = SavingsPotMod.presentationController.getCurrencyCode();
      var totalGoalsPots = [];
      var totalBudgetPots = [];
      var totalBalGoals = 0.00;
      var totalBalBudget = 0.00;
      var potcolor = "lbldotgreen";
      for (var TitleNo in potDetails) {
        var data = potDetails[TitleNo];
        var bal = formatUtil.formatAmountandAppendCurrencySymbol(data.availableBalance, currencyCode);
        var percentage = (data.availableBalance * 100) / data.targetAmount;
        if (percentage > 100) {
          percentage = 100;
        }
        else {
          percentage = parseInt(percentage);
        }
        if (data.potCurrentStatus === "Not On Track") {
          potcolor = "lbldotred";
        }
        else {
          if (!data.potCurrentStatus) {
            data.potCurrentStatus = "On Track"
          }
          potcolor = "lbldotgreen";
        }
        var targetamt = formatUtil.formatAmountandAppendCurrencySymbol(data.targetAmount, currencyCode);
        var storeData;
        if (data.potType == "Budget" && (data.availableBalance == "0" || data.availableBalance == "0.00" || data.availableBalance == "" || data.availableBalance == undefined)) {
          var budgetFundPermission  = configManager.checkUserPermission("BUDGET_POT_ADHOC_FUND");  
          storeData = {
            potName: CommonUtilities.truncateStringWithGivenLength(data.potName, 20),
            potId: data.savingsPotId,
            targetAmount: targetamt,
            lblPend: "Yet to Fund",
            minper: "",
            maxper: "",
            lblGoalDurationLeft:"",
            availableBalance:"",
            lblGoalDurationLeft: "",
            flxProgressBar: {
              top: "810Dp"
            },
            isRowClicked: false,
            lblTransfer: {
              "text":"Initiate Transfer",
              "isVisible":budgetFundPermission
            },
            flxClick: {
              "onClick": function (event, context) {
                scope.onSegmentRowClick(event, context);
              }.bind(this)
            },
            imgWarnImg: {
              src: "alert.png"
            }
          };
        }
        else {
          var rightDim = "110dp";
          if(data.potCurrentStatus === "Not On Track"){
            rightDim = "120dp";
          }
          else if(data.potCurrentStatus === "On Track"){
            rightDim= "95dp";
          }
          storeData = {
            potName: CommonUtilities.truncateStringWithGivenLength(data.potName, 20),
            availableBalance: bal,
            targetAmount: targetamt,
            flxSpent: {
              "width": percentage + "%"
            },
            minper: "0%",
            maxper: "100%",
            lblPend:"",
            monthLeft: data.monthsLeftForCompletion,
            status: data.potCurrentStatus,
            potId: data.savingsPotId,
            percentComp: percentage + "%",
            statuscolor: {
              skin: potcolor,
              right: rightDim
            },
            lblGoalDurationLeft: "Current Balance",
            flxProgressBar: {
              top: "81Dp"
            },
            imgWarnImg: {
              src: ""
            },
            lblTransfer: "",
            flxClick: {
              "onClick": function () {

              }.bind(this)
            },
          };
        }
        if (data.potType == "Goal") {
          totalGoalsPots.push(storeData);
          totalBalGoals = (parseFloat(totalBalGoals) + parseFloat(data.availableBalance)).toFixed(2);
        }
        else if (data.potType == "Budget") {
          totalBudgetPots.push(storeData);
          totalBalBudget = (parseFloat(totalBalBudget) + parseFloat(data.availableBalance)).toFixed(2);
        }
      }

      var createGoalPermission  = configManager.checkUserPermission("GOAL_POT_CREATE");
      var createBudgetPermission  = configManager.checkUserPermission("BUDGET_POT_CREATE");
      var viewGoalPermission  = configManager.checkUserPermission("GOAL_POT_VIEW");
      var viewBudgetPermission  = configManager.checkUserPermission("BUDGET_POT_VIEW");

      if (totalGoalsPots.length === 0 && totalBudgetPots.length === 0) {
        this.view.flxMainContainer.setVisibility(false);
        this.view.flxNoTransactions.setVisibility(true);
        if(!createGoalPermission && !createBudgetPermission){
          this.view.lblNoSavingsPot.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.noPotCreatedMsg");
          this.view.blNoSavingsPotMSg.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.noPermissionMsg");
        }else{
          this.view.lblNoSavingsPot.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.noPotMsg");
          this.view.blNoSavingsPotMSg.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.potCreateMsg");
        }
      } else {
        this.view.flxMainContainer.setVisibility(true);
        this.view.flxNoTransactions.setVisibility(false);
        if(!viewGoalPermission)
        {
          this.view.segMyGoals.setVisibility(false);
          this.view.flxNoGoals.setVisibility(false);
        }else {
          if (totalGoalsPots.length === 0) {
            this.view.segMyGoals.setVisibility(false);
            this.view.flxNoGoals.setVisibility(true);
            if(!createGoalPermission){
              this.view.lblNoGoal.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.noGoalCreatedMsg");
              this.view.lblNoGoalPot.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.noPermissionMsg");
            }else{
              this.view.lblNoGoal.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.noGoalMsg");
              this.view.lblNoGoalPot.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.goalCreateMsg");
            }
          } else {
            this.view.segMyGoals.setVisibility(true);
            this.view.flxNoGoals.setVisibility(false);
            this.view.segMyGoals.widgetDataMap = {
              lblMinGoalAmount: "availableBalance",
              lblMaxGoalAmount: "targetAmount",
              lblGoalCompleteStatusPercentage: "percentComp",
              lblGoalName: "potName",
              lblGoalDurationLeft: "monthLeft",
              lblGoalStatus: "status",
              flxSpent: "flxSpent",
              lblPotId: "potId",
              lblCur: "statuscolor"
            };
            this.view.segMyGoals.setData(totalGoalsPots);
          }
        }
        if(!viewBudgetPermission)
        {
          this.view.segMyBudgets.setVisibility(false);
          this.view.flxNoBudgets.setVisibility(false);
        }else{
          if (totalBudgetPots.length === 0 ) {
            this.view.segMyBudgets.setVisibility(false);
            this.view.flxNoBudgets.setVisibility(true);
            if(!createBudgetPermission){
              this.view.lblNoBudgets.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.noBudgetCreatedMsg");
              this.view.lblNoBudgetPot.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.noPermissionMsg");
            }else{
              this.view.lblNoBudgets.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.noBudgetMsg");
              this.view.lblNoBudgetPot.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.SavingsPot.BudgetCreateMsg");
            }
          } else {
            this.view.segMyBudgets.setVisibility(true);
            this.view.flxNoBudgets.setVisibility(false);
            this.view.segMyBudgets.widgetDataMap = {
              lblMinBudgetVal: "minper",
              lblMaxBudgetVal: "maxper",
              lblBudgetAmount: "targetAmount",
              lblGoalCompleteStatus: "availableBalance",
              lblBudgetName: "potName",
              flxSpent: "flxSpent",
              lblWarnImg: "lblPend",
              lblGoalDurationLeft: "lblGoalDurationLeft",
              flxProgressBar: "flxProgressBar",
              lblTransfer: "lblTransfer",
              imgWarnImg: "imgWarnImg",
              lblPotId: "potId",
              flxClick: "flxClick"
            };
            this.view.segMyBudgets.setData(totalBudgetPots);
          }
        }
      }
      if(viewGoalPermission){
        this.view.flxMyGoalsHeader.setVisibility(true);
        this.view.lblMyGoals.text = "My Goals (" + totalGoalsPots.length + ")";
        this.view.lblAvailableBalanceValue.text = formatUtil.formatAmountandAppendCurrencySymbol(totalBalGoals, currencyCode);
        if(viewBudgetPermission && (totalGoalsPots.length+totalBudgetPots.length)<=2){
          this.view.btnCreateSavingsPot.top = "18%";
        }else if (!viewBudgetPermission && (totalGoalsPots.length <= 1)){
          this.view.btnCreateSavingsPot.top = "45%";
        }else if (!viewBudgetPermission && (totalGoalsPots.length === 2)){
          this.view.btnCreateSavingsPot.top = "25%";
        }else{
          this.view.btnCreateSavingsPot.top = "8%";
        }                                                                  
      }
      else{
        this.view.flxMyGoalsHeader.setVisibility(false);
        totalBalGoals = 0;
      }

      if(viewBudgetPermission){
        this.view.flxMyBudgetsHeader.setVisibility(true);
        this.view.lblMyBudgets.text = "My Budgets (" + totalBudgetPots.length + ")";
        this.view.lblBudgetAvailBalValue.text = formatUtil.formatAmountandAppendCurrencySymbol(totalBalBudget, currencyCode);
        if(viewGoalPermission && (totalGoalsPots.length+totalBudgetPots.length)<=2){
          this.view.btnCreateSavingsPot.top = "18%";
        }else if (!viewGoalPermission && (totalBudgetPots.length <= 1)){
          this.view.btnCreateSavingsPot.top = "45%";
        }else if (!viewGoalPermission && (totalBudgetPots.length === 2)){
          this.view.btnCreateSavingsPot.top = "25%";
        }else{
          this.view.btnCreateSavingsPot.top = "8%";
        }
      }
      else{
        this.view.flxMyBudgetsHeader.setVisibility(false);
        totalBalBudget = 0;
      }
      var temp = parseFloat(totalBalGoals) + parseFloat(totalBalBudget);
      this.view.lblBalanceValue.text = formatUtil.formatAmountandAppendCurrencySymbol(temp, currencyCode);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    continueOnClick: function () {
      var configManager = applicationManager.getConfigurationManager();
      var createGoalPermission  = configManager.checkUserPermission("GOAL_POT_CREATE");
      var createBudgetPermission  = configManager.checkUserPermission("BUDGET_POT_CREATE"); 
      var viewGoalPermission = configManager.checkUserPermission("GOAL_POT_VIEW");
      var viewBudgetPermission = configManager.checkUserPermission("BUDGET_POT_VIEW");
      var navManager = applicationManager.getNavigationManager();
      if ((createGoalPermission && !createBudgetPermission && viewGoalPermission) || (createGoalPermission && createBudgetPermission && !viewBudgetPermission)) {
        var SavingsPotModule = applicationManager.getModulesPresentationController("SavingsPotUIModule");
        SavingsPotModule.clearCreateData();
        var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
        SavingsPotMod.presentationController.initiatePot("Goal", {"appName" : "SavingsPotMA", "friendlyName" : "frmGoalsType"});
        SavingsPotMod.presentationController.setBiWeekly("");
      } else if ((!createGoalPermission && createBudgetPermission && viewBudgetPermission) || (createGoalPermission && createBudgetPermission && !viewGoalPermission)){
        var SavingsPotModule = applicationManager.getModulesPresentationController("SavingsPotUIModule");
        SavingsPotModule.clearCreateData();
        var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
        SavingsPotMod.presentationController.initiatePot("Budget", {"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetName"});
      } else if(viewGoalPermission && viewBudgetPermission && createGoalPermission && createBudgetPermission) {
        navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsType"});
      }
    },
    viewGoalDetails: function () {
      var selectedObj = this.view.segMyGoals.selectedRowItems[0];
      var selectedPot = selectedObj.potId;
      var selectedPotDetails;
      var finalFreqDay;
      var navManager = applicationManager.getNavigationManager();
      var potDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmMySavingsPot"});
      for (var TitleNo in potDetails) {
        var data = potDetails[TitleNo];
        if (data.savingsPotId === selectedPot) {
          selectedPotDetails = data;
        }
      }
      if (!selectedPotDetails.frequencyDay) {
        if (selectedPotDetails.startDate) {
          var formatUtil = applicationManager.getFormatUtilManager();
          var endDateobj = formatUtil.getDateObjectfromString(selectedPotDetails.startDate, "MM/DD/YYYY");
          var endDate = formatUtil.getFormatedDateString(endDateobj, formatUtil.getApplicationDateFormat());
          var date = endDate;
          date = date.split("/");
          var d = new Date(date[2], date[0] - 1, date[1]);
          var weekday = new Array(7);
          weekday[0] = "Sunday";
          weekday[1] = "Monday";
          weekday[2] = "Tuesday";
          weekday[3] = "Wednesday";
          weekday[4] = "Thursday";
          weekday[5] = "Friday";
          weekday[6] = "Saturday";
          var selectedDay = weekday[d.getDay()];
          if (selectedPotDetails.frequency == "Biweekly") {
            var temp = selectedDay;
            finalFreqDay = "Every 2 weeks on " + temp.substring(0, 3);
          }
          else {
            if (date[1].length == 1) {
              finalFreqDay = "0" + date[1] + "th of every month";
            }
            else {
              finalFreqDay = date[1] + "th of every month";
            }
          }
          selectedPotDetails.frequencyDay = finalFreqDay;
        }
      }
      navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"}, selectedPotDetails);
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      SavingsPotMod.presentationController.setEditObj(selectedPotDetails);
      navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
    },
    onSegmentRowClick: function (event, context) {
      var rowindex = context.rowIndex;
      this.view.segMyBudgets.selectedRow = rowindex;
      var selectedObj = this.view.segMyBudgets.selectedRowItems[0];
      var selectedPot = selectedObj.potId;
      var selectedPotDetails;
      var navManager = applicationManager.getNavigationManager();
      var potDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmMySavingsPot"});
      for (var TitleNo in potDetails) {
        var data = potDetails[TitleNo];
        if (data.savingsPotId === selectedPot) {
          selectedPotDetails = data;
        }
      }
      navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"}, selectedPotDetails);
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      SavingsPotMod.presentationController.setInitiateTransfer("YES");
      navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetInitiateTransferDetails"});
    },
    viewBudgetDetails: function () {
      var selectedObj = this.view.segMyBudgets.selectedRowItems[0];
      var selectedPot = selectedObj.potId;
      var selectedPotDetails;
      var navManager = applicationManager.getNavigationManager();
      var potDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmMySavingsPot"});
      for (var TitleNo in potDetails) {
        var data = potDetails[TitleNo];
        if (data.savingsPotId === selectedPot) {
          selectedPotDetails = data;
        }
      }
      navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"}, selectedPotDetails);
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      SavingsPotMod.presentationController.setEditObj(selectedPotDetails);
      navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
    },    
    onBack:function(){
      let navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({
        "friendlyName": "AccountUIModule/frmAccountDetails",
        "appName": "ArrangementsMA"
      });
    }
  };
});