/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ActivationCodeAuthenticator", "objectService" : "SCAActivationObjects"};

    var setterFunctions = {
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        activationCode: function(val, state) {
            context["field"] = "activationCode";
            context["metadata"] = (objectMetadata ? objectMetadata["activationCode"] : null);
            state['activationCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorCode: function(val, state) {
            context["field"] = "errorCode";
            context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
            state['errorCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorMessage: function(val, state) {
            context["field"] = "errorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
            state['errorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id_token: function(val, state) {
            context["field"] = "id_token";
            context["metadata"] = (objectMetadata ? objectMetadata["id_token"] : null);
            state['id_token'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        password: function(val, state) {
            context["field"] = "password";
            context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
            state['password'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        provisionJSON: function(val, state) {
            context["field"] = "provisionJSON";
            context["metadata"] = (objectMetadata ? objectMetadata["provisionJSON"] : null);
            state['provisionJSON'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        authReqId: function(val, state) {
            context["field"] = "authReqId";
            context["metadata"] = (objectMetadata ? objectMetadata["authReqId"] : null);
            state['authReqId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pushDeviceId: function(val, state) {
            context["field"] = "pushDeviceId";
            context["metadata"] = (objectMetadata ? objectMetadata["pushDeviceId"] : null);
            state['pushDeviceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceRegistrationStatus: function(val, state) {
            context["field"] = "deviceRegistrationStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceRegistrationStatus"] : null);
            state['deviceRegistrationStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceStatus: function(val, state) {
            context["field"] = "deviceStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceStatus"] : null);
            state['deviceStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ActivationCodeAuthenticator(defaultValues) {
        var privateState = {};
        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "activationCode";
        context["metadata"] = (objectMetadata ? objectMetadata["activationCode"] : null);
        privateState.activationCode = defaultValues ?
            (defaultValues["activationCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["activationCode"], context) :
                null) :
            null;

        context["field"] = "errorCode";
        context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
        privateState.errorCode = defaultValues ?
            (defaultValues["errorCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorCode"], context) :
                null) :
            null;

        context["field"] = "errorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
        privateState.errorMessage = defaultValues ?
            (defaultValues["errorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorMessage"], context) :
                null) :
            null;

        context["field"] = "id_token";
        context["metadata"] = (objectMetadata ? objectMetadata["id_token"] : null);
        privateState.id_token = defaultValues ?
            (defaultValues["id_token"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id_token"], context) :
                null) :
            null;

        context["field"] = "password";
        context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
        privateState.password = defaultValues ?
            (defaultValues["password"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["password"], context) :
                null) :
            null;

        context["field"] = "provisionJSON";
        context["metadata"] = (objectMetadata ? objectMetadata["provisionJSON"] : null);
        privateState.provisionJSON = defaultValues ?
            (defaultValues["provisionJSON"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["provisionJSON"], context) :
                null) :
            null;

        context["field"] = "authReqId";
        context["metadata"] = (objectMetadata ? objectMetadata["authReqId"] : null);
        privateState.authReqId = defaultValues ?
            (defaultValues["authReqId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["authReqId"], context) :
                null) :
            null;

        context["field"] = "pushDeviceId";
        context["metadata"] = (objectMetadata ? objectMetadata["pushDeviceId"] : null);
        privateState.pushDeviceId = defaultValues ?
            (defaultValues["pushDeviceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pushDeviceId"], context) :
                null) :
            null;

        context["field"] = "deviceRegistrationStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceRegistrationStatus"] : null);
        privateState.deviceRegistrationStatus = defaultValues ?
            (defaultValues["deviceRegistrationStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceRegistrationStatus"], context) :
                null) :
            null;

        context["field"] = "deviceStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceStatus"] : null);
        privateState.deviceStatus = defaultValues ?
            (defaultValues["deviceStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceStatus"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "userId": {
                get: function() {
                    context["field"] = "userId";
                    context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userId, context);
                },
                set: function(val) {
                    setterFunctions['userId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "activationCode": {
                get: function() {
                    context["field"] = "activationCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["activationCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.activationCode, context);
                },
                set: function(val) {
                    setterFunctions['activationCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errorCode": {
                get: function() {
                    context["field"] = "errorCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorCode, context);
                },
                set: function(val) {
                    setterFunctions['errorCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errorMessage": {
                get: function() {
                    context["field"] = "errorMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorMessage, context);
                },
                set: function(val) {
                    setterFunctions['errorMessage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "id_token": {
                get: function() {
                    context["field"] = "id_token";
                    context["metadata"] = (objectMetadata ? objectMetadata["id_token"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id_token, context);
                },
                set: function(val) {
                    setterFunctions['id_token'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "password": {
                get: function() {
                    context["field"] = "password";
                    context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.password, context);
                },
                set: function(val) {
                    setterFunctions['password'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "provisionJSON": {
                get: function() {
                    context["field"] = "provisionJSON";
                    context["metadata"] = (objectMetadata ? objectMetadata["provisionJSON"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.provisionJSON, context);
                },
                set: function(val) {
                    setterFunctions['provisionJSON'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "authReqId": {
                get: function() {
                    context["field"] = "authReqId";
                    context["metadata"] = (objectMetadata ? objectMetadata["authReqId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.authReqId, context);
                },
                set: function(val) {
                    setterFunctions['authReqId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pushDeviceId": {
                get: function() {
                    context["field"] = "pushDeviceId";
                    context["metadata"] = (objectMetadata ? objectMetadata["pushDeviceId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pushDeviceId, context);
                },
                set: function(val) {
                    setterFunctions['pushDeviceId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deviceRegistrationStatus": {
                get: function() {
                    context["field"] = "deviceRegistrationStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["deviceRegistrationStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deviceRegistrationStatus, context);
                },
                set: function(val) {
                    setterFunctions['deviceRegistrationStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deviceStatus": {
                get: function() {
                    context["field"] = "deviceStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["deviceStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deviceStatus, context);
                },
                set: function(val) {
                    setterFunctions['deviceStatus'].call(this, val, privateState);
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
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.activationCode = value ? (value["activationCode"] ? value["activationCode"] : null) : null;
            privateState.errorCode = value ? (value["errorCode"] ? value["errorCode"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.id_token = value ? (value["id_token"] ? value["id_token"] : null) : null;
            privateState.password = value ? (value["password"] ? value["password"] : null) : null;
            privateState.provisionJSON = value ? (value["provisionJSON"] ? value["provisionJSON"] : null) : null;
            privateState.authReqId = value ? (value["authReqId"] ? value["authReqId"] : null) : null;
            privateState.pushDeviceId = value ? (value["pushDeviceId"] ? value["pushDeviceId"] : null) : null;
            privateState.deviceRegistrationStatus = value ? (value["deviceRegistrationStatus"] ? value["deviceRegistrationStatus"] : null) : null;
            privateState.deviceStatus = value ? (value["deviceStatus"] ? value["deviceStatus"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ActivationCodeAuthenticator);

    //Create new class level validator object
    BaseModel.Validator.call(ActivationCodeAuthenticator);

    var registerValidatorBackup = ActivationCodeAuthenticator.registerValidator;

    ActivationCodeAuthenticator.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ActivationCodeAuthenticator.isValid(this, propName, val)) {
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
    //For Operation 'createPassword' with service id 'createPassword8403'
     ActivationCodeAuthenticator.createPassword = function(params, onCompletion){
        return ActivationCodeAuthenticator.customVerb('createPassword', params, onCompletion);
     };

    //For Operation 'resetPassword' with service id 'changePassword5892'
     ActivationCodeAuthenticator.resetPassword = function(params, onCompletion){
        return ActivationCodeAuthenticator.customVerb('resetPassword', params, onCompletion);
     };

    //For Operation 'login' with service id 'login2774'
     ActivationCodeAuthenticator.login = function(params, onCompletion){
        return ActivationCodeAuthenticator.customVerb('login', params, onCompletion);
     };

    //For Operation 'createDevice' with service id 'createDevice7355'
     ActivationCodeAuthenticator.createDevice = function(params, onCompletion){
        return ActivationCodeAuthenticator.customVerb('createDevice', params, onCompletion);
     };

    //For Operation 'getDevice' with service id 'getDevice6362'
     ActivationCodeAuthenticator.getDevice = function(params, onCompletion){
        return ActivationCodeAuthenticator.customVerb('getDevice', params, onCompletion);
     };

    var relations = [];

    ActivationCodeAuthenticator.relations = relations;

    ActivationCodeAuthenticator.prototype.isValid = function() {
        return ActivationCodeAuthenticator.isValid(this);
    };

    ActivationCodeAuthenticator.prototype.objModelName = "ActivationCodeAuthenticator";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ActivationCodeAuthenticator.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SCAActivationObjects", "ActivationCodeAuthenticator", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ActivationCodeAuthenticator.clone = function(objectToClone) {
        var clonedObj = new ActivationCodeAuthenticator();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ActivationCodeAuthenticator;
});