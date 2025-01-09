/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "BankDetails", "objectService" : "PayeeManagement"};

    var setterFunctions = {
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        city: function(val, state) {
            context["field"] = "city";
            context["metadata"] = (objectMetadata ? objectMetadata["city"] : null);
            state['city'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        country: function(val, state) {
            context["field"] = "country";
            context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
            state['country'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        iban: function(val, state) {
            context["field"] = "iban";
            context["metadata"] = (objectMetadata ? objectMetadata["iban"] : null);
            state['iban'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        countryRegion: function(val, state) {
            context["field"] = "countryRegion";
            context["metadata"] = (objectMetadata ? objectMetadata["countryRegion"] : null);
            state['countryRegion'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bic: function(val, state) {
            context["field"] = "bic";
            context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
            state['bic'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sepaMember: function(val, state) {
            context["field"] = "sepaMember";
            context["metadata"] = (objectMetadata ? objectMetadata["sepaMember"] : null);
            state['sepaMember'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        countryCode: function(val, state) {
            context["field"] = "countryCode";
            context["metadata"] = (objectMetadata ? objectMetadata["countryCode"] : null);
            state['countryCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        addressLine1: function(val, state) {
            context["field"] = "addressLine1";
            context["metadata"] = (objectMetadata ? objectMetadata["addressLine1"] : null);
            state['addressLine1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isBICValid: function(val, state) {
            context["field"] = "isBICValid";
            context["metadata"] = (objectMetadata ? objectMetadata["isBICValid"] : null);
            state['isBICValid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        countryName: function(val, state) {
            context["field"] = "countryName";
            context["metadata"] = (objectMetadata ? objectMetadata["countryName"] : null);
            state['countryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isIBANValid: function(val, state) {
            context["field"] = "isIBANValid";
            context["metadata"] = (objectMetadata ? objectMetadata["isIBANValid"] : null);
            state['isIBANValid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        routingNumber: function(val, state) {
            context["field"] = "routingNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
            state['routingNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function BankDetails(defaultValues) {
        var privateState = {};
        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "city";
        context["metadata"] = (objectMetadata ? objectMetadata["city"] : null);
        privateState.city = defaultValues ?
            (defaultValues["city"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["city"], context) :
                null) :
            null;

        context["field"] = "country";
        context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
        privateState.country = defaultValues ?
            (defaultValues["country"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["country"], context) :
                null) :
            null;

        context["field"] = "iban";
        context["metadata"] = (objectMetadata ? objectMetadata["iban"] : null);
        privateState.iban = defaultValues ?
            (defaultValues["iban"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["iban"], context) :
                null) :
            null;

        context["field"] = "countryRegion";
        context["metadata"] = (objectMetadata ? objectMetadata["countryRegion"] : null);
        privateState.countryRegion = defaultValues ?
            (defaultValues["countryRegion"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["countryRegion"], context) :
                null) :
            null;

        context["field"] = "bic";
        context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
        privateState.bic = defaultValues ?
            (defaultValues["bic"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bic"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "sepaMember";
        context["metadata"] = (objectMetadata ? objectMetadata["sepaMember"] : null);
        privateState.sepaMember = defaultValues ?
            (defaultValues["sepaMember"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sepaMember"], context) :
                null) :
            null;

        context["field"] = "countryCode";
        context["metadata"] = (objectMetadata ? objectMetadata["countryCode"] : null);
        privateState.countryCode = defaultValues ?
            (defaultValues["countryCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["countryCode"], context) :
                null) :
            null;

        context["field"] = "addressLine1";
        context["metadata"] = (objectMetadata ? objectMetadata["addressLine1"] : null);
        privateState.addressLine1 = defaultValues ?
            (defaultValues["addressLine1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addressLine1"], context) :
                null) :
            null;

        context["field"] = "isBICValid";
        context["metadata"] = (objectMetadata ? objectMetadata["isBICValid"] : null);
        privateState.isBICValid = defaultValues ?
            (defaultValues["isBICValid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isBICValid"], context) :
                null) :
            null;

        context["field"] = "countryName";
        context["metadata"] = (objectMetadata ? objectMetadata["countryName"] : null);
        privateState.countryName = defaultValues ?
            (defaultValues["countryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["countryName"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "isIBANValid";
        context["metadata"] = (objectMetadata ? objectMetadata["isIBANValid"] : null);
        privateState.isIBANValid = defaultValues ?
            (defaultValues["isIBANValid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isIBANValid"], context) :
                null) :
            null;

        context["field"] = "routingNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
        privateState.routingNumber = defaultValues ?
            (defaultValues["routingNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["routingNumber"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "city": {
                get: function() {
                    context["field"] = "city";
                    context["metadata"] = (objectMetadata ? objectMetadata["city"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.city, context);
                },
                set: function(val) {
                    setterFunctions['city'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "country": {
                get: function() {
                    context["field"] = "country";
                    context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.country, context);
                },
                set: function(val) {
                    setterFunctions['country'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "iban": {
                get: function() {
                    context["field"] = "iban";
                    context["metadata"] = (objectMetadata ? objectMetadata["iban"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.iban, context);
                },
                set: function(val) {
                    setterFunctions['iban'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "countryRegion": {
                get: function() {
                    context["field"] = "countryRegion";
                    context["metadata"] = (objectMetadata ? objectMetadata["countryRegion"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.countryRegion, context);
                },
                set: function(val) {
                    setterFunctions['countryRegion'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bic": {
                get: function() {
                    context["field"] = "bic";
                    context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bic, context);
                },
                set: function(val) {
                    setterFunctions['bic'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "sepaMember": {
                get: function() {
                    context["field"] = "sepaMember";
                    context["metadata"] = (objectMetadata ? objectMetadata["sepaMember"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sepaMember, context);
                },
                set: function(val) {
                    setterFunctions['sepaMember'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "countryCode": {
                get: function() {
                    context["field"] = "countryCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["countryCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.countryCode, context);
                },
                set: function(val) {
                    setterFunctions['countryCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "addressLine1": {
                get: function() {
                    context["field"] = "addressLine1";
                    context["metadata"] = (objectMetadata ? objectMetadata["addressLine1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addressLine1, context);
                },
                set: function(val) {
                    setterFunctions['addressLine1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isBICValid": {
                get: function() {
                    context["field"] = "isBICValid";
                    context["metadata"] = (objectMetadata ? objectMetadata["isBICValid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isBICValid, context);
                },
                set: function(val) {
                    setterFunctions['isBICValid'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "countryName": {
                get: function() {
                    context["field"] = "countryName";
                    context["metadata"] = (objectMetadata ? objectMetadata["countryName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.countryName, context);
                },
                set: function(val) {
                    setterFunctions['countryName'].call(this, val, privateState);
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
            "isIBANValid": {
                get: function() {
                    context["field"] = "isIBANValid";
                    context["metadata"] = (objectMetadata ? objectMetadata["isIBANValid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isIBANValid, context);
                },
                set: function(val) {
                    setterFunctions['isIBANValid'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "routingNumber": {
                get: function() {
                    context["field"] = "routingNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.routingNumber, context);
                },
                set: function(val) {
                    setterFunctions['routingNumber'].call(this, val, privateState);
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
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.city = value ? (value["city"] ? value["city"] : null) : null;
            privateState.country = value ? (value["country"] ? value["country"] : null) : null;
            privateState.iban = value ? (value["iban"] ? value["iban"] : null) : null;
            privateState.countryRegion = value ? (value["countryRegion"] ? value["countryRegion"] : null) : null;
            privateState.bic = value ? (value["bic"] ? value["bic"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.sepaMember = value ? (value["sepaMember"] ? value["sepaMember"] : null) : null;
            privateState.countryCode = value ? (value["countryCode"] ? value["countryCode"] : null) : null;
            privateState.addressLine1 = value ? (value["addressLine1"] ? value["addressLine1"] : null) : null;
            privateState.isBICValid = value ? (value["isBICValid"] ? value["isBICValid"] : null) : null;
            privateState.countryName = value ? (value["countryName"] ? value["countryName"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.isIBANValid = value ? (value["isIBANValid"] ? value["isIBANValid"] : null) : null;
            privateState.routingNumber = value ? (value["routingNumber"] ? value["routingNumber"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(BankDetails);

    //Create new class level validator object
    BaseModel.Validator.call(BankDetails);

    var registerValidatorBackup = BankDetails.registerValidator;

    BankDetails.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(BankDetails.isValid(this, propName, val)) {
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
    //For Operation 'isValidIBAN' with service id 'validateIBAN4429'
     BankDetails.isValidIBAN = function(params, onCompletion){
        return BankDetails.customVerb('isValidIBAN', params, onCompletion);
     };

    //For Operation 'getBankDetailsFromBicCode' with service id 'validateBICandFetchBankName5665'
     BankDetails.getBankDetailsFromBicCode = function(params, onCompletion){
        return BankDetails.customVerb('getBankDetailsFromBicCode', params, onCompletion);
     };

    //For Operation 'GetBankNameByRoutingNumber' with service id 'GetBankNameByRoutingNumber7005'
     BankDetails.GetBankNameByRoutingNumber = function(params, onCompletion){
        return BankDetails.customVerb('GetBankNameByRoutingNumber', params, onCompletion);
     };

    //For Operation 'getSwiftCode' with service id 'getIBANdetails8043'
     BankDetails.getSwiftCode = function(params, onCompletion){
        return BankDetails.customVerb('getSwiftCode', params, onCompletion);
     };

    //For Operation 'getBICFromBankDetails' with service id 'getBICFromBankDetails1219'
     BankDetails.getBICFromBankDetails = function(params, onCompletion){
        return BankDetails.customVerb('getBICFromBankDetails', params, onCompletion);
     };

    var relations = [];

    BankDetails.relations = relations;

    BankDetails.prototype.isValid = function() {
        return BankDetails.isValid(this);
    };

    BankDetails.prototype.objModelName = "BankDetails";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    BankDetails.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PayeeManagement", "BankDetails", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    BankDetails.clone = function(objectToClone) {
        var clonedObj = new BankDetails();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return BankDetails;
});