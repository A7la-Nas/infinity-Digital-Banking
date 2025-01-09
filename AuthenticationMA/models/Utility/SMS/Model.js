/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "SMS", "objectService" : "Utility"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IDValue: function(val, state) {
            context["field"] = "IDValue";
            context["metadata"] = (objectMetadata ? objectMetadata["IDValue"] : null);
            state['IDValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IDType_id: function(val, state) {
            context["field"] = "IDType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["IDType_id"] : null);
            state['IDType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UserName: function(val, state) {
            context["field"] = "UserName";
            context["metadata"] = (objectMetadata ? objectMetadata["UserName"] : null);
            state['UserName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Password: function(val, state) {
            context["field"] = "Password";
            context["metadata"] = (objectMetadata ? objectMetadata["Password"] : null);
            state['Password'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IsCoreIdentityScope: function(val, state) {
            context["field"] = "IsCoreIdentityScope";
            context["metadata"] = (objectMetadata ? objectMetadata["IsCoreIdentityScope"] : null);
            state['IsCoreIdentityScope'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Salutation: function(val, state) {
            context["field"] = "Salutation";
            context["metadata"] = (objectMetadata ? objectMetadata["Salutation"] : null);
            state['Salutation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FirstName: function(val, state) {
            context["field"] = "FirstName";
            context["metadata"] = (objectMetadata ? objectMetadata["FirstName"] : null);
            state['FirstName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MiddleName: function(val, state) {
            context["field"] = "MiddleName";
            context["metadata"] = (objectMetadata ? objectMetadata["MiddleName"] : null);
            state['MiddleName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        LastName: function(val, state) {
            context["field"] = "LastName";
            context["metadata"] = (objectMetadata ? objectMetadata["LastName"] : null);
            state['LastName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FullName: function(val, state) {
            context["field"] = "FullName";
            context["metadata"] = (objectMetadata ? objectMetadata["FullName"] : null);
            state['FullName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Gender: function(val, state) {
            context["field"] = "Gender";
            context["metadata"] = (objectMetadata ? objectMetadata["Gender"] : null);
            state['Gender'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        DateOfBirth: function(val, state) {
            context["field"] = "DateOfBirth";
            context["metadata"] = (objectMetadata ? objectMetadata["DateOfBirth"] : null);
            state['DateOfBirth'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Ssn: function(val, state) {
            context["field"] = "Ssn";
            context["metadata"] = (objectMetadata ? objectMetadata["Ssn"] : null);
            state['Ssn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CustomerType_id: function(val, state) {
            context["field"] = "CustomerType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["CustomerType_id"] : null);
            state['CustomerType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CustomerType: function(val, state) {
            context["field"] = "CustomerType";
            context["metadata"] = (objectMetadata ? objectMetadata["CustomerType"] : null);
            state['CustomerType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status_id: function(val, state) {
            context["field"] = "Status_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
            state['Status_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status: function(val, state) {
            context["field"] = "Status";
            context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
            state['Status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IsPhoneEnabled: function(val, state) {
            context["field"] = "IsPhoneEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["IsPhoneEnabled"] : null);
            state['IsPhoneEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IsEmailEnabled: function(val, state) {
            context["field"] = "IsEmailEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["IsEmailEnabled"] : null);
            state['IsEmailEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IsStaffMember: function(val, state) {
            context["field"] = "IsStaffMember";
            context["metadata"] = (objectMetadata ? objectMetadata["IsStaffMember"] : null);
            state['IsStaffMember'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isSuperAdmin: function(val, state) {
            context["field"] = "isSuperAdmin";
            context["metadata"] = (objectMetadata ? objectMetadata["isSuperAdmin"] : null);
            state['isSuperAdmin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Role: function(val, state) {
            context["field"] = "Role";
            context["metadata"] = (objectMetadata ? objectMetadata["Role"] : null);
            state['Role'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        SecurityImage_id: function(val, state) {
            context["field"] = "SecurityImage_id";
            context["metadata"] = (objectMetadata ? objectMetadata["SecurityImage_id"] : null);
            state['SecurityImage_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IsPinSet: function(val, state) {
            context["field"] = "IsPinSet";
            context["metadata"] = (objectMetadata ? objectMetadata["IsPinSet"] : null);
            state['IsPinSet'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Pin: function(val, state) {
            context["field"] = "Pin";
            context["metadata"] = (objectMetadata ? objectMetadata["Pin"] : null);
            state['Pin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Token: function(val, state) {
            context["field"] = "Token";
            context["metadata"] = (objectMetadata ? objectMetadata["Token"] : null);
            state['Token'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Otp: function(val, state) {
            context["field"] = "Otp";
            context["metadata"] = (objectMetadata ? objectMetadata["Otp"] : null);
            state['Otp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        OtpGenaratedts: function(val, state) {
            context["field"] = "OtpGenaratedts";
            context["metadata"] = (objectMetadata ? objectMetadata["OtpGenaratedts"] : null);
            state['OtpGenaratedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ValidDate: function(val, state) {
            context["field"] = "ValidDate";
            context["metadata"] = (objectMetadata ? objectMetadata["ValidDate"] : null);
            state['ValidDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unsuccessfulLoginAttempts: function(val, state) {
            context["field"] = "unsuccessfulLoginAttempts";
            context["metadata"] = (objectMetadata ? objectMetadata["unsuccessfulLoginAttempts"] : null);
            state['unsuccessfulLoginAttempts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isUserAccountLocked: function(val, state) {
            context["field"] = "isUserAccountLocked";
            context["metadata"] = (objectMetadata ? objectMetadata["isUserAccountLocked"] : null);
            state['isUserAccountLocked'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UserImage: function(val, state) {
            context["field"] = "UserImage";
            context["metadata"] = (objectMetadata ? objectMetadata["UserImage"] : null);
            state['UserImage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UserImageURL: function(val, state) {
            context["field"] = "UserImageURL";
            context["metadata"] = (objectMetadata ? objectMetadata["UserImageURL"] : null);
            state['UserImageURL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CountryCode: function(val, state) {
            context["field"] = "CountryCode";
            context["metadata"] = (objectMetadata ? objectMetadata["CountryCode"] : null);
            state['CountryCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Location_id: function(val, state) {
            context["field"] = "Location_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Location_id"] : null);
            state['Location_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IsOlbAllowed: function(val, state) {
            context["field"] = "IsOlbAllowed";
            context["metadata"] = (objectMetadata ? objectMetadata["IsOlbAllowed"] : null);
            state['IsOlbAllowed'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        OlbEnrolmentStatus_id: function(val, state) {
            context["field"] = "OlbEnrolmentStatus_id";
            context["metadata"] = (objectMetadata ? objectMetadata["OlbEnrolmentStatus_id"] : null);
            state['OlbEnrolmentStatus_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEnrolled: function(val, state) {
            context["field"] = "isEnrolled";
            context["metadata"] = (objectMetadata ? objectMetadata["isEnrolled"] : null);
            state['isEnrolled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Is_MemberEligibile: function(val, state) {
            context["field"] = "Is_MemberEligibile";
            context["metadata"] = (objectMetadata ? objectMetadata["Is_MemberEligibile"] : null);
            state['Is_MemberEligibile'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MemberEligibilityData: function(val, state) {
            context["field"] = "MemberEligibilityData";
            context["metadata"] = (objectMetadata ? objectMetadata["MemberEligibilityData"] : null);
            state['MemberEligibilityData'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Is_BBOA: function(val, state) {
            context["field"] = "Is_BBOA";
            context["metadata"] = (objectMetadata ? objectMetadata["Is_BBOA"] : null);
            state['Is_BBOA'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MaritalStatus_id: function(val, state) {
            context["field"] = "MaritalStatus_id";
            context["metadata"] = (objectMetadata ? objectMetadata["MaritalStatus_id"] : null);
            state['MaritalStatus_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        SpouseName: function(val, state) {
            context["field"] = "SpouseName";
            context["metadata"] = (objectMetadata ? objectMetadata["SpouseName"] : null);
            state['SpouseName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NoOfDependents: function(val, state) {
            context["field"] = "NoOfDependents";
            context["metadata"] = (objectMetadata ? objectMetadata["NoOfDependents"] : null);
            state['NoOfDependents'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EmployementStatus_id: function(val, state) {
            context["field"] = "EmployementStatus_id";
            context["metadata"] = (objectMetadata ? objectMetadata["EmployementStatus_id"] : null);
            state['EmployementStatus_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CurrentLoginTime: function(val, state) {
            context["field"] = "CurrentLoginTime";
            context["metadata"] = (objectMetadata ? objectMetadata["CurrentLoginTime"] : null);
            state['CurrentLoginTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Lastlogintime: function(val, state) {
            context["field"] = "Lastlogintime";
            context["metadata"] = (objectMetadata ? objectMetadata["Lastlogintime"] : null);
            state['Lastlogintime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CreditUnionMemberSince: function(val, state) {
            context["field"] = "CreditUnionMemberSince";
            context["metadata"] = (objectMetadata ? objectMetadata["CreditUnionMemberSince"] : null);
            state['CreditUnionMemberSince'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        AtionProfile_id: function(val, state) {
            context["field"] = "AtionProfile_id";
            context["metadata"] = (objectMetadata ? objectMetadata["AtionProfile_id"] : null);
            state['AtionProfile_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RegistrationLink: function(val, state) {
            context["field"] = "RegistrationLink";
            context["metadata"] = (objectMetadata ? objectMetadata["RegistrationLink"] : null);
            state['RegistrationLink'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RegLinkResendCount: function(val, state) {
            context["field"] = "RegLinkResendCount";
            context["metadata"] = (objectMetadata ? objectMetadata["RegLinkResendCount"] : null);
            state['RegLinkResendCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RegLinkValidity: function(val, state) {
            context["field"] = "RegLinkValidity";
            context["metadata"] = (objectMetadata ? objectMetadata["RegLinkValidity"] : null);
            state['RegLinkValidity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IsAssistConsented: function(val, state) {
            context["field"] = "IsAssistConsented";
            context["metadata"] = (objectMetadata ? objectMetadata["IsAssistConsented"] : null);
            state['IsAssistConsented'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        areDepositTermsAccepted: function(val, state) {
            context["field"] = "areDepositTermsAccepted";
            context["metadata"] = (objectMetadata ? objectMetadata["areDepositTermsAccepted"] : null);
            state['areDepositTermsAccepted'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        areAccountStatementTermsAccepted: function(val, state) {
            context["field"] = "areAccountStatementTermsAccepted";
            context["metadata"] = (objectMetadata ? objectMetadata["areAccountStatementTermsAccepted"] : null);
            state['areAccountStatementTermsAccepted'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        areUserAlertsTurnedOn: function(val, state) {
            context["field"] = "areUserAlertsTurnedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["areUserAlertsTurnedOn"] : null);
            state['areUserAlertsTurnedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isBillPaySupported: function(val, state) {
            context["field"] = "isBillPaySupported";
            context["metadata"] = (objectMetadata ? objectMetadata["isBillPaySupported"] : null);
            state['isBillPaySupported'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isBillPayActivated: function(val, state) {
            context["field"] = "isBillPayActivated";
            context["metadata"] = (objectMetadata ? objectMetadata["isBillPayActivated"] : null);
            state['isBillPayActivated'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isP2PSupported: function(val, state) {
            context["field"] = "isP2PSupported";
            context["metadata"] = (objectMetadata ? objectMetadata["isP2PSupported"] : null);
            state['isP2PSupported'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isP2PActivated: function(val, state) {
            context["field"] = "isP2PActivated";
            context["metadata"] = (objectMetadata ? objectMetadata["isP2PActivated"] : null);
            state['isP2PActivated'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isWireTransferEligible: function(val, state) {
            context["field"] = "isWireTransferEligible";
            context["metadata"] = (objectMetadata ? objectMetadata["isWireTransferEligible"] : null);
            state['isWireTransferEligible'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isWireTransferActivated: function(val, state) {
            context["field"] = "isWireTransferActivated";
            context["metadata"] = (objectMetadata ? objectMetadata["isWireTransferActivated"] : null);
            state['isWireTransferActivated'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdby: function(val, state) {
            context["field"] = "createdby";
            context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
            state['createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modifiedby: function(val, state) {
            context["field"] = "modifiedby";
            context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
            state['modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdts: function(val, state) {
            context["field"] = "createdts";
            context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
            state['createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastmodifiedts: function(val, state) {
            context["field"] = "lastmodifiedts";
            context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
            state['lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        synctimestamp: function(val, state) {
            context["field"] = "synctimestamp";
            context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
            state['synctimestamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softdeleteflag: function(val, state) {
            context["field"] = "softdeleteflag";
            context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
            state['softdeleteflag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        securityKey: function(val, state) {
            context["field"] = "securityKey";
            context["metadata"] = (objectMetadata ? objectMetadata["securityKey"] : null);
            state['securityKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Phone: function(val, state) {
            context["field"] = "Phone";
            context["metadata"] = (objectMetadata ? objectMetadata["Phone"] : null);
            state['Phone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Email: function(val, state) {
            context["field"] = "Email";
            context["metadata"] = (objectMetadata ? objectMetadata["Email"] : null);
            state['Email'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Result: function(val, state) {
            context["field"] = "Result";
            context["metadata"] = (objectMetadata ? objectMetadata["Result"] : null);
            state['Result'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errMessage: function(val, state) {
            context["field"] = "errMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errMessage"] : null);
            state['errMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errCode: function(val, state) {
            context["field"] = "errCode";
            context["metadata"] = (objectMetadata ? objectMetadata["errCode"] : null);
            state['errCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        error: function(val, state) {
            context["field"] = "error";
            context["metadata"] = (objectMetadata ? objectMetadata["error"] : null);
            state['error'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MemberId: function(val, state) {
            context["field"] = "MemberId";
            context["metadata"] = (objectMetadata ? objectMetadata["MemberId"] : null);
            state['MemberId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IDMidentifier: function(val, state) {
            context["field"] = "IDMidentifier";
            context["metadata"] = (objectMetadata ? objectMetadata["IDMidentifier"] : null);
            state['IDMidentifier'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorMessage: function(val, state) {
            context["field"] = "errorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
            state['errorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorCode: function(val, state) {
            context["field"] = "errorCode";
            context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
            state['errorCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lockedOn: function(val, state) {
            context["field"] = "lockedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["lockedOn"] : null);
            state['lockedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Subscribe: function(val, state) {
            context["field"] = "Subscribe";
            context["metadata"] = (objectMetadata ? objectMetadata["Subscribe"] : null);
            state['Subscribe'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Membership_id: function(val, state) {
            context["field"] = "Membership_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Membership_id"] : null);
            state['Membership_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Taxid: function(val, state) {
            context["field"] = "Taxid";
            context["metadata"] = (objectMetadata ? objectMetadata["Taxid"] : null);
            state['Taxid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Customer_id: function(val, state) {
            context["field"] = "Customer_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
            state['Customer_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accounts: function(val, state) {
            context["field"] = "accounts";
            context["metadata"] = (objectMetadata ? objectMetadata["accounts"] : null);
            state['accounts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        services: function(val, state) {
            context["field"] = "services";
            context["metadata"] = (objectMetadata ? objectMetadata["services"] : null);
            state['services'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Role_id: function(val, state) {
            context["field"] = "Role_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Role_id"] : null);
            state['Role_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customeraccounts: function(val, state) {
            context["field"] = "customeraccounts";
            context["metadata"] = (objectMetadata ? objectMetadata["customeraccounts"] : null);
            state['customeraccounts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        DrivingLicenseNumber: function(val, state) {
            context["field"] = "DrivingLicenseNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["DrivingLicenseNumber"] : null);
            state['DrivingLicenseNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EAgreementRequired: function(val, state) {
            context["field"] = "EAgreementRequired";
            context["metadata"] = (objectMetadata ? objectMetadata["EAgreementRequired"] : null);
            state['EAgreementRequired'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        doNotSendOTP: function(val, state) {
            context["field"] = "doNotSendOTP";
            context["metadata"] = (objectMetadata ? objectMetadata["doNotSendOTP"] : null);
            state['doNotSendOTP'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        redirectLink: function(val, state) {
            context["field"] = "redirectLink";
            context["metadata"] = (objectMetadata ? objectMetadata["redirectLink"] : null);
            state['redirectLink'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Organization_id: function(val, state) {
            context["field"] = "Organization_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Organization_id"] : null);
            state['Organization_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEAgreementRequired: function(val, state) {
            context["field"] = "isEAgreementRequired";
            context["metadata"] = (objectMetadata ? objectMetadata["isEAgreementRequired"] : null);
            state['isEAgreementRequired'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEagreementSigned: function(val, state) {
            context["field"] = "isEagreementSigned";
            context["metadata"] = (objectMetadata ? objectMetadata["isEagreementSigned"] : null);
            state['isEagreementSigned'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        opCode: function(val, state) {
            context["field"] = "opCode";
            context["metadata"] = (objectMetadata ? objectMetadata["opCode"] : null);
            state['opCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        opMessage: function(val, state) {
            context["field"] = "opMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["opMessage"] : null);
            state['opMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MessageType: function(val, state) {
            context["field"] = "MessageType";
            context["metadata"] = (objectMetadata ? objectMetadata["MessageType"] : null);
            state['MessageType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        SendToMobiles: function(val, state) {
            context["field"] = "SendToMobiles";
            context["metadata"] = (objectMetadata ? objectMetadata["SendToMobiles"] : null);
            state['SendToMobiles'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        membershipID: function(val, state) {
            context["field"] = "membershipID";
            context["metadata"] = (objectMetadata ? objectMetadata["membershipID"] : null);
            state['membershipID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isUserNameExists: function(val, state) {
            context["field"] = "isUserNameExists";
            context["metadata"] = (objectMetadata ? objectMetadata["isUserNameExists"] : null);
            state['isUserNameExists'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isUserExists: function(val, state) {
            context["field"] = "isUserExists";
            context["metadata"] = (objectMetadata ? objectMetadata["isUserExists"] : null);
            state['isUserExists'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MFAAttributes: function(val, state) {
            context["field"] = "MFAAttributes";
            context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
            state['MFAAttributes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sacMaxResendRequestsAllowed: function(val, state) {
            context["field"] = "sacMaxResendRequestsAllowed";
            context["metadata"] = (objectMetadata ? objectMetadata["sacMaxResendRequestsAllowed"] : null);
            state['sacMaxResendRequestsAllowed'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        remainingResendAttempts: function(val, state) {
            context["field"] = "remainingResendAttempts";
            context["metadata"] = (objectMetadata ? objectMetadata["remainingResendAttempts"] : null);
            state['remainingResendAttempts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sacCodeLength: function(val, state) {
            context["field"] = "sacCodeLength";
            context["metadata"] = (objectMetadata ? objectMetadata["sacCodeLength"] : null);
            state['sacCodeLength'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maxFailedAttemptsAllowed: function(val, state) {
            context["field"] = "maxFailedAttemptsAllowed";
            context["metadata"] = (objectMetadata ? objectMetadata["maxFailedAttemptsAllowed"] : null);
            state['maxFailedAttemptsAllowed'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        remainingFailedAttempts: function(val, state) {
            context["field"] = "remainingFailedAttempts";
            context["metadata"] = (objectMetadata ? objectMetadata["remainingFailedAttempts"] : null);
            state['remainingFailedAttempts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        failedAttempts: function(val, state) {
            context["field"] = "failedAttempts";
            context["metadata"] = (objectMetadata ? objectMetadata["failedAttempts"] : null);
            state['failedAttempts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceKey: function(val, state) {
            context["field"] = "serviceKey";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
            state['serviceKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        oldPassword: function(val, state) {
            context["field"] = "oldPassword";
            context["metadata"] = (objectMetadata ? objectMetadata["oldPassword"] : null);
            state['oldPassword'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        newPassword: function(val, state) {
            context["field"] = "newPassword";
            context["metadata"] = (objectMetadata ? objectMetadata["newPassword"] : null);
            state['newPassword'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        oldUserName: function(val, state) {
            context["field"] = "oldUserName";
            context["metadata"] = (objectMetadata ? objectMetadata["oldUserName"] : null);
            state['oldUserName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        newUserName: function(val, state) {
            context["field"] = "newUserName";
            context["metadata"] = (objectMetadata ? objectMetadata["newUserName"] : null);
            state['newUserName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isOtpVerified: function(val, state) {
            context["field"] = "isOtpVerified";
            context["metadata"] = (objectMetadata ? objectMetadata["isOtpVerified"] : null);
            state['isOtpVerified'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lockUser: function(val, state) {
            context["field"] = "lockUser";
            context["metadata"] = (objectMetadata ? objectMetadata["lockUser"] : null);
            state['lockUser'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        logoutUser: function(val, state) {
            context["field"] = "logoutUser";
            context["metadata"] = (objectMetadata ? objectMetadata["logoutUser"] : null);
            state['logoutUser'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceName: function(val, state) {
            context["field"] = "serviceName";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
            state['serviceName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lockoutTime: function(val, state) {
            context["field"] = "lockoutTime";
            context["metadata"] = (objectMetadata ? objectMetadata["lockoutTime"] : null);
            state['lockoutTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isOTPExpired: function(val, state) {
            context["field"] = "isOTPExpired";
            context["metadata"] = (objectMetadata ? objectMetadata["isOTPExpired"] : null);
            state['isOTPExpired'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        smsText: function(val, state) {
            context["field"] = "smsText";
            context["metadata"] = (objectMetadata ? objectMetadata["smsText"] : null);
            state['smsText'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        emailSubject: function(val, state) {
            context["field"] = "emailSubject";
            context["metadata"] = (objectMetadata ? objectMetadata["emailSubject"] : null);
            state['emailSubject'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        emailBody: function(val, state) {
            context["field"] = "emailBody";
            context["metadata"] = (objectMetadata ? objectMetadata["emailBody"] : null);
            state['emailBody'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RiskStatus: function(val, state) {
            context["field"] = "RiskStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["RiskStatus"] : null);
            state['RiskStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orgId: function(val, state) {
            context["field"] = "orgId";
            context["metadata"] = (objectMetadata ? objectMetadata["orgId"] : null);
            state['orgId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        identifier: function(val, state) {
            context["field"] = "identifier";
            context["metadata"] = (objectMetadata ? objectMetadata["identifier"] : null);
            state['identifier'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Type_id: function(val, state) {
            context["field"] = "Type_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Type_id"] : null);
            state['Type_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        mailRequestSent: function(val, state) {
            context["field"] = "mailRequestSent";
            context["metadata"] = (objectMetadata ? objectMetadata["mailRequestSent"] : null);
            state['mailRequestSent'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        addressInformation: function(val, state) {
            context["field"] = "addressInformation";
            context["metadata"] = (objectMetadata ? objectMetadata["addressInformation"] : null);
            state['addressInformation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        backendIdentifierInfo: function(val, state) {
            context["field"] = "backendIdentifierInfo";
            context["metadata"] = (objectMetadata ? objectMetadata["backendIdentifierInfo"] : null);
            state['backendIdentifierInfo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        personalInformation: function(val, state) {
            context["field"] = "personalInformation";
            context["metadata"] = (objectMetadata ? objectMetadata["personalInformation"] : null);
            state['personalInformation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isVIPCustomer: function(val, state) {
            context["field"] = "isVIPCustomer";
            context["metadata"] = (objectMetadata ? objectMetadata["isVIPCustomer"] : null);
            state['isVIPCustomer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        typeId: function(val, state) {
            context["field"] = "typeId";
            context["metadata"] = (objectMetadata ? objectMetadata["typeId"] : null);
            state['typeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actions: function(val, state) {
            context["field"] = "actions";
            context["metadata"] = (objectMetadata ? objectMetadata["actions"] : null);
            state['actions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Account_Name: function(val, state) {
            context["field"] = "Account_Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Account_Name"] : null);
            state['Account_Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limits: function(val, state) {
            context["field"] = "limits";
            context["metadata"] = (objectMetadata ? objectMetadata["limits"] : null);
            state['limits'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        value1: function(val, state) {
            context["field"] = "value1";
            context["metadata"] = (objectMetadata ? objectMetadata["value1"] : null);
            state['value1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountId: function(val, state) {
            context["field"] = "accountId";
            context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
            state['accountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actionId: function(val, state) {
            context["field"] = "actionId";
            context["metadata"] = (objectMetadata ? objectMetadata["actionId"] : null);
            state['actionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        features: function(val, state) {
            context["field"] = "features";
            context["metadata"] = (objectMetadata ? objectMetadata["features"] : null);
            state['features'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        session_token: function(val, state) {
            context["field"] = "session_token";
            context["metadata"] = (objectMetadata ? objectMetadata["session_token"] : null);
            state['session_token'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EmploymentTypeId: function(val, state) {
            context["field"] = "EmploymentTypeId";
            context["metadata"] = (objectMetadata ? objectMetadata["EmploymentTypeId"] : null);
            state['EmploymentTypeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        PhoneNumberId: function(val, state) {
            context["field"] = "PhoneNumberId";
            context["metadata"] = (objectMetadata ? objectMetadata["PhoneNumberId"] : null);
            state['PhoneNumberId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ElectronicId: function(val, state) {
            context["field"] = "ElectronicId";
            context["metadata"] = (objectMetadata ? objectMetadata["ElectronicId"] : null);
            state['ElectronicId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        AddressId: function(val, state) {
            context["field"] = "AddressId";
            context["metadata"] = (objectMetadata ? objectMetadata["AddressId"] : null);
            state['AddressId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EmailIds: function(val, state) {
            context["field"] = "EmailIds";
            context["metadata"] = (objectMetadata ? objectMetadata["EmailIds"] : null);
            state['EmailIds'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Addresses: function(val, state) {
            context["field"] = "Addresses";
            context["metadata"] = (objectMetadata ? objectMetadata["Addresses"] : null);
            state['Addresses'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        preferredContactTime: function(val, state) {
            context["field"] = "preferredContactTime";
            context["metadata"] = (objectMetadata ? objectMetadata["preferredContactTime"] : null);
            state['preferredContactTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modifiedByName: function(val, state) {
            context["field"] = "modifiedByName";
            context["metadata"] = (objectMetadata ? objectMetadata["modifiedByName"] : null);
            state['modifiedByName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        preferredContactMethod: function(val, state) {
            context["field"] = "preferredContactMethod";
            context["metadata"] = (objectMetadata ? objectMetadata["preferredContactMethod"] : null);
            state['preferredContactMethod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deleteAddressID: function(val, state) {
            context["field"] = "deleteAddressID";
            context["metadata"] = (objectMetadata ? objectMetadata["deleteAddressID"] : null);
            state['deleteAddressID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phoneNumbers: function(val, state) {
            context["field"] = "phoneNumbers";
            context["metadata"] = (objectMetadata ? objectMetadata["phoneNumbers"] : null);
            state['phoneNumbers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        eagreementStatus: function(val, state) {
            context["field"] = "eagreementStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["eagreementStatus"] : null);
            state['eagreementStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        listOfRemovedRisks: function(val, state) {
            context["field"] = "listOfRemovedRisks";
            context["metadata"] = (objectMetadata ? objectMetadata["listOfRemovedRisks"] : null);
            state['listOfRemovedRisks'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        listOfAddedRisks: function(val, state) {
            context["field"] = "listOfAddedRisks";
            context["metadata"] = (objectMetadata ? objectMetadata["listOfAddedRisks"] : null);
            state['listOfAddedRisks'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coreCustomerID: function(val, state) {
            context["field"] = "coreCustomerID";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerID"] : null);
            state['coreCustomerID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyID: function(val, state) {
            context["field"] = "partyID";
            context["metadata"] = (objectMetadata ? objectMetadata["partyID"] : null);
            state['partyID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        BackEndErrorCode: function(val, state) {
            context["field"] = "BackEndErrorCode";
            context["metadata"] = (objectMetadata ? objectMetadata["BackEndErrorCode"] : null);
            state['BackEndErrorCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        BackEndErrorMessage: function(val, state) {
            context["field"] = "BackEndErrorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["BackEndErrorMessage"] : null);
            state['BackEndErrorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        identities: function(val, state) {
            context["field"] = "identities";
            context["metadata"] = (objectMetadata ? objectMetadata["identities"] : null);
            state['identities'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        StartDate: function(val, state) {
            context["field"] = "StartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["StartDate"] : null);
            state['StartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isCombinedUser: function(val, state) {
            context["field"] = "isCombinedUser";
            context["metadata"] = (objectMetadata ? objectMetadata["isCombinedUser"] : null);
            state['isCombinedUser'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherUser: function(val, state) {
            context["field"] = "otherUser";
            context["metadata"] = (objectMetadata ? objectMetadata["otherUser"] : null);
            state['otherUser'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        newUser: function(val, state) {
            context["field"] = "newUser";
            context["metadata"] = (objectMetadata ? objectMetadata["newUser"] : null);
            state['newUser'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        addresstype: function(val, state) {
            context["field"] = "addresstype";
            context["metadata"] = (objectMetadata ? objectMetadata["addresstype"] : null);
            state['addresstype'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Description: function(val, state) {
            context["field"] = "Description";
            context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
            state['Description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        activationCode: function(val, state) {
            context["field"] = "activationCode";
            context["metadata"] = (objectMetadata ? objectMetadata["activationCode"] : null);
            state['activationCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        captchaValue: function(val, state) {
            context["field"] = "captchaValue";
            context["metadata"] = (objectMetadata ? objectMetadata["captchaValue"] : null);
            state['captchaValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        encodedImage: function(val, state) {
            context["field"] = "encodedImage";
            context["metadata"] = (objectMetadata ? objectMetadata["encodedImage"] : null);
            state['encodedImage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyId: function(val, state) {
            context["field"] = "companyId";
            context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
            state['companyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isNotificationRequired: function(val, state) {
            context["field"] = "isNotificationRequired";
            context["metadata"] = (objectMetadata ? objectMetadata["isNotificationRequired"] : null);
            state['isNotificationRequired'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        keys: function(val, state) {
            context["field"] = "keys";
            context["metadata"] = (objectMetadata ? objectMetadata["keys"] : null);
            state['keys'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EmployeeCount: function(val, state) {
            context["field"] = "EmployeeCount";
            context["metadata"] = (objectMetadata ? objectMetadata["EmployeeCount"] : null);
            state['EmployeeCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CountryIncorporation: function(val, state) {
            context["field"] = "CountryIncorporation";
            context["metadata"] = (objectMetadata ? objectMetadata["CountryIncorporation"] : null);
            state['CountryIncorporation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CompanyRegistrationDate: function(val, state) {
            context["field"] = "CompanyRegistrationDate";
            context["metadata"] = (objectMetadata ? objectMetadata["CompanyRegistrationDate"] : null);
            state['CompanyRegistrationDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function SMS(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "IDValue";
        context["metadata"] = (objectMetadata ? objectMetadata["IDValue"] : null);
        privateState.IDValue = defaultValues ?
            (defaultValues["IDValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IDValue"], context) :
                null) :
            null;

        context["field"] = "IDType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["IDType_id"] : null);
        privateState.IDType_id = defaultValues ?
            (defaultValues["IDType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IDType_id"], context) :
                null) :
            null;

        context["field"] = "UserName";
        context["metadata"] = (objectMetadata ? objectMetadata["UserName"] : null);
        privateState.UserName = defaultValues ?
            (defaultValues["UserName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UserName"], context) :
                null) :
            null;

        context["field"] = "Password";
        context["metadata"] = (objectMetadata ? objectMetadata["Password"] : null);
        privateState.Password = defaultValues ?
            (defaultValues["Password"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Password"], context) :
                null) :
            null;

        context["field"] = "IsCoreIdentityScope";
        context["metadata"] = (objectMetadata ? objectMetadata["IsCoreIdentityScope"] : null);
        privateState.IsCoreIdentityScope = defaultValues ?
            (defaultValues["IsCoreIdentityScope"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IsCoreIdentityScope"], context) :
                null) :
            null;

        context["field"] = "Salutation";
        context["metadata"] = (objectMetadata ? objectMetadata["Salutation"] : null);
        privateState.Salutation = defaultValues ?
            (defaultValues["Salutation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Salutation"], context) :
                null) :
            null;

        context["field"] = "FirstName";
        context["metadata"] = (objectMetadata ? objectMetadata["FirstName"] : null);
        privateState.FirstName = defaultValues ?
            (defaultValues["FirstName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FirstName"], context) :
                null) :
            null;

        context["field"] = "MiddleName";
        context["metadata"] = (objectMetadata ? objectMetadata["MiddleName"] : null);
        privateState.MiddleName = defaultValues ?
            (defaultValues["MiddleName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MiddleName"], context) :
                null) :
            null;

        context["field"] = "LastName";
        context["metadata"] = (objectMetadata ? objectMetadata["LastName"] : null);
        privateState.LastName = defaultValues ?
            (defaultValues["LastName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["LastName"], context) :
                null) :
            null;

        context["field"] = "FullName";
        context["metadata"] = (objectMetadata ? objectMetadata["FullName"] : null);
        privateState.FullName = defaultValues ?
            (defaultValues["FullName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FullName"], context) :
                null) :
            null;

        context["field"] = "Gender";
        context["metadata"] = (objectMetadata ? objectMetadata["Gender"] : null);
        privateState.Gender = defaultValues ?
            (defaultValues["Gender"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Gender"], context) :
                null) :
            null;

        context["field"] = "DateOfBirth";
        context["metadata"] = (objectMetadata ? objectMetadata["DateOfBirth"] : null);
        privateState.DateOfBirth = defaultValues ?
            (defaultValues["DateOfBirth"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["DateOfBirth"], context) :
                null) :
            null;

        context["field"] = "Ssn";
        context["metadata"] = (objectMetadata ? objectMetadata["Ssn"] : null);
        privateState.Ssn = defaultValues ?
            (defaultValues["Ssn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Ssn"], context) :
                null) :
            null;

        context["field"] = "CustomerType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["CustomerType_id"] : null);
        privateState.CustomerType_id = defaultValues ?
            (defaultValues["CustomerType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CustomerType_id"], context) :
                null) :
            null;

        context["field"] = "CustomerType";
        context["metadata"] = (objectMetadata ? objectMetadata["CustomerType"] : null);
        privateState.CustomerType = defaultValues ?
            (defaultValues["CustomerType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CustomerType"], context) :
                null) :
            null;

        context["field"] = "Status_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
        privateState.Status_id = defaultValues ?
            (defaultValues["Status_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status_id"], context) :
                null) :
            null;

        context["field"] = "Status";
        context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
        privateState.Status = defaultValues ?
            (defaultValues["Status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
                null) :
            null;

        context["field"] = "IsPhoneEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["IsPhoneEnabled"] : null);
        privateState.IsPhoneEnabled = defaultValues ?
            (defaultValues["IsPhoneEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IsPhoneEnabled"], context) :
                null) :
            null;

        context["field"] = "IsEmailEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["IsEmailEnabled"] : null);
        privateState.IsEmailEnabled = defaultValues ?
            (defaultValues["IsEmailEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IsEmailEnabled"], context) :
                null) :
            null;

        context["field"] = "IsStaffMember";
        context["metadata"] = (objectMetadata ? objectMetadata["IsStaffMember"] : null);
        privateState.IsStaffMember = defaultValues ?
            (defaultValues["IsStaffMember"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IsStaffMember"], context) :
                null) :
            null;

        context["field"] = "isSuperAdmin";
        context["metadata"] = (objectMetadata ? objectMetadata["isSuperAdmin"] : null);
        privateState.isSuperAdmin = defaultValues ?
            (defaultValues["isSuperAdmin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isSuperAdmin"], context) :
                null) :
            null;

        context["field"] = "Role";
        context["metadata"] = (objectMetadata ? objectMetadata["Role"] : null);
        privateState.Role = defaultValues ?
            (defaultValues["Role"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Role"], context) :
                null) :
            null;

        context["field"] = "SecurityImage_id";
        context["metadata"] = (objectMetadata ? objectMetadata["SecurityImage_id"] : null);
        privateState.SecurityImage_id = defaultValues ?
            (defaultValues["SecurityImage_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["SecurityImage_id"], context) :
                null) :
            null;

        context["field"] = "IsPinSet";
        context["metadata"] = (objectMetadata ? objectMetadata["IsPinSet"] : null);
        privateState.IsPinSet = defaultValues ?
            (defaultValues["IsPinSet"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IsPinSet"], context) :
                null) :
            null;

        context["field"] = "Pin";
        context["metadata"] = (objectMetadata ? objectMetadata["Pin"] : null);
        privateState.Pin = defaultValues ?
            (defaultValues["Pin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Pin"], context) :
                null) :
            null;

        context["field"] = "Token";
        context["metadata"] = (objectMetadata ? objectMetadata["Token"] : null);
        privateState.Token = defaultValues ?
            (defaultValues["Token"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Token"], context) :
                null) :
            null;

        context["field"] = "Otp";
        context["metadata"] = (objectMetadata ? objectMetadata["Otp"] : null);
        privateState.Otp = defaultValues ?
            (defaultValues["Otp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Otp"], context) :
                null) :
            null;

        context["field"] = "OtpGenaratedts";
        context["metadata"] = (objectMetadata ? objectMetadata["OtpGenaratedts"] : null);
        privateState.OtpGenaratedts = defaultValues ?
            (defaultValues["OtpGenaratedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["OtpGenaratedts"], context) :
                null) :
            null;

        context["field"] = "ValidDate";
        context["metadata"] = (objectMetadata ? objectMetadata["ValidDate"] : null);
        privateState.ValidDate = defaultValues ?
            (defaultValues["ValidDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ValidDate"], context) :
                null) :
            null;

        context["field"] = "unsuccessfulLoginAttempts";
        context["metadata"] = (objectMetadata ? objectMetadata["unsuccessfulLoginAttempts"] : null);
        privateState.unsuccessfulLoginAttempts = defaultValues ?
            (defaultValues["unsuccessfulLoginAttempts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unsuccessfulLoginAttempts"], context) :
                null) :
            null;

        context["field"] = "isUserAccountLocked";
        context["metadata"] = (objectMetadata ? objectMetadata["isUserAccountLocked"] : null);
        privateState.isUserAccountLocked = defaultValues ?
            (defaultValues["isUserAccountLocked"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isUserAccountLocked"], context) :
                null) :
            null;

        context["field"] = "UserImage";
        context["metadata"] = (objectMetadata ? objectMetadata["UserImage"] : null);
        privateState.UserImage = defaultValues ?
            (defaultValues["UserImage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UserImage"], context) :
                null) :
            null;

        context["field"] = "UserImageURL";
        context["metadata"] = (objectMetadata ? objectMetadata["UserImageURL"] : null);
        privateState.UserImageURL = defaultValues ?
            (defaultValues["UserImageURL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UserImageURL"], context) :
                null) :
            null;

        context["field"] = "CountryCode";
        context["metadata"] = (objectMetadata ? objectMetadata["CountryCode"] : null);
        privateState.CountryCode = defaultValues ?
            (defaultValues["CountryCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CountryCode"], context) :
                null) :
            null;

        context["field"] = "Location_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Location_id"] : null);
        privateState.Location_id = defaultValues ?
            (defaultValues["Location_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Location_id"], context) :
                null) :
            null;

        context["field"] = "IsOlbAllowed";
        context["metadata"] = (objectMetadata ? objectMetadata["IsOlbAllowed"] : null);
        privateState.IsOlbAllowed = defaultValues ?
            (defaultValues["IsOlbAllowed"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IsOlbAllowed"], context) :
                null) :
            null;

        context["field"] = "OlbEnrolmentStatus_id";
        context["metadata"] = (objectMetadata ? objectMetadata["OlbEnrolmentStatus_id"] : null);
        privateState.OlbEnrolmentStatus_id = defaultValues ?
            (defaultValues["OlbEnrolmentStatus_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["OlbEnrolmentStatus_id"], context) :
                null) :
            null;

        context["field"] = "isEnrolled";
        context["metadata"] = (objectMetadata ? objectMetadata["isEnrolled"] : null);
        privateState.isEnrolled = defaultValues ?
            (defaultValues["isEnrolled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEnrolled"], context) :
                null) :
            null;

        context["field"] = "Is_MemberEligibile";
        context["metadata"] = (objectMetadata ? objectMetadata["Is_MemberEligibile"] : null);
        privateState.Is_MemberEligibile = defaultValues ?
            (defaultValues["Is_MemberEligibile"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Is_MemberEligibile"], context) :
                null) :
            null;

        context["field"] = "MemberEligibilityData";
        context["metadata"] = (objectMetadata ? objectMetadata["MemberEligibilityData"] : null);
        privateState.MemberEligibilityData = defaultValues ?
            (defaultValues["MemberEligibilityData"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MemberEligibilityData"], context) :
                null) :
            null;

        context["field"] = "Is_BBOA";
        context["metadata"] = (objectMetadata ? objectMetadata["Is_BBOA"] : null);
        privateState.Is_BBOA = defaultValues ?
            (defaultValues["Is_BBOA"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Is_BBOA"], context) :
                null) :
            null;

        context["field"] = "MaritalStatus_id";
        context["metadata"] = (objectMetadata ? objectMetadata["MaritalStatus_id"] : null);
        privateState.MaritalStatus_id = defaultValues ?
            (defaultValues["MaritalStatus_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MaritalStatus_id"], context) :
                null) :
            null;

        context["field"] = "SpouseName";
        context["metadata"] = (objectMetadata ? objectMetadata["SpouseName"] : null);
        privateState.SpouseName = defaultValues ?
            (defaultValues["SpouseName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["SpouseName"], context) :
                null) :
            null;

        context["field"] = "NoOfDependents";
        context["metadata"] = (objectMetadata ? objectMetadata["NoOfDependents"] : null);
        privateState.NoOfDependents = defaultValues ?
            (defaultValues["NoOfDependents"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NoOfDependents"], context) :
                null) :
            null;

        context["field"] = "EmployementStatus_id";
        context["metadata"] = (objectMetadata ? objectMetadata["EmployementStatus_id"] : null);
        privateState.EmployementStatus_id = defaultValues ?
            (defaultValues["EmployementStatus_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EmployementStatus_id"], context) :
                null) :
            null;

        context["field"] = "CurrentLoginTime";
        context["metadata"] = (objectMetadata ? objectMetadata["CurrentLoginTime"] : null);
        privateState.CurrentLoginTime = defaultValues ?
            (defaultValues["CurrentLoginTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CurrentLoginTime"], context) :
                null) :
            null;

        context["field"] = "Lastlogintime";
        context["metadata"] = (objectMetadata ? objectMetadata["Lastlogintime"] : null);
        privateState.Lastlogintime = defaultValues ?
            (defaultValues["Lastlogintime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Lastlogintime"], context) :
                null) :
            null;

        context["field"] = "CreditUnionMemberSince";
        context["metadata"] = (objectMetadata ? objectMetadata["CreditUnionMemberSince"] : null);
        privateState.CreditUnionMemberSince = defaultValues ?
            (defaultValues["CreditUnionMemberSince"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CreditUnionMemberSince"], context) :
                null) :
            null;

        context["field"] = "AtionProfile_id";
        context["metadata"] = (objectMetadata ? objectMetadata["AtionProfile_id"] : null);
        privateState.AtionProfile_id = defaultValues ?
            (defaultValues["AtionProfile_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["AtionProfile_id"], context) :
                null) :
            null;

        context["field"] = "RegistrationLink";
        context["metadata"] = (objectMetadata ? objectMetadata["RegistrationLink"] : null);
        privateState.RegistrationLink = defaultValues ?
            (defaultValues["RegistrationLink"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RegistrationLink"], context) :
                null) :
            null;

        context["field"] = "RegLinkResendCount";
        context["metadata"] = (objectMetadata ? objectMetadata["RegLinkResendCount"] : null);
        privateState.RegLinkResendCount = defaultValues ?
            (defaultValues["RegLinkResendCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RegLinkResendCount"], context) :
                null) :
            null;

        context["field"] = "RegLinkValidity";
        context["metadata"] = (objectMetadata ? objectMetadata["RegLinkValidity"] : null);
        privateState.RegLinkValidity = defaultValues ?
            (defaultValues["RegLinkValidity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RegLinkValidity"], context) :
                null) :
            null;

        context["field"] = "IsAssistConsented";
        context["metadata"] = (objectMetadata ? objectMetadata["IsAssistConsented"] : null);
        privateState.IsAssistConsented = defaultValues ?
            (defaultValues["IsAssistConsented"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IsAssistConsented"], context) :
                null) :
            null;

        context["field"] = "areDepositTermsAccepted";
        context["metadata"] = (objectMetadata ? objectMetadata["areDepositTermsAccepted"] : null);
        privateState.areDepositTermsAccepted = defaultValues ?
            (defaultValues["areDepositTermsAccepted"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["areDepositTermsAccepted"], context) :
                null) :
            null;

        context["field"] = "areAccountStatementTermsAccepted";
        context["metadata"] = (objectMetadata ? objectMetadata["areAccountStatementTermsAccepted"] : null);
        privateState.areAccountStatementTermsAccepted = defaultValues ?
            (defaultValues["areAccountStatementTermsAccepted"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["areAccountStatementTermsAccepted"], context) :
                null) :
            null;

        context["field"] = "areUserAlertsTurnedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["areUserAlertsTurnedOn"] : null);
        privateState.areUserAlertsTurnedOn = defaultValues ?
            (defaultValues["areUserAlertsTurnedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["areUserAlertsTurnedOn"], context) :
                null) :
            null;

        context["field"] = "isBillPaySupported";
        context["metadata"] = (objectMetadata ? objectMetadata["isBillPaySupported"] : null);
        privateState.isBillPaySupported = defaultValues ?
            (defaultValues["isBillPaySupported"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isBillPaySupported"], context) :
                null) :
            null;

        context["field"] = "isBillPayActivated";
        context["metadata"] = (objectMetadata ? objectMetadata["isBillPayActivated"] : null);
        privateState.isBillPayActivated = defaultValues ?
            (defaultValues["isBillPayActivated"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isBillPayActivated"], context) :
                null) :
            null;

        context["field"] = "isP2PSupported";
        context["metadata"] = (objectMetadata ? objectMetadata["isP2PSupported"] : null);
        privateState.isP2PSupported = defaultValues ?
            (defaultValues["isP2PSupported"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isP2PSupported"], context) :
                null) :
            null;

        context["field"] = "isP2PActivated";
        context["metadata"] = (objectMetadata ? objectMetadata["isP2PActivated"] : null);
        privateState.isP2PActivated = defaultValues ?
            (defaultValues["isP2PActivated"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isP2PActivated"], context) :
                null) :
            null;

        context["field"] = "isWireTransferEligible";
        context["metadata"] = (objectMetadata ? objectMetadata["isWireTransferEligible"] : null);
        privateState.isWireTransferEligible = defaultValues ?
            (defaultValues["isWireTransferEligible"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isWireTransferEligible"], context) :
                null) :
            null;

        context["field"] = "isWireTransferActivated";
        context["metadata"] = (objectMetadata ? objectMetadata["isWireTransferActivated"] : null);
        privateState.isWireTransferActivated = defaultValues ?
            (defaultValues["isWireTransferActivated"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isWireTransferActivated"], context) :
                null) :
            null;

        context["field"] = "createdby";
        context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
        privateState.createdby = defaultValues ?
            (defaultValues["createdby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context) :
                null) :
            null;

        context["field"] = "modifiedby";
        context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
        privateState.modifiedby = defaultValues ?
            (defaultValues["modifiedby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context) :
                null) :
            null;

        context["field"] = "createdts";
        context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
        privateState.createdts = defaultValues ?
            (defaultValues["createdts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdts"], context) :
                null) :
            null;

        context["field"] = "lastmodifiedts";
        context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
        privateState.lastmodifiedts = defaultValues ?
            (defaultValues["lastmodifiedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastmodifiedts"], context) :
                null) :
            null;

        context["field"] = "synctimestamp";
        context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
        privateState.synctimestamp = defaultValues ?
            (defaultValues["synctimestamp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["synctimestamp"], context) :
                null) :
            null;

        context["field"] = "softdeleteflag";
        context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
        privateState.softdeleteflag = defaultValues ?
            (defaultValues["softdeleteflag"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softdeleteflag"], context) :
                null) :
            null;

        context["field"] = "securityKey";
        context["metadata"] = (objectMetadata ? objectMetadata["securityKey"] : null);
        privateState.securityKey = defaultValues ?
            (defaultValues["securityKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["securityKey"], context) :
                null) :
            null;

        context["field"] = "Phone";
        context["metadata"] = (objectMetadata ? objectMetadata["Phone"] : null);
        privateState.Phone = defaultValues ?
            (defaultValues["Phone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Phone"], context) :
                null) :
            null;

        context["field"] = "Email";
        context["metadata"] = (objectMetadata ? objectMetadata["Email"] : null);
        privateState.Email = defaultValues ?
            (defaultValues["Email"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Email"], context) :
                null) :
            null;

        context["field"] = "Result";
        context["metadata"] = (objectMetadata ? objectMetadata["Result"] : null);
        privateState.Result = defaultValues ?
            (defaultValues["Result"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Result"], context) :
                null) :
            null;

        context["field"] = "errMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errMessage"] : null);
        privateState.errMessage = defaultValues ?
            (defaultValues["errMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errMessage"], context) :
                null) :
            null;

        context["field"] = "errCode";
        context["metadata"] = (objectMetadata ? objectMetadata["errCode"] : null);
        privateState.errCode = defaultValues ?
            (defaultValues["errCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errCode"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
                null) :
            null;

        context["field"] = "error";
        context["metadata"] = (objectMetadata ? objectMetadata["error"] : null);
        privateState.error = defaultValues ?
            (defaultValues["error"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["error"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "MemberId";
        context["metadata"] = (objectMetadata ? objectMetadata["MemberId"] : null);
        privateState.MemberId = defaultValues ?
            (defaultValues["MemberId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MemberId"], context) :
                null) :
            null;

        context["field"] = "IDMidentifier";
        context["metadata"] = (objectMetadata ? objectMetadata["IDMidentifier"] : null);
        privateState.IDMidentifier = defaultValues ?
            (defaultValues["IDMidentifier"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IDMidentifier"], context) :
                null) :
            null;

        context["field"] = "errorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
        privateState.errorMessage = defaultValues ?
            (defaultValues["errorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorMessage"], context) :
                null) :
            null;

        context["field"] = "errorCode";
        context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
        privateState.errorCode = defaultValues ?
            (defaultValues["errorCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorCode"], context) :
                null) :
            null;

        context["field"] = "lockedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["lockedOn"] : null);
        privateState.lockedOn = defaultValues ?
            (defaultValues["lockedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lockedOn"], context) :
                null) :
            null;

        context["field"] = "Subscribe";
        context["metadata"] = (objectMetadata ? objectMetadata["Subscribe"] : null);
        privateState.Subscribe = defaultValues ?
            (defaultValues["Subscribe"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Subscribe"], context) :
                null) :
            null;

        context["field"] = "Membership_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Membership_id"] : null);
        privateState.Membership_id = defaultValues ?
            (defaultValues["Membership_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Membership_id"], context) :
                null) :
            null;

        context["field"] = "Taxid";
        context["metadata"] = (objectMetadata ? objectMetadata["Taxid"] : null);
        privateState.Taxid = defaultValues ?
            (defaultValues["Taxid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Taxid"], context) :
                null) :
            null;

        context["field"] = "Customer_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
        privateState.Customer_id = defaultValues ?
            (defaultValues["Customer_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Customer_id"], context) :
                null) :
            null;

        context["field"] = "accounts";
        context["metadata"] = (objectMetadata ? objectMetadata["accounts"] : null);
        privateState.accounts = defaultValues ?
            (defaultValues["accounts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accounts"], context) :
                null) :
            null;

        context["field"] = "services";
        context["metadata"] = (objectMetadata ? objectMetadata["services"] : null);
        privateState.services = defaultValues ?
            (defaultValues["services"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["services"], context) :
                null) :
            null;

        context["field"] = "Role_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Role_id"] : null);
        privateState.Role_id = defaultValues ?
            (defaultValues["Role_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Role_id"], context) :
                null) :
            null;

        context["field"] = "customeraccounts";
        context["metadata"] = (objectMetadata ? objectMetadata["customeraccounts"] : null);
        privateState.customeraccounts = defaultValues ?
            (defaultValues["customeraccounts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customeraccounts"], context) :
                null) :
            null;

        context["field"] = "DrivingLicenseNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["DrivingLicenseNumber"] : null);
        privateState.DrivingLicenseNumber = defaultValues ?
            (defaultValues["DrivingLicenseNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["DrivingLicenseNumber"], context) :
                null) :
            null;

        context["field"] = "EAgreementRequired";
        context["metadata"] = (objectMetadata ? objectMetadata["EAgreementRequired"] : null);
        privateState.EAgreementRequired = defaultValues ?
            (defaultValues["EAgreementRequired"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EAgreementRequired"], context) :
                null) :
            null;

        context["field"] = "doNotSendOTP";
        context["metadata"] = (objectMetadata ? objectMetadata["doNotSendOTP"] : null);
        privateState.doNotSendOTP = defaultValues ?
            (defaultValues["doNotSendOTP"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["doNotSendOTP"], context) :
                null) :
            null;

        context["field"] = "redirectLink";
        context["metadata"] = (objectMetadata ? objectMetadata["redirectLink"] : null);
        privateState.redirectLink = defaultValues ?
            (defaultValues["redirectLink"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["redirectLink"], context) :
                null) :
            null;

        context["field"] = "Organization_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Organization_id"] : null);
        privateState.Organization_id = defaultValues ?
            (defaultValues["Organization_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Organization_id"], context) :
                null) :
            null;

        context["field"] = "isEAgreementRequired";
        context["metadata"] = (objectMetadata ? objectMetadata["isEAgreementRequired"] : null);
        privateState.isEAgreementRequired = defaultValues ?
            (defaultValues["isEAgreementRequired"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEAgreementRequired"], context) :
                null) :
            null;

        context["field"] = "isEagreementSigned";
        context["metadata"] = (objectMetadata ? objectMetadata["isEagreementSigned"] : null);
        privateState.isEagreementSigned = defaultValues ?
            (defaultValues["isEagreementSigned"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEagreementSigned"], context) :
                null) :
            null;

        context["field"] = "opCode";
        context["metadata"] = (objectMetadata ? objectMetadata["opCode"] : null);
        privateState.opCode = defaultValues ?
            (defaultValues["opCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["opCode"], context) :
                null) :
            null;

        context["field"] = "opMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["opMessage"] : null);
        privateState.opMessage = defaultValues ?
            (defaultValues["opMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["opMessage"], context) :
                null) :
            null;

        context["field"] = "MessageType";
        context["metadata"] = (objectMetadata ? objectMetadata["MessageType"] : null);
        privateState.MessageType = defaultValues ?
            (defaultValues["MessageType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MessageType"], context) :
                null) :
            null;

        context["field"] = "SendToMobiles";
        context["metadata"] = (objectMetadata ? objectMetadata["SendToMobiles"] : null);
        privateState.SendToMobiles = defaultValues ?
            (defaultValues["SendToMobiles"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["SendToMobiles"], context) :
                null) :
            null;

        context["field"] = "membershipID";
        context["metadata"] = (objectMetadata ? objectMetadata["membershipID"] : null);
        privateState.membershipID = defaultValues ?
            (defaultValues["membershipID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["membershipID"], context) :
                null) :
            null;

        context["field"] = "isUserNameExists";
        context["metadata"] = (objectMetadata ? objectMetadata["isUserNameExists"] : null);
        privateState.isUserNameExists = defaultValues ?
            (defaultValues["isUserNameExists"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isUserNameExists"], context) :
                null) :
            null;

        context["field"] = "isUserExists";
        context["metadata"] = (objectMetadata ? objectMetadata["isUserExists"] : null);
        privateState.isUserExists = defaultValues ?
            (defaultValues["isUserExists"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isUserExists"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "MFAAttributes";
        context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
        privateState.MFAAttributes = defaultValues ?
            (defaultValues["MFAAttributes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MFAAttributes"], context) :
                null) :
            null;

        context["field"] = "sacMaxResendRequestsAllowed";
        context["metadata"] = (objectMetadata ? objectMetadata["sacMaxResendRequestsAllowed"] : null);
        privateState.sacMaxResendRequestsAllowed = defaultValues ?
            (defaultValues["sacMaxResendRequestsAllowed"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sacMaxResendRequestsAllowed"], context) :
                null) :
            null;

        context["field"] = "remainingResendAttempts";
        context["metadata"] = (objectMetadata ? objectMetadata["remainingResendAttempts"] : null);
        privateState.remainingResendAttempts = defaultValues ?
            (defaultValues["remainingResendAttempts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["remainingResendAttempts"], context) :
                null) :
            null;

        context["field"] = "sacCodeLength";
        context["metadata"] = (objectMetadata ? objectMetadata["sacCodeLength"] : null);
        privateState.sacCodeLength = defaultValues ?
            (defaultValues["sacCodeLength"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sacCodeLength"], context) :
                null) :
            null;

        context["field"] = "maxFailedAttemptsAllowed";
        context["metadata"] = (objectMetadata ? objectMetadata["maxFailedAttemptsAllowed"] : null);
        privateState.maxFailedAttemptsAllowed = defaultValues ?
            (defaultValues["maxFailedAttemptsAllowed"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maxFailedAttemptsAllowed"], context) :
                null) :
            null;

        context["field"] = "remainingFailedAttempts";
        context["metadata"] = (objectMetadata ? objectMetadata["remainingFailedAttempts"] : null);
        privateState.remainingFailedAttempts = defaultValues ?
            (defaultValues["remainingFailedAttempts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["remainingFailedAttempts"], context) :
                null) :
            null;

        context["field"] = "failedAttempts";
        context["metadata"] = (objectMetadata ? objectMetadata["failedAttempts"] : null);
        privateState.failedAttempts = defaultValues ?
            (defaultValues["failedAttempts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["failedAttempts"], context) :
                null) :
            null;

        context["field"] = "serviceKey";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
        privateState.serviceKey = defaultValues ?
            (defaultValues["serviceKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceKey"], context) :
                null) :
            null;

        context["field"] = "oldPassword";
        context["metadata"] = (objectMetadata ? objectMetadata["oldPassword"] : null);
        privateState.oldPassword = defaultValues ?
            (defaultValues["oldPassword"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["oldPassword"], context) :
                null) :
            null;

        context["field"] = "newPassword";
        context["metadata"] = (objectMetadata ? objectMetadata["newPassword"] : null);
        privateState.newPassword = defaultValues ?
            (defaultValues["newPassword"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["newPassword"], context) :
                null) :
            null;

        context["field"] = "oldUserName";
        context["metadata"] = (objectMetadata ? objectMetadata["oldUserName"] : null);
        privateState.oldUserName = defaultValues ?
            (defaultValues["oldUserName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["oldUserName"], context) :
                null) :
            null;

        context["field"] = "newUserName";
        context["metadata"] = (objectMetadata ? objectMetadata["newUserName"] : null);
        privateState.newUserName = defaultValues ?
            (defaultValues["newUserName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["newUserName"], context) :
                null) :
            null;

        context["field"] = "isOtpVerified";
        context["metadata"] = (objectMetadata ? objectMetadata["isOtpVerified"] : null);
        privateState.isOtpVerified = defaultValues ?
            (defaultValues["isOtpVerified"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isOtpVerified"], context) :
                null) :
            null;

        context["field"] = "lockUser";
        context["metadata"] = (objectMetadata ? objectMetadata["lockUser"] : null);
        privateState.lockUser = defaultValues ?
            (defaultValues["lockUser"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lockUser"], context) :
                null) :
            null;

        context["field"] = "logoutUser";
        context["metadata"] = (objectMetadata ? objectMetadata["logoutUser"] : null);
        privateState.logoutUser = defaultValues ?
            (defaultValues["logoutUser"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["logoutUser"], context) :
                null) :
            null;

        context["field"] = "serviceName";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
        privateState.serviceName = defaultValues ?
            (defaultValues["serviceName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceName"], context) :
                null) :
            null;

        context["field"] = "lockoutTime";
        context["metadata"] = (objectMetadata ? objectMetadata["lockoutTime"] : null);
        privateState.lockoutTime = defaultValues ?
            (defaultValues["lockoutTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lockoutTime"], context) :
                null) :
            null;

        context["field"] = "isOTPExpired";
        context["metadata"] = (objectMetadata ? objectMetadata["isOTPExpired"] : null);
        privateState.isOTPExpired = defaultValues ?
            (defaultValues["isOTPExpired"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isOTPExpired"], context) :
                null) :
            null;

        context["field"] = "smsText";
        context["metadata"] = (objectMetadata ? objectMetadata["smsText"] : null);
        privateState.smsText = defaultValues ?
            (defaultValues["smsText"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["smsText"], context) :
                null) :
            null;

        context["field"] = "emailSubject";
        context["metadata"] = (objectMetadata ? objectMetadata["emailSubject"] : null);
        privateState.emailSubject = defaultValues ?
            (defaultValues["emailSubject"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["emailSubject"], context) :
                null) :
            null;

        context["field"] = "emailBody";
        context["metadata"] = (objectMetadata ? objectMetadata["emailBody"] : null);
        privateState.emailBody = defaultValues ?
            (defaultValues["emailBody"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["emailBody"], context) :
                null) :
            null;

        context["field"] = "RiskStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["RiskStatus"] : null);
        privateState.RiskStatus = defaultValues ?
            (defaultValues["RiskStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RiskStatus"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "orgId";
        context["metadata"] = (objectMetadata ? objectMetadata["orgId"] : null);
        privateState.orgId = defaultValues ?
            (defaultValues["orgId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orgId"], context) :
                null) :
            null;

        context["field"] = "identifier";
        context["metadata"] = (objectMetadata ? objectMetadata["identifier"] : null);
        privateState.identifier = defaultValues ?
            (defaultValues["identifier"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["identifier"], context) :
                null) :
            null;

        context["field"] = "Type_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Type_id"] : null);
        privateState.Type_id = defaultValues ?
            (defaultValues["Type_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Type_id"], context) :
                null) :
            null;

        context["field"] = "mailRequestSent";
        context["metadata"] = (objectMetadata ? objectMetadata["mailRequestSent"] : null);
        privateState.mailRequestSent = defaultValues ?
            (defaultValues["mailRequestSent"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["mailRequestSent"], context) :
                null) :
            null;

        context["field"] = "addressInformation";
        context["metadata"] = (objectMetadata ? objectMetadata["addressInformation"] : null);
        privateState.addressInformation = defaultValues ?
            (defaultValues["addressInformation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addressInformation"], context) :
                null) :
            null;

        context["field"] = "backendIdentifierInfo";
        context["metadata"] = (objectMetadata ? objectMetadata["backendIdentifierInfo"] : null);
        privateState.backendIdentifierInfo = defaultValues ?
            (defaultValues["backendIdentifierInfo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["backendIdentifierInfo"], context) :
                null) :
            null;

        context["field"] = "personalInformation";
        context["metadata"] = (objectMetadata ? objectMetadata["personalInformation"] : null);
        privateState.personalInformation = defaultValues ?
            (defaultValues["personalInformation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["personalInformation"], context) :
                null) :
            null;

        context["field"] = "isVIPCustomer";
        context["metadata"] = (objectMetadata ? objectMetadata["isVIPCustomer"] : null);
        privateState.isVIPCustomer = defaultValues ?
            (defaultValues["isVIPCustomer"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isVIPCustomer"], context) :
                null) :
            null;

        context["field"] = "typeId";
        context["metadata"] = (objectMetadata ? objectMetadata["typeId"] : null);
        privateState.typeId = defaultValues ?
            (defaultValues["typeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["typeId"], context) :
                null) :
            null;

        context["field"] = "actions";
        context["metadata"] = (objectMetadata ? objectMetadata["actions"] : null);
        privateState.actions = defaultValues ?
            (defaultValues["actions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actions"], context) :
                null) :
            null;

        context["field"] = "Account_Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Account_Name"] : null);
        privateState.Account_Name = defaultValues ?
            (defaultValues["Account_Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Account_Name"], context) :
                null) :
            null;

        context["field"] = "limits";
        context["metadata"] = (objectMetadata ? objectMetadata["limits"] : null);
        privateState.limits = defaultValues ?
            (defaultValues["limits"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limits"], context) :
                null) :
            null;

        context["field"] = "value1";
        context["metadata"] = (objectMetadata ? objectMetadata["value1"] : null);
        privateState.value1 = defaultValues ?
            (defaultValues["value1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["value1"], context) :
                null) :
            null;

        context["field"] = "accountId";
        context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
        privateState.accountId = defaultValues ?
            (defaultValues["accountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountId"], context) :
                null) :
            null;

        context["field"] = "actionId";
        context["metadata"] = (objectMetadata ? objectMetadata["actionId"] : null);
        privateState.actionId = defaultValues ?
            (defaultValues["actionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actionId"], context) :
                null) :
            null;

        context["field"] = "features";
        context["metadata"] = (objectMetadata ? objectMetadata["features"] : null);
        privateState.features = defaultValues ?
            (defaultValues["features"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["features"], context) :
                null) :
            null;

        context["field"] = "session_token";
        context["metadata"] = (objectMetadata ? objectMetadata["session_token"] : null);
        privateState.session_token = defaultValues ?
            (defaultValues["session_token"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["session_token"], context) :
                null) :
            null;

        context["field"] = "EmploymentTypeId";
        context["metadata"] = (objectMetadata ? objectMetadata["EmploymentTypeId"] : null);
        privateState.EmploymentTypeId = defaultValues ?
            (defaultValues["EmploymentTypeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EmploymentTypeId"], context) :
                null) :
            null;

        context["field"] = "PhoneNumberId";
        context["metadata"] = (objectMetadata ? objectMetadata["PhoneNumberId"] : null);
        privateState.PhoneNumberId = defaultValues ?
            (defaultValues["PhoneNumberId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["PhoneNumberId"], context) :
                null) :
            null;

        context["field"] = "ElectronicId";
        context["metadata"] = (objectMetadata ? objectMetadata["ElectronicId"] : null);
        privateState.ElectronicId = defaultValues ?
            (defaultValues["ElectronicId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ElectronicId"], context) :
                null) :
            null;

        context["field"] = "AddressId";
        context["metadata"] = (objectMetadata ? objectMetadata["AddressId"] : null);
        privateState.AddressId = defaultValues ?
            (defaultValues["AddressId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["AddressId"], context) :
                null) :
            null;

        context["field"] = "EmailIds";
        context["metadata"] = (objectMetadata ? objectMetadata["EmailIds"] : null);
        privateState.EmailIds = defaultValues ?
            (defaultValues["EmailIds"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EmailIds"], context) :
                null) :
            null;

        context["field"] = "Addresses";
        context["metadata"] = (objectMetadata ? objectMetadata["Addresses"] : null);
        privateState.Addresses = defaultValues ?
            (defaultValues["Addresses"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Addresses"], context) :
                null) :
            null;

        context["field"] = "preferredContactTime";
        context["metadata"] = (objectMetadata ? objectMetadata["preferredContactTime"] : null);
        privateState.preferredContactTime = defaultValues ?
            (defaultValues["preferredContactTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["preferredContactTime"], context) :
                null) :
            null;

        context["field"] = "modifiedByName";
        context["metadata"] = (objectMetadata ? objectMetadata["modifiedByName"] : null);
        privateState.modifiedByName = defaultValues ?
            (defaultValues["modifiedByName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedByName"], context) :
                null) :
            null;

        context["field"] = "preferredContactMethod";
        context["metadata"] = (objectMetadata ? objectMetadata["preferredContactMethod"] : null);
        privateState.preferredContactMethod = defaultValues ?
            (defaultValues["preferredContactMethod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["preferredContactMethod"], context) :
                null) :
            null;

        context["field"] = "deleteAddressID";
        context["metadata"] = (objectMetadata ? objectMetadata["deleteAddressID"] : null);
        privateState.deleteAddressID = defaultValues ?
            (defaultValues["deleteAddressID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deleteAddressID"], context) :
                null) :
            null;

        context["field"] = "phoneNumbers";
        context["metadata"] = (objectMetadata ? objectMetadata["phoneNumbers"] : null);
        privateState.phoneNumbers = defaultValues ?
            (defaultValues["phoneNumbers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phoneNumbers"], context) :
                null) :
            null;

        context["field"] = "eagreementStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["eagreementStatus"] : null);
        privateState.eagreementStatus = defaultValues ?
            (defaultValues["eagreementStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["eagreementStatus"], context) :
                null) :
            null;

        context["field"] = "listOfRemovedRisks";
        context["metadata"] = (objectMetadata ? objectMetadata["listOfRemovedRisks"] : null);
        privateState.listOfRemovedRisks = defaultValues ?
            (defaultValues["listOfRemovedRisks"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["listOfRemovedRisks"], context) :
                null) :
            null;

        context["field"] = "listOfAddedRisks";
        context["metadata"] = (objectMetadata ? objectMetadata["listOfAddedRisks"] : null);
        privateState.listOfAddedRisks = defaultValues ?
            (defaultValues["listOfAddedRisks"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["listOfAddedRisks"], context) :
                null) :
            null;

        context["field"] = "coreCustomerID";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerID"] : null);
        privateState.coreCustomerID = defaultValues ?
            (defaultValues["coreCustomerID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerID"], context) :
                null) :
            null;

        context["field"] = "partyID";
        context["metadata"] = (objectMetadata ? objectMetadata["partyID"] : null);
        privateState.partyID = defaultValues ?
            (defaultValues["partyID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyID"], context) :
                null) :
            null;

        context["field"] = "BackEndErrorCode";
        context["metadata"] = (objectMetadata ? objectMetadata["BackEndErrorCode"] : null);
        privateState.BackEndErrorCode = defaultValues ?
            (defaultValues["BackEndErrorCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["BackEndErrorCode"], context) :
                null) :
            null;

        context["field"] = "BackEndErrorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["BackEndErrorMessage"] : null);
        privateState.BackEndErrorMessage = defaultValues ?
            (defaultValues["BackEndErrorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["BackEndErrorMessage"], context) :
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

        context["field"] = "identities";
        context["metadata"] = (objectMetadata ? objectMetadata["identities"] : null);
        privateState.identities = defaultValues ?
            (defaultValues["identities"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["identities"], context) :
                null) :
            null;

        context["field"] = "StartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["StartDate"] : null);
        privateState.StartDate = defaultValues ?
            (defaultValues["StartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["StartDate"], context) :
                null) :
            null;

        context["field"] = "isCombinedUser";
        context["metadata"] = (objectMetadata ? objectMetadata["isCombinedUser"] : null);
        privateState.isCombinedUser = defaultValues ?
            (defaultValues["isCombinedUser"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isCombinedUser"], context) :
                null) :
            null;

        context["field"] = "otherUser";
        context["metadata"] = (objectMetadata ? objectMetadata["otherUser"] : null);
        privateState.otherUser = defaultValues ?
            (defaultValues["otherUser"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherUser"], context) :
                null) :
            null;

        context["field"] = "newUser";
        context["metadata"] = (objectMetadata ? objectMetadata["newUser"] : null);
        privateState.newUser = defaultValues ?
            (defaultValues["newUser"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["newUser"], context) :
                null) :
            null;

        context["field"] = "addresstype";
        context["metadata"] = (objectMetadata ? objectMetadata["addresstype"] : null);
        privateState.addresstype = defaultValues ?
            (defaultValues["addresstype"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addresstype"], context) :
                null) :
            null;

        context["field"] = "Description";
        context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
        privateState.Description = defaultValues ?
            (defaultValues["Description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Description"], context) :
                null) :
            null;

        context["field"] = "activationCode";
        context["metadata"] = (objectMetadata ? objectMetadata["activationCode"] : null);
        privateState.activationCode = defaultValues ?
            (defaultValues["activationCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["activationCode"], context) :
                null) :
            null;

        context["field"] = "captchaValue";
        context["metadata"] = (objectMetadata ? objectMetadata["captchaValue"] : null);
        privateState.captchaValue = defaultValues ?
            (defaultValues["captchaValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["captchaValue"], context) :
                null) :
            null;

        context["field"] = "encodedImage";
        context["metadata"] = (objectMetadata ? objectMetadata["encodedImage"] : null);
        privateState.encodedImage = defaultValues ?
            (defaultValues["encodedImage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["encodedImage"], context) :
                null) :
            null;

        context["field"] = "companyId";
        context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
        privateState.companyId = defaultValues ?
            (defaultValues["companyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyId"], context) :
                null) :
            null;

        context["field"] = "isNotificationRequired";
        context["metadata"] = (objectMetadata ? objectMetadata["isNotificationRequired"] : null);
        privateState.isNotificationRequired = defaultValues ?
            (defaultValues["isNotificationRequired"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isNotificationRequired"], context) :
                null) :
            null;

        context["field"] = "keys";
        context["metadata"] = (objectMetadata ? objectMetadata["keys"] : null);
        privateState.keys = defaultValues ?
            (defaultValues["keys"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["keys"], context) :
                null) :
            null;

        context["field"] = "EmployeeCount";
        context["metadata"] = (objectMetadata ? objectMetadata["EmployeeCount"] : null);
        privateState.EmployeeCount = defaultValues ?
            (defaultValues["EmployeeCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EmployeeCount"], context) :
                null) :
            null;

        context["field"] = "CountryIncorporation";
        context["metadata"] = (objectMetadata ? objectMetadata["CountryIncorporation"] : null);
        privateState.CountryIncorporation = defaultValues ?
            (defaultValues["CountryIncorporation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CountryIncorporation"], context) :
                null) :
            null;

        context["field"] = "CompanyRegistrationDate";
        context["metadata"] = (objectMetadata ? objectMetadata["CompanyRegistrationDate"] : null);
        privateState.CompanyRegistrationDate = defaultValues ?
            (defaultValues["CompanyRegistrationDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CompanyRegistrationDate"], context) :
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
            "IDValue": {
                get: function() {
                    context["field"] = "IDValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["IDValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IDValue, context);
                },
                set: function(val) {
                    setterFunctions['IDValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "IDType_id": {
                get: function() {
                    context["field"] = "IDType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["IDType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IDType_id, context);
                },
                set: function(val) {
                    setterFunctions['IDType_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "UserName": {
                get: function() {
                    context["field"] = "UserName";
                    context["metadata"] = (objectMetadata ? objectMetadata["UserName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UserName, context);
                },
                set: function(val) {
                    setterFunctions['UserName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Password": {
                get: function() {
                    context["field"] = "Password";
                    context["metadata"] = (objectMetadata ? objectMetadata["Password"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Password, context);
                },
                set: function(val) {
                    setterFunctions['Password'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "IsCoreIdentityScope": {
                get: function() {
                    context["field"] = "IsCoreIdentityScope";
                    context["metadata"] = (objectMetadata ? objectMetadata["IsCoreIdentityScope"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IsCoreIdentityScope, context);
                },
                set: function(val) {
                    setterFunctions['IsCoreIdentityScope'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Salutation": {
                get: function() {
                    context["field"] = "Salutation";
                    context["metadata"] = (objectMetadata ? objectMetadata["Salutation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Salutation, context);
                },
                set: function(val) {
                    setterFunctions['Salutation'].call(this, val, privateState);
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
            "MiddleName": {
                get: function() {
                    context["field"] = "MiddleName";
                    context["metadata"] = (objectMetadata ? objectMetadata["MiddleName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MiddleName, context);
                },
                set: function(val) {
                    setterFunctions['MiddleName'].call(this, val, privateState);
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
            "FullName": {
                get: function() {
                    context["field"] = "FullName";
                    context["metadata"] = (objectMetadata ? objectMetadata["FullName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FullName, context);
                },
                set: function(val) {
                    setterFunctions['FullName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Gender": {
                get: function() {
                    context["field"] = "Gender";
                    context["metadata"] = (objectMetadata ? objectMetadata["Gender"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Gender, context);
                },
                set: function(val) {
                    setterFunctions['Gender'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "DateOfBirth": {
                get: function() {
                    context["field"] = "DateOfBirth";
                    context["metadata"] = (objectMetadata ? objectMetadata["DateOfBirth"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.DateOfBirth, context);
                },
                set: function(val) {
                    setterFunctions['DateOfBirth'].call(this, val, privateState);
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
            "CustomerType_id": {
                get: function() {
                    context["field"] = "CustomerType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["CustomerType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CustomerType_id, context);
                },
                set: function(val) {
                    setterFunctions['CustomerType_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CustomerType": {
                get: function() {
                    context["field"] = "CustomerType";
                    context["metadata"] = (objectMetadata ? objectMetadata["CustomerType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CustomerType, context);
                },
                set: function(val) {
                    setterFunctions['CustomerType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Status_id": {
                get: function() {
                    context["field"] = "Status_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Status_id, context);
                },
                set: function(val) {
                    setterFunctions['Status_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Status": {
                get: function() {
                    context["field"] = "Status";
                    context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Status, context);
                },
                set: function(val) {
                    setterFunctions['Status'].call(this, val, privateState);
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
            "IsPhoneEnabled": {
                get: function() {
                    context["field"] = "IsPhoneEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["IsPhoneEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IsPhoneEnabled, context);
                },
                set: function(val) {
                    setterFunctions['IsPhoneEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "IsEmailEnabled": {
                get: function() {
                    context["field"] = "IsEmailEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["IsEmailEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IsEmailEnabled, context);
                },
                set: function(val) {
                    setterFunctions['IsEmailEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "IsStaffMember": {
                get: function() {
                    context["field"] = "IsStaffMember";
                    context["metadata"] = (objectMetadata ? objectMetadata["IsStaffMember"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IsStaffMember, context);
                },
                set: function(val) {
                    setterFunctions['IsStaffMember'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isSuperAdmin": {
                get: function() {
                    context["field"] = "isSuperAdmin";
                    context["metadata"] = (objectMetadata ? objectMetadata["isSuperAdmin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isSuperAdmin, context);
                },
                set: function(val) {
                    setterFunctions['isSuperAdmin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Role": {
                get: function() {
                    context["field"] = "Role";
                    context["metadata"] = (objectMetadata ? objectMetadata["Role"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Role, context);
                },
                set: function(val) {
                    setterFunctions['Role'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "SecurityImage_id": {
                get: function() {
                    context["field"] = "SecurityImage_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["SecurityImage_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.SecurityImage_id, context);
                },
                set: function(val) {
                    setterFunctions['SecurityImage_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "IsPinSet": {
                get: function() {
                    context["field"] = "IsPinSet";
                    context["metadata"] = (objectMetadata ? objectMetadata["IsPinSet"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IsPinSet, context);
                },
                set: function(val) {
                    setterFunctions['IsPinSet'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Pin": {
                get: function() {
                    context["field"] = "Pin";
                    context["metadata"] = (objectMetadata ? objectMetadata["Pin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Pin, context);
                },
                set: function(val) {
                    setterFunctions['Pin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Token": {
                get: function() {
                    context["field"] = "Token";
                    context["metadata"] = (objectMetadata ? objectMetadata["Token"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Token, context);
                },
                set: function(val) {
                    setterFunctions['Token'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Otp": {
                get: function() {
                    context["field"] = "Otp";
                    context["metadata"] = (objectMetadata ? objectMetadata["Otp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Otp, context);
                },
                set: function(val) {
                    setterFunctions['Otp'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "OtpGenaratedts": {
                get: function() {
                    context["field"] = "OtpGenaratedts";
                    context["metadata"] = (objectMetadata ? objectMetadata["OtpGenaratedts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.OtpGenaratedts, context);
                },
                set: function(val) {
                    setterFunctions['OtpGenaratedts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ValidDate": {
                get: function() {
                    context["field"] = "ValidDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["ValidDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ValidDate, context);
                },
                set: function(val) {
                    setterFunctions['ValidDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "unsuccessfulLoginAttempts": {
                get: function() {
                    context["field"] = "unsuccessfulLoginAttempts";
                    context["metadata"] = (objectMetadata ? objectMetadata["unsuccessfulLoginAttempts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unsuccessfulLoginAttempts, context);
                },
                set: function(val) {
                    setterFunctions['unsuccessfulLoginAttempts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isUserAccountLocked": {
                get: function() {
                    context["field"] = "isUserAccountLocked";
                    context["metadata"] = (objectMetadata ? objectMetadata["isUserAccountLocked"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isUserAccountLocked, context);
                },
                set: function(val) {
                    setterFunctions['isUserAccountLocked'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "UserImage": {
                get: function() {
                    context["field"] = "UserImage";
                    context["metadata"] = (objectMetadata ? objectMetadata["UserImage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UserImage, context);
                },
                set: function(val) {
                    setterFunctions['UserImage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "UserImageURL": {
                get: function() {
                    context["field"] = "UserImageURL";
                    context["metadata"] = (objectMetadata ? objectMetadata["UserImageURL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UserImageURL, context);
                },
                set: function(val) {
                    setterFunctions['UserImageURL'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CountryCode": {
                get: function() {
                    context["field"] = "CountryCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["CountryCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CountryCode, context);
                },
                set: function(val) {
                    setterFunctions['CountryCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Location_id": {
                get: function() {
                    context["field"] = "Location_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Location_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Location_id, context);
                },
                set: function(val) {
                    setterFunctions['Location_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "IsOlbAllowed": {
                get: function() {
                    context["field"] = "IsOlbAllowed";
                    context["metadata"] = (objectMetadata ? objectMetadata["IsOlbAllowed"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IsOlbAllowed, context);
                },
                set: function(val) {
                    setterFunctions['IsOlbAllowed'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "OlbEnrolmentStatus_id": {
                get: function() {
                    context["field"] = "OlbEnrolmentStatus_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["OlbEnrolmentStatus_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.OlbEnrolmentStatus_id, context);
                },
                set: function(val) {
                    setterFunctions['OlbEnrolmentStatus_id'].call(this, val, privateState);
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
            "Is_MemberEligibile": {
                get: function() {
                    context["field"] = "Is_MemberEligibile";
                    context["metadata"] = (objectMetadata ? objectMetadata["Is_MemberEligibile"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Is_MemberEligibile, context);
                },
                set: function(val) {
                    setterFunctions['Is_MemberEligibile'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MemberEligibilityData": {
                get: function() {
                    context["field"] = "MemberEligibilityData";
                    context["metadata"] = (objectMetadata ? objectMetadata["MemberEligibilityData"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MemberEligibilityData, context);
                },
                set: function(val) {
                    setterFunctions['MemberEligibilityData'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Is_BBOA": {
                get: function() {
                    context["field"] = "Is_BBOA";
                    context["metadata"] = (objectMetadata ? objectMetadata["Is_BBOA"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Is_BBOA, context);
                },
                set: function(val) {
                    setterFunctions['Is_BBOA'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MaritalStatus_id": {
                get: function() {
                    context["field"] = "MaritalStatus_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["MaritalStatus_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MaritalStatus_id, context);
                },
                set: function(val) {
                    setterFunctions['MaritalStatus_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "SpouseName": {
                get: function() {
                    context["field"] = "SpouseName";
                    context["metadata"] = (objectMetadata ? objectMetadata["SpouseName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.SpouseName, context);
                },
                set: function(val) {
                    setterFunctions['SpouseName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "NoOfDependents": {
                get: function() {
                    context["field"] = "NoOfDependents";
                    context["metadata"] = (objectMetadata ? objectMetadata["NoOfDependents"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.NoOfDependents, context);
                },
                set: function(val) {
                    setterFunctions['NoOfDependents'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "EmployementStatus_id": {
                get: function() {
                    context["field"] = "EmployementStatus_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["EmployementStatus_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.EmployementStatus_id, context);
                },
                set: function(val) {
                    setterFunctions['EmployementStatus_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CurrentLoginTime": {
                get: function() {
                    context["field"] = "CurrentLoginTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["CurrentLoginTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CurrentLoginTime, context);
                },
                set: function(val) {
                    setterFunctions['CurrentLoginTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Lastlogintime": {
                get: function() {
                    context["field"] = "Lastlogintime";
                    context["metadata"] = (objectMetadata ? objectMetadata["Lastlogintime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Lastlogintime, context);
                },
                set: function(val) {
                    setterFunctions['Lastlogintime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CreditUnionMemberSince": {
                get: function() {
                    context["field"] = "CreditUnionMemberSince";
                    context["metadata"] = (objectMetadata ? objectMetadata["CreditUnionMemberSince"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CreditUnionMemberSince, context);
                },
                set: function(val) {
                    setterFunctions['CreditUnionMemberSince'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "AtionProfile_id": {
                get: function() {
                    context["field"] = "AtionProfile_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["AtionProfile_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.AtionProfile_id, context);
                },
                set: function(val) {
                    setterFunctions['AtionProfile_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RegistrationLink": {
                get: function() {
                    context["field"] = "RegistrationLink";
                    context["metadata"] = (objectMetadata ? objectMetadata["RegistrationLink"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RegistrationLink, context);
                },
                set: function(val) {
                    setterFunctions['RegistrationLink'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RegLinkResendCount": {
                get: function() {
                    context["field"] = "RegLinkResendCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["RegLinkResendCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RegLinkResendCount, context);
                },
                set: function(val) {
                    setterFunctions['RegLinkResendCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RegLinkValidity": {
                get: function() {
                    context["field"] = "RegLinkValidity";
                    context["metadata"] = (objectMetadata ? objectMetadata["RegLinkValidity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RegLinkValidity, context);
                },
                set: function(val) {
                    setterFunctions['RegLinkValidity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "IsAssistConsented": {
                get: function() {
                    context["field"] = "IsAssistConsented";
                    context["metadata"] = (objectMetadata ? objectMetadata["IsAssistConsented"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IsAssistConsented, context);
                },
                set: function(val) {
                    setterFunctions['IsAssistConsented'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "areDepositTermsAccepted": {
                get: function() {
                    context["field"] = "areDepositTermsAccepted";
                    context["metadata"] = (objectMetadata ? objectMetadata["areDepositTermsAccepted"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.areDepositTermsAccepted, context);
                },
                set: function(val) {
                    setterFunctions['areDepositTermsAccepted'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "areAccountStatementTermsAccepted": {
                get: function() {
                    context["field"] = "areAccountStatementTermsAccepted";
                    context["metadata"] = (objectMetadata ? objectMetadata["areAccountStatementTermsAccepted"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.areAccountStatementTermsAccepted, context);
                },
                set: function(val) {
                    setterFunctions['areAccountStatementTermsAccepted'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "areUserAlertsTurnedOn": {
                get: function() {
                    context["field"] = "areUserAlertsTurnedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["areUserAlertsTurnedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.areUserAlertsTurnedOn, context);
                },
                set: function(val) {
                    setterFunctions['areUserAlertsTurnedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isBillPaySupported": {
                get: function() {
                    context["field"] = "isBillPaySupported";
                    context["metadata"] = (objectMetadata ? objectMetadata["isBillPaySupported"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isBillPaySupported, context);
                },
                set: function(val) {
                    setterFunctions['isBillPaySupported'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isBillPayActivated": {
                get: function() {
                    context["field"] = "isBillPayActivated";
                    context["metadata"] = (objectMetadata ? objectMetadata["isBillPayActivated"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isBillPayActivated, context);
                },
                set: function(val) {
                    setterFunctions['isBillPayActivated'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isP2PSupported": {
                get: function() {
                    context["field"] = "isP2PSupported";
                    context["metadata"] = (objectMetadata ? objectMetadata["isP2PSupported"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isP2PSupported, context);
                },
                set: function(val) {
                    setterFunctions['isP2PSupported'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isP2PActivated": {
                get: function() {
                    context["field"] = "isP2PActivated";
                    context["metadata"] = (objectMetadata ? objectMetadata["isP2PActivated"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isP2PActivated, context);
                },
                set: function(val) {
                    setterFunctions['isP2PActivated'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isWireTransferEligible": {
                get: function() {
                    context["field"] = "isWireTransferEligible";
                    context["metadata"] = (objectMetadata ? objectMetadata["isWireTransferEligible"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isWireTransferEligible, context);
                },
                set: function(val) {
                    setterFunctions['isWireTransferEligible'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isWireTransferActivated": {
                get: function() {
                    context["field"] = "isWireTransferActivated";
                    context["metadata"] = (objectMetadata ? objectMetadata["isWireTransferActivated"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isWireTransferActivated, context);
                },
                set: function(val) {
                    setterFunctions['isWireTransferActivated'].call(this, val, privateState);
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
            "securityKey": {
                get: function() {
                    context["field"] = "securityKey";
                    context["metadata"] = (objectMetadata ? objectMetadata["securityKey"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.securityKey, context);
                },
                set: function(val) {
                    setterFunctions['securityKey'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Phone": {
                get: function() {
                    context["field"] = "Phone";
                    context["metadata"] = (objectMetadata ? objectMetadata["Phone"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Phone, context);
                },
                set: function(val) {
                    setterFunctions['Phone'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Email": {
                get: function() {
                    context["field"] = "Email";
                    context["metadata"] = (objectMetadata ? objectMetadata["Email"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Email, context);
                },
                set: function(val) {
                    setterFunctions['Email'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Result": {
                get: function() {
                    context["field"] = "Result";
                    context["metadata"] = (objectMetadata ? objectMetadata["Result"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Result, context);
                },
                set: function(val) {
                    setterFunctions['Result'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errMessage": {
                get: function() {
                    context["field"] = "errMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["errMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errMessage, context);
                },
                set: function(val) {
                    setterFunctions['errMessage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errCode": {
                get: function() {
                    context["field"] = "errCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["errCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errCode, context);
                },
                set: function(val) {
                    setterFunctions['errCode'].call(this, val, privateState);
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
            "error": {
                get: function() {
                    context["field"] = "error";
                    context["metadata"] = (objectMetadata ? objectMetadata["error"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.error, context);
                },
                set: function(val) {
                    setterFunctions['error'].call(this, val, privateState);
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
            "MemberId": {
                get: function() {
                    context["field"] = "MemberId";
                    context["metadata"] = (objectMetadata ? objectMetadata["MemberId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MemberId, context);
                },
                set: function(val) {
                    setterFunctions['MemberId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "IDMidentifier": {
                get: function() {
                    context["field"] = "IDMidentifier";
                    context["metadata"] = (objectMetadata ? objectMetadata["IDMidentifier"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IDMidentifier, context);
                },
                set: function(val) {
                    setterFunctions['IDMidentifier'].call(this, val, privateState);
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
            "errorCode": {
                get: function() {
                    context["field"] = "errorCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorCode, context);
                },
                set: function(val) {
                    setterFunctions['errorCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lockedOn": {
                get: function() {
                    context["field"] = "lockedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["lockedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lockedOn, context);
                },
                set: function(val) {
                    setterFunctions['lockedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Subscribe": {
                get: function() {
                    context["field"] = "Subscribe";
                    context["metadata"] = (objectMetadata ? objectMetadata["Subscribe"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Subscribe, context);
                },
                set: function(val) {
                    setterFunctions['Subscribe'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Membership_id": {
                get: function() {
                    context["field"] = "Membership_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Membership_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Membership_id, context);
                },
                set: function(val) {
                    setterFunctions['Membership_id'].call(this, val, privateState);
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
            "Customer_id": {
                get: function() {
                    context["field"] = "Customer_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Customer_id, context);
                },
                set: function(val) {
                    setterFunctions['Customer_id'].call(this, val, privateState);
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
            "Role_id": {
                get: function() {
                    context["field"] = "Role_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Role_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Role_id, context);
                },
                set: function(val) {
                    setterFunctions['Role_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customeraccounts": {
                get: function() {
                    context["field"] = "customeraccounts";
                    context["metadata"] = (objectMetadata ? objectMetadata["customeraccounts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customeraccounts, context);
                },
                set: function(val) {
                    setterFunctions['customeraccounts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "DrivingLicenseNumber": {
                get: function() {
                    context["field"] = "DrivingLicenseNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["DrivingLicenseNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.DrivingLicenseNumber, context);
                },
                set: function(val) {
                    setterFunctions['DrivingLicenseNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "EAgreementRequired": {
                get: function() {
                    context["field"] = "EAgreementRequired";
                    context["metadata"] = (objectMetadata ? objectMetadata["EAgreementRequired"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.EAgreementRequired, context);
                },
                set: function(val) {
                    setterFunctions['EAgreementRequired'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "doNotSendOTP": {
                get: function() {
                    context["field"] = "doNotSendOTP";
                    context["metadata"] = (objectMetadata ? objectMetadata["doNotSendOTP"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.doNotSendOTP, context);
                },
                set: function(val) {
                    setterFunctions['doNotSendOTP'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "redirectLink": {
                get: function() {
                    context["field"] = "redirectLink";
                    context["metadata"] = (objectMetadata ? objectMetadata["redirectLink"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.redirectLink, context);
                },
                set: function(val) {
                    setterFunctions['redirectLink'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Organization_id": {
                get: function() {
                    context["field"] = "Organization_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Organization_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Organization_id, context);
                },
                set: function(val) {
                    setterFunctions['Organization_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isEAgreementRequired": {
                get: function() {
                    context["field"] = "isEAgreementRequired";
                    context["metadata"] = (objectMetadata ? objectMetadata["isEAgreementRequired"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isEAgreementRequired, context);
                },
                set: function(val) {
                    setterFunctions['isEAgreementRequired'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isEagreementSigned": {
                get: function() {
                    context["field"] = "isEagreementSigned";
                    context["metadata"] = (objectMetadata ? objectMetadata["isEagreementSigned"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isEagreementSigned, context);
                },
                set: function(val) {
                    setterFunctions['isEagreementSigned'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "opCode": {
                get: function() {
                    context["field"] = "opCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["opCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.opCode, context);
                },
                set: function(val) {
                    setterFunctions['opCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "opMessage": {
                get: function() {
                    context["field"] = "opMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["opMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.opMessage, context);
                },
                set: function(val) {
                    setterFunctions['opMessage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MessageType": {
                get: function() {
                    context["field"] = "MessageType";
                    context["metadata"] = (objectMetadata ? objectMetadata["MessageType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MessageType, context);
                },
                set: function(val) {
                    setterFunctions['MessageType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "SendToMobiles": {
                get: function() {
                    context["field"] = "SendToMobiles";
                    context["metadata"] = (objectMetadata ? objectMetadata["SendToMobiles"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.SendToMobiles, context);
                },
                set: function(val) {
                    setterFunctions['SendToMobiles'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "membershipID": {
                get: function() {
                    context["field"] = "membershipID";
                    context["metadata"] = (objectMetadata ? objectMetadata["membershipID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.membershipID, context);
                },
                set: function(val) {
                    setterFunctions['membershipID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isUserNameExists": {
                get: function() {
                    context["field"] = "isUserNameExists";
                    context["metadata"] = (objectMetadata ? objectMetadata["isUserNameExists"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isUserNameExists, context);
                },
                set: function(val) {
                    setterFunctions['isUserNameExists'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isUserExists": {
                get: function() {
                    context["field"] = "isUserExists";
                    context["metadata"] = (objectMetadata ? objectMetadata["isUserExists"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isUserExists, context);
                },
                set: function(val) {
                    setterFunctions['isUserExists'].call(this, val, privateState);
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
            "MFAAttributes": {
                get: function() {
                    context["field"] = "MFAAttributes";
                    context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MFAAttributes, context);
                },
                set: function(val) {
                    setterFunctions['MFAAttributes'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sacMaxResendRequestsAllowed": {
                get: function() {
                    context["field"] = "sacMaxResendRequestsAllowed";
                    context["metadata"] = (objectMetadata ? objectMetadata["sacMaxResendRequestsAllowed"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sacMaxResendRequestsAllowed, context);
                },
                set: function(val) {
                    setterFunctions['sacMaxResendRequestsAllowed'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "remainingResendAttempts": {
                get: function() {
                    context["field"] = "remainingResendAttempts";
                    context["metadata"] = (objectMetadata ? objectMetadata["remainingResendAttempts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.remainingResendAttempts, context);
                },
                set: function(val) {
                    setterFunctions['remainingResendAttempts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sacCodeLength": {
                get: function() {
                    context["field"] = "sacCodeLength";
                    context["metadata"] = (objectMetadata ? objectMetadata["sacCodeLength"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sacCodeLength, context);
                },
                set: function(val) {
                    setterFunctions['sacCodeLength'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maxFailedAttemptsAllowed": {
                get: function() {
                    context["field"] = "maxFailedAttemptsAllowed";
                    context["metadata"] = (objectMetadata ? objectMetadata["maxFailedAttemptsAllowed"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maxFailedAttemptsAllowed, context);
                },
                set: function(val) {
                    setterFunctions['maxFailedAttemptsAllowed'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "remainingFailedAttempts": {
                get: function() {
                    context["field"] = "remainingFailedAttempts";
                    context["metadata"] = (objectMetadata ? objectMetadata["remainingFailedAttempts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.remainingFailedAttempts, context);
                },
                set: function(val) {
                    setterFunctions['remainingFailedAttempts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "failedAttempts": {
                get: function() {
                    context["field"] = "failedAttempts";
                    context["metadata"] = (objectMetadata ? objectMetadata["failedAttempts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.failedAttempts, context);
                },
                set: function(val) {
                    setterFunctions['failedAttempts'].call(this, val, privateState);
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
            "oldPassword": {
                get: function() {
                    context["field"] = "oldPassword";
                    context["metadata"] = (objectMetadata ? objectMetadata["oldPassword"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.oldPassword, context);
                },
                set: function(val) {
                    setterFunctions['oldPassword'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "newPassword": {
                get: function() {
                    context["field"] = "newPassword";
                    context["metadata"] = (objectMetadata ? objectMetadata["newPassword"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.newPassword, context);
                },
                set: function(val) {
                    setterFunctions['newPassword'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "oldUserName": {
                get: function() {
                    context["field"] = "oldUserName";
                    context["metadata"] = (objectMetadata ? objectMetadata["oldUserName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.oldUserName, context);
                },
                set: function(val) {
                    setterFunctions['oldUserName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "newUserName": {
                get: function() {
                    context["field"] = "newUserName";
                    context["metadata"] = (objectMetadata ? objectMetadata["newUserName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.newUserName, context);
                },
                set: function(val) {
                    setterFunctions['newUserName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isOtpVerified": {
                get: function() {
                    context["field"] = "isOtpVerified";
                    context["metadata"] = (objectMetadata ? objectMetadata["isOtpVerified"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isOtpVerified, context);
                },
                set: function(val) {
                    setterFunctions['isOtpVerified'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lockUser": {
                get: function() {
                    context["field"] = "lockUser";
                    context["metadata"] = (objectMetadata ? objectMetadata["lockUser"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lockUser, context);
                },
                set: function(val) {
                    setterFunctions['lockUser'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "logoutUser": {
                get: function() {
                    context["field"] = "logoutUser";
                    context["metadata"] = (objectMetadata ? objectMetadata["logoutUser"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.logoutUser, context);
                },
                set: function(val) {
                    setterFunctions['logoutUser'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceName": {
                get: function() {
                    context["field"] = "serviceName";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceName, context);
                },
                set: function(val) {
                    setterFunctions['serviceName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lockoutTime": {
                get: function() {
                    context["field"] = "lockoutTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["lockoutTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lockoutTime, context);
                },
                set: function(val) {
                    setterFunctions['lockoutTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isOTPExpired": {
                get: function() {
                    context["field"] = "isOTPExpired";
                    context["metadata"] = (objectMetadata ? objectMetadata["isOTPExpired"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isOTPExpired, context);
                },
                set: function(val) {
                    setterFunctions['isOTPExpired'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "smsText": {
                get: function() {
                    context["field"] = "smsText";
                    context["metadata"] = (objectMetadata ? objectMetadata["smsText"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.smsText, context);
                },
                set: function(val) {
                    setterFunctions['smsText'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "emailSubject": {
                get: function() {
                    context["field"] = "emailSubject";
                    context["metadata"] = (objectMetadata ? objectMetadata["emailSubject"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.emailSubject, context);
                },
                set: function(val) {
                    setterFunctions['emailSubject'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "emailBody": {
                get: function() {
                    context["field"] = "emailBody";
                    context["metadata"] = (objectMetadata ? objectMetadata["emailBody"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.emailBody, context);
                },
                set: function(val) {
                    setterFunctions['emailBody'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RiskStatus": {
                get: function() {
                    context["field"] = "RiskStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["RiskStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RiskStatus, context);
                },
                set: function(val) {
                    setterFunctions['RiskStatus'].call(this, val, privateState);
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
            "orgId": {
                get: function() {
                    context["field"] = "orgId";
                    context["metadata"] = (objectMetadata ? objectMetadata["orgId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orgId, context);
                },
                set: function(val) {
                    setterFunctions['orgId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "identifier": {
                get: function() {
                    context["field"] = "identifier";
                    context["metadata"] = (objectMetadata ? objectMetadata["identifier"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.identifier, context);
                },
                set: function(val) {
                    setterFunctions['identifier'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Type_id": {
                get: function() {
                    context["field"] = "Type_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Type_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Type_id, context);
                },
                set: function(val) {
                    setterFunctions['Type_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "mailRequestSent": {
                get: function() {
                    context["field"] = "mailRequestSent";
                    context["metadata"] = (objectMetadata ? objectMetadata["mailRequestSent"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.mailRequestSent, context);
                },
                set: function(val) {
                    setterFunctions['mailRequestSent'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "addressInformation": {
                get: function() {
                    context["field"] = "addressInformation";
                    context["metadata"] = (objectMetadata ? objectMetadata["addressInformation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addressInformation, context);
                },
                set: function(val) {
                    setterFunctions['addressInformation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "backendIdentifierInfo": {
                get: function() {
                    context["field"] = "backendIdentifierInfo";
                    context["metadata"] = (objectMetadata ? objectMetadata["backendIdentifierInfo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.backendIdentifierInfo, context);
                },
                set: function(val) {
                    setterFunctions['backendIdentifierInfo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "personalInformation": {
                get: function() {
                    context["field"] = "personalInformation";
                    context["metadata"] = (objectMetadata ? objectMetadata["personalInformation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.personalInformation, context);
                },
                set: function(val) {
                    setterFunctions['personalInformation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isVIPCustomer": {
                get: function() {
                    context["field"] = "isVIPCustomer";
                    context["metadata"] = (objectMetadata ? objectMetadata["isVIPCustomer"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isVIPCustomer, context);
                },
                set: function(val) {
                    setterFunctions['isVIPCustomer'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "typeId": {
                get: function() {
                    context["field"] = "typeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["typeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.typeId, context);
                },
                set: function(val) {
                    setterFunctions['typeId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "actions": {
                get: function() {
                    context["field"] = "actions";
                    context["metadata"] = (objectMetadata ? objectMetadata["actions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actions, context);
                },
                set: function(val) {
                    setterFunctions['actions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Account_Name": {
                get: function() {
                    context["field"] = "Account_Name";
                    context["metadata"] = (objectMetadata ? objectMetadata["Account_Name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Account_Name, context);
                },
                set: function(val) {
                    setterFunctions['Account_Name'].call(this, val, privateState);
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
            "value1": {
                get: function() {
                    context["field"] = "value1";
                    context["metadata"] = (objectMetadata ? objectMetadata["value1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.value1, context);
                },
                set: function(val) {
                    setterFunctions['value1'].call(this, val, privateState);
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
            "features": {
                get: function() {
                    context["field"] = "features";
                    context["metadata"] = (objectMetadata ? objectMetadata["features"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.features, context);
                },
                set: function(val) {
                    setterFunctions['features'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "session_token": {
                get: function() {
                    context["field"] = "session_token";
                    context["metadata"] = (objectMetadata ? objectMetadata["session_token"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.session_token, context);
                },
                set: function(val) {
                    setterFunctions['session_token'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "EmploymentTypeId": {
                get: function() {
                    context["field"] = "EmploymentTypeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["EmploymentTypeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.EmploymentTypeId, context);
                },
                set: function(val) {
                    setterFunctions['EmploymentTypeId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "PhoneNumberId": {
                get: function() {
                    context["field"] = "PhoneNumberId";
                    context["metadata"] = (objectMetadata ? objectMetadata["PhoneNumberId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.PhoneNumberId, context);
                },
                set: function(val) {
                    setterFunctions['PhoneNumberId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ElectronicId": {
                get: function() {
                    context["field"] = "ElectronicId";
                    context["metadata"] = (objectMetadata ? objectMetadata["ElectronicId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ElectronicId, context);
                },
                set: function(val) {
                    setterFunctions['ElectronicId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "AddressId": {
                get: function() {
                    context["field"] = "AddressId";
                    context["metadata"] = (objectMetadata ? objectMetadata["AddressId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.AddressId, context);
                },
                set: function(val) {
                    setterFunctions['AddressId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "EmailIds": {
                get: function() {
                    context["field"] = "EmailIds";
                    context["metadata"] = (objectMetadata ? objectMetadata["EmailIds"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.EmailIds, context);
                },
                set: function(val) {
                    setterFunctions['EmailIds'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Addresses": {
                get: function() {
                    context["field"] = "Addresses";
                    context["metadata"] = (objectMetadata ? objectMetadata["Addresses"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Addresses, context);
                },
                set: function(val) {
                    setterFunctions['Addresses'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "preferredContactTime": {
                get: function() {
                    context["field"] = "preferredContactTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["preferredContactTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.preferredContactTime, context);
                },
                set: function(val) {
                    setterFunctions['preferredContactTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "modifiedByName": {
                get: function() {
                    context["field"] = "modifiedByName";
                    context["metadata"] = (objectMetadata ? objectMetadata["modifiedByName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.modifiedByName, context);
                },
                set: function(val) {
                    setterFunctions['modifiedByName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "preferredContactMethod": {
                get: function() {
                    context["field"] = "preferredContactMethod";
                    context["metadata"] = (objectMetadata ? objectMetadata["preferredContactMethod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.preferredContactMethod, context);
                },
                set: function(val) {
                    setterFunctions['preferredContactMethod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deleteAddressID": {
                get: function() {
                    context["field"] = "deleteAddressID";
                    context["metadata"] = (objectMetadata ? objectMetadata["deleteAddressID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deleteAddressID, context);
                },
                set: function(val) {
                    setterFunctions['deleteAddressID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "phoneNumbers": {
                get: function() {
                    context["field"] = "phoneNumbers";
                    context["metadata"] = (objectMetadata ? objectMetadata["phoneNumbers"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.phoneNumbers, context);
                },
                set: function(val) {
                    setterFunctions['phoneNumbers'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "eagreementStatus": {
                get: function() {
                    context["field"] = "eagreementStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["eagreementStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.eagreementStatus, context);
                },
                set: function(val) {
                    setterFunctions['eagreementStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "listOfRemovedRisks": {
                get: function() {
                    context["field"] = "listOfRemovedRisks";
                    context["metadata"] = (objectMetadata ? objectMetadata["listOfRemovedRisks"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.listOfRemovedRisks, context);
                },
                set: function(val) {
                    setterFunctions['listOfRemovedRisks'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "listOfAddedRisks": {
                get: function() {
                    context["field"] = "listOfAddedRisks";
                    context["metadata"] = (objectMetadata ? objectMetadata["listOfAddedRisks"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.listOfAddedRisks, context);
                },
                set: function(val) {
                    setterFunctions['listOfAddedRisks'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "coreCustomerID": {
                get: function() {
                    context["field"] = "coreCustomerID";
                    context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.coreCustomerID, context);
                },
                set: function(val) {
                    setterFunctions['coreCustomerID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyID": {
                get: function() {
                    context["field"] = "partyID";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyID, context);
                },
                set: function(val) {
                    setterFunctions['partyID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "BackEndErrorCode": {
                get: function() {
                    context["field"] = "BackEndErrorCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["BackEndErrorCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.BackEndErrorCode, context);
                },
                set: function(val) {
                    setterFunctions['BackEndErrorCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "BackEndErrorMessage": {
                get: function() {
                    context["field"] = "BackEndErrorMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["BackEndErrorMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.BackEndErrorMessage, context);
                },
                set: function(val) {
                    setterFunctions['BackEndErrorMessage'].call(this, val, privateState);
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
            "identities": {
                get: function() {
                    context["field"] = "identities";
                    context["metadata"] = (objectMetadata ? objectMetadata["identities"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.identities, context);
                },
                set: function(val) {
                    setterFunctions['identities'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "StartDate": {
                get: function() {
                    context["field"] = "StartDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["StartDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.StartDate, context);
                },
                set: function(val) {
                    setterFunctions['StartDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isCombinedUser": {
                get: function() {
                    context["field"] = "isCombinedUser";
                    context["metadata"] = (objectMetadata ? objectMetadata["isCombinedUser"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isCombinedUser, context);
                },
                set: function(val) {
                    setterFunctions['isCombinedUser'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otherUser": {
                get: function() {
                    context["field"] = "otherUser";
                    context["metadata"] = (objectMetadata ? objectMetadata["otherUser"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otherUser, context);
                },
                set: function(val) {
                    setterFunctions['otherUser'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "newUser": {
                get: function() {
                    context["field"] = "newUser";
                    context["metadata"] = (objectMetadata ? objectMetadata["newUser"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.newUser, context);
                },
                set: function(val) {
                    setterFunctions['newUser'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "addresstype": {
                get: function() {
                    context["field"] = "addresstype";
                    context["metadata"] = (objectMetadata ? objectMetadata["addresstype"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addresstype, context);
                },
                set: function(val) {
                    setterFunctions['addresstype'].call(this, val, privateState);
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
            "activationCode": {
                get: function() {
                    context["field"] = "activationCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["activationCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.activationCode, context);
                },
                set: function(val) {
                    setterFunctions['activationCode'].call(this, val, privateState);
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
            "encodedImage": {
                get: function() {
                    context["field"] = "encodedImage";
                    context["metadata"] = (objectMetadata ? objectMetadata["encodedImage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.encodedImage, context);
                },
                set: function(val) {
                    setterFunctions['encodedImage'].call(this, val, privateState);
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
            "keys": {
                get: function() {
                    context["field"] = "keys";
                    context["metadata"] = (objectMetadata ? objectMetadata["keys"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.keys, context);
                },
                set: function(val) {
                    setterFunctions['keys'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "EmployeeCount": {
                get: function() {
                    context["field"] = "EmployeeCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["EmployeeCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.EmployeeCount, context);
                },
                set: function(val) {
                    setterFunctions['EmployeeCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CountryIncorporation": {
                get: function() {
                    context["field"] = "CountryIncorporation";
                    context["metadata"] = (objectMetadata ? objectMetadata["CountryIncorporation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CountryIncorporation, context);
                },
                set: function(val) {
                    setterFunctions['CountryIncorporation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CompanyRegistrationDate": {
                get: function() {
                    context["field"] = "CompanyRegistrationDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["CompanyRegistrationDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CompanyRegistrationDate, context);
                },
                set: function(val) {
                    setterFunctions['CompanyRegistrationDate'].call(this, val, privateState);
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
            privateState.IDValue = value ? (value["IDValue"] ? value["IDValue"] : null) : null;
            privateState.IDType_id = value ? (value["IDType_id"] ? value["IDType_id"] : null) : null;
            privateState.UserName = value ? (value["UserName"] ? value["UserName"] : null) : null;
            privateState.Password = value ? (value["Password"] ? value["Password"] : null) : null;
            privateState.IsCoreIdentityScope = value ? (value["IsCoreIdentityScope"] ? value["IsCoreIdentityScope"] : null) : null;
            privateState.Salutation = value ? (value["Salutation"] ? value["Salutation"] : null) : null;
            privateState.FirstName = value ? (value["FirstName"] ? value["FirstName"] : null) : null;
            privateState.MiddleName = value ? (value["MiddleName"] ? value["MiddleName"] : null) : null;
            privateState.LastName = value ? (value["LastName"] ? value["LastName"] : null) : null;
            privateState.FullName = value ? (value["FullName"] ? value["FullName"] : null) : null;
            privateState.Gender = value ? (value["Gender"] ? value["Gender"] : null) : null;
            privateState.DateOfBirth = value ? (value["DateOfBirth"] ? value["DateOfBirth"] : null) : null;
            privateState.Ssn = value ? (value["Ssn"] ? value["Ssn"] : null) : null;
            privateState.CustomerType_id = value ? (value["CustomerType_id"] ? value["CustomerType_id"] : null) : null;
            privateState.CustomerType = value ? (value["CustomerType"] ? value["CustomerType"] : null) : null;
            privateState.Status_id = value ? (value["Status_id"] ? value["Status_id"] : null) : null;
            privateState.Status = value ? (value["Status"] ? value["Status"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.IsPhoneEnabled = value ? (value["IsPhoneEnabled"] ? value["IsPhoneEnabled"] : null) : null;
            privateState.IsEmailEnabled = value ? (value["IsEmailEnabled"] ? value["IsEmailEnabled"] : null) : null;
            privateState.IsStaffMember = value ? (value["IsStaffMember"] ? value["IsStaffMember"] : null) : null;
            privateState.isSuperAdmin = value ? (value["isSuperAdmin"] ? value["isSuperAdmin"] : null) : null;
            privateState.Role = value ? (value["Role"] ? value["Role"] : null) : null;
            privateState.SecurityImage_id = value ? (value["SecurityImage_id"] ? value["SecurityImage_id"] : null) : null;
            privateState.IsPinSet = value ? (value["IsPinSet"] ? value["IsPinSet"] : null) : null;
            privateState.Pin = value ? (value["Pin"] ? value["Pin"] : null) : null;
            privateState.Token = value ? (value["Token"] ? value["Token"] : null) : null;
            privateState.Otp = value ? (value["Otp"] ? value["Otp"] : null) : null;
            privateState.OtpGenaratedts = value ? (value["OtpGenaratedts"] ? value["OtpGenaratedts"] : null) : null;
            privateState.ValidDate = value ? (value["ValidDate"] ? value["ValidDate"] : null) : null;
            privateState.unsuccessfulLoginAttempts = value ? (value["unsuccessfulLoginAttempts"] ? value["unsuccessfulLoginAttempts"] : null) : null;
            privateState.isUserAccountLocked = value ? (value["isUserAccountLocked"] ? value["isUserAccountLocked"] : null) : null;
            privateState.UserImage = value ? (value["UserImage"] ? value["UserImage"] : null) : null;
            privateState.UserImageURL = value ? (value["UserImageURL"] ? value["UserImageURL"] : null) : null;
            privateState.CountryCode = value ? (value["CountryCode"] ? value["CountryCode"] : null) : null;
            privateState.Location_id = value ? (value["Location_id"] ? value["Location_id"] : null) : null;
            privateState.IsOlbAllowed = value ? (value["IsOlbAllowed"] ? value["IsOlbAllowed"] : null) : null;
            privateState.OlbEnrolmentStatus_id = value ? (value["OlbEnrolmentStatus_id"] ? value["OlbEnrolmentStatus_id"] : null) : null;
            privateState.isEnrolled = value ? (value["isEnrolled"] ? value["isEnrolled"] : null) : null;
            privateState.Is_MemberEligibile = value ? (value["Is_MemberEligibile"] ? value["Is_MemberEligibile"] : null) : null;
            privateState.MemberEligibilityData = value ? (value["MemberEligibilityData"] ? value["MemberEligibilityData"] : null) : null;
            privateState.Is_BBOA = value ? (value["Is_BBOA"] ? value["Is_BBOA"] : null) : null;
            privateState.MaritalStatus_id = value ? (value["MaritalStatus_id"] ? value["MaritalStatus_id"] : null) : null;
            privateState.SpouseName = value ? (value["SpouseName"] ? value["SpouseName"] : null) : null;
            privateState.NoOfDependents = value ? (value["NoOfDependents"] ? value["NoOfDependents"] : null) : null;
            privateState.EmployementStatus_id = value ? (value["EmployementStatus_id"] ? value["EmployementStatus_id"] : null) : null;
            privateState.CurrentLoginTime = value ? (value["CurrentLoginTime"] ? value["CurrentLoginTime"] : null) : null;
            privateState.Lastlogintime = value ? (value["Lastlogintime"] ? value["Lastlogintime"] : null) : null;
            privateState.CreditUnionMemberSince = value ? (value["CreditUnionMemberSince"] ? value["CreditUnionMemberSince"] : null) : null;
            privateState.AtionProfile_id = value ? (value["AtionProfile_id"] ? value["AtionProfile_id"] : null) : null;
            privateState.RegistrationLink = value ? (value["RegistrationLink"] ? value["RegistrationLink"] : null) : null;
            privateState.RegLinkResendCount = value ? (value["RegLinkResendCount"] ? value["RegLinkResendCount"] : null) : null;
            privateState.RegLinkValidity = value ? (value["RegLinkValidity"] ? value["RegLinkValidity"] : null) : null;
            privateState.IsAssistConsented = value ? (value["IsAssistConsented"] ? value["IsAssistConsented"] : null) : null;
            privateState.areDepositTermsAccepted = value ? (value["areDepositTermsAccepted"] ? value["areDepositTermsAccepted"] : null) : null;
            privateState.areAccountStatementTermsAccepted = value ? (value["areAccountStatementTermsAccepted"] ? value["areAccountStatementTermsAccepted"] : null) : null;
            privateState.areUserAlertsTurnedOn = value ? (value["areUserAlertsTurnedOn"] ? value["areUserAlertsTurnedOn"] : null) : null;
            privateState.isBillPaySupported = value ? (value["isBillPaySupported"] ? value["isBillPaySupported"] : null) : null;
            privateState.isBillPayActivated = value ? (value["isBillPayActivated"] ? value["isBillPayActivated"] : null) : null;
            privateState.isP2PSupported = value ? (value["isP2PSupported"] ? value["isP2PSupported"] : null) : null;
            privateState.isP2PActivated = value ? (value["isP2PActivated"] ? value["isP2PActivated"] : null) : null;
            privateState.isWireTransferEligible = value ? (value["isWireTransferEligible"] ? value["isWireTransferEligible"] : null) : null;
            privateState.isWireTransferActivated = value ? (value["isWireTransferActivated"] ? value["isWireTransferActivated"] : null) : null;
            privateState.createdby = value ? (value["createdby"] ? value["createdby"] : null) : null;
            privateState.modifiedby = value ? (value["modifiedby"] ? value["modifiedby"] : null) : null;
            privateState.createdts = value ? (value["createdts"] ? value["createdts"] : null) : null;
            privateState.lastmodifiedts = value ? (value["lastmodifiedts"] ? value["lastmodifiedts"] : null) : null;
            privateState.synctimestamp = value ? (value["synctimestamp"] ? value["synctimestamp"] : null) : null;
            privateState.softdeleteflag = value ? (value["softdeleteflag"] ? value["softdeleteflag"] : null) : null;
            privateState.securityKey = value ? (value["securityKey"] ? value["securityKey"] : null) : null;
            privateState.Phone = value ? (value["Phone"] ? value["Phone"] : null) : null;
            privateState.Email = value ? (value["Email"] ? value["Email"] : null) : null;
            privateState.Result = value ? (value["Result"] ? value["Result"] : null) : null;
            privateState.errMessage = value ? (value["errMessage"] ? value["errMessage"] : null) : null;
            privateState.errCode = value ? (value["errCode"] ? value["errCode"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.error = value ? (value["error"] ? value["error"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.MemberId = value ? (value["MemberId"] ? value["MemberId"] : null) : null;
            privateState.IDMidentifier = value ? (value["IDMidentifier"] ? value["IDMidentifier"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.errorCode = value ? (value["errorCode"] ? value["errorCode"] : null) : null;
            privateState.lockedOn = value ? (value["lockedOn"] ? value["lockedOn"] : null) : null;
            privateState.Subscribe = value ? (value["Subscribe"] ? value["Subscribe"] : null) : null;
            privateState.Membership_id = value ? (value["Membership_id"] ? value["Membership_id"] : null) : null;
            privateState.Taxid = value ? (value["Taxid"] ? value["Taxid"] : null) : null;
            privateState.Customer_id = value ? (value["Customer_id"] ? value["Customer_id"] : null) : null;
            privateState.accounts = value ? (value["accounts"] ? value["accounts"] : null) : null;
            privateState.services = value ? (value["services"] ? value["services"] : null) : null;
            privateState.Role_id = value ? (value["Role_id"] ? value["Role_id"] : null) : null;
            privateState.customeraccounts = value ? (value["customeraccounts"] ? value["customeraccounts"] : null) : null;
            privateState.DrivingLicenseNumber = value ? (value["DrivingLicenseNumber"] ? value["DrivingLicenseNumber"] : null) : null;
            privateState.EAgreementRequired = value ? (value["EAgreementRequired"] ? value["EAgreementRequired"] : null) : null;
            privateState.doNotSendOTP = value ? (value["doNotSendOTP"] ? value["doNotSendOTP"] : null) : null;
            privateState.redirectLink = value ? (value["redirectLink"] ? value["redirectLink"] : null) : null;
            privateState.Organization_id = value ? (value["Organization_id"] ? value["Organization_id"] : null) : null;
            privateState.isEAgreementRequired = value ? (value["isEAgreementRequired"] ? value["isEAgreementRequired"] : null) : null;
            privateState.isEagreementSigned = value ? (value["isEagreementSigned"] ? value["isEagreementSigned"] : null) : null;
            privateState.opCode = value ? (value["opCode"] ? value["opCode"] : null) : null;
            privateState.opMessage = value ? (value["opMessage"] ? value["opMessage"] : null) : null;
            privateState.MessageType = value ? (value["MessageType"] ? value["MessageType"] : null) : null;
            privateState.SendToMobiles = value ? (value["SendToMobiles"] ? value["SendToMobiles"] : null) : null;
            privateState.membershipID = value ? (value["membershipID"] ? value["membershipID"] : null) : null;
            privateState.isUserNameExists = value ? (value["isUserNameExists"] ? value["isUserNameExists"] : null) : null;
            privateState.isUserExists = value ? (value["isUserExists"] ? value["isUserExists"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.MFAAttributes = value ? (value["MFAAttributes"] ? value["MFAAttributes"] : null) : null;
            privateState.sacMaxResendRequestsAllowed = value ? (value["sacMaxResendRequestsAllowed"] ? value["sacMaxResendRequestsAllowed"] : null) : null;
            privateState.remainingResendAttempts = value ? (value["remainingResendAttempts"] ? value["remainingResendAttempts"] : null) : null;
            privateState.sacCodeLength = value ? (value["sacCodeLength"] ? value["sacCodeLength"] : null) : null;
            privateState.maxFailedAttemptsAllowed = value ? (value["maxFailedAttemptsAllowed"] ? value["maxFailedAttemptsAllowed"] : null) : null;
            privateState.remainingFailedAttempts = value ? (value["remainingFailedAttempts"] ? value["remainingFailedAttempts"] : null) : null;
            privateState.failedAttempts = value ? (value["failedAttempts"] ? value["failedAttempts"] : null) : null;
            privateState.serviceKey = value ? (value["serviceKey"] ? value["serviceKey"] : null) : null;
            privateState.oldPassword = value ? (value["oldPassword"] ? value["oldPassword"] : null) : null;
            privateState.newPassword = value ? (value["newPassword"] ? value["newPassword"] : null) : null;
            privateState.oldUserName = value ? (value["oldUserName"] ? value["oldUserName"] : null) : null;
            privateState.newUserName = value ? (value["newUserName"] ? value["newUserName"] : null) : null;
            privateState.isOtpVerified = value ? (value["isOtpVerified"] ? value["isOtpVerified"] : null) : null;
            privateState.lockUser = value ? (value["lockUser"] ? value["lockUser"] : null) : null;
            privateState.logoutUser = value ? (value["logoutUser"] ? value["logoutUser"] : null) : null;
            privateState.serviceName = value ? (value["serviceName"] ? value["serviceName"] : null) : null;
            privateState.lockoutTime = value ? (value["lockoutTime"] ? value["lockoutTime"] : null) : null;
            privateState.isOTPExpired = value ? (value["isOTPExpired"] ? value["isOTPExpired"] : null) : null;
            privateState.smsText = value ? (value["smsText"] ? value["smsText"] : null) : null;
            privateState.emailSubject = value ? (value["emailSubject"] ? value["emailSubject"] : null) : null;
            privateState.emailBody = value ? (value["emailBody"] ? value["emailBody"] : null) : null;
            privateState.RiskStatus = value ? (value["RiskStatus"] ? value["RiskStatus"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.orgId = value ? (value["orgId"] ? value["orgId"] : null) : null;
            privateState.identifier = value ? (value["identifier"] ? value["identifier"] : null) : null;
            privateState.Type_id = value ? (value["Type_id"] ? value["Type_id"] : null) : null;
            privateState.mailRequestSent = value ? (value["mailRequestSent"] ? value["mailRequestSent"] : null) : null;
            privateState.addressInformation = value ? (value["addressInformation"] ? value["addressInformation"] : null) : null;
            privateState.backendIdentifierInfo = value ? (value["backendIdentifierInfo"] ? value["backendIdentifierInfo"] : null) : null;
            privateState.personalInformation = value ? (value["personalInformation"] ? value["personalInformation"] : null) : null;
            privateState.isVIPCustomer = value ? (value["isVIPCustomer"] ? value["isVIPCustomer"] : null) : null;
            privateState.typeId = value ? (value["typeId"] ? value["typeId"] : null) : null;
            privateState.actions = value ? (value["actions"] ? value["actions"] : null) : null;
            privateState.Account_Name = value ? (value["Account_Name"] ? value["Account_Name"] : null) : null;
            privateState.limits = value ? (value["limits"] ? value["limits"] : null) : null;
            privateState.value1 = value ? (value["value1"] ? value["value1"] : null) : null;
            privateState.accountId = value ? (value["accountId"] ? value["accountId"] : null) : null;
            privateState.actionId = value ? (value["actionId"] ? value["actionId"] : null) : null;
            privateState.features = value ? (value["features"] ? value["features"] : null) : null;
            privateState.session_token = value ? (value["session_token"] ? value["session_token"] : null) : null;
            privateState.EmploymentTypeId = value ? (value["EmploymentTypeId"] ? value["EmploymentTypeId"] : null) : null;
            privateState.PhoneNumberId = value ? (value["PhoneNumberId"] ? value["PhoneNumberId"] : null) : null;
            privateState.ElectronicId = value ? (value["ElectronicId"] ? value["ElectronicId"] : null) : null;
            privateState.AddressId = value ? (value["AddressId"] ? value["AddressId"] : null) : null;
            privateState.EmailIds = value ? (value["EmailIds"] ? value["EmailIds"] : null) : null;
            privateState.Addresses = value ? (value["Addresses"] ? value["Addresses"] : null) : null;
            privateState.preferredContactTime = value ? (value["preferredContactTime"] ? value["preferredContactTime"] : null) : null;
            privateState.modifiedByName = value ? (value["modifiedByName"] ? value["modifiedByName"] : null) : null;
            privateState.preferredContactMethod = value ? (value["preferredContactMethod"] ? value["preferredContactMethod"] : null) : null;
            privateState.deleteAddressID = value ? (value["deleteAddressID"] ? value["deleteAddressID"] : null) : null;
            privateState.phoneNumbers = value ? (value["phoneNumbers"] ? value["phoneNumbers"] : null) : null;
            privateState.eagreementStatus = value ? (value["eagreementStatus"] ? value["eagreementStatus"] : null) : null;
            privateState.listOfRemovedRisks = value ? (value["listOfRemovedRisks"] ? value["listOfRemovedRisks"] : null) : null;
            privateState.listOfAddedRisks = value ? (value["listOfAddedRisks"] ? value["listOfAddedRisks"] : null) : null;
            privateState.coreCustomerID = value ? (value["coreCustomerID"] ? value["coreCustomerID"] : null) : null;
            privateState.partyID = value ? (value["partyID"] ? value["partyID"] : null) : null;
            privateState.BackEndErrorCode = value ? (value["BackEndErrorCode"] ? value["BackEndErrorCode"] : null) : null;
            privateState.BackEndErrorMessage = value ? (value["BackEndErrorMessage"] ? value["BackEndErrorMessage"] : null) : null;
            privateState.Cif = value ? (value["Cif"] ? value["Cif"] : null) : null;
            privateState.companyName = value ? (value["companyName"] ? value["companyName"] : null) : null;
            privateState.identities = value ? (value["identities"] ? value["identities"] : null) : null;
            privateState.StartDate = value ? (value["StartDate"] ? value["StartDate"] : null) : null;
            privateState.isCombinedUser = value ? (value["isCombinedUser"] ? value["isCombinedUser"] : null) : null;
            privateState.otherUser = value ? (value["otherUser"] ? value["otherUser"] : null) : null;
            privateState.newUser = value ? (value["newUser"] ? value["newUser"] : null) : null;
            privateState.addresstype = value ? (value["addresstype"] ? value["addresstype"] : null) : null;
            privateState.Description = value ? (value["Description"] ? value["Description"] : null) : null;
            privateState.activationCode = value ? (value["activationCode"] ? value["activationCode"] : null) : null;
            privateState.captchaValue = value ? (value["captchaValue"] ? value["captchaValue"] : null) : null;
            privateState.encodedImage = value ? (value["encodedImage"] ? value["encodedImage"] : null) : null;
            privateState.companyId = value ? (value["companyId"] ? value["companyId"] : null) : null;
            privateState.isNotificationRequired = value ? (value["isNotificationRequired"] ? value["isNotificationRequired"] : null) : null;
            privateState.keys = value ? (value["keys"] ? value["keys"] : null) : null;
            privateState.EmployeeCount = value ? (value["EmployeeCount"] ? value["EmployeeCount"] : null) : null;
            privateState.CountryIncorporation = value ? (value["CountryIncorporation"] ? value["CountryIncorporation"] : null) : null;
            privateState.CompanyRegistrationDate = value ? (value["CompanyRegistrationDate"] ? value["CompanyRegistrationDate"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(SMS);

    //Create new class level validator object
    BaseModel.Validator.call(SMS);

    var registerValidatorBackup = SMS.registerValidator;

    SMS.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(SMS.isValid(this, propName, val)) {
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
    //For Operation 'smsOTP' with service id 'smsOTP7625'
     SMS.smsOTP = function(params, onCompletion){
        return SMS.customVerb('smsOTP', params, onCompletion);
     };

    //For Operation 'sendKMSSMS' with service id 'sendSMS5810'
     SMS.sendKMSSMS = function(params, onCompletion){
        return SMS.customVerb('sendKMSSMS', params, onCompletion);
     };

    var relations = [];

    SMS.relations = relations;

    SMS.prototype.isValid = function() {
        return SMS.isValid(this);
    };

    SMS.prototype.objModelName = "SMS";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    SMS.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Utility", "SMS", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    SMS.clone = function(objectToClone) {
        var clonedObj = new SMS();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return SMS;
});