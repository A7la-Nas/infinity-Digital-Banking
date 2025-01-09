/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"fileName": "fileName",
		"fileID": "fileID",
		"transactionId": "transactionId",
		"customerId": "customerId",
		"fileNames": "fileNames",
	};

	Object.freeze(mappings);

	var typings = {
		"fileName": "string",
		"fileID": "string",
		"transactionId": "string",
		"customerId": "string",
		"fileNames": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"fileID",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "DocumentManagement",
		tableName: "CustomerAdvice"
	};

	Object.freeze(config);

	return config;
})