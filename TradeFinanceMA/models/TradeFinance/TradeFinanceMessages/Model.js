/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "TradeFinanceMessages", "objectService" : "TradeFinance"};

    var setterFunctions = {
        createdby: function(val, state) {
            context["field"] = "createdby";
            context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
            state['createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountid: function(val, state) {
            context["field"] = "accountid";
            context["metadata"] = (objectMetadata ? objectMetadata["accountid"] : null);
            state['accountid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customer_id: function(val, state) {
            context["field"] = "customer_id";
            context["metadata"] = (objectMetadata ? objectMetadata["customer_id"] : null);
            state['customer_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        filename: function(val, state) {
            context["field"] = "filename";
            context["metadata"] = (objectMetadata ? objectMetadata["filename"] : null);
            state['filename'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        harddelete: function(val, state) {
            context["field"] = "harddelete";
            context["metadata"] = (objectMetadata ? objectMetadata["harddelete"] : null);
            state['harddelete'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        markallasread: function(val, state) {
            context["field"] = "markallasread";
            context["metadata"] = (objectMetadata ? objectMetadata["markallasread"] : null);
            state['markallasread'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        media_id: function(val, state) {
            context["field"] = "media_id";
            context["metadata"] = (objectMetadata ? objectMetadata["media_id"] : null);
            state['media_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messagedescription: function(val, state) {
            context["field"] = "messagedescription";
            context["metadata"] = (objectMetadata ? objectMetadata["messagedescription"] : null);
            state['messagedescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modifiedby: function(val, state) {
            context["field"] = "modifiedby";
            context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
            state['modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        priority: function(val, state) {
            context["field"] = "priority";
            context["metadata"] = (objectMetadata ? objectMetadata["priority"] : null);
            state['priority'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestsubject: function(val, state) {
            context["field"] = "requestsubject";
            context["metadata"] = (objectMetadata ? objectMetadata["requestsubject"] : null);
            state['requestsubject'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softdelete: function(val, state) {
            context["field"] = "softdelete";
            context["metadata"] = (objectMetadata ? objectMetadata["softdelete"] : null);
            state['softdelete'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softDeleteFlag: function(val, state) {
            context["field"] = "softDeleteFlag";
            context["metadata"] = (objectMetadata ? objectMetadata["softDeleteFlag"] : null);
            state['softDeleteFlag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status: function(val, state) {
            context["field"] = "Status";
            context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
            state['Status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        username: function(val, state) {
            context["field"] = "username";
            context["metadata"] = (objectMetadata ? objectMetadata["username"] : null);
            state['username'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requeststatus: function(val, state) {
            context["field"] = "requeststatus";
            context["metadata"] = (objectMetadata ? objectMetadata["requeststatus"] : null);
            state['requeststatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        request_id: function(val, state) {
            context["field"] = "request_id";
            context["metadata"] = (objectMetadata ? objectMetadata["request_id"] : null);
            state['request_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestcategory_id: function(val, state) {
            context["field"] = "requestcategory_id";
            context["metadata"] = (objectMetadata ? objectMetadata["requestcategory_id"] : null);
            state['requestcategory_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function TradeFinanceMessages(defaultValues) {
        var privateState = {};
        context["field"] = "createdby";
        context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
        privateState.createdby = defaultValues ?
            (defaultValues["createdby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context) :
                null) :
            null;

        context["field"] = "accountid";
        context["metadata"] = (objectMetadata ? objectMetadata["accountid"] : null);
        privateState.accountid = defaultValues ?
            (defaultValues["accountid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountid"], context) :
                null) :
            null;

        context["field"] = "customer_id";
        context["metadata"] = (objectMetadata ? objectMetadata["customer_id"] : null);
        privateState.customer_id = defaultValues ?
            (defaultValues["customer_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customer_id"], context) :
                null) :
            null;

        context["field"] = "filename";
        context["metadata"] = (objectMetadata ? objectMetadata["filename"] : null);
        privateState.filename = defaultValues ?
            (defaultValues["filename"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["filename"], context) :
                null) :
            null;

        context["field"] = "harddelete";
        context["metadata"] = (objectMetadata ? objectMetadata["harddelete"] : null);
        privateState.harddelete = defaultValues ?
            (defaultValues["harddelete"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["harddelete"], context) :
                null) :
            null;

        context["field"] = "markallasread";
        context["metadata"] = (objectMetadata ? objectMetadata["markallasread"] : null);
        privateState.markallasread = defaultValues ?
            (defaultValues["markallasread"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["markallasread"], context) :
                null) :
            null;

        context["field"] = "media_id";
        context["metadata"] = (objectMetadata ? objectMetadata["media_id"] : null);
        privateState.media_id = defaultValues ?
            (defaultValues["media_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["media_id"], context) :
                null) :
            null;

        context["field"] = "messagedescription";
        context["metadata"] = (objectMetadata ? objectMetadata["messagedescription"] : null);
        privateState.messagedescription = defaultValues ?
            (defaultValues["messagedescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messagedescription"], context) :
                null) :
            null;

        context["field"] = "modifiedby";
        context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
        privateState.modifiedby = defaultValues ?
            (defaultValues["modifiedby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context) :
                null) :
            null;

        context["field"] = "priority";
        context["metadata"] = (objectMetadata ? objectMetadata["priority"] : null);
        privateState.priority = defaultValues ?
            (defaultValues["priority"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["priority"], context) :
                null) :
            null;

        context["field"] = "requestsubject";
        context["metadata"] = (objectMetadata ? objectMetadata["requestsubject"] : null);
        privateState.requestsubject = defaultValues ?
            (defaultValues["requestsubject"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestsubject"], context) :
                null) :
            null;

        context["field"] = "softdelete";
        context["metadata"] = (objectMetadata ? objectMetadata["softdelete"] : null);
        privateState.softdelete = defaultValues ?
            (defaultValues["softdelete"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softdelete"], context) :
                null) :
            null;

        context["field"] = "softDeleteFlag";
        context["metadata"] = (objectMetadata ? objectMetadata["softDeleteFlag"] : null);
        privateState.softDeleteFlag = defaultValues ?
            (defaultValues["softDeleteFlag"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softDeleteFlag"], context) :
                null) :
            null;

        context["field"] = "Status";
        context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
        privateState.Status = defaultValues ?
            (defaultValues["Status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status"], context) :
                null) :
            null;

        context["field"] = "username";
        context["metadata"] = (objectMetadata ? objectMetadata["username"] : null);
        privateState.username = defaultValues ?
            (defaultValues["username"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["username"], context) :
                null) :
            null;

        context["field"] = "requeststatus";
        context["metadata"] = (objectMetadata ? objectMetadata["requeststatus"] : null);
        privateState.requeststatus = defaultValues ?
            (defaultValues["requeststatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requeststatus"], context) :
                null) :
            null;

        context["field"] = "request_id";
        context["metadata"] = (objectMetadata ? objectMetadata["request_id"] : null);
        privateState.request_id = defaultValues ?
            (defaultValues["request_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["request_id"], context) :
                null) :
            null;

        context["field"] = "requestcategory_id";
        context["metadata"] = (objectMetadata ? objectMetadata["requestcategory_id"] : null);
        privateState.requestcategory_id = defaultValues ?
            (defaultValues["requestcategory_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestcategory_id"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "accountid": {
                get: function() {
                    context["field"] = "accountid";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountid, context);
                },
                set: function(val) {
                    setterFunctions['accountid'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customer_id": {
                get: function() {
                    context["field"] = "customer_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["customer_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customer_id, context);
                },
                set: function(val) {
                    setterFunctions['customer_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "filename": {
                get: function() {
                    context["field"] = "filename";
                    context["metadata"] = (objectMetadata ? objectMetadata["filename"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.filename, context);
                },
                set: function(val) {
                    setterFunctions['filename'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "harddelete": {
                get: function() {
                    context["field"] = "harddelete";
                    context["metadata"] = (objectMetadata ? objectMetadata["harddelete"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.harddelete, context);
                },
                set: function(val) {
                    setterFunctions['harddelete'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "markallasread": {
                get: function() {
                    context["field"] = "markallasread";
                    context["metadata"] = (objectMetadata ? objectMetadata["markallasread"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.markallasread, context);
                },
                set: function(val) {
                    setterFunctions['markallasread'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "media_id": {
                get: function() {
                    context["field"] = "media_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["media_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.media_id, context);
                },
                set: function(val) {
                    setterFunctions['media_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "messagedescription": {
                get: function() {
                    context["field"] = "messagedescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["messagedescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messagedescription, context);
                },
                set: function(val) {
                    setterFunctions['messagedescription'].call(this, val, privateState);
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
            "priority": {
                get: function() {
                    context["field"] = "priority";
                    context["metadata"] = (objectMetadata ? objectMetadata["priority"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.priority, context);
                },
                set: function(val) {
                    setterFunctions['priority'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestsubject": {
                get: function() {
                    context["field"] = "requestsubject";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestsubject"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestsubject, context);
                },
                set: function(val) {
                    setterFunctions['requestsubject'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "softdelete": {
                get: function() {
                    context["field"] = "softdelete";
                    context["metadata"] = (objectMetadata ? objectMetadata["softdelete"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.softdelete, context);
                },
                set: function(val) {
                    setterFunctions['softdelete'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "softDeleteFlag": {
                get: function() {
                    context["field"] = "softDeleteFlag";
                    context["metadata"] = (objectMetadata ? objectMetadata["softDeleteFlag"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.softDeleteFlag, context);
                },
                set: function(val) {
                    setterFunctions['softDeleteFlag'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Status": {
                get: function() {
                    context["field"] = "Status";
                    context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Status, context);
                },
                set: function(val) {
                    setterFunctions['Status'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "username": {
                get: function() {
                    context["field"] = "username";
                    context["metadata"] = (objectMetadata ? objectMetadata["username"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.username, context);
                },
                set: function(val) {
                    setterFunctions['username'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requeststatus": {
                get: function() {
                    context["field"] = "requeststatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["requeststatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requeststatus, context);
                },
                set: function(val) {
                    setterFunctions['requeststatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "request_id": {
                get: function() {
                    context["field"] = "request_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["request_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.request_id, context);
                },
                set: function(val) {
                    setterFunctions['request_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestcategory_id": {
                get: function() {
                    context["field"] = "requestcategory_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestcategory_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestcategory_id, context);
                },
                set: function(val) {
                    setterFunctions['requestcategory_id'].call(this, val, privateState);
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
            privateState.createdby = value ? (value["createdby"] ? value["createdby"] : null) : null;
            privateState.accountid = value ? (value["accountid"] ? value["accountid"] : null) : null;
            privateState.customer_id = value ? (value["customer_id"] ? value["customer_id"] : null) : null;
            privateState.filename = value ? (value["filename"] ? value["filename"] : null) : null;
            privateState.harddelete = value ? (value["harddelete"] ? value["harddelete"] : null) : null;
            privateState.markallasread = value ? (value["markallasread"] ? value["markallasread"] : null) : null;
            privateState.media_id = value ? (value["media_id"] ? value["media_id"] : null) : null;
            privateState.messagedescription = value ? (value["messagedescription"] ? value["messagedescription"] : null) : null;
            privateState.modifiedby = value ? (value["modifiedby"] ? value["modifiedby"] : null) : null;
            privateState.priority = value ? (value["priority"] ? value["priority"] : null) : null;
            privateState.requestsubject = value ? (value["requestsubject"] ? value["requestsubject"] : null) : null;
            privateState.softdelete = value ? (value["softdelete"] ? value["softdelete"] : null) : null;
            privateState.softDeleteFlag = value ? (value["softDeleteFlag"] ? value["softDeleteFlag"] : null) : null;
            privateState.Status = value ? (value["Status"] ? value["Status"] : null) : null;
            privateState.username = value ? (value["username"] ? value["username"] : null) : null;
            privateState.requeststatus = value ? (value["requeststatus"] ? value["requeststatus"] : null) : null;
            privateState.request_id = value ? (value["request_id"] ? value["request_id"] : null) : null;
            privateState.requestcategory_id = value ? (value["requestcategory_id"] ? value["requestcategory_id"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(TradeFinanceMessages);

    //Create new class level validator object
    BaseModel.Validator.call(TradeFinanceMessages);

    var registerValidatorBackup = TradeFinanceMessages.registerValidator;

    TradeFinanceMessages.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(TradeFinanceMessages.isValid(this, propName, val)) {
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
    //For Operation 'createRequest' with service id 'CreateRequest1305'
     TradeFinanceMessages.createRequest = function(params, onCompletion){
        return TradeFinanceMessages.customVerb('createRequest', params, onCompletion);
     };

    var relations = [];

    TradeFinanceMessages.relations = relations;

    TradeFinanceMessages.prototype.isValid = function() {
        return TradeFinanceMessages.isValid(this);
    };

    TradeFinanceMessages.prototype.objModelName = "TradeFinanceMessages";
    TradeFinanceMessages.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    TradeFinanceMessages.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "TradeFinanceMessages", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    TradeFinanceMessages.clone = function(objectToClone) {
        var clonedObj = new TradeFinanceMessages();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return TradeFinanceMessages;
});