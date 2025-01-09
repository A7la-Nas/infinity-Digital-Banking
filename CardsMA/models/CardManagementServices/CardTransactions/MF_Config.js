/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"cardNumber": "cardNumber",
		"transactionMerchantAddressName": "transactionMerchantAddressName",
		"transactionBalance": "transactionBalance",
		"transactionDescription": "transactionDescription",
		"transactionMerchantCity": "transactionMerchantCity",
		"transactionStatus": "transactionStatus",
		"transactionType": "transactionType",
		"transactionCategory": "transactionCategory",
		"merchantCategory": "merchantCategory",
		"transactionDetailDescription": "transactionDetailDescription",
		"transactionIndicator": "transactionIndicator",
		"transactionDate": "transactionDate",
		"transactionTime": "transactionTime",
		"transactionAmount": "transactionAmount",
		"transactionReferenceNumber": "transactionReferenceNumber",
		"transactionCurrencyCode": "transactionCurrencyCode",
		"exchangeCurrency": "exchangeCurrency",
		"transactionExchangeRate": "transactionExchangeRate",
		"exchangeAmount": "exchangeAmount",
		"transactionTaxIndicator": "transactionTaxIndicator",
		"taxPercentage": "taxPercentage",
		"transactionTaxAmount": "transactionTaxAmount",
		"transactionTerminalID": "transactionTerminalID",
		"cardType": "cardType",
		"cardTransactions": "cardTransactions",
		"limit": "limit",
		"offset": "offset",
		"sortBy": "sortBy",
		"order": "order",
		"userId": "userId",
		"cardId": "cardId",
		"isdisputed": "isdisputed",
		"disputestatus": "disputestatus",
		"disputedate": "disputedate",
		"disputereason": "disputereason",
		"disputedescription": "disputedescription",
	};

	Object.freeze(mappings);

	var typings = {
		"cardNumber": "string",
		"transactionMerchantAddressName": "string",
		"transactionBalance": "string",
		"transactionDescription": "string",
		"transactionMerchantCity": "string",
		"transactionStatus": "string",
		"transactionType": "string",
		"transactionCategory": "string",
		"merchantCategory": "string",
		"transactionDetailDescription": "string",
		"transactionIndicator": "string",
		"transactionDate": "string",
		"transactionTime": "string",
		"transactionAmount": "string",
		"transactionReferenceNumber": "string",
		"transactionCurrencyCode": "string",
		"exchangeCurrency": "string",
		"transactionExchangeRate": "string",
		"exchangeAmount": "string",
		"transactionTaxIndicator": "string",
		"taxPercentage": "string",
		"transactionTaxAmount": "string",
		"transactionTerminalID": "string",
		"cardType": "string",
		"cardTransactions": "string",
		"limit": "string",
		"offset": "string",
		"sortBy": "string",
		"order": "string",
		"userId": "string",
		"cardId": "string",
		"isdisputed": "string",
		"disputestatus": "string",
		"disputedate": "string",
		"disputereason": "string",
		"disputedescription": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"transactionReferenceNumber",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "CardManagementServices",
		tableName: "CardTransactions"
	};

	Object.freeze(config);

	return config;
})