/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "RMSActionCreate", "objectService" : "HIDRMSService"};

    var setterFunctions = {
        action_type: function(val, state) {
            context["field"] = "action_type";
            context["metadata"] = (objectMetadata ? objectMetadata["action_type"] : null);
            state['action_type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        application_id: function(val, state) {
            context["field"] = "application_id";
            context["metadata"] = (objectMetadata ? objectMetadata["application_id"] : null);
            state['application_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        app_action_id: function(val, state) {
            context["field"] = "app_action_id";
            context["metadata"] = (objectMetadata ? objectMetadata["app_action_id"] : null);
            state['app_action_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        app_session_id: function(val, state) {
            context["field"] = "app_session_id";
            context["metadata"] = (objectMetadata ? objectMetadata["app_session_id"] : null);
            state['app_session_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        app_user_id: function(val, state) {
            context["field"] = "app_user_id";
            context["metadata"] = (objectMetadata ? objectMetadata["app_user_id"] : null);
            state['app_user_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        channel_id: function(val, state) {
            context["field"] = "channel_id";
            context["metadata"] = (objectMetadata ? objectMetadata["channel_id"] : null);
            state['channel_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        client_ip: function(val, state) {
            context["field"] = "client_ip";
            context["metadata"] = (objectMetadata ? objectMetadata["client_ip"] : null);
            state['client_ip'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        risk: function(val, state) {
            context["field"] = "risk";
            context["metadata"] = (objectMetadata ? objectMetadata["risk"] : null);
            state['risk'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tags: function(val, state) {
            context["field"] = "tags";
            context["metadata"] = (objectMetadata ? objectMetadata["tags"] : null);
            state['tags'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tm_device_tag: function(val, state) {
            context["field"] = "tm_device_tag";
            context["metadata"] = (objectMetadata ? objectMetadata["tm_device_tag"] : null);
            state['tm_device_tag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tm_session_sid: function(val, state) {
            context["field"] = "tm_session_sid";
            context["metadata"] = (objectMetadata ? objectMetadata["tm_session_sid"] : null);
            state['tm_session_sid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        error_message: function(val, state) {
            context["field"] = "error_message";
            context["metadata"] = (objectMetadata ? objectMetadata["error_message"] : null);
            state['error_message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        error_code: function(val, state) {
            context["field"] = "error_code";
            context["metadata"] = (objectMetadata ? objectMetadata["error_code"] : null);
            state['error_code'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentThreat: function(val, state) {
            context["field"] = "currentThreat";
            context["metadata"] = (objectMetadata ? objectMetadata["currentThreat"] : null);
            state['currentThreat'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tm_action_id: function(val, state) {
            context["field"] = "tm_action_id";
            context["metadata"] = (objectMetadata ? objectMetadata["tm_action_id"] : null);
            state['tm_action_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        stepUp: function(val, state) {
            context["field"] = "stepUp";
            context["metadata"] = (objectMetadata ? objectMetadata["stepUp"] : null);
            state['stepUp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function RMSActionCreate(defaultValues) {
        var privateState = {};
        context["field"] = "action_type";
        context["metadata"] = (objectMetadata ? objectMetadata["action_type"] : null);
        privateState.action_type = defaultValues ?
            (defaultValues["action_type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["action_type"], context) :
                null) :
            null;

        context["field"] = "application_id";
        context["metadata"] = (objectMetadata ? objectMetadata["application_id"] : null);
        privateState.application_id = defaultValues ?
            (defaultValues["application_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["application_id"], context) :
                null) :
            null;

        context["field"] = "app_action_id";
        context["metadata"] = (objectMetadata ? objectMetadata["app_action_id"] : null);
        privateState.app_action_id = defaultValues ?
            (defaultValues["app_action_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["app_action_id"], context) :
                null) :
            null;

        context["field"] = "app_session_id";
        context["metadata"] = (objectMetadata ? objectMetadata["app_session_id"] : null);
        privateState.app_session_id = defaultValues ?
            (defaultValues["app_session_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["app_session_id"], context) :
                null) :
            null;

        context["field"] = "app_user_id";
        context["metadata"] = (objectMetadata ? objectMetadata["app_user_id"] : null);
        privateState.app_user_id = defaultValues ?
            (defaultValues["app_user_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["app_user_id"], context) :
                null) :
            null;

        context["field"] = "channel_id";
        context["metadata"] = (objectMetadata ? objectMetadata["channel_id"] : null);
        privateState.channel_id = defaultValues ?
            (defaultValues["channel_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["channel_id"], context) :
                null) :
            null;

        context["field"] = "client_ip";
        context["metadata"] = (objectMetadata ? objectMetadata["client_ip"] : null);
        privateState.client_ip = defaultValues ?
            (defaultValues["client_ip"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["client_ip"], context) :
                null) :
            null;

        context["field"] = "risk";
        context["metadata"] = (objectMetadata ? objectMetadata["risk"] : null);
        privateState.risk = defaultValues ?
            (defaultValues["risk"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["risk"], context) :
                null) :
            null;

        context["field"] = "tags";
        context["metadata"] = (objectMetadata ? objectMetadata["tags"] : null);
        privateState.tags = defaultValues ?
            (defaultValues["tags"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tags"], context) :
                null) :
            null;

        context["field"] = "tm_device_tag";
        context["metadata"] = (objectMetadata ? objectMetadata["tm_device_tag"] : null);
        privateState.tm_device_tag = defaultValues ?
            (defaultValues["tm_device_tag"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tm_device_tag"], context) :
                null) :
            null;

        context["field"] = "tm_session_sid";
        context["metadata"] = (objectMetadata ? objectMetadata["tm_session_sid"] : null);
        privateState.tm_session_sid = defaultValues ?
            (defaultValues["tm_session_sid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tm_session_sid"], context) :
                null) :
            null;

        context["field"] = "error_message";
        context["metadata"] = (objectMetadata ? objectMetadata["error_message"] : null);
        privateState.error_message = defaultValues ?
            (defaultValues["error_message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["error_message"], context) :
                null) :
            null;

        context["field"] = "error_code";
        context["metadata"] = (objectMetadata ? objectMetadata["error_code"] : null);
        privateState.error_code = defaultValues ?
            (defaultValues["error_code"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["error_code"], context) :
                null) :
            null;

        context["field"] = "currentThreat";
        context["metadata"] = (objectMetadata ? objectMetadata["currentThreat"] : null);
        privateState.currentThreat = defaultValues ?
            (defaultValues["currentThreat"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentThreat"], context) :
                null) :
            null;

        context["field"] = "tm_action_id";
        context["metadata"] = (objectMetadata ? objectMetadata["tm_action_id"] : null);
        privateState.tm_action_id = defaultValues ?
            (defaultValues["tm_action_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tm_action_id"], context) :
                null) :
            null;

        context["field"] = "stepUp";
        context["metadata"] = (objectMetadata ? objectMetadata["stepUp"] : null);
        privateState.stepUp = defaultValues ?
            (defaultValues["stepUp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["stepUp"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "action_type": {
                get: function() {
                    context["field"] = "action_type";
                    context["metadata"] = (objectMetadata ? objectMetadata["action_type"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.action_type, context);
                },
                set: function(val) {
                    setterFunctions['action_type'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "app_session_id": {
                get: function() {
                    context["field"] = "app_session_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["app_session_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.app_session_id, context);
                },
                set: function(val) {
                    setterFunctions['app_session_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "app_user_id": {
                get: function() {
                    context["field"] = "app_user_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["app_user_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.app_user_id, context);
                },
                set: function(val) {
                    setterFunctions['app_user_id'].call(this, val, privateState);
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
            "client_ip": {
                get: function() {
                    context["field"] = "client_ip";
                    context["metadata"] = (objectMetadata ? objectMetadata["client_ip"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.client_ip, context);
                },
                set: function(val) {
                    setterFunctions['client_ip'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "risk": {
                get: function() {
                    context["field"] = "risk";
                    context["metadata"] = (objectMetadata ? objectMetadata["risk"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.risk, context);
                },
                set: function(val) {
                    setterFunctions['risk'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tags": {
                get: function() {
                    context["field"] = "tags";
                    context["metadata"] = (objectMetadata ? objectMetadata["tags"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tags, context);
                },
                set: function(val) {
                    setterFunctions['tags'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tm_device_tag": {
                get: function() {
                    context["field"] = "tm_device_tag";
                    context["metadata"] = (objectMetadata ? objectMetadata["tm_device_tag"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tm_device_tag, context);
                },
                set: function(val) {
                    setterFunctions['tm_device_tag'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tm_session_sid": {
                get: function() {
                    context["field"] = "tm_session_sid";
                    context["metadata"] = (objectMetadata ? objectMetadata["tm_session_sid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tm_session_sid, context);
                },
                set: function(val) {
                    setterFunctions['tm_session_sid'].call(this, val, privateState);
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
            "currentThreat": {
                get: function() {
                    context["field"] = "currentThreat";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentThreat"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentThreat, context);
                },
                set: function(val) {
                    setterFunctions['currentThreat'].call(this, val, privateState);
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
            "stepUp": {
                get: function() {
                    context["field"] = "stepUp";
                    context["metadata"] = (objectMetadata ? objectMetadata["stepUp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.stepUp, context);
                },
                set: function(val) {
                    setterFunctions['stepUp'].call(this, val, privateState);
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
            privateState.action_type = value ? (value["action_type"] ? value["action_type"] : null) : null;
            privateState.application_id = value ? (value["application_id"] ? value["application_id"] : null) : null;
            privateState.app_action_id = value ? (value["app_action_id"] ? value["app_action_id"] : null) : null;
            privateState.app_session_id = value ? (value["app_session_id"] ? value["app_session_id"] : null) : null;
            privateState.app_user_id = value ? (value["app_user_id"] ? value["app_user_id"] : null) : null;
            privateState.channel_id = value ? (value["channel_id"] ? value["channel_id"] : null) : null;
            privateState.client_ip = value ? (value["client_ip"] ? value["client_ip"] : null) : null;
            privateState.risk = value ? (value["risk"] ? value["risk"] : null) : null;
            privateState.tags = value ? (value["tags"] ? value["tags"] : null) : null;
            privateState.tm_device_tag = value ? (value["tm_device_tag"] ? value["tm_device_tag"] : null) : null;
            privateState.tm_session_sid = value ? (value["tm_session_sid"] ? value["tm_session_sid"] : null) : null;
            privateState.error_message = value ? (value["error_message"] ? value["error_message"] : null) : null;
            privateState.error_code = value ? (value["error_code"] ? value["error_code"] : null) : null;
            privateState.currentThreat = value ? (value["currentThreat"] ? value["currentThreat"] : null) : null;
            privateState.tm_action_id = value ? (value["tm_action_id"] ? value["tm_action_id"] : null) : null;
            privateState.stepUp = value ? (value["stepUp"] ? value["stepUp"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(RMSActionCreate);

    //Create new class level validator object
    BaseModel.Validator.call(RMSActionCreate);

    var registerValidatorBackup = RMSActionCreate.registerValidator;

    RMSActionCreate.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(RMSActionCreate.isValid(this, propName, val)) {
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
    //For Operation 'rmsActionCreate' with service id 'actionCreate2329'
     RMSActionCreate.rmsActionCreate = function(params, onCompletion){
        return RMSActionCreate.customVerb('rmsActionCreate', params, onCompletion);
     };

    var relations = [];

    RMSActionCreate.relations = relations;

    RMSActionCreate.prototype.isValid = function() {
        return RMSActionCreate.isValid(this);
    };

    RMSActionCreate.prototype.objModelName = "RMSActionCreate";
    RMSActionCreate.prototype.objServiceName = "HIDRMSService";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    RMSActionCreate.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("HIDRMSService", "RMSActionCreate", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    RMSActionCreate.clone = function(objectToClone) {
        var clonedObj = new RMSActionCreate();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return RMSActionCreate;
});