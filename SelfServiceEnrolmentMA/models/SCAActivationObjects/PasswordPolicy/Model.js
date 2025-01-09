/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PasswordPolicy", "objectService" : "SCAActivationObjects"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        PasswordPolicy: function(val, state) {
            context["field"] = "PasswordPolicy";
            context["metadata"] = (objectMetadata ? objectMetadata["PasswordPolicy"] : null);
            state['PasswordPolicy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PasswordPolicy(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "PasswordPolicy";
        context["metadata"] = (objectMetadata ? objectMetadata["PasswordPolicy"] : null);
        privateState.PasswordPolicy = defaultValues ?
            (defaultValues["PasswordPolicy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["PasswordPolicy"], context) :
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
            "PasswordPolicy": {
                get: function() {
                    context["field"] = "PasswordPolicy";
                    context["metadata"] = (objectMetadata ? objectMetadata["PasswordPolicy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.PasswordPolicy, context);
                },
                set: function(val) {
                    setterFunctions['PasswordPolicy'].call(this, val, privateState);
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
            privateState.PasswordPolicy = value ? (value["PasswordPolicy"] ? value["PasswordPolicy"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PasswordPolicy);

    //Create new class level validator object
    BaseModel.Validator.call(PasswordPolicy);

    var registerValidatorBackup = PasswordPolicy.registerValidator;

    PasswordPolicy.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PasswordPolicy.isValid(this, propName, val)) {
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
    //For Operation 'fetch' with service id 'getPasswordPolicy4599'
     PasswordPolicy.fetch = function(params, onCompletion){
        return PasswordPolicy.customVerb('fetch', params, onCompletion);
     };

    var relations = [];

    PasswordPolicy.relations = relations;

    PasswordPolicy.prototype.isValid = function() {
        return PasswordPolicy.isValid(this);
    };

    PasswordPolicy.prototype.objModelName = "PasswordPolicy";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PasswordPolicy.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SCAActivationObjects", "PasswordPolicy", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PasswordPolicy.clone = function(objectToClone) {
        var clonedObj = new PasswordPolicy();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PasswordPolicy;
});