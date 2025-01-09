/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "TemplatePaymentOrder", "objectService" : "BulkPaymentObjects"};

    var setterFunctions = {
        paymentOrderId: function(val, state) {
            context["field"] = "paymentOrderId";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderId"] : null);
            state['paymentOrderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        templateId: function(val, state) {
            context["field"] = "templateId";
            context["metadata"] = (objectMetadata ? objectMetadata["templateId"] : null);
            state['templateId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientName: function(val, state) {
            context["field"] = "recipientName";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientName"] : null);
            state['recipientName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        confirmationNumber: function(val, state) {
            context["field"] = "confirmationNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
            state['confirmationNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureActionId: function(val, state) {
            context["field"] = "featureActionId";
            context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
            state['featureActionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swift: function(val, state) {
            context["field"] = "swift";
            context["metadata"] = (objectMetadata ? objectMetadata["swift"] : null);
            state['swift'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        feesPaidBy: function(val, state) {
            context["field"] = "feesPaidBy";
            context["metadata"] = (objectMetadata ? objectMetadata["feesPaidBy"] : null);
            state['feesPaidBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentReference: function(val, state) {
            context["field"] = "paymentReference";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentReference"] : null);
            state['paymentReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitAccountIBAN: function(val, state) {
            context["field"] = "debitAccountIBAN";
            context["metadata"] = (objectMetadata ? objectMetadata["debitAccountIBAN"] : null);
            state['debitAccountIBAN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryIBAN: function(val, state) {
            context["field"] = "beneficiaryIBAN";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryIBAN"] : null);
            state['beneficiaryIBAN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyId: function(val, state) {
            context["field"] = "companyId";
            context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
            state['companyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        roleId: function(val, state) {
            context["field"] = "roleId";
            context["metadata"] = (objectMetadata ? objectMetadata["roleId"] : null);
            state['roleId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryNickName: function(val, state) {
            context["field"] = "beneficiaryNickName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryNickName"] : null);
            state['beneficiaryNickName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryAddress: function(val, state) {
            context["field"] = "beneficiaryAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddress"] : null);
            state['beneficiaryAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customer: function(val, state) {
            context["field"] = "customer";
            context["metadata"] = (objectMetadata ? objectMetadata["customer"] : null);
            state['customer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountWithBankBIC: function(val, state) {
            context["field"] = "accountWithBankBIC";
            context["metadata"] = (objectMetadata ? objectMetadata["accountWithBankBIC"] : null);
            state['accountWithBankBIC'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentMethod: function(val, state) {
            context["field"] = "paymentMethod";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentMethod"] : null);
            state['paymentMethod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accType: function(val, state) {
            context["field"] = "accType";
            context["metadata"] = (objectMetadata ? objectMetadata["accType"] : null);
            state['accType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        opstatus: function(val, state) {
            context["field"] = "opstatus";
            context["metadata"] = (objectMetadata ? objectMetadata["opstatus"] : null);
            state['opstatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        httpStatusCode: function(val, state) {
            context["field"] = "httpStatusCode";
            context["metadata"] = (objectMetadata ? objectMetadata["httpStatusCode"] : null);
            state['httpStatusCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryType: function(val, state) {
            context["field"] = "beneficiaryType";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryType"] : null);
            state['beneficiaryType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        addToExistingFlag: function(val, state) {
            context["field"] = "addToExistingFlag";
            context["metadata"] = (objectMetadata ? objectMetadata["addToExistingFlag"] : null);
            state['addToExistingFlag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function TemplatePaymentOrder(defaultValues) {
        var privateState = {};
        context["field"] = "paymentOrderId";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderId"] : null);
        privateState.paymentOrderId = defaultValues ?
            (defaultValues["paymentOrderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentOrderId"], context) :
                null) :
            null;

        context["field"] = "templateId";
        context["metadata"] = (objectMetadata ? objectMetadata["templateId"] : null);
        privateState.templateId = defaultValues ?
            (defaultValues["templateId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["templateId"], context) :
                null) :
            null;

        context["field"] = "recipientName";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientName"] : null);
        privateState.recipientName = defaultValues ?
            (defaultValues["recipientName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientName"], context) :
                null) :
            null;

        context["field"] = "confirmationNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
        privateState.confirmationNumber = defaultValues ?
            (defaultValues["confirmationNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["confirmationNumber"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "featureActionId";
        context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
        privateState.featureActionId = defaultValues ?
            (defaultValues["featureActionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureActionId"], context) :
                null) :
            null;

        context["field"] = "swift";
        context["metadata"] = (objectMetadata ? objectMetadata["swift"] : null);
        privateState.swift = defaultValues ?
            (defaultValues["swift"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swift"], context) :
                null) :
            null;

        context["field"] = "feesPaidBy";
        context["metadata"] = (objectMetadata ? objectMetadata["feesPaidBy"] : null);
        privateState.feesPaidBy = defaultValues ?
            (defaultValues["feesPaidBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["feesPaidBy"], context) :
                null) :
            null;

        context["field"] = "paymentReference";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentReference"] : null);
        privateState.paymentReference = defaultValues ?
            (defaultValues["paymentReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentReference"], context) :
                null) :
            null;

        context["field"] = "debitAccountIBAN";
        context["metadata"] = (objectMetadata ? objectMetadata["debitAccountIBAN"] : null);
        privateState.debitAccountIBAN = defaultValues ?
            (defaultValues["debitAccountIBAN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitAccountIBAN"], context) :
                null) :
            null;

        context["field"] = "beneficiaryIBAN";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryIBAN"] : null);
        privateState.beneficiaryIBAN = defaultValues ?
            (defaultValues["beneficiaryIBAN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryIBAN"], context) :
                null) :
            null;

        context["field"] = "companyId";
        context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
        privateState.companyId = defaultValues ?
            (defaultValues["companyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyId"], context) :
                null) :
            null;

        context["field"] = "roleId";
        context["metadata"] = (objectMetadata ? objectMetadata["roleId"] : null);
        privateState.roleId = defaultValues ?
            (defaultValues["roleId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["roleId"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
                null) :
            null;

        context["field"] = "beneficiaryNickName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryNickName"] : null);
        privateState.beneficiaryNickName = defaultValues ?
            (defaultValues["beneficiaryNickName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryNickName"], context) :
                null) :
            null;

        context["field"] = "beneficiaryAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddress"] : null);
        privateState.beneficiaryAddress = defaultValues ?
            (defaultValues["beneficiaryAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryAddress"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "customer";
        context["metadata"] = (objectMetadata ? objectMetadata["customer"] : null);
        privateState.customer = defaultValues ?
            (defaultValues["customer"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customer"], context) :
                null) :
            null;

        context["field"] = "accountWithBankBIC";
        context["metadata"] = (objectMetadata ? objectMetadata["accountWithBankBIC"] : null);
        privateState.accountWithBankBIC = defaultValues ?
            (defaultValues["accountWithBankBIC"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountWithBankBIC"], context) :
                null) :
            null;

        context["field"] = "paymentMethod";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentMethod"] : null);
        privateState.paymentMethod = defaultValues ?
            (defaultValues["paymentMethod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentMethod"], context) :
                null) :
            null;

        context["field"] = "accType";
        context["metadata"] = (objectMetadata ? objectMetadata["accType"] : null);
        privateState.accType = defaultValues ?
            (defaultValues["accType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accType"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "opstatus";
        context["metadata"] = (objectMetadata ? objectMetadata["opstatus"] : null);
        privateState.opstatus = defaultValues ?
            (defaultValues["opstatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["opstatus"], context) :
                null) :
            null;

        context["field"] = "httpStatusCode";
        context["metadata"] = (objectMetadata ? objectMetadata["httpStatusCode"] : null);
        privateState.httpStatusCode = defaultValues ?
            (defaultValues["httpStatusCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["httpStatusCode"], context) :
                null) :
            null;

        context["field"] = "beneficiaryType";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryType"] : null);
        privateState.beneficiaryType = defaultValues ?
            (defaultValues["beneficiaryType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryType"], context) :
                null) :
            null;

        context["field"] = "addToExistingFlag";
        context["metadata"] = (objectMetadata ? objectMetadata["addToExistingFlag"] : null);
        privateState.addToExistingFlag = defaultValues ?
            (defaultValues["addToExistingFlag"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addToExistingFlag"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "paymentOrderId": {
                get: function() {
                    context["field"] = "paymentOrderId";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentOrderId, context);
                },
                set: function(val) {
                    setterFunctions['paymentOrderId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "templateId": {
                get: function() {
                    context["field"] = "templateId";
                    context["metadata"] = (objectMetadata ? objectMetadata["templateId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.templateId, context);
                },
                set: function(val) {
                    setterFunctions['templateId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientName": {
                get: function() {
                    context["field"] = "recipientName";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientName, context);
                },
                set: function(val) {
                    setterFunctions['recipientName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "confirmationNumber": {
                get: function() {
                    context["field"] = "confirmationNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.confirmationNumber, context);
                },
                set: function(val) {
                    setterFunctions['confirmationNumber'].call(this, val, privateState);
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
            "featureActionId": {
                get: function() {
                    context["field"] = "featureActionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureActionId, context);
                },
                set: function(val) {
                    setterFunctions['featureActionId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "swift": {
                get: function() {
                    context["field"] = "swift";
                    context["metadata"] = (objectMetadata ? objectMetadata["swift"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swift, context);
                },
                set: function(val) {
                    setterFunctions['swift'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "feesPaidBy": {
                get: function() {
                    context["field"] = "feesPaidBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["feesPaidBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.feesPaidBy, context);
                },
                set: function(val) {
                    setterFunctions['feesPaidBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentReference": {
                get: function() {
                    context["field"] = "paymentReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentReference, context);
                },
                set: function(val) {
                    setterFunctions['paymentReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "debitAccountIBAN": {
                get: function() {
                    context["field"] = "debitAccountIBAN";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitAccountIBAN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitAccountIBAN, context);
                },
                set: function(val) {
                    setterFunctions['debitAccountIBAN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryIBAN": {
                get: function() {
                    context["field"] = "beneficiaryIBAN";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryIBAN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryIBAN, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryIBAN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companyId": {
                get: function() {
                    context["field"] = "companyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companyId, context);
                },
                set: function(val) {
                    setterFunctions['companyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "roleId": {
                get: function() {
                    context["field"] = "roleId";
                    context["metadata"] = (objectMetadata ? objectMetadata["roleId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.roleId, context);
                },
                set: function(val) {
                    setterFunctions['roleId'].call(this, val, privateState);
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
            "amount": {
                get: function() {
                    context["field"] = "amount";
                    context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amount, context);
                },
                set: function(val) {
                    setterFunctions['amount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryName": {
                get: function() {
                    context["field"] = "beneficiaryName";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryName, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryNickName": {
                get: function() {
                    context["field"] = "beneficiaryNickName";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryNickName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryNickName, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryNickName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryAddress": {
                get: function() {
                    context["field"] = "beneficiaryAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryAddress, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryAddress'].call(this, val, privateState);
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
            "customer": {
                get: function() {
                    context["field"] = "customer";
                    context["metadata"] = (objectMetadata ? objectMetadata["customer"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customer, context);
                },
                set: function(val) {
                    setterFunctions['customer'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountWithBankBIC": {
                get: function() {
                    context["field"] = "accountWithBankBIC";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountWithBankBIC"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountWithBankBIC, context);
                },
                set: function(val) {
                    setterFunctions['accountWithBankBIC'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentMethod": {
                get: function() {
                    context["field"] = "paymentMethod";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentMethod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentMethod, context);
                },
                set: function(val) {
                    setterFunctions['paymentMethod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accType": {
                get: function() {
                    context["field"] = "accType";
                    context["metadata"] = (objectMetadata ? objectMetadata["accType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accType, context);
                },
                set: function(val) {
                    setterFunctions['accType'].call(this, val, privateState);
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
            "opstatus": {
                get: function() {
                    context["field"] = "opstatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["opstatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.opstatus, context);
                },
                set: function(val) {
                    setterFunctions['opstatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "httpStatusCode": {
                get: function() {
                    context["field"] = "httpStatusCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["httpStatusCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.httpStatusCode, context);
                },
                set: function(val) {
                    setterFunctions['httpStatusCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryType": {
                get: function() {
                    context["field"] = "beneficiaryType";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryType, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "addToExistingFlag": {
                get: function() {
                    context["field"] = "addToExistingFlag";
                    context["metadata"] = (objectMetadata ? objectMetadata["addToExistingFlag"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addToExistingFlag, context);
                },
                set: function(val) {
                    setterFunctions['addToExistingFlag'].call(this, val, privateState);
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
            privateState.paymentOrderId = value ? (value["paymentOrderId"] ? value["paymentOrderId"] : null) : null;
            privateState.templateId = value ? (value["templateId"] ? value["templateId"] : null) : null;
            privateState.recipientName = value ? (value["recipientName"] ? value["recipientName"] : null) : null;
            privateState.confirmationNumber = value ? (value["confirmationNumber"] ? value["confirmationNumber"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.featureActionId = value ? (value["featureActionId"] ? value["featureActionId"] : null) : null;
            privateState.swift = value ? (value["swift"] ? value["swift"] : null) : null;
            privateState.feesPaidBy = value ? (value["feesPaidBy"] ? value["feesPaidBy"] : null) : null;
            privateState.paymentReference = value ? (value["paymentReference"] ? value["paymentReference"] : null) : null;
            privateState.debitAccountIBAN = value ? (value["debitAccountIBAN"] ? value["debitAccountIBAN"] : null) : null;
            privateState.beneficiaryIBAN = value ? (value["beneficiaryIBAN"] ? value["beneficiaryIBAN"] : null) : null;
            privateState.companyId = value ? (value["companyId"] ? value["companyId"] : null) : null;
            privateState.roleId = value ? (value["roleId"] ? value["roleId"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.beneficiaryNickName = value ? (value["beneficiaryNickName"] ? value["beneficiaryNickName"] : null) : null;
            privateState.beneficiaryAddress = value ? (value["beneficiaryAddress"] ? value["beneficiaryAddress"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.customer = value ? (value["customer"] ? value["customer"] : null) : null;
            privateState.accountWithBankBIC = value ? (value["accountWithBankBIC"] ? value["accountWithBankBIC"] : null) : null;
            privateState.paymentMethod = value ? (value["paymentMethod"] ? value["paymentMethod"] : null) : null;
            privateState.accType = value ? (value["accType"] ? value["accType"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.beneficiaryType = value ? (value["beneficiaryType"] ? value["beneficiaryType"] : null) : null;
            privateState.addToExistingFlag = value ? (value["addToExistingFlag"] ? value["addToExistingFlag"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(TemplatePaymentOrder);

    //Create new class level validator object
    BaseModel.Validator.call(TemplatePaymentOrder);

    var registerValidatorBackup = TemplatePaymentOrder.registerValidator;

    TemplatePaymentOrder.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(TemplatePaymentOrder.isValid(this, propName, val)) {
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
    //For Operation 'fetchBulkPaymentTemplatePOsById' with service id 'fetchBulkPaymentTemplatePOById6367'
     TemplatePaymentOrder.fetchBulkPaymentTemplatePOsById = function(params, onCompletion){
        return TemplatePaymentOrder.customVerb('fetchBulkPaymentTemplatePOsById', params, onCompletion);
     };

    var relations = [];

    TemplatePaymentOrder.relations = relations;

    TemplatePaymentOrder.prototype.isValid = function() {
        return TemplatePaymentOrder.isValid(this);
    };

    TemplatePaymentOrder.prototype.objModelName = "TemplatePaymentOrder";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    TemplatePaymentOrder.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BulkPaymentObjects", "TemplatePaymentOrder", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    TemplatePaymentOrder.clone = function(objectToClone) {
        var clonedObj = new TemplatePaymentOrder();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return TemplatePaymentOrder;
});