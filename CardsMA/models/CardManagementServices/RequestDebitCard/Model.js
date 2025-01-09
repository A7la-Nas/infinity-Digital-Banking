/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "RequestDebitCard", "objectService" : "CardManagementServices"};

    var setterFunctions = {
        accountId: function(val, state) {
            context["field"] = "accountId";
            context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
            state['accountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardHolderName: function(val, state) {
            context["field"] = "cardHolderName";
            context["metadata"] = (objectMetadata ? objectMetadata["cardHolderName"] : null);
            state['cardHolderName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        creditLimit: function(val, state) {
            context["field"] = "creditLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
            state['creditLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        errorMessage: function(val, state) {
            context["field"] = "errorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
            state['errorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        successmsg: function(val, state) {
            context["field"] = "successmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
            state['successmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentBalance: function(val, state) {
            context["field"] = "currentBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
            state['currentBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableBalance: function(val, state) {
            context["field"] = "availableBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
            state['availableBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pinNumber: function(val, state) {
            context["field"] = "pinNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["pinNumber"] : null);
            state['pinNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditCardProtection: function(val, state) {
            context["field"] = "creditCardProtection";
            context["metadata"] = (objectMetadata ? objectMetadata["creditCardProtection"] : null);
            state['creditCardProtection'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function RequestDebitCard(defaultValues) {
        var privateState = {};
        context["field"] = "accountId";
        context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
        privateState.accountId = defaultValues ?
            (defaultValues["accountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountId"], context) :
                null) :
            null;

        context["field"] = "cardHolderName";
        context["metadata"] = (objectMetadata ? objectMetadata["cardHolderName"] : null);
        privateState.cardHolderName = defaultValues ?
            (defaultValues["cardHolderName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardHolderName"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
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

        context["field"] = "creditLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
        privateState.creditLimit = defaultValues ?
            (defaultValues["creditLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditLimit"], context) :
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

        context["field"] = "errorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
        privateState.errorMessage = defaultValues ?
            (defaultValues["errorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorMessage"], context) :
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

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "successmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
        privateState.successmsg = defaultValues ?
            (defaultValues["successmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["successmsg"], context) :
                null) :
            null;

        context["field"] = "currentBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
        privateState.currentBalance = defaultValues ?
            (defaultValues["currentBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentBalance"], context) :
                null) :
            null;

        context["field"] = "availableBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
        privateState.availableBalance = defaultValues ?
            (defaultValues["availableBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableBalance"], context) :
                null) :
            null;

        context["field"] = "pinNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["pinNumber"] : null);
        privateState.pinNumber = defaultValues ?
            (defaultValues["pinNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pinNumber"], context) :
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

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "creditCardProtection";
        context["metadata"] = (objectMetadata ? objectMetadata["creditCardProtection"] : null);
        privateState.creditCardProtection = defaultValues ?
            (defaultValues["creditCardProtection"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditCardProtection"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "accountId": {
                get: function() {
                    context["field"] = "accountId";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountId, context);
                },
                set: function(val) {
                    setterFunctions['accountId'].call(this, val, privateState);
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
            "errorMessage": {
                get: function() {
                    context["field"] = "errorMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorMessage, context);
                },
                set: function(val) {
                    setterFunctions['errorMessage'].call(this, val, privateState);
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
            "successmsg": {
                get: function() {
                    context["field"] = "successmsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.successmsg, context);
                },
                set: function(val) {
                    setterFunctions['successmsg'].call(this, val, privateState);
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
            "pinNumber": {
                get: function() {
                    context["field"] = "pinNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["pinNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pinNumber, context);
                },
                set: function(val) {
                    setterFunctions['pinNumber'].call(this, val, privateState);
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
            "creditCardProtection": {
                get: function() {
                    context["field"] = "creditCardProtection";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditCardProtection"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditCardProtection, context);
                },
                set: function(val) {
                    setterFunctions['creditCardProtection'].call(this, val, privateState);
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
            privateState.accountId = value ? (value["accountId"] ? value["accountId"] : null) : null;
            privateState.cardHolderName = value ? (value["cardHolderName"] ? value["cardHolderName"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.creditLimit = value ? (value["creditLimit"] ? value["creditLimit"] : null) : null;
            privateState.billingAddress = value ? (value["billingAddress"] ? value["billingAddress"] : null) : null;
            privateState.cardProductName = value ? (value["cardProductName"] ? value["cardProductName"] : null) : null;
            privateState.withdrawlLimit = value ? (value["withdrawlLimit"] ? value["withdrawlLimit"] : null) : null;
            privateState.withdrawalMinLimit = value ? (value["withdrawalMinLimit"] ? value["withdrawalMinLimit"] : null) : null;
            privateState.withdrawalMaxLimit = value ? (value["withdrawalMaxLimit"] ? value["withdrawalMaxLimit"] : null) : null;
            privateState.withdrawalStepLimit = value ? (value["withdrawalStepLimit"] ? value["withdrawalStepLimit"] : null) : null;
            privateState.purchaseLimit = value ? (value["purchaseLimit"] ? value["purchaseLimit"] : null) : null;
            privateState.purchaseMinLimit = value ? (value["purchaseMinLimit"] ? value["purchaseMinLimit"] : null) : null;
            privateState.purchaseMaxLimit = value ? (value["purchaseMaxLimit"] ? value["purchaseMaxLimit"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.AccountType = value ? (value["AccountType"] ? value["AccountType"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.successmsg = value ? (value["successmsg"] ? value["successmsg"] : null) : null;
            privateState.currentBalance = value ? (value["currentBalance"] ? value["currentBalance"] : null) : null;
            privateState.availableBalance = value ? (value["availableBalance"] ? value["availableBalance"] : null) : null;
            privateState.pinNumber = value ? (value["pinNumber"] ? value["pinNumber"] : null) : null;
            privateState.requestBody = value ? (value["requestBody"] ? value["requestBody"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.subtype = value ? (value["subtype"] ? value["subtype"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.creditCardProtection = value ? (value["creditCardProtection"] ? value["creditCardProtection"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(RequestDebitCard);

    //Create new class level validator object
    BaseModel.Validator.call(RequestDebitCard);

    var registerValidatorBackup = RequestDebitCard.registerValidator;

    RequestDebitCard.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(RequestDebitCard.isValid(this, propName, val)) {
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
    //For Operation 'createRequest' with service id 'createOrder2378'
     RequestDebitCard.createRequest = function(params, onCompletion){
        return RequestDebitCard.customVerb('createRequest', params, onCompletion);
     };

    var relations = [];

    RequestDebitCard.relations = relations;

    RequestDebitCard.prototype.isValid = function() {
        return RequestDebitCard.isValid(this);
    };

    RequestDebitCard.prototype.objModelName = "RequestDebitCard";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    RequestDebitCard.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CardManagementServices", "RequestDebitCard", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    RequestDebitCard.clone = function(objectToClone) {
        var clonedObj = new RequestDebitCard();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return RequestDebitCard;
});