/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "States", "objectService" : "Utility"};

    var setterFunctions = {
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        stateId: function(val, state) {
            context["field"] = "stateId";
            context["metadata"] = (objectMetadata ? objectMetadata["stateId"] : null);
            state['stateId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        stateName: function(val, state) {
            context["field"] = "stateName";
            context["metadata"] = (objectMetadata ? objectMetadata["stateName"] : null);
            state['stateName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        countryId: function(val, state) {
            context["field"] = "countryId";
            context["metadata"] = (objectMetadata ? objectMetadata["countryId"] : null);
            state['countryId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        regionId: function(val, state) {
            context["field"] = "regionId";
            context["metadata"] = (objectMetadata ? objectMetadata["regionId"] : null);
            state['regionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function States(defaultValues) {
        var privateState = {};
        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "stateId";
        context["metadata"] = (objectMetadata ? objectMetadata["stateId"] : null);
        privateState.stateId = defaultValues ?
            (defaultValues["stateId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["stateId"], context) :
                null) :
            null;

        context["field"] = "stateName";
        context["metadata"] = (objectMetadata ? objectMetadata["stateName"] : null);
        privateState.stateName = defaultValues ?
            (defaultValues["stateName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["stateName"], context) :
                null) :
            null;

        context["field"] = "countryId";
        context["metadata"] = (objectMetadata ? objectMetadata["countryId"] : null);
        privateState.countryId = defaultValues ?
            (defaultValues["countryId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["countryId"], context) :
                null) :
            null;

        context["field"] = "regionId";
        context["metadata"] = (objectMetadata ? objectMetadata["regionId"] : null);
        privateState.regionId = defaultValues ?
            (defaultValues["regionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["regionId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "errmsg": {
                get: function() {
                    context["field"] = "errmsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errmsg, context);
                },
                set: function(val) {
                    setterFunctions['errmsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "stateId": {
                get: function() {
                    context["field"] = "stateId";
                    context["metadata"] = (objectMetadata ? objectMetadata["stateId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.stateId, context);
                },
                set: function(val) {
                    setterFunctions['stateId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "stateName": {
                get: function() {
                    context["field"] = "stateName";
                    context["metadata"] = (objectMetadata ? objectMetadata["stateName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.stateName, context);
                },
                set: function(val) {
                    setterFunctions['stateName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "countryId": {
                get: function() {
                    context["field"] = "countryId";
                    context["metadata"] = (objectMetadata ? objectMetadata["countryId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.countryId, context);
                },
                set: function(val) {
                    setterFunctions['countryId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "regionId": {
                get: function() {
                    context["field"] = "regionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["regionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.regionId, context);
                },
                set: function(val) {
                    setterFunctions['regionId'].call(this, val, privateState);
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
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.stateId = value ? (value["stateId"] ? value["stateId"] : null) : null;
            privateState.stateName = value ? (value["stateName"] ? value["stateName"] : null) : null;
            privateState.countryId = value ? (value["countryId"] ? value["countryId"] : null) : null;
            privateState.regionId = value ? (value["regionId"] ? value["regionId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(States);

    //Create new class level validator object
    BaseModel.Validator.call(States);

    var registerValidatorBackup = States.registerValidator;

    States.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(States.isValid(this, propName, val)) {
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
    //For Operation 'getAllRegions' with service id 'getAllRegions2852'
     States.getAllRegions = function(params, onCompletion){
        return States.customVerb('getAllRegions', params, onCompletion);
     };

    //For Operation 'getRegionDetails' with service id 'getRegionDetails3652'
     States.getRegionDetails = function(params, onCompletion){
        return States.customVerb('getRegionDetails', params, onCompletion);
     };

    //For Operation 'getAllCities' with service id 'getAllCities8356'
     States.getAllCities = function(params, onCompletion){
        return States.customVerb('getAllCities', params, onCompletion);
     };

    var relations = [];

    States.relations = relations;

    States.prototype.isValid = function() {
        return States.isValid(this);
    };

    States.prototype.objModelName = "States";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    States.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Utility", "States", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    States.clone = function(objectToClone) {
        var clonedObj = new States();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return States;
});