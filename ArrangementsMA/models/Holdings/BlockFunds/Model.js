/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "BlockFunds", "objectService" : "Holdings"};

    var setterFunctions = {
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchEndDate: function(val, state) {
            context["field"] = "searchEndDate";
            context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
            state['searchEndDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchStartDate: function(val, state) {
            context["field"] = "searchStartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
            state['searchStartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromDate: function(val, state) {
            context["field"] = "fromDate";
            context["metadata"] = (objectMetadata ? objectMetadata["fromDate"] : null);
            state['fromDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toDate: function(val, state) {
            context["field"] = "toDate";
            context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
            state['toDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lockedAmount: function(val, state) {
            context["field"] = "lockedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["lockedAmount"] : null);
            state['lockedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionReference: function(val, state) {
            context["field"] = "transactionReference";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
            state['transactionReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lockReason: function(val, state) {
            context["field"] = "lockReason";
            context["metadata"] = (objectMetadata ? objectMetadata["lockReason"] : null);
            state['lockReason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lockedEventId: function(val, state) {
            context["field"] = "lockedEventId";
            context["metadata"] = (objectMetadata ? objectMetadata["lockedEventId"] : null);
            state['lockedEventId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalSize: function(val, state) {
            context["field"] = "totalSize";
            context["metadata"] = (objectMetadata ? objectMetadata["totalSize"] : null);
            state['totalSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageSize: function(val, state) {
            context["field"] = "pageSize";
            context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
            state['pageSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageStart: function(val, state) {
            context["field"] = "pageStart";
            context["metadata"] = (objectMetadata ? objectMetadata["pageStart"] : null);
            state['pageStart'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pendingApproval: function(val, state) {
            context["field"] = "pendingApproval";
            context["metadata"] = (objectMetadata ? objectMetadata["pendingApproval"] : null);
            state['pendingApproval'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        stopReason: function(val, state) {
            context["field"] = "stopReason";
            context["metadata"] = (objectMetadata ? objectMetadata["stopReason"] : null);
            state['stopReason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        stopInstructionChannel: function(val, state) {
            context["field"] = "stopInstructionChannel";
            context["metadata"] = (objectMetadata ? objectMetadata["stopInstructionChannel"] : null);
            state['stopInstructionChannel'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function BlockFunds(defaultValues) {
        var privateState = {};
        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "searchEndDate";
        context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
        privateState.searchEndDate = defaultValues ?
            (defaultValues["searchEndDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchEndDate"], context) :
                null) :
            null;

        context["field"] = "searchStartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
        privateState.searchStartDate = defaultValues ?
            (defaultValues["searchStartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchStartDate"], context) :
                null) :
            null;

        context["field"] = "fromDate";
        context["metadata"] = (objectMetadata ? objectMetadata["fromDate"] : null);
        privateState.fromDate = defaultValues ?
            (defaultValues["fromDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromDate"], context) :
                null) :
            null;

        context["field"] = "toDate";
        context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
        privateState.toDate = defaultValues ?
            (defaultValues["toDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toDate"], context) :
                null) :
            null;

        context["field"] = "lockedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["lockedAmount"] : null);
        privateState.lockedAmount = defaultValues ?
            (defaultValues["lockedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lockedAmount"], context) :
                null) :
            null;

        context["field"] = "transactionReference";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
        privateState.transactionReference = defaultValues ?
            (defaultValues["transactionReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionReference"], context) :
                null) :
            null;

        context["field"] = "lockReason";
        context["metadata"] = (objectMetadata ? objectMetadata["lockReason"] : null);
        privateState.lockReason = defaultValues ?
            (defaultValues["lockReason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lockReason"], context) :
                null) :
            null;

        context["field"] = "lockedEventId";
        context["metadata"] = (objectMetadata ? objectMetadata["lockedEventId"] : null);
        privateState.lockedEventId = defaultValues ?
            (defaultValues["lockedEventId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lockedEventId"], context) :
                null) :
            null;

        context["field"] = "totalSize";
        context["metadata"] = (objectMetadata ? objectMetadata["totalSize"] : null);
        privateState.totalSize = defaultValues ?
            (defaultValues["totalSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalSize"], context) :
                null) :
            null;

        context["field"] = "pageSize";
        context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
        privateState.pageSize = defaultValues ?
            (defaultValues["pageSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageSize"], context) :
                null) :
            null;

        context["field"] = "pageStart";
        context["metadata"] = (objectMetadata ? objectMetadata["pageStart"] : null);
        privateState.pageStart = defaultValues ?
            (defaultValues["pageStart"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageStart"], context) :
                null) :
            null;

        context["field"] = "pendingApproval";
        context["metadata"] = (objectMetadata ? objectMetadata["pendingApproval"] : null);
        privateState.pendingApproval = defaultValues ?
            (defaultValues["pendingApproval"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pendingApproval"], context) :
                null) :
            null;

        context["field"] = "stopReason";
        context["metadata"] = (objectMetadata ? objectMetadata["stopReason"] : null);
        privateState.stopReason = defaultValues ?
            (defaultValues["stopReason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["stopReason"], context) :
                null) :
            null;

        context["field"] = "stopInstructionChannel";
        context["metadata"] = (objectMetadata ? objectMetadata["stopInstructionChannel"] : null);
        privateState.stopInstructionChannel = defaultValues ?
            (defaultValues["stopInstructionChannel"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["stopInstructionChannel"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "accountID": {
                get: function() {
                    context["field"] = "accountID";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountID, context);
                },
                set: function(val) {
                    setterFunctions['accountID'].call(this, val, privateState);
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
            "searchEndDate": {
                get: function() {
                    context["field"] = "searchEndDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchEndDate, context);
                },
                set: function(val) {
                    setterFunctions['searchEndDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchStartDate": {
                get: function() {
                    context["field"] = "searchStartDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchStartDate, context);
                },
                set: function(val) {
                    setterFunctions['searchStartDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromDate": {
                get: function() {
                    context["field"] = "fromDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromDate, context);
                },
                set: function(val) {
                    setterFunctions['fromDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "toDate": {
                get: function() {
                    context["field"] = "toDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toDate, context);
                },
                set: function(val) {
                    setterFunctions['toDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lockedAmount": {
                get: function() {
                    context["field"] = "lockedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["lockedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lockedAmount, context);
                },
                set: function(val) {
                    setterFunctions['lockedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionReference": {
                get: function() {
                    context["field"] = "transactionReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionReference, context);
                },
                set: function(val) {
                    setterFunctions['transactionReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lockReason": {
                get: function() {
                    context["field"] = "lockReason";
                    context["metadata"] = (objectMetadata ? objectMetadata["lockReason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lockReason, context);
                },
                set: function(val) {
                    setterFunctions['lockReason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lockedEventId": {
                get: function() {
                    context["field"] = "lockedEventId";
                    context["metadata"] = (objectMetadata ? objectMetadata["lockedEventId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lockedEventId, context);
                },
                set: function(val) {
                    setterFunctions['lockedEventId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalSize": {
                get: function() {
                    context["field"] = "totalSize";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalSize"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalSize, context);
                },
                set: function(val) {
                    setterFunctions['totalSize'].call(this, val, privateState);
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
            "pageStart": {
                get: function() {
                    context["field"] = "pageStart";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageStart"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageStart, context);
                },
                set: function(val) {
                    setterFunctions['pageStart'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pendingApproval": {
                get: function() {
                    context["field"] = "pendingApproval";
                    context["metadata"] = (objectMetadata ? objectMetadata["pendingApproval"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pendingApproval, context);
                },
                set: function(val) {
                    setterFunctions['pendingApproval'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "stopReason": {
                get: function() {
                    context["field"] = "stopReason";
                    context["metadata"] = (objectMetadata ? objectMetadata["stopReason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.stopReason, context);
                },
                set: function(val) {
                    setterFunctions['stopReason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "stopInstructionChannel": {
                get: function() {
                    context["field"] = "stopInstructionChannel";
                    context["metadata"] = (objectMetadata ? objectMetadata["stopInstructionChannel"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.stopInstructionChannel, context);
                },
                set: function(val) {
                    setterFunctions['stopInstructionChannel'].call(this, val, privateState);
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
            privateState.accountID = value ? (value["accountID"] ? value["accountID"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.searchEndDate = value ? (value["searchEndDate"] ? value["searchEndDate"] : null) : null;
            privateState.searchStartDate = value ? (value["searchStartDate"] ? value["searchStartDate"] : null) : null;
            privateState.fromDate = value ? (value["fromDate"] ? value["fromDate"] : null) : null;
            privateState.toDate = value ? (value["toDate"] ? value["toDate"] : null) : null;
            privateState.lockedAmount = value ? (value["lockedAmount"] ? value["lockedAmount"] : null) : null;
            privateState.transactionReference = value ? (value["transactionReference"] ? value["transactionReference"] : null) : null;
            privateState.lockReason = value ? (value["lockReason"] ? value["lockReason"] : null) : null;
            privateState.lockedEventId = value ? (value["lockedEventId"] ? value["lockedEventId"] : null) : null;
            privateState.totalSize = value ? (value["totalSize"] ? value["totalSize"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageStart = value ? (value["pageStart"] ? value["pageStart"] : null) : null;
            privateState.pendingApproval = value ? (value["pendingApproval"] ? value["pendingApproval"] : null) : null;
            privateState.stopReason = value ? (value["stopReason"] ? value["stopReason"] : null) : null;
            privateState.stopInstructionChannel = value ? (value["stopInstructionChannel"] ? value["stopInstructionChannel"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(BlockFunds);

    //Create new class level validator object
    BaseModel.Validator.call(BlockFunds);

    var registerValidatorBackup = BlockFunds.registerValidator;

    BlockFunds.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(BlockFunds.isValid(this, propName, val)) {
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
    //For Operation 'getList' with service id 'getBlockedFunds5312'
     BlockFunds.getList = function(params, onCompletion){
        return BlockFunds.customVerb('getList', params, onCompletion);
     };

    var relations = [];

    BlockFunds.relations = relations;

    BlockFunds.prototype.isValid = function() {
        return BlockFunds.isValid(this);
    };

    BlockFunds.prototype.objModelName = "BlockFunds";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    BlockFunds.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Holdings", "BlockFunds", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    BlockFunds.clone = function(objectToClone) {
        var clonedObj = new BlockFunds();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return BlockFunds;
});