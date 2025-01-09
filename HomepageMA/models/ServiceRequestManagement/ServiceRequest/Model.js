/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ServiceRequest", "objectService" : "ServiceRequestManagement"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountId: function(val, state) {
            context["field"] = "accountId";
            context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
            state['accountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        subType: function(val, state) {
            context["field"] = "subType";
            context["metadata"] = (objectMetadata ? objectMetadata["subType"] : null);
            state['subType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        type: function(val, state) {
            context["field"] = "type";
            context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
            state['type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateTo: function(val, state) {
            context["field"] = "dateTo";
            context["metadata"] = (objectMetadata ? objectMetadata["dateTo"] : null);
            state['dateTo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateFrom: function(val, state) {
            context["field"] = "dateFrom";
            context["metadata"] = (objectMetadata ? objectMetadata["dateFrom"] : null);
            state['dateFrom'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceReqStatus: function(val, state) {
            context["field"] = "serviceReqStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceReqStatus"] : null);
            state['serviceReqStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currrentSignatoryApprovedCount: function(val, state) {
            context["field"] = "currrentSignatoryApprovedCount";
            context["metadata"] = (objectMetadata ? objectMetadata["currrentSignatoryApprovedCount"] : null);
            state['currrentSignatoryApprovedCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceReqProcessedTime: function(val, state) {
            context["field"] = "serviceReqProcessedTime";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceReqProcessedTime"] : null);
            state['serviceReqProcessedTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentAttempt: function(val, state) {
            context["field"] = "currentAttempt";
            context["metadata"] = (objectMetadata ? objectMetadata["currentAttempt"] : null);
            state['currentAttempt'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signatoryApprovalRequired: function(val, state) {
            context["field"] = "signatoryApprovalRequired";
            context["metadata"] = (objectMetadata ? objectMetadata["signatoryApprovalRequired"] : null);
            state['signatoryApprovalRequired'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        internalStatus: function(val, state) {
            context["field"] = "internalStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["internalStatus"] : null);
            state['internalStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentSignatoryRejectCount: function(val, state) {
            context["field"] = "currentSignatoryRejectCount";
            context["metadata"] = (objectMetadata ? objectMetadata["currentSignatoryRejectCount"] : null);
            state['currentSignatoryRejectCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        externalserviceReqRef: function(val, state) {
            context["field"] = "externalserviceReqRef";
            context["metadata"] = (objectMetadata ? objectMetadata["externalserviceReqRef"] : null);
            state['externalserviceReqRef'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestConfigId: function(val, state) {
            context["field"] = "requestConfigId";
            context["metadata"] = (objectMetadata ? objectMetadata["requestConfigId"] : null);
            state['requestConfigId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestCreatedTime: function(val, state) {
            context["field"] = "requestCreatedTime";
            context["metadata"] = (objectMetadata ? objectMetadata["requestCreatedTime"] : null);
            state['requestCreatedTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actionPerformed: function(val, state) {
            context["field"] = "actionPerformed";
            context["metadata"] = (objectMetadata ? objectMetadata["actionPerformed"] : null);
            state['actionPerformed'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestDate: function(val, state) {
            context["field"] = "requestDate";
            context["metadata"] = (objectMetadata ? objectMetadata["requestDate"] : null);
            state['requestDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceReqId: function(val, state) {
            context["field"] = "serviceReqId";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceReqId"] : null);
            state['serviceReqId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyId: function(val, state) {
            context["field"] = "partyId";
            context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
            state['partyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorDetails: function(val, state) {
            context["field"] = "errorDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["errorDetails"] : null);
            state['errorDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ServiceRequest(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "accountId";
        context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
        privateState.accountId = defaultValues ?
            (defaultValues["accountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountId"], context) :
                null) :
            null;

        context["field"] = "subType";
        context["metadata"] = (objectMetadata ? objectMetadata["subType"] : null);
        privateState.subType = defaultValues ?
            (defaultValues["subType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["subType"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "type";
        context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
        privateState.type = defaultValues ?
            (defaultValues["type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["type"], context) :
                null) :
            null;

        context["field"] = "dateTo";
        context["metadata"] = (objectMetadata ? objectMetadata["dateTo"] : null);
        privateState.dateTo = defaultValues ?
            (defaultValues["dateTo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateTo"], context) :
                null) :
            null;

        context["field"] = "dateFrom";
        context["metadata"] = (objectMetadata ? objectMetadata["dateFrom"] : null);
        privateState.dateFrom = defaultValues ?
            (defaultValues["dateFrom"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateFrom"], context) :
                null) :
            null;

        context["field"] = "serviceReqStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceReqStatus"] : null);
        privateState.serviceReqStatus = defaultValues ?
            (defaultValues["serviceReqStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceReqStatus"], context) :
                null) :
            null;

        context["field"] = "currrentSignatoryApprovedCount";
        context["metadata"] = (objectMetadata ? objectMetadata["currrentSignatoryApprovedCount"] : null);
        privateState.currrentSignatoryApprovedCount = defaultValues ?
            (defaultValues["currrentSignatoryApprovedCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currrentSignatoryApprovedCount"], context) :
                null) :
            null;

        context["field"] = "serviceReqProcessedTime";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceReqProcessedTime"] : null);
        privateState.serviceReqProcessedTime = defaultValues ?
            (defaultValues["serviceReqProcessedTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceReqProcessedTime"], context) :
                null) :
            null;

        context["field"] = "currentAttempt";
        context["metadata"] = (objectMetadata ? objectMetadata["currentAttempt"] : null);
        privateState.currentAttempt = defaultValues ?
            (defaultValues["currentAttempt"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentAttempt"], context) :
                null) :
            null;

        context["field"] = "signatoryApprovalRequired";
        context["metadata"] = (objectMetadata ? objectMetadata["signatoryApprovalRequired"] : null);
        privateState.signatoryApprovalRequired = defaultValues ?
            (defaultValues["signatoryApprovalRequired"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signatoryApprovalRequired"], context) :
                null) :
            null;

        context["field"] = "internalStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["internalStatus"] : null);
        privateState.internalStatus = defaultValues ?
            (defaultValues["internalStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["internalStatus"], context) :
                null) :
            null;

        context["field"] = "currentSignatoryRejectCount";
        context["metadata"] = (objectMetadata ? objectMetadata["currentSignatoryRejectCount"] : null);
        privateState.currentSignatoryRejectCount = defaultValues ?
            (defaultValues["currentSignatoryRejectCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentSignatoryRejectCount"], context) :
                null) :
            null;

        context["field"] = "externalserviceReqRef";
        context["metadata"] = (objectMetadata ? objectMetadata["externalserviceReqRef"] : null);
        privateState.externalserviceReqRef = defaultValues ?
            (defaultValues["externalserviceReqRef"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["externalserviceReqRef"], context) :
                null) :
            null;

        context["field"] = "requestConfigId";
        context["metadata"] = (objectMetadata ? objectMetadata["requestConfigId"] : null);
        privateState.requestConfigId = defaultValues ?
            (defaultValues["requestConfigId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestConfigId"], context) :
                null) :
            null;

        context["field"] = "requestCreatedTime";
        context["metadata"] = (objectMetadata ? objectMetadata["requestCreatedTime"] : null);
        privateState.requestCreatedTime = defaultValues ?
            (defaultValues["requestCreatedTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestCreatedTime"], context) :
                null) :
            null;

        context["field"] = "actionPerformed";
        context["metadata"] = (objectMetadata ? objectMetadata["actionPerformed"] : null);
        privateState.actionPerformed = defaultValues ?
            (defaultValues["actionPerformed"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actionPerformed"], context) :
                null) :
            null;

        context["field"] = "requestDate";
        context["metadata"] = (objectMetadata ? objectMetadata["requestDate"] : null);
        privateState.requestDate = defaultValues ?
            (defaultValues["requestDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestDate"], context) :
                null) :
            null;

        context["field"] = "serviceReqId";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceReqId"] : null);
        privateState.serviceReqId = defaultValues ?
            (defaultValues["serviceReqId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceReqId"], context) :
                null) :
            null;

        context["field"] = "partyId";
        context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
        privateState.partyId = defaultValues ?
            (defaultValues["partyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyId"], context) :
                null) :
            null;

        context["field"] = "errorDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["errorDetails"] : null);
        privateState.errorDetails = defaultValues ?
            (defaultValues["errorDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorDetails"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "id": {
                get: function() {
                    context["field"] = "id";
                    context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id, context);
                },
                set: function(val) {
                    setterFunctions['id'].call(this, val, privateState);
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
            "subType": {
                get: function() {
                    context["field"] = "subType";
                    context["metadata"] = (objectMetadata ? objectMetadata["subType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.subType, context);
                },
                set: function(val) {
                    setterFunctions['subType'].call(this, val, privateState);
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
            "dateTo": {
                get: function() {
                    context["field"] = "dateTo";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateTo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateTo, context);
                },
                set: function(val) {
                    setterFunctions['dateTo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateFrom": {
                get: function() {
                    context["field"] = "dateFrom";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateFrom"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateFrom, context);
                },
                set: function(val) {
                    setterFunctions['dateFrom'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceReqStatus": {
                get: function() {
                    context["field"] = "serviceReqStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceReqStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceReqStatus, context);
                },
                set: function(val) {
                    setterFunctions['serviceReqStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currrentSignatoryApprovedCount": {
                get: function() {
                    context["field"] = "currrentSignatoryApprovedCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["currrentSignatoryApprovedCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currrentSignatoryApprovedCount, context);
                },
                set: function(val) {
                    setterFunctions['currrentSignatoryApprovedCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceReqProcessedTime": {
                get: function() {
                    context["field"] = "serviceReqProcessedTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceReqProcessedTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceReqProcessedTime, context);
                },
                set: function(val) {
                    setterFunctions['serviceReqProcessedTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentAttempt": {
                get: function() {
                    context["field"] = "currentAttempt";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentAttempt"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentAttempt, context);
                },
                set: function(val) {
                    setterFunctions['currentAttempt'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "signatoryApprovalRequired": {
                get: function() {
                    context["field"] = "signatoryApprovalRequired";
                    context["metadata"] = (objectMetadata ? objectMetadata["signatoryApprovalRequired"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signatoryApprovalRequired, context);
                },
                set: function(val) {
                    setterFunctions['signatoryApprovalRequired'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "internalStatus": {
                get: function() {
                    context["field"] = "internalStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["internalStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.internalStatus, context);
                },
                set: function(val) {
                    setterFunctions['internalStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentSignatoryRejectCount": {
                get: function() {
                    context["field"] = "currentSignatoryRejectCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentSignatoryRejectCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentSignatoryRejectCount, context);
                },
                set: function(val) {
                    setterFunctions['currentSignatoryRejectCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "externalserviceReqRef": {
                get: function() {
                    context["field"] = "externalserviceReqRef";
                    context["metadata"] = (objectMetadata ? objectMetadata["externalserviceReqRef"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.externalserviceReqRef, context);
                },
                set: function(val) {
                    setterFunctions['externalserviceReqRef'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestConfigId": {
                get: function() {
                    context["field"] = "requestConfigId";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestConfigId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestConfigId, context);
                },
                set: function(val) {
                    setterFunctions['requestConfigId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestCreatedTime": {
                get: function() {
                    context["field"] = "requestCreatedTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestCreatedTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestCreatedTime, context);
                },
                set: function(val) {
                    setterFunctions['requestCreatedTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "actionPerformed": {
                get: function() {
                    context["field"] = "actionPerformed";
                    context["metadata"] = (objectMetadata ? objectMetadata["actionPerformed"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actionPerformed, context);
                },
                set: function(val) {
                    setterFunctions['actionPerformed'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestDate": {
                get: function() {
                    context["field"] = "requestDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestDate, context);
                },
                set: function(val) {
                    setterFunctions['requestDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceReqId": {
                get: function() {
                    context["field"] = "serviceReqId";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceReqId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceReqId, context);
                },
                set: function(val) {
                    setterFunctions['serviceReqId'].call(this, val, privateState);
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
            "errorDetails": {
                get: function() {
                    context["field"] = "errorDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorDetails, context);
                },
                set: function(val) {
                    setterFunctions['errorDetails'].call(this, val, privateState);
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
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.accountId = value ? (value["accountId"] ? value["accountId"] : null) : null;
            privateState.subType = value ? (value["subType"] ? value["subType"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.dateTo = value ? (value["dateTo"] ? value["dateTo"] : null) : null;
            privateState.dateFrom = value ? (value["dateFrom"] ? value["dateFrom"] : null) : null;
            privateState.serviceReqStatus = value ? (value["serviceReqStatus"] ? value["serviceReqStatus"] : null) : null;
            privateState.currrentSignatoryApprovedCount = value ? (value["currrentSignatoryApprovedCount"] ? value["currrentSignatoryApprovedCount"] : null) : null;
            privateState.serviceReqProcessedTime = value ? (value["serviceReqProcessedTime"] ? value["serviceReqProcessedTime"] : null) : null;
            privateState.currentAttempt = value ? (value["currentAttempt"] ? value["currentAttempt"] : null) : null;
            privateState.signatoryApprovalRequired = value ? (value["signatoryApprovalRequired"] ? value["signatoryApprovalRequired"] : null) : null;
            privateState.internalStatus = value ? (value["internalStatus"] ? value["internalStatus"] : null) : null;
            privateState.currentSignatoryRejectCount = value ? (value["currentSignatoryRejectCount"] ? value["currentSignatoryRejectCount"] : null) : null;
            privateState.externalserviceReqRef = value ? (value["externalserviceReqRef"] ? value["externalserviceReqRef"] : null) : null;
            privateState.requestConfigId = value ? (value["requestConfigId"] ? value["requestConfigId"] : null) : null;
            privateState.requestCreatedTime = value ? (value["requestCreatedTime"] ? value["requestCreatedTime"] : null) : null;
            privateState.actionPerformed = value ? (value["actionPerformed"] ? value["actionPerformed"] : null) : null;
            privateState.requestDate = value ? (value["requestDate"] ? value["requestDate"] : null) : null;
            privateState.serviceReqId = value ? (value["serviceReqId"] ? value["serviceReqId"] : null) : null;
            privateState.partyId = value ? (value["partyId"] ? value["partyId"] : null) : null;
            privateState.errorDetails = value ? (value["errorDetails"] ? value["errorDetails"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ServiceRequest);

    //Create new class level validator object
    BaseModel.Validator.call(ServiceRequest);

    var registerValidatorBackup = ServiceRequest.registerValidator;

    ServiceRequest.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ServiceRequest.isValid(this, propName, val)) {
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
    //For Operation 'getDetails' with service id 'getServiceRequestDetails4419'
     ServiceRequest.getDetails = function(params, onCompletion){
        return ServiceRequest.customVerb('getDetails', params, onCompletion);
     };

    var relations = [];

    ServiceRequest.relations = relations;

    ServiceRequest.prototype.isValid = function() {
        return ServiceRequest.isValid(this);
    };

    ServiceRequest.prototype.objModelName = "ServiceRequest";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ServiceRequest.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ServiceRequestManagement", "ServiceRequest", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ServiceRequest.clone = function(objectToClone) {
        var clonedObj = new ServiceRequest();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ServiceRequest;
});