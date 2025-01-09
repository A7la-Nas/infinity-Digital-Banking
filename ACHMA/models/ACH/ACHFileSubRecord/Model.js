/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ACHFileSubRecord", "objectService" : "ACH"};

    var setterFunctions = {
        achFileSubRecordId: function(val, state) {
            context["field"] = "achFileSubRecordId";
            context["metadata"] = (objectMetadata ? objectMetadata["achFileSubRecordId"] : null);
            state['achFileSubRecordId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        achFileRecordId: function(val, state) {
            context["field"] = "achFileRecordId";
            context["metadata"] = (objectMetadata ? objectMetadata["achFileRecordId"] : null);
            state['achFileRecordId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        receiverAccountNumber: function(val, state) {
            context["field"] = "receiverAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["receiverAccountNumber"] : null);
            state['receiverAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        receiverAccountType: function(val, state) {
            context["field"] = "receiverAccountType";
            context["metadata"] = (objectMetadata ? objectMetadata["receiverAccountType"] : null);
            state['receiverAccountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        receiverName: function(val, state) {
            context["field"] = "receiverName";
            context["metadata"] = (objectMetadata ? objectMetadata["receiverName"] : null);
            state['receiverName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        receiverTransactionType: function(val, state) {
            context["field"] = "receiverTransactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["receiverTransactionType"] : null);
            state['receiverTransactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ACHFileSubRecord(defaultValues) {
        var privateState = {};
        context["field"] = "achFileSubRecordId";
        context["metadata"] = (objectMetadata ? objectMetadata["achFileSubRecordId"] : null);
        privateState.achFileSubRecordId = defaultValues ?
            (defaultValues["achFileSubRecordId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["achFileSubRecordId"], context) :
                null) :
            null;

        context["field"] = "achFileRecordId";
        context["metadata"] = (objectMetadata ? objectMetadata["achFileRecordId"] : null);
        privateState.achFileRecordId = defaultValues ?
            (defaultValues["achFileRecordId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["achFileRecordId"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "receiverAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["receiverAccountNumber"] : null);
        privateState.receiverAccountNumber = defaultValues ?
            (defaultValues["receiverAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["receiverAccountNumber"], context) :
                null) :
            null;

        context["field"] = "receiverAccountType";
        context["metadata"] = (objectMetadata ? objectMetadata["receiverAccountType"] : null);
        privateState.receiverAccountType = defaultValues ?
            (defaultValues["receiverAccountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["receiverAccountType"], context) :
                null) :
            null;

        context["field"] = "receiverName";
        context["metadata"] = (objectMetadata ? objectMetadata["receiverName"] : null);
        privateState.receiverName = defaultValues ?
            (defaultValues["receiverName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["receiverName"], context) :
                null) :
            null;

        context["field"] = "receiverTransactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["receiverTransactionType"] : null);
        privateState.receiverTransactionType = defaultValues ?
            (defaultValues["receiverTransactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["receiverTransactionType"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "achFileSubRecordId": {
                get: function() {
                    context["field"] = "achFileSubRecordId";
                    context["metadata"] = (objectMetadata ? objectMetadata["achFileSubRecordId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.achFileSubRecordId, context);
                },
                set: function(val) {
                    setterFunctions['achFileSubRecordId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "achFileRecordId": {
                get: function() {
                    context["field"] = "achFileRecordId";
                    context["metadata"] = (objectMetadata ? objectMetadata["achFileRecordId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.achFileRecordId, context);
                },
                set: function(val) {
                    setterFunctions['achFileRecordId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amount": {
                get: function() {
                    context["field"] = "amount";
                    context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amount, context);
                },
                set: function(val) {
                    setterFunctions['amount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "receiverAccountNumber": {
                get: function() {
                    context["field"] = "receiverAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["receiverAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.receiverAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['receiverAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "receiverAccountType": {
                get: function() {
                    context["field"] = "receiverAccountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["receiverAccountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.receiverAccountType, context);
                },
                set: function(val) {
                    setterFunctions['receiverAccountType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "receiverName": {
                get: function() {
                    context["field"] = "receiverName";
                    context["metadata"] = (objectMetadata ? objectMetadata["receiverName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.receiverName, context);
                },
                set: function(val) {
                    setterFunctions['receiverName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "receiverTransactionType": {
                get: function() {
                    context["field"] = "receiverTransactionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["receiverTransactionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.receiverTransactionType, context);
                },
                set: function(val) {
                    setterFunctions['receiverTransactionType'].call(this, val, privateState);
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
            privateState.achFileSubRecordId = value ? (value["achFileSubRecordId"] ? value["achFileSubRecordId"] : null) : null;
            privateState.achFileRecordId = value ? (value["achFileRecordId"] ? value["achFileRecordId"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.receiverAccountNumber = value ? (value["receiverAccountNumber"] ? value["receiverAccountNumber"] : null) : null;
            privateState.receiverAccountType = value ? (value["receiverAccountType"] ? value["receiverAccountType"] : null) : null;
            privateState.receiverName = value ? (value["receiverName"] ? value["receiverName"] : null) : null;
            privateState.receiverTransactionType = value ? (value["receiverTransactionType"] ? value["receiverTransactionType"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ACHFileSubRecord);

    //Create new class level validator object
    BaseModel.Validator.call(ACHFileSubRecord);

    var registerValidatorBackup = ACHFileSubRecord.registerValidator;

    ACHFileSubRecord.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ACHFileSubRecord.isValid(this, propName, val)) {
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
    //For Operation 'fetchACHFileSubRecords' with service id 'FetchACHFileSubRecords2561'
     ACHFileSubRecord.fetchACHFileSubRecords = function(params, onCompletion){
        return ACHFileSubRecord.customVerb('fetchACHFileSubRecords', params, onCompletion);
     };

    var relations = [];

    ACHFileSubRecord.relations = relations;

    ACHFileSubRecord.prototype.isValid = function() {
        return ACHFileSubRecord.isValid(this);
    };

    ACHFileSubRecord.prototype.objModelName = "ACHFileSubRecord";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ACHFileSubRecord.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ACH", "ACHFileSubRecord", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ACHFileSubRecord.clone = function(objectToClone) {
        var clonedObj = new ACHFileSubRecord();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ACHFileSubRecord;
});