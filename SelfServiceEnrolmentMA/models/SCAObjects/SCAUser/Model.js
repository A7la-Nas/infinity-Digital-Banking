/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "SCAUser", "objectService" : "SCAObjects"};

    var setterFunctions = {
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otp: function(val, state) {
            context["field"] = "otp";
            context["metadata"] = (objectMetadata ? objectMetadata["otp"] : null);
            state['otp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        password: function(val, state) {
            context["field"] = "password";
            context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
            state['password'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        context: function(val, state) {
            context["field"] = "context";
            context["metadata"] = (objectMetadata ? objectMetadata["context"] : null);
            state['context'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceId: function(val, state) {
            context["field"] = "deviceId";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
            state['deviceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        error_message: function(val, state) {
            context["field"] = "error_message";
            context["metadata"] = (objectMetadata ? objectMetadata["error_message"] : null);
            state['error_message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function SCAUser(defaultValues) {
        var privateState = {};
        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "otp";
        context["metadata"] = (objectMetadata ? objectMetadata["otp"] : null);
        privateState.otp = defaultValues ?
            (defaultValues["otp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otp"], context) :
                null) :
            null;

        context["field"] = "password";
        context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
        privateState.password = defaultValues ?
            (defaultValues["password"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["password"], context) :
                null) :
            null;

        context["field"] = "context";
        context["metadata"] = (objectMetadata ? objectMetadata["context"] : null);
        privateState.context = defaultValues ?
            (defaultValues["context"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["context"], context) :
                null) :
            null;

        context["field"] = "deviceId";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
        privateState.deviceId = defaultValues ?
            (defaultValues["deviceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceId"], context) :
                null) :
            null;

        context["field"] = "error_message";
        context["metadata"] = (objectMetadata ? objectMetadata["error_message"] : null);
        privateState.error_message = defaultValues ?
            (defaultValues["error_message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["error_message"], context) :
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
            "otp": {
                get: function() {
                    context["field"] = "otp";
                    context["metadata"] = (objectMetadata ? objectMetadata["otp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otp, context);
                },
                set: function(val) {
                    setterFunctions['otp'].call(this, val, privateState);
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
            "context": {
                get: function() {
                    context["field"] = "context";
                    context["metadata"] = (objectMetadata ? objectMetadata["context"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.context, context);
                },
                set: function(val) {
                    setterFunctions['context'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deviceId": {
                get: function() {
                    context["field"] = "deviceId";
                    context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deviceId, context);
                },
                set: function(val) {
                    setterFunctions['deviceId'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.otp = value ? (value["otp"] ? value["otp"] : null) : null;
            privateState.password = value ? (value["password"] ? value["password"] : null) : null;
            privateState.context = value ? (value["context"] ? value["context"] : null) : null;
            privateState.deviceId = value ? (value["deviceId"] ? value["deviceId"] : null) : null;
            privateState.error_message = value ? (value["error_message"] ? value["error_message"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(SCAUser);

    //Create new class level validator object
    BaseModel.Validator.call(SCAUser);

    var registerValidatorBackup = SCAUser.registerValidator;

    SCAUser.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(SCAUser.isValid(this, propName, val)) {
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
    //For Operation 'validateTransaction' with service id 'validateTransaction4224'
     SCAUser.validateTransaction = function(params, onCompletion){
        return SCAUser.customVerb('validateTransaction', params, onCompletion);
     };

    //For Operation 'updateMyStatus' with service id 'scaUpdateMyStatus3694'
     SCAUser.updateMyStatus = function(params, onCompletion){
        return SCAUser.customVerb('updateMyStatus', params, onCompletion);
     };

    //For Operation 'checkPasswordAuthenticatorForUser' with service id 'checkPasswordAuthenticatorForUser6604'
     SCAUser.checkPasswordAuthenticatorForUser = function(params, onCompletion){
        return SCAUser.customVerb('checkPasswordAuthenticatorForUser', params, onCompletion);
     };

    //For Operation 'updateMyProfileDetails' with service id 'updateMyProfileDetails1242'
     SCAUser.updateMyProfileDetails = function(params, onCompletion){
        return SCAUser.customVerb('updateMyProfileDetails', params, onCompletion);
     };

    //For Operation 'changeOLBPassword' with service id 'changeOLBPassword4233'
     SCAUser.changeOLBPassword = function(params, onCompletion){
        return SCAUser.customVerb('changeOLBPassword', params, onCompletion);
     };

    //For Operation 'createOLBPassword' with service id 'createOLBPasswordPostActivation2733'
     SCAUser.createOLBPassword = function(params, onCompletion){
        return SCAUser.customVerb('createOLBPassword', params, onCompletion);
     };

    var relations = [];

    SCAUser.relations = relations;

    SCAUser.prototype.isValid = function() {
        return SCAUser.isValid(this);
    };

    SCAUser.prototype.objModelName = "SCAUser";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    SCAUser.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SCAObjects", "SCAUser", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    SCAUser.clone = function(objectToClone) {
        var clonedObj = new SCAUser();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return SCAUser;
});