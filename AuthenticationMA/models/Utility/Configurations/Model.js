/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Configurations", "objectService" : "Utility"};

    var setterFunctions = {
        key: function(val, state) {
            context["field"] = "key";
            context["metadata"] = (objectMetadata ? objectMetadata["key"] : null);
            state['key'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        value: function(val, state) {
            context["field"] = "value";
            context["metadata"] = (objectMetadata ? objectMetadata["value"] : null);
            state['value'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        configuration_id: function(val, state) {
            context["field"] = "configuration_id";
            context["metadata"] = (objectMetadata ? objectMetadata["configuration_id"] : null);
            state['configuration_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tncTimeStamp: function(val, state) {
            context["field"] = "tncTimeStamp";
            context["metadata"] = (objectMetadata ? objectMetadata["tncTimeStamp"] : null);
            state['tncTimeStamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Configurations(defaultValues) {
        var privateState = {};
        context["field"] = "key";
        context["metadata"] = (objectMetadata ? objectMetadata["key"] : null);
        privateState.key = defaultValues ?
            (defaultValues["key"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["key"], context) :
                null) :
            null;

        context["field"] = "value";
        context["metadata"] = (objectMetadata ? objectMetadata["value"] : null);
        privateState.value = defaultValues ?
            (defaultValues["value"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["value"], context) :
                null) :
            null;

        context["field"] = "configuration_id";
        context["metadata"] = (objectMetadata ? objectMetadata["configuration_id"] : null);
        privateState.configuration_id = defaultValues ?
            (defaultValues["configuration_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["configuration_id"], context) :
                null) :
            null;

        context["field"] = "tncTimeStamp";
        context["metadata"] = (objectMetadata ? objectMetadata["tncTimeStamp"] : null);
        privateState.tncTimeStamp = defaultValues ?
            (defaultValues["tncTimeStamp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tncTimeStamp"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "key": {
                get: function() {
                    context["field"] = "key";
                    context["metadata"] = (objectMetadata ? objectMetadata["key"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.key, context);
                },
                set: function(val) {
                    setterFunctions['key'].call(this, val, privateState);
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
            "configuration_id": {
                get: function() {
                    context["field"] = "configuration_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["configuration_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.configuration_id, context);
                },
                set: function(val) {
                    setterFunctions['configuration_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tncTimeStamp": {
                get: function() {
                    context["field"] = "tncTimeStamp";
                    context["metadata"] = (objectMetadata ? objectMetadata["tncTimeStamp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tncTimeStamp, context);
                },
                set: function(val) {
                    setterFunctions['tncTimeStamp'].call(this, val, privateState);
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
            privateState.key = value ? (value["key"] ? value["key"] : null) : null;
            privateState.value = value ? (value["value"] ? value["value"] : null) : null;
            privateState.configuration_id = value ? (value["configuration_id"] ? value["configuration_id"] : null) : null;
            privateState.tncTimeStamp = value ? (value["tncTimeStamp"] ? value["tncTimeStamp"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Configurations);

    //Create new class level validator object
    BaseModel.Validator.call(Configurations);

    var registerValidatorBackup = Configurations.registerValidator;

    Configurations.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Configurations.isValid(this, propName, val)) {
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
    //For Operation 'getSystemConfigurations' with service id 'GetConfigurations9010'
     Configurations.getSystemConfigurations = function(params, onCompletion){
        return Configurations.customVerb('getSystemConfigurations', params, onCompletion);
     };

    var relations = [];

    Configurations.relations = relations;

    Configurations.prototype.isValid = function() {
        return Configurations.isValid(this);
    };

    Configurations.prototype.objModelName = "Configurations";
    Configurations.prototype.objServiceName = "Utility";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Configurations.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Utility", "Configurations", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Configurations.clone = function(objectToClone) {
        var clonedObj = new Configurations();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Configurations;
});