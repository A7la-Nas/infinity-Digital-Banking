/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"fileType": "fileType",
		"accountID": "accountID",
		"transactionType": "transactionType",
		"isScheduled": "isScheduled",
		"order": "order",
		"requestType": "requestType",
		"searchStartDate": "searchStartDate",
		"searchEndDate": "searchEndDate",
		"description": "description",
		"searchMinAmount": "searchMinAmount",
		"searchMaxAmount": "searchMaxAmount",
		"fromCheckNumber": "fromCheckNumber",
		"toCheckNumber": "toCheckNumber",
		"fileId": "fileId",
		"fieldName": "fieldName",
		"fileName": "fileName",
		"status": "status",
		"generatedDate": "generatedDate",
		"inputPayload": "inputPayload",
		"codeCh": "codeCh",
		"codeVerifier": "codeVerifier",
		"accountName": "accountName",
		"statementAvailable": "statementAvailable",
		"fileIdSec": "fileIdSec",
	};

	Object.freeze(mappings);

	var typings = {
		"fileType": "string",
		"accountID": "string",
		"transactionType": "string",
		"isScheduled": "string",
		"order": "string",
		"requestType": "string",
		"searchStartDate": "string",
		"searchEndDate": "string",
		"description": "string",
		"searchMinAmount": "string",
		"searchMaxAmount": "string",
		"fromCheckNumber": "string",
		"toCheckNumber": "string",
		"fileId": "string",
		"fieldName": "string",
		"fileName": "string",
		"status": "string",
		"generatedDate": "string",
		"inputPayload": "string",
		"codeCh": "string",
		"codeVerifier": "string",
		"accountName": "string",
		"statementAvailable": "string",
		"fileIdSec": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"fileId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "DocumentManagement",
		tableName: "AdhocStatements"
	};

	Object.freeze(config);

	return config;
})