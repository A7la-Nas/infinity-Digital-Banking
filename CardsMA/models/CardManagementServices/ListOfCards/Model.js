/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ListOfCards", "objectService" : "CardManagementServices"};

    var setterFunctions = {
        Action: function(val, state) {
            context["field"] = "Action";
            context["metadata"] = (objectMetadata ? objectMetadata["Action"] : null);
            state['Action'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardHolderName: function(val, state) {
            context["field"] = "cardHolderName";
            context["metadata"] = (objectMetadata ? objectMetadata["cardHolderName"] : null);
            state['cardHolderName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardId: function(val, state) {
            context["field"] = "cardId";
            context["metadata"] = (objectMetadata ? objectMetadata["cardId"] : null);
            state['cardId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardNumber: function(val, state) {
            context["field"] = "cardNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
            state['cardNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardStatus: function(val, state) {
            context["field"] = "cardStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["cardStatus"] : null);
            state['cardStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardType: function(val, state) {
            context["field"] = "cardType";
            context["metadata"] = (objectMetadata ? objectMetadata["cardType"] : null);
            state['cardType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryDate: function(val, state) {
            context["field"] = "expiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
            state['expiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Reason: function(val, state) {
            context["field"] = "Reason";
            context["metadata"] = (objectMetadata ? objectMetadata["Reason"] : null);
            state['Reason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditLimit: function(val, state) {
            context["field"] = "creditLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
            state['creditLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableCredit: function(val, state) {
            context["field"] = "availableCredit";
            context["metadata"] = (objectMetadata ? objectMetadata["availableCredit"] : null);
            state['availableCredit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceProvider: function(val, state) {
            context["field"] = "serviceProvider";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceProvider"] : null);
            state['serviceProvider'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billingAddress: function(val, state) {
            context["field"] = "billingAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["billingAddress"] : null);
            state['billingAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardProductName: function(val, state) {
            context["field"] = "cardProductName";
            context["metadata"] = (objectMetadata ? objectMetadata["cardProductName"] : null);
            state['cardProductName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        secondaryCardHolder: function(val, state) {
            context["field"] = "secondaryCardHolder";
            context["metadata"] = (objectMetadata ? objectMetadata["secondaryCardHolder"] : null);
            state['secondaryCardHolder'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        withdrawlLimit: function(val, state) {
            context["field"] = "withdrawlLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["withdrawlLimit"] : null);
            state['withdrawlLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        withdrawalMinLimit: function(val, state) {
            context["field"] = "withdrawalMinLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMinLimit"] : null);
            state['withdrawalMinLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        withdrawalMaxLimit: function(val, state) {
            context["field"] = "withdrawalMaxLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMaxLimit"] : null);
            state['withdrawalMaxLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        withdrawalStepLimit: function(val, state) {
            context["field"] = "withdrawalStepLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["withdrawalStepLimit"] : null);
            state['withdrawalStepLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        purchaseLimit: function(val, state) {
            context["field"] = "purchaseLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["purchaseLimit"] : null);
            state['purchaseLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        purchaseMinLimit: function(val, state) {
            context["field"] = "purchaseMinLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["purchaseMinLimit"] : null);
            state['purchaseMinLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        purchaseMaxLimit: function(val, state) {
            context["field"] = "purchaseMaxLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["purchaseMaxLimit"] : null);
            state['purchaseMaxLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        purchaseStepLimit: function(val, state) {
            context["field"] = "purchaseStepLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["purchaseStepLimit"] : null);
            state['purchaseStepLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maskedAccountNumber: function(val, state) {
            context["field"] = "maskedAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["maskedAccountNumber"] : null);
            state['maskedAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maskedCardNumber: function(val, state) {
            context["field"] = "maskedCardNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["maskedCardNumber"] : null);
            state['maskedCardNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isInternational: function(val, state) {
            context["field"] = "isInternational";
            context["metadata"] = (objectMetadata ? objectMetadata["isInternational"] : null);
            state['isInternational'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        AccountType: function(val, state) {
            context["field"] = "AccountType";
            context["metadata"] = (objectMetadata ? objectMetadata["AccountType"] : null);
            state['AccountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RequestCode: function(val, state) {
            context["field"] = "RequestCode";
            context["metadata"] = (objectMetadata ? objectMetadata["RequestCode"] : null);
            state['RequestCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RequestReason: function(val, state) {
            context["field"] = "RequestReason";
            context["metadata"] = (objectMetadata ? objectMetadata["RequestReason"] : null);
            state['RequestReason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Channel: function(val, state) {
            context["field"] = "Channel";
            context["metadata"] = (objectMetadata ? objectMetadata["Channel"] : null);
            state['Channel'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Address_id: function(val, state) {
            context["field"] = "Address_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Address_id"] : null);
            state['Address_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        communication_id: function(val, state) {
            context["field"] = "communication_id";
            context["metadata"] = (objectMetadata ? objectMetadata["communication_id"] : null);
            state['communication_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        transactionCurrency: function(val, state) {
            context["field"] = "transactionCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
            state['transactionCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Currency: function(val, state) {
            context["field"] = "Currency";
            context["metadata"] = (objectMetadata ? objectMetadata["Currency"] : null);
            state['Currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentBalance: function(val, state) {
            context["field"] = "currentBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
            state['currentBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rewardsPoint: function(val, state) {
            context["field"] = "rewardsPoint";
            context["metadata"] = (objectMetadata ? objectMetadata["rewardsPoint"] : null);
            state['rewardsPoint'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDueDate: function(val, state) {
            context["field"] = "paymentDueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDueDate"] : null);
            state['paymentDueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableBalance: function(val, state) {
            context["field"] = "availableBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
            state['availableBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isTypeBusiness: function(val, state) {
            context["field"] = "isTypeBusiness";
            context["metadata"] = (objectMetadata ? objectMetadata["isTypeBusiness"] : null);
            state['isTypeBusiness'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isExpiring: function(val, state) {
            context["field"] = "isExpiring";
            context["metadata"] = (objectMetadata ? objectMetadata["isExpiring"] : null);
            state['isExpiring'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ListOfCards(defaultValues) {
        var privateState = {};
        context["field"] = "Action";
        context["metadata"] = (objectMetadata ? objectMetadata["Action"] : null);
        privateState.Action = defaultValues ?
            (defaultValues["Action"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Action"], context) :
                null) :
            null;

        context["field"] = "cardHolderName";
        context["metadata"] = (objectMetadata ? objectMetadata["cardHolderName"] : null);
        privateState.cardHolderName = defaultValues ?
            (defaultValues["cardHolderName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardHolderName"], context) :
                null) :
            null;

        context["field"] = "cardId";
        context["metadata"] = (objectMetadata ? objectMetadata["cardId"] : null);
        privateState.cardId = defaultValues ?
            (defaultValues["cardId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardId"], context) :
                null) :
            null;

        context["field"] = "cardNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
        privateState.cardNumber = defaultValues ?
            (defaultValues["cardNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardNumber"], context) :
                null) :
            null;

        context["field"] = "cardStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["cardStatus"] : null);
        privateState.cardStatus = defaultValues ?
            (defaultValues["cardStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardStatus"], context) :
                null) :
            null;

        context["field"] = "cardType";
        context["metadata"] = (objectMetadata ? objectMetadata["cardType"] : null);
        privateState.cardType = defaultValues ?
            (defaultValues["cardType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardType"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "expiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
        privateState.expiryDate = defaultValues ?
            (defaultValues["expiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryDate"], context) :
                null) :
            null;

        context["field"] = "Reason";
        context["metadata"] = (objectMetadata ? objectMetadata["Reason"] : null);
        privateState.Reason = defaultValues ?
            (defaultValues["Reason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Reason"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "creditLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
        privateState.creditLimit = defaultValues ?
            (defaultValues["creditLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditLimit"], context) :
                null) :
            null;

        context["field"] = "availableCredit";
        context["metadata"] = (objectMetadata ? objectMetadata["availableCredit"] : null);
        privateState.availableCredit = defaultValues ?
            (defaultValues["availableCredit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableCredit"], context) :
                null) :
            null;

        context["field"] = "serviceProvider";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceProvider"] : null);
        privateState.serviceProvider = defaultValues ?
            (defaultValues["serviceProvider"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceProvider"], context) :
                null) :
            null;

        context["field"] = "billingAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["billingAddress"] : null);
        privateState.billingAddress = defaultValues ?
            (defaultValues["billingAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billingAddress"], context) :
                null) :
            null;

        context["field"] = "cardProductName";
        context["metadata"] = (objectMetadata ? objectMetadata["cardProductName"] : null);
        privateState.cardProductName = defaultValues ?
            (defaultValues["cardProductName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardProductName"], context) :
                null) :
            null;

        context["field"] = "secondaryCardHolder";
        context["metadata"] = (objectMetadata ? objectMetadata["secondaryCardHolder"] : null);
        privateState.secondaryCardHolder = defaultValues ?
            (defaultValues["secondaryCardHolder"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["secondaryCardHolder"], context) :
                null) :
            null;

        context["field"] = "withdrawlLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["withdrawlLimit"] : null);
        privateState.withdrawlLimit = defaultValues ?
            (defaultValues["withdrawlLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["withdrawlLimit"], context) :
                null) :
            null;

        context["field"] = "withdrawalMinLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMinLimit"] : null);
        privateState.withdrawalMinLimit = defaultValues ?
            (defaultValues["withdrawalMinLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["withdrawalMinLimit"], context) :
                null) :
            null;

        context["field"] = "withdrawalMaxLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMaxLimit"] : null);
        privateState.withdrawalMaxLimit = defaultValues ?
            (defaultValues["withdrawalMaxLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["withdrawalMaxLimit"], context) :
                null) :
            null;

        context["field"] = "withdrawalStepLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["withdrawalStepLimit"] : null);
        privateState.withdrawalStepLimit = defaultValues ?
            (defaultValues["withdrawalStepLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["withdrawalStepLimit"], context) :
                null) :
            null;

        context["field"] = "purchaseLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["purchaseLimit"] : null);
        privateState.purchaseLimit = defaultValues ?
            (defaultValues["purchaseLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["purchaseLimit"], context) :
                null) :
            null;

        context["field"] = "purchaseMinLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["purchaseMinLimit"] : null);
        privateState.purchaseMinLimit = defaultValues ?
            (defaultValues["purchaseMinLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["purchaseMinLimit"], context) :
                null) :
            null;

        context["field"] = "purchaseMaxLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["purchaseMaxLimit"] : null);
        privateState.purchaseMaxLimit = defaultValues ?
            (defaultValues["purchaseMaxLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["purchaseMaxLimit"], context) :
                null) :
            null;

        context["field"] = "purchaseStepLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["purchaseStepLimit"] : null);
        privateState.purchaseStepLimit = defaultValues ?
            (defaultValues["purchaseStepLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["purchaseStepLimit"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "maskedAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["maskedAccountNumber"] : null);
        privateState.maskedAccountNumber = defaultValues ?
            (defaultValues["maskedAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maskedAccountNumber"], context) :
                null) :
            null;

        context["field"] = "maskedCardNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["maskedCardNumber"] : null);
        privateState.maskedCardNumber = defaultValues ?
            (defaultValues["maskedCardNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maskedCardNumber"], context) :
                null) :
            null;

        context["field"] = "isInternational";
        context["metadata"] = (objectMetadata ? objectMetadata["isInternational"] : null);
        privateState.isInternational = defaultValues ?
            (defaultValues["isInternational"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isInternational"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "AccountType";
        context["metadata"] = (objectMetadata ? objectMetadata["AccountType"] : null);
        privateState.AccountType = defaultValues ?
            (defaultValues["AccountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["AccountType"], context) :
                null) :
            null;

        context["field"] = "RequestCode";
        context["metadata"] = (objectMetadata ? objectMetadata["RequestCode"] : null);
        privateState.RequestCode = defaultValues ?
            (defaultValues["RequestCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RequestCode"], context) :
                null) :
            null;

        context["field"] = "RequestReason";
        context["metadata"] = (objectMetadata ? objectMetadata["RequestReason"] : null);
        privateState.RequestReason = defaultValues ?
            (defaultValues["RequestReason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RequestReason"], context) :
                null) :
            null;

        context["field"] = "Channel";
        context["metadata"] = (objectMetadata ? objectMetadata["Channel"] : null);
        privateState.Channel = defaultValues ?
            (defaultValues["Channel"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Channel"], context) :
                null) :
            null;

        context["field"] = "Address_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Address_id"] : null);
        privateState.Address_id = defaultValues ?
            (defaultValues["Address_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Address_id"], context) :
                null) :
            null;

        context["field"] = "communication_id";
        context["metadata"] = (objectMetadata ? objectMetadata["communication_id"] : null);
        privateState.communication_id = defaultValues ?
            (defaultValues["communication_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["communication_id"], context) :
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

        context["field"] = "transactionCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
        privateState.transactionCurrency = defaultValues ?
            (defaultValues["transactionCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCurrency"], context) :
                null) :
            null;

        context["field"] = "Currency";
        context["metadata"] = (objectMetadata ? objectMetadata["Currency"] : null);
        privateState.Currency = defaultValues ?
            (defaultValues["Currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Currency"], context) :
                null) :
            null;

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "currentBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
        privateState.currentBalance = defaultValues ?
            (defaultValues["currentBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentBalance"], context) :
                null) :
            null;

        context["field"] = "rewardsPoint";
        context["metadata"] = (objectMetadata ? objectMetadata["rewardsPoint"] : null);
        privateState.rewardsPoint = defaultValues ?
            (defaultValues["rewardsPoint"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rewardsPoint"], context) :
                null) :
            null;

        context["field"] = "paymentDueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDueDate"] : null);
        privateState.paymentDueDate = defaultValues ?
            (defaultValues["paymentDueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDueDate"], context) :
                null) :
            null;

        context["field"] = "availableBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
        privateState.availableBalance = defaultValues ?
            (defaultValues["availableBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableBalance"], context) :
                null) :
            null;

        context["field"] = "isTypeBusiness";
        context["metadata"] = (objectMetadata ? objectMetadata["isTypeBusiness"] : null);
        privateState.isTypeBusiness = defaultValues ?
            (defaultValues["isTypeBusiness"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isTypeBusiness"], context) :
                null) :
            null;

        context["field"] = "isExpiring";
        context["metadata"] = (objectMetadata ? objectMetadata["isExpiring"] : null);
        privateState.isExpiring = defaultValues ?
            (defaultValues["isExpiring"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isExpiring"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "Action": {
                get: function() {
                    context["field"] = "Action";
                    context["metadata"] = (objectMetadata ? objectMetadata["Action"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Action, context);
                },
                set: function(val) {
                    setterFunctions['Action'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardHolderName": {
                get: function() {
                    context["field"] = "cardHolderName";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardHolderName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardHolderName, context);
                },
                set: function(val) {
                    setterFunctions['cardHolderName'].call(this, val, privateState);
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
            "cardStatus": {
                get: function() {
                    context["field"] = "cardStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardStatus, context);
                },
                set: function(val) {
                    setterFunctions['cardStatus'].call(this, val, privateState);
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
            "expiryDate": {
                get: function() {
                    context["field"] = "expiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryDate, context);
                },
                set: function(val) {
                    setterFunctions['expiryDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Reason": {
                get: function() {
                    context["field"] = "Reason";
                    context["metadata"] = (objectMetadata ? objectMetadata["Reason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Reason, context);
                },
                set: function(val) {
                    setterFunctions['Reason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "success": {
                get: function() {
                    context["field"] = "success";
                    context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.success, context);
                },
                set: function(val) {
                    setterFunctions['success'].call(this, val, privateState);
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
            "userName": {
                get: function() {
                    context["field"] = "userName";
                    context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userName, context);
                },
                set: function(val) {
                    setterFunctions['userName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditLimit": {
                get: function() {
                    context["field"] = "creditLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditLimit, context);
                },
                set: function(val) {
                    setterFunctions['creditLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableCredit": {
                get: function() {
                    context["field"] = "availableCredit";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableCredit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableCredit, context);
                },
                set: function(val) {
                    setterFunctions['availableCredit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceProvider": {
                get: function() {
                    context["field"] = "serviceProvider";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceProvider"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceProvider, context);
                },
                set: function(val) {
                    setterFunctions['serviceProvider'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "billingAddress": {
                get: function() {
                    context["field"] = "billingAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["billingAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billingAddress, context);
                },
                set: function(val) {
                    setterFunctions['billingAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardProductName": {
                get: function() {
                    context["field"] = "cardProductName";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardProductName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardProductName, context);
                },
                set: function(val) {
                    setterFunctions['cardProductName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "secondaryCardHolder": {
                get: function() {
                    context["field"] = "secondaryCardHolder";
                    context["metadata"] = (objectMetadata ? objectMetadata["secondaryCardHolder"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.secondaryCardHolder, context);
                },
                set: function(val) {
                    setterFunctions['secondaryCardHolder'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "withdrawlLimit": {
                get: function() {
                    context["field"] = "withdrawlLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["withdrawlLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.withdrawlLimit, context);
                },
                set: function(val) {
                    setterFunctions['withdrawlLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "withdrawalMinLimit": {
                get: function() {
                    context["field"] = "withdrawalMinLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMinLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.withdrawalMinLimit, context);
                },
                set: function(val) {
                    setterFunctions['withdrawalMinLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "withdrawalMaxLimit": {
                get: function() {
                    context["field"] = "withdrawalMaxLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMaxLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.withdrawalMaxLimit, context);
                },
                set: function(val) {
                    setterFunctions['withdrawalMaxLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "withdrawalStepLimit": {
                get: function() {
                    context["field"] = "withdrawalStepLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["withdrawalStepLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.withdrawalStepLimit, context);
                },
                set: function(val) {
                    setterFunctions['withdrawalStepLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "purchaseLimit": {
                get: function() {
                    context["field"] = "purchaseLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["purchaseLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.purchaseLimit, context);
                },
                set: function(val) {
                    setterFunctions['purchaseLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "purchaseMinLimit": {
                get: function() {
                    context["field"] = "purchaseMinLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["purchaseMinLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.purchaseMinLimit, context);
                },
                set: function(val) {
                    setterFunctions['purchaseMinLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "purchaseMaxLimit": {
                get: function() {
                    context["field"] = "purchaseMaxLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["purchaseMaxLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.purchaseMaxLimit, context);
                },
                set: function(val) {
                    setterFunctions['purchaseMaxLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "purchaseStepLimit": {
                get: function() {
                    context["field"] = "purchaseStepLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["purchaseStepLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.purchaseStepLimit, context);
                },
                set: function(val) {
                    setterFunctions['purchaseStepLimit'].call(this, val, privateState);
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
            "maskedAccountNumber": {
                get: function() {
                    context["field"] = "maskedAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["maskedAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maskedAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['maskedAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maskedCardNumber": {
                get: function() {
                    context["field"] = "maskedCardNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["maskedCardNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maskedCardNumber, context);
                },
                set: function(val) {
                    setterFunctions['maskedCardNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isInternational": {
                get: function() {
                    context["field"] = "isInternational";
                    context["metadata"] = (objectMetadata ? objectMetadata["isInternational"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isInternational, context);
                },
                set: function(val) {
                    setterFunctions['isInternational'].call(this, val, privateState);
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
            "AccountType": {
                get: function() {
                    context["field"] = "AccountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["AccountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.AccountType, context);
                },
                set: function(val) {
                    setterFunctions['AccountType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RequestCode": {
                get: function() {
                    context["field"] = "RequestCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["RequestCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RequestCode, context);
                },
                set: function(val) {
                    setterFunctions['RequestCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RequestReason": {
                get: function() {
                    context["field"] = "RequestReason";
                    context["metadata"] = (objectMetadata ? objectMetadata["RequestReason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RequestReason, context);
                },
                set: function(val) {
                    setterFunctions['RequestReason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Channel": {
                get: function() {
                    context["field"] = "Channel";
                    context["metadata"] = (objectMetadata ? objectMetadata["Channel"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Channel, context);
                },
                set: function(val) {
                    setterFunctions['Channel'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Address_id": {
                get: function() {
                    context["field"] = "Address_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Address_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Address_id, context);
                },
                set: function(val) {
                    setterFunctions['Address_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "communication_id": {
                get: function() {
                    context["field"] = "communication_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["communication_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.communication_id, context);
                },
                set: function(val) {
                    setterFunctions['communication_id'].call(this, val, privateState);
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
            "transactionCurrency": {
                get: function() {
                    context["field"] = "transactionCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionCurrency, context);
                },
                set: function(val) {
                    setterFunctions['transactionCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Currency": {
                get: function() {
                    context["field"] = "Currency";
                    context["metadata"] = (objectMetadata ? objectMetadata["Currency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Currency, context);
                },
                set: function(val) {
                    setterFunctions['Currency'].call(this, val, privateState);
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
            "currentBalance": {
                get: function() {
                    context["field"] = "currentBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentBalance, context);
                },
                set: function(val) {
                    setterFunctions['currentBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rewardsPoint": {
                get: function() {
                    context["field"] = "rewardsPoint";
                    context["metadata"] = (objectMetadata ? objectMetadata["rewardsPoint"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rewardsPoint, context);
                },
                set: function(val) {
                    setterFunctions['rewardsPoint'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentDueDate": {
                get: function() {
                    context["field"] = "paymentDueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentDueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentDueDate, context);
                },
                set: function(val) {
                    setterFunctions['paymentDueDate'].call(this, val, privateState);
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
            "isTypeBusiness": {
                get: function() {
                    context["field"] = "isTypeBusiness";
                    context["metadata"] = (objectMetadata ? objectMetadata["isTypeBusiness"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isTypeBusiness, context);
                },
                set: function(val) {
                    setterFunctions['isTypeBusiness'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isExpiring": {
                get: function() {
                    context["field"] = "isExpiring";
                    context["metadata"] = (objectMetadata ? objectMetadata["isExpiring"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isExpiring, context);
                },
                set: function(val) {
                    setterFunctions['isExpiring'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.Action = value ? (value["Action"] ? value["Action"] : null) : null;
            privateState.cardHolderName = value ? (value["cardHolderName"] ? value["cardHolderName"] : null) : null;
            privateState.cardId = value ? (value["cardId"] ? value["cardId"] : null) : null;
            privateState.cardNumber = value ? (value["cardNumber"] ? value["cardNumber"] : null) : null;
            privateState.cardStatus = value ? (value["cardStatus"] ? value["cardStatus"] : null) : null;
            privateState.cardType = value ? (value["cardType"] ? value["cardType"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.expiryDate = value ? (value["expiryDate"] ? value["expiryDate"] : null) : null;
            privateState.Reason = value ? (value["Reason"] ? value["Reason"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.creditLimit = value ? (value["creditLimit"] ? value["creditLimit"] : null) : null;
            privateState.availableCredit = value ? (value["availableCredit"] ? value["availableCredit"] : null) : null;
            privateState.serviceProvider = value ? (value["serviceProvider"] ? value["serviceProvider"] : null) : null;
            privateState.billingAddress = value ? (value["billingAddress"] ? value["billingAddress"] : null) : null;
            privateState.cardProductName = value ? (value["cardProductName"] ? value["cardProductName"] : null) : null;
            privateState.secondaryCardHolder = value ? (value["secondaryCardHolder"] ? value["secondaryCardHolder"] : null) : null;
            privateState.withdrawlLimit = value ? (value["withdrawlLimit"] ? value["withdrawlLimit"] : null) : null;
            privateState.withdrawalMinLimit = value ? (value["withdrawalMinLimit"] ? value["withdrawalMinLimit"] : null) : null;
            privateState.withdrawalMaxLimit = value ? (value["withdrawalMaxLimit"] ? value["withdrawalMaxLimit"] : null) : null;
            privateState.withdrawalStepLimit = value ? (value["withdrawalStepLimit"] ? value["withdrawalStepLimit"] : null) : null;
            privateState.purchaseLimit = value ? (value["purchaseLimit"] ? value["purchaseLimit"] : null) : null;
            privateState.purchaseMinLimit = value ? (value["purchaseMinLimit"] ? value["purchaseMinLimit"] : null) : null;
            privateState.purchaseMaxLimit = value ? (value["purchaseMaxLimit"] ? value["purchaseMaxLimit"] : null) : null;
            privateState.purchaseStepLimit = value ? (value["purchaseStepLimit"] ? value["purchaseStepLimit"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.maskedAccountNumber = value ? (value["maskedAccountNumber"] ? value["maskedAccountNumber"] : null) : null;
            privateState.maskedCardNumber = value ? (value["maskedCardNumber"] ? value["maskedCardNumber"] : null) : null;
            privateState.isInternational = value ? (value["isInternational"] ? value["isInternational"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.AccountType = value ? (value["AccountType"] ? value["AccountType"] : null) : null;
            privateState.RequestCode = value ? (value["RequestCode"] ? value["RequestCode"] : null) : null;
            privateState.RequestReason = value ? (value["RequestReason"] ? value["RequestReason"] : null) : null;
            privateState.Channel = value ? (value["Channel"] ? value["Channel"] : null) : null;
            privateState.Address_id = value ? (value["Address_id"] ? value["Address_id"] : null) : null;
            privateState.communication_id = value ? (value["communication_id"] ? value["communication_id"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.transactionCurrency = value ? (value["transactionCurrency"] ? value["transactionCurrency"] : null) : null;
            privateState.Currency = value ? (value["Currency"] ? value["Currency"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.currentBalance = value ? (value["currentBalance"] ? value["currentBalance"] : null) : null;
            privateState.rewardsPoint = value ? (value["rewardsPoint"] ? value["rewardsPoint"] : null) : null;
            privateState.paymentDueDate = value ? (value["paymentDueDate"] ? value["paymentDueDate"] : null) : null;
            privateState.availableBalance = value ? (value["availableBalance"] ? value["availableBalance"] : null) : null;
            privateState.isTypeBusiness = value ? (value["isTypeBusiness"] ? value["isTypeBusiness"] : null) : null;
            privateState.isExpiring = value ? (value["isExpiring"] ? value["isExpiring"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ListOfCards);

    //Create new class level validator object
    BaseModel.Validator.call(ListOfCards);

    var registerValidatorBackup = ListOfCards.registerValidator;

    ListOfCards.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ListOfCards.isValid(this, propName, val)) {
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
    //For Operation 'getActiveCards' with service id 'getActiveCards8542'
     ListOfCards.getActiveCards = function(params, onCompletion){
        return ListOfCards.customVerb('getActiveCards', params, onCompletion);
     };

    var relations = [];

    ListOfCards.relations = relations;

    ListOfCards.prototype.isValid = function() {
        return ListOfCards.isValid(this);
    };

    ListOfCards.prototype.objModelName = "ListOfCards";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ListOfCards.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CardManagementServices", "ListOfCards", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ListOfCards.clone = function(objectToClone) {
        var clonedObj = new ListOfCards();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ListOfCards;
});