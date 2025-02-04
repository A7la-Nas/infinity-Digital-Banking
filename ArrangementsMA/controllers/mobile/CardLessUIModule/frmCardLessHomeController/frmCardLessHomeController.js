define(['CampaignUtility'], function(CampaignUtility){
  return{
    pendingTxns:null,
    postedTxns:null,
    segmentData:null,
    hasWithdrawCashFeature:false,
    hasWithdrawCashViewFeature: false,
	onNavigate: function () {
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
    },
    rowExpandCollapse: function(context) {
      var self = this;
      try {
        var sectionIndex = context.section;
        if (this.segmentData === '') this.segmentData = JSON.parse(JSON.stringify(this.view.segDepositFrom.data));
        var data = this.view.segDepositFrom.data;
        var selectedHeaderData = data[sectionIndex][0];
        if (!JSON.stringify(data).includes("flxNoRecords")) {
          if (selectedHeaderData["imgUpArrow"] === "arrowup_1.png") {
            selectedHeaderData["imgUpArrow"] = "arrowdown.png";
            data[sectionIndex][1] = [];
            this.view.segDepositFrom.setData(data);
          } else {
            selectedHeaderData["imgUpArrow"] = "arrowup_1.png";
            data[sectionIndex][1] = this.segmentData[sectionIndex][1];
            this.view.segDepositFrom.setData(data);
          }
        }
      } catch (err) {
        var errorObj = {
          "errorInfo": "Error in rowExpandCollapse",
          "errorLevel": "Configuration",
          "error": err
        };
        self.onError(errorObj);
      }
    },
    preShow: function() {
	  if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
		this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
		this.view.customHeader.flxBack.isVisible = false;
	  }
      // this.setFooterSkin();
      var scope =this;
      this.view.flxWithdrawCash.onClick = this.flxWithdrawCashOnClick;
      this.view.tbxSearch.onTouchStart = this.tbxSearchOnTouchEnd;
      this.view.flxMainContainer.skin="slfSbox";
      this.view.customSearchbox.tbxSearch.text="";
      this.view.tbxSearch.text="";
      this.view.flxWithdrawCash.onTouchStart = function(){
        scope.view.imgCheckDeposit.src = "withdrawcashtap.png";
      };
      this.view.flxWithdrawCash.onTouchEnd = function(){
        scope.view.imgCheckDeposit.src = "withdrawcash.png";
      };
      this.view.customSearchbox.btnCancel.onClick = this.btnCancelOnClick;
      var configManager = applicationManager.getConfigurationManager();
      this.hasWithdrawCashFeature = configManager.checkUserPermission("WITHDRAW_CASH_CARDLESS_CASH");
      this.hasWithdrawCashViewFeature = configManager.checkUserPermission("WITHDRAW_CASH_VIEW_SUMMARY");
      var MenuHandler =  applicationManager.getMenuHandler();
      MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUCARDLESS);
      var CardLess = applicationManager.getLoggerManager();
      CardLess.setCustomMetrics(this, false, "Cardless Cash Withdrawal");
      this.view.btnChatbot.onClick = function(){
        var chatBotMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ChatBotModule");
        chatBotMode.presentationController.handleFirstTimeOpen();
      };
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.setVisibility(false);
        this.view.flxFooter.setVisibility(true);
        this.view.flxMainContainer.top="0dp";
      }else{
        this.view.flxHeader.setVisibility(true);
        this.view.flxFooter.setVisibility(false);
        this.view.flxMainContainer.top="56dp";
      }
      this.view.flxSearch.setVisibility(true);
      this.view.flxHeaderSearchbox.setVisibility(false);
      //this.view.flxMainContainer.top = "56dp";
      var navManager = applicationManager.getNavigationManager();
      navManager.setEntryPoint("cancelCardlessTransaction","frmCardLessHome");
      var transactionDetails=navManager.getCustomInfo("frmCardLessHome");
      var pendingTransactions=transactionDetails.pendingTransactions;
      var postedTransactions=transactionDetails.postedTransactions;
      this.view.flxNoTransactions.isVisible=false;
      this.view.segDepositFrom.isVisible=true;
      this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
      this.view.flxWithdrawCash.isVisible=this.hasWithdrawCashFeature;
      this.setTransactions(pendingTransactions,postedTransactions);
      this.showDeletedToast();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      let scopeObj = this;
      function campaignPopUpSuccess(response){
        CampaignUtility.showCampaign(response, scopeObj.view);
      }
      function campaignPopUpError(response){
        kony.print(response, "Campaign Not Found!");
      }
      CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
      var deviceManager = applicationManager.getDeviceUtilManager();
      deviceManager.detectDynamicInstrumentation();
    },
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    setFooterSkin: function() {
      if(applicationManager.getPresentationFormUtility().getDeviceName()==='iPhone')
      {
        this.view.customFooter.lblAccounts.skin = "sknLblA0A0A0SSP20px";
        this.view.customFooter.flxAccSelect.setVisibility(false);
        this.view.customFooter.lblTransfer.skin = "sknLblA0A0A0SSP20px";
        this.view.customFooter.flxTransferSel.setVisibility(false);
        this.view.customFooter.lblBillPay.skin = "sknLblA0A0A0SSP20px";
        this.view.customFooter.flxBillSelected.setVisibility(false);
        this.view.customFooter.lblMore.skin = "sknLbl424242SSP20px";
        this.view.customFooter.flxMoreSelect.setVisibility(true);
      }
    },
    flxWithdrawCashOnClick: function() {
      var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      cardlessModule.presentationController.clearTransactionObject();
      var navMan = applicationManager.getNavigationManager();
      navMan.setEntryPoint("cardlessEntry","frmCardLessHome");
      cardlessModule.presentationController.commonFunctionForNavigation("frmCardLessCashRec");
    },
    segDepositFromOnClick:function(){
      if(this.hasWithdrawCashViewFeature) {
        var navMan = applicationManager.getNavigationManager();
        var selectedSectionIndex=Math.floor(this.view.segDepositFrom.selectedRowIndex[0]);
        var selectedRowIndex=Math.floor(this.view.segDepositFrom.selectedRowIndex[1]);
        var transactionData=this.view.segDepositFrom.data[selectedSectionIndex][1][selectedRowIndex];
        navMan.setCustomInfo("frmCardLessTransactionDetails",transactionData);
        navMan.setEntryPoint("frmCardLessTransactionDetails","CardLess");
        var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        cardlessModule.presentationController.commonFunctionForNavigation("frmCardLessTransactionDetails");
      }
    },
    setTransactions:function(pendingTransactions,postedTransactions){
      var dataMap=this.getDataMap();
      var postedTransactions=postedTransactions;
      var pendingTransaction=pendingTransactions;
      this.pendingTxns=pendingTransactions;
      this.postedTxns=postedTransactions;
      this.view.segDepositFrom.widgetDataMap=dataMap;
      this.view.segDepositFrom.isVisible=true;
      this.view.flxNoTransactions.isVisible=false;
      if(pendingTransaction.length>0&&postedTransactions.length>0){
        var data=  [[{"lblHeader": "Pending Transactions","imgUpArrow" : "arrowup_1.png"},pendingTransaction],[{"lblHeader": "Posted Payments","imgUpArrow" : "arrowup_1.png" /*"Posted Transactions" */},postedTransactions]];
        this.view.segDepositFrom.setData(data);
        this.view.flxMainContainer.forceLayout();
      }
      else if(pendingTransaction.length>0){
        var data=  [[{"lblHeader": "Pending Transactions","imgUpArrow" : "arrowup_1.png"},pendingTransaction]];
        this.view.segDepositFrom.setData(data);
        this.view.flxMainContainer.forceLayout();
      }
      else if(postedTransactions.length>0){
        var data=  [[{ "lblHeader": "Posted Payments","imgUpArrow" :"arrowup_1.png" /* "Posted Transactions"*/},postedTransactions]];
        this.view.segDepositFrom.setData(data);
        this.view.flxMainContainer.forceLayout();
      }
      else{
        this.view.segDepositFrom.isVisible=false;
        this.view.flxNoTransactions.isVisible=true;
        this.view.flxMainContainer.forceLayout();
      }
      this.segmentData=this.view.segDepositFrom.data;
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    tbxSearchOnTextChange:function()
    {
      var navObj=applicationManager.getNavigationManager();
      var searchtext= this.view.customSearchbox.tbxSearch.text.toLowerCase();
      if(searchtext)
      {
        var data = [],headers = [];
        headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingTransactions"));
        headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.postedTransactions"));
        data.push(this.pendingTxns);
        data.push(this.postedTxns);
        this.view.segDepositFrom.isVisible=true;
        this.view.flxNoTransactions.isVisible=false;
        this.view.flxWithdrawCash.isVisible=false;
        this.view.segDepositFrom.removeAll();
        var searchobj= applicationManager.getDataProcessorUtility().commonSectionSegmentSearch("description",searchtext,data,headers);
        if(searchobj.length>0)
        {
          this.view.segDepositFrom.setData(searchobj);
        }
        else
        {
          this.view.segDepositFrom.isVisible=false;
          this.view.flxNoTransactions.isVisible=true;
          this.view.flxSeperator2.isVisible=false;
          //this.view.flxHeaderNT.isVisible=false;
        }
      }
      else
      {
        if(this.segmentData.length>0)
        {
          this.view.segDepositFrom.setData(this.segmentData);
          this.view.segDepositFrom.isVisible=true;
          this.view.flxNoTransactions.isVisible=false;
          this.view.flxWithdrawCash.isVisible=this.hasWithdrawCashFeature;
        }
        else
        {
          this.view.flxWithdrawCash.isVisible=this.hasWithdrawCashFeature;
          this.view.segDepositFrom.isVisible=false;
          this.view.flxNoTransactions.isVisible=true;
          this.view.flxSeperator2.isVisible=false;
          //this.view.flxHeaderNT.isVisible=false;
        }
      }
    },
    getDataMap : function(){
      var dataMap={};
      dataMap = {
        "lblAccountName":"description",
        "lblAccountBal":"scheduledDate",
        "lblAccountBalValue":"amount",
        "lblHeader":"lblHeader",
        "imgUpArrow" :"imgUpArrow"
      };
      return dataMap;
    },
    tbxSearchOnTouchEnd: function() {
      var scope = this;
      this.view.flxGradientBottom.isVisible = false;
      this.view.flxMainContainer.skin="sknFlxScrlffffff";
      this.view.tbxSearch.setFocus(false);
      this.view.customSearchbox.tbxSearch.text="";
      this.view.flxHeader.setVisibility(false);
      this.view.flxHeaderSearchbox.setVisibility(true);
      this.view.flxMainContainer.top = "40dp";
      this.view.flxSearch.setVisibility(false);
      this.view.flxShadow.setVisibility(false);
      this.view.flxWithdrawCash.setVisibility(false);
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="android"){
        this.view.flxGradient.top = "40dp";
      }
      //this.view.customSearchbox.tbxSearch.setFocus(true);
      kony.timer.schedule("timerId", function() {
        scope.view.customSearchbox.tbxSearch.setFocus(true);
      }, 0.2, false);
      this.view.flxHeaderSearchbox.forceLayout();
    },
    btnCancelOnClick: function() {
      var navManager = applicationManager.getNavigationManager();
      //this.view.flxHeader.setVisibility(true);
      //this.view.flxMainContainer.top = "56dp";
      this.view.flxGradientBottom.isVisible = true;
      this.view.customSearchbox.tbxSearch.text="";
      this.view.flxMainContainer.skin="slfSbox";
      this.view.tbxSearch.text="";
      var transactionDetails=navManager.getCustomInfo("frmCardLessHome");
      var pendingTransactions=transactionDetails.pendingTransactions;
      var postedTransactions=transactionDetails.postedTransactions;
      this.view.flxNoTransactions.isVisible=false;
      this.setTransactions(pendingTransactions,postedTransactions);
      // this.view.flxShadow.setVisibility(true);
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxMainContainer.top="0dp";
        this.view.flxHeader.setVisibility(false);
        this.view.flxFooter.setVisibility(true);
      }else{
        this.view.flxMainContainer.top="56dp";
        this.view.flxGradient.top = "56dp";
        this.view.flxHeader.setVisibility(true);
        this.view.flxFooter.setVisibility(false);
      }
      this.view.flxSearch.setVisibility(true);
      this.view.flxWithdrawCash.setVisibility(this.hasWithdrawCashFeature);
      this.view.flxHeaderSearchbox.setVisibility(false);
    },
    showDeletedToast:function(){
      if(scope_cardlessPresentationController.deletedTransactionFlag){
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardless.cancelTransaction")+ "with reference id: "+scope_cardlessPresentationController.transactionId));
        scope_cardlessPresentationController.deletedTransactionFlag=false;
      }
      if(scope_cardlessPresentationController.deletedTransactionErrorFlag){
        applicationManager.getDataProcessorUtility().showToastMessageError(this,scope_cardlessPresentationController.deletedTransactionErrorMessage);
        scope_cardlessPresentationController.deletedTransactionErrorFlag=false;
      }
    }
  };
});