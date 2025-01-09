/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "MortgageDocumentsDownload", "objectService" : "DocumentManagement"};

    var setterFunctions = {
    };

    //Create the Model Class
    function MortgageDocumentsDownload(defaultValues) {
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
    BaseModel.isParentOf(MortgageDocumentsDownload);

    //Create new class level validator object
    BaseModel.Validator.call(MortgageDocumentsDownload);

    var registerValidatorBackup = MortgageDocumentsDownload.registerValidator;

    MortgageDocumentsDownload.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(MortgageDocumentsDownload.isValid(this, propName, val)) {
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
    //For Operation 'downloadChangeRepaymentDayReqAckMapping' with service id 'DownloadChangeRepaymentDayReqAckPDF7715'
     MortgageDocumentsDownload.downloadChangeRepaymentDayReqAckMapping = function(params, onCompletion){
        return MortgageDocumentsDownload.customVerb('downloadChangeRepaymentDayReqAckMapping', params, onCompletion);
     };

    //For Operation 'downloadChangeRepaymentAccountReqAckMapping' with service id 'DownloadChangeRepaymentAccountReqAckPDF8355'
     MortgageDocumentsDownload.downloadChangeRepaymentAccountReqAckMapping = function(params, onCompletion){
        return MortgageDocumentsDownload.customVerb('downloadChangeRepaymentAccountReqAckMapping', params, onCompletion);
     };

    var relations = [];

    MortgageDocumentsDownload.relations = relations;

    MortgageDocumentsDownload.prototype.isValid = function() {
        return MortgageDocumentsDownload.isValid(this);
    };

    MortgageDocumentsDownload.prototype.objModelName = "MortgageDocumentsDownload";
    MortgageDocumentsDownload.prototype.objServiceName = "DocumentManagement";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    MortgageDocumentsDownload.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("DocumentManagement", "MortgageDocumentsDownload", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    MortgageDocumentsDownload.clone = function(objectToClone) {
        var clonedObj = new MortgageDocumentsDownload();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return MortgageDocumentsDownload;
});