/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function(){
	var repoMapping = {
		QRPay  : {
			model : "QRPayments/QRPay/Model",
			config : "QRPayments/QRPay/MF_Config",
			repository : "QRPayments/QRPay/Repository",
		},
		Transaction  : {
			model : "TransactionObjects/Transaction/Model",
			config : "TransactionObjects/Transaction/MF_Config",
			repository : "TransactionObjects/Transaction/Repository",
		},
		Activity  : {
			model : "TransactionObjects/Activity/Model",
			config : "TransactionObjects/Activity/MF_Config",
			repository : "TransactionObjects/Activity/Repository",
		},
		BankDate  : {
			model : "TransactionObjects/BankDate/Model",
			config : "TransactionObjects/BankDate/MF_Config",
			repository : "TransactionObjects/BankDate/Repository",
		},
		CreditCard  : {
			model : "TransactionObjects/CreditCard/Model",
			config : "TransactionObjects/CreditCard/MF_Config",
			repository : "TransactionObjects/CreditCard/Repository",
		},
		BulkWireFile  : {
			model : "BulkWireObjects/BulkWireFile/Model",
			config : "BulkWireObjects/BulkWireFile/MF_Config",
			repository : "BulkWireObjects/BulkWireFile/Repository",
		},
		BulkWire  : {
			model : "BulkWireObjects/BulkWire/Model",
			config : "BulkWireObjects/BulkWire/MF_Config",
			repository : "BulkWireObjects/BulkWire/Repository",
		},
		BulkWireTransaction  : {
			model : "BulkWireObjects/BulkWireTransaction/Model",
			config : "BulkWireObjects/BulkWireTransaction/MF_Config",
			repository : "BulkWireObjects/BulkWireTransaction/Repository",
		},
		Recipients  : {
			model : "PayeeObjects/Recipients/Model",
			config : "PayeeObjects/Recipients/MF_Config",
			repository : "PayeeObjects/Recipients/Repository",
		},
		Payment_P2PList  : {
			model : "DigitalTransfer/Payment_P2PList/Model",
			config : "DigitalTransfer/Payment_P2PList/MF_Config",
			repository : "DigitalTransfer/Payment_P2PList/Repository",
		},
		Payment_P2P  : {
			model : "DigitalTransfer/Payment_P2P/Model",
			config : "DigitalTransfer/Payment_P2P/MF_Config",
			repository : "DigitalTransfer/Payment_P2P/Repository",
		},
		Payee_P2P  : {
			model : "DigitalTransfer/Payee_P2P/Model",
			config : "DigitalTransfer/Payee_P2P/MF_Config",
			repository : "DigitalTransfer/Payee_P2P/Repository",
		},
		Payment_Multi  : {
			model : "Transfers/Payment_Multi/Model",
			config : "Transfers/Payment_Multi/MF_Config",
			repository : "Transfers/Payment_Multi/Repository",
		},
		WireTransfer  : {
			model : "Transfers/WireTransfer/Model",
			config : "Transfers/WireTransfer/MF_Config",
			repository : "Transfers/WireTransfer/Repository",
		},
		StandingInstruction  : {
			model : "Transfers/StandingInstruction/Model",
			config : "Transfers/StandingInstruction/MF_Config",
			repository : "Transfers/StandingInstruction/Repository",
		},
		UpcomingTransactions  : {
			model : "Transfers/UpcomingTransactions/Model",
			config : "Transfers/UpcomingTransactions/MF_Config",
			repository : "Transfers/UpcomingTransactions/Repository",
		},
		OneTimeTransfer  : {
			model : "Transfers/OneTimeTransfer/Model",
			config : "Transfers/OneTimeTransfer/MF_Config",
			repository : "Transfers/OneTimeTransfer/Repository",
		},
		DirectDebits  : {
			model : "Transfers/DirectDebits/Model",
			config : "Transfers/DirectDebits/MF_Config",
			repository : "Transfers/DirectDebits/Repository",
		},
		BankDetails  : {
			model : "PayeeManagement/BankDetails/Model",
			config : "PayeeManagement/BankDetails/MF_Config",
			repository : "PayeeManagement/BankDetails/Repository",
		},
		Payees  : {
			model : "PayeeManagement/Payees/Model",
			config : "PayeeManagement/Payees/MF_Config",
			repository : "PayeeManagement/Payees/Repository",
		},
		Payee_Name  : {
			model : "PayeeManagement/Payee_Name/Model",
			config : "PayeeManagement/Payee_Name/MF_Config",
			repository : "PayeeManagement/Payee_Name/Repository",
		},
		LoanBillObject  : {
			model : "LoanPayoff/LoanBillObject/Model",
			config : "LoanPayoff/LoanBillObject/MF_Config",
			repository : "LoanPayoff/LoanBillObject/Repository",
		},
		Packaging  : {
			model : "LoanPayoff/Packaging/Model",
			config : "LoanPayoff/Packaging/MF_Config",
            repository : "",
		},
		LoanSimulateObject  : {
			model : "LoanPayoff/LoanSimulateObject/Model",
			config : "LoanPayoff/LoanSimulateObject/MF_Config",
            repository : "",
		},
		Payee_BillPayRecent  : {
			model : "BillPay/Payee_BillPayRecent/Model",
			config : "BillPay/Payee_BillPayRecent/MF_Config",
			repository : "BillPay/Payee_BillPayRecent/Repository",
		},
		Payment  : {
			model : "BillPay/Payment/Model",
			config : "BillPay/Payment/MF_Config",
			repository : "BillPay/Payment/Repository",
		},
		Payee_BillPay  : {
			model : "BillPay/Payee_BillPay/Model",
			config : "BillPay/Payee_BillPay/MF_Config",
			repository : "BillPay/Payee_BillPay/Repository",
		},
		Payment_ebills  : {
			model : "BillPay/Payment_ebills/Model",
			config : "BillPay/Payment_ebills/MF_Config",
            repository : "",
		},
		Payment_BillPayList  : {
			model : "BillPay/Payment_BillPayList/Model",
			config : "BillPay/Payment_BillPayList/MF_Config",
			repository : "BillPay/Payment_BillPayList/Repository",
		},
		Biller  : {
			model : "BillPay/Biller/Model",
			config : "BillPay/Biller/MF_Config",
			repository : "BillPay/Biller/Repository",
		},
		ExternalCodes  : {
			model : "TransactionObjects/ExternalCodes/Model",
			config : "TransactionObjects/ExternalCodes/MF_Config",
			repository : "TransactionObjects/ExternalCodes/Repository",
		}
	};

	return repoMapping;
})