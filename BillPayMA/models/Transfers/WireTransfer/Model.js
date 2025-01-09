/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "WireTransfer", "objectService" : "Transfers"};

    var setterFunctions = {
        transactionId: function(val, state) {
            context["field"] = "transactionId";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
            state['transactionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amountTransferedTillNow: function(val, state) {
            context["field"] = "amountTransferedTillNow";
            context["metadata"] = (objectMetadata ? objectMetadata["amountTransferedTillNow"] : null);
            state['amountTransferedTillNow'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        fromNickName: function(val, state) {
            context["field"] = "fromNickName";
            context["metadata"] = (objectMetadata ? objectMetadata["fromNickName"] : null);
            state['fromNickName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isScheduled: function(val, state) {
            context["field"] = "isScheduled";
            context["metadata"] = (objectMetadata ? objectMetadata["isScheduled"] : null);
            state['isScheduled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        fee: function(val, state) {
            context["field"] = "fee";
            context["metadata"] = (objectMetadata ? objectMetadata["fee"] : null);
            state['fee'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeCurrency: function(val, state) {
            context["field"] = "payeeCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeCurrency"] : null);
            state['payeeCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftCode: function(val, state) {
            context["field"] = "swiftCode";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
            state['swiftCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        wireAccountType: function(val, state) {
            context["field"] = "wireAccountType";
            context["metadata"] = (objectMetadata ? objectMetadata["wireAccountType"] : null);
            state['wireAccountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        country: function(val, state) {
            context["field"] = "country";
            context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
            state['country'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IBAN: function(val, state) {
            context["field"] = "IBAN";
            context["metadata"] = (objectMetadata ? objectMetadata["IBAN"] : null);
            state['IBAN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        internationalRoutingCode: function(val, state) {
            context["field"] = "internationalRoutingCode";
            context["metadata"] = (objectMetadata ? objectMetadata["internationalRoutingCode"] : null);
            state['internationalRoutingCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        isPayeeDeleted: function(val, state) {
            context["field"] = "isPayeeDeleted";
            context["metadata"] = (objectMetadata ? objectMetadata["isPayeeDeleted"] : null);
            state['isPayeeDeleted'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeAddressLine2: function(val, state) {
            context["field"] = "payeeAddressLine2";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeAddressLine2"] : null);
            state['payeeAddressLine2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amountRecieved: function(val, state) {
            context["field"] = "amountRecieved";
            context["metadata"] = (objectMetadata ? objectMetadata["amountRecieved"] : null);
            state['amountRecieved'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceName: function(val, state) {
            context["field"] = "serviceName";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
            state['serviceName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isBusinessPayee: function(val, state) {
            context["field"] = "isBusinessPayee";
            context["metadata"] = (objectMetadata ? objectMetadata["isBusinessPayee"] : null);
            state['isBusinessPayee'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        firstRecordNumber: function(val, state) {
            context["field"] = "firstRecordNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["firstRecordNumber"] : null);
            state['firstRecordNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastRecordNumber: function(val, state) {
            context["field"] = "lastRecordNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["lastRecordNumber"] : null);
            state['lastRecordNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    };

    //Create the Model Class
    function WireTransfer(defaultValues) {
        var privateState = {};
        context["field"] = "transactionId";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
        privateState.transactionId = defaultValues ?
            (defaultValues["transactionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionId"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "amountTransferedTillNow";
        context["metadata"] = (objectMetadata ? objectMetadata["amountTransferedTillNow"] : null);
        privateState.amountTransferedTillNow = defaultValues ?
            (defaultValues["amountTransferedTillNow"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amountTransferedTillNow"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
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

        context["field"] = "fromNickName";
        context["metadata"] = (objectMetadata ? objectMetadata["fromNickName"] : null);
        privateState.fromNickName = defaultValues ?
            (defaultValues["fromNickName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromNickName"], context) :
                null) :
            null;

        context["field"] = "isScheduled";
        context["metadata"] = (objectMetadata ? objectMetadata["isScheduled"] : null);
        privateState.isScheduled = defaultValues ?
            (defaultValues["isScheduled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isScheduled"], context) :
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

        context["field"] = "fee";
        context["metadata"] = (objectMetadata ? objectMetadata["fee"] : null);
        privateState.fee = defaultValues ?
            (defaultValues["fee"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fee"], context) :
                null) :
            null;

        context["field"] = "payeeCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeCurrency"] : null);
        privateState.payeeCurrency = defaultValues ?
            (defaultValues["payeeCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeCurrency"], context) :
                null) :
            null;

        context["field"] = "swiftCode";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
        privateState.swiftCode = defaultValues ?
            (defaultValues["swiftCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftCode"], context) :
                null) :
            null;

        context["field"] = "wireAccountType";
        context["metadata"] = (objectMetadata ? objectMetadata["wireAccountType"] : null);
        privateState.wireAccountType = defaultValues ?
            (defaultValues["wireAccountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["wireAccountType"], context) :
                null) :
            null;

        context["field"] = "country";
        context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
        privateState.country = defaultValues ?
            (defaultValues["country"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["country"], context) :
                null) :
            null;

        context["field"] = "IBAN";
        context["metadata"] = (objectMetadata ? objectMetadata["IBAN"] : null);
        privateState.IBAN = defaultValues ?
            (defaultValues["IBAN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IBAN"], context) :
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

        context["field"] = "internationalRoutingCode";
        context["metadata"] = (objectMetadata ? objectMetadata["internationalRoutingCode"] : null);
        privateState.internationalRoutingCode = defaultValues ?
            (defaultValues["internationalRoutingCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["internationalRoutingCode"], context) :
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

        context["field"] = "isPayeeDeleted";
        context["metadata"] = (objectMetadata ? objectMetadata["isPayeeDeleted"] : null);
        privateState.isPayeeDeleted = defaultValues ?
            (defaultValues["isPayeeDeleted"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isPayeeDeleted"], context) :
                null) :
            null;

        context["field"] = "payeeAddressLine2";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeAddressLine2"] : null);
        privateState.payeeAddressLine2 = defaultValues ?
            (defaultValues["payeeAddressLine2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeAddressLine2"], context) :
                null) :
            null;

        context["field"] = "amountRecieved";
        context["metadata"] = (objectMetadata ? objectMetadata["amountRecieved"] : null);
        privateState.amountRecieved = defaultValues ?
            (defaultValues["amountRecieved"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amountRecieved"], context) :
                null) :
            null;

        context["field"] = "serviceName";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
        privateState.serviceName = defaultValues ?
            (defaultValues["serviceName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceName"], context) :
                null) :
            null;

        context["field"] = "isBusinessPayee";
        context["metadata"] = (objectMetadata ? objectMetadata["isBusinessPayee"] : null);
        privateState.isBusinessPayee = defaultValues ?
            (defaultValues["isBusinessPayee"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isBusinessPayee"], context) :
                null) :
            null;

        context["field"] = "firstRecordNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["firstRecordNumber"] : null);
        privateState.firstRecordNumber = defaultValues ?
            (defaultValues["firstRecordNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["firstRecordNumber"], context) :
                null) :
            null;

        context["field"] = "lastRecordNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["lastRecordNumber"] : null);
        privateState.lastRecordNumber = defaultValues ?
            (defaultValues["lastRecordNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastRecordNumber"], context) :
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


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "amountTransferedTillNow": {
                get: function() {
                    context["field"] = "amountTransferedTillNow";
                    context["metadata"] = (objectMetadata ? objectMetadata["amountTransferedTillNow"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amountTransferedTillNow, context);
                },
                set: function(val) {
                    setterFunctions['amountTransferedTillNow'].call(this, val, privateState);
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
            "isPayeeDeleted": {
                get: function() {
                    context["field"] = "isPayeeDeleted";
                    context["metadata"] = (objectMetadata ? objectMetadata["isPayeeDeleted"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isPayeeDeleted, context);
                },
                set: function(val) {
                    setterFunctions['isPayeeDeleted'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.transactionId = value ? (value["transactionId"] ? value["transactionId"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.amountTransferedTillNow = value ? (value["amountTransferedTillNow"] ? value["amountTransferedTillNow"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.fromAccountBalance = value ? (value["fromAccountBalance"] ? value["fromAccountBalance"] : null) : null;
            privateState.fromAccountName = value ? (value["fromAccountName"] ? value["fromAccountName"] : null) : null;
            privateState.fromAccountNumber = value ? (value["fromAccountNumber"] ? value["fromAccountNumber"] : null) : null;
            privateState.fromAccountType = value ? (value["fromAccountType"] ? value["fromAccountType"] : null) : null;
            privateState.fromNickName = value ? (value["fromNickName"] ? value["fromNickName"] : null) : null;
            privateState.isScheduled = value ? (value["isScheduled"] ? value["isScheduled"] : null) : null;
            privateState.payeeAccountNumber = value ? (value["payeeAccountNumber"] ? value["payeeAccountNumber"] : null) : null;
            privateState.payeeAddressLine1 = value ? (value["payeeAddressLine1"] ? value["payeeAddressLine1"] : null) : null;
            privateState.payeeId = value ? (value["payeeId"] ? value["payeeId"] : null) : null;
            privateState.payeeName = value ? (value["payeeName"] ? value["payeeName"] : null) : null;
            privateState.scheduledDate = value ? (value["scheduledDate"] ? value["scheduledDate"] : null) : null;
            privateState.statusDescription = value ? (value["statusDescription"] ? value["statusDescription"] : null) : null;
            privateState.toAccountName = value ? (value["toAccountName"] ? value["toAccountName"] : null) : null;
            privateState.toAccountNumber = value ? (value["toAccountNumber"] ? value["toAccountNumber"] : null) : null;
            privateState.toAccountType = value ? (value["toAccountType"] ? value["toAccountType"] : null) : null;
            privateState.transactionComments = value ? (value["transactionComments"] ? value["transactionComments"] : null) : null;
            privateState.transactionDate = value ? (value["transactionDate"] ? value["transactionDate"] : null) : null;
            privateState.transactionsNotes = value ? (value["transactionsNotes"] ? value["transactionsNotes"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.fee = value ? (value["fee"] ? value["fee"] : null) : null;
            privateState.payeeCurrency = value ? (value["payeeCurrency"] ? value["payeeCurrency"] : null) : null;
            privateState.swiftCode = value ? (value["swiftCode"] ? value["swiftCode"] : null) : null;
            privateState.wireAccountType = value ? (value["wireAccountType"] ? value["wireAccountType"] : null) : null;
            privateState.country = value ? (value["country"] ? value["country"] : null) : null;
            privateState.IBAN = value ? (value["IBAN"] ? value["IBAN"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.routingNumber = value ? (value["routingNumber"] ? value["routingNumber"] : null) : null;
            privateState.internationalRoutingCode = value ? (value["internationalRoutingCode"] ? value["internationalRoutingCode"] : null) : null;
            privateState.zipCode = value ? (value["zipCode"] ? value["zipCode"] : null) : null;
            privateState.cityName = value ? (value["cityName"] ? value["cityName"] : null) : null;
            privateState.state = value ? (value["state"] ? value["state"] : null) : null;
            privateState.bankAddressLine1 = value ? (value["bankAddressLine1"] ? value["bankAddressLine1"] : null) : null;
            privateState.bankAddressLine2 = value ? (value["bankAddressLine2"] ? value["bankAddressLine2"] : null) : null;
            privateState.bankCity = value ? (value["bankCity"] ? value["bankCity"] : null) : null;
            privateState.bankState = value ? (value["bankState"] ? value["bankState"] : null) : null;
            privateState.bankZip = value ? (value["bankZip"] ? value["bankZip"] : null) : null;
            privateState.payeeType = value ? (value["payeeType"] ? value["payeeType"] : null) : null;
            privateState.isPayeeDeleted = value ? (value["isPayeeDeleted"] ? value["isPayeeDeleted"] : null) : null;
            privateState.payeeAddressLine2 = value ? (value["payeeAddressLine2"] ? value["payeeAddressLine2"] : null) : null;
            privateState.amountRecieved = value ? (value["amountRecieved"] ? value["amountRecieved"] : null) : null;
            privateState.serviceName = value ? (value["serviceName"] ? value["serviceName"] : null) : null;
            privateState.isBusinessPayee = value ? (value["isBusinessPayee"] ? value["isBusinessPayee"] : null) : null;
            privateState.firstRecordNumber = value ? (value["firstRecordNumber"] ? value["firstRecordNumber"] : null) : null;
            privateState.lastRecordNumber = value ? (value["lastRecordNumber"] ? value["lastRecordNumber"] : null) : null;
            privateState.order = value ? (value["order"] ? value["order"] : null) : null;
            privateState.sortBy = value ? (value["sortBy"] ? value["sortBy"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(WireTransfer);

    //Create new class level validator object
    BaseModel.Validator.call(WireTransfer);

    var registerValidatorBackup = WireTransfer.registerValidator;

    WireTransfer.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(WireTransfer.isValid(this, propName, val)) {
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
    //For Operation 'getUserWiredTransactions' with service id 'getUserWiredTransactions2211'
     WireTransfer.getUserWiredTransactions = function(params, onCompletion){
        return WireTransfer.customVerb('getUserWiredTransactions', params, onCompletion);
     };

    var relations = [];

    WireTransfer.relations = relations;

    WireTransfer.prototype.isValid = function() {
        return WireTransfer.isValid(this);
    };

    WireTransfer.prototype.objModelName = "WireTransfer";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    WireTransfer.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Transfers", "WireTransfer", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    WireTransfer.clone = function(objectToClone) {
        var clonedObj = new WireTransfer();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return WireTransfer;
});