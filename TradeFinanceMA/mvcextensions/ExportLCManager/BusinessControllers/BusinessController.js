define([], function () {

  /**
   * User defined business controller
   * @constructor
   * @extends kony.mvc.Business.Delegator
   */
  function ExportLCManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(ExportLCManager, kony.mvc.Business.Delegator);

  /**
   *  Method to update Export Drawings.
   * @params {object} - consists of Drawings Details.
   */
  ExportLCManager.prototype.updateExportLetterOfCreditDrawing = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('updateExportLetterOfCreditDrawing', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
   *  Method to Gets ExportLetter Of Credit.
   * @params {object} - consists of the LC Details.
   */
  ExportLCManager.prototype.getExportLetterOfCreditById = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('getExportLetterOfCreditsById', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  /**
   *  Method to Upload Export Documnets.
   * @params {object} - consists of the Upload Document reference.
   */
  ExportLCManager.prototype.uploadExportLCDocuments = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LCDocuments");
    ExportLCRepo.customVerb('uploadDocument', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  /**
   *  Method to Create Export LC Drawing.
   * @params {object} - consists of the Drawing Details.
   */
  ExportLCManager.prototype.createExportLCDrawing = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('createExportLetterOfCreditDrawing', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  /**
   *  Method to delete Export LC Drawing.
   * @params {object} - consists of the deleted drawing ref id.
   */
  ExportLCManager.prototype.deleteExportLetterOfCreditDrawing = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('deleteExportLetterOfCreditDrawing', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  /**
   *  Method to delete uploaded document.
   * @params {object} - consists of the deleted drawing ref id.
   */
  ExportLCManager.prototype.deleteDocument = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LCDocuments");
    ExportLCRepo.customVerb('deleteDocument', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  /**
  *  Method to  Gets ExportLetter Of Credit.
  * @params {object} - consists of the ImportLC Amend data.
  */
  ExportLCManager.prototype.getExportDrawingById = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('getExportLetterOfCreditDrawingById', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  /**
*  Method to Retrives the documents.
* @params {object} - consists of the ImportLC Amend data.
*/
  ExportLCManager.prototype.retrieveDocuments = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LCDocuments");
    ExportLCRepo.customVerb('retrieveDocuments', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  /**
   * Method to generate Export Letter Of Credit.
   * @param {object} params - consist of payload to generate file
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
  ExportLCManager.prototype.generateExportLetterOfCredit = function (params, presentationSuccessCallback, presentationErrorCallback) {
    const LCSummaryRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LCSummary");
    LCSummaryRepo.customVerb('generateExportLC', params, getAllCompletionCallback);
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
   * Method to generate Export Drawing.
   * @param {object} params - consist of payload to generate file
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
  ExportLCManager.prototype.generateExportDrawing = function (params, presentationSuccessCallback, presentationErrorCallback) {
    const ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('generateExportLetterOfCreditDrawing', params, getAllCompletionCallback);
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
   *  Method to Gets ExportLC Amendments
   * @params {object} - consists of the Amendment Details.
   */
  ExportLCManager.prototype.getExportLetterofCreditCAmendmentById = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('getExportLCAmendmentById', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  /**
   *  Method to update ExportLCAmendments.
   * @params {object} - consists of ExportLC AmendmentsDetails.
   */
  ExportLCManager.prototype.updateExportLetterofCreditAmendment = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('updateExportLCAmendment', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };


  /**
     * Method to generate Export Amendment.
     * @param {object} params - consist of payload to generate file
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
  ExportLCManager.prototype.generateExportAmendment = function (params, presentationSuccessCallback, presentationErrorCallback) {
    const ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('generateExportLetterOfCreditAmendment', params, getAllCompletionCallback);
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
   *  Method to Gets ExportLCAmmendments.
   * @params {object} - consists of the LC Details.
   */
  ExportLCManager.prototype.getExportLCAmmendments = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('getExportLCAmmendments', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
   * Method to fetch receivables
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
  ExportLCManager.prototype.fetchExportLetterOfCredits = function (params, successCallback, errorCallback) {
    const ExportLCModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCModel.customVerb('getExportLetterOfCredits', params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        successCallback(obj["data"]);
      } else {
        errorCallback(obj["errmsg"]);
      }
    }
  };
  /**
 * Method to fetch Swifts Advices
 * @param {Object} params request parameters
 * @param {function} successCallback invoke the call back with success response
 * @param {function} errorCallback invoke the call back with error response
 */
  ExportLCManager.prototype.fetchSwiftsAdvices = function (params, successCallback, errorCallback) {
    const ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("SwiftsAndAdvices");
    ExportLCRepo.customVerb('fetchSwiftsAdvices', params, getCompletionCallback);
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
  ExportLCManager.prototype.fetchFileResponse = function (params, successCallback, errorCallback) {
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
    request.send(JSON.stringify({ "fileId": params.fileId }));
  };
  /**
   *  Method to  Gets ExportLC Drawings.
   * @params {object} - consists of the ExportLC Drawings Data.
   */
  ExportLCManager.prototype.getExportLCDrawings = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('getExportLetterOfCreditDrawings', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
   * Method to submit Export LC Beneficiary Consent
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
  ExportLCManager.prototype.submitBeneficiaryConsent = function (params, presentationSuccessCallback, presentationErrorCallback) {
    const ExportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExportLetterOfCredit");
    ExportLCRepo.customVerb('submitBeneficiaryConsent', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
   * Method to generate Export Letter Of Credit.
   * @param {object} params - consist of payload to generate file
   * @param {function} successCallback - invoke the call back with success response
   * @param {function} errorCallback - invoke the call back with error response
   */
  ExportLCManager.prototype.generateExportLCList = function (params, successCallback, errorCallback) {
    const LCSummaryRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LCSummary");
    LCSummaryRepo.customVerb('generateExportLetterOfCreditList', params, getCompletionCallback);

    function getCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        successCallback(obj["data"]);
      } else {
        errorCallback(obj["errmsg"]);
      }
    }
  };
  /**
   * Method to generate Export Letter Of Credit.
   * @param {object} params - consist of payload to generate file
   * @param {function} successCallback - invoke the call back with success response
   * @param {function} errorCallback - invoke the call back with error response
   */
  ExportLCManager.prototype.generateExportAmendmentList = function (params, successCallback, errorCallback) {
    const LCSummaryRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LCSummary");
    LCSummaryRepo.customVerb('generateExportAmendmentList', params, getCompletionCallback);

    function getCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        successCallback(obj["data"]);
      } else {
        errorCallback(obj["errmsg"]);
      }
    }
  };
  /**
   * Method to generate Export Letter Of Credit.
   * @param {object} params - consist of payload to generate file
   * @param {function} successCallback - invoke the call back with success response
   * @param {function} errorCallback - invoke the call back with error response
   */
  ExportLCManager.prototype.generateExportDrawingList = function (params, successCallback, errorCallback) {
    const LCSummaryRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LCSummary");
    LCSummaryRepo.customVerb('generateExportDrawingsList', params, getCompletionCallback);

    function getCompletionCallback(status, data, error) {
      const srh = applicationManager.getServiceResponseHandler();
      const obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        successCallback(obj["data"]);
      } else {
        errorCallback(obj["errmsg"]);
      }
    }
  };
  return ExportLCManager;

});