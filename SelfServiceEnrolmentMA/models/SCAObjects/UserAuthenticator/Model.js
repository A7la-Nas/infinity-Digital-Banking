/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "UserAuthenticator", "objectService" : "SCAObjects"};

    var setterFunctions = {
        display: function(val, state) {
            context["field"] = "display";
            context["metadata"] = (objectMetadata ? objectMetadata["display"] : null);
            state['display'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        value: function(val, state) {
            context["field"] = "value";
            context["metadata"] = (objectMetadata ? objectMetadata["value"] : null);
            state['value'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ref: function(val, state) {
            context["field"] = "ref";
            context["metadata"] = (objectMetadata ? objectMetadata["ref"] : null);
            state['ref'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function UserAuthenticator(defaultValues) {
        var privateState = {};
        context["field"] = "display";
        context["metadata"] = (objectMetadata ? objectMetadata["display"] : null);
        privateState.display = defaultValues ?
            (defaultValues["display"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["display"], context) :
                null) :
            null;

        context["field"] = "value";
        context["metadata"] = (objectMetadata ? objectMetadata["value"] : null);
        privateState.value = defaultValues ?
            (defaultValues["value"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["value"], context) :
                null) :
            null;

        context["field"] = "ref";
        context["metadata"] = (objectMetadata ? objectMetadata["ref"] : null);
        privateState.ref = defaultValues ?
            (defaultValues["ref"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ref"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "display": {
                get: function() {
                    context["field"] = "display";
                    context["metadata"] = (objectMetadata ? objectMetadata["display"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.display, context);
                },
                set: function(val) {
                    setterFunctions['display'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "value": {
                get: function() {
                    context["field"] = "value";
                    context["metadata"] = (objectMetadata ? objectMetadata["value"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.value, context);
                },
                set: function(val) {
                    setterFunctions['value'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ref": {
                get: function() {
                    context["field"] = "ref";
                    context["metadata"] = (objectMetadata ? objectMetadata["ref"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ref, context);
                },
                set: function(val) {
                    setterFunctions['ref'].call(this, val, privateState);
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
            privateState.display = value ? (value["display"] ? value["display"] : null) : null;
            privateState.value = value ? (value["value"] ? value["value"] : null) : null;
            privateState.ref = value ? (value["ref"] ? value["ref"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(UserAuthenticator);

    //Create new class level validator object
    BaseModel.Validator.call(UserAuthenticator);

    var registerValidatorBackup = UserAuthenticator.registerValidator;

    UserAuthenticator.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(UserAuthenticator.isValid(this, propName, val)) {
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
    var relations = [];

    UserAuthenticator.relations = relations;

    UserAuthenticator.prototype.isValid = function() {
        return UserAuthenticator.isValid(this);
    };

    UserAuthenticator.prototype.objModelName = "UserAuthenticator";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    UserAuthenticator.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SCAObjects", "UserAuthenticator", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    UserAuthenticator.clone = function(objectToClone) {
        var clonedObj = new UserAuthenticator();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return UserAuthenticator;
});