/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "SamsungPay", "objectService" : "CardManagementServices"};

    var setterFunctions = {
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billingAddress: function(val, state) {
            context["field"] = "billingAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["billingAddress"] : null);
            state['billingAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorMessage: function(val, state) {
            context["field"] = "errorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
            state['errorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        successmsg: function(val, state) {
            context["field"] = "successmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
            state['successmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vCardID: function(val, state) {
            context["field"] = "vCardID";
            context["metadata"] = (objectMetadata ? objectMetadata["vCardID"] : null);
            state['vCardID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentAccountReference: function(val, state) {
            context["field"] = "paymentAccountReference";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentAccountReference"] : null);
            state['paymentAccountReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceID: function(val, state) {
            context["field"] = "deviceID";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceID"] : null);
            state['deviceID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        clientCustomerID: function(val, state) {
            context["field"] = "clientCustomerID";
            context["metadata"] = (objectMetadata ? objectMetadata["clientCustomerID"] : null);
            state['clientCustomerID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceCert: function(val, state) {
            context["field"] = "deviceCert";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceCert"] : null);
            state['deviceCert'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nonceSignature: function(val, state) {
            context["field"] = "nonceSignature";
            context["metadata"] = (objectMetadata ? objectMetadata["nonceSignature"] : null);
            state['nonceSignature'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nonce: function(val, state) {
            context["field"] = "nonce";
            context["metadata"] = (objectMetadata ? objectMetadata["nonce"] : null);
            state['nonce'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentService: function(val, state) {
            context["field"] = "paymentService";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentService"] : null);
            state['paymentService'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vClientIDForPartner: function(val, state) {
            context["field"] = "vClientIDForPartner";
            context["metadata"] = (objectMetadata ? objectMetadata["vClientIDForPartner"] : null);
            state['vClientIDForPartner'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vCustomerIDForPartner: function(val, state) {
            context["field"] = "vCustomerIDForPartner";
            context["metadata"] = (objectMetadata ? objectMetadata["vCustomerIDForPartner"] : null);
            state['vCustomerIDForPartner'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function SamsungPay(defaultValues) {
        var privateState = {};
        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
                null) :
            null;

        context["field"] = "billingAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["billingAddress"] : null);
        privateState.billingAddress = defaultValues ?
            (defaultValues["billingAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billingAddress"], context) :
                null) :
            null;

        context["field"] = "errorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
        privateState.errorMessage = defaultValues ?
            (defaultValues["errorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorMessage"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "successmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
        privateState.successmsg = defaultValues ?
            (defaultValues["successmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["successmsg"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "vCardID";
        context["metadata"] = (objectMetadata ? objectMetadata["vCardID"] : null);
        privateState.vCardID = defaultValues ?
            (defaultValues["vCardID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vCardID"], context) :
                null) :
            null;

        context["field"] = "paymentAccountReference";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentAccountReference"] : null);
        privateState.paymentAccountReference = defaultValues ?
            (defaultValues["paymentAccountReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentAccountReference"], context) :
                null) :
            null;

        context["field"] = "deviceID";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceID"] : null);
        privateState.deviceID = defaultValues ?
            (defaultValues["deviceID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceID"], context) :
                null) :
            null;

        context["field"] = "clientCustomerID";
        context["metadata"] = (objectMetadata ? objectMetadata["clientCustomerID"] : null);
        privateState.clientCustomerID = defaultValues ?
            (defaultValues["clientCustomerID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["clientCustomerID"], context) :
                null) :
            null;

        context["field"] = "deviceCert";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceCert"] : null);
        privateState.deviceCert = defaultValues ?
            (defaultValues["deviceCert"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceCert"], context) :
                null) :
            null;

        context["field"] = "nonceSignature";
        context["metadata"] = (objectMetadata ? objectMetadata["nonceSignature"] : null);
        privateState.nonceSignature = defaultValues ?
            (defaultValues["nonceSignature"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nonceSignature"], context) :
                null) :
            null;

        context["field"] = "nonce";
        context["metadata"] = (objectMetadata ? objectMetadata["nonce"] : null);
        privateState.nonce = defaultValues ?
            (defaultValues["nonce"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nonce"], context) :
                null) :
            null;

        context["field"] = "paymentService";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentService"] : null);
        privateState.paymentService = defaultValues ?
            (defaultValues["paymentService"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentService"], context) :
                null) :
            null;

        context["field"] = "vClientIDForPartner";
        context["metadata"] = (objectMetadata ? objectMetadata["vClientIDForPartner"] : null);
        privateState.vClientIDForPartner = defaultValues ?
            (defaultValues["vClientIDForPartner"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vClientIDForPartner"], context) :
                null) :
            null;

        context["field"] = "vCustomerIDForPartner";
        context["metadata"] = (objectMetadata ? objectMetadata["vCustomerIDForPartner"] : null);
        privateState.vCustomerIDForPartner = defaultValues ?
            (defaultValues["vCustomerIDForPartner"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vCustomerIDForPartner"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "success": {
                get: function() {
                    context["field"] = "success";
                    context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.success, context);
                },
                set: function(val) {
                    setterFunctions['success'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "billingAddress": {
                get: function() {
                    context["field"] = "billingAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["billingAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billingAddress, context);
                },
                set: function(val) {
                    setterFunctions['billingAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errorMessage": {
                get: function() {
                    context["field"] = "errorMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorMessage, context);
                },
                set: function(val) {
                    setterFunctions['errorMessage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrCode": {
                get: function() {
                    context["field"] = "dbpErrCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrCode, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrMsg": {
                get: function() {
                    context["field"] = "dbpErrMsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrMsg, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrMsg'].call(this, val, privateState);
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
            "status": {
                get: function() {
                    context["field"] = "status";
                    context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.status, context);
                },
                set: function(val) {
                    setterFunctions['status'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vCardID": {
                get: function() {
                    context["field"] = "vCardID";
                    context["metadata"] = (objectMetadata ? objectMetadata["vCardID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vCardID, context);
                },
                set: function(val) {
                    setterFunctions['vCardID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentAccountReference": {
                get: function() {
                    context["field"] = "paymentAccountReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentAccountReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentAccountReference, context);
                },
                set: function(val) {
                    setterFunctions['paymentAccountReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deviceID": {
                get: function() {
                    context["field"] = "deviceID";
                    context["metadata"] = (objectMetadata ? objectMetadata["deviceID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deviceID, context);
                },
                set: function(val) {
                    setterFunctions['deviceID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "clientCustomerID": {
                get: function() {
                    context["field"] = "clientCustomerID";
                    context["metadata"] = (objectMetadata ? objectMetadata["clientCustomerID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.clientCustomerID, context);
                },
                set: function(val) {
                    setterFunctions['clientCustomerID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deviceCert": {
                get: function() {
                    context["field"] = "deviceCert";
                    context["metadata"] = (objectMetadata ? objectMetadata["deviceCert"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deviceCert, context);
                },
                set: function(val) {
                    setterFunctions['deviceCert'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nonceSignature": {
                get: function() {
                    context["field"] = "nonceSignature";
                    context["metadata"] = (objectMetadata ? objectMetadata["nonceSignature"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nonceSignature, context);
                },
                set: function(val) {
                    setterFunctions['nonceSignature'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nonce": {
                get: function() {
                    context["field"] = "nonce";
                    context["metadata"] = (objectMetadata ? objectMetadata["nonce"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nonce, context);
                },
                set: function(val) {
                    setterFunctions['nonce'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentService": {
                get: function() {
                    context["field"] = "paymentService";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentService"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentService, context);
                },
                set: function(val) {
                    setterFunctions['paymentService'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vClientIDForPartner": {
                get: function() {
                    context["field"] = "vClientIDForPartner";
                    context["metadata"] = (objectMetadata ? objectMetadata["vClientIDForPartner"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vClientIDForPartner, context);
                },
                set: function(val) {
                    setterFunctions['vClientIDForPartner'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vCustomerIDForPartner": {
                get: function() {
                    context["field"] = "vCustomerIDForPartner";
                    context["metadata"] = (objectMetadata ? objectMetadata["vCustomerIDForPartner"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vCustomerIDForPartner, context);
                },
                set: function(val) {
                    setterFunctions['vCustomerIDForPartner'].call(this, val, privateState);
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
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.billingAddress = value ? (value["billingAddress"] ? value["billingAddress"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.successmsg = value ? (value["successmsg"] ? value["successmsg"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.vCardID = value ? (value["vCardID"] ? value["vCardID"] : null) : null;
            privateState.paymentAccountReference = value ? (value["paymentAccountReference"] ? value["paymentAccountReference"] : null) : null;
            privateState.deviceID = value ? (value["deviceID"] ? value["deviceID"] : null) : null;
            privateState.clientCustomerID = value ? (value["clientCustomerID"] ? value["clientCustomerID"] : null) : null;
            privateState.deviceCert = value ? (value["deviceCert"] ? value["deviceCert"] : null) : null;
            privateState.nonceSignature = value ? (value["nonceSignature"] ? value["nonceSignature"] : null) : null;
            privateState.nonce = value ? (value["nonce"] ? value["nonce"] : null) : null;
            privateState.paymentService = value ? (value["paymentService"] ? value["paymentService"] : null) : null;
            privateState.vClientIDForPartner = value ? (value["vClientIDForPartner"] ? value["vClientIDForPartner"] : null) : null;
            privateState.vCustomerIDForPartner = value ? (value["vCustomerIDForPartner"] ? value["vCustomerIDForPartner"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(SamsungPay);

    //Create new class level validator object
    BaseModel.Validator.call(SamsungPay);

    var registerValidatorBackup = SamsungPay.registerValidator;

    SamsungPay.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(SamsungPay.isValid(this, propName, val)) {
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
    //For Operation 'AddCard' with service id 'universalCardEnrollment2292'
     SamsungPay.AddCard = function(params, onCompletion){
        return SamsungPay.customVerb('AddCard', params, onCompletion);
     };

    var relations = [];

    SamsungPay.relations = relations;

    SamsungPay.prototype.isValid = function() {
        return SamsungPay.isValid(this);
    };

    SamsungPay.prototype.objModelName = "SamsungPay";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    SamsungPay.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CardManagementServices", "SamsungPay", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    SamsungPay.clone = function(objectToClone) {
        var clonedObj = new SamsungPay();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return SamsungPay;
});