/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PaymentAllocations", "objectService" : "TradeSupplyFinance"};

    var setterFunctions = {
        paymentAllocationId: function(val, state) {
            context["field"] = "paymentAllocationId";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentAllocationId"] : null);
            state['paymentAllocationId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryId: function(val, state) {
            context["field"] = "beneficiaryId";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryId"] : null);
            state['beneficiaryId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdDate: function(val, state) {
            context["field"] = "createdDate";
            context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
            state['createdDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fundingDocuments: function(val, state) {
            context["field"] = "fundingDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["fundingDocuments"] : null);
            state['fundingDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        originalAmount: function(val, state) {
            context["field"] = "originalAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["originalAmount"] : null);
            state['originalAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        receiptAmount: function(val, state) {
            context["field"] = "receiptAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["receiptAmount"] : null);
            state['receiptAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        senderId: function(val, state) {
            context["field"] = "senderId";
            context["metadata"] = (objectMetadata ? objectMetadata["senderId"] : null);
            state['senderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        senderName: function(val, state) {
            context["field"] = "senderName";
            context["metadata"] = (objectMetadata ? objectMetadata["senderName"] : null);
            state['senderName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        PaymentAllocations: function(val, state) {
            context["field"] = "PaymentAllocations";
            context["metadata"] = (objectMetadata ? objectMetadata["PaymentAllocations"] : null);
            state['PaymentAllocations'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionId: function(val, state) {
            context["field"] = "transactionId";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
            state['transactionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        updatedDate: function(val, state) {
            context["field"] = "updatedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
            state['updatedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadedFrom: function(val, state) {
            context["field"] = "uploadedFrom";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedFrom"] : null);
            state['uploadedFrom'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadedBy: function(val, state) {
            context["field"] = "uploadedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedBy"] : null);
            state['uploadedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        valueDate: function(val, state) {
            context["field"] = "valueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["valueDate"] : null);
            state['valueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    };

    //Create the Model Class
    function PaymentAllocations(defaultValues) {
        var privateState = {};
        context["field"] = "paymentAllocationId";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentAllocationId"] : null);
        privateState.paymentAllocationId = defaultValues ?
            (defaultValues["paymentAllocationId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentAllocationId"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "beneficiaryId";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryId"] : null);
        privateState.beneficiaryId = defaultValues ?
            (defaultValues["beneficiaryId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryId"], context) :
                null) :
            null;

        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
                null) :
            null;

        context["field"] = "createdDate";
        context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
        privateState.createdDate = defaultValues ?
            (defaultValues["createdDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdDate"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "fundingDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["fundingDocuments"] : null);
        privateState.fundingDocuments = defaultValues ?
            (defaultValues["fundingDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fundingDocuments"], context) :
                null) :
            null;

        context["field"] = "originalAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["originalAmount"] : null);
        privateState.originalAmount = defaultValues ?
            (defaultValues["originalAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["originalAmount"], context) :
                null) :
            null;

        context["field"] = "receiptAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["receiptAmount"] : null);
        privateState.receiptAmount = defaultValues ?
            (defaultValues["receiptAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["receiptAmount"], context) :
                null) :
            null;

        context["field"] = "senderId";
        context["metadata"] = (objectMetadata ? objectMetadata["senderId"] : null);
        privateState.senderId = defaultValues ?
            (defaultValues["senderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["senderId"], context) :
                null) :
            null;

        context["field"] = "senderName";
        context["metadata"] = (objectMetadata ? objectMetadata["senderName"] : null);
        privateState.senderName = defaultValues ?
            (defaultValues["senderName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["senderName"], context) :
                null) :
            null;

        context["field"] = "PaymentAllocations";
        context["metadata"] = (objectMetadata ? objectMetadata["PaymentAllocations"] : null);
        privateState.PaymentAllocations = defaultValues ?
            (defaultValues["PaymentAllocations"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["PaymentAllocations"], context) :
                null) :
            null;

        context["field"] = "transactionId";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
        privateState.transactionId = defaultValues ?
            (defaultValues["transactionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionId"], context) :
                null) :
            null;

        context["field"] = "updatedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
        privateState.updatedDate = defaultValues ?
            (defaultValues["updatedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["updatedDate"], context) :
                null) :
            null;

        context["field"] = "uploadedFrom";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedFrom"] : null);
        privateState.uploadedFrom = defaultValues ?
            (defaultValues["uploadedFrom"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedFrom"], context) :
                null) :
            null;

        context["field"] = "uploadedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedBy"] : null);
        privateState.uploadedBy = defaultValues ?
            (defaultValues["uploadedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedBy"], context) :
                null) :
            null;

        context["field"] = "valueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["valueDate"] : null);
        privateState.valueDate = defaultValues ?
            (defaultValues["valueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["valueDate"], context) :
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


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "paymentAllocationId": {
                get: function() {
                    context["field"] = "paymentAllocationId";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentAllocationId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentAllocationId, context);
                },
                set: function(val) {
                    setterFunctions['paymentAllocationId'].call(this, val, privateState);
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
            "beneficiaryId": {
                get: function() {
                    context["field"] = "beneficiaryId";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryId, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryName": {
                get: function() {
                    context["field"] = "beneficiaryName";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryName, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdDate": {
                get: function() {
                    context["field"] = "createdDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdDate, context);
                },
                set: function(val) {
                    setterFunctions['createdDate'].call(this, val, privateState);
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
            "fundingDocuments": {
                get: function() {
                    context["field"] = "fundingDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["fundingDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fundingDocuments, context);
                },
                set: function(val) {
                    setterFunctions['fundingDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "originalAmount": {
                get: function() {
                    context["field"] = "originalAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["originalAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.originalAmount, context);
                },
                set: function(val) {
                    setterFunctions['originalAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "receiptAmount": {
                get: function() {
                    context["field"] = "receiptAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["receiptAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.receiptAmount, context);
                },
                set: function(val) {
                    setterFunctions['receiptAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "senderId": {
                get: function() {
                    context["field"] = "senderId";
                    context["metadata"] = (objectMetadata ? objectMetadata["senderId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.senderId, context);
                },
                set: function(val) {
                    setterFunctions['senderId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "senderName": {
                get: function() {
                    context["field"] = "senderName";
                    context["metadata"] = (objectMetadata ? objectMetadata["senderName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.senderName, context);
                },
                set: function(val) {
                    setterFunctions['senderName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "PaymentAllocations": {
                get: function() {
                    context["field"] = "PaymentAllocations";
                    context["metadata"] = (objectMetadata ? objectMetadata["PaymentAllocations"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.PaymentAllocations, context);
                },
                set: function(val) {
                    setterFunctions['PaymentAllocations'].call(this, val, privateState);
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
            "updatedDate": {
                get: function() {
                    context["field"] = "updatedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.updatedDate, context);
                },
                set: function(val) {
                    setterFunctions['updatedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "uploadedFrom": {
                get: function() {
                    context["field"] = "uploadedFrom";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadedFrom"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadedFrom, context);
                },
                set: function(val) {
                    setterFunctions['uploadedFrom'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "uploadedBy": {
                get: function() {
                    context["field"] = "uploadedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadedBy, context);
                },
                set: function(val) {
                    setterFunctions['uploadedBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "valueDate": {
                get: function() {
                    context["field"] = "valueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["valueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.valueDate, context);
                },
                set: function(val) {
                    setterFunctions['valueDate'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.paymentAllocationId = value ? (value["paymentAllocationId"] ? value["paymentAllocationId"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.beneficiaryId = value ? (value["beneficiaryId"] ? value["beneficiaryId"] : null) : null;
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.createdDate = value ? (value["createdDate"] ? value["createdDate"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.fundingDocuments = value ? (value["fundingDocuments"] ? value["fundingDocuments"] : null) : null;
            privateState.originalAmount = value ? (value["originalAmount"] ? value["originalAmount"] : null) : null;
            privateState.receiptAmount = value ? (value["receiptAmount"] ? value["receiptAmount"] : null) : null;
            privateState.senderId = value ? (value["senderId"] ? value["senderId"] : null) : null;
            privateState.senderName = value ? (value["senderName"] ? value["senderName"] : null) : null;
            privateState.PaymentAllocations = value ? (value["PaymentAllocations"] ? value["PaymentAllocations"] : null) : null;
            privateState.transactionId = value ? (value["transactionId"] ? value["transactionId"] : null) : null;
            privateState.updatedDate = value ? (value["updatedDate"] ? value["updatedDate"] : null) : null;
            privateState.uploadedFrom = value ? (value["uploadedFrom"] ? value["uploadedFrom"] : null) : null;
            privateState.uploadedBy = value ? (value["uploadedBy"] ? value["uploadedBy"] : null) : null;
            privateState.valueDate = value ? (value["valueDate"] ? value["valueDate"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PaymentAllocations);

    //Create new class level validator object
    BaseModel.Validator.call(PaymentAllocations);

    var registerValidatorBackup = PaymentAllocations.registerValidator;

    PaymentAllocations.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PaymentAllocations.isValid(this, propName, val)) {
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
    //For Operation 'requestDocumentation' with service id 'RequestPaymentAllocationDocumentsOperation1299'
     PaymentAllocations.requestDocumentation = function(params, onCompletion){
        return PaymentAllocations.customVerb('requestDocumentation', params, onCompletion);
     };

    //For Operation 'submitDocumentation' with service id 'SubmitPaymentAllocationDocumentsOperation9139'
     PaymentAllocations.submitDocumentation = function(params, onCompletion){
        return PaymentAllocations.customVerb('submitDocumentation', params, onCompletion);
     };

    //For Operation 'getPaymentAllocations' with service id 'GetPaymentAllocationsOperation3619'
     PaymentAllocations.getPaymentAllocations = function(params, onCompletion){
        return PaymentAllocations.customVerb('getPaymentAllocations', params, onCompletion);
     };

    var relations = [];

    PaymentAllocations.relations = relations;

    PaymentAllocations.prototype.isValid = function() {
        return PaymentAllocations.isValid(this);
    };

    PaymentAllocations.prototype.objModelName = "PaymentAllocations";
    PaymentAllocations.prototype.objServiceName = "TradeSupplyFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PaymentAllocations.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeSupplyFinance", "PaymentAllocations", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PaymentAllocations.clone = function(objectToClone) {
        var clonedObj = new PaymentAllocations();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PaymentAllocations;
});