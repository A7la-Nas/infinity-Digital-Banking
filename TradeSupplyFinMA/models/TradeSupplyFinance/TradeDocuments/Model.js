/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "TradeDocuments", "objectService" : "TradeSupplyFinance"};

    var setterFunctions = {
        uploadedattachments: function(val, state) {
            context["field"] = "uploadedattachments";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedattachments"] : null);
            state['uploadedattachments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        successfulUploads: function(val, state) {
            context["field"] = "successfulUploads";
            context["metadata"] = (objectMetadata ? objectMetadata["successfulUploads"] : null);
            state['successfulUploads'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        failedUploads: function(val, state) {
            context["field"] = "failedUploads";
            context["metadata"] = (objectMetadata ? objectMetadata["failedUploads"] : null);
            state['failedUploads'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileName: function(val, state) {
            context["field"] = "fileName";
            context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
            state['fileName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileNames: function(val, state) {
            context["field"] = "fileNames";
            context["metadata"] = (objectMetadata ? objectMetadata["fileNames"] : null);
            state['fileNames'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileContent: function(val, state) {
            context["field"] = "fileContent";
            context["metadata"] = (objectMetadata ? objectMetadata["fileContent"] : null);
            state['fileContent'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function TradeDocuments(defaultValues) {
        var privateState = {};
        context["field"] = "uploadedattachments";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedattachments"] : null);
        privateState.uploadedattachments = defaultValues ?
            (defaultValues["uploadedattachments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedattachments"], context) :
                null) :
            null;

        context["field"] = "successfulUploads";
        context["metadata"] = (objectMetadata ? objectMetadata["successfulUploads"] : null);
        privateState.successfulUploads = defaultValues ?
            (defaultValues["successfulUploads"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["successfulUploads"], context) :
                null) :
            null;

        context["field"] = "failedUploads";
        context["metadata"] = (objectMetadata ? objectMetadata["failedUploads"] : null);
        privateState.failedUploads = defaultValues ?
            (defaultValues["failedUploads"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["failedUploads"], context) :
                null) :
            null;

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
                null) :
            null;

        context["field"] = "fileName";
        context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
        privateState.fileName = defaultValues ?
            (defaultValues["fileName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileName"], context) :
                null) :
            null;

        context["field"] = "fileNames";
        context["metadata"] = (objectMetadata ? objectMetadata["fileNames"] : null);
        privateState.fileNames = defaultValues ?
            (defaultValues["fileNames"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileNames"], context) :
                null) :
            null;

        context["field"] = "fileContent";
        context["metadata"] = (objectMetadata ? objectMetadata["fileContent"] : null);
        privateState.fileContent = defaultValues ?
            (defaultValues["fileContent"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileContent"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "uploadedattachments": {
                get: function() {
                    context["field"] = "uploadedattachments";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadedattachments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadedattachments, context);
                },
                set: function(val) {
                    setterFunctions['uploadedattachments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "successfulUploads": {
                get: function() {
                    context["field"] = "successfulUploads";
                    context["metadata"] = (objectMetadata ? objectMetadata["successfulUploads"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.successfulUploads, context);
                },
                set: function(val) {
                    setterFunctions['successfulUploads'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "failedUploads": {
                get: function() {
                    context["field"] = "failedUploads";
                    context["metadata"] = (objectMetadata ? objectMetadata["failedUploads"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.failedUploads, context);
                },
                set: function(val) {
                    setterFunctions['failedUploads'].call(this, val, privateState);
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
            "fileName": {
                get: function() {
                    context["field"] = "fileName";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileName, context);
                },
                set: function(val) {
                    setterFunctions['fileName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileNames": {
                get: function() {
                    context["field"] = "fileNames";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileNames"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileNames, context);
                },
                set: function(val) {
                    setterFunctions['fileNames'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileContent": {
                get: function() {
                    context["field"] = "fileContent";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileContent"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileContent, context);
                },
                set: function(val) {
                    setterFunctions['fileContent'].call(this, val, privateState);
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
            privateState.uploadedattachments = value ? (value["uploadedattachments"] ? value["uploadedattachments"] : null) : null;
            privateState.successfulUploads = value ? (value["successfulUploads"] ? value["successfulUploads"] : null) : null;
            privateState.failedUploads = value ? (value["failedUploads"] ? value["failedUploads"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
            privateState.fileName = value ? (value["fileName"] ? value["fileName"] : null) : null;
            privateState.fileNames = value ? (value["fileNames"] ? value["fileNames"] : null) : null;
            privateState.fileContent = value ? (value["fileContent"] ? value["fileContent"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(TradeDocuments);

    //Create new class level validator object
    BaseModel.Validator.call(TradeDocuments);

    var registerValidatorBackup = TradeDocuments.registerValidator;

    TradeDocuments.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(TradeDocuments.isValid(this, propName, val)) {
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
    //For Operation 'downloadDocument' with service id 'DownloadDocument9479'
     TradeDocuments.downloadDocument = function(params, onCompletion){
        return TradeDocuments.customVerb('downloadDocument', params, onCompletion);
     };

    //For Operation 'deleteDocument' with service id 'DeleteDocument2086'
     TradeDocuments.deleteDocument = function(params, onCompletion){
        return TradeDocuments.customVerb('deleteDocument', params, onCompletion);
     };

    //For Operation 'uploadDocument' with service id 'UploadDocuments3920'
     TradeDocuments.uploadDocument = function(params, onCompletion){
        return TradeDocuments.customVerb('uploadDocument', params, onCompletion);
     };

    var relations = [];

    TradeDocuments.relations = relations;

    TradeDocuments.prototype.isValid = function() {
        return TradeDocuments.isValid(this);
    };

    TradeDocuments.prototype.objModelName = "TradeDocuments";
    TradeDocuments.prototype.objServiceName = "TradeSupplyFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    TradeDocuments.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeSupplyFinance", "TradeDocuments", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    TradeDocuments.clone = function(objectToClone) {
        var clonedObj = new TradeDocuments();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return TradeDocuments;
});