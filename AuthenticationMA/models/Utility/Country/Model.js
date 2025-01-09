/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Country", "objectService" : "Utility"};

    var setterFunctions = {
        CountryId: function(val, state) {
            context["field"] = "CountryId";
            context["metadata"] = (objectMetadata ? objectMetadata["CountryId"] : null);
            state['CountryId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Name: function(val, state) {
            context["field"] = "Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
            state['Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Country(defaultValues) {
        var privateState = {};
        context["field"] = "CountryId";
        context["metadata"] = (objectMetadata ? objectMetadata["CountryId"] : null);
        privateState.CountryId = defaultValues ?
            (defaultValues["CountryId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CountryId"], context) :
                null) :
            null;

        context["field"] = "Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
        privateState.Name = defaultValues ?
            (defaultValues["Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Name"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "CountryId": {
                get: function() {
                    context["field"] = "CountryId";
                    context["metadata"] = (objectMetadata ? objectMetadata["CountryId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CountryId, context);
                },
                set: function(val) {
                    setterFunctions['CountryId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Name": {
                get: function() {
                    context["field"] = "Name";
                    context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Name, context);
                },
                set: function(val) {
                    setterFunctions['Name'].call(this, val, privateState);
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
            privateState.CountryId = value ? (value["CountryId"] ? value["CountryId"] : null) : null;
            privateState.Name = value ? (value["Name"] ? value["Name"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Country);

    //Create new class level validator object
    BaseModel.Validator.call(Country);

    var registerValidatorBackup = Country.registerValidator;

    Country.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Country.isValid(this, propName, val)) {
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
    //For Operation 'getAllCountries' with service id 'getAllCountries5715'
     Country.getAllCountries = function(params, onCompletion){
        return Country.customVerb('getAllCountries', params, onCompletion);
     };

    //For Operation 'getCountryCodes' with service id 'GetCountryCodes6671'
     Country.getCountryCodes = function(params, onCompletion){
        return Country.customVerb('getCountryCodes', params, onCompletion);
     };

    var relations = [];

    Country.relations = relations;

    Country.prototype.isValid = function() {
        return Country.isValid(this);
    };

    Country.prototype.objModelName = "Country";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Country.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Utility", "Country", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Country.clone = function(objectToClone) {
        var clonedObj = new Country();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Country;
});