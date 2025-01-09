/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"BBGeneralTransactionType_id": "BBGeneralTransactionType_id",
		"CreatedBy": "CreatedBy",
		"TemplateType_id": "TemplateType_id",
		"CompanyName": "CompanyName",
		"TemplateTypeValue": "TemplateTypeValue",
		"Status": "Status",
		"TemplateRequestType_id": "TemplateRequestType_id",
		"softDelete": "softDelete",
		"TransactionType_id": "TransactionType_id",
		"Company_id": "Company_id",
		"TransactionTypeValue": "TransactionTypeValue",
		"StatusValue": "StatusValue",
		"RequestType": "RequestType",
		"DebitAccount": "DebitAccount",
		"AccountName": "AccountName",
		"Records": "Records",
		"TemplateDescription": "TemplateDescription",
		"TemplateName": "TemplateName",
		"MaxAmount": "MaxAmount",
		"CreatedOn": "CreatedOn",
		"Template_id": "Template_id",
		"EffectiveDate": "EffectiveDate",
		"Approver": "Approver",
		"userName": "userName",
		"TotalAmount": "TotalAmount",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"opstatus": "opstatus",
		"httpStatusCode": "httpStatusCode",
		"queryType": "queryType",
		"searchString": "searchString",
		"sortByParam": "sortByParam",
		"sortOrder": "sortOrder",
		"pageSize": "pageSize",
		"pageOffset": "pageOffset",
		"FeatureActionId": "FeatureActionId",
		"receivedApprovals": "receivedApprovals",
		"requiredApprovals": "requiredApprovals",
		"filterByParam": "filterByParam",
		"Success": "Success",
		"filterByValue": "filterByValue",
		"amICreator": "amICreator",
		"amIApprover": "amIApprover",
		"transactionId": "transactionId",
	};

	Object.freeze(mappings);

	var typings = {
		"BBGeneralTransactionType_id": "string",
		"CreatedBy": "string",
		"TemplateType_id": "string",
		"CompanyName": "string",
		"TemplateTypeValue": "string",
		"Status": "string",
		"TemplateRequestType_id": "string",
		"softDelete": "string",
		"TransactionType_id": "string",
		"Company_id": "string",
		"TransactionTypeValue": "string",
		"StatusValue": "string",
		"RequestType": "string",
		"DebitAccount": "string",
		"AccountName": "string",
		"Records": "string",
		"TemplateDescription": "string",
		"TemplateName": "string",
		"MaxAmount": "string",
		"CreatedOn": "string",
		"Template_id": "string",
		"EffectiveDate": "string",
		"Approver": "string",
		"userName": "string",
		"TotalAmount": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"opstatus": "string",
		"httpStatusCode": "string",
		"queryType": "string",
		"searchString": "string",
		"sortByParam": "string",
		"sortOrder": "string",
		"pageSize": "string",
		"pageOffset": "string",
		"FeatureActionId": "string",
		"receivedApprovals": "string",
		"requiredApprovals": "string",
		"filterByParam": "string",
		"Success": "string",
		"filterByValue": "string",
		"amICreator": "string",
		"amIApprover": "string",
		"transactionId": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"Template_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ACH",
		tableName: "ACHTemplates"
	};

	Object.freeze(config);

	return config;
})