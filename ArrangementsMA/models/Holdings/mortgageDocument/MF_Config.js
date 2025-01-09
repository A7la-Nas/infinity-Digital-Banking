/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"authorization": "authorization",
		"documentGroup": "documentGroup",
		"ownerSystemId": "ownerSystemId",
		"accountName": "accountName",
		"arrangementId": "arrangementId",
		"accountNumber": "accountNumber",
		"arrangementstatus": "arrangementstatus",
		"ownership": "ownership",
		"homeOwnership": "homeOwnership",
		"accountID": "accountID",
		"accountType": "accountType",
		"documentId": "documentId",
		"documentStatus": "documentStatus",
		"documentType": "documentType",
		"documentName": "documentName",
		"metaDocumentName": "metaDocumentName",
		"message": "message",
		"content": "content",
		"fileId": "fileId",
	};

	Object.freeze(mappings);

	var typings = {
		"authorization": "string",
		"documentGroup": "string",
		"ownerSystemId": "string",
		"accountName": "string",
		"arrangementId": "string",
		"accountNumber": "string",
		"arrangementstatus": "string",
		"ownership": "string",
		"homeOwnership": "string",
		"accountID": "string",
		"accountType": "string",
		"documentId": "string",
		"documentStatus": "string",
		"documentType": "string",
		"documentName": "string",
		"metaDocumentName": "string",
		"message": "string",
		"content": "string",
		"fileId": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"ownerSystemId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "Holdings",
		tableName: "mortgageDocument"
	};

	Object.freeze(config);

	return config;
})