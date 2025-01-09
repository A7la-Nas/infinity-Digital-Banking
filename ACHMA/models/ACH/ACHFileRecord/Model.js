/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ACHFileRecord", "objectService" : "ACH"};

    var setterFunctions = {
        achFileId: function(val, state) {
            context["field"] = "achFileId";
            context["metadata"] = (objectMetadata ? objectMetadata["achFileId"] : null);
            state['achFileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        achFileRecordId: function(val, state) {
            context["field"] = "achFileRecordId";
            context["metadata"] = (objectMetadata ? objectMetadata["achFileRecordId"] : null);
            state['achFileRecordId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        offsetAccountNumber: function(val, state) {
            context["field"] = "offsetAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["offsetAccountNumber"] : null);
            state['offsetAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        offsetAmount: function(val, state) {
            context["field"] = "offsetAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["offsetAmount"] : null);
            state['offsetAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        offsetTransactionType: function(val, state) {
            context["field"] = "offsetTransactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["offsetTransactionType"] : null);
            state['offsetTransactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        effectiveDate: function(val, state) {
            context["field"] = "effectiveDate";
            context["metadata"] = (objectMetadata ? objectMetadata["effectiveDate"] : null);
            state['effectiveDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestType: function(val, state) {
            context["field"] = "requestType";
            context["metadata"] = (objectMetadata ? objectMetadata["requestType"] : null);
            state['requestType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalCreditAmount: function(val, state) {
            context["field"] = "totalCreditAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalCreditAmount"] : null);
            state['totalCreditAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalDebitAmount: function(val, state) {
            context["field"] = "totalDebitAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalDebitAmount"] : null);
            state['totalDebitAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionType: function(val, state) {
            context["field"] = "transactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
            state['transactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ACHFileRecord(defaultValues) {
        var privateState = {};
        context["field"] = "achFileId";
        context["metadata"] = (objectMetadata ? objectMetadata["achFileId"] : null);
        privateState.achFileId = defaultValues ?
            (defaultValues["achFileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["achFileId"], context) :
                null) :
            null;

        context["field"] = "achFileRecordId";
        context["metadata"] = (objectMetadata ? objectMetadata["achFileRecordId"] : null);
        privateState.achFileRecordId = defaultValues ?
            (defaultValues["achFileRecordId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["achFileRecordId"], context) :
                null) :
            null;

        context["field"] = "offsetAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["offsetAccountNumber"] : null);
        privateState.offsetAccountNumber = defaultValues ?
            (defaultValues["offsetAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["offsetAccountNumber"], context) :
                null) :
            null;

        context["field"] = "offsetAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["offsetAmount"] : null);
        privateState.offsetAmount = defaultValues ?
            (defaultValues["offsetAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["offsetAmount"], context) :
                null) :
            null;

        context["field"] = "offsetTransactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["offsetTransactionType"] : null);
        privateState.offsetTransactionType = defaultValues ?
            (defaultValues["offsetTransactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["offsetTransactionType"], context) :
                null) :
            null;

        context["field"] = "effectiveDate";
        context["metadata"] = (objectMetadata ? objectMetadata["effectiveDate"] : null);
        privateState.effectiveDate = defaultValues ?
            (defaultValues["effectiveDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["effectiveDate"], context) :
                null) :
            null;

        context["field"] = "requestType";
        context["metadata"] = (objectMetadata ? objectMetadata["requestType"] : null);
        privateState.requestType = defaultValues ?
            (defaultValues["requestType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestType"], context) :
                null) :
            null;

        context["field"] = "totalCreditAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalCreditAmount"] : null);
        privateState.totalCreditAmount = defaultValues ?
            (defaultValues["totalCreditAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalCreditAmount"], context) :
                null) :
            null;

        context["field"] = "totalDebitAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalDebitAmount"] : null);
        privateState.totalDebitAmount = defaultValues ?
            (defaultValues["totalDebitAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalDebitAmount"], context) :
                null) :
            null;

        context["field"] = "transactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
        privateState.transactionType = defaultValues ?
            (defaultValues["transactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionType"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "achFileId": {
                get: function() {
                    context["field"] = "achFileId";
                    context["metadata"] = (objectMetadata ? objectMetadata["achFileId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.achFileId, context);
                },
                set: function(val) {
                    setterFunctions['achFileId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "achFileRecordId": {
                get: function() {
                    context["field"] = "achFileRecordId";
                    context["metadata"] = (objectMetadata ? objectMetadata["achFileRecordId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.achFileRecordId, context);
                },
                set: function(val) {
                    setterFunctions['achFileRecordId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "offsetAccountNumber": {
                get: function() {
                    context["field"] = "offsetAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["offsetAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.offsetAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['offsetAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "offsetAmount": {
                get: function() {
                    context["field"] = "offsetAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["offsetAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.offsetAmount, context);
                },
                set: function(val) {
                    setterFunctions['offsetAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "offsetTransactionType": {
                get: function() {
                    context["field"] = "offsetTransactionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["offsetTransactionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.offsetTransactionType, context);
                },
                set: function(val) {
                    setterFunctions['offsetTransactionType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "effectiveDate": {
                get: function() {
                    context["field"] = "effectiveDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["effectiveDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.effectiveDate, context);
                },
                set: function(val) {
                    setterFunctions['effectiveDate'].call(this, val, privateState);
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
            "totalCreditAmount": {
                get: function() {
                    context["field"] = "totalCreditAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalCreditAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalCreditAmount, context);
                },
                set: function(val) {
                    setterFunctions['totalCreditAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalDebitAmount": {
                get: function() {
                    context["field"] = "totalDebitAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalDebitAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalDebitAmount, context);
                },
                set: function(val) {
                    setterFunctions['totalDebitAmount'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.achFileId = value ? (value["achFileId"] ? value["achFileId"] : null) : null;
            privateState.achFileRecordId = value ? (value["achFileRecordId"] ? value["achFileRecordId"] : null) : null;
            privateState.offsetAccountNumber = value ? (value["offsetAccountNumber"] ? value["offsetAccountNumber"] : null) : null;
            privateState.offsetAmount = value ? (value["offsetAmount"] ? value["offsetAmount"] : null) : null;
            privateState.offsetTransactionType = value ? (value["offsetTransactionType"] ? value["offsetTransactionType"] : null) : null;
            privateState.effectiveDate = value ? (value["effectiveDate"] ? value["effectiveDate"] : null) : null;
            privateState.requestType = value ? (value["requestType"] ? value["requestType"] : null) : null;
            privateState.totalCreditAmount = value ? (value["totalCreditAmount"] ? value["totalCreditAmount"] : null) : null;
            privateState.totalDebitAmount = value ? (value["totalDebitAmount"] ? value["totalDebitAmount"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ACHFileRecord);

    //Create new class level validator object
    BaseModel.Validator.call(ACHFileRecord);

    var registerValidatorBackup = ACHFileRecord.registerValidator;

    ACHFileRecord.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ACHFileRecord.isValid(this, propName, val)) {
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
    //For Operation 'fetchACHFileRecords' with service id 'FetchACHFileRecords4521'
     ACHFileRecord.fetchACHFileRecords = function(params, onCompletion){
        return ACHFileRecord.customVerb('fetchACHFileRecords', params, onCompletion);
     };

    var relations = [];

    ACHFileRecord.relations = relations;

    ACHFileRecord.prototype.isValid = function() {
        return ACHFileRecord.isValid(this);
    };

    ACHFileRecord.prototype.objModelName = "ACHFileRecord";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ACHFileRecord.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ACH", "ACHFileRecord", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ACHFileRecord.clone = function(objectToClone) {
        var clonedObj = new ACHFileRecord();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ACHFileRecord;
});