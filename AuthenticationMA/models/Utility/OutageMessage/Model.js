/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "OutageMessage", "objectService" : "Utility"};

    var setterFunctions = {
        createdby: function(val, state) {
            context["field"] = "createdby";
            context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
            state['createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageText: function(val, state) {
            context["field"] = "messageText";
            context["metadata"] = (objectMetadata ? objectMetadata["messageText"] : null);
            state['messageText'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modifiedby: function(val, state) {
            context["field"] = "modifiedby";
            context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
            state['modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        service_id: function(val, state) {
            context["field"] = "service_id";
            context["metadata"] = (objectMetadata ? objectMetadata["service_id"] : null);
            state['service_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status_id: function(val, state) {
            context["field"] = "status_id";
            context["metadata"] = (objectMetadata ? objectMetadata["status_id"] : null);
            state['status_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        outageMessageIds: function(val, state) {
            context["field"] = "outageMessageIds";
            context["metadata"] = (objectMetadata ? objectMetadata["outageMessageIds"] : null);
            state['outageMessageIds'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function OutageMessage(defaultValues) {
        var privateState = {};
        context["field"] = "createdby";
        context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
        privateState.createdby = defaultValues ?
            (defaultValues["createdby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context) :
                null) :
            null;

        context["field"] = "messageText";
        context["metadata"] = (objectMetadata ? objectMetadata["messageText"] : null);
        privateState.messageText = defaultValues ?
            (defaultValues["messageText"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageText"], context) :
                null) :
            null;

        context["field"] = "modifiedby";
        context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
        privateState.modifiedby = defaultValues ?
            (defaultValues["modifiedby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context) :
                null) :
            null;

        context["field"] = "service_id";
        context["metadata"] = (objectMetadata ? objectMetadata["service_id"] : null);
        privateState.service_id = defaultValues ?
            (defaultValues["service_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["service_id"], context) :
                null) :
            null;

        context["field"] = "status_id";
        context["metadata"] = (objectMetadata ? objectMetadata["status_id"] : null);
        privateState.status_id = defaultValues ?
            (defaultValues["status_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status_id"], context) :
                null) :
            null;

        context["field"] = "outageMessageIds";
        context["metadata"] = (objectMetadata ? objectMetadata["outageMessageIds"] : null);
        privateState.outageMessageIds = defaultValues ?
            (defaultValues["outageMessageIds"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["outageMessageIds"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "createdby": {
                get: function() {
                    context["field"] = "createdby";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdby, context);
                },
                set: function(val) {
                    setterFunctions['createdby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "messageText": {
                get: function() {
                    context["field"] = "messageText";
                    context["metadata"] = (objectMetadata ? objectMetadata["messageText"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messageText, context);
                },
                set: function(val) {
                    setterFunctions['messageText'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "modifiedby": {
                get: function() {
                    context["field"] = "modifiedby";
                    context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.modifiedby, context);
                },
                set: function(val) {
                    setterFunctions['modifiedby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "service_id": {
                get: function() {
                    context["field"] = "service_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["service_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.service_id, context);
                },
                set: function(val) {
                    setterFunctions['service_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "status_id": {
                get: function() {
                    context["field"] = "status_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["status_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.status_id, context);
                },
                set: function(val) {
                    setterFunctions['status_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "outageMessageIds": {
                get: function() {
                    context["field"] = "outageMessageIds";
                    context["metadata"] = (objectMetadata ? objectMetadata["outageMessageIds"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.outageMessageIds, context);
                },
                set: function(val) {
                    setterFunctions['outageMessageIds'].call(this, val, privateState);
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
            privateState.createdby = value ? (value["createdby"] ? value["createdby"] : null) : null;
            privateState.messageText = value ? (value["messageText"] ? value["messageText"] : null) : null;
            privateState.modifiedby = value ? (value["modifiedby"] ? value["modifiedby"] : null) : null;
            privateState.service_id = value ? (value["service_id"] ? value["service_id"] : null) : null;
            privateState.status_id = value ? (value["status_id"] ? value["status_id"] : null) : null;
            privateState.outageMessageIds = value ? (value["outageMessageIds"] ? value["outageMessageIds"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(OutageMessage);

    //Create new class level validator object
    BaseModel.Validator.call(OutageMessage);

    var registerValidatorBackup = OutageMessage.registerValidator;

    OutageMessage.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(OutageMessage.isValid(this, propName, val)) {
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
    //For Operation 'getOutageMessage' with service id 'getOutageMessage9185'
     OutageMessage.getOutageMessage = function(params, onCompletion){
        return OutageMessage.customVerb('getOutageMessage', params, onCompletion);
     };

    var relations = [];

    OutageMessage.relations = relations;

    OutageMessage.prototype.isValid = function() {
        return OutageMessage.isValid(this);
    };

    OutageMessage.prototype.objModelName = "OutageMessage";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    OutageMessage.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Utility", "OutageMessage", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    OutageMessage.clone = function(objectToClone) {
        var clonedObj = new OutageMessage();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return OutageMessage;
});