/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"application_id": "application_id",
		"app_action_id": "app_action_id",
		"app_session_id": "app_session_id",
		"app_user_id": "app_user_id",
		"channel_id": "channel_id",
		"client_ip": "client_ip",
		"error_code": "error_code",
		"error_message": "error_message",
		"factor_index": "factor_index",
		"security_item_type": "security_item_type",
		"tm_action_id": "tm_action_id",
		"tm_device_tag": "tm_device_tag",
		"tm_session_sid": "tm_session_sid",
	};

	Object.freeze(mappings);

	var typings = {
		"application_id": "string",
		"app_action_id": "string",
		"app_session_id": "string",
		"app_user_id": "string",
		"channel_id": "string",
		"client_ip": "string",
		"error_code": "string",
		"error_message": "string",
		"factor_index": "string",
		"security_item_type": "string",
		"tm_action_id": "string",
		"tm_device_tag": "string",
		"tm_session_sid": "string",
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
		tableName: "RMSActionSign"
	};

	Object.freeze(config);

	return config;
})