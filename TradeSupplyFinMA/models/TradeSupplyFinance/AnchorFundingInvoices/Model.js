/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "AnchorFundingInvoices", "objectService" : "TradeSupplyFinance"};

    var setterFunctions = {
        billReference: function(val, state) {
            context["field"] = "billReference";
            context["metadata"] = (objectMetadata ? objectMetadata["billReference"] : null);
            state['billReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billType: function(val, state) {
            context["field"] = "billType";
            context["metadata"] = (objectMetadata ? objectMetadata["billType"] : null);
            state['billType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        buyerId: function(val, state) {
            context["field"] = "buyerId";
            context["metadata"] = (objectMetadata ? objectMetadata["buyerId"] : null);
            state['buyerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        buyerName: function(val, state) {
            context["field"] = "buyerName";
            context["metadata"] = (objectMetadata ? objectMetadata["buyerName"] : null);
            state['buyerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdDate: function(val, state) {
            context["field"] = "createdDate";
            context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
            state['createdDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        invoiceAmount: function(val, state) {
            context["field"] = "invoiceAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["invoiceAmount"] : null);
            state['invoiceAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        invoiceCurrency: function(val, state) {
            context["field"] = "invoiceCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["invoiceCurrency"] : null);
            state['invoiceCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        invoiceDocuments: function(val, state) {
            context["field"] = "invoiceDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["invoiceDocuments"] : null);
            state['invoiceDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        invoiceReference: function(val, state) {
            context["field"] = "invoiceReference";
            context["metadata"] = (objectMetadata ? objectMetadata["invoiceReference"] : null);
            state['invoiceReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issueDate: function(val, state) {
            context["field"] = "issueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
            state['issueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maturityDate: function(val, state) {
            context["field"] = "maturityDate";
            context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
            state['maturityDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        role: function(val, state) {
            context["field"] = "role";
            context["metadata"] = (objectMetadata ? objectMetadata["role"] : null);
            state['role'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supplierId: function(val, state) {
            context["field"] = "supplierId";
            context["metadata"] = (objectMetadata ? objectMetadata["supplierId"] : null);
            state['supplierId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supplierName: function(val, state) {
            context["field"] = "supplierName";
            context["metadata"] = (objectMetadata ? objectMetadata["supplierName"] : null);
            state['supplierName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        updatedDate: function(val, state) {
            context["field"] = "updatedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
            state['updatedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        uploadedFrom: function(val, state) {
            context["field"] = "uploadedFrom";
            context["metadata"] = (objectMetadata ? objectMetadata["uploadedFrom"] : null);
            state['uploadedFrom'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        invoiceReferences: function(val, state) {
            context["field"] = "invoiceReferences";
            context["metadata"] = (objectMetadata ? objectMetadata["invoiceReferences"] : null);
            state['invoiceReferences'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        base64Input: function(val, state) {
            context["field"] = "base64Input";
            context["metadata"] = (objectMetadata ? objectMetadata["base64Input"] : null);
            state['base64Input'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        failedInvoiceIds: function(val, state) {
            context["field"] = "failedInvoiceIds";
            context["metadata"] = (objectMetadata ? objectMetadata["failedInvoiceIds"] : null);
            state['failedInvoiceIds'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyId: function(val, state) {
            context["field"] = "partyId";
            context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
            state['partyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyName: function(val, state) {
            context["field"] = "partyName";
            context["metadata"] = (objectMetadata ? objectMetadata["partyName"] : null);
            state['partyName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        counterPartyRole: function(val, state) {
            context["field"] = "counterPartyRole";
            context["metadata"] = (objectMetadata ? objectMetadata["counterPartyRole"] : null);
            state['counterPartyRole'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyDet: function(val, state) {
            context["field"] = "partyDet";
            context["metadata"] = (objectMetadata ? objectMetadata["partyDet"] : null);
            state['partyDet'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        parties: function(val, state) {
            context["field"] = "parties";
            context["metadata"] = (objectMetadata ? objectMetadata["parties"] : null);
            state['parties'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        financingDate: function(val, state) {
            context["field"] = "financingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["financingDate"] : null);
            state['financingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function AnchorFundingInvoices(defaultValues) {
        var privateState = {};
        context["field"] = "billReference";
        context["metadata"] = (objectMetadata ? objectMetadata["billReference"] : null);
        privateState.billReference = defaultValues ?
            (defaultValues["billReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billReference"], context) :
                null) :
            null;

        context["field"] = "billType";
        context["metadata"] = (objectMetadata ? objectMetadata["billType"] : null);
        privateState.billType = defaultValues ?
            (defaultValues["billType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billType"], context) :
                null) :
            null;

        context["field"] = "buyerId";
        context["metadata"] = (objectMetadata ? objectMetadata["buyerId"] : null);
        privateState.buyerId = defaultValues ?
            (defaultValues["buyerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["buyerId"], context) :
                null) :
            null;

        context["field"] = "buyerName";
        context["metadata"] = (objectMetadata ? objectMetadata["buyerName"] : null);
        privateState.buyerName = defaultValues ?
            (defaultValues["buyerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["buyerName"], context) :
                null) :
            null;

        context["field"] = "createdDate";
        context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
        privateState.createdDate = defaultValues ?
            (defaultValues["createdDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdDate"], context) :
                null) :
            null;

        context["field"] = "invoiceAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["invoiceAmount"] : null);
        privateState.invoiceAmount = defaultValues ?
            (defaultValues["invoiceAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["invoiceAmount"], context) :
                null) :
            null;

        context["field"] = "invoiceCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["invoiceCurrency"] : null);
        privateState.invoiceCurrency = defaultValues ?
            (defaultValues["invoiceCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["invoiceCurrency"], context) :
                null) :
            null;

        context["field"] = "invoiceDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["invoiceDocuments"] : null);
        privateState.invoiceDocuments = defaultValues ?
            (defaultValues["invoiceDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["invoiceDocuments"], context) :
                null) :
            null;

        context["field"] = "invoiceReference";
        context["metadata"] = (objectMetadata ? objectMetadata["invoiceReference"] : null);
        privateState.invoiceReference = defaultValues ?
            (defaultValues["invoiceReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["invoiceReference"], context) :
                null) :
            null;

        context["field"] = "issueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
        privateState.issueDate = defaultValues ?
            (defaultValues["issueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issueDate"], context) :
                null) :
            null;

        context["field"] = "maturityDate";
        context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
        privateState.maturityDate = defaultValues ?
            (defaultValues["maturityDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maturityDate"], context) :
                null) :
            null;

        context["field"] = "role";
        context["metadata"] = (objectMetadata ? objectMetadata["role"] : null);
        privateState.role = defaultValues ?
            (defaultValues["role"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["role"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "supplierId";
        context["metadata"] = (objectMetadata ? objectMetadata["supplierId"] : null);
        privateState.supplierId = defaultValues ?
            (defaultValues["supplierId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supplierId"], context) :
                null) :
            null;

        context["field"] = "supplierName";
        context["metadata"] = (objectMetadata ? objectMetadata["supplierName"] : null);
        privateState.supplierName = defaultValues ?
            (defaultValues["supplierName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supplierName"], context) :
                null) :
            null;

        context["field"] = "updatedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
        privateState.updatedDate = defaultValues ?
            (defaultValues["updatedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["updatedDate"], context) :
                null) :
            null;

        context["field"] = "uploadedFrom";
        context["metadata"] = (objectMetadata ? objectMetadata["uploadedFrom"] : null);
        privateState.uploadedFrom = defaultValues ?
            (defaultValues["uploadedFrom"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["uploadedFrom"], context) :
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

        context["field"] = "invoiceReferences";
        context["metadata"] = (objectMetadata ? objectMetadata["invoiceReferences"] : null);
        privateState.invoiceReferences = defaultValues ?
            (defaultValues["invoiceReferences"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["invoiceReferences"], context) :
                null) :
            null;

        context["field"] = "base64Input";
        context["metadata"] = (objectMetadata ? objectMetadata["base64Input"] : null);
        privateState.base64Input = defaultValues ?
            (defaultValues["base64Input"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["base64Input"], context) :
                null) :
            null;

        context["field"] = "failedInvoiceIds";
        context["metadata"] = (objectMetadata ? objectMetadata["failedInvoiceIds"] : null);
        privateState.failedInvoiceIds = defaultValues ?
            (defaultValues["failedInvoiceIds"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["failedInvoiceIds"], context) :
                null) :
            null;

        context["field"] = "partyId";
        context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
        privateState.partyId = defaultValues ?
            (defaultValues["partyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyId"], context) :
                null) :
            null;

        context["field"] = "partyName";
        context["metadata"] = (objectMetadata ? objectMetadata["partyName"] : null);
        privateState.partyName = defaultValues ?
            (defaultValues["partyName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyName"], context) :
                null) :
            null;

        context["field"] = "counterPartyRole";
        context["metadata"] = (objectMetadata ? objectMetadata["counterPartyRole"] : null);
        privateState.counterPartyRole = defaultValues ?
            (defaultValues["counterPartyRole"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["counterPartyRole"], context) :
                null) :
            null;

        context["field"] = "partyDet";
        context["metadata"] = (objectMetadata ? objectMetadata["partyDet"] : null);
        privateState.partyDet = defaultValues ?
            (defaultValues["partyDet"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyDet"], context) :
                null) :
            null;

        context["field"] = "parties";
        context["metadata"] = (objectMetadata ? objectMetadata["parties"] : null);
        privateState.parties = defaultValues ?
            (defaultValues["parties"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["parties"], context) :
                null) :
            null;

        context["field"] = "financingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["financingDate"] : null);
        privateState.financingDate = defaultValues ?
            (defaultValues["financingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["financingDate"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "billReference": {
                get: function() {
                    context["field"] = "billReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["billReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billReference, context);
                },
                set: function(val) {
                    setterFunctions['billReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "billType": {
                get: function() {
                    context["field"] = "billType";
                    context["metadata"] = (objectMetadata ? objectMetadata["billType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billType, context);
                },
                set: function(val) {
                    setterFunctions['billType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "buyerId": {
                get: function() {
                    context["field"] = "buyerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["buyerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.buyerId, context);
                },
                set: function(val) {
                    setterFunctions['buyerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "buyerName": {
                get: function() {
                    context["field"] = "buyerName";
                    context["metadata"] = (objectMetadata ? objectMetadata["buyerName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.buyerName, context);
                },
                set: function(val) {
                    setterFunctions['buyerName'].call(this, val, privateState);
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
            "invoiceAmount": {
                get: function() {
                    context["field"] = "invoiceAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["invoiceAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.invoiceAmount, context);
                },
                set: function(val) {
                    setterFunctions['invoiceAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "invoiceCurrency": {
                get: function() {
                    context["field"] = "invoiceCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["invoiceCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.invoiceCurrency, context);
                },
                set: function(val) {
                    setterFunctions['invoiceCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "invoiceDocuments": {
                get: function() {
                    context["field"] = "invoiceDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["invoiceDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.invoiceDocuments, context);
                },
                set: function(val) {
                    setterFunctions['invoiceDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "invoiceReference": {
                get: function() {
                    context["field"] = "invoiceReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["invoiceReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.invoiceReference, context);
                },
                set: function(val) {
                    setterFunctions['invoiceReference'].call(this, val, privateState);
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
            "role": {
                get: function() {
                    context["field"] = "role";
                    context["metadata"] = (objectMetadata ? objectMetadata["role"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.role, context);
                },
                set: function(val) {
                    setterFunctions['role'].call(this, val, privateState);
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
            "supplierId": {
                get: function() {
                    context["field"] = "supplierId";
                    context["metadata"] = (objectMetadata ? objectMetadata["supplierId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supplierId, context);
                },
                set: function(val) {
                    setterFunctions['supplierId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "supplierName": {
                get: function() {
                    context["field"] = "supplierName";
                    context["metadata"] = (objectMetadata ? objectMetadata["supplierName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supplierName, context);
                },
                set: function(val) {
                    setterFunctions['supplierName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "updatedDate": {
                get: function() {
                    context["field"] = "updatedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.updatedDate, context);
                },
                set: function(val) {
                    setterFunctions['updatedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "uploadedFrom": {
                get: function() {
                    context["field"] = "uploadedFrom";
                    context["metadata"] = (objectMetadata ? objectMetadata["uploadedFrom"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.uploadedFrom, context);
                },
                set: function(val) {
                    setterFunctions['uploadedFrom'].call(this, val, privateState);
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
            "invoiceReferences": {
                get: function() {
                    context["field"] = "invoiceReferences";
                    context["metadata"] = (objectMetadata ? objectMetadata["invoiceReferences"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.invoiceReferences, context);
                },
                set: function(val) {
                    setterFunctions['invoiceReferences'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "base64Input": {
                get: function() {
                    context["field"] = "base64Input";
                    context["metadata"] = (objectMetadata ? objectMetadata["base64Input"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.base64Input, context);
                },
                set: function(val) {
                    setterFunctions['base64Input'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "failedInvoiceIds": {
                get: function() {
                    context["field"] = "failedInvoiceIds";
                    context["metadata"] = (objectMetadata ? objectMetadata["failedInvoiceIds"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.failedInvoiceIds, context);
                },
                set: function(val) {
                    setterFunctions['failedInvoiceIds'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyId": {
                get: function() {
                    context["field"] = "partyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyId, context);
                },
                set: function(val) {
                    setterFunctions['partyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyName": {
                get: function() {
                    context["field"] = "partyName";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyName, context);
                },
                set: function(val) {
                    setterFunctions['partyName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "counterPartyRole": {
                get: function() {
                    context["field"] = "counterPartyRole";
                    context["metadata"] = (objectMetadata ? objectMetadata["counterPartyRole"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.counterPartyRole, context);
                },
                set: function(val) {
                    setterFunctions['counterPartyRole'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyDet": {
                get: function() {
                    context["field"] = "partyDet";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyDet"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyDet, context);
                },
                set: function(val) {
                    setterFunctions['partyDet'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "parties": {
                get: function() {
                    context["field"] = "parties";
                    context["metadata"] = (objectMetadata ? objectMetadata["parties"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.parties, context);
                },
                set: function(val) {
                    setterFunctions['parties'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "financingDate": {
                get: function() {
                    context["field"] = "financingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["financingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.financingDate, context);
                },
                set: function(val) {
                    setterFunctions['financingDate'].call(this, val, privateState);
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
            privateState.billReference = value ? (value["billReference"] ? value["billReference"] : null) : null;
            privateState.billType = value ? (value["billType"] ? value["billType"] : null) : null;
            privateState.buyerId = value ? (value["buyerId"] ? value["buyerId"] : null) : null;
            privateState.buyerName = value ? (value["buyerName"] ? value["buyerName"] : null) : null;
            privateState.createdDate = value ? (value["createdDate"] ? value["createdDate"] : null) : null;
            privateState.invoiceAmount = value ? (value["invoiceAmount"] ? value["invoiceAmount"] : null) : null;
            privateState.invoiceCurrency = value ? (value["invoiceCurrency"] ? value["invoiceCurrency"] : null) : null;
            privateState.invoiceDocuments = value ? (value["invoiceDocuments"] ? value["invoiceDocuments"] : null) : null;
            privateState.invoiceReference = value ? (value["invoiceReference"] ? value["invoiceReference"] : null) : null;
            privateState.issueDate = value ? (value["issueDate"] ? value["issueDate"] : null) : null;
            privateState.maturityDate = value ? (value["maturityDate"] ? value["maturityDate"] : null) : null;
            privateState.role = value ? (value["role"] ? value["role"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.supplierId = value ? (value["supplierId"] ? value["supplierId"] : null) : null;
            privateState.supplierName = value ? (value["supplierName"] ? value["supplierName"] : null) : null;
            privateState.updatedDate = value ? (value["updatedDate"] ? value["updatedDate"] : null) : null;
            privateState.uploadedFrom = value ? (value["uploadedFrom"] ? value["uploadedFrom"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.invoiceReferences = value ? (value["invoiceReferences"] ? value["invoiceReferences"] : null) : null;
            privateState.base64Input = value ? (value["base64Input"] ? value["base64Input"] : null) : null;
            privateState.failedInvoiceIds = value ? (value["failedInvoiceIds"] ? value["failedInvoiceIds"] : null) : null;
            privateState.partyId = value ? (value["partyId"] ? value["partyId"] : null) : null;
            privateState.partyName = value ? (value["partyName"] ? value["partyName"] : null) : null;
            privateState.counterPartyRole = value ? (value["counterPartyRole"] ? value["counterPartyRole"] : null) : null;
            privateState.partyDet = value ? (value["partyDet"] ? value["partyDet"] : null) : null;
            privateState.parties = value ? (value["parties"] ? value["parties"] : null) : null;
            privateState.financingDate = value ? (value["financingDate"] ? value["financingDate"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(AnchorFundingInvoices);

    //Create new class level validator object
    BaseModel.Validator.call(AnchorFundingInvoices);

    var registerValidatorBackup = AnchorFundingInvoices.registerValidator;

    AnchorFundingInvoices.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(AnchorFundingInvoices.isValid(this, propName, val)) {
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
    //For Operation 'SubmitAll' with service id 'SubmitAnchorFundingInvoices3972'
     AnchorFundingInvoices.SubmitAll = function(params, onCompletion){
        return AnchorFundingInvoices.customVerb('SubmitAll', params, onCompletion);
     };

    //For Operation 'Reject' with service id 'RejectAnchorInvoices1442'
     AnchorFundingInvoices.Reject = function(params, onCompletion){
        return AnchorFundingInvoices.customVerb('Reject', params, onCompletion);
     };

    //For Operation 'GetLiveInvoices' with service id 'GetInvoiceCapture2018'
     AnchorFundingInvoices.GetLiveInvoices = function(params, onCompletion){
        return AnchorFundingInvoices.customVerb('GetLiveInvoices', params, onCompletion);
     };

    //For Operation 'ParseBulkUploadedXlsx' with service id 'ParseBulkUploadedXlsxOperation7141'
     AnchorFundingInvoices.ParseBulkUploadedXlsx = function(params, onCompletion){
        return AnchorFundingInvoices.customVerb('ParseBulkUploadedXlsx', params, onCompletion);
     };

    //For Operation 'DownloadSampleXlsx' with service id 'DownloadSampleXlsxOperation6394'
     AnchorFundingInvoices.DownloadSampleXlsx = function(params, onCompletion){
        return AnchorFundingInvoices.customVerb('DownloadSampleXlsx', params, onCompletion);
     };

    //For Operation 'GetAll' with service id 'GetAllFundingInvoicesOperation5523'
     AnchorFundingInvoices.GetAll = function(params, onCompletion){
        return AnchorFundingInvoices.customVerb('GetAll', params, onCompletion);
     };

    //For Operation 'Save' with service id 'SaveFundingInvoiceOperation7985'
     AnchorFundingInvoices.Save = function(params, onCompletion){
        return AnchorFundingInvoices.customVerb('Save', params, onCompletion);
     };

    //For Operation 'CreateBulkInvoices' with service id 'CreateBulkInvoices3024'
     AnchorFundingInvoices.CreateBulkInvoices = function(params, onCompletion){
        return AnchorFundingInvoices.customVerb('CreateBulkInvoices', params, onCompletion);
     };

    //For Operation 'Approve' with service id 'ApproveAnchorInvoiceOperation7798'
     AnchorFundingInvoices.Approve = function(params, onCompletion){
        return AnchorFundingInvoices.customVerb('Approve', params, onCompletion);
     };

    var relations = [];

    AnchorFundingInvoices.relations = relations;

    AnchorFundingInvoices.prototype.isValid = function() {
        return AnchorFundingInvoices.isValid(this);
    };

    AnchorFundingInvoices.prototype.objModelName = "AnchorFundingInvoices";
    AnchorFundingInvoices.prototype.objServiceName = "TradeSupplyFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    AnchorFundingInvoices.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeSupplyFinance", "AnchorFundingInvoices", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    AnchorFundingInvoices.clone = function(objectToClone) {
        var clonedObj = new AnchorFundingInvoices();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return AnchorFundingInvoices;
});