define([], function () {
  function AccountServicesManager() {
    kony.mvc.Business.Controller.call(this);
  }
  inheritsFrom(AccountServicesManager, kony.mvc.Business.Delegator);
  AccountServicesManager.prototype.initializeBusinessController = function () {
  };
  AccountServicesManager.prototype.execute = function (command) {
    kony.mvc.Business.Controller.prototype.execute.call(this, command);
  };

  AccountServicesManager.prototype.generateCombinedStatement = function (payload, presentationSuccessCallback, presentationErrorCallback) {
    var accStatements = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CombinedStatements");
    accStatements.customVerb("generate", payload, getAllCompletionCallback);
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

  AccountServicesManager.prototype.DownloadCombinedStatement = function (reqParams) {
    var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
    var authToken = KNYMobileFabric.currentClaimToken;
    var serviceURL = mfURL + "/objects/CombinedStatements?Auth_Token=" + authToken;
    serviceURL = serviceURL + "&" + "X-Kony-ReportingParams" + "=" + kony.sdk.getEncodedReportingParamsForSvcid("register_" + "DbxUserLogin");
    var paramURL = "";
    if (reqParams.fileId) {
      paramURL += "&fileId=" + reqParams.fileId;
    }
    return serviceURL + paramURL;
  };

  AccountServicesManager.prototype.checkDownloadStatusOfCombinedStatement = function (payload, presentationSuccessCallback, presentationErrorCallback) {
    var accStatements = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CombinedStatements");
    accStatements.customVerb("getStatements", payload, getAllCompletionCallback);
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
  
   AccountServicesManager.prototype.uploadMultipleDouments = function (payload, presentationSuccessCallback, presentationErrorCallback) {
    var accStatements = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DocumentChecklist");
    accStatements.customVerb("uploadMultipleDocuments", payload, getAllCompletionCallback);
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

  AccountServicesManager.prototype.getDocIdForDayPage = function (payload, presentationSuccessCallback, presentationErrorCallback) {
    var accStatements = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MortgageDocumentsDownload");
    accStatements.customVerb("downloadChangeRepaymentDayReqAck", payload, getAllCompletionCallback);
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

  AccountServicesManager.prototype.getDocIdForSimulatePage = function (payload, presentationSuccessCallback, presentationErrorCallback) {
    var accStatements = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MortgageDocumentsDownload");
    accStatements.customVerb("downloadSimulationResults", payload, getAllCompletionCallback);
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
  
  AccountServicesManager.prototype.getDocIdForPaymentAckPage = function (payload, presentationSuccessCallback, presentationErrorCallback) {
    var accStatements = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MortgageDocumentsDownload");
    accStatements.customVerb("downloadPartialRepaymentAckPDF", payload, getAllCompletionCallback);
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
  AccountServicesManager.prototype.getDocIdForClosure = function(payload, presentationSuccessCallback, presentationErrorCallback) {
        var accStatements = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MortgageDocumentsDownload");
        accStatements.customVerb("downloadAccountClosureReqAckPDF", payload, getAllCompletionCallback);

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
//Account
  AccountServicesManager.prototype.getDocIdForAccountPage = function (payload, presentationSuccessCallback, presentationErrorCallback) {
    var accStatements = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("MortgageDocumentsDownload");
    accStatements.customVerb("downloadChangeRepaymentAccountReqAck", payload, getAllCompletionCallback);
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
  AccountServicesManager.prototype.getDocumentForAccount = function (fieldId) {
    var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
        var serviceURL = mfURL + "/objects/DownloadTransactionPDF";
        var paramURL = "?";
        
        if( fieldId ){
          paramURL += "fileId=" + fieldId;
        }
        
        return serviceURL + paramURL;
  };

  AccountServicesManager.prototype.getMortgageFacilityDetails = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Mortgage");
    mortgageRepo.customVerb('getMortgageFacilityDetails', param, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationErrorCallback(obj.errmsg);
      }
    }

  };
  
  AccountServicesManager.prototype.getMockSimulatedResults = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Mortgage");
    mortgageRepo.customVerb('getMockSimulatedResults', param, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationErrorCallback(obj.errmsg);
      }
    }

  };
  
  AccountServicesManager.prototype.getMortgageSimulatedResults = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Mortgage");
    mortgageRepo.customVerb('getMortgageSimulatedResults', param, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationErrorCallback(obj.errmsg);
      }
    }

  };
  AccountServicesManager.prototype.CreatePartialRepayment = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Mortgage");
    mortgageRepo.customVerb('submitPartialRepaymentServiceRequestOperation', param, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationErrorCallback(obj.errmsg);
      }
    }

  };
  AccountServicesManager.prototype.validateClosure = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
    mortgageRepo.customVerb('validateAccountClosure', param, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationErrorCallback(obj.errmsg);
      }
    }

  };

  AccountServicesManager.prototype.getTandCData = function(param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("TermsAndConditions");
    mortgageRepo.customVerb('getPostLogin', param, getCompletionCallback);

    function getCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
            presentationSuccessCallback(obj.data);
        } else {
            presentationErrorCallback(obj.errmsg);
        }
    }
};
  
    AccountServicesManager.prototype.submitClosureRequest = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
    mortgageRepo.customVerb('submitAccountClosureServiceRequest', param, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationErrorCallback(obj.errmsg);
      }
    }

  };

  AccountServicesManager.prototype.getMortgageDrawings = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Mortgage");
    mortgageRepo.customVerb('getMortgageDrawings', param, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationErrorCallback(obj.errmsg);
      }
    }

  };

  AccountServicesManager.prototype.submitChangeRepaymentDayServiceRequest = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Mortgage");
    mortgageRepo.customVerb('submitChangeRepaymentDayServiceRequest', param, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationErrorCallback(obj.errmsg);
      }
    }

  };
  AccountServicesManager.prototype.submitChangeRepaymentAccountServiceRequest = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Mortgage");
    mortgageRepo.customVerb('submitChangeRepaymentAccountServiceRequest', param, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationErrorCallback(obj.errmsg);
      }
    }

  };

  AccountServicesManager.prototype.fetchDocumentsList = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("mortgageDocument");
    mortgageRepo.customVerb('getDocuments', param, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationErrorCallback(obj.errmsg);
      }
    }

  };


  AccountServicesManager.prototype.fetchDocumentDownload = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("mortgageDocument");
    mortgageRepo.customVerb('downloadDocument', param, getCompletionCallback);

    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };

  /*AccountServicesManager.prototype.autoDownload = function(param,presentationSuccessCallback, presentationErrorCallback) {
    var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("mortgageDocument");
    mortgageRepo.customVerb('GET', param, getCompletionCallback);

   function getCompletionCallback(status, data, error) {
     var srh = applicationManager.getServiceResponseHandler();
     var obj = srh.manageResponse(status, data, error);
     if (obj.status === true) {
       presentationSuccessCallback("File Downloaded Successfully");
     } else {
       presentationErrorCallback("Error in downloading file");
     }
   }
};*/
  
  AccountServicesManager.prototype.getDownloadDocumentURL = function( reqParams ) {
      var mfURL = KNYMobileFabric.mainRef.config.services_meta.Holdings.url;
      var serviceURL = mfURL + "/objects/mortgageDocument";
      var paramURL = "?";
      
      if( reqParams[0].fileId ){
        paramURL += "fileId=" + reqParams[0].fileId;
      }
      
      return serviceURL + paramURL;
      
    };

    AccountServicesManager.prototype.getEarlyPayOffDetails = function (param, presentationSuccessCallback, presentationErrorCallback) {
        var mortgageRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Mortgage");
        mortgageRepo.customVerb('createAndGetPayOffSimulation', param, getCompletionCallback);
        function getCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
            presentationSuccessCallback(obj.data);
        } else {
            presentationErrorCallback(obj.errmsg);
        }
        }

    };
    return AccountServicesManager; 
});