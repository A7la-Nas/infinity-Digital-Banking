/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "SCASearchUser", "objectService" : "SCAObjects"};

    var setterFunctions = {
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        username: function(val, state) {
            context["field"] = "username";
            context["metadata"] = (objectMetadata ? objectMetadata["username"] : null);
            state['username'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        authenticationMethod: function(val, state) {
            context["field"] = "authenticationMethod";
            context["metadata"] = (objectMetadata ? objectMetadata["authenticationMethod"] : null);
            state['authenticationMethod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function SCASearchUser(defaultValues) {
        var privateState = {};
        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "username";
        context["metadata"] = (objectMetadata ? objectMetadata["username"] : null);
        privateState.username = defaultValues ?
            (defaultValues["username"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["username"], context) :
                null) :
            null;

        context["field"] = "authenticationMethod";
        context["metadata"] = (objectMetadata ? objectMetadata["authenticationMethod"] : null);
        privateState.authenticationMethod = defaultValues ?
            (defaultValues["authenticationMethod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["authenticationMethod"], context) :
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
            "authenticationMethod": {
                get: function() {
                    context["field"] = "authenticationMethod";
                    context["metadata"] = (objectMetadata ? objectMetadata["authenticationMethod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.authenticationMethod, context);
                },
                set: function(val) {
                    setterFunctions['authenticationMethod'].call(this, val, privateState);
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
            privateState.username = value ? (value["username"] ? value["username"] : null) : null;
            privateState.authenticationMethod = value ? (value["authenticationMethod"] ? value["authenticationMethod"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(SCASearchUser);

    //Create new class level validator object
    BaseModel.Validator.call(SCASearchUser);

    var registerValidatorBackup = SCASearchUser.registerValidator;

    SCASearchUser.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(SCASearchUser.isValid(this, propName, val)) {
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
    //For Operation 'verifyUserId' with service id 'searchUser5607'
     SCASearchUser.verifyUserId = function(params, onCompletion){
        return SCASearchUser.customVerb('verifyUserId', params, onCompletion);
     };

    //For Operation 'getPasswordAuthenticator' with service id 'getPasswordAuthenticator7060'
     SCASearchUser.getPasswordAuthenticator = function(params, onCompletion){
        return SCASearchUser.customVerb('getPasswordAuthenticator', params, onCompletion);
     };

    var relations = [];

    SCASearchUser.relations = relations;

    SCASearchUser.prototype.isValid = function() {
        return SCASearchUser.isValid(this);
    };

    SCASearchUser.prototype.objModelName = "SCASearchUser";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    SCASearchUser.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SCAObjects", "SCASearchUser", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    SCASearchUser.clone = function(objectToClone) {
        var clonedObj = new SCASearchUser();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return SCASearchUser;
});