/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "OutwardCollections", "objectService" : "TradeFinance"};

    var setterFunctions = {
        allowUsanceAcceptance: function(val, state) {
            context["field"] = "allowUsanceAcceptance";
            context["metadata"] = (objectMetadata ? objectMetadata["allowUsanceAcceptance"] : null);
            state['allowUsanceAcceptance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendTenorType: function(val, state) {
            context["field"] = "amendTenorType";
            context["metadata"] = (objectMetadata ? objectMetadata["amendTenorType"] : null);
            state['amendTenorType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentNo: function(val, state) {
            context["field"] = "amendmentNo";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
            state['amendmentNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentReference: function(val, state) {
            context["field"] = "amendmentReference";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentReference"] : null);
            state['amendmentReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billOfExchangeStatus: function(val, state) {
            context["field"] = "billOfExchangeStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["billOfExchangeStatus"] : null);
            state['billOfExchangeStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cancellationStatus: function(val, state) {
            context["field"] = "cancellationStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["cancellationStatus"] : null);
            state['cancellationStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chargesDebitAccount: function(val, state) {
            context["field"] = "chargesDebitAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["chargesDebitAccount"] : null);
            state['chargesDebitAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        collectingBank: function(val, state) {
            context["field"] = "collectingBank";
            context["metadata"] = (objectMetadata ? objectMetadata["collectingBank"] : null);
            state['collectingBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        collectingBankAddress: function(val, state) {
            context["field"] = "collectingBankAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["collectingBankAddress"] : null);
            state['collectingBankAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        collectionReference: function(val, state) {
            context["field"] = "collectionReference";
            context["metadata"] = (objectMetadata ? objectMetadata["collectionReference"] : null);
            state['collectionReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        corporateUserName: function(val, state) {
            context["field"] = "corporateUserName";
            context["metadata"] = (objectMetadata ? objectMetadata["corporateUserName"] : null);
            state['corporateUserName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        courierTrackingDetails: function(val, state) {
            context["field"] = "courierTrackingDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["courierTrackingDetails"] : null);
            state['courierTrackingDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdOn: function(val, state) {
            context["field"] = "createdOn";
            context["metadata"] = (objectMetadata ? objectMetadata["createdOn"] : null);
            state['createdOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditAccount: function(val, state) {
            context["field"] = "creditAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["creditAccount"] : null);
            state['creditAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        debitAccount: function(val, state) {
            context["field"] = "debitAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["debitAccount"] : null);
            state['debitAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deliveryInstructions: function(val, state) {
            context["field"] = "deliveryInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["deliveryInstructions"] : null);
            state['deliveryInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentNo: function(val, state) {
            context["field"] = "documentNo";
            context["metadata"] = (objectMetadata ? objectMetadata["documentNo"] : null);
            state['documentNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        draweeAcceptance: function(val, state) {
            context["field"] = "draweeAcceptance";
            context["metadata"] = (objectMetadata ? objectMetadata["draweeAcceptance"] : null);
            state['draweeAcceptance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        draweeAcknowledgement: function(val, state) {
            context["field"] = "draweeAcknowledgement";
            context["metadata"] = (objectMetadata ? objectMetadata["draweeAcknowledgement"] : null);
            state['draweeAcknowledgement'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        draweeAddress: function(val, state) {
            context["field"] = "draweeAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["draweeAddress"] : null);
            state['draweeAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        draweeName: function(val, state) {
            context["field"] = "draweeName";
            context["metadata"] = (objectMetadata ? objectMetadata["draweeName"] : null);
            state['draweeName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorCode: function(val, state) {
            context["field"] = "errorCode";
            context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
            state['errorCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorMsg: function(val, state) {
            context["field"] = "errorMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errorMsg"] : null);
            state['errorMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        incoTerms: function(val, state) {
            context["field"] = "incoTerms";
            context["metadata"] = (objectMetadata ? objectMetadata["incoTerms"] : null);
            state['incoTerms'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instructionsForBills: function(val, state) {
            context["field"] = "instructionsForBills";
            context["metadata"] = (objectMetadata ? objectMetadata["instructionsForBills"] : null);
            state['instructionsForBills'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isBillExchangeSigned: function(val, state) {
            context["field"] = "isBillExchangeSigned";
            context["metadata"] = (objectMetadata ? objectMetadata["isBillExchangeSigned"] : null);
            state['isBillExchangeSigned'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastAmendmentDetails: function(val, state) {
            context["field"] = "lastAmendmentDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["lastAmendmentDetails"] : null);
            state['lastAmendmentDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maturityDate: function(val, state) {
            context["field"] = "maturityDate";
            context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
            state['maturityDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageFromBank: function(val, state) {
            context["field"] = "messageFromBank";
            context["metadata"] = (objectMetadata ? objectMetadata["messageFromBank"] : null);
            state['messageFromBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageToBank: function(val, state) {
            context["field"] = "messageToBank";
            context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
            state['messageToBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherCollectionDetails: function(val, state) {
            context["field"] = "otherCollectionDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["otherCollectionDetails"] : null);
            state['otherCollectionDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        physicalDocuments: function(val, state) {
            context["field"] = "physicalDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["physicalDocuments"] : null);
            state['physicalDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForRejection: function(val, state) {
            context["field"] = "reasonForRejection";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForRejection"] : null);
            state['reasonForRejection'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForReturn: function(val, state) {
            context["field"] = "reasonForReturn";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
            state['reasonForReturn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestedOn: function(val, state) {
            context["field"] = "requestedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["requestedOn"] : null);
            state['requestedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        returnedHistory: function(val, state) {
            context["field"] = "returnedHistory";
            context["metadata"] = (objectMetadata ? objectMetadata["returnedHistory"] : null);
            state['returnedHistory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftOrBicCode: function(val, state) {
            context["field"] = "swiftOrBicCode";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftOrBicCode"] : null);
            state['swiftOrBicCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tenorType: function(val, state) {
            context["field"] = "tenorType";
            context["metadata"] = (objectMetadata ? objectMetadata["tenorType"] : null);
            state['tenorType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        updatedOn: function(val, state) {
            context["field"] = "updatedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["updatedOn"] : null);
            state['updatedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadDocuments: function(val, state) {
            context["field"] = "uploadDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadDocuments"] : null);
            state['uploadDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        usanceDays: function(val, state) {
            context["field"] = "usanceDays";
            context["metadata"] = (objectMetadata ? objectMetadata["usanceDays"] : null);
            state['usanceDays'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        usanceDetails: function(val, state) {
            context["field"] = "usanceDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["usanceDetails"] : null);
            state['usanceDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        filterByValue: function(val, state) {
            context["field"] = "filterByValue";
            context["metadata"] = (objectMetadata ? objectMetadata["filterByValue"] : null);
            state['filterByValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        filterByParam: function(val, state) {
            context["field"] = "filterByParam";
            context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
            state['filterByParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForCancellation: function(val, state) {
            context["field"] = "reasonForCancellation";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForCancellation"] : null);
            state['reasonForCancellation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestPaymentStatus: function(val, state) {
            context["field"] = "requestPaymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["requestPaymentStatus"] : null);
            state['requestPaymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestBillOfExchange: function(val, state) {
            context["field"] = "requestBillOfExchange";
            context["metadata"] = (objectMetadata ? objectMetadata["requestBillOfExchange"] : null);
            state['requestBillOfExchange'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestSelection: function(val, state) {
            context["field"] = "requestSelection";
            context["metadata"] = (objectMetadata ? objectMetadata["requestSelection"] : null);
            state['requestSelection'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function OutwardCollections(defaultValues) {
        var privateState = {};
        context["field"] = "allowUsanceAcceptance";
        context["metadata"] = (objectMetadata ? objectMetadata["allowUsanceAcceptance"] : null);
        privateState.allowUsanceAcceptance = defaultValues ?
            (defaultValues["allowUsanceAcceptance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["allowUsanceAcceptance"], context) :
                null) :
            null;

        context["field"] = "amendTenorType";
        context["metadata"] = (objectMetadata ? objectMetadata["amendTenorType"] : null);
        privateState.amendTenorType = defaultValues ?
            (defaultValues["amendTenorType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendTenorType"], context) :
                null) :
            null;

        context["field"] = "amendmentNo";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
        privateState.amendmentNo = defaultValues ?
            (defaultValues["amendmentNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentNo"], context) :
                null) :
            null;

        context["field"] = "amendmentReference";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentReference"] : null);
        privateState.amendmentReference = defaultValues ?
            (defaultValues["amendmentReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentReference"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "billOfExchangeStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["billOfExchangeStatus"] : null);
        privateState.billOfExchangeStatus = defaultValues ?
            (defaultValues["billOfExchangeStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billOfExchangeStatus"], context) :
                null) :
            null;

        context["field"] = "cancellationStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["cancellationStatus"] : null);
        privateState.cancellationStatus = defaultValues ?
            (defaultValues["cancellationStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cancellationStatus"], context) :
                null) :
            null;

        context["field"] = "chargesDebitAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["chargesDebitAccount"] : null);
        privateState.chargesDebitAccount = defaultValues ?
            (defaultValues["chargesDebitAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chargesDebitAccount"], context) :
                null) :
            null;

        context["field"] = "collectingBank";
        context["metadata"] = (objectMetadata ? objectMetadata["collectingBank"] : null);
        privateState.collectingBank = defaultValues ?
            (defaultValues["collectingBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["collectingBank"], context) :
                null) :
            null;

        context["field"] = "collectingBankAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["collectingBankAddress"] : null);
        privateState.collectingBankAddress = defaultValues ?
            (defaultValues["collectingBankAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["collectingBankAddress"], context) :
                null) :
            null;

        context["field"] = "collectionReference";
        context["metadata"] = (objectMetadata ? objectMetadata["collectionReference"] : null);
        privateState.collectionReference = defaultValues ?
            (defaultValues["collectionReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["collectionReference"], context) :
                null) :
            null;

        context["field"] = "corporateUserName";
        context["metadata"] = (objectMetadata ? objectMetadata["corporateUserName"] : null);
        privateState.corporateUserName = defaultValues ?
            (defaultValues["corporateUserName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["corporateUserName"], context) :
                null) :
            null;

        context["field"] = "courierTrackingDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["courierTrackingDetails"] : null);
        privateState.courierTrackingDetails = defaultValues ?
            (defaultValues["courierTrackingDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["courierTrackingDetails"], context) :
                null) :
            null;

        context["field"] = "createdOn";
        context["metadata"] = (objectMetadata ? objectMetadata["createdOn"] : null);
        privateState.createdOn = defaultValues ?
            (defaultValues["createdOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdOn"], context) :
                null) :
            null;

        context["field"] = "creditAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["creditAccount"] : null);
        privateState.creditAccount = defaultValues ?
            (defaultValues["creditAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditAccount"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
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

        context["field"] = "debitAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["debitAccount"] : null);
        privateState.debitAccount = defaultValues ?
            (defaultValues["debitAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitAccount"], context) :
                null) :
            null;

        context["field"] = "deliveryInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["deliveryInstructions"] : null);
        privateState.deliveryInstructions = defaultValues ?
            (defaultValues["deliveryInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deliveryInstructions"], context) :
                null) :
            null;

        context["field"] = "documentNo";
        context["metadata"] = (objectMetadata ? objectMetadata["documentNo"] : null);
        privateState.documentNo = defaultValues ?
            (defaultValues["documentNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentNo"], context) :
                null) :
            null;

        context["field"] = "draweeAcceptance";
        context["metadata"] = (objectMetadata ? objectMetadata["draweeAcceptance"] : null);
        privateState.draweeAcceptance = defaultValues ?
            (defaultValues["draweeAcceptance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["draweeAcceptance"], context) :
                null) :
            null;

        context["field"] = "draweeAcknowledgement";
        context["metadata"] = (objectMetadata ? objectMetadata["draweeAcknowledgement"] : null);
        privateState.draweeAcknowledgement = defaultValues ?
            (defaultValues["draweeAcknowledgement"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["draweeAcknowledgement"], context) :
                null) :
            null;

        context["field"] = "draweeAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["draweeAddress"] : null);
        privateState.draweeAddress = defaultValues ?
            (defaultValues["draweeAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["draweeAddress"], context) :
                null) :
            null;

        context["field"] = "draweeName";
        context["metadata"] = (objectMetadata ? objectMetadata["draweeName"] : null);
        privateState.draweeName = defaultValues ?
            (defaultValues["draweeName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["draweeName"], context) :
                null) :
            null;

        context["field"] = "errorCode";
        context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
        privateState.errorCode = defaultValues ?
            (defaultValues["errorCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorCode"], context) :
                null) :
            null;

        context["field"] = "errorMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errorMsg"] : null);
        privateState.errorMsg = defaultValues ?
            (defaultValues["errorMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorMsg"], context) :
                null) :
            null;

        context["field"] = "incoTerms";
        context["metadata"] = (objectMetadata ? objectMetadata["incoTerms"] : null);
        privateState.incoTerms = defaultValues ?
            (defaultValues["incoTerms"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["incoTerms"], context) :
                null) :
            null;

        context["field"] = "instructionsForBills";
        context["metadata"] = (objectMetadata ? objectMetadata["instructionsForBills"] : null);
        privateState.instructionsForBills = defaultValues ?
            (defaultValues["instructionsForBills"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instructionsForBills"], context) :
                null) :
            null;

        context["field"] = "isBillExchangeSigned";
        context["metadata"] = (objectMetadata ? objectMetadata["isBillExchangeSigned"] : null);
        privateState.isBillExchangeSigned = defaultValues ?
            (defaultValues["isBillExchangeSigned"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isBillExchangeSigned"], context) :
                null) :
            null;

        context["field"] = "lastAmendmentDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["lastAmendmentDetails"] : null);
        privateState.lastAmendmentDetails = defaultValues ?
            (defaultValues["lastAmendmentDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastAmendmentDetails"], context) :
                null) :
            null;

        context["field"] = "maturityDate";
        context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
        privateState.maturityDate = defaultValues ?
            (defaultValues["maturityDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maturityDate"], context) :
                null) :
            null;

        context["field"] = "messageFromBank";
        context["metadata"] = (objectMetadata ? objectMetadata["messageFromBank"] : null);
        privateState.messageFromBank = defaultValues ?
            (defaultValues["messageFromBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageFromBank"], context) :
                null) :
            null;

        context["field"] = "messageToBank";
        context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
        privateState.messageToBank = defaultValues ?
            (defaultValues["messageToBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageToBank"], context) :
                null) :
            null;

        context["field"] = "otherCollectionDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["otherCollectionDetails"] : null);
        privateState.otherCollectionDetails = defaultValues ?
            (defaultValues["otherCollectionDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherCollectionDetails"], context) :
                null) :
            null;

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "physicalDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["physicalDocuments"] : null);
        privateState.physicalDocuments = defaultValues ?
            (defaultValues["physicalDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["physicalDocuments"], context) :
                null) :
            null;

        context["field"] = "reasonForRejection";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForRejection"] : null);
        privateState.reasonForRejection = defaultValues ?
            (defaultValues["reasonForRejection"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForRejection"], context) :
                null) :
            null;

        context["field"] = "reasonForReturn";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
        privateState.reasonForReturn = defaultValues ?
            (defaultValues["reasonForReturn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForReturn"], context) :
                null) :
            null;

        context["field"] = "requestedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["requestedOn"] : null);
        privateState.requestedOn = defaultValues ?
            (defaultValues["requestedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestedOn"], context) :
                null) :
            null;

        context["field"] = "returnedHistory";
        context["metadata"] = (objectMetadata ? objectMetadata["returnedHistory"] : null);
        privateState.returnedHistory = defaultValues ?
            (defaultValues["returnedHistory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["returnedHistory"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "swiftOrBicCode";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftOrBicCode"] : null);
        privateState.swiftOrBicCode = defaultValues ?
            (defaultValues["swiftOrBicCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftOrBicCode"], context) :
                null) :
            null;

        context["field"] = "tenorType";
        context["metadata"] = (objectMetadata ? objectMetadata["tenorType"] : null);
        privateState.tenorType = defaultValues ?
            (defaultValues["tenorType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tenorType"], context) :
                null) :
            null;

        context["field"] = "updatedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["updatedOn"] : null);
        privateState.updatedOn = defaultValues ?
            (defaultValues["updatedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["updatedOn"], context) :
                null) :
            null;

        context["field"] = "uploadDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadDocuments"] : null);
        privateState.uploadDocuments = defaultValues ?
            (defaultValues["uploadDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadDocuments"], context) :
                null) :
            null;

        context["field"] = "usanceDays";
        context["metadata"] = (objectMetadata ? objectMetadata["usanceDays"] : null);
        privateState.usanceDays = defaultValues ?
            (defaultValues["usanceDays"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["usanceDays"], context) :
                null) :
            null;

        context["field"] = "usanceDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["usanceDetails"] : null);
        privateState.usanceDetails = defaultValues ?
            (defaultValues["usanceDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["usanceDetails"], context) :
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

        context["field"] = "filterByValue";
        context["metadata"] = (objectMetadata ? objectMetadata["filterByValue"] : null);
        privateState.filterByValue = defaultValues ?
            (defaultValues["filterByValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["filterByValue"], context) :
                null) :
            null;

        context["field"] = "filterByParam";
        context["metadata"] = (objectMetadata ? objectMetadata["filterByParam"] : null);
        privateState.filterByParam = defaultValues ?
            (defaultValues["filterByParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["filterByParam"], context) :
                null) :
            null;

        context["field"] = "reasonForCancellation";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForCancellation"] : null);
        privateState.reasonForCancellation = defaultValues ?
            (defaultValues["reasonForCancellation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForCancellation"], context) :
                null) :
            null;

        context["field"] = "requestPaymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["requestPaymentStatus"] : null);
        privateState.requestPaymentStatus = defaultValues ?
            (defaultValues["requestPaymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestPaymentStatus"], context) :
                null) :
            null;

        context["field"] = "requestBillOfExchange";
        context["metadata"] = (objectMetadata ? objectMetadata["requestBillOfExchange"] : null);
        privateState.requestBillOfExchange = defaultValues ?
            (defaultValues["requestBillOfExchange"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestBillOfExchange"], context) :
                null) :
            null;

        context["field"] = "requestSelection";
        context["metadata"] = (objectMetadata ? objectMetadata["requestSelection"] : null);
        privateState.requestSelection = defaultValues ?
            (defaultValues["requestSelection"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestSelection"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "allowUsanceAcceptance": {
                get: function() {
                    context["field"] = "allowUsanceAcceptance";
                    context["metadata"] = (objectMetadata ? objectMetadata["allowUsanceAcceptance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.allowUsanceAcceptance, context);
                },
                set: function(val) {
                    setterFunctions['allowUsanceAcceptance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendTenorType": {
                get: function() {
                    context["field"] = "amendTenorType";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendTenorType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendTenorType, context);
                },
                set: function(val) {
                    setterFunctions['amendTenorType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentNo": {
                get: function() {
                    context["field"] = "amendmentNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentNo, context);
                },
                set: function(val) {
                    setterFunctions['amendmentNo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentReference": {
                get: function() {
                    context["field"] = "amendmentReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentReference, context);
                },
                set: function(val) {
                    setterFunctions['amendmentReference'].call(this, val, privateState);
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
            "billOfExchangeStatus": {
                get: function() {
                    context["field"] = "billOfExchangeStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["billOfExchangeStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billOfExchangeStatus, context);
                },
                set: function(val) {
                    setterFunctions['billOfExchangeStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cancellationStatus": {
                get: function() {
                    context["field"] = "cancellationStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["cancellationStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cancellationStatus, context);
                },
                set: function(val) {
                    setterFunctions['cancellationStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chargesDebitAccount": {
                get: function() {
                    context["field"] = "chargesDebitAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["chargesDebitAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chargesDebitAccount, context);
                },
                set: function(val) {
                    setterFunctions['chargesDebitAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "collectingBank": {
                get: function() {
                    context["field"] = "collectingBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["collectingBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.collectingBank, context);
                },
                set: function(val) {
                    setterFunctions['collectingBank'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "collectingBankAddress": {
                get: function() {
                    context["field"] = "collectingBankAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["collectingBankAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.collectingBankAddress, context);
                },
                set: function(val) {
                    setterFunctions['collectingBankAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "collectionReference": {
                get: function() {
                    context["field"] = "collectionReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["collectionReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.collectionReference, context);
                },
                set: function(val) {
                    setterFunctions['collectionReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "corporateUserName": {
                get: function() {
                    context["field"] = "corporateUserName";
                    context["metadata"] = (objectMetadata ? objectMetadata["corporateUserName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.corporateUserName, context);
                },
                set: function(val) {
                    setterFunctions['corporateUserName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "courierTrackingDetails": {
                get: function() {
                    context["field"] = "courierTrackingDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["courierTrackingDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.courierTrackingDetails, context);
                },
                set: function(val) {
                    setterFunctions['courierTrackingDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdOn": {
                get: function() {
                    context["field"] = "createdOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdOn, context);
                },
                set: function(val) {
                    setterFunctions['createdOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditAccount": {
                get: function() {
                    context["field"] = "creditAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditAccount, context);
                },
                set: function(val) {
                    setterFunctions['creditAccount'].call(this, val, privateState);
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
            "debitAccount": {
                get: function() {
                    context["field"] = "debitAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitAccount, context);
                },
                set: function(val) {
                    setterFunctions['debitAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deliveryInstructions": {
                get: function() {
                    context["field"] = "deliveryInstructions";
                    context["metadata"] = (objectMetadata ? objectMetadata["deliveryInstructions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deliveryInstructions, context);
                },
                set: function(val) {
                    setterFunctions['deliveryInstructions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentNo": {
                get: function() {
                    context["field"] = "documentNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentNo, context);
                },
                set: function(val) {
                    setterFunctions['documentNo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "draweeAcceptance": {
                get: function() {
                    context["field"] = "draweeAcceptance";
                    context["metadata"] = (objectMetadata ? objectMetadata["draweeAcceptance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.draweeAcceptance, context);
                },
                set: function(val) {
                    setterFunctions['draweeAcceptance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "draweeAcknowledgement": {
                get: function() {
                    context["field"] = "draweeAcknowledgement";
                    context["metadata"] = (objectMetadata ? objectMetadata["draweeAcknowledgement"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.draweeAcknowledgement, context);
                },
                set: function(val) {
                    setterFunctions['draweeAcknowledgement'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "draweeAddress": {
                get: function() {
                    context["field"] = "draweeAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["draweeAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.draweeAddress, context);
                },
                set: function(val) {
                    setterFunctions['draweeAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "draweeName": {
                get: function() {
                    context["field"] = "draweeName";
                    context["metadata"] = (objectMetadata ? objectMetadata["draweeName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.draweeName, context);
                },
                set: function(val) {
                    setterFunctions['draweeName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errorCode": {
                get: function() {
                    context["field"] = "errorCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorCode, context);
                },
                set: function(val) {
                    setterFunctions['errorCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errorMsg": {
                get: function() {
                    context["field"] = "errorMsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorMsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorMsg, context);
                },
                set: function(val) {
                    setterFunctions['errorMsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "incoTerms": {
                get: function() {
                    context["field"] = "incoTerms";
                    context["metadata"] = (objectMetadata ? objectMetadata["incoTerms"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.incoTerms, context);
                },
                set: function(val) {
                    setterFunctions['incoTerms'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "instructionsForBills": {
                get: function() {
                    context["field"] = "instructionsForBills";
                    context["metadata"] = (objectMetadata ? objectMetadata["instructionsForBills"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.instructionsForBills, context);
                },
                set: function(val) {
                    setterFunctions['instructionsForBills'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isBillExchangeSigned": {
                get: function() {
                    context["field"] = "isBillExchangeSigned";
                    context["metadata"] = (objectMetadata ? objectMetadata["isBillExchangeSigned"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isBillExchangeSigned, context);
                },
                set: function(val) {
                    setterFunctions['isBillExchangeSigned'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastAmendmentDetails": {
                get: function() {
                    context["field"] = "lastAmendmentDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastAmendmentDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastAmendmentDetails, context);
                },
                set: function(val) {
                    setterFunctions['lastAmendmentDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maturityDate": {
                get: function() {
                    context["field"] = "maturityDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maturityDate, context);
                },
                set: function(val) {
                    setterFunctions['maturityDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "messageFromBank": {
                get: function() {
                    context["field"] = "messageFromBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["messageFromBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messageFromBank, context);
                },
                set: function(val) {
                    setterFunctions['messageFromBank'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "messageToBank": {
                get: function() {
                    context["field"] = "messageToBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messageToBank, context);
                },
                set: function(val) {
                    setterFunctions['messageToBank'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otherCollectionDetails": {
                get: function() {
                    context["field"] = "otherCollectionDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["otherCollectionDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otherCollectionDetails, context);
                },
                set: function(val) {
                    setterFunctions['otherCollectionDetails'].call(this, val, privateState);
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
            "physicalDocuments": {
                get: function() {
                    context["field"] = "physicalDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["physicalDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.physicalDocuments, context);
                },
                set: function(val) {
                    setterFunctions['physicalDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reasonForRejection": {
                get: function() {
                    context["field"] = "reasonForRejection";
                    context["metadata"] = (objectMetadata ? objectMetadata["reasonForRejection"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reasonForRejection, context);
                },
                set: function(val) {
                    setterFunctions['reasonForRejection'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reasonForReturn": {
                get: function() {
                    context["field"] = "reasonForReturn";
                    context["metadata"] = (objectMetadata ? objectMetadata["reasonForReturn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reasonForReturn, context);
                },
                set: function(val) {
                    setterFunctions['reasonForReturn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestedOn": {
                get: function() {
                    context["field"] = "requestedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestedOn, context);
                },
                set: function(val) {
                    setterFunctions['requestedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "returnedHistory": {
                get: function() {
                    context["field"] = "returnedHistory";
                    context["metadata"] = (objectMetadata ? objectMetadata["returnedHistory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.returnedHistory, context);
                },
                set: function(val) {
                    setterFunctions['returnedHistory'].call(this, val, privateState);
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
            "swiftOrBicCode": {
                get: function() {
                    context["field"] = "swiftOrBicCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["swiftOrBicCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swiftOrBicCode, context);
                },
                set: function(val) {
                    setterFunctions['swiftOrBicCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tenorType": {
                get: function() {
                    context["field"] = "tenorType";
                    context["metadata"] = (objectMetadata ? objectMetadata["tenorType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tenorType, context);
                },
                set: function(val) {
                    setterFunctions['tenorType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "updatedOn": {
                get: function() {
                    context["field"] = "updatedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["updatedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.updatedOn, context);
                },
                set: function(val) {
                    setterFunctions['updatedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "uploadDocuments": {
                get: function() {
                    context["field"] = "uploadDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadDocuments, context);
                },
                set: function(val) {
                    setterFunctions['uploadDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "usanceDays": {
                get: function() {
                    context["field"] = "usanceDays";
                    context["metadata"] = (objectMetadata ? objectMetadata["usanceDays"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.usanceDays, context);
                },
                set: function(val) {
                    setterFunctions['usanceDays'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "usanceDetails": {
                get: function() {
                    context["field"] = "usanceDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["usanceDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.usanceDetails, context);
                },
                set: function(val) {
                    setterFunctions['usanceDetails'].call(this, val, privateState);
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
            "reasonForCancellation": {
                get: function() {
                    context["field"] = "reasonForCancellation";
                    context["metadata"] = (objectMetadata ? objectMetadata["reasonForCancellation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reasonForCancellation, context);
                },
                set: function(val) {
                    setterFunctions['reasonForCancellation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestPaymentStatus": {
                get: function() {
                    context["field"] = "requestPaymentStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestPaymentStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestPaymentStatus, context);
                },
                set: function(val) {
                    setterFunctions['requestPaymentStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestBillOfExchange": {
                get: function() {
                    context["field"] = "requestBillOfExchange";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestBillOfExchange"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestBillOfExchange, context);
                },
                set: function(val) {
                    setterFunctions['requestBillOfExchange'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestSelection": {
                get: function() {
                    context["field"] = "requestSelection";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestSelection"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestSelection, context);
                },
                set: function(val) {
                    setterFunctions['requestSelection'].call(this, val, privateState);
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
            privateState.allowUsanceAcceptance = value ? (value["allowUsanceAcceptance"] ? value["allowUsanceAcceptance"] : null) : null;
            privateState.amendTenorType = value ? (value["amendTenorType"] ? value["amendTenorType"] : null) : null;
            privateState.amendmentNo = value ? (value["amendmentNo"] ? value["amendmentNo"] : null) : null;
            privateState.amendmentReference = value ? (value["amendmentReference"] ? value["amendmentReference"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.billOfExchangeStatus = value ? (value["billOfExchangeStatus"] ? value["billOfExchangeStatus"] : null) : null;
            privateState.cancellationStatus = value ? (value["cancellationStatus"] ? value["cancellationStatus"] : null) : null;
            privateState.chargesDebitAccount = value ? (value["chargesDebitAccount"] ? value["chargesDebitAccount"] : null) : null;
            privateState.collectingBank = value ? (value["collectingBank"] ? value["collectingBank"] : null) : null;
            privateState.collectingBankAddress = value ? (value["collectingBankAddress"] ? value["collectingBankAddress"] : null) : null;
            privateState.collectionReference = value ? (value["collectionReference"] ? value["collectionReference"] : null) : null;
            privateState.corporateUserName = value ? (value["corporateUserName"] ? value["corporateUserName"] : null) : null;
            privateState.courierTrackingDetails = value ? (value["courierTrackingDetails"] ? value["courierTrackingDetails"] : null) : null;
            privateState.createdOn = value ? (value["createdOn"] ? value["createdOn"] : null) : null;
            privateState.creditAccount = value ? (value["creditAccount"] ? value["creditAccount"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.debitAccount = value ? (value["debitAccount"] ? value["debitAccount"] : null) : null;
            privateState.deliveryInstructions = value ? (value["deliveryInstructions"] ? value["deliveryInstructions"] : null) : null;
            privateState.documentNo = value ? (value["documentNo"] ? value["documentNo"] : null) : null;
            privateState.draweeAcceptance = value ? (value["draweeAcceptance"] ? value["draweeAcceptance"] : null) : null;
            privateState.draweeAcknowledgement = value ? (value["draweeAcknowledgement"] ? value["draweeAcknowledgement"] : null) : null;
            privateState.draweeAddress = value ? (value["draweeAddress"] ? value["draweeAddress"] : null) : null;
            privateState.draweeName = value ? (value["draweeName"] ? value["draweeName"] : null) : null;
            privateState.errorCode = value ? (value["errorCode"] ? value["errorCode"] : null) : null;
            privateState.errorMsg = value ? (value["errorMsg"] ? value["errorMsg"] : null) : null;
            privateState.incoTerms = value ? (value["incoTerms"] ? value["incoTerms"] : null) : null;
            privateState.instructionsForBills = value ? (value["instructionsForBills"] ? value["instructionsForBills"] : null) : null;
            privateState.isBillExchangeSigned = value ? (value["isBillExchangeSigned"] ? value["isBillExchangeSigned"] : null) : null;
            privateState.lastAmendmentDetails = value ? (value["lastAmendmentDetails"] ? value["lastAmendmentDetails"] : null) : null;
            privateState.maturityDate = value ? (value["maturityDate"] ? value["maturityDate"] : null) : null;
            privateState.messageFromBank = value ? (value["messageFromBank"] ? value["messageFromBank"] : null) : null;
            privateState.messageToBank = value ? (value["messageToBank"] ? value["messageToBank"] : null) : null;
            privateState.otherCollectionDetails = value ? (value["otherCollectionDetails"] ? value["otherCollectionDetails"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.physicalDocuments = value ? (value["physicalDocuments"] ? value["physicalDocuments"] : null) : null;
            privateState.reasonForRejection = value ? (value["reasonForRejection"] ? value["reasonForRejection"] : null) : null;
            privateState.reasonForReturn = value ? (value["reasonForReturn"] ? value["reasonForReturn"] : null) : null;
            privateState.requestedOn = value ? (value["requestedOn"] ? value["requestedOn"] : null) : null;
            privateState.returnedHistory = value ? (value["returnedHistory"] ? value["returnedHistory"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.swiftOrBicCode = value ? (value["swiftOrBicCode"] ? value["swiftOrBicCode"] : null) : null;
            privateState.tenorType = value ? (value["tenorType"] ? value["tenorType"] : null) : null;
            privateState.updatedOn = value ? (value["updatedOn"] ? value["updatedOn"] : null) : null;
            privateState.uploadDocuments = value ? (value["uploadDocuments"] ? value["uploadDocuments"] : null) : null;
            privateState.usanceDays = value ? (value["usanceDays"] ? value["usanceDays"] : null) : null;
            privateState.usanceDetails = value ? (value["usanceDetails"] ? value["usanceDetails"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.timeParam = value ? (value["timeParam"] ? value["timeParam"] : null) : null;
            privateState.timeValue = value ? (value["timeValue"] ? value["timeValue"] : null) : null;
            privateState.filterByValue = value ? (value["filterByValue"] ? value["filterByValue"] : null) : null;
            privateState.filterByParam = value ? (value["filterByParam"] ? value["filterByParam"] : null) : null;
            privateState.reasonForCancellation = value ? (value["reasonForCancellation"] ? value["reasonForCancellation"] : null) : null;
            privateState.requestPaymentStatus = value ? (value["requestPaymentStatus"] ? value["requestPaymentStatus"] : null) : null;
            privateState.requestBillOfExchange = value ? (value["requestBillOfExchange"] ? value["requestBillOfExchange"] : null) : null;
            privateState.requestSelection = value ? (value["requestSelection"] ? value["requestSelection"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(OutwardCollections);

    //Create new class level validator object
    BaseModel.Validator.call(OutwardCollections);

    var registerValidatorBackup = OutwardCollections.registerValidator;

    OutwardCollections.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(OutwardCollections.isValid(this, propName, val)) {
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
    //For Operation 'updateAmendment' with service id 'UpdateOutwardAmendment1587'
     OutwardCollections.updateAmendment = function(params, onCompletion){
        return OutwardCollections.customVerb('updateAmendment', params, onCompletion);
     };

    //For Operation 'updateAmendmentByBank' with service id 'UpdateOutwardAmendmentByBank8345'
     OutwardCollections.updateAmendmentByBank = function(params, onCompletion){
        return OutwardCollections.customVerb('updateAmendmentByBank', params, onCompletion);
     };

    //For Operation 'deleteCollection' with service id 'DeleteOutwardCollection9612'
     OutwardCollections.deleteCollection = function(params, onCompletion){
        return OutwardCollections.customVerb('deleteCollection', params, onCompletion);
     };

    //For Operation 'generateAmendmentsList' with service id 'GenerateOutwardAmendmentsList9460'
     OutwardCollections.generateAmendmentsList = function(params, onCompletion){
        return OutwardCollections.customVerb('generateAmendmentsList', params, onCompletion);
     };

    //For Operation 'requestCollectionStatus' with service id 'RequestCollectionStatus2976'
     OutwardCollections.requestCollectionStatus = function(params, onCompletion){
        return OutwardCollections.customVerb('requestCollectionStatus', params, onCompletion);
     };

    //For Operation 'createAmendment' with service id 'CreateOutwardAmendment5816'
     OutwardCollections.createAmendment = function(params, onCompletion){
        return OutwardCollections.customVerb('createAmendment', params, onCompletion);
     };

    //For Operation 'getCollections' with service id 'GetOutwardCollections9250'
     OutwardCollections.getCollections = function(params, onCompletion){
        return OutwardCollections.customVerb('getCollections', params, onCompletion);
     };

    //For Operation 'getAmendments' with service id 'GetOutwardAmendments1156'
     OutwardCollections.getAmendments = function(params, onCompletion){
        return OutwardCollections.customVerb('getAmendments', params, onCompletion);
     };

    //For Operation 'generateAmendmentReport' with service id 'GenerateOutwardAmendmentReport2147'
     OutwardCollections.generateAmendmentReport = function(params, onCompletion){
        return OutwardCollections.customVerb('generateAmendmentReport', params, onCompletion);
     };

    //For Operation 'generateCollectionReport' with service id 'GenerateOutwardCollectionReport8249'
     OutwardCollections.generateCollectionReport = function(params, onCompletion){
        return OutwardCollections.customVerb('generateCollectionReport', params, onCompletion);
     };

    //For Operation 'saveCollection' with service id 'SaveOutwardCollection3380'
     OutwardCollections.saveCollection = function(params, onCompletion){
        return OutwardCollections.customVerb('saveCollection', params, onCompletion);
     };

    //For Operation 'getAmendmentById' with service id 'GetOutwardAmendmentById4028'
     OutwardCollections.getAmendmentById = function(params, onCompletion){
        return OutwardCollections.customVerb('getAmendmentById', params, onCompletion);
     };

    //For Operation 'updateCollection' with service id 'UpdateOutwardCollection6447'
     OutwardCollections.updateCollection = function(params, onCompletion){
        return OutwardCollections.customVerb('updateCollection', params, onCompletion);
     };

    //For Operation 'updateCollectionByBank' with service id 'UpdateOutwardCollectionByBank2643'
     OutwardCollections.updateCollectionByBank = function(params, onCompletion){
        return OutwardCollections.customVerb('updateCollectionByBank', params, onCompletion);
     };

    //For Operation 'generateCollectionsList' with service id 'GenerateOutwardCollectionsList2914'
     OutwardCollections.generateCollectionsList = function(params, onCompletion){
        return OutwardCollections.customVerb('generateCollectionsList', params, onCompletion);
     };

    //For Operation 'getCollectionById' with service id 'GetOutwardCollectionById8678'
     OutwardCollections.getCollectionById = function(params, onCompletion){
        return OutwardCollections.customVerb('getCollectionById', params, onCompletion);
     };

    //For Operation 'createCollection' with service id 'CreateOutwardCollection8106'
     OutwardCollections.createCollection = function(params, onCompletion){
        return OutwardCollections.customVerb('createCollection', params, onCompletion);
     };

    var relations = [];

    OutwardCollections.relations = relations;

    OutwardCollections.prototype.isValid = function() {
        return OutwardCollections.isValid(this);
    };

    OutwardCollections.prototype.objModelName = "OutwardCollections";
    OutwardCollections.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    OutwardCollections.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "OutwardCollections", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    OutwardCollections.clone = function(objectToClone) {
        var clonedObj = new OutwardCollections();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return OutwardCollections;
});