/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "NotificationList", "objectService" : "Notifications"};

    var setterFunctions = {
        imageURL: function(val, state) {
            context["field"] = "imageURL";
            context["metadata"] = (objectMetadata ? objectMetadata["imageURL"] : null);
            state['imageURL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isRead: function(val, state) {
            context["field"] = "isRead";
            context["metadata"] = (objectMetadata ? objectMetadata["isRead"] : null);
            state['isRead'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        notificationActionLink: function(val, state) {
            context["field"] = "notificationActionLink";
            context["metadata"] = (objectMetadata ? objectMetadata["notificationActionLink"] : null);
            state['notificationActionLink'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        notificationId: function(val, state) {
            context["field"] = "notificationId";
            context["metadata"] = (objectMetadata ? objectMetadata["notificationId"] : null);
            state['notificationId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        notificationModule: function(val, state) {
            context["field"] = "notificationModule";
            context["metadata"] = (objectMetadata ? objectMetadata["notificationModule"] : null);
            state['notificationModule'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        notificationSubject: function(val, state) {
            context["field"] = "notificationSubject";
            context["metadata"] = (objectMetadata ? objectMetadata["notificationSubject"] : null);
            state['notificationSubject'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        notificationSubModule: function(val, state) {
            context["field"] = "notificationSubModule";
            context["metadata"] = (objectMetadata ? objectMetadata["notificationSubModule"] : null);
            state['notificationSubModule'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        notificationText: function(val, state) {
            context["field"] = "notificationText";
            context["metadata"] = (objectMetadata ? objectMetadata["notificationText"] : null);
            state['notificationText'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        receivedDate: function(val, state) {
            context["field"] = "receivedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["receivedDate"] : null);
            state['receivedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        result: function(val, state) {
            context["field"] = "result";
            context["metadata"] = (objectMetadata ? objectMetadata["result"] : null);
            state['result'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchString: function(val, state) {
            context["field"] = "searchString";
            context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
            state['searchString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unreadNotificationCount: function(val, state) {
            context["field"] = "unreadNotificationCount";
            context["metadata"] = (objectMetadata ? objectMetadata["unreadNotificationCount"] : null);
            state['unreadNotificationCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userNotificationId: function(val, state) {
            context["field"] = "userNotificationId";
            context["metadata"] = (objectMetadata ? objectMetadata["userNotificationId"] : null);
            state['userNotificationId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actionButtonLabelName: function(val, state) {
            context["field"] = "actionButtonLabelName";
            context["metadata"] = (objectMetadata ? objectMetadata["actionButtonLabelName"] : null);
            state['actionButtonLabelName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        notificationCategory: function(val, state) {
            context["field"] = "notificationCategory";
            context["metadata"] = (objectMetadata ? objectMetadata["notificationCategory"] : null);
            state['notificationCategory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function NotificationList(defaultValues) {
        var privateState = {};
        context["field"] = "imageURL";
        context["metadata"] = (objectMetadata ? objectMetadata["imageURL"] : null);
        privateState.imageURL = defaultValues ?
            (defaultValues["imageURL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["imageURL"], context) :
                null) :
            null;

        context["field"] = "isRead";
        context["metadata"] = (objectMetadata ? objectMetadata["isRead"] : null);
        privateState.isRead = defaultValues ?
            (defaultValues["isRead"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isRead"], context) :
                null) :
            null;

        context["field"] = "notificationActionLink";
        context["metadata"] = (objectMetadata ? objectMetadata["notificationActionLink"] : null);
        privateState.notificationActionLink = defaultValues ?
            (defaultValues["notificationActionLink"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["notificationActionLink"], context) :
                null) :
            null;

        context["field"] = "notificationId";
        context["metadata"] = (objectMetadata ? objectMetadata["notificationId"] : null);
        privateState.notificationId = defaultValues ?
            (defaultValues["notificationId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["notificationId"], context) :
                null) :
            null;

        context["field"] = "notificationModule";
        context["metadata"] = (objectMetadata ? objectMetadata["notificationModule"] : null);
        privateState.notificationModule = defaultValues ?
            (defaultValues["notificationModule"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["notificationModule"], context) :
                null) :
            null;

        context["field"] = "notificationSubject";
        context["metadata"] = (objectMetadata ? objectMetadata["notificationSubject"] : null);
        privateState.notificationSubject = defaultValues ?
            (defaultValues["notificationSubject"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["notificationSubject"], context) :
                null) :
            null;

        context["field"] = "notificationSubModule";
        context["metadata"] = (objectMetadata ? objectMetadata["notificationSubModule"] : null);
        privateState.notificationSubModule = defaultValues ?
            (defaultValues["notificationSubModule"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["notificationSubModule"], context) :
                null) :
            null;

        context["field"] = "notificationText";
        context["metadata"] = (objectMetadata ? objectMetadata["notificationText"] : null);
        privateState.notificationText = defaultValues ?
            (defaultValues["notificationText"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["notificationText"], context) :
                null) :
            null;

        context["field"] = "receivedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["receivedDate"] : null);
        privateState.receivedDate = defaultValues ?
            (defaultValues["receivedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["receivedDate"], context) :
                null) :
            null;

        context["field"] = "result";
        context["metadata"] = (objectMetadata ? objectMetadata["result"] : null);
        privateState.result = defaultValues ?
            (defaultValues["result"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["result"], context) :
                null) :
            null;

        context["field"] = "searchString";
        context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
        privateState.searchString = defaultValues ?
            (defaultValues["searchString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchString"], context) :
                null) :
            null;

        context["field"] = "unreadNotificationCount";
        context["metadata"] = (objectMetadata ? objectMetadata["unreadNotificationCount"] : null);
        privateState.unreadNotificationCount = defaultValues ?
            (defaultValues["unreadNotificationCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unreadNotificationCount"], context) :
                null) :
            null;

        context["field"] = "userNotificationId";
        context["metadata"] = (objectMetadata ? objectMetadata["userNotificationId"] : null);
        privateState.userNotificationId = defaultValues ?
            (defaultValues["userNotificationId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userNotificationId"], context) :
                null) :
            null;

        context["field"] = "actionButtonLabelName";
        context["metadata"] = (objectMetadata ? objectMetadata["actionButtonLabelName"] : null);
        privateState.actionButtonLabelName = defaultValues ?
            (defaultValues["actionButtonLabelName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actionButtonLabelName"], context) :
                null) :
            null;

        context["field"] = "notificationCategory";
        context["metadata"] = (objectMetadata ? objectMetadata["notificationCategory"] : null);
        privateState.notificationCategory = defaultValues ?
            (defaultValues["notificationCategory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["notificationCategory"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "imageURL": {
                get: function() {
                    context["field"] = "imageURL";
                    context["metadata"] = (objectMetadata ? objectMetadata["imageURL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.imageURL, context);
                },
                set: function(val) {
                    setterFunctions['imageURL'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isRead": {
                get: function() {
                    context["field"] = "isRead";
                    context["metadata"] = (objectMetadata ? objectMetadata["isRead"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isRead, context);
                },
                set: function(val) {
                    setterFunctions['isRead'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "notificationActionLink": {
                get: function() {
                    context["field"] = "notificationActionLink";
                    context["metadata"] = (objectMetadata ? objectMetadata["notificationActionLink"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.notificationActionLink, context);
                },
                set: function(val) {
                    setterFunctions['notificationActionLink'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "notificationId": {
                get: function() {
                    context["field"] = "notificationId";
                    context["metadata"] = (objectMetadata ? objectMetadata["notificationId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.notificationId, context);
                },
                set: function(val) {
                    setterFunctions['notificationId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "notificationModule": {
                get: function() {
                    context["field"] = "notificationModule";
                    context["metadata"] = (objectMetadata ? objectMetadata["notificationModule"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.notificationModule, context);
                },
                set: function(val) {
                    setterFunctions['notificationModule'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "notificationSubject": {
                get: function() {
                    context["field"] = "notificationSubject";
                    context["metadata"] = (objectMetadata ? objectMetadata["notificationSubject"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.notificationSubject, context);
                },
                set: function(val) {
                    setterFunctions['notificationSubject'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "notificationSubModule": {
                get: function() {
                    context["field"] = "notificationSubModule";
                    context["metadata"] = (objectMetadata ? objectMetadata["notificationSubModule"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.notificationSubModule, context);
                },
                set: function(val) {
                    setterFunctions['notificationSubModule'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "notificationText": {
                get: function() {
                    context["field"] = "notificationText";
                    context["metadata"] = (objectMetadata ? objectMetadata["notificationText"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.notificationText, context);
                },
                set: function(val) {
                    setterFunctions['notificationText'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "receivedDate": {
                get: function() {
                    context["field"] = "receivedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["receivedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.receivedDate, context);
                },
                set: function(val) {
                    setterFunctions['receivedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "result": {
                get: function() {
                    context["field"] = "result";
                    context["metadata"] = (objectMetadata ? objectMetadata["result"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.result, context);
                },
                set: function(val) {
                    setterFunctions['result'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchString": {
                get: function() {
                    context["field"] = "searchString";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchString, context);
                },
                set: function(val) {
                    setterFunctions['searchString'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "unreadNotificationCount": {
                get: function() {
                    context["field"] = "unreadNotificationCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["unreadNotificationCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unreadNotificationCount, context);
                },
                set: function(val) {
                    setterFunctions['unreadNotificationCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userNotificationId": {
                get: function() {
                    context["field"] = "userNotificationId";
                    context["metadata"] = (objectMetadata ? objectMetadata["userNotificationId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userNotificationId, context);
                },
                set: function(val) {
                    setterFunctions['userNotificationId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "actionButtonLabelName": {
                get: function() {
                    context["field"] = "actionButtonLabelName";
                    context["metadata"] = (objectMetadata ? objectMetadata["actionButtonLabelName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actionButtonLabelName, context);
                },
                set: function(val) {
                    setterFunctions['actionButtonLabelName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "notificationCategory": {
                get: function() {
                    context["field"] = "notificationCategory";
                    context["metadata"] = (objectMetadata ? objectMetadata["notificationCategory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.notificationCategory, context);
                },
                set: function(val) {
                    setterFunctions['notificationCategory'].call(this, val, privateState);
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
            privateState.imageURL = value ? (value["imageURL"] ? value["imageURL"] : null) : null;
            privateState.isRead = value ? (value["isRead"] ? value["isRead"] : null) : null;
            privateState.notificationActionLink = value ? (value["notificationActionLink"] ? value["notificationActionLink"] : null) : null;
            privateState.notificationId = value ? (value["notificationId"] ? value["notificationId"] : null) : null;
            privateState.notificationModule = value ? (value["notificationModule"] ? value["notificationModule"] : null) : null;
            privateState.notificationSubject = value ? (value["notificationSubject"] ? value["notificationSubject"] : null) : null;
            privateState.notificationSubModule = value ? (value["notificationSubModule"] ? value["notificationSubModule"] : null) : null;
            privateState.notificationText = value ? (value["notificationText"] ? value["notificationText"] : null) : null;
            privateState.receivedDate = value ? (value["receivedDate"] ? value["receivedDate"] : null) : null;
            privateState.result = value ? (value["result"] ? value["result"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.unreadNotificationCount = value ? (value["unreadNotificationCount"] ? value["unreadNotificationCount"] : null) : null;
            privateState.userNotificationId = value ? (value["userNotificationId"] ? value["userNotificationId"] : null) : null;
            privateState.actionButtonLabelName = value ? (value["actionButtonLabelName"] ? value["actionButtonLabelName"] : null) : null;
            privateState.notificationCategory = value ? (value["notificationCategory"] ? value["notificationCategory"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(NotificationList);

    //Create new class level validator object
    BaseModel.Validator.call(NotificationList);

    var registerValidatorBackup = NotificationList.registerValidator;

    NotificationList.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(NotificationList.isValid(this, propName, val)) {
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
    //For Operation 'deleteNotification' with service id 'deleteNotification6942'
     NotificationList.deleteNotification = function(params, onCompletion){
        return NotificationList.customVerb('deleteNotification', params, onCompletion);
     };

    var relations = [];

    NotificationList.relations = relations;

    NotificationList.prototype.isValid = function() {
        return NotificationList.isValid(this);
    };

    NotificationList.prototype.objModelName = "NotificationList";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    NotificationList.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Notifications", "NotificationList", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    NotificationList.clone = function(objectToClone) {
        var clonedObj = new NotificationList();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return NotificationList;
});