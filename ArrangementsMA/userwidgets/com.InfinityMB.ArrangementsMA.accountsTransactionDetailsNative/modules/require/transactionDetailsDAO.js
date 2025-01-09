define(function() {

    function transactionDetailsDAO() {

    }
    /**
     * component getBaseImage
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post recevinf response
     */
    transactionDetailsDAO.prototype.getBaseImage = function(objServiceName, operationName, objName, criteria, onSuccess, onError) {
        var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
            "access": "online"
        });
        var dataObject = new kony.sdk.dto.DataObject(objName);
        for (var key in criteria) {
            dataObject.addField(key, criteria[key]);
        }
        var options = {
            "dataObject": dataObject
        };
        objSvc.customVerb(operationName, options,
            function(response) {
                onSuccess(response, criteria);
                kony.print("Base image fetched Successfully: " + JSON.stringify(response));
            },
            function(error) {

                onError(error, criteria);
                kony.print("Failed to fetch Base Image:" + JSON.stringify(error));
            });
    };
		/**
     * component getAttachments
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post recevinf response
     */
    transactionDetailsDAO.prototype.getAttachments = function(objServiceName, operationName, objName, criteria, onSuccess, onError) {
        var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
            "access": "online"
        });
        var dataObject = new kony.sdk.dto.DataObject(objName);
        for (var key in criteria) {
            dataObject.addField(key, criteria[key]);
        }
        var options = {
            "dataObject": dataObject
        };
        objSvc.customVerb(operationName, options,
            function(response) {
                onSuccess(response, criteria);
                kony.print("Attachments fetched Successfully: " + JSON.stringify(response));
            },
            function(error) {

                onError(error, criteria);
                kony.print("Failed to fetch Attachments:" + JSON.stringify(error));
            });
    };
    return transactionDetailsDAO;
});