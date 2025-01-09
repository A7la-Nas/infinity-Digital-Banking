/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"activityId": "activityId",
		"arrangementId": "arrangementId",
		"effectiveDate": "effectiveDate",
		"productId": "productId",
		"backendOverride": "backendOverride",
		"backendError": "backendError",
	};

	Object.freeze(mappings);

	var typings = {
		"activityId": "string",
		"arrangementId": "string",
		"effectiveDate": "string",
		"productId": "string",
		"backendOverride": "string",
		"backendError": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"arrangementId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "LoanPayoff",
		tableName: "LoanSimulateObject"
	};

	Object.freeze(config);

	return config;
})