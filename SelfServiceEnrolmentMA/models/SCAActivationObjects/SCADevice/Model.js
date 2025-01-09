/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "SCADevice", "objectService" : "SCAActivationObjects"};

    var setterFunctions = {
        userid: function(val, state) {
            context["field"] = "userid";
            context["metadata"] = (objectMetadata ? objectMetadata["userid"] : null);
            state['userid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        password: function(val, state) {
            context["field"] = "password";
            context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
            state['password'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id_token: function(val, state) {
            context["field"] = "id_token";
            context["metadata"] = (objectMetadata ? objectMetadata["id_token"] : null);
            state['id_token'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceId: function(val, state) {
            context["field"] = "deviceId";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
            state['deviceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function SCADevice(defaultValues) {
        var privateState = {};
        context["field"] = "userid";
        context["metadata"] = (objectMetadata ? objectMetadata["userid"] : null);
        privateState.userid = defaultValues ?
            (defaultValues["userid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userid"], context) :
                null) :
            null;

        context["field"] = "password";
        context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
        privateState.password = defaultValues ?
            (defaultValues["password"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["password"], context) :
                null) :
            null;

        context["field"] = "id_token";
        context["metadata"] = (objectMetadata ? objectMetadata["id_token"] : null);
        privateState.id_token = defaultValues ?
            (defaultValues["id_token"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id_token"], context) :
                null) :
            null;

        context["field"] = "deviceId";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
        privateState.deviceId = defaultValues ?
            (defaultValues["deviceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "userid": {
                get: function() {
                    context["field"] = "userid";
                    context["metadata"] = (objectMetadata ? objectMetadata["userid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userid, context);
                },
                set: function(val) {
                    setterFunctions['userid'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.userid = value ? (value["userid"] ? value["userid"] : null) : null;
            privateState.password = value ? (value["password"] ? value["password"] : null) : null;
            privateState.id_token = value ? (value["id_token"] ? value["id_token"] : null) : null;
            privateState.deviceId = value ? (value["deviceId"] ? value["deviceId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(SCADevice);

    //Create new class level validator object
    BaseModel.Validator.call(SCADevice);

    var registerValidatorBackup = SCADevice.registerValidator;

    SCADevice.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(SCADevice.isValid(this, propName, val)) {
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
    //For Operation 'lostDevice' with service id 'validateLostDevice3437'
     SCADevice.lostDevice = function(params, onCompletion){
        return SCADevice.customVerb('lostDevice', params, onCompletion);
     };

    var relations = [];

    SCADevice.relations = relations;

    SCADevice.prototype.isValid = function() {
        return SCADevice.isValid(this);
    };

    SCADevice.prototype.objModelName = "SCADevice";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    SCADevice.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SCAActivationObjects", "SCADevice", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    SCADevice.clone = function(objectToClone) {
        var clonedObj = new SCADevice();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return SCADevice;
});