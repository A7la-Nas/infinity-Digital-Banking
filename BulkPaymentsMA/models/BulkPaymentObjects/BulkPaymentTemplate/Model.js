/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "BulkPaymentTemplate", "objectService" : "BulkPaymentObjects"};

    var setterFunctions = {
        templateId: function(val, state) {
            context["field"] = "templateId";
            context["metadata"] = (objectMetadata ? objectMetadata["templateId"] : null);
            state['templateId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        templateName: function(val, state) {
            context["field"] = "templateName";
            context["metadata"] = (objectMetadata ? objectMetadata["templateName"] : null);
            state['templateName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        processingMode: function(val, state) {
            context["field"] = "processingMode";
            context["metadata"] = (objectMetadata ? objectMetadata["processingMode"] : null);
            state['processingMode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        confirmationNumber: function(val, state) {
            context["field"] = "confirmationNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
            state['confirmationNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        featureActionId: function(val, state) {
            context["field"] = "featureActionId";
            context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
            state['featureActionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reviewedBy: function(val, state) {
            context["field"] = "reviewedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["reviewedBy"] : null);
            state['reviewedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        initiatedBy: function(val, state) {
            context["field"] = "initiatedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["initiatedBy"] : null);
            state['initiatedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyId: function(val, state) {
            context["field"] = "companyId";
            context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
            state['companyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        roleId: function(val, state) {
            context["field"] = "roleId";
            context["metadata"] = (objectMetadata ? objectMetadata["roleId"] : null);
            state['roleId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        totalTransactions: function(val, state) {
            context["field"] = "totalTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["totalTransactions"] : null);
            state['totalTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestId: function(val, state) {
            context["field"] = "requestId";
            context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
            state['requestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkType: function(val, state) {
            context["field"] = "bulkType";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkType"] : null);
            state['bulkType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        updateReference: function(val, state) {
            context["field"] = "updateReference";
            context["metadata"] = (objectMetadata ? objectMetadata["updateReference"] : null);
            state['updateReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditReference: function(val, state) {
            context["field"] = "creditReference";
            context["metadata"] = (objectMetadata ? objectMetadata["creditReference"] : null);
            state['creditReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitReference: function(val, state) {
            context["field"] = "debitReference";
            context["metadata"] = (objectMetadata ? objectMetadata["debitReference"] : null);
            state['debitReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        POs: function(val, state) {
            context["field"] = "POs";
            context["metadata"] = (objectMetadata ? objectMetadata["POs"] : null);
            state['POs'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        totalBeneficiaries: function(val, state) {
            context["field"] = "totalBeneficiaries";
            context["metadata"] = (objectMetadata ? objectMetadata["totalBeneficiaries"] : null);
            state['totalBeneficiaries'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function BulkPaymentTemplate(defaultValues) {
        var privateState = {};
        context["field"] = "templateId";
        context["metadata"] = (objectMetadata ? objectMetadata["templateId"] : null);
        privateState.templateId = defaultValues ?
            (defaultValues["templateId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["templateId"], context) :
                null) :
            null;

        context["field"] = "templateName";
        context["metadata"] = (objectMetadata ? objectMetadata["templateName"] : null);
        privateState.templateName = defaultValues ?
            (defaultValues["templateName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["templateName"], context) :
                null) :
            null;

        context["field"] = "processingMode";
        context["metadata"] = (objectMetadata ? objectMetadata["processingMode"] : null);
        privateState.processingMode = defaultValues ?
            (defaultValues["processingMode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["processingMode"], context) :
                null) :
            null;

        context["field"] = "confirmationNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
        privateState.confirmationNumber = defaultValues ?
            (defaultValues["confirmationNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["confirmationNumber"], context) :
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

        context["field"] = "featureActionId";
        context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
        privateState.featureActionId = defaultValues ?
            (defaultValues["featureActionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureActionId"], context) :
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

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
                null) :
            null;

        context["field"] = "reviewedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["reviewedBy"] : null);
        privateState.reviewedBy = defaultValues ?
            (defaultValues["reviewedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reviewedBy"], context) :
                null) :
            null;

        context["field"] = "initiatedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["initiatedBy"] : null);
        privateState.initiatedBy = defaultValues ?
            (defaultValues["initiatedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["initiatedBy"], context) :
                null) :
            null;

        context["field"] = "companyId";
        context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
        privateState.companyId = defaultValues ?
            (defaultValues["companyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyId"], context) :
                null) :
            null;

        context["field"] = "roleId";
        context["metadata"] = (objectMetadata ? objectMetadata["roleId"] : null);
        privateState.roleId = defaultValues ?
            (defaultValues["roleId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["roleId"], context) :
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

        context["field"] = "totalTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["totalTransactions"] : null);
        privateState.totalTransactions = defaultValues ?
            (defaultValues["totalTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalTransactions"], context) :
                null) :
            null;

        context["field"] = "requestId";
        context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
        privateState.requestId = defaultValues ?
            (defaultValues["requestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestId"], context) :
                null) :
            null;

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "bulkType";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkType"] : null);
        privateState.bulkType = defaultValues ?
            (defaultValues["bulkType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkType"], context) :
                null) :
            null;

        context["field"] = "updateReference";
        context["metadata"] = (objectMetadata ? objectMetadata["updateReference"] : null);
        privateState.updateReference = defaultValues ?
            (defaultValues["updateReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["updateReference"], context) :
                null) :
            null;

        context["field"] = "creditReference";
        context["metadata"] = (objectMetadata ? objectMetadata["creditReference"] : null);
        privateState.creditReference = defaultValues ?
            (defaultValues["creditReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditReference"], context) :
                null) :
            null;

        context["field"] = "debitReference";
        context["metadata"] = (objectMetadata ? objectMetadata["debitReference"] : null);
        privateState.debitReference = defaultValues ?
            (defaultValues["debitReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitReference"], context) :
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

        context["field"] = "POs";
        context["metadata"] = (objectMetadata ? objectMetadata["POs"] : null);
        privateState.POs = defaultValues ?
            (defaultValues["POs"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["POs"], context) :
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

        context["field"] = "totalBeneficiaries";
        context["metadata"] = (objectMetadata ? objectMetadata["totalBeneficiaries"] : null);
        privateState.totalBeneficiaries = defaultValues ?
            (defaultValues["totalBeneficiaries"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalBeneficiaries"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "templateId": {
                get: function() {
                    context["field"] = "templateId";
                    context["metadata"] = (objectMetadata ? objectMetadata["templateId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.templateId, context);
                },
                set: function(val) {
                    setterFunctions['templateId'].call(this, val, privateState);
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
            "reviewedBy": {
                get: function() {
                    context["field"] = "reviewedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["reviewedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reviewedBy, context);
                },
                set: function(val) {
                    setterFunctions['reviewedBy'].call(this, val, privateState);
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
            "roleId": {
                get: function() {
                    context["field"] = "roleId";
                    context["metadata"] = (objectMetadata ? objectMetadata["roleId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.roleId, context);
                },
                set: function(val) {
                    setterFunctions['roleId'].call(this, val, privateState);
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
            "bulkType": {
                get: function() {
                    context["field"] = "bulkType";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkType, context);
                },
                set: function(val) {
                    setterFunctions['bulkType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "updateReference": {
                get: function() {
                    context["field"] = "updateReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["updateReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.updateReference, context);
                },
                set: function(val) {
                    setterFunctions['updateReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditReference": {
                get: function() {
                    context["field"] = "creditReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditReference, context);
                },
                set: function(val) {
                    setterFunctions['creditReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "debitReference": {
                get: function() {
                    context["field"] = "debitReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitReference, context);
                },
                set: function(val) {
                    setterFunctions['debitReference'].call(this, val, privateState);
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
            "POs": {
                get: function() {
                    context["field"] = "POs";
                    context["metadata"] = (objectMetadata ? objectMetadata["POs"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.POs, context);
                },
                set: function(val) {
                    setterFunctions['POs'].call(this, val, privateState);
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
            "totalBeneficiaries": {
                get: function() {
                    context["field"] = "totalBeneficiaries";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalBeneficiaries"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalBeneficiaries, context);
                },
                set: function(val) {
                    setterFunctions['totalBeneficiaries'].call(this, val, privateState);
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
            privateState.templateId = value ? (value["templateId"] ? value["templateId"] : null) : null;
            privateState.templateName = value ? (value["templateName"] ? value["templateName"] : null) : null;
            privateState.processingMode = value ? (value["processingMode"] ? value["processingMode"] : null) : null;
            privateState.confirmationNumber = value ? (value["confirmationNumber"] ? value["confirmationNumber"] : null) : null;
            privateState.paymentId = value ? (value["paymentId"] ? value["paymentId"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.featureActionId = value ? (value["featureActionId"] ? value["featureActionId"] : null) : null;
            privateState.paymentDate = value ? (value["paymentDate"] ? value["paymentDate"] : null) : null;
            privateState.scheduledDate = value ? (value["scheduledDate"] ? value["scheduledDate"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
            privateState.reviewedBy = value ? (value["reviewedBy"] ? value["reviewedBy"] : null) : null;
            privateState.initiatedBy = value ? (value["initiatedBy"] ? value["initiatedBy"] : null) : null;
            privateState.companyId = value ? (value["companyId"] ? value["companyId"] : null) : null;
            privateState.roleId = value ? (value["roleId"] ? value["roleId"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.fromAccount = value ? (value["fromAccount"] ? value["fromAccount"] : null) : null;
            privateState.totalAmount = value ? (value["totalAmount"] ? value["totalAmount"] : null) : null;
            privateState.totalTransactions = value ? (value["totalTransactions"] ? value["totalTransactions"] : null) : null;
            privateState.requestId = value ? (value["requestId"] ? value["requestId"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.bulkType = value ? (value["bulkType"] ? value["bulkType"] : null) : null;
            privateState.updateReference = value ? (value["updateReference"] ? value["updateReference"] : null) : null;
            privateState.creditReference = value ? (value["creditReference"] ? value["creditReference"] : null) : null;
            privateState.debitReference = value ? (value["debitReference"] ? value["debitReference"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.POs = value ? (value["POs"] ? value["POs"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.filterByParam = value ? (value["filterByParam"] ? value["filterByParam"] : null) : null;
            privateState.filterByValue = value ? (value["filterByValue"] ? value["filterByValue"] : null) : null;
            privateState.totalBeneficiaries = value ? (value["totalBeneficiaries"] ? value["totalBeneficiaries"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(BulkPaymentTemplate);

    //Create new class level validator object
    BaseModel.Validator.call(BulkPaymentTemplate);

    var registerValidatorBackup = BulkPaymentTemplate.registerValidator;

    BulkPaymentTemplate.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(BulkPaymentTemplate.isValid(this, propName, val)) {
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
    //For Operation 'createBulkRequest' with service id 'createBulkRequest7131'
     BulkPaymentTemplate.createBulkRequest = function(params, onCompletion){
        return BulkPaymentTemplate.customVerb('createBulkRequest', params, onCompletion);
     };

    //For Operation 'fetchBulkPaymentTemplates' with service id 'fetchBulkPaymentTemplates7440'
     BulkPaymentTemplate.fetchBulkPaymentTemplates = function(params, onCompletion){
        return BulkPaymentTemplate.customVerb('fetchBulkPaymentTemplates', params, onCompletion);
     };

    //For Operation 'editBulkPaymentTemplate' with service id 'editBulkPaymentTemplate2220'
     BulkPaymentTemplate.editBulkPaymentTemplate = function(params, onCompletion){
        return BulkPaymentTemplate.customVerb('editBulkPaymentTemplate', params, onCompletion);
     };

    //For Operation 'fetchBulkPaymentTemplateById' with service id 'fetchBulkPaymentTemplateById8633'
     BulkPaymentTemplate.fetchBulkPaymentTemplateById = function(params, onCompletion){
        return BulkPaymentTemplate.customVerb('fetchBulkPaymentTemplateById', params, onCompletion);
     };

    //For Operation 'deleteBulkPaymentTemplate' with service id 'deleteBulkPaymentTemplate3028'
     BulkPaymentTemplate.deleteBulkPaymentTemplate = function(params, onCompletion){
        return BulkPaymentTemplate.customVerb('deleteBulkPaymentTemplate', params, onCompletion);
     };

    //For Operation 'createBulkPaymentTemplate' with service id 'createBulkPaymentTemplate6913'
     BulkPaymentTemplate.createBulkPaymentTemplate = function(params, onCompletion){
        return BulkPaymentTemplate.customVerb('createBulkPaymentTemplate', params, onCompletion);
     };

    var relations = [];

    BulkPaymentTemplate.relations = relations;

    BulkPaymentTemplate.prototype.isValid = function() {
        return BulkPaymentTemplate.isValid(this);
    };

    BulkPaymentTemplate.prototype.objModelName = "BulkPaymentTemplate";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    BulkPaymentTemplate.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BulkPaymentObjects", "BulkPaymentTemplate", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    BulkPaymentTemplate.clone = function(objectToClone) {
        var clonedObj = new BulkPaymentTemplate();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return BulkPaymentTemplate;
});