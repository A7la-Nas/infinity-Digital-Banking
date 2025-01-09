/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "OneTimeTransfer", "objectService" : "Transfers"};

    var setterFunctions = {
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ExternalAccountNumber: function(val, state) {
            context["field"] = "ExternalAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["ExternalAccountNumber"] : null);
            state['ExternalAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        firstRecordNumber: function(val, state) {
            context["field"] = "firstRecordNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["firstRecordNumber"] : null);
            state['firstRecordNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        fromAccountName: function(val, state) {
            context["field"] = "fromAccountName";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountName"] : null);
            state['fromAccountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        lastRecordNumber: function(val, state) {
            context["field"] = "lastRecordNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["lastRecordNumber"] : null);
            state['lastRecordNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        numberOfRecurrences: function(val, state) {
            context["field"] = "numberOfRecurrences";
            context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecurrences"] : null);
            state['numberOfRecurrences'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        scheduledDate: function(val, state) {
            context["field"] = "scheduledDate";
            context["metadata"] = (objectMetadata ? objectMetadata["scheduledDate"] : null);
            state['scheduledDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        statusDescription: function(val, state) {
            context["field"] = "statusDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["statusDescription"] : null);
            state['statusDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toAccountName: function(val, state) {
            context["field"] = "toAccountName";
            context["metadata"] = (objectMetadata ? objectMetadata["toAccountName"] : null);
            state['toAccountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toAccountNumber: function(val, state) {
            context["field"] = "toAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["toAccountNumber"] : null);
            state['toAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalAmount: function(val, state) {
            context["field"] = "totalAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
            state['totalAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionId: function(val, state) {
            context["field"] = "transactionId";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
            state['transactionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        referenceId: function(val, state) {
            context["field"] = "referenceId";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceId"] : null);
            state['referenceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        personId: function(val, state) {
            context["field"] = "personId";
            context["metadata"] = (objectMetadata ? objectMetadata["personId"] : null);
            state['personId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftCode: function(val, state) {
            context["field"] = "swiftCode";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
            state['swiftCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IBAN: function(val, state) {
            context["field"] = "IBAN";
            context["metadata"] = (objectMetadata ? objectMetadata["IBAN"] : null);
            state['IBAN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCurrency: function(val, state) {
            context["field"] = "transactionCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
            state['transactionCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exchangeRate: function(val, state) {
            context["field"] = "exchangeRate";
            context["metadata"] = (objectMetadata ? objectMetadata["exchangeRate"] : null);
            state['exchangeRate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        versionNumber: function(val, state) {
            context["field"] = "versionNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["versionNumber"] : null);
            state['versionNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        bicId: function(val, state) {
            context["field"] = "bicId";
            context["metadata"] = (objectMetadata ? objectMetadata["bicId"] : null);
            state['bicId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        validate: function(val, state) {
            context["field"] = "validate";
            context["metadata"] = (objectMetadata ? objectMetadata["validate"] : null);
            state['validate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileNames: function(val, state) {
            context["field"] = "fileNames";
            context["metadata"] = (objectMetadata ? objectMetadata["fileNames"] : null);
            state['fileNames'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errcode: function(val, state) {
            context["field"] = "errcode";
            context["metadata"] = (objectMetadata ? objectMetadata["errcode"] : null);
            state['errcode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileName: function(val, state) {
            context["field"] = "fileName";
            context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
            state['fileName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileID: function(val, state) {
            context["field"] = "fileID";
            context["metadata"] = (objectMetadata ? objectMetadata["fileID"] : null);
            state['fileID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        charges: function(val, state) {
            context["field"] = "charges";
            context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
            state['charges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadedattachments: function(val, state) {
            context["field"] = "uploadedattachments";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedattachments"] : null);
            state['uploadedattachments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionPeriod: function(val, state) {
            context["field"] = "transactionPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionPeriod"] : null);
            state['transactionPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pendingApproval: function(val, state) {
            context["field"] = "pendingApproval";
            context["metadata"] = (objectMetadata ? objectMetadata["pendingApproval"] : null);
            state['pendingApproval'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        overrides: function(val, state) {
            context["field"] = "overrides";
            context["metadata"] = (objectMetadata ? objectMetadata["overrides"] : null);
            state['overrides'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryBankName: function(val, state) {
            context["field"] = "beneficiaryBankName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankName"] : null);
            state['beneficiaryBankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryAddressLine1: function(val, state) {
            context["field"] = "beneficiaryAddressLine1";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine1"] : null);
            state['beneficiaryAddressLine1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryAddressLine2: function(val, state) {
            context["field"] = "beneficiaryAddressLine2";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine2"] : null);
            state['beneficiaryAddressLine2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        beneficiaryState: function(val, state) {
            context["field"] = "beneficiaryState";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryState"] : null);
            state['beneficiaryState'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        quoteCurrency: function(val, state) {
            context["field"] = "quoteCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["quoteCurrency"] : null);
            state['quoteCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chargeBearer: function(val, state) {
            context["field"] = "chargeBearer";
            context["metadata"] = (objectMetadata ? objectMetadata["chargeBearer"] : null);
            state['chargeBearer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        systemId: function(val, state) {
            context["field"] = "systemId";
            context["metadata"] = (objectMetadata ? objectMetadata["systemId"] : null);
            state['systemId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentStatus: function(val, state) {
            context["field"] = "currentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["currentStatus"] : null);
            state['currentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        endToEndReference: function(val, state) {
            context["field"] = "endToEndReference";
            context["metadata"] = (objectMetadata ? objectMetadata["endToEndReference"] : null);
            state['endToEndReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromAccountIBAN: function(val, state) {
            context["field"] = "fromAccountIBAN";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountIBAN"] : null);
            state['fromAccountIBAN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentCurrencyId: function(val, state) {
            context["field"] = "paymentCurrencyId";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentCurrencyId"] : null);
            state['paymentCurrencyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderingCustomerId: function(val, state) {
            context["field"] = "orderingCustomerId";
            context["metadata"] = (objectMetadata ? objectMetadata["orderingCustomerId"] : null);
            state['orderingCustomerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cashlessEmail: function(val, state) {
            context["field"] = "cashlessEmail";
            context["metadata"] = (objectMetadata ? objectMetadata["cashlessEmail"] : null);
            state['cashlessEmail'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cashlessMode: function(val, state) {
            context["field"] = "cashlessMode";
            context["metadata"] = (objectMetadata ? objectMetadata["cashlessMode"] : null);
            state['cashlessMode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cashlessOTP: function(val, state) {
            context["field"] = "cashlessOTP";
            context["metadata"] = (objectMetadata ? objectMetadata["cashlessOTP"] : null);
            state['cashlessOTP'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cashlessOTPValidDate: function(val, state) {
            context["field"] = "cashlessOTPValidDate";
            context["metadata"] = (objectMetadata ? objectMetadata["cashlessOTPValidDate"] : null);
            state['cashlessOTPValidDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cashlessPersonName: function(val, state) {
            context["field"] = "cashlessPersonName";
            context["metadata"] = (objectMetadata ? objectMetadata["cashlessPersonName"] : null);
            state['cashlessPersonName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cashlessPhone: function(val, state) {
            context["field"] = "cashlessPhone";
            context["metadata"] = (objectMetadata ? objectMetadata["cashlessPhone"] : null);
            state['cashlessPhone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cashlessSecurityCode: function(val, state) {
            context["field"] = "cashlessSecurityCode";
            context["metadata"] = (objectMetadata ? objectMetadata["cashlessSecurityCode"] : null);
            state['cashlessSecurityCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cashWithdrawalTransactionStatus: function(val, state) {
            context["field"] = "cashWithdrawalTransactionStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["cashWithdrawalTransactionStatus"] : null);
            state['cashWithdrawalTransactionStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        category: function(val, state) {
            context["field"] = "category";
            context["metadata"] = (objectMetadata ? objectMetadata["category"] : null);
            state['category'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        frequencyStartDate: function(val, state) {
            context["field"] = "frequencyStartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["frequencyStartDate"] : null);
            state['frequencyStartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromAccountBalance: function(val, state) {
            context["field"] = "fromAccountBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountBalance"] : null);
            state['fromAccountBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromAccountType: function(val, state) {
            context["field"] = "fromAccountType";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountType"] : null);
            state['fromAccountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromNickName: function(val, state) {
            context["field"] = "fromNickName";
            context["metadata"] = (objectMetadata ? objectMetadata["fromNickName"] : null);
            state['fromNickName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        hasDepositImage: function(val, state) {
            context["field"] = "hasDepositImage";
            context["metadata"] = (objectMetadata ? objectMetadata["hasDepositImage"] : null);
            state['hasDepositImage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeId: function(val, state) {
            context["field"] = "payeeId";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
            state['payeeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeNickName: function(val, state) {
            context["field"] = "payeeNickName";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeNickName"] : null);
            state['payeeNickName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payPersonEmail: function(val, state) {
            context["field"] = "payPersonEmail";
            context["metadata"] = (objectMetadata ? objectMetadata["payPersonEmail"] : null);
            state['payPersonEmail'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payPersonName: function(val, state) {
            context["field"] = "payPersonName";
            context["metadata"] = (objectMetadata ? objectMetadata["payPersonName"] : null);
            state['payPersonName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recurrenceDesc: function(val, state) {
            context["field"] = "recurrenceDesc";
            context["metadata"] = (objectMetadata ? objectMetadata["recurrenceDesc"] : null);
            state['recurrenceDesc'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payPersonPhone: function(val, state) {
            context["field"] = "payPersonPhone";
            context["metadata"] = (objectMetadata ? objectMetadata["payPersonPhone"] : null);
            state['payPersonPhone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toAccountType: function(val, state) {
            context["field"] = "toAccountType";
            context["metadata"] = (objectMetadata ? objectMetadata["toAccountType"] : null);
            state['toAccountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionComments: function(val, state) {
            context["field"] = "transactionComments";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionComments"] : null);
            state['transactionComments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionDate: function(val, state) {
            context["field"] = "transactionDate";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionDate"] : null);
            state['transactionDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortCode: function(val, state) {
            context["field"] = "sortCode";
            context["metadata"] = (objectMetadata ? objectMetadata["sortCode"] : null);
            state['sortCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fee: function(val, state) {
            context["field"] = "fee";
            context["metadata"] = (objectMetadata ? objectMetadata["fee"] : null);
            state['fee'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        feeCurrency: function(val, state) {
            context["field"] = "feeCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["feeCurrency"] : null);
            state['feeCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        feePaidByReceipent: function(val, state) {
            context["field"] = "feePaidByReceipent";
            context["metadata"] = (objectMetadata ? objectMetadata["feePaidByReceipent"] : null);
            state['feePaidByReceipent'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        convertedAmount: function(val, state) {
            context["field"] = "convertedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["convertedAmount"] : null);
            state['convertedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        baseCurrency: function(val, state) {
            context["field"] = "baseCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["baseCurrency"] : null);
            state['baseCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isInternationalAccount: function(val, state) {
            context["field"] = "isInternationalAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["isInternationalAccount"] : null);
            state['isInternationalAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isBusinessPayee: function(val, state) {
            context["field"] = "isBusinessPayee";
            context["metadata"] = (objectMetadata ? objectMetadata["isBusinessPayee"] : null);
            state['isBusinessPayee'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        order: function(val, state) {
            context["field"] = "order";
            context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
            state['order'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortBy: function(val, state) {
            context["field"] = "sortBy";
            context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
            state['sortBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchType: function(val, state) {
            context["field"] = "searchType";
            context["metadata"] = (objectMetadata ? objectMetadata["searchType"] : null);
            state['searchType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchDescription: function(val, state) {
            context["field"] = "searchDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["searchDescription"] : null);
            state['searchDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchMinAmount: function(val, state) {
            context["field"] = "searchMinAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["searchMinAmount"] : null);
            state['searchMinAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchMaxAmount: function(val, state) {
            context["field"] = "searchMaxAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["searchMaxAmount"] : null);
            state['searchMaxAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchAmount: function(val, state) {
            context["field"] = "searchAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["searchAmount"] : null);
            state['searchAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchStartDate: function(val, state) {
            context["field"] = "searchStartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
            state['searchStartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchEndDate: function(val, state) {
            context["field"] = "searchEndDate";
            context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
            state['searchEndDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchDateRange: function(val, state) {
            context["field"] = "searchDateRange";
            context["metadata"] = (objectMetadata ? objectMetadata["searchDateRange"] : null);
            state['searchDateRange'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        checkNumber: function(val, state) {
            context["field"] = "checkNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["checkNumber"] : null);
            state['checkNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromCheckNumber: function(val, state) {
            context["field"] = "fromCheckNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["fromCheckNumber"] : null);
            state['fromCheckNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchTransactionType: function(val, state) {
            context["field"] = "searchTransactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["searchTransactionType"] : null);
            state['searchTransactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MoreRecordsToken: function(val, state) {
            context["field"] = "MoreRecordsToken";
            context["metadata"] = (objectMetadata ? objectMetadata["MoreRecordsToken"] : null);
            state['MoreRecordsToken'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkReference: function(val, state) {
            context["field"] = "bulkReference";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkReference"] : null);
            state['bulkReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitAccountId: function(val, state) {
            context["field"] = "debitAccountId";
            context["metadata"] = (objectMetadata ? objectMetadata["debitAccountId"] : null);
            state['debitAccountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentPaymentState: function(val, state) {
            context["field"] = "currentPaymentState";
            context["metadata"] = (objectMetadata ? objectMetadata["currentPaymentState"] : null);
            state['currentPaymentState'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function OneTimeTransfer(defaultValues) {
        var privateState = {};
        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "ExternalAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["ExternalAccountNumber"] : null);
        privateState.ExternalAccountNumber = defaultValues ?
            (defaultValues["ExternalAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ExternalAccountNumber"], context) :
                null) :
            null;

        context["field"] = "firstRecordNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["firstRecordNumber"] : null);
        privateState.firstRecordNumber = defaultValues ?
            (defaultValues["firstRecordNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["firstRecordNumber"], context) :
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

        context["field"] = "fromAccountName";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountName"] : null);
        privateState.fromAccountName = defaultValues ?
            (defaultValues["fromAccountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountName"], context) :
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

        context["field"] = "lastRecordNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["lastRecordNumber"] : null);
        privateState.lastRecordNumber = defaultValues ?
            (defaultValues["lastRecordNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastRecordNumber"], context) :
                null) :
            null;

        context["field"] = "numberOfRecurrences";
        context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecurrences"] : null);
        privateState.numberOfRecurrences = defaultValues ?
            (defaultValues["numberOfRecurrences"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["numberOfRecurrences"], context) :
                null) :
            null;

        context["field"] = "scheduledDate";
        context["metadata"] = (objectMetadata ? objectMetadata["scheduledDate"] : null);
        privateState.scheduledDate = defaultValues ?
            (defaultValues["scheduledDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["scheduledDate"], context) :
                null) :
            null;

        context["field"] = "statusDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["statusDescription"] : null);
        privateState.statusDescription = defaultValues ?
            (defaultValues["statusDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["statusDescription"], context) :
                null) :
            null;

        context["field"] = "toAccountName";
        context["metadata"] = (objectMetadata ? objectMetadata["toAccountName"] : null);
        privateState.toAccountName = defaultValues ?
            (defaultValues["toAccountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toAccountName"], context) :
                null) :
            null;

        context["field"] = "toAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["toAccountNumber"] : null);
        privateState.toAccountNumber = defaultValues ?
            (defaultValues["toAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toAccountNumber"], context) :
                null) :
            null;

        context["field"] = "totalAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
        privateState.totalAmount = defaultValues ?
            (defaultValues["totalAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalAmount"], context) :
                null) :
            null;

        context["field"] = "transactionId";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
        privateState.transactionId = defaultValues ?
            (defaultValues["transactionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionId"], context) :
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

        context["field"] = "referenceId";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceId"] : null);
        privateState.referenceId = defaultValues ?
            (defaultValues["referenceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceId"], context) :
                null) :
            null;

        context["field"] = "personId";
        context["metadata"] = (objectMetadata ? objectMetadata["personId"] : null);
        privateState.personId = defaultValues ?
            (defaultValues["personId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["personId"], context) :
                null) :
            null;

        context["field"] = "swiftCode";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
        privateState.swiftCode = defaultValues ?
            (defaultValues["swiftCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftCode"], context) :
                null) :
            null;

        context["field"] = "IBAN";
        context["metadata"] = (objectMetadata ? objectMetadata["IBAN"] : null);
        privateState.IBAN = defaultValues ?
            (defaultValues["IBAN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IBAN"], context) :
                null) :
            null;

        context["field"] = "transactionCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
        privateState.transactionCurrency = defaultValues ?
            (defaultValues["transactionCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCurrency"], context) :
                null) :
            null;

        context["field"] = "exchangeRate";
        context["metadata"] = (objectMetadata ? objectMetadata["exchangeRate"] : null);
        privateState.exchangeRate = defaultValues ?
            (defaultValues["exchangeRate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exchangeRate"], context) :
                null) :
            null;

        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
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

        context["field"] = "versionNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["versionNumber"] : null);
        privateState.versionNumber = defaultValues ?
            (defaultValues["versionNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["versionNumber"], context) :
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

        context["field"] = "bicId";
        context["metadata"] = (objectMetadata ? objectMetadata["bicId"] : null);
        privateState.bicId = defaultValues ?
            (defaultValues["bicId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bicId"], context) :
                null) :
            null;

        context["field"] = "validate";
        context["metadata"] = (objectMetadata ? objectMetadata["validate"] : null);
        privateState.validate = defaultValues ?
            (defaultValues["validate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["validate"], context) :
                null) :
            null;

        context["field"] = "fileNames";
        context["metadata"] = (objectMetadata ? objectMetadata["fileNames"] : null);
        privateState.fileNames = defaultValues ?
            (defaultValues["fileNames"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileNames"], context) :
                null) :
            null;

        context["field"] = "errcode";
        context["metadata"] = (objectMetadata ? objectMetadata["errcode"] : null);
        privateState.errcode = defaultValues ?
            (defaultValues["errcode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errcode"], context) :
                null) :
            null;

        context["field"] = "fileName";
        context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
        privateState.fileName = defaultValues ?
            (defaultValues["fileName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileName"], context) :
                null) :
            null;

        context["field"] = "fileID";
        context["metadata"] = (objectMetadata ? objectMetadata["fileID"] : null);
        privateState.fileID = defaultValues ?
            (defaultValues["fileID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileID"], context) :
                null) :
            null;

        context["field"] = "charges";
        context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
        privateState.charges = defaultValues ?
            (defaultValues["charges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["charges"], context) :
                null) :
            null;

        context["field"] = "uploadedattachments";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedattachments"] : null);
        privateState.uploadedattachments = defaultValues ?
            (defaultValues["uploadedattachments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedattachments"], context) :
                null) :
            null;

        context["field"] = "transactionPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionPeriod"] : null);
        privateState.transactionPeriod = defaultValues ?
            (defaultValues["transactionPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionPeriod"], context) :
                null) :
            null;

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "pendingApproval";
        context["metadata"] = (objectMetadata ? objectMetadata["pendingApproval"] : null);
        privateState.pendingApproval = defaultValues ?
            (defaultValues["pendingApproval"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pendingApproval"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
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

        context["field"] = "overrides";
        context["metadata"] = (objectMetadata ? objectMetadata["overrides"] : null);
        privateState.overrides = defaultValues ?
            (defaultValues["overrides"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["overrides"], context) :
                null) :
            null;

        context["field"] = "beneficiaryBankName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankName"] : null);
        privateState.beneficiaryBankName = defaultValues ?
            (defaultValues["beneficiaryBankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryBankName"], context) :
                null) :
            null;

        context["field"] = "beneficiaryAddressLine1";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine1"] : null);
        privateState.beneficiaryAddressLine1 = defaultValues ?
            (defaultValues["beneficiaryAddressLine1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryAddressLine1"], context) :
                null) :
            null;

        context["field"] = "beneficiaryAddressLine2";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine2"] : null);
        privateState.beneficiaryAddressLine2 = defaultValues ?
            (defaultValues["beneficiaryAddressLine2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryAddressLine2"], context) :
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

        context["field"] = "beneficiaryState";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryState"] : null);
        privateState.beneficiaryState = defaultValues ?
            (defaultValues["beneficiaryState"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryState"], context) :
                null) :
            null;

        context["field"] = "quoteCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["quoteCurrency"] : null);
        privateState.quoteCurrency = defaultValues ?
            (defaultValues["quoteCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["quoteCurrency"], context) :
                null) :
            null;

        context["field"] = "chargeBearer";
        context["metadata"] = (objectMetadata ? objectMetadata["chargeBearer"] : null);
        privateState.chargeBearer = defaultValues ?
            (defaultValues["chargeBearer"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chargeBearer"], context) :
                null) :
            null;

        context["field"] = "systemId";
        context["metadata"] = (objectMetadata ? objectMetadata["systemId"] : null);
        privateState.systemId = defaultValues ?
            (defaultValues["systemId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["systemId"], context) :
                null) :
            null;

        context["field"] = "currentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["currentStatus"] : null);
        privateState.currentStatus = defaultValues ?
            (defaultValues["currentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentStatus"], context) :
                null) :
            null;

        context["field"] = "endToEndReference";
        context["metadata"] = (objectMetadata ? objectMetadata["endToEndReference"] : null);
        privateState.endToEndReference = defaultValues ?
            (defaultValues["endToEndReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["endToEndReference"], context) :
                null) :
            null;

        context["field"] = "fromAccountIBAN";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountIBAN"] : null);
        privateState.fromAccountIBAN = defaultValues ?
            (defaultValues["fromAccountIBAN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountIBAN"], context) :
                null) :
            null;

        context["field"] = "paymentCurrencyId";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentCurrencyId"] : null);
        privateState.paymentCurrencyId = defaultValues ?
            (defaultValues["paymentCurrencyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentCurrencyId"], context) :
                null) :
            null;

        context["field"] = "orderingCustomerId";
        context["metadata"] = (objectMetadata ? objectMetadata["orderingCustomerId"] : null);
        privateState.orderingCustomerId = defaultValues ?
            (defaultValues["orderingCustomerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderingCustomerId"], context) :
                null) :
            null;

        context["field"] = "cashlessEmail";
        context["metadata"] = (objectMetadata ? objectMetadata["cashlessEmail"] : null);
        privateState.cashlessEmail = defaultValues ?
            (defaultValues["cashlessEmail"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cashlessEmail"], context) :
                null) :
            null;

        context["field"] = "cashlessMode";
        context["metadata"] = (objectMetadata ? objectMetadata["cashlessMode"] : null);
        privateState.cashlessMode = defaultValues ?
            (defaultValues["cashlessMode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cashlessMode"], context) :
                null) :
            null;

        context["field"] = "cashlessOTP";
        context["metadata"] = (objectMetadata ? objectMetadata["cashlessOTP"] : null);
        privateState.cashlessOTP = defaultValues ?
            (defaultValues["cashlessOTP"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cashlessOTP"], context) :
                null) :
            null;

        context["field"] = "cashlessOTPValidDate";
        context["metadata"] = (objectMetadata ? objectMetadata["cashlessOTPValidDate"] : null);
        privateState.cashlessOTPValidDate = defaultValues ?
            (defaultValues["cashlessOTPValidDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cashlessOTPValidDate"], context) :
                null) :
            null;

        context["field"] = "cashlessPersonName";
        context["metadata"] = (objectMetadata ? objectMetadata["cashlessPersonName"] : null);
        privateState.cashlessPersonName = defaultValues ?
            (defaultValues["cashlessPersonName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cashlessPersonName"], context) :
                null) :
            null;

        context["field"] = "cashlessPhone";
        context["metadata"] = (objectMetadata ? objectMetadata["cashlessPhone"] : null);
        privateState.cashlessPhone = defaultValues ?
            (defaultValues["cashlessPhone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cashlessPhone"], context) :
                null) :
            null;

        context["field"] = "cashlessSecurityCode";
        context["metadata"] = (objectMetadata ? objectMetadata["cashlessSecurityCode"] : null);
        privateState.cashlessSecurityCode = defaultValues ?
            (defaultValues["cashlessSecurityCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cashlessSecurityCode"], context) :
                null) :
            null;

        context["field"] = "cashWithdrawalTransactionStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["cashWithdrawalTransactionStatus"] : null);
        privateState.cashWithdrawalTransactionStatus = defaultValues ?
            (defaultValues["cashWithdrawalTransactionStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cashWithdrawalTransactionStatus"], context) :
                null) :
            null;

        context["field"] = "category";
        context["metadata"] = (objectMetadata ? objectMetadata["category"] : null);
        privateState.category = defaultValues ?
            (defaultValues["category"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["category"], context) :
                null) :
            null;

        context["field"] = "frequencyStartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["frequencyStartDate"] : null);
        privateState.frequencyStartDate = defaultValues ?
            (defaultValues["frequencyStartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["frequencyStartDate"], context) :
                null) :
            null;

        context["field"] = "fromAccountBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountBalance"] : null);
        privateState.fromAccountBalance = defaultValues ?
            (defaultValues["fromAccountBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountBalance"], context) :
                null) :
            null;

        context["field"] = "fromAccountType";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountType"] : null);
        privateState.fromAccountType = defaultValues ?
            (defaultValues["fromAccountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountType"], context) :
                null) :
            null;

        context["field"] = "fromNickName";
        context["metadata"] = (objectMetadata ? objectMetadata["fromNickName"] : null);
        privateState.fromNickName = defaultValues ?
            (defaultValues["fromNickName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromNickName"], context) :
                null) :
            null;

        context["field"] = "hasDepositImage";
        context["metadata"] = (objectMetadata ? objectMetadata["hasDepositImage"] : null);
        privateState.hasDepositImage = defaultValues ?
            (defaultValues["hasDepositImage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["hasDepositImage"], context) :
                null) :
            null;

        context["field"] = "payeeId";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
        privateState.payeeId = defaultValues ?
            (defaultValues["payeeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeId"], context) :
                null) :
            null;

        context["field"] = "payeeNickName";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeNickName"] : null);
        privateState.payeeNickName = defaultValues ?
            (defaultValues["payeeNickName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeNickName"], context) :
                null) :
            null;

        context["field"] = "payPersonEmail";
        context["metadata"] = (objectMetadata ? objectMetadata["payPersonEmail"] : null);
        privateState.payPersonEmail = defaultValues ?
            (defaultValues["payPersonEmail"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payPersonEmail"], context) :
                null) :
            null;

        context["field"] = "payPersonName";
        context["metadata"] = (objectMetadata ? objectMetadata["payPersonName"] : null);
        privateState.payPersonName = defaultValues ?
            (defaultValues["payPersonName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payPersonName"], context) :
                null) :
            null;

        context["field"] = "recurrenceDesc";
        context["metadata"] = (objectMetadata ? objectMetadata["recurrenceDesc"] : null);
        privateState.recurrenceDesc = defaultValues ?
            (defaultValues["recurrenceDesc"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recurrenceDesc"], context) :
                null) :
            null;

        context["field"] = "payPersonPhone";
        context["metadata"] = (objectMetadata ? objectMetadata["payPersonPhone"] : null);
        privateState.payPersonPhone = defaultValues ?
            (defaultValues["payPersonPhone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payPersonPhone"], context) :
                null) :
            null;

        context["field"] = "toAccountType";
        context["metadata"] = (objectMetadata ? objectMetadata["toAccountType"] : null);
        privateState.toAccountType = defaultValues ?
            (defaultValues["toAccountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toAccountType"], context) :
                null) :
            null;

        context["field"] = "transactionComments";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionComments"] : null);
        privateState.transactionComments = defaultValues ?
            (defaultValues["transactionComments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionComments"], context) :
                null) :
            null;

        context["field"] = "transactionDate";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionDate"] : null);
        privateState.transactionDate = defaultValues ?
            (defaultValues["transactionDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionDate"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "sortCode";
        context["metadata"] = (objectMetadata ? objectMetadata["sortCode"] : null);
        privateState.sortCode = defaultValues ?
            (defaultValues["sortCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortCode"], context) :
                null) :
            null;

        context["field"] = "fee";
        context["metadata"] = (objectMetadata ? objectMetadata["fee"] : null);
        privateState.fee = defaultValues ?
            (defaultValues["fee"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fee"], context) :
                null) :
            null;

        context["field"] = "feeCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["feeCurrency"] : null);
        privateState.feeCurrency = defaultValues ?
            (defaultValues["feeCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["feeCurrency"], context) :
                null) :
            null;

        context["field"] = "feePaidByReceipent";
        context["metadata"] = (objectMetadata ? objectMetadata["feePaidByReceipent"] : null);
        privateState.feePaidByReceipent = defaultValues ?
            (defaultValues["feePaidByReceipent"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["feePaidByReceipent"], context) :
                null) :
            null;

        context["field"] = "convertedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["convertedAmount"] : null);
        privateState.convertedAmount = defaultValues ?
            (defaultValues["convertedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["convertedAmount"], context) :
                null) :
            null;

        context["field"] = "baseCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["baseCurrency"] : null);
        privateState.baseCurrency = defaultValues ?
            (defaultValues["baseCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["baseCurrency"], context) :
                null) :
            null;

        context["field"] = "isInternationalAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["isInternationalAccount"] : null);
        privateState.isInternationalAccount = defaultValues ?
            (defaultValues["isInternationalAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isInternationalAccount"], context) :
                null) :
            null;

        context["field"] = "isBusinessPayee";
        context["metadata"] = (objectMetadata ? objectMetadata["isBusinessPayee"] : null);
        privateState.isBusinessPayee = defaultValues ?
            (defaultValues["isBusinessPayee"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isBusinessPayee"], context) :
                null) :
            null;

        context["field"] = "order";
        context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
        privateState.order = defaultValues ?
            (defaultValues["order"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["order"], context) :
                null) :
            null;

        context["field"] = "sortBy";
        context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
        privateState.sortBy = defaultValues ?
            (defaultValues["sortBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortBy"], context) :
                null) :
            null;

        context["field"] = "searchType";
        context["metadata"] = (objectMetadata ? objectMetadata["searchType"] : null);
        privateState.searchType = defaultValues ?
            (defaultValues["searchType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchType"], context) :
                null) :
            null;

        context["field"] = "searchDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["searchDescription"] : null);
        privateState.searchDescription = defaultValues ?
            (defaultValues["searchDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchDescription"], context) :
                null) :
            null;

        context["field"] = "searchMinAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["searchMinAmount"] : null);
        privateState.searchMinAmount = defaultValues ?
            (defaultValues["searchMinAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchMinAmount"], context) :
                null) :
            null;

        context["field"] = "searchMaxAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["searchMaxAmount"] : null);
        privateState.searchMaxAmount = defaultValues ?
            (defaultValues["searchMaxAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchMaxAmount"], context) :
                null) :
            null;

        context["field"] = "searchAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["searchAmount"] : null);
        privateState.searchAmount = defaultValues ?
            (defaultValues["searchAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchAmount"], context) :
                null) :
            null;

        context["field"] = "searchStartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
        privateState.searchStartDate = defaultValues ?
            (defaultValues["searchStartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchStartDate"], context) :
                null) :
            null;

        context["field"] = "searchEndDate";
        context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
        privateState.searchEndDate = defaultValues ?
            (defaultValues["searchEndDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchEndDate"], context) :
                null) :
            null;

        context["field"] = "searchDateRange";
        context["metadata"] = (objectMetadata ? objectMetadata["searchDateRange"] : null);
        privateState.searchDateRange = defaultValues ?
            (defaultValues["searchDateRange"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchDateRange"], context) :
                null) :
            null;

        context["field"] = "checkNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["checkNumber"] : null);
        privateState.checkNumber = defaultValues ?
            (defaultValues["checkNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkNumber"], context) :
                null) :
            null;

        context["field"] = "fromCheckNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["fromCheckNumber"] : null);
        privateState.fromCheckNumber = defaultValues ?
            (defaultValues["fromCheckNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromCheckNumber"], context) :
                null) :
            null;

        context["field"] = "searchTransactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["searchTransactionType"] : null);
        privateState.searchTransactionType = defaultValues ?
            (defaultValues["searchTransactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchTransactionType"], context) :
                null) :
            null;

        context["field"] = "MoreRecordsToken";
        context["metadata"] = (objectMetadata ? objectMetadata["MoreRecordsToken"] : null);
        privateState.MoreRecordsToken = defaultValues ?
            (defaultValues["MoreRecordsToken"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MoreRecordsToken"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "bulkReference";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkReference"] : null);
        privateState.bulkReference = defaultValues ?
            (defaultValues["bulkReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkReference"], context) :
                null) :
            null;

        context["field"] = "debitAccountId";
        context["metadata"] = (objectMetadata ? objectMetadata["debitAccountId"] : null);
        privateState.debitAccountId = defaultValues ?
            (defaultValues["debitAccountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitAccountId"], context) :
                null) :
            null;

        context["field"] = "currentPaymentState";
        context["metadata"] = (objectMetadata ? objectMetadata["currentPaymentState"] : null);
        privateState.currentPaymentState = defaultValues ?
            (defaultValues["currentPaymentState"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentPaymentState"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "ExternalAccountNumber": {
                get: function() {
                    context["field"] = "ExternalAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["ExternalAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ExternalAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['ExternalAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "firstRecordNumber": {
                get: function() {
                    context["field"] = "firstRecordNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["firstRecordNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.firstRecordNumber, context);
                },
                set: function(val) {
                    setterFunctions['firstRecordNumber'].call(this, val, privateState);
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
            "fromAccountName": {
                get: function() {
                    context["field"] = "fromAccountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccountName, context);
                },
                set: function(val) {
                    setterFunctions['fromAccountName'].call(this, val, privateState);
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
            "lastRecordNumber": {
                get: function() {
                    context["field"] = "lastRecordNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastRecordNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastRecordNumber, context);
                },
                set: function(val) {
                    setterFunctions['lastRecordNumber'].call(this, val, privateState);
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
            "statusDescription": {
                get: function() {
                    context["field"] = "statusDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["statusDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.statusDescription, context);
                },
                set: function(val) {
                    setterFunctions['statusDescription'].call(this, val, privateState);
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
            "IBAN": {
                get: function() {
                    context["field"] = "IBAN";
                    context["metadata"] = (objectMetadata ? objectMetadata["IBAN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IBAN, context);
                },
                set: function(val) {
                    setterFunctions['IBAN'].call(this, val, privateState);
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
            "versionNumber": {
                get: function() {
                    context["field"] = "versionNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["versionNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.versionNumber, context);
                },
                set: function(val) {
                    setterFunctions['versionNumber'].call(this, val, privateState);
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
            "bicId": {
                get: function() {
                    context["field"] = "bicId";
                    context["metadata"] = (objectMetadata ? objectMetadata["bicId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bicId, context);
                },
                set: function(val) {
                    setterFunctions['bicId'].call(this, val, privateState);
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
            "errcode": {
                get: function() {
                    context["field"] = "errcode";
                    context["metadata"] = (objectMetadata ? objectMetadata["errcode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errcode, context);
                },
                set: function(val) {
                    setterFunctions['errcode'].call(this, val, privateState);
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
            "fileID": {
                get: function() {
                    context["field"] = "fileID";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileID, context);
                },
                set: function(val) {
                    setterFunctions['fileID'].call(this, val, privateState);
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
            "transactionPeriod": {
                get: function() {
                    context["field"] = "transactionPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionPeriod, context);
                },
                set: function(val) {
                    setterFunctions['transactionPeriod'].call(this, val, privateState);
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
            "pendingApproval": {
                get: function() {
                    context["field"] = "pendingApproval";
                    context["metadata"] = (objectMetadata ? objectMetadata["pendingApproval"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pendingApproval, context);
                },
                set: function(val) {
                    setterFunctions['pendingApproval'].call(this, val, privateState);
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
            "beneficiaryBankName": {
                get: function() {
                    context["field"] = "beneficiaryBankName";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryBankName, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryBankName'].call(this, val, privateState);
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
            "beneficiaryAddressLine2": {
                get: function() {
                    context["field"] = "beneficiaryAddressLine2";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryAddressLine2, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryAddressLine2'].call(this, val, privateState);
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
            "beneficiaryState": {
                get: function() {
                    context["field"] = "beneficiaryState";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryState"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryState, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryState'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "quoteCurrency": {
                get: function() {
                    context["field"] = "quoteCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["quoteCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.quoteCurrency, context);
                },
                set: function(val) {
                    setterFunctions['quoteCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chargeBearer": {
                get: function() {
                    context["field"] = "chargeBearer";
                    context["metadata"] = (objectMetadata ? objectMetadata["chargeBearer"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chargeBearer, context);
                },
                set: function(val) {
                    setterFunctions['chargeBearer'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "systemId": {
                get: function() {
                    context["field"] = "systemId";
                    context["metadata"] = (objectMetadata ? objectMetadata["systemId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.systemId, context);
                },
                set: function(val) {
                    setterFunctions['systemId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentStatus": {
                get: function() {
                    context["field"] = "currentStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentStatus, context);
                },
                set: function(val) {
                    setterFunctions['currentStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "endToEndReference": {
                get: function() {
                    context["field"] = "endToEndReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["endToEndReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.endToEndReference, context);
                },
                set: function(val) {
                    setterFunctions['endToEndReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromAccountIBAN": {
                get: function() {
                    context["field"] = "fromAccountIBAN";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccountIBAN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccountIBAN, context);
                },
                set: function(val) {
                    setterFunctions['fromAccountIBAN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentCurrencyId": {
                get: function() {
                    context["field"] = "paymentCurrencyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentCurrencyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentCurrencyId, context);
                },
                set: function(val) {
                    setterFunctions['paymentCurrencyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "orderingCustomerId": {
                get: function() {
                    context["field"] = "orderingCustomerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["orderingCustomerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orderingCustomerId, context);
                },
                set: function(val) {
                    setterFunctions['orderingCustomerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cashlessEmail": {
                get: function() {
                    context["field"] = "cashlessEmail";
                    context["metadata"] = (objectMetadata ? objectMetadata["cashlessEmail"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cashlessEmail, context);
                },
                set: function(val) {
                    setterFunctions['cashlessEmail'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cashlessMode": {
                get: function() {
                    context["field"] = "cashlessMode";
                    context["metadata"] = (objectMetadata ? objectMetadata["cashlessMode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cashlessMode, context);
                },
                set: function(val) {
                    setterFunctions['cashlessMode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cashlessOTP": {
                get: function() {
                    context["field"] = "cashlessOTP";
                    context["metadata"] = (objectMetadata ? objectMetadata["cashlessOTP"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cashlessOTP, context);
                },
                set: function(val) {
                    setterFunctions['cashlessOTP'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cashlessOTPValidDate": {
                get: function() {
                    context["field"] = "cashlessOTPValidDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["cashlessOTPValidDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cashlessOTPValidDate, context);
                },
                set: function(val) {
                    setterFunctions['cashlessOTPValidDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cashlessPersonName": {
                get: function() {
                    context["field"] = "cashlessPersonName";
                    context["metadata"] = (objectMetadata ? objectMetadata["cashlessPersonName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cashlessPersonName, context);
                },
                set: function(val) {
                    setterFunctions['cashlessPersonName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cashlessPhone": {
                get: function() {
                    context["field"] = "cashlessPhone";
                    context["metadata"] = (objectMetadata ? objectMetadata["cashlessPhone"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cashlessPhone, context);
                },
                set: function(val) {
                    setterFunctions['cashlessPhone'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cashlessSecurityCode": {
                get: function() {
                    context["field"] = "cashlessSecurityCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["cashlessSecurityCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cashlessSecurityCode, context);
                },
                set: function(val) {
                    setterFunctions['cashlessSecurityCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cashWithdrawalTransactionStatus": {
                get: function() {
                    context["field"] = "cashWithdrawalTransactionStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["cashWithdrawalTransactionStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cashWithdrawalTransactionStatus, context);
                },
                set: function(val) {
                    setterFunctions['cashWithdrawalTransactionStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "category": {
                get: function() {
                    context["field"] = "category";
                    context["metadata"] = (objectMetadata ? objectMetadata["category"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.category, context);
                },
                set: function(val) {
                    setterFunctions['category'].call(this, val, privateState);
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
            "fromAccountBalance": {
                get: function() {
                    context["field"] = "fromAccountBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccountBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccountBalance, context);
                },
                set: function(val) {
                    setterFunctions['fromAccountBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromAccountType": {
                get: function() {
                    context["field"] = "fromAccountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccountType, context);
                },
                set: function(val) {
                    setterFunctions['fromAccountType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromNickName": {
                get: function() {
                    context["field"] = "fromNickName";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromNickName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromNickName, context);
                },
                set: function(val) {
                    setterFunctions['fromNickName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "hasDepositImage": {
                get: function() {
                    context["field"] = "hasDepositImage";
                    context["metadata"] = (objectMetadata ? objectMetadata["hasDepositImage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.hasDepositImage, context);
                },
                set: function(val) {
                    setterFunctions['hasDepositImage'].call(this, val, privateState);
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
            "payPersonEmail": {
                get: function() {
                    context["field"] = "payPersonEmail";
                    context["metadata"] = (objectMetadata ? objectMetadata["payPersonEmail"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payPersonEmail, context);
                },
                set: function(val) {
                    setterFunctions['payPersonEmail'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payPersonName": {
                get: function() {
                    context["field"] = "payPersonName";
                    context["metadata"] = (objectMetadata ? objectMetadata["payPersonName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payPersonName, context);
                },
                set: function(val) {
                    setterFunctions['payPersonName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recurrenceDesc": {
                get: function() {
                    context["field"] = "recurrenceDesc";
                    context["metadata"] = (objectMetadata ? objectMetadata["recurrenceDesc"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recurrenceDesc, context);
                },
                set: function(val) {
                    setterFunctions['recurrenceDesc'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payPersonPhone": {
                get: function() {
                    context["field"] = "payPersonPhone";
                    context["metadata"] = (objectMetadata ? objectMetadata["payPersonPhone"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payPersonPhone, context);
                },
                set: function(val) {
                    setterFunctions['payPersonPhone'].call(this, val, privateState);
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
            "transactionComments": {
                get: function() {
                    context["field"] = "transactionComments";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionComments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionComments, context);
                },
                set: function(val) {
                    setterFunctions['transactionComments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionDate": {
                get: function() {
                    context["field"] = "transactionDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionDate, context);
                },
                set: function(val) {
                    setterFunctions['transactionDate'].call(this, val, privateState);
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
            "sortCode": {
                get: function() {
                    context["field"] = "sortCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortCode, context);
                },
                set: function(val) {
                    setterFunctions['sortCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fee": {
                get: function() {
                    context["field"] = "fee";
                    context["metadata"] = (objectMetadata ? objectMetadata["fee"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fee, context);
                },
                set: function(val) {
                    setterFunctions['fee'].call(this, val, privateState);
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
            "feePaidByReceipent": {
                get: function() {
                    context["field"] = "feePaidByReceipent";
                    context["metadata"] = (objectMetadata ? objectMetadata["feePaidByReceipent"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.feePaidByReceipent, context);
                },
                set: function(val) {
                    setterFunctions['feePaidByReceipent'].call(this, val, privateState);
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
            "baseCurrency": {
                get: function() {
                    context["field"] = "baseCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["baseCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.baseCurrency, context);
                },
                set: function(val) {
                    setterFunctions['baseCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isInternationalAccount": {
                get: function() {
                    context["field"] = "isInternationalAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["isInternationalAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isInternationalAccount, context);
                },
                set: function(val) {
                    setterFunctions['isInternationalAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isBusinessPayee": {
                get: function() {
                    context["field"] = "isBusinessPayee";
                    context["metadata"] = (objectMetadata ? objectMetadata["isBusinessPayee"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isBusinessPayee, context);
                },
                set: function(val) {
                    setterFunctions['isBusinessPayee'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "order": {
                get: function() {
                    context["field"] = "order";
                    context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.order, context);
                },
                set: function(val) {
                    setterFunctions['order'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortBy": {
                get: function() {
                    context["field"] = "sortBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortBy, context);
                },
                set: function(val) {
                    setterFunctions['sortBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchType": {
                get: function() {
                    context["field"] = "searchType";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchType, context);
                },
                set: function(val) {
                    setterFunctions['searchType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchDescription": {
                get: function() {
                    context["field"] = "searchDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchDescription, context);
                },
                set: function(val) {
                    setterFunctions['searchDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchMinAmount": {
                get: function() {
                    context["field"] = "searchMinAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchMinAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchMinAmount, context);
                },
                set: function(val) {
                    setterFunctions['searchMinAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchMaxAmount": {
                get: function() {
                    context["field"] = "searchMaxAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchMaxAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchMaxAmount, context);
                },
                set: function(val) {
                    setterFunctions['searchMaxAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchAmount": {
                get: function() {
                    context["field"] = "searchAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchAmount, context);
                },
                set: function(val) {
                    setterFunctions['searchAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchStartDate": {
                get: function() {
                    context["field"] = "searchStartDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchStartDate, context);
                },
                set: function(val) {
                    setterFunctions['searchStartDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchEndDate": {
                get: function() {
                    context["field"] = "searchEndDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchEndDate, context);
                },
                set: function(val) {
                    setterFunctions['searchEndDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchDateRange": {
                get: function() {
                    context["field"] = "searchDateRange";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchDateRange"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchDateRange, context);
                },
                set: function(val) {
                    setterFunctions['searchDateRange'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "checkNumber": {
                get: function() {
                    context["field"] = "checkNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["checkNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.checkNumber, context);
                },
                set: function(val) {
                    setterFunctions['checkNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromCheckNumber": {
                get: function() {
                    context["field"] = "fromCheckNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromCheckNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromCheckNumber, context);
                },
                set: function(val) {
                    setterFunctions['fromCheckNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchTransactionType": {
                get: function() {
                    context["field"] = "searchTransactionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchTransactionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchTransactionType, context);
                },
                set: function(val) {
                    setterFunctions['searchTransactionType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MoreRecordsToken": {
                get: function() {
                    context["field"] = "MoreRecordsToken";
                    context["metadata"] = (objectMetadata ? objectMetadata["MoreRecordsToken"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MoreRecordsToken, context);
                },
                set: function(val) {
                    setterFunctions['MoreRecordsToken'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountNumber": {
                get: function() {
                    context["field"] = "accountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountNumber, context);
                },
                set: function(val) {
                    setterFunctions['accountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkReference": {
                get: function() {
                    context["field"] = "bulkReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkReference, context);
                },
                set: function(val) {
                    setterFunctions['bulkReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "debitAccountId": {
                get: function() {
                    context["field"] = "debitAccountId";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitAccountId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitAccountId, context);
                },
                set: function(val) {
                    setterFunctions['debitAccountId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentPaymentState": {
                get: function() {
                    context["field"] = "currentPaymentState";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentPaymentState"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentPaymentState, context);
                },
                set: function(val) {
                    setterFunctions['currentPaymentState'].call(this, val, privateState);
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
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.ExternalAccountNumber = value ? (value["ExternalAccountNumber"] ? value["ExternalAccountNumber"] : null) : null;
            privateState.firstRecordNumber = value ? (value["firstRecordNumber"] ? value["firstRecordNumber"] : null) : null;
            privateState.frequencyEndDate = value ? (value["frequencyEndDate"] ? value["frequencyEndDate"] : null) : null;
            privateState.frequencyType = value ? (value["frequencyType"] ? value["frequencyType"] : null) : null;
            privateState.fromAccountName = value ? (value["fromAccountName"] ? value["fromAccountName"] : null) : null;
            privateState.fromAccountNumber = value ? (value["fromAccountNumber"] ? value["fromAccountNumber"] : null) : null;
            privateState.isScheduled = value ? (value["isScheduled"] ? value["isScheduled"] : null) : null;
            privateState.lastRecordNumber = value ? (value["lastRecordNumber"] ? value["lastRecordNumber"] : null) : null;
            privateState.numberOfRecurrences = value ? (value["numberOfRecurrences"] ? value["numberOfRecurrences"] : null) : null;
            privateState.scheduledDate = value ? (value["scheduledDate"] ? value["scheduledDate"] : null) : null;
            privateState.statusDescription = value ? (value["statusDescription"] ? value["statusDescription"] : null) : null;
            privateState.toAccountName = value ? (value["toAccountName"] ? value["toAccountName"] : null) : null;
            privateState.toAccountNumber = value ? (value["toAccountNumber"] ? value["toAccountNumber"] : null) : null;
            privateState.totalAmount = value ? (value["totalAmount"] ? value["totalAmount"] : null) : null;
            privateState.transactionId = value ? (value["transactionId"] ? value["transactionId"] : null) : null;
            privateState.transactionsNotes = value ? (value["transactionsNotes"] ? value["transactionsNotes"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.referenceId = value ? (value["referenceId"] ? value["referenceId"] : null) : null;
            privateState.personId = value ? (value["personId"] ? value["personId"] : null) : null;
            privateState.swiftCode = value ? (value["swiftCode"] ? value["swiftCode"] : null) : null;
            privateState.IBAN = value ? (value["IBAN"] ? value["IBAN"] : null) : null;
            privateState.transactionCurrency = value ? (value["transactionCurrency"] ? value["transactionCurrency"] : null) : null;
            privateState.exchangeRate = value ? (value["exchangeRate"] ? value["exchangeRate"] : null) : null;
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.serviceName = value ? (value["serviceName"] ? value["serviceName"] : null) : null;
            privateState.fromAccountCurrency = value ? (value["fromAccountCurrency"] ? value["fromAccountCurrency"] : null) : null;
            privateState.toAccountCurrency = value ? (value["toAccountCurrency"] ? value["toAccountCurrency"] : null) : null;
            privateState.versionNumber = value ? (value["versionNumber"] ? value["versionNumber"] : null) : null;
            privateState.paidBy = value ? (value["paidBy"] ? value["paidBy"] : null) : null;
            privateState.paymentType = value ? (value["paymentType"] ? value["paymentType"] : null) : null;
            privateState.bicId = value ? (value["bicId"] ? value["bicId"] : null) : null;
            privateState.validate = value ? (value["validate"] ? value["validate"] : null) : null;
            privateState.fileNames = value ? (value["fileNames"] ? value["fileNames"] : null) : null;
            privateState.errcode = value ? (value["errcode"] ? value["errcode"] : null) : null;
            privateState.fileName = value ? (value["fileName"] ? value["fileName"] : null) : null;
            privateState.fileID = value ? (value["fileID"] ? value["fileID"] : null) : null;
            privateState.charges = value ? (value["charges"] ? value["charges"] : null) : null;
            privateState.uploadedattachments = value ? (value["uploadedattachments"] ? value["uploadedattachments"] : null) : null;
            privateState.transactionPeriod = value ? (value["transactionPeriod"] ? value["transactionPeriod"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.pendingApproval = value ? (value["pendingApproval"] ? value["pendingApproval"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.createWithPaymentId = value ? (value["createWithPaymentId"] ? value["createWithPaymentId"] : null) : null;
            privateState.creditValueDate = value ? (value["creditValueDate"] ? value["creditValueDate"] : null) : null;
            privateState.intermediaryBicCode = value ? (value["intermediaryBicCode"] ? value["intermediaryBicCode"] : null) : null;
            privateState.clearingCode = value ? (value["clearingCode"] ? value["clearingCode"] : null) : null;
            privateState.e2eReference = value ? (value["e2eReference"] ? value["e2eReference"] : null) : null;
            privateState.overrides = value ? (value["overrides"] ? value["overrides"] : null) : null;
            privateState.beneficiaryBankName = value ? (value["beneficiaryBankName"] ? value["beneficiaryBankName"] : null) : null;
            privateState.beneficiaryAddressLine1 = value ? (value["beneficiaryAddressLine1"] ? value["beneficiaryAddressLine1"] : null) : null;
            privateState.beneficiaryAddressLine2 = value ? (value["beneficiaryAddressLine2"] ? value["beneficiaryAddressLine2"] : null) : null;
            privateState.beneficiaryCity = value ? (value["beneficiaryCity"] ? value["beneficiaryCity"] : null) : null;
            privateState.beneficiaryZipcode = value ? (value["beneficiaryZipcode"] ? value["beneficiaryZipcode"] : null) : null;
            privateState.beneficiarycountry = value ? (value["beneficiarycountry"] ? value["beneficiarycountry"] : null) : null;
            privateState.beneficiaryPhone = value ? (value["beneficiaryPhone"] ? value["beneficiaryPhone"] : null) : null;
            privateState.beneficiaryEmail = value ? (value["beneficiaryEmail"] ? value["beneficiaryEmail"] : null) : null;
            privateState.beneficiaryState = value ? (value["beneficiaryState"] ? value["beneficiaryState"] : null) : null;
            privateState.quoteCurrency = value ? (value["quoteCurrency"] ? value["quoteCurrency"] : null) : null;
            privateState.chargeBearer = value ? (value["chargeBearer"] ? value["chargeBearer"] : null) : null;
            privateState.systemId = value ? (value["systemId"] ? value["systemId"] : null) : null;
            privateState.currentStatus = value ? (value["currentStatus"] ? value["currentStatus"] : null) : null;
            privateState.endToEndReference = value ? (value["endToEndReference"] ? value["endToEndReference"] : null) : null;
            privateState.fromAccountIBAN = value ? (value["fromAccountIBAN"] ? value["fromAccountIBAN"] : null) : null;
            privateState.paymentCurrencyId = value ? (value["paymentCurrencyId"] ? value["paymentCurrencyId"] : null) : null;
            privateState.orderingCustomerId = value ? (value["orderingCustomerId"] ? value["orderingCustomerId"] : null) : null;
            privateState.cashlessEmail = value ? (value["cashlessEmail"] ? value["cashlessEmail"] : null) : null;
            privateState.cashlessMode = value ? (value["cashlessMode"] ? value["cashlessMode"] : null) : null;
            privateState.cashlessOTP = value ? (value["cashlessOTP"] ? value["cashlessOTP"] : null) : null;
            privateState.cashlessOTPValidDate = value ? (value["cashlessOTPValidDate"] ? value["cashlessOTPValidDate"] : null) : null;
            privateState.cashlessPersonName = value ? (value["cashlessPersonName"] ? value["cashlessPersonName"] : null) : null;
            privateState.cashlessPhone = value ? (value["cashlessPhone"] ? value["cashlessPhone"] : null) : null;
            privateState.cashlessSecurityCode = value ? (value["cashlessSecurityCode"] ? value["cashlessSecurityCode"] : null) : null;
            privateState.cashWithdrawalTransactionStatus = value ? (value["cashWithdrawalTransactionStatus"] ? value["cashWithdrawalTransactionStatus"] : null) : null;
            privateState.category = value ? (value["category"] ? value["category"] : null) : null;
            privateState.frequencyStartDate = value ? (value["frequencyStartDate"] ? value["frequencyStartDate"] : null) : null;
            privateState.fromAccountBalance = value ? (value["fromAccountBalance"] ? value["fromAccountBalance"] : null) : null;
            privateState.fromAccountType = value ? (value["fromAccountType"] ? value["fromAccountType"] : null) : null;
            privateState.fromNickName = value ? (value["fromNickName"] ? value["fromNickName"] : null) : null;
            privateState.hasDepositImage = value ? (value["hasDepositImage"] ? value["hasDepositImage"] : null) : null;
            privateState.payeeId = value ? (value["payeeId"] ? value["payeeId"] : null) : null;
            privateState.payeeNickName = value ? (value["payeeNickName"] ? value["payeeNickName"] : null) : null;
            privateState.payPersonEmail = value ? (value["payPersonEmail"] ? value["payPersonEmail"] : null) : null;
            privateState.payPersonName = value ? (value["payPersonName"] ? value["payPersonName"] : null) : null;
            privateState.recurrenceDesc = value ? (value["recurrenceDesc"] ? value["recurrenceDesc"] : null) : null;
            privateState.payPersonPhone = value ? (value["payPersonPhone"] ? value["payPersonPhone"] : null) : null;
            privateState.toAccountType = value ? (value["toAccountType"] ? value["toAccountType"] : null) : null;
            privateState.transactionComments = value ? (value["transactionComments"] ? value["transactionComments"] : null) : null;
            privateState.transactionDate = value ? (value["transactionDate"] ? value["transactionDate"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.sortCode = value ? (value["sortCode"] ? value["sortCode"] : null) : null;
            privateState.fee = value ? (value["fee"] ? value["fee"] : null) : null;
            privateState.feeCurrency = value ? (value["feeCurrency"] ? value["feeCurrency"] : null) : null;
            privateState.feePaidByReceipent = value ? (value["feePaidByReceipent"] ? value["feePaidByReceipent"] : null) : null;
            privateState.convertedAmount = value ? (value["convertedAmount"] ? value["convertedAmount"] : null) : null;
            privateState.baseCurrency = value ? (value["baseCurrency"] ? value["baseCurrency"] : null) : null;
            privateState.isInternationalAccount = value ? (value["isInternationalAccount"] ? value["isInternationalAccount"] : null) : null;
            privateState.isBusinessPayee = value ? (value["isBusinessPayee"] ? value["isBusinessPayee"] : null) : null;
            privateState.order = value ? (value["order"] ? value["order"] : null) : null;
            privateState.sortBy = value ? (value["sortBy"] ? value["sortBy"] : null) : null;
            privateState.searchType = value ? (value["searchType"] ? value["searchType"] : null) : null;
            privateState.searchDescription = value ? (value["searchDescription"] ? value["searchDescription"] : null) : null;
            privateState.searchMinAmount = value ? (value["searchMinAmount"] ? value["searchMinAmount"] : null) : null;
            privateState.searchMaxAmount = value ? (value["searchMaxAmount"] ? value["searchMaxAmount"] : null) : null;
            privateState.searchAmount = value ? (value["searchAmount"] ? value["searchAmount"] : null) : null;
            privateState.searchStartDate = value ? (value["searchStartDate"] ? value["searchStartDate"] : null) : null;
            privateState.searchEndDate = value ? (value["searchEndDate"] ? value["searchEndDate"] : null) : null;
            privateState.searchDateRange = value ? (value["searchDateRange"] ? value["searchDateRange"] : null) : null;
            privateState.checkNumber = value ? (value["checkNumber"] ? value["checkNumber"] : null) : null;
            privateState.fromCheckNumber = value ? (value["fromCheckNumber"] ? value["fromCheckNumber"] : null) : null;
            privateState.searchTransactionType = value ? (value["searchTransactionType"] ? value["searchTransactionType"] : null) : null;
            privateState.MoreRecordsToken = value ? (value["MoreRecordsToken"] ? value["MoreRecordsToken"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.bulkReference = value ? (value["bulkReference"] ? value["bulkReference"] : null) : null;
            privateState.debitAccountId = value ? (value["debitAccountId"] ? value["debitAccountId"] : null) : null;
            privateState.currentPaymentState = value ? (value["currentPaymentState"] ? value["currentPaymentState"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(OneTimeTransfer);

    //Create new class level validator object
    BaseModel.Validator.call(OneTimeTransfer);

    var registerValidatorBackup = OneTimeTransfer.registerValidator;

    OneTimeTransfer.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(OneTimeTransfer.isValid(this, propName, val)) {
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
    //For Operation 'Create' with service id 'oneTimeTransferFunds8861'
     OneTimeTransfer.Create = function(params, onCompletion){
        return OneTimeTransfer.customVerb('Create', params, onCompletion);
     };

    //For Operation 'getTransfers' with service id 'GetTransfers4936'
     OneTimeTransfer.getTransfers = function(params, onCompletion){
        return OneTimeTransfer.customVerb('getTransfers', params, onCompletion);
     };

    var relations = [];

    OneTimeTransfer.relations = relations;

    OneTimeTransfer.prototype.isValid = function() {
        return OneTimeTransfer.isValid(this);
    };

    OneTimeTransfer.prototype.objModelName = "OneTimeTransfer";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    OneTimeTransfer.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Transfers", "OneTimeTransfer", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    OneTimeTransfer.clone = function(objectToClone) {
        var clonedObj = new OneTimeTransfer();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return OneTimeTransfer;
});