define(function() {

    function AccountDetailsDAO() {

    }
    AccountDetailsDAO.prototype.fetchAccountDetails = function(objectServiceName, operationName, objectName, criteria, unicode, onSuccess, onError) {
        var self = this;
        try {
            var objSvc = kony.sdk.getCurrentInstance().getObjectService(objectServiceName, {
                "access": "online"
            });
            var dataObject = new kony.sdk.dto.DataObject(objectName);
            for (var key in criteria) {
                dataObject.addField(key, criteria[key]);
            }
            var options = {
                "dataObject": dataObject
            };

            objSvc.customVerb(operationName, options,
                function(response) {
                    onSuccess(response, unicode);
                    kony.print("Account Details Fetched Successfully: " + JSON.stringify(response));
                },
                function(error) {
                    kony.print("Failed to fetch Account Details:" + JSON.stringify(error));
                    var errorObj = {
                        "errorInfo": "Error in fetching account details",
                        "errorLevel": "Fabric",
                        "error": error
                    };
                    onError(errorObj);
                });
        } catch (err) {
            var errorObj = {
                "errorInfo": "Error in calling service to fetch account details",
                "errorLevel": "Business",
                "error": err
            };
            onError(errorObj);
        }
    };
    return AccountDetailsDAO;
});