/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"userId": "userId",
		"activationCode": "activationCode",
		"errorCode": "errorCode",
		"errorMessage": "errorMessage",
		"id_token": "id_token",
		"password": "password",
		"provisionJSON": "provisionJSON",
		"authReqId": "authReqId",
		"pushDeviceId": "pushDeviceId",
		"deviceRegistrationStatus": "deviceRegistrationStatus",
		"deviceStatus": "deviceStatus",
	};

	Object.freeze(mappings);

	var typings = {
		"userId": "string",
		"activationCode": "string",
		"errorCode": "string",
		"errorMessage": "string",
		"id_token": "string",
		"password": "string",
		"provisionJSON": "string",
		"authReqId": "string",
		"pushDeviceId": "string",
		"deviceRegistrationStatus": "string",
		"deviceStatus": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"userId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "SCAActivationObjects",
		tableName: "ActivationCodeAuthenticator"
	};

	Object.freeze(config);

	return config;
})