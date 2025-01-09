/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"customRoleId": "customRoleId",
		"customRoleName": "customRoleName",
		"parentRoleId": "parentRoleId",
		"accounts": "accounts",
		"features": "features",
		"description": "description",
		"users": "users",
	};

	Object.freeze(mappings);

	var typings = {
		"customRoleId": "string",
		"customRoleName": "string",
		"parentRoleId": "string",
		"accounts": "string",
		"features": "string",
		"description": "string",
		"users": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"customRoleId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ExternalUserManagement",
		tableName: "CustomRole"
	};

	Object.freeze(config);

	return config;
})