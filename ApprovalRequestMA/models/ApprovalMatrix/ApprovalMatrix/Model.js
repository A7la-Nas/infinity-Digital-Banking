/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ApprovalMatrix", "objectService" : "ApprovalMatrix"};

    var setterFunctions = {
        accountId: function(val, state) {
            context["field"] = "accountId";
            context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
            state['accountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actionId: function(val, state) {
            context["field"] = "actionId";
            context["metadata"] = (objectMetadata ? objectMetadata["actionId"] : null);
            state['actionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        approvalRuleId: function(val, state) {
            context["field"] = "approvalRuleId";
            context["metadata"] = (objectMetadata ? objectMetadata["approvalRuleId"] : null);
            state['approvalRuleId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyId: function(val, state) {
            context["field"] = "companyId";
            context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
            state['companyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        limitTypeId: function(val, state) {
            context["field"] = "limitTypeId";
            context["metadata"] = (objectMetadata ? objectMetadata["limitTypeId"] : null);
            state['limitTypeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lowerlimit: function(val, state) {
            context["field"] = "lowerlimit";
            context["metadata"] = (objectMetadata ? objectMetadata["lowerlimit"] : null);
            state['lowerlimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        upperlimit: function(val, state) {
            context["field"] = "upperlimit";
            context["metadata"] = (objectMetadata ? objectMetadata["upperlimit"] : null);
            state['upperlimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cif: function(val, state) {
            context["field"] = "cif";
            context["metadata"] = (objectMetadata ? objectMetadata["cif"] : null);
            state['cif'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contractId: function(val, state) {
            context["field"] = "contractId";
            context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
            state['contractId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isDisabled: function(val, state) {
            context["field"] = "isDisabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isDisabled"] : null);
            state['isDisabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        disable: function(val, state) {
            context["field"] = "disable";
            context["metadata"] = (objectMetadata ? objectMetadata["disable"] : null);
            state['disable'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isAccountLevel: function(val, state) {
            context["field"] = "isAccountLevel";
            context["metadata"] = (objectMetadata ? objectMetadata["isAccountLevel"] : null);
            state['isAccountLevel'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ApprovalMatrix(defaultValues) {
        var privateState = {};
        context["field"] = "accountId";
        context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
        privateState.accountId = defaultValues ?
            (defaultValues["accountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountId"], context) :
                null) :
            null;

        context["field"] = "actionId";
        context["metadata"] = (objectMetadata ? objectMetadata["actionId"] : null);
        privateState.actionId = defaultValues ?
            (defaultValues["actionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actionId"], context) :
                null) :
            null;

        context["field"] = "approvalRuleId";
        context["metadata"] = (objectMetadata ? objectMetadata["approvalRuleId"] : null);
        privateState.approvalRuleId = defaultValues ?
            (defaultValues["approvalRuleId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["approvalRuleId"], context) :
                null) :
            null;

        context["field"] = "companyId";
        context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
        privateState.companyId = defaultValues ?
            (defaultValues["companyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyId"], context) :
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

        context["field"] = "limitTypeId";
        context["metadata"] = (objectMetadata ? objectMetadata["limitTypeId"] : null);
        privateState.limitTypeId = defaultValues ?
            (defaultValues["limitTypeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitTypeId"], context) :
                null) :
            null;

        context["field"] = "lowerlimit";
        context["metadata"] = (objectMetadata ? objectMetadata["lowerlimit"] : null);
        privateState.lowerlimit = defaultValues ?
            (defaultValues["lowerlimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lowerlimit"], context) :
                null) :
            null;

        context["field"] = "upperlimit";
        context["metadata"] = (objectMetadata ? objectMetadata["upperlimit"] : null);
        privateState.upperlimit = defaultValues ?
            (defaultValues["upperlimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["upperlimit"], context) :
                null) :
            null;

        context["field"] = "cif";
        context["metadata"] = (objectMetadata ? objectMetadata["cif"] : null);
        privateState.cif = defaultValues ?
            (defaultValues["cif"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cif"], context) :
                null) :
            null;

        context["field"] = "contractId";
        context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
        privateState.contractId = defaultValues ?
            (defaultValues["contractId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contractId"], context) :
                null) :
            null;

        context["field"] = "isDisabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isDisabled"] : null);
        privateState.isDisabled = defaultValues ?
            (defaultValues["isDisabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isDisabled"], context) :
                null) :
            null;

        context["field"] = "disable";
        context["metadata"] = (objectMetadata ? objectMetadata["disable"] : null);
        privateState.disable = defaultValues ?
            (defaultValues["disable"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["disable"], context) :
                null) :
            null;

        context["field"] = "isAccountLevel";
        context["metadata"] = (objectMetadata ? objectMetadata["isAccountLevel"] : null);
        privateState.isAccountLevel = defaultValues ?
            (defaultValues["isAccountLevel"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isAccountLevel"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "actionId": {
                get: function() {
                    context["field"] = "actionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["actionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actionId, context);
                },
                set: function(val) {
                    setterFunctions['actionId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "approvalRuleId": {
                get: function() {
                    context["field"] = "approvalRuleId";
                    context["metadata"] = (objectMetadata ? objectMetadata["approvalRuleId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.approvalRuleId, context);
                },
                set: function(val) {
                    setterFunctions['approvalRuleId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companyId": {
                get: function() {
                    context["field"] = "companyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companyId, context);
                },
                set: function(val) {
                    setterFunctions['companyId'].call(this, val, privateState);
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
            "limitTypeId": {
                get: function() {
                    context["field"] = "limitTypeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitTypeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitTypeId, context);
                },
                set: function(val) {
                    setterFunctions['limitTypeId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lowerlimit": {
                get: function() {
                    context["field"] = "lowerlimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["lowerlimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lowerlimit, context);
                },
                set: function(val) {
                    setterFunctions['lowerlimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "upperlimit": {
                get: function() {
                    context["field"] = "upperlimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["upperlimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.upperlimit, context);
                },
                set: function(val) {
                    setterFunctions['upperlimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cif": {
                get: function() {
                    context["field"] = "cif";
                    context["metadata"] = (objectMetadata ? objectMetadata["cif"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cif, context);
                },
                set: function(val) {
                    setterFunctions['cif'].call(this, val, privateState);
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
            "isDisabled": {
                get: function() {
                    context["field"] = "isDisabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isDisabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isDisabled, context);
                },
                set: function(val) {
                    setterFunctions['isDisabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "disable": {
                get: function() {
                    context["field"] = "disable";
                    context["metadata"] = (objectMetadata ? objectMetadata["disable"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.disable, context);
                },
                set: function(val) {
                    setterFunctions['disable'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isAccountLevel": {
                get: function() {
                    context["field"] = "isAccountLevel";
                    context["metadata"] = (objectMetadata ? objectMetadata["isAccountLevel"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isAccountLevel, context);
                },
                set: function(val) {
                    setterFunctions['isAccountLevel'].call(this, val, privateState);
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
            privateState.accountId = value ? (value["accountId"] ? value["accountId"] : null) : null;
            privateState.actionId = value ? (value["actionId"] ? value["actionId"] : null) : null;
            privateState.approvalRuleId = value ? (value["approvalRuleId"] ? value["approvalRuleId"] : null) : null;
            privateState.companyId = value ? (value["companyId"] ? value["companyId"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.limitTypeId = value ? (value["limitTypeId"] ? value["limitTypeId"] : null) : null;
            privateState.lowerlimit = value ? (value["lowerlimit"] ? value["lowerlimit"] : null) : null;
            privateState.upperlimit = value ? (value["upperlimit"] ? value["upperlimit"] : null) : null;
            privateState.cif = value ? (value["cif"] ? value["cif"] : null) : null;
            privateState.contractId = value ? (value["contractId"] ? value["contractId"] : null) : null;
            privateState.isDisabled = value ? (value["isDisabled"] ? value["isDisabled"] : null) : null;
            privateState.disable = value ? (value["disable"] ? value["disable"] : null) : null;
            privateState.isAccountLevel = value ? (value["isAccountLevel"] ? value["isAccountLevel"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ApprovalMatrix);

    //Create new class level validator object
    BaseModel.Validator.call(ApprovalMatrix);

    var registerValidatorBackup = ApprovalMatrix.registerValidator;

    ApprovalMatrix.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ApprovalMatrix.isValid(this, propName, val)) {
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
    //For Operation 'updateApprovalMatrixStatus' with service id 'updateApprovalMatrixStatus5809'
     ApprovalMatrix.updateApprovalMatrixStatus = function(params, onCompletion){
        return ApprovalMatrix.customVerb('updateApprovalMatrixStatus', params, onCompletion);
     };

    //For Operation 'getApprovalMatrix' with service id 'fetchApprovalMatrix5483'
     ApprovalMatrix.getApprovalMatrix = function(params, onCompletion){
        return ApprovalMatrix.customVerb('getApprovalMatrix', params, onCompletion);
     };

    //For Operation 'getApprovalMatrixByContractId' with service id 'fetchApprovalMatrixByContractId1145'
     ApprovalMatrix.getApprovalMatrixByContractId = function(params, onCompletion){
        return ApprovalMatrix.customVerb('getApprovalMatrixByContractId', params, onCompletion);
     };

    //For Operation 'isApprovalMatrixDisabled' with service id 'isApprovalMatrixDisabled2643'
     ApprovalMatrix.isApprovalMatrixDisabled = function(params, onCompletion){
        return ApprovalMatrix.customVerb('isApprovalMatrixDisabled', params, onCompletion);
     };

    //For Operation 'updateApprovalMatrix' with service id 'UpdateApprovalMatrixService4926'
     ApprovalMatrix.updateApprovalMatrix = function(params, onCompletion){
        return ApprovalMatrix.customVerb('updateApprovalMatrix', params, onCompletion);
     };

    var relations = [];

    ApprovalMatrix.relations = relations;

    ApprovalMatrix.prototype.isValid = function() {
        return ApprovalMatrix.isValid(this);
    };

    ApprovalMatrix.prototype.objModelName = "ApprovalMatrix";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ApprovalMatrix.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ApprovalMatrix", "ApprovalMatrix", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ApprovalMatrix.clone = function(objectToClone) {
        var clonedObj = new ApprovalMatrix();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ApprovalMatrix;
});