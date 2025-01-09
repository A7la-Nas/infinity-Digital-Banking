/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ChequeBook", "objectService" : "ChequeManagement"};

    var setterFunctions = {
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        category: function(val, state) {
            context["field"] = "category";
            context["metadata"] = (objectMetadata ? objectMetadata["category"] : null);
            state['category'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        checkNumber: function(val, state) {
            context["field"] = "checkNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["checkNumber"] : null);
            state['checkNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deliverBy: function(val, state) {
            context["field"] = "deliverBy";
            context["metadata"] = (objectMetadata ? objectMetadata["deliverBy"] : null);
            state['deliverBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        fromAccountBalance: function(val, state) {
            context["field"] = "fromAccountBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountBalance"] : null);
            state['fromAccountBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        fromAccountType: function(val, state) {
            context["field"] = "fromAccountType";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountType"] : null);
            state['fromAccountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromCheckNumber: function(val, state) {
            context["field"] = "fromCheckNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["fromCheckNumber"] : null);
            state['fromCheckNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        limit: function(val, state) {
            context["field"] = "limit";
            context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
            state['limit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        numberOfRecurrences: function(val, state) {
            context["field"] = "numberOfRecurrences";
            context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecurrences"] : null);
            state['numberOfRecurrences'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        offset: function(val, state) {
            context["field"] = "offset";
            context["metadata"] = (objectMetadata ? objectMetadata["offset"] : null);
            state['offset'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        order: function(val, state) {
            context["field"] = "order";
            context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
            state['order'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otp: function(val, state) {
            context["field"] = "otp";
            context["metadata"] = (objectMetadata ? objectMetadata["otp"] : null);
            state['otp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeAccountNumber: function(val, state) {
            context["field"] = "payeeAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeAccountNumber"] : null);
            state['payeeAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        payPersonPhone: function(val, state) {
            context["field"] = "payPersonPhone";
            context["metadata"] = (objectMetadata ? objectMetadata["payPersonPhone"] : null);
            state['payPersonPhone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        personId: function(val, state) {
            context["field"] = "personId";
            context["metadata"] = (objectMetadata ? objectMetadata["personId"] : null);
            state['personId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recurrenceDesc: function(val, state) {
            context["field"] = "recurrenceDesc";
            context["metadata"] = (objectMetadata ? objectMetadata["recurrenceDesc"] : null);
            state['recurrenceDesc'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        referenceId: function(val, state) {
            context["field"] = "referenceId";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceId"] : null);
            state['referenceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        scheduledDate: function(val, state) {
            context["field"] = "scheduledDate";
            context["metadata"] = (objectMetadata ? objectMetadata["scheduledDate"] : null);
            state['scheduledDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortBy: function(val, state) {
            context["field"] = "sortBy";
            context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
            state['sortBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        statusDescription: function(val, state) {
            context["field"] = "statusDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["statusDescription"] : null);
            state['statusDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        toAccountType: function(val, state) {
            context["field"] = "toAccountType";
            context["metadata"] = (objectMetadata ? objectMetadata["toAccountType"] : null);
            state['toAccountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toCheckNumber: function(val, state) {
            context["field"] = "toCheckNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["toCheckNumber"] : null);
            state['toCheckNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalAmount: function(val, state) {
            context["field"] = "totalAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
            state['totalAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        validDate: function(val, state) {
            context["field"] = "validDate";
            context["metadata"] = (objectMetadata ? objectMetadata["validDate"] : null);
            state['validDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        overdraft: function(val, state) {
            context["field"] = "overdraft";
            context["metadata"] = (objectMetadata ? objectMetadata["overdraft"] : null);
            state['overdraft'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        frontImage1: function(val, state) {
            context["field"] = "frontImage1";
            context["metadata"] = (objectMetadata ? objectMetadata["frontImage1"] : null);
            state['frontImage1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        frontImage2: function(val, state) {
            context["field"] = "frontImage2";
            context["metadata"] = (objectMetadata ? objectMetadata["frontImage2"] : null);
            state['frontImage2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        checkDesc: function(val, state) {
            context["field"] = "checkDesc";
            context["metadata"] = (objectMetadata ? objectMetadata["checkDesc"] : null);
            state['checkDesc'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        checkNumber1: function(val, state) {
            context["field"] = "checkNumber1";
            context["metadata"] = (objectMetadata ? objectMetadata["checkNumber1"] : null);
            state['checkNumber1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        checkNumber2: function(val, state) {
            context["field"] = "checkNumber2";
            context["metadata"] = (objectMetadata ? objectMetadata["checkNumber2"] : null);
            state['checkNumber2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalCheckAmount: function(val, state) {
            context["field"] = "totalCheckAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalCheckAmount"] : null);
            state['totalCheckAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeCurrency: function(val, state) {
            context["field"] = "payeeCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeCurrency"] : null);
            state['payeeCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        country: function(val, state) {
            context["field"] = "country";
            context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
            state['country'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        zipCode: function(val, state) {
            context["field"] = "zipCode";
            context["metadata"] = (objectMetadata ? objectMetadata["zipCode"] : null);
            state['zipCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        checkDateOfIssue: function(val, state) {
            context["field"] = "checkDateOfIssue";
            context["metadata"] = (objectMetadata ? objectMetadata["checkDateOfIssue"] : null);
            state['checkDateOfIssue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        checkReason: function(val, state) {
            context["field"] = "checkReason";
            context["metadata"] = (objectMetadata ? objectMetadata["checkReason"] : null);
            state['checkReason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amountRecieved: function(val, state) {
            context["field"] = "amountRecieved";
            context["metadata"] = (objectMetadata ? objectMetadata["amountRecieved"] : null);
            state['amountRecieved'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestValidityInMonths: function(val, state) {
            context["field"] = "requestValidityInMonths";
            context["metadata"] = (objectMetadata ? objectMetadata["requestValidityInMonths"] : null);
            state['requestValidityInMonths'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestValidity: function(val, state) {
            context["field"] = "requestValidity";
            context["metadata"] = (objectMetadata ? objectMetadata["requestValidity"] : null);
            state['requestValidity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestType: function(val, state) {
            context["field"] = "requestType";
            context["metadata"] = (objectMetadata ? objectMetadata["requestType"] : null);
            state['requestType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isOverdraft: function(val, state) {
            context["field"] = "isOverdraft";
            context["metadata"] = (objectMetadata ? objectMetadata["isOverdraft"] : null);
            state['isOverdraft'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        title: function(val, state) {
            context["field"] = "title";
            context["metadata"] = (objectMetadata ? objectMetadata["title"] : null);
            state['title'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        valueDateTime: function(val, state) {
            context["field"] = "valueDateTime";
            context["metadata"] = (objectMetadata ? objectMetadata["valueDateTime"] : null);
            state['valueDateTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionInformation: function(val, state) {
            context["field"] = "transactionInformation";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionInformation"] : null);
            state['transactionInformation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionAmount: function(val, state) {
            context["field"] = "transactionAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
            state['transactionAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCurrency: function(val, state) {
            context["field"] = "transactionCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
            state['transactionCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chargeAmount: function(val, state) {
            context["field"] = "chargeAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["chargeAmount"] : null);
            state['chargeAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chargeCurrency: function(val, state) {
            context["field"] = "chargeCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["chargeCurrency"] : null);
            state['chargeCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        targetCurrency: function(val, state) {
            context["field"] = "targetCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["targetCurrency"] : null);
            state['targetCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unitCurrency: function(val, state) {
            context["field"] = "unitCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["unitCurrency"] : null);
            state['unitCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCode: function(val, state) {
            context["field"] = "transactionCode";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCode"] : null);
            state['transactionCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        balanceType: function(val, state) {
            context["field"] = "balanceType";
            context["metadata"] = (objectMetadata ? objectMetadata["balanceType"] : null);
            state['balanceType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        balanceAmount: function(val, state) {
            context["field"] = "balanceAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["balanceAmount"] : null);
            state['balanceAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        balanceCurrency: function(val, state) {
            context["field"] = "balanceCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["balanceCurrency"] : null);
            state['balanceCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortCode: function(val, state) {
            context["field"] = "sortCode";
            context["metadata"] = (objectMetadata ? objectMetadata["sortCode"] : null);
            state['sortCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        linkSelf: function(val, state) {
            context["field"] = "linkSelf";
            context["metadata"] = (objectMetadata ? objectMetadata["linkSelf"] : null);
            state['linkSelf'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdDate: function(val, state) {
            context["field"] = "createdDate";
            context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
            state['createdDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dataStatus: function(val, state) {
            context["field"] = "dataStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["dataStatus"] : null);
            state['dataStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileType: function(val, state) {
            context["field"] = "fileType";
            context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
            state['fileType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        payPersonNickName: function(val, state) {
            context["field"] = "payPersonNickName";
            context["metadata"] = (objectMetadata ? objectMetadata["payPersonNickName"] : null);
            state['payPersonNickName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        postedDate: function(val, state) {
            context["field"] = "postedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["postedDate"] : null);
            state['postedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paidBy: function(val, state) {
            context["field"] = "paidBy";
            context["metadata"] = (objectMetadata ? objectMetadata["paidBy"] : null);
            state['paidBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentType: function(val, state) {
            context["field"] = "paymentType";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentType"] : null);
            state['paymentType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        feeAmount: function(val, state) {
            context["field"] = "feeAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["feeAmount"] : null);
            state['feeAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chequeNumberStart: function(val, state) {
            context["field"] = "chequeNumberStart";
            context["metadata"] = (objectMetadata ? objectMetadata["chequeNumberStart"] : null);
            state['chequeNumberStart'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chequeId: function(val, state) {
            context["field"] = "chequeId";
            context["metadata"] = (objectMetadata ? objectMetadata["chequeId"] : null);
            state['chequeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        defaultIssueNumber: function(val, state) {
            context["field"] = "defaultIssueNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["defaultIssueNumber"] : null);
            state['defaultIssueNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        note: function(val, state) {
            context["field"] = "note";
            context["metadata"] = (objectMetadata ? objectMetadata["note"] : null);
            state['note'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chequeStatus: function(val, state) {
            context["field"] = "chequeStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["chequeStatus"] : null);
            state['chequeStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chequeIssueId: function(val, state) {
            context["field"] = "chequeIssueId";
            context["metadata"] = (objectMetadata ? objectMetadata["chequeIssueId"] : null);
            state['chequeIssueId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issueDate: function(val, state) {
            context["field"] = "issueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
            state['issueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        numberIssued: function(val, state) {
            context["field"] = "numberIssued";
            context["metadata"] = (objectMetadata ? objectMetadata["numberIssued"] : null);
            state['numberIssued'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        validate: function(val, state) {
            context["field"] = "validate";
            context["metadata"] = (objectMetadata ? objectMetadata["validate"] : null);
            state['validate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyId: function(val, state) {
            context["field"] = "currencyId";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyId"] : null);
            state['currencyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amountRange: function(val, state) {
            context["field"] = "amountRange";
            context["metadata"] = (objectMetadata ? objectMetadata["amountRange"] : null);
            state['amountRange'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chequeRange: function(val, state) {
            context["field"] = "chequeRange";
            context["metadata"] = (objectMetadata ? objectMetadata["chequeRange"] : null);
            state['chequeRange'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileNames: function(val, state) {
            context["field"] = "fileNames";
            context["metadata"] = (objectMetadata ? objectMetadata["fileNames"] : null);
            state['fileNames'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toDate: function(val, state) {
            context["field"] = "toDate";
            context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
            state['toDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fees: function(val, state) {
            context["field"] = "fees";
            context["metadata"] = (objectMetadata ? objectMetadata["fees"] : null);
            state['fees'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastWorkingDate: function(val, state) {
            context["field"] = "lastWorkingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lastWorkingDate"] : null);
            state['lastWorkingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentWorkingDate: function(val, state) {
            context["field"] = "currentWorkingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["currentWorkingDate"] : null);
            state['currentWorkingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionReference: function(val, state) {
            context["field"] = "transactionReference";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
            state['transactionReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        principal: function(val, state) {
            context["field"] = "principal";
            context["metadata"] = (objectMetadata ? objectMetadata["principal"] : null);
            state['principal'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Date: function(val, state) {
            context["field"] = "Date";
            context["metadata"] = (objectMetadata ? objectMetadata["Date"] : null);
            state['Date'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDate: function(val, state) {
            context["field"] = "paymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
            state['paymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        charges: function(val, state) {
            context["field"] = "charges";
            context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
            state['charges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        outstandingBalance: function(val, state) {
            context["field"] = "outstandingBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance"] : null);
            state['outstandingBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderId: function(val, state) {
            context["field"] = "orderId";
            context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
            state['orderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderedDate: function(val, state) {
            context["field"] = "orderedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["orderedDate"] : null);
            state['orderedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadedattachments: function(val, state) {
            context["field"] = "uploadedattachments";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedattachments"] : null);
            state['uploadedattachments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        directDebitId: function(val, state) {
            context["field"] = "directDebitId";
            context["metadata"] = (objectMetadata ? objectMetadata["directDebitId"] : null);
            state['directDebitId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        directDebitStatus: function(val, state) {
            context["field"] = "directDebitStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["directDebitStatus"] : null);
            state['directDebitStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastPaymentDate: function(val, state) {
            context["field"] = "lastPaymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentDate"] : null);
            state['lastPaymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalSize: function(val, state) {
            context["field"] = "totalSize";
            context["metadata"] = (objectMetadata ? objectMetadata["totalSize"] : null);
            state['totalSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageSize: function(val, state) {
            context["field"] = "pageSize";
            context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
            state['pageSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageStart: function(val, state) {
            context["field"] = "pageStart";
            context["metadata"] = (objectMetadata ? objectMetadata["pageStart"] : null);
            state['pageStart'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        directDebits: function(val, state) {
            context["field"] = "directDebits";
            context["metadata"] = (objectMetadata ? objectMetadata["directDebits"] : null);
            state['directDebits'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        revokeDate: function(val, state) {
            context["field"] = "revokeDate";
            context["metadata"] = (objectMetadata ? objectMetadata["revokeDate"] : null);
            state['revokeDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pendingApproval: function(val, state) {
            context["field"] = "pendingApproval";
            context["metadata"] = (objectMetadata ? objectMetadata["pendingApproval"] : null);
            state['pendingApproval'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        revokeChequeTypeId: function(val, state) {
            context["field"] = "revokeChequeTypeId";
            context["metadata"] = (objectMetadata ? objectMetadata["revokeChequeTypeId"] : null);
            state['revokeChequeTypeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isRevoke: function(val, state) {
            context["field"] = "isRevoke";
            context["metadata"] = (objectMetadata ? objectMetadata["isRevoke"] : null);
            state['isRevoke'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        stopReason: function(val, state) {
            context["field"] = "stopReason";
            context["metadata"] = (objectMetadata ? objectMetadata["stopReason"] : null);
            state['stopReason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        address: function(val, state) {
            context["field"] = "address";
            context["metadata"] = (objectMetadata ? objectMetadata["address"] : null);
            state['address'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deliveryType: function(val, state) {
            context["field"] = "deliveryType";
            context["metadata"] = (objectMetadata ? objectMetadata["deliveryType"] : null);
            state['deliveryType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        numberOfChequeBooks: function(val, state) {
            context["field"] = "numberOfChequeBooks";
            context["metadata"] = (objectMetadata ? objectMetadata["numberOfChequeBooks"] : null);
            state['numberOfChequeBooks'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        numberOfLeaves: function(val, state) {
            context["field"] = "numberOfLeaves";
            context["metadata"] = (objectMetadata ? objectMetadata["numberOfLeaves"] : null);
            state['numberOfLeaves'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditValueDate: function(val, state) {
            context["field"] = "creditValueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["creditValueDate"] : null);
            state['creditValueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorDetails: function(val, state) {
            context["field"] = "errorDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["errorDetails"] : null);
            state['errorDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ChequeBook(defaultValues) {
        var privateState = {};
        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "category";
        context["metadata"] = (objectMetadata ? objectMetadata["category"] : null);
        privateState.category = defaultValues ?
            (defaultValues["category"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["category"], context) :
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

        context["field"] = "checkNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["checkNumber"] : null);
        privateState.checkNumber = defaultValues ?
            (defaultValues["checkNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkNumber"], context) :
                null) :
            null;

        context["field"] = "deliverBy";
        context["metadata"] = (objectMetadata ? objectMetadata["deliverBy"] : null);
        privateState.deliverBy = defaultValues ?
            (defaultValues["deliverBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deliverBy"], context) :
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

        context["field"] = "fromAccountBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountBalance"] : null);
        privateState.fromAccountBalance = defaultValues ?
            (defaultValues["fromAccountBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountBalance"], context) :
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

        context["field"] = "fromAccountType";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountType"] : null);
        privateState.fromAccountType = defaultValues ?
            (defaultValues["fromAccountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountType"], context) :
                null) :
            null;

        context["field"] = "fromCheckNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["fromCheckNumber"] : null);
        privateState.fromCheckNumber = defaultValues ?
            (defaultValues["fromCheckNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromCheckNumber"], context) :
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

        context["field"] = "limit";
        context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
        privateState.limit = defaultValues ?
            (defaultValues["limit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limit"], context) :
                null) :
            null;

        context["field"] = "numberOfRecurrences";
        context["metadata"] = (objectMetadata ? objectMetadata["numberOfRecurrences"] : null);
        privateState.numberOfRecurrences = defaultValues ?
            (defaultValues["numberOfRecurrences"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["numberOfRecurrences"], context) :
                null) :
            null;

        context["field"] = "offset";
        context["metadata"] = (objectMetadata ? objectMetadata["offset"] : null);
        privateState.offset = defaultValues ?
            (defaultValues["offset"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["offset"], context) :
                null) :
            null;

        context["field"] = "order";
        context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
        privateState.order = defaultValues ?
            (defaultValues["order"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["order"], context) :
                null) :
            null;

        context["field"] = "otp";
        context["metadata"] = (objectMetadata ? objectMetadata["otp"] : null);
        privateState.otp = defaultValues ?
            (defaultValues["otp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otp"], context) :
                null) :
            null;

        context["field"] = "payeeAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeAccountNumber"] : null);
        privateState.payeeAccountNumber = defaultValues ?
            (defaultValues["payeeAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeAccountNumber"], context) :
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

        context["field"] = "payPersonPhone";
        context["metadata"] = (objectMetadata ? objectMetadata["payPersonPhone"] : null);
        privateState.payPersonPhone = defaultValues ?
            (defaultValues["payPersonPhone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payPersonPhone"], context) :
                null) :
            null;

        context["field"] = "personId";
        context["metadata"] = (objectMetadata ? objectMetadata["personId"] : null);
        privateState.personId = defaultValues ?
            (defaultValues["personId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["personId"], context) :
                null) :
            null;

        context["field"] = "recurrenceDesc";
        context["metadata"] = (objectMetadata ? objectMetadata["recurrenceDesc"] : null);
        privateState.recurrenceDesc = defaultValues ?
            (defaultValues["recurrenceDesc"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recurrenceDesc"], context) :
                null) :
            null;

        context["field"] = "referenceId";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceId"] : null);
        privateState.referenceId = defaultValues ?
            (defaultValues["referenceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceId"], context) :
                null) :
            null;

        context["field"] = "scheduledDate";
        context["metadata"] = (objectMetadata ? objectMetadata["scheduledDate"] : null);
        privateState.scheduledDate = defaultValues ?
            (defaultValues["scheduledDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["scheduledDate"], context) :
                null) :
            null;

        context["field"] = "sortBy";
        context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
        privateState.sortBy = defaultValues ?
            (defaultValues["sortBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortBy"], context) :
                null) :
            null;

        context["field"] = "statusDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["statusDescription"] : null);
        privateState.statusDescription = defaultValues ?
            (defaultValues["statusDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["statusDescription"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
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

        context["field"] = "toAccountType";
        context["metadata"] = (objectMetadata ? objectMetadata["toAccountType"] : null);
        privateState.toAccountType = defaultValues ?
            (defaultValues["toAccountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toAccountType"], context) :
                null) :
            null;

        context["field"] = "toCheckNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["toCheckNumber"] : null);
        privateState.toCheckNumber = defaultValues ?
            (defaultValues["toCheckNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toCheckNumber"], context) :
                null) :
            null;

        context["field"] = "totalAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
        privateState.totalAmount = defaultValues ?
            (defaultValues["totalAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalAmount"], context) :
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

        context["field"] = "validDate";
        context["metadata"] = (objectMetadata ? objectMetadata["validDate"] : null);
        privateState.validDate = defaultValues ?
            (defaultValues["validDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["validDate"], context) :
                null) :
            null;

        context["field"] = "overdraft";
        context["metadata"] = (objectMetadata ? objectMetadata["overdraft"] : null);
        privateState.overdraft = defaultValues ?
            (defaultValues["overdraft"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["overdraft"], context) :
                null) :
            null;

        context["field"] = "frontImage1";
        context["metadata"] = (objectMetadata ? objectMetadata["frontImage1"] : null);
        privateState.frontImage1 = defaultValues ?
            (defaultValues["frontImage1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["frontImage1"], context) :
                null) :
            null;

        context["field"] = "frontImage2";
        context["metadata"] = (objectMetadata ? objectMetadata["frontImage2"] : null);
        privateState.frontImage2 = defaultValues ?
            (defaultValues["frontImage2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["frontImage2"], context) :
                null) :
            null;

        context["field"] = "checkDesc";
        context["metadata"] = (objectMetadata ? objectMetadata["checkDesc"] : null);
        privateState.checkDesc = defaultValues ?
            (defaultValues["checkDesc"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkDesc"], context) :
                null) :
            null;

        context["field"] = "checkNumber1";
        context["metadata"] = (objectMetadata ? objectMetadata["checkNumber1"] : null);
        privateState.checkNumber1 = defaultValues ?
            (defaultValues["checkNumber1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkNumber1"], context) :
                null) :
            null;

        context["field"] = "checkNumber2";
        context["metadata"] = (objectMetadata ? objectMetadata["checkNumber2"] : null);
        privateState.checkNumber2 = defaultValues ?
            (defaultValues["checkNumber2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkNumber2"], context) :
                null) :
            null;

        context["field"] = "totalCheckAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalCheckAmount"] : null);
        privateState.totalCheckAmount = defaultValues ?
            (defaultValues["totalCheckAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalCheckAmount"], context) :
                null) :
            null;

        context["field"] = "payeeCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeCurrency"] : null);
        privateState.payeeCurrency = defaultValues ?
            (defaultValues["payeeCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeCurrency"], context) :
                null) :
            null;

        context["field"] = "country";
        context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
        privateState.country = defaultValues ?
            (defaultValues["country"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["country"], context) :
                null) :
            null;

        context["field"] = "zipCode";
        context["metadata"] = (objectMetadata ? objectMetadata["zipCode"] : null);
        privateState.zipCode = defaultValues ?
            (defaultValues["zipCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["zipCode"], context) :
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

        context["field"] = "checkDateOfIssue";
        context["metadata"] = (objectMetadata ? objectMetadata["checkDateOfIssue"] : null);
        privateState.checkDateOfIssue = defaultValues ?
            (defaultValues["checkDateOfIssue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkDateOfIssue"], context) :
                null) :
            null;

        context["field"] = "checkReason";
        context["metadata"] = (objectMetadata ? objectMetadata["checkReason"] : null);
        privateState.checkReason = defaultValues ?
            (defaultValues["checkReason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkReason"], context) :
                null) :
            null;

        context["field"] = "amountRecieved";
        context["metadata"] = (objectMetadata ? objectMetadata["amountRecieved"] : null);
        privateState.amountRecieved = defaultValues ?
            (defaultValues["amountRecieved"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amountRecieved"], context) :
                null) :
            null;

        context["field"] = "requestValidityInMonths";
        context["metadata"] = (objectMetadata ? objectMetadata["requestValidityInMonths"] : null);
        privateState.requestValidityInMonths = defaultValues ?
            (defaultValues["requestValidityInMonths"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestValidityInMonths"], context) :
                null) :
            null;

        context["field"] = "requestValidity";
        context["metadata"] = (objectMetadata ? objectMetadata["requestValidity"] : null);
        privateState.requestValidity = defaultValues ?
            (defaultValues["requestValidity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestValidity"], context) :
                null) :
            null;

        context["field"] = "requestType";
        context["metadata"] = (objectMetadata ? objectMetadata["requestType"] : null);
        privateState.requestType = defaultValues ?
            (defaultValues["requestType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestType"], context) :
                null) :
            null;

        context["field"] = "isOverdraft";
        context["metadata"] = (objectMetadata ? objectMetadata["isOverdraft"] : null);
        privateState.isOverdraft = defaultValues ?
            (defaultValues["isOverdraft"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isOverdraft"], context) :
                null) :
            null;

        context["field"] = "title";
        context["metadata"] = (objectMetadata ? objectMetadata["title"] : null);
        privateState.title = defaultValues ?
            (defaultValues["title"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["title"], context) :
                null) :
            null;

        context["field"] = "valueDateTime";
        context["metadata"] = (objectMetadata ? objectMetadata["valueDateTime"] : null);
        privateState.valueDateTime = defaultValues ?
            (defaultValues["valueDateTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["valueDateTime"], context) :
                null) :
            null;

        context["field"] = "transactionInformation";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionInformation"] : null);
        privateState.transactionInformation = defaultValues ?
            (defaultValues["transactionInformation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionInformation"], context) :
                null) :
            null;

        context["field"] = "transactionAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
        privateState.transactionAmount = defaultValues ?
            (defaultValues["transactionAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionAmount"], context) :
                null) :
            null;

        context["field"] = "transactionCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
        privateState.transactionCurrency = defaultValues ?
            (defaultValues["transactionCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCurrency"], context) :
                null) :
            null;

        context["field"] = "chargeAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["chargeAmount"] : null);
        privateState.chargeAmount = defaultValues ?
            (defaultValues["chargeAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chargeAmount"], context) :
                null) :
            null;

        context["field"] = "chargeCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["chargeCurrency"] : null);
        privateState.chargeCurrency = defaultValues ?
            (defaultValues["chargeCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chargeCurrency"], context) :
                null) :
            null;

        context["field"] = "targetCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["targetCurrency"] : null);
        privateState.targetCurrency = defaultValues ?
            (defaultValues["targetCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["targetCurrency"], context) :
                null) :
            null;

        context["field"] = "unitCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["unitCurrency"] : null);
        privateState.unitCurrency = defaultValues ?
            (defaultValues["unitCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unitCurrency"], context) :
                null) :
            null;

        context["field"] = "transactionCode";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCode"] : null);
        privateState.transactionCode = defaultValues ?
            (defaultValues["transactionCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCode"], context) :
                null) :
            null;

        context["field"] = "balanceType";
        context["metadata"] = (objectMetadata ? objectMetadata["balanceType"] : null);
        privateState.balanceType = defaultValues ?
            (defaultValues["balanceType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["balanceType"], context) :
                null) :
            null;

        context["field"] = "balanceAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["balanceAmount"] : null);
        privateState.balanceAmount = defaultValues ?
            (defaultValues["balanceAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["balanceAmount"], context) :
                null) :
            null;

        context["field"] = "balanceCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["balanceCurrency"] : null);
        privateState.balanceCurrency = defaultValues ?
            (defaultValues["balanceCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["balanceCurrency"], context) :
                null) :
            null;

        context["field"] = "sortCode";
        context["metadata"] = (objectMetadata ? objectMetadata["sortCode"] : null);
        privateState.sortCode = defaultValues ?
            (defaultValues["sortCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortCode"], context) :
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

        context["field"] = "linkSelf";
        context["metadata"] = (objectMetadata ? objectMetadata["linkSelf"] : null);
        privateState.linkSelf = defaultValues ?
            (defaultValues["linkSelf"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["linkSelf"], context) :
                null) :
            null;

        context["field"] = "createdDate";
        context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
        privateState.createdDate = defaultValues ?
            (defaultValues["createdDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdDate"], context) :
                null) :
            null;

        context["field"] = "dataStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["dataStatus"] : null);
        privateState.dataStatus = defaultValues ?
            (defaultValues["dataStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dataStatus"], context) :
                null) :
            null;

        context["field"] = "fileType";
        context["metadata"] = (objectMetadata ? objectMetadata["fileType"] : null);
        privateState.fileType = defaultValues ?
            (defaultValues["fileType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileType"], context) :
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

        context["field"] = "payPersonNickName";
        context["metadata"] = (objectMetadata ? objectMetadata["payPersonNickName"] : null);
        privateState.payPersonNickName = defaultValues ?
            (defaultValues["payPersonNickName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payPersonNickName"], context) :
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

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "postedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["postedDate"] : null);
        privateState.postedDate = defaultValues ?
            (defaultValues["postedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["postedDate"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "paidBy";
        context["metadata"] = (objectMetadata ? objectMetadata["paidBy"] : null);
        privateState.paidBy = defaultValues ?
            (defaultValues["paidBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paidBy"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "paymentType";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentType"] : null);
        privateState.paymentType = defaultValues ?
            (defaultValues["paymentType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentType"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "feeAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["feeAmount"] : null);
        privateState.feeAmount = defaultValues ?
            (defaultValues["feeAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["feeAmount"], context) :
                null) :
            null;

        context["field"] = "chequeNumberStart";
        context["metadata"] = (objectMetadata ? objectMetadata["chequeNumberStart"] : null);
        privateState.chequeNumberStart = defaultValues ?
            (defaultValues["chequeNumberStart"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chequeNumberStart"], context) :
                null) :
            null;

        context["field"] = "chequeId";
        context["metadata"] = (objectMetadata ? objectMetadata["chequeId"] : null);
        privateState.chequeId = defaultValues ?
            (defaultValues["chequeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chequeId"], context) :
                null) :
            null;

        context["field"] = "defaultIssueNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["defaultIssueNumber"] : null);
        privateState.defaultIssueNumber = defaultValues ?
            (defaultValues["defaultIssueNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["defaultIssueNumber"], context) :
                null) :
            null;

        context["field"] = "note";
        context["metadata"] = (objectMetadata ? objectMetadata["note"] : null);
        privateState.note = defaultValues ?
            (defaultValues["note"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["note"], context) :
                null) :
            null;

        context["field"] = "chequeStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["chequeStatus"] : null);
        privateState.chequeStatus = defaultValues ?
            (defaultValues["chequeStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chequeStatus"], context) :
                null) :
            null;

        context["field"] = "chequeIssueId";
        context["metadata"] = (objectMetadata ? objectMetadata["chequeIssueId"] : null);
        privateState.chequeIssueId = defaultValues ?
            (defaultValues["chequeIssueId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chequeIssueId"], context) :
                null) :
            null;

        context["field"] = "issueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
        privateState.issueDate = defaultValues ?
            (defaultValues["issueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issueDate"], context) :
                null) :
            null;

        context["field"] = "numberIssued";
        context["metadata"] = (objectMetadata ? objectMetadata["numberIssued"] : null);
        privateState.numberIssued = defaultValues ?
            (defaultValues["numberIssued"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["numberIssued"], context) :
                null) :
            null;

        context["field"] = "validate";
        context["metadata"] = (objectMetadata ? objectMetadata["validate"] : null);
        privateState.validate = defaultValues ?
            (defaultValues["validate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["validate"], context) :
                null) :
            null;

        context["field"] = "currencyId";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyId"] : null);
        privateState.currencyId = defaultValues ?
            (defaultValues["currencyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyId"], context) :
                null) :
            null;

        context["field"] = "amountRange";
        context["metadata"] = (objectMetadata ? objectMetadata["amountRange"] : null);
        privateState.amountRange = defaultValues ?
            (defaultValues["amountRange"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amountRange"], context) :
                null) :
            null;

        context["field"] = "chequeRange";
        context["metadata"] = (objectMetadata ? objectMetadata["chequeRange"] : null);
        privateState.chequeRange = defaultValues ?
            (defaultValues["chequeRange"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chequeRange"], context) :
                null) :
            null;

        context["field"] = "fileNames";
        context["metadata"] = (objectMetadata ? objectMetadata["fileNames"] : null);
        privateState.fileNames = defaultValues ?
            (defaultValues["fileNames"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileNames"], context) :
                null) :
            null;

        context["field"] = "toDate";
        context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
        privateState.toDate = defaultValues ?
            (defaultValues["toDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toDate"], context) :
                null) :
            null;

        context["field"] = "fees";
        context["metadata"] = (objectMetadata ? objectMetadata["fees"] : null);
        privateState.fees = defaultValues ?
            (defaultValues["fees"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fees"], context) :
                null) :
            null;

        context["field"] = "lastWorkingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lastWorkingDate"] : null);
        privateState.lastWorkingDate = defaultValues ?
            (defaultValues["lastWorkingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastWorkingDate"], context) :
                null) :
            null;

        context["field"] = "currentWorkingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["currentWorkingDate"] : null);
        privateState.currentWorkingDate = defaultValues ?
            (defaultValues["currentWorkingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentWorkingDate"], context) :
                null) :
            null;

        context["field"] = "transactionReference";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
        privateState.transactionReference = defaultValues ?
            (defaultValues["transactionReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionReference"], context) :
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

        context["field"] = "principal";
        context["metadata"] = (objectMetadata ? objectMetadata["principal"] : null);
        privateState.principal = defaultValues ?
            (defaultValues["principal"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["principal"], context) :
                null) :
            null;

        context["field"] = "Date";
        context["metadata"] = (objectMetadata ? objectMetadata["Date"] : null);
        privateState.Date = defaultValues ?
            (defaultValues["Date"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Date"], context) :
                null) :
            null;

        context["field"] = "paymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
        privateState.paymentDate = defaultValues ?
            (defaultValues["paymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDate"], context) :
                null) :
            null;

        context["field"] = "charges";
        context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
        privateState.charges = defaultValues ?
            (defaultValues["charges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["charges"], context) :
                null) :
            null;

        context["field"] = "outstandingBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance"] : null);
        privateState.outstandingBalance = defaultValues ?
            (defaultValues["outstandingBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["outstandingBalance"], context) :
                null) :
            null;

        context["field"] = "orderId";
        context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
        privateState.orderId = defaultValues ?
            (defaultValues["orderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderId"], context) :
                null) :
            null;

        context["field"] = "orderedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["orderedDate"] : null);
        privateState.orderedDate = defaultValues ?
            (defaultValues["orderedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderedDate"], context) :
                null) :
            null;

        context["field"] = "uploadedattachments";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedattachments"] : null);
        privateState.uploadedattachments = defaultValues ?
            (defaultValues["uploadedattachments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedattachments"], context) :
                null) :
            null;

        context["field"] = "directDebitId";
        context["metadata"] = (objectMetadata ? objectMetadata["directDebitId"] : null);
        privateState.directDebitId = defaultValues ?
            (defaultValues["directDebitId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["directDebitId"], context) :
                null) :
            null;

        context["field"] = "directDebitStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["directDebitStatus"] : null);
        privateState.directDebitStatus = defaultValues ?
            (defaultValues["directDebitStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["directDebitStatus"], context) :
                null) :
            null;

        context["field"] = "lastPaymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentDate"] : null);
        privateState.lastPaymentDate = defaultValues ?
            (defaultValues["lastPaymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastPaymentDate"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "totalSize";
        context["metadata"] = (objectMetadata ? objectMetadata["totalSize"] : null);
        privateState.totalSize = defaultValues ?
            (defaultValues["totalSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalSize"], context) :
                null) :
            null;

        context["field"] = "pageSize";
        context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
        privateState.pageSize = defaultValues ?
            (defaultValues["pageSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageSize"], context) :
                null) :
            null;

        context["field"] = "pageStart";
        context["metadata"] = (objectMetadata ? objectMetadata["pageStart"] : null);
        privateState.pageStart = defaultValues ?
            (defaultValues["pageStart"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageStart"], context) :
                null) :
            null;

        context["field"] = "directDebits";
        context["metadata"] = (objectMetadata ? objectMetadata["directDebits"] : null);
        privateState.directDebits = defaultValues ?
            (defaultValues["directDebits"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["directDebits"], context) :
                null) :
            null;

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "revokeDate";
        context["metadata"] = (objectMetadata ? objectMetadata["revokeDate"] : null);
        privateState.revokeDate = defaultValues ?
            (defaultValues["revokeDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["revokeDate"], context) :
                null) :
            null;

        context["field"] = "pendingApproval";
        context["metadata"] = (objectMetadata ? objectMetadata["pendingApproval"] : null);
        privateState.pendingApproval = defaultValues ?
            (defaultValues["pendingApproval"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pendingApproval"], context) :
                null) :
            null;

        context["field"] = "revokeChequeTypeId";
        context["metadata"] = (objectMetadata ? objectMetadata["revokeChequeTypeId"] : null);
        privateState.revokeChequeTypeId = defaultValues ?
            (defaultValues["revokeChequeTypeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["revokeChequeTypeId"], context) :
                null) :
            null;

        context["field"] = "isRevoke";
        context["metadata"] = (objectMetadata ? objectMetadata["isRevoke"] : null);
        privateState.isRevoke = defaultValues ?
            (defaultValues["isRevoke"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isRevoke"], context) :
                null) :
            null;

        context["field"] = "stopReason";
        context["metadata"] = (objectMetadata ? objectMetadata["stopReason"] : null);
        privateState.stopReason = defaultValues ?
            (defaultValues["stopReason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["stopReason"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "address";
        context["metadata"] = (objectMetadata ? objectMetadata["address"] : null);
        privateState.address = defaultValues ?
            (defaultValues["address"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["address"], context) :
                null) :
            null;

        context["field"] = "deliveryType";
        context["metadata"] = (objectMetadata ? objectMetadata["deliveryType"] : null);
        privateState.deliveryType = defaultValues ?
            (defaultValues["deliveryType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deliveryType"], context) :
                null) :
            null;

        context["field"] = "numberOfChequeBooks";
        context["metadata"] = (objectMetadata ? objectMetadata["numberOfChequeBooks"] : null);
        privateState.numberOfChequeBooks = defaultValues ?
            (defaultValues["numberOfChequeBooks"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["numberOfChequeBooks"], context) :
                null) :
            null;

        context["field"] = "numberOfLeaves";
        context["metadata"] = (objectMetadata ? objectMetadata["numberOfLeaves"] : null);
        privateState.numberOfLeaves = defaultValues ?
            (defaultValues["numberOfLeaves"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["numberOfLeaves"], context) :
                null) :
            null;

        context["field"] = "creditValueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["creditValueDate"] : null);
        privateState.creditValueDate = defaultValues ?
            (defaultValues["creditValueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditValueDate"], context) :
                null) :
            null;

        context["field"] = "errorDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["errorDetails"] : null);
        privateState.errorDetails = defaultValues ?
            (defaultValues["errorDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorDetails"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "accountID": {
                get: function() {
                    context["field"] = "accountID";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountID, context);
                },
                set: function(val) {
                    setterFunctions['accountID'].call(this, val, privateState);
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
            "limit": {
                get: function() {
                    context["field"] = "limit";
                    context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limit, context);
                },
                set: function(val) {
                    setterFunctions['limit'].call(this, val, privateState);
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
            "offset": {
                get: function() {
                    context["field"] = "offset";
                    context["metadata"] = (objectMetadata ? objectMetadata["offset"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.offset, context);
                },
                set: function(val) {
                    setterFunctions['offset'].call(this, val, privateState);
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
            "otp": {
                get: function() {
                    context["field"] = "otp";
                    context["metadata"] = (objectMetadata ? objectMetadata["otp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otp, context);
                },
                set: function(val) {
                    setterFunctions['otp'].call(this, val, privateState);
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
            "toCheckNumber": {
                get: function() {
                    context["field"] = "toCheckNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["toCheckNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toCheckNumber, context);
                },
                set: function(val) {
                    setterFunctions['toCheckNumber'].call(this, val, privateState);
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
            "validDate": {
                get: function() {
                    context["field"] = "validDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["validDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.validDate, context);
                },
                set: function(val) {
                    setterFunctions['validDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "overdraft": {
                get: function() {
                    context["field"] = "overdraft";
                    context["metadata"] = (objectMetadata ? objectMetadata["overdraft"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.overdraft, context);
                },
                set: function(val) {
                    setterFunctions['overdraft'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "frontImage1": {
                get: function() {
                    context["field"] = "frontImage1";
                    context["metadata"] = (objectMetadata ? objectMetadata["frontImage1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.frontImage1, context);
                },
                set: function(val) {
                    setterFunctions['frontImage1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "frontImage2": {
                get: function() {
                    context["field"] = "frontImage2";
                    context["metadata"] = (objectMetadata ? objectMetadata["frontImage2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.frontImage2, context);
                },
                set: function(val) {
                    setterFunctions['frontImage2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "checkDesc": {
                get: function() {
                    context["field"] = "checkDesc";
                    context["metadata"] = (objectMetadata ? objectMetadata["checkDesc"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.checkDesc, context);
                },
                set: function(val) {
                    setterFunctions['checkDesc'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "checkNumber1": {
                get: function() {
                    context["field"] = "checkNumber1";
                    context["metadata"] = (objectMetadata ? objectMetadata["checkNumber1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.checkNumber1, context);
                },
                set: function(val) {
                    setterFunctions['checkNumber1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "checkNumber2": {
                get: function() {
                    context["field"] = "checkNumber2";
                    context["metadata"] = (objectMetadata ? objectMetadata["checkNumber2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.checkNumber2, context);
                },
                set: function(val) {
                    setterFunctions['checkNumber2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalCheckAmount": {
                get: function() {
                    context["field"] = "totalCheckAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalCheckAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalCheckAmount, context);
                },
                set: function(val) {
                    setterFunctions['totalCheckAmount'].call(this, val, privateState);
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
            "checkReason": {
                get: function() {
                    context["field"] = "checkReason";
                    context["metadata"] = (objectMetadata ? objectMetadata["checkReason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.checkReason, context);
                },
                set: function(val) {
                    setterFunctions['checkReason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amountRecieved": {
                get: function() {
                    context["field"] = "amountRecieved";
                    context["metadata"] = (objectMetadata ? objectMetadata["amountRecieved"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amountRecieved, context);
                },
                set: function(val) {
                    setterFunctions['amountRecieved'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestValidityInMonths": {
                get: function() {
                    context["field"] = "requestValidityInMonths";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestValidityInMonths"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestValidityInMonths, context);
                },
                set: function(val) {
                    setterFunctions['requestValidityInMonths'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestValidity": {
                get: function() {
                    context["field"] = "requestValidity";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestValidity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestValidity, context);
                },
                set: function(val) {
                    setterFunctions['requestValidity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestType": {
                get: function() {
                    context["field"] = "requestType";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestType, context);
                },
                set: function(val) {
                    setterFunctions['requestType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isOverdraft": {
                get: function() {
                    context["field"] = "isOverdraft";
                    context["metadata"] = (objectMetadata ? objectMetadata["isOverdraft"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isOverdraft, context);
                },
                set: function(val) {
                    setterFunctions['isOverdraft'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "title": {
                get: function() {
                    context["field"] = "title";
                    context["metadata"] = (objectMetadata ? objectMetadata["title"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.title, context);
                },
                set: function(val) {
                    setterFunctions['title'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "valueDateTime": {
                get: function() {
                    context["field"] = "valueDateTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["valueDateTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.valueDateTime, context);
                },
                set: function(val) {
                    setterFunctions['valueDateTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionInformation": {
                get: function() {
                    context["field"] = "transactionInformation";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionInformation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionInformation, context);
                },
                set: function(val) {
                    setterFunctions['transactionInformation'].call(this, val, privateState);
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
            "chargeAmount": {
                get: function() {
                    context["field"] = "chargeAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["chargeAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chargeAmount, context);
                },
                set: function(val) {
                    setterFunctions['chargeAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chargeCurrency": {
                get: function() {
                    context["field"] = "chargeCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["chargeCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chargeCurrency, context);
                },
                set: function(val) {
                    setterFunctions['chargeCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "targetCurrency": {
                get: function() {
                    context["field"] = "targetCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["targetCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.targetCurrency, context);
                },
                set: function(val) {
                    setterFunctions['targetCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "unitCurrency": {
                get: function() {
                    context["field"] = "unitCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["unitCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unitCurrency, context);
                },
                set: function(val) {
                    setterFunctions['unitCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionCode": {
                get: function() {
                    context["field"] = "transactionCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionCode, context);
                },
                set: function(val) {
                    setterFunctions['transactionCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "balanceType": {
                get: function() {
                    context["field"] = "balanceType";
                    context["metadata"] = (objectMetadata ? objectMetadata["balanceType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.balanceType, context);
                },
                set: function(val) {
                    setterFunctions['balanceType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "balanceAmount": {
                get: function() {
                    context["field"] = "balanceAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["balanceAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.balanceAmount, context);
                },
                set: function(val) {
                    setterFunctions['balanceAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "balanceCurrency": {
                get: function() {
                    context["field"] = "balanceCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["balanceCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.balanceCurrency, context);
                },
                set: function(val) {
                    setterFunctions['balanceCurrency'].call(this, val, privateState);
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
            "linkSelf": {
                get: function() {
                    context["field"] = "linkSelf";
                    context["metadata"] = (objectMetadata ? objectMetadata["linkSelf"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.linkSelf, context);
                },
                set: function(val) {
                    setterFunctions['linkSelf'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdDate": {
                get: function() {
                    context["field"] = "createdDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdDate, context);
                },
                set: function(val) {
                    setterFunctions['createdDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dataStatus": {
                get: function() {
                    context["field"] = "dataStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["dataStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dataStatus, context);
                },
                set: function(val) {
                    setterFunctions['dataStatus'].call(this, val, privateState);
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
            "payPersonNickName": {
                get: function() {
                    context["field"] = "payPersonNickName";
                    context["metadata"] = (objectMetadata ? objectMetadata["payPersonNickName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payPersonNickName, context);
                },
                set: function(val) {
                    setterFunctions['payPersonNickName'].call(this, val, privateState);
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
            "currencyCode": {
                get: function() {
                    context["field"] = "currencyCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currencyCode, context);
                },
                set: function(val) {
                    setterFunctions['currencyCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "postedDate": {
                get: function() {
                    context["field"] = "postedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["postedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.postedDate, context);
                },
                set: function(val) {
                    setterFunctions['postedDate'].call(this, val, privateState);
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
            "chequeNumberStart": {
                get: function() {
                    context["field"] = "chequeNumberStart";
                    context["metadata"] = (objectMetadata ? objectMetadata["chequeNumberStart"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chequeNumberStart, context);
                },
                set: function(val) {
                    setterFunctions['chequeNumberStart'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chequeId": {
                get: function() {
                    context["field"] = "chequeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["chequeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chequeId, context);
                },
                set: function(val) {
                    setterFunctions['chequeId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "defaultIssueNumber": {
                get: function() {
                    context["field"] = "defaultIssueNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["defaultIssueNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.defaultIssueNumber, context);
                },
                set: function(val) {
                    setterFunctions['defaultIssueNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "note": {
                get: function() {
                    context["field"] = "note";
                    context["metadata"] = (objectMetadata ? objectMetadata["note"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.note, context);
                },
                set: function(val) {
                    setterFunctions['note'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chequeStatus": {
                get: function() {
                    context["field"] = "chequeStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["chequeStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chequeStatus, context);
                },
                set: function(val) {
                    setterFunctions['chequeStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chequeIssueId": {
                get: function() {
                    context["field"] = "chequeIssueId";
                    context["metadata"] = (objectMetadata ? objectMetadata["chequeIssueId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chequeIssueId, context);
                },
                set: function(val) {
                    setterFunctions['chequeIssueId'].call(this, val, privateState);
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
            "numberIssued": {
                get: function() {
                    context["field"] = "numberIssued";
                    context["metadata"] = (objectMetadata ? objectMetadata["numberIssued"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.numberIssued, context);
                },
                set: function(val) {
                    setterFunctions['numberIssued'].call(this, val, privateState);
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
            "currencyId": {
                get: function() {
                    context["field"] = "currencyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["currencyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currencyId, context);
                },
                set: function(val) {
                    setterFunctions['currencyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amountRange": {
                get: function() {
                    context["field"] = "amountRange";
                    context["metadata"] = (objectMetadata ? objectMetadata["amountRange"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amountRange, context);
                },
                set: function(val) {
                    setterFunctions['amountRange'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chequeRange": {
                get: function() {
                    context["field"] = "chequeRange";
                    context["metadata"] = (objectMetadata ? objectMetadata["chequeRange"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chequeRange, context);
                },
                set: function(val) {
                    setterFunctions['chequeRange'].call(this, val, privateState);
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
            "toDate": {
                get: function() {
                    context["field"] = "toDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toDate, context);
                },
                set: function(val) {
                    setterFunctions['toDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fees": {
                get: function() {
                    context["field"] = "fees";
                    context["metadata"] = (objectMetadata ? objectMetadata["fees"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fees, context);
                },
                set: function(val) {
                    setterFunctions['fees'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastWorkingDate": {
                get: function() {
                    context["field"] = "lastWorkingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastWorkingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastWorkingDate, context);
                },
                set: function(val) {
                    setterFunctions['lastWorkingDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentWorkingDate": {
                get: function() {
                    context["field"] = "currentWorkingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentWorkingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentWorkingDate, context);
                },
                set: function(val) {
                    setterFunctions['currentWorkingDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionReference": {
                get: function() {
                    context["field"] = "transactionReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionReference, context);
                },
                set: function(val) {
                    setterFunctions['transactionReference'].call(this, val, privateState);
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
            "principal": {
                get: function() {
                    context["field"] = "principal";
                    context["metadata"] = (objectMetadata ? objectMetadata["principal"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.principal, context);
                },
                set: function(val) {
                    setterFunctions['principal'].call(this, val, privateState);
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
            "outstandingBalance": {
                get: function() {
                    context["field"] = "outstandingBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.outstandingBalance, context);
                },
                set: function(val) {
                    setterFunctions['outstandingBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "orderId": {
                get: function() {
                    context["field"] = "orderId";
                    context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orderId, context);
                },
                set: function(val) {
                    setterFunctions['orderId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "orderedDate": {
                get: function() {
                    context["field"] = "orderedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["orderedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orderedDate, context);
                },
                set: function(val) {
                    setterFunctions['orderedDate'].call(this, val, privateState);
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
            "directDebitId": {
                get: function() {
                    context["field"] = "directDebitId";
                    context["metadata"] = (objectMetadata ? objectMetadata["directDebitId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.directDebitId, context);
                },
                set: function(val) {
                    setterFunctions['directDebitId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "directDebitStatus": {
                get: function() {
                    context["field"] = "directDebitStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["directDebitStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.directDebitStatus, context);
                },
                set: function(val) {
                    setterFunctions['directDebitStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastPaymentDate": {
                get: function() {
                    context["field"] = "lastPaymentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastPaymentDate, context);
                },
                set: function(val) {
                    setterFunctions['lastPaymentDate'].call(this, val, privateState);
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
            "totalSize": {
                get: function() {
                    context["field"] = "totalSize";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalSize"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalSize, context);
                },
                set: function(val) {
                    setterFunctions['totalSize'].call(this, val, privateState);
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
            "pageStart": {
                get: function() {
                    context["field"] = "pageStart";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageStart"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageStart, context);
                },
                set: function(val) {
                    setterFunctions['pageStart'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "directDebits": {
                get: function() {
                    context["field"] = "directDebits";
                    context["metadata"] = (objectMetadata ? objectMetadata["directDebits"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.directDebits, context);
                },
                set: function(val) {
                    setterFunctions['directDebits'].call(this, val, privateState);
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
            "revokeDate": {
                get: function() {
                    context["field"] = "revokeDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["revokeDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.revokeDate, context);
                },
                set: function(val) {
                    setterFunctions['revokeDate'].call(this, val, privateState);
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
            "revokeChequeTypeId": {
                get: function() {
                    context["field"] = "revokeChequeTypeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["revokeChequeTypeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.revokeChequeTypeId, context);
                },
                set: function(val) {
                    setterFunctions['revokeChequeTypeId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isRevoke": {
                get: function() {
                    context["field"] = "isRevoke";
                    context["metadata"] = (objectMetadata ? objectMetadata["isRevoke"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isRevoke, context);
                },
                set: function(val) {
                    setterFunctions['isRevoke'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "stopReason": {
                get: function() {
                    context["field"] = "stopReason";
                    context["metadata"] = (objectMetadata ? objectMetadata["stopReason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.stopReason, context);
                },
                set: function(val) {
                    setterFunctions['stopReason'].call(this, val, privateState);
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
            "address": {
                get: function() {
                    context["field"] = "address";
                    context["metadata"] = (objectMetadata ? objectMetadata["address"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.address, context);
                },
                set: function(val) {
                    setterFunctions['address'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deliveryType": {
                get: function() {
                    context["field"] = "deliveryType";
                    context["metadata"] = (objectMetadata ? objectMetadata["deliveryType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deliveryType, context);
                },
                set: function(val) {
                    setterFunctions['deliveryType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "numberOfChequeBooks": {
                get: function() {
                    context["field"] = "numberOfChequeBooks";
                    context["metadata"] = (objectMetadata ? objectMetadata["numberOfChequeBooks"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.numberOfChequeBooks, context);
                },
                set: function(val) {
                    setterFunctions['numberOfChequeBooks'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "numberOfLeaves": {
                get: function() {
                    context["field"] = "numberOfLeaves";
                    context["metadata"] = (objectMetadata ? objectMetadata["numberOfLeaves"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.numberOfLeaves, context);
                },
                set: function(val) {
                    setterFunctions['numberOfLeaves'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.accountID = value ? (value["accountID"] ? value["accountID"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.category = value ? (value["category"] ? value["category"] : null) : null;
            privateState.checkImage = value ? (value["checkImage"] ? value["checkImage"] : null) : null;
            privateState.checkImageBack = value ? (value["checkImageBack"] ? value["checkImageBack"] : null) : null;
            privateState.checkNumber = value ? (value["checkNumber"] ? value["checkNumber"] : null) : null;
            privateState.deliverBy = value ? (value["deliverBy"] ? value["deliverBy"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.ExternalAccountNumber = value ? (value["ExternalAccountNumber"] ? value["ExternalAccountNumber"] : null) : null;
            privateState.fromAccountBalance = value ? (value["fromAccountBalance"] ? value["fromAccountBalance"] : null) : null;
            privateState.fromAccountName = value ? (value["fromAccountName"] ? value["fromAccountName"] : null) : null;
            privateState.fromAccountNumber = value ? (value["fromAccountNumber"] ? value["fromAccountNumber"] : null) : null;
            privateState.fromAccountType = value ? (value["fromAccountType"] ? value["fromAccountType"] : null) : null;
            privateState.fromCheckNumber = value ? (value["fromCheckNumber"] ? value["fromCheckNumber"] : null) : null;
            privateState.fromNickName = value ? (value["fromNickName"] ? value["fromNickName"] : null) : null;
            privateState.hasDepositImage = value ? (value["hasDepositImage"] ? value["hasDepositImage"] : null) : null;
            privateState.isScheduled = value ? (value["isScheduled"] ? value["isScheduled"] : null) : null;
            privateState.lastRecordNumber = value ? (value["lastRecordNumber"] ? value["lastRecordNumber"] : null) : null;
            privateState.limit = value ? (value["limit"] ? value["limit"] : null) : null;
            privateState.numberOfRecurrences = value ? (value["numberOfRecurrences"] ? value["numberOfRecurrences"] : null) : null;
            privateState.offset = value ? (value["offset"] ? value["offset"] : null) : null;
            privateState.order = value ? (value["order"] ? value["order"] : null) : null;
            privateState.otp = value ? (value["otp"] ? value["otp"] : null) : null;
            privateState.payeeAccountNumber = value ? (value["payeeAccountNumber"] ? value["payeeAccountNumber"] : null) : null;
            privateState.payeeId = value ? (value["payeeId"] ? value["payeeId"] : null) : null;
            privateState.payeeName = value ? (value["payeeName"] ? value["payeeName"] : null) : null;
            privateState.payeeNickName = value ? (value["payeeNickName"] ? value["payeeNickName"] : null) : null;
            privateState.payPersonEmail = value ? (value["payPersonEmail"] ? value["payPersonEmail"] : null) : null;
            privateState.payPersonName = value ? (value["payPersonName"] ? value["payPersonName"] : null) : null;
            privateState.payPersonPhone = value ? (value["payPersonPhone"] ? value["payPersonPhone"] : null) : null;
            privateState.personId = value ? (value["personId"] ? value["personId"] : null) : null;
            privateState.recurrenceDesc = value ? (value["recurrenceDesc"] ? value["recurrenceDesc"] : null) : null;
            privateState.referenceId = value ? (value["referenceId"] ? value["referenceId"] : null) : null;
            privateState.scheduledDate = value ? (value["scheduledDate"] ? value["scheduledDate"] : null) : null;
            privateState.sortBy = value ? (value["sortBy"] ? value["sortBy"] : null) : null;
            privateState.statusDescription = value ? (value["statusDescription"] ? value["statusDescription"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.toAccountName = value ? (value["toAccountName"] ? value["toAccountName"] : null) : null;
            privateState.toAccountNumber = value ? (value["toAccountNumber"] ? value["toAccountNumber"] : null) : null;
            privateState.toAccountType = value ? (value["toAccountType"] ? value["toAccountType"] : null) : null;
            privateState.toCheckNumber = value ? (value["toCheckNumber"] ? value["toCheckNumber"] : null) : null;
            privateState.totalAmount = value ? (value["totalAmount"] ? value["totalAmount"] : null) : null;
            privateState.transactionComments = value ? (value["transactionComments"] ? value["transactionComments"] : null) : null;
            privateState.transactionDate = value ? (value["transactionDate"] ? value["transactionDate"] : null) : null;
            privateState.transactionId = value ? (value["transactionId"] ? value["transactionId"] : null) : null;
            privateState.transactionsNotes = value ? (value["transactionsNotes"] ? value["transactionsNotes"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.validDate = value ? (value["validDate"] ? value["validDate"] : null) : null;
            privateState.overdraft = value ? (value["overdraft"] ? value["overdraft"] : null) : null;
            privateState.frontImage1 = value ? (value["frontImage1"] ? value["frontImage1"] : null) : null;
            privateState.frontImage2 = value ? (value["frontImage2"] ? value["frontImage2"] : null) : null;
            privateState.checkDesc = value ? (value["checkDesc"] ? value["checkDesc"] : null) : null;
            privateState.checkNumber1 = value ? (value["checkNumber1"] ? value["checkNumber1"] : null) : null;
            privateState.checkNumber2 = value ? (value["checkNumber2"] ? value["checkNumber2"] : null) : null;
            privateState.totalCheckAmount = value ? (value["totalCheckAmount"] ? value["totalCheckAmount"] : null) : null;
            privateState.payeeCurrency = value ? (value["payeeCurrency"] ? value["payeeCurrency"] : null) : null;
            privateState.country = value ? (value["country"] ? value["country"] : null) : null;
            privateState.zipCode = value ? (value["zipCode"] ? value["zipCode"] : null) : null;
            privateState.cityName = value ? (value["cityName"] ? value["cityName"] : null) : null;
            privateState.state = value ? (value["state"] ? value["state"] : null) : null;
            privateState.checkDateOfIssue = value ? (value["checkDateOfIssue"] ? value["checkDateOfIssue"] : null) : null;
            privateState.checkReason = value ? (value["checkReason"] ? value["checkReason"] : null) : null;
            privateState.amountRecieved = value ? (value["amountRecieved"] ? value["amountRecieved"] : null) : null;
            privateState.requestValidityInMonths = value ? (value["requestValidityInMonths"] ? value["requestValidityInMonths"] : null) : null;
            privateState.requestValidity = value ? (value["requestValidity"] ? value["requestValidity"] : null) : null;
            privateState.requestType = value ? (value["requestType"] ? value["requestType"] : null) : null;
            privateState.isOverdraft = value ? (value["isOverdraft"] ? value["isOverdraft"] : null) : null;
            privateState.title = value ? (value["title"] ? value["title"] : null) : null;
            privateState.valueDateTime = value ? (value["valueDateTime"] ? value["valueDateTime"] : null) : null;
            privateState.transactionInformation = value ? (value["transactionInformation"] ? value["transactionInformation"] : null) : null;
            privateState.transactionAmount = value ? (value["transactionAmount"] ? value["transactionAmount"] : null) : null;
            privateState.transactionCurrency = value ? (value["transactionCurrency"] ? value["transactionCurrency"] : null) : null;
            privateState.chargeAmount = value ? (value["chargeAmount"] ? value["chargeAmount"] : null) : null;
            privateState.chargeCurrency = value ? (value["chargeCurrency"] ? value["chargeCurrency"] : null) : null;
            privateState.targetCurrency = value ? (value["targetCurrency"] ? value["targetCurrency"] : null) : null;
            privateState.unitCurrency = value ? (value["unitCurrency"] ? value["unitCurrency"] : null) : null;
            privateState.transactionCode = value ? (value["transactionCode"] ? value["transactionCode"] : null) : null;
            privateState.balanceType = value ? (value["balanceType"] ? value["balanceType"] : null) : null;
            privateState.balanceAmount = value ? (value["balanceAmount"] ? value["balanceAmount"] : null) : null;
            privateState.balanceCurrency = value ? (value["balanceCurrency"] ? value["balanceCurrency"] : null) : null;
            privateState.sortCode = value ? (value["sortCode"] ? value["sortCode"] : null) : null;
            privateState.feeCurrency = value ? (value["feeCurrency"] ? value["feeCurrency"] : null) : null;
            privateState.feePaidByReceipent = value ? (value["feePaidByReceipent"] ? value["feePaidByReceipent"] : null) : null;
            privateState.baseCurrency = value ? (value["baseCurrency"] ? value["baseCurrency"] : null) : null;
            privateState.isInternationalAccount = value ? (value["isInternationalAccount"] ? value["isInternationalAccount"] : null) : null;
            privateState.linkSelf = value ? (value["linkSelf"] ? value["linkSelf"] : null) : null;
            privateState.createdDate = value ? (value["createdDate"] ? value["createdDate"] : null) : null;
            privateState.dataStatus = value ? (value["dataStatus"] ? value["dataStatus"] : null) : null;
            privateState.fileType = value ? (value["fileType"] ? value["fileType"] : null) : null;
            privateState.MFAAttributes = value ? (value["MFAAttributes"] ? value["MFAAttributes"] : null) : null;
            privateState.serviceName = value ? (value["serviceName"] ? value["serviceName"] : null) : null;
            privateState.payPersonNickName = value ? (value["payPersonNickName"] ? value["payPersonNickName"] : null) : null;
            privateState.fromAccountCurrency = value ? (value["fromAccountCurrency"] ? value["fromAccountCurrency"] : null) : null;
            privateState.toAccountCurrency = value ? (value["toAccountCurrency"] ? value["toAccountCurrency"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.postedDate = value ? (value["postedDate"] ? value["postedDate"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.paidBy = value ? (value["paidBy"] ? value["paidBy"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.paymentType = value ? (value["paymentType"] ? value["paymentType"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.feeAmount = value ? (value["feeAmount"] ? value["feeAmount"] : null) : null;
            privateState.chequeNumberStart = value ? (value["chequeNumberStart"] ? value["chequeNumberStart"] : null) : null;
            privateState.chequeId = value ? (value["chequeId"] ? value["chequeId"] : null) : null;
            privateState.defaultIssueNumber = value ? (value["defaultIssueNumber"] ? value["defaultIssueNumber"] : null) : null;
            privateState.note = value ? (value["note"] ? value["note"] : null) : null;
            privateState.chequeStatus = value ? (value["chequeStatus"] ? value["chequeStatus"] : null) : null;
            privateState.chequeIssueId = value ? (value["chequeIssueId"] ? value["chequeIssueId"] : null) : null;
            privateState.issueDate = value ? (value["issueDate"] ? value["issueDate"] : null) : null;
            privateState.numberIssued = value ? (value["numberIssued"] ? value["numberIssued"] : null) : null;
            privateState.validate = value ? (value["validate"] ? value["validate"] : null) : null;
            privateState.currencyId = value ? (value["currencyId"] ? value["currencyId"] : null) : null;
            privateState.amountRange = value ? (value["amountRange"] ? value["amountRange"] : null) : null;
            privateState.chequeRange = value ? (value["chequeRange"] ? value["chequeRange"] : null) : null;
            privateState.fileNames = value ? (value["fileNames"] ? value["fileNames"] : null) : null;
            privateState.toDate = value ? (value["toDate"] ? value["toDate"] : null) : null;
            privateState.fees = value ? (value["fees"] ? value["fees"] : null) : null;
            privateState.lastWorkingDate = value ? (value["lastWorkingDate"] ? value["lastWorkingDate"] : null) : null;
            privateState.currentWorkingDate = value ? (value["currentWorkingDate"] ? value["currentWorkingDate"] : null) : null;
            privateState.transactionReference = value ? (value["transactionReference"] ? value["transactionReference"] : null) : null;
            privateState.errcode = value ? (value["errcode"] ? value["errcode"] : null) : null;
            privateState.fileName = value ? (value["fileName"] ? value["fileName"] : null) : null;
            privateState.fileID = value ? (value["fileID"] ? value["fileID"] : null) : null;
            privateState.principal = value ? (value["principal"] ? value["principal"] : null) : null;
            privateState.Date = value ? (value["Date"] ? value["Date"] : null) : null;
            privateState.paymentDate = value ? (value["paymentDate"] ? value["paymentDate"] : null) : null;
            privateState.charges = value ? (value["charges"] ? value["charges"] : null) : null;
            privateState.outstandingBalance = value ? (value["outstandingBalance"] ? value["outstandingBalance"] : null) : null;
            privateState.orderId = value ? (value["orderId"] ? value["orderId"] : null) : null;
            privateState.orderedDate = value ? (value["orderedDate"] ? value["orderedDate"] : null) : null;
            privateState.uploadedattachments = value ? (value["uploadedattachments"] ? value["uploadedattachments"] : null) : null;
            privateState.directDebitId = value ? (value["directDebitId"] ? value["directDebitId"] : null) : null;
            privateState.directDebitStatus = value ? (value["directDebitStatus"] ? value["directDebitStatus"] : null) : null;
            privateState.lastPaymentDate = value ? (value["lastPaymentDate"] ? value["lastPaymentDate"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.totalSize = value ? (value["totalSize"] ? value["totalSize"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageStart = value ? (value["pageStart"] ? value["pageStart"] : null) : null;
            privateState.directDebits = value ? (value["directDebits"] ? value["directDebits"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.revokeDate = value ? (value["revokeDate"] ? value["revokeDate"] : null) : null;
            privateState.pendingApproval = value ? (value["pendingApproval"] ? value["pendingApproval"] : null) : null;
            privateState.revokeChequeTypeId = value ? (value["revokeChequeTypeId"] ? value["revokeChequeTypeId"] : null) : null;
            privateState.isRevoke = value ? (value["isRevoke"] ? value["isRevoke"] : null) : null;
            privateState.stopReason = value ? (value["stopReason"] ? value["stopReason"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.address = value ? (value["address"] ? value["address"] : null) : null;
            privateState.deliveryType = value ? (value["deliveryType"] ? value["deliveryType"] : null) : null;
            privateState.numberOfChequeBooks = value ? (value["numberOfChequeBooks"] ? value["numberOfChequeBooks"] : null) : null;
            privateState.numberOfLeaves = value ? (value["numberOfLeaves"] ? value["numberOfLeaves"] : null) : null;
            privateState.creditValueDate = value ? (value["creditValueDate"] ? value["creditValueDate"] : null) : null;
            privateState.errorDetails = value ? (value["errorDetails"] ? value["errorDetails"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ChequeBook);

    //Create new class level validator object
    BaseModel.Validator.call(ChequeBook);

    var registerValidatorBackup = ChequeBook.registerValidator;

    ChequeBook.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ChequeBook.isValid(this, propName, val)) {
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
    //For Operation 'createRequest' with service id 'createChequeBookRequest4938'
     ChequeBook.createRequest = function(params, onCompletion){
        return ChequeBook.customVerb('createRequest', params, onCompletion);
     };

    //For Operation 'getRequest' with service id 'getChequeBookRequests1422'
     ChequeBook.getRequest = function(params, onCompletion){
        return ChequeBook.customVerb('getRequest', params, onCompletion);
     };

    //For Operation 'getChequeType' with service id 'getChequeTypes6337'
     ChequeBook.getChequeType = function(params, onCompletion){
        return ChequeBook.customVerb('getChequeType', params, onCompletion);
     };

    var relations = [];

    ChequeBook.relations = relations;

    ChequeBook.prototype.isValid = function() {
        return ChequeBook.isValid(this);
    };

    ChequeBook.prototype.objModelName = "ChequeBook";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ChequeBook.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ChequeManagement", "ChequeBook", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ChequeBook.clone = function(objectToClone) {
        var clonedObj = new ChequeBook();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ChequeBook;
});