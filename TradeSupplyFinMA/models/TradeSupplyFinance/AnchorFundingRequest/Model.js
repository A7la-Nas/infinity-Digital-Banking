/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "AnchorFundingRequest", "objectService" : "TradeSupplyFinance"};

    var setterFunctions = {
        buyerId: function(val, state) {
            context["field"] = "buyerId";
            context["metadata"] = (objectMetadata ? objectMetadata["buyerId"] : null);
            state['buyerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdDate: function(val, state) {
            context["field"] = "createdDate";
            context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
            state['createdDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        facilityId: function(val, state) {
            context["field"] = "facilityId";
            context["metadata"] = (objectMetadata ? objectMetadata["facilityId"] : null);
            state['facilityId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        facilityAvailableLimit: function(val, state) {
            context["field"] = "facilityAvailableLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["facilityAvailableLimit"] : null);
            state['facilityAvailableLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        facilityCurrency: function(val, state) {
            context["field"] = "facilityCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["facilityCurrency"] : null);
            state['facilityCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        facilityUtilisedLimit: function(val, state) {
            context["field"] = "facilityUtilisedLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["facilityUtilisedLimit"] : null);
            state['facilityUtilisedLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        financingDate: function(val, state) {
            context["field"] = "financingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["financingDate"] : null);
            state['financingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fundingDocuments: function(val, state) {
            context["field"] = "fundingDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["fundingDocuments"] : null);
            state['fundingDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fundingRequestAmount: function(val, state) {
            context["field"] = "fundingRequestAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["fundingRequestAmount"] : null);
            state['fundingRequestAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fundingRequestId: function(val, state) {
            context["field"] = "fundingRequestId";
            context["metadata"] = (objectMetadata ? objectMetadata["fundingRequestId"] : null);
            state['fundingRequestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        invoiceReferences: function(val, state) {
            context["field"] = "invoiceReferences";
            context["metadata"] = (objectMetadata ? objectMetadata["invoiceReferences"] : null);
            state['invoiceReferences'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        programName: function(val, state) {
            context["field"] = "programName";
            context["metadata"] = (objectMetadata ? objectMetadata["programName"] : null);
            state['programName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productId: function(val, state) {
            context["field"] = "productId";
            context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
            state['productId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productName: function(val, state) {
            context["field"] = "productName";
            context["metadata"] = (objectMetadata ? objectMetadata["productName"] : null);
            state['productName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supplierId: function(val, state) {
            context["field"] = "supplierId";
            context["metadata"] = (objectMetadata ? objectMetadata["supplierId"] : null);
            state['supplierId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    function AnchorFundingRequest(defaultValues) {
        var privateState = {};
        context["field"] = "buyerId";
        context["metadata"] = (objectMetadata ? objectMetadata["buyerId"] : null);
        privateState.buyerId = defaultValues ?
            (defaultValues["buyerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["buyerId"], context) :
                null) :
            null;

        context["field"] = "createdDate";
        context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
        privateState.createdDate = defaultValues ?
            (defaultValues["createdDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdDate"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "facilityId";
        context["metadata"] = (objectMetadata ? objectMetadata["facilityId"] : null);
        privateState.facilityId = defaultValues ?
            (defaultValues["facilityId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["facilityId"], context) :
                null) :
            null;

        context["field"] = "facilityAvailableLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["facilityAvailableLimit"] : null);
        privateState.facilityAvailableLimit = defaultValues ?
            (defaultValues["facilityAvailableLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["facilityAvailableLimit"], context) :
                null) :
            null;

        context["field"] = "facilityCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["facilityCurrency"] : null);
        privateState.facilityCurrency = defaultValues ?
            (defaultValues["facilityCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["facilityCurrency"], context) :
                null) :
            null;

        context["field"] = "facilityUtilisedLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["facilityUtilisedLimit"] : null);
        privateState.facilityUtilisedLimit = defaultValues ?
            (defaultValues["facilityUtilisedLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["facilityUtilisedLimit"], context) :
                null) :
            null;

        context["field"] = "financingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["financingDate"] : null);
        privateState.financingDate = defaultValues ?
            (defaultValues["financingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["financingDate"], context) :
                null) :
            null;

        context["field"] = "fundingDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["fundingDocuments"] : null);
        privateState.fundingDocuments = defaultValues ?
            (defaultValues["fundingDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fundingDocuments"], context) :
                null) :
            null;

        context["field"] = "fundingRequestAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["fundingRequestAmount"] : null);
        privateState.fundingRequestAmount = defaultValues ?
            (defaultValues["fundingRequestAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fundingRequestAmount"], context) :
                null) :
            null;

        context["field"] = "fundingRequestId";
        context["metadata"] = (objectMetadata ? objectMetadata["fundingRequestId"] : null);
        privateState.fundingRequestId = defaultValues ?
            (defaultValues["fundingRequestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fundingRequestId"], context) :
                null) :
            null;

        context["field"] = "invoiceReferences";
        context["metadata"] = (objectMetadata ? objectMetadata["invoiceReferences"] : null);
        privateState.invoiceReferences = defaultValues ?
            (defaultValues["invoiceReferences"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["invoiceReferences"], context) :
                null) :
            null;

        context["field"] = "programName";
        context["metadata"] = (objectMetadata ? objectMetadata["programName"] : null);
        privateState.programName = defaultValues ?
            (defaultValues["programName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["programName"], context) :
                null) :
            null;

        context["field"] = "productId";
        context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
        privateState.productId = defaultValues ?
            (defaultValues["productId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productId"], context) :
                null) :
            null;

        context["field"] = "productName";
        context["metadata"] = (objectMetadata ? objectMetadata["productName"] : null);
        privateState.productName = defaultValues ?
            (defaultValues["productName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productName"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "supplierId";
        context["metadata"] = (objectMetadata ? objectMetadata["supplierId"] : null);
        privateState.supplierId = defaultValues ?
            (defaultValues["supplierId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supplierId"], context) :
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
            "buyerId": {
                get: function() {
                    context["field"] = "buyerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["buyerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.buyerId, context);
                },
                set: function(val) {
                    setterFunctions['buyerId'].call(this, val, privateState);
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
            "currency": {
                get: function() {
                    context["field"] = "currency";
                    context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currency, context);
                },
                set: function(val) {
                    setterFunctions['currency'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "facilityAvailableLimit": {
                get: function() {
                    context["field"] = "facilityAvailableLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["facilityAvailableLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.facilityAvailableLimit, context);
                },
                set: function(val) {
                    setterFunctions['facilityAvailableLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "facilityCurrency": {
                get: function() {
                    context["field"] = "facilityCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["facilityCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.facilityCurrency, context);
                },
                set: function(val) {
                    setterFunctions['facilityCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "facilityUtilisedLimit": {
                get: function() {
                    context["field"] = "facilityUtilisedLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["facilityUtilisedLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.facilityUtilisedLimit, context);
                },
                set: function(val) {
                    setterFunctions['facilityUtilisedLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "financingDate": {
                get: function() {
                    context["field"] = "financingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["financingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.financingDate, context);
                },
                set: function(val) {
                    setterFunctions['financingDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fundingDocuments": {
                get: function() {
                    context["field"] = "fundingDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["fundingDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fundingDocuments, context);
                },
                set: function(val) {
                    setterFunctions['fundingDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fundingRequestAmount": {
                get: function() {
                    context["field"] = "fundingRequestAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["fundingRequestAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fundingRequestAmount, context);
                },
                set: function(val) {
                    setterFunctions['fundingRequestAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fundingRequestId": {
                get: function() {
                    context["field"] = "fundingRequestId";
                    context["metadata"] = (objectMetadata ? objectMetadata["fundingRequestId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fundingRequestId, context);
                },
                set: function(val) {
                    setterFunctions['fundingRequestId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "invoiceReferences": {
                get: function() {
                    context["field"] = "invoiceReferences";
                    context["metadata"] = (objectMetadata ? objectMetadata["invoiceReferences"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.invoiceReferences, context);
                },
                set: function(val) {
                    setterFunctions['invoiceReferences'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "programName": {
                get: function() {
                    context["field"] = "programName";
                    context["metadata"] = (objectMetadata ? objectMetadata["programName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.programName, context);
                },
                set: function(val) {
                    setterFunctions['programName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "productId": {
                get: function() {
                    context["field"] = "productId";
                    context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.productId, context);
                },
                set: function(val) {
                    setterFunctions['productId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "productName": {
                get: function() {
                    context["field"] = "productName";
                    context["metadata"] = (objectMetadata ? objectMetadata["productName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.productName, context);
                },
                set: function(val) {
                    setterFunctions['productName'].call(this, val, privateState);
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
            "supplierId": {
                get: function() {
                    context["field"] = "supplierId";
                    context["metadata"] = (objectMetadata ? objectMetadata["supplierId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supplierId, context);
                },
                set: function(val) {
                    setterFunctions['supplierId'].call(this, val, privateState);
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
            privateState.buyerId = value ? (value["buyerId"] ? value["buyerId"] : null) : null;
            privateState.createdDate = value ? (value["createdDate"] ? value["createdDate"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.facilityId = value ? (value["facilityId"] ? value["facilityId"] : null) : null;
            privateState.facilityAvailableLimit = value ? (value["facilityAvailableLimit"] ? value["facilityAvailableLimit"] : null) : null;
            privateState.facilityCurrency = value ? (value["facilityCurrency"] ? value["facilityCurrency"] : null) : null;
            privateState.facilityUtilisedLimit = value ? (value["facilityUtilisedLimit"] ? value["facilityUtilisedLimit"] : null) : null;
            privateState.financingDate = value ? (value["financingDate"] ? value["financingDate"] : null) : null;
            privateState.fundingDocuments = value ? (value["fundingDocuments"] ? value["fundingDocuments"] : null) : null;
            privateState.fundingRequestAmount = value ? (value["fundingRequestAmount"] ? value["fundingRequestAmount"] : null) : null;
            privateState.fundingRequestId = value ? (value["fundingRequestId"] ? value["fundingRequestId"] : null) : null;
            privateState.invoiceReferences = value ? (value["invoiceReferences"] ? value["invoiceReferences"] : null) : null;
            privateState.programName = value ? (value["programName"] ? value["programName"] : null) : null;
            privateState.productId = value ? (value["productId"] ? value["productId"] : null) : null;
            privateState.productName = value ? (value["productName"] ? value["productName"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.supplierId = value ? (value["supplierId"] ? value["supplierId"] : null) : null;
            privateState.updatedDate = value ? (value["updatedDate"] ? value["updatedDate"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(AnchorFundingRequest);

    //Create new class level validator object
    BaseModel.Validator.call(AnchorFundingRequest);

    var registerValidatorBackup = AnchorFundingRequest.registerValidator;

    AnchorFundingRequest.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(AnchorFundingRequest.isValid(this, propName, val)) {
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
    //For Operation 'saveFundingRequest' with service id 'SaveAnchorFundingRequestOperation4198'
     AnchorFundingRequest.saveFundingRequest = function(params, onCompletion){
        return AnchorFundingRequest.customVerb('saveFundingRequest', params, onCompletion);
     };

    //For Operation 'getAllFundingRequests' with service id 'GetAllFundingRequestOperation6367'
     AnchorFundingRequest.getAllFundingRequests = function(params, onCompletion){
        return AnchorFundingRequest.customVerb('getAllFundingRequests', params, onCompletion);
     };

    //For Operation 'cancelFundingRequest' with service id 'CancelAnchorFundingRequest1849'
     AnchorFundingRequest.cancelFundingRequest = function(params, onCompletion){
        return AnchorFundingRequest.customVerb('cancelFundingRequest', params, onCompletion);
     };

    //For Operation 'submitFundingRequest' with service id 'SubmitAnchorFundingRequest6709'
     AnchorFundingRequest.submitFundingRequest = function(params, onCompletion){
        return AnchorFundingRequest.customVerb('submitFundingRequest', params, onCompletion);
     };

    var relations = [];

    AnchorFundingRequest.relations = relations;

    AnchorFundingRequest.prototype.isValid = function() {
        return AnchorFundingRequest.isValid(this);
    };

    AnchorFundingRequest.prototype.objModelName = "AnchorFundingRequest";
    AnchorFundingRequest.prototype.objServiceName = "TradeSupplyFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    AnchorFundingRequest.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeSupplyFinance", "AnchorFundingRequest", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    AnchorFundingRequest.clone = function(objectToClone) {
        var clonedObj = new AnchorFundingRequest();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return AnchorFundingRequest;
});