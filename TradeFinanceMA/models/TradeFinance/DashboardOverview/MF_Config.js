/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"currencies": "currencies",
		"quickLink": "quickLink",
		"needAttention": "needAttention",
		"product": "product",
		"baseReferenceId": "baseReferenceId",
		"customConfig": "customConfig",
		"transactionReference": "transactionReference",
		"account": "account",
		"accountCurrency": "accountCurrency",
		"amount": "amount",
		"balanceWithCurrency": "balanceWithCurrency",
		"claimsSRMSId": "claimsSRMSId",
		"collectionReference": "collectionReference",
		"collectionSrmsId": "collectionSrmsId",
		"customerId": "customerId",
		"exportLCId": "exportLCId",
		"exportlcSRMSRequestId": "exportlcSRMSRequestId",
		"guaranteeSrmsId": "guaranteeSrmsId",
		"guaranteesSRMSId": "guaranteesSRMSId",
		"lcSrmsReqOrderID": "lcSrmsReqOrderID",
		"srmsReqOrderID": "srmsReqOrderID",
		"status": "status",
		"creditAccount": "creditAccount",
		"debitAccount": "debitAccount",
		"tradeCurrency": "tradeCurrency",
		"availableBalance": "availableBalance",
		"paymentStatus": "paymentStatus",
		"date": "date",
		"expiryDate": "expiryDate",
		"message": "message",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"dbpErrorCode": "dbpErrorCode",
		"dbpErrorMessage": "dbpErrorMessage",
		"limitId": "limitId",
		"limitCurrency": "limitCurrency",
		"availableLimit": "availableLimit",
		"utilizedLimit": "utilizedLimit",
	};

	Object.freeze(mappings);

	var typings = {
		"currencies": "string",
		"quickLink": "string",
		"needAttention": "string",
		"product": "string",
		"baseReferenceId": "string",
		"customConfig": "string",
		"transactionReference": "string",
		"account": "string",
		"accountCurrency": "string",
		"amount": "string",
		"balanceWithCurrency": "string",
		"claimsSRMSId": "string",
		"collectionReference": "string",
		"collectionSrmsId": "string",
		"customerId": "string",
		"exportLCId": "string",
		"exportlcSRMSRequestId": "string",
		"guaranteeSrmsId": "string",
		"guaranteesSRMSId": "string",
		"lcSrmsReqOrderID": "string",
		"srmsReqOrderID": "string",
		"status": "string",
		"creditAccount": "string",
		"debitAccount": "string",
		"tradeCurrency": "string",
		"availableBalance": "string",
		"paymentStatus": "string",
		"date": "string",
		"expiryDate": "string",
		"message": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"dbpErrorCode": "string",
		"dbpErrorMessage": "string",
		"limitId": "string",
		"limitCurrency": "string",
		"availableLimit": "string",
		"utilizedLimit": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"customConfig",
					"transactionReference",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeFinance",
		tableName: "DashboardOverview"
	};

	Object.freeze(config);

	return config;
})