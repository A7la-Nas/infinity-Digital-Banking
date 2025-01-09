/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "InwardCollections", "objectService" : "TradeFinance"};

    var setterFunctions = {
        collectionSrmsId: function(val, state) {
            context["field"] = "collectionSrmsId";
            context["metadata"] = (objectMetadata ? objectMetadata["collectionSrmsId"] : null);
            state['collectionSrmsId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentSrmsId: function(val, state) {
            context["field"] = "amendmentSrmsId";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentSrmsId"] : null);
            state['amendmentSrmsId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        amendAmount: function(val, state) {
            context["field"] = "amendAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["amendAmount"] : null);
            state['amendAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendDocuments: function(val, state) {
            context["field"] = "amendDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["amendDocuments"] : null);
            state['amendDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendMaturityDate: function(val, state) {
            context["field"] = "amendMaturityDate";
            context["metadata"] = (objectMetadata ? objectMetadata["amendMaturityDate"] : null);
            state['amendMaturityDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendRemittingBank: function(val, state) {
            context["field"] = "amendRemittingBank";
            context["metadata"] = (objectMetadata ? objectMetadata["amendRemittingBank"] : null);
            state['amendRemittingBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendTenorType: function(val, state) {
            context["field"] = "amendTenorType";
            context["metadata"] = (objectMetadata ? objectMetadata["amendTenorType"] : null);
            state['amendTenorType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendUsanceDetails: function(val, state) {
            context["field"] = "amendUsanceDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["amendUsanceDetails"] : null);
            state['amendUsanceDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentDetails: function(val, state) {
            context["field"] = "amendmentDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentDetails"] : null);
            state['amendmentDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentNo: function(val, state) {
            context["field"] = "amendmentNo";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
            state['amendmentNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billExchangeStatus: function(val, state) {
            context["field"] = "billExchangeStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["billExchangeStatus"] : null);
            state['billExchangeStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cancellationStatus: function(val, state) {
            context["field"] = "cancellationStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["cancellationStatus"] : null);
            state['cancellationStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        charges: function(val, state) {
            context["field"] = "charges";
            context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
            state['charges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chargesDebitFrom: function(val, state) {
            context["field"] = "chargesDebitFrom";
            context["metadata"] = (objectMetadata ? objectMetadata["chargesDebitFrom"] : null);
            state['chargesDebitFrom'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdDate: function(val, state) {
            context["field"] = "createdDate";
            context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
            state['createdDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitAmountFrom: function(val, state) {
            context["field"] = "debitAmountFrom";
            context["metadata"] = (objectMetadata ? objectMetadata["debitAmountFrom"] : null);
            state['debitAmountFrom'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentNo: function(val, state) {
            context["field"] = "documentNo";
            context["metadata"] = (objectMetadata ? objectMetadata["documentNo"] : null);
            state['documentNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentsUploaded: function(val, state) {
            context["field"] = "documentsUploaded";
            context["metadata"] = (objectMetadata ? objectMetadata["documentsUploaded"] : null);
            state['documentsUploaded'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        draweeAcknowledgement: function(val, state) {
            context["field"] = "draweeAcknowledgement";
            context["metadata"] = (objectMetadata ? objectMetadata["draweeAcknowledgement"] : null);
            state['draweeAcknowledgement'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        draweeAcknowledgementDate: function(val, state) {
            context["field"] = "draweeAcknowledgementDate";
            context["metadata"] = (objectMetadata ? objectMetadata["draweeAcknowledgementDate"] : null);
            state['draweeAcknowledgementDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawer: function(val, state) {
            context["field"] = "drawer";
            context["metadata"] = (objectMetadata ? objectMetadata["drawer"] : null);
            state['drawer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawerName: function(val, state) {
            context["field"] = "drawerName";
            context["metadata"] = (objectMetadata ? objectMetadata["drawerName"] : null);
            state['drawerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        incoTerms: function(val, state) {
            context["field"] = "incoTerms";
            context["metadata"] = (objectMetadata ? objectMetadata["incoTerms"] : null);
            state['incoTerms'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastUpdatedDate: function(val, state) {
            context["field"] = "lastUpdatedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lastUpdatedDate"] : null);
            state['lastUpdatedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForCancellation: function(val, state) {
            context["field"] = "reasonForCancellation";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForCancellation"] : null);
            state['reasonForCancellation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        receivedOn: function(val, state) {
            context["field"] = "receivedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["receivedOn"] : null);
            state['receivedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        remittingBank: function(val, state) {
            context["field"] = "remittingBank";
            context["metadata"] = (objectMetadata ? objectMetadata["remittingBank"] : null);
            state['remittingBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        settledDate: function(val, state) {
            context["field"] = "settledDate";
            context["metadata"] = (objectMetadata ? objectMetadata["settledDate"] : null);
            state['settledDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tenorType: function(val, state) {
            context["field"] = "tenorType";
            context["metadata"] = (objectMetadata ? objectMetadata["tenorType"] : null);
            state['tenorType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionReference: function(val, state) {
            context["field"] = "transactionReference";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
            state['transactionReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        usanceAcceptance: function(val, state) {
            context["field"] = "usanceAcceptance";
            context["metadata"] = (objectMetadata ? objectMetadata["usanceAcceptance"] : null);
            state['usanceAcceptance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        usanceAcceptanceDate: function(val, state) {
            context["field"] = "usanceAcceptanceDate";
            context["metadata"] = (objectMetadata ? objectMetadata["usanceAcceptanceDate"] : null);
            state['usanceAcceptanceDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        usanceAcceptanceEligibility: function(val, state) {
            context["field"] = "usanceAcceptanceEligibility";
            context["metadata"] = (objectMetadata ? objectMetadata["usanceAcceptanceEligibility"] : null);
            state['usanceAcceptanceEligibility'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        usanceDetails: function(val, state) {
            context["field"] = "usanceDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["usanceDetails"] : null);
            state['usanceDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function InwardCollections(defaultValues) {
        var privateState = {};
        context["field"] = "collectionSrmsId";
        context["metadata"] = (objectMetadata ? objectMetadata["collectionSrmsId"] : null);
        privateState.collectionSrmsId = defaultValues ?
            (defaultValues["collectionSrmsId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["collectionSrmsId"], context) :
                null) :
            null;

        context["field"] = "amendmentSrmsId";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentSrmsId"] : null);
        privateState.amendmentSrmsId = defaultValues ?
            (defaultValues["amendmentSrmsId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentSrmsId"], context) :
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

        context["field"] = "amendAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["amendAmount"] : null);
        privateState.amendAmount = defaultValues ?
            (defaultValues["amendAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendAmount"], context) :
                null) :
            null;

        context["field"] = "amendDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["amendDocuments"] : null);
        privateState.amendDocuments = defaultValues ?
            (defaultValues["amendDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendDocuments"], context) :
                null) :
            null;

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
                null) :
            null;

        context["field"] = "amendMaturityDate";
        context["metadata"] = (objectMetadata ? objectMetadata["amendMaturityDate"] : null);
        privateState.amendMaturityDate = defaultValues ?
            (defaultValues["amendMaturityDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendMaturityDate"], context) :
                null) :
            null;

        context["field"] = "amendRemittingBank";
        context["metadata"] = (objectMetadata ? objectMetadata["amendRemittingBank"] : null);
        privateState.amendRemittingBank = defaultValues ?
            (defaultValues["amendRemittingBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendRemittingBank"], context) :
                null) :
            null;

        context["field"] = "amendTenorType";
        context["metadata"] = (objectMetadata ? objectMetadata["amendTenorType"] : null);
        privateState.amendTenorType = defaultValues ?
            (defaultValues["amendTenorType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendTenorType"], context) :
                null) :
            null;

        context["field"] = "amendUsanceDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["amendUsanceDetails"] : null);
        privateState.amendUsanceDetails = defaultValues ?
            (defaultValues["amendUsanceDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendUsanceDetails"], context) :
                null) :
            null;

        context["field"] = "amendmentDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentDetails"] : null);
        privateState.amendmentDetails = defaultValues ?
            (defaultValues["amendmentDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentDetails"], context) :
                null) :
            null;

        context["field"] = "amendmentNo";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentNo"] : null);
        privateState.amendmentNo = defaultValues ?
            (defaultValues["amendmentNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentNo"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "billExchangeStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["billExchangeStatus"] : null);
        privateState.billExchangeStatus = defaultValues ?
            (defaultValues["billExchangeStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billExchangeStatus"], context) :
                null) :
            null;

        context["field"] = "cancellationStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["cancellationStatus"] : null);
        privateState.cancellationStatus = defaultValues ?
            (defaultValues["cancellationStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cancellationStatus"], context) :
                null) :
            null;

        context["field"] = "charges";
        context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
        privateState.charges = defaultValues ?
            (defaultValues["charges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["charges"], context) :
                null) :
            null;

        context["field"] = "chargesDebitFrom";
        context["metadata"] = (objectMetadata ? objectMetadata["chargesDebitFrom"] : null);
        privateState.chargesDebitFrom = defaultValues ?
            (defaultValues["chargesDebitFrom"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chargesDebitFrom"], context) :
                null) :
            null;

        context["field"] = "createdDate";
        context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
        privateState.createdDate = defaultValues ?
            (defaultValues["createdDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdDate"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "debitAmountFrom";
        context["metadata"] = (objectMetadata ? objectMetadata["debitAmountFrom"] : null);
        privateState.debitAmountFrom = defaultValues ?
            (defaultValues["debitAmountFrom"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitAmountFrom"], context) :
                null) :
            null;

        context["field"] = "documentNo";
        context["metadata"] = (objectMetadata ? objectMetadata["documentNo"] : null);
        privateState.documentNo = defaultValues ?
            (defaultValues["documentNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentNo"], context) :
                null) :
            null;

        context["field"] = "documentsUploaded";
        context["metadata"] = (objectMetadata ? objectMetadata["documentsUploaded"] : null);
        privateState.documentsUploaded = defaultValues ?
            (defaultValues["documentsUploaded"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentsUploaded"], context) :
                null) :
            null;

        context["field"] = "draweeAcknowledgement";
        context["metadata"] = (objectMetadata ? objectMetadata["draweeAcknowledgement"] : null);
        privateState.draweeAcknowledgement = defaultValues ?
            (defaultValues["draweeAcknowledgement"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["draweeAcknowledgement"], context) :
                null) :
            null;

        context["field"] = "draweeAcknowledgementDate";
        context["metadata"] = (objectMetadata ? objectMetadata["draweeAcknowledgementDate"] : null);
        privateState.draweeAcknowledgementDate = defaultValues ?
            (defaultValues["draweeAcknowledgementDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["draweeAcknowledgementDate"], context) :
                null) :
            null;

        context["field"] = "drawer";
        context["metadata"] = (objectMetadata ? objectMetadata["drawer"] : null);
        privateState.drawer = defaultValues ?
            (defaultValues["drawer"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawer"], context) :
                null) :
            null;

        context["field"] = "drawerName";
        context["metadata"] = (objectMetadata ? objectMetadata["drawerName"] : null);
        privateState.drawerName = defaultValues ?
            (defaultValues["drawerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawerName"], context) :
                null) :
            null;

        context["field"] = "incoTerms";
        context["metadata"] = (objectMetadata ? objectMetadata["incoTerms"] : null);
        privateState.incoTerms = defaultValues ?
            (defaultValues["incoTerms"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["incoTerms"], context) :
                null) :
            null;

        context["field"] = "lastUpdatedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lastUpdatedDate"] : null);
        privateState.lastUpdatedDate = defaultValues ?
            (defaultValues["lastUpdatedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastUpdatedDate"], context) :
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

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "reasonForCancellation";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForCancellation"] : null);
        privateState.reasonForCancellation = defaultValues ?
            (defaultValues["reasonForCancellation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForCancellation"], context) :
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

        context["field"] = "receivedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["receivedOn"] : null);
        privateState.receivedOn = defaultValues ?
            (defaultValues["receivedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["receivedOn"], context) :
                null) :
            null;

        context["field"] = "remittingBank";
        context["metadata"] = (objectMetadata ? objectMetadata["remittingBank"] : null);
        privateState.remittingBank = defaultValues ?
            (defaultValues["remittingBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["remittingBank"], context) :
                null) :
            null;

        context["field"] = "settledDate";
        context["metadata"] = (objectMetadata ? objectMetadata["settledDate"] : null);
        privateState.settledDate = defaultValues ?
            (defaultValues["settledDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["settledDate"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "tenorType";
        context["metadata"] = (objectMetadata ? objectMetadata["tenorType"] : null);
        privateState.tenorType = defaultValues ?
            (defaultValues["tenorType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tenorType"], context) :
                null) :
            null;

        context["field"] = "transactionReference";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
        privateState.transactionReference = defaultValues ?
            (defaultValues["transactionReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionReference"], context) :
                null) :
            null;

        context["field"] = "usanceAcceptance";
        context["metadata"] = (objectMetadata ? objectMetadata["usanceAcceptance"] : null);
        privateState.usanceAcceptance = defaultValues ?
            (defaultValues["usanceAcceptance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["usanceAcceptance"], context) :
                null) :
            null;

        context["field"] = "usanceAcceptanceDate";
        context["metadata"] = (objectMetadata ? objectMetadata["usanceAcceptanceDate"] : null);
        privateState.usanceAcceptanceDate = defaultValues ?
            (defaultValues["usanceAcceptanceDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["usanceAcceptanceDate"], context) :
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

        context["field"] = "usanceAcceptanceEligibility";
        context["metadata"] = (objectMetadata ? objectMetadata["usanceAcceptanceEligibility"] : null);
        privateState.usanceAcceptanceEligibility = defaultValues ?
            (defaultValues["usanceAcceptanceEligibility"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["usanceAcceptanceEligibility"], context) :
                null) :
            null;

        context["field"] = "usanceDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["usanceDetails"] : null);
        privateState.usanceDetails = defaultValues ?
            (defaultValues["usanceDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["usanceDetails"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "collectionSrmsId": {
                get: function() {
                    context["field"] = "collectionSrmsId";
                    context["metadata"] = (objectMetadata ? objectMetadata["collectionSrmsId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.collectionSrmsId, context);
                },
                set: function(val) {
                    setterFunctions['collectionSrmsId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentSrmsId": {
                get: function() {
                    context["field"] = "amendmentSrmsId";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentSrmsId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentSrmsId, context);
                },
                set: function(val) {
                    setterFunctions['amendmentSrmsId'].call(this, val, privateState);
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
            "amendAmount": {
                get: function() {
                    context["field"] = "amendAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendAmount, context);
                },
                set: function(val) {
                    setterFunctions['amendAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendDocuments": {
                get: function() {
                    context["field"] = "amendDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendDocuments, context);
                },
                set: function(val) {
                    setterFunctions['amendDocuments'].call(this, val, privateState);
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
            "amendMaturityDate": {
                get: function() {
                    context["field"] = "amendMaturityDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendMaturityDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendMaturityDate, context);
                },
                set: function(val) {
                    setterFunctions['amendMaturityDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendRemittingBank": {
                get: function() {
                    context["field"] = "amendRemittingBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendRemittingBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendRemittingBank, context);
                },
                set: function(val) {
                    setterFunctions['amendRemittingBank'].call(this, val, privateState);
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
            "amendUsanceDetails": {
                get: function() {
                    context["field"] = "amendUsanceDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendUsanceDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendUsanceDetails, context);
                },
                set: function(val) {
                    setterFunctions['amendUsanceDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentDetails": {
                get: function() {
                    context["field"] = "amendmentDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentDetails, context);
                },
                set: function(val) {
                    setterFunctions['amendmentDetails'].call(this, val, privateState);
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
            "billExchangeStatus": {
                get: function() {
                    context["field"] = "billExchangeStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["billExchangeStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billExchangeStatus, context);
                },
                set: function(val) {
                    setterFunctions['billExchangeStatus'].call(this, val, privateState);
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
            "chargesDebitFrom": {
                get: function() {
                    context["field"] = "chargesDebitFrom";
                    context["metadata"] = (objectMetadata ? objectMetadata["chargesDebitFrom"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chargesDebitFrom, context);
                },
                set: function(val) {
                    setterFunctions['chargesDebitFrom'].call(this, val, privateState);
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
            "debitAmountFrom": {
                get: function() {
                    context["field"] = "debitAmountFrom";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitAmountFrom"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitAmountFrom, context);
                },
                set: function(val) {
                    setterFunctions['debitAmountFrom'].call(this, val, privateState);
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
            "documentsUploaded": {
                get: function() {
                    context["field"] = "documentsUploaded";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentsUploaded"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentsUploaded, context);
                },
                set: function(val) {
                    setterFunctions['documentsUploaded'].call(this, val, privateState);
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
            "draweeAcknowledgementDate": {
                get: function() {
                    context["field"] = "draweeAcknowledgementDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["draweeAcknowledgementDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.draweeAcknowledgementDate, context);
                },
                set: function(val) {
                    setterFunctions['draweeAcknowledgementDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawer": {
                get: function() {
                    context["field"] = "drawer";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawer"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawer, context);
                },
                set: function(val) {
                    setterFunctions['drawer'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawerName": {
                get: function() {
                    context["field"] = "drawerName";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawerName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawerName, context);
                },
                set: function(val) {
                    setterFunctions['drawerName'].call(this, val, privateState);
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
            "lastUpdatedDate": {
                get: function() {
                    context["field"] = "lastUpdatedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastUpdatedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastUpdatedDate, context);
                },
                set: function(val) {
                    setterFunctions['lastUpdatedDate'].call(this, val, privateState);
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
            "receivedOn": {
                get: function() {
                    context["field"] = "receivedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["receivedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.receivedOn, context);
                },
                set: function(val) {
                    setterFunctions['receivedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "remittingBank": {
                get: function() {
                    context["field"] = "remittingBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["remittingBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.remittingBank, context);
                },
                set: function(val) {
                    setterFunctions['remittingBank'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "settledDate": {
                get: function() {
                    context["field"] = "settledDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["settledDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.settledDate, context);
                },
                set: function(val) {
                    setterFunctions['settledDate'].call(this, val, privateState);
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
            "usanceAcceptance": {
                get: function() {
                    context["field"] = "usanceAcceptance";
                    context["metadata"] = (objectMetadata ? objectMetadata["usanceAcceptance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.usanceAcceptance, context);
                },
                set: function(val) {
                    setterFunctions['usanceAcceptance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "usanceAcceptanceDate": {
                get: function() {
                    context["field"] = "usanceAcceptanceDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["usanceAcceptanceDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.usanceAcceptanceDate, context);
                },
                set: function(val) {
                    setterFunctions['usanceAcceptanceDate'].call(this, val, privateState);
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
            "usanceAcceptanceEligibility": {
                get: function() {
                    context["field"] = "usanceAcceptanceEligibility";
                    context["metadata"] = (objectMetadata ? objectMetadata["usanceAcceptanceEligibility"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.usanceAcceptanceEligibility, context);
                },
                set: function(val) {
                    setterFunctions['usanceAcceptanceEligibility'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.collectionSrmsId = value ? (value["collectionSrmsId"] ? value["collectionSrmsId"] : null) : null;
            privateState.amendmentSrmsId = value ? (value["amendmentSrmsId"] ? value["amendmentSrmsId"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.timeParam = value ? (value["timeParam"] ? value["timeParam"] : null) : null;
            privateState.timeValue = value ? (value["timeValue"] ? value["timeValue"] : null) : null;
            privateState.filterByValue = value ? (value["filterByValue"] ? value["filterByValue"] : null) : null;
            privateState.filterByParam = value ? (value["filterByParam"] ? value["filterByParam"] : null) : null;
            privateState.amendAmount = value ? (value["amendAmount"] ? value["amendAmount"] : null) : null;
            privateState.amendDocuments = value ? (value["amendDocuments"] ? value["amendDocuments"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
            privateState.amendMaturityDate = value ? (value["amendMaturityDate"] ? value["amendMaturityDate"] : null) : null;
            privateState.amendRemittingBank = value ? (value["amendRemittingBank"] ? value["amendRemittingBank"] : null) : null;
            privateState.amendTenorType = value ? (value["amendTenorType"] ? value["amendTenorType"] : null) : null;
            privateState.amendUsanceDetails = value ? (value["amendUsanceDetails"] ? value["amendUsanceDetails"] : null) : null;
            privateState.amendmentDetails = value ? (value["amendmentDetails"] ? value["amendmentDetails"] : null) : null;
            privateState.amendmentNo = value ? (value["amendmentNo"] ? value["amendmentNo"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.billExchangeStatus = value ? (value["billExchangeStatus"] ? value["billExchangeStatus"] : null) : null;
            privateState.cancellationStatus = value ? (value["cancellationStatus"] ? value["cancellationStatus"] : null) : null;
            privateState.charges = value ? (value["charges"] ? value["charges"] : null) : null;
            privateState.chargesDebitFrom = value ? (value["chargesDebitFrom"] ? value["chargesDebitFrom"] : null) : null;
            privateState.createdDate = value ? (value["createdDate"] ? value["createdDate"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.debitAmountFrom = value ? (value["debitAmountFrom"] ? value["debitAmountFrom"] : null) : null;
            privateState.documentNo = value ? (value["documentNo"] ? value["documentNo"] : null) : null;
            privateState.documentsUploaded = value ? (value["documentsUploaded"] ? value["documentsUploaded"] : null) : null;
            privateState.draweeAcknowledgement = value ? (value["draweeAcknowledgement"] ? value["draweeAcknowledgement"] : null) : null;
            privateState.draweeAcknowledgementDate = value ? (value["draweeAcknowledgementDate"] ? value["draweeAcknowledgementDate"] : null) : null;
            privateState.drawer = value ? (value["drawer"] ? value["drawer"] : null) : null;
            privateState.drawerName = value ? (value["drawerName"] ? value["drawerName"] : null) : null;
            privateState.incoTerms = value ? (value["incoTerms"] ? value["incoTerms"] : null) : null;
            privateState.lastUpdatedDate = value ? (value["lastUpdatedDate"] ? value["lastUpdatedDate"] : null) : null;
            privateState.maturityDate = value ? (value["maturityDate"] ? value["maturityDate"] : null) : null;
            privateState.messageFromBank = value ? (value["messageFromBank"] ? value["messageFromBank"] : null) : null;
            privateState.messageToBank = value ? (value["messageToBank"] ? value["messageToBank"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.reasonForCancellation = value ? (value["reasonForCancellation"] ? value["reasonForCancellation"] : null) : null;
            privateState.reasonForRejection = value ? (value["reasonForRejection"] ? value["reasonForRejection"] : null) : null;
            privateState.reasonForReturn = value ? (value["reasonForReturn"] ? value["reasonForReturn"] : null) : null;
            privateState.receivedOn = value ? (value["receivedOn"] ? value["receivedOn"] : null) : null;
            privateState.remittingBank = value ? (value["remittingBank"] ? value["remittingBank"] : null) : null;
            privateState.settledDate = value ? (value["settledDate"] ? value["settledDate"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.tenorType = value ? (value["tenorType"] ? value["tenorType"] : null) : null;
            privateState.transactionReference = value ? (value["transactionReference"] ? value["transactionReference"] : null) : null;
            privateState.usanceAcceptance = value ? (value["usanceAcceptance"] ? value["usanceAcceptance"] : null) : null;
            privateState.usanceAcceptanceDate = value ? (value["usanceAcceptanceDate"] ? value["usanceAcceptanceDate"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.usanceAcceptanceEligibility = value ? (value["usanceAcceptanceEligibility"] ? value["usanceAcceptanceEligibility"] : null) : null;
            privateState.usanceDetails = value ? (value["usanceDetails"] ? value["usanceDetails"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(InwardCollections);

    //Create new class level validator object
    BaseModel.Validator.call(InwardCollections);

    var registerValidatorBackup = InwardCollections.registerValidator;

    InwardCollections.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(InwardCollections.isValid(this, propName, val)) {
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
    //For Operation 'updateInwardCollectionAmendment' with service id 'updateInwardCollectionAmendment1891'
     InwardCollections.updateInwardCollectionAmendment = function(params, onCompletion){
        return InwardCollections.customVerb('updateInwardCollectionAmendment', params, onCompletion);
     };

    //For Operation 'updateAmendmentByBank' with service id 'UpdateInwardAmendmentByBank8673'
     InwardCollections.updateAmendmentByBank = function(params, onCompletion){
        return InwardCollections.customVerb('updateAmendmentByBank', params, onCompletion);
     };

    //For Operation 'generateAmendmentsList' with service id 'GenerateInwardAmendmentsList1408'
     InwardCollections.generateAmendmentsList = function(params, onCompletion){
        return InwardCollections.customVerb('generateAmendmentsList', params, onCompletion);
     };

    //For Operation 'UpdateInwardCollection' with service id 'updateInwardCollection9297'
     InwardCollections.UpdateInwardCollection = function(params, onCompletion){
        return InwardCollections.customVerb('UpdateInwardCollection', params, onCompletion);
     };

    //For Operation 'createAmendment' with service id 'CreateInwardCollectionAmendment9163'
     InwardCollections.createAmendment = function(params, onCompletion){
        return InwardCollections.customVerb('createAmendment', params, onCompletion);
     };

    //For Operation 'getCollections' with service id 'GetInwardCollections7162'
     InwardCollections.getCollections = function(params, onCompletion){
        return InwardCollections.customVerb('getCollections', params, onCompletion);
     };

    //For Operation 'generateInwardCollectionsList' with service id 'GenerateInwardCollectionsList1311'
     InwardCollections.generateInwardCollectionsList = function(params, onCompletion){
        return InwardCollections.customVerb('generateInwardCollectionsList', params, onCompletion);
     };

    //For Operation 'generateAmendmentReport' with service id 'GenerateInwardAmendmentReport9252'
     InwardCollections.generateAmendmentReport = function(params, onCompletion){
        return InwardCollections.customVerb('generateAmendmentReport', params, onCompletion);
     };

    //For Operation 'generateInwardCollectionReport' with service id 'GenerateInwardCollection7653'
     InwardCollections.generateInwardCollectionReport = function(params, onCompletion){
        return InwardCollections.customVerb('generateInwardCollectionReport', params, onCompletion);
     };

    //For Operation 'GetInwardCollectionsAmendmentById' with service id 'getInwardCollectionsAmendmentById4958'
     InwardCollections.GetInwardCollectionsAmendmentById = function(params, onCompletion){
        return InwardCollections.customVerb('GetInwardCollectionsAmendmentById', params, onCompletion);
     };

    //For Operation 'updateInwardCollectionByBank' with service id 'updateInwardCollectionByBank6965'
     InwardCollections.updateInwardCollectionByBank = function(params, onCompletion){
        return InwardCollections.customVerb('updateInwardCollectionByBank', params, onCompletion);
     };

    //For Operation 'GetInwardCollectionsAmendments' with service id 'getInwardCollectionsAmendments6676'
     InwardCollections.GetInwardCollectionsAmendments = function(params, onCompletion){
        return InwardCollections.customVerb('GetInwardCollectionsAmendments', params, onCompletion);
     };

    //For Operation 'getCollectionById' with service id 'GetInwardCollectionById4095'
     InwardCollections.getCollectionById = function(params, onCompletion){
        return InwardCollections.customVerb('getCollectionById', params, onCompletion);
     };

    //For Operation 'createCollection' with service id 'CreateInwardCollection4565'
     InwardCollections.createCollection = function(params, onCompletion){
        return InwardCollections.customVerb('createCollection', params, onCompletion);
     };

    var relations = [];

    InwardCollections.relations = relations;

    InwardCollections.prototype.isValid = function() {
        return InwardCollections.isValid(this);
    };

    InwardCollections.prototype.objModelName = "InwardCollections";
    InwardCollections.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    InwardCollections.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "InwardCollections", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    InwardCollections.clone = function(objectToClone) {
        var clonedObj = new InwardCollections();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return InwardCollections;
});