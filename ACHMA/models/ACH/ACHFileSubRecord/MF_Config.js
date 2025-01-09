/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"achFileSubRecordId": "achFileSubRecordId",
		"achFileRecordId": "achFileRecordId",
		"amount": "amount",
		"receiverAccountNumber": "receiverAccountNumber",
		"receiverAccountType": "receiverAccountType",
		"receiverName": "receiverName",
		"receiverTransactionType": "receiverTransactionType",
	};

	Object.freeze(mappings);

	var typings = {
		"achFileSubRecordId": "string",
		"achFileRecordId": "string",
		"amount": "string",
		"receiverAccountNumber": "string",
		"receiverAccountType": "string",
		"receiverName": "string",
		"receiverTransactionType": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"achFileSubRecordId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ACH",
		tableName: "ACHFileSubRecord"
	};

	Object.freeze(config);

	return config;
})