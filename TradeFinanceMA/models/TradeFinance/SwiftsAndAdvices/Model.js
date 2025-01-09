/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "SwiftsAndAdvices", "objectService" : "TradeFinance"};

    var setterFunctions = {
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftMessage: function(val, state) {
            context["field"] = "swiftMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftMessage"] : null);
            state['swiftMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftMessageType: function(val, state) {
            context["field"] = "swiftMessageType";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftMessageType"] : null);
            state['swiftMessageType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftDate: function(val, state) {
            context["field"] = "swiftDate";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftDate"] : null);
            state['swiftDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftCategory: function(val, state) {
            context["field"] = "swiftCategory";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftCategory"] : null);
            state['swiftCategory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingsSrmsRequestOrderID: function(val, state) {
            context["field"] = "drawingsSrmsRequestOrderID";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingsSrmsRequestOrderID"] : null);
            state['drawingsSrmsRequestOrderID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftsAndAdvicesSrmsRequestOrderID: function(val, state) {
            context["field"] = "swiftsAndAdvicesSrmsRequestOrderID";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftsAndAdvicesSrmsRequestOrderID"] : null);
            state['swiftsAndAdvicesSrmsRequestOrderID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorMessage: function(val, state) {
            context["field"] = "errorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
            state['errorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorCode: function(val, state) {
            context["field"] = "errorCode";
            context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
            state['errorCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        flowType: function(val, state) {
            context["field"] = "flowType";
            context["metadata"] = (objectMetadata ? objectMetadata["flowType"] : null);
            state['flowType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sender: function(val, state) {
            context["field"] = "sender";
            context["metadata"] = (objectMetadata ? objectMetadata["sender"] : null);
            state['sender'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        receiver: function(val, state) {
            context["field"] = "receiver";
            context["metadata"] = (objectMetadata ? objectMetadata["receiver"] : null);
            state['receiver'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        guaranteesAmendId: function(val, state) {
            context["field"] = "guaranteesAmendId";
            context["metadata"] = (objectMetadata ? objectMetadata["guaranteesAmendId"] : null);
            state['guaranteesAmendId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        adviceName: function(val, state) {
            context["field"] = "adviceName";
            context["metadata"] = (objectMetadata ? objectMetadata["adviceName"] : null);
            state['adviceName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageDate: function(val, state) {
            context["field"] = "messageDate";
            context["metadata"] = (objectMetadata ? objectMetadata["messageDate"] : null);
            state['messageDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageType: function(val, state) {
            context["field"] = "messageType";
            context["metadata"] = (objectMetadata ? objectMetadata["messageType"] : null);
            state['messageType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        module: function(val, state) {
            context["field"] = "module";
            context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
            state['module'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdDate: function(val, state) {
            context["field"] = "createdDate";
            context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
            state['createdDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderId: function(val, state) {
            context["field"] = "orderId";
            context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
            state['orderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bCode: function(val, state) {
            context["field"] = "bCode";
            context["metadata"] = (objectMetadata ? objectMetadata["bCode"] : null);
            state['bCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bic: function(val, state) {
            context["field"] = "bic";
            context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
            state['bic'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transferDateOrTime: function(val, state) {
            context["field"] = "transferDateOrTime";
            context["metadata"] = (objectMetadata ? objectMetadata["transferDateOrTime"] : null);
            state['transferDateOrTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        type: function(val, state) {
            context["field"] = "type";
            context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
            state['type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestedDateOfIssue: function(val, state) {
            context["field"] = "requestedDateOfIssue";
            context["metadata"] = (objectMetadata ? objectMetadata["requestedDateOfIssue"] : null);
            state['requestedDateOfIssue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        formOfUndertaking: function(val, state) {
            context["field"] = "formOfUndertaking";
            context["metadata"] = (objectMetadata ? objectMetadata["formOfUndertaking"] : null);
            state['formOfUndertaking'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicableRules: function(val, state) {
            context["field"] = "applicableRules";
            context["metadata"] = (objectMetadata ? objectMetadata["applicableRules"] : null);
            state['applicableRules'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        typeOfUndertaking: function(val, state) {
            context["field"] = "typeOfUndertaking";
            context["metadata"] = (objectMetadata ? objectMetadata["typeOfUndertaking"] : null);
            state['typeOfUndertaking'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryType: function(val, state) {
            context["field"] = "expiryType";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryType"] : null);
            state['expiryType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateOfExpiry: function(val, state) {
            context["field"] = "dateOfExpiry";
            context["metadata"] = (objectMetadata ? objectMetadata["dateOfExpiry"] : null);
            state['dateOfExpiry'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryConditionOrEvent: function(val, state) {
            context["field"] = "expiryConditionOrEvent";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryConditionOrEvent"] : null);
            state['expiryConditionOrEvent'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicant: function(val, state) {
            context["field"] = "applicant";
            context["metadata"] = (objectMetadata ? objectMetadata["applicant"] : null);
            state['applicant'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        obligorOrInstructingParty: function(val, state) {
            context["field"] = "obligorOrInstructingParty";
            context["metadata"] = (objectMetadata ? objectMetadata["obligorOrInstructingParty"] : null);
            state['obligorOrInstructingParty'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuer: function(val, state) {
            context["field"] = "issuer";
            context["metadata"] = (objectMetadata ? objectMetadata["issuer"] : null);
            state['issuer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiary: function(val, state) {
            context["field"] = "beneficiary";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiary"] : null);
            state['beneficiary'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        undertakingAmount: function(val, state) {
            context["field"] = "undertakingAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["undertakingAmount"] : null);
            state['undertakingAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        additionalAmountInformation: function(val, state) {
            context["field"] = "additionalAmountInformation";
            context["metadata"] = (objectMetadata ? objectMetadata["additionalAmountInformation"] : null);
            state['additionalAmountInformation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableWith: function(val, state) {
            context["field"] = "availableWith";
            context["metadata"] = (objectMetadata ? objectMetadata["availableWith"] : null);
            state['availableWith'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        charges: function(val, state) {
            context["field"] = "charges";
            context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
            state['charges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentAndPresentationInstructions: function(val, state) {
            context["field"] = "documentAndPresentationInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["documentAndPresentationInstructions"] : null);
            state['documentAndPresentationInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestedLocalUndertakingTermsAndConditions: function(val, state) {
            context["field"] = "requestedLocalUndertakingTermsAndConditions";
            context["metadata"] = (objectMetadata ? objectMetadata["requestedLocalUndertakingTermsAndConditions"] : null);
            state['requestedLocalUndertakingTermsAndConditions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        standardWordingRequired: function(val, state) {
            context["field"] = "standardWordingRequired";
            context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequired"] : null);
            state['standardWordingRequired'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        standardWordingRequestedLanguage: function(val, state) {
            context["field"] = "standardWordingRequestedLanguage";
            context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequestedLanguage"] : null);
            state['standardWordingRequestedLanguage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        governingLawAndOrPlaceOfJurisdiction: function(val, state) {
            context["field"] = "governingLawAndOrPlaceOfJurisdiction";
            context["metadata"] = (objectMetadata ? objectMetadata["governingLawAndOrPlaceOfJurisdiction"] : null);
            state['governingLawAndOrPlaceOfJurisdiction'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        automaticExtensionPeriod: function(val, state) {
            context["field"] = "automaticExtensionPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionPeriod"] : null);
            state['automaticExtensionPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        automaticExtensionNonExtensionPeriod: function(val, state) {
            context["field"] = "automaticExtensionNonExtensionPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNonExtensionPeriod"] : null);
            state['automaticExtensionNonExtensionPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        automaticExtensionNotificationPeriod: function(val, state) {
            context["field"] = "automaticExtensionNotificationPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNotificationPeriod"] : null);
            state['automaticExtensionNotificationPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        automaticExtensionFinalExpiryDate: function(val, state) {
            context["field"] = "automaticExtensionFinalExpiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionFinalExpiryDate"] : null);
            state['automaticExtensionFinalExpiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        demandIndicator: function(val, state) {
            context["field"] = "demandIndicator";
            context["metadata"] = (objectMetadata ? objectMetadata["demandIndicator"] : null);
            state['demandIndicator'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transferIndicator: function(val, state) {
            context["field"] = "transferIndicator";
            context["metadata"] = (objectMetadata ? objectMetadata["transferIndicator"] : null);
            state['transferIndicator'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transferConditions: function(val, state) {
            context["field"] = "transferConditions";
            context["metadata"] = (objectMetadata ? objectMetadata["transferConditions"] : null);
            state['transferConditions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        underlyingTransactionDetails: function(val, state) {
            context["field"] = "underlyingTransactionDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["underlyingTransactionDetails"] : null);
            state['underlyingTransactionDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deliveryOfLocalUndertaking: function(val, state) {
            context["field"] = "deliveryOfLocalUndertaking";
            context["metadata"] = (objectMetadata ? objectMetadata["deliveryOfLocalUndertaking"] : null);
            state['deliveryOfLocalUndertaking'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deliveryToOrCollectionBy: function(val, state) {
            context["field"] = "deliveryToOrCollectionBy";
            context["metadata"] = (objectMetadata ? objectMetadata["deliveryToOrCollectionBy"] : null);
            state['deliveryToOrCollectionBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        newSequence: function(val, state) {
            context["field"] = "newSequence";
            context["metadata"] = (objectMetadata ? objectMetadata["newSequence"] : null);
            state['newSequence'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        product: function(val, state) {
            context["field"] = "product";
            context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
            state['product'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileName: function(val, state) {
            context["field"] = "fileName";
            context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
            state['fileName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        category: function(val, state) {
            context["field"] = "category";
            context["metadata"] = (objectMetadata ? objectMetadata["category"] : null);
            state['category'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadedTimeStamp: function(val, state) {
            context["field"] = "uploadedTimeStamp";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedTimeStamp"] : null);
            state['uploadedTimeStamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function SwiftsAndAdvices(defaultValues) {
        var privateState = {};
        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
                null) :
            null;

        context["field"] = "swiftMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftMessage"] : null);
        privateState.swiftMessage = defaultValues ?
            (defaultValues["swiftMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftMessage"], context) :
                null) :
            null;

        context["field"] = "swiftMessageType";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftMessageType"] : null);
        privateState.swiftMessageType = defaultValues ?
            (defaultValues["swiftMessageType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftMessageType"], context) :
                null) :
            null;

        context["field"] = "swiftDate";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftDate"] : null);
        privateState.swiftDate = defaultValues ?
            (defaultValues["swiftDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftDate"], context) :
                null) :
            null;

        context["field"] = "swiftCategory";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftCategory"] : null);
        privateState.swiftCategory = defaultValues ?
            (defaultValues["swiftCategory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftCategory"], context) :
                null) :
            null;

        context["field"] = "drawingsSrmsRequestOrderID";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingsSrmsRequestOrderID"] : null);
        privateState.drawingsSrmsRequestOrderID = defaultValues ?
            (defaultValues["drawingsSrmsRequestOrderID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingsSrmsRequestOrderID"], context) :
                null) :
            null;

        context["field"] = "swiftsAndAdvicesSrmsRequestOrderID";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftsAndAdvicesSrmsRequestOrderID"] : null);
        privateState.swiftsAndAdvicesSrmsRequestOrderID = defaultValues ?
            (defaultValues["swiftsAndAdvicesSrmsRequestOrderID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftsAndAdvicesSrmsRequestOrderID"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "errorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
        privateState.errorMessage = defaultValues ?
            (defaultValues["errorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorMessage"], context) :
                null) :
            null;

        context["field"] = "errorCode";
        context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
        privateState.errorCode = defaultValues ?
            (defaultValues["errorCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorCode"], context) :
                null) :
            null;

        context["field"] = "flowType";
        context["metadata"] = (objectMetadata ? objectMetadata["flowType"] : null);
        privateState.flowType = defaultValues ?
            (defaultValues["flowType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["flowType"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "sender";
        context["metadata"] = (objectMetadata ? objectMetadata["sender"] : null);
        privateState.sender = defaultValues ?
            (defaultValues["sender"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sender"], context) :
                null) :
            null;

        context["field"] = "receiver";
        context["metadata"] = (objectMetadata ? objectMetadata["receiver"] : null);
        privateState.receiver = defaultValues ?
            (defaultValues["receiver"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["receiver"], context) :
                null) :
            null;

        context["field"] = "guaranteesAmendId";
        context["metadata"] = (objectMetadata ? objectMetadata["guaranteesAmendId"] : null);
        privateState.guaranteesAmendId = defaultValues ?
            (defaultValues["guaranteesAmendId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["guaranteesAmendId"], context) :
                null) :
            null;

        context["field"] = "adviceName";
        context["metadata"] = (objectMetadata ? objectMetadata["adviceName"] : null);
        privateState.adviceName = defaultValues ?
            (defaultValues["adviceName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["adviceName"], context) :
                null) :
            null;

        context["field"] = "messageDate";
        context["metadata"] = (objectMetadata ? objectMetadata["messageDate"] : null);
        privateState.messageDate = defaultValues ?
            (defaultValues["messageDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageDate"], context) :
                null) :
            null;

        context["field"] = "messageType";
        context["metadata"] = (objectMetadata ? objectMetadata["messageType"] : null);
        privateState.messageType = defaultValues ?
            (defaultValues["messageType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageType"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
                null) :
            null;

        context["field"] = "module";
        context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
        privateState.module = defaultValues ?
            (defaultValues["module"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["module"], context) :
                null) :
            null;

        context["field"] = "createdDate";
        context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
        privateState.createdDate = defaultValues ?
            (defaultValues["createdDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdDate"], context) :
                null) :
            null;

        context["field"] = "orderId";
        context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
        privateState.orderId = defaultValues ?
            (defaultValues["orderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderId"], context) :
                null) :
            null;

        context["field"] = "bCode";
        context["metadata"] = (objectMetadata ? objectMetadata["bCode"] : null);
        privateState.bCode = defaultValues ?
            (defaultValues["bCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bCode"], context) :
                null) :
            null;

        context["field"] = "bic";
        context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
        privateState.bic = defaultValues ?
            (defaultValues["bic"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bic"], context) :
                null) :
            null;

        context["field"] = "transferDateOrTime";
        context["metadata"] = (objectMetadata ? objectMetadata["transferDateOrTime"] : null);
        privateState.transferDateOrTime = defaultValues ?
            (defaultValues["transferDateOrTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transferDateOrTime"], context) :
                null) :
            null;

        context["field"] = "type";
        context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
        privateState.type = defaultValues ?
            (defaultValues["type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["type"], context) :
                null) :
            null;

        context["field"] = "requestedDateOfIssue";
        context["metadata"] = (objectMetadata ? objectMetadata["requestedDateOfIssue"] : null);
        privateState.requestedDateOfIssue = defaultValues ?
            (defaultValues["requestedDateOfIssue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestedDateOfIssue"], context) :
                null) :
            null;

        context["field"] = "formOfUndertaking";
        context["metadata"] = (objectMetadata ? objectMetadata["formOfUndertaking"] : null);
        privateState.formOfUndertaking = defaultValues ?
            (defaultValues["formOfUndertaking"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["formOfUndertaking"], context) :
                null) :
            null;

        context["field"] = "applicableRules";
        context["metadata"] = (objectMetadata ? objectMetadata["applicableRules"] : null);
        privateState.applicableRules = defaultValues ?
            (defaultValues["applicableRules"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicableRules"], context) :
                null) :
            null;

        context["field"] = "typeOfUndertaking";
        context["metadata"] = (objectMetadata ? objectMetadata["typeOfUndertaking"] : null);
        privateState.typeOfUndertaking = defaultValues ?
            (defaultValues["typeOfUndertaking"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["typeOfUndertaking"], context) :
                null) :
            null;

        context["field"] = "expiryType";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryType"] : null);
        privateState.expiryType = defaultValues ?
            (defaultValues["expiryType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryType"], context) :
                null) :
            null;

        context["field"] = "dateOfExpiry";
        context["metadata"] = (objectMetadata ? objectMetadata["dateOfExpiry"] : null);
        privateState.dateOfExpiry = defaultValues ?
            (defaultValues["dateOfExpiry"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateOfExpiry"], context) :
                null) :
            null;

        context["field"] = "expiryConditionOrEvent";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryConditionOrEvent"] : null);
        privateState.expiryConditionOrEvent = defaultValues ?
            (defaultValues["expiryConditionOrEvent"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryConditionOrEvent"], context) :
                null) :
            null;

        context["field"] = "applicant";
        context["metadata"] = (objectMetadata ? objectMetadata["applicant"] : null);
        privateState.applicant = defaultValues ?
            (defaultValues["applicant"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicant"], context) :
                null) :
            null;

        context["field"] = "obligorOrInstructingParty";
        context["metadata"] = (objectMetadata ? objectMetadata["obligorOrInstructingParty"] : null);
        privateState.obligorOrInstructingParty = defaultValues ?
            (defaultValues["obligorOrInstructingParty"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["obligorOrInstructingParty"], context) :
                null) :
            null;

        context["field"] = "issuer";
        context["metadata"] = (objectMetadata ? objectMetadata["issuer"] : null);
        privateState.issuer = defaultValues ?
            (defaultValues["issuer"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuer"], context) :
                null) :
            null;

        context["field"] = "beneficiary";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiary"] : null);
        privateState.beneficiary = defaultValues ?
            (defaultValues["beneficiary"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiary"], context) :
                null) :
            null;

        context["field"] = "undertakingAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["undertakingAmount"] : null);
        privateState.undertakingAmount = defaultValues ?
            (defaultValues["undertakingAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["undertakingAmount"], context) :
                null) :
            null;

        context["field"] = "additionalAmountInformation";
        context["metadata"] = (objectMetadata ? objectMetadata["additionalAmountInformation"] : null);
        privateState.additionalAmountInformation = defaultValues ?
            (defaultValues["additionalAmountInformation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["additionalAmountInformation"], context) :
                null) :
            null;

        context["field"] = "availableWith";
        context["metadata"] = (objectMetadata ? objectMetadata["availableWith"] : null);
        privateState.availableWith = defaultValues ?
            (defaultValues["availableWith"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableWith"], context) :
                null) :
            null;

        context["field"] = "charges";
        context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
        privateState.charges = defaultValues ?
            (defaultValues["charges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["charges"], context) :
                null) :
            null;

        context["field"] = "documentAndPresentationInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["documentAndPresentationInstructions"] : null);
        privateState.documentAndPresentationInstructions = defaultValues ?
            (defaultValues["documentAndPresentationInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentAndPresentationInstructions"], context) :
                null) :
            null;

        context["field"] = "requestedLocalUndertakingTermsAndConditions";
        context["metadata"] = (objectMetadata ? objectMetadata["requestedLocalUndertakingTermsAndConditions"] : null);
        privateState.requestedLocalUndertakingTermsAndConditions = defaultValues ?
            (defaultValues["requestedLocalUndertakingTermsAndConditions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestedLocalUndertakingTermsAndConditions"], context) :
                null) :
            null;

        context["field"] = "standardWordingRequired";
        context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequired"] : null);
        privateState.standardWordingRequired = defaultValues ?
            (defaultValues["standardWordingRequired"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["standardWordingRequired"], context) :
                null) :
            null;

        context["field"] = "standardWordingRequestedLanguage";
        context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequestedLanguage"] : null);
        privateState.standardWordingRequestedLanguage = defaultValues ?
            (defaultValues["standardWordingRequestedLanguage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["standardWordingRequestedLanguage"], context) :
                null) :
            null;

        context["field"] = "governingLawAndOrPlaceOfJurisdiction";
        context["metadata"] = (objectMetadata ? objectMetadata["governingLawAndOrPlaceOfJurisdiction"] : null);
        privateState.governingLawAndOrPlaceOfJurisdiction = defaultValues ?
            (defaultValues["governingLawAndOrPlaceOfJurisdiction"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["governingLawAndOrPlaceOfJurisdiction"], context) :
                null) :
            null;

        context["field"] = "automaticExtensionPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionPeriod"] : null);
        privateState.automaticExtensionPeriod = defaultValues ?
            (defaultValues["automaticExtensionPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["automaticExtensionPeriod"], context) :
                null) :
            null;

        context["field"] = "automaticExtensionNonExtensionPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNonExtensionPeriod"] : null);
        privateState.automaticExtensionNonExtensionPeriod = defaultValues ?
            (defaultValues["automaticExtensionNonExtensionPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["automaticExtensionNonExtensionPeriod"], context) :
                null) :
            null;

        context["field"] = "automaticExtensionNotificationPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNotificationPeriod"] : null);
        privateState.automaticExtensionNotificationPeriod = defaultValues ?
            (defaultValues["automaticExtensionNotificationPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["automaticExtensionNotificationPeriod"], context) :
                null) :
            null;

        context["field"] = "automaticExtensionFinalExpiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionFinalExpiryDate"] : null);
        privateState.automaticExtensionFinalExpiryDate = defaultValues ?
            (defaultValues["automaticExtensionFinalExpiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["automaticExtensionFinalExpiryDate"], context) :
                null) :
            null;

        context["field"] = "demandIndicator";
        context["metadata"] = (objectMetadata ? objectMetadata["demandIndicator"] : null);
        privateState.demandIndicator = defaultValues ?
            (defaultValues["demandIndicator"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["demandIndicator"], context) :
                null) :
            null;

        context["field"] = "transferIndicator";
        context["metadata"] = (objectMetadata ? objectMetadata["transferIndicator"] : null);
        privateState.transferIndicator = defaultValues ?
            (defaultValues["transferIndicator"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transferIndicator"], context) :
                null) :
            null;

        context["field"] = "transferConditions";
        context["metadata"] = (objectMetadata ? objectMetadata["transferConditions"] : null);
        privateState.transferConditions = defaultValues ?
            (defaultValues["transferConditions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transferConditions"], context) :
                null) :
            null;

        context["field"] = "underlyingTransactionDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["underlyingTransactionDetails"] : null);
        privateState.underlyingTransactionDetails = defaultValues ?
            (defaultValues["underlyingTransactionDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["underlyingTransactionDetails"], context) :
                null) :
            null;

        context["field"] = "deliveryOfLocalUndertaking";
        context["metadata"] = (objectMetadata ? objectMetadata["deliveryOfLocalUndertaking"] : null);
        privateState.deliveryOfLocalUndertaking = defaultValues ?
            (defaultValues["deliveryOfLocalUndertaking"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deliveryOfLocalUndertaking"], context) :
                null) :
            null;

        context["field"] = "deliveryToOrCollectionBy";
        context["metadata"] = (objectMetadata ? objectMetadata["deliveryToOrCollectionBy"] : null);
        privateState.deliveryToOrCollectionBy = defaultValues ?
            (defaultValues["deliveryToOrCollectionBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deliveryToOrCollectionBy"], context) :
                null) :
            null;

        context["field"] = "newSequence";
        context["metadata"] = (objectMetadata ? objectMetadata["newSequence"] : null);
        privateState.newSequence = defaultValues ?
            (defaultValues["newSequence"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["newSequence"], context) :
                null) :
            null;

        context["field"] = "product";
        context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
        privateState.product = defaultValues ?
            (defaultValues["product"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["product"], context) :
                null) :
            null;

        context["field"] = "fileName";
        context["metadata"] = (objectMetadata ? objectMetadata["fileName"] : null);
        privateState.fileName = defaultValues ?
            (defaultValues["fileName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileName"], context) :
                null) :
            null;

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
                null) :
            null;

        context["field"] = "category";
        context["metadata"] = (objectMetadata ? objectMetadata["category"] : null);
        privateState.category = defaultValues ?
            (defaultValues["category"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["category"], context) :
                null) :
            null;

        context["field"] = "uploadedTimeStamp";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedTimeStamp"] : null);
        privateState.uploadedTimeStamp = defaultValues ?
            (defaultValues["uploadedTimeStamp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedTimeStamp"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "swiftMessage": {
                get: function() {
                    context["field"] = "swiftMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["swiftMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swiftMessage, context);
                },
                set: function(val) {
                    setterFunctions['swiftMessage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "swiftMessageType": {
                get: function() {
                    context["field"] = "swiftMessageType";
                    context["metadata"] = (objectMetadata ? objectMetadata["swiftMessageType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swiftMessageType, context);
                },
                set: function(val) {
                    setterFunctions['swiftMessageType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "swiftDate": {
                get: function() {
                    context["field"] = "swiftDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["swiftDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swiftDate, context);
                },
                set: function(val) {
                    setterFunctions['swiftDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "swiftCategory": {
                get: function() {
                    context["field"] = "swiftCategory";
                    context["metadata"] = (objectMetadata ? objectMetadata["swiftCategory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swiftCategory, context);
                },
                set: function(val) {
                    setterFunctions['swiftCategory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawingsSrmsRequestOrderID": {
                get: function() {
                    context["field"] = "drawingsSrmsRequestOrderID";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingsSrmsRequestOrderID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingsSrmsRequestOrderID, context);
                },
                set: function(val) {
                    setterFunctions['drawingsSrmsRequestOrderID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "swiftsAndAdvicesSrmsRequestOrderID": {
                get: function() {
                    context["field"] = "swiftsAndAdvicesSrmsRequestOrderID";
                    context["metadata"] = (objectMetadata ? objectMetadata["swiftsAndAdvicesSrmsRequestOrderID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swiftsAndAdvicesSrmsRequestOrderID, context);
                },
                set: function(val) {
                    setterFunctions['swiftsAndAdvicesSrmsRequestOrderID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerId": {
                get: function() {
                    context["field"] = "customerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerId, context);
                },
                set: function(val) {
                    setterFunctions['customerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errorMessage": {
                get: function() {
                    context["field"] = "errorMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorMessage, context);
                },
                set: function(val) {
                    setterFunctions['errorMessage'].call(this, val, privateState);
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
            "flowType": {
                get: function() {
                    context["field"] = "flowType";
                    context["metadata"] = (objectMetadata ? objectMetadata["flowType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.flowType, context);
                },
                set: function(val) {
                    setterFunctions['flowType'].call(this, val, privateState);
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
            "sender": {
                get: function() {
                    context["field"] = "sender";
                    context["metadata"] = (objectMetadata ? objectMetadata["sender"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sender, context);
                },
                set: function(val) {
                    setterFunctions['sender'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "receiver": {
                get: function() {
                    context["field"] = "receiver";
                    context["metadata"] = (objectMetadata ? objectMetadata["receiver"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.receiver, context);
                },
                set: function(val) {
                    setterFunctions['receiver'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "guaranteesAmendId": {
                get: function() {
                    context["field"] = "guaranteesAmendId";
                    context["metadata"] = (objectMetadata ? objectMetadata["guaranteesAmendId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.guaranteesAmendId, context);
                },
                set: function(val) {
                    setterFunctions['guaranteesAmendId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "adviceName": {
                get: function() {
                    context["field"] = "adviceName";
                    context["metadata"] = (objectMetadata ? objectMetadata["adviceName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.adviceName, context);
                },
                set: function(val) {
                    setterFunctions['adviceName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "messageDate": {
                get: function() {
                    context["field"] = "messageDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["messageDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messageDate, context);
                },
                set: function(val) {
                    setterFunctions['messageDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "messageType": {
                get: function() {
                    context["field"] = "messageType";
                    context["metadata"] = (objectMetadata ? objectMetadata["messageType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messageType, context);
                },
                set: function(val) {
                    setterFunctions['messageType'].call(this, val, privateState);
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
            "module": {
                get: function() {
                    context["field"] = "module";
                    context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.module, context);
                },
                set: function(val) {
                    setterFunctions['module'].call(this, val, privateState);
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
            "bCode": {
                get: function() {
                    context["field"] = "bCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["bCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bCode, context);
                },
                set: function(val) {
                    setterFunctions['bCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bic": {
                get: function() {
                    context["field"] = "bic";
                    context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bic, context);
                },
                set: function(val) {
                    setterFunctions['bic'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transferDateOrTime": {
                get: function() {
                    context["field"] = "transferDateOrTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["transferDateOrTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transferDateOrTime, context);
                },
                set: function(val) {
                    setterFunctions['transferDateOrTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "type": {
                get: function() {
                    context["field"] = "type";
                    context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.type, context);
                },
                set: function(val) {
                    setterFunctions['type'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestedDateOfIssue": {
                get: function() {
                    context["field"] = "requestedDateOfIssue";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestedDateOfIssue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestedDateOfIssue, context);
                },
                set: function(val) {
                    setterFunctions['requestedDateOfIssue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "formOfUndertaking": {
                get: function() {
                    context["field"] = "formOfUndertaking";
                    context["metadata"] = (objectMetadata ? objectMetadata["formOfUndertaking"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.formOfUndertaking, context);
                },
                set: function(val) {
                    setterFunctions['formOfUndertaking'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "applicableRules": {
                get: function() {
                    context["field"] = "applicableRules";
                    context["metadata"] = (objectMetadata ? objectMetadata["applicableRules"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.applicableRules, context);
                },
                set: function(val) {
                    setterFunctions['applicableRules'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "typeOfUndertaking": {
                get: function() {
                    context["field"] = "typeOfUndertaking";
                    context["metadata"] = (objectMetadata ? objectMetadata["typeOfUndertaking"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.typeOfUndertaking, context);
                },
                set: function(val) {
                    setterFunctions['typeOfUndertaking'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiryType": {
                get: function() {
                    context["field"] = "expiryType";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryType, context);
                },
                set: function(val) {
                    setterFunctions['expiryType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateOfExpiry": {
                get: function() {
                    context["field"] = "dateOfExpiry";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateOfExpiry"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateOfExpiry, context);
                },
                set: function(val) {
                    setterFunctions['dateOfExpiry'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiryConditionOrEvent": {
                get: function() {
                    context["field"] = "expiryConditionOrEvent";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryConditionOrEvent"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryConditionOrEvent, context);
                },
                set: function(val) {
                    setterFunctions['expiryConditionOrEvent'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "applicant": {
                get: function() {
                    context["field"] = "applicant";
                    context["metadata"] = (objectMetadata ? objectMetadata["applicant"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.applicant, context);
                },
                set: function(val) {
                    setterFunctions['applicant'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "obligorOrInstructingParty": {
                get: function() {
                    context["field"] = "obligorOrInstructingParty";
                    context["metadata"] = (objectMetadata ? objectMetadata["obligorOrInstructingParty"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.obligorOrInstructingParty, context);
                },
                set: function(val) {
                    setterFunctions['obligorOrInstructingParty'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuer": {
                get: function() {
                    context["field"] = "issuer";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuer"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuer, context);
                },
                set: function(val) {
                    setterFunctions['issuer'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiary": {
                get: function() {
                    context["field"] = "beneficiary";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiary"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiary, context);
                },
                set: function(val) {
                    setterFunctions['beneficiary'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "undertakingAmount": {
                get: function() {
                    context["field"] = "undertakingAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["undertakingAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.undertakingAmount, context);
                },
                set: function(val) {
                    setterFunctions['undertakingAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "additionalAmountInformation": {
                get: function() {
                    context["field"] = "additionalAmountInformation";
                    context["metadata"] = (objectMetadata ? objectMetadata["additionalAmountInformation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.additionalAmountInformation, context);
                },
                set: function(val) {
                    setterFunctions['additionalAmountInformation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableWith": {
                get: function() {
                    context["field"] = "availableWith";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableWith"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableWith, context);
                },
                set: function(val) {
                    setterFunctions['availableWith'].call(this, val, privateState);
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
            "documentAndPresentationInstructions": {
                get: function() {
                    context["field"] = "documentAndPresentationInstructions";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentAndPresentationInstructions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentAndPresentationInstructions, context);
                },
                set: function(val) {
                    setterFunctions['documentAndPresentationInstructions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestedLocalUndertakingTermsAndConditions": {
                get: function() {
                    context["field"] = "requestedLocalUndertakingTermsAndConditions";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestedLocalUndertakingTermsAndConditions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestedLocalUndertakingTermsAndConditions, context);
                },
                set: function(val) {
                    setterFunctions['requestedLocalUndertakingTermsAndConditions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "standardWordingRequired": {
                get: function() {
                    context["field"] = "standardWordingRequired";
                    context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequired"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.standardWordingRequired, context);
                },
                set: function(val) {
                    setterFunctions['standardWordingRequired'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "standardWordingRequestedLanguage": {
                get: function() {
                    context["field"] = "standardWordingRequestedLanguage";
                    context["metadata"] = (objectMetadata ? objectMetadata["standardWordingRequestedLanguage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.standardWordingRequestedLanguage, context);
                },
                set: function(val) {
                    setterFunctions['standardWordingRequestedLanguage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "governingLawAndOrPlaceOfJurisdiction": {
                get: function() {
                    context["field"] = "governingLawAndOrPlaceOfJurisdiction";
                    context["metadata"] = (objectMetadata ? objectMetadata["governingLawAndOrPlaceOfJurisdiction"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.governingLawAndOrPlaceOfJurisdiction, context);
                },
                set: function(val) {
                    setterFunctions['governingLawAndOrPlaceOfJurisdiction'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "automaticExtensionPeriod": {
                get: function() {
                    context["field"] = "automaticExtensionPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.automaticExtensionPeriod, context);
                },
                set: function(val) {
                    setterFunctions['automaticExtensionPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "automaticExtensionNonExtensionPeriod": {
                get: function() {
                    context["field"] = "automaticExtensionNonExtensionPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNonExtensionPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.automaticExtensionNonExtensionPeriod, context);
                },
                set: function(val) {
                    setterFunctions['automaticExtensionNonExtensionPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "automaticExtensionNotificationPeriod": {
                get: function() {
                    context["field"] = "automaticExtensionNotificationPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionNotificationPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.automaticExtensionNotificationPeriod, context);
                },
                set: function(val) {
                    setterFunctions['automaticExtensionNotificationPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "automaticExtensionFinalExpiryDate": {
                get: function() {
                    context["field"] = "automaticExtensionFinalExpiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["automaticExtensionFinalExpiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.automaticExtensionFinalExpiryDate, context);
                },
                set: function(val) {
                    setterFunctions['automaticExtensionFinalExpiryDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "demandIndicator": {
                get: function() {
                    context["field"] = "demandIndicator";
                    context["metadata"] = (objectMetadata ? objectMetadata["demandIndicator"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.demandIndicator, context);
                },
                set: function(val) {
                    setterFunctions['demandIndicator'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transferIndicator": {
                get: function() {
                    context["field"] = "transferIndicator";
                    context["metadata"] = (objectMetadata ? objectMetadata["transferIndicator"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transferIndicator, context);
                },
                set: function(val) {
                    setterFunctions['transferIndicator'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transferConditions": {
                get: function() {
                    context["field"] = "transferConditions";
                    context["metadata"] = (objectMetadata ? objectMetadata["transferConditions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transferConditions, context);
                },
                set: function(val) {
                    setterFunctions['transferConditions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "underlyingTransactionDetails": {
                get: function() {
                    context["field"] = "underlyingTransactionDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["underlyingTransactionDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.underlyingTransactionDetails, context);
                },
                set: function(val) {
                    setterFunctions['underlyingTransactionDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deliveryOfLocalUndertaking": {
                get: function() {
                    context["field"] = "deliveryOfLocalUndertaking";
                    context["metadata"] = (objectMetadata ? objectMetadata["deliveryOfLocalUndertaking"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deliveryOfLocalUndertaking, context);
                },
                set: function(val) {
                    setterFunctions['deliveryOfLocalUndertaking'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deliveryToOrCollectionBy": {
                get: function() {
                    context["field"] = "deliveryToOrCollectionBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["deliveryToOrCollectionBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deliveryToOrCollectionBy, context);
                },
                set: function(val) {
                    setterFunctions['deliveryToOrCollectionBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "newSequence": {
                get: function() {
                    context["field"] = "newSequence";
                    context["metadata"] = (objectMetadata ? objectMetadata["newSequence"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.newSequence, context);
                },
                set: function(val) {
                    setterFunctions['newSequence'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "product": {
                get: function() {
                    context["field"] = "product";
                    context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.product, context);
                },
                set: function(val) {
                    setterFunctions['product'].call(this, val, privateState);
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
            "uploadedTimeStamp": {
                get: function() {
                    context["field"] = "uploadedTimeStamp";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadedTimeStamp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadedTimeStamp, context);
                },
                set: function(val) {
                    setterFunctions['uploadedTimeStamp'].call(this, val, privateState);
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
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.swiftMessage = value ? (value["swiftMessage"] ? value["swiftMessage"] : null) : null;
            privateState.swiftMessageType = value ? (value["swiftMessageType"] ? value["swiftMessageType"] : null) : null;
            privateState.swiftDate = value ? (value["swiftDate"] ? value["swiftDate"] : null) : null;
            privateState.swiftCategory = value ? (value["swiftCategory"] ? value["swiftCategory"] : null) : null;
            privateState.drawingsSrmsRequestOrderID = value ? (value["drawingsSrmsRequestOrderID"] ? value["drawingsSrmsRequestOrderID"] : null) : null;
            privateState.swiftsAndAdvicesSrmsRequestOrderID = value ? (value["swiftsAndAdvicesSrmsRequestOrderID"] ? value["swiftsAndAdvicesSrmsRequestOrderID"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.errorCode = value ? (value["errorCode"] ? value["errorCode"] : null) : null;
            privateState.flowType = value ? (value["flowType"] ? value["flowType"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.sender = value ? (value["sender"] ? value["sender"] : null) : null;
            privateState.receiver = value ? (value["receiver"] ? value["receiver"] : null) : null;
            privateState.guaranteesAmendId = value ? (value["guaranteesAmendId"] ? value["guaranteesAmendId"] : null) : null;
            privateState.adviceName = value ? (value["adviceName"] ? value["adviceName"] : null) : null;
            privateState.messageDate = value ? (value["messageDate"] ? value["messageDate"] : null) : null;
            privateState.messageType = value ? (value["messageType"] ? value["messageType"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.module = value ? (value["module"] ? value["module"] : null) : null;
            privateState.createdDate = value ? (value["createdDate"] ? value["createdDate"] : null) : null;
            privateState.orderId = value ? (value["orderId"] ? value["orderId"] : null) : null;
            privateState.bCode = value ? (value["bCode"] ? value["bCode"] : null) : null;
            privateState.bic = value ? (value["bic"] ? value["bic"] : null) : null;
            privateState.transferDateOrTime = value ? (value["transferDateOrTime"] ? value["transferDateOrTime"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.requestedDateOfIssue = value ? (value["requestedDateOfIssue"] ? value["requestedDateOfIssue"] : null) : null;
            privateState.formOfUndertaking = value ? (value["formOfUndertaking"] ? value["formOfUndertaking"] : null) : null;
            privateState.applicableRules = value ? (value["applicableRules"] ? value["applicableRules"] : null) : null;
            privateState.typeOfUndertaking = value ? (value["typeOfUndertaking"] ? value["typeOfUndertaking"] : null) : null;
            privateState.expiryType = value ? (value["expiryType"] ? value["expiryType"] : null) : null;
            privateState.dateOfExpiry = value ? (value["dateOfExpiry"] ? value["dateOfExpiry"] : null) : null;
            privateState.expiryConditionOrEvent = value ? (value["expiryConditionOrEvent"] ? value["expiryConditionOrEvent"] : null) : null;
            privateState.applicant = value ? (value["applicant"] ? value["applicant"] : null) : null;
            privateState.obligorOrInstructingParty = value ? (value["obligorOrInstructingParty"] ? value["obligorOrInstructingParty"] : null) : null;
            privateState.issuer = value ? (value["issuer"] ? value["issuer"] : null) : null;
            privateState.beneficiary = value ? (value["beneficiary"] ? value["beneficiary"] : null) : null;
            privateState.undertakingAmount = value ? (value["undertakingAmount"] ? value["undertakingAmount"] : null) : null;
            privateState.additionalAmountInformation = value ? (value["additionalAmountInformation"] ? value["additionalAmountInformation"] : null) : null;
            privateState.availableWith = value ? (value["availableWith"] ? value["availableWith"] : null) : null;
            privateState.charges = value ? (value["charges"] ? value["charges"] : null) : null;
            privateState.documentAndPresentationInstructions = value ? (value["documentAndPresentationInstructions"] ? value["documentAndPresentationInstructions"] : null) : null;
            privateState.requestedLocalUndertakingTermsAndConditions = value ? (value["requestedLocalUndertakingTermsAndConditions"] ? value["requestedLocalUndertakingTermsAndConditions"] : null) : null;
            privateState.standardWordingRequired = value ? (value["standardWordingRequired"] ? value["standardWordingRequired"] : null) : null;
            privateState.standardWordingRequestedLanguage = value ? (value["standardWordingRequestedLanguage"] ? value["standardWordingRequestedLanguage"] : null) : null;
            privateState.governingLawAndOrPlaceOfJurisdiction = value ? (value["governingLawAndOrPlaceOfJurisdiction"] ? value["governingLawAndOrPlaceOfJurisdiction"] : null) : null;
            privateState.automaticExtensionPeriod = value ? (value["automaticExtensionPeriod"] ? value["automaticExtensionPeriod"] : null) : null;
            privateState.automaticExtensionNonExtensionPeriod = value ? (value["automaticExtensionNonExtensionPeriod"] ? value["automaticExtensionNonExtensionPeriod"] : null) : null;
            privateState.automaticExtensionNotificationPeriod = value ? (value["automaticExtensionNotificationPeriod"] ? value["automaticExtensionNotificationPeriod"] : null) : null;
            privateState.automaticExtensionFinalExpiryDate = value ? (value["automaticExtensionFinalExpiryDate"] ? value["automaticExtensionFinalExpiryDate"] : null) : null;
            privateState.demandIndicator = value ? (value["demandIndicator"] ? value["demandIndicator"] : null) : null;
            privateState.transferIndicator = value ? (value["transferIndicator"] ? value["transferIndicator"] : null) : null;
            privateState.transferConditions = value ? (value["transferConditions"] ? value["transferConditions"] : null) : null;
            privateState.underlyingTransactionDetails = value ? (value["underlyingTransactionDetails"] ? value["underlyingTransactionDetails"] : null) : null;
            privateState.deliveryOfLocalUndertaking = value ? (value["deliveryOfLocalUndertaking"] ? value["deliveryOfLocalUndertaking"] : null) : null;
            privateState.deliveryToOrCollectionBy = value ? (value["deliveryToOrCollectionBy"] ? value["deliveryToOrCollectionBy"] : null) : null;
            privateState.newSequence = value ? (value["newSequence"] ? value["newSequence"] : null) : null;
            privateState.product = value ? (value["product"] ? value["product"] : null) : null;
            privateState.fileName = value ? (value["fileName"] ? value["fileName"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
            privateState.category = value ? (value["category"] ? value["category"] : null) : null;
            privateState.uploadedTimeStamp = value ? (value["uploadedTimeStamp"] ? value["uploadedTimeStamp"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(SwiftsAndAdvices);

    //Create new class level validator object
    BaseModel.Validator.call(SwiftsAndAdvices);

    var registerValidatorBackup = SwiftsAndAdvices.registerValidator;

    SwiftsAndAdvices.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(SwiftsAndAdvices.isValid(this, propName, val)) {
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
    //For Operation 'fetchSwiftsAdvices' with service id 'fetchSwiftsAdvices7375'
     SwiftsAndAdvices.fetchSwiftsAdvices = function(params, onCompletion){
        return SwiftsAndAdvices.customVerb('fetchSwiftsAdvices', params, onCompletion);
     };

    //For Operation 'createSwiftsAndAdvices' with service id 'createImportLCDrawingSwiftsAndAdvices4499'
     SwiftsAndAdvices.createSwiftsAndAdvices = function(params, onCompletion){
        return SwiftsAndAdvices.customVerb('createSwiftsAndAdvices', params, onCompletion);
     };

    //For Operation 'uploadSwiftsAdvices' with service id 'uploadSwiftsAdvices9571'
     SwiftsAndAdvices.uploadSwiftsAdvices = function(params, onCompletion){
        return SwiftsAndAdvices.customVerb('uploadSwiftsAdvices', params, onCompletion);
     };

    //For Operation 'getSwiftsAndAdvices' with service id 'getImportLCDrawingSwiftsAndAdvices7670'
     SwiftsAndAdvices.getSwiftsAndAdvices = function(params, onCompletion){
        return SwiftsAndAdvices.customVerb('getSwiftsAndAdvices', params, onCompletion);
     };

    var relations = [];

    SwiftsAndAdvices.relations = relations;

    SwiftsAndAdvices.prototype.isValid = function() {
        return SwiftsAndAdvices.isValid(this);
    };

    SwiftsAndAdvices.prototype.objModelName = "SwiftsAndAdvices";
    SwiftsAndAdvices.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    SwiftsAndAdvices.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "SwiftsAndAdvices", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    SwiftsAndAdvices.clone = function(objectToClone) {
        var clonedObj = new SwiftsAndAdvices();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return SwiftsAndAdvices;
});