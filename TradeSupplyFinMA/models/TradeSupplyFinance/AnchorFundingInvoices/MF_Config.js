/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"billReference": "billReference",
		"billType": "billType",
		"buyerId": "buyerId",
		"buyerName": "buyerName",
		"createdDate": "createdDate",
		"invoiceAmount": "invoiceAmount",
		"invoiceCurrency": "invoiceCurrency",
		"invoiceDocuments": "invoiceDocuments",
		"invoiceReference": "invoiceReference",
		"issueDate": "issueDate",
		"maturityDate": "maturityDate",
		"role": "role",
		"status": "status",
		"supplierId": "supplierId",
		"supplierName": "supplierName",
		"updatedDate": "updatedDate",
		"uploadedFrom": "uploadedFrom",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"invoiceReferences": "invoiceReferences",
		"base64Input": "base64Input",
		"failedInvoiceIds": "failedInvoiceIds",
		"partyId": "partyId",
		"partyName": "partyName",
		"counterPartyRole": "counterPartyRole",
		"partyDet": "partyDet",
		"parties": "parties",
		"financingDate": "financingDate",
	};

	Object.freeze(mappings);

	var typings = {
		"billReference": "string",
		"billType": "string",
		"buyerId": "string",
		"buyerName": "string",
		"createdDate": "string",
		"invoiceAmount": "string",
		"invoiceCurrency": "string",
		"invoiceDocuments": "string",
		"invoiceReference": "string",
		"issueDate": "string",
		"maturityDate": "string",
		"role": "string",
		"status": "string",
		"supplierId": "string",
		"supplierName": "string",
		"updatedDate": "string",
		"uploadedFrom": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"invoiceReferences": "string",
		"base64Input": "string",
		"failedInvoiceIds": "string",
		"partyId": "string",
		"partyName": "string",
		"counterPartyRole": "string",
		"partyDet": "string",
		"parties": "string",
		"financingDate": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"invoiceReference",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeSupplyFinance",
		tableName: "AnchorFundingInvoices"
	};

	Object.freeze(config);

	return config;
})