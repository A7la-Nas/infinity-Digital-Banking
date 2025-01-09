/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"termsAndConditionsCode": "termsAndConditionsCode",
		"languageCode": "languageCode",
		"termsAndConditionsContent": "termsAndConditionsContent",
		"contentTypeId": "contentTypeId",
		"versionId": "versionId",
		"alreadySigned": "alreadySigned",
		"id": "id",
	};

	Object.freeze(mappings);

	var typings = {
		"termsAndConditionsCode": "string",
		"languageCode": "string",
		"termsAndConditionsContent": "string",
		"contentTypeId": "string",
		"versionId": "string",
		"alreadySigned": "string",
		"id": "string",
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
		serviceName: "ContentManagement",
		tableName: "TermsAndConditions"
	};

	Object.freeze(config);

	return config;
})