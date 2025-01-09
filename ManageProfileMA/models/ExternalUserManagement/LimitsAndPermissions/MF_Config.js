/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"actionLimits": "actionLimits",
		"removedActions": "removedActions",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"actionLimits": "string",
		"removedActions": "string",
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
		serviceName: "ExternalUserManagement",
		tableName: "LimitsAndPermissions"
	};

	Object.freeze(config);

	return config;
})