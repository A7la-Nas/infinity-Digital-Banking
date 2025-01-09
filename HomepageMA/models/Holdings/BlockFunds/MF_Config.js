/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"accountID": "accountID",
		"errmsg": "errmsg",
		"searchEndDate": "searchEndDate",
		"searchStartDate": "searchStartDate",
		"fromDate": "fromDate",
		"toDate": "toDate",
		"lockedAmount": "lockedAmount",
		"transactionReference": "transactionReference",
		"lockReason": "lockReason",
		"lockedEventId": "lockedEventId",
		"totalSize": "totalSize",
		"pageSize": "pageSize",
		"pageStart": "pageStart",
		"pendingApproval": "pendingApproval",
		"stopReason": "stopReason",
		"stopInstructionChannel": "stopInstructionChannel",
	};

	Object.freeze(mappings);

	var typings = {
		"accountID": "string",
		"errmsg": "string",
		"searchEndDate": "string",
		"searchStartDate": "string",
		"fromDate": "string",
		"toDate": "string",
		"lockedAmount": "string",
		"transactionReference": "string",
		"lockReason": "string",
		"lockedEventId": "string",
		"totalSize": "string",
		"pageSize": "string",
		"pageStart": "string",
		"pendingApproval": "boolean",
		"stopReason": "string",
		"stopInstructionChannel": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "Holdings",
		tableName: "BlockFunds"
	};

	Object.freeze(config);

	return config;
})