/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"Content": "Content",
		"createdby": "createdby",
		"createdts": "createdts",
		"Description": "Description",
		"id": "id",
		"lastmodifiedts": "lastmodifiedts",
		"modifiedby": "modifiedby",
		"Name": "Name",
		"Size": "Size",
		"softdeleteflag": "softdeleteflag",
		"synctimestamp": "synctimestamp",
		"Type": "Type",
		"Url": "Url",
	};

	Object.freeze(mappings);

	var typings = {
		"Content": "binary",
		"createdby": "string",
		"createdts": "date",
		"Description": "string",
		"id": "string",
		"lastmodifiedts": "date",
		"modifiedby": "string",
		"Name": "string",
		"Size": "string",
		"softdeleteflag": "boolean",
		"synctimestamp": "date",
		"Type": "string",
		"Url": "string",
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
		serviceName: "MessageBinary",
		tableName: "media"
	};

	Object.freeze(config);

	return config;
})