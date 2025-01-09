/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "LetterOfCredit", "objectService" : "TradeFinance"};

    var setterFunctions = {
        lcReferenceNo: function(val, state) {
            context["field"] = "lcReferenceNo";
            context["metadata"] = (objectMetadata ? objectMetadata["lcReferenceNo"] : null);
            state['lcReferenceNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcAmount: function(val, state) {
            context["field"] = "lcAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["lcAmount"] : null);
            state['lcAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcCurrency: function(val, state) {
            context["field"] = "lcCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["lcCurrency"] : null);
            state['lcCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tolerancePercentage: function(val, state) {
            context["field"] = "tolerancePercentage";
            context["metadata"] = (objectMetadata ? objectMetadata["tolerancePercentage"] : null);
            state['tolerancePercentage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maximumCreditAmount: function(val, state) {
            context["field"] = "maximumCreditAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["maximumCreditAmount"] : null);
            state['maximumCreditAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        additionalAmountPayable: function(val, state) {
            context["field"] = "additionalAmountPayable";
            context["metadata"] = (objectMetadata ? objectMetadata["additionalAmountPayable"] : null);
            state['additionalAmountPayable'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentTerms: function(val, state) {
            context["field"] = "paymentTerms";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentTerms"] : null);
            state['paymentTerms'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableWith1: function(val, state) {
            context["field"] = "availableWith1";
            context["metadata"] = (objectMetadata ? objectMetadata["availableWith1"] : null);
            state['availableWith1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableWith2: function(val, state) {
            context["field"] = "availableWith2";
            context["metadata"] = (objectMetadata ? objectMetadata["availableWith2"] : null);
            state['availableWith2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableWith3: function(val, state) {
            context["field"] = "availableWith3";
            context["metadata"] = (objectMetadata ? objectMetadata["availableWith3"] : null);
            state['availableWith3'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableWith4: function(val, state) {
            context["field"] = "availableWith4";
            context["metadata"] = (objectMetadata ? objectMetadata["availableWith4"] : null);
            state['availableWith4'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        issueDate: function(val, state) {
            context["field"] = "issueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
            state['issueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryDate: function(val, state) {
            context["field"] = "expiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
            state['expiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryPlace: function(val, state) {
            context["field"] = "expiryPlace";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryPlace"] : null);
            state['expiryPlace'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chargesAccount: function(val, state) {
            context["field"] = "chargesAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["chargesAccount"] : null);
            state['chargesAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        commisionAccount: function(val, state) {
            context["field"] = "commisionAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["commisionAccount"] : null);
            state['commisionAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        marginAccount: function(val, state) {
            context["field"] = "marginAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["marginAccount"] : null);
            state['marginAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        messageToBank: function(val, state) {
            context["field"] = "messageToBank";
            context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
            state['messageToBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryName: function(val, state) {
            context["field"] = "beneficiaryName";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
            state['beneficiaryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryAddressLine1: function(val, state) {
            context["field"] = "beneficiaryAddressLine1";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine1"] : null);
            state['beneficiaryAddressLine1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryAddressLine2: function(val, state) {
            context["field"] = "beneficiaryAddressLine2";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine2"] : null);
            state['beneficiaryAddressLine2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryPostCode: function(val, state) {
            context["field"] = "beneficiaryPostCode";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryPostCode"] : null);
            state['beneficiaryPostCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryCountry: function(val, state) {
            context["field"] = "beneficiaryCountry";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryCountry"] : null);
            state['beneficiaryCountry'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryCity: function(val, state) {
            context["field"] = "beneficiaryCity";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryCity"] : null);
            state['beneficiaryCity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryState: function(val, state) {
            context["field"] = "beneficiaryState";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryState"] : null);
            state['beneficiaryState'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryBank: function(val, state) {
            context["field"] = "beneficiaryBank";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBank"] : null);
            state['beneficiaryBank'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryBankAdressLine1: function(val, state) {
            context["field"] = "beneficiaryBankAdressLine1";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankAdressLine1"] : null);
            state['beneficiaryBankAdressLine1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryBankAdressLine2: function(val, state) {
            context["field"] = "beneficiaryBankAdressLine2";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankAdressLine2"] : null);
            state['beneficiaryBankAdressLine2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryBankPostCode: function(val, state) {
            context["field"] = "beneficiaryBankPostCode";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankPostCode"] : null);
            state['beneficiaryBankPostCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryBankCountry: function(val, state) {
            context["field"] = "beneficiaryBankCountry";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankCountry"] : null);
            state['beneficiaryBankCountry'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryBankCity: function(val, state) {
            context["field"] = "beneficiaryBankCity";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankCity"] : null);
            state['beneficiaryBankCity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        beneficiaryBankState: function(val, state) {
            context["field"] = "beneficiaryBankState";
            context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankState"] : null);
            state['beneficiaryBankState'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        placeOfTakingIncharge: function(val, state) {
            context["field"] = "placeOfTakingIncharge";
            context["metadata"] = (objectMetadata ? objectMetadata["placeOfTakingIncharge"] : null);
            state['placeOfTakingIncharge'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        portOfLoading: function(val, state) {
            context["field"] = "portOfLoading";
            context["metadata"] = (objectMetadata ? objectMetadata["portOfLoading"] : null);
            state['portOfLoading'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        portOfDischarge: function(val, state) {
            context["field"] = "portOfDischarge";
            context["metadata"] = (objectMetadata ? objectMetadata["portOfDischarge"] : null);
            state['portOfDischarge'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        placeOfFinalDelivery: function(val, state) {
            context["field"] = "placeOfFinalDelivery";
            context["metadata"] = (objectMetadata ? objectMetadata["placeOfFinalDelivery"] : null);
            state['placeOfFinalDelivery'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        latestShippingDate: function(val, state) {
            context["field"] = "latestShippingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["latestShippingDate"] : null);
            state['latestShippingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        presentationPeriod: function(val, state) {
            context["field"] = "presentationPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["presentationPeriod"] : null);
            state['presentationPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transshipment: function(val, state) {
            context["field"] = "transshipment";
            context["metadata"] = (objectMetadata ? objectMetadata["transshipment"] : null);
            state['transshipment'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partialShipments: function(val, state) {
            context["field"] = "partialShipments";
            context["metadata"] = (objectMetadata ? objectMetadata["partialShipments"] : null);
            state['partialShipments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        incoTerms: function(val, state) {
            context["field"] = "incoTerms";
            context["metadata"] = (objectMetadata ? objectMetadata["incoTerms"] : null);
            state['incoTerms'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modeOfShipment: function(val, state) {
            context["field"] = "modeOfShipment";
            context["metadata"] = (objectMetadata ? objectMetadata["modeOfShipment"] : null);
            state['modeOfShipment'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        descriptionOfGoods: function(val, state) {
            context["field"] = "descriptionOfGoods";
            context["metadata"] = (objectMetadata ? objectMetadata["descriptionOfGoods"] : null);
            state['descriptionOfGoods'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentsRequired: function(val, state) {
            context["field"] = "documentsRequired";
            context["metadata"] = (objectMetadata ? objectMetadata["documentsRequired"] : null);
            state['documentsRequired'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        additionalConditionsCode: function(val, state) {
            context["field"] = "additionalConditionsCode";
            context["metadata"] = (objectMetadata ? objectMetadata["additionalConditionsCode"] : null);
            state['additionalConditionsCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherAdditionalConditions: function(val, state) {
            context["field"] = "otherAdditionalConditions";
            context["metadata"] = (objectMetadata ? objectMetadata["otherAdditionalConditions"] : null);
            state['otherAdditionalConditions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        documentCharges: function(val, state) {
            context["field"] = "documentCharges";
            context["metadata"] = (objectMetadata ? objectMetadata["documentCharges"] : null);
            state['documentCharges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supportDocuments: function(val, state) {
            context["field"] = "supportDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["supportDocuments"] : null);
            state['supportDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileToUpload: function(val, state) {
            context["field"] = "fileToUpload";
            context["metadata"] = (objectMetadata ? objectMetadata["fileToUpload"] : null);
            state['fileToUpload'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        confirmationInstruction: function(val, state) {
            context["field"] = "confirmationInstruction";
            context["metadata"] = (objectMetadata ? objectMetadata["confirmationInstruction"] : null);
            state['confirmationInstruction'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transferable: function(val, state) {
            context["field"] = "transferable";
            context["metadata"] = (objectMetadata ? objectMetadata["transferable"] : null);
            state['transferable'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        standByLC: function(val, state) {
            context["field"] = "standByLC";
            context["metadata"] = (objectMetadata ? objectMetadata["standByLC"] : null);
            state['standByLC'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isDraft: function(val, state) {
            context["field"] = "isDraft";
            context["metadata"] = (objectMetadata ? objectMetadata["isDraft"] : null);
            state['isDraft'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        additionalPayableCurrency: function(val, state) {
            context["field"] = "additionalPayableCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["additionalPayableCurrency"] : null);
            state['additionalPayableCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        code: function(val, state) {
            context["field"] = "code";
            context["metadata"] = (objectMetadata ? objectMetadata["code"] : null);
            state['code'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        msg: function(val, state) {
            context["field"] = "msg";
            context["metadata"] = (objectMetadata ? objectMetadata["msg"] : null);
            state['msg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        flowType: function(val, state) {
            context["field"] = "flowType";
            context["metadata"] = (objectMetadata ? objectMetadata["flowType"] : null);
            state['flowType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendStatus: function(val, state) {
            context["field"] = "amendStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["amendStatus"] : null);
            state['amendStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ErrorCode: function(val, state) {
            context["field"] = "ErrorCode";
            context["metadata"] = (objectMetadata ? objectMetadata["ErrorCode"] : null);
            state['ErrorCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ErrorMessage: function(val, state) {
            context["field"] = "ErrorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["ErrorMessage"] : null);
            state['ErrorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        srmsReqOrderID: function(val, state) {
            context["field"] = "srmsReqOrderID";
            context["metadata"] = (objectMetadata ? objectMetadata["srmsReqOrderID"] : null);
            state['srmsReqOrderID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcCreatedOn: function(val, state) {
            context["field"] = "lcCreatedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["lcCreatedOn"] : null);
            state['lcCreatedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        draftCount: function(val, state) {
            context["field"] = "draftCount";
            context["metadata"] = (objectMetadata ? objectMetadata["draftCount"] : null);
            state['draftCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        draftAmount: function(val, state) {
            context["field"] = "draftAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["draftAmount"] : null);
            state['draftAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deletedCount: function(val, state) {
            context["field"] = "deletedCount";
            context["metadata"] = (objectMetadata ? objectMetadata["deletedCount"] : null);
            state['deletedCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deletedAmount: function(val, state) {
            context["field"] = "deletedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["deletedAmount"] : null);
            state['deletedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        selfApprovedCount: function(val, state) {
            context["field"] = "selfApprovedCount";
            context["metadata"] = (objectMetadata ? objectMetadata["selfApprovedCount"] : null);
            state['selfApprovedCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        selfApprovedAmount: function(val, state) {
            context["field"] = "selfApprovedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["selfApprovedAmount"] : null);
            state['selfApprovedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalCount: function(val, state) {
            context["field"] = "totalCount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalCount"] : null);
            state['totalCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalAmount: function(val, state) {
            context["field"] = "totalAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
            state['totalAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fileId: function(val, state) {
            context["field"] = "fileId";
            context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
            state['fileId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amountType: function(val, state) {
            context["field"] = "amountType";
            context["metadata"] = (objectMetadata ? objectMetadata["amountType"] : null);
            state['amountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherAmendments: function(val, state) {
            context["field"] = "otherAmendments";
            context["metadata"] = (objectMetadata ? objectMetadata["otherAmendments"] : null);
            state['otherAmendments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendCharges: function(val, state) {
            context["field"] = "amendCharges";
            context["metadata"] = (objectMetadata ? objectMetadata["amendCharges"] : null);
            state['amendCharges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chargesPaid: function(val, state) {
            context["field"] = "chargesPaid";
            context["metadata"] = (objectMetadata ? objectMetadata["chargesPaid"] : null);
            state['chargesPaid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditAmount: function(val, state) {
            context["field"] = "creditAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["creditAmount"] : null);
            state['creditAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentReference: function(val, state) {
            context["field"] = "amendmentReference";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentReference"] : null);
            state['amendmentReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentDate: function(val, state) {
            context["field"] = "amendmentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentDate"] : null);
            state['amendmentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentApprovedDate: function(val, state) {
            context["field"] = "amendmentApprovedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentApprovedDate"] : null);
            state['amendmentApprovedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcType: function(val, state) {
            context["field"] = "lcType";
            context["metadata"] = (objectMetadata ? objectMetadata["lcType"] : null);
            state['lcType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amendmentExpiryDate: function(val, state) {
            context["field"] = "amendmentExpiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["amendmentExpiryDate"] : null);
            state['amendmentExpiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        utilizedAmount: function(val, state) {
            context["field"] = "utilizedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["utilizedAmount"] : null);
            state['utilizedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        importLCId: function(val, state) {
            context["field"] = "importLCId";
            context["metadata"] = (objectMetadata ? objectMetadata["importLCId"] : null);
            state['importLCId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        referenceNomatch: function(val, state) {
            context["field"] = "referenceNomatch";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceNomatch"] : null);
            state['referenceNomatch'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lcSRMSId: function(val, state) {
            context["field"] = "lcSRMSId";
            context["metadata"] = (objectMetadata ? objectMetadata["lcSRMSId"] : null);
            state['lcSRMSId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        branchName: function(val, state) {
            context["field"] = "branchName";
            context["metadata"] = (objectMetadata ? objectMetadata["branchName"] : null);
            state['branchName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        iban: function(val, state) {
            context["field"] = "iban";
            context["metadata"] = (objectMetadata ? objectMetadata["iban"] : null);
            state['iban'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bic: function(val, state) {
            context["field"] = "bic";
            context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
            state['bic'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        countryRegion: function(val, state) {
            context["field"] = "countryRegion";
            context["metadata"] = (objectMetadata ? objectMetadata["countryRegion"] : null);
            state['countryRegion'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        zipcode: function(val, state) {
            context["field"] = "zipcode";
            context["metadata"] = (objectMetadata ? objectMetadata["zipcode"] : null);
            state['zipcode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankAddress: function(val, state) {
            context["field"] = "bankAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["bankAddress"] : null);
            state['bankAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactReference: function(val, state) {
            context["field"] = "transactReference";
            context["metadata"] = (objectMetadata ? objectMetadata["transactReference"] : null);
            state['transactReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function LetterOfCredit(defaultValues) {
        var privateState = {};
        context["field"] = "lcReferenceNo";
        context["metadata"] = (objectMetadata ? objectMetadata["lcReferenceNo"] : null);
        privateState.lcReferenceNo = defaultValues ?
            (defaultValues["lcReferenceNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcReferenceNo"], context) :
                null) :
            null;

        context["field"] = "lcAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["lcAmount"] : null);
        privateState.lcAmount = defaultValues ?
            (defaultValues["lcAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcAmount"], context) :
                null) :
            null;

        context["field"] = "lcCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["lcCurrency"] : null);
        privateState.lcCurrency = defaultValues ?
            (defaultValues["lcCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcCurrency"], context) :
                null) :
            null;

        context["field"] = "tolerancePercentage";
        context["metadata"] = (objectMetadata ? objectMetadata["tolerancePercentage"] : null);
        privateState.tolerancePercentage = defaultValues ?
            (defaultValues["tolerancePercentage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tolerancePercentage"], context) :
                null) :
            null;

        context["field"] = "maximumCreditAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["maximumCreditAmount"] : null);
        privateState.maximumCreditAmount = defaultValues ?
            (defaultValues["maximumCreditAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maximumCreditAmount"], context) :
                null) :
            null;

        context["field"] = "additionalAmountPayable";
        context["metadata"] = (objectMetadata ? objectMetadata["additionalAmountPayable"] : null);
        privateState.additionalAmountPayable = defaultValues ?
            (defaultValues["additionalAmountPayable"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["additionalAmountPayable"], context) :
                null) :
            null;

        context["field"] = "paymentTerms";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentTerms"] : null);
        privateState.paymentTerms = defaultValues ?
            (defaultValues["paymentTerms"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentTerms"], context) :
                null) :
            null;

        context["field"] = "availableWith1";
        context["metadata"] = (objectMetadata ? objectMetadata["availableWith1"] : null);
        privateState.availableWith1 = defaultValues ?
            (defaultValues["availableWith1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableWith1"], context) :
                null) :
            null;

        context["field"] = "availableWith2";
        context["metadata"] = (objectMetadata ? objectMetadata["availableWith2"] : null);
        privateState.availableWith2 = defaultValues ?
            (defaultValues["availableWith2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableWith2"], context) :
                null) :
            null;

        context["field"] = "availableWith3";
        context["metadata"] = (objectMetadata ? objectMetadata["availableWith3"] : null);
        privateState.availableWith3 = defaultValues ?
            (defaultValues["availableWith3"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableWith3"], context) :
                null) :
            null;

        context["field"] = "availableWith4";
        context["metadata"] = (objectMetadata ? objectMetadata["availableWith4"] : null);
        privateState.availableWith4 = defaultValues ?
            (defaultValues["availableWith4"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableWith4"], context) :
                null) :
            null;

        context["field"] = "issueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
        privateState.issueDate = defaultValues ?
            (defaultValues["issueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["issueDate"], context) :
                null) :
            null;

        context["field"] = "expiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
        privateState.expiryDate = defaultValues ?
            (defaultValues["expiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryDate"], context) :
                null) :
            null;

        context["field"] = "expiryPlace";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryPlace"] : null);
        privateState.expiryPlace = defaultValues ?
            (defaultValues["expiryPlace"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryPlace"], context) :
                null) :
            null;

        context["field"] = "chargesAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["chargesAccount"] : null);
        privateState.chargesAccount = defaultValues ?
            (defaultValues["chargesAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chargesAccount"], context) :
                null) :
            null;

        context["field"] = "commisionAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["commisionAccount"] : null);
        privateState.commisionAccount = defaultValues ?
            (defaultValues["commisionAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["commisionAccount"], context) :
                null) :
            null;

        context["field"] = "marginAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["marginAccount"] : null);
        privateState.marginAccount = defaultValues ?
            (defaultValues["marginAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["marginAccount"], context) :
                null) :
            null;

        context["field"] = "messageToBank";
        context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
        privateState.messageToBank = defaultValues ?
            (defaultValues["messageToBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["messageToBank"], context) :
                null) :
            null;

        context["field"] = "beneficiaryName";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
        privateState.beneficiaryName = defaultValues ?
            (defaultValues["beneficiaryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryName"], context) :
                null) :
            null;

        context["field"] = "beneficiaryAddressLine1";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine1"] : null);
        privateState.beneficiaryAddressLine1 = defaultValues ?
            (defaultValues["beneficiaryAddressLine1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryAddressLine1"], context) :
                null) :
            null;

        context["field"] = "beneficiaryAddressLine2";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine2"] : null);
        privateState.beneficiaryAddressLine2 = defaultValues ?
            (defaultValues["beneficiaryAddressLine2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryAddressLine2"], context) :
                null) :
            null;

        context["field"] = "beneficiaryPostCode";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryPostCode"] : null);
        privateState.beneficiaryPostCode = defaultValues ?
            (defaultValues["beneficiaryPostCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryPostCode"], context) :
                null) :
            null;

        context["field"] = "beneficiaryCountry";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryCountry"] : null);
        privateState.beneficiaryCountry = defaultValues ?
            (defaultValues["beneficiaryCountry"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryCountry"], context) :
                null) :
            null;

        context["field"] = "beneficiaryCity";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryCity"] : null);
        privateState.beneficiaryCity = defaultValues ?
            (defaultValues["beneficiaryCity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryCity"], context) :
                null) :
            null;

        context["field"] = "beneficiaryState";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryState"] : null);
        privateState.beneficiaryState = defaultValues ?
            (defaultValues["beneficiaryState"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryState"], context) :
                null) :
            null;

        context["field"] = "beneficiaryBank";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBank"] : null);
        privateState.beneficiaryBank = defaultValues ?
            (defaultValues["beneficiaryBank"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryBank"], context) :
                null) :
            null;

        context["field"] = "beneficiaryBankAdressLine1";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankAdressLine1"] : null);
        privateState.beneficiaryBankAdressLine1 = defaultValues ?
            (defaultValues["beneficiaryBankAdressLine1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryBankAdressLine1"], context) :
                null) :
            null;

        context["field"] = "beneficiaryBankAdressLine2";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankAdressLine2"] : null);
        privateState.beneficiaryBankAdressLine2 = defaultValues ?
            (defaultValues["beneficiaryBankAdressLine2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryBankAdressLine2"], context) :
                null) :
            null;

        context["field"] = "beneficiaryBankPostCode";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankPostCode"] : null);
        privateState.beneficiaryBankPostCode = defaultValues ?
            (defaultValues["beneficiaryBankPostCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryBankPostCode"], context) :
                null) :
            null;

        context["field"] = "beneficiaryBankCountry";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankCountry"] : null);
        privateState.beneficiaryBankCountry = defaultValues ?
            (defaultValues["beneficiaryBankCountry"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryBankCountry"], context) :
                null) :
            null;

        context["field"] = "beneficiaryBankCity";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankCity"] : null);
        privateState.beneficiaryBankCity = defaultValues ?
            (defaultValues["beneficiaryBankCity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryBankCity"], context) :
                null) :
            null;

        context["field"] = "beneficiaryBankState";
        context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankState"] : null);
        privateState.beneficiaryBankState = defaultValues ?
            (defaultValues["beneficiaryBankState"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["beneficiaryBankState"], context) :
                null) :
            null;

        context["field"] = "placeOfTakingIncharge";
        context["metadata"] = (objectMetadata ? objectMetadata["placeOfTakingIncharge"] : null);
        privateState.placeOfTakingIncharge = defaultValues ?
            (defaultValues["placeOfTakingIncharge"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["placeOfTakingIncharge"], context) :
                null) :
            null;

        context["field"] = "portOfLoading";
        context["metadata"] = (objectMetadata ? objectMetadata["portOfLoading"] : null);
        privateState.portOfLoading = defaultValues ?
            (defaultValues["portOfLoading"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portOfLoading"], context) :
                null) :
            null;

        context["field"] = "portOfDischarge";
        context["metadata"] = (objectMetadata ? objectMetadata["portOfDischarge"] : null);
        privateState.portOfDischarge = defaultValues ?
            (defaultValues["portOfDischarge"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portOfDischarge"], context) :
                null) :
            null;

        context["field"] = "placeOfFinalDelivery";
        context["metadata"] = (objectMetadata ? objectMetadata["placeOfFinalDelivery"] : null);
        privateState.placeOfFinalDelivery = defaultValues ?
            (defaultValues["placeOfFinalDelivery"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["placeOfFinalDelivery"], context) :
                null) :
            null;

        context["field"] = "latestShippingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["latestShippingDate"] : null);
        privateState.latestShippingDate = defaultValues ?
            (defaultValues["latestShippingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["latestShippingDate"], context) :
                null) :
            null;

        context["field"] = "presentationPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["presentationPeriod"] : null);
        privateState.presentationPeriod = defaultValues ?
            (defaultValues["presentationPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["presentationPeriod"], context) :
                null) :
            null;

        context["field"] = "transshipment";
        context["metadata"] = (objectMetadata ? objectMetadata["transshipment"] : null);
        privateState.transshipment = defaultValues ?
            (defaultValues["transshipment"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transshipment"], context) :
                null) :
            null;

        context["field"] = "partialShipments";
        context["metadata"] = (objectMetadata ? objectMetadata["partialShipments"] : null);
        privateState.partialShipments = defaultValues ?
            (defaultValues["partialShipments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partialShipments"], context) :
                null) :
            null;

        context["field"] = "incoTerms";
        context["metadata"] = (objectMetadata ? objectMetadata["incoTerms"] : null);
        privateState.incoTerms = defaultValues ?
            (defaultValues["incoTerms"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["incoTerms"], context) :
                null) :
            null;

        context["field"] = "modeOfShipment";
        context["metadata"] = (objectMetadata ? objectMetadata["modeOfShipment"] : null);
        privateState.modeOfShipment = defaultValues ?
            (defaultValues["modeOfShipment"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modeOfShipment"], context) :
                null) :
            null;

        context["field"] = "descriptionOfGoods";
        context["metadata"] = (objectMetadata ? objectMetadata["descriptionOfGoods"] : null);
        privateState.descriptionOfGoods = defaultValues ?
            (defaultValues["descriptionOfGoods"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["descriptionOfGoods"], context) :
                null) :
            null;

        context["field"] = "documentsRequired";
        context["metadata"] = (objectMetadata ? objectMetadata["documentsRequired"] : null);
        privateState.documentsRequired = defaultValues ?
            (defaultValues["documentsRequired"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentsRequired"], context) :
                null) :
            null;

        context["field"] = "additionalConditionsCode";
        context["metadata"] = (objectMetadata ? objectMetadata["additionalConditionsCode"] : null);
        privateState.additionalConditionsCode = defaultValues ?
            (defaultValues["additionalConditionsCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["additionalConditionsCode"], context) :
                null) :
            null;

        context["field"] = "otherAdditionalConditions";
        context["metadata"] = (objectMetadata ? objectMetadata["otherAdditionalConditions"] : null);
        privateState.otherAdditionalConditions = defaultValues ?
            (defaultValues["otherAdditionalConditions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherAdditionalConditions"], context) :
                null) :
            null;

        context["field"] = "documentCharges";
        context["metadata"] = (objectMetadata ? objectMetadata["documentCharges"] : null);
        privateState.documentCharges = defaultValues ?
            (defaultValues["documentCharges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["documentCharges"], context) :
                null) :
            null;

        context["field"] = "supportDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["supportDocuments"] : null);
        privateState.supportDocuments = defaultValues ?
            (defaultValues["supportDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supportDocuments"], context) :
                null) :
            null;

        context["field"] = "fileToUpload";
        context["metadata"] = (objectMetadata ? objectMetadata["fileToUpload"] : null);
        privateState.fileToUpload = defaultValues ?
            (defaultValues["fileToUpload"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileToUpload"], context) :
                null) :
            null;

        context["field"] = "confirmationInstruction";
        context["metadata"] = (objectMetadata ? objectMetadata["confirmationInstruction"] : null);
        privateState.confirmationInstruction = defaultValues ?
            (defaultValues["confirmationInstruction"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["confirmationInstruction"], context) :
                null) :
            null;

        context["field"] = "transferable";
        context["metadata"] = (objectMetadata ? objectMetadata["transferable"] : null);
        privateState.transferable = defaultValues ?
            (defaultValues["transferable"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transferable"], context) :
                null) :
            null;

        context["field"] = "standByLC";
        context["metadata"] = (objectMetadata ? objectMetadata["standByLC"] : null);
        privateState.standByLC = defaultValues ?
            (defaultValues["standByLC"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["standByLC"], context) :
                null) :
            null;

        context["field"] = "isDraft";
        context["metadata"] = (objectMetadata ? objectMetadata["isDraft"] : null);
        privateState.isDraft = defaultValues ?
            (defaultValues["isDraft"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isDraft"], context) :
                null) :
            null;

        context["field"] = "additionalPayableCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["additionalPayableCurrency"] : null);
        privateState.additionalPayableCurrency = defaultValues ?
            (defaultValues["additionalPayableCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["additionalPayableCurrency"], context) :
                null) :
            null;

        context["field"] = "code";
        context["metadata"] = (objectMetadata ? objectMetadata["code"] : null);
        privateState.code = defaultValues ?
            (defaultValues["code"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["code"], context) :
                null) :
            null;

        context["field"] = "msg";
        context["metadata"] = (objectMetadata ? objectMetadata["msg"] : null);
        privateState.msg = defaultValues ?
            (defaultValues["msg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["msg"], context) :
                null) :
            null;

        context["field"] = "flowType";
        context["metadata"] = (objectMetadata ? objectMetadata["flowType"] : null);
        privateState.flowType = defaultValues ?
            (defaultValues["flowType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["flowType"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "amendStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["amendStatus"] : null);
        privateState.amendStatus = defaultValues ?
            (defaultValues["amendStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendStatus"], context) :
                null) :
            null;

        context["field"] = "ErrorCode";
        context["metadata"] = (objectMetadata ? objectMetadata["ErrorCode"] : null);
        privateState.ErrorCode = defaultValues ?
            (defaultValues["ErrorCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ErrorCode"], context) :
                null) :
            null;

        context["field"] = "ErrorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["ErrorMessage"] : null);
        privateState.ErrorMessage = defaultValues ?
            (defaultValues["ErrorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ErrorMessage"], context) :
                null) :
            null;

        context["field"] = "srmsReqOrderID";
        context["metadata"] = (objectMetadata ? objectMetadata["srmsReqOrderID"] : null);
        privateState.srmsReqOrderID = defaultValues ?
            (defaultValues["srmsReqOrderID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["srmsReqOrderID"], context) :
                null) :
            null;

        context["field"] = "lcCreatedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["lcCreatedOn"] : null);
        privateState.lcCreatedOn = defaultValues ?
            (defaultValues["lcCreatedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcCreatedOn"], context) :
                null) :
            null;

        context["field"] = "draftCount";
        context["metadata"] = (objectMetadata ? objectMetadata["draftCount"] : null);
        privateState.draftCount = defaultValues ?
            (defaultValues["draftCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["draftCount"], context) :
                null) :
            null;

        context["field"] = "draftAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["draftAmount"] : null);
        privateState.draftAmount = defaultValues ?
            (defaultValues["draftAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["draftAmount"], context) :
                null) :
            null;

        context["field"] = "deletedCount";
        context["metadata"] = (objectMetadata ? objectMetadata["deletedCount"] : null);
        privateState.deletedCount = defaultValues ?
            (defaultValues["deletedCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deletedCount"], context) :
                null) :
            null;

        context["field"] = "deletedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["deletedAmount"] : null);
        privateState.deletedAmount = defaultValues ?
            (defaultValues["deletedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deletedAmount"], context) :
                null) :
            null;

        context["field"] = "selfApprovedCount";
        context["metadata"] = (objectMetadata ? objectMetadata["selfApprovedCount"] : null);
        privateState.selfApprovedCount = defaultValues ?
            (defaultValues["selfApprovedCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["selfApprovedCount"], context) :
                null) :
            null;

        context["field"] = "selfApprovedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["selfApprovedAmount"] : null);
        privateState.selfApprovedAmount = defaultValues ?
            (defaultValues["selfApprovedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["selfApprovedAmount"], context) :
                null) :
            null;

        context["field"] = "totalCount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalCount"] : null);
        privateState.totalCount = defaultValues ?
            (defaultValues["totalCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalCount"], context) :
                null) :
            null;

        context["field"] = "totalAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
        privateState.totalAmount = defaultValues ?
            (defaultValues["totalAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalAmount"], context) :
                null) :
            null;

        context["field"] = "fileId";
        context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
        privateState.fileId = defaultValues ?
            (defaultValues["fileId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fileId"], context) :
                null) :
            null;

        context["field"] = "amountType";
        context["metadata"] = (objectMetadata ? objectMetadata["amountType"] : null);
        privateState.amountType = defaultValues ?
            (defaultValues["amountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amountType"], context) :
                null) :
            null;

        context["field"] = "otherAmendments";
        context["metadata"] = (objectMetadata ? objectMetadata["otherAmendments"] : null);
        privateState.otherAmendments = defaultValues ?
            (defaultValues["otherAmendments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherAmendments"], context) :
                null) :
            null;

        context["field"] = "amendCharges";
        context["metadata"] = (objectMetadata ? objectMetadata["amendCharges"] : null);
        privateState.amendCharges = defaultValues ?
            (defaultValues["amendCharges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendCharges"], context) :
                null) :
            null;

        context["field"] = "chargesPaid";
        context["metadata"] = (objectMetadata ? objectMetadata["chargesPaid"] : null);
        privateState.chargesPaid = defaultValues ?
            (defaultValues["chargesPaid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chargesPaid"], context) :
                null) :
            null;

        context["field"] = "creditAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["creditAmount"] : null);
        privateState.creditAmount = defaultValues ?
            (defaultValues["creditAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditAmount"], context) :
                null) :
            null;

        context["field"] = "amendmentReference";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentReference"] : null);
        privateState.amendmentReference = defaultValues ?
            (defaultValues["amendmentReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentReference"], context) :
                null) :
            null;

        context["field"] = "amendmentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentDate"] : null);
        privateState.amendmentDate = defaultValues ?
            (defaultValues["amendmentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentDate"], context) :
                null) :
            null;

        context["field"] = "amendmentApprovedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentApprovedDate"] : null);
        privateState.amendmentApprovedDate = defaultValues ?
            (defaultValues["amendmentApprovedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentApprovedDate"], context) :
                null) :
            null;

        context["field"] = "lcType";
        context["metadata"] = (objectMetadata ? objectMetadata["lcType"] : null);
        privateState.lcType = defaultValues ?
            (defaultValues["lcType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcType"], context) :
                null) :
            null;

        context["field"] = "amendmentExpiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["amendmentExpiryDate"] : null);
        privateState.amendmentExpiryDate = defaultValues ?
            (defaultValues["amendmentExpiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amendmentExpiryDate"], context) :
                null) :
            null;

        context["field"] = "utilizedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["utilizedAmount"] : null);
        privateState.utilizedAmount = defaultValues ?
            (defaultValues["utilizedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["utilizedAmount"], context) :
                null) :
            null;

        context["field"] = "importLCId";
        context["metadata"] = (objectMetadata ? objectMetadata["importLCId"] : null);
        privateState.importLCId = defaultValues ?
            (defaultValues["importLCId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["importLCId"], context) :
                null) :
            null;

        context["field"] = "referenceNomatch";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceNomatch"] : null);
        privateState.referenceNomatch = defaultValues ?
            (defaultValues["referenceNomatch"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceNomatch"], context) :
                null) :
            null;

        context["field"] = "lcSRMSId";
        context["metadata"] = (objectMetadata ? objectMetadata["lcSRMSId"] : null);
        privateState.lcSRMSId = defaultValues ?
            (defaultValues["lcSRMSId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lcSRMSId"], context) :
                null) :
            null;

        context["field"] = "branchName";
        context["metadata"] = (objectMetadata ? objectMetadata["branchName"] : null);
        privateState.branchName = defaultValues ?
            (defaultValues["branchName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["branchName"], context) :
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

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "iban";
        context["metadata"] = (objectMetadata ? objectMetadata["iban"] : null);
        privateState.iban = defaultValues ?
            (defaultValues["iban"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["iban"], context) :
                null) :
            null;

        context["field"] = "bic";
        context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
        privateState.bic = defaultValues ?
            (defaultValues["bic"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bic"], context) :
                null) :
            null;

        context["field"] = "countryRegion";
        context["metadata"] = (objectMetadata ? objectMetadata["countryRegion"] : null);
        privateState.countryRegion = defaultValues ?
            (defaultValues["countryRegion"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["countryRegion"], context) :
                null) :
            null;

        context["field"] = "zipcode";
        context["metadata"] = (objectMetadata ? objectMetadata["zipcode"] : null);
        privateState.zipcode = defaultValues ?
            (defaultValues["zipcode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["zipcode"], context) :
                null) :
            null;

        context["field"] = "bankAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["bankAddress"] : null);
        privateState.bankAddress = defaultValues ?
            (defaultValues["bankAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankAddress"], context) :
                null) :
            null;

        context["field"] = "transactReference";
        context["metadata"] = (objectMetadata ? objectMetadata["transactReference"] : null);
        privateState.transactReference = defaultValues ?
            (defaultValues["transactReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactReference"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "lcReferenceNo": {
                get: function() {
                    context["field"] = "lcReferenceNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcReferenceNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcReferenceNo, context);
                },
                set: function(val) {
                    setterFunctions['lcReferenceNo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcAmount": {
                get: function() {
                    context["field"] = "lcAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcAmount, context);
                },
                set: function(val) {
                    setterFunctions['lcAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcCurrency": {
                get: function() {
                    context["field"] = "lcCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcCurrency, context);
                },
                set: function(val) {
                    setterFunctions['lcCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tolerancePercentage": {
                get: function() {
                    context["field"] = "tolerancePercentage";
                    context["metadata"] = (objectMetadata ? objectMetadata["tolerancePercentage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tolerancePercentage, context);
                },
                set: function(val) {
                    setterFunctions['tolerancePercentage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maximumCreditAmount": {
                get: function() {
                    context["field"] = "maximumCreditAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["maximumCreditAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maximumCreditAmount, context);
                },
                set: function(val) {
                    setterFunctions['maximumCreditAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "additionalAmountPayable": {
                get: function() {
                    context["field"] = "additionalAmountPayable";
                    context["metadata"] = (objectMetadata ? objectMetadata["additionalAmountPayable"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.additionalAmountPayable, context);
                },
                set: function(val) {
                    setterFunctions['additionalAmountPayable'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentTerms": {
                get: function() {
                    context["field"] = "paymentTerms";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentTerms"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentTerms, context);
                },
                set: function(val) {
                    setterFunctions['paymentTerms'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableWith1": {
                get: function() {
                    context["field"] = "availableWith1";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableWith1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableWith1, context);
                },
                set: function(val) {
                    setterFunctions['availableWith1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableWith2": {
                get: function() {
                    context["field"] = "availableWith2";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableWith2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableWith2, context);
                },
                set: function(val) {
                    setterFunctions['availableWith2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableWith3": {
                get: function() {
                    context["field"] = "availableWith3";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableWith3"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableWith3, context);
                },
                set: function(val) {
                    setterFunctions['availableWith3'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableWith4": {
                get: function() {
                    context["field"] = "availableWith4";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableWith4"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableWith4, context);
                },
                set: function(val) {
                    setterFunctions['availableWith4'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "issueDate": {
                get: function() {
                    context["field"] = "issueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["issueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.issueDate, context);
                },
                set: function(val) {
                    setterFunctions['issueDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiryDate": {
                get: function() {
                    context["field"] = "expiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryDate, context);
                },
                set: function(val) {
                    setterFunctions['expiryDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiryPlace": {
                get: function() {
                    context["field"] = "expiryPlace";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryPlace"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryPlace, context);
                },
                set: function(val) {
                    setterFunctions['expiryPlace'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chargesAccount": {
                get: function() {
                    context["field"] = "chargesAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["chargesAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chargesAccount, context);
                },
                set: function(val) {
                    setterFunctions['chargesAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "commisionAccount": {
                get: function() {
                    context["field"] = "commisionAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["commisionAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.commisionAccount, context);
                },
                set: function(val) {
                    setterFunctions['commisionAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "marginAccount": {
                get: function() {
                    context["field"] = "marginAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["marginAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.marginAccount, context);
                },
                set: function(val) {
                    setterFunctions['marginAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "messageToBank": {
                get: function() {
                    context["field"] = "messageToBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["messageToBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.messageToBank, context);
                },
                set: function(val) {
                    setterFunctions['messageToBank'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryName": {
                get: function() {
                    context["field"] = "beneficiaryName";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryName, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryAddressLine1": {
                get: function() {
                    context["field"] = "beneficiaryAddressLine1";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryAddressLine1, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryAddressLine1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryAddressLine2": {
                get: function() {
                    context["field"] = "beneficiaryAddressLine2";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryAddressLine2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryAddressLine2, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryAddressLine2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryPostCode": {
                get: function() {
                    context["field"] = "beneficiaryPostCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryPostCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryPostCode, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryPostCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryCountry": {
                get: function() {
                    context["field"] = "beneficiaryCountry";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryCountry"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryCountry, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryCountry'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryCity": {
                get: function() {
                    context["field"] = "beneficiaryCity";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryCity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryCity, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryCity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryState": {
                get: function() {
                    context["field"] = "beneficiaryState";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryState"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryState, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryState'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryBank": {
                get: function() {
                    context["field"] = "beneficiaryBank";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBank"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryBank, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryBank'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryBankAdressLine1": {
                get: function() {
                    context["field"] = "beneficiaryBankAdressLine1";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankAdressLine1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryBankAdressLine1, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryBankAdressLine1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryBankAdressLine2": {
                get: function() {
                    context["field"] = "beneficiaryBankAdressLine2";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankAdressLine2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryBankAdressLine2, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryBankAdressLine2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryBankPostCode": {
                get: function() {
                    context["field"] = "beneficiaryBankPostCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankPostCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryBankPostCode, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryBankPostCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryBankCountry": {
                get: function() {
                    context["field"] = "beneficiaryBankCountry";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankCountry"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryBankCountry, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryBankCountry'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryBankCity": {
                get: function() {
                    context["field"] = "beneficiaryBankCity";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankCity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryBankCity, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryBankCity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryBankState": {
                get: function() {
                    context["field"] = "beneficiaryBankState";
                    context["metadata"] = (objectMetadata ? objectMetadata["beneficiaryBankState"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.beneficiaryBankState, context);
                },
                set: function(val) {
                    setterFunctions['beneficiaryBankState'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "placeOfTakingIncharge": {
                get: function() {
                    context["field"] = "placeOfTakingIncharge";
                    context["metadata"] = (objectMetadata ? objectMetadata["placeOfTakingIncharge"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.placeOfTakingIncharge, context);
                },
                set: function(val) {
                    setterFunctions['placeOfTakingIncharge'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "portOfLoading": {
                get: function() {
                    context["field"] = "portOfLoading";
                    context["metadata"] = (objectMetadata ? objectMetadata["portOfLoading"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.portOfLoading, context);
                },
                set: function(val) {
                    setterFunctions['portOfLoading'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "portOfDischarge": {
                get: function() {
                    context["field"] = "portOfDischarge";
                    context["metadata"] = (objectMetadata ? objectMetadata["portOfDischarge"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.portOfDischarge, context);
                },
                set: function(val) {
                    setterFunctions['portOfDischarge'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "placeOfFinalDelivery": {
                get: function() {
                    context["field"] = "placeOfFinalDelivery";
                    context["metadata"] = (objectMetadata ? objectMetadata["placeOfFinalDelivery"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.placeOfFinalDelivery, context);
                },
                set: function(val) {
                    setterFunctions['placeOfFinalDelivery'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "latestShippingDate": {
                get: function() {
                    context["field"] = "latestShippingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["latestShippingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.latestShippingDate, context);
                },
                set: function(val) {
                    setterFunctions['latestShippingDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "presentationPeriod": {
                get: function() {
                    context["field"] = "presentationPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["presentationPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.presentationPeriod, context);
                },
                set: function(val) {
                    setterFunctions['presentationPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transshipment": {
                get: function() {
                    context["field"] = "transshipment";
                    context["metadata"] = (objectMetadata ? objectMetadata["transshipment"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transshipment, context);
                },
                set: function(val) {
                    setterFunctions['transshipment'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partialShipments": {
                get: function() {
                    context["field"] = "partialShipments";
                    context["metadata"] = (objectMetadata ? objectMetadata["partialShipments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partialShipments, context);
                },
                set: function(val) {
                    setterFunctions['partialShipments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "incoTerms": {
                get: function() {
                    context["field"] = "incoTerms";
                    context["metadata"] = (objectMetadata ? objectMetadata["incoTerms"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.incoTerms, context);
                },
                set: function(val) {
                    setterFunctions['incoTerms'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "modeOfShipment": {
                get: function() {
                    context["field"] = "modeOfShipment";
                    context["metadata"] = (objectMetadata ? objectMetadata["modeOfShipment"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.modeOfShipment, context);
                },
                set: function(val) {
                    setterFunctions['modeOfShipment'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "descriptionOfGoods": {
                get: function() {
                    context["field"] = "descriptionOfGoods";
                    context["metadata"] = (objectMetadata ? objectMetadata["descriptionOfGoods"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.descriptionOfGoods, context);
                },
                set: function(val) {
                    setterFunctions['descriptionOfGoods'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentsRequired": {
                get: function() {
                    context["field"] = "documentsRequired";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentsRequired"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentsRequired, context);
                },
                set: function(val) {
                    setterFunctions['documentsRequired'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "additionalConditionsCode": {
                get: function() {
                    context["field"] = "additionalConditionsCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["additionalConditionsCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.additionalConditionsCode, context);
                },
                set: function(val) {
                    setterFunctions['additionalConditionsCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otherAdditionalConditions": {
                get: function() {
                    context["field"] = "otherAdditionalConditions";
                    context["metadata"] = (objectMetadata ? objectMetadata["otherAdditionalConditions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otherAdditionalConditions, context);
                },
                set: function(val) {
                    setterFunctions['otherAdditionalConditions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "documentCharges": {
                get: function() {
                    context["field"] = "documentCharges";
                    context["metadata"] = (objectMetadata ? objectMetadata["documentCharges"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.documentCharges, context);
                },
                set: function(val) {
                    setterFunctions['documentCharges'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "supportDocuments": {
                get: function() {
                    context["field"] = "supportDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["supportDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supportDocuments, context);
                },
                set: function(val) {
                    setterFunctions['supportDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileToUpload": {
                get: function() {
                    context["field"] = "fileToUpload";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileToUpload"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileToUpload, context);
                },
                set: function(val) {
                    setterFunctions['fileToUpload'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "confirmationInstruction": {
                get: function() {
                    context["field"] = "confirmationInstruction";
                    context["metadata"] = (objectMetadata ? objectMetadata["confirmationInstruction"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.confirmationInstruction, context);
                },
                set: function(val) {
                    setterFunctions['confirmationInstruction'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transferable": {
                get: function() {
                    context["field"] = "transferable";
                    context["metadata"] = (objectMetadata ? objectMetadata["transferable"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transferable, context);
                },
                set: function(val) {
                    setterFunctions['transferable'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "standByLC": {
                get: function() {
                    context["field"] = "standByLC";
                    context["metadata"] = (objectMetadata ? objectMetadata["standByLC"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.standByLC, context);
                },
                set: function(val) {
                    setterFunctions['standByLC'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isDraft": {
                get: function() {
                    context["field"] = "isDraft";
                    context["metadata"] = (objectMetadata ? objectMetadata["isDraft"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isDraft, context);
                },
                set: function(val) {
                    setterFunctions['isDraft'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "additionalPayableCurrency": {
                get: function() {
                    context["field"] = "additionalPayableCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["additionalPayableCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.additionalPayableCurrency, context);
                },
                set: function(val) {
                    setterFunctions['additionalPayableCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "code": {
                get: function() {
                    context["field"] = "code";
                    context["metadata"] = (objectMetadata ? objectMetadata["code"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.code, context);
                },
                set: function(val) {
                    setterFunctions['code'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "msg": {
                get: function() {
                    context["field"] = "msg";
                    context["metadata"] = (objectMetadata ? objectMetadata["msg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.msg, context);
                },
                set: function(val) {
                    setterFunctions['msg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "flowType": {
                get: function() {
                    context["field"] = "flowType";
                    context["metadata"] = (objectMetadata ? objectMetadata["flowType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.flowType, context);
                },
                set: function(val) {
                    setterFunctions['flowType'].call(this, val, privateState);
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
            "amendStatus": {
                get: function() {
                    context["field"] = "amendStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendStatus, context);
                },
                set: function(val) {
                    setterFunctions['amendStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ErrorCode": {
                get: function() {
                    context["field"] = "ErrorCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["ErrorCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ErrorCode, context);
                },
                set: function(val) {
                    setterFunctions['ErrorCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ErrorMessage": {
                get: function() {
                    context["field"] = "ErrorMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["ErrorMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ErrorMessage, context);
                },
                set: function(val) {
                    setterFunctions['ErrorMessage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "srmsReqOrderID": {
                get: function() {
                    context["field"] = "srmsReqOrderID";
                    context["metadata"] = (objectMetadata ? objectMetadata["srmsReqOrderID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.srmsReqOrderID, context);
                },
                set: function(val) {
                    setterFunctions['srmsReqOrderID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcCreatedOn": {
                get: function() {
                    context["field"] = "lcCreatedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcCreatedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcCreatedOn, context);
                },
                set: function(val) {
                    setterFunctions['lcCreatedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "draftCount": {
                get: function() {
                    context["field"] = "draftCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["draftCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.draftCount, context);
                },
                set: function(val) {
                    setterFunctions['draftCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "draftAmount": {
                get: function() {
                    context["field"] = "draftAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["draftAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.draftAmount, context);
                },
                set: function(val) {
                    setterFunctions['draftAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deletedCount": {
                get: function() {
                    context["field"] = "deletedCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["deletedCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deletedCount, context);
                },
                set: function(val) {
                    setterFunctions['deletedCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deletedAmount": {
                get: function() {
                    context["field"] = "deletedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["deletedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deletedAmount, context);
                },
                set: function(val) {
                    setterFunctions['deletedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "selfApprovedCount": {
                get: function() {
                    context["field"] = "selfApprovedCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["selfApprovedCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.selfApprovedCount, context);
                },
                set: function(val) {
                    setterFunctions['selfApprovedCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "selfApprovedAmount": {
                get: function() {
                    context["field"] = "selfApprovedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["selfApprovedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.selfApprovedAmount, context);
                },
                set: function(val) {
                    setterFunctions['selfApprovedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalCount": {
                get: function() {
                    context["field"] = "totalCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalCount, context);
                },
                set: function(val) {
                    setterFunctions['totalCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalAmount": {
                get: function() {
                    context["field"] = "totalAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalAmount, context);
                },
                set: function(val) {
                    setterFunctions['totalAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fileId": {
                get: function() {
                    context["field"] = "fileId";
                    context["metadata"] = (objectMetadata ? objectMetadata["fileId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fileId, context);
                },
                set: function(val) {
                    setterFunctions['fileId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amountType": {
                get: function() {
                    context["field"] = "amountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["amountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amountType, context);
                },
                set: function(val) {
                    setterFunctions['amountType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otherAmendments": {
                get: function() {
                    context["field"] = "otherAmendments";
                    context["metadata"] = (objectMetadata ? objectMetadata["otherAmendments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otherAmendments, context);
                },
                set: function(val) {
                    setterFunctions['otherAmendments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendCharges": {
                get: function() {
                    context["field"] = "amendCharges";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendCharges"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendCharges, context);
                },
                set: function(val) {
                    setterFunctions['amendCharges'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chargesPaid": {
                get: function() {
                    context["field"] = "chargesPaid";
                    context["metadata"] = (objectMetadata ? objectMetadata["chargesPaid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chargesPaid, context);
                },
                set: function(val) {
                    setterFunctions['chargesPaid'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditAmount": {
                get: function() {
                    context["field"] = "creditAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditAmount, context);
                },
                set: function(val) {
                    setterFunctions['creditAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentReference": {
                get: function() {
                    context["field"] = "amendmentReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentReference, context);
                },
                set: function(val) {
                    setterFunctions['amendmentReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentDate": {
                get: function() {
                    context["field"] = "amendmentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentDate, context);
                },
                set: function(val) {
                    setterFunctions['amendmentDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentApprovedDate": {
                get: function() {
                    context["field"] = "amendmentApprovedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentApprovedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentApprovedDate, context);
                },
                set: function(val) {
                    setterFunctions['amendmentApprovedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcType": {
                get: function() {
                    context["field"] = "lcType";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcType, context);
                },
                set: function(val) {
                    setterFunctions['lcType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amendmentExpiryDate": {
                get: function() {
                    context["field"] = "amendmentExpiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["amendmentExpiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amendmentExpiryDate, context);
                },
                set: function(val) {
                    setterFunctions['amendmentExpiryDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "utilizedAmount": {
                get: function() {
                    context["field"] = "utilizedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["utilizedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.utilizedAmount, context);
                },
                set: function(val) {
                    setterFunctions['utilizedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "importLCId": {
                get: function() {
                    context["field"] = "importLCId";
                    context["metadata"] = (objectMetadata ? objectMetadata["importLCId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.importLCId, context);
                },
                set: function(val) {
                    setterFunctions['importLCId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "referenceNomatch": {
                get: function() {
                    context["field"] = "referenceNomatch";
                    context["metadata"] = (objectMetadata ? objectMetadata["referenceNomatch"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.referenceNomatch, context);
                },
                set: function(val) {
                    setterFunctions['referenceNomatch'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lcSRMSId": {
                get: function() {
                    context["field"] = "lcSRMSId";
                    context["metadata"] = (objectMetadata ? objectMetadata["lcSRMSId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lcSRMSId, context);
                },
                set: function(val) {
                    setterFunctions['lcSRMSId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "branchName": {
                get: function() {
                    context["field"] = "branchName";
                    context["metadata"] = (objectMetadata ? objectMetadata["branchName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.branchName, context);
                },
                set: function(val) {
                    setterFunctions['branchName'].call(this, val, privateState);
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
            "iban": {
                get: function() {
                    context["field"] = "iban";
                    context["metadata"] = (objectMetadata ? objectMetadata["iban"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.iban, context);
                },
                set: function(val) {
                    setterFunctions['iban'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bic": {
                get: function() {
                    context["field"] = "bic";
                    context["metadata"] = (objectMetadata ? objectMetadata["bic"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bic, context);
                },
                set: function(val) {
                    setterFunctions['bic'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "countryRegion": {
                get: function() {
                    context["field"] = "countryRegion";
                    context["metadata"] = (objectMetadata ? objectMetadata["countryRegion"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.countryRegion, context);
                },
                set: function(val) {
                    setterFunctions['countryRegion'].call(this, val, privateState);
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
            "bankAddress": {
                get: function() {
                    context["field"] = "bankAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankAddress, context);
                },
                set: function(val) {
                    setterFunctions['bankAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactReference": {
                get: function() {
                    context["field"] = "transactReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactReference, context);
                },
                set: function(val) {
                    setterFunctions['transactReference'].call(this, val, privateState);
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
            privateState.lcReferenceNo = value ? (value["lcReferenceNo"] ? value["lcReferenceNo"] : null) : null;
            privateState.lcAmount = value ? (value["lcAmount"] ? value["lcAmount"] : null) : null;
            privateState.lcCurrency = value ? (value["lcCurrency"] ? value["lcCurrency"] : null) : null;
            privateState.tolerancePercentage = value ? (value["tolerancePercentage"] ? value["tolerancePercentage"] : null) : null;
            privateState.maximumCreditAmount = value ? (value["maximumCreditAmount"] ? value["maximumCreditAmount"] : null) : null;
            privateState.additionalAmountPayable = value ? (value["additionalAmountPayable"] ? value["additionalAmountPayable"] : null) : null;
            privateState.paymentTerms = value ? (value["paymentTerms"] ? value["paymentTerms"] : null) : null;
            privateState.availableWith1 = value ? (value["availableWith1"] ? value["availableWith1"] : null) : null;
            privateState.availableWith2 = value ? (value["availableWith2"] ? value["availableWith2"] : null) : null;
            privateState.availableWith3 = value ? (value["availableWith3"] ? value["availableWith3"] : null) : null;
            privateState.availableWith4 = value ? (value["availableWith4"] ? value["availableWith4"] : null) : null;
            privateState.issueDate = value ? (value["issueDate"] ? value["issueDate"] : null) : null;
            privateState.expiryDate = value ? (value["expiryDate"] ? value["expiryDate"] : null) : null;
            privateState.expiryPlace = value ? (value["expiryPlace"] ? value["expiryPlace"] : null) : null;
            privateState.chargesAccount = value ? (value["chargesAccount"] ? value["chargesAccount"] : null) : null;
            privateState.commisionAccount = value ? (value["commisionAccount"] ? value["commisionAccount"] : null) : null;
            privateState.marginAccount = value ? (value["marginAccount"] ? value["marginAccount"] : null) : null;
            privateState.messageToBank = value ? (value["messageToBank"] ? value["messageToBank"] : null) : null;
            privateState.beneficiaryName = value ? (value["beneficiaryName"] ? value["beneficiaryName"] : null) : null;
            privateState.beneficiaryAddressLine1 = value ? (value["beneficiaryAddressLine1"] ? value["beneficiaryAddressLine1"] : null) : null;
            privateState.beneficiaryAddressLine2 = value ? (value["beneficiaryAddressLine2"] ? value["beneficiaryAddressLine2"] : null) : null;
            privateState.beneficiaryPostCode = value ? (value["beneficiaryPostCode"] ? value["beneficiaryPostCode"] : null) : null;
            privateState.beneficiaryCountry = value ? (value["beneficiaryCountry"] ? value["beneficiaryCountry"] : null) : null;
            privateState.beneficiaryCity = value ? (value["beneficiaryCity"] ? value["beneficiaryCity"] : null) : null;
            privateState.beneficiaryState = value ? (value["beneficiaryState"] ? value["beneficiaryState"] : null) : null;
            privateState.beneficiaryBank = value ? (value["beneficiaryBank"] ? value["beneficiaryBank"] : null) : null;
            privateState.beneficiaryBankAdressLine1 = value ? (value["beneficiaryBankAdressLine1"] ? value["beneficiaryBankAdressLine1"] : null) : null;
            privateState.beneficiaryBankAdressLine2 = value ? (value["beneficiaryBankAdressLine2"] ? value["beneficiaryBankAdressLine2"] : null) : null;
            privateState.beneficiaryBankPostCode = value ? (value["beneficiaryBankPostCode"] ? value["beneficiaryBankPostCode"] : null) : null;
            privateState.beneficiaryBankCountry = value ? (value["beneficiaryBankCountry"] ? value["beneficiaryBankCountry"] : null) : null;
            privateState.beneficiaryBankCity = value ? (value["beneficiaryBankCity"] ? value["beneficiaryBankCity"] : null) : null;
            privateState.beneficiaryBankState = value ? (value["beneficiaryBankState"] ? value["beneficiaryBankState"] : null) : null;
            privateState.placeOfTakingIncharge = value ? (value["placeOfTakingIncharge"] ? value["placeOfTakingIncharge"] : null) : null;
            privateState.portOfLoading = value ? (value["portOfLoading"] ? value["portOfLoading"] : null) : null;
            privateState.portOfDischarge = value ? (value["portOfDischarge"] ? value["portOfDischarge"] : null) : null;
            privateState.placeOfFinalDelivery = value ? (value["placeOfFinalDelivery"] ? value["placeOfFinalDelivery"] : null) : null;
            privateState.latestShippingDate = value ? (value["latestShippingDate"] ? value["latestShippingDate"] : null) : null;
            privateState.presentationPeriod = value ? (value["presentationPeriod"] ? value["presentationPeriod"] : null) : null;
            privateState.transshipment = value ? (value["transshipment"] ? value["transshipment"] : null) : null;
            privateState.partialShipments = value ? (value["partialShipments"] ? value["partialShipments"] : null) : null;
            privateState.incoTerms = value ? (value["incoTerms"] ? value["incoTerms"] : null) : null;
            privateState.modeOfShipment = value ? (value["modeOfShipment"] ? value["modeOfShipment"] : null) : null;
            privateState.descriptionOfGoods = value ? (value["descriptionOfGoods"] ? value["descriptionOfGoods"] : null) : null;
            privateState.documentsRequired = value ? (value["documentsRequired"] ? value["documentsRequired"] : null) : null;
            privateState.additionalConditionsCode = value ? (value["additionalConditionsCode"] ? value["additionalConditionsCode"] : null) : null;
            privateState.otherAdditionalConditions = value ? (value["otherAdditionalConditions"] ? value["otherAdditionalConditions"] : null) : null;
            privateState.documentCharges = value ? (value["documentCharges"] ? value["documentCharges"] : null) : null;
            privateState.supportDocuments = value ? (value["supportDocuments"] ? value["supportDocuments"] : null) : null;
            privateState.fileToUpload = value ? (value["fileToUpload"] ? value["fileToUpload"] : null) : null;
            privateState.confirmationInstruction = value ? (value["confirmationInstruction"] ? value["confirmationInstruction"] : null) : null;
            privateState.transferable = value ? (value["transferable"] ? value["transferable"] : null) : null;
            privateState.standByLC = value ? (value["standByLC"] ? value["standByLC"] : null) : null;
            privateState.isDraft = value ? (value["isDraft"] ? value["isDraft"] : null) : null;
            privateState.additionalPayableCurrency = value ? (value["additionalPayableCurrency"] ? value["additionalPayableCurrency"] : null) : null;
            privateState.code = value ? (value["code"] ? value["code"] : null) : null;
            privateState.msg = value ? (value["msg"] ? value["msg"] : null) : null;
            privateState.flowType = value ? (value["flowType"] ? value["flowType"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.amendStatus = value ? (value["amendStatus"] ? value["amendStatus"] : null) : null;
            privateState.ErrorCode = value ? (value["ErrorCode"] ? value["ErrorCode"] : null) : null;
            privateState.ErrorMessage = value ? (value["ErrorMessage"] ? value["ErrorMessage"] : null) : null;
            privateState.srmsReqOrderID = value ? (value["srmsReqOrderID"] ? value["srmsReqOrderID"] : null) : null;
            privateState.lcCreatedOn = value ? (value["lcCreatedOn"] ? value["lcCreatedOn"] : null) : null;
            privateState.draftCount = value ? (value["draftCount"] ? value["draftCount"] : null) : null;
            privateState.draftAmount = value ? (value["draftAmount"] ? value["draftAmount"] : null) : null;
            privateState.deletedCount = value ? (value["deletedCount"] ? value["deletedCount"] : null) : null;
            privateState.deletedAmount = value ? (value["deletedAmount"] ? value["deletedAmount"] : null) : null;
            privateState.selfApprovedCount = value ? (value["selfApprovedCount"] ? value["selfApprovedCount"] : null) : null;
            privateState.selfApprovedAmount = value ? (value["selfApprovedAmount"] ? value["selfApprovedAmount"] : null) : null;
            privateState.totalCount = value ? (value["totalCount"] ? value["totalCount"] : null) : null;
            privateState.totalAmount = value ? (value["totalAmount"] ? value["totalAmount"] : null) : null;
            privateState.fileId = value ? (value["fileId"] ? value["fileId"] : null) : null;
            privateState.amountType = value ? (value["amountType"] ? value["amountType"] : null) : null;
            privateState.otherAmendments = value ? (value["otherAmendments"] ? value["otherAmendments"] : null) : null;
            privateState.amendCharges = value ? (value["amendCharges"] ? value["amendCharges"] : null) : null;
            privateState.chargesPaid = value ? (value["chargesPaid"] ? value["chargesPaid"] : null) : null;
            privateState.creditAmount = value ? (value["creditAmount"] ? value["creditAmount"] : null) : null;
            privateState.amendmentReference = value ? (value["amendmentReference"] ? value["amendmentReference"] : null) : null;
            privateState.amendmentDate = value ? (value["amendmentDate"] ? value["amendmentDate"] : null) : null;
            privateState.amendmentApprovedDate = value ? (value["amendmentApprovedDate"] ? value["amendmentApprovedDate"] : null) : null;
            privateState.lcType = value ? (value["lcType"] ? value["lcType"] : null) : null;
            privateState.amendmentExpiryDate = value ? (value["amendmentExpiryDate"] ? value["amendmentExpiryDate"] : null) : null;
            privateState.utilizedAmount = value ? (value["utilizedAmount"] ? value["utilizedAmount"] : null) : null;
            privateState.importLCId = value ? (value["importLCId"] ? value["importLCId"] : null) : null;
            privateState.referenceNomatch = value ? (value["referenceNomatch"] ? value["referenceNomatch"] : null) : null;
            privateState.lcSRMSId = value ? (value["lcSRMSId"] ? value["lcSRMSId"] : null) : null;
            privateState.branchName = value ? (value["branchName"] ? value["branchName"] : null) : null;
            privateState.country = value ? (value["country"] ? value["country"] : null) : null;
            privateState.city = value ? (value["city"] ? value["city"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.iban = value ? (value["iban"] ? value["iban"] : null) : null;
            privateState.bic = value ? (value["bic"] ? value["bic"] : null) : null;
            privateState.countryRegion = value ? (value["countryRegion"] ? value["countryRegion"] : null) : null;
            privateState.zipcode = value ? (value["zipcode"] ? value["zipcode"] : null) : null;
            privateState.bankAddress = value ? (value["bankAddress"] ? value["bankAddress"] : null) : null;
            privateState.transactReference = value ? (value["transactReference"] ? value["transactReference"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(LetterOfCredit);

    //Create new class level validator object
    BaseModel.Validator.call(LetterOfCredit);

    var registerValidatorBackup = LetterOfCredit.registerValidator;

    LetterOfCredit.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(LetterOfCredit.isValid(this, propName, val)) {
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
    //For Operation 'updateImportLCByBank' with service id 'UpdateImportLCByBank7158'
     LetterOfCredit.updateImportLCByBank = function(params, onCompletion){
        return LetterOfCredit.customVerb('updateImportLCByBank', params, onCompletion);
     };

    //For Operation 'deleteImportLC' with service id 'createLetterOfCredits8652'
     LetterOfCredit.deleteImportLC = function(params, onCompletion){
        return LetterOfCredit.customVerb('deleteImportLC', params, onCompletion);
     };

    //For Operation 'updateImportLCAmendmentByBank' with service id 'UpdateImportLCAmendmentByBank4949'
     LetterOfCredit.updateImportLCAmendmentByBank = function(params, onCompletion){
        return LetterOfCredit.customVerb('updateImportLCAmendmentByBank', params, onCompletion);
     };

    //For Operation 'getImportLetterOfCreditAmendments' with service id 'getImportLetterOfCreditAmendments6245'
     LetterOfCredit.getImportLetterOfCreditAmendments = function(params, onCompletion){
        return LetterOfCredit.customVerb('getImportLetterOfCreditAmendments', params, onCompletion);
     };

    //For Operation 'createImportLC' with service id 'createLetterOfCredits6489'
     LetterOfCredit.createImportLC = function(params, onCompletion){
        return LetterOfCredit.customVerb('createImportLC', params, onCompletion);
     };

    //For Operation 'createImportLetterOfCreditAmendment' with service id 'createImportLetterOfCreditAmendment4791'
     LetterOfCredit.createImportLetterOfCreditAmendment = function(params, onCompletion){
        return LetterOfCredit.customVerb('createImportLetterOfCreditAmendment', params, onCompletion);
     };

    //For Operation 'getImportLetterOfCreditAmendmentsById' with service id 'getImportLetterOfCreditAmendmentsById5092'
     LetterOfCredit.getImportLetterOfCreditAmendmentsById = function(params, onCompletion){
        return LetterOfCredit.customVerb('getImportLetterOfCreditAmendmentsById', params, onCompletion);
     };

    //For Operation 'getLetterOfCreditsById' with service id 'getServiceRequestsByID5551'
     LetterOfCredit.getLetterOfCreditsById = function(params, onCompletion){
        return LetterOfCredit.customVerb('getLetterOfCreditsById', params, onCompletion);
     };

    //For Operation 'getSwiftCode' with service id 'getSwiftCode8796'
     LetterOfCredit.getSwiftCode = function(params, onCompletion){
        return LetterOfCredit.customVerb('getSwiftCode', params, onCompletion);
     };

    //For Operation 'getImportLCs' with service id 'getLetterOfCredits7427'
     LetterOfCredit.getImportLCs = function(params, onCompletion){
        return LetterOfCredit.customVerb('getImportLCs', params, onCompletion);
     };

    var relations = [];

    LetterOfCredit.relations = relations;

    LetterOfCredit.prototype.isValid = function() {
        return LetterOfCredit.isValid(this);
    };

    LetterOfCredit.prototype.objModelName = "LetterOfCredit";
    LetterOfCredit.prototype.objServiceName = "TradeFinance";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    LetterOfCredit.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeFinance", "LetterOfCredit", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    LetterOfCredit.clone = function(objectToClone) {
        var clonedObj = new LetterOfCredit();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return LetterOfCredit;
});