/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PFMCategory", "objectService" : "PFM"};

    var setterFunctions = {
        categoryId: function(val, state) {
            context["field"] = "categoryId";
            context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
            state['categoryId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        categoryName: function(val, state) {
            context["field"] = "categoryName";
            context["metadata"] = (objectMetadata ? objectMetadata["categoryName"] : null);
            state['categoryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PFMCategory(defaultValues) {
        var privateState = {};
        context["field"] = "categoryId";
        context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
        privateState.categoryId = defaultValues ?
            (defaultValues["categoryId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["categoryId"], context) :
                null) :
            null;

        context["field"] = "categoryName";
        context["metadata"] = (objectMetadata ? objectMetadata["categoryName"] : null);
        privateState.categoryName = defaultValues ?
            (defaultValues["categoryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["categoryName"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "categoryId": {
                get: function() {
                    context["field"] = "categoryId";
                    context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.categoryId, context);
                },
                set: function(val) {
                    setterFunctions['categoryId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "categoryName": {
                get: function() {
                    context["field"] = "categoryName";
                    context["metadata"] = (objectMetadata ? objectMetadata["categoryName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.categoryName, context);
                },
                set: function(val) {
                    setterFunctions['categoryName'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.categoryId = value ? (value["categoryId"] ? value["categoryId"] : null) : null;
            privateState.categoryName = value ? (value["categoryName"] ? value["categoryName"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PFMCategory);

    //Create new class level validator object
    BaseModel.Validator.call(PFMCategory);

    var registerValidatorBackup = PFMCategory.registerValidator;

    PFMCategory.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PFMCategory.isValid(this, propName, val)) {
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
    var relations = [];

    PFMCategory.relations = relations;

    PFMCategory.prototype.isValid = function() {
        return PFMCategory.isValid(this);
    };

    PFMCategory.prototype.objModelName = "PFMCategory";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PFMCategory.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PFM", "PFMCategory", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PFMCategory.clone = function(objectToClone) {
        var clonedObj = new PFMCategory();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PFMCategory;
});