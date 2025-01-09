/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "LCImportDrawing", "objectService" : "TradeFinance"};

    var setterFunctions = {
        lcReferenceNo: function(val, state) {
            context["field"] = "lcReferenceNo";
            context["metadata"] = (objectMetadata ? objectMetadata["lcReferenceNo"] : null);
            state['lcReferenceNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcType: function(val, state) {
            context["field"] = "lcType";
            context["metadata"] = (objectMetadata ? objectMetadata["lcType"] : null);
            state['lcType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingReferenceNo: function(val, state) {
            context["field"] = "drawingReferenceNo";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingReferenceNo"] : null);
            state['drawingReferenceNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentStatus: function(val, state) {
            context["field"] = "documentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
            state['documentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingCreationDate: function(val, state) {
            context["field"] = "drawingCreationDate";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingCreationDate"] : null);
            state['drawingCreationDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingCurrency: function(val, state) {
            context["field"] = "drawingCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingCurrency"] : null);
            state['drawingCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingAmount: function(val, state) {
            context["field"] = "drawingAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingAmount"] : null);
            state['drawingAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingStatus: function(val, state) {
            context["field"] = "drawingStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingStatus"] : null);
            state['drawingStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcAmount: function(val, state) {
            context["field"] = "lcAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["lcAmount"] : null);
            state['lcAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcCurrency: function(val, state) {
            context["field"] = "lcCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["lcCurrency"] : null);
            state['lcCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcIssueDate: function(val, state) {
            context["field"] = "lcIssueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lcIssueDate"] : null);
            state['lcIssueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcExpiryDate: function(val, state) {
            context["field"] = "lcExpiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lcExpiryDate"] : null);
            state['lcExpiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentTerms: function(val, state) {
            context["field"] = "paymentTerms";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentTerms"] : null);
            state['paymentTerms'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        presentorReference: function(val, state) {
            context["field"] = "presentorReference";
            context["metadata"] = (objectMetadata ? objectMetadata["presentorReference"] : null);
            state['presentorReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        presentorName: function(val, state) {
            context["field"] = "presentorName";
            context["metadata"] = (objectMetadata ? objectMetadata["presentorName"] : null);
            state['presentorName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentsReceived: function(val, state) {
            context["field"] = "documentsReceived";
            context["metadata"] = (objectMetadata ? objectMetadata["documentsReceived"] : null);
            state['documentsReceived'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        forwardContact: function(val, state) {
            context["field"] = "forwardContact";
            context["metadata"] = (objectMetadata ? objectMetadata["forwardContact"] : null);
            state['forwardContact'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        shippingGuaranteeReference: function(val, state) {
            context["field"] = "shippingGuaranteeReference";
            context["metadata"] = (objectMetadata ? objectMetadata["shippingGuaranteeReference"] : null);
            state['shippingGuaranteeReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        approvalDate: function(val, state) {
            context["field"] = "approvalDate";
            context["metadata"] = (objectMetadata ? objectMetadata["approvalDate"] : null);
            state['approvalDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalDocuments: function(val, state) {
            context["field"] = "totalDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["totalDocuments"] : null);
            state['totalDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentName: function(val, state) {
            context["field"] = "documentName";
            context["metadata"] = (objectMetadata ? objectMetadata["documentName"] : null);
            state['documentName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        discrepancies: function(val, state) {
            context["field"] = "discrepancies";
            context["metadata"] = (objectMetadata ? objectMetadata["discrepancies"] : null);
            state['discrepancies'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentStatus: function(val, state) {
            context["field"] = "paymentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
            state['paymentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rejectedDate: function(val, state) {
            context["field"] = "rejectedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["rejectedDate"] : null);
            state['rejectedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalAmountToBePaid: function(val, state) {
            context["field"] = "totalAmountToBePaid";
            context["metadata"] = (objectMetadata ? objectMetadata["totalAmountToBePaid"] : null);
            state['totalAmountToBePaid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountToBeDebited: function(val, state) {
            context["field"] = "accountToBeDebited";
            context["metadata"] = (objectMetadata ? objectMetadata["accountToBeDebited"] : null);
            state['accountToBeDebited'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        totalPaidAmount: function(val, state) {
            context["field"] = "totalPaidAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalPaidAmount"] : null);
            state['totalPaidAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDate: function(val, state) {
            context["field"] = "paymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
            state['paymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForRejection: function(val, state) {
            context["field"] = "reasonForRejection";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForRejection"] : null);
            state['reasonForRejection'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        acceptance: function(val, state) {
            context["field"] = "acceptance";
            context["metadata"] = (objectMetadata ? objectMetadata["acceptance"] : null);
            state['acceptance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageType: function(val, state) {
            context["field"] = "messageType";
            context["metadata"] = (objectMetadata ? objectMetadata["messageType"] : null);
            state['messageType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deliveryDestination: function(val, state) {
            context["field"] = "deliveryDestination";
            context["metadata"] = (objectMetadata ? objectMetadata["deliveryDestination"] : null);
            state['deliveryDestination'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageDate: function(val, state) {
            context["field"] = "messageDate";
            context["metadata"] = (objectMetadata ? objectMetadata["messageDate"] : null);
            state['messageDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageCategory: function(val, state) {
            context["field"] = "messageCategory";
            context["metadata"] = (objectMetadata ? objectMetadata["messageCategory"] : null);
            state['messageCategory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcSrmsReqOrderID: function(val, state) {
            context["field"] = "lcSrmsReqOrderID";
            context["metadata"] = (objectMetadata ? objectMetadata["lcSrmsReqOrderID"] : null);
            state['lcSrmsReqOrderID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingsSrmsReqOrderID: function(val, state) {
            context["field"] = "drawingsSrmsReqOrderID";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingsSrmsReqOrderID"] : null);
            state['drawingsSrmsReqOrderID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function LCImportDrawing(defaultValues) {
        var privateState = {};
        context["field"] = "lcReferenceNo";
        context["metadata"] = (objectMetadata ? objectMetadata["lcReferenceNo"] : null);
        privateState.lcReferenceNo = defaultValues ?
            (defaultValues["lcReferenceNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcReferenceNo"], context) :
                null) :
            null;

        context["field"] = "lcType";
        context["metadata"] = (objectMetadata ? objectMetadata["lcType"] : null);
        privateState.lcType = defaultValues ?
            (defaultValues["lcType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcType"], context) :
                null) :
            null;

        context["field"] = "drawingReferenceNo";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingReferenceNo"] : null);
        privateState.drawingReferenceNo = defaultValues ?
            (defaultValues["drawingReferenceNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingReferenceNo"], context) :
                null) :
            null;

        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
                null) :
            null;

        context["field"] = "documentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
        privateState.documentStatus = defaultValues ?
            (defaultValues["documentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentStatus"], context) :
                null) :
            null;

        context["field"] = "drawingCreationDate";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingCreationDate"] : null);
        privateState.drawingCreationDate = defaultValues ?
            (defaultValues["drawingCreationDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingCreationDate"], context) :
                null) :
            null;

        context["field"] = "drawingCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingCurrency"] : null);
        privateState.drawingCurrency = defaultValues ?
            (defaultValues["drawingCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingCurrency"], context) :
                null) :
            null;

        context["field"] = "drawingAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingAmount"] : null);
        privateState.drawingAmount = defaultValues ?
            (defaultValues["drawingAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingAmount"], context) :
                null) :
            null;

        context["field"] = "drawingStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingStatus"] : null);
        privateState.drawingStatus = defaultValues ?
            (defaultValues["drawingStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingStatus"], context) :
                null) :
            null;

        context["field"] = "lcAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["lcAmount"] : null);
        privateState.lcAmount = defaultValues ?
            (defaultValues["lcAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcAmount"], context) :
                null) :
            null;

        context["field"] = "lcCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["lcCurrency"] : null);
        privateState.lcCurrency = defaultValues ?
            (defaultValues["lcCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcCurrency"], context) :
                null) :
            null;

        context["field"] = "lcIssueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lcIssueDate"] : null);
        privateState.lcIssueDate = defaultValues ?
            (defaultValues["lcIssueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcIssueDate"], context) :
                null) :
            null;

        context["field"] = "lcExpiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lcExpiryDate"] : null);
        privateState.lcExpiryDate = defaultValues ?
            (defaultValues["lcExpiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcExpiryDate"], context) :
                null) :
            null;

        context["field"] = "paymentTerms";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentTerms"] : null);
        privateState.paymentTerms = defaultValues ?
            (defaultValues["paymentTerms"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentTerms"], context) :
                null) :
            null;

        context["field"] = "presentorReference";
        context["metadata"] = (objectMetadata ? objectMetadata["presentorReference"] : null);
        privateState.presentorReference = defaultValues ?
            (defaultValues["presentorReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["presentorReference"], context) :
                null) :
            null;

        context["field"] = "presentorName";
        context["metadata"] = (objectMetadata ? objectMetadata["presentorName"] : null);
        privateState.presentorName = defaultValues ?
            (defaultValues["presentorName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["presentorName"], context) :
                null) :
            null;

        context["field"] = "documentsReceived";
        context["metadata"] = (objectMetadata ? objectMetadata["documentsReceived"] : null);
        privateState.documentsReceived = defaultValues ?
            (defaultValues["documentsReceived"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentsReceived"], context) :
                null) :
            null;

        context["field"] = "forwardContact";
        context["metadata"] = (objectMetadata ? objectMetadata["forwardContact"] : null);
        privateState.forwardContact = defaultValues ?
            (defaultValues["forwardContact"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["forwardContact"], context) :
                null) :
            null;

        context["field"] = "shippingGuaranteeReference";
        context["metadata"] = (objectMetadata ? objectMetadata["shippingGuaranteeReference"] : null);
        privateState.shippingGuaranteeReference = defaultValues ?
            (defaultValues["shippingGuaranteeReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["shippingGuaranteeReference"], context) :
                null) :
            null;

        context["field"] = "approvalDate";
        context["metadata"] = (objectMetadata ? objectMetadata["approvalDate"] : null);
        privateState.approvalDate = defaultValues ?
            (defaultValues["approvalDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["approvalDate"], context) :
                null) :
            null;

        context["field"] = "totalDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["totalDocuments"] : null);
        privateState.totalDocuments = defaultValues ?
            (defaultValues["totalDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalDocuments"], context) :
                null) :
            null;

        context["field"] = "documentName";
        context["metadata"] = (objectMetadata ? objectMetadata["documentName"] : null);
        privateState.documentName = defaultValues ?
            (defaultValues["documentName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentName"], context) :
                null) :
            null;

        context["field"] = "discrepancies";
        context["metadata"] = (objectMetadata ? objectMetadata["discrepancies"] : null);
        privateState.discrepancies = defaultValues ?
            (defaultValues["discrepancies"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["discrepancies"], context) :
                null) :
            null;

        context["field"] = "paymentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentStatus"] : null);
        privateState.paymentStatus = defaultValues ?
            (defaultValues["paymentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentStatus"], context) :
                null) :
            null;

        context["field"] = "rejectedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["rejectedDate"] : null);
        privateState.rejectedDate = defaultValues ?
            (defaultValues["rejectedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rejectedDate"], context) :
                null) :
            null;

        context["field"] = "totalAmountToBePaid";
        context["metadata"] = (objectMetadata ? objectMetadata["totalAmountToBePaid"] : null);
        privateState.totalAmountToBePaid = defaultValues ?
            (defaultValues["totalAmountToBePaid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalAmountToBePaid"], context) :
                null) :
            null;

        context["field"] = "accountToBeDebited";
        context["metadata"] = (objectMetadata ? objectMetadata["accountToBeDebited"] : null);
        privateState.accountToBeDebited = defaultValues ?
            (defaultValues["accountToBeDebited"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountToBeDebited"], context) :
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

        context["field"] = "totalPaidAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalPaidAmount"] : null);
        privateState.totalPaidAmount = defaultValues ?
            (defaultValues["totalPaidAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalPaidAmount"], context) :
                null) :
            null;

        context["field"] = "paymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
        privateState.paymentDate = defaultValues ?
            (defaultValues["paymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDate"], context) :
                null) :
            null;

        context["field"] = "reasonForRejection";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForRejection"] : null);
        privateState.reasonForRejection = defaultValues ?
            (defaultValues["reasonForRejection"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForRejection"], context) :
                null) :
            null;

        context["field"] = "acceptance";
        context["metadata"] = (objectMetadata ? objectMetadata["acceptance"] : null);
        privateState.acceptance = defaultValues ?
            (defaultValues["acceptance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["acceptance"], context) :
                null) :
            null;

        context["field"] = "messageType";
        context["metadata"] = (objectMetadata ? objectMetadata["messageType"] : null);
        privateState.messageType = defaultValues ?
            (defaultValues["messageType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageType"], context) :
                null) :
            null;

        context["field"] = "deliveryDestination";
        context["metadata"] = (objectMetadata ? objectMetadata["deliveryDestination"] : null);
        privateState.deliveryDestination = defaultValues ?
            (defaultValues["deliveryDestination"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deliveryDestination"], context) :
                null) :
            null;

        context["field"] = "messageDate";
        context["metadata"] = (objectMetadata ? objectMetadata["messageDate"] : null);
        privateState.messageDate = defaultValues ?
            (defaultValues["messageDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageDate"], context) :
                null) :
            null;

        context["field"] = "messageCategory";
        context["metadata"] = (objectMetadata ? objectMetadata["messageCategory"] : null);
        privateState.messageCategory = defaultValues ?
            (defaultValues["messageCategory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageCategory"], context) :
                null) :
            null;

        context["field"] = "lcSrmsReqOrderID";
        context["metadata"] = (objectMetadata ? objectMetadata["lcSrmsReqOrderID"] : null);
        privateState.lcSrmsReqOrderID = defaultValues ?
            (defaultValues["lcSrmsReqOrderID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcSrmsReqOrderID"], context) :
                null) :
            null;

        context["field"] = "drawingsSrmsReqOrderID";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingsSrmsReqOrderID"] : null);
        privateState.drawingsSrmsReqOrderID = defaultValues ?
            (defaultValues["drawingsSrmsReqOrderID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingsSrmsReqOrderID"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "lcReferenceNo": {
                get: function() {
                    context["field"] = "lcReferenceNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcReferenceNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcReferenceNo, context);
                },
                set: function(val) {
                    setterFunctions['lcReferenceNo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcType": {
                get: function() {
                    context["field"] = "lcType";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcType, context);
                },
                set: function(val) {
                    setterFunctions['lcType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawingReferenceNo": {
                get: function() {
                    context["field"] = "drawingReferenceNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingReferenceNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingReferenceNo, context);
                },
                set: function(val) {
                    setterFunctions['drawingReferenceNo'].call(this, val, privateState);
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
            "documentStatus": {
                get: function() {
                    context["field"] = "documentStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentStatus, context);
                },
                set: function(val) {
                    setterFunctions['documentStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawingCreationDate": {
                get: function() {
                    context["field"] = "drawingCreationDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingCreationDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingCreationDate, context);
                },
                set: function(val) {
                    setterFunctions['drawingCreationDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawingCurrency": {
                get: function() {
                    context["field"] = "drawingCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingCurrency, context);
                },
                set: function(val) {
                    setterFunctions['drawingCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawingAmount": {
                get: function() {
                    context["field"] = "drawingAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingAmount, context);
                },
                set: function(val) {
                    setterFunctions['drawingAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawingStatus": {
                get: function() {
                    context["field"] = "drawingStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingStatus, context);
                },
                set: function(val) {
                    setterFunctions['drawingStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcAmount": {
                get: function() {
                    context["field"] = "lcAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcAmount, context);
                },
                set: function(val) {
                    setterFunctions['lcAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcCurrency": {
                get: function() {
                    context["field"] = "lcCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcCurrency, context);
                },
                set: function(val) {
                    setterFunctions['lcCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcIssueDate": {
                get: function() {
                    context["field"] = "lcIssueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcIssueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcIssueDate, context);
                },
                set: function(val) {
                    setterFunctions['lcIssueDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcExpiryDate": {
                get: function() {
                    context["field"] = "lcExpiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcExpiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcExpiryDate, context);
                },
                set: function(val) {
                    setterFunctions['lcExpiryDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentTerms": {
                get: function() {
                    context["field"] = "paymentTerms";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentTerms"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentTerms, context);
                },
                set: function(val) {
                    setterFunctions['paymentTerms'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "presentorReference": {
                get: function() {
                    context["field"] = "presentorReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["presentorReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.presentorReference, context);
                },
                set: function(val) {
                    setterFunctions['presentorReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "presentorName": {
                get: function() {
                    context["field"] = "presentorName";
                    context["metadata"] = (objectMetadata ? objectMetadata["presentorName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.presentorName, context);
                },
                set: function(val) {
                    setterFunctions['presentorName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentsReceived": {
                get: function() {
                    context["field"] = "documentsReceived";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentsReceived"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentsReceived, context);
                },
                set: function(val) {
                    setterFunctions['documentsReceived'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "forwardContact": {
                get: function() {
                    context["field"] = "forwardContact";
                    context["metadata"] = (objectMetadata ? objectMetadata["forwardContact"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.forwardContact, context);
                },
                set: function(val) {
                    setterFunctions['forwardContact'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "shippingGuaranteeReference": {
                get: function() {
                    context["field"] = "shippingGuaranteeReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["shippingGuaranteeReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.shippingGuaranteeReference, context);
                },
                set: function(val) {
                    setterFunctions['shippingGuaranteeReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "approvalDate": {
                get: function() {
                    context["field"] = "approvalDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["approvalDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.approvalDate, context);
                },
                set: function(val) {
                    setterFunctions['approvalDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalDocuments": {
                get: function() {
                    context["field"] = "totalDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalDocuments, context);
                },
                set: function(val) {
                    setterFunctions['totalDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentName": {
                get: function() {
                    context["field"] = "documentName";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentName, context);
                },
                set: function(val) {
                    setterFunctions['documentName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "discrepancies": {
                get: function() {
                    context["field"] = "discrepancies";
                    context["metadata"] = (objectMetadata ? objectMetadata["discrepancies"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.discrepancies, context);
                },
                set: function(val) {
                    setterFunctions['discrepancies'].call(this, val, privateState);
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
            "rejectedDate": {
                get: function() {
                    context["field"] = "rejectedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["rejectedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rejectedDate, context);
                },
                set: function(val) {
                    setterFunctions['rejectedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalAmountToBePaid": {
                get: function() {
                    context["field"] = "totalAmountToBePaid";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalAmountToBePaid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalAmountToBePaid, context);
                },
                set: function(val) {
                    setterFunctions['totalAmountToBePaid'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountToBeDebited": {
                get: function() {
                    context["field"] = "accountToBeDebited";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountToBeDebited"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountToBeDebited, context);
                },
                set: function(val) {
                    setterFunctions['accountToBeDebited'].call(this, val, privateState);
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
            "totalPaidAmount": {
                get: function() {
                    context["field"] = "totalPaidAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalPaidAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalPaidAmount, context);
                },
                set: function(val) {
                    setterFunctions['totalPaidAmount'].call(this, val, privateState);
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
            "acceptance": {
                get: function() {
                    context["field"] = "acceptance";
                    context["metadata"] = (objectMetadata ? objectMetadata["acceptance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.acceptance, context);
                },
                set: function(val) {
                    setterFunctions['acceptance'].call(this, val, privateState);
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
            "deliveryDestination": {
                get: function() {
                    context["field"] = "deliveryDestination";
                    context["metadata"] = (objectMetadata ? objectMetadata["deliveryDestination"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deliveryDestination, context);
                },
                set: function(val) {
                    setterFunctions['deliveryDestination'].call(this, val, privateState);
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
            "messageCategory": {
                get: function() {
                    context["field"] = "messageCategory";
                    context["metadata"] = (objectMetadata ? objectMetadata["messageCategory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messageCategory, context);
                },
                set: function(val) {
                    setterFunctions['messageCategory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcSrmsReqOrderID": {
                get: function() {
                    context["field"] = "lcSrmsReqOrderID";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcSrmsReqOrderID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcSrmsReqOrderID, context);
                },
                set: function(val) {
                    setterFunctions['lcSrmsReqOrderID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawingsSrmsReqOrderID": {
                get: function() {
                    context["field"] = "drawingsSrmsReqOrderID";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingsSrmsReqOrderID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingsSrmsReqOrderID, context);
                },
                set: function(val) {
                    setterFunctions['drawingsSrmsReqOrderID'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.lcReferenceNo = value ? (value["lcReferenceNo"] ? value["lcReferenceNo"] : null) : null;
            privateState.lcType = value ? (value["lcType"] ? value["lcType"] : null) : null;
            privateState.drawingReferenceNo = value ? (value["drawingReferenceNo"] ? value["drawingReferenceNo"] : null) : null;
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.documentStatus = value ? (value["documentStatus"] ? value["documentStatus"] : null) : null;
            privateState.drawingCreationDate = value ? (value["drawingCreationDate"] ? value["drawingCreationDate"] : null) : null;
            privateState.drawingCurrency = value ? (value["drawingCurrency"] ? value["drawingCurrency"] : null) : null;
            privateState.drawingAmount = value ? (value["drawingAmount"] ? value["drawingAmount"] : null) : null;
            privateState.drawingStatus = value ? (value["drawingStatus"] ? value["drawingStatus"] : null) : null;
            privateState.lcAmount = value ? (value["lcAmount"] ? value["lcAmount"] : null) : null;
            privateState.lcCurrency = value ? (value["lcCurrency"] ? value["lcCurrency"] : null) : null;
            privateState.lcIssueDate = value ? (value["lcIssueDate"] ? value["lcIssueDate"] : null) : null;
            privateState.lcExpiryDate = value ? (value["lcExpiryDate"] ? value["lcExpiryDate"] : null) : null;
            privateState.paymentTerms = value ? (value["paymentTerms"] ? value["paymentTerms"] : null) : null;
            privateState.presentorReference = value ? (value["presentorReference"] ? value["presentorReference"] : null) : null;
            privateState.presentorName = value ? (value["presentorName"] ? value["presentorName"] : null) : null;
            privateState.documentsReceived = value ? (value["documentsReceived"] ? value["documentsReceived"] : null) : null;
            privateState.forwardContact = value ? (value["forwardContact"] ? value["forwardContact"] : null) : null;
            privateState.shippingGuaranteeReference = value ? (value["shippingGuaranteeReference"] ? value["shippingGuaranteeReference"] : null) : null;
            privateState.approvalDate = value ? (value["approvalDate"] ? value["approvalDate"] : null) : null;
            privateState.totalDocuments = value ? (value["totalDocuments"] ? value["totalDocuments"] : null) : null;
            privateState.documentName = value ? (value["documentName"] ? value["documentName"] : null) : null;
            privateState.discrepancies = value ? (value["discrepancies"] ? value["discrepancies"] : null) : null;
            privateState.paymentStatus = value ? (value["paymentStatus"] ? value["paymentStatus"] : null) : null;
            privateState.rejectedDate = value ? (value["rejectedDate"] ? value["rejectedDate"] : null) : null;
            privateState.totalAmountToBePaid = value ? (value["totalAmountToBePaid"] ? value["totalAmountToBePaid"] : null) : null;
            privateState.accountToBeDebited = value ? (value["accountToBeDebited"] ? value["accountToBeDebited"] : null) : null;
            privateState.messageFromBank = value ? (value["messageFromBank"] ? value["messageFromBank"] : null) : null;
            privateState.messageToBank = value ? (value["messageToBank"] ? value["messageToBank"] : null) : null;
            privateState.totalPaidAmount = value ? (value["totalPaidAmount"] ? value["totalPaidAmount"] : null) : null;
            privateState.paymentDate = value ? (value["paymentDate"] ? value["paymentDate"] : null) : null;
            privateState.reasonForRejection = value ? (value["reasonForRejection"] ? value["reasonForRejection"] : null) : null;
            privateState.acceptance = value ? (value["acceptance"] ? value["acceptance"] : null) : null;
            privateState.messageType = value ? (value["messageType"] ? value["messageType"] : null) : null;
            privateState.deliveryDestination = value ? (value["deliveryDestination"] ? value["deliveryDestination"] : null) : null;
            privateState.messageDate = value ? (value["messageDate"] ? value["messageDate"] : null) : null;
            privateState.messageCategory = value ? (value["messageCategory"] ? value["messageCategory"] : null) : null;
            privateState.lcSrmsReqOrderID = value ? (value["lcSrmsReqOrderID"] ? value["lcSrmsReqOrderID"] : null) : null;
            privateState.drawingsSrmsReqOrderID = value ? (value["drawingsSrmsReqOrderID"] ? value["drawingsSrmsReqOrderID"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(LCImportDrawing);

    //Create new class level validator object
    BaseModel.Validator.call(LCImportDrawing);

    var registerValidatorBackup = LCImportDrawing.registerValidator;

    LCImportDrawing.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(LCImportDrawing.isValid(this, propName, val)) {
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
    //For Operation 'submitImportLCDrawing' with service id 'submitImportLCDrawing2934'
     LCImportDrawing.submitImportLCDrawing = function(params, onCompletion){
        return LCImportDrawing.customVerb('submitImportLCDrawing', params, onCompletion);
     };

    //For Operation 'createImportLCDrawing' with service id 'createImportLCDrawing9875'
     LCImportDrawing.createImportLCDrawing = function(params, onCompletion){
        return LCImportDrawing.customVerb('createImportLCDrawing', params, onCompletion);
     };

    //For Operation 'getImportLCDrawings' with service id 'getImportLCDrawings6356'
     LCImportDrawing.getImportLCDrawings = function(params, onCompletion){
        return LCImportDrawing.customVerb('getImportLCDrawings', params, onCompletion);
     };

    //For Operation 'getImportLCDrawingById' with service id 'getImportLCDrawingById5582'
     LCImportDrawing.getImportLCDrawingById = function(params, onCompletion){
        return LCImportDrawing.customVerb('getImportLCDrawingById', params, onCompletion);
     };

    //For Operation 'updateImportLCDrawingByBank' with service id 'UpdateImportLCDrawingByBank9761'
     LCImportDrawing.updateImportLCDrawingByBank = function(params, onCompletion){
        return LCImportDrawing.customVerb('updateImportLCDrawingByBank', params, onCompletion);
     };

    var relations = [];

    LCImportDrawing.relations = relations;

    LCImportDrawing.prototype.isValid = function() {
        return LCImportDrawing.isValid(this);
    };

    LCImportDrawing.prototype.objModelName = "LCImportDrawing";
    LCImportDrawing.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    LCImportDrawing.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "LCImportDrawing", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    LCImportDrawing.clone = function(objectToClone) {
        var clonedObj = new LCImportDrawing();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return LCImportDrawing;
});