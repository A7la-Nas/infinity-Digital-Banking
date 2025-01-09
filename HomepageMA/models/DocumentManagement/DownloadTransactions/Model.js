/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "DownloadTransactions", "objectService" : "DocumentManagement"};

    var setterFunctions = {
        checkNumber: function(val, state) {
            context["field"] = "checkNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["checkNumber"] : null);
            state['checkNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastRecordNumber: function(val, state) {
            context["field"] = "lastRecordNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["lastRecordNumber"] : null);
            state['lastRecordNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchType: function(val, state) {
            context["field"] = "searchType";
            context["metadata"] = (objectMetadata ? objectMetadata["searchType"] : null);
            state['searchType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchEndDate: function(val, state) {
            context["field"] = "searchEndDate";
            context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
            state['searchEndDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromCheckNumber: function(val, state) {
            context["field"] = "fromCheckNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["fromCheckNumber"] : null);
            state['fromCheckNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        filters: function(val, state) {
            context["field"] = "filters";
            context["metadata"] = (objectMetadata ? objectMetadata["filters"] : null);
            state['filters'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchDescription: function(val, state) {
            context["field"] = "searchDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["searchDescription"] : null);
            state['searchDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        title: function(val, state) {
            context["field"] = "title";
            context["metadata"] = (objectMetadata ? objectMetadata["title"] : null);
            state['title'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionId: function(val, state) {
            context["field"] = "transactionId";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
            state['transactionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionType: function(val, state) {
            context["field"] = "transactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
            state['transactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchAmount: function(val, state) {
            context["field"] = "searchAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["searchAmount"] : null);
            state['searchAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchStartDate: function(val, state) {
            context["field"] = "searchStartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
            state['searchStartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchDateRange: function(val, state) {
            context["field"] = "searchDateRange";
            context["metadata"] = (objectMetadata ? objectMetadata["searchDateRange"] : null);
            state['searchDateRange'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchTransactionType: function(val, state) {
            context["field"] = "searchTransactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["searchTransactionType"] : null);
            state['searchTransactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchMinAmount: function(val, state) {
            context["field"] = "searchMinAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["searchMinAmount"] : null);
            state['searchMinAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        firstRecordNumber: function(val, state) {
            context["field"] = "firstRecordNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["firstRecordNumber"] : null);
            state['firstRecordNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toCheckNumber: function(val, state) {
            context["field"] = "toCheckNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["toCheckNumber"] : null);
            state['toCheckNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortBy: function(val, state) {
            context["field"] = "sortBy";
            context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
            state['sortBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        generatedBy: function(val, state) {
            context["field"] = "generatedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["generatedBy"] : null);
            state['generatedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeId: function(val, state) {
            context["field"] = "payeeId";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
            state['payeeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchMaxAmount: function(val, state) {
            context["field"] = "searchMaxAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["searchMaxAmount"] : null);
            state['searchMaxAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        order: function(val, state) {
            context["field"] = "order";
            context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
            state['order'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Auth_Token: function(val, state) {
            context["field"] = "Auth_Token";
            context["metadata"] = (objectMetadata ? objectMetadata["Auth_Token"] : null);
            state['Auth_Token'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileType: function(val, state) {
            context["field"] = "fileType";
            context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
            state['fileType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        installmentType: function(val, state) {
            context["field"] = "installmentType";
            context["metadata"] = (objectMetadata ? objectMetadata["installmentType"] : null);
            state['installmentType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contentType: function(val, state) {
            context["field"] = "contentType";
            context["metadata"] = (objectMetadata ? objectMetadata["contentType"] : null);
            state['contentType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pdf: function(val, state) {
            context["field"] = "pdf";
            context["metadata"] = (objectMetadata ? objectMetadata["pdf"] : null);
            state['pdf'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionDetails: function(val, state) {
            context["field"] = "transactionDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionDetails"] : null);
            state['transactionDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function DownloadTransactions(defaultValues) {
        var privateState = {};
        context["field"] = "checkNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["checkNumber"] : null);
        privateState.checkNumber = defaultValues ?
            (defaultValues["checkNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkNumber"], context) :
                null) :
            null;

        context["field"] = "lastRecordNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["lastRecordNumber"] : null);
        privateState.lastRecordNumber = defaultValues ?
            (defaultValues["lastRecordNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastRecordNumber"], context) :
                null) :
            null;

        context["field"] = "searchType";
        context["metadata"] = (objectMetadata ? objectMetadata["searchType"] : null);
        privateState.searchType = defaultValues ?
            (defaultValues["searchType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchType"], context) :
                null) :
            null;

        context["field"] = "searchEndDate";
        context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
        privateState.searchEndDate = defaultValues ?
            (defaultValues["searchEndDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchEndDate"], context) :
                null) :
            null;

        context["field"] = "fromCheckNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["fromCheckNumber"] : null);
        privateState.fromCheckNumber = defaultValues ?
            (defaultValues["fromCheckNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromCheckNumber"], context) :
                null) :
            null;

        context["field"] = "filters";
        context["metadata"] = (objectMetadata ? objectMetadata["filters"] : null);
        privateState.filters = defaultValues ?
            (defaultValues["filters"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["filters"], context) :
                null) :
            null;

        context["field"] = "searchDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["searchDescription"] : null);
        privateState.searchDescription = defaultValues ?
            (defaultValues["searchDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchDescription"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "title";
        context["metadata"] = (objectMetadata ? objectMetadata["title"] : null);
        privateState.title = defaultValues ?
            (defaultValues["title"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["title"], context) :
                null) :
            null;

        context["field"] = "transactionId";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
        privateState.transactionId = defaultValues ?
            (defaultValues["transactionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionId"], context) :
                null) :
            null;

        context["field"] = "transactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
        privateState.transactionType = defaultValues ?
            (defaultValues["transactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionType"], context) :
                null) :
            null;

        context["field"] = "searchAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["searchAmount"] : null);
        privateState.searchAmount = defaultValues ?
            (defaultValues["searchAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchAmount"], context) :
                null) :
            null;

        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
                null) :
            null;

        context["field"] = "searchStartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
        privateState.searchStartDate = defaultValues ?
            (defaultValues["searchStartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchStartDate"], context) :
                null) :
            null;

        context["field"] = "searchDateRange";
        context["metadata"] = (objectMetadata ? objectMetadata["searchDateRange"] : null);
        privateState.searchDateRange = defaultValues ?
            (defaultValues["searchDateRange"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchDateRange"], context) :
                null) :
            null;

        context["field"] = "searchTransactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["searchTransactionType"] : null);
        privateState.searchTransactionType = defaultValues ?
            (defaultValues["searchTransactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchTransactionType"], context) :
                null) :
            null;

        context["field"] = "searchMinAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["searchMinAmount"] : null);
        privateState.searchMinAmount = defaultValues ?
            (defaultValues["searchMinAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchMinAmount"], context) :
                null) :
            null;

        context["field"] = "firstRecordNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["firstRecordNumber"] : null);
        privateState.firstRecordNumber = defaultValues ?
            (defaultValues["firstRecordNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["firstRecordNumber"], context) :
                null) :
            null;

        context["field"] = "toCheckNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["toCheckNumber"] : null);
        privateState.toCheckNumber = defaultValues ?
            (defaultValues["toCheckNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toCheckNumber"], context) :
                null) :
            null;

        context["field"] = "sortBy";
        context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
        privateState.sortBy = defaultValues ?
            (defaultValues["sortBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortBy"], context) :
                null) :
            null;

        context["field"] = "generatedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["generatedBy"] : null);
        privateState.generatedBy = defaultValues ?
            (defaultValues["generatedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["generatedBy"], context) :
                null) :
            null;

        context["field"] = "payeeId";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
        privateState.payeeId = defaultValues ?
            (defaultValues["payeeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeId"], context) :
                null) :
            null;

        context["field"] = "searchMaxAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["searchMaxAmount"] : null);
        privateState.searchMaxAmount = defaultValues ?
            (defaultValues["searchMaxAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchMaxAmount"], context) :
                null) :
            null;

        context["field"] = "order";
        context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
        privateState.order = defaultValues ?
            (defaultValues["order"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["order"], context) :
                null) :
            null;

        context["field"] = "Auth_Token";
        context["metadata"] = (objectMetadata ? objectMetadata["Auth_Token"] : null);
        privateState.Auth_Token = defaultValues ?
            (defaultValues["Auth_Token"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Auth_Token"], context) :
                null) :
            null;

        context["field"] = "fileType";
        context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
        privateState.fileType = defaultValues ?
            (defaultValues["fileType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileType"], context) :
                null) :
            null;

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
                null) :
            null;

        context["field"] = "installmentType";
        context["metadata"] = (objectMetadata ? objectMetadata["installmentType"] : null);
        privateState.installmentType = defaultValues ?
            (defaultValues["installmentType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["installmentType"], context) :
                null) :
            null;

        context["field"] = "contentType";
        context["metadata"] = (objectMetadata ? objectMetadata["contentType"] : null);
        privateState.contentType = defaultValues ?
            (defaultValues["contentType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contentType"], context) :
                null) :
            null;

        context["field"] = "pdf";
        context["metadata"] = (objectMetadata ? objectMetadata["pdf"] : null);
        privateState.pdf = defaultValues ?
            (defaultValues["pdf"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pdf"], context) :
                null) :
            null;

        context["field"] = "transactionDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionDetails"] : null);
        privateState.transactionDetails = defaultValues ?
            (defaultValues["transactionDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionDetails"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "checkNumber": {
                get: function() {
                    context["field"] = "checkNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["checkNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.checkNumber, context);
                },
                set: function(val) {
                    setterFunctions['checkNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastRecordNumber": {
                get: function() {
                    context["field"] = "lastRecordNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastRecordNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastRecordNumber, context);
                },
                set: function(val) {
                    setterFunctions['lastRecordNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchType": {
                get: function() {
                    context["field"] = "searchType";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchType, context);
                },
                set: function(val) {
                    setterFunctions['searchType'].call(this, val, privateState);
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
            "filters": {
                get: function() {
                    context["field"] = "filters";
                    context["metadata"] = (objectMetadata ? objectMetadata["filters"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.filters, context);
                },
                set: function(val) {
                    setterFunctions['filters'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchDescription": {
                get: function() {
                    context["field"] = "searchDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchDescription, context);
                },
                set: function(val) {
                    setterFunctions['searchDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountNumber": {
                get: function() {
                    context["field"] = "accountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountNumber, context);
                },
                set: function(val) {
                    setterFunctions['accountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "title": {
                get: function() {
                    context["field"] = "title";
                    context["metadata"] = (objectMetadata ? objectMetadata["title"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.title, context);
                },
                set: function(val) {
                    setterFunctions['title'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionId": {
                get: function() {
                    context["field"] = "transactionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionId, context);
                },
                set: function(val) {
                    setterFunctions['transactionId'].call(this, val, privateState);
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
            "searchAmount": {
                get: function() {
                    context["field"] = "searchAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchAmount, context);
                },
                set: function(val) {
                    setterFunctions['searchAmount'].call(this, val, privateState);
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
            "searchDateRange": {
                get: function() {
                    context["field"] = "searchDateRange";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchDateRange"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchDateRange, context);
                },
                set: function(val) {
                    setterFunctions['searchDateRange'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchTransactionType": {
                get: function() {
                    context["field"] = "searchTransactionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchTransactionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchTransactionType, context);
                },
                set: function(val) {
                    setterFunctions['searchTransactionType'].call(this, val, privateState);
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
            "firstRecordNumber": {
                get: function() {
                    context["field"] = "firstRecordNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["firstRecordNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.firstRecordNumber, context);
                },
                set: function(val) {
                    setterFunctions['firstRecordNumber'].call(this, val, privateState);
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
            "sortBy": {
                get: function() {
                    context["field"] = "sortBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortBy, context);
                },
                set: function(val) {
                    setterFunctions['sortBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "generatedBy": {
                get: function() {
                    context["field"] = "generatedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["generatedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.generatedBy, context);
                },
                set: function(val) {
                    setterFunctions['generatedBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payeeId": {
                get: function() {
                    context["field"] = "payeeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeId, context);
                },
                set: function(val) {
                    setterFunctions['payeeId'].call(this, val, privateState);
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
            "Auth_Token": {
                get: function() {
                    context["field"] = "Auth_Token";
                    context["metadata"] = (objectMetadata ? objectMetadata["Auth_Token"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Auth_Token, context);
                },
                set: function(val) {
                    setterFunctions['Auth_Token'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "installmentType": {
                get: function() {
                    context["field"] = "installmentType";
                    context["metadata"] = (objectMetadata ? objectMetadata["installmentType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.installmentType, context);
                },
                set: function(val) {
                    setterFunctions['installmentType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contentType": {
                get: function() {
                    context["field"] = "contentType";
                    context["metadata"] = (objectMetadata ? objectMetadata["contentType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contentType, context);
                },
                set: function(val) {
                    setterFunctions['contentType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pdf": {
                get: function() {
                    context["field"] = "pdf";
                    context["metadata"] = (objectMetadata ? objectMetadata["pdf"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pdf, context);
                },
                set: function(val) {
                    setterFunctions['pdf'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionDetails": {
                get: function() {
                    context["field"] = "transactionDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionDetails, context);
                },
                set: function(val) {
                    setterFunctions['transactionDetails'].call(this, val, privateState);
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
            privateState.checkNumber = value ? (value["checkNumber"] ? value["checkNumber"] : null) : null;
            privateState.lastRecordNumber = value ? (value["lastRecordNumber"] ? value["lastRecordNumber"] : null) : null;
            privateState.searchType = value ? (value["searchType"] ? value["searchType"] : null) : null;
            privateState.searchEndDate = value ? (value["searchEndDate"] ? value["searchEndDate"] : null) : null;
            privateState.fromCheckNumber = value ? (value["fromCheckNumber"] ? value["fromCheckNumber"] : null) : null;
            privateState.filters = value ? (value["filters"] ? value["filters"] : null) : null;
            privateState.searchDescription = value ? (value["searchDescription"] ? value["searchDescription"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.title = value ? (value["title"] ? value["title"] : null) : null;
            privateState.transactionId = value ? (value["transactionId"] ? value["transactionId"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.searchAmount = value ? (value["searchAmount"] ? value["searchAmount"] : null) : null;
            privateState.accountID = value ? (value["accountID"] ? value["accountID"] : null) : null;
            privateState.searchStartDate = value ? (value["searchStartDate"] ? value["searchStartDate"] : null) : null;
            privateState.searchDateRange = value ? (value["searchDateRange"] ? value["searchDateRange"] : null) : null;
            privateState.searchTransactionType = value ? (value["searchTransactionType"] ? value["searchTransactionType"] : null) : null;
            privateState.searchMinAmount = value ? (value["searchMinAmount"] ? value["searchMinAmount"] : null) : null;
            privateState.firstRecordNumber = value ? (value["firstRecordNumber"] ? value["firstRecordNumber"] : null) : null;
            privateState.toCheckNumber = value ? (value["toCheckNumber"] ? value["toCheckNumber"] : null) : null;
            privateState.sortBy = value ? (value["sortBy"] ? value["sortBy"] : null) : null;
            privateState.generatedBy = value ? (value["generatedBy"] ? value["generatedBy"] : null) : null;
            privateState.payeeId = value ? (value["payeeId"] ? value["payeeId"] : null) : null;
            privateState.searchMaxAmount = value ? (value["searchMaxAmount"] ? value["searchMaxAmount"] : null) : null;
            privateState.order = value ? (value["order"] ? value["order"] : null) : null;
            privateState.Auth_Token = value ? (value["Auth_Token"] ? value["Auth_Token"] : null) : null;
            privateState.fileType = value ? (value["fileType"] ? value["fileType"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
            privateState.installmentType = value ? (value["installmentType"] ? value["installmentType"] : null) : null;
            privateState.contentType = value ? (value["contentType"] ? value["contentType"] : null) : null;
            privateState.pdf = value ? (value["pdf"] ? value["pdf"] : null) : null;
            privateState.transactionDetails = value ? (value["transactionDetails"] ? value["transactionDetails"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(DownloadTransactions);

    //Create new class level validator object
    BaseModel.Validator.call(DownloadTransactions);

    var registerValidatorBackup = DownloadTransactions.registerValidator;

    DownloadTransactions.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(DownloadTransactions.isValid(this, propName, val)) {
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
    //For Operation 'GenerateTransactionReport' with service id 'GenerateTransactionPDF3391'
     DownloadTransactions.GenerateTransactionReport = function(params, onCompletion){
        return DownloadTransactions.customVerb('GenerateTransactionReport', params, onCompletion);
     };

    //For Operation 'generate' with service id 'GenerateTransactionsDetails9283'
     DownloadTransactions.generate = function(params, onCompletion){
        return DownloadTransactions.customVerb('generate', params, onCompletion);
     };

    var relations = [];

    DownloadTransactions.relations = relations;

    DownloadTransactions.prototype.isValid = function() {
        return DownloadTransactions.isValid(this);
    };

    DownloadTransactions.prototype.objModelName = "DownloadTransactions";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    DownloadTransactions.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("DocumentManagement", "DownloadTransactions", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    DownloadTransactions.clone = function(objectToClone) {
        var clonedObj = new DownloadTransactions();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return DownloadTransactions;
});