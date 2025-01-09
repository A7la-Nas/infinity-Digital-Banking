/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"CountryCode": "CountryCode",
		"baseCurrencyCode": "baseCurrencyCode",
		"quoteCurrencyCode": "quoteCurrencyCode",
		"market": "market",
		"companyCode": "companyCode",
	};

	Object.freeze(mappings);

	var typings = {
		"CountryCode": "string",
		"baseCurrencyCode": "string",
		"quoteCurrencyCode": "string",
		"market": "string",
		"companyCode": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"baseCurrencyCode",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ForeignExchange",
		tableName: "Forex"
	};

	Object.freeze(config);

	return config;
})