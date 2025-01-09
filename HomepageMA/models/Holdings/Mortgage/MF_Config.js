/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"accountName": "accountName",
		"arrangementId": "arrangementId",
		"commitmentAmount": "commitmentAmount",
		"utilisedAmount": "utilisedAmount",
		"totalPaidAmount": "totalPaidAmount",
		"startDate": "startDate",
		"effectiveDate": "effectiveDate",
		"maturityDate": "maturityDate",
		"commitmentTerm": "commitmentTerm",
		"totalOutstandingBalance": "totalOutstandingBalance",
		"accountNumber": "accountNumber",
		"iBAN": "iBAN",
		"currency": "currency",
		"propertyType": "propertyType",
		"propertyAddress": "propertyAddress",
		"arrangementstatus": "arrangementstatus",
		"product": "product",
		"ownership": "ownership",
		"homeOwnership": "homeOwnership",
		"accountID": "accountID",
		"accountType": "accountType",
		"currencyCode": "currencyCode",
	};

	Object.freeze(mappings);

	var typings = {
		"accountName": "string",
		"arrangementId": "string",
		"commitmentAmount": "string",
		"utilisedAmount": "string",
		"totalPaidAmount": "string",
		"startDate": "string",
		"effectiveDate": "string",
		"maturityDate": "string",
		"commitmentTerm": "string",
		"totalOutstandingBalance": "string",
		"accountNumber": "string",
		"iBAN": "string",
		"currency": "string",
		"propertyType": "string",
		"propertyAddress": "string",
		"arrangementstatus": "string",
		"product": "string",
		"ownership": "string",
		"homeOwnership": "string",
		"accountID": "string",
		"accountType": "string",
		"currencyCode": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"accountNumber",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "Holdings",
		tableName: "Mortgage"
	};

	Object.freeze(config);

	return config;
})