/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "LoanSimulateObject", "objectService" : "LoanPayoff"};

    var setterFunctions = {
        activityId: function(val, state) {
            context["field"] = "activityId";
            context["metadata"] = (objectMetadata ? objectMetadata["activityId"] : null);
            state['activityId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementId: function(val, state) {
            context["field"] = "arrangementId";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
            state['arrangementId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        effectiveDate: function(val, state) {
            context["field"] = "effectiveDate";
            context["metadata"] = (objectMetadata ? objectMetadata["effectiveDate"] : null);
            state['effectiveDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productId: function(val, state) {
            context["field"] = "productId";
            context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
            state['productId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        backendOverride: function(val, state) {
            context["field"] = "backendOverride";
            context["metadata"] = (objectMetadata ? objectMetadata["backendOverride"] : null);
            state['backendOverride'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        backendError: function(val, state) {
            context["field"] = "backendError";
            context["metadata"] = (objectMetadata ? objectMetadata["backendError"] : null);
            state['backendError'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function LoanSimulateObject(defaultValues) {
        var privateState = {};
        context["field"] = "activityId";
        context["metadata"] = (objectMetadata ? objectMetadata["activityId"] : null);
        privateState.activityId = defaultValues ?
            (defaultValues["activityId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["activityId"], context) :
                null) :
            null;

        context["field"] = "arrangementId";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
        privateState.arrangementId = defaultValues ?
            (defaultValues["arrangementId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementId"], context) :
                null) :
            null;

        context["field"] = "effectiveDate";
        context["metadata"] = (objectMetadata ? objectMetadata["effectiveDate"] : null);
        privateState.effectiveDate = defaultValues ?
            (defaultValues["effectiveDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["effectiveDate"], context) :
                null) :
            null;

        context["field"] = "productId";
        context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
        privateState.productId = defaultValues ?
            (defaultValues["productId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productId"], context) :
                null) :
            null;

        context["field"] = "backendOverride";
        context["metadata"] = (objectMetadata ? objectMetadata["backendOverride"] : null);
        privateState.backendOverride = defaultValues ?
            (defaultValues["backendOverride"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["backendOverride"], context) :
                null) :
            null;

        context["field"] = "backendError";
        context["metadata"] = (objectMetadata ? objectMetadata["backendError"] : null);
        privateState.backendError = defaultValues ?
            (defaultValues["backendError"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["backendError"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "activityId": {
                get: function() {
                    context["field"] = "activityId";
                    context["metadata"] = (objectMetadata ? objectMetadata["activityId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.activityId, context);
                },
                set: function(val) {
                    setterFunctions['activityId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangementId": {
                get: function() {
                    context["field"] = "arrangementId";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementId, context);
                },
                set: function(val) {
                    setterFunctions['arrangementId'].call(this, val, privateState);
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
            "productId": {
                get: function() {
                    context["field"] = "productId";
                    context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.productId, context);
                },
                set: function(val) {
                    setterFunctions['productId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "backendOverride": {
                get: function() {
                    context["field"] = "backendOverride";
                    context["metadata"] = (objectMetadata ? objectMetadata["backendOverride"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.backendOverride, context);
                },
                set: function(val) {
                    setterFunctions['backendOverride'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "backendError": {
                get: function() {
                    context["field"] = "backendError";
                    context["metadata"] = (objectMetadata ? objectMetadata["backendError"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.backendError, context);
                },
                set: function(val) {
                    setterFunctions['backendError'].call(this, val, privateState);
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
            privateState.activityId = value ? (value["activityId"] ? value["activityId"] : null) : null;
            privateState.arrangementId = value ? (value["arrangementId"] ? value["arrangementId"] : null) : null;
            privateState.effectiveDate = value ? (value["effectiveDate"] ? value["effectiveDate"] : null) : null;
            privateState.productId = value ? (value["productId"] ? value["productId"] : null) : null;
            privateState.backendOverride = value ? (value["backendOverride"] ? value["backendOverride"] : null) : null;
            privateState.backendError = value ? (value["backendError"] ? value["backendError"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(LoanSimulateObject);

    //Create new class level validator object
    BaseModel.Validator.call(LoanSimulateObject);

    var registerValidatorBackup = LoanSimulateObject.registerValidator;

    LoanSimulateObject.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(LoanSimulateObject.isValid(this, propName, val)) {
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
    var relations = [];

    LoanSimulateObject.relations = relations;

    LoanSimulateObject.prototype.isValid = function() {
        return LoanSimulateObject.isValid(this);
    };

    LoanSimulateObject.prototype.objModelName = "LoanSimulateObject";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    LoanSimulateObject.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("LoanPayoff", "LoanSimulateObject", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    LoanSimulateObject.clone = function(objectToClone) {
        var clonedObj = new LoanSimulateObject();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return LoanSimulateObject;
});