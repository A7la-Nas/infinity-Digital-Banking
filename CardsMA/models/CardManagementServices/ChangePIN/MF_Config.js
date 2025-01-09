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
		"userName": "userName",
		"withdrawlLimit": "withdrawlLimit",
		"purchaseLimit": "purchaseLimit",
		"AccountType": "AccountType",
		"RequestCode": "RequestCode",
		"RequestReason": "RequestReason",
		"Channel": "Channel",
		"Address_id": "Address_id",
		"communication_id": "communication_id",
		"errorMessage": "errorMessage",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"newPin": "newPin",
		"cvv": "cvv",
		"oldcvv": "oldcvv",
		"successmsg": "successmsg",
		"pinNumber": "pinNumber",
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
		"userName": "string",
		"withdrawlLimit": "string",
		"purchaseLimit": "string",
		"AccountType": "string",
		"RequestCode": "string",
		"RequestReason": "string",
		"Channel": "string",
		"Address_id": "string",
		"communication_id": "string",
		"errorMessage": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"newPin": "string",
		"cvv": "number",
		"oldcvv": "number",
		"successmsg": "string",
		"pinNumber": "string",
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
		tableName: "ChangePIN"
	};

	Object.freeze(config);

	return config;
})