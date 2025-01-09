/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"bankName": "bankName",
		"city": "city",
		"country": "country",
		"iban": "iban",
		"countryRegion": "countryRegion",
		"bic": "bic",
		"id": "id",
		"sepaMember": "sepaMember",
		"countryCode": "countryCode",
		"addressLine1": "addressLine1",
		"isBICValid": "isBICValid",
		"countryName": "countryName",
		"status": "status",
		"errmsg": "errmsg",
		"isIBANValid": "isIBANValid",
		"routingNumber": "routingNumber",
	};

	Object.freeze(mappings);

	var typings = {
		"bankName": "string",
		"city": "string",
		"country": "string",
		"iban": "string",
		"countryRegion": "string",
		"bic": "string",
		"id": "string",
		"sepaMember": "string",
		"countryCode": "string",
		"addressLine1": "string",
		"isBICValid": "string",
		"countryName": "string",
		"status": "string",
		"errmsg": "string",
		"isIBANValid": "string",
		"routingNumber": "string",
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
		serviceName: "PayeeManagement",
		tableName: "BankDetails"
	};

	Object.freeze(config);

	return config;
})