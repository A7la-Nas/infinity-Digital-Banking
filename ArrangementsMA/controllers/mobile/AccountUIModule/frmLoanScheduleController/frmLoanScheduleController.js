define({
  overdueInstallments: [],
  paidInstallments : [],
  segmentData : [],
	onNavigate: function(params) {
        var scope = this;
        var navMan = applicationManager.getNavigationManager();
        var context = navMan.getCustomInfo("frmLoanSchedule");
        context["transactionType"] = "LoanSchedule";
        if(!this.isEmptyNullUndefined(context["isLoanChartEntitled"]) && context["isLoanChartEntitled"] === true) {
        this.view.donutChartNative.setContext(context);
        scope.view.flxDonutChart.setVisibility(true);
        } else if(!this.isEmptyNullUndefined(context["isLoanChartEntitled"]) && context["isLoanChartEntitled"] === false) {
           scope.view.flxDonutChart.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(context["isLoanTransactionsEntitled"]) && context["isLoanTransactionsEntitled"] === true) {
        this.view.accountsTransactionListNative.setContext(context);
        scope.view.flxTransactions.setVisibility(true);
        } else if(!this.isEmptyNullUndefined(context["isLoanTransactionsEntitled"]) && context["isLoanTransactionsEntitled"] === false) {
           scope.view.flxTransactions.setVisibility(false);
        }
    },
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
		        this.view.donutChartNative.onError = function(errorObj) {
            alert(errorObj.err);
        };
        this.view.donutChartNative.requestStart = function() {
            kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        };
        this.view.donutChartNative.requestEnd = function() {
            kony.application.dismissLoadingScreen();
        };
        this.view.accountsTransactionListNative.onRequestStart = function() {
            kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        };
        this.view.accountsTransactionListNative.onRequestEnd = function() {
            kony.application.dismissLoadingScreen();
        };
        this.view.accountsTransactionListNative.swipeActionBtn = function(RowData) {
           // alert("Clicked Button " + RowData.id);
        };
        this.view.accountsTransactionListNative.getTransactionDetails = function(data) {
            //var moneyMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MoneyMovementModule");
            //var navManager = applicationManager.getNavigationManager();
          var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
            var userFeatures = applicationManager.getConfigurationManager().getUserFeatures();
            var userPermission = applicationManager.getConfigurationManager().getUserPermissions();
            data["userFeatures"] = userFeatures; 
            data["userPermissions"] = userPermission; 
            navManager.setCustomInfo("frmMMTransactionDetails", data);
            accountModule.presentationController.commonFunctionForNavigation("frmTransactionDetails");
            //moneyMod.presentationController.commonFunctionForNavigation("MoneyMovementModule/frmMMTransactionDetails");
        }
  },
  postShow: function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxFooter.isVisible = false;
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxFooter.isVisible = true;
    }
    this.view.flxNoTransactions.isVisible = false;
    this.view.btnDownloadTransaction.onClick = this.navigateToDownloadTransaction;
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  populateInstallmentObject: function(loanScheduleTransactionObject) {
    var installmentObject = {};
    var formatUtility = applicationManager.getFormatUtilManager();
    if(loanScheduleTransactionObject){
      installmentObject.tax = formatUtility.formatAmountandAppendCurrencySymbol(loanScheduleTransactionObject.tax);
      installmentObject.principal = formatUtility.formatAmountandAppendCurrencySymbol(loanScheduleTransactionObject.principal);
      installmentObject.interest = formatUtility.formatAmountandAppendCurrencySymbol(loanScheduleTransactionObject.interest);
      installmentObject.outstandingBalance = formatUtility.formatAmountandAppendCurrencySymbol(loanScheduleTransactionObject.outstandingBalance);
      installmentObject.insurance = formatUtility.formatAmountandAppendCurrencySymbol(loanScheduleTransactionObject.insurance);
      installmentObject.installmentType = loanScheduleTransactionObject.installmentType;
      installmentObject.date = loanScheduleTransactionObject.paymentDate;
      installmentObject.cumulativeInterest = formatUtility.formatAmountandAppendCurrencySymbol(loanScheduleTransactionObject.cumulativeInterest);
      installmentObject.amount = formatUtility.formatAmountandAppendCurrencySymbol(loanScheduleTransactionObject.installmentAmount);
    }
    return installmentObject;
  },
  setSegmentData: function() {
    var navMan = applicationManager.getNavigationManager();
    var loanScheduleTransactions = navMan.getCustomInfo("LoanScheduleTransactions");
    var overdueInstallments = [];
    var paidInstallments = [];
    this.view.segInstallments.widgetDataMap = {
      lblInstallmentAmount: "amount",
      lblDate: "date",
      lblHeader: "lblHeader",
      flximgUp : "flximgUp",
      imgUpArrow: "imgUpArrow"
    };
    if(loanScheduleTransactions){
      for(var i=0; i < loanScheduleTransactions.length; i++){
        if(loanScheduleTransactions[i].installmentType.toLowerCase() === "due")
        {
          var overdueInstallmentObject = this.populateInstallmentObject(loanScheduleTransactions[i]);
          overdueInstallments.push(overdueInstallmentObject);
        }else if(loanScheduleTransactions[i].installmentType.toLowerCase() === "paid"){
          var paidInstallmentObject = this.populateInstallmentObject(loanScheduleTransactions[i]);
          this.populateInstallmentObject(loanScheduleTransactions[i]);
          paidInstallments.push(paidInstallmentObject);
        }
      }
    }
      if (overdueInstallments.length > 0 && paidInstallments.length > 0) {
        var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.OverdueInstallments")+" (" + overdueInstallments.length + ")",
          "flximgUp" : {isVisible : true},
          "imgUpArrow":{
            src: "arrowdown.png"
          }
        }, overdueInstallments],
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.PaidInstallments")+" (" + paidInstallments.length + ")",
          "flximgUp" : {isVisible : true},
          "imgUpArrow":{
            src: "arrowdown.png"
          }
        }, paidInstallments]
        ];
        this.segmentData = data;
        this.view.segInstallments.setData(data);
        this.overdueInstallmentDetails = this.view.segInstallments.data[0][1];
        this.paidInstallmentDetails = this.view.segInstallments.data[1][1];
    } else if(paidInstallments.length > 0 && overdueInstallments.length <= 0){
      var data = [
        [{
            "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.PaidInstallments")+" (" + paidInstallments.length + ")",
            "flximgUp": {
                isVisible: true
            },
            "imgUpArrow":{
              src: "arrowdown.png"
            }
        }, paidInstallments]
        ];
        this.segmentData = data;
        this.view.segInstallments.setData(data);
        this.paidInstallmentDetails = this.view.segInstallments.data[0][1];
    }else if(paidInstallments.length <= 0 && overdueInstallments.length > 0){
      var data = [
        [{
            "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.OverdueInstallments")+" (" + overdueInstallments.length + ")",
            "flximgUp": {
                isVisible: true
            },
            "imgUpArrow":{
              src: "arrowdown.png"
            }
        }, overdueInstallments]
        ];
        this.segmentData = data;
        this.view.segInstallments.setData(data);
        this.overdueInstallmentDetails = this.view.segInstallments.data[0][1];
    }else {
      this.segmentData = [];
      this.overdueInstallmentDetails = [];
      this.paidInstallmentDetails = [];
      this.view.segInstallments.isVisible = false;
      this.view.flxNoTransactions.isVisible = true;
	}
    this.view.browserChart.onPageFinished=this.chartLoad();
  },
  
  includeZeroForSingleDigits: function(numberToCheck){
    if(numberToCheck < 10){
      numberToCheck = "0" + numberToCheck;
      return numberToCheck;
    }
    return numberToCheck.toString();
  },
  
  chartLoad: function(){
   var chartData_Labels = [];
   var chartData_values = [];
   var navMan = applicationManager.getNavigationManager();
   var accountDetails = navMan.getCustomInfo("frmAccountDetails");
   var paidPayments = 0;
   var futurePayments = 0;
   var overduePayments = 0;
   var selectedAccountData = accountDetails.selectedAccountData;
  if (!kony.sdk.isNullOrUndefined(selectedAccountData)) {
    if (!kony.sdk.isNullOrUndefined(selectedAccountData.paidInstallmentsCount))
        paidPayments = parseInt(selectedAccountData.paidInstallmentsCount);
    if (!kony.sdk.isNullOrUndefined(selectedAccountData.overDueInstallmentsCount))
        overduePayments = parseInt(selectedAccountData.overDueInstallmentsCount);
    if (!kony.sdk.isNullOrUndefined(selectedAccountData.futureInstallmentsCount))
        futurePayments = parseInt(selectedAccountData.futureInstallmentsCount);
    var totalLoanPayments = paidPayments + overduePayments + futurePayments;
   if(!kony.sdk.isNullOrUndefined(paidPayments) && !kony.sdk.isNullOrUndefined(overduePayments) && !kony.sdk.isNullOrUndefined(futurePayments)){
     this.view.lblPaidLoans.text=this.includeZeroForSingleDigits(paidPayments);
     this.view.lblOverdueLoans.text=this.includeZeroForSingleDigits(overduePayments);
     this.view.lblFutureLoans.text=this.includeZeroForSingleDigits(futurePayments);
     this.view.lblPercent.text=this.includeZeroForSingleDigits(totalLoanPayments);
    var paidPaymentsPercentageVal = Math.round((paidPayments * 100) / totalLoanPayments);
    var overduePaymentsPercentageVal = Math.round((overduePayments * 100) / totalLoanPayments);
    var futurePaymentsPercentageVal = 100-(paidPaymentsPercentageVal+overduePaymentsPercentageVal);
    chartData_Labels.push("Paid",paidPaymentsPercentageVal+"%");
    chartData_Labels.push("Overdue",overduePaymentsPercentageVal+"%");
    chartData_Labels.push("Future",futurePaymentsPercentageVal+"%");
    chartData_values.push(paidPaymentsPercentageVal);
    chartData_values.push(overduePaymentsPercentageVal);
    chartData_values.push(futurePaymentsPercentageVal);
    var x = this.view.browserChart.evaluateJavaScript("AddDonutChart(" + JSON.stringify(chartData_Labels) +","+JSON.stringify(chartData_values)+");");
    if (!x) {
      kony.print("Error in creating PFM Charts");
    }
   }
  }
 },
  segInstallmentsOnRowClick: function() {
    var selectedSectionIndex = Math.floor(this.view.segInstallments.selectedRowIndex[0]);
    var selectedRowIndex = Math.floor(this.view.segInstallments.selectedRowIndex[1]);
    var installmentsData = this.view.segInstallments.data[selectedSectionIndex][1][selectedRowIndex];
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmInstallmentDetails",installmentsData);
    navMan.navigateTo("frmInstallmentDetails");
  },
  navigateToDownloadTransaction: function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmDownloadLoanSchedule");
  },
  flxBackOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    var confManager = applicationManager.getConfigurationManager();
    var isBusinessUser = confManager.isCombinedUser === "true" || confManager.isSMEUser === "true";
        if (isBusinessUser) {
            var bbaccountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BBAccountsModule");
            bbaccountMod.presentationController.commonFunctionForNavigation("BBAccountsModule/frmAccountDetailsNew");
        } else {
            var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
            accountMod.presentationController.commonFunctionForNavigation("frmAccountDetails");
        }
  },
  sectionClicked: function(sectionIndex, context) {
    var sectionIndex = context.sectionIndex;
    var data = this.view.segInstallments.data;
    if (data[sectionIndex] !== null) {
      var selectedHeaderData = data[sectionIndex][0];
      if (selectedHeaderData["imgUpArrow"].src === "arrowdown.png") {
        selectedHeaderData["imgUpArrow"].src = "arrowup.png";
        if (data[sectionIndex][1] !== null) data[sectionIndex][1] = [];
        this.view.segInstallments.setData(data);
      } else {
        selectedHeaderData["imgUpArrow"].src = "arrowdown.png";
        if (data[sectionIndex][1] !== null) data[sectionIndex][1] = this.segmentData[sectionIndex][1];
        this.view.segInstallments.setData(data);
      }
    }
  },
 isEmptyNullUndefined: function(data){
    if(data === null || data === undefined || data === "")
      return true;
    return false;
  }
});