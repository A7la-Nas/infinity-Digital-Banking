/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"accountId": "accountId",
		"subType": "subType",
		"status": "status",
		"type": "type",
		"dateTo": "dateTo",
		"dateFrom": "dateFrom",
		"serviceReqStatus": "serviceReqStatus",
		"currrentSignatoryApprovedCount": "currrentSignatoryApprovedCount",
		"serviceReqProcessedTime": "serviceReqProcessedTime",
		"currentAttempt": "currentAttempt",
		"signatoryApprovalRequired": "signatoryApprovalRequired",
		"internalStatus": "internalStatus",
		"currentSignatoryRejectCount": "currentSignatoryRejectCount",
		"externalserviceReqRef": "externalserviceReqRef",
		"requestConfigId": "requestConfigId",
		"requestCreatedTime": "requestCreatedTime",
		"actionPerformed": "actionPerformed",
		"requestDate": "requestDate",
		"serviceReqId": "serviceReqId",
		"partyId": "partyId",
		"errorDetails": "errorDetails",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"accountId": "string",
		"subType": "string",
		"status": "string",
		"type": "string",
		"dateTo": "string",
		"dateFrom": "string",
		"serviceReqStatus": "string",
		"currrentSignatoryApprovedCount": "string",
		"serviceReqProcessedTime": "string",
		"currentAttempt": "string",
		"signatoryApprovalRequired": "string",
		"internalStatus": "string",
		"currentSignatoryRejectCount": "string",
		"externalserviceReqRef": "string",
		"requestConfigId": "string",
		"requestCreatedTime": "string",
		"actionPerformed": "string",
		"requestDate": "string",
		"serviceReqId": "string",
		"partyId": "string",
		"errorDetails": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ServiceRequestManagement",
		tableName: "ServiceRequest"
	};

	Object.freeze(config);

	return config;
})