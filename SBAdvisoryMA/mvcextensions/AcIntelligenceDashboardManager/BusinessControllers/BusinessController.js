define([], function () {

    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function AcIntelligenceDashboardManager() {

        kony.mvc.Business.Delegator.call(this);

    }

    inheritsFrom(AcIntelligenceDashboardManager, kony.mvc.Business.Delegator);

    AcIntelligenceDashboardManager.prototype.initializeBusinessController = function () {

    };

    /**
     * Method to fetch Receivables data
     * @param {object} params - consist of payload to fetch Receivables data
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    AcIntelligenceDashboardManager.prototype.fetchReceivables = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivablesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Receivables");
        ReceivablesModel.customVerb('getAccountsReceivable', params, getAllCompletionCallback);

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
     * Method to fetch Payables data
     * @param {object} params - consist of payload to fetch Payables data
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    AcIntelligenceDashboardManager.prototype.fetchPayables = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const PayablesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Payables");
        PayablesModel.customVerb('getAccountsPayable', params, getAllCompletionCallback);

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
    * Method to fetch Payables Average Payments Days data
    * @param {object} params - consist of payload to fetch Payables Average Payments Days data
    * @param {function} presentationSuccessCallback - invoke the call back with success response
    * @param {function} presentationErrorCallback - invoke the call back with error response
    */
    AcIntelligenceDashboardManager.prototype.fetchPayablesAveragePayments = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const PayablesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Payables");
        PayablesModel.customVerb('getPayablesDebtorDaysReq', params, getAllCompletionCallback);

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
    * Method to fetch ReceivableSummary download data
    * @param {object} params - consist of payload to fetch ReceivableSummary dowmload data
    * @param {function} presentationSuccessCallback - invoke the call back with success response
    * @param {function} presentationErrorCallback - invoke the call back with error response
    */
    AcIntelligenceDashboardManager.prototype.generateReceivableSummary = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivablesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Receivables");
        ReceivablesModel.customVerb('getAccountsReceivaleSummaryExcel', params, getAllCompletionCallback);

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
   * Method to fetch PayablesSummary download download data
   * @param {object} params - consist of payload to fetch PayablesSummary download data
   * @param {function} presentationSuccessCallback - invoke the call back with success response
   * @param {function} presentationErrorCallback - invoke the call back with error response
   */
    AcIntelligenceDashboardManager.prototype.generatePayableSummary = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const PayablesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Payables");
        PayablesModel.customVerb('getAccountsPayableSummaryExcel', params, getAllCompletionCallback);

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
     * Method to fetch Receivables average payment days data
     * @param {object} params - consist of payload to fetch Receivables average payment days data
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    AcIntelligenceDashboardManager.prototype.fetchReceivablesAveragePayment = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivablesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Receivables");
        ReceivablesModel.customVerb('getReceivablesDebtorDaysReq', params, getAllCompletionCallback);

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
     * Method to fetch Receivables ByCustomer data
     * @param {object} params - consist of payload to fetch Receivables ByCustomer data
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    AcIntelligenceDashboardManager.prototype.fetchReceivablesByCustomer = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivablesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Receivables");
        ReceivablesModel.customVerb('getAccountsReceivableByCustomer', params, getAllCompletionCallback);

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
     * Method to fetch Payable PayableBySupplier data
     * @param {object} params - consist of payload to fetch PayableBySupplier data
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    AcIntelligenceDashboardManager.prototype.fetchPayableBySupplier = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivablesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Payables");
        ReceivablesModel.customVerb('getAccountsPayableBySupplier', params, getAllCompletionCallback);

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
     * Method to fetch Receivables ByCustomer download data
     * @param {object} params - consist of payload to fetch Receivables ByCustomer download data
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
       AcIntelligenceDashboardManager.prototype.generateReceivablesByCustomerDownload = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivablesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Receivables");
        ReceivablesModel.customVerb('getAccountsReceivableCustomerDetailsExcel', params, getAllCompletionCallback);

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
     * Method to fetch Receivables ByCustomer download data
     * @param {object} params - consist of payload to fetch Receivables ByCustomer download data
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
     */
    AcIntelligenceDashboardManager.prototype.generatePayableSupplierDownload = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const ReceivablesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Payables");
        ReceivablesModel.customVerb('getAccountsPayableSupplierDetailsExcel', params, getAllCompletionCallback);

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
   * Method to fetch Receivables ByCustomer download data on By Customer screen
     * @param {object} params - consist of payload to fetch Receivables ByCustomer download data
     * @param {function} presentationSuccessCallback - invoke the call back with success response
     * @param {function} presentationErrorCallback - invoke the call back with error response
   */
    AcIntelligenceDashboardManager.prototype.generateReceivablesByCustomerScreenDownload = function (params, presentationSuccessCallback, presentationErrorCallback) {
        const PayablesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Receivables");
        PayablesModel.customVerb('getAccountsReceivableCustomerDetailsExcel', params, getAllCompletionCallback);

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

    return AcIntelligenceDashboardManager;

});