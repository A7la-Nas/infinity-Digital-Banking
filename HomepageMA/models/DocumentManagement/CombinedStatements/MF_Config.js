/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"userId": "userId",
		"fileType": "fileType",
		"bankName": "bankName",
		"dateFormat": "dateFormat",
		"currencyCode": "currencyCode",
		"toDate": "toDate",
		"fromDate": "fromDate",
		"accountsInfo": "accountsInfo",
		"fileName": "fileName",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"userId": "string",
		"fileType": "string",
		"bankName": "string",
		"dateFormat": "string",
		"currencyCode": "string",
		"toDate": "string",
		"fromDate": "string",
		"accountsInfo": "string",
		"fileName": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "DocumentManagement",
		tableName: "CombinedStatements"
	};

	Object.freeze(config);

	return config;
})