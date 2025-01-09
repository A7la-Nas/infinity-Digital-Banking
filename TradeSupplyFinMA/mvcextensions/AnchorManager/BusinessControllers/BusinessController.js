define([], function () {

    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function AnchorBusinessManager() {
        try {
            this.serviceResponseHandler = applicationManager.getServiceResponseHandler();
            this.anchorFundingRequestModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("AnchorFundingRequest");
            this.tradeDocumentsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("TradeDocuments");
            this.programmesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Programmes");
            this.facilitiesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Facilities");
        } catch (e) { }
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(AnchorBusinessManager, kony.mvc.Business.Delegator);
    /**
     * Fetches the funding requests.
     * @param {function} successCallback - Invokes the call back with success response.
     * @param {function} errorCallback - Invokes the call back with error response.
     */
    AnchorBusinessManager.prototype.fetchFundingRequests = function (successCallback, errorCallback) {
        this.anchorFundingRequestModel.customVerb('getAllFundingRequests', {}, getCompletionCallback.bind(this));
        function getCompletionCallback(status, data, error) {
            const obj = this.serviceResponseHandler.manageResponse(status, data, error);
            if (obj.status === true) {
                successCallback(obj.data);
            } else {
                errorCallback(obj.errmsg);
            }
        }
    };
    /**
     * Saves the funding request.
     * @param {Object} params - Specifies request parameters.
     * @param {function} successCallback - Invokes the call back with success response.
     * @param {function} errorCallback - Invokes the call back with error response.
     */
    AnchorBusinessManager.prototype.saveFundingRequest = function (params, successCallback, errorCallback) {
        this.anchorFundingRequestModel.customVerb('saveFundingRequest', params, getCompletionCallback.bind(this));
        function getCompletionCallback(status, data, error) {
            const obj = this.serviceResponseHandler.manageResponse(status, data, error);
            if (obj.status === true) {
                successCallback(obj.data);
            } else {
                errorCallback(obj.errmsg);
            }
        }
    };
    /**
     * Cretaes the funding request.
     * @param {Object} params - Specifies request parameters.
     * @param {function} successCallback - Invokes the call back with success response.
     * @param {function} errorCallback - Invokes the call back with error response.
     */
    AnchorBusinessManager.prototype.submitFundingRequest = function (params, successCallback, errorCallback) {
        this.anchorFundingRequestModel.customVerb('submitFundingRequest', params, getCompletionCallback.bind(this));
        function getCompletionCallback(status, data, error) {
            const obj = this.serviceResponseHandler.manageResponse(status, data, error);
            if (obj.status === true) {
                successCallback(obj.data);
            } else {
                errorCallback(obj.errmsg);
            }
        }
    };
    /**
     * Uploads the document.
     * @param {Object} params - Specifies request parameters.
     * @param {function} successCallback - Invokes the call back with success response.
     * @param {function} errorCallback - Invokes the call back with error response.
     */
    AnchorBusinessManager.prototype.uploadDocument = function (params, successCallback, errorCallback) {
        this.tradeDocumentsModel.customVerb('uploadDocument', params, getAllCompletionCallback.bind(this));
        function getAllCompletionCallback(status, data, error) {
            const obj = this.serviceResponseHandler.manageResponse(status, data, error);
            if (obj.status === true) {
                successCallback(obj.data);
            } else {
                errorCallback(obj.errmsg);
            }
        }
    };
    /**
     * Deletes the uploaded document.
     * @param {Object} params - Specifies request parameters.
     * @param {function} successCallback - Invokes the call back with success response.
     * @param {function} errorCallback - Invokes the call back with error response.
     */
    AnchorBusinessManager.prototype.deleteDocument = function (params, successCallback, errorCallback) {
        this.tradeDocumentsModel.customVerb('deleteDocument', params, getAllCompletionCallback.bind(this));
        function getAllCompletionCallback(status, data, error) {
            const obj = this.serviceResponseHandler.manageResponse(status, data, error);
            if (obj.status === true) {
                successCallback(obj.data);
            } else {
                errorCallback(obj.errmsg);
            }
        }
    };
    /**
     * Downloads the uploaded documents.
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    AnchorBusinessManager.prototype.downloadDocument = function (params, successCallback, errorCallback) {
        this.tradeDocumentsModel.customVerb('downloadDocument', params, getAllCompletionCallback.bind(this));
        function getAllCompletionCallback(status, data, error) {
            const obj = this.serviceResponseHandler.manageResponse(status, data, error);
            if (obj["status"] === true) {
                successCallback(obj["data"]);
            } else {
                errorCallback(obj["errmsg"]);
            }
        }
    };

    /**
     * Cancels/Deletes the funding request.
     * @param {Object} params - Specifies request parameters.
     * @param {function} successCallback - Invokes the call back with success response.
     * @param {function} errorCallback - Invokes the call back with error response.
     */
    AnchorBusinessManager.prototype.cancelFundingRequest = function (params, successCallback, errorCallback) {
        this.anchorFundingRequestModel.customVerb('cancelFundingRequest', params, getCompletionCallback.bind(this));
        function getCompletionCallback(status, data, error) {
            const obj = this.serviceResponseHandler.manageResponse(status, data, error);
            if (obj.status === true) {
                successCallback(obj.data);
            } else {
                errorCallback(obj.errmsg);
            }
        }
    };
    /**
     * Fetches the list of Programmes.
     * @param {function} successCallback - Invokes the call back with success response.
     * @param {function} errorCallback - Invokes the call back with error response.
     */
    AnchorBusinessManager.prototype.fetchListOfProgrammes = function (successCallback, errorCallback) {
        this.programmesModel.customVerb('getListOfProgrammes', {}, getCompletionCallback.bind(this));
        function getCompletionCallback(status, data, error) {
            const obj = this.serviceResponseHandler.manageResponse(status, data, error);
            if (obj.status === true) {
                successCallback(obj.data);
            } else {
                errorCallback(obj.errmsg);
            }
        }
    };
    /**
     * Fetches the list of Facilities.
     * @param {function} successCallback - Invokes the call back with success response.
     * @param {function} errorCallback - Invokes the call back with error response.
     */
    AnchorBusinessManager.prototype.fetchListOfFacilities = function (successCallback, errorCallback) {
        this.facilitiesModel.customVerb('getListOfFacilities', {}, getCompletionCallback.bind(this));
        function getCompletionCallback(status, data, error) {
            const obj = this.serviceResponseHandler.manageResponse(status, data, error);
            if (obj.status === true) {
                successCallback(obj.data);
            } else {
                errorCallback(obj.errmsg);
            }
        }
    };

    return AnchorBusinessManager;
});