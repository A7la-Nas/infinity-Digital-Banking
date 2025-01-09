define({
    recipientType: '',
    deletesegData:[],
	segmentData:null,
    timerCounter:0,
    widgetType: null, //Set the widgetType value with corresponding flex name in the segment template
    viewConstants:{"Infinity":"temenos.png","Icici":"temenos.png","Boa":"boa.png","Citi":"citi.png","National":"temenos.png"},
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
      this.view.flxMainContainer.skin="slFSbox0gff85612494c44Tab";
        this.deletesegData=[];
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxHeader.isVisible = false;
          	this.view.flxMainContainer.top = "0dp";
        }
      	this.setTransfersSegmentData();
        this.initActions();
	    this.showSuccessMessage();
        this.setNoPayeeLabel();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    initActions: function() {
      var scope = this;
      var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
      if(p2pMod.presentationController.getFlowType()==="P2P"){
        var isP2pCreateRecipientAccessible = applicationManager.getConfigurationManager().checkUserPermission("P2P_CREATE_RECEPIENT");
        if(isP2pCreateRecipientAccessible){
          this.view.flxBtnAddRecipient.isVisible=true;
        }else{
          this.view.flxBtnAddRecipient.isVisible=false;
        }
      }
      var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
        var isInterBankCreateRecipientAccessible = applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT");
        if(isInterBankCreateRecipientAccessible){
          this.view.flxBtnAddRecipient.isVisible=true;
        }else{
          this.view.flxBtnAddRecipient.isVisible=false;
        }
      }
      if(transferModulePresentationController.getFlowType()==="OtherBankRecipients"){
        var isExternalCreateRecipientAccessible = applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT");
        if(isExternalCreateRecipientAccessible){
          this.view.flxBtnAddRecipient.isVisible=true;
        }else{
          this.view.flxBtnAddRecipient.isVisible=false;
        }
      }
      if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
        var isInternationalCreateRecipientAccessible = applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT");
        if(isInternationalCreateRecipientAccessible){
          this.view.flxBtnAddRecipient.isVisible=true;
        }else{
          this.view.flxBtnAddRecipient.isVisible=false;
        }
      }
        this.view.customHeader.flxBack.onClick = function() {
            var navMan=applicationManager.getNavigationManager();
          	navMan.goBack();
        };
        this.view.segRecipients.onRowClick = function() {
            scope.segmentRowClick();
        };
		this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
        this.view.tbxSearch.onTouchStart = this.showSearch;
        this.view.customSearchbox.btnCancel.onClick = this.showSearch;
        this.view.customHeader.btnRight.onClick = function() {
          var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
          transferModPresentationController.commonFunctionForNavigation("frmTransfers");
        };
        this.view.btnAddRecipient.onClick=function(){
          var navManager = applicationManager.getNavigationManager();
          var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
          if(p2pMod.presentationController.getFlowType() === "P2P" || p2pMod.presentationController.getFlowType() === "editP2P"){
            p2pMod.presentationController.setFlowType("P2P");
            navManager.setEntryPoint("createP2PPayee","frmManageRecipientList");
            p2pMod.presentationController.clearP2PPayeeData();
            p2pMod.presentationController.commonFunctionForNavigation("frmRegP2PContactType");
          }
		  var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
		  if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
          	var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
            navManager.setEntryPoint("createInternalBankBenificiary","frmManageRecipientList");
            transferModulePresentationController.clearBenificiaryData();
			transferModulePresentationController.clearBuilderNonGeneratedAttributes();
            transferModulePresentationController.commonFunctionForNavigation("frmEnterBenAccNo");
          }
          if(transferModulePresentationController.getFlowType()==="OtherBankRecipients"){
          	var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
            navManager.setEntryPoint("createInternalBankBenificiary","frmManageRecipientList");
            transferModulePresentationController.clearBenificiaryData();
            transferModulePresentationController.clearBuilderNonGeneratedAttributes();
            transferModulePresentationController.commonFunctionForNavigation("frmAddBenRoutNo");
          }
          if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
            applicationManager.getPresentationUtility().showLoadingScreen();
      		var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
            navManager.setEntryPoint("createInternalBankBenificiary","frmManageRecipientList");
            transferModulePresentationController.clearBenificiaryData();
			transferModulePresentationController.clearBuilderNonGeneratedAttributes();
            transferModulePresentationController.navigateToEnterSwiftCode();
    	 }
        };
    },
	tbxSearchOnTextChange:function(){
     var scope=this;
        this.view.flxMainContainer.skin="slFSbox0gff85612494c44Tab";
      	var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
    	var searchSegmentData=null;
      	 	var data = this.segmentData;
			var newSegmentData = applicationManager.getDataProcessorUtility().commonSegmentSearch("nickName",searchtext,data);
          	for (var i = 0; i < newSegmentData.length; i++) {
            	newSegmentData[i].flxDelete={};
          	}
          	for(var i=0;i<newSegmentData.length;i++){
            	newSegmentData[i].flxDelete.onClick = scope.deleteCallback;
          	}
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
    setP2pSegmentData: function() {
        var scope = this;
        var data = [{
            "lblAccountName": "Jonathan Davidson",
            "lblBankName": "358-673-0116",
            "template": "flxAccountsNoImage"
        }, {
            "lblAccountName": "Jimmy Sherman",
            "lblBankName": "358-673-0116",
            "template": "flxAccountsNoImage"
        }, {
            "lblAccountName": "Philip Floyd",
            "lblBankName": "358-673-0116",
            "template": "flxAccountsNoImage"
        }, {
            "lblAccountName": "Terry Tucker",
            "lblBankName": "358-673-0116",
            "template": "flxAccountsNoImage"
        }, {
            "lblAccountName": "Shawn Snyder",
            "lblBankName": "358-673-0116",
            "template": "flxAccountsNoImage"
        }, {
            "lblAccountName": "Landon Wallace",
            "lblBankName": "358-673-0116",
            "template": "flxAccountsNoImage"
        }, {
            "lblAccountName": "Terry Webb",
            "lblBankName": "358-673-0116",
            "template": "flxAccountsNoImage"
        }];
        this.view.segRecipients.setData(data);
    },
  setTransfersSegmentData: function() {
    var scope=this;
    var segmentData=[];
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    var dataMap=this.getDataMap(transferModulePresentationController.getFlowType());
    this.view.segRecipients.widgetDataMap = dataMap;
    var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
    var cm=applicationManager.getConfigurationManager();
    if(p2pMod.presentationController.getFlowType()==="P2P"||p2pMod.presentationController.getFlowType()==="editP2P"){
      var newSegmentData=[];
      newSegmentData=p2pMod.presentationController.getAllP2PPayees();
      for (var i = 0; i < newSegmentData.length; i++) {
        newSegmentData[i].flxDelete={};
      }
      for(var i=0;i<newSegmentData.length;i++){
        newSegmentData[i].flxDelete.onClick = scope.deleteCallback;       
        
      }
      segmentData=newSegmentData;
      this.widgetType = "flxMain"; //Set the widgetType value with corresponding flex name in the segment template
      for(var i=0;i<segmentData.length;i++){
        segmentData[i].template = "flxAccountsNoImage";
        if(segmentData[i].phone==="" ||segmentData[i].phone===null ||segmentData[i].phone===undefined )
        {
            segmentData[i].phone=segmentData[i].email   
        }
               
        if(segmentData[i].nickName==="" ||segmentData[i].nickName===null ||segmentData[i].nickName===undefined )
        {
          segmentData[i].nickName=segmentData[i].name;
        }
        
        var configurationManager = applicationManager.getConfigurationManager();
        if(configurationManager.isCombinedUser === "true") {
          segmentData[i].flxAccountType={isVisible:false};        
          segmentData[i].imgAccountType= "personalaccount.png";
          segmentData[i].flxBankIcon = {isVisible:false};
        }else
          {
            segmentData[i].flxAccountType={isVisible:false}; 
            segmentData[i].flxBankIcon = {isVisible:false};
          }
      }
      if(cm.isFastTransfersFlowEnabled()){
        var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
        var accountsList=moneyMovementPresentationController.getToAccounts();
        var payeeList=p2pMod.presentationController.getAllP2PPayees();
        accountsList.payeesList=payeeList;
        moneyMovementPresentationController.setToAccountsList(accountsList);
      }
    }
    if(transferModulePresentationController.getFlowType()==="OtherBankRecipients"){
      var newSegmentData=[];
      var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      newSegmentData=transferModulePresentationController.getAllExternalBankBenificiaries();
      for (var i = 0; i < newSegmentData.length; i++) {
        newSegmentData[i].flxDelete={};
      }
      for(var i=0;i<newSegmentData.length;i++){
        newSegmentData[i].flxDelete.onClick = scope.deleteCallback;
      }
      segmentData=newSegmentData;
      this.widgetType = "flxMain"; //Set the widgetType value with corresponding flex name in the segment template
      for(var i=0;i<segmentData.length;i++){
        segmentData[i].template = "flxAccounts";
        segmentData[i].imgWarn = {isVisible:false};  
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
        var configurationManager = applicationManager.getConfigurationManager();
        if(configurationManager.isCombinedUser === "true") {
          if(segmentData[i].isBusinessPayee === "0"){
            segmentData[i].flxAccountType = {isVisible:false};        
            segmentData[i].imgAccountType = "personalaccount.png";

          }else {
            segmentData[i].flxAccountType = {isVisible:false};        
            segmentData[i].imgAccountType = "businessaccount.png";

          }
          var bankIcon=this.getBankIcon(segmentData[i].bankName);
          if(!kony.sdk.isNullOrUndefined(bankIcon)){
            segmentData[i].flxBankIcon = {isVisible:true,left:"13Dp"};
            segmentData[i].imgBankIcon = {"src":bankIcon};
          }else{
            segmentData[i].flxBankIcon = {isVisible:false};
          }
        }else
        {
          segmentData[i].flxAccountType={isVisible:false}; 
          segmentData[i].flxBankIcon = {isVisible:false};
        }
      }
      if(cm.isFastTransfersFlowEnabled()){
        var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
        var accountsList=moneyMovementPresentationController.getToAccounts();
        var externalAccList=transferModulePresentationController.getAllExternalBankBenificiaries();
        accountsList.externalBenificiaries=externalAccList;
        moneyMovementPresentationController.setToAccountsList(accountsList);
      }
    }
    if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
      var newSegmentData=[];
      var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      newSegmentData=transferModulePresentationController.getAllInternalBankBenificiaries();
      for (var i = 0; i < newSegmentData.length; i++) {
        newSegmentData[i].flxDelete={};
      }
      for(var i=0;i<newSegmentData.length;i++){
        newSegmentData[i].flxDelete.onClick = scope.deleteCallback;
      }
      segmentData=newSegmentData;
      this.widgetType = "flxMain"; //Set the widgetType value with corresponding flex name in the segment template
      for(var i=0;i<segmentData.length;i++){
        segmentData[i].template = "flxAccountsNoImage";
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
        var configurationManager = applicationManager.getConfigurationManager();
        if(configurationManager.isCombinedUser === "true") {
          if(segmentData[i].isBusinessPayee === "0"){
            segmentData[i].flxAccountType = {isVisible:false};        
            segmentData[i].imgAccountType = "personalaccount.png";

          }else {
            segmentData[i].flxAccountType = {isVisible:false};        
            segmentData[i].imgAccountType = "businessaccount.png";

          }
          segmentData[i].flxBankIcon = {isVisible:false};
        }else
        {
          segmentData[i].flxAccountType={isVisible:false}; 
          segmentData[i].flxBankIcon = {isVisible:false};
        }
      }
      if(cm.isFastTransfersFlowEnabled()){
        var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
        var accountsList=moneyMovementPresentationController.getToAccounts();
        var internalAccList=transferModulePresentationController.getAllInternalBankBenificiaries();
        accountsList.internalBenificiaries=internalAccList;
        moneyMovementPresentationController.setToAccountsList(accountsList);
      }
    }
    if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
      var newSegmentData=[];
      var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      newSegmentData=transferModulePresentationController.getAllInternationalBenificiaries();
      for (var i = 0; i < newSegmentData.length; i++) {
        newSegmentData[i].flxDelete={};
      }
      for(var i=0;i<newSegmentData.length;i++){
        newSegmentData[i].flxDelete.onClick = scope.deleteCallback;
      }
      segmentData=newSegmentData;
      this.widgetType = "flxMain"; //Set the widgetType value with corresponding flex name in the segment template
      for(var i=0;i<segmentData.length;i++){
        segmentData[i].template = "flxAccounts";
        segmentData[i].imgWarn = {isVisible:false};  
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
        var configurationManager = applicationManager.getConfigurationManager();
        if(configurationManager.isCombinedUser === "true") {
          if(segmentData[i].isBusinessPayee === "0"){
            segmentData[i].flxAccountType = {isVisible:false};        
            segmentData[i].imgAccountType = "personalaccount.png";

          }else {
            segmentData[i].flxAccountType = {isVisible:false};        
            segmentData[i].imgAccountType = "businessaccount.png";

          }
          var bankIcon=this.getBankIcon(segmentData[i].bankName);
          if(!kony.sdk.isNullOrUndefined(bankIcon)){
            segmentData[i].flxBankIcon = {isVisible:true,left:"13Dp"};
            segmentData[i].imgBankIcon = {"src":bankIcon};
          }else{
            segmentData[i].flxBankIcon = {isVisible:false};
          }
        }else
        {
          segmentData[i].flxAccountType={isVisible:false};
          segmentData[i].flxBankIcon = {isVisible:false};
        }
      }
      if(cm.isFastTransfersFlowEnabled()){
        var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
        var accountsList=moneyMovementPresentationController.getToAccounts();
        var internationalAccList=transferModulePresentationController.getAllInternationalBenificiaries();
        accountsList.internationalBenificiaries=internationalAccList;
        moneyMovementPresentationController.setToAccountsList(accountsList);
      }
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
     this.deletesegData=segmentData;
		this.segmentData=segmentData;
    },
  deleteCallback:function(context){
    var scope=this;
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
    var rowid=scope.view.segRecipients.selectedIndex[1];
    if(p2pMod.presentationController.getFlowType()==="P2P"){
      //var rowid=scope.view.segRecipients.selectedRowIndex[1];
      //var selectedAccountDetails = scope.view.segRecipients.data[rowid];
      var selectedAccountDetails=scope.deletesegData[rowid];
      p2pMod.presentationController.setP2PPayeeData(selectedAccountDetails);
      var basicConfig = {message: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.deleteRecipient","Do you want to delete the recipient"),
                         alertIcon:null,
                         alertType: constants.ALERT_TYPE_CONFIRMATION,alertTitle: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfers.deleteAlertTitle"),
                         yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                         noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                         alertHandler: scope.deleteHandler
                        };
    }
    if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
      var selectedAccountDetails=scope.deletesegData[rowid];
      transferModulePresentationController.setBenificiaryDetails(selectedAccountDetails);
      var basicConfig = {message: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfers.deleteAlertMessage"),alertIcon:null,alertType: constants.ALERT_TYPE_CONFIRMATION,alertTitle: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfers.deleteAlertTitle"),yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                         noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"), alertHandler: scope.deleteHandler
                        };
    }
    if(transferModulePresentationController.getFlowType()==="OtherBankRecipients"){
      var selectedAccountDetails=scope.deletesegData[rowid];
      transferModulePresentationController.setBenificiaryDetails(selectedAccountDetails);
      var basicConfig = {message: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfers.deleteAlertMessage"),alertIcon:null,alertType: constants.ALERT_TYPE_CONFIRMATION,alertTitle: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfers.deleteAlertTitle"),yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                         noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"), alertHandler: scope.deleteHandler
                        };
    }
    if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
      var selectedAccountDetails=scope.deletesegData[rowid];
      transferModulePresentationController.setBenificiaryDetails(selectedAccountDetails);
      var basicConfig = {message: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfers.deleteAlertMessage"),alertIcon:null,alertType: constants.ALERT_TYPE_CONFIRMATION,yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                         noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"), alertHandler: scope.deleteHandler
                        };
    }
    var pspConfig = {};
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
  },
  deleteHandler:function(response){
      if(response === true){
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.animateRight(applicationManager.getPresentationUtility().rowIndexforSwipe);
        var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
        var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
        if(p2pMod.presentationController.getFlowType()==="P2P"){
          p2pMod.presentationController.deleteP2PRecipient();
        }
        else{
          transferModulePresentationController.deleteSameBankBenificiary();
        }
      }
    },
  	getDataMap : function(type){
      	var dataMap={};
      	if(type==="SameBankRecipients"){
      		dataMap = {
            "lblAccountName":"nickName",
            "lblAccountBal":"",
            "lblBankName":"bankName",
            "lblAccountBalValue":"",
			"type":"type",
            "flxDelete":"flxDelete",
            "flxMain":"flxMain",
            "flxAccountType":"flxAccountType",
           "imgAccountType":"imgAccountType", 
            "flxBankIcon":"flxBankIcon",
            "imgBankIcon":"imgBankIcon",
        	};
      	}
      if(type==="OtherBankRecipients"){
        dataMap = {
         "imgBank": "imgBank",
          "lblAccountName":"nickName",
          "lblBankName": "bankName",
          "lblAccountBalValue": "",
          "lblAccountBal":"",
          "type":"type",
          "flxDelete":"flxDelete",
          "flxMain":"flxMain",
          "flxAccountType":"flxAccountType",
          "imgAccountType":"imgAccountType",
          "flxBankIcon":"flxBankIcon",
          "imgBankIcon":"imgBankIcon",
          "imgWarn":"imgWarn"
        };
      }
     if(type==="InternationalRecipients"){
        dataMap = {
          "lblAccountName":"nickName",
          "lblBankName": "bankName",
           "lblAccountBalValue": "",
          "lblAccountBal":"",
          "type":"type",
          "flxDelete":"flxDelete",
          "flxMain":"flxMain",
          "flxAccountType":"flxAccountType",
          "imgAccountType":"imgAccountType",
          "flxBankIcon":"flxBankIcon",
          "imgBankIcon":"imgBankIcon",
          "imgWarn":"imgWarn"
        };
      }
      if(type==="P2P"||type==="editP2P"){ 
           dataMap = {
            "lblAccountName":"nickName",
            "lblBankName":"phone",
            "lblAccountBalValue":"",
            "lblAccountBal":"",
          	"type":"type",
            "flxDelete":"flxDelete",
            "flxMain":"flxMain",
            "flxAccountType":"flxAccountType",
            "imgAccountType":"imgAccountType",
             "flxBankIcon":"flxBankIcon",
             "imgBankIcon":"imgBankIcon",
        }; 
      }
   	  	return dataMap;
  	},
	segmentRowClick: function() {
	  applicationManager.getPresentationUtility().showLoadingScreen();
      var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
      var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
	 if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
		var rowid=this.view.segRecipients.selectedRowIndex[1];
		var selectedAccountDetails = this.view.segRecipients.data[rowid];
        var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      	transferModulePresentationController.getBenificiaryScheduledAndPostedTransactions(selectedAccountDetails);
     }
     if(transferModulePresentationController.getFlowType()==="OtherBankRecipients"){
		var rowid=this.view.segRecipients.selectedRowIndex[1];
		var selectedAccountDetails = this.view.segRecipients.data[rowid];
		var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
        transferModulePresentationController.getBenificiaryScheduledAndPostedTransactions(selectedAccountDetails);
      }
    if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
      	applicationManager.getPresentationUtility().showLoadingScreen();
        var rowid=this.view.segRecipients.selectedRowIndex[1];
		var selectedAccountDetails = this.view.segRecipients.data[rowid];
    	var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    	transferModulePresentationController.getBenificiaryScheduledAndPostedTransactions(selectedAccountDetails);
      }
    if(p2pMod.presentationController.getFlowType()==="P2P" || p2pMod.presentationController.getFlowType()==="editP2P"){
      	p2pMod.presentationController.setFlowType("P2P");
	    var rowid=this.view.segRecipients.selectedRowIndex[1];
	    var selectedAccountDetails = this.view.segRecipients.data[rowid];
	    p2pMod.presentationController.navToP2PRecipientDetails(selectedAccountDetails);
     }
    },
    showSearch: function() {
		var scopeObj = this;
        if (this.view.flxHeaderSearchbox.isVisible === true) {
              	//this.view.segRecipients.setData(this.segmentData);
        		if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                  this.view.flxMainContainer.skin="slFSbox0gff85612494c44Tab";
                  this.view.flxMainContainer.top = "0dp";
                   this.view.flxHeader.isVisible = false;
                  this.view.flxSearch.isVisible = true;
                this.view.flxHeaderSearchbox.isVisible = false;
      			}
      			else{
                  this.view.flxMainContainer.skin="slFSbox0gff85612494c44Tab";
                  this.view.flxMainContainer.top = "56dp";
                  this.view.flxHeader.isVisible = true;
                  this.view.flxSearch.isVisible = true;
                this.view.flxHeaderSearchbox.isVisible = false;
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
              this.view.flxMainContainer.skin="slFSbox0gff85612494c44Tab";
              	this.view.customSearchbox.tbxSearch.text="";
              	this.view.flxSearch.isVisible = false;
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "40dp";
                this.view.flxHeaderSearchbox.isVisible = true;
                	kony.timer.schedule("timerId", function() {
                           scopeObj.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.2, false);
            }
    },
 showSuccessMessage : function(){
   var navManager = applicationManager.getNavigationManager();
   var benificiaryList=navManager.getCustomInfo("frmManageRecipientList");
   var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
   if(p2pMod.presentationController.getFlowType()==="P2P"){
     if(p2pMod.presentationController.isDeleteDone){
       this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.p2p.deleteRecipient"));
       p2pMod.presentationController.isDeleteDone=false;
     }
     if(p2pMod.presentationController.isNickNameUpdated){
     //  this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.successUpdate"));
       p2pMod.presentationController.isNickNameUpdated = false;
     }
     if(p2pMod.presentationController.isPayeeAdded){
     //  this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.addBenificiary"));
       p2pMod.presentationController.isPayeeAdded = false;
     }
   }
   var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
     if(scope_RecipientPresentationController.sameBankBenificiaryAdded){
     	//applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.addBenificiary","Successfully recipient was added"));
       	scope_RecipientPresentationController.sameBankBenificiaryAdded=false;
     }
     if(scope_RecipientPresentationController.isNickNameUpdated){
     //	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.successUpdate","Successfully recipient nick name was updated"));
       	scope_RecipientPresentationController.isNickNameUpdated=false;
     }
     if(scope_RecipientPresentationController.isRecipientDeleted){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.deleteBenificiary","Successfully recipient deleted permanently"));
       	scope_RecipientPresentationController.isRecipientDeleted=false;
     }
    }
   else if(transferModulePresentationController.getFlowType()==="OtherBankRecipients"){
     if(scope_RecipientPresentationController.otherBankBenificiaryAdded){
     //	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.addBenificiary","Successfully recipient was added"));
       	scope_RecipientPresentationController.otherBankBenificiaryAdded=false;
     }
     if(scope_RecipientPresentationController.isNickNameUpdated){
     //	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.successUpdate","Successfully recipient nick name was updated"));
       	scope_RecipientPresentationController.isNickNameUpdated=false;
     }
     if(scope_RecipientPresentationController.isRecipientDeleted){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.deleteBenificiary","Successfully recipient deleted permanently"));
       	scope_RecipientPresentationController.isRecipientDeleted=false;
     }
   }
   else{
     if(scope_RecipientPresentationController.internationalBenificiaryAdded){
     //	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.addBenificiary","Successfully recipient was added"));
       	scope_RecipientPresentationController.internationalBenificiaryAdded=false;
     }
     if(scope_RecipientPresentationController.isNickNameUpdated){
     //	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.successUpdate","Successfully recipient nick name was updated"));
       	scope_RecipientPresentationController.isNickNameUpdated=false;
     }
     if(scope_RecipientPresentationController.isRecipientDeleted){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.deleteBenificiary","Successfully recipient deleted permanently"));
       	scope_RecipientPresentationController.isRecipientDeleted=false;
     }
   }
 },
  setNoPayeeLabel:function(){
    var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
    if(p2pMod.presentationController.getFlowType()==="P2P"){
      this.view.lblNoTransaction.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.p2p.noAccounts","No Payees Available");
    }
    else{
       this.view.lblNoTransaction.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.NoTransaction","No Accounts Available");
    }
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
  bindGenericSuccess : function(msg){
    	applicationManager.getPresentationUtility().dismissLoadingScreen();
    	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg);
  	},
    bindGenericError : function(msg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
  },
  getBankIcon:function(bankName){
    try{
      var img ;
      if(!kony.sdk.isNullOrUndefined(bankName)){
        if(bankName==="Infinity")
          img=this.viewConstants.Infinity
          else if(bankName==="ICICI bank")
            img=this.viewConstants.Icici
            else if(bankName==="Bank of America" || bankName==="america") 
              img=this.viewConstants.Boa
              else if(bankName==="CitiBank")
                img = this.viewConstants.Citi
                else if(bankName==="National Bank")
                  img=this.viewConstants.National
                  else
                    img=this.viewConstants.Infinity
                    }
      return img;
    }catch(er){
      kony.print(er);
    }
  },
  animateRight: function(rowNumber) {
    var animObj = this.getTransAnimDefinition("0%");
    this.view.segRecipients.animateRows({
      rows: [{
        sectionIndex: 0,
        rowIndex: rowNumber
      }],
      widgets: [this.widgetType],
      animation: this.swipeObj
    });
  },
  getTransAnimDefinition: function(leftVal) {
    var transAnimDef1 = {
      "100": {
        "left": leftVal,
        "stepConfig": {
          "timingFunction": kony.anim.LINEAR
        },
        "rectified": true
      }
    };
    var animConf = {
      "delay": 0,
      "iterationCount": 1,
      "fillMode": kony.anim.FILL_MODE_FORWARDS,
      "duration": 0.5
    };
    this.swipeObj = {
      definition: kony.ui.createAnimation(transAnimDef1),
      config: animConf,
      callbacks: null
    };
  }
});