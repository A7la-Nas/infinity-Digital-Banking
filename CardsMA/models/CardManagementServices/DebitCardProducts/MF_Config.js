/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"productId": "productId",
		"productName": "productName",
		"accountType": "accountType",
		"featureOverview": "featureOverview",
		"featureDescription": "featureDescription",
		"representativeLabel1": "representativeLabel1",
		"representativeLabel2": "representativeLabel2",
		"representativeLabel3": "representativeLabel3",
		"representativeValue1": "representativeValue1",
		"representativeValue2": "representativeValue2",
		"representativeValue3": "representativeValue3",
		"errmsg": "errmsg",
		"successmsg": "successmsg",
	};

	Object.freeze(mappings);

	var typings = {
		"productId": "number",
		"productName": "string",
		"accountType": "string",
		"featureOverview": "string",
		"featureDescription": "string",
		"representativeLabel1": "string",
		"representativeLabel2": "string",
		"representativeLabel3": "string",
		"representativeValue1": "string",
		"representativeValue2": "string",
		"representativeValue3": "string",
		"errmsg": "string",
		"successmsg": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"productId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "CardManagementServices",
		tableName: "DebitCardProducts"
	};

	Object.freeze(config);

	return config;
})