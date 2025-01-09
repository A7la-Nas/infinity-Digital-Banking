/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Alerts", "objectService" : "AlertsManagement"};

    var setterFunctions = {
    };

    //Create the Model Class
    function Alerts(defaultValues) {
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
    BaseModel.isParentOf(Alerts);

    //Create new class level validator object
    BaseModel.Validator.call(Alerts);

    var registerValidatorBackup = Alerts.registerValidator;

    Alerts.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Alerts.isValid(this, propName, val)) {
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
    //For Operation 'setPreferences' with service id 'setAlertPreferences9622'
     Alerts.setPreferences = function(params, onCompletion){
        return Alerts.customVerb('setPreferences', params, onCompletion);
     };

    //For Operation 'getArrangementsStatus' with service id 'getCustomerAccountAlertPreference1217'
     Alerts.getArrangementsStatus = function(params, onCompletion){
        return Alerts.customVerb('getArrangementsStatus', params, onCompletion);
     };

    //For Operation 'getPreferences' with service id 'getCustomerAlertTypePreference6958'
     Alerts.getPreferences = function(params, onCompletion){
        return Alerts.customVerb('getPreferences', params, onCompletion);
     };

    //For Operation 'getCategories' with service id 'getCustomerAlertCategoryPreference9676'
     Alerts.getCategories = function(params, onCompletion){
        return Alerts.customVerb('getCategories', params, onCompletion);
     };

    var relations = [];

    Alerts.relations = relations;

    Alerts.prototype.isValid = function() {
        return Alerts.isValid(this);
    };

    Alerts.prototype.objModelName = "Alerts";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Alerts.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("AlertsManagement", "Alerts", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Alerts.clone = function(objectToClone) {
        var clonedObj = new Alerts();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Alerts;
});