/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"Action": "Action",
		"cardHolderName": "cardHolderName",
		"cardId": "cardId",
		"cardNumber": "cardNumber",
		"cardStatus": "cardStatus",
		"cardType": "cardType",
		"errmsg": "errmsg",
		"expiryDate": "expiryDate",
		"Reason": "Reason",
		"success": "success",
		"userId": "userId",
		"userName": "userName",
		"creditLimit": "creditLimit",
		"availableCredit": "availableCredit",
		"serviceProvider": "serviceProvider",
		"billingAddress": "billingAddress",
		"cardProductName": "cardProductName",
		"secondaryCardHolder": "secondaryCardHolder",
		"withdrawlLimit": "withdrawlLimit",
		"withdrawalMinLimit": "withdrawalMinLimit",
		"withdrawalMaxLimit": "withdrawalMaxLimit",
		"withdrawalStepLimit": "withdrawalStepLimit",
		"purchaseLimit": "purchaseLimit",
		"purchaseMinLimit": "purchaseMinLimit",
		"purchaseMaxLimit": "purchaseMaxLimit",
		"purchaseStepLimit": "purchaseStepLimit",
		"accountNumber": "accountNumber",
		"accountName": "accountName",
		"maskedAccountNumber": "maskedAccountNumber",
		"maskedCardNumber": "maskedCardNumber",
		"isInternational": "isInternational",
		"bankName": "bankName",
		"AccountType": "AccountType",
		"RequestCode": "RequestCode",
		"RequestReason": "RequestReason",
		"Channel": "Channel",
		"Address_id": "Address_id",
		"communication_id": "communication_id",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"transactionCurrency": "transactionCurrency",
		"Currency": "Currency",
		"currencyCode": "currencyCode",
		"currentBalance": "currentBalance",
		"rewardsPoint": "rewardsPoint",
		"paymentDueDate": "paymentDueDate",
		"availableBalance": "availableBalance",
		"isTypeBusiness": "isTypeBusiness",
		"isExpiring": "isExpiring",
		"status": "status",
	};

	Object.freeze(mappings);

	var typings = {
		"Action": "string",
		"cardHolderName": "string",
		"cardId": "string",
		"cardNumber": "string",
		"cardStatus": "string",
		"cardType": "string",
		"errmsg": "string",
		"expiryDate": "string",
		"Reason": "string",
		"success": "string",
		"userId": "string",
		"userName": "string",
		"creditLimit": "string",
		"availableCredit": "string",
		"serviceProvider": "string",
		"billingAddress": "string",
		"cardProductName": "string",
		"secondaryCardHolder": "string",
		"withdrawlLimit": "string",
		"withdrawalMinLimit": "string",
		"withdrawalMaxLimit": "string",
		"withdrawalStepLimit": "string",
		"purchaseLimit": "string",
		"purchaseMinLimit": "string",
		"purchaseMaxLimit": "string",
		"purchaseStepLimit": "string",
		"accountNumber": "string",
		"accountName": "string",
		"maskedAccountNumber": "string",
		"maskedCardNumber": "string",
		"isInternational": "string",
		"bankName": "string",
		"AccountType": "string",
		"RequestCode": "string",
		"RequestReason": "string",
		"Channel": "string",
		"Address_id": "string",
		"communication_id": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"transactionCurrency": "string",
		"Currency": "string",
		"currencyCode": "string",
		"currentBalance": "string",
		"rewardsPoint": "string",
		"paymentDueDate": "string",
		"availableBalance": "string",
		"isTypeBusiness": "string",
		"isExpiring": "string",
		"status": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"cardId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "CardManagementServices",
		tableName: "ListOfCards"
	};

	Object.freeze(config);

	return config;
})