define([], function () {
  /**
   * User defined business controller
   * @constructor
   * @extends kony.mvc.Business.Delegator
   */
  function AccountSweepsManager() {
    var modelDefinition =
      kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition(
        "AccountSweeps"
      );
    this.sweepsObject = new modelDefinition();

    kony.mvc.Business.Delegator.call(this);
  }
  inheritsFrom(AccountSweepsManager, kony.mvc.Business.Delegator);
  AccountSweepsManager.prototype.initializeBusinessController = function () { };
  /**
   * set an attribute in the sweeps object.
   * @param {string} key , key in the sweeps object.
   * @param {string} value , value to be assigned for the key in the sweeps object.
   */
  AccountSweepsManager.prototype.setSweepsAttribute = function (key, value) {
    this.sweepsObject[key] = value;
  };

  /**
   * used to get a transaction object.
   * @return {object} sweepsObject, entire Transaction Object.
   */
  AccountSweepsManager.prototype.getSweepsObject = function () {
    return this.sweepsObject;
  };

  /**
   * used to set a sweep object.
   * @param {object} object, entire sweep Object.
   */
  AccountSweepsManager.prototype.setSweepsObject = function (object) {
    this.sweepsObject = object;
  };

  /**
   * used to clear sweep Object.
   */
  AccountSweepsManager.prototype.clearSweepsObject = function () {
    var modelDefinition =
      kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition(
        "AccountSweeps"
      );
    this.sweepsObject = new modelDefinition();
  };
    /**
   * get sweeps details for a particular account using a service call.
   * @param {function} presentationSuccessCallback , invoke the call back with success response.
   * @param {function} presentationErrorCallback , invoke the call back with error response.
   */
  AccountSweepsManager.prototype.getSweepById = function (
    criteria,
    presentationSuccessCallback,
    presentationErrorCallback
  ) {
    var postTran = kony.mvc.MDAApplication.getSharedInstance()
      .getRepoManager()
      .getRepository("AccountSweeps");
    postTran.customVerb(
      "getAccountSweepById",
      criteria,
      getAllCompletionCallback
    );
    function getAllCompletionCallback(status, data, error) {
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
   * create sweeps for a particular account using a service call.
   * @param {function} presentationSuccessCallback , invoke the call back with success response.
   * @param {function} presentationErrorCallback , invoke the call back with error response.
   */
  AccountSweepsManager.prototype.createAccountSweep = function (
    criteria,
    presentationSuccessCallback,
    presentationErrorCallback
  ) {
    var postTran = kony.mvc.MDAApplication.getSharedInstance()
      .getRepoManager()
      .getRepository("AccountSweeps");
    postTran.customVerb(
      "createAccountSweep",
      criteria,
      getAllCompletionCallback
    );
    function getAllCompletionCallback(status, data, error) {
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
     * delete sweeps for a particular account using a service call.
     * @param {function} presentationSuccessCallback , invoke the call back with success response.
     * @param {function} presentationErrorCallback , invoke the call back with error response.
     */
  AccountSweepsManager.prototype.deleteAccountSweep = function (criteria, presentationSuccessCallback, presentationErrorCallback) {
    var postTran = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("AccountSweeps");
    postTran.customVerb("deleteAccountSweep", criteria, getAllCompletionCallback);
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
  /**
   * edit sweeps for a particular account using a service call.
   * @param {function} presentationSuccessCallback , invoke the call back with success response.
   * @param {function} presentationErrorCallback , invoke the call back with error response.
   */
  AccountSweepsManager.prototype.editAccountSweep = function (
    criteria,
    presentationSuccessCallback,
    presentationErrorCallback
  ) {
    var postTran = kony.mvc.MDAApplication.getSharedInstance()
      .getRepoManager()
      .getRepository("AccountSweeps");
    postTran.customVerb("editAccountSweep", criteria, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
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
   * download the particular sweep using a service call.
   * @param {function} presentationSuccessCallback , invoke the call back with success response.
   * @param {function} presentationErrorCallback , invoke the call back with error response.
   */
  AccountSweepsManager.prototype.DownloadAccountSweeps = function (criteria, presentationSuccessCallback, presentationErrorCallback) {
    var postTran = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("AccountSweeps");
    postTran.customVerb("initiateDownloadAccountSweeps", criteria, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
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
   * get all sweeps using a service call.
   * @param {function} presentationSuccessCallback , invoke the call back with success response.
   * @param {function} presentationErrorCallback , invoke the call back with error response.
   */
  AccountSweepsManager.prototype.getAllSweeps = function (
    criteria,
    presentationSuccessCallback,
    presentationErrorCallback
  ) {
    var postTran = kony.mvc.MDAApplication.getSharedInstance()
      .getRepoManager()
      .getRepository("AccountSweeps");
    postTran.customVerb("getAccountSweeps", criteria, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  return AccountSweepsManager;
});