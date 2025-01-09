define([], function () { 

  /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
  function ImportLCManager() { 

    kony.mvc.Business.Delegator.call(this); 

  } 

  inheritsFrom(ImportLCManager, kony.mvc.Business.Delegator); 

  /**
 * Gets ImportLC Amend Data.
 * @params {object} - consists of the ImportLC Amend data.
 */
  ImportLCManager.prototype.createImportLCAmendment = function(params,presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var ImportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LetterOfCredit");
    ImportLCRepo.customVerb('createImportLetterOfCreditAmendment', params , getAllCompletionCallback);
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
  ImportLCManager.prototype.createImportLCAmendmentDetails = function(args,presentationAmendDetailSuccessCallback, presentationAmendDetailErrorCallback) {
    var self = this;
    let params = JSON.parse(JSON.stringify(args));
    delete args.type;
    var ImportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LetterOfCredit");
    ImportLCRepo.customVerb('getImportLetterOfCreditAmendmentsById', args , completeCallback);
    function completeCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationAmendDetailSuccessCallback, presentationAmendDetailErrorCallback);
      if (obj["status"] === true) {
        presentationAmendDetailSuccessCallback(obj["data"]);      
      } else {
        presentationAmendDetailErrorCallback(obj["errmsg"]);
      }
    }
  };
  ImportLCManager.prototype.viewLCDetails = function(args,presentationLOCSuccessCallback, presentationLOCErrorCallback) {
    var self = this;
    var ImportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LetterOfCredit");
    ImportLCRepo.customVerb('getLetterOfCreditsById', args , completeCallback);
    function completeCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationLOCSuccessCallback, presentationLOCErrorCallback);
      if (obj.data.LetterOfCredits[0].lcReferenceNo) {
        presentationLOCSuccessCallback(obj["data"]);      
      } else {
        presentationLOCErrorCallback(obj["errmsg"]);
      }
    }
  };
  ImportLCManager.prototype.amendmentsDownloadByID = function(args,presentationDownloadSuccessCallback, presentationDownloadErrorCallback) {
    var self = this;
    var ImportLCRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LCSummary");
    ImportLCRepo.customVerb('generateImportLCAmendment', args , completeCallback);
    function completeCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationDownloadSuccessCallback, presentationDownloadErrorCallback);
      self.downloadAmendments(obj["data"]);
    }
  };
  ImportLCManager.prototype.downloadAmendments = function(response) {
    const mfURL = KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url;
    const url = `${mfURL}/operations/LCSummary/downloadGeneratedAcknowledgement`;
    CommonUtilities.downloadGeneratedFile({ url, fileName: 'Import Amendment', fileType: 'pdf' }, {"fileId": response.fileId});
  };
  /**
   * Method to fetch receivables
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
  ImportLCManager.prototype.fetchImportLetterOfCredits = function (params, successCallback, errorCallback) {
    const importLCModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LetterOfCredit");
    importLCModel.customVerb('getImportLCs', params, getCompletionCallback);
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

  return ImportLCManager;

});