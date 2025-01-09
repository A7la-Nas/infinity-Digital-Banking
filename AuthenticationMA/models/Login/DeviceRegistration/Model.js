/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "DeviceRegistration", "objectService" : "Login"};

    var setterFunctions = {
        deviceId: function(val, state) {
            context["field"] = "deviceId";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
            state['deviceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UserName: function(val, state) {
            context["field"] = "UserName";
            context["metadata"] = (objectMetadata ? objectMetadata["UserName"] : null);
            state['UserName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function DeviceRegistration(defaultValues) {
        var privateState = {};
        context["field"] = "deviceId";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
        privateState.deviceId = defaultValues ?
            (defaultValues["deviceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceId"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "UserName";
        context["metadata"] = (objectMetadata ? objectMetadata["UserName"] : null);
        privateState.UserName = defaultValues ?
            (defaultValues["UserName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UserName"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "errmsg": {
                get: function() {
                    context["field"] = "errmsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errmsg, context);
                },
                set: function(val) {
                    setterFunctions['errmsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "status": {
                get: function() {
                    context["field"] = "status";
                    context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.status, context);
                },
                set: function(val) {
                    setterFunctions['status'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "UserName": {
                get: function() {
                    context["field"] = "UserName";
                    context["metadata"] = (objectMetadata ? objectMetadata["UserName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UserName, context);
                },
                set: function(val) {
                    setterFunctions['UserName'].call(this, val, privateState);
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
            privateState.deviceId = value ? (value["deviceId"] ? value["deviceId"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.UserName = value ? (value["UserName"] ? value["UserName"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(DeviceRegistration);

    //Create new class level validator object
    BaseModel.Validator.call(DeviceRegistration);

    var registerValidatorBackup = DeviceRegistration.registerValidator;

    DeviceRegistration.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(DeviceRegistration.isValid(this, propName, val)) {
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
    //For Operation 'customCreate' with service id 'registerDevice9986'
     DeviceRegistration.customCreate = function(params, onCompletion){
        return DeviceRegistration.customVerb('customCreate', params, onCompletion);
     };

    //For Operation 'dbx_updateCustomerDeviceInfo' with service id 'UpdateCustomerDeviceInformation7178'
     DeviceRegistration.dbx_updateCustomerDeviceInfo = function(params, onCompletion){
        return DeviceRegistration.customVerb('dbx_updateCustomerDeviceInfo', params, onCompletion);
     };

    //For Operation 'dbx_registerCustomerDevice' with service id 'RegisterCustomerDevice7303'
     DeviceRegistration.dbx_registerCustomerDevice = function(params, onCompletion){
        return DeviceRegistration.customVerb('dbx_registerCustomerDevice', params, onCompletion);
     };

    //For Operation 'dbx_isDeviceRegistered' with service id 'IsDeviceRegistered4163'
     DeviceRegistration.dbx_isDeviceRegistered = function(params, onCompletion){
        return DeviceRegistration.customVerb('dbx_isDeviceRegistered', params, onCompletion);
     };

    var relations = [];

    DeviceRegistration.relations = relations;

    DeviceRegistration.prototype.isValid = function() {
        return DeviceRegistration.isValid(this);
    };

    DeviceRegistration.prototype.objModelName = "DeviceRegistration";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    DeviceRegistration.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Login", "DeviceRegistration", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    DeviceRegistration.clone = function(objectToClone) {
        var clonedObj = new DeviceRegistration();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return DeviceRegistration;
});