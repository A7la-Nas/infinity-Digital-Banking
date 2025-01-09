/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"paymentAdviceReference": "paymentAdviceReference",
		"drawingReferenceNo": "drawingReferenceNo",
		"adviceName": "adviceName",
		"drawingAmount": "drawingAmount",
		"beneficiary": "beneficiary",
		"paymentDate": "paymentDate",
		"creditedAmount": "creditedAmount",
		"charges": "charges",
		"advisingBank": "advisingBank",
		"creditedAccount": "creditedAccount",
		"message": "message",
		"orderId": "orderId",
		"createdDate": "createdDate",
		"debitedAmount": "debitedAmount",
		"debitedAccount": "debitedAccount",
		"issuingBank": "issuingBank",
	};

	Object.freeze(mappings);

	var typings = {
		"paymentAdviceReference": "string",
		"drawingReferenceNo": "string",
		"adviceName": "string",
		"drawingAmount": "string",
		"beneficiary": "string",
		"paymentDate": "string",
		"creditedAmount": "string",
		"charges": "string",
		"advisingBank": "string",
		"creditedAccount": "string",
		"message": "string",
		"orderId": "string",
		"createdDate": "string",
		"debitedAmount": "string",
		"debitedAccount": "string",
		"issuingBank": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"drawingReferenceNo",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeFinance",
		tableName: "PaymentAdvice"
	};

	Object.freeze(config);

	return config;
})