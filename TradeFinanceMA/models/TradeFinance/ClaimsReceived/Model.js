/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ClaimsReceived", "objectService" : "TradeFinance"};

    var setterFunctions = {
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        guaranteesSRMSId: function(val, state) {
            context["field"] = "guaranteesSRMSId";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteesSRMSId"] : null);
            state['guaranteesSRMSId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productType: function(val, state) {
            context["field"] = "productType";
            context["metadata"] = (objectMetadata ? objectMetadata["productType"] : null);
            state['productType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        guaranteeAndSBLCType: function(val, state) {
            context["field"] = "guaranteeAndSBLCType";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteeAndSBLCType"] : null);
            state['guaranteeAndSBLCType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unUtilizedAmount: function(val, state) {
            context["field"] = "unUtilizedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["unUtilizedAmount"] : null);
            state['unUtilizedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issueDate: function(val, state) {
            context["field"] = "issueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
            state['issueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryType: function(val, state) {
            context["field"] = "expiryType";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryType"] : null);
            state['expiryType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryDate: function(val, state) {
            context["field"] = "expiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
            state['expiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryCondition: function(val, state) {
            context["field"] = "expiryCondition";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryCondition"] : null);
            state['expiryCondition'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        advisingBank: function(val, state) {
            context["field"] = "advisingBank";
            context["metadata"] = (objectMetadata ? objectMetadata["advisingBank"] : null);
            state['advisingBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimStatus: function(val, state) {
            context["field"] = "claimStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["claimStatus"] : null);
            state['claimStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimsSRMSId: function(val, state) {
            context["field"] = "claimsSRMSId";
            context["metadata"] = (objectMetadata ? objectMetadata["claimsSRMSId"] : null);
            state['claimsSRMSId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimType: function(val, state) {
            context["field"] = "claimType";
            context["metadata"] = (objectMetadata ? objectMetadata["claimType"] : null);
            state['claimType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimAmount: function(val, state) {
            context["field"] = "claimAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["claimAmount"] : null);
            state['claimAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimCurrency: function(val, state) {
            context["field"] = "claimCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["claimCurrency"] : null);
            state['claimCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        receivedOn: function(val, state) {
            context["field"] = "receivedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["receivedOn"] : null);
            state['receivedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expectedSettlementDate: function(val, state) {
            context["field"] = "expectedSettlementDate";
            context["metadata"] = (objectMetadata ? objectMetadata["expectedSettlementDate"] : null);
            state['expectedSettlementDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dueDays: function(val, state) {
            context["field"] = "dueDays";
            context["metadata"] = (objectMetadata ? objectMetadata["dueDays"] : null);
            state['dueDays'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        presentationDetails: function(val, state) {
            context["field"] = "presentationDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["presentationDetails"] : null);
            state['presentationDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        demandType: function(val, state) {
            context["field"] = "demandType";
            context["metadata"] = (objectMetadata ? objectMetadata["demandType"] : null);
            state['demandType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        newExtensionDate: function(val, state) {
            context["field"] = "newExtensionDate";
            context["metadata"] = (objectMetadata ? objectMetadata["newExtensionDate"] : null);
            state['newExtensionDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documents: function(val, state) {
            context["field"] = "documents";
            context["metadata"] = (objectMetadata ? objectMetadata["documents"] : null);
            state['documents'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentStatus: function(val, state) {
            context["field"] = "documentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
            state['documentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherDemandDetails: function(val, state) {
            context["field"] = "otherDemandDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["otherDemandDetails"] : null);
            state['otherDemandDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageFromBank: function(val, state) {
            context["field"] = "messageFromBank";
            context["metadata"] = (objectMetadata ? objectMetadata["messageFromBank"] : null);
            state['messageFromBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimAcceptance: function(val, state) {
            context["field"] = "claimAcceptance";
            context["metadata"] = (objectMetadata ? objectMetadata["claimAcceptance"] : null);
            state['claimAcceptance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitAccount: function(val, state) {
            context["field"] = "debitAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["debitAccount"] : null);
            state['debitAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestedOverdraft: function(val, state) {
            context["field"] = "requestedOverdraft";
            context["metadata"] = (objectMetadata ? objectMetadata["requestedOverdraft"] : null);
            state['requestedOverdraft'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForRejection: function(val, state) {
            context["field"] = "reasonForRejection";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForRejection"] : null);
            state['reasonForRejection'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rejectedDate: function(val, state) {
            context["field"] = "rejectedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["rejectedDate"] : null);
            state['rejectedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        acceptedDate: function(val, state) {
            context["field"] = "acceptedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["acceptedDate"] : null);
            state['acceptedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageToBank: function(val, state) {
            context["field"] = "messageToBank";
            context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
            state['messageToBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        discrepancyDetails: function(val, state) {
            context["field"] = "discrepancyDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["discrepancyDetails"] : null);
            state['discrepancyDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        discrepancyAcceptance: function(val, state) {
            context["field"] = "discrepancyAcceptance";
            context["metadata"] = (objectMetadata ? objectMetadata["discrepancyAcceptance"] : null);
            state['discrepancyAcceptance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        discrepancyHistory: function(val, state) {
            context["field"] = "discrepancyHistory";
            context["metadata"] = (objectMetadata ? objectMetadata["discrepancyHistory"] : null);
            state['discrepancyHistory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        returnCount: function(val, state) {
            context["field"] = "returnCount";
            context["metadata"] = (objectMetadata ? objectMetadata["returnCount"] : null);
            state['returnCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        returnedTime: function(val, state) {
            context["field"] = "returnedTime";
            context["metadata"] = (objectMetadata ? objectMetadata["returnedTime"] : null);
            state['returnedTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceRequestTime: function(val, state) {
            context["field"] = "serviceRequestTime";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceRequestTime"] : null);
            state['serviceRequestTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        settledDate: function(val, state) {
            context["field"] = "settledDate";
            context["metadata"] = (objectMetadata ? objectMetadata["settledDate"] : null);
            state['settledDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalAmountToBePaid: function(val, state) {
            context["field"] = "totalAmountToBePaid";
            context["metadata"] = (objectMetadata ? objectMetadata["totalAmountToBePaid"] : null);
            state['totalAmountToBePaid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForReturn: function(val, state) {
            context["field"] = "reasonForReturn";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
            state['reasonForReturn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        returnMessageToBank: function(val, state) {
            context["field"] = "returnMessageToBank";
            context["metadata"] = (objectMetadata ? objectMetadata["returnMessageToBank"] : null);
            state['returnMessageToBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        corporateUserName: function(val, state) {
            context["field"] = "corporateUserName";
            context["metadata"] = (objectMetadata ? objectMetadata["corporateUserName"] : null);
            state['corporateUserName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errMsg: function(val, state) {
            context["field"] = "errMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errMsg"] : null);
            state['errMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errCode: function(val, state) {
            context["field"] = "errCode";
            context["metadata"] = (objectMetadata ? objectMetadata["errCode"] : null);
            state['errCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorMessage: function(val, state) {
            context["field"] = "errorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
            state['errorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorCode: function(val, state) {
            context["field"] = "errorCode";
            context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
            state['errorCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorMsg: function(val, state) {
            context["field"] = "errorMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errorMsg"] : null);
            state['errorMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    };

    //Create the Model Class
    function ClaimsReceived(defaultValues) {
        var privateState = {};
        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
                null) :
            null;

        context["field"] = "guaranteesSRMSId";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteesSRMSId"] : null);
        privateState.guaranteesSRMSId = defaultValues ?
            (defaultValues["guaranteesSRMSId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteesSRMSId"], context) :
                null) :
            null;

        context["field"] = "productType";
        context["metadata"] = (objectMetadata ? objectMetadata["productType"] : null);
        privateState.productType = defaultValues ?
            (defaultValues["productType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productType"], context) :
                null) :
            null;

        context["field"] = "guaranteeAndSBLCType";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteeAndSBLCType"] : null);
        privateState.guaranteeAndSBLCType = defaultValues ?
            (defaultValues["guaranteeAndSBLCType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteeAndSBLCType"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "unUtilizedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["unUtilizedAmount"] : null);
        privateState.unUtilizedAmount = defaultValues ?
            (defaultValues["unUtilizedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unUtilizedAmount"], context) :
                null) :
            null;

        context["field"] = "issueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
        privateState.issueDate = defaultValues ?
            (defaultValues["issueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issueDate"], context) :
                null) :
            null;

        context["field"] = "expiryType";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryType"] : null);
        privateState.expiryType = defaultValues ?
            (defaultValues["expiryType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryType"], context) :
                null) :
            null;

        context["field"] = "expiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
        privateState.expiryDate = defaultValues ?
            (defaultValues["expiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryDate"], context) :
                null) :
            null;

        context["field"] = "expiryCondition";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryCondition"] : null);
        privateState.expiryCondition = defaultValues ?
            (defaultValues["expiryCondition"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryCondition"], context) :
                null) :
            null;

        context["field"] = "advisingBank";
        context["metadata"] = (objectMetadata ? objectMetadata["advisingBank"] : null);
        privateState.advisingBank = defaultValues ?
            (defaultValues["advisingBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["advisingBank"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "claimStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["claimStatus"] : null);
        privateState.claimStatus = defaultValues ?
            (defaultValues["claimStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimStatus"], context) :
                null) :
            null;

        context["field"] = "claimsSRMSId";
        context["metadata"] = (objectMetadata ? objectMetadata["claimsSRMSId"] : null);
        privateState.claimsSRMSId = defaultValues ?
            (defaultValues["claimsSRMSId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimsSRMSId"], context) :
                null) :
            null;

        context["field"] = "claimType";
        context["metadata"] = (objectMetadata ? objectMetadata["claimType"] : null);
        privateState.claimType = defaultValues ?
            (defaultValues["claimType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimType"], context) :
                null) :
            null;

        context["field"] = "claimAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["claimAmount"] : null);
        privateState.claimAmount = defaultValues ?
            (defaultValues["claimAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimAmount"], context) :
                null) :
            null;

        context["field"] = "claimCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["claimCurrency"] : null);
        privateState.claimCurrency = defaultValues ?
            (defaultValues["claimCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimCurrency"], context) :
                null) :
            null;

        context["field"] = "receivedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["receivedOn"] : null);
        privateState.receivedOn = defaultValues ?
            (defaultValues["receivedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["receivedOn"], context) :
                null) :
            null;

        context["field"] = "expectedSettlementDate";
        context["metadata"] = (objectMetadata ? objectMetadata["expectedSettlementDate"] : null);
        privateState.expectedSettlementDate = defaultValues ?
            (defaultValues["expectedSettlementDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expectedSettlementDate"], context) :
                null) :
            null;

        context["field"] = "dueDays";
        context["metadata"] = (objectMetadata ? objectMetadata["dueDays"] : null);
        privateState.dueDays = defaultValues ?
            (defaultValues["dueDays"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dueDays"], context) :
                null) :
            null;

        context["field"] = "presentationDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["presentationDetails"] : null);
        privateState.presentationDetails = defaultValues ?
            (defaultValues["presentationDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["presentationDetails"], context) :
                null) :
            null;

        context["field"] = "demandType";
        context["metadata"] = (objectMetadata ? objectMetadata["demandType"] : null);
        privateState.demandType = defaultValues ?
            (defaultValues["demandType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["demandType"], context) :
                null) :
            null;

        context["field"] = "newExtensionDate";
        context["metadata"] = (objectMetadata ? objectMetadata["newExtensionDate"] : null);
        privateState.newExtensionDate = defaultValues ?
            (defaultValues["newExtensionDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["newExtensionDate"], context) :
                null) :
            null;

        context["field"] = "documents";
        context["metadata"] = (objectMetadata ? objectMetadata["documents"] : null);
        privateState.documents = defaultValues ?
            (defaultValues["documents"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documents"], context) :
                null) :
            null;

        context["field"] = "documentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
        privateState.documentStatus = defaultValues ?
            (defaultValues["documentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentStatus"], context) :
                null) :
            null;

        context["field"] = "otherDemandDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["otherDemandDetails"] : null);
        privateState.otherDemandDetails = defaultValues ?
            (defaultValues["otherDemandDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherDemandDetails"], context) :
                null) :
            null;

        context["field"] = "messageFromBank";
        context["metadata"] = (objectMetadata ? objectMetadata["messageFromBank"] : null);
        privateState.messageFromBank = defaultValues ?
            (defaultValues["messageFromBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageFromBank"], context) :
                null) :
            null;

        context["field"] = "claimAcceptance";
        context["metadata"] = (objectMetadata ? objectMetadata["claimAcceptance"] : null);
        privateState.claimAcceptance = defaultValues ?
            (defaultValues["claimAcceptance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimAcceptance"], context) :
                null) :
            null;

        context["field"] = "debitAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["debitAccount"] : null);
        privateState.debitAccount = defaultValues ?
            (defaultValues["debitAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitAccount"], context) :
                null) :
            null;

        context["field"] = "requestedOverdraft";
        context["metadata"] = (objectMetadata ? objectMetadata["requestedOverdraft"] : null);
        privateState.requestedOverdraft = defaultValues ?
            (defaultValues["requestedOverdraft"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestedOverdraft"], context) :
                null) :
            null;

        context["field"] = "reasonForRejection";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForRejection"] : null);
        privateState.reasonForRejection = defaultValues ?
            (defaultValues["reasonForRejection"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForRejection"], context) :
                null) :
            null;

        context["field"] = "rejectedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["rejectedDate"] : null);
        privateState.rejectedDate = defaultValues ?
            (defaultValues["rejectedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rejectedDate"], context) :
                null) :
            null;

        context["field"] = "acceptedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["acceptedDate"] : null);
        privateState.acceptedDate = defaultValues ?
            (defaultValues["acceptedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["acceptedDate"], context) :
                null) :
            null;

        context["field"] = "messageToBank";
        context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
        privateState.messageToBank = defaultValues ?
            (defaultValues["messageToBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageToBank"], context) :
                null) :
            null;

        context["field"] = "discrepancyDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["discrepancyDetails"] : null);
        privateState.discrepancyDetails = defaultValues ?
            (defaultValues["discrepancyDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["discrepancyDetails"], context) :
                null) :
            null;

        context["field"] = "discrepancyAcceptance";
        context["metadata"] = (objectMetadata ? objectMetadata["discrepancyAcceptance"] : null);
        privateState.discrepancyAcceptance = defaultValues ?
            (defaultValues["discrepancyAcceptance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["discrepancyAcceptance"], context) :
                null) :
            null;

        context["field"] = "discrepancyHistory";
        context["metadata"] = (objectMetadata ? objectMetadata["discrepancyHistory"] : null);
        privateState.discrepancyHistory = defaultValues ?
            (defaultValues["discrepancyHistory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["discrepancyHistory"], context) :
                null) :
            null;

        context["field"] = "returnCount";
        context["metadata"] = (objectMetadata ? objectMetadata["returnCount"] : null);
        privateState.returnCount = defaultValues ?
            (defaultValues["returnCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["returnCount"], context) :
                null) :
            null;

        context["field"] = "returnedTime";
        context["metadata"] = (objectMetadata ? objectMetadata["returnedTime"] : null);
        privateState.returnedTime = defaultValues ?
            (defaultValues["returnedTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["returnedTime"], context) :
                null) :
            null;

        context["field"] = "serviceRequestTime";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceRequestTime"] : null);
        privateState.serviceRequestTime = defaultValues ?
            (defaultValues["serviceRequestTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceRequestTime"], context) :
                null) :
            null;

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "settledDate";
        context["metadata"] = (objectMetadata ? objectMetadata["settledDate"] : null);
        privateState.settledDate = defaultValues ?
            (defaultValues["settledDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["settledDate"], context) :
                null) :
            null;

        context["field"] = "totalAmountToBePaid";
        context["metadata"] = (objectMetadata ? objectMetadata["totalAmountToBePaid"] : null);
        privateState.totalAmountToBePaid = defaultValues ?
            (defaultValues["totalAmountToBePaid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalAmountToBePaid"], context) :
                null) :
            null;

        context["field"] = "reasonForReturn";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
        privateState.reasonForReturn = defaultValues ?
            (defaultValues["reasonForReturn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForReturn"], context) :
                null) :
            null;

        context["field"] = "returnMessageToBank";
        context["metadata"] = (objectMetadata ? objectMetadata["returnMessageToBank"] : null);
        privateState.returnMessageToBank = defaultValues ?
            (defaultValues["returnMessageToBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["returnMessageToBank"], context) :
                null) :
            null;

        context["field"] = "corporateUserName";
        context["metadata"] = (objectMetadata ? objectMetadata["corporateUserName"] : null);
        privateState.corporateUserName = defaultValues ?
            (defaultValues["corporateUserName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["corporateUserName"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
                null) :
            null;

        context["field"] = "errMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errMsg"] : null);
        privateState.errMsg = defaultValues ?
            (defaultValues["errMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errMsg"], context) :
                null) :
            null;

        context["field"] = "errCode";
        context["metadata"] = (objectMetadata ? objectMetadata["errCode"] : null);
        privateState.errCode = defaultValues ?
            (defaultValues["errCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errCode"], context) :
                null) :
            null;

        context["field"] = "errorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
        privateState.errorMessage = defaultValues ?
            (defaultValues["errorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorMessage"], context) :
                null) :
            null;

        context["field"] = "errorCode";
        context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
        privateState.errorCode = defaultValues ?
            (defaultValues["errorCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorCode"], context) :
                null) :
            null;

        context["field"] = "errorMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errorMsg"] : null);
        privateState.errorMsg = defaultValues ?
            (defaultValues["errorMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorMsg"], context) :
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


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "productType": {
                get: function() {
                    context["field"] = "productType";
                    context["metadata"] = (objectMetadata ? objectMetadata["productType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.productType, context);
                },
                set: function(val) {
                    setterFunctions['productType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "guaranteeAndSBLCType": {
                get: function() {
                    context["field"] = "guaranteeAndSBLCType";
                    context["metadata"] = (objectMetadata ? objectMetadata["guaranteeAndSBLCType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.guaranteeAndSBLCType, context);
                },
                set: function(val) {
                    setterFunctions['guaranteeAndSBLCType'].call(this, val, privateState);
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
            "unUtilizedAmount": {
                get: function() {
                    context["field"] = "unUtilizedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["unUtilizedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unUtilizedAmount, context);
                },
                set: function(val) {
                    setterFunctions['unUtilizedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issueDate": {
                get: function() {
                    context["field"] = "issueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issueDate, context);
                },
                set: function(val) {
                    setterFunctions['issueDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiryType": {
                get: function() {
                    context["field"] = "expiryType";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryType, context);
                },
                set: function(val) {
                    setterFunctions['expiryType'].call(this, val, privateState);
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
            "expiryCondition": {
                get: function() {
                    context["field"] = "expiryCondition";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryCondition"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryCondition, context);
                },
                set: function(val) {
                    setterFunctions['expiryCondition'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "advisingBank": {
                get: function() {
                    context["field"] = "advisingBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["advisingBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.advisingBank, context);
                },
                set: function(val) {
                    setterFunctions['advisingBank'].call(this, val, privateState);
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
            "claimStatus": {
                get: function() {
                    context["field"] = "claimStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["claimStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.claimStatus, context);
                },
                set: function(val) {
                    setterFunctions['claimStatus'].call(this, val, privateState);
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
            "claimType": {
                get: function() {
                    context["field"] = "claimType";
                    context["metadata"] = (objectMetadata ? objectMetadata["claimType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.claimType, context);
                },
                set: function(val) {
                    setterFunctions['claimType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "claimAmount": {
                get: function() {
                    context["field"] = "claimAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["claimAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.claimAmount, context);
                },
                set: function(val) {
                    setterFunctions['claimAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "claimCurrency": {
                get: function() {
                    context["field"] = "claimCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["claimCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.claimCurrency, context);
                },
                set: function(val) {
                    setterFunctions['claimCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "receivedOn": {
                get: function() {
                    context["field"] = "receivedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["receivedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.receivedOn, context);
                },
                set: function(val) {
                    setterFunctions['receivedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expectedSettlementDate": {
                get: function() {
                    context["field"] = "expectedSettlementDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["expectedSettlementDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expectedSettlementDate, context);
                },
                set: function(val) {
                    setterFunctions['expectedSettlementDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dueDays": {
                get: function() {
                    context["field"] = "dueDays";
                    context["metadata"] = (objectMetadata ? objectMetadata["dueDays"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dueDays, context);
                },
                set: function(val) {
                    setterFunctions['dueDays'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "presentationDetails": {
                get: function() {
                    context["field"] = "presentationDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["presentationDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.presentationDetails, context);
                },
                set: function(val) {
                    setterFunctions['presentationDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "demandType": {
                get: function() {
                    context["field"] = "demandType";
                    context["metadata"] = (objectMetadata ? objectMetadata["demandType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.demandType, context);
                },
                set: function(val) {
                    setterFunctions['demandType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "newExtensionDate": {
                get: function() {
                    context["field"] = "newExtensionDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["newExtensionDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.newExtensionDate, context);
                },
                set: function(val) {
                    setterFunctions['newExtensionDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documents": {
                get: function() {
                    context["field"] = "documents";
                    context["metadata"] = (objectMetadata ? objectMetadata["documents"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documents, context);
                },
                set: function(val) {
                    setterFunctions['documents'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentStatus": {
                get: function() {
                    context["field"] = "documentStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentStatus, context);
                },
                set: function(val) {
                    setterFunctions['documentStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otherDemandDetails": {
                get: function() {
                    context["field"] = "otherDemandDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["otherDemandDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otherDemandDetails, context);
                },
                set: function(val) {
                    setterFunctions['otherDemandDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "messageFromBank": {
                get: function() {
                    context["field"] = "messageFromBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["messageFromBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messageFromBank, context);
                },
                set: function(val) {
                    setterFunctions['messageFromBank'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "claimAcceptance": {
                get: function() {
                    context["field"] = "claimAcceptance";
                    context["metadata"] = (objectMetadata ? objectMetadata["claimAcceptance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.claimAcceptance, context);
                },
                set: function(val) {
                    setterFunctions['claimAcceptance'].call(this, val, privateState);
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
            "requestedOverdraft": {
                get: function() {
                    context["field"] = "requestedOverdraft";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestedOverdraft"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestedOverdraft, context);
                },
                set: function(val) {
                    setterFunctions['requestedOverdraft'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reasonForRejection": {
                get: function() {
                    context["field"] = "reasonForRejection";
                    context["metadata"] = (objectMetadata ? objectMetadata["reasonForRejection"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reasonForRejection, context);
                },
                set: function(val) {
                    setterFunctions['reasonForRejection'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rejectedDate": {
                get: function() {
                    context["field"] = "rejectedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["rejectedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rejectedDate, context);
                },
                set: function(val) {
                    setterFunctions['rejectedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "acceptedDate": {
                get: function() {
                    context["field"] = "acceptedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["acceptedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.acceptedDate, context);
                },
                set: function(val) {
                    setterFunctions['acceptedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "messageToBank": {
                get: function() {
                    context["field"] = "messageToBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messageToBank, context);
                },
                set: function(val) {
                    setterFunctions['messageToBank'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "discrepancyDetails": {
                get: function() {
                    context["field"] = "discrepancyDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["discrepancyDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.discrepancyDetails, context);
                },
                set: function(val) {
                    setterFunctions['discrepancyDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "discrepancyAcceptance": {
                get: function() {
                    context["field"] = "discrepancyAcceptance";
                    context["metadata"] = (objectMetadata ? objectMetadata["discrepancyAcceptance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.discrepancyAcceptance, context);
                },
                set: function(val) {
                    setterFunctions['discrepancyAcceptance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "discrepancyHistory": {
                get: function() {
                    context["field"] = "discrepancyHistory";
                    context["metadata"] = (objectMetadata ? objectMetadata["discrepancyHistory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.discrepancyHistory, context);
                },
                set: function(val) {
                    setterFunctions['discrepancyHistory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "returnCount": {
                get: function() {
                    context["field"] = "returnCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["returnCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.returnCount, context);
                },
                set: function(val) {
                    setterFunctions['returnCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "returnedTime": {
                get: function() {
                    context["field"] = "returnedTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["returnedTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.returnedTime, context);
                },
                set: function(val) {
                    setterFunctions['returnedTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceRequestTime": {
                get: function() {
                    context["field"] = "serviceRequestTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceRequestTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceRequestTime, context);
                },
                set: function(val) {
                    setterFunctions['serviceRequestTime'].call(this, val, privateState);
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
            "settledDate": {
                get: function() {
                    context["field"] = "settledDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["settledDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.settledDate, context);
                },
                set: function(val) {
                    setterFunctions['settledDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalAmountToBePaid": {
                get: function() {
                    context["field"] = "totalAmountToBePaid";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalAmountToBePaid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalAmountToBePaid, context);
                },
                set: function(val) {
                    setterFunctions['totalAmountToBePaid'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reasonForReturn": {
                get: function() {
                    context["field"] = "reasonForReturn";
                    context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reasonForReturn, context);
                },
                set: function(val) {
                    setterFunctions['reasonForReturn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "returnMessageToBank": {
                get: function() {
                    context["field"] = "returnMessageToBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["returnMessageToBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.returnMessageToBank, context);
                },
                set: function(val) {
                    setterFunctions['returnMessageToBank'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "corporateUserName": {
                get: function() {
                    context["field"] = "corporateUserName";
                    context["metadata"] = (objectMetadata ? objectMetadata["corporateUserName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.corporateUserName, context);
                },
                set: function(val) {
                    setterFunctions['corporateUserName'].call(this, val, privateState);
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
            "errMsg": {
                get: function() {
                    context["field"] = "errMsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["errMsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errMsg, context);
                },
                set: function(val) {
                    setterFunctions['errMsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errCode": {
                get: function() {
                    context["field"] = "errCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["errCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errCode, context);
                },
                set: function(val) {
                    setterFunctions['errCode'].call(this, val, privateState);
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
            "errorCode": {
                get: function() {
                    context["field"] = "errorCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorCode, context);
                },
                set: function(val) {
                    setterFunctions['errorCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errorMsg": {
                get: function() {
                    context["field"] = "errorMsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorMsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorMsg, context);
                },
                set: function(val) {
                    setterFunctions['errorMsg'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.guaranteesSRMSId = value ? (value["guaranteesSRMSId"] ? value["guaranteesSRMSId"] : null) : null;
            privateState.productType = value ? (value["productType"] ? value["productType"] : null) : null;
            privateState.guaranteeAndSBLCType = value ? (value["guaranteeAndSBLCType"] ? value["guaranteeAndSBLCType"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.unUtilizedAmount = value ? (value["unUtilizedAmount"] ? value["unUtilizedAmount"] : null) : null;
            privateState.issueDate = value ? (value["issueDate"] ? value["issueDate"] : null) : null;
            privateState.expiryType = value ? (value["expiryType"] ? value["expiryType"] : null) : null;
            privateState.expiryDate = value ? (value["expiryDate"] ? value["expiryDate"] : null) : null;
            privateState.expiryCondition = value ? (value["expiryCondition"] ? value["expiryCondition"] : null) : null;
            privateState.advisingBank = value ? (value["advisingBank"] ? value["advisingBank"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.claimStatus = value ? (value["claimStatus"] ? value["claimStatus"] : null) : null;
            privateState.claimsSRMSId = value ? (value["claimsSRMSId"] ? value["claimsSRMSId"] : null) : null;
            privateState.claimType = value ? (value["claimType"] ? value["claimType"] : null) : null;
            privateState.claimAmount = value ? (value["claimAmount"] ? value["claimAmount"] : null) : null;
            privateState.claimCurrency = value ? (value["claimCurrency"] ? value["claimCurrency"] : null) : null;
            privateState.receivedOn = value ? (value["receivedOn"] ? value["receivedOn"] : null) : null;
            privateState.expectedSettlementDate = value ? (value["expectedSettlementDate"] ? value["expectedSettlementDate"] : null) : null;
            privateState.dueDays = value ? (value["dueDays"] ? value["dueDays"] : null) : null;
            privateState.presentationDetails = value ? (value["presentationDetails"] ? value["presentationDetails"] : null) : null;
            privateState.demandType = value ? (value["demandType"] ? value["demandType"] : null) : null;
            privateState.newExtensionDate = value ? (value["newExtensionDate"] ? value["newExtensionDate"] : null) : null;
            privateState.documents = value ? (value["documents"] ? value["documents"] : null) : null;
            privateState.documentStatus = value ? (value["documentStatus"] ? value["documentStatus"] : null) : null;
            privateState.otherDemandDetails = value ? (value["otherDemandDetails"] ? value["otherDemandDetails"] : null) : null;
            privateState.messageFromBank = value ? (value["messageFromBank"] ? value["messageFromBank"] : null) : null;
            privateState.claimAcceptance = value ? (value["claimAcceptance"] ? value["claimAcceptance"] : null) : null;
            privateState.debitAccount = value ? (value["debitAccount"] ? value["debitAccount"] : null) : null;
            privateState.requestedOverdraft = value ? (value["requestedOverdraft"] ? value["requestedOverdraft"] : null) : null;
            privateState.reasonForRejection = value ? (value["reasonForRejection"] ? value["reasonForRejection"] : null) : null;
            privateState.rejectedDate = value ? (value["rejectedDate"] ? value["rejectedDate"] : null) : null;
            privateState.acceptedDate = value ? (value["acceptedDate"] ? value["acceptedDate"] : null) : null;
            privateState.messageToBank = value ? (value["messageToBank"] ? value["messageToBank"] : null) : null;
            privateState.discrepancyDetails = value ? (value["discrepancyDetails"] ? value["discrepancyDetails"] : null) : null;
            privateState.discrepancyAcceptance = value ? (value["discrepancyAcceptance"] ? value["discrepancyAcceptance"] : null) : null;
            privateState.discrepancyHistory = value ? (value["discrepancyHistory"] ? value["discrepancyHistory"] : null) : null;
            privateState.returnCount = value ? (value["returnCount"] ? value["returnCount"] : null) : null;
            privateState.returnedTime = value ? (value["returnedTime"] ? value["returnedTime"] : null) : null;
            privateState.serviceRequestTime = value ? (value["serviceRequestTime"] ? value["serviceRequestTime"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.settledDate = value ? (value["settledDate"] ? value["settledDate"] : null) : null;
            privateState.totalAmountToBePaid = value ? (value["totalAmountToBePaid"] ? value["totalAmountToBePaid"] : null) : null;
            privateState.reasonForReturn = value ? (value["reasonForReturn"] ? value["reasonForReturn"] : null) : null;
            privateState.returnMessageToBank = value ? (value["returnMessageToBank"] ? value["returnMessageToBank"] : null) : null;
            privateState.corporateUserName = value ? (value["corporateUserName"] ? value["corporateUserName"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.errMsg = value ? (value["errMsg"] ? value["errMsg"] : null) : null;
            privateState.errCode = value ? (value["errCode"] ? value["errCode"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.errorCode = value ? (value["errorCode"] ? value["errorCode"] : null) : null;
            privateState.errorMsg = value ? (value["errorMsg"] ? value["errorMsg"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ClaimsReceived);

    //Create new class level validator object
    BaseModel.Validator.call(ClaimsReceived);

    var registerValidatorBackup = ClaimsReceived.registerValidator;

    ClaimsReceived.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ClaimsReceived.isValid(this, propName, val)) {
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
    //For Operation 'updateClaim' with service id 'UpdateIssuedGuaranteeClaim2029'
     ClaimsReceived.updateClaim = function(params, onCompletion){
        return ClaimsReceived.customVerb('updateClaim', params, onCompletion);
     };

    //For Operation 'updateClaimByBank' with service id 'UpdateIssuedGuaranteeClaimByBank5503'
     ClaimsReceived.updateClaimByBank = function(params, onCompletion){
        return ClaimsReceived.customVerb('updateClaimByBank', params, onCompletion);
     };

    //For Operation 'generateClaimsList' with service id 'GenerateIssuedClaimsList6140'
     ClaimsReceived.generateClaimsList = function(params, onCompletion){
        return ClaimsReceived.customVerb('generateClaimsList', params, onCompletion);
     };

    //For Operation 'getClaimById' with service id 'GetIssuedGuaranteeClaimById8016'
     ClaimsReceived.getClaimById = function(params, onCompletion){
        return ClaimsReceived.customVerb('getClaimById', params, onCompletion);
     };

    //For Operation 'createClaim' with service id 'createIssuedGuaranteeClaim4084'
     ClaimsReceived.createClaim = function(params, onCompletion){
        return ClaimsReceived.customVerb('createClaim', params, onCompletion);
     };

    //For Operation 'generateClaimReport' with service id 'GenerateIssuedGuaranteeClaim4134'
     ClaimsReceived.generateClaimReport = function(params, onCompletion){
        return ClaimsReceived.customVerb('generateClaimReport', params, onCompletion);
     };

    //For Operation 'getClaims' with service id 'GetIssuedGuaranteeClaims8964'
     ClaimsReceived.getClaims = function(params, onCompletion){
        return ClaimsReceived.customVerb('getClaims', params, onCompletion);
     };

    var relations = [];

    ClaimsReceived.relations = relations;

    ClaimsReceived.prototype.isValid = function() {
        return ClaimsReceived.isValid(this);
    };

    ClaimsReceived.prototype.objModelName = "ClaimsReceived";
    ClaimsReceived.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ClaimsReceived.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "ClaimsReceived", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ClaimsReceived.clone = function(objectToClone) {
        var clonedObj = new ClaimsReceived();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ClaimsReceived;
});