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
	    this.showSuccessMessage();
//         this.view.btnAddRecipient.setVisibility(false);
        this.view.flxBg.setVisibility(false);
        this.setNoPayeeLabel();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    initActions: function() {
        var scope = this;
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
          var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
          transferModulePresentationController.commonFunctionForNavigation("frmTransfers");
        };
        this.view.btnAddRecipient.onClick=function(){
          var navManager = applicationManager.getNavigationManager();
          var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
         /* if(p2pMod.presentationController.getFlowType()==="P2P"){
            var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
            navManager.presentationController.setEntryPoint("createP2PPayee","frmManageRecipientList");
            p2pMod.presentationController.clearP2PPayeeData();
            p2pMod.presentationController.commonFunctionForNavigation("frmRegP2PContactType");
          }
          var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
          if(transferModulePresentationController.getFlowType()==="OtherBankRecipients"){
          	var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
            navManager.setEntryPoint("createInternalBankBenificiary","frmTransfersManageRecipientList");
            transferModulePresentationController.clearBenificiaryData();
            transferModulePresentationController.clearBuilderNonGeneratedAttributes();
            transferModulePresentationController.commonFunctionForNavigation("frmtransfersIBANEurope");
          }
          if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
            applicationManager.getPresentationUtility().showLoadingScreen();
      		var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
            navManager.setEntryPoint("createInternalBankBenificiary","frmTransfersManageRecipientList");
            transferModulePresentationController.clearBenificiaryData();
			transferModulePresentationController.clearBuilderNonGeneratedAttributes();
          //  transferModule.fetchCountriesList();
            transferModulePresentationController.commonFunctionForNavigation("frmBenSwiftCodeEurope");
    	 }*/
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("createEuropeExternalBenificiaries","frmTransfersManageRecipientList");
    transMod.enterAddRecipientFlow();
        };
    },
	tbxSearchOnTextChange:function(){
     var scope=this;
      	var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
    	var searchSegmentData=null;
      	 	var data = this.segmentData;
			var newSegmentData = applicationManager.getDataProcessorUtility().multipleCommonSegmentSearch(["nickName","beneficiaryName","accountNumber","IBAN", "bankName", "swfitCode"],searchtext,data);
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
            this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.NoBeneficiary") + " '" + this.view.customSearchbox.tbxSearch.text + "'";
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
    var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
    var dataMap=this.getDataMap(transferModulePresentationController.getFlowType());
    this.view.segRecipients.widgetDataMap = dataMap;
    var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
    if(p2pMod.presentationController.getFlowType()==="P2P"){
      var newSegmentData=[];
      newSegmentData=p2pMod.presentationController.getAllP2PPayees();
      for (var i = 0; i < newSegmentData.length; i++) {
        newSegmentData[i].flxDelete={};
      }
      for(var i=0;i<newSegmentData.length;i++){
         newSegmentData[i].flxDelete.onClick = scope.deleteCallback;
      }
          segmentData=newSegmentData;
			for(var i=0;i<segmentData.length;i++){
				//segmentData[i].fullName=segmentData[i].name+" "+segmentData[i].lastName;
              	//segmentData[i].type=type;
                if(segmentData[i].phone==="" ||segmentData[i].phone===null ||segmentData[i].phone===undefined )
                {
                  segmentData[i].phone=segmentData[i].email;
                }
                if(segmentData[i].nickName==="" ||segmentData[i].nickName===null ||segmentData[i].nickName===undefined )
                {
                  segmentData[i].nickName=segmentData[i].name;
                }
			}
		}
		if(transferModulePresentationController.getFlowType()==="OtherBankRecipients"){
          	var newSegmentData=[];
          	var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
    		newSegmentData=transferModulePresentationController.getAllExternalBankBenificiaries();
          	for (var i = 0; i < newSegmentData.length; i++) {
        		newSegmentData[i].flxDelete={};
      		}
      		for(var i=0;i<newSegmentData.length;i++){
         		newSegmentData[i].flxDelete.onClick = scope.deleteCallback;
      		}
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
            }
        }
		if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
          	var newSegmentData=[];
          	var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
    		newSegmentData=transferModulePresentationController.getAllInternalBankBenificiaries();
            for (var i = 0; i < newSegmentData.length; i++) {
        		newSegmentData[i].flxDelete={};
      		}
      		for(var i=0;i<newSegmentData.length;i++){
         		newSegmentData[i].flxDelete.onClick = scope.deleteCallback;
      		}
          	segmentData=newSegmentData;
          	for(var i=0;i<segmentData.length;i++){
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
            }
        }
        if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
          	var newSegmentData=[];
      		var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
    		newSegmentData=transferModulePresentationController.getAllInternationalBenificiaries();
            for (var i = 0; i < newSegmentData.length; i++) {
        		newSegmentData[i].flxDelete={};
      		}
      		for(var i=0;i<newSegmentData.length;i++){
         		newSegmentData[i].flxDelete.onClick = scope.deleteCallback;
      		}
          	segmentData=newSegmentData;
          	for(var i=0;i<segmentData.length;i++){
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
    var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
    var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
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
        var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
        var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
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
            "lblAccountBal":"accountType",
            "lblBankName":"",
            "lblAccountBalValue":"",
			"template": "flxAccountsNoImage",
            "type":"type",
            "flxDelete":"flxDelete",
            "flxMain":"flxMain"
        	};
      	}
      if(type==="OtherBankRecipients"){
        dataMap = {
         "imgBank": "imgBank",
          "lblAccountName":"nickName",
          "lblBankName": "bankName",
          "lblAccountBalValue": "",
        //  "lblAccountBal":"accountType",
          "template": "flxAccounts",
		  "type":"type",
          "flxDelete":"flxDelete",
          "flxMain":"flxMain"
        };
      }
     if(type==="InternationalRecipients"){
        dataMap = {
          "lblAccountName":"nickName",
          "lblBankName": "bankName",
           "lblAccountBalValue": "",
        //  "lblAccountBal":"accountType",
          "template": "flxAccounts",
		  "type":"type",
          "flxDelete":"flxDelete",
          "flxMain":"flxMain"
        };
      }
      if(type==="P2P"){
       dataMap = {
            "lblAccountName":"nickName",
            "lblBankName":"phone",
            "lblAccountBalValue":"",
            "lblAccountBal":"",
            "template": "flxAccountsNoImage",
			"type":"type",
            "flxDelete":"flxDelete",
            "flxMain":"flxMain"
        };
      }
   	  	return dataMap;
  	},
	segmentRowClick: function() {
	  applicationManager.getPresentationUtility().showLoadingScreen();
      var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
      var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
	 if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
		var rowid=this.view.segRecipients.selectedRowIndex[1];
		var selectedAccountDetails = this.view.segRecipients.data[rowid];
        var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
      	transferModulePresentationController.getBenificiaryScheduledAndPostedTransactions(selectedAccountDetails);
     }
     if(transferModulePresentationController.getFlowType()==="OtherBankRecipients"){
		var rowid=this.view.segRecipients.selectedRowIndex[1];
		var selectedAccountDetails = this.view.segRecipients.data[rowid];
		var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
        transferModulePresentationController.getBenificiaryScheduledAndPostedTransactions(selectedAccountDetails);
      }
    if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
      	applicationManager.getPresentationUtility().showLoadingScreen();
        var rowid=this.view.segRecipients.selectedRowIndex[1];
		var selectedAccountDetails = this.view.segRecipients.data[rowid];
    	var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
    	transferModulePresentationController.getBenificiaryScheduledAndPostedTransactions(selectedAccountDetails);
      }
    if(p2pMod.presentationController.getFlowType()==="P2P"){
	    var rowid=this.view.segRecipients.selectedRowIndex[1];
	    var selectedAccountDetails = this.view.segRecipients.data[rowid];
	    p2pMod.presentationController.navToP2PRecipientDetails(selectedAccountDetails);
     }
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
 showSuccessMessage : function(){
//    var navManager = applicationManager.getNavigationManager();
//    var benificiaryList=navManager.getCustomInfo("frmManageRecipientList");
   var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
   if(p2pMod.presentationController.getFlowType()==="P2P"){
     if(p2pMod.presentationController.isDeleteDone){
       this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.p2p.deleteRecipient"));
       p2pMod.presentationController.isDeleteDone=false;
     }
     if(p2pMod.presentationController.isNickNameUpdated){
       this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.successUpdate"));
       p2pMod.presentationController.isNickNameUpdated = false;
     }
     if(p2pMod.presentationController.isPayeeAdded){
       this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.addBenificiary"));
       p2pMod.presentationController.isPayeeAdded = false;
     }
   }
   var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule")
    if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
     if(scope_TransfersPresentationController.sameBankBenificiaryAdded){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.addBenificiary","Successfully recipient was added"));
       	scope_TransfersPresentationController.sameBankBenificiaryAdded=false;
     }
     if(scope_TransfersPresentationController.isNickNameUpdated){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.successUpdate","Successfully recipient nick name was updated"));
       	scope_TransfersPresentationController.isNickNameUpdated=false;
     }
     if(scope_TransfersPresentationController.isRecipientDeleted){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.deleteBenificiary","Successfully recipient deleted permanently"));
       	scope_TransfersPresentationController.isRecipientDeleted=false;
     }
    }
   else if(transferModulePresentationController.getFlowType()==="OtherBankRecipients"){
     if(scope_TransfersPresentationController.otherBankBenificiaryAdded){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.addBenificiary","Successfully recipient was added"));
       scope_TransfersPresentationController.otherBankBenificiaryAdded=false;
     }
     if(scope_TransfersPresentationController.isNickNameUpdated){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.successUpdate","Successfully recipient nick name was updated"));
       	scope_TransfersPresentationController.isNickNameUpdated=false;
     }
     if(scope_TransfersPresentationController.isRecipientDeleted){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.deleteBenificiary","Successfully recipient deleted permanently"));
       	scope_TransfersPresentationController.isRecipientDeleted=false;
     }
   }
  else if (transferModulePresentationController.getFlowType() === "InternationalRecipients"){
     if(scope_TransfersPresentationController.internationalBenificiaryAdded){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.addBenificiary","Successfully recipient was added"));
       	scope_TransfersPresentationController.internationalBenificiaryAdded=false;
     }
     if(scope_TransfersPresentationController.isNickNameUpdated){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.successUpdate","Successfully recipient nick name was updated"));
       	scope_TransfersPresentationController.isNickNameUpdated=false;
     }
     if(scope_TransfersPresentationController.isRecipientDeleted){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.deleteBenificiary","Successfully recipient deleted permanently"));
       	scope_TransfersPresentationController.isRecipientDeleted=false;
     }
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
  }
});
