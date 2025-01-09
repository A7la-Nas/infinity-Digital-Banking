/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CardStatements", "objectService" : "CardManagementServices"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        statementLink: function(val, state) {
            context["field"] = "statementLink";
            context["metadata"] = (objectMetadata ? objectMetadata["statementLink"] : null);
            state['statementLink'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        month: function(val, state) {
            context["field"] = "month";
            context["metadata"] = (objectMetadata ? objectMetadata["month"] : null);
            state['month'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Card_id: function(val, state) {
            context["field"] = "Card_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Card_id"] : null);
            state['Card_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function CardStatements(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "statementLink";
        context["metadata"] = (objectMetadata ? objectMetadata["statementLink"] : null);
        privateState.statementLink = defaultValues ?
            (defaultValues["statementLink"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["statementLink"], context) :
                null) :
            null;

        context["field"] = "month";
        context["metadata"] = (objectMetadata ? objectMetadata["month"] : null);
        privateState.month = defaultValues ?
            (defaultValues["month"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["month"], context) :
                null) :
            null;

        context["field"] = "Card_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Card_id"] : null);
        privateState.Card_id = defaultValues ?
            (defaultValues["Card_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Card_id"], context) :
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
            "statementLink": {
                get: function() {
                    context["field"] = "statementLink";
                    context["metadata"] = (objectMetadata ? objectMetadata["statementLink"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.statementLink, context);
                },
                set: function(val) {
                    setterFunctions['statementLink'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "month": {
                get: function() {
                    context["field"] = "month";
                    context["metadata"] = (objectMetadata ? objectMetadata["month"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.month, context);
                },
                set: function(val) {
                    setterFunctions['month'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Card_id": {
                get: function() {
                    context["field"] = "Card_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Card_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Card_id, context);
                },
                set: function(val) {
                    setterFunctions['Card_id'].call(this, val, privateState);
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
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.statementLink = value ? (value["statementLink"] ? value["statementLink"] : null) : null;
            privateState.month = value ? (value["month"] ? value["month"] : null) : null;
            privateState.Card_id = value ? (value["Card_id"] ? value["Card_id"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(CardStatements);

    //Create new class level validator object
    BaseModel.Validator.call(CardStatements);

    var registerValidatorBackup = CardStatements.registerValidator;

    CardStatements.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CardStatements.isValid(this, propName, val)) {
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
    //For Operation 'getCardStatements' with service id 'getCardStatementsOperation7272'
     CardStatements.getCardStatements = function(params, onCompletion){
        return CardStatements.customVerb('getCardStatements', params, onCompletion);
     };

    var relations = [];

    CardStatements.relations = relations;

    CardStatements.prototype.isValid = function() {
        return CardStatements.isValid(this);
    };

    CardStatements.prototype.objModelName = "CardStatements";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CardStatements.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CardManagementServices", "CardStatements", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CardStatements.clone = function(objectToClone) {
        var clonedObj = new CardStatements();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CardStatements;
});