define({

  //Type your controller code here 
  //Type your controller code here


  onLogin: function () {
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    var scope = this;
    var authParams = {
      "UserName": "",
      "Password": "",
      "loginOptions": {
        "isOfflineEnabled": false
      }
    };
    authClient = KNYMobileFabric.getIdentityService("DbxUserLogin");
    authClient.login(authParams, successCallback.bind(this), errorCallback.bind(this));
    function successCallback(resSuccess) {
      scope.presentationSuccess(resSuccess);
    }
    function errorCallback(resError) {
      scope.presentationError(resError);
    }
  },
  onTransList: function () {
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    var scope = this;
    var authParams = {
      "UserName": "",
      "Password": "",
      "loginOptions": {
        "isOfflineEnabled": false
      }
    };
    authClient = KNYMobileFabric.getIdentityService("DbxUserLogin");
    authClient.login(authParams, successCallback.bind(this), errorCallback.bind(this));
    function successCallback(resSuccess) {
      scope.presentationTrSuccess(resSuccess);
    }
    function errorCallback(resError) {
      scope.presentationTrError(resError);
    }
  },
  presentationSuccess: function (res) {
    kony.application.dismissLoadingScreen();
    //var nav=new kony.mvc.Navigation("frmAccountsDetails");
    /*var params={
      "AccountName":"Regular Current Account",
   "Account_id":"106569",
   "IBAN":"GB54DEMO60161300106569",
   "MembershipName":"John Kelly",
   "Membership_id":"100600",
   "accountHolder":{
      "username":"John Kelly",
      "fullname":"John Kelly"
   },
   "accountID":"106569",
   "accountName":"Regular Current Account",
   "accountType":"Checking",
   "account_id":"106569",
   "actions":"[\"P2P_DELETE_RECEPIENT\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CANCEL\",\"CHECK_MANAGEMENT\",\"STOP_PAYMENT_REQUEST_VIEW\",\"RESUME_AUTHENTICATION\",\"STOP_PAYMENT_REQUEST_CREATE\",\"DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES\",\"BILL_PAY_VIEW_PAYMENTS\",\"CHECK_MANAGEMENT_VIEW_DISPUTED_CHECKS\",\"DOMESTIC_WIRE_TRANSFER_VIEW_RECEPIENT\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW_RECEPIENT\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT\",\"BILL_PAY_CREATE\",\"WITHDRAW_CASH_CARDLESS_CASH\",\"INTRA_BANK_FUND_TRANSFER_VIEW_RECEPIENT\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT\",\"DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT\",\"DISPUTE_TRANSACTIONS_MANAGE\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE\",\"INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT\",\"VIEW_CHEQUES_VIEW\",\"P2P_VIEW\",\"USER_VERIFICATION\",\"CHEQUE_BOOK_REQUEST_VIEW\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW\",\"DOMESTIC_WIRE_TRANSFER_CREATE_RECEPIENT\",\"INTRA_BANK_FUND_TRANSFER_VIEW\",\"INTERNATIONAL_WIRE_TRANSFER_CREATE\",\"INTERNATIONAL_WIRE_TRANSFER_CREATE_RECEPIENT\",\"P2P_VIEW_RECEPIENT\",\"VIEW_INSTALLMENT_SUMMARY\",\"CHEQUE_BOOK_REQUEST_APPROVE\",\"BILL_PAY_BULK\",\"INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT\",\"DOMESTIC_WIRE_TRANSFER_CREATE\",\"P2P_CREATE\",\"P2P_CREATE_RECEPIENT\",\"INTRA_BANK_FUND_TRANSFER_CANCEL\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_CANCEL\",\"INTERNATIONAL_WIRE_TRANSFER_VIEW_RECEPIENT\",\"DOMESTIC_WIRE_TRANSFER_DELETE_RECEPIENT\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT\",\"CHEQUE_BOOK_REQUEST_CREATE\",\"INTERNATIONAL_WIRE_TRANSFER_DELETE_RECEPIENT\",\"INTRA_BANK_FUND_TRANSFER_CREATE\",\"FUNDING_AUTHENTICATION\",\"REVOKE_STOP_PAYMENT_REQUEST_CREATE\",\"RDC\",\"VIEW_LOAN_SCHEDULE\",\"DIRECT_DEBIT_VIEW\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW\",\"P2P_APPROVE\",\"BILL_PAY_DELETE_PAYEES\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_CANCEL\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT\",\"DOMESTIC_WIRE_TRANSFER_VIEW\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE_RECEPIENT\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE\",\"INTERNATIONAL_WIRE_TRANSFER_VIEW\",\"BILL_PAY_VIEW_PAYEES\",\"CHECK_MANAGEMENT_ADD_STOP_CHECK_REQUEST\",\"SKIP_NEXT_PAYMENT\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_DELETE_RECEPIENT\",\"DIRECT_DEBIT_CANCEL\",\"WITHDRAW_CASH_VIEW_SUMMARY\",\"DISPUTE_TRANSACTIONS\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW\",\"DISPUTE_TRANSACTIONS_VIEW\",\"BILL_PAY_CREATE_PAYEES\",\"P2P_SELF_APPROVAL\"]",
   "arrangementId":"AA21078QRDDX",
   "availableBalance":"59978.03",
   "bankName":"Model Bank",
   "categoryId":"1001",
   "companyId":"GB0010001",
   "coreCustomerId":"100600",
   "coreCustomerName":"John Kelly",
   "currencyCode":"USD",
   "currentBalance":"59978.03",
   "displayName":"Regular Current Account",
   "dividendLastPaidAmount":"0",
   "dividendPaidYTD":"0",
   "dividendRate":"0",
   "eStatementEnable":"false",
   "externalIndicator":"false",
   "favouriteStatus":"0",
   "isBusinessAccount":"false",
   "isNew":"false",
   "isPortFolioAccount":"false",
   "jointHolders":"[]",
   "nickName":"Regular Current Account",
   "openingDate":"2021-03-19",
   "originalAmount":"0",
   "outstandingBalance":"0.0",
   "pendingDeposit":"0",
   "pendingWithdrawal":"0",
   "productGroup":"CURRENT.ACCOUNT",
   "productId":"CURRENT.ACCOUNT",
   "statusDesc":"AUTH",
   "supportBillPay":"1",
   "supportChecks":"1",
   "supportDeposit":"1",
   "supportTransferFrom":"1",
   "supportTransferTo":"1"
};*/
var params={"Account_id": "118068",
"MembershipName": "KLM MLK",
"Membership_id": "800225",
"accountHolder": {"username":" ","fullname":""},
"accountIBAN": "GB78DEMO60161300118068",
"accountID": "118068",
"accountName": "Current Account",
"accountType": "Checking",
"account_id": "118068",
"actions": "[\"P2P_DELETE_RECEPIENT\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CANCEL\",\"CHECK_MANAGEMENT\",\"STOP_PAYMENT_REQUEST_VIEW\",\"RESUME_AUTHENTICATION\",\"STOP_PAYMENT_REQUEST_CREATE\",\"DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES\",\"BILL_PAY_VIEW_PAYMENTS\",\"CHECK_MANAGEMENT_VIEW_DISPUTED_CHECKS\",\"DOMESTIC_WIRE_TRANSFER_VIEW_RECEPIENT\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW_RECEPIENT\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT\",\"INTRA_BANK_FUND_TRANSFER_VIEW_RECEPIENT\",\"BILL_PAY_CREATE\",\"WITHDRAW_CASH_CARDLESS_CASH\",\"DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT\",\"DISPUTE_TRANSACTIONS_MANAGE\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE\",\"INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT\",\"VIEW_CHEQUES_VIEW\",\"P2P_VIEW\",\"CHEQUE_BOOK_REQUEST_VIEW\",\"USER_VERIFICATION\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW\",\"INTRA_BANK_FUND_TRANSFER_VIEW\",\"DOMESTIC_WIRE_TRANSFER_CREATE_RECEPIENT\",\"INTERNATIONAL_WIRE_TRANSFER_CREATE\",\"INTERNATIONAL_WIRE_TRANSFER_CREATE_RECEPIENT\",\"P2P_VIEW_RECEPIENT\",\"INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT\",\"BILL_PAY_BULK\",\"DOMESTIC_WIRE_TRANSFER_CREATE\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT\",\"P2P_CREATE\",\"P2P_CREATE_RECEPIENT\",\"INTRA_BANK_FUND_TRANSFER_CANCEL\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_CANCEL\",\"INTERNATIONAL_WIRE_TRANSFER_VIEW_RECEPIENT\",\"DOMESTIC_WIRE_TRANSFER_DELETE_RECEPIENT\",\"CHEQUE_BOOK_REQUEST_CREATE\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT\",\"INTERNATIONAL_WIRE_TRANSFER_DELETE_RECEPIENT\",\"INTRA_BANK_FUND_TRANSFER_CREATE\",\"FUNDING_AUTHENTICATION\",\"REVOKE_STOP_PAYMENT_REQUEST_CREATE\",\"RDC\",\"VIEW_LOAN_SCHEDULE\",\"DIRECT_DEBIT_VIEW\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW\",\"P2P_APPROVE\",\"BILL_PAY_DELETE_PAYEES\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_CANCEL\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT\",\"DOMESTIC_WIRE_TRANSFER_VIEW\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE_RECEPIENT\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE\",\"INTERNATIONAL_WIRE_TRANSFER_VIEW\",\"BILL_PAY_VIEW_PAYEES\",\"CHECK_MANAGEMENT_ADD_STOP_CHECK_REQUEST\",\"SKIP_NEXT_PAYMENT\",\"INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE\",\"TRANSFER_BETWEEN_OWN_ACCOUNT_DELETE_RECEPIENT\",\"DIRECT_DEBIT_CANCEL\",\"DISPUTE_TRANSACTIONS\",\"WITHDRAW_CASH_VIEW_SUMMARY\",\"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW\",\"DISPUTE_TRANSACTIONS_VIEW\",\"P2P_SELF_APPROVAL\",\"BILL_PAY_CREATE_PAYEES\"]",
"arrangementId": "AA211054D8Y3",
"availableBalance": "398.49",
"bankName": "Model Bank",
"categoryId": "1001",
"coreCustomerId": "800225",
"coreCustomerName": "KLM MLK",
"currencyCode": "EUR",
"currentBalance": "755.89",
"displayName": "Checking",
"eStatementEnable": "false",
"favouriteStatus": "0",
"isBusinessAccount": "false",
"isNew": "false",
"isPortFolioAccount": "false",
"nickName": "Current Account",
"openingDate": "2021-04-15",
"principalBalance": "561.74",
"productGroup": "Checking",
"productId": "CURRENT.ACCOUNT",
"supportBillPay": "1",
"supportChecks": "1",
"supportDeposit": "1",
"supportTransferFrom": "1",
"supportTransferTo": "1",
"transactionCurrency": "EUR"
           };
    this.loadAccountModule().presentationController.showAccountDetails(params)
    //nav.navigate(params);
  },
  loadAccountModule: function() {
    return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
  },
  presentationError: function(res){
    kony.application.dismissLoadingScreen();
    alert("login is not working...");
    //var nav=new kony.mvc.Navigation("frmMakeTaxPayment");
    //nav.navigate(res);
  },
  presentationTrSuccess: function(res){
    kony.application.dismissLoadingScreen();
    var nav=new kony.mvc.Navigation("frmVTBillActivitiesList");
    nav.navigate(res);
  },
  presentationTrError: function(res){
    kony.application.dismissLoadingScreen();
    alert("login is not working...");
    //var nav=new kony.mvc.Navigation("frmMakeTaxPayment");
    //nav.navigate(res);
  }



});