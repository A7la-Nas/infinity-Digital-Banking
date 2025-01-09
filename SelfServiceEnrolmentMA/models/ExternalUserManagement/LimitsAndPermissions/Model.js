/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "LimitsAndPermissions", "objectService" : "ExternalUserManagement"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actionLimits: function(val, state) {
            context["field"] = "actionLimits";
            context["metadata"] = (objectMetadata ? objectMetadata["actionLimits"] : null);
            state['actionLimits'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        removedActions: function(val, state) {
            context["field"] = "removedActions";
            context["metadata"] = (objectMetadata ? objectMetadata["removedActions"] : null);
            state['removedActions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function LimitsAndPermissions(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "actionLimits";
        context["metadata"] = (objectMetadata ? objectMetadata["actionLimits"] : null);
        privateState.actionLimits = defaultValues ?
            (defaultValues["actionLimits"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actionLimits"], context) :
                null) :
            null;

        context["field"] = "removedActions";
        context["metadata"] = (objectMetadata ? objectMetadata["removedActions"] : null);
        privateState.removedActions = defaultValues ?
            (defaultValues["removedActions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["removedActions"], context) :
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
            "actionLimits": {
                get: function() {
                    context["field"] = "actionLimits";
                    context["metadata"] = (objectMetadata ? objectMetadata["actionLimits"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actionLimits, context);
                },
                set: function(val) {
                    setterFunctions['actionLimits'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "removedActions": {
                get: function() {
                    context["field"] = "removedActions";
                    context["metadata"] = (objectMetadata ? objectMetadata["removedActions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.removedActions, context);
                },
                set: function(val) {
                    setterFunctions['removedActions'].call(this, val, privateState);
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
            privateState.actionLimits = value ? (value["actionLimits"] ? value["actionLimits"] : null) : null;
            privateState.removedActions = value ? (value["removedActions"] ? value["removedActions"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(LimitsAndPermissions);

    //Create new class level validator object
    BaseModel.Validator.call(LimitsAndPermissions);

    var registerValidatorBackup = LimitsAndPermissions.registerValidator;

    LimitsAndPermissions.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(LimitsAndPermissions.isValid(this, propName, val)) {
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
    //For Operation 'updateCustomerRoleLimitsAndPermissions' with service id 'updateCustomerRoleLimitsAndPermissions2301'
     LimitsAndPermissions.updateCustomerRoleLimitsAndPermissions = function(params, onCompletion){
        return LimitsAndPermissions.customVerb('updateCustomerRoleLimitsAndPermissions', params, onCompletion);
     };

    //For Operation 'updateServiceDefinitionLimitsAndPermissions' with service id 'updateServiceDefinitionLimitsAndPermissions3569'
     LimitsAndPermissions.updateServiceDefinitionLimitsAndPermissions = function(params, onCompletion){
        return LimitsAndPermissions.customVerb('updateServiceDefinitionLimitsAndPermissions', params, onCompletion);
     };

    var relations = [];

    LimitsAndPermissions.relations = relations;

    LimitsAndPermissions.prototype.isValid = function() {
        return LimitsAndPermissions.isValid(this);
    };

    LimitsAndPermissions.prototype.objModelName = "LimitsAndPermissions";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    LimitsAndPermissions.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ExternalUserManagement", "LimitsAndPermissions", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    LimitsAndPermissions.clone = function(objectToClone) {
        var clonedObj = new LimitsAndPermissions();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return LimitsAndPermissions;
});