/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"coreCustomerId": "coreCustomerId",
		"id": "id",
		"contractId": "contractId",
		"isGroupLevel": "isGroupLevel",
	};

	Object.freeze(mappings);

	var typings = {
		"coreCustomerId": "string",
		"id": "string",
		"contractId": "string",
		"isGroupLevel": "boolean",
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
		serviceName: "SignatoryObject",
		tableName: "ApprovalMode"
	};

	Object.freeze(config);

	return config;
})