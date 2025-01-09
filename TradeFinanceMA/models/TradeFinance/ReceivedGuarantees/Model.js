/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ReceivedGuarantees", "objectService" : "TradeFinance"};

    var setterFunctions = {
        claimCurrency: function(val, state) {
            context["field"] = "claimCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["claimCurrency"] : null);
            state['claimCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimAmount: function(val, state) {
            context["field"] = "claimAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["claimAmount"] : null);
            state['claimAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimCreditAccount: function(val, state) {
            context["field"] = "claimCreditAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["claimCreditAccount"] : null);
            state['claimCreditAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chargesDebitAccount: function(val, state) {
            context["field"] = "chargesDebitAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["chargesDebitAccount"] : null);
            state['chargesDebitAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        documentInformation: function(val, state) {
            context["field"] = "documentInformation";
            context["metadata"] = (objectMetadata ? objectMetadata["documentInformation"] : null);
            state['documentInformation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        physicalDocuments: function(val, state) {
            context["field"] = "physicalDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["physicalDocuments"] : null);
            state['physicalDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        forwardDocuments: function(val, state) {
            context["field"] = "forwardDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["forwardDocuments"] : null);
            state['forwardDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherDemandDetails: function(val, state) {
            context["field"] = "otherDemandDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["otherDemandDetails"] : null);
            state['otherDemandDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentSettledDate: function(val, state) {
            context["field"] = "paymentSettledDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentSettledDate"] : null);
            state['paymentSettledDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentStatus: function(val, state) {
            context["field"] = "documentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
            state['documentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalDocuments: function(val, state) {
            context["field"] = "totalDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["totalDocuments"] : null);
            state['totalDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        returnedDocuments: function(val, state) {
            context["field"] = "returnedDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["returnedDocuments"] : null);
            state['returnedDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageFromBank: function(val, state) {
            context["field"] = "messageFromBank";
            context["metadata"] = (objectMetadata ? objectMetadata["messageFromBank"] : null);
            state['messageFromBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForReturn: function(val, state) {
            context["field"] = "reasonForReturn";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
            state['reasonForReturn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        discrepancies: function(val, state) {
            context["field"] = "discrepancies";
            context["metadata"] = (objectMetadata ? objectMetadata["discrepancies"] : null);
            state['discrepancies'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        returnMessageToBank: function(val, state) {
            context["field"] = "returnMessageToBank";
            context["metadata"] = (objectMetadata ? objectMetadata["returnMessageToBank"] : null);
            state['returnMessageToBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageToBank: function(val, state) {
            context["field"] = "messageToBank";
            context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
            state['messageToBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        guaranteesReferenceNo: function(val, state) {
            context["field"] = "guaranteesReferenceNo";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteesReferenceNo"] : null);
            state['guaranteesReferenceNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        issuingBank: function(val, state) {
            context["field"] = "issuingBank";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingBank"] : null);
            state['issuingBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdOn: function(val, state) {
            context["field"] = "createdOn";
            context["metadata"] = (objectMetadata ? objectMetadata["createdOn"] : null);
            state['createdOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issueDate: function(val, state) {
            context["field"] = "issueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
            state['issueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicant: function(val, state) {
            context["field"] = "applicant";
            context["metadata"] = (objectMetadata ? objectMetadata["applicant"] : null);
            state['applicant'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceRequestTime: function(val, state) {
            context["field"] = "serviceRequestTime";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceRequestTime"] : null);
            state['serviceRequestTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        returnedHistory: function(val, state) {
            context["field"] = "returnedHistory";
            context["metadata"] = (objectMetadata ? objectMetadata["returnedHistory"] : null);
            state['returnedHistory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimsSRMSId: function(val, state) {
            context["field"] = "claimsSRMSId";
            context["metadata"] = (objectMetadata ? objectMetadata["claimsSRMSId"] : null);
            state['claimsSRMSId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        guaranteesSRMSId: function(val, state) {
            context["field"] = "guaranteesSRMSId";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteesSRMSId"] : null);
            state['guaranteesSRMSId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        guaranteeSrmsId: function(val, state) {
            context["field"] = "guaranteeSrmsId";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteeSrmsId"] : null);
            state['guaranteeSrmsId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionReference: function(val, state) {
            context["field"] = "transactionReference";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
            state['transactionReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        receivedOn: function(val, state) {
            context["field"] = "receivedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["receivedOn"] : null);
            state['receivedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcType: function(val, state) {
            context["field"] = "lcType";
            context["metadata"] = (objectMetadata ? objectMetadata["lcType"] : null);
            state['lcType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        relatedTransactionReference: function(val, state) {
            context["field"] = "relatedTransactionReference";
            context["metadata"] = (objectMetadata ? objectMetadata["relatedTransactionReference"] : null);
            state['relatedTransactionReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modeOfTransaction: function(val, state) {
            context["field"] = "modeOfTransaction";
            context["metadata"] = (objectMetadata ? objectMetadata["modeOfTransaction"] : null);
            state['modeOfTransaction'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicantParty: function(val, state) {
            context["field"] = "applicantParty";
            context["metadata"] = (objectMetadata ? objectMetadata["applicantParty"] : null);
            state['applicantParty'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryDetails: function(val, state) {
            context["field"] = "beneficiaryDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryDetails"] : null);
            state['beneficiaryDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryConditions: function(val, state) {
            context["field"] = "expiryConditions";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryConditions"] : null);
            state['expiryConditions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expectedIssueDate: function(val, state) {
            context["field"] = "expectedIssueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["expectedIssueDate"] : null);
            state['expectedIssueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        autoExtensionExpiry: function(val, state) {
            context["field"] = "autoExtensionExpiry";
            context["metadata"] = (objectMetadata ? objectMetadata["autoExtensionExpiry"] : null);
            state['autoExtensionExpiry'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        extensionPeriod: function(val, state) {
            context["field"] = "extensionPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["extensionPeriod"] : null);
            state['extensionPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        extensionCapPeriod: function(val, state) {
            context["field"] = "extensionCapPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["extensionCapPeriod"] : null);
            state['extensionCapPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        notificationPeriod: function(val, state) {
            context["field"] = "notificationPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["notificationPeriod"] : null);
            state['notificationPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        extensionDetails: function(val, state) {
            context["field"] = "extensionDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["extensionDetails"] : null);
            state['extensionDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicableRules: function(val, state) {
            context["field"] = "applicableRules";
            context["metadata"] = (objectMetadata ? objectMetadata["applicableRules"] : null);
            state['applicableRules'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        governingLaw: function(val, state) {
            context["field"] = "governingLaw";
            context["metadata"] = (objectMetadata ? objectMetadata["governingLaw"] : null);
            state['governingLaw'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deliveryInstructions: function(val, state) {
            context["field"] = "deliveryInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["deliveryInstructions"] : null);
            state['deliveryInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherInstructions: function(val, state) {
            context["field"] = "otherInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["otherInstructions"] : null);
            state['otherInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicantName: function(val, state) {
            context["field"] = "applicantName";
            context["metadata"] = (objectMetadata ? objectMetadata["applicantName"] : null);
            state['applicantName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicantAddress: function(val, state) {
            context["field"] = "applicantAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["applicantAddress"] : null);
            state['applicantAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuingBankName: function(val, state) {
            context["field"] = "issuingBankName";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingBankName"] : null);
            state['issuingBankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuingBankSwiftBicCode: function(val, state) {
            context["field"] = "issuingBankSwiftBicCode";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingBankSwiftBicCode"] : null);
            state['issuingBankSwiftBicCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuingBankIban: function(val, state) {
            context["field"] = "issuingBankIban";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingBankIban"] : null);
            state['issuingBankIban'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuingBankLocalCode: function(val, state) {
            context["field"] = "issuingBankLocalCode";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingBankLocalCode"] : null);
            state['issuingBankLocalCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuingBankAddress: function(val, state) {
            context["field"] = "issuingBankAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingBankAddress"] : null);
            state['issuingBankAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadedDocuments: function(val, state) {
            context["field"] = "uploadedDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedDocuments"] : null);
            state['uploadedDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        selfAcceptance: function(val, state) {
            context["field"] = "selfAcceptance";
            context["metadata"] = (objectMetadata ? objectMetadata["selfAcceptance"] : null);
            state['selfAcceptance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        selfAcceptanceDate: function(val, state) {
            context["field"] = "selfAcceptanceDate";
            context["metadata"] = (objectMetadata ? objectMetadata["selfAcceptanceDate"] : null);
            state['selfAcceptanceDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForSelfRejection: function(val, state) {
            context["field"] = "reasonForSelfRejection";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForSelfRejection"] : null);
            state['reasonForSelfRejection'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        selfRejectionHistory: function(val, state) {
            context["field"] = "selfRejectionHistory";
            context["metadata"] = (objectMetadata ? objectMetadata["selfRejectionHistory"] : null);
            state['selfRejectionHistory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        clausesAndConditions: function(val, state) {
            context["field"] = "clausesAndConditions";
            context["metadata"] = (objectMetadata ? objectMetadata["clausesAndConditions"] : null);
            state['clausesAndConditions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastAmendmentDetails: function(val, state) {
            context["field"] = "lastAmendmentDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["lastAmendmentDetails"] : null);
            state['lastAmendmentDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentSrmsId: function(val, state) {
            context["field"] = "amendmentSrmsId";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentSrmsId"] : null);
            state['amendmentSrmsId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentNo: function(val, state) {
            context["field"] = "amendmentNo";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
            state['amendmentNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentCharges: function(val, state) {
            context["field"] = "amendmentCharges";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentCharges"] : null);
            state['amendmentCharges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateOfAmountChange: function(val, state) {
            context["field"] = "dateOfAmountChange";
            context["metadata"] = (objectMetadata ? objectMetadata["dateOfAmountChange"] : null);
            state['dateOfAmountChange'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendAmount: function(val, state) {
            context["field"] = "amendAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["amendAmount"] : null);
            state['amendAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendExpiryType: function(val, state) {
            context["field"] = "amendExpiryType";
            context["metadata"] = (objectMetadata ? objectMetadata["amendExpiryType"] : null);
            state['amendExpiryType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendExpiryDate: function(val, state) {
            context["field"] = "amendExpiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["amendExpiryDate"] : null);
            state['amendExpiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendExpiryConditions: function(val, state) {
            context["field"] = "amendExpiryConditions";
            context["metadata"] = (objectMetadata ? objectMetadata["amendExpiryConditions"] : null);
            state['amendExpiryConditions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supportingDocuments: function(val, state) {
            context["field"] = "supportingDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["supportingDocuments"] : null);
            state['supportingDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimInformation: function(val, state) {
            context["field"] = "claimInformation";
            context["metadata"] = (objectMetadata ? objectMetadata["claimInformation"] : null);
            state['claimInformation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherAmendments: function(val, state) {
            context["field"] = "otherAmendments";
            context["metadata"] = (objectMetadata ? objectMetadata["otherAmendments"] : null);
            state['otherAmendments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        utilizedAmount: function(val, state) {
            context["field"] = "utilizedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["utilizedAmount"] : null);
            state['utilizedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        PaymentAdvices: function(val, state) {
            context["field"] = "PaymentAdvices";
            context["metadata"] = (objectMetadata ? objectMetadata["PaymentAdvices"] : null);
            state['PaymentAdvices'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentAdviceReference: function(val, state) {
            context["field"] = "paymentAdviceReference";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentAdviceReference"] : null);
            state['paymentAdviceReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderId: function(val, state) {
            context["field"] = "orderId";
            context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
            state['orderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        adviceName: function(val, state) {
            context["field"] = "adviceName";
            context["metadata"] = (objectMetadata ? objectMetadata["adviceName"] : null);
            state['adviceName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingAmount: function(val, state) {
            context["field"] = "drawingAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingAmount"] : null);
            state['drawingAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiary: function(val, state) {
            context["field"] = "beneficiary";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiary"] : null);
            state['beneficiary'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDate: function(val, state) {
            context["field"] = "paymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
            state['paymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditedAmount: function(val, state) {
            context["field"] = "creditedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["creditedAmount"] : null);
            state['creditedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditedAccount: function(val, state) {
            context["field"] = "creditedAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["creditedAccount"] : null);
            state['creditedAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        charges: function(val, state) {
            context["field"] = "charges";
            context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
            state['charges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        advisingBank: function(val, state) {
            context["field"] = "advisingBank";
            context["metadata"] = (objectMetadata ? objectMetadata["advisingBank"] : null);
            state['advisingBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdDate: function(val, state) {
            context["field"] = "createdDate";
            context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
            state['createdDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        module: function(val, state) {
            context["field"] = "module";
            context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
            state['module'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bCode: function(val, state) {
            context["field"] = "bCode";
            context["metadata"] = (objectMetadata ? objectMetadata["bCode"] : null);
            state['bCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bic: function(val, state) {
            context["field"] = "bic";
            context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
            state['bic'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transferDateOrTime: function(val, state) {
            context["field"] = "transferDateOrTime";
            context["metadata"] = (objectMetadata ? objectMetadata["transferDateOrTime"] : null);
            state['transferDateOrTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        type: function(val, state) {
            context["field"] = "type";
            context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
            state['type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestedDateOfIssue: function(val, state) {
            context["field"] = "requestedDateOfIssue";
            context["metadata"] = (objectMetadata ? objectMetadata["requestedDateOfIssue"] : null);
            state['requestedDateOfIssue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        formOfUndertaking: function(val, state) {
            context["field"] = "formOfUndertaking";
            context["metadata"] = (objectMetadata ? objectMetadata["formOfUndertaking"] : null);
            state['formOfUndertaking'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        typeOfUndertaking: function(val, state) {
            context["field"] = "typeOfUndertaking";
            context["metadata"] = (objectMetadata ? objectMetadata["typeOfUndertaking"] : null);
            state['typeOfUndertaking'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateOfExpiry: function(val, state) {
            context["field"] = "dateOfExpiry";
            context["metadata"] = (objectMetadata ? objectMetadata["dateOfExpiry"] : null);
            state['dateOfExpiry'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryConditionOrEvent: function(val, state) {
            context["field"] = "expiryConditionOrEvent";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryConditionOrEvent"] : null);
            state['expiryConditionOrEvent'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        obligorOrInstructingParty: function(val, state) {
            context["field"] = "obligorOrInstructingParty";
            context["metadata"] = (objectMetadata ? objectMetadata["obligorOrInstructingParty"] : null);
            state['obligorOrInstructingParty'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuer: function(val, state) {
            context["field"] = "issuer";
            context["metadata"] = (objectMetadata ? objectMetadata["issuer"] : null);
            state['issuer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        undertakingAmount: function(val, state) {
            context["field"] = "undertakingAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["undertakingAmount"] : null);
            state['undertakingAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        additionalAmountInformation: function(val, state) {
            context["field"] = "additionalAmountInformation";
            context["metadata"] = (objectMetadata ? objectMetadata["additionalAmountInformation"] : null);
            state['additionalAmountInformation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableWith: function(val, state) {
            context["field"] = "availableWith";
            context["metadata"] = (objectMetadata ? objectMetadata["availableWith"] : null);
            state['availableWith'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentAndPresentationInstructions: function(val, state) {
            context["field"] = "documentAndPresentationInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["documentAndPresentationInstructions"] : null);
            state['documentAndPresentationInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestedLocalUndertakingTermsAndConditions: function(val, state) {
            context["field"] = "requestedLocalUndertakingTermsAndConditions";
            context["metadata"] = (objectMetadata ? objectMetadata["requestedLocalUndertakingTermsAndConditions"] : null);
            state['requestedLocalUndertakingTermsAndConditions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        standardWordingRequired: function(val, state) {
            context["field"] = "standardWordingRequired";
            context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequired"] : null);
            state['standardWordingRequired'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        standardWordingRequestedLanguage: function(val, state) {
            context["field"] = "standardWordingRequestedLanguage";
            context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequestedLanguage"] : null);
            state['standardWordingRequestedLanguage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        governingLawAndOrPlaceOfJurisdiction: function(val, state) {
            context["field"] = "governingLawAndOrPlaceOfJurisdiction";
            context["metadata"] = (objectMetadata ? objectMetadata["governingLawAndOrPlaceOfJurisdiction"] : null);
            state['governingLawAndOrPlaceOfJurisdiction'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        automaticExtensionPeriod: function(val, state) {
            context["field"] = "automaticExtensionPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionPeriod"] : null);
            state['automaticExtensionPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        automaticExtensionNonExtensionPeriod: function(val, state) {
            context["field"] = "automaticExtensionNonExtensionPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNonExtensionPeriod"] : null);
            state['automaticExtensionNonExtensionPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        automaticExtensionNotificationPeriod: function(val, state) {
            context["field"] = "automaticExtensionNotificationPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNotificationPeriod"] : null);
            state['automaticExtensionNotificationPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        automaticExtensionFinalExpiryDate: function(val, state) {
            context["field"] = "automaticExtensionFinalExpiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionFinalExpiryDate"] : null);
            state['automaticExtensionFinalExpiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        demandIndicator: function(val, state) {
            context["field"] = "demandIndicator";
            context["metadata"] = (objectMetadata ? objectMetadata["demandIndicator"] : null);
            state['demandIndicator'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transferIndicator: function(val, state) {
            context["field"] = "transferIndicator";
            context["metadata"] = (objectMetadata ? objectMetadata["transferIndicator"] : null);
            state['transferIndicator'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transferConditions: function(val, state) {
            context["field"] = "transferConditions";
            context["metadata"] = (objectMetadata ? objectMetadata["transferConditions"] : null);
            state['transferConditions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        underlyingTransactionDetails: function(val, state) {
            context["field"] = "underlyingTransactionDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["underlyingTransactionDetails"] : null);
            state['underlyingTransactionDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deliveryOfLocalUndertaking: function(val, state) {
            context["field"] = "deliveryOfLocalUndertaking";
            context["metadata"] = (objectMetadata ? objectMetadata["deliveryOfLocalUndertaking"] : null);
            state['deliveryOfLocalUndertaking'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deliveryToOrCollectionBy: function(val, state) {
            context["field"] = "deliveryToOrCollectionBy";
            context["metadata"] = (objectMetadata ? objectMetadata["deliveryToOrCollectionBy"] : null);
            state['deliveryToOrCollectionBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        SwiftMessages: function(val, state) {
            context["field"] = "SwiftMessages";
            context["metadata"] = (objectMetadata ? objectMetadata["SwiftMessages"] : null);
            state['SwiftMessages'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        newSequence: function(val, state) {
            context["field"] = "newSequence";
            context["metadata"] = (objectMetadata ? objectMetadata["newSequence"] : null);
            state['newSequence'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        demandAcceptance: function(val, state) {
            context["field"] = "demandAcceptance";
            context["metadata"] = (objectMetadata ? objectMetadata["demandAcceptance"] : null);
            state['demandAcceptance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        liabilityDetails: function(val, state) {
            context["field"] = "liabilityDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["liabilityDetails"] : null);
            state['liabilityDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        releasedAmount: function(val, state) {
            context["field"] = "releasedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["releasedAmount"] : null);
            state['releasedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ReceivedGuarantees(defaultValues) {
        var privateState = {};
        context["field"] = "claimCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["claimCurrency"] : null);
        privateState.claimCurrency = defaultValues ?
            (defaultValues["claimCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimCurrency"], context) :
                null) :
            null;

        context["field"] = "claimAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["claimAmount"] : null);
        privateState.claimAmount = defaultValues ?
            (defaultValues["claimAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimAmount"], context) :
                null) :
            null;

        context["field"] = "claimCreditAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["claimCreditAccount"] : null);
        privateState.claimCreditAccount = defaultValues ?
            (defaultValues["claimCreditAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimCreditAccount"], context) :
                null) :
            null;

        context["field"] = "chargesDebitAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["chargesDebitAccount"] : null);
        privateState.chargesDebitAccount = defaultValues ?
            (defaultValues["chargesDebitAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chargesDebitAccount"], context) :
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

        context["field"] = "documentInformation";
        context["metadata"] = (objectMetadata ? objectMetadata["documentInformation"] : null);
        privateState.documentInformation = defaultValues ?
            (defaultValues["documentInformation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentInformation"], context) :
                null) :
            null;

        context["field"] = "physicalDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["physicalDocuments"] : null);
        privateState.physicalDocuments = defaultValues ?
            (defaultValues["physicalDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["physicalDocuments"], context) :
                null) :
            null;

        context["field"] = "forwardDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["forwardDocuments"] : null);
        privateState.forwardDocuments = defaultValues ?
            (defaultValues["forwardDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["forwardDocuments"], context) :
                null) :
            null;

        context["field"] = "otherDemandDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["otherDemandDetails"] : null);
        privateState.otherDemandDetails = defaultValues ?
            (defaultValues["otherDemandDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherDemandDetails"], context) :
                null) :
            null;

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "paymentSettledDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentSettledDate"] : null);
        privateState.paymentSettledDate = defaultValues ?
            (defaultValues["paymentSettledDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentSettledDate"], context) :
                null) :
            null;

        context["field"] = "documentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
        privateState.documentStatus = defaultValues ?
            (defaultValues["documentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentStatus"], context) :
                null) :
            null;

        context["field"] = "totalDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["totalDocuments"] : null);
        privateState.totalDocuments = defaultValues ?
            (defaultValues["totalDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalDocuments"], context) :
                null) :
            null;

        context["field"] = "returnedDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["returnedDocuments"] : null);
        privateState.returnedDocuments = defaultValues ?
            (defaultValues["returnedDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["returnedDocuments"], context) :
                null) :
            null;

        context["field"] = "messageFromBank";
        context["metadata"] = (objectMetadata ? objectMetadata["messageFromBank"] : null);
        privateState.messageFromBank = defaultValues ?
            (defaultValues["messageFromBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageFromBank"], context) :
                null) :
            null;

        context["field"] = "reasonForReturn";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
        privateState.reasonForReturn = defaultValues ?
            (defaultValues["reasonForReturn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForReturn"], context) :
                null) :
            null;

        context["field"] = "discrepancies";
        context["metadata"] = (objectMetadata ? objectMetadata["discrepancies"] : null);
        privateState.discrepancies = defaultValues ?
            (defaultValues["discrepancies"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["discrepancies"], context) :
                null) :
            null;

        context["field"] = "returnMessageToBank";
        context["metadata"] = (objectMetadata ? objectMetadata["returnMessageToBank"] : null);
        privateState.returnMessageToBank = defaultValues ?
            (defaultValues["returnMessageToBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["returnMessageToBank"], context) :
                null) :
            null;

        context["field"] = "messageToBank";
        context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
        privateState.messageToBank = defaultValues ?
            (defaultValues["messageToBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageToBank"], context) :
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

        context["field"] = "guaranteesReferenceNo";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteesReferenceNo"] : null);
        privateState.guaranteesReferenceNo = defaultValues ?
            (defaultValues["guaranteesReferenceNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteesReferenceNo"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
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

        context["field"] = "issuingBank";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingBank"] : null);
        privateState.issuingBank = defaultValues ?
            (defaultValues["issuingBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingBank"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "createdOn";
        context["metadata"] = (objectMetadata ? objectMetadata["createdOn"] : null);
        privateState.createdOn = defaultValues ?
            (defaultValues["createdOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdOn"], context) :
                null) :
            null;

        context["field"] = "issueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
        privateState.issueDate = defaultValues ?
            (defaultValues["issueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issueDate"], context) :
                null) :
            null;

        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
                null) :
            null;

        context["field"] = "applicant";
        context["metadata"] = (objectMetadata ? objectMetadata["applicant"] : null);
        privateState.applicant = defaultValues ?
            (defaultValues["applicant"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicant"], context) :
                null) :
            null;

        context["field"] = "serviceRequestTime";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceRequestTime"] : null);
        privateState.serviceRequestTime = defaultValues ?
            (defaultValues["serviceRequestTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceRequestTime"], context) :
                null) :
            null;

        context["field"] = "returnedHistory";
        context["metadata"] = (objectMetadata ? objectMetadata["returnedHistory"] : null);
        privateState.returnedHistory = defaultValues ?
            (defaultValues["returnedHistory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["returnedHistory"], context) :
                null) :
            null;

        context["field"] = "claimsSRMSId";
        context["metadata"] = (objectMetadata ? objectMetadata["claimsSRMSId"] : null);
        privateState.claimsSRMSId = defaultValues ?
            (defaultValues["claimsSRMSId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimsSRMSId"], context) :
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

        context["field"] = "guaranteesSRMSId";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteesSRMSId"] : null);
        privateState.guaranteesSRMSId = defaultValues ?
            (defaultValues["guaranteesSRMSId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteesSRMSId"], context) :
                null) :
            null;

        context["field"] = "guaranteeSrmsId";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteeSrmsId"] : null);
        privateState.guaranteeSrmsId = defaultValues ?
            (defaultValues["guaranteeSrmsId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteeSrmsId"], context) :
                null) :
            null;

        context["field"] = "transactionReference";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
        privateState.transactionReference = defaultValues ?
            (defaultValues["transactionReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionReference"], context) :
                null) :
            null;

        context["field"] = "receivedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["receivedOn"] : null);
        privateState.receivedOn = defaultValues ?
            (defaultValues["receivedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["receivedOn"], context) :
                null) :
            null;

        context["field"] = "lcType";
        context["metadata"] = (objectMetadata ? objectMetadata["lcType"] : null);
        privateState.lcType = defaultValues ?
            (defaultValues["lcType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcType"], context) :
                null) :
            null;

        context["field"] = "relatedTransactionReference";
        context["metadata"] = (objectMetadata ? objectMetadata["relatedTransactionReference"] : null);
        privateState.relatedTransactionReference = defaultValues ?
            (defaultValues["relatedTransactionReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["relatedTransactionReference"], context) :
                null) :
            null;

        context["field"] = "modeOfTransaction";
        context["metadata"] = (objectMetadata ? objectMetadata["modeOfTransaction"] : null);
        privateState.modeOfTransaction = defaultValues ?
            (defaultValues["modeOfTransaction"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modeOfTransaction"], context) :
                null) :
            null;

        context["field"] = "applicantParty";
        context["metadata"] = (objectMetadata ? objectMetadata["applicantParty"] : null);
        privateState.applicantParty = defaultValues ?
            (defaultValues["applicantParty"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicantParty"], context) :
                null) :
            null;

        context["field"] = "beneficiaryDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryDetails"] : null);
        privateState.beneficiaryDetails = defaultValues ?
            (defaultValues["beneficiaryDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryDetails"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "expiryConditions";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryConditions"] : null);
        privateState.expiryConditions = defaultValues ?
            (defaultValues["expiryConditions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryConditions"], context) :
                null) :
            null;

        context["field"] = "expectedIssueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["expectedIssueDate"] : null);
        privateState.expectedIssueDate = defaultValues ?
            (defaultValues["expectedIssueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expectedIssueDate"], context) :
                null) :
            null;

        context["field"] = "autoExtensionExpiry";
        context["metadata"] = (objectMetadata ? objectMetadata["autoExtensionExpiry"] : null);
        privateState.autoExtensionExpiry = defaultValues ?
            (defaultValues["autoExtensionExpiry"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["autoExtensionExpiry"], context) :
                null) :
            null;

        context["field"] = "extensionPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["extensionPeriod"] : null);
        privateState.extensionPeriod = defaultValues ?
            (defaultValues["extensionPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["extensionPeriod"], context) :
                null) :
            null;

        context["field"] = "extensionCapPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["extensionCapPeriod"] : null);
        privateState.extensionCapPeriod = defaultValues ?
            (defaultValues["extensionCapPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["extensionCapPeriod"], context) :
                null) :
            null;

        context["field"] = "notificationPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["notificationPeriod"] : null);
        privateState.notificationPeriod = defaultValues ?
            (defaultValues["notificationPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["notificationPeriod"], context) :
                null) :
            null;

        context["field"] = "extensionDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["extensionDetails"] : null);
        privateState.extensionDetails = defaultValues ?
            (defaultValues["extensionDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["extensionDetails"], context) :
                null) :
            null;

        context["field"] = "applicableRules";
        context["metadata"] = (objectMetadata ? objectMetadata["applicableRules"] : null);
        privateState.applicableRules = defaultValues ?
            (defaultValues["applicableRules"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicableRules"], context) :
                null) :
            null;

        context["field"] = "governingLaw";
        context["metadata"] = (objectMetadata ? objectMetadata["governingLaw"] : null);
        privateState.governingLaw = defaultValues ?
            (defaultValues["governingLaw"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["governingLaw"], context) :
                null) :
            null;

        context["field"] = "deliveryInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["deliveryInstructions"] : null);
        privateState.deliveryInstructions = defaultValues ?
            (defaultValues["deliveryInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deliveryInstructions"], context) :
                null) :
            null;

        context["field"] = "otherInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["otherInstructions"] : null);
        privateState.otherInstructions = defaultValues ?
            (defaultValues["otherInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherInstructions"], context) :
                null) :
            null;

        context["field"] = "applicantName";
        context["metadata"] = (objectMetadata ? objectMetadata["applicantName"] : null);
        privateState.applicantName = defaultValues ?
            (defaultValues["applicantName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicantName"], context) :
                null) :
            null;

        context["field"] = "applicantAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["applicantAddress"] : null);
        privateState.applicantAddress = defaultValues ?
            (defaultValues["applicantAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicantAddress"], context) :
                null) :
            null;

        context["field"] = "issuingBankName";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingBankName"] : null);
        privateState.issuingBankName = defaultValues ?
            (defaultValues["issuingBankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingBankName"], context) :
                null) :
            null;

        context["field"] = "issuingBankSwiftBicCode";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingBankSwiftBicCode"] : null);
        privateState.issuingBankSwiftBicCode = defaultValues ?
            (defaultValues["issuingBankSwiftBicCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingBankSwiftBicCode"], context) :
                null) :
            null;

        context["field"] = "issuingBankIban";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingBankIban"] : null);
        privateState.issuingBankIban = defaultValues ?
            (defaultValues["issuingBankIban"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingBankIban"], context) :
                null) :
            null;

        context["field"] = "issuingBankLocalCode";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingBankLocalCode"] : null);
        privateState.issuingBankLocalCode = defaultValues ?
            (defaultValues["issuingBankLocalCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingBankLocalCode"], context) :
                null) :
            null;

        context["field"] = "issuingBankAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingBankAddress"] : null);
        privateState.issuingBankAddress = defaultValues ?
            (defaultValues["issuingBankAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingBankAddress"], context) :
                null) :
            null;

        context["field"] = "uploadedDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedDocuments"] : null);
        privateState.uploadedDocuments = defaultValues ?
            (defaultValues["uploadedDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedDocuments"], context) :
                null) :
            null;

        context["field"] = "selfAcceptance";
        context["metadata"] = (objectMetadata ? objectMetadata["selfAcceptance"] : null);
        privateState.selfAcceptance = defaultValues ?
            (defaultValues["selfAcceptance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["selfAcceptance"], context) :
                null) :
            null;

        context["field"] = "selfAcceptanceDate";
        context["metadata"] = (objectMetadata ? objectMetadata["selfAcceptanceDate"] : null);
        privateState.selfAcceptanceDate = defaultValues ?
            (defaultValues["selfAcceptanceDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["selfAcceptanceDate"], context) :
                null) :
            null;

        context["field"] = "reasonForSelfRejection";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForSelfRejection"] : null);
        privateState.reasonForSelfRejection = defaultValues ?
            (defaultValues["reasonForSelfRejection"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForSelfRejection"], context) :
                null) :
            null;

        context["field"] = "selfRejectionHistory";
        context["metadata"] = (objectMetadata ? objectMetadata["selfRejectionHistory"] : null);
        privateState.selfRejectionHistory = defaultValues ?
            (defaultValues["selfRejectionHistory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["selfRejectionHistory"], context) :
                null) :
            null;

        context["field"] = "clausesAndConditions";
        context["metadata"] = (objectMetadata ? objectMetadata["clausesAndConditions"] : null);
        privateState.clausesAndConditions = defaultValues ?
            (defaultValues["clausesAndConditions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["clausesAndConditions"], context) :
                null) :
            null;

        context["field"] = "lastAmendmentDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["lastAmendmentDetails"] : null);
        privateState.lastAmendmentDetails = defaultValues ?
            (defaultValues["lastAmendmentDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastAmendmentDetails"], context) :
                null) :
            null;

        context["field"] = "amendmentSrmsId";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentSrmsId"] : null);
        privateState.amendmentSrmsId = defaultValues ?
            (defaultValues["amendmentSrmsId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentSrmsId"], context) :
                null) :
            null;

        context["field"] = "amendmentNo";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
        privateState.amendmentNo = defaultValues ?
            (defaultValues["amendmentNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentNo"], context) :
                null) :
            null;

        context["field"] = "amendmentCharges";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentCharges"] : null);
        privateState.amendmentCharges = defaultValues ?
            (defaultValues["amendmentCharges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentCharges"], context) :
                null) :
            null;

        context["field"] = "dateOfAmountChange";
        context["metadata"] = (objectMetadata ? objectMetadata["dateOfAmountChange"] : null);
        privateState.dateOfAmountChange = defaultValues ?
            (defaultValues["dateOfAmountChange"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateOfAmountChange"], context) :
                null) :
            null;

        context["field"] = "amendAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["amendAmount"] : null);
        privateState.amendAmount = defaultValues ?
            (defaultValues["amendAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendAmount"], context) :
                null) :
            null;

        context["field"] = "amendExpiryType";
        context["metadata"] = (objectMetadata ? objectMetadata["amendExpiryType"] : null);
        privateState.amendExpiryType = defaultValues ?
            (defaultValues["amendExpiryType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendExpiryType"], context) :
                null) :
            null;

        context["field"] = "amendExpiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["amendExpiryDate"] : null);
        privateState.amendExpiryDate = defaultValues ?
            (defaultValues["amendExpiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendExpiryDate"], context) :
                null) :
            null;

        context["field"] = "amendExpiryConditions";
        context["metadata"] = (objectMetadata ? objectMetadata["amendExpiryConditions"] : null);
        privateState.amendExpiryConditions = defaultValues ?
            (defaultValues["amendExpiryConditions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendExpiryConditions"], context) :
                null) :
            null;

        context["field"] = "supportingDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["supportingDocuments"] : null);
        privateState.supportingDocuments = defaultValues ?
            (defaultValues["supportingDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supportingDocuments"], context) :
                null) :
            null;

        context["field"] = "claimInformation";
        context["metadata"] = (objectMetadata ? objectMetadata["claimInformation"] : null);
        privateState.claimInformation = defaultValues ?
            (defaultValues["claimInformation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimInformation"], context) :
                null) :
            null;

        context["field"] = "otherAmendments";
        context["metadata"] = (objectMetadata ? objectMetadata["otherAmendments"] : null);
        privateState.otherAmendments = defaultValues ?
            (defaultValues["otherAmendments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherAmendments"], context) :
                null) :
            null;

        context["field"] = "utilizedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["utilizedAmount"] : null);
        privateState.utilizedAmount = defaultValues ?
            (defaultValues["utilizedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["utilizedAmount"], context) :
                null) :
            null;

        context["field"] = "PaymentAdvices";
        context["metadata"] = (objectMetadata ? objectMetadata["PaymentAdvices"] : null);
        privateState.PaymentAdvices = defaultValues ?
            (defaultValues["PaymentAdvices"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["PaymentAdvices"], context) :
                null) :
            null;

        context["field"] = "paymentAdviceReference";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentAdviceReference"] : null);
        privateState.paymentAdviceReference = defaultValues ?
            (defaultValues["paymentAdviceReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentAdviceReference"], context) :
                null) :
            null;

        context["field"] = "orderId";
        context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
        privateState.orderId = defaultValues ?
            (defaultValues["orderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderId"], context) :
                null) :
            null;

        context["field"] = "adviceName";
        context["metadata"] = (objectMetadata ? objectMetadata["adviceName"] : null);
        privateState.adviceName = defaultValues ?
            (defaultValues["adviceName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["adviceName"], context) :
                null) :
            null;

        context["field"] = "drawingAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingAmount"] : null);
        privateState.drawingAmount = defaultValues ?
            (defaultValues["drawingAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingAmount"], context) :
                null) :
            null;

        context["field"] = "beneficiary";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiary"] : null);
        privateState.beneficiary = defaultValues ?
            (defaultValues["beneficiary"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiary"], context) :
                null) :
            null;

        context["field"] = "paymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
        privateState.paymentDate = defaultValues ?
            (defaultValues["paymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDate"], context) :
                null) :
            null;

        context["field"] = "creditedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["creditedAmount"] : null);
        privateState.creditedAmount = defaultValues ?
            (defaultValues["creditedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditedAmount"], context) :
                null) :
            null;

        context["field"] = "creditedAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["creditedAccount"] : null);
        privateState.creditedAccount = defaultValues ?
            (defaultValues["creditedAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditedAccount"], context) :
                null) :
            null;

        context["field"] = "charges";
        context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
        privateState.charges = defaultValues ?
            (defaultValues["charges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["charges"], context) :
                null) :
            null;

        context["field"] = "advisingBank";
        context["metadata"] = (objectMetadata ? objectMetadata["advisingBank"] : null);
        privateState.advisingBank = defaultValues ?
            (defaultValues["advisingBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["advisingBank"], context) :
                null) :
            null;

        context["field"] = "createdDate";
        context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
        privateState.createdDate = defaultValues ?
            (defaultValues["createdDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdDate"], context) :
                null) :
            null;

        context["field"] = "module";
        context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
        privateState.module = defaultValues ?
            (defaultValues["module"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["module"], context) :
                null) :
            null;

        context["field"] = "bCode";
        context["metadata"] = (objectMetadata ? objectMetadata["bCode"] : null);
        privateState.bCode = defaultValues ?
            (defaultValues["bCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bCode"], context) :
                null) :
            null;

        context["field"] = "bic";
        context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
        privateState.bic = defaultValues ?
            (defaultValues["bic"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bic"], context) :
                null) :
            null;

        context["field"] = "transferDateOrTime";
        context["metadata"] = (objectMetadata ? objectMetadata["transferDateOrTime"] : null);
        privateState.transferDateOrTime = defaultValues ?
            (defaultValues["transferDateOrTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transferDateOrTime"], context) :
                null) :
            null;

        context["field"] = "type";
        context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
        privateState.type = defaultValues ?
            (defaultValues["type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["type"], context) :
                null) :
            null;

        context["field"] = "requestedDateOfIssue";
        context["metadata"] = (objectMetadata ? objectMetadata["requestedDateOfIssue"] : null);
        privateState.requestedDateOfIssue = defaultValues ?
            (defaultValues["requestedDateOfIssue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestedDateOfIssue"], context) :
                null) :
            null;

        context["field"] = "formOfUndertaking";
        context["metadata"] = (objectMetadata ? objectMetadata["formOfUndertaking"] : null);
        privateState.formOfUndertaking = defaultValues ?
            (defaultValues["formOfUndertaking"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["formOfUndertaking"], context) :
                null) :
            null;

        context["field"] = "typeOfUndertaking";
        context["metadata"] = (objectMetadata ? objectMetadata["typeOfUndertaking"] : null);
        privateState.typeOfUndertaking = defaultValues ?
            (defaultValues["typeOfUndertaking"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["typeOfUndertaking"], context) :
                null) :
            null;

        context["field"] = "dateOfExpiry";
        context["metadata"] = (objectMetadata ? objectMetadata["dateOfExpiry"] : null);
        privateState.dateOfExpiry = defaultValues ?
            (defaultValues["dateOfExpiry"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateOfExpiry"], context) :
                null) :
            null;

        context["field"] = "expiryConditionOrEvent";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryConditionOrEvent"] : null);
        privateState.expiryConditionOrEvent = defaultValues ?
            (defaultValues["expiryConditionOrEvent"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryConditionOrEvent"], context) :
                null) :
            null;

        context["field"] = "obligorOrInstructingParty";
        context["metadata"] = (objectMetadata ? objectMetadata["obligorOrInstructingParty"] : null);
        privateState.obligorOrInstructingParty = defaultValues ?
            (defaultValues["obligorOrInstructingParty"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["obligorOrInstructingParty"], context) :
                null) :
            null;

        context["field"] = "issuer";
        context["metadata"] = (objectMetadata ? objectMetadata["issuer"] : null);
        privateState.issuer = defaultValues ?
            (defaultValues["issuer"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuer"], context) :
                null) :
            null;

        context["field"] = "undertakingAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["undertakingAmount"] : null);
        privateState.undertakingAmount = defaultValues ?
            (defaultValues["undertakingAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["undertakingAmount"], context) :
                null) :
            null;

        context["field"] = "additionalAmountInformation";
        context["metadata"] = (objectMetadata ? objectMetadata["additionalAmountInformation"] : null);
        privateState.additionalAmountInformation = defaultValues ?
            (defaultValues["additionalAmountInformation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["additionalAmountInformation"], context) :
                null) :
            null;

        context["field"] = "availableWith";
        context["metadata"] = (objectMetadata ? objectMetadata["availableWith"] : null);
        privateState.availableWith = defaultValues ?
            (defaultValues["availableWith"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableWith"], context) :
                null) :
            null;

        context["field"] = "documentAndPresentationInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["documentAndPresentationInstructions"] : null);
        privateState.documentAndPresentationInstructions = defaultValues ?
            (defaultValues["documentAndPresentationInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentAndPresentationInstructions"], context) :
                null) :
            null;

        context["field"] = "requestedLocalUndertakingTermsAndConditions";
        context["metadata"] = (objectMetadata ? objectMetadata["requestedLocalUndertakingTermsAndConditions"] : null);
        privateState.requestedLocalUndertakingTermsAndConditions = defaultValues ?
            (defaultValues["requestedLocalUndertakingTermsAndConditions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestedLocalUndertakingTermsAndConditions"], context) :
                null) :
            null;

        context["field"] = "standardWordingRequired";
        context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequired"] : null);
        privateState.standardWordingRequired = defaultValues ?
            (defaultValues["standardWordingRequired"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["standardWordingRequired"], context) :
                null) :
            null;

        context["field"] = "standardWordingRequestedLanguage";
        context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequestedLanguage"] : null);
        privateState.standardWordingRequestedLanguage = defaultValues ?
            (defaultValues["standardWordingRequestedLanguage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["standardWordingRequestedLanguage"], context) :
                null) :
            null;

        context["field"] = "governingLawAndOrPlaceOfJurisdiction";
        context["metadata"] = (objectMetadata ? objectMetadata["governingLawAndOrPlaceOfJurisdiction"] : null);
        privateState.governingLawAndOrPlaceOfJurisdiction = defaultValues ?
            (defaultValues["governingLawAndOrPlaceOfJurisdiction"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["governingLawAndOrPlaceOfJurisdiction"], context) :
                null) :
            null;

        context["field"] = "automaticExtensionPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionPeriod"] : null);
        privateState.automaticExtensionPeriod = defaultValues ?
            (defaultValues["automaticExtensionPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["automaticExtensionPeriod"], context) :
                null) :
            null;

        context["field"] = "automaticExtensionNonExtensionPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNonExtensionPeriod"] : null);
        privateState.automaticExtensionNonExtensionPeriod = defaultValues ?
            (defaultValues["automaticExtensionNonExtensionPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["automaticExtensionNonExtensionPeriod"], context) :
                null) :
            null;

        context["field"] = "automaticExtensionNotificationPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNotificationPeriod"] : null);
        privateState.automaticExtensionNotificationPeriod = defaultValues ?
            (defaultValues["automaticExtensionNotificationPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["automaticExtensionNotificationPeriod"], context) :
                null) :
            null;

        context["field"] = "automaticExtensionFinalExpiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionFinalExpiryDate"] : null);
        privateState.automaticExtensionFinalExpiryDate = defaultValues ?
            (defaultValues["automaticExtensionFinalExpiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["automaticExtensionFinalExpiryDate"], context) :
                null) :
            null;

        context["field"] = "demandIndicator";
        context["metadata"] = (objectMetadata ? objectMetadata["demandIndicator"] : null);
        privateState.demandIndicator = defaultValues ?
            (defaultValues["demandIndicator"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["demandIndicator"], context) :
                null) :
            null;

        context["field"] = "transferIndicator";
        context["metadata"] = (objectMetadata ? objectMetadata["transferIndicator"] : null);
        privateState.transferIndicator = defaultValues ?
            (defaultValues["transferIndicator"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transferIndicator"], context) :
                null) :
            null;

        context["field"] = "transferConditions";
        context["metadata"] = (objectMetadata ? objectMetadata["transferConditions"] : null);
        privateState.transferConditions = defaultValues ?
            (defaultValues["transferConditions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transferConditions"], context) :
                null) :
            null;

        context["field"] = "underlyingTransactionDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["underlyingTransactionDetails"] : null);
        privateState.underlyingTransactionDetails = defaultValues ?
            (defaultValues["underlyingTransactionDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["underlyingTransactionDetails"], context) :
                null) :
            null;

        context["field"] = "deliveryOfLocalUndertaking";
        context["metadata"] = (objectMetadata ? objectMetadata["deliveryOfLocalUndertaking"] : null);
        privateState.deliveryOfLocalUndertaking = defaultValues ?
            (defaultValues["deliveryOfLocalUndertaking"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deliveryOfLocalUndertaking"], context) :
                null) :
            null;

        context["field"] = "deliveryToOrCollectionBy";
        context["metadata"] = (objectMetadata ? objectMetadata["deliveryToOrCollectionBy"] : null);
        privateState.deliveryToOrCollectionBy = defaultValues ?
            (defaultValues["deliveryToOrCollectionBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deliveryToOrCollectionBy"], context) :
                null) :
            null;

        context["field"] = "SwiftMessages";
        context["metadata"] = (objectMetadata ? objectMetadata["SwiftMessages"] : null);
        privateState.SwiftMessages = defaultValues ?
            (defaultValues["SwiftMessages"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["SwiftMessages"], context) :
                null) :
            null;

        context["field"] = "newSequence";
        context["metadata"] = (objectMetadata ? objectMetadata["newSequence"] : null);
        privateState.newSequence = defaultValues ?
            (defaultValues["newSequence"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["newSequence"], context) :
                null) :
            null;

        context["field"] = "demandAcceptance";
        context["metadata"] = (objectMetadata ? objectMetadata["demandAcceptance"] : null);
        privateState.demandAcceptance = defaultValues ?
            (defaultValues["demandAcceptance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["demandAcceptance"], context) :
                null) :
            null;

        context["field"] = "liabilityDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["liabilityDetails"] : null);
        privateState.liabilityDetails = defaultValues ?
            (defaultValues["liabilityDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["liabilityDetails"], context) :
                null) :
            null;

        context["field"] = "releasedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["releasedAmount"] : null);
        privateState.releasedAmount = defaultValues ?
            (defaultValues["releasedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["releasedAmount"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "claimCreditAccount": {
                get: function() {
                    context["field"] = "claimCreditAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["claimCreditAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.claimCreditAccount, context);
                },
                set: function(val) {
                    setterFunctions['claimCreditAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chargesDebitAccount": {
                get: function() {
                    context["field"] = "chargesDebitAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["chargesDebitAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chargesDebitAccount, context);
                },
                set: function(val) {
                    setterFunctions['chargesDebitAccount'].call(this, val, privateState);
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
            "documentInformation": {
                get: function() {
                    context["field"] = "documentInformation";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentInformation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentInformation, context);
                },
                set: function(val) {
                    setterFunctions['documentInformation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "physicalDocuments": {
                get: function() {
                    context["field"] = "physicalDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["physicalDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.physicalDocuments, context);
                },
                set: function(val) {
                    setterFunctions['physicalDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "forwardDocuments": {
                get: function() {
                    context["field"] = "forwardDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["forwardDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.forwardDocuments, context);
                },
                set: function(val) {
                    setterFunctions['forwardDocuments'].call(this, val, privateState);
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
            "paymentSettledDate": {
                get: function() {
                    context["field"] = "paymentSettledDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentSettledDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentSettledDate, context);
                },
                set: function(val) {
                    setterFunctions['paymentSettledDate'].call(this, val, privateState);
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
            "totalDocuments": {
                get: function() {
                    context["field"] = "totalDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalDocuments, context);
                },
                set: function(val) {
                    setterFunctions['totalDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "returnedDocuments": {
                get: function() {
                    context["field"] = "returnedDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["returnedDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.returnedDocuments, context);
                },
                set: function(val) {
                    setterFunctions['returnedDocuments'].call(this, val, privateState);
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
            "discrepancies": {
                get: function() {
                    context["field"] = "discrepancies";
                    context["metadata"] = (objectMetadata ? objectMetadata["discrepancies"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.discrepancies, context);
                },
                set: function(val) {
                    setterFunctions['discrepancies'].call(this, val, privateState);
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
            "guaranteesReferenceNo": {
                get: function() {
                    context["field"] = "guaranteesReferenceNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["guaranteesReferenceNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.guaranteesReferenceNo, context);
                },
                set: function(val) {
                    setterFunctions['guaranteesReferenceNo'].call(this, val, privateState);
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
            "issuingBank": {
                get: function() {
                    context["field"] = "issuingBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuingBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuingBank, context);
                },
                set: function(val) {
                    setterFunctions['issuingBank'].call(this, val, privateState);
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
            "createdOn": {
                get: function() {
                    context["field"] = "createdOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdOn, context);
                },
                set: function(val) {
                    setterFunctions['createdOn'].call(this, val, privateState);
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
            "applicant": {
                get: function() {
                    context["field"] = "applicant";
                    context["metadata"] = (objectMetadata ? objectMetadata["applicant"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.applicant, context);
                },
                set: function(val) {
                    setterFunctions['applicant'].call(this, val, privateState);
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
            "returnedHistory": {
                get: function() {
                    context["field"] = "returnedHistory";
                    context["metadata"] = (objectMetadata ? objectMetadata["returnedHistory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.returnedHistory, context);
                },
                set: function(val) {
                    setterFunctions['returnedHistory'].call(this, val, privateState);
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
            "lcType": {
                get: function() {
                    context["field"] = "lcType";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcType, context);
                },
                set: function(val) {
                    setterFunctions['lcType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "relatedTransactionReference": {
                get: function() {
                    context["field"] = "relatedTransactionReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["relatedTransactionReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.relatedTransactionReference, context);
                },
                set: function(val) {
                    setterFunctions['relatedTransactionReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "modeOfTransaction": {
                get: function() {
                    context["field"] = "modeOfTransaction";
                    context["metadata"] = (objectMetadata ? objectMetadata["modeOfTransaction"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.modeOfTransaction, context);
                },
                set: function(val) {
                    setterFunctions['modeOfTransaction'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "applicantParty": {
                get: function() {
                    context["field"] = "applicantParty";
                    context["metadata"] = (objectMetadata ? objectMetadata["applicantParty"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.applicantParty, context);
                },
                set: function(val) {
                    setterFunctions['applicantParty'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryDetails": {
                get: function() {
                    context["field"] = "beneficiaryDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryDetails, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryDetails'].call(this, val, privateState);
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
            "expiryConditions": {
                get: function() {
                    context["field"] = "expiryConditions";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryConditions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryConditions, context);
                },
                set: function(val) {
                    setterFunctions['expiryConditions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expectedIssueDate": {
                get: function() {
                    context["field"] = "expectedIssueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["expectedIssueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expectedIssueDate, context);
                },
                set: function(val) {
                    setterFunctions['expectedIssueDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "autoExtensionExpiry": {
                get: function() {
                    context["field"] = "autoExtensionExpiry";
                    context["metadata"] = (objectMetadata ? objectMetadata["autoExtensionExpiry"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.autoExtensionExpiry, context);
                },
                set: function(val) {
                    setterFunctions['autoExtensionExpiry'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "extensionPeriod": {
                get: function() {
                    context["field"] = "extensionPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["extensionPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.extensionPeriod, context);
                },
                set: function(val) {
                    setterFunctions['extensionPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "extensionCapPeriod": {
                get: function() {
                    context["field"] = "extensionCapPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["extensionCapPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.extensionCapPeriod, context);
                },
                set: function(val) {
                    setterFunctions['extensionCapPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "notificationPeriod": {
                get: function() {
                    context["field"] = "notificationPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["notificationPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.notificationPeriod, context);
                },
                set: function(val) {
                    setterFunctions['notificationPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "extensionDetails": {
                get: function() {
                    context["field"] = "extensionDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["extensionDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.extensionDetails, context);
                },
                set: function(val) {
                    setterFunctions['extensionDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "applicableRules": {
                get: function() {
                    context["field"] = "applicableRules";
                    context["metadata"] = (objectMetadata ? objectMetadata["applicableRules"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.applicableRules, context);
                },
                set: function(val) {
                    setterFunctions['applicableRules'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "governingLaw": {
                get: function() {
                    context["field"] = "governingLaw";
                    context["metadata"] = (objectMetadata ? objectMetadata["governingLaw"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.governingLaw, context);
                },
                set: function(val) {
                    setterFunctions['governingLaw'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deliveryInstructions": {
                get: function() {
                    context["field"] = "deliveryInstructions";
                    context["metadata"] = (objectMetadata ? objectMetadata["deliveryInstructions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deliveryInstructions, context);
                },
                set: function(val) {
                    setterFunctions['deliveryInstructions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otherInstructions": {
                get: function() {
                    context["field"] = "otherInstructions";
                    context["metadata"] = (objectMetadata ? objectMetadata["otherInstructions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otherInstructions, context);
                },
                set: function(val) {
                    setterFunctions['otherInstructions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "applicantName": {
                get: function() {
                    context["field"] = "applicantName";
                    context["metadata"] = (objectMetadata ? objectMetadata["applicantName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.applicantName, context);
                },
                set: function(val) {
                    setterFunctions['applicantName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "applicantAddress": {
                get: function() {
                    context["field"] = "applicantAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["applicantAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.applicantAddress, context);
                },
                set: function(val) {
                    setterFunctions['applicantAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuingBankName": {
                get: function() {
                    context["field"] = "issuingBankName";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuingBankName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuingBankName, context);
                },
                set: function(val) {
                    setterFunctions['issuingBankName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuingBankSwiftBicCode": {
                get: function() {
                    context["field"] = "issuingBankSwiftBicCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuingBankSwiftBicCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuingBankSwiftBicCode, context);
                },
                set: function(val) {
                    setterFunctions['issuingBankSwiftBicCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuingBankIban": {
                get: function() {
                    context["field"] = "issuingBankIban";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuingBankIban"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuingBankIban, context);
                },
                set: function(val) {
                    setterFunctions['issuingBankIban'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuingBankLocalCode": {
                get: function() {
                    context["field"] = "issuingBankLocalCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuingBankLocalCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuingBankLocalCode, context);
                },
                set: function(val) {
                    setterFunctions['issuingBankLocalCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuingBankAddress": {
                get: function() {
                    context["field"] = "issuingBankAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuingBankAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuingBankAddress, context);
                },
                set: function(val) {
                    setterFunctions['issuingBankAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "uploadedDocuments": {
                get: function() {
                    context["field"] = "uploadedDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadedDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadedDocuments, context);
                },
                set: function(val) {
                    setterFunctions['uploadedDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "selfAcceptance": {
                get: function() {
                    context["field"] = "selfAcceptance";
                    context["metadata"] = (objectMetadata ? objectMetadata["selfAcceptance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.selfAcceptance, context);
                },
                set: function(val) {
                    setterFunctions['selfAcceptance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "selfAcceptanceDate": {
                get: function() {
                    context["field"] = "selfAcceptanceDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["selfAcceptanceDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.selfAcceptanceDate, context);
                },
                set: function(val) {
                    setterFunctions['selfAcceptanceDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reasonForSelfRejection": {
                get: function() {
                    context["field"] = "reasonForSelfRejection";
                    context["metadata"] = (objectMetadata ? objectMetadata["reasonForSelfRejection"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reasonForSelfRejection, context);
                },
                set: function(val) {
                    setterFunctions['reasonForSelfRejection'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "selfRejectionHistory": {
                get: function() {
                    context["field"] = "selfRejectionHistory";
                    context["metadata"] = (objectMetadata ? objectMetadata["selfRejectionHistory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.selfRejectionHistory, context);
                },
                set: function(val) {
                    setterFunctions['selfRejectionHistory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "clausesAndConditions": {
                get: function() {
                    context["field"] = "clausesAndConditions";
                    context["metadata"] = (objectMetadata ? objectMetadata["clausesAndConditions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.clausesAndConditions, context);
                },
                set: function(val) {
                    setterFunctions['clausesAndConditions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastAmendmentDetails": {
                get: function() {
                    context["field"] = "lastAmendmentDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastAmendmentDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastAmendmentDetails, context);
                },
                set: function(val) {
                    setterFunctions['lastAmendmentDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentSrmsId": {
                get: function() {
                    context["field"] = "amendmentSrmsId";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentSrmsId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentSrmsId, context);
                },
                set: function(val) {
                    setterFunctions['amendmentSrmsId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentNo": {
                get: function() {
                    context["field"] = "amendmentNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentNo, context);
                },
                set: function(val) {
                    setterFunctions['amendmentNo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentCharges": {
                get: function() {
                    context["field"] = "amendmentCharges";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentCharges"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentCharges, context);
                },
                set: function(val) {
                    setterFunctions['amendmentCharges'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateOfAmountChange": {
                get: function() {
                    context["field"] = "dateOfAmountChange";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateOfAmountChange"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateOfAmountChange, context);
                },
                set: function(val) {
                    setterFunctions['dateOfAmountChange'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendAmount": {
                get: function() {
                    context["field"] = "amendAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendAmount, context);
                },
                set: function(val) {
                    setterFunctions['amendAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendExpiryType": {
                get: function() {
                    context["field"] = "amendExpiryType";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendExpiryType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendExpiryType, context);
                },
                set: function(val) {
                    setterFunctions['amendExpiryType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendExpiryDate": {
                get: function() {
                    context["field"] = "amendExpiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendExpiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendExpiryDate, context);
                },
                set: function(val) {
                    setterFunctions['amendExpiryDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendExpiryConditions": {
                get: function() {
                    context["field"] = "amendExpiryConditions";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendExpiryConditions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendExpiryConditions, context);
                },
                set: function(val) {
                    setterFunctions['amendExpiryConditions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "supportingDocuments": {
                get: function() {
                    context["field"] = "supportingDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["supportingDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supportingDocuments, context);
                },
                set: function(val) {
                    setterFunctions['supportingDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "claimInformation": {
                get: function() {
                    context["field"] = "claimInformation";
                    context["metadata"] = (objectMetadata ? objectMetadata["claimInformation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.claimInformation, context);
                },
                set: function(val) {
                    setterFunctions['claimInformation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otherAmendments": {
                get: function() {
                    context["field"] = "otherAmendments";
                    context["metadata"] = (objectMetadata ? objectMetadata["otherAmendments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otherAmendments, context);
                },
                set: function(val) {
                    setterFunctions['otherAmendments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "utilizedAmount": {
                get: function() {
                    context["field"] = "utilizedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["utilizedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.utilizedAmount, context);
                },
                set: function(val) {
                    setterFunctions['utilizedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "PaymentAdvices": {
                get: function() {
                    context["field"] = "PaymentAdvices";
                    context["metadata"] = (objectMetadata ? objectMetadata["PaymentAdvices"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.PaymentAdvices, context);
                },
                set: function(val) {
                    setterFunctions['PaymentAdvices'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentAdviceReference": {
                get: function() {
                    context["field"] = "paymentAdviceReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentAdviceReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentAdviceReference, context);
                },
                set: function(val) {
                    setterFunctions['paymentAdviceReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "orderId": {
                get: function() {
                    context["field"] = "orderId";
                    context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orderId, context);
                },
                set: function(val) {
                    setterFunctions['orderId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "adviceName": {
                get: function() {
                    context["field"] = "adviceName";
                    context["metadata"] = (objectMetadata ? objectMetadata["adviceName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.adviceName, context);
                },
                set: function(val) {
                    setterFunctions['adviceName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawingAmount": {
                get: function() {
                    context["field"] = "drawingAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingAmount, context);
                },
                set: function(val) {
                    setterFunctions['drawingAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiary": {
                get: function() {
                    context["field"] = "beneficiary";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiary"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiary, context);
                },
                set: function(val) {
                    setterFunctions['beneficiary'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentDate": {
                get: function() {
                    context["field"] = "paymentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentDate, context);
                },
                set: function(val) {
                    setterFunctions['paymentDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditedAmount": {
                get: function() {
                    context["field"] = "creditedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditedAmount, context);
                },
                set: function(val) {
                    setterFunctions['creditedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditedAccount": {
                get: function() {
                    context["field"] = "creditedAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditedAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditedAccount, context);
                },
                set: function(val) {
                    setterFunctions['creditedAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "charges": {
                get: function() {
                    context["field"] = "charges";
                    context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.charges, context);
                },
                set: function(val) {
                    setterFunctions['charges'].call(this, val, privateState);
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
            "createdDate": {
                get: function() {
                    context["field"] = "createdDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdDate, context);
                },
                set: function(val) {
                    setterFunctions['createdDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "module": {
                get: function() {
                    context["field"] = "module";
                    context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.module, context);
                },
                set: function(val) {
                    setterFunctions['module'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bCode": {
                get: function() {
                    context["field"] = "bCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["bCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bCode, context);
                },
                set: function(val) {
                    setterFunctions['bCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bic": {
                get: function() {
                    context["field"] = "bic";
                    context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bic, context);
                },
                set: function(val) {
                    setterFunctions['bic'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transferDateOrTime": {
                get: function() {
                    context["field"] = "transferDateOrTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["transferDateOrTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transferDateOrTime, context);
                },
                set: function(val) {
                    setterFunctions['transferDateOrTime'].call(this, val, privateState);
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
            "requestedDateOfIssue": {
                get: function() {
                    context["field"] = "requestedDateOfIssue";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestedDateOfIssue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestedDateOfIssue, context);
                },
                set: function(val) {
                    setterFunctions['requestedDateOfIssue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "formOfUndertaking": {
                get: function() {
                    context["field"] = "formOfUndertaking";
                    context["metadata"] = (objectMetadata ? objectMetadata["formOfUndertaking"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.formOfUndertaking, context);
                },
                set: function(val) {
                    setterFunctions['formOfUndertaking'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "typeOfUndertaking": {
                get: function() {
                    context["field"] = "typeOfUndertaking";
                    context["metadata"] = (objectMetadata ? objectMetadata["typeOfUndertaking"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.typeOfUndertaking, context);
                },
                set: function(val) {
                    setterFunctions['typeOfUndertaking'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateOfExpiry": {
                get: function() {
                    context["field"] = "dateOfExpiry";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateOfExpiry"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateOfExpiry, context);
                },
                set: function(val) {
                    setterFunctions['dateOfExpiry'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiryConditionOrEvent": {
                get: function() {
                    context["field"] = "expiryConditionOrEvent";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryConditionOrEvent"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryConditionOrEvent, context);
                },
                set: function(val) {
                    setterFunctions['expiryConditionOrEvent'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "obligorOrInstructingParty": {
                get: function() {
                    context["field"] = "obligorOrInstructingParty";
                    context["metadata"] = (objectMetadata ? objectMetadata["obligorOrInstructingParty"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.obligorOrInstructingParty, context);
                },
                set: function(val) {
                    setterFunctions['obligorOrInstructingParty'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuer": {
                get: function() {
                    context["field"] = "issuer";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuer"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuer, context);
                },
                set: function(val) {
                    setterFunctions['issuer'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "undertakingAmount": {
                get: function() {
                    context["field"] = "undertakingAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["undertakingAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.undertakingAmount, context);
                },
                set: function(val) {
                    setterFunctions['undertakingAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "additionalAmountInformation": {
                get: function() {
                    context["field"] = "additionalAmountInformation";
                    context["metadata"] = (objectMetadata ? objectMetadata["additionalAmountInformation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.additionalAmountInformation, context);
                },
                set: function(val) {
                    setterFunctions['additionalAmountInformation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableWith": {
                get: function() {
                    context["field"] = "availableWith";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableWith"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableWith, context);
                },
                set: function(val) {
                    setterFunctions['availableWith'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentAndPresentationInstructions": {
                get: function() {
                    context["field"] = "documentAndPresentationInstructions";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentAndPresentationInstructions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentAndPresentationInstructions, context);
                },
                set: function(val) {
                    setterFunctions['documentAndPresentationInstructions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestedLocalUndertakingTermsAndConditions": {
                get: function() {
                    context["field"] = "requestedLocalUndertakingTermsAndConditions";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestedLocalUndertakingTermsAndConditions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestedLocalUndertakingTermsAndConditions, context);
                },
                set: function(val) {
                    setterFunctions['requestedLocalUndertakingTermsAndConditions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "standardWordingRequired": {
                get: function() {
                    context["field"] = "standardWordingRequired";
                    context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequired"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.standardWordingRequired, context);
                },
                set: function(val) {
                    setterFunctions['standardWordingRequired'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "standardWordingRequestedLanguage": {
                get: function() {
                    context["field"] = "standardWordingRequestedLanguage";
                    context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequestedLanguage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.standardWordingRequestedLanguage, context);
                },
                set: function(val) {
                    setterFunctions['standardWordingRequestedLanguage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "governingLawAndOrPlaceOfJurisdiction": {
                get: function() {
                    context["field"] = "governingLawAndOrPlaceOfJurisdiction";
                    context["metadata"] = (objectMetadata ? objectMetadata["governingLawAndOrPlaceOfJurisdiction"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.governingLawAndOrPlaceOfJurisdiction, context);
                },
                set: function(val) {
                    setterFunctions['governingLawAndOrPlaceOfJurisdiction'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "automaticExtensionPeriod": {
                get: function() {
                    context["field"] = "automaticExtensionPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.automaticExtensionPeriod, context);
                },
                set: function(val) {
                    setterFunctions['automaticExtensionPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "automaticExtensionNonExtensionPeriod": {
                get: function() {
                    context["field"] = "automaticExtensionNonExtensionPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNonExtensionPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.automaticExtensionNonExtensionPeriod, context);
                },
                set: function(val) {
                    setterFunctions['automaticExtensionNonExtensionPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "automaticExtensionNotificationPeriod": {
                get: function() {
                    context["field"] = "automaticExtensionNotificationPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNotificationPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.automaticExtensionNotificationPeriod, context);
                },
                set: function(val) {
                    setterFunctions['automaticExtensionNotificationPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "automaticExtensionFinalExpiryDate": {
                get: function() {
                    context["field"] = "automaticExtensionFinalExpiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionFinalExpiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.automaticExtensionFinalExpiryDate, context);
                },
                set: function(val) {
                    setterFunctions['automaticExtensionFinalExpiryDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "demandIndicator": {
                get: function() {
                    context["field"] = "demandIndicator";
                    context["metadata"] = (objectMetadata ? objectMetadata["demandIndicator"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.demandIndicator, context);
                },
                set: function(val) {
                    setterFunctions['demandIndicator'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transferIndicator": {
                get: function() {
                    context["field"] = "transferIndicator";
                    context["metadata"] = (objectMetadata ? objectMetadata["transferIndicator"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transferIndicator, context);
                },
                set: function(val) {
                    setterFunctions['transferIndicator'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transferConditions": {
                get: function() {
                    context["field"] = "transferConditions";
                    context["metadata"] = (objectMetadata ? objectMetadata["transferConditions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transferConditions, context);
                },
                set: function(val) {
                    setterFunctions['transferConditions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "underlyingTransactionDetails": {
                get: function() {
                    context["field"] = "underlyingTransactionDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["underlyingTransactionDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.underlyingTransactionDetails, context);
                },
                set: function(val) {
                    setterFunctions['underlyingTransactionDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deliveryOfLocalUndertaking": {
                get: function() {
                    context["field"] = "deliveryOfLocalUndertaking";
                    context["metadata"] = (objectMetadata ? objectMetadata["deliveryOfLocalUndertaking"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deliveryOfLocalUndertaking, context);
                },
                set: function(val) {
                    setterFunctions['deliveryOfLocalUndertaking'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deliveryToOrCollectionBy": {
                get: function() {
                    context["field"] = "deliveryToOrCollectionBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["deliveryToOrCollectionBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deliveryToOrCollectionBy, context);
                },
                set: function(val) {
                    setterFunctions['deliveryToOrCollectionBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "SwiftMessages": {
                get: function() {
                    context["field"] = "SwiftMessages";
                    context["metadata"] = (objectMetadata ? objectMetadata["SwiftMessages"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.SwiftMessages, context);
                },
                set: function(val) {
                    setterFunctions['SwiftMessages'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "newSequence": {
                get: function() {
                    context["field"] = "newSequence";
                    context["metadata"] = (objectMetadata ? objectMetadata["newSequence"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.newSequence, context);
                },
                set: function(val) {
                    setterFunctions['newSequence'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "demandAcceptance": {
                get: function() {
                    context["field"] = "demandAcceptance";
                    context["metadata"] = (objectMetadata ? objectMetadata["demandAcceptance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.demandAcceptance, context);
                },
                set: function(val) {
                    setterFunctions['demandAcceptance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "liabilityDetails": {
                get: function() {
                    context["field"] = "liabilityDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["liabilityDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.liabilityDetails, context);
                },
                set: function(val) {
                    setterFunctions['liabilityDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "releasedAmount": {
                get: function() {
                    context["field"] = "releasedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["releasedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.releasedAmount, context);
                },
                set: function(val) {
                    setterFunctions['releasedAmount'].call(this, val, privateState);
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
            privateState.claimCurrency = value ? (value["claimCurrency"] ? value["claimCurrency"] : null) : null;
            privateState.claimAmount = value ? (value["claimAmount"] ? value["claimAmount"] : null) : null;
            privateState.claimCreditAccount = value ? (value["claimCreditAccount"] ? value["claimCreditAccount"] : null) : null;
            privateState.chargesDebitAccount = value ? (value["chargesDebitAccount"] ? value["chargesDebitAccount"] : null) : null;
            privateState.demandType = value ? (value["demandType"] ? value["demandType"] : null) : null;
            privateState.newExtensionDate = value ? (value["newExtensionDate"] ? value["newExtensionDate"] : null) : null;
            privateState.documentInformation = value ? (value["documentInformation"] ? value["documentInformation"] : null) : null;
            privateState.physicalDocuments = value ? (value["physicalDocuments"] ? value["physicalDocuments"] : null) : null;
            privateState.forwardDocuments = value ? (value["forwardDocuments"] ? value["forwardDocuments"] : null) : null;
            privateState.otherDemandDetails = value ? (value["otherDemandDetails"] ? value["otherDemandDetails"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.paymentSettledDate = value ? (value["paymentSettledDate"] ? value["paymentSettledDate"] : null) : null;
            privateState.documentStatus = value ? (value["documentStatus"] ? value["documentStatus"] : null) : null;
            privateState.totalDocuments = value ? (value["totalDocuments"] ? value["totalDocuments"] : null) : null;
            privateState.returnedDocuments = value ? (value["returnedDocuments"] ? value["returnedDocuments"] : null) : null;
            privateState.messageFromBank = value ? (value["messageFromBank"] ? value["messageFromBank"] : null) : null;
            privateState.reasonForReturn = value ? (value["reasonForReturn"] ? value["reasonForReturn"] : null) : null;
            privateState.discrepancies = value ? (value["discrepancies"] ? value["discrepancies"] : null) : null;
            privateState.returnMessageToBank = value ? (value["returnMessageToBank"] ? value["returnMessageToBank"] : null) : null;
            privateState.messageToBank = value ? (value["messageToBank"] ? value["messageToBank"] : null) : null;
            privateState.productType = value ? (value["productType"] ? value["productType"] : null) : null;
            privateState.guaranteeAndSBLCType = value ? (value["guaranteeAndSBLCType"] ? value["guaranteeAndSBLCType"] : null) : null;
            privateState.guaranteesReferenceNo = value ? (value["guaranteesReferenceNo"] ? value["guaranteesReferenceNo"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.expiryType = value ? (value["expiryType"] ? value["expiryType"] : null) : null;
            privateState.expiryDate = value ? (value["expiryDate"] ? value["expiryDate"] : null) : null;
            privateState.issuingBank = value ? (value["issuingBank"] ? value["issuingBank"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.createdOn = value ? (value["createdOn"] ? value["createdOn"] : null) : null;
            privateState.issueDate = value ? (value["issueDate"] ? value["issueDate"] : null) : null;
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.applicant = value ? (value["applicant"] ? value["applicant"] : null) : null;
            privateState.serviceRequestTime = value ? (value["serviceRequestTime"] ? value["serviceRequestTime"] : null) : null;
            privateState.returnedHistory = value ? (value["returnedHistory"] ? value["returnedHistory"] : null) : null;
            privateState.claimsSRMSId = value ? (value["claimsSRMSId"] ? value["claimsSRMSId"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.errMsg = value ? (value["errMsg"] ? value["errMsg"] : null) : null;
            privateState.errCode = value ? (value["errCode"] ? value["errCode"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.errorCode = value ? (value["errorCode"] ? value["errorCode"] : null) : null;
            privateState.errorMsg = value ? (value["errorMsg"] ? value["errorMsg"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.guaranteesSRMSId = value ? (value["guaranteesSRMSId"] ? value["guaranteesSRMSId"] : null) : null;
            privateState.guaranteeSrmsId = value ? (value["guaranteeSrmsId"] ? value["guaranteeSrmsId"] : null) : null;
            privateState.transactionReference = value ? (value["transactionReference"] ? value["transactionReference"] : null) : null;
            privateState.receivedOn = value ? (value["receivedOn"] ? value["receivedOn"] : null) : null;
            privateState.lcType = value ? (value["lcType"] ? value["lcType"] : null) : null;
            privateState.relatedTransactionReference = value ? (value["relatedTransactionReference"] ? value["relatedTransactionReference"] : null) : null;
            privateState.modeOfTransaction = value ? (value["modeOfTransaction"] ? value["modeOfTransaction"] : null) : null;
            privateState.applicantParty = value ? (value["applicantParty"] ? value["applicantParty"] : null) : null;
            privateState.beneficiaryDetails = value ? (value["beneficiaryDetails"] ? value["beneficiaryDetails"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.expiryConditions = value ? (value["expiryConditions"] ? value["expiryConditions"] : null) : null;
            privateState.expectedIssueDate = value ? (value["expectedIssueDate"] ? value["expectedIssueDate"] : null) : null;
            privateState.autoExtensionExpiry = value ? (value["autoExtensionExpiry"] ? value["autoExtensionExpiry"] : null) : null;
            privateState.extensionPeriod = value ? (value["extensionPeriod"] ? value["extensionPeriod"] : null) : null;
            privateState.extensionCapPeriod = value ? (value["extensionCapPeriod"] ? value["extensionCapPeriod"] : null) : null;
            privateState.notificationPeriod = value ? (value["notificationPeriod"] ? value["notificationPeriod"] : null) : null;
            privateState.extensionDetails = value ? (value["extensionDetails"] ? value["extensionDetails"] : null) : null;
            privateState.applicableRules = value ? (value["applicableRules"] ? value["applicableRules"] : null) : null;
            privateState.governingLaw = value ? (value["governingLaw"] ? value["governingLaw"] : null) : null;
            privateState.deliveryInstructions = value ? (value["deliveryInstructions"] ? value["deliveryInstructions"] : null) : null;
            privateState.otherInstructions = value ? (value["otherInstructions"] ? value["otherInstructions"] : null) : null;
            privateState.applicantName = value ? (value["applicantName"] ? value["applicantName"] : null) : null;
            privateState.applicantAddress = value ? (value["applicantAddress"] ? value["applicantAddress"] : null) : null;
            privateState.issuingBankName = value ? (value["issuingBankName"] ? value["issuingBankName"] : null) : null;
            privateState.issuingBankSwiftBicCode = value ? (value["issuingBankSwiftBicCode"] ? value["issuingBankSwiftBicCode"] : null) : null;
            privateState.issuingBankIban = value ? (value["issuingBankIban"] ? value["issuingBankIban"] : null) : null;
            privateState.issuingBankLocalCode = value ? (value["issuingBankLocalCode"] ? value["issuingBankLocalCode"] : null) : null;
            privateState.issuingBankAddress = value ? (value["issuingBankAddress"] ? value["issuingBankAddress"] : null) : null;
            privateState.uploadedDocuments = value ? (value["uploadedDocuments"] ? value["uploadedDocuments"] : null) : null;
            privateState.selfAcceptance = value ? (value["selfAcceptance"] ? value["selfAcceptance"] : null) : null;
            privateState.selfAcceptanceDate = value ? (value["selfAcceptanceDate"] ? value["selfAcceptanceDate"] : null) : null;
            privateState.reasonForSelfRejection = value ? (value["reasonForSelfRejection"] ? value["reasonForSelfRejection"] : null) : null;
            privateState.selfRejectionHistory = value ? (value["selfRejectionHistory"] ? value["selfRejectionHistory"] : null) : null;
            privateState.clausesAndConditions = value ? (value["clausesAndConditions"] ? value["clausesAndConditions"] : null) : null;
            privateState.lastAmendmentDetails = value ? (value["lastAmendmentDetails"] ? value["lastAmendmentDetails"] : null) : null;
            privateState.amendmentSrmsId = value ? (value["amendmentSrmsId"] ? value["amendmentSrmsId"] : null) : null;
            privateState.amendmentNo = value ? (value["amendmentNo"] ? value["amendmentNo"] : null) : null;
            privateState.amendmentCharges = value ? (value["amendmentCharges"] ? value["amendmentCharges"] : null) : null;
            privateState.dateOfAmountChange = value ? (value["dateOfAmountChange"] ? value["dateOfAmountChange"] : null) : null;
            privateState.amendAmount = value ? (value["amendAmount"] ? value["amendAmount"] : null) : null;
            privateState.amendExpiryType = value ? (value["amendExpiryType"] ? value["amendExpiryType"] : null) : null;
            privateState.amendExpiryDate = value ? (value["amendExpiryDate"] ? value["amendExpiryDate"] : null) : null;
            privateState.amendExpiryConditions = value ? (value["amendExpiryConditions"] ? value["amendExpiryConditions"] : null) : null;
            privateState.supportingDocuments = value ? (value["supportingDocuments"] ? value["supportingDocuments"] : null) : null;
            privateState.claimInformation = value ? (value["claimInformation"] ? value["claimInformation"] : null) : null;
            privateState.otherAmendments = value ? (value["otherAmendments"] ? value["otherAmendments"] : null) : null;
            privateState.utilizedAmount = value ? (value["utilizedAmount"] ? value["utilizedAmount"] : null) : null;
            privateState.PaymentAdvices = value ? (value["PaymentAdvices"] ? value["PaymentAdvices"] : null) : null;
            privateState.paymentAdviceReference = value ? (value["paymentAdviceReference"] ? value["paymentAdviceReference"] : null) : null;
            privateState.orderId = value ? (value["orderId"] ? value["orderId"] : null) : null;
            privateState.adviceName = value ? (value["adviceName"] ? value["adviceName"] : null) : null;
            privateState.drawingAmount = value ? (value["drawingAmount"] ? value["drawingAmount"] : null) : null;
            privateState.beneficiary = value ? (value["beneficiary"] ? value["beneficiary"] : null) : null;
            privateState.paymentDate = value ? (value["paymentDate"] ? value["paymentDate"] : null) : null;
            privateState.creditedAmount = value ? (value["creditedAmount"] ? value["creditedAmount"] : null) : null;
            privateState.creditedAccount = value ? (value["creditedAccount"] ? value["creditedAccount"] : null) : null;
            privateState.charges = value ? (value["charges"] ? value["charges"] : null) : null;
            privateState.advisingBank = value ? (value["advisingBank"] ? value["advisingBank"] : null) : null;
            privateState.createdDate = value ? (value["createdDate"] ? value["createdDate"] : null) : null;
            privateState.module = value ? (value["module"] ? value["module"] : null) : null;
            privateState.bCode = value ? (value["bCode"] ? value["bCode"] : null) : null;
            privateState.bic = value ? (value["bic"] ? value["bic"] : null) : null;
            privateState.transferDateOrTime = value ? (value["transferDateOrTime"] ? value["transferDateOrTime"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.requestedDateOfIssue = value ? (value["requestedDateOfIssue"] ? value["requestedDateOfIssue"] : null) : null;
            privateState.formOfUndertaking = value ? (value["formOfUndertaking"] ? value["formOfUndertaking"] : null) : null;
            privateState.typeOfUndertaking = value ? (value["typeOfUndertaking"] ? value["typeOfUndertaking"] : null) : null;
            privateState.dateOfExpiry = value ? (value["dateOfExpiry"] ? value["dateOfExpiry"] : null) : null;
            privateState.expiryConditionOrEvent = value ? (value["expiryConditionOrEvent"] ? value["expiryConditionOrEvent"] : null) : null;
            privateState.obligorOrInstructingParty = value ? (value["obligorOrInstructingParty"] ? value["obligorOrInstructingParty"] : null) : null;
            privateState.issuer = value ? (value["issuer"] ? value["issuer"] : null) : null;
            privateState.undertakingAmount = value ? (value["undertakingAmount"] ? value["undertakingAmount"] : null) : null;
            privateState.additionalAmountInformation = value ? (value["additionalAmountInformation"] ? value["additionalAmountInformation"] : null) : null;
            privateState.availableWith = value ? (value["availableWith"] ? value["availableWith"] : null) : null;
            privateState.documentAndPresentationInstructions = value ? (value["documentAndPresentationInstructions"] ? value["documentAndPresentationInstructions"] : null) : null;
            privateState.requestedLocalUndertakingTermsAndConditions = value ? (value["requestedLocalUndertakingTermsAndConditions"] ? value["requestedLocalUndertakingTermsAndConditions"] : null) : null;
            privateState.standardWordingRequired = value ? (value["standardWordingRequired"] ? value["standardWordingRequired"] : null) : null;
            privateState.standardWordingRequestedLanguage = value ? (value["standardWordingRequestedLanguage"] ? value["standardWordingRequestedLanguage"] : null) : null;
            privateState.governingLawAndOrPlaceOfJurisdiction = value ? (value["governingLawAndOrPlaceOfJurisdiction"] ? value["governingLawAndOrPlaceOfJurisdiction"] : null) : null;
            privateState.automaticExtensionPeriod = value ? (value["automaticExtensionPeriod"] ? value["automaticExtensionPeriod"] : null) : null;
            privateState.automaticExtensionNonExtensionPeriod = value ? (value["automaticExtensionNonExtensionPeriod"] ? value["automaticExtensionNonExtensionPeriod"] : null) : null;
            privateState.automaticExtensionNotificationPeriod = value ? (value["automaticExtensionNotificationPeriod"] ? value["automaticExtensionNotificationPeriod"] : null) : null;
            privateState.automaticExtensionFinalExpiryDate = value ? (value["automaticExtensionFinalExpiryDate"] ? value["automaticExtensionFinalExpiryDate"] : null) : null;
            privateState.demandIndicator = value ? (value["demandIndicator"] ? value["demandIndicator"] : null) : null;
            privateState.transferIndicator = value ? (value["transferIndicator"] ? value["transferIndicator"] : null) : null;
            privateState.transferConditions = value ? (value["transferConditions"] ? value["transferConditions"] : null) : null;
            privateState.underlyingTransactionDetails = value ? (value["underlyingTransactionDetails"] ? value["underlyingTransactionDetails"] : null) : null;
            privateState.deliveryOfLocalUndertaking = value ? (value["deliveryOfLocalUndertaking"] ? value["deliveryOfLocalUndertaking"] : null) : null;
            privateState.deliveryToOrCollectionBy = value ? (value["deliveryToOrCollectionBy"] ? value["deliveryToOrCollectionBy"] : null) : null;
            privateState.SwiftMessages = value ? (value["SwiftMessages"] ? value["SwiftMessages"] : null) : null;
            privateState.newSequence = value ? (value["newSequence"] ? value["newSequence"] : null) : null;
            privateState.demandAcceptance = value ? (value["demandAcceptance"] ? value["demandAcceptance"] : null) : null;
            privateState.liabilityDetails = value ? (value["liabilityDetails"] ? value["liabilityDetails"] : null) : null;
            privateState.releasedAmount = value ? (value["releasedAmount"] ? value["releasedAmount"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ReceivedGuarantees);

    //Create new class level validator object
    BaseModel.Validator.call(ReceivedGuarantees);

    var registerValidatorBackup = ReceivedGuarantees.registerValidator;

    ReceivedGuarantees.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ReceivedGuarantees.isValid(this, propName, val)) {
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
    //For Operation 'generateGuaranteesList' with service id 'GenerateReceivedGuaranteesList5697'
     ReceivedGuarantees.generateGuaranteesList = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('generateGuaranteesList', params, onCompletion);
     };

    //For Operation 'createGuarantee' with service id 'createGuarantees7223'
     ReceivedGuarantees.createGuarantee = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('createGuarantee', params, onCompletion);
     };

    //For Operation 'generateClaimsList' with service id 'GenerateReceivedClaimsList8581'
     ReceivedGuarantees.generateClaimsList = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('generateClaimsList', params, onCompletion);
     };

    //For Operation 'generateReceivedGuaranteeClaim' with service id 'GenerateReceivedGuaranteeClaim3783'
     ReceivedGuarantees.generateReceivedGuaranteeClaim = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('generateReceivedGuaranteeClaim', params, onCompletion);
     };

    //For Operation 'updateAmendment' with service id 'UpdateReceivedAmendment9954'
     ReceivedGuarantees.updateAmendment = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('updateAmendment', params, onCompletion);
     };

    //For Operation 'updateGuarantee' with service id 'UpdateReceivedGuarantee3557'
     ReceivedGuarantees.updateGuarantee = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('updateGuarantee', params, onCompletion);
     };

    //For Operation 'generateGuaranteeReport' with service id 'GeneratePdfReceivedGuarantees1423'
     ReceivedGuarantees.generateGuaranteeReport = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('generateGuaranteeReport', params, onCompletion);
     };

    //For Operation 'updateAmendmentByBank' with service id 'UpdateReceivedAmendmentByBank5228'
     ReceivedGuarantees.updateAmendmentByBank = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('updateAmendmentByBank', params, onCompletion);
     };

    //For Operation 'UpdateReceivedGuaranteeClaim' with service id 'UpdateReceivedGuaranteeClaim7686'
     ReceivedGuarantees.UpdateReceivedGuaranteeClaim = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('UpdateReceivedGuaranteeClaim', params, onCompletion);
     };

    //For Operation 'generateAmendmentsList' with service id 'GenerateReceivedAmendmentsList6659'
     ReceivedGuarantees.generateAmendmentsList = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('generateAmendmentsList', params, onCompletion);
     };

    //For Operation 'updateGuaranteeByBank' with service id 'UpdateReceivedGuaranteeByBank4435'
     ReceivedGuarantees.updateGuaranteeByBank = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('updateGuaranteeByBank', params, onCompletion);
     };

    //For Operation 'createAmendment' with service id 'CreateReceivedAmendment1230'
     ReceivedGuarantees.createAmendment = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('createAmendment', params, onCompletion);
     };

    //For Operation 'getGuaranteeById' with service id 'GetReceivedGuaranteeById5731'
     ReceivedGuarantees.getGuaranteeById = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('getGuaranteeById', params, onCompletion);
     };

    //For Operation 'releaseLiability' with service id 'ReceivedGuaranteeReleaseLiability4378'
     ReceivedGuarantees.releaseLiability = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('releaseLiability', params, onCompletion);
     };

    //For Operation 'GetGuaranteeClaimsById' with service id 'GetReceivedGuaranteeClaimsById5318'
     ReceivedGuarantees.GetGuaranteeClaimsById = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('GetGuaranteeClaimsById', params, onCompletion);
     };

    //For Operation 'UpdateReceivedGuaranteeClaimByBank' with service id 'UpdateReceivedGuaranteeClaimByBank3559'
     ReceivedGuarantees.UpdateReceivedGuaranteeClaimByBank = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('UpdateReceivedGuaranteeClaimByBank', params, onCompletion);
     };

    //For Operation 'CreateGuaranteeClaims' with service id 'CreateClaimOnGuaranteeReceived1215'
     ReceivedGuarantees.CreateGuaranteeClaims = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('CreateGuaranteeClaims', params, onCompletion);
     };

    //For Operation 'SaveGuaranteeClaims' with service id 'SaveReceivedGuaranteeClaims6681'
     ReceivedGuarantees.SaveGuaranteeClaims = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('SaveGuaranteeClaims', params, onCompletion);
     };

    //For Operation 'getAmendments' with service id 'GetReceivedAmendments4004'
     ReceivedGuarantees.getAmendments = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('getAmendments', params, onCompletion);
     };

    //For Operation 'GetGuaranteeClaims' with service id 'GetReceivedGuaranteeClaims9882'
     ReceivedGuarantees.GetGuaranteeClaims = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('GetGuaranteeClaims', params, onCompletion);
     };

    //For Operation 'generateAmendmentReport' with service id 'GeneratePdfReceivedAmendment4716'
     ReceivedGuarantees.generateAmendmentReport = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('generateAmendmentReport', params, onCompletion);
     };

    //For Operation 'getAmendmentById' with service id 'GetReceivedAmendmentById3740'
     ReceivedGuarantees.getAmendmentById = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('getAmendmentById', params, onCompletion);
     };

    //For Operation 'deleteGuaranteeClaim' with service id 'DeleteReceivedGuaranteeClaim3644'
     ReceivedGuarantees.deleteGuaranteeClaim = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('deleteGuaranteeClaim', params, onCompletion);
     };

    //For Operation 'getGuarantees' with service id 'GetGuarantees3906'
     ReceivedGuarantees.getGuarantees = function(params, onCompletion){
        return ReceivedGuarantees.customVerb('getGuarantees', params, onCompletion);
     };

    var relations = [];

    ReceivedGuarantees.relations = relations;

    ReceivedGuarantees.prototype.isValid = function() {
        return ReceivedGuarantees.isValid(this);
    };

    ReceivedGuarantees.prototype.objModelName = "ReceivedGuarantees";
    ReceivedGuarantees.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ReceivedGuarantees.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "ReceivedGuarantees", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ReceivedGuarantees.clone = function(objectToClone) {
        var clonedObj = new ReceivedGuarantees();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ReceivedGuarantees;
});