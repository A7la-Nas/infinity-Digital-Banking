/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Campaigns", "objectService" : "CampaignEngine"};

    var setterFunctions = {
        eventCode: function(val, state) {
            context["field"] = "eventCode";
            context["metadata"] = (objectMetadata ? objectMetadata["eventCode"] : null);
            state['eventCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        placeholderCode: function(val, state) {
            context["field"] = "placeholderCode";
            context["metadata"] = (objectMetadata ? objectMetadata["placeholderCode"] : null);
            state['placeholderCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        scale: function(val, state) {
            context["field"] = "scale";
            context["metadata"] = (objectMetadata ? objectMetadata["scale"] : null);
            state['scale'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        campaignId: function(val, state) {
            context["field"] = "campaignId";
            context["metadata"] = (objectMetadata ? objectMetadata["campaignId"] : null);
            state['campaignId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Campaigns(defaultValues) {
        var privateState = {};
        context["field"] = "eventCode";
        context["metadata"] = (objectMetadata ? objectMetadata["eventCode"] : null);
        privateState.eventCode = defaultValues ?
            (defaultValues["eventCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["eventCode"], context) :
                null) :
            null;

        context["field"] = "placeholderCode";
        context["metadata"] = (objectMetadata ? objectMetadata["placeholderCode"] : null);
        privateState.placeholderCode = defaultValues ?
            (defaultValues["placeholderCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["placeholderCode"], context) :
                null) :
            null;

        context["field"] = "scale";
        context["metadata"] = (objectMetadata ? objectMetadata["scale"] : null);
        privateState.scale = defaultValues ?
            (defaultValues["scale"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["scale"], context) :
                null) :
            null;

        context["field"] = "campaignId";
        context["metadata"] = (objectMetadata ? objectMetadata["campaignId"] : null);
        privateState.campaignId = defaultValues ?
            (defaultValues["campaignId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["campaignId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "eventCode": {
                get: function() {
                    context["field"] = "eventCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["eventCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.eventCode, context);
                },
                set: function(val) {
                    setterFunctions['eventCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "placeholderCode": {
                get: function() {
                    context["field"] = "placeholderCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["placeholderCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.placeholderCode, context);
                },
                set: function(val) {
                    setterFunctions['placeholderCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "scale": {
                get: function() {
                    context["field"] = "scale";
                    context["metadata"] = (objectMetadata ? objectMetadata["scale"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.scale, context);
                },
                set: function(val) {
                    setterFunctions['scale'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "campaignId": {
                get: function() {
                    context["field"] = "campaignId";
                    context["metadata"] = (objectMetadata ? objectMetadata["campaignId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.campaignId, context);
                },
                set: function(val) {
                    setterFunctions['campaignId'].call(this, val, privateState);
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
            privateState.eventCode = value ? (value["eventCode"] ? value["eventCode"] : null) : null;
            privateState.placeholderCode = value ? (value["placeholderCode"] ? value["placeholderCode"] : null) : null;
            privateState.scale = value ? (value["scale"] ? value["scale"] : null) : null;
            privateState.campaignId = value ? (value["campaignId"] ? value["campaignId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Campaigns);

    //Create new class level validator object
    BaseModel.Validator.call(Campaigns);

    var registerValidatorBackup = Campaigns.registerValidator;

    Campaigns.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Campaigns.isValid(this, propName, val)) {
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
    //For Operation 'getCampaign' with service id 'getCampaigns1236'
     Campaigns.getCampaign = function(params, onCompletion){
        return Campaigns.customVerb('getCampaign', params, onCompletion);
     };

    //For Operation 'getPreLoginCampaigns' with service id 'getCampaigns7866'
     Campaigns.getPreLoginCampaigns = function(params, onCompletion){
        return Campaigns.customVerb('getPreLoginCampaigns', params, onCompletion);
     };

    var relations = [];

    Campaigns.relations = relations;

    Campaigns.prototype.isValid = function() {
        return Campaigns.isValid(this);
    };

    Campaigns.prototype.objModelName = "Campaigns";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Campaigns.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CampaignEngine", "Campaigns", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Campaigns.clone = function(objectToClone) {
        var clonedObj = new Campaigns();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Campaigns;
});