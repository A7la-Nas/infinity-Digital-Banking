/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "TravelNotifications", "objectService" : "CardManagementServices"};

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
        Destinations: function(val, state) {
            context["field"] = "Destinations";
            context["metadata"] = (objectMetadata ? objectMetadata["Destinations"] : null);
            state['Destinations'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Cards: function(val, state) {
            context["field"] = "Cards";
            context["metadata"] = (objectMetadata ? objectMetadata["Cards"] : null);
            state['Cards'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Channel_id: function(val, state) {
            context["field"] = "Channel_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Channel_id"] : null);
            state['Channel_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        StartDate: function(val, state) {
            context["field"] = "StartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["StartDate"] : null);
            state['StartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EndDate: function(val, state) {
            context["field"] = "EndDate";
            context["metadata"] = (objectMetadata ? objectMetadata["EndDate"] : null);
            state['EndDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        additionNotes: function(val, state) {
            context["field"] = "additionNotes";
            context["metadata"] = (objectMetadata ? objectMetadata["additionNotes"] : null);
            state['additionNotes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phonenumber: function(val, state) {
            context["field"] = "phonenumber";
            context["metadata"] = (objectMetadata ? objectMetadata["phonenumber"] : null);
            state['phonenumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        request_id: function(val, state) {
            context["field"] = "request_id";
            context["metadata"] = (objectMetadata ? objectMetadata["request_id"] : null);
            state['request_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        successmsg: function(val, state) {
            context["field"] = "successmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
            state['successmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function TravelNotifications(defaultValues) {
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

        context["field"] = "Destinations";
        context["metadata"] = (objectMetadata ? objectMetadata["Destinations"] : null);
        privateState.Destinations = defaultValues ?
            (defaultValues["Destinations"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Destinations"], context) :
                null) :
            null;

        context["field"] = "Cards";
        context["metadata"] = (objectMetadata ? objectMetadata["Cards"] : null);
        privateState.Cards = defaultValues ?
            (defaultValues["Cards"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Cards"], context) :
                null) :
            null;

        context["field"] = "Channel_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Channel_id"] : null);
        privateState.Channel_id = defaultValues ?
            (defaultValues["Channel_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Channel_id"], context) :
                null) :
            null;

        context["field"] = "StartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["StartDate"] : null);
        privateState.StartDate = defaultValues ?
            (defaultValues["StartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["StartDate"], context) :
                null) :
            null;

        context["field"] = "EndDate";
        context["metadata"] = (objectMetadata ? objectMetadata["EndDate"] : null);
        privateState.EndDate = defaultValues ?
            (defaultValues["EndDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EndDate"], context) :
                null) :
            null;

        context["field"] = "additionNotes";
        context["metadata"] = (objectMetadata ? objectMetadata["additionNotes"] : null);
        privateState.additionNotes = defaultValues ?
            (defaultValues["additionNotes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["additionNotes"], context) :
                null) :
            null;

        context["field"] = "phonenumber";
        context["metadata"] = (objectMetadata ? objectMetadata["phonenumber"] : null);
        privateState.phonenumber = defaultValues ?
            (defaultValues["phonenumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phonenumber"], context) :
                null) :
            null;

        context["field"] = "request_id";
        context["metadata"] = (objectMetadata ? objectMetadata["request_id"] : null);
        privateState.request_id = defaultValues ?
            (defaultValues["request_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["request_id"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
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

        context["field"] = "successmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
        privateState.successmsg = defaultValues ?
            (defaultValues["successmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["successmsg"], context) :
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
            "Destinations": {
                get: function() {
                    context["field"] = "Destinations";
                    context["metadata"] = (objectMetadata ? objectMetadata["Destinations"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Destinations, context);
                },
                set: function(val) {
                    setterFunctions['Destinations'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Cards": {
                get: function() {
                    context["field"] = "Cards";
                    context["metadata"] = (objectMetadata ? objectMetadata["Cards"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Cards, context);
                },
                set: function(val) {
                    setterFunctions['Cards'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Channel_id": {
                get: function() {
                    context["field"] = "Channel_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Channel_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Channel_id, context);
                },
                set: function(val) {
                    setterFunctions['Channel_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "StartDate": {
                get: function() {
                    context["field"] = "StartDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["StartDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.StartDate, context);
                },
                set: function(val) {
                    setterFunctions['StartDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "EndDate": {
                get: function() {
                    context["field"] = "EndDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["EndDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.EndDate, context);
                },
                set: function(val) {
                    setterFunctions['EndDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "additionNotes": {
                get: function() {
                    context["field"] = "additionNotes";
                    context["metadata"] = (objectMetadata ? objectMetadata["additionNotes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.additionNotes, context);
                },
                set: function(val) {
                    setterFunctions['additionNotes'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "phonenumber": {
                get: function() {
                    context["field"] = "phonenumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["phonenumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.phonenumber, context);
                },
                set: function(val) {
                    setterFunctions['phonenumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "request_id": {
                get: function() {
                    context["field"] = "request_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["request_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.request_id, context);
                },
                set: function(val) {
                    setterFunctions['request_id'].call(this, val, privateState);
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
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.maskedAccountNumber = value ? (value["maskedAccountNumber"] ? value["maskedAccountNumber"] : null) : null;
            privateState.maskedCardNumber = value ? (value["maskedCardNumber"] ? value["maskedCardNumber"] : null) : null;
            privateState.isInternational = value ? (value["isInternational"] ? value["isInternational"] : null) : null;
            privateState.Destinations = value ? (value["Destinations"] ? value["Destinations"] : null) : null;
            privateState.Cards = value ? (value["Cards"] ? value["Cards"] : null) : null;
            privateState.Channel_id = value ? (value["Channel_id"] ? value["Channel_id"] : null) : null;
            privateState.StartDate = value ? (value["StartDate"] ? value["StartDate"] : null) : null;
            privateState.EndDate = value ? (value["EndDate"] ? value["EndDate"] : null) : null;
            privateState.additionNotes = value ? (value["additionNotes"] ? value["additionNotes"] : null) : null;
            privateState.phonenumber = value ? (value["phonenumber"] ? value["phonenumber"] : null) : null;
            privateState.request_id = value ? (value["request_id"] ? value["request_id"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.successmsg = value ? (value["successmsg"] ? value["successmsg"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(TravelNotifications);

    //Create new class level validator object
    BaseModel.Validator.call(TravelNotifications);

    var registerValidatorBackup = TravelNotifications.registerValidator;

    TravelNotifications.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(TravelNotifications.isValid(this, propName, val)) {
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
    //For Operation 'updatePlan' with service id 'updateTravelNotification4123'
     TravelNotifications.updatePlan = function(params, onCompletion){
        return TravelNotifications.customVerb('updatePlan', params, onCompletion);
     };

    //For Operation 'getPlan' with service id 'getTravelNotification2919'
     TravelNotifications.getPlan = function(params, onCompletion){
        return TravelNotifications.customVerb('getPlan', params, onCompletion);
     };

    //For Operation 'getStatus' with service id 'getTravelNotificationStatus8935'
     TravelNotifications.getStatus = function(params, onCompletion){
        return TravelNotifications.customVerb('getStatus', params, onCompletion);
     };

    //For Operation 'createPlan' with service id 'createTravelNotification6410'
     TravelNotifications.createPlan = function(params, onCompletion){
        return TravelNotifications.customVerb('createPlan', params, onCompletion);
     };

    //For Operation 'deletePlan' with service id 'deleteTravelNotification6950'
     TravelNotifications.deletePlan = function(params, onCompletion){
        return TravelNotifications.customVerb('deletePlan', params, onCompletion);
     };

    var relations = [];

    TravelNotifications.relations = relations;

    TravelNotifications.prototype.isValid = function() {
        return TravelNotifications.isValid(this);
    };

    TravelNotifications.prototype.objModelName = "TravelNotifications";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    TravelNotifications.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CardManagementServices", "TravelNotifications", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    TravelNotifications.clone = function(objectToClone) {
        var clonedObj = new TravelNotifications();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return TravelNotifications;
});