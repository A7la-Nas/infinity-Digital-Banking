define(['CampaignUtility'], function(CampaignUtility){
  return{
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxHeader.isVisible = false;
        }
    var navMan=applicationManager.getNavigationManager();
    var entitlements=navMan.getCustomInfo("frmManageRecipientType");
    if(entitlements){
      this.setSegmentMMData();
    }else{
      this.setSegmentData();
    }
        this.initActions();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
      let scopeObj = this;
      function campaignPopUpSuccess(response){
        CampaignUtility.showCampaign(response, scopeObj.view);
      }
      function campaignPopUpError(response){
        kony.print(response, "Campaign Not Found!");
      }
      CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
    },
    initActions: function() {
      var scope = this;
      this.view.customHeader.flxBack.onClick = this.goBack;
        this.view.segRecipientType.onRowClick = function() {
          var navMan = applicationManager.getNavigationManager();
          var entitlements=navMan.getCustomInfo("frmManageRecipientType");
    	  if(entitlements){
            scope.segmentMMRowClick();
          }
          else{
            scope.segmentRowClick();
          }
        };
    },
    goBack: function(){
       var navMan=applicationManager.getNavigationManager();
        var entrypoint = navMan.getEntryPoint("centralmoneymovement");
        if(entrypoint === "frmManageRecipientType"){
           var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
           accountMod.presentationController.showDashboard();
           navMan.setEntryPoint("startFromFlow",null);
        }
        else
           navMan.goBack();
    },
    segmentRowClick: function() {
      var index = this.view.segRecipientType.data[this.view.segRecipientType.selectedIndex[0]][1][this.view.segRecipientType.selectedIndex[1]].lblTransactionMode;
      var type = {
        "Manage Kony DBX Recipients": function() {
          applicationManager.getPresentationUtility().showLoadingScreen();
          var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
          transferModulePresentationController.fetchSameBankRecepients();
          transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
          transferModulePresentationController.setFlowType("SameBankRecipients");
          transferModulePresentationController.fetchTransferLimits(transferModulePresentationController.getActionByType(transferModulePresentationController.transactionMode));
        },
        "Manage Other Bank Recipients": function() {
          applicationManager.getPresentationUtility().showLoadingScreen();
          var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
          transferModulePresentationController.fetchOtherBankRecepients();
          transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
          transferModulePresentationController.setFlowType("OtherBankRecipients");
          transferModulePresentationController.fetchTransferLimits(transferModulePresentationController.getActionByType(transferModulePresentationController.transactionMode));
        },
        "Manage Recipients": function() {
          applicationManager.getPresentationUtility().showLoadingScreen();
          var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
          p2pMod.presentationController.setFlowType("P2P");
          var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
          transferModulePresentationController.transactionMode = "PayAPerson";
          p2pMod.presentationController.fetchAllP2PRecipients();
          transferModulePresentationController.fetchTransferLimits(transferModulePresentationController.getActionByType("PayAPerson"));
        },
        "Manage International Recipients":function(){
          applicationManager.getPresentationUtility().showLoadingScreen();
          var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
          transferModulePresentationController.fetchInternationalRecepients();
          transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
          transferModulePresentationController.setFlowType("InternationalRecipients");
          transferModulePresentationController.fetchTransferLimits(transferModulePresentationController.getActionByType(transferModulePresentationController.transactionMode));
        }
      };
      type[index]();
    },
    setSegmentData: function() {
        var scope = this;
        var data = [
            [{
                    "lblHeader": "Bank Accounts",
                },
                [{
                    "imgArrow": "chevron.png",
                    "lblTransactionMode": "Manage Kony DBX Recipients",
                    "lblTransactionModeDescription": "Edit, delete or transfer to domestic accounts."
                }, {
                    "imgArrow": "chevron.png",
                    "lblTransactionMode": "Manage Other Bank Recipients",
                    "lblTransactionModeDescription": "Edit, delete or transfer to other bank accounts."
                }, {
         			"imgArrow": "chevron.png",
         			"lblTransactionMode": "Manage International Recipients",
         			"lblTransactionModeDescription": "Edit, delete or transfer to international accounts."
				}]
            ],
            [{
                    "lblHeader": "Pay a Person Recipients"
                },
                [{
                    "imgArrow": "chevron.png",
                    "lblTransactionMode": "Manage Recipients",
                    "lblTransactionModeDescription": "Edit, delete or transfer to recipients."
       }]
      ]
    ];
    this.view.segRecipientType.setData(data);
  },
  setSegmentMMData:function(){
    var mainSegmentData=[];
    var sectionData=[];
    var data=this.getTransfersData();
    if(data.length>0){
      var benificiariesSectionData={
        "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.BankHeader"),
      };
      sectionData.push(benificiariesSectionData);
      sectionData.push(data);
      mainSegmentData.push(sectionData);
    }
    mainSegmentData=this.getP2PData(mainSegmentData);
    this.view.segRecipientType.setData(mainSegmentData);
  },
  getP2PData:function(mainSegmentData){
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var fromaccountdata= moneyMovementPresentationController.getTransferObjectById("from");
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    if(kony.sdk.isNullOrUndefined(fromaccountdata)){
      if(moneyMovementModule.getEntitlementValue("ispayAPersonEnabled")=="true" && applicationManager.getConfigurationManager().checkUserPermission("P2P_CREATE")){
        var recipientsSectionData={
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.P2PRec"),
        };
        var sectionData=[];
        sectionData.push(recipientsSectionData);
        var data=[];
        data.push({
          "imgArrow": "chevron.png",
          "lblTransactionMode": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.P2PRec"),
          "lblTransactionModeDescription": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.EmailOrPhone")
        });
        sectionData.push(data);
        mainSegmentData.push(sectionData);
      }
    }else{
      var configurationManager = applicationManager.getConfigurationManager();
      if(configurationManager.isCombinedUser === "true") {
        if(fromaccountdata[0]["isBusiness"] === 0) {
          if(moneyMovementModule.getEntitlementValue("ispayAPersonEnabled")=="true" && applicationManager.getConfigurationManager().checkUserPermission("P2P_CREATE")){
            var recipientsSectionData={
              "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.P2PRec"),
            };
            var sectionData=[];
            sectionData.push(recipientsSectionData);
            var data=[];
            data.push({
              "imgArrow": "chevron.png",
              "lblTransactionMode": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.P2PRec"),
              "lblTransactionModeDescription": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.EmailOrPhone")
            });
            sectionData.push(data);
            mainSegmentData.push(sectionData);
          }}
      }else{
        if(moneyMovementModule.getEntitlementValue("ispayAPersonEnabled")==="true" && applicationManager.getConfigurationManager().checkUserPermission("P2P_CREATE")){
          var  recipientsSectionData={
            "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.P2PRec"),
          };
          var sectionData=[];
          sectionData.push(recipientsSectionData);
          var data=[];
          data.push({
            "imgArrow": "chevron.png",
            "lblTransactionMode": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.P2PRec"),
            "lblTransactionModeDescription": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.EmailOrPhone")
          });
          sectionData.push(data);
          mainSegmentData.push(sectionData);
        }
      }

    }

    return mainSegmentData;
  },
    getTransfersData:function(){
      var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
      var data=[];
      var isExternalCreateRecipientAccessible = applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT");
      var isInterBankCreateRecipientAccessible = applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_VIEW_RECEPIENT");
      var isInternationalCreateRecipientAccessible = applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT");
      if(moneyMovementModule.getEntitlementValue("isOtherKonyAccountsTransfer")=="true" && isInterBankCreateRecipientAccessible){
        data.push({
          "imgArrow": "chevron.png",
          "lblTransactionMode": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.DbxAccount"),
          "lblTransactionModeDescription": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SameBankTransfer")
        });
      }
      if(moneyMovementModule.getEntitlementValue("isOtherBankAccountsTransfer")=="true" && isExternalCreateRecipientAccessible){
        data.push({
          "imgArrow": "chevron.png",
          "lblTransactionMode": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ExtAccount"),
          "lblTransactionModeDescription": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ExternalBankAccount")
        });
      }
      if(moneyMovementModule.getEntitlementValue("isInternationalAccountsTransfer")=="true" && isInternationalCreateRecipientAccessible){
        data.push({
          "imgArrow": "chevron.png",
          "lblTransactionMode": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.IntAccount"),
          "lblTransactionModeDescription": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.OverseasBankAccount")
        });
      }
    return data;
  },
  segmentMMRowClick: function() {
    var index = this.view.segRecipientType.data[this.view.segRecipientType.selectedIndex[0]][1][this.view.segRecipientType.selectedIndex[1]].lblTransactionMode;
    var navMan = applicationManager.getNavigationManager();
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    if(index==applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.DbxAccount")){
      applicationManager.getPresentationUtility().showLoadingScreen();
      transferModulePresentationController.fetchSameBankRecepients();
      var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
      moneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
      transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
      transferModulePresentationController.setFlowType("SameBankRecipients");
      navMan.setCustomInfo("recipientListType","SameBankRecipients");
    }
    else if(index==applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ExtAccount")){
      applicationManager.getPresentationUtility().showLoadingScreen();
      transferModulePresentationController.fetchOtherBankRecepients();
      var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
          moneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
      transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
      transferModulePresentationController.setFlowType("OtherBankRecipients");
      navMan.setCustomInfo("recipientListType","OtherBankRecipients");
    }
    else if(index==applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.P2PRec")){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
      var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
      moneyMovementPresentationController.transactionMode = "PayAPerson";
      p2pMod.presentationController.setFlowType("P2P");
      p2pMod.presentationController.fetchAllP2PRecipients();
      navMan.setCustomInfo("recipientListType","P2P");
    }
    else{
      applicationManager.getPresentationUtility().showLoadingScreen();
      transferModulePresentationController.fetchInternationalRecepients();
      var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
      moneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
      transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
      transferModulePresentationController.setFlowType("InternationalRecipients");
      navMan.setCustomInfo("recipientListType","InternationalRecipients");
    }
  }
  };
});
