/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CashPositions", "objectService" : "Holdings"};

    var setterFunctions = {
        span: function(val, state) {
            context["field"] = "span";
            context["metadata"] = (objectMetadata ? objectMetadata["span"] : null);
            state['span'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        credit: function(val, state) {
            context["field"] = "credit";
            context["metadata"] = (objectMetadata ? objectMetadata["credit"] : null);
            state['credit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debit: function(val, state) {
            context["field"] = "debit";
            context["metadata"] = (objectMetadata ? objectMetadata["debit"] : null);
            state['debit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        total_balance: function(val, state) {
            context["field"] = "total_balance";
            context["metadata"] = (objectMetadata ? objectMetadata["total_balance"] : null);
            state['total_balance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Duration: function(val, state) {
            context["field"] = "Duration";
            context["metadata"] = (objectMetadata ? objectMetadata["Duration"] : null);
            state['Duration'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        Type: function(val, state) {
            context["field"] = "Type";
            context["metadata"] = (objectMetadata ? objectMetadata["Type"] : null);
            state['Type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        startYear: function(val, state) {
            context["field"] = "startYear";
            context["metadata"] = (objectMetadata ? objectMetadata["startYear"] : null);
            state['startYear'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        endYear: function(val, state) {
            context["field"] = "endYear";
            context["metadata"] = (objectMetadata ? objectMetadata["endYear"] : null);
            state['endYear'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        month: function(val, state) {
            context["field"] = "month";
            context["metadata"] = (objectMetadata ? objectMetadata["month"] : null);
            state['month'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function CashPositions(defaultValues) {
        var privateState = {};
        context["field"] = "span";
        context["metadata"] = (objectMetadata ? objectMetadata["span"] : null);
        privateState.span = defaultValues ?
            (defaultValues["span"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["span"], context) :
                null) :
            null;

        context["field"] = "credit";
        context["metadata"] = (objectMetadata ? objectMetadata["credit"] : null);
        privateState.credit = defaultValues ?
            (defaultValues["credit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["credit"], context) :
                null) :
            null;

        context["field"] = "debit";
        context["metadata"] = (objectMetadata ? objectMetadata["debit"] : null);
        privateState.debit = defaultValues ?
            (defaultValues["debit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debit"], context) :
                null) :
            null;

        context["field"] = "total_balance";
        context["metadata"] = (objectMetadata ? objectMetadata["total_balance"] : null);
        privateState.total_balance = defaultValues ?
            (defaultValues["total_balance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["total_balance"], context) :
                null) :
            null;

        context["field"] = "Duration";
        context["metadata"] = (objectMetadata ? objectMetadata["Duration"] : null);
        privateState.Duration = defaultValues ?
            (defaultValues["Duration"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Duration"], context) :
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

        context["field"] = "Type";
        context["metadata"] = (objectMetadata ? objectMetadata["Type"] : null);
        privateState.Type = defaultValues ?
            (defaultValues["Type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Type"], context) :
                null) :
            null;

        context["field"] = "startYear";
        context["metadata"] = (objectMetadata ? objectMetadata["startYear"] : null);
        privateState.startYear = defaultValues ?
            (defaultValues["startYear"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["startYear"], context) :
                null) :
            null;

        context["field"] = "endYear";
        context["metadata"] = (objectMetadata ? objectMetadata["endYear"] : null);
        privateState.endYear = defaultValues ?
            (defaultValues["endYear"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["endYear"], context) :
                null) :
            null;

        context["field"] = "month";
        context["metadata"] = (objectMetadata ? objectMetadata["month"] : null);
        privateState.month = defaultValues ?
            (defaultValues["month"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["month"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "span": {
                get: function() {
                    context["field"] = "span";
                    context["metadata"] = (objectMetadata ? objectMetadata["span"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.span, context);
                },
                set: function(val) {
                    setterFunctions['span'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "credit": {
                get: function() {
                    context["field"] = "credit";
                    context["metadata"] = (objectMetadata ? objectMetadata["credit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.credit, context);
                },
                set: function(val) {
                    setterFunctions['credit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "debit": {
                get: function() {
                    context["field"] = "debit";
                    context["metadata"] = (objectMetadata ? objectMetadata["debit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debit, context);
                },
                set: function(val) {
                    setterFunctions['debit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "total_balance": {
                get: function() {
                    context["field"] = "total_balance";
                    context["metadata"] = (objectMetadata ? objectMetadata["total_balance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.total_balance, context);
                },
                set: function(val) {
                    setterFunctions['total_balance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Duration": {
                get: function() {
                    context["field"] = "Duration";
                    context["metadata"] = (objectMetadata ? objectMetadata["Duration"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Duration, context);
                },
                set: function(val) {
                    setterFunctions['Duration'].call(this, val, privateState);
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
            "Type": {
                get: function() {
                    context["field"] = "Type";
                    context["metadata"] = (objectMetadata ? objectMetadata["Type"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Type, context);
                },
                set: function(val) {
                    setterFunctions['Type'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "startYear": {
                get: function() {
                    context["field"] = "startYear";
                    context["metadata"] = (objectMetadata ? objectMetadata["startYear"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.startYear, context);
                },
                set: function(val) {
                    setterFunctions['startYear'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "endYear": {
                get: function() {
                    context["field"] = "endYear";
                    context["metadata"] = (objectMetadata ? objectMetadata["endYear"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.endYear, context);
                },
                set: function(val) {
                    setterFunctions['endYear'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "month": {
                get: function() {
                    context["field"] = "month";
                    context["metadata"] = (objectMetadata ? objectMetadata["month"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.month, context);
                },
                set: function(val) {
                    setterFunctions['month'].call(this, val, privateState);
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
            privateState.span = value ? (value["span"] ? value["span"] : null) : null;
            privateState.credit = value ? (value["credit"] ? value["credit"] : null) : null;
            privateState.debit = value ? (value["debit"] ? value["debit"] : null) : null;
            privateState.total_balance = value ? (value["total_balance"] ? value["total_balance"] : null) : null;
            privateState.Duration = value ? (value["Duration"] ? value["Duration"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.Type = value ? (value["Type"] ? value["Type"] : null) : null;
            privateState.startYear = value ? (value["startYear"] ? value["startYear"] : null) : null;
            privateState.endYear = value ? (value["endYear"] ? value["endYear"] : null) : null;
            privateState.month = value ? (value["month"] ? value["month"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(CashPositions);

    //Create new class level validator object
    BaseModel.Validator.call(CashPositions);

    var registerValidatorBackup = CashPositions.registerValidator;

    CashPositions.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CashPositions.isValid(this, propName, val)) {
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
    //For Operation 'getDetails' with service id 'FetchCashPositions7462'
     CashPositions.getDetails = function(params, onCompletion){
        return CashPositions.customVerb('getDetails', params, onCompletion);
     };

    var relations = [];

    CashPositions.relations = relations;

    CashPositions.prototype.isValid = function() {
        return CashPositions.isValid(this);
    };

    CashPositions.prototype.objModelName = "CashPositions";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CashPositions.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Holdings", "CashPositions", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CashPositions.clone = function(objectToClone) {
        var clonedObj = new CashPositions();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CashPositions;
});