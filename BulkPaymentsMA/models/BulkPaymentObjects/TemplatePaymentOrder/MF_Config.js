/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"paymentOrderId": "paymentOrderId",
		"templateId": "templateId",
		"recipientName": "recipientName",
		"confirmationNumber": "confirmationNumber",
		"accountNumber": "accountNumber",
		"bankName": "bankName",
		"featureActionId": "featureActionId",
		"swift": "swift",
		"feesPaidBy": "feesPaidBy",
		"paymentReference": "paymentReference",
		"debitAccountIBAN": "debitAccountIBAN",
		"beneficiaryIBAN": "beneficiaryIBAN",
		"companyId": "companyId",
		"roleId": "roleId",
		"status": "status",
		"amount": "amount",
		"beneficiaryName": "beneficiaryName",
		"beneficiaryNickName": "beneficiaryNickName",
		"beneficiaryAddress": "beneficiaryAddress",
		"currency": "currency",
		"customer": "customer",
		"accountWithBankBIC": "accountWithBankBIC",
		"paymentMethod": "paymentMethod",
		"accType": "accType",
		"dbpErrMsg": "dbpErrMsg",
		"dbpErrCode": "dbpErrCode",
		"opstatus": "opstatus",
		"httpStatusCode": "httpStatusCode",
		"beneficiaryType": "beneficiaryType",
		"addToExistingFlag": "addToExistingFlag",
	};

	Object.freeze(mappings);

	var typings = {
		"paymentOrderId": "string",
		"templateId": "string",
		"recipientName": "string",
		"confirmationNumber": "string",
		"accountNumber": "string",
		"bankName": "string",
		"featureActionId": "string",
		"swift": "string",
		"feesPaidBy": "string",
		"paymentReference": "string",
		"debitAccountIBAN": "string",
		"beneficiaryIBAN": "string",
		"companyId": "string",
		"roleId": "string",
		"status": "string",
		"amount": "string",
		"beneficiaryName": "string",
		"beneficiaryNickName": "string",
		"beneficiaryAddress": "string",
		"currency": "string",
		"customer": "string",
		"accountWithBankBIC": "string",
		"paymentMethod": "string",
		"accType": "string",
		"dbpErrMsg": "string",
		"dbpErrCode": "string",
		"opstatus": "string",
		"httpStatusCode": "string",
		"beneficiaryType": "string",
		"addToExistingFlag": "string",
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
		tableName: "TemplatePaymentOrder"
	};

	Object.freeze(config);

	return config;
})