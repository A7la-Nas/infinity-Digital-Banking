/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PaymentOrder", "objectService" : "BulkPaymentObjects"};

    var setterFunctions = {
        recordId: function(val, state) {
            context["field"] = "recordId";
            context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
            state['recordId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientName: function(val, state) {
            context["field"] = "recipientName";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientName"] : null);
            state['recipientName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swift: function(val, state) {
            context["field"] = "swift";
            context["metadata"] = (objectMetadata ? objectMetadata["swift"] : null);
            state['swift'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        feesPaidBy: function(val, state) {
            context["field"] = "feesPaidBy";
            context["metadata"] = (objectMetadata ? objectMetadata["feesPaidBy"] : null);
            state['feesPaidBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentReference: function(val, state) {
            context["field"] = "paymentReference";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentReference"] : null);
            state['paymentReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentOrderId: function(val, state) {
            context["field"] = "paymentOrderId";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderId"] : null);
            state['paymentOrderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        confirmationNumber: function(val, state) {
            context["field"] = "confirmationNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
            state['confirmationNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        opstatus: function(val, state) {
            context["field"] = "opstatus";
            context["metadata"] = (objectMetadata ? objectMetadata["opstatus"] : null);
            state['opstatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        httpStatusCode: function(val, state) {
            context["field"] = "httpStatusCode";
            context["metadata"] = (objectMetadata ? objectMetadata["httpStatusCode"] : null);
            state['httpStatusCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentMethod: function(val, state) {
            context["field"] = "paymentMethod";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentMethod"] : null);
            state['paymentMethod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accType: function(val, state) {
            context["field"] = "accType";
            context["metadata"] = (objectMetadata ? objectMetadata["accType"] : null);
            state['accType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        searchString: function(val, state) {
            context["field"] = "searchString";
            context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
            state['searchString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageSize: function(val, state) {
            context["field"] = "pageSize";
            context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
            state['pageSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageOffset: function(val, state) {
            context["field"] = "pageOffset";
            context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
            state['pageOffset'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        filterByParam: function(val, state) {
            context["field"] = "filterByParam";
            context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
            state['filterByParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        filterByValue: function(val, state) {
            context["field"] = "filterByValue";
            context["metadata"] = (objectMetadata ? objectMetadata["filterByValue"] : null);
            state['filterByValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentOrderProduct: function(val, state) {
            context["field"] = "paymentOrderProduct";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderProduct"] : null);
            state['paymentOrderProduct'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorDescription: function(val, state) {
            context["field"] = "errorDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["errorDescription"] : null);
            state['errorDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PaymentOrder(defaultValues) {
        var privateState = {};
        context["field"] = "recordId";
        context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
        privateState.recordId = defaultValues ?
            (defaultValues["recordId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recordId"], context) :
                null) :
            null;

        context["field"] = "recipientName";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientName"] : null);
        privateState.recipientName = defaultValues ?
            (defaultValues["recipientName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientName"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "swift";
        context["metadata"] = (objectMetadata ? objectMetadata["swift"] : null);
        privateState.swift = defaultValues ?
            (defaultValues["swift"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swift"], context) :
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

        context["field"] = "feesPaidBy";
        context["metadata"] = (objectMetadata ? objectMetadata["feesPaidBy"] : null);
        privateState.feesPaidBy = defaultValues ?
            (defaultValues["feesPaidBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["feesPaidBy"], context) :
                null) :
            null;

        context["field"] = "paymentReference";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentReference"] : null);
        privateState.paymentReference = defaultValues ?
            (defaultValues["paymentReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentReference"], context) :
                null) :
            null;

        context["field"] = "paymentOrderId";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderId"] : null);
        privateState.paymentOrderId = defaultValues ?
            (defaultValues["paymentOrderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentOrderId"], context) :
                null) :
            null;

        context["field"] = "confirmationNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
        privateState.confirmationNumber = defaultValues ?
            (defaultValues["confirmationNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["confirmationNumber"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "opstatus";
        context["metadata"] = (objectMetadata ? objectMetadata["opstatus"] : null);
        privateState.opstatus = defaultValues ?
            (defaultValues["opstatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["opstatus"], context) :
                null) :
            null;

        context["field"] = "httpStatusCode";
        context["metadata"] = (objectMetadata ? objectMetadata["httpStatusCode"] : null);
        privateState.httpStatusCode = defaultValues ?
            (defaultValues["httpStatusCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["httpStatusCode"], context) :
                null) :
            null;

        context["field"] = "paymentMethod";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentMethod"] : null);
        privateState.paymentMethod = defaultValues ?
            (defaultValues["paymentMethod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentMethod"], context) :
                null) :
            null;

        context["field"] = "accType";
        context["metadata"] = (objectMetadata ? objectMetadata["accType"] : null);
        privateState.accType = defaultValues ?
            (defaultValues["accType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accType"], context) :
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

        context["field"] = "searchString";
        context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
        privateState.searchString = defaultValues ?
            (defaultValues["searchString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchString"], context) :
                null) :
            null;

        context["field"] = "pageSize";
        context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
        privateState.pageSize = defaultValues ?
            (defaultValues["pageSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageSize"], context) :
                null) :
            null;

        context["field"] = "pageOffset";
        context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
        privateState.pageOffset = defaultValues ?
            (defaultValues["pageOffset"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageOffset"], context) :
                null) :
            null;

        context["field"] = "filterByParam";
        context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
        privateState.filterByParam = defaultValues ?
            (defaultValues["filterByParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["filterByParam"], context) :
                null) :
            null;

        context["field"] = "filterByValue";
        context["metadata"] = (objectMetadata ? objectMetadata["filterByValue"] : null);
        privateState.filterByValue = defaultValues ?
            (defaultValues["filterByValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["filterByValue"], context) :
                null) :
            null;

        context["field"] = "paymentOrderProduct";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderProduct"] : null);
        privateState.paymentOrderProduct = defaultValues ?
            (defaultValues["paymentOrderProduct"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentOrderProduct"], context) :
                null) :
            null;

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "errorDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["errorDescription"] : null);
        privateState.errorDescription = defaultValues ?
            (defaultValues["errorDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorDescription"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "recordId": {
                get: function() {
                    context["field"] = "recordId";
                    context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recordId, context);
                },
                set: function(val) {
                    setterFunctions['recordId'].call(this, val, privateState);
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
            "bankName": {
                get: function() {
                    context["field"] = "bankName";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankName, context);
                },
                set: function(val) {
                    setterFunctions['bankName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "swift": {
                get: function() {
                    context["field"] = "swift";
                    context["metadata"] = (objectMetadata ? objectMetadata["swift"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swift, context);
                },
                set: function(val) {
                    setterFunctions['swift'].call(this, val, privateState);
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
            "feesPaidBy": {
                get: function() {
                    context["field"] = "feesPaidBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["feesPaidBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.feesPaidBy, context);
                },
                set: function(val) {
                    setterFunctions['feesPaidBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentReference": {
                get: function() {
                    context["field"] = "paymentReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentReference, context);
                },
                set: function(val) {
                    setterFunctions['paymentReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentOrderId": {
                get: function() {
                    context["field"] = "paymentOrderId";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentOrderId, context);
                },
                set: function(val) {
                    setterFunctions['paymentOrderId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "confirmationNumber": {
                get: function() {
                    context["field"] = "confirmationNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.confirmationNumber, context);
                },
                set: function(val) {
                    setterFunctions['confirmationNumber'].call(this, val, privateState);
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
            "opstatus": {
                get: function() {
                    context["field"] = "opstatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["opstatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.opstatus, context);
                },
                set: function(val) {
                    setterFunctions['opstatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "httpStatusCode": {
                get: function() {
                    context["field"] = "httpStatusCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["httpStatusCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.httpStatusCode, context);
                },
                set: function(val) {
                    setterFunctions['httpStatusCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentMethod": {
                get: function() {
                    context["field"] = "paymentMethod";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentMethod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentMethod, context);
                },
                set: function(val) {
                    setterFunctions['paymentMethod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accType": {
                get: function() {
                    context["field"] = "accType";
                    context["metadata"] = (objectMetadata ? objectMetadata["accType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accType, context);
                },
                set: function(val) {
                    setterFunctions['accType'].call(this, val, privateState);
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
            "filterByParam": {
                get: function() {
                    context["field"] = "filterByParam";
                    context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.filterByParam, context);
                },
                set: function(val) {
                    setterFunctions['filterByParam'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "filterByValue": {
                get: function() {
                    context["field"] = "filterByValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["filterByValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.filterByValue, context);
                },
                set: function(val) {
                    setterFunctions['filterByValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentOrderProduct": {
                get: function() {
                    context["field"] = "paymentOrderProduct";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderProduct"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentOrderProduct, context);
                },
                set: function(val) {
                    setterFunctions['paymentOrderProduct'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentStatus": {
                get: function() {
                    context["field"] = "paymentStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentStatus, context);
                },
                set: function(val) {
                    setterFunctions['paymentStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errorDescription": {
                get: function() {
                    context["field"] = "errorDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorDescription, context);
                },
                set: function(val) {
                    setterFunctions['errorDescription'].call(this, val, privateState);
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
            privateState.recordId = value ? (value["recordId"] ? value["recordId"] : null) : null;
            privateState.recipientName = value ? (value["recipientName"] ? value["recipientName"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.swift = value ? (value["swift"] ? value["swift"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.feesPaidBy = value ? (value["feesPaidBy"] ? value["feesPaidBy"] : null) : null;
            privateState.paymentReference = value ? (value["paymentReference"] ? value["paymentReference"] : null) : null;
            privateState.paymentOrderId = value ? (value["paymentOrderId"] ? value["paymentOrderId"] : null) : null;
            privateState.confirmationNumber = value ? (value["confirmationNumber"] ? value["confirmationNumber"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.paymentMethod = value ? (value["paymentMethod"] ? value["paymentMethod"] : null) : null;
            privateState.accType = value ? (value["accType"] ? value["accType"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.filterByParam = value ? (value["filterByParam"] ? value["filterByParam"] : null) : null;
            privateState.filterByValue = value ? (value["filterByValue"] ? value["filterByValue"] : null) : null;
            privateState.paymentOrderProduct = value ? (value["paymentOrderProduct"] ? value["paymentOrderProduct"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.errorDescription = value ? (value["errorDescription"] ? value["errorDescription"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PaymentOrder);

    //Create new class level validator object
    BaseModel.Validator.call(PaymentOrder);

    var registerValidatorBackup = PaymentOrder.registerValidator;

    PaymentOrder.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PaymentOrder.isValid(this, propName, val)) {
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
    //For Operation 'editPaymentOrder' with service id 'editPaymentOrder9459'
     PaymentOrder.editPaymentOrder = function(params, onCompletion){
        return PaymentOrder.customVerb('editPaymentOrder', params, onCompletion);
     };

    //For Operation 'deletePaymentOrder' with service id 'deletePaymentOrder6828'
     PaymentOrder.deletePaymentOrder = function(params, onCompletion){
        return PaymentOrder.customVerb('deletePaymentOrder', params, onCompletion);
     };

    //For Operation 'addPaymentOrder' with service id 'addPaymentOrder8872'
     PaymentOrder.addPaymentOrder = function(params, onCompletion){
        return PaymentOrder.customVerb('addPaymentOrder', params, onCompletion);
     };

    //For Operation 'fetchPaymentOrders' with service id 'fetchPaymentOrders8855'
     PaymentOrder.fetchPaymentOrders = function(params, onCompletion){
        return PaymentOrder.customVerb('fetchPaymentOrders', params, onCompletion);
     };

    var relations = [];

    PaymentOrder.relations = relations;

    PaymentOrder.prototype.isValid = function() {
        return PaymentOrder.isValid(this);
    };

    PaymentOrder.prototype.objModelName = "PaymentOrder";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PaymentOrder.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BulkPaymentObjects", "PaymentOrder", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PaymentOrder.clone = function(objectToClone) {
        var clonedObj = new PaymentOrder();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PaymentOrder;
});