/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"accountID": "accountID",
		"accountName": "accountName",
		"accountType": "accountType",
		"currencyCode": "currencyCode",
		"dueDate": "dueDate",
		"minimumDue": "minimumDue",
		"outstandingBalance": "outstandingBalance",
		"nickName": "nickName",
		"typeDescription": "typeDescription",
		"paymentDue": "paymentDue",
		"principalBalance": "principalBalance",
		"payeeId": "payeeId",
		"limit": "limit",
	};

	Object.freeze(mappings);

	var typings = {
		"accountID": "string",
		"accountName": "string",
		"accountType": "string",
		"currencyCode": "string",
		"dueDate": "string",
		"minimumDue": "string",
		"outstandingBalance": "string",
		"nickName": "string",
		"typeDescription": "string",
		"paymentDue": "string",
		"principalBalance": "string",
		"payeeId": "string",
		"limit": "string",
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
		serviceName: "TransactionObjects",
		tableName: "CreditCard"
	};

	Object.freeze(config);

	return config;
})