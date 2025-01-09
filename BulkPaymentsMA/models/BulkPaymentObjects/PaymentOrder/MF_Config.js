/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"recordId": "recordId",
		"recipientName": "recipientName",
		"accountNumber": "accountNumber",
		"bankName": "bankName",
		"swift": "swift",
		"currency": "currency",
		"amount": "amount",
		"feesPaidBy": "feesPaidBy",
		"paymentReference": "paymentReference",
		"paymentOrderId": "paymentOrderId",
		"confirmationNumber": "confirmationNumber",
		"status": "status",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"opstatus": "opstatus",
		"httpStatusCode": "httpStatusCode",
		"paymentMethod": "paymentMethod",
		"accType": "accType",
		"sortByParam": "sortByParam",
		"sortOrder": "sortOrder",
		"searchString": "searchString",
		"pageSize": "pageSize",
		"pageOffset": "pageOffset",
		"filterByParam": "filterByParam",
		"filterByValue": "filterByValue",
		"paymentOrderProduct": "paymentOrderProduct",
		"paymentStatus": "paymentStatus",
		"errorDescription": "errorDescription",
	};

	Object.freeze(mappings);

	var typings = {
		"recordId": "string",
		"recipientName": "string",
		"accountNumber": "string",
		"bankName": "string",
		"swift": "string",
		"currency": "string",
		"amount": "string",
		"feesPaidBy": "string",
		"paymentReference": "string",
		"paymentOrderId": "string",
		"confirmationNumber": "string",
		"status": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"opstatus": "string",
		"httpStatusCode": "string",
		"paymentMethod": "string",
		"accType": "string",
		"sortByParam": "string",
		"sortOrder": "string",
		"searchString": "string",
		"pageSize": "string",
		"pageOffset": "string",
		"filterByParam": "string",
		"filterByValue": "string",
		"paymentOrderProduct": "string",
		"paymentStatus": "string",
		"errorDescription": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"paymentOrderId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "BulkPaymentObjects",
		tableName: "PaymentOrder"
	};

	Object.freeze(config);

	return config;
})