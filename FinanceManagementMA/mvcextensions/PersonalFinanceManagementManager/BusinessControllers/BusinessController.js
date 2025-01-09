/**
*@module PersonalFinanceManager
 */
define(['OLBConstants'], function(OLBConstants) {
  /**
   * PersonalFinanceManager is the class used to hold the information about all internal and external accounts.
   *@alias module:PersonalFinanceManager
   *@class
   */
  function PersonalFinanceManager() {
    
  }
  inheritsFrom(PersonalFinanceManager, kony.mvc.Business.Delegator);
  PersonalFinanceManager.prototype.initializeBusinessController = function(){};
/** 
 * Fetches the list of PFM categories using a service call
 * @param {Function} presentationSuccessCallback - will be called when call is successfull.
 * @param {Function} presentationErrorCallback - will be called when call is not successfull.
 */
  PersonalFinanceManager.prototype.getPFMCategories = function(successCallback,failureCallback){
    function getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        successCallback(obj["data"]);
      }
      else{
        failureCallback(obj["errmsg"]);
      }
    }
    var pfmCategoriesInstance  =  kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMCategory");
    pfmCategoriesInstance.getByCriteria({},getAllCompletionCallback);
  };
  /**
* Method to get monthly spending PFM data
* @param {Object} inputParams MDA expression containing month and year
* @param {Function} successCallback Method that gets called if service call is success
* @param {Function} errorCallback Method that gets called if service call is failure
*/
  PersonalFinanceManager.prototype.getMonthlySpending = function(inputParams,successCallback,errorCallback)
  {
    function getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,data, error);
      if (obj["status"] === true) {
        successCallback(obj["data"]);
      } else {
        errorCallback(obj["errmsg"]);
      }
    }
    var  PFMPieChartModel  =  kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMPieChart");
    PFMPieChartModel.getByCriteria(inputParams,getAllCompletionCallback);
  };
  PersonalFinanceManager.prototype.bulkUpdateTransactions = function(transactionList,presentationSuccessCallback,presentationErrorCallback){
    var self = this;
    var PFMTransactions = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMTransactions");
    PFMTransactions.customVerb("updateBulkPFMTransaction", { "pfmtransactionlist": JSON.stringify(transactionList) }, completionCallBack);
    function completionCallBack(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  PersonalFinanceManager.prototype.getMonthlyCategorizedTransactions = function(monthId,yearId,presentationSuccessCallback,presentationErrorCallback){
    var self = this;
    var PfmTransactions = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMTransactions");
    var criteria = kony.mvc.Expression.and(
      kony.mvc.Expression.eq("monthId", monthId),
      kony.mvc.Expression.eq("getMonthlyTransactions", "true"),
      kony.mvc.Expression.eq("year", yearId));
  
    PfmTransactions.getByCriteria(criteria, completionCallback);
    function completionCallback(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  PersonalFinanceManager.prototype.getSelecetdPFMAccounts = function(params,presentationSuccessCallback,presentationErrorCallback){
    var self = this;
    var  PFMAccountsModel  =  kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMAccounts");
    PFMAccountsModel.customVerb('getPFMAccounts',params,completionCallback);
    function completionCallback(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  PersonalFinanceManager.prototype.getUncategorizedTransactions = function(criteria,presentationSuccessCallback,presentationErrorCallback){
    var self = this;
    var PFMTransactions = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMTransactions");
    PFMTransactions.getByCriteria(criteria, completionCallback);
    function completionCallback(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  PersonalFinanceManager.prototype.getYearlyBudgetData = function(criteria,presentationSuccessCallback,presentationErrorCallback){
    var self = this;
    var  PFMBudgetChartModel  =  kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMBudgetGraph");
    PFMBudgetChartModel.getByCriteria(criteria,completionCallback);
    function completionCallback(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
	/**
	 *  Fetches  monthwise expenditure for the signedin user
	 * @param {Function} presentationSuccessCallback - will be called when call is successfull.
	 * @param {Function} presentationErrorCallback - will be called when call is not successfull.
	 */
	PersonalFinanceManager.prototype.getPFMBarGraphData = function(year,successCallback,errorCallback)
	{
	  function getAllCompletionCallback(status,  data,  error) {
		var srh = applicationManager.getServiceResponseHandler();
		var obj = srh.manageResponse(status, data, error);
		if (obj["status"] === true) {
		  data.year = year;
		  successCallback(obj["data"]);
		}
		else{
		  errorCallback(obj["errmsg"]);
		}
	  }
	  var barGraphInstance  =  kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMBarGraph");
	  var criteria=kony.mvc.Expression.eq("year",year);
	  barGraphInstance.getByCriteria(criteria,getAllCompletionCallback);
	  //barGraphInstance.getByCriteria({},getAllCompletionCallback);
	};
	/**
	 *  Fetches cetotegorywise allocated budget and expendeniture for accounts of the signedin user.
	 * @param {Function} presentationSuccessCallback - will be called when call is successfull.
	 * @param {Function} presentationErrorCallback - will be called when call is not successfull.
	 */
	PersonalFinanceManager.prototype.getPFMBudgetGraphData = function(monthId,year,successCallback,errorCallback)
	{
	  function getAllCompletionCallback(status,  data,  error) {
		var srh = applicationManager.getServiceResponseHandler();
		var obj = srh.manageResponse(status, data, error);
		if (obj["status"] === true) {
		  successCallback(obj["data"]);
		}
		else{
		  errorCallback(obj["errmsg"]);
		}
	  }
	  var criteria = kony.mvc.Expression.and(kony.mvc.Expression.eq("monthId", monthId), kony.mvc.Expression.eq("year", year));
	  var budgetGraphInstance  =  kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMBudgetGraph");
	  budgetGraphInstance.getByCriteria(criteria,getAllCompletionCallback);
	};
	/**
	 * Fetches  categorywise expenses for the given monthid
	 * @param {object} monthId - monthId for which data is to be obtained.
	 * @param {Function} presentationSuccessCallback - will be called when call is successfull.
	 * @param {Function} presentationErrorCallback - will be called when call is not successfull.
	 */
	PersonalFinanceManager.prototype.getPFMPieChartData = function(monthId,yearId,successCallback,errorCallback)
	{
	  function getAllCompletionCallback(status,  data,  error) {
		var srh = applicationManager.getServiceResponseHandler();
		var obj = srh.manageResponse(status, data, error);
		if (obj["status"] === true) {
		  successCallback(obj["data"]);
		}
		else{
		  errorCallback(obj["errmsg"]);
		}
	  }
	  var pieChartInstance  =  kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMPieChart");
	  if(!kony.sdk.isNullOrUndefined(monthId))
	  {
		 var param = kony.mvc.Expression.and(kony.mvc.Expression.eq("monthId", monthId), kony.mvc.Expression.eq("year", yearId));
	  }else{
		 var param = kony.mvc.Expression.eq("year", yearId);
	  }
	  pieChartInstance.getByCriteria(param,getAllCompletionCallback);
	};
    PersonalFinanceManager.prototype.getPFMTransactions = function(inputParams, successCallback, errorCallback) {
        function getAllCompletionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                successCallback(obj["data"]);
            } else {
                errorCallback(obj["errmsg"]);
            }
        }
        var transactionsInstance = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMTransactions");
        var params;
        if (!kony.sdk.isNullOrUndefined(inputParams.getMonthlyTransactions)) {
            params = kony.mvc.Expression.and(kony.mvc.Expression.eq("monthId", inputParams.monthId), kony.mvc.Expression.eq("year", inputParams.year), kony.mvc.Expression.eq("getMonthlyTransactions", inputParams.getMonthlyTransactions));
        }
        else if(!kony.sdk.isNullOrUndefined(inputParams.categoryId) && !kony.sdk.isNullOrUndefined(inputParams.monthId)){
            params = kony.mvc.Expression.and(kony.mvc.Expression.eq("monthId", inputParams.monthId),
                                             kony.mvc.Expression.eq("year", inputParams.year),
                                             kony.mvc.Expression.eq("categoryId", inputParams.categoryId),
                                             kony.mvc.Expression.eq("sortBy", "transactionDate"),
                                             kony.mvc.Expression.eq("order", "desc"));    
            }
         else if (!kony.sdk.isNullOrUndefined(inputParams.year)) {
            params = kony.mvc.Expression.eq("year", inputParams.year);
        } else {
            params = kony.mvc.Expression.and(kony.mvc.Expression.eq("monthId", inputParams.monthId), kony.mvc.Expression.eq("categoryId", inputParams.categoryId));
        }
        transactionsInstance.getByCriteria(params, getAllCompletionCallback);
    };
  PersonalFinanceManager.prototype.updatePFMTransaction = function(transactionRecord,successCallback,failureCallback){
  function getAllCompletionCallback(status,  data,  error) {
    var srh = applicationManager.getServiceResponseHandler();
    var obj = srh.manageResponse(status, data, error);
    if (obj["status"] === true) {
     successCallback(obj["data"]);
    }
    else{
      failureCallback(obj["errmsg"]);
    }
  }
  var transactionInstance  =  kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMTransactions");
  var transactionObject = new transactionInstance(transactionRecord);
  transactionObject.partialUpdate(getAllCompletionCallback);
};

  PersonalFinanceManager.prototype.getYearlySpending = function(criteria,presentationSuccessCallback,presentationErrorCallback){
    var self = this;
    var  PFMBarChartModel  =  kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PFMBarGraph");
    PFMBarChartModel.getByCriteria(criteria,completionCallback);
    function completionCallback(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  return PersonalFinanceManager;
});
