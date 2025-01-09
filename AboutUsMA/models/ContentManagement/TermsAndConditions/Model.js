/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "TermsAndConditions", "objectService" : "ContentManagement"};

    var setterFunctions = {
        termsAndConditionsCode: function(val, state) {
            context["field"] = "termsAndConditionsCode";
            context["metadata"] = (objectMetadata ? objectMetadata["termsAndConditionsCode"] : null);
            state['termsAndConditionsCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        languageCode: function(val, state) {
            context["field"] = "languageCode";
            context["metadata"] = (objectMetadata ? objectMetadata["languageCode"] : null);
            state['languageCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        termsAndConditionsContent: function(val, state) {
            context["field"] = "termsAndConditionsContent";
            context["metadata"] = (objectMetadata ? objectMetadata["termsAndConditionsContent"] : null);
            state['termsAndConditionsContent'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contentTypeId: function(val, state) {
            context["field"] = "contentTypeId";
            context["metadata"] = (objectMetadata ? objectMetadata["contentTypeId"] : null);
            state['contentTypeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        versionId: function(val, state) {
            context["field"] = "versionId";
            context["metadata"] = (objectMetadata ? objectMetadata["versionId"] : null);
            state['versionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        alreadySigned: function(val, state) {
            context["field"] = "alreadySigned";
            context["metadata"] = (objectMetadata ? objectMetadata["alreadySigned"] : null);
            state['alreadySigned'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function TermsAndConditions(defaultValues) {
        var privateState = {};
        context["field"] = "termsAndConditionsCode";
        context["metadata"] = (objectMetadata ? objectMetadata["termsAndConditionsCode"] : null);
        privateState.termsAndConditionsCode = defaultValues ?
            (defaultValues["termsAndConditionsCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["termsAndConditionsCode"], context) :
                null) :
            null;

        context["field"] = "languageCode";
        context["metadata"] = (objectMetadata ? objectMetadata["languageCode"] : null);
        privateState.languageCode = defaultValues ?
            (defaultValues["languageCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["languageCode"], context) :
                null) :
            null;

        context["field"] = "termsAndConditionsContent";
        context["metadata"] = (objectMetadata ? objectMetadata["termsAndConditionsContent"] : null);
        privateState.termsAndConditionsContent = defaultValues ?
            (defaultValues["termsAndConditionsContent"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["termsAndConditionsContent"], context) :
                null) :
            null;

        context["field"] = "contentTypeId";
        context["metadata"] = (objectMetadata ? objectMetadata["contentTypeId"] : null);
        privateState.contentTypeId = defaultValues ?
            (defaultValues["contentTypeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contentTypeId"], context) :
                null) :
            null;

        context["field"] = "versionId";
        context["metadata"] = (objectMetadata ? objectMetadata["versionId"] : null);
        privateState.versionId = defaultValues ?
            (defaultValues["versionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["versionId"], context) :
                null) :
            null;

        context["field"] = "alreadySigned";
        context["metadata"] = (objectMetadata ? objectMetadata["alreadySigned"] : null);
        privateState.alreadySigned = defaultValues ?
            (defaultValues["alreadySigned"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["alreadySigned"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "termsAndConditionsCode": {
                get: function() {
                    context["field"] = "termsAndConditionsCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["termsAndConditionsCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.termsAndConditionsCode, context);
                },
                set: function(val) {
                    setterFunctions['termsAndConditionsCode'].call(this, val, privateState);
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
            "termsAndConditionsContent": {
                get: function() {
                    context["field"] = "termsAndConditionsContent";
                    context["metadata"] = (objectMetadata ? objectMetadata["termsAndConditionsContent"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.termsAndConditionsContent, context);
                },
                set: function(val) {
                    setterFunctions['termsAndConditionsContent'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contentTypeId": {
                get: function() {
                    context["field"] = "contentTypeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["contentTypeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contentTypeId, context);
                },
                set: function(val) {
                    setterFunctions['contentTypeId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "versionId": {
                get: function() {
                    context["field"] = "versionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["versionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.versionId, context);
                },
                set: function(val) {
                    setterFunctions['versionId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "alreadySigned": {
                get: function() {
                    context["field"] = "alreadySigned";
                    context["metadata"] = (objectMetadata ? objectMetadata["alreadySigned"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.alreadySigned, context);
                },
                set: function(val) {
                    setterFunctions['alreadySigned'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.termsAndConditionsCode = value ? (value["termsAndConditionsCode"] ? value["termsAndConditionsCode"] : null) : null;
            privateState.languageCode = value ? (value["languageCode"] ? value["languageCode"] : null) : null;
            privateState.termsAndConditionsContent = value ? (value["termsAndConditionsContent"] ? value["termsAndConditionsContent"] : null) : null;
            privateState.contentTypeId = value ? (value["contentTypeId"] ? value["contentTypeId"] : null) : null;
            privateState.versionId = value ? (value["versionId"] ? value["versionId"] : null) : null;
            privateState.alreadySigned = value ? (value["alreadySigned"] ? value["alreadySigned"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(TermsAndConditions);

    //Create new class level validator object
    BaseModel.Validator.call(TermsAndConditions);

    var registerValidatorBackup = TermsAndConditions.registerValidator;

    TermsAndConditions.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(TermsAndConditions.isValid(this, propName, val)) {
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
    //For Operation 'getPostLogin' with service id 'getCustomerTermsAndConditions6250'
     TermsAndConditions.getPostLogin = function(params, onCompletion){
        return TermsAndConditions.customVerb('getPostLogin', params, onCompletion);
     };

    //For Operation 'createCustomerTNCForLogin' with service id 'createCustomerTNCForLogin3804'
     TermsAndConditions.createCustomerTNCForLogin = function(params, onCompletion){
        return TermsAndConditions.customVerb('createCustomerTNCForLogin', params, onCompletion);
     };

    //For Operation 'getPreLogin' with service id 'getCustomerTermsAndConditionsPreLogin1594'
     TermsAndConditions.getPreLogin = function(params, onCompletion){
        return TermsAndConditions.customVerb('getPreLogin', params, onCompletion);
     };

    var relations = [];

    TermsAndConditions.relations = relations;

    TermsAndConditions.prototype.isValid = function() {
        return TermsAndConditions.isValid(this);
    };

    TermsAndConditions.prototype.objModelName = "TermsAndConditions";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    TermsAndConditions.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ContentManagement", "TermsAndConditions", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    TermsAndConditions.clone = function(objectToClone) {
        var clonedObj = new TermsAndConditions();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return TermsAndConditions;
});