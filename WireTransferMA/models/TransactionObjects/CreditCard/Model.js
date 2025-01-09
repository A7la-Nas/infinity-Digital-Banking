/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CreditCard", "objectService" : "TransactionObjects"};

    var setterFunctions = {
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountType: function(val, state) {
            context["field"] = "accountType";
            context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
            state['accountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dueDate: function(val, state) {
            context["field"] = "dueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["dueDate"] : null);
            state['dueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        minimumDue: function(val, state) {
            context["field"] = "minimumDue";
            context["metadata"] = (objectMetadata ? objectMetadata["minimumDue"] : null);
            state['minimumDue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        outstandingBalance: function(val, state) {
            context["field"] = "outstandingBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance"] : null);
            state['outstandingBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nickName: function(val, state) {
            context["field"] = "nickName";
            context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
            state['nickName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        typeDescription: function(val, state) {
            context["field"] = "typeDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["typeDescription"] : null);
            state['typeDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDue: function(val, state) {
            context["field"] = "paymentDue";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDue"] : null);
            state['paymentDue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        principalBalance: function(val, state) {
            context["field"] = "principalBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["principalBalance"] : null);
            state['principalBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    function CreditCard(defaultValues) {
        var privateState = {};
        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
                null) :
            null;

        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "accountType";
        context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
        privateState.accountType = defaultValues ?
            (defaultValues["accountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountType"], context) :
                null) :
            null;

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "dueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["dueDate"] : null);
        privateState.dueDate = defaultValues ?
            (defaultValues["dueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dueDate"], context) :
                null) :
            null;

        context["field"] = "minimumDue";
        context["metadata"] = (objectMetadata ? objectMetadata["minimumDue"] : null);
        privateState.minimumDue = defaultValues ?
            (defaultValues["minimumDue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["minimumDue"], context) :
                null) :
            null;

        context["field"] = "outstandingBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance"] : null);
        privateState.outstandingBalance = defaultValues ?
            (defaultValues["outstandingBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["outstandingBalance"], context) :
                null) :
            null;

        context["field"] = "nickName";
        context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
        privateState.nickName = defaultValues ?
            (defaultValues["nickName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nickName"], context) :
                null) :
            null;

        context["field"] = "typeDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["typeDescription"] : null);
        privateState.typeDescription = defaultValues ?
            (defaultValues["typeDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["typeDescription"], context) :
                null) :
            null;

        context["field"] = "paymentDue";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDue"] : null);
        privateState.paymentDue = defaultValues ?
            (defaultValues["paymentDue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDue"], context) :
                null) :
            null;

        context["field"] = "principalBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["principalBalance"] : null);
        privateState.principalBalance = defaultValues ?
            (defaultValues["principalBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["principalBalance"], context) :
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
            "accountID": {
                get: function() {
                    context["field"] = "accountID";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountID, context);
                },
                set: function(val) {
                    setterFunctions['accountID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountName": {
                get: function() {
                    context["field"] = "accountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountName, context);
                },
                set: function(val) {
                    setterFunctions['accountName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountType": {
                get: function() {
                    context["field"] = "accountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountType, context);
                },
                set: function(val) {
                    setterFunctions['accountType'].call(this, val, privateState);
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
            "dueDate": {
                get: function() {
                    context["field"] = "dueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["dueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dueDate, context);
                },
                set: function(val) {
                    setterFunctions['dueDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "minimumDue": {
                get: function() {
                    context["field"] = "minimumDue";
                    context["metadata"] = (objectMetadata ? objectMetadata["minimumDue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.minimumDue, context);
                },
                set: function(val) {
                    setterFunctions['minimumDue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "outstandingBalance": {
                get: function() {
                    context["field"] = "outstandingBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.outstandingBalance, context);
                },
                set: function(val) {
                    setterFunctions['outstandingBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nickName": {
                get: function() {
                    context["field"] = "nickName";
                    context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nickName, context);
                },
                set: function(val) {
                    setterFunctions['nickName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "typeDescription": {
                get: function() {
                    context["field"] = "typeDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["typeDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.typeDescription, context);
                },
                set: function(val) {
                    setterFunctions['typeDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentDue": {
                get: function() {
                    context["field"] = "paymentDue";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentDue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentDue, context);
                },
                set: function(val) {
                    setterFunctions['paymentDue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "principalBalance": {
                get: function() {
                    context["field"] = "principalBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["principalBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.principalBalance, context);
                },
                set: function(val) {
                    setterFunctions['principalBalance'].call(this, val, privateState);
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
            privateState.accountID = value ? (value["accountID"] ? value["accountID"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.accountType = value ? (value["accountType"] ? value["accountType"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.dueDate = value ? (value["dueDate"] ? value["dueDate"] : null) : null;
            privateState.minimumDue = value ? (value["minimumDue"] ? value["minimumDue"] : null) : null;
            privateState.outstandingBalance = value ? (value["outstandingBalance"] ? value["outstandingBalance"] : null) : null;
            privateState.nickName = value ? (value["nickName"] ? value["nickName"] : null) : null;
            privateState.typeDescription = value ? (value["typeDescription"] ? value["typeDescription"] : null) : null;
            privateState.paymentDue = value ? (value["paymentDue"] ? value["paymentDue"] : null) : null;
            privateState.principalBalance = value ? (value["principalBalance"] ? value["principalBalance"] : null) : null;
            privateState.payeeId = value ? (value["payeeId"] ? value["payeeId"] : null) : null;
            privateState.limit = value ? (value["limit"] ? value["limit"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(CreditCard);

    //Create new class level validator object
    BaseModel.Validator.call(CreditCard);

    var registerValidatorBackup = CreditCard.registerValidator;

    CreditCard.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CreditCard.isValid(this, propName, val)) {
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
    //For Operation 'getCreditCardAccounts' with service id 'getCreditCardAccounts8449'
     CreditCard.getCreditCardAccounts = function(params, onCompletion){
        return CreditCard.customVerb('getCreditCardAccounts', params, onCompletion);
     };

    //For Operation 'createCreditCardTransfer' with service id 'createCreditCardTransfer7559'
     CreditCard.createCreditCardTransfer = function(params, onCompletion){
        return CreditCard.customVerb('createCreditCardTransfer', params, onCompletion);
     };

    var relations = [];

    CreditCard.relations = relations;

    CreditCard.prototype.isValid = function() {
        return CreditCard.isValid(this);
    };

    CreditCard.prototype.objModelName = "CreditCard";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CreditCard.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TransactionObjects", "CreditCard", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CreditCard.clone = function(objectToClone) {
        var clonedObj = new CreditCard();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CreditCard;
});