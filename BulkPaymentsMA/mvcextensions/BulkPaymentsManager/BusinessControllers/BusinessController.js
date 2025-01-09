define([], function() {
    
    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Controller
     */
    function BusinessController() { 

        kony.mvc.Business.Controller.call(this); 

    } 

    inheritsFrom(BusinessController, kony.mvc.Business.Controller); 

    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller gets initialized
     * @method
     */
    BusinessController.prototype.initializeBusinessController = function() { 

    }; 

    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller is told to execute a command
     * @method
     * @param {Object} kony.mvc.Business.Command Object
     */
	BusinessController.prototype.execute = function(command) { 

		kony.mvc.Business.Controller.prototype.execute.call(this, command);

	};
  
    BusinessController.prototype.getRecipients = function(params, presentationSuccessCallback, presentationErrorCallback) {
        //     var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Accounts");
        //     userRepo.customVerb('getAccountCentricDetails', params, getAllCompletionCallback);
        //     function getAllCompletionCallback(status, data, error) {
        //       var srh = applicationManager.getServiceResponseHandler();
        //       var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
        //       if (obj["status"] === true) {
        //         presentationSuccessCallback(obj["data"]);
        //       } else {
        //         presentationErrorCallback(obj["errmsg"]);
        //       }
        //     }
    presentationSuccessCallback(params);
  };


   /**
    * returns URL to get  Sample File for bulk payments
    * @param {object} criteria ,  key value pairs required to get  transactions report, here transactionId
    */
    BusinessController.prototype.fetchSampleFileforDownload = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("BulkPaymentFile");
    userRepo.customVerb('fetchSampleFiles', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };

    /**
  * Function to upload bulk payment file
  */ 
    BusinessController.prototype.uploadBulkPaymentFile = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("BulkPaymentFile");
    userRepo.customVerb('UploadFile', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };
    

    BusinessController.prototype.fetchOnGoingPayments = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var requestsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord");
    requestsModel.customVerb("fetchOnGoingPayments", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };
  
    BusinessController.prototype.fetchCancellationReasons = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var requestsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord");
    requestsModel.customVerb("fetchCancellationReasons", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };
  
    BusinessController.prototype.createTemplate = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var requestsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentTemplate");
    requestsModel.customVerb("createBulkPaymentTemplate", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };
  
    BusinessController.prototype.fetchBulkPaymentRecordDetailsById = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var requestsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord");
    requestsModel.customVerb("fetchBulkPaymentRecordDetailsById", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };

    BusinessController.prototype.fetchUploadedFiles = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var filesModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentFile");
    filesModel.customVerb("fetchUploadedFiles", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };

    BusinessController.prototype.fetchHistory = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var historyModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord");
    historyModel.customVerb("fetchHistory", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };

    BusinessController.prototype.deletePaymentOrder = function(params, presentationSuccessCallback, presentationErrorCallback) {
      var deletePaymentModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PaymentOrder");
        deletePaymentModel.customVerb("deletePaymentOrder", params, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
          presentationSuccessCallback(obj.data);
            } else {
		  presentationErrorCallback(obj.errmsg);
		}
      }
    };
  
    BusinessController.prototype.editPaymentOrder = function(params, presentationSuccessCallback, presentationErrorCallback) {
      var editPaymentModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PaymentOrder");
        editPaymentModel.customVerb("editPaymentOrder", params, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
          presentationSuccessCallback(obj.data);
            } else {
		  presentationErrorCallback(obj.errmsg);
		}
      }
    };
  
    BusinessController.prototype.addPaymentOrder = function(params, presentationSuccessCallback, presentationErrorCallback) {
      var addPaymentModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PaymentOrder");
        addPaymentModel.customVerb("addPaymentOrder", params, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
          presentationSuccessCallback(obj.data);
            } else {
		  presentationErrorCallback(obj.errmsg);
		}
      }
    };

    BusinessController.prototype.submitPaymentOrder = function(params, presentationSuccessCallback, presentationErrorCallback) {
      var submitPaymentModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord");
        submitPaymentModel.customVerb("review", params, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
          presentationSuccessCallback(obj.data);
            } else {
		  presentationErrorCallback(obj.errmsg);
		}
      }
    };

    BusinessController.prototype.cancelBulkPaymentRecord = function(params, presentationSuccessCallback, presentationErrorCallback) {
      var cancelBulkPaymentModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord");
        cancelBulkPaymentModel.customVerb("cancelBulkPaymentRecord", params, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
          presentationSuccessCallback(obj.data);
            } else {
		  presentationErrorCallback(obj.errmsg);
		}
      }
    };
    
    BusinessController.prototype.updateBulkPaymentRecord = function(params, presentationSuccessCallback, presentationErrorCallback) {
      var updateBulkPaymentModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord");
        updateBulkPaymentModel.customVerb("updateBulkPaymentRecord", params, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
          presentationSuccessCallback(obj.data);
            } else {
		  presentationErrorCallback(obj.errmsg);
		}
      }
    };

    BusinessController.prototype.fetchPaymentOrders = function(params, id, presentationSuccessCallback, presentationErrorCallback) {
    var fetchPOModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PaymentOrder");
    fetchPOModel.customVerb("fetchPaymentOrders", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
                presentationSuccessCallback(obj.data, id);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };
  
    BusinessController.prototype.fetchTransactionOrders = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var fetchPOModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PaymentOrder");
    fetchPOModel.customVerb("fetchPaymentOrders", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };
  
    BusinessController.prototype.approvePayment = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var submitPaymentModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord");
        submitPaymentModel.customVerb("approveBulkPaymentRecord", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };

    BusinessController.prototype.rejectPayment = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var submitPaymentModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentRecord");
        submitPaymentModel.customVerb("rejectBulkPaymentRecord", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };
  
    BusinessController.prototype.getRequestsHistory = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var submitPaymentModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("MyRequests");
        submitPaymentModel.customVerb("getRequestsHistory", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };
  
    BusinessController.prototype.initiateDownloadBulkPaymentAck = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var submitPaymentModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentFile");
        submitPaymentModel.customVerb("initiateDownloadBulkPaymentAck", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };
  
    BusinessController.prototype.downloadBulkPaymentFileAck = function(fileId) {
    var mfURL = KNYMobileFabric.mainRef.config.services_meta.BulkPaymentObjects.url;
    var serviceURL = mfURL + "/operations/BulkPaymentFile/downloadBulkPaymentFileAck?fileId=" + fileId;
    return serviceURL;
  };    
      
    BusinessController.prototype.getTemplates = function(params, presentationSuccessCallback, presentationErrorCallback) {
     var requestsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentTemplate");
     requestsModel.customVerb("fetchBulkPaymentTemplates", params, getAllCompletionCallback);

     function getAllCompletionCallback(status, data, error) {
       var srh = applicationManager.getServiceResponseHandler();
       var obj = srh.manageResponse(status, data, error);
       if (obj["status"] === true) {
         presentationSuccessCallback(obj.data);
            } else {
         presentationErrorCallback(obj.errmsg);
       }
     }
 };
  
    BusinessController.prototype.getPOsforTemplate = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var requestsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TemplatePaymentOrder");
    requestsModel.customVerb("fetchBulkPaymentTemplatePOsById", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };

  
    BusinessController.prototype.deleteBulkPaymentTemplate = function(requestParams, presentationSuccessCallback, presentationErrorCallback) {
    var requestsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentTemplate");
    requestsModel.customVerb("deleteBulkPaymentTemplate", requestParams, getAllCompletionCallback); 

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true && !kony.sdk.isNullOrUndefined(obj.data.templateId)) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }

  };
  
    BusinessController.prototype.createBulkRequest = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("BulkPaymentTemplate");
    userRepo.customVerb('createBulkRequest', params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };

    BusinessController.prototype.editBulkPaymentTemplate = function(requestParams, presentationSuccessCallback, presentationErrorCallback) {
    var requestsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("BulkPaymentTemplate");
    requestsModel.customVerb("editBulkPaymentTemplate", requestParams, getAllCompletionCallback); 

    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true && !kony.sdk.isNullOrUndefined(obj.data.templateId)) {
        presentationSuccessCallback(obj.data);
            } else {
        presentationErrorCallback(obj.errmsg);
      }
    }
  };
  
  return BusinessController;

});