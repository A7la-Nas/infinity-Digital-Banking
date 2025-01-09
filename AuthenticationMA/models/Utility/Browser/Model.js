/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Browser", "objectService" : "Utility"};

    var setterFunctions = {
        module: function(val, state) {
            context["field"] = "module";
            context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
            state['module'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        activityType: function(val, state) {
            context["field"] = "activityType";
            context["metadata"] = (objectMetadata ? objectMetadata["activityType"] : null);
            state['activityType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reason: function(val, state) {
            context["field"] = "reason";
            context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
            state['reason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        browserVersion: function(val, state) {
            context["field"] = "browserVersion";
            context["metadata"] = (objectMetadata ? objectMetadata["browserVersion"] : null);
            state['browserVersion'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        browserName: function(val, state) {
            context["field"] = "browserName";
            context["metadata"] = (objectMetadata ? objectMetadata["browserName"] : null);
            state['browserName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        channelName: function(val, state) {
            context["field"] = "channelName";
            context["metadata"] = (objectMetadata ? objectMetadata["channelName"] : null);
            state['channelName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        operatingSystem: function(val, state) {
            context["field"] = "operatingSystem";
            context["metadata"] = (objectMetadata ? objectMetadata["operatingSystem"] : null);
            state['operatingSystem'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceId: function(val, state) {
            context["field"] = "deviceId";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
            state['deviceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ipAddress: function(val, state) {
            context["field"] = "ipAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["ipAddress"] : null);
            state['ipAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userAction: function(val, state) {
            context["field"] = "userAction";
            context["metadata"] = (objectMetadata ? objectMetadata["userAction"] : null);
            state['userAction'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        application: function(val, state) {
            context["field"] = "application";
            context["metadata"] = (objectMetadata ? objectMetadata["application"] : null);
            state['application'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        appVersion: function(val, state) {
            context["field"] = "appVersion";
            context["metadata"] = (objectMetadata ? objectMetadata["appVersion"] : null);
            state['appVersion'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        date: function(val, state) {
            context["field"] = "date";
            context["metadata"] = (objectMetadata ? objectMetadata["date"] : null);
            state['date'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Browser(defaultValues) {
        var privateState = {};
        context["field"] = "module";
        context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
        privateState.module = defaultValues ?
            (defaultValues["module"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["module"], context) :
                null) :
            null;

        context["field"] = "activityType";
        context["metadata"] = (objectMetadata ? objectMetadata["activityType"] : null);
        privateState.activityType = defaultValues ?
            (defaultValues["activityType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["activityType"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "reason";
        context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
        privateState.reason = defaultValues ?
            (defaultValues["reason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reason"], context) :
                null) :
            null;

        context["field"] = "browserVersion";
        context["metadata"] = (objectMetadata ? objectMetadata["browserVersion"] : null);
        privateState.browserVersion = defaultValues ?
            (defaultValues["browserVersion"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["browserVersion"], context) :
                null) :
            null;

        context["field"] = "browserName";
        context["metadata"] = (objectMetadata ? objectMetadata["browserName"] : null);
        privateState.browserName = defaultValues ?
            (defaultValues["browserName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["browserName"], context) :
                null) :
            null;

        context["field"] = "channelName";
        context["metadata"] = (objectMetadata ? objectMetadata["channelName"] : null);
        privateState.channelName = defaultValues ?
            (defaultValues["channelName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["channelName"], context) :
                null) :
            null;

        context["field"] = "operatingSystem";
        context["metadata"] = (objectMetadata ? objectMetadata["operatingSystem"] : null);
        privateState.operatingSystem = defaultValues ?
            (defaultValues["operatingSystem"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["operatingSystem"], context) :
                null) :
            null;

        context["field"] = "deviceId";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
        privateState.deviceId = defaultValues ?
            (defaultValues["deviceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceId"], context) :
                null) :
            null;

        context["field"] = "ipAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["ipAddress"] : null);
        privateState.ipAddress = defaultValues ?
            (defaultValues["ipAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ipAddress"], context) :
                null) :
            null;

        context["field"] = "userAction";
        context["metadata"] = (objectMetadata ? objectMetadata["userAction"] : null);
        privateState.userAction = defaultValues ?
            (defaultValues["userAction"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userAction"], context) :
                null) :
            null;

        context["field"] = "application";
        context["metadata"] = (objectMetadata ? objectMetadata["application"] : null);
        privateState.application = defaultValues ?
            (defaultValues["application"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["application"], context) :
                null) :
            null;

        context["field"] = "appVersion";
        context["metadata"] = (objectMetadata ? objectMetadata["appVersion"] : null);
        privateState.appVersion = defaultValues ?
            (defaultValues["appVersion"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["appVersion"], context) :
                null) :
            null;

        context["field"] = "date";
        context["metadata"] = (objectMetadata ? objectMetadata["date"] : null);
        privateState.date = defaultValues ?
            (defaultValues["date"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["date"], context) :
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
            "module": {
                get: function() {
                    context["field"] = "module";
                    context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.module, context);
                },
                set: function(val) {
                    setterFunctions['module'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "activityType": {
                get: function() {
                    context["field"] = "activityType";
                    context["metadata"] = (objectMetadata ? objectMetadata["activityType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.activityType, context);
                },
                set: function(val) {
                    setterFunctions['activityType'].call(this, val, privateState);
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
            "reason": {
                get: function() {
                    context["field"] = "reason";
                    context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reason, context);
                },
                set: function(val) {
                    setterFunctions['reason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "browserVersion": {
                get: function() {
                    context["field"] = "browserVersion";
                    context["metadata"] = (objectMetadata ? objectMetadata["browserVersion"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.browserVersion, context);
                },
                set: function(val) {
                    setterFunctions['browserVersion'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "browserName": {
                get: function() {
                    context["field"] = "browserName";
                    context["metadata"] = (objectMetadata ? objectMetadata["browserName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.browserName, context);
                },
                set: function(val) {
                    setterFunctions['browserName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "channelName": {
                get: function() {
                    context["field"] = "channelName";
                    context["metadata"] = (objectMetadata ? objectMetadata["channelName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.channelName, context);
                },
                set: function(val) {
                    setterFunctions['channelName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "operatingSystem": {
                get: function() {
                    context["field"] = "operatingSystem";
                    context["metadata"] = (objectMetadata ? objectMetadata["operatingSystem"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.operatingSystem, context);
                },
                set: function(val) {
                    setterFunctions['operatingSystem'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deviceId": {
                get: function() {
                    context["field"] = "deviceId";
                    context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deviceId, context);
                },
                set: function(val) {
                    setterFunctions['deviceId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ipAddress": {
                get: function() {
                    context["field"] = "ipAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["ipAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ipAddress, context);
                },
                set: function(val) {
                    setterFunctions['ipAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userAction": {
                get: function() {
                    context["field"] = "userAction";
                    context["metadata"] = (objectMetadata ? objectMetadata["userAction"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userAction, context);
                },
                set: function(val) {
                    setterFunctions['userAction'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "application": {
                get: function() {
                    context["field"] = "application";
                    context["metadata"] = (objectMetadata ? objectMetadata["application"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.application, context);
                },
                set: function(val) {
                    setterFunctions['application'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "appVersion": {
                get: function() {
                    context["field"] = "appVersion";
                    context["metadata"] = (objectMetadata ? objectMetadata["appVersion"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.appVersion, context);
                },
                set: function(val) {
                    setterFunctions['appVersion'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "date": {
                get: function() {
                    context["field"] = "date";
                    context["metadata"] = (objectMetadata ? objectMetadata["date"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.date, context);
                },
                set: function(val) {
                    setterFunctions['date'].call(this, val, privateState);
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
            privateState.module = value ? (value["module"] ? value["module"] : null) : null;
            privateState.activityType = value ? (value["activityType"] ? value["activityType"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.reason = value ? (value["reason"] ? value["reason"] : null) : null;
            privateState.browserVersion = value ? (value["browserVersion"] ? value["browserVersion"] : null) : null;
            privateState.browserName = value ? (value["browserName"] ? value["browserName"] : null) : null;
            privateState.channelName = value ? (value["channelName"] ? value["channelName"] : null) : null;
            privateState.operatingSystem = value ? (value["operatingSystem"] ? value["operatingSystem"] : null) : null;
            privateState.deviceId = value ? (value["deviceId"] ? value["deviceId"] : null) : null;
            privateState.ipAddress = value ? (value["ipAddress"] ? value["ipAddress"] : null) : null;
            privateState.userAction = value ? (value["userAction"] ? value["userAction"] : null) : null;
            privateState.application = value ? (value["application"] ? value["application"] : null) : null;
            privateState.appVersion = value ? (value["appVersion"] ? value["appVersion"] : null) : null;
            privateState.date = value ? (value["date"] ? value["date"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Browser);

    //Create new class level validator object
    BaseModel.Validator.call(Browser);

    var registerValidatorBackup = Browser.registerValidator;

    Browser.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Browser.isValid(this, propName, val)) {
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
    //For Operation 'getSupportedBrowserMatrix' with service id 'GetSupportedBrowserMatrix6494'
     Browser.getSupportedBrowserMatrix = function(params, onCompletion){
        return Browser.customVerb('getSupportedBrowserMatrix', params, onCompletion);
     };

    //For Operation 'logBrowser' with service id 'LogBrowser3490'
     Browser.logBrowser = function(params, onCompletion){
        return Browser.customVerb('logBrowser', params, onCompletion);
     };

    var relations = [];

    Browser.relations = relations;

    Browser.prototype.isValid = function() {
        return Browser.isValid(this);
    };

    Browser.prototype.objModelName = "Browser";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Browser.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Utility", "Browser", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Browser.clone = function(objectToClone) {
        var clonedObj = new Browser();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Browser;
});