/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"facilityId": "facilityId",
		"loanId": "loanId",
		"rolloverDays": "rolloverDays",
		"rolloverMonths": "rolloverMonths",
		"rolloverYears": "rolloverYears",
		"rolloverRequestId": "rolloverRequestId",
		"createdBy": "createdBy",
		"updatedBy": "updatedBy",
		"createdDate": "createdDate",
		"updatedDate": "updatedDate",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
	};

	Object.freeze(mappings);

	var typings = {
		"facilityId": "string",
		"loanId": "string",
		"rolloverDays": "string",
		"rolloverMonths": "string",
		"rolloverYears": "string",
		"rolloverRequestId": "string",
		"createdBy": "string",
		"updatedBy": "string",
		"createdDate": "string",
		"updatedDate": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"rolloverRequestId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeLending",
		tableName: "RolloverRequests"
	};

	Object.freeze(config);

	return config;
})