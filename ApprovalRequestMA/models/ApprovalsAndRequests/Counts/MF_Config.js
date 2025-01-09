/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"myRequestsWaiting": "myRequestsWaiting",
		"myRequestsRejected": "myRequestsRejected",
		"myRequestsApproved": "myRequestsApproved",
		"ACHFilesForMyApproval": "ACHFilesForMyApproval",
		"ACHTransactionsForMyApproval": "ACHTransactionsForMyApproval",
		"GeneralTransactionsForMyApproval": "GeneralTransactionsForMyApproval",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"opstatus": "opstatus",
		"httpStatusCode": "httpStatusCode",
		"limitgroupId": "limitgroupId",
		"limitgroupName": "limitgroupName",
		"featureActionId": "featureActionId",
		"featureActionName": "featureActionName",
		"myApprovalsPending": "myApprovalsPending",
		"myApprovalsHistory": "myApprovalsHistory",
		"myRequestsPending": "myRequestsPending",
		"myRequestHistory": "myRequestHistory",
		"featureActions": "featureActions",
		"languageCode": "languageCode",
		"actionType": "actionType",
		"featureName": "featureName",
	};

	Object.freeze(mappings);

	var typings = {
		"myRequestsWaiting": "string",
		"myRequestsRejected": "string",
		"myRequestsApproved": "string",
		"ACHFilesForMyApproval": "string",
		"ACHTransactionsForMyApproval": "string",
		"GeneralTransactionsForMyApproval": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"opstatus": "string",
		"httpStatusCode": "string",
		"limitgroupId": "string",
		"limitgroupName": "string",
		"featureActionId": "string",
		"featureActionName": "string",
		"myApprovalsPending": "string",
		"myApprovalsHistory": "string",
		"myRequestsPending": "string",
		"myRequestHistory": "string",
		"featureActions": "string",
		"languageCode": "string",
		"actionType": "string",
		"featureName": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"myRequestsWaiting",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ApprovalsAndRequests",
		tableName: "Counts"
	};

	Object.freeze(config);

	return config;
})