/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Contract", "objectService" : "ExternalUserManagement"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        name: function(val, state) {
            context["field"] = "name";
            context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
            state['name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coreCustomerId: function(val, state) {
            context["field"] = "coreCustomerId";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
            state['coreCustomerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contractId: function(val, state) {
            context["field"] = "contractId";
            context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
            state['contractId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contractName: function(val, state) {
            context["field"] = "contractName";
            context["metadata"] = (objectMetadata ? objectMetadata["contractName"] : null);
            state['contractName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerName: function(val, state) {
            context["field"] = "customerName";
            context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
            state['customerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        email: function(val, state) {
            context["field"] = "email";
            context["metadata"] = (objectMetadata ? objectMetadata["email"] : null);
            state['email'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phoneCountryCode: function(val, state) {
            context["field"] = "phoneCountryCode";
            context["metadata"] = (objectMetadata ? objectMetadata["phoneCountryCode"] : null);
            state['phoneCountryCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phoneNumber: function(val, state) {
            context["field"] = "phoneNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["phoneNumber"] : null);
            state['phoneNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateOfBirth: function(val, state) {
            context["field"] = "dateOfBirth";
            context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
            state['dateOfBirth'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceDefinitionName: function(val, state) {
            context["field"] = "serviceDefinitionName";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionName"] : null);
            state['serviceDefinitionName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceDefinitionId: function(val, state) {
            context["field"] = "serviceDefinitionId";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionId"] : null);
            state['serviceDefinitionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        faxId: function(val, state) {
            context["field"] = "faxId";
            context["metadata"] = (objectMetadata ? objectMetadata["faxId"] : null);
            state['faxId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
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
        state: function(val, state) {
            context["field"] = "state";
            context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
            state['state'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        country: function(val, state) {
            context["field"] = "country";
            context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
            state['country'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        city: function(val, state) {
            context["field"] = "city";
            context["metadata"] = (objectMetadata ? objectMetadata["city"] : null);
            state['city'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        zipCode: function(val, state) {
            context["field"] = "zipCode";
            context["metadata"] = (objectMetadata ? objectMetadata["zipCode"] : null);
            state['zipCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        relationshipName: function(val, state) {
            context["field"] = "relationshipName";
            context["metadata"] = (objectMetadata ? objectMetadata["relationshipName"] : null);
            state['relationshipName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        relationshipId: function(val, state) {
            context["field"] = "relationshipId";
            context["metadata"] = (objectMetadata ? objectMetadata["relationshipId"] : null);
            state['relationshipId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        industry: function(val, state) {
            context["field"] = "industry";
            context["metadata"] = (objectMetadata ? objectMetadata["industry"] : null);
            state['industry'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isAssociated: function(val, state) {
            context["field"] = "isAssociated";
            context["metadata"] = (objectMetadata ? objectMetadata["isAssociated"] : null);
            state['isAssociated'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountType: function(val, state) {
            context["field"] = "accountType";
            context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
            state['accountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountHolderName: function(val, state) {
            context["field"] = "accountHolderName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountHolderName"] : null);
            state['accountHolderName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerStatus: function(val, state) {
            context["field"] = "customerStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["customerStatus"] : null);
            state['customerStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customers: function(val, state) {
            context["field"] = "customers";
            context["metadata"] = (objectMetadata ? objectMetadata["customers"] : null);
            state['customers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        communication: function(val, state) {
            context["field"] = "communication";
            context["metadata"] = (objectMetadata ? objectMetadata["communication"] : null);
            state['communication'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        address: function(val, state) {
            context["field"] = "address";
            context["metadata"] = (objectMetadata ? objectMetadata["address"] : null);
            state['address'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contractCustomers: function(val, state) {
            context["field"] = "contractCustomers";
            context["metadata"] = (objectMetadata ? objectMetadata["contractCustomers"] : null);
            state['contractCustomers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coreCustomerName: function(val, state) {
            context["field"] = "coreCustomerName";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerName"] : null);
            state['coreCustomerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rejectedby: function(val, state) {
            context["field"] = "rejectedby";
            context["metadata"] = (objectMetadata ? objectMetadata["rejectedby"] : null);
            state['rejectedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rejectedReason: function(val, state) {
            context["field"] = "rejectedReason";
            context["metadata"] = (objectMetadata ? objectMetadata["rejectedReason"] : null);
            state['rejectedReason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        statusId: function(val, state) {
            context["field"] = "statusId";
            context["metadata"] = (objectMetadata ? objectMetadata["statusId"] : null);
            state['statusId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coreCustomerRoleIdList: function(val, state) {
            context["field"] = "coreCustomerRoleIdList";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerRoleIdList"] : null);
            state['coreCustomerRoleIdList'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FirstName: function(val, state) {
            context["field"] = "FirstName";
            context["metadata"] = (objectMetadata ? objectMetadata["FirstName"] : null);
            state['FirstName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        LastName: function(val, state) {
            context["field"] = "LastName";
            context["metadata"] = (objectMetadata ? objectMetadata["LastName"] : null);
            state['LastName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Ssn: function(val, state) {
            context["field"] = "Ssn";
            context["metadata"] = (objectMetadata ? objectMetadata["Ssn"] : null);
            state['Ssn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Cif: function(val, state) {
            context["field"] = "Cif";
            context["metadata"] = (objectMetadata ? objectMetadata["Cif"] : null);
            state['Cif'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyName: function(val, state) {
            context["field"] = "companyName";
            context["metadata"] = (objectMetadata ? objectMetadata["companyName"] : null);
            state['companyName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Taxid: function(val, state) {
            context["field"] = "Taxid";
            context["metadata"] = (objectMetadata ? objectMetadata["Taxid"] : null);
            state['Taxid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        masterServiceKey: function(val, state) {
            context["field"] = "masterServiceKey";
            context["metadata"] = (objectMetadata ? objectMetadata["masterServiceKey"] : null);
            state['masterServiceKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceKey: function(val, state) {
            context["field"] = "serviceKey";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
            state['serviceKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        authorizedSignatory: function(val, state) {
            context["field"] = "authorizedSignatory";
            context["metadata"] = (objectMetadata ? objectMetadata["authorizedSignatory"] : null);
            state['authorizedSignatory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phone: function(val, state) {
            context["field"] = "phone";
            context["metadata"] = (objectMetadata ? objectMetadata["phone"] : null);
            state['phone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        authorizedSignatoryRoles: function(val, state) {
            context["field"] = "authorizedSignatoryRoles";
            context["metadata"] = (objectMetadata ? objectMetadata["authorizedSignatoryRoles"] : null);
            state['authorizedSignatoryRoles'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Contract(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "name";
        context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
        privateState.name = defaultValues ?
            (defaultValues["name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["name"], context) :
                null) :
            null;

        context["field"] = "coreCustomerId";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
        privateState.coreCustomerId = defaultValues ?
            (defaultValues["coreCustomerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerId"], context) :
                null) :
            null;

        context["field"] = "contractId";
        context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
        privateState.contractId = defaultValues ?
            (defaultValues["contractId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contractId"], context) :
                null) :
            null;

        context["field"] = "contractName";
        context["metadata"] = (objectMetadata ? objectMetadata["contractName"] : null);
        privateState.contractName = defaultValues ?
            (defaultValues["contractName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contractName"], context) :
                null) :
            null;

        context["field"] = "customerName";
        context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
        privateState.customerName = defaultValues ?
            (defaultValues["customerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerName"], context) :
                null) :
            null;

        context["field"] = "email";
        context["metadata"] = (objectMetadata ? objectMetadata["email"] : null);
        privateState.email = defaultValues ?
            (defaultValues["email"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["email"], context) :
                null) :
            null;

        context["field"] = "phoneCountryCode";
        context["metadata"] = (objectMetadata ? objectMetadata["phoneCountryCode"] : null);
        privateState.phoneCountryCode = defaultValues ?
            (defaultValues["phoneCountryCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phoneCountryCode"], context) :
                null) :
            null;

        context["field"] = "phoneNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["phoneNumber"] : null);
        privateState.phoneNumber = defaultValues ?
            (defaultValues["phoneNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phoneNumber"], context) :
                null) :
            null;

        context["field"] = "dateOfBirth";
        context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
        privateState.dateOfBirth = defaultValues ?
            (defaultValues["dateOfBirth"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateOfBirth"], context) :
                null) :
            null;

        context["field"] = "serviceDefinitionName";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionName"] : null);
        privateState.serviceDefinitionName = defaultValues ?
            (defaultValues["serviceDefinitionName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceDefinitionName"], context) :
                null) :
            null;

        context["field"] = "serviceDefinitionId";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionId"] : null);
        privateState.serviceDefinitionId = defaultValues ?
            (defaultValues["serviceDefinitionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceDefinitionId"], context) :
                null) :
            null;

        context["field"] = "faxId";
        context["metadata"] = (objectMetadata ? objectMetadata["faxId"] : null);
        privateState.faxId = defaultValues ?
            (defaultValues["faxId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["faxId"], context) :
                null) :
            null;

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

        context["field"] = "state";
        context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
        privateState.state = defaultValues ?
            (defaultValues["state"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["state"], context) :
                null) :
            null;

        context["field"] = "country";
        context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
        privateState.country = defaultValues ?
            (defaultValues["country"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["country"], context) :
                null) :
            null;

        context["field"] = "city";
        context["metadata"] = (objectMetadata ? objectMetadata["city"] : null);
        privateState.city = defaultValues ?
            (defaultValues["city"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["city"], context) :
                null) :
            null;

        context["field"] = "zipCode";
        context["metadata"] = (objectMetadata ? objectMetadata["zipCode"] : null);
        privateState.zipCode = defaultValues ?
            (defaultValues["zipCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["zipCode"], context) :
                null) :
            null;

        context["field"] = "relationshipName";
        context["metadata"] = (objectMetadata ? objectMetadata["relationshipName"] : null);
        privateState.relationshipName = defaultValues ?
            (defaultValues["relationshipName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["relationshipName"], context) :
                null) :
            null;

        context["field"] = "relationshipId";
        context["metadata"] = (objectMetadata ? objectMetadata["relationshipId"] : null);
        privateState.relationshipId = defaultValues ?
            (defaultValues["relationshipId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["relationshipId"], context) :
                null) :
            null;

        context["field"] = "industry";
        context["metadata"] = (objectMetadata ? objectMetadata["industry"] : null);
        privateState.industry = defaultValues ?
            (defaultValues["industry"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["industry"], context) :
                null) :
            null;

        context["field"] = "isAssociated";
        context["metadata"] = (objectMetadata ? objectMetadata["isAssociated"] : null);
        privateState.isAssociated = defaultValues ?
            (defaultValues["isAssociated"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isAssociated"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "accountType";
        context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
        privateState.accountType = defaultValues ?
            (defaultValues["accountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountType"], context) :
                null) :
            null;

        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "accountHolderName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountHolderName"] : null);
        privateState.accountHolderName = defaultValues ?
            (defaultValues["accountHolderName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountHolderName"], context) :
                null) :
            null;

        context["field"] = "customerStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["customerStatus"] : null);
        privateState.customerStatus = defaultValues ?
            (defaultValues["customerStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerStatus"], context) :
                null) :
            null;

        context["field"] = "customers";
        context["metadata"] = (objectMetadata ? objectMetadata["customers"] : null);
        privateState.customers = defaultValues ?
            (defaultValues["customers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customers"], context) :
                null) :
            null;

        context["field"] = "communication";
        context["metadata"] = (objectMetadata ? objectMetadata["communication"] : null);
        privateState.communication = defaultValues ?
            (defaultValues["communication"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["communication"], context) :
                null) :
            null;

        context["field"] = "address";
        context["metadata"] = (objectMetadata ? objectMetadata["address"] : null);
        privateState.address = defaultValues ?
            (defaultValues["address"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["address"], context) :
                null) :
            null;

        context["field"] = "contractCustomers";
        context["metadata"] = (objectMetadata ? objectMetadata["contractCustomers"] : null);
        privateState.contractCustomers = defaultValues ?
            (defaultValues["contractCustomers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contractCustomers"], context) :
                null) :
            null;

        context["field"] = "coreCustomerName";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerName"] : null);
        privateState.coreCustomerName = defaultValues ?
            (defaultValues["coreCustomerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerName"], context) :
                null) :
            null;

        context["field"] = "rejectedby";
        context["metadata"] = (objectMetadata ? objectMetadata["rejectedby"] : null);
        privateState.rejectedby = defaultValues ?
            (defaultValues["rejectedby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rejectedby"], context) :
                null) :
            null;

        context["field"] = "rejectedReason";
        context["metadata"] = (objectMetadata ? objectMetadata["rejectedReason"] : null);
        privateState.rejectedReason = defaultValues ?
            (defaultValues["rejectedReason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rejectedReason"], context) :
                null) :
            null;

        context["field"] = "statusId";
        context["metadata"] = (objectMetadata ? objectMetadata["statusId"] : null);
        privateState.statusId = defaultValues ?
            (defaultValues["statusId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["statusId"], context) :
                null) :
            null;

        context["field"] = "coreCustomerRoleIdList";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerRoleIdList"] : null);
        privateState.coreCustomerRoleIdList = defaultValues ?
            (defaultValues["coreCustomerRoleIdList"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerRoleIdList"], context) :
                null) :
            null;

        context["field"] = "FirstName";
        context["metadata"] = (objectMetadata ? objectMetadata["FirstName"] : null);
        privateState.FirstName = defaultValues ?
            (defaultValues["FirstName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FirstName"], context) :
                null) :
            null;

        context["field"] = "LastName";
        context["metadata"] = (objectMetadata ? objectMetadata["LastName"] : null);
        privateState.LastName = defaultValues ?
            (defaultValues["LastName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["LastName"], context) :
                null) :
            null;

        context["field"] = "Ssn";
        context["metadata"] = (objectMetadata ? objectMetadata["Ssn"] : null);
        privateState.Ssn = defaultValues ?
            (defaultValues["Ssn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Ssn"], context) :
                null) :
            null;

        context["field"] = "Cif";
        context["metadata"] = (objectMetadata ? objectMetadata["Cif"] : null);
        privateState.Cif = defaultValues ?
            (defaultValues["Cif"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Cif"], context) :
                null) :
            null;

        context["field"] = "companyName";
        context["metadata"] = (objectMetadata ? objectMetadata["companyName"] : null);
        privateState.companyName = defaultValues ?
            (defaultValues["companyName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyName"], context) :
                null) :
            null;

        context["field"] = "Taxid";
        context["metadata"] = (objectMetadata ? objectMetadata["Taxid"] : null);
        privateState.Taxid = defaultValues ?
            (defaultValues["Taxid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Taxid"], context) :
                null) :
            null;

        context["field"] = "masterServiceKey";
        context["metadata"] = (objectMetadata ? objectMetadata["masterServiceKey"] : null);
        privateState.masterServiceKey = defaultValues ?
            (defaultValues["masterServiceKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["masterServiceKey"], context) :
                null) :
            null;

        context["field"] = "serviceKey";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
        privateState.serviceKey = defaultValues ?
            (defaultValues["serviceKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceKey"], context) :
                null) :
            null;

        context["field"] = "authorizedSignatory";
        context["metadata"] = (objectMetadata ? objectMetadata["authorizedSignatory"] : null);
        privateState.authorizedSignatory = defaultValues ?
            (defaultValues["authorizedSignatory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["authorizedSignatory"], context) :
                null) :
            null;

        context["field"] = "phone";
        context["metadata"] = (objectMetadata ? objectMetadata["phone"] : null);
        privateState.phone = defaultValues ?
            (defaultValues["phone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phone"], context) :
                null) :
            null;

        context["field"] = "authorizedSignatoryRoles";
        context["metadata"] = (objectMetadata ? objectMetadata["authorizedSignatoryRoles"] : null);
        privateState.authorizedSignatoryRoles = defaultValues ?
            (defaultValues["authorizedSignatoryRoles"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["authorizedSignatoryRoles"], context) :
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
            "coreCustomerId": {
                get: function() {
                    context["field"] = "coreCustomerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.coreCustomerId, context);
                },
                set: function(val) {
                    setterFunctions['coreCustomerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contractId": {
                get: function() {
                    context["field"] = "contractId";
                    context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contractId, context);
                },
                set: function(val) {
                    setterFunctions['contractId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contractName": {
                get: function() {
                    context["field"] = "contractName";
                    context["metadata"] = (objectMetadata ? objectMetadata["contractName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contractName, context);
                },
                set: function(val) {
                    setterFunctions['contractName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerName": {
                get: function() {
                    context["field"] = "customerName";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerName, context);
                },
                set: function(val) {
                    setterFunctions['customerName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "email": {
                get: function() {
                    context["field"] = "email";
                    context["metadata"] = (objectMetadata ? objectMetadata["email"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.email, context);
                },
                set: function(val) {
                    setterFunctions['email'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "phoneCountryCode": {
                get: function() {
                    context["field"] = "phoneCountryCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["phoneCountryCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.phoneCountryCode, context);
                },
                set: function(val) {
                    setterFunctions['phoneCountryCode'].call(this, val, privateState);
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
            "dateOfBirth": {
                get: function() {
                    context["field"] = "dateOfBirth";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateOfBirth, context);
                },
                set: function(val) {
                    setterFunctions['dateOfBirth'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceDefinitionName": {
                get: function() {
                    context["field"] = "serviceDefinitionName";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceDefinitionName, context);
                },
                set: function(val) {
                    setterFunctions['serviceDefinitionName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceDefinitionId": {
                get: function() {
                    context["field"] = "serviceDefinitionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceDefinitionId, context);
                },
                set: function(val) {
                    setterFunctions['serviceDefinitionId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "faxId": {
                get: function() {
                    context["field"] = "faxId";
                    context["metadata"] = (objectMetadata ? objectMetadata["faxId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.faxId, context);
                },
                set: function(val) {
                    setterFunctions['faxId'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "state": {
                get: function() {
                    context["field"] = "state";
                    context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.state, context);
                },
                set: function(val) {
                    setterFunctions['state'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "country": {
                get: function() {
                    context["field"] = "country";
                    context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.country, context);
                },
                set: function(val) {
                    setterFunctions['country'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "city": {
                get: function() {
                    context["field"] = "city";
                    context["metadata"] = (objectMetadata ? objectMetadata["city"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.city, context);
                },
                set: function(val) {
                    setterFunctions['city'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "zipCode": {
                get: function() {
                    context["field"] = "zipCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["zipCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.zipCode, context);
                },
                set: function(val) {
                    setterFunctions['zipCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "relationshipName": {
                get: function() {
                    context["field"] = "relationshipName";
                    context["metadata"] = (objectMetadata ? objectMetadata["relationshipName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.relationshipName, context);
                },
                set: function(val) {
                    setterFunctions['relationshipName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "relationshipId": {
                get: function() {
                    context["field"] = "relationshipId";
                    context["metadata"] = (objectMetadata ? objectMetadata["relationshipId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.relationshipId, context);
                },
                set: function(val) {
                    setterFunctions['relationshipId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "industry": {
                get: function() {
                    context["field"] = "industry";
                    context["metadata"] = (objectMetadata ? objectMetadata["industry"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.industry, context);
                },
                set: function(val) {
                    setterFunctions['industry'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isAssociated": {
                get: function() {
                    context["field"] = "isAssociated";
                    context["metadata"] = (objectMetadata ? objectMetadata["isAssociated"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isAssociated, context);
                },
                set: function(val) {
                    setterFunctions['isAssociated'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountNumber": {
                get: function() {
                    context["field"] = "accountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountNumber, context);
                },
                set: function(val) {
                    setterFunctions['accountNumber'].call(this, val, privateState);
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
            "accountName": {
                get: function() {
                    context["field"] = "accountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountName, context);
                },
                set: function(val) {
                    setterFunctions['accountName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountHolderName": {
                get: function() {
                    context["field"] = "accountHolderName";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountHolderName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountHolderName, context);
                },
                set: function(val) {
                    setterFunctions['accountHolderName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerStatus": {
                get: function() {
                    context["field"] = "customerStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerStatus, context);
                },
                set: function(val) {
                    setterFunctions['customerStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customers": {
                get: function() {
                    context["field"] = "customers";
                    context["metadata"] = (objectMetadata ? objectMetadata["customers"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customers, context);
                },
                set: function(val) {
                    setterFunctions['customers'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "communication": {
                get: function() {
                    context["field"] = "communication";
                    context["metadata"] = (objectMetadata ? objectMetadata["communication"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.communication, context);
                },
                set: function(val) {
                    setterFunctions['communication'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "address": {
                get: function() {
                    context["field"] = "address";
                    context["metadata"] = (objectMetadata ? objectMetadata["address"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.address, context);
                },
                set: function(val) {
                    setterFunctions['address'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contractCustomers": {
                get: function() {
                    context["field"] = "contractCustomers";
                    context["metadata"] = (objectMetadata ? objectMetadata["contractCustomers"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contractCustomers, context);
                },
                set: function(val) {
                    setterFunctions['contractCustomers'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "coreCustomerName": {
                get: function() {
                    context["field"] = "coreCustomerName";
                    context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.coreCustomerName, context);
                },
                set: function(val) {
                    setterFunctions['coreCustomerName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rejectedby": {
                get: function() {
                    context["field"] = "rejectedby";
                    context["metadata"] = (objectMetadata ? objectMetadata["rejectedby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rejectedby, context);
                },
                set: function(val) {
                    setterFunctions['rejectedby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rejectedReason": {
                get: function() {
                    context["field"] = "rejectedReason";
                    context["metadata"] = (objectMetadata ? objectMetadata["rejectedReason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rejectedReason, context);
                },
                set: function(val) {
                    setterFunctions['rejectedReason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "statusId": {
                get: function() {
                    context["field"] = "statusId";
                    context["metadata"] = (objectMetadata ? objectMetadata["statusId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.statusId, context);
                },
                set: function(val) {
                    setterFunctions['statusId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "coreCustomerRoleIdList": {
                get: function() {
                    context["field"] = "coreCustomerRoleIdList";
                    context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerRoleIdList"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.coreCustomerRoleIdList, context);
                },
                set: function(val) {
                    setterFunctions['coreCustomerRoleIdList'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "FirstName": {
                get: function() {
                    context["field"] = "FirstName";
                    context["metadata"] = (objectMetadata ? objectMetadata["FirstName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FirstName, context);
                },
                set: function(val) {
                    setterFunctions['FirstName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "LastName": {
                get: function() {
                    context["field"] = "LastName";
                    context["metadata"] = (objectMetadata ? objectMetadata["LastName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.LastName, context);
                },
                set: function(val) {
                    setterFunctions['LastName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Ssn": {
                get: function() {
                    context["field"] = "Ssn";
                    context["metadata"] = (objectMetadata ? objectMetadata["Ssn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Ssn, context);
                },
                set: function(val) {
                    setterFunctions['Ssn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Cif": {
                get: function() {
                    context["field"] = "Cif";
                    context["metadata"] = (objectMetadata ? objectMetadata["Cif"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Cif, context);
                },
                set: function(val) {
                    setterFunctions['Cif'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companyName": {
                get: function() {
                    context["field"] = "companyName";
                    context["metadata"] = (objectMetadata ? objectMetadata["companyName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companyName, context);
                },
                set: function(val) {
                    setterFunctions['companyName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Taxid": {
                get: function() {
                    context["field"] = "Taxid";
                    context["metadata"] = (objectMetadata ? objectMetadata["Taxid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Taxid, context);
                },
                set: function(val) {
                    setterFunctions['Taxid'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "masterServiceKey": {
                get: function() {
                    context["field"] = "masterServiceKey";
                    context["metadata"] = (objectMetadata ? objectMetadata["masterServiceKey"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.masterServiceKey, context);
                },
                set: function(val) {
                    setterFunctions['masterServiceKey'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceKey": {
                get: function() {
                    context["field"] = "serviceKey";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceKey, context);
                },
                set: function(val) {
                    setterFunctions['serviceKey'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "authorizedSignatory": {
                get: function() {
                    context["field"] = "authorizedSignatory";
                    context["metadata"] = (objectMetadata ? objectMetadata["authorizedSignatory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.authorizedSignatory, context);
                },
                set: function(val) {
                    setterFunctions['authorizedSignatory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "phone": {
                get: function() {
                    context["field"] = "phone";
                    context["metadata"] = (objectMetadata ? objectMetadata["phone"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.phone, context);
                },
                set: function(val) {
                    setterFunctions['phone'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "authorizedSignatoryRoles": {
                get: function() {
                    context["field"] = "authorizedSignatoryRoles";
                    context["metadata"] = (objectMetadata ? objectMetadata["authorizedSignatoryRoles"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.authorizedSignatoryRoles, context);
                },
                set: function(val) {
                    setterFunctions['authorizedSignatoryRoles'].call(this, val, privateState);
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
            privateState.name = value ? (value["name"] ? value["name"] : null) : null;
            privateState.coreCustomerId = value ? (value["coreCustomerId"] ? value["coreCustomerId"] : null) : null;
            privateState.contractId = value ? (value["contractId"] ? value["contractId"] : null) : null;
            privateState.contractName = value ? (value["contractName"] ? value["contractName"] : null) : null;
            privateState.customerName = value ? (value["customerName"] ? value["customerName"] : null) : null;
            privateState.email = value ? (value["email"] ? value["email"] : null) : null;
            privateState.phoneCountryCode = value ? (value["phoneCountryCode"] ? value["phoneCountryCode"] : null) : null;
            privateState.phoneNumber = value ? (value["phoneNumber"] ? value["phoneNumber"] : null) : null;
            privateState.dateOfBirth = value ? (value["dateOfBirth"] ? value["dateOfBirth"] : null) : null;
            privateState.serviceDefinitionName = value ? (value["serviceDefinitionName"] ? value["serviceDefinitionName"] : null) : null;
            privateState.serviceDefinitionId = value ? (value["serviceDefinitionId"] ? value["serviceDefinitionId"] : null) : null;
            privateState.faxId = value ? (value["faxId"] ? value["faxId"] : null) : null;
            privateState.addressLine1 = value ? (value["addressLine1"] ? value["addressLine1"] : null) : null;
            privateState.addressLine2 = value ? (value["addressLine2"] ? value["addressLine2"] : null) : null;
            privateState.state = value ? (value["state"] ? value["state"] : null) : null;
            privateState.country = value ? (value["country"] ? value["country"] : null) : null;
            privateState.city = value ? (value["city"] ? value["city"] : null) : null;
            privateState.zipCode = value ? (value["zipCode"] ? value["zipCode"] : null) : null;
            privateState.relationshipName = value ? (value["relationshipName"] ? value["relationshipName"] : null) : null;
            privateState.relationshipId = value ? (value["relationshipId"] ? value["relationshipId"] : null) : null;
            privateState.industry = value ? (value["industry"] ? value["industry"] : null) : null;
            privateState.isAssociated = value ? (value["isAssociated"] ? value["isAssociated"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.accountType = value ? (value["accountType"] ? value["accountType"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.accountHolderName = value ? (value["accountHolderName"] ? value["accountHolderName"] : null) : null;
            privateState.customerStatus = value ? (value["customerStatus"] ? value["customerStatus"] : null) : null;
            privateState.customers = value ? (value["customers"] ? value["customers"] : null) : null;
            privateState.communication = value ? (value["communication"] ? value["communication"] : null) : null;
            privateState.address = value ? (value["address"] ? value["address"] : null) : null;
            privateState.contractCustomers = value ? (value["contractCustomers"] ? value["contractCustomers"] : null) : null;
            privateState.coreCustomerName = value ? (value["coreCustomerName"] ? value["coreCustomerName"] : null) : null;
            privateState.rejectedby = value ? (value["rejectedby"] ? value["rejectedby"] : null) : null;
            privateState.rejectedReason = value ? (value["rejectedReason"] ? value["rejectedReason"] : null) : null;
            privateState.statusId = value ? (value["statusId"] ? value["statusId"] : null) : null;
            privateState.coreCustomerRoleIdList = value ? (value["coreCustomerRoleIdList"] ? value["coreCustomerRoleIdList"] : null) : null;
            privateState.FirstName = value ? (value["FirstName"] ? value["FirstName"] : null) : null;
            privateState.LastName = value ? (value["LastName"] ? value["LastName"] : null) : null;
            privateState.Ssn = value ? (value["Ssn"] ? value["Ssn"] : null) : null;
            privateState.Cif = value ? (value["Cif"] ? value["Cif"] : null) : null;
            privateState.companyName = value ? (value["companyName"] ? value["companyName"] : null) : null;
            privateState.Taxid = value ? (value["Taxid"] ? value["Taxid"] : null) : null;
            privateState.masterServiceKey = value ? (value["masterServiceKey"] ? value["masterServiceKey"] : null) : null;
            privateState.serviceKey = value ? (value["serviceKey"] ? value["serviceKey"] : null) : null;
            privateState.authorizedSignatory = value ? (value["authorizedSignatory"] ? value["authorizedSignatory"] : null) : null;
            privateState.phone = value ? (value["phone"] ? value["phone"] : null) : null;
            privateState.authorizedSignatoryRoles = value ? (value["authorizedSignatoryRoles"] ? value["authorizedSignatoryRoles"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Contract);

    //Create new class level validator object
    BaseModel.Validator.call(Contract);

    var registerValidatorBackup = Contract.registerValidator;

    Contract.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Contract.isValid(this, propName, val)) {
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
    //For Operation 'editContract' with service id 'EditContract6730'
     Contract.editContract = function(params, onCompletion){
        return Contract.customVerb('editContract', params, onCompletion);
     };

    //For Operation 'getCompanyAccounts' with service id 'GetCompanyAccounts7697'
     Contract.getCompanyAccounts = function(params, onCompletion){
        return Contract.customVerb('getCompanyAccounts', params, onCompletion);
     };

    //For Operation 'enrollContract' with service id 'EnrollContract9854'
     Contract.enrollContract = function(params, onCompletion){
        return Contract.customVerb('enrollContract', params, onCompletion);
     };

    //For Operation 'searchContract' with service id 'SearchContract5478'
     Contract.searchContract = function(params, onCompletion){
        return Contract.customVerb('searchContract', params, onCompletion);
     };

    //For Operation 'checkIfCompanyExists' with service id 'CheckIfCompanyExists4289'
     Contract.checkIfCompanyExists = function(params, onCompletion){
        return Contract.customVerb('checkIfCompanyExists', params, onCompletion);
     };

    //For Operation 'getCoreRelativeCustomers' with service id 'GetCoreCustomerDetails5530'
     Contract.getCoreRelativeCustomers = function(params, onCompletion){
        return Contract.customVerb('getCoreRelativeCustomers', params, onCompletion);
     };

    //For Operation 'getListOfContractsByStatus' with service id 'GetListOfContractsByStatus5594'
     Contract.getListOfContractsByStatus = function(params, onCompletion){
        return Contract.customVerb('getListOfContractsByStatus', params, onCompletion);
     };

    //For Operation 'getRelativeCoreCustomerContractDetails' with service id 'GetRelativeCoreCustomerContractDetails7027'
     Contract.getRelativeCoreCustomerContractDetails = function(params, onCompletion){
        return Contract.customVerb('getRelativeCoreCustomerContractDetails', params, onCompletion);
     };

    //For Operation 'getContractInfinityUsers' with service id 'getContractInfinityUsers4728'
     Contract.getContractInfinityUsers = function(params, onCompletion){
        return Contract.customVerb('getContractInfinityUsers', params, onCompletion);
     };

    //For Operation 'searchCoreCustomers' with service id 'SearchCoreCustomers8088'
     Contract.searchCoreCustomers = function(params, onCompletion){
        return Contract.customVerb('searchCoreCustomers', params, onCompletion);
     };

    //For Operation 'getContractFeatureActionLimits' with service id 'GetContractFeatureActionLimits9802'
     Contract.getContractFeatureActionLimits = function(params, onCompletion){
        return Contract.customVerb('getContractFeatureActionLimits', params, onCompletion);
     };

    //For Operation 'getContractDetails' with service id 'GetContractDetails7121'
     Contract.getContractDetails = function(params, onCompletion){
        return Contract.customVerb('getContractDetails', params, onCompletion);
     };

    //For Operation 'getCoreCustomerRoleFeatureActionLimits' with service id 'GetCoreCustomerRoleFeatureActionLimits1380'
     Contract.getCoreCustomerRoleFeatureActionLimits = function(params, onCompletion){
        return Contract.customVerb('getCoreCustomerRoleFeatureActionLimits', params, onCompletion);
     };

    //For Operation 'getContractAccounts' with service id 'GetContractAccounts8656'
     Contract.getContractAccounts = function(params, onCompletion){
        return Contract.customVerb('getContractAccounts', params, onCompletion);
     };

    //For Operation 'createContract' with service id 'CreateContract9500'
     Contract.createContract = function(params, onCompletion){
        return Contract.customVerb('createContract', params, onCompletion);
     };

    //For Operation 'getCoreCustomerAccounts' with service id 'GetCoreCustomerAccounts8645'
     Contract.getCoreCustomerAccounts = function(params, onCompletion){
        return Contract.customVerb('getCoreCustomerAccounts', params, onCompletion);
     };

    //For Operation 'getCoreCustomerContractDetails' with service id 'GetCoreCustomerContractDetails4183'
     Contract.getCoreCustomerContractDetails = function(params, onCompletion){
        return Contract.customVerb('getCoreCustomerContractDetails', params, onCompletion);
     };

    //For Operation 'updateContractStatus' with service id 'UpdateContractStatus2615'
     Contract.updateContractStatus = function(params, onCompletion){
        return Contract.customVerb('updateContractStatus', params, onCompletion);
     };

    var relations = [];

    Contract.relations = relations;

    Contract.prototype.isValid = function() {
        return Contract.isValid(this);
    };

    Contract.prototype.objModelName = "Contract";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Contract.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ExternalUserManagement", "Contract", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Contract.clone = function(objectToClone) {
        var clonedObj = new Contract();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Contract;
});