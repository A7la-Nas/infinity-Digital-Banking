/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"arrangementId": "arrangementId",
		"billType": "billType",
		"paymentDate": "paymentDate",
		"backendOverride": "backendOverride",
		"backendError": "backendError",
	};

	Object.freeze(mappings);

	var typings = {
		"arrangementId": "string",
		"billType": "string",
		"paymentDate": "string",
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
		tableName: "LoanBillObject"
	};

	Object.freeze(config);

	return config;
})