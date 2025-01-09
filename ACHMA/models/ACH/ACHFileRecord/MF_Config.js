/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"achFileId": "achFileId",
		"achFileRecordId": "achFileRecordId",
		"offsetAccountNumber": "offsetAccountNumber",
		"offsetAmount": "offsetAmount",
		"offsetTransactionType": "offsetTransactionType",
		"effectiveDate": "effectiveDate",
		"requestType": "requestType",
		"totalCreditAmount": "totalCreditAmount",
		"totalDebitAmount": "totalDebitAmount",
		"transactionType": "transactionType",
	};

	Object.freeze(mappings);

	var typings = {
		"achFileId": "string",
		"achFileRecordId": "string",
		"offsetAccountNumber": "string",
		"offsetAmount": "string",
		"offsetTransactionType": "string",
		"effectiveDate": "string",
		"requestType": "string",
		"totalCreditAmount": "string",
		"totalDebitAmount": "string",
		"transactionType": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"achFileRecordId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ACH",
		tableName: "ACHFileRecord"
	};

	Object.freeze(config);

	return config;
})