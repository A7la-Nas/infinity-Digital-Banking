/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CombinedStatements", "objectService" : "DocumentManagement"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileType: function(val, state) {
            context["field"] = "fileType";
            context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
            state['fileType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateFormat: function(val, state) {
            context["field"] = "dateFormat";
            context["metadata"] = (objectMetadata ? objectMetadata["dateFormat"] : null);
            state['dateFormat'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toDate: function(val, state) {
            context["field"] = "toDate";
            context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
            state['toDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromDate: function(val, state) {
            context["field"] = "fromDate";
            context["metadata"] = (objectMetadata ? objectMetadata["fromDate"] : null);
            state['fromDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountsInfo: function(val, state) {
            context["field"] = "accountsInfo";
            context["metadata"] = (objectMetadata ? objectMetadata["accountsInfo"] : null);
            state['accountsInfo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileName: function(val, state) {
            context["field"] = "fileName";
            context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
            state['fileName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function CombinedStatements(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "fileType";
        context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
        privateState.fileType = defaultValues ?
            (defaultValues["fileType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileType"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "dateFormat";
        context["metadata"] = (objectMetadata ? objectMetadata["dateFormat"] : null);
        privateState.dateFormat = defaultValues ?
            (defaultValues["dateFormat"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateFormat"], context) :
                null) :
            null;

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "toDate";
        context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
        privateState.toDate = defaultValues ?
            (defaultValues["toDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toDate"], context) :
                null) :
            null;

        context["field"] = "fromDate";
        context["metadata"] = (objectMetadata ? objectMetadata["fromDate"] : null);
        privateState.fromDate = defaultValues ?
            (defaultValues["fromDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromDate"], context) :
                null) :
            null;

        context["field"] = "accountsInfo";
        context["metadata"] = (objectMetadata ? objectMetadata["accountsInfo"] : null);
        privateState.accountsInfo = defaultValues ?
            (defaultValues["accountsInfo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountsInfo"], context) :
                null) :
            null;

        context["field"] = "fileName";
        context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
        privateState.fileName = defaultValues ?
            (defaultValues["fileName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileName"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "id": {
                get: function() {
                    context["field"] = "id";
                    context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id, context);
                },
                set: function(val) {
                    setterFunctions['id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userId": {
                get: function() {
                    context["field"] = "userId";
                    context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userId, context);
                },
                set: function(val) {
                    setterFunctions['userId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileType": {
                get: function() {
                    context["field"] = "fileType";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileType, context);
                },
                set: function(val) {
                    setterFunctions['fileType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankName": {
                get: function() {
                    context["field"] = "bankName";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankName, context);
                },
                set: function(val) {
                    setterFunctions['bankName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateFormat": {
                get: function() {
                    context["field"] = "dateFormat";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateFormat"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateFormat, context);
                },
                set: function(val) {
                    setterFunctions['dateFormat'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currencyCode": {
                get: function() {
                    context["field"] = "currencyCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currencyCode, context);
                },
                set: function(val) {
                    setterFunctions['currencyCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "toDate": {
                get: function() {
                    context["field"] = "toDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toDate, context);
                },
                set: function(val) {
                    setterFunctions['toDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromDate": {
                get: function() {
                    context["field"] = "fromDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromDate, context);
                },
                set: function(val) {
                    setterFunctions['fromDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountsInfo": {
                get: function() {
                    context["field"] = "accountsInfo";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountsInfo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountsInfo, context);
                },
                set: function(val) {
                    setterFunctions['accountsInfo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileName": {
                get: function() {
                    context["field"] = "fileName";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileName, context);
                },
                set: function(val) {
                    setterFunctions['fileName'].call(this, val, privateState);
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
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.fileType = value ? (value["fileType"] ? value["fileType"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.dateFormat = value ? (value["dateFormat"] ? value["dateFormat"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.toDate = value ? (value["toDate"] ? value["toDate"] : null) : null;
            privateState.fromDate = value ? (value["fromDate"] ? value["fromDate"] : null) : null;
            privateState.accountsInfo = value ? (value["accountsInfo"] ? value["accountsInfo"] : null) : null;
            privateState.fileName = value ? (value["fileName"] ? value["fileName"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(CombinedStatements);

    //Create new class level validator object
    BaseModel.Validator.call(CombinedStatements);

    var registerValidatorBackup = CombinedStatements.registerValidator;

    CombinedStatements.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CombinedStatements.isValid(this, propName, val)) {
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
    //For Operation 'getStatements' with service id 'getAccountStatementDetails3701'
     CombinedStatements.getStatements = function(params, onCompletion){
        return CombinedStatements.customVerb('getStatements', params, onCompletion);
     };

    //For Operation 'generateCombinedStatementsFileId' with service id 'generateCombinedStatementFileId4121'
     CombinedStatements.generateCombinedStatementsFileId = function(params, onCompletion){
        return CombinedStatements.customVerb('generateCombinedStatementsFileId', params, onCompletion);
     };

    //For Operation 'generate' with service id 'generateCombinedStatementFile5835'
     CombinedStatements.generate = function(params, onCompletion){
        return CombinedStatements.customVerb('generate', params, onCompletion);
     };

    var relations = [];

    CombinedStatements.relations = relations;

    CombinedStatements.prototype.isValid = function() {
        return CombinedStatements.isValid(this);
    };

    CombinedStatements.prototype.objModelName = "CombinedStatements";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CombinedStatements.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("DocumentManagement", "CombinedStatements", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CombinedStatements.clone = function(objectToClone) {
        var clonedObj = new CombinedStatements();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CombinedStatements;
});