/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "TrackDeviceRegistration", "objectService" : "Login"};

    var setterFunctions = {
        UserName: function(val, state) {
            context["field"] = "UserName";
            context["metadata"] = (objectMetadata ? objectMetadata["UserName"] : null);
            state['UserName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isRegistered: function(val, state) {
            context["field"] = "isRegistered";
            context["metadata"] = (objectMetadata ? objectMetadata["isRegistered"] : null);
            state['isRegistered'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function TrackDeviceRegistration(defaultValues) {
        var privateState = {};
        context["field"] = "UserName";
        context["metadata"] = (objectMetadata ? objectMetadata["UserName"] : null);
        privateState.UserName = defaultValues ?
            (defaultValues["UserName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UserName"], context) :
                null) :
            null;

        context["field"] = "isRegistered";
        context["metadata"] = (objectMetadata ? objectMetadata["isRegistered"] : null);
        privateState.isRegistered = defaultValues ?
            (defaultValues["isRegistered"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isRegistered"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "isRegistered": {
                get: function() {
                    context["field"] = "isRegistered";
                    context["metadata"] = (objectMetadata ? objectMetadata["isRegistered"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isRegistered, context);
                },
                set: function(val) {
                    setterFunctions['isRegistered'].call(this, val, privateState);
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
            privateState.UserName = value ? (value["UserName"] ? value["UserName"] : null) : null;
            privateState.isRegistered = value ? (value["isRegistered"] ? value["isRegistered"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(TrackDeviceRegistration);

    //Create new class level validator object
    BaseModel.Validator.call(TrackDeviceRegistration);

    var registerValidatorBackup = TrackDeviceRegistration.registerValidator;

    TrackDeviceRegistration.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(TrackDeviceRegistration.isValid(this, propName, val)) {
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
    //For Operation 'trackDeviceRegistration' with service id 'trackRegisterCustomerDevice4571'
     TrackDeviceRegistration.trackDeviceRegistration = function(params, onCompletion){
        return TrackDeviceRegistration.customVerb('trackDeviceRegistration', params, onCompletion);
     };

    var relations = [];

    TrackDeviceRegistration.relations = relations;

    TrackDeviceRegistration.prototype.isValid = function() {
        return TrackDeviceRegistration.isValid(this);
    };

    TrackDeviceRegistration.prototype.objModelName = "TrackDeviceRegistration";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    TrackDeviceRegistration.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Login", "TrackDeviceRegistration", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    TrackDeviceRegistration.clone = function(objectToClone) {
        var clonedObj = new TrackDeviceRegistration();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return TrackDeviceRegistration;
});