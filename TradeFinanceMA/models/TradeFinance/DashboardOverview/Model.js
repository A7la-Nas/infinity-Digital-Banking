/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "DashboardOverview", "objectService" : "TradeFinance"};

    var setterFunctions = {
        currencies: function(val, state) {
            context["field"] = "currencies";
            context["metadata"] = (objectMetadata ? objectMetadata["currencies"] : null);
            state['currencies'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        quickLink: function(val, state) {
            context["field"] = "quickLink";
            context["metadata"] = (objectMetadata ? objectMetadata["quickLink"] : null);
            state['quickLink'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        needAttention: function(val, state) {
            context["field"] = "needAttention";
            context["metadata"] = (objectMetadata ? objectMetadata["needAttention"] : null);
            state['needAttention'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        product: function(val, state) {
            context["field"] = "product";
            context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
            state['product'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        baseReferenceId: function(val, state) {
            context["field"] = "baseReferenceId";
            context["metadata"] = (objectMetadata ? objectMetadata["baseReferenceId"] : null);
            state['baseReferenceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customConfig: function(val, state) {
            context["field"] = "customConfig";
            context["metadata"] = (objectMetadata ? objectMetadata["customConfig"] : null);
            state['customConfig'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionReference: function(val, state) {
            context["field"] = "transactionReference";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
            state['transactionReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        account: function(val, state) {
            context["field"] = "account";
            context["metadata"] = (objectMetadata ? objectMetadata["account"] : null);
            state['account'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountCurrency: function(val, state) {
            context["field"] = "accountCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["accountCurrency"] : null);
            state['accountCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        balanceWithCurrency: function(val, state) {
            context["field"] = "balanceWithCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["balanceWithCurrency"] : null);
            state['balanceWithCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimsSRMSId: function(val, state) {
            context["field"] = "claimsSRMSId";
            context["metadata"] = (objectMetadata ? objectMetadata["claimsSRMSId"] : null);
            state['claimsSRMSId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        collectionReference: function(val, state) {
            context["field"] = "collectionReference";
            context["metadata"] = (objectMetadata ? objectMetadata["collectionReference"] : null);
            state['collectionReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        collectionSrmsId: function(val, state) {
            context["field"] = "collectionSrmsId";
            context["metadata"] = (objectMetadata ? objectMetadata["collectionSrmsId"] : null);
            state['collectionSrmsId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exportLCId: function(val, state) {
            context["field"] = "exportLCId";
            context["metadata"] = (objectMetadata ? objectMetadata["exportLCId"] : null);
            state['exportLCId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exportlcSRMSRequestId: function(val, state) {
            context["field"] = "exportlcSRMSRequestId";
            context["metadata"] = (objectMetadata ? objectMetadata["exportlcSRMSRequestId"] : null);
            state['exportlcSRMSRequestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        guaranteeSrmsId: function(val, state) {
            context["field"] = "guaranteeSrmsId";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteeSrmsId"] : null);
            state['guaranteeSrmsId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        guaranteesSRMSId: function(val, state) {
            context["field"] = "guaranteesSRMSId";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteesSRMSId"] : null);
            state['guaranteesSRMSId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcSrmsReqOrderID: function(val, state) {
            context["field"] = "lcSrmsReqOrderID";
            context["metadata"] = (objectMetadata ? objectMetadata["lcSrmsReqOrderID"] : null);
            state['lcSrmsReqOrderID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        srmsReqOrderID: function(val, state) {
            context["field"] = "srmsReqOrderID";
            context["metadata"] = (objectMetadata ? objectMetadata["srmsReqOrderID"] : null);
            state['srmsReqOrderID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditAccount: function(val, state) {
            context["field"] = "creditAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["creditAccount"] : null);
            state['creditAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitAccount: function(val, state) {
            context["field"] = "debitAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["debitAccount"] : null);
            state['debitAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tradeCurrency: function(val, state) {
            context["field"] = "tradeCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["tradeCurrency"] : null);
            state['tradeCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableBalance: function(val, state) {
            context["field"] = "availableBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
            state['availableBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        date: function(val, state) {
            context["field"] = "date";
            context["metadata"] = (objectMetadata ? objectMetadata["date"] : null);
            state['date'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryDate: function(val, state) {
            context["field"] = "expiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
            state['expiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        dbpErrorCode: function(val, state) {
            context["field"] = "dbpErrorCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrorCode"] : null);
            state['dbpErrorCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrorMessage: function(val, state) {
            context["field"] = "dbpErrorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrorMessage"] : null);
            state['dbpErrorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitId: function(val, state) {
            context["field"] = "limitId";
            context["metadata"] = (objectMetadata ? objectMetadata["limitId"] : null);
            state['limitId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitCurrency: function(val, state) {
            context["field"] = "limitCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["limitCurrency"] : null);
            state['limitCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableLimit: function(val, state) {
            context["field"] = "availableLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["availableLimit"] : null);
            state['availableLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        utilizedLimit: function(val, state) {
            context["field"] = "utilizedLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["utilizedLimit"] : null);
            state['utilizedLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function DashboardOverview(defaultValues) {
        var privateState = {};
        context["field"] = "currencies";
        context["metadata"] = (objectMetadata ? objectMetadata["currencies"] : null);
        privateState.currencies = defaultValues ?
            (defaultValues["currencies"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencies"], context) :
                null) :
            null;

        context["field"] = "quickLink";
        context["metadata"] = (objectMetadata ? objectMetadata["quickLink"] : null);
        privateState.quickLink = defaultValues ?
            (defaultValues["quickLink"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["quickLink"], context) :
                null) :
            null;

        context["field"] = "needAttention";
        context["metadata"] = (objectMetadata ? objectMetadata["needAttention"] : null);
        privateState.needAttention = defaultValues ?
            (defaultValues["needAttention"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["needAttention"], context) :
                null) :
            null;

        context["field"] = "product";
        context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
        privateState.product = defaultValues ?
            (defaultValues["product"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["product"], context) :
                null) :
            null;

        context["field"] = "baseReferenceId";
        context["metadata"] = (objectMetadata ? objectMetadata["baseReferenceId"] : null);
        privateState.baseReferenceId = defaultValues ?
            (defaultValues["baseReferenceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["baseReferenceId"], context) :
                null) :
            null;

        context["field"] = "customConfig";
        context["metadata"] = (objectMetadata ? objectMetadata["customConfig"] : null);
        privateState.customConfig = defaultValues ?
            (defaultValues["customConfig"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customConfig"], context) :
                null) :
            null;

        context["field"] = "transactionReference";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
        privateState.transactionReference = defaultValues ?
            (defaultValues["transactionReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionReference"], context) :
                null) :
            null;

        context["field"] = "account";
        context["metadata"] = (objectMetadata ? objectMetadata["account"] : null);
        privateState.account = defaultValues ?
            (defaultValues["account"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["account"], context) :
                null) :
            null;

        context["field"] = "accountCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["accountCurrency"] : null);
        privateState.accountCurrency = defaultValues ?
            (defaultValues["accountCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountCurrency"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "balanceWithCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["balanceWithCurrency"] : null);
        privateState.balanceWithCurrency = defaultValues ?
            (defaultValues["balanceWithCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["balanceWithCurrency"], context) :
                null) :
            null;

        context["field"] = "claimsSRMSId";
        context["metadata"] = (objectMetadata ? objectMetadata["claimsSRMSId"] : null);
        privateState.claimsSRMSId = defaultValues ?
            (defaultValues["claimsSRMSId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimsSRMSId"], context) :
                null) :
            null;

        context["field"] = "collectionReference";
        context["metadata"] = (objectMetadata ? objectMetadata["collectionReference"] : null);
        privateState.collectionReference = defaultValues ?
            (defaultValues["collectionReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["collectionReference"], context) :
                null) :
            null;

        context["field"] = "collectionSrmsId";
        context["metadata"] = (objectMetadata ? objectMetadata["collectionSrmsId"] : null);
        privateState.collectionSrmsId = defaultValues ?
            (defaultValues["collectionSrmsId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["collectionSrmsId"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "exportLCId";
        context["metadata"] = (objectMetadata ? objectMetadata["exportLCId"] : null);
        privateState.exportLCId = defaultValues ?
            (defaultValues["exportLCId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exportLCId"], context) :
                null) :
            null;

        context["field"] = "exportlcSRMSRequestId";
        context["metadata"] = (objectMetadata ? objectMetadata["exportlcSRMSRequestId"] : null);
        privateState.exportlcSRMSRequestId = defaultValues ?
            (defaultValues["exportlcSRMSRequestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exportlcSRMSRequestId"], context) :
                null) :
            null;

        context["field"] = "guaranteeSrmsId";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteeSrmsId"] : null);
        privateState.guaranteeSrmsId = defaultValues ?
            (defaultValues["guaranteeSrmsId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteeSrmsId"], context) :
                null) :
            null;

        context["field"] = "guaranteesSRMSId";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteesSRMSId"] : null);
        privateState.guaranteesSRMSId = defaultValues ?
            (defaultValues["guaranteesSRMSId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteesSRMSId"], context) :
                null) :
            null;

        context["field"] = "lcSrmsReqOrderID";
        context["metadata"] = (objectMetadata ? objectMetadata["lcSrmsReqOrderID"] : null);
        privateState.lcSrmsReqOrderID = defaultValues ?
            (defaultValues["lcSrmsReqOrderID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcSrmsReqOrderID"], context) :
                null) :
            null;

        context["field"] = "srmsReqOrderID";
        context["metadata"] = (objectMetadata ? objectMetadata["srmsReqOrderID"] : null);
        privateState.srmsReqOrderID = defaultValues ?
            (defaultValues["srmsReqOrderID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["srmsReqOrderID"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "creditAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["creditAccount"] : null);
        privateState.creditAccount = defaultValues ?
            (defaultValues["creditAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditAccount"], context) :
                null) :
            null;

        context["field"] = "debitAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["debitAccount"] : null);
        privateState.debitAccount = defaultValues ?
            (defaultValues["debitAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitAccount"], context) :
                null) :
            null;

        context["field"] = "tradeCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["tradeCurrency"] : null);
        privateState.tradeCurrency = defaultValues ?
            (defaultValues["tradeCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tradeCurrency"], context) :
                null) :
            null;

        context["field"] = "availableBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
        privateState.availableBalance = defaultValues ?
            (defaultValues["availableBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableBalance"], context) :
                null) :
            null;

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "date";
        context["metadata"] = (objectMetadata ? objectMetadata["date"] : null);
        privateState.date = defaultValues ?
            (defaultValues["date"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["date"], context) :
                null) :
            null;

        context["field"] = "expiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
        privateState.expiryDate = defaultValues ?
            (defaultValues["expiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryDate"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
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

        context["field"] = "dbpErrorCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrorCode"] : null);
        privateState.dbpErrorCode = defaultValues ?
            (defaultValues["dbpErrorCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrorCode"], context) :
                null) :
            null;

        context["field"] = "dbpErrorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrorMessage"] : null);
        privateState.dbpErrorMessage = defaultValues ?
            (defaultValues["dbpErrorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrorMessage"], context) :
                null) :
            null;

        context["field"] = "limitId";
        context["metadata"] = (objectMetadata ? objectMetadata["limitId"] : null);
        privateState.limitId = defaultValues ?
            (defaultValues["limitId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitId"], context) :
                null) :
            null;

        context["field"] = "limitCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["limitCurrency"] : null);
        privateState.limitCurrency = defaultValues ?
            (defaultValues["limitCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitCurrency"], context) :
                null) :
            null;

        context["field"] = "availableLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["availableLimit"] : null);
        privateState.availableLimit = defaultValues ?
            (defaultValues["availableLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableLimit"], context) :
                null) :
            null;

        context["field"] = "utilizedLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["utilizedLimit"] : null);
        privateState.utilizedLimit = defaultValues ?
            (defaultValues["utilizedLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["utilizedLimit"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "currencies": {
                get: function() {
                    context["field"] = "currencies";
                    context["metadata"] = (objectMetadata ? objectMetadata["currencies"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currencies, context);
                },
                set: function(val) {
                    setterFunctions['currencies'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "quickLink": {
                get: function() {
                    context["field"] = "quickLink";
                    context["metadata"] = (objectMetadata ? objectMetadata["quickLink"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.quickLink, context);
                },
                set: function(val) {
                    setterFunctions['quickLink'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "needAttention": {
                get: function() {
                    context["field"] = "needAttention";
                    context["metadata"] = (objectMetadata ? objectMetadata["needAttention"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.needAttention, context);
                },
                set: function(val) {
                    setterFunctions['needAttention'].call(this, val, privateState);
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
            "baseReferenceId": {
                get: function() {
                    context["field"] = "baseReferenceId";
                    context["metadata"] = (objectMetadata ? objectMetadata["baseReferenceId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.baseReferenceId, context);
                },
                set: function(val) {
                    setterFunctions['baseReferenceId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customConfig": {
                get: function() {
                    context["field"] = "customConfig";
                    context["metadata"] = (objectMetadata ? objectMetadata["customConfig"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customConfig, context);
                },
                set: function(val) {
                    setterFunctions['customConfig'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionReference": {
                get: function() {
                    context["field"] = "transactionReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionReference, context);
                },
                set: function(val) {
                    setterFunctions['transactionReference'].call(this, val, privateState);
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
            "accountCurrency": {
                get: function() {
                    context["field"] = "accountCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountCurrency, context);
                },
                set: function(val) {
                    setterFunctions['accountCurrency'].call(this, val, privateState);
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
            "balanceWithCurrency": {
                get: function() {
                    context["field"] = "balanceWithCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["balanceWithCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.balanceWithCurrency, context);
                },
                set: function(val) {
                    setterFunctions['balanceWithCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "claimsSRMSId": {
                get: function() {
                    context["field"] = "claimsSRMSId";
                    context["metadata"] = (objectMetadata ? objectMetadata["claimsSRMSId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.claimsSRMSId, context);
                },
                set: function(val) {
                    setterFunctions['claimsSRMSId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "collectionReference": {
                get: function() {
                    context["field"] = "collectionReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["collectionReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.collectionReference, context);
                },
                set: function(val) {
                    setterFunctions['collectionReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "collectionSrmsId": {
                get: function() {
                    context["field"] = "collectionSrmsId";
                    context["metadata"] = (objectMetadata ? objectMetadata["collectionSrmsId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.collectionSrmsId, context);
                },
                set: function(val) {
                    setterFunctions['collectionSrmsId'].call(this, val, privateState);
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
            "exportLCId": {
                get: function() {
                    context["field"] = "exportLCId";
                    context["metadata"] = (objectMetadata ? objectMetadata["exportLCId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.exportLCId, context);
                },
                set: function(val) {
                    setterFunctions['exportLCId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "exportlcSRMSRequestId": {
                get: function() {
                    context["field"] = "exportlcSRMSRequestId";
                    context["metadata"] = (objectMetadata ? objectMetadata["exportlcSRMSRequestId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.exportlcSRMSRequestId, context);
                },
                set: function(val) {
                    setterFunctions['exportlcSRMSRequestId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "guaranteeSrmsId": {
                get: function() {
                    context["field"] = "guaranteeSrmsId";
                    context["metadata"] = (objectMetadata ? objectMetadata["guaranteeSrmsId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.guaranteeSrmsId, context);
                },
                set: function(val) {
                    setterFunctions['guaranteeSrmsId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "guaranteesSRMSId": {
                get: function() {
                    context["field"] = "guaranteesSRMSId";
                    context["metadata"] = (objectMetadata ? objectMetadata["guaranteesSRMSId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.guaranteesSRMSId, context);
                },
                set: function(val) {
                    setterFunctions['guaranteesSRMSId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcSrmsReqOrderID": {
                get: function() {
                    context["field"] = "lcSrmsReqOrderID";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcSrmsReqOrderID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcSrmsReqOrderID, context);
                },
                set: function(val) {
                    setterFunctions['lcSrmsReqOrderID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "srmsReqOrderID": {
                get: function() {
                    context["field"] = "srmsReqOrderID";
                    context["metadata"] = (objectMetadata ? objectMetadata["srmsReqOrderID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.srmsReqOrderID, context);
                },
                set: function(val) {
                    setterFunctions['srmsReqOrderID'].call(this, val, privateState);
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
            "creditAccount": {
                get: function() {
                    context["field"] = "creditAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditAccount, context);
                },
                set: function(val) {
                    setterFunctions['creditAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "debitAccount": {
                get: function() {
                    context["field"] = "debitAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitAccount, context);
                },
                set: function(val) {
                    setterFunctions['debitAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tradeCurrency": {
                get: function() {
                    context["field"] = "tradeCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["tradeCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tradeCurrency, context);
                },
                set: function(val) {
                    setterFunctions['tradeCurrency'].call(this, val, privateState);
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
            "paymentStatus": {
                get: function() {
                    context["field"] = "paymentStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentStatus, context);
                },
                set: function(val) {
                    setterFunctions['paymentStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "date": {
                get: function() {
                    context["field"] = "date";
                    context["metadata"] = (objectMetadata ? objectMetadata["date"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.date, context);
                },
                set: function(val) {
                    setterFunctions['date'].call(this, val, privateState);
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
            "message": {
                get: function() {
                    context["field"] = "message";
                    context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.message, context);
                },
                set: function(val) {
                    setterFunctions['message'].call(this, val, privateState);
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
            "dbpErrorCode": {
                get: function() {
                    context["field"] = "dbpErrorCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrorCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrorCode, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrorCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrorMessage": {
                get: function() {
                    context["field"] = "dbpErrorMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrorMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrorMessage, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrorMessage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limitId": {
                get: function() {
                    context["field"] = "limitId";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitId, context);
                },
                set: function(val) {
                    setterFunctions['limitId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limitCurrency": {
                get: function() {
                    context["field"] = "limitCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitCurrency, context);
                },
                set: function(val) {
                    setterFunctions['limitCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableLimit": {
                get: function() {
                    context["field"] = "availableLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableLimit, context);
                },
                set: function(val) {
                    setterFunctions['availableLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "utilizedLimit": {
                get: function() {
                    context["field"] = "utilizedLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["utilizedLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.utilizedLimit, context);
                },
                set: function(val) {
                    setterFunctions['utilizedLimit'].call(this, val, privateState);
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
            privateState.currencies = value ? (value["currencies"] ? value["currencies"] : null) : null;
            privateState.quickLink = value ? (value["quickLink"] ? value["quickLink"] : null) : null;
            privateState.needAttention = value ? (value["needAttention"] ? value["needAttention"] : null) : null;
            privateState.product = value ? (value["product"] ? value["product"] : null) : null;
            privateState.baseReferenceId = value ? (value["baseReferenceId"] ? value["baseReferenceId"] : null) : null;
            privateState.customConfig = value ? (value["customConfig"] ? value["customConfig"] : null) : null;
            privateState.transactionReference = value ? (value["transactionReference"] ? value["transactionReference"] : null) : null;
            privateState.account = value ? (value["account"] ? value["account"] : null) : null;
            privateState.accountCurrency = value ? (value["accountCurrency"] ? value["accountCurrency"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.balanceWithCurrency = value ? (value["balanceWithCurrency"] ? value["balanceWithCurrency"] : null) : null;
            privateState.claimsSRMSId = value ? (value["claimsSRMSId"] ? value["claimsSRMSId"] : null) : null;
            privateState.collectionReference = value ? (value["collectionReference"] ? value["collectionReference"] : null) : null;
            privateState.collectionSrmsId = value ? (value["collectionSrmsId"] ? value["collectionSrmsId"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.exportLCId = value ? (value["exportLCId"] ? value["exportLCId"] : null) : null;
            privateState.exportlcSRMSRequestId = value ? (value["exportlcSRMSRequestId"] ? value["exportlcSRMSRequestId"] : null) : null;
            privateState.guaranteeSrmsId = value ? (value["guaranteeSrmsId"] ? value["guaranteeSrmsId"] : null) : null;
            privateState.guaranteesSRMSId = value ? (value["guaranteesSRMSId"] ? value["guaranteesSRMSId"] : null) : null;
            privateState.lcSrmsReqOrderID = value ? (value["lcSrmsReqOrderID"] ? value["lcSrmsReqOrderID"] : null) : null;
            privateState.srmsReqOrderID = value ? (value["srmsReqOrderID"] ? value["srmsReqOrderID"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.creditAccount = value ? (value["creditAccount"] ? value["creditAccount"] : null) : null;
            privateState.debitAccount = value ? (value["debitAccount"] ? value["debitAccount"] : null) : null;
            privateState.tradeCurrency = value ? (value["tradeCurrency"] ? value["tradeCurrency"] : null) : null;
            privateState.availableBalance = value ? (value["availableBalance"] ? value["availableBalance"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.date = value ? (value["date"] ? value["date"] : null) : null;
            privateState.expiryDate = value ? (value["expiryDate"] ? value["expiryDate"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrorCode = value ? (value["dbpErrorCode"] ? value["dbpErrorCode"] : null) : null;
            privateState.dbpErrorMessage = value ? (value["dbpErrorMessage"] ? value["dbpErrorMessage"] : null) : null;
            privateState.limitId = value ? (value["limitId"] ? value["limitId"] : null) : null;
            privateState.limitCurrency = value ? (value["limitCurrency"] ? value["limitCurrency"] : null) : null;
            privateState.availableLimit = value ? (value["availableLimit"] ? value["availableLimit"] : null) : null;
            privateState.utilizedLimit = value ? (value["utilizedLimit"] ? value["utilizedLimit"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(DashboardOverview);

    //Create new class level validator object
    BaseModel.Validator.call(DashboardOverview);

    var registerValidatorBackup = DashboardOverview.registerValidator;

    DashboardOverview.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(DashboardOverview.isValid(this, propName, val)) {
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
    //For Operation 'GetDashboardDetails' with service id 'GetDashboardDetails7306'
     DashboardOverview.GetDashboardDetails = function(params, onCompletion){
        return DashboardOverview.customVerb('GetDashboardDetails', params, onCompletion);
     };

    //For Operation 'GenerateAllTradesList' with service id 'GenerateAllTradesList6875'
     DashboardOverview.GenerateAllTradesList = function(params, onCompletion){
        return DashboardOverview.customVerb('GenerateAllTradesList', params, onCompletion);
     };

    //For Operation 'FetchPayables' with service id 'FetchPayables8611'
     DashboardOverview.FetchPayables = function(params, onCompletion){
        return DashboardOverview.customVerb('FetchPayables', params, onCompletion);
     };

    //For Operation 'FetchAllTradeDetails' with service id 'FetchAllTradeDetails7587'
     DashboardOverview.FetchAllTradeDetails = function(params, onCompletion){
        return DashboardOverview.customVerb('FetchAllTradeDetails', params, onCompletion);
     };

    //For Operation 'GenerateReceivablesList' with service id 'GenerateReceivablesList7492'
     DashboardOverview.GenerateReceivablesList = function(params, onCompletion){
        return DashboardOverview.customVerb('GenerateReceivablesList', params, onCompletion);
     };

    //For Operation 'UpdateTradeFinanceConfiguration' with service id 'UpdateTradeFinanceConfiguration2339'
     DashboardOverview.UpdateTradeFinanceConfiguration = function(params, onCompletion){
        return DashboardOverview.customVerb('UpdateTradeFinanceConfiguration', params, onCompletion);
     };

    //For Operation 'GeneratePayablesList' with service id 'GeneratePayablesList3530'
     DashboardOverview.GeneratePayablesList = function(params, onCompletion){
        return DashboardOverview.customVerb('GeneratePayablesList', params, onCompletion);
     };

    //For Operation 'FetchReceivables' with service id 'FetchReceivables9794'
     DashboardOverview.FetchReceivables = function(params, onCompletion){
        return DashboardOverview.customVerb('FetchReceivables', params, onCompletion);
     };

    //For Operation 'CreateTradeFinanceConfiguration' with service id 'CreateTradeFinanceConfiguration1492'
     DashboardOverview.CreateTradeFinanceConfiguration = function(params, onCompletion){
        return DashboardOverview.customVerb('CreateTradeFinanceConfiguration', params, onCompletion);
     };

    //For Operation 'FetchTradeFinanceConfiguration' with service id 'FetchTradeFinanceConfiguration4323'
     DashboardOverview.FetchTradeFinanceConfiguration = function(params, onCompletion){
        return DashboardOverview.customVerb('FetchTradeFinanceConfiguration', params, onCompletion);
     };

    //For Operation 'FetchLimits' with service id 'getLimits8022'
     DashboardOverview.FetchLimits = function(params, onCompletion){
        return DashboardOverview.customVerb('FetchLimits', params, onCompletion);
     };

    var relations = [];

    DashboardOverview.relations = relations;

    DashboardOverview.prototype.isValid = function() {
        return DashboardOverview.isValid(this);
    };

    DashboardOverview.prototype.objModelName = "DashboardOverview";
    DashboardOverview.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    DashboardOverview.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "DashboardOverview", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    DashboardOverview.clone = function(objectToClone) {
        var clonedObj = new DashboardOverview();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return DashboardOverview;
});