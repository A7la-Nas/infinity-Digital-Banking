define([], function () {

    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function OutwardCollectionsManager() {
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(OutwardCollectionsManager, kony.mvc.Business.Delegator);

    /**
     * Method to fetch payment payees
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    OutwardCollectionsManager.prototype.fetchPaymentPayees = function (params, successCallback, errorCallback) {
        const payeesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Payees");
        payeesModel.customVerb("getPayees", params, getCompletionCallback, "online");
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
     * Method to fetch corporate payees
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    OutwardCollectionsManager.prototype.fetchCorporatePayees = function (params, successCallback, errorCallback) {
        const payeeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Payee");
        payeeModel.customVerb('getCorporatePayees', params, getCompletionCallback);
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
     * Method to fetch Outward Collections
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    OutwardCollectionsManager.prototype.fetchOutwardCollections = function (params, successCallback, errorCallback) {
        const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
        OutwardCollectionsModel.customVerb('getCollections', params, getCompletionCallback);
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
     * Method to update request collection status
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    OutwardCollectionsManager.prototype.updateRequestCollectionStatus = function (params, successCallback, errorCallback) {
      const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
      OutwardCollectionsModel.customVerb('requestCollectionStatus', params, getCompletionCallback);
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
    OutwardCollectionsManager.prototype.fetchOutwardCollectionsById = function (params, successCallback, errorCallback) {
        const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
        OutwardCollectionsModel.customVerb('getCollectionById', params, getCompletionCallback);
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
     * Method to generate Outward Collections.
     * @param {object} params - consist of payload to generate file
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    OutwardCollectionsManager.prototype.generateOutwardCollections = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
        OutwardCollectionsModel.customVerb('generateCollectionReport', params, getAllCompletionCallback);
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
     * Method to generate Outward collections List.
     * @param {object} params - consist of payload to generate file
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    OutwardCollectionsManager.prototype.generateOutwardCollectionsList = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
        OutwardCollectionsModel.customVerb('generateCollectionsList', params, getAllCompletionCallback);
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
    OutwardCollectionsManager.prototype.fetchOutwardAmendments = function (params, successCallback, errorCallback) {
        const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
        OutwardCollectionsModel.customVerb('getAmendments', params, getCompletionCallback);
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
   * Method to generate Outward Amendments.
   * @param {object} params - consist of payload to generate file
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
   OutwardCollectionsManager.prototype.generateOutwardAmendments = function (params, presentationSuccessCallback, presentationErrorCallback) {
    const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
    OutwardCollectionsModel.customVerb('generateAmendmentReport', params, getAllCompletionCallback);
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
   * Method to fetch Amendments by ID
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
    OutwardCollectionsManager.prototype.fetchOutwardAmendmentById = function (params, successCallback, errorCallback) {
      const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
      OutwardCollectionsModel.customVerb('getAmendmentById', params, getCompletionCallback);
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
   * Method to save Outward Collections
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
  OutwardCollectionsManager.prototype.saveOutwardCollection = function (params, successCallback, errorCallback) {
    const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
    OutwardCollectionsModel.customVerb('saveCollection', params, getCompletionCallback);
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
   * Method to create Outward Collections
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
  OutwardCollectionsManager.prototype.createCollection = function (params, successCallback, errorCallback) {
    const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
    OutwardCollectionsModel.customVerb('createCollection', params, getCompletionCallback);
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
   * Method to save Drawee For Future Ref
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
  OutwardCollectionsManager.prototype.saveDraweeForFutureRef = function (params, successCallback, errorCallback) {
    const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Payee");
    OutwardCollectionsModel.customVerb('createCorporatePayee', params, getCompletionCallback);
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

  OutwardCollectionsManager.prototype.generateOutwardAmendmentsList = function(params, presentationSuccessCallback, presentationErrorCallback) {
    const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
    OutwardCollectionsModel.customVerb('generateAmendmentsList', params, getAllCompletionCallback);

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
   * Method to create Outward Collection Amendment
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
   OutwardCollectionsManager.prototype.createAmendment = function (params, successCallback, errorCallback) {
    const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
    OutwardCollectionsModel.customVerb('createAmendment', params, getCompletionCallback);
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
   * Method to update Outward Collection Amendment
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
   OutwardCollectionsManager.prototype.updateAmendment = function (params, successCallback, errorCallback) {
    const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
    OutwardCollectionsModel.customVerb('updateAmendment', params, getCompletionCallback);
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
     * Method to fetch SWIFT/BIC codes
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
        OutwardCollectionsManager.prototype.fetchSwiftBicCodes = function (params, successCallback, errorCallback) {
          const LCModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LetterOfCredit");
          LCModel.customVerb('getSwiftCode', params, getCompletionCallback);
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
   * Method to save Outward Collections
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
  OutwardCollectionsManager.prototype.fetchSwiftsAdvices = function (params, successCallback, errorCallback) {
    const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("SwiftsAndAdvices");
    OutwardCollectionsModel.customVerb('fetchSwiftsAdvices', params, getCompletionCallback);
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
   * Method to fetch file response
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
  OutwardCollectionsManager.prototype.fetchFileResponse = function (params, successCallback, errorCallback) {
    let downloadUrl = `${KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url}/operations/LCDocuments/downloadDocument`;
    const request = new kony.net.HttpRequest();
    request.open('POST', downloadUrl, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("X-Kony-Authorization", KNYMobileFabric.currentClaimToken);
    request.onReadyStateChange = function () {
      if (request.readyState === 4 && request.status === 200 && request.getResponseHeader("Content-Type") === "text/plain;charset=UTF-8") {
        successCallback(request.response);
      } else if (request.readyState === 4 && request.getResponseHeader("Content-Type") !== "text/plain;charset=UTF-8") {
        errorCallback(JSON.parse(request.response.replace(/'/g, "\"")).dbpErrMsg);
      }
    };
    request.send(JSON.stringify({"fileId": params.fileId}));
  };

  /**
   * Method to delete the Outward Collections
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
  OutwardCollectionsManager.prototype.deleteCollection = function (params, successCallback, errorCallback) {
    const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
    OutwardCollectionsModel.customVerb('deleteCollection', params, getCompletionCallback);
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
   * Method to update the Outward Collections
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
  OutwardCollectionsManager.prototype.updateCollection = function (params, successCallback, errorCallback) {
    const OutwardCollectionsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OutwardCollections");
    OutwardCollectionsModel.customVerb('updateCollection', params, getCompletionCallback);
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
  
    return OutwardCollectionsManager;

});