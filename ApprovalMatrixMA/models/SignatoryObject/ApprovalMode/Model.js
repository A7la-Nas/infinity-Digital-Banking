/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ApprovalMode", "objectService" : "SignatoryObject"};

    var setterFunctions = {
        coreCustomerId: function(val, state) {
            context["field"] = "coreCustomerId";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
            state['coreCustomerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contractId: function(val, state) {
            context["field"] = "contractId";
            context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
            state['contractId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isGroupLevel: function(val, state) {
            context["field"] = "isGroupLevel";
            context["metadata"] = (objectMetadata ? objectMetadata["isGroupLevel"] : null);
            state['isGroupLevel'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ApprovalMode(defaultValues) {
        var privateState = {};
        context["field"] = "coreCustomerId";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
        privateState.coreCustomerId = defaultValues ?
            (defaultValues["coreCustomerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerId"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "contractId";
        context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
        privateState.contractId = defaultValues ?
            (defaultValues["contractId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contractId"], context) :
                null) :
            null;

        context["field"] = "isGroupLevel";
        context["metadata"] = (objectMetadata ? objectMetadata["isGroupLevel"] : null);
        privateState.isGroupLevel = defaultValues ?
            (defaultValues["isGroupLevel"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isGroupLevel"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "coreCustomerId": {
                get: function() {
                    context["field"] = "coreCustomerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.coreCustomerId, context);
                },
                set: function(val) {
                    setterFunctions['coreCustomerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "contractId": {
                get: function() {
                    context["field"] = "contractId";
                    context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contractId, context);
                },
                set: function(val) {
                    setterFunctions['contractId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isGroupLevel": {
                get: function() {
                    context["field"] = "isGroupLevel";
                    context["metadata"] = (objectMetadata ? objectMetadata["isGroupLevel"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isGroupLevel, context);
                },
                set: function(val) {
                    setterFunctions['isGroupLevel'].call(this, val, privateState);
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
            privateState.coreCustomerId = value ? (value["coreCustomerId"] ? value["coreCustomerId"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.contractId = value ? (value["contractId"] ? value["contractId"] : null) : null;
            privateState.isGroupLevel = value ? (value["isGroupLevel"] ? value["isGroupLevel"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ApprovalMode);

    //Create new class level validator object
    BaseModel.Validator.call(ApprovalMode);

    var registerValidatorBackup = ApprovalMode.registerValidator;

    ApprovalMode.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ApprovalMode.isValid(this, propName, val)) {
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
    //For Operation 'updateApprovalMode' with service id 'updateApprovalMode3669'
     ApprovalMode.updateApprovalMode = function(params, onCompletion){
        return ApprovalMode.customVerb('updateApprovalMode', params, onCompletion);
     };

    //For Operation 'fetchApprovalMode' with service id 'fetchApprovalMode9772'
     ApprovalMode.fetchApprovalMode = function(params, onCompletion){
        return ApprovalMode.customVerb('fetchApprovalMode', params, onCompletion);
     };

    //For Operation 'deleteApprovalMode' with service id 'deleteApprovalMode3113'
     ApprovalMode.deleteApprovalMode = function(params, onCompletion){
        return ApprovalMode.customVerb('deleteApprovalMode', params, onCompletion);
     };

    var relations = [];

    ApprovalMode.relations = relations;

    ApprovalMode.prototype.isValid = function() {
        return ApprovalMode.isValid(this);
    };

    ApprovalMode.prototype.objModelName = "ApprovalMode";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ApprovalMode.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SignatoryObject", "ApprovalMode", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ApprovalMode.clone = function(objectToClone) {
        var clonedObj = new ApprovalMode();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ApprovalMode;
});