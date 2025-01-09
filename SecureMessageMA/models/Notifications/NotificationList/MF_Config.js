/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"imageURL": "imageURL",
		"isRead": "isRead",
		"notificationActionLink": "notificationActionLink",
		"notificationId": "notificationId",
		"notificationModule": "notificationModule",
		"notificationSubject": "notificationSubject",
		"notificationSubModule": "notificationSubModule",
		"notificationText": "notificationText",
		"receivedDate": "receivedDate",
		"result": "result",
		"searchString": "searchString",
		"unreadNotificationCount": "unreadNotificationCount",
		"userNotificationId": "userNotificationId",
		"actionButtonLabelName": "actionButtonLabelName",
		"notificationCategory": "notificationCategory",
	};

	Object.freeze(mappings);

	var typings = {
		"imageURL": "string",
		"isRead": "string",
		"notificationActionLink": "string",
		"notificationId": "string",
		"notificationModule": "string",
		"notificationSubject": "string",
		"notificationSubModule": "string",
		"notificationText": "string",
		"receivedDate": "string",
		"result": "string",
		"searchString": "string",
		"unreadNotificationCount": "string",
		"userNotificationId": "string",
		"actionButtonLabelName": "string",
		"notificationCategory": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"notificationId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "Notifications",
		tableName: "NotificationList"
	};

	Object.freeze(config);

	return config;
})