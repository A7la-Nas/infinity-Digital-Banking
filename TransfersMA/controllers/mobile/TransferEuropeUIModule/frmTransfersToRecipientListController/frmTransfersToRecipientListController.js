  define({
    recipientType: '',
    deletesegData:[],
    segmentData:null,
    timerCounter:0,
    onNavigate: function(obj) {
    },
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.showPreshowSearch();
      this.deletesegData=[];
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "0dp";
      }
      this.view.flxMainContainer.skin = "slFSboxmb";
      this.setTransfersSegmentData();
      this.initActions();
      this.setNoPayeeLabel();
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    initActions: function() {
      var scope = this;
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      this.view.customHeader.flxBack.onClick = function() {
        var navMan=applicationManager.getNavigationManager();
        navMan.goBack();
      };
      this.view.segRecipients.onRowClick = function() {
        transferModulePresentationController.setOtherBankFlowType();
        scope.segmentRowClick();
      };
      this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
      this.view.tbxSearch.onTouchStart = this.showSearch;
      this.view.customSearchbox.btnCancel.onClick = this.showSearch;
      this.view.customHeader.btnRight.onClick = function() {
        transferModulePresentationController.commonFunctionForNavigation("frmTransfers");
      };
      this.view.btnAddRecipient.onClick=function(){
        transferModulePresentationController.setOtherBankFlowType();
        transferModulePresentationController.commonFunctionForNavigation("frmTransfersToAccountEurope");
      };
    },
    showPreshowSearch:function(){
      if (this.view.flxHeaderSearchbox.isVisible === true) {
        this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxSearch.isVisible = true;
        this.view.flxHeader.isVisible = true;
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
          this.view.flxMainContainer.top = "0dp";
        }
        else{
          this.view.flxMainContainer.top = "56dp";
        }
      }
    },
    tbxSearchOnTextChange:function(){
      var scope=this;
      var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
      var searchSegmentData=null;
      var data = this.segmentData;
      var newSegmentData = applicationManager.getDataProcessorUtility().commonSegmentSearch("nickName",searchtext,data);
      this.deletesegData=newSegmentData;
      searchSegmentData=newSegmentData;
      if(searchSegmentData.length===0){
        this.view.flxNoTransactions.isVisible=true;
        this.view.segRecipients.isVisible=false;
      }
      else{
        this.view.flxNoTransactions.isVisible=false;
        this.view.segRecipients.isVisible=true;
        this.view.segRecipients.setData(searchSegmentData);
      }
    },
    setTransfersSegmentData: function() {
      var scope=this;
      var segmentData=[];
      var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
      var dataMap=this.getDataMap("OtherBankRecipients");
      this.view.segRecipients.widgetDataMap = dataMap;
        var newSegmentData=[];
        newSegmentData=transferModulePresentationController.getAllExternalBankBenificiaries();
        segmentData=newSegmentData;
        for(var i=0;i<segmentData.length;i++){
          segmentData[i].imgBank={"isVisible": true,src:"externalbank.png"};
          if(segmentData[i].accountType){
            var accType=segmentData[i].accountType.toString();
            if (accType.indexOf(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.Account")) >= 0) {
              segmentData[i].accountType = segmentData[i].accountType;
            } else {
              segmentData[i].accountType = segmentData[i].accountType + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.Account");
            }
          }
          if (segmentData[i].nickName === "" || segmentData[i].nickName === null || segmentData[i].nickName === undefined) {
            segmentData[i].nickName = segmentData[i].beneficiaryName;
          }
          if(segmentData[i].IBAN)
            segmentData[i].IBAN = applicationManager.getFormatUtilManager().formatIBAN(segmentData[i].IBAN);
        }
      if(segmentData.length===0){
        this.view.flxNoTransactions.isVisible=true;
        this.view.segRecipients.isVisible=false;
      }
      else{
        this.view.flxNoTransactions.isVisible=false;
        this.view.segRecipients.isVisible=true;
        this.view.segRecipients.setData(segmentData);
      }
      this.segmentData=segmentData;
    },
    getDataMap : function(type){
      var dataMap={};
      dataMap = {
        "imgBank": "imgBank",
        "lblAccountName":"nickName",
        "lblBankName": "IBAN",
        "lblAccountBalValue": "",
        "template": "flxAccounts",
        "type":"type",
        "flxDelete":"flxDelete",
        "flxMain":"flxMain"
      };
      return dataMap;
    },
    segmentRowClick: function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var rowid=this.view.segRecipients.selectedRowIndex[1];
      var selectedAccountDetails = this.view.segRecipients.data[rowid];
      var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
      var navMan=applicationManager.getNavigationManager();
      var accdata=  navMan.getCustomInfo("frmTransfersToAccount");
      if(kony.sdk.isNullOrUndefined(accdata.selectedAccountData))
        accdata.selectedAccountData = {}
      accdata.selectedAccountData = selectedAccountDetails;
      accdata.selectedAccountData.IBAN=applicationManager.getFormatUtilManager().deFormatIBAN(selectedAccountDetails.IBAN);
      navMan.setCustomInfo("frmTransfersToAccount",accdata);
      transferModulePresentationController.navAfterToAcc();
    },
    showSearch: function() {
      if (this.view.flxHeaderSearchbox.isVisible === true) {
        this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxMainContainer.skin = "slFSboxmb";
        this.view.segRecipients.setData(this.segmentData);
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
          this.view.flxHeader.isVisible = false;
          this.view.flxMainContainer.top = "0dp";
        }
        else{
          this.view.flxHeader.isVisible = true;
          this.view.flxMainContainer.top = "56dp";
        }
        if(this.segmentData.length===0){
          this.view.flxNoTransactions.isVisible=true;
          this.view.segRecipients.isVisible=false;
        }
        else{
          this.view.flxNoTransactions.isVisible=false;
          this.view.segRecipients.isVisible=true;
          this.deletesegData=this.segmentData;
          this.view.segRecipients.setData(this.segmentData);
        }
        this.view.flxSearch.isVisible = true;
      } else {
        this.view.flxMainContainer.skin = "slFSbox0gff85612494c44Tab";
        this.view.customSearchbox.tbxSearch.text="";
        this.view.flxSearch.isVisible = false;
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "40dp";
        this.view.flxHeaderSearchbox.isVisible = true;
        this.view.customSearchbox.tbxSearch.setFocus(true);
      }
    },
    setNoPayeeLabel:function(){
      var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
      if(p2pMod.presentationController.getFlowType()==="P2P"){
        this.view.lblNoTransaction.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.p2p.noAccounts","No Payees Available");
      }
      else{
        this.view.lblNoTransaction.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.NoTransaction","No Accounts Available");
      }
    },
    bindGenericSuccess : function(msg){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg);
    },
    bindGenericError : function(msg){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    }
  });
