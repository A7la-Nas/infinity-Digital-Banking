/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"accountid": "accountid",
		"createdby": "createdby",
		"customer_id": "customer_id",
		"filename": "filename",
		"harddelete": "harddelete",
		"markallasread": "markallasread",
		"media_id": "media_id",
		"messagedescription": "messagedescription",
		"modifiedby": "modifiedby",
		"Priority": "Priority",
		"requestcategory_id": "requestcategory_id",
		"requestid": "requestid",
		"Requestsubject": "Requestsubject",
		"softdelete": "softdelete",
		"softDeleteFlag": "softDeleteFlag",
		"Status": "Status",
		"username": "username",
		"request_id": "request_id",
	};

	Object.freeze(mappings);

	var typings = {
		"accountid": "string",
		"createdby": "string",
		"customer_id": "string",
		"filename": "string",
		"harddelete": "string",
		"markallasread": "string",
		"media_id": "string",
		"messagedescription": "string",
		"modifiedby": "string",
		"Priority": "string",
		"requestcategory_id": "string",
		"requestid": "string",
		"Requestsubject": "string",
		"softdelete": "string",
		"softDeleteFlag": "string",
		"Status": "string",
		"username": "string",
		"request_id": "string",
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
		serviceName: "SecureMessaging",
		tableName: "Message"
	};

	Object.freeze(config);

	return config;
})