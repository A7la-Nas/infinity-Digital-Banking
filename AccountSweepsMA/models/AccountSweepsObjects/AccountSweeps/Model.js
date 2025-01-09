/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "AccountSweeps", "objectService" : "AccountSweepsObjects"};

    var setterFunctions = {
        primaryAccountNumber: function(val, state) {
            context["field"] = "primaryAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["primaryAccountNumber"] : null);
            state['primaryAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        secondaryAccountNumber: function(val, state) {
            context["field"] = "secondaryAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["secondaryAccountNumber"] : null);
            state['secondaryAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        belowSweepAmount: function(val, state) {
            context["field"] = "belowSweepAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["belowSweepAmount"] : null);
            state['belowSweepAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        aboveSweepAmount: function(val, state) {
            context["field"] = "aboveSweepAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["aboveSweepAmount"] : null);
            state['aboveSweepAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        frequency: function(val, state) {
            context["field"] = "frequency";
            context["metadata"] = (objectMetadata ? objectMetadata["frequency"] : null);
            state['frequency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        startDate: function(val, state) {
            context["field"] = "startDate";
            context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
            state['startDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        endDate: function(val, state) {
            context["field"] = "endDate";
            context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
            state['endDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sweepType: function(val, state) {
            context["field"] = "sweepType";
            context["metadata"] = (objectMetadata ? objectMetadata["sweepType"] : null);
            state['sweepType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceRequestId: function(val, state) {
            context["field"] = "serviceRequestId";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceRequestId"] : null);
            state['serviceRequestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorCode: function(val, state) {
            context["field"] = "errorCode";
            context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
            state['errorCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorMessage: function(val, state) {
            context["field"] = "errorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
            state['errorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        accountId: function(val, state) {
            context["field"] = "accountId";
            context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
            state['accountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        primaryAccountName: function(val, state) {
            context["field"] = "primaryAccountName";
            context["metadata"] = (objectMetadata ? objectMetadata["primaryAccountName"] : null);
            state['primaryAccountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        secondaryAccountName: function(val, state) {
            context["field"] = "secondaryAccountName";
            context["metadata"] = (objectMetadata ? objectMetadata["secondaryAccountName"] : null);
            state['secondaryAccountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        validate: function(val, state) {
            context["field"] = "validate";
            context["metadata"] = (objectMetadata ? objectMetadata["validate"] : null);
            state['validate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
		coreCustomerId: function(val, state) {
            context["field"] = "coreCustomerId";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
            state['coreCustomerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function AccountSweeps(defaultValues) {
        var privateState = {};
        context["field"] = "primaryAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["primaryAccountNumber"] : null);
        privateState.primaryAccountNumber = defaultValues ?
            (defaultValues["primaryAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["primaryAccountNumber"], context) :
                null) :
            null;

        context["field"] = "secondaryAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["secondaryAccountNumber"] : null);
        privateState.secondaryAccountNumber = defaultValues ?
            (defaultValues["secondaryAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["secondaryAccountNumber"], context) :
                null) :
            null;

        context["field"] = "belowSweepAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["belowSweepAmount"] : null);
        privateState.belowSweepAmount = defaultValues ?
            (defaultValues["belowSweepAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["belowSweepAmount"], context) :
                null) :
            null;

        context["field"] = "aboveSweepAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["aboveSweepAmount"] : null);
        privateState.aboveSweepAmount = defaultValues ?
            (defaultValues["aboveSweepAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["aboveSweepAmount"], context) :
                null) :
            null;

        context["field"] = "frequency";
        context["metadata"] = (objectMetadata ? objectMetadata["frequency"] : null);
        privateState.frequency = defaultValues ?
            (defaultValues["frequency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["frequency"], context) :
                null) :
            null;

        context["field"] = "startDate";
        context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
        privateState.startDate = defaultValues ?
            (defaultValues["startDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["startDate"], context) :
                null) :
            null;

        context["field"] = "endDate";
        context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
        privateState.endDate = defaultValues ?
            (defaultValues["endDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["endDate"], context) :
                null) :
            null;

        context["field"] = "sweepType";
        context["metadata"] = (objectMetadata ? objectMetadata["sweepType"] : null);
        privateState.sweepType = defaultValues ?
            (defaultValues["sweepType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sweepType"], context) :
                null) :
            null;

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "serviceRequestId";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceRequestId"] : null);
        privateState.serviceRequestId = defaultValues ?
            (defaultValues["serviceRequestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceRequestId"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
                null) :
            null;

        context["field"] = "errorCode";
        context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
        privateState.errorCode = defaultValues ?
            (defaultValues["errorCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorCode"], context) :
                null) :
            null;

        context["field"] = "errorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
        privateState.errorMessage = defaultValues ?
            (defaultValues["errorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorMessage"], context) :
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

        context["field"] = "accountId";
        context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
        privateState.accountId = defaultValues ?
            (defaultValues["accountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountId"], context) :
                null) :
            null;

        context["field"] = "primaryAccountName";
        context["metadata"] = (objectMetadata ? objectMetadata["primaryAccountName"] : null);
        privateState.primaryAccountName = defaultValues ?
            (defaultValues["primaryAccountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["primaryAccountName"], context) :
                null) :
            null;

        context["field"] = "secondaryAccountName";
        context["metadata"] = (objectMetadata ? objectMetadata["secondaryAccountName"] : null);
        privateState.secondaryAccountName = defaultValues ?
            (defaultValues["secondaryAccountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["secondaryAccountName"], context) :
                null) :
            null;

        context["field"] = "validate";
        context["metadata"] = (objectMetadata ? objectMetadata["validate"] : null);
        privateState.validate = defaultValues ?
            (defaultValues["validate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["validate"], context) :
                null) :
            null;

		 context["field"] = "coreCustomerId";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
        privateState.coreCustomerId = defaultValues ?
            (defaultValues["coreCustomerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerId"], context) :
                null) :
            null;
			

        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "primaryAccountNumber": {
                get: function() {
                    context["field"] = "primaryAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["primaryAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.primaryAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['primaryAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "secondaryAccountNumber": {
                get: function() {
                    context["field"] = "secondaryAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["secondaryAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.secondaryAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['secondaryAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "belowSweepAmount": {
                get: function() {
                    context["field"] = "belowSweepAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["belowSweepAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.belowSweepAmount, context);
                },
                set: function(val) {
                    setterFunctions['belowSweepAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "aboveSweepAmount": {
                get: function() {
                    context["field"] = "aboveSweepAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["aboveSweepAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.aboveSweepAmount, context);
                },
                set: function(val) {
                    setterFunctions['aboveSweepAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "frequency": {
                get: function() {
                    context["field"] = "frequency";
                    context["metadata"] = (objectMetadata ? objectMetadata["frequency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.frequency, context);
                },
                set: function(val) {
                    setterFunctions['frequency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "startDate": {
                get: function() {
                    context["field"] = "startDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.startDate, context);
                },
                set: function(val) {
                    setterFunctions['startDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "endDate": {
                get: function() {
                    context["field"] = "endDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.endDate, context);
                },
                set: function(val) {
                    setterFunctions['endDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sweepType": {
                get: function() {
                    context["field"] = "sweepType";
                    context["metadata"] = (objectMetadata ? objectMetadata["sweepType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sweepType, context);
                },
                set: function(val) {
                    setterFunctions['sweepType'].call(this, val, privateState);
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
            "serviceRequestId": {
                get: function() {
                    context["field"] = "serviceRequestId";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceRequestId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceRequestId, context);
                },
                set: function(val) {
                    setterFunctions['serviceRequestId'].call(this, val, privateState);
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
            "accountId": {
                get: function() {
                    context["field"] = "accountId";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountId, context);
                },
                set: function(val) {
                    setterFunctions['accountId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "primaryAccountName": {
                get: function() {
                    context["field"] = "primaryAccountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["primaryAccountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.primaryAccountName, context);
                },
                set: function(val) {
                    setterFunctions['primaryAccountName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "secondaryAccountName": {
                get: function() {
                    context["field"] = "secondaryAccountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["secondaryAccountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.secondaryAccountName, context);
                },
                set: function(val) {
                    setterFunctions['secondaryAccountName'].call(this, val, privateState);
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
			"coreCustomerId": {
                get: function() {
                    context["field"] = "coreCustomerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.coreCustomerId, context);
                },
                set: function(val) {
                    setterFunctions['coreCustomerId'].call(this, val, privateState);
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
            privateState.primaryAccountNumber = value ? (value["primaryAccountNumber"] ? value["primaryAccountNumber"] : null) : null;
            privateState.secondaryAccountNumber = value ? (value["secondaryAccountNumber"] ? value["secondaryAccountNumber"] : null) : null;
            privateState.belowSweepAmount = value ? (value["belowSweepAmount"] ? value["belowSweepAmount"] : null) : null;
            privateState.aboveSweepAmount = value ? (value["aboveSweepAmount"] ? value["aboveSweepAmount"] : null) : null;
            privateState.frequency = value ? (value["frequency"] ? value["frequency"] : null) : null;
            privateState.startDate = value ? (value["startDate"] ? value["startDate"] : null) : null;
            privateState.endDate = value ? (value["endDate"] ? value["endDate"] : null) : null;
            privateState.sweepType = value ? (value["sweepType"] ? value["sweepType"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.serviceRequestId = value ? (value["serviceRequestId"] ? value["serviceRequestId"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.errorCode = value ? (value["errorCode"] ? value["errorCode"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.timeParam = value ? (value["timeParam"] ? value["timeParam"] : null) : null;
            privateState.timeValue = value ? (value["timeValue"] ? value["timeValue"] : null) : null;
            privateState.filterByValue = value ? (value["filterByValue"] ? value["filterByValue"] : null) : null;
            privateState.filterByParam = value ? (value["filterByParam"] ? value["filterByParam"] : null) : null;
            privateState.accountId = value ? (value["accountId"] ? value["accountId"] : null) : null;
            privateState.primaryAccountName = value ? (value["primaryAccountName"] ? value["primaryAccountName"] : null) : null;
            privateState.secondaryAccountName = value ? (value["secondaryAccountName"] ? value["secondaryAccountName"] : null) : null;
            privateState.validate = value ? (value["validate"] ? value["validate"] : null) : null;
			privateState.coreCustomerId = value ? (value["coreCustomerId"] ? value["coreCustomerId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(AccountSweeps);

    //Create new class level validator object
    BaseModel.Validator.call(AccountSweeps);

    var registerValidatorBackup = AccountSweeps.registerValidator;

    AccountSweeps.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(AccountSweeps.isValid(this, propName, val)) {
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
    //For Operation 'editAccountSweep' with service id 'EditAccountSweep1460'
     AccountSweeps.editAccountSweep = function(params, onCompletion){
        return AccountSweeps.customVerb('editAccountSweep', params, onCompletion);
     };

    //For Operation 'getAccountSweeps' with service id 'GetAccountSweeps2639'
     AccountSweeps.getAccountSweeps = function(params, onCompletion){
        return AccountSweeps.customVerb('getAccountSweeps', params, onCompletion);
     };

    //For Operation 'deleteAccountSweep' with service id 'DeleteAccountSweep7570'
     AccountSweeps.deleteAccountSweep = function(params, onCompletion){
        return AccountSweeps.customVerb('deleteAccountSweep', params, onCompletion);
     };

    //For Operation 'initiateDownloadAccountSweeps' with service id 'InitiateDownloadAccountSweep6305'
     AccountSweeps.initiateDownloadAccountSweeps = function(params, onCompletion){
        return AccountSweeps.customVerb('initiateDownloadAccountSweeps', params, onCompletion);
     };

    //For Operation 'createAccountSweep' with service id 'CreateAccountSweeps6399'
     AccountSweeps.createAccountSweep = function(params, onCompletion){
        return AccountSweeps.customVerb('createAccountSweep', params, onCompletion);
     };

    //For Operation 'getAccountSweepById' with service id 'GetAccountSweepById4341'
     AccountSweeps.getAccountSweepById = function(params, onCompletion){
        return AccountSweeps.customVerb('getAccountSweepById', params, onCompletion);
     };

    var relations = [];

    AccountSweeps.relations = relations;

    AccountSweeps.prototype.isValid = function() {
        return AccountSweeps.isValid(this);
    };

    AccountSweeps.prototype.objModelName = "AccountSweeps";
    AccountSweeps.prototype.objServiceName = "AccountSweepsObjects";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    AccountSweeps.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("AccountSweepsObjects", "AccountSweeps", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    AccountSweeps.clone = function(objectToClone) {
        var clonedObj = new AccountSweeps();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return AccountSweeps;
});