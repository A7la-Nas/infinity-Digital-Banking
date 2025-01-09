define(['InfinityComponents/ParserUtilsManager'],function(ParserUtilsManager){ 
  return {
  contextData:{},
  	segmentData:null,
  	recentPayees:null,
  	allPayees:null,
    segmentData1:null,
  	searchshow:0,
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function() {
      this.view.flxMainContainer.showFadingEdges = false;
      
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxHeader.isVisible = false;
        this.view.flxSearch.top="0dp";
        this.resetSearchData();
        this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxSearch.isVisible = true;
        this.view.flxMainContainer.top = "0dp";
      }
      else{
         this.view.flxHeader.isVisible = true;
      }
      this.view.flxMainContainer.skin="slfSbox";
     
      this.resetSearch();
      this.initActions();
      this.showPopUpSuccess();
      this.checkPermissionBasedAccess();
      try{
        this.setSegmentData();
     }catch(er){
      }
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
 
  initActions: function() {
    var scope = this;
    this.view.customHeader.flxBack.onClick = function() {
      var navMan=applicationManager.getNavigationManager();
        navMan.goBack();
    };
       this.view.tbxSearch.onTouchStart = this.showSearch;
       this.view.customSearchbox.btnCancel.onClick = this.showSearch;
       this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
       this.view.btnAddPayee.onClick = function(){
         var navManager = applicationManager.getNavigationManager();
         navManager.setEntryPoint("createBillPayPayee","frmBillPaySelectPayee");
         var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
         billPayMod.presentationController.setFlowType("createBillPayPayee");
         billPayMod.presentationController.clearBillPayPayeeData();
         billPayMod.presentationController.commonFunctionForNavigation("frmBillPaySearchPayee");
       };
       this.view.segAccounts.onRowClick=this.selectPayee;
    },
  
  continueAction: function(context){
      var navManager = applicationManager.getNavigationManager(); 
     navManager.navigateTo("frmBillPayVerifyDetails",false,context);
  },
  
  continueActionEdit: function(context){
      var navManager = applicationManager.getNavigationManager(); 
     navManager.navigateTo("frmPayeeAcknowledgement",false,context);
  },
  
  checkPermissionBasedAccess : function(){
      var self = this;
      var createPayeePermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE_PAYEES");
     var viewPayeesPermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES");

      if(createPayeePermission){
       self.view.btnAddPayee.isVisible = true;
      }else{
        self.view.btnAddPayee.isVisible = false;
      }
     
      
      if(viewPayeesPermission){
       self.view.segAccounts.isVisible = true;
      }else{
        self.view.segAccounts.isVisible = false;
      }
    },
    setSegmentData: function() {
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var allPayees = billPayMod.presentationController.getAllBillPayPayees();
      var recentPayees = billPayMod.presentationController.getRecentBillPayees();
      var segmentData = [];
      var segmentData1=[];
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
                  "src":"businessaccount.png",
                   "isVisible":true
                }
              }else{
                orgAccounts[key][i]["imgAccountType"]={
                  "src":"personalaccount.png",
                  "isVisible":true
                }
              }
              orgAccounts[key][i]["flxAccountType"]={
                "isVisible":true
              };
              orgAccounts[key][i]["flxbill"]={
                "Left":"7%",
                "Width":"50%"
              };
            }
            segmentData1.push([headerJson,orgAccounts[key]]);
          }

        this.view.segAccounts.widgetDataMap = {
          lblPayeeName:"payeeNickName",
          lblAccountBal:"",
          lblPayeeInfo:"payeeNickName",
          lblAccountBalValue:"",
          imgInfo: "flxAccountsNoImage",
          imgebill:"imgebill",
          lblAccountNumber:"",
          flxAccountType:"flxAccountType",
          imgAccountType:"imgAccountType",
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
          this.segmentData=segmentData;
          this.segmentData1=segmentData1;
          this.recentPayees = recentPayees;
          this.allPayees = allPayees;
          

      }else{
         var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var allPayees = billPayMod.presentationController.getAllBillPayPayees();
      var recentPayees = billPayMod.presentationController.getRecentBillPayees();
      var segmentData = [];
      this.view.segAccounts.widgetDataMap = {
        lblHeader:"lblHeader",
        lblPayeeName:"payeeNickName",
        lblAccountBal:"",
        lblPayeeInfo:"payeeNickName",
        lblAccountBalValue:"",
        imgInfo: "flxAccountsNoImage",
        imgebill:"imgebill",
        lblAccountNumber:"",
        flxAccountType:"flxAccountType",
        imgAccountType:"imgAccountType",
      };
      for(var i=0;i<allPayees.length;i++)
    {
      allPayees[i]["flxAccountType"] = {"isVisible":false};
      allPayees[i]["imgAccountType"] = {"isVisible":false};
      if(allPayees[i]["eBillSupport"]==="true")
      {
        if(allPayees[i]["eBillStatus"]==="1")
          {
          allPayees[i]["imgebill"]={
            "src":"ebill.png",
            "isVisible":true
          };
          }
        else
          allPayees[i]["imgebill"]={
            "src":"ebillinactive.png",
            "isVisible":true
          };
      }
          else {
        allPayees[i]["imgebill"]={
            //"src":"ebillinactive.png",
            "isVisible":false
          };
      }
    }
    for(var j=0;j<recentPayees.length;j++)
    {
      recentPayees[j]["flxAccountType"] = {"isVisible":false};
      recentPayees[j]["imgAccountType"] = {"isVisible":false};
      if(recentPayees[j]["eBillSupport"]==="true")
      {
        if(recentPayees[j]["EBillEnable"]==="1")
          recentPayees[j]["imgebill"]={
            "src":"ebill.png",
            "isVisible":true
          };
        else
          recentPayees[j]["imgebill"]={
            "src":"ebillinactive.png",
            "isVisible":true
          };
      }
      else{
        //allPayees[j]["imgebill"][visbility]="false";
        //recentPayees[i]["imgebill"]=null;
        recentPayees[j]["imgebill"]={
            //"src":"ebillinactive.png",
            "isVisible":false
          };
      }
    }
      if(allPayees.length===0 && recentPayees.length==0){
        this.view.flxNoTransactions.isVisible=true;
        this.view.segAccounts.isVisible=false;
      }
      else{
        this.view.flxNoTransactions.isVisible=false;
        this.view.segAccounts.isVisible=true;
        if(recentPayees.length>0)
          segmentData.push([{"lblHeader":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.recentpayees","Recent Payees")},recentPayees]);
        if(allPayees.length>0)
          segmentData.push([{"lblHeader":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.allpayees")},allPayees]);
        this.view.segAccounts.setData(segmentData);
      }
      this.recentPayees = recentPayees;
      this.allPayees = allPayees;
      this.segmentData = segmentData;
    

      }
      
    },
    segmentRowClick: function() {
		 var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
         bPayModule.presentationController.getBillPayTransactionalLimits();
    },
    segmentRowInfoClick: function() {
    },
  	resetSearchData: function(){
      this.view.customSearchbox.tbxSearch.text = ""
      if(this.segmentData && this.segmentData.length>0){
if (this.searchshow===0) {
          this.view.customSearchbox.tbxSearch = "";
          this.view.segAccounts.setData(this.segmentData);
        } else {
          this.view.segAccounts.setData(this.segmentData);
        }
          
          this.view.segAccounts.isVisible=true;
          this.view.flxNoTransactions.isVisible=false;
        }
        else{
          this.view.segAccounts.isVisible=false;
          this.view.flxNoTransactions.isVisible=true;
        }
    },
    showSearch: function() {
      var scope = this;
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            if (this.view.flxHeaderSearchbox.isVisible === true) {
              	this.resetSearchData();
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxSearch.isVisible = true;
              	this.view.flxMainContainer.skin="slfSbox";
            } else {
                this.view.flxSearch.isVisible = false;
                this.view.flxMainContainer.top = "0dp";
                this.view.flxHeaderSearchbox.isVisible = true;
              this.view.flxMainContainer.skin="slFSbox0gff85612494c44Tab";
               // this.view.customSearchbox.tbxSearch.setFocus(true);
              kony.timer.schedule("timerId", function() {
                           scope.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.2, false);
            }
        } else {
            if (this.view.flxHeaderSearchbox.isVisible === true) {
                this.searchshow=0;
              	this.resetSearchData();
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxSearch.isVisible = true;
                this.view.flxHeader.isVisible = true;
            } else {
                this.view.flxSearch.isVisible = false;
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "0dp";
                this.view.flxHeaderSearchbox.isVisible = true;
              kony.timer.schedule("timerId", function() {
                           scope.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.2, false);
              //  this.view.customSearchbox.tbxSearch.setFocus(true);
            }
        }
    },
  	resetSearch:function(){
      this.view.customSearchbox.tbxSearch.text = "";
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        if (this.view.flxHeaderSearchbox.isVisible == true) {
          this.view.flxHeaderSearchbox.isVisible = false;
          this.view.flxSearch.isVisible = true;
          this.view.flxMainContainer.top = "56dp";
        }
      }else {
        if (this.view.flxHeaderSearchbox.isVisible == true) {
          this.view.flxHeaderSearchbox.isVisible = false;
          this.view.flxSearch.isVisible = true;
          this.view.flxHeader.isVisible = true;
          this.view.flxMainContainer.top = "56dp";
        }
      }
    },
  	tbxSearchOnTextChange:function(){
      var searchtext = this.view.customSearchbox.tbxSearch.text.toLowerCase();
      if(searchtext){
        this.searchshow=1;
         var data = [],headers = [];
         headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.recentpayees"));
         headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.allpayees"));
         data.push(this.recentPayees);
         data.push(this.allPayees);
         this.view.segAccounts.isVisible=true;
         this.view.flxNoTransactions.isVisible=false;
         var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
         var searchData = applicationManager.getDataProcessorUtility().commonSectionSegmentSearch("payeeNickName",searchtext,data,headers);
         if(searchData && searchData.length>0){
           this.view.segAccounts.setData(searchData);
         }
         else{
           this.view.segAccounts.isVisible=false;
           this.view.flxNoTransactions.isVisible=true;
         }
      }
      else{
        if(this.segmentData && this.segmentData.length>0){
//           var data = [];
//        	  data.push([{"lblHeader":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.allpayees")},this.segmentData]);
          if(this.searchshow===0){
            this.view.segAccounts.setData(this.segmentData1);
          }else{
            this.view.segAccounts.setData(this.segmentData);
          }
          
          this.view.segAccounts.isVisible=true;
          this.view.flxNoTransactions.isVisible=false;
        }
        else{
          this.view.segAccounts.isVisible=false;
          this.view.flxNoTransactions.isVisible=true;
        }
      }
    },
  	selectPayee:function(){
      var navMan=applicationManager.getNavigationManager();
       var selectedSectionIndex=Math.floor(this.view.segAccounts.selectedRowIndex[0]);
    var selectedRowIndex=Math.floor(this.view.segAccounts.selectedRowIndex[1]);
      var selectedPayee = this.view.segAccounts.data[selectedSectionIndex][1][selectedRowIndex];
      //navMan.setCustomInfo("frmBillPaySelectPayee",selectedPayee);
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      billPayMod.presentationController.navAfterSelectPayee(selectedPayee);
    },
   showPopUpSuccess:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    if(billPayMod.presentationController.isPayeeAdded){
      //this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.addedBillPayPayeeAddressSuccess"));
      billPayMod.presentationController.isPayeeAdded = false;
    }
  },
    bindGenericSuccess : function(msg){
    	applicationManager.getPresentationUtility().dismissLoadingScreen();
    	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg);
  	},
    bindGenericError: function (errorMsg) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var scopeObj = this;
      applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  };
});