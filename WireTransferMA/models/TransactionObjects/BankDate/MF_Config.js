/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"errmsg": "errmsg",
		"errcode": "errcode",
		"companyId": "companyId",
		"lastWorkingDate": "lastWorkingDate",
		"nextWorkingDate": "nextWorkingDate",
		"currentWorkingDate": "currentWorkingDate",
	};

	Object.freeze(mappings);

	var typings = {
		"errmsg": "string",
		"errcode": "string",
		"companyId": "string",
		"lastWorkingDate": "string",
		"nextWorkingDate": "string",
		"currentWorkingDate": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"companyId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TransactionObjects",
		tableName: "BankDate"
	};

	Object.freeze(config);

	return config;
})