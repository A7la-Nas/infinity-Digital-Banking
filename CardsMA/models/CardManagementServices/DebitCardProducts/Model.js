/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "DebitCardProducts", "objectService" : "CardManagementServices"};

    var setterFunctions = {
        productId: function(val, state) {
            context["field"] = "productId";
            context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
            state['productId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productName: function(val, state) {
            context["field"] = "productName";
            context["metadata"] = (objectMetadata ? objectMetadata["productName"] : null);
            state['productName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountType: function(val, state) {
            context["field"] = "accountType";
            context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
            state['accountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureOverview: function(val, state) {
            context["field"] = "featureOverview";
            context["metadata"] = (objectMetadata ? objectMetadata["featureOverview"] : null);
            state['featureOverview'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureDescription: function(val, state) {
            context["field"] = "featureDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["featureDescription"] : null);
            state['featureDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        representativeLabel1: function(val, state) {
            context["field"] = "representativeLabel1";
            context["metadata"] = (objectMetadata ? objectMetadata["representativeLabel1"] : null);
            state['representativeLabel1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        representativeLabel2: function(val, state) {
            context["field"] = "representativeLabel2";
            context["metadata"] = (objectMetadata ? objectMetadata["representativeLabel2"] : null);
            state['representativeLabel2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        representativeLabel3: function(val, state) {
            context["field"] = "representativeLabel3";
            context["metadata"] = (objectMetadata ? objectMetadata["representativeLabel3"] : null);
            state['representativeLabel3'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        representativeValue1: function(val, state) {
            context["field"] = "representativeValue1";
            context["metadata"] = (objectMetadata ? objectMetadata["representativeValue1"] : null);
            state['representativeValue1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        representativeValue2: function(val, state) {
            context["field"] = "representativeValue2";
            context["metadata"] = (objectMetadata ? objectMetadata["representativeValue2"] : null);
            state['representativeValue2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        representativeValue3: function(val, state) {
            context["field"] = "representativeValue3";
            context["metadata"] = (objectMetadata ? objectMetadata["representativeValue3"] : null);
            state['representativeValue3'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        successmsg: function(val, state) {
            context["field"] = "successmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
            state['successmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function DebitCardProducts(defaultValues) {
        var privateState = {};
        context["field"] = "productId";
        context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
        privateState.productId = defaultValues ?
            (defaultValues["productId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productId"], context) :
                null) :
            null;

        context["field"] = "productName";
        context["metadata"] = (objectMetadata ? objectMetadata["productName"] : null);
        privateState.productName = defaultValues ?
            (defaultValues["productName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productName"], context) :
                null) :
            null;

        context["field"] = "accountType";
        context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
        privateState.accountType = defaultValues ?
            (defaultValues["accountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountType"], context) :
                null) :
            null;

        context["field"] = "featureOverview";
        context["metadata"] = (objectMetadata ? objectMetadata["featureOverview"] : null);
        privateState.featureOverview = defaultValues ?
            (defaultValues["featureOverview"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureOverview"], context) :
                null) :
            null;

        context["field"] = "featureDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["featureDescription"] : null);
        privateState.featureDescription = defaultValues ?
            (defaultValues["featureDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureDescription"], context) :
                null) :
            null;

        context["field"] = "representativeLabel1";
        context["metadata"] = (objectMetadata ? objectMetadata["representativeLabel1"] : null);
        privateState.representativeLabel1 = defaultValues ?
            (defaultValues["representativeLabel1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["representativeLabel1"], context) :
                null) :
            null;

        context["field"] = "representativeLabel2";
        context["metadata"] = (objectMetadata ? objectMetadata["representativeLabel2"] : null);
        privateState.representativeLabel2 = defaultValues ?
            (defaultValues["representativeLabel2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["representativeLabel2"], context) :
                null) :
            null;

        context["field"] = "representativeLabel3";
        context["metadata"] = (objectMetadata ? objectMetadata["representativeLabel3"] : null);
        privateState.representativeLabel3 = defaultValues ?
            (defaultValues["representativeLabel3"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["representativeLabel3"], context) :
                null) :
            null;

        context["field"] = "representativeValue1";
        context["metadata"] = (objectMetadata ? objectMetadata["representativeValue1"] : null);
        privateState.representativeValue1 = defaultValues ?
            (defaultValues["representativeValue1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["representativeValue1"], context) :
                null) :
            null;

        context["field"] = "representativeValue2";
        context["metadata"] = (objectMetadata ? objectMetadata["representativeValue2"] : null);
        privateState.representativeValue2 = defaultValues ?
            (defaultValues["representativeValue2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["representativeValue2"], context) :
                null) :
            null;

        context["field"] = "representativeValue3";
        context["metadata"] = (objectMetadata ? objectMetadata["representativeValue3"] : null);
        privateState.representativeValue3 = defaultValues ?
            (defaultValues["representativeValue3"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["representativeValue3"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "successmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
        privateState.successmsg = defaultValues ?
            (defaultValues["successmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["successmsg"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "productId": {
                get: function() {
                    context["field"] = "productId";
                    context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.productId, context);
                },
                set: function(val) {
                    setterFunctions['productId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "productName": {
                get: function() {
                    context["field"] = "productName";
                    context["metadata"] = (objectMetadata ? objectMetadata["productName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.productName, context);
                },
                set: function(val) {
                    setterFunctions['productName'].call(this, val, privateState);
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
            "featureOverview": {
                get: function() {
                    context["field"] = "featureOverview";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureOverview"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureOverview, context);
                },
                set: function(val) {
                    setterFunctions['featureOverview'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "featureDescription": {
                get: function() {
                    context["field"] = "featureDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureDescription, context);
                },
                set: function(val) {
                    setterFunctions['featureDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "representativeLabel1": {
                get: function() {
                    context["field"] = "representativeLabel1";
                    context["metadata"] = (objectMetadata ? objectMetadata["representativeLabel1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.representativeLabel1, context);
                },
                set: function(val) {
                    setterFunctions['representativeLabel1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "representativeLabel2": {
                get: function() {
                    context["field"] = "representativeLabel2";
                    context["metadata"] = (objectMetadata ? objectMetadata["representativeLabel2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.representativeLabel2, context);
                },
                set: function(val) {
                    setterFunctions['representativeLabel2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "representativeLabel3": {
                get: function() {
                    context["field"] = "representativeLabel3";
                    context["metadata"] = (objectMetadata ? objectMetadata["representativeLabel3"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.representativeLabel3, context);
                },
                set: function(val) {
                    setterFunctions['representativeLabel3'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "representativeValue1": {
                get: function() {
                    context["field"] = "representativeValue1";
                    context["metadata"] = (objectMetadata ? objectMetadata["representativeValue1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.representativeValue1, context);
                },
                set: function(val) {
                    setterFunctions['representativeValue1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "representativeValue2": {
                get: function() {
                    context["field"] = "representativeValue2";
                    context["metadata"] = (objectMetadata ? objectMetadata["representativeValue2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.representativeValue2, context);
                },
                set: function(val) {
                    setterFunctions['representativeValue2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "representativeValue3": {
                get: function() {
                    context["field"] = "representativeValue3";
                    context["metadata"] = (objectMetadata ? objectMetadata["representativeValue3"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.representativeValue3, context);
                },
                set: function(val) {
                    setterFunctions['representativeValue3'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errmsg": {
                get: function() {
                    context["field"] = "errmsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errmsg, context);
                },
                set: function(val) {
                    setterFunctions['errmsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "successmsg": {
                get: function() {
                    context["field"] = "successmsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.successmsg, context);
                },
                set: function(val) {
                    setterFunctions['successmsg'].call(this, val, privateState);
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
            privateState.productId = value ? (value["productId"] ? value["productId"] : null) : null;
            privateState.productName = value ? (value["productName"] ? value["productName"] : null) : null;
            privateState.accountType = value ? (value["accountType"] ? value["accountType"] : null) : null;
            privateState.featureOverview = value ? (value["featureOverview"] ? value["featureOverview"] : null) : null;
            privateState.featureDescription = value ? (value["featureDescription"] ? value["featureDescription"] : null) : null;
            privateState.representativeLabel1 = value ? (value["representativeLabel1"] ? value["representativeLabel1"] : null) : null;
            privateState.representativeLabel2 = value ? (value["representativeLabel2"] ? value["representativeLabel2"] : null) : null;
            privateState.representativeLabel3 = value ? (value["representativeLabel3"] ? value["representativeLabel3"] : null) : null;
            privateState.representativeValue1 = value ? (value["representativeValue1"] ? value["representativeValue1"] : null) : null;
            privateState.representativeValue2 = value ? (value["representativeValue2"] ? value["representativeValue2"] : null) : null;
            privateState.representativeValue3 = value ? (value["representativeValue3"] ? value["representativeValue3"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.successmsg = value ? (value["successmsg"] ? value["successmsg"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(DebitCardProducts);

    //Create new class level validator object
    BaseModel.Validator.call(DebitCardProducts);

    var registerValidatorBackup = DebitCardProducts.registerValidator;

    DebitCardProducts.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(DebitCardProducts.isValid(this, propName, val)) {
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
    //For Operation 'getProducts' with service id 'getCardProducts2281'
     DebitCardProducts.getProducts = function(params, onCompletion){
        return DebitCardProducts.customVerb('getProducts', params, onCompletion);
     };

    var relations = [];

    DebitCardProducts.relations = relations;

    DebitCardProducts.prototype.isValid = function() {
        return DebitCardProducts.isValid(this);
    };

    DebitCardProducts.prototype.objModelName = "DebitCardProducts";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    DebitCardProducts.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CardManagementServices", "DebitCardProducts", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    DebitCardProducts.clone = function(objectToClone) {
        var clonedObj = new DebitCardProducts();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return DebitCardProducts;
});