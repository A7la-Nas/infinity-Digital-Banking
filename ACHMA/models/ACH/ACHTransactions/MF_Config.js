/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"BBGeneralTransactionType_id": "BBGeneralTransactionType_id",
		"Status": "Status",
		"TemplateRequestType_id": "TemplateRequestType_id",
		"Request_id": "Request_id",
		"userName": "userName",
		"DebitAccount": "DebitAccount",
		"CreatedOn": "CreatedOn",
		"MaxAmount": "MaxAmount",
		"TemplateType_id": "TemplateType_id",
		"CompanyName": "CompanyName",
		"RequestType": "RequestType",
		"TemplateTypeValue": "TemplateTypeValue",
		"softDelete": "softDelete",
		"TransactionType_id": "TransactionType_id",
		"CreatedBy": "CreatedBy",
		"Company_id": "Company_id",
		"TransactionTypeValue": "TransactionTypeValue",
		"StatusValue": "StatusValue",
		"Transaction_id": "Transaction_id",
		"EffectiveDate": "EffectiveDate",
		"TemplateName": "TemplateName",
		"ConfirmationNumber": "ConfirmationNumber",
		"Approver": "Approver",
		"Records": "Records",
		"TemplateDescription": "TemplateDescription",
		"TotalAmount": "TotalAmount",
		"ReferenceID": "ReferenceID",
		"opstatus": "opstatus",
		"httpStatusCode": "httpStatusCode",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"featureActionId": "featureActionId",
		"queryType": "queryType",
		"searchString": "searchString",
		"sortByParam": "sortByParam",
		"sortOrder": "sortOrder",
		"pageSize": "pageSize",
		"pageOffset": "pageOffset",
		"receivedApprovals": "receivedApprovals",
		"requiredApprovals": "requiredApprovals",
		"AccountName": "AccountName",
		"filterByParam": "filterByParam",
		"filterByValue": "filterByValue",
		"amICreator": "amICreator",
		"amIApprover": "amIApprover",
		"TemplateRequestTypeValue": "TemplateRequestTypeValue",
		"transactionId": "transactionId",
	};

	Object.freeze(mappings);

	var typings = {
		"BBGeneralTransactionType_id": "string",
		"Status": "string",
		"TemplateRequestType_id": "string",
		"Request_id": "string",
		"userName": "string",
		"DebitAccount": "string",
		"CreatedOn": "string",
		"MaxAmount": "string",
		"TemplateType_id": "string",
		"CompanyName": "string",
		"RequestType": "string",
		"TemplateTypeValue": "string",
		"softDelete": "string",
		"TransactionType_id": "string",
		"CreatedBy": "string",
		"Company_id": "string",
		"TransactionTypeValue": "string",
		"StatusValue": "string",
		"Transaction_id": "string",
		"EffectiveDate": "string",
		"TemplateName": "string",
		"ConfirmationNumber": "string",
		"Approver": "string",
		"Records": "string",
		"TemplateDescription": "string",
		"TotalAmount": "string",
		"ReferenceID": "string",
		"opstatus": "string",
		"httpStatusCode": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"featureActionId": "string",
		"queryType": "string",
		"searchString": "string",
		"sortByParam": "string",
		"sortOrder": "string",
		"pageSize": "string",
		"pageOffset": "string",
		"receivedApprovals": "string",
		"requiredApprovals": "string",
		"AccountName": "string",
		"filterByParam": "string",
		"filterByValue": "string",
		"amICreator": "string",
		"amIApprover": "string",
		"TemplateRequestTypeValue": "string",
		"transactionId": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"Transaction_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ACH",
		tableName: "ACHTransactions"
	};

	Object.freeze(config);

	return config;
})