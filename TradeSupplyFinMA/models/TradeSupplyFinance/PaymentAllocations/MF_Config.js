/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"paymentAllocationId": "paymentAllocationId",
		"status": "status",
		"beneficiaryId": "beneficiaryId",
		"beneficiaryName": "beneficiaryName",
		"createdDate": "createdDate",
		"currency": "currency",
		"fundingDocuments": "fundingDocuments",
		"originalAmount": "originalAmount",
		"receiptAmount": "receiptAmount",
		"senderId": "senderId",
		"senderName": "senderName",
		"PaymentAllocations": "PaymentAllocations",
		"transactionId": "transactionId",
		"updatedDate": "updatedDate",
		"uploadedFrom": "uploadedFrom",
		"uploadedBy": "uploadedBy",
		"valueDate": "valueDate",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
	};

	Object.freeze(mappings);

	var typings = {
		"paymentAllocationId": "string",
		"status": "string",
		"beneficiaryId": "string",
		"beneficiaryName": "string",
		"createdDate": "string",
		"currency": "string",
		"fundingDocuments": "string",
		"originalAmount": "string",
		"receiptAmount": "string",
		"senderId": "string",
		"senderName": "string",
		"PaymentAllocations": "string",
		"transactionId": "string",
		"updatedDate": "string",
		"uploadedFrom": "string",
		"uploadedBy": "string",
		"valueDate": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"paymentAllocationId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeSupplyFinance",
		tableName: "PaymentAllocations"
	};

	Object.freeze(config);

	return config;
})