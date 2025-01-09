/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ACHFile", "objectService" : "ACH"};

    var setterFunctions = {
        FileName: function(val, state) {
            context["field"] = "FileName";
            context["metadata"] = (objectMetadata ? objectMetadata["FileName"] : null);
            state['FileName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ACHFileID: function(val, state) {
            context["field"] = "ACHFileID";
            context["metadata"] = (objectMetadata ? objectMetadata["ACHFileID"] : null);
            state['ACHFileID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CompanyName: function(val, state) {
            context["field"] = "CompanyName";
            context["metadata"] = (objectMetadata ? objectMetadata["CompanyName"] : null);
            state['CompanyName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UploadedBy: function(val, state) {
            context["field"] = "UploadedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["UploadedBy"] : null);
            state['UploadedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UpdatedDateAndTime: function(val, state) {
            context["field"] = "UpdatedDateAndTime";
            context["metadata"] = (objectMetadata ? objectMetadata["UpdatedDateAndTime"] : null);
            state['UpdatedDateAndTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        UploadedByID: function(val, state) {
            context["field"] = "UploadedByID";
            context["metadata"] = (objectMetadata ? objectMetadata["UploadedByID"] : null);
            state['UploadedByID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NumberOfCredits: function(val, state) {
            context["field"] = "NumberOfCredits";
            context["metadata"] = (objectMetadata ? objectMetadata["NumberOfCredits"] : null);
            state['NumberOfCredits'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softDelete: function(val, state) {
            context["field"] = "softDelete";
            context["metadata"] = (objectMetadata ? objectMetadata["softDelete"] : null);
            state['softDelete'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CompanyID: function(val, state) {
            context["field"] = "CompanyID";
            context["metadata"] = (objectMetadata ? objectMetadata["CompanyID"] : null);
            state['CompanyID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FormatTypeID: function(val, state) {
            context["field"] = "FormatTypeID";
            context["metadata"] = (objectMetadata ? objectMetadata["FormatTypeID"] : null);
            state['FormatTypeID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FileStatus: function(val, state) {
            context["field"] = "FileStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["FileStatus"] : null);
            state['FileStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FileSize: function(val, state) {
            context["field"] = "FileSize";
            context["metadata"] = (objectMetadata ? objectMetadata["FileSize"] : null);
            state['FileSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FileStatusID: function(val, state) {
            context["field"] = "FileStatusID";
            context["metadata"] = (objectMetadata ? objectMetadata["FileStatusID"] : null);
            state['FileStatusID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TransactionTypeID: function(val, state) {
            context["field"] = "TransactionTypeID";
            context["metadata"] = (objectMetadata ? objectMetadata["TransactionTypeID"] : null);
            state['TransactionTypeID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        FileFormatType: function(val, state) {
            context["field"] = "FileFormatType";
            context["metadata"] = (objectMetadata ? objectMetadata["FileFormatType"] : null);
            state['FileFormatType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NumberOfRecords: function(val, state) {
            context["field"] = "NumberOfRecords";
            context["metadata"] = (objectMetadata ? objectMetadata["NumberOfRecords"] : null);
            state['NumberOfRecords'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Request_id: function(val, state) {
            context["field"] = "Request_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Request_id"] : null);
            state['Request_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Approver: function(val, state) {
            context["field"] = "Approver";
            context["metadata"] = (objectMetadata ? objectMetadata["Approver"] : null);
            state['Approver'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EffectiveDate: function(val, state) {
            context["field"] = "EffectiveDate";
            context["metadata"] = (objectMetadata ? objectMetadata["EffectiveDate"] : null);
            state['EffectiveDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status: function(val, state) {
            context["field"] = "Status";
            context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
            state['Status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ReferenceID: function(val, state) {
            context["field"] = "ReferenceID";
            context["metadata"] = (objectMetadata ? objectMetadata["ReferenceID"] : null);
            state['ReferenceID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ACHFileName: function(val, state) {
            context["field"] = "ACHFileName";
            context["metadata"] = (objectMetadata ? objectMetadata["ACHFileName"] : null);
            state['ACHFileName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        DebitAmount: function(val, state) {
            context["field"] = "DebitAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["DebitAmount"] : null);
            state['DebitAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CreditAmount: function(val, state) {
            context["field"] = "CreditAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["CreditAmount"] : null);
            state['CreditAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Contents: function(val, state) {
            context["field"] = "Contents";
            context["metadata"] = (objectMetadata ? objectMetadata["Contents"] : null);
            state['Contents'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ACHFileFormatType_id: function(val, state) {
            context["field"] = "ACHFileFormatType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["ACHFileFormatType_id"] : null);
            state['ACHFileFormatType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RequestType: function(val, state) {
            context["field"] = "RequestType";
            context["metadata"] = (objectMetadata ? objectMetadata["RequestType"] : null);
            state['RequestType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        MFAAttributes: function(val, state) {
            context["field"] = "MFAAttributes";
            context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
            state['MFAAttributes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceName: function(val, state) {
            context["field"] = "serviceName";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
            state['serviceName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        state: function(val, state) {
            context["field"] = "state";
            context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
            state['state'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        mfaType: function(val, state) {
            context["field"] = "mfaType";
            context["metadata"] = (objectMetadata ? objectMetadata["mfaType"] : null);
            state['mfaType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        filterByParam: function(val, state) {
            context["field"] = "filterByParam";
            context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
            state['filterByParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortOrder: function(val, state) {
            context["field"] = "sortOrder";
            context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
            state['sortOrder'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortByParam: function(val, state) {
            context["field"] = "sortByParam";
            context["metadata"] = (objectMetadata ? objectMetadata["sortByParam"] : null);
            state['sortByParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        FeatureActionId: function(val, state) {
            context["field"] = "FeatureActionId";
            context["metadata"] = (objectMetadata ? objectMetadata["FeatureActionId"] : null);
            state['FeatureActionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchString: function(val, state) {
            context["field"] = "searchString";
            context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
            state['searchString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        queryType: function(val, state) {
            context["field"] = "queryType";
            context["metadata"] = (objectMetadata ? objectMetadata["queryType"] : null);
            state['queryType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    };

    //Create the Model Class
    function ACHFile(defaultValues) {
        var privateState = {};
        context["field"] = "FileName";
        context["metadata"] = (objectMetadata ? objectMetadata["FileName"] : null);
        privateState.FileName = defaultValues ?
            (defaultValues["FileName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FileName"], context) :
                null) :
            null;

        context["field"] = "ACHFileID";
        context["metadata"] = (objectMetadata ? objectMetadata["ACHFileID"] : null);
        privateState.ACHFileID = defaultValues ?
            (defaultValues["ACHFileID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ACHFileID"], context) :
                null) :
            null;

        context["field"] = "CompanyName";
        context["metadata"] = (objectMetadata ? objectMetadata["CompanyName"] : null);
        privateState.CompanyName = defaultValues ?
            (defaultValues["CompanyName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CompanyName"], context) :
                null) :
            null;

        context["field"] = "UploadedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["UploadedBy"] : null);
        privateState.UploadedBy = defaultValues ?
            (defaultValues["UploadedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UploadedBy"], context) :
                null) :
            null;

        context["field"] = "UpdatedDateAndTime";
        context["metadata"] = (objectMetadata ? objectMetadata["UpdatedDateAndTime"] : null);
        privateState.UpdatedDateAndTime = defaultValues ?
            (defaultValues["UpdatedDateAndTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UpdatedDateAndTime"], context) :
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

        context["field"] = "UploadedByID";
        context["metadata"] = (objectMetadata ? objectMetadata["UploadedByID"] : null);
        privateState.UploadedByID = defaultValues ?
            (defaultValues["UploadedByID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UploadedByID"], context) :
                null) :
            null;

        context["field"] = "NumberOfCredits";
        context["metadata"] = (objectMetadata ? objectMetadata["NumberOfCredits"] : null);
        privateState.NumberOfCredits = defaultValues ?
            (defaultValues["NumberOfCredits"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NumberOfCredits"], context) :
                null) :
            null;

        context["field"] = "softDelete";
        context["metadata"] = (objectMetadata ? objectMetadata["softDelete"] : null);
        privateState.softDelete = defaultValues ?
            (defaultValues["softDelete"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softDelete"], context) :
                null) :
            null;

        context["field"] = "CompanyID";
        context["metadata"] = (objectMetadata ? objectMetadata["CompanyID"] : null);
        privateState.CompanyID = defaultValues ?
            (defaultValues["CompanyID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CompanyID"], context) :
                null) :
            null;

        context["field"] = "FormatTypeID";
        context["metadata"] = (objectMetadata ? objectMetadata["FormatTypeID"] : null);
        privateState.FormatTypeID = defaultValues ?
            (defaultValues["FormatTypeID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FormatTypeID"], context) :
                null) :
            null;

        context["field"] = "FileStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["FileStatus"] : null);
        privateState.FileStatus = defaultValues ?
            (defaultValues["FileStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FileStatus"], context) :
                null) :
            null;

        context["field"] = "FileSize";
        context["metadata"] = (objectMetadata ? objectMetadata["FileSize"] : null);
        privateState.FileSize = defaultValues ?
            (defaultValues["FileSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FileSize"], context) :
                null) :
            null;

        context["field"] = "FileStatusID";
        context["metadata"] = (objectMetadata ? objectMetadata["FileStatusID"] : null);
        privateState.FileStatusID = defaultValues ?
            (defaultValues["FileStatusID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FileStatusID"], context) :
                null) :
            null;

        context["field"] = "TransactionTypeID";
        context["metadata"] = (objectMetadata ? objectMetadata["TransactionTypeID"] : null);
        privateState.TransactionTypeID = defaultValues ?
            (defaultValues["TransactionTypeID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransactionTypeID"], context) :
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

        context["field"] = "FileFormatType";
        context["metadata"] = (objectMetadata ? objectMetadata["FileFormatType"] : null);
        privateState.FileFormatType = defaultValues ?
            (defaultValues["FileFormatType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FileFormatType"], context) :
                null) :
            null;

        context["field"] = "NumberOfRecords";
        context["metadata"] = (objectMetadata ? objectMetadata["NumberOfRecords"] : null);
        privateState.NumberOfRecords = defaultValues ?
            (defaultValues["NumberOfRecords"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NumberOfRecords"], context) :
                null) :
            null;

        context["field"] = "Request_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Request_id"] : null);
        privateState.Request_id = defaultValues ?
            (defaultValues["Request_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Request_id"], context) :
                null) :
            null;

        context["field"] = "Approver";
        context["metadata"] = (objectMetadata ? objectMetadata["Approver"] : null);
        privateState.Approver = defaultValues ?
            (defaultValues["Approver"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Approver"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "EffectiveDate";
        context["metadata"] = (objectMetadata ? objectMetadata["EffectiveDate"] : null);
        privateState.EffectiveDate = defaultValues ?
            (defaultValues["EffectiveDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EffectiveDate"], context) :
                null) :
            null;

        context["field"] = "Status";
        context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
        privateState.Status = defaultValues ?
            (defaultValues["Status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status"], context) :
                null) :
            null;

        context["field"] = "ReferenceID";
        context["metadata"] = (objectMetadata ? objectMetadata["ReferenceID"] : null);
        privateState.ReferenceID = defaultValues ?
            (defaultValues["ReferenceID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ReferenceID"], context) :
                null) :
            null;

        context["field"] = "ACHFileName";
        context["metadata"] = (objectMetadata ? objectMetadata["ACHFileName"] : null);
        privateState.ACHFileName = defaultValues ?
            (defaultValues["ACHFileName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ACHFileName"], context) :
                null) :
            null;

        context["field"] = "DebitAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["DebitAmount"] : null);
        privateState.DebitAmount = defaultValues ?
            (defaultValues["DebitAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["DebitAmount"], context) :
                null) :
            null;

        context["field"] = "CreditAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["CreditAmount"] : null);
        privateState.CreditAmount = defaultValues ?
            (defaultValues["CreditAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CreditAmount"], context) :
                null) :
            null;

        context["field"] = "Contents";
        context["metadata"] = (objectMetadata ? objectMetadata["Contents"] : null);
        privateState.Contents = defaultValues ?
            (defaultValues["Contents"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Contents"], context) :
                null) :
            null;

        context["field"] = "ACHFileFormatType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["ACHFileFormatType_id"] : null);
        privateState.ACHFileFormatType_id = defaultValues ?
            (defaultValues["ACHFileFormatType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ACHFileFormatType_id"], context) :
                null) :
            null;

        context["field"] = "RequestType";
        context["metadata"] = (objectMetadata ? objectMetadata["RequestType"] : null);
        privateState.RequestType = defaultValues ?
            (defaultValues["RequestType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RequestType"], context) :
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

        context["field"] = "MFAAttributes";
        context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
        privateState.MFAAttributes = defaultValues ?
            (defaultValues["MFAAttributes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MFAAttributes"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "serviceName";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
        privateState.serviceName = defaultValues ?
            (defaultValues["serviceName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceName"], context) :
                null) :
            null;

        context["field"] = "state";
        context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
        privateState.state = defaultValues ?
            (defaultValues["state"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["state"], context) :
                null) :
            null;

        context["field"] = "mfaType";
        context["metadata"] = (objectMetadata ? objectMetadata["mfaType"] : null);
        privateState.mfaType = defaultValues ?
            (defaultValues["mfaType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["mfaType"], context) :
                null) :
            null;

        context["field"] = "filterByParam";
        context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
        privateState.filterByParam = defaultValues ?
            (defaultValues["filterByParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["filterByParam"], context) :
                null) :
            null;

        context["field"] = "sortOrder";
        context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
        privateState.sortOrder = defaultValues ?
            (defaultValues["sortOrder"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortOrder"], context) :
                null) :
            null;

        context["field"] = "sortByParam";
        context["metadata"] = (objectMetadata ? objectMetadata["sortByParam"] : null);
        privateState.sortByParam = defaultValues ?
            (defaultValues["sortByParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortByParam"], context) :
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

        context["field"] = "FeatureActionId";
        context["metadata"] = (objectMetadata ? objectMetadata["FeatureActionId"] : null);
        privateState.FeatureActionId = defaultValues ?
            (defaultValues["FeatureActionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FeatureActionId"], context) :
                null) :
            null;

        context["field"] = "searchString";
        context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
        privateState.searchString = defaultValues ?
            (defaultValues["searchString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchString"], context) :
                null) :
            null;

        context["field"] = "queryType";
        context["metadata"] = (objectMetadata ? objectMetadata["queryType"] : null);
        privateState.queryType = defaultValues ?
            (defaultValues["queryType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["queryType"], context) :
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


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "ACHFileID": {
                get: function() {
                    context["field"] = "ACHFileID";
                    context["metadata"] = (objectMetadata ? objectMetadata["ACHFileID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ACHFileID, context);
                },
                set: function(val) {
                    setterFunctions['ACHFileID'].call(this, val, privateState);
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
            "UploadedBy": {
                get: function() {
                    context["field"] = "UploadedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["UploadedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UploadedBy, context);
                },
                set: function(val) {
                    setterFunctions['UploadedBy'].call(this, val, privateState);
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
            "UploadedByID": {
                get: function() {
                    context["field"] = "UploadedByID";
                    context["metadata"] = (objectMetadata ? objectMetadata["UploadedByID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UploadedByID, context);
                },
                set: function(val) {
                    setterFunctions['UploadedByID'].call(this, val, privateState);
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
            "CompanyID": {
                get: function() {
                    context["field"] = "CompanyID";
                    context["metadata"] = (objectMetadata ? objectMetadata["CompanyID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CompanyID, context);
                },
                set: function(val) {
                    setterFunctions['CompanyID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "FormatTypeID": {
                get: function() {
                    context["field"] = "FormatTypeID";
                    context["metadata"] = (objectMetadata ? objectMetadata["FormatTypeID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FormatTypeID, context);
                },
                set: function(val) {
                    setterFunctions['FormatTypeID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "FileStatus": {
                get: function() {
                    context["field"] = "FileStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["FileStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FileStatus, context);
                },
                set: function(val) {
                    setterFunctions['FileStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "FileSize": {
                get: function() {
                    context["field"] = "FileSize";
                    context["metadata"] = (objectMetadata ? objectMetadata["FileSize"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FileSize, context);
                },
                set: function(val) {
                    setterFunctions['FileSize'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "FileStatusID": {
                get: function() {
                    context["field"] = "FileStatusID";
                    context["metadata"] = (objectMetadata ? objectMetadata["FileStatusID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FileStatusID, context);
                },
                set: function(val) {
                    setterFunctions['FileStatusID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TransactionTypeID": {
                get: function() {
                    context["field"] = "TransactionTypeID";
                    context["metadata"] = (objectMetadata ? objectMetadata["TransactionTypeID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TransactionTypeID, context);
                },
                set: function(val) {
                    setterFunctions['TransactionTypeID'].call(this, val, privateState);
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
            "FileFormatType": {
                get: function() {
                    context["field"] = "FileFormatType";
                    context["metadata"] = (objectMetadata ? objectMetadata["FileFormatType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FileFormatType, context);
                },
                set: function(val) {
                    setterFunctions['FileFormatType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "NumberOfRecords": {
                get: function() {
                    context["field"] = "NumberOfRecords";
                    context["metadata"] = (objectMetadata ? objectMetadata["NumberOfRecords"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.NumberOfRecords, context);
                },
                set: function(val) {
                    setterFunctions['NumberOfRecords'].call(this, val, privateState);
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
            "ACHFileName": {
                get: function() {
                    context["field"] = "ACHFileName";
                    context["metadata"] = (objectMetadata ? objectMetadata["ACHFileName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ACHFileName, context);
                },
                set: function(val) {
                    setterFunctions['ACHFileName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "DebitAmount": {
                get: function() {
                    context["field"] = "DebitAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["DebitAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.DebitAmount, context);
                },
                set: function(val) {
                    setterFunctions['DebitAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CreditAmount": {
                get: function() {
                    context["field"] = "CreditAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["CreditAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CreditAmount, context);
                },
                set: function(val) {
                    setterFunctions['CreditAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Contents": {
                get: function() {
                    context["field"] = "Contents";
                    context["metadata"] = (objectMetadata ? objectMetadata["Contents"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Contents, context);
                },
                set: function(val) {
                    setterFunctions['Contents'].call(this, val, privateState);
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
            "MFAAttributes": {
                get: function() {
                    context["field"] = "MFAAttributes";
                    context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MFAAttributes, context);
                },
                set: function(val) {
                    setterFunctions['MFAAttributes'].call(this, val, privateState);
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
            "serviceName": {
                get: function() {
                    context["field"] = "serviceName";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceName, context);
                },
                set: function(val) {
                    setterFunctions['serviceName'].call(this, val, privateState);
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
            "mfaType": {
                get: function() {
                    context["field"] = "mfaType";
                    context["metadata"] = (objectMetadata ? objectMetadata["mfaType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.mfaType, context);
                },
                set: function(val) {
                    setterFunctions['mfaType'].call(this, val, privateState);
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
            "FeatureActionId": {
                get: function() {
                    context["field"] = "FeatureActionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["FeatureActionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FeatureActionId, context);
                },
                set: function(val) {
                    setterFunctions['FeatureActionId'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.FileName = value ? (value["FileName"] ? value["FileName"] : null) : null;
            privateState.ACHFileID = value ? (value["ACHFileID"] ? value["ACHFileID"] : null) : null;
            privateState.CompanyName = value ? (value["CompanyName"] ? value["CompanyName"] : null) : null;
            privateState.UploadedBy = value ? (value["UploadedBy"] ? value["UploadedBy"] : null) : null;
            privateState.UpdatedDateAndTime = value ? (value["UpdatedDateAndTime"] ? value["UpdatedDateAndTime"] : null) : null;
            privateState.NumberOfDebits = value ? (value["NumberOfDebits"] ? value["NumberOfDebits"] : null) : null;
            privateState.NumberOfPrenotes = value ? (value["NumberOfPrenotes"] ? value["NumberOfPrenotes"] : null) : null;
            privateState.UploadedByID = value ? (value["UploadedByID"] ? value["UploadedByID"] : null) : null;
            privateState.NumberOfCredits = value ? (value["NumberOfCredits"] ? value["NumberOfCredits"] : null) : null;
            privateState.softDelete = value ? (value["softDelete"] ? value["softDelete"] : null) : null;
            privateState.CompanyID = value ? (value["CompanyID"] ? value["CompanyID"] : null) : null;
            privateState.FormatTypeID = value ? (value["FormatTypeID"] ? value["FormatTypeID"] : null) : null;
            privateState.FileStatus = value ? (value["FileStatus"] ? value["FileStatus"] : null) : null;
            privateState.FileSize = value ? (value["FileSize"] ? value["FileSize"] : null) : null;
            privateState.FileStatusID = value ? (value["FileStatusID"] ? value["FileStatusID"] : null) : null;
            privateState.TransactionTypeID = value ? (value["TransactionTypeID"] ? value["TransactionTypeID"] : null) : null;
            privateState.TotalCreditAmount = value ? (value["TotalCreditAmount"] ? value["TotalCreditAmount"] : null) : null;
            privateState.TotalDebitAmount = value ? (value["TotalDebitAmount"] ? value["TotalDebitAmount"] : null) : null;
            privateState.FileRequestType = value ? (value["FileRequestType"] ? value["FileRequestType"] : null) : null;
            privateState.FileFormatType = value ? (value["FileFormatType"] ? value["FileFormatType"] : null) : null;
            privateState.NumberOfRecords = value ? (value["NumberOfRecords"] ? value["NumberOfRecords"] : null) : null;
            privateState.Request_id = value ? (value["Request_id"] ? value["Request_id"] : null) : null;
            privateState.Approver = value ? (value["Approver"] ? value["Approver"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.EffectiveDate = value ? (value["EffectiveDate"] ? value["EffectiveDate"] : null) : null;
            privateState.Status = value ? (value["Status"] ? value["Status"] : null) : null;
            privateState.ReferenceID = value ? (value["ReferenceID"] ? value["ReferenceID"] : null) : null;
            privateState.ACHFileName = value ? (value["ACHFileName"] ? value["ACHFileName"] : null) : null;
            privateState.DebitAmount = value ? (value["DebitAmount"] ? value["DebitAmount"] : null) : null;
            privateState.CreditAmount = value ? (value["CreditAmount"] ? value["CreditAmount"] : null) : null;
            privateState.Contents = value ? (value["Contents"] ? value["Contents"] : null) : null;
            privateState.ACHFileFormatType_id = value ? (value["ACHFileFormatType_id"] ? value["ACHFileFormatType_id"] : null) : null;
            privateState.RequestType = value ? (value["RequestType"] ? value["RequestType"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.receivedApprovals = value ? (value["receivedApprovals"] ? value["receivedApprovals"] : null) : null;
            privateState.requiredApprovals = value ? (value["requiredApprovals"] ? value["requiredApprovals"] : null) : null;
            privateState.MFAAttributes = value ? (value["MFAAttributes"] ? value["MFAAttributes"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.serviceName = value ? (value["serviceName"] ? value["serviceName"] : null) : null;
            privateState.state = value ? (value["state"] ? value["state"] : null) : null;
            privateState.mfaType = value ? (value["mfaType"] ? value["mfaType"] : null) : null;
            privateState.filterByParam = value ? (value["filterByParam"] ? value["filterByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.FeatureActionId = value ? (value["FeatureActionId"] ? value["FeatureActionId"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.queryType = value ? (value["queryType"] ? value["queryType"] : null) : null;
            privateState.approvalAccounts = value ? (value["approvalAccounts"] ? value["approvalAccounts"] : null) : null;
            privateState.debitAccounts = value ? (value["debitAccounts"] ? value["debitAccounts"] : null) : null;
            privateState.filterByValue = value ? (value["filterByValue"] ? value["filterByValue"] : null) : null;
            privateState.amICreator = value ? (value["amICreator"] ? value["amICreator"] : null) : null;
            privateState.amIApprover = value ? (value["amIApprover"] ? value["amIApprover"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ACHFile);

    //Create new class level validator object
    BaseModel.Validator.call(ACHFile);

    var registerValidatorBackup = ACHFile.registerValidator;

    ACHFile.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ACHFile.isValid(this, propName, val)) {
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
    //For Operation 'getAllACHFiles' with service id 'FetchAllACHFiles6461'
     ACHFile.getAllACHFiles = function(params, onCompletion){
        return ACHFile.customVerb('getAllACHFiles', params, onCompletion);
     };

    //For Operation 'UploadACHFile' with service id 'UploadACHFile4710'
     ACHFile.UploadACHFile = function(params, onCompletion){
        return ACHFile.customVerb('UploadACHFile', params, onCompletion);
     };

    //For Operation 'getFileDetailsByID' with service id 'FetchACHFileById1690'
     ACHFile.getFileDetailsByID = function(params, onCompletion){
        return ACHFile.customVerb('getFileDetailsByID', params, onCompletion);
     };

    var relations = [];

    ACHFile.relations = relations;

    ACHFile.prototype.isValid = function() {
        return ACHFile.isValid(this);
    };

    ACHFile.prototype.objModelName = "ACHFile";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ACHFile.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ACH", "ACHFile", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ACHFile.clone = function(objectToClone) {
        var clonedObj = new ACHFile();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ACHFile;
});