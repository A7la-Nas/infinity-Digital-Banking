/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PFMBarGraph", "objectService" : "PFM"};

    var setterFunctions = {
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
        totalCashFlow: function(val, state) {
            context["field"] = "totalCashFlow";
            context["metadata"] = (objectMetadata ? objectMetadata["totalCashFlow"] : null);
            state['totalCashFlow'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PFMBarGraph(defaultValues) {
        var privateState = {};
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

        context["field"] = "totalCashFlow";
        context["metadata"] = (objectMetadata ? objectMetadata["totalCashFlow"] : null);
        privateState.totalCashFlow = defaultValues ?
            (defaultValues["totalCashFlow"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalCashFlow"], context) :
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
            "totalCashFlow": {
                get: function() {
                    context["field"] = "totalCashFlow";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalCashFlow"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalCashFlow, context);
                },
                set: function(val) {
                    setterFunctions['totalCashFlow'].call(this, val, privateState);
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
            privateState.monthId = value ? (value["monthId"] ? value["monthId"] : null) : null;
            privateState.monthName = value ? (value["monthName"] ? value["monthName"] : null) : null;
            privateState.totalCashFlow = value ? (value["totalCashFlow"] ? value["totalCashFlow"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PFMBarGraph);

    //Create new class level validator object
    BaseModel.Validator.call(PFMBarGraph);

    var registerValidatorBackup = PFMBarGraph.registerValidator;

    PFMBarGraph.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PFMBarGraph.isValid(this, propName, val)) {
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

    PFMBarGraph.relations = relations;

    PFMBarGraph.prototype.isValid = function() {
        return PFMBarGraph.isValid(this);
    };

    PFMBarGraph.prototype.objModelName = "PFMBarGraph";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PFMBarGraph.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PFM", "PFMBarGraph", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PFMBarGraph.clone = function(objectToClone) {
        var clonedObj = new PFMBarGraph();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PFMBarGraph;
});