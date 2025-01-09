/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"amount": "amount",
		"billCategory": "billCategory",
		"billDueAmount": "billDueAmount",
		"billDueDate": "billDueDate",
		"billerCategoryName": "billerCategoryName",
		"billGeneratedDate": "billGeneratedDate",
		"billid": "billid",
		"billPaidAmount": "billPaidAmount",
		"billPaidDate": "billPaidDate",
		"description": "description",
		"eBillEnable": "eBillEnable",
		"eBillSupport": "eBillSupport",
		"ebillURL": "ebillURL",
		"frequencyEndDate": "frequencyEndDate",
		"frequencyStartDate": "frequencyStartDate",
		"frequencyType": "frequencyType",
		"fromAccountName": "fromAccountName",
		"fromAccountNumber": "fromAccountNumber",
		"isScheduled": "isScheduled",
		"limit": "limit",
		"numberOfRecurrences": "numberOfRecurrences",
		"offset": "offset",
		"order": "order",
		"payeeAccountNumber": "payeeAccountNumber",
		"payeeId": "payeeId",
		"payeeName": "payeeName",
		"payeeNickName": "payeeNickName",
		"recurrenceDesc": "recurrenceDesc",
		"referenceId": "referenceId",
		"scheduledDate": "scheduledDate",
		"sortBy": "sortBy",
		"toAccountNumber": "toAccountNumber",
		"transactionDate": "transactionDate",
		"transactionId": "transactionId",
		"transactionType": "transactionType",
		"transactionCurrency": "transactionCurrency",
		"serviceName": "serviceName",
		"fromAccountCurrency": "fromAccountCurrency",
		"toAccountCurrency": "toAccountCurrency",
		"id": "id",
		"isBusinessPayee": "isBusinessPayee",
		"statusDescription": "statusDescription",
		"transactionsNotes": "transactionsNotes",
	};

	Object.freeze(mappings);

	var typings = {
		"amount": "string",
		"billCategory": "string",
		"billDueAmount": "string",
		"billDueDate": "string",
		"billerCategoryName": "string",
		"billGeneratedDate": "string",
		"billid": "string",
		"billPaidAmount": "string",
		"billPaidDate": "string",
		"description": "string",
		"eBillEnable": "string",
		"eBillSupport": "string",
		"ebillURL": "string",
		"frequencyEndDate": "string",
		"frequencyStartDate": "string",
		"frequencyType": "string",
		"fromAccountName": "string",
		"fromAccountNumber": "string",
		"isScheduled": "string",
		"limit": "string",
		"numberOfRecurrences": "string",
		"offset": "string",
		"order": "string",
		"payeeAccountNumber": "string",
		"payeeId": "string",
		"payeeName": "string",
		"payeeNickName": "string",
		"recurrenceDesc": "string",
		"referenceId": "string",
		"scheduledDate": "string",
		"sortBy": "string",
		"toAccountNumber": "string",
		"transactionDate": "string",
		"transactionId": "string",
		"transactionType": "string",
		"transactionCurrency": "string",
		"serviceName": "string",
		"fromAccountCurrency": "string",
		"toAccountCurrency": "string",
		"id": "string",
		"isBusinessPayee": "string",
		"statusDescription": "string",
		"transactionsNotes": "string",
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
		serviceName: "BillPay",
		tableName: "Payment_BillPayList"
	};

	Object.freeze(config);

	return config;
})