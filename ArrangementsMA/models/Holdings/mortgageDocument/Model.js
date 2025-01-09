/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "mortgageDocument", "objectService" : "Holdings"};

    var setterFunctions = {
        authorization: function(val, state) {
            context["field"] = "authorization";
            context["metadata"] = (objectMetadata ? objectMetadata["authorization"] : null);
            state['authorization'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentGroup: function(val, state) {
            context["field"] = "documentGroup";
            context["metadata"] = (objectMetadata ? objectMetadata["documentGroup"] : null);
            state['documentGroup'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ownerSystemId: function(val, state) {
            context["field"] = "ownerSystemId";
            context["metadata"] = (objectMetadata ? objectMetadata["ownerSystemId"] : null);
            state['ownerSystemId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementId: function(val, state) {
            context["field"] = "arrangementId";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
            state['arrangementId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementstatus: function(val, state) {
            context["field"] = "arrangementstatus";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementstatus"] : null);
            state['arrangementstatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ownership: function(val, state) {
            context["field"] = "ownership";
            context["metadata"] = (objectMetadata ? objectMetadata["ownership"] : null);
            state['ownership'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        homeOwnership: function(val, state) {
            context["field"] = "homeOwnership";
            context["metadata"] = (objectMetadata ? objectMetadata["homeOwnership"] : null);
            state['homeOwnership'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountType: function(val, state) {
            context["field"] = "accountType";
            context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
            state['accountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentId: function(val, state) {
            context["field"] = "documentId";
            context["metadata"] = (objectMetadata ? objectMetadata["documentId"] : null);
            state['documentId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentStatus: function(val, state) {
            context["field"] = "documentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
            state['documentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentType: function(val, state) {
            context["field"] = "documentType";
            context["metadata"] = (objectMetadata ? objectMetadata["documentType"] : null);
            state['documentType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentName: function(val, state) {
            context["field"] = "documentName";
            context["metadata"] = (objectMetadata ? objectMetadata["documentName"] : null);
            state['documentName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        metaDocumentName: function(val, state) {
            context["field"] = "metaDocumentName";
            context["metadata"] = (objectMetadata ? objectMetadata["metaDocumentName"] : null);
            state['metaDocumentName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        content: function(val, state) {
            context["field"] = "content";
            context["metadata"] = (objectMetadata ? objectMetadata["content"] : null);
            state['content'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function mortgageDocument(defaultValues) {
        var privateState = {};
        context["field"] = "authorization";
        context["metadata"] = (objectMetadata ? objectMetadata["authorization"] : null);
        privateState.authorization = defaultValues ?
            (defaultValues["authorization"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["authorization"], context) :
                null) :
            null;

        context["field"] = "documentGroup";
        context["metadata"] = (objectMetadata ? objectMetadata["documentGroup"] : null);
        privateState.documentGroup = defaultValues ?
            (defaultValues["documentGroup"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentGroup"], context) :
                null) :
            null;

        context["field"] = "ownerSystemId";
        context["metadata"] = (objectMetadata ? objectMetadata["ownerSystemId"] : null);
        privateState.ownerSystemId = defaultValues ?
            (defaultValues["ownerSystemId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ownerSystemId"], context) :
                null) :
            null;

        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "arrangementId";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
        privateState.arrangementId = defaultValues ?
            (defaultValues["arrangementId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementId"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "arrangementstatus";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementstatus"] : null);
        privateState.arrangementstatus = defaultValues ?
            (defaultValues["arrangementstatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementstatus"], context) :
                null) :
            null;

        context["field"] = "ownership";
        context["metadata"] = (objectMetadata ? objectMetadata["ownership"] : null);
        privateState.ownership = defaultValues ?
            (defaultValues["ownership"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ownership"], context) :
                null) :
            null;

        context["field"] = "homeOwnership";
        context["metadata"] = (objectMetadata ? objectMetadata["homeOwnership"] : null);
        privateState.homeOwnership = defaultValues ?
            (defaultValues["homeOwnership"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["homeOwnership"], context) :
                null) :
            null;

        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
                null) :
            null;

        context["field"] = "accountType";
        context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
        privateState.accountType = defaultValues ?
            (defaultValues["accountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountType"], context) :
                null) :
            null;

        context["field"] = "documentId";
        context["metadata"] = (objectMetadata ? objectMetadata["documentId"] : null);
        privateState.documentId = defaultValues ?
            (defaultValues["documentId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentId"], context) :
                null) :
            null;

        context["field"] = "documentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
        privateState.documentStatus = defaultValues ?
            (defaultValues["documentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentStatus"], context) :
                null) :
            null;

        context["field"] = "documentType";
        context["metadata"] = (objectMetadata ? objectMetadata["documentType"] : null);
        privateState.documentType = defaultValues ?
            (defaultValues["documentType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentType"], context) :
                null) :
            null;

        context["field"] = "documentName";
        context["metadata"] = (objectMetadata ? objectMetadata["documentName"] : null);
        privateState.documentName = defaultValues ?
            (defaultValues["documentName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentName"], context) :
                null) :
            null;

        context["field"] = "metaDocumentName";
        context["metadata"] = (objectMetadata ? objectMetadata["metaDocumentName"] : null);
        privateState.metaDocumentName = defaultValues ?
            (defaultValues["metaDocumentName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["metaDocumentName"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
                null) :
            null;

        context["field"] = "content";
        context["metadata"] = (objectMetadata ? objectMetadata["content"] : null);
        privateState.content = defaultValues ?
            (defaultValues["content"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["content"], context) :
                null) :
            null;

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "authorization": {
                get: function() {
                    context["field"] = "authorization";
                    context["metadata"] = (objectMetadata ? objectMetadata["authorization"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.authorization, context);
                },
                set: function(val) {
                    setterFunctions['authorization'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentGroup": {
                get: function() {
                    context["field"] = "documentGroup";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentGroup"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentGroup, context);
                },
                set: function(val) {
                    setterFunctions['documentGroup'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ownerSystemId": {
                get: function() {
                    context["field"] = "ownerSystemId";
                    context["metadata"] = (objectMetadata ? objectMetadata["ownerSystemId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ownerSystemId, context);
                },
                set: function(val) {
                    setterFunctions['ownerSystemId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountName": {
                get: function() {
                    context["field"] = "accountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountName, context);
                },
                set: function(val) {
                    setterFunctions['accountName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangementId": {
                get: function() {
                    context["field"] = "arrangementId";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementId, context);
                },
                set: function(val) {
                    setterFunctions['arrangementId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountNumber": {
                get: function() {
                    context["field"] = "accountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountNumber, context);
                },
                set: function(val) {
                    setterFunctions['accountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangementstatus": {
                get: function() {
                    context["field"] = "arrangementstatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementstatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementstatus, context);
                },
                set: function(val) {
                    setterFunctions['arrangementstatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ownership": {
                get: function() {
                    context["field"] = "ownership";
                    context["metadata"] = (objectMetadata ? objectMetadata["ownership"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ownership, context);
                },
                set: function(val) {
                    setterFunctions['ownership'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "homeOwnership": {
                get: function() {
                    context["field"] = "homeOwnership";
                    context["metadata"] = (objectMetadata ? objectMetadata["homeOwnership"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.homeOwnership, context);
                },
                set: function(val) {
                    setterFunctions['homeOwnership'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "accountType": {
                get: function() {
                    context["field"] = "accountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountType, context);
                },
                set: function(val) {
                    setterFunctions['accountType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentId": {
                get: function() {
                    context["field"] = "documentId";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentId, context);
                },
                set: function(val) {
                    setterFunctions['documentId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentStatus": {
                get: function() {
                    context["field"] = "documentStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentStatus, context);
                },
                set: function(val) {
                    setterFunctions['documentStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentType": {
                get: function() {
                    context["field"] = "documentType";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentType, context);
                },
                set: function(val) {
                    setterFunctions['documentType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentName": {
                get: function() {
                    context["field"] = "documentName";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentName, context);
                },
                set: function(val) {
                    setterFunctions['documentName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "metaDocumentName": {
                get: function() {
                    context["field"] = "metaDocumentName";
                    context["metadata"] = (objectMetadata ? objectMetadata["metaDocumentName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.metaDocumentName, context);
                },
                set: function(val) {
                    setterFunctions['metaDocumentName'].call(this, val, privateState);
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
            "content": {
                get: function() {
                    context["field"] = "content";
                    context["metadata"] = (objectMetadata ? objectMetadata["content"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.content, context);
                },
                set: function(val) {
                    setterFunctions['content'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileId": {
                get: function() {
                    context["field"] = "fileId";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileId, context);
                },
                set: function(val) {
                    setterFunctions['fileId'].call(this, val, privateState);
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
            privateState.authorization = value ? (value["authorization"] ? value["authorization"] : null) : null;
            privateState.documentGroup = value ? (value["documentGroup"] ? value["documentGroup"] : null) : null;
            privateState.ownerSystemId = value ? (value["ownerSystemId"] ? value["ownerSystemId"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.arrangementId = value ? (value["arrangementId"] ? value["arrangementId"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.arrangementstatus = value ? (value["arrangementstatus"] ? value["arrangementstatus"] : null) : null;
            privateState.ownership = value ? (value["ownership"] ? value["ownership"] : null) : null;
            privateState.homeOwnership = value ? (value["homeOwnership"] ? value["homeOwnership"] : null) : null;
            privateState.accountID = value ? (value["accountID"] ? value["accountID"] : null) : null;
            privateState.accountType = value ? (value["accountType"] ? value["accountType"] : null) : null;
            privateState.documentId = value ? (value["documentId"] ? value["documentId"] : null) : null;
            privateState.documentStatus = value ? (value["documentStatus"] ? value["documentStatus"] : null) : null;
            privateState.documentType = value ? (value["documentType"] ? value["documentType"] : null) : null;
            privateState.documentName = value ? (value["documentName"] ? value["documentName"] : null) : null;
            privateState.metaDocumentName = value ? (value["metaDocumentName"] ? value["metaDocumentName"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.content = value ? (value["content"] ? value["content"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(mortgageDocument);

    //Create new class level validator object
    BaseModel.Validator.call(mortgageDocument);

    var registerValidatorBackup = mortgageDocument.registerValidator;

    mortgageDocument.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(mortgageDocument.isValid(this, propName, val)) {
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
    //For Operation 'downloadDocument' with service id 'downloadDocument9036'
     mortgageDocument.downloadDocument = function(params, onCompletion){
        return mortgageDocument.customVerb('downloadDocument', params, onCompletion);
     };

    //For Operation 'getDocuments' with service id 'searchDocument4820'
     mortgageDocument.getDocuments = function(params, onCompletion){
        return mortgageDocument.customVerb('getDocuments', params, onCompletion);
     };

    var relations = [];

    mortgageDocument.relations = relations;

    mortgageDocument.prototype.isValid = function() {
        return mortgageDocument.isValid(this);
    };

    mortgageDocument.prototype.objModelName = "mortgageDocument";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    mortgageDocument.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Holdings", "mortgageDocument", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    mortgageDocument.clone = function(objectToClone) {
        var clonedObj = new mortgageDocument();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return mortgageDocument;
});