/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"accountNumber": "accountNumber",
		"address": "address",
		"billerCategoryId": "billerCategoryId",
		"billerCategoryName": "billerCategoryName",
		"billerName": "billerName",
		"city": "city",
		"ebillSupport": "ebillSupport",
		"id": "id",
		"limit": "limit",
		"searchString": "searchString",
		"state": "state",
		"zipCode": "zipCode",
	};

	Object.freeze(mappings);

	var typings = {
		"accountNumber": "string",
		"address": "string",
		"billerCategoryId": "string",
		"billerCategoryName": "string",
		"billerName": "string",
		"city": "string",
		"ebillSupport": "string",
		"id": "string",
		"limit": "string",
		"searchString": "string",
		"state": "string",
		"zipCode": "string",
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
		serviceName: "BillPay",
		tableName: "Biller"
	};

	Object.freeze(config);

	return config;
})