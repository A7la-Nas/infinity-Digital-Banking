/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ExternalUsers", "objectService" : "ExternalUserManagement"};

    var setterFunctions = {
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
        addressId: function(val, state) {
            context["field"] = "addressId";
            context["metadata"] = (objectMetadata ? objectMetadata["addressId"] : null);
            state['addressId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        addressType: function(val, state) {
            context["field"] = "addressType";
            context["metadata"] = (objectMetadata ? objectMetadata["addressType"] : null);
            state['addressType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        alertsTurnedOn: function(val, state) {
            context["field"] = "alertsTurnedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["alertsTurnedOn"] : null);
            state['alertsTurnedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        areAccountStatementTermsAccepted: function(val, state) {
            context["field"] = "areAccountStatementTermsAccepted";
            context["metadata"] = (objectMetadata ? objectMetadata["areAccountStatementTermsAccepted"] : null);
            state['areAccountStatementTermsAccepted'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        areDepositTermsAccepted: function(val, state) {
            context["field"] = "areDepositTermsAccepted";
            context["metadata"] = (objectMetadata ? objectMetadata["areDepositTermsAccepted"] : null);
            state['areDepositTermsAccepted'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardNumber: function(val, state) {
            context["field"] = "cardNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
            state['cardNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        city: function(val, state) {
            context["field"] = "city";
            context["metadata"] = (objectMetadata ? objectMetadata["city"] : null);
            state['city'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        country: function(val, state) {
            context["field"] = "country";
            context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
            state['country'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cvv: function(val, state) {
            context["field"] = "cvv";
            context["metadata"] = (objectMetadata ? objectMetadata["cvv"] : null);
            state['cvv'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateOfBirth: function(val, state) {
            context["field"] = "dateOfBirth";
            context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
            state['dateOfBirth'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        default_account_billPay: function(val, state) {
            context["field"] = "default_account_billPay";
            context["metadata"] = (objectMetadata ? objectMetadata["default_account_billPay"] : null);
            state['default_account_billPay'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        default_account_cardless: function(val, state) {
            context["field"] = "default_account_cardless";
            context["metadata"] = (objectMetadata ? objectMetadata["default_account_cardless"] : null);
            state['default_account_cardless'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        default_account_deposit: function(val, state) {
            context["field"] = "default_account_deposit";
            context["metadata"] = (objectMetadata ? objectMetadata["default_account_deposit"] : null);
            state['default_account_deposit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        default_account_payments: function(val, state) {
            context["field"] = "default_account_payments";
            context["metadata"] = (objectMetadata ? objectMetadata["default_account_payments"] : null);
            state['default_account_payments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        default_account_transfers: function(val, state) {
            context["field"] = "default_account_transfers";
            context["metadata"] = (objectMetadata ? objectMetadata["default_account_transfers"] : null);
            state['default_account_transfers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        default_from_account_p2p: function(val, state) {
            context["field"] = "default_from_account_p2p";
            context["metadata"] = (objectMetadata ? objectMetadata["default_from_account_p2p"] : null);
            state['default_from_account_p2p'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        default_to_account_p2p: function(val, state) {
            context["field"] = "default_to_account_p2p";
            context["metadata"] = (objectMetadata ? objectMetadata["default_to_account_p2p"] : null);
            state['default_to_account_p2p'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        email: function(val, state) {
            context["field"] = "email";
            context["metadata"] = (objectMetadata ? objectMetadata["email"] : null);
            state['email'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEmailEnabled: function(val, state) {
            context["field"] = "isEmailEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isEmailEnabled"] : null);
            state['isEmailEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isPhoneEnabled: function(val, state) {
            context["field"] = "isPhoneEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isPhoneEnabled"] : null);
            state['isPhoneEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isPinSet: function(val, state) {
            context["field"] = "isPinSet";
            context["metadata"] = (objectMetadata ? objectMetadata["isPinSet"] : null);
            state['isPinSet'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isPreferredAddress: function(val, state) {
            context["field"] = "isPreferredAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["isPreferredAddress"] : null);
            state['isPreferredAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastlogintime: function(val, state) {
            context["field"] = "lastlogintime";
            context["metadata"] = (objectMetadata ? objectMetadata["lastlogintime"] : null);
            state['lastlogintime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        oldpassword: function(val, state) {
            context["field"] = "oldpassword";
            context["metadata"] = (objectMetadata ? objectMetadata["oldpassword"] : null);
            state['oldpassword'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otp: function(val, state) {
            context["field"] = "otp";
            context["metadata"] = (objectMetadata ? objectMetadata["otp"] : null);
            state['otp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        password: function(val, state) {
            context["field"] = "password";
            context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
            state['password'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phone: function(val, state) {
            context["field"] = "phone";
            context["metadata"] = (objectMetadata ? objectMetadata["phone"] : null);
            state['phone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pin: function(val, state) {
            context["field"] = "pin";
            context["metadata"] = (objectMetadata ? objectMetadata["pin"] : null);
            state['pin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        result: function(val, state) {
            context["field"] = "result";
            context["metadata"] = (objectMetadata ? objectMetadata["result"] : null);
            state['result'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        role: function(val, state) {
            context["field"] = "role";
            context["metadata"] = (objectMetadata ? objectMetadata["role"] : null);
            state['role'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        secondaryemail: function(val, state) {
            context["field"] = "secondaryemail";
            context["metadata"] = (objectMetadata ? objectMetadata["secondaryemail"] : null);
            state['secondaryemail'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        secondaryemail2: function(val, state) {
            context["field"] = "secondaryemail2";
            context["metadata"] = (objectMetadata ? objectMetadata["secondaryemail2"] : null);
            state['secondaryemail2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        secondaryphone: function(val, state) {
            context["field"] = "secondaryphone";
            context["metadata"] = (objectMetadata ? objectMetadata["secondaryphone"] : null);
            state['secondaryphone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        secondaryphone2: function(val, state) {
            context["field"] = "secondaryphone2";
            context["metadata"] = (objectMetadata ? objectMetadata["secondaryphone2"] : null);
            state['secondaryphone2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ssn: function(val, state) {
            context["field"] = "ssn";
            context["metadata"] = (objectMetadata ? objectMetadata["ssn"] : null);
            state['ssn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        state: function(val, state) {
            context["field"] = "state";
            context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
            state['state'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userfirstname: function(val, state) {
            context["field"] = "userfirstname";
            context["metadata"] = (objectMetadata ? objectMetadata["userfirstname"] : null);
            state['userfirstname'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userImage: function(val, state) {
            context["field"] = "userImage";
            context["metadata"] = (objectMetadata ? objectMetadata["userImage"] : null);
            state['userImage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        LastName: function(val, state) {
            context["field"] = "LastName";
            context["metadata"] = (objectMetadata ? objectMetadata["LastName"] : null);
            state['LastName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        zipcode: function(val, state) {
            context["field"] = "zipcode";
            context["metadata"] = (objectMetadata ? objectMetadata["zipcode"] : null);
            state['zipcode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rating: function(val, state) {
            context["field"] = "rating";
            context["metadata"] = (objectMetadata ? objectMetadata["rating"] : null);
            state['rating'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureRequest: function(val, state) {
            context["field"] = "featureRequest";
            context["metadata"] = (objectMetadata ? objectMetadata["featureRequest"] : null);
            state['featureRequest'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        default_account_wire: function(val, state) {
            context["field"] = "default_account_wire";
            context["metadata"] = (objectMetadata ? objectMetadata["default_account_wire"] : null);
            state['default_account_wire'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isWireTransferActivated: function(val, state) {
            context["field"] = "isWireTransferActivated";
            context["metadata"] = (objectMetadata ? objectMetadata["isWireTransferActivated"] : null);
            state['isWireTransferActivated'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isWireTransferEligible: function(val, state) {
            context["field"] = "isWireTransferEligible";
            context["metadata"] = (objectMetadata ? objectMetadata["isWireTransferEligible"] : null);
            state['isWireTransferEligible'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userImageURL: function(val, state) {
            context["field"] = "userImageURL";
            context["metadata"] = (objectMetadata ? objectMetadata["userImageURL"] : null);
            state['userImageURL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modifiedByName: function(val, state) {
            context["field"] = "modifiedByName";
            context["metadata"] = (objectMetadata ? objectMetadata["modifiedByName"] : null);
            state['modifiedByName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Addresses: function(val, state) {
            context["field"] = "Addresses";
            context["metadata"] = (objectMetadata ? objectMetadata["Addresses"] : null);
            state['Addresses'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phoneNumbers: function(val, state) {
            context["field"] = "phoneNumbers";
            context["metadata"] = (objectMetadata ? objectMetadata["phoneNumbers"] : null);
            state['phoneNumbers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        preferredContactMethod: function(val, state) {
            context["field"] = "preferredContactMethod";
            context["metadata"] = (objectMetadata ? objectMetadata["preferredContactMethod"] : null);
            state['preferredContactMethod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        preferredContactTime: function(val, state) {
            context["field"] = "preferredContactTime";
            context["metadata"] = (objectMetadata ? objectMetadata["preferredContactTime"] : null);
            state['preferredContactTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deleteAddressID: function(val, state) {
            context["field"] = "deleteAddressID";
            context["metadata"] = (objectMetadata ? objectMetadata["deleteAddressID"] : null);
            state['deleteAddressID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deleteCommunicationID: function(val, state) {
            context["field"] = "deleteCommunicationID";
            context["metadata"] = (objectMetadata ? objectMetadata["deleteCommunicationID"] : null);
            state['deleteCommunicationID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maritalStatus: function(val, state) {
            context["field"] = "maritalStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["maritalStatus"] : null);
            state['maritalStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        noOfDependents: function(val, state) {
            context["field"] = "noOfDependents";
            context["metadata"] = (objectMetadata ? objectMetadata["noOfDependents"] : null);
            state['noOfDependents'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        spouseFirstName: function(val, state) {
            context["field"] = "spouseFirstName";
            context["metadata"] = (objectMetadata ? objectMetadata["spouseFirstName"] : null);
            state['spouseFirstName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        spouseLastName: function(val, state) {
            context["field"] = "spouseLastName";
            context["metadata"] = (objectMetadata ? objectMetadata["spouseLastName"] : null);
            state['spouseLastName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        gender: function(val, state) {
            context["field"] = "gender";
            context["metadata"] = (objectMetadata ? objectMetadata["gender"] : null);
            state['gender'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        showBillPayFromAccPopup: function(val, state) {
            context["field"] = "showBillPayFromAccPopup";
            context["metadata"] = (objectMetadata ? objectMetadata["showBillPayFromAccPopup"] : null);
            state['showBillPayFromAccPopup'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isP2PActivated: function(val, state) {
            context["field"] = "isP2PActivated";
            context["metadata"] = (objectMetadata ? objectMetadata["isP2PActivated"] : null);
            state['isP2PActivated'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isP2PSupported: function(val, state) {
            context["field"] = "isP2PSupported";
            context["metadata"] = (objectMetadata ? objectMetadata["isP2PSupported"] : null);
            state['isP2PSupported'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        securityKey: function(val, state) {
            context["field"] = "securityKey";
            context["metadata"] = (objectMetadata ? objectMetadata["securityKey"] : null);
            state['securityKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phoneExtension: function(val, state) {
            context["field"] = "phoneExtension";
            context["metadata"] = (objectMetadata ? objectMetadata["phoneExtension"] : null);
            state['phoneExtension'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phoneCountryCode: function(val, state) {
            context["field"] = "phoneCountryCode";
            context["metadata"] = (objectMetadata ? objectMetadata["phoneCountryCode"] : null);
            state['phoneCountryCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        idmConfig: function(val, state) {
            context["field"] = "idmConfig";
            context["metadata"] = (objectMetadata ? objectMetadata["idmConfig"] : null);
            state['idmConfig'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errCode: function(val, state) {
            context["field"] = "errCode";
            context["metadata"] = (objectMetadata ? objectMetadata["errCode"] : null);
            state['errCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        Id: function(val, state) {
            context["field"] = "Id";
            context["metadata"] = (objectMetadata ? objectMetadata["Id"] : null);
            state['Id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RiskStatus: function(val, state) {
            context["field"] = "RiskStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["RiskStatus"] : null);
            state['RiskStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEagreementSigned: function(val, state) {
            context["field"] = "isEagreementSigned";
            context["metadata"] = (objectMetadata ? objectMetadata["isEagreementSigned"] : null);
            state['isEagreementSigned'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEngageProvisioned: function(val, state) {
            context["field"] = "isEngageProvisioned";
            context["metadata"] = (objectMetadata ? objectMetadata["isEngageProvisioned"] : null);
            state['isEngageProvisioned'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isUserEnrolled: function(val, state) {
            context["field"] = "isUserEnrolled";
            context["metadata"] = (objectMetadata ? objectMetadata["isUserEnrolled"] : null);
            state['isUserEnrolled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceKey: function(val, state) {
            context["field"] = "serviceKey";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
            state['serviceKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isUserExists: function(val, state) {
            context["field"] = "isUserExists";
            context["metadata"] = (objectMetadata ? objectMetadata["isUserExists"] : null);
            state['isUserExists'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        communication: function(val, state) {
            context["field"] = "communication";
            context["metadata"] = (objectMetadata ? objectMetadata["communication"] : null);
            state['communication'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coreCommunication: function(val, state) {
            context["field"] = "coreCommunication";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCommunication"] : null);
            state['coreCommunication'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        feedbackUserId: function(val, state) {
            context["field"] = "feedbackUserId";
            context["metadata"] = (objectMetadata ? objectMetadata["feedbackUserId"] : null);
            state['feedbackUserId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userlastname: function(val, state) {
            context["field"] = "userlastname";
            context["metadata"] = (objectMetadata ? objectMetadata["userlastname"] : null);
            state['userlastname'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isVIPCustomer: function(val, state) {
            context["field"] = "isVIPCustomer";
            context["metadata"] = (objectMetadata ? objectMetadata["isVIPCustomer"] : null);
            state['isVIPCustomer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isSecurityQuestionConfigured: function(val, state) {
            context["field"] = "isSecurityQuestionConfigured";
            context["metadata"] = (objectMetadata ? objectMetadata["isSecurityQuestionConfigured"] : null);
            state['isSecurityQuestionConfigured'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ContactNumbers: function(val, state) {
            context["field"] = "ContactNumbers";
            context["metadata"] = (objectMetadata ? objectMetadata["ContactNumbers"] : null);
            state['ContactNumbers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EmailIds: function(val, state) {
            context["field"] = "EmailIds";
            context["metadata"] = (objectMetadata ? objectMetadata["EmailIds"] : null);
            state['EmailIds'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isTypeBusiness: function(val, state) {
            context["field"] = "isTypeBusiness";
            context["metadata"] = (objectMetadata ? objectMetadata["isTypeBusiness"] : null);
            state['isTypeBusiness'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyID: function(val, state) {
            context["field"] = "partyID";
            context["metadata"] = (objectMetadata ? objectMetadata["partyID"] : null);
            state['partyID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coreCustomerID: function(val, state) {
            context["field"] = "coreCustomerID";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerID"] : null);
            state['coreCustomerID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isCombinedUser: function(val, state) {
            context["field"] = "isCombinedUser";
            context["metadata"] = (objectMetadata ? objectMetadata["isCombinedUser"] : null);
            state['isCombinedUser'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        identities: function(val, state) {
            context["field"] = "identities";
            context["metadata"] = (objectMetadata ? objectMetadata["identities"] : null);
            state['identities'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FirstName: function(val, state) {
            context["field"] = "FirstName";
            context["metadata"] = (objectMetadata ? objectMetadata["FirstName"] : null);
            state['FirstName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TaxId: function(val, state) {
            context["field"] = "TaxId";
            context["metadata"] = (objectMetadata ? objectMetadata["TaxId"] : null);
            state['TaxId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        startDate: function(val, state) {
            context["field"] = "startDate";
            context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
            state['startDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        referenceID: function(val, state) {
            context["field"] = "referenceID";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceID"] : null);
            state['referenceID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Customer_id: function(val, state) {
            context["field"] = "Customer_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
            state['Customer_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isAlertsRequired: function(val, state) {
            context["field"] = "isAlertsRequired";
            context["metadata"] = (objectMetadata ? objectMetadata["isAlertsRequired"] : null);
            state['isAlertsRequired'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CoreCustomers: function(val, state) {
            context["field"] = "CoreCustomers";
            context["metadata"] = (objectMetadata ? objectMetadata["CoreCustomers"] : null);
            state['CoreCustomers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coreCustomerName: function(val, state) {
            context["field"] = "coreCustomerName";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerName"] : null);
            state['coreCustomerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isBusiness: function(val, state) {
            context["field"] = "isBusiness";
            context["metadata"] = (objectMetadata ? objectMetadata["isBusiness"] : null);
            state['isBusiness'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isPrimary: function(val, state) {
            context["field"] = "isPrimary";
            context["metadata"] = (objectMetadata ? objectMetadata["isPrimary"] : null);
            state['isPrimary'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contractId: function(val, state) {
            context["field"] = "contractId";
            context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
            state['contractId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        communicationType: function(val, state) {
            context["field"] = "communicationType";
            context["metadata"] = (objectMetadata ? objectMetadata["communicationType"] : null);
            state['communicationType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ExternalUsers(defaultValues) {
        var privateState = {};
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

        context["field"] = "addressId";
        context["metadata"] = (objectMetadata ? objectMetadata["addressId"] : null);
        privateState.addressId = defaultValues ?
            (defaultValues["addressId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addressId"], context) :
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

        context["field"] = "addressType";
        context["metadata"] = (objectMetadata ? objectMetadata["addressType"] : null);
        privateState.addressType = defaultValues ?
            (defaultValues["addressType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addressType"], context) :
                null) :
            null;

        context["field"] = "alertsTurnedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["alertsTurnedOn"] : null);
        privateState.alertsTurnedOn = defaultValues ?
            (defaultValues["alertsTurnedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["alertsTurnedOn"], context) :
                null) :
            null;

        context["field"] = "areAccountStatementTermsAccepted";
        context["metadata"] = (objectMetadata ? objectMetadata["areAccountStatementTermsAccepted"] : null);
        privateState.areAccountStatementTermsAccepted = defaultValues ?
            (defaultValues["areAccountStatementTermsAccepted"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["areAccountStatementTermsAccepted"], context) :
                null) :
            null;

        context["field"] = "areDepositTermsAccepted";
        context["metadata"] = (objectMetadata ? objectMetadata["areDepositTermsAccepted"] : null);
        privateState.areDepositTermsAccepted = defaultValues ?
            (defaultValues["areDepositTermsAccepted"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["areDepositTermsAccepted"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "cardNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
        privateState.cardNumber = defaultValues ?
            (defaultValues["cardNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardNumber"], context) :
                null) :
            null;

        context["field"] = "city";
        context["metadata"] = (objectMetadata ? objectMetadata["city"] : null);
        privateState.city = defaultValues ?
            (defaultValues["city"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["city"], context) :
                null) :
            null;

        context["field"] = "country";
        context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
        privateState.country = defaultValues ?
            (defaultValues["country"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["country"], context) :
                null) :
            null;

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "cvv";
        context["metadata"] = (objectMetadata ? objectMetadata["cvv"] : null);
        privateState.cvv = defaultValues ?
            (defaultValues["cvv"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cvv"], context) :
                null) :
            null;

        context["field"] = "dateOfBirth";
        context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
        privateState.dateOfBirth = defaultValues ?
            (defaultValues["dateOfBirth"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateOfBirth"], context) :
                null) :
            null;

        context["field"] = "default_account_billPay";
        context["metadata"] = (objectMetadata ? objectMetadata["default_account_billPay"] : null);
        privateState.default_account_billPay = defaultValues ?
            (defaultValues["default_account_billPay"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["default_account_billPay"], context) :
                null) :
            null;

        context["field"] = "default_account_cardless";
        context["metadata"] = (objectMetadata ? objectMetadata["default_account_cardless"] : null);
        privateState.default_account_cardless = defaultValues ?
            (defaultValues["default_account_cardless"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["default_account_cardless"], context) :
                null) :
            null;

        context["field"] = "default_account_deposit";
        context["metadata"] = (objectMetadata ? objectMetadata["default_account_deposit"] : null);
        privateState.default_account_deposit = defaultValues ?
            (defaultValues["default_account_deposit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["default_account_deposit"], context) :
                null) :
            null;

        context["field"] = "default_account_payments";
        context["metadata"] = (objectMetadata ? objectMetadata["default_account_payments"] : null);
        privateState.default_account_payments = defaultValues ?
            (defaultValues["default_account_payments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["default_account_payments"], context) :
                null) :
            null;

        context["field"] = "default_account_transfers";
        context["metadata"] = (objectMetadata ? objectMetadata["default_account_transfers"] : null);
        privateState.default_account_transfers = defaultValues ?
            (defaultValues["default_account_transfers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["default_account_transfers"], context) :
                null) :
            null;

        context["field"] = "default_from_account_p2p";
        context["metadata"] = (objectMetadata ? objectMetadata["default_from_account_p2p"] : null);
        privateState.default_from_account_p2p = defaultValues ?
            (defaultValues["default_from_account_p2p"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["default_from_account_p2p"], context) :
                null) :
            null;

        context["field"] = "default_to_account_p2p";
        context["metadata"] = (objectMetadata ? objectMetadata["default_to_account_p2p"] : null);
        privateState.default_to_account_p2p = defaultValues ?
            (defaultValues["default_to_account_p2p"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["default_to_account_p2p"], context) :
                null) :
            null;

        context["field"] = "email";
        context["metadata"] = (objectMetadata ? objectMetadata["email"] : null);
        privateState.email = defaultValues ?
            (defaultValues["email"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["email"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "isEmailEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isEmailEnabled"] : null);
        privateState.isEmailEnabled = defaultValues ?
            (defaultValues["isEmailEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEmailEnabled"], context) :
                null) :
            null;

        context["field"] = "isPhoneEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isPhoneEnabled"] : null);
        privateState.isPhoneEnabled = defaultValues ?
            (defaultValues["isPhoneEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isPhoneEnabled"], context) :
                null) :
            null;

        context["field"] = "isPinSet";
        context["metadata"] = (objectMetadata ? objectMetadata["isPinSet"] : null);
        privateState.isPinSet = defaultValues ?
            (defaultValues["isPinSet"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isPinSet"], context) :
                null) :
            null;

        context["field"] = "isPreferredAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["isPreferredAddress"] : null);
        privateState.isPreferredAddress = defaultValues ?
            (defaultValues["isPreferredAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isPreferredAddress"], context) :
                null) :
            null;

        context["field"] = "lastlogintime";
        context["metadata"] = (objectMetadata ? objectMetadata["lastlogintime"] : null);
        privateState.lastlogintime = defaultValues ?
            (defaultValues["lastlogintime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastlogintime"], context) :
                null) :
            null;

        context["field"] = "oldpassword";
        context["metadata"] = (objectMetadata ? objectMetadata["oldpassword"] : null);
        privateState.oldpassword = defaultValues ?
            (defaultValues["oldpassword"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["oldpassword"], context) :
                null) :
            null;

        context["field"] = "otp";
        context["metadata"] = (objectMetadata ? objectMetadata["otp"] : null);
        privateState.otp = defaultValues ?
            (defaultValues["otp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otp"], context) :
                null) :
            null;

        context["field"] = "password";
        context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
        privateState.password = defaultValues ?
            (defaultValues["password"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["password"], context) :
                null) :
            null;

        context["field"] = "phone";
        context["metadata"] = (objectMetadata ? objectMetadata["phone"] : null);
        privateState.phone = defaultValues ?
            (defaultValues["phone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phone"], context) :
                null) :
            null;

        context["field"] = "pin";
        context["metadata"] = (objectMetadata ? objectMetadata["pin"] : null);
        privateState.pin = defaultValues ?
            (defaultValues["pin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pin"], context) :
                null) :
            null;

        context["field"] = "result";
        context["metadata"] = (objectMetadata ? objectMetadata["result"] : null);
        privateState.result = defaultValues ?
            (defaultValues["result"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["result"], context) :
                null) :
            null;

        context["field"] = "role";
        context["metadata"] = (objectMetadata ? objectMetadata["role"] : null);
        privateState.role = defaultValues ?
            (defaultValues["role"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["role"], context) :
                null) :
            null;

        context["field"] = "secondaryemail";
        context["metadata"] = (objectMetadata ? objectMetadata["secondaryemail"] : null);
        privateState.secondaryemail = defaultValues ?
            (defaultValues["secondaryemail"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["secondaryemail"], context) :
                null) :
            null;

        context["field"] = "secondaryemail2";
        context["metadata"] = (objectMetadata ? objectMetadata["secondaryemail2"] : null);
        privateState.secondaryemail2 = defaultValues ?
            (defaultValues["secondaryemail2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["secondaryemail2"], context) :
                null) :
            null;

        context["field"] = "secondaryphone";
        context["metadata"] = (objectMetadata ? objectMetadata["secondaryphone"] : null);
        privateState.secondaryphone = defaultValues ?
            (defaultValues["secondaryphone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["secondaryphone"], context) :
                null) :
            null;

        context["field"] = "secondaryphone2";
        context["metadata"] = (objectMetadata ? objectMetadata["secondaryphone2"] : null);
        privateState.secondaryphone2 = defaultValues ?
            (defaultValues["secondaryphone2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["secondaryphone2"], context) :
                null) :
            null;

        context["field"] = "ssn";
        context["metadata"] = (objectMetadata ? objectMetadata["ssn"] : null);
        privateState.ssn = defaultValues ?
            (defaultValues["ssn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ssn"], context) :
                null) :
            null;

        context["field"] = "state";
        context["metadata"] = (objectMetadata ? objectMetadata["state"] : null);
        privateState.state = defaultValues ?
            (defaultValues["state"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["state"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
                null) :
            null;

        context["field"] = "userfirstname";
        context["metadata"] = (objectMetadata ? objectMetadata["userfirstname"] : null);
        privateState.userfirstname = defaultValues ?
            (defaultValues["userfirstname"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userfirstname"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "userImage";
        context["metadata"] = (objectMetadata ? objectMetadata["userImage"] : null);
        privateState.userImage = defaultValues ?
            (defaultValues["userImage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userImage"], context) :
                null) :
            null;

        context["field"] = "LastName";
        context["metadata"] = (objectMetadata ? objectMetadata["LastName"] : null);
        privateState.LastName = defaultValues ?
            (defaultValues["LastName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["LastName"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "zipcode";
        context["metadata"] = (objectMetadata ? objectMetadata["zipcode"] : null);
        privateState.zipcode = defaultValues ?
            (defaultValues["zipcode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["zipcode"], context) :
                null) :
            null;

        context["field"] = "rating";
        context["metadata"] = (objectMetadata ? objectMetadata["rating"] : null);
        privateState.rating = defaultValues ?
            (defaultValues["rating"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rating"], context) :
                null) :
            null;

        context["field"] = "featureRequest";
        context["metadata"] = (objectMetadata ? objectMetadata["featureRequest"] : null);
        privateState.featureRequest = defaultValues ?
            (defaultValues["featureRequest"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureRequest"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "default_account_wire";
        context["metadata"] = (objectMetadata ? objectMetadata["default_account_wire"] : null);
        privateState.default_account_wire = defaultValues ?
            (defaultValues["default_account_wire"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["default_account_wire"], context) :
                null) :
            null;

        context["field"] = "isWireTransferActivated";
        context["metadata"] = (objectMetadata ? objectMetadata["isWireTransferActivated"] : null);
        privateState.isWireTransferActivated = defaultValues ?
            (defaultValues["isWireTransferActivated"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isWireTransferActivated"], context) :
                null) :
            null;

        context["field"] = "isWireTransferEligible";
        context["metadata"] = (objectMetadata ? objectMetadata["isWireTransferEligible"] : null);
        privateState.isWireTransferEligible = defaultValues ?
            (defaultValues["isWireTransferEligible"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isWireTransferEligible"], context) :
                null) :
            null;

        context["field"] = "userImageURL";
        context["metadata"] = (objectMetadata ? objectMetadata["userImageURL"] : null);
        privateState.userImageURL = defaultValues ?
            (defaultValues["userImageURL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userImageURL"], context) :
                null) :
            null;

        context["field"] = "modifiedByName";
        context["metadata"] = (objectMetadata ? objectMetadata["modifiedByName"] : null);
        privateState.modifiedByName = defaultValues ?
            (defaultValues["modifiedByName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedByName"], context) :
                null) :
            null;

        context["field"] = "Addresses";
        context["metadata"] = (objectMetadata ? objectMetadata["Addresses"] : null);
        privateState.Addresses = defaultValues ?
            (defaultValues["Addresses"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Addresses"], context) :
                null) :
            null;

        context["field"] = "phoneNumbers";
        context["metadata"] = (objectMetadata ? objectMetadata["phoneNumbers"] : null);
        privateState.phoneNumbers = defaultValues ?
            (defaultValues["phoneNumbers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phoneNumbers"], context) :
                null) :
            null;

        context["field"] = "preferredContactMethod";
        context["metadata"] = (objectMetadata ? objectMetadata["preferredContactMethod"] : null);
        privateState.preferredContactMethod = defaultValues ?
            (defaultValues["preferredContactMethod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["preferredContactMethod"], context) :
                null) :
            null;

        context["field"] = "preferredContactTime";
        context["metadata"] = (objectMetadata ? objectMetadata["preferredContactTime"] : null);
        privateState.preferredContactTime = defaultValues ?
            (defaultValues["preferredContactTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["preferredContactTime"], context) :
                null) :
            null;

        context["field"] = "deleteAddressID";
        context["metadata"] = (objectMetadata ? objectMetadata["deleteAddressID"] : null);
        privateState.deleteAddressID = defaultValues ?
            (defaultValues["deleteAddressID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deleteAddressID"], context) :
                null) :
            null;

        context["field"] = "deleteCommunicationID";
        context["metadata"] = (objectMetadata ? objectMetadata["deleteCommunicationID"] : null);
        privateState.deleteCommunicationID = defaultValues ?
            (defaultValues["deleteCommunicationID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deleteCommunicationID"], context) :
                null) :
            null;

        context["field"] = "maritalStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["maritalStatus"] : null);
        privateState.maritalStatus = defaultValues ?
            (defaultValues["maritalStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maritalStatus"], context) :
                null) :
            null;

        context["field"] = "noOfDependents";
        context["metadata"] = (objectMetadata ? objectMetadata["noOfDependents"] : null);
        privateState.noOfDependents = defaultValues ?
            (defaultValues["noOfDependents"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["noOfDependents"], context) :
                null) :
            null;

        context["field"] = "spouseFirstName";
        context["metadata"] = (objectMetadata ? objectMetadata["spouseFirstName"] : null);
        privateState.spouseFirstName = defaultValues ?
            (defaultValues["spouseFirstName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["spouseFirstName"], context) :
                null) :
            null;

        context["field"] = "spouseLastName";
        context["metadata"] = (objectMetadata ? objectMetadata["spouseLastName"] : null);
        privateState.spouseLastName = defaultValues ?
            (defaultValues["spouseLastName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["spouseLastName"], context) :
                null) :
            null;

        context["field"] = "gender";
        context["metadata"] = (objectMetadata ? objectMetadata["gender"] : null);
        privateState.gender = defaultValues ?
            (defaultValues["gender"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["gender"], context) :
                null) :
            null;

        context["field"] = "showBillPayFromAccPopup";
        context["metadata"] = (objectMetadata ? objectMetadata["showBillPayFromAccPopup"] : null);
        privateState.showBillPayFromAccPopup = defaultValues ?
            (defaultValues["showBillPayFromAccPopup"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["showBillPayFromAccPopup"], context) :
                null) :
            null;

        context["field"] = "isP2PActivated";
        context["metadata"] = (objectMetadata ? objectMetadata["isP2PActivated"] : null);
        privateState.isP2PActivated = defaultValues ?
            (defaultValues["isP2PActivated"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isP2PActivated"], context) :
                null) :
            null;

        context["field"] = "isP2PSupported";
        context["metadata"] = (objectMetadata ? objectMetadata["isP2PSupported"] : null);
        privateState.isP2PSupported = defaultValues ?
            (defaultValues["isP2PSupported"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isP2PSupported"], context) :
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

        context["field"] = "securityKey";
        context["metadata"] = (objectMetadata ? objectMetadata["securityKey"] : null);
        privateState.securityKey = defaultValues ?
            (defaultValues["securityKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["securityKey"], context) :
                null) :
            null;

        context["field"] = "phoneExtension";
        context["metadata"] = (objectMetadata ? objectMetadata["phoneExtension"] : null);
        privateState.phoneExtension = defaultValues ?
            (defaultValues["phoneExtension"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phoneExtension"], context) :
                null) :
            null;

        context["field"] = "phoneCountryCode";
        context["metadata"] = (objectMetadata ? objectMetadata["phoneCountryCode"] : null);
        privateState.phoneCountryCode = defaultValues ?
            (defaultValues["phoneCountryCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phoneCountryCode"], context) :
                null) :
            null;

        context["field"] = "idmConfig";
        context["metadata"] = (objectMetadata ? objectMetadata["idmConfig"] : null);
        privateState.idmConfig = defaultValues ?
            (defaultValues["idmConfig"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["idmConfig"], context) :
                null) :
            null;

        context["field"] = "errCode";
        context["metadata"] = (objectMetadata ? objectMetadata["errCode"] : null);
        privateState.errCode = defaultValues ?
            (defaultValues["errCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errCode"], context) :
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

        context["field"] = "Id";
        context["metadata"] = (objectMetadata ? objectMetadata["Id"] : null);
        privateState.Id = defaultValues ?
            (defaultValues["Id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Id"], context) :
                null) :
            null;

        context["field"] = "RiskStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["RiskStatus"] : null);
        privateState.RiskStatus = defaultValues ?
            (defaultValues["RiskStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RiskStatus"], context) :
                null) :
            null;

        context["field"] = "isEagreementSigned";
        context["metadata"] = (objectMetadata ? objectMetadata["isEagreementSigned"] : null);
        privateState.isEagreementSigned = defaultValues ?
            (defaultValues["isEagreementSigned"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEagreementSigned"], context) :
                null) :
            null;

        context["field"] = "isEngageProvisioned";
        context["metadata"] = (objectMetadata ? objectMetadata["isEngageProvisioned"] : null);
        privateState.isEngageProvisioned = defaultValues ?
            (defaultValues["isEngageProvisioned"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEngageProvisioned"], context) :
                null) :
            null;

        context["field"] = "isUserEnrolled";
        context["metadata"] = (objectMetadata ? objectMetadata["isUserEnrolled"] : null);
        privateState.isUserEnrolled = defaultValues ?
            (defaultValues["isUserEnrolled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isUserEnrolled"], context) :
                null) :
            null;

        context["field"] = "serviceKey";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
        privateState.serviceKey = defaultValues ?
            (defaultValues["serviceKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceKey"], context) :
                null) :
            null;

        context["field"] = "isUserExists";
        context["metadata"] = (objectMetadata ? objectMetadata["isUserExists"] : null);
        privateState.isUserExists = defaultValues ?
            (defaultValues["isUserExists"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isUserExists"], context) :
                null) :
            null;

        context["field"] = "communication";
        context["metadata"] = (objectMetadata ? objectMetadata["communication"] : null);
        privateState.communication = defaultValues ?
            (defaultValues["communication"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["communication"], context) :
                null) :
            null;

        context["field"] = "coreCommunication";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCommunication"] : null);
        privateState.coreCommunication = defaultValues ?
            (defaultValues["coreCommunication"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCommunication"], context) :
                null) :
            null;

        context["field"] = "feedbackUserId";
        context["metadata"] = (objectMetadata ? objectMetadata["feedbackUserId"] : null);
        privateState.feedbackUserId = defaultValues ?
            (defaultValues["feedbackUserId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["feedbackUserId"], context) :
                null) :
            null;

        context["field"] = "userlastname";
        context["metadata"] = (objectMetadata ? objectMetadata["userlastname"] : null);
        privateState.userlastname = defaultValues ?
            (defaultValues["userlastname"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userlastname"], context) :
                null) :
            null;

        context["field"] = "isVIPCustomer";
        context["metadata"] = (objectMetadata ? objectMetadata["isVIPCustomer"] : null);
        privateState.isVIPCustomer = defaultValues ?
            (defaultValues["isVIPCustomer"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isVIPCustomer"], context) :
                null) :
            null;

        context["field"] = "isSecurityQuestionConfigured";
        context["metadata"] = (objectMetadata ? objectMetadata["isSecurityQuestionConfigured"] : null);
        privateState.isSecurityQuestionConfigured = defaultValues ?
            (defaultValues["isSecurityQuestionConfigured"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isSecurityQuestionConfigured"], context) :
                null) :
            null;

        context["field"] = "ContactNumbers";
        context["metadata"] = (objectMetadata ? objectMetadata["ContactNumbers"] : null);
        privateState.ContactNumbers = defaultValues ?
            (defaultValues["ContactNumbers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ContactNumbers"], context) :
                null) :
            null;

        context["field"] = "EmailIds";
        context["metadata"] = (objectMetadata ? objectMetadata["EmailIds"] : null);
        privateState.EmailIds = defaultValues ?
            (defaultValues["EmailIds"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EmailIds"], context) :
                null) :
            null;

        context["field"] = "isTypeBusiness";
        context["metadata"] = (objectMetadata ? objectMetadata["isTypeBusiness"] : null);
        privateState.isTypeBusiness = defaultValues ?
            (defaultValues["isTypeBusiness"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isTypeBusiness"], context) :
                null) :
            null;

        context["field"] = "partyID";
        context["metadata"] = (objectMetadata ? objectMetadata["partyID"] : null);
        privateState.partyID = defaultValues ?
            (defaultValues["partyID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyID"], context) :
                null) :
            null;

        context["field"] = "coreCustomerID";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerID"] : null);
        privateState.coreCustomerID = defaultValues ?
            (defaultValues["coreCustomerID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerID"], context) :
                null) :
            null;

        context["field"] = "isCombinedUser";
        context["metadata"] = (objectMetadata ? objectMetadata["isCombinedUser"] : null);
        privateState.isCombinedUser = defaultValues ?
            (defaultValues["isCombinedUser"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isCombinedUser"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "identities";
        context["metadata"] = (objectMetadata ? objectMetadata["identities"] : null);
        privateState.identities = defaultValues ?
            (defaultValues["identities"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["identities"], context) :
                null) :
            null;

        context["field"] = "FirstName";
        context["metadata"] = (objectMetadata ? objectMetadata["FirstName"] : null);
        privateState.FirstName = defaultValues ?
            (defaultValues["FirstName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FirstName"], context) :
                null) :
            null;

        context["field"] = "TaxId";
        context["metadata"] = (objectMetadata ? objectMetadata["TaxId"] : null);
        privateState.TaxId = defaultValues ?
            (defaultValues["TaxId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TaxId"], context) :
                null) :
            null;

        context["field"] = "startDate";
        context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
        privateState.startDate = defaultValues ?
            (defaultValues["startDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["startDate"], context) :
                null) :
            null;

        context["field"] = "referenceID";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceID"] : null);
        privateState.referenceID = defaultValues ?
            (defaultValues["referenceID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceID"], context) :
                null) :
            null;

        context["field"] = "Customer_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
        privateState.Customer_id = defaultValues ?
            (defaultValues["Customer_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Customer_id"], context) :
                null) :
            null;

        context["field"] = "isAlertsRequired";
        context["metadata"] = (objectMetadata ? objectMetadata["isAlertsRequired"] : null);
        privateState.isAlertsRequired = defaultValues ?
            (defaultValues["isAlertsRequired"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isAlertsRequired"], context) :
                null) :
            null;

        context["field"] = "CoreCustomers";
        context["metadata"] = (objectMetadata ? objectMetadata["CoreCustomers"] : null);
        privateState.CoreCustomers = defaultValues ?
            (defaultValues["CoreCustomers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CoreCustomers"], context) :
                null) :
            null;

        context["field"] = "coreCustomerName";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerName"] : null);
        privateState.coreCustomerName = defaultValues ?
            (defaultValues["coreCustomerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerName"], context) :
                null) :
            null;

        context["field"] = "isBusiness";
        context["metadata"] = (objectMetadata ? objectMetadata["isBusiness"] : null);
        privateState.isBusiness = defaultValues ?
            (defaultValues["isBusiness"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isBusiness"], context) :
                null) :
            null;

        context["field"] = "isPrimary";
        context["metadata"] = (objectMetadata ? objectMetadata["isPrimary"] : null);
        privateState.isPrimary = defaultValues ?
            (defaultValues["isPrimary"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isPrimary"], context) :
                null) :
            null;

        context["field"] = "contractId";
        context["metadata"] = (objectMetadata ? objectMetadata["contractId"] : null);
        privateState.contractId = defaultValues ?
            (defaultValues["contractId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contractId"], context) :
                null) :
            null;

        context["field"] = "communicationType";
        context["metadata"] = (objectMetadata ? objectMetadata["communicationType"] : null);
        privateState.communicationType = defaultValues ?
            (defaultValues["communicationType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["communicationType"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "addressId": {
                get: function() {
                    context["field"] = "addressId";
                    context["metadata"] = (objectMetadata ? objectMetadata["addressId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addressId, context);
                },
                set: function(val) {
                    setterFunctions['addressId'].call(this, val, privateState);
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
            "addressType": {
                get: function() {
                    context["field"] = "addressType";
                    context["metadata"] = (objectMetadata ? objectMetadata["addressType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addressType, context);
                },
                set: function(val) {
                    setterFunctions['addressType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "alertsTurnedOn": {
                get: function() {
                    context["field"] = "alertsTurnedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["alertsTurnedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.alertsTurnedOn, context);
                },
                set: function(val) {
                    setterFunctions['alertsTurnedOn'].call(this, val, privateState);
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
            "bankName": {
                get: function() {
                    context["field"] = "bankName";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankName, context);
                },
                set: function(val) {
                    setterFunctions['bankName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardNumber": {
                get: function() {
                    context["field"] = "cardNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardNumber, context);
                },
                set: function(val) {
                    setterFunctions['cardNumber'].call(this, val, privateState);
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
            "currencyCode": {
                get: function() {
                    context["field"] = "currencyCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currencyCode, context);
                },
                set: function(val) {
                    setterFunctions['currencyCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cvv": {
                get: function() {
                    context["field"] = "cvv";
                    context["metadata"] = (objectMetadata ? objectMetadata["cvv"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cvv, context);
                },
                set: function(val) {
                    setterFunctions['cvv'].call(this, val, privateState);
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
            "default_account_billPay": {
                get: function() {
                    context["field"] = "default_account_billPay";
                    context["metadata"] = (objectMetadata ? objectMetadata["default_account_billPay"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.default_account_billPay, context);
                },
                set: function(val) {
                    setterFunctions['default_account_billPay'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "default_account_cardless": {
                get: function() {
                    context["field"] = "default_account_cardless";
                    context["metadata"] = (objectMetadata ? objectMetadata["default_account_cardless"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.default_account_cardless, context);
                },
                set: function(val) {
                    setterFunctions['default_account_cardless'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "default_account_deposit": {
                get: function() {
                    context["field"] = "default_account_deposit";
                    context["metadata"] = (objectMetadata ? objectMetadata["default_account_deposit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.default_account_deposit, context);
                },
                set: function(val) {
                    setterFunctions['default_account_deposit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "default_account_payments": {
                get: function() {
                    context["field"] = "default_account_payments";
                    context["metadata"] = (objectMetadata ? objectMetadata["default_account_payments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.default_account_payments, context);
                },
                set: function(val) {
                    setterFunctions['default_account_payments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "default_account_transfers": {
                get: function() {
                    context["field"] = "default_account_transfers";
                    context["metadata"] = (objectMetadata ? objectMetadata["default_account_transfers"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.default_account_transfers, context);
                },
                set: function(val) {
                    setterFunctions['default_account_transfers'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "default_from_account_p2p": {
                get: function() {
                    context["field"] = "default_from_account_p2p";
                    context["metadata"] = (objectMetadata ? objectMetadata["default_from_account_p2p"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.default_from_account_p2p, context);
                },
                set: function(val) {
                    setterFunctions['default_from_account_p2p'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "default_to_account_p2p": {
                get: function() {
                    context["field"] = "default_to_account_p2p";
                    context["metadata"] = (objectMetadata ? objectMetadata["default_to_account_p2p"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.default_to_account_p2p, context);
                },
                set: function(val) {
                    setterFunctions['default_to_account_p2p'].call(this, val, privateState);
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
            "isEmailEnabled": {
                get: function() {
                    context["field"] = "isEmailEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isEmailEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isEmailEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isEmailEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isPhoneEnabled": {
                get: function() {
                    context["field"] = "isPhoneEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isPhoneEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isPhoneEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isPhoneEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isPinSet": {
                get: function() {
                    context["field"] = "isPinSet";
                    context["metadata"] = (objectMetadata ? objectMetadata["isPinSet"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isPinSet, context);
                },
                set: function(val) {
                    setterFunctions['isPinSet'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isPreferredAddress": {
                get: function() {
                    context["field"] = "isPreferredAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["isPreferredAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isPreferredAddress, context);
                },
                set: function(val) {
                    setterFunctions['isPreferredAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastlogintime": {
                get: function() {
                    context["field"] = "lastlogintime";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastlogintime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastlogintime, context);
                },
                set: function(val) {
                    setterFunctions['lastlogintime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "oldpassword": {
                get: function() {
                    context["field"] = "oldpassword";
                    context["metadata"] = (objectMetadata ? objectMetadata["oldpassword"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.oldpassword, context);
                },
                set: function(val) {
                    setterFunctions['oldpassword'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otp": {
                get: function() {
                    context["field"] = "otp";
                    context["metadata"] = (objectMetadata ? objectMetadata["otp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otp, context);
                },
                set: function(val) {
                    setterFunctions['otp'].call(this, val, privateState);
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
            "pin": {
                get: function() {
                    context["field"] = "pin";
                    context["metadata"] = (objectMetadata ? objectMetadata["pin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pin, context);
                },
                set: function(val) {
                    setterFunctions['pin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "result": {
                get: function() {
                    context["field"] = "result";
                    context["metadata"] = (objectMetadata ? objectMetadata["result"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.result, context);
                },
                set: function(val) {
                    setterFunctions['result'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "role": {
                get: function() {
                    context["field"] = "role";
                    context["metadata"] = (objectMetadata ? objectMetadata["role"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.role, context);
                },
                set: function(val) {
                    setterFunctions['role'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "secondaryemail": {
                get: function() {
                    context["field"] = "secondaryemail";
                    context["metadata"] = (objectMetadata ? objectMetadata["secondaryemail"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.secondaryemail, context);
                },
                set: function(val) {
                    setterFunctions['secondaryemail'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "secondaryemail2": {
                get: function() {
                    context["field"] = "secondaryemail2";
                    context["metadata"] = (objectMetadata ? objectMetadata["secondaryemail2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.secondaryemail2, context);
                },
                set: function(val) {
                    setterFunctions['secondaryemail2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "secondaryphone": {
                get: function() {
                    context["field"] = "secondaryphone";
                    context["metadata"] = (objectMetadata ? objectMetadata["secondaryphone"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.secondaryphone, context);
                },
                set: function(val) {
                    setterFunctions['secondaryphone'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "secondaryphone2": {
                get: function() {
                    context["field"] = "secondaryphone2";
                    context["metadata"] = (objectMetadata ? objectMetadata["secondaryphone2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.secondaryphone2, context);
                },
                set: function(val) {
                    setterFunctions['secondaryphone2'].call(this, val, privateState);
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
            "userfirstname": {
                get: function() {
                    context["field"] = "userfirstname";
                    context["metadata"] = (objectMetadata ? objectMetadata["userfirstname"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userfirstname, context);
                },
                set: function(val) {
                    setterFunctions['userfirstname'].call(this, val, privateState);
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
            "userImage": {
                get: function() {
                    context["field"] = "userImage";
                    context["metadata"] = (objectMetadata ? objectMetadata["userImage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userImage, context);
                },
                set: function(val) {
                    setterFunctions['userImage'].call(this, val, privateState);
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
            "zipcode": {
                get: function() {
                    context["field"] = "zipcode";
                    context["metadata"] = (objectMetadata ? objectMetadata["zipcode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.zipcode, context);
                },
                set: function(val) {
                    setterFunctions['zipcode'].call(this, val, privateState);
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
            "featureRequest": {
                get: function() {
                    context["field"] = "featureRequest";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureRequest"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureRequest, context);
                },
                set: function(val) {
                    setterFunctions['featureRequest'].call(this, val, privateState);
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
            "default_account_wire": {
                get: function() {
                    context["field"] = "default_account_wire";
                    context["metadata"] = (objectMetadata ? objectMetadata["default_account_wire"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.default_account_wire, context);
                },
                set: function(val) {
                    setterFunctions['default_account_wire'].call(this, val, privateState);
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
            "userImageURL": {
                get: function() {
                    context["field"] = "userImageURL";
                    context["metadata"] = (objectMetadata ? objectMetadata["userImageURL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userImageURL, context);
                },
                set: function(val) {
                    setterFunctions['userImageURL'].call(this, val, privateState);
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
            "deleteCommunicationID": {
                get: function() {
                    context["field"] = "deleteCommunicationID";
                    context["metadata"] = (objectMetadata ? objectMetadata["deleteCommunicationID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deleteCommunicationID, context);
                },
                set: function(val) {
                    setterFunctions['deleteCommunicationID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maritalStatus": {
                get: function() {
                    context["field"] = "maritalStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["maritalStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maritalStatus, context);
                },
                set: function(val) {
                    setterFunctions['maritalStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "noOfDependents": {
                get: function() {
                    context["field"] = "noOfDependents";
                    context["metadata"] = (objectMetadata ? objectMetadata["noOfDependents"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.noOfDependents, context);
                },
                set: function(val) {
                    setterFunctions['noOfDependents'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "spouseFirstName": {
                get: function() {
                    context["field"] = "spouseFirstName";
                    context["metadata"] = (objectMetadata ? objectMetadata["spouseFirstName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.spouseFirstName, context);
                },
                set: function(val) {
                    setterFunctions['spouseFirstName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "spouseLastName": {
                get: function() {
                    context["field"] = "spouseLastName";
                    context["metadata"] = (objectMetadata ? objectMetadata["spouseLastName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.spouseLastName, context);
                },
                set: function(val) {
                    setterFunctions['spouseLastName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "gender": {
                get: function() {
                    context["field"] = "gender";
                    context["metadata"] = (objectMetadata ? objectMetadata["gender"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.gender, context);
                },
                set: function(val) {
                    setterFunctions['gender'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "showBillPayFromAccPopup": {
                get: function() {
                    context["field"] = "showBillPayFromAccPopup";
                    context["metadata"] = (objectMetadata ? objectMetadata["showBillPayFromAccPopup"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.showBillPayFromAccPopup, context);
                },
                set: function(val) {
                    setterFunctions['showBillPayFromAccPopup'].call(this, val, privateState);
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
            "phoneExtension": {
                get: function() {
                    context["field"] = "phoneExtension";
                    context["metadata"] = (objectMetadata ? objectMetadata["phoneExtension"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.phoneExtension, context);
                },
                set: function(val) {
                    setterFunctions['phoneExtension'].call(this, val, privateState);
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
            "idmConfig": {
                get: function() {
                    context["field"] = "idmConfig";
                    context["metadata"] = (objectMetadata ? objectMetadata["idmConfig"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.idmConfig, context);
                },
                set: function(val) {
                    setterFunctions['idmConfig'].call(this, val, privateState);
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
            "Id": {
                get: function() {
                    context["field"] = "Id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Id, context);
                },
                set: function(val) {
                    setterFunctions['Id'].call(this, val, privateState);
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
            "isEngageProvisioned": {
                get: function() {
                    context["field"] = "isEngageProvisioned";
                    context["metadata"] = (objectMetadata ? objectMetadata["isEngageProvisioned"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isEngageProvisioned, context);
                },
                set: function(val) {
                    setterFunctions['isEngageProvisioned'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isUserEnrolled": {
                get: function() {
                    context["field"] = "isUserEnrolled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isUserEnrolled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isUserEnrolled, context);
                },
                set: function(val) {
                    setterFunctions['isUserEnrolled'].call(this, val, privateState);
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
            "coreCommunication": {
                get: function() {
                    context["field"] = "coreCommunication";
                    context["metadata"] = (objectMetadata ? objectMetadata["coreCommunication"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.coreCommunication, context);
                },
                set: function(val) {
                    setterFunctions['coreCommunication'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "feedbackUserId": {
                get: function() {
                    context["field"] = "feedbackUserId";
                    context["metadata"] = (objectMetadata ? objectMetadata["feedbackUserId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.feedbackUserId, context);
                },
                set: function(val) {
                    setterFunctions['feedbackUserId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userlastname": {
                get: function() {
                    context["field"] = "userlastname";
                    context["metadata"] = (objectMetadata ? objectMetadata["userlastname"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userlastname, context);
                },
                set: function(val) {
                    setterFunctions['userlastname'].call(this, val, privateState);
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
            "isSecurityQuestionConfigured": {
                get: function() {
                    context["field"] = "isSecurityQuestionConfigured";
                    context["metadata"] = (objectMetadata ? objectMetadata["isSecurityQuestionConfigured"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isSecurityQuestionConfigured, context);
                },
                set: function(val) {
                    setterFunctions['isSecurityQuestionConfigured'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ContactNumbers": {
                get: function() {
                    context["field"] = "ContactNumbers";
                    context["metadata"] = (objectMetadata ? objectMetadata["ContactNumbers"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ContactNumbers, context);
                },
                set: function(val) {
                    setterFunctions['ContactNumbers'].call(this, val, privateState);
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
            "isTypeBusiness": {
                get: function() {
                    context["field"] = "isTypeBusiness";
                    context["metadata"] = (objectMetadata ? objectMetadata["isTypeBusiness"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isTypeBusiness, context);
                },
                set: function(val) {
                    setterFunctions['isTypeBusiness'].call(this, val, privateState);
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
            "TaxId": {
                get: function() {
                    context["field"] = "TaxId";
                    context["metadata"] = (objectMetadata ? objectMetadata["TaxId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TaxId, context);
                },
                set: function(val) {
                    setterFunctions['TaxId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "startDate": {
                get: function() {
                    context["field"] = "startDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.startDate, context);
                },
                set: function(val) {
                    setterFunctions['startDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "referenceID": {
                get: function() {
                    context["field"] = "referenceID";
                    context["metadata"] = (objectMetadata ? objectMetadata["referenceID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.referenceID, context);
                },
                set: function(val) {
                    setterFunctions['referenceID'].call(this, val, privateState);
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
            "isAlertsRequired": {
                get: function() {
                    context["field"] = "isAlertsRequired";
                    context["metadata"] = (objectMetadata ? objectMetadata["isAlertsRequired"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isAlertsRequired, context);
                },
                set: function(val) {
                    setterFunctions['isAlertsRequired'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CoreCustomers": {
                get: function() {
                    context["field"] = "CoreCustomers";
                    context["metadata"] = (objectMetadata ? objectMetadata["CoreCustomers"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CoreCustomers, context);
                },
                set: function(val) {
                    setterFunctions['CoreCustomers'].call(this, val, privateState);
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
            "isBusiness": {
                get: function() {
                    context["field"] = "isBusiness";
                    context["metadata"] = (objectMetadata ? objectMetadata["isBusiness"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isBusiness, context);
                },
                set: function(val) {
                    setterFunctions['isBusiness'].call(this, val, privateState);
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
            "communicationType": {
                get: function() {
                    context["field"] = "communicationType";
                    context["metadata"] = (objectMetadata ? objectMetadata["communicationType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.communicationType, context);
                },
                set: function(val) {
                    setterFunctions['communicationType'].call(this, val, privateState);
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
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.accountType = value ? (value["accountType"] ? value["accountType"] : null) : null;
            privateState.addressId = value ? (value["addressId"] ? value["addressId"] : null) : null;
            privateState.addressLine1 = value ? (value["addressLine1"] ? value["addressLine1"] : null) : null;
            privateState.addressLine2 = value ? (value["addressLine2"] ? value["addressLine2"] : null) : null;
            privateState.addressType = value ? (value["addressType"] ? value["addressType"] : null) : null;
            privateState.alertsTurnedOn = value ? (value["alertsTurnedOn"] ? value["alertsTurnedOn"] : null) : null;
            privateState.areAccountStatementTermsAccepted = value ? (value["areAccountStatementTermsAccepted"] ? value["areAccountStatementTermsAccepted"] : null) : null;
            privateState.areDepositTermsAccepted = value ? (value["areDepositTermsAccepted"] ? value["areDepositTermsAccepted"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.cardNumber = value ? (value["cardNumber"] ? value["cardNumber"] : null) : null;
            privateState.city = value ? (value["city"] ? value["city"] : null) : null;
            privateState.country = value ? (value["country"] ? value["country"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.cvv = value ? (value["cvv"] ? value["cvv"] : null) : null;
            privateState.dateOfBirth = value ? (value["dateOfBirth"] ? value["dateOfBirth"] : null) : null;
            privateState.default_account_billPay = value ? (value["default_account_billPay"] ? value["default_account_billPay"] : null) : null;
            privateState.default_account_cardless = value ? (value["default_account_cardless"] ? value["default_account_cardless"] : null) : null;
            privateState.default_account_deposit = value ? (value["default_account_deposit"] ? value["default_account_deposit"] : null) : null;
            privateState.default_account_payments = value ? (value["default_account_payments"] ? value["default_account_payments"] : null) : null;
            privateState.default_account_transfers = value ? (value["default_account_transfers"] ? value["default_account_transfers"] : null) : null;
            privateState.default_from_account_p2p = value ? (value["default_from_account_p2p"] ? value["default_from_account_p2p"] : null) : null;
            privateState.default_to_account_p2p = value ? (value["default_to_account_p2p"] ? value["default_to_account_p2p"] : null) : null;
            privateState.email = value ? (value["email"] ? value["email"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.isEmailEnabled = value ? (value["isEmailEnabled"] ? value["isEmailEnabled"] : null) : null;
            privateState.isPhoneEnabled = value ? (value["isPhoneEnabled"] ? value["isPhoneEnabled"] : null) : null;
            privateState.isPinSet = value ? (value["isPinSet"] ? value["isPinSet"] : null) : null;
            privateState.isPreferredAddress = value ? (value["isPreferredAddress"] ? value["isPreferredAddress"] : null) : null;
            privateState.lastlogintime = value ? (value["lastlogintime"] ? value["lastlogintime"] : null) : null;
            privateState.oldpassword = value ? (value["oldpassword"] ? value["oldpassword"] : null) : null;
            privateState.otp = value ? (value["otp"] ? value["otp"] : null) : null;
            privateState.password = value ? (value["password"] ? value["password"] : null) : null;
            privateState.phone = value ? (value["phone"] ? value["phone"] : null) : null;
            privateState.pin = value ? (value["pin"] ? value["pin"] : null) : null;
            privateState.result = value ? (value["result"] ? value["result"] : null) : null;
            privateState.role = value ? (value["role"] ? value["role"] : null) : null;
            privateState.secondaryemail = value ? (value["secondaryemail"] ? value["secondaryemail"] : null) : null;
            privateState.secondaryemail2 = value ? (value["secondaryemail2"] ? value["secondaryemail2"] : null) : null;
            privateState.secondaryphone = value ? (value["secondaryphone"] ? value["secondaryphone"] : null) : null;
            privateState.secondaryphone2 = value ? (value["secondaryphone2"] ? value["secondaryphone2"] : null) : null;
            privateState.ssn = value ? (value["ssn"] ? value["ssn"] : null) : null;
            privateState.state = value ? (value["state"] ? value["state"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.userfirstname = value ? (value["userfirstname"] ? value["userfirstname"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.userImage = value ? (value["userImage"] ? value["userImage"] : null) : null;
            privateState.LastName = value ? (value["LastName"] ? value["LastName"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.zipcode = value ? (value["zipcode"] ? value["zipcode"] : null) : null;
            privateState.rating = value ? (value["rating"] ? value["rating"] : null) : null;
            privateState.featureRequest = value ? (value["featureRequest"] ? value["featureRequest"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.default_account_wire = value ? (value["default_account_wire"] ? value["default_account_wire"] : null) : null;
            privateState.isWireTransferActivated = value ? (value["isWireTransferActivated"] ? value["isWireTransferActivated"] : null) : null;
            privateState.isWireTransferEligible = value ? (value["isWireTransferEligible"] ? value["isWireTransferEligible"] : null) : null;
            privateState.userImageURL = value ? (value["userImageURL"] ? value["userImageURL"] : null) : null;
            privateState.modifiedByName = value ? (value["modifiedByName"] ? value["modifiedByName"] : null) : null;
            privateState.Addresses = value ? (value["Addresses"] ? value["Addresses"] : null) : null;
            privateState.phoneNumbers = value ? (value["phoneNumbers"] ? value["phoneNumbers"] : null) : null;
            privateState.preferredContactMethod = value ? (value["preferredContactMethod"] ? value["preferredContactMethod"] : null) : null;
            privateState.preferredContactTime = value ? (value["preferredContactTime"] ? value["preferredContactTime"] : null) : null;
            privateState.deleteAddressID = value ? (value["deleteAddressID"] ? value["deleteAddressID"] : null) : null;
            privateState.deleteCommunicationID = value ? (value["deleteCommunicationID"] ? value["deleteCommunicationID"] : null) : null;
            privateState.maritalStatus = value ? (value["maritalStatus"] ? value["maritalStatus"] : null) : null;
            privateState.noOfDependents = value ? (value["noOfDependents"] ? value["noOfDependents"] : null) : null;
            privateState.spouseFirstName = value ? (value["spouseFirstName"] ? value["spouseFirstName"] : null) : null;
            privateState.spouseLastName = value ? (value["spouseLastName"] ? value["spouseLastName"] : null) : null;
            privateState.gender = value ? (value["gender"] ? value["gender"] : null) : null;
            privateState.showBillPayFromAccPopup = value ? (value["showBillPayFromAccPopup"] ? value["showBillPayFromAccPopup"] : null) : null;
            privateState.isP2PActivated = value ? (value["isP2PActivated"] ? value["isP2PActivated"] : null) : null;
            privateState.isP2PSupported = value ? (value["isP2PSupported"] ? value["isP2PSupported"] : null) : null;
            privateState.isBillPaySupported = value ? (value["isBillPaySupported"] ? value["isBillPaySupported"] : null) : null;
            privateState.isBillPayActivated = value ? (value["isBillPayActivated"] ? value["isBillPayActivated"] : null) : null;
            privateState.securityKey = value ? (value["securityKey"] ? value["securityKey"] : null) : null;
            privateState.phoneExtension = value ? (value["phoneExtension"] ? value["phoneExtension"] : null) : null;
            privateState.phoneCountryCode = value ? (value["phoneCountryCode"] ? value["phoneCountryCode"] : null) : null;
            privateState.idmConfig = value ? (value["idmConfig"] ? value["idmConfig"] : null) : null;
            privateState.errCode = value ? (value["errCode"] ? value["errCode"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.errorCode = value ? (value["errorCode"] ? value["errorCode"] : null) : null;
            privateState.Id = value ? (value["Id"] ? value["Id"] : null) : null;
            privateState.RiskStatus = value ? (value["RiskStatus"] ? value["RiskStatus"] : null) : null;
            privateState.isEagreementSigned = value ? (value["isEagreementSigned"] ? value["isEagreementSigned"] : null) : null;
            privateState.isEngageProvisioned = value ? (value["isEngageProvisioned"] ? value["isEngageProvisioned"] : null) : null;
            privateState.isUserEnrolled = value ? (value["isUserEnrolled"] ? value["isUserEnrolled"] : null) : null;
            privateState.serviceKey = value ? (value["serviceKey"] ? value["serviceKey"] : null) : null;
            privateState.isUserExists = value ? (value["isUserExists"] ? value["isUserExists"] : null) : null;
            privateState.communication = value ? (value["communication"] ? value["communication"] : null) : null;
            privateState.coreCommunication = value ? (value["coreCommunication"] ? value["coreCommunication"] : null) : null;
            privateState.feedbackUserId = value ? (value["feedbackUserId"] ? value["feedbackUserId"] : null) : null;
            privateState.userlastname = value ? (value["userlastname"] ? value["userlastname"] : null) : null;
            privateState.isVIPCustomer = value ? (value["isVIPCustomer"] ? value["isVIPCustomer"] : null) : null;
            privateState.isSecurityQuestionConfigured = value ? (value["isSecurityQuestionConfigured"] ? value["isSecurityQuestionConfigured"] : null) : null;
            privateState.ContactNumbers = value ? (value["ContactNumbers"] ? value["ContactNumbers"] : null) : null;
            privateState.EmailIds = value ? (value["EmailIds"] ? value["EmailIds"] : null) : null;
            privateState.isTypeBusiness = value ? (value["isTypeBusiness"] ? value["isTypeBusiness"] : null) : null;
            privateState.partyID = value ? (value["partyID"] ? value["partyID"] : null) : null;
            privateState.coreCustomerID = value ? (value["coreCustomerID"] ? value["coreCustomerID"] : null) : null;
            privateState.isCombinedUser = value ? (value["isCombinedUser"] ? value["isCombinedUser"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.identities = value ? (value["identities"] ? value["identities"] : null) : null;
            privateState.FirstName = value ? (value["FirstName"] ? value["FirstName"] : null) : null;
            privateState.TaxId = value ? (value["TaxId"] ? value["TaxId"] : null) : null;
            privateState.startDate = value ? (value["startDate"] ? value["startDate"] : null) : null;
            privateState.referenceID = value ? (value["referenceID"] ? value["referenceID"] : null) : null;
            privateState.Customer_id = value ? (value["Customer_id"] ? value["Customer_id"] : null) : null;
            privateState.isAlertsRequired = value ? (value["isAlertsRequired"] ? value["isAlertsRequired"] : null) : null;
            privateState.CoreCustomers = value ? (value["CoreCustomers"] ? value["CoreCustomers"] : null) : null;
            privateState.coreCustomerName = value ? (value["coreCustomerName"] ? value["coreCustomerName"] : null) : null;
            privateState.isBusiness = value ? (value["isBusiness"] ? value["isBusiness"] : null) : null;
            privateState.isPrimary = value ? (value["isPrimary"] ? value["isPrimary"] : null) : null;
            privateState.contractId = value ? (value["contractId"] ? value["contractId"] : null) : null;
            privateState.communicationType = value ? (value["communicationType"] ? value["communicationType"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ExternalUsers);

    //Create new class level validator object
    BaseModel.Validator.call(ExternalUsers);

    var registerValidatorBackup = ExternalUsers.registerValidator;

    ExternalUsers.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ExternalUsers.isValid(this, propName, val)) {
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
    //For Operation 'getReferenceById' with service id 'GetReferenceById2172'
     ExternalUsers.getReferenceById = function(params, onCompletion){
        return ExternalUsers.customVerb('getReferenceById', params, onCompletion);
     };

    //For Operation 'UpdateDetails' with service id 'updateCustomerDetailsOperation7424'
     ExternalUsers.UpdateDetails = function(params, onCompletion){
        return ExternalUsers.customVerb('UpdateDetails', params, onCompletion);
     };

    //For Operation 'checkUserEnrolled' with service id 'CheckUserEnrolled2370'
     ExternalUsers.checkUserEnrolled = function(params, onCompletion){
        return ExternalUsers.customVerb('checkUserEnrolled', params, onCompletion);
     };

    //For Operation 'verifyExistingPassword' with service id 'verifyExistingPassword1245'
     ExternalUsers.verifyExistingPassword = function(params, onCompletion){
        return ExternalUsers.customVerb('verifyExistingPassword', params, onCompletion);
     };

    var relations = [];

    ExternalUsers.relations = relations;

    ExternalUsers.prototype.isValid = function() {
        return ExternalUsers.isValid(this);
    };

    ExternalUsers.prototype.objModelName = "ExternalUsers";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ExternalUsers.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ExternalUserManagement", "ExternalUsers", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ExternalUsers.clone = function(objectToClone) {
        var clonedObj = new ExternalUsers();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ExternalUsers;
});