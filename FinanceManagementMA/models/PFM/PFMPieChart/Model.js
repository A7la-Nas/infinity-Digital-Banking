/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PFMPieChart", "objectService" : "PFM"};

    var setterFunctions = {
        cashSpent: function(val, state) {
            context["field"] = "cashSpent";
            context["metadata"] = (objectMetadata ? objectMetadata["cashSpent"] : null);
            state['cashSpent'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cateforyId: function(val, state) {
            context["field"] = "cateforyId";
            context["metadata"] = (objectMetadata ? objectMetadata["cateforyId"] : null);
            state['cateforyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        monthId: function(val, state) {
            context["field"] = "monthId";
            context["metadata"] = (objectMetadata ? objectMetadata["monthId"] : null);
            state['monthId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        monthName: function(val, state) {
            context["field"] = "monthName";
            context["metadata"] = (objectMetadata ? objectMetadata["monthName"] : null);
            state['monthName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalCashSpent: function(val, state) {
            context["field"] = "totalCashSpent";
            context["metadata"] = (objectMetadata ? objectMetadata["totalCashSpent"] : null);
            state['totalCashSpent'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        year: function(val, state) {
            context["field"] = "year";
            context["metadata"] = (objectMetadata ? objectMetadata["year"] : null);
            state['year'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PFMPieChart(defaultValues) {
        var privateState = {};
        context["field"] = "cashSpent";
        context["metadata"] = (objectMetadata ? objectMetadata["cashSpent"] : null);
        privateState.cashSpent = defaultValues ?
            (defaultValues["cashSpent"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cashSpent"], context) :
                null) :
            null;

        context["field"] = "cateforyId";
        context["metadata"] = (objectMetadata ? objectMetadata["cateforyId"] : null);
        privateState.cateforyId = defaultValues ?
            (defaultValues["cateforyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cateforyId"], context) :
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

        context["field"] = "monthId";
        context["metadata"] = (objectMetadata ? objectMetadata["monthId"] : null);
        privateState.monthId = defaultValues ?
            (defaultValues["monthId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["monthId"], context) :
                null) :
            null;

        context["field"] = "monthName";
        context["metadata"] = (objectMetadata ? objectMetadata["monthName"] : null);
        privateState.monthName = defaultValues ?
            (defaultValues["monthName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["monthName"], context) :
                null) :
            null;

        context["field"] = "totalCashSpent";
        context["metadata"] = (objectMetadata ? objectMetadata["totalCashSpent"] : null);
        privateState.totalCashSpent = defaultValues ?
            (defaultValues["totalCashSpent"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalCashSpent"], context) :
                null) :
            null;

        context["field"] = "year";
        context["metadata"] = (objectMetadata ? objectMetadata["year"] : null);
        privateState.year = defaultValues ?
            (defaultValues["year"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["year"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "cashSpent": {
                get: function() {
                    context["field"] = "cashSpent";
                    context["metadata"] = (objectMetadata ? objectMetadata["cashSpent"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cashSpent, context);
                },
                set: function(val) {
                    setterFunctions['cashSpent'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cateforyId": {
                get: function() {
                    context["field"] = "cateforyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["cateforyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cateforyId, context);
                },
                set: function(val) {
                    setterFunctions['cateforyId'].call(this, val, privateState);
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
            "monthId": {
                get: function() {
                    context["field"] = "monthId";
                    context["metadata"] = (objectMetadata ? objectMetadata["monthId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.monthId, context);
                },
                set: function(val) {
                    setterFunctions['monthId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "monthName": {
                get: function() {
                    context["field"] = "monthName";
                    context["metadata"] = (objectMetadata ? objectMetadata["monthName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.monthName, context);
                },
                set: function(val) {
                    setterFunctions['monthName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalCashSpent": {
                get: function() {
                    context["field"] = "totalCashSpent";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalCashSpent"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalCashSpent, context);
                },
                set: function(val) {
                    setterFunctions['totalCashSpent'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "year": {
                get: function() {
                    context["field"] = "year";
                    context["metadata"] = (objectMetadata ? objectMetadata["year"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.year, context);
                },
                set: function(val) {
                    setterFunctions['year'].call(this, val, privateState);
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
            privateState.cashSpent = value ? (value["cashSpent"] ? value["cashSpent"] : null) : null;
            privateState.cateforyId = value ? (value["cateforyId"] ? value["cateforyId"] : null) : null;
            privateState.categoryName = value ? (value["categoryName"] ? value["categoryName"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.monthId = value ? (value["monthId"] ? value["monthId"] : null) : null;
            privateState.monthName = value ? (value["monthName"] ? value["monthName"] : null) : null;
            privateState.totalCashSpent = value ? (value["totalCashSpent"] ? value["totalCashSpent"] : null) : null;
            privateState.year = value ? (value["year"] ? value["year"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PFMPieChart);

    //Create new class level validator object
    BaseModel.Validator.call(PFMPieChart);

    var registerValidatorBackup = PFMPieChart.registerValidator;

    PFMPieChart.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PFMPieChart.isValid(this, propName, val)) {
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

    PFMPieChart.relations = relations;

    PFMPieChart.prototype.isValid = function() {
        return PFMPieChart.isValid(this);
    };

    PFMPieChart.prototype.objModelName = "PFMPieChart";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PFMPieChart.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PFM", "PFMPieChart", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PFMPieChart.clone = function(objectToClone) {
        var clonedObj = new PFMPieChart();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PFMPieChart;
});