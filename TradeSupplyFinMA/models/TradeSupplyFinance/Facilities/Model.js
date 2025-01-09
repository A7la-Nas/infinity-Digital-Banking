/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Facilities", "objectService" : "TradeSupplyFinance"};

    var setterFunctions = {
        body: function(val, state) {
            context["field"] = "body";
            context["metadata"] = (objectMetadata ? objectMetadata["body"] : null);
            state['body'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Facilities: function(val, state) {
            context["field"] = "Facilities";
            context["metadata"] = (objectMetadata ? objectMetadata["Facilities"] : null);
            state['Facilities'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementStatus: function(val, state) {
            context["field"] = "arrangementStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementStatus"] : null);
            state['arrangementStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementStartDate: function(val, state) {
            context["field"] = "arrangementStartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementStartDate"] : null);
            state['arrangementStartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        product: function(val, state) {
            context["field"] = "product";
            context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
            state['product'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableCommitment: function(val, state) {
            context["field"] = "availableCommitment";
            context["metadata"] = (objectMetadata ? objectMetadata["availableCommitment"] : null);
            state['availableCommitment'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentCommitment: function(val, state) {
            context["field"] = "currentCommitment";
            context["metadata"] = (objectMetadata ? objectMetadata["currentCommitment"] : null);
            state['currentCommitment'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unAvailableCommitment: function(val, state) {
            context["field"] = "unAvailableCommitment";
            context["metadata"] = (objectMetadata ? objectMetadata["unAvailableCommitment"] : null);
            state['unAvailableCommitment'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        shortTitle: function(val, state) {
            context["field"] = "shortTitle";
            context["metadata"] = (objectMetadata ? objectMetadata["shortTitle"] : null);
            state['shortTitle'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementCustomerName: function(val, state) {
            context["field"] = "arrangementCustomerName";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementCustomerName"] : null);
            state['arrangementCustomerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        allowedProduct: function(val, state) {
            context["field"] = "allowedProduct";
            context["metadata"] = (objectMetadata ? objectMetadata["allowedProduct"] : null);
            state['allowedProduct'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangement: function(val, state) {
            context["field"] = "arrangement";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangement"] : null);
            state['arrangement'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        overdrawnCommitment: function(val, state) {
            context["field"] = "overdrawnCommitment";
            context["metadata"] = (objectMetadata ? objectMetadata["overdrawnCommitment"] : null);
            state['overdrawnCommitment'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        utilisedCommitment: function(val, state) {
            context["field"] = "utilisedCommitment";
            context["metadata"] = (objectMetadata ? objectMetadata["utilisedCommitment"] : null);
            state['utilisedCommitment'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        account: function(val, state) {
            context["field"] = "account";
            context["metadata"] = (objectMetadata ? objectMetadata["account"] : null);
            state['account'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        allowedCurrency: function(val, state) {
            context["field"] = "allowedCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["allowedCurrency"] : null);
            state['allowedCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        allowedCustomer: function(val, state) {
            context["field"] = "allowedCustomer";
            context["metadata"] = (objectMetadata ? objectMetadata["allowedCustomer"] : null);
            state['allowedCustomer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        facilityShortTitle: function(val, state) {
            context["field"] = "facilityShortTitle";
            context["metadata"] = (objectMetadata ? objectMetadata["facilityShortTitle"] : null);
            state['facilityShortTitle'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        masterArrangementId: function(val, state) {
            context["field"] = "masterArrangementId";
            context["metadata"] = (objectMetadata ? objectMetadata["masterArrangementId"] : null);
            state['masterArrangementId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Facilities(defaultValues) {
        var privateState = {};
        context["field"] = "body";
        context["metadata"] = (objectMetadata ? objectMetadata["body"] : null);
        privateState.body = defaultValues ?
            (defaultValues["body"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["body"], context) :
                null) :
            null;

        context["field"] = "Facilities";
        context["metadata"] = (objectMetadata ? objectMetadata["Facilities"] : null);
        privateState.Facilities = defaultValues ?
            (defaultValues["Facilities"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Facilities"], context) :
                null) :
            null;

        context["field"] = "arrangementStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementStatus"] : null);
        privateState.arrangementStatus = defaultValues ?
            (defaultValues["arrangementStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementStatus"], context) :
                null) :
            null;

        context["field"] = "arrangementStartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementStartDate"] : null);
        privateState.arrangementStartDate = defaultValues ?
            (defaultValues["arrangementStartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementStartDate"], context) :
                null) :
            null;

        context["field"] = "product";
        context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
        privateState.product = defaultValues ?
            (defaultValues["product"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["product"], context) :
                null) :
            null;

        context["field"] = "availableCommitment";
        context["metadata"] = (objectMetadata ? objectMetadata["availableCommitment"] : null);
        privateState.availableCommitment = defaultValues ?
            (defaultValues["availableCommitment"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableCommitment"], context) :
                null) :
            null;

        context["field"] = "currentCommitment";
        context["metadata"] = (objectMetadata ? objectMetadata["currentCommitment"] : null);
        privateState.currentCommitment = defaultValues ?
            (defaultValues["currentCommitment"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentCommitment"], context) :
                null) :
            null;

        context["field"] = "unAvailableCommitment";
        context["metadata"] = (objectMetadata ? objectMetadata["unAvailableCommitment"] : null);
        privateState.unAvailableCommitment = defaultValues ?
            (defaultValues["unAvailableCommitment"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unAvailableCommitment"], context) :
                null) :
            null;

        context["field"] = "shortTitle";
        context["metadata"] = (objectMetadata ? objectMetadata["shortTitle"] : null);
        privateState.shortTitle = defaultValues ?
            (defaultValues["shortTitle"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["shortTitle"], context) :
                null) :
            null;

        context["field"] = "arrangementCustomerName";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementCustomerName"] : null);
        privateState.arrangementCustomerName = defaultValues ?
            (defaultValues["arrangementCustomerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementCustomerName"], context) :
                null) :
            null;

        context["field"] = "allowedProduct";
        context["metadata"] = (objectMetadata ? objectMetadata["allowedProduct"] : null);
        privateState.allowedProduct = defaultValues ?
            (defaultValues["allowedProduct"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["allowedProduct"], context) :
                null) :
            null;

        context["field"] = "arrangement";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangement"] : null);
        privateState.arrangement = defaultValues ?
            (defaultValues["arrangement"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangement"], context) :
                null) :
            null;

        context["field"] = "overdrawnCommitment";
        context["metadata"] = (objectMetadata ? objectMetadata["overdrawnCommitment"] : null);
        privateState.overdrawnCommitment = defaultValues ?
            (defaultValues["overdrawnCommitment"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["overdrawnCommitment"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "utilisedCommitment";
        context["metadata"] = (objectMetadata ? objectMetadata["utilisedCommitment"] : null);
        privateState.utilisedCommitment = defaultValues ?
            (defaultValues["utilisedCommitment"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["utilisedCommitment"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "account";
        context["metadata"] = (objectMetadata ? objectMetadata["account"] : null);
        privateState.account = defaultValues ?
            (defaultValues["account"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["account"], context) :
                null) :
            null;

        context["field"] = "allowedCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["allowedCurrency"] : null);
        privateState.allowedCurrency = defaultValues ?
            (defaultValues["allowedCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["allowedCurrency"], context) :
                null) :
            null;

        context["field"] = "allowedCustomer";
        context["metadata"] = (objectMetadata ? objectMetadata["allowedCustomer"] : null);
        privateState.allowedCustomer = defaultValues ?
            (defaultValues["allowedCustomer"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["allowedCustomer"], context) :
                null) :
            null;

        context["field"] = "facilityShortTitle";
        context["metadata"] = (objectMetadata ? objectMetadata["facilityShortTitle"] : null);
        privateState.facilityShortTitle = defaultValues ?
            (defaultValues["facilityShortTitle"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["facilityShortTitle"], context) :
                null) :
            null;

        context["field"] = "masterArrangementId";
        context["metadata"] = (objectMetadata ? objectMetadata["masterArrangementId"] : null);
        privateState.masterArrangementId = defaultValues ?
            (defaultValues["masterArrangementId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["masterArrangementId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "body": {
                get: function() {
                    context["field"] = "body";
                    context["metadata"] = (objectMetadata ? objectMetadata["body"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.body, context);
                },
                set: function(val) {
                    setterFunctions['body'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Facilities": {
                get: function() {
                    context["field"] = "Facilities";
                    context["metadata"] = (objectMetadata ? objectMetadata["Facilities"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Facilities, context);
                },
                set: function(val) {
                    setterFunctions['Facilities'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangementStatus": {
                get: function() {
                    context["field"] = "arrangementStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementStatus, context);
                },
                set: function(val) {
                    setterFunctions['arrangementStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangementStartDate": {
                get: function() {
                    context["field"] = "arrangementStartDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementStartDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementStartDate, context);
                },
                set: function(val) {
                    setterFunctions['arrangementStartDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "product": {
                get: function() {
                    context["field"] = "product";
                    context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.product, context);
                },
                set: function(val) {
                    setterFunctions['product'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableCommitment": {
                get: function() {
                    context["field"] = "availableCommitment";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableCommitment"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableCommitment, context);
                },
                set: function(val) {
                    setterFunctions['availableCommitment'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentCommitment": {
                get: function() {
                    context["field"] = "currentCommitment";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentCommitment"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentCommitment, context);
                },
                set: function(val) {
                    setterFunctions['currentCommitment'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "unAvailableCommitment": {
                get: function() {
                    context["field"] = "unAvailableCommitment";
                    context["metadata"] = (objectMetadata ? objectMetadata["unAvailableCommitment"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unAvailableCommitment, context);
                },
                set: function(val) {
                    setterFunctions['unAvailableCommitment'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "shortTitle": {
                get: function() {
                    context["field"] = "shortTitle";
                    context["metadata"] = (objectMetadata ? objectMetadata["shortTitle"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.shortTitle, context);
                },
                set: function(val) {
                    setterFunctions['shortTitle'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangementCustomerName": {
                get: function() {
                    context["field"] = "arrangementCustomerName";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementCustomerName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementCustomerName, context);
                },
                set: function(val) {
                    setterFunctions['arrangementCustomerName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "allowedProduct": {
                get: function() {
                    context["field"] = "allowedProduct";
                    context["metadata"] = (objectMetadata ? objectMetadata["allowedProduct"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.allowedProduct, context);
                },
                set: function(val) {
                    setterFunctions['allowedProduct'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangement": {
                get: function() {
                    context["field"] = "arrangement";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangement"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangement, context);
                },
                set: function(val) {
                    setterFunctions['arrangement'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "overdrawnCommitment": {
                get: function() {
                    context["field"] = "overdrawnCommitment";
                    context["metadata"] = (objectMetadata ? objectMetadata["overdrawnCommitment"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.overdrawnCommitment, context);
                },
                set: function(val) {
                    setterFunctions['overdrawnCommitment'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerId": {
                get: function() {
                    context["field"] = "customerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerId, context);
                },
                set: function(val) {
                    setterFunctions['customerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "utilisedCommitment": {
                get: function() {
                    context["field"] = "utilisedCommitment";
                    context["metadata"] = (objectMetadata ? objectMetadata["utilisedCommitment"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.utilisedCommitment, context);
                },
                set: function(val) {
                    setterFunctions['utilisedCommitment'].call(this, val, privateState);
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
            "account": {
                get: function() {
                    context["field"] = "account";
                    context["metadata"] = (objectMetadata ? objectMetadata["account"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.account, context);
                },
                set: function(val) {
                    setterFunctions['account'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "allowedCurrency": {
                get: function() {
                    context["field"] = "allowedCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["allowedCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.allowedCurrency, context);
                },
                set: function(val) {
                    setterFunctions['allowedCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "allowedCustomer": {
                get: function() {
                    context["field"] = "allowedCustomer";
                    context["metadata"] = (objectMetadata ? objectMetadata["allowedCustomer"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.allowedCustomer, context);
                },
                set: function(val) {
                    setterFunctions['allowedCustomer'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "facilityShortTitle": {
                get: function() {
                    context["field"] = "facilityShortTitle";
                    context["metadata"] = (objectMetadata ? objectMetadata["facilityShortTitle"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.facilityShortTitle, context);
                },
                set: function(val) {
                    setterFunctions['facilityShortTitle'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "masterArrangementId": {
                get: function() {
                    context["field"] = "masterArrangementId";
                    context["metadata"] = (objectMetadata ? objectMetadata["masterArrangementId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.masterArrangementId, context);
                },
                set: function(val) {
                    setterFunctions['masterArrangementId'].call(this, val, privateState);
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
            privateState.body = value ? (value["body"] ? value["body"] : null) : null;
            privateState.Facilities = value ? (value["Facilities"] ? value["Facilities"] : null) : null;
            privateState.arrangementStatus = value ? (value["arrangementStatus"] ? value["arrangementStatus"] : null) : null;
            privateState.arrangementStartDate = value ? (value["arrangementStartDate"] ? value["arrangementStartDate"] : null) : null;
            privateState.product = value ? (value["product"] ? value["product"] : null) : null;
            privateState.availableCommitment = value ? (value["availableCommitment"] ? value["availableCommitment"] : null) : null;
            privateState.currentCommitment = value ? (value["currentCommitment"] ? value["currentCommitment"] : null) : null;
            privateState.unAvailableCommitment = value ? (value["unAvailableCommitment"] ? value["unAvailableCommitment"] : null) : null;
            privateState.shortTitle = value ? (value["shortTitle"] ? value["shortTitle"] : null) : null;
            privateState.arrangementCustomerName = value ? (value["arrangementCustomerName"] ? value["arrangementCustomerName"] : null) : null;
            privateState.allowedProduct = value ? (value["allowedProduct"] ? value["allowedProduct"] : null) : null;
            privateState.arrangement = value ? (value["arrangement"] ? value["arrangement"] : null) : null;
            privateState.overdrawnCommitment = value ? (value["overdrawnCommitment"] ? value["overdrawnCommitment"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.utilisedCommitment = value ? (value["utilisedCommitment"] ? value["utilisedCommitment"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.account = value ? (value["account"] ? value["account"] : null) : null;
            privateState.allowedCurrency = value ? (value["allowedCurrency"] ? value["allowedCurrency"] : null) : null;
            privateState.allowedCustomer = value ? (value["allowedCustomer"] ? value["allowedCustomer"] : null) : null;
            privateState.facilityShortTitle = value ? (value["facilityShortTitle"] ? value["facilityShortTitle"] : null) : null;
            privateState.masterArrangementId = value ? (value["masterArrangementId"] ? value["masterArrangementId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Facilities);

    //Create new class level validator object
    BaseModel.Validator.call(Facilities);

    var registerValidatorBackup = Facilities.registerValidator;

    Facilities.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Facilities.isValid(this, propName, val)) {
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
    //For Operation 'getListOfFacilities' with service id 'GetFacilities9403'
     Facilities.getListOfFacilities = function(params, onCompletion){
        return Facilities.customVerb('getListOfFacilities', params, onCompletion);
     };

    var relations = [];

    Facilities.relations = relations;

    Facilities.prototype.isValid = function() {
        return Facilities.isValid(this);
    };

    Facilities.prototype.objModelName = "Facilities";
    Facilities.prototype.objServiceName = "TradeSupplyFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Facilities.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeSupplyFinance", "Facilities", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Facilities.clone = function(objectToClone) {
        var clonedObj = new Facilities();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Facilities;
});