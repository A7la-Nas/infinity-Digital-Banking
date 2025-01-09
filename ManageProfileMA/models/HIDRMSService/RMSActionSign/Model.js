/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "RMSActionSign", "objectService" : "HIDRMSService"};

    var setterFunctions = {
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
        factor_index: function(val, state) {
            context["field"] = "factor_index";
            context["metadata"] = (objectMetadata ? objectMetadata["factor_index"] : null);
            state['factor_index'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        security_item_type: function(val, state) {
            context["field"] = "security_item_type";
            context["metadata"] = (objectMetadata ? objectMetadata["security_item_type"] : null);
            state['security_item_type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tm_action_id: function(val, state) {
            context["field"] = "tm_action_id";
            context["metadata"] = (objectMetadata ? objectMetadata["tm_action_id"] : null);
            state['tm_action_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    };

    //Create the Model Class
    function RMSActionSign(defaultValues) {
        var privateState = {};
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

        context["field"] = "factor_index";
        context["metadata"] = (objectMetadata ? objectMetadata["factor_index"] : null);
        privateState.factor_index = defaultValues ?
            (defaultValues["factor_index"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["factor_index"], context) :
                null) :
            null;

        context["field"] = "security_item_type";
        context["metadata"] = (objectMetadata ? objectMetadata["security_item_type"] : null);
        privateState.security_item_type = defaultValues ?
            (defaultValues["security_item_type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["security_item_type"], context) :
                null) :
            null;

        context["field"] = "tm_action_id";
        context["metadata"] = (objectMetadata ? objectMetadata["tm_action_id"] : null);
        privateState.tm_action_id = defaultValues ?
            (defaultValues["tm_action_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tm_action_id"], context) :
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
            "factor_index": {
                get: function() {
                    context["field"] = "factor_index";
                    context["metadata"] = (objectMetadata ? objectMetadata["factor_index"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.factor_index, context);
                },
                set: function(val) {
                    setterFunctions['factor_index'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "security_item_type": {
                get: function() {
                    context["field"] = "security_item_type";
                    context["metadata"] = (objectMetadata ? objectMetadata["security_item_type"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.security_item_type, context);
                },
                set: function(val) {
                    setterFunctions['security_item_type'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.application_id = value ? (value["application_id"] ? value["application_id"] : null) : null;
            privateState.app_action_id = value ? (value["app_action_id"] ? value["app_action_id"] : null) : null;
            privateState.app_session_id = value ? (value["app_session_id"] ? value["app_session_id"] : null) : null;
            privateState.app_user_id = value ? (value["app_user_id"] ? value["app_user_id"] : null) : null;
            privateState.channel_id = value ? (value["channel_id"] ? value["channel_id"] : null) : null;
            privateState.client_ip = value ? (value["client_ip"] ? value["client_ip"] : null) : null;
            privateState.error_code = value ? (value["error_code"] ? value["error_code"] : null) : null;
            privateState.error_message = value ? (value["error_message"] ? value["error_message"] : null) : null;
            privateState.factor_index = value ? (value["factor_index"] ? value["factor_index"] : null) : null;
            privateState.security_item_type = value ? (value["security_item_type"] ? value["security_item_type"] : null) : null;
            privateState.tm_action_id = value ? (value["tm_action_id"] ? value["tm_action_id"] : null) : null;
            privateState.tm_device_tag = value ? (value["tm_device_tag"] ? value["tm_device_tag"] : null) : null;
            privateState.tm_session_sid = value ? (value["tm_session_sid"] ? value["tm_session_sid"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(RMSActionSign);

    //Create new class level validator object
    BaseModel.Validator.call(RMSActionSign);

    var registerValidatorBackup = RMSActionSign.registerValidator;

    RMSActionSign.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(RMSActionSign.isValid(this, propName, val)) {
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
    //For Operation 'rmsActionSign' with service id 'actionSign4171'
     RMSActionSign.rmsActionSign = function(params, onCompletion){
        return RMSActionSign.customVerb('rmsActionSign', params, onCompletion);
     };

    var relations = [];

    RMSActionSign.relations = relations;

    RMSActionSign.prototype.isValid = function() {
        return RMSActionSign.isValid(this);
    };

    RMSActionSign.prototype.objModelName = "RMSActionSign";
    RMSActionSign.prototype.objServiceName = "HIDRMSService";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    RMSActionSign.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("HIDRMSService", "RMSActionSign", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    RMSActionSign.clone = function(objectToClone) {
        var clonedObj = new RMSActionSign();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return RMSActionSign;
});