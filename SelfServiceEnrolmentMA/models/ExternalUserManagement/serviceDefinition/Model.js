/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "serviceDefinition", "objectService" : "ExternalUserManagement"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceDefinitionId: function(val, state) {
            context["field"] = "serviceDefinitionId";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionId"] : null);
            state['serviceDefinitionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        groupId: function(val, state) {
            context["field"] = "groupId";
            context["metadata"] = (objectMetadata ? objectMetadata["groupId"] : null);
            state['groupId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function serviceDefinition(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "serviceDefinitionId";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionId"] : null);
        privateState.serviceDefinitionId = defaultValues ?
            (defaultValues["serviceDefinitionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceDefinitionId"], context) :
                null) :
            null;

        context["field"] = "groupId";
        context["metadata"] = (objectMetadata ? objectMetadata["groupId"] : null);
        privateState.groupId = defaultValues ?
            (defaultValues["groupId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["groupId"], context) :
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
            "serviceDefinitionId": {
                get: function() {
                    context["field"] = "serviceDefinitionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceDefinitionId, context);
                },
                set: function(val) {
                    setterFunctions['serviceDefinitionId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "groupId": {
                get: function() {
                    context["field"] = "groupId";
                    context["metadata"] = (objectMetadata ? objectMetadata["groupId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.groupId, context);
                },
                set: function(val) {
                    setterFunctions['groupId'].call(this, val, privateState);
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
            privateState.serviceDefinitionId = value ? (value["serviceDefinitionId"] ? value["serviceDefinitionId"] : null) : null;
            privateState.groupId = value ? (value["groupId"] ? value["groupId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(serviceDefinition);

    //Create new class level validator object
    BaseModel.Validator.call(serviceDefinition);

    var registerValidatorBackup = serviceDefinition.registerValidator;

    serviceDefinition.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(serviceDefinition.isValid(this, propName, val)) {
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
    //For Operation 'getServiceDefinitionsForContracts' with service id 'GetServiceDefinitionsForContracts3644'
     serviceDefinition.getServiceDefinitionsForContracts = function(params, onCompletion){
        return serviceDefinition.customVerb('getServiceDefinitionsForContracts', params, onCompletion);
     };

    //For Operation 'getServicedefinitionAndRoleFeatures' with service id 'GetServicedefinitionAndRoleFeatures2305'
     serviceDefinition.getServicedefinitionAndRoleFeatures = function(params, onCompletion){
        return serviceDefinition.customVerb('getServicedefinitionAndRoleFeatures', params, onCompletion);
     };

    //For Operation 'getServiceDefinitionRoles' with service id 'GetServiceDefinitionRoles4199'
     serviceDefinition.getServiceDefinitionRoles = function(params, onCompletion){
        return serviceDefinition.customVerb('getServiceDefinitionRoles', params, onCompletion);
     };

    var relations = [];

    serviceDefinition.relations = relations;

    serviceDefinition.prototype.isValid = function() {
        return serviceDefinition.isValid(this);
    };

    serviceDefinition.prototype.objModelName = "serviceDefinition";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    serviceDefinition.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ExternalUserManagement", "serviceDefinition", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    serviceDefinition.clone = function(objectToClone) {
        var clonedObj = new serviceDefinition();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return serviceDefinition;
});