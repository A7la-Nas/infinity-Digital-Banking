/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"savingsPotId": "savingsPotId",
		"partyId": "partyId",
		"portfolioId": "portfolioId",
		"productId": "productId",
		"currency": "currency",
		"fundingAccountId": "fundingAccountId",
		"fundingAccountHoldingId": "fundingAccountHoldingId",
		"potAccountId": "potAccountId",
		"potType": "potType",
		"potName": "potName",
		"savingsType": "savingsType",
		"targetAmount": "targetAmount",
		"periodicContribution": "periodicContribution",
		"targetPeriod": "targetPeriod",
		"frequency": "frequency",
		"creationDate": "creationDate",
		"startDate": "startDate",
		"endDate": "endDate",
		"availableBalance": "availableBalance",
		"amountWithdrawn": "amountWithdrawn",
		"status": "status",
		"lastModifiedDate": "lastModifiedDate",
		"frequencyDay": "frequencyDay",
		"potCurrentStatus": "potCurrentStatus",
		"potAmountPercentage": "potAmountPercentage",
		"monthsLeftForCompletion": "monthsLeftForCompletion",
		"remainingSavings": "remainingSavings",
		"errMessage": "errMessage",
	};

	Object.freeze(mappings);

	var typings = {
		"savingsPotId": "string",
		"partyId": "string",
		"portfolioId": "string",
		"productId": "string",
		"currency": "string",
		"fundingAccountId": "string",
		"fundingAccountHoldingId": "string",
		"potAccountId": "string",
		"potType": "string",
		"potName": "string",
		"savingsType": "string",
		"targetAmount": "string",
		"periodicContribution": "string",
		"targetPeriod": "string",
		"frequency": "string",
		"creationDate": "string",
		"startDate": "string",
		"endDate": "string",
		"availableBalance": "string",
		"amountWithdrawn": "string",
		"status": "string",
		"lastModifiedDate": "string",
		"frequencyDay": "string",
		"potCurrentStatus": "string",
		"potAmountPercentage": "string",
		"monthsLeftForCompletion": "string",
		"remainingSavings": "string",
		"errMessage": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"fundingAccountId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "SavingsPot",
		tableName: "Pot"
	};

	Object.freeze(config);

	return config;
})