define({
 transferType: '',
 segmentData:null,
 data:null,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
   preShow: function() {
  //  applicationManager.getPresentationUtility().dismissLoadingScreen();   
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
     this.clearTextBox();
     this.showPreshowSearch();
     this.initActions();
     this. segmentDataSet();
     this.view.tbxSearch.text = "";
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     var navManager = applicationManager.getNavigationManager();
     var currentForm=navManager.getCurrentForm();
     applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function() {
    this.view.customHeader.flxBack.onClick = function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    }
    this.view.customHeader.btnRight.onClick =this.cancelOnClick;
    this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
    this.view.tbxSearch.onTouchStart = this.showSearch;
    this.view.customSearchbox.btnCancel.onClick = this.showSearch;
    this.view.segRecipients.onRowClick = this.chooseRecep;
    this.view.btnAddRecipient.onClick = this.onClickNew;
  },
  clearTextBox : function(){
    
  },

  cancelOnClick:function()
  {
    var navMan=applicationManager.getNavigationManager();
      navMan.navigateTo("frmTransactionModeEurope");
  },
  segmentDataSet:function()
  {
    	var segmentData=[];
        var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    	segmentData = transferModulePresentationController.getAllInternationalBenificiaries();    
          if(segmentData.length===0){
      		this.view.flxNoTransactions.isVisible=true;
        	this.view.segRecipients.isVisible=false;
            this.view.flxWelcome.isVisible=false;
      	}
      	else{
            this.view.flxNoTransactions.isVisible=false;
        	this.view.segRecipients.isVisible=true;
             this.view.flxWelcome.isVisible=true;
         var dataMap = {
                "lblTransactionMode": "lblTransactionMode",
                "lblTransactionModeDescription": "lblTransactionModeDescription",
                "lblSwiftCode":"lblSwiftCode",
                "imgArrow":"imgArrow"
            };
          var data = [];
       	for(var i=0;i<segmentData.length;i++){
          var dataObject ={
          "imgArrow": "chevron.png",
          "lblSwiftCode": segmentData[i].swiftCode,
          "lblTransactionMode":segmentData[i].beneficiaryName,
          "lblTransactionModeDescription":segmentData[i].accountNumber
        };
       data.push(dataObject);
       this.view.segRecipients.widgetDataMap = dataMap;
       this.view.segRecipients.setData(data);   
       this.data = data;
     }
   }    
   this.segmentData = segmentData;  
  },
  
  	tbxSearchOnTextChange:function(){
      	var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
    	var searchSegmentData=null;
      	 	var data = this.segmentData;
			var newSegmentData = applicationManager.getDataProcessorUtility().commonSegmentSearch("nickName",searchtext,data);
          	searchSegmentData=newSegmentData;
      	if(searchSegmentData.length===0){
      		this.view.flxNoTransactions.isVisible=true;
        	this.view.segRecipients.isVisible=false;
            this.view.flxWelcome.isVisible=false;
		}
		else{
    	    this.view.flxNoTransactions.isVisible=false;
	        this.view.segRecipients.isVisible=true;
            this.view.flxWelcome.isVisible=true;
             var dataMap = {
                "lblTransactionMode": "lblTransactionMode",
                "lblTransactionModeDescription": "lblTransactionModeDescription",
                "lblSwiftCode":"lblSwiftCode",
                "imgArrow":"imgArrow"
            };
          var searchdata = [];
       	for(var i=0;i<searchSegmentData.length;i++){
          var dataObject ={
          "imgArrow": "chevron.png",
          "lblSwiftCode": searchSegmentData[i].swiftCode,
          "lblTransactionMode":searchSegmentData[i].beneficiaryName,
          "lblTransactionModeDescription":searchSegmentData[i].accountNumber
        };
       searchdata.push(dataObject);
       this.view.segRecipients.widgetDataMap = dataMap;
       this.view.segRecipients.setData(searchdata);  
		}
       }   
  	},
  
   showSearch: function() {
        if (this.view.flxHeaderSearchbox.isVisible === true) {
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxMainContainer.skin = "slFSboxmb";
                	this.view.segRecipients.setData(this.data);
        		if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        			this.view.flxHeader.isVisible = false;
                  this.view.flxMainContainer.top = "0dp";
      			}
      			else{
        			this.view.flxHeader.isVisible = true;
                  this.view.flxMainContainer.top = "56dp";
      			}
                if(this.data.length===0){
      				this.view.flxNoTransactions.isVisible=true;
        			this.view.segRecipients.isVisible=false;
                    this.view.flxWelcome.isVisible=false;
      			}
              	else{
         		   	this.view.flxNoTransactions.isVisible=false;
        			this.view.segRecipients.isVisible=true;
                    this.view.flxWelcome.isVisible=true;
              		this.deletesegData=this.segmentData;
        			this.view.segRecipients.setData(this.data);
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
      this.view.tbxSearch.text = "";
    },
  
  chooseRecep : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var index = this.view.segRecipients.selectedIndex[1];
    var data = this.view.segRecipients.data[index];
    var accountNumber = data.lblTransactionModeDescription;
    var navMan=applicationManager.getNavigationManager();
    var accdata=  navMan.getCustomInfo("frmTransfersToAccount");
    accdata.addedFlag = "false";
    accdata.isNewRecipient = "false";
    accdata.transactionType = "To International Accounts";
    accdata.type = "To International Accounts";
    if(kony.sdk.isNullOrUndefined(accdata.selectedAccountData))
        accdata.selectedAccountData = {};
    accdata.selectedAccountData.accountNumber=accountNumber;
    accdata.selectedAccountData.beneficiaryName = data.lblTransactionMode;
    accdata.selectedAccountData.swiftCode = data.lblSwiftCode;
    accdata.selectedAccountData.bankName = "Infinity";
    accdata.selectedAccountData.isInternationalAccount = "true";
    accdata.selectedAccountData.isSameBankAccount = "false";
    navMan.setCustomInfo("frmTransfersToAccount",accdata);
    var trasMan = applicationManager.getTransactionManager();
    trasMan.setTransactionAttribute("transactionType","ExternalTransfer");
    trasMan.setTransactionAttribute("transferType","international");
    var TransModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    TransModPresentationController.navAfterToAcc();
    //navMan.navigateTo("frmTransfersRecipientNameEurope");
  },
  onClickNew : function() {
        var type = "To International Accounts";
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
        transferModPresentationController.transactionMode = type;
        transferModPresentationController.showAccounts(type);
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
    bindGenericError : function(msg){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
    }
});