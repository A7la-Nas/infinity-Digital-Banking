/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "AdhocStatements", "objectService" : "DocumentManagement"};

    var setterFunctions = {
        fileType: function(val, state) {
            context["field"] = "fileType";
            context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
            state['fileType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionType: function(val, state) {
            context["field"] = "transactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
            state['transactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isScheduled: function(val, state) {
            context["field"] = "isScheduled";
            context["metadata"] = (objectMetadata ? objectMetadata["isScheduled"] : null);
            state['isScheduled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        order: function(val, state) {
            context["field"] = "order";
            context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
            state['order'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestType: function(val, state) {
            context["field"] = "requestType";
            context["metadata"] = (objectMetadata ? objectMetadata["requestType"] : null);
            state['requestType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchStartDate: function(val, state) {
            context["field"] = "searchStartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
            state['searchStartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchEndDate: function(val, state) {
            context["field"] = "searchEndDate";
            context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
            state['searchEndDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchMinAmount: function(val, state) {
            context["field"] = "searchMinAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["searchMinAmount"] : null);
            state['searchMinAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchMaxAmount: function(val, state) {
            context["field"] = "searchMaxAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["searchMaxAmount"] : null);
            state['searchMaxAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromCheckNumber: function(val, state) {
            context["field"] = "fromCheckNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["fromCheckNumber"] : null);
            state['fromCheckNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toCheckNumber: function(val, state) {
            context["field"] = "toCheckNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["toCheckNumber"] : null);
            state['toCheckNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fieldName: function(val, state) {
            context["field"] = "fieldName";
            context["metadata"] = (objectMetadata ? objectMetadata["fieldName"] : null);
            state['fieldName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileName: function(val, state) {
            context["field"] = "fileName";
            context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
            state['fileName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        generatedDate: function(val, state) {
            context["field"] = "generatedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["generatedDate"] : null);
            state['generatedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        inputPayload: function(val, state) {
            context["field"] = "inputPayload";
            context["metadata"] = (objectMetadata ? objectMetadata["inputPayload"] : null);
            state['inputPayload'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        codeCh: function(val, state) {
            context["field"] = "codeCh";
            context["metadata"] = (objectMetadata ? objectMetadata["codeCh"] : null);
            state['codeCh'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        codeVerifier: function(val, state) {
            context["field"] = "codeVerifier";
            context["metadata"] = (objectMetadata ? objectMetadata["codeVerifier"] : null);
            state['codeVerifier'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        statementAvailable: function(val, state) {
            context["field"] = "statementAvailable";
            context["metadata"] = (objectMetadata ? objectMetadata["statementAvailable"] : null);
            state['statementAvailable'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileIdSec: function(val, state) {
            context["field"] = "fileIdSec";
            context["metadata"] = (objectMetadata ? objectMetadata["fileIdSec"] : null);
            state['fileIdSec'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function AdhocStatements(defaultValues) {
        var privateState = {};
        context["field"] = "fileType";
        context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
        privateState.fileType = defaultValues ?
            (defaultValues["fileType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileType"], context) :
                null) :
            null;

        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
                null) :
            null;

        context["field"] = "transactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
        privateState.transactionType = defaultValues ?
            (defaultValues["transactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionType"], context) :
                null) :
            null;

        context["field"] = "isScheduled";
        context["metadata"] = (objectMetadata ? objectMetadata["isScheduled"] : null);
        privateState.isScheduled = defaultValues ?
            (defaultValues["isScheduled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isScheduled"], context) :
                null) :
            null;

        context["field"] = "order";
        context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
        privateState.order = defaultValues ?
            (defaultValues["order"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["order"], context) :
                null) :
            null;

        context["field"] = "requestType";
        context["metadata"] = (objectMetadata ? objectMetadata["requestType"] : null);
        privateState.requestType = defaultValues ?
            (defaultValues["requestType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestType"], context) :
                null) :
            null;

        context["field"] = "searchStartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
        privateState.searchStartDate = defaultValues ?
            (defaultValues["searchStartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchStartDate"], context) :
                null) :
            null;

        context["field"] = "searchEndDate";
        context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
        privateState.searchEndDate = defaultValues ?
            (defaultValues["searchEndDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchEndDate"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "searchMinAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["searchMinAmount"] : null);
        privateState.searchMinAmount = defaultValues ?
            (defaultValues["searchMinAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchMinAmount"], context) :
                null) :
            null;

        context["field"] = "searchMaxAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["searchMaxAmount"] : null);
        privateState.searchMaxAmount = defaultValues ?
            (defaultValues["searchMaxAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchMaxAmount"], context) :
                null) :
            null;

        context["field"] = "fromCheckNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["fromCheckNumber"] : null);
        privateState.fromCheckNumber = defaultValues ?
            (defaultValues["fromCheckNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromCheckNumber"], context) :
                null) :
            null;

        context["field"] = "toCheckNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["toCheckNumber"] : null);
        privateState.toCheckNumber = defaultValues ?
            (defaultValues["toCheckNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toCheckNumber"], context) :
                null) :
            null;

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
                null) :
            null;

        context["field"] = "fieldName";
        context["metadata"] = (objectMetadata ? objectMetadata["fieldName"] : null);
        privateState.fieldName = defaultValues ?
            (defaultValues["fieldName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fieldName"], context) :
                null) :
            null;

        context["field"] = "fileName";
        context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
        privateState.fileName = defaultValues ?
            (defaultValues["fileName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileName"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "generatedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["generatedDate"] : null);
        privateState.generatedDate = defaultValues ?
            (defaultValues["generatedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["generatedDate"], context) :
                null) :
            null;

        context["field"] = "inputPayload";
        context["metadata"] = (objectMetadata ? objectMetadata["inputPayload"] : null);
        privateState.inputPayload = defaultValues ?
            (defaultValues["inputPayload"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["inputPayload"], context) :
                null) :
            null;

        context["field"] = "codeCh";
        context["metadata"] = (objectMetadata ? objectMetadata["codeCh"] : null);
        privateState.codeCh = defaultValues ?
            (defaultValues["codeCh"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["codeCh"], context) :
                null) :
            null;

        context["field"] = "codeVerifier";
        context["metadata"] = (objectMetadata ? objectMetadata["codeVerifier"] : null);
        privateState.codeVerifier = defaultValues ?
            (defaultValues["codeVerifier"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["codeVerifier"], context) :
                null) :
            null;

        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "statementAvailable";
        context["metadata"] = (objectMetadata ? objectMetadata["statementAvailable"] : null);
        privateState.statementAvailable = defaultValues ?
            (defaultValues["statementAvailable"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["statementAvailable"], context) :
                null) :
            null;

        context["field"] = "fileIdSec";
        context["metadata"] = (objectMetadata ? objectMetadata["fileIdSec"] : null);
        privateState.fileIdSec = defaultValues ?
            (defaultValues["fileIdSec"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileIdSec"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "fileType": {
                get: function() {
                    context["field"] = "fileType";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileType, context);
                },
                set: function(val) {
                    setterFunctions['fileType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountID": {
                get: function() {
                    context["field"] = "accountID";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountID, context);
                },
                set: function(val) {
                    setterFunctions['accountID'].call(this, val, privateState);
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
            "isScheduled": {
                get: function() {
                    context["field"] = "isScheduled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isScheduled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isScheduled, context);
                },
                set: function(val) {
                    setterFunctions['isScheduled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "order": {
                get: function() {
                    context["field"] = "order";
                    context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.order, context);
                },
                set: function(val) {
                    setterFunctions['order'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestType": {
                get: function() {
                    context["field"] = "requestType";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestType, context);
                },
                set: function(val) {
                    setterFunctions['requestType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchStartDate": {
                get: function() {
                    context["field"] = "searchStartDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchStartDate, context);
                },
                set: function(val) {
                    setterFunctions['searchStartDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchEndDate": {
                get: function() {
                    context["field"] = "searchEndDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchEndDate, context);
                },
                set: function(val) {
                    setterFunctions['searchEndDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "description": {
                get: function() {
                    context["field"] = "description";
                    context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.description, context);
                },
                set: function(val) {
                    setterFunctions['description'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchMinAmount": {
                get: function() {
                    context["field"] = "searchMinAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchMinAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchMinAmount, context);
                },
                set: function(val) {
                    setterFunctions['searchMinAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchMaxAmount": {
                get: function() {
                    context["field"] = "searchMaxAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchMaxAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchMaxAmount, context);
                },
                set: function(val) {
                    setterFunctions['searchMaxAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromCheckNumber": {
                get: function() {
                    context["field"] = "fromCheckNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromCheckNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromCheckNumber, context);
                },
                set: function(val) {
                    setterFunctions['fromCheckNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "toCheckNumber": {
                get: function() {
                    context["field"] = "toCheckNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["toCheckNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toCheckNumber, context);
                },
                set: function(val) {
                    setterFunctions['toCheckNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileId": {
                get: function() {
                    context["field"] = "fileId";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileId, context);
                },
                set: function(val) {
                    setterFunctions['fileId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fieldName": {
                get: function() {
                    context["field"] = "fieldName";
                    context["metadata"] = (objectMetadata ? objectMetadata["fieldName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fieldName, context);
                },
                set: function(val) {
                    setterFunctions['fieldName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileName": {
                get: function() {
                    context["field"] = "fileName";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileName, context);
                },
                set: function(val) {
                    setterFunctions['fileName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "status": {
                get: function() {
                    context["field"] = "status";
                    context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.status, context);
                },
                set: function(val) {
                    setterFunctions['status'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "generatedDate": {
                get: function() {
                    context["field"] = "generatedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["generatedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.generatedDate, context);
                },
                set: function(val) {
                    setterFunctions['generatedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "inputPayload": {
                get: function() {
                    context["field"] = "inputPayload";
                    context["metadata"] = (objectMetadata ? objectMetadata["inputPayload"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.inputPayload, context);
                },
                set: function(val) {
                    setterFunctions['inputPayload'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "codeCh": {
                get: function() {
                    context["field"] = "codeCh";
                    context["metadata"] = (objectMetadata ? objectMetadata["codeCh"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.codeCh, context);
                },
                set: function(val) {
                    setterFunctions['codeCh'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "codeVerifier": {
                get: function() {
                    context["field"] = "codeVerifier";
                    context["metadata"] = (objectMetadata ? objectMetadata["codeVerifier"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.codeVerifier, context);
                },
                set: function(val) {
                    setterFunctions['codeVerifier'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountName": {
                get: function() {
                    context["field"] = "accountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountName, context);
                },
                set: function(val) {
                    setterFunctions['accountName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "statementAvailable": {
                get: function() {
                    context["field"] = "statementAvailable";
                    context["metadata"] = (objectMetadata ? objectMetadata["statementAvailable"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.statementAvailable, context);
                },
                set: function(val) {
                    setterFunctions['statementAvailable'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileIdSec": {
                get: function() {
                    context["field"] = "fileIdSec";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileIdSec"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileIdSec, context);
                },
                set: function(val) {
                    setterFunctions['fileIdSec'].call(this, val, privateState);
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
            privateState.fileType = value ? (value["fileType"] ? value["fileType"] : null) : null;
            privateState.accountID = value ? (value["accountID"] ? value["accountID"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.isScheduled = value ? (value["isScheduled"] ? value["isScheduled"] : null) : null;
            privateState.order = value ? (value["order"] ? value["order"] : null) : null;
            privateState.requestType = value ? (value["requestType"] ? value["requestType"] : null) : null;
            privateState.searchStartDate = value ? (value["searchStartDate"] ? value["searchStartDate"] : null) : null;
            privateState.searchEndDate = value ? (value["searchEndDate"] ? value["searchEndDate"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.searchMinAmount = value ? (value["searchMinAmount"] ? value["searchMinAmount"] : null) : null;
            privateState.searchMaxAmount = value ? (value["searchMaxAmount"] ? value["searchMaxAmount"] : null) : null;
            privateState.fromCheckNumber = value ? (value["fromCheckNumber"] ? value["fromCheckNumber"] : null) : null;
            privateState.toCheckNumber = value ? (value["toCheckNumber"] ? value["toCheckNumber"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
            privateState.fieldName = value ? (value["fieldName"] ? value["fieldName"] : null) : null;
            privateState.fileName = value ? (value["fileName"] ? value["fileName"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.generatedDate = value ? (value["generatedDate"] ? value["generatedDate"] : null) : null;
            privateState.inputPayload = value ? (value["inputPayload"] ? value["inputPayload"] : null) : null;
            privateState.codeCh = value ? (value["codeCh"] ? value["codeCh"] : null) : null;
            privateState.codeVerifier = value ? (value["codeVerifier"] ? value["codeVerifier"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.statementAvailable = value ? (value["statementAvailable"] ? value["statementAvailable"] : null) : null;
            privateState.fileIdSec = value ? (value["fileIdSec"] ? value["fileIdSec"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(AdhocStatements);

    //Create new class level validator object
    BaseModel.Validator.call(AdhocStatements);

    var registerValidatorBackup = AdhocStatements.registerValidator;

    AdhocStatements.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(AdhocStatements.isValid(this, propName, val)) {
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
    //For Operation 'download' with service id 'downloadAdhocStatementFile9457'
     AdhocStatements.download = function(params, onCompletion){
        return AdhocStatements.customVerb('download', params, onCompletion);
     };

    //For Operation 'getDetails' with service id 'getAdhocStatementDetails4762'
     AdhocStatements.getDetails = function(params, onCompletion){
        return AdhocStatements.customVerb('getDetails', params, onCompletion);
     };

    //For Operation 'generate' with service id 'generateAdhocStatementFile8240'
     AdhocStatements.generate = function(params, onCompletion){
        return AdhocStatements.customVerb('generate', params, onCompletion);
     };

    var relations = [];

    AdhocStatements.relations = relations;

    AdhocStatements.prototype.isValid = function() {
        return AdhocStatements.isValid(this);
    };

    AdhocStatements.prototype.objModelName = "AdhocStatements";
    AdhocStatements.prototype.objServiceName = "DocumentManagement";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    AdhocStatements.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("DocumentManagement", "AdhocStatements", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    AdhocStatements.clone = function(objectToClone) {
        var clonedObj = new AdhocStatements();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return AdhocStatements;
});