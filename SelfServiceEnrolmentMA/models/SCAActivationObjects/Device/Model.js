/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Device", "objectService" : "SCAActivationObjects"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        displayName: function(val, state) {
            context["field"] = "displayName";
            context["metadata"] = (objectMetadata ? objectMetadata["displayName"] : null);
            state['displayName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        friendlyName: function(val, state) {
            context["field"] = "friendlyName";
            context["metadata"] = (objectMetadata ? objectMetadata["friendlyName"] : null);
            state['friendlyName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isActive: function(val, state) {
            context["field"] = "isActive";
            context["metadata"] = (objectMetadata ? objectMetadata["isActive"] : null);
            state['isActive'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Device(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "displayName";
        context["metadata"] = (objectMetadata ? objectMetadata["displayName"] : null);
        privateState.displayName = defaultValues ?
            (defaultValues["displayName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["displayName"], context) :
                null) :
            null;

        context["field"] = "friendlyName";
        context["metadata"] = (objectMetadata ? objectMetadata["friendlyName"] : null);
        privateState.friendlyName = defaultValues ?
            (defaultValues["friendlyName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["friendlyName"], context) :
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

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "isActive";
        context["metadata"] = (objectMetadata ? objectMetadata["isActive"] : null);
        privateState.isActive = defaultValues ?
            (defaultValues["isActive"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isActive"], context) :
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
            "displayName": {
                get: function() {
                    context["field"] = "displayName";
                    context["metadata"] = (objectMetadata ? objectMetadata["displayName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.displayName, context);
                },
                set: function(val) {
                    setterFunctions['displayName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "friendlyName": {
                get: function() {
                    context["field"] = "friendlyName";
                    context["metadata"] = (objectMetadata ? objectMetadata["friendlyName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.friendlyName, context);
                },
                set: function(val) {
                    setterFunctions['friendlyName'].call(this, val, privateState);
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
            "isActive": {
                get: function() {
                    context["field"] = "isActive";
                    context["metadata"] = (objectMetadata ? objectMetadata["isActive"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isActive, context);
                },
                set: function(val) {
                    setterFunctions['isActive'].call(this, val, privateState);
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
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.displayName = value ? (value["displayName"] ? value["displayName"] : null) : null;
            privateState.friendlyName = value ? (value["friendlyName"] ? value["friendlyName"] : null) : null;
            privateState.errorCode = value ? (value["errorCode"] ? value["errorCode"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.isActive = value ? (value["isActive"] ? value["isActive"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Device);

    //Create new class level validator object
    BaseModel.Validator.call(Device);

    var registerValidatorBackup = Device.registerValidator;

    Device.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Device.isValid(this, propName, val)) {
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
    //For Operation 'registerNewDevice' with service id 'registerNewDevice9291'
     Device.registerNewDevice = function(params, onCompletion){
        return Device.customVerb('registerNewDevice', params, onCompletion);
     };

    //For Operation 'updateUserDeviceStatus' with service id 'updateUserDeviceStatus6309'
     Device.updateUserDeviceStatus = function(params, onCompletion){
        return Device.customVerb('updateUserDeviceStatus', params, onCompletion);
     };

    //For Operation 'fetch' with service id 'searchUser3702'
     Device.fetch = function(params, onCompletion){
        return Device.customVerb('fetch', params, onCompletion);
     };

    //For Operation 'updateMyDeviceStatus' with service id 'updateMyDeviceStatus5412'
     Device.updateMyDeviceStatus = function(params, onCompletion){
        return Device.customVerb('updateMyDeviceStatus', params, onCompletion);
     };

    //For Operation 'revokeMyDevice' with service id 'revokeMyDevice5587'
     Device.revokeMyDevice = function(params, onCompletion){
        return Device.customVerb('revokeMyDevice', params, onCompletion);
     };

    //For Operation 'getMyDevices' with service id 'getMyDevices4037'
     Device.getMyDevices = function(params, onCompletion){
        return Device.customVerb('getMyDevices', params, onCompletion);
     };

    //For Operation 'getUserDevices' with service id 'getUserDevices8825'
     Device.getUserDevices = function(params, onCompletion){
        return Device.customVerb('getUserDevices', params, onCompletion);
     };

    //For Operation 'revokeUserDevice' with service id 'revokeUserDevice6920'
     Device.revokeUserDevice = function(params, onCompletion){
        return Device.customVerb('revokeUserDevice', params, onCompletion);
     };

    var relations = [];

    Device.relations = relations;

    Device.prototype.isValid = function() {
        return Device.isValid(this);
    };

    Device.prototype.objModelName = "Device";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Device.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SCAActivationObjects", "Device", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Device.clone = function(objectToClone) {
        var clonedObj = new Device();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Device;
});