/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PFMBudgetGraph", "objectService" : "PFM"};

    var setterFunctions = {
        allocatedAmount: function(val, state) {
            context["field"] = "allocatedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["allocatedAmount"] : null);
            state['allocatedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amountSpent: function(val, state) {
            context["field"] = "amountSpent";
            context["metadata"] = (objectMetadata ? objectMetadata["amountSpent"] : null);
            state['amountSpent'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        budgetId: function(val, state) {
            context["field"] = "budgetId";
            context["metadata"] = (objectMetadata ? objectMetadata["budgetId"] : null);
            state['budgetId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
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
    function PFMBudgetGraph(defaultValues) {
        var privateState = {};
        context["field"] = "allocatedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["allocatedAmount"] : null);
        privateState.allocatedAmount = defaultValues ?
            (defaultValues["allocatedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["allocatedAmount"], context) :
                null) :
            null;

        context["field"] = "amountSpent";
        context["metadata"] = (objectMetadata ? objectMetadata["amountSpent"] : null);
        privateState.amountSpent = defaultValues ?
            (defaultValues["amountSpent"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amountSpent"], context) :
                null) :
            null;

        context["field"] = "budgetId";
        context["metadata"] = (objectMetadata ? objectMetadata["budgetId"] : null);
        privateState.budgetId = defaultValues ?
            (defaultValues["budgetId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["budgetId"], context) :
                null) :
            null;

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
            "allocatedAmount": {
                get: function() {
                    context["field"] = "allocatedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["allocatedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.allocatedAmount, context);
                },
                set: function(val) {
                    setterFunctions['allocatedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amountSpent": {
                get: function() {
                    context["field"] = "amountSpent";
                    context["metadata"] = (objectMetadata ? objectMetadata["amountSpent"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amountSpent, context);
                },
                set: function(val) {
                    setterFunctions['amountSpent'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "budgetId": {
                get: function() {
                    context["field"] = "budgetId";
                    context["metadata"] = (objectMetadata ? objectMetadata["budgetId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.budgetId, context);
                },
                set: function(val) {
                    setterFunctions['budgetId'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            privateState.allocatedAmount = value ? (value["allocatedAmount"] ? value["allocatedAmount"] : null) : null;
            privateState.amountSpent = value ? (value["amountSpent"] ? value["amountSpent"] : null) : null;
            privateState.budgetId = value ? (value["budgetId"] ? value["budgetId"] : null) : null;
            privateState.categoryId = value ? (value["categoryId"] ? value["categoryId"] : null) : null;
            privateState.categoryName = value ? (value["categoryName"] ? value["categoryName"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PFMBudgetGraph);

    //Create new class level validator object
    BaseModel.Validator.call(PFMBudgetGraph);

    var registerValidatorBackup = PFMBudgetGraph.registerValidator;

    PFMBudgetGraph.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PFMBudgetGraph.isValid(this, propName, val)) {
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

    PFMBudgetGraph.relations = relations;

    PFMBudgetGraph.prototype.isValid = function() {
        return PFMBudgetGraph.isValid(this);
    };

    PFMBudgetGraph.prototype.objModelName = "PFMBudgetGraph";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PFMBudgetGraph.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PFM", "PFMBudgetGraph", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PFMBudgetGraph.clone = function(objectToClone) {
        var clonedObj = new PFMBudgetGraph();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PFMBudgetGraph;
});