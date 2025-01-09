define(['CampaignUtility'], function(CampaignUtility){
  return{
    timerCounter : 0,
	acctPreviewStatus : "",
    devRegStatus : "",
    defLoginStatus : "",
    pinStatus : "",
    faceIdStatus : "",
    touchIdStatus : "",
    isTouchIdAva : "",
    isFaceIdAva : "",
    selectedAcntRow: "",
    alertStatus:"",
    contentOffset : "0dp",
//     onNavigate:function(obj) {
// 	  this.setUserAlerts();
//     },
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
    frmSettingsPreShow: function() {
        this.setFlowActions();
        this.setPreshowData();
		        this.frmPreShow();
        this.checkForToastMessage();
        this.showPopUpMessage();
		        var configManager = applicationManager.getConfigurationManager();
        		var MenuHandler =  applicationManager.getMenuHandler();
        MenuHandler.setUpHamburgerForForm(this,configManager.constants.MENUSETTINGS);
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
	        applicationManager.getPresentationFormUtility().logFormName(currentForm);
        let scopeObj = this;
        function campaignPopUpSuccess(response){
          CampaignUtility.showCampaign(response, scopeObj.view);
        }
        function campaignPopUpError(response){
          kony.print(response, "Campaign Not Found!");
        }
        CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
        if((configManager.checkUserFeature("PROFILE_SETTINGS") || configManager.checkUserPermission("PROFILE_SETTINGS_VIEW") || configManager.checkUserPermission("PROFILE_SETTINGS_UPDATE"))) {
          this.view.segSettingsProfile.isVisible = true;
          this.setSegSettingsProfile();
        }
      	else{
          this.view.segSettingsProfile.isVisible = false;
        }
      
        if((configManager.checkUserFeature("ACCOUNT_SETTINGS") || configManager.checkUserPermission("ACCOUNT_SETTINGS_VIEW") || configManager.checkUserPermission("ACCOUNT_SETTINGS_EDIT"))) {
          this.view.segSettingsDefaultAccount.isVisible = true;
        }
        else{
          this.view.segSettingsDefaultAccount.isVisible = false;
        }
        if((configManager.checkUserFeature("CDP_CONSENT") || configManager.checkUserPermission("CDP_CONSENT_VIEW") || configManager.checkUserPermission("CDP_CONSENT_EDIT"))) {
          this.view.segConsentManagement.isVisible = true;
        }
        else{
          this.view.segConsentManagement.isVisible = false;
        }
		
        if((configManager.checkUserFeature("PSD2_TPP_CONSENT") || configManager.checkUserPermission("PSD2_TPP_CONSENT_VIEW") || configManager.checkUserPermission("PSD2_TPP_CONSENT_REVOKE"))) {
          this.view.segManageAccountAcces.isVisible = true;
        }
        else{
          this.view.segManageAccountAcces.isVisible = false;
        }
    },
    setFlowActions: function() {
        var scope = this;
        this.view.customHeader.flxBack.onClick = function() {
            scope.navToMenu();
        };
	    this.view.segSettingsDefaultAccount.onRowClick = this.segDefaultAccountOnClick;
		this.view.segSettingsLogin.onRowClick = this.segloginOnClick;
		this.view.segSettingsProfile.onRowClick = function(){
          scope.onRowClickOfProfile();
        };
      this.view.segSettingsAlerts.onRowClick= this.segAlertsOnClick;
      this.view.segConsentManagement.onRowClick= this.segConsentOnClick;
      this.view.segManageAccountAcces.onRowClick= this.segManageAccountAccesOnClick;
    },
    navToMenu: function() {
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      settingsMod.presentationController.commonFunctionForNavigation("frmMenu");
    },
    setPreshowData: function() {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
        this.view.flxMainContainer.bottom = "0dp";
        this.view.flxFooter.isVisible = false;
      } else {
        this.view.flxHeader.isVisible = false;
        this.view.flxFooter.isVisible = true;
        this.view.flxMainContainer.bottom = "60dp";
        this.view.flxMainContainer.top = "0dp";
      }
      //        this.view.flxMainContainer.contentOffset = {x:0,y:0};
      var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      if (SettingsAlertsUIModule .presentationController.retainSegmentoffset) {
        this.view.flxMainContainer.setContentOffset({"y" : this.contentOffset});
      } else {
        this.view.flxMainContainer.setContentOffset({"y" : "0dp"});
      }
    },
   /**
   * used to fetch the alerts categories.
   */
  	setUserAlerts: function() {
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      settingsMod.presentationController.getAlertCategoryList();
    },
    showPopUpMessage : function(){
     var navManager = applicationManager.getNavigationManager();
      var msgData = navManager.getCustomInfo("frmSettings");
      if((msgData.popUpMsg!==null)&&(msgData.popUpMsg!=="")&&(msgData.popUpMsg !== undefined))
      {
         var scopeObj=this;
         applicationManager.getDataProcessorUtility().showToastMessageSuccess(scopeObj,msgData.popUpMsg);
      }
     msgData.popUpMsg="";
	 navManager.setCustomInfo("frmSettings",msgData);
   },
    showPwdUpdatedSuccess: function() {
        var scopeObj = this;
        this.timerCounter = parseInt(this.timerCounter) + 1;
        var timerId = "timerPopupError" + this.timerCounter;
        this.view.flxPopup.skin = "sknFlx43ce6e";
        this.view.customPopup.imgPopup.src = "confirmation.png";
        this.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.Profile.changePassword");
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
        }, 1.5, false);
    },
    showUsernameUpdatedSuccess: function() {
        var scopeObj = this;
        this.timerCounter = parseInt(this.timerCounter) + 1;
        var timerId = "timerPopupError" + this.timerCounter;
        this.view.flxPopup.skin = "sknFlx43ce6e";
        this.view.customPopup.imgPopup.src = "confirmation.png";
        this.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.Profile.changeUsername");
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
        }, 1.5, false);
    },
    segDefaultAccountOnClick :function(){
      this.contentOffset = this.view.flxMainContainer.contentOffsetMeasured.y + "dp";
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var selectedAcntRow = this.view.segSettingsDefaultAccount.selectedIndex[1];
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      var selectedRecord = this.view.segSettingsDefaultAccount.data[0][1][selectedAcntRow];
      var data = [];
      data[0]=selectedRecord;
      navManager.setCustomInfo("frmPreferencesDefaultAccount",data);
      settingsMode.presentationController.retainSegmentoffset = true;
      settingsMode.presentationController.setDataDefaultLogin(selectedAcntRow);
    },
  frmPreShow : function(){
   	 this.setSegLoginData();
    this.setSegSettingsProfile();
   this.setAccountSettings();
    this.setManageAccountAcces();
	var alertManagement = applicationManager.getConfigurationManager().checkUserPermission("ALERT_MANAGEMENT") ? true : false;
    if(alertManagement){
      this.view.segSettingsAlerts.isVisible = true;
      this.setUserAlerts();
    }else{
      this.view.segSettingsAlerts.isVisible = false;
    }
   this.setConsentManagement();
  },
   /**
  * used to bind alert data to the segment.
  * @param {object} alertData - contains category list and config properties
  */
    bindData: function(categoryData) {
      var categoryList = categoryData.records;
      var alertConfig = (categoryData.alertConfiguration && categoryData.alertConfiguration.length >0) ?
          categoryData.alertConfiguration[0] : "";
      var data = [
        [{
          "lblProfileHeading": kony.i18n.getLocalizedString("kony.mb.Settings.Alerts"), "lblSeperator":"-"
        },
         []
        ]
      ];
      for (var i = 0; i < categoryList.length; i++) {
        var status = categoryList[i].categorySubscription.isSubscribed;
        if (status === "true") this.alertStatus = kony.i18n.getLocalizedString("kony.mb.On");
        else this.alertStatus = kony.i18n.getLocalizedString("kony.mb.Off");
        //show category if there are groups/alerts only
        if(categoryList[i].Groups_count === "0" || (categoryList[i].Alerts_count && categoryList[i].Alerts_count === "0") ||
          categoryList[i].alertcategory_status_id !== "SID_ACTIVE"){
          //do-nothing
        } else{
          data[0][1].push({
            "lblTitle": categoryList[i].alertcategorytext_DisplayName,
            "lblValue": (categoryList[i].alertcategory_accountLevel === "false") ? this.alertStatus : "",
            "imgArrow": "chevron.png",
            "category": categoryList[i].alertcategory_id,
            "sequence": categoryList[i].alertcategory_DisplaySequence,
            "categorySubscription": categoryList[i].categorySubscription,
            "isAccountLevel":categoryList[i].alertcategory_accountLevel
          });
        }
       
      }
      var communicationRow = [{
        "lblTitle": "Alert Communication",
        "lblValue": "",
        "imgArrow": "chevron.png",
        "category": "ALERT_COMMUNICATION",
        "sequence": "",
        "categorySubscription": null,
        "isAccountLevel":null
      }];
      if(alertConfig && alertConfig.enableSeparateContact &&
         categoryData.alertConfiguration[0].enableSeparateContact === "1"){
        data[0][1] = communicationRow.concat(data[0][1]);
      }
      this.view.segSettingsAlerts.setData(data);
      this.view.flxMainContainer.forceLayout();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
 /* segAccountsData : function(){
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    var data = settingsMode.presentationController.defaultAccounts();
    this.view.segSettingsDefaultAccount.setData(data);
  },*/
  onRowClickOfProfile : function(){
    var selectedIndex = this.view.segSettingsProfile.selectedRowIndex;
    selectedIndex = parseInt(selectedIndex[1]);
    var selectedSegData = this.profileData[selectedIndex]["lblTitle"];
    if(selectedSegData === kony.i18n.getLocalizedString("kony.mb.ProfileChangeUsername.Title")){
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      settingsMode.presentationController.getUsernameRulesAndPolicy();
    }
    if(selectedSegData === kony.i18n.getLocalizedString("kony.mb.ProfileChangeAndUpdatePassword.Title")){
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      settingsMode.presentationController.navigateToChangePassword();
    }
    if(selectedSegData === kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Title")){
      var settings = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      settings.presentationController.navigateToProfilePersonalDetails();
    }
    if(selectedSegData === kony.i18n.getLocalizedString("kony.mb.Login.ChangeLanguage")){
      var settingsLanguage = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      settingsLanguage.presentationController.navigateToProfileChangeLanguage();
    }
  },
  getSettingsStatus : function(){
    var navManager = applicationManager.getNavigationManager();
    var loginData = navManager.getCustomInfo("frmSettings");
    var tempLoginMode = loginData.defLoginMode;
    var userPrefManager = applicationManager.getUserPreferencesManager();
    var alertsTurnedOn = userPrefManager.getAlertsInfo();
    this.isTouchIdAva = loginData.istouchIdAvail;
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
   // this.isFaceIdAva = loginData.isFaceIdAvail;
     if (tempLoginMode == "password")
          this.defLoginStatus = kony.i18n.getLocalizedString("kony.mb.login.password");
    else if (tempLoginMode == "pin")
          this.defLoginStatus = kony.i18n.getLocalizedString("kony.mb.devReg.pin");
    else if (tempLoginMode == "touchid"){
      if(isIphone)
          this.defLoginStatus = kony.i18n.getLocalizedString("kony.mb.devReg.touchidTitle");
      else
          this.defLoginStatus = kony.i18n.getLocalizedString("kony.mb.devReg.Biometric");
    }
    else if (tempLoginMode == "faceid")
          this.defLoginStatus = kony.i18n.getLocalizedString("kony.mb.common.FaceCaps");
    if(loginData.accPreview === true){
       this.acctPreviewStatus = kony.i18n.getLocalizedString("kony.mb.On");
    }
    else{
       this.acctPreviewStatus = kony.i18n.getLocalizedString("kony.mb.Off");
    }
    if(loginData.deviceReg === true){
       this.devRegStatus = kony.i18n.getLocalizedString("kony.mb.On");
    }
    else{
       this.devRegStatus = kony.i18n.getLocalizedString("kony.mb.Off");
    }
    if(alertsTurnedOn === "true"){
       this.alertStatus = kony.i18n.getLocalizedString("kony.mb.On");
    }
    else{
       this.alertStatus = kony.i18n.getLocalizedString("kony.mb.Off");
    }
 },
  setSegLoginData : function(){
    this.getSettingsStatus();
    var data;
    if(applicationManager.getConfigurationManager().checkUserFeature("ONLINE_BANKING_ACCESS")){
      data=[
        [
              {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.login.logIn"),"lblSeperator" : "-"},
            [
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.login.accountPreview"),"lblValue":this.acctPreviewStatus,"imgArrow":"chevron.png"},
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.devReg.defaultLogin"),"lblValue":this.defLoginStatus,"imgArrow":"chevron.png"},
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.settings.eBankingAccess"),"lblValue":kony.i18n.getLocalizedString("kony.mb.On"),"imgArrow":"chevron.png"}
            ]
       ]];
    }else{
      data=[
        [
              {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.login.logIn"),"lblSeperator" : "-"},
            [
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.login.accountPreview"),"lblValue":this.acctPreviewStatus,"imgArrow":"chevron.png"},
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.devReg.defaultLogin"),"lblValue":this.defLoginStatus,"imgArrow":"chevron.png"},
            ]
       ]];
    }
    this.view.segSettingsLogin.setData(data);
    /*if(!this.isFaceIdAva){
      this.view.segSettingsLogin.removeAt(4,0);
    }*/
  },
    segloginOnClick : function(){
      this.contentOffset = this.view.flxMainContainer.contentOffsetMeasured.y + "dp";
      var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");      
      SettingsAlertsUIModule.presentationController.retainSegmentoffset = true;
      this.selectedAcntRow = this.view.segSettingsLogin.selectedIndex[1];
      var navManager = applicationManager.getNavigationManager();
      switch(this.selectedAcntRow ){
        case 0:
          this.gotoAcctPreview();
          break;               
        case 1:
          this.gotoDefaultLogin();
          break;
        case 2:
          this.enableEBankingAccess();
          break;
          /*case 3:
        	this.goToPinSettings();
            break;
      case 4:
          /* if(this.isFaceIdAva)
            	gotoFaceIdSettings();
          else if(!hasFaceId && hasTouchId)
            	this.goToTouchIdSettings();
        	break;*/
      }
    },
    segConsentOnClick : function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmConsentManagement");
    },
    segManageAccountAccesOnClick : function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmSelectTPP");
    },
  gotoAcctPreview : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
	var navManager = applicationManager.getNavigationManager();
    var loginData = navManager.getCustomInfo("frmSettings");
    navManager.setCustomInfo("frmPreferencesAccountPreview",loginData);
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesAccountPreview");
  },
  updateSegmentData : function(feature,status)
  {
    var record = {"lblTitle":feature,"lblValue":status,"imgArrow":"segmentarrow.png"};
    this.view.segSettingsLogin.setDataAt(record,this.selectedAcntRow);
  },
  //Navigate to DevReg flow
  gotoDevRegistration : function(){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var navManager = applicationManager.getNavigationManager();
     var loginData = navManager.getCustomInfo("frmSettings");
     var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
     if(loginData.deviceReg){
        settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesDeviceDeRegistration");
     }
     else{
   		navManager.setCustomInfo("frmPreferencesDeviceRegistration",loginData);
        settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesDeviceRegistration");
     }
  },
  //Navigate to Default login
   gotoDefaultLogin : function(){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
     var navManager = applicationManager.getNavigationManager();
     var flagData = authMod.presentationController.getAuthFlags();
     flagData.popUpMsg="";
     navManager.setCustomInfo("frmPreferencesDefaultLogin",flagData);
     var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
     settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesDefaultLogin");
  },
  //Navigate to Pin Login flow
  goToPinSettings : function(){
      	 var navManager = applicationManager.getNavigationManager();
         var userPreferencesManager = applicationManager.getUserPreferencesManager();
         var loginData = navManager.getCustomInfo("frmSettings");
         var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
         if(loginData.pin){
            settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesPin");
         }
    	 else{
            settingsMod.presentationController.commonFunctionForNavigation("frmDevRegPin");
          }
    },

    enableEBankingAccess : function(){
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      settingsMod.presentationController.commonFunctionForNavigation("frmEBankingAccess");
    },
    
   checkForToastMessage : function(){
      var navigationManager = applicationManager.getNavigationManager();
      var data = navigationManager.getCustomInfo('frmProfileUsername');
      if(data && data.updateUsernameStatus ==='usernameUpdated'){
        var i18n_string = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.Profile.changeUsername');
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,i18n_string);
        data.updateUsernameStatus = null;
        navigationManager.setCustomInfo('frmProfileUsername',data);
      }
     var data1 = navigationManager.getCustomInfo('frmProfileChangeAndUpdatePassword');
     if(data1 === "passwordUpdated"){
       var i18n_str = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.Profile.changePassword');
       applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,i18n_str);
       navigationManager.setCustomInfo('frmProfileChangeAndUpdatePassword',null);
     }
   },
  /**
* used to retrieve categoryID and navigate to frmAlertsList.
*/
    segAlertsOnClick : function(){
      this.contentOffset = this.view.flxMainContainer.contentOffsetMeasured.y + "dp";     
      var selectedAlertData = this.view.segSettingsAlerts.selectedRowItems[0];
      var categoryID = selectedAlertData.category;
      var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      SettingsAlertsUIModule.presentationController.retainSegmentoffset = true;
      SettingsAlertsUIModule.presentationController.setAlertsCategoryID(categoryID);
      var navManager = applicationManager.getNavigationManager();
      if(selectedAlertData.isAccountLevel ===  "true"){
        applicationManager.getPresentationUtility().showLoadingScreen();
        navManager.setCustomInfo("frmAlertsListHeader",selectedAlertData.lblTitle);
        navManager.setCustomInfo("accountAlertsData",selectedAlertData);
        navManager.setCustomInfo("selectedCategoryInfo",selectedAlertData);
        SettingsAlertsUIModule.presentationController.getCustomerAccountAlertPreference();
        // 	 SettingsAlertsUIModule.presentationController.commonFunctionForNavigation("frmAlertsAccountPref");
      } else if(categoryID ===  "ALERT_COMMUNICATION"){
        navManager.setCustomInfo("frmAlertsListHeader",selectedAlertData.lblTitle);
        SettingsAlertsUIModule.presentationController.commonFunctionForNavigation("frmAlertsCommunication");
      }
      else{
        navManager.setCustomInfo("frmAlertsListHeader",selectedAlertData.lblTitle);
        navManager.setCustomInfo("selectedCategoryInfo",selectedAlertData);
        SettingsAlertsUIModule.presentationController.getAlertsBasedOnCategoryID(false);
      }
        
        //SettingsAlertsUIModule.presentationController.commonFunctionForNavigation("frmAlertGroupsList");
        
    },
  gotoAccountAlerts : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    try{
       	var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      	SettingsAlertsUIModule.presentationController.getAllAccountAlerts(this.getAllAccountAlertsSuccess.bind(this), this.getAllAccountAlertsFailure.bind(this));
        }
      catch(exception){
      }
  },
  getAllAccountAlertsSuccess: function(response){
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmAlertsAccountList", response);
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmAlertsAccountList");
  },
  getAllAccountAlertsFailure : function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
  gotoDealsAndSecurityAlerts : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    try{
      	var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      	SettingsAlertsUIModule.presentationController.getDealsAndSecurityAlerts(this.getDealsAndSecurityAlertsSuccess.bind(this),this.getDealsAndSecurityAlertsFailure.bind(this));
      }
      catch(exception){
      }
  },
  getDealsAndSecurityAlertsSuccess: function(response){
    var navManager = applicationManager.getNavigationManager();
    response.push(alertType);
    navManager.setCustomInfo("frmAlertsDealsAndSecurity", response);
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmAlertsDealsAndSecurity");
  },
  getDealsAndSecurityAlertsFailure : function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
  setAccountSettings :function(){
    var data=[
      		[
                {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.Settings.AccountSettings"), "lblSeperator":"-"},
              [
                    {"lblTitle":kony.i18n.getLocalizedString("kony.mb.EStmt.AccountPreferences"),"lblValue":"","imgArrow":"chevron.png"},
                    {"lblTitle":kony.i18n.getLocalizedString("kony.mb.settings.SetDefaultAccount"),"lblValue":"","imgArrow":"chevron.png"},
              ]
         ]];
    this.view.segSettingsDefaultAccount.setData(data);
  },
  setSegSettingsProfile : function(){
    var configManager = applicationManager.getConfigurationManager();
    var tempData = [];
    // AAC-7267 : Disable username edit
    // if(configManager.checkUserPermission("USERNAME_UPDATE")) {
    //   tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfileChangeUsername.Title"),"lblValue":"","imgArrow":"chevron.png"});
    // }
    if(configManager.checkUserPermission("PASSWORD_UPDATE")) {
      tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfileChangeAndUpdatePassword.Title"),"lblValue":"","imgArrow":"chevron.png"});
    }
    tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Title"),"lblValue":"","imgArrow":"chevron.png"});
    tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.Login.ChangeLanguage"),"lblValue":"","imgArrow":"chevron.png"});
    var data = [
      [
        {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.Settings.Profile"),"lblSeperator":"-"},
        tempData
      ]];
    this.profileData = tempData;
    this.view.segSettingsProfile.widgetDataMap = {
      "flxRightWrapper": "flxRightWrapper",
      "flxSepartaor": "flxSepartaor",
      "flxSettings": "flxSettings",
      "flxSettingsHeader": "flxSettingsHeader",
      "imgArrow": "imgArrow",
      "lblProfileHeading": "lblProfileHeading",
      "lblTitle": "lblTitle",
      "lblValue": "lblValue",
      "lblSeperator":"lblSeperator",
      "flxTopShadow":"flxTopShadow"
      
    };
    this.view.segSettingsProfile.setData(data);
    
    this.view.segSettingsProfile.onRowClick = this.onRowClickOfProfile;
  
  },
  setConsentManagement :function(){
    var data=[
      		[
                {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.consent.management"), "lblSeperator":"-"},
              [
                    {"lblTitle":kony.i18n.getLocalizedString("kony.mb.your.consent"),"lblValue":"","imgArrow":"chevron.png"},
              ]
         ]];
    this.view.segConsentManagement.setData(data);
  
  
  },
  setManageAccountAcces :function(){
    var data=[
      		[
                {"lblProfileHeading":"Manage Account Acces", "lblSeperator":"-"},
              [
                    {"lblTitle":"From Third Parties","lblValue":"","imgArrow":"chevron.png"},
              ]
         ]];
    this.view.segManageAccountAcces.setData(data);
  }
  };
});