/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Guarantees", "objectService" : "TradeFinance"};

    var setterFunctions = {
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productType: function(val, state) {
            context["field"] = "productType";
            context["metadata"] = (objectMetadata ? objectMetadata["productType"] : null);
            state['productType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billType: function(val, state) {
            context["field"] = "billType";
            context["metadata"] = (objectMetadata ? objectMetadata["billType"] : null);
            state['billType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        guaranteesReference: function(val, state) {
            context["field"] = "guaranteesReference";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteesReference"] : null);
            state['guaranteesReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdOn: function(val, state) {
            context["field"] = "createdOn";
            context["metadata"] = (objectMetadata ? objectMetadata["createdOn"] : null);
            state['createdOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        issueDate: function(val, state) {
            context["field"] = "issueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
            state['issueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryDate: function(val, state) {
            context["field"] = "expiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
            state['expiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryType: function(val, state) {
            context["field"] = "expiryType";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryType"] : null);
            state['expiryType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modeOfTransaction: function(val, state) {
            context["field"] = "modeOfTransaction";
            context["metadata"] = (objectMetadata ? objectMetadata["modeOfTransaction"] : null);
            state['modeOfTransaction'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        advisingBank: function(val, state) {
            context["field"] = "advisingBank";
            context["metadata"] = (objectMetadata ? objectMetadata["advisingBank"] : null);
            state['advisingBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instructingParty: function(val, state) {
            context["field"] = "instructingParty";
            context["metadata"] = (objectMetadata ? objectMetadata["instructingParty"] : null);
            state['instructingParty'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicantParty: function(val, state) {
            context["field"] = "applicantParty";
            context["metadata"] = (objectMetadata ? objectMetadata["applicantParty"] : null);
            state['applicantParty'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expectedIssueDate: function(val, state) {
            context["field"] = "expectedIssueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["expectedIssueDate"] : null);
            state['expectedIssueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        claimExpiryDate: function(val, state) {
            context["field"] = "claimExpiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["claimExpiryDate"] : null);
            state['claimExpiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryCondition: function(val, state) {
            context["field"] = "expiryCondition";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryCondition"] : null);
            state['expiryCondition'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        extendExpiryDate: function(val, state) {
            context["field"] = "extendExpiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["extendExpiryDate"] : null);
            state['extendExpiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        governingLaw: function(val, state) {
            context["field"] = "governingLaw";
            context["metadata"] = (objectMetadata ? objectMetadata["governingLaw"] : null);
            state['governingLaw'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherInstructions: function(val, state) {
            context["field"] = "otherInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["otherInstructions"] : null);
            state['otherInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryType: function(val, state) {
            context["field"] = "beneficiaryType";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryType"] : null);
            state['beneficiaryType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recieverInstructions: function(val, state) {
            context["field"] = "recieverInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["recieverInstructions"] : null);
            state['recieverInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryAddress1: function(val, state) {
            context["field"] = "beneficiaryAddress1";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddress1"] : null);
            state['beneficiaryAddress1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryAddress2: function(val, state) {
            context["field"] = "beneficiaryAddress2";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddress2"] : null);
            state['beneficiaryAddress2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        city: function(val, state) {
            context["field"] = "city";
            context["metadata"] = (objectMetadata ? objectMetadata["city"] : null);
            state['city'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        state: function(val, state) {
            context["field"] = "state";
            context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
            state['state'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        country: function(val, state) {
            context["field"] = "country";
            context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
            state['country'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        zipCode: function(val, state) {
            context["field"] = "zipCode";
            context["metadata"] = (objectMetadata ? objectMetadata["zipCode"] : null);
            state['zipCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        saveBeneficiary: function(val, state) {
            context["field"] = "saveBeneficiary";
            context["metadata"] = (objectMetadata ? objectMetadata["saveBeneficiary"] : null);
            state['saveBeneficiary'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftCode: function(val, state) {
            context["field"] = "swiftCode";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
            state['swiftCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        iban: function(val, state) {
            context["field"] = "iban";
            context["metadata"] = (objectMetadata ? objectMetadata["iban"] : null);
            state['iban'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        localCode: function(val, state) {
            context["field"] = "localCode";
            context["metadata"] = (objectMetadata ? objectMetadata["localCode"] : null);
            state['localCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankAddress1: function(val, state) {
            context["field"] = "bankAddress1";
            context["metadata"] = (objectMetadata ? objectMetadata["bankAddress1"] : null);
            state['bankAddress1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankAddress2: function(val, state) {
            context["field"] = "bankAddress2";
            context["metadata"] = (objectMetadata ? objectMetadata["bankAddress2"] : null);
            state['bankAddress2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankCity: function(val, state) {
            context["field"] = "bankCity";
            context["metadata"] = (objectMetadata ? objectMetadata["bankCity"] : null);
            state['bankCity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankState: function(val, state) {
            context["field"] = "bankState";
            context["metadata"] = (objectMetadata ? objectMetadata["bankState"] : null);
            state['bankState'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankCountry: function(val, state) {
            context["field"] = "bankCountry";
            context["metadata"] = (objectMetadata ? objectMetadata["bankCountry"] : null);
            state['bankCountry'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankZipCode: function(val, state) {
            context["field"] = "bankZipCode";
            context["metadata"] = (objectMetadata ? objectMetadata["bankZipCode"] : null);
            state['bankZipCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountType: function(val, state) {
            context["field"] = "accountType";
            context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
            state['accountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chargesAccount: function(val, state) {
            context["field"] = "chargesAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["chargesAccount"] : null);
            state['chargesAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        comissionAccount: function(val, state) {
            context["field"] = "comissionAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["comissionAccount"] : null);
            state['comissionAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cashMargin: function(val, state) {
            context["field"] = "cashMargin";
            context["metadata"] = (objectMetadata ? objectMetadata["cashMargin"] : null);
            state['cashMargin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instructionCurrencies: function(val, state) {
            context["field"] = "instructionCurrencies";
            context["metadata"] = (objectMetadata ? objectMetadata["instructionCurrencies"] : null);
            state['instructionCurrencies'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitInstructions: function(val, state) {
            context["field"] = "limitInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["limitInstructions"] : null);
            state['limitInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherBankInstructions: function(val, state) {
            context["field"] = "otherBankInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["otherBankInstructions"] : null);
            state['otherBankInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageToBank: function(val, state) {
            context["field"] = "messageToBank";
            context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
            state['messageToBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentReferences: function(val, state) {
            context["field"] = "documentReferences";
            context["metadata"] = (objectMetadata ? objectMetadata["documentReferences"] : null);
            state['documentReferences'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentName: function(val, state) {
            context["field"] = "documentName";
            context["metadata"] = (objectMetadata ? objectMetadata["documentName"] : null);
            state['documentName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        clauseConditions: function(val, state) {
            context["field"] = "clauseConditions";
            context["metadata"] = (objectMetadata ? objectMetadata["clauseConditions"] : null);
            state['clauseConditions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        guaranteesSRMSId: function(val, state) {
            context["field"] = "guaranteesSRMSId";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteesSRMSId"] : null);
            state['guaranteesSRMSId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryDetails: function(val, state) {
            context["field"] = "beneficiaryDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryDetails"] : null);
            state['beneficiaryDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalAmount: function(val, state) {
            context["field"] = "totalAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
            state['totalAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        guaranteesReferenceNo: function(val, state) {
            context["field"] = "guaranteesReferenceNo";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteesReferenceNo"] : null);
            state['guaranteesReferenceNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        clauseType: function(val, state) {
            context["field"] = "clauseType";
            context["metadata"] = (objectMetadata ? objectMetadata["clauseType"] : null);
            state['clauseType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        clauseDescription: function(val, state) {
            context["field"] = "clauseDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["clauseDescription"] : null);
            state['clauseDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        clauseTitle: function(val, state) {
            context["field"] = "clauseTitle";
            context["metadata"] = (objectMetadata ? objectMetadata["clauseTitle"] : null);
            state['clauseTitle'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        clauseId: function(val, state) {
            context["field"] = "clauseId";
            context["metadata"] = (objectMetadata ? objectMetadata["clauseId"] : null);
            state['clauseId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        historyCount: function(val, state) {
            context["field"] = "historyCount";
            context["metadata"] = (objectMetadata ? objectMetadata["historyCount"] : null);
            state['historyCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentHistory1: function(val, state) {
            context["field"] = "amendmentHistory1";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory1"] : null);
            state['amendmentHistory1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentHistory2: function(val, state) {
            context["field"] = "amendmentHistory2";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory2"] : null);
            state['amendmentHistory2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentHistory3: function(val, state) {
            context["field"] = "amendmentHistory3";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory3"] : null);
            state['amendmentHistory3'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentHistory4: function(val, state) {
            context["field"] = "amendmentHistory4";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory4"] : null);
            state['amendmentHistory4'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentHistory5: function(val, state) {
            context["field"] = "amendmentHistory5";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory5"] : null);
            state['amendmentHistory5'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForReturned: function(val, state) {
            context["field"] = "reasonForReturned";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturned"] : null);
            state['reasonForReturned'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentSRMSRequestId: function(val, state) {
            context["field"] = "amendmentSRMSRequestId";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentSRMSRequestId"] : null);
            state['amendmentSRMSRequestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicableRules: function(val, state) {
            context["field"] = "applicableRules";
            context["metadata"] = (objectMetadata ? objectMetadata["applicableRules"] : null);
            state['applicableRules'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        demandAcceptance: function(val, state) {
            context["field"] = "demandAcceptance";
            context["metadata"] = (objectMetadata ? objectMetadata["demandAcceptance"] : null);
            state['demandAcceptance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partialDemandPercentage: function(val, state) {
            context["field"] = "partialDemandPercentage";
            context["metadata"] = (objectMetadata ? objectMetadata["partialDemandPercentage"] : null);
            state['partialDemandPercentage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deliveryInstructions: function(val, state) {
            context["field"] = "deliveryInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["deliveryInstructions"] : null);
            state['deliveryInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        guaranteeAndSBLCType: function(val, state) {
            context["field"] = "guaranteeAndSBLCType";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteeAndSBLCType"] : null);
            state['guaranteeAndSBLCType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForReturn: function(val, state) {
            context["field"] = "reasonForReturn";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
            state['reasonForReturn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        corporateUserName: function(val, state) {
            context["field"] = "corporateUserName";
            context["metadata"] = (objectMetadata ? objectMetadata["corporateUserName"] : null);
            state['corporateUserName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendCharges: function(val, state) {
            context["field"] = "amendCharges";
            context["metadata"] = (objectMetadata ? objectMetadata["amendCharges"] : null);
            state['amendCharges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceRequestTime: function(val, state) {
            context["field"] = "serviceRequestTime";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceRequestTime"] : null);
            state['serviceRequestTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        returnHistory: function(val, state) {
            context["field"] = "returnHistory";
            context["metadata"] = (objectMetadata ? objectMetadata["returnHistory"] : null);
            state['returnHistory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentNo: function(val, state) {
            context["field"] = "amendmentNo";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
            state['amendmentNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isSingleSettlement: function(val, state) {
            context["field"] = "isSingleSettlement";
            context["metadata"] = (objectMetadata ? objectMetadata["isSingleSettlement"] : null);
            state['isSingleSettlement'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isAmendmentFlow: function(val, state) {
            context["field"] = "isAmendmentFlow";
            context["metadata"] = (objectMetadata ? objectMetadata["isAmendmentFlow"] : null);
            state['isAmendmentFlow'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        relatedTransactionReference: function(val, state) {
            context["field"] = "relatedTransactionReference";
            context["metadata"] = (objectMetadata ? objectMetadata["relatedTransactionReference"] : null);
            state['relatedTransactionReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Guarantees(defaultValues) {
        var privateState = {};
        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
                null) :
            null;

        context["field"] = "productType";
        context["metadata"] = (objectMetadata ? objectMetadata["productType"] : null);
        privateState.productType = defaultValues ?
            (defaultValues["productType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productType"], context) :
                null) :
            null;

        context["field"] = "billType";
        context["metadata"] = (objectMetadata ? objectMetadata["billType"] : null);
        privateState.billType = defaultValues ?
            (defaultValues["billType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billType"], context) :
                null) :
            null;

        context["field"] = "guaranteesReference";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteesReference"] : null);
        privateState.guaranteesReference = defaultValues ?
            (defaultValues["guaranteesReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteesReference"], context) :
                null) :
            null;

        context["field"] = "createdOn";
        context["metadata"] = (objectMetadata ? objectMetadata["createdOn"] : null);
        privateState.createdOn = defaultValues ?
            (defaultValues["createdOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdOn"], context) :
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

        context["field"] = "issueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
        privateState.issueDate = defaultValues ?
            (defaultValues["issueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issueDate"], context) :
                null) :
            null;

        context["field"] = "expiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
        privateState.expiryDate = defaultValues ?
            (defaultValues["expiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryDate"], context) :
                null) :
            null;

        context["field"] = "expiryType";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryType"] : null);
        privateState.expiryType = defaultValues ?
            (defaultValues["expiryType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryType"], context) :
                null) :
            null;

        context["field"] = "modeOfTransaction";
        context["metadata"] = (objectMetadata ? objectMetadata["modeOfTransaction"] : null);
        privateState.modeOfTransaction = defaultValues ?
            (defaultValues["modeOfTransaction"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modeOfTransaction"], context) :
                null) :
            null;

        context["field"] = "advisingBank";
        context["metadata"] = (objectMetadata ? objectMetadata["advisingBank"] : null);
        privateState.advisingBank = defaultValues ?
            (defaultValues["advisingBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["advisingBank"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "instructingParty";
        context["metadata"] = (objectMetadata ? objectMetadata["instructingParty"] : null);
        privateState.instructingParty = defaultValues ?
            (defaultValues["instructingParty"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instructingParty"], context) :
                null) :
            null;

        context["field"] = "applicantParty";
        context["metadata"] = (objectMetadata ? objectMetadata["applicantParty"] : null);
        privateState.applicantParty = defaultValues ?
            (defaultValues["applicantParty"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicantParty"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "expectedIssueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["expectedIssueDate"] : null);
        privateState.expectedIssueDate = defaultValues ?
            (defaultValues["expectedIssueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expectedIssueDate"], context) :
                null) :
            null;

        context["field"] = "claimExpiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["claimExpiryDate"] : null);
        privateState.claimExpiryDate = defaultValues ?
            (defaultValues["claimExpiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["claimExpiryDate"], context) :
                null) :
            null;

        context["field"] = "expiryCondition";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryCondition"] : null);
        privateState.expiryCondition = defaultValues ?
            (defaultValues["expiryCondition"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryCondition"], context) :
                null) :
            null;

        context["field"] = "extendExpiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["extendExpiryDate"] : null);
        privateState.extendExpiryDate = defaultValues ?
            (defaultValues["extendExpiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["extendExpiryDate"], context) :
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

        context["field"] = "governingLaw";
        context["metadata"] = (objectMetadata ? objectMetadata["governingLaw"] : null);
        privateState.governingLaw = defaultValues ?
            (defaultValues["governingLaw"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["governingLaw"], context) :
                null) :
            null;

        context["field"] = "otherInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["otherInstructions"] : null);
        privateState.otherInstructions = defaultValues ?
            (defaultValues["otherInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherInstructions"], context) :
                null) :
            null;

        context["field"] = "beneficiaryType";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryType"] : null);
        privateState.beneficiaryType = defaultValues ?
            (defaultValues["beneficiaryType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryType"], context) :
                null) :
            null;

        context["field"] = "recieverInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["recieverInstructions"] : null);
        privateState.recieverInstructions = defaultValues ?
            (defaultValues["recieverInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recieverInstructions"], context) :
                null) :
            null;

        context["field"] = "beneficiaryAddress1";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddress1"] : null);
        privateState.beneficiaryAddress1 = defaultValues ?
            (defaultValues["beneficiaryAddress1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryAddress1"], context) :
                null) :
            null;

        context["field"] = "beneficiaryAddress2";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddress2"] : null);
        privateState.beneficiaryAddress2 = defaultValues ?
            (defaultValues["beneficiaryAddress2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryAddress2"], context) :
                null) :
            null;

        context["field"] = "city";
        context["metadata"] = (objectMetadata ? objectMetadata["city"] : null);
        privateState.city = defaultValues ?
            (defaultValues["city"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["city"], context) :
                null) :
            null;

        context["field"] = "state";
        context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
        privateState.state = defaultValues ?
            (defaultValues["state"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["state"], context) :
                null) :
            null;

        context["field"] = "country";
        context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
        privateState.country = defaultValues ?
            (defaultValues["country"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["country"], context) :
                null) :
            null;

        context["field"] = "zipCode";
        context["metadata"] = (objectMetadata ? objectMetadata["zipCode"] : null);
        privateState.zipCode = defaultValues ?
            (defaultValues["zipCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["zipCode"], context) :
                null) :
            null;

        context["field"] = "saveBeneficiary";
        context["metadata"] = (objectMetadata ? objectMetadata["saveBeneficiary"] : null);
        privateState.saveBeneficiary = defaultValues ?
            (defaultValues["saveBeneficiary"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["saveBeneficiary"], context) :
                null) :
            null;

        context["field"] = "swiftCode";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
        privateState.swiftCode = defaultValues ?
            (defaultValues["swiftCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftCode"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "iban";
        context["metadata"] = (objectMetadata ? objectMetadata["iban"] : null);
        privateState.iban = defaultValues ?
            (defaultValues["iban"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["iban"], context) :
                null) :
            null;

        context["field"] = "localCode";
        context["metadata"] = (objectMetadata ? objectMetadata["localCode"] : null);
        privateState.localCode = defaultValues ?
            (defaultValues["localCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["localCode"], context) :
                null) :
            null;

        context["field"] = "bankAddress1";
        context["metadata"] = (objectMetadata ? objectMetadata["bankAddress1"] : null);
        privateState.bankAddress1 = defaultValues ?
            (defaultValues["bankAddress1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankAddress1"], context) :
                null) :
            null;

        context["field"] = "bankAddress2";
        context["metadata"] = (objectMetadata ? objectMetadata["bankAddress2"] : null);
        privateState.bankAddress2 = defaultValues ?
            (defaultValues["bankAddress2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankAddress2"], context) :
                null) :
            null;

        context["field"] = "bankCity";
        context["metadata"] = (objectMetadata ? objectMetadata["bankCity"] : null);
        privateState.bankCity = defaultValues ?
            (defaultValues["bankCity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankCity"], context) :
                null) :
            null;

        context["field"] = "bankState";
        context["metadata"] = (objectMetadata ? objectMetadata["bankState"] : null);
        privateState.bankState = defaultValues ?
            (defaultValues["bankState"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankState"], context) :
                null) :
            null;

        context["field"] = "bankCountry";
        context["metadata"] = (objectMetadata ? objectMetadata["bankCountry"] : null);
        privateState.bankCountry = defaultValues ?
            (defaultValues["bankCountry"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankCountry"], context) :
                null) :
            null;

        context["field"] = "bankZipCode";
        context["metadata"] = (objectMetadata ? objectMetadata["bankZipCode"] : null);
        privateState.bankZipCode = defaultValues ?
            (defaultValues["bankZipCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankZipCode"], context) :
                null) :
            null;

        context["field"] = "accountType";
        context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
        privateState.accountType = defaultValues ?
            (defaultValues["accountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountType"], context) :
                null) :
            null;

        context["field"] = "chargesAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["chargesAccount"] : null);
        privateState.chargesAccount = defaultValues ?
            (defaultValues["chargesAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chargesAccount"], context) :
                null) :
            null;

        context["field"] = "comissionAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["comissionAccount"] : null);
        privateState.comissionAccount = defaultValues ?
            (defaultValues["comissionAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["comissionAccount"], context) :
                null) :
            null;

        context["field"] = "cashMargin";
        context["metadata"] = (objectMetadata ? objectMetadata["cashMargin"] : null);
        privateState.cashMargin = defaultValues ?
            (defaultValues["cashMargin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cashMargin"], context) :
                null) :
            null;

        context["field"] = "instructionCurrencies";
        context["metadata"] = (objectMetadata ? objectMetadata["instructionCurrencies"] : null);
        privateState.instructionCurrencies = defaultValues ?
            (defaultValues["instructionCurrencies"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instructionCurrencies"], context) :
                null) :
            null;

        context["field"] = "limitInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["limitInstructions"] : null);
        privateState.limitInstructions = defaultValues ?
            (defaultValues["limitInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitInstructions"], context) :
                null) :
            null;

        context["field"] = "otherBankInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["otherBankInstructions"] : null);
        privateState.otherBankInstructions = defaultValues ?
            (defaultValues["otherBankInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherBankInstructions"], context) :
                null) :
            null;

        context["field"] = "messageToBank";
        context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
        privateState.messageToBank = defaultValues ?
            (defaultValues["messageToBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageToBank"], context) :
                null) :
            null;

        context["field"] = "documentReferences";
        context["metadata"] = (objectMetadata ? objectMetadata["documentReferences"] : null);
        privateState.documentReferences = defaultValues ?
            (defaultValues["documentReferences"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentReferences"], context) :
                null) :
            null;

        context["field"] = "documentName";
        context["metadata"] = (objectMetadata ? objectMetadata["documentName"] : null);
        privateState.documentName = defaultValues ?
            (defaultValues["documentName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentName"], context) :
                null) :
            null;

        context["field"] = "clauseConditions";
        context["metadata"] = (objectMetadata ? objectMetadata["clauseConditions"] : null);
        privateState.clauseConditions = defaultValues ?
            (defaultValues["clauseConditions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["clauseConditions"], context) :
                null) :
            null;

        context["field"] = "guaranteesSRMSId";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteesSRMSId"] : null);
        privateState.guaranteesSRMSId = defaultValues ?
            (defaultValues["guaranteesSRMSId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteesSRMSId"], context) :
                null) :
            null;

        context["field"] = "beneficiaryDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryDetails"] : null);
        privateState.beneficiaryDetails = defaultValues ?
            (defaultValues["beneficiaryDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryDetails"], context) :
                null) :
            null;

        context["field"] = "totalAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
        privateState.totalAmount = defaultValues ?
            (defaultValues["totalAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalAmount"], context) :
                null) :
            null;

        context["field"] = "guaranteesReferenceNo";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteesReferenceNo"] : null);
        privateState.guaranteesReferenceNo = defaultValues ?
            (defaultValues["guaranteesReferenceNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteesReferenceNo"], context) :
                null) :
            null;

        context["field"] = "clauseType";
        context["metadata"] = (objectMetadata ? objectMetadata["clauseType"] : null);
        privateState.clauseType = defaultValues ?
            (defaultValues["clauseType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["clauseType"], context) :
                null) :
            null;

        context["field"] = "clauseDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["clauseDescription"] : null);
        privateState.clauseDescription = defaultValues ?
            (defaultValues["clauseDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["clauseDescription"], context) :
                null) :
            null;

        context["field"] = "clauseTitle";
        context["metadata"] = (objectMetadata ? objectMetadata["clauseTitle"] : null);
        privateState.clauseTitle = defaultValues ?
            (defaultValues["clauseTitle"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["clauseTitle"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "clauseId";
        context["metadata"] = (objectMetadata ? objectMetadata["clauseId"] : null);
        privateState.clauseId = defaultValues ?
            (defaultValues["clauseId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["clauseId"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
                null) :
            null;

        context["field"] = "historyCount";
        context["metadata"] = (objectMetadata ? objectMetadata["historyCount"] : null);
        privateState.historyCount = defaultValues ?
            (defaultValues["historyCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["historyCount"], context) :
                null) :
            null;

        context["field"] = "amendmentHistory1";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory1"] : null);
        privateState.amendmentHistory1 = defaultValues ?
            (defaultValues["amendmentHistory1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentHistory1"], context) :
                null) :
            null;

        context["field"] = "amendmentHistory2";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory2"] : null);
        privateState.amendmentHistory2 = defaultValues ?
            (defaultValues["amendmentHistory2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentHistory2"], context) :
                null) :
            null;

        context["field"] = "amendmentHistory3";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory3"] : null);
        privateState.amendmentHistory3 = defaultValues ?
            (defaultValues["amendmentHistory3"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentHistory3"], context) :
                null) :
            null;

        context["field"] = "amendmentHistory4";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory4"] : null);
        privateState.amendmentHistory4 = defaultValues ?
            (defaultValues["amendmentHistory4"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentHistory4"], context) :
                null) :
            null;

        context["field"] = "amendmentHistory5";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory5"] : null);
        privateState.amendmentHistory5 = defaultValues ?
            (defaultValues["amendmentHistory5"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentHistory5"], context) :
                null) :
            null;

        context["field"] = "reasonForReturned";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturned"] : null);
        privateState.reasonForReturned = defaultValues ?
            (defaultValues["reasonForReturned"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForReturned"], context) :
                null) :
            null;

        context["field"] = "amendmentSRMSRequestId";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentSRMSRequestId"] : null);
        privateState.amendmentSRMSRequestId = defaultValues ?
            (defaultValues["amendmentSRMSRequestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentSRMSRequestId"], context) :
                null) :
            null;

        context["field"] = "applicableRules";
        context["metadata"] = (objectMetadata ? objectMetadata["applicableRules"] : null);
        privateState.applicableRules = defaultValues ?
            (defaultValues["applicableRules"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicableRules"], context) :
                null) :
            null;

        context["field"] = "demandAcceptance";
        context["metadata"] = (objectMetadata ? objectMetadata["demandAcceptance"] : null);
        privateState.demandAcceptance = defaultValues ?
            (defaultValues["demandAcceptance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["demandAcceptance"], context) :
                null) :
            null;

        context["field"] = "partialDemandPercentage";
        context["metadata"] = (objectMetadata ? objectMetadata["partialDemandPercentage"] : null);
        privateState.partialDemandPercentage = defaultValues ?
            (defaultValues["partialDemandPercentage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partialDemandPercentage"], context) :
                null) :
            null;

        context["field"] = "deliveryInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["deliveryInstructions"] : null);
        privateState.deliveryInstructions = defaultValues ?
            (defaultValues["deliveryInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deliveryInstructions"], context) :
                null) :
            null;

        context["field"] = "guaranteeAndSBLCType";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteeAndSBLCType"] : null);
        privateState.guaranteeAndSBLCType = defaultValues ?
            (defaultValues["guaranteeAndSBLCType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteeAndSBLCType"], context) :
                null) :
            null;

        context["field"] = "reasonForReturn";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
        privateState.reasonForReturn = defaultValues ?
            (defaultValues["reasonForReturn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForReturn"], context) :
                null) :
            null;

        context["field"] = "corporateUserName";
        context["metadata"] = (objectMetadata ? objectMetadata["corporateUserName"] : null);
        privateState.corporateUserName = defaultValues ?
            (defaultValues["corporateUserName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["corporateUserName"], context) :
                null) :
            null;

        context["field"] = "amendCharges";
        context["metadata"] = (objectMetadata ? objectMetadata["amendCharges"] : null);
        privateState.amendCharges = defaultValues ?
            (defaultValues["amendCharges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendCharges"], context) :
                null) :
            null;

        context["field"] = "serviceRequestTime";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceRequestTime"] : null);
        privateState.serviceRequestTime = defaultValues ?
            (defaultValues["serviceRequestTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceRequestTime"], context) :
                null) :
            null;

        context["field"] = "returnHistory";
        context["metadata"] = (objectMetadata ? objectMetadata["returnHistory"] : null);
        privateState.returnHistory = defaultValues ?
            (defaultValues["returnHistory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["returnHistory"], context) :
                null) :
            null;

        context["field"] = "amendmentNo";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
        privateState.amendmentNo = defaultValues ?
            (defaultValues["amendmentNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentNo"], context) :
                null) :
            null;

        context["field"] = "isSingleSettlement";
        context["metadata"] = (objectMetadata ? objectMetadata["isSingleSettlement"] : null);
        privateState.isSingleSettlement = defaultValues ?
            (defaultValues["isSingleSettlement"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isSingleSettlement"], context) :
                null) :
            null;

        context["field"] = "isAmendmentFlow";
        context["metadata"] = (objectMetadata ? objectMetadata["isAmendmentFlow"] : null);
        privateState.isAmendmentFlow = defaultValues ?
            (defaultValues["isAmendmentFlow"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isAmendmentFlow"], context) :
                null) :
            null;

        context["field"] = "relatedTransactionReference";
        context["metadata"] = (objectMetadata ? objectMetadata["relatedTransactionReference"] : null);
        privateState.relatedTransactionReference = defaultValues ?
            (defaultValues["relatedTransactionReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["relatedTransactionReference"], context) :
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
            "billType": {
                get: function() {
                    context["field"] = "billType";
                    context["metadata"] = (objectMetadata ? objectMetadata["billType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billType, context);
                },
                set: function(val) {
                    setterFunctions['billType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "guaranteesReference": {
                get: function() {
                    context["field"] = "guaranteesReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["guaranteesReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.guaranteesReference, context);
                },
                set: function(val) {
                    setterFunctions['guaranteesReference'].call(this, val, privateState);
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
            "instructingParty": {
                get: function() {
                    context["field"] = "instructingParty";
                    context["metadata"] = (objectMetadata ? objectMetadata["instructingParty"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.instructingParty, context);
                },
                set: function(val) {
                    setterFunctions['instructingParty'].call(this, val, privateState);
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
            "claimExpiryDate": {
                get: function() {
                    context["field"] = "claimExpiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["claimExpiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.claimExpiryDate, context);
                },
                set: function(val) {
                    setterFunctions['claimExpiryDate'].call(this, val, privateState);
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
            "extendExpiryDate": {
                get: function() {
                    context["field"] = "extendExpiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["extendExpiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.extendExpiryDate, context);
                },
                set: function(val) {
                    setterFunctions['extendExpiryDate'].call(this, val, privateState);
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
            "recieverInstructions": {
                get: function() {
                    context["field"] = "recieverInstructions";
                    context["metadata"] = (objectMetadata ? objectMetadata["recieverInstructions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recieverInstructions, context);
                },
                set: function(val) {
                    setterFunctions['recieverInstructions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryAddress1": {
                get: function() {
                    context["field"] = "beneficiaryAddress1";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddress1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryAddress1, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryAddress1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryAddress2": {
                get: function() {
                    context["field"] = "beneficiaryAddress2";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddress2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryAddress2, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryAddress2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "city": {
                get: function() {
                    context["field"] = "city";
                    context["metadata"] = (objectMetadata ? objectMetadata["city"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.city, context);
                },
                set: function(val) {
                    setterFunctions['city'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "state": {
                get: function() {
                    context["field"] = "state";
                    context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.state, context);
                },
                set: function(val) {
                    setterFunctions['state'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "country": {
                get: function() {
                    context["field"] = "country";
                    context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.country, context);
                },
                set: function(val) {
                    setterFunctions['country'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "zipCode": {
                get: function() {
                    context["field"] = "zipCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["zipCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.zipCode, context);
                },
                set: function(val) {
                    setterFunctions['zipCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "saveBeneficiary": {
                get: function() {
                    context["field"] = "saveBeneficiary";
                    context["metadata"] = (objectMetadata ? objectMetadata["saveBeneficiary"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.saveBeneficiary, context);
                },
                set: function(val) {
                    setterFunctions['saveBeneficiary'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "swiftCode": {
                get: function() {
                    context["field"] = "swiftCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swiftCode, context);
                },
                set: function(val) {
                    setterFunctions['swiftCode'].call(this, val, privateState);
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
            "iban": {
                get: function() {
                    context["field"] = "iban";
                    context["metadata"] = (objectMetadata ? objectMetadata["iban"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.iban, context);
                },
                set: function(val) {
                    setterFunctions['iban'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "localCode": {
                get: function() {
                    context["field"] = "localCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["localCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.localCode, context);
                },
                set: function(val) {
                    setterFunctions['localCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankAddress1": {
                get: function() {
                    context["field"] = "bankAddress1";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankAddress1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankAddress1, context);
                },
                set: function(val) {
                    setterFunctions['bankAddress1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankAddress2": {
                get: function() {
                    context["field"] = "bankAddress2";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankAddress2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankAddress2, context);
                },
                set: function(val) {
                    setterFunctions['bankAddress2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankCity": {
                get: function() {
                    context["field"] = "bankCity";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankCity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankCity, context);
                },
                set: function(val) {
                    setterFunctions['bankCity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankState": {
                get: function() {
                    context["field"] = "bankState";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankState"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankState, context);
                },
                set: function(val) {
                    setterFunctions['bankState'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankCountry": {
                get: function() {
                    context["field"] = "bankCountry";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankCountry"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankCountry, context);
                },
                set: function(val) {
                    setterFunctions['bankCountry'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankZipCode": {
                get: function() {
                    context["field"] = "bankZipCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankZipCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankZipCode, context);
                },
                set: function(val) {
                    setterFunctions['bankZipCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountType": {
                get: function() {
                    context["field"] = "accountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountType, context);
                },
                set: function(val) {
                    setterFunctions['accountType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chargesAccount": {
                get: function() {
                    context["field"] = "chargesAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["chargesAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chargesAccount, context);
                },
                set: function(val) {
                    setterFunctions['chargesAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "comissionAccount": {
                get: function() {
                    context["field"] = "comissionAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["comissionAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.comissionAccount, context);
                },
                set: function(val) {
                    setterFunctions['comissionAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cashMargin": {
                get: function() {
                    context["field"] = "cashMargin";
                    context["metadata"] = (objectMetadata ? objectMetadata["cashMargin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cashMargin, context);
                },
                set: function(val) {
                    setterFunctions['cashMargin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "instructionCurrencies": {
                get: function() {
                    context["field"] = "instructionCurrencies";
                    context["metadata"] = (objectMetadata ? objectMetadata["instructionCurrencies"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.instructionCurrencies, context);
                },
                set: function(val) {
                    setterFunctions['instructionCurrencies'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limitInstructions": {
                get: function() {
                    context["field"] = "limitInstructions";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitInstructions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitInstructions, context);
                },
                set: function(val) {
                    setterFunctions['limitInstructions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otherBankInstructions": {
                get: function() {
                    context["field"] = "otherBankInstructions";
                    context["metadata"] = (objectMetadata ? objectMetadata["otherBankInstructions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otherBankInstructions, context);
                },
                set: function(val) {
                    setterFunctions['otherBankInstructions'].call(this, val, privateState);
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
            "documentReferences": {
                get: function() {
                    context["field"] = "documentReferences";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentReferences"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentReferences, context);
                },
                set: function(val) {
                    setterFunctions['documentReferences'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentName": {
                get: function() {
                    context["field"] = "documentName";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentName, context);
                },
                set: function(val) {
                    setterFunctions['documentName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "clauseConditions": {
                get: function() {
                    context["field"] = "clauseConditions";
                    context["metadata"] = (objectMetadata ? objectMetadata["clauseConditions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.clauseConditions, context);
                },
                set: function(val) {
                    setterFunctions['clauseConditions'].call(this, val, privateState);
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
            "totalAmount": {
                get: function() {
                    context["field"] = "totalAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalAmount, context);
                },
                set: function(val) {
                    setterFunctions['totalAmount'].call(this, val, privateState);
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
            "clauseType": {
                get: function() {
                    context["field"] = "clauseType";
                    context["metadata"] = (objectMetadata ? objectMetadata["clauseType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.clauseType, context);
                },
                set: function(val) {
                    setterFunctions['clauseType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "clauseDescription": {
                get: function() {
                    context["field"] = "clauseDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["clauseDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.clauseDescription, context);
                },
                set: function(val) {
                    setterFunctions['clauseDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "clauseTitle": {
                get: function() {
                    context["field"] = "clauseTitle";
                    context["metadata"] = (objectMetadata ? objectMetadata["clauseTitle"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.clauseTitle, context);
                },
                set: function(val) {
                    setterFunctions['clauseTitle'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "id": {
                get: function() {
                    context["field"] = "id";
                    context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id, context);
                },
                set: function(val) {
                    setterFunctions['id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "clauseId": {
                get: function() {
                    context["field"] = "clauseId";
                    context["metadata"] = (objectMetadata ? objectMetadata["clauseId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.clauseId, context);
                },
                set: function(val) {
                    setterFunctions['clauseId'].call(this, val, privateState);
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
            "historyCount": {
                get: function() {
                    context["field"] = "historyCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["historyCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.historyCount, context);
                },
                set: function(val) {
                    setterFunctions['historyCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentHistory1": {
                get: function() {
                    context["field"] = "amendmentHistory1";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentHistory1, context);
                },
                set: function(val) {
                    setterFunctions['amendmentHistory1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentHistory2": {
                get: function() {
                    context["field"] = "amendmentHistory2";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentHistory2, context);
                },
                set: function(val) {
                    setterFunctions['amendmentHistory2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentHistory3": {
                get: function() {
                    context["field"] = "amendmentHistory3";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory3"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentHistory3, context);
                },
                set: function(val) {
                    setterFunctions['amendmentHistory3'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentHistory4": {
                get: function() {
                    context["field"] = "amendmentHistory4";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory4"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentHistory4, context);
                },
                set: function(val) {
                    setterFunctions['amendmentHistory4'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentHistory5": {
                get: function() {
                    context["field"] = "amendmentHistory5";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentHistory5"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentHistory5, context);
                },
                set: function(val) {
                    setterFunctions['amendmentHistory5'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reasonForReturned": {
                get: function() {
                    context["field"] = "reasonForReturned";
                    context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturned"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reasonForReturned, context);
                },
                set: function(val) {
                    setterFunctions['reasonForReturned'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentSRMSRequestId": {
                get: function() {
                    context["field"] = "amendmentSRMSRequestId";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentSRMSRequestId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentSRMSRequestId, context);
                },
                set: function(val) {
                    setterFunctions['amendmentSRMSRequestId'].call(this, val, privateState);
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
            "partialDemandPercentage": {
                get: function() {
                    context["field"] = "partialDemandPercentage";
                    context["metadata"] = (objectMetadata ? objectMetadata["partialDemandPercentage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partialDemandPercentage, context);
                },
                set: function(val) {
                    setterFunctions['partialDemandPercentage'].call(this, val, privateState);
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
            "amendCharges": {
                get: function() {
                    context["field"] = "amendCharges";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendCharges"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendCharges, context);
                },
                set: function(val) {
                    setterFunctions['amendCharges'].call(this, val, privateState);
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
            "returnHistory": {
                get: function() {
                    context["field"] = "returnHistory";
                    context["metadata"] = (objectMetadata ? objectMetadata["returnHistory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.returnHistory, context);
                },
                set: function(val) {
                    setterFunctions['returnHistory'].call(this, val, privateState);
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
            "isSingleSettlement": {
                get: function() {
                    context["field"] = "isSingleSettlement";
                    context["metadata"] = (objectMetadata ? objectMetadata["isSingleSettlement"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isSingleSettlement, context);
                },
                set: function(val) {
                    setterFunctions['isSingleSettlement'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isAmendmentFlow": {
                get: function() {
                    context["field"] = "isAmendmentFlow";
                    context["metadata"] = (objectMetadata ? objectMetadata["isAmendmentFlow"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isAmendmentFlow, context);
                },
                set: function(val) {
                    setterFunctions['isAmendmentFlow'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.productType = value ? (value["productType"] ? value["productType"] : null) : null;
            privateState.billType = value ? (value["billType"] ? value["billType"] : null) : null;
            privateState.guaranteesReference = value ? (value["guaranteesReference"] ? value["guaranteesReference"] : null) : null;
            privateState.createdOn = value ? (value["createdOn"] ? value["createdOn"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.issueDate = value ? (value["issueDate"] ? value["issueDate"] : null) : null;
            privateState.expiryDate = value ? (value["expiryDate"] ? value["expiryDate"] : null) : null;
            privateState.expiryType = value ? (value["expiryType"] ? value["expiryType"] : null) : null;
            privateState.modeOfTransaction = value ? (value["modeOfTransaction"] ? value["modeOfTransaction"] : null) : null;
            privateState.advisingBank = value ? (value["advisingBank"] ? value["advisingBank"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.instructingParty = value ? (value["instructingParty"] ? value["instructingParty"] : null) : null;
            privateState.applicantParty = value ? (value["applicantParty"] ? value["applicantParty"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.expectedIssueDate = value ? (value["expectedIssueDate"] ? value["expectedIssueDate"] : null) : null;
            privateState.claimExpiryDate = value ? (value["claimExpiryDate"] ? value["claimExpiryDate"] : null) : null;
            privateState.expiryCondition = value ? (value["expiryCondition"] ? value["expiryCondition"] : null) : null;
            privateState.extendExpiryDate = value ? (value["extendExpiryDate"] ? value["extendExpiryDate"] : null) : null;
            privateState.extensionPeriod = value ? (value["extensionPeriod"] ? value["extensionPeriod"] : null) : null;
            privateState.extensionCapPeriod = value ? (value["extensionCapPeriod"] ? value["extensionCapPeriod"] : null) : null;
            privateState.notificationPeriod = value ? (value["notificationPeriod"] ? value["notificationPeriod"] : null) : null;
            privateState.extensionDetails = value ? (value["extensionDetails"] ? value["extensionDetails"] : null) : null;
            privateState.governingLaw = value ? (value["governingLaw"] ? value["governingLaw"] : null) : null;
            privateState.otherInstructions = value ? (value["otherInstructions"] ? value["otherInstructions"] : null) : null;
            privateState.beneficiaryType = value ? (value["beneficiaryType"] ? value["beneficiaryType"] : null) : null;
            privateState.recieverInstructions = value ? (value["recieverInstructions"] ? value["recieverInstructions"] : null) : null;
            privateState.beneficiaryAddress1 = value ? (value["beneficiaryAddress1"] ? value["beneficiaryAddress1"] : null) : null;
            privateState.beneficiaryAddress2 = value ? (value["beneficiaryAddress2"] ? value["beneficiaryAddress2"] : null) : null;
            privateState.city = value ? (value["city"] ? value["city"] : null) : null;
            privateState.state = value ? (value["state"] ? value["state"] : null) : null;
            privateState.country = value ? (value["country"] ? value["country"] : null) : null;
            privateState.zipCode = value ? (value["zipCode"] ? value["zipCode"] : null) : null;
            privateState.saveBeneficiary = value ? (value["saveBeneficiary"] ? value["saveBeneficiary"] : null) : null;
            privateState.swiftCode = value ? (value["swiftCode"] ? value["swiftCode"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.iban = value ? (value["iban"] ? value["iban"] : null) : null;
            privateState.localCode = value ? (value["localCode"] ? value["localCode"] : null) : null;
            privateState.bankAddress1 = value ? (value["bankAddress1"] ? value["bankAddress1"] : null) : null;
            privateState.bankAddress2 = value ? (value["bankAddress2"] ? value["bankAddress2"] : null) : null;
            privateState.bankCity = value ? (value["bankCity"] ? value["bankCity"] : null) : null;
            privateState.bankState = value ? (value["bankState"] ? value["bankState"] : null) : null;
            privateState.bankCountry = value ? (value["bankCountry"] ? value["bankCountry"] : null) : null;
            privateState.bankZipCode = value ? (value["bankZipCode"] ? value["bankZipCode"] : null) : null;
            privateState.accountType = value ? (value["accountType"] ? value["accountType"] : null) : null;
            privateState.chargesAccount = value ? (value["chargesAccount"] ? value["chargesAccount"] : null) : null;
            privateState.comissionAccount = value ? (value["comissionAccount"] ? value["comissionAccount"] : null) : null;
            privateState.cashMargin = value ? (value["cashMargin"] ? value["cashMargin"] : null) : null;
            privateState.instructionCurrencies = value ? (value["instructionCurrencies"] ? value["instructionCurrencies"] : null) : null;
            privateState.limitInstructions = value ? (value["limitInstructions"] ? value["limitInstructions"] : null) : null;
            privateState.otherBankInstructions = value ? (value["otherBankInstructions"] ? value["otherBankInstructions"] : null) : null;
            privateState.messageToBank = value ? (value["messageToBank"] ? value["messageToBank"] : null) : null;
            privateState.documentReferences = value ? (value["documentReferences"] ? value["documentReferences"] : null) : null;
            privateState.documentName = value ? (value["documentName"] ? value["documentName"] : null) : null;
            privateState.clauseConditions = value ? (value["clauseConditions"] ? value["clauseConditions"] : null) : null;
            privateState.guaranteesSRMSId = value ? (value["guaranteesSRMSId"] ? value["guaranteesSRMSId"] : null) : null;
            privateState.beneficiaryDetails = value ? (value["beneficiaryDetails"] ? value["beneficiaryDetails"] : null) : null;
            privateState.totalAmount = value ? (value["totalAmount"] ? value["totalAmount"] : null) : null;
            privateState.guaranteesReferenceNo = value ? (value["guaranteesReferenceNo"] ? value["guaranteesReferenceNo"] : null) : null;
            privateState.clauseType = value ? (value["clauseType"] ? value["clauseType"] : null) : null;
            privateState.clauseDescription = value ? (value["clauseDescription"] ? value["clauseDescription"] : null) : null;
            privateState.clauseTitle = value ? (value["clauseTitle"] ? value["clauseTitle"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.clauseId = value ? (value["clauseId"] ? value["clauseId"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.historyCount = value ? (value["historyCount"] ? value["historyCount"] : null) : null;
            privateState.amendmentHistory1 = value ? (value["amendmentHistory1"] ? value["amendmentHistory1"] : null) : null;
            privateState.amendmentHistory2 = value ? (value["amendmentHistory2"] ? value["amendmentHistory2"] : null) : null;
            privateState.amendmentHistory3 = value ? (value["amendmentHistory3"] ? value["amendmentHistory3"] : null) : null;
            privateState.amendmentHistory4 = value ? (value["amendmentHistory4"] ? value["amendmentHistory4"] : null) : null;
            privateState.amendmentHistory5 = value ? (value["amendmentHistory5"] ? value["amendmentHistory5"] : null) : null;
            privateState.reasonForReturned = value ? (value["reasonForReturned"] ? value["reasonForReturned"] : null) : null;
            privateState.amendmentSRMSRequestId = value ? (value["amendmentSRMSRequestId"] ? value["amendmentSRMSRequestId"] : null) : null;
            privateState.applicableRules = value ? (value["applicableRules"] ? value["applicableRules"] : null) : null;
            privateState.demandAcceptance = value ? (value["demandAcceptance"] ? value["demandAcceptance"] : null) : null;
            privateState.partialDemandPercentage = value ? (value["partialDemandPercentage"] ? value["partialDemandPercentage"] : null) : null;
            privateState.deliveryInstructions = value ? (value["deliveryInstructions"] ? value["deliveryInstructions"] : null) : null;
            privateState.guaranteeAndSBLCType = value ? (value["guaranteeAndSBLCType"] ? value["guaranteeAndSBLCType"] : null) : null;
            privateState.reasonForReturn = value ? (value["reasonForReturn"] ? value["reasonForReturn"] : null) : null;
            privateState.corporateUserName = value ? (value["corporateUserName"] ? value["corporateUserName"] : null) : null;
            privateState.amendCharges = value ? (value["amendCharges"] ? value["amendCharges"] : null) : null;
            privateState.serviceRequestTime = value ? (value["serviceRequestTime"] ? value["serviceRequestTime"] : null) : null;
            privateState.returnHistory = value ? (value["returnHistory"] ? value["returnHistory"] : null) : null;
            privateState.amendmentNo = value ? (value["amendmentNo"] ? value["amendmentNo"] : null) : null;
            privateState.isSingleSettlement = value ? (value["isSingleSettlement"] ? value["isSingleSettlement"] : null) : null;
            privateState.isAmendmentFlow = value ? (value["isAmendmentFlow"] ? value["isAmendmentFlow"] : null) : null;
            privateState.relatedTransactionReference = value ? (value["relatedTransactionReference"] ? value["relatedTransactionReference"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Guarantees);

    //Create new class level validator object
    BaseModel.Validator.call(Guarantees);

    var registerValidatorBackup = Guarantees.registerValidator;

    Guarantees.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Guarantees.isValid(this, propName, val)) {
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
    //For Operation 'getClauses' with service id 'getClauses3469'
     Guarantees.getClauses = function(params, onCompletion){
        return Guarantees.customVerb('getClauses', params, onCompletion);
     };

    //For Operation 'createGuarantees' with service id 'createGuarantees5896'
     Guarantees.createGuarantees = function(params, onCompletion){
        return Guarantees.customVerb('createGuarantees', params, onCompletion);
     };

    //For Operation 'saveGuarantees' with service id 'saveGuarantees2652'
     Guarantees.saveGuarantees = function(params, onCompletion){
        return Guarantees.customVerb('saveGuarantees', params, onCompletion);
     };

    //For Operation 'getGuaranteeAmendments' with service id 'GetGuaranteeLCAmendments7172'
     Guarantees.getGuaranteeAmendments = function(params, onCompletion){
        return Guarantees.customVerb('getGuaranteeAmendments', params, onCompletion);
     };

    //For Operation 'updateGuaranteeLetterOfCredit' with service id 'UpdateGuaranteeLetterOfCredit1549'
     Guarantees.updateGuaranteeLetterOfCredit = function(params, onCompletion){
        return Guarantees.customVerb('updateGuaranteeLetterOfCredit', params, onCompletion);
     };

    //For Operation 'updateGuaranteeLcByBank' with service id 'UpdateGuaranteeLcByBank5547'
     Guarantees.updateGuaranteeLcByBank = function(params, onCompletion){
        return Guarantees.customVerb('updateGuaranteeLcByBank', params, onCompletion);
     };

    //For Operation 'DeleteGuaranteeLetterOfCredit' with service id 'DeleteGuaranteeLetterOfCredit4718'
     Guarantees.DeleteGuaranteeLetterOfCredit = function(params, onCompletion){
        return Guarantees.customVerb('DeleteGuaranteeLetterOfCredit', params, onCompletion);
     };

    //For Operation 'updateGuaranteeAmendment' with service id 'updateGuaranteeAmendment3210'
     Guarantees.updateGuaranteeAmendment = function(params, onCompletion){
        return Guarantees.customVerb('updateGuaranteeAmendment', params, onCompletion);
     };

    //For Operation 'createClause' with service id 'createClause7329'
     Guarantees.createClause = function(params, onCompletion){
        return Guarantees.customVerb('createClause', params, onCompletion);
     };

    //For Operation 'getLimitInstructions' with service id 'GetLimitInstructions5155'
     Guarantees.getLimitInstructions = function(params, onCompletion){
        return Guarantees.customVerb('getLimitInstructions', params, onCompletion);
     };

    //For Operation 'createGuaranteeAmendment' with service id 'CreateGuaranteeLCAmendment8000'
     Guarantees.createGuaranteeAmendment = function(params, onCompletion){
        return Guarantees.customVerb('createGuaranteeAmendment', params, onCompletion);
     };

    //For Operation 'getGuaranteeAmendmentById' with service id 'GetGuaranteeLCAmendmentById2101'
     Guarantees.getGuaranteeAmendmentById = function(params, onCompletion){
        return Guarantees.customVerb('getGuaranteeAmendmentById', params, onCompletion);
     };

    //For Operation 'getGuaranteesById' with service id 'getGuaranteesById6187'
     Guarantees.getGuaranteesById = function(params, onCompletion){
        return Guarantees.customVerb('getGuaranteesById', params, onCompletion);
     };

    //For Operation 'getGuarantees' with service id 'GetGuarantees9393'
     Guarantees.getGuarantees = function(params, onCompletion){
        return Guarantees.customVerb('getGuarantees', params, onCompletion);
     };

    //For Operation 'updateClause' with service id 'updateClause8208'
     Guarantees.updateClause = function(params, onCompletion){
        return Guarantees.customVerb('updateClause', params, onCompletion);
     };

    //For Operation 'generateGuaranteeAmendmentList' with service id 'GenerateGuaranteeAmendmentList2417'
     Guarantees.generateGuaranteeAmendmentList = function(params, onCompletion){
        return Guarantees.customVerb('generateGuaranteeAmendmentList', params, onCompletion);
     };

    //For Operation 'updateGuaranteeAmendmentByBank' with service id 'updateGuaranteeAmendmentByBank9650'
     Guarantees.updateGuaranteeAmendmentByBank = function(params, onCompletion){
        return Guarantees.customVerb('updateGuaranteeAmendmentByBank', params, onCompletion);
     };

    //For Operation 'generateGuaranteeAmendment' with service id 'GeneratePDFGuaranteeLCAmendment4776'
     Guarantees.generateGuaranteeAmendment = function(params, onCompletion){
        return Guarantees.customVerb('generateGuaranteeAmendment', params, onCompletion);
     };

    //For Operation 'generateGuarantees' with service id 'generateGuarantees6203'
     Guarantees.generateGuarantees = function(params, onCompletion){
        return Guarantees.customVerb('generateGuarantees', params, onCompletion);
     };

    //For Operation 'UpdateIssuedGuaranteeClaimByBank' with service id 'UpdateIssuedGuaranteeClaimByBank4988'
     Guarantees.UpdateIssuedGuaranteeClaimByBank = function(params, onCompletion){
        return Guarantees.customVerb('UpdateIssuedGuaranteeClaimByBank', params, onCompletion);
     };

    var relations = [];

    Guarantees.relations = relations;

    Guarantees.prototype.isValid = function() {
        return Guarantees.isValid(this);
    };

    Guarantees.prototype.objModelName = "Guarantees";
    Guarantees.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Guarantees.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "Guarantees", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Guarantees.clone = function(objectToClone) {
        var clonedObj = new Guarantees();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Guarantees;
});