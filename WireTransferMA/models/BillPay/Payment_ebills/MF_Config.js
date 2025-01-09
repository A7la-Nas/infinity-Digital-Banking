/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"balanceAmount": "balanceAmount",
		"billDueDate": "billDueDate",
		"billerCategory": "billerCategory",
		"billGeneratedDate": "billGeneratedDate",
		"description": "description",
		"dueAmount": "dueAmount",
		"ebillStatus": "ebillStatus",
		"ebillURL": "ebillURL",
		"fromAccountName": "fromAccountName",
		"fromAccountNumber": "fromAccountNumber",
		"id": "id",
		"order": "order",
		"paidAmount": "paidAmount",
		"paidDate": "paidDate",
		"payeeId": "payeeId",
		"payeeName": "payeeName",
		"sortBy": "sortBy",
		"currencyCode": "currencyCode",
	};

	Object.freeze(mappings);

	var typings = {
		"balanceAmount": "string",
		"billDueDate": "string",
		"billerCategory": "string",
		"billGeneratedDate": "string",
		"description": "string",
		"dueAmount": "string",
		"ebillStatus": "string",
		"ebillURL": "string",
		"fromAccountName": "string",
		"fromAccountNumber": "string",
		"id": "string",
		"order": "string",
		"paidAmount": "string",
		"paidDate": "string",
		"payeeId": "string",
		"payeeName": "string",
		"sortBy": "string",
		"currencyCode": "string",
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
		serviceName: "BillPay",
		tableName: "Payment_ebills"
	};

	Object.freeze(config);

	return config;
})