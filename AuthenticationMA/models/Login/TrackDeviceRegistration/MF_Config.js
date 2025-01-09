/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"UserName": "UserName",
		"isRegistered": "isRegistered",
	};

	Object.freeze(mappings);

	var typings = {
		"UserName": "string",
		"isRegistered": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"UserName",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "Login",
		tableName: "TrackDeviceRegistration"
	};

	Object.freeze(config);

	return config;
})