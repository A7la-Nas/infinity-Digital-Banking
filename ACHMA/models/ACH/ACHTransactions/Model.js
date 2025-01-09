/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ACHTransactions", "objectService" : "ACH"};

    var setterFunctions = {
        BBGeneralTransactionType_id: function(val, state) {
            context["field"] = "BBGeneralTransactionType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["BBGeneralTransactionType_id"] : null);
            state['BBGeneralTransactionType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status: function(val, state) {
            context["field"] = "Status";
            context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
            state['Status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateRequestType_id: function(val, state) {
            context["field"] = "TemplateRequestType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestType_id"] : null);
            state['TemplateRequestType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Request_id: function(val, state) {
            context["field"] = "Request_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Request_id"] : null);
            state['Request_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        DebitAccount: function(val, state) {
            context["field"] = "DebitAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["DebitAccount"] : null);
            state['DebitAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CreatedOn: function(val, state) {
            context["field"] = "CreatedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["CreatedOn"] : null);
            state['CreatedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MaxAmount: function(val, state) {
            context["field"] = "MaxAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["MaxAmount"] : null);
            state['MaxAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateType_id: function(val, state) {
            context["field"] = "TemplateType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateType_id"] : null);
            state['TemplateType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CompanyName: function(val, state) {
            context["field"] = "CompanyName";
            context["metadata"] = (objectMetadata ? objectMetadata["CompanyName"] : null);
            state['CompanyName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        TransactionTypeValue: function(val, state) {
            context["field"] = "TransactionTypeValue";
            context["metadata"] = (objectMetadata ? objectMetadata["TransactionTypeValue"] : null);
            state['TransactionTypeValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        StatusValue: function(val, state) {
            context["field"] = "StatusValue";
            context["metadata"] = (objectMetadata ? objectMetadata["StatusValue"] : null);
            state['StatusValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Transaction_id: function(val, state) {
            context["field"] = "Transaction_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Transaction_id"] : null);
            state['Transaction_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EffectiveDate: function(val, state) {
            context["field"] = "EffectiveDate";
            context["metadata"] = (objectMetadata ? objectMetadata["EffectiveDate"] : null);
            state['EffectiveDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateName: function(val, state) {
            context["field"] = "TemplateName";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateName"] : null);
            state['TemplateName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ConfirmationNumber: function(val, state) {
            context["field"] = "ConfirmationNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["ConfirmationNumber"] : null);
            state['ConfirmationNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Approver: function(val, state) {
            context["field"] = "Approver";
            context["metadata"] = (objectMetadata ? objectMetadata["Approver"] : null);
            state['Approver'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Records: function(val, state) {
            context["field"] = "Records";
            context["metadata"] = (objectMetadata ? objectMetadata["Records"] : null);
            state['Records'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateDescription: function(val, state) {
            context["field"] = "TemplateDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateDescription"] : null);
            state['TemplateDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TotalAmount: function(val, state) {
            context["field"] = "TotalAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["TotalAmount"] : null);
            state['TotalAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ReferenceID: function(val, state) {
            context["field"] = "ReferenceID";
            context["metadata"] = (objectMetadata ? objectMetadata["ReferenceID"] : null);
            state['ReferenceID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        featureActionId: function(val, state) {
            context["field"] = "featureActionId";
            context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
            state['featureActionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        queryType: function(val, state) {
            context["field"] = "queryType";
            context["metadata"] = (objectMetadata ? objectMetadata["queryType"] : null);
            state['queryType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchString: function(val, state) {
            context["field"] = "searchString";
            context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
            state['searchString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        AccountName: function(val, state) {
            context["field"] = "AccountName";
            context["metadata"] = (objectMetadata ? objectMetadata["AccountName"] : null);
            state['AccountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        TemplateRequestTypeValue: function(val, state) {
            context["field"] = "TemplateRequestTypeValue";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeValue"] : null);
            state['TemplateRequestTypeValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionId: function(val, state) {
            context["field"] = "transactionId";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
            state['transactionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ACHTransactions(defaultValues) {
        var privateState = {};
        context["field"] = "BBGeneralTransactionType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["BBGeneralTransactionType_id"] : null);
        privateState.BBGeneralTransactionType_id = defaultValues ?
            (defaultValues["BBGeneralTransactionType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["BBGeneralTransactionType_id"], context) :
                null) :
            null;

        context["field"] = "Status";
        context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
        privateState.Status = defaultValues ?
            (defaultValues["Status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status"], context) :
                null) :
            null;

        context["field"] = "TemplateRequestType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestType_id"] : null);
        privateState.TemplateRequestType_id = defaultValues ?
            (defaultValues["TemplateRequestType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateRequestType_id"], context) :
                null) :
            null;

        context["field"] = "Request_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Request_id"] : null);
        privateState.Request_id = defaultValues ?
            (defaultValues["Request_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Request_id"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "DebitAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["DebitAccount"] : null);
        privateState.DebitAccount = defaultValues ?
            (defaultValues["DebitAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["DebitAccount"], context) :
                null) :
            null;

        context["field"] = "CreatedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["CreatedOn"] : null);
        privateState.CreatedOn = defaultValues ?
            (defaultValues["CreatedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CreatedOn"], context) :
                null) :
            null;

        context["field"] = "MaxAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["MaxAmount"] : null);
        privateState.MaxAmount = defaultValues ?
            (defaultValues["MaxAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MaxAmount"], context) :
                null) :
            null;

        context["field"] = "TemplateType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateType_id"] : null);
        privateState.TemplateType_id = defaultValues ?
            (defaultValues["TemplateType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateType_id"], context) :
                null) :
            null;

        context["field"] = "CompanyName";
        context["metadata"] = (objectMetadata ? objectMetadata["CompanyName"] : null);
        privateState.CompanyName = defaultValues ?
            (defaultValues["CompanyName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CompanyName"], context) :
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

        context["field"] = "TransactionTypeValue";
        context["metadata"] = (objectMetadata ? objectMetadata["TransactionTypeValue"] : null);
        privateState.TransactionTypeValue = defaultValues ?
            (defaultValues["TransactionTypeValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransactionTypeValue"], context) :
                null) :
            null;

        context["field"] = "StatusValue";
        context["metadata"] = (objectMetadata ? objectMetadata["StatusValue"] : null);
        privateState.StatusValue = defaultValues ?
            (defaultValues["StatusValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["StatusValue"], context) :
                null) :
            null;

        context["field"] = "Transaction_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Transaction_id"] : null);
        privateState.Transaction_id = defaultValues ?
            (defaultValues["Transaction_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Transaction_id"], context) :
                null) :
            null;

        context["field"] = "EffectiveDate";
        context["metadata"] = (objectMetadata ? objectMetadata["EffectiveDate"] : null);
        privateState.EffectiveDate = defaultValues ?
            (defaultValues["EffectiveDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EffectiveDate"], context) :
                null) :
            null;

        context["field"] = "TemplateName";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateName"] : null);
        privateState.TemplateName = defaultValues ?
            (defaultValues["TemplateName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateName"], context) :
                null) :
            null;

        context["field"] = "ConfirmationNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["ConfirmationNumber"] : null);
        privateState.ConfirmationNumber = defaultValues ?
            (defaultValues["ConfirmationNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ConfirmationNumber"], context) :
                null) :
            null;

        context["field"] = "Approver";
        context["metadata"] = (objectMetadata ? objectMetadata["Approver"] : null);
        privateState.Approver = defaultValues ?
            (defaultValues["Approver"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Approver"], context) :
                null) :
            null;

        context["field"] = "Records";
        context["metadata"] = (objectMetadata ? objectMetadata["Records"] : null);
        privateState.Records = defaultValues ?
            (defaultValues["Records"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Records"], context) :
                null) :
            null;

        context["field"] = "TemplateDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateDescription"] : null);
        privateState.TemplateDescription = defaultValues ?
            (defaultValues["TemplateDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateDescription"], context) :
                null) :
            null;

        context["field"] = "TotalAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["TotalAmount"] : null);
        privateState.TotalAmount = defaultValues ?
            (defaultValues["TotalAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TotalAmount"], context) :
                null) :
            null;

        context["field"] = "ReferenceID";
        context["metadata"] = (objectMetadata ? objectMetadata["ReferenceID"] : null);
        privateState.ReferenceID = defaultValues ?
            (defaultValues["ReferenceID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ReferenceID"], context) :
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

        context["field"] = "featureActionId";
        context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
        privateState.featureActionId = defaultValues ?
            (defaultValues["featureActionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureActionId"], context) :
                null) :
            null;

        context["field"] = "queryType";
        context["metadata"] = (objectMetadata ? objectMetadata["queryType"] : null);
        privateState.queryType = defaultValues ?
            (defaultValues["queryType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["queryType"], context) :
                null) :
            null;

        context["field"] = "searchString";
        context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
        privateState.searchString = defaultValues ?
            (defaultValues["searchString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchString"], context) :
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

        context["field"] = "AccountName";
        context["metadata"] = (objectMetadata ? objectMetadata["AccountName"] : null);
        privateState.AccountName = defaultValues ?
            (defaultValues["AccountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["AccountName"], context) :
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

        context["field"] = "TemplateRequestTypeValue";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeValue"] : null);
        privateState.TemplateRequestTypeValue = defaultValues ?
            (defaultValues["TemplateRequestTypeValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateRequestTypeValue"], context) :
                null) :
            null;

        context["field"] = "transactionId";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
        privateState.transactionId = defaultValues ?
            (defaultValues["transactionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "TemplateRequestType_id": {
                get: function() {
                    context["field"] = "TemplateRequestType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateRequestType_id, context);
                },
                set: function(val) {
                    setterFunctions['TemplateRequestType_id'].call(this, val, privateState);
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
            "DebitAccount": {
                get: function() {
                    context["field"] = "DebitAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["DebitAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.DebitAccount, context);
                },
                set: function(val) {
                    setterFunctions['DebitAccount'].call(this, val, privateState);
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
            "TemplateType_id": {
                get: function() {
                    context["field"] = "TemplateType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateType_id, context);
                },
                set: function(val) {
                    setterFunctions['TemplateType_id'].call(this, val, privateState);
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
            "StatusValue": {
                get: function() {
                    context["field"] = "StatusValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["StatusValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.StatusValue, context);
                },
                set: function(val) {
                    setterFunctions['StatusValue'].call(this, val, privateState);
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
            "EffectiveDate": {
                get: function() {
                    context["field"] = "EffectiveDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["EffectiveDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.EffectiveDate, context);
                },
                set: function(val) {
                    setterFunctions['EffectiveDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TemplateName": {
                get: function() {
                    context["field"] = "TemplateName";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateName, context);
                },
                set: function(val) {
                    setterFunctions['TemplateName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ConfirmationNumber": {
                get: function() {
                    context["field"] = "ConfirmationNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["ConfirmationNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ConfirmationNumber, context);
                },
                set: function(val) {
                    setterFunctions['ConfirmationNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Approver": {
                get: function() {
                    context["field"] = "Approver";
                    context["metadata"] = (objectMetadata ? objectMetadata["Approver"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Approver, context);
                },
                set: function(val) {
                    setterFunctions['Approver'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Records": {
                get: function() {
                    context["field"] = "Records";
                    context["metadata"] = (objectMetadata ? objectMetadata["Records"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Records, context);
                },
                set: function(val) {
                    setterFunctions['Records'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TemplateDescription": {
                get: function() {
                    context["field"] = "TemplateDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateDescription, context);
                },
                set: function(val) {
                    setterFunctions['TemplateDescription'].call(this, val, privateState);
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
            "ReferenceID": {
                get: function() {
                    context["field"] = "ReferenceID";
                    context["metadata"] = (objectMetadata ? objectMetadata["ReferenceID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ReferenceID, context);
                },
                set: function(val) {
                    setterFunctions['ReferenceID'].call(this, val, privateState);
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
            "AccountName": {
                get: function() {
                    context["field"] = "AccountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["AccountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.AccountName, context);
                },
                set: function(val) {
                    setterFunctions['AccountName'].call(this, val, privateState);
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
            "TemplateRequestTypeValue": {
                get: function() {
                    context["field"] = "TemplateRequestTypeValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateRequestTypeValue, context);
                },
                set: function(val) {
                    setterFunctions['TemplateRequestTypeValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionId": {
                get: function() {
                    context["field"] = "transactionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionId, context);
                },
                set: function(val) {
                    setterFunctions['transactionId'].call(this, val, privateState);
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
            privateState.BBGeneralTransactionType_id = value ? (value["BBGeneralTransactionType_id"] ? value["BBGeneralTransactionType_id"] : null) : null;
            privateState.Status = value ? (value["Status"] ? value["Status"] : null) : null;
            privateState.TemplateRequestType_id = value ? (value["TemplateRequestType_id"] ? value["TemplateRequestType_id"] : null) : null;
            privateState.Request_id = value ? (value["Request_id"] ? value["Request_id"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.DebitAccount = value ? (value["DebitAccount"] ? value["DebitAccount"] : null) : null;
            privateState.CreatedOn = value ? (value["CreatedOn"] ? value["CreatedOn"] : null) : null;
            privateState.MaxAmount = value ? (value["MaxAmount"] ? value["MaxAmount"] : null) : null;
            privateState.TemplateType_id = value ? (value["TemplateType_id"] ? value["TemplateType_id"] : null) : null;
            privateState.CompanyName = value ? (value["CompanyName"] ? value["CompanyName"] : null) : null;
            privateState.RequestType = value ? (value["RequestType"] ? value["RequestType"] : null) : null;
            privateState.TemplateTypeValue = value ? (value["TemplateTypeValue"] ? value["TemplateTypeValue"] : null) : null;
            privateState.softDelete = value ? (value["softDelete"] ? value["softDelete"] : null) : null;
            privateState.TransactionType_id = value ? (value["TransactionType_id"] ? value["TransactionType_id"] : null) : null;
            privateState.CreatedBy = value ? (value["CreatedBy"] ? value["CreatedBy"] : null) : null;
            privateState.Company_id = value ? (value["Company_id"] ? value["Company_id"] : null) : null;
            privateState.TransactionTypeValue = value ? (value["TransactionTypeValue"] ? value["TransactionTypeValue"] : null) : null;
            privateState.StatusValue = value ? (value["StatusValue"] ? value["StatusValue"] : null) : null;
            privateState.Transaction_id = value ? (value["Transaction_id"] ? value["Transaction_id"] : null) : null;
            privateState.EffectiveDate = value ? (value["EffectiveDate"] ? value["EffectiveDate"] : null) : null;
            privateState.TemplateName = value ? (value["TemplateName"] ? value["TemplateName"] : null) : null;
            privateState.ConfirmationNumber = value ? (value["ConfirmationNumber"] ? value["ConfirmationNumber"] : null) : null;
            privateState.Approver = value ? (value["Approver"] ? value["Approver"] : null) : null;
            privateState.Records = value ? (value["Records"] ? value["Records"] : null) : null;
            privateState.TemplateDescription = value ? (value["TemplateDescription"] ? value["TemplateDescription"] : null) : null;
            privateState.TotalAmount = value ? (value["TotalAmount"] ? value["TotalAmount"] : null) : null;
            privateState.ReferenceID = value ? (value["ReferenceID"] ? value["ReferenceID"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.featureActionId = value ? (value["featureActionId"] ? value["featureActionId"] : null) : null;
            privateState.queryType = value ? (value["queryType"] ? value["queryType"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.receivedApprovals = value ? (value["receivedApprovals"] ? value["receivedApprovals"] : null) : null;
            privateState.requiredApprovals = value ? (value["requiredApprovals"] ? value["requiredApprovals"] : null) : null;
            privateState.AccountName = value ? (value["AccountName"] ? value["AccountName"] : null) : null;
            privateState.filterByParam = value ? (value["filterByParam"] ? value["filterByParam"] : null) : null;
            privateState.filterByValue = value ? (value["filterByValue"] ? value["filterByValue"] : null) : null;
            privateState.amICreator = value ? (value["amICreator"] ? value["amICreator"] : null) : null;
            privateState.amIApprover = value ? (value["amIApprover"] ? value["amIApprover"] : null) : null;
            privateState.TemplateRequestTypeValue = value ? (value["TemplateRequestTypeValue"] ? value["TemplateRequestTypeValue"] : null) : null;
            privateState.transactionId = value ? (value["transactionId"] ? value["transactionId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ACHTransactions);

    //Create new class level validator object
    BaseModel.Validator.call(ACHTransactions);

    var registerValidatorBackup = ACHTransactions.registerValidator;

    ACHTransactions.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ACHTransactions.isValid(this, propName, val)) {
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
    //For Operation 'getACHTransactionDetailsById' with service id 'FetchACHTransactionById1224'
     ACHTransactions.getACHTransactionDetailsById = function(params, onCompletion){
        return ACHTransactions.customVerb('getACHTransactionDetailsById', params, onCompletion);
     };

    //For Operation 'createACHTransaction' with service id 'createTransaction2519'
     ACHTransactions.createACHTransaction = function(params, onCompletion){
        return ACHTransactions.customVerb('createACHTransaction', params, onCompletion);
     };

    //For Operation 'getAllACHTransactions' with service id 'FetchAllACHTransactions5918'
     ACHTransactions.getAllACHTransactions = function(params, onCompletion){
        return ACHTransactions.customVerb('getAllACHTransactions', params, onCompletion);
     };

    //For Operation 'RejectedTransactions' with service id 'FetchAllRejectedACHTransactions9987'
     ACHTransactions.RejectedTransactions = function(params, onCompletion){
        return ACHTransactions.customVerb('RejectedTransactions', params, onCompletion);
     };

    //For Operation 'SaveAsTemplate' with service id 'SaveTransactionAsTemplate3794'
     ACHTransactions.SaveAsTemplate = function(params, onCompletion){
        return ACHTransactions.customVerb('SaveAsTemplate', params, onCompletion);
     };

    var relations = [];

    ACHTransactions.relations = relations;

    ACHTransactions.prototype.isValid = function() {
        return ACHTransactions.isValid(this);
    };

    ACHTransactions.prototype.objModelName = "ACHTransactions";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ACHTransactions.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ACH", "ACHTransactions", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ACHTransactions.clone = function(objectToClone) {
        var clonedObj = new ACHTransactions();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ACHTransactions;
});