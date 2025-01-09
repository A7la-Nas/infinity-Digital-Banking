/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CustomerFeedback", "objectService" : "ContentManagement"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        user_id: function(val, state) {
            context["field"] = "user_id";
            context["metadata"] = (objectMetadata ? objectMetadata["user_id"] : null);
            state['user_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rating: function(val, state) {
            context["field"] = "rating";
            context["metadata"] = (objectMetadata ? objectMetadata["rating"] : null);
            state['rating'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureRequest: function(val, state) {
            context["field"] = "featureRequest";
            context["metadata"] = (objectMetadata ? objectMetadata["featureRequest"] : null);
            state['featureRequest'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        likeMost: function(val, state) {
            context["field"] = "likeMost";
            context["metadata"] = (objectMetadata ? objectMetadata["likeMost"] : null);
            state['likeMost'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        improvement: function(val, state) {
            context["field"] = "improvement";
            context["metadata"] = (objectMetadata ? objectMetadata["improvement"] : null);
            state['improvement'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        feedbackID: function(val, state) {
            context["field"] = "feedbackID";
            context["metadata"] = (objectMetadata ? objectMetadata["feedbackID"] : null);
            state['feedbackID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function CustomerFeedback(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "user_id";
        context["metadata"] = (objectMetadata ? objectMetadata["user_id"] : null);
        privateState.user_id = defaultValues ?
            (defaultValues["user_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["user_id"], context) :
                null) :
            null;

        context["field"] = "rating";
        context["metadata"] = (objectMetadata ? objectMetadata["rating"] : null);
        privateState.rating = defaultValues ?
            (defaultValues["rating"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rating"], context) :
                null) :
            null;

        context["field"] = "featureRequest";
        context["metadata"] = (objectMetadata ? objectMetadata["featureRequest"] : null);
        privateState.featureRequest = defaultValues ?
            (defaultValues["featureRequest"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureRequest"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "likeMost";
        context["metadata"] = (objectMetadata ? objectMetadata["likeMost"] : null);
        privateState.likeMost = defaultValues ?
            (defaultValues["likeMost"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["likeMost"], context) :
                null) :
            null;

        context["field"] = "improvement";
        context["metadata"] = (objectMetadata ? objectMetadata["improvement"] : null);
        privateState.improvement = defaultValues ?
            (defaultValues["improvement"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["improvement"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "feedbackID";
        context["metadata"] = (objectMetadata ? objectMetadata["feedbackID"] : null);
        privateState.feedbackID = defaultValues ?
            (defaultValues["feedbackID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["feedbackID"], context) :
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
            "user_id": {
                get: function() {
                    context["field"] = "user_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["user_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.user_id, context);
                },
                set: function(val) {
                    setterFunctions['user_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rating": {
                get: function() {
                    context["field"] = "rating";
                    context["metadata"] = (objectMetadata ? objectMetadata["rating"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rating, context);
                },
                set: function(val) {
                    setterFunctions['rating'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "featureRequest": {
                get: function() {
                    context["field"] = "featureRequest";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureRequest"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureRequest, context);
                },
                set: function(val) {
                    setterFunctions['featureRequest'].call(this, val, privateState);
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
            "likeMost": {
                get: function() {
                    context["field"] = "likeMost";
                    context["metadata"] = (objectMetadata ? objectMetadata["likeMost"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.likeMost, context);
                },
                set: function(val) {
                    setterFunctions['likeMost'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "improvement": {
                get: function() {
                    context["field"] = "improvement";
                    context["metadata"] = (objectMetadata ? objectMetadata["improvement"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.improvement, context);
                },
                set: function(val) {
                    setterFunctions['improvement'].call(this, val, privateState);
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
            "feedbackID": {
                get: function() {
                    context["field"] = "feedbackID";
                    context["metadata"] = (objectMetadata ? objectMetadata["feedbackID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.feedbackID, context);
                },
                set: function(val) {
                    setterFunctions['feedbackID'].call(this, val, privateState);
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
            privateState.user_id = value ? (value["user_id"] ? value["user_id"] : null) : null;
            privateState.rating = value ? (value["rating"] ? value["rating"] : null) : null;
            privateState.featureRequest = value ? (value["featureRequest"] ? value["featureRequest"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.likeMost = value ? (value["likeMost"] ? value["likeMost"] : null) : null;
            privateState.improvement = value ? (value["improvement"] ? value["improvement"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.feedbackID = value ? (value["feedbackID"] ? value["feedbackID"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(CustomerFeedback);

    //Create new class level validator object
    BaseModel.Validator.call(CustomerFeedback);

    var registerValidatorBackup = CustomerFeedback.registerValidator;

    CustomerFeedback.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CustomerFeedback.isValid(this, propName, val)) {
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
    //For Operation 'createFeedback' with service id 'createCustomerFeedback3251'
     CustomerFeedback.createFeedback = function(params, onCompletion){
        return CustomerFeedback.customVerb('createFeedback', params, onCompletion);
     };

    var relations = [];

    CustomerFeedback.relations = relations;

    CustomerFeedback.prototype.isValid = function() {
        return CustomerFeedback.isValid(this);
    };

    CustomerFeedback.prototype.objModelName = "CustomerFeedback";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CustomerFeedback.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ContentManagement", "CustomerFeedback", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CustomerFeedback.clone = function(objectToClone) {
        var clonedObj = new CustomerFeedback();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CustomerFeedback;
});