/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"TransactionType_id": "TransactionType_id",
		"TransactionTypeName": "TransactionTypeName",
		"dbpErrCode": "dbpErrCode",
		"httpStatusCode": "httpStatusCode",
		"opstatus": "opstatus",
		"dbpErrMsg": "dbpErrMsg",
	};

	Object.freeze(mappings);

	var typings = {
		"TransactionType_id": "string",
		"TransactionTypeName": "string",
		"dbpErrCode": "string",
		"httpStatusCode": "string",
		"opstatus": "string",
		"dbpErrMsg": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"TransactionType_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ACH",
		tableName: "TransactionTypes"
	};

	Object.freeze(config);

	return config;
})