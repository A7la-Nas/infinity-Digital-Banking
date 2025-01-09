/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"action_type": "action_type",
		"application_id": "application_id",
		"app_action_id": "app_action_id",
		"app_session_id": "app_session_id",
		"app_user_id": "app_user_id",
		"channel_id": "channel_id",
		"client_ip": "client_ip",
		"risk": "risk",
		"tags": "tags",
		"tm_device_tag": "tm_device_tag",
		"tm_session_sid": "tm_session_sid",
		"error_message": "error_message",
		"error_code": "error_code",
		"currentThreat": "currentThreat",
		"tm_action_id": "tm_action_id",
		"stepUp": "stepUp",
	};

	Object.freeze(mappings);

	var typings = {
		"action_type": "string",
		"application_id": "string",
		"app_action_id": "string",
		"app_session_id": "string",
		"app_user_id": "string",
		"channel_id": "string",
		"client_ip": "string",
		"risk": "string",
		"tags": "string",
		"tm_device_tag": "string",
		"tm_session_sid": "string",
		"error_message": "string",
		"error_code": "string",
		"currentThreat": "string",
		"tm_action_id": "string",
		"stepUp": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"app_session_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "HIDRMSService",
		tableName: "RMSActionCreate"
	};

	Object.freeze(config);

	return config;
})