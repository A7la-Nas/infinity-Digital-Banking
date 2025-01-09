/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"span": "span",
		"credit": "credit",
		"debit": "debit",
		"total_balance": "total_balance",
		"Duration": "Duration",
		"dbpErrCode": "dbpErrCode",
		"opstatus": "opstatus",
		"dbpErrMsg": "dbpErrMsg",
		"httpStatusCode": "httpStatusCode",
		"Type": "Type",
		"startYear": "startYear",
		"endYear": "endYear",
		"month": "month",
	};

	Object.freeze(mappings);

	var typings = {
		"span": "string",
		"credit": "string",
		"debit": "string",
		"total_balance": "string",
		"Duration": "string",
		"dbpErrCode": "string",
		"opstatus": "string",
		"dbpErrMsg": "string",
		"httpStatusCode": "string",
		"Type": "string",
		"startYear": "string",
		"endYear": "string",
		"month": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"span",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "Holdings",
		tableName: "CashPositions"
	};

	Object.freeze(config);

	return config;
})