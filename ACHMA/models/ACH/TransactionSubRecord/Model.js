/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "TransactionSubRecord", "objectService" : "ACH"};

    var setterFunctions = {
        TranscationSubRecord_id: function(val, state) {
            context["field"] = "TranscationSubRecord_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TranscationSubRecord_id"] : null);
            state['TranscationSubRecord_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TransactionRecord_id: function(val, state) {
            context["field"] = "TransactionRecord_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TransactionRecord_id"] : null);
            state['TransactionRecord_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TaxSubCategory_id: function(val, state) {
            context["field"] = "TaxSubCategory_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TaxSubCategory_id"] : null);
            state['TaxSubCategory_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Amount: function(val, state) {
            context["field"] = "Amount";
            context["metadata"] = (objectMetadata ? objectMetadata["Amount"] : null);
            state['Amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softDelete: function(val, state) {
            context["field"] = "softDelete";
            context["metadata"] = (objectMetadata ? objectMetadata["softDelete"] : null);
            state['softDelete'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxSubType: function(val, state) {
            context["field"] = "taxSubType";
            context["metadata"] = (objectMetadata ? objectMetadata["taxSubType"] : null);
            state['taxSubType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        opstatus: function(val, state) {
            context["field"] = "opstatus";
            context["metadata"] = (objectMetadata ? objectMetadata["opstatus"] : null);
            state['opstatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        httpStatusCode: function(val, state) {
            context["field"] = "httpStatusCode";
            context["metadata"] = (objectMetadata ? objectMetadata["httpStatusCode"] : null);
            state['httpStatusCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function TransactionSubRecord(defaultValues) {
        var privateState = {};
        context["field"] = "TranscationSubRecord_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TranscationSubRecord_id"] : null);
        privateState.TranscationSubRecord_id = defaultValues ?
            (defaultValues["TranscationSubRecord_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TranscationSubRecord_id"], context) :
                null) :
            null;

        context["field"] = "TransactionRecord_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TransactionRecord_id"] : null);
        privateState.TransactionRecord_id = defaultValues ?
            (defaultValues["TransactionRecord_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransactionRecord_id"], context) :
                null) :
            null;

        context["field"] = "TaxSubCategory_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TaxSubCategory_id"] : null);
        privateState.TaxSubCategory_id = defaultValues ?
            (defaultValues["TaxSubCategory_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TaxSubCategory_id"], context) :
                null) :
            null;

        context["field"] = "Amount";
        context["metadata"] = (objectMetadata ? objectMetadata["Amount"] : null);
        privateState.Amount = defaultValues ?
            (defaultValues["Amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Amount"], context) :
                null) :
            null;

        context["field"] = "softDelete";
        context["metadata"] = (objectMetadata ? objectMetadata["softDelete"] : null);
        privateState.softDelete = defaultValues ?
            (defaultValues["softDelete"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softDelete"], context) :
                null) :
            null;

        context["field"] = "taxSubType";
        context["metadata"] = (objectMetadata ? objectMetadata["taxSubType"] : null);
        privateState.taxSubType = defaultValues ?
            (defaultValues["taxSubType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxSubType"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "opstatus";
        context["metadata"] = (objectMetadata ? objectMetadata["opstatus"] : null);
        privateState.opstatus = defaultValues ?
            (defaultValues["opstatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["opstatus"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "httpStatusCode";
        context["metadata"] = (objectMetadata ? objectMetadata["httpStatusCode"] : null);
        privateState.httpStatusCode = defaultValues ?
            (defaultValues["httpStatusCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["httpStatusCode"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "TranscationSubRecord_id": {
                get: function() {
                    context["field"] = "TranscationSubRecord_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TranscationSubRecord_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TranscationSubRecord_id, context);
                },
                set: function(val) {
                    setterFunctions['TranscationSubRecord_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TransactionRecord_id": {
                get: function() {
                    context["field"] = "TransactionRecord_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TransactionRecord_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TransactionRecord_id, context);
                },
                set: function(val) {
                    setterFunctions['TransactionRecord_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TaxSubCategory_id": {
                get: function() {
                    context["field"] = "TaxSubCategory_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TaxSubCategory_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TaxSubCategory_id, context);
                },
                set: function(val) {
                    setterFunctions['TaxSubCategory_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Amount": {
                get: function() {
                    context["field"] = "Amount";
                    context["metadata"] = (objectMetadata ? objectMetadata["Amount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Amount, context);
                },
                set: function(val) {
                    setterFunctions['Amount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "softDelete": {
                get: function() {
                    context["field"] = "softDelete";
                    context["metadata"] = (objectMetadata ? objectMetadata["softDelete"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.softDelete, context);
                },
                set: function(val) {
                    setterFunctions['softDelete'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "taxSubType": {
                get: function() {
                    context["field"] = "taxSubType";
                    context["metadata"] = (objectMetadata ? objectMetadata["taxSubType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.taxSubType, context);
                },
                set: function(val) {
                    setterFunctions['taxSubType'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.TranscationSubRecord_id = value ? (value["TranscationSubRecord_id"] ? value["TranscationSubRecord_id"] : null) : null;
            privateState.TransactionRecord_id = value ? (value["TransactionRecord_id"] ? value["TransactionRecord_id"] : null) : null;
            privateState.TaxSubCategory_id = value ? (value["TaxSubCategory_id"] ? value["TaxSubCategory_id"] : null) : null;
            privateState.Amount = value ? (value["Amount"] ? value["Amount"] : null) : null;
            privateState.softDelete = value ? (value["softDelete"] ? value["softDelete"] : null) : null;
            privateState.taxSubType = value ? (value["taxSubType"] ? value["taxSubType"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(TransactionSubRecord);

    //Create new class level validator object
    BaseModel.Validator.call(TransactionSubRecord);

    var registerValidatorBackup = TransactionSubRecord.registerValidator;

    TransactionSubRecord.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(TransactionSubRecord.isValid(this, propName, val)) {
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
    //For Operation 'fetchTransactionSubRecords' with service id 'FetchACHTransactionSubRecords6337'
     TransactionSubRecord.fetchTransactionSubRecords = function(params, onCompletion){
        return TransactionSubRecord.customVerb('fetchTransactionSubRecords', params, onCompletion);
     };

    var relations = [];

    TransactionSubRecord.relations = relations;

    TransactionSubRecord.prototype.isValid = function() {
        return TransactionSubRecord.isValid(this);
    };

    TransactionSubRecord.prototype.objModelName = "TransactionSubRecord";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    TransactionSubRecord.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ACH", "TransactionSubRecord", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    TransactionSubRecord.clone = function(objectToClone) {
        var clonedObj = new TransactionSubRecord();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return TransactionSubRecord;
});