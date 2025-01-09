/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"name": "name",
		"address1": "address1",
		"address2": "address2",
		"city": "city",
		"state": "state",
		"country": "country",
		"zipcode": "zipcode",
		"dbpErrMsg": "dbpErrMsg",
		"dbpErrCode": "dbpErrCode",
		"Message": "Message",
		"customerId": "customerId",
		"accountNumber": "accountNumber",
		"cif": "cif",
		"id": "id",
		"payeeId": "payeeId",
		"payeeIds": "payeeIds",
		"payeeDetails": "payeeDetails",
	};

	Object.freeze(mappings);

	var typings = {
		"name": "string",
		"address1": "string",
		"address2": "string",
		"city": "string",
		"state": "string",
		"country": "string",
		"zipcode": "string",
		"dbpErrMsg": "string",
		"dbpErrCode": "string",
		"Message": "string",
		"customerId": "string",
		"accountNumber": "string",
		"cif": "string",
		"id": "string",
		"payeeId": "string",
		"payeeIds": "string",
		"payeeDetails": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"name",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeFinance",
		tableName: "Payee"
	};

	Object.freeze(config);

	return config;
})