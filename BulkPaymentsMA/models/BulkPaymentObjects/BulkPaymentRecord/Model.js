/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "BulkPaymentRecord", "objectService" : "BulkPaymentObjects"};

    var setterFunctions = {
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
        recordId: function(val, state) {
            context["field"] = "recordId";
            context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
            state['recordId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentId: function(val, state) {
            context["field"] = "paymentId";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentId"] : null);
            state['paymentId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDate: function(val, state) {
            context["field"] = "paymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
            state['paymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        scheduledDate: function(val, state) {
            context["field"] = "scheduledDate";
            context["metadata"] = (objectMetadata ? objectMetadata["scheduledDate"] : null);
            state['scheduledDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromAccount: function(val, state) {
            context["field"] = "fromAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccount"] : null);
            state['fromAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalAmount: function(val, state) {
            context["field"] = "totalAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
            state['totalAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        initiatedBy: function(val, state) {
            context["field"] = "initiatedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["initiatedBy"] : null);
            state['initiatedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalTransactions: function(val, state) {
            context["field"] = "totalTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["totalTransactions"] : null);
            state['totalTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyId: function(val, state) {
            context["field"] = "companyId";
            context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
            state['companyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestId: function(val, state) {
            context["field"] = "requestId";
            context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
            state['requestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amIAprover: function(val, state) {
            context["field"] = "amIAprover";
            context["metadata"] = (objectMetadata ? objectMetadata["amIAprover"] : null);
            state['amIAprover'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amICreator: function(val, state) {
            context["field"] = "amICreator";
            context["metadata"] = (objectMetadata ? objectMetadata["amICreator"] : null);
            state['amICreator'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recievedApprovals: function(val, state) {
            context["field"] = "recievedApprovals";
            context["metadata"] = (objectMetadata ? objectMetadata["recievedApprovals"] : null);
            state['recievedApprovals'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requiredApprovals: function(val, state) {
            context["field"] = "requiredApprovals";
            context["metadata"] = (objectMetadata ? objectMetadata["requiredApprovals"] : null);
            state['requiredApprovals'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        approvers: function(val, state) {
            context["field"] = "approvers";
            context["metadata"] = (objectMetadata ? objectMetadata["approvers"] : null);
            state['approvers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        comments: function(val, state) {
            context["field"] = "comments";
            context["metadata"] = (objectMetadata ? objectMetadata["comments"] : null);
            state['comments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureActionId: function(val, state) {
            context["field"] = "featureActionId";
            context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
            state['featureActionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actedBy: function(val, state) {
            context["field"] = "actedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["actedBy"] : null);
            state['actedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        batchMode: function(val, state) {
            context["field"] = "batchMode";
            context["metadata"] = (objectMetadata ? objectMetadata["batchMode"] : null);
            state['batchMode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reason: function(val, state) {
            context["field"] = "reason";
            context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
            state['reason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cancellationreason: function(val, state) {
            context["field"] = "cancellationreason";
            context["metadata"] = (objectMetadata ? objectMetadata["cancellationreason"] : null);
            state['cancellationreason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rejectioncomments: function(val, state) {
            context["field"] = "rejectioncomments";
            context["metadata"] = (objectMetadata ? objectMetadata["rejectioncomments"] : null);
            state['rejectioncomments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rejectionreason: function(val, state) {
            context["field"] = "rejectionreason";
            context["metadata"] = (objectMetadata ? objectMetadata["rejectionreason"] : null);
            state['rejectionreason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentOrderProduct: function(val, state) {
            context["field"] = "paymentOrderProduct";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderProduct"] : null);
            state['paymentOrderProduct'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cancellationReasonId: function(val, state) {
            context["field"] = "cancellationReasonId";
            context["metadata"] = (objectMetadata ? objectMetadata["cancellationReasonId"] : null);
            state['cancellationReasonId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        errorDescription: function(val, state) {
            context["field"] = "errorDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["errorDescription"] : null);
            state['errorDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function BulkPaymentRecord(defaultValues) {
        var privateState = {};
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

        context["field"] = "recordId";
        context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
        privateState.recordId = defaultValues ?
            (defaultValues["recordId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recordId"], context) :
                null) :
            null;

        context["field"] = "paymentId";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentId"] : null);
        privateState.paymentId = defaultValues ?
            (defaultValues["paymentId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentId"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "paymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
        privateState.paymentDate = defaultValues ?
            (defaultValues["paymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDate"], context) :
                null) :
            null;

        context["field"] = "scheduledDate";
        context["metadata"] = (objectMetadata ? objectMetadata["scheduledDate"] : null);
        privateState.scheduledDate = defaultValues ?
            (defaultValues["scheduledDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["scheduledDate"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "fromAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccount"] : null);
        privateState.fromAccount = defaultValues ?
            (defaultValues["fromAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccount"], context) :
                null) :
            null;

        context["field"] = "totalAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
        privateState.totalAmount = defaultValues ?
            (defaultValues["totalAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalAmount"], context) :
                null) :
            null;

        context["field"] = "initiatedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["initiatedBy"] : null);
        privateState.initiatedBy = defaultValues ?
            (defaultValues["initiatedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["initiatedBy"], context) :
                null) :
            null;

        context["field"] = "totalTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["totalTransactions"] : null);
        privateState.totalTransactions = defaultValues ?
            (defaultValues["totalTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalTransactions"], context) :
                null) :
            null;

        context["field"] = "companyId";
        context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
        privateState.companyId = defaultValues ?
            (defaultValues["companyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyId"], context) :
                null) :
            null;

        context["field"] = "requestId";
        context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
        privateState.requestId = defaultValues ?
            (defaultValues["requestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestId"], context) :
                null) :
            null;

        context["field"] = "amIAprover";
        context["metadata"] = (objectMetadata ? objectMetadata["amIAprover"] : null);
        privateState.amIAprover = defaultValues ?
            (defaultValues["amIAprover"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amIAprover"], context) :
                null) :
            null;

        context["field"] = "amICreator";
        context["metadata"] = (objectMetadata ? objectMetadata["amICreator"] : null);
        privateState.amICreator = defaultValues ?
            (defaultValues["amICreator"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amICreator"], context) :
                null) :
            null;

        context["field"] = "recievedApprovals";
        context["metadata"] = (objectMetadata ? objectMetadata["recievedApprovals"] : null);
        privateState.recievedApprovals = defaultValues ?
            (defaultValues["recievedApprovals"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recievedApprovals"], context) :
                null) :
            null;

        context["field"] = "requiredApprovals";
        context["metadata"] = (objectMetadata ? objectMetadata["requiredApprovals"] : null);
        privateState.requiredApprovals = defaultValues ?
            (defaultValues["requiredApprovals"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requiredApprovals"], context) :
                null) :
            null;

        context["field"] = "approvers";
        context["metadata"] = (objectMetadata ? objectMetadata["approvers"] : null);
        privateState.approvers = defaultValues ?
            (defaultValues["approvers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["approvers"], context) :
                null) :
            null;

        context["field"] = "comments";
        context["metadata"] = (objectMetadata ? objectMetadata["comments"] : null);
        privateState.comments = defaultValues ?
            (defaultValues["comments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["comments"], context) :
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

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "featureActionId";
        context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
        privateState.featureActionId = defaultValues ?
            (defaultValues["featureActionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureActionId"], context) :
                null) :
            null;

        context["field"] = "actedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["actedBy"] : null);
        privateState.actedBy = defaultValues ?
            (defaultValues["actedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actedBy"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "batchMode";
        context["metadata"] = (objectMetadata ? objectMetadata["batchMode"] : null);
        privateState.batchMode = defaultValues ?
            (defaultValues["batchMode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["batchMode"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "reason";
        context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
        privateState.reason = defaultValues ?
            (defaultValues["reason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reason"], context) :
                null) :
            null;

        context["field"] = "cancellationreason";
        context["metadata"] = (objectMetadata ? objectMetadata["cancellationreason"] : null);
        privateState.cancellationreason = defaultValues ?
            (defaultValues["cancellationreason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cancellationreason"], context) :
                null) :
            null;

        context["field"] = "rejectioncomments";
        context["metadata"] = (objectMetadata ? objectMetadata["rejectioncomments"] : null);
        privateState.rejectioncomments = defaultValues ?
            (defaultValues["rejectioncomments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rejectioncomments"], context) :
                null) :
            null;

        context["field"] = "rejectionreason";
        context["metadata"] = (objectMetadata ? objectMetadata["rejectionreason"] : null);
        privateState.rejectionreason = defaultValues ?
            (defaultValues["rejectionreason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rejectionreason"], context) :
                null) :
            null;

        context["field"] = "paymentOrderProduct";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderProduct"] : null);
        privateState.paymentOrderProduct = defaultValues ?
            (defaultValues["paymentOrderProduct"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentOrderProduct"], context) :
                null) :
            null;

        context["field"] = "cancellationReasonId";
        context["metadata"] = (objectMetadata ? objectMetadata["cancellationReasonId"] : null);
        privateState.cancellationReasonId = defaultValues ?
            (defaultValues["cancellationReasonId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cancellationReasonId"], context) :
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

        context["field"] = "errorDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["errorDescription"] : null);
        privateState.errorDescription = defaultValues ?
            (defaultValues["errorDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorDescription"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "recordId": {
                get: function() {
                    context["field"] = "recordId";
                    context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recordId, context);
                },
                set: function(val) {
                    setterFunctions['recordId'].call(this, val, privateState);
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
            "scheduledDate": {
                get: function() {
                    context["field"] = "scheduledDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["scheduledDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.scheduledDate, context);
                },
                set: function(val) {
                    setterFunctions['scheduledDate'].call(this, val, privateState);
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
            "fromAccount": {
                get: function() {
                    context["field"] = "fromAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccount, context);
                },
                set: function(val) {
                    setterFunctions['fromAccount'].call(this, val, privateState);
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
            "initiatedBy": {
                get: function() {
                    context["field"] = "initiatedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["initiatedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.initiatedBy, context);
                },
                set: function(val) {
                    setterFunctions['initiatedBy'].call(this, val, privateState);
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
            "amIAprover": {
                get: function() {
                    context["field"] = "amIAprover";
                    context["metadata"] = (objectMetadata ? objectMetadata["amIAprover"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amIAprover, context);
                },
                set: function(val) {
                    setterFunctions['amIAprover'].call(this, val, privateState);
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
            "recievedApprovals": {
                get: function() {
                    context["field"] = "recievedApprovals";
                    context["metadata"] = (objectMetadata ? objectMetadata["recievedApprovals"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recievedApprovals, context);
                },
                set: function(val) {
                    setterFunctions['recievedApprovals'].call(this, val, privateState);
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
            "approvers": {
                get: function() {
                    context["field"] = "approvers";
                    context["metadata"] = (objectMetadata ? objectMetadata["approvers"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.approvers, context);
                },
                set: function(val) {
                    setterFunctions['approvers'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "comments": {
                get: function() {
                    context["field"] = "comments";
                    context["metadata"] = (objectMetadata ? objectMetadata["comments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.comments, context);
                },
                set: function(val) {
                    setterFunctions['comments'].call(this, val, privateState);
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
            "actedBy": {
                get: function() {
                    context["field"] = "actedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["actedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actedBy, context);
                },
                set: function(val) {
                    setterFunctions['actedBy'].call(this, val, privateState);
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
            "batchMode": {
                get: function() {
                    context["field"] = "batchMode";
                    context["metadata"] = (objectMetadata ? objectMetadata["batchMode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.batchMode, context);
                },
                set: function(val) {
                    setterFunctions['batchMode'].call(this, val, privateState);
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
            "reason": {
                get: function() {
                    context["field"] = "reason";
                    context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reason, context);
                },
                set: function(val) {
                    setterFunctions['reason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cancellationreason": {
                get: function() {
                    context["field"] = "cancellationreason";
                    context["metadata"] = (objectMetadata ? objectMetadata["cancellationreason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cancellationreason, context);
                },
                set: function(val) {
                    setterFunctions['cancellationreason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rejectioncomments": {
                get: function() {
                    context["field"] = "rejectioncomments";
                    context["metadata"] = (objectMetadata ? objectMetadata["rejectioncomments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rejectioncomments, context);
                },
                set: function(val) {
                    setterFunctions['rejectioncomments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rejectionreason": {
                get: function() {
                    context["field"] = "rejectionreason";
                    context["metadata"] = (objectMetadata ? objectMetadata["rejectionreason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rejectionreason, context);
                },
                set: function(val) {
                    setterFunctions['rejectionreason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentOrderProduct": {
                get: function() {
                    context["field"] = "paymentOrderProduct";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentOrderProduct"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentOrderProduct, context);
                },
                set: function(val) {
                    setterFunctions['paymentOrderProduct'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cancellationReasonId": {
                get: function() {
                    context["field"] = "cancellationReasonId";
                    context["metadata"] = (objectMetadata ? objectMetadata["cancellationReasonId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cancellationReasonId, context);
                },
                set: function(val) {
                    setterFunctions['cancellationReasonId'].call(this, val, privateState);
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
            "errorDescription": {
                get: function() {
                    context["field"] = "errorDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorDescription, context);
                },
                set: function(val) {
                    setterFunctions['errorDescription'].call(this, val, privateState);
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
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.filterByParam = value ? (value["filterByParam"] ? value["filterByParam"] : null) : null;
            privateState.filterByValue = value ? (value["filterByValue"] ? value["filterByValue"] : null) : null;
            privateState.recordId = value ? (value["recordId"] ? value["recordId"] : null) : null;
            privateState.paymentId = value ? (value["paymentId"] ? value["paymentId"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.paymentDate = value ? (value["paymentDate"] ? value["paymentDate"] : null) : null;
            privateState.scheduledDate = value ? (value["scheduledDate"] ? value["scheduledDate"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.fromAccount = value ? (value["fromAccount"] ? value["fromAccount"] : null) : null;
            privateState.totalAmount = value ? (value["totalAmount"] ? value["totalAmount"] : null) : null;
            privateState.initiatedBy = value ? (value["initiatedBy"] ? value["initiatedBy"] : null) : null;
            privateState.totalTransactions = value ? (value["totalTransactions"] ? value["totalTransactions"] : null) : null;
            privateState.companyId = value ? (value["companyId"] ? value["companyId"] : null) : null;
            privateState.requestId = value ? (value["requestId"] ? value["requestId"] : null) : null;
            privateState.amIAprover = value ? (value["amIAprover"] ? value["amIAprover"] : null) : null;
            privateState.amICreator = value ? (value["amICreator"] ? value["amICreator"] : null) : null;
            privateState.recievedApprovals = value ? (value["recievedApprovals"] ? value["recievedApprovals"] : null) : null;
            privateState.requiredApprovals = value ? (value["requiredApprovals"] ? value["requiredApprovals"] : null) : null;
            privateState.approvers = value ? (value["approvers"] ? value["approvers"] : null) : null;
            privateState.comments = value ? (value["comments"] ? value["comments"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.featureActionId = value ? (value["featureActionId"] ? value["featureActionId"] : null) : null;
            privateState.actedBy = value ? (value["actedBy"] ? value["actedBy"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.batchMode = value ? (value["batchMode"] ? value["batchMode"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.reason = value ? (value["reason"] ? value["reason"] : null) : null;
            privateState.cancellationreason = value ? (value["cancellationreason"] ? value["cancellationreason"] : null) : null;
            privateState.rejectioncomments = value ? (value["rejectioncomments"] ? value["rejectioncomments"] : null) : null;
            privateState.rejectionreason = value ? (value["rejectionreason"] ? value["rejectionreason"] : null) : null;
            privateState.paymentOrderProduct = value ? (value["paymentOrderProduct"] ? value["paymentOrderProduct"] : null) : null;
            privateState.cancellationReasonId = value ? (value["cancellationReasonId"] ? value["cancellationReasonId"] : null) : null;
            privateState.timeParam = value ? (value["timeParam"] ? value["timeParam"] : null) : null;
            privateState.timeValue = value ? (value["timeValue"] ? value["timeValue"] : null) : null;
            privateState.errorDescription = value ? (value["errorDescription"] ? value["errorDescription"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(BulkPaymentRecord);

    //Create new class level validator object
    BaseModel.Validator.call(BulkPaymentRecord);

    var registerValidatorBackup = BulkPaymentRecord.registerValidator;

    BulkPaymentRecord.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(BulkPaymentRecord.isValid(this, propName, val)) {
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
    //For Operation 'fetchOnGoingPayments' with service id 'fetchOnGoingPayments4456'
     BulkPaymentRecord.fetchOnGoingPayments = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('fetchOnGoingPayments', params, onCompletion);
     };

    //For Operation 'updateBulkPaymentRecord' with service id 'updateBulkPaymentRecord9284'
     BulkPaymentRecord.updateBulkPaymentRecord = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('updateBulkPaymentRecord', params, onCompletion);
     };

    //For Operation 'fetchHistory' with service id 'fetchHistory1432'
     BulkPaymentRecord.fetchHistory = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('fetchHistory', params, onCompletion);
     };

    //For Operation 'fetchCancellationReasons' with service id 'fetchCancellationReasons7653'
     BulkPaymentRecord.fetchCancellationReasons = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('fetchCancellationReasons', params, onCompletion);
     };

    //For Operation 'fetchRecordHistoryReviewedByMe' with service id 'fetchRequestHistory7586'
     BulkPaymentRecord.fetchRecordHistoryReviewedByMe = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('fetchRecordHistoryReviewedByMe', params, onCompletion);
     };

    //For Operation 'cancelBulkPaymentRecord' with service id 'cancelBulkPaymentRecord3272'
     BulkPaymentRecord.cancelBulkPaymentRecord = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('cancelBulkPaymentRecord', params, onCompletion);
     };

    //For Operation 'review' with service id 'reviewBulkPaymentRecord9883'
     BulkPaymentRecord.review = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('review', params, onCompletion);
     };

    //For Operation 'fetchRecordHistoryActedByMe' with service id 'fetchApprovalHistory2169'
     BulkPaymentRecord.fetchRecordHistoryActedByMe = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('fetchRecordHistoryActedByMe', params, onCompletion);
     };

    //For Operation 'fetchBulkPaymentRecordDetailsById' with service id 'fetchBulkPaymentRecordById9835'
     BulkPaymentRecord.fetchBulkPaymentRecordDetailsById = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('fetchBulkPaymentRecordDetailsById', params, onCompletion);
     };

    //For Operation 'rejectBulkPaymentRecord' with service id 'rejectBulkPaymentRecord1663'
     BulkPaymentRecord.rejectBulkPaymentRecord = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('rejectBulkPaymentRecord', params, onCompletion);
     };

    //For Operation 'approveBulkPaymentRecord' with service id 'approveBulkPaymentRecord8783'
     BulkPaymentRecord.approveBulkPaymentRecord = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('approveBulkPaymentRecord', params, onCompletion);
     };

    //For Operation 'fetchRecordsWaitingForMyApproval' with service id 'fetchPendingApprovals9027'
     BulkPaymentRecord.fetchRecordsWaitingForMyApproval = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('fetchRecordsWaitingForMyApproval', params, onCompletion);
     };

    //For Operation 'fetchRecordsReviewedByMeAndInApprovalQueue' with service id 'fetchPendingRequests2527'
     BulkPaymentRecord.fetchRecordsReviewedByMeAndInApprovalQueue = function(params, onCompletion){
        return BulkPaymentRecord.customVerb('fetchRecordsReviewedByMeAndInApprovalQueue', params, onCompletion);
     };

    var relations = [];

    BulkPaymentRecord.relations = relations;

    BulkPaymentRecord.prototype.isValid = function() {
        return BulkPaymentRecord.isValid(this);
    };

    BulkPaymentRecord.prototype.objModelName = "BulkPaymentRecord";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    BulkPaymentRecord.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BulkPaymentObjects", "BulkPaymentRecord", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    BulkPaymentRecord.clone = function(objectToClone) {
        var clonedObj = new BulkPaymentRecord();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return BulkPaymentRecord;
});