/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"accountID": "accountID",
		"fromAccountName": "fromAccountName",
		"beneficiaryName": "beneficiaryName",
		"directDebitId": "directDebitId",
		"mandateReference": "mandateReference",
		"lastPaymentDate": "lastPaymentDate",
		"signingDate": "signingDate",
		"status": "status",
		"startDate": "startDate",
		"creditorReference": "creditorReference",
		"creditorAddress": "creditorAddress",
		"requestBody": "requestBody",
		"type": "type",
		"subtype": "subtype",
		"orderId": "orderId",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"errorDetails": "errorDetails",
		"messageDetails": "messageDetails",
		"error": "error",
		"directDebitStatus": "directDebitStatus",
	};

	Object.freeze(mappings);

	var typings = {
		"accountID": "string",
		"fromAccountName": "string",
		"beneficiaryName": "string",
		"directDebitId": "string",
		"mandateReference": "string",
		"lastPaymentDate": "string",
		"signingDate": "string",
		"status": "string",
		"startDate": "string",
		"creditorReference": "string",
		"creditorAddress": "string",
		"requestBody": "string",
		"type": "string",
		"subtype": "string",
		"orderId": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"errorDetails": "string",
		"messageDetails": "string",
		"error": "string",
		"directDebitStatus": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"directDebitId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "Transfers",
		tableName: "DirectDebits"
	};

	Object.freeze(config);

	return config;
})