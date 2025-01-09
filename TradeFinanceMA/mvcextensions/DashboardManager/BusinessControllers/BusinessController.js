define([], function () {

    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function DashboardManager() {
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(DashboardManager, kony.mvc.Business.Delegator);

    /**
     * Method to fetch receivables
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    DashboardManager.prototype.fetchReceivables = function (params, successCallback, errorCallback) {
        const DashboardModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DashboardOverview");
        DashboardModel.customVerb('FetchReceivables', params, getCompletionCallback);
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
     * Method to fetch payables
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    DashboardManager.prototype.fetchPayables = function (params, successCallback, errorCallback) {
        const DashboardModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DashboardOverview");
        DashboardModel.customVerb('FetchPayables', params, getCompletionCallback);
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
     * Method to fetch all trade details
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    DashboardManager.prototype.fetchAllTradeDetails = function (params, successCallback, errorCallback) {
        const DashboardModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DashboardOverview");
        DashboardModel.customVerb('FetchAllTradeDetails', params, getCompletionCallback);
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
     * Method to fetch Trade Finance configuration
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    DashboardManager.prototype.fetchTradeFinanceConfiguration = function (params, successCallback, errorCallback) {
        const DashboardModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DashboardOverview");
        DashboardModel.customVerb('FetchTradeFinanceConfiguration', params, getCompletionCallback);
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
     * Method to create Trade Finance configuration
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    DashboardManager.prototype.createTradeFinanceConfiguration = function (params, successCallback, errorCallback) {
        const DashboardModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DashboardOverview");
        DashboardModel.customVerb('CreateTradeFinanceConfiguration', params, getCompletionCallback);
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
     * Method to update Trade Finance configuration
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    DashboardManager.prototype.updateTradeFinanceConfiguration = function (params, successCallback, errorCallback) {
        const DashboardModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DashboardOverview");
        DashboardModel.customVerb('UpdateTradeFinanceConfiguration', params, getCompletionCallback);
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
     * Method to generate receivables list
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    DashboardManager.prototype.generateReceivablesList = function (params, successCallback, errorCallback) {
        const DashboardModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DashboardOverview");
        DashboardModel.customVerb('GenerateReceivablesList', params, getCompletionCallback);
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
     * Method to generate payables list
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    DashboardManager.prototype.generatePayablesList = function (params, successCallback, errorCallback) {
        const DashboardModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DashboardOverview");
        DashboardModel.customVerb('GeneratePayablesList', params, getCompletionCallback);
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
     * Method to generate all trade details list
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    DashboardManager.prototype.generateAllTradesList = function (params, successCallback, errorCallback) {
        const DashboardModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DashboardOverview");
        DashboardModel.customVerb('GenerateAllTradesList', params, getCompletionCallback);
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
     * Method to fetch limits
     * @param {Object} params request parameters
     * @param {function} successCallback invoke the call back with success response
     * @param {function} errorCallback invoke the call back with error response
     */
    DashboardManager.prototype.fetchLimits = function (params, successCallback, errorCallback) {
        const DashboardModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DashboardOverview");
        DashboardModel.customVerb('FetchLimits', params, getCompletionCallback);
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

    return DashboardManager;

});