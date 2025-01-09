/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"application_id": "application_id",
		"channel_id": "channel_id",
		"error_code": "error_code",
		"error_message": "error_message",
		"tm_action_id": "tm_action_id",
		"app_action_id": "app_action_id",
	};

	Object.freeze(mappings);

	var typings = {
		"application_id": "string",
		"channel_id": "string",
		"error_code": "string",
		"error_message": "string",
		"tm_action_id": "string",
		"app_action_id": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"tm_action_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "HIDRMSService",
		tableName: "RMSActionComplete"
	};

	Object.freeze(config);

	return config;
})