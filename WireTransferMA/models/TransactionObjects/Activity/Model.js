/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Activity", "objectService" : "TransactionObjects"};

    var setterFunctions = {
        firstRecordNumber: function(val, state) {
            context["field"] = "firstRecordNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["firstRecordNumber"] : null);
            state['firstRecordNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastRecordNumber: function(val, state) {
            context["field"] = "lastRecordNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["lastRecordNumber"] : null);
            state['lastRecordNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortBy: function(val, state) {
            context["field"] = "sortBy";
            context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
            state['sortBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryId: function(val, state) {
            context["field"] = "beneficiaryId";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryId"] : null);
            state['beneficiaryId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        order: function(val, state) {
            context["field"] = "order";
            context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
            state['order'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeId: function(val, state) {
            context["field"] = "payeeId";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
            state['payeeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limit: function(val, state) {
            context["field"] = "limit";
            context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
            state['limit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Activity(defaultValues) {
        var privateState = {};
        context["field"] = "firstRecordNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["firstRecordNumber"] : null);
        privateState.firstRecordNumber = defaultValues ?
            (defaultValues["firstRecordNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["firstRecordNumber"], context) :
                null) :
            null;

        context["field"] = "lastRecordNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["lastRecordNumber"] : null);
        privateState.lastRecordNumber = defaultValues ?
            (defaultValues["lastRecordNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastRecordNumber"], context) :
                null) :
            null;

        context["field"] = "sortBy";
        context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
        privateState.sortBy = defaultValues ?
            (defaultValues["sortBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortBy"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "beneficiaryId";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryId"] : null);
        privateState.beneficiaryId = defaultValues ?
            (defaultValues["beneficiaryId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryId"], context) :
                null) :
            null;

        context["field"] = "order";
        context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
        privateState.order = defaultValues ?
            (defaultValues["order"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["order"], context) :
                null) :
            null;

        context["field"] = "payeeId";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
        privateState.payeeId = defaultValues ?
            (defaultValues["payeeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeId"], context) :
                null) :
            null;

        context["field"] = "limit";
        context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
        privateState.limit = defaultValues ?
            (defaultValues["limit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limit"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "firstRecordNumber": {
                get: function() {
                    context["field"] = "firstRecordNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["firstRecordNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.firstRecordNumber, context);
                },
                set: function(val) {
                    setterFunctions['firstRecordNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastRecordNumber": {
                get: function() {
                    context["field"] = "lastRecordNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastRecordNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastRecordNumber, context);
                },
                set: function(val) {
                    setterFunctions['lastRecordNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortBy": {
                get: function() {
                    context["field"] = "sortBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortBy, context);
                },
                set: function(val) {
                    setterFunctions['sortBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountNumber": {
                get: function() {
                    context["field"] = "accountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountNumber, context);
                },
                set: function(val) {
                    setterFunctions['accountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryId": {
                get: function() {
                    context["field"] = "beneficiaryId";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryId, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "order": {
                get: function() {
                    context["field"] = "order";
                    context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.order, context);
                },
                set: function(val) {
                    setterFunctions['order'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payeeId": {
                get: function() {
                    context["field"] = "payeeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeId, context);
                },
                set: function(val) {
                    setterFunctions['payeeId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limit": {
                get: function() {
                    context["field"] = "limit";
                    context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limit, context);
                },
                set: function(val) {
                    setterFunctions['limit'].call(this, val, privateState);
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
            privateState.firstRecordNumber = value ? (value["firstRecordNumber"] ? value["firstRecordNumber"] : null) : null;
            privateState.lastRecordNumber = value ? (value["lastRecordNumber"] ? value["lastRecordNumber"] : null) : null;
            privateState.sortBy = value ? (value["sortBy"] ? value["sortBy"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.beneficiaryId = value ? (value["beneficiaryId"] ? value["beneficiaryId"] : null) : null;
            privateState.order = value ? (value["order"] ? value["order"] : null) : null;
            privateState.payeeId = value ? (value["payeeId"] ? value["payeeId"] : null) : null;
            privateState.limit = value ? (value["limit"] ? value["limit"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Activity);

    //Create new class level validator object
    BaseModel.Validator.call(Activity);

    var registerValidatorBackup = Activity.registerValidator;

    Activity.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Activity.isValid(this, propName, val)) {
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
    //For Operation 'getToExternalAccountTransactions' with service id 'getToExternalAccountTransactions9746'
     Activity.getToExternalAccountTransactions = function(params, onCompletion){
        return Activity.customVerb('getToExternalAccountTransactions', params, onCompletion);
     };

    //For Operation 'getUserWiredTransactions' with service id 'getUserWiredTransactions9079'
     Activity.getUserWiredTransactions = function(params, onCompletion){
        return Activity.customVerb('getUserWiredTransactions', params, onCompletion);
     };

    //For Operation 'getRecipientWireTransaction' with service id 'getRecipientWireTransaction9075'
     Activity.getRecipientWireTransaction = function(params, onCompletion){
        return Activity.customVerb('getRecipientWireTransaction', params, onCompletion);
     };

    var relations = [];

    Activity.relations = relations;

    Activity.prototype.isValid = function() {
        return Activity.isValid(this);
    };

    Activity.prototype.objModelName = "Activity";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Activity.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TransactionObjects", "Activity", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Activity.clone = function(objectToClone) {
        var clonedObj = new Activity();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Activity;
});