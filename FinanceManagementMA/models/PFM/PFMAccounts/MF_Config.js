/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"accountID": "accountID",
		"accountName": "accountName",
		"accountType": "accountType",
		"availableBalance": "availableBalance",
		"availablePoints": "availablePoints",
		"bankName": "bankName",
		"creditCardNumber": "creditCardNumber",
		"currencyCode": "currencyCode",
		"currentBalance": "currentBalance",
		"dueDate": "dueDate",
		"errmsg": "errmsg",
		"interestRate": "interestRate",
		"isPFM": "isPFM",
		"lastStatementBalance": "lastStatementBalance",
		"maturityDate": "maturityDate",
		"minimumDue": "minimumDue",
		"nickName": "nickName",
		"openingDate": "openingDate",
		"outstandingBalance": "outstandingBalance",
		"paymentTerm": "paymentTerm",
		"principalValue": "principalValue",
		"success": "success",
		"supportBillPay": "supportBillPay",
		"supportDeposit": "supportDeposit",
		"supportTransferFrom": "supportTransferFrom",
		"supportTransferTo": "supportTransferTo",
		"transactionLimit": "transactionLimit",
		"transferLimit": "transferLimit",
		"deviceID": "deviceID",
		"userName": "userName",
		"totalCreditMonths": "totalCreditMonths",
		"totalDebitsMonth": "totalDebitsMonth",
	};

	Object.freeze(mappings);

	var typings = {
		"accountID": "string",
		"accountName": "string",
		"accountType": "string",
		"availableBalance": "string",
		"availablePoints": "string",
		"bankName": "string",
		"creditCardNumber": "string",
		"currencyCode": "string",
		"currentBalance": "string",
		"dueDate": "string",
		"errmsg": "string",
		"interestRate": "string",
		"isPFM": "boolean",
		"lastStatementBalance": "string",
		"maturityDate": "string",
		"minimumDue": "string",
		"nickName": "string",
		"openingDate": "string",
		"outstandingBalance": "string",
		"paymentTerm": "string",
		"principalValue": "string",
		"success": "string",
		"supportBillPay": "string",
		"supportDeposit": "string",
		"supportTransferFrom": "string",
		"supportTransferTo": "string",
		"transactionLimit": "string",
		"transferLimit": "string",
		"deviceID": "string",
		"userName": "string",
		"totalCreditMonths": "string",
		"totalDebitsMonth": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"accountID",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "PFM",
		tableName: "PFMAccounts"
	};

	Object.freeze(config);

	return config;
})