/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"riskScore": "riskScore",
		"deviceId": "deviceId",
		"operatingSystem": "operatingSystem",
		"serviceKey": "serviceKey",
		"encodedImage": "encodedImage",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"captchaValue": "captchaValue",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"riskScore": "string",
		"deviceId": "string",
		"operatingSystem": "string",
		"serviceKey": "string",
		"encodedImage": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"captchaValue": "string",
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
		serviceName: "Login",
		tableName: "Security"
	};

	Object.freeze(config);

	return config;
})