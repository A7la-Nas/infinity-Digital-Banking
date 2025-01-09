/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"serviceDefinitionId": "serviceDefinitionId",
		"groupId": "groupId",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"serviceDefinitionId": "string",
		"groupId": "string",
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
		tableName: "serviceDefinition"
	};

	Object.freeze(config);

	return config;
})