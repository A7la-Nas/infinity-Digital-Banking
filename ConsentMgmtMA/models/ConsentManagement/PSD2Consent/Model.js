/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PSD2Consent", "objectService" : "ConsentManagement"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        consentTypes: function(val, state) {
            context["field"] = "consentTypes";
            context["metadata"] = (objectMetadata ? objectMetadata["consentTypes"] : null);
            state['consentTypes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementId: function(val, state) {
            context["field"] = "arrangementId";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
            state['arrangementId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        consents: function(val, state) {
            context["field"] = "consents";
            context["metadata"] = (objectMetadata ? objectMetadata["consents"] : null);
            state['consents'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        consentType: function(val, state) {
            context["field"] = "consentType";
            context["metadata"] = (objectMetadata ? objectMetadata["consentType"] : null);
            state['consentType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        consentGiven: function(val, state) {
            context["field"] = "consentGiven";
            context["metadata"] = (objectMetadata ? objectMetadata["consentGiven"] : null);
            state['consentGiven'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        consentTypeName: function(val, state) {
            context["field"] = "consentTypeName";
            context["metadata"] = (objectMetadata ? objectMetadata["consentTypeName"] : null);
            state['consentTypeName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        consentBlock: function(val, state) {
            context["field"] = "consentBlock";
            context["metadata"] = (objectMetadata ? objectMetadata["consentBlock"] : null);
            state['consentBlock'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        blockNotes: function(val, state) {
            context["field"] = "blockNotes";
            context["metadata"] = (objectMetadata ? objectMetadata["blockNotes"] : null);
            state['blockNotes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        subTypes: function(val, state) {
            context["field"] = "subTypes";
            context["metadata"] = (objectMetadata ? objectMetadata["subTypes"] : null);
            state['subTypes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        consentSubType: function(val, state) {
            context["field"] = "consentSubType";
            context["metadata"] = (objectMetadata ? objectMetadata["consentSubType"] : null);
            state['consentSubType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        consentSubTypeGiven: function(val, state) {
            context["field"] = "consentSubTypeGiven";
            context["metadata"] = (objectMetadata ? objectMetadata["consentSubTypeGiven"] : null);
            state['consentSubTypeGiven'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountIBANs: function(val, state) {
            context["field"] = "accountIBANs";
            context["metadata"] = (objectMetadata ? objectMetadata["accountIBANs"] : null);
            state['accountIBANs'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isConsentGiven: function(val, state) {
            context["field"] = "isConsentGiven";
            context["metadata"] = (objectMetadata ? objectMetadata["isConsentGiven"] : null);
            state['isConsentGiven'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountIBAN: function(val, state) {
            context["field"] = "accountIBAN";
            context["metadata"] = (objectMetadata ? objectMetadata["accountIBAN"] : null);
            state['accountIBAN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        shortName: function(val, state) {
            context["field"] = "shortName";
            context["metadata"] = (objectMetadata ? objectMetadata["shortName"] : null);
            state['shortName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        categoryId: function(val, state) {
            context["field"] = "categoryId";
            context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
            state['categoryId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        consentId: function(val, state) {
            context["field"] = "consentId";
            context["metadata"] = (objectMetadata ? objectMetadata["consentId"] : null);
            state['consentId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        thirdpartyprovider: function(val, state) {
            context["field"] = "thirdpartyprovider";
            context["metadata"] = (objectMetadata ? objectMetadata["thirdpartyprovider"] : null);
            state['thirdpartyprovider'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        imagePath: function(val, state) {
            context["field"] = "imagePath";
            context["metadata"] = (objectMetadata ? objectMetadata["imagePath"] : null);
            state['imagePath'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        consentStatus: function(val, state) {
            context["field"] = "consentStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["consentStatus"] : null);
            state['consentStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        thirdpartyproviderId: function(val, state) {
            context["field"] = "thirdpartyproviderId";
            context["metadata"] = (objectMetadata ? objectMetadata["thirdpartyproviderId"] : null);
            state['thirdpartyproviderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tppStatus: function(val, state) {
            context["field"] = "tppStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["tppStatus"] : null);
            state['tppStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        validUntil: function(val, state) {
            context["field"] = "validUntil";
            context["metadata"] = (objectMetadata ? objectMetadata["validUntil"] : null);
            state['validUntil'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PSD2Consent(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "consentTypes";
        context["metadata"] = (objectMetadata ? objectMetadata["consentTypes"] : null);
        privateState.consentTypes = defaultValues ?
            (defaultValues["consentTypes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["consentTypes"], context) :
                null) :
            null;

        context["field"] = "arrangementId";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
        privateState.arrangementId = defaultValues ?
            (defaultValues["arrangementId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementId"], context) :
                null) :
            null;

        context["field"] = "consents";
        context["metadata"] = (objectMetadata ? objectMetadata["consents"] : null);
        privateState.consents = defaultValues ?
            (defaultValues["consents"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["consents"], context) :
                null) :
            null;

        context["field"] = "consentType";
        context["metadata"] = (objectMetadata ? objectMetadata["consentType"] : null);
        privateState.consentType = defaultValues ?
            (defaultValues["consentType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["consentType"], context) :
                null) :
            null;

        context["field"] = "consentGiven";
        context["metadata"] = (objectMetadata ? objectMetadata["consentGiven"] : null);
        privateState.consentGiven = defaultValues ?
            (defaultValues["consentGiven"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["consentGiven"], context) :
                null) :
            null;

        context["field"] = "consentTypeName";
        context["metadata"] = (objectMetadata ? objectMetadata["consentTypeName"] : null);
        privateState.consentTypeName = defaultValues ?
            (defaultValues["consentTypeName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["consentTypeName"], context) :
                null) :
            null;

        context["field"] = "consentBlock";
        context["metadata"] = (objectMetadata ? objectMetadata["consentBlock"] : null);
        privateState.consentBlock = defaultValues ?
            (defaultValues["consentBlock"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["consentBlock"], context) :
                null) :
            null;

        context["field"] = "blockNotes";
        context["metadata"] = (objectMetadata ? objectMetadata["blockNotes"] : null);
        privateState.blockNotes = defaultValues ?
            (defaultValues["blockNotes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["blockNotes"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "subTypes";
        context["metadata"] = (objectMetadata ? objectMetadata["subTypes"] : null);
        privateState.subTypes = defaultValues ?
            (defaultValues["subTypes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["subTypes"], context) :
                null) :
            null;

        context["field"] = "consentSubType";
        context["metadata"] = (objectMetadata ? objectMetadata["consentSubType"] : null);
        privateState.consentSubType = defaultValues ?
            (defaultValues["consentSubType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["consentSubType"], context) :
                null) :
            null;

        context["field"] = "consentSubTypeGiven";
        context["metadata"] = (objectMetadata ? objectMetadata["consentSubTypeGiven"] : null);
        privateState.consentSubTypeGiven = defaultValues ?
            (defaultValues["consentSubTypeGiven"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["consentSubTypeGiven"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "accountIBANs";
        context["metadata"] = (objectMetadata ? objectMetadata["accountIBANs"] : null);
        privateState.accountIBANs = defaultValues ?
            (defaultValues["accountIBANs"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountIBANs"], context) :
                null) :
            null;

        context["field"] = "isConsentGiven";
        context["metadata"] = (objectMetadata ? objectMetadata["isConsentGiven"] : null);
        privateState.isConsentGiven = defaultValues ?
            (defaultValues["isConsentGiven"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isConsentGiven"], context) :
                null) :
            null;

        context["field"] = "accountIBAN";
        context["metadata"] = (objectMetadata ? objectMetadata["accountIBAN"] : null);
        privateState.accountIBAN = defaultValues ?
            (defaultValues["accountIBAN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountIBAN"], context) :
                null) :
            null;

        context["field"] = "shortName";
        context["metadata"] = (objectMetadata ? objectMetadata["shortName"] : null);
        privateState.shortName = defaultValues ?
            (defaultValues["shortName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["shortName"], context) :
                null) :
            null;

        context["field"] = "categoryId";
        context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
        privateState.categoryId = defaultValues ?
            (defaultValues["categoryId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["categoryId"], context) :
                null) :
            null;

        context["field"] = "consentId";
        context["metadata"] = (objectMetadata ? objectMetadata["consentId"] : null);
        privateState.consentId = defaultValues ?
            (defaultValues["consentId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["consentId"], context) :
                null) :
            null;

        context["field"] = "thirdpartyprovider";
        context["metadata"] = (objectMetadata ? objectMetadata["thirdpartyprovider"] : null);
        privateState.thirdpartyprovider = defaultValues ?
            (defaultValues["thirdpartyprovider"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["thirdpartyprovider"], context) :
                null) :
            null;

        context["field"] = "imagePath";
        context["metadata"] = (objectMetadata ? objectMetadata["imagePath"] : null);
        privateState.imagePath = defaultValues ?
            (defaultValues["imagePath"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["imagePath"], context) :
                null) :
            null;

        context["field"] = "consentStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["consentStatus"] : null);
        privateState.consentStatus = defaultValues ?
            (defaultValues["consentStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["consentStatus"], context) :
                null) :
            null;

        context["field"] = "thirdpartyproviderId";
        context["metadata"] = (objectMetadata ? objectMetadata["thirdpartyproviderId"] : null);
        privateState.thirdpartyproviderId = defaultValues ?
            (defaultValues["thirdpartyproviderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["thirdpartyproviderId"], context) :
                null) :
            null;

        context["field"] = "tppStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["tppStatus"] : null);
        privateState.tppStatus = defaultValues ?
            (defaultValues["tppStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tppStatus"], context) :
                null) :
            null;

        context["field"] = "validUntil";
        context["metadata"] = (objectMetadata ? objectMetadata["validUntil"] : null);
        privateState.validUntil = defaultValues ?
            (defaultValues["validUntil"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["validUntil"], context) :
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
            "consentTypes": {
                get: function() {
                    context["field"] = "consentTypes";
                    context["metadata"] = (objectMetadata ? objectMetadata["consentTypes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.consentTypes, context);
                },
                set: function(val) {
                    setterFunctions['consentTypes'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangementId": {
                get: function() {
                    context["field"] = "arrangementId";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementId, context);
                },
                set: function(val) {
                    setterFunctions['arrangementId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "consents": {
                get: function() {
                    context["field"] = "consents";
                    context["metadata"] = (objectMetadata ? objectMetadata["consents"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.consents, context);
                },
                set: function(val) {
                    setterFunctions['consents'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "consentType": {
                get: function() {
                    context["field"] = "consentType";
                    context["metadata"] = (objectMetadata ? objectMetadata["consentType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.consentType, context);
                },
                set: function(val) {
                    setterFunctions['consentType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "consentGiven": {
                get: function() {
                    context["field"] = "consentGiven";
                    context["metadata"] = (objectMetadata ? objectMetadata["consentGiven"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.consentGiven, context);
                },
                set: function(val) {
                    setterFunctions['consentGiven'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "consentTypeName": {
                get: function() {
                    context["field"] = "consentTypeName";
                    context["metadata"] = (objectMetadata ? objectMetadata["consentTypeName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.consentTypeName, context);
                },
                set: function(val) {
                    setterFunctions['consentTypeName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "consentBlock": {
                get: function() {
                    context["field"] = "consentBlock";
                    context["metadata"] = (objectMetadata ? objectMetadata["consentBlock"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.consentBlock, context);
                },
                set: function(val) {
                    setterFunctions['consentBlock'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "blockNotes": {
                get: function() {
                    context["field"] = "blockNotes";
                    context["metadata"] = (objectMetadata ? objectMetadata["blockNotes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.blockNotes, context);
                },
                set: function(val) {
                    setterFunctions['blockNotes'].call(this, val, privateState);
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
            "subTypes": {
                get: function() {
                    context["field"] = "subTypes";
                    context["metadata"] = (objectMetadata ? objectMetadata["subTypes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.subTypes, context);
                },
                set: function(val) {
                    setterFunctions['subTypes'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "consentSubType": {
                get: function() {
                    context["field"] = "consentSubType";
                    context["metadata"] = (objectMetadata ? objectMetadata["consentSubType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.consentSubType, context);
                },
                set: function(val) {
                    setterFunctions['consentSubType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "consentSubTypeGiven": {
                get: function() {
                    context["field"] = "consentSubTypeGiven";
                    context["metadata"] = (objectMetadata ? objectMetadata["consentSubTypeGiven"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.consentSubTypeGiven, context);
                },
                set: function(val) {
                    setterFunctions['consentSubTypeGiven'].call(this, val, privateState);
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
            "accountIBANs": {
                get: function() {
                    context["field"] = "accountIBANs";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountIBANs"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountIBANs, context);
                },
                set: function(val) {
                    setterFunctions['accountIBANs'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isConsentGiven": {
                get: function() {
                    context["field"] = "isConsentGiven";
                    context["metadata"] = (objectMetadata ? objectMetadata["isConsentGiven"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isConsentGiven, context);
                },
                set: function(val) {
                    setterFunctions['isConsentGiven'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountIBAN": {
                get: function() {
                    context["field"] = "accountIBAN";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountIBAN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountIBAN, context);
                },
                set: function(val) {
                    setterFunctions['accountIBAN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "shortName": {
                get: function() {
                    context["field"] = "shortName";
                    context["metadata"] = (objectMetadata ? objectMetadata["shortName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.shortName, context);
                },
                set: function(val) {
                    setterFunctions['shortName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "categoryId": {
                get: function() {
                    context["field"] = "categoryId";
                    context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.categoryId, context);
                },
                set: function(val) {
                    setterFunctions['categoryId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "consentId": {
                get: function() {
                    context["field"] = "consentId";
                    context["metadata"] = (objectMetadata ? objectMetadata["consentId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.consentId, context);
                },
                set: function(val) {
                    setterFunctions['consentId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "thirdpartyprovider": {
                get: function() {
                    context["field"] = "thirdpartyprovider";
                    context["metadata"] = (objectMetadata ? objectMetadata["thirdpartyprovider"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.thirdpartyprovider, context);
                },
                set: function(val) {
                    setterFunctions['thirdpartyprovider'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "imagePath": {
                get: function() {
                    context["field"] = "imagePath";
                    context["metadata"] = (objectMetadata ? objectMetadata["imagePath"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.imagePath, context);
                },
                set: function(val) {
                    setterFunctions['imagePath'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "consentStatus": {
                get: function() {
                    context["field"] = "consentStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["consentStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.consentStatus, context);
                },
                set: function(val) {
                    setterFunctions['consentStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "thirdpartyproviderId": {
                get: function() {
                    context["field"] = "thirdpartyproviderId";
                    context["metadata"] = (objectMetadata ? objectMetadata["thirdpartyproviderId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.thirdpartyproviderId, context);
                },
                set: function(val) {
                    setterFunctions['thirdpartyproviderId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tppStatus": {
                get: function() {
                    context["field"] = "tppStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["tppStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tppStatus, context);
                },
                set: function(val) {
                    setterFunctions['tppStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "validUntil": {
                get: function() {
                    context["field"] = "validUntil";
                    context["metadata"] = (objectMetadata ? objectMetadata["validUntil"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.validUntil, context);
                },
                set: function(val) {
                    setterFunctions['validUntil'].call(this, val, privateState);
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
            privateState.consentTypes = value ? (value["consentTypes"] ? value["consentTypes"] : null) : null;
            privateState.arrangementId = value ? (value["arrangementId"] ? value["arrangementId"] : null) : null;
            privateState.consents = value ? (value["consents"] ? value["consents"] : null) : null;
            privateState.consentType = value ? (value["consentType"] ? value["consentType"] : null) : null;
            privateState.consentGiven = value ? (value["consentGiven"] ? value["consentGiven"] : null) : null;
            privateState.consentTypeName = value ? (value["consentTypeName"] ? value["consentTypeName"] : null) : null;
            privateState.consentBlock = value ? (value["consentBlock"] ? value["consentBlock"] : null) : null;
            privateState.blockNotes = value ? (value["blockNotes"] ? value["blockNotes"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.subTypes = value ? (value["subTypes"] ? value["subTypes"] : null) : null;
            privateState.consentSubType = value ? (value["consentSubType"] ? value["consentSubType"] : null) : null;
            privateState.consentSubTypeGiven = value ? (value["consentSubTypeGiven"] ? value["consentSubTypeGiven"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.accountIBANs = value ? (value["accountIBANs"] ? value["accountIBANs"] : null) : null;
            privateState.isConsentGiven = value ? (value["isConsentGiven"] ? value["isConsentGiven"] : null) : null;
            privateState.accountIBAN = value ? (value["accountIBAN"] ? value["accountIBAN"] : null) : null;
            privateState.shortName = value ? (value["shortName"] ? value["shortName"] : null) : null;
            privateState.categoryId = value ? (value["categoryId"] ? value["categoryId"] : null) : null;
            privateState.consentId = value ? (value["consentId"] ? value["consentId"] : null) : null;
            privateState.thirdpartyprovider = value ? (value["thirdpartyprovider"] ? value["thirdpartyprovider"] : null) : null;
            privateState.imagePath = value ? (value["imagePath"] ? value["imagePath"] : null) : null;
            privateState.consentStatus = value ? (value["consentStatus"] ? value["consentStatus"] : null) : null;
            privateState.thirdpartyproviderId = value ? (value["thirdpartyproviderId"] ? value["thirdpartyproviderId"] : null) : null;
            privateState.tppStatus = value ? (value["tppStatus"] ? value["tppStatus"] : null) : null;
            privateState.validUntil = value ? (value["validUntil"] ? value["validUntil"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PSD2Consent);

    //Create new class level validator object
    BaseModel.Validator.call(PSD2Consent);

    var registerValidatorBackup = PSD2Consent.registerValidator;

    PSD2Consent.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PSD2Consent.isValid(this, propName, val)) {
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
    //For Operation 'getConsent' with service id 'getPSDConsentGateway4428'
     PSD2Consent.getConsent = function(params, onCompletion){
        return PSD2Consent.customVerb('getConsent', params, onCompletion);
     };

    //For Operation 'updateConsent' with service id 'createOrder3951'
     PSD2Consent.updateConsent = function(params, onCompletion){
        return PSD2Consent.customVerb('updateConsent', params, onCompletion);
     };

    var relations = [];

    PSD2Consent.relations = relations;

    PSD2Consent.prototype.isValid = function() {
        return PSD2Consent.isValid(this);
    };

    PSD2Consent.prototype.objModelName = "PSD2Consent";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PSD2Consent.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ConsentManagement", "PSD2Consent", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PSD2Consent.clone = function(objectToClone) {
        var clonedObj = new PSD2Consent();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PSD2Consent;
});