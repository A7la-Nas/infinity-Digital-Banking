/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"Fileextension": "Fileextension",
		"FileType": "FileType",
		"MIMEtype": "MIMEtype",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"httpStatusCode": "httpStatusCode",
		"opstatus": "opstatus",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"Fileextension": "string",
		"FileType": "string",
		"MIMEtype": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"httpStatusCode": "string",
		"opstatus": "string",
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
		serviceName: "ACH",
		tableName: "ACHFileFormats"
	};

	Object.freeze(config);

	return config;
})