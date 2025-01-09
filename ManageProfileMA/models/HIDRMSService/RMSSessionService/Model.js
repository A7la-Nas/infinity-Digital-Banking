/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "RMSSessionService", "objectService" : "HIDRMSService"};

    var setterFunctions = {
        username: function(val, state) {
            context["field"] = "username";
            context["metadata"] = (objectMetadata ? objectMetadata["username"] : null);
            state['username'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        session: function(val, state) {
            context["field"] = "session";
            context["metadata"] = (objectMetadata ? objectMetadata["session"] : null);
            state['session'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function RMSSessionService(defaultValues) {
        var privateState = {};
        context["field"] = "username";
        context["metadata"] = (objectMetadata ? objectMetadata["username"] : null);
        privateState.username = defaultValues ?
            (defaultValues["username"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["username"], context) :
                null) :
            null;

        context["field"] = "session";
        context["metadata"] = (objectMetadata ? objectMetadata["session"] : null);
        privateState.session = defaultValues ?
            (defaultValues["session"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["session"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "username": {
                get: function() {
                    context["field"] = "username";
                    context["metadata"] = (objectMetadata ? objectMetadata["username"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.username, context);
                },
                set: function(val) {
                    setterFunctions['username'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "session": {
                get: function() {
                    context["field"] = "session";
                    context["metadata"] = (objectMetadata ? objectMetadata["session"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.session, context);
                },
                set: function(val) {
                    setterFunctions['session'].call(this, val, privateState);
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
            privateState.username = value ? (value["username"] ? value["username"] : null) : null;
            privateState.session = value ? (value["session"] ? value["session"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(RMSSessionService);

    //Create new class level validator object
    BaseModel.Validator.call(RMSSessionService);

    var registerValidatorBackup = RMSSessionService.registerValidator;

    RMSSessionService.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(RMSSessionService.isValid(this, propName, val)) {
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
    //For Operation 'sessionLogout' with service id 'sessionLogout5422'
     RMSSessionService.sessionLogout = function(params, onCompletion){
        return RMSSessionService.customVerb('sessionLogout', params, onCompletion);
     };

    var relations = [];

    RMSSessionService.relations = relations;

    RMSSessionService.prototype.isValid = function() {
        return RMSSessionService.isValid(this);
    };

    RMSSessionService.prototype.objModelName = "RMSSessionService";
    RMSSessionService.prototype.objServiceName = "HIDRMSService";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    RMSSessionService.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("HIDRMSService", "RMSSessionService", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    RMSSessionService.clone = function(objectToClone) {
        var clonedObj = new RMSSessionService();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return RMSSessionService;
});