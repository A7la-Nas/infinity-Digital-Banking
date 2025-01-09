/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Payment", "objectService" : "BillPay"};

    var setterFunctions = {
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
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        frequencyEndDate: function(val, state) {
            context["field"] = "frequencyEndDate";
            context["metadata"] = (objectMetadata ? objectMetadata["frequencyEndDate"] : null);
            state['frequencyEndDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        frequencyType: function(val, state) {
            context["field"] = "frequencyType";
            context["metadata"] = (objectMetadata ? objectMetadata["frequencyType"] : null);
            state['frequencyType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromAccountNumber: function(val, state) {
            context["field"] = "fromAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
            state['fromAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        scheduledDate: function(val, state) {
            context["field"] = "scheduledDate";
            context["metadata"] = (objectMetadata ? objectMetadata["scheduledDate"] : null);
            state['scheduledDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toAccountNumber: function(val, state) {
            context["field"] = "toAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["toAccountNumber"] : null);
            state['toAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionsNotes: function(val, state) {
            context["field"] = "transactionsNotes";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionsNotes"] : null);
            state['transactionsNotes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionType: function(val, state) {
            context["field"] = "transactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
            state['transactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCurrency: function(val, state) {
            context["field"] = "transactionCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
            state['transactionCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MFAAttributes: function(val, state) {
            context["field"] = "MFAAttributes";
            context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
            state['MFAAttributes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceName: function(val, state) {
            context["field"] = "serviceName";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
            state['serviceName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        numberOfRecurrences: function(val, state) {
            context["field"] = "numberOfRecurrences";
            context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecurrences"] : null);
            state['numberOfRecurrences'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        personId: function(val, state) {
            context["field"] = "personId";
            context["metadata"] = (objectMetadata ? objectMetadata["personId"] : null);
            state['personId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deliverBy: function(val, state) {
            context["field"] = "deliverBy";
            context["metadata"] = (objectMetadata ? objectMetadata["deliverBy"] : null);
            state['deliverBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        zipCode: function(val, state) {
            context["field"] = "zipCode";
            context["metadata"] = (objectMetadata ? objectMetadata["zipCode"] : null);
            state['zipCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billerId: function(val, state) {
            context["field"] = "billerId";
            context["metadata"] = (objectMetadata ? objectMetadata["billerId"] : null);
            state['billerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billid: function(val, state) {
            context["field"] = "billid";
            context["metadata"] = (objectMetadata ? objectMetadata["billid"] : null);
            state['billid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeId: function(val, state) {
            context["field"] = "payeeId";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
            state['payeeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeName: function(val, state) {
            context["field"] = "payeeName";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeName"] : null);
            state['payeeName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        state: function(val, state) {
            context["field"] = "state";
            context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
            state['state'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftCode: function(val, state) {
            context["field"] = "swiftCode";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
            state['swiftCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        frequencyStartDate: function(val, state) {
            context["field"] = "frequencyStartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["frequencyStartDate"] : null);
            state['frequencyStartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkPayString: function(val, state) {
            context["field"] = "bulkPayString";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkPayString"] : null);
            state['bulkPayString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        referenceId: function(val, state) {
            context["field"] = "referenceId";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceId"] : null);
            state['referenceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        initiationId: function(val, state) {
            context["field"] = "initiationId";
            context["metadata"] = (objectMetadata ? objectMetadata["initiationId"] : null);
            state['initiationId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        mfaType: function(val, state) {
            context["field"] = "mfaType";
            context["metadata"] = (objectMetadata ? objectMetadata["mfaType"] : null);
            state['mfaType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionId: function(val, state) {
            context["field"] = "transactionId";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
            state['transactionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        confirmationNumber: function(val, state) {
            context["field"] = "confirmationNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
            state['confirmationNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paidBy: function(val, state) {
            context["field"] = "paidBy";
            context["metadata"] = (objectMetadata ? objectMetadata["paidBy"] : null);
            state['paidBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        backendReferenceId: function(val, state) {
            context["field"] = "backendReferenceId";
            context["metadata"] = (objectMetadata ? objectMetadata["backendReferenceId"] : null);
            state['backendReferenceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        checkImageBack: function(val, state) {
            context["field"] = "checkImageBack";
            context["metadata"] = (objectMetadata ? objectMetadata["checkImageBack"] : null);
            state['checkImageBack'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toAccountType: function(val, state) {
            context["field"] = "toAccountType";
            context["metadata"] = (objectMetadata ? objectMetadata["toAccountType"] : null);
            state['toAccountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        profileId: function(val, state) {
            context["field"] = "profileId";
            context["metadata"] = (objectMetadata ? objectMetadata["profileId"] : null);
            state['profileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        requestId: function(val, state) {
            context["field"] = "requestId";
            context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
            state['requestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Payment(defaultValues) {
        var privateState = {};
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

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "frequencyEndDate";
        context["metadata"] = (objectMetadata ? objectMetadata["frequencyEndDate"] : null);
        privateState.frequencyEndDate = defaultValues ?
            (defaultValues["frequencyEndDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["frequencyEndDate"], context) :
                null) :
            null;

        context["field"] = "frequencyType";
        context["metadata"] = (objectMetadata ? objectMetadata["frequencyType"] : null);
        privateState.frequencyType = defaultValues ?
            (defaultValues["frequencyType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["frequencyType"], context) :
                null) :
            null;

        context["field"] = "fromAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
        privateState.fromAccountNumber = defaultValues ?
            (defaultValues["fromAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountNumber"], context) :
                null) :
            null;

        context["field"] = "scheduledDate";
        context["metadata"] = (objectMetadata ? objectMetadata["scheduledDate"] : null);
        privateState.scheduledDate = defaultValues ?
            (defaultValues["scheduledDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["scheduledDate"], context) :
                null) :
            null;

        context["field"] = "toAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["toAccountNumber"] : null);
        privateState.toAccountNumber = defaultValues ?
            (defaultValues["toAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toAccountNumber"], context) :
                null) :
            null;

        context["field"] = "transactionsNotes";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionsNotes"] : null);
        privateState.transactionsNotes = defaultValues ?
            (defaultValues["transactionsNotes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionsNotes"], context) :
                null) :
            null;

        context["field"] = "transactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
        privateState.transactionType = defaultValues ?
            (defaultValues["transactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionType"], context) :
                null) :
            null;

        context["field"] = "transactionCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
        privateState.transactionCurrency = defaultValues ?
            (defaultValues["transactionCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCurrency"], context) :
                null) :
            null;

        context["field"] = "MFAAttributes";
        context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
        privateState.MFAAttributes = defaultValues ?
            (defaultValues["MFAAttributes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MFAAttributes"], context) :
                null) :
            null;

        context["field"] = "serviceName";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
        privateState.serviceName = defaultValues ?
            (defaultValues["serviceName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceName"], context) :
                null) :
            null;

        context["field"] = "numberOfRecurrences";
        context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecurrences"] : null);
        privateState.numberOfRecurrences = defaultValues ?
            (defaultValues["numberOfRecurrences"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["numberOfRecurrences"], context) :
                null) :
            null;

        context["field"] = "personId";
        context["metadata"] = (objectMetadata ? objectMetadata["personId"] : null);
        privateState.personId = defaultValues ?
            (defaultValues["personId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["personId"], context) :
                null) :
            null;

        context["field"] = "deliverBy";
        context["metadata"] = (objectMetadata ? objectMetadata["deliverBy"] : null);
        privateState.deliverBy = defaultValues ?
            (defaultValues["deliverBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deliverBy"], context) :
                null) :
            null;

        context["field"] = "zipCode";
        context["metadata"] = (objectMetadata ? objectMetadata["zipCode"] : null);
        privateState.zipCode = defaultValues ?
            (defaultValues["zipCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["zipCode"], context) :
                null) :
            null;

        context["field"] = "billerId";
        context["metadata"] = (objectMetadata ? objectMetadata["billerId"] : null);
        privateState.billerId = defaultValues ?
            (defaultValues["billerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billerId"], context) :
                null) :
            null;

        context["field"] = "billid";
        context["metadata"] = (objectMetadata ? objectMetadata["billid"] : null);
        privateState.billid = defaultValues ?
            (defaultValues["billid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billid"], context) :
                null) :
            null;

        context["field"] = "payeeId";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
        privateState.payeeId = defaultValues ?
            (defaultValues["payeeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeId"], context) :
                null) :
            null;

        context["field"] = "payeeName";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeName"] : null);
        privateState.payeeName = defaultValues ?
            (defaultValues["payeeName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeName"], context) :
                null) :
            null;

        context["field"] = "state";
        context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
        privateState.state = defaultValues ?
            (defaultValues["state"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["state"], context) :
                null) :
            null;

        context["field"] = "swiftCode";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
        privateState.swiftCode = defaultValues ?
            (defaultValues["swiftCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftCode"], context) :
                null) :
            null;

        context["field"] = "frequencyStartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["frequencyStartDate"] : null);
        privateState.frequencyStartDate = defaultValues ?
            (defaultValues["frequencyStartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["frequencyStartDate"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "bulkPayString";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkPayString"] : null);
        privateState.bulkPayString = defaultValues ?
            (defaultValues["bulkPayString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkPayString"], context) :
                null) :
            null;

        context["field"] = "referenceId";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceId"] : null);
        privateState.referenceId = defaultValues ?
            (defaultValues["referenceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceId"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "initiationId";
        context["metadata"] = (objectMetadata ? objectMetadata["initiationId"] : null);
        privateState.initiationId = defaultValues ?
            (defaultValues["initiationId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["initiationId"], context) :
                null) :
            null;

        context["field"] = "mfaType";
        context["metadata"] = (objectMetadata ? objectMetadata["mfaType"] : null);
        privateState.mfaType = defaultValues ?
            (defaultValues["mfaType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["mfaType"], context) :
                null) :
            null;

        context["field"] = "transactionId";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
        privateState.transactionId = defaultValues ?
            (defaultValues["transactionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionId"], context) :
                null) :
            null;

        context["field"] = "confirmationNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
        privateState.confirmationNumber = defaultValues ?
            (defaultValues["confirmationNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["confirmationNumber"], context) :
                null) :
            null;

        context["field"] = "paidBy";
        context["metadata"] = (objectMetadata ? objectMetadata["paidBy"] : null);
        privateState.paidBy = defaultValues ?
            (defaultValues["paidBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paidBy"], context) :
                null) :
            null;

        context["field"] = "backendReferenceId";
        context["metadata"] = (objectMetadata ? objectMetadata["backendReferenceId"] : null);
        privateState.backendReferenceId = defaultValues ?
            (defaultValues["backendReferenceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["backendReferenceId"], context) :
                null) :
            null;

        context["field"] = "checkImageBack";
        context["metadata"] = (objectMetadata ? objectMetadata["checkImageBack"] : null);
        privateState.checkImageBack = defaultValues ?
            (defaultValues["checkImageBack"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkImageBack"], context) :
                null) :
            null;

        context["field"] = "toAccountType";
        context["metadata"] = (objectMetadata ? objectMetadata["toAccountType"] : null);
        privateState.toAccountType = defaultValues ?
            (defaultValues["toAccountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toAccountType"], context) :
                null) :
            null;

        context["field"] = "profileId";
        context["metadata"] = (objectMetadata ? objectMetadata["profileId"] : null);
        privateState.profileId = defaultValues ?
            (defaultValues["profileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["profileId"], context) :
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

        context["field"] = "requestId";
        context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
        privateState.requestId = defaultValues ?
            (defaultValues["requestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "frequencyType": {
                get: function() {
                    context["field"] = "frequencyType";
                    context["metadata"] = (objectMetadata ? objectMetadata["frequencyType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.frequencyType, context);
                },
                set: function(val) {
                    setterFunctions['frequencyType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromAccountNumber": {
                get: function() {
                    context["field"] = "fromAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['fromAccountNumber'].call(this, val, privateState);
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
            "toAccountNumber": {
                get: function() {
                    context["field"] = "toAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["toAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['toAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionsNotes": {
                get: function() {
                    context["field"] = "transactionsNotes";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionsNotes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionsNotes, context);
                },
                set: function(val) {
                    setterFunctions['transactionsNotes'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionType": {
                get: function() {
                    context["field"] = "transactionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionType, context);
                },
                set: function(val) {
                    setterFunctions['transactionType'].call(this, val, privateState);
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
            "numberOfRecurrences": {
                get: function() {
                    context["field"] = "numberOfRecurrences";
                    context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecurrences"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.numberOfRecurrences, context);
                },
                set: function(val) {
                    setterFunctions['numberOfRecurrences'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "personId": {
                get: function() {
                    context["field"] = "personId";
                    context["metadata"] = (objectMetadata ? objectMetadata["personId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.personId, context);
                },
                set: function(val) {
                    setterFunctions['personId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deliverBy": {
                get: function() {
                    context["field"] = "deliverBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["deliverBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deliverBy, context);
                },
                set: function(val) {
                    setterFunctions['deliverBy'].call(this, val, privateState);
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
            "billerId": {
                get: function() {
                    context["field"] = "billerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["billerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billerId, context);
                },
                set: function(val) {
                    setterFunctions['billerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "billid": {
                get: function() {
                    context["field"] = "billid";
                    context["metadata"] = (objectMetadata ? objectMetadata["billid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billid, context);
                },
                set: function(val) {
                    setterFunctions['billid'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payeeId": {
                get: function() {
                    context["field"] = "payeeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeId, context);
                },
                set: function(val) {
                    setterFunctions['payeeId'].call(this, val, privateState);
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
            "frequencyStartDate": {
                get: function() {
                    context["field"] = "frequencyStartDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["frequencyStartDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.frequencyStartDate, context);
                },
                set: function(val) {
                    setterFunctions['frequencyStartDate'].call(this, val, privateState);
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
            "bulkPayString": {
                get: function() {
                    context["field"] = "bulkPayString";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkPayString"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkPayString, context);
                },
                set: function(val) {
                    setterFunctions['bulkPayString'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "referenceId": {
                get: function() {
                    context["field"] = "referenceId";
                    context["metadata"] = (objectMetadata ? objectMetadata["referenceId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.referenceId, context);
                },
                set: function(val) {
                    setterFunctions['referenceId'].call(this, val, privateState);
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
            "initiationId": {
                get: function() {
                    context["field"] = "initiationId";
                    context["metadata"] = (objectMetadata ? objectMetadata["initiationId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.initiationId, context);
                },
                set: function(val) {
                    setterFunctions['initiationId'].call(this, val, privateState);
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
            "backendReferenceId": {
                get: function() {
                    context["field"] = "backendReferenceId";
                    context["metadata"] = (objectMetadata ? objectMetadata["backendReferenceId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.backendReferenceId, context);
                },
                set: function(val) {
                    setterFunctions['backendReferenceId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "checkImageBack": {
                get: function() {
                    context["field"] = "checkImageBack";
                    context["metadata"] = (objectMetadata ? objectMetadata["checkImageBack"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.checkImageBack, context);
                },
                set: function(val) {
                    setterFunctions['checkImageBack'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "toAccountType": {
                get: function() {
                    context["field"] = "toAccountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["toAccountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toAccountType, context);
                },
                set: function(val) {
                    setterFunctions['toAccountType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "profileId": {
                get: function() {
                    context["field"] = "profileId";
                    context["metadata"] = (objectMetadata ? objectMetadata["profileId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.profileId, context);
                },
                set: function(val) {
                    setterFunctions['profileId'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.frequencyEndDate = value ? (value["frequencyEndDate"] ? value["frequencyEndDate"] : null) : null;
            privateState.frequencyType = value ? (value["frequencyType"] ? value["frequencyType"] : null) : null;
            privateState.fromAccountNumber = value ? (value["fromAccountNumber"] ? value["fromAccountNumber"] : null) : null;
            privateState.scheduledDate = value ? (value["scheduledDate"] ? value["scheduledDate"] : null) : null;
            privateState.toAccountNumber = value ? (value["toAccountNumber"] ? value["toAccountNumber"] : null) : null;
            privateState.transactionsNotes = value ? (value["transactionsNotes"] ? value["transactionsNotes"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.transactionCurrency = value ? (value["transactionCurrency"] ? value["transactionCurrency"] : null) : null;
            privateState.MFAAttributes = value ? (value["MFAAttributes"] ? value["MFAAttributes"] : null) : null;
            privateState.serviceName = value ? (value["serviceName"] ? value["serviceName"] : null) : null;
            privateState.numberOfRecurrences = value ? (value["numberOfRecurrences"] ? value["numberOfRecurrences"] : null) : null;
            privateState.personId = value ? (value["personId"] ? value["personId"] : null) : null;
            privateState.deliverBy = value ? (value["deliverBy"] ? value["deliverBy"] : null) : null;
            privateState.zipCode = value ? (value["zipCode"] ? value["zipCode"] : null) : null;
            privateState.billerId = value ? (value["billerId"] ? value["billerId"] : null) : null;
            privateState.billid = value ? (value["billid"] ? value["billid"] : null) : null;
            privateState.payeeId = value ? (value["payeeId"] ? value["payeeId"] : null) : null;
            privateState.payeeName = value ? (value["payeeName"] ? value["payeeName"] : null) : null;
            privateState.state = value ? (value["state"] ? value["state"] : null) : null;
            privateState.swiftCode = value ? (value["swiftCode"] ? value["swiftCode"] : null) : null;
            privateState.frequencyStartDate = value ? (value["frequencyStartDate"] ? value["frequencyStartDate"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.bulkPayString = value ? (value["bulkPayString"] ? value["bulkPayString"] : null) : null;
            privateState.referenceId = value ? (value["referenceId"] ? value["referenceId"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.initiationId = value ? (value["initiationId"] ? value["initiationId"] : null) : null;
            privateState.mfaType = value ? (value["mfaType"] ? value["mfaType"] : null) : null;
            privateState.transactionId = value ? (value["transactionId"] ? value["transactionId"] : null) : null;
            privateState.confirmationNumber = value ? (value["confirmationNumber"] ? value["confirmationNumber"] : null) : null;
            privateState.paidBy = value ? (value["paidBy"] ? value["paidBy"] : null) : null;
            privateState.backendReferenceId = value ? (value["backendReferenceId"] ? value["backendReferenceId"] : null) : null;
            privateState.checkImageBack = value ? (value["checkImageBack"] ? value["checkImageBack"] : null) : null;
            privateState.toAccountType = value ? (value["toAccountType"] ? value["toAccountType"] : null) : null;
            privateState.profileId = value ? (value["profileId"] ? value["profileId"] : null) : null;
            privateState.serviceCharge = value ? (value["serviceCharge"] ? value["serviceCharge"] : null) : null;
            privateState.transactionAmount = value ? (value["transactionAmount"] ? value["transactionAmount"] : null) : null;
            privateState.convertedAmount = value ? (value["convertedAmount"] ? value["convertedAmount"] : null) : null;
            privateState.requestId = value ? (value["requestId"] ? value["requestId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Payment);

    //Create new class level validator object
    BaseModel.Validator.call(Payment);

    var registerValidatorBackup = Payment.registerValidator;

    Payment.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Payment.isValid(this, propName, val)) {
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
    //For Operation 'createPayment_bulk' with service id 'CreateBulkBillPayTransactions8335'
     Payment.createPayment_bulk = function(params, onCompletion){
        return Payment.customVerb('createPayment_bulk', params, onCompletion);
     };

    //For Operation 'createPayment' with service id 'CreateBillPayTransaction6935'
     Payment.createPayment = function(params, onCompletion){
        return Payment.customVerb('createPayment', params, onCompletion);
     };

    //For Operation 'updatePayment' with service id 'EditBillPayTransaction1385'
     Payment.updatePayment = function(params, onCompletion){
        return Payment.customVerb('updatePayment', params, onCompletion);
     };

    //For Operation 'updatePayment_delete' with service id 'DeleteBillPayTransaction4861'
     Payment.updatePayment_delete = function(params, onCompletion){
        return Payment.customVerb('updatePayment_delete', params, onCompletion);
     };

    var relations = [];

    Payment.relations = relations;

    Payment.prototype.isValid = function() {
        return Payment.isValid(this);
    };

    Payment.prototype.objModelName = "Payment";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Payment.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BillPay", "Payment", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Payment.clone = function(objectToClone) {
        var clonedObj = new Payment();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Payment;
});