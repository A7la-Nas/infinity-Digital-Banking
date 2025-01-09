/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Mortgage", "objectService" : "Holdings"};

    var setterFunctions = {
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementId: function(val, state) {
            context["field"] = "arrangementId";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
            state['arrangementId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        commitmentAmount: function(val, state) {
            context["field"] = "commitmentAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["commitmentAmount"] : null);
            state['commitmentAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        utilisedAmount: function(val, state) {
            context["field"] = "utilisedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["utilisedAmount"] : null);
            state['utilisedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalPaidAmount: function(val, state) {
            context["field"] = "totalPaidAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalPaidAmount"] : null);
            state['totalPaidAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        startDate: function(val, state) {
            context["field"] = "startDate";
            context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
            state['startDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        effectiveDate: function(val, state) {
            context["field"] = "effectiveDate";
            context["metadata"] = (objectMetadata ? objectMetadata["effectiveDate"] : null);
            state['effectiveDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maturityDate: function(val, state) {
            context["field"] = "maturityDate";
            context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
            state['maturityDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        commitmentTerm: function(val, state) {
            context["field"] = "commitmentTerm";
            context["metadata"] = (objectMetadata ? objectMetadata["commitmentTerm"] : null);
            state['commitmentTerm'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalOutstandingBalance: function(val, state) {
            context["field"] = "totalOutstandingBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["totalOutstandingBalance"] : null);
            state['totalOutstandingBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        iBAN: function(val, state) {
            context["field"] = "iBAN";
            context["metadata"] = (objectMetadata ? objectMetadata["iBAN"] : null);
            state['iBAN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        propertyType: function(val, state) {
            context["field"] = "propertyType";
            context["metadata"] = (objectMetadata ? objectMetadata["propertyType"] : null);
            state['propertyType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        propertyAddress: function(val, state) {
            context["field"] = "propertyAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["propertyAddress"] : null);
            state['propertyAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementstatus: function(val, state) {
            context["field"] = "arrangementstatus";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementstatus"] : null);
            state['arrangementstatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        product: function(val, state) {
            context["field"] = "product";
            context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
            state['product'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ownership: function(val, state) {
            context["field"] = "ownership";
            context["metadata"] = (objectMetadata ? objectMetadata["ownership"] : null);
            state['ownership'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        homeOwnership: function(val, state) {
            context["field"] = "homeOwnership";
            context["metadata"] = (objectMetadata ? objectMetadata["homeOwnership"] : null);
            state['homeOwnership'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountType: function(val, state) {
            context["field"] = "accountType";
            context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
            state['accountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerName: function(val, state) {
            context["field"] = "customerName";
            context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
            state['customerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionAmount: function(val, state) {
            context["field"] = "transactionAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
            state['transactionAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyId: function(val, state) {
            context["field"] = "currencyId";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyId"] : null);
            state['currencyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        facilityName: function(val, state) {
            context["field"] = "facilityName";
            context["metadata"] = (objectMetadata ? objectMetadata["facilityName"] : null);
            state['facilityName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        numOfLoans: function(val, state) {
            context["field"] = "numOfLoans";
            context["metadata"] = (objectMetadata ? objectMetadata["numOfLoans"] : null);
            state['numOfLoans'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentOutstandingBalanceCurrency: function(val, state) {
            context["field"] = "currentOutstandingBalanceCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["currentOutstandingBalanceCurrency"] : null);
            state['currentOutstandingBalanceCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentOutstandingBalanceAmount: function(val, state) {
            context["field"] = "currentOutstandingBalanceAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["currentOutstandingBalanceAmount"] : null);
            state['currentOutstandingBalanceAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amountPaidToDate: function(val, state) {
            context["field"] = "amountPaidToDate";
            context["metadata"] = (objectMetadata ? objectMetadata["amountPaidToDate"] : null);
            state['amountPaidToDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestDetails: function(val, state) {
            context["field"] = "requestDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["requestDetails"] : null);
            state['requestDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDetails: function(val, state) {
            context["field"] = "paymentDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDetails"] : null);
            state['paymentDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supportingDocuments: function(val, state) {
            context["field"] = "supportingDocuments";
            context["metadata"] = (objectMetadata ? objectMetadata["supportingDocuments"] : null);
            state['supportingDocuments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentInstallmentAmount: function(val, state) {
            context["field"] = "currentInstallmentAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["currentInstallmentAmount"] : null);
            state['currentInstallmentAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentNextRepaymentDate: function(val, state) {
            context["field"] = "currentNextRepaymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["currentNextRepaymentDate"] : null);
            state['currentNextRepaymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentEndDate: function(val, state) {
            context["field"] = "currentEndDate";
            context["metadata"] = (objectMetadata ? objectMetadata["currentEndDate"] : null);
            state['currentEndDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        simulatedInstallmentAmount: function(val, state) {
            context["field"] = "simulatedInstallmentAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["simulatedInstallmentAmount"] : null);
            state['simulatedInstallmentAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        simulatedNextRepaymentDate: function(val, state) {
            context["field"] = "simulatedNextRepaymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["simulatedNextRepaymentDate"] : null);
            state['simulatedNextRepaymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        simulatedEndDate: function(val, state) {
            context["field"] = "simulatedEndDate";
            context["metadata"] = (objectMetadata ? objectMetadata["simulatedEndDate"] : null);
            state['simulatedEndDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        activityId: function(val, state) {
            context["field"] = "activityId";
            context["metadata"] = (objectMetadata ? objectMetadata["activityId"] : null);
            state['activityId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supportingDocumentIds: function(val, state) {
            context["field"] = "supportingDocumentIds";
            context["metadata"] = (objectMetadata ? objectMetadata["supportingDocumentIds"] : null);
            state['supportingDocumentIds'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        repaymentAccount: function(val, state) {
            context["field"] = "repaymentAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["repaymentAccount"] : null);
            state['repaymentAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalOutstandingPricipal: function(val, state) {
            context["field"] = "totalOutstandingPricipal";
            context["metadata"] = (objectMetadata ? objectMetadata["totalOutstandingPricipal"] : null);
            state['totalOutstandingPricipal'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        principalInterest: function(val, state) {
            context["field"] = "principalInterest";
            context["metadata"] = (objectMetadata ? objectMetadata["principalInterest"] : null);
            state['principalInterest'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tax: function(val, state) {
            context["field"] = "tax";
            context["metadata"] = (objectMetadata ? objectMetadata["tax"] : null);
            state['tax'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        earlyPayoffFee: function(val, state) {
            context["field"] = "earlyPayoffFee";
            context["metadata"] = (objectMetadata ? objectMetadata["earlyPayoffFee"] : null);
            state['earlyPayoffFee'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        otherCharges: function(val, state) {
            context["field"] = "otherCharges";
            context["metadata"] = (objectMetadata ? objectMetadata["otherCharges"] : null);
            state['otherCharges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payOffDate: function(val, state) {
            context["field"] = "payOffDate";
            context["metadata"] = (objectMetadata ? objectMetadata["payOffDate"] : null);
            state['payOffDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalPayOffAmount: function(val, state) {
            context["field"] = "totalPayOffAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalPayOffAmount"] : null);
            state['totalPayOffAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Mortgage(defaultValues) {
        var privateState = {};
        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "arrangementId";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
        privateState.arrangementId = defaultValues ?
            (defaultValues["arrangementId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementId"], context) :
                null) :
            null;

        context["field"] = "commitmentAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["commitmentAmount"] : null);
        privateState.commitmentAmount = defaultValues ?
            (defaultValues["commitmentAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["commitmentAmount"], context) :
                null) :
            null;

        context["field"] = "utilisedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["utilisedAmount"] : null);
        privateState.utilisedAmount = defaultValues ?
            (defaultValues["utilisedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["utilisedAmount"], context) :
                null) :
            null;

        context["field"] = "totalPaidAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalPaidAmount"] : null);
        privateState.totalPaidAmount = defaultValues ?
            (defaultValues["totalPaidAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalPaidAmount"], context) :
                null) :
            null;

        context["field"] = "startDate";
        context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
        privateState.startDate = defaultValues ?
            (defaultValues["startDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["startDate"], context) :
                null) :
            null;

        context["field"] = "effectiveDate";
        context["metadata"] = (objectMetadata ? objectMetadata["effectiveDate"] : null);
        privateState.effectiveDate = defaultValues ?
            (defaultValues["effectiveDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["effectiveDate"], context) :
                null) :
            null;

        context["field"] = "maturityDate";
        context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
        privateState.maturityDate = defaultValues ?
            (defaultValues["maturityDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maturityDate"], context) :
                null) :
            null;

        context["field"] = "commitmentTerm";
        context["metadata"] = (objectMetadata ? objectMetadata["commitmentTerm"] : null);
        privateState.commitmentTerm = defaultValues ?
            (defaultValues["commitmentTerm"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["commitmentTerm"], context) :
                null) :
            null;

        context["field"] = "totalOutstandingBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["totalOutstandingBalance"] : null);
        privateState.totalOutstandingBalance = defaultValues ?
            (defaultValues["totalOutstandingBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalOutstandingBalance"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "iBAN";
        context["metadata"] = (objectMetadata ? objectMetadata["iBAN"] : null);
        privateState.iBAN = defaultValues ?
            (defaultValues["iBAN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["iBAN"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "propertyType";
        context["metadata"] = (objectMetadata ? objectMetadata["propertyType"] : null);
        privateState.propertyType = defaultValues ?
            (defaultValues["propertyType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["propertyType"], context) :
                null) :
            null;

        context["field"] = "propertyAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["propertyAddress"] : null);
        privateState.propertyAddress = defaultValues ?
            (defaultValues["propertyAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["propertyAddress"], context) :
                null) :
            null;

        context["field"] = "arrangementstatus";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementstatus"] : null);
        privateState.arrangementstatus = defaultValues ?
            (defaultValues["arrangementstatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementstatus"], context) :
                null) :
            null;

        context["field"] = "product";
        context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
        privateState.product = defaultValues ?
            (defaultValues["product"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["product"], context) :
                null) :
            null;

        context["field"] = "ownership";
        context["metadata"] = (objectMetadata ? objectMetadata["ownership"] : null);
        privateState.ownership = defaultValues ?
            (defaultValues["ownership"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ownership"], context) :
                null) :
            null;

        context["field"] = "homeOwnership";
        context["metadata"] = (objectMetadata ? objectMetadata["homeOwnership"] : null);
        privateState.homeOwnership = defaultValues ?
            (defaultValues["homeOwnership"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["homeOwnership"], context) :
                null) :
            null;

        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
                null) :
            null;

        context["field"] = "accountType";
        context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
        privateState.accountType = defaultValues ?
            (defaultValues["accountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountType"], context) :
                null) :
            null;

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "customerName";
        context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
        privateState.customerName = defaultValues ?
            (defaultValues["customerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerName"], context) :
                null) :
            null;

        context["field"] = "transactionAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
        privateState.transactionAmount = defaultValues ?
            (defaultValues["transactionAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionAmount"], context) :
                null) :
            null;

        context["field"] = "currencyId";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyId"] : null);
        privateState.currencyId = defaultValues ?
            (defaultValues["currencyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyId"], context) :
                null) :
            null;

        context["field"] = "facilityName";
        context["metadata"] = (objectMetadata ? objectMetadata["facilityName"] : null);
        privateState.facilityName = defaultValues ?
            (defaultValues["facilityName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["facilityName"], context) :
                null) :
            null;

        context["field"] = "numOfLoans";
        context["metadata"] = (objectMetadata ? objectMetadata["numOfLoans"] : null);
        privateState.numOfLoans = defaultValues ?
            (defaultValues["numOfLoans"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["numOfLoans"], context) :
                null) :
            null;

        context["field"] = "currentOutstandingBalanceCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["currentOutstandingBalanceCurrency"] : null);
        privateState.currentOutstandingBalanceCurrency = defaultValues ?
            (defaultValues["currentOutstandingBalanceCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentOutstandingBalanceCurrency"], context) :
                null) :
            null;

        context["field"] = "currentOutstandingBalanceAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["currentOutstandingBalanceAmount"] : null);
        privateState.currentOutstandingBalanceAmount = defaultValues ?
            (defaultValues["currentOutstandingBalanceAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentOutstandingBalanceAmount"], context) :
                null) :
            null;

        context["field"] = "amountPaidToDate";
        context["metadata"] = (objectMetadata ? objectMetadata["amountPaidToDate"] : null);
        privateState.amountPaidToDate = defaultValues ?
            (defaultValues["amountPaidToDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amountPaidToDate"], context) :
                null) :
            null;

        context["field"] = "requestDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["requestDetails"] : null);
        privateState.requestDetails = defaultValues ?
            (defaultValues["requestDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestDetails"], context) :
                null) :
            null;

        context["field"] = "paymentDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDetails"] : null);
        privateState.paymentDetails = defaultValues ?
            (defaultValues["paymentDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDetails"], context) :
                null) :
            null;

        context["field"] = "supportingDocuments";
        context["metadata"] = (objectMetadata ? objectMetadata["supportingDocuments"] : null);
        privateState.supportingDocuments = defaultValues ?
            (defaultValues["supportingDocuments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supportingDocuments"], context) :
                null) :
            null;

        context["field"] = "currentInstallmentAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["currentInstallmentAmount"] : null);
        privateState.currentInstallmentAmount = defaultValues ?
            (defaultValues["currentInstallmentAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentInstallmentAmount"], context) :
                null) :
            null;

        context["field"] = "currentNextRepaymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["currentNextRepaymentDate"] : null);
        privateState.currentNextRepaymentDate = defaultValues ?
            (defaultValues["currentNextRepaymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentNextRepaymentDate"], context) :
                null) :
            null;

        context["field"] = "currentEndDate";
        context["metadata"] = (objectMetadata ? objectMetadata["currentEndDate"] : null);
        privateState.currentEndDate = defaultValues ?
            (defaultValues["currentEndDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentEndDate"], context) :
                null) :
            null;

        context["field"] = "simulatedInstallmentAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["simulatedInstallmentAmount"] : null);
        privateState.simulatedInstallmentAmount = defaultValues ?
            (defaultValues["simulatedInstallmentAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["simulatedInstallmentAmount"], context) :
                null) :
            null;

        context["field"] = "simulatedNextRepaymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["simulatedNextRepaymentDate"] : null);
        privateState.simulatedNextRepaymentDate = defaultValues ?
            (defaultValues["simulatedNextRepaymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["simulatedNextRepaymentDate"], context) :
                null) :
            null;

        context["field"] = "simulatedEndDate";
        context["metadata"] = (objectMetadata ? objectMetadata["simulatedEndDate"] : null);
        privateState.simulatedEndDate = defaultValues ?
            (defaultValues["simulatedEndDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["simulatedEndDate"], context) :
                null) :
            null;

        context["field"] = "activityId";
        context["metadata"] = (objectMetadata ? objectMetadata["activityId"] : null);
        privateState.activityId = defaultValues ?
            (defaultValues["activityId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["activityId"], context) :
                null) :
            null;

        context["field"] = "supportingDocumentIds";
        context["metadata"] = (objectMetadata ? objectMetadata["supportingDocumentIds"] : null);
        privateState.supportingDocumentIds = defaultValues ?
            (defaultValues["supportingDocumentIds"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supportingDocumentIds"], context) :
                null) :
            null;

        context["field"] = "repaymentAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["repaymentAccount"] : null);
        privateState.repaymentAccount = defaultValues ?
            (defaultValues["repaymentAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["repaymentAccount"], context) :
                null) :
            null;

        context["field"] = "totalOutstandingPricipal";
        context["metadata"] = (objectMetadata ? objectMetadata["totalOutstandingPricipal"] : null);
        privateState.totalOutstandingPricipal = defaultValues ?
            (defaultValues["totalOutstandingPricipal"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalOutstandingPricipal"], context) :
                null) :
            null;

        context["field"] = "principalInterest";
        context["metadata"] = (objectMetadata ? objectMetadata["principalInterest"] : null);
        privateState.principalInterest = defaultValues ?
            (defaultValues["principalInterest"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["principalInterest"], context) :
                null) :
            null;

        context["field"] = "tax";
        context["metadata"] = (objectMetadata ? objectMetadata["tax"] : null);
        privateState.tax = defaultValues ?
            (defaultValues["tax"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tax"], context) :
                null) :
            null;

        context["field"] = "earlyPayoffFee";
        context["metadata"] = (objectMetadata ? objectMetadata["earlyPayoffFee"] : null);
        privateState.earlyPayoffFee = defaultValues ?
            (defaultValues["earlyPayoffFee"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["earlyPayoffFee"], context) :
                null) :
            null;

        context["field"] = "otherCharges";
        context["metadata"] = (objectMetadata ? objectMetadata["otherCharges"] : null);
        privateState.otherCharges = defaultValues ?
            (defaultValues["otherCharges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["otherCharges"], context) :
                null) :
            null;

        context["field"] = "payOffDate";
        context["metadata"] = (objectMetadata ? objectMetadata["payOffDate"] : null);
        privateState.payOffDate = defaultValues ?
            (defaultValues["payOffDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payOffDate"], context) :
                null) :
            null;

        context["field"] = "totalPayOffAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalPayOffAmount"] : null);
        privateState.totalPayOffAmount = defaultValues ?
            (defaultValues["totalPayOffAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalPayOffAmount"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "commitmentAmount": {
                get: function() {
                    context["field"] = "commitmentAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["commitmentAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.commitmentAmount, context);
                },
                set: function(val) {
                    setterFunctions['commitmentAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "utilisedAmount": {
                get: function() {
                    context["field"] = "utilisedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["utilisedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.utilisedAmount, context);
                },
                set: function(val) {
                    setterFunctions['utilisedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalPaidAmount": {
                get: function() {
                    context["field"] = "totalPaidAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalPaidAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalPaidAmount, context);
                },
                set: function(val) {
                    setterFunctions['totalPaidAmount'].call(this, val, privateState);
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
            "effectiveDate": {
                get: function() {
                    context["field"] = "effectiveDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["effectiveDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.effectiveDate, context);
                },
                set: function(val) {
                    setterFunctions['effectiveDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maturityDate": {
                get: function() {
                    context["field"] = "maturityDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maturityDate, context);
                },
                set: function(val) {
                    setterFunctions['maturityDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "commitmentTerm": {
                get: function() {
                    context["field"] = "commitmentTerm";
                    context["metadata"] = (objectMetadata ? objectMetadata["commitmentTerm"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.commitmentTerm, context);
                },
                set: function(val) {
                    setterFunctions['commitmentTerm'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalOutstandingBalance": {
                get: function() {
                    context["field"] = "totalOutstandingBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalOutstandingBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalOutstandingBalance, context);
                },
                set: function(val) {
                    setterFunctions['totalOutstandingBalance'].call(this, val, privateState);
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
            "iBAN": {
                get: function() {
                    context["field"] = "iBAN";
                    context["metadata"] = (objectMetadata ? objectMetadata["iBAN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.iBAN, context);
                },
                set: function(val) {
                    setterFunctions['iBAN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currency": {
                get: function() {
                    context["field"] = "currency";
                    context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currency, context);
                },
                set: function(val) {
                    setterFunctions['currency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "propertyType": {
                get: function() {
                    context["field"] = "propertyType";
                    context["metadata"] = (objectMetadata ? objectMetadata["propertyType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.propertyType, context);
                },
                set: function(val) {
                    setterFunctions['propertyType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "propertyAddress": {
                get: function() {
                    context["field"] = "propertyAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["propertyAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.propertyAddress, context);
                },
                set: function(val) {
                    setterFunctions['propertyAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangementstatus": {
                get: function() {
                    context["field"] = "arrangementstatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementstatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementstatus, context);
                },
                set: function(val) {
                    setterFunctions['arrangementstatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "product": {
                get: function() {
                    context["field"] = "product";
                    context["metadata"] = (objectMetadata ? objectMetadata["product"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.product, context);
                },
                set: function(val) {
                    setterFunctions['product'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ownership": {
                get: function() {
                    context["field"] = "ownership";
                    context["metadata"] = (objectMetadata ? objectMetadata["ownership"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ownership, context);
                },
                set: function(val) {
                    setterFunctions['ownership'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "homeOwnership": {
                get: function() {
                    context["field"] = "homeOwnership";
                    context["metadata"] = (objectMetadata ? objectMetadata["homeOwnership"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.homeOwnership, context);
                },
                set: function(val) {
                    setterFunctions['homeOwnership'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountID": {
                get: function() {
                    context["field"] = "accountID";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountID, context);
                },
                set: function(val) {
                    setterFunctions['accountID'].call(this, val, privateState);
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
            "transactionAmount": {
                get: function() {
                    context["field"] = "transactionAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionAmount, context);
                },
                set: function(val) {
                    setterFunctions['transactionAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currencyId": {
                get: function() {
                    context["field"] = "currencyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["currencyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currencyId, context);
                },
                set: function(val) {
                    setterFunctions['currencyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "facilityName": {
                get: function() {
                    context["field"] = "facilityName";
                    context["metadata"] = (objectMetadata ? objectMetadata["facilityName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.facilityName, context);
                },
                set: function(val) {
                    setterFunctions['facilityName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "numOfLoans": {
                get: function() {
                    context["field"] = "numOfLoans";
                    context["metadata"] = (objectMetadata ? objectMetadata["numOfLoans"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.numOfLoans, context);
                },
                set: function(val) {
                    setterFunctions['numOfLoans'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentOutstandingBalanceCurrency": {
                get: function() {
                    context["field"] = "currentOutstandingBalanceCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentOutstandingBalanceCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentOutstandingBalanceCurrency, context);
                },
                set: function(val) {
                    setterFunctions['currentOutstandingBalanceCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentOutstandingBalanceAmount": {
                get: function() {
                    context["field"] = "currentOutstandingBalanceAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentOutstandingBalanceAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentOutstandingBalanceAmount, context);
                },
                set: function(val) {
                    setterFunctions['currentOutstandingBalanceAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amountPaidToDate": {
                get: function() {
                    context["field"] = "amountPaidToDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["amountPaidToDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amountPaidToDate, context);
                },
                set: function(val) {
                    setterFunctions['amountPaidToDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestDetails": {
                get: function() {
                    context["field"] = "requestDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestDetails, context);
                },
                set: function(val) {
                    setterFunctions['requestDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentDetails": {
                get: function() {
                    context["field"] = "paymentDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentDetails, context);
                },
                set: function(val) {
                    setterFunctions['paymentDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "supportingDocuments": {
                get: function() {
                    context["field"] = "supportingDocuments";
                    context["metadata"] = (objectMetadata ? objectMetadata["supportingDocuments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supportingDocuments, context);
                },
                set: function(val) {
                    setterFunctions['supportingDocuments'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentInstallmentAmount": {
                get: function() {
                    context["field"] = "currentInstallmentAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentInstallmentAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentInstallmentAmount, context);
                },
                set: function(val) {
                    setterFunctions['currentInstallmentAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentNextRepaymentDate": {
                get: function() {
                    context["field"] = "currentNextRepaymentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentNextRepaymentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentNextRepaymentDate, context);
                },
                set: function(val) {
                    setterFunctions['currentNextRepaymentDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentEndDate": {
                get: function() {
                    context["field"] = "currentEndDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentEndDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentEndDate, context);
                },
                set: function(val) {
                    setterFunctions['currentEndDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "simulatedInstallmentAmount": {
                get: function() {
                    context["field"] = "simulatedInstallmentAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["simulatedInstallmentAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.simulatedInstallmentAmount, context);
                },
                set: function(val) {
                    setterFunctions['simulatedInstallmentAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "simulatedNextRepaymentDate": {
                get: function() {
                    context["field"] = "simulatedNextRepaymentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["simulatedNextRepaymentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.simulatedNextRepaymentDate, context);
                },
                set: function(val) {
                    setterFunctions['simulatedNextRepaymentDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "simulatedEndDate": {
                get: function() {
                    context["field"] = "simulatedEndDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["simulatedEndDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.simulatedEndDate, context);
                },
                set: function(val) {
                    setterFunctions['simulatedEndDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "activityId": {
                get: function() {
                    context["field"] = "activityId";
                    context["metadata"] = (objectMetadata ? objectMetadata["activityId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.activityId, context);
                },
                set: function(val) {
                    setterFunctions['activityId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "supportingDocumentIds": {
                get: function() {
                    context["field"] = "supportingDocumentIds";
                    context["metadata"] = (objectMetadata ? objectMetadata["supportingDocumentIds"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supportingDocumentIds, context);
                },
                set: function(val) {
                    setterFunctions['supportingDocumentIds'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "repaymentAccount": {
                get: function() {
                    context["field"] = "repaymentAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["repaymentAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.repaymentAccount, context);
                },
                set: function(val) {
                    setterFunctions['repaymentAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalOutstandingPricipal": {
                get: function() {
                    context["field"] = "totalOutstandingPricipal";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalOutstandingPricipal"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalOutstandingPricipal, context);
                },
                set: function(val) {
                    setterFunctions['totalOutstandingPricipal'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "principalInterest": {
                get: function() {
                    context["field"] = "principalInterest";
                    context["metadata"] = (objectMetadata ? objectMetadata["principalInterest"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.principalInterest, context);
                },
                set: function(val) {
                    setterFunctions['principalInterest'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tax": {
                get: function() {
                    context["field"] = "tax";
                    context["metadata"] = (objectMetadata ? objectMetadata["tax"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tax, context);
                },
                set: function(val) {
                    setterFunctions['tax'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "earlyPayoffFee": {
                get: function() {
                    context["field"] = "earlyPayoffFee";
                    context["metadata"] = (objectMetadata ? objectMetadata["earlyPayoffFee"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.earlyPayoffFee, context);
                },
                set: function(val) {
                    setterFunctions['earlyPayoffFee'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "otherCharges": {
                get: function() {
                    context["field"] = "otherCharges";
                    context["metadata"] = (objectMetadata ? objectMetadata["otherCharges"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.otherCharges, context);
                },
                set: function(val) {
                    setterFunctions['otherCharges'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payOffDate": {
                get: function() {
                    context["field"] = "payOffDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["payOffDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payOffDate, context);
                },
                set: function(val) {
                    setterFunctions['payOffDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalPayOffAmount": {
                get: function() {
                    context["field"] = "totalPayOffAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalPayOffAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalPayOffAmount, context);
                },
                set: function(val) {
                    setterFunctions['totalPayOffAmount'].call(this, val, privateState);
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
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.arrangementId = value ? (value["arrangementId"] ? value["arrangementId"] : null) : null;
            privateState.commitmentAmount = value ? (value["commitmentAmount"] ? value["commitmentAmount"] : null) : null;
            privateState.utilisedAmount = value ? (value["utilisedAmount"] ? value["utilisedAmount"] : null) : null;
            privateState.totalPaidAmount = value ? (value["totalPaidAmount"] ? value["totalPaidAmount"] : null) : null;
            privateState.startDate = value ? (value["startDate"] ? value["startDate"] : null) : null;
            privateState.effectiveDate = value ? (value["effectiveDate"] ? value["effectiveDate"] : null) : null;
            privateState.maturityDate = value ? (value["maturityDate"] ? value["maturityDate"] : null) : null;
            privateState.commitmentTerm = value ? (value["commitmentTerm"] ? value["commitmentTerm"] : null) : null;
            privateState.totalOutstandingBalance = value ? (value["totalOutstandingBalance"] ? value["totalOutstandingBalance"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.iBAN = value ? (value["iBAN"] ? value["iBAN"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.propertyType = value ? (value["propertyType"] ? value["propertyType"] : null) : null;
            privateState.propertyAddress = value ? (value["propertyAddress"] ? value["propertyAddress"] : null) : null;
            privateState.arrangementstatus = value ? (value["arrangementstatus"] ? value["arrangementstatus"] : null) : null;
            privateState.product = value ? (value["product"] ? value["product"] : null) : null;
            privateState.ownership = value ? (value["ownership"] ? value["ownership"] : null) : null;
            privateState.homeOwnership = value ? (value["homeOwnership"] ? value["homeOwnership"] : null) : null;
            privateState.accountID = value ? (value["accountID"] ? value["accountID"] : null) : null;
            privateState.accountType = value ? (value["accountType"] ? value["accountType"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.customerName = value ? (value["customerName"] ? value["customerName"] : null) : null;
            privateState.transactionAmount = value ? (value["transactionAmount"] ? value["transactionAmount"] : null) : null;
            privateState.currencyId = value ? (value["currencyId"] ? value["currencyId"] : null) : null;
            privateState.facilityName = value ? (value["facilityName"] ? value["facilityName"] : null) : null;
            privateState.numOfLoans = value ? (value["numOfLoans"] ? value["numOfLoans"] : null) : null;
            privateState.currentOutstandingBalanceCurrency = value ? (value["currentOutstandingBalanceCurrency"] ? value["currentOutstandingBalanceCurrency"] : null) : null;
            privateState.currentOutstandingBalanceAmount = value ? (value["currentOutstandingBalanceAmount"] ? value["currentOutstandingBalanceAmount"] : null) : null;
            privateState.amountPaidToDate = value ? (value["amountPaidToDate"] ? value["amountPaidToDate"] : null) : null;
            privateState.requestDetails = value ? (value["requestDetails"] ? value["requestDetails"] : null) : null;
            privateState.paymentDetails = value ? (value["paymentDetails"] ? value["paymentDetails"] : null) : null;
            privateState.supportingDocuments = value ? (value["supportingDocuments"] ? value["supportingDocuments"] : null) : null;
            privateState.currentInstallmentAmount = value ? (value["currentInstallmentAmount"] ? value["currentInstallmentAmount"] : null) : null;
            privateState.currentNextRepaymentDate = value ? (value["currentNextRepaymentDate"] ? value["currentNextRepaymentDate"] : null) : null;
            privateState.currentEndDate = value ? (value["currentEndDate"] ? value["currentEndDate"] : null) : null;
            privateState.simulatedInstallmentAmount = value ? (value["simulatedInstallmentAmount"] ? value["simulatedInstallmentAmount"] : null) : null;
            privateState.simulatedNextRepaymentDate = value ? (value["simulatedNextRepaymentDate"] ? value["simulatedNextRepaymentDate"] : null) : null;
            privateState.simulatedEndDate = value ? (value["simulatedEndDate"] ? value["simulatedEndDate"] : null) : null;
            privateState.activityId = value ? (value["activityId"] ? value["activityId"] : null) : null;
            privateState.supportingDocumentIds = value ? (value["supportingDocumentIds"] ? value["supportingDocumentIds"] : null) : null;
            privateState.repaymentAccount = value ? (value["repaymentAccount"] ? value["repaymentAccount"] : null) : null;
            privateState.totalOutstandingPricipal = value ? (value["totalOutstandingPricipal"] ? value["totalOutstandingPricipal"] : null) : null;
            privateState.principalInterest = value ? (value["principalInterest"] ? value["principalInterest"] : null) : null;
            privateState.tax = value ? (value["tax"] ? value["tax"] : null) : null;
            privateState.earlyPayoffFee = value ? (value["earlyPayoffFee"] ? value["earlyPayoffFee"] : null) : null;
            privateState.otherCharges = value ? (value["otherCharges"] ? value["otherCharges"] : null) : null;
            privateState.payOffDate = value ? (value["payOffDate"] ? value["payOffDate"] : null) : null;
            privateState.totalPayOffAmount = value ? (value["totalPayOffAmount"] ? value["totalPayOffAmount"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Mortgage);

    //Create new class level validator object
    BaseModel.Validator.call(Mortgage);

    var registerValidatorBackup = Mortgage.registerValidator;

    Mortgage.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Mortgage.isValid(this, propName, val)) {
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
    //For Operation 'CreatePartialRepayment' with service id 'createPartialRepayment2218'
     Mortgage.CreatePartialRepayment = function(params, onCompletion){
        return Mortgage.customVerb('CreatePartialRepayment', params, onCompletion);
     };

    //For Operation 'submitChangeRepaymentAccountServiceRequest' with service id 'submitChangeRepaymentAccountServiceRequestOperation5312'
     Mortgage.submitChangeRepaymentAccountServiceRequest = function(params, onCompletion){
        return Mortgage.customVerb('submitChangeRepaymentAccountServiceRequest', params, onCompletion);
     };

    //For Operation 'submitPartialRepaymentServiceRequestOperation' with service id 'SubmitPartialRepaymentServiceRequestOperation4332'
     Mortgage.submitPartialRepaymentServiceRequestOperation = function(params, onCompletion){
        return Mortgage.customVerb('submitPartialRepaymentServiceRequestOperation', params, onCompletion);
     };

    //For Operation 'getMortgageSimulatedResults' with service id 'getMortgageSimulatedResults7443'
     Mortgage.getMortgageSimulatedResults = function(params, onCompletion){
        return Mortgage.customVerb('getMortgageSimulatedResults', params, onCompletion);
     };

    //For Operation 'getMockSimulatedResults' with service id 'getMortgageSimulatedResults4081'
     Mortgage.getMockSimulatedResults = function(params, onCompletion){
        return Mortgage.customVerb('getMockSimulatedResults', params, onCompletion);
     };

    //For Operation 'getMortgageDrawings' with service id 'getMortgageDrawings6421'
     Mortgage.getMortgageDrawings = function(params, onCompletion){
        return Mortgage.customVerb('getMortgageDrawings', params, onCompletion);
     };

    //For Operation 'submitChangeRepaymentDayServiceRequest' with service id 'submitChangeRepaymentDayServiceRequestOperation5143'
     Mortgage.submitChangeRepaymentDayServiceRequest = function(params, onCompletion){
        return Mortgage.customVerb('submitChangeRepaymentDayServiceRequest', params, onCompletion);
     };

    //For Operation 'createAndGetPayOffSimulation' with service id 'CreateAndGetPayoffSimulation2350'
     Mortgage.createAndGetPayOffSimulation = function(params, onCompletion){
        return Mortgage.customVerb('createAndGetPayOffSimulation', params, onCompletion);
     };

    //For Operation 'getMortgageFacilityDetails' with service id 'getMortgageFacilities9005'
     Mortgage.getMortgageFacilityDetails = function(params, onCompletion){
        return Mortgage.customVerb('getMortgageFacilityDetails', params, onCompletion);
     };

    var relations = [];

    Mortgage.relations = relations;

    Mortgage.prototype.isValid = function() {
        return Mortgage.isValid(this);
    };

    Mortgage.prototype.objModelName = "Mortgage";
    Mortgage.prototype.objServiceName = "Holdings";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Mortgage.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Holdings", "Mortgage", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Mortgage.clone = function(objectToClone) {
        var clonedObj = new Mortgage();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Mortgage;
});