/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "BulkWireFile", "objectService" : "BulkWireObjects"};

    var setterFunctions = {
        bulkWireFileID: function(val, state) {
            context["field"] = "bulkWireFileID";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileID"] : null);
            state['bulkWireFileID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWireFileName: function(val, state) {
            context["field"] = "bulkWireFileName";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileName"] : null);
            state['bulkWireFileName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        noOfTransactions: function(val, state) {
            context["field"] = "noOfTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["noOfTransactions"] : null);
            state['noOfTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        noOfDomesticTransactions: function(val, state) {
            context["field"] = "noOfDomesticTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["noOfDomesticTransactions"] : null);
            state['noOfDomesticTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        noOfInternationalTransactions: function(val, state) {
            context["field"] = "noOfInternationalTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["noOfInternationalTransactions"] : null);
            state['noOfInternationalTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileFormatCode: function(val, state) {
            context["field"] = "fileFormatCode";
            context["metadata"] = (objectMetadata ? objectMetadata["fileFormatCode"] : null);
            state['fileFormatCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdts: function(val, state) {
            context["field"] = "createdts";
            context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
            state['createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastmodifiedts: function(val, state) {
            context["field"] = "lastmodifiedts";
            context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
            state['lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        synctimestamp: function(val, state) {
            context["field"] = "synctimestamp";
            context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
            state['synctimestamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        company_id: function(val, state) {
            context["field"] = "company_id";
            context["metadata"] = (objectMetadata ? objectMetadata["company_id"] : null);
            state['company_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softdeleteflag: function(val, state) {
            context["field"] = "softdeleteflag";
            context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
            state['softdeleteflag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWireFileContents: function(val, state) {
            context["field"] = "bulkWireFileContents";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileContents"] : null);
            state['bulkWireFileContents'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        firstname: function(val, state) {
            context["field"] = "firstname";
            context["metadata"] = (objectMetadata ? objectMetadata["firstname"] : null);
            state['firstname'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastname: function(val, state) {
            context["field"] = "lastname";
            context["metadata"] = (objectMetadata ? objectMetadata["lastname"] : null);
            state['lastname'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchString: function(val, state) {
            context["field"] = "searchString";
            context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
            state['searchString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortByParam: function(val, state) {
            context["field"] = "sortByParam";
            context["metadata"] = (objectMetadata ? objectMetadata["sortByParam"] : null);
            state['sortByParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortOrder: function(val, state) {
            context["field"] = "sortOrder";
            context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
            state['sortOrder'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageOffset: function(val, state) {
            context["field"] = "pageOffset";
            context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
            state['pageOffset'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageSize: function(val, state) {
            context["field"] = "pageSize";
            context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
            state['pageSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastExecutedOn: function(val, state) {
            context["field"] = "lastExecutedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["lastExecutedOn"] : null);
            state['lastExecutedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWiresFileFormatTypeCode: function(val, state) {
            context["field"] = "bulkWiresFileFormatTypeCode";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWiresFileFormatTypeCode"] : null);
            state['bulkWiresFileFormatTypeCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWiresFileFormatTypeName: function(val, state) {
            context["field"] = "bulkWiresFileFormatTypeName";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWiresFileFormatTypeName"] : null);
            state['bulkWiresFileFormatTypeName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        BulkWireFileLineItems: function(val, state) {
            context["field"] = "BulkWireFileLineItems";
            context["metadata"] = (objectMetadata ? objectMetadata["BulkWireFileLineItems"] : null);
            state['BulkWireFileLineItems'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Domestic: function(val, state) {
            context["field"] = "Domestic";
            context["metadata"] = (objectMetadata ? objectMetadata["Domestic"] : null);
            state['Domestic'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        International: function(val, state) {
            context["field"] = "International";
            context["metadata"] = (objectMetadata ? objectMetadata["International"] : null);
            state['International'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankAddress1: function(val, state) {
            context["field"] = "recipientBankAddress1";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress1"] : null);
            state['recipientBankAddress1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankAddress2: function(val, state) {
            context["field"] = "recipientBankAddress2";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress2"] : null);
            state['recipientBankAddress2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientZipCode: function(val, state) {
            context["field"] = "recipientZipCode";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientZipCode"] : null);
            state['recipientZipCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientName: function(val, state) {
            context["field"] = "recipientName";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientName"] : null);
            state['recipientName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankName: function(val, state) {
            context["field"] = "recipientBankName";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankName"] : null);
            state['recipientBankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientCity: function(val, state) {
            context["field"] = "recipientCity";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientCity"] : null);
            state['recipientCity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientState: function(val, state) {
            context["field"] = "recipientState";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientState"] : null);
            state['recipientState'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientAddressLine1: function(val, state) {
            context["field"] = "recipientAddressLine1";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine1"] : null);
            state['recipientAddressLine1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientAddressLine2: function(val, state) {
            context["field"] = "recipientAddressLine2";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine2"] : null);
            state['recipientAddressLine2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankZipCode: function(val, state) {
            context["field"] = "recipientBankZipCode";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankZipCode"] : null);
            state['recipientBankZipCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankstate: function(val, state) {
            context["field"] = "recipientBankstate";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankstate"] : null);
            state['recipientBankstate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankcity: function(val, state) {
            context["field"] = "recipientBankcity";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankcity"] : null);
            state['recipientBankcity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientAccountNumber: function(val, state) {
            context["field"] = "recipientAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientAccountNumber"] : null);
            state['recipientAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientCountryName: function(val, state) {
            context["field"] = "recipientCountryName";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientCountryName"] : null);
            state['recipientCountryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        internationalRoutingNumber: function(val, state) {
            context["field"] = "internationalRoutingNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["internationalRoutingNumber"] : null);
            state['internationalRoutingNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        routingNumber: function(val, state) {
            context["field"] = "routingNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
            state['routingNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionType: function(val, state) {
            context["field"] = "transactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
            state['transactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWireTransferType: function(val, state) {
            context["field"] = "bulkWireTransferType";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTransferType"] : null);
            state['bulkWireTransferType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWireFileLineItemID: function(val, state) {
            context["field"] = "bulkWireFileLineItemID";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileLineItemID"] : null);
            state['bulkWireFileLineItemID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftCode: function(val, state) {
            context["field"] = "swiftCode";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
            state['swiftCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        note: function(val, state) {
            context["field"] = "note";
            context["metadata"] = (objectMetadata ? objectMetadata["note"] : null);
            state['note'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromAccountNumber: function(val, state) {
            context["field"] = "fromAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
            state['fromAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileCategory: function(val, state) {
            context["field"] = "fileCategory";
            context["metadata"] = (objectMetadata ? objectMetadata["fileCategory"] : null);
            state['fileCategory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function BulkWireFile(defaultValues) {
        var privateState = {};
        context["field"] = "bulkWireFileID";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileID"] : null);
        privateState.bulkWireFileID = defaultValues ?
            (defaultValues["bulkWireFileID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireFileID"], context) :
                null) :
            null;

        context["field"] = "bulkWireFileName";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileName"] : null);
        privateState.bulkWireFileName = defaultValues ?
            (defaultValues["bulkWireFileName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireFileName"], context) :
                null) :
            null;

        context["field"] = "noOfTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["noOfTransactions"] : null);
        privateState.noOfTransactions = defaultValues ?
            (defaultValues["noOfTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["noOfTransactions"], context) :
                null) :
            null;

        context["field"] = "noOfDomesticTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["noOfDomesticTransactions"] : null);
        privateState.noOfDomesticTransactions = defaultValues ?
            (defaultValues["noOfDomesticTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["noOfDomesticTransactions"], context) :
                null) :
            null;

        context["field"] = "noOfInternationalTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["noOfInternationalTransactions"] : null);
        privateState.noOfInternationalTransactions = defaultValues ?
            (defaultValues["noOfInternationalTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["noOfInternationalTransactions"], context) :
                null) :
            null;

        context["field"] = "fileFormatCode";
        context["metadata"] = (objectMetadata ? objectMetadata["fileFormatCode"] : null);
        privateState.fileFormatCode = defaultValues ?
            (defaultValues["fileFormatCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileFormatCode"], context) :
                null) :
            null;

        context["field"] = "createdts";
        context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
        privateState.createdts = defaultValues ?
            (defaultValues["createdts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdts"], context) :
                null) :
            null;

        context["field"] = "lastmodifiedts";
        context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
        privateState.lastmodifiedts = defaultValues ?
            (defaultValues["lastmodifiedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastmodifiedts"], context) :
                null) :
            null;

        context["field"] = "synctimestamp";
        context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
        privateState.synctimestamp = defaultValues ?
            (defaultValues["synctimestamp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["synctimestamp"], context) :
                null) :
            null;

        context["field"] = "company_id";
        context["metadata"] = (objectMetadata ? objectMetadata["company_id"] : null);
        privateState.company_id = defaultValues ?
            (defaultValues["company_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["company_id"], context) :
                null) :
            null;

        context["field"] = "softdeleteflag";
        context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
        privateState.softdeleteflag = defaultValues ?
            (defaultValues["softdeleteflag"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softdeleteflag"], context) :
                null) :
            null;

        context["field"] = "bulkWireFileContents";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileContents"] : null);
        privateState.bulkWireFileContents = defaultValues ?
            (defaultValues["bulkWireFileContents"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireFileContents"], context) :
                null) :
            null;

        context["field"] = "firstname";
        context["metadata"] = (objectMetadata ? objectMetadata["firstname"] : null);
        privateState.firstname = defaultValues ?
            (defaultValues["firstname"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["firstname"], context) :
                null) :
            null;

        context["field"] = "lastname";
        context["metadata"] = (objectMetadata ? objectMetadata["lastname"] : null);
        privateState.lastname = defaultValues ?
            (defaultValues["lastname"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastname"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "searchString";
        context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
        privateState.searchString = defaultValues ?
            (defaultValues["searchString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchString"], context) :
                null) :
            null;

        context["field"] = "sortByParam";
        context["metadata"] = (objectMetadata ? objectMetadata["sortByParam"] : null);
        privateState.sortByParam = defaultValues ?
            (defaultValues["sortByParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortByParam"], context) :
                null) :
            null;

        context["field"] = "sortOrder";
        context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
        privateState.sortOrder = defaultValues ?
            (defaultValues["sortOrder"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortOrder"], context) :
                null) :
            null;

        context["field"] = "pageOffset";
        context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
        privateState.pageOffset = defaultValues ?
            (defaultValues["pageOffset"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageOffset"], context) :
                null) :
            null;

        context["field"] = "pageSize";
        context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
        privateState.pageSize = defaultValues ?
            (defaultValues["pageSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageSize"], context) :
                null) :
            null;

        context["field"] = "lastExecutedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["lastExecutedOn"] : null);
        privateState.lastExecutedOn = defaultValues ?
            (defaultValues["lastExecutedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastExecutedOn"], context) :
                null) :
            null;

        context["field"] = "bulkWiresFileFormatTypeCode";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWiresFileFormatTypeCode"] : null);
        privateState.bulkWiresFileFormatTypeCode = defaultValues ?
            (defaultValues["bulkWiresFileFormatTypeCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWiresFileFormatTypeCode"], context) :
                null) :
            null;

        context["field"] = "bulkWiresFileFormatTypeName";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWiresFileFormatTypeName"] : null);
        privateState.bulkWiresFileFormatTypeName = defaultValues ?
            (defaultValues["bulkWiresFileFormatTypeName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWiresFileFormatTypeName"], context) :
                null) :
            null;

        context["field"] = "BulkWireFileLineItems";
        context["metadata"] = (objectMetadata ? objectMetadata["BulkWireFileLineItems"] : null);
        privateState.BulkWireFileLineItems = defaultValues ?
            (defaultValues["BulkWireFileLineItems"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["BulkWireFileLineItems"], context) :
                null) :
            null;

        context["field"] = "Domestic";
        context["metadata"] = (objectMetadata ? objectMetadata["Domestic"] : null);
        privateState.Domestic = defaultValues ?
            (defaultValues["Domestic"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Domestic"], context) :
                null) :
            null;

        context["field"] = "International";
        context["metadata"] = (objectMetadata ? objectMetadata["International"] : null);
        privateState.International = defaultValues ?
            (defaultValues["International"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["International"], context) :
                null) :
            null;

        context["field"] = "recipientBankAddress1";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress1"] : null);
        privateState.recipientBankAddress1 = defaultValues ?
            (defaultValues["recipientBankAddress1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankAddress1"], context) :
                null) :
            null;

        context["field"] = "recipientBankAddress2";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress2"] : null);
        privateState.recipientBankAddress2 = defaultValues ?
            (defaultValues["recipientBankAddress2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankAddress2"], context) :
                null) :
            null;

        context["field"] = "recipientZipCode";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientZipCode"] : null);
        privateState.recipientZipCode = defaultValues ?
            (defaultValues["recipientZipCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientZipCode"], context) :
                null) :
            null;

        context["field"] = "recipientName";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientName"] : null);
        privateState.recipientName = defaultValues ?
            (defaultValues["recipientName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientName"], context) :
                null) :
            null;

        context["field"] = "recipientBankName";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankName"] : null);
        privateState.recipientBankName = defaultValues ?
            (defaultValues["recipientBankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankName"], context) :
                null) :
            null;

        context["field"] = "recipientCity";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientCity"] : null);
        privateState.recipientCity = defaultValues ?
            (defaultValues["recipientCity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientCity"], context) :
                null) :
            null;

        context["field"] = "recipientState";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientState"] : null);
        privateState.recipientState = defaultValues ?
            (defaultValues["recipientState"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientState"], context) :
                null) :
            null;

        context["field"] = "recipientAddressLine1";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine1"] : null);
        privateState.recipientAddressLine1 = defaultValues ?
            (defaultValues["recipientAddressLine1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientAddressLine1"], context) :
                null) :
            null;

        context["field"] = "recipientAddressLine2";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine2"] : null);
        privateState.recipientAddressLine2 = defaultValues ?
            (defaultValues["recipientAddressLine2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientAddressLine2"], context) :
                null) :
            null;

        context["field"] = "recipientBankZipCode";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankZipCode"] : null);
        privateState.recipientBankZipCode = defaultValues ?
            (defaultValues["recipientBankZipCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankZipCode"], context) :
                null) :
            null;

        context["field"] = "recipientBankstate";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankstate"] : null);
        privateState.recipientBankstate = defaultValues ?
            (defaultValues["recipientBankstate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankstate"], context) :
                null) :
            null;

        context["field"] = "recipientBankcity";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankcity"] : null);
        privateState.recipientBankcity = defaultValues ?
            (defaultValues["recipientBankcity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankcity"], context) :
                null) :
            null;

        context["field"] = "recipientAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientAccountNumber"] : null);
        privateState.recipientAccountNumber = defaultValues ?
            (defaultValues["recipientAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientAccountNumber"], context) :
                null) :
            null;

        context["field"] = "recipientCountryName";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientCountryName"] : null);
        privateState.recipientCountryName = defaultValues ?
            (defaultValues["recipientCountryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientCountryName"], context) :
                null) :
            null;

        context["field"] = "internationalRoutingNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["internationalRoutingNumber"] : null);
        privateState.internationalRoutingNumber = defaultValues ?
            (defaultValues["internationalRoutingNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["internationalRoutingNumber"], context) :
                null) :
            null;

        context["field"] = "routingNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
        privateState.routingNumber = defaultValues ?
            (defaultValues["routingNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["routingNumber"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "transactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
        privateState.transactionType = defaultValues ?
            (defaultValues["transactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionType"], context) :
                null) :
            null;

        context["field"] = "bulkWireTransferType";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTransferType"] : null);
        privateState.bulkWireTransferType = defaultValues ?
            (defaultValues["bulkWireTransferType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireTransferType"], context) :
                null) :
            null;

        context["field"] = "bulkWireFileLineItemID";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileLineItemID"] : null);
        privateState.bulkWireFileLineItemID = defaultValues ?
            (defaultValues["bulkWireFileLineItemID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireFileLineItemID"], context) :
                null) :
            null;

        context["field"] = "swiftCode";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
        privateState.swiftCode = defaultValues ?
            (defaultValues["swiftCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftCode"], context) :
                null) :
            null;

        context["field"] = "note";
        context["metadata"] = (objectMetadata ? objectMetadata["note"] : null);
        privateState.note = defaultValues ?
            (defaultValues["note"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["note"], context) :
                null) :
            null;

        context["field"] = "fromAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
        privateState.fromAccountNumber = defaultValues ?
            (defaultValues["fromAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountNumber"], context) :
                null) :
            null;

        context["field"] = "fileCategory";
        context["metadata"] = (objectMetadata ? objectMetadata["fileCategory"] : null);
        privateState.fileCategory = defaultValues ?
            (defaultValues["fileCategory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileCategory"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "bulkWireFileID": {
                get: function() {
                    context["field"] = "bulkWireFileID";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireFileID, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireFileID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWireFileName": {
                get: function() {
                    context["field"] = "bulkWireFileName";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireFileName, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireFileName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "noOfTransactions": {
                get: function() {
                    context["field"] = "noOfTransactions";
                    context["metadata"] = (objectMetadata ? objectMetadata["noOfTransactions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.noOfTransactions, context);
                },
                set: function(val) {
                    setterFunctions['noOfTransactions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "noOfDomesticTransactions": {
                get: function() {
                    context["field"] = "noOfDomesticTransactions";
                    context["metadata"] = (objectMetadata ? objectMetadata["noOfDomesticTransactions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.noOfDomesticTransactions, context);
                },
                set: function(val) {
                    setterFunctions['noOfDomesticTransactions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "noOfInternationalTransactions": {
                get: function() {
                    context["field"] = "noOfInternationalTransactions";
                    context["metadata"] = (objectMetadata ? objectMetadata["noOfInternationalTransactions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.noOfInternationalTransactions, context);
                },
                set: function(val) {
                    setterFunctions['noOfInternationalTransactions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileFormatCode": {
                get: function() {
                    context["field"] = "fileFormatCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileFormatCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileFormatCode, context);
                },
                set: function(val) {
                    setterFunctions['fileFormatCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdts": {
                get: function() {
                    context["field"] = "createdts";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdts, context);
                },
                set: function(val) {
                    setterFunctions['createdts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastmodifiedts": {
                get: function() {
                    context["field"] = "lastmodifiedts";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastmodifiedts, context);
                },
                set: function(val) {
                    setterFunctions['lastmodifiedts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "synctimestamp": {
                get: function() {
                    context["field"] = "synctimestamp";
                    context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.synctimestamp, context);
                },
                set: function(val) {
                    setterFunctions['synctimestamp'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "company_id": {
                get: function() {
                    context["field"] = "company_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["company_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.company_id, context);
                },
                set: function(val) {
                    setterFunctions['company_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "softdeleteflag": {
                get: function() {
                    context["field"] = "softdeleteflag";
                    context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.softdeleteflag, context);
                },
                set: function(val) {
                    setterFunctions['softdeleteflag'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWireFileContents": {
                get: function() {
                    context["field"] = "bulkWireFileContents";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileContents"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireFileContents, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireFileContents'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "firstname": {
                get: function() {
                    context["field"] = "firstname";
                    context["metadata"] = (objectMetadata ? objectMetadata["firstname"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.firstname, context);
                },
                set: function(val) {
                    setterFunctions['firstname'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastname": {
                get: function() {
                    context["field"] = "lastname";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastname"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastname, context);
                },
                set: function(val) {
                    setterFunctions['lastname'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrMsg": {
                get: function() {
                    context["field"] = "dbpErrMsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrMsg, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrMsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrCode": {
                get: function() {
                    context["field"] = "dbpErrCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrCode, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errmsg": {
                get: function() {
                    context["field"] = "errmsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errmsg, context);
                },
                set: function(val) {
                    setterFunctions['errmsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchString": {
                get: function() {
                    context["field"] = "searchString";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchString, context);
                },
                set: function(val) {
                    setterFunctions['searchString'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortByParam": {
                get: function() {
                    context["field"] = "sortByParam";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortByParam"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortByParam, context);
                },
                set: function(val) {
                    setterFunctions['sortByParam'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortOrder": {
                get: function() {
                    context["field"] = "sortOrder";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortOrder, context);
                },
                set: function(val) {
                    setterFunctions['sortOrder'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pageOffset": {
                get: function() {
                    context["field"] = "pageOffset";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageOffset, context);
                },
                set: function(val) {
                    setterFunctions['pageOffset'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pageSize": {
                get: function() {
                    context["field"] = "pageSize";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageSize, context);
                },
                set: function(val) {
                    setterFunctions['pageSize'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastExecutedOn": {
                get: function() {
                    context["field"] = "lastExecutedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastExecutedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastExecutedOn, context);
                },
                set: function(val) {
                    setterFunctions['lastExecutedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWiresFileFormatTypeCode": {
                get: function() {
                    context["field"] = "bulkWiresFileFormatTypeCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWiresFileFormatTypeCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWiresFileFormatTypeCode, context);
                },
                set: function(val) {
                    setterFunctions['bulkWiresFileFormatTypeCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWiresFileFormatTypeName": {
                get: function() {
                    context["field"] = "bulkWiresFileFormatTypeName";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWiresFileFormatTypeName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWiresFileFormatTypeName, context);
                },
                set: function(val) {
                    setterFunctions['bulkWiresFileFormatTypeName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "BulkWireFileLineItems": {
                get: function() {
                    context["field"] = "BulkWireFileLineItems";
                    context["metadata"] = (objectMetadata ? objectMetadata["BulkWireFileLineItems"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.BulkWireFileLineItems, context);
                },
                set: function(val) {
                    setterFunctions['BulkWireFileLineItems'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Domestic": {
                get: function() {
                    context["field"] = "Domestic";
                    context["metadata"] = (objectMetadata ? objectMetadata["Domestic"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Domestic, context);
                },
                set: function(val) {
                    setterFunctions['Domestic'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "International": {
                get: function() {
                    context["field"] = "International";
                    context["metadata"] = (objectMetadata ? objectMetadata["International"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.International, context);
                },
                set: function(val) {
                    setterFunctions['International'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankAddress1": {
                get: function() {
                    context["field"] = "recipientBankAddress1";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankAddress1, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankAddress1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankAddress2": {
                get: function() {
                    context["field"] = "recipientBankAddress2";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankAddress2, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankAddress2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientZipCode": {
                get: function() {
                    context["field"] = "recipientZipCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientZipCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientZipCode, context);
                },
                set: function(val) {
                    setterFunctions['recipientZipCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientName": {
                get: function() {
                    context["field"] = "recipientName";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientName, context);
                },
                set: function(val) {
                    setterFunctions['recipientName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankName": {
                get: function() {
                    context["field"] = "recipientBankName";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankName, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientCity": {
                get: function() {
                    context["field"] = "recipientCity";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientCity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientCity, context);
                },
                set: function(val) {
                    setterFunctions['recipientCity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientState": {
                get: function() {
                    context["field"] = "recipientState";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientState"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientState, context);
                },
                set: function(val) {
                    setterFunctions['recipientState'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientAddressLine1": {
                get: function() {
                    context["field"] = "recipientAddressLine1";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientAddressLine1, context);
                },
                set: function(val) {
                    setterFunctions['recipientAddressLine1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientAddressLine2": {
                get: function() {
                    context["field"] = "recipientAddressLine2";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientAddressLine2, context);
                },
                set: function(val) {
                    setterFunctions['recipientAddressLine2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankZipCode": {
                get: function() {
                    context["field"] = "recipientBankZipCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankZipCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankZipCode, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankZipCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankstate": {
                get: function() {
                    context["field"] = "recipientBankstate";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankstate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankstate, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankstate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankcity": {
                get: function() {
                    context["field"] = "recipientBankcity";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankcity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankcity, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankcity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientAccountNumber": {
                get: function() {
                    context["field"] = "recipientAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['recipientAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientCountryName": {
                get: function() {
                    context["field"] = "recipientCountryName";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientCountryName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientCountryName, context);
                },
                set: function(val) {
                    setterFunctions['recipientCountryName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "internationalRoutingNumber": {
                get: function() {
                    context["field"] = "internationalRoutingNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["internationalRoutingNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.internationalRoutingNumber, context);
                },
                set: function(val) {
                    setterFunctions['internationalRoutingNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "routingNumber": {
                get: function() {
                    context["field"] = "routingNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.routingNumber, context);
                },
                set: function(val) {
                    setterFunctions['routingNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currency": {
                get: function() {
                    context["field"] = "currency";
                    context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currency, context);
                },
                set: function(val) {
                    setterFunctions['currency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amount": {
                get: function() {
                    context["field"] = "amount";
                    context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amount, context);
                },
                set: function(val) {
                    setterFunctions['amount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionType": {
                get: function() {
                    context["field"] = "transactionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionType, context);
                },
                set: function(val) {
                    setterFunctions['transactionType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWireTransferType": {
                get: function() {
                    context["field"] = "bulkWireTransferType";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTransferType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireTransferType, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireTransferType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWireFileLineItemID": {
                get: function() {
                    context["field"] = "bulkWireFileLineItemID";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireFileLineItemID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireFileLineItemID, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireFileLineItemID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "swiftCode": {
                get: function() {
                    context["field"] = "swiftCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swiftCode, context);
                },
                set: function(val) {
                    setterFunctions['swiftCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "note": {
                get: function() {
                    context["field"] = "note";
                    context["metadata"] = (objectMetadata ? objectMetadata["note"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.note, context);
                },
                set: function(val) {
                    setterFunctions['note'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromAccountNumber": {
                get: function() {
                    context["field"] = "fromAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['fromAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileCategory": {
                get: function() {
                    context["field"] = "fileCategory";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileCategory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileCategory, context);
                },
                set: function(val) {
                    setterFunctions['fileCategory'].call(this, val, privateState);
                },
                enumerable: true,
            },
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.bulkWireFileID = value ? (value["bulkWireFileID"] ? value["bulkWireFileID"] : null) : null;
            privateState.bulkWireFileName = value ? (value["bulkWireFileName"] ? value["bulkWireFileName"] : null) : null;
            privateState.noOfTransactions = value ? (value["noOfTransactions"] ? value["noOfTransactions"] : null) : null;
            privateState.noOfDomesticTransactions = value ? (value["noOfDomesticTransactions"] ? value["noOfDomesticTransactions"] : null) : null;
            privateState.noOfInternationalTransactions = value ? (value["noOfInternationalTransactions"] ? value["noOfInternationalTransactions"] : null) : null;
            privateState.fileFormatCode = value ? (value["fileFormatCode"] ? value["fileFormatCode"] : null) : null;
            privateState.createdts = value ? (value["createdts"] ? value["createdts"] : null) : null;
            privateState.lastmodifiedts = value ? (value["lastmodifiedts"] ? value["lastmodifiedts"] : null) : null;
            privateState.synctimestamp = value ? (value["synctimestamp"] ? value["synctimestamp"] : null) : null;
            privateState.company_id = value ? (value["company_id"] ? value["company_id"] : null) : null;
            privateState.softdeleteflag = value ? (value["softdeleteflag"] ? value["softdeleteflag"] : null) : null;
            privateState.bulkWireFileContents = value ? (value["bulkWireFileContents"] ? value["bulkWireFileContents"] : null) : null;
            privateState.firstname = value ? (value["firstname"] ? value["firstname"] : null) : null;
            privateState.lastname = value ? (value["lastname"] ? value["lastname"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.lastExecutedOn = value ? (value["lastExecutedOn"] ? value["lastExecutedOn"] : null) : null;
            privateState.bulkWiresFileFormatTypeCode = value ? (value["bulkWiresFileFormatTypeCode"] ? value["bulkWiresFileFormatTypeCode"] : null) : null;
            privateState.bulkWiresFileFormatTypeName = value ? (value["bulkWiresFileFormatTypeName"] ? value["bulkWiresFileFormatTypeName"] : null) : null;
            privateState.BulkWireFileLineItems = value ? (value["BulkWireFileLineItems"] ? value["BulkWireFileLineItems"] : null) : null;
            privateState.Domestic = value ? (value["Domestic"] ? value["Domestic"] : null) : null;
            privateState.International = value ? (value["International"] ? value["International"] : null) : null;
            privateState.recipientBankAddress1 = value ? (value["recipientBankAddress1"] ? value["recipientBankAddress1"] : null) : null;
            privateState.recipientBankAddress2 = value ? (value["recipientBankAddress2"] ? value["recipientBankAddress2"] : null) : null;
            privateState.recipientZipCode = value ? (value["recipientZipCode"] ? value["recipientZipCode"] : null) : null;
            privateState.recipientName = value ? (value["recipientName"] ? value["recipientName"] : null) : null;
            privateState.recipientBankName = value ? (value["recipientBankName"] ? value["recipientBankName"] : null) : null;
            privateState.recipientCity = value ? (value["recipientCity"] ? value["recipientCity"] : null) : null;
            privateState.recipientState = value ? (value["recipientState"] ? value["recipientState"] : null) : null;
            privateState.recipientAddressLine1 = value ? (value["recipientAddressLine1"] ? value["recipientAddressLine1"] : null) : null;
            privateState.recipientAddressLine2 = value ? (value["recipientAddressLine2"] ? value["recipientAddressLine2"] : null) : null;
            privateState.recipientBankZipCode = value ? (value["recipientBankZipCode"] ? value["recipientBankZipCode"] : null) : null;
            privateState.recipientBankstate = value ? (value["recipientBankstate"] ? value["recipientBankstate"] : null) : null;
            privateState.recipientBankcity = value ? (value["recipientBankcity"] ? value["recipientBankcity"] : null) : null;
            privateState.recipientAccountNumber = value ? (value["recipientAccountNumber"] ? value["recipientAccountNumber"] : null) : null;
            privateState.recipientCountryName = value ? (value["recipientCountryName"] ? value["recipientCountryName"] : null) : null;
            privateState.internationalRoutingNumber = value ? (value["internationalRoutingNumber"] ? value["internationalRoutingNumber"] : null) : null;
            privateState.routingNumber = value ? (value["routingNumber"] ? value["routingNumber"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.bulkWireTransferType = value ? (value["bulkWireTransferType"] ? value["bulkWireTransferType"] : null) : null;
            privateState.bulkWireFileLineItemID = value ? (value["bulkWireFileLineItemID"] ? value["bulkWireFileLineItemID"] : null) : null;
            privateState.swiftCode = value ? (value["swiftCode"] ? value["swiftCode"] : null) : null;
            privateState.note = value ? (value["note"] ? value["note"] : null) : null;
            privateState.fromAccountNumber = value ? (value["fromAccountNumber"] ? value["fromAccountNumber"] : null) : null;
            privateState.fileCategory = value ? (value["fileCategory"] ? value["fileCategory"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(BulkWireFile);

    //Create new class level validator object
    BaseModel.Validator.call(BulkWireFile);

    var registerValidatorBackup = BulkWireFile.registerValidator;

    BulkWireFile.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(BulkWireFile.isValid(this, propName, val)) {
                    return setterBackup.apply(null, arguments);
                } else {
                    throw Error("Validation failed for " + propName + " : " + val);
                }
            }
            setterFunctions[arguments[0]].changed = true;
        }
        return registerValidatorBackup.apply(null, arguments);
    }

    //Extending Model for custom operations
    //For Operation 'uploadBWTemplateFile' with service id 'UploadBWTemplateFile2625'
     BulkWireFile.uploadBWTemplateFile = function(params, onCompletion){
        return BulkWireFile.customVerb('uploadBWTemplateFile', params, onCompletion);
     };

    //For Operation 'downloadFile' with service id 'downloadFile7129'
     BulkWireFile.downloadFile = function(params, onCompletion){
        return BulkWireFile.customVerb('downloadFile', params, onCompletion);
     };

    //For Operation 'uploadBWFile' with service id 'UploadBWFile4057'
     BulkWireFile.uploadBWFile = function(params, onCompletion){
        return BulkWireFile.customVerb('uploadBWFile', params, onCompletion);
     };

    //For Operation 'getBulkWireFileFormatTypes' with service id 'getBulkWireFileFormatTypes9584'
     BulkWireFile.getBulkWireFileFormatTypes = function(params, onCompletion){
        return BulkWireFile.customVerb('getBulkWireFileFormatTypes', params, onCompletion);
     };

    //For Operation 'getBulkWireFilesForUser' with service id 'getBulkWireFilesForUser2288'
     BulkWireFile.getBulkWireFilesForUser = function(params, onCompletion){
        return BulkWireFile.customVerb('getBulkWireFilesForUser', params, onCompletion);
     };

    //For Operation 'getBulkwireFileLineItems' with service id 'getBulkWireFileLineItems1730'
     BulkWireFile.getBulkwireFileLineItems = function(params, onCompletion){
        return BulkWireFile.customVerb('getBulkwireFileLineItems', params, onCompletion);
     };

    //For Operation 'downloadSampleFile' with service id 'downloadSampleFile3589'
     BulkWireFile.downloadSampleFile = function(params, onCompletion){
        return BulkWireFile.customVerb('downloadSampleFile', params, onCompletion);
     };

    //For Operation 'downloadFileBulkWire' with service id 'downloadFileBulkWire2111'
     BulkWireFile.downloadFileBulkWire = function(params, onCompletion){
        return BulkWireFile.customVerb('downloadFileBulkWire', params, onCompletion);
     };

    //For Operation 'initiateDownloadBulkWireSampleFile' with service id 'initiateDownloadBulkWireSampleFile6656'
     BulkWireFile.initiateDownloadBulkWireSampleFile = function(params, onCompletion){
        return BulkWireFile.customVerb('initiateDownloadBulkWireSampleFile', params, onCompletion);
     };

    var relations = [];

    BulkWireFile.relations = relations;

    BulkWireFile.prototype.isValid = function() {
        return BulkWireFile.isValid(this);
    };

    BulkWireFile.prototype.objModelName = "BulkWireFile";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    BulkWireFile.registerProcessors = function(options, successCallback, failureCallback) {

        if(!options) {
            options = {};
        }

        if(options && ((options["preProcessor"] && typeof(options["preProcessor"]) === "function") || !options["preProcessor"])) {
            preProcessorCallback = options["preProcessor"];
        }

        if(options && ((options["postProcessor"] && typeof(options["postProcessor"]) === "function") || !options["postProcessor"])) {
            postProcessorCallback = options["postProcessor"];
        }

        function metaDataSuccess(res) {
            objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
            successCallback();
        }

        function metaDataFailure(err) {
            failureCallback(err);
        }

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BulkWireObjects", "BulkWireFile", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    BulkWireFile.clone = function(objectToClone) {
        var clonedObj = new BulkWireFile();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return BulkWireFile;
});