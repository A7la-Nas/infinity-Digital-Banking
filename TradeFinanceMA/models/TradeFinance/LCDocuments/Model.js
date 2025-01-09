/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "LCDocuments", "objectService" : "TradeFinance"};

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
        documentReference: function(val, state) {
            context["field"] = "documentReference";
            context["metadata"] = (objectMetadata ? objectMetadata["documentReference"] : null);
            state['documentReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    function LCDocuments(defaultValues) {
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

        context["field"] = "documentReference";
        context["metadata"] = (objectMetadata ? objectMetadata["documentReference"] : null);
        privateState.documentReference = defaultValues ?
            (defaultValues["documentReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentReference"], context) :
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
            "documentReference": {
                get: function() {
                    context["field"] = "documentReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentReference, context);
                },
                set: function(val) {
                    setterFunctions['documentReference'].call(this, val, privateState);
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
            privateState.documentReference = value ? (value["documentReference"] ? value["documentReference"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
            privateState.fileName = value ? (value["fileName"] ? value["fileName"] : null) : null;
            privateState.fileNames = value ? (value["fileNames"] ? value["fileNames"] : null) : null;
            privateState.fileContent = value ? (value["fileContent"] ? value["fileContent"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(LCDocuments);

    //Create new class level validator object
    BaseModel.Validator.call(LCDocuments);

    var registerValidatorBackup = LCDocuments.registerValidator;

    LCDocuments.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(LCDocuments.isValid(this, propName, val)) {
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
    //For Operation 'retrieveDocuments' with service id 'RetrieveDrawingDocuments3732'
     LCDocuments.retrieveDocuments = function(params, onCompletion){
        return LCDocuments.customVerb('retrieveDocuments', params, onCompletion);
     };

    //For Operation 'downloadDocument' with service id 'downloadDocument9618'
     LCDocuments.downloadDocument = function(params, onCompletion){
        return LCDocuments.customVerb('downloadDocument', params, onCompletion);
     };

    //For Operation 'deleteDocument' with service id 'deleteDrawingDocument9860'
     LCDocuments.deleteDocument = function(params, onCompletion){
        return LCDocuments.customVerb('deleteDocument', params, onCompletion);
     };

    //For Operation 'uploadDocument' with service id 'DrawingUploadDocuments4485'
     LCDocuments.uploadDocument = function(params, onCompletion){
        return LCDocuments.customVerb('uploadDocument', params, onCompletion);
     };

    var relations = [];

    LCDocuments.relations = relations;

    LCDocuments.prototype.isValid = function() {
        return LCDocuments.isValid(this);
    };

    LCDocuments.prototype.objModelName = "LCDocuments";
    LCDocuments.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    LCDocuments.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "LCDocuments", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    LCDocuments.clone = function(objectToClone) {
        var clonedObj = new LCDocuments();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return LCDocuments;
});