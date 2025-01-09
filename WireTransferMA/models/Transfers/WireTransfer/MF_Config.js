/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"transactionId": "transactionId",
		"amount": "amount",
		"amountTransferedTillNow": "amountTransferedTillNow",
		"description": "description",
		"fromAccountBalance": "fromAccountBalance",
		"fromAccountName": "fromAccountName",
		"fromAccountNumber": "fromAccountNumber",
		"fromAccountType": "fromAccountType",
		"fromNickName": "fromNickName",
		"isScheduled": "isScheduled",
		"payeeAccountNumber": "payeeAccountNumber",
		"payeeAddressLine1": "payeeAddressLine1",
		"payeeId": "payeeId",
		"payeeName": "payeeName",
		"scheduledDate": "scheduledDate",
		"statusDescription": "statusDescription",
		"toAccountName": "toAccountName",
		"toAccountNumber": "toAccountNumber",
		"toAccountType": "toAccountType",
		"transactionComments": "transactionComments",
		"transactionDate": "transactionDate",
		"transactionsNotes": "transactionsNotes",
		"transactionType": "transactionType",
		"fee": "fee",
		"payeeCurrency": "payeeCurrency",
		"swiftCode": "swiftCode",
		"wireAccountType": "wireAccountType",
		"country": "country",
		"IBAN": "IBAN",
		"bankName": "bankName",
		"routingNumber": "routingNumber",
		"internationalRoutingCode": "internationalRoutingCode",
		"zipCode": "zipCode",
		"cityName": "cityName",
		"state": "state",
		"bankAddressLine1": "bankAddressLine1",
		"bankAddressLine2": "bankAddressLine2",
		"bankCity": "bankCity",
		"bankState": "bankState",
		"bankZip": "bankZip",
		"payeeType": "payeeType",
		"isPayeeDeleted": "isPayeeDeleted",
		"payeeAddressLine2": "payeeAddressLine2",
		"amountRecieved": "amountRecieved",
		"serviceName": "serviceName",
		"isBusinessPayee": "isBusinessPayee",
		"firstRecordNumber": "firstRecordNumber",
		"lastRecordNumber": "lastRecordNumber",
		"order": "order",
		"sortBy": "sortBy",
	};

	Object.freeze(mappings);

	var typings = {
		"transactionId": "string",
		"amount": "string",
		"amountTransferedTillNow": "string",
		"description": "string",
		"fromAccountBalance": "string",
		"fromAccountName": "string",
		"fromAccountNumber": "string",
		"fromAccountType": "string",
		"fromNickName": "string",
		"isScheduled": "string",
		"payeeAccountNumber": "string",
		"payeeAddressLine1": "string",
		"payeeId": "string",
		"payeeName": "string",
		"scheduledDate": "string",
		"statusDescription": "string",
		"toAccountName": "string",
		"toAccountNumber": "string",
		"toAccountType": "string",
		"transactionComments": "string",
		"transactionDate": "string",
		"transactionsNotes": "string",
		"transactionType": "string",
		"fee": "string",
		"payeeCurrency": "string",
		"swiftCode": "string",
		"wireAccountType": "string",
		"country": "string",
		"IBAN": "string",
		"bankName": "string",
		"routingNumber": "string",
		"internationalRoutingCode": "string",
		"zipCode": "string",
		"cityName": "string",
		"state": "string",
		"bankAddressLine1": "string",
		"bankAddressLine2": "string",
		"bankCity": "string",
		"bankState": "string",
		"bankZip": "string",
		"payeeType": "string",
		"isPayeeDeleted": "string",
		"payeeAddressLine2": "string",
		"amountRecieved": "string",
		"serviceName": "string",
		"isBusinessPayee": "string",
		"firstRecordNumber": "string",
		"lastRecordNumber": "string",
		"order": "string",
		"sortBy": "string",
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
		serviceName: "Transfers",
		tableName: "WireTransfer"
	};

	Object.freeze(config);

	return config;
})