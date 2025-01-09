/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"eventCode": "eventCode",
		"placeholderCode": "placeholderCode",
		"scale": "scale",
		"campaignId": "campaignId",
	};

	Object.freeze(mappings);

	var typings = {
		"eventCode": "string",
		"placeholderCode": "string",
		"scale": "string",
		"campaignId": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"eventCode",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "CampaignEngine",
		tableName: "Campaigns"
	};

	Object.freeze(config);

	return config;
})