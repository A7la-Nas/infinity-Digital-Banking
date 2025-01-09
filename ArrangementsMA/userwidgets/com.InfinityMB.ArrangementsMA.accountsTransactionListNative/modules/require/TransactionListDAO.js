define(function() {

    function TransactionListDAO() {

    }
    TransactionListDAO.prototype.fetchTransactionList = function(objServiceName, operationName, objName, criteria, unicode, onSuccess, onError) {

        var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
            "access": "online"
        });
        var dataObject = new kony.sdk.dto.DataObject(objName);

        for (var key in criteria) {
            dataObject.addField(key, criteria[key]);
        }
        //alert(JSON.stringify(dataObject));
        var options = {
            "dataObject": dataObject
        };

        objSvc.customVerb(operationName, options,
            function(response) {
                onSuccess(response, unicode);
                kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
            },
            function(error) {
                var errorObj = {
                    "errorInfo": "Fetch transacation list service call failed",
                    "errorLevel": "Fabric",
                    "error": error
                }
                onError(errorObj);
                kony.print("Failed to fetch Account Details:" + JSON.stringify(error));
            });
    };

    /**
     * Method to fetch transactions based on seach criteria
     * @param {Object} params MDA expression containing searchDescription, searchMinAmount, searchMaxAmount, accountNumber, searchType etc
     * @param {function} presentationSuccessCallback Method that gets invoked in case of service success
     * @param {function} presentationErrorCallback Method that gets invoked in case of service failure
     */
    TransactionListDAO.prototype.fetchTransactionsByCriteria = function(params, presentationSuccessCallback, presentationErrorCallback) {
        var postedExternalTran = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("TransactionsList");
        postedExternalTran.getByCriteria(params, getAllCompletionCallback);

        function getAllCompletionCallback(status, data, error) {
            if (status === kony.mvc.constants.STATUS_FAILURE) {
                presentationErrorCallback(error);
            } else {
                presentationSuccessCallback(data);
            }
        }
    };
    return TransactionListDAO;

});