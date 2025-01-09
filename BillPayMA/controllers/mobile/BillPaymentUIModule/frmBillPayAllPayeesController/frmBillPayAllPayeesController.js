define({
  segmentData:{},
  deletesegData:[],
  segmentData1:{},
  deletesegData1:[],
  searchshow:0,
  timerCounter:0,
  onNavigate:function(){
    var scope = this;
    var entryState = {};
    //     this.view.summary.setAccountIDAndAccountType(params.accountID,params.accountType,params.serviceName);
    var params = {};
    var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser;
    var userFeatures = applicationManager.getConfigurationManager().getUserFeatures();
    var userPermission = applicationManager.getConfigurationManager().getUserPermissions();
    params.entitlement = {};
    params.isCombinedUser = isCombinedUser;
    params.entitlement.features = userFeatures;
    params.entitlement.permissions = userPermission;
    var context = applicationManager.getNavigationManager().getCustomInfo("frmBillPayAllPayees");
    if(context){
      if(context.refreshComponent !== undefined){
        entryState.refreshComponent = context.refreshComponent;
      }
      if(context.deletePayee !== undefined){
        entryState.deletePayee = context.deletePayee;
        applicationManager.getNavigationManager().setCustomInfo("frmBillPayAllPayees", "");
      }
      if(context.isDeactivateBill !== undefined && context.isDeactivateBill === true){
        params.isDeactivateBill = context.isDeactivateBill;
        applicationManager.getNavigationManager().setCustomInfo("frmBillPayAllPayees", "");
      }
    }
    else
      entryState = {}; 
    if(Object.keys(entryState).length > 0){
      params.entryState = {};
      params.entryState = entryState;
    }
    this.view.manageBillerNative.setContext(params);
    this.view.manageBillerNative.setParentScope(scope);
    this.view.manageBillerNative.onError = this.onError;
  },
  
   init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"CALLBACK",currentForm, this.customBack);
    },
    preShow: function() {
    //  this.showPreshowSearch();
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxHeader.isVisible = false;
            this.view.flxScrollMain.top = "0dp";
    //       this.view.flxMainContainer.top = "0dp";
        } else {
            this.view.flxHeader.isVisible = true;
            this.view.flxScrollMain.top = "56dp";
        }
     // this.deletesegData=[];
      this.initActions();
     // this.setSegData();
     // this.checkPermissionBasedAccess();
     // this.showPopUpSuccess();
      this.view.flxMainContainer.skin="slFboxmb";
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
  
  	customBack: function() {
//   		var navMan = applicationManager.getNavigationManager();
//        navMan.goBack();
//     	if (navMan.getPreviousForm() === "frmAcknowledgement") {
//           navMan.navigateTo("frmBillPay");
//         }
//      	else {
//           navMan.goBack();
//         }   
      var BillPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      BillPayMod.presentationController.fetchBills();
    },
  
    initActions: function() {
        var scope = this;
        this.view.customHeader.flxBack.onClick = scope.customBack;
        this.view.segAccounts.onRowClick = function() {
            scope.segmentRowClick();
        }
        this.view.tbxSearch.onTouchStart = this.showSearch;
        this.view.customSearchbox.btnCancel.onClick = this.showSearch;
        this.view.customHeader.btnRight.onClick = function() {
            var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
          billPayMod.presentationController.commonFunctionForNavigation("frmBillPay");
        }
        this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
        this.view.btnAddPayee.onClick = function() {
         var navManager = applicationManager.getNavigationManager();
          navManager.setEntryPoint("createBillPayPayee","frmBillPayAllPayees");
          var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
          billPayMod.presentationController.setFlowType("createBillPayPayee");
          billPayMod.presentationController.clearBillPayPayeeData();
          billPayMod.presentationController.commonFunctionForNavigation("frmBillPaySearchPayee");
        }
    },
  addPayee: function() {
         var navManager = applicationManager.getNavigationManager();
          navManager.setEntryPoint("createBillPayPayee","frmBillPayAllPayees");
          var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
          billPayMod.presentationController.setFlowType("createBillPayPayee");
          billPayMod.presentationController.clearBillPayPayeeData();
          billPayMod.presentationController.commonFunctionForNavigation("frmBillPaySearchPayee");
        },
  
  checkPermissionBasedAccess : function(){
      var self = this;
      var createPayeePermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE_PAYEES");
      var viewPayeePermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES");

      if(createPayeePermission){
        self.view.btnAddPayee.isVisible = true;
      }else{
        self.view.btnAddPayee.isVisible = false;
      }
     
      if(viewPayeePermission && this.segmentData.length > 0){
        self.view.flxNoTransactions.isVisible=false;
        self.view.segAccounts.isVisible = true;
      }else{
        self.view.flxNoTransactions.isVisible=true;
        self.view.segAccounts.isVisible = false;
      }

    },
	
	rowClickCallBack: function(selectedPayeeData){
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmBillPayPayeeDetails", selectedPayeeData);
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.commonFunctionForNavigation("frmBillPayPayeeDetails");
    },
	
    segmentRowClick: function() {
        var rowid=this.view.segAccounts.selectedRowIndex[1];
        var configManager = applicationManager.getConfigurationManager();
      var selectedPayeeDetails;
      if(configManager.isCombinedUser === "true"){
        if(this.view.flxHeaderSearchbox.isVisible === true){
          selectedPayeeDetails = this.view.segAccounts.data[rowid];
        }else{
                 if(!kony.sdk.isNullOrUndefined(this.view.segAccounts.selectedRowIndex[1]) || !kony.sdk.isNullOrUndefined(this.view.segAccounts.selectedRowIndex[0][1])){
        //selectedPayeeDetails=this.view.segAccounts.selectedRowIndex[0][1][this.view.segAccounts.selectedRowIndex[1]];
         selectedPayeeDetails=this.view.segAccounts.data[this.view.segAccounts.selectedRowIndex[0]][1][this.view.segAccounts.selectedRowIndex[1]];
      }
        }
      }else{
        selectedPayeeDetails = this.view.segAccounts.data[rowid];
      }
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        var segmentData=billPayMod.presentationController.navToPayeeDetails(selectedPayeeDetails,"frmBillPayPayeeDetails");
    },
	tbxSearchOnTextChange:function(){
        var scope=this;
      	var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        var data = this.segmentData;
        var searchSegmentData=applicationManager.getDataProcessorUtility().commonSegmentSearch("payeeNickName",searchtext,data);
        this.deletesegData=searchSegmentData;
        for (var i = 0; i < searchSegmentData.length; i++) {
          searchSegmentData[i].flxDelete={};
        }
        for(var i=0;i<searchSegmentData.length;i++){
          searchSegmentData[i].flxDelete.onClick = scope.deleteCallback;
        }
        //searchSegmentData=newSegmentData;
      	if(searchSegmentData.length===0){
      		this.view.flxNoTransactions.isVisible=true;
        	this.view.segAccounts.isVisible=false;
		}
		else{
    	    this.view.flxNoTransactions.isVisible=false;
	        this.view.segAccounts.isVisible=true;
      		this.view.segAccounts.setData(searchSegmentData);
        }
    },
   /* showSearch: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            if (this.view.flxHeaderSearchbox.isVisible == true) {
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxSearch.isVisible = true;
                this.view.flxMainContainer.top = "56dp";
            } else {
                this.view.flxSearch.isVisible = false;
                this.view.flxMainContainer.top = "40dp";
                this.view.flxHeaderSearchbox.isVisible = true;
                this.view.customSearchbox.tbxSearch.setFocus(true);
                this.setSegData();
            }
        } else {
            if (this.view.flxHeaderSearchbox.isVisible == true) {
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxSearch.isVisible = true;
                this.view.flxHeader.isVisible = true;
                this.view.flxMainContainer.top = "56dp";
            } else {
                this.view.flxSearch.isVisible = false;
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "40dp";
                this.view.flxHeaderSearchbox.isVisible = true;
                this.view.customSearchbox.tbxSearch.setFocus(true);
            }
        }
    },*/
    showSearch: function() {
        if (this.view.flxHeaderSearchbox.isVisible === true) {
          this.searchshow=1;
        		if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        			this.view.flxHeader.isVisible = false;
                   this.view.flxHeaderSearchbox.isVisible = false;
          		this.view.flxMainContainer.skin="slFboxmb";
                  this.view.flxSearch.isVisible = true;
              	this.view.segAccounts.setData(this.segmentData);
      			}
      			else{
                  this.view.flxMainContainer.skin="slFboxmb";
                  this.view.flxMainContainer.top = "0dp";
        			this.view.flxHeader.isVisible = true;
                  this.view.flxSearch.isVisible = true;
                   this.view.flxHeaderSearchbox.isVisible = false;
              	this.view.segAccounts.setData(this.segmentData);
      			}
        		if(this.segmentData.length===0){
      				this.view.flxNoTransactions.isVisible=true;
        			this.view.segAccounts.isVisible=false;
      			}
              	else{
                  try{
         		   	this.view.flxNoTransactions.isVisible=false;
        			this.view.segAccounts.isVisible=true;
                    this.deletesegData=this.segmentData;
                    var configManager = applicationManager.getConfigurationManager();
                    if(configManager.isCombinedUser === "true"){
                      if(this.searchshow===1){
                        this.view.segAccounts.setData(this.segmentData1);
                      }else{
                        this.view.segAccounts.setData(this.segmentData);
                      }
                    }else{
                      this.view.segAccounts.setData(this.segmentData);
                    }
                }catch(er){
                  kony.print(er);
                }
        		}
            } else {
                var scope = this;
              this.searchshow=0;
              this.view.flxMainContainer.skin="sknFlxffffffmb";
              	this.view.customSearchbox.tbxSearch.text="";
              	this.view.flxSearch.isVisible = false;
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "0dp";
                this.view.flxHeaderSearchbox.isVisible = true;
                kony.timer.schedule("timerId", function() {
                           scope.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.2, false);
            }
    },
  setSegData:function(){
    try{
     var scope=this;
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    //var segmentData=billPayMod.presentationController.getAllBillPayPayees();
    var segmentData=[];
     var segmentData1=[];
        //var i;
        //var newSegmentData=[];
        segmentData=billPayMod.presentationController.getAllBillPayPayees();
        var configManager = applicationManager.getConfigurationManager();
        var orgAccounts={};
        if(configManager.isCombinedUser === "true"){
          orgAccounts = {
            "Personal Payee": [],
            "Business Accounts": []
          };
          for (var i = 0; i < segmentData.length; i++) {
            if (segmentData[i].isBusinessPayee === "1") {
              orgAccounts["Business Accounts"].push(segmentData[i]);
            } else {
              orgAccounts["Personal Payee"].push(segmentData[i]);
            }
          }
          for (var key in orgAccounts) {
             var headerJson = {
              "template": "flxBillPayHeader",
              "flximgUp": {"isVisible": true},
              "imgUpArrow":{"src":"arrowup.png"},
              "lblHeader": {"text": key +" ("+orgAccounts[key].length+")"}
            };

            for ( i = 0; i < orgAccounts[key].length; i++) {
              orgAccounts[key][i].flxDelete={};
              if(orgAccounts[key][i]["eBillSupport"]==="true")
              {
                if(orgAccounts[key][i]["eBillStatus"]==="1")
                {
                  orgAccounts[key][i]["imgebill"]={
                    "src":"ebill.png",
                    "isVisible":true
                  };
                }
                else{
                  orgAccounts[key][i]["imgebill"]={
                    "src":"ebillinactive.png",
                    "isVisible":true
                  };
                }
              }
              else{
                orgAccounts[key][i]["imgebill"]={
                  //"src":"ebillinactive.png",
                  "isVisible":false
                };
              }
              if(orgAccounts[key][i]["isBusinessPayee"]==="1"){
                orgAccounts[key][i]["imgAccountType"]={
                  "src":"businessaccount.png"
                }
              }else{
                orgAccounts[key][i]["imgAccountType"]={
                  "src":"personalaccount.png"
                }
              }
              orgAccounts[key][i]["flxAccountType"]={
                "isVisible":true
              };
              orgAccounts[key][i]["flxbill"]={
                "Left":"7%",
                "Width":"50%"
              };
              orgAccounts[key][i]["flxDelete"]={onClick:scope.deleteCallback};
            }
            segmentData1.push([headerJson,orgAccounts[key]]);
          }

          this.view.segAccounts.widgetDataMap = {
            "lblAccountName":"payeeNickName",
            "lblAccountBal":"",
            "lblBankName":"addressLine1",
            "lblAccountBalValue":"",
            "template": "flxAccountsNoImage",
            "flxDelete":"flxDelete",
            "flxMain":"flxMain",
            "imgebill":"imgebill",
            "lblAccountNumber":"",
            "flxAccountType":"flxAccountType",
            "imgAccountType":"imgAccountType",
            "flxHeader": "flxHeader",
            "flxHeaderShadow": "flxHeaderShadow",
            "lblHeader": "lblHeader",
            "flxImgUp":"flxImgUp",
            "imgUpArrow":"imgUpArrow",
            "flxbill":"flxbill"
          };

          if(segmentData1.length===0){
            this.view.flxNoTransactions.isVisible=true;
            this.view.segAccounts.isVisible=false;
          }
          else{
            var viewPayeePermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES");
            if (viewPayeePermission) {
              this.view.flxNoTransactions.isVisible=false;
              this.view.segAccounts.isVisible=true;
              this.view.segAccounts.setData(segmentData1);
            }else{
              this.view.flxNoTransactions.isVisible=true;
              this.view.segAccounts.isVisible=false; 
            }
          }
          this.deletesegData=segmentData;
          this.segmentData=segmentData;
          this.deletesegData1=segmentData1;
          this.segmentData1=segmentData1;

        }
      	else{
    this.view.segAccounts.widgetDataMap = {
            "lblAccountName":"payeeNickName",
            "lblAccountBal":"",
            "lblBankName":"addressLine1",
            "lblAccountBalValue":"",
			"template": "flxAccountsNoImage",
            "flxDelete":"flxDelete",
            "flxMain":"flxMain",
  			"imgebill":"imgebill",
            "lblAccountNumber":"",
            "flxAccountType":"flxAccountType",
            "imgAccountType":"imgAccountType",
            "flxbill":"flxbill"
        	};
      //var newSegmentData=[];
      //segmentData=billPayMod.presentationController.getAllBillPayPayees();
      for (var i = 0; i < segmentData.length; i++) {
        segmentData[i].flxDelete={};
         if(segmentData[i]["eBillSupport"]==="true")
      {
        if(segmentData[i]["eBillStatus"]==="1")
          {
          segmentData[i]["imgebill"]={
            "src":"ebill.png",
            "isVisible":true
          };
          }
        else
          segmentData[i]["imgebill"]={
            "src":"ebillinactive.png",
            "isVisible":true
          };
      }
      else{
        segmentData[i]["imgebill"]={
            //"src":"ebillinactive.png",
            "isVisible":false
          };
      }
         segmentData[i]["flxAccountType"]={
              //"src":"ebillinactive.png",
              "isVisible":false
            };
            segmentData[i]["flxbill"]={
              "left":"0%",
              "width":"60%"
            };
      }
      for(var i=0;i<segmentData.length;i++){
        segmentData[i].flxDelete.onClick = scope.deleteCallback;
      }
      //segmentData=newSegmentData;
      if(segmentData.length===0){
        this.view.flxNoTransactions.isVisible=true;
        this.view.segAccounts.isVisible=false;
      }
      else{
                var viewPayeePermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES");
         if (viewPayeePermission) {
        this.view.flxNoTransactions.isVisible=false;
        this.view.segAccounts.isVisible=true;
        this.view.segAccounts.setData(segmentData);
         }else{
          this.view.flxNoTransactions.isVisible=true;
        this.view.segAccounts.isVisible=false; 
         }
      }
    this.deletesegData=segmentData;
    this.segmentData=segmentData;
 }
      }
    catch(er){
        kony.print(er)
      }
  },
 showPreshowSearch:function(){
  		if (this.view.flxHeaderSearchbox.isVisible === true) {
             this.view.flxHeaderSearchbox.isVisible = false;
             this.view.flxSearch.isVisible = true;
          	 this.view.flxHeader.isVisible = true;
             this.view.flxMainContainer.top = "56dp";
        }
  },
  showPopUpSuccess:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    if(billPayMod.presentationController.isDeleteSuccess){
      this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.deleteBillPayPayeeSuccess"));
      billPayMod.presentationController.isDeleteSuccess = false;
    }
    if(billPayMod.presentationController.isUpdateNickNameSuccess){
     // this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.updateBillPayPayeeNickNameSuccess"));
      billPayMod.presentationController.isUpdateNickNameSuccess = false;
    }
    if(billPayMod.presentationController.isUpdateAddressSuccess){
      //this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.updateBillPayPayeeAddressSuccess"));
      billPayMod.presentationController.isUpdateAddressSuccess = false;
    }
    if(billPayMod.presentationController.isPayeeAdded){
      //this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.addedBillPayPayeeAddressSuccess"));
      billPayMod.presentationController.isPayeeAdded = false;
    }  //Replaced toast with frmAcknowledgment
  },
    bindGenericSuccess : function(msg){
    	applicationManager.getPresentationUtility().dismissLoadingScreen();
    	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg);
  	},
  deleteCallback:function(){
    var scope=this;
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
//     var rowid=scope.view.segAccounts.selectedRowIndex[1];
//     var selectedPayeeDetails = scope.view.segAccounts.data[rowid];
    var rowid= scope.view.segAccounts.selectedIndex[1];
    var configManager = applicationManager.getConfigurationManager();
      var selectedPayeeDetails;
      if(configManager.isCombinedUser === "true"){
        if(this.view.flxHeaderSearchbox.isVisible === true){
          selectedPayeeDetails = this.view.segAccounts.data[rowid];
        }else{
           if(!kony.sdk.isNullOrUndefined(this.view.segAccounts.selectedRowIndex[1]) || !kony.sdk.isNullOrUndefined(this.view.segAccounts.selectedRowIndex[0][1])){
        //selectedPayeeDetails=this.view.segAccounts.selectedRowIndex[0][1][this.view.segAccounts.selectedRowIndex[1]];
         selectedPayeeDetails=this.view.segAccounts.data[this.view.segAccounts.selectedRowIndex[0]][1][this.view.segAccounts.selectedRowIndex[1]];
      }
        }
      }else{
        selectedPayeeDetails = this.view.segAccounts.data[rowid];
      }
     //selectedPayeeDetails=scope.deletesegData[rowid];
    billPayMod.presentationController.setBillPayPayeeData(selectedPayeeDetails);
    var basicConfig = {message: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.deleteRecipient","Do you want to delete the recipient"),
                       alertIcon:null,
                       alertType: constants.ALERT_TYPE_CONFIRMATION,
                       yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                       noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                       alertHandler: scope.deleteHandler
                      };
    var pspConfig = {};
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
  },
    deleteHandler:function(response){
      if(response === true){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.deleteBillPayPayee();
      }
    },
	
	onError: function(err){
     kony.application.dismissLoadingScreen();
    kony.print(JSON.stringify(err));
  },
  
  payBill: function(selectedPayeeData){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.navAfterSelectPayee(selectedPayeeData);
  },
  
  editBill: function(selectedPayeeDate){
   kony.print(JSON.stringify("Edit Bill is clicked : "+ selectedPayeeDate.toString()));
  },
});