/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"transactionId": "transactionId",
		"amount": "amount",
		"hasDepositImage": "hasDepositImage",
		"toAccountName": "toAccountName",
		"toAccountNumber": "toAccountNumber",
		"toAccountType": "toAccountType",
		"checkImage": "checkImage",
		"checkImageBack": "checkImageBack",
		"statusDesc": "statusDesc",
		"description": "description",
		"fromAccountBalance": "fromAccountBalance",
		"fromAccountNumber": "fromAccountNumber",
		"fromAccountName": "fromAccountName",
		"fromAccountType": "fromAccountType",
		"fromAccountCurrency": "fromAccountCurrency",
		"transactionDate": "transactionDate",
		"transactionsNotes": "transactionsNotes",
		"transactionType": "transactionType",
		"IBAN": "IBAN",
		"sortCode": "sortCode",
		"transactionCurrency": "transactionCurrency",
		"baseCurrency": "baseCurrency",
		"toAccountCurrency": "toAccountCurrency",
		"isInternationalAccount": "isInternationalAccount",
		"referenceId": "referenceId",
		"errmsg": "errmsg",
		"success": "success",
	};

	Object.freeze(mappings);

	var typings = {
		"transactionId": "string",
		"amount": "string",
		"hasDepositImage": "string",
		"toAccountName": "string",
		"toAccountNumber": "string",
		"toAccountType": "string",
		"checkImage": "string",
		"checkImageBack": "string",
		"statusDesc": "string",
		"description": "string",
		"fromAccountBalance": "string",
		"fromAccountNumber": "string",
		"fromAccountName": "string",
		"fromAccountType": "string",
		"fromAccountCurrency": "string",
		"transactionDate": "string",
		"transactionsNotes": "string",
		"transactionType": "string",
		"IBAN": "string",
		"sortCode": "string",
		"transactionCurrency": "string",
		"baseCurrency": "string",
		"toAccountCurrency": "string",
		"isInternationalAccount": "string",
		"referenceId": "string",
		"errmsg": "string",
		"success": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"transactionId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "CheckDeposit",
		tableName: "CheckDepositTransaction"
	};

	Object.freeze(config);

	return config;
})