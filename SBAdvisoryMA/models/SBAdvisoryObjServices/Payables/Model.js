/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Payables", "objectService" : "SBAdvisoryObjServices"};

    var setterFunctions = {
    };

    //Create the Model Class
    function Payables(defaultValues) {
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
    BaseModel.isParentOf(Payables);

    //Create new class level validator object
    BaseModel.Validator.call(Payables);

    var registerValidatorBackup = Payables.registerValidator;

    Payables.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Payables.isValid(this, propName, val)) {
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
    //For Operation 'getAccountsPayableSummaryExcel' with service id 'getAccountsPayableSummaryExcel2442'
     Payables.getAccountsPayableSummaryExcel = function(params, onCompletion){
        return Payables.customVerb('getAccountsPayableSummaryExcel', params, onCompletion);
     };

    //For Operation 'getAccountsPayableSupplierDetailsExcel' with service id 'getAccountsPayableSupplierDetailsExcel1136'
     Payables.getAccountsPayableSupplierDetailsExcel = function(params, onCompletion){
        return Payables.customVerb('getAccountsPayableSupplierDetailsExcel', params, onCompletion);
     };

    //For Operation 'getPayablesDebtorDaysReq' with service id 'getPayablesDebtorDaysReq6631'
     Payables.getPayablesDebtorDaysReq = function(params, onCompletion){
        return Payables.customVerb('getPayablesDebtorDaysReq', params, onCompletion);
     };

    //For Operation 'getAccountsPayableBySupplier' with service id 'getAccountsPayableBySupplier7194'
     Payables.getAccountsPayableBySupplier = function(params, onCompletion){
        return Payables.customVerb('getAccountsPayableBySupplier', params, onCompletion);
     };

    //For Operation 'getAccountsPayable' with service id 'getAccountsPayable3301'
     Payables.getAccountsPayable = function(params, onCompletion){
        return Payables.customVerb('getAccountsPayable', params, onCompletion);
     };

    var relations = [];

    Payables.relations = relations;

    Payables.prototype.isValid = function() {
        return Payables.isValid(this);
    };

    Payables.prototype.objModelName = "Payables";
    Payables.prototype.objServiceName = "SBAdvisoryObjServices";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Payables.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SBAdvisoryObjServices", "Payables", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Payables.clone = function(objectToClone) {
        var clonedObj = new Payables();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Payables;
});