/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Party", "objectService" : "PartyExperienceAPI"};

    var setterFunctions = {
        partyStatus: function(val, state) {
            context["field"] = "partyStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["partyStatus"] : null);
            state['partyStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contactAddresss: function(val, state) {
            context["field"] = "contactAddresss";
            context["metadata"] = (objectMetadata ? objectMetadata["contactAddresss"] : null);
            state['contactAddresss'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateOfBirth: function(val, state) {
            context["field"] = "dateOfBirth";
            context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
            state['dateOfBirth'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        employments: function(val, state) {
            context["field"] = "employments";
            context["metadata"] = (objectMetadata ? objectMetadata["employments"] : null);
            state['employments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyType: function(val, state) {
            context["field"] = "partyType";
            context["metadata"] = (objectMetadata ? objectMetadata["partyType"] : null);
            state['partyType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        emailId: function(val, state) {
            context["field"] = "emailId";
            context["metadata"] = (objectMetadata ? objectMetadata["emailId"] : null);
            state['emailId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        occupations: function(val, state) {
            context["field"] = "occupations";
            context["metadata"] = (objectMetadata ? objectMetadata["occupations"] : null);
            state['occupations'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        extensionData: function(val, state) {
            context["field"] = "extensionData";
            context["metadata"] = (objectMetadata ? objectMetadata["extensionData"] : null);
            state['extensionData'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxDetailss: function(val, state) {
            context["field"] = "taxDetailss";
            context["metadata"] = (objectMetadata ? objectMetadata["taxDetailss"] : null);
            state['taxDetailss'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        citizenships: function(val, state) {
            context["field"] = "citizenships";
            context["metadata"] = (objectMetadata ? objectMetadata["citizenships"] : null);
            state['citizenships'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nationalitys: function(val, state) {
            context["field"] = "nationalitys";
            context["metadata"] = (objectMetadata ? objectMetadata["nationalitys"] : null);
            state['nationalitys'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyId: function(val, state) {
            context["field"] = "partyId";
            context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
            state['partyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        residences: function(val, state) {
            context["field"] = "residences";
            context["metadata"] = (objectMetadata ? objectMetadata["residences"] : null);
            state['residences'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vulnerabilitys: function(val, state) {
            context["field"] = "vulnerabilitys";
            context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilitys"] : null);
            state['vulnerabilitys'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyLifeCycles: function(val, state) {
            context["field"] = "partyLifeCycles";
            context["metadata"] = (objectMetadata ? objectMetadata["partyLifeCycles"] : null);
            state['partyLifeCycles'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyNamess: function(val, state) {
            context["field"] = "partyNamess";
            context["metadata"] = (objectMetadata ? objectMetadata["partyNamess"] : null);
            state['partyNamess'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyLanguages: function(val, state) {
            context["field"] = "partyLanguages";
            context["metadata"] = (objectMetadata ? objectMetadata["partyLanguages"] : null);
            state['partyLanguages'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherRiskIndicators: function(val, state) {
            context["field"] = "otherRiskIndicators";
            context["metadata"] = (objectMetadata ? objectMetadata["otherRiskIndicators"] : null);
            state['otherRiskIndicators'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        personPositions: function(val, state) {
            context["field"] = "personPositions";
            context["metadata"] = (objectMetadata ? objectMetadata["personPositions"] : null);
            state['personPositions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyIdentifiers: function(val, state) {
            context["field"] = "partyIdentifiers";
            context["metadata"] = (objectMetadata ? objectMetadata["partyIdentifiers"] : null);
            state['partyIdentifiers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyAssessments: function(val, state) {
            context["field"] = "partyAssessments";
            context["metadata"] = (objectMetadata ? objectMetadata["partyAssessments"] : null);
            state['partyAssessments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phoneAddress: function(val, state) {
            context["field"] = "phoneAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["phoneAddress"] : null);
            state['phoneAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        electronicAddress: function(val, state) {
            context["field"] = "electronicAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["electronicAddress"] : null);
            state['electronicAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        error: function(val, state) {
            context["field"] = "error";
            context["metadata"] = (objectMetadata ? objectMetadata["error"] : null);
            state['error'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createStatus: function(val, state) {
            context["field"] = "createStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["createStatus"] : null);
            state['createStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        updateStatus: function(val, state) {
            context["field"] = "updateStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["updateStatus"] : null);
            state['updateStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        middleName: function(val, state) {
            context["field"] = "middleName";
            context["metadata"] = (objectMetadata ? objectMetadata["middleName"] : null);
            state['middleName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyNames: function(val, state) {
            context["field"] = "partyNames";
            context["metadata"] = (objectMetadata ? objectMetadata["partyNames"] : null);
            state['partyNames'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contactAddress: function(val, state) {
            context["field"] = "contactAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["contactAddress"] : null);
            state['contactAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        addresses: function(val, state) {
            context["field"] = "addresses";
            context["metadata"] = (objectMetadata ? objectMetadata["addresses"] : null);
            state['addresses'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        gender: function(val, state) {
            context["field"] = "gender";
            context["metadata"] = (objectMetadata ? objectMetadata["gender"] : null);
            state['gender'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        defaultLanguage: function(val, state) {
            context["field"] = "defaultLanguage";
            context["metadata"] = (objectMetadata ? objectMetadata["defaultLanguage"] : null);
            state['defaultLanguage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        noOfDependents: function(val, state) {
            context["field"] = "noOfDependents";
            context["metadata"] = (objectMetadata ? objectMetadata["noOfDependents"] : null);
            state['noOfDependents'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nickName: function(val, state) {
            context["field"] = "nickName";
            context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
            state['nickName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        suffix: function(val, state) {
            context["field"] = "suffix";
            context["metadata"] = (objectMetadata ? objectMetadata["suffix"] : null);
            state['suffix'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        alias: function(val, state) {
            context["field"] = "alias";
            context["metadata"] = (objectMetadata ? objectMetadata["alias"] : null);
            state['alias'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nameStartDate: function(val, state) {
            context["field"] = "nameStartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["nameStartDate"] : null);
            state['nameStartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        identifierNumber: function(val, state) {
            context["field"] = "identifierNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["identifierNumber"] : null);
            state['identifierNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        identifierType: function(val, state) {
            context["field"] = "identifierType";
            context["metadata"] = (objectMetadata ? objectMetadata["identifierType"] : null);
            state['identifierType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        alternateIdentifierNumber: function(val, state) {
            context["field"] = "alternateIdentifierNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["alternateIdentifierNumber"] : null);
            state['alternateIdentifierNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        alternateIdentifierType: function(val, state) {
            context["field"] = "alternateIdentifierType";
            context["metadata"] = (objectMetadata ? objectMetadata["alternateIdentifierType"] : null);
            state['alternateIdentifierType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contactNumber: function(val, state) {
            context["field"] = "contactNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["contactNumber"] : null);
            state['contactNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        entityName: function(val, state) {
            context["field"] = "entityName";
            context["metadata"] = (objectMetadata ? objectMetadata["entityName"] : null);
            state['entityName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recordCount: function(val, state) {
            context["field"] = "recordCount";
            context["metadata"] = (objectMetadata ? objectMetadata["recordCount"] : null);
            state['recordCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateOfDeath: function(val, state) {
            context["field"] = "dateOfDeath";
            context["metadata"] = (objectMetadata ? objectMetadata["dateOfDeath"] : null);
            state['dateOfDeath'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        notificationOfDeath: function(val, state) {
            context["field"] = "notificationOfDeath";
            context["metadata"] = (objectMetadata ? objectMetadata["notificationOfDeath"] : null);
            state['notificationOfDeath'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cityOfBirth: function(val, state) {
            context["field"] = "cityOfBirth";
            context["metadata"] = (objectMetadata ? objectMetadata["cityOfBirth"] : null);
            state['cityOfBirth'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        countryOfBirth: function(val, state) {
            context["field"] = "countryOfBirth";
            context["metadata"] = (objectMetadata ? objectMetadata["countryOfBirth"] : null);
            state['countryOfBirth'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maritalStatus: function(val, state) {
            context["field"] = "maritalStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["maritalStatus"] : null);
            state['maritalStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonForNoCitizenship: function(val, state) {
            context["field"] = "reasonForNoCitizenship";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonForNoCitizenship"] : null);
            state['reasonForNoCitizenship'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        title: function(val, state) {
            context["field"] = "title";
            context["metadata"] = (objectMetadata ? objectMetadata["title"] : null);
            state['title'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        organisationLegalType: function(val, state) {
            context["field"] = "organisationLegalType";
            context["metadata"] = (objectMetadata ? objectMetadata["organisationLegalType"] : null);
            state['organisationLegalType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        incorporationCountry: function(val, state) {
            context["field"] = "incorporationCountry";
            context["metadata"] = (objectMetadata ? objectMetadata["incorporationCountry"] : null);
            state['incorporationCountry'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateOfIncorporation: function(val, state) {
            context["field"] = "dateOfIncorporation";
            context["metadata"] = (objectMetadata ? objectMetadata["dateOfIncorporation"] : null);
            state['dateOfIncorporation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nameOfIncorporationAuthority: function(val, state) {
            context["field"] = "nameOfIncorporationAuthority";
            context["metadata"] = (objectMetadata ? objectMetadata["nameOfIncorporationAuthority"] : null);
            state['nameOfIncorporationAuthority'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        legalForm: function(val, state) {
            context["field"] = "legalForm";
            context["metadata"] = (objectMetadata ? objectMetadata["legalForm"] : null);
            state['legalForm'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        numberOfEmployees: function(val, state) {
            context["field"] = "numberOfEmployees";
            context["metadata"] = (objectMetadata ? objectMetadata["numberOfEmployees"] : null);
            state['numberOfEmployees'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        birthProvince: function(val, state) {
            context["field"] = "birthProvince";
            context["metadata"] = (objectMetadata ? objectMetadata["birthProvince"] : null);
            state['birthProvince'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nationalities: function(val, state) {
            context["field"] = "nationalities";
            context["metadata"] = (objectMetadata ? objectMetadata["nationalities"] : null);
            state['nationalities'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        country: function(val, state) {
            context["field"] = "country";
            context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
            state['country'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        explanationIfApplies: function(val, state) {
            context["field"] = "explanationIfApplies";
            context["metadata"] = (objectMetadata ? objectMetadata["explanationIfApplies"] : null);
            state['explanationIfApplies'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        language: function(val, state) {
            context["field"] = "language";
            context["metadata"] = (objectMetadata ? objectMetadata["language"] : null);
            state['language'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        explanationIfDoesnotApply: function(val, state) {
            context["field"] = "explanationIfDoesnotApply";
            context["metadata"] = (objectMetadata ? objectMetadata["explanationIfDoesnotApply"] : null);
            state['explanationIfDoesnotApply'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        countryOfCitizenship: function(val, state) {
            context["field"] = "countryOfCitizenship";
            context["metadata"] = (objectMetadata ? objectMetadata["countryOfCitizenship"] : null);
            state['countryOfCitizenship'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        endDate: function(val, state) {
            context["field"] = "endDate";
            context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
            state['endDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        doesRiskApply: function(val, state) {
            context["field"] = "doesRiskApply";
            context["metadata"] = (objectMetadata ? objectMetadata["doesRiskApply"] : null);
            state['doesRiskApply'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        region: function(val, state) {
            context["field"] = "region";
            context["metadata"] = (objectMetadata ? objectMetadata["region"] : null);
            state['region'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        type: function(val, state) {
            context["field"] = "type";
            context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
            state['type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        level: function(val, state) {
            context["field"] = "level";
            context["metadata"] = (objectMetadata ? objectMetadata["level"] : null);
            state['level'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        score: function(val, state) {
            context["field"] = "score";
            context["metadata"] = (objectMetadata ? objectMetadata["score"] : null);
            state['score'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        body: function(val, state) {
            context["field"] = "body";
            context["metadata"] = (objectMetadata ? objectMetadata["body"] : null);
            state['body'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        conclusionDate: function(val, state) {
            context["field"] = "conclusionDate";
            context["metadata"] = (objectMetadata ? objectMetadata["conclusionDate"] : null);
            state['conclusionDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        details: function(val, state) {
            context["field"] = "details";
            context["metadata"] = (objectMetadata ? objectMetadata["details"] : null);
            state['details'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nature: function(val, state) {
            context["field"] = "nature";
            context["metadata"] = (objectMetadata ? objectMetadata["nature"] : null);
            state['nature'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reason: function(val, state) {
            context["field"] = "reason";
            context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
            state['reason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nextAssessmentDate: function(val, state) {
            context["field"] = "nextAssessmentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["nextAssessmentDate"] : null);
            state['nextAssessmentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expirydate: function(val, state) {
            context["field"] = "expirydate";
            context["metadata"] = (objectMetadata ? objectMetadata["expirydate"] : null);
            state['expirydate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        statutoryRequirementMet: function(val, state) {
            context["field"] = "statutoryRequirementMet";
            context["metadata"] = (objectMetadata ? objectMetadata["statutoryRequirementMet"] : null);
            state['statutoryRequirementMet'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuingAuthority: function(val, state) {
            context["field"] = "issuingAuthority";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingAuthority"] : null);
            state['issuingAuthority'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuedDate: function(val, state) {
            context["field"] = "issuedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["issuedDate"] : null);
            state['issuedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issuingCountry: function(val, state) {
            context["field"] = "issuingCountry";
            context["metadata"] = (objectMetadata ? objectMetadata["issuingCountry"] : null);
            state['issuingCountry'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        holderName: function(val, state) {
            context["field"] = "holderName";
            context["metadata"] = (objectMetadata ? objectMetadata["holderName"] : null);
            state['holderName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentTagId: function(val, state) {
            context["field"] = "documentTagId";
            context["metadata"] = (objectMetadata ? objectMetadata["documentTagId"] : null);
            state['documentTagId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        alternateIdentities: function(val, state) {
            context["field"] = "alternateIdentities";
            context["metadata"] = (objectMetadata ? objectMetadata["alternateIdentities"] : null);
            state['alternateIdentities'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        identitySource: function(val, state) {
            context["field"] = "identitySource";
            context["metadata"] = (objectMetadata ? objectMetadata["identitySource"] : null);
            state['identitySource'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        statusComments: function(val, state) {
            context["field"] = "statusComments";
            context["metadata"] = (objectMetadata ? objectMetadata["statusComments"] : null);
            state['statusComments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        personPositionType: function(val, state) {
            context["field"] = "personPositionType";
            context["metadata"] = (objectMetadata ? objectMetadata["personPositionType"] : null);
            state['personPositionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        countryOfPosition: function(val, state) {
            context["field"] = "countryOfPosition";
            context["metadata"] = (objectMetadata ? objectMetadata["countryOfPosition"] : null);
            state['countryOfPosition'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        effectiveFromDate: function(val, state) {
            context["field"] = "effectiveFromDate";
            context["metadata"] = (objectMetadata ? objectMetadata["effectiveFromDate"] : null);
            state['effectiveFromDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        effectiveToDate: function(val, state) {
            context["field"] = "effectiveToDate";
            context["metadata"] = (objectMetadata ? objectMetadata["effectiveToDate"] : null);
            state['effectiveToDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        comments: function(val, state) {
            context["field"] = "comments";
            context["metadata"] = (objectMetadata ? objectMetadata["comments"] : null);
            state['comments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastUpdated: function(val, state) {
            context["field"] = "lastUpdated";
            context["metadata"] = (objectMetadata ? objectMetadata["lastUpdated"] : null);
            state['lastUpdated'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        informationSource: function(val, state) {
            context["field"] = "informationSource";
            context["metadata"] = (objectMetadata ? objectMetadata["informationSource"] : null);
            state['informationSource'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vulnerabilities: function(val, state) {
            context["field"] = "vulnerabilities";
            context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilities"] : null);
            state['vulnerabilities'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        changeReason: function(val, state) {
            context["field"] = "changeReason";
            context["metadata"] = (objectMetadata ? objectMetadata["changeReason"] : null);
            state['changeReason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        occupationType: function(val, state) {
            context["field"] = "occupationType";
            context["metadata"] = (objectMetadata ? objectMetadata["occupationType"] : null);
            state['occupationType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        occupationDescription: function(val, state) {
            context["field"] = "occupationDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["occupationDescription"] : null);
            state['occupationDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vulnerabilityType: function(val, state) {
            context["field"] = "vulnerabilityType";
            context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilityType"] : null);
            state['vulnerabilityType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        employmentReference: function(val, state) {
            context["field"] = "employmentReference";
            context["metadata"] = (objectMetadata ? objectMetadata["employmentReference"] : null);
            state['employmentReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        jobTitle: function(val, state) {
            context["field"] = "jobTitle";
            context["metadata"] = (objectMetadata ? objectMetadata["jobTitle"] : null);
            state['jobTitle'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        employerName: function(val, state) {
            context["field"] = "employerName";
            context["metadata"] = (objectMetadata ? objectMetadata["employerName"] : null);
            state['employerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        employerSegment: function(val, state) {
            context["field"] = "employerSegment";
            context["metadata"] = (objectMetadata ? objectMetadata["employerSegment"] : null);
            state['employerSegment'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        employerOfficePhoneIdd: function(val, state) {
            context["field"] = "employerOfficePhoneIdd";
            context["metadata"] = (objectMetadata ? objectMetadata["employerOfficePhoneIdd"] : null);
            state['employerOfficePhoneIdd'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        employerOfficePhone: function(val, state) {
            context["field"] = "employerOfficePhone";
            context["metadata"] = (objectMetadata ? objectMetadata["employerOfficePhone"] : null);
            state['employerOfficePhone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        employerOfficeEmail: function(val, state) {
            context["field"] = "employerOfficeEmail";
            context["metadata"] = (objectMetadata ? objectMetadata["employerOfficeEmail"] : null);
            state['employerOfficeEmail'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        salary: function(val, state) {
            context["field"] = "salary";
            context["metadata"] = (objectMetadata ? objectMetadata["salary"] : null);
            state['salary'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        salaryInCurrency: function(val, state) {
            context["field"] = "salaryInCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["salaryInCurrency"] : null);
            state['salaryInCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        salaryFrequency: function(val, state) {
            context["field"] = "salaryFrequency";
            context["metadata"] = (objectMetadata ? objectMetadata["salaryFrequency"] : null);
            state['salaryFrequency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        primaryEmployment: function(val, state) {
            context["field"] = "primaryEmployment";
            context["metadata"] = (objectMetadata ? objectMetadata["primaryEmployment"] : null);
            state['primaryEmployment'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vulnerabilityComments: function(val, state) {
            context["field"] = "vulnerabilityComments";
            context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilityComments"] : null);
            state['vulnerabilityComments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxReference: function(val, state) {
            context["field"] = "taxReference";
            context["metadata"] = (objectMetadata ? objectMetadata["taxReference"] : null);
            state['taxReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxType: function(val, state) {
            context["field"] = "taxType";
            context["metadata"] = (objectMetadata ? objectMetadata["taxType"] : null);
            state['taxType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxId: function(val, state) {
            context["field"] = "taxId";
            context["metadata"] = (objectMetadata ? objectMetadata["taxId"] : null);
            state['taxId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        eligibilityType: function(val, state) {
            context["field"] = "eligibilityType";
            context["metadata"] = (objectMetadata ? objectMetadata["eligibilityType"] : null);
            state['eligibilityType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        eligibilityReason: function(val, state) {
            context["field"] = "eligibilityReason";
            context["metadata"] = (objectMetadata ? objectMetadata["eligibilityReason"] : null);
            state['eligibilityReason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxStartDate: function(val, state) {
            context["field"] = "taxStartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["taxStartDate"] : null);
            state['taxStartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxReasonType: function(val, state) {
            context["field"] = "taxReasonType";
            context["metadata"] = (objectMetadata ? objectMetadata["taxReasonType"] : null);
            state['taxReasonType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxReasonComment: function(val, state) {
            context["field"] = "taxReasonComment";
            context["metadata"] = (objectMetadata ? objectMetadata["taxReasonComment"] : null);
            state['taxReasonComment'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxIdLackReason: function(val, state) {
            context["field"] = "taxIdLackReason";
            context["metadata"] = (objectMetadata ? objectMetadata["taxIdLackReason"] : null);
            state['taxIdLackReason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isMainTaxResidency: function(val, state) {
            context["field"] = "isMainTaxResidency";
            context["metadata"] = (objectMetadata ? objectMetadata["isMainTaxResidency"] : null);
            state['isMainTaxResidency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        taxDetails: function(val, state) {
            context["field"] = "taxDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["taxDetails"] : null);
            state['taxDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherNames: function(val, state) {
            context["field"] = "otherNames";
            context["metadata"] = (objectMetadata ? objectMetadata["otherNames"] : null);
            state['otherNames'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        name: function(val, state) {
            context["field"] = "name";
            context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
            state['name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nameLanguage: function(val, state) {
            context["field"] = "nameLanguage";
            context["metadata"] = (objectMetadata ? objectMetadata["nameLanguage"] : null);
            state['nameLanguage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toDate: function(val, state) {
            context["field"] = "toDate";
            context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
            state['toDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        observations: function(val, state) {
            context["field"] = "observations";
            context["metadata"] = (objectMetadata ? objectMetadata["observations"] : null);
            state['observations'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        observationReference: function(val, state) {
            context["field"] = "observationReference";
            context["metadata"] = (objectMetadata ? objectMetadata["observationReference"] : null);
            state['observationReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        observationDate: function(val, state) {
            context["field"] = "observationDate";
            context["metadata"] = (objectMetadata ? objectMetadata["observationDate"] : null);
            state['observationDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        detail: function(val, state) {
            context["field"] = "detail";
            context["metadata"] = (objectMetadata ? objectMetadata["detail"] : null);
            state['detail'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        website: function(val, state) {
            context["field"] = "website";
            context["metadata"] = (objectMetadata ? objectMetadata["website"] : null);
            state['website'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        source: function(val, state) {
            context["field"] = "source";
            context["metadata"] = (objectMetadata ? objectMetadata["source"] : null);
            state['source'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        observedBy: function(val, state) {
            context["field"] = "observedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["observedBy"] : null);
            state['observedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyLegalStatus: function(val, state) {
            context["field"] = "partyLegalStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["partyLegalStatus"] : null);
            state['partyLegalStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        effectiveFrom: function(val, state) {
            context["field"] = "effectiveFrom";
            context["metadata"] = (objectMetadata ? objectMetadata["effectiveFrom"] : null);
            state['effectiveFrom'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        effectiveTo: function(val, state) {
            context["field"] = "effectiveTo";
            context["metadata"] = (objectMetadata ? objectMetadata["effectiveTo"] : null);
            state['effectiveTo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        addressFreeFormat: function(val, state) {
            context["field"] = "addressFreeFormat";
            context["metadata"] = (objectMetadata ? objectMetadata["addressFreeFormat"] : null);
            state['addressFreeFormat'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        roles: function(val, state) {
            context["field"] = "roles";
            context["metadata"] = (objectMetadata ? objectMetadata["roles"] : null);
            state['roles'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        roleType: function(val, state) {
            context["field"] = "roleType";
            context["metadata"] = (objectMetadata ? objectMetadata["roleType"] : null);
            state['roleType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromDate: function(val, state) {
            context["field"] = "fromDate";
            context["metadata"] = (objectMetadata ? objectMetadata["fromDate"] : null);
            state['fromDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exitDate: function(val, state) {
            context["field"] = "exitDate";
            context["metadata"] = (objectMetadata ? objectMetadata["exitDate"] : null);
            state['exitDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exitReason: function(val, state) {
            context["field"] = "exitReason";
            context["metadata"] = (objectMetadata ? objectMetadata["exitReason"] : null);
            state['exitReason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        decisionBody: function(val, state) {
            context["field"] = "decisionBody";
            context["metadata"] = (objectMetadata ? objectMetadata["decisionBody"] : null);
            state['decisionBody'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        contactReferences: function(val, state) {
            context["field"] = "contactReferences";
            context["metadata"] = (objectMetadata ? objectMetadata["contactReferences"] : null);
            state['contactReferences'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerships: function(val, state) {
            context["field"] = "customerships";
            context["metadata"] = (objectMetadata ? objectMetadata["customerships"] : null);
            state['customerships'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        responsibleUnits: function(val, state) {
            context["field"] = "responsibleUnits";
            context["metadata"] = (objectMetadata ? objectMetadata["responsibleUnits"] : null);
            state['responsibleUnits'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        responsibleUnitType: function(val, state) {
            context["field"] = "responsibleUnitType";
            context["metadata"] = (objectMetadata ? objectMetadata["responsibleUnitType"] : null);
            state['responsibleUnitType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        businessUnit: function(val, state) {
            context["field"] = "businessUnit";
            context["metadata"] = (objectMetadata ? objectMetadata["businessUnit"] : null);
            state['businessUnit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        relationshipOfficer: function(val, state) {
            context["field"] = "relationshipOfficer";
            context["metadata"] = (objectMetadata ? objectMetadata["relationshipOfficer"] : null);
            state['relationshipOfficer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        classifications: function(val, state) {
            context["field"] = "classifications";
            context["metadata"] = (objectMetadata ? objectMetadata["classifications"] : null);
            state['classifications'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        classificationCode: function(val, state) {
            context["field"] = "classificationCode";
            context["metadata"] = (objectMetadata ? objectMetadata["classificationCode"] : null);
            state['classificationCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        classificationDate: function(val, state) {
            context["field"] = "classificationDate";
            context["metadata"] = (objectMetadata ? objectMetadata["classificationDate"] : null);
            state['classificationDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coreCustomerId: function(val, state) {
            context["field"] = "coreCustomerId";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
            state['coreCustomerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEnrolled: function(val, state) {
            context["field"] = "isEnrolled";
            context["metadata"] = (objectMetadata ? objectMetadata["isEnrolled"] : null);
            state['isEnrolled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Party(defaultValues) {
        var privateState = {};
        context["field"] = "partyStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["partyStatus"] : null);
        privateState.partyStatus = defaultValues ?
            (defaultValues["partyStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyStatus"], context) :
                null) :
            null;

        context["field"] = "contactAddresss";
        context["metadata"] = (objectMetadata ? objectMetadata["contactAddresss"] : null);
        privateState.contactAddresss = defaultValues ?
            (defaultValues["contactAddresss"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contactAddresss"], context) :
                null) :
            null;

        context["field"] = "dateOfBirth";
        context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
        privateState.dateOfBirth = defaultValues ?
            (defaultValues["dateOfBirth"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateOfBirth"], context) :
                null) :
            null;

        context["field"] = "employments";
        context["metadata"] = (objectMetadata ? objectMetadata["employments"] : null);
        privateState.employments = defaultValues ?
            (defaultValues["employments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["employments"], context) :
                null) :
            null;

        context["field"] = "partyType";
        context["metadata"] = (objectMetadata ? objectMetadata["partyType"] : null);
        privateState.partyType = defaultValues ?
            (defaultValues["partyType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyType"], context) :
                null) :
            null;

        context["field"] = "emailId";
        context["metadata"] = (objectMetadata ? objectMetadata["emailId"] : null);
        privateState.emailId = defaultValues ?
            (defaultValues["emailId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["emailId"], context) :
                null) :
            null;

        context["field"] = "occupations";
        context["metadata"] = (objectMetadata ? objectMetadata["occupations"] : null);
        privateState.occupations = defaultValues ?
            (defaultValues["occupations"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["occupations"], context) :
                null) :
            null;

        context["field"] = "extensionData";
        context["metadata"] = (objectMetadata ? objectMetadata["extensionData"] : null);
        privateState.extensionData = defaultValues ?
            (defaultValues["extensionData"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["extensionData"], context) :
                null) :
            null;

        context["field"] = "taxDetailss";
        context["metadata"] = (objectMetadata ? objectMetadata["taxDetailss"] : null);
        privateState.taxDetailss = defaultValues ?
            (defaultValues["taxDetailss"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxDetailss"], context) :
                null) :
            null;

        context["field"] = "citizenships";
        context["metadata"] = (objectMetadata ? objectMetadata["citizenships"] : null);
        privateState.citizenships = defaultValues ?
            (defaultValues["citizenships"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["citizenships"], context) :
                null) :
            null;

        context["field"] = "nationalitys";
        context["metadata"] = (objectMetadata ? objectMetadata["nationalitys"] : null);
        privateState.nationalitys = defaultValues ?
            (defaultValues["nationalitys"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nationalitys"], context) :
                null) :
            null;

        context["field"] = "partyId";
        context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
        privateState.partyId = defaultValues ?
            (defaultValues["partyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyId"], context) :
                null) :
            null;

        context["field"] = "residences";
        context["metadata"] = (objectMetadata ? objectMetadata["residences"] : null);
        privateState.residences = defaultValues ?
            (defaultValues["residences"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["residences"], context) :
                null) :
            null;

        context["field"] = "vulnerabilitys";
        context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilitys"] : null);
        privateState.vulnerabilitys = defaultValues ?
            (defaultValues["vulnerabilitys"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vulnerabilitys"], context) :
                null) :
            null;

        context["field"] = "partyLifeCycles";
        context["metadata"] = (objectMetadata ? objectMetadata["partyLifeCycles"] : null);
        privateState.partyLifeCycles = defaultValues ?
            (defaultValues["partyLifeCycles"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyLifeCycles"], context) :
                null) :
            null;

        context["field"] = "partyNamess";
        context["metadata"] = (objectMetadata ? objectMetadata["partyNamess"] : null);
        privateState.partyNamess = defaultValues ?
            (defaultValues["partyNamess"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyNamess"], context) :
                null) :
            null;

        context["field"] = "partyLanguages";
        context["metadata"] = (objectMetadata ? objectMetadata["partyLanguages"] : null);
        privateState.partyLanguages = defaultValues ?
            (defaultValues["partyLanguages"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyLanguages"], context) :
                null) :
            null;

        context["field"] = "otherRiskIndicators";
        context["metadata"] = (objectMetadata ? objectMetadata["otherRiskIndicators"] : null);
        privateState.otherRiskIndicators = defaultValues ?
            (defaultValues["otherRiskIndicators"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherRiskIndicators"], context) :
                null) :
            null;

        context["field"] = "personPositions";
        context["metadata"] = (objectMetadata ? objectMetadata["personPositions"] : null);
        privateState.personPositions = defaultValues ?
            (defaultValues["personPositions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["personPositions"], context) :
                null) :
            null;

        context["field"] = "partyIdentifiers";
        context["metadata"] = (objectMetadata ? objectMetadata["partyIdentifiers"] : null);
        privateState.partyIdentifiers = defaultValues ?
            (defaultValues["partyIdentifiers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyIdentifiers"], context) :
                null) :
            null;

        context["field"] = "partyAssessments";
        context["metadata"] = (objectMetadata ? objectMetadata["partyAssessments"] : null);
        privateState.partyAssessments = defaultValues ?
            (defaultValues["partyAssessments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyAssessments"], context) :
                null) :
            null;

        context["field"] = "phoneAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["phoneAddress"] : null);
        privateState.phoneAddress = defaultValues ?
            (defaultValues["phoneAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phoneAddress"], context) :
                null) :
            null;

        context["field"] = "electronicAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["electronicAddress"] : null);
        privateState.electronicAddress = defaultValues ?
            (defaultValues["electronicAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["electronicAddress"], context) :
                null) :
            null;

        context["field"] = "error";
        context["metadata"] = (objectMetadata ? objectMetadata["error"] : null);
        privateState.error = defaultValues ?
            (defaultValues["error"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["error"], context) :
                null) :
            null;

        context["field"] = "createStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["createStatus"] : null);
        privateState.createStatus = defaultValues ?
            (defaultValues["createStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createStatus"], context) :
                null) :
            null;

        context["field"] = "updateStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["updateStatus"] : null);
        privateState.updateStatus = defaultValues ?
            (defaultValues["updateStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["updateStatus"], context) :
                null) :
            null;

        context["field"] = "middleName";
        context["metadata"] = (objectMetadata ? objectMetadata["middleName"] : null);
        privateState.middleName = defaultValues ?
            (defaultValues["middleName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["middleName"], context) :
                null) :
            null;

        context["field"] = "partyNames";
        context["metadata"] = (objectMetadata ? objectMetadata["partyNames"] : null);
        privateState.partyNames = defaultValues ?
            (defaultValues["partyNames"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyNames"], context) :
                null) :
            null;

        context["field"] = "contactAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["contactAddress"] : null);
        privateState.contactAddress = defaultValues ?
            (defaultValues["contactAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contactAddress"], context) :
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

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "addresses";
        context["metadata"] = (objectMetadata ? objectMetadata["addresses"] : null);
        privateState.addresses = defaultValues ?
            (defaultValues["addresses"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addresses"], context) :
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

        context["field"] = "gender";
        context["metadata"] = (objectMetadata ? objectMetadata["gender"] : null);
        privateState.gender = defaultValues ?
            (defaultValues["gender"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["gender"], context) :
                null) :
            null;

        context["field"] = "defaultLanguage";
        context["metadata"] = (objectMetadata ? objectMetadata["defaultLanguage"] : null);
        privateState.defaultLanguage = defaultValues ?
            (defaultValues["defaultLanguage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["defaultLanguage"], context) :
                null) :
            null;

        context["field"] = "noOfDependents";
        context["metadata"] = (objectMetadata ? objectMetadata["noOfDependents"] : null);
        privateState.noOfDependents = defaultValues ?
            (defaultValues["noOfDependents"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["noOfDependents"], context) :
                null) :
            null;

        context["field"] = "nickName";
        context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
        privateState.nickName = defaultValues ?
            (defaultValues["nickName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nickName"], context) :
                null) :
            null;

        context["field"] = "suffix";
        context["metadata"] = (objectMetadata ? objectMetadata["suffix"] : null);
        privateState.suffix = defaultValues ?
            (defaultValues["suffix"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["suffix"], context) :
                null) :
            null;

        context["field"] = "alias";
        context["metadata"] = (objectMetadata ? objectMetadata["alias"] : null);
        privateState.alias = defaultValues ?
            (defaultValues["alias"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["alias"], context) :
                null) :
            null;

        context["field"] = "nameStartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["nameStartDate"] : null);
        privateState.nameStartDate = defaultValues ?
            (defaultValues["nameStartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nameStartDate"], context) :
                null) :
            null;

        context["field"] = "identifierNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["identifierNumber"] : null);
        privateState.identifierNumber = defaultValues ?
            (defaultValues["identifierNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["identifierNumber"], context) :
                null) :
            null;

        context["field"] = "identifierType";
        context["metadata"] = (objectMetadata ? objectMetadata["identifierType"] : null);
        privateState.identifierType = defaultValues ?
            (defaultValues["identifierType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["identifierType"], context) :
                null) :
            null;

        context["field"] = "alternateIdentifierNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["alternateIdentifierNumber"] : null);
        privateState.alternateIdentifierNumber = defaultValues ?
            (defaultValues["alternateIdentifierNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["alternateIdentifierNumber"], context) :
                null) :
            null;

        context["field"] = "alternateIdentifierType";
        context["metadata"] = (objectMetadata ? objectMetadata["alternateIdentifierType"] : null);
        privateState.alternateIdentifierType = defaultValues ?
            (defaultValues["alternateIdentifierType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["alternateIdentifierType"], context) :
                null) :
            null;

        context["field"] = "contactNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["contactNumber"] : null);
        privateState.contactNumber = defaultValues ?
            (defaultValues["contactNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contactNumber"], context) :
                null) :
            null;

        context["field"] = "entityName";
        context["metadata"] = (objectMetadata ? objectMetadata["entityName"] : null);
        privateState.entityName = defaultValues ?
            (defaultValues["entityName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["entityName"], context) :
                null) :
            null;

        context["field"] = "recordCount";
        context["metadata"] = (objectMetadata ? objectMetadata["recordCount"] : null);
        privateState.recordCount = defaultValues ?
            (defaultValues["recordCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recordCount"], context) :
                null) :
            null;

        context["field"] = "dateOfDeath";
        context["metadata"] = (objectMetadata ? objectMetadata["dateOfDeath"] : null);
        privateState.dateOfDeath = defaultValues ?
            (defaultValues["dateOfDeath"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateOfDeath"], context) :
                null) :
            null;

        context["field"] = "notificationOfDeath";
        context["metadata"] = (objectMetadata ? objectMetadata["notificationOfDeath"] : null);
        privateState.notificationOfDeath = defaultValues ?
            (defaultValues["notificationOfDeath"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["notificationOfDeath"], context) :
                null) :
            null;

        context["field"] = "cityOfBirth";
        context["metadata"] = (objectMetadata ? objectMetadata["cityOfBirth"] : null);
        privateState.cityOfBirth = defaultValues ?
            (defaultValues["cityOfBirth"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cityOfBirth"], context) :
                null) :
            null;

        context["field"] = "countryOfBirth";
        context["metadata"] = (objectMetadata ? objectMetadata["countryOfBirth"] : null);
        privateState.countryOfBirth = defaultValues ?
            (defaultValues["countryOfBirth"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["countryOfBirth"], context) :
                null) :
            null;

        context["field"] = "maritalStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["maritalStatus"] : null);
        privateState.maritalStatus = defaultValues ?
            (defaultValues["maritalStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maritalStatus"], context) :
                null) :
            null;

        context["field"] = "reasonForNoCitizenship";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonForNoCitizenship"] : null);
        privateState.reasonForNoCitizenship = defaultValues ?
            (defaultValues["reasonForNoCitizenship"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonForNoCitizenship"], context) :
                null) :
            null;

        context["field"] = "title";
        context["metadata"] = (objectMetadata ? objectMetadata["title"] : null);
        privateState.title = defaultValues ?
            (defaultValues["title"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["title"], context) :
                null) :
            null;

        context["field"] = "organisationLegalType";
        context["metadata"] = (objectMetadata ? objectMetadata["organisationLegalType"] : null);
        privateState.organisationLegalType = defaultValues ?
            (defaultValues["organisationLegalType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["organisationLegalType"], context) :
                null) :
            null;

        context["field"] = "incorporationCountry";
        context["metadata"] = (objectMetadata ? objectMetadata["incorporationCountry"] : null);
        privateState.incorporationCountry = defaultValues ?
            (defaultValues["incorporationCountry"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["incorporationCountry"], context) :
                null) :
            null;

        context["field"] = "dateOfIncorporation";
        context["metadata"] = (objectMetadata ? objectMetadata["dateOfIncorporation"] : null);
        privateState.dateOfIncorporation = defaultValues ?
            (defaultValues["dateOfIncorporation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateOfIncorporation"], context) :
                null) :
            null;

        context["field"] = "nameOfIncorporationAuthority";
        context["metadata"] = (objectMetadata ? objectMetadata["nameOfIncorporationAuthority"] : null);
        privateState.nameOfIncorporationAuthority = defaultValues ?
            (defaultValues["nameOfIncorporationAuthority"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nameOfIncorporationAuthority"], context) :
                null) :
            null;

        context["field"] = "legalForm";
        context["metadata"] = (objectMetadata ? objectMetadata["legalForm"] : null);
        privateState.legalForm = defaultValues ?
            (defaultValues["legalForm"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["legalForm"], context) :
                null) :
            null;

        context["field"] = "numberOfEmployees";
        context["metadata"] = (objectMetadata ? objectMetadata["numberOfEmployees"] : null);
        privateState.numberOfEmployees = defaultValues ?
            (defaultValues["numberOfEmployees"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["numberOfEmployees"], context) :
                null) :
            null;

        context["field"] = "birthProvince";
        context["metadata"] = (objectMetadata ? objectMetadata["birthProvince"] : null);
        privateState.birthProvince = defaultValues ?
            (defaultValues["birthProvince"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["birthProvince"], context) :
                null) :
            null;

        context["field"] = "nationalities";
        context["metadata"] = (objectMetadata ? objectMetadata["nationalities"] : null);
        privateState.nationalities = defaultValues ?
            (defaultValues["nationalities"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nationalities"], context) :
                null) :
            null;

        context["field"] = "country";
        context["metadata"] = (objectMetadata ? objectMetadata["country"] : null);
        privateState.country = defaultValues ?
            (defaultValues["country"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["country"], context) :
                null) :
            null;

        context["field"] = "explanationIfApplies";
        context["metadata"] = (objectMetadata ? objectMetadata["explanationIfApplies"] : null);
        privateState.explanationIfApplies = defaultValues ?
            (defaultValues["explanationIfApplies"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["explanationIfApplies"], context) :
                null) :
            null;

        context["field"] = "language";
        context["metadata"] = (objectMetadata ? objectMetadata["language"] : null);
        privateState.language = defaultValues ?
            (defaultValues["language"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["language"], context) :
                null) :
            null;

        context["field"] = "explanationIfDoesnotApply";
        context["metadata"] = (objectMetadata ? objectMetadata["explanationIfDoesnotApply"] : null);
        privateState.explanationIfDoesnotApply = defaultValues ?
            (defaultValues["explanationIfDoesnotApply"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["explanationIfDoesnotApply"], context) :
                null) :
            null;

        context["field"] = "countryOfCitizenship";
        context["metadata"] = (objectMetadata ? objectMetadata["countryOfCitizenship"] : null);
        privateState.countryOfCitizenship = defaultValues ?
            (defaultValues["countryOfCitizenship"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["countryOfCitizenship"], context) :
                null) :
            null;

        context["field"] = "endDate";
        context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
        privateState.endDate = defaultValues ?
            (defaultValues["endDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["endDate"], context) :
                null) :
            null;

        context["field"] = "doesRiskApply";
        context["metadata"] = (objectMetadata ? objectMetadata["doesRiskApply"] : null);
        privateState.doesRiskApply = defaultValues ?
            (defaultValues["doesRiskApply"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["doesRiskApply"], context) :
                null) :
            null;

        context["field"] = "region";
        context["metadata"] = (objectMetadata ? objectMetadata["region"] : null);
        privateState.region = defaultValues ?
            (defaultValues["region"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["region"], context) :
                null) :
            null;

        context["field"] = "type";
        context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
        privateState.type = defaultValues ?
            (defaultValues["type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["type"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "level";
        context["metadata"] = (objectMetadata ? objectMetadata["level"] : null);
        privateState.level = defaultValues ?
            (defaultValues["level"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["level"], context) :
                null) :
            null;

        context["field"] = "score";
        context["metadata"] = (objectMetadata ? objectMetadata["score"] : null);
        privateState.score = defaultValues ?
            (defaultValues["score"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["score"], context) :
                null) :
            null;

        context["field"] = "body";
        context["metadata"] = (objectMetadata ? objectMetadata["body"] : null);
        privateState.body = defaultValues ?
            (defaultValues["body"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["body"], context) :
                null) :
            null;

        context["field"] = "conclusionDate";
        context["metadata"] = (objectMetadata ? objectMetadata["conclusionDate"] : null);
        privateState.conclusionDate = defaultValues ?
            (defaultValues["conclusionDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["conclusionDate"], context) :
                null) :
            null;

        context["field"] = "details";
        context["metadata"] = (objectMetadata ? objectMetadata["details"] : null);
        privateState.details = defaultValues ?
            (defaultValues["details"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["details"], context) :
                null) :
            null;

        context["field"] = "nature";
        context["metadata"] = (objectMetadata ? objectMetadata["nature"] : null);
        privateState.nature = defaultValues ?
            (defaultValues["nature"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nature"], context) :
                null) :
            null;

        context["field"] = "reason";
        context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
        privateState.reason = defaultValues ?
            (defaultValues["reason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reason"], context) :
                null) :
            null;

        context["field"] = "nextAssessmentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["nextAssessmentDate"] : null);
        privateState.nextAssessmentDate = defaultValues ?
            (defaultValues["nextAssessmentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nextAssessmentDate"], context) :
                null) :
            null;

        context["field"] = "expirydate";
        context["metadata"] = (objectMetadata ? objectMetadata["expirydate"] : null);
        privateState.expirydate = defaultValues ?
            (defaultValues["expirydate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expirydate"], context) :
                null) :
            null;

        context["field"] = "statutoryRequirementMet";
        context["metadata"] = (objectMetadata ? objectMetadata["statutoryRequirementMet"] : null);
        privateState.statutoryRequirementMet = defaultValues ?
            (defaultValues["statutoryRequirementMet"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["statutoryRequirementMet"], context) :
                null) :
            null;

        context["field"] = "issuingAuthority";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingAuthority"] : null);
        privateState.issuingAuthority = defaultValues ?
            (defaultValues["issuingAuthority"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingAuthority"], context) :
                null) :
            null;

        context["field"] = "issuedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["issuedDate"] : null);
        privateState.issuedDate = defaultValues ?
            (defaultValues["issuedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuedDate"], context) :
                null) :
            null;

        context["field"] = "issuingCountry";
        context["metadata"] = (objectMetadata ? objectMetadata["issuingCountry"] : null);
        privateState.issuingCountry = defaultValues ?
            (defaultValues["issuingCountry"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issuingCountry"], context) :
                null) :
            null;

        context["field"] = "holderName";
        context["metadata"] = (objectMetadata ? objectMetadata["holderName"] : null);
        privateState.holderName = defaultValues ?
            (defaultValues["holderName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["holderName"], context) :
                null) :
            null;

        context["field"] = "documentTagId";
        context["metadata"] = (objectMetadata ? objectMetadata["documentTagId"] : null);
        privateState.documentTagId = defaultValues ?
            (defaultValues["documentTagId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentTagId"], context) :
                null) :
            null;

        context["field"] = "alternateIdentities";
        context["metadata"] = (objectMetadata ? objectMetadata["alternateIdentities"] : null);
        privateState.alternateIdentities = defaultValues ?
            (defaultValues["alternateIdentities"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["alternateIdentities"], context) :
                null) :
            null;

        context["field"] = "identitySource";
        context["metadata"] = (objectMetadata ? objectMetadata["identitySource"] : null);
        privateState.identitySource = defaultValues ?
            (defaultValues["identitySource"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["identitySource"], context) :
                null) :
            null;

        context["field"] = "statusComments";
        context["metadata"] = (objectMetadata ? objectMetadata["statusComments"] : null);
        privateState.statusComments = defaultValues ?
            (defaultValues["statusComments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["statusComments"], context) :
                null) :
            null;

        context["field"] = "personPositionType";
        context["metadata"] = (objectMetadata ? objectMetadata["personPositionType"] : null);
        privateState.personPositionType = defaultValues ?
            (defaultValues["personPositionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["personPositionType"], context) :
                null) :
            null;

        context["field"] = "countryOfPosition";
        context["metadata"] = (objectMetadata ? objectMetadata["countryOfPosition"] : null);
        privateState.countryOfPosition = defaultValues ?
            (defaultValues["countryOfPosition"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["countryOfPosition"], context) :
                null) :
            null;

        context["field"] = "effectiveFromDate";
        context["metadata"] = (objectMetadata ? objectMetadata["effectiveFromDate"] : null);
        privateState.effectiveFromDate = defaultValues ?
            (defaultValues["effectiveFromDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["effectiveFromDate"], context) :
                null) :
            null;

        context["field"] = "effectiveToDate";
        context["metadata"] = (objectMetadata ? objectMetadata["effectiveToDate"] : null);
        privateState.effectiveToDate = defaultValues ?
            (defaultValues["effectiveToDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["effectiveToDate"], context) :
                null) :
            null;

        context["field"] = "comments";
        context["metadata"] = (objectMetadata ? objectMetadata["comments"] : null);
        privateState.comments = defaultValues ?
            (defaultValues["comments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["comments"], context) :
                null) :
            null;

        context["field"] = "lastUpdated";
        context["metadata"] = (objectMetadata ? objectMetadata["lastUpdated"] : null);
        privateState.lastUpdated = defaultValues ?
            (defaultValues["lastUpdated"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastUpdated"], context) :
                null) :
            null;

        context["field"] = "informationSource";
        context["metadata"] = (objectMetadata ? objectMetadata["informationSource"] : null);
        privateState.informationSource = defaultValues ?
            (defaultValues["informationSource"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["informationSource"], context) :
                null) :
            null;

        context["field"] = "vulnerabilities";
        context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilities"] : null);
        privateState.vulnerabilities = defaultValues ?
            (defaultValues["vulnerabilities"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vulnerabilities"], context) :
                null) :
            null;

        context["field"] = "changeReason";
        context["metadata"] = (objectMetadata ? objectMetadata["changeReason"] : null);
        privateState.changeReason = defaultValues ?
            (defaultValues["changeReason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["changeReason"], context) :
                null) :
            null;

        context["field"] = "occupationType";
        context["metadata"] = (objectMetadata ? objectMetadata["occupationType"] : null);
        privateState.occupationType = defaultValues ?
            (defaultValues["occupationType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["occupationType"], context) :
                null) :
            null;

        context["field"] = "occupationDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["occupationDescription"] : null);
        privateState.occupationDescription = defaultValues ?
            (defaultValues["occupationDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["occupationDescription"], context) :
                null) :
            null;

        context["field"] = "vulnerabilityType";
        context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilityType"] : null);
        privateState.vulnerabilityType = defaultValues ?
            (defaultValues["vulnerabilityType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vulnerabilityType"], context) :
                null) :
            null;

        context["field"] = "employmentReference";
        context["metadata"] = (objectMetadata ? objectMetadata["employmentReference"] : null);
        privateState.employmentReference = defaultValues ?
            (defaultValues["employmentReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["employmentReference"], context) :
                null) :
            null;

        context["field"] = "jobTitle";
        context["metadata"] = (objectMetadata ? objectMetadata["jobTitle"] : null);
        privateState.jobTitle = defaultValues ?
            (defaultValues["jobTitle"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["jobTitle"], context) :
                null) :
            null;

        context["field"] = "employerName";
        context["metadata"] = (objectMetadata ? objectMetadata["employerName"] : null);
        privateState.employerName = defaultValues ?
            (defaultValues["employerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["employerName"], context) :
                null) :
            null;

        context["field"] = "employerSegment";
        context["metadata"] = (objectMetadata ? objectMetadata["employerSegment"] : null);
        privateState.employerSegment = defaultValues ?
            (defaultValues["employerSegment"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["employerSegment"], context) :
                null) :
            null;

        context["field"] = "employerOfficePhoneIdd";
        context["metadata"] = (objectMetadata ? objectMetadata["employerOfficePhoneIdd"] : null);
        privateState.employerOfficePhoneIdd = defaultValues ?
            (defaultValues["employerOfficePhoneIdd"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["employerOfficePhoneIdd"], context) :
                null) :
            null;

        context["field"] = "employerOfficePhone";
        context["metadata"] = (objectMetadata ? objectMetadata["employerOfficePhone"] : null);
        privateState.employerOfficePhone = defaultValues ?
            (defaultValues["employerOfficePhone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["employerOfficePhone"], context) :
                null) :
            null;

        context["field"] = "employerOfficeEmail";
        context["metadata"] = (objectMetadata ? objectMetadata["employerOfficeEmail"] : null);
        privateState.employerOfficeEmail = defaultValues ?
            (defaultValues["employerOfficeEmail"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["employerOfficeEmail"], context) :
                null) :
            null;

        context["field"] = "salary";
        context["metadata"] = (objectMetadata ? objectMetadata["salary"] : null);
        privateState.salary = defaultValues ?
            (defaultValues["salary"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["salary"], context) :
                null) :
            null;

        context["field"] = "salaryInCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["salaryInCurrency"] : null);
        privateState.salaryInCurrency = defaultValues ?
            (defaultValues["salaryInCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["salaryInCurrency"], context) :
                null) :
            null;

        context["field"] = "salaryFrequency";
        context["metadata"] = (objectMetadata ? objectMetadata["salaryFrequency"] : null);
        privateState.salaryFrequency = defaultValues ?
            (defaultValues["salaryFrequency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["salaryFrequency"], context) :
                null) :
            null;

        context["field"] = "primaryEmployment";
        context["metadata"] = (objectMetadata ? objectMetadata["primaryEmployment"] : null);
        privateState.primaryEmployment = defaultValues ?
            (defaultValues["primaryEmployment"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["primaryEmployment"], context) :
                null) :
            null;

        context["field"] = "vulnerabilityComments";
        context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilityComments"] : null);
        privateState.vulnerabilityComments = defaultValues ?
            (defaultValues["vulnerabilityComments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vulnerabilityComments"], context) :
                null) :
            null;

        context["field"] = "taxReference";
        context["metadata"] = (objectMetadata ? objectMetadata["taxReference"] : null);
        privateState.taxReference = defaultValues ?
            (defaultValues["taxReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxReference"], context) :
                null) :
            null;

        context["field"] = "taxType";
        context["metadata"] = (objectMetadata ? objectMetadata["taxType"] : null);
        privateState.taxType = defaultValues ?
            (defaultValues["taxType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxType"], context) :
                null) :
            null;

        context["field"] = "taxId";
        context["metadata"] = (objectMetadata ? objectMetadata["taxId"] : null);
        privateState.taxId = defaultValues ?
            (defaultValues["taxId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxId"], context) :
                null) :
            null;

        context["field"] = "eligibilityType";
        context["metadata"] = (objectMetadata ? objectMetadata["eligibilityType"] : null);
        privateState.eligibilityType = defaultValues ?
            (defaultValues["eligibilityType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["eligibilityType"], context) :
                null) :
            null;

        context["field"] = "eligibilityReason";
        context["metadata"] = (objectMetadata ? objectMetadata["eligibilityReason"] : null);
        privateState.eligibilityReason = defaultValues ?
            (defaultValues["eligibilityReason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["eligibilityReason"], context) :
                null) :
            null;

        context["field"] = "taxStartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["taxStartDate"] : null);
        privateState.taxStartDate = defaultValues ?
            (defaultValues["taxStartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxStartDate"], context) :
                null) :
            null;

        context["field"] = "taxReasonType";
        context["metadata"] = (objectMetadata ? objectMetadata["taxReasonType"] : null);
        privateState.taxReasonType = defaultValues ?
            (defaultValues["taxReasonType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxReasonType"], context) :
                null) :
            null;

        context["field"] = "taxReasonComment";
        context["metadata"] = (objectMetadata ? objectMetadata["taxReasonComment"] : null);
        privateState.taxReasonComment = defaultValues ?
            (defaultValues["taxReasonComment"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxReasonComment"], context) :
                null) :
            null;

        context["field"] = "taxIdLackReason";
        context["metadata"] = (objectMetadata ? objectMetadata["taxIdLackReason"] : null);
        privateState.taxIdLackReason = defaultValues ?
            (defaultValues["taxIdLackReason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxIdLackReason"], context) :
                null) :
            null;

        context["field"] = "isMainTaxResidency";
        context["metadata"] = (objectMetadata ? objectMetadata["isMainTaxResidency"] : null);
        privateState.isMainTaxResidency = defaultValues ?
            (defaultValues["isMainTaxResidency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isMainTaxResidency"], context) :
                null) :
            null;

        context["field"] = "taxDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["taxDetails"] : null);
        privateState.taxDetails = defaultValues ?
            (defaultValues["taxDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["taxDetails"], context) :
                null) :
            null;

        context["field"] = "otherNames";
        context["metadata"] = (objectMetadata ? objectMetadata["otherNames"] : null);
        privateState.otherNames = defaultValues ?
            (defaultValues["otherNames"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherNames"], context) :
                null) :
            null;

        context["field"] = "name";
        context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
        privateState.name = defaultValues ?
            (defaultValues["name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["name"], context) :
                null) :
            null;

        context["field"] = "nameLanguage";
        context["metadata"] = (objectMetadata ? objectMetadata["nameLanguage"] : null);
        privateState.nameLanguage = defaultValues ?
            (defaultValues["nameLanguage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nameLanguage"], context) :
                null) :
            null;

        context["field"] = "toDate";
        context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
        privateState.toDate = defaultValues ?
            (defaultValues["toDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toDate"], context) :
                null) :
            null;

        context["field"] = "observations";
        context["metadata"] = (objectMetadata ? objectMetadata["observations"] : null);
        privateState.observations = defaultValues ?
            (defaultValues["observations"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["observations"], context) :
                null) :
            null;

        context["field"] = "observationReference";
        context["metadata"] = (objectMetadata ? objectMetadata["observationReference"] : null);
        privateState.observationReference = defaultValues ?
            (defaultValues["observationReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["observationReference"], context) :
                null) :
            null;

        context["field"] = "observationDate";
        context["metadata"] = (objectMetadata ? objectMetadata["observationDate"] : null);
        privateState.observationDate = defaultValues ?
            (defaultValues["observationDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["observationDate"], context) :
                null) :
            null;

        context["field"] = "detail";
        context["metadata"] = (objectMetadata ? objectMetadata["detail"] : null);
        privateState.detail = defaultValues ?
            (defaultValues["detail"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["detail"], context) :
                null) :
            null;

        context["field"] = "website";
        context["metadata"] = (objectMetadata ? objectMetadata["website"] : null);
        privateState.website = defaultValues ?
            (defaultValues["website"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["website"], context) :
                null) :
            null;

        context["field"] = "source";
        context["metadata"] = (objectMetadata ? objectMetadata["source"] : null);
        privateState.source = defaultValues ?
            (defaultValues["source"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["source"], context) :
                null) :
            null;

        context["field"] = "observedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["observedBy"] : null);
        privateState.observedBy = defaultValues ?
            (defaultValues["observedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["observedBy"], context) :
                null) :
            null;

        context["field"] = "partyLegalStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["partyLegalStatus"] : null);
        privateState.partyLegalStatus = defaultValues ?
            (defaultValues["partyLegalStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyLegalStatus"], context) :
                null) :
            null;

        context["field"] = "effectiveFrom";
        context["metadata"] = (objectMetadata ? objectMetadata["effectiveFrom"] : null);
        privateState.effectiveFrom = defaultValues ?
            (defaultValues["effectiveFrom"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["effectiveFrom"], context) :
                null) :
            null;

        context["field"] = "effectiveTo";
        context["metadata"] = (objectMetadata ? objectMetadata["effectiveTo"] : null);
        privateState.effectiveTo = defaultValues ?
            (defaultValues["effectiveTo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["effectiveTo"], context) :
                null) :
            null;

        context["field"] = "addressFreeFormat";
        context["metadata"] = (objectMetadata ? objectMetadata["addressFreeFormat"] : null);
        privateState.addressFreeFormat = defaultValues ?
            (defaultValues["addressFreeFormat"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addressFreeFormat"], context) :
                null) :
            null;

        context["field"] = "roles";
        context["metadata"] = (objectMetadata ? objectMetadata["roles"] : null);
        privateState.roles = defaultValues ?
            (defaultValues["roles"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["roles"], context) :
                null) :
            null;

        context["field"] = "roleType";
        context["metadata"] = (objectMetadata ? objectMetadata["roleType"] : null);
        privateState.roleType = defaultValues ?
            (defaultValues["roleType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["roleType"], context) :
                null) :
            null;

        context["field"] = "fromDate";
        context["metadata"] = (objectMetadata ? objectMetadata["fromDate"] : null);
        privateState.fromDate = defaultValues ?
            (defaultValues["fromDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromDate"], context) :
                null) :
            null;

        context["field"] = "exitDate";
        context["metadata"] = (objectMetadata ? objectMetadata["exitDate"] : null);
        privateState.exitDate = defaultValues ?
            (defaultValues["exitDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exitDate"], context) :
                null) :
            null;

        context["field"] = "exitReason";
        context["metadata"] = (objectMetadata ? objectMetadata["exitReason"] : null);
        privateState.exitReason = defaultValues ?
            (defaultValues["exitReason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exitReason"], context) :
                null) :
            null;

        context["field"] = "decisionBody";
        context["metadata"] = (objectMetadata ? objectMetadata["decisionBody"] : null);
        privateState.decisionBody = defaultValues ?
            (defaultValues["decisionBody"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["decisionBody"], context) :
                null) :
            null;

        context["field"] = "contactReferences";
        context["metadata"] = (objectMetadata ? objectMetadata["contactReferences"] : null);
        privateState.contactReferences = defaultValues ?
            (defaultValues["contactReferences"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["contactReferences"], context) :
                null) :
            null;

        context["field"] = "customerships";
        context["metadata"] = (objectMetadata ? objectMetadata["customerships"] : null);
        privateState.customerships = defaultValues ?
            (defaultValues["customerships"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerships"], context) :
                null) :
            null;

        context["field"] = "responsibleUnits";
        context["metadata"] = (objectMetadata ? objectMetadata["responsibleUnits"] : null);
        privateState.responsibleUnits = defaultValues ?
            (defaultValues["responsibleUnits"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["responsibleUnits"], context) :
                null) :
            null;

        context["field"] = "responsibleUnitType";
        context["metadata"] = (objectMetadata ? objectMetadata["responsibleUnitType"] : null);
        privateState.responsibleUnitType = defaultValues ?
            (defaultValues["responsibleUnitType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["responsibleUnitType"], context) :
                null) :
            null;

        context["field"] = "businessUnit";
        context["metadata"] = (objectMetadata ? objectMetadata["businessUnit"] : null);
        privateState.businessUnit = defaultValues ?
            (defaultValues["businessUnit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["businessUnit"], context) :
                null) :
            null;

        context["field"] = "relationshipOfficer";
        context["metadata"] = (objectMetadata ? objectMetadata["relationshipOfficer"] : null);
        privateState.relationshipOfficer = defaultValues ?
            (defaultValues["relationshipOfficer"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["relationshipOfficer"], context) :
                null) :
            null;

        context["field"] = "classifications";
        context["metadata"] = (objectMetadata ? objectMetadata["classifications"] : null);
        privateState.classifications = defaultValues ?
            (defaultValues["classifications"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["classifications"], context) :
                null) :
            null;

        context["field"] = "classificationCode";
        context["metadata"] = (objectMetadata ? objectMetadata["classificationCode"] : null);
        privateState.classificationCode = defaultValues ?
            (defaultValues["classificationCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["classificationCode"], context) :
                null) :
            null;

        context["field"] = "classificationDate";
        context["metadata"] = (objectMetadata ? objectMetadata["classificationDate"] : null);
        privateState.classificationDate = defaultValues ?
            (defaultValues["classificationDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["classificationDate"], context) :
                null) :
            null;

        context["field"] = "coreCustomerId";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
        privateState.coreCustomerId = defaultValues ?
            (defaultValues["coreCustomerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerId"], context) :
                null) :
            null;

        context["field"] = "isEnrolled";
        context["metadata"] = (objectMetadata ? objectMetadata["isEnrolled"] : null);
        privateState.isEnrolled = defaultValues ?
            (defaultValues["isEnrolled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEnrolled"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "partyStatus": {
                get: function() {
                    context["field"] = "partyStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyStatus, context);
                },
                set: function(val) {
                    setterFunctions['partyStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contactAddresss": {
                get: function() {
                    context["field"] = "contactAddresss";
                    context["metadata"] = (objectMetadata ? objectMetadata["contactAddresss"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contactAddresss, context);
                },
                set: function(val) {
                    setterFunctions['contactAddresss'].call(this, val, privateState);
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
            "employments": {
                get: function() {
                    context["field"] = "employments";
                    context["metadata"] = (objectMetadata ? objectMetadata["employments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.employments, context);
                },
                set: function(val) {
                    setterFunctions['employments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyType": {
                get: function() {
                    context["field"] = "partyType";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyType, context);
                },
                set: function(val) {
                    setterFunctions['partyType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "emailId": {
                get: function() {
                    context["field"] = "emailId";
                    context["metadata"] = (objectMetadata ? objectMetadata["emailId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.emailId, context);
                },
                set: function(val) {
                    setterFunctions['emailId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "occupations": {
                get: function() {
                    context["field"] = "occupations";
                    context["metadata"] = (objectMetadata ? objectMetadata["occupations"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.occupations, context);
                },
                set: function(val) {
                    setterFunctions['occupations'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "extensionData": {
                get: function() {
                    context["field"] = "extensionData";
                    context["metadata"] = (objectMetadata ? objectMetadata["extensionData"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.extensionData, context);
                },
                set: function(val) {
                    setterFunctions['extensionData'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "taxDetailss": {
                get: function() {
                    context["field"] = "taxDetailss";
                    context["metadata"] = (objectMetadata ? objectMetadata["taxDetailss"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.taxDetailss, context);
                },
                set: function(val) {
                    setterFunctions['taxDetailss'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "citizenships": {
                get: function() {
                    context["field"] = "citizenships";
                    context["metadata"] = (objectMetadata ? objectMetadata["citizenships"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.citizenships, context);
                },
                set: function(val) {
                    setterFunctions['citizenships'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nationalitys": {
                get: function() {
                    context["field"] = "nationalitys";
                    context["metadata"] = (objectMetadata ? objectMetadata["nationalitys"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nationalitys, context);
                },
                set: function(val) {
                    setterFunctions['nationalitys'].call(this, val, privateState);
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
            "residences": {
                get: function() {
                    context["field"] = "residences";
                    context["metadata"] = (objectMetadata ? objectMetadata["residences"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.residences, context);
                },
                set: function(val) {
                    setterFunctions['residences'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vulnerabilitys": {
                get: function() {
                    context["field"] = "vulnerabilitys";
                    context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilitys"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vulnerabilitys, context);
                },
                set: function(val) {
                    setterFunctions['vulnerabilitys'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyLifeCycles": {
                get: function() {
                    context["field"] = "partyLifeCycles";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyLifeCycles"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyLifeCycles, context);
                },
                set: function(val) {
                    setterFunctions['partyLifeCycles'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyNamess": {
                get: function() {
                    context["field"] = "partyNamess";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyNamess"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyNamess, context);
                },
                set: function(val) {
                    setterFunctions['partyNamess'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyLanguages": {
                get: function() {
                    context["field"] = "partyLanguages";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyLanguages"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyLanguages, context);
                },
                set: function(val) {
                    setterFunctions['partyLanguages'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otherRiskIndicators": {
                get: function() {
                    context["field"] = "otherRiskIndicators";
                    context["metadata"] = (objectMetadata ? objectMetadata["otherRiskIndicators"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otherRiskIndicators, context);
                },
                set: function(val) {
                    setterFunctions['otherRiskIndicators'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "personPositions": {
                get: function() {
                    context["field"] = "personPositions";
                    context["metadata"] = (objectMetadata ? objectMetadata["personPositions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.personPositions, context);
                },
                set: function(val) {
                    setterFunctions['personPositions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyIdentifiers": {
                get: function() {
                    context["field"] = "partyIdentifiers";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyIdentifiers"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyIdentifiers, context);
                },
                set: function(val) {
                    setterFunctions['partyIdentifiers'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyAssessments": {
                get: function() {
                    context["field"] = "partyAssessments";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyAssessments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyAssessments, context);
                },
                set: function(val) {
                    setterFunctions['partyAssessments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "phoneAddress": {
                get: function() {
                    context["field"] = "phoneAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["phoneAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.phoneAddress, context);
                },
                set: function(val) {
                    setterFunctions['phoneAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "electronicAddress": {
                get: function() {
                    context["field"] = "electronicAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["electronicAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.electronicAddress, context);
                },
                set: function(val) {
                    setterFunctions['electronicAddress'].call(this, val, privateState);
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
            "createStatus": {
                get: function() {
                    context["field"] = "createStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["createStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createStatus, context);
                },
                set: function(val) {
                    setterFunctions['createStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "updateStatus": {
                get: function() {
                    context["field"] = "updateStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["updateStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.updateStatus, context);
                },
                set: function(val) {
                    setterFunctions['updateStatus'].call(this, val, privateState);
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
            "partyNames": {
                get: function() {
                    context["field"] = "partyNames";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyNames"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyNames, context);
                },
                set: function(val) {
                    setterFunctions['partyNames'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contactAddress": {
                get: function() {
                    context["field"] = "contactAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["contactAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contactAddress, context);
                },
                set: function(val) {
                    setterFunctions['contactAddress'].call(this, val, privateState);
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
            "addresses": {
                get: function() {
                    context["field"] = "addresses";
                    context["metadata"] = (objectMetadata ? objectMetadata["addresses"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addresses, context);
                },
                set: function(val) {
                    setterFunctions['addresses'].call(this, val, privateState);
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
            "defaultLanguage": {
                get: function() {
                    context["field"] = "defaultLanguage";
                    context["metadata"] = (objectMetadata ? objectMetadata["defaultLanguage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.defaultLanguage, context);
                },
                set: function(val) {
                    setterFunctions['defaultLanguage'].call(this, val, privateState);
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
            "nickName": {
                get: function() {
                    context["field"] = "nickName";
                    context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nickName, context);
                },
                set: function(val) {
                    setterFunctions['nickName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "suffix": {
                get: function() {
                    context["field"] = "suffix";
                    context["metadata"] = (objectMetadata ? objectMetadata["suffix"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.suffix, context);
                },
                set: function(val) {
                    setterFunctions['suffix'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "alias": {
                get: function() {
                    context["field"] = "alias";
                    context["metadata"] = (objectMetadata ? objectMetadata["alias"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.alias, context);
                },
                set: function(val) {
                    setterFunctions['alias'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nameStartDate": {
                get: function() {
                    context["field"] = "nameStartDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["nameStartDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nameStartDate, context);
                },
                set: function(val) {
                    setterFunctions['nameStartDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "identifierNumber": {
                get: function() {
                    context["field"] = "identifierNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["identifierNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.identifierNumber, context);
                },
                set: function(val) {
                    setterFunctions['identifierNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "identifierType": {
                get: function() {
                    context["field"] = "identifierType";
                    context["metadata"] = (objectMetadata ? objectMetadata["identifierType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.identifierType, context);
                },
                set: function(val) {
                    setterFunctions['identifierType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "alternateIdentifierNumber": {
                get: function() {
                    context["field"] = "alternateIdentifierNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["alternateIdentifierNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.alternateIdentifierNumber, context);
                },
                set: function(val) {
                    setterFunctions['alternateIdentifierNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "alternateIdentifierType": {
                get: function() {
                    context["field"] = "alternateIdentifierType";
                    context["metadata"] = (objectMetadata ? objectMetadata["alternateIdentifierType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.alternateIdentifierType, context);
                },
                set: function(val) {
                    setterFunctions['alternateIdentifierType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contactNumber": {
                get: function() {
                    context["field"] = "contactNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["contactNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contactNumber, context);
                },
                set: function(val) {
                    setterFunctions['contactNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "entityName": {
                get: function() {
                    context["field"] = "entityName";
                    context["metadata"] = (objectMetadata ? objectMetadata["entityName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.entityName, context);
                },
                set: function(val) {
                    setterFunctions['entityName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recordCount": {
                get: function() {
                    context["field"] = "recordCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["recordCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recordCount, context);
                },
                set: function(val) {
                    setterFunctions['recordCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateOfDeath": {
                get: function() {
                    context["field"] = "dateOfDeath";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateOfDeath"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateOfDeath, context);
                },
                set: function(val) {
                    setterFunctions['dateOfDeath'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "notificationOfDeath": {
                get: function() {
                    context["field"] = "notificationOfDeath";
                    context["metadata"] = (objectMetadata ? objectMetadata["notificationOfDeath"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.notificationOfDeath, context);
                },
                set: function(val) {
                    setterFunctions['notificationOfDeath'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cityOfBirth": {
                get: function() {
                    context["field"] = "cityOfBirth";
                    context["metadata"] = (objectMetadata ? objectMetadata["cityOfBirth"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cityOfBirth, context);
                },
                set: function(val) {
                    setterFunctions['cityOfBirth'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "countryOfBirth": {
                get: function() {
                    context["field"] = "countryOfBirth";
                    context["metadata"] = (objectMetadata ? objectMetadata["countryOfBirth"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.countryOfBirth, context);
                },
                set: function(val) {
                    setterFunctions['countryOfBirth'].call(this, val, privateState);
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
            "reasonForNoCitizenship": {
                get: function() {
                    context["field"] = "reasonForNoCitizenship";
                    context["metadata"] = (objectMetadata ? objectMetadata["reasonForNoCitizenship"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reasonForNoCitizenship, context);
                },
                set: function(val) {
                    setterFunctions['reasonForNoCitizenship'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "title": {
                get: function() {
                    context["field"] = "title";
                    context["metadata"] = (objectMetadata ? objectMetadata["title"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.title, context);
                },
                set: function(val) {
                    setterFunctions['title'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "organisationLegalType": {
                get: function() {
                    context["field"] = "organisationLegalType";
                    context["metadata"] = (objectMetadata ? objectMetadata["organisationLegalType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.organisationLegalType, context);
                },
                set: function(val) {
                    setterFunctions['organisationLegalType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "incorporationCountry": {
                get: function() {
                    context["field"] = "incorporationCountry";
                    context["metadata"] = (objectMetadata ? objectMetadata["incorporationCountry"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.incorporationCountry, context);
                },
                set: function(val) {
                    setterFunctions['incorporationCountry'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateOfIncorporation": {
                get: function() {
                    context["field"] = "dateOfIncorporation";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateOfIncorporation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateOfIncorporation, context);
                },
                set: function(val) {
                    setterFunctions['dateOfIncorporation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nameOfIncorporationAuthority": {
                get: function() {
                    context["field"] = "nameOfIncorporationAuthority";
                    context["metadata"] = (objectMetadata ? objectMetadata["nameOfIncorporationAuthority"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nameOfIncorporationAuthority, context);
                },
                set: function(val) {
                    setterFunctions['nameOfIncorporationAuthority'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "legalForm": {
                get: function() {
                    context["field"] = "legalForm";
                    context["metadata"] = (objectMetadata ? objectMetadata["legalForm"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.legalForm, context);
                },
                set: function(val) {
                    setterFunctions['legalForm'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "numberOfEmployees": {
                get: function() {
                    context["field"] = "numberOfEmployees";
                    context["metadata"] = (objectMetadata ? objectMetadata["numberOfEmployees"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.numberOfEmployees, context);
                },
                set: function(val) {
                    setterFunctions['numberOfEmployees'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "birthProvince": {
                get: function() {
                    context["field"] = "birthProvince";
                    context["metadata"] = (objectMetadata ? objectMetadata["birthProvince"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.birthProvince, context);
                },
                set: function(val) {
                    setterFunctions['birthProvince'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nationalities": {
                get: function() {
                    context["field"] = "nationalities";
                    context["metadata"] = (objectMetadata ? objectMetadata["nationalities"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nationalities, context);
                },
                set: function(val) {
                    setterFunctions['nationalities'].call(this, val, privateState);
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
            "explanationIfApplies": {
                get: function() {
                    context["field"] = "explanationIfApplies";
                    context["metadata"] = (objectMetadata ? objectMetadata["explanationIfApplies"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.explanationIfApplies, context);
                },
                set: function(val) {
                    setterFunctions['explanationIfApplies'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "language": {
                get: function() {
                    context["field"] = "language";
                    context["metadata"] = (objectMetadata ? objectMetadata["language"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.language, context);
                },
                set: function(val) {
                    setterFunctions['language'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "explanationIfDoesnotApply": {
                get: function() {
                    context["field"] = "explanationIfDoesnotApply";
                    context["metadata"] = (objectMetadata ? objectMetadata["explanationIfDoesnotApply"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.explanationIfDoesnotApply, context);
                },
                set: function(val) {
                    setterFunctions['explanationIfDoesnotApply'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "countryOfCitizenship": {
                get: function() {
                    context["field"] = "countryOfCitizenship";
                    context["metadata"] = (objectMetadata ? objectMetadata["countryOfCitizenship"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.countryOfCitizenship, context);
                },
                set: function(val) {
                    setterFunctions['countryOfCitizenship'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "endDate": {
                get: function() {
                    context["field"] = "endDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.endDate, context);
                },
                set: function(val) {
                    setterFunctions['endDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "doesRiskApply": {
                get: function() {
                    context["field"] = "doesRiskApply";
                    context["metadata"] = (objectMetadata ? objectMetadata["doesRiskApply"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.doesRiskApply, context);
                },
                set: function(val) {
                    setterFunctions['doesRiskApply'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "region": {
                get: function() {
                    context["field"] = "region";
                    context["metadata"] = (objectMetadata ? objectMetadata["region"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.region, context);
                },
                set: function(val) {
                    setterFunctions['region'].call(this, val, privateState);
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
            "level": {
                get: function() {
                    context["field"] = "level";
                    context["metadata"] = (objectMetadata ? objectMetadata["level"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.level, context);
                },
                set: function(val) {
                    setterFunctions['level'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "score": {
                get: function() {
                    context["field"] = "score";
                    context["metadata"] = (objectMetadata ? objectMetadata["score"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.score, context);
                },
                set: function(val) {
                    setterFunctions['score'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "body": {
                get: function() {
                    context["field"] = "body";
                    context["metadata"] = (objectMetadata ? objectMetadata["body"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.body, context);
                },
                set: function(val) {
                    setterFunctions['body'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "conclusionDate": {
                get: function() {
                    context["field"] = "conclusionDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["conclusionDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.conclusionDate, context);
                },
                set: function(val) {
                    setterFunctions['conclusionDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "details": {
                get: function() {
                    context["field"] = "details";
                    context["metadata"] = (objectMetadata ? objectMetadata["details"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.details, context);
                },
                set: function(val) {
                    setterFunctions['details'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nature": {
                get: function() {
                    context["field"] = "nature";
                    context["metadata"] = (objectMetadata ? objectMetadata["nature"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nature, context);
                },
                set: function(val) {
                    setterFunctions['nature'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reason": {
                get: function() {
                    context["field"] = "reason";
                    context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reason, context);
                },
                set: function(val) {
                    setterFunctions['reason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nextAssessmentDate": {
                get: function() {
                    context["field"] = "nextAssessmentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["nextAssessmentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nextAssessmentDate, context);
                },
                set: function(val) {
                    setterFunctions['nextAssessmentDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expirydate": {
                get: function() {
                    context["field"] = "expirydate";
                    context["metadata"] = (objectMetadata ? objectMetadata["expirydate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expirydate, context);
                },
                set: function(val) {
                    setterFunctions['expirydate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "statutoryRequirementMet": {
                get: function() {
                    context["field"] = "statutoryRequirementMet";
                    context["metadata"] = (objectMetadata ? objectMetadata["statutoryRequirementMet"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.statutoryRequirementMet, context);
                },
                set: function(val) {
                    setterFunctions['statutoryRequirementMet'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuingAuthority": {
                get: function() {
                    context["field"] = "issuingAuthority";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuingAuthority"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuingAuthority, context);
                },
                set: function(val) {
                    setterFunctions['issuingAuthority'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuedDate": {
                get: function() {
                    context["field"] = "issuedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuedDate, context);
                },
                set: function(val) {
                    setterFunctions['issuedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issuingCountry": {
                get: function() {
                    context["field"] = "issuingCountry";
                    context["metadata"] = (objectMetadata ? objectMetadata["issuingCountry"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issuingCountry, context);
                },
                set: function(val) {
                    setterFunctions['issuingCountry'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "holderName": {
                get: function() {
                    context["field"] = "holderName";
                    context["metadata"] = (objectMetadata ? objectMetadata["holderName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.holderName, context);
                },
                set: function(val) {
                    setterFunctions['holderName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentTagId": {
                get: function() {
                    context["field"] = "documentTagId";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentTagId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentTagId, context);
                },
                set: function(val) {
                    setterFunctions['documentTagId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "alternateIdentities": {
                get: function() {
                    context["field"] = "alternateIdentities";
                    context["metadata"] = (objectMetadata ? objectMetadata["alternateIdentities"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.alternateIdentities, context);
                },
                set: function(val) {
                    setterFunctions['alternateIdentities'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "identitySource": {
                get: function() {
                    context["field"] = "identitySource";
                    context["metadata"] = (objectMetadata ? objectMetadata["identitySource"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.identitySource, context);
                },
                set: function(val) {
                    setterFunctions['identitySource'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "statusComments": {
                get: function() {
                    context["field"] = "statusComments";
                    context["metadata"] = (objectMetadata ? objectMetadata["statusComments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.statusComments, context);
                },
                set: function(val) {
                    setterFunctions['statusComments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "personPositionType": {
                get: function() {
                    context["field"] = "personPositionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["personPositionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.personPositionType, context);
                },
                set: function(val) {
                    setterFunctions['personPositionType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "countryOfPosition": {
                get: function() {
                    context["field"] = "countryOfPosition";
                    context["metadata"] = (objectMetadata ? objectMetadata["countryOfPosition"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.countryOfPosition, context);
                },
                set: function(val) {
                    setterFunctions['countryOfPosition'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "effectiveFromDate": {
                get: function() {
                    context["field"] = "effectiveFromDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["effectiveFromDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.effectiveFromDate, context);
                },
                set: function(val) {
                    setterFunctions['effectiveFromDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "effectiveToDate": {
                get: function() {
                    context["field"] = "effectiveToDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["effectiveToDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.effectiveToDate, context);
                },
                set: function(val) {
                    setterFunctions['effectiveToDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "comments": {
                get: function() {
                    context["field"] = "comments";
                    context["metadata"] = (objectMetadata ? objectMetadata["comments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.comments, context);
                },
                set: function(val) {
                    setterFunctions['comments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastUpdated": {
                get: function() {
                    context["field"] = "lastUpdated";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastUpdated"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastUpdated, context);
                },
                set: function(val) {
                    setterFunctions['lastUpdated'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "informationSource": {
                get: function() {
                    context["field"] = "informationSource";
                    context["metadata"] = (objectMetadata ? objectMetadata["informationSource"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.informationSource, context);
                },
                set: function(val) {
                    setterFunctions['informationSource'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vulnerabilities": {
                get: function() {
                    context["field"] = "vulnerabilities";
                    context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilities"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vulnerabilities, context);
                },
                set: function(val) {
                    setterFunctions['vulnerabilities'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "changeReason": {
                get: function() {
                    context["field"] = "changeReason";
                    context["metadata"] = (objectMetadata ? objectMetadata["changeReason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.changeReason, context);
                },
                set: function(val) {
                    setterFunctions['changeReason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "occupationType": {
                get: function() {
                    context["field"] = "occupationType";
                    context["metadata"] = (objectMetadata ? objectMetadata["occupationType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.occupationType, context);
                },
                set: function(val) {
                    setterFunctions['occupationType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "occupationDescription": {
                get: function() {
                    context["field"] = "occupationDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["occupationDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.occupationDescription, context);
                },
                set: function(val) {
                    setterFunctions['occupationDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vulnerabilityType": {
                get: function() {
                    context["field"] = "vulnerabilityType";
                    context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilityType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vulnerabilityType, context);
                },
                set: function(val) {
                    setterFunctions['vulnerabilityType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "employmentReference": {
                get: function() {
                    context["field"] = "employmentReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["employmentReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.employmentReference, context);
                },
                set: function(val) {
                    setterFunctions['employmentReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "jobTitle": {
                get: function() {
                    context["field"] = "jobTitle";
                    context["metadata"] = (objectMetadata ? objectMetadata["jobTitle"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.jobTitle, context);
                },
                set: function(val) {
                    setterFunctions['jobTitle'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "employerName": {
                get: function() {
                    context["field"] = "employerName";
                    context["metadata"] = (objectMetadata ? objectMetadata["employerName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.employerName, context);
                },
                set: function(val) {
                    setterFunctions['employerName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "employerSegment": {
                get: function() {
                    context["field"] = "employerSegment";
                    context["metadata"] = (objectMetadata ? objectMetadata["employerSegment"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.employerSegment, context);
                },
                set: function(val) {
                    setterFunctions['employerSegment'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "employerOfficePhoneIdd": {
                get: function() {
                    context["field"] = "employerOfficePhoneIdd";
                    context["metadata"] = (objectMetadata ? objectMetadata["employerOfficePhoneIdd"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.employerOfficePhoneIdd, context);
                },
                set: function(val) {
                    setterFunctions['employerOfficePhoneIdd'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "employerOfficePhone": {
                get: function() {
                    context["field"] = "employerOfficePhone";
                    context["metadata"] = (objectMetadata ? objectMetadata["employerOfficePhone"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.employerOfficePhone, context);
                },
                set: function(val) {
                    setterFunctions['employerOfficePhone'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "employerOfficeEmail": {
                get: function() {
                    context["field"] = "employerOfficeEmail";
                    context["metadata"] = (objectMetadata ? objectMetadata["employerOfficeEmail"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.employerOfficeEmail, context);
                },
                set: function(val) {
                    setterFunctions['employerOfficeEmail'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "salary": {
                get: function() {
                    context["field"] = "salary";
                    context["metadata"] = (objectMetadata ? objectMetadata["salary"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.salary, context);
                },
                set: function(val) {
                    setterFunctions['salary'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "salaryInCurrency": {
                get: function() {
                    context["field"] = "salaryInCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["salaryInCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.salaryInCurrency, context);
                },
                set: function(val) {
                    setterFunctions['salaryInCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "salaryFrequency": {
                get: function() {
                    context["field"] = "salaryFrequency";
                    context["metadata"] = (objectMetadata ? objectMetadata["salaryFrequency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.salaryFrequency, context);
                },
                set: function(val) {
                    setterFunctions['salaryFrequency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "primaryEmployment": {
                get: function() {
                    context["field"] = "primaryEmployment";
                    context["metadata"] = (objectMetadata ? objectMetadata["primaryEmployment"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.primaryEmployment, context);
                },
                set: function(val) {
                    setterFunctions['primaryEmployment'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vulnerabilityComments": {
                get: function() {
                    context["field"] = "vulnerabilityComments";
                    context["metadata"] = (objectMetadata ? objectMetadata["vulnerabilityComments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vulnerabilityComments, context);
                },
                set: function(val) {
                    setterFunctions['vulnerabilityComments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "taxReference": {
                get: function() {
                    context["field"] = "taxReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["taxReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.taxReference, context);
                },
                set: function(val) {
                    setterFunctions['taxReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "taxType": {
                get: function() {
                    context["field"] = "taxType";
                    context["metadata"] = (objectMetadata ? objectMetadata["taxType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.taxType, context);
                },
                set: function(val) {
                    setterFunctions['taxType'].call(this, val, privateState);
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
            "eligibilityType": {
                get: function() {
                    context["field"] = "eligibilityType";
                    context["metadata"] = (objectMetadata ? objectMetadata["eligibilityType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.eligibilityType, context);
                },
                set: function(val) {
                    setterFunctions['eligibilityType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "eligibilityReason": {
                get: function() {
                    context["field"] = "eligibilityReason";
                    context["metadata"] = (objectMetadata ? objectMetadata["eligibilityReason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.eligibilityReason, context);
                },
                set: function(val) {
                    setterFunctions['eligibilityReason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "taxStartDate": {
                get: function() {
                    context["field"] = "taxStartDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["taxStartDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.taxStartDate, context);
                },
                set: function(val) {
                    setterFunctions['taxStartDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "taxReasonType": {
                get: function() {
                    context["field"] = "taxReasonType";
                    context["metadata"] = (objectMetadata ? objectMetadata["taxReasonType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.taxReasonType, context);
                },
                set: function(val) {
                    setterFunctions['taxReasonType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "taxReasonComment": {
                get: function() {
                    context["field"] = "taxReasonComment";
                    context["metadata"] = (objectMetadata ? objectMetadata["taxReasonComment"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.taxReasonComment, context);
                },
                set: function(val) {
                    setterFunctions['taxReasonComment'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "taxIdLackReason": {
                get: function() {
                    context["field"] = "taxIdLackReason";
                    context["metadata"] = (objectMetadata ? objectMetadata["taxIdLackReason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.taxIdLackReason, context);
                },
                set: function(val) {
                    setterFunctions['taxIdLackReason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isMainTaxResidency": {
                get: function() {
                    context["field"] = "isMainTaxResidency";
                    context["metadata"] = (objectMetadata ? objectMetadata["isMainTaxResidency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isMainTaxResidency, context);
                },
                set: function(val) {
                    setterFunctions['isMainTaxResidency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "taxDetails": {
                get: function() {
                    context["field"] = "taxDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["taxDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.taxDetails, context);
                },
                set: function(val) {
                    setterFunctions['taxDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otherNames": {
                get: function() {
                    context["field"] = "otherNames";
                    context["metadata"] = (objectMetadata ? objectMetadata["otherNames"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otherNames, context);
                },
                set: function(val) {
                    setterFunctions['otherNames'].call(this, val, privateState);
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
            "nameLanguage": {
                get: function() {
                    context["field"] = "nameLanguage";
                    context["metadata"] = (objectMetadata ? objectMetadata["nameLanguage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nameLanguage, context);
                },
                set: function(val) {
                    setterFunctions['nameLanguage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "toDate": {
                get: function() {
                    context["field"] = "toDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["toDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toDate, context);
                },
                set: function(val) {
                    setterFunctions['toDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "observations": {
                get: function() {
                    context["field"] = "observations";
                    context["metadata"] = (objectMetadata ? objectMetadata["observations"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.observations, context);
                },
                set: function(val) {
                    setterFunctions['observations'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "observationReference": {
                get: function() {
                    context["field"] = "observationReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["observationReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.observationReference, context);
                },
                set: function(val) {
                    setterFunctions['observationReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "observationDate": {
                get: function() {
                    context["field"] = "observationDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["observationDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.observationDate, context);
                },
                set: function(val) {
                    setterFunctions['observationDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "detail": {
                get: function() {
                    context["field"] = "detail";
                    context["metadata"] = (objectMetadata ? objectMetadata["detail"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.detail, context);
                },
                set: function(val) {
                    setterFunctions['detail'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "website": {
                get: function() {
                    context["field"] = "website";
                    context["metadata"] = (objectMetadata ? objectMetadata["website"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.website, context);
                },
                set: function(val) {
                    setterFunctions['website'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "source": {
                get: function() {
                    context["field"] = "source";
                    context["metadata"] = (objectMetadata ? objectMetadata["source"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.source, context);
                },
                set: function(val) {
                    setterFunctions['source'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "observedBy": {
                get: function() {
                    context["field"] = "observedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["observedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.observedBy, context);
                },
                set: function(val) {
                    setterFunctions['observedBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyLegalStatus": {
                get: function() {
                    context["field"] = "partyLegalStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyLegalStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyLegalStatus, context);
                },
                set: function(val) {
                    setterFunctions['partyLegalStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "effectiveFrom": {
                get: function() {
                    context["field"] = "effectiveFrom";
                    context["metadata"] = (objectMetadata ? objectMetadata["effectiveFrom"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.effectiveFrom, context);
                },
                set: function(val) {
                    setterFunctions['effectiveFrom'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "effectiveTo": {
                get: function() {
                    context["field"] = "effectiveTo";
                    context["metadata"] = (objectMetadata ? objectMetadata["effectiveTo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.effectiveTo, context);
                },
                set: function(val) {
                    setterFunctions['effectiveTo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "addressFreeFormat": {
                get: function() {
                    context["field"] = "addressFreeFormat";
                    context["metadata"] = (objectMetadata ? objectMetadata["addressFreeFormat"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addressFreeFormat, context);
                },
                set: function(val) {
                    setterFunctions['addressFreeFormat'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "roles": {
                get: function() {
                    context["field"] = "roles";
                    context["metadata"] = (objectMetadata ? objectMetadata["roles"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.roles, context);
                },
                set: function(val) {
                    setterFunctions['roles'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "roleType": {
                get: function() {
                    context["field"] = "roleType";
                    context["metadata"] = (objectMetadata ? objectMetadata["roleType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.roleType, context);
                },
                set: function(val) {
                    setterFunctions['roleType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromDate": {
                get: function() {
                    context["field"] = "fromDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromDate, context);
                },
                set: function(val) {
                    setterFunctions['fromDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "exitDate": {
                get: function() {
                    context["field"] = "exitDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["exitDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.exitDate, context);
                },
                set: function(val) {
                    setterFunctions['exitDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "exitReason": {
                get: function() {
                    context["field"] = "exitReason";
                    context["metadata"] = (objectMetadata ? objectMetadata["exitReason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.exitReason, context);
                },
                set: function(val) {
                    setterFunctions['exitReason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "decisionBody": {
                get: function() {
                    context["field"] = "decisionBody";
                    context["metadata"] = (objectMetadata ? objectMetadata["decisionBody"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.decisionBody, context);
                },
                set: function(val) {
                    setterFunctions['decisionBody'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "contactReferences": {
                get: function() {
                    context["field"] = "contactReferences";
                    context["metadata"] = (objectMetadata ? objectMetadata["contactReferences"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.contactReferences, context);
                },
                set: function(val) {
                    setterFunctions['contactReferences'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerships": {
                get: function() {
                    context["field"] = "customerships";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerships"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerships, context);
                },
                set: function(val) {
                    setterFunctions['customerships'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "responsibleUnits": {
                get: function() {
                    context["field"] = "responsibleUnits";
                    context["metadata"] = (objectMetadata ? objectMetadata["responsibleUnits"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.responsibleUnits, context);
                },
                set: function(val) {
                    setterFunctions['responsibleUnits'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "responsibleUnitType": {
                get: function() {
                    context["field"] = "responsibleUnitType";
                    context["metadata"] = (objectMetadata ? objectMetadata["responsibleUnitType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.responsibleUnitType, context);
                },
                set: function(val) {
                    setterFunctions['responsibleUnitType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "businessUnit": {
                get: function() {
                    context["field"] = "businessUnit";
                    context["metadata"] = (objectMetadata ? objectMetadata["businessUnit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.businessUnit, context);
                },
                set: function(val) {
                    setterFunctions['businessUnit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "relationshipOfficer": {
                get: function() {
                    context["field"] = "relationshipOfficer";
                    context["metadata"] = (objectMetadata ? objectMetadata["relationshipOfficer"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.relationshipOfficer, context);
                },
                set: function(val) {
                    setterFunctions['relationshipOfficer'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "classifications": {
                get: function() {
                    context["field"] = "classifications";
                    context["metadata"] = (objectMetadata ? objectMetadata["classifications"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.classifications, context);
                },
                set: function(val) {
                    setterFunctions['classifications'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "classificationCode": {
                get: function() {
                    context["field"] = "classificationCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["classificationCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.classificationCode, context);
                },
                set: function(val) {
                    setterFunctions['classificationCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "classificationDate": {
                get: function() {
                    context["field"] = "classificationDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["classificationDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.classificationDate, context);
                },
                set: function(val) {
                    setterFunctions['classificationDate'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.partyStatus = value ? (value["partyStatus"] ? value["partyStatus"] : null) : null;
            privateState.contactAddresss = value ? (value["contactAddresss"] ? value["contactAddresss"] : null) : null;
            privateState.dateOfBirth = value ? (value["dateOfBirth"] ? value["dateOfBirth"] : null) : null;
            privateState.employments = value ? (value["employments"] ? value["employments"] : null) : null;
            privateState.partyType = value ? (value["partyType"] ? value["partyType"] : null) : null;
            privateState.emailId = value ? (value["emailId"] ? value["emailId"] : null) : null;
            privateState.occupations = value ? (value["occupations"] ? value["occupations"] : null) : null;
            privateState.extensionData = value ? (value["extensionData"] ? value["extensionData"] : null) : null;
            privateState.taxDetailss = value ? (value["taxDetailss"] ? value["taxDetailss"] : null) : null;
            privateState.citizenships = value ? (value["citizenships"] ? value["citizenships"] : null) : null;
            privateState.nationalitys = value ? (value["nationalitys"] ? value["nationalitys"] : null) : null;
            privateState.partyId = value ? (value["partyId"] ? value["partyId"] : null) : null;
            privateState.residences = value ? (value["residences"] ? value["residences"] : null) : null;
            privateState.vulnerabilitys = value ? (value["vulnerabilitys"] ? value["vulnerabilitys"] : null) : null;
            privateState.partyLifeCycles = value ? (value["partyLifeCycles"] ? value["partyLifeCycles"] : null) : null;
            privateState.partyNamess = value ? (value["partyNamess"] ? value["partyNamess"] : null) : null;
            privateState.partyLanguages = value ? (value["partyLanguages"] ? value["partyLanguages"] : null) : null;
            privateState.otherRiskIndicators = value ? (value["otherRiskIndicators"] ? value["otherRiskIndicators"] : null) : null;
            privateState.personPositions = value ? (value["personPositions"] ? value["personPositions"] : null) : null;
            privateState.partyIdentifiers = value ? (value["partyIdentifiers"] ? value["partyIdentifiers"] : null) : null;
            privateState.partyAssessments = value ? (value["partyAssessments"] ? value["partyAssessments"] : null) : null;
            privateState.phoneAddress = value ? (value["phoneAddress"] ? value["phoneAddress"] : null) : null;
            privateState.electronicAddress = value ? (value["electronicAddress"] ? value["electronicAddress"] : null) : null;
            privateState.error = value ? (value["error"] ? value["error"] : null) : null;
            privateState.createStatus = value ? (value["createStatus"] ? value["createStatus"] : null) : null;
            privateState.updateStatus = value ? (value["updateStatus"] ? value["updateStatus"] : null) : null;
            privateState.middleName = value ? (value["middleName"] ? value["middleName"] : null) : null;
            privateState.partyNames = value ? (value["partyNames"] ? value["partyNames"] : null) : null;
            privateState.contactAddress = value ? (value["contactAddress"] ? value["contactAddress"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.addresses = value ? (value["addresses"] ? value["addresses"] : null) : null;
            privateState.firstName = value ? (value["firstName"] ? value["firstName"] : null) : null;
            privateState.lastName = value ? (value["lastName"] ? value["lastName"] : null) : null;
            privateState.gender = value ? (value["gender"] ? value["gender"] : null) : null;
            privateState.defaultLanguage = value ? (value["defaultLanguage"] ? value["defaultLanguage"] : null) : null;
            privateState.noOfDependents = value ? (value["noOfDependents"] ? value["noOfDependents"] : null) : null;
            privateState.nickName = value ? (value["nickName"] ? value["nickName"] : null) : null;
            privateState.suffix = value ? (value["suffix"] ? value["suffix"] : null) : null;
            privateState.alias = value ? (value["alias"] ? value["alias"] : null) : null;
            privateState.nameStartDate = value ? (value["nameStartDate"] ? value["nameStartDate"] : null) : null;
            privateState.identifierNumber = value ? (value["identifierNumber"] ? value["identifierNumber"] : null) : null;
            privateState.identifierType = value ? (value["identifierType"] ? value["identifierType"] : null) : null;
            privateState.alternateIdentifierNumber = value ? (value["alternateIdentifierNumber"] ? value["alternateIdentifierNumber"] : null) : null;
            privateState.alternateIdentifierType = value ? (value["alternateIdentifierType"] ? value["alternateIdentifierType"] : null) : null;
            privateState.contactNumber = value ? (value["contactNumber"] ? value["contactNumber"] : null) : null;
            privateState.entityName = value ? (value["entityName"] ? value["entityName"] : null) : null;
            privateState.recordCount = value ? (value["recordCount"] ? value["recordCount"] : null) : null;
            privateState.dateOfDeath = value ? (value["dateOfDeath"] ? value["dateOfDeath"] : null) : null;
            privateState.notificationOfDeath = value ? (value["notificationOfDeath"] ? value["notificationOfDeath"] : null) : null;
            privateState.cityOfBirth = value ? (value["cityOfBirth"] ? value["cityOfBirth"] : null) : null;
            privateState.countryOfBirth = value ? (value["countryOfBirth"] ? value["countryOfBirth"] : null) : null;
            privateState.maritalStatus = value ? (value["maritalStatus"] ? value["maritalStatus"] : null) : null;
            privateState.reasonForNoCitizenship = value ? (value["reasonForNoCitizenship"] ? value["reasonForNoCitizenship"] : null) : null;
            privateState.title = value ? (value["title"] ? value["title"] : null) : null;
            privateState.organisationLegalType = value ? (value["organisationLegalType"] ? value["organisationLegalType"] : null) : null;
            privateState.incorporationCountry = value ? (value["incorporationCountry"] ? value["incorporationCountry"] : null) : null;
            privateState.dateOfIncorporation = value ? (value["dateOfIncorporation"] ? value["dateOfIncorporation"] : null) : null;
            privateState.nameOfIncorporationAuthority = value ? (value["nameOfIncorporationAuthority"] ? value["nameOfIncorporationAuthority"] : null) : null;
            privateState.legalForm = value ? (value["legalForm"] ? value["legalForm"] : null) : null;
            privateState.numberOfEmployees = value ? (value["numberOfEmployees"] ? value["numberOfEmployees"] : null) : null;
            privateState.birthProvince = value ? (value["birthProvince"] ? value["birthProvince"] : null) : null;
            privateState.nationalities = value ? (value["nationalities"] ? value["nationalities"] : null) : null;
            privateState.country = value ? (value["country"] ? value["country"] : null) : null;
            privateState.explanationIfApplies = value ? (value["explanationIfApplies"] ? value["explanationIfApplies"] : null) : null;
            privateState.language = value ? (value["language"] ? value["language"] : null) : null;
            privateState.explanationIfDoesnotApply = value ? (value["explanationIfDoesnotApply"] ? value["explanationIfDoesnotApply"] : null) : null;
            privateState.countryOfCitizenship = value ? (value["countryOfCitizenship"] ? value["countryOfCitizenship"] : null) : null;
            privateState.endDate = value ? (value["endDate"] ? value["endDate"] : null) : null;
            privateState.doesRiskApply = value ? (value["doesRiskApply"] ? value["doesRiskApply"] : null) : null;
            privateState.region = value ? (value["region"] ? value["region"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.level = value ? (value["level"] ? value["level"] : null) : null;
            privateState.score = value ? (value["score"] ? value["score"] : null) : null;
            privateState.body = value ? (value["body"] ? value["body"] : null) : null;
            privateState.conclusionDate = value ? (value["conclusionDate"] ? value["conclusionDate"] : null) : null;
            privateState.details = value ? (value["details"] ? value["details"] : null) : null;
            privateState.nature = value ? (value["nature"] ? value["nature"] : null) : null;
            privateState.reason = value ? (value["reason"] ? value["reason"] : null) : null;
            privateState.nextAssessmentDate = value ? (value["nextAssessmentDate"] ? value["nextAssessmentDate"] : null) : null;
            privateState.expirydate = value ? (value["expirydate"] ? value["expirydate"] : null) : null;
            privateState.statutoryRequirementMet = value ? (value["statutoryRequirementMet"] ? value["statutoryRequirementMet"] : null) : null;
            privateState.issuingAuthority = value ? (value["issuingAuthority"] ? value["issuingAuthority"] : null) : null;
            privateState.issuedDate = value ? (value["issuedDate"] ? value["issuedDate"] : null) : null;
            privateState.issuingCountry = value ? (value["issuingCountry"] ? value["issuingCountry"] : null) : null;
            privateState.holderName = value ? (value["holderName"] ? value["holderName"] : null) : null;
            privateState.documentTagId = value ? (value["documentTagId"] ? value["documentTagId"] : null) : null;
            privateState.alternateIdentities = value ? (value["alternateIdentities"] ? value["alternateIdentities"] : null) : null;
            privateState.identitySource = value ? (value["identitySource"] ? value["identitySource"] : null) : null;
            privateState.statusComments = value ? (value["statusComments"] ? value["statusComments"] : null) : null;
            privateState.personPositionType = value ? (value["personPositionType"] ? value["personPositionType"] : null) : null;
            privateState.countryOfPosition = value ? (value["countryOfPosition"] ? value["countryOfPosition"] : null) : null;
            privateState.effectiveFromDate = value ? (value["effectiveFromDate"] ? value["effectiveFromDate"] : null) : null;
            privateState.effectiveToDate = value ? (value["effectiveToDate"] ? value["effectiveToDate"] : null) : null;
            privateState.comments = value ? (value["comments"] ? value["comments"] : null) : null;
            privateState.lastUpdated = value ? (value["lastUpdated"] ? value["lastUpdated"] : null) : null;
            privateState.informationSource = value ? (value["informationSource"] ? value["informationSource"] : null) : null;
            privateState.vulnerabilities = value ? (value["vulnerabilities"] ? value["vulnerabilities"] : null) : null;
            privateState.changeReason = value ? (value["changeReason"] ? value["changeReason"] : null) : null;
            privateState.occupationType = value ? (value["occupationType"] ? value["occupationType"] : null) : null;
            privateState.occupationDescription = value ? (value["occupationDescription"] ? value["occupationDescription"] : null) : null;
            privateState.vulnerabilityType = value ? (value["vulnerabilityType"] ? value["vulnerabilityType"] : null) : null;
            privateState.employmentReference = value ? (value["employmentReference"] ? value["employmentReference"] : null) : null;
            privateState.jobTitle = value ? (value["jobTitle"] ? value["jobTitle"] : null) : null;
            privateState.employerName = value ? (value["employerName"] ? value["employerName"] : null) : null;
            privateState.employerSegment = value ? (value["employerSegment"] ? value["employerSegment"] : null) : null;
            privateState.employerOfficePhoneIdd = value ? (value["employerOfficePhoneIdd"] ? value["employerOfficePhoneIdd"] : null) : null;
            privateState.employerOfficePhone = value ? (value["employerOfficePhone"] ? value["employerOfficePhone"] : null) : null;
            privateState.employerOfficeEmail = value ? (value["employerOfficeEmail"] ? value["employerOfficeEmail"] : null) : null;
            privateState.salary = value ? (value["salary"] ? value["salary"] : null) : null;
            privateState.salaryInCurrency = value ? (value["salaryInCurrency"] ? value["salaryInCurrency"] : null) : null;
            privateState.salaryFrequency = value ? (value["salaryFrequency"] ? value["salaryFrequency"] : null) : null;
            privateState.primaryEmployment = value ? (value["primaryEmployment"] ? value["primaryEmployment"] : null) : null;
            privateState.vulnerabilityComments = value ? (value["vulnerabilityComments"] ? value["vulnerabilityComments"] : null) : null;
            privateState.taxReference = value ? (value["taxReference"] ? value["taxReference"] : null) : null;
            privateState.taxType = value ? (value["taxType"] ? value["taxType"] : null) : null;
            privateState.taxId = value ? (value["taxId"] ? value["taxId"] : null) : null;
            privateState.eligibilityType = value ? (value["eligibilityType"] ? value["eligibilityType"] : null) : null;
            privateState.eligibilityReason = value ? (value["eligibilityReason"] ? value["eligibilityReason"] : null) : null;
            privateState.taxStartDate = value ? (value["taxStartDate"] ? value["taxStartDate"] : null) : null;
            privateState.taxReasonType = value ? (value["taxReasonType"] ? value["taxReasonType"] : null) : null;
            privateState.taxReasonComment = value ? (value["taxReasonComment"] ? value["taxReasonComment"] : null) : null;
            privateState.taxIdLackReason = value ? (value["taxIdLackReason"] ? value["taxIdLackReason"] : null) : null;
            privateState.isMainTaxResidency = value ? (value["isMainTaxResidency"] ? value["isMainTaxResidency"] : null) : null;
            privateState.taxDetails = value ? (value["taxDetails"] ? value["taxDetails"] : null) : null;
            privateState.otherNames = value ? (value["otherNames"] ? value["otherNames"] : null) : null;
            privateState.name = value ? (value["name"] ? value["name"] : null) : null;
            privateState.nameLanguage = value ? (value["nameLanguage"] ? value["nameLanguage"] : null) : null;
            privateState.toDate = value ? (value["toDate"] ? value["toDate"] : null) : null;
            privateState.observations = value ? (value["observations"] ? value["observations"] : null) : null;
            privateState.observationReference = value ? (value["observationReference"] ? value["observationReference"] : null) : null;
            privateState.observationDate = value ? (value["observationDate"] ? value["observationDate"] : null) : null;
            privateState.detail = value ? (value["detail"] ? value["detail"] : null) : null;
            privateState.website = value ? (value["website"] ? value["website"] : null) : null;
            privateState.source = value ? (value["source"] ? value["source"] : null) : null;
            privateState.observedBy = value ? (value["observedBy"] ? value["observedBy"] : null) : null;
            privateState.partyLegalStatus = value ? (value["partyLegalStatus"] ? value["partyLegalStatus"] : null) : null;
            privateState.effectiveFrom = value ? (value["effectiveFrom"] ? value["effectiveFrom"] : null) : null;
            privateState.effectiveTo = value ? (value["effectiveTo"] ? value["effectiveTo"] : null) : null;
            privateState.addressFreeFormat = value ? (value["addressFreeFormat"] ? value["addressFreeFormat"] : null) : null;
            privateState.roles = value ? (value["roles"] ? value["roles"] : null) : null;
            privateState.roleType = value ? (value["roleType"] ? value["roleType"] : null) : null;
            privateState.fromDate = value ? (value["fromDate"] ? value["fromDate"] : null) : null;
            privateState.exitDate = value ? (value["exitDate"] ? value["exitDate"] : null) : null;
            privateState.exitReason = value ? (value["exitReason"] ? value["exitReason"] : null) : null;
            privateState.decisionBody = value ? (value["decisionBody"] ? value["decisionBody"] : null) : null;
            privateState.contactReferences = value ? (value["contactReferences"] ? value["contactReferences"] : null) : null;
            privateState.customerships = value ? (value["customerships"] ? value["customerships"] : null) : null;
            privateState.responsibleUnits = value ? (value["responsibleUnits"] ? value["responsibleUnits"] : null) : null;
            privateState.responsibleUnitType = value ? (value["responsibleUnitType"] ? value["responsibleUnitType"] : null) : null;
            privateState.businessUnit = value ? (value["businessUnit"] ? value["businessUnit"] : null) : null;
            privateState.relationshipOfficer = value ? (value["relationshipOfficer"] ? value["relationshipOfficer"] : null) : null;
            privateState.classifications = value ? (value["classifications"] ? value["classifications"] : null) : null;
            privateState.classificationCode = value ? (value["classificationCode"] ? value["classificationCode"] : null) : null;
            privateState.classificationDate = value ? (value["classificationDate"] ? value["classificationDate"] : null) : null;
            privateState.coreCustomerId = value ? (value["coreCustomerId"] ? value["coreCustomerId"] : null) : null;
            privateState.isEnrolled = value ? (value["isEnrolled"] ? value["isEnrolled"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Party);

    //Create new class level validator object
    BaseModel.Validator.call(Party);

    var registerValidatorBackup = Party.registerValidator;

    Party.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Party.isValid(this, propName, val)) {
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
    //For Operation 'createPartyIdentifier' with service id 'CreatePartyIdentifier3339'
     Party.createPartyIdentifier = function(params, onCompletion){
        return Party.customVerb('createPartyIdentifier', params, onCompletion);
     };

    //For Operation 'createParty' with service id 'PartyCreateOperation5101'
     Party.createParty = function(params, onCompletion){
        return Party.customVerb('createParty', params, onCompletion);
     };

    //For Operation 'getPartyRelations' with service id 'getPartyRelationsOperation4400'
     Party.getPartyRelations = function(params, onCompletion){
        return Party.customVerb('getPartyRelations', params, onCompletion);
     };

    //For Operation 'createPartyRelations' with service id 'CreatePartyRelationsOperation3983'
     Party.createPartyRelations = function(params, onCompletion){
        return Party.customVerb('createPartyRelations', params, onCompletion);
     };

    //For Operation 'updatePartyRelations' with service id 'UpdatePartyRelationsOperation3393'
     Party.updatePartyRelations = function(params, onCompletion){
        return Party.customVerb('updatePartyRelations', params, onCompletion);
     };

    //For Operation 'getParty' with service id 'PartyGetOperation5897'
     Party.getParty = function(params, onCompletion){
        return Party.customVerb('getParty', params, onCompletion);
     };

    //For Operation 'updateParty' with service id 'PartyUpdateOperation9902'
     Party.updateParty = function(params, onCompletion){
        return Party.customVerb('updateParty', params, onCompletion);
     };

    var relations = [];

    Party.relations = relations;

    Party.prototype.isValid = function() {
        return Party.isValid(this);
    };

    Party.prototype.objModelName = "Party";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Party.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PartyExperienceAPI", "Party", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Party.clone = function(objectToClone) {
        var clonedObj = new Party();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Party;
});