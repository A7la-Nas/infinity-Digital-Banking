/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"userId": "userId",
		"displayName": "displayName",
		"friendlyName": "friendlyName",
		"errorCode": "errorCode",
		"errorMessage": "errorMessage",
		"status": "status",
		"isActive": "isActive",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"userId": "string",
		"displayName": "string",
		"friendlyName": "string",
		"errorCode": "string",
		"errorMessage": "string",
		"status": "string",
		"isActive": "boolean",
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
		serviceName: "SCAActivationObjects",
		tableName: "Device"
	};

	Object.freeze(config);

	return config;
})