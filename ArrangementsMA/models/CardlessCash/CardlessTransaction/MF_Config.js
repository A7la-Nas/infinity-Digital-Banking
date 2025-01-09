/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"transactionId": "transactionId",
		"amount": "amount",
		"cashlessEmail": "cashlessEmail",
		"cashlessOTP": "cashlessOTP",
		"cashlessOTPValidDate": "cashlessOTPValidDate",
		"cashlessPersonName": "cashlessPersonName",
		"cashlessPhone": "cashlessPhone",
		"cashlessSecurityCode": "cashlessSecurityCode",
		"cashWithdrawalTransactionStatus": "cashWithdrawalTransactionStatus",
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
		"bankAddressLine1": "bankAddressLine1",
		"bankName": "bankName",
		"success": "success",
		"errmsg": "errmsg",
		"referenceId": "referenceId",
		"personId": "personId",
		"otp": "otp",
		"validDate": "validDate",
	};

	Object.freeze(mappings);

	var typings = {
		"transactionId": "string",
		"amount": "string",
		"cashlessEmail": "string",
		"cashlessOTP": "string",
		"cashlessOTPValidDate": "string",
		"cashlessPersonName": "string",
		"cashlessPhone": "string",
		"cashlessSecurityCode": "string",
		"cashWithdrawalTransactionStatus": "string",
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
		"bankAddressLine1": "string",
		"bankName": "string",
		"success": "string",
		"errmsg": "string",
		"referenceId": "string",
		"personId": "string",
		"otp": "string",
		"validDate": "string",
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
		serviceName: "CardlessCash",
		tableName: "CardlessTransaction"
	};

	Object.freeze(config);

	return config;
})