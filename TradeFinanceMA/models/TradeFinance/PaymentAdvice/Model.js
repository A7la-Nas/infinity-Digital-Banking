/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PaymentAdvice", "objectService" : "TradeFinance"};

    var setterFunctions = {
        paymentAdviceReference: function(val, state) {
            context["field"] = "paymentAdviceReference";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentAdviceReference"] : null);
            state['paymentAdviceReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingReferenceNo: function(val, state) {
            context["field"] = "drawingReferenceNo";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingReferenceNo"] : null);
            state['drawingReferenceNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        adviceName: function(val, state) {
            context["field"] = "adviceName";
            context["metadata"] = (objectMetadata ? objectMetadata["adviceName"] : null);
            state['adviceName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawingAmount: function(val, state) {
            context["field"] = "drawingAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["drawingAmount"] : null);
            state['drawingAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiary: function(val, state) {
            context["field"] = "beneficiary";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiary"] : null);
            state['beneficiary'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDate: function(val, state) {
            context["field"] = "paymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
            state['paymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditedAmount: function(val, state) {
            context["field"] = "creditedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["creditedAmount"] : null);
            state['creditedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        charges: function(val, state) {
            context["field"] = "charges";
            context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
            state['charges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        advisingBank: function(val, state) {
            context["field"] = "advisingBank";
            context["metadata"] = (objectMetadata ? objectMetadata["advisingBank"] : null);
            state['advisingBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditedAccount: function(val, state) {
            context["field"] = "creditedAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["creditedAccount"] : null);
            state['creditedAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderId: function(val, state) {
            context["field"] = "orderId";
            context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
            state['orderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdDate: function(val, state) {
            context["field"] = "createdDate";
            context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
            state['createdDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitedAmount: function(val, state) {
            context["field"] = "debitedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["debitedAmount"] : null);
            state['debitedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitedAccount: function(val, state) {
            context["field"] = "debitedAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["debitedAccount"] : null);
            state['debitedAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuingBank: function(val, state) {
            context["field"] = "issuingBank";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingBank"] : null);
            state['issuingBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PaymentAdvice(defaultValues) {
        var privateState = {};
        context["field"] = "paymentAdviceReference";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentAdviceReference"] : null);
        privateState.paymentAdviceReference = defaultValues ?
            (defaultValues["paymentAdviceReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentAdviceReference"], context) :
                null) :
            null;

        context["field"] = "drawingReferenceNo";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingReferenceNo"] : null);
        privateState.drawingReferenceNo = defaultValues ?
            (defaultValues["drawingReferenceNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingReferenceNo"], context) :
                null) :
            null;

        context["field"] = "adviceName";
        context["metadata"] = (objectMetadata ? objectMetadata["adviceName"] : null);
        privateState.adviceName = defaultValues ?
            (defaultValues["adviceName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["adviceName"], context) :
                null) :
            null;

        context["field"] = "drawingAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["drawingAmount"] : null);
        privateState.drawingAmount = defaultValues ?
            (defaultValues["drawingAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawingAmount"], context) :
                null) :
            null;

        context["field"] = "beneficiary";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiary"] : null);
        privateState.beneficiary = defaultValues ?
            (defaultValues["beneficiary"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiary"], context) :
                null) :
            null;

        context["field"] = "paymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
        privateState.paymentDate = defaultValues ?
            (defaultValues["paymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDate"], context) :
                null) :
            null;

        context["field"] = "creditedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["creditedAmount"] : null);
        privateState.creditedAmount = defaultValues ?
            (defaultValues["creditedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditedAmount"], context) :
                null) :
            null;

        context["field"] = "charges";
        context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
        privateState.charges = defaultValues ?
            (defaultValues["charges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["charges"], context) :
                null) :
            null;

        context["field"] = "advisingBank";
        context["metadata"] = (objectMetadata ? objectMetadata["advisingBank"] : null);
        privateState.advisingBank = defaultValues ?
            (defaultValues["advisingBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["advisingBank"], context) :
                null) :
            null;

        context["field"] = "creditedAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["creditedAccount"] : null);
        privateState.creditedAccount = defaultValues ?
            (defaultValues["creditedAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditedAccount"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
                null) :
            null;

        context["field"] = "orderId";
        context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
        privateState.orderId = defaultValues ?
            (defaultValues["orderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderId"], context) :
                null) :
            null;

        context["field"] = "createdDate";
        context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
        privateState.createdDate = defaultValues ?
            (defaultValues["createdDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdDate"], context) :
                null) :
            null;

        context["field"] = "debitedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["debitedAmount"] : null);
        privateState.debitedAmount = defaultValues ?
            (defaultValues["debitedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitedAmount"], context) :
                null) :
            null;

        context["field"] = "debitedAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["debitedAccount"] : null);
        privateState.debitedAccount = defaultValues ?
            (defaultValues["debitedAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitedAccount"], context) :
                null) :
            null;

        context["field"] = "issuingBank";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingBank"] : null);
        privateState.issuingBank = defaultValues ?
            (defaultValues["issuingBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingBank"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "paymentAdviceReference": {
                get: function() {
                    context["field"] = "paymentAdviceReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentAdviceReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentAdviceReference, context);
                },
                set: function(val) {
                    setterFunctions['paymentAdviceReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawingReferenceNo": {
                get: function() {
                    context["field"] = "drawingReferenceNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingReferenceNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingReferenceNo, context);
                },
                set: function(val) {
                    setterFunctions['drawingReferenceNo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "adviceName": {
                get: function() {
                    context["field"] = "adviceName";
                    context["metadata"] = (objectMetadata ? objectMetadata["adviceName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.adviceName, context);
                },
                set: function(val) {
                    setterFunctions['adviceName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawingAmount": {
                get: function() {
                    context["field"] = "drawingAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawingAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawingAmount, context);
                },
                set: function(val) {
                    setterFunctions['drawingAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiary": {
                get: function() {
                    context["field"] = "beneficiary";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiary"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiary, context);
                },
                set: function(val) {
                    setterFunctions['beneficiary'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentDate": {
                get: function() {
                    context["field"] = "paymentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentDate, context);
                },
                set: function(val) {
                    setterFunctions['paymentDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditedAmount": {
                get: function() {
                    context["field"] = "creditedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditedAmount, context);
                },
                set: function(val) {
                    setterFunctions['creditedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "charges": {
                get: function() {
                    context["field"] = "charges";
                    context["metadata"] = (objectMetadata ? objectMetadata["charges"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.charges, context);
                },
                set: function(val) {
                    setterFunctions['charges'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "advisingBank": {
                get: function() {
                    context["field"] = "advisingBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["advisingBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.advisingBank, context);
                },
                set: function(val) {
                    setterFunctions['advisingBank'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditedAccount": {
                get: function() {
                    context["field"] = "creditedAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditedAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditedAccount, context);
                },
                set: function(val) {
                    setterFunctions['creditedAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "message": {
                get: function() {
                    context["field"] = "message";
                    context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.message, context);
                },
                set: function(val) {
                    setterFunctions['message'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "orderId": {
                get: function() {
                    context["field"] = "orderId";
                    context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orderId, context);
                },
                set: function(val) {
                    setterFunctions['orderId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdDate": {
                get: function() {
                    context["field"] = "createdDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdDate, context);
                },
                set: function(val) {
                    setterFunctions['createdDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "debitedAmount": {
                get: function() {
                    context["field"] = "debitedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitedAmount, context);
                },
                set: function(val) {
                    setterFunctions['debitedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "debitedAccount": {
                get: function() {
                    context["field"] = "debitedAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitedAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitedAccount, context);
                },
                set: function(val) {
                    setterFunctions['debitedAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuingBank": {
                get: function() {
                    context["field"] = "issuingBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuingBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuingBank, context);
                },
                set: function(val) {
                    setterFunctions['issuingBank'].call(this, val, privateState);
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
            privateState.paymentAdviceReference = value ? (value["paymentAdviceReference"] ? value["paymentAdviceReference"] : null) : null;
            privateState.drawingReferenceNo = value ? (value["drawingReferenceNo"] ? value["drawingReferenceNo"] : null) : null;
            privateState.adviceName = value ? (value["adviceName"] ? value["adviceName"] : null) : null;
            privateState.drawingAmount = value ? (value["drawingAmount"] ? value["drawingAmount"] : null) : null;
            privateState.beneficiary = value ? (value["beneficiary"] ? value["beneficiary"] : null) : null;
            privateState.paymentDate = value ? (value["paymentDate"] ? value["paymentDate"] : null) : null;
            privateState.creditedAmount = value ? (value["creditedAmount"] ? value["creditedAmount"] : null) : null;
            privateState.charges = value ? (value["charges"] ? value["charges"] : null) : null;
            privateState.advisingBank = value ? (value["advisingBank"] ? value["advisingBank"] : null) : null;
            privateState.creditedAccount = value ? (value["creditedAccount"] ? value["creditedAccount"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.orderId = value ? (value["orderId"] ? value["orderId"] : null) : null;
            privateState.createdDate = value ? (value["createdDate"] ? value["createdDate"] : null) : null;
            privateState.debitedAmount = value ? (value["debitedAmount"] ? value["debitedAmount"] : null) : null;
            privateState.debitedAccount = value ? (value["debitedAccount"] ? value["debitedAccount"] : null) : null;
            privateState.issuingBank = value ? (value["issuingBank"] ? value["issuingBank"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PaymentAdvice);

    //Create new class level validator object
    BaseModel.Validator.call(PaymentAdvice);

    var registerValidatorBackup = PaymentAdvice.registerValidator;

    PaymentAdvice.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PaymentAdvice.isValid(this, propName, val)) {
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
    //For Operation 'createPaymentAdvice' with service id 'createPaymentAdvice2328'
     PaymentAdvice.createPaymentAdvice = function(params, onCompletion){
        return PaymentAdvice.customVerb('createPaymentAdvice', params, onCompletion);
     };

    //For Operation 'getPaymentAdvice' with service id 'GetPaymentAdvice9024'
     PaymentAdvice.getPaymentAdvice = function(params, onCompletion){
        return PaymentAdvice.customVerb('getPaymentAdvice', params, onCompletion);
     };

    var relations = [];

    PaymentAdvice.relations = relations;

    PaymentAdvice.prototype.isValid = function() {
        return PaymentAdvice.isValid(this);
    };

    PaymentAdvice.prototype.objModelName = "PaymentAdvice";
    PaymentAdvice.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PaymentAdvice.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "PaymentAdvice", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PaymentAdvice.clone = function(objectToClone) {
        var clonedObj = new PaymentAdvice();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PaymentAdvice;
});