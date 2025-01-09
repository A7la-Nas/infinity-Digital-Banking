define([], function () {

    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function GuaranteesManager() {
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(GuaranteesManager, kony.mvc.Business.Delegator);

    /**
     * Method to fetch SWIFT/BIC codes
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.fetchSwiftBicCodes = function (params, successCallback, errorCallback) {
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
     * Method to save Guarantee record
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.saveGuarantee = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('saveGuarantees', params, getCompletionCallback);
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
     * Method to create Guarantees record
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.createGuarantee = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('createGuarantees', params, getCompletionCallback);
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
     * Method to create amendment for guarantees
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.createGuaranteeAmendment = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('createGuaranteeAmendment', params, getCompletionCallback);
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
     * Method to edit payment payees
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.editPayee = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Payee");
        GuaranteesModel.customVerb('editPayee', params, getCompletionCallback);
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
     * Method to udpate amendment for guarantees
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.updateGuaranteeAmendment = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('updateGuaranteeAmendment', params, getCompletionCallback);
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
     * Method to fetch Guarantees records
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.fetchGuarantees = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('getGuarantees', params, getCompletionCallback);
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
     * Method to fetch Guarantee record by guaranteeID
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.fetchGuaranteeById = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('getGuaranteesById', params, getCompletionCallback);
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
     * Method to fetch payment payees
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.fetchPaymentPayees = function (params, successCallback, errorCallback) {
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
    GuaranteesManager.prototype.fetchCorporatePayees = function (params, successCallback, errorCallback) {
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
     * Method to create corporate payee
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.createCorporatePayee = function (params, successCallback, errorCallback) {
        const payeeModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Payee");
        payeeModel.customVerb('createCorporatePayee', params, getCompletionCallback);
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
     * Method to delete saved guarantee record
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.deleteGuarantee = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('DeleteGuaranteeLetterOfCredit', params, getCompletionCallback);
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
     * Method to fetch Clauses
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.fetchClauses = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('getClauses', params, getCompletionCallback);
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
     * Method to create new clause
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.createClause = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('createClause', params, getCompletionCallback);
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
     * Method to fetch limit instructions
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.fetchLimitInstructions = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('getLimitInstructions', params, getCompletionCallback);
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
     * Method to fetch GuaranteesAmendments records
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.fetchGuaranteesAmendments = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('getGuaranteeAmendments', params, getCompletionCallback);
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
    GuaranteesManager.prototype.generateGuaranteesLC = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('generateGuarantees', params, getAllCompletionCallback);
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
    GuaranteesManager.prototype.generateGuaranteesList = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LCSummary");
        GuaranteesModel.customVerb('generateGuaranteesList', params, getAllCompletionCallback);
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
     * Method to retrieve documents
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.retrieveDocuments = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const LCDocumentsRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("LCDocuments");
        LCDocumentsRepo.customVerb('retrieveDocuments', params, getAllCompletionCallback);
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
     * Method to generate guarantees Amendments.
     * @param {object} params - consist of payload to generate file
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    GuaranteesManager.prototype.generateGuaranteesAmendments = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('generateGuaranteeAmendment', params, getAllCompletionCallback);
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
     * Method to generate guarantees Amendment List.
     * @param {object} params - consist of payload to generate file
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    GuaranteesManager.prototype.generateGuaranteeAmendmentList = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('generateGuaranteeAmendmentList', params, getAllCompletionCallback);
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
     * Method to fetch Guarantee record by guaranteeID
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.fetchGuaranteeAmendmentsById = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('getGuaranteeAmendmentById', params, getCompletionCallback);
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
     * Method to update Guarantee record
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.updateGuarantee = function (params, successCallback, errorCallback) {
        const GuaranteesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Guarantees");
        GuaranteesModel.customVerb('updateGuaranteeLetterOfCredit', params, getCompletionCallback);
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
     * Method to fetch Claims Received records
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.fetchReceivedClaims = function (params, successCallback, errorCallback) {
        const ClaimsReceivedModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ClaimsReceived");
        ClaimsReceivedModel.customVerb('getClaims', params, getCompletionCallback);
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
     * Method to fetch Claim Received record by ID
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.fetchReceivedClaimById = function (params, successCallback, errorCallback) {
        const ClaimsReceivedModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ClaimsReceived");
        ClaimsReceivedModel.customVerb('getClaimById', params, getCompletionCallback);
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
     * Method to update Guarantee record
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    GuaranteesManager.prototype.updateReceivedClaim = function (params, successCallback, errorCallback) {
        const ClaimsReceivedModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ClaimsReceived");
        ClaimsReceivedModel.customVerb('updateClaim', params, getCompletionCallback);
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
     * Method to generate Claim Received report.
     * @param {object} params request parameters
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    GuaranteesManager.prototype.generateReceivedClaimReport = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ClaimsReceivedModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ClaimsReceived");
        ClaimsReceivedModel.customVerb('generateClaimReport', params, getAllCompletionCallback);
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
     * Method to generate Claims Received list.
     * @param {object} params request parameters
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    GuaranteesManager.prototype.generateReceivedClaimsList = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ClaimsReceivedModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ClaimsReceived");
        ClaimsReceivedModel.customVerb('generateClaimsList', params, getAllCompletionCallback);
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
    return GuaranteesManager;

});