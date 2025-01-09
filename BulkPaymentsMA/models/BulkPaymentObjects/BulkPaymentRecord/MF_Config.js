/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"sortByParam": "sortByParam",
		"sortOrder": "sortOrder",
		"searchString": "searchString",
		"pageSize": "pageSize",
		"pageOffset": "pageOffset",
		"filterByParam": "filterByParam",
		"filterByValue": "filterByValue",
		"recordId": "recordId",
		"paymentId": "paymentId",
		"description": "description",
		"paymentDate": "paymentDate",
		"scheduledDate": "scheduledDate",
		"status": "status",
		"fromAccount": "fromAccount",
		"totalAmount": "totalAmount",
		"initiatedBy": "initiatedBy",
		"totalTransactions": "totalTransactions",
		"companyId": "companyId",
		"requestId": "requestId",
		"amIAprover": "amIAprover",
		"amICreator": "amICreator",
		"recievedApprovals": "recievedApprovals",
		"requiredApprovals": "requiredApprovals",
		"approvers": "approvers",
		"comments": "comments",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"opstatus": "opstatus",
		"httpStatusCode": "httpStatusCode",
		"paymentStatus": "paymentStatus",
		"featureActionId": "featureActionId",
		"actedBy": "actedBy",
		"success": "success",
		"currency": "currency",
		"batchMode": "batchMode",
		"id": "id",
		"reason": "reason",
		"cancellationreason": "cancellationreason",
		"rejectioncomments": "rejectioncomments",
		"rejectionreason": "rejectionreason",
		"paymentOrderProduct": "paymentOrderProduct",
		"cancellationReasonId": "cancellationReasonId",
		"timeParam": "timeParam",
		"timeValue": "timeValue",
		"errorDescription": "errorDescription",
	};

	Object.freeze(mappings);

	var typings = {
		"sortByParam": "string",
		"sortOrder": "string",
		"searchString": "string",
		"pageSize": "string",
		"pageOffset": "string",
		"filterByParam": "string",
		"filterByValue": "string",
		"recordId": "string",
		"paymentId": "string",
		"description": "string",
		"paymentDate": "string",
		"scheduledDate": "string",
		"status": "string",
		"fromAccount": "string",
		"totalAmount": "string",
		"initiatedBy": "string",
		"totalTransactions": "string",
		"companyId": "string",
		"requestId": "string",
		"amIAprover": "string",
		"amICreator": "string",
		"recievedApprovals": "string",
		"requiredApprovals": "string",
		"approvers": "string",
		"comments": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"opstatus": "string",
		"httpStatusCode": "string",
		"paymentStatus": "string",
		"featureActionId": "string",
		"actedBy": "string",
		"success": "string",
		"currency": "string",
		"batchMode": "string",
		"id": "string",
		"reason": "string",
		"cancellationreason": "string",
		"rejectioncomments": "string",
		"rejectionreason": "string",
		"paymentOrderProduct": "string",
		"cancellationReasonId": "string",
		"timeParam": "string",
		"timeValue": "string",
		"errorDescription": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"recordId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "BulkPaymentObjects",
		tableName: "BulkPaymentRecord"
	};

	Object.freeze(config);

	return config;
})