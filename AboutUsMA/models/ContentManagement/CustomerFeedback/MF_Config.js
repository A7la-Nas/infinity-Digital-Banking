/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"user_id": "user_id",
		"rating": "rating",
		"featureRequest": "featureRequest",
		"description": "description",
		"likeMost": "likeMost",
		"improvement": "improvement",
		"userName": "userName",
		"feedbackID": "feedbackID",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"user_id": "string",
		"rating": "string",
		"featureRequest": "string",
		"description": "string",
		"likeMost": "string",
		"improvement": "string",
		"userName": "string",
		"feedbackID": "string",
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
		serviceName: "ContentManagement",
		tableName: "CustomerFeedback"
	};

	Object.freeze(config);

	return config;
})