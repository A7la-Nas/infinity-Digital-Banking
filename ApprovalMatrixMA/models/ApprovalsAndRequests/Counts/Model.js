/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Counts", "objectService" : "ApprovalsAndRequests"};

    var setterFunctions = {
        myRequestsWaiting: function(val, state) {
            context["field"] = "myRequestsWaiting";
            context["metadata"] = (objectMetadata ? objectMetadata["myRequestsWaiting"] : null);
            state['myRequestsWaiting'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        myRequestsRejected: function(val, state) {
            context["field"] = "myRequestsRejected";
            context["metadata"] = (objectMetadata ? objectMetadata["myRequestsRejected"] : null);
            state['myRequestsRejected'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        myRequestsApproved: function(val, state) {
            context["field"] = "myRequestsApproved";
            context["metadata"] = (objectMetadata ? objectMetadata["myRequestsApproved"] : null);
            state['myRequestsApproved'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ACHFilesForMyApproval: function(val, state) {
            context["field"] = "ACHFilesForMyApproval";
            context["metadata"] = (objectMetadata ? objectMetadata["ACHFilesForMyApproval"] : null);
            state['ACHFilesForMyApproval'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ACHTransactionsForMyApproval: function(val, state) {
            context["field"] = "ACHTransactionsForMyApproval";
            context["metadata"] = (objectMetadata ? objectMetadata["ACHTransactionsForMyApproval"] : null);
            state['ACHTransactionsForMyApproval'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        GeneralTransactionsForMyApproval: function(val, state) {
            context["field"] = "GeneralTransactionsForMyApproval";
            context["metadata"] = (objectMetadata ? objectMetadata["GeneralTransactionsForMyApproval"] : null);
            state['GeneralTransactionsForMyApproval'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        limitgroupId: function(val, state) {
            context["field"] = "limitgroupId";
            context["metadata"] = (objectMetadata ? objectMetadata["limitgroupId"] : null);
            state['limitgroupId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitgroupName: function(val, state) {
            context["field"] = "limitgroupName";
            context["metadata"] = (objectMetadata ? objectMetadata["limitgroupName"] : null);
            state['limitgroupName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureActionId: function(val, state) {
            context["field"] = "featureActionId";
            context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
            state['featureActionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureActionName: function(val, state) {
            context["field"] = "featureActionName";
            context["metadata"] = (objectMetadata ? objectMetadata["featureActionName"] : null);
            state['featureActionName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        myApprovalsPending: function(val, state) {
            context["field"] = "myApprovalsPending";
            context["metadata"] = (objectMetadata ? objectMetadata["myApprovalsPending"] : null);
            state['myApprovalsPending'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        myApprovalsHistory: function(val, state) {
            context["field"] = "myApprovalsHistory";
            context["metadata"] = (objectMetadata ? objectMetadata["myApprovalsHistory"] : null);
            state['myApprovalsHistory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        myRequestsPending: function(val, state) {
            context["field"] = "myRequestsPending";
            context["metadata"] = (objectMetadata ? objectMetadata["myRequestsPending"] : null);
            state['myRequestsPending'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        myRequestHistory: function(val, state) {
            context["field"] = "myRequestHistory";
            context["metadata"] = (objectMetadata ? objectMetadata["myRequestHistory"] : null);
            state['myRequestHistory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureActions: function(val, state) {
            context["field"] = "featureActions";
            context["metadata"] = (objectMetadata ? objectMetadata["featureActions"] : null);
            state['featureActions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        languageCode: function(val, state) {
            context["field"] = "languageCode";
            context["metadata"] = (objectMetadata ? objectMetadata["languageCode"] : null);
            state['languageCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actionType: function(val, state) {
            context["field"] = "actionType";
            context["metadata"] = (objectMetadata ? objectMetadata["actionType"] : null);
            state['actionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureName: function(val, state) {
            context["field"] = "featureName";
            context["metadata"] = (objectMetadata ? objectMetadata["featureName"] : null);
            state['featureName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Counts(defaultValues) {
        var privateState = {};
        context["field"] = "myRequestsWaiting";
        context["metadata"] = (objectMetadata ? objectMetadata["myRequestsWaiting"] : null);
        privateState.myRequestsWaiting = defaultValues ?
            (defaultValues["myRequestsWaiting"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["myRequestsWaiting"], context) :
                null) :
            null;

        context["field"] = "myRequestsRejected";
        context["metadata"] = (objectMetadata ? objectMetadata["myRequestsRejected"] : null);
        privateState.myRequestsRejected = defaultValues ?
            (defaultValues["myRequestsRejected"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["myRequestsRejected"], context) :
                null) :
            null;

        context["field"] = "myRequestsApproved";
        context["metadata"] = (objectMetadata ? objectMetadata["myRequestsApproved"] : null);
        privateState.myRequestsApproved = defaultValues ?
            (defaultValues["myRequestsApproved"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["myRequestsApproved"], context) :
                null) :
            null;

        context["field"] = "ACHFilesForMyApproval";
        context["metadata"] = (objectMetadata ? objectMetadata["ACHFilesForMyApproval"] : null);
        privateState.ACHFilesForMyApproval = defaultValues ?
            (defaultValues["ACHFilesForMyApproval"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ACHFilesForMyApproval"], context) :
                null) :
            null;

        context["field"] = "ACHTransactionsForMyApproval";
        context["metadata"] = (objectMetadata ? objectMetadata["ACHTransactionsForMyApproval"] : null);
        privateState.ACHTransactionsForMyApproval = defaultValues ?
            (defaultValues["ACHTransactionsForMyApproval"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ACHTransactionsForMyApproval"], context) :
                null) :
            null;

        context["field"] = "GeneralTransactionsForMyApproval";
        context["metadata"] = (objectMetadata ? objectMetadata["GeneralTransactionsForMyApproval"] : null);
        privateState.GeneralTransactionsForMyApproval = defaultValues ?
            (defaultValues["GeneralTransactionsForMyApproval"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["GeneralTransactionsForMyApproval"], context) :
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

        context["field"] = "limitgroupId";
        context["metadata"] = (objectMetadata ? objectMetadata["limitgroupId"] : null);
        privateState.limitgroupId = defaultValues ?
            (defaultValues["limitgroupId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitgroupId"], context) :
                null) :
            null;

        context["field"] = "limitgroupName";
        context["metadata"] = (objectMetadata ? objectMetadata["limitgroupName"] : null);
        privateState.limitgroupName = defaultValues ?
            (defaultValues["limitgroupName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitgroupName"], context) :
                null) :
            null;

        context["field"] = "featureActionId";
        context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
        privateState.featureActionId = defaultValues ?
            (defaultValues["featureActionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureActionId"], context) :
                null) :
            null;

        context["field"] = "featureActionName";
        context["metadata"] = (objectMetadata ? objectMetadata["featureActionName"] : null);
        privateState.featureActionName = defaultValues ?
            (defaultValues["featureActionName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureActionName"], context) :
                null) :
            null;

        context["field"] = "myApprovalsPending";
        context["metadata"] = (objectMetadata ? objectMetadata["myApprovalsPending"] : null);
        privateState.myApprovalsPending = defaultValues ?
            (defaultValues["myApprovalsPending"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["myApprovalsPending"], context) :
                null) :
            null;

        context["field"] = "myApprovalsHistory";
        context["metadata"] = (objectMetadata ? objectMetadata["myApprovalsHistory"] : null);
        privateState.myApprovalsHistory = defaultValues ?
            (defaultValues["myApprovalsHistory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["myApprovalsHistory"], context) :
                null) :
            null;

        context["field"] = "myRequestsPending";
        context["metadata"] = (objectMetadata ? objectMetadata["myRequestsPending"] : null);
        privateState.myRequestsPending = defaultValues ?
            (defaultValues["myRequestsPending"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["myRequestsPending"], context) :
                null) :
            null;

        context["field"] = "myRequestHistory";
        context["metadata"] = (objectMetadata ? objectMetadata["myRequestHistory"] : null);
        privateState.myRequestHistory = defaultValues ?
            (defaultValues["myRequestHistory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["myRequestHistory"], context) :
                null) :
            null;

        context["field"] = "featureActions";
        context["metadata"] = (objectMetadata ? objectMetadata["featureActions"] : null);
        privateState.featureActions = defaultValues ?
            (defaultValues["featureActions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureActions"], context) :
                null) :
            null;

        context["field"] = "languageCode";
        context["metadata"] = (objectMetadata ? objectMetadata["languageCode"] : null);
        privateState.languageCode = defaultValues ?
            (defaultValues["languageCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["languageCode"], context) :
                null) :
            null;

        context["field"] = "actionType";
        context["metadata"] = (objectMetadata ? objectMetadata["actionType"] : null);
        privateState.actionType = defaultValues ?
            (defaultValues["actionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actionType"], context) :
                null) :
            null;

        context["field"] = "featureName";
        context["metadata"] = (objectMetadata ? objectMetadata["featureName"] : null);
        privateState.featureName = defaultValues ?
            (defaultValues["featureName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureName"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "myRequestsWaiting": {
                get: function() {
                    context["field"] = "myRequestsWaiting";
                    context["metadata"] = (objectMetadata ? objectMetadata["myRequestsWaiting"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.myRequestsWaiting, context);
                },
                set: function(val) {
                    setterFunctions['myRequestsWaiting'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "myRequestsRejected": {
                get: function() {
                    context["field"] = "myRequestsRejected";
                    context["metadata"] = (objectMetadata ? objectMetadata["myRequestsRejected"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.myRequestsRejected, context);
                },
                set: function(val) {
                    setterFunctions['myRequestsRejected'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "myRequestsApproved": {
                get: function() {
                    context["field"] = "myRequestsApproved";
                    context["metadata"] = (objectMetadata ? objectMetadata["myRequestsApproved"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.myRequestsApproved, context);
                },
                set: function(val) {
                    setterFunctions['myRequestsApproved'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ACHFilesForMyApproval": {
                get: function() {
                    context["field"] = "ACHFilesForMyApproval";
                    context["metadata"] = (objectMetadata ? objectMetadata["ACHFilesForMyApproval"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ACHFilesForMyApproval, context);
                },
                set: function(val) {
                    setterFunctions['ACHFilesForMyApproval'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ACHTransactionsForMyApproval": {
                get: function() {
                    context["field"] = "ACHTransactionsForMyApproval";
                    context["metadata"] = (objectMetadata ? objectMetadata["ACHTransactionsForMyApproval"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ACHTransactionsForMyApproval, context);
                },
                set: function(val) {
                    setterFunctions['ACHTransactionsForMyApproval'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "GeneralTransactionsForMyApproval": {
                get: function() {
                    context["field"] = "GeneralTransactionsForMyApproval";
                    context["metadata"] = (objectMetadata ? objectMetadata["GeneralTransactionsForMyApproval"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.GeneralTransactionsForMyApproval, context);
                },
                set: function(val) {
                    setterFunctions['GeneralTransactionsForMyApproval'].call(this, val, privateState);
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
            "limitgroupId": {
                get: function() {
                    context["field"] = "limitgroupId";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitgroupId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitgroupId, context);
                },
                set: function(val) {
                    setterFunctions['limitgroupId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limitgroupName": {
                get: function() {
                    context["field"] = "limitgroupName";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitgroupName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitgroupName, context);
                },
                set: function(val) {
                    setterFunctions['limitgroupName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "featureActionId": {
                get: function() {
                    context["field"] = "featureActionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureActionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureActionId, context);
                },
                set: function(val) {
                    setterFunctions['featureActionId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "featureActionName": {
                get: function() {
                    context["field"] = "featureActionName";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureActionName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureActionName, context);
                },
                set: function(val) {
                    setterFunctions['featureActionName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "myApprovalsPending": {
                get: function() {
                    context["field"] = "myApprovalsPending";
                    context["metadata"] = (objectMetadata ? objectMetadata["myApprovalsPending"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.myApprovalsPending, context);
                },
                set: function(val) {
                    setterFunctions['myApprovalsPending'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "myApprovalsHistory": {
                get: function() {
                    context["field"] = "myApprovalsHistory";
                    context["metadata"] = (objectMetadata ? objectMetadata["myApprovalsHistory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.myApprovalsHistory, context);
                },
                set: function(val) {
                    setterFunctions['myApprovalsHistory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "myRequestsPending": {
                get: function() {
                    context["field"] = "myRequestsPending";
                    context["metadata"] = (objectMetadata ? objectMetadata["myRequestsPending"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.myRequestsPending, context);
                },
                set: function(val) {
                    setterFunctions['myRequestsPending'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "myRequestHistory": {
                get: function() {
                    context["field"] = "myRequestHistory";
                    context["metadata"] = (objectMetadata ? objectMetadata["myRequestHistory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.myRequestHistory, context);
                },
                set: function(val) {
                    setterFunctions['myRequestHistory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "featureActions": {
                get: function() {
                    context["field"] = "featureActions";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureActions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureActions, context);
                },
                set: function(val) {
                    setterFunctions['featureActions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "languageCode": {
                get: function() {
                    context["field"] = "languageCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["languageCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.languageCode, context);
                },
                set: function(val) {
                    setterFunctions['languageCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "actionType": {
                get: function() {
                    context["field"] = "actionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["actionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actionType, context);
                },
                set: function(val) {
                    setterFunctions['actionType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "featureName": {
                get: function() {
                    context["field"] = "featureName";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureName, context);
                },
                set: function(val) {
                    setterFunctions['featureName'].call(this, val, privateState);
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
            privateState.myRequestsWaiting = value ? (value["myRequestsWaiting"] ? value["myRequestsWaiting"] : null) : null;
            privateState.myRequestsRejected = value ? (value["myRequestsRejected"] ? value["myRequestsRejected"] : null) : null;
            privateState.myRequestsApproved = value ? (value["myRequestsApproved"] ? value["myRequestsApproved"] : null) : null;
            privateState.ACHFilesForMyApproval = value ? (value["ACHFilesForMyApproval"] ? value["ACHFilesForMyApproval"] : null) : null;
            privateState.ACHTransactionsForMyApproval = value ? (value["ACHTransactionsForMyApproval"] ? value["ACHTransactionsForMyApproval"] : null) : null;
            privateState.GeneralTransactionsForMyApproval = value ? (value["GeneralTransactionsForMyApproval"] ? value["GeneralTransactionsForMyApproval"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpStatusCode = value ? (value["httpStatusCode"] ? value["httpStatusCode"] : null) : null;
            privateState.limitgroupId = value ? (value["limitgroupId"] ? value["limitgroupId"] : null) : null;
            privateState.limitgroupName = value ? (value["limitgroupName"] ? value["limitgroupName"] : null) : null;
            privateState.featureActionId = value ? (value["featureActionId"] ? value["featureActionId"] : null) : null;
            privateState.featureActionName = value ? (value["featureActionName"] ? value["featureActionName"] : null) : null;
            privateState.myApprovalsPending = value ? (value["myApprovalsPending"] ? value["myApprovalsPending"] : null) : null;
            privateState.myApprovalsHistory = value ? (value["myApprovalsHistory"] ? value["myApprovalsHistory"] : null) : null;
            privateState.myRequestsPending = value ? (value["myRequestsPending"] ? value["myRequestsPending"] : null) : null;
            privateState.myRequestHistory = value ? (value["myRequestHistory"] ? value["myRequestHistory"] : null) : null;
            privateState.featureActions = value ? (value["featureActions"] ? value["featureActions"] : null) : null;
            privateState.languageCode = value ? (value["languageCode"] ? value["languageCode"] : null) : null;
            privateState.actionType = value ? (value["actionType"] ? value["actionType"] : null) : null;
            privateState.featureName = value ? (value["featureName"] ? value["featureName"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Counts);

    //Create new class level validator object
    BaseModel.Validator.call(Counts);

    var registerValidatorBackup = Counts.registerValidator;

    Counts.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Counts.isValid(this, propName, val)) {
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
    //For Operation 'getCounts' with service id 'fetchApprovalRequestCounts1038'
     Counts.getCounts = function(params, onCompletion){
        return Counts.customVerb('getCounts', params, onCompletion);
     };

    var relations = [];

    Counts.relations = relations;

    Counts.prototype.isValid = function() {
        return Counts.isValid(this);
    };

    Counts.prototype.objModelName = "Counts";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Counts.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ApprovalsAndRequests", "Counts", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Counts.clone = function(objectToClone) {
        var clonedObj = new Counts();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Counts;
});