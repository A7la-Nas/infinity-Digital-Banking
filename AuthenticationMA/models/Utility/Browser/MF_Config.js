/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"module": "module",
		"activityType": "activityType",
		"description": "description",
		"reason": "reason",
		"browserVersion": "browserVersion",
		"browserName": "browserName",
		"channelName": "channelName",
		"operatingSystem": "operatingSystem",
		"deviceId": "deviceId",
		"ipAddress": "ipAddress",
		"userAction": "userAction",
		"application": "application",
		"appVersion": "appVersion",
		"date": "date",
		"id": "id",
	};

	Object.freeze(mappings);

	var typings = {
		"module": "string",
		"activityType": "string",
		"description": "string",
		"reason": "string",
		"browserVersion": "string",
		"browserName": "string",
		"channelName": "string",
		"operatingSystem": "string",
		"deviceId": "string",
		"ipAddress": "string",
		"userAction": "string",
		"application": "string",
		"appVersion": "string",
		"date": "string",
		"id": "string",
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
		serviceName: "Utility",
		tableName: "Browser"
	};

	Object.freeze(config);

	return config;
})