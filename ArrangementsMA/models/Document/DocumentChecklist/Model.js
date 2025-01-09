/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "DocumentChecklist", "objectService" : "Document"};

    var setterFunctions = {
    };

    //Create the Model Class
    function DocumentChecklist(defaultValues) {
        var privateState = {};

        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(DocumentChecklist);

    //Create new class level validator object
    BaseModel.Validator.call(DocumentChecklist);

    var registerValidatorBackup = DocumentChecklist.registerValidator;

    DocumentChecklist.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(DocumentChecklist.isValid(this, propName, val)) {
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
    //For Operation 'getRequiredDocuments' with service id 'GetRequiredDocuments5042'
     DocumentChecklist.getRequiredDocuments = function(params, onCompletion){
        return DocumentChecklist.customVerb('getRequiredDocuments', params, onCompletion);
     };

    //For Operation 'uploadMultipleDocumentForChecklist' with service id 'UploadMultipleDocumentForChecklist9295'
     DocumentChecklist.uploadMultipleDocumentForChecklist = function(params, onCompletion){
        return DocumentChecklist.customVerb('uploadMultipleDocumentForChecklist', params, onCompletion);
     };

    //For Operation 'getDocumentChecklist' with service id 'GetDocumentChecklistOperation3691'
     DocumentChecklist.getDocumentChecklist = function(params, onCompletion){
        return DocumentChecklist.customVerb('getDocumentChecklist', params, onCompletion);
     };

    //For Operation 'downloadDocument' with service id 'DownloadDocumentOperation4743'
     DocumentChecklist.downloadDocument = function(params, onCompletion){
        return DocumentChecklist.customVerb('downloadDocument', params, onCompletion);
     };

    //For Operation 'deleteEvidence' with service id 'DeleteEvidenceOperation9690'
     DocumentChecklist.deleteEvidence = function(params, onCompletion){
        return DocumentChecklist.customVerb('deleteEvidence', params, onCompletion);
     };

    //For Operation 'deleteDocument' with service id 'DeleteDocumentOperation9410'
     DocumentChecklist.deleteDocument = function(params, onCompletion){
        return DocumentChecklist.customVerb('deleteDocument', params, onCompletion);
     };

    //For Operation 'getDocumentsData' with service id 'GetDocumentsDataOperation6807'
     DocumentChecklist.getDocumentsData = function(params, onCompletion){
        return DocumentChecklist.customVerb('getDocumentsData', params, onCompletion);
     };

    //For Operation 'submitEvidence' with service id 'SubmitEvidenceOperation6560'
     DocumentChecklist.submitEvidence = function(params, onCompletion){
        return DocumentChecklist.customVerb('submitEvidence', params, onCompletion);
     };

    //For Operation 'uploadDocument' with service id 'UploadDocumentForChecklist1342'
     DocumentChecklist.uploadDocument = function(params, onCompletion){
        return DocumentChecklist.customVerb('uploadDocument', params, onCompletion);
     };

    //For Operation 'useEvidence' with service id 'UseEvidenceOperation3423'
     DocumentChecklist.useEvidence = function(params, onCompletion){
        return DocumentChecklist.customVerb('useEvidence', params, onCompletion);
     };

    //For Operation 'uploadMultipleDocuments' with service id 'UploadDocumentsOperation6055'
     DocumentChecklist.uploadMultipleDocuments = function(params, onCompletion){
        return DocumentChecklist.customVerb('uploadMultipleDocuments', params, onCompletion);
     };

    var relations = [];

    DocumentChecklist.relations = relations;

    DocumentChecklist.prototype.isValid = function() {
        return DocumentChecklist.isValid(this);
    };

    DocumentChecklist.prototype.objModelName = "DocumentChecklist";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    DocumentChecklist.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Document", "DocumentChecklist", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    DocumentChecklist.clone = function(objectToClone) {
        var clonedObj = new DocumentChecklist();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return DocumentChecklist;
});