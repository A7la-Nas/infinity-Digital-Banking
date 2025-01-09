/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"body": "body",
		"Programmes": "Programmes",
		"arrangementStatus": "arrangementStatus",
		"arrangementStartDate": "arrangementStartDate",
		"availableCommitment": "availableCommitment",
		"currentCommitment": "currentCommitment",
		"unAvailableCommitment": "unAvailableCommitment",
		"shortTitle": "shortTitle",
		"arrangementCustomerName": "arrangementCustomerName",
		"arrangement": "arrangement",
		"overdrawnCommitment": "overdrawnCommitment",
		"customerId": "customerId",
		"utilisedCommitment": "utilisedCommitment",
		"currency": "currency",
		"account": "account",
		"facilityId": "facilityId",
		"facilityShortTitle": "facilityShortTitle",
	};

	Object.freeze(mappings);

	var typings = {
		"body": "string",
		"Programmes": "string",
		"arrangementStatus": "string",
		"arrangementStartDate": "string",
		"availableCommitment": "string",
		"currentCommitment": "string",
		"unAvailableCommitment": "string",
		"shortTitle": "string",
		"arrangementCustomerName": "string",
		"arrangement": "string",
		"overdrawnCommitment": "string",
		"customerId": "string",
		"utilisedCommitment": "string",
		"currency": "string",
		"account": "string",
		"facilityId": "string",
		"facilityShortTitle": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"arrangement",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeSupplyFinance",
		tableName: "Programmes"
	};

	Object.freeze(config);

	return config;
})