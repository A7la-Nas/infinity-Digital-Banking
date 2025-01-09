/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"transactionType": "transactionType",
		"transactionId": "transactionId",
		"contentType": "contentType",
	};

	Object.freeze(mappings);

	var typings = {
		"transactionType": "string",
		"transactionId": "string",
		"contentType": "string",
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
		tableName: "DownloadTransactionPDF"
	};

	Object.freeze(config);

	return config;
})