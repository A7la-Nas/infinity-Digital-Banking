/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"accountId": "accountId",
		"Action": "Action",
		"cardId": "cardId",
		"errmsg": "errmsg",
		"Reason": "Reason",
		"success": "success",
		"withdrawlLimit": "withdrawlLimit",
		"purchaseLimit": "purchaseLimit",
		"errorMessage": "errorMessage",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"newPin": "newPin",
		"cvv": "cvv",
		"oldcvv": "oldcvv",
		"successmsg": "successmsg",
		"requestBody": "requestBody",
		"type": "type",
		"subtype": "subtype",
		"status": "status",
	};

	Object.freeze(mappings);

	var typings = {
		"accountId": "string",
		"Action": "string",
		"cardId": "string",
		"errmsg": "string",
		"Reason": "string",
		"success": "string",
		"withdrawlLimit": "string",
		"purchaseLimit": "string",
		"errorMessage": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"newPin": "string",
		"cvv": "number",
		"oldcvv": "number",
		"successmsg": "string",
		"requestBody": "string",
		"type": "string",
		"subtype": "string",
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
		tableName: "PurchaseLimit"
	};

	Object.freeze(config);

	return config;
})