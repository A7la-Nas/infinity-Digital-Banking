/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "SignatoryGroup", "objectService" : "SignatoryObject"};

    var setterFunctions = {
        coreCustomerId: function(val, state) {
            context["field"] = "coreCustomerId";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
            state['coreCustomerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signatoryGroupId: function(val, state) {
            context["field"] = "signatoryGroupId";
            context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupId"] : null);
            state['signatoryGroupId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contractId: function(val, state) {
            context["field"] = "contractId";
            context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
            state['contractId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signatoryGroupName: function(val, state) {
            context["field"] = "signatoryGroupName";
            context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupName"] : null);
            state['signatoryGroupName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signatoryGroupDescription: function(val, state) {
            context["field"] = "signatoryGroupDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupDescription"] : null);
            state['signatoryGroupDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdby: function(val, state) {
            context["field"] = "createdby";
            context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
            state['createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modifiedby: function(val, state) {
            context["field"] = "modifiedby";
            context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
            state['modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdts: function(val, state) {
            context["field"] = "createdts";
            context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
            state['createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastmodifiedts: function(val, state) {
            context["field"] = "lastmodifiedts";
            context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
            state['lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerSignatoryGroupId: function(val, state) {
            context["field"] = "customerSignatoryGroupId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerSignatoryGroupId"] : null);
            state['customerSignatoryGroupId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errMessage: function(val, state) {
            context["field"] = "errMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errMessage"] : null);
            state['errMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signatories: function(val, state) {
            context["field"] = "signatories";
            context["metadata"] = (objectMetadata ? objectMetadata["signatories"] : null);
            state['signatories'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signatoryGroups: function(val, state) {
            context["field"] = "signatoryGroups";
            context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroups"] : null);
            state['signatoryGroups'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fullName: function(val, state) {
            context["field"] = "fullName";
            context["metadata"] = (objectMetadata ? objectMetadata["fullName"] : null);
            state['fullName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function SignatoryGroup(defaultValues) {
        var privateState = {};
        context["field"] = "coreCustomerId";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
        privateState.coreCustomerId = defaultValues ?
            (defaultValues["coreCustomerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerId"], context) :
                null) :
            null;

        context["field"] = "signatoryGroupId";
        context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupId"] : null);
        privateState.signatoryGroupId = defaultValues ?
            (defaultValues["signatoryGroupId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signatoryGroupId"], context) :
                null) :
            null;

        context["field"] = "contractId";
        context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
        privateState.contractId = defaultValues ?
            (defaultValues["contractId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contractId"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "signatoryGroupName";
        context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupName"] : null);
        privateState.signatoryGroupName = defaultValues ?
            (defaultValues["signatoryGroupName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signatoryGroupName"], context) :
                null) :
            null;

        context["field"] = "signatoryGroupDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupDescription"] : null);
        privateState.signatoryGroupDescription = defaultValues ?
            (defaultValues["signatoryGroupDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signatoryGroupDescription"], context) :
                null) :
            null;

        context["field"] = "createdby";
        context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
        privateState.createdby = defaultValues ?
            (defaultValues["createdby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context) :
                null) :
            null;

        context["field"] = "modifiedby";
        context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
        privateState.modifiedby = defaultValues ?
            (defaultValues["modifiedby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context) :
                null) :
            null;

        context["field"] = "createdts";
        context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
        privateState.createdts = defaultValues ?
            (defaultValues["createdts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdts"], context) :
                null) :
            null;

        context["field"] = "lastmodifiedts";
        context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
        privateState.lastmodifiedts = defaultValues ?
            (defaultValues["lastmodifiedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastmodifiedts"], context) :
                null) :
            null;

        context["field"] = "customerSignatoryGroupId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerSignatoryGroupId"] : null);
        privateState.customerSignatoryGroupId = defaultValues ?
            (defaultValues["customerSignatoryGroupId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerSignatoryGroupId"], context) :
                null) :
            null;

        context["field"] = "errMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errMessage"] : null);
        privateState.errMessage = defaultValues ?
            (defaultValues["errMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errMessage"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "signatories";
        context["metadata"] = (objectMetadata ? objectMetadata["signatories"] : null);
        privateState.signatories = defaultValues ?
            (defaultValues["signatories"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signatories"], context) :
                null) :
            null;

        context["field"] = "signatoryGroups";
        context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroups"] : null);
        privateState.signatoryGroups = defaultValues ?
            (defaultValues["signatoryGroups"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signatoryGroups"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "fullName";
        context["metadata"] = (objectMetadata ? objectMetadata["fullName"] : null);
        privateState.fullName = defaultValues ?
            (defaultValues["fullName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fullName"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
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
            "signatoryGroupId": {
                get: function() {
                    context["field"] = "signatoryGroupId";
                    context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signatoryGroupId, context);
                },
                set: function(val) {
                    setterFunctions['signatoryGroupId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contractId": {
                get: function() {
                    context["field"] = "contractId";
                    context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contractId, context);
                },
                set: function(val) {
                    setterFunctions['contractId'].call(this, val, privateState);
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
            "signatoryGroupName": {
                get: function() {
                    context["field"] = "signatoryGroupName";
                    context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signatoryGroupName, context);
                },
                set: function(val) {
                    setterFunctions['signatoryGroupName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "signatoryGroupDescription": {
                get: function() {
                    context["field"] = "signatoryGroupDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signatoryGroupDescription, context);
                },
                set: function(val) {
                    setterFunctions['signatoryGroupDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdby": {
                get: function() {
                    context["field"] = "createdby";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdby, context);
                },
                set: function(val) {
                    setterFunctions['createdby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "modifiedby": {
                get: function() {
                    context["field"] = "modifiedby";
                    context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.modifiedby, context);
                },
                set: function(val) {
                    setterFunctions['modifiedby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdts": {
                get: function() {
                    context["field"] = "createdts";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdts, context);
                },
                set: function(val) {
                    setterFunctions['createdts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastmodifiedts": {
                get: function() {
                    context["field"] = "lastmodifiedts";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastmodifiedts, context);
                },
                set: function(val) {
                    setterFunctions['lastmodifiedts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerSignatoryGroupId": {
                get: function() {
                    context["field"] = "customerSignatoryGroupId";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerSignatoryGroupId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerSignatoryGroupId, context);
                },
                set: function(val) {
                    setterFunctions['customerSignatoryGroupId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errMessage": {
                get: function() {
                    context["field"] = "errMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["errMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errMessage, context);
                },
                set: function(val) {
                    setterFunctions['errMessage'].call(this, val, privateState);
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
            "signatories": {
                get: function() {
                    context["field"] = "signatories";
                    context["metadata"] = (objectMetadata ? objectMetadata["signatories"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signatories, context);
                },
                set: function(val) {
                    setterFunctions['signatories'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "signatoryGroups": {
                get: function() {
                    context["field"] = "signatoryGroups";
                    context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroups"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signatoryGroups, context);
                },
                set: function(val) {
                    setterFunctions['signatoryGroups'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userId": {
                get: function() {
                    context["field"] = "userId";
                    context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userId, context);
                },
                set: function(val) {
                    setterFunctions['userId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userName": {
                get: function() {
                    context["field"] = "userName";
                    context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userName, context);
                },
                set: function(val) {
                    setterFunctions['userName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fullName": {
                get: function() {
                    context["field"] = "fullName";
                    context["metadata"] = (objectMetadata ? objectMetadata["fullName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fullName, context);
                },
                set: function(val) {
                    setterFunctions['fullName'].call(this, val, privateState);
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
            privateState.coreCustomerId = value ? (value["coreCustomerId"] ? value["coreCustomerId"] : null) : null;
            privateState.signatoryGroupId = value ? (value["signatoryGroupId"] ? value["signatoryGroupId"] : null) : null;
            privateState.contractId = value ? (value["contractId"] ? value["contractId"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.signatoryGroupName = value ? (value["signatoryGroupName"] ? value["signatoryGroupName"] : null) : null;
            privateState.signatoryGroupDescription = value ? (value["signatoryGroupDescription"] ? value["signatoryGroupDescription"] : null) : null;
            privateState.createdby = value ? (value["createdby"] ? value["createdby"] : null) : null;
            privateState.modifiedby = value ? (value["modifiedby"] ? value["modifiedby"] : null) : null;
            privateState.createdts = value ? (value["createdts"] ? value["createdts"] : null) : null;
            privateState.lastmodifiedts = value ? (value["lastmodifiedts"] ? value["lastmodifiedts"] : null) : null;
            privateState.customerSignatoryGroupId = value ? (value["customerSignatoryGroupId"] ? value["customerSignatoryGroupId"] : null) : null;
            privateState.errMessage = value ? (value["errMessage"] ? value["errMessage"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.signatories = value ? (value["signatories"] ? value["signatories"] : null) : null;
            privateState.signatoryGroups = value ? (value["signatoryGroups"] ? value["signatoryGroups"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.fullName = value ? (value["fullName"] ? value["fullName"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(SignatoryGroup);

    //Create new class level validator object
    BaseModel.Validator.call(SignatoryGroup);

    var registerValidatorBackup = SignatoryGroup.registerValidator;

    SignatoryGroup.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(SignatoryGroup.isValid(this, propName, val)) {
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
    //For Operation 'deleteSignatoryGroup' with service id 'deleteSignatoryGroup6648'
     SignatoryGroup.deleteSignatoryGroup = function(params, onCompletion){
        return SignatoryGroup.customVerb('deleteSignatoryGroup', params, onCompletion);
     };

    //For Operation 'updateSignatoryGroup' with service id 'updateSignatoryGroup8670'
     SignatoryGroup.updateSignatoryGroup = function(params, onCompletion){
        return SignatoryGroup.customVerb('updateSignatoryGroup', params, onCompletion);
     };

    //For Operation 'fetchSignatoryGroupDetails' with service id 'fetchSignatoryGroupDetails6713'
     SignatoryGroup.fetchSignatoryGroupDetails = function(params, onCompletion){
        return SignatoryGroup.customVerb('fetchSignatoryGroupDetails', params, onCompletion);
     };

    //For Operation 'createSignatoryGroup' with service id 'createSignatoryGroup5667'
     SignatoryGroup.createSignatoryGroup = function(params, onCompletion){
        return SignatoryGroup.customVerb('createSignatoryGroup', params, onCompletion);
     };

    //For Operation 'fetchEligibleSignatoryUsers' with service id 'fetchEligibleSignatoryUsers8249'
     SignatoryGroup.fetchEligibleSignatoryUsers = function(params, onCompletion){
        return SignatoryGroup.customVerb('fetchEligibleSignatoryUsers', params, onCompletion);
     };

    //For Operation 'fetchSignatoryGroupsbyCustomerIds' with service id 'fetchSignatoryGroupsbyCustomerIds1646'
     SignatoryGroup.fetchSignatoryGroupsbyCustomerIds = function(params, onCompletion){
        return SignatoryGroup.customVerb('fetchSignatoryGroupsbyCustomerIds', params, onCompletion);
     };

    //For Operation 'isSignatoryGroupEligibleForDelete' with service id 'isSignatoryGroupEligibleForDelete2538'
     SignatoryGroup.isSignatoryGroupEligibleForDelete = function(params, onCompletion){
        return SignatoryGroup.customVerb('isSignatoryGroupEligibleForDelete', params, onCompletion);
     };

    //For Operation 'isSignatoryGroupNameAvailable' with service id 'isSignatoryGroupNameAvailable6167'
     SignatoryGroup.isSignatoryGroupNameAvailable = function(params, onCompletion){
        return SignatoryGroup.customVerb('isSignatoryGroupNameAvailable', params, onCompletion);
     };

    //For Operation 'fetchAllSignatoryGroups' with service id 'fetchAllSignatoryGroups5118'
     SignatoryGroup.fetchAllSignatoryGroups = function(params, onCompletion){
        return SignatoryGroup.customVerb('fetchAllSignatoryGroups', params, onCompletion);
     };

    //For Operation 'fetchSignatoryGroups' with service id 'fetchSignatoryGroups7038'
     SignatoryGroup.fetchSignatoryGroups = function(params, onCompletion){
        return SignatoryGroup.customVerb('fetchSignatoryGroups', params, onCompletion);
     };

    var relations = [];

    SignatoryGroup.relations = relations;

    SignatoryGroup.prototype.isValid = function() {
        return SignatoryGroup.isValid(this);
    };

    SignatoryGroup.prototype.objModelName = "SignatoryGroup";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    SignatoryGroup.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SignatoryObject", "SignatoryGroup", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    SignatoryGroup.clone = function(objectToClone) {
        var clonedObj = new SignatoryGroup();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return SignatoryGroup;
});