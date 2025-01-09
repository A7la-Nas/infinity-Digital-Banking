/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"key": "key",
		"value": "value",
		"configuration_id": "configuration_id",
		"tncTimeStamp": "tncTimeStamp",
	};

	Object.freeze(mappings);

	var typings = {
		"key": "string",
		"value": "string",
		"configuration_id": "string",
		"tncTimeStamp": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"configuration_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "Utility",
		tableName: "Configurations"
	};

	Object.freeze(config);

	return config;
})