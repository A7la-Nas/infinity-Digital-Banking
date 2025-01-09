define([], function () {

  /**
   * User defined business controller
   * @constructor
   * @extends kony.mvc.Business.Delegator
   */
  function ForeignExchangeManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(ForeignExchangeManager, kony.mvc.Business.Delegator);
  
  ForeignExchangeManager.prototype.fetchBaseCurrency = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var forex = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
    forex.customVerb("fetchBaseCurrency", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  ForeignExchangeManager.prototype.fetchDashboardCurrencyRates = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var forex = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
    forex.customVerb("fetchDashboardCurrencyRates", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  ForeignExchangeManager.prototype.fetchCurrencyRates = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var forex = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
    forex.customVerb("fetchCurrencyRates", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  ForeignExchangeManager.prototype.updateRecentCurrency = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var forex = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
    forex.customVerb("updateRecentCurrencies", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  ForeignExchangeManager.prototype.fetchDashboardCurrencyList = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var forex = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
    forex.customVerb("fetchDashboardCurrencyList", params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  return ForeignExchangeManager;

});