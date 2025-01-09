/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "BulkPaymentFile", "objectService" : "BulkPaymentObjects"};

    var setterFunctions = {
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        content: function(val, state) {
            context["field"] = "content";
            context["metadata"] = (objectMetadata ? objectMetadata["content"] : null);
            state['content'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileSize: function(val, state) {
            context["field"] = "fileSize";
            context["metadata"] = (objectMetadata ? objectMetadata["fileSize"] : null);
            state['fileSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        confirmationNumber: function(val, state) {
            context["field"] = "confirmationNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
            state['confirmationNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        fileName: function(val, state) {
            context["field"] = "fileName";
            context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
            state['fileName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadedDate: function(val, state) {
            context["field"] = "uploadedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedDate"] : null);
            state['uploadedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        uploadedBy: function(val, state) {
            context["field"] = "uploadedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedBy"] : null);
            state['uploadedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        httpStatusCode: function(val, state) {
            context["field"] = "httpStatusCode";
            context["metadata"] = (objectMetadata ? objectMetadata["httpStatusCode"] : null);
            state['httpStatusCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sysGeneratedFileName: function(val, state) {
            context["field"] = "sysGeneratedFileName";
            context["metadata"] = (objectMetadata ? objectMetadata["sysGeneratedFileName"] : null);
            state['sysGeneratedFileName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        batchMode: function(val, state) {
            context["field"] = "batchMode";
            context["metadata"] = (objectMetadata ? objectMetadata["batchMode"] : null);
            state['batchMode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        requestStatus: function(val, state) {
            context["field"] = "requestStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["requestStatus"] : null);
            state['requestStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function BulkPaymentFile(defaultValues) {
        var privateState = {};
        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "content";
        context["metadata"] = (objectMetadata ? objectMetadata["content"] : null);
        privateState.content = defaultValues ?
            (defaultValues["content"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["content"], context) :
                null) :
            null;

        context["field"] = "fileSize";
        context["metadata"] = (objectMetadata ? objectMetadata["fileSize"] : null);
        privateState.fileSize = defaultValues ?
            (defaultValues["fileSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileSize"], context) :
                null) :
            null;

        context["field"] = "confirmationNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
        privateState.confirmationNumber = defaultValues ?
            (defaultValues["confirmationNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["confirmationNumber"], context) :
                null) :
            null;

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
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

        context["field"] = "fileName";
        context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
        privateState.fileName = defaultValues ?
            (defaultValues["fileName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileName"], context) :
                null) :
            null;

        context["field"] = "uploadedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedDate"] : null);
        privateState.uploadedDate = defaultValues ?
            (defaultValues["uploadedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedDate"], context) :
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

        context["field"] = "uploadedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedBy"] : null);
        privateState.uploadedBy = defaultValues ?
            (defaultValues["uploadedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedBy"], context) :
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

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "httpStatusCode";
        context["metadata"] = (objectMetadata ? objectMetadata["httpStatusCode"] : null);
        privateState.httpStatusCode = defaultValues ?
            (defaultValues["httpStatusCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["httpStatusCode"], context) :
                null) :
            null;

        context["field"] = "sysGeneratedFileName";
        context["metadata"] = (objectMetadata ? objectMetadata["sysGeneratedFileName"] : null);
        privateState.sysGeneratedFileName = defaultValues ?
            (defaultValues["sysGeneratedFileName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sysGeneratedFileName"], context) :
                null) :
            null;

        context["field"] = "batchMode";
        context["metadata"] = (objectMetadata ? objectMetadata["batchMode"] : null);
        privateState.batchMode = defaultValues ?
            (defaultValues["batchMode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["batchMode"], context) :
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

        context["field"] = "requestStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["requestStatus"] : null);
        privateState.requestStatus = defaultValues ?
            (defaultValues["requestStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestStatus"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "content": {
                get: function() {
                    context["field"] = "content";
                    context["metadata"] = (objectMetadata ? objectMetadata["content"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.content, context);
                },
                set: function(val) {
                    setterFunctions['content'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileSize": {
                get: function() {
                    context["field"] = "fileSize";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileSize"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileSize, context);
                },
                set: function(val) {
                    setterFunctions['fileSize'].call(this, val, privateState);
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
            "fileName": {
                get: function() {
                    context["field"] = "fileName";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileName, context);
                },
                set: function(val) {
                    setterFunctions['fileName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "uploadedDate": {
                get: function() {
                    context["field"] = "uploadedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadedDate, context);
                },
                set: function(val) {
                    setterFunctions['uploadedDate'].call(this, val, privateState);
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
            "uploadedBy": {
                get: function() {
                    context["field"] = "uploadedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadedBy, context);
                },
                set: function(val) {
                    setterFunctions['uploadedBy'].call(this, val, privateState);
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
            "sysGeneratedFileName": {
                get: function() {
                    context["field"] = "sysGeneratedFileName";
                    context["metadata"] = (objectMetadata ? objectMetadata["sysGeneratedFileName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sysGeneratedFileName, context);
                },
                set: function(val) {
                    setterFunctions['sysGeneratedFileName'].call(this, val, privateState);
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
            "requestStatus": {
                get: function() {
                    context["field"] = "requestStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestStatus, context);
                },
                set: function(val) {
                    setterFunctions['requestStatus'].call(this, val, privateState);
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
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.content = value ? (value["content"] ? value["content"] : null) : null;
            privateState.fileSize = value ? (value["fileSize"] ? value["fileSize"] : null) : null;
            privateState.confirmationNumber = value ? (value["confirmationNumber"] ? value["confirmationNumber"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.filterByParam = value ? (value["filterByParam"] ? value["filterByParam"] : null) : null;
            privateState.filterByValue = value ? (value["filterByValue"] ? value["filterByValue"] : null) : null;
            privateState.fileName = value ? (value["fileName"] ? value["fileName"] : null) : null;
            privateState.uploadedDate = value ? (value["uploadedDate"] ? value["uploadedDate"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.fromAccount = value ? (value["fromAccount"] ? value["fromAccount"] : null) : null;
            privateState.totalAmount = value ? (value["totalAmount"] ? value["totalAmount"] : null) : null;
            privateState.uploadedBy = value ? (value["uploadedBy"] ? value["uploadedBy"] : null) : null;
            privateState.totalTransactions = value ? (value["totalTransactions"] ? value["totalTransactions"] : null) : null;
            privateState.companyId = value ? (value["companyId"] ? value["companyId"] : null) : null;
            privateState.requestId = value ? (value["requestId"] ? value["requestId"] : null) : null;
            privateState.amIAprover = value ? (value["amIAprover"] ? value["amIAprover"] : null) : null;
            privateState.amICreator = value ? (value["amICreator"] ? value["amICreator"] : null) : null;
            privateState.recievedApprovals = value ? (value["recievedApprovals"] ? value["recievedApprovals"] : null) : null;
            privateState.requiredApprovals = value ? (value["requiredApprovals"] ? value["requiredApprovals"] : null) : null;
            privateState.approvers = value ? (value["approvers"] ? value["approvers"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.sysGeneratedFileName = value ? (value["sysGeneratedFileName"] ? value["sysGeneratedFileName"] : null) : null;
            privateState.batchMode = value ? (value["batchMode"] ? value["batchMode"] : null) : null;
            privateState.timeParam = value ? (value["timeParam"] ? value["timeParam"] : null) : null;
            privateState.timeValue = value ? (value["timeValue"] ? value["timeValue"] : null) : null;
            privateState.requestStatus = value ? (value["requestStatus"] ? value["requestStatus"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(BulkPaymentFile);

    //Create new class level validator object
    BaseModel.Validator.call(BulkPaymentFile);

    var registerValidatorBackup = BulkPaymentFile.registerValidator;

    BulkPaymentFile.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(BulkPaymentFile.isValid(this, propName, val)) {
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
    //For Operation 'downloadBulkPaymentFileAck' with service id 'downloadBulkPaymentAck8222'
     BulkPaymentFile.downloadBulkPaymentFileAck = function(params, onCompletion){
        return BulkPaymentFile.customVerb('downloadBulkPaymentFileAck', params, onCompletion);
     };

    //For Operation 'initiateDownloadBulkPaymentAck' with service id 'initiateDownloadBulkPaymentAck4875'
     BulkPaymentFile.initiateDownloadBulkPaymentAck = function(params, onCompletion){
        return BulkPaymentFile.customVerb('initiateDownloadBulkPaymentAck', params, onCompletion);
     };

    //For Operation 'UploadFile' with service id 'uploadBulkPaymentFile5283'
     BulkPaymentFile.UploadFile = function(params, onCompletion){
        return BulkPaymentFile.customVerb('UploadFile', params, onCompletion);
     };

    //For Operation 'fetchUploadedFiles' with service id 'fetchUploadedFiles6228'
     BulkPaymentFile.fetchUploadedFiles = function(params, onCompletion){
        return BulkPaymentFile.customVerb('fetchUploadedFiles', params, onCompletion);
     };

    //For Operation 'fetchSampleFiles' with service id 'fetchSampleFiles3331'
     BulkPaymentFile.fetchSampleFiles = function(params, onCompletion){
        return BulkPaymentFile.customVerb('fetchSampleFiles', params, onCompletion);
     };

    var relations = [];

    BulkPaymentFile.relations = relations;

    BulkPaymentFile.prototype.isValid = function() {
        return BulkPaymentFile.isValid(this);
    };

    BulkPaymentFile.prototype.objModelName = "BulkPaymentFile";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    BulkPaymentFile.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BulkPaymentObjects", "BulkPaymentFile", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    BulkPaymentFile.clone = function(objectToClone) {
        var clonedObj = new BulkPaymentFile();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return BulkPaymentFile;
});