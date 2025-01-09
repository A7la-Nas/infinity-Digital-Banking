/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"Id": "Id",
		"AccountType": "AccountType",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"httpStatusCode": "httpStatusCode",
		"opstatus": "opstatus",
	};

	Object.freeze(mappings);

	var typings = {
		"Id": "string",
		"AccountType": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"httpStatusCode": "string",
		"opstatus": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"Id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ACH",
		tableName: "ACHAccountTypes"
	};

	Object.freeze(config);

	return config;
})