define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController", "dataFormatUtility", "CommonUtilities"], function(AsyncManager, dataFormater, CommonUtilities) {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */

  function PersonalFinanceManagement_PresentationController() {
    scope_PFM_Pres = this;
    kony.mvc.Presentation.BasePresenter.call(this);
    this.asyncManager = new AsyncManager();
    /**   numberOfAsyncForTransactions
          *  1.getAccountPendingTransactions
          *  2.getAccountPostedTransactions
            */
    scope_PFM_Pres.numberOfAsyncForTransactions=2;
    scope_PFM_Pres.numberOfAsyncForAccounts=2;
    scope_PFM_Pres.numberOfAsyncForDetails=3;
    /**   numberOfAsyncForPFMGraph
          *  1.getPFMBarGraph
          *  2.getPFMBudgetGraph
          *  3.getPFMPieChartData
            */
    scope_PFM_Pres.numberOfAsyncForPFMGraph=3;
    downloadtransactionDetails="";
    scope_PFM_Pres.blockedFundsData= [];
    this.directMarketingManager = applicationManager.getDirectMarketingManager();
  }

  inheritsFrom(PersonalFinanceManagement_PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  PersonalFinanceManagement_PresentationController.prototype.initializePresentationController = function() {

  };
  PersonalFinanceManagement_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
	//kony.application.destroyForm(formName);
    navManager.navigateTo(formName);
  };
  PersonalFinanceManagement_PresentationController.prototype.getPFMCategories = function(successCallback,failureCallback){
    var personalFinanceManager = applicationManager.getPersonalFinanceManager();
    personalFinanceManager.getPFMCategories(successCallback,failureCallback);
  };
  PersonalFinanceManagement_PresentationController.prototype.updatePFMTransaction = function(transactionRecord,successCallback,failureCallback){   
    var personalFinanceManager = applicationManager.getPersonalFinanceManager();
    personalFinanceManager.updatePFMTransaction(transactionRecord,successCallback,failureCallback);

  };
   PersonalFinanceManagement_PresentationController.prototype.getUncategorizedTransactions = function(reqObject, successCallback, failureCallback) {
        var personalFinanceManager = applicationManager.getPersonalFinanceManager();   
        var criteria = kony.mvc.Expression.and(kony.mvc.Expression.eq("monthId", reqObject.monthId),
                                       kony.mvc.Expression.eq("year", reqObject.year),                                       
                                       kony.mvc.Expression.eq("categoryId", reqObject.categoryId),
                                       kony.mvc.Expression.eq("sortBy", reqObject.sortBy),
                                       kony.mvc.Expression.eq("order", reqObject.order));

        personalFinanceManager.getUncategorizedTransactions(criteria, successCallback, failureCallback);
    };
  PersonalFinanceManagement_PresentationController.prototype.fetchPFMDetails = function(toBeNavigated){

    applicationManager.getPresentationUtility().showLoadingScreen();
    var monthId = "1";
    var date  = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var personalFinanceManager = applicationManager.getPersonalFinanceManager();
    var navManager = applicationManager.getNavigationManager();
    var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
    if (!kony.sdk.isNullOrUndefined(selectedData) && !kony.sdk.isNullOrUndefined(selectedData.fromMyMoneyflag) &&  selectedData.fromMyMoneyflag === true)
    {
      year = selectedData.year;
    }
    scope_PFM_Pres.asyncManager.initiateAsyncProcess(scope_PFM_Pres.numberOfAsyncForPFMGraph);
    personalFinanceManager.getPFMBarGraphData(year,scope_PFM_Pres.barGraphSuccessCallback.bind(this,toBeNavigated),scope_PFM_Pres.barGraphFailureCallback);
    personalFinanceManager.getPFMBudgetGraphData(month,year,scope_PFM_Pres.budgetGraphSuccessCallback.bind(this,toBeNavigated),scope_PFM_Pres.budgetGraphFailureCallback);
    personalFinanceManager.getPFMPieChartData(month,year,scope_PFM_Pres.pieChartSuccessCallback.bind(this,toBeNavigated),scope_PFM_Pres.pieChartFailureCallback);
  };
  PersonalFinanceManagement_PresentationController.prototype.getPFMTransactions = function(inputParams,successCallback,failureCallback){
    var personalFinanceManager = applicationManager.getPersonalFinanceManager();
    personalFinanceManager.getPFMTransactions(inputParams,successCallback,failureCallback);

  };
  PersonalFinanceManagement_PresentationController.prototype.barGraphSuccessCallback = function(toBeNavigated,response){
    var date = new Date();
    var presentYear = date.getFullYear();
    var pfmYearData = response;
    if(date.getFullYear() === response.year)
    {
      pfmYearData = pfmYearData.slice(0,date.getMonth()+1);
    }
    scope_PFM_Pres.asyncManager.setSuccessStatus(0,pfmYearData);
    if(scope_PFM_Pres.asyncManager.areAllservicesDone(scope_PFM_Pres.numberOfAsyncForPFMGraph)){
      scope_PFM_Pres.navigateToPFMMyMoney(toBeNavigated);
    }
  };
  PersonalFinanceManagement_PresentationController.prototype.barGraphFailureCallback = function(response){
    scope_PFM_Pres.asyncManager.setErrorStatus(0,response);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  PersonalFinanceManagement_PresentationController.prototype.budgetGraphSuccessCallback = function(toBeNavigated,response){
    scope_PFM_Pres.asyncManager.setSuccessStatus(1, response);
    if(scope_PFM_Pres.asyncManager.areAllservicesDone(scope_PFM_Pres.numberOfAsyncForPFMGraph)){
      scope_PFM_Pres.navigateToPFMMyMoney(toBeNavigated);
    }
  };
  PersonalFinanceManagement_PresentationController.prototype.budgetGraphFailureCallback = function(response){
    scope_PFM_Pres.asyncManager.setErrorStatus(1, response);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  PersonalFinanceManagement_PresentationController.prototype.pieChartFailureCallback = function(response){
    scope_PFM_Pres.asyncManager.setErrorStatus(2, response);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  PersonalFinanceManagement_PresentationController.prototype.pieChartSuccessCallback = function(toBeNavigated,response){
    var pieData = {};
    var date  = new Date();
    var pieResponse = response;
    var navManager = applicationManager.getNavigationManager();
    var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
    var MONTH_NAMES = ["None", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for(var i=0;i<13;i++)
    {
      var pieMonthData = [];
      for(var j=0;j<pieResponse.length;j++){
        if(pieResponse[j].monthName === MONTH_NAMES[i])
        {
          pieMonthData.push(pieResponse[j]);
        }
      }
      pieData[MONTH_NAMES[i]] = pieMonthData;
    }
    scope_PFM_Pres.asyncManager.setSuccessStatus(2,pieData);
    if(scope_PFM_Pres.asyncManager.areAllservicesDone(scope_PFM_Pres.numberOfAsyncForPFMGraph)){
      scope_PFM_Pres.navigateToPFMMyMoney(toBeNavigated);
    }
  };
  PersonalFinanceManagement_PresentationController.prototype.getDateRange = function(noOfDays){
    var fotmatUtilManager = applicationManager.getFormatUtilManager();
    var startDate = fotmatUtilManager.getFormatedDateString(fotmatUtilManager.getPreviousDate(noOfDays),fotmatUtilManager.getBackendDateTimeFormat());
    var lastDate = fotmatUtilManager.getFormatedDateString(new Date(),fotmatUtilManager.getBackendDateTimeFormat());
    return {"searchStartDate":startDate,"searchEndDate":lastDate};
  };
  PersonalFinanceManagement_PresentationController.prototype.getCustomRange = function(beginingDate,endDate){
    if(endDate-beginingDate>=0){
      var fotmatUtilManager = applicationManager.getFormatUtilManager();
      var startDate = fotmatUtilManager.getFormatedDateString(beginingDate,fotmatUtilManager.getBackendDateTimeFormat());
      var lastDate = fotmatUtilManager.getFormatedDateString(endDate,fotmatUtilManager.getBackendDateTimeFormat());
      return {"searchStartDate":startDate,"searchEndDate":lastDate};
    }
    else{
      return null;
    }
  };
  
  PersonalFinanceManagement_PresentationController.prototype.fetchMonthPFMData = function(monthId,yearId,successCallback,failureCallback){
    var personalFinanceManager = applicationManager.getPersonalFinanceManager();
    personalFinanceManager.getPFMPieChartData(monthId,yearId,successCallback,failureCallback);
  };
  PersonalFinanceManagement_PresentationController.prototype.navigateToPFMMyMoney = function(toBeNavigated){
    var navManager = applicationManager.getNavigationManager();
    var pfmData = {
      "pie":scope_PFM_Pres.asyncManager.getData(2),
      "bar":scope_PFM_Pres.asyncManager.getData(0),
      "budget":scope_PFM_Pres.asyncManager.getData(1)
    };
    applicationManager.getPresentationUtility().dismissLoadingScreen();

    navManager.setCustomInfo("frmPFMMyMoney",pfmData);
    if(toBeNavigated){
      var frmName= {"appName": "FinanceManagementMA","friendlyName": "PersonalFinanceManagementUIModule/frmPFMMyMoney"};
	 // kony.application.destroyForm(frmName);
      applicationManager.getNavigationManager().navigateTo(frmName);
    }
  };
  PersonalFinanceManagement_PresentationController.prototype.barGraphPFM = function(year){
    var personalFinanceManager = applicationManager.getPersonalFinanceManager();
    personalFinanceManager.getPFMBarGraphData(year,scope_PFM_Pres.barGraphPFMSuccessCallback,scope_PFM_Pres.barGraphFailureCallback);
  };
  PersonalFinanceManagement_PresentationController.prototype.barGraphPFMSuccessCallback = function(response){
     
    var viewController = applicationManager.getPresentationUtility().getController('frmUnifiedDashboard', true);
    viewController.monthFetchSuccessBar(response);
    applicationManager.getPresentationUtility().dismissLoadingScreen();     
  };

  return PersonalFinanceManagement_PresentationController;
});