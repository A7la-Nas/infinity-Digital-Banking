/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CardTransactions", "objectService" : "CardManagementServices"};

    var setterFunctions = {
        cardNumber: function(val, state) {
            context["field"] = "cardNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
            state['cardNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionMerchantAddressName: function(val, state) {
            context["field"] = "transactionMerchantAddressName";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionMerchantAddressName"] : null);
            state['transactionMerchantAddressName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionBalance: function(val, state) {
            context["field"] = "transactionBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionBalance"] : null);
            state['transactionBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionDescription: function(val, state) {
            context["field"] = "transactionDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionDescription"] : null);
            state['transactionDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionMerchantCity: function(val, state) {
            context["field"] = "transactionMerchantCity";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionMerchantCity"] : null);
            state['transactionMerchantCity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionStatus: function(val, state) {
            context["field"] = "transactionStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionStatus"] : null);
            state['transactionStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionType: function(val, state) {
            context["field"] = "transactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
            state['transactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCategory: function(val, state) {
            context["field"] = "transactionCategory";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCategory"] : null);
            state['transactionCategory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        merchantCategory: function(val, state) {
            context["field"] = "merchantCategory";
            context["metadata"] = (objectMetadata ? objectMetadata["merchantCategory"] : null);
            state['merchantCategory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionDetailDescription: function(val, state) {
            context["field"] = "transactionDetailDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionDetailDescription"] : null);
            state['transactionDetailDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionIndicator: function(val, state) {
            context["field"] = "transactionIndicator";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionIndicator"] : null);
            state['transactionIndicator'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionDate: function(val, state) {
            context["field"] = "transactionDate";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionDate"] : null);
            state['transactionDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionTime: function(val, state) {
            context["field"] = "transactionTime";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionTime"] : null);
            state['transactionTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionAmount: function(val, state) {
            context["field"] = "transactionAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
            state['transactionAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionReferenceNumber: function(val, state) {
            context["field"] = "transactionReferenceNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionReferenceNumber"] : null);
            state['transactionReferenceNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCurrencyCode: function(val, state) {
            context["field"] = "transactionCurrencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrencyCode"] : null);
            state['transactionCurrencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exchangeCurrency: function(val, state) {
            context["field"] = "exchangeCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["exchangeCurrency"] : null);
            state['exchangeCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionExchangeRate: function(val, state) {
            context["field"] = "transactionExchangeRate";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionExchangeRate"] : null);
            state['transactionExchangeRate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exchangeAmount: function(val, state) {
            context["field"] = "exchangeAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["exchangeAmount"] : null);
            state['exchangeAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionTaxIndicator: function(val, state) {
            context["field"] = "transactionTaxIndicator";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionTaxIndicator"] : null);
            state['transactionTaxIndicator'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxPercentage: function(val, state) {
            context["field"] = "taxPercentage";
            context["metadata"] = (objectMetadata ? objectMetadata["taxPercentage"] : null);
            state['taxPercentage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionTaxAmount: function(val, state) {
            context["field"] = "transactionTaxAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionTaxAmount"] : null);
            state['transactionTaxAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionTerminalID: function(val, state) {
            context["field"] = "transactionTerminalID";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionTerminalID"] : null);
            state['transactionTerminalID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardType: function(val, state) {
            context["field"] = "cardType";
            context["metadata"] = (objectMetadata ? objectMetadata["cardType"] : null);
            state['cardType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardTransactions: function(val, state) {
            context["field"] = "cardTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["cardTransactions"] : null);
            state['cardTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limit: function(val, state) {
            context["field"] = "limit";
            context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
            state['limit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        offset: function(val, state) {
            context["field"] = "offset";
            context["metadata"] = (objectMetadata ? objectMetadata["offset"] : null);
            state['offset'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortBy: function(val, state) {
            context["field"] = "sortBy";
            context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
            state['sortBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        order: function(val, state) {
            context["field"] = "order";
            context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
            state['order'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardId: function(val, state) {
            context["field"] = "cardId";
            context["metadata"] = (objectMetadata ? objectMetadata["cardId"] : null);
            state['cardId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isdisputed: function(val, state) {
            context["field"] = "isdisputed";
            context["metadata"] = (objectMetadata ? objectMetadata["isdisputed"] : null);
            state['isdisputed'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        disputestatus: function(val, state) {
            context["field"] = "disputestatus";
            context["metadata"] = (objectMetadata ? objectMetadata["disputestatus"] : null);
            state['disputestatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        disputedate: function(val, state) {
            context["field"] = "disputedate";
            context["metadata"] = (objectMetadata ? objectMetadata["disputedate"] : null);
            state['disputedate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        disputereason: function(val, state) {
            context["field"] = "disputereason";
            context["metadata"] = (objectMetadata ? objectMetadata["disputereason"] : null);
            state['disputereason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        disputedescription: function(val, state) {
            context["field"] = "disputedescription";
            context["metadata"] = (objectMetadata ? objectMetadata["disputedescription"] : null);
            state['disputedescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function CardTransactions(defaultValues) {
        var privateState = {};
        context["field"] = "cardNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
        privateState.cardNumber = defaultValues ?
            (defaultValues["cardNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardNumber"], context) :
                null) :
            null;

        context["field"] = "transactionMerchantAddressName";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionMerchantAddressName"] : null);
        privateState.transactionMerchantAddressName = defaultValues ?
            (defaultValues["transactionMerchantAddressName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionMerchantAddressName"], context) :
                null) :
            null;

        context["field"] = "transactionBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionBalance"] : null);
        privateState.transactionBalance = defaultValues ?
            (defaultValues["transactionBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionBalance"], context) :
                null) :
            null;

        context["field"] = "transactionDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionDescription"] : null);
        privateState.transactionDescription = defaultValues ?
            (defaultValues["transactionDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionDescription"], context) :
                null) :
            null;

        context["field"] = "transactionMerchantCity";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionMerchantCity"] : null);
        privateState.transactionMerchantCity = defaultValues ?
            (defaultValues["transactionMerchantCity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionMerchantCity"], context) :
                null) :
            null;

        context["field"] = "transactionStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionStatus"] : null);
        privateState.transactionStatus = defaultValues ?
            (defaultValues["transactionStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionStatus"], context) :
                null) :
            null;

        context["field"] = "transactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
        privateState.transactionType = defaultValues ?
            (defaultValues["transactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionType"], context) :
                null) :
            null;

        context["field"] = "transactionCategory";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCategory"] : null);
        privateState.transactionCategory = defaultValues ?
            (defaultValues["transactionCategory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCategory"], context) :
                null) :
            null;

        context["field"] = "merchantCategory";
        context["metadata"] = (objectMetadata ? objectMetadata["merchantCategory"] : null);
        privateState.merchantCategory = defaultValues ?
            (defaultValues["merchantCategory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["merchantCategory"], context) :
                null) :
            null;

        context["field"] = "transactionDetailDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionDetailDescription"] : null);
        privateState.transactionDetailDescription = defaultValues ?
            (defaultValues["transactionDetailDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionDetailDescription"], context) :
                null) :
            null;

        context["field"] = "transactionIndicator";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionIndicator"] : null);
        privateState.transactionIndicator = defaultValues ?
            (defaultValues["transactionIndicator"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionIndicator"], context) :
                null) :
            null;

        context["field"] = "transactionDate";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionDate"] : null);
        privateState.transactionDate = defaultValues ?
            (defaultValues["transactionDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionDate"], context) :
                null) :
            null;

        context["field"] = "transactionTime";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionTime"] : null);
        privateState.transactionTime = defaultValues ?
            (defaultValues["transactionTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionTime"], context) :
                null) :
            null;

        context["field"] = "transactionAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
        privateState.transactionAmount = defaultValues ?
            (defaultValues["transactionAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionAmount"], context) :
                null) :
            null;

        context["field"] = "transactionReferenceNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionReferenceNumber"] : null);
        privateState.transactionReferenceNumber = defaultValues ?
            (defaultValues["transactionReferenceNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionReferenceNumber"], context) :
                null) :
            null;

        context["field"] = "transactionCurrencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrencyCode"] : null);
        privateState.transactionCurrencyCode = defaultValues ?
            (defaultValues["transactionCurrencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCurrencyCode"], context) :
                null) :
            null;

        context["field"] = "exchangeCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["exchangeCurrency"] : null);
        privateState.exchangeCurrency = defaultValues ?
            (defaultValues["exchangeCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exchangeCurrency"], context) :
                null) :
            null;

        context["field"] = "transactionExchangeRate";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionExchangeRate"] : null);
        privateState.transactionExchangeRate = defaultValues ?
            (defaultValues["transactionExchangeRate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionExchangeRate"], context) :
                null) :
            null;

        context["field"] = "exchangeAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["exchangeAmount"] : null);
        privateState.exchangeAmount = defaultValues ?
            (defaultValues["exchangeAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exchangeAmount"], context) :
                null) :
            null;

        context["field"] = "transactionTaxIndicator";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionTaxIndicator"] : null);
        privateState.transactionTaxIndicator = defaultValues ?
            (defaultValues["transactionTaxIndicator"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionTaxIndicator"], context) :
                null) :
            null;

        context["field"] = "taxPercentage";
        context["metadata"] = (objectMetadata ? objectMetadata["taxPercentage"] : null);
        privateState.taxPercentage = defaultValues ?
            (defaultValues["taxPercentage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxPercentage"], context) :
                null) :
            null;

        context["field"] = "transactionTaxAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionTaxAmount"] : null);
        privateState.transactionTaxAmount = defaultValues ?
            (defaultValues["transactionTaxAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionTaxAmount"], context) :
                null) :
            null;

        context["field"] = "transactionTerminalID";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionTerminalID"] : null);
        privateState.transactionTerminalID = defaultValues ?
            (defaultValues["transactionTerminalID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionTerminalID"], context) :
                null) :
            null;

        context["field"] = "cardType";
        context["metadata"] = (objectMetadata ? objectMetadata["cardType"] : null);
        privateState.cardType = defaultValues ?
            (defaultValues["cardType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardType"], context) :
                null) :
            null;

        context["field"] = "cardTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["cardTransactions"] : null);
        privateState.cardTransactions = defaultValues ?
            (defaultValues["cardTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardTransactions"], context) :
                null) :
            null;

        context["field"] = "limit";
        context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
        privateState.limit = defaultValues ?
            (defaultValues["limit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limit"], context) :
                null) :
            null;

        context["field"] = "offset";
        context["metadata"] = (objectMetadata ? objectMetadata["offset"] : null);
        privateState.offset = defaultValues ?
            (defaultValues["offset"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["offset"], context) :
                null) :
            null;

        context["field"] = "sortBy";
        context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
        privateState.sortBy = defaultValues ?
            (defaultValues["sortBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortBy"], context) :
                null) :
            null;

        context["field"] = "order";
        context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
        privateState.order = defaultValues ?
            (defaultValues["order"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["order"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "cardId";
        context["metadata"] = (objectMetadata ? objectMetadata["cardId"] : null);
        privateState.cardId = defaultValues ?
            (defaultValues["cardId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardId"], context) :
                null) :
            null;

        context["field"] = "isdisputed";
        context["metadata"] = (objectMetadata ? objectMetadata["isdisputed"] : null);
        privateState.isdisputed = defaultValues ?
            (defaultValues["isdisputed"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isdisputed"], context) :
                null) :
            null;

        context["field"] = "disputestatus";
        context["metadata"] = (objectMetadata ? objectMetadata["disputestatus"] : null);
        privateState.disputestatus = defaultValues ?
            (defaultValues["disputestatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["disputestatus"], context) :
                null) :
            null;

        context["field"] = "disputedate";
        context["metadata"] = (objectMetadata ? objectMetadata["disputedate"] : null);
        privateState.disputedate = defaultValues ?
            (defaultValues["disputedate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["disputedate"], context) :
                null) :
            null;

        context["field"] = "disputereason";
        context["metadata"] = (objectMetadata ? objectMetadata["disputereason"] : null);
        privateState.disputereason = defaultValues ?
            (defaultValues["disputereason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["disputereason"], context) :
                null) :
            null;

        context["field"] = "disputedescription";
        context["metadata"] = (objectMetadata ? objectMetadata["disputedescription"] : null);
        privateState.disputedescription = defaultValues ?
            (defaultValues["disputedescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["disputedescription"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "cardNumber": {
                get: function() {
                    context["field"] = "cardNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardNumber, context);
                },
                set: function(val) {
                    setterFunctions['cardNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionMerchantAddressName": {
                get: function() {
                    context["field"] = "transactionMerchantAddressName";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionMerchantAddressName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionMerchantAddressName, context);
                },
                set: function(val) {
                    setterFunctions['transactionMerchantAddressName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionBalance": {
                get: function() {
                    context["field"] = "transactionBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionBalance, context);
                },
                set: function(val) {
                    setterFunctions['transactionBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionDescription": {
                get: function() {
                    context["field"] = "transactionDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionDescription, context);
                },
                set: function(val) {
                    setterFunctions['transactionDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionMerchantCity": {
                get: function() {
                    context["field"] = "transactionMerchantCity";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionMerchantCity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionMerchantCity, context);
                },
                set: function(val) {
                    setterFunctions['transactionMerchantCity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionStatus": {
                get: function() {
                    context["field"] = "transactionStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionStatus, context);
                },
                set: function(val) {
                    setterFunctions['transactionStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionType": {
                get: function() {
                    context["field"] = "transactionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionType, context);
                },
                set: function(val) {
                    setterFunctions['transactionType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionCategory": {
                get: function() {
                    context["field"] = "transactionCategory";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionCategory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionCategory, context);
                },
                set: function(val) {
                    setterFunctions['transactionCategory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "merchantCategory": {
                get: function() {
                    context["field"] = "merchantCategory";
                    context["metadata"] = (objectMetadata ? objectMetadata["merchantCategory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.merchantCategory, context);
                },
                set: function(val) {
                    setterFunctions['merchantCategory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionDetailDescription": {
                get: function() {
                    context["field"] = "transactionDetailDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionDetailDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionDetailDescription, context);
                },
                set: function(val) {
                    setterFunctions['transactionDetailDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionIndicator": {
                get: function() {
                    context["field"] = "transactionIndicator";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionIndicator"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionIndicator, context);
                },
                set: function(val) {
                    setterFunctions['transactionIndicator'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionDate": {
                get: function() {
                    context["field"] = "transactionDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionDate, context);
                },
                set: function(val) {
                    setterFunctions['transactionDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionTime": {
                get: function() {
                    context["field"] = "transactionTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionTime, context);
                },
                set: function(val) {
                    setterFunctions['transactionTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionAmount": {
                get: function() {
                    context["field"] = "transactionAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionAmount, context);
                },
                set: function(val) {
                    setterFunctions['transactionAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionReferenceNumber": {
                get: function() {
                    context["field"] = "transactionReferenceNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionReferenceNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionReferenceNumber, context);
                },
                set: function(val) {
                    setterFunctions['transactionReferenceNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionCurrencyCode": {
                get: function() {
                    context["field"] = "transactionCurrencyCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrencyCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionCurrencyCode, context);
                },
                set: function(val) {
                    setterFunctions['transactionCurrencyCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "exchangeCurrency": {
                get: function() {
                    context["field"] = "exchangeCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["exchangeCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.exchangeCurrency, context);
                },
                set: function(val) {
                    setterFunctions['exchangeCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionExchangeRate": {
                get: function() {
                    context["field"] = "transactionExchangeRate";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionExchangeRate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionExchangeRate, context);
                },
                set: function(val) {
                    setterFunctions['transactionExchangeRate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "exchangeAmount": {
                get: function() {
                    context["field"] = "exchangeAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["exchangeAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.exchangeAmount, context);
                },
                set: function(val) {
                    setterFunctions['exchangeAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionTaxIndicator": {
                get: function() {
                    context["field"] = "transactionTaxIndicator";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionTaxIndicator"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionTaxIndicator, context);
                },
                set: function(val) {
                    setterFunctions['transactionTaxIndicator'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "taxPercentage": {
                get: function() {
                    context["field"] = "taxPercentage";
                    context["metadata"] = (objectMetadata ? objectMetadata["taxPercentage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.taxPercentage, context);
                },
                set: function(val) {
                    setterFunctions['taxPercentage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionTaxAmount": {
                get: function() {
                    context["field"] = "transactionTaxAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionTaxAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionTaxAmount, context);
                },
                set: function(val) {
                    setterFunctions['transactionTaxAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionTerminalID": {
                get: function() {
                    context["field"] = "transactionTerminalID";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionTerminalID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionTerminalID, context);
                },
                set: function(val) {
                    setterFunctions['transactionTerminalID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardType": {
                get: function() {
                    context["field"] = "cardType";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardType, context);
                },
                set: function(val) {
                    setterFunctions['cardType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardTransactions": {
                get: function() {
                    context["field"] = "cardTransactions";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardTransactions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardTransactions, context);
                },
                set: function(val) {
                    setterFunctions['cardTransactions'].call(this, val, privateState);
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
            "offset": {
                get: function() {
                    context["field"] = "offset";
                    context["metadata"] = (objectMetadata ? objectMetadata["offset"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.offset, context);
                },
                set: function(val) {
                    setterFunctions['offset'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortBy": {
                get: function() {
                    context["field"] = "sortBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortBy, context);
                },
                set: function(val) {
                    setterFunctions['sortBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "order": {
                get: function() {
                    context["field"] = "order";
                    context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.order, context);
                },
                set: function(val) {
                    setterFunctions['order'].call(this, val, privateState);
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
            "cardId": {
                get: function() {
                    context["field"] = "cardId";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardId, context);
                },
                set: function(val) {
                    setterFunctions['cardId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isdisputed": {
                get: function() {
                    context["field"] = "isdisputed";
                    context["metadata"] = (objectMetadata ? objectMetadata["isdisputed"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isdisputed, context);
                },
                set: function(val) {
                    setterFunctions['isdisputed'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "disputestatus": {
                get: function() {
                    context["field"] = "disputestatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["disputestatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.disputestatus, context);
                },
                set: function(val) {
                    setterFunctions['disputestatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "disputedate": {
                get: function() {
                    context["field"] = "disputedate";
                    context["metadata"] = (objectMetadata ? objectMetadata["disputedate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.disputedate, context);
                },
                set: function(val) {
                    setterFunctions['disputedate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "disputereason": {
                get: function() {
                    context["field"] = "disputereason";
                    context["metadata"] = (objectMetadata ? objectMetadata["disputereason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.disputereason, context);
                },
                set: function(val) {
                    setterFunctions['disputereason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "disputedescription": {
                get: function() {
                    context["field"] = "disputedescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["disputedescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.disputedescription, context);
                },
                set: function(val) {
                    setterFunctions['disputedescription'].call(this, val, privateState);
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
            privateState.cardNumber = value ? (value["cardNumber"] ? value["cardNumber"] : null) : null;
            privateState.transactionMerchantAddressName = value ? (value["transactionMerchantAddressName"] ? value["transactionMerchantAddressName"] : null) : null;
            privateState.transactionBalance = value ? (value["transactionBalance"] ? value["transactionBalance"] : null) : null;
            privateState.transactionDescription = value ? (value["transactionDescription"] ? value["transactionDescription"] : null) : null;
            privateState.transactionMerchantCity = value ? (value["transactionMerchantCity"] ? value["transactionMerchantCity"] : null) : null;
            privateState.transactionStatus = value ? (value["transactionStatus"] ? value["transactionStatus"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.transactionCategory = value ? (value["transactionCategory"] ? value["transactionCategory"] : null) : null;
            privateState.merchantCategory = value ? (value["merchantCategory"] ? value["merchantCategory"] : null) : null;
            privateState.transactionDetailDescription = value ? (value["transactionDetailDescription"] ? value["transactionDetailDescription"] : null) : null;
            privateState.transactionIndicator = value ? (value["transactionIndicator"] ? value["transactionIndicator"] : null) : null;
            privateState.transactionDate = value ? (value["transactionDate"] ? value["transactionDate"] : null) : null;
            privateState.transactionTime = value ? (value["transactionTime"] ? value["transactionTime"] : null) : null;
            privateState.transactionAmount = value ? (value["transactionAmount"] ? value["transactionAmount"] : null) : null;
            privateState.transactionReferenceNumber = value ? (value["transactionReferenceNumber"] ? value["transactionReferenceNumber"] : null) : null;
            privateState.transactionCurrencyCode = value ? (value["transactionCurrencyCode"] ? value["transactionCurrencyCode"] : null) : null;
            privateState.exchangeCurrency = value ? (value["exchangeCurrency"] ? value["exchangeCurrency"] : null) : null;
            privateState.transactionExchangeRate = value ? (value["transactionExchangeRate"] ? value["transactionExchangeRate"] : null) : null;
            privateState.exchangeAmount = value ? (value["exchangeAmount"] ? value["exchangeAmount"] : null) : null;
            privateState.transactionTaxIndicator = value ? (value["transactionTaxIndicator"] ? value["transactionTaxIndicator"] : null) : null;
            privateState.taxPercentage = value ? (value["taxPercentage"] ? value["taxPercentage"] : null) : null;
            privateState.transactionTaxAmount = value ? (value["transactionTaxAmount"] ? value["transactionTaxAmount"] : null) : null;
            privateState.transactionTerminalID = value ? (value["transactionTerminalID"] ? value["transactionTerminalID"] : null) : null;
            privateState.cardType = value ? (value["cardType"] ? value["cardType"] : null) : null;
            privateState.cardTransactions = value ? (value["cardTransactions"] ? value["cardTransactions"] : null) : null;
            privateState.limit = value ? (value["limit"] ? value["limit"] : null) : null;
            privateState.offset = value ? (value["offset"] ? value["offset"] : null) : null;
            privateState.sortBy = value ? (value["sortBy"] ? value["sortBy"] : null) : null;
            privateState.order = value ? (value["order"] ? value["order"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.cardId = value ? (value["cardId"] ? value["cardId"] : null) : null;
            privateState.isdisputed = value ? (value["isdisputed"] ? value["isdisputed"] : null) : null;
            privateState.disputestatus = value ? (value["disputestatus"] ? value["disputestatus"] : null) : null;
            privateState.disputedate = value ? (value["disputedate"] ? value["disputedate"] : null) : null;
            privateState.disputereason = value ? (value["disputereason"] ? value["disputereason"] : null) : null;
            privateState.disputedescription = value ? (value["disputedescription"] ? value["disputedescription"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(CardTransactions);

    //Create new class level validator object
    BaseModel.Validator.call(CardTransactions);

    var registerValidatorBackup = CardTransactions.registerValidator;

    CardTransactions.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CardTransactions.isValid(this, propName, val)) {
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
    //For Operation 'getCardTransactions' with service id 'getCardTransactions4669'
     CardTransactions.getCardTransactions = function(params, onCompletion){
        return CardTransactions.customVerb('getCardTransactions', params, onCompletion);
     };

    var relations = [];

    CardTransactions.relations = relations;

    CardTransactions.prototype.isValid = function() {
        return CardTransactions.isValid(this);
    };

    CardTransactions.prototype.objModelName = "CardTransactions";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CardTransactions.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CardManagementServices", "CardTransactions", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CardTransactions.clone = function(objectToClone) {
        var clonedObj = new CardTransactions();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CardTransactions;
});