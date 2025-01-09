/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "DirectDebits", "objectService" : "Transfers"};

    var setterFunctions = {
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromAccountName: function(val, state) {
            context["field"] = "fromAccountName";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountName"] : null);
            state['fromAccountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        directDebitId: function(val, state) {
            context["field"] = "directDebitId";
            context["metadata"] = (objectMetadata ? objectMetadata["directDebitId"] : null);
            state['directDebitId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        mandateReference: function(val, state) {
            context["field"] = "mandateReference";
            context["metadata"] = (objectMetadata ? objectMetadata["mandateReference"] : null);
            state['mandateReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastPaymentDate: function(val, state) {
            context["field"] = "lastPaymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentDate"] : null);
            state['lastPaymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signingDate: function(val, state) {
            context["field"] = "signingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["signingDate"] : null);
            state['signingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        startDate: function(val, state) {
            context["field"] = "startDate";
            context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
            state['startDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditorReference: function(val, state) {
            context["field"] = "creditorReference";
            context["metadata"] = (objectMetadata ? objectMetadata["creditorReference"] : null);
            state['creditorReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditorAddress: function(val, state) {
            context["field"] = "creditorAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["creditorAddress"] : null);
            state['creditorAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestBody: function(val, state) {
            context["field"] = "requestBody";
            context["metadata"] = (objectMetadata ? objectMetadata["requestBody"] : null);
            state['requestBody'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        type: function(val, state) {
            context["field"] = "type";
            context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
            state['type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        subtype: function(val, state) {
            context["field"] = "subtype";
            context["metadata"] = (objectMetadata ? objectMetadata["subtype"] : null);
            state['subtype'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderId: function(val, state) {
            context["field"] = "orderId";
            context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
            state['orderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        errorDetails: function(val, state) {
            context["field"] = "errorDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["errorDetails"] : null);
            state['errorDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageDetails: function(val, state) {
            context["field"] = "messageDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["messageDetails"] : null);
            state['messageDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        error: function(val, state) {
            context["field"] = "error";
            context["metadata"] = (objectMetadata ? objectMetadata["error"] : null);
            state['error'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        directDebitStatus: function(val, state) {
            context["field"] = "directDebitStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["directDebitStatus"] : null);
            state['directDebitStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function DirectDebits(defaultValues) {
        var privateState = {};
        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
                null) :
            null;

        context["field"] = "fromAccountName";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountName"] : null);
        privateState.fromAccountName = defaultValues ?
            (defaultValues["fromAccountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountName"], context) :
                null) :
            null;

        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
                null) :
            null;

        context["field"] = "directDebitId";
        context["metadata"] = (objectMetadata ? objectMetadata["directDebitId"] : null);
        privateState.directDebitId = defaultValues ?
            (defaultValues["directDebitId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["directDebitId"], context) :
                null) :
            null;

        context["field"] = "mandateReference";
        context["metadata"] = (objectMetadata ? objectMetadata["mandateReference"] : null);
        privateState.mandateReference = defaultValues ?
            (defaultValues["mandateReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["mandateReference"], context) :
                null) :
            null;

        context["field"] = "lastPaymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentDate"] : null);
        privateState.lastPaymentDate = defaultValues ?
            (defaultValues["lastPaymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastPaymentDate"], context) :
                null) :
            null;

        context["field"] = "signingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["signingDate"] : null);
        privateState.signingDate = defaultValues ?
            (defaultValues["signingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signingDate"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "startDate";
        context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
        privateState.startDate = defaultValues ?
            (defaultValues["startDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["startDate"], context) :
                null) :
            null;

        context["field"] = "creditorReference";
        context["metadata"] = (objectMetadata ? objectMetadata["creditorReference"] : null);
        privateState.creditorReference = defaultValues ?
            (defaultValues["creditorReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditorReference"], context) :
                null) :
            null;

        context["field"] = "creditorAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["creditorAddress"] : null);
        privateState.creditorAddress = defaultValues ?
            (defaultValues["creditorAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditorAddress"], context) :
                null) :
            null;

        context["field"] = "requestBody";
        context["metadata"] = (objectMetadata ? objectMetadata["requestBody"] : null);
        privateState.requestBody = defaultValues ?
            (defaultValues["requestBody"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestBody"], context) :
                null) :
            null;

        context["field"] = "type";
        context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
        privateState.type = defaultValues ?
            (defaultValues["type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["type"], context) :
                null) :
            null;

        context["field"] = "subtype";
        context["metadata"] = (objectMetadata ? objectMetadata["subtype"] : null);
        privateState.subtype = defaultValues ?
            (defaultValues["subtype"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["subtype"], context) :
                null) :
            null;

        context["field"] = "orderId";
        context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
        privateState.orderId = defaultValues ?
            (defaultValues["orderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderId"], context) :
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

        context["field"] = "errorDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["errorDetails"] : null);
        privateState.errorDetails = defaultValues ?
            (defaultValues["errorDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorDetails"], context) :
                null) :
            null;

        context["field"] = "messageDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["messageDetails"] : null);
        privateState.messageDetails = defaultValues ?
            (defaultValues["messageDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageDetails"], context) :
                null) :
            null;

        context["field"] = "error";
        context["metadata"] = (objectMetadata ? objectMetadata["error"] : null);
        privateState.error = defaultValues ?
            (defaultValues["error"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["error"], context) :
                null) :
            null;

        context["field"] = "directDebitStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["directDebitStatus"] : null);
        privateState.directDebitStatus = defaultValues ?
            (defaultValues["directDebitStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["directDebitStatus"], context) :
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
            "fromAccountName": {
                get: function() {
                    context["field"] = "fromAccountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccountName, context);
                },
                set: function(val) {
                    setterFunctions['fromAccountName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryName": {
                get: function() {
                    context["field"] = "beneficiaryName";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryName, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "directDebitId": {
                get: function() {
                    context["field"] = "directDebitId";
                    context["metadata"] = (objectMetadata ? objectMetadata["directDebitId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.directDebitId, context);
                },
                set: function(val) {
                    setterFunctions['directDebitId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "mandateReference": {
                get: function() {
                    context["field"] = "mandateReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["mandateReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.mandateReference, context);
                },
                set: function(val) {
                    setterFunctions['mandateReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastPaymentDate": {
                get: function() {
                    context["field"] = "lastPaymentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastPaymentDate, context);
                },
                set: function(val) {
                    setterFunctions['lastPaymentDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "signingDate": {
                get: function() {
                    context["field"] = "signingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["signingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signingDate, context);
                },
                set: function(val) {
                    setterFunctions['signingDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "status": {
                get: function() {
                    context["field"] = "status";
                    context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.status, context);
                },
                set: function(val) {
                    setterFunctions['status'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "startDate": {
                get: function() {
                    context["field"] = "startDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.startDate, context);
                },
                set: function(val) {
                    setterFunctions['startDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditorReference": {
                get: function() {
                    context["field"] = "creditorReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditorReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditorReference, context);
                },
                set: function(val) {
                    setterFunctions['creditorReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditorAddress": {
                get: function() {
                    context["field"] = "creditorAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditorAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditorAddress, context);
                },
                set: function(val) {
                    setterFunctions['creditorAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestBody": {
                get: function() {
                    context["field"] = "requestBody";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestBody"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestBody, context);
                },
                set: function(val) {
                    setterFunctions['requestBody'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "type": {
                get: function() {
                    context["field"] = "type";
                    context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.type, context);
                },
                set: function(val) {
                    setterFunctions['type'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "subtype": {
                get: function() {
                    context["field"] = "subtype";
                    context["metadata"] = (objectMetadata ? objectMetadata["subtype"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.subtype, context);
                },
                set: function(val) {
                    setterFunctions['subtype'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "orderId": {
                get: function() {
                    context["field"] = "orderId";
                    context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orderId, context);
                },
                set: function(val) {
                    setterFunctions['orderId'].call(this, val, privateState);
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
            "errorDetails": {
                get: function() {
                    context["field"] = "errorDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorDetails, context);
                },
                set: function(val) {
                    setterFunctions['errorDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "messageDetails": {
                get: function() {
                    context["field"] = "messageDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["messageDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messageDetails, context);
                },
                set: function(val) {
                    setterFunctions['messageDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "error": {
                get: function() {
                    context["field"] = "error";
                    context["metadata"] = (objectMetadata ? objectMetadata["error"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.error, context);
                },
                set: function(val) {
                    setterFunctions['error'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "directDebitStatus": {
                get: function() {
                    context["field"] = "directDebitStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["directDebitStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.directDebitStatus, context);
                },
                set: function(val) {
                    setterFunctions['directDebitStatus'].call(this, val, privateState);
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
            privateState.fromAccountName = value ? (value["fromAccountName"] ? value["fromAccountName"] : null) : null;
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.directDebitId = value ? (value["directDebitId"] ? value["directDebitId"] : null) : null;
            privateState.mandateReference = value ? (value["mandateReference"] ? value["mandateReference"] : null) : null;
            privateState.lastPaymentDate = value ? (value["lastPaymentDate"] ? value["lastPaymentDate"] : null) : null;
            privateState.signingDate = value ? (value["signingDate"] ? value["signingDate"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.startDate = value ? (value["startDate"] ? value["startDate"] : null) : null;
            privateState.creditorReference = value ? (value["creditorReference"] ? value["creditorReference"] : null) : null;
            privateState.creditorAddress = value ? (value["creditorAddress"] ? value["creditorAddress"] : null) : null;
            privateState.requestBody = value ? (value["requestBody"] ? value["requestBody"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.subtype = value ? (value["subtype"] ? value["subtype"] : null) : null;
            privateState.orderId = value ? (value["orderId"] ? value["orderId"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.errorDetails = value ? (value["errorDetails"] ? value["errorDetails"] : null) : null;
            privateState.messageDetails = value ? (value["messageDetails"] ? value["messageDetails"] : null) : null;
            privateState.error = value ? (value["error"] ? value["error"] : null) : null;
            privateState.directDebitStatus = value ? (value["directDebitStatus"] ? value["directDebitStatus"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(DirectDebits);

    //Create new class level validator object
    BaseModel.Validator.call(DirectDebits);

    var registerValidatorBackup = DirectDebits.registerValidator;

    DirectDebits.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(DirectDebits.isValid(this, propName, val)) {
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
    //For Operation 'getDirectDebits' with service id 'getDirectDebits1225'
     DirectDebits.getDirectDebits = function(params, onCompletion){
        return DirectDebits.customVerb('getDirectDebits', params, onCompletion);
     };

    //For Operation 'stopNextPayment' with service id 'stopNextPayment2884'
     DirectDebits.stopNextPayment = function(params, onCompletion){
        return DirectDebits.customVerb('stopNextPayment', params, onCompletion);
     };

    //For Operation 'cancelDirectDebit' with service id 'cancelDirectDebit1126'
     DirectDebits.cancelDirectDebit = function(params, onCompletion){
        return DirectDebits.customVerb('cancelDirectDebit', params, onCompletion);
     };

    var relations = [];

    DirectDebits.relations = relations;

    DirectDebits.prototype.isValid = function() {
        return DirectDebits.isValid(this);
    };

    DirectDebits.prototype.objModelName = "DirectDebits";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    DirectDebits.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Transfers", "DirectDebits", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    DirectDebits.clone = function(objectToClone) {
        var clonedObj = new DirectDebits();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return DirectDebits;
});