/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"deviceId": "deviceId",
		"errmsg": "errmsg",
		"status": "status",
		"UserName": "UserName",
	};

	Object.freeze(mappings);

	var typings = {
		"deviceId": "string",
		"errmsg": "string",
		"status": "string",
		"UserName": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"deviceId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "Login",
		tableName: "DeviceRegistration"
	};

	Object.freeze(config);

	return config;
})