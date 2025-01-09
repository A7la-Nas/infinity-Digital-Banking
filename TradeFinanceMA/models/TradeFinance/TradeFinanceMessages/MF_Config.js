/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"createdby": "createdby",
		"accountid": "accountid",
		"customer_id": "customer_id",
		"filename": "filename",
		"harddelete": "harddelete",
		"markallasread": "markallasread",
		"media_id": "media_id",
		"messagedescription": "messagedescription",
		"modifiedby": "modifiedby",
		"priority": "priority",
		"requestsubject": "requestsubject",
		"softdelete": "softdelete",
		"softDeleteFlag": "softDeleteFlag",
		"Status": "Status",
		"username": "username",
		"requeststatus": "requeststatus",
		"request_id": "request_id",
		"requestcategory_id": "requestcategory_id",
	};

	Object.freeze(mappings);

	var typings = {
		"createdby": "string",
		"accountid": "string",
		"customer_id": "string",
		"filename": "string",
		"harddelete": "string",
		"markallasread": "string",
		"media_id": "string",
		"messagedescription": "string",
		"modifiedby": "string",
		"priority": "string",
		"requestsubject": "string",
		"softdelete": "string",
		"softDeleteFlag": "string",
		"Status": "string",
		"username": "string",
		"requeststatus": "string",
		"request_id": "string",
		"requestcategory_id": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"customer_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeFinance",
		tableName: "TradeFinanceMessages"
	};

	Object.freeze(config);

	return config;
})