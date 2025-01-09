/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "TemplateRequestTypes", "objectService" : "ACH"};

    var setterFunctions = {
        TransactionType_id: function(val, state) {
            context["field"] = "TransactionType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TransactionType_id"] : null);
            state['TransactionType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateRequestType_id: function(val, state) {
            context["field"] = "TemplateRequestType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestType_id"] : null);
            state['TemplateRequestType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateRequestTypeName: function(val, state) {
            context["field"] = "TemplateRequestTypeName";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeName"] : null);
            state['TemplateRequestTypeName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    function TemplateRequestTypes(defaultValues) {
        var privateState = {};
        context["field"] = "TransactionType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TransactionType_id"] : null);
        privateState.TransactionType_id = defaultValues ?
            (defaultValues["TransactionType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransactionType_id"], context) :
                null) :
            null;

        context["field"] = "TemplateRequestType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestType_id"] : null);
        privateState.TemplateRequestType_id = defaultValues ?
            (defaultValues["TemplateRequestType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateRequestType_id"], context) :
                null) :
            null;

        context["field"] = "TemplateRequestTypeName";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeName"] : null);
        privateState.TemplateRequestTypeName = defaultValues ?
            (defaultValues["TemplateRequestTypeName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateRequestTypeName"], context) :
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
            "TransactionType_id": {
                get: function() {
                    context["field"] = "TransactionType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TransactionType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TransactionType_id, context);
                },
                set: function(val) {
                    setterFunctions['TransactionType_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TemplateRequestType_id": {
                get: function() {
                    context["field"] = "TemplateRequestType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateRequestType_id, context);
                },
                set: function(val) {
                    setterFunctions['TemplateRequestType_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TemplateRequestTypeName": {
                get: function() {
                    context["field"] = "TemplateRequestTypeName";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateRequestTypeName, context);
                },
                set: function(val) {
                    setterFunctions['TemplateRequestTypeName'].call(this, val, privateState);
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
            privateState.TransactionType_id = value ? (value["TransactionType_id"] ? value["TransactionType_id"] : null) : null;
            privateState.TemplateRequestType_id = value ? (value["TemplateRequestType_id"] ? value["TemplateRequestType_id"] : null) : null;
            privateState.TemplateRequestTypeName = value ? (value["TemplateRequestTypeName"] ? value["TemplateRequestTypeName"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(TemplateRequestTypes);

    //Create new class level validator object
    BaseModel.Validator.call(TemplateRequestTypes);

    var registerValidatorBackup = TemplateRequestTypes.registerValidator;

    TemplateRequestTypes.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(TemplateRequestTypes.isValid(this, propName, val)) {
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
    //For Operation 'FetchTemplateRequestTypes' with service id 'FetchACHTemplateRequestType9378'
     TemplateRequestTypes.FetchTemplateRequestTypes = function(params, onCompletion){
        return TemplateRequestTypes.customVerb('FetchTemplateRequestTypes', params, onCompletion);
     };

    var relations = [];

    TemplateRequestTypes.relations = relations;

    TemplateRequestTypes.prototype.isValid = function() {
        return TemplateRequestTypes.isValid(this);
    };

    TemplateRequestTypes.prototype.objModelName = "TemplateRequestTypes";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    TemplateRequestTypes.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ACH", "TemplateRequestTypes", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    TemplateRequestTypes.clone = function(objectToClone) {
        var clonedObj = new TemplateRequestTypes();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return TemplateRequestTypes;
});