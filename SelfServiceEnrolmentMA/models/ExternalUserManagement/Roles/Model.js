/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Roles", "objectService" : "ExternalUserManagement"};

    var setterFunctions = {
        userDetails: function(val, state) {
            context["field"] = "userDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["userDetails"] : null);
            state['userDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        firstName: function(val, state) {
            context["field"] = "firstName";
            context["metadata"] = (objectMetadata ? objectMetadata["firstName"] : null);
            state['firstName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastName: function(val, state) {
            context["field"] = "lastName";
            context["metadata"] = (objectMetadata ? objectMetadata["lastName"] : null);
            state['lastName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        middleName: function(val, state) {
            context["field"] = "middleName";
            context["metadata"] = (objectMetadata ? objectMetadata["middleName"] : null);
            state['middleName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phoneNumber: function(val, state) {
            context["field"] = "phoneNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["phoneNumber"] : null);
            state['phoneNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phoneCountryCode: function(val, state) {
            context["field"] = "phoneCountryCode";
            context["metadata"] = (objectMetadata ? objectMetadata["phoneCountryCode"] : null);
            state['phoneCountryCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ssn: function(val, state) {
            context["field"] = "ssn";
            context["metadata"] = (objectMetadata ? objectMetadata["ssn"] : null);
            state['ssn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dob: function(val, state) {
            context["field"] = "dob";
            context["metadata"] = (objectMetadata ? objectMetadata["dob"] : null);
            state['dob'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drivingLicenseNumber: function(val, state) {
            context["field"] = "drivingLicenseNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["drivingLicenseNumber"] : null);
            state['drivingLicenseNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coreCustomerId: function(val, state) {
            context["field"] = "coreCustomerId";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
            state['coreCustomerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        email: function(val, state) {
            context["field"] = "email";
            context["metadata"] = (objectMetadata ? objectMetadata["email"] : null);
            state['email'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEnrolled: function(val, state) {
            context["field"] = "isEnrolled";
            context["metadata"] = (objectMetadata ? objectMetadata["isEnrolled"] : null);
            state['isEnrolled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyList: function(val, state) {
            context["field"] = "companyList";
            context["metadata"] = (objectMetadata ? objectMetadata["companyList"] : null);
            state['companyList'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyName: function(val, state) {
            context["field"] = "companyName";
            context["metadata"] = (objectMetadata ? objectMetadata["companyName"] : null);
            state['companyName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        cif: function(val, state) {
            context["field"] = "cif";
            context["metadata"] = (objectMetadata ? objectMetadata["cif"] : null);
            state['cif'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isPrimary: function(val, state) {
            context["field"] = "isPrimary";
            context["metadata"] = (objectMetadata ? objectMetadata["isPrimary"] : null);
            state['isPrimary'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceDefinition: function(val, state) {
            context["field"] = "serviceDefinition";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinition"] : null);
            state['serviceDefinition'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userRole: function(val, state) {
            context["field"] = "userRole";
            context["metadata"] = (objectMetadata ? objectMetadata["userRole"] : null);
            state['userRole'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accounts: function(val, state) {
            context["field"] = "accounts";
            context["metadata"] = (objectMetadata ? objectMetadata["accounts"] : null);
            state['accounts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountId: function(val, state) {
            context["field"] = "accountId";
            context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
            state['accountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEnabled: function(val, state) {
            context["field"] = "isEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isEnabled"] : null);
            state['isEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountType: function(val, state) {
            context["field"] = "accountType";
            context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
            state['accountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountLevelPermissions: function(val, state) {
            context["field"] = "accountLevelPermissions";
            context["metadata"] = (objectMetadata ? objectMetadata["accountLevelPermissions"] : null);
            state['accountLevelPermissions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        permissionType: function(val, state) {
            context["field"] = "permissionType";
            context["metadata"] = (objectMetadata ? objectMetadata["permissionType"] : null);
            state['permissionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featurePermissions: function(val, state) {
            context["field"] = "featurePermissions";
            context["metadata"] = (objectMetadata ? objectMetadata["featurePermissions"] : null);
            state['featurePermissions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureId: function(val, state) {
            context["field"] = "featureId";
            context["metadata"] = (objectMetadata ? objectMetadata["featureId"] : null);
            state['featureId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureDescription: function(val, state) {
            context["field"] = "featureDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["featureDescription"] : null);
            state['featureDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureName: function(val, state) {
            context["field"] = "featureName";
            context["metadata"] = (objectMetadata ? objectMetadata["featureName"] : null);
            state['featureName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        globalLevelPermissions: function(val, state) {
            context["field"] = "globalLevelPermissions";
            context["metadata"] = (objectMetadata ? objectMetadata["globalLevelPermissions"] : null);
            state['globalLevelPermissions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        permissions: function(val, state) {
            context["field"] = "permissions";
            context["metadata"] = (objectMetadata ? objectMetadata["permissions"] : null);
            state['permissions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionLimits: function(val, state) {
            context["field"] = "transactionLimits";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionLimits"] : null);
            state['transactionLimits'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        individualTransaction: function(val, state) {
            context["field"] = "individualTransaction";
            context["metadata"] = (objectMetadata ? objectMetadata["individualTransaction"] : null);
            state['individualTransaction'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitType: function(val, state) {
            context["field"] = "limitType";
            context["metadata"] = (objectMetadata ? objectMetadata["limitType"] : null);
            state['limitType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limit: function(val, state) {
            context["field"] = "limit";
            context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
            state['limit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkTransactionLimits: function(val, state) {
            context["field"] = "bulkTransactionLimits";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkTransactionLimits"] : null);
            state['bulkTransactionLimits'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actionId: function(val, state) {
            context["field"] = "actionId";
            context["metadata"] = (objectMetadata ? objectMetadata["actionId"] : null);
            state['actionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actionDescription: function(val, state) {
            context["field"] = "actionDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["actionDescription"] : null);
            state['actionDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actionName: function(val, state) {
            context["field"] = "actionName";
            context["metadata"] = (objectMetadata ? objectMetadata["actionName"] : null);
            state['actionName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customers: function(val, state) {
            context["field"] = "customers";
            context["metadata"] = (objectMetadata ? objectMetadata["customers"] : null);
            state['customers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        name: function(val, state) {
            context["field"] = "name";
            context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
            state['name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isAlreadyAssociatedwithContract: function(val, state) {
            context["field"] = "isAlreadyAssociatedwithContract";
            context["metadata"] = (objectMetadata ? objectMetadata["isAlreadyAssociatedwithContract"] : null);
            state['isAlreadyAssociatedwithContract'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        dateOfBirth: function(val, state) {
            context["field"] = "dateOfBirth";
            context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
            state['dateOfBirth'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        value: function(val, state) {
            context["field"] = "value";
            context["metadata"] = (objectMetadata ? objectMetadata["value"] : null);
            state['value'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limits: function(val, state) {
            context["field"] = "limits";
            context["metadata"] = (objectMetadata ? objectMetadata["limits"] : null);
            state['limits'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        roleId: function(val, state) {
            context["field"] = "roleId";
            context["metadata"] = (objectMetadata ? objectMetadata["roleId"] : null);
            state['roleId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customRoleName: function(val, state) {
            context["field"] = "customRoleName";
            context["metadata"] = (objectMetadata ? objectMetadata["customRoleName"] : null);
            state['customRoleName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isDuplicate: function(val, state) {
            context["field"] = "isDuplicate";
            context["metadata"] = (objectMetadata ? objectMetadata["isDuplicate"] : null);
            state['isDuplicate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customRoles: function(val, state) {
            context["field"] = "customRoles";
            context["metadata"] = (objectMetadata ? objectMetadata["customRoles"] : null);
            state['customRoles'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customRoleDetails: function(val, state) {
            context["field"] = "customRoleDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["customRoleDetails"] : null);
            state['customRoleDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        users: function(val, state) {
            context["field"] = "users";
            context["metadata"] = (objectMetadata ? objectMetadata["users"] : null);
            state['users'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contractDetails: function(val, state) {
            context["field"] = "contractDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["contractDetails"] : null);
            state['contractDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companies: function(val, state) {
            context["field"] = "companies";
            context["metadata"] = (objectMetadata ? objectMetadata["companies"] : null);
            state['companies'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coreCustomerName: function(val, state) {
            context["field"] = "coreCustomerName";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerName"] : null);
            state['coreCustomerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        infinityUserId: function(val, state) {
            context["field"] = "infinityUserId";
            context["metadata"] = (objectMetadata ? objectMetadata["infinityUserId"] : null);
            state['infinityUserId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitGroupId: function(val, state) {
            context["field"] = "limitGroupId";
            context["metadata"] = (objectMetadata ? objectMetadata["limitGroupId"] : null);
            state['limitGroupId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        removedCompanies: function(val, state) {
            context["field"] = "removedCompanies";
            context["metadata"] = (objectMetadata ? objectMetadata["removedCompanies"] : null);
            state['removedCompanies'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userList: function(val, state) {
            context["field"] = "userList";
            context["metadata"] = (objectMetadata ? objectMetadata["userList"] : null);
            state['userList'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEditPermissionEnabled: function(val, state) {
            context["field"] = "isEditPermissionEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isEditPermissionEnabled"] : null);
            state['isEditPermissionEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isCreatePermissionEnabled: function(val, state) {
            context["field"] = "isCreatePermissionEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isCreatePermissionEnabled"] : null);
            state['isCreatePermissionEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isViewPermissionEnabled: function(val, state) {
            context["field"] = "isViewPermissionEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isViewPermissionEnabled"] : null);
            state['isViewPermissionEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceDefinitionName: function(val, state) {
            context["field"] = "serviceDefinitionName";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionName"] : null);
            state['serviceDefinitionName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitGroupName: function(val, state) {
            context["field"] = "limitGroupName";
            context["metadata"] = (objectMetadata ? objectMetadata["limitGroupName"] : null);
            state['limitGroupName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitGroupDescription: function(val, state) {
            context["field"] = "limitGroupDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["limitGroupDescription"] : null);
            state['limitGroupDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        password: function(val, state) {
            context["field"] = "password";
            context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
            state['password'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fistName: function(val, state) {
            context["field"] = "fistName";
            context["metadata"] = (objectMetadata ? objectMetadata["fistName"] : null);
            state['fistName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isNotificationRequired: function(val, state) {
            context["field"] = "isNotificationRequired";
            context["metadata"] = (objectMetadata ? objectMetadata["isNotificationRequired"] : null);
            state['isNotificationRequired'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyId: function(val, state) {
            context["field"] = "partyId";
            context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
            state['partyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyId: function(val, state) {
            context["field"] = "companyId";
            context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
            state['companyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isProfileExist: function(val, state) {
            context["field"] = "isProfileExist";
            context["metadata"] = (objectMetadata ? objectMetadata["isProfileExist"] : null);
            state['isProfileExist'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        isOnBoradingFlow: function(val, state) {
            context["field"] = "isOnBoradingFlow";
            context["metadata"] = (objectMetadata ? objectMetadata["isOnBoradingFlow"] : null);
            state['isOnBoradingFlow'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicationId: function(val, state) {
            context["field"] = "applicationId";
            context["metadata"] = (objectMetadata ? objectMetadata["applicationId"] : null);
            state['applicationId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        primaryApplicantId: function(val, state) {
            context["field"] = "primaryApplicantId";
            context["metadata"] = (objectMetadata ? objectMetadata["primaryApplicantId"] : null);
            state['primaryApplicantId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coApplicantId: function(val, state) {
            context["field"] = "coApplicantId";
            context["metadata"] = (objectMetadata ? objectMetadata["coApplicantId"] : null);
            state['coApplicantId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        applicantId: function(val, state) {
            context["field"] = "applicantId";
            context["metadata"] = (objectMetadata ? objectMetadata["applicantId"] : null);
            state['applicantId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signatoryGroups: function(val, state) {
            context["field"] = "signatoryGroups";
            context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroups"] : null);
            state['signatoryGroups'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        groups: function(val, state) {
            context["field"] = "groups";
            context["metadata"] = (objectMetadata ? objectMetadata["groups"] : null);
            state['groups'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signatoryGroupId: function(val, state) {
            context["field"] = "signatoryGroupId";
            context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupId"] : null);
            state['signatoryGroupId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signatoryGroupName: function(val, state) {
            context["field"] = "signatoryGroupName";
            context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupName"] : null);
            state['signatoryGroupName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signatoryGroupDescription: function(val, state) {
            context["field"] = "signatoryGroupDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupDescription"] : null);
            state['signatoryGroupDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        signatories: function(val, state) {
            context["field"] = "signatories";
            context["metadata"] = (objectMetadata ? objectMetadata["signatories"] : null);
            state['signatories'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isUserRemoved: function(val, state) {
            context["field"] = "isUserRemoved";
            context["metadata"] = (objectMetadata ? objectMetadata["isUserRemoved"] : null);
            state['isUserRemoved'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isAssigned: function(val, state) {
            context["field"] = "isAssigned";
            context["metadata"] = (objectMetadata ? objectMetadata["isAssigned"] : null);
            state['isAssigned'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxId: function(val, state) {
            context["field"] = "taxId";
            context["metadata"] = (objectMetadata ? objectMetadata["taxId"] : null);
            state['taxId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceKey: function(val, state) {
            context["field"] = "serviceKey";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
            state['serviceKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        captchaValue: function(val, state) {
            context["field"] = "captchaValue";
            context["metadata"] = (objectMetadata ? objectMetadata["captchaValue"] : null);
            state['captchaValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Roles(defaultValues) {
        var privateState = {};
        context["field"] = "userDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["userDetails"] : null);
        privateState.userDetails = defaultValues ?
            (defaultValues["userDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userDetails"], context) :
                null) :
            null;

        context["field"] = "firstName";
        context["metadata"] = (objectMetadata ? objectMetadata["firstName"] : null);
        privateState.firstName = defaultValues ?
            (defaultValues["firstName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["firstName"], context) :
                null) :
            null;

        context["field"] = "lastName";
        context["metadata"] = (objectMetadata ? objectMetadata["lastName"] : null);
        privateState.lastName = defaultValues ?
            (defaultValues["lastName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastName"], context) :
                null) :
            null;

        context["field"] = "middleName";
        context["metadata"] = (objectMetadata ? objectMetadata["middleName"] : null);
        privateState.middleName = defaultValues ?
            (defaultValues["middleName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["middleName"], context) :
                null) :
            null;

        context["field"] = "phoneNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["phoneNumber"] : null);
        privateState.phoneNumber = defaultValues ?
            (defaultValues["phoneNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phoneNumber"], context) :
                null) :
            null;

        context["field"] = "phoneCountryCode";
        context["metadata"] = (objectMetadata ? objectMetadata["phoneCountryCode"] : null);
        privateState.phoneCountryCode = defaultValues ?
            (defaultValues["phoneCountryCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phoneCountryCode"], context) :
                null) :
            null;

        context["field"] = "ssn";
        context["metadata"] = (objectMetadata ? objectMetadata["ssn"] : null);
        privateState.ssn = defaultValues ?
            (defaultValues["ssn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ssn"], context) :
                null) :
            null;

        context["field"] = "dob";
        context["metadata"] = (objectMetadata ? objectMetadata["dob"] : null);
        privateState.dob = defaultValues ?
            (defaultValues["dob"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dob"], context) :
                null) :
            null;

        context["field"] = "drivingLicenseNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["drivingLicenseNumber"] : null);
        privateState.drivingLicenseNumber = defaultValues ?
            (defaultValues["drivingLicenseNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drivingLicenseNumber"], context) :
                null) :
            null;

        context["field"] = "coreCustomerId";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
        privateState.coreCustomerId = defaultValues ?
            (defaultValues["coreCustomerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerId"], context) :
                null) :
            null;

        context["field"] = "email";
        context["metadata"] = (objectMetadata ? objectMetadata["email"] : null);
        privateState.email = defaultValues ?
            (defaultValues["email"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["email"], context) :
                null) :
            null;

        context["field"] = "isEnrolled";
        context["metadata"] = (objectMetadata ? objectMetadata["isEnrolled"] : null);
        privateState.isEnrolled = defaultValues ?
            (defaultValues["isEnrolled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEnrolled"], context) :
                null) :
            null;

        context["field"] = "companyList";
        context["metadata"] = (objectMetadata ? objectMetadata["companyList"] : null);
        privateState.companyList = defaultValues ?
            (defaultValues["companyList"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyList"], context) :
                null) :
            null;

        context["field"] = "companyName";
        context["metadata"] = (objectMetadata ? objectMetadata["companyName"] : null);
        privateState.companyName = defaultValues ?
            (defaultValues["companyName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyName"], context) :
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

        context["field"] = "cif";
        context["metadata"] = (objectMetadata ? objectMetadata["cif"] : null);
        privateState.cif = defaultValues ?
            (defaultValues["cif"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cif"], context) :
                null) :
            null;

        context["field"] = "isPrimary";
        context["metadata"] = (objectMetadata ? objectMetadata["isPrimary"] : null);
        privateState.isPrimary = defaultValues ?
            (defaultValues["isPrimary"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isPrimary"], context) :
                null) :
            null;

        context["field"] = "serviceDefinition";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinition"] : null);
        privateState.serviceDefinition = defaultValues ?
            (defaultValues["serviceDefinition"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceDefinition"], context) :
                null) :
            null;

        context["field"] = "userRole";
        context["metadata"] = (objectMetadata ? objectMetadata["userRole"] : null);
        privateState.userRole = defaultValues ?
            (defaultValues["userRole"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userRole"], context) :
                null) :
            null;

        context["field"] = "accounts";
        context["metadata"] = (objectMetadata ? objectMetadata["accounts"] : null);
        privateState.accounts = defaultValues ?
            (defaultValues["accounts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accounts"], context) :
                null) :
            null;

        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "accountId";
        context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
        privateState.accountId = defaultValues ?
            (defaultValues["accountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountId"], context) :
                null) :
            null;

        context["field"] = "isEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isEnabled"] : null);
        privateState.isEnabled = defaultValues ?
            (defaultValues["isEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEnabled"], context) :
                null) :
            null;

        context["field"] = "accountType";
        context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
        privateState.accountType = defaultValues ?
            (defaultValues["accountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountType"], context) :
                null) :
            null;

        context["field"] = "accountLevelPermissions";
        context["metadata"] = (objectMetadata ? objectMetadata["accountLevelPermissions"] : null);
        privateState.accountLevelPermissions = defaultValues ?
            (defaultValues["accountLevelPermissions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountLevelPermissions"], context) :
                null) :
            null;

        context["field"] = "permissionType";
        context["metadata"] = (objectMetadata ? objectMetadata["permissionType"] : null);
        privateState.permissionType = defaultValues ?
            (defaultValues["permissionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["permissionType"], context) :
                null) :
            null;

        context["field"] = "featurePermissions";
        context["metadata"] = (objectMetadata ? objectMetadata["featurePermissions"] : null);
        privateState.featurePermissions = defaultValues ?
            (defaultValues["featurePermissions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featurePermissions"], context) :
                null) :
            null;

        context["field"] = "featureId";
        context["metadata"] = (objectMetadata ? objectMetadata["featureId"] : null);
        privateState.featureId = defaultValues ?
            (defaultValues["featureId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureId"], context) :
                null) :
            null;

        context["field"] = "featureDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["featureDescription"] : null);
        privateState.featureDescription = defaultValues ?
            (defaultValues["featureDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureDescription"], context) :
                null) :
            null;

        context["field"] = "featureName";
        context["metadata"] = (objectMetadata ? objectMetadata["featureName"] : null);
        privateState.featureName = defaultValues ?
            (defaultValues["featureName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureName"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "globalLevelPermissions";
        context["metadata"] = (objectMetadata ? objectMetadata["globalLevelPermissions"] : null);
        privateState.globalLevelPermissions = defaultValues ?
            (defaultValues["globalLevelPermissions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["globalLevelPermissions"], context) :
                null) :
            null;

        context["field"] = "permissions";
        context["metadata"] = (objectMetadata ? objectMetadata["permissions"] : null);
        privateState.permissions = defaultValues ?
            (defaultValues["permissions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["permissions"], context) :
                null) :
            null;

        context["field"] = "transactionLimits";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionLimits"] : null);
        privateState.transactionLimits = defaultValues ?
            (defaultValues["transactionLimits"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionLimits"], context) :
                null) :
            null;

        context["field"] = "individualTransaction";
        context["metadata"] = (objectMetadata ? objectMetadata["individualTransaction"] : null);
        privateState.individualTransaction = defaultValues ?
            (defaultValues["individualTransaction"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["individualTransaction"], context) :
                null) :
            null;

        context["field"] = "limitType";
        context["metadata"] = (objectMetadata ? objectMetadata["limitType"] : null);
        privateState.limitType = defaultValues ?
            (defaultValues["limitType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitType"], context) :
                null) :
            null;

        context["field"] = "limit";
        context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
        privateState.limit = defaultValues ?
            (defaultValues["limit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limit"], context) :
                null) :
            null;

        context["field"] = "bulkTransactionLimits";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkTransactionLimits"] : null);
        privateState.bulkTransactionLimits = defaultValues ?
            (defaultValues["bulkTransactionLimits"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkTransactionLimits"], context) :
                null) :
            null;

        context["field"] = "actionId";
        context["metadata"] = (objectMetadata ? objectMetadata["actionId"] : null);
        privateState.actionId = defaultValues ?
            (defaultValues["actionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actionId"], context) :
                null) :
            null;

        context["field"] = "actionDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["actionDescription"] : null);
        privateState.actionDescription = defaultValues ?
            (defaultValues["actionDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actionDescription"], context) :
                null) :
            null;

        context["field"] = "actionName";
        context["metadata"] = (objectMetadata ? objectMetadata["actionName"] : null);
        privateState.actionName = defaultValues ?
            (defaultValues["actionName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actionName"], context) :
                null) :
            null;

        context["field"] = "customers";
        context["metadata"] = (objectMetadata ? objectMetadata["customers"] : null);
        privateState.customers = defaultValues ?
            (defaultValues["customers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customers"], context) :
                null) :
            null;

        context["field"] = "name";
        context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
        privateState.name = defaultValues ?
            (defaultValues["name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["name"], context) :
                null) :
            null;

        context["field"] = "isAlreadyAssociatedwithContract";
        context["metadata"] = (objectMetadata ? objectMetadata["isAlreadyAssociatedwithContract"] : null);
        privateState.isAlreadyAssociatedwithContract = defaultValues ?
            (defaultValues["isAlreadyAssociatedwithContract"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isAlreadyAssociatedwithContract"], context) :
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

        context["field"] = "dateOfBirth";
        context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
        privateState.dateOfBirth = defaultValues ?
            (defaultValues["dateOfBirth"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateOfBirth"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "value";
        context["metadata"] = (objectMetadata ? objectMetadata["value"] : null);
        privateState.value = defaultValues ?
            (defaultValues["value"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["value"], context) :
                null) :
            null;

        context["field"] = "limits";
        context["metadata"] = (objectMetadata ? objectMetadata["limits"] : null);
        privateState.limits = defaultValues ?
            (defaultValues["limits"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limits"], context) :
                null) :
            null;

        context["field"] = "roleId";
        context["metadata"] = (objectMetadata ? objectMetadata["roleId"] : null);
        privateState.roleId = defaultValues ?
            (defaultValues["roleId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["roleId"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "customRoleName";
        context["metadata"] = (objectMetadata ? objectMetadata["customRoleName"] : null);
        privateState.customRoleName = defaultValues ?
            (defaultValues["customRoleName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customRoleName"], context) :
                null) :
            null;

        context["field"] = "isDuplicate";
        context["metadata"] = (objectMetadata ? objectMetadata["isDuplicate"] : null);
        privateState.isDuplicate = defaultValues ?
            (defaultValues["isDuplicate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isDuplicate"], context) :
                null) :
            null;

        context["field"] = "customRoles";
        context["metadata"] = (objectMetadata ? objectMetadata["customRoles"] : null);
        privateState.customRoles = defaultValues ?
            (defaultValues["customRoles"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customRoles"], context) :
                null) :
            null;

        context["field"] = "customRoleDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["customRoleDetails"] : null);
        privateState.customRoleDetails = defaultValues ?
            (defaultValues["customRoleDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customRoleDetails"], context) :
                null) :
            null;

        context["field"] = "users";
        context["metadata"] = (objectMetadata ? objectMetadata["users"] : null);
        privateState.users = defaultValues ?
            (defaultValues["users"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["users"], context) :
                null) :
            null;

        context["field"] = "contractDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["contractDetails"] : null);
        privateState.contractDetails = defaultValues ?
            (defaultValues["contractDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contractDetails"], context) :
                null) :
            null;

        context["field"] = "companies";
        context["metadata"] = (objectMetadata ? objectMetadata["companies"] : null);
        privateState.companies = defaultValues ?
            (defaultValues["companies"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companies"], context) :
                null) :
            null;

        context["field"] = "coreCustomerName";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerName"] : null);
        privateState.coreCustomerName = defaultValues ?
            (defaultValues["coreCustomerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerName"], context) :
                null) :
            null;

        context["field"] = "infinityUserId";
        context["metadata"] = (objectMetadata ? objectMetadata["infinityUserId"] : null);
        privateState.infinityUserId = defaultValues ?
            (defaultValues["infinityUserId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["infinityUserId"], context) :
                null) :
            null;

        context["field"] = "limitGroupId";
        context["metadata"] = (objectMetadata ? objectMetadata["limitGroupId"] : null);
        privateState.limitGroupId = defaultValues ?
            (defaultValues["limitGroupId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitGroupId"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "removedCompanies";
        context["metadata"] = (objectMetadata ? objectMetadata["removedCompanies"] : null);
        privateState.removedCompanies = defaultValues ?
            (defaultValues["removedCompanies"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["removedCompanies"], context) :
                null) :
            null;

        context["field"] = "userList";
        context["metadata"] = (objectMetadata ? objectMetadata["userList"] : null);
        privateState.userList = defaultValues ?
            (defaultValues["userList"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userList"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "isEditPermissionEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isEditPermissionEnabled"] : null);
        privateState.isEditPermissionEnabled = defaultValues ?
            (defaultValues["isEditPermissionEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEditPermissionEnabled"], context) :
                null) :
            null;

        context["field"] = "isCreatePermissionEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isCreatePermissionEnabled"] : null);
        privateState.isCreatePermissionEnabled = defaultValues ?
            (defaultValues["isCreatePermissionEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isCreatePermissionEnabled"], context) :
                null) :
            null;

        context["field"] = "isViewPermissionEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isViewPermissionEnabled"] : null);
        privateState.isViewPermissionEnabled = defaultValues ?
            (defaultValues["isViewPermissionEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isViewPermissionEnabled"], context) :
                null) :
            null;

        context["field"] = "serviceDefinitionName";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionName"] : null);
        privateState.serviceDefinitionName = defaultValues ?
            (defaultValues["serviceDefinitionName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceDefinitionName"], context) :
                null) :
            null;

        context["field"] = "limitGroupName";
        context["metadata"] = (objectMetadata ? objectMetadata["limitGroupName"] : null);
        privateState.limitGroupName = defaultValues ?
            (defaultValues["limitGroupName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitGroupName"], context) :
                null) :
            null;

        context["field"] = "limitGroupDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["limitGroupDescription"] : null);
        privateState.limitGroupDescription = defaultValues ?
            (defaultValues["limitGroupDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitGroupDescription"], context) :
                null) :
            null;

        context["field"] = "password";
        context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
        privateState.password = defaultValues ?
            (defaultValues["password"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["password"], context) :
                null) :
            null;

        context["field"] = "fistName";
        context["metadata"] = (objectMetadata ? objectMetadata["fistName"] : null);
        privateState.fistName = defaultValues ?
            (defaultValues["fistName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fistName"], context) :
                null) :
            null;

        context["field"] = "isNotificationRequired";
        context["metadata"] = (objectMetadata ? objectMetadata["isNotificationRequired"] : null);
        privateState.isNotificationRequired = defaultValues ?
            (defaultValues["isNotificationRequired"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isNotificationRequired"], context) :
                null) :
            null;

        context["field"] = "partyId";
        context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
        privateState.partyId = defaultValues ?
            (defaultValues["partyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyId"], context) :
                null) :
            null;

        context["field"] = "companyId";
        context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
        privateState.companyId = defaultValues ?
            (defaultValues["companyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyId"], context) :
                null) :
            null;

        context["field"] = "isProfileExist";
        context["metadata"] = (objectMetadata ? objectMetadata["isProfileExist"] : null);
        privateState.isProfileExist = defaultValues ?
            (defaultValues["isProfileExist"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isProfileExist"], context) :
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

        context["field"] = "isOnBoradingFlow";
        context["metadata"] = (objectMetadata ? objectMetadata["isOnBoradingFlow"] : null);
        privateState.isOnBoradingFlow = defaultValues ?
            (defaultValues["isOnBoradingFlow"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isOnBoradingFlow"], context) :
                null) :
            null;

        context["field"] = "applicationId";
        context["metadata"] = (objectMetadata ? objectMetadata["applicationId"] : null);
        privateState.applicationId = defaultValues ?
            (defaultValues["applicationId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicationId"], context) :
                null) :
            null;

        context["field"] = "primaryApplicantId";
        context["metadata"] = (objectMetadata ? objectMetadata["primaryApplicantId"] : null);
        privateState.primaryApplicantId = defaultValues ?
            (defaultValues["primaryApplicantId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["primaryApplicantId"], context) :
                null) :
            null;

        context["field"] = "coApplicantId";
        context["metadata"] = (objectMetadata ? objectMetadata["coApplicantId"] : null);
        privateState.coApplicantId = defaultValues ?
            (defaultValues["coApplicantId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coApplicantId"], context) :
                null) :
            null;

        context["field"] = "applicantId";
        context["metadata"] = (objectMetadata ? objectMetadata["applicantId"] : null);
        privateState.applicantId = defaultValues ?
            (defaultValues["applicantId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["applicantId"], context) :
                null) :
            null;

        context["field"] = "signatoryGroups";
        context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroups"] : null);
        privateState.signatoryGroups = defaultValues ?
            (defaultValues["signatoryGroups"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signatoryGroups"], context) :
                null) :
            null;

        context["field"] = "groups";
        context["metadata"] = (objectMetadata ? objectMetadata["groups"] : null);
        privateState.groups = defaultValues ?
            (defaultValues["groups"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["groups"], context) :
                null) :
            null;

        context["field"] = "signatoryGroupId";
        context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupId"] : null);
        privateState.signatoryGroupId = defaultValues ?
            (defaultValues["signatoryGroupId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signatoryGroupId"], context) :
                null) :
            null;

        context["field"] = "signatoryGroupName";
        context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupName"] : null);
        privateState.signatoryGroupName = defaultValues ?
            (defaultValues["signatoryGroupName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signatoryGroupName"], context) :
                null) :
            null;

        context["field"] = "signatoryGroupDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupDescription"] : null);
        privateState.signatoryGroupDescription = defaultValues ?
            (defaultValues["signatoryGroupDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signatoryGroupDescription"], context) :
                null) :
            null;

        context["field"] = "signatories";
        context["metadata"] = (objectMetadata ? objectMetadata["signatories"] : null);
        privateState.signatories = defaultValues ?
            (defaultValues["signatories"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["signatories"], context) :
                null) :
            null;

        context["field"] = "isUserRemoved";
        context["metadata"] = (objectMetadata ? objectMetadata["isUserRemoved"] : null);
        privateState.isUserRemoved = defaultValues ?
            (defaultValues["isUserRemoved"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isUserRemoved"], context) :
                null) :
            null;

        context["field"] = "isAssigned";
        context["metadata"] = (objectMetadata ? objectMetadata["isAssigned"] : null);
        privateState.isAssigned = defaultValues ?
            (defaultValues["isAssigned"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isAssigned"], context) :
                null) :
            null;

        context["field"] = "taxId";
        context["metadata"] = (objectMetadata ? objectMetadata["taxId"] : null);
        privateState.taxId = defaultValues ?
            (defaultValues["taxId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxId"], context) :
                null) :
            null;

        context["field"] = "serviceKey";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
        privateState.serviceKey = defaultValues ?
            (defaultValues["serviceKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceKey"], context) :
                null) :
            null;

        context["field"] = "captchaValue";
        context["metadata"] = (objectMetadata ? objectMetadata["captchaValue"] : null);
        privateState.captchaValue = defaultValues ?
            (defaultValues["captchaValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["captchaValue"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "userDetails": {
                get: function() {
                    context["field"] = "userDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["userDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userDetails, context);
                },
                set: function(val) {
                    setterFunctions['userDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "firstName": {
                get: function() {
                    context["field"] = "firstName";
                    context["metadata"] = (objectMetadata ? objectMetadata["firstName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.firstName, context);
                },
                set: function(val) {
                    setterFunctions['firstName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastName": {
                get: function() {
                    context["field"] = "lastName";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastName, context);
                },
                set: function(val) {
                    setterFunctions['lastName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "middleName": {
                get: function() {
                    context["field"] = "middleName";
                    context["metadata"] = (objectMetadata ? objectMetadata["middleName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.middleName, context);
                },
                set: function(val) {
                    setterFunctions['middleName'].call(this, val, privateState);
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
            "ssn": {
                get: function() {
                    context["field"] = "ssn";
                    context["metadata"] = (objectMetadata ? objectMetadata["ssn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ssn, context);
                },
                set: function(val) {
                    setterFunctions['ssn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dob": {
                get: function() {
                    context["field"] = "dob";
                    context["metadata"] = (objectMetadata ? objectMetadata["dob"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dob, context);
                },
                set: function(val) {
                    setterFunctions['dob'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drivingLicenseNumber": {
                get: function() {
                    context["field"] = "drivingLicenseNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["drivingLicenseNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drivingLicenseNumber, context);
                },
                set: function(val) {
                    setterFunctions['drivingLicenseNumber'].call(this, val, privateState);
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
            "isEnrolled": {
                get: function() {
                    context["field"] = "isEnrolled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isEnrolled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isEnrolled, context);
                },
                set: function(val) {
                    setterFunctions['isEnrolled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companyList": {
                get: function() {
                    context["field"] = "companyList";
                    context["metadata"] = (objectMetadata ? objectMetadata["companyList"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companyList, context);
                },
                set: function(val) {
                    setterFunctions['companyList'].call(this, val, privateState);
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
            "cif": {
                get: function() {
                    context["field"] = "cif";
                    context["metadata"] = (objectMetadata ? objectMetadata["cif"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cif, context);
                },
                set: function(val) {
                    setterFunctions['cif'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isPrimary": {
                get: function() {
                    context["field"] = "isPrimary";
                    context["metadata"] = (objectMetadata ? objectMetadata["isPrimary"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isPrimary, context);
                },
                set: function(val) {
                    setterFunctions['isPrimary'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceDefinition": {
                get: function() {
                    context["field"] = "serviceDefinition";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinition"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceDefinition, context);
                },
                set: function(val) {
                    setterFunctions['serviceDefinition'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userRole": {
                get: function() {
                    context["field"] = "userRole";
                    context["metadata"] = (objectMetadata ? objectMetadata["userRole"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userRole, context);
                },
                set: function(val) {
                    setterFunctions['userRole'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accounts": {
                get: function() {
                    context["field"] = "accounts";
                    context["metadata"] = (objectMetadata ? objectMetadata["accounts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accounts, context);
                },
                set: function(val) {
                    setterFunctions['accounts'].call(this, val, privateState);
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
            "accountId": {
                get: function() {
                    context["field"] = "accountId";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountId, context);
                },
                set: function(val) {
                    setterFunctions['accountId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isEnabled": {
                get: function() {
                    context["field"] = "isEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isEnabled'].call(this, val, privateState);
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
            "accountLevelPermissions": {
                get: function() {
                    context["field"] = "accountLevelPermissions";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountLevelPermissions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountLevelPermissions, context);
                },
                set: function(val) {
                    setterFunctions['accountLevelPermissions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "permissionType": {
                get: function() {
                    context["field"] = "permissionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["permissionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.permissionType, context);
                },
                set: function(val) {
                    setterFunctions['permissionType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "featurePermissions": {
                get: function() {
                    context["field"] = "featurePermissions";
                    context["metadata"] = (objectMetadata ? objectMetadata["featurePermissions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featurePermissions, context);
                },
                set: function(val) {
                    setterFunctions['featurePermissions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "featureId": {
                get: function() {
                    context["field"] = "featureId";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureId, context);
                },
                set: function(val) {
                    setterFunctions['featureId'].call(this, val, privateState);
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
            "featureName": {
                get: function() {
                    context["field"] = "featureName";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureName, context);
                },
                set: function(val) {
                    setterFunctions['featureName'].call(this, val, privateState);
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
            "globalLevelPermissions": {
                get: function() {
                    context["field"] = "globalLevelPermissions";
                    context["metadata"] = (objectMetadata ? objectMetadata["globalLevelPermissions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.globalLevelPermissions, context);
                },
                set: function(val) {
                    setterFunctions['globalLevelPermissions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "permissions": {
                get: function() {
                    context["field"] = "permissions";
                    context["metadata"] = (objectMetadata ? objectMetadata["permissions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.permissions, context);
                },
                set: function(val) {
                    setterFunctions['permissions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionLimits": {
                get: function() {
                    context["field"] = "transactionLimits";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionLimits"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionLimits, context);
                },
                set: function(val) {
                    setterFunctions['transactionLimits'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "individualTransaction": {
                get: function() {
                    context["field"] = "individualTransaction";
                    context["metadata"] = (objectMetadata ? objectMetadata["individualTransaction"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.individualTransaction, context);
                },
                set: function(val) {
                    setterFunctions['individualTransaction'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limitType": {
                get: function() {
                    context["field"] = "limitType";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitType, context);
                },
                set: function(val) {
                    setterFunctions['limitType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limit": {
                get: function() {
                    context["field"] = "limit";
                    context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limit, context);
                },
                set: function(val) {
                    setterFunctions['limit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkTransactionLimits": {
                get: function() {
                    context["field"] = "bulkTransactionLimits";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkTransactionLimits"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkTransactionLimits, context);
                },
                set: function(val) {
                    setterFunctions['bulkTransactionLimits'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "actionId": {
                get: function() {
                    context["field"] = "actionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["actionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actionId, context);
                },
                set: function(val) {
                    setterFunctions['actionId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "actionDescription": {
                get: function() {
                    context["field"] = "actionDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["actionDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actionDescription, context);
                },
                set: function(val) {
                    setterFunctions['actionDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "actionName": {
                get: function() {
                    context["field"] = "actionName";
                    context["metadata"] = (objectMetadata ? objectMetadata["actionName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actionName, context);
                },
                set: function(val) {
                    setterFunctions['actionName'].call(this, val, privateState);
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
            "isAlreadyAssociatedwithContract": {
                get: function() {
                    context["field"] = "isAlreadyAssociatedwithContract";
                    context["metadata"] = (objectMetadata ? objectMetadata["isAlreadyAssociatedwithContract"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isAlreadyAssociatedwithContract, context);
                },
                set: function(val) {
                    setterFunctions['isAlreadyAssociatedwithContract'].call(this, val, privateState);
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
            "value": {
                get: function() {
                    context["field"] = "value";
                    context["metadata"] = (objectMetadata ? objectMetadata["value"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.value, context);
                },
                set: function(val) {
                    setterFunctions['value'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limits": {
                get: function() {
                    context["field"] = "limits";
                    context["metadata"] = (objectMetadata ? objectMetadata["limits"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limits, context);
                },
                set: function(val) {
                    setterFunctions['limits'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "roleId": {
                get: function() {
                    context["field"] = "roleId";
                    context["metadata"] = (objectMetadata ? objectMetadata["roleId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.roleId, context);
                },
                set: function(val) {
                    setterFunctions['roleId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userId": {
                get: function() {
                    context["field"] = "userId";
                    context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userId, context);
                },
                set: function(val) {
                    setterFunctions['userId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customRoleName": {
                get: function() {
                    context["field"] = "customRoleName";
                    context["metadata"] = (objectMetadata ? objectMetadata["customRoleName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customRoleName, context);
                },
                set: function(val) {
                    setterFunctions['customRoleName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isDuplicate": {
                get: function() {
                    context["field"] = "isDuplicate";
                    context["metadata"] = (objectMetadata ? objectMetadata["isDuplicate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isDuplicate, context);
                },
                set: function(val) {
                    setterFunctions['isDuplicate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customRoles": {
                get: function() {
                    context["field"] = "customRoles";
                    context["metadata"] = (objectMetadata ? objectMetadata["customRoles"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customRoles, context);
                },
                set: function(val) {
                    setterFunctions['customRoles'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customRoleDetails": {
                get: function() {
                    context["field"] = "customRoleDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["customRoleDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customRoleDetails, context);
                },
                set: function(val) {
                    setterFunctions['customRoleDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "users": {
                get: function() {
                    context["field"] = "users";
                    context["metadata"] = (objectMetadata ? objectMetadata["users"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.users, context);
                },
                set: function(val) {
                    setterFunctions['users'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contractDetails": {
                get: function() {
                    context["field"] = "contractDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["contractDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contractDetails, context);
                },
                set: function(val) {
                    setterFunctions['contractDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companies": {
                get: function() {
                    context["field"] = "companies";
                    context["metadata"] = (objectMetadata ? objectMetadata["companies"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companies, context);
                },
                set: function(val) {
                    setterFunctions['companies'].call(this, val, privateState);
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
            "infinityUserId": {
                get: function() {
                    context["field"] = "infinityUserId";
                    context["metadata"] = (objectMetadata ? objectMetadata["infinityUserId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.infinityUserId, context);
                },
                set: function(val) {
                    setterFunctions['infinityUserId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limitGroupId": {
                get: function() {
                    context["field"] = "limitGroupId";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitGroupId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitGroupId, context);
                },
                set: function(val) {
                    setterFunctions['limitGroupId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerId": {
                get: function() {
                    context["field"] = "customerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerId, context);
                },
                set: function(val) {
                    setterFunctions['customerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "removedCompanies": {
                get: function() {
                    context["field"] = "removedCompanies";
                    context["metadata"] = (objectMetadata ? objectMetadata["removedCompanies"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.removedCompanies, context);
                },
                set: function(val) {
                    setterFunctions['removedCompanies'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userList": {
                get: function() {
                    context["field"] = "userList";
                    context["metadata"] = (objectMetadata ? objectMetadata["userList"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userList, context);
                },
                set: function(val) {
                    setterFunctions['userList'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userName": {
                get: function() {
                    context["field"] = "userName";
                    context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userName, context);
                },
                set: function(val) {
                    setterFunctions['userName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isEditPermissionEnabled": {
                get: function() {
                    context["field"] = "isEditPermissionEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isEditPermissionEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isEditPermissionEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isEditPermissionEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isCreatePermissionEnabled": {
                get: function() {
                    context["field"] = "isCreatePermissionEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isCreatePermissionEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isCreatePermissionEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isCreatePermissionEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isViewPermissionEnabled": {
                get: function() {
                    context["field"] = "isViewPermissionEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isViewPermissionEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isViewPermissionEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isViewPermissionEnabled'].call(this, val, privateState);
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
            "limitGroupName": {
                get: function() {
                    context["field"] = "limitGroupName";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitGroupName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitGroupName, context);
                },
                set: function(val) {
                    setterFunctions['limitGroupName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limitGroupDescription": {
                get: function() {
                    context["field"] = "limitGroupDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitGroupDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitGroupDescription, context);
                },
                set: function(val) {
                    setterFunctions['limitGroupDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "password": {
                get: function() {
                    context["field"] = "password";
                    context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.password, context);
                },
                set: function(val) {
                    setterFunctions['password'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fistName": {
                get: function() {
                    context["field"] = "fistName";
                    context["metadata"] = (objectMetadata ? objectMetadata["fistName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fistName, context);
                },
                set: function(val) {
                    setterFunctions['fistName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isNotificationRequired": {
                get: function() {
                    context["field"] = "isNotificationRequired";
                    context["metadata"] = (objectMetadata ? objectMetadata["isNotificationRequired"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isNotificationRequired, context);
                },
                set: function(val) {
                    setterFunctions['isNotificationRequired'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyId": {
                get: function() {
                    context["field"] = "partyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyId, context);
                },
                set: function(val) {
                    setterFunctions['partyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companyId": {
                get: function() {
                    context["field"] = "companyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companyId, context);
                },
                set: function(val) {
                    setterFunctions['companyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isProfileExist": {
                get: function() {
                    context["field"] = "isProfileExist";
                    context["metadata"] = (objectMetadata ? objectMetadata["isProfileExist"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isProfileExist, context);
                },
                set: function(val) {
                    setterFunctions['isProfileExist'].call(this, val, privateState);
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
            "isOnBoradingFlow": {
                get: function() {
                    context["field"] = "isOnBoradingFlow";
                    context["metadata"] = (objectMetadata ? objectMetadata["isOnBoradingFlow"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isOnBoradingFlow, context);
                },
                set: function(val) {
                    setterFunctions['isOnBoradingFlow'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "applicationId": {
                get: function() {
                    context["field"] = "applicationId";
                    context["metadata"] = (objectMetadata ? objectMetadata["applicationId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.applicationId, context);
                },
                set: function(val) {
                    setterFunctions['applicationId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "primaryApplicantId": {
                get: function() {
                    context["field"] = "primaryApplicantId";
                    context["metadata"] = (objectMetadata ? objectMetadata["primaryApplicantId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.primaryApplicantId, context);
                },
                set: function(val) {
                    setterFunctions['primaryApplicantId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "coApplicantId": {
                get: function() {
                    context["field"] = "coApplicantId";
                    context["metadata"] = (objectMetadata ? objectMetadata["coApplicantId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.coApplicantId, context);
                },
                set: function(val) {
                    setterFunctions['coApplicantId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "applicantId": {
                get: function() {
                    context["field"] = "applicantId";
                    context["metadata"] = (objectMetadata ? objectMetadata["applicantId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.applicantId, context);
                },
                set: function(val) {
                    setterFunctions['applicantId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "signatoryGroups": {
                get: function() {
                    context["field"] = "signatoryGroups";
                    context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroups"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signatoryGroups, context);
                },
                set: function(val) {
                    setterFunctions['signatoryGroups'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "groups": {
                get: function() {
                    context["field"] = "groups";
                    context["metadata"] = (objectMetadata ? objectMetadata["groups"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.groups, context);
                },
                set: function(val) {
                    setterFunctions['groups'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "signatoryGroupId": {
                get: function() {
                    context["field"] = "signatoryGroupId";
                    context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signatoryGroupId, context);
                },
                set: function(val) {
                    setterFunctions['signatoryGroupId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "signatoryGroupName": {
                get: function() {
                    context["field"] = "signatoryGroupName";
                    context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signatoryGroupName, context);
                },
                set: function(val) {
                    setterFunctions['signatoryGroupName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "signatoryGroupDescription": {
                get: function() {
                    context["field"] = "signatoryGroupDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["signatoryGroupDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signatoryGroupDescription, context);
                },
                set: function(val) {
                    setterFunctions['signatoryGroupDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "signatories": {
                get: function() {
                    context["field"] = "signatories";
                    context["metadata"] = (objectMetadata ? objectMetadata["signatories"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.signatories, context);
                },
                set: function(val) {
                    setterFunctions['signatories'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isUserRemoved": {
                get: function() {
                    context["field"] = "isUserRemoved";
                    context["metadata"] = (objectMetadata ? objectMetadata["isUserRemoved"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isUserRemoved, context);
                },
                set: function(val) {
                    setterFunctions['isUserRemoved'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isAssigned": {
                get: function() {
                    context["field"] = "isAssigned";
                    context["metadata"] = (objectMetadata ? objectMetadata["isAssigned"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isAssigned, context);
                },
                set: function(val) {
                    setterFunctions['isAssigned'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "taxId": {
                get: function() {
                    context["field"] = "taxId";
                    context["metadata"] = (objectMetadata ? objectMetadata["taxId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.taxId, context);
                },
                set: function(val) {
                    setterFunctions['taxId'].call(this, val, privateState);
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
            "captchaValue": {
                get: function() {
                    context["field"] = "captchaValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["captchaValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.captchaValue, context);
                },
                set: function(val) {
                    setterFunctions['captchaValue'].call(this, val, privateState);
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
            privateState.userDetails = value ? (value["userDetails"] ? value["userDetails"] : null) : null;
            privateState.firstName = value ? (value["firstName"] ? value["firstName"] : null) : null;
            privateState.lastName = value ? (value["lastName"] ? value["lastName"] : null) : null;
            privateState.middleName = value ? (value["middleName"] ? value["middleName"] : null) : null;
            privateState.phoneNumber = value ? (value["phoneNumber"] ? value["phoneNumber"] : null) : null;
            privateState.phoneCountryCode = value ? (value["phoneCountryCode"] ? value["phoneCountryCode"] : null) : null;
            privateState.ssn = value ? (value["ssn"] ? value["ssn"] : null) : null;
            privateState.dob = value ? (value["dob"] ? value["dob"] : null) : null;
            privateState.drivingLicenseNumber = value ? (value["drivingLicenseNumber"] ? value["drivingLicenseNumber"] : null) : null;
            privateState.coreCustomerId = value ? (value["coreCustomerId"] ? value["coreCustomerId"] : null) : null;
            privateState.email = value ? (value["email"] ? value["email"] : null) : null;
            privateState.isEnrolled = value ? (value["isEnrolled"] ? value["isEnrolled"] : null) : null;
            privateState.companyList = value ? (value["companyList"] ? value["companyList"] : null) : null;
            privateState.companyName = value ? (value["companyName"] ? value["companyName"] : null) : null;
            privateState.contractId = value ? (value["contractId"] ? value["contractId"] : null) : null;
            privateState.contractName = value ? (value["contractName"] ? value["contractName"] : null) : null;
            privateState.cif = value ? (value["cif"] ? value["cif"] : null) : null;
            privateState.isPrimary = value ? (value["isPrimary"] ? value["isPrimary"] : null) : null;
            privateState.serviceDefinition = value ? (value["serviceDefinition"] ? value["serviceDefinition"] : null) : null;
            privateState.userRole = value ? (value["userRole"] ? value["userRole"] : null) : null;
            privateState.accounts = value ? (value["accounts"] ? value["accounts"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.accountId = value ? (value["accountId"] ? value["accountId"] : null) : null;
            privateState.isEnabled = value ? (value["isEnabled"] ? value["isEnabled"] : null) : null;
            privateState.accountType = value ? (value["accountType"] ? value["accountType"] : null) : null;
            privateState.accountLevelPermissions = value ? (value["accountLevelPermissions"] ? value["accountLevelPermissions"] : null) : null;
            privateState.permissionType = value ? (value["permissionType"] ? value["permissionType"] : null) : null;
            privateState.featurePermissions = value ? (value["featurePermissions"] ? value["featurePermissions"] : null) : null;
            privateState.featureId = value ? (value["featureId"] ? value["featureId"] : null) : null;
            privateState.featureDescription = value ? (value["featureDescription"] ? value["featureDescription"] : null) : null;
            privateState.featureName = value ? (value["featureName"] ? value["featureName"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.globalLevelPermissions = value ? (value["globalLevelPermissions"] ? value["globalLevelPermissions"] : null) : null;
            privateState.permissions = value ? (value["permissions"] ? value["permissions"] : null) : null;
            privateState.transactionLimits = value ? (value["transactionLimits"] ? value["transactionLimits"] : null) : null;
            privateState.individualTransaction = value ? (value["individualTransaction"] ? value["individualTransaction"] : null) : null;
            privateState.limitType = value ? (value["limitType"] ? value["limitType"] : null) : null;
            privateState.limit = value ? (value["limit"] ? value["limit"] : null) : null;
            privateState.bulkTransactionLimits = value ? (value["bulkTransactionLimits"] ? value["bulkTransactionLimits"] : null) : null;
            privateState.actionId = value ? (value["actionId"] ? value["actionId"] : null) : null;
            privateState.actionDescription = value ? (value["actionDescription"] ? value["actionDescription"] : null) : null;
            privateState.actionName = value ? (value["actionName"] ? value["actionName"] : null) : null;
            privateState.customers = value ? (value["customers"] ? value["customers"] : null) : null;
            privateState.name = value ? (value["name"] ? value["name"] : null) : null;
            privateState.isAlreadyAssociatedwithContract = value ? (value["isAlreadyAssociatedwithContract"] ? value["isAlreadyAssociatedwithContract"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dateOfBirth = value ? (value["dateOfBirth"] ? value["dateOfBirth"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.value = value ? (value["value"] ? value["value"] : null) : null;
            privateState.limits = value ? (value["limits"] ? value["limits"] : null) : null;
            privateState.roleId = value ? (value["roleId"] ? value["roleId"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.customRoleName = value ? (value["customRoleName"] ? value["customRoleName"] : null) : null;
            privateState.isDuplicate = value ? (value["isDuplicate"] ? value["isDuplicate"] : null) : null;
            privateState.customRoles = value ? (value["customRoles"] ? value["customRoles"] : null) : null;
            privateState.customRoleDetails = value ? (value["customRoleDetails"] ? value["customRoleDetails"] : null) : null;
            privateState.users = value ? (value["users"] ? value["users"] : null) : null;
            privateState.contractDetails = value ? (value["contractDetails"] ? value["contractDetails"] : null) : null;
            privateState.companies = value ? (value["companies"] ? value["companies"] : null) : null;
            privateState.coreCustomerName = value ? (value["coreCustomerName"] ? value["coreCustomerName"] : null) : null;
            privateState.infinityUserId = value ? (value["infinityUserId"] ? value["infinityUserId"] : null) : null;
            privateState.limitGroupId = value ? (value["limitGroupId"] ? value["limitGroupId"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.removedCompanies = value ? (value["removedCompanies"] ? value["removedCompanies"] : null) : null;
            privateState.userList = value ? (value["userList"] ? value["userList"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.isEditPermissionEnabled = value ? (value["isEditPermissionEnabled"] ? value["isEditPermissionEnabled"] : null) : null;
            privateState.isCreatePermissionEnabled = value ? (value["isCreatePermissionEnabled"] ? value["isCreatePermissionEnabled"] : null) : null;
            privateState.isViewPermissionEnabled = value ? (value["isViewPermissionEnabled"] ? value["isViewPermissionEnabled"] : null) : null;
            privateState.serviceDefinitionName = value ? (value["serviceDefinitionName"] ? value["serviceDefinitionName"] : null) : null;
            privateState.limitGroupName = value ? (value["limitGroupName"] ? value["limitGroupName"] : null) : null;
            privateState.limitGroupDescription = value ? (value["limitGroupDescription"] ? value["limitGroupDescription"] : null) : null;
            privateState.password = value ? (value["password"] ? value["password"] : null) : null;
            privateState.fistName = value ? (value["fistName"] ? value["fistName"] : null) : null;
            privateState.isNotificationRequired = value ? (value["isNotificationRequired"] ? value["isNotificationRequired"] : null) : null;
            privateState.partyId = value ? (value["partyId"] ? value["partyId"] : null) : null;
            privateState.companyId = value ? (value["companyId"] ? value["companyId"] : null) : null;
            privateState.isProfileExist = value ? (value["isProfileExist"] ? value["isProfileExist"] : null) : null;
            privateState.createdby = value ? (value["createdby"] ? value["createdby"] : null) : null;
            privateState.createdts = value ? (value["createdts"] ? value["createdts"] : null) : null;
            privateState.isOnBoradingFlow = value ? (value["isOnBoradingFlow"] ? value["isOnBoradingFlow"] : null) : null;
            privateState.applicationId = value ? (value["applicationId"] ? value["applicationId"] : null) : null;
            privateState.primaryApplicantId = value ? (value["primaryApplicantId"] ? value["primaryApplicantId"] : null) : null;
            privateState.coApplicantId = value ? (value["coApplicantId"] ? value["coApplicantId"] : null) : null;
            privateState.applicantId = value ? (value["applicantId"] ? value["applicantId"] : null) : null;
            privateState.signatoryGroups = value ? (value["signatoryGroups"] ? value["signatoryGroups"] : null) : null;
            privateState.groups = value ? (value["groups"] ? value["groups"] : null) : null;
            privateState.signatoryGroupId = value ? (value["signatoryGroupId"] ? value["signatoryGroupId"] : null) : null;
            privateState.signatoryGroupName = value ? (value["signatoryGroupName"] ? value["signatoryGroupName"] : null) : null;
            privateState.signatoryGroupDescription = value ? (value["signatoryGroupDescription"] ? value["signatoryGroupDescription"] : null) : null;
            privateState.signatories = value ? (value["signatories"] ? value["signatories"] : null) : null;
            privateState.isUserRemoved = value ? (value["isUserRemoved"] ? value["isUserRemoved"] : null) : null;
            privateState.isAssigned = value ? (value["isAssigned"] ? value["isAssigned"] : null) : null;
            privateState.taxId = value ? (value["taxId"] ? value["taxId"] : null) : null;
            privateState.serviceKey = value ? (value["serviceKey"] ? value["serviceKey"] : null) : null;
            privateState.captchaValue = value ? (value["captchaValue"] ? value["captchaValue"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Roles);

    //Create new class level validator object
    BaseModel.Validator.call(Roles);

    var registerValidatorBackup = Roles.registerValidator;

    Roles.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Roles.isValid(this, propName, val)) {
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
    //For Operation 'updateRole' with service id 'updateCustomRole4838'
     Roles.updateRole = function(params, onCompletion){
        return Roles.customVerb('updateRole', params, onCompletion);
     };

    //For Operation 'getRolesFromContract' with service id 'GetCompanyLevelCustomRoles5912'
     Roles.getRolesFromContract = function(params, onCompletion){
        return Roles.customVerb('getRolesFromContract', params, onCompletion);
     };

    //For Operation 'createRole' with service id 'CreateCustomRole5620'
     Roles.createRole = function(params, onCompletion){
        return Roles.customVerb('createRole', params, onCompletion);
     };

    //For Operation 'getRoleDetails' with service id 'getCustomRoleDetails8368'
     Roles.getRoleDetails = function(params, onCompletion){
        return Roles.customVerb('getRoleDetails', params, onCompletion);
     };

    //For Operation 'verifyRoleName' with service id 'verifyCustomRoleName5601'
     Roles.verifyRoleName = function(params, onCompletion){
        return Roles.customVerb('verifyRoleName', params, onCompletion);
     };

    var relations = [];

    Roles.relations = relations;

    Roles.prototype.isValid = function() {
        return Roles.isValid(this);
    };

    Roles.prototype.objModelName = "Roles";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Roles.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ExternalUserManagement", "Roles", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Roles.clone = function(objectToClone) {
        var clonedObj = new Roles();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Roles;
});