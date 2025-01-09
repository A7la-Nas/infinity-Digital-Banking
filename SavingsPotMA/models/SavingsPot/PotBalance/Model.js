/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PotBalance", "objectService" : "SavingsPot"};

    var setterFunctions = {
        savingsPotId: function(val, state) {
            context["field"] = "savingsPotId";
            context["metadata"] = (objectMetadata ? objectMetadata["savingsPotId"] : null);
            state['savingsPotId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyId: function(val, state) {
            context["field"] = "partyId";
            context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
            state['partyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        portfolioId: function(val, state) {
            context["field"] = "portfolioId";
            context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
            state['portfolioId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productId: function(val, state) {
            context["field"] = "productId";
            context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
            state['productId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fundingAccountId: function(val, state) {
            context["field"] = "fundingAccountId";
            context["metadata"] = (objectMetadata ? objectMetadata["fundingAccountId"] : null);
            state['fundingAccountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fundingAccountHoldingId: function(val, state) {
            context["field"] = "fundingAccountHoldingId";
            context["metadata"] = (objectMetadata ? objectMetadata["fundingAccountHoldingId"] : null);
            state['fundingAccountHoldingId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        potAccountId: function(val, state) {
            context["field"] = "potAccountId";
            context["metadata"] = (objectMetadata ? objectMetadata["potAccountId"] : null);
            state['potAccountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        potType: function(val, state) {
            context["field"] = "potType";
            context["metadata"] = (objectMetadata ? objectMetadata["potType"] : null);
            state['potType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        potName: function(val, state) {
            context["field"] = "potName";
            context["metadata"] = (objectMetadata ? objectMetadata["potName"] : null);
            state['potName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        savingsType: function(val, state) {
            context["field"] = "savingsType";
            context["metadata"] = (objectMetadata ? objectMetadata["savingsType"] : null);
            state['savingsType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        targetAmount: function(val, state) {
            context["field"] = "targetAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["targetAmount"] : null);
            state['targetAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        periodicContribution: function(val, state) {
            context["field"] = "periodicContribution";
            context["metadata"] = (objectMetadata ? objectMetadata["periodicContribution"] : null);
            state['periodicContribution'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        targetPeriod: function(val, state) {
            context["field"] = "targetPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["targetPeriod"] : null);
            state['targetPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        frequency: function(val, state) {
            context["field"] = "frequency";
            context["metadata"] = (objectMetadata ? objectMetadata["frequency"] : null);
            state['frequency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creationDate: function(val, state) {
            context["field"] = "creationDate";
            context["metadata"] = (objectMetadata ? objectMetadata["creationDate"] : null);
            state['creationDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        startDate: function(val, state) {
            context["field"] = "startDate";
            context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
            state['startDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        endDate: function(val, state) {
            context["field"] = "endDate";
            context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
            state['endDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableBalance: function(val, state) {
            context["field"] = "availableBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
            state['availableBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amountWithdrawn: function(val, state) {
            context["field"] = "amountWithdrawn";
            context["metadata"] = (objectMetadata ? objectMetadata["amountWithdrawn"] : null);
            state['amountWithdrawn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastModifiedDate: function(val, state) {
            context["field"] = "lastModifiedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lastModifiedDate"] : null);
            state['lastModifiedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        frequencyDay: function(val, state) {
            context["field"] = "frequencyDay";
            context["metadata"] = (objectMetadata ? objectMetadata["frequencyDay"] : null);
            state['frequencyDay'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        potCurrentStatus: function(val, state) {
            context["field"] = "potCurrentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["potCurrentStatus"] : null);
            state['potCurrentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        potAmountPercentage: function(val, state) {
            context["field"] = "potAmountPercentage";
            context["metadata"] = (objectMetadata ? objectMetadata["potAmountPercentage"] : null);
            state['potAmountPercentage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        monthsLeftForCompletion: function(val, state) {
            context["field"] = "monthsLeftForCompletion";
            context["metadata"] = (objectMetadata ? objectMetadata["monthsLeftForCompletion"] : null);
            state['monthsLeftForCompletion'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        remainingSavings: function(val, state) {
            context["field"] = "remainingSavings";
            context["metadata"] = (objectMetadata ? objectMetadata["remainingSavings"] : null);
            state['remainingSavings'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errMessage: function(val, state) {
            context["field"] = "errMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errMessage"] : null);
            state['errMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PotBalance(defaultValues) {
        var privateState = {};
        context["field"] = "savingsPotId";
        context["metadata"] = (objectMetadata ? objectMetadata["savingsPotId"] : null);
        privateState.savingsPotId = defaultValues ?
            (defaultValues["savingsPotId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["savingsPotId"], context) :
                null) :
            null;

        context["field"] = "partyId";
        context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
        privateState.partyId = defaultValues ?
            (defaultValues["partyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyId"], context) :
                null) :
            null;

        context["field"] = "portfolioId";
        context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
        privateState.portfolioId = defaultValues ?
            (defaultValues["portfolioId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portfolioId"], context) :
                null) :
            null;

        context["field"] = "productId";
        context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
        privateState.productId = defaultValues ?
            (defaultValues["productId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productId"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "fundingAccountId";
        context["metadata"] = (objectMetadata ? objectMetadata["fundingAccountId"] : null);
        privateState.fundingAccountId = defaultValues ?
            (defaultValues["fundingAccountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fundingAccountId"], context) :
                null) :
            null;

        context["field"] = "fundingAccountHoldingId";
        context["metadata"] = (objectMetadata ? objectMetadata["fundingAccountHoldingId"] : null);
        privateState.fundingAccountHoldingId = defaultValues ?
            (defaultValues["fundingAccountHoldingId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fundingAccountHoldingId"], context) :
                null) :
            null;

        context["field"] = "potAccountId";
        context["metadata"] = (objectMetadata ? objectMetadata["potAccountId"] : null);
        privateState.potAccountId = defaultValues ?
            (defaultValues["potAccountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["potAccountId"], context) :
                null) :
            null;

        context["field"] = "potType";
        context["metadata"] = (objectMetadata ? objectMetadata["potType"] : null);
        privateState.potType = defaultValues ?
            (defaultValues["potType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["potType"], context) :
                null) :
            null;

        context["field"] = "potName";
        context["metadata"] = (objectMetadata ? objectMetadata["potName"] : null);
        privateState.potName = defaultValues ?
            (defaultValues["potName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["potName"], context) :
                null) :
            null;

        context["field"] = "savingsType";
        context["metadata"] = (objectMetadata ? objectMetadata["savingsType"] : null);
        privateState.savingsType = defaultValues ?
            (defaultValues["savingsType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["savingsType"], context) :
                null) :
            null;

        context["field"] = "targetAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["targetAmount"] : null);
        privateState.targetAmount = defaultValues ?
            (defaultValues["targetAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["targetAmount"], context) :
                null) :
            null;

        context["field"] = "periodicContribution";
        context["metadata"] = (objectMetadata ? objectMetadata["periodicContribution"] : null);
        privateState.periodicContribution = defaultValues ?
            (defaultValues["periodicContribution"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["periodicContribution"], context) :
                null) :
            null;

        context["field"] = "targetPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["targetPeriod"] : null);
        privateState.targetPeriod = defaultValues ?
            (defaultValues["targetPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["targetPeriod"], context) :
                null) :
            null;

        context["field"] = "frequency";
        context["metadata"] = (objectMetadata ? objectMetadata["frequency"] : null);
        privateState.frequency = defaultValues ?
            (defaultValues["frequency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["frequency"], context) :
                null) :
            null;

        context["field"] = "creationDate";
        context["metadata"] = (objectMetadata ? objectMetadata["creationDate"] : null);
        privateState.creationDate = defaultValues ?
            (defaultValues["creationDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creationDate"], context) :
                null) :
            null;

        context["field"] = "startDate";
        context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
        privateState.startDate = defaultValues ?
            (defaultValues["startDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["startDate"], context) :
                null) :
            null;

        context["field"] = "endDate";
        context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
        privateState.endDate = defaultValues ?
            (defaultValues["endDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["endDate"], context) :
                null) :
            null;

        context["field"] = "availableBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
        privateState.availableBalance = defaultValues ?
            (defaultValues["availableBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableBalance"], context) :
                null) :
            null;

        context["field"] = "amountWithdrawn";
        context["metadata"] = (objectMetadata ? objectMetadata["amountWithdrawn"] : null);
        privateState.amountWithdrawn = defaultValues ?
            (defaultValues["amountWithdrawn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amountWithdrawn"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "lastModifiedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lastModifiedDate"] : null);
        privateState.lastModifiedDate = defaultValues ?
            (defaultValues["lastModifiedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastModifiedDate"], context) :
                null) :
            null;

        context["field"] = "frequencyDay";
        context["metadata"] = (objectMetadata ? objectMetadata["frequencyDay"] : null);
        privateState.frequencyDay = defaultValues ?
            (defaultValues["frequencyDay"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["frequencyDay"], context) :
                null) :
            null;

        context["field"] = "potCurrentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["potCurrentStatus"] : null);
        privateState.potCurrentStatus = defaultValues ?
            (defaultValues["potCurrentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["potCurrentStatus"], context) :
                null) :
            null;

        context["field"] = "potAmountPercentage";
        context["metadata"] = (objectMetadata ? objectMetadata["potAmountPercentage"] : null);
        privateState.potAmountPercentage = defaultValues ?
            (defaultValues["potAmountPercentage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["potAmountPercentage"], context) :
                null) :
            null;

        context["field"] = "monthsLeftForCompletion";
        context["metadata"] = (objectMetadata ? objectMetadata["monthsLeftForCompletion"] : null);
        privateState.monthsLeftForCompletion = defaultValues ?
            (defaultValues["monthsLeftForCompletion"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["monthsLeftForCompletion"], context) :
                null) :
            null;

        context["field"] = "remainingSavings";
        context["metadata"] = (objectMetadata ? objectMetadata["remainingSavings"] : null);
        privateState.remainingSavings = defaultValues ?
            (defaultValues["remainingSavings"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["remainingSavings"], context) :
                null) :
            null;

        context["field"] = "errMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errMessage"] : null);
        privateState.errMessage = defaultValues ?
            (defaultValues["errMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errMessage"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "savingsPotId": {
                get: function() {
                    context["field"] = "savingsPotId";
                    context["metadata"] = (objectMetadata ? objectMetadata["savingsPotId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.savingsPotId, context);
                },
                set: function(val) {
                    setterFunctions['savingsPotId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyId": {
                get: function() {
                    context["field"] = "partyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyId, context);
                },
                set: function(val) {
                    setterFunctions['partyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "portfolioId": {
                get: function() {
                    context["field"] = "portfolioId";
                    context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.portfolioId, context);
                },
                set: function(val) {
                    setterFunctions['portfolioId'].call(this, val, privateState);
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
            "fundingAccountId": {
                get: function() {
                    context["field"] = "fundingAccountId";
                    context["metadata"] = (objectMetadata ? objectMetadata["fundingAccountId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fundingAccountId, context);
                },
                set: function(val) {
                    setterFunctions['fundingAccountId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fundingAccountHoldingId": {
                get: function() {
                    context["field"] = "fundingAccountHoldingId";
                    context["metadata"] = (objectMetadata ? objectMetadata["fundingAccountHoldingId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fundingAccountHoldingId, context);
                },
                set: function(val) {
                    setterFunctions['fundingAccountHoldingId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "potAccountId": {
                get: function() {
                    context["field"] = "potAccountId";
                    context["metadata"] = (objectMetadata ? objectMetadata["potAccountId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.potAccountId, context);
                },
                set: function(val) {
                    setterFunctions['potAccountId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "potType": {
                get: function() {
                    context["field"] = "potType";
                    context["metadata"] = (objectMetadata ? objectMetadata["potType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.potType, context);
                },
                set: function(val) {
                    setterFunctions['potType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "potName": {
                get: function() {
                    context["field"] = "potName";
                    context["metadata"] = (objectMetadata ? objectMetadata["potName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.potName, context);
                },
                set: function(val) {
                    setterFunctions['potName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "savingsType": {
                get: function() {
                    context["field"] = "savingsType";
                    context["metadata"] = (objectMetadata ? objectMetadata["savingsType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.savingsType, context);
                },
                set: function(val) {
                    setterFunctions['savingsType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "targetAmount": {
                get: function() {
                    context["field"] = "targetAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["targetAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.targetAmount, context);
                },
                set: function(val) {
                    setterFunctions['targetAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "periodicContribution": {
                get: function() {
                    context["field"] = "periodicContribution";
                    context["metadata"] = (objectMetadata ? objectMetadata["periodicContribution"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.periodicContribution, context);
                },
                set: function(val) {
                    setterFunctions['periodicContribution'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "targetPeriod": {
                get: function() {
                    context["field"] = "targetPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["targetPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.targetPeriod, context);
                },
                set: function(val) {
                    setterFunctions['targetPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "frequency": {
                get: function() {
                    context["field"] = "frequency";
                    context["metadata"] = (objectMetadata ? objectMetadata["frequency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.frequency, context);
                },
                set: function(val) {
                    setterFunctions['frequency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creationDate": {
                get: function() {
                    context["field"] = "creationDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["creationDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creationDate, context);
                },
                set: function(val) {
                    setterFunctions['creationDate'].call(this, val, privateState);
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
            "endDate": {
                get: function() {
                    context["field"] = "endDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.endDate, context);
                },
                set: function(val) {
                    setterFunctions['endDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableBalance": {
                get: function() {
                    context["field"] = "availableBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableBalance, context);
                },
                set: function(val) {
                    setterFunctions['availableBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amountWithdrawn": {
                get: function() {
                    context["field"] = "amountWithdrawn";
                    context["metadata"] = (objectMetadata ? objectMetadata["amountWithdrawn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amountWithdrawn, context);
                },
                set: function(val) {
                    setterFunctions['amountWithdrawn'].call(this, val, privateState);
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
            "lastModifiedDate": {
                get: function() {
                    context["field"] = "lastModifiedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastModifiedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastModifiedDate, context);
                },
                set: function(val) {
                    setterFunctions['lastModifiedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "frequencyDay": {
                get: function() {
                    context["field"] = "frequencyDay";
                    context["metadata"] = (objectMetadata ? objectMetadata["frequencyDay"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.frequencyDay, context);
                },
                set: function(val) {
                    setterFunctions['frequencyDay'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "potCurrentStatus": {
                get: function() {
                    context["field"] = "potCurrentStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["potCurrentStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.potCurrentStatus, context);
                },
                set: function(val) {
                    setterFunctions['potCurrentStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "potAmountPercentage": {
                get: function() {
                    context["field"] = "potAmountPercentage";
                    context["metadata"] = (objectMetadata ? objectMetadata["potAmountPercentage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.potAmountPercentage, context);
                },
                set: function(val) {
                    setterFunctions['potAmountPercentage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "monthsLeftForCompletion": {
                get: function() {
                    context["field"] = "monthsLeftForCompletion";
                    context["metadata"] = (objectMetadata ? objectMetadata["monthsLeftForCompletion"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.monthsLeftForCompletion, context);
                },
                set: function(val) {
                    setterFunctions['monthsLeftForCompletion'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "remainingSavings": {
                get: function() {
                    context["field"] = "remainingSavings";
                    context["metadata"] = (objectMetadata ? objectMetadata["remainingSavings"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.remainingSavings, context);
                },
                set: function(val) {
                    setterFunctions['remainingSavings'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errMessage": {
                get: function() {
                    context["field"] = "errMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["errMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errMessage, context);
                },
                set: function(val) {
                    setterFunctions['errMessage'].call(this, val, privateState);
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
            privateState.savingsPotId = value ? (value["savingsPotId"] ? value["savingsPotId"] : null) : null;
            privateState.partyId = value ? (value["partyId"] ? value["partyId"] : null) : null;
            privateState.portfolioId = value ? (value["portfolioId"] ? value["portfolioId"] : null) : null;
            privateState.productId = value ? (value["productId"] ? value["productId"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.fundingAccountId = value ? (value["fundingAccountId"] ? value["fundingAccountId"] : null) : null;
            privateState.fundingAccountHoldingId = value ? (value["fundingAccountHoldingId"] ? value["fundingAccountHoldingId"] : null) : null;
            privateState.potAccountId = value ? (value["potAccountId"] ? value["potAccountId"] : null) : null;
            privateState.potType = value ? (value["potType"] ? value["potType"] : null) : null;
            privateState.potName = value ? (value["potName"] ? value["potName"] : null) : null;
            privateState.savingsType = value ? (value["savingsType"] ? value["savingsType"] : null) : null;
            privateState.targetAmount = value ? (value["targetAmount"] ? value["targetAmount"] : null) : null;
            privateState.periodicContribution = value ? (value["periodicContribution"] ? value["periodicContribution"] : null) : null;
            privateState.targetPeriod = value ? (value["targetPeriod"] ? value["targetPeriod"] : null) : null;
            privateState.frequency = value ? (value["frequency"] ? value["frequency"] : null) : null;
            privateState.creationDate = value ? (value["creationDate"] ? value["creationDate"] : null) : null;
            privateState.startDate = value ? (value["startDate"] ? value["startDate"] : null) : null;
            privateState.endDate = value ? (value["endDate"] ? value["endDate"] : null) : null;
            privateState.availableBalance = value ? (value["availableBalance"] ? value["availableBalance"] : null) : null;
            privateState.amountWithdrawn = value ? (value["amountWithdrawn"] ? value["amountWithdrawn"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.lastModifiedDate = value ? (value["lastModifiedDate"] ? value["lastModifiedDate"] : null) : null;
            privateState.frequencyDay = value ? (value["frequencyDay"] ? value["frequencyDay"] : null) : null;
            privateState.potCurrentStatus = value ? (value["potCurrentStatus"] ? value["potCurrentStatus"] : null) : null;
            privateState.potAmountPercentage = value ? (value["potAmountPercentage"] ? value["potAmountPercentage"] : null) : null;
            privateState.monthsLeftForCompletion = value ? (value["monthsLeftForCompletion"] ? value["monthsLeftForCompletion"] : null) : null;
            privateState.remainingSavings = value ? (value["remainingSavings"] ? value["remainingSavings"] : null) : null;
            privateState.errMessage = value ? (value["errMessage"] ? value["errMessage"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PotBalance);

    //Create new class level validator object
    BaseModel.Validator.call(PotBalance);

    var registerValidatorBackup = PotBalance.registerValidator;

    PotBalance.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PotBalance.isValid(this, propName, val)) {
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
    //For Operation 'updateBalance' with service id 'updateSavingsPotBalance8223'
     PotBalance.updateBalance = function(params, onCompletion){
        return PotBalance.customVerb('updateBalance', params, onCompletion);
     };

    var relations = [];

    PotBalance.relations = relations;

    PotBalance.prototype.isValid = function() {
        return PotBalance.isValid(this);
    };

    PotBalance.prototype.objModelName = "PotBalance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PotBalance.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SavingsPot", "PotBalance", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PotBalance.clone = function(objectToClone) {
        var clonedObj = new PotBalance();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PotBalance;
});