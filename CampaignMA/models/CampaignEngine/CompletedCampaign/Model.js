/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CompletedCampaign", "objectService" : "CampaignEngine"};

    var setterFunctions = {
        campaignId: function(val, state) {
            context["field"] = "campaignId";
            context["metadata"] = (objectMetadata ? objectMetadata["campaignId"] : null);
            state['campaignId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function CompletedCampaign(defaultValues) {
        var privateState = {};
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
            privateState.campaignId = value ? (value["campaignId"] ? value["campaignId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(CompletedCampaign);

    //Create new class level validator object
    BaseModel.Validator.call(CompletedCampaign);

    var registerValidatorBackup = CompletedCampaign.registerValidator;

    CompletedCampaign.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CompletedCampaign.isValid(this, propName, val)) {
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

    CompletedCampaign.relations = relations;

    CompletedCampaign.prototype.isValid = function() {
        return CompletedCampaign.isValid(this);
    };

    CompletedCampaign.prototype.objModelName = "CompletedCampaign";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CompletedCampaign.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CampaignEngine", "CompletedCampaign", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CompletedCampaign.clone = function(objectToClone) {
        var clonedObj = new CompletedCampaign();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CompletedCampaign;
});