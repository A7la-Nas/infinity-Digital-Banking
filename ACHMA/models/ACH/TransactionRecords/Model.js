/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "TransactionRecords", "objectService" : "ACH"};

    var setterFunctions = {
        AdditionalInfo: function(val, state) {
            context["field"] = "AdditionalInfo";
            context["metadata"] = (objectMetadata ? objectMetadata["AdditionalInfo"] : null);
            state['AdditionalInfo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ToAccountType: function(val, state) {
            context["field"] = "ToAccountType";
            context["metadata"] = (objectMetadata ? objectMetadata["ToAccountType"] : null);
            state['ToAccountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Transaction_id: function(val, state) {
            context["field"] = "Transaction_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Transaction_id"] : null);
            state['Transaction_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ABATRCNumber: function(val, state) {
            context["field"] = "ABATRCNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["ABATRCNumber"] : null);
            state['ABATRCNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TransactionRecord_id: function(val, state) {
            context["field"] = "TransactionRecord_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TransactionRecord_id"] : null);
            state['TransactionRecord_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Amount: function(val, state) {
            context["field"] = "Amount";
            context["metadata"] = (objectMetadata ? objectMetadata["Amount"] : null);
            state['Amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Record_Name: function(val, state) {
            context["field"] = "Record_Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Record_Name"] : null);
            state['Record_Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ToAccountNumber: function(val, state) {
            context["field"] = "ToAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["ToAccountNumber"] : null);
            state['ToAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Detail_id: function(val, state) {
            context["field"] = "Detail_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Detail_id"] : null);
            state['Detail_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IsZeroTaxDue: function(val, state) {
            context["field"] = "IsZeroTaxDue";
            context["metadata"] = (objectMetadata ? objectMetadata["IsZeroTaxDue"] : null);
            state['IsZeroTaxDue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TaxType: function(val, state) {
            context["field"] = "TaxType";
            context["metadata"] = (objectMetadata ? objectMetadata["TaxType"] : null);
            state['TaxType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EIN: function(val, state) {
            context["field"] = "EIN";
            context["metadata"] = (objectMetadata ? objectMetadata["EIN"] : null);
            state['EIN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        SubTaxCategory: function(val, state) {
            context["field"] = "SubTaxCategory";
            context["metadata"] = (objectMetadata ? objectMetadata["SubTaxCategory"] : null);
            state['SubTaxCategory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EffectiveDate: function(val, state) {
            context["field"] = "EffectiveDate";
            context["metadata"] = (objectMetadata ? objectMetadata["EffectiveDate"] : null);
            state['EffectiveDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TemplateRequestTypeValue: function(val, state) {
            context["field"] = "TemplateRequestTypeValue";
            context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeValue"] : null);
            state['TemplateRequestTypeValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ToAccountTypeValue: function(val, state) {
            context["field"] = "ToAccountTypeValue";
            context["metadata"] = (objectMetadata ? objectMetadata["ToAccountTypeValue"] : null);
            state['ToAccountTypeValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TaxType_id: function(val, state) {
            context["field"] = "TaxType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TaxType_id"] : null);
            state['TaxType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ToAccountType_id: function(val, state) {
            context["field"] = "ToAccountType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["ToAccountType_id"] : null);
            state['ToAccountType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    };

    //Create the Model Class
    function TransactionRecords(defaultValues) {
        var privateState = {};
        context["field"] = "AdditionalInfo";
        context["metadata"] = (objectMetadata ? objectMetadata["AdditionalInfo"] : null);
        privateState.AdditionalInfo = defaultValues ?
            (defaultValues["AdditionalInfo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["AdditionalInfo"], context) :
                null) :
            null;

        context["field"] = "ToAccountType";
        context["metadata"] = (objectMetadata ? objectMetadata["ToAccountType"] : null);
        privateState.ToAccountType = defaultValues ?
            (defaultValues["ToAccountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ToAccountType"], context) :
                null) :
            null;

        context["field"] = "Transaction_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Transaction_id"] : null);
        privateState.Transaction_id = defaultValues ?
            (defaultValues["Transaction_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Transaction_id"], context) :
                null) :
            null;

        context["field"] = "ABATRCNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["ABATRCNumber"] : null);
        privateState.ABATRCNumber = defaultValues ?
            (defaultValues["ABATRCNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ABATRCNumber"], context) :
                null) :
            null;

        context["field"] = "TransactionRecord_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TransactionRecord_id"] : null);
        privateState.TransactionRecord_id = defaultValues ?
            (defaultValues["TransactionRecord_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransactionRecord_id"], context) :
                null) :
            null;

        context["field"] = "Amount";
        context["metadata"] = (objectMetadata ? objectMetadata["Amount"] : null);
        privateState.Amount = defaultValues ?
            (defaultValues["Amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Amount"], context) :
                null) :
            null;

        context["field"] = "Record_Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Record_Name"] : null);
        privateState.Record_Name = defaultValues ?
            (defaultValues["Record_Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Record_Name"], context) :
                null) :
            null;

        context["field"] = "ToAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["ToAccountNumber"] : null);
        privateState.ToAccountNumber = defaultValues ?
            (defaultValues["ToAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ToAccountNumber"], context) :
                null) :
            null;

        context["field"] = "Detail_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Detail_id"] : null);
        privateState.Detail_id = defaultValues ?
            (defaultValues["Detail_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Detail_id"], context) :
                null) :
            null;

        context["field"] = "IsZeroTaxDue";
        context["metadata"] = (objectMetadata ? objectMetadata["IsZeroTaxDue"] : null);
        privateState.IsZeroTaxDue = defaultValues ?
            (defaultValues["IsZeroTaxDue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IsZeroTaxDue"], context) :
                null) :
            null;

        context["field"] = "TaxType";
        context["metadata"] = (objectMetadata ? objectMetadata["TaxType"] : null);
        privateState.TaxType = defaultValues ?
            (defaultValues["TaxType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TaxType"], context) :
                null) :
            null;

        context["field"] = "EIN";
        context["metadata"] = (objectMetadata ? objectMetadata["EIN"] : null);
        privateState.EIN = defaultValues ?
            (defaultValues["EIN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EIN"], context) :
                null) :
            null;

        context["field"] = "SubTaxCategory";
        context["metadata"] = (objectMetadata ? objectMetadata["SubTaxCategory"] : null);
        privateState.SubTaxCategory = defaultValues ?
            (defaultValues["SubTaxCategory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["SubTaxCategory"], context) :
                null) :
            null;

        context["field"] = "EffectiveDate";
        context["metadata"] = (objectMetadata ? objectMetadata["EffectiveDate"] : null);
        privateState.EffectiveDate = defaultValues ?
            (defaultValues["EffectiveDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EffectiveDate"], context) :
                null) :
            null;

        context["field"] = "TemplateRequestTypeValue";
        context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeValue"] : null);
        privateState.TemplateRequestTypeValue = defaultValues ?
            (defaultValues["TemplateRequestTypeValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TemplateRequestTypeValue"], context) :
                null) :
            null;

        context["field"] = "ToAccountTypeValue";
        context["metadata"] = (objectMetadata ? objectMetadata["ToAccountTypeValue"] : null);
        privateState.ToAccountTypeValue = defaultValues ?
            (defaultValues["ToAccountTypeValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ToAccountTypeValue"], context) :
                null) :
            null;

        context["field"] = "TaxType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TaxType_id"] : null);
        privateState.TaxType_id = defaultValues ?
            (defaultValues["TaxType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TaxType_id"], context) :
                null) :
            null;

        context["field"] = "ToAccountType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["ToAccountType_id"] : null);
        privateState.ToAccountType_id = defaultValues ?
            (defaultValues["ToAccountType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ToAccountType_id"], context) :
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


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "AdditionalInfo": {
                get: function() {
                    context["field"] = "AdditionalInfo";
                    context["metadata"] = (objectMetadata ? objectMetadata["AdditionalInfo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.AdditionalInfo, context);
                },
                set: function(val) {
                    setterFunctions['AdditionalInfo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ToAccountType": {
                get: function() {
                    context["field"] = "ToAccountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["ToAccountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ToAccountType, context);
                },
                set: function(val) {
                    setterFunctions['ToAccountType'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "ABATRCNumber": {
                get: function() {
                    context["field"] = "ABATRCNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["ABATRCNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ABATRCNumber, context);
                },
                set: function(val) {
                    setterFunctions['ABATRCNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TransactionRecord_id": {
                get: function() {
                    context["field"] = "TransactionRecord_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TransactionRecord_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TransactionRecord_id, context);
                },
                set: function(val) {
                    setterFunctions['TransactionRecord_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Amount": {
                get: function() {
                    context["field"] = "Amount";
                    context["metadata"] = (objectMetadata ? objectMetadata["Amount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Amount, context);
                },
                set: function(val) {
                    setterFunctions['Amount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Record_Name": {
                get: function() {
                    context["field"] = "Record_Name";
                    context["metadata"] = (objectMetadata ? objectMetadata["Record_Name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Record_Name, context);
                },
                set: function(val) {
                    setterFunctions['Record_Name'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ToAccountNumber": {
                get: function() {
                    context["field"] = "ToAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["ToAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ToAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['ToAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Detail_id": {
                get: function() {
                    context["field"] = "Detail_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Detail_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Detail_id, context);
                },
                set: function(val) {
                    setterFunctions['Detail_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "IsZeroTaxDue": {
                get: function() {
                    context["field"] = "IsZeroTaxDue";
                    context["metadata"] = (objectMetadata ? objectMetadata["IsZeroTaxDue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IsZeroTaxDue, context);
                },
                set: function(val) {
                    setterFunctions['IsZeroTaxDue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TaxType": {
                get: function() {
                    context["field"] = "TaxType";
                    context["metadata"] = (objectMetadata ? objectMetadata["TaxType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TaxType, context);
                },
                set: function(val) {
                    setterFunctions['TaxType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "EIN": {
                get: function() {
                    context["field"] = "EIN";
                    context["metadata"] = (objectMetadata ? objectMetadata["EIN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.EIN, context);
                },
                set: function(val) {
                    setterFunctions['EIN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "SubTaxCategory": {
                get: function() {
                    context["field"] = "SubTaxCategory";
                    context["metadata"] = (objectMetadata ? objectMetadata["SubTaxCategory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.SubTaxCategory, context);
                },
                set: function(val) {
                    setterFunctions['SubTaxCategory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "EffectiveDate": {
                get: function() {
                    context["field"] = "EffectiveDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["EffectiveDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.EffectiveDate, context);
                },
                set: function(val) {
                    setterFunctions['EffectiveDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TemplateRequestTypeValue": {
                get: function() {
                    context["field"] = "TemplateRequestTypeValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["TemplateRequestTypeValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TemplateRequestTypeValue, context);
                },
                set: function(val) {
                    setterFunctions['TemplateRequestTypeValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ToAccountTypeValue": {
                get: function() {
                    context["field"] = "ToAccountTypeValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["ToAccountTypeValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ToAccountTypeValue, context);
                },
                set: function(val) {
                    setterFunctions['ToAccountTypeValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TaxType_id": {
                get: function() {
                    context["field"] = "TaxType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TaxType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TaxType_id, context);
                },
                set: function(val) {
                    setterFunctions['TaxType_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ToAccountType_id": {
                get: function() {
                    context["field"] = "ToAccountType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["ToAccountType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ToAccountType_id, context);
                },
                set: function(val) {
                    setterFunctions['ToAccountType_id'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.AdditionalInfo = value ? (value["AdditionalInfo"] ? value["AdditionalInfo"] : null) : null;
            privateState.ToAccountType = value ? (value["ToAccountType"] ? value["ToAccountType"] : null) : null;
            privateState.Transaction_id = value ? (value["Transaction_id"] ? value["Transaction_id"] : null) : null;
            privateState.ABATRCNumber = value ? (value["ABATRCNumber"] ? value["ABATRCNumber"] : null) : null;
            privateState.TransactionRecord_id = value ? (value["TransactionRecord_id"] ? value["TransactionRecord_id"] : null) : null;
            privateState.Amount = value ? (value["Amount"] ? value["Amount"] : null) : null;
            privateState.Record_Name = value ? (value["Record_Name"] ? value["Record_Name"] : null) : null;
            privateState.ToAccountNumber = value ? (value["ToAccountNumber"] ? value["ToAccountNumber"] : null) : null;
            privateState.Detail_id = value ? (value["Detail_id"] ? value["Detail_id"] : null) : null;
            privateState.IsZeroTaxDue = value ? (value["IsZeroTaxDue"] ? value["IsZeroTaxDue"] : null) : null;
            privateState.TaxType = value ? (value["TaxType"] ? value["TaxType"] : null) : null;
            privateState.EIN = value ? (value["EIN"] ? value["EIN"] : null) : null;
            privateState.SubTaxCategory = value ? (value["SubTaxCategory"] ? value["SubTaxCategory"] : null) : null;
            privateState.EffectiveDate = value ? (value["EffectiveDate"] ? value["EffectiveDate"] : null) : null;
            privateState.TemplateRequestTypeValue = value ? (value["TemplateRequestTypeValue"] ? value["TemplateRequestTypeValue"] : null) : null;
            privateState.ToAccountTypeValue = value ? (value["ToAccountTypeValue"] ? value["ToAccountTypeValue"] : null) : null;
            privateState.TaxType_id = value ? (value["TaxType_id"] ? value["TaxType_id"] : null) : null;
            privateState.ToAccountType_id = value ? (value["ToAccountType_id"] ? value["ToAccountType_id"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(TransactionRecords);

    //Create new class level validator object
    BaseModel.Validator.call(TransactionRecords);

    var registerValidatorBackup = TransactionRecords.registerValidator;

    TransactionRecords.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(TransactionRecords.isValid(this, propName, val)) {
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
    //For Operation 'fetchTransactionRecordsById' with service id 'FetchACHTransactionRecords8525'
     TransactionRecords.fetchTransactionRecordsById = function(params, onCompletion){
        return TransactionRecords.customVerb('fetchTransactionRecordsById', params, onCompletion);
     };

    var relations = [];

    TransactionRecords.relations = relations;

    TransactionRecords.prototype.isValid = function() {
        return TransactionRecords.isValid(this);
    };

    TransactionRecords.prototype.objModelName = "TransactionRecords";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    TransactionRecords.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ACH", "TransactionRecords", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    TransactionRecords.clone = function(objectToClone) {
        var clonedObj = new TransactionRecords();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return TransactionRecords;
});