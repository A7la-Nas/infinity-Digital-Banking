/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"bulkWireFileID": "bulkWireFileID",
		"bulkWireFileName": "bulkWireFileName",
		"noOfTransactions": "noOfTransactions",
		"noOfDomesticTransactions": "noOfDomesticTransactions",
		"noOfInternationalTransactions": "noOfInternationalTransactions",
		"fileFormatCode": "fileFormatCode",
		"createdts": "createdts",
		"lastmodifiedts": "lastmodifiedts",
		"synctimestamp": "synctimestamp",
		"company_id": "company_id",
		"softdeleteflag": "softdeleteflag",
		"bulkWireFileContents": "bulkWireFileContents",
		"firstname": "firstname",
		"lastname": "lastname",
		"dbpErrMsg": "dbpErrMsg",
		"dbpErrCode": "dbpErrCode",
		"errmsg": "errmsg",
		"searchString": "searchString",
		"sortByParam": "sortByParam",
		"sortOrder": "sortOrder",
		"pageOffset": "pageOffset",
		"pageSize": "pageSize",
		"lastExecutedOn": "lastExecutedOn",
		"bulkWiresFileFormatTypeCode": "bulkWiresFileFormatTypeCode",
		"bulkWiresFileFormatTypeName": "bulkWiresFileFormatTypeName",
		"BulkWireFileLineItems": "BulkWireFileLineItems",
		"Domestic": "Domestic",
		"International": "International",
		"recipientBankAddress1": "recipientBankAddress1",
		"recipientBankAddress2": "recipientBankAddress2",
		"recipientZipCode": "recipientZipCode",
		"recipientName": "recipientName",
		"recipientBankName": "recipientBankName",
		"recipientCity": "recipientCity",
		"recipientState": "recipientState",
		"recipientAddressLine1": "recipientAddressLine1",
		"recipientAddressLine2": "recipientAddressLine2",
		"recipientBankZipCode": "recipientBankZipCode",
		"recipientBankstate": "recipientBankstate",
		"recipientBankcity": "recipientBankcity",
		"recipientAccountNumber": "recipientAccountNumber",
		"recipientCountryName": "recipientCountryName",
		"internationalRoutingNumber": "internationalRoutingNumber",
		"routingNumber": "routingNumber",
		"currency": "currency",
		"amount": "amount",
		"transactionType": "transactionType",
		"bulkWireTransferType": "bulkWireTransferType",
		"bulkWireFileLineItemID": "bulkWireFileLineItemID",
		"swiftCode": "swiftCode",
		"note": "note",
		"fromAccountNumber": "fromAccountNumber",
		"fileCategory": "fileCategory",
	};

	Object.freeze(mappings);

	var typings = {
		"bulkWireFileID": "number",
		"bulkWireFileName": "string",
		"noOfTransactions": "number",
		"noOfDomesticTransactions": "number",
		"noOfInternationalTransactions": "number",
		"fileFormatCode": "string",
		"createdts": "date",
		"lastmodifiedts": "date",
		"synctimestamp": "date",
		"company_id": "string",
		"softdeleteflag": "number",
		"bulkWireFileContents": "binary",
		"firstname": "string",
		"lastname": "string",
		"dbpErrMsg": "string",
		"dbpErrCode": "string",
		"errmsg": "string",
		"searchString": "string",
		"sortByParam": "string",
		"sortOrder": "string",
		"pageOffset": "string",
		"pageSize": "string",
		"lastExecutedOn": "string",
		"bulkWiresFileFormatTypeCode": "string",
		"bulkWiresFileFormatTypeName": "string",
		"BulkWireFileLineItems": "string",
		"Domestic": "string",
		"International": "string",
		"recipientBankAddress1": "string",
		"recipientBankAddress2": "string",
		"recipientZipCode": "string",
		"recipientName": "string",
		"recipientBankName": "string",
		"recipientCity": "string",
		"recipientState": "string",
		"recipientAddressLine1": "string",
		"recipientAddressLine2": "string",
		"recipientBankZipCode": "string",
		"recipientBankstate": "string",
		"recipientBankcity": "string",
		"recipientAccountNumber": "string",
		"recipientCountryName": "string",
		"internationalRoutingNumber": "string",
		"routingNumber": "string",
		"currency": "string",
		"amount": "string",
		"transactionType": "string",
		"bulkWireTransferType": "string",
		"bulkWireFileLineItemID": "string",
		"swiftCode": "string",
		"note": "string",
		"fromAccountNumber": "string",
		"fileCategory": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"bulkWireFileID",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "BulkWireObjects",
		tableName: "BulkWireFile"
	};

	Object.freeze(config);

	return config;
})