/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "AuthStatus", "objectService" : "SCAObjects"};

    var setterFunctions = {
        auth_req_id: function(val, state) {
            context["field"] = "auth_req_id";
            context["metadata"] = (objectMetadata ? objectMetadata["auth_req_id"] : null);
            state['auth_req_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function AuthStatus(defaultValues) {
        var privateState = {};
        context["field"] = "auth_req_id";
        context["metadata"] = (objectMetadata ? objectMetadata["auth_req_id"] : null);
        privateState.auth_req_id = defaultValues ?
            (defaultValues["auth_req_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["auth_req_id"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "auth_req_id": {
                get: function() {
                    context["field"] = "auth_req_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["auth_req_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.auth_req_id, context);
                },
                set: function(val) {
                    setterFunctions['auth_req_id'].call(this, val, privateState);
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
            privateState.auth_req_id = value ? (value["auth_req_id"] ? value["auth_req_id"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(AuthStatus);

    //Create new class level validator object
    BaseModel.Validator.call(AuthStatus);

    var registerValidatorBackup = AuthStatus.registerValidator;

    AuthStatus.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(AuthStatus.isValid(this, propName, val)) {
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
    //For Operation 'fetch' with service id 'getCIBAApprovalStatus9850'
     AuthStatus.fetch = function(params, onCompletion){
        return AuthStatus.customVerb('fetch', params, onCompletion);
     };

    var relations = [];

    AuthStatus.relations = relations;

    AuthStatus.prototype.isValid = function() {
        return AuthStatus.isValid(this);
    };

    AuthStatus.prototype.objModelName = "AuthStatus";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    AuthStatus.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SCAObjects", "AuthStatus", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    AuthStatus.clone = function(objectToClone) {
        var clonedObj = new AuthStatus();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return AuthStatus;
});