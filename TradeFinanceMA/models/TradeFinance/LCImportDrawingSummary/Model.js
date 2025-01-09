/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "LCImportDrawingSummary", "objectService" : "TradeFinance"};

    var setterFunctions = {
        drawingsSrmsReqOrderID: function(val, state) {
            context["field"] = "drawingsSrmsReqOrderID";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingsSrmsReqOrderID"] : null);
            state['drawingsSrmsReqOrderID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function LCImportDrawingSummary(defaultValues) {
        var privateState = {};
        context["field"] = "drawingsSrmsReqOrderID";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingsSrmsReqOrderID"] : null);
        privateState.drawingsSrmsReqOrderID = defaultValues ?
            (defaultValues["drawingsSrmsReqOrderID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingsSrmsReqOrderID"], context) :
                null) :
            null;

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "drawingsSrmsReqOrderID": {
                get: function() {
                    context["field"] = "drawingsSrmsReqOrderID";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingsSrmsReqOrderID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingsSrmsReqOrderID, context);
                },
                set: function(val) {
                    setterFunctions['drawingsSrmsReqOrderID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileId": {
                get: function() {
                    context["field"] = "fileId";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileId, context);
                },
                set: function(val) {
                    setterFunctions['fileId'].call(this, val, privateState);
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
            privateState.drawingsSrmsReqOrderID = value ? (value["drawingsSrmsReqOrderID"] ? value["drawingsSrmsReqOrderID"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(LCImportDrawingSummary);

    //Create new class level validator object
    BaseModel.Validator.call(LCImportDrawingSummary);

    var registerValidatorBackup = LCImportDrawingSummary.registerValidator;

    LCImportDrawingSummary.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(LCImportDrawingSummary.isValid(this, propName, val)) {
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
    //For Operation 'generate' with service id 'generate3674'
     LCImportDrawingSummary.generate = function(params, onCompletion){
        return LCImportDrawingSummary.customVerb('generate', params, onCompletion);
     };

    var relations = [];

    LCImportDrawingSummary.relations = relations;

    LCImportDrawingSummary.prototype.isValid = function() {
        return LCImportDrawingSummary.isValid(this);
    };

    LCImportDrawingSummary.prototype.objModelName = "LCImportDrawingSummary";
    LCImportDrawingSummary.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    LCImportDrawingSummary.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "LCImportDrawingSummary", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    LCImportDrawingSummary.clone = function(objectToClone) {
        var clonedObj = new LCImportDrawingSummary();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return LCImportDrawingSummary;
});