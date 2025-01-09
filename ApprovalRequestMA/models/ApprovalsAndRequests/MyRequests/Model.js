/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "MyRequests", "objectService" : "ApprovalsAndRequests"};

    var setterFunctions = {
        TransactionType: function(val, state) {
            context["field"] = "TransactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["TransactionType"] : null);
            state['TransactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status: function(val, state) {
            context["field"] = "Status";
            context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
            state['Status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Request_id: function(val, state) {
            context["field"] = "Request_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Request_id"] : null);
            state['Request_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CompanyName: function(val, state) {
            context["field"] = "CompanyName";
            context["metadata"] = (objectMetadata ? objectMetadata["CompanyName"] : null);
            state['CompanyName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        DebitOrCreditAccount: function(val, state) {
            context["field"] = "DebitOrCreditAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["DebitOrCreditAccount"] : null);
            state['DebitOrCreditAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Amount: function(val, state) {
            context["field"] = "Amount";
            context["metadata"] = (objectMetadata ? objectMetadata["Amount"] : null);
            state['Amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CreatedOn: function(val, state) {
            context["field"] = "CreatedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["CreatedOn"] : null);
            state['CreatedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CreatedBy: function(val, state) {
            context["field"] = "CreatedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["CreatedBy"] : null);
            state['CreatedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Company_id: function(val, state) {
            context["field"] = "Company_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Company_id"] : null);
            state['Company_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RequestCreatedby: function(val, state) {
            context["field"] = "RequestCreatedby";
            context["metadata"] = (objectMetadata ? objectMetadata["RequestCreatedby"] : null);
            state['RequestCreatedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Payee: function(val, state) {
            context["field"] = "Payee";
            context["metadata"] = (objectMetadata ? objectMetadata["Payee"] : null);
            state['Payee'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Date: function(val, state) {
            context["field"] = "Date";
            context["metadata"] = (objectMetadata ? objectMetadata["Date"] : null);
            state['Date'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Transaction_id: function(val, state) {
            context["field"] = "Transaction_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Transaction_id"] : null);
            state['Transaction_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Frequency: function(val, state) {
            context["field"] = "Frequency";
            context["metadata"] = (objectMetadata ? objectMetadata["Frequency"] : null);
            state['Frequency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Reccurence: function(val, state) {
            context["field"] = "Reccurence";
            context["metadata"] = (objectMetadata ? objectMetadata["Reccurence"] : null);
            state['Reccurence'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        BBGeneralTransactionType_id: function(val, state) {
            context["field"] = "BBGeneralTransactionType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["BBGeneralTransactionType_id"] : null);
            state['BBGeneralTransactionType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        StatusId: function(val, state) {
            context["field"] = "StatusId";
            context["metadata"] = (objectMetadata ? objectMetadata["StatusId"] : null);
            state['StatusId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateRequestTypeId: function(val, state) {
            context["field"] = "TemplateRequestTypeId";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeId"] : null);
            state['TemplateRequestTypeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateTypeId: function(val, state) {
            context["field"] = "TemplateTypeId";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateTypeId"] : null);
            state['TemplateTypeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RequestType: function(val, state) {
            context["field"] = "RequestType";
            context["metadata"] = (objectMetadata ? objectMetadata["RequestType"] : null);
            state['RequestType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateTypeValue: function(val, state) {
            context["field"] = "TemplateTypeValue";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateTypeValue"] : null);
            state['TemplateTypeValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softDelete: function(val, state) {
            context["field"] = "softDelete";
            context["metadata"] = (objectMetadata ? objectMetadata["softDelete"] : null);
            state['softDelete'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TransactionType_id: function(val, state) {
            context["field"] = "TransactionType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TransactionType_id"] : null);
            state['TransactionType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateType: function(val, state) {
            context["field"] = "TemplateType";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateType"] : null);
            state['TemplateType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TransmittedDate: function(val, state) {
            context["field"] = "TransmittedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["TransmittedDate"] : null);
            state['TransmittedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TransactionId: function(val, state) {
            context["field"] = "TransactionId";
            context["metadata"] = (objectMetadata ? objectMetadata["TransactionId"] : null);
            state['TransactionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UpdatedDateAndTime: function(val, state) {
            context["field"] = "UpdatedDateAndTime";
            context["metadata"] = (objectMetadata ? objectMetadata["UpdatedDateAndTime"] : null);
            state['UpdatedDateAndTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MaxAmount: function(val, state) {
            context["field"] = "MaxAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["MaxAmount"] : null);
            state['MaxAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FileName: function(val, state) {
            context["field"] = "FileName";
            context["metadata"] = (objectMetadata ? objectMetadata["FileName"] : null);
            state['FileName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NumberOfDebits: function(val, state) {
            context["field"] = "NumberOfDebits";
            context["metadata"] = (objectMetadata ? objectMetadata["NumberOfDebits"] : null);
            state['NumberOfDebits'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NumberOfPrenotes: function(val, state) {
            context["field"] = "NumberOfPrenotes";
            context["metadata"] = (objectMetadata ? objectMetadata["NumberOfPrenotes"] : null);
            state['NumberOfPrenotes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NumberOfCredits: function(val, state) {
            context["field"] = "NumberOfCredits";
            context["metadata"] = (objectMetadata ? objectMetadata["NumberOfCredits"] : null);
            state['NumberOfCredits'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        formatType: function(val, state) {
            context["field"] = "formatType";
            context["metadata"] = (objectMetadata ? objectMetadata["formatType"] : null);
            state['formatType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ACHFileFormatType_id: function(val, state) {
            context["field"] = "ACHFileFormatType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["ACHFileFormatType_id"] : null);
            state['ACHFileFormatType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ACHFile_id: function(val, state) {
            context["field"] = "ACHFile_id";
            context["metadata"] = (objectMetadata ? objectMetadata["ACHFile_id"] : null);
            state['ACHFile_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TotalCreditAmount: function(val, state) {
            context["field"] = "TotalCreditAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["TotalCreditAmount"] : null);
            state['TotalCreditAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TotalDebitAmount: function(val, state) {
            context["field"] = "TotalDebitAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["TotalDebitAmount"] : null);
            state['TotalDebitAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FileRequestType: function(val, state) {
            context["field"] = "FileRequestType";
            context["metadata"] = (objectMetadata ? objectMetadata["FileRequestType"] : null);
            state['FileRequestType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CreatedById: function(val, state) {
            context["field"] = "CreatedById";
            context["metadata"] = (objectMetadata ? objectMetadata["CreatedById"] : null);
            state['CreatedById'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ActedBy: function(val, state) {
            context["field"] = "ActedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["ActedBy"] : null);
            state['ActedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TransactionTypeValue: function(val, state) {
            context["field"] = "TransactionTypeValue";
            context["metadata"] = (objectMetadata ? objectMetadata["TransactionTypeValue"] : null);
            state['TransactionTypeValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TotalAmount: function(val, state) {
            context["field"] = "TotalAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["TotalAmount"] : null);
            state['TotalAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        queryType: function(val, state) {
            context["field"] = "queryType";
            context["metadata"] = (objectMetadata ? objectMetadata["queryType"] : null);
            state['queryType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        searchString: function(val, state) {
            context["field"] = "searchString";
            context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
            state['searchString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FeatureAction_id: function(val, state) {
            context["field"] = "FeatureAction_id";
            context["metadata"] = (objectMetadata ? objectMetadata["FeatureAction_id"] : null);
            state['FeatureAction_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        receivedApprovals: function(val, state) {
            context["field"] = "receivedApprovals";
            context["metadata"] = (objectMetadata ? objectMetadata["receivedApprovals"] : null);
            state['receivedApprovals'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requiredApprovals: function(val, state) {
            context["field"] = "requiredApprovals";
            context["metadata"] = (objectMetadata ? objectMetadata["requiredApprovals"] : null);
            state['requiredApprovals'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        approvalId: function(val, state) {
            context["field"] = "approvalId";
            context["metadata"] = (objectMetadata ? objectMetadata["approvalId"] : null);
            state['approvalId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Actionts: function(val, state) {
            context["field"] = "Actionts";
            context["metadata"] = (objectMetadata ? objectMetadata["Actionts"] : null);
            state['Actionts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userFullName: function(val, state) {
            context["field"] = "userFullName";
            context["metadata"] = (objectMetadata ? objectMetadata["userFullName"] : null);
            state['userFullName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        filterByParam: function(val, state) {
            context["field"] = "filterByParam";
            context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
            state['filterByParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        filterByValue: function(val, state) {
            context["field"] = "filterByValue";
            context["metadata"] = (objectMetadata ? objectMetadata["filterByValue"] : null);
            state['filterByValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureName: function(val, state) {
            context["field"] = "featureName";
            context["metadata"] = (objectMetadata ? objectMetadata["featureName"] : null);
            state['featureName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeName: function(val, state) {
            context["field"] = "payeeName";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeName"] : null);
            state['payeeName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        approvalAccounts: function(val, state) {
            context["field"] = "approvalAccounts";
            context["metadata"] = (objectMetadata ? objectMetadata["approvalAccounts"] : null);
            state['approvalAccounts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitAccounts: function(val, state) {
            context["field"] = "debitAccounts";
            context["metadata"] = (objectMetadata ? objectMetadata["debitAccounts"] : null);
            state['debitAccounts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amICreator: function(val, state) {
            context["field"] = "amICreator";
            context["metadata"] = (objectMetadata ? objectMetadata["amICreator"] : null);
            state['amICreator'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amIApprover: function(val, state) {
            context["field"] = "amIApprover";
            context["metadata"] = (objectMetadata ? objectMetadata["amIApprover"] : null);
            state['amIApprover'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestId: function(val, state) {
            context["field"] = "requestId";
            context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
            state['requestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureActionId: function(val, state) {
            context["field"] = "featureActionId";
            context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
            state['featureActionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureActionName: function(val, state) {
            context["field"] = "featureActionName";
            context["metadata"] = (objectMetadata ? objectMetadata["featureActionName"] : null);
            state['featureActionName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitGroupId: function(val, state) {
            context["field"] = "limitGroupId";
            context["metadata"] = (objectMetadata ? objectMetadata["limitGroupId"] : null);
            state['limitGroupId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitGroupName: function(val, state) {
            context["field"] = "limitGroupName";
            context["metadata"] = (objectMetadata ? objectMetadata["limitGroupName"] : null);
            state['limitGroupName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contractId: function(val, state) {
            context["field"] = "contractId";
            context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
            state['contractId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyId: function(val, state) {
            context["field"] = "companyId";
            context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
            state['companyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountId: function(val, state) {
            context["field"] = "accountId";
            context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
            state['accountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sentBy: function(val, state) {
            context["field"] = "sentBy";
            context["metadata"] = (objectMetadata ? objectMetadata["sentBy"] : null);
            state['sentBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actedByMeAlready: function(val, state) {
            context["field"] = "actedByMeAlready";
            context["metadata"] = (objectMetadata ? objectMetadata["actedByMeAlready"] : null);
            state['actedByMeAlready'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        processingDate: function(val, state) {
            context["field"] = "processingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["processingDate"] : null);
            state['processingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sentDate: function(val, state) {
            context["field"] = "sentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["sentDate"] : null);
            state['sentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recurrence: function(val, state) {
            context["field"] = "recurrence";
            context["metadata"] = (objectMetadata ? objectMetadata["recurrence"] : null);
            state['recurrence'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reference: function(val, state) {
            context["field"] = "reference";
            context["metadata"] = (objectMetadata ? objectMetadata["reference"] : null);
            state['reference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerName: function(val, state) {
            context["field"] = "customerName";
            context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
            state['customerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceCharge: function(val, state) {
            context["field"] = "serviceCharge";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceCharge"] : null);
            state['serviceCharge'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionAmount: function(val, state) {
            context["field"] = "transactionAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
            state['transactionAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        convertedAmount: function(val, state) {
            context["field"] = "convertedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["convertedAmount"] : null);
            state['convertedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileType: function(val, state) {
            context["field"] = "fileType";
            context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
            state['fileType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        numberOfRecords: function(val, state) {
            context["field"] = "numberOfRecords";
            context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecords"] : null);
            state['numberOfRecords'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        approvalDate: function(val, state) {
            context["field"] = "approvalDate";
            context["metadata"] = (objectMetadata ? objectMetadata["approvalDate"] : null);
            state['approvalDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        confirmationNumber: function(val, state) {
            context["field"] = "confirmationNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
            state['confirmationNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        templateName: function(val, state) {
            context["field"] = "templateName";
            context["metadata"] = (objectMetadata ? objectMetadata["templateName"] : null);
            state['templateName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentId: function(val, state) {
            context["field"] = "paymentId";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentId"] : null);
            state['paymentId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalTransactions: function(val, state) {
            context["field"] = "totalTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["totalTransactions"] : null);
            state['totalTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        processingMode: function(val, state) {
            context["field"] = "processingMode";
            context["metadata"] = (objectMetadata ? objectMetadata["processingMode"] : null);
            state['processingMode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        removeByParam: function(val, state) {
            context["field"] = "removeByParam";
            context["metadata"] = (objectMetadata ? objectMetadata["removeByParam"] : null);
            state['removeByParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        removeByValue: function(val, state) {
            context["field"] = "removeByValue";
            context["metadata"] = (objectMetadata ? objectMetadata["removeByValue"] : null);
            state['removeByValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        paidBy: function(val, state) {
            context["field"] = "paidBy";
            context["metadata"] = (objectMetadata ? objectMetadata["paidBy"] : null);
            state['paidBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftCode: function(val, state) {
            context["field"] = "swiftCode";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
            state['swiftCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        groupName: function(val, state) {
            context["field"] = "groupName";
            context["metadata"] = (objectMetadata ? objectMetadata["groupName"] : null);
            state['groupName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCurrency: function(val, state) {
            context["field"] = "transactionCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
            state['transactionCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        charges: function(val, state) {
            context["field"] = "charges";
            context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
            state['charges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        indicativeRate: function(val, state) {
            context["field"] = "indicativeRate";
            context["metadata"] = (objectMetadata ? objectMetadata["indicativeRate"] : null);
            state['indicativeRate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromAccountCurrency: function(val, state) {
            context["field"] = "fromAccountCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountCurrency"] : null);
            state['fromAccountCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditValueDate: function(val, state) {
            context["field"] = "creditValueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["creditValueDate"] : null);
            state['creditValueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toAccountName: function(val, state) {
            context["field"] = "toAccountName";
            context["metadata"] = (objectMetadata ? objectMetadata["toAccountName"] : null);
            state['toAccountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentType: function(val, state) {
            context["field"] = "paymentType";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentType"] : null);
            state['paymentType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        frequencyEndDate: function(val, state) {
            context["field"] = "frequencyEndDate";
            context["metadata"] = (objectMetadata ? objectMetadata["frequencyEndDate"] : null);
            state['frequencyEndDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryBankAddress: function(val, state) {
            context["field"] = "beneficiaryBankAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankAddress"] : null);
            state['beneficiaryBankAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        approverUserId: function(val, state) {
            context["field"] = "approverUserId";
            context["metadata"] = (objectMetadata ? objectMetadata["approverUserId"] : null);
            state['approverUserId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileNames: function(val, state) {
            context["field"] = "fileNames";
            context["metadata"] = (objectMetadata ? objectMetadata["fileNames"] : null);
            state['fileNames'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileNameValue: function(val, state) {
            context["field"] = "fileNameValue";
            context["metadata"] = (objectMetadata ? objectMetadata["fileNameValue"] : null);
            state['fileNameValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function MyRequests(defaultValues) {
        var privateState = {};
        context["field"] = "TransactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["TransactionType"] : null);
        privateState.TransactionType = defaultValues ?
            (defaultValues["TransactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransactionType"], context) :
                null) :
            null;

        context["field"] = "Status";
        context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
        privateState.Status = defaultValues ?
            (defaultValues["Status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status"], context) :
                null) :
            null;

        context["field"] = "Request_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Request_id"] : null);
        privateState.Request_id = defaultValues ?
            (defaultValues["Request_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Request_id"], context) :
                null) :
            null;

        context["field"] = "CompanyName";
        context["metadata"] = (objectMetadata ? objectMetadata["CompanyName"] : null);
        privateState.CompanyName = defaultValues ?
            (defaultValues["CompanyName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CompanyName"], context) :
                null) :
            null;

        context["field"] = "DebitOrCreditAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["DebitOrCreditAccount"] : null);
        privateState.DebitOrCreditAccount = defaultValues ?
            (defaultValues["DebitOrCreditAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["DebitOrCreditAccount"], context) :
                null) :
            null;

        context["field"] = "Amount";
        context["metadata"] = (objectMetadata ? objectMetadata["Amount"] : null);
        privateState.Amount = defaultValues ?
            (defaultValues["Amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Amount"], context) :
                null) :
            null;

        context["field"] = "CreatedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["CreatedOn"] : null);
        privateState.CreatedOn = defaultValues ?
            (defaultValues["CreatedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CreatedOn"], context) :
                null) :
            null;

        context["field"] = "CreatedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["CreatedBy"] : null);
        privateState.CreatedBy = defaultValues ?
            (defaultValues["CreatedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CreatedBy"], context) :
                null) :
            null;

        context["field"] = "Company_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Company_id"] : null);
        privateState.Company_id = defaultValues ?
            (defaultValues["Company_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Company_id"], context) :
                null) :
            null;

        context["field"] = "RequestCreatedby";
        context["metadata"] = (objectMetadata ? objectMetadata["RequestCreatedby"] : null);
        privateState.RequestCreatedby = defaultValues ?
            (defaultValues["RequestCreatedby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RequestCreatedby"], context) :
                null) :
            null;

        context["field"] = "Payee";
        context["metadata"] = (objectMetadata ? objectMetadata["Payee"] : null);
        privateState.Payee = defaultValues ?
            (defaultValues["Payee"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Payee"], context) :
                null) :
            null;

        context["field"] = "Date";
        context["metadata"] = (objectMetadata ? objectMetadata["Date"] : null);
        privateState.Date = defaultValues ?
            (defaultValues["Date"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Date"], context) :
                null) :
            null;

        context["field"] = "Transaction_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Transaction_id"] : null);
        privateState.Transaction_id = defaultValues ?
            (defaultValues["Transaction_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Transaction_id"], context) :
                null) :
            null;

        context["field"] = "Frequency";
        context["metadata"] = (objectMetadata ? objectMetadata["Frequency"] : null);
        privateState.Frequency = defaultValues ?
            (defaultValues["Frequency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Frequency"], context) :
                null) :
            null;

        context["field"] = "Reccurence";
        context["metadata"] = (objectMetadata ? objectMetadata["Reccurence"] : null);
        privateState.Reccurence = defaultValues ?
            (defaultValues["Reccurence"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Reccurence"], context) :
                null) :
            null;

        context["field"] = "BBGeneralTransactionType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["BBGeneralTransactionType_id"] : null);
        privateState.BBGeneralTransactionType_id = defaultValues ?
            (defaultValues["BBGeneralTransactionType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["BBGeneralTransactionType_id"], context) :
                null) :
            null;

        context["field"] = "StatusId";
        context["metadata"] = (objectMetadata ? objectMetadata["StatusId"] : null);
        privateState.StatusId = defaultValues ?
            (defaultValues["StatusId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["StatusId"], context) :
                null) :
            null;

        context["field"] = "TemplateRequestTypeId";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeId"] : null);
        privateState.TemplateRequestTypeId = defaultValues ?
            (defaultValues["TemplateRequestTypeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateRequestTypeId"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "TemplateTypeId";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateTypeId"] : null);
        privateState.TemplateTypeId = defaultValues ?
            (defaultValues["TemplateTypeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateTypeId"], context) :
                null) :
            null;

        context["field"] = "RequestType";
        context["metadata"] = (objectMetadata ? objectMetadata["RequestType"] : null);
        privateState.RequestType = defaultValues ?
            (defaultValues["RequestType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RequestType"], context) :
                null) :
            null;

        context["field"] = "TemplateTypeValue";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateTypeValue"] : null);
        privateState.TemplateTypeValue = defaultValues ?
            (defaultValues["TemplateTypeValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateTypeValue"], context) :
                null) :
            null;

        context["field"] = "softDelete";
        context["metadata"] = (objectMetadata ? objectMetadata["softDelete"] : null);
        privateState.softDelete = defaultValues ?
            (defaultValues["softDelete"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softDelete"], context) :
                null) :
            null;

        context["field"] = "TransactionType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TransactionType_id"] : null);
        privateState.TransactionType_id = defaultValues ?
            (defaultValues["TransactionType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransactionType_id"], context) :
                null) :
            null;

        context["field"] = "TemplateType";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateType"] : null);
        privateState.TemplateType = defaultValues ?
            (defaultValues["TemplateType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateType"], context) :
                null) :
            null;

        context["field"] = "TransmittedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["TransmittedDate"] : null);
        privateState.TransmittedDate = defaultValues ?
            (defaultValues["TransmittedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransmittedDate"], context) :
                null) :
            null;

        context["field"] = "TransactionId";
        context["metadata"] = (objectMetadata ? objectMetadata["TransactionId"] : null);
        privateState.TransactionId = defaultValues ?
            (defaultValues["TransactionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransactionId"], context) :
                null) :
            null;

        context["field"] = "UpdatedDateAndTime";
        context["metadata"] = (objectMetadata ? objectMetadata["UpdatedDateAndTime"] : null);
        privateState.UpdatedDateAndTime = defaultValues ?
            (defaultValues["UpdatedDateAndTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UpdatedDateAndTime"], context) :
                null) :
            null;

        context["field"] = "MaxAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["MaxAmount"] : null);
        privateState.MaxAmount = defaultValues ?
            (defaultValues["MaxAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MaxAmount"], context) :
                null) :
            null;

        context["field"] = "FileName";
        context["metadata"] = (objectMetadata ? objectMetadata["FileName"] : null);
        privateState.FileName = defaultValues ?
            (defaultValues["FileName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FileName"], context) :
                null) :
            null;

        context["field"] = "NumberOfDebits";
        context["metadata"] = (objectMetadata ? objectMetadata["NumberOfDebits"] : null);
        privateState.NumberOfDebits = defaultValues ?
            (defaultValues["NumberOfDebits"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NumberOfDebits"], context) :
                null) :
            null;

        context["field"] = "NumberOfPrenotes";
        context["metadata"] = (objectMetadata ? objectMetadata["NumberOfPrenotes"] : null);
        privateState.NumberOfPrenotes = defaultValues ?
            (defaultValues["NumberOfPrenotes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NumberOfPrenotes"], context) :
                null) :
            null;

        context["field"] = "NumberOfCredits";
        context["metadata"] = (objectMetadata ? objectMetadata["NumberOfCredits"] : null);
        privateState.NumberOfCredits = defaultValues ?
            (defaultValues["NumberOfCredits"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NumberOfCredits"], context) :
                null) :
            null;

        context["field"] = "formatType";
        context["metadata"] = (objectMetadata ? objectMetadata["formatType"] : null);
        privateState.formatType = defaultValues ?
            (defaultValues["formatType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["formatType"], context) :
                null) :
            null;

        context["field"] = "ACHFileFormatType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["ACHFileFormatType_id"] : null);
        privateState.ACHFileFormatType_id = defaultValues ?
            (defaultValues["ACHFileFormatType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ACHFileFormatType_id"], context) :
                null) :
            null;

        context["field"] = "ACHFile_id";
        context["metadata"] = (objectMetadata ? objectMetadata["ACHFile_id"] : null);
        privateState.ACHFile_id = defaultValues ?
            (defaultValues["ACHFile_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ACHFile_id"], context) :
                null) :
            null;

        context["field"] = "TotalCreditAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["TotalCreditAmount"] : null);
        privateState.TotalCreditAmount = defaultValues ?
            (defaultValues["TotalCreditAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TotalCreditAmount"], context) :
                null) :
            null;

        context["field"] = "TotalDebitAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["TotalDebitAmount"] : null);
        privateState.TotalDebitAmount = defaultValues ?
            (defaultValues["TotalDebitAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TotalDebitAmount"], context) :
                null) :
            null;

        context["field"] = "FileRequestType";
        context["metadata"] = (objectMetadata ? objectMetadata["FileRequestType"] : null);
        privateState.FileRequestType = defaultValues ?
            (defaultValues["FileRequestType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FileRequestType"], context) :
                null) :
            null;

        context["field"] = "CreatedById";
        context["metadata"] = (objectMetadata ? objectMetadata["CreatedById"] : null);
        privateState.CreatedById = defaultValues ?
            (defaultValues["CreatedById"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CreatedById"], context) :
                null) :
            null;

        context["field"] = "ActedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["ActedBy"] : null);
        privateState.ActedBy = defaultValues ?
            (defaultValues["ActedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ActedBy"], context) :
                null) :
            null;

        context["field"] = "TransactionTypeValue";
        context["metadata"] = (objectMetadata ? objectMetadata["TransactionTypeValue"] : null);
        privateState.TransactionTypeValue = defaultValues ?
            (defaultValues["TransactionTypeValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransactionTypeValue"], context) :
                null) :
            null;

        context["field"] = "TotalAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["TotalAmount"] : null);
        privateState.TotalAmount = defaultValues ?
            (defaultValues["TotalAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TotalAmount"], context) :
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

        context["field"] = "queryType";
        context["metadata"] = (objectMetadata ? objectMetadata["queryType"] : null);
        privateState.queryType = defaultValues ?
            (defaultValues["queryType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["queryType"], context) :
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

        context["field"] = "searchString";
        context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
        privateState.searchString = defaultValues ?
            (defaultValues["searchString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchString"], context) :
                null) :
            null;

        context["field"] = "FeatureAction_id";
        context["metadata"] = (objectMetadata ? objectMetadata["FeatureAction_id"] : null);
        privateState.FeatureAction_id = defaultValues ?
            (defaultValues["FeatureAction_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FeatureAction_id"], context) :
                null) :
            null;

        context["field"] = "receivedApprovals";
        context["metadata"] = (objectMetadata ? objectMetadata["receivedApprovals"] : null);
        privateState.receivedApprovals = defaultValues ?
            (defaultValues["receivedApprovals"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["receivedApprovals"], context) :
                null) :
            null;

        context["field"] = "requiredApprovals";
        context["metadata"] = (objectMetadata ? objectMetadata["requiredApprovals"] : null);
        privateState.requiredApprovals = defaultValues ?
            (defaultValues["requiredApprovals"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requiredApprovals"], context) :
                null) :
            null;

        context["field"] = "approvalId";
        context["metadata"] = (objectMetadata ? objectMetadata["approvalId"] : null);
        privateState.approvalId = defaultValues ?
            (defaultValues["approvalId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["approvalId"], context) :
                null) :
            null;

        context["field"] = "Actionts";
        context["metadata"] = (objectMetadata ? objectMetadata["Actionts"] : null);
        privateState.Actionts = defaultValues ?
            (defaultValues["Actionts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Actionts"], context) :
                null) :
            null;

        context["field"] = "userFullName";
        context["metadata"] = (objectMetadata ? objectMetadata["userFullName"] : null);
        privateState.userFullName = defaultValues ?
            (defaultValues["userFullName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userFullName"], context) :
                null) :
            null;

        context["field"] = "filterByParam";
        context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
        privateState.filterByParam = defaultValues ?
            (defaultValues["filterByParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["filterByParam"], context) :
                null) :
            null;

        context["field"] = "filterByValue";
        context["metadata"] = (objectMetadata ? objectMetadata["filterByValue"] : null);
        privateState.filterByValue = defaultValues ?
            (defaultValues["filterByValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["filterByValue"], context) :
                null) :
            null;

        context["field"] = "featureName";
        context["metadata"] = (objectMetadata ? objectMetadata["featureName"] : null);
        privateState.featureName = defaultValues ?
            (defaultValues["featureName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureName"], context) :
                null) :
            null;

        context["field"] = "payeeName";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeName"] : null);
        privateState.payeeName = defaultValues ?
            (defaultValues["payeeName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeName"], context) :
                null) :
            null;

        context["field"] = "approvalAccounts";
        context["metadata"] = (objectMetadata ? objectMetadata["approvalAccounts"] : null);
        privateState.approvalAccounts = defaultValues ?
            (defaultValues["approvalAccounts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["approvalAccounts"], context) :
                null) :
            null;

        context["field"] = "debitAccounts";
        context["metadata"] = (objectMetadata ? objectMetadata["debitAccounts"] : null);
        privateState.debitAccounts = defaultValues ?
            (defaultValues["debitAccounts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitAccounts"], context) :
                null) :
            null;

        context["field"] = "amICreator";
        context["metadata"] = (objectMetadata ? objectMetadata["amICreator"] : null);
        privateState.amICreator = defaultValues ?
            (defaultValues["amICreator"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amICreator"], context) :
                null) :
            null;

        context["field"] = "amIApprover";
        context["metadata"] = (objectMetadata ? objectMetadata["amIApprover"] : null);
        privateState.amIApprover = defaultValues ?
            (defaultValues["amIApprover"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amIApprover"], context) :
                null) :
            null;

        context["field"] = "requestId";
        context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
        privateState.requestId = defaultValues ?
            (defaultValues["requestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestId"], context) :
                null) :
            null;

        context["field"] = "featureActionId";
        context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
        privateState.featureActionId = defaultValues ?
            (defaultValues["featureActionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureActionId"], context) :
                null) :
            null;

        context["field"] = "featureActionName";
        context["metadata"] = (objectMetadata ? objectMetadata["featureActionName"] : null);
        privateState.featureActionName = defaultValues ?
            (defaultValues["featureActionName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureActionName"], context) :
                null) :
            null;

        context["field"] = "limitGroupId";
        context["metadata"] = (objectMetadata ? objectMetadata["limitGroupId"] : null);
        privateState.limitGroupId = defaultValues ?
            (defaultValues["limitGroupId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitGroupId"], context) :
                null) :
            null;

        context["field"] = "limitGroupName";
        context["metadata"] = (objectMetadata ? objectMetadata["limitGroupName"] : null);
        privateState.limitGroupName = defaultValues ?
            (defaultValues["limitGroupName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitGroupName"], context) :
                null) :
            null;

        context["field"] = "contractId";
        context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
        privateState.contractId = defaultValues ?
            (defaultValues["contractId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contractId"], context) :
                null) :
            null;

        context["field"] = "companyId";
        context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
        privateState.companyId = defaultValues ?
            (defaultValues["companyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyId"], context) :
                null) :
            null;

        context["field"] = "accountId";
        context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
        privateState.accountId = defaultValues ?
            (defaultValues["accountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountId"], context) :
                null) :
            null;

        context["field"] = "sentBy";
        context["metadata"] = (objectMetadata ? objectMetadata["sentBy"] : null);
        privateState.sentBy = defaultValues ?
            (defaultValues["sentBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sentBy"], context) :
                null) :
            null;

        context["field"] = "actedByMeAlready";
        context["metadata"] = (objectMetadata ? objectMetadata["actedByMeAlready"] : null);
        privateState.actedByMeAlready = defaultValues ?
            (defaultValues["actedByMeAlready"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actedByMeAlready"], context) :
                null) :
            null;

        context["field"] = "processingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["processingDate"] : null);
        privateState.processingDate = defaultValues ?
            (defaultValues["processingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["processingDate"], context) :
                null) :
            null;

        context["field"] = "sentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["sentDate"] : null);
        privateState.sentDate = defaultValues ?
            (defaultValues["sentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sentDate"], context) :
                null) :
            null;

        context["field"] = "recurrence";
        context["metadata"] = (objectMetadata ? objectMetadata["recurrence"] : null);
        privateState.recurrence = defaultValues ?
            (defaultValues["recurrence"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recurrence"], context) :
                null) :
            null;

        context["field"] = "reference";
        context["metadata"] = (objectMetadata ? objectMetadata["reference"] : null);
        privateState.reference = defaultValues ?
            (defaultValues["reference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reference"], context) :
                null) :
            null;

        context["field"] = "customerName";
        context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
        privateState.customerName = defaultValues ?
            (defaultValues["customerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerName"], context) :
                null) :
            null;

        context["field"] = "serviceCharge";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceCharge"] : null);
        privateState.serviceCharge = defaultValues ?
            (defaultValues["serviceCharge"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceCharge"], context) :
                null) :
            null;

        context["field"] = "transactionAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
        privateState.transactionAmount = defaultValues ?
            (defaultValues["transactionAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionAmount"], context) :
                null) :
            null;

        context["field"] = "convertedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["convertedAmount"] : null);
        privateState.convertedAmount = defaultValues ?
            (defaultValues["convertedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["convertedAmount"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "fileType";
        context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
        privateState.fileType = defaultValues ?
            (defaultValues["fileType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileType"], context) :
                null) :
            null;

        context["field"] = "numberOfRecords";
        context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecords"] : null);
        privateState.numberOfRecords = defaultValues ?
            (defaultValues["numberOfRecords"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["numberOfRecords"], context) :
                null) :
            null;

        context["field"] = "approvalDate";
        context["metadata"] = (objectMetadata ? objectMetadata["approvalDate"] : null);
        privateState.approvalDate = defaultValues ?
            (defaultValues["approvalDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["approvalDate"], context) :
                null) :
            null;

        context["field"] = "confirmationNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
        privateState.confirmationNumber = defaultValues ?
            (defaultValues["confirmationNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["confirmationNumber"], context) :
                null) :
            null;

        context["field"] = "templateName";
        context["metadata"] = (objectMetadata ? objectMetadata["templateName"] : null);
        privateState.templateName = defaultValues ?
            (defaultValues["templateName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["templateName"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "paymentId";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentId"] : null);
        privateState.paymentId = defaultValues ?
            (defaultValues["paymentId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentId"], context) :
                null) :
            null;

        context["field"] = "totalTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["totalTransactions"] : null);
        privateState.totalTransactions = defaultValues ?
            (defaultValues["totalTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalTransactions"], context) :
                null) :
            null;

        context["field"] = "processingMode";
        context["metadata"] = (objectMetadata ? objectMetadata["processingMode"] : null);
        privateState.processingMode = defaultValues ?
            (defaultValues["processingMode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["processingMode"], context) :
                null) :
            null;

        context["field"] = "removeByParam";
        context["metadata"] = (objectMetadata ? objectMetadata["removeByParam"] : null);
        privateState.removeByParam = defaultValues ?
            (defaultValues["removeByParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["removeByParam"], context) :
                null) :
            null;

        context["field"] = "removeByValue";
        context["metadata"] = (objectMetadata ? objectMetadata["removeByValue"] : null);
        privateState.removeByValue = defaultValues ?
            (defaultValues["removeByValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["removeByValue"], context) :
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

        context["field"] = "paidBy";
        context["metadata"] = (objectMetadata ? objectMetadata["paidBy"] : null);
        privateState.paidBy = defaultValues ?
            (defaultValues["paidBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paidBy"], context) :
                null) :
            null;

        context["field"] = "swiftCode";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
        privateState.swiftCode = defaultValues ?
            (defaultValues["swiftCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftCode"], context) :
                null) :
            null;

        context["field"] = "groupName";
        context["metadata"] = (objectMetadata ? objectMetadata["groupName"] : null);
        privateState.groupName = defaultValues ?
            (defaultValues["groupName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["groupName"], context) :
                null) :
            null;

        context["field"] = "transactionCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
        privateState.transactionCurrency = defaultValues ?
            (defaultValues["transactionCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCurrency"], context) :
                null) :
            null;

        context["field"] = "charges";
        context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
        privateState.charges = defaultValues ?
            (defaultValues["charges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["charges"], context) :
                null) :
            null;

        context["field"] = "indicativeRate";
        context["metadata"] = (objectMetadata ? objectMetadata["indicativeRate"] : null);
        privateState.indicativeRate = defaultValues ?
            (defaultValues["indicativeRate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["indicativeRate"], context) :
                null) :
            null;

        context["field"] = "fromAccountCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountCurrency"] : null);
        privateState.fromAccountCurrency = defaultValues ?
            (defaultValues["fromAccountCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountCurrency"], context) :
                null) :
            null;

        context["field"] = "creditValueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["creditValueDate"] : null);
        privateState.creditValueDate = defaultValues ?
            (defaultValues["creditValueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditValueDate"], context) :
                null) :
            null;

        context["field"] = "toAccountName";
        context["metadata"] = (objectMetadata ? objectMetadata["toAccountName"] : null);
        privateState.toAccountName = defaultValues ?
            (defaultValues["toAccountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toAccountName"], context) :
                null) :
            null;

        context["field"] = "paymentType";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentType"] : null);
        privateState.paymentType = defaultValues ?
            (defaultValues["paymentType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentType"], context) :
                null) :
            null;

        context["field"] = "frequencyEndDate";
        context["metadata"] = (objectMetadata ? objectMetadata["frequencyEndDate"] : null);
        privateState.frequencyEndDate = defaultValues ?
            (defaultValues["frequencyEndDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["frequencyEndDate"], context) :
                null) :
            null;

        context["field"] = "beneficiaryBankAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankAddress"] : null);
        privateState.beneficiaryBankAddress = defaultValues ?
            (defaultValues["beneficiaryBankAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryBankAddress"], context) :
                null) :
            null;

        context["field"] = "approverUserId";
        context["metadata"] = (objectMetadata ? objectMetadata["approverUserId"] : null);
        privateState.approverUserId = defaultValues ?
            (defaultValues["approverUserId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["approverUserId"], context) :
                null) :
            null;

        context["field"] = "fileNames";
        context["metadata"] = (objectMetadata ? objectMetadata["fileNames"] : null);
        privateState.fileNames = defaultValues ?
            (defaultValues["fileNames"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileNames"], context) :
                null) :
            null;

        context["field"] = "fileNameValue";
        context["metadata"] = (objectMetadata ? objectMetadata["fileNameValue"] : null);
        privateState.fileNameValue = defaultValues ?
            (defaultValues["fileNameValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileNameValue"], context) :
                null) :
            null;

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "TransactionType": {
                get: function() {
                    context["field"] = "TransactionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["TransactionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TransactionType, context);
                },
                set: function(val) {
                    setterFunctions['TransactionType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Status": {
                get: function() {
                    context["field"] = "Status";
                    context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Status, context);
                },
                set: function(val) {
                    setterFunctions['Status'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Request_id": {
                get: function() {
                    context["field"] = "Request_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Request_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Request_id, context);
                },
                set: function(val) {
                    setterFunctions['Request_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CompanyName": {
                get: function() {
                    context["field"] = "CompanyName";
                    context["metadata"] = (objectMetadata ? objectMetadata["CompanyName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CompanyName, context);
                },
                set: function(val) {
                    setterFunctions['CompanyName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "DebitOrCreditAccount": {
                get: function() {
                    context["field"] = "DebitOrCreditAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["DebitOrCreditAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.DebitOrCreditAccount, context);
                },
                set: function(val) {
                    setterFunctions['DebitOrCreditAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Amount": {
                get: function() {
                    context["field"] = "Amount";
                    context["metadata"] = (objectMetadata ? objectMetadata["Amount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Amount, context);
                },
                set: function(val) {
                    setterFunctions['Amount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CreatedOn": {
                get: function() {
                    context["field"] = "CreatedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["CreatedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CreatedOn, context);
                },
                set: function(val) {
                    setterFunctions['CreatedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CreatedBy": {
                get: function() {
                    context["field"] = "CreatedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["CreatedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CreatedBy, context);
                },
                set: function(val) {
                    setterFunctions['CreatedBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Company_id": {
                get: function() {
                    context["field"] = "Company_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Company_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Company_id, context);
                },
                set: function(val) {
                    setterFunctions['Company_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RequestCreatedby": {
                get: function() {
                    context["field"] = "RequestCreatedby";
                    context["metadata"] = (objectMetadata ? objectMetadata["RequestCreatedby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RequestCreatedby, context);
                },
                set: function(val) {
                    setterFunctions['RequestCreatedby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Payee": {
                get: function() {
                    context["field"] = "Payee";
                    context["metadata"] = (objectMetadata ? objectMetadata["Payee"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Payee, context);
                },
                set: function(val) {
                    setterFunctions['Payee'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Date": {
                get: function() {
                    context["field"] = "Date";
                    context["metadata"] = (objectMetadata ? objectMetadata["Date"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Date, context);
                },
                set: function(val) {
                    setterFunctions['Date'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Transaction_id": {
                get: function() {
                    context["field"] = "Transaction_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Transaction_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Transaction_id, context);
                },
                set: function(val) {
                    setterFunctions['Transaction_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Frequency": {
                get: function() {
                    context["field"] = "Frequency";
                    context["metadata"] = (objectMetadata ? objectMetadata["Frequency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Frequency, context);
                },
                set: function(val) {
                    setterFunctions['Frequency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Reccurence": {
                get: function() {
                    context["field"] = "Reccurence";
                    context["metadata"] = (objectMetadata ? objectMetadata["Reccurence"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Reccurence, context);
                },
                set: function(val) {
                    setterFunctions['Reccurence'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "BBGeneralTransactionType_id": {
                get: function() {
                    context["field"] = "BBGeneralTransactionType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["BBGeneralTransactionType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.BBGeneralTransactionType_id, context);
                },
                set: function(val) {
                    setterFunctions['BBGeneralTransactionType_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "StatusId": {
                get: function() {
                    context["field"] = "StatusId";
                    context["metadata"] = (objectMetadata ? objectMetadata["StatusId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.StatusId, context);
                },
                set: function(val) {
                    setterFunctions['StatusId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TemplateRequestTypeId": {
                get: function() {
                    context["field"] = "TemplateRequestTypeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateRequestTypeId, context);
                },
                set: function(val) {
                    setterFunctions['TemplateRequestTypeId'].call(this, val, privateState);
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
            "TemplateTypeId": {
                get: function() {
                    context["field"] = "TemplateTypeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateTypeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateTypeId, context);
                },
                set: function(val) {
                    setterFunctions['TemplateTypeId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RequestType": {
                get: function() {
                    context["field"] = "RequestType";
                    context["metadata"] = (objectMetadata ? objectMetadata["RequestType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RequestType, context);
                },
                set: function(val) {
                    setterFunctions['RequestType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TemplateTypeValue": {
                get: function() {
                    context["field"] = "TemplateTypeValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateTypeValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateTypeValue, context);
                },
                set: function(val) {
                    setterFunctions['TemplateTypeValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "softDelete": {
                get: function() {
                    context["field"] = "softDelete";
                    context["metadata"] = (objectMetadata ? objectMetadata["softDelete"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.softDelete, context);
                },
                set: function(val) {
                    setterFunctions['softDelete'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TransactionType_id": {
                get: function() {
                    context["field"] = "TransactionType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TransactionType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TransactionType_id, context);
                },
                set: function(val) {
                    setterFunctions['TransactionType_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TemplateType": {
                get: function() {
                    context["field"] = "TemplateType";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateType, context);
                },
                set: function(val) {
                    setterFunctions['TemplateType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TransmittedDate": {
                get: function() {
                    context["field"] = "TransmittedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["TransmittedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TransmittedDate, context);
                },
                set: function(val) {
                    setterFunctions['TransmittedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TransactionId": {
                get: function() {
                    context["field"] = "TransactionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["TransactionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TransactionId, context);
                },
                set: function(val) {
                    setterFunctions['TransactionId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "UpdatedDateAndTime": {
                get: function() {
                    context["field"] = "UpdatedDateAndTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["UpdatedDateAndTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UpdatedDateAndTime, context);
                },
                set: function(val) {
                    setterFunctions['UpdatedDateAndTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MaxAmount": {
                get: function() {
                    context["field"] = "MaxAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["MaxAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MaxAmount, context);
                },
                set: function(val) {
                    setterFunctions['MaxAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "FileName": {
                get: function() {
                    context["field"] = "FileName";
                    context["metadata"] = (objectMetadata ? objectMetadata["FileName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FileName, context);
                },
                set: function(val) {
                    setterFunctions['FileName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "NumberOfDebits": {
                get: function() {
                    context["field"] = "NumberOfDebits";
                    context["metadata"] = (objectMetadata ? objectMetadata["NumberOfDebits"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.NumberOfDebits, context);
                },
                set: function(val) {
                    setterFunctions['NumberOfDebits'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "NumberOfPrenotes": {
                get: function() {
                    context["field"] = "NumberOfPrenotes";
                    context["metadata"] = (objectMetadata ? objectMetadata["NumberOfPrenotes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.NumberOfPrenotes, context);
                },
                set: function(val) {
                    setterFunctions['NumberOfPrenotes'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "NumberOfCredits": {
                get: function() {
                    context["field"] = "NumberOfCredits";
                    context["metadata"] = (objectMetadata ? objectMetadata["NumberOfCredits"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.NumberOfCredits, context);
                },
                set: function(val) {
                    setterFunctions['NumberOfCredits'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "formatType": {
                get: function() {
                    context["field"] = "formatType";
                    context["metadata"] = (objectMetadata ? objectMetadata["formatType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.formatType, context);
                },
                set: function(val) {
                    setterFunctions['formatType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ACHFileFormatType_id": {
                get: function() {
                    context["field"] = "ACHFileFormatType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["ACHFileFormatType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ACHFileFormatType_id, context);
                },
                set: function(val) {
                    setterFunctions['ACHFileFormatType_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ACHFile_id": {
                get: function() {
                    context["field"] = "ACHFile_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["ACHFile_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ACHFile_id, context);
                },
                set: function(val) {
                    setterFunctions['ACHFile_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TotalCreditAmount": {
                get: function() {
                    context["field"] = "TotalCreditAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["TotalCreditAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TotalCreditAmount, context);
                },
                set: function(val) {
                    setterFunctions['TotalCreditAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TotalDebitAmount": {
                get: function() {
                    context["field"] = "TotalDebitAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["TotalDebitAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TotalDebitAmount, context);
                },
                set: function(val) {
                    setterFunctions['TotalDebitAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "FileRequestType": {
                get: function() {
                    context["field"] = "FileRequestType";
                    context["metadata"] = (objectMetadata ? objectMetadata["FileRequestType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FileRequestType, context);
                },
                set: function(val) {
                    setterFunctions['FileRequestType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CreatedById": {
                get: function() {
                    context["field"] = "CreatedById";
                    context["metadata"] = (objectMetadata ? objectMetadata["CreatedById"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CreatedById, context);
                },
                set: function(val) {
                    setterFunctions['CreatedById'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ActedBy": {
                get: function() {
                    context["field"] = "ActedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["ActedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ActedBy, context);
                },
                set: function(val) {
                    setterFunctions['ActedBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TransactionTypeValue": {
                get: function() {
                    context["field"] = "TransactionTypeValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["TransactionTypeValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TransactionTypeValue, context);
                },
                set: function(val) {
                    setterFunctions['TransactionTypeValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TotalAmount": {
                get: function() {
                    context["field"] = "TotalAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["TotalAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TotalAmount, context);
                },
                set: function(val) {
                    setterFunctions['TotalAmount'].call(this, val, privateState);
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
            "queryType": {
                get: function() {
                    context["field"] = "queryType";
                    context["metadata"] = (objectMetadata ? objectMetadata["queryType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.queryType, context);
                },
                set: function(val) {
                    setterFunctions['queryType'].call(this, val, privateState);
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
            "FeatureAction_id": {
                get: function() {
                    context["field"] = "FeatureAction_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["FeatureAction_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FeatureAction_id, context);
                },
                set: function(val) {
                    setterFunctions['FeatureAction_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "receivedApprovals": {
                get: function() {
                    context["field"] = "receivedApprovals";
                    context["metadata"] = (objectMetadata ? objectMetadata["receivedApprovals"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.receivedApprovals, context);
                },
                set: function(val) {
                    setterFunctions['receivedApprovals'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requiredApprovals": {
                get: function() {
                    context["field"] = "requiredApprovals";
                    context["metadata"] = (objectMetadata ? objectMetadata["requiredApprovals"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requiredApprovals, context);
                },
                set: function(val) {
                    setterFunctions['requiredApprovals'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "approvalId": {
                get: function() {
                    context["field"] = "approvalId";
                    context["metadata"] = (objectMetadata ? objectMetadata["approvalId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.approvalId, context);
                },
                set: function(val) {
                    setterFunctions['approvalId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Actionts": {
                get: function() {
                    context["field"] = "Actionts";
                    context["metadata"] = (objectMetadata ? objectMetadata["Actionts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Actionts, context);
                },
                set: function(val) {
                    setterFunctions['Actionts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userFullName": {
                get: function() {
                    context["field"] = "userFullName";
                    context["metadata"] = (objectMetadata ? objectMetadata["userFullName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userFullName, context);
                },
                set: function(val) {
                    setterFunctions['userFullName'].call(this, val, privateState);
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
            "featureName": {
                get: function() {
                    context["field"] = "featureName";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureName, context);
                },
                set: function(val) {
                    setterFunctions['featureName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payeeName": {
                get: function() {
                    context["field"] = "payeeName";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeName, context);
                },
                set: function(val) {
                    setterFunctions['payeeName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "approvalAccounts": {
                get: function() {
                    context["field"] = "approvalAccounts";
                    context["metadata"] = (objectMetadata ? objectMetadata["approvalAccounts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.approvalAccounts, context);
                },
                set: function(val) {
                    setterFunctions['approvalAccounts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "debitAccounts": {
                get: function() {
                    context["field"] = "debitAccounts";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitAccounts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitAccounts, context);
                },
                set: function(val) {
                    setterFunctions['debitAccounts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amICreator": {
                get: function() {
                    context["field"] = "amICreator";
                    context["metadata"] = (objectMetadata ? objectMetadata["amICreator"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amICreator, context);
                },
                set: function(val) {
                    setterFunctions['amICreator'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amIApprover": {
                get: function() {
                    context["field"] = "amIApprover";
                    context["metadata"] = (objectMetadata ? objectMetadata["amIApprover"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amIApprover, context);
                },
                set: function(val) {
                    setterFunctions['amIApprover'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestId": {
                get: function() {
                    context["field"] = "requestId";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestId, context);
                },
                set: function(val) {
                    setterFunctions['requestId'].call(this, val, privateState);
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
            "featureActionName": {
                get: function() {
                    context["field"] = "featureActionName";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureActionName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureActionName, context);
                },
                set: function(val) {
                    setterFunctions['featureActionName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limitGroupId": {
                get: function() {
                    context["field"] = "limitGroupId";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitGroupId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitGroupId, context);
                },
                set: function(val) {
                    setterFunctions['limitGroupId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limitGroupName": {
                get: function() {
                    context["field"] = "limitGroupName";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitGroupName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitGroupName, context);
                },
                set: function(val) {
                    setterFunctions['limitGroupName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contractId": {
                get: function() {
                    context["field"] = "contractId";
                    context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contractId, context);
                },
                set: function(val) {
                    setterFunctions['contractId'].call(this, val, privateState);
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
            "sentBy": {
                get: function() {
                    context["field"] = "sentBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["sentBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sentBy, context);
                },
                set: function(val) {
                    setterFunctions['sentBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "actedByMeAlready": {
                get: function() {
                    context["field"] = "actedByMeAlready";
                    context["metadata"] = (objectMetadata ? objectMetadata["actedByMeAlready"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actedByMeAlready, context);
                },
                set: function(val) {
                    setterFunctions['actedByMeAlready'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "processingDate": {
                get: function() {
                    context["field"] = "processingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["processingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.processingDate, context);
                },
                set: function(val) {
                    setterFunctions['processingDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sentDate": {
                get: function() {
                    context["field"] = "sentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["sentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sentDate, context);
                },
                set: function(val) {
                    setterFunctions['sentDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recurrence": {
                get: function() {
                    context["field"] = "recurrence";
                    context["metadata"] = (objectMetadata ? objectMetadata["recurrence"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recurrence, context);
                },
                set: function(val) {
                    setterFunctions['recurrence'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reference": {
                get: function() {
                    context["field"] = "reference";
                    context["metadata"] = (objectMetadata ? objectMetadata["reference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reference, context);
                },
                set: function(val) {
                    setterFunctions['reference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerName": {
                get: function() {
                    context["field"] = "customerName";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerName, context);
                },
                set: function(val) {
                    setterFunctions['customerName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceCharge": {
                get: function() {
                    context["field"] = "serviceCharge";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceCharge"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceCharge, context);
                },
                set: function(val) {
                    setterFunctions['serviceCharge'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionAmount": {
                get: function() {
                    context["field"] = "transactionAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionAmount, context);
                },
                set: function(val) {
                    setterFunctions['transactionAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "convertedAmount": {
                get: function() {
                    context["field"] = "convertedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["convertedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.convertedAmount, context);
                },
                set: function(val) {
                    setterFunctions['convertedAmount'].call(this, val, privateState);
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
            "fileType": {
                get: function() {
                    context["field"] = "fileType";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileType, context);
                },
                set: function(val) {
                    setterFunctions['fileType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "numberOfRecords": {
                get: function() {
                    context["field"] = "numberOfRecords";
                    context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecords"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.numberOfRecords, context);
                },
                set: function(val) {
                    setterFunctions['numberOfRecords'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "approvalDate": {
                get: function() {
                    context["field"] = "approvalDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["approvalDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.approvalDate, context);
                },
                set: function(val) {
                    setterFunctions['approvalDate'].call(this, val, privateState);
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
            "templateName": {
                get: function() {
                    context["field"] = "templateName";
                    context["metadata"] = (objectMetadata ? objectMetadata["templateName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.templateName, context);
                },
                set: function(val) {
                    setterFunctions['templateName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "description": {
                get: function() {
                    context["field"] = "description";
                    context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.description, context);
                },
                set: function(val) {
                    setterFunctions['description'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentId": {
                get: function() {
                    context["field"] = "paymentId";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentId, context);
                },
                set: function(val) {
                    setterFunctions['paymentId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalTransactions": {
                get: function() {
                    context["field"] = "totalTransactions";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalTransactions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalTransactions, context);
                },
                set: function(val) {
                    setterFunctions['totalTransactions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "processingMode": {
                get: function() {
                    context["field"] = "processingMode";
                    context["metadata"] = (objectMetadata ? objectMetadata["processingMode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.processingMode, context);
                },
                set: function(val) {
                    setterFunctions['processingMode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "removeByParam": {
                get: function() {
                    context["field"] = "removeByParam";
                    context["metadata"] = (objectMetadata ? objectMetadata["removeByParam"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.removeByParam, context);
                },
                set: function(val) {
                    setterFunctions['removeByParam'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "removeByValue": {
                get: function() {
                    context["field"] = "removeByValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["removeByValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.removeByValue, context);
                },
                set: function(val) {
                    setterFunctions['removeByValue'].call(this, val, privateState);
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
            "paidBy": {
                get: function() {
                    context["field"] = "paidBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["paidBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paidBy, context);
                },
                set: function(val) {
                    setterFunctions['paidBy'].call(this, val, privateState);
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
            "groupName": {
                get: function() {
                    context["field"] = "groupName";
                    context["metadata"] = (objectMetadata ? objectMetadata["groupName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.groupName, context);
                },
                set: function(val) {
                    setterFunctions['groupName'].call(this, val, privateState);
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
            "indicativeRate": {
                get: function() {
                    context["field"] = "indicativeRate";
                    context["metadata"] = (objectMetadata ? objectMetadata["indicativeRate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.indicativeRate, context);
                },
                set: function(val) {
                    setterFunctions['indicativeRate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromAccountCurrency": {
                get: function() {
                    context["field"] = "fromAccountCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccountCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccountCurrency, context);
                },
                set: function(val) {
                    setterFunctions['fromAccountCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditValueDate": {
                get: function() {
                    context["field"] = "creditValueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditValueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditValueDate, context);
                },
                set: function(val) {
                    setterFunctions['creditValueDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "toAccountName": {
                get: function() {
                    context["field"] = "toAccountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["toAccountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toAccountName, context);
                },
                set: function(val) {
                    setterFunctions['toAccountName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentType": {
                get: function() {
                    context["field"] = "paymentType";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentType, context);
                },
                set: function(val) {
                    setterFunctions['paymentType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "frequencyEndDate": {
                get: function() {
                    context["field"] = "frequencyEndDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["frequencyEndDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.frequencyEndDate, context);
                },
                set: function(val) {
                    setterFunctions['frequencyEndDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryBankAddress": {
                get: function() {
                    context["field"] = "beneficiaryBankAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryBankAddress, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryBankAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "approverUserId": {
                get: function() {
                    context["field"] = "approverUserId";
                    context["metadata"] = (objectMetadata ? objectMetadata["approverUserId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.approverUserId, context);
                },
                set: function(val) {
                    setterFunctions['approverUserId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileNames": {
                get: function() {
                    context["field"] = "fileNames";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileNames"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileNames, context);
                },
                set: function(val) {
                    setterFunctions['fileNames'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileNameValue": {
                get: function() {
                    context["field"] = "fileNameValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileNameValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileNameValue, context);
                },
                set: function(val) {
                    setterFunctions['fileNameValue'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.TransactionType = value ? (value["TransactionType"] ? value["TransactionType"] : null) : null;
            privateState.Status = value ? (value["Status"] ? value["Status"] : null) : null;
            privateState.Request_id = value ? (value["Request_id"] ? value["Request_id"] : null) : null;
            privateState.CompanyName = value ? (value["CompanyName"] ? value["CompanyName"] : null) : null;
            privateState.DebitOrCreditAccount = value ? (value["DebitOrCreditAccount"] ? value["DebitOrCreditAccount"] : null) : null;
            privateState.Amount = value ? (value["Amount"] ? value["Amount"] : null) : null;
            privateState.CreatedOn = value ? (value["CreatedOn"] ? value["CreatedOn"] : null) : null;
            privateState.CreatedBy = value ? (value["CreatedBy"] ? value["CreatedBy"] : null) : null;
            privateState.Company_id = value ? (value["Company_id"] ? value["Company_id"] : null) : null;
            privateState.RequestCreatedby = value ? (value["RequestCreatedby"] ? value["RequestCreatedby"] : null) : null;
            privateState.Payee = value ? (value["Payee"] ? value["Payee"] : null) : null;
            privateState.Date = value ? (value["Date"] ? value["Date"] : null) : null;
            privateState.Transaction_id = value ? (value["Transaction_id"] ? value["Transaction_id"] : null) : null;
            privateState.Frequency = value ? (value["Frequency"] ? value["Frequency"] : null) : null;
            privateState.Reccurence = value ? (value["Reccurence"] ? value["Reccurence"] : null) : null;
            privateState.BBGeneralTransactionType_id = value ? (value["BBGeneralTransactionType_id"] ? value["BBGeneralTransactionType_id"] : null) : null;
            privateState.StatusId = value ? (value["StatusId"] ? value["StatusId"] : null) : null;
            privateState.TemplateRequestTypeId = value ? (value["TemplateRequestTypeId"] ? value["TemplateRequestTypeId"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.TemplateTypeId = value ? (value["TemplateTypeId"] ? value["TemplateTypeId"] : null) : null;
            privateState.RequestType = value ? (value["RequestType"] ? value["RequestType"] : null) : null;
            privateState.TemplateTypeValue = value ? (value["TemplateTypeValue"] ? value["TemplateTypeValue"] : null) : null;
            privateState.softDelete = value ? (value["softDelete"] ? value["softDelete"] : null) : null;
            privateState.TransactionType_id = value ? (value["TransactionType_id"] ? value["TransactionType_id"] : null) : null;
            privateState.TemplateType = value ? (value["TemplateType"] ? value["TemplateType"] : null) : null;
            privateState.TransmittedDate = value ? (value["TransmittedDate"] ? value["TransmittedDate"] : null) : null;
            privateState.TransactionId = value ? (value["TransactionId"] ? value["TransactionId"] : null) : null;
            privateState.UpdatedDateAndTime = value ? (value["UpdatedDateAndTime"] ? value["UpdatedDateAndTime"] : null) : null;
            privateState.MaxAmount = value ? (value["MaxAmount"] ? value["MaxAmount"] : null) : null;
            privateState.FileName = value ? (value["FileName"] ? value["FileName"] : null) : null;
            privateState.NumberOfDebits = value ? (value["NumberOfDebits"] ? value["NumberOfDebits"] : null) : null;
            privateState.NumberOfPrenotes = value ? (value["NumberOfPrenotes"] ? value["NumberOfPrenotes"] : null) : null;
            privateState.NumberOfCredits = value ? (value["NumberOfCredits"] ? value["NumberOfCredits"] : null) : null;
            privateState.formatType = value ? (value["formatType"] ? value["formatType"] : null) : null;
            privateState.ACHFileFormatType_id = value ? (value["ACHFileFormatType_id"] ? value["ACHFileFormatType_id"] : null) : null;
            privateState.ACHFile_id = value ? (value["ACHFile_id"] ? value["ACHFile_id"] : null) : null;
            privateState.TotalCreditAmount = value ? (value["TotalCreditAmount"] ? value["TotalCreditAmount"] : null) : null;
            privateState.TotalDebitAmount = value ? (value["TotalDebitAmount"] ? value["TotalDebitAmount"] : null) : null;
            privateState.FileRequestType = value ? (value["FileRequestType"] ? value["FileRequestType"] : null) : null;
            privateState.CreatedById = value ? (value["CreatedById"] ? value["CreatedById"] : null) : null;
            privateState.ActedBy = value ? (value["ActedBy"] ? value["ActedBy"] : null) : null;
            privateState.TransactionTypeValue = value ? (value["TransactionTypeValue"] ? value["TransactionTypeValue"] : null) : null;
            privateState.TotalAmount = value ? (value["TotalAmount"] ? value["TotalAmount"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.queryType = value ? (value["queryType"] ? value["queryType"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.FeatureAction_id = value ? (value["FeatureAction_id"] ? value["FeatureAction_id"] : null) : null;
            privateState.receivedApprovals = value ? (value["receivedApprovals"] ? value["receivedApprovals"] : null) : null;
            privateState.requiredApprovals = value ? (value["requiredApprovals"] ? value["requiredApprovals"] : null) : null;
            privateState.approvalId = value ? (value["approvalId"] ? value["approvalId"] : null) : null;
            privateState.Actionts = value ? (value["Actionts"] ? value["Actionts"] : null) : null;
            privateState.userFullName = value ? (value["userFullName"] ? value["userFullName"] : null) : null;
            privateState.filterByParam = value ? (value["filterByParam"] ? value["filterByParam"] : null) : null;
            privateState.filterByValue = value ? (value["filterByValue"] ? value["filterByValue"] : null) : null;
            privateState.featureName = value ? (value["featureName"] ? value["featureName"] : null) : null;
            privateState.payeeName = value ? (value["payeeName"] ? value["payeeName"] : null) : null;
            privateState.approvalAccounts = value ? (value["approvalAccounts"] ? value["approvalAccounts"] : null) : null;
            privateState.debitAccounts = value ? (value["debitAccounts"] ? value["debitAccounts"] : null) : null;
            privateState.amICreator = value ? (value["amICreator"] ? value["amICreator"] : null) : null;
            privateState.amIApprover = value ? (value["amIApprover"] ? value["amIApprover"] : null) : null;
            privateState.requestId = value ? (value["requestId"] ? value["requestId"] : null) : null;
            privateState.featureActionId = value ? (value["featureActionId"] ? value["featureActionId"] : null) : null;
            privateState.featureActionName = value ? (value["featureActionName"] ? value["featureActionName"] : null) : null;
            privateState.limitGroupId = value ? (value["limitGroupId"] ? value["limitGroupId"] : null) : null;
            privateState.limitGroupName = value ? (value["limitGroupName"] ? value["limitGroupName"] : null) : null;
            privateState.contractId = value ? (value["contractId"] ? value["contractId"] : null) : null;
            privateState.companyId = value ? (value["companyId"] ? value["companyId"] : null) : null;
            privateState.accountId = value ? (value["accountId"] ? value["accountId"] : null) : null;
            privateState.sentBy = value ? (value["sentBy"] ? value["sentBy"] : null) : null;
            privateState.actedByMeAlready = value ? (value["actedByMeAlready"] ? value["actedByMeAlready"] : null) : null;
            privateState.processingDate = value ? (value["processingDate"] ? value["processingDate"] : null) : null;
            privateState.sentDate = value ? (value["sentDate"] ? value["sentDate"] : null) : null;
            privateState.recurrence = value ? (value["recurrence"] ? value["recurrence"] : null) : null;
            privateState.reference = value ? (value["reference"] ? value["reference"] : null) : null;
            privateState.customerName = value ? (value["customerName"] ? value["customerName"] : null) : null;
            privateState.serviceCharge = value ? (value["serviceCharge"] ? value["serviceCharge"] : null) : null;
            privateState.transactionAmount = value ? (value["transactionAmount"] ? value["transactionAmount"] : null) : null;
            privateState.convertedAmount = value ? (value["convertedAmount"] ? value["convertedAmount"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.fileType = value ? (value["fileType"] ? value["fileType"] : null) : null;
            privateState.numberOfRecords = value ? (value["numberOfRecords"] ? value["numberOfRecords"] : null) : null;
            privateState.approvalDate = value ? (value["approvalDate"] ? value["approvalDate"] : null) : null;
            privateState.confirmationNumber = value ? (value["confirmationNumber"] ? value["confirmationNumber"] : null) : null;
            privateState.templateName = value ? (value["templateName"] ? value["templateName"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.paymentId = value ? (value["paymentId"] ? value["paymentId"] : null) : null;
            privateState.totalTransactions = value ? (value["totalTransactions"] ? value["totalTransactions"] : null) : null;
            privateState.processingMode = value ? (value["processingMode"] ? value["processingMode"] : null) : null;
            privateState.removeByParam = value ? (value["removeByParam"] ? value["removeByParam"] : null) : null;
            privateState.removeByValue = value ? (value["removeByValue"] ? value["removeByValue"] : null) : null;
            privateState.timeParam = value ? (value["timeParam"] ? value["timeParam"] : null) : null;
            privateState.timeValue = value ? (value["timeValue"] ? value["timeValue"] : null) : null;
            privateState.paidBy = value ? (value["paidBy"] ? value["paidBy"] : null) : null;
            privateState.swiftCode = value ? (value["swiftCode"] ? value["swiftCode"] : null) : null;
            privateState.groupName = value ? (value["groupName"] ? value["groupName"] : null) : null;
            privateState.transactionCurrency = value ? (value["transactionCurrency"] ? value["transactionCurrency"] : null) : null;
            privateState.charges = value ? (value["charges"] ? value["charges"] : null) : null;
            privateState.indicativeRate = value ? (value["indicativeRate"] ? value["indicativeRate"] : null) : null;
            privateState.fromAccountCurrency = value ? (value["fromAccountCurrency"] ? value["fromAccountCurrency"] : null) : null;
            privateState.creditValueDate = value ? (value["creditValueDate"] ? value["creditValueDate"] : null) : null;
            privateState.toAccountName = value ? (value["toAccountName"] ? value["toAccountName"] : null) : null;
            privateState.paymentType = value ? (value["paymentType"] ? value["paymentType"] : null) : null;
            privateState.frequencyEndDate = value ? (value["frequencyEndDate"] ? value["frequencyEndDate"] : null) : null;
            privateState.beneficiaryBankAddress = value ? (value["beneficiaryBankAddress"] ? value["beneficiaryBankAddress"] : null) : null;
            privateState.approverUserId = value ? (value["approverUserId"] ? value["approverUserId"] : null) : null;
            privateState.fileNames = value ? (value["fileNames"] ? value["fileNames"] : null) : null;
            privateState.fileNameValue = value ? (value["fileNameValue"] ? value["fileNameValue"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(MyRequests);

    //Create new class level validator object
    BaseModel.Validator.call(MyRequests);

    var registerValidatorBackup = MyRequests.registerValidator;

    MyRequests.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(MyRequests.isValid(this, propName, val)) {
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
    //For Operation 'withdrawACHTransaction' with service id 'WithdrawACHTransaction8126'
     MyRequests.withdrawACHTransaction = function(params, onCompletion){
        return MyRequests.customVerb('withdrawACHTransaction', params, onCompletion);
     };

    //For Operation 'getGeneralTransactionsRequestedByMe' with service id 'FetchGeneralTransactionRequests4687'
     MyRequests.getGeneralTransactionsRequestedByMe = function(params, onCompletion){
        return MyRequests.customVerb('getGeneralTransactionsRequestedByMe', params, onCompletion);
     };

    //For Operation 'getRequestsHistory' with service id 'fetchRequestHistory4976'
     MyRequests.getRequestsHistory = function(params, onCompletion){
        return MyRequests.customVerb('getRequestsHistory', params, onCompletion);
     };

    //For Operation 'Withdraw' with service id 'Withdraw6848'
     MyRequests.Withdraw = function(params, onCompletion){
        return MyRequests.customVerb('Withdraw', params, onCompletion);
     };

    //For Operation 'fetchAllMyRequestHistory' with service id 'FetchAllMyRequestHistory4312'
     MyRequests.fetchAllMyRequestHistory = function(params, onCompletion){
        return MyRequests.customVerb('fetchAllMyRequestHistory', params, onCompletion);
     };

    //For Operation 'fetchAllMyPendingRequests' with service id 'FetchAllMyPendingRequest4913'
     MyRequests.fetchAllMyPendingRequests = function(params, onCompletion){
        return MyRequests.customVerb('fetchAllMyPendingRequests', params, onCompletion);
     };

    //For Operation 'RenotifyPendingApprovalRequest' with service id 'RenotifyPendingApprovalRequest5051'
     MyRequests.RenotifyPendingApprovalRequest = function(params, onCompletion){
        return MyRequests.customVerb('RenotifyPendingApprovalRequest', params, onCompletion);
     };

    //For Operation 'getACHTransactionsRequestedByMe' with service id 'fetchACHTransactionRequests5665'
     MyRequests.getACHTransactionsRequestedByMe = function(params, onCompletion){
        return MyRequests.customVerb('getACHTransactionsRequestedByMe', params, onCompletion);
     };

    //For Operation 'withdrawGeneralTransaction' with service id 'WithdrawGeneralTransaction5083'
     MyRequests.withdrawGeneralTransaction = function(params, onCompletion){
        return MyRequests.customVerb('withdrawGeneralTransaction', params, onCompletion);
     };

    //For Operation 'withdrawACHFile' with service id 'WithdrawACHFile3979'
     MyRequests.withdrawACHFile = function(params, onCompletion){
        return MyRequests.customVerb('withdrawACHFile', params, onCompletion);
     };

    //For Operation 'getACHFilesRequestedByMe' with service id 'fetchACHFileRequests3808'
     MyRequests.getACHFilesRequestedByMe = function(params, onCompletion){
        return MyRequests.customVerb('getACHFilesRequestedByMe', params, onCompletion);
     };

    var relations = [];

    MyRequests.relations = relations;

    MyRequests.prototype.isValid = function() {
        return MyRequests.isValid(this);
    };

    MyRequests.prototype.objModelName = "MyRequests";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    MyRequests.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ApprovalsAndRequests", "MyRequests", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    MyRequests.clone = function(objectToClone) {
        var clonedObj = new MyRequests();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return MyRequests;
});