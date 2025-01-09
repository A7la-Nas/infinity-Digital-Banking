/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Security", "objectService" : "Login"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        riskScore: function(val, state) {
            context["field"] = "riskScore";
            context["metadata"] = (objectMetadata ? objectMetadata["riskScore"] : null);
            state['riskScore'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceId: function(val, state) {
            context["field"] = "deviceId";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
            state['deviceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        operatingSystem: function(val, state) {
            context["field"] = "operatingSystem";
            context["metadata"] = (objectMetadata ? objectMetadata["operatingSystem"] : null);
            state['operatingSystem'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceKey: function(val, state) {
            context["field"] = "serviceKey";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
            state['serviceKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        encodedImage: function(val, state) {
            context["field"] = "encodedImage";
            context["metadata"] = (objectMetadata ? objectMetadata["encodedImage"] : null);
            state['encodedImage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        captchaValue: function(val, state) {
            context["field"] = "captchaValue";
            context["metadata"] = (objectMetadata ? objectMetadata["captchaValue"] : null);
            state['captchaValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Security(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "riskScore";
        context["metadata"] = (objectMetadata ? objectMetadata["riskScore"] : null);
        privateState.riskScore = defaultValues ?
            (defaultValues["riskScore"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["riskScore"], context) :
                null) :
            null;

        context["field"] = "deviceId";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
        privateState.deviceId = defaultValues ?
            (defaultValues["deviceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceId"], context) :
                null) :
            null;

        context["field"] = "operatingSystem";
        context["metadata"] = (objectMetadata ? objectMetadata["operatingSystem"] : null);
        privateState.operatingSystem = defaultValues ?
            (defaultValues["operatingSystem"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["operatingSystem"], context) :
                null) :
            null;

        context["field"] = "serviceKey";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
        privateState.serviceKey = defaultValues ?
            (defaultValues["serviceKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceKey"], context) :
                null) :
            null;

        context["field"] = "encodedImage";
        context["metadata"] = (objectMetadata ? objectMetadata["encodedImage"] : null);
        privateState.encodedImage = defaultValues ?
            (defaultValues["encodedImage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["encodedImage"], context) :
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

        context["field"] = "captchaValue";
        context["metadata"] = (objectMetadata ? objectMetadata["captchaValue"] : null);
        privateState.captchaValue = defaultValues ?
            (defaultValues["captchaValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["captchaValue"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "id": {
                get: function() {
                    context["field"] = "id";
                    context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id, context);
                },
                set: function(val) {
                    setterFunctions['id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "riskScore": {
                get: function() {
                    context["field"] = "riskScore";
                    context["metadata"] = (objectMetadata ? objectMetadata["riskScore"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.riskScore, context);
                },
                set: function(val) {
                    setterFunctions['riskScore'].call(this, val, privateState);
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
            "operatingSystem": {
                get: function() {
                    context["field"] = "operatingSystem";
                    context["metadata"] = (objectMetadata ? objectMetadata["operatingSystem"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.operatingSystem, context);
                },
                set: function(val) {
                    setterFunctions['operatingSystem'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceKey": {
                get: function() {
                    context["field"] = "serviceKey";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceKey, context);
                },
                set: function(val) {
                    setterFunctions['serviceKey'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "encodedImage": {
                get: function() {
                    context["field"] = "encodedImage";
                    context["metadata"] = (objectMetadata ? objectMetadata["encodedImage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.encodedImage, context);
                },
                set: function(val) {
                    setterFunctions['encodedImage'].call(this, val, privateState);
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
            "captchaValue": {
                get: function() {
                    context["field"] = "captchaValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["captchaValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.captchaValue, context);
                },
                set: function(val) {
                    setterFunctions['captchaValue'].call(this, val, privateState);
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
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.riskScore = value ? (value["riskScore"] ? value["riskScore"] : null) : null;
            privateState.deviceId = value ? (value["deviceId"] ? value["deviceId"] : null) : null;
            privateState.operatingSystem = value ? (value["operatingSystem"] ? value["operatingSystem"] : null) : null;
            privateState.serviceKey = value ? (value["serviceKey"] ? value["serviceKey"] : null) : null;
            privateState.encodedImage = value ? (value["encodedImage"] ? value["encodedImage"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.captchaValue = value ? (value["captchaValue"] ? value["captchaValue"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Security);

    //Create new class level validator object
    BaseModel.Validator.call(Security);

    var registerValidatorBackup = Security.registerValidator;

    Security.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Security.isValid(this, propName, val)) {
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
    //For Operation 'generateCaptcha' with service id 'GenerateCaptcha7112'
     Security.generateCaptcha = function(params, onCompletion){
        return Security.customVerb('generateCaptcha', params, onCompletion);
     };

    //For Operation 'verifyCaptcha' with service id 'VerifyCaptcha1364'
     Security.verifyCaptcha = function(params, onCompletion){
        return Security.customVerb('verifyCaptcha', params, onCompletion);
     };

    var relations = [];

    Security.relations = relations;

    Security.prototype.isValid = function() {
        return Security.isValid(this);
    };

    Security.prototype.objModelName = "Security";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Security.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Login", "Security", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Security.clone = function(objectToClone) {
        var clonedObj = new Security();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Security;
});