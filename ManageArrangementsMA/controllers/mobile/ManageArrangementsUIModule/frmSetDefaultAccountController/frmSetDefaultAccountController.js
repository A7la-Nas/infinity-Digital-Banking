define({
	init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
    frmPreshow : function(){
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
        this.view.flxFooter.isVisible = false;
      }else{
        this.view.flxHeader.isVisible = true;
        this.view.flxFooter.isVisible = false;
        this.view.customHeader.flxSearch.setVisibility(false);
      }
       if(kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.customHeader.imgBack.src = "chevronwhiteright.png";
      }else{ 
          this.view.customHeader.imgBack.src = "backbutton.png";
      }
      this.initActions();
      //this.setAccountsSegmentData();
      this.setSegDefaultAcct();
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    initActions: function () {
        this.view.segSelectAccounts.onRowClick=this.segDefaultAccountOnClick;
        this.view.customHeader.flxBack.onClick=function(){
          var navManager = applicationManager.getNavigationManager();          
          navManager.navigateTo({"friendlyName": "SettingsUIModule/frmSettings","appName": "ManageProfileMA"});
        };
    },
	setSegDefaultAcct : function(){
        var navManager = applicationManager.getNavigationManager();
		var configManager = applicationManager.getConfigurationManager();
        var data=navManager.getCustomInfo("frmSetDefaultAccount");
       if (kony.i18n.getCurrentLocale() === "ar_AE"){
         data.map(e => e.imgArrow = "chevron_reverse.png");
        }
        if((data.popUpMsg!==null)&&(data.popUpMsg!=="")&&(data.popUpMsg !== undefined))
       {
         var scopeObj=this;
         applicationManager.getDataProcessorUtility().showToastMessageSuccess(scopeObj,data.popUpMsg);
      }
      data.popUpMsg="";
        this.view.segSelectAccounts.widgetDataMap={
          "lblTitle":"lblTitle",
          "lblValue":"lblValue",
          "imgArrow":"imgArrow",
          "lblAccId":"lblAccId"
        };
        if (configManager.isFastTransfersFlowEnabled()) {
            data = data.filter(function(obj) {
                return (obj.lblTitle === kony.i18n.getLocalizedString("i18n.TransfersEur.Tabs.Transfers") || obj.lblTitle === kony.i18n.getLocalizedString("i18n.P2P.PayPersonP2P")) ? false : true;
            });
        }
        this.view.segSelectAccounts.setData(data);
    },
  	segDefaultAccountOnClick :function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
		var selectedAcntRow = this.view.segSelectAccounts.selectedIndex[1];
		var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
		var selectedRecord = this.view.segSelectAccounts.data[selectedAcntRow];
		var data = [];
		data[0]=selectedRecord;
		navManager.setCustomInfo("frmPreferencesDefaultAccount",data);
		settingsMode.presentationController.setDataDefaultAccLogin(selectedAcntRow);
  },
});