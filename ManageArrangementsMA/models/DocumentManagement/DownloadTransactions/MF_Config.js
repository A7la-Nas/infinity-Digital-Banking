/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"checkNumber": "checkNumber",
		"lastRecordNumber": "lastRecordNumber",
		"searchType": "searchType",
		"searchEndDate": "searchEndDate",
		"fromCheckNumber": "fromCheckNumber",
		"filters": "filters",
		"searchDescription": "searchDescription",
		"accountNumber": "accountNumber",
		"title": "title",
		"transactionId": "transactionId",
		"transactionType": "transactionType",
		"searchAmount": "searchAmount",
		"accountID": "accountID",
		"searchStartDate": "searchStartDate",
		"searchDateRange": "searchDateRange",
		"searchTransactionType": "searchTransactionType",
		"searchMinAmount": "searchMinAmount",
		"firstRecordNumber": "firstRecordNumber",
		"toCheckNumber": "toCheckNumber",
		"sortBy": "sortBy",
		"generatedBy": "generatedBy",
		"payeeId": "payeeId",
		"searchMaxAmount": "searchMaxAmount",
		"order": "order",
		"Auth_Token": "Auth_Token",
		"fileType": "fileType",
		"fileId": "fileId",
		"installmentType": "installmentType",
		"contentType": "contentType",
		"pdf": "pdf",
		"transactionDetails": "transactionDetails",
	};

	Object.freeze(mappings);

	var typings = {
		"checkNumber": "string",
		"lastRecordNumber": "string",
		"searchType": "string",
		"searchEndDate": "string",
		"fromCheckNumber": "string",
		"filters": "string",
		"searchDescription": "string",
		"accountNumber": "string",
		"title": "string",
		"transactionId": "string",
		"transactionType": "string",
		"searchAmount": "string",
		"accountID": "string",
		"searchStartDate": "string",
		"searchDateRange": "string",
		"searchTransactionType": "string",
		"searchMinAmount": "string",
		"firstRecordNumber": "string",
		"toCheckNumber": "string",
		"sortBy": "string",
		"generatedBy": "string",
		"payeeId": "string",
		"searchMaxAmount": "string",
		"order": "string",
		"Auth_Token": "string",
		"fileType": "string",
		"fileId": "string",
		"installmentType": "string",
		"contentType": "string",
		"pdf": "string",
		"transactionDetails": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"transactionId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "DocumentManagement",
		tableName: "DownloadTransactions"
	};

	Object.freeze(config);

	return config;
})