/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"firstRecordNumber": "firstRecordNumber",
		"lastRecordNumber": "lastRecordNumber",
		"sortBy": "sortBy",
		"accountNumber": "accountNumber",
		"beneficiaryId": "beneficiaryId",
		"order": "order",
		"payeeId": "payeeId",
		"limit": "limit",
	};

	Object.freeze(mappings);

	var typings = {
		"firstRecordNumber": "string",
		"lastRecordNumber": "string",
		"sortBy": "string",
		"accountNumber": "string",
		"beneficiaryId": "string",
		"order": "string",
		"payeeId": "string",
		"limit": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"accountNumber",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TransactionObjects",
		tableName: "Activity"
	};

	Object.freeze(config);

	return config;
})