/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"description": "description",
		"statementLink": "statementLink",
		"month": "month",
		"Card_id": "Card_id",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"description": "string",
		"statementLink": "string",
		"month": "string",
		"Card_id": "string",
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
		serviceName: "CardManagementServices",
		tableName: "CardStatements"
	};

	Object.freeze(config);

	return config;
})