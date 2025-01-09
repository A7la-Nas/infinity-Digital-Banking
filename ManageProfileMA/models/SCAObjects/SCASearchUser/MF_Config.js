/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"userId": "userId",
		"username": "username",
		"authenticationMethod": "authenticationMethod",
	};

	Object.freeze(mappings);

	var typings = {
		"userId": "string",
		"username": "string",
		"authenticationMethod": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"username",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "SCAObjects",
		tableName: "SCASearchUser"
	};

	Object.freeze(config);

	return config;
})