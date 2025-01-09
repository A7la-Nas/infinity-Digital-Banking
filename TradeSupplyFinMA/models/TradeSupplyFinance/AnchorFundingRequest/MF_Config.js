/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"buyerId": "buyerId",
		"createdDate": "createdDate",
		"currency": "currency",
		"facilityId": "facilityId",
		"facilityAvailableLimit": "facilityAvailableLimit",
		"facilityCurrency": "facilityCurrency",
		"facilityUtilisedLimit": "facilityUtilisedLimit",
		"financingDate": "financingDate",
		"fundingDocuments": "fundingDocuments",
		"fundingRequestAmount": "fundingRequestAmount",
		"fundingRequestId": "fundingRequestId",
		"invoiceReferences": "invoiceReferences",
		"programName": "programName",
		"productId": "productId",
		"productName": "productName",
		"status": "status",
		"supplierId": "supplierId",
		"updatedDate": "updatedDate",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
	};

	Object.freeze(mappings);

	var typings = {
		"buyerId": "string",
		"createdDate": "string",
		"currency": "string",
		"facilityId": "string",
		"facilityAvailableLimit": "string",
		"facilityCurrency": "string",
		"facilityUtilisedLimit": "string",
		"financingDate": "string",
		"fundingDocuments": "string",
		"fundingRequestAmount": "string",
		"fundingRequestId": "string",
		"invoiceReferences": "string",
		"programName": "string",
		"productId": "string",
		"productName": "string",
		"status": "string",
		"supplierId": "string",
		"updatedDate": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"fundingRequestId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeSupplyFinance",
		tableName: "AnchorFundingRequest"
	};

	Object.freeze(config);

	return config;
})