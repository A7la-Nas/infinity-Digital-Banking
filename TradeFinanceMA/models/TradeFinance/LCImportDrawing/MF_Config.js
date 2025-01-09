/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"lcReferenceNo": "lcReferenceNo",
		"lcType": "lcType",
		"drawingReferenceNo": "drawingReferenceNo",
		"beneficiaryName": "beneficiaryName",
		"documentStatus": "documentStatus",
		"drawingCreationDate": "drawingCreationDate",
		"drawingCurrency": "drawingCurrency",
		"drawingAmount": "drawingAmount",
		"drawingStatus": "drawingStatus",
		"lcAmount": "lcAmount",
		"lcCurrency": "lcCurrency",
		"lcIssueDate": "lcIssueDate",
		"lcExpiryDate": "lcExpiryDate",
		"paymentTerms": "paymentTerms",
		"presentorReference": "presentorReference",
		"presentorName": "presentorName",
		"documentsReceived": "documentsReceived",
		"forwardContact": "forwardContact",
		"shippingGuaranteeReference": "shippingGuaranteeReference",
		"approvalDate": "approvalDate",
		"totalDocuments": "totalDocuments",
		"documentName": "documentName",
		"discrepancies": "discrepancies",
		"paymentStatus": "paymentStatus",
		"rejectedDate": "rejectedDate",
		"totalAmountToBePaid": "totalAmountToBePaid",
		"accountToBeDebited": "accountToBeDebited",
		"messageFromBank": "messageFromBank",
		"messageToBank": "messageToBank",
		"totalPaidAmount": "totalPaidAmount",
		"paymentDate": "paymentDate",
		"reasonForRejection": "reasonForRejection",
		"acceptance": "acceptance",
		"messageType": "messageType",
		"deliveryDestination": "deliveryDestination",
		"messageDate": "messageDate",
		"messageCategory": "messageCategory",
		"lcSrmsReqOrderID": "lcSrmsReqOrderID",
		"drawingsSrmsReqOrderID": "drawingsSrmsReqOrderID",
		"status": "status",
	};

	Object.freeze(mappings);

	var typings = {
		"lcReferenceNo": "string",
		"lcType": "string",
		"drawingReferenceNo": "string",
		"beneficiaryName": "string",
		"documentStatus": "string",
		"drawingCreationDate": "string",
		"drawingCurrency": "string",
		"drawingAmount": "string",
		"drawingStatus": "string",
		"lcAmount": "string",
		"lcCurrency": "string",
		"lcIssueDate": "string",
		"lcExpiryDate": "string",
		"paymentTerms": "string",
		"presentorReference": "string",
		"presentorName": "string",
		"documentsReceived": "string",
		"forwardContact": "string",
		"shippingGuaranteeReference": "string",
		"approvalDate": "string",
		"totalDocuments": "string",
		"documentName": "string",
		"discrepancies": "string",
		"paymentStatus": "string",
		"rejectedDate": "string",
		"totalAmountToBePaid": "string",
		"accountToBeDebited": "string",
		"messageFromBank": "string",
		"messageToBank": "string",
		"totalPaidAmount": "string",
		"paymentDate": "string",
		"reasonForRejection": "string",
		"acceptance": "string",
		"messageType": "string",
		"deliveryDestination": "string",
		"messageDate": "string",
		"messageCategory": "string",
		"lcSrmsReqOrderID": "string",
		"drawingsSrmsReqOrderID": "string",
		"status": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"drawingReferenceNo",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeFinance",
		tableName: "LCImportDrawing"
	};

	Object.freeze(config);

	return config;
})