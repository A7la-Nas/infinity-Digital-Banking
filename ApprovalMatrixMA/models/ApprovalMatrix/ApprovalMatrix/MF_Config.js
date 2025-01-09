/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"accountId": "accountId",
		"actionId": "actionId",
		"approvalRuleId": "approvalRuleId",
		"companyId": "companyId",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"limitTypeId": "limitTypeId",
		"lowerlimit": "lowerlimit",
		"upperlimit": "upperlimit",
		"cif": "cif",
		"contractId": "contractId",
		"isDisabled": "isDisabled",
		"disable": "disable",
		"isAccountLevel": "isAccountLevel",
	};

	Object.freeze(mappings);

	var typings = {
		"accountId": "string",
		"actionId": "string",
		"approvalRuleId": "string",
		"companyId": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"limitTypeId": "string",
		"lowerlimit": "string",
		"upperlimit": "string",
		"cif": "string",
		"contractId": "string",
		"isDisabled": "string",
		"disable": "string",
		"isAccountLevel": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"contractId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "ApprovalMatrix",
		tableName: "ApprovalMatrix"
	};

	Object.freeze(config);

	return config;
})