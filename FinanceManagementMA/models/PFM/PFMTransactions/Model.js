/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PFMTransactions", "objectService" : "PFM"};

    var setterFunctions = {
        categoryId: function(val, state) {
            context["field"] = "categoryId";
            context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
            state['categoryId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        categoryName: function(val, state) {
            context["field"] = "categoryName";
            context["metadata"] = (objectMetadata ? objectMetadata["categoryName"] : null);
            state['categoryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        getMonthlyTransactions: function(val, state) {
            context["field"] = "getMonthlyTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["getMonthlyTransactions"] : null);
            state['getMonthlyTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        getUncategorisedCount: function(val, state) {
            context["field"] = "getUncategorisedCount";
            context["metadata"] = (objectMetadata ? objectMetadata["getUncategorisedCount"] : null);
            state['getUncategorisedCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isAnalyzed: function(val, state) {
            context["field"] = "isAnalyzed";
            context["metadata"] = (objectMetadata ? objectMetadata["isAnalyzed"] : null);
            state['isAnalyzed'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isMappedToMerchant: function(val, state) {
            context["field"] = "isMappedToMerchant";
            context["metadata"] = (objectMetadata ? objectMetadata["isMappedToMerchant"] : null);
            state['isMappedToMerchant'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        monthId: function(val, state) {
            context["field"] = "monthId";
            context["metadata"] = (objectMetadata ? objectMetadata["monthId"] : null);
            state['monthId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionAmount: function(val, state) {
            context["field"] = "transactionAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
            state['transactionAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionDate: function(val, state) {
            context["field"] = "transactionDate";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionDate"] : null);
            state['transactionDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionDescription: function(val, state) {
            context["field"] = "transactionDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionDescription"] : null);
            state['transactionDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionId: function(val, state) {
            context["field"] = "transactionId";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
            state['transactionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionNotes: function(val, state) {
            context["field"] = "transactionNotes";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionNotes"] : null);
            state['transactionNotes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pfmtransactionlist: function(val, state) {
            context["field"] = "pfmtransactionlist";
            context["metadata"] = (objectMetadata ? objectMetadata["pfmtransactionlist"] : null);
            state['pfmtransactionlist'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        year: function(val, state) {
            context["field"] = "year";
            context["metadata"] = (objectMetadata ? objectMetadata["year"] : null);
            state['year'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortby: function(val, state) {
            context["field"] = "sortby";
            context["metadata"] = (objectMetadata ? objectMetadata["sortby"] : null);
            state['sortby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        order: function(val, state) {
            context["field"] = "order";
            context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
            state['order'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        notes: function(val, state) {
            context["field"] = "notes";
            context["metadata"] = (objectMetadata ? objectMetadata["notes"] : null);
            state['notes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCurrency: function(val, state) {
            context["field"] = "transactionCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
            state['transactionCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PFMTransactions(defaultValues) {
        var privateState = {};
        context["field"] = "categoryId";
        context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
        privateState.categoryId = defaultValues ?
            (defaultValues["categoryId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["categoryId"], context) :
                null) :
            null;

        context["field"] = "categoryName";
        context["metadata"] = (objectMetadata ? objectMetadata["categoryName"] : null);
        privateState.categoryName = defaultValues ?
            (defaultValues["categoryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["categoryName"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
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

        context["field"] = "getMonthlyTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["getMonthlyTransactions"] : null);
        privateState.getMonthlyTransactions = defaultValues ?
            (defaultValues["getMonthlyTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["getMonthlyTransactions"], context) :
                null) :
            null;

        context["field"] = "getUncategorisedCount";
        context["metadata"] = (objectMetadata ? objectMetadata["getUncategorisedCount"] : null);
        privateState.getUncategorisedCount = defaultValues ?
            (defaultValues["getUncategorisedCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["getUncategorisedCount"], context) :
                null) :
            null;

        context["field"] = "isAnalyzed";
        context["metadata"] = (objectMetadata ? objectMetadata["isAnalyzed"] : null);
        privateState.isAnalyzed = defaultValues ?
            (defaultValues["isAnalyzed"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isAnalyzed"], context) :
                null) :
            null;

        context["field"] = "isMappedToMerchant";
        context["metadata"] = (objectMetadata ? objectMetadata["isMappedToMerchant"] : null);
        privateState.isMappedToMerchant = defaultValues ?
            (defaultValues["isMappedToMerchant"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isMappedToMerchant"], context) :
                null) :
            null;

        context["field"] = "monthId";
        context["metadata"] = (objectMetadata ? objectMetadata["monthId"] : null);
        privateState.monthId = defaultValues ?
            (defaultValues["monthId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["monthId"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
                null) :
            null;

        context["field"] = "transactionAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
        privateState.transactionAmount = defaultValues ?
            (defaultValues["transactionAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionAmount"], context) :
                null) :
            null;

        context["field"] = "transactionDate";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionDate"] : null);
        privateState.transactionDate = defaultValues ?
            (defaultValues["transactionDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionDate"], context) :
                null) :
            null;

        context["field"] = "transactionDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionDescription"] : null);
        privateState.transactionDescription = defaultValues ?
            (defaultValues["transactionDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionDescription"], context) :
                null) :
            null;

        context["field"] = "transactionId";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
        privateState.transactionId = defaultValues ?
            (defaultValues["transactionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionId"], context) :
                null) :
            null;

        context["field"] = "transactionNotes";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionNotes"] : null);
        privateState.transactionNotes = defaultValues ?
            (defaultValues["transactionNotes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionNotes"], context) :
                null) :
            null;

        context["field"] = "pfmtransactionlist";
        context["metadata"] = (objectMetadata ? objectMetadata["pfmtransactionlist"] : null);
        privateState.pfmtransactionlist = defaultValues ?
            (defaultValues["pfmtransactionlist"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pfmtransactionlist"], context) :
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

        context["field"] = "year";
        context["metadata"] = (objectMetadata ? objectMetadata["year"] : null);
        privateState.year = defaultValues ?
            (defaultValues["year"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["year"], context) :
                null) :
            null;

        context["field"] = "sortby";
        context["metadata"] = (objectMetadata ? objectMetadata["sortby"] : null);
        privateState.sortby = defaultValues ?
            (defaultValues["sortby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortby"], context) :
                null) :
            null;

        context["field"] = "order";
        context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
        privateState.order = defaultValues ?
            (defaultValues["order"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["order"], context) :
                null) :
            null;

        context["field"] = "notes";
        context["metadata"] = (objectMetadata ? objectMetadata["notes"] : null);
        privateState.notes = defaultValues ?
            (defaultValues["notes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["notes"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "transactionCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
        privateState.transactionCurrency = defaultValues ?
            (defaultValues["transactionCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCurrency"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "categoryId": {
                get: function() {
                    context["field"] = "categoryId";
                    context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.categoryId, context);
                },
                set: function(val) {
                    setterFunctions['categoryId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "categoryName": {
                get: function() {
                    context["field"] = "categoryName";
                    context["metadata"] = (objectMetadata ? objectMetadata["categoryName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.categoryName, context);
                },
                set: function(val) {
                    setterFunctions['categoryName'].call(this, val, privateState);
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
            "getMonthlyTransactions": {
                get: function() {
                    context["field"] = "getMonthlyTransactions";
                    context["metadata"] = (objectMetadata ? objectMetadata["getMonthlyTransactions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.getMonthlyTransactions, context);
                },
                set: function(val) {
                    setterFunctions['getMonthlyTransactions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "getUncategorisedCount": {
                get: function() {
                    context["field"] = "getUncategorisedCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["getUncategorisedCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.getUncategorisedCount, context);
                },
                set: function(val) {
                    setterFunctions['getUncategorisedCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isAnalyzed": {
                get: function() {
                    context["field"] = "isAnalyzed";
                    context["metadata"] = (objectMetadata ? objectMetadata["isAnalyzed"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isAnalyzed, context);
                },
                set: function(val) {
                    setterFunctions['isAnalyzed'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isMappedToMerchant": {
                get: function() {
                    context["field"] = "isMappedToMerchant";
                    context["metadata"] = (objectMetadata ? objectMetadata["isMappedToMerchant"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isMappedToMerchant, context);
                },
                set: function(val) {
                    setterFunctions['isMappedToMerchant'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "monthId": {
                get: function() {
                    context["field"] = "monthId";
                    context["metadata"] = (objectMetadata ? objectMetadata["monthId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.monthId, context);
                },
                set: function(val) {
                    setterFunctions['monthId'].call(this, val, privateState);
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
            "transactionDescription": {
                get: function() {
                    context["field"] = "transactionDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionDescription, context);
                },
                set: function(val) {
                    setterFunctions['transactionDescription'].call(this, val, privateState);
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
            "transactionNotes": {
                get: function() {
                    context["field"] = "transactionNotes";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionNotes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionNotes, context);
                },
                set: function(val) {
                    setterFunctions['transactionNotes'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pfmtransactionlist": {
                get: function() {
                    context["field"] = "pfmtransactionlist";
                    context["metadata"] = (objectMetadata ? objectMetadata["pfmtransactionlist"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pfmtransactionlist, context);
                },
                set: function(val) {
                    setterFunctions['pfmtransactionlist'].call(this, val, privateState);
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
            "year": {
                get: function() {
                    context["field"] = "year";
                    context["metadata"] = (objectMetadata ? objectMetadata["year"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.year, context);
                },
                set: function(val) {
                    setterFunctions['year'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortby": {
                get: function() {
                    context["field"] = "sortby";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortby, context);
                },
                set: function(val) {
                    setterFunctions['sortby'].call(this, val, privateState);
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
            "notes": {
                get: function() {
                    context["field"] = "notes";
                    context["metadata"] = (objectMetadata ? objectMetadata["notes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.notes, context);
                },
                set: function(val) {
                    setterFunctions['notes'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.categoryId = value ? (value["categoryId"] ? value["categoryId"] : null) : null;
            privateState.categoryName = value ? (value["categoryName"] ? value["categoryName"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.fromAccountName = value ? (value["fromAccountName"] ? value["fromAccountName"] : null) : null;
            privateState.fromAccountNumber = value ? (value["fromAccountNumber"] ? value["fromAccountNumber"] : null) : null;
            privateState.getMonthlyTransactions = value ? (value["getMonthlyTransactions"] ? value["getMonthlyTransactions"] : null) : null;
            privateState.getUncategorisedCount = value ? (value["getUncategorisedCount"] ? value["getUncategorisedCount"] : null) : null;
            privateState.isAnalyzed = value ? (value["isAnalyzed"] ? value["isAnalyzed"] : null) : null;
            privateState.isMappedToMerchant = value ? (value["isMappedToMerchant"] ? value["isMappedToMerchant"] : null) : null;
            privateState.monthId = value ? (value["monthId"] ? value["monthId"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.transactionAmount = value ? (value["transactionAmount"] ? value["transactionAmount"] : null) : null;
            privateState.transactionDate = value ? (value["transactionDate"] ? value["transactionDate"] : null) : null;
            privateState.transactionDescription = value ? (value["transactionDescription"] ? value["transactionDescription"] : null) : null;
            privateState.transactionId = value ? (value["transactionId"] ? value["transactionId"] : null) : null;
            privateState.transactionNotes = value ? (value["transactionNotes"] ? value["transactionNotes"] : null) : null;
            privateState.pfmtransactionlist = value ? (value["pfmtransactionlist"] ? value["pfmtransactionlist"] : null) : null;
            privateState.toAccountName = value ? (value["toAccountName"] ? value["toAccountName"] : null) : null;
            privateState.toAccountNumber = value ? (value["toAccountNumber"] ? value["toAccountNumber"] : null) : null;
            privateState.year = value ? (value["year"] ? value["year"] : null) : null;
            privateState.sortby = value ? (value["sortby"] ? value["sortby"] : null) : null;
            privateState.order = value ? (value["order"] ? value["order"] : null) : null;
            privateState.notes = value ? (value["notes"] ? value["notes"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.transactionCurrency = value ? (value["transactionCurrency"] ? value["transactionCurrency"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PFMTransactions);

    //Create new class level validator object
    BaseModel.Validator.call(PFMTransactions);

    var registerValidatorBackup = PFMTransactions.registerValidator;

    PFMTransactions.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PFMTransactions.isValid(this, propName, val)) {
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
    //For Operation 'updateBulkPFMTransaction' with service id 'updateBulkPFMTransaction5063'
     PFMTransactions.updateBulkPFMTransaction = function(params, onCompletion){
        return PFMTransactions.customVerb('updateBulkPFMTransaction', params, onCompletion);
     };

    var relations = [];

    PFMTransactions.relations = relations;

    PFMTransactions.prototype.isValid = function() {
        return PFMTransactions.isValid(this);
    };

    PFMTransactions.prototype.objModelName = "PFMTransactions";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PFMTransactions.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PFM", "PFMTransactions", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PFMTransactions.clone = function(objectToClone) {
        var clonedObj = new PFMTransactions();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PFMTransactions;
});