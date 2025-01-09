define([], function () { 
    
  /**
   * User defined business controller
   * @constructor
   * @extends kony.mvc.Business.Delegator
   */
  function InwardCollectionsManager() { 

      kony.mvc.Business.Delegator.call(this); 

  } 

  inheritsFrom(InwardCollectionsManager, kony.mvc.Business.Delegator); 

// create methods here.

/**
 * Method to fetch Collections
 * @param {Object} params request parameters
 * @param {function} successCallback invoke the call back with success response
 * @param {function} errorCallback invoke the call back with error response
 */
 InwardCollectionsManager.prototype.fetchInwardCollections = function (params, successCallback, errorCallback) {
  const InwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("InwardCollections");
  InwardCollectionsModel.customVerb('getCollections', params, getCompletionCallback);
  function getCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
          successCallback(obj.data);
      } else {
          errorCallback(obj.errmsg);
      }
  }
};
  
 /**
 * Method to fetch Collections by ID
 * @param {Object} params request parameters
 * @param {function} successCallback invoke the call back with success response
 * @param {function} errorCallback invoke the call back with error response
 */
 InwardCollectionsManager.prototype.fetchInwardCollectionsById = function (params, successCallback, errorCallback) {
    const InwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("InwardCollections");
    InwardCollectionsModel.customVerb('getCollectionById', params, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
        const srh = applicationManager.getServiceResponseHandler();
        const obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
            successCallback(obj.data);
        } else {
            errorCallback(obj.errmsg);
        }
    }
  };
  
  /**
     * Method to generate Inward Collections.
     * @param {object} params - consist of payload to generate file
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
  InwardCollectionsManager.prototype.generateInwardCollections = function (params, presentationSuccessCallback, presentationErrorCallback) {
    const InwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("InwardCollections");
    InwardCollectionsModel.customVerb('generateInwardCollectionReport', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  
  /**
  * Method to generate Inward collections List.
  * @param {object} params - consist of payload to generate file
  * @param {function} presentationSuccessCallback - invoke the call back with success response
  * @param {function} presentationErrorCallback - invoke the call back with error response
  */
  InwardCollectionsManager.prototype.generateInwardCollectionsList = function (params, presentationSuccessCallback, presentationErrorCallback) {
    const InwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("InwardCollections");
    InwardCollectionsModel.customVerb('generateInwardCollectionsList', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

 /**
  * Method to fetch Amendments
  * @param {Object} params request parameters
  * @param {function} successCallback invoke the call back with success response
  * @param {function} errorCallback invoke the call back with error response
  */
  InwardCollectionsManager.prototype.fetchInwardAmendments = function (params, successCallback, errorCallback) {
   const InwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("InwardCollections");
   InwardCollectionsModel.customVerb('GetInwardCollectionsAmendments', params, getCompletionCallback);
   function getCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
          successCallback(obj.data);
      } else {
          errorCallback(obj.errmsg);
      }
  }
};
  
 /**
  * Method to fetch Amendments by ID
  * @param {Object} params request parameters
  * @param {function} successCallback invoke the call back with success response
  * @param {function} errorCallback invoke the call back with error response
  */
  InwardCollectionsManager.prototype.fetchInwardAmendmentsById = function (params, successCallback, errorCallback) {
    const InwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("InwardCollections");
    InwardCollectionsModel.customVerb('GetInwardCollectionsAmendmentById', params, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
        const srh = applicationManager.getServiceResponseHandler();
        const obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
            successCallback(obj.data);
        } else {
            errorCallback(obj.errmsg);
        }
    }
  };
  
    /**
     * Method to generate Inward Amendments.
     * @param {object} params - consist of payload to generate file
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
  InwardCollectionsManager.prototype.generateInwardAmendment = function (params, presentationSuccessCallback, presentationErrorCallback) {
    const InwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("InwardCollections");
    InwardCollectionsModel.customVerb('generateAmendmentReport', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  }; 
  
   /**
     * Method to generate Inward Amendments.
     * @param {object} params - consist of payload to generate file
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
  InwardCollectionsManager.prototype.generateInwardAmendmentsList = function (params, presentationSuccessCallback, presentationErrorCallback) {
    const InwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("InwardCollections");
    InwardCollectionsModel.customVerb('generateAmendmentsList', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  
  /**
   * Accept/Reject the Amendment
   * @param {object} params - consist of payload to Accept/Reject the Amendment
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
  InwardCollectionsManager.prototype.updateInwardCollectionAmendment = function (params, presentationSuccessCallback, presentationErrorCallback) {
    const InwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("InwardCollections");
    InwardCollectionsModel.customVerb('updateInwardCollectionAmendment', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
    /**
   * Accept/Reject the Collections
   * @param {object} params - consist of payload to Accept/Reject the Collection
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
   InwardCollectionsManager.prototype.updateInwardCollections = function (params, presentationSuccessCallback, presentationErrorCallback) {
    const InwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("InwardCollections");
    InwardCollectionsModel.customVerb('UpdateInwardCollection', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  return InwardCollectionsManager;

});