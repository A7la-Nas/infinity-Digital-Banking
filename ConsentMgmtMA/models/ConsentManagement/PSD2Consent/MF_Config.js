/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"consentTypes": "consentTypes",
		"arrangementId": "arrangementId",
		"consents": "consents",
		"consentType": "consentType",
		"consentGiven": "consentGiven",
		"consentTypeName": "consentTypeName",
		"consentBlock": "consentBlock",
		"blockNotes": "blockNotes",
		"errmsg": "errmsg",
		"subTypes": "subTypes",
		"consentSubType": "consentSubType",
		"consentSubTypeGiven": "consentSubTypeGiven",
		"status": "status",
		"accountIBANs": "accountIBANs",
		"isConsentGiven": "isConsentGiven",
		"accountIBAN": "accountIBAN",
		"shortName": "shortName",
		"categoryId": "categoryId",
		"consentId": "consentId",
		"thirdpartyprovider": "thirdpartyprovider",
		"imagePath": "imagePath",
		"consentStatus": "consentStatus",
		"thirdpartyproviderId": "thirdpartyproviderId",
		"tppStatus": "tppStatus",
		"validUntil": "validUntil",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"consentTypes": "string",
		"arrangementId": "string",
		"consents": "string",
		"consentType": "string",
		"consentGiven": "string",
		"consentTypeName": "string",
		"consentBlock": "string",
		"blockNotes": "string",
		"errmsg": "string",
		"subTypes": "string",
		"consentSubType": "string",
		"consentSubTypeGiven": "string",
		"status": "string",
		"accountIBANs": "string",
		"isConsentGiven": "string",
		"accountIBAN": "string",
		"shortName": "string",
		"categoryId": "string",
		"consentId": "string",
		"thirdpartyprovider": "string",
		"imagePath": "string",
		"consentStatus": "string",
		"thirdpartyproviderId": "string",
		"tppStatus": "string",
		"validUntil": "string",
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
		serviceName: "ConsentManagement",
		tableName: "PSD2Consent"
	};

	Object.freeze(config);

	return config;
})