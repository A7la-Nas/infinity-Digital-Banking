/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "media", "objectService" : "MessageBinary"};

    var setterFunctions = {
        Content: function(val, state) {
            context["field"] = "Content";
            context["metadata"] = (objectMetadata ? objectMetadata["Content"] : null);
            state['Content'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdby: function(val, state) {
            context["field"] = "createdby";
            context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
            state['createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdts: function(val, state) {
            context["field"] = "createdts";
            context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
            state['createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Description: function(val, state) {
            context["field"] = "Description";
            context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
            state['Description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastmodifiedts: function(val, state) {
            context["field"] = "lastmodifiedts";
            context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
            state['lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modifiedby: function(val, state) {
            context["field"] = "modifiedby";
            context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
            state['modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Name: function(val, state) {
            context["field"] = "Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
            state['Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Size: function(val, state) {
            context["field"] = "Size";
            context["metadata"] = (objectMetadata ? objectMetadata["Size"] : null);
            state['Size'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softdeleteflag: function(val, state) {
            context["field"] = "softdeleteflag";
            context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
            state['softdeleteflag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        synctimestamp: function(val, state) {
            context["field"] = "synctimestamp";
            context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
            state['synctimestamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Type: function(val, state) {
            context["field"] = "Type";
            context["metadata"] = (objectMetadata ? objectMetadata["Type"] : null);
            state['Type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Url: function(val, state) {
            context["field"] = "Url";
            context["metadata"] = (objectMetadata ? objectMetadata["Url"] : null);
            state['Url'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function media(defaultValues) {
        var privateState = {};
        context["field"] = "Content";
        context["metadata"] = (objectMetadata ? objectMetadata["Content"] : null);
        privateState.Content = defaultValues ?
            (defaultValues["Content"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Content"], context) :
                null) :
            null;

        context["field"] = "createdby";
        context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
        privateState.createdby = defaultValues ?
            (defaultValues["createdby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context) :
                null) :
            null;

        context["field"] = "createdts";
        context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
        privateState.createdts = defaultValues ?
            (defaultValues["createdts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdts"], context) :
                null) :
            null;

        context["field"] = "Description";
        context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
        privateState.Description = defaultValues ?
            (defaultValues["Description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Description"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "lastmodifiedts";
        context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
        privateState.lastmodifiedts = defaultValues ?
            (defaultValues["lastmodifiedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastmodifiedts"], context) :
                null) :
            null;

        context["field"] = "modifiedby";
        context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
        privateState.modifiedby = defaultValues ?
            (defaultValues["modifiedby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context) :
                null) :
            null;

        context["field"] = "Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
        privateState.Name = defaultValues ?
            (defaultValues["Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Name"], context) :
                null) :
            null;

        context["field"] = "Size";
        context["metadata"] = (objectMetadata ? objectMetadata["Size"] : null);
        privateState.Size = defaultValues ?
            (defaultValues["Size"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Size"], context) :
                null) :
            null;

        context["field"] = "softdeleteflag";
        context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
        privateState.softdeleteflag = defaultValues ?
            (defaultValues["softdeleteflag"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softdeleteflag"], context) :
                null) :
            null;

        context["field"] = "synctimestamp";
        context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
        privateState.synctimestamp = defaultValues ?
            (defaultValues["synctimestamp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["synctimestamp"], context) :
                null) :
            null;

        context["field"] = "Type";
        context["metadata"] = (objectMetadata ? objectMetadata["Type"] : null);
        privateState.Type = defaultValues ?
            (defaultValues["Type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Type"], context) :
                null) :
            null;

        context["field"] = "Url";
        context["metadata"] = (objectMetadata ? objectMetadata["Url"] : null);
        privateState.Url = defaultValues ?
            (defaultValues["Url"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Url"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "Content": {
                get: function() {
                    context["field"] = "Content";
                    context["metadata"] = (objectMetadata ? objectMetadata["Content"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Content, context);
                },
                set: function(val) {
                    setterFunctions['Content'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "createdts": {
                get: function() {
                    context["field"] = "createdts";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdts, context);
                },
                set: function(val) {
                    setterFunctions['createdts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Description": {
                get: function() {
                    context["field"] = "Description";
                    context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Description, context);
                },
                set: function(val) {
                    setterFunctions['Description'].call(this, val, privateState);
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
            "lastmodifiedts": {
                get: function() {
                    context["field"] = "lastmodifiedts";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastmodifiedts, context);
                },
                set: function(val) {
                    setterFunctions['lastmodifiedts'].call(this, val, privateState);
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
            "Name": {
                get: function() {
                    context["field"] = "Name";
                    context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Name, context);
                },
                set: function(val) {
                    setterFunctions['Name'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Size": {
                get: function() {
                    context["field"] = "Size";
                    context["metadata"] = (objectMetadata ? objectMetadata["Size"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Size, context);
                },
                set: function(val) {
                    setterFunctions['Size'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "softdeleteflag": {
                get: function() {
                    context["field"] = "softdeleteflag";
                    context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.softdeleteflag, context);
                },
                set: function(val) {
                    setterFunctions['softdeleteflag'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "synctimestamp": {
                get: function() {
                    context["field"] = "synctimestamp";
                    context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.synctimestamp, context);
                },
                set: function(val) {
                    setterFunctions['synctimestamp'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Type": {
                get: function() {
                    context["field"] = "Type";
                    context["metadata"] = (objectMetadata ? objectMetadata["Type"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Type, context);
                },
                set: function(val) {
                    setterFunctions['Type'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Url": {
                get: function() {
                    context["field"] = "Url";
                    context["metadata"] = (objectMetadata ? objectMetadata["Url"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Url, context);
                },
                set: function(val) {
                    setterFunctions['Url'].call(this, val, privateState);
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
            privateState.Content = value ? (value["Content"] ? value["Content"] : null) : null;
            privateState.createdby = value ? (value["createdby"] ? value["createdby"] : null) : null;
            privateState.createdts = value ? (value["createdts"] ? value["createdts"] : null) : null;
            privateState.Description = value ? (value["Description"] ? value["Description"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.lastmodifiedts = value ? (value["lastmodifiedts"] ? value["lastmodifiedts"] : null) : null;
            privateState.modifiedby = value ? (value["modifiedby"] ? value["modifiedby"] : null) : null;
            privateState.Name = value ? (value["Name"] ? value["Name"] : null) : null;
            privateState.Size = value ? (value["Size"] ? value["Size"] : null) : null;
            privateState.softdeleteflag = value ? (value["softdeleteflag"] ? value["softdeleteflag"] : null) : null;
            privateState.synctimestamp = value ? (value["synctimestamp"] ? value["synctimestamp"] : null) : null;
            privateState.Type = value ? (value["Type"] ? value["Type"] : null) : null;
            privateState.Url = value ? (value["Url"] ? value["Url"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(media);

    //Create new class level validator object
    BaseModel.Validator.call(media);

    var registerValidatorBackup = media.registerValidator;

    media.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(media.isValid(this, propName, val)) {
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
    //For Operation 'createBinary' with service id 'createBinarymedia4861'
     media.createBinary = function(params, onCompletion){
        return media.customVerb('createBinary', params, onCompletion);
     };

    //For Operation 'getBinary' with service id 'queryBinarymedia2760'
     media.getBinary = function(params, onCompletion){
        return media.customVerb('getBinary', params, onCompletion);
     };

    //For Operation 'updateBinary' with service id 'updateBinarymedia8939'
     media.updateBinary = function(params, onCompletion){
        return media.customVerb('updateBinary', params, onCompletion);
     };

    //For Operation 'deleteBinary' with service id 'deleteBinarymedia8209'
     media.deleteBinary = function(params, onCompletion){
        return media.customVerb('deleteBinary', params, onCompletion);
     };

    var relations = [];

    media.relations = relations;

    media.prototype.isValid = function() {
        return media.isValid(this);
    };

    media.prototype.objModelName = "media";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    media.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("MessageBinary", "media", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    media.clone = function(objectToClone) {
        var clonedObj = new media();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return media;
});