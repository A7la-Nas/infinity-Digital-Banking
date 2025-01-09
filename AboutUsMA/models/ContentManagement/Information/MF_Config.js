/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"infoContent": "infoContent",
		"infoType": "infoType",
		"categoryName": "categoryName",
	};

	Object.freeze(mappings);

	var typings = {
		"infoContent": "string",
		"infoType": "string",
		"categoryName": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"categoryName",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ContentManagement",
		tableName: "Information"
	};

	Object.freeze(config);

	return config;
})