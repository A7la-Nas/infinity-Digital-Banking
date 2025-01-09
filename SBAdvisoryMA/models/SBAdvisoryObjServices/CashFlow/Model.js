/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CashFlow", "objectService" : "SBAdvisoryObjServices"};

    var setterFunctions = {
    };

    //Create the Model Class
    function CashFlow(defaultValues) {
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
    BaseModel.isParentOf(CashFlow);

    //Create new class level validator object
    BaseModel.Validator.call(CashFlow);

    var registerValidatorBackup = CashFlow.registerValidator;

    CashFlow.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CashFlow.isValid(this, propName, val)) {
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
    //For Operation 'get12MonthCashFlow' with service id 'get12MonthCashFlow7849'
     CashFlow.get12MonthCashFlow = function(params, onCompletion){
        return CashFlow.customVerb('get12MonthCashFlow', params, onCompletion);
     };

    //For Operation 'getCashFlowExcel' with service id 'getCashFlowExcel1084'
     CashFlow.getCashFlowExcel = function(params, onCompletion){
        return CashFlow.customVerb('getCashFlowExcel', params, onCompletion);
     };

    var relations = [];

    CashFlow.relations = relations;

    CashFlow.prototype.isValid = function() {
        return CashFlow.isValid(this);
    };

    CashFlow.prototype.objModelName = "CashFlow";
    CashFlow.prototype.objServiceName = "SBAdvisoryObjServices";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CashFlow.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SBAdvisoryObjServices", "CashFlow", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CashFlow.clone = function(objectToClone) {
        var clonedObj = new CashFlow();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CashFlow;
});