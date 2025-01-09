/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "LoanBillObject", "objectService" : "LoanPayoff"};

    var setterFunctions = {
        arrangementId: function(val, state) {
            context["field"] = "arrangementId";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
            state['arrangementId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billType: function(val, state) {
            context["field"] = "billType";
            context["metadata"] = (objectMetadata ? objectMetadata["billType"] : null);
            state['billType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDate: function(val, state) {
            context["field"] = "paymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
            state['paymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    function LoanBillObject(defaultValues) {
        var privateState = {};
        context["field"] = "arrangementId";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
        privateState.arrangementId = defaultValues ?
            (defaultValues["arrangementId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementId"], context) :
                null) :
            null;

        context["field"] = "billType";
        context["metadata"] = (objectMetadata ? objectMetadata["billType"] : null);
        privateState.billType = defaultValues ?
            (defaultValues["billType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billType"], context) :
                null) :
            null;

        context["field"] = "paymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
        privateState.paymentDate = defaultValues ?
            (defaultValues["paymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDate"], context) :
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
            "billType": {
                get: function() {
                    context["field"] = "billType";
                    context["metadata"] = (objectMetadata ? objectMetadata["billType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billType, context);
                },
                set: function(val) {
                    setterFunctions['billType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentDate": {
                get: function() {
                    context["field"] = "paymentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentDate, context);
                },
                set: function(val) {
                    setterFunctions['paymentDate'].call(this, val, privateState);
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
            privateState.arrangementId = value ? (value["arrangementId"] ? value["arrangementId"] : null) : null;
            privateState.billType = value ? (value["billType"] ? value["billType"] : null) : null;
            privateState.paymentDate = value ? (value["paymentDate"] ? value["paymentDate"] : null) : null;
            privateState.backendOverride = value ? (value["backendOverride"] ? value["backendOverride"] : null) : null;
            privateState.backendError = value ? (value["backendError"] ? value["backendError"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(LoanBillObject);

    //Create new class level validator object
    BaseModel.Validator.call(LoanBillObject);

    var registerValidatorBackup = LoanBillObject.registerValidator;

    LoanBillObject.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(LoanBillObject.isValid(this, propName, val)) {
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
    //For Operation 'getByParam' with service id 'getBillDetailst249729'
     LoanBillObject.getByParam = function(params, onCompletion){
        return LoanBillObject.customVerb('getByParam', params, onCompletion);
     };

    var relations = [];

    LoanBillObject.relations = relations;

    LoanBillObject.prototype.isValid = function() {
        return LoanBillObject.isValid(this);
    };

    LoanBillObject.prototype.objModelName = "LoanBillObject";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    LoanBillObject.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("LoanPayoff", "LoanBillObject", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    LoanBillObject.clone = function(objectToClone) {
        var clonedObj = new LoanBillObject();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return LoanBillObject;
});