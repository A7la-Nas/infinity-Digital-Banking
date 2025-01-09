/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "BankDate", "objectService" : "TransactionObjects"};

    var setterFunctions = {
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errcode: function(val, state) {
            context["field"] = "errcode";
            context["metadata"] = (objectMetadata ? objectMetadata["errcode"] : null);
            state['errcode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyId: function(val, state) {
            context["field"] = "companyId";
            context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
            state['companyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastWorkingDate: function(val, state) {
            context["field"] = "lastWorkingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lastWorkingDate"] : null);
            state['lastWorkingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nextWorkingDate: function(val, state) {
            context["field"] = "nextWorkingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["nextWorkingDate"] : null);
            state['nextWorkingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentWorkingDate: function(val, state) {
            context["field"] = "currentWorkingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["currentWorkingDate"] : null);
            state['currentWorkingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function BankDate(defaultValues) {
        var privateState = {};
        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "errcode";
        context["metadata"] = (objectMetadata ? objectMetadata["errcode"] : null);
        privateState.errcode = defaultValues ?
            (defaultValues["errcode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errcode"], context) :
                null) :
            null;

        context["field"] = "companyId";
        context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
        privateState.companyId = defaultValues ?
            (defaultValues["companyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyId"], context) :
                null) :
            null;

        context["field"] = "lastWorkingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lastWorkingDate"] : null);
        privateState.lastWorkingDate = defaultValues ?
            (defaultValues["lastWorkingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastWorkingDate"], context) :
                null) :
            null;

        context["field"] = "nextWorkingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["nextWorkingDate"] : null);
        privateState.nextWorkingDate = defaultValues ?
            (defaultValues["nextWorkingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nextWorkingDate"], context) :
                null) :
            null;

        context["field"] = "currentWorkingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["currentWorkingDate"] : null);
        privateState.currentWorkingDate = defaultValues ?
            (defaultValues["currentWorkingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentWorkingDate"], context) :
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
            "errcode": {
                get: function() {
                    context["field"] = "errcode";
                    context["metadata"] = (objectMetadata ? objectMetadata["errcode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errcode, context);
                },
                set: function(val) {
                    setterFunctions['errcode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companyId": {
                get: function() {
                    context["field"] = "companyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companyId, context);
                },
                set: function(val) {
                    setterFunctions['companyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastWorkingDate": {
                get: function() {
                    context["field"] = "lastWorkingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastWorkingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastWorkingDate, context);
                },
                set: function(val) {
                    setterFunctions['lastWorkingDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nextWorkingDate": {
                get: function() {
                    context["field"] = "nextWorkingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["nextWorkingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nextWorkingDate, context);
                },
                set: function(val) {
                    setterFunctions['nextWorkingDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentWorkingDate": {
                get: function() {
                    context["field"] = "currentWorkingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentWorkingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentWorkingDate, context);
                },
                set: function(val) {
                    setterFunctions['currentWorkingDate'].call(this, val, privateState);
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
            privateState.errcode = value ? (value["errcode"] ? value["errcode"] : null) : null;
            privateState.companyId = value ? (value["companyId"] ? value["companyId"] : null) : null;
            privateState.lastWorkingDate = value ? (value["lastWorkingDate"] ? value["lastWorkingDate"] : null) : null;
            privateState.nextWorkingDate = value ? (value["nextWorkingDate"] ? value["nextWorkingDate"] : null) : null;
            privateState.currentWorkingDate = value ? (value["currentWorkingDate"] ? value["currentWorkingDate"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(BankDate);

    //Create new class level validator object
    BaseModel.Validator.call(BankDate);

    var registerValidatorBackup = BankDate.registerValidator;

    BankDate.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(BankDate.isValid(this, propName, val)) {
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
    //For Operation 'getBankDate' with service id 'getBankDates9400'
     BankDate.getBankDate = function(params, onCompletion){
        return BankDate.customVerb('getBankDate', params, onCompletion);
     };

    var relations = [];

    BankDate.relations = relations;

    BankDate.prototype.isValid = function() {
        return BankDate.isValid(this);
    };

    BankDate.prototype.objModelName = "BankDate";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    BankDate.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TransactionObjects", "BankDate", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    BankDate.clone = function(objectToClone) {
        var clonedObj = new BankDate();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return BankDate;
});