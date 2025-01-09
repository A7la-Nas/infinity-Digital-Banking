/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"addressLine1": "addressLine1",
		"addressLine2": "addressLine2",
		"EBillEnable": "EBillEnable",
		"eBillSupport": "eBillSupport",
		"errmsg": "errmsg",
		"payeeId": "payeeId",
		"payeeName": "payeeName",
		"payeeNickName": "payeeNickName",
		"success": "success",
		"transitDays": "transitDays",
	};

	Object.freeze(mappings);

	var typings = {
		"addressLine1": "string",
		"addressLine2": "string",
		"EBillEnable": "string",
		"eBillSupport": "string",
		"errmsg": "string",
		"payeeId": "string",
		"payeeName": "string",
		"payeeNickName": "string",
		"success": "string",
		"transitDays": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"payeeId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "BillPay",
		tableName: "Payee_BillPayRecent"
	};

	Object.freeze(config);

	return config;
})