/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"userid": "userid",
		"password": "password",
		"id_token": "id_token",
		"deviceId": "deviceId",
	};

	Object.freeze(mappings);

	var typings = {
		"userid": "string",
		"password": "string",
		"id_token": "string",
		"deviceId": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"userid",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "SCAActivationObjects",
		tableName: "SCADevice"
	};

	Object.freeze(config);

	return config;
})