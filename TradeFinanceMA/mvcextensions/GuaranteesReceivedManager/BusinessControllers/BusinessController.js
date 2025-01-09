define([], function () {

    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function GuaranteesReceivedManager() {
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(GuaranteesReceivedManager, kony.mvc.Business.Delegator);

    /**
     * Method to fetch Guarantee claims
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.fetchGuaranteeClaims = function (params, successCallback, errorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('GetGuaranteeClaims', params, getCompletionCallback);
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
     * Method to fetch Guarantee claim by guaranteeID
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.fetchGuaranteeClaimById = function (params, successCallback, errorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('GetGuaranteeClaimsById', params, getCompletionCallback);
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
     * Method to save Guarantee claim
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.saveGuaranteeClaim = function (params, successCallback, errorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('SaveGuaranteeClaims', params, getCompletionCallback);
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
     * Method to create Guarantee claim
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.createGuaranteeClaim = function (params, successCallback, errorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('CreateGuaranteeClaims', params, getCompletionCallback);
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
     * Method to update Guarantee claim
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.updateGuaranteeClaim = function (params, successCallback, errorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('UpdateReceivedGuaranteeClaim', params, getCompletionCallback);
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
     * Method to submit received guarantee amendment
     * @param {Object} params request parameters 
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.submitReceivedGuaranteeAmendment = function (params, successCallback, errorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('updateAmendment', params, getCompletionCallback);
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
     * Method to retrieve documents
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.retrieveDocuments = function (params, successCallback, errorCallback) {
        const LCDocumentsRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LCDocuments");
        LCDocumentsRepo.customVerb('retrieveDocuments', params, getAllCompletionCallback);
        function getAllCompletionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                successCallback(obj["data"]);
            } else {
                errorCallback(obj["errmsg"]);
            }
        }
    };

    /**
    * Method to generate received guarantees Amendment List.
    * @param {object} params - consist of payload to generate file
    * @param {function} presentationSuccessCallback - invoke the call back with success response
    * @param {function} presentationErrorCallback - invoke the call back with error response
    */
    GuaranteesReceivedManager.prototype.generateReceivedGuaranteeAmendmentList = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('generateAmendmentsList', params, getAllCompletionCallback);
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
    * Method to generate received guarantees Claims List.
    * @param {object} params - consist of payload to generate file
    * @param {function} presentationSuccessCallback - invoke the call back with success response
    * @param {function} presentationErrorCallback - invoke the call back with error response
    */
    GuaranteesReceivedManager.prototype.generateReceivedGuaranteeClaimsList = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('generateClaimsList', params, getAllCompletionCallback);
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
     * Method to fetch ReceivedGuarantees records
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.fetchReceivedGuarantees = function (params, successCallback, errorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('getGuarantees', params, getCompletionCallback);
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
     * Method to fetch Guarantee record by receivedGuaranteeID
     * @param {Object} params request parameters 
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.fetchReceivedGuaranteeById = function (params, successCallback, errorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('getGuaranteeById', params, getCompletionCallback);
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
   * Method to fetch Guarantee record by receivedGuaranteeID
   * @param {Object} params request parameters 
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
    GuaranteesReceivedManager.prototype.fetchReceivedGuaranteeAmendmentsId = function (params, successCallback, errorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('getAmendmentById', params, getCompletionCallback);
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
     * Method to generate guarantees LC.
     * @param {object} params - consist of payload to generate file
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.generateReceivedGuaranteesLC = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('generateGuaranteeReport', params, getAllCompletionCallback);
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
     * Method to generate guarantees LC List.
     * @param {object} params - consist of payload to generate file
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.generateReceivedGuaranteesList = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('generateGuaranteesList', params, getAllCompletionCallback);
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
     * Method to generate guarantees Received Amendment.
     * @param {object} params - consist of payload to generate file
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.generateGuaranteesReceivedAmendments = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('generateAmendmentReport', params, getAllCompletionCallback);
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
    * Method to generate guarantees Received Claims.
    * @param {object} params - consist of payload to generate file
    * @param {function} presentationSuccessCallback - invoke the call back with success response
    * @param {function} presentationErrorCallback - invoke the call back with error response
    */
    GuaranteesReceivedManager.prototype.generateGuaranteesReceivedClaims = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('generateReceivedGuaranteeClaim', params, getAllCompletionCallback);
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
   * Method to fetch ReceivedGuaranteesAmendments records
   * @param {Object} params request parameters
   * @param {function} successCallback invoke the call back with success response
   * @param {function} errorCallback invoke the call back with error response
   */
    GuaranteesReceivedManager.prototype.fetchReceivedGuaranteesAmendments = function (params, successCallback, errorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('getAmendments', params, getCompletionCallback);
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
     * Method to accept or reject the Guarantee
     * @param {object} params - consist of payload to accept or reject
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.acceptOrRejectGuarantee = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('updateGuarantee', params, getAllCompletionCallback);
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
     * Method to release liability
     * @param {object} params - consist of payload to release liability
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
    */
    GuaranteesReceivedManager.prototype.releaseLiability = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('releaseLiability', params, getAllCompletionCallback);
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
     * Method to delete Guarantee claim
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesReceivedManager.prototype.deleteGuaranteeClaim = function (params, successCallback, errorCallback) {
        const ReceivedGuaranteeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ReceivedGuarantees");
        ReceivedGuaranteeModel.customVerb('deleteGuaranteeClaim', params, getCompletionCallback);
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

    return GuaranteesReceivedManager;
});