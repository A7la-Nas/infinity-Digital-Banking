/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"userId": "userId",
		"serviceName": "serviceName",
		"authReqId": "authReqId",
		"errorCode": "errorCode",
		"errorMessage": "errorMessage",
		"serviceKey": "serviceKey",
	};

	Object.freeze(mappings);

	var typings = {
		"userId": "string",
		"serviceName": "string",
		"authReqId": "string",
		"errorCode": "string",
		"errorMessage": "string",
		"serviceKey": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"userId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "SCATransactionObjects",
		tableName: "CIBAPushOperation"
	};

	Object.freeze(config);

	return config;
})