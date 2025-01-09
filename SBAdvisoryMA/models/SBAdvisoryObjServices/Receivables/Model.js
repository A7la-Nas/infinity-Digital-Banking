/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Receivables", "objectService" : "SBAdvisoryObjServices"};

    var setterFunctions = {
    };

    //Create the Model Class
    function Receivables(defaultValues) {
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
    BaseModel.isParentOf(Receivables);

    //Create new class level validator object
    BaseModel.Validator.call(Receivables);

    var registerValidatorBackup = Receivables.registerValidator;

    Receivables.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Receivables.isValid(this, propName, val)) {
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
    //For Operation 'getAccountsReceivable' with service id 'getAccountsReceivable4680'
     Receivables.getAccountsReceivable = function(params, onCompletion){
        return Receivables.customVerb('getAccountsReceivable', params, onCompletion);
     };

    //For Operation 'getReceivablesDebtorDaysReq' with service id 'getReceivablesDebtorDaysReq4408'
     Receivables.getReceivablesDebtorDaysReq = function(params, onCompletion){
        return Receivables.customVerb('getReceivablesDebtorDaysReq', params, onCompletion);
     };

    //For Operation 'getAccountsReceivableCustomerDetailsExcel' with service id 'getAccountsReceivaleCustomerDetailsExcel7027'
     Receivables.getAccountsReceivableCustomerDetailsExcel = function(params, onCompletion){
        return Receivables.customVerb('getAccountsReceivableCustomerDetailsExcel', params, onCompletion);
     };

    //For Operation 'getAccountsReceivableByCustomer' with service id 'getAccountsReceivableByCustomer6320'
     Receivables.getAccountsReceivableByCustomer = function(params, onCompletion){
        return Receivables.customVerb('getAccountsReceivableByCustomer', params, onCompletion);
     };

    //For Operation 'getAccountsReceivaleSummaryExcel' with service id 'getAccountsReceivaleSummaryExcel3278'
     Receivables.getAccountsReceivaleSummaryExcel = function(params, onCompletion){
        return Receivables.customVerb('getAccountsReceivaleSummaryExcel', params, onCompletion);
     };

    var relations = [];

    Receivables.relations = relations;

    Receivables.prototype.isValid = function() {
        return Receivables.isValid(this);
    };

    Receivables.prototype.objModelName = "Receivables";
    Receivables.prototype.objServiceName = "SBAdvisoryObjServices";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Receivables.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SBAdvisoryObjServices", "Receivables", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Receivables.clone = function(objectToClone) {
        var clonedObj = new Receivables();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Receivables;
});