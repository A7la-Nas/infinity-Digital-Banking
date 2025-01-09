/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Forex", "objectService" : "ForeignExchange"};

    var setterFunctions = {
        CountryCode: function(val, state) {
            context["field"] = "CountryCode";
            context["metadata"] = (objectMetadata ? objectMetadata["CountryCode"] : null);
            state['CountryCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        baseCurrencyCode: function(val, state) {
            context["field"] = "baseCurrencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["baseCurrencyCode"] : null);
            state['baseCurrencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        quoteCurrencyCode: function(val, state) {
            context["field"] = "quoteCurrencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["quoteCurrencyCode"] : null);
            state['quoteCurrencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        market: function(val, state) {
            context["field"] = "market";
            context["metadata"] = (objectMetadata ? objectMetadata["market"] : null);
            state['market'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyCode: function(val, state) {
            context["field"] = "companyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["companyCode"] : null);
            state['companyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Forex(defaultValues) {
        var privateState = {};
        context["field"] = "CountryCode";
        context["metadata"] = (objectMetadata ? objectMetadata["CountryCode"] : null);
        privateState.CountryCode = defaultValues ?
            (defaultValues["CountryCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CountryCode"], context) :
                null) :
            null;

        context["field"] = "baseCurrencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["baseCurrencyCode"] : null);
        privateState.baseCurrencyCode = defaultValues ?
            (defaultValues["baseCurrencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["baseCurrencyCode"], context) :
                null) :
            null;

        context["field"] = "quoteCurrencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["quoteCurrencyCode"] : null);
        privateState.quoteCurrencyCode = defaultValues ?
            (defaultValues["quoteCurrencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["quoteCurrencyCode"], context) :
                null) :
            null;

        context["field"] = "market";
        context["metadata"] = (objectMetadata ? objectMetadata["market"] : null);
        privateState.market = defaultValues ?
            (defaultValues["market"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["market"], context) :
                null) :
            null;

        context["field"] = "companyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["companyCode"] : null);
        privateState.companyCode = defaultValues ?
            (defaultValues["companyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyCode"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "CountryCode": {
                get: function() {
                    context["field"] = "CountryCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["CountryCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CountryCode, context);
                },
                set: function(val) {
                    setterFunctions['CountryCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "baseCurrencyCode": {
                get: function() {
                    context["field"] = "baseCurrencyCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["baseCurrencyCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.baseCurrencyCode, context);
                },
                set: function(val) {
                    setterFunctions['baseCurrencyCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "quoteCurrencyCode": {
                get: function() {
                    context["field"] = "quoteCurrencyCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["quoteCurrencyCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.quoteCurrencyCode, context);
                },
                set: function(val) {
                    setterFunctions['quoteCurrencyCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "market": {
                get: function() {
                    context["field"] = "market";
                    context["metadata"] = (objectMetadata ? objectMetadata["market"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.market, context);
                },
                set: function(val) {
                    setterFunctions['market'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companyCode": {
                get: function() {
                    context["field"] = "companyCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["companyCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companyCode, context);
                },
                set: function(val) {
                    setterFunctions['companyCode'].call(this, val, privateState);
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
            privateState.CountryCode = value ? (value["CountryCode"] ? value["CountryCode"] : null) : null;
            privateState.baseCurrencyCode = value ? (value["baseCurrencyCode"] ? value["baseCurrencyCode"] : null) : null;
            privateState.quoteCurrencyCode = value ? (value["quoteCurrencyCode"] ? value["quoteCurrencyCode"] : null) : null;
            privateState.market = value ? (value["market"] ? value["market"] : null) : null;
            privateState.companyCode = value ? (value["companyCode"] ? value["companyCode"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Forex);

    //Create new class level validator object
    BaseModel.Validator.call(Forex);

    var registerValidatorBackup = Forex.registerValidator;

    Forex.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Forex.isValid(this, propName, val)) {
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
    //For Operation 'fetchBaseCurrency' with service id 'fetchBaseCurrency7562'
     Forex.fetchBaseCurrency = function(params, onCompletion){
        return Forex.customVerb('fetchBaseCurrency', params, onCompletion);
     };

    //For Operation 'updateRecentCurrencies' with service id 'updateRecentCurrencies3716'
     Forex.updateRecentCurrencies = function(params, onCompletion){
        return Forex.customVerb('updateRecentCurrencies', params, onCompletion);
     };

    //For Operation 'fetchDashboardCurrencyList' with service id 'fetchDashboardCurrencyList1600'
     Forex.fetchDashboardCurrencyList = function(params, onCompletion){
        return Forex.customVerb('fetchDashboardCurrencyList', params, onCompletion);
     };

    //For Operation 'fetchDashboardCurrencyRates' with service id 'fetchDashboardCurrencyRates6320'
     Forex.fetchDashboardCurrencyRates = function(params, onCompletion){
        return Forex.customVerb('fetchDashboardCurrencyRates', params, onCompletion);
     };

    //For Operation 'fetchCurrencyRates' with service id 'fetchCurrencyRates3440'
     Forex.fetchCurrencyRates = function(params, onCompletion){
        return Forex.customVerb('fetchCurrencyRates', params, onCompletion);
     };

    var relations = [];

    Forex.relations = relations;

    Forex.prototype.isValid = function() {
        return Forex.isValid(this);
    };

    Forex.prototype.objModelName = "Forex";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Forex.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ForeignExchange", "Forex", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Forex.clone = function(objectToClone) {
        var clonedObj = new Forex();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Forex;
});