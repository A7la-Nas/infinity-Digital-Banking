/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Locations", "objectService" : "ContentManagement"};

    var setterFunctions = {
        addressLine1: function(val, state) {
            context["field"] = "addressLine1";
            context["metadata"] = (objectMetadata ? objectMetadata["addressLine1"] : null);
            state['addressLine1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        addressLine2: function(val, state) {
            context["field"] = "addressLine2";
            context["metadata"] = (objectMetadata ? objectMetadata["addressLine2"] : null);
            state['addressLine2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        API_KEY: function(val, state) {
            context["field"] = "API_KEY";
            context["metadata"] = (objectMetadata ? objectMetadata["API_KEY"] : null);
            state['API_KEY'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currLatitude: function(val, state) {
            context["field"] = "currLatitude";
            context["metadata"] = (objectMetadata ? objectMetadata["currLatitude"] : null);
            state['currLatitude'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currLongitude: function(val, state) {
            context["field"] = "currLongitude";
            context["metadata"] = (objectMetadata ? objectMetadata["currLongitude"] : null);
            state['currLongitude'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        distance: function(val, state) {
            context["field"] = "distance";
            context["metadata"] = (objectMetadata ? objectMetadata["distance"] : null);
            state['distance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        formattedAddress: function(val, state) {
            context["field"] = "formattedAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["formattedAddress"] : null);
            state['formattedAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        informationTitle: function(val, state) {
            context["field"] = "informationTitle";
            context["metadata"] = (objectMetadata ? objectMetadata["informationTitle"] : null);
            state['informationTitle'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        latitude: function(val, state) {
            context["field"] = "latitude";
            context["metadata"] = (objectMetadata ? objectMetadata["latitude"] : null);
            state['latitude'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        locationId: function(val, state) {
            context["field"] = "locationId";
            context["metadata"] = (objectMetadata ? objectMetadata["locationId"] : null);
            state['locationId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        longitude: function(val, state) {
            context["field"] = "longitude";
            context["metadata"] = (objectMetadata ? objectMetadata["longitude"] : null);
            state['longitude'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        mapURL: function(val, state) {
            context["field"] = "mapURL";
            context["metadata"] = (objectMetadata ? objectMetadata["mapURL"] : null);
            state['mapURL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        name: function(val, state) {
            context["field"] = "name";
            context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
            state['name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phoneNumber: function(val, state) {
            context["field"] = "phoneNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["phoneNumber"] : null);
            state['phoneNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        placeID: function(val, state) {
            context["field"] = "placeID";
            context["metadata"] = (objectMetadata ? objectMetadata["placeID"] : null);
            state['placeID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        place_id: function(val, state) {
            context["field"] = "place_id";
            context["metadata"] = (objectMetadata ? objectMetadata["place_id"] : null);
            state['place_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        query: function(val, state) {
            context["field"] = "query";
            context["metadata"] = (objectMetadata ? objectMetadata["query"] : null);
            state['query'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        radius: function(val, state) {
            context["field"] = "radius";
            context["metadata"] = (objectMetadata ? objectMetadata["radius"] : null);
            state['radius'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rating: function(val, state) {
            context["field"] = "rating";
            context["metadata"] = (objectMetadata ? objectMetadata["rating"] : null);
            state['rating'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        services: function(val, state) {
            context["field"] = "services";
            context["metadata"] = (objectMetadata ? objectMetadata["services"] : null);
            state['services'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        type: function(val, state) {
            context["field"] = "type";
            context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
            state['type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        types: function(val, state) {
            context["field"] = "types";
            context["metadata"] = (objectMetadata ? objectMetadata["types"] : null);
            state['types'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        webSiteURL: function(val, state) {
            context["field"] = "webSiteURL";
            context["metadata"] = (objectMetadata ? objectMetadata["webSiteURL"] : null);
            state['webSiteURL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        workingHours: function(val, state) {
            context["field"] = "workingHours";
            context["metadata"] = (objectMetadata ? objectMetadata["workingHours"] : null);
            state['workingHours'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Locations(defaultValues) {
        var privateState = {};
        context["field"] = "addressLine1";
        context["metadata"] = (objectMetadata ? objectMetadata["addressLine1"] : null);
        privateState.addressLine1 = defaultValues ?
            (defaultValues["addressLine1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addressLine1"], context) :
                null) :
            null;

        context["field"] = "addressLine2";
        context["metadata"] = (objectMetadata ? objectMetadata["addressLine2"] : null);
        privateState.addressLine2 = defaultValues ?
            (defaultValues["addressLine2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addressLine2"], context) :
                null) :
            null;

        context["field"] = "API_KEY";
        context["metadata"] = (objectMetadata ? objectMetadata["API_KEY"] : null);
        privateState.API_KEY = defaultValues ?
            (defaultValues["API_KEY"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["API_KEY"], context) :
                null) :
            null;

        context["field"] = "currLatitude";
        context["metadata"] = (objectMetadata ? objectMetadata["currLatitude"] : null);
        privateState.currLatitude = defaultValues ?
            (defaultValues["currLatitude"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currLatitude"], context) :
                null) :
            null;

        context["field"] = "currLongitude";
        context["metadata"] = (objectMetadata ? objectMetadata["currLongitude"] : null);
        privateState.currLongitude = defaultValues ?
            (defaultValues["currLongitude"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currLongitude"], context) :
                null) :
            null;

        context["field"] = "distance";
        context["metadata"] = (objectMetadata ? objectMetadata["distance"] : null);
        privateState.distance = defaultValues ?
            (defaultValues["distance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["distance"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "formattedAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["formattedAddress"] : null);
        privateState.formattedAddress = defaultValues ?
            (defaultValues["formattedAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["formattedAddress"], context) :
                null) :
            null;

        context["field"] = "informationTitle";
        context["metadata"] = (objectMetadata ? objectMetadata["informationTitle"] : null);
        privateState.informationTitle = defaultValues ?
            (defaultValues["informationTitle"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["informationTitle"], context) :
                null) :
            null;

        context["field"] = "latitude";
        context["metadata"] = (objectMetadata ? objectMetadata["latitude"] : null);
        privateState.latitude = defaultValues ?
            (defaultValues["latitude"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["latitude"], context) :
                null) :
            null;

        context["field"] = "locationId";
        context["metadata"] = (objectMetadata ? objectMetadata["locationId"] : null);
        privateState.locationId = defaultValues ?
            (defaultValues["locationId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["locationId"], context) :
                null) :
            null;

        context["field"] = "longitude";
        context["metadata"] = (objectMetadata ? objectMetadata["longitude"] : null);
        privateState.longitude = defaultValues ?
            (defaultValues["longitude"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["longitude"], context) :
                null) :
            null;

        context["field"] = "mapURL";
        context["metadata"] = (objectMetadata ? objectMetadata["mapURL"] : null);
        privateState.mapURL = defaultValues ?
            (defaultValues["mapURL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["mapURL"], context) :
                null) :
            null;

        context["field"] = "name";
        context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
        privateState.name = defaultValues ?
            (defaultValues["name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["name"], context) :
                null) :
            null;

        context["field"] = "phoneNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["phoneNumber"] : null);
        privateState.phoneNumber = defaultValues ?
            (defaultValues["phoneNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phoneNumber"], context) :
                null) :
            null;

        context["field"] = "placeID";
        context["metadata"] = (objectMetadata ? objectMetadata["placeID"] : null);
        privateState.placeID = defaultValues ?
            (defaultValues["placeID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["placeID"], context) :
                null) :
            null;

        context["field"] = "place_id";
        context["metadata"] = (objectMetadata ? objectMetadata["place_id"] : null);
        privateState.place_id = defaultValues ?
            (defaultValues["place_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["place_id"], context) :
                null) :
            null;

        context["field"] = "query";
        context["metadata"] = (objectMetadata ? objectMetadata["query"] : null);
        privateState.query = defaultValues ?
            (defaultValues["query"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["query"], context) :
                null) :
            null;

        context["field"] = "radius";
        context["metadata"] = (objectMetadata ? objectMetadata["radius"] : null);
        privateState.radius = defaultValues ?
            (defaultValues["radius"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["radius"], context) :
                null) :
            null;

        context["field"] = "rating";
        context["metadata"] = (objectMetadata ? objectMetadata["rating"] : null);
        privateState.rating = defaultValues ?
            (defaultValues["rating"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rating"], context) :
                null) :
            null;

        context["field"] = "services";
        context["metadata"] = (objectMetadata ? objectMetadata["services"] : null);
        privateState.services = defaultValues ?
            (defaultValues["services"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["services"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "type";
        context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
        privateState.type = defaultValues ?
            (defaultValues["type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["type"], context) :
                null) :
            null;

        context["field"] = "types";
        context["metadata"] = (objectMetadata ? objectMetadata["types"] : null);
        privateState.types = defaultValues ?
            (defaultValues["types"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["types"], context) :
                null) :
            null;

        context["field"] = "webSiteURL";
        context["metadata"] = (objectMetadata ? objectMetadata["webSiteURL"] : null);
        privateState.webSiteURL = defaultValues ?
            (defaultValues["webSiteURL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["webSiteURL"], context) :
                null) :
            null;

        context["field"] = "workingHours";
        context["metadata"] = (objectMetadata ? objectMetadata["workingHours"] : null);
        privateState.workingHours = defaultValues ?
            (defaultValues["workingHours"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["workingHours"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "addressLine1": {
                get: function() {
                    context["field"] = "addressLine1";
                    context["metadata"] = (objectMetadata ? objectMetadata["addressLine1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addressLine1, context);
                },
                set: function(val) {
                    setterFunctions['addressLine1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "addressLine2": {
                get: function() {
                    context["field"] = "addressLine2";
                    context["metadata"] = (objectMetadata ? objectMetadata["addressLine2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addressLine2, context);
                },
                set: function(val) {
                    setterFunctions['addressLine2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "API_KEY": {
                get: function() {
                    context["field"] = "API_KEY";
                    context["metadata"] = (objectMetadata ? objectMetadata["API_KEY"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.API_KEY, context);
                },
                set: function(val) {
                    setterFunctions['API_KEY'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currLatitude": {
                get: function() {
                    context["field"] = "currLatitude";
                    context["metadata"] = (objectMetadata ? objectMetadata["currLatitude"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currLatitude, context);
                },
                set: function(val) {
                    setterFunctions['currLatitude'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currLongitude": {
                get: function() {
                    context["field"] = "currLongitude";
                    context["metadata"] = (objectMetadata ? objectMetadata["currLongitude"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currLongitude, context);
                },
                set: function(val) {
                    setterFunctions['currLongitude'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "distance": {
                get: function() {
                    context["field"] = "distance";
                    context["metadata"] = (objectMetadata ? objectMetadata["distance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.distance, context);
                },
                set: function(val) {
                    setterFunctions['distance'].call(this, val, privateState);
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
            "formattedAddress": {
                get: function() {
                    context["field"] = "formattedAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["formattedAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.formattedAddress, context);
                },
                set: function(val) {
                    setterFunctions['formattedAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "informationTitle": {
                get: function() {
                    context["field"] = "informationTitle";
                    context["metadata"] = (objectMetadata ? objectMetadata["informationTitle"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.informationTitle, context);
                },
                set: function(val) {
                    setterFunctions['informationTitle'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "latitude": {
                get: function() {
                    context["field"] = "latitude";
                    context["metadata"] = (objectMetadata ? objectMetadata["latitude"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.latitude, context);
                },
                set: function(val) {
                    setterFunctions['latitude'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "locationId": {
                get: function() {
                    context["field"] = "locationId";
                    context["metadata"] = (objectMetadata ? objectMetadata["locationId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.locationId, context);
                },
                set: function(val) {
                    setterFunctions['locationId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "longitude": {
                get: function() {
                    context["field"] = "longitude";
                    context["metadata"] = (objectMetadata ? objectMetadata["longitude"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.longitude, context);
                },
                set: function(val) {
                    setterFunctions['longitude'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "mapURL": {
                get: function() {
                    context["field"] = "mapURL";
                    context["metadata"] = (objectMetadata ? objectMetadata["mapURL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.mapURL, context);
                },
                set: function(val) {
                    setterFunctions['mapURL'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "name": {
                get: function() {
                    context["field"] = "name";
                    context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.name, context);
                },
                set: function(val) {
                    setterFunctions['name'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "phoneNumber": {
                get: function() {
                    context["field"] = "phoneNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["phoneNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.phoneNumber, context);
                },
                set: function(val) {
                    setterFunctions['phoneNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "placeID": {
                get: function() {
                    context["field"] = "placeID";
                    context["metadata"] = (objectMetadata ? objectMetadata["placeID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.placeID, context);
                },
                set: function(val) {
                    setterFunctions['placeID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "place_id": {
                get: function() {
                    context["field"] = "place_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["place_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.place_id, context);
                },
                set: function(val) {
                    setterFunctions['place_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "query": {
                get: function() {
                    context["field"] = "query";
                    context["metadata"] = (objectMetadata ? objectMetadata["query"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.query, context);
                },
                set: function(val) {
                    setterFunctions['query'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "radius": {
                get: function() {
                    context["field"] = "radius";
                    context["metadata"] = (objectMetadata ? objectMetadata["radius"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.radius, context);
                },
                set: function(val) {
                    setterFunctions['radius'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rating": {
                get: function() {
                    context["field"] = "rating";
                    context["metadata"] = (objectMetadata ? objectMetadata["rating"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rating, context);
                },
                set: function(val) {
                    setterFunctions['rating'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "services": {
                get: function() {
                    context["field"] = "services";
                    context["metadata"] = (objectMetadata ? objectMetadata["services"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.services, context);
                },
                set: function(val) {
                    setterFunctions['services'].call(this, val, privateState);
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
            "type": {
                get: function() {
                    context["field"] = "type";
                    context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.type, context);
                },
                set: function(val) {
                    setterFunctions['type'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "types": {
                get: function() {
                    context["field"] = "types";
                    context["metadata"] = (objectMetadata ? objectMetadata["types"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.types, context);
                },
                set: function(val) {
                    setterFunctions['types'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "webSiteURL": {
                get: function() {
                    context["field"] = "webSiteURL";
                    context["metadata"] = (objectMetadata ? objectMetadata["webSiteURL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.webSiteURL, context);
                },
                set: function(val) {
                    setterFunctions['webSiteURL'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "workingHours": {
                get: function() {
                    context["field"] = "workingHours";
                    context["metadata"] = (objectMetadata ? objectMetadata["workingHours"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.workingHours, context);
                },
                set: function(val) {
                    setterFunctions['workingHours'].call(this, val, privateState);
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
            privateState.addressLine1 = value ? (value["addressLine1"] ? value["addressLine1"] : null) : null;
            privateState.addressLine2 = value ? (value["addressLine2"] ? value["addressLine2"] : null) : null;
            privateState.API_KEY = value ? (value["API_KEY"] ? value["API_KEY"] : null) : null;
            privateState.currLatitude = value ? (value["currLatitude"] ? value["currLatitude"] : null) : null;
            privateState.currLongitude = value ? (value["currLongitude"] ? value["currLongitude"] : null) : null;
            privateState.distance = value ? (value["distance"] ? value["distance"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.formattedAddress = value ? (value["formattedAddress"] ? value["formattedAddress"] : null) : null;
            privateState.informationTitle = value ? (value["informationTitle"] ? value["informationTitle"] : null) : null;
            privateState.latitude = value ? (value["latitude"] ? value["latitude"] : null) : null;
            privateState.locationId = value ? (value["locationId"] ? value["locationId"] : null) : null;
            privateState.longitude = value ? (value["longitude"] ? value["longitude"] : null) : null;
            privateState.mapURL = value ? (value["mapURL"] ? value["mapURL"] : null) : null;
            privateState.name = value ? (value["name"] ? value["name"] : null) : null;
            privateState.phoneNumber = value ? (value["phoneNumber"] ? value["phoneNumber"] : null) : null;
            privateState.placeID = value ? (value["placeID"] ? value["placeID"] : null) : null;
            privateState.place_id = value ? (value["place_id"] ? value["place_id"] : null) : null;
            privateState.query = value ? (value["query"] ? value["query"] : null) : null;
            privateState.radius = value ? (value["radius"] ? value["radius"] : null) : null;
            privateState.rating = value ? (value["rating"] ? value["rating"] : null) : null;
            privateState.services = value ? (value["services"] ? value["services"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.types = value ? (value["types"] ? value["types"] : null) : null;
            privateState.webSiteURL = value ? (value["webSiteURL"] ? value["webSiteURL"] : null) : null;
            privateState.workingHours = value ? (value["workingHours"] ? value["workingHours"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Locations);

    //Create new class level validator object
    BaseModel.Validator.call(Locations);

    var registerValidatorBackup = Locations.registerValidator;

    Locations.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Locations.isValid(this, propName, val)) {
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
    //For Operation 'getList' with service id 'getLocationList8677'
     Locations.getList = function(params, onCompletion){
        return Locations.customVerb('getList', params, onCompletion);
     };

    //For Operation 'getRange' with service id 'getLocationRange4103'
     Locations.getRange = function(params, onCompletion){
        return Locations.customVerb('getRange', params, onCompletion);
     };

    //For Operation 'getAddressSuggestions' with service id 'getAddressSuggestions5942'
     Locations.getAddressSuggestions = function(params, onCompletion){
        return Locations.customVerb('getAddressSuggestions', params, onCompletion);
     };

    //For Operation 'getDetails' with service id 'getLocationDetails3188'
     Locations.getDetails = function(params, onCompletion){
        return Locations.customVerb('getDetails', params, onCompletion);
     };

    //For Operation 'getAddress' with service id 'GetLocationAddress6098'
     Locations.getAddress = function(params, onCompletion){
        return Locations.customVerb('getAddress', params, onCompletion);
     };

    //For Operation 'getQuery' with service id 'getSearchedLocations1286'
     Locations.getQuery = function(params, onCompletion){
        return Locations.customVerb('getQuery', params, onCompletion);
     };

    var relations = [];

    Locations.relations = relations;

    Locations.prototype.isValid = function() {
        return Locations.isValid(this);
    };

    Locations.prototype.objModelName = "Locations";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Locations.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ContentManagement", "Locations", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Locations.clone = function(objectToClone) {
        var clonedObj = new Locations();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Locations;
});