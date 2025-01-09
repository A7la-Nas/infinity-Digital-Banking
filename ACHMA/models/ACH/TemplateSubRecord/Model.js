/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "TemplateSubRecord", "objectService" : "ACH"};

    var setterFunctions = {
        taxSubType: function(val, state) {
            context["field"] = "taxSubType";
            context["metadata"] = (objectMetadata ? objectMetadata["taxSubType"] : null);
            state['taxSubType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softDelete: function(val, state) {
            context["field"] = "softDelete";
            context["metadata"] = (objectMetadata ? objectMetadata["softDelete"] : null);
            state['softDelete'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateRecord_id: function(val, state) {
            context["field"] = "TemplateRecord_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateRecord_id"] : null);
            state['TemplateRecord_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateSubRecord_id: function(val, state) {
            context["field"] = "TemplateSubRecord_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateSubRecord_id"] : null);
            state['TemplateSubRecord_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Amount: function(val, state) {
            context["field"] = "Amount";
            context["metadata"] = (objectMetadata ? objectMetadata["Amount"] : null);
            state['Amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TaxSubCategory_id: function(val, state) {
            context["field"] = "TaxSubCategory_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TaxSubCategory_id"] : null);
            state['TaxSubCategory_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    };

    //Create the Model Class
    function TemplateSubRecord(defaultValues) {
        var privateState = {};
        context["field"] = "taxSubType";
        context["metadata"] = (objectMetadata ? objectMetadata["taxSubType"] : null);
        privateState.taxSubType = defaultValues ?
            (defaultValues["taxSubType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxSubType"], context) :
                null) :
            null;

        context["field"] = "softDelete";
        context["metadata"] = (objectMetadata ? objectMetadata["softDelete"] : null);
        privateState.softDelete = defaultValues ?
            (defaultValues["softDelete"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softDelete"], context) :
                null) :
            null;

        context["field"] = "TemplateRecord_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateRecord_id"] : null);
        privateState.TemplateRecord_id = defaultValues ?
            (defaultValues["TemplateRecord_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateRecord_id"], context) :
                null) :
            null;

        context["field"] = "TemplateSubRecord_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateSubRecord_id"] : null);
        privateState.TemplateSubRecord_id = defaultValues ?
            (defaultValues["TemplateSubRecord_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateSubRecord_id"], context) :
                null) :
            null;

        context["field"] = "Amount";
        context["metadata"] = (objectMetadata ? objectMetadata["Amount"] : null);
        privateState.Amount = defaultValues ?
            (defaultValues["Amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Amount"], context) :
                null) :
            null;

        context["field"] = "TaxSubCategory_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TaxSubCategory_id"] : null);
        privateState.TaxSubCategory_id = defaultValues ?
            (defaultValues["TaxSubCategory_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TaxSubCategory_id"], context) :
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


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "TemplateRecord_id": {
                get: function() {
                    context["field"] = "TemplateRecord_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateRecord_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateRecord_id, context);
                },
                set: function(val) {
                    setterFunctions['TemplateRecord_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TemplateSubRecord_id": {
                get: function() {
                    context["field"] = "TemplateSubRecord_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateSubRecord_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateSubRecord_id, context);
                },
                set: function(val) {
                    setterFunctions['TemplateSubRecord_id'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.taxSubType = value ? (value["taxSubType"] ? value["taxSubType"] : null) : null;
            privateState.softDelete = value ? (value["softDelete"] ? value["softDelete"] : null) : null;
            privateState.TemplateRecord_id = value ? (value["TemplateRecord_id"] ? value["TemplateRecord_id"] : null) : null;
            privateState.TemplateSubRecord_id = value ? (value["TemplateSubRecord_id"] ? value["TemplateSubRecord_id"] : null) : null;
            privateState.Amount = value ? (value["Amount"] ? value["Amount"] : null) : null;
            privateState.TaxSubCategory_id = value ? (value["TaxSubCategory_id"] ? value["TaxSubCategory_id"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(TemplateSubRecord);

    //Create new class level validator object
    BaseModel.Validator.call(TemplateSubRecord);

    var registerValidatorBackup = TemplateSubRecord.registerValidator;

    TemplateSubRecord.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(TemplateSubRecord.isValid(this, propName, val)) {
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
    //For Operation 'fetchTemplateSubRecords' with service id 'FetchACHTemplateSubRecords2391'
     TemplateSubRecord.fetchTemplateSubRecords = function(params, onCompletion){
        return TemplateSubRecord.customVerb('fetchTemplateSubRecords', params, onCompletion);
     };

    var relations = [];

    TemplateSubRecord.relations = relations;

    TemplateSubRecord.prototype.isValid = function() {
        return TemplateSubRecord.isValid(this);
    };

    TemplateSubRecord.prototype.objModelName = "TemplateSubRecord";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    TemplateSubRecord.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ACH", "TemplateSubRecord", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    TemplateSubRecord.clone = function(objectToClone) {
        var clonedObj = new TemplateSubRecord();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return TemplateSubRecord;
});