/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "RolloverRequests", "objectService" : "TradeLending"};

    var setterFunctions = {
        facilityId: function(val, state) {
            context["field"] = "facilityId";
            context["metadata"] = (objectMetadata ? objectMetadata["facilityId"] : null);
            state['facilityId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        loanId: function(val, state) {
            context["field"] = "loanId";
            context["metadata"] = (objectMetadata ? objectMetadata["loanId"] : null);
            state['loanId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rolloverDays: function(val, state) {
            context["field"] = "rolloverDays";
            context["metadata"] = (objectMetadata ? objectMetadata["rolloverDays"] : null);
            state['rolloverDays'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rolloverMonths: function(val, state) {
            context["field"] = "rolloverMonths";
            context["metadata"] = (objectMetadata ? objectMetadata["rolloverMonths"] : null);
            state['rolloverMonths'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rolloverYears: function(val, state) {
            context["field"] = "rolloverYears";
            context["metadata"] = (objectMetadata ? objectMetadata["rolloverYears"] : null);
            state['rolloverYears'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rolloverRequestId: function(val, state) {
            context["field"] = "rolloverRequestId";
            context["metadata"] = (objectMetadata ? objectMetadata["rolloverRequestId"] : null);
            state['rolloverRequestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdBy: function(val, state) {
            context["field"] = "createdBy";
            context["metadata"] = (objectMetadata ? objectMetadata["createdBy"] : null);
            state['createdBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        updatedBy: function(val, state) {
            context["field"] = "updatedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["updatedBy"] : null);
            state['updatedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdDate: function(val, state) {
            context["field"] = "createdDate";
            context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
            state['createdDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        updatedDate: function(val, state) {
            context["field"] = "updatedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
            state['updatedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function RolloverRequests(defaultValues) {
        var privateState = {};
        context["field"] = "facilityId";
        context["metadata"] = (objectMetadata ? objectMetadata["facilityId"] : null);
        privateState.facilityId = defaultValues ?
            (defaultValues["facilityId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["facilityId"], context) :
                null) :
            null;

        context["field"] = "loanId";
        context["metadata"] = (objectMetadata ? objectMetadata["loanId"] : null);
        privateState.loanId = defaultValues ?
            (defaultValues["loanId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["loanId"], context) :
                null) :
            null;

        context["field"] = "rolloverDays";
        context["metadata"] = (objectMetadata ? objectMetadata["rolloverDays"] : null);
        privateState.rolloverDays = defaultValues ?
            (defaultValues["rolloverDays"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rolloverDays"], context) :
                null) :
            null;

        context["field"] = "rolloverMonths";
        context["metadata"] = (objectMetadata ? objectMetadata["rolloverMonths"] : null);
        privateState.rolloverMonths = defaultValues ?
            (defaultValues["rolloverMonths"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rolloverMonths"], context) :
                null) :
            null;

        context["field"] = "rolloverYears";
        context["metadata"] = (objectMetadata ? objectMetadata["rolloverYears"] : null);
        privateState.rolloverYears = defaultValues ?
            (defaultValues["rolloverYears"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rolloverYears"], context) :
                null) :
            null;

        context["field"] = "rolloverRequestId";
        context["metadata"] = (objectMetadata ? objectMetadata["rolloverRequestId"] : null);
        privateState.rolloverRequestId = defaultValues ?
            (defaultValues["rolloverRequestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rolloverRequestId"], context) :
                null) :
            null;

        context["field"] = "createdBy";
        context["metadata"] = (objectMetadata ? objectMetadata["createdBy"] : null);
        privateState.createdBy = defaultValues ?
            (defaultValues["createdBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdBy"], context) :
                null) :
            null;

        context["field"] = "updatedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["updatedBy"] : null);
        privateState.updatedBy = defaultValues ?
            (defaultValues["updatedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["updatedBy"], context) :
                null) :
            null;

        context["field"] = "createdDate";
        context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
        privateState.createdDate = defaultValues ?
            (defaultValues["createdDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdDate"], context) :
                null) :
            null;

        context["field"] = "updatedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
        privateState.updatedDate = defaultValues ?
            (defaultValues["updatedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["updatedDate"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "facilityId": {
                get: function() {
                    context["field"] = "facilityId";
                    context["metadata"] = (objectMetadata ? objectMetadata["facilityId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.facilityId, context);
                },
                set: function(val) {
                    setterFunctions['facilityId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "loanId": {
                get: function() {
                    context["field"] = "loanId";
                    context["metadata"] = (objectMetadata ? objectMetadata["loanId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.loanId, context);
                },
                set: function(val) {
                    setterFunctions['loanId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rolloverDays": {
                get: function() {
                    context["field"] = "rolloverDays";
                    context["metadata"] = (objectMetadata ? objectMetadata["rolloverDays"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rolloverDays, context);
                },
                set: function(val) {
                    setterFunctions['rolloverDays'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rolloverMonths": {
                get: function() {
                    context["field"] = "rolloverMonths";
                    context["metadata"] = (objectMetadata ? objectMetadata["rolloverMonths"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rolloverMonths, context);
                },
                set: function(val) {
                    setterFunctions['rolloverMonths'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rolloverYears": {
                get: function() {
                    context["field"] = "rolloverYears";
                    context["metadata"] = (objectMetadata ? objectMetadata["rolloverYears"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rolloverYears, context);
                },
                set: function(val) {
                    setterFunctions['rolloverYears'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rolloverRequestId": {
                get: function() {
                    context["field"] = "rolloverRequestId";
                    context["metadata"] = (objectMetadata ? objectMetadata["rolloverRequestId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rolloverRequestId, context);
                },
                set: function(val) {
                    setterFunctions['rolloverRequestId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdBy": {
                get: function() {
                    context["field"] = "createdBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdBy, context);
                },
                set: function(val) {
                    setterFunctions['createdBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "updatedBy": {
                get: function() {
                    context["field"] = "updatedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["updatedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.updatedBy, context);
                },
                set: function(val) {
                    setterFunctions['updatedBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdDate": {
                get: function() {
                    context["field"] = "createdDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdDate, context);
                },
                set: function(val) {
                    setterFunctions['createdDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "updatedDate": {
                get: function() {
                    context["field"] = "updatedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.updatedDate, context);
                },
                set: function(val) {
                    setterFunctions['updatedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrCode": {
                get: function() {
                    context["field"] = "dbpErrCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrCode, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrMsg": {
                get: function() {
                    context["field"] = "dbpErrMsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrMsg, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrMsg'].call(this, val, privateState);
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
            privateState.facilityId = value ? (value["facilityId"] ? value["facilityId"] : null) : null;
            privateState.loanId = value ? (value["loanId"] ? value["loanId"] : null) : null;
            privateState.rolloverDays = value ? (value["rolloverDays"] ? value["rolloverDays"] : null) : null;
            privateState.rolloverMonths = value ? (value["rolloverMonths"] ? value["rolloverMonths"] : null) : null;
            privateState.rolloverYears = value ? (value["rolloverYears"] ? value["rolloverYears"] : null) : null;
            privateState.rolloverRequestId = value ? (value["rolloverRequestId"] ? value["rolloverRequestId"] : null) : null;
            privateState.createdBy = value ? (value["createdBy"] ? value["createdBy"] : null) : null;
            privateState.updatedBy = value ? (value["updatedBy"] ? value["updatedBy"] : null) : null;
            privateState.createdDate = value ? (value["createdDate"] ? value["createdDate"] : null) : null;
            privateState.updatedDate = value ? (value["updatedDate"] ? value["updatedDate"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(RolloverRequests);

    //Create new class level validator object
    BaseModel.Validator.call(RolloverRequests);

    var registerValidatorBackup = RolloverRequests.registerValidator;

    RolloverRequests.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(RolloverRequests.isValid(this, propName, val)) {
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
    //For Operation 'submit' with service id 'SubmitRolloverRequestOperation9000'
     RolloverRequests.submit = function(params, onCompletion){
        return RolloverRequests.customVerb('submit', params, onCompletion);
     };

    var relations = [];

    RolloverRequests.relations = relations;

    RolloverRequests.prototype.isValid = function() {
        return RolloverRequests.isValid(this);
    };

    RolloverRequests.prototype.objModelName = "RolloverRequests";
    RolloverRequests.prototype.objServiceName = "TradeLending";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    RolloverRequests.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeLending", "RolloverRequests", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    RolloverRequests.clone = function(objectToClone) {
        var clonedObj = new RolloverRequests();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return RolloverRequests;
});