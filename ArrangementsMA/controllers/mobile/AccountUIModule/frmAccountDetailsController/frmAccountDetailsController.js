  var MyAccObj= {};
define(['CampaignUtility', 'CommonUtilities'], function(CampaignUtility, CommonUtilities){
  return{
  pendingaccounts: null,
  accountId: null,
  postedaccounts: null,
  segmentData: null,
  blockedaccounts: null,
  objRec: '',
  hasCreateStopChequePerm: true,
  hasCreateChequeRequestPerm: true,  
  hasViewChequesFeat: true,
    selectedAccount: {},
          serviceSuccess:0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    this.initActions();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  initActions:function(){
    var scope=this;
    this.view.btnThreeDots.onClick=function(){
      scope.blockBackgroundonAdditionalOptions();
    };
    this.view.flxCancel.onTouchStart = function(){
      scope.enableBackgroundonCloseAdditionalOptions();
    };
              scope.view.customHeader.imgSearch.onTouchEnd = function() {
                  scope.gotoAccountInfo();
              };
              this.view.accountSummaryNative.onError = function(errorObj) {
                  alert(errorObj.err);
              };
              scope.view.quicklinksNative.onError = function(err) {
                  //alert("Error in quick links");
              };
              this.view.accountSummaryNative.requestStart = function() {
                  scope.onRequestStart();
              };
              this.view.accountSummaryNative.requestEnd = function(backendResponse) {
                  scope.onRequestEnd(backendResponse);
              };
              this.view.accountSummaryNative.onFilterClickAction = function(responseObj, userData) {
                  scope.navigateToAdvanceSearch();
              };
              this.view.accountSummaryNative.onLoanScheduleClick = function(responseObj) {};
              this.view.accountSummaryNative.setSearchText = function(searchData) {
                  scope.navSearch(searchData);
              };
              this.view.accountSummaryNative.onResetSearch = function() {
                  scope.cancelSearch();
              };
              this.view.accountsTransactionListNative.onRequestStart = function() {
                  scope.onRequestStart();
              };
              this.view.accountsTransactionListNative.onRequestEnd = function() {
                  scope.onRequestEnd();
              };
              this.view.accountsTransactionListNative.swipeActionBtn = function(RowData) {
                  alert("Clicked Button " + RowData.id);
              };
    this.view.accountsTransactionListNative.getTransactionDetails = function(data) {
      var configManager = applicationManager.getConfigurationManager();
      const isRegionalTransferMAPresent=  configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER);  

      if (!JSON.stringify(data).includes("flxNoRecords")) {

        var navManager = applicationManager.getNavigationManager();
        var userFeatures = applicationManager.getConfigurationManager().getUserFeatures();
        var userPermission = applicationManager.getConfigurationManager().getUserPermissions();
        data["userFeatures"] = userFeatures;
        data["userPermissions"] = userPermission;		
        data["fromAccountName"]=(this.context.accountName)?this.context.accountName:(this.context.nickName)?this.context.nickName:"";
        data["fromAccountNumber"]=(this.context.accountID)?this.context.accountID:"";
        navManager.setCustomInfo("frmMMTransactionDetails", data);
        navManager.setEntryPoint("frmMMTransactionDetails","Accounts");
        var config= applicationManager.getConfigurationManager();
        /*if( isRegionalTransferMAPresent)
        {
          var moneyMod = applicationManager.getModulesPresentationController({
            "moduleName": "MoneyMovementUIModule",
            "appName": "RegionalTransferMA"
          });
          if (!config.isDisputeConfigurationAdded) {
            var disputePresentationController = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA","moduleName":"DisputeTransactionUIModule"});
            disputePresentationController.fetchDisputeConfiguration(scope.navigateToDetails);
          }
          else {
            scope.navigateToDetails();
          }
        }
        else
        {*/
          if (!config.isDisputeConfigurationAdded) {
            var disputePresentationController = applicationManager.getModulesPresentationController("DisputeTransactionUIModule")
            disputePresentationController.fetchDisputeConfiguration(scope.navigateToTransactionDetails);
          }
          else {
            scope.navigateToTransactionDetails();
          }
        //}
      }
    };
    this.view.flxConsent.onTouchEnd=this.gotoAccountInfo;
    this.view.flxLoanPayOff.onTouchStart = this.navigateToLoanPayoff;
    this.view.flxLoanSchedule.onClick = this.navigateToLoanSchedule;
    this.view.flxRequestChequeBook.onClick=scope.navigateToRequestChequeBook;
    this.view.flxNewStopChequeRequest.onClick=scope.navigateToStopChequeRequest;
    this.view.flxViewMyCheques.onClick=scope.navigateToViewMyCheques;
    this.view.flxDisputeTranactions.isVisible = applicationManager.getConfigurationManager().checkUserFeature("DISPUTE_TRANSACTIONS");
    this.view.flxDisputeTranactions.onTouchStart =this.navigateToDisputedTransactions;
    this.view.flxManageCards.onClick = this.navigateToManageCards;
  },
	navigateToTransactionDetails: function(){
      var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
      accountModule.presentationController.commonFunctionForNavigation("frmTransactionDetails");
    },
	navigateToDetails: function(){
      var moneyMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"TransfersMA","moduleName":"MoneyMovementUIModule"});
      moneyMod.presentationController.commonFunctionForNavigation({"appName":"TransfersMA","friendlyName":"MoneyMovementUIModule/frmMMTransactionDetails"});
    },
          onRequestStart: function() {
            var scope = this;
              kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            scope.view.accountsTransactionListNative.setVisibility(false);
            scope.view.flxLoading.setVisibility(true);
            scope.view.forceLayout();
          },

          onRequestEnd: function(response) {
            var scope = this;
            var accNo = "";
            var ending = ".";
            this.serviceSuccess++;
            var navManager = applicationManager.getNavigationManager();
              if (!kony.sdk.isNullOrUndefined(response) && response !== "") {
                var accountDetails = navManager.getCustomInfo("frmAccountDetails");
                var nickName = accountDetails.nickName;
                if (!kony.sdk.isNullOrUndefined(nickName) && (nickName !== "")) {
                   accNo = accountDetails.accountID;
                   ending = ending.repeat(3);
                   accNo = (accNo.slice(accNo.length - 4));
                   if (nickName.length > 15) {
                       nickName = nickName.substring(0, 15) + ending;
                   } else
                       nickName = nickName + ending;
                   this.view.customHeader.lblLocateUs.text = nickName + accNo;
                } else 
                	this.view.customHeader.lblLocateUs.text = response.headerText; 
                var key = "",
                      value = "",
                      res = {};
                  for (var cont in response) {
                      var index = cont.split(".");
                      value = index[0];
                      key = index[1];
                      res[key] = response[cont];
                  }
                  var context = {
                      "selectedAccountData": res
                  }
                  navManager.setCustomInfo("frmAccountDetails", context);
                  this.accountId = context.selectedAccountData.accountID;
                  scopeObj = this;
                 var navManager = applicationManager.getNavigationManager();
                 this.selectedAccount  = navManager.getCustomInfo("selectedAccount");
                this.checkAccountStatus(this.selectedAccount)
                
              }
            if(this.serviceSuccess >= 2) {
              kony.application.dismissLoadingScreen();
               scope.view.accountsTransactionListNative.setVisibility(true);
            scope.view.flxLoading.setVisibility(false);
            scope.view.forceLayout();
            }
          },
          navSearch: function(searchData) {
              this.view.accountsTransactionListNative.startBothSearch(searchData);
          },
          cancelSearch: function() {
              this.view.accountsTransactionListNative.onCancelSearch();
          },
    checkAccountStatus: function(account){
      if(account.accountStatus.toUpperCase() == "CLOSURE_PENDING" ){
        this.view.flxConsent.isVisible = true;
        this.view.imgSym.src = "aa_process.png";
        this.view.lblWarning.text = "Your request for Account Closure is under process.";
        this.view.lblWarning.skin = "ICSknlblSSP42424215pxmb";
      }else if (account.accountStatus.toUpperCase() == "CLOSED"){
        this.view.flxConsent.isVisible = true;
        this.view.imgSym.src = "aa_password_error.png";
        this.view.lblWarning.text = "This account is closed and is no longer active.";
        this.view.lblWarning.skin = "sknlblFF5D6E";
      }
      else{
        this.view.flxConsent.isVisible = false;
      }
    },
    actionViewSweep: function (){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
      var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
      var sweepsModule = applicationManager.getModulesPresentationController({"moduleName" : "AccountSweepsUIModule", "appName" : "AccountSweepsMA"});
	  sweepsModule.getSweepsId(accountsDetails.selectedAccountData); 
    },
     actionCreateSweep: function (){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
	  navMan.setEntryPoint("AccountSweepsFlow", "CreateFromAccountDetails");
      var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
      var sweepsModule = applicationManager.getModulesPresentationController({"moduleName" : "AccountSweepsUIModule", "appName" : "AccountSweepsMA"});
      sweepsModule.setSweepsAttribute("primaryAccountNumber", accountsDetails.selectedAccountData.accountID);
	  sweepsModule.setSweepsAttribute("processedPrimaryName", accountsDetails.selectedAccountData.processedName || applicationManager.getPresentationUtility().formatText(accountsDetails.selectedAccountData.accountName,10,accountsDetails.selectedAccountData.accountID,4));
      sweepsModule.setSweepsAttribute("currencyCode", accountsDetails.selectedAccountData.currencyCode);
      sweepsModule.getAllAccounts("frmSweepsAmount", "frmAccountDetails");
    },
   navigateToMakeTransfer: function () {
    var cm = applicationManager.getConfigurationManager();
    var navManager = applicationManager.getNavigationManager();
    if (cm.isFastTransfersFlowEnabled()) {
      applicationManager.getPresentationUtility().showLoadingScreen();
     
        var moneyMovementModule = applicationManager.getModulesPresentationController({"appName":"TransfersMA","moduleName":"MoneyMovementUIModule"});
        var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
        navManager.setEntryPoint("centralmoneymovement", "frmAccountDetails");
        moneyMovementModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
        moneyMovementModule.setTransferFromAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
      
    }
    else {
      applicationManager.getPresentationUtility().showLoadingScreen();
      if (cm.getDeploymentGeography() === "EUROPE") {
       
          var transferModule = applicationManager.getModulesPresentationController({"appName":"TransfersMA","moduleName":"TransferEuropeUIModule"});
          var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
          navManager.setEntryPoint("europeTransferFlow", "frmAccountDetails");
          transferModule.setEuropeFlowType("INTERNAL");
          transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          transferModule.setTransferFromAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
        
      }
      else {
        
          var navigateToForm = navManager.setEntryPoint("makeatransfer", "frmAccountDetails");
          var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
          var transferModulePresentationController = applicationManager.getModulesPresentationController({"appName":"TransfersMA","moduleName":"TransferEuropeUIModule"});
          transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          transferModulePresentationController.navigateToTransfersChecking(accountsDetails.selectedAccountData);
        
      }
    }
     
  },
  navigateToMakePayment: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var cm=applicationManager.getConfigurationManager();
    var navMan = applicationManager.getNavigationManager();
    if (cm.getDeploymentGeography() === "EUROPE") {
      var transferModPresentationController = applicationManager.getModulesPresentationController({"appName":"TransfersMA","moduleName":"TransferEuropeUIModule"});
	   if(cm.TransferFlowType === "UTF"){
              transferModPresentationController.commonFunctionForNavigation({
                  "appName": "TransfersMA",
                  "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew"
              });
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } else {
      transferModPresentationController.setEuropeFlowType("EXTERNAL");
      var frmaccdatadetails = navMan.getCustomInfo("frmAccountDetails");
      var frmaccdata = frmaccdatadetails.selectedAccountData;
      var membership_id = navMan.getCustomInfo("accountMembershipId")? navMan.getCustomInfo("accountMembershipId") : "";
      frmaccdata.membershipID = frmaccdata.Membership_id ? frmaccdata.Membership_id : membership_id; 
      navMan.setEntryPoint("europeTransferFlow", "frmAccountDetails");
      navMan.setCustomInfo("frmAccdataMembershipID", frmaccdata.membershipID);  
      transferModPresentationController.setTransferFromAccountFromAccDetailsFlow(frmaccdata);
	  }
    }
    else{
      var moneyMovementModule = applicationManager.getModulesPresentationController({"appName":"TransfersMA","moduleName":"MoneyMovementUIModule"});
      var frmaccdatadetails = navMan.getCustomInfo("frmAccountDetails");
      var frmaccdata = frmaccdatadetails.selectedAccountData;
      var membership_id = navMan.getCustomInfo("accountMembershipId")? navMan.getCustomInfo("accountMembershipId") : "";
      frmaccdata.membershipID = frmaccdata.Membership_id ? frmaccdata.Membership_id : membership_id; 
      navMan.setEntryPoint("centralmoneymovement","frmAccountDetails");
      navMan.setCustomInfo("frmAccdataMembershipID", frmaccdata.membershipID);  
      moneyMovementModule.setTransferFromAccountFromAccDetailsFlow(frmaccdata);
    }
  },
   navigateToWithDraw : function()
  {
      
      var navManager = applicationManager.getNavigationManager();
      var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
      var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessModule");
      cardlessModule.presentationController.clearTransactionObject();
      cardlessModule.presentationController.navigateToCashRecipientForm(accountsDetails.selectedAccountData);
      //cardlessModule.presentationController.navigateToQRCashWithdrawForm(accountsDetails.selectedAccountData);
    },
  navigateToDisputedTransactions : function()
    {
      var navManager =applicationManager.getNavigationManager();
      navManager.setEntryPoint("ViewRequest","");
      var disputeModule = applicationManager.getModulesPresentationController({"moduleName" : "DisputeTransactionUIModule", "appName" : "ArrangementsMA"});
      disputeModule.getDisputeTransactionDetails(); 
      this.view.flxAdditionalOptions.setVisibility(false);
      applicationManager.getPresentationUtility().showLoadingScreen();
    },
  navigateToLoanPayoff : function()
  {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.clearTransferObject();
    var loansMod = applicationManager.getModulesPresentationController({
		  "appName": "BillPayMA",
		  "moduleName": "LoanPayUIModule"
	  });
    loansMod.navigateToLoansPayoff();
  },
  navigateToLoanSchedule: function(){
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    var accountDetails = navMan.getCustomInfo("frmAccountDetails");
    var accountData = accountDetails.selectedAccountData;
    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    var isEntitled = scope.view.accountSummaryNative.isLoanEntitled();
    accountData["isLoanChartEntitled"] = isEntitled.chartVisibility;
    accountData["isLoanTransactionsEntitled"] = isEntitled.transactionsVisibility;
    // accountsModule.presentationController.fetchTransactionsForLoanSchedule(accountData); 
    navMan.setCustomInfo("frmLoanSchedule", accountData);
    accountsModule.presentationController.commonFunctionForNavigation("AccountUIModule/frmLoanSchedule");
  },
  navigateToRequestChequeBook:function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.setEntryPoint("chequemanagement","frmAccountDetails");
    var chequeManagement = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    chequeManagement.presentationController.clearFlowValues();
    var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
    chequeManagement.presentationController.navigateFromAccountDetails(accountsDetails.selectedAccountData);
  },
  navigateToStopChequeRequest:function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.setEntryPoint("chequemanagement","frmAccountDetails");
    var chequeManagement = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    chequeManagement.presentationController.clearFlowValues();
    var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
    chequeManagement.presentationController.navigateToPayeeName(accountsDetails.selectedAccountData);
  },
  navigateToViewMyCheques:function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.setEntryPoint("chequemanagement","frmAccountDetails");
    var chequeManagement = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    chequeManagement.presentationController.clearFlowValues();
    var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
    accountsDetails.selectedAccountData.showView = "MyChequesView";
    chequeManagement.presentationController.navigateToChequeLandingScreen(accountsDetails.selectedAccountData);
  },
  navigateToSavingsPot: function() {
    var navManager = applicationManager.getNavigationManager();
   	var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
    accountsDetails.fundingAccountId = accountsDetails.selectedAccountData.accountID;
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "SavingsPotUIModule", "appName": "SavingsPotMA"});
    SavingsPotMod.presentationController.navToMySavingsPot(accountsDetails);
},
navigateToUpdateAccountSettings: function() {
    var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "SettingsUIModule", "appName": "ManageProfileMA"});
    settingsModule.presentationController.showSettings();
},
    navigateToPayDueAmount: function() {
    this.view.btnWithdrawCash.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.PAYDUEAMOUNT");
    var cm=applicationManager.getConfigurationManager();
    var navManager = applicationManager.getNavigationManager();
    if(cm.isFastTransfersFlowEnabled()){
		applicationManager.getPresentationUtility().showLoadingScreen();
        var moneyMovementModule = applicationManager.getModulesPresentationController({
        "appName": "TransfersMA",
        "moduleName": "MoneyMovementUIModule"
        });
        var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
        navManager.setEntryPoint("centralmoneymovement","frmAccountDetails");
        moneyMovementModule.transactionMode=  applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
        moneyMovementModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
    }
    else{
      applicationManager.getPresentationUtility().showLoadingScreen();
      if (cm.getDeploymentGeography() === "EUROPE") {
          var transferModule = applicationManager.getModulesPresentationController({
                  "appName": "TransfersMA",
                  "moduleName": "TransferEuropeUIModule"
              });
          var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
          navManager.setEntryPoint("europeTransferFlow", "frmAccountDetails");
          transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          transferModule.setEuropeFlowType("INTERNAL");
          applicationManager.getPresentationUtility().showLoadingScreen();
          transferModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData); 
      }
      else {
          var navigateToForm = navManager.setEntryPoint("makeatransfer", "frmAccountDetails");
          var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
          var transferModulePresentationController = applicationManager.getModulesPresentationController({
                  "appName": "TransfersMA",
                  "moduleName": "TransferEuropeUIModule"
              });
          transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          transferModulePresentationController.navigateToTransfers(accountsDetails.selectedAccountData);
      }
    }
  },

navigateToPayBill: function() {
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("payBill", "frmAccountDetails");
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                 "appName": "BillPayMA",
                 "moduleName": "BillPaymentUIModule"
	});
    billPayMod.presentationController.fetchToPayees();
    billPayMod.presentationController.commonFunctionForNavigation({
                 "appName": "BillPayMA",
                 "friendlyName": "BillPaymentUIModule/frmBillPaySelectPayee"
    });
},
 blockBackgroundonAdditionalOptions : function(){
	var scope=this;
    scope.view.flxMainContainer.setEnabled(false);
    var navManager = applicationManager.getNavigationManager();
    var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
	if (applicationManager.getDeviceUtilManager().isIPhone()) {
       var actionSheetObject = new kony.ui.ActionSheet({
       "title": null,
       "message": null,
       "showCompletionCallback": null
       });
      var actionLoanSchedule = new kony.ui.ActionItem({
        "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.LoanSchedule"),
        "style": constants.ACTION_STYLE_DEFAULT,
        "action": this.navigateToLoanSchedule
      });
      applicationManager.actionSheetObject = actionSheetObject;
	applicationManager.actionSheetObject = actionSheetObject;
       var actionLoanAcc = new kony.ui.ActionItem({
       "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.PayOffLoan"),
       "style": constants.ACTION_STYLE_DEFAULT,
       "action": this.navigateToLoanPayoff
       });
    applicationManager.actionSheetObject = actionSheetObject;
       var actionRequestChequeBook = new kony.ui.ActionItem({
       "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.chequemanagement.requestchequebook"),
       "style": constants.ACTION_STYLE_DEFAULT,
       "action": this.navigateToRequestChequeBook
       });
	applicationManager.actionSheetObject = actionSheetObject;
       var actionNewStopChequeRequest = new kony.ui.ActionItem({
       "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CM.newStopChequeRequest"),
       "style": constants.ACTION_STYLE_DEFAULT,
       "action": this.navigateToStopChequeRequest
       });
    applicationManager.actionSheetObject = actionSheetObject;
       var actionViewMyCheques = new kony.ui.ActionItem({
       "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CM.myCheques"),
       "style": constants.ACTION_STYLE_DEFAULT,
       "action": this.navigateToViewMyCheques
       });
    applicationManager.actionSheetObject = actionSheetObject;
    var actionDisputeTransaction = new kony.ui.ActionItem({
        "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Accounts.ViewDisputedTransactions"),
        "style": constants.ACTION_STYLE_DEFAULT,
        "action": this.navigateToDisputedTransactions
         });
     
    var actionManageCards = new kony.ui.ActionItem({
        "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.manageCards"),
        "style": constants.ACTION_STYLE_DEFAULT,
        "action": this.navigateToManageCards
         });
     var actionWithDraw = new kony.ui.ActionItem({
        "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.withdrawCash"),
        "style": constants.ACTION_STYLE_DEFAULT,
        "action": this.navigateToWithDraw
         });
       var actionMakeTransfer = new kony.ui.ActionItem({
        "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.MakeTransfer"),
        "style": constants.ACTION_STYLE_DEFAULT,
        "action": this.navigateToMakeTransfer
         });
	applicationManager.actionSheetObject = actionSheetObject;
       var actionCancel = new kony.ui.ActionItem({
       "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.tab.common.CANCEL"),
       "style": constants.ACTION_ITEM_STYLE_CANCEL,
        "action": this.enableBackgroundonCloseAdditionalOptions
  });
  
  if(accountsDetails !==null && accountsDetails.selectedAccountData!==null ){
    var confManager = applicationManager.getConfigurationManager();
		var account=accountsDetails.selectedAccountData["accountType"];
    if (account === "Loan" ){
      actionSheetObject.addAction(actionLoanSchedule);
      scope.view.flxLoanPayOff.setVisibility(true);
      if(confManager.checkUserPermission("VIEW_LOAN_SCHEDULE")){
      scope.view.flxLoanSchedule.setVisibility(true);
      }
      else{
        scope.view.flxLoanSchedule.setVisibility(false);
      }
    }
    else{
      scope.view.flxLoanPayOff.setVisibility(false);
      scope.view.flxLoanSchedule.setVisibility(false);
    }
    if(account==="Savings"){
		actionSheetObject.addAction(actionRequestChequeBook);
		actionSheetObject.addAction(actionNewStopChequeRequest);
		actionSheetObject.addAction(actionDisputeTransaction);
        actionSheetObject.addAction(actionManageCards); 
        var navManager = applicationManager.getNavigationManager();
        var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
         if(accountsDetails.selectedAccountData.isBusinessAccount === null ||accountsDetails.selectedAccountData.isBusinessAccount === undefined||accountsDetails.selectedAccountData.isBusinessAccount === "false"){
        actionSheetObject.addAction(actionWithDraw);
        }
		} else if(account==="Checking") {
        actionSheetObject.addAction(actionRequestChequeBook);
		actionSheetObject.addAction(actionNewStopChequeRequest);
		actionSheetObject.addAction(actionDisputeTransaction);
        actionSheetObject.addAction(actionManageCards); 
        var navManager = applicationManager.getNavigationManager();
        var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
        if(accountsDetails.selectedAccountData.isBusinessAccount === null ||accountsDetails.selectedAccountData.isBusinessAccount === undefined||accountsDetails.selectedAccountData.isBusinessAccount === "false"){
        actionSheetObject.addAction(actionMakeTransfer);
        }
        }
        else {
		actionSheetObject.addAction(actionLoanAcc);
		actionSheetObject.addAction(actionDisputeTransaction);
    }
		actionSheetObject.addAction(actionCancel);
        actionSheetObject.show();
    } 
    } else {	
	if(accountsDetails !==null && accountsDetails.selectedAccountData!==null ){
  var accountType=accountsDetails.selectedAccountData["accountType"];
  var confManager = applicationManager.getConfigurationManager();
    if (accountType === "Loan"  ){
          scope.view.flxLoanPayOff.setVisibility(true);
          if( confManager.checkUserPermission("VIEW_LOAN_SCHEDULE")){
          scope.view.flxLoanSchedule.setVisibility(true);
          }
          else{
            scope.view.flxLoanSchedule.setVisibility(false); 
          }
    }else{
      scope.view.flxLoanPayOff.setVisibility(false);
      scope.view.flxLoanSchedule.setVisibility(false);
    }
	if(accountType==="Savings"){
	scope.view.flxRequestChequeBook.setVisibility(this.hasCreateChequeRequestPerm);
	scope.view.flxNewStopChequeRequest.setVisibility(this.hasCreateStopChequePerm);
    scope.view.flxViewMyCheques.setVisibility(this.hasViewChequesFeat);
    scope.view.flxManageCards.setVisibility(true);
    var navManager = applicationManager.getNavigationManager();
    var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
      if(accountsDetails.selectedAccountData.isBusinessAccount === null ||accountsDetails.selectedAccountData.isBusinessAccount === undefined||accountsDetails.selectedAccountData.isBusinessAccount === "false"){
      scope.view.flxLoanPayOff.setVisibility(true); 
      this.view.lbluploadProfilePicture.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.withdrawCash");
      this.view.flxLoanPayOff.onTouchStart = this.navigateToWithDraw;
      }
	} else if(accountType==="Checking"){
	scope.view.flxRequestChequeBook.setVisibility(this.hasCreateChequeRequestPerm);
	scope.view.flxNewStopChequeRequest.setVisibility(this.hasCreateStopChequePerm);
    scope.view.flxViewMyCheques.setVisibility(this.hasViewChequesFeat);
    scope.view.flxManageCards.setVisibility(true);
    var navManager = applicationManager.getNavigationManager();
    var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
     if(accountsDetails.selectedAccountData.isBusinessAccount === null ||accountsDetails.selectedAccountData.isBusinessAccount === undefined||accountsDetails.selectedAccountData.isBusinessAccount === "false"){
      scope.view.flxLoanPayOff.setVisibility(true); 
      this.view.lbluploadProfilePicture.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.MakeTransfer");
      this.view.flxLoanPayOff.onTouchStart = this.navigateToMakeTransfer;
      }
	} else {
	scope.view.flxRequestChequeBook.setVisibility(false);
    scope.view.flxNewStopChequeRequest.setVisibility(false);
    scope.view.flxManageCards.setVisibility(false);
      }
      scope.view.flxAdditionalOptions.setVisibility(true);
    }
    
  }
 },
    
  enableBackgroundonCloseAdditionalOptions : function() {
    var scope=this;
    scope.view.flxMainContainer.setEnabled(true);
    scope.view.flxAdditionalOptions.setVisibility(false);
  },
  onNavigate: function(obj) {
              var scope = this;
    if (obj === undefined) {
      var newObj = {
        "view": "familyCheckingAcc"
      };
      obj = newObj;
    }
	if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
		  var footerMenuUtility = require("FooterMenuUtility");
		  this.footerMenuUtility =
			footerMenuUtility.getFooterMenuUtilityInstance();
		  var cm = applicationManager.getConfigurationManager();
		  this.footerMenuUtility.entitlements = {
			features: cm.getUserFeatures(),
			permissions: cm.getUserPermissions(),
		  };
		  this.footerMenuUtility.scope = this;
		}
    this.objRec = obj;
              var navMan = applicationManager.getNavigationManager();
    		  this.selectedAccount  = navMan.getCustomInfo("selectedAccount");
              var context = navMan.getCustomInfo("frmAccountDetails");
    		  let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
	  		  if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true"))
    		  	context.customerName = this.selectedAccount.MembershipName;
              var params = {};
              if (context.selectedAccountData !== undefined && context.selectedAccountData !== "" && context.selectedAccountData !== null) {
                  params = {
                      "accountID": context.selectedAccountData.accountID,
                      "accountType": context.selectedAccountData.accountType,
                      "currencyCode": context.selectedAccountData.currencyCode,
                      "availableBalance": context.selectedAccountData.availableBalance,
                      "isBusinessAccount":context.selectedAccountData.isBusinessAccount
                  };
              } else {
                  params = context;
              }
              params["availableBalance"] = this.selectedAccount.availableBalance;
               if(!kony.sdk.isNullOrUndefined(params["isBusinessAccount"])) {
               params["userType"] =  params["isBusinessAccount"] === "true" ? "business" : "";
                }
              params["transactionType"] = "All";
              //     params["parentScope"] = this;
              params.entitlement = {};
                if (kony.sdk.isNullOrUndefined(context.accountID))
                    context.accountID = context.selectedAccountData.accountID
                var list = applicationManager.getConfigurationManager().accountPermissions[context.accountID].actions;
                list = list.concat(applicationManager.getConfigurationManager().getUserPermissions());
                list = list.concat(applicationManager.getConfigurationManager().getUserFeatures());
                params.entitlement.features = list;//applicationManager.getConfigurationManager().accountPermissions[context.accountID].actions;//applicationManager.getConfigurationManager().getUserFeatures();
                params.entitlement.permissions = list;//applicationManager.getConfigurationManager().accountPermissions[context.accountID].actions;//applicationManager.getConfigurationManager().getUserPermissions();
                params.transactionsCount=applicationManager.getConfigurationManager().transactionsCount;
              scope.view.accountSummaryNative.setContext(params);
              scope.view.accountsTransactionListNative.setContext(params);              
              scope.view.quicklinksNative.accountType = params.accountType;
              var cm = applicationManager.getConfigurationManager();
			  var linkData = [];
              var data = {};
              for(var i = 1; i<= 11; i++){
              data = JSON.parse(scope.view.quicklinksNative["link" + i + "CTA"])
              if(data.Savings.action === "navigateToMakeTransfer" || data.Checking.action === "navigateToMakeTransfer"){
                if(cm.TransferFlowType === "UTF") {
                linkData["link" + i + "CTA"] = JSON.stringify({"Savings":{"text":"${i18n{i18n.billPay.BillPayMakeTransfer}}","image":"transfer_money.png","action":"navigateToMakeTransfer","context":"","entitlement":["UTF"],"entitlement_action":true},"Checking":{"text":"${i18n{i18n.billPay.BillPayMakeTransfer}}","image":"transfer_money.png","action":"navigateToMakeTransfer","context":"","entitlement":["UTF"],"entitlement_action":true},"Loan":{"text":"${i18n{i18n.ViewStatements.STATEMENTS}}","image":"statements.png","action":"getStatements","context":"","entitlement":["VIEW_ESTATEMENTS","VIEW_COMBINED_STATEMENTS"],"entitlement_action":false},"Mortgage":{"text":"${i18n{i18n.ViewStatements.STATEMENTS}}","image":"statements.png","action":"getStatements","context":"","entitlement":["VIEW_ESTATEMENTS","VIEW_COMBINED_STATEMENTS"],"entitlement_action":false},"Deposit":{"text":"${i18n{i18n.Accounts.ContextualActions.updateAccountSettings}}","image":"account_settings.png","action":"navigateToUpdateAccountSettings","context":"","entitlement":[],"entitlement_action":false},"CreditCard":{"text":"","image":"","action":"","context":"","entitlement":[],"entitlement_action":true},"Default":{"text":"${i18n{i18n.Accounts.ContextualActions.updateAccountSettings}}","image":"account_settings.png","action":"navigateToUpdateAccountSettings","context":"","entitlement":[],"entitlement_action":false}});
                } else if (cm.TransferFlowType === "CTF") { 
                linkData["link" + i + "CTA"] = JSON.stringify({"Savings":{"text":"${i18n{i18n.billPay.BillPayMakeTransfer}}","image":"transfer_money.png","action":"navigateToMakeTransfer","context":"","entitlement":[],"entitlement_action":false},"Checking":{"text":"${i18n{i18n.billPay.BillPayMakeTransfer}}","image":"transfer_money.png","action":"navigateToMakeTransfer","context":"","entitlement":[],"entitlement_action":false},"Loan":{"text":"${i18n{i18n.ViewStatements.STATEMENTS}}","image":"statements.png","action":"getStatements","context":"","entitlement":["VIEW_ESTATEMENTS","VIEW_COMBINED_STATEMENTS"],"entitlement_action":false},"Mortgage":{"text":"${i18n{i18n.ViewStatements.STATEMENTS}}","image":"statements.png","action":"getStatements","context":"","entitlement":["VIEW_ESTATEMENTS","VIEW_COMBINED_STATEMENTS"],"entitlement_action":false},"Deposit":{"text":"${i18n{i18n.Accounts.ContextualActions.updateAccountSettings}}","image":"account_settings.png","action":"navigateToUpdateAccountSettings","context":"","entitlement":[],"entitlement_action":false},"CreditCard":{"text":"","image":"","action":"","context":"","entitlement":[],"entitlement_action":true},"Default":{"text":"${i18n{i18n.Accounts.ContextualActions.updateAccountSettings}}","image":"account_settings.png","action":"navigateToUpdateAccountSettings","context":"","entitlement":[],"entitlement_action":false}});
                }
                } else {
                linkData["link" + i + "CTA"] =  scope.view.quicklinksNative["link" + i + "CTA"];
               }
               params.linkCTA = linkData;
              }
              var entitlments= {
                  "features": cm.getUserFeatures(),
                  "permissions": cm.getUserPermissions()
              };
    if(typeof(entitlments.permissions)==="string"){
      entitlments.permissions = JSON.parse(entitlments.permissions);
    }
     var navManager = applicationManager.getNavigationManager();
    
    var userPermissionsList = applicationManager.getConfigurationManager().getUserPermissions();
            var userPermissions = entitlments.permissions;
            var accountLevelPerm = [];
            if (this.selectedAccount.hasOwnProperty("actions")) {
                accountLevelPerm = this.selectedAccount.actions;
            }
            var permissionList = ["CLOSE_ACCOUNT-CREATE"];
            for (var i = 0; i < permissionList.length; i++) {
                if (!accountLevelPerm.includes(permissionList[i])) {
                    const index = userPermissions.indexOf(permissionList[i]);
                    if (index > -1) {
                        userPermissions.splice(index,1);
                    }
                }
            }
         entitlments.permissions = userPermissions;
    var navManager = applicationManager.getNavigationManager();
    this.selectedAccount  = navManager.getCustomInfo("selectedAccount");
//     if(!kony.sdk.isNullOrUndefined(this.selectedAccount)){
//    if(!kony.sdk.isNullOrUndefined(this.selectedAccount.isSweepCreated)){
//       if(this.selectedAccount.isSweepCreated){
//          entitlments.permissions.push("SweepView");
//       }else{
//         entitlments.permissions.push("SweepCreate");
//       }
//     }
//     if(!kony.sdk.isNullOrUndefined(this.selectedAccount.accountStatus) && this.selectedAccount.accountStatus == "ACTIVE"){
//       entitlments.permissions.push("IS_ACTIVE");
//     }}
      scope.view.quicklinksNative.setParentScopeAndEntitlements(scope, entitlments);
    		scope.view.quicklinksNative.getActionEntitlement = scope.getActionEntitlement;
    		scope.view.quicklinksNative.setContext(params);
  },
    getActionEntitlement: function(link) {
      var navManager = applicationManager.getNavigationManager();
	  var configManager = applicationManager.getConfigurationManager();
      var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
      var accountID = (accountsDetails.accountID)?accountsDetails.accountID:accountsDetails.selectedAccountData.accountID;
   //   var isBusinessAccount = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule").presentationController.fetchIsBusinessAccount(accountID);
       var isBusinessAccount = accountsDetails.isBusinessAccount;
    /*  if(link.action == "navigateToSavingsPot" && (isBusinessAccount === "false" || isBusinessAccount === null || isBusinessAccount === undefined))
        return true;
      else
        return false;*/
	
	  switch (link.action){
		case "navigateToSavingsPot":
			if (isBusinessAccount === "false" || isBusinessAccount === null || isBusinessAccount === undefined)
				return true;
			else 
				return false;
			break;
		case "navigateToRequestChequeBook":
			if (configManager.checkAccountAction(accountID, "CHEQUE_BOOK_REQUEST_CREATE"))
				return true;
			else
				return false;
			break;
		default:
			return false;
			break;
	  }
    },
    frmAccountDetailsPreshow: function() {
      var self = this;
      this.serviceSuccess=0;
      this.view.flxMainContainer.skin = "slFSboxmb";
              //       this.view.flxSearch.isVisible =true;
              //this.view.flxContainer.isVisible =true;
              //       this.view.tbxSearch.setFocus(false);
              //       this.view.customSearchbox.tbxSearch.text = "";
              //       this.view.tbxSearch.text = "";
              //       this.view.flxBalance.isVisible = true;
              //       this.view.segTransactions.isVisible = true;
              //       this.view.flxNoTransactions.isVisible = false;
              //       this.view.lblDueDate.setVisibility(true);
              //       this.view.lblTotalOverdue.setVisibility(true);
              //       this.view.lblPendingDeposits.text = "";
              //       this.view.lblPendingWithdrawals.text = "";
              //       self.enableBackgroundonCloseAdditionalOptions();
      // this.setFooter();
       this.view.flxAccountClosurePopup.setVisibility(false);
       this.view.flxLoadingIndicator.setVisibility(false);
	  
      var navManager=applicationManager.getNavigationManager();
      if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.flxHeader.isVisible = true;
                  this.view.flxMainContainer.top = "7%";
        this.view.flxFooter.isVisible = false;
		// Footer Menu - set items and hide hamburger
		this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
		this.view.customHeader.flxBack.isVisible = true;
              } else {
        this.view.flxHeader.isVisible = false;
        this.view.flxFooter.isVisible = true;
                  this.view.flxMainContainer.top = "0%";
                  this.view.title = "";
              }
              if((!kony.sdk.isNullOrUndefined(this.view["flxAdditionalLinks"])) && this.view["flxAdditionalLinks"] !== "") {
                var form = kony.application.getCurrentForm();
                form.remove("flxAdditionalLinks");
      }
      this.view.btnChatbot.onClick = function(){
        var chatBotMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ChatBotModule");
        chatBotMode.presentationController.handleFirstTimeOpen();
      };
              this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.showcardlessPopUp();
      var configManager = applicationManager.getConfigurationManager();
              /*
      this.hasCreateStopChequePerm = configManager.checkUserPermission("STOP_PAYMENT_REQUEST_CREATE");
      this.hasCreateChequeRequestPerm = configManager.checkUserPermission("CHEQUE_BOOK_REQUEST_CREATE");
      this.hasViewChequesFeat = configManager.checkUserFeature("VIEW_CHEQUES");
      var navManager = applicationManager.getNavigationManager();
      var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
      if(accountsDetails.res!==undefined&&accountsDetails.res!==null)
      {
        if(accountsDetails.type==="error")
          this.showErrorPopup(accountsDetails.res);
        else
          this.showSuccessPopup(accountsDetails.res,accountsDetails.typeOfTransaction);
      }
//       accountsDetails.res=null;
//       navManager.setCustomInfo("frmAccountDetails",accountsDetails);
      var type = accountsDetails.selectedAccountData["type"];
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(accountsDetails.selectedAccountData["externalIndicator"]=="true"){
        var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
        var targetDate = CommonUtilities.getDateAndTime(accountsDetails.selectedAccountData["expiresAt"]);
        var expireDate = (targetDate.split(","))[0];
        var today = kony.os.date(dateFormat);
        var todayDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(today, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
        var targetDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(expireDate, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
        var difference=targetDateObj-todayDateObj;
        var count= Math.ceil(difference/ (1000 * 60 * 60 * 24));
        MyAccObj.Count= count;
        MyAccObj.AlertDays= accountsDetails.selectedAccountData["connectionAlertDays"];
        if (MyAccObj.Count <= 0) {
          this.view.flxConsent.setVisibility(true);
          this.view.imgSym.src = "alert_2.png";
          this.view.lblWarning.text= "Your connection has expired. \n Tap here to renew it."; 
          this.view.lblWarning.skin= "sknlblFF5D6E";
        } 
        else if (MyAccObj.Count <= MyAccObj.AlertDays ) {
          this.view.flxConsent.setVisibility(true);
          this.view.imgSym.src = "infoappbar.png";
          this.view.lblWarning.text= "Your connection has " + MyAccObj.Count + " days remaining. \n Tap here to renew it."; 
          this.view.lblWarning.skin= "skinLblSSPRegular4176A422px";
        }
        else{
          this.view.flxConsent.setVisibility(true);
          this.view.imgSym.setVisibility(false);
          this.view.lblWarning.text= "Your connection has " + MyAccObj.Count + " days remaining. \n Tap here to renew it."; 
          this.view.lblWarning.skin= "skinLblSSPRegular4176A422px";
        }
        this.view.flxBank.setVisibility(true);
        this.view.flxBankValue.text= accountsDetails.selectedAccountData["bankName"];
      }
      this.view.customSearchbox.tbxSearch.placeholder =kony.i18n.getLocalizedString("kony.mb.accdetails.searchTransactions");
      var MenuHandler =  applicationManager.getMenuHandler();
      MenuHandler.setUpHamburgerForForm(this,configManager.constants.MENUACCOUNTS);
      this.view.customHeader.imgBack.src = "backbutton.png";
      if (type.toLowerCase().trim() === "internal") {
        this.view.flxAdvSearch.isVisible = true;
        this.view.imgAdvSearch.isVisible = true;
        this.view.customHeader.imgSearch.isVisible = true;
        this.view.flxOptions.isVisible = true;
        this.setFlxOptionsBasedOnType(accountsDetails.selectedAccountData["accountType"]);
        this.setSegmentData();
        this.setBalanceData();
      } else {
        this.view.customHeader.imgSearch.isVisible = true;
        this.view.flxAdvSearch.isVisible = false;
        this.view.imgAdvSearch.isVisible = false;
        this.view.flxOptions.isVisible = false;
        this.setTransactionsDataforAggregated();
      }
      if ( kony.sdk.isNullOrUndefined(accountsDetails.selectedAccountData.externalIndicator) === false && accountsDetails.selectedAccountData.externalIndicator==="true")
        this.view.flxOptions.isVisible = false;
      this.view.flxHeaderSearchbox.setVisibility(false);
      // this.view.flxMainContainer.onScrolling = this.flxMainContainerOnScrolling;
      // this.view.segTransactions.onTouchEnd = this.segTransactionsOnTouchEnd;
      this.view.tbxSearch.onTouchEnd = this.flxSearchOnTouchEnd;
      //this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.customSearchbox.btnCancel.onClick = this.btnCancelOnClick;
      //   this.view.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
      //this.view.tbxSearch.text="";
      //     if (this.objRec.view === "familyCheckingAcc") {
      //       //family chekcing account view
      //       this.createViewForFamilyCheckingAccount();
      //     }
      //     if (this.objRec.view === "creditCard") {
      //       // credit card view
      //       this.createViewForCreditCard();
      //     }
      //     if (this.objRec.view === "homeLoanAcc") {
      //       // home loan account view
      //       this.createViewForHomeLoanAccount();
      //     }
      //     if (this.objRec.view === "depositAccount") {
      //       //deposit account view
      //       this.createViewForDepositAccount();
      //     }
      this.view.segTransactions.onRowClick = this.segTransactionsOnRowClick;
      this.view.customHeader.flxSearch.onClick = function() {
        var navManager = applicationManager.getNavigationManager();
        var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
        var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
        if(String(accountsDetails.selectedAccountData.type).toLowerCase().trim() === "external") {
          accountModule.presentationController.fetchInfoForExternalBankAccount();
        } else {
          navManager.setCustomInfo("frmAccountInfo", accountsDetails);
          accountModule.presentationController.commonFunctionForNavigation("frmAccountInfo");
        }
      };
      var confManager = applicationManager.getConfigurationManager();
      var isBusinessUser = confManager.isCombinedUser === "true" || confManager.isSMEUser === "true";

      if(isBusinessUser) {
        this.view.btnStatements.setVisibility(confManager.checkUserPermission("MANAGE_E_STATEMENTS"));
        this.view.flxOptions.forceLayout();
      } */
//               }
       if (applicationManager.getPresentationFormUtility().getDeviceName() == "iPhone") {
      var MenuHandler =  applicationManager.getMenuHandler();
      MenuHandler.setUpHamburgerForForm(this,configManager.constants.MENUACCOUNTS);
       }
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      navManager.setEntryPoint("accountClosureMovement", "frmAccountDetails");
     // applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    showcardlessPopUp:function(){
//       var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessModule");
//       if(cardlessModule.presentationController.qrSuccessFlag){
//         var transactionID =  cardlessModule.presentationController.getTransactionId();
//         applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardLess.transactionMessage")+transactionID);
//         cardlessModule.presentationController.setTransactionId();
//         cardlessModule.presentationController.qrSuccessFlag =false;
//       }
    },
    setFlxOptionsBasedOnType:function(accountType)
  {
     var navManager = applicationManager.getNavigationManager();
     var configManager = applicationManager.getConfigurationManager();     
     var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
     var viewGoalPermission  = configManager.checkUserPermission("GOAL_POT_VIEW");
     var viewBudgetPermission  = configManager.checkUserPermission("BUDGET_POT_VIEW");
       
    if((viewGoalPermission || viewBudgetPermission) && (accountsDetails.selectedAccountData.isBusinessAccount === null ||accountsDetails.selectedAccountData.isBusinessAccount === undefined||accountsDetails.selectedAccountData.isBusinessAccount === "false")){
    switch(accountType)
    {
      case "Checking": this.savingsPotOptions();
        break;
      case "Savings":this.savingsPotOptions();
        break;
      case "Deposit":this.depositRelatedOptions();
        break;
      case "CreditCard" :this.creditCardRelatedOptions();
        break;
      case "Loan" :this.loanRelatedOptions();
        break;
    }
    } else {
    switch(accountType)
    {
      case "Checking": this.checkingRelatedOptions();
        break;
      case "Savings":this.commonOptions();
        break;
      case "Deposit":this.depositRelatedOptions();
        break;
      case "CreditCard" :this.creditCardRelatedOptions();
        break;
      case "Loan" :this.loanRelatedOptions();
        break;
    }
   }
  },
  savingsPotOptions:function()
  {
    var configManager = applicationManager.getConfigurationManager();
    configManager.getDisputeConfigurations();
    this.view.btnWithdrawCash.text= "My Savings Pot";  
              this.view.btnWithdrawCash.onClick = this.onClickSavingsPot;
          },

          onClickSavingsPot: function() {
    var navManager = applicationManager.getNavigationManager();
      var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
    accountsDetails.fundingAccountId= accountsDetails.selectedAccountData.accountID;
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "SavingsPotModule", "appName": "SavingsPotMA"});
       SavingsPotMod.presentationController.navToMySavingsPot(accountsDetails);
  },
  commonOptions:function()
  {
    this.view.btnWithdrawCash.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.withdrawCash");
    this.view.btnWithdrawCash.onClick=function()
    {
      var navManager = applicationManager.getNavigationManager();
      var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
      var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessModule");
      cardlessModule.presentationController.clearTransactionObject();
      cardlessModule.presentationController.navigateToCashRecipientForm(accountsDetails.selectedAccountData);
      //cardlessModule.presentationController.navigateToQRCashWithdrawForm(accountsDetails.selectedAccountData);
    };
    
  },
  depositRelatedOptions:function()
  {
    this.view.btnWithdrawCash.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.NEWDEPOSIT");
              this.view.btnWithdrawCash.onClick = this.onClickNewDeposit;
          },
          onClickNewDeposit: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.setEntryPoint("Deposit","frmAccountDetails");
      var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
      var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CheckDepositModule");
      checkDepositModule.presentationController.navigateFromAccountDetails(accountsDetails.selectedAccountData);
  },
  checkingRelatedOptions: function () {
    this.view.btnWithdrawCash.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.MakeTransfer");
    var cm = applicationManager.getConfigurationManager();
    var navManager = applicationManager.getNavigationManager();
    if (cm.isFastTransfersFlowEnabled()) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.view.btnWithdrawCash.onClick = function () {
        var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementModule");
        var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
        navManager.setEntryPoint("centralmoneymovement", "frmAccountDetails");
        moneyMovementModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
        moneyMovementModule.setTransferFromAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
      };
    }
    else {
      applicationManager.getPresentationUtility().showLoadingScreen();
      if (cm.getDeploymentGeography() === "EUROPE") {
        this.view.btnWithdrawCash.onClick = function () {
          var transferModule = applicationManager.getModulesPresentationController("TransferModule");
          var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
          navManager.setEntryPoint("europeTransferFlow", "frmAccountDetails");
          transferModule.setEuropeFlowType("INTERNAL");
          transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          transferModule.setTransferFromAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
        };
      }
      else {
        this.view.btnWithdrawCash.onClick = function () {
          var navigateToForm = navManager.setEntryPoint("makeatransfer", "frmAccountDetails");
          var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
          var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
          transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          transferModulePresentationController.navigateToTransfersChecking(accountsDetails.selectedAccountData);
        };
      }
    }
     
  },
  creditCardRelatedOptions:function()
  {
    this.view.btnWithdrawCash.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.MAKEAPAYMENT");
    var cm=applicationManager.getConfigurationManager();
    var navManager = applicationManager.getNavigationManager();
    if(cm.isFastTransfersFlowEnabled()){
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.view.btnWithdrawCash.onClick=function()
      {
        var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementModule");
        var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
        navManager.setEntryPoint("centralmoneymovement","frmAccountDetails");
        moneyMovementModule.transactionMode=  applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
        moneyMovementModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
      };
    }
    else {
      applicationManager.getPresentationUtility().showLoadingScreen();
      if (cm.getDeploymentGeography() === "EUROPE") {
        this.view.btnWithdrawCash.onClick = function() {
          var transferModule = applicationManager.getModulesPresentationController("TransferModule");
          var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
          navManager.setEntryPoint("europeTransferFlow","frmAccountDetails");
          transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          transferModule.setEuropeFlowType("INTERNAL");
          transferModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
        }
      }
      else {
        this.view.btnWithdrawCash.onClick = function () {
          var navigateToForm = navManager.setEntryPoint("makeatransfer", "frmAccountDetails");
          var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
          var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
          transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          transferModulePresentationController.navigateToTransfersFromDetails(accountsDetails.selectedAccountData);
        }
      }
    }
  },
          onClickCCMakePayment: function() {
              var cm = applicationManager.getConfigurationManager();
              var navManager = applicationManager.getNavigationManager();
              if (cm.isFastTransfersFlowEnabled()) {
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementModule");
                  var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                  navManager.setEntryPoint("centralmoneymovement", "frmAccountDetails");
                  moneyMovementModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                  moneyMovementModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
              } else {
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  if (cm.getDeploymentGeography() === "EUROPE") {
                      var transferModule = applicationManager.getModulesPresentationController("TransferModule");
                      var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                      navManager.setEntryPoint("europeTransferFlow", "frmAccountDetails");
                      transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                      transferModule.setEuropeFlowType("INTERNAL");
                      transferModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
                  } else {
                      var navigateToForm = navManager.setEntryPoint("makeatransfer", "frmAccountDetails");
                      var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                      var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
                      transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                      transferModulePresentationController.navigateToTransfersFromDetails(accountsDetails.selectedAccountData);
                  }
              }
          },
          loanRelatedOptions: function() {
    this.view.btnWithdrawCash.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.PAYDUEAMOUNT");
    var cm=applicationManager.getConfigurationManager();
    var navManager = applicationManager.getNavigationManager();
    if(cm.isFastTransfersFlowEnabled()){
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.view.btnWithdrawCash.onClick=function()
      {
        var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementModule");
        var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
        navManager.setEntryPoint("centralmoneymovement","frmAccountDetails");
        moneyMovementModule.transactionMode=  applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
        moneyMovementModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
      };
    }
    else{
      applicationManager.getPresentationUtility().showLoadingScreen();
      if (cm.getDeploymentGeography() === "EUROPE") {
        this.view.btnWithdrawCash.onClick = function () {
          var transferModule = applicationManager.getModulesPresentationController("TransferModule");
          var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
          navManager.setEntryPoint("europeTransferFlow", "frmAccountDetails");
          transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          transferModule.setEuropeFlowType("INTERNAL");
          applicationManager.getPresentationUtility().showLoadingScreen();
          transferModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
        }
      }
      else {
        this.view.btnWithdrawCash.onClick = function () {
          var navigateToForm = navManager.setEntryPoint("makeatransfer", "frmAccountDetails");
          var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
          var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
          transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          transferModulePresentationController.navigateToTransfers(accountsDetails.selectedAccountData);
        }
      }
    }
  },

          onClickloanPayment: function() {
              var cm = applicationManager.getConfigurationManager();
              var navManager = applicationManager.getNavigationManager();
              if (cm.isFastTransfersFlowEnabled()) {
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementModule");
                  var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                  navManager.setEntryPoint("centralmoneymovement", "frmAccountDetails");
                  moneyMovementModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                  moneyMovementModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
              } else {
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  if (cm.getDeploymentGeography() === "EUROPE") {
                      var transferModule = applicationManager.getModulesPresentationController("TransferModule");
                      var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                      navManager.setEntryPoint("europeTransferFlow", "frmAccountDetails");
                      transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                      transferModule.setEuropeFlowType("INTERNAL");
                      applicationManager.getPresentationUtility().showLoadingScreen();
                      transferModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
                  } else {
                      var navigateToForm = navManager.setEntryPoint("makeatransfer", "frmAccountDetails");
                      var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                      var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
                      transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                      transferModulePresentationController.navigateToTransfers(accountsDetails.selectedAccountData);
                  }
              }
          },

          onClickMakeTransfer: function() {
              var navigateToForm = navManager.setEntryPoint("makeatransfer", "frmAccountDetails");
              var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
              var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
              transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
              transferModulePresentationController.navigateToTransfers(accountsDetails.selectedAccountData);
          },
  setTransactionsDataforAggregated: function() {
    var postedTransactionsdata = [],pendingTransactiondata = [];
    var navMan = applicationManager.getNavigationManager();
    var forUtility = applicationManager.getFormatUtilManager();
    var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
    var postedTransactions = accountsDetails.externalPostedTransactions;
    var pendingTransaction = accountsDetails.externalPendingTransactions;
    this.view.lblBalanceValue.text = accountsDetails.selectedAccountData["availableBalance"];
    this.view.lblCurrBalValue.text = accountsDetails.selectedAccountData["availableBalance"];
    this.view.customHeader.lblLocateUs.text = accountsDetails.selectedAccountData["nickName"];
    this.view.title = accountsDetails.selectedAccountData["nickName"];
    this.view.lblDueDate.text = "";
    this.view.lblTotalOverdue.text = "";
    this.view.segTransactions.widgetDataMap = {
      lblTransaction: "description",
      lblDate: "TransactionDate",
      lblTransactionAmount: "Amount",
      transactionId: "TransactionId",
      lblHeader: "lblHeader",
      flximgUp : "flximgUp"
    };
    if (pendingTransaction.length > 0 && postedTransactions.length > 0) {
      var data = [
        [{
          "lblHeader": "Pending Transactions",
          "flximgUp" : {isVisible : false}
        }, pendingTransaction],
        [{
          "lblHeader": "Posted Payments", /*"Posted Transactions"*/
          "flximgUp" : {isVisible : false}
        }, postedTransactions]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
      this.pendingaccounts = this.view.segTransactions.data[0][1];
      this.postedaccounts = this.view.segTransactions.data[1][1];
    } else if (pendingTransaction.length > 0) {
      var data = [
        [{
          "lblHeader": "Pending Transactions",
          "flximgUp" : {isVisible : false}
        }, pendingTransaction]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
      this.pendingaccounts = this.view.segTransactions.data[0][1];
      this.postedaccounts = [];
    } else if (postedTransactions.length > 0) {
      var data = [
        [{
          "lblHeader": "Posted Payments", /*"Posted Transactions"*/
          "flximgUp" : {isVisible : false}
        }, postedTransactions]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
      this.postedaccounts = this.view.segTransactions.data[0][1];
      this.pendingaccounts = [];
    } else {
      this.segmentData = [];
      this.pendingaccounts = [];
      this.postedaccounts = [];
      this.view.segTransactions.isVisible = false;
      this.view.flxNoTransactions.isVisible = true;
    }
  },
  setSegmentData: function() {
    var TransModPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransactionModule");
    var transactionData =  TransModPresentationController.presentationController.getBlockedFundsData();
    if(!kony.sdk.isNullOrUndefined(transactionData) && transactionData.isSearchResults === true){
      var blockedTransactions = transactionData.blockedTransactions;
      if(blockedTransactions.length === 0){
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
      }else{
        this.view.flxNoTransactions.setVisibility(false);
        this.view.segTransactions.setVisibility(true);  
        this.view.segTransactions.widgetDataMap = {
          lblDescription: "lockReason",
          lblBlockedAmount: "lockedAmount",
          lblReference: "transactionReference",
          template: "template",
          lblHeader: "lblHeader",
          flximgUp: "flximgUp"
        };
        var data = [
          [{
            "lblHeader":  kony.i18n.getLocalizedString("kony.mb.accdetails.blockedFunds"),    /*"Blocked Funds"*/
            "flximgUp" : {isVisible : false}
          }, blockedTransactions]
        ];
        this.segmentData = data;
        this.view.segTransactions.setData(data);
        this.blockedaccounts = this.view.segTransactions.data[0][1];
        this.postedaccounts = [];
        this.pendingaccounts = [];
      }
      transactionData.isSearchResults = false;
      TransModPresentationController.presentationController.setBlockedFundsData(transactionData);
    } else{
    var postedTransactionsdata = [],
        pendingTransactiondata = [];
    var navMan = applicationManager.getNavigationManager();
    // var configManager = applicationManager.getConfigurationManager();
    var forUtility = applicationManager.getFormatUtilManager();
    var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
    var accountsData = accountsDetails.selectedAccountData;
    var postedTransactions = accountsDetails.postedTransaction;
    var pendingTransaction = accountsDetails.pendingTransactions;
    var accountType = accountsData.accountType;
    var configManager = applicationManager.getConfigurationManager();
    var blockedFunds = [];
    if(accountType === configManager.constants.CHECKING ||accountType === configManager.constants.SAVINGS)
      blockedFunds = accountsDetails.blockedFunds;
    this.view.segTransactions.widgetDataMap = {
      lblTransaction: "description",
      lblDate: "scheduledDate",
      lblTransactionAmount: "amount",
      transactionId: "transactionId",
      lblDescription: "lockReason",
      lblBlockedAmount: "lockedAmount",
      lblReference: "transactionReference",
      template: "template",
      lblHeader: "lblHeader",
      flximgUp : "flximgUp",
      imgUpArrow : "imgUpArrow"
    };

    if (pendingTransaction.length > 0 && postedTransactions.length > 0 && blockedFunds.length > 0) {
      var data = [
        [{
          "lblHeader": kony.i18n.getLocalizedString("kony.mb.accdetails.pendingTransactions"),
          "flximgUp" : {isVisible : true},
          "imgUpArrow" :{src : "arrowdown.png"}
        }, pendingTransaction],
        [{
          "lblHeader": kony.i18n.getLocalizedString("kony.mb.accdetails.blockedFunds"), /*"Blocked Funds"*/
          "flximgUp" : {isVisible : true},
          "imgUpArrow" :{src : "arrowdown.png"}
        }, blockedFunds],
        [{
          "lblHeader":  kony.i18n.getLocalizedString("kony.mb.accdetails.postedTransactions"), /*"Posted Transactions"*/
          "flximgUp" : {isVisible : true},
          "imgUpArrow" :{src : "arrowdown.png"}
        }, postedTransactions]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
      this.pendingaccounts = this.view.segTransactions.data[0][1];
      this.blockedaccounts = this.view.segTransactions.data[1][1];
      this.postedaccounts = this.view.segTransactions.data[2][1];
    } else if (pendingTransaction.length > 0 && postedTransactions.length > 0) {
      var data = [
        [{
          "lblHeader": kony.i18n.getLocalizedString("kony.mb.accdetails.pendingTransactions"),
          "flximgUp" : {isVisible : true},
          "imgUpArrow" :{src : "arrowdown.png"}
        }, pendingTransaction],
        [{
          "lblHeader":  kony.i18n.getLocalizedString("kony.mb.accdetails.postedTransactions"), /*"Posted Transactions"*/
          "flximgUp" : {isVisible : true},
          "imgUpArrow" :{src : "arrowdown.png"}
        }, postedTransactions]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
      this.pendingaccounts = this.view.segTransactions.data[0][1];
      this.postedaccounts = this.view.segTransactions.data[1][1];
      this.blockedaccounts = [];
    } else if (postedTransactions.length > 0 && blockedFunds.length > 0 ) {
      var data = [
        [{
          "lblHeader": kony.i18n.getLocalizedString("kony.mb.accdetails.blockedFunds"), /*"Posted Transactions"*/
          "flximgUp" : {isVisible : true},
          "imgUpArrow" :{src : "arrowdown.png"}
        }, blockedFunds],
        [{
          "lblHeader":  kony.i18n.getLocalizedString("kony.mb.accdetails.postedTransactions"), /*"Posted Transactions"*/
          "flximgUp" : {isVisible : true},
          "imgUpArrow" :{src : "arrowdown.png"}
        }, postedTransactions]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
      this.blockedaccounts = this.view.segTransactions.data[0][1];
      this.postedaccounts = this.view.segTransactions.data[1][1];
      this.pendingaccounts = [];
    } else if (pendingTransaction.length > 0 && blockedFunds.length > 0) {
      var data = [
        [{
          "lblHeader": kony.i18n.getLocalizedString("kony.mb.accdetails.pendingTransactions"),
          "flximgUp" : {isVisible : true },
          "imgUpArrow" :{src : "arrowdown.png"}
       }, pendingTransaction],
        [{
          "lblHeader": kony.i18n.getLocalizedString("kony.mb.accdetails.blockedFunds"), /*"Blocked Funds"*/
          "flximgUp" : {isVisible : true},
          "imgUpArrow" :{src : "arrowdown.png"}
        }, blockedFunds]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
      this.pendingaccounts = this.view.segTransactions.data[0][1];
      this.blockedaccounts = this.view.segTransactions.data[1][1];
      this.postedaccounts = [];
    } else if (pendingTransaction.length > 0) {
      var data = [
        [{
          "lblHeader": kony.i18n.getLocalizedString("kony.mb.accdetails.pendingTransactions"),
          "flximgUp" : {isVisible : true},
          "imgUpArrow" :{src : "arrowdown.png"}
        }, pendingTransaction]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
      this.pendingaccounts = this.view.segTransactions.data[0][1];
      this.postedaccounts = [];
      this.blockedaccounts = [];
    } else if (postedTransactions.length > 0) {
      var data = [
        [{
          "lblHeader":  kony.i18n.getLocalizedString("kony.mb.accdetails.postedTransactions"), /*"Posted Transactions"*/
          "flximgUp" : {isVisible : true},
          "imgUpArrow" :{src : "arrowdown.png"}
        }, postedTransactions]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
      this.postedaccounts = this.view.segTransactions.data[0][1];
      this.pendingaccounts = [];
      this.blockedaccounts = [];
    } else if (blockedFunds.length > 0) {
      var data = [
        [{
          "lblHeader": kony.i18n.getLocalizedString("kony.mb.accdetails.blockedFunds"), /*"Blocked Funds"*/
          "flximgUp" : {isVisible : true},
          "imgUpArrow" :{src : "arrowdown.png"}
        }, blockedFunds]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
      this.blockedaccounts = this.view.segTransactions.data[0][1];
      this.postedaccounts = [];
      this.pendingaccounts = [];
    }else {
      this.segmentData = [];
      this.pendingaccounts = [];
      this.postedaccounts = [];
      this.blockedaccounts = [];
      this.view.segTransactions.isVisible = false;
      this.view.flxNoTransactions.isVisible = true;
    }
    }
  },
  setBalanceData: function() {
    var navMan = applicationManager.getNavigationManager();
    // var configManager = applicationManager.getConfigurationManager();
    var forUtility = applicationManager.getFormatUtilManager();
    var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
    var accountsData = accountsDetails.selectedAccountData;

    if(accountsData.nickName==undefined||accountsData.nickName==null||accountsData.nickName=="")
    {
      this.view.customHeader.lblLocateUs.text = accountsData.accountName;
      this.view.title = accountsData.accountName;
    }

    else
    {
      this.view.customHeader.lblLocateUs.text = accountsData.nickName;
      this.view.title = accountsData.nickName;
    }

    var configManager = applicationManager.getConfigurationManager();
    if (accountsData.accountType === configManager.constants.CHECKING ||accountsData.accountType === configManager.constants.SAVINGS) {
      this.view.lblAvailableBalance.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.AvailableBalance");
      this.view.lblCurrentBalance.text= "";
      this.view.lblBalanceValue.text = forUtility.formatAmountandAppendCurrencySymbol(accountsData.availableBalance,accountsData.currencyCode);
      this.view.lblCurrBalValue.text = "";
      if(accountsData.externalIndicator== "true"){
            this.view.lblCurrentBalance.text= "Current Balance";
            this.view.lblCurrBalValue.text = forUtility.formatAmountandAppendCurrencySymbol(accountsData.availableBalance,accountsData.currencyCode);
      }
      else{
        this.view.lblPendingDeposits.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingDeposits")+": "+forUtility.formatAmountandAppendCurrencySymbol(accountsData.pendingDeposit,accountsData.currencyCode);
      this.view.lblPendingWithdrawals.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingWithdrawals")+": "+forUtility.formatAmountandAppendCurrencySymbol(accountsData.pendingWithdrawal,accountsData.currencyCode);
         }
         this.view.lblDueDate.text = "";
         this.view.lblTotalOverdue.text = "";
        
    }
    if (accountsData.accountType === configManager.constants.CREDITCARD) {
      this.view.lblAvailableBalance.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.currBal");
      this.view.lblCurrentBalance.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.CurrentDue")+":";
      this.view.lblBalanceValue.text=forUtility.formatAmountandAppendCurrencySymbol(accountsData.outstandingBalance,accountsData.currencyCode);
      this.view.lblCurrBalValue.text=forUtility.formatAmountandAppendCurrencySymbol(accountsData.currentAmountDue,accountsData.currencyCode);
      var dateobj = forUtility.getDateObjectfromString(accountsData.dueDate, "YYYY-MM-DD");
      this.view.lblDueDate.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accountdetails.dueon") + ": " + forUtility.getFormatedDateString(dateobj, forUtility.getApplicationDateFormat());
      this.view.lblTotalOverdue.text = "";
    }
    if (accountsData.accountType === configManager.constants.LOAN||accountsData.accountType === configManager.constants.MORTGAGE) {
      this.view.lblAvailableBalance.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.outstandingBal");
      this.view.lblCurrentBalance.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.CurrentDue")+":";
      this.view.lblBalanceValue.text=forUtility.formatAmountandAppendCurrencySymbol(accountsData.outstandingBalance,accountsData.currencyCode);
      this.view.lblCurrBalValue.text=forUtility.formatAmountandAppendCurrencySymbol(accountsData.nextPaymentAmount,accountsData.currencyCode);
      var dateobj = forUtility.getDateObjectfromString(accountsData.nextPaymentDate, "YYYY-MM-DD");
      this.view.lblDueDate.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accountdetails.dueon") + ": " + forUtility.getFormatedDateString(dateobj, forUtility.getApplicationDateFormat());
      this.view.lblTotalOverdue.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Loans.TotalOverdue") + ": " + forUtility.formatAmountandAppendCurrencySymbol(accountsData.paymentDue,accountsData.currencyCode);
    }
    if (accountsData.accountType === configManager.constants.DEPOSIT) {
      this.view.lblAvailableBalance.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.CurrentBalance");
      this.view.lblCurrentBalance.text="";
      this.view.lblBalanceValue.text = forUtility.formatAmountandAppendCurrencySymbol(accountsData.currentBalance,accountsData.currencyCode);
      var dateobj = forUtility.getDateObjectfromString(accountsData.maturityDate, "YYYY-MM-DD");
      this.view.lblCurrBalValue.text="";
      this.view.lblDueDate.text = "";
      this.view.lblTotalOverdue.text = "";
      this.view.lblPendingDeposits.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.maturityDate")+": "+forUtility.getFormatedDateString(dateobj, forUtility.getApplicationDateFormat());
    }
  },
  tbxSearchOnTextChange: function() {
    var navObj = applicationManager.getNavigationManager();
    var searchtext = this.view.customSearchbox.tbxSearch.text.toLowerCase();
    if (searchtext) {
      var data=[],headers=[];
      headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingTransactions"));
      headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.postedTransactions"));
      headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.blockedFunds"));
      data.push(this.pendingaccounts);
      data.push(this.postedaccounts);
      data.push(this.blockedaccounts);
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
      this.view.flxBalance.isVisible = false;
      this.view.flxOptions.isVisible = false;
      //this.view.segTransactions.removeAll();
      var searchobj = applicationManager.getDataProcessorUtility().commonSectionSegmentSearch("description",searchtext,data,headers);
      if (searchobj.length > 0) {
        this.view.segTransactions.setData(searchobj);
      } else {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
      }
    } else {
      if (this.segmentData.length > 0) {
        this.view.segTransactions.setData(this.segmentData);
        this.view.segTransactions.isVisible = true;
        this.view.flxNoTransactions.isVisible = false;
        this.view.flxBalance.isVisible = false;
        //      this.view.flxOptions.isVisible = false;
        this.view.quicklinksNative.isVisible = false;
      } else {
        this.view.flxBalance.isVisible = false;
        //     this.view.flxOptions.isVisible = false;
        this.view.quicklinksNative.isVisible = false;
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
      }
    }
  },
  //  setFooter: function() {
  //         this.view.customFooter.lblAccounts.skin = "sknLbl424242SSP20px";
  //         this.view.customFooter.flxAccSelect.setVisibility(true);
  //         this.view.customFooter.lblTransfer.skin = "sknlbl727272SSP20px";
  //         this.view.customFooter.flxTransferSel.setVisibility(false);
  //         this.view.customFooter.lblBillPay.skin = "sknlbl727272SSP20px";
  //         this.view.customFooter.flxBillSelected.setVisibility(false);
  //         this.view.customFooter.lblMore.skin = "sknlbl727272SSP20px";
  //         this.view.customFooter.flxMoreSelect.setVisibility(false);
  //     },
  flxMainContainerOnScrolling: function() {
    if (this.view.flxMainContainer.contentOffsetMeasured.y >= 165) {
      //alert("fixed");
      this.view.segTransactions.height = "100%";
      this.view.flxMainContainer.forceLayout();
    }
  },
  segTransactionsOnTouchEnd: function() {
    if ((this.view.segTransactions.height !== 'preferred')&&(this.view.flxHeaderSearchbox.isVisible===false)) {
      if (this.view.segTransactions.contentOffsetMeasured.y <= 1) {
        this.view.segTransactions.height = "preferred";
        this.view.flxMainContainer.forceLayout();
      }
    }
  },
  createViewForFamilyCheckingAccount: function() {
    this.view.customHeader.lblLocateUs.text = "FAMILY CHECKING ACCOUNT";
    this.view.lblDueDate.setVisibility(false);
    this.view.lblTotalOverdue.setVisibility(false);
    this.view.btnWithdrawCash.text = kony.i18n.getLocalizedString("kony.mb.accdetails.withdrawCash");
    this.view.lblAvailableBalance.text = kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
  },
  createViewForCreditCard: function() {
    this.view.customHeader.lblLocateUs.text = "MY CREDIT CARD";
    this.view.lblDueDate.setVisibility(true);
    this.view.lblTotalOverdue.setVisibility(false);
    this.view.btnWithdrawCash.text = kony.i18n.getLocalizedString("kony.mb.accdetails.makeAPayment");
    this.view.lblAvailableBalance.text = kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
  },
  createViewForHomeLoanAccount: function() {
    this.view.customHeader.lblLocateUs.text = "HOME LOAN ACCOUNT";
    this.view.lblDueDate.setVisibility(true);
    this.view.lblTotalOverdue.setVisibility(true);
    this.view.btnWithdrawCash.text = kony.i18n.getLocalizedString("kony.mb.accdetails.payDueAmount");
    this.view.lblAvailableBalance.text = kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingPrincipalBal");
  },
  createViewForDepositAccount: function() {
    this.view.customHeader.lblLocateUs.text = "MY DEPOSIT ACCOUNT";
    this.view.lblDueDate.setVisibility(false);
    this.view.lblTotalOverdue.setVisibility(false);
    this.view.lblCurrentBalance.text = kony.i18n.getLocalizedString("kony.mb.accdetails.maturityDate")+":";
    this.view.lblCurrBalValue.text = "12/06/2017";
    this.view.btnWithdrawCash.text = kony.i18n.getLocalizedString("kony.mb.accdetails.newDeposit");
    this.view.lblAvailableBalance.text = kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
  },
  segTransactionsOnRowClick: function() {
    var navMan = applicationManager.getNavigationManager();
    var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
    var type = accountsDetails.selectedAccountData["type"];
    if (type.toLowerCase().trim() === "external") {
      return;
    }
    var selectedSectionIndex = Math.floor(this.view.segTransactions.selectedRowIndex[0]);
    var selectedRowIndex = Math.floor(this.view.segTransactions.selectedRowIndex[1]);
    var transactionData = this.view.segTransactions.data[selectedSectionIndex][1][selectedRowIndex];
    var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    accMod.presentationController.setEntryPoints(transactionData.transactionType);
    if(applicationManager.getConfigurationManager().isFastTransfersFlowEnabled()&&(transactionData.transactionType == "P2P"||transactionData.transactionType == "InternalTransfer"||transactionData.transactionType == "ExternalTransfer")){
      navMan.setCustomInfo("frmMMTransactionDetails", transactionData);
      navMan.setEntryPoint("frmMMTransactionDetails","Accounts");
      accMod.presentationController.commonFunctionForNavigation("frmMMTransactionDetails");
    }
    else{
      if (applicationManager.getConfigurationManager().getDeploymentGeography() === "EUROPE" && (transactionData.transactionType == "P2P"||transactionData.transactionType == "InternalTransfer"||transactionData.transactionType == "ExternalTransfer")) {
        navMan.setCustomInfo("frmEuropeTransactionDetails", transactionData);
        navMan.setEntryPoint("frmEuropeTransactionDetails", "Accounts");
        accMod.presentationController.commonFunctionForNavigation("frmEuropeTransactionDetails");
      }
      else {
        navMan.setCustomInfo("frmAccountsTransactionDetails", transactionData);
        navMan.setEntryPoint("frmTransactionDetails","Accounts");
        //navMan.setEntryPoint("makeatransfer","frmAccountDetails");
        accMod.presentationController.commonFunctionForNavigation("frmAccountsTransactionDetails");
      }  
    }
  },
  flxSearchOnTouchEnd: function() {
    var scope = this;
    this.view.flxMainContainer.skin = "slFSbox0gff85612494c44Tab";
    this.view.flxHeaderSearchbox.setVisibility(true);
    this.view.flxHeader.setVisibility(false);
    this.view.flxSearch.setVisibility(false);
    this.view.flxContainer.setVisibility(false);
    this.view.flxShadow.setVisibility(false);
    this.view.flxBalance.setVisibility(false);
    this.view.flxSeperator2.setVisibility(false);
    //   this.view.flxOptions.setVisibility(false);
    this.view.quicklinksNative.isVisible = false;
    this.view.segTransactions.height = "100%";
    this.view.flxNoTransactions.height="100%";
    this.view.flxMainContainer.top="40dp";
    // this.view.customSearchbox.tbxSearch.setFocus(true);
    this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
    kony.timer.schedule("timerId", function() {
      scope.view.customSearchbox.tbxSearch.setFocus(true);
    }, 0.1, false);
    this.view.flxMainContainer.forceLayout();
  },
  btnCancelOnClick: function() {
    this.view.flxMainContainer.skin = "slFSboxmb";
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxMainContainer.top="56dp";
      this.view.flxHeader.isVisible = true;
      this.view.flxSearch.setVisibility(true);
      this.view.flxContainer.setVisibility(true);
      this.view.flxHeaderSearchbox.setVisibility(false);
      this.view.flxMainContainer.bottom="0dp";
    } else {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top="-1dp";
      this.view.flxMainContainer.bottom="60dp";
      this.view.flxSearch.setVisibility(true);
      this.view.flxContainer.setVisibility(true);
      this.view.flxHeaderSearchbox.setVisibility(false);
    }
    this.view.flxNoTransactions.height = "400dp";
    kony.timer.schedule("timerId1", function() {
      this.view.tbxSearch.setFocus(false);
    }, 0.1, false);
    this.view.flxShadow.setVisibility(false);
    this.view.flxBalance.setVisibility(true);
    this.view.flxSeperator2.setVisibility(true);
    this.view.customSearchbox.tbxSearch.text="";
    this.view.tbxSearch.text="";
    var navManager = applicationManager.getNavigationManager();
    var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
    var type = accountsDetails.selectedAccountData["type"];
    if (type.toLowerCase().trim() === "internal") {
        //    this.view.flxOptions.isVisible = true;
               this.view.quicklinksNative.isVisible = true;
    }
    if (kony.sdk.isNullOrUndefined(accountsDetails.selectedAccountData.externalIndicator) === false && accountsDetails.selectedAccountData.externalIndicator == "true")
      //     this.view.flxOptions.isVisible = false;
      this.view.quicklinksNative.isVisible = false;
    this.view.segTransactions.height = "preferred";
    if (this.segmentData.length > 0) {
      this.view.segTransactions.setData(this.segmentData);
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
      this.view.flxBalance.isVisible = true;
    } else {
      this.view.flxBalance.isVisible = true;
      this.view.segTransactions.isVisible = false;
      this.view.flxNoTransactions.isVisible = true;
    }
    this.view.flxMainContainer.forceLayout();
  },
  flxBackOnClick: function() {
    var navManager = applicationManager.getNavigationManager();
    // navManager.navigateTo({
    //     "appName": "HomepageMA",
    //     "friendlyName": "AccountsUIModule/frmUnifiedDashboard"
    // });
    var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName": "AccountsUIModule"});
   accMod.presentationController.showDashboard();
    //navMan.goBack();
  },
  getStatements: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    var navMan = applicationManager.getNavigationManager();
    var accountsDetails = navMan.getCustomInfo("frmAccountDetails");       
    accMod.presentationController.getAccountStataments(accountsDetails.selectedAccountData.accountID,accountsDetails.selectedAccountData);
  },
  navigateToAccountClosure : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"friendlyName": "AccountUIModule/frmAccountClosure","appName": "ArrangementsMA"});
  },
  accountClosurePopup : function(){
    var scope=this;
    var accClosureName = "";
    this.view.quicklinksNative.resetAdditionalLinks();
    var navManager = applicationManager.getNavigationManager();
    try{
      var accountDet = navManager.getCustomInfo("CloseAccountPopup");
      var accNo = accountDet.accountID;
      accNo = (accNo.slice(accNo.length - 4));
      accClosureName = accountDet.accountName+' - '+accNo;
  //  this.view.lblSTDinfo.text='Are you sure you want to proceed with the process of closing the '+'\''+accClosureName+'\''+' ?';
    }catch(e){
      
    }
   // this.view.flxAccountClosurePopup.setVisibility(true);
    var closureMsg = 'Are you sure you want to proceed with the process of closing the '+'\''+accClosureName+'\''+' ?';
    var basicConfig = {message: closureMsg,
                       alertTitle:"Close Account",
                       alertIcon:null,
                       alertType: constants.ALERT_TYPE_CONFIRMATION,
                       yesLabel:"Proceed",
                       noLabel:"Cancel", 
                       alertHandler: this.confirmAccClosure
                       };
    var pspConfig = {"iconPosition" : constants.ALERT_CONTENT_ALIGN_CENTER,
                    "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER};
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
   //  this.view.flxPopupContainer.setVisibility(true);
     var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
      accMod.presentationController.getTandCData();
  /*  this.view.btnProceed.onClick=function(){
      scope.view.flxPopupContainer.setVisibility(false);
      //scope.view.flxAccountClosurePopup.setVisibility(false);
      scope.view.flxLoadingIndicator.setVisibility(true);
      var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
      accMod.presentationController.validateClosure(scope.accountId);
      
    };
    this.view.btnCancel.onClick=function(){
      scope.view.flxAccountClosurePopup.setVisibility(false);
    };*/
  },

    confirmAccClosure : function(response){
      if(response === true)
      {
         this.view.flxLoadingIndicator.setVisibility(true);
         var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
         accMod.presentationController.validateClosure(this.accountId);
      }else{
       // scope.view.flxAccountClosurePopup.setVisibility(false);
      }
    },
    
    navigateToAdvanceSearch: function() {
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    accountMod.presentationController.commonFunctionForNavigation("frmAdvanceSearch");
    //custom metric API to generate Reports
    KNYMetricsService.sendCustomMetrics("frmAccountDetails", {"Search Transactions":"Initial Search"});
  },
  gotoAccountInfo: function(){
              var scope = this;
              var contextData = scope.view.accountSummaryNative.getContext();
    var navManager = applicationManager.getNavigationManager();
    var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
    var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
              navManager.setCustomInfo("frmAccountInfo", contextData);
              accountModule.presentationController.commonFunctionForNavigation("frmAccountInfo");

              //     if(String(accountsDetails.selectedAccountData.type).toLowerCase().trim() === "external") {
              //       accountModule.presentationController.fetchInfoForExternalBankAccount();
              //     } else {
              //       var nav = new kony.mvc.Navigation("frmAccountInfo");
              //       nav.navigate(contextData);
              //       navManager.setCustomInfo("frmAccountInfo", accountsDetails);
              //       accountModule.presentationController.commonFunctionForNavigation("frmAccountInfo");
              //     }
  },
  appendEmptySection: function(dataParam){
    var data = dataParam;
    var emptySection = [
      {
        "template":"flxEmptyHeader",
      },
      [
        {
          "template":"flxAccountDetailsEmptyRow"
        }
      ]
    ];
    data.unshift(emptySection);
    return data;
  },
  showSuccessPopup : function(refID,type){
    // TO DO i18n's
    var msg;
    if(type==="delete")
    {
      msg = "Transaction was cancelled successfully with reference ID : " + (refID.transactionId||refID.refernceId);
    }
    else{
      if(refID.referenceId)
        msg = "Transaction was done successfully with transaction ID : "+ refID.referenceId;
      else
        msg = "Transaction was edited successfully with reference ID : " + refID.transactionId;
    }
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg);
  },
  showErrorPopup: function(err){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,JSON.stringify(err));
  },
  navigateToManageCards:function()
    {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
      var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
      var accountsData = accountsDetails.selectedAccountData.Account_id;
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule","appName":"CardsMA"});
      manageCardsModule.presentationController.filterCards(accountsData);
      
    },
    sectionClicked :function(sectionIndex, context){
      var sectionIndex = context.sectionIndex;
      var data = this.view.segTransactions.data;
      if(data[sectionIndex] !== null){
      var selectedHeaderData = data[sectionIndex][0];   
      if(selectedHeaderData["imgUpArrow"].src==="arrowdown.png"){
        selectedHeaderData["imgUpArrow"].src="arrowup.png";
        if(data[sectionIndex][1] !== null)
          data[sectionIndex][1] = [];
        this.view.segTransactions.setData(data);
      }else{
        selectedHeaderData["imgUpArrow"].src="arrowdown.png";
        if(data[sectionIndex][1] !== null)
          data[sectionIndex][1] = this.segmentData[sectionIndex][1];
        this.view.segTransactions.setData(data);
      }
    }
    }
  };
});
