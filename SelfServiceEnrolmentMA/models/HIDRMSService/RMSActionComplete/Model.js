/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "RMSActionComplete", "objectService" : "HIDRMSService"};

    var setterFunctions = {
        application_id: function(val, state) {
            context["field"] = "application_id";
            context["metadata"] = (objectMetadata ? objectMetadata["application_id"] : null);
            state['application_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        channel_id: function(val, state) {
            context["field"] = "channel_id";
            context["metadata"] = (objectMetadata ? objectMetadata["channel_id"] : null);
            state['channel_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        error_code: function(val, state) {
            context["field"] = "error_code";
            context["metadata"] = (objectMetadata ? objectMetadata["error_code"] : null);
            state['error_code'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        error_message: function(val, state) {
            context["field"] = "error_message";
            context["metadata"] = (objectMetadata ? objectMetadata["error_message"] : null);
            state['error_message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tm_action_id: function(val, state) {
            context["field"] = "tm_action_id";
            context["metadata"] = (objectMetadata ? objectMetadata["tm_action_id"] : null);
            state['tm_action_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        app_action_id: function(val, state) {
            context["field"] = "app_action_id";
            context["metadata"] = (objectMetadata ? objectMetadata["app_action_id"] : null);
            state['app_action_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function RMSActionComplete(defaultValues) {
        var privateState = {};
        context["field"] = "application_id";
        context["metadata"] = (objectMetadata ? objectMetadata["application_id"] : null);
        privateState.application_id = defaultValues ?
            (defaultValues["application_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["application_id"], context) :
                null) :
            null;

        context["field"] = "channel_id";
        context["metadata"] = (objectMetadata ? objectMetadata["channel_id"] : null);
        privateState.channel_id = defaultValues ?
            (defaultValues["channel_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["channel_id"], context) :
                null) :
            null;

        context["field"] = "error_code";
        context["metadata"] = (objectMetadata ? objectMetadata["error_code"] : null);
        privateState.error_code = defaultValues ?
            (defaultValues["error_code"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["error_code"], context) :
                null) :
            null;

        context["field"] = "error_message";
        context["metadata"] = (objectMetadata ? objectMetadata["error_message"] : null);
        privateState.error_message = defaultValues ?
            (defaultValues["error_message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["error_message"], context) :
                null) :
            null;

        context["field"] = "tm_action_id";
        context["metadata"] = (objectMetadata ? objectMetadata["tm_action_id"] : null);
        privateState.tm_action_id = defaultValues ?
            (defaultValues["tm_action_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tm_action_id"], context) :
                null) :
            null;

        context["field"] = "app_action_id";
        context["metadata"] = (objectMetadata ? objectMetadata["app_action_id"] : null);
        privateState.app_action_id = defaultValues ?
            (defaultValues["app_action_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["app_action_id"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "application_id": {
                get: function() {
                    context["field"] = "application_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["application_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.application_id, context);
                },
                set: function(val) {
                    setterFunctions['application_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "channel_id": {
                get: function() {
                    context["field"] = "channel_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["channel_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.channel_id, context);
                },
                set: function(val) {
                    setterFunctions['channel_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "error_code": {
                get: function() {
                    context["field"] = "error_code";
                    context["metadata"] = (objectMetadata ? objectMetadata["error_code"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.error_code, context);
                },
                set: function(val) {
                    setterFunctions['error_code'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "error_message": {
                get: function() {
                    context["field"] = "error_message";
                    context["metadata"] = (objectMetadata ? objectMetadata["error_message"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.error_message, context);
                },
                set: function(val) {
                    setterFunctions['error_message'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tm_action_id": {
                get: function() {
                    context["field"] = "tm_action_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["tm_action_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tm_action_id, context);
                },
                set: function(val) {
                    setterFunctions['tm_action_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "app_action_id": {
                get: function() {
                    context["field"] = "app_action_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["app_action_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.app_action_id, context);
                },
                set: function(val) {
                    setterFunctions['app_action_id'].call(this, val, privateState);
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
            privateState.application_id = value ? (value["application_id"] ? value["application_id"] : null) : null;
            privateState.channel_id = value ? (value["channel_id"] ? value["channel_id"] : null) : null;
            privateState.error_code = value ? (value["error_code"] ? value["error_code"] : null) : null;
            privateState.error_message = value ? (value["error_message"] ? value["error_message"] : null) : null;
            privateState.tm_action_id = value ? (value["tm_action_id"] ? value["tm_action_id"] : null) : null;
            privateState.app_action_id = value ? (value["app_action_id"] ? value["app_action_id"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(RMSActionComplete);

    //Create new class level validator object
    BaseModel.Validator.call(RMSActionComplete);

    var registerValidatorBackup = RMSActionComplete.registerValidator;

    RMSActionComplete.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(RMSActionComplete.isValid(this, propName, val)) {
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
    //For Operation 'rmsActionReject' with service id 'actionReject3779'
     RMSActionComplete.rmsActionReject = function(params, onCompletion){
        return RMSActionComplete.customVerb('rmsActionReject', params, onCompletion);
     };

    //For Operation 'rmsActionComplete' with service id 'actionComplete5411'
     RMSActionComplete.rmsActionComplete = function(params, onCompletion){
        return RMSActionComplete.customVerb('rmsActionComplete', params, onCompletion);
     };

    var relations = [];

    RMSActionComplete.relations = relations;

    RMSActionComplete.prototype.isValid = function() {
        return RMSActionComplete.isValid(this);
    };

    RMSActionComplete.prototype.objModelName = "RMSActionComplete";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    RMSActionComplete.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("HIDRMSService", "RMSActionComplete", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    RMSActionComplete.clone = function(objectToClone) {
        var clonedObj = new RMSActionComplete();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return RMSActionComplete;
});