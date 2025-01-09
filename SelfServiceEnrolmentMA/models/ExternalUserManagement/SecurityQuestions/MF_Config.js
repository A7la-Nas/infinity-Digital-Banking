/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"question": "question",
		"SecurityID": "SecurityID",
		"userName": "userName",
		"securityQuestions": "securityQuestions",
	};

	Object.freeze(mappings);

	var typings = {
		"question": "string",
		"SecurityID": "string",
		"userName": "string",
		"securityQuestions": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"SecurityID",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ExternalUserManagement",
		tableName: "SecurityQuestions"
	};

	Object.freeze(config);

	return config;
})