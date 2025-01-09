/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"TranscationSubRecord_id": "TranscationSubRecord_id",
		"TransactionRecord_id": "TransactionRecord_id",
		"TaxSubCategory_id": "TaxSubCategory_id",
		"Amount": "Amount",
		"softDelete": "softDelete",
		"taxSubType": "taxSubType",
		"dbpErrCode": "dbpErrCode",
		"opstatus": "opstatus",
		"dbpErrMsg": "dbpErrMsg",
		"httpStatusCode": "httpStatusCode",
	};

	Object.freeze(mappings);

	var typings = {
		"TranscationSubRecord_id": "string",
		"TransactionRecord_id": "string",
		"TaxSubCategory_id": "string",
		"Amount": "string",
		"softDelete": "string",
		"taxSubType": "string",
		"dbpErrCode": "string",
		"opstatus": "string",
		"dbpErrMsg": "string",
		"httpStatusCode": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"TranscationSubRecord_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ACH",
		tableName: "TransactionSubRecord"
	};

	Object.freeze(config);

	return config;
})