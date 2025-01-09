/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CustomRole", "objectService" : "ExternalUserManagement"};

    var setterFunctions = {
        customRoleId: function(val, state) {
            context["field"] = "customRoleId";
            context["metadata"] = (objectMetadata ? objectMetadata["customRoleId"] : null);
            state['customRoleId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customRoleName: function(val, state) {
            context["field"] = "customRoleName";
            context["metadata"] = (objectMetadata ? objectMetadata["customRoleName"] : null);
            state['customRoleName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        parentRoleId: function(val, state) {
            context["field"] = "parentRoleId";
            context["metadata"] = (objectMetadata ? objectMetadata["parentRoleId"] : null);
            state['parentRoleId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accounts: function(val, state) {
            context["field"] = "accounts";
            context["metadata"] = (objectMetadata ? objectMetadata["accounts"] : null);
            state['accounts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        features: function(val, state) {
            context["field"] = "features";
            context["metadata"] = (objectMetadata ? objectMetadata["features"] : null);
            state['features'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        users: function(val, state) {
            context["field"] = "users";
            context["metadata"] = (objectMetadata ? objectMetadata["users"] : null);
            state['users'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function CustomRole(defaultValues) {
        var privateState = {};
        context["field"] = "customRoleId";
        context["metadata"] = (objectMetadata ? objectMetadata["customRoleId"] : null);
        privateState.customRoleId = defaultValues ?
            (defaultValues["customRoleId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customRoleId"], context) :
                null) :
            null;

        context["field"] = "customRoleName";
        context["metadata"] = (objectMetadata ? objectMetadata["customRoleName"] : null);
        privateState.customRoleName = defaultValues ?
            (defaultValues["customRoleName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customRoleName"], context) :
                null) :
            null;

        context["field"] = "parentRoleId";
        context["metadata"] = (objectMetadata ? objectMetadata["parentRoleId"] : null);
        privateState.parentRoleId = defaultValues ?
            (defaultValues["parentRoleId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["parentRoleId"], context) :
                null) :
            null;

        context["field"] = "accounts";
        context["metadata"] = (objectMetadata ? objectMetadata["accounts"] : null);
        privateState.accounts = defaultValues ?
            (defaultValues["accounts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accounts"], context) :
                null) :
            null;

        context["field"] = "features";
        context["metadata"] = (objectMetadata ? objectMetadata["features"] : null);
        privateState.features = defaultValues ?
            (defaultValues["features"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["features"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "users";
        context["metadata"] = (objectMetadata ? objectMetadata["users"] : null);
        privateState.users = defaultValues ?
            (defaultValues["users"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["users"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "customRoleId": {
                get: function() {
                    context["field"] = "customRoleId";
                    context["metadata"] = (objectMetadata ? objectMetadata["customRoleId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customRoleId, context);
                },
                set: function(val) {
                    setterFunctions['customRoleId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customRoleName": {
                get: function() {
                    context["field"] = "customRoleName";
                    context["metadata"] = (objectMetadata ? objectMetadata["customRoleName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customRoleName, context);
                },
                set: function(val) {
                    setterFunctions['customRoleName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "parentRoleId": {
                get: function() {
                    context["field"] = "parentRoleId";
                    context["metadata"] = (objectMetadata ? objectMetadata["parentRoleId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.parentRoleId, context);
                },
                set: function(val) {
                    setterFunctions['parentRoleId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accounts": {
                get: function() {
                    context["field"] = "accounts";
                    context["metadata"] = (objectMetadata ? objectMetadata["accounts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accounts, context);
                },
                set: function(val) {
                    setterFunctions['accounts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "features": {
                get: function() {
                    context["field"] = "features";
                    context["metadata"] = (objectMetadata ? objectMetadata["features"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.features, context);
                },
                set: function(val) {
                    setterFunctions['features'].call(this, val, privateState);
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
            "users": {
                get: function() {
                    context["field"] = "users";
                    context["metadata"] = (objectMetadata ? objectMetadata["users"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.users, context);
                },
                set: function(val) {
                    setterFunctions['users'].call(this, val, privateState);
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
            privateState.customRoleId = value ? (value["customRoleId"] ? value["customRoleId"] : null) : null;
            privateState.customRoleName = value ? (value["customRoleName"] ? value["customRoleName"] : null) : null;
            privateState.parentRoleId = value ? (value["parentRoleId"] ? value["parentRoleId"] : null) : null;
            privateState.accounts = value ? (value["accounts"] ? value["accounts"] : null) : null;
            privateState.features = value ? (value["features"] ? value["features"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.users = value ? (value["users"] ? value["users"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(CustomRole);

    //Create new class level validator object
    BaseModel.Validator.call(CustomRole);

    var registerValidatorBackup = CustomRole.registerValidator;

    CustomRole.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CustomRole.isValid(this, propName, val)) {
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
    //For Operation 'deleteCustomRole' with service id 'deleteCustomRole3865'
     CustomRole.deleteCustomRole = function(params, onCompletion){
        return CustomRole.customVerb('deleteCustomRole', params, onCompletion);
     };

    //For Operation 'createCustomRole' with service id 'CreateCustomRoleActionLimits9917'
     CustomRole.createCustomRole = function(params, onCompletion){
        return CustomRole.customVerb('createCustomRole', params, onCompletion);
     };

    //For Operation 'updateCustomRole' with service id 'updateCustomRole7385'
     CustomRole.updateCustomRole = function(params, onCompletion){
        return CustomRole.customVerb('updateCustomRole', params, onCompletion);
     };

    //For Operation 'getOrganizationCustomRoles' with service id 'getOrganisationCustomRoles3906'
     CustomRole.getOrganizationCustomRoles = function(params, onCompletion){
        return CustomRole.customVerb('getOrganizationCustomRoles', params, onCompletion);
     };

    //For Operation 'getCustomRoleDetails' with service id 'getCustomRoleDetails3218'
     CustomRole.getCustomRoleDetails = function(params, onCompletion){
        return CustomRole.customVerb('getCustomRoleDetails', params, onCompletion);
     };

    //For Operation 'applyCustomRole' with service id 'ApplyCustomRole1304'
     CustomRole.applyCustomRole = function(params, onCompletion){
        return CustomRole.customVerb('applyCustomRole', params, onCompletion);
     };

    //For Operation 'verifyCustomRoleName' with service id 'verifyCustomRoleName2743'
     CustomRole.verifyCustomRoleName = function(params, onCompletion){
        return CustomRole.customVerb('verifyCustomRoleName', params, onCompletion);
     };

    var relations = [];

    CustomRole.relations = relations;

    CustomRole.prototype.isValid = function() {
        return CustomRole.isValid(this);
    };

    CustomRole.prototype.objModelName = "CustomRole";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CustomRole.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ExternalUserManagement", "CustomRole", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CustomRole.clone = function(objectToClone) {
        var clonedObj = new CustomRole();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CustomRole;
});