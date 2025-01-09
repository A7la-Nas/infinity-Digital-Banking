/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"coreCustomerId": "coreCustomerId",
		"signatoryGroupId": "signatoryGroupId",
		"contractId": "contractId",
		"customerId": "customerId",
		"signatoryGroupName": "signatoryGroupName",
		"signatoryGroupDescription": "signatoryGroupDescription",
		"createdby": "createdby",
		"modifiedby": "modifiedby",
		"createdts": "createdts",
		"lastmodifiedts": "lastmodifiedts",
		"customerSignatoryGroupId": "customerSignatoryGroupId",
		"errMessage": "errMessage",
		"dbpErrMsg": "dbpErrMsg",
		"dbpErrCode": "dbpErrCode",
		"signatories": "signatories",
		"signatoryGroups": "signatoryGroups",
		"userId": "userId",
		"userName": "userName",
		"fullName": "fullName",
		"success": "success",
		"status": "status",
	};

	Object.freeze(mappings);

	var typings = {
		"coreCustomerId": "string",
		"signatoryGroupId": "string",
		"contractId": "string",
		"customerId": "string",
		"signatoryGroupName": "string",
		"signatoryGroupDescription": "string",
		"createdby": "string",
		"modifiedby": "string",
		"createdts": "string",
		"lastmodifiedts": "string",
		"customerSignatoryGroupId": "string",
		"errMessage": "string",
		"dbpErrMsg": "string",
		"dbpErrCode": "string",
		"signatories": "string",
		"signatoryGroups": "string",
		"userId": "string",
		"userName": "string",
		"fullName": "string",
		"success": "string",
		"status": "boolean",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"signatoryGroupId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "SignatoryObject",
		tableName: "SignatoryGroup"
	};

	Object.freeze(config);

	return config;
})