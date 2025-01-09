/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ExportLetterOfCredit", "objectService" : "TradeFinance"};

    var setterFunctions = {
        searchString: function(val, state) {
            context["field"] = "searchString";
            context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
            state['searchString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageSize: function(val, state) {
            context["field"] = "pageSize";
            context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
            state['pageSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageOffset: function(val, state) {
            context["field"] = "pageOffset";
            context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
            state['pageOffset'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortByParam: function(val, state) {
            context["field"] = "sortByParam";
            context["metadata"] = (objectMetadata ? objectMetadata["sortByParam"] : null);
            state['sortByParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortOrder: function(val, state) {
            context["field"] = "sortOrder";
            context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
            state['sortOrder'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        timeParam: function(val, state) {
            context["field"] = "timeParam";
            context["metadata"] = (objectMetadata ? objectMetadata["timeParam"] : null);
            state['timeParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        timeValue: function(val, state) {
            context["field"] = "timeValue";
            context["metadata"] = (objectMetadata ? objectMetadata["timeValue"] : null);
            state['timeValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        filterByValue: function(val, state) {
            context["field"] = "filterByValue";
            context["metadata"] = (objectMetadata ? objectMetadata["filterByValue"] : null);
            state['filterByValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        filterByParam: function(val, state) {
            context["field"] = "filterByParam";
            context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
            state['filterByParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        lcReferenceNo: function(val, state) {
            context["field"] = "lcReferenceNo";
            context["metadata"] = (objectMetadata ? objectMetadata["lcReferenceNo"] : null);
            state['lcReferenceNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exportLCId: function(val, state) {
            context["field"] = "exportLCId";
            context["metadata"] = (objectMetadata ? objectMetadata["exportLCId"] : null);
            state['exportLCId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingReferenceNo: function(val, state) {
            context["field"] = "drawingReferenceNo";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingReferenceNo"] : null);
            state['drawingReferenceNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingSRMSRequestId: function(val, state) {
            context["field"] = "drawingSRMSRequestId";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingSRMSRequestId"] : null);
            state['drawingSRMSRequestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingAmount: function(val, state) {
            context["field"] = "drawingAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingAmount"] : null);
            state['drawingAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcType: function(val, state) {
            context["field"] = "lcType";
            context["metadata"] = (objectMetadata ? objectMetadata["lcType"] : null);
            state['lcType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuingBankReference: function(val, state) {
            context["field"] = "issuingBankReference";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingBankReference"] : null);
            state['issuingBankReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        advisingBankReference: function(val, state) {
            context["field"] = "advisingBankReference";
            context["metadata"] = (objectMetadata ? objectMetadata["advisingBankReference"] : null);
            state['advisingBankReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicant: function(val, state) {
            context["field"] = "applicant";
            context["metadata"] = (objectMetadata ? objectMetadata["applicant"] : null);
            state['applicant'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        utilizedLCAmount: function(val, state) {
            context["field"] = "utilizedLCAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["utilizedLCAmount"] : null);
            state['utilizedLCAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issueDate: function(val, state) {
            context["field"] = "issueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
            state['issueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryDate: function(val, state) {
            context["field"] = "expiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
            state['expiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuingBank: function(val, state) {
            context["field"] = "issuingBank";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingBank"] : null);
            state['issuingBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicantaddress: function(val, state) {
            context["field"] = "applicantaddress";
            context["metadata"] = (objectMetadata ? objectMetadata["applicantaddress"] : null);
            state['applicantaddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuingbankaddress: function(val, state) {
            context["field"] = "issuingbankaddress";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingbankaddress"] : null);
            state['issuingbankaddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentTerms: function(val, state) {
            context["field"] = "paymentTerms";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentTerms"] : null);
            state['paymentTerms'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentName: function(val, state) {
            context["field"] = "documentName";
            context["metadata"] = (objectMetadata ? objectMetadata["documentName"] : null);
            state['documentName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadedFiles: function(val, state) {
            context["field"] = "uploadedFiles";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedFiles"] : null);
            state['uploadedFiles'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        forwardContract: function(val, state) {
            context["field"] = "forwardContract";
            context["metadata"] = (objectMetadata ? objectMetadata["forwardContract"] : null);
            state['forwardContract'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryAddress: function(val, state) {
            context["field"] = "beneficiaryAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddress"] : null);
            state['beneficiaryAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        goodsDescription: function(val, state) {
            context["field"] = "goodsDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["goodsDescription"] : null);
            state['goodsDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        additionalConditions: function(val, state) {
            context["field"] = "additionalConditions";
            context["metadata"] = (objectMetadata ? objectMetadata["additionalConditions"] : null);
            state['additionalConditions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        confirmInstructions: function(val, state) {
            context["field"] = "confirmInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["confirmInstructions"] : null);
            state['confirmInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        latestShipmentDate: function(val, state) {
            context["field"] = "latestShipmentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["latestShipmentDate"] : null);
            state['latestShipmentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentChargesPayer: function(val, state) {
            context["field"] = "amendmentChargesPayer";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentChargesPayer"] : null);
            state['amendmentChargesPayer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentReceivedDate: function(val, state) {
            context["field"] = "amendmentReceivedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentReceivedDate"] : null);
            state['amendmentReceivedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exportlcReferenceNo: function(val, state) {
            context["field"] = "exportlcReferenceNo";
            context["metadata"] = (objectMetadata ? objectMetadata["exportlcReferenceNo"] : null);
            state['exportlcReferenceNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exportlcSRMSRequestId: function(val, state) {
            context["field"] = "exportlcSRMSRequestId";
            context["metadata"] = (objectMetadata ? objectMetadata["exportlcSRMSRequestId"] : null);
            state['exportlcSRMSRequestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcCreatedOn: function(val, state) {
            context["field"] = "lcCreatedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["lcCreatedOn"] : null);
            state['lcCreatedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        financeBill: function(val, state) {
            context["field"] = "financeBill";
            context["metadata"] = (objectMetadata ? objectMetadata["financeBill"] : null);
            state['financeBill'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditAccount: function(val, state) {
            context["field"] = "creditAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["creditAccount"] : null);
            state['creditAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        externalAccount: function(val, state) {
            context["field"] = "externalAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["externalAccount"] : null);
            state['externalAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chargesDebitAccount: function(val, state) {
            context["field"] = "chargesDebitAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["chargesDebitAccount"] : null);
            state['chargesDebitAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageToBank: function(val, state) {
            context["field"] = "messageToBank";
            context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
            state['messageToBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        physicalDocuments: function(val, state) {
            context["field"] = "physicalDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["physicalDocuments"] : null);
            state['physicalDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadedDocuments: function(val, state) {
            context["field"] = "uploadedDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedDocuments"] : null);
            state['uploadedDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        forwardDocuments: function(val, state) {
            context["field"] = "forwardDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["forwardDocuments"] : null);
            state['forwardDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcAmount: function(val, state) {
            context["field"] = "lcAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["lcAmount"] : null);
            state['lcAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcCurrency: function(val, state) {
            context["field"] = "lcCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["lcCurrency"] : null);
            state['lcCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcIssueDate: function(val, state) {
            context["field"] = "lcIssueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lcIssueDate"] : null);
            state['lcIssueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDate: function(val, state) {
            context["field"] = "paymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
            state['paymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalDocuments: function(val, state) {
            context["field"] = "totalDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["totalDocuments"] : null);
            state['totalDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentStatus: function(val, state) {
            context["field"] = "documentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
            state['documentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        discrepencies: function(val, state) {
            context["field"] = "discrepencies";
            context["metadata"] = (objectMetadata ? objectMetadata["discrepencies"] : null);
            state['discrepencies'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        discrepenciesAcceptance: function(val, state) {
            context["field"] = "discrepenciesAcceptance";
            context["metadata"] = (objectMetadata ? objectMetadata["discrepenciesAcceptance"] : null);
            state['discrepenciesAcceptance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalAmount: function(val, state) {
            context["field"] = "totalAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
            state['totalAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForReturn: function(val, state) {
            context["field"] = "reasonForReturn";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
            state['reasonForReturn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingCreatedDate: function(val, state) {
            context["field"] = "drawingCreatedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingCreatedDate"] : null);
            state['drawingCreatedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        discrepanciesHistory1: function(val, state) {
            context["field"] = "discrepanciesHistory1";
            context["metadata"] = (objectMetadata ? objectMetadata["discrepanciesHistory1"] : null);
            state['discrepanciesHistory1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        discrepanciesHistory2: function(val, state) {
            context["field"] = "discrepanciesHistory2";
            context["metadata"] = (objectMetadata ? objectMetadata["discrepanciesHistory2"] : null);
            state['discrepanciesHistory2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        discrepanciesHistory3: function(val, state) {
            context["field"] = "discrepanciesHistory3";
            context["metadata"] = (objectMetadata ? objectMetadata["discrepanciesHistory3"] : null);
            state['discrepanciesHistory3'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentReference: function(val, state) {
            context["field"] = "documentReference";
            context["metadata"] = (objectMetadata ? objectMetadata["documentReference"] : null);
            state['documentReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        returnMessageToBank: function(val, state) {
            context["field"] = "returnMessageToBank";
            context["metadata"] = (objectMetadata ? objectMetadata["returnMessageToBank"] : null);
            state['returnMessageToBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        newLcAmount: function(val, state) {
            context["field"] = "newLcAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["newLcAmount"] : null);
            state['newLcAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentStatus: function(val, state) {
            context["field"] = "amendmentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentStatus"] : null);
            state['amendmentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        periodOfPresentation: function(val, state) {
            context["field"] = "periodOfPresentation";
            context["metadata"] = (objectMetadata ? objectMetadata["periodOfPresentation"] : null);
            state['periodOfPresentation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForSelfRejection: function(val, state) {
            context["field"] = "reasonForSelfRejection";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForSelfRejection"] : null);
            state['reasonForSelfRejection'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicantName: function(val, state) {
            context["field"] = "applicantName";
            context["metadata"] = (objectMetadata ? objectMetadata["applicantName"] : null);
            state['applicantName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentNo: function(val, state) {
            context["field"] = "amendmentNo";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
            state['amendmentNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentSRMSRequestId: function(val, state) {
            context["field"] = "amendmentSRMSRequestId";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentSRMSRequestId"] : null);
            state['amendmentSRMSRequestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        selfRejectedDate: function(val, state) {
            context["field"] = "selfRejectedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["selfRejectedDate"] : null);
            state['selfRejectedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentReferenceNo: function(val, state) {
            context["field"] = "amendmentReferenceNo";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentReferenceNo"] : null);
            state['amendmentReferenceNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        oldLcAmount: function(val, state) {
            context["field"] = "oldLcAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["oldLcAmount"] : null);
            state['oldLcAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        selfAcceptance: function(val, state) {
            context["field"] = "selfAcceptance";
            context["metadata"] = (objectMetadata ? objectMetadata["selfAcceptance"] : null);
            state['selfAcceptance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherAmendments: function(val, state) {
            context["field"] = "otherAmendments";
            context["metadata"] = (objectMetadata ? objectMetadata["otherAmendments"] : null);
            state['otherAmendments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcAmountStatus: function(val, state) {
            context["field"] = "lcAmountStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["lcAmountStatus"] : null);
            state['lcAmountStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcExpiryDate: function(val, state) {
            context["field"] = "lcExpiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lcExpiryDate"] : null);
            state['lcExpiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        selfAcceptanceDate: function(val, state) {
            context["field"] = "selfAcceptanceDate";
            context["metadata"] = (objectMetadata ? objectMetadata["selfAcceptanceDate"] : null);
            state['selfAcceptanceDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcUpdatedOn: function(val, state) {
            context["field"] = "lcUpdatedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["lcUpdatedOn"] : null);
            state['lcUpdatedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryConsent: function(val, state) {
            context["field"] = "beneficiaryConsent";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryConsent"] : null);
            state['beneficiaryConsent'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForRejection: function(val, state) {
            context["field"] = "reasonForRejection";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForRejection"] : null);
            state['reasonForRejection'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ExportLetterOfCredit(defaultValues) {
        var privateState = {};
        context["field"] = "searchString";
        context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
        privateState.searchString = defaultValues ?
            (defaultValues["searchString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchString"], context) :
                null) :
            null;

        context["field"] = "pageSize";
        context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
        privateState.pageSize = defaultValues ?
            (defaultValues["pageSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageSize"], context) :
                null) :
            null;

        context["field"] = "pageOffset";
        context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
        privateState.pageOffset = defaultValues ?
            (defaultValues["pageOffset"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageOffset"], context) :
                null) :
            null;

        context["field"] = "sortByParam";
        context["metadata"] = (objectMetadata ? objectMetadata["sortByParam"] : null);
        privateState.sortByParam = defaultValues ?
            (defaultValues["sortByParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortByParam"], context) :
                null) :
            null;

        context["field"] = "sortOrder";
        context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
        privateState.sortOrder = defaultValues ?
            (defaultValues["sortOrder"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortOrder"], context) :
                null) :
            null;

        context["field"] = "timeParam";
        context["metadata"] = (objectMetadata ? objectMetadata["timeParam"] : null);
        privateState.timeParam = defaultValues ?
            (defaultValues["timeParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["timeParam"], context) :
                null) :
            null;

        context["field"] = "timeValue";
        context["metadata"] = (objectMetadata ? objectMetadata["timeValue"] : null);
        privateState.timeValue = defaultValues ?
            (defaultValues["timeValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["timeValue"], context) :
                null) :
            null;

        context["field"] = "filterByValue";
        context["metadata"] = (objectMetadata ? objectMetadata["filterByValue"] : null);
        privateState.filterByValue = defaultValues ?
            (defaultValues["filterByValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["filterByValue"], context) :
                null) :
            null;

        context["field"] = "filterByParam";
        context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
        privateState.filterByParam = defaultValues ?
            (defaultValues["filterByParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["filterByParam"], context) :
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

        context["field"] = "lcReferenceNo";
        context["metadata"] = (objectMetadata ? objectMetadata["lcReferenceNo"] : null);
        privateState.lcReferenceNo = defaultValues ?
            (defaultValues["lcReferenceNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcReferenceNo"], context) :
                null) :
            null;

        context["field"] = "exportLCId";
        context["metadata"] = (objectMetadata ? objectMetadata["exportLCId"] : null);
        privateState.exportLCId = defaultValues ?
            (defaultValues["exportLCId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exportLCId"], context) :
                null) :
            null;

        context["field"] = "drawingReferenceNo";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingReferenceNo"] : null);
        privateState.drawingReferenceNo = defaultValues ?
            (defaultValues["drawingReferenceNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingReferenceNo"], context) :
                null) :
            null;

        context["field"] = "drawingSRMSRequestId";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingSRMSRequestId"] : null);
        privateState.drawingSRMSRequestId = defaultValues ?
            (defaultValues["drawingSRMSRequestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingSRMSRequestId"], context) :
                null) :
            null;

        context["field"] = "drawingAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingAmount"] : null);
        privateState.drawingAmount = defaultValues ?
            (defaultValues["drawingAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingAmount"], context) :
                null) :
            null;

        context["field"] = "lcType";
        context["metadata"] = (objectMetadata ? objectMetadata["lcType"] : null);
        privateState.lcType = defaultValues ?
            (defaultValues["lcType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcType"], context) :
                null) :
            null;

        context["field"] = "issuingBankReference";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingBankReference"] : null);
        privateState.issuingBankReference = defaultValues ?
            (defaultValues["issuingBankReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingBankReference"], context) :
                null) :
            null;

        context["field"] = "advisingBankReference";
        context["metadata"] = (objectMetadata ? objectMetadata["advisingBankReference"] : null);
        privateState.advisingBankReference = defaultValues ?
            (defaultValues["advisingBankReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["advisingBankReference"], context) :
                null) :
            null;

        context["field"] = "applicant";
        context["metadata"] = (objectMetadata ? objectMetadata["applicant"] : null);
        privateState.applicant = defaultValues ?
            (defaultValues["applicant"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicant"], context) :
                null) :
            null;

        context["field"] = "utilizedLCAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["utilizedLCAmount"] : null);
        privateState.utilizedLCAmount = defaultValues ?
            (defaultValues["utilizedLCAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["utilizedLCAmount"], context) :
                null) :
            null;

        context["field"] = "issueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
        privateState.issueDate = defaultValues ?
            (defaultValues["issueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issueDate"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "expiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
        privateState.expiryDate = defaultValues ?
            (defaultValues["expiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryDate"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "issuingBank";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingBank"] : null);
        privateState.issuingBank = defaultValues ?
            (defaultValues["issuingBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingBank"], context) :
                null) :
            null;

        context["field"] = "applicantaddress";
        context["metadata"] = (objectMetadata ? objectMetadata["applicantaddress"] : null);
        privateState.applicantaddress = defaultValues ?
            (defaultValues["applicantaddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicantaddress"], context) :
                null) :
            null;

        context["field"] = "issuingbankaddress";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingbankaddress"] : null);
        privateState.issuingbankaddress = defaultValues ?
            (defaultValues["issuingbankaddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingbankaddress"], context) :
                null) :
            null;

        context["field"] = "paymentTerms";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentTerms"] : null);
        privateState.paymentTerms = defaultValues ?
            (defaultValues["paymentTerms"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentTerms"], context) :
                null) :
            null;

        context["field"] = "documentName";
        context["metadata"] = (objectMetadata ? objectMetadata["documentName"] : null);
        privateState.documentName = defaultValues ?
            (defaultValues["documentName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentName"], context) :
                null) :
            null;

        context["field"] = "uploadedFiles";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedFiles"] : null);
        privateState.uploadedFiles = defaultValues ?
            (defaultValues["uploadedFiles"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedFiles"], context) :
                null) :
            null;

        context["field"] = "forwardContract";
        context["metadata"] = (objectMetadata ? objectMetadata["forwardContract"] : null);
        privateState.forwardContract = defaultValues ?
            (defaultValues["forwardContract"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["forwardContract"], context) :
                null) :
            null;

        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
                null) :
            null;

        context["field"] = "beneficiaryAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddress"] : null);
        privateState.beneficiaryAddress = defaultValues ?
            (defaultValues["beneficiaryAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryAddress"], context) :
                null) :
            null;

        context["field"] = "goodsDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["goodsDescription"] : null);
        privateState.goodsDescription = defaultValues ?
            (defaultValues["goodsDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["goodsDescription"], context) :
                null) :
            null;

        context["field"] = "additionalConditions";
        context["metadata"] = (objectMetadata ? objectMetadata["additionalConditions"] : null);
        privateState.additionalConditions = defaultValues ?
            (defaultValues["additionalConditions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["additionalConditions"], context) :
                null) :
            null;

        context["field"] = "confirmInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["confirmInstructions"] : null);
        privateState.confirmInstructions = defaultValues ?
            (defaultValues["confirmInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["confirmInstructions"], context) :
                null) :
            null;

        context["field"] = "latestShipmentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["latestShipmentDate"] : null);
        privateState.latestShipmentDate = defaultValues ?
            (defaultValues["latestShipmentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["latestShipmentDate"], context) :
                null) :
            null;

        context["field"] = "amendmentChargesPayer";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentChargesPayer"] : null);
        privateState.amendmentChargesPayer = defaultValues ?
            (defaultValues["amendmentChargesPayer"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentChargesPayer"], context) :
                null) :
            null;

        context["field"] = "amendmentReceivedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentReceivedDate"] : null);
        privateState.amendmentReceivedDate = defaultValues ?
            (defaultValues["amendmentReceivedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentReceivedDate"], context) :
                null) :
            null;

        context["field"] = "exportlcReferenceNo";
        context["metadata"] = (objectMetadata ? objectMetadata["exportlcReferenceNo"] : null);
        privateState.exportlcReferenceNo = defaultValues ?
            (defaultValues["exportlcReferenceNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exportlcReferenceNo"], context) :
                null) :
            null;

        context["field"] = "exportlcSRMSRequestId";
        context["metadata"] = (objectMetadata ? objectMetadata["exportlcSRMSRequestId"] : null);
        privateState.exportlcSRMSRequestId = defaultValues ?
            (defaultValues["exportlcSRMSRequestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exportlcSRMSRequestId"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "lcCreatedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["lcCreatedOn"] : null);
        privateState.lcCreatedOn = defaultValues ?
            (defaultValues["lcCreatedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcCreatedOn"], context) :
                null) :
            null;

        context["field"] = "financeBill";
        context["metadata"] = (objectMetadata ? objectMetadata["financeBill"] : null);
        privateState.financeBill = defaultValues ?
            (defaultValues["financeBill"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["financeBill"], context) :
                null) :
            null;

        context["field"] = "creditAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["creditAccount"] : null);
        privateState.creditAccount = defaultValues ?
            (defaultValues["creditAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditAccount"], context) :
                null) :
            null;

        context["field"] = "externalAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["externalAccount"] : null);
        privateState.externalAccount = defaultValues ?
            (defaultValues["externalAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["externalAccount"], context) :
                null) :
            null;

        context["field"] = "chargesDebitAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["chargesDebitAccount"] : null);
        privateState.chargesDebitAccount = defaultValues ?
            (defaultValues["chargesDebitAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chargesDebitAccount"], context) :
                null) :
            null;

        context["field"] = "messageToBank";
        context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
        privateState.messageToBank = defaultValues ?
            (defaultValues["messageToBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageToBank"], context) :
                null) :
            null;

        context["field"] = "physicalDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["physicalDocuments"] : null);
        privateState.physicalDocuments = defaultValues ?
            (defaultValues["physicalDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["physicalDocuments"], context) :
                null) :
            null;

        context["field"] = "uploadedDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedDocuments"] : null);
        privateState.uploadedDocuments = defaultValues ?
            (defaultValues["uploadedDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedDocuments"], context) :
                null) :
            null;

        context["field"] = "forwardDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["forwardDocuments"] : null);
        privateState.forwardDocuments = defaultValues ?
            (defaultValues["forwardDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["forwardDocuments"], context) :
                null) :
            null;

        context["field"] = "lcAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["lcAmount"] : null);
        privateState.lcAmount = defaultValues ?
            (defaultValues["lcAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcAmount"], context) :
                null) :
            null;

        context["field"] = "lcCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["lcCurrency"] : null);
        privateState.lcCurrency = defaultValues ?
            (defaultValues["lcCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcCurrency"], context) :
                null) :
            null;

        context["field"] = "lcIssueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lcIssueDate"] : null);
        privateState.lcIssueDate = defaultValues ?
            (defaultValues["lcIssueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcIssueDate"], context) :
                null) :
            null;

        context["field"] = "paymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
        privateState.paymentDate = defaultValues ?
            (defaultValues["paymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDate"], context) :
                null) :
            null;

        context["field"] = "totalDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["totalDocuments"] : null);
        privateState.totalDocuments = defaultValues ?
            (defaultValues["totalDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalDocuments"], context) :
                null) :
            null;

        context["field"] = "documentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
        privateState.documentStatus = defaultValues ?
            (defaultValues["documentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentStatus"], context) :
                null) :
            null;

        context["field"] = "discrepencies";
        context["metadata"] = (objectMetadata ? objectMetadata["discrepencies"] : null);
        privateState.discrepencies = defaultValues ?
            (defaultValues["discrepencies"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["discrepencies"], context) :
                null) :
            null;

        context["field"] = "discrepenciesAcceptance";
        context["metadata"] = (objectMetadata ? objectMetadata["discrepenciesAcceptance"] : null);
        privateState.discrepenciesAcceptance = defaultValues ?
            (defaultValues["discrepenciesAcceptance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["discrepenciesAcceptance"], context) :
                null) :
            null;

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "totalAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
        privateState.totalAmount = defaultValues ?
            (defaultValues["totalAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalAmount"], context) :
                null) :
            null;

        context["field"] = "reasonForReturn";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
        privateState.reasonForReturn = defaultValues ?
            (defaultValues["reasonForReturn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForReturn"], context) :
                null) :
            null;

        context["field"] = "drawingCreatedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingCreatedDate"] : null);
        privateState.drawingCreatedDate = defaultValues ?
            (defaultValues["drawingCreatedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingCreatedDate"], context) :
                null) :
            null;

        context["field"] = "discrepanciesHistory1";
        context["metadata"] = (objectMetadata ? objectMetadata["discrepanciesHistory1"] : null);
        privateState.discrepanciesHistory1 = defaultValues ?
            (defaultValues["discrepanciesHistory1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["discrepanciesHistory1"], context) :
                null) :
            null;

        context["field"] = "discrepanciesHistory2";
        context["metadata"] = (objectMetadata ? objectMetadata["discrepanciesHistory2"] : null);
        privateState.discrepanciesHistory2 = defaultValues ?
            (defaultValues["discrepanciesHistory2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["discrepanciesHistory2"], context) :
                null) :
            null;

        context["field"] = "discrepanciesHistory3";
        context["metadata"] = (objectMetadata ? objectMetadata["discrepanciesHistory3"] : null);
        privateState.discrepanciesHistory3 = defaultValues ?
            (defaultValues["discrepanciesHistory3"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["discrepanciesHistory3"], context) :
                null) :
            null;

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
                null) :
            null;

        context["field"] = "documentReference";
        context["metadata"] = (objectMetadata ? objectMetadata["documentReference"] : null);
        privateState.documentReference = defaultValues ?
            (defaultValues["documentReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentReference"], context) :
                null) :
            null;

        context["field"] = "returnMessageToBank";
        context["metadata"] = (objectMetadata ? objectMetadata["returnMessageToBank"] : null);
        privateState.returnMessageToBank = defaultValues ?
            (defaultValues["returnMessageToBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["returnMessageToBank"], context) :
                null) :
            null;

        context["field"] = "newLcAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["newLcAmount"] : null);
        privateState.newLcAmount = defaultValues ?
            (defaultValues["newLcAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["newLcAmount"], context) :
                null) :
            null;

        context["field"] = "amendmentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentStatus"] : null);
        privateState.amendmentStatus = defaultValues ?
            (defaultValues["amendmentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentStatus"], context) :
                null) :
            null;

        context["field"] = "periodOfPresentation";
        context["metadata"] = (objectMetadata ? objectMetadata["periodOfPresentation"] : null);
        privateState.periodOfPresentation = defaultValues ?
            (defaultValues["periodOfPresentation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["periodOfPresentation"], context) :
                null) :
            null;

        context["field"] = "reasonForSelfRejection";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForSelfRejection"] : null);
        privateState.reasonForSelfRejection = defaultValues ?
            (defaultValues["reasonForSelfRejection"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForSelfRejection"], context) :
                null) :
            null;

        context["field"] = "applicantName";
        context["metadata"] = (objectMetadata ? objectMetadata["applicantName"] : null);
        privateState.applicantName = defaultValues ?
            (defaultValues["applicantName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicantName"], context) :
                null) :
            null;

        context["field"] = "amendmentNo";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
        privateState.amendmentNo = defaultValues ?
            (defaultValues["amendmentNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentNo"], context) :
                null) :
            null;

        context["field"] = "amendmentSRMSRequestId";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentSRMSRequestId"] : null);
        privateState.amendmentSRMSRequestId = defaultValues ?
            (defaultValues["amendmentSRMSRequestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentSRMSRequestId"], context) :
                null) :
            null;

        context["field"] = "selfRejectedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["selfRejectedDate"] : null);
        privateState.selfRejectedDate = defaultValues ?
            (defaultValues["selfRejectedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["selfRejectedDate"], context) :
                null) :
            null;

        context["field"] = "amendmentReferenceNo";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentReferenceNo"] : null);
        privateState.amendmentReferenceNo = defaultValues ?
            (defaultValues["amendmentReferenceNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentReferenceNo"], context) :
                null) :
            null;

        context["field"] = "oldLcAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["oldLcAmount"] : null);
        privateState.oldLcAmount = defaultValues ?
            (defaultValues["oldLcAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["oldLcAmount"], context) :
                null) :
            null;

        context["field"] = "selfAcceptance";
        context["metadata"] = (objectMetadata ? objectMetadata["selfAcceptance"] : null);
        privateState.selfAcceptance = defaultValues ?
            (defaultValues["selfAcceptance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["selfAcceptance"], context) :
                null) :
            null;

        context["field"] = "otherAmendments";
        context["metadata"] = (objectMetadata ? objectMetadata["otherAmendments"] : null);
        privateState.otherAmendments = defaultValues ?
            (defaultValues["otherAmendments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherAmendments"], context) :
                null) :
            null;

        context["field"] = "lcAmountStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["lcAmountStatus"] : null);
        privateState.lcAmountStatus = defaultValues ?
            (defaultValues["lcAmountStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcAmountStatus"], context) :
                null) :
            null;

        context["field"] = "lcExpiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lcExpiryDate"] : null);
        privateState.lcExpiryDate = defaultValues ?
            (defaultValues["lcExpiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcExpiryDate"], context) :
                null) :
            null;

        context["field"] = "selfAcceptanceDate";
        context["metadata"] = (objectMetadata ? objectMetadata["selfAcceptanceDate"] : null);
        privateState.selfAcceptanceDate = defaultValues ?
            (defaultValues["selfAcceptanceDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["selfAcceptanceDate"], context) :
                null) :
            null;

        context["field"] = "lcUpdatedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["lcUpdatedOn"] : null);
        privateState.lcUpdatedOn = defaultValues ?
            (defaultValues["lcUpdatedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcUpdatedOn"], context) :
                null) :
            null;

        context["field"] = "beneficiaryConsent";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryConsent"] : null);
        privateState.beneficiaryConsent = defaultValues ?
            (defaultValues["beneficiaryConsent"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryConsent"], context) :
                null) :
            null;

        context["field"] = "reasonForRejection";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForRejection"] : null);
        privateState.reasonForRejection = defaultValues ?
            (defaultValues["reasonForRejection"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForRejection"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "searchString": {
                get: function() {
                    context["field"] = "searchString";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchString, context);
                },
                set: function(val) {
                    setterFunctions['searchString'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pageSize": {
                get: function() {
                    context["field"] = "pageSize";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageSize, context);
                },
                set: function(val) {
                    setterFunctions['pageSize'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pageOffset": {
                get: function() {
                    context["field"] = "pageOffset";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageOffset, context);
                },
                set: function(val) {
                    setterFunctions['pageOffset'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortByParam": {
                get: function() {
                    context["field"] = "sortByParam";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortByParam"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortByParam, context);
                },
                set: function(val) {
                    setterFunctions['sortByParam'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortOrder": {
                get: function() {
                    context["field"] = "sortOrder";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortOrder, context);
                },
                set: function(val) {
                    setterFunctions['sortOrder'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "timeParam": {
                get: function() {
                    context["field"] = "timeParam";
                    context["metadata"] = (objectMetadata ? objectMetadata["timeParam"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.timeParam, context);
                },
                set: function(val) {
                    setterFunctions['timeParam'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "timeValue": {
                get: function() {
                    context["field"] = "timeValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["timeValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.timeValue, context);
                },
                set: function(val) {
                    setterFunctions['timeValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "filterByValue": {
                get: function() {
                    context["field"] = "filterByValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["filterByValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.filterByValue, context);
                },
                set: function(val) {
                    setterFunctions['filterByValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "filterByParam": {
                get: function() {
                    context["field"] = "filterByParam";
                    context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.filterByParam, context);
                },
                set: function(val) {
                    setterFunctions['filterByParam'].call(this, val, privateState);
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
            "lcReferenceNo": {
                get: function() {
                    context["field"] = "lcReferenceNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcReferenceNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcReferenceNo, context);
                },
                set: function(val) {
                    setterFunctions['lcReferenceNo'].call(this, val, privateState);
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
            "drawingReferenceNo": {
                get: function() {
                    context["field"] = "drawingReferenceNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingReferenceNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingReferenceNo, context);
                },
                set: function(val) {
                    setterFunctions['drawingReferenceNo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawingSRMSRequestId": {
                get: function() {
                    context["field"] = "drawingSRMSRequestId";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingSRMSRequestId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingSRMSRequestId, context);
                },
                set: function(val) {
                    setterFunctions['drawingSRMSRequestId'].call(this, val, privateState);
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
            "issuingBankReference": {
                get: function() {
                    context["field"] = "issuingBankReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuingBankReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuingBankReference, context);
                },
                set: function(val) {
                    setterFunctions['issuingBankReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "advisingBankReference": {
                get: function() {
                    context["field"] = "advisingBankReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["advisingBankReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.advisingBankReference, context);
                },
                set: function(val) {
                    setterFunctions['advisingBankReference'].call(this, val, privateState);
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
            "utilizedLCAmount": {
                get: function() {
                    context["field"] = "utilizedLCAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["utilizedLCAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.utilizedLCAmount, context);
                },
                set: function(val) {
                    setterFunctions['utilizedLCAmount'].call(this, val, privateState);
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
            "applicantaddress": {
                get: function() {
                    context["field"] = "applicantaddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["applicantaddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.applicantaddress, context);
                },
                set: function(val) {
                    setterFunctions['applicantaddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuingbankaddress": {
                get: function() {
                    context["field"] = "issuingbankaddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuingbankaddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuingbankaddress, context);
                },
                set: function(val) {
                    setterFunctions['issuingbankaddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentTerms": {
                get: function() {
                    context["field"] = "paymentTerms";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentTerms"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentTerms, context);
                },
                set: function(val) {
                    setterFunctions['paymentTerms'].call(this, val, privateState);
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
            "uploadedFiles": {
                get: function() {
                    context["field"] = "uploadedFiles";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadedFiles"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadedFiles, context);
                },
                set: function(val) {
                    setterFunctions['uploadedFiles'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "forwardContract": {
                get: function() {
                    context["field"] = "forwardContract";
                    context["metadata"] = (objectMetadata ? objectMetadata["forwardContract"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.forwardContract, context);
                },
                set: function(val) {
                    setterFunctions['forwardContract'].call(this, val, privateState);
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
            "goodsDescription": {
                get: function() {
                    context["field"] = "goodsDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["goodsDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.goodsDescription, context);
                },
                set: function(val) {
                    setterFunctions['goodsDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "additionalConditions": {
                get: function() {
                    context["field"] = "additionalConditions";
                    context["metadata"] = (objectMetadata ? objectMetadata["additionalConditions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.additionalConditions, context);
                },
                set: function(val) {
                    setterFunctions['additionalConditions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "confirmInstructions": {
                get: function() {
                    context["field"] = "confirmInstructions";
                    context["metadata"] = (objectMetadata ? objectMetadata["confirmInstructions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.confirmInstructions, context);
                },
                set: function(val) {
                    setterFunctions['confirmInstructions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "latestShipmentDate": {
                get: function() {
                    context["field"] = "latestShipmentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["latestShipmentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.latestShipmentDate, context);
                },
                set: function(val) {
                    setterFunctions['latestShipmentDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentChargesPayer": {
                get: function() {
                    context["field"] = "amendmentChargesPayer";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentChargesPayer"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentChargesPayer, context);
                },
                set: function(val) {
                    setterFunctions['amendmentChargesPayer'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentReceivedDate": {
                get: function() {
                    context["field"] = "amendmentReceivedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentReceivedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentReceivedDate, context);
                },
                set: function(val) {
                    setterFunctions['amendmentReceivedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "exportlcReferenceNo": {
                get: function() {
                    context["field"] = "exportlcReferenceNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["exportlcReferenceNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.exportlcReferenceNo, context);
                },
                set: function(val) {
                    setterFunctions['exportlcReferenceNo'].call(this, val, privateState);
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
            "lcCreatedOn": {
                get: function() {
                    context["field"] = "lcCreatedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcCreatedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcCreatedOn, context);
                },
                set: function(val) {
                    setterFunctions['lcCreatedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "financeBill": {
                get: function() {
                    context["field"] = "financeBill";
                    context["metadata"] = (objectMetadata ? objectMetadata["financeBill"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.financeBill, context);
                },
                set: function(val) {
                    setterFunctions['financeBill'].call(this, val, privateState);
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
            "externalAccount": {
                get: function() {
                    context["field"] = "externalAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["externalAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.externalAccount, context);
                },
                set: function(val) {
                    setterFunctions['externalAccount'].call(this, val, privateState);
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
            "lcAmount": {
                get: function() {
                    context["field"] = "lcAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcAmount, context);
                },
                set: function(val) {
                    setterFunctions['lcAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcCurrency": {
                get: function() {
                    context["field"] = "lcCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcCurrency, context);
                },
                set: function(val) {
                    setterFunctions['lcCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcIssueDate": {
                get: function() {
                    context["field"] = "lcIssueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcIssueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcIssueDate, context);
                },
                set: function(val) {
                    setterFunctions['lcIssueDate'].call(this, val, privateState);
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
            "discrepencies": {
                get: function() {
                    context["field"] = "discrepencies";
                    context["metadata"] = (objectMetadata ? objectMetadata["discrepencies"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.discrepencies, context);
                },
                set: function(val) {
                    setterFunctions['discrepencies'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "discrepenciesAcceptance": {
                get: function() {
                    context["field"] = "discrepenciesAcceptance";
                    context["metadata"] = (objectMetadata ? objectMetadata["discrepenciesAcceptance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.discrepenciesAcceptance, context);
                },
                set: function(val) {
                    setterFunctions['discrepenciesAcceptance'].call(this, val, privateState);
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
            "drawingCreatedDate": {
                get: function() {
                    context["field"] = "drawingCreatedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingCreatedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingCreatedDate, context);
                },
                set: function(val) {
                    setterFunctions['drawingCreatedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "discrepanciesHistory1": {
                get: function() {
                    context["field"] = "discrepanciesHistory1";
                    context["metadata"] = (objectMetadata ? objectMetadata["discrepanciesHistory1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.discrepanciesHistory1, context);
                },
                set: function(val) {
                    setterFunctions['discrepanciesHistory1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "discrepanciesHistory2": {
                get: function() {
                    context["field"] = "discrepanciesHistory2";
                    context["metadata"] = (objectMetadata ? objectMetadata["discrepanciesHistory2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.discrepanciesHistory2, context);
                },
                set: function(val) {
                    setterFunctions['discrepanciesHistory2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "discrepanciesHistory3": {
                get: function() {
                    context["field"] = "discrepanciesHistory3";
                    context["metadata"] = (objectMetadata ? objectMetadata["discrepanciesHistory3"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.discrepanciesHistory3, context);
                },
                set: function(val) {
                    setterFunctions['discrepanciesHistory3'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileId": {
                get: function() {
                    context["field"] = "fileId";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileId, context);
                },
                set: function(val) {
                    setterFunctions['fileId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentReference": {
                get: function() {
                    context["field"] = "documentReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentReference, context);
                },
                set: function(val) {
                    setterFunctions['documentReference'].call(this, val, privateState);
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
            "newLcAmount": {
                get: function() {
                    context["field"] = "newLcAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["newLcAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.newLcAmount, context);
                },
                set: function(val) {
                    setterFunctions['newLcAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentStatus": {
                get: function() {
                    context["field"] = "amendmentStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentStatus, context);
                },
                set: function(val) {
                    setterFunctions['amendmentStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "periodOfPresentation": {
                get: function() {
                    context["field"] = "periodOfPresentation";
                    context["metadata"] = (objectMetadata ? objectMetadata["periodOfPresentation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.periodOfPresentation, context);
                },
                set: function(val) {
                    setterFunctions['periodOfPresentation'].call(this, val, privateState);
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
            "selfRejectedDate": {
                get: function() {
                    context["field"] = "selfRejectedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["selfRejectedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.selfRejectedDate, context);
                },
                set: function(val) {
                    setterFunctions['selfRejectedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentReferenceNo": {
                get: function() {
                    context["field"] = "amendmentReferenceNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentReferenceNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentReferenceNo, context);
                },
                set: function(val) {
                    setterFunctions['amendmentReferenceNo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "oldLcAmount": {
                get: function() {
                    context["field"] = "oldLcAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["oldLcAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.oldLcAmount, context);
                },
                set: function(val) {
                    setterFunctions['oldLcAmount'].call(this, val, privateState);
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
            "lcAmountStatus": {
                get: function() {
                    context["field"] = "lcAmountStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcAmountStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcAmountStatus, context);
                },
                set: function(val) {
                    setterFunctions['lcAmountStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcExpiryDate": {
                get: function() {
                    context["field"] = "lcExpiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcExpiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcExpiryDate, context);
                },
                set: function(val) {
                    setterFunctions['lcExpiryDate'].call(this, val, privateState);
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
            "lcUpdatedOn": {
                get: function() {
                    context["field"] = "lcUpdatedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcUpdatedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcUpdatedOn, context);
                },
                set: function(val) {
                    setterFunctions['lcUpdatedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryConsent": {
                get: function() {
                    context["field"] = "beneficiaryConsent";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryConsent"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryConsent, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryConsent'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.timeParam = value ? (value["timeParam"] ? value["timeParam"] : null) : null;
            privateState.timeValue = value ? (value["timeValue"] ? value["timeValue"] : null) : null;
            privateState.filterByValue = value ? (value["filterByValue"] ? value["filterByValue"] : null) : null;
            privateState.filterByParam = value ? (value["filterByParam"] ? value["filterByParam"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.lcReferenceNo = value ? (value["lcReferenceNo"] ? value["lcReferenceNo"] : null) : null;
            privateState.exportLCId = value ? (value["exportLCId"] ? value["exportLCId"] : null) : null;
            privateState.drawingReferenceNo = value ? (value["drawingReferenceNo"] ? value["drawingReferenceNo"] : null) : null;
            privateState.drawingSRMSRequestId = value ? (value["drawingSRMSRequestId"] ? value["drawingSRMSRequestId"] : null) : null;
            privateState.drawingAmount = value ? (value["drawingAmount"] ? value["drawingAmount"] : null) : null;
            privateState.lcType = value ? (value["lcType"] ? value["lcType"] : null) : null;
            privateState.issuingBankReference = value ? (value["issuingBankReference"] ? value["issuingBankReference"] : null) : null;
            privateState.advisingBankReference = value ? (value["advisingBankReference"] ? value["advisingBankReference"] : null) : null;
            privateState.applicant = value ? (value["applicant"] ? value["applicant"] : null) : null;
            privateState.utilizedLCAmount = value ? (value["utilizedLCAmount"] ? value["utilizedLCAmount"] : null) : null;
            privateState.issueDate = value ? (value["issueDate"] ? value["issueDate"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.expiryDate = value ? (value["expiryDate"] ? value["expiryDate"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.issuingBank = value ? (value["issuingBank"] ? value["issuingBank"] : null) : null;
            privateState.applicantaddress = value ? (value["applicantaddress"] ? value["applicantaddress"] : null) : null;
            privateState.issuingbankaddress = value ? (value["issuingbankaddress"] ? value["issuingbankaddress"] : null) : null;
            privateState.paymentTerms = value ? (value["paymentTerms"] ? value["paymentTerms"] : null) : null;
            privateState.documentName = value ? (value["documentName"] ? value["documentName"] : null) : null;
            privateState.uploadedFiles = value ? (value["uploadedFiles"] ? value["uploadedFiles"] : null) : null;
            privateState.forwardContract = value ? (value["forwardContract"] ? value["forwardContract"] : null) : null;
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.beneficiaryAddress = value ? (value["beneficiaryAddress"] ? value["beneficiaryAddress"] : null) : null;
            privateState.goodsDescription = value ? (value["goodsDescription"] ? value["goodsDescription"] : null) : null;
            privateState.additionalConditions = value ? (value["additionalConditions"] ? value["additionalConditions"] : null) : null;
            privateState.confirmInstructions = value ? (value["confirmInstructions"] ? value["confirmInstructions"] : null) : null;
            privateState.latestShipmentDate = value ? (value["latestShipmentDate"] ? value["latestShipmentDate"] : null) : null;
            privateState.amendmentChargesPayer = value ? (value["amendmentChargesPayer"] ? value["amendmentChargesPayer"] : null) : null;
            privateState.amendmentReceivedDate = value ? (value["amendmentReceivedDate"] ? value["amendmentReceivedDate"] : null) : null;
            privateState.exportlcReferenceNo = value ? (value["exportlcReferenceNo"] ? value["exportlcReferenceNo"] : null) : null;
            privateState.exportlcSRMSRequestId = value ? (value["exportlcSRMSRequestId"] ? value["exportlcSRMSRequestId"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.lcCreatedOn = value ? (value["lcCreatedOn"] ? value["lcCreatedOn"] : null) : null;
            privateState.financeBill = value ? (value["financeBill"] ? value["financeBill"] : null) : null;
            privateState.creditAccount = value ? (value["creditAccount"] ? value["creditAccount"] : null) : null;
            privateState.externalAccount = value ? (value["externalAccount"] ? value["externalAccount"] : null) : null;
            privateState.chargesDebitAccount = value ? (value["chargesDebitAccount"] ? value["chargesDebitAccount"] : null) : null;
            privateState.messageToBank = value ? (value["messageToBank"] ? value["messageToBank"] : null) : null;
            privateState.physicalDocuments = value ? (value["physicalDocuments"] ? value["physicalDocuments"] : null) : null;
            privateState.uploadedDocuments = value ? (value["uploadedDocuments"] ? value["uploadedDocuments"] : null) : null;
            privateState.forwardDocuments = value ? (value["forwardDocuments"] ? value["forwardDocuments"] : null) : null;
            privateState.lcAmount = value ? (value["lcAmount"] ? value["lcAmount"] : null) : null;
            privateState.lcCurrency = value ? (value["lcCurrency"] ? value["lcCurrency"] : null) : null;
            privateState.lcIssueDate = value ? (value["lcIssueDate"] ? value["lcIssueDate"] : null) : null;
            privateState.paymentDate = value ? (value["paymentDate"] ? value["paymentDate"] : null) : null;
            privateState.totalDocuments = value ? (value["totalDocuments"] ? value["totalDocuments"] : null) : null;
            privateState.documentStatus = value ? (value["documentStatus"] ? value["documentStatus"] : null) : null;
            privateState.discrepencies = value ? (value["discrepencies"] ? value["discrepencies"] : null) : null;
            privateState.discrepenciesAcceptance = value ? (value["discrepenciesAcceptance"] ? value["discrepenciesAcceptance"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.totalAmount = value ? (value["totalAmount"] ? value["totalAmount"] : null) : null;
            privateState.reasonForReturn = value ? (value["reasonForReturn"] ? value["reasonForReturn"] : null) : null;
            privateState.drawingCreatedDate = value ? (value["drawingCreatedDate"] ? value["drawingCreatedDate"] : null) : null;
            privateState.discrepanciesHistory1 = value ? (value["discrepanciesHistory1"] ? value["discrepanciesHistory1"] : null) : null;
            privateState.discrepanciesHistory2 = value ? (value["discrepanciesHistory2"] ? value["discrepanciesHistory2"] : null) : null;
            privateState.discrepanciesHistory3 = value ? (value["discrepanciesHistory3"] ? value["discrepanciesHistory3"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
            privateState.documentReference = value ? (value["documentReference"] ? value["documentReference"] : null) : null;
            privateState.returnMessageToBank = value ? (value["returnMessageToBank"] ? value["returnMessageToBank"] : null) : null;
            privateState.newLcAmount = value ? (value["newLcAmount"] ? value["newLcAmount"] : null) : null;
            privateState.amendmentStatus = value ? (value["amendmentStatus"] ? value["amendmentStatus"] : null) : null;
            privateState.periodOfPresentation = value ? (value["periodOfPresentation"] ? value["periodOfPresentation"] : null) : null;
            privateState.reasonForSelfRejection = value ? (value["reasonForSelfRejection"] ? value["reasonForSelfRejection"] : null) : null;
            privateState.applicantName = value ? (value["applicantName"] ? value["applicantName"] : null) : null;
            privateState.amendmentNo = value ? (value["amendmentNo"] ? value["amendmentNo"] : null) : null;
            privateState.amendmentSRMSRequestId = value ? (value["amendmentSRMSRequestId"] ? value["amendmentSRMSRequestId"] : null) : null;
            privateState.selfRejectedDate = value ? (value["selfRejectedDate"] ? value["selfRejectedDate"] : null) : null;
            privateState.amendmentReferenceNo = value ? (value["amendmentReferenceNo"] ? value["amendmentReferenceNo"] : null) : null;
            privateState.oldLcAmount = value ? (value["oldLcAmount"] ? value["oldLcAmount"] : null) : null;
            privateState.selfAcceptance = value ? (value["selfAcceptance"] ? value["selfAcceptance"] : null) : null;
            privateState.otherAmendments = value ? (value["otherAmendments"] ? value["otherAmendments"] : null) : null;
            privateState.lcAmountStatus = value ? (value["lcAmountStatus"] ? value["lcAmountStatus"] : null) : null;
            privateState.lcExpiryDate = value ? (value["lcExpiryDate"] ? value["lcExpiryDate"] : null) : null;
            privateState.selfAcceptanceDate = value ? (value["selfAcceptanceDate"] ? value["selfAcceptanceDate"] : null) : null;
            privateState.lcUpdatedOn = value ? (value["lcUpdatedOn"] ? value["lcUpdatedOn"] : null) : null;
            privateState.beneficiaryConsent = value ? (value["beneficiaryConsent"] ? value["beneficiaryConsent"] : null) : null;
            privateState.reasonForRejection = value ? (value["reasonForRejection"] ? value["reasonForRejection"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ExportLetterOfCredit);

    //Create new class level validator object
    BaseModel.Validator.call(ExportLetterOfCredit);

    var registerValidatorBackup = ExportLetterOfCredit.registerValidator;

    ExportLetterOfCredit.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ExportLetterOfCredit.isValid(this, propName, val)) {
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
    //For Operation 'getExportLetterOfCreditDrawingById' with service id 'getExportLetterOfCreditDrawingById4170'
     ExportLetterOfCredit.getExportLetterOfCreditDrawingById = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('getExportLetterOfCreditDrawingById', params, onCompletion);
     };

    //For Operation 'deleteExportLetterOfCreditDrawing' with service id 'deleteExportLetterOfCreditDrawing1751'
     ExportLetterOfCredit.deleteExportLetterOfCreditDrawing = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('deleteExportLetterOfCreditDrawing', params, onCompletion);
     };

    //For Operation 'generateExportLetterOfCreditDrawing' with service id 'GenerateExportDrawingPdf5422'
     ExportLetterOfCredit.generateExportLetterOfCreditDrawing = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('generateExportLetterOfCreditDrawing', params, onCompletion);
     };

    //For Operation 'submitBeneficiaryConsent' with service id 'SubmitBeneficiaryConsent9055'
     ExportLetterOfCredit.submitBeneficiaryConsent = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('submitBeneficiaryConsent', params, onCompletion);
     };

    //For Operation 'updateDrawingByBank' with service id 'updateDrawingByBank8239'
     ExportLetterOfCredit.updateDrawingByBank = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('updateDrawingByBank', params, onCompletion);
     };

    //For Operation 'getExportLetterOfCredits' with service id 'GetExportLetterOfCredits2639'
     ExportLetterOfCredit.getExportLetterOfCredits = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('getExportLetterOfCredits', params, onCompletion);
     };

    //For Operation 'getExportLetterOfCreditsById' with service id 'GetExportLetterOfCreditsById1694'
     ExportLetterOfCredit.getExportLetterOfCreditsById = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('getExportLetterOfCreditsById', params, onCompletion);
     };

    //For Operation 'getExportLCAmendmentById' with service id 'GetExportLCAmendmentById3838'
     ExportLetterOfCredit.getExportLCAmendmentById = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('getExportLCAmendmentById', params, onCompletion);
     };

    //For Operation 'createExportLetterOfCreditDrawing' with service id 'CreateExportLCDrawing3781'
     ExportLetterOfCredit.createExportLetterOfCreditDrawing = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('createExportLetterOfCreditDrawing', params, onCompletion);
     };

    //For Operation 'updateExportLetterOfCreditDrawing' with service id 'updateExportLetterOfCreditDrawing4325'
     ExportLetterOfCredit.updateExportLetterOfCreditDrawing = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('updateExportLetterOfCreditDrawing', params, onCompletion);
     };

    //For Operation 'updateExportLCByBank' with service id 'UpdateExportLCByBank5212'
     ExportLetterOfCredit.updateExportLCByBank = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('updateExportLCByBank', params, onCompletion);
     };

    //For Operation 'updateExportAmendmentByBank' with service id 'updateExportAmendmentByBank4198'
     ExportLetterOfCredit.updateExportAmendmentByBank = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('updateExportAmendmentByBank', params, onCompletion);
     };

    //For Operation 'createExportLetterOfCredit' with service id 'createExportLetterOfCredit4688'
     ExportLetterOfCredit.createExportLetterOfCredit = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('createExportLetterOfCredit', params, onCompletion);
     };

    //For Operation 'generateExportLetterOfCreditAmendment' with service id 'GenerateExportLCAmendments1305'
     ExportLetterOfCredit.generateExportLetterOfCreditAmendment = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('generateExportLetterOfCreditAmendment', params, onCompletion);
     };

    //For Operation 'updateExportLCAmendmentByBank' with service id 'UpdateExportLCAmendmentByBank8585'
     ExportLetterOfCredit.updateExportLCAmendmentByBank = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('updateExportLCAmendmentByBank', params, onCompletion);
     };

    //For Operation 'getExportLetterOfCreditDrawings' with service id 'getExportLetterOfCreditDrawings4379'
     ExportLetterOfCredit.getExportLetterOfCreditDrawings = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('getExportLetterOfCreditDrawings', params, onCompletion);
     };

    //For Operation 'updateExportLCAmendment' with service id 'UpdateExportLCAmendment7339'
     ExportLetterOfCredit.updateExportLCAmendment = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('updateExportLCAmendment', params, onCompletion);
     };

    //For Operation 'createExportLetterOfCreditAmendment' with service id 'CreateExportLCAmendment6869'
     ExportLetterOfCredit.createExportLetterOfCreditAmendment = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('createExportLetterOfCreditAmendment', params, onCompletion);
     };

    //For Operation 'getExportLCAmmendments' with service id 'getExportLCAmendments3269'
     ExportLetterOfCredit.getExportLCAmmendments = function(params, onCompletion){
        return ExportLetterOfCredit.customVerb('getExportLCAmmendments', params, onCompletion);
     };

    var relations = [];

    ExportLetterOfCredit.relations = relations;

    ExportLetterOfCredit.prototype.isValid = function() {
        return ExportLetterOfCredit.isValid(this);
    };

    ExportLetterOfCredit.prototype.objModelName = "ExportLetterOfCredit";
    ExportLetterOfCredit.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ExportLetterOfCredit.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "ExportLetterOfCredit", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ExportLetterOfCredit.clone = function(objectToClone) {
        var clonedObj = new ExportLetterOfCredit();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ExportLetterOfCredit;
});