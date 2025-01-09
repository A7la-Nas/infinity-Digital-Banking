/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"uploadedattachments": "uploadedattachments",
		"successfulUploads": "successfulUploads",
		"failedUploads": "failedUploads",
		"fileId": "fileId",
		"fileName": "fileName",
		"fileNames": "fileNames",
		"fileContent": "fileContent",
	};

	Object.freeze(mappings);

	var typings = {
		"uploadedattachments": "string",
		"successfulUploads": "string",
		"failedUploads": "string",
		"fileId": "string",
		"fileName": "string",
		"fileNames": "string",
		"fileContent": "string",
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
		serviceName: "TradeSupplyFinance",
		tableName: "TradeDocuments"
	};

	Object.freeze(config);

	return config;
})