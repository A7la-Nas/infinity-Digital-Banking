/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "BulkWire", "objectService" : "BulkWireObjects"};

    var setterFunctions = {
        bulkWireID: function(val, state) {
            context["field"] = "bulkWireID";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireID"] : null);
            state['bulkWireID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWireName: function(val, state) {
            context["field"] = "bulkWireName";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireName"] : null);
            state['bulkWireName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        noOfTransactions: function(val, state) {
            context["field"] = "noOfTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["noOfTransactions"] : null);
            state['noOfTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        noOfDomesticTransactions: function(val, state) {
            context["field"] = "noOfDomesticTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["noOfDomesticTransactions"] : null);
            state['noOfDomesticTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        noOfInternationalTransactions: function(val, state) {
            context["field"] = "noOfInternationalTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["noOfInternationalTransactions"] : null);
            state['noOfInternationalTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        lastExecutedOn: function(val, state) {
            context["field"] = "lastExecutedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["lastExecutedOn"] : null);
            state['lastExecutedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        defaultFromAccount: function(val, state) {
            context["field"] = "defaultFromAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["defaultFromAccount"] : null);
            state['defaultFromAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        defaultCurrency: function(val, state) {
            context["field"] = "defaultCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["defaultCurrency"] : null);
            state['defaultCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWireCategory: function(val, state) {
            context["field"] = "bulkWireCategory";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireCategory"] : null);
            state['bulkWireCategory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        firstname: function(val, state) {
            context["field"] = "firstname";
            context["metadata"] = (objectMetadata ? objectMetadata["firstname"] : null);
            state['firstname'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastname: function(val, state) {
            context["field"] = "lastname";
            context["metadata"] = (objectMetadata ? objectMetadata["lastname"] : null);
            state['lastname'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        BulkWires: function(val, state) {
            context["field"] = "BulkWires";
            context["metadata"] = (objectMetadata ? objectMetadata["BulkWires"] : null);
            state['BulkWires'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        bulkWireCategoryFilter: function(val, state) {
            context["field"] = "bulkWireCategoryFilter";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireCategoryFilter"] : null);
            state['bulkWireCategoryFilter'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWireTemplateID: function(val, state) {
            context["field"] = "bulkWireTemplateID";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTemplateID"] : null);
            state['bulkWireTemplateID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWireTemplateName: function(val, state) {
            context["field"] = "bulkWireTemplateName";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTemplateName"] : null);
            state['bulkWireTemplateName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        company_id: function(val, state) {
            context["field"] = "company_id";
            context["metadata"] = (objectMetadata ? objectMetadata["company_id"] : null);
            state['company_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchString: function(val, state) {
            context["field"] = "searchString";
            context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
            state['searchString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortByParam: function(val, state) {
            context["field"] = "sortByParam";
            context["metadata"] = (objectMetadata ? objectMetadata["sortByParam"] : null);
            state['sortByParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortOrder: function(val, state) {
            context["field"] = "sortOrder";
            context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
            state['sortOrder'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        groupBy: function(val, state) {
            context["field"] = "groupBy";
            context["metadata"] = (objectMetadata ? objectMetadata["groupBy"] : null);
            state['groupBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWireTemplateLineItemID: function(val, state) {
            context["field"] = "bulkWireTemplateLineItemID";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTemplateLineItemID"] : null);
            state['bulkWireTemplateLineItemID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        swiftCode: function(val, state) {
            context["field"] = "swiftCode";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
            state['swiftCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bulkWireTransferType: function(val, state) {
            context["field"] = "bulkWireTransferType";
            context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTransferType"] : null);
            state['bulkWireTransferType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionType: function(val, state) {
            context["field"] = "transactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
            state['transactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        internationalRoutingNumber: function(val, state) {
            context["field"] = "internationalRoutingNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["internationalRoutingNumber"] : null);
            state['internationalRoutingNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientName: function(val, state) {
            context["field"] = "recipientName";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientName"] : null);
            state['recipientName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientAddressLine1: function(val, state) {
            context["field"] = "recipientAddressLine1";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine1"] : null);
            state['recipientAddressLine1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientAddressLine2: function(val, state) {
            context["field"] = "recipientAddressLine2";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine2"] : null);
            state['recipientAddressLine2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientCity: function(val, state) {
            context["field"] = "recipientCity";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientCity"] : null);
            state['recipientCity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientState: function(val, state) {
            context["field"] = "recipientState";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientState"] : null);
            state['recipientState'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientCountryName: function(val, state) {
            context["field"] = "recipientCountryName";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientCountryName"] : null);
            state['recipientCountryName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientZipCode: function(val, state) {
            context["field"] = "recipientZipCode";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientZipCode"] : null);
            state['recipientZipCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankName: function(val, state) {
            context["field"] = "recipientBankName";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankName"] : null);
            state['recipientBankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankAddress1: function(val, state) {
            context["field"] = "recipientBankAddress1";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress1"] : null);
            state['recipientBankAddress1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankAddress2: function(val, state) {
            context["field"] = "recipientBankAddress2";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress2"] : null);
            state['recipientBankAddress2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankZipCode: function(val, state) {
            context["field"] = "recipientBankZipCode";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankZipCode"] : null);
            state['recipientBankZipCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankcity: function(val, state) {
            context["field"] = "recipientBankcity";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankcity"] : null);
            state['recipientBankcity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientBankstate: function(val, state) {
            context["field"] = "recipientBankstate";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientBankstate"] : null);
            state['recipientBankstate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNickname: function(val, state) {
            context["field"] = "accountNickname";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNickname"] : null);
            state['accountNickname'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientAccountNumber: function(val, state) {
            context["field"] = "recipientAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientAccountNumber"] : null);
            state['recipientAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        routingNumber: function(val, state) {
            context["field"] = "routingNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
            state['routingNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recipientId: function(val, state) {
            context["field"] = "recipientId";
            context["metadata"] = (objectMetadata ? objectMetadata["recipientId"] : null);
            state['recipientId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        templateRecipientCategory: function(val, state) {
            context["field"] = "templateRecipientCategory";
            context["metadata"] = (objectMetadata ? objectMetadata["templateRecipientCategory"] : null);
            state['templateRecipientCategory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        BulkWireTemplateLineItems: function(val, state) {
            context["field"] = "BulkWireTemplateLineItems";
            context["metadata"] = (objectMetadata ? objectMetadata["BulkWireTemplateLineItems"] : null);
            state['BulkWireTemplateLineItems'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Domestic: function(val, state) {
            context["field"] = "Domestic";
            context["metadata"] = (objectMetadata ? objectMetadata["Domestic"] : null);
            state['Domestic'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        International: function(val, state) {
            context["field"] = "International";
            context["metadata"] = (objectMetadata ? objectMetadata["International"] : null);
            state['International'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ExtractedFromFile: function(val, state) {
            context["field"] = "ExtractedFromFile";
            context["metadata"] = (objectMetadata ? objectMetadata["ExtractedFromFile"] : null);
            state['ExtractedFromFile'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ManuallyAdded: function(val, state) {
            context["field"] = "ManuallyAdded";
            context["metadata"] = (objectMetadata ? objectMetadata["ManuallyAdded"] : null);
            state['ManuallyAdded'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ExistingRecipient: function(val, state) {
            context["field"] = "ExistingRecipient";
            context["metadata"] = (objectMetadata ? objectMetadata["ExistingRecipient"] : null);
            state['ExistingRecipient'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeId: function(val, state) {
            context["field"] = "payeeId";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
            state['payeeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function BulkWire(defaultValues) {
        var privateState = {};
        context["field"] = "bulkWireID";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireID"] : null);
        privateState.bulkWireID = defaultValues ?
            (defaultValues["bulkWireID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireID"], context) :
                null) :
            null;

        context["field"] = "bulkWireName";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireName"] : null);
        privateState.bulkWireName = defaultValues ?
            (defaultValues["bulkWireName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireName"], context) :
                null) :
            null;

        context["field"] = "noOfTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["noOfTransactions"] : null);
        privateState.noOfTransactions = defaultValues ?
            (defaultValues["noOfTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["noOfTransactions"], context) :
                null) :
            null;

        context["field"] = "noOfDomesticTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["noOfDomesticTransactions"] : null);
        privateState.noOfDomesticTransactions = defaultValues ?
            (defaultValues["noOfDomesticTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["noOfDomesticTransactions"], context) :
                null) :
            null;

        context["field"] = "noOfInternationalTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["noOfInternationalTransactions"] : null);
        privateState.noOfInternationalTransactions = defaultValues ?
            (defaultValues["noOfInternationalTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["noOfInternationalTransactions"], context) :
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

        context["field"] = "lastExecutedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["lastExecutedOn"] : null);
        privateState.lastExecutedOn = defaultValues ?
            (defaultValues["lastExecutedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastExecutedOn"], context) :
                null) :
            null;

        context["field"] = "defaultFromAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["defaultFromAccount"] : null);
        privateState.defaultFromAccount = defaultValues ?
            (defaultValues["defaultFromAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["defaultFromAccount"], context) :
                null) :
            null;

        context["field"] = "defaultCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["defaultCurrency"] : null);
        privateState.defaultCurrency = defaultValues ?
            (defaultValues["defaultCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["defaultCurrency"], context) :
                null) :
            null;

        context["field"] = "bulkWireCategory";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireCategory"] : null);
        privateState.bulkWireCategory = defaultValues ?
            (defaultValues["bulkWireCategory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireCategory"], context) :
                null) :
            null;

        context["field"] = "firstname";
        context["metadata"] = (objectMetadata ? objectMetadata["firstname"] : null);
        privateState.firstname = defaultValues ?
            (defaultValues["firstname"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["firstname"], context) :
                null) :
            null;

        context["field"] = "lastname";
        context["metadata"] = (objectMetadata ? objectMetadata["lastname"] : null);
        privateState.lastname = defaultValues ?
            (defaultValues["lastname"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastname"], context) :
                null) :
            null;

        context["field"] = "BulkWires";
        context["metadata"] = (objectMetadata ? objectMetadata["BulkWires"] : null);
        privateState.BulkWires = defaultValues ?
            (defaultValues["BulkWires"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["BulkWires"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
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

        context["field"] = "bulkWireCategoryFilter";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireCategoryFilter"] : null);
        privateState.bulkWireCategoryFilter = defaultValues ?
            (defaultValues["bulkWireCategoryFilter"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireCategoryFilter"], context) :
                null) :
            null;

        context["field"] = "bulkWireTemplateID";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTemplateID"] : null);
        privateState.bulkWireTemplateID = defaultValues ?
            (defaultValues["bulkWireTemplateID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireTemplateID"], context) :
                null) :
            null;

        context["field"] = "bulkWireTemplateName";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTemplateName"] : null);
        privateState.bulkWireTemplateName = defaultValues ?
            (defaultValues["bulkWireTemplateName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireTemplateName"], context) :
                null) :
            null;

        context["field"] = "company_id";
        context["metadata"] = (objectMetadata ? objectMetadata["company_id"] : null);
        privateState.company_id = defaultValues ?
            (defaultValues["company_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["company_id"], context) :
                null) :
            null;

        context["field"] = "searchString";
        context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
        privateState.searchString = defaultValues ?
            (defaultValues["searchString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchString"], context) :
                null) :
            null;

        context["field"] = "sortByParam";
        context["metadata"] = (objectMetadata ? objectMetadata["sortByParam"] : null);
        privateState.sortByParam = defaultValues ?
            (defaultValues["sortByParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortByParam"], context) :
                null) :
            null;

        context["field"] = "sortOrder";
        context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
        privateState.sortOrder = defaultValues ?
            (defaultValues["sortOrder"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortOrder"], context) :
                null) :
            null;

        context["field"] = "groupBy";
        context["metadata"] = (objectMetadata ? objectMetadata["groupBy"] : null);
        privateState.groupBy = defaultValues ?
            (defaultValues["groupBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["groupBy"], context) :
                null) :
            null;

        context["field"] = "bulkWireTemplateLineItemID";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTemplateLineItemID"] : null);
        privateState.bulkWireTemplateLineItemID = defaultValues ?
            (defaultValues["bulkWireTemplateLineItemID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireTemplateLineItemID"], context) :
                null) :
            null;

        context["field"] = "swiftCode";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
        privateState.swiftCode = defaultValues ?
            (defaultValues["swiftCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftCode"], context) :
                null) :
            null;

        context["field"] = "bulkWireTransferType";
        context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTransferType"] : null);
        privateState.bulkWireTransferType = defaultValues ?
            (defaultValues["bulkWireTransferType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bulkWireTransferType"], context) :
                null) :
            null;

        context["field"] = "transactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
        privateState.transactionType = defaultValues ?
            (defaultValues["transactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionType"], context) :
                null) :
            null;

        context["field"] = "internationalRoutingNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["internationalRoutingNumber"] : null);
        privateState.internationalRoutingNumber = defaultValues ?
            (defaultValues["internationalRoutingNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["internationalRoutingNumber"], context) :
                null) :
            null;

        context["field"] = "recipientName";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientName"] : null);
        privateState.recipientName = defaultValues ?
            (defaultValues["recipientName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientName"], context) :
                null) :
            null;

        context["field"] = "recipientAddressLine1";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine1"] : null);
        privateState.recipientAddressLine1 = defaultValues ?
            (defaultValues["recipientAddressLine1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientAddressLine1"], context) :
                null) :
            null;

        context["field"] = "recipientAddressLine2";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine2"] : null);
        privateState.recipientAddressLine2 = defaultValues ?
            (defaultValues["recipientAddressLine2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientAddressLine2"], context) :
                null) :
            null;

        context["field"] = "recipientCity";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientCity"] : null);
        privateState.recipientCity = defaultValues ?
            (defaultValues["recipientCity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientCity"], context) :
                null) :
            null;

        context["field"] = "recipientState";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientState"] : null);
        privateState.recipientState = defaultValues ?
            (defaultValues["recipientState"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientState"], context) :
                null) :
            null;

        context["field"] = "recipientCountryName";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientCountryName"] : null);
        privateState.recipientCountryName = defaultValues ?
            (defaultValues["recipientCountryName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientCountryName"], context) :
                null) :
            null;

        context["field"] = "recipientZipCode";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientZipCode"] : null);
        privateState.recipientZipCode = defaultValues ?
            (defaultValues["recipientZipCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientZipCode"], context) :
                null) :
            null;

        context["field"] = "recipientBankName";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankName"] : null);
        privateState.recipientBankName = defaultValues ?
            (defaultValues["recipientBankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankName"], context) :
                null) :
            null;

        context["field"] = "recipientBankAddress1";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress1"] : null);
        privateState.recipientBankAddress1 = defaultValues ?
            (defaultValues["recipientBankAddress1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankAddress1"], context) :
                null) :
            null;

        context["field"] = "recipientBankAddress2";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress2"] : null);
        privateState.recipientBankAddress2 = defaultValues ?
            (defaultValues["recipientBankAddress2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankAddress2"], context) :
                null) :
            null;

        context["field"] = "recipientBankZipCode";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankZipCode"] : null);
        privateState.recipientBankZipCode = defaultValues ?
            (defaultValues["recipientBankZipCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankZipCode"], context) :
                null) :
            null;

        context["field"] = "recipientBankcity";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankcity"] : null);
        privateState.recipientBankcity = defaultValues ?
            (defaultValues["recipientBankcity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankcity"], context) :
                null) :
            null;

        context["field"] = "recipientBankstate";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientBankstate"] : null);
        privateState.recipientBankstate = defaultValues ?
            (defaultValues["recipientBankstate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientBankstate"], context) :
                null) :
            null;

        context["field"] = "accountNickname";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNickname"] : null);
        privateState.accountNickname = defaultValues ?
            (defaultValues["accountNickname"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNickname"], context) :
                null) :
            null;

        context["field"] = "recipientAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientAccountNumber"] : null);
        privateState.recipientAccountNumber = defaultValues ?
            (defaultValues["recipientAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientAccountNumber"], context) :
                null) :
            null;

        context["field"] = "routingNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
        privateState.routingNumber = defaultValues ?
            (defaultValues["routingNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["routingNumber"], context) :
                null) :
            null;

        context["field"] = "recipientId";
        context["metadata"] = (objectMetadata ? objectMetadata["recipientId"] : null);
        privateState.recipientId = defaultValues ?
            (defaultValues["recipientId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recipientId"], context) :
                null) :
            null;

        context["field"] = "templateRecipientCategory";
        context["metadata"] = (objectMetadata ? objectMetadata["templateRecipientCategory"] : null);
        privateState.templateRecipientCategory = defaultValues ?
            (defaultValues["templateRecipientCategory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["templateRecipientCategory"], context) :
                null) :
            null;

        context["field"] = "BulkWireTemplateLineItems";
        context["metadata"] = (objectMetadata ? objectMetadata["BulkWireTemplateLineItems"] : null);
        privateState.BulkWireTemplateLineItems = defaultValues ?
            (defaultValues["BulkWireTemplateLineItems"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["BulkWireTemplateLineItems"], context) :
                null) :
            null;

        context["field"] = "Domestic";
        context["metadata"] = (objectMetadata ? objectMetadata["Domestic"] : null);
        privateState.Domestic = defaultValues ?
            (defaultValues["Domestic"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Domestic"], context) :
                null) :
            null;

        context["field"] = "International";
        context["metadata"] = (objectMetadata ? objectMetadata["International"] : null);
        privateState.International = defaultValues ?
            (defaultValues["International"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["International"], context) :
                null) :
            null;

        context["field"] = "ExtractedFromFile";
        context["metadata"] = (objectMetadata ? objectMetadata["ExtractedFromFile"] : null);
        privateState.ExtractedFromFile = defaultValues ?
            (defaultValues["ExtractedFromFile"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ExtractedFromFile"], context) :
                null) :
            null;

        context["field"] = "ManuallyAdded";
        context["metadata"] = (objectMetadata ? objectMetadata["ManuallyAdded"] : null);
        privateState.ManuallyAdded = defaultValues ?
            (defaultValues["ManuallyAdded"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ManuallyAdded"], context) :
                null) :
            null;

        context["field"] = "ExistingRecipient";
        context["metadata"] = (objectMetadata ? objectMetadata["ExistingRecipient"] : null);
        privateState.ExistingRecipient = defaultValues ?
            (defaultValues["ExistingRecipient"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ExistingRecipient"], context) :
                null) :
            null;

        context["field"] = "payeeId";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
        privateState.payeeId = defaultValues ?
            (defaultValues["payeeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "bulkWireID": {
                get: function() {
                    context["field"] = "bulkWireID";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireID, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWireName": {
                get: function() {
                    context["field"] = "bulkWireName";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireName, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "noOfTransactions": {
                get: function() {
                    context["field"] = "noOfTransactions";
                    context["metadata"] = (objectMetadata ? objectMetadata["noOfTransactions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.noOfTransactions, context);
                },
                set: function(val) {
                    setterFunctions['noOfTransactions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "noOfDomesticTransactions": {
                get: function() {
                    context["field"] = "noOfDomesticTransactions";
                    context["metadata"] = (objectMetadata ? objectMetadata["noOfDomesticTransactions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.noOfDomesticTransactions, context);
                },
                set: function(val) {
                    setterFunctions['noOfDomesticTransactions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "noOfInternationalTransactions": {
                get: function() {
                    context["field"] = "noOfInternationalTransactions";
                    context["metadata"] = (objectMetadata ? objectMetadata["noOfInternationalTransactions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.noOfInternationalTransactions, context);
                },
                set: function(val) {
                    setterFunctions['noOfInternationalTransactions'].call(this, val, privateState);
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
            "lastExecutedOn": {
                get: function() {
                    context["field"] = "lastExecutedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastExecutedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastExecutedOn, context);
                },
                set: function(val) {
                    setterFunctions['lastExecutedOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "defaultFromAccount": {
                get: function() {
                    context["field"] = "defaultFromAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["defaultFromAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.defaultFromAccount, context);
                },
                set: function(val) {
                    setterFunctions['defaultFromAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "defaultCurrency": {
                get: function() {
                    context["field"] = "defaultCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["defaultCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.defaultCurrency, context);
                },
                set: function(val) {
                    setterFunctions['defaultCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWireCategory": {
                get: function() {
                    context["field"] = "bulkWireCategory";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireCategory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireCategory, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireCategory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "firstname": {
                get: function() {
                    context["field"] = "firstname";
                    context["metadata"] = (objectMetadata ? objectMetadata["firstname"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.firstname, context);
                },
                set: function(val) {
                    setterFunctions['firstname'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastname": {
                get: function() {
                    context["field"] = "lastname";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastname"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastname, context);
                },
                set: function(val) {
                    setterFunctions['lastname'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "BulkWires": {
                get: function() {
                    context["field"] = "BulkWires";
                    context["metadata"] = (objectMetadata ? objectMetadata["BulkWires"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.BulkWires, context);
                },
                set: function(val) {
                    setterFunctions['BulkWires'].call(this, val, privateState);
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
            "bulkWireCategoryFilter": {
                get: function() {
                    context["field"] = "bulkWireCategoryFilter";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireCategoryFilter"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireCategoryFilter, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireCategoryFilter'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWireTemplateID": {
                get: function() {
                    context["field"] = "bulkWireTemplateID";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTemplateID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireTemplateID, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireTemplateID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWireTemplateName": {
                get: function() {
                    context["field"] = "bulkWireTemplateName";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTemplateName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireTemplateName, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireTemplateName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "company_id": {
                get: function() {
                    context["field"] = "company_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["company_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.company_id, context);
                },
                set: function(val) {
                    setterFunctions['company_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchString": {
                get: function() {
                    context["field"] = "searchString";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchString, context);
                },
                set: function(val) {
                    setterFunctions['searchString'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortByParam": {
                get: function() {
                    context["field"] = "sortByParam";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortByParam"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortByParam, context);
                },
                set: function(val) {
                    setterFunctions['sortByParam'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortOrder": {
                get: function() {
                    context["field"] = "sortOrder";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortOrder, context);
                },
                set: function(val) {
                    setterFunctions['sortOrder'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "groupBy": {
                get: function() {
                    context["field"] = "groupBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["groupBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.groupBy, context);
                },
                set: function(val) {
                    setterFunctions['groupBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWireTemplateLineItemID": {
                get: function() {
                    context["field"] = "bulkWireTemplateLineItemID";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTemplateLineItemID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireTemplateLineItemID, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireTemplateLineItemID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "swiftCode": {
                get: function() {
                    context["field"] = "swiftCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swiftCode, context);
                },
                set: function(val) {
                    setterFunctions['swiftCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bulkWireTransferType": {
                get: function() {
                    context["field"] = "bulkWireTransferType";
                    context["metadata"] = (objectMetadata ? objectMetadata["bulkWireTransferType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bulkWireTransferType, context);
                },
                set: function(val) {
                    setterFunctions['bulkWireTransferType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionType": {
                get: function() {
                    context["field"] = "transactionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionType, context);
                },
                set: function(val) {
                    setterFunctions['transactionType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "internationalRoutingNumber": {
                get: function() {
                    context["field"] = "internationalRoutingNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["internationalRoutingNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.internationalRoutingNumber, context);
                },
                set: function(val) {
                    setterFunctions['internationalRoutingNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientName": {
                get: function() {
                    context["field"] = "recipientName";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientName, context);
                },
                set: function(val) {
                    setterFunctions['recipientName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientAddressLine1": {
                get: function() {
                    context["field"] = "recipientAddressLine1";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientAddressLine1, context);
                },
                set: function(val) {
                    setterFunctions['recipientAddressLine1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientAddressLine2": {
                get: function() {
                    context["field"] = "recipientAddressLine2";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientAddressLine2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientAddressLine2, context);
                },
                set: function(val) {
                    setterFunctions['recipientAddressLine2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientCity": {
                get: function() {
                    context["field"] = "recipientCity";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientCity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientCity, context);
                },
                set: function(val) {
                    setterFunctions['recipientCity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientState": {
                get: function() {
                    context["field"] = "recipientState";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientState"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientState, context);
                },
                set: function(val) {
                    setterFunctions['recipientState'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientCountryName": {
                get: function() {
                    context["field"] = "recipientCountryName";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientCountryName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientCountryName, context);
                },
                set: function(val) {
                    setterFunctions['recipientCountryName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientZipCode": {
                get: function() {
                    context["field"] = "recipientZipCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientZipCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientZipCode, context);
                },
                set: function(val) {
                    setterFunctions['recipientZipCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankName": {
                get: function() {
                    context["field"] = "recipientBankName";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankName, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankAddress1": {
                get: function() {
                    context["field"] = "recipientBankAddress1";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankAddress1, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankAddress1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankAddress2": {
                get: function() {
                    context["field"] = "recipientBankAddress2";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankAddress2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankAddress2, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankAddress2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankZipCode": {
                get: function() {
                    context["field"] = "recipientBankZipCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankZipCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankZipCode, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankZipCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankcity": {
                get: function() {
                    context["field"] = "recipientBankcity";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankcity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankcity, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankcity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientBankstate": {
                get: function() {
                    context["field"] = "recipientBankstate";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientBankstate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientBankstate, context);
                },
                set: function(val) {
                    setterFunctions['recipientBankstate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountNickname": {
                get: function() {
                    context["field"] = "accountNickname";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountNickname"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountNickname, context);
                },
                set: function(val) {
                    setterFunctions['accountNickname'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientAccountNumber": {
                get: function() {
                    context["field"] = "recipientAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['recipientAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "routingNumber": {
                get: function() {
                    context["field"] = "routingNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.routingNumber, context);
                },
                set: function(val) {
                    setterFunctions['routingNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recipientId": {
                get: function() {
                    context["field"] = "recipientId";
                    context["metadata"] = (objectMetadata ? objectMetadata["recipientId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recipientId, context);
                },
                set: function(val) {
                    setterFunctions['recipientId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "templateRecipientCategory": {
                get: function() {
                    context["field"] = "templateRecipientCategory";
                    context["metadata"] = (objectMetadata ? objectMetadata["templateRecipientCategory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.templateRecipientCategory, context);
                },
                set: function(val) {
                    setterFunctions['templateRecipientCategory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "BulkWireTemplateLineItems": {
                get: function() {
                    context["field"] = "BulkWireTemplateLineItems";
                    context["metadata"] = (objectMetadata ? objectMetadata["BulkWireTemplateLineItems"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.BulkWireTemplateLineItems, context);
                },
                set: function(val) {
                    setterFunctions['BulkWireTemplateLineItems'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Domestic": {
                get: function() {
                    context["field"] = "Domestic";
                    context["metadata"] = (objectMetadata ? objectMetadata["Domestic"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Domestic, context);
                },
                set: function(val) {
                    setterFunctions['Domestic'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "International": {
                get: function() {
                    context["field"] = "International";
                    context["metadata"] = (objectMetadata ? objectMetadata["International"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.International, context);
                },
                set: function(val) {
                    setterFunctions['International'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ExtractedFromFile": {
                get: function() {
                    context["field"] = "ExtractedFromFile";
                    context["metadata"] = (objectMetadata ? objectMetadata["ExtractedFromFile"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ExtractedFromFile, context);
                },
                set: function(val) {
                    setterFunctions['ExtractedFromFile'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ManuallyAdded": {
                get: function() {
                    context["field"] = "ManuallyAdded";
                    context["metadata"] = (objectMetadata ? objectMetadata["ManuallyAdded"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ManuallyAdded, context);
                },
                set: function(val) {
                    setterFunctions['ManuallyAdded'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ExistingRecipient": {
                get: function() {
                    context["field"] = "ExistingRecipient";
                    context["metadata"] = (objectMetadata ? objectMetadata["ExistingRecipient"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ExistingRecipient, context);
                },
                set: function(val) {
                    setterFunctions['ExistingRecipient'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payeeId": {
                get: function() {
                    context["field"] = "payeeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeId, context);
                },
                set: function(val) {
                    setterFunctions['payeeId'].call(this, val, privateState);
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
            privateState.bulkWireID = value ? (value["bulkWireID"] ? value["bulkWireID"] : null) : null;
            privateState.bulkWireName = value ? (value["bulkWireName"] ? value["bulkWireName"] : null) : null;
            privateState.noOfTransactions = value ? (value["noOfTransactions"] ? value["noOfTransactions"] : null) : null;
            privateState.noOfDomesticTransactions = value ? (value["noOfDomesticTransactions"] ? value["noOfDomesticTransactions"] : null) : null;
            privateState.noOfInternationalTransactions = value ? (value["noOfInternationalTransactions"] ? value["noOfInternationalTransactions"] : null) : null;
            privateState.createdts = value ? (value["createdts"] ? value["createdts"] : null) : null;
            privateState.lastmodifiedts = value ? (value["lastmodifiedts"] ? value["lastmodifiedts"] : null) : null;
            privateState.lastExecutedOn = value ? (value["lastExecutedOn"] ? value["lastExecutedOn"] : null) : null;
            privateState.defaultFromAccount = value ? (value["defaultFromAccount"] ? value["defaultFromAccount"] : null) : null;
            privateState.defaultCurrency = value ? (value["defaultCurrency"] ? value["defaultCurrency"] : null) : null;
            privateState.bulkWireCategory = value ? (value["bulkWireCategory"] ? value["bulkWireCategory"] : null) : null;
            privateState.firstname = value ? (value["firstname"] ? value["firstname"] : null) : null;
            privateState.lastname = value ? (value["lastname"] ? value["lastname"] : null) : null;
            privateState.BulkWires = value ? (value["BulkWires"] ? value["BulkWires"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.bulkWireCategoryFilter = value ? (value["bulkWireCategoryFilter"] ? value["bulkWireCategoryFilter"] : null) : null;
            privateState.bulkWireTemplateID = value ? (value["bulkWireTemplateID"] ? value["bulkWireTemplateID"] : null) : null;
            privateState.bulkWireTemplateName = value ? (value["bulkWireTemplateName"] ? value["bulkWireTemplateName"] : null) : null;
            privateState.company_id = value ? (value["company_id"] ? value["company_id"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.sortByParam = value ? (value["sortByParam"] ? value["sortByParam"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.groupBy = value ? (value["groupBy"] ? value["groupBy"] : null) : null;
            privateState.bulkWireTemplateLineItemID = value ? (value["bulkWireTemplateLineItemID"] ? value["bulkWireTemplateLineItemID"] : null) : null;
            privateState.swiftCode = value ? (value["swiftCode"] ? value["swiftCode"] : null) : null;
            privateState.bulkWireTransferType = value ? (value["bulkWireTransferType"] ? value["bulkWireTransferType"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.internationalRoutingNumber = value ? (value["internationalRoutingNumber"] ? value["internationalRoutingNumber"] : null) : null;
            privateState.recipientName = value ? (value["recipientName"] ? value["recipientName"] : null) : null;
            privateState.recipientAddressLine1 = value ? (value["recipientAddressLine1"] ? value["recipientAddressLine1"] : null) : null;
            privateState.recipientAddressLine2 = value ? (value["recipientAddressLine2"] ? value["recipientAddressLine2"] : null) : null;
            privateState.recipientCity = value ? (value["recipientCity"] ? value["recipientCity"] : null) : null;
            privateState.recipientState = value ? (value["recipientState"] ? value["recipientState"] : null) : null;
            privateState.recipientCountryName = value ? (value["recipientCountryName"] ? value["recipientCountryName"] : null) : null;
            privateState.recipientZipCode = value ? (value["recipientZipCode"] ? value["recipientZipCode"] : null) : null;
            privateState.recipientBankName = value ? (value["recipientBankName"] ? value["recipientBankName"] : null) : null;
            privateState.recipientBankAddress1 = value ? (value["recipientBankAddress1"] ? value["recipientBankAddress1"] : null) : null;
            privateState.recipientBankAddress2 = value ? (value["recipientBankAddress2"] ? value["recipientBankAddress2"] : null) : null;
            privateState.recipientBankZipCode = value ? (value["recipientBankZipCode"] ? value["recipientBankZipCode"] : null) : null;
            privateState.recipientBankcity = value ? (value["recipientBankcity"] ? value["recipientBankcity"] : null) : null;
            privateState.recipientBankstate = value ? (value["recipientBankstate"] ? value["recipientBankstate"] : null) : null;
            privateState.accountNickname = value ? (value["accountNickname"] ? value["accountNickname"] : null) : null;
            privateState.recipientAccountNumber = value ? (value["recipientAccountNumber"] ? value["recipientAccountNumber"] : null) : null;
            privateState.routingNumber = value ? (value["routingNumber"] ? value["routingNumber"] : null) : null;
            privateState.recipientId = value ? (value["recipientId"] ? value["recipientId"] : null) : null;
            privateState.templateRecipientCategory = value ? (value["templateRecipientCategory"] ? value["templateRecipientCategory"] : null) : null;
            privateState.BulkWireTemplateLineItems = value ? (value["BulkWireTemplateLineItems"] ? value["BulkWireTemplateLineItems"] : null) : null;
            privateState.Domestic = value ? (value["Domestic"] ? value["Domestic"] : null) : null;
            privateState.International = value ? (value["International"] ? value["International"] : null) : null;
            privateState.ExtractedFromFile = value ? (value["ExtractedFromFile"] ? value["ExtractedFromFile"] : null) : null;
            privateState.ManuallyAdded = value ? (value["ManuallyAdded"] ? value["ManuallyAdded"] : null) : null;
            privateState.ExistingRecipient = value ? (value["ExistingRecipient"] ? value["ExistingRecipient"] : null) : null;
            privateState.payeeId = value ? (value["payeeId"] ? value["payeeId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(BulkWire);

    //Create new class level validator object
    BaseModel.Validator.call(BulkWire);

    var registerValidatorBackup = BulkWire.registerValidator;

    BulkWire.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(BulkWire.isValid(this, propName, val)) {
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
    //For Operation 'GetUnselectedPayeesForBWTemplate' with service id 'GetUnselectedPayeesForBWTemplate5768'
     BulkWire.GetUnselectedPayeesForBWTemplate = function(params, onCompletion){
        return BulkWire.customVerb('GetUnselectedPayeesForBWTemplate', params, onCompletion);
     };

    //For Operation 'DeleteBulkWireTemplate' with service id 'DeleteBulkWireTemplate2854'
     BulkWire.DeleteBulkWireTemplate = function(params, onCompletion){
        return BulkWire.customVerb('DeleteBulkWireTemplate', params, onCompletion);
     };

    //For Operation 'getBulkWireTemplateLineItems' with service id 'getBulkWireTemplateLineItems5017'
     BulkWire.getBulkWireTemplateLineItems = function(params, onCompletion){
        return BulkWire.customVerb('getBulkWireTemplateLineItems', params, onCompletion);
     };

    //For Operation 'getBulkWiresForUser' with service id 'getBulkWiresForUser8327'
     BulkWire.getBulkWiresForUser = function(params, onCompletion){
        return BulkWire.customVerb('getBulkWiresForUser', params, onCompletion);
     };

    //For Operation 'CreateBulkWireTemplate' with service id 'CreateBulkWireTemplate4350'
     BulkWire.CreateBulkWireTemplate = function(params, onCompletion){
        return BulkWire.customVerb('CreateBulkWireTemplate', params, onCompletion);
     };

    //For Operation 'UpdateBulkWireTemplate' with service id 'UpdateBulkWireTemplate3248'
     BulkWire.UpdateBulkWireTemplate = function(params, onCompletion){
        return BulkWire.customVerb('UpdateBulkWireTemplate', params, onCompletion);
     };

    //For Operation 'DeleteBulkWireTemplateRecipient' with service id 'DeleteBulkWireTemplateRecipient2210'
     BulkWire.DeleteBulkWireTemplateRecipient = function(params, onCompletion){
        return BulkWire.customVerb('DeleteBulkWireTemplateRecipient', params, onCompletion);
     };

    var relations = [];

    BulkWire.relations = relations;

    BulkWire.prototype.isValid = function() {
        return BulkWire.isValid(this);
    };

    BulkWire.prototype.objModelName = "BulkWire";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    BulkWire.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BulkWireObjects", "BulkWire", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    BulkWire.clone = function(objectToClone) {
        var clonedObj = new BulkWire();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return BulkWire;
});