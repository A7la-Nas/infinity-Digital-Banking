/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Enrollment", "objectService" : "SBAdvisoryObjServices"};

    var setterFunctions = {
    };

    //Create the Model Class
    function Enrollment(defaultValues) {
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
    BaseModel.isParentOf(Enrollment);

    //Create new class level validator object
    BaseModel.Validator.call(Enrollment);

    var registerValidatorBackup = Enrollment.registerValidator;

    Enrollment.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Enrollment.isValid(this, propName, val)) {
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
    //For Operation 'getSBAFeaturesActions' with service id 'getSBAFeaturesActions8370'
     Enrollment.getSBAFeaturesActions = function(params, onCompletion){
        return Enrollment.customVerb('getSBAFeaturesActions', params, onCompletion);
     };

    //For Operation 'startProcess' with service id 'startProcess2660'
     Enrollment.startProcess = function(params, onCompletion){
        return Enrollment.customVerb('startProcess', params, onCompletion);
     };

    //For Operation 'getStatus' with service id 'getEnrollmentStatus6704'
     Enrollment.getStatus = function(params, onCompletion){
        return Enrollment.customVerb('getStatus', params, onCompletion);
     };

    //For Operation 'getAccountingData' with service id 'getAccountingData4257'
     Enrollment.getAccountingData = function(params, onCompletion){
        return Enrollment.customVerb('getAccountingData', params, onCompletion);
     };

    var relations = [];

    Enrollment.relations = relations;

    Enrollment.prototype.isValid = function() {
        return Enrollment.isValid(this);
    };

    Enrollment.prototype.objModelName = "Enrollment";
    Enrollment.prototype.objServiceName = "SBAdvisoryObjServices";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Enrollment.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SBAdvisoryObjServices", "Enrollment", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Enrollment.clone = function(objectToClone) {
        var clonedObj = new Enrollment();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Enrollment;
});