define(['CampaignUtility'], function(CampaignUtility){
  return{
	segmentData : [],
    selectedBeneficiaryData : null,
    init: function() {
      var scope = this;
      var currentFormObject = kony.application.getCurrentForm();
      var currentForm=currentFormObject.id;
      applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.backNavigation);
    },
    
    preShow: function() {
      var self = this;
      if (this.view.flxHeaderSearchbox.height === "40dp") {
        //this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxHeaderSearchbox.height = "0dp";
        //this.view.flxSearch.isVisible = true;
        this.view.flxSearch.height = "55dp";
        this.view.flxHeader.isVisible = true;
      }
      if (kony.os.deviceInfo().name === "iPhone") {
        this.view.flxHeader.isVisible = false;
        this.view.flxFooter.isVisible = true;
        this.view.flxMainContainer.top = "0dp";
      } else {
        this.view.flxFooter.isVisible = false;
        this.view.flxMainContainer.top = "56dp";
      }
      this.view.flxSearch.top="0dp";
      this.view.flxGradient.top = 0 + "dp";
      this.view.flxSearch.isVisible = true;
      this.view.flxSearch.height = "55dp";
      this.view.flxGradient.isVisible = true;
      this.setSegmentData();
      this.initActions();

      applicationManager.getPresentationUtility().dismissLoadingScreen();
	  var config = applicationManager.getConfigurationManager();
      config.getDisputeConfigurations();
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      let scopeObj = this;
      function campaignPopUpSuccess(response) {
        CampaignUtility.showCampaign(response, scopeObj.view);
      }

      function campaignPopUpError(response) {
        kony.print(response, "Campaign Not Found!");
      }
      CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
    },


    initActions: function() {
      var scope = this;
      var MenuHandler = applicationManager.getMenuHandler();
      MenuHandler.setUpHamburgerForForm(scope);
      this.view.tbxSearch.onTouchStart = this.showSearch;
      this.view.customSearchbox.btnCancel.onClick = this.cancelSearch;
      this.view.customHeader.imgBack.src = "backbutton.png";
      this.view.customHeader.flxBack.onClick = this.backNavigation;
      //osama
      this.view.onDeviceBack = this.backNavigation;
      this.view.segBeneficiaries.onRowClick = this.onSegRowClick;
      this.view.btnApply.onClick = this.navigateToBeneficiaryBank;
    },

    onSegRowClick: function () {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
      var selectedRowIndex = Math.floor(this.view.segBeneficiaries.selectedRowIndex[1]);
            var selectedRowData = this.view.segBeneficiaries.data[selectedRowIndex];
            var beneficiaryData = [];
            for (let i=0; i<this.segmentData.length; i++) {
                if (this.segmentData[i].Id === selectedRowData.Id) {
                    beneficiaryData = this.segmentData[i];
                    break;
                }
            }
      var flowType ="";
      if (beneficiaryData.isInternationalAccount === "true" && beneficiaryData.isSameBankAccount === "false")  {
        // international benef
        flowType = "InternationalRecipients";
      } else if (beneficiaryData.isInternationalAccount === "false" && beneficiaryData.isSameBankAccount === "false") {
        // inter
        flowType = "OtherBankRecipients";
      } else {
        // intra
        flowType = "SameBankRecipients";
      }
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
      transferModulePresentationController.setFlowType(flowType);
      navMan.setCustomInfo("frmBeneficiaryDetailsEurope", beneficiaryData);
      transferModulePresentationController.navigateToBenificiaryDetails(beneficiaryData);
    },

    showSearch: function() {
      var scope = this;
      this.view.flxOuterGradientBlueKA.isVisible = false;
      this.view.flxMainContainer.skin = "sknFlxffffff";
      if (kony.os.deviceInfo().name === "iPhone") {
        if (this.view.flxHeaderSearchbox.height === "40dp") {
          this.view.flxHeaderSearchbox.height = "0dp";
          // this.view.flxHeaderSearchbox.isVisible = false;
          //this.view.flxSearch.isVisible = true;
          this.view.flxSearch.height = "55dp";
          this.view.flxMainContainer.top = "0dp";
          this.view.segBeneficiaries.top = "55dp";	
          this.view.flxNoBeneficiaries.top = "55dp";
          this.view.flxGradient.isVisible = false;
        } else {
          //this.view.flxHeaderSearchbox.isVisible = true;
          this.view.flxHeaderSearchbox.height = "40dp";
          this.view.flxSearch.height = "0dp";
          //this.view.flxSearch.isVisible = false;
          this.view.flxMainContainer.top = "40dp";
          this.view.segBeneficiaries.top = "0dp";
          this.view.flxNoBeneficiaries.top = "0dp";
          this.view.flxGradient.isVisible = false;
          this.view.customSearchbox.tbxSearch.text = "";
          this.view.customSearchbox.tbxSearch.setFocus(true);
          kony.timer.schedule("timerId", function() {
            scope.view.customSearchbox.tbxSearch.setFocus(true);
          }, 0.1, false);
          this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
        }
      } else {
        if (this.view.flxHeaderSearchbox.height === "40dp") {
          this.view.flxHeaderSearchbox.height = "0dp";
          //this.view.flxHeaderSearchbox.isVisible = false;
          this.view.flxSearch.height = "55dp";
          //this.view.flxSearch.isVisible = true;
          this.view.flxHeader.isVisible = true;
          this.view.flxMainContainer.top = "56dp";
          this.view.segBeneficiaries.top = "55dp";
          this.view.flxNoBeneficiaries.top = "55dp";
          this.view.flxGradient.top = "0dp";
        } else {
          this.view.flxGradient.isVisible = false;
          this.view.flxSearch.height = "0dp";
          //this.view.flxSearch.isVisible = false;
          this.view.flxHeader.isVisible = false;
          this.view.flxMainContainer.top = "40dp";
          this.view.flxHeaderSearchbox.height = "40dp";
          this.view.segBeneficiaries.top = "0dp";
          this.view.flxNoBeneficiaries.top = "0dp";
          // this.view.flxHeaderSearchbox.isVisible = true;
          this.view.customSearchbox.tbxSearch.text = "";
          kony.timer.schedule("timerId", function() {
            scope.view.customSearchbox.tbxSearch.setFocus(true);
          }, 0.1, false);
          this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
        }
      }
      this.view.flxOuterGradientBlueKA.isVisible = false;
    },

    cancelSearch: function() {
      //this.view.flxOuterGradientBlueKA.isVisible = true;
      this.view.flxHeaderSearchbox.height = "0dp";
      //this.view.flxHeaderSearchbox.isVisible = false;
      //this.view.flxSearch.isVisible = true;
      this.view.flxSearch.height = "55dp";
      //this.view.flxGradient.isVisible = true;
      // this.view.flxSearch.top = 0 + "dp";
      //this.view.flxGradient.top = "0dp";
      this.view.flxSearch.top="0dp";
      this.view.flxGradient.top = 0 + "dp";
      this.view.flxSearch.isVisible = true;
      this.view.flxSearch.height = "55dp";
      this.view.flxGradient.isVisible = true;
      this.view.segBeneficiaries.top = "55dp";
      if (kony.os.deviceInfo().name === "iPhone") {
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "0dp";
      } else {
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
      }
      if (this.segmentData.length > 0) {
        this.view.segBeneficiaries.setData(this.segmentData);
        this.view.segBeneficiaries.isVisible = true;
        this.view.flxNoBeneficiaries.isVisible = false;
      } else {
        this.view.segBeneficiaries.isVisible = false;
        this.view.flxNoBeneficiaries.isVisible = true;
        // this.view.flxHeaderNT.isVisible = false;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Beneficiary.NoBeneficiaryRecord");
        this.view.flxGradient.isVisible = true;
        this.view.flxSearch.isVisible = true;
        this.view.flxNoBeneficiaries.top = "56dp";
      }
      //this.view.flxOuterGradientBlueKA.isVisible = true;
    },


    tbxSearchOnTextChange: function() {
     var scope=this;
      	var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
    	var searchSegmentData=null;
      	 	var data = this.segmentData;
			searchSegmentData = applicationManager.getDataProcessorUtility().multipleCommonSegmentSearch(["nickName","beneficiaryName","accountNumber","IBAN", "bankName", "swiftCode"],searchtext,data);
      	if(searchSegmentData.length===0){
      		this.view.flxNoBeneficiaries.isVisible=true;
            this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.NoBeneficiary") + " '" + this.view.customSearchbox.tbxSearch.text + "'";
        	this.view.segBeneficiaries.isVisible=false;
		}
		else{
    	    this.view.flxNoBeneficiaries.isVisible=false;
	        this.view.segBeneficiaries.isVisible=true;
      		this.view.segBeneficiaries.setData(searchSegmentData);
		}
    },


    backNavigation: function () {
      try {
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
        accountMod.presentationController.showDashboard();
      } catch (er) {
      }
    },

    setSegmentData: function () {
      var navMan = applicationManager.getNavigationManager();
      var externalAccountsData = {};
      externalAccountsData = navMan.getCustomInfo("frmEuropeManageBeneficiaries");
      externalAccountsData = this.removeDuplicates(externalAccountsData, "accountNumber")
      if (externalAccountsData.length > 0) {
        this.view.segBeneficiaries.isVisible = true;
        this.view.flxNoBeneficiaries.isVisible = false;
        var widgetDataMap = this.getWidgetDataMap();
        this.view.segBeneficiaries.widgetDataMap = widgetDataMap;
        this.segmentData = externalAccountsData;
        for (var i = 0; i < externalAccountsData.length; i++) {
          if (this.isDeletePermitted(externalAccountsData[i])) {
            this.segmentData[i].template = "flxTransfers";
          	this.segmentData[i].flximage = {isVisible : false};
          	this.segmentData[i].flxAccountType = {isVisible : false};
          	this.segmentData[i].flxCancel = {};
          	this.segmentData[i].imgCancel = "deleteicon.png";
          	this.segmentData[i].lblCancel = {"text": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Delete")}
          	this.segmentData[i].flxCancel.onClick = this.deleteBeneficiaryConfirmation
          }
          else {
            this.segmentData[i].template = "flxSegBenNoDel";
          	this.segmentData[i].flximage = {isVisible : false};
          	this.segmentData[i].flxAccountType = {isVisible : false};        
          }
        }
        this.view.segBeneficiaries.setData(this.segmentData);
      }
      else {
        this.showNoBeneficiariesFlex();
      }  

    },
    
    removeDuplicates : function(arr, prop){
      var obj = {};
      for ( var i = 0, len = arr.length; i < len; i++ ){
        if(!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
      }
      var newArr = [];
      for ( var key in obj ) newArr.push(obj[key]);
      return newArr;
    },
    
    isDeletePermitted: function(data){
      var configManager = applicationManager.getConfigurationManager();
      var isInternationalBen = (data.isInternationalAccount === "true" && data.isSameBankAccount === "false") ? true : false;
      var isInternalBen = (data.isInternationalAccount === "false" && data.isSameBankAccount === "true") ? true : false;
      var isDomesticBen = (data.isInternationalAccount === "false" && data.isSameBankAccount === "false") ? true : false;
      if (isInternalBen && configManager.checkUserPermission("INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT")) {
        return true;
      }
      else if (isInternationalBen && configManager.checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT")) {
        return true;
      }
      else if (isDomesticBen && configManager.checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT")) {
        return true;
      }
      else {
        return false;
      }
    },
    
    deleteBeneficiaryConfirmation: function(widget, context) {
      var scope = this;
      var selectedRowIndex=context.rowIndex;
      this.selectedBeneficiaryData = this.view.segBeneficiaries.data[selectedRowIndex];
      var message = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.EuropeTransfer.DoYouWantToRemove") + " " + this.selectedBeneficiaryData.beneficiaryName + "? " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.EuropeTransfer.ThisCannotReverse");
      var basicProperties =
          {
            "message": message,
            "alertType": constants.ALERT_TYPE_CONFIRMATION,
            "alertTitle": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.RemoveBeneficiary"),
            "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.EuropeTransfer.YesRemove"),
            "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.tab.common.No"),
            "alertIcon": "",
            "alertHandler": scope.removeBeneficiary
          };
      applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
    },
    
    removeBeneficiary: function(response) {
      if (response === true) {
      	var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
      	transferModulePresentationController.deleteBeneficiary(this.selectedBeneficiaryData);
      }
    },

    getWidgetDataMap: function() {
      return {
        lblTransaction : "processedName",
        lblAccount : "paymentMethod",
        lblDate : "verification",
        imgAccount : "",
        lblAmount: "",
        flxCancel: "flxCancel",
        imgCancel: "imgCancel",
        lblCancel: "lblCancel",
        flximage: "flximage",
        flxAccountType: "flxAccountType"
      }
    },
    
    navigateToBeneficiaryBank:function(){
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("createEuropeExternalBenificiaries","frmEuropeManageBeneficiaries");
    transferModPresentationController.commonFunctionForNavigation({"appName" : "TransfersMA", "friendlyName" : "TransferEuropeUIModule/frmEuropeTransferToAccountNewBen"});
  },

    showNoBeneficiariesFlex: function() {
      this.segmentData = [];
      this.view.segBeneficiaries.isVisible = false;
      this.view.flxNoBeneficiaries.isVisible = true;
      this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Beneficiary.NoBeneficiaryRecord");
      this.view.flxGradient.isVisible = true;
      this.view.flxSearch.isVisible = true;
      this.view.flxNoBeneficiaries.top = "56dp";
    },
  };
});