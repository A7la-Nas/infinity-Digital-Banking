/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ChangePIN", "objectService" : "CardManagementServices"};

    var setterFunctions = {
        accountId: function(val, state) {
            context["field"] = "accountId";
            context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
            state['accountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Action: function(val, state) {
            context["field"] = "Action";
            context["metadata"] = (objectMetadata ? objectMetadata["Action"] : null);
            state['Action'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardId: function(val, state) {
            context["field"] = "cardId";
            context["metadata"] = (objectMetadata ? objectMetadata["cardId"] : null);
            state['cardId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        withdrawlLimit: function(val, state) {
            context["field"] = "withdrawlLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["withdrawlLimit"] : null);
            state['withdrawlLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        purchaseLimit: function(val, state) {
            context["field"] = "purchaseLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["purchaseLimit"] : null);
            state['purchaseLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        newPin: function(val, state) {
            context["field"] = "newPin";
            context["metadata"] = (objectMetadata ? objectMetadata["newPin"] : null);
            state['newPin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cvv: function(val, state) {
            context["field"] = "cvv";
            context["metadata"] = (objectMetadata ? objectMetadata["cvv"] : null);
            state['cvv'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        oldcvv: function(val, state) {
            context["field"] = "oldcvv";
            context["metadata"] = (objectMetadata ? objectMetadata["oldcvv"] : null);
            state['oldcvv'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        successmsg: function(val, state) {
            context["field"] = "successmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
            state['successmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    };

    //Create the Model Class
    function ChangePIN(defaultValues) {
        var privateState = {};
        context["field"] = "accountId";
        context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
        privateState.accountId = defaultValues ?
            (defaultValues["accountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountId"], context) :
                null) :
            null;

        context["field"] = "Action";
        context["metadata"] = (objectMetadata ? objectMetadata["Action"] : null);
        privateState.Action = defaultValues ?
            (defaultValues["Action"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Action"], context) :
                null) :
            null;

        context["field"] = "cardId";
        context["metadata"] = (objectMetadata ? objectMetadata["cardId"] : null);
        privateState.cardId = defaultValues ?
            (defaultValues["cardId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardId"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
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

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "withdrawlLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["withdrawlLimit"] : null);
        privateState.withdrawlLimit = defaultValues ?
            (defaultValues["withdrawlLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["withdrawlLimit"], context) :
                null) :
            null;

        context["field"] = "purchaseLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["purchaseLimit"] : null);
        privateState.purchaseLimit = defaultValues ?
            (defaultValues["purchaseLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["purchaseLimit"], context) :
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

        context["field"] = "newPin";
        context["metadata"] = (objectMetadata ? objectMetadata["newPin"] : null);
        privateState.newPin = defaultValues ?
            (defaultValues["newPin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["newPin"], context) :
                null) :
            null;

        context["field"] = "cvv";
        context["metadata"] = (objectMetadata ? objectMetadata["cvv"] : null);
        privateState.cvv = defaultValues ?
            (defaultValues["cvv"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cvv"], context) :
                null) :
            null;

        context["field"] = "oldcvv";
        context["metadata"] = (objectMetadata ? objectMetadata["oldcvv"] : null);
        privateState.oldcvv = defaultValues ?
            (defaultValues["oldcvv"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["oldcvv"], context) :
                null) :
            null;

        context["field"] = "successmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
        privateState.successmsg = defaultValues ?
            (defaultValues["successmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["successmsg"], context) :
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
            "newPin": {
                get: function() {
                    context["field"] = "newPin";
                    context["metadata"] = (objectMetadata ? objectMetadata["newPin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.newPin, context);
                },
                set: function(val) {
                    setterFunctions['newPin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cvv": {
                get: function() {
                    context["field"] = "cvv";
                    context["metadata"] = (objectMetadata ? objectMetadata["cvv"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cvv, context);
                },
                set: function(val) {
                    setterFunctions['cvv'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "oldcvv": {
                get: function() {
                    context["field"] = "oldcvv";
                    context["metadata"] = (objectMetadata ? objectMetadata["oldcvv"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.oldcvv, context);
                },
                set: function(val) {
                    setterFunctions['oldcvv'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.accountId = value ? (value["accountId"] ? value["accountId"] : null) : null;
            privateState.Action = value ? (value["Action"] ? value["Action"] : null) : null;
            privateState.cardId = value ? (value["cardId"] ? value["cardId"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.Reason = value ? (value["Reason"] ? value["Reason"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.withdrawlLimit = value ? (value["withdrawlLimit"] ? value["withdrawlLimit"] : null) : null;
            privateState.purchaseLimit = value ? (value["purchaseLimit"] ? value["purchaseLimit"] : null) : null;
            privateState.AccountType = value ? (value["AccountType"] ? value["AccountType"] : null) : null;
            privateState.RequestCode = value ? (value["RequestCode"] ? value["RequestCode"] : null) : null;
            privateState.RequestReason = value ? (value["RequestReason"] ? value["RequestReason"] : null) : null;
            privateState.Channel = value ? (value["Channel"] ? value["Channel"] : null) : null;
            privateState.Address_id = value ? (value["Address_id"] ? value["Address_id"] : null) : null;
            privateState.communication_id = value ? (value["communication_id"] ? value["communication_id"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.newPin = value ? (value["newPin"] ? value["newPin"] : null) : null;
            privateState.cvv = value ? (value["cvv"] ? value["cvv"] : null) : null;
            privateState.oldcvv = value ? (value["oldcvv"] ? value["oldcvv"] : null) : null;
            privateState.successmsg = value ? (value["successmsg"] ? value["successmsg"] : null) : null;
            privateState.pinNumber = value ? (value["pinNumber"] ? value["pinNumber"] : null) : null;
            privateState.requestBody = value ? (value["requestBody"] ? value["requestBody"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.subtype = value ? (value["subtype"] ? value["subtype"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ChangePIN);

    //Create new class level validator object
    BaseModel.Validator.call(ChangePIN);

    var registerValidatorBackup = ChangePIN.registerValidator;

    ChangePIN.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ChangePIN.isValid(this, propName, val)) {
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
    //For Operation 'createRequest' with service id 'createOrder8163'
     ChangePIN.createRequest = function(params, onCompletion){
        return ChangePIN.customVerb('createRequest', params, onCompletion);
     };

    //For Operation 'updateCreditCardPin' with service id 'createCardRequest1362'
     ChangePIN.updateCreditCardPin = function(params, onCompletion){
        return ChangePIN.customVerb('updateCreditCardPin', params, onCompletion);
     };

    var relations = [];

    ChangePIN.relations = relations;

    ChangePIN.prototype.isValid = function() {
        return ChangePIN.isValid(this);
    };

    ChangePIN.prototype.objModelName = "ChangePIN";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ChangePIN.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CardManagementServices", "ChangePIN", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ChangePIN.clone = function(objectToClone) {
        var clonedObj = new ChangePIN();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ChangePIN;
});