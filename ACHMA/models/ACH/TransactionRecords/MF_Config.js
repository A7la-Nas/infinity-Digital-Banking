/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"AdditionalInfo": "AdditionalInfo",
		"ToAccountType": "ToAccountType",
		"Transaction_id": "Transaction_id",
		"ABATRCNumber": "ABATRCNumber",
		"TransactionRecord_id": "TransactionRecord_id",
		"Amount": "Amount",
		"Record_Name": "Record_Name",
		"ToAccountNumber": "ToAccountNumber",
		"Detail_id": "Detail_id",
		"IsZeroTaxDue": "IsZeroTaxDue",
		"TaxType": "TaxType",
		"EIN": "EIN",
		"SubTaxCategory": "SubTaxCategory",
		"EffectiveDate": "EffectiveDate",
		"TemplateRequestTypeValue": "TemplateRequestTypeValue",
		"ToAccountTypeValue": "ToAccountTypeValue",
		"TaxType_id": "TaxType_id",
		"ToAccountType_id": "ToAccountType_id",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"opstatus": "opstatus",
		"httpStatusCode": "httpStatusCode",
	};

	Object.freeze(mappings);

	var typings = {
		"AdditionalInfo": "string",
		"ToAccountType": "string",
		"Transaction_id": "string",
		"ABATRCNumber": "string",
		"TransactionRecord_id": "string",
		"Amount": "string",
		"Record_Name": "string",
		"ToAccountNumber": "string",
		"Detail_id": "string",
		"IsZeroTaxDue": "string",
		"TaxType": "string",
		"EIN": "string",
		"SubTaxCategory": "string",
		"EffectiveDate": "string",
		"TemplateRequestTypeValue": "string",
		"ToAccountTypeValue": "string",
		"TaxType_id": "string",
		"ToAccountType_id": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"opstatus": "string",
		"httpStatusCode": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"Transaction_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ACH",
		tableName: "TransactionRecords"
	};

	Object.freeze(config);

	return config;
})