/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"userId": "userId",
		"otp": "otp",
		"password": "password",
		"context": "context",
		"deviceId": "deviceId",
		"error_message": "error_message",
	};

	Object.freeze(mappings);

	var typings = {
		"userId": "string",
		"otp": "string",
		"password": "string",
		"context": "string",
		"deviceId": "string",
		"error_message": "string",
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
		serviceName: "SCAObjects",
		tableName: "SCAUser"
	};

	Object.freeze(config);

	return config;
})