define(['CampaignUtility'], function(CampaignUtility){
  return{
    timerCounter: 0,
    segmentData : [],
    pendingDeposits : [],
    postedDeposits : [],
    hasCheckDepositFeature:false,
    onNavigate: function() {
  },
  checkDepositInit: function() {
  	var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
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
   preShow: function() {
	if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
		this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
		this.view.customHeader.flxBack.isVisible = false;
	}
    var scope = this;
    var configManager = applicationManager.getConfigurationManager();
    this.hasCheckDepositFeature = configManager.checkUserFeature("RDC");
    this.view.flxMainContainer.skin="slFbox";
    this.view.flxMainContainer.showFadingEdges = false;
    this.view.flxGradient.top = 0 + "dp";
    this.view.flxSearch.isVisible = true;
    this.view.flxGradient.isVisible = true;
    this.view.flxNewCheckDeposit.isVisible = this.hasCheckDepositFeature;
    this.setSegmentData();
    this.addDummyRows();
    this.view.flxNewCheckDeposit.onClick = this.flxNewCheckDepositOnClick;
    this.view.tbxSearch.onTouchStart=this.showSearch;
    this.view.customSearchbox.btnCancel.onClick=this.showSearch;
    this.view.customSearchbox.tbxSearch.onTextChange=this.onSearchTextChange;
    this.view.segDepositFrom.onRowClick = this.segDepositFromOnClick;
    this.view.flxNewCheckDeposit.onTouchStart = function(){
        scope.view.imgCheckDeposit.src = "checkdeposittap.png";
      };
      this.view.flxNewCheckDeposit.onTouchEnd = function(){
        scope.view.imgCheckDeposit.src = "checkdeposit.png";
      };
     this.view.segDepositFrom.onScrolling = function () {
        scope.transactionsSegmentOnScrolling();
      };
    this.renderTitleBar();
    this.showPopupSuccess();
	this.renderFormUI();
    var scope = this;
    var MenuHandler =  applicationManager.getMenuHandler();
    MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUCHECKDEPOSIT);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
	 var checkDeposit = applicationManager.getLoggerManager();
         checkDeposit.setCustomMetrics(this, false, "RDC");
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
   renderFormUI : function(){
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                this.resetSearch();
                //this.addDummyRows();
                this.view.flxNewCheckDeposit.isVisible = this.hasCheckDepositFeature;
                this.view.flxNewCheckDeposit.top ="50dp";
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxSearch.isVisible = true;
                this.view.flxMainContainer.top = "0dp";
                 this.view.segDepositFrom.top = "150dp";
                this.view.customSearchbox.tbxSearch.text = "";
     		    this.view.tbxSearch.text = "";
                var titleBarAttributes = this.view.titleBarAttributes;
                titleBarAttributes["navigationBarHidden"] = false;
                // this.view.titleBarAttributes = titleBarAttributes;
        } else {
                this.view.flxNewCheckDeposit.isVisible = this.hasCheckDepositFeature;
                this.resetSearch();
                //this.addDummyRows();
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxSearch.isVisible = true;
                this.view.flxHeader.isVisible = true;
                this.view.customSearchbox.tbxSearch.text = "";
                this.view.tbxSearch.text = "";
                this.view.flxMainContainer.top = "56dp";
                this.view.flxNewCheckDeposit.top ="50dp";
                this.view.segDepositFrom.top = "150dp";
        }
  },
   addDummyRows: function () {
        var segWidgetDataMap = this.view.segDepositFrom.widgetDataMap;
        segWidgetDataMap["flxEmptyHeader"] = "flxEmptyHeader";
        segWidgetDataMap["flxEmptyRow"] = "flxEmptyRow";
        this.view.segDepositFrom.widgetDataMap = segWidgetDataMap;
        var segData = this.view.segDepositFrom.data;
        var segLength = 0;
       if (segData == null || segData == undefined || !(segData instanceof Array)) {
          segData = [];
        }
        for (let i = 0; i < segData.length; i++) {
            segLength = segLength + (segData[i][1].length * 70) + 49; //66 is the row height and 49 is the header height
        }
        segData.unshift([{
                "template": "flxEmptyHeader",
                "flxEmptyHeader": {
                    "height": "0dp"
                }
            },
            [{
                "template": "flxEmptyRow",
                "flxEmptyRow": {
                    "height": "145dp"
                }
            }]
        ]);
        segLength = segLength + 145;
        this.view.segDepositFrom.setData(segData);
        this.segLength = segLength;
    },
    transactionsSegmentOnScrolling: function () {
//         var parallaxSpeed = 1;
//         var yOffset = this.view.segDepositFrom.contentOffsetMeasured.y;
//         this.view.flxSearch.top = 0 - (yOffset * parallaxSpeed) + "dp";
//         this.view.flxNewCheckDeposit.top = 55 - (yOffset * parallaxSpeed) + "dp";
    },
   setFooter:function(){
    this.view.customFooter.lblAccounts.skin = "sknLblA0A0A0SSP20px";
    this.view.customFooter.flxAccSelect.setVisibility(false);
    this.view.customFooter.lblTransfer.skin = "sknLblA0A0A0SSP20px";
    this.view.customFooter.flxTransferSel.setVisibility(false);
    this.view.customFooter.lblBillPay.skin = "sknLbl424242SSP20px";
    this.view.customFooter.flxBillSelected.setVisibility(true);
    this.view.customFooter.lblMore.skin = "sknLblA0A0A0SSP20px";
    this.view.customFooter.flxMoreSelect.setVisibility(false);
  },
  renderTitleBar: function(){
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
     if (isIphone) {
        this.view.flxHeader.isVisible = false;
        this.view.flxFooter.isVisible = true;
      } else {
        this.view.flxFooter.isVisible = false;
        this.view.flxHeader.isVisible = true;
      }
     this.view.flxSearch.top = 0 + "dp";
     this.view.flxNewCheckDeposit.top = 50 + "dp";
  },
  setSegmentData : function(searchData,isOriginalSegmentData){
    var configManager = applicationManager.getConfigurationManager();
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    this.view.segDepositFrom.isVisible=true;
    this.view.flxNoTransactions.isVisible=false;
    if(isOriginalSegmentData)
    {
      this.view.segDepositFrom.setData(searchData);
    }
    else
    {
      var navMan=applicationManager.getNavigationManager();
      var depositData = {};
      if(searchData)
        depositData = searchData;
      else
        depositData =  navMan.getCustomInfo("frmCheckDeposit").depositsData;
      // depositData = depositData.filter(function(dat){return dat ? true : false;});
      var segData = [];
      var postedDepositData = [];
      var pendingDepositData = [];
      if(depositData )
      {
        pendingDepositData = depositData.pendingDepositsData;
        postedDepositData = depositData.postedDepositsData;
        if(pendingDepositData)
          pendingDepositData = pendingDepositData.filter(function(dat) {
            return dat ? true : false;
          });
        if(postedDepositData)
          postedDepositData = postedDepositData.filter(function(dat) {
            return dat ? true : false;
          });
        this.view.segDepositFrom.widgetDataMap={
          lblAccountName:"toAccountName",
          lblAccountBalValue:"amount",
          lblAccountBal:"transactionDate",
          lblHeader:"lblHeader",
          imgUpArrow : "imgUpArrow",
          flxAccountType : "flxAccountType",
          imgAccountType : "imgAccountType"
        };
        var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
        var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
        var pendingTranHeaderLabel = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingTransactions");
        var postedTranHeaderLabel = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.postedTransactions");
        applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingTransactions")
        if ((postedDepositData && postedDepositData.length > 0 )&& (pendingDepositData && pendingDepositData.length > 0)) 
        {
          if (!isSingleCustomerProfile) {
            for(var i = 0 ; i < postedDepositData.length ; i++){
              var isBusinessAccount = accountMod.presentationController.fetchIsBusinessAccount(postedDepositData[i].toAccountNumber);
              if(profileAccess=="both"){
                postedDepositData[i]["flxAccountType"] = {
                  "isVisible": true
                };
                postedDepositData[i]["imgAccountType"] = {
                  "isVisible": true,
                  "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
                };
              }else{
                postedDepositData[i]["flxAccountType"] = {
                  "isVisible": false
                };
                postedDepositData[i]["imgAccountType"] = {
                  "isVisible": true,
                  "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
                };
              }                          
            }
            for(var j = 0; j < pendingDepositData.length; j++){
              var isBusinessAccount = accountMod.presentationController.fetchIsBusinessAccount(pendingDepositData[j].toAccountNumber);
              if(profileAccess=="both"){
                pendingDepositData[j]["flxAccountType"] = {
                  "isVisible": true
                };
                pendingDepositData[j]["imgAccountType"] = {
                  "isVisible": true,
                  "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
                }; 
              }else{
                pendingDepositData[j]["flxAccountType"] = {
                  "isVisible": false
                };
                pendingDepositData[j]["imgAccountType"] = {
                  "isVisible": true,
                  "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
                };
              }

            }
          }else{
            for(var i = 0 ; i < postedDepositData.length ; i++){
              var isBusinessAccount = accountMod.presentationController.fetchIsBusinessAccount(postedDepositData[i].toAccountNumber);
              postedDepositData[i]["flxAccountType"] = {
                "isVisible": false
              };
              postedDepositData[i]["imgAccountType"] = {
                "isVisible": true,
                "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
              };
            }
            for(var j = 0; j < pendingDepositData.length; j++){
              var isBusinessAccount = accountMod.presentationController.fetchIsBusinessAccount(pendingDepositData[j].toAccountNumber);
              pendingDepositData[j]["flxAccountType"] = {
                "isVisible": false
              };
              pendingDepositData[j]["imgAccountType"] = {
                "isVisible": true,
                "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
              };
            }}
          segData=  [[{"lblHeader": pendingTranHeaderLabel,"imgUpArrow":{"src":"arrowdown.png"}},pendingDepositData],
                     [{"lblHeader": postedTranHeaderLabel,"imgUpArrow":{"src":"arrowdown.png"} },postedDepositData]];
        }
        else if(pendingDepositData && pendingDepositData.length>0)
        {
          if (!isSingleCustomerProfile) {
            for(var j = 0; j < pendingDepositData.length; j++){
              var isBusinessAccount = accountMod.presentationController.fetchIsBusinessAccount(pendingDepositData[j].toAccountNumber);
              if(profileAccess=="both"){
                pendingDepositData[j]["flxAccountType"] = {
                  "isVisible": true
                };
                pendingDepositData[j]["imgAccountType"] = {
                  "isVisible": true,
                  "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
                };
              }else{
                pendingDepositData[j]["flxAccountType"] = {
                  "isVisible": false
                };
                pendingDepositData[j]["imgAccountType"] = {
                  "isVisible": true,
                  "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
                }; 
              }

            }
          }else{
            for(var j = 0; j < pendingDepositData.length; j++){
              var isBusinessAccount = accountMod.presentationController.fetchIsBusinessAccount(pendingDepositData[j].toAccountNumber);
              pendingDepositData[j]["flxAccountType"] = {
                "isVisible": false
              };
              pendingDepositData[j]["imgAccountType"] = {
                "isVisible": true,
                "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
              }; 
            }
          }	
          segData =  [[{"lblHeader": pendingTranHeaderLabel,"imgUpArrow":{"src":"arrowdown.png"}},pendingDepositData]];
        }
        else if(postedDepositData && postedDepositData.length>0)
        {
          if (!isSingleCustomerProfile) {
            for(var i = 0 ; i < postedDepositData.length ; i++){
              var isBusinessAccount = accountMod.presentationController.fetchIsBusinessAccount(postedDepositData[i].toAccountNumber);
              if(profileAccess=="both"){
                postedDepositData[i]["flxAccountType"] = {
                  "isVisible": true
                };
                postedDepositData[i]["imgAccountType"] = {
                  "isVisible": true,
                  "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
                };
              }else{
                postedDepositData[i]["flxAccountType"] = {
                  "isVisible": false
                };
                postedDepositData[i]["imgAccountType"] = {
                  "isVisible": true,
                  "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
                };
              }

            }
          }else{
            for(var i = 0 ; i < postedDepositData.length ; i++){
              var isBusinessAccount = accountMod.presentationController.fetchIsBusinessAccount(postedDepositData[i].toAccountNumber);
              postedDepositData[i]["flxAccountType"] = {
                "isVisible": false
              };
              postedDepositData[i]["imgAccountType"] = {
                "isVisible": true,
                "src": (isBusinessAccount === "false" ) ? "personalaccount.png" : "businessaccount.png"
              };
            }
          }	
          segData =  [[{ "lblHeader": postedTranHeaderLabel,"imgUpArrow":{"src":"arrowdown.png"}},postedDepositData]];
        }
        else
        {
          this.view.segDepositFrom.isVisible=false;
          this.view.flxNoTransactions.isVisible=true;
        }
      }
      else
      {
        this.view.segDepositFrom.isVisible=false;
        this.view.flxNoTransactions.isVisible=true;
      }
      if(!searchData)
      {
        this.segmentData=segData;
        this.pendingDeposits=pendingDepositData;
        this.postedDeposits=postedDepositData;
      }
      this.view.segDepositFrom.setData(segData);
    }
    this.view.forceLayout();
  },
  onSearchTextChange : function(){
    var searchText = this.view.customSearchbox.tbxSearch.text.toLowerCase();
    var segData = this.segmentData;    
    if(searchText && segData.length !== 0)
    {
      var data = [],headers = [];
     
     
      if(this.pendingDeposits!==undefined && this.pendingDeposits!==null){
        headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingTransactions"));
        data.push(this.pendingDeposits);
      }
      if(this.postedDeposits!==undefined && this.postedDeposits!==null){
        headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.postedTransactions"));
        data.push(this.postedDeposits);
      }
      var searchSegData = applicationManager.getDataProcessorUtility().commonSectionSegmentSearch("toAccountName",searchText,data,headers);
      if(searchSegData && searchSegData.length!==0)
      {
        this.view.segDepositFrom.setData(searchSegData);
        this.view.segDepositFrom.isVisible=true;
        this.view.flxNoTransactions.isVisible=false;
      }
      else
        {
          this.view.segDepositFrom.isVisible=false;
          this.view.flxNoTransactions.isVisible=true;
           this.view.flxNoTransactions.top = "0dp";
        }
    }
    else if (!searchText && segData.length !== 0)
    {
      this.setSegmentData(segData,true);
    }
    //this.addDummyRows();
  },
  segDepositFromOnClick : function() {
    if(this.hasCheckDepositFeature) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var selectedSectionIndex=Math.floor(this.view.segDepositFrom.selectedRowIndex[0]);
      var selectedRowIndex=Math.floor(this.view.segDepositFrom.selectedRowIndex[1]);
      var transactionData=this.view.segDepositFrom.data[selectedSectionIndex][1][selectedRowIndex];
      var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CheckDepositUIModule");
      checkDepositModule.presentationController.goToDepositDetails(transactionData);
    }
  },
  flxNewCheckDepositOnClick: function() {
	applicationManager.getPresentationUtility().showLoadingScreen();
    var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CheckDepositUIModule");
    checkDepositModule.presentationController.navigationFromNewCheckDeposit();
  },
  showPopupSuccess: function() {
    var scope = this;
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmCheckDeposit");
    if(data)
    {
      if(data.transactionSuccess)
      {
        data.transactionSuccess = false;
        var popupMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Deposit.successfulTransactionPopup")+" "+data.refId;
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(scope, popupMsg);
        navManager.setCustomInfo("frmCheckDeposit",data);
		navManager.setEntryPoint("Feedback","frmCheckDeposit");
        var feedbackModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "FeedbackUIModule", "appName": "AboutUsMA"});
        feedbackModule.presentationController.showFeedbackPopup({from : "transaction"});
      }
      else if(data.transactionError)
      {
        data.transactionError = false;
        var errMsg = data.transactionErrorMsg;
        applicationManager.getDataProcessorUtility().showToastMessageError(scope, errMsg);
        navManager.setCustomInfo("frmCheckDeposit",data);
      }
    }
  },
   resetSearch : function(){
      this.view.customSearchbox.tbxSearch.text = ""
      if(this.segmentData && this.segmentData.length>0){
           this.view.segDepositFrom.setData(this.segmentData);
           this.view.segDepositFrom.isVisible=true;
           this.view.flxNoTransactions.isVisible=false;
         }
         else{
           this.view.segDepositFrom.isVisible=false;
           this.view.flxNoTransactions.isVisible=true;
            this.view.flxNoTransactions.top = "140dp";
         }
    },
    showSearch: function() {
		var scope = this;
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            if (this.view.flxHeaderSearchbox.isVisible === true) {
                this.view.tbxSearch.setEnabled(true);
                this.view.tbxSearch.setFocus(false);
                this.view.customSearchbox.tbxSearch.setEnabled(false);
                this.view.customSearchbox.tbxSearch.setFocus(false);
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxMainContainer.skin="slFbox";
                this.view.flxSearch.isVisible = true;
                this.view.flxNewCheckDeposit.isVisible = this.hasCheckDepositFeature;
                this.view.flxNewCheckDeposit.top ="54dp";
                this.view.flxMainContainer.top = "0dp";
                if(this.view.flxNoTransactions.isVisible){
              		this.view.flxNoTransactions.top = "140dp";
                }
                this.view.flxGradient.isVisible = true;
                this.view.segDepositFrom.top = "150dp";
              	this.setSegmentData();
            } else {
                this.view.tbxSearch.setEnabled(false);
                this.view.customSearchbox.tbxSearch.setEnabled(true);
                this.view.customSearchbox.tbxSearch.setFocus(true);
              	this.view.flxHeaderSearchbox.isVisible = true;
                this.view.flxSearch.isVisible = false;
                this.view.flxMainContainer.skin="sknFlxffffff";
                this.view.flxMainContainer.top = "40dp";
                this.view.flxNewCheckDeposit.isVisible = false;
                this.view.flxGradient.isVisible = false;
                this.view.customSearchbox.tbxSearch.text="";
                this.view.segDepositFrom.top = "0dp";
                if(this.view.flxNoTransactions.isVisible){
              		this.view.flxNoTransactions.top = "0dp";
                }
                this.view.customSearchbox.tbxSearch.setFocus(true);
                //this.removeDummyRows();
                this.view.customSearchbox.tbxSearch.onTextChange = this.onSearchTextChange;
            }
        } else {
            if (this.view.flxHeaderSearchbox.isVisible === true) {
              	this.view.tbxSearch.setEnabled(true);
                this.view.tbxSearch.setFocus(false);
                this.view.customSearchbox.tbxSearch.setEnabled(false);
                this.view.customSearchbox.tbxSearch.setFocus(false);
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxMainContainer.skin="slFbox";
                this.view.flxSearch.isVisible = true;
                this.view.flxHeader.isVisible = true;
                this.view.flxMainContainer.top = "56dp";
                this.view.flxNewCheckDeposit.top = "50dp";
                this.view.segDepositFrom.top = "150dp";
                if(this.view.flxNoTransactions.isVisible){
              		this.view.flxNoTransactions.top = "140dp";
                }
   	            this.view.flxNewCheckDeposit.isVisible = this.hasCheckDepositFeature;
                this.view.flxGradient.isVisible = true;
                this.view.segDepositFrom.isVisible = true;
                this.view.flxNoTransactions.isVisible = false;
                this.setSegmentData();
            } else {
                this.view.tbxSearch.setEnabled(false);
                this.view.flxMainContainer.skin="sknFlxffffff";
                this.view.customSearchbox.tbxSearch.setEnabled(true);
                this.view.customSearchbox.tbxSearch.setFocus(true);
              	this.view.flxGradient.isVisible = false;
				this.view.flxNewCheckDeposit.isVisible = false;
			    //this.removeDummyRows();
                this.view.flxSearch.isVisible = false;
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "0dp";
              	if(this.view.flxNoTransactions.isVisible){
              		this.view.flxNoTransactions.top = "40dp";
                }
                this.view.segDepositFrom.top = "39dp";
                this.view.flxHeaderSearchbox.isVisible = true;
                this.view.customSearchbox.tbxSearch.text="";
                kony.timer.schedule("timerId", function() {
        			scope.view.customSearchbox.tbxSearch.setFocus(true);
    			}, 0.1, false);
               this.view.customSearchbox.tbxSearch.onTextChange = this.onSearchTextChange;
            }
        }
       this.view.forceLayout();
    },
  removeDummyRows:function(){
    var data=this.view.segDepositFrom.data;
    if(data == null || data == undefined){
      kony.print("no data");
    }
    else{
      data.shift();
      this.view.segDepositFrom.setData(data);
    }
  },
  };
});