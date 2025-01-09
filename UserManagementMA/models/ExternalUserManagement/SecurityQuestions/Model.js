/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "SecurityQuestions", "objectService" : "ExternalUserManagement"};

    var setterFunctions = {
        question: function(val, state) {
            context["field"] = "question";
            context["metadata"] = (objectMetadata ? objectMetadata["question"] : null);
            state['question'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        SecurityID: function(val, state) {
            context["field"] = "SecurityID";
            context["metadata"] = (objectMetadata ? objectMetadata["SecurityID"] : null);
            state['SecurityID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        securityQuestions: function(val, state) {
            context["field"] = "securityQuestions";
            context["metadata"] = (objectMetadata ? objectMetadata["securityQuestions"] : null);
            state['securityQuestions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function SecurityQuestions(defaultValues) {
        var privateState = {};
        context["field"] = "question";
        context["metadata"] = (objectMetadata ? objectMetadata["question"] : null);
        privateState.question = defaultValues ?
            (defaultValues["question"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["question"], context) :
                null) :
            null;

        context["field"] = "SecurityID";
        context["metadata"] = (objectMetadata ? objectMetadata["SecurityID"] : null);
        privateState.SecurityID = defaultValues ?
            (defaultValues["SecurityID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["SecurityID"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "securityQuestions";
        context["metadata"] = (objectMetadata ? objectMetadata["securityQuestions"] : null);
        privateState.securityQuestions = defaultValues ?
            (defaultValues["securityQuestions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["securityQuestions"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "question": {
                get: function() {
                    context["field"] = "question";
                    context["metadata"] = (objectMetadata ? objectMetadata["question"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.question, context);
                },
                set: function(val) {
                    setterFunctions['question'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "SecurityID": {
                get: function() {
                    context["field"] = "SecurityID";
                    context["metadata"] = (objectMetadata ? objectMetadata["SecurityID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.SecurityID, context);
                },
                set: function(val) {
                    setterFunctions['SecurityID'].call(this, val, privateState);
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
            "securityQuestions": {
                get: function() {
                    context["field"] = "securityQuestions";
                    context["metadata"] = (objectMetadata ? objectMetadata["securityQuestions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.securityQuestions, context);
                },
                set: function(val) {
                    setterFunctions['securityQuestions'].call(this, val, privateState);
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
            privateState.question = value ? (value["question"] ? value["question"] : null) : null;
            privateState.SecurityID = value ? (value["SecurityID"] ? value["SecurityID"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.securityQuestions = value ? (value["securityQuestions"] ? value["securityQuestions"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(SecurityQuestions);

    //Create new class level validator object
    BaseModel.Validator.call(SecurityQuestions);

    var registerValidatorBackup = SecurityQuestions.registerValidator;

    SecurityQuestions.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(SecurityQuestions.isValid(this, propName, val)) {
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
    //For Operation 'updateSecurityQuestions' with service id 'createCustomerSecurityQuestions2925'
     SecurityQuestions.updateSecurityQuestions = function(params, onCompletion){
        return SecurityQuestions.customVerb('updateSecurityQuestions', params, onCompletion);
     };

    //For Operation 'getSecurityQuestions' with service id 'getSecurityQuestions4781'
     SecurityQuestions.getSecurityQuestions = function(params, onCompletion){
        return SecurityQuestions.customVerb('getSecurityQuestions', params, onCompletion);
     };

    var relations = [];

    SecurityQuestions.relations = relations;

    SecurityQuestions.prototype.isValid = function() {
        return SecurityQuestions.isValid(this);
    };

    SecurityQuestions.prototype.objModelName = "SecurityQuestions";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    SecurityQuestions.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ExternalUserManagement", "SecurityQuestions", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    SecurityQuestions.clone = function(objectToClone) {
        var clonedObj = new SecurityQuestions();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return SecurityQuestions;
});