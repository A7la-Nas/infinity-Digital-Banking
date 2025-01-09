/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"fromAccountNumber": "fromAccountNumber",
		"toAccountNumber": "toAccountNumber",
		"amount": "amount",
		"notes": "notes",
		"date": "date",
		"referenceId": "referenceId",
		"fromAccountName": "fromAccountName",
		"toAccountName": "toAccountName",
		"fromAccountCurrency": "fromAccountCurrency",
		"transactionCurrency": "transactionCurrency",
	};

	Object.freeze(mappings);

	var typings = {
		"fromAccountNumber": "string",
		"toAccountNumber": "string",
		"amount": "string",
		"notes": "string",
		"date": "string",
		"referenceId": "string",
		"fromAccountName": "string",
		"toAccountName": "string",
		"fromAccountCurrency": "string",
		"transactionCurrency": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"referenceId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "QRPayments",
		tableName: "QRPay"
	};

	Object.freeze(config);

	return config;
})