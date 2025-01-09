/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Payment_Multi", "objectService" : "Transfers"};

    var setterFunctions = {
        bulkTransferString: function(val, state) {
            context["field"] = "bulkTransferString";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkTransferString"] : null);
            state['bulkTransferString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Payment_Multi(defaultValues) {
        var privateState = {};
        context["field"] = "bulkTransferString";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkTransferString"] : null);
        privateState.bulkTransferString = defaultValues ?
            (defaultValues["bulkTransferString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkTransferString"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "bulkTransferString": {
                get: function() {
                    context["field"] = "bulkTransferString";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkTransferString"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkTransferString, context);
                },
                set: function(val) {
                    setterFunctions['bulkTransferString'].call(this, val, privateState);
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
            privateState.bulkTransferString = value ? (value["bulkTransferString"] ? value["bulkTransferString"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Payment_Multi);

    //Create new class level validator object
    BaseModel.Validator.call(Payment_Multi);

    var registerValidatorBackup = Payment_Multi.registerValidator;

    Payment_Multi.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Payment_Multi.isValid(this, propName, val)) {
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
    //For Operation 'createMultiTransfers' with service id 'createBulkTransfer7296'
     Payment_Multi.createMultiTransfers = function(params, onCompletion){
        return Payment_Multi.customVerb('createMultiTransfers', params, onCompletion);
     };

    var relations = [];

    Payment_Multi.relations = relations;

    Payment_Multi.prototype.isValid = function() {
        return Payment_Multi.isValid(this);
    };

    Payment_Multi.prototype.objModelName = "Payment_Multi";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Payment_Multi.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Transfers", "Payment_Multi", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Payment_Multi.clone = function(objectToClone) {
        var clonedObj = new Payment_Multi();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Payment_Multi;
});