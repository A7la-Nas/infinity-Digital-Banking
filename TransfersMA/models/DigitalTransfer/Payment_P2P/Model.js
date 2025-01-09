/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Payment_P2P", "objectService" : "DigitalTransfer"};

    var setterFunctions = {
        Transaction_id: function(val, state) {
            context["field"] = "Transaction_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Transaction_id"] : null);
            state['Transaction_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        isScheduled: function(val, state) {
            context["field"] = "isScheduled";
            context["metadata"] = (objectMetadata ? objectMetadata["isScheduled"] : null);
            state['isScheduled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        fromAccountCurrency: function(val, state) {
            context["field"] = "fromAccountCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountCurrency"] : null);
            state['fromAccountCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toAccountCurrency: function(val, state) {
            context["field"] = "toAccountCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["toAccountCurrency"] : null);
            state['toAccountCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        numberOfRecurrences: function(val, state) {
            context["field"] = "numberOfRecurrences";
            context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecurrences"] : null);
            state['numberOfRecurrences'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        p2pContact: function(val, state) {
            context["field"] = "p2pContact";
            context["metadata"] = (objectMetadata ? objectMetadata["p2pContact"] : null);
            state['p2pContact'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        payeeAccountNumber: function(val, state) {
            context["field"] = "payeeAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeAccountNumber"] : null);
            state['payeeAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeAddressLine1: function(val, state) {
            context["field"] = "payeeAddressLine1";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeAddressLine1"] : null);
            state['payeeAddressLine1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeName: function(val, state) {
            context["field"] = "payeeName";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeName"] : null);
            state['payeeName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeNickName: function(val, state) {
            context["field"] = "payeeNickName";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeNickName"] : null);
            state['payeeNickName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeCurrency: function(val, state) {
            context["field"] = "payeeCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeCurrency"] : null);
            state['payeeCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        wireAccountType: function(val, state) {
            context["field"] = "wireAccountType";
            context["metadata"] = (objectMetadata ? objectMetadata["wireAccountType"] : null);
            state['wireAccountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        routingNumber: function(val, state) {
            context["field"] = "routingNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
            state['routingNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cityName: function(val, state) {
            context["field"] = "cityName";
            context["metadata"] = (objectMetadata ? objectMetadata["cityName"] : null);
            state['cityName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        state: function(val, state) {
            context["field"] = "state";
            context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
            state['state'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankAddressLine1: function(val, state) {
            context["field"] = "bankAddressLine1";
            context["metadata"] = (objectMetadata ? objectMetadata["bankAddressLine1"] : null);
            state['bankAddressLine1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankAddressLine2: function(val, state) {
            context["field"] = "bankAddressLine2";
            context["metadata"] = (objectMetadata ? objectMetadata["bankAddressLine2"] : null);
            state['bankAddressLine2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        bankZip: function(val, state) {
            context["field"] = "bankZip";
            context["metadata"] = (objectMetadata ? objectMetadata["bankZip"] : null);
            state['bankZip'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeType: function(val, state) {
            context["field"] = "payeeType";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeType"] : null);
            state['payeeType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeAddressLine2: function(val, state) {
            context["field"] = "payeeAddressLine2";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeAddressLine2"] : null);
            state['payeeAddressLine2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftCode: function(val, state) {
            context["field"] = "swiftCode";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
            state['swiftCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        country: function(val, state) {
            context["field"] = "country";
            context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
            state['country'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        internationalRoutingCode: function(val, state) {
            context["field"] = "internationalRoutingCode";
            context["metadata"] = (objectMetadata ? objectMetadata["internationalRoutingCode"] : null);
            state['internationalRoutingCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        iban: function(val, state) {
            context["field"] = "iban";
            context["metadata"] = (objectMetadata ? objectMetadata["iban"] : null);
            state['iban'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        wireTemplateExecution_id: function(val, state) {
            context["field"] = "wireTemplateExecution_id";
            context["metadata"] = (objectMetadata ? objectMetadata["wireTemplateExecution_id"] : null);
            state['wireTemplateExecution_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bicCode: function(val, state) {
            context["field"] = "bicCode";
            context["metadata"] = (objectMetadata ? objectMetadata["bicCode"] : null);
            state['bicCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        BulkWireExecutionDetails: function(val, state) {
            context["field"] = "BulkWireExecutionDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["BulkWireExecutionDetails"] : null);
            state['BulkWireExecutionDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankId: function(val, state) {
            context["field"] = "bankId";
            context["metadata"] = (objectMetadata ? objectMetadata["bankId"] : null);
            state['bankId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        feeCurrency: function(val, state) {
            context["field"] = "feeCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["feeCurrency"] : null);
            state['feeCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paidBy: function(val, state) {
            context["field"] = "paidBy";
            context["metadata"] = (objectMetadata ? objectMetadata["paidBy"] : null);
            state['paidBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentType: function(val, state) {
            context["field"] = "paymentType";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentType"] : null);
            state['paymentType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        feeAmount: function(val, state) {
            context["field"] = "feeAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["feeAmount"] : null);
            state['feeAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryAddressNickName: function(val, state) {
            context["field"] = "beneficiaryAddressNickName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressNickName"] : null);
            state['beneficiaryAddressNickName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryAddressLine1: function(val, state) {
            context["field"] = "beneficiaryAddressLine1";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine1"] : null);
            state['beneficiaryAddressLine1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryCity: function(val, state) {
            context["field"] = "beneficiaryCity";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryCity"] : null);
            state['beneficiaryCity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryZipcode: function(val, state) {
            context["field"] = "beneficiaryZipcode";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryZipcode"] : null);
            state['beneficiaryZipcode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiarycountry: function(val, state) {
            context["field"] = "beneficiarycountry";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiarycountry"] : null);
            state['beneficiarycountry'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        backendReferenceId: function(val, state) {
            context["field"] = "backendReferenceId";
            context["metadata"] = (objectMetadata ? objectMetadata["backendReferenceId"] : null);
            state['backendReferenceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        checkDateOfIssue: function(val, state) {
            context["field"] = "checkDateOfIssue";
            context["metadata"] = (objectMetadata ? objectMetadata["checkDateOfIssue"] : null);
            state['checkDateOfIssue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        checkImage: function(val, state) {
            context["field"] = "checkImage";
            context["metadata"] = (objectMetadata ? objectMetadata["checkImage"] : null);
            state['checkImage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        uploadedattachments: function(val, state) {
            context["field"] = "uploadedattachments";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedattachments"] : null);
            state['uploadedattachments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        validate: function(val, state) {
            context["field"] = "validate";
            context["metadata"] = (objectMetadata ? objectMetadata["validate"] : null);
            state['validate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        overrides: function(val, state) {
            context["field"] = "overrides";
            context["metadata"] = (objectMetadata ? objectMetadata["overrides"] : null);
            state['overrides'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        charges: function(val, state) {
            context["field"] = "charges";
            context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
            state['charges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exchangeRate: function(val, state) {
            context["field"] = "exchangeRate";
            context["metadata"] = (objectMetadata ? objectMetadata["exchangeRate"] : null);
            state['exchangeRate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalAmount: function(val, state) {
            context["field"] = "totalAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
            state['totalAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadMessage: function(val, state) {
            context["field"] = "uploadMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadMessage"] : null);
            state['uploadMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deletedDocuments: function(val, state) {
            context["field"] = "deletedDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["deletedDocuments"] : null);
            state['deletedDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceCharge: function(val, state) {
            context["field"] = "serviceCharge";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceCharge"] : null);
            state['serviceCharge'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        successfulUploads: function(val, state) {
            context["field"] = "successfulUploads";
            context["metadata"] = (objectMetadata ? objectMetadata["successfulUploads"] : null);
            state['successfulUploads'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        failedUploads: function(val, state) {
            context["field"] = "failedUploads";
            context["metadata"] = (objectMetadata ? objectMetadata["failedUploads"] : null);
            state['failedUploads'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        overrideList: function(val, state) {
            context["field"] = "overrideList";
            context["metadata"] = (objectMetadata ? objectMetadata["overrideList"] : null);
            state['overrideList'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestId: function(val, state) {
            context["field"] = "requestId";
            context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
            state['requestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createWithPaymentId: function(val, state) {
            context["field"] = "createWithPaymentId";
            context["metadata"] = (objectMetadata ? objectMetadata["createWithPaymentId"] : null);
            state['createWithPaymentId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditValueDate: function(val, state) {
            context["field"] = "creditValueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["creditValueDate"] : null);
            state['creditValueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        intermediaryBicCode: function(val, state) {
            context["field"] = "intermediaryBicCode";
            context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBicCode"] : null);
            state['intermediaryBicCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        clearingCode: function(val, state) {
            context["field"] = "clearingCode";
            context["metadata"] = (objectMetadata ? objectMetadata["clearingCode"] : null);
            state['clearingCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        e2eReference: function(val, state) {
            context["field"] = "e2eReference";
            context["metadata"] = (objectMetadata ? objectMetadata["e2eReference"] : null);
            state['e2eReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorDetails: function(val, state) {
            context["field"] = "errorDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["errorDetails"] : null);
            state['errorDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageDetails: function(val, state) {
            context["field"] = "messageDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["messageDetails"] : null);
            state['messageDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryPhone: function(val, state) {
            context["field"] = "beneficiaryPhone";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryPhone"] : null);
            state['beneficiaryPhone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryEmail: function(val, state) {
            context["field"] = "beneficiaryEmail";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryEmail"] : null);
            state['beneficiaryEmail'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Payment_P2P(defaultValues) {
        var privateState = {};
        context["field"] = "Transaction_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Transaction_id"] : null);
        privateState.Transaction_id = defaultValues ?
            (defaultValues["Transaction_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Transaction_id"], context) :
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

        context["field"] = "isScheduled";
        context["metadata"] = (objectMetadata ? objectMetadata["isScheduled"] : null);
        privateState.isScheduled = defaultValues ?
            (defaultValues["isScheduled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isScheduled"], context) :
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

        context["field"] = "fromAccountCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountCurrency"] : null);
        privateState.fromAccountCurrency = defaultValues ?
            (defaultValues["fromAccountCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountCurrency"], context) :
                null) :
            null;

        context["field"] = "toAccountCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["toAccountCurrency"] : null);
        privateState.toAccountCurrency = defaultValues ?
            (defaultValues["toAccountCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toAccountCurrency"], context) :
                null) :
            null;

        context["field"] = "numberOfRecurrences";
        context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecurrences"] : null);
        privateState.numberOfRecurrences = defaultValues ?
            (defaultValues["numberOfRecurrences"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["numberOfRecurrences"], context) :
                null) :
            null;

        context["field"] = "p2pContact";
        context["metadata"] = (objectMetadata ? objectMetadata["p2pContact"] : null);
        privateState.p2pContact = defaultValues ?
            (defaultValues["p2pContact"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["p2pContact"], context) :
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

        context["field"] = "payeeAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeAccountNumber"] : null);
        privateState.payeeAccountNumber = defaultValues ?
            (defaultValues["payeeAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeAccountNumber"], context) :
                null) :
            null;

        context["field"] = "payeeAddressLine1";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeAddressLine1"] : null);
        privateState.payeeAddressLine1 = defaultValues ?
            (defaultValues["payeeAddressLine1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeAddressLine1"], context) :
                null) :
            null;

        context["field"] = "payeeName";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeName"] : null);
        privateState.payeeName = defaultValues ?
            (defaultValues["payeeName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeName"], context) :
                null) :
            null;

        context["field"] = "payeeNickName";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeNickName"] : null);
        privateState.payeeNickName = defaultValues ?
            (defaultValues["payeeNickName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeNickName"], context) :
                null) :
            null;

        context["field"] = "payeeCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeCurrency"] : null);
        privateState.payeeCurrency = defaultValues ?
            (defaultValues["payeeCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeCurrency"], context) :
                null) :
            null;

        context["field"] = "wireAccountType";
        context["metadata"] = (objectMetadata ? objectMetadata["wireAccountType"] : null);
        privateState.wireAccountType = defaultValues ?
            (defaultValues["wireAccountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["wireAccountType"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "routingNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
        privateState.routingNumber = defaultValues ?
            (defaultValues["routingNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["routingNumber"], context) :
                null) :
            null;

        context["field"] = "cityName";
        context["metadata"] = (objectMetadata ? objectMetadata["cityName"] : null);
        privateState.cityName = defaultValues ?
            (defaultValues["cityName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cityName"], context) :
                null) :
            null;

        context["field"] = "state";
        context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
        privateState.state = defaultValues ?
            (defaultValues["state"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["state"], context) :
                null) :
            null;

        context["field"] = "bankAddressLine1";
        context["metadata"] = (objectMetadata ? objectMetadata["bankAddressLine1"] : null);
        privateState.bankAddressLine1 = defaultValues ?
            (defaultValues["bankAddressLine1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankAddressLine1"], context) :
                null) :
            null;

        context["field"] = "bankAddressLine2";
        context["metadata"] = (objectMetadata ? objectMetadata["bankAddressLine2"] : null);
        privateState.bankAddressLine2 = defaultValues ?
            (defaultValues["bankAddressLine2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankAddressLine2"], context) :
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

        context["field"] = "bankZip";
        context["metadata"] = (objectMetadata ? objectMetadata["bankZip"] : null);
        privateState.bankZip = defaultValues ?
            (defaultValues["bankZip"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankZip"], context) :
                null) :
            null;

        context["field"] = "payeeType";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeType"] : null);
        privateState.payeeType = defaultValues ?
            (defaultValues["payeeType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeType"], context) :
                null) :
            null;

        context["field"] = "payeeAddressLine2";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeAddressLine2"] : null);
        privateState.payeeAddressLine2 = defaultValues ?
            (defaultValues["payeeAddressLine2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeAddressLine2"], context) :
                null) :
            null;

        context["field"] = "swiftCode";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
        privateState.swiftCode = defaultValues ?
            (defaultValues["swiftCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftCode"], context) :
                null) :
            null;

        context["field"] = "country";
        context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
        privateState.country = defaultValues ?
            (defaultValues["country"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["country"], context) :
                null) :
            null;

        context["field"] = "internationalRoutingCode";
        context["metadata"] = (objectMetadata ? objectMetadata["internationalRoutingCode"] : null);
        privateState.internationalRoutingCode = defaultValues ?
            (defaultValues["internationalRoutingCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["internationalRoutingCode"], context) :
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

        context["field"] = "iban";
        context["metadata"] = (objectMetadata ? objectMetadata["iban"] : null);
        privateState.iban = defaultValues ?
            (defaultValues["iban"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["iban"], context) :
                null) :
            null;

        context["field"] = "wireTemplateExecution_id";
        context["metadata"] = (objectMetadata ? objectMetadata["wireTemplateExecution_id"] : null);
        privateState.wireTemplateExecution_id = defaultValues ?
            (defaultValues["wireTemplateExecution_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["wireTemplateExecution_id"], context) :
                null) :
            null;

        context["field"] = "bicCode";
        context["metadata"] = (objectMetadata ? objectMetadata["bicCode"] : null);
        privateState.bicCode = defaultValues ?
            (defaultValues["bicCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bicCode"], context) :
                null) :
            null;

        context["field"] = "BulkWireExecutionDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["BulkWireExecutionDetails"] : null);
        privateState.BulkWireExecutionDetails = defaultValues ?
            (defaultValues["BulkWireExecutionDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["BulkWireExecutionDetails"], context) :
                null) :
            null;

        context["field"] = "bankId";
        context["metadata"] = (objectMetadata ? objectMetadata["bankId"] : null);
        privateState.bankId = defaultValues ?
            (defaultValues["bankId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankId"], context) :
                null) :
            null;

        context["field"] = "feeCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["feeCurrency"] : null);
        privateState.feeCurrency = defaultValues ?
            (defaultValues["feeCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["feeCurrency"], context) :
                null) :
            null;

        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
                null) :
            null;

        context["field"] = "paidBy";
        context["metadata"] = (objectMetadata ? objectMetadata["paidBy"] : null);
        privateState.paidBy = defaultValues ?
            (defaultValues["paidBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paidBy"], context) :
                null) :
            null;

        context["field"] = "paymentType";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentType"] : null);
        privateState.paymentType = defaultValues ?
            (defaultValues["paymentType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentType"], context) :
                null) :
            null;

        context["field"] = "feeAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["feeAmount"] : null);
        privateState.feeAmount = defaultValues ?
            (defaultValues["feeAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["feeAmount"], context) :
                null) :
            null;

        context["field"] = "beneficiaryAddressNickName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressNickName"] : null);
        privateState.beneficiaryAddressNickName = defaultValues ?
            (defaultValues["beneficiaryAddressNickName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryAddressNickName"], context) :
                null) :
            null;

        context["field"] = "beneficiaryAddressLine1";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine1"] : null);
        privateState.beneficiaryAddressLine1 = defaultValues ?
            (defaultValues["beneficiaryAddressLine1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryAddressLine1"], context) :
                null) :
            null;

        context["field"] = "beneficiaryCity";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryCity"] : null);
        privateState.beneficiaryCity = defaultValues ?
            (defaultValues["beneficiaryCity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryCity"], context) :
                null) :
            null;

        context["field"] = "beneficiaryZipcode";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryZipcode"] : null);
        privateState.beneficiaryZipcode = defaultValues ?
            (defaultValues["beneficiaryZipcode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryZipcode"], context) :
                null) :
            null;

        context["field"] = "beneficiarycountry";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiarycountry"] : null);
        privateState.beneficiarycountry = defaultValues ?
            (defaultValues["beneficiarycountry"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiarycountry"], context) :
                null) :
            null;

        context["field"] = "backendReferenceId";
        context["metadata"] = (objectMetadata ? objectMetadata["backendReferenceId"] : null);
        privateState.backendReferenceId = defaultValues ?
            (defaultValues["backendReferenceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["backendReferenceId"], context) :
                null) :
            null;

        context["field"] = "checkDateOfIssue";
        context["metadata"] = (objectMetadata ? objectMetadata["checkDateOfIssue"] : null);
        privateState.checkDateOfIssue = defaultValues ?
            (defaultValues["checkDateOfIssue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkDateOfIssue"], context) :
                null) :
            null;

        context["field"] = "checkImage";
        context["metadata"] = (objectMetadata ? objectMetadata["checkImage"] : null);
        privateState.checkImage = defaultValues ?
            (defaultValues["checkImage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkImage"], context) :
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

        context["field"] = "uploadedattachments";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedattachments"] : null);
        privateState.uploadedattachments = defaultValues ?
            (defaultValues["uploadedattachments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedattachments"], context) :
                null) :
            null;

        context["field"] = "validate";
        context["metadata"] = (objectMetadata ? objectMetadata["validate"] : null);
        privateState.validate = defaultValues ?
            (defaultValues["validate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["validate"], context) :
                null) :
            null;

        context["field"] = "overrides";
        context["metadata"] = (objectMetadata ? objectMetadata["overrides"] : null);
        privateState.overrides = defaultValues ?
            (defaultValues["overrides"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["overrides"], context) :
                null) :
            null;

        context["field"] = "charges";
        context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
        privateState.charges = defaultValues ?
            (defaultValues["charges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["charges"], context) :
                null) :
            null;

        context["field"] = "exchangeRate";
        context["metadata"] = (objectMetadata ? objectMetadata["exchangeRate"] : null);
        privateState.exchangeRate = defaultValues ?
            (defaultValues["exchangeRate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exchangeRate"], context) :
                null) :
            null;

        context["field"] = "totalAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
        privateState.totalAmount = defaultValues ?
            (defaultValues["totalAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalAmount"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "uploadMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadMessage"] : null);
        privateState.uploadMessage = defaultValues ?
            (defaultValues["uploadMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadMessage"], context) :
                null) :
            null;

        context["field"] = "deletedDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["deletedDocuments"] : null);
        privateState.deletedDocuments = defaultValues ?
            (defaultValues["deletedDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deletedDocuments"], context) :
                null) :
            null;

        context["field"] = "serviceCharge";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceCharge"] : null);
        privateState.serviceCharge = defaultValues ?
            (defaultValues["serviceCharge"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceCharge"], context) :
                null) :
            null;

        context["field"] = "successfulUploads";
        context["metadata"] = (objectMetadata ? objectMetadata["successfulUploads"] : null);
        privateState.successfulUploads = defaultValues ?
            (defaultValues["successfulUploads"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["successfulUploads"], context) :
                null) :
            null;

        context["field"] = "failedUploads";
        context["metadata"] = (objectMetadata ? objectMetadata["failedUploads"] : null);
        privateState.failedUploads = defaultValues ?
            (defaultValues["failedUploads"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["failedUploads"], context) :
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

        context["field"] = "overrideList";
        context["metadata"] = (objectMetadata ? objectMetadata["overrideList"] : null);
        privateState.overrideList = defaultValues ?
            (defaultValues["overrideList"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["overrideList"], context) :
                null) :
            null;

        context["field"] = "requestId";
        context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
        privateState.requestId = defaultValues ?
            (defaultValues["requestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestId"], context) :
                null) :
            null;

        context["field"] = "createWithPaymentId";
        context["metadata"] = (objectMetadata ? objectMetadata["createWithPaymentId"] : null);
        privateState.createWithPaymentId = defaultValues ?
            (defaultValues["createWithPaymentId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createWithPaymentId"], context) :
                null) :
            null;

        context["field"] = "creditValueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["creditValueDate"] : null);
        privateState.creditValueDate = defaultValues ?
            (defaultValues["creditValueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditValueDate"], context) :
                null) :
            null;

        context["field"] = "intermediaryBicCode";
        context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBicCode"] : null);
        privateState.intermediaryBicCode = defaultValues ?
            (defaultValues["intermediaryBicCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["intermediaryBicCode"], context) :
                null) :
            null;

        context["field"] = "clearingCode";
        context["metadata"] = (objectMetadata ? objectMetadata["clearingCode"] : null);
        privateState.clearingCode = defaultValues ?
            (defaultValues["clearingCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["clearingCode"], context) :
                null) :
            null;

        context["field"] = "e2eReference";
        context["metadata"] = (objectMetadata ? objectMetadata["e2eReference"] : null);
        privateState.e2eReference = defaultValues ?
            (defaultValues["e2eReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["e2eReference"], context) :
                null) :
            null;

        context["field"] = "errorDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["errorDetails"] : null);
        privateState.errorDetails = defaultValues ?
            (defaultValues["errorDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorDetails"], context) :
                null) :
            null;

        context["field"] = "messageDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["messageDetails"] : null);
        privateState.messageDetails = defaultValues ?
            (defaultValues["messageDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageDetails"], context) :
                null) :
            null;

        context["field"] = "beneficiaryPhone";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryPhone"] : null);
        privateState.beneficiaryPhone = defaultValues ?
            (defaultValues["beneficiaryPhone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryPhone"], context) :
                null) :
            null;

        context["field"] = "beneficiaryEmail";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryEmail"] : null);
        privateState.beneficiaryEmail = defaultValues ?
            (defaultValues["beneficiaryEmail"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryEmail"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "isScheduled": {
                get: function() {
                    context["field"] = "isScheduled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isScheduled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isScheduled, context);
                },
                set: function(val) {
                    setterFunctions['isScheduled'].call(this, val, privateState);
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
            "toAccountCurrency": {
                get: function() {
                    context["field"] = "toAccountCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["toAccountCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toAccountCurrency, context);
                },
                set: function(val) {
                    setterFunctions['toAccountCurrency'].call(this, val, privateState);
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
            "p2pContact": {
                get: function() {
                    context["field"] = "p2pContact";
                    context["metadata"] = (objectMetadata ? objectMetadata["p2pContact"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.p2pContact, context);
                },
                set: function(val) {
                    setterFunctions['p2pContact'].call(this, val, privateState);
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
            "payeeAccountNumber": {
                get: function() {
                    context["field"] = "payeeAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['payeeAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payeeAddressLine1": {
                get: function() {
                    context["field"] = "payeeAddressLine1";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeAddressLine1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeAddressLine1, context);
                },
                set: function(val) {
                    setterFunctions['payeeAddressLine1'].call(this, val, privateState);
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
            "payeeNickName": {
                get: function() {
                    context["field"] = "payeeNickName";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeNickName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeNickName, context);
                },
                set: function(val) {
                    setterFunctions['payeeNickName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payeeCurrency": {
                get: function() {
                    context["field"] = "payeeCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeCurrency, context);
                },
                set: function(val) {
                    setterFunctions['payeeCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "wireAccountType": {
                get: function() {
                    context["field"] = "wireAccountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["wireAccountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.wireAccountType, context);
                },
                set: function(val) {
                    setterFunctions['wireAccountType'].call(this, val, privateState);
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
            "routingNumber": {
                get: function() {
                    context["field"] = "routingNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.routingNumber, context);
                },
                set: function(val) {
                    setterFunctions['routingNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cityName": {
                get: function() {
                    context["field"] = "cityName";
                    context["metadata"] = (objectMetadata ? objectMetadata["cityName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cityName, context);
                },
                set: function(val) {
                    setterFunctions['cityName'].call(this, val, privateState);
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
            "bankAddressLine1": {
                get: function() {
                    context["field"] = "bankAddressLine1";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankAddressLine1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankAddressLine1, context);
                },
                set: function(val) {
                    setterFunctions['bankAddressLine1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankAddressLine2": {
                get: function() {
                    context["field"] = "bankAddressLine2";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankAddressLine2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankAddressLine2, context);
                },
                set: function(val) {
                    setterFunctions['bankAddressLine2'].call(this, val, privateState);
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
            "bankZip": {
                get: function() {
                    context["field"] = "bankZip";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankZip"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankZip, context);
                },
                set: function(val) {
                    setterFunctions['bankZip'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payeeType": {
                get: function() {
                    context["field"] = "payeeType";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeType, context);
                },
                set: function(val) {
                    setterFunctions['payeeType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payeeAddressLine2": {
                get: function() {
                    context["field"] = "payeeAddressLine2";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeAddressLine2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeAddressLine2, context);
                },
                set: function(val) {
                    setterFunctions['payeeAddressLine2'].call(this, val, privateState);
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
            "internationalRoutingCode": {
                get: function() {
                    context["field"] = "internationalRoutingCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["internationalRoutingCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.internationalRoutingCode, context);
                },
                set: function(val) {
                    setterFunctions['internationalRoutingCode'].call(this, val, privateState);
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
            "wireTemplateExecution_id": {
                get: function() {
                    context["field"] = "wireTemplateExecution_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["wireTemplateExecution_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.wireTemplateExecution_id, context);
                },
                set: function(val) {
                    setterFunctions['wireTemplateExecution_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bicCode": {
                get: function() {
                    context["field"] = "bicCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["bicCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bicCode, context);
                },
                set: function(val) {
                    setterFunctions['bicCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "BulkWireExecutionDetails": {
                get: function() {
                    context["field"] = "BulkWireExecutionDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["BulkWireExecutionDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.BulkWireExecutionDetails, context);
                },
                set: function(val) {
                    setterFunctions['BulkWireExecutionDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankId": {
                get: function() {
                    context["field"] = "bankId";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankId, context);
                },
                set: function(val) {
                    setterFunctions['bankId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "feeCurrency": {
                get: function() {
                    context["field"] = "feeCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["feeCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.feeCurrency, context);
                },
                set: function(val) {
                    setterFunctions['feeCurrency'].call(this, val, privateState);
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
            "feeAmount": {
                get: function() {
                    context["field"] = "feeAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["feeAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.feeAmount, context);
                },
                set: function(val) {
                    setterFunctions['feeAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryAddressNickName": {
                get: function() {
                    context["field"] = "beneficiaryAddressNickName";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressNickName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryAddressNickName, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryAddressNickName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryAddressLine1": {
                get: function() {
                    context["field"] = "beneficiaryAddressLine1";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryAddressLine1, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryAddressLine1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryCity": {
                get: function() {
                    context["field"] = "beneficiaryCity";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryCity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryCity, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryCity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryZipcode": {
                get: function() {
                    context["field"] = "beneficiaryZipcode";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryZipcode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryZipcode, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryZipcode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiarycountry": {
                get: function() {
                    context["field"] = "beneficiarycountry";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiarycountry"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiarycountry, context);
                },
                set: function(val) {
                    setterFunctions['beneficiarycountry'].call(this, val, privateState);
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
            "checkDateOfIssue": {
                get: function() {
                    context["field"] = "checkDateOfIssue";
                    context["metadata"] = (objectMetadata ? objectMetadata["checkDateOfIssue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.checkDateOfIssue, context);
                },
                set: function(val) {
                    setterFunctions['checkDateOfIssue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "checkImage": {
                get: function() {
                    context["field"] = "checkImage";
                    context["metadata"] = (objectMetadata ? objectMetadata["checkImage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.checkImage, context);
                },
                set: function(val) {
                    setterFunctions['checkImage'].call(this, val, privateState);
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
            "uploadedattachments": {
                get: function() {
                    context["field"] = "uploadedattachments";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadedattachments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadedattachments, context);
                },
                set: function(val) {
                    setterFunctions['uploadedattachments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "validate": {
                get: function() {
                    context["field"] = "validate";
                    context["metadata"] = (objectMetadata ? objectMetadata["validate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.validate, context);
                },
                set: function(val) {
                    setterFunctions['validate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "overrides": {
                get: function() {
                    context["field"] = "overrides";
                    context["metadata"] = (objectMetadata ? objectMetadata["overrides"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.overrides, context);
                },
                set: function(val) {
                    setterFunctions['overrides'].call(this, val, privateState);
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
            "exchangeRate": {
                get: function() {
                    context["field"] = "exchangeRate";
                    context["metadata"] = (objectMetadata ? objectMetadata["exchangeRate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.exchangeRate, context);
                },
                set: function(val) {
                    setterFunctions['exchangeRate'].call(this, val, privateState);
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
            "userId": {
                get: function() {
                    context["field"] = "userId";
                    context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userId, context);
                },
                set: function(val) {
                    setterFunctions['userId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "uploadMessage": {
                get: function() {
                    context["field"] = "uploadMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadMessage, context);
                },
                set: function(val) {
                    setterFunctions['uploadMessage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deletedDocuments": {
                get: function() {
                    context["field"] = "deletedDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["deletedDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deletedDocuments, context);
                },
                set: function(val) {
                    setterFunctions['deletedDocuments'].call(this, val, privateState);
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
            "successfulUploads": {
                get: function() {
                    context["field"] = "successfulUploads";
                    context["metadata"] = (objectMetadata ? objectMetadata["successfulUploads"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.successfulUploads, context);
                },
                set: function(val) {
                    setterFunctions['successfulUploads'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "failedUploads": {
                get: function() {
                    context["field"] = "failedUploads";
                    context["metadata"] = (objectMetadata ? objectMetadata["failedUploads"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.failedUploads, context);
                },
                set: function(val) {
                    setterFunctions['failedUploads'].call(this, val, privateState);
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
            "overrideList": {
                get: function() {
                    context["field"] = "overrideList";
                    context["metadata"] = (objectMetadata ? objectMetadata["overrideList"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.overrideList, context);
                },
                set: function(val) {
                    setterFunctions['overrideList'].call(this, val, privateState);
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
            "createWithPaymentId": {
                get: function() {
                    context["field"] = "createWithPaymentId";
                    context["metadata"] = (objectMetadata ? objectMetadata["createWithPaymentId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createWithPaymentId, context);
                },
                set: function(val) {
                    setterFunctions['createWithPaymentId'].call(this, val, privateState);
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
            "intermediaryBicCode": {
                get: function() {
                    context["field"] = "intermediaryBicCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBicCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.intermediaryBicCode, context);
                },
                set: function(val) {
                    setterFunctions['intermediaryBicCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "clearingCode": {
                get: function() {
                    context["field"] = "clearingCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["clearingCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.clearingCode, context);
                },
                set: function(val) {
                    setterFunctions['clearingCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "e2eReference": {
                get: function() {
                    context["field"] = "e2eReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["e2eReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.e2eReference, context);
                },
                set: function(val) {
                    setterFunctions['e2eReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errorDetails": {
                get: function() {
                    context["field"] = "errorDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorDetails, context);
                },
                set: function(val) {
                    setterFunctions['errorDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "messageDetails": {
                get: function() {
                    context["field"] = "messageDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["messageDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messageDetails, context);
                },
                set: function(val) {
                    setterFunctions['messageDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryPhone": {
                get: function() {
                    context["field"] = "beneficiaryPhone";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryPhone"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryPhone, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryPhone'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryEmail": {
                get: function() {
                    context["field"] = "beneficiaryEmail";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryEmail"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryEmail, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryEmail'].call(this, val, privateState);
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
            privateState.Transaction_id = value ? (value["Transaction_id"] ? value["Transaction_id"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.frequencyEndDate = value ? (value["frequencyEndDate"] ? value["frequencyEndDate"] : null) : null;
            privateState.frequencyType = value ? (value["frequencyType"] ? value["frequencyType"] : null) : null;
            privateState.fromAccountNumber = value ? (value["fromAccountNumber"] ? value["fromAccountNumber"] : null) : null;
            privateState.isScheduled = value ? (value["isScheduled"] ? value["isScheduled"] : null) : null;
            privateState.scheduledDate = value ? (value["scheduledDate"] ? value["scheduledDate"] : null) : null;
            privateState.toAccountNumber = value ? (value["toAccountNumber"] ? value["toAccountNumber"] : null) : null;
            privateState.transactionsNotes = value ? (value["transactionsNotes"] ? value["transactionsNotes"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.transactionCurrency = value ? (value["transactionCurrency"] ? value["transactionCurrency"] : null) : null;
            privateState.MFAAttributes = value ? (value["MFAAttributes"] ? value["MFAAttributes"] : null) : null;
            privateState.serviceName = value ? (value["serviceName"] ? value["serviceName"] : null) : null;
            privateState.fromAccountCurrency = value ? (value["fromAccountCurrency"] ? value["fromAccountCurrency"] : null) : null;
            privateState.toAccountCurrency = value ? (value["toAccountCurrency"] ? value["toAccountCurrency"] : null) : null;
            privateState.numberOfRecurrences = value ? (value["numberOfRecurrences"] ? value["numberOfRecurrences"] : null) : null;
            privateState.p2pContact = value ? (value["p2pContact"] ? value["p2pContact"] : null) : null;
            privateState.personId = value ? (value["personId"] ? value["personId"] : null) : null;
            privateState.deliverBy = value ? (value["deliverBy"] ? value["deliverBy"] : null) : null;
            privateState.zipCode = value ? (value["zipCode"] ? value["zipCode"] : null) : null;
            privateState.billerId = value ? (value["billerId"] ? value["billerId"] : null) : null;
            privateState.billid = value ? (value["billid"] ? value["billid"] : null) : null;
            privateState.payeeId = value ? (value["payeeId"] ? value["payeeId"] : null) : null;
            privateState.payeeAccountNumber = value ? (value["payeeAccountNumber"] ? value["payeeAccountNumber"] : null) : null;
            privateState.payeeAddressLine1 = value ? (value["payeeAddressLine1"] ? value["payeeAddressLine1"] : null) : null;
            privateState.payeeName = value ? (value["payeeName"] ? value["payeeName"] : null) : null;
            privateState.payeeNickName = value ? (value["payeeNickName"] ? value["payeeNickName"] : null) : null;
            privateState.payeeCurrency = value ? (value["payeeCurrency"] ? value["payeeCurrency"] : null) : null;
            privateState.wireAccountType = value ? (value["wireAccountType"] ? value["wireAccountType"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.routingNumber = value ? (value["routingNumber"] ? value["routingNumber"] : null) : null;
            privateState.cityName = value ? (value["cityName"] ? value["cityName"] : null) : null;
            privateState.state = value ? (value["state"] ? value["state"] : null) : null;
            privateState.bankAddressLine1 = value ? (value["bankAddressLine1"] ? value["bankAddressLine1"] : null) : null;
            privateState.bankAddressLine2 = value ? (value["bankAddressLine2"] ? value["bankAddressLine2"] : null) : null;
            privateState.bankCity = value ? (value["bankCity"] ? value["bankCity"] : null) : null;
            privateState.bankState = value ? (value["bankState"] ? value["bankState"] : null) : null;
            privateState.bankZip = value ? (value["bankZip"] ? value["bankZip"] : null) : null;
            privateState.payeeType = value ? (value["payeeType"] ? value["payeeType"] : null) : null;
            privateState.payeeAddressLine2 = value ? (value["payeeAddressLine2"] ? value["payeeAddressLine2"] : null) : null;
            privateState.swiftCode = value ? (value["swiftCode"] ? value["swiftCode"] : null) : null;
            privateState.country = value ? (value["country"] ? value["country"] : null) : null;
            privateState.internationalRoutingCode = value ? (value["internationalRoutingCode"] ? value["internationalRoutingCode"] : null) : null;
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
            privateState.iban = value ? (value["iban"] ? value["iban"] : null) : null;
            privateState.wireTemplateExecution_id = value ? (value["wireTemplateExecution_id"] ? value["wireTemplateExecution_id"] : null) : null;
            privateState.bicCode = value ? (value["bicCode"] ? value["bicCode"] : null) : null;
            privateState.BulkWireExecutionDetails = value ? (value["BulkWireExecutionDetails"] ? value["BulkWireExecutionDetails"] : null) : null;
            privateState.bankId = value ? (value["bankId"] ? value["bankId"] : null) : null;
            privateState.feeCurrency = value ? (value["feeCurrency"] ? value["feeCurrency"] : null) : null;
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.paidBy = value ? (value["paidBy"] ? value["paidBy"] : null) : null;
            privateState.paymentType = value ? (value["paymentType"] ? value["paymentType"] : null) : null;
            privateState.feeAmount = value ? (value["feeAmount"] ? value["feeAmount"] : null) : null;
            privateState.beneficiaryAddressNickName = value ? (value["beneficiaryAddressNickName"] ? value["beneficiaryAddressNickName"] : null) : null;
            privateState.beneficiaryAddressLine1 = value ? (value["beneficiaryAddressLine1"] ? value["beneficiaryAddressLine1"] : null) : null;
            privateState.beneficiaryCity = value ? (value["beneficiaryCity"] ? value["beneficiaryCity"] : null) : null;
            privateState.beneficiaryZipcode = value ? (value["beneficiaryZipcode"] ? value["beneficiaryZipcode"] : null) : null;
            privateState.beneficiarycountry = value ? (value["beneficiarycountry"] ? value["beneficiarycountry"] : null) : null;
            privateState.backendReferenceId = value ? (value["backendReferenceId"] ? value["backendReferenceId"] : null) : null;
            privateState.checkDateOfIssue = value ? (value["checkDateOfIssue"] ? value["checkDateOfIssue"] : null) : null;
            privateState.checkImage = value ? (value["checkImage"] ? value["checkImage"] : null) : null;
            privateState.checkImageBack = value ? (value["checkImageBack"] ? value["checkImageBack"] : null) : null;
            privateState.toAccountType = value ? (value["toAccountType"] ? value["toAccountType"] : null) : null;
            privateState.profileId = value ? (value["profileId"] ? value["profileId"] : null) : null;
            privateState.uploadedattachments = value ? (value["uploadedattachments"] ? value["uploadedattachments"] : null) : null;
            privateState.validate = value ? (value["validate"] ? value["validate"] : null) : null;
            privateState.overrides = value ? (value["overrides"] ? value["overrides"] : null) : null;
            privateState.charges = value ? (value["charges"] ? value["charges"] : null) : null;
            privateState.exchangeRate = value ? (value["exchangeRate"] ? value["exchangeRate"] : null) : null;
            privateState.totalAmount = value ? (value["totalAmount"] ? value["totalAmount"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.uploadMessage = value ? (value["uploadMessage"] ? value["uploadMessage"] : null) : null;
            privateState.deletedDocuments = value ? (value["deletedDocuments"] ? value["deletedDocuments"] : null) : null;
            privateState.serviceCharge = value ? (value["serviceCharge"] ? value["serviceCharge"] : null) : null;
            privateState.successfulUploads = value ? (value["successfulUploads"] ? value["successfulUploads"] : null) : null;
            privateState.failedUploads = value ? (value["failedUploads"] ? value["failedUploads"] : null) : null;
            privateState.transactionAmount = value ? (value["transactionAmount"] ? value["transactionAmount"] : null) : null;
            privateState.convertedAmount = value ? (value["convertedAmount"] ? value["convertedAmount"] : null) : null;
            privateState.overrideList = value ? (value["overrideList"] ? value["overrideList"] : null) : null;
            privateState.requestId = value ? (value["requestId"] ? value["requestId"] : null) : null;
            privateState.createWithPaymentId = value ? (value["createWithPaymentId"] ? value["createWithPaymentId"] : null) : null;
            privateState.creditValueDate = value ? (value["creditValueDate"] ? value["creditValueDate"] : null) : null;
            privateState.intermediaryBicCode = value ? (value["intermediaryBicCode"] ? value["intermediaryBicCode"] : null) : null;
            privateState.clearingCode = value ? (value["clearingCode"] ? value["clearingCode"] : null) : null;
            privateState.e2eReference = value ? (value["e2eReference"] ? value["e2eReference"] : null) : null;
            privateState.errorDetails = value ? (value["errorDetails"] ? value["errorDetails"] : null) : null;
            privateState.messageDetails = value ? (value["messageDetails"] ? value["messageDetails"] : null) : null;
            privateState.beneficiaryPhone = value ? (value["beneficiaryPhone"] ? value["beneficiaryPhone"] : null) : null;
            privateState.beneficiaryEmail = value ? (value["beneficiaryEmail"] ? value["beneficiaryEmail"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Payment_P2P);

    //Create new class level validator object
    BaseModel.Validator.call(Payment_P2P);

    var registerValidatorBackup = Payment_P2P.registerValidator;

    Payment_P2P.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Payment_P2P.isValid(this, propName, val)) {
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
    //For Operation 'createTransfer' with service id 'CreateP2PTransaction6580'
     Payment_P2P.createTransfer = function(params, onCompletion){
        return Payment_P2P.customVerb('createTransfer', params, onCompletion);
     };

    var relations = [];

    Payment_P2P.relations = relations;

    Payment_P2P.prototype.isValid = function() {
        return Payment_P2P.isValid(this);
    };

    Payment_P2P.prototype.objModelName = "Payment_P2P";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Payment_P2P.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("DigitalTransfer", "Payment_P2P", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Payment_P2P.clone = function(objectToClone) {
        var clonedObj = new Payment_P2P();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Payment_P2P;
});