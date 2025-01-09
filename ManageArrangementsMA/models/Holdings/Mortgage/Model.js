/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Mortgage", "objectService" : "Holdings"};

    var setterFunctions = {
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementId: function(val, state) {
            context["field"] = "arrangementId";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
            state['arrangementId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        commitmentAmount: function(val, state) {
            context["field"] = "commitmentAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["commitmentAmount"] : null);
            state['commitmentAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        utilisedAmount: function(val, state) {
            context["field"] = "utilisedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["utilisedAmount"] : null);
            state['utilisedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalPaidAmount: function(val, state) {
            context["field"] = "totalPaidAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalPaidAmount"] : null);
            state['totalPaidAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        startDate: function(val, state) {
            context["field"] = "startDate";
            context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
            state['startDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        effectiveDate: function(val, state) {
            context["field"] = "effectiveDate";
            context["metadata"] = (objectMetadata ? objectMetadata["effectiveDate"] : null);
            state['effectiveDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maturityDate: function(val, state) {
            context["field"] = "maturityDate";
            context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
            state['maturityDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        commitmentTerm: function(val, state) {
            context["field"] = "commitmentTerm";
            context["metadata"] = (objectMetadata ? objectMetadata["commitmentTerm"] : null);
            state['commitmentTerm'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalOutstandingBalance: function(val, state) {
            context["field"] = "totalOutstandingBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["totalOutstandingBalance"] : null);
            state['totalOutstandingBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        iBAN: function(val, state) {
            context["field"] = "iBAN";
            context["metadata"] = (objectMetadata ? objectMetadata["iBAN"] : null);
            state['iBAN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        propertyType: function(val, state) {
            context["field"] = "propertyType";
            context["metadata"] = (objectMetadata ? objectMetadata["propertyType"] : null);
            state['propertyType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        propertyAddress: function(val, state) {
            context["field"] = "propertyAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["propertyAddress"] : null);
            state['propertyAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementstatus: function(val, state) {
            context["field"] = "arrangementstatus";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementstatus"] : null);
            state['arrangementstatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        product: function(val, state) {
            context["field"] = "product";
            context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
            state['product'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ownership: function(val, state) {
            context["field"] = "ownership";
            context["metadata"] = (objectMetadata ? objectMetadata["ownership"] : null);
            state['ownership'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        homeOwnership: function(val, state) {
            context["field"] = "homeOwnership";
            context["metadata"] = (objectMetadata ? objectMetadata["homeOwnership"] : null);
            state['homeOwnership'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    };

    //Create the Model Class
    function Mortgage(defaultValues) {
        var privateState = {};
        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "arrangementId";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
        privateState.arrangementId = defaultValues ?
            (defaultValues["arrangementId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementId"], context) :
                null) :
            null;

        context["field"] = "commitmentAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["commitmentAmount"] : null);
        privateState.commitmentAmount = defaultValues ?
            (defaultValues["commitmentAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["commitmentAmount"], context) :
                null) :
            null;

        context["field"] = "utilisedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["utilisedAmount"] : null);
        privateState.utilisedAmount = defaultValues ?
            (defaultValues["utilisedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["utilisedAmount"], context) :
                null) :
            null;

        context["field"] = "totalPaidAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalPaidAmount"] : null);
        privateState.totalPaidAmount = defaultValues ?
            (defaultValues["totalPaidAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalPaidAmount"], context) :
                null) :
            null;

        context["field"] = "startDate";
        context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
        privateState.startDate = defaultValues ?
            (defaultValues["startDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["startDate"], context) :
                null) :
            null;

        context["field"] = "effectiveDate";
        context["metadata"] = (objectMetadata ? objectMetadata["effectiveDate"] : null);
        privateState.effectiveDate = defaultValues ?
            (defaultValues["effectiveDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["effectiveDate"], context) :
                null) :
            null;

        context["field"] = "maturityDate";
        context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
        privateState.maturityDate = defaultValues ?
            (defaultValues["maturityDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maturityDate"], context) :
                null) :
            null;

        context["field"] = "commitmentTerm";
        context["metadata"] = (objectMetadata ? objectMetadata["commitmentTerm"] : null);
        privateState.commitmentTerm = defaultValues ?
            (defaultValues["commitmentTerm"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["commitmentTerm"], context) :
                null) :
            null;

        context["field"] = "totalOutstandingBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["totalOutstandingBalance"] : null);
        privateState.totalOutstandingBalance = defaultValues ?
            (defaultValues["totalOutstandingBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalOutstandingBalance"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "iBAN";
        context["metadata"] = (objectMetadata ? objectMetadata["iBAN"] : null);
        privateState.iBAN = defaultValues ?
            (defaultValues["iBAN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["iBAN"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "propertyType";
        context["metadata"] = (objectMetadata ? objectMetadata["propertyType"] : null);
        privateState.propertyType = defaultValues ?
            (defaultValues["propertyType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["propertyType"], context) :
                null) :
            null;

        context["field"] = "propertyAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["propertyAddress"] : null);
        privateState.propertyAddress = defaultValues ?
            (defaultValues["propertyAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["propertyAddress"], context) :
                null) :
            null;

        context["field"] = "arrangementstatus";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementstatus"] : null);
        privateState.arrangementstatus = defaultValues ?
            (defaultValues["arrangementstatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementstatus"], context) :
                null) :
            null;

        context["field"] = "product";
        context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
        privateState.product = defaultValues ?
            (defaultValues["product"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["product"], context) :
                null) :
            null;

        context["field"] = "ownership";
        context["metadata"] = (objectMetadata ? objectMetadata["ownership"] : null);
        privateState.ownership = defaultValues ?
            (defaultValues["ownership"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ownership"], context) :
                null) :
            null;

        context["field"] = "homeOwnership";
        context["metadata"] = (objectMetadata ? objectMetadata["homeOwnership"] : null);
        privateState.homeOwnership = defaultValues ?
            (defaultValues["homeOwnership"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["homeOwnership"], context) :
                null) :
            null;

        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
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


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "arrangementId": {
                get: function() {
                    context["field"] = "arrangementId";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementId, context);
                },
                set: function(val) {
                    setterFunctions['arrangementId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "commitmentAmount": {
                get: function() {
                    context["field"] = "commitmentAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["commitmentAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.commitmentAmount, context);
                },
                set: function(val) {
                    setterFunctions['commitmentAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "utilisedAmount": {
                get: function() {
                    context["field"] = "utilisedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["utilisedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.utilisedAmount, context);
                },
                set: function(val) {
                    setterFunctions['utilisedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalPaidAmount": {
                get: function() {
                    context["field"] = "totalPaidAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalPaidAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalPaidAmount, context);
                },
                set: function(val) {
                    setterFunctions['totalPaidAmount'].call(this, val, privateState);
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
            "effectiveDate": {
                get: function() {
                    context["field"] = "effectiveDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["effectiveDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.effectiveDate, context);
                },
                set: function(val) {
                    setterFunctions['effectiveDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maturityDate": {
                get: function() {
                    context["field"] = "maturityDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maturityDate, context);
                },
                set: function(val) {
                    setterFunctions['maturityDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "commitmentTerm": {
                get: function() {
                    context["field"] = "commitmentTerm";
                    context["metadata"] = (objectMetadata ? objectMetadata["commitmentTerm"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.commitmentTerm, context);
                },
                set: function(val) {
                    setterFunctions['commitmentTerm'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalOutstandingBalance": {
                get: function() {
                    context["field"] = "totalOutstandingBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalOutstandingBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalOutstandingBalance, context);
                },
                set: function(val) {
                    setterFunctions['totalOutstandingBalance'].call(this, val, privateState);
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
            "iBAN": {
                get: function() {
                    context["field"] = "iBAN";
                    context["metadata"] = (objectMetadata ? objectMetadata["iBAN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.iBAN, context);
                },
                set: function(val) {
                    setterFunctions['iBAN'].call(this, val, privateState);
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
            "propertyType": {
                get: function() {
                    context["field"] = "propertyType";
                    context["metadata"] = (objectMetadata ? objectMetadata["propertyType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.propertyType, context);
                },
                set: function(val) {
                    setterFunctions['propertyType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "propertyAddress": {
                get: function() {
                    context["field"] = "propertyAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["propertyAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.propertyAddress, context);
                },
                set: function(val) {
                    setterFunctions['propertyAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangementstatus": {
                get: function() {
                    context["field"] = "arrangementstatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementstatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementstatus, context);
                },
                set: function(val) {
                    setterFunctions['arrangementstatus'].call(this, val, privateState);
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
            "ownership": {
                get: function() {
                    context["field"] = "ownership";
                    context["metadata"] = (objectMetadata ? objectMetadata["ownership"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ownership, context);
                },
                set: function(val) {
                    setterFunctions['ownership'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "homeOwnership": {
                get: function() {
                    context["field"] = "homeOwnership";
                    context["metadata"] = (objectMetadata ? objectMetadata["homeOwnership"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.homeOwnership, context);
                },
                set: function(val) {
                    setterFunctions['homeOwnership'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.arrangementId = value ? (value["arrangementId"] ? value["arrangementId"] : null) : null;
            privateState.commitmentAmount = value ? (value["commitmentAmount"] ? value["commitmentAmount"] : null) : null;
            privateState.utilisedAmount = value ? (value["utilisedAmount"] ? value["utilisedAmount"] : null) : null;
            privateState.totalPaidAmount = value ? (value["totalPaidAmount"] ? value["totalPaidAmount"] : null) : null;
            privateState.startDate = value ? (value["startDate"] ? value["startDate"] : null) : null;
            privateState.effectiveDate = value ? (value["effectiveDate"] ? value["effectiveDate"] : null) : null;
            privateState.maturityDate = value ? (value["maturityDate"] ? value["maturityDate"] : null) : null;
            privateState.commitmentTerm = value ? (value["commitmentTerm"] ? value["commitmentTerm"] : null) : null;
            privateState.totalOutstandingBalance = value ? (value["totalOutstandingBalance"] ? value["totalOutstandingBalance"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.iBAN = value ? (value["iBAN"] ? value["iBAN"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.propertyType = value ? (value["propertyType"] ? value["propertyType"] : null) : null;
            privateState.propertyAddress = value ? (value["propertyAddress"] ? value["propertyAddress"] : null) : null;
            privateState.arrangementstatus = value ? (value["arrangementstatus"] ? value["arrangementstatus"] : null) : null;
            privateState.product = value ? (value["product"] ? value["product"] : null) : null;
            privateState.ownership = value ? (value["ownership"] ? value["ownership"] : null) : null;
            privateState.homeOwnership = value ? (value["homeOwnership"] ? value["homeOwnership"] : null) : null;
            privateState.accountID = value ? (value["accountID"] ? value["accountID"] : null) : null;
            privateState.accountType = value ? (value["accountType"] ? value["accountType"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Mortgage);

    //Create new class level validator object
    BaseModel.Validator.call(Mortgage);

    var registerValidatorBackup = Mortgage.registerValidator;

    Mortgage.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Mortgage.isValid(this, propName, val)) {
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
    //For Operation 'getMortgageDrawings' with service id 'getMortgageDrawings5215'
     Mortgage.getMortgageDrawings = function(params, onCompletion){
        return Mortgage.customVerb('getMortgageDrawings', params, onCompletion);
     };

    //For Operation 'getMortgageFacilityDetails' with service id 'getMortgageFacilites9848'
     Mortgage.getMortgageFacilityDetails = function(params, onCompletion){
        return Mortgage.customVerb('getMortgageFacilityDetails', params, onCompletion);
     };

    var relations = [];

    Mortgage.relations = relations;

    Mortgage.prototype.isValid = function() {
        return Mortgage.isValid(this);
    };

    Mortgage.prototype.objModelName = "Mortgage";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Mortgage.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Holdings", "Mortgage", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Mortgage.clone = function(objectToClone) {
        var clonedObj = new Mortgage();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Mortgage;
});