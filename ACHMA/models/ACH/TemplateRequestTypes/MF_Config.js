/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"TransactionType_id": "TransactionType_id",
		"TemplateRequestType_id": "TemplateRequestType_id",
		"TemplateRequestTypeName": "TemplateRequestTypeName",
		"dbpErrCode": "dbpErrCode",
		"opstatus": "opstatus",
		"dbpErrMsg": "dbpErrMsg",
		"httpStatusCode": "httpStatusCode",
	};

	Object.freeze(mappings);

	var typings = {
		"TransactionType_id": "string",
		"TemplateRequestType_id": "string",
		"TemplateRequestTypeName": "string",
		"dbpErrCode": "string",
		"opstatus": "string",
		"dbpErrMsg": "string",
		"httpStatusCode": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"TemplateRequestType_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ACH",
		tableName: "TemplateRequestTypes"
	};

	Object.freeze(config);

	return config;
})