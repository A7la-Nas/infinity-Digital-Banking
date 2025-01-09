define({
  keypadString: '0.00',
  keypadString2: '0.00',
  selectedTextbox : 1,
  isPeriodUsed: false,
  bodyTxtAlerts: "",
  isMasterSwitchToggle:false,
  channelsMasterData: null,
  supportedChannelList:[],
  alertLevelConfig:{
    CATEGORY:"CATEGORY",
    GROUP:"GROUP",
    ALERT:"ALERT"
  },
  init : function(){
     var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function() {
    //applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.customHeader.lblLocateUs.text = "";
    this.view.title = "";
    this.view.lblBodyTxt.text = "";
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
    this.setFlowActions();
    this.setKeyPadActions();
    this.view.switchDisabled.setEnabled(false);
    this.setAlertFlexesVisibility(false);
    this.isMasterSwitchToggle = false;
    this.bindData();
  },
  setFlowActions : function(){
    var scope = this;
    this.view.customHeader.flxBack.onClick = function() {
     scope.goBack();
    };
    this.view.flxAlertFrequency.onClick = function(){
      var freqObj = {"id":scope.view.lblAlertFrequencyValue.info.data.alertFrequencyId || "",
                     "value":scope.view.lblAlertFrequencyValue.info.data.frequencyValue || "",
                     "time":scope.view.lblAlertFrequencyValue.info.data.frequencyTime || ""};
      var setPreferenceData = scope.createSetPreferencesPayload();
      var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      SettingsAlertsUIModule.presentationController.navigateToAlertFrequencySelection(freqObj, setPreferenceData);
      SettingsAlertsUIModule.presentationController.commonFunctionForNavigation("frmAlertsFrequencySelection");
    };
    this.view.flxAmountWrapper.onClick = function(){
      scope.toggleKeypad(true);
      scope.selectedTextbox = 1;
      scope.view.flxAmountWrapper.skin = "sknFlxBgFFFFFFBr003e75Rad3px";
      scope.view.flxToValueWrapper.skin = "sknFlxffffffBorderf1f1f1Radius3px";
    };
    this.view.flxToValueWrapper.onClick = function(){
      scope.toggleKeypad(true);
      scope.selectedTextbox = 2;
      scope.view.flxAmountWrapper.skin = "sknFlxffffffBorderf1f1f1Radius3px";
      scope.view.flxToValueWrapper.skin = "sknFlxBgFFFFFFBr003e75Rad3px";
    };
    this.view.flxDone.onClick = function(){
      var setPrefParam = scope.createSetPreferencesPayload();
      scope.updateCurrentAlertValue(3, setPrefParam);
    };
    this.view.flxDaysWrapper.onClick = function(){
      scope.view.flxAmountWrapper.onClick();
    };
    this.view.segGroupsAlerts.onRowClick = function(){
      scope.onNavToAlertMinBalPref();
    };
  },
  
  goBack: function()
  {
     applicationManager.getPresentationUtility().showLoadingScreen();
      this.alertsManager = applicationManager.getAlertsManager();
      var alertLevel =this.alertsManager.getAlertLevelConfiguration();
      var navMan=applicationManager.getNavigationManager();
      var navobjBack = navMan.getCustomInfo("frmAlertsAccountPrefBack");
      var ntf ;
      if(alertLevel === "CATEGORY"){
        navMan.setCustomInfo("frmAlertsAccountPrefBack",""); 
        if(navobjBack !== null && navobjBack !== undefined && navobjBack !==""){
          ntf = new kony.mvc.Navigation(navobjBack);
          ntf.navigate();
        }
        else
        {
          applicationManager.getNavigationManager().navigateTo({"appName" : "ManageProfileMA", "friendlyName" : "SettingsUIModule/frmSettings"});
        }
      } else if(alertLevel === "GROUP"){
        ntf = new kony.mvc.Navigation("frmAlertGroupsList");
        ntf.navigate();
      }
      else if(alertLevel === "ALERT"){
        ntf = new kony.mvc.Navigation("frmAlertsList");
        ntf.navigate();

      }

  },
    /**
     * intialize keypadd actions
     * @method setKeyPadActions
     * @return 
     */
  setKeyPadActions: function() {
    try {
      var scopeObj = this;

      this.view.keypad.btnOne.onClick = function() {
        scopeObj.setKeypadChar(1);
      };

      this.view.keypad.btnTwo.onClick = function() {
        scopeObj.setKeypadChar(2);
      };

      this.view.keypad.btnThree.onClick = function() {
        scopeObj.setKeypadChar(3);
      };

      this.view.keypad.btnFour.onClick = function() {
        scopeObj.setKeypadChar(4);
      };

      this.view.keypad.btnFive.onClick = function() {
        scopeObj.setKeypadChar(5);
      };

      this.view.keypad.btnSix.onClick = function() {
        scopeObj.setKeypadChar(6);
      };

      this.view.keypad.btnSeven.onClick = function() {
        scopeObj.setKeypadChar(7);
      };

      this.view.keypad.btnEight.onClick = function() {
        scopeObj.setKeypadChar(8);
      };

      this.view.keypad.btnNine.onClick = function() {
        scopeObj.setKeypadChar(9);
      };

      this.view.keypad.btnZero.onClick = function() {
        scopeObj.setKeypadChar(0);
      };

      this.view.keypad.imgClearKeypad.onTouchEnd = function() {
        scopeObj.clearKeypadChar();
      };

      this.view.btnDot.onClick = function() {
        scopeObj.setKeypadChar('.');
      };
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }         
  },
   /*
  * set the title value for the form
  * @param: title to be set
  */
  setTitleText : function(title){
    this.view.title = title;
    this.view.customHeader.lblLocateUs.text = title;
  },
  /**
  * used to set the alert switch visibility.
  * @param {boolean} visible - boolean value of visibility.
  */
  setAlertSwitchesVisibility: function(visible) {
    this.view.flxInlineMessage.setVisibility(!visible)
    this.view.flxsegments.setEnabled(visible);
    this.view.flxDisableAlertsGreyOut.setVisibility(!visible);
    if (visible) {
      this.view.skin = "sknFrmAlerts";
    } else {
      this.view.skin = "sknFrmAlertsGray";
    }

  },
  /**
  * used to disable alerts.
  * @param {object} alertData - used to set the UI of corresponding switches.
  */
  disableAlerts: function(alertData) {
    var scope = this;
    var basicConfig = {
      message: kony.i18n.getLocalizedString("kony.mb.Alerts.DisableAlert"),
      alertType: constants.ALERT_TYPE_CONFIRMATION,
      yesLabel: "Yes",
      noLabel: "No",
      alertHandler: handle
    };
    kony.ui.Alert(basicConfig, {});
    function handle(response) {
      if(response) {
        scope.setAlertSwitchesVisibility(false);
        scope.updateSwitchValueInParam(alertData);
      }
      else {
        scope.view.switchReceiveAlerts.selectedIndex = 0;
      }
    }
  },
  /**
  * used to build params for setting the alert preferences of particular alert.
  * @param {Object} setPreferenceRequest - input for set alert preference
  */
  buildParamsAndSetAlertPreferences: function(setPreferenceRequest) {
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    applicationManager.getPresentationUtility().showLoadingScreen();
    var setPreferInput; 
    if(setPreferenceRequest && setPreferenceRequest.alertCategoryId){
      setPreferInput = setPreferenceRequest;
    } else{
      setPreferInput = this.createSetPreferencesPayload();
    }
    SettingsAlertsUIModule.presentationController.setAlertPreferences(setPreferInput,"frmAlertsEditPreferences");
  },
  /**
  * used to set the behavior on master switch toggle.
  * @param {object} alertData - to set the statuses using alertData.
  */
  onMasterSwitchToggle: function(alertData) {
    this.isMasterSwitchToggle = true;
    var switchIndex = this.view.switchReceiveAlerts.selectedIndex;
    if(switchIndex) {
      this.disableAlerts(alertData);
    }
    else {
      this.setAlertSwitchesVisibility(true);
      this.updateSwitchValueInParam(alertData);
    }
    this.view.flxChannelRowDummy.forceLayout();
  },
  /**
  * enable subscription of master switch and upudate preferences
  * @return {object} alertData - category preference data
  */
  updateSwitchValueInParam : function(alertData){
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    var setPrefParam ;
    if(SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration() === this.alertLevelConfig.CATEGORY){
      //enable all channels switches on intial cat subscription
      if(alertData.categorySubscription.isInitialLoad === "true"){
        for(var i=0; i<this.supportedChannelList.length; i++){
          this.view[i + "switchRow"].selectedIndex = 0;
        }
      }
      setPrefParam = this.createSetPreferencesPayload();
      setPrefParam.isSubscribed = this.view.switchReceiveAlerts.selectedIndex === 0 ? "true": "false";
      //enable all groups and alerts on intial cat subscription
      if(alertData.categorySubscription.isInitialLoad === "true"){
        for(var j=0; j< setPrefParam.alertSubscription.groups.length; j++){
          setPrefParam.alertSubscription.groups[j].isSub = true;
          for(var k=0; k<setPrefParam.alertSubscription.groups[j].alerts.length; k++){
            setPrefParam.alertSubscription.groups[j].alerts[k].isSub = true;
          }
        }
      }
      this.buildParamsAndSetAlertPreferences(setPrefParam);
    } else{
      setPrefParam = this.createSetPreferencesPayload();
      this.updateCurrentAlertValue(1, setPrefParam);
    }
  },
  /**
  * get array of channels formatted for set alert preferences payload
  * @return {object} channelPref - list of all channels
  */
  getCurrentAlertChannelToSetPreferences: function() {
    var channelPref = [];
    for(var i=0; i<this.supportedChannelList.length; i++){
      var channelObj = {
        "id": this.supportedChannelList[i].channel_id,
        "isSub": (this.view[i + "switchRow"].selectedIndex === 0) ? true : false
      };
      channelPref.push(channelObj);
    }
    return channelPref;
  },
   /**
  * get array of channels formatted for set alert preferences payload
  * @param: alert - current alert group/alert data
  * @return {object} channelPref - list of all channels
  */
  getChannelListToSetPreferences: function(alert) {
    var channelPref = [];
    var supportedChannels = alert.supportedChannels ? alert.supportedChannels.split(",") : [];
    var subscribedChannels = alert.subscribedChannels ? alert.subscribedChannels.split(",") : [];
      for(var i=0; i<supportedChannels.length; i++){
        var channelObj = {
          "id": supportedChannels[i],
          "isSub": subscribedChannels.indexOf(supportedChannels[i]) >= 0 ? true : false
        };
        channelPref.push(channelObj);
      }
    channelPref = channelPref.length > 0 ? channelPref : null;
    return channelPref;
  },
  /**
  * used to set the Alert switches Status based on subscription value.
  * @param {String} subscriptionValue - subscription status of alert switch based on backend response.
  * @returns {Integer} Index value.
  */
  setAlertSwitchStatus: function(subscriptionValue) {
    if(subscriptionValue === "true") {
      return 0;
    }
    else {
      return 1;
    }
  },
  /**
  * used to set the alert minimum balance value for the applicables.
  */
  onNavToAlertMinBalPref: function() {
    this.updateGroupAlertId();
    var setPreferenceData = this.createSetPreferencesPayload();
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    SettingsAlertsUIModule.presentationController.setDataForMinimumBalance(setPreferenceData, this.view.switchReceiveAlerts.selectedIndex);
    SettingsAlertsUIModule.presentationController.commonFunctionForNavigation("frmAlertsMinimumBalance");
  },
  /**
  * used to set selected alertGroup/alert id values.
  * @param {object} alertsData - contains selcted category details.
  */
  updateGroupAlertId : function(){
    var selRowIndex,selSecIndex;
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    var alertPrefLevel = SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration();
    if(alertPrefLevel === this.alertLevelConfig.CATEGORY){
      selSecIndex = this.view.segGroupsAlerts.selectedRowIndex[0];
      selRowIndex = this.view.segGroupsAlerts.selectedRowIndex[1];
      var segData = this.view.segGroupsAlerts.data;
      SettingsAlertsUIModule.presentationController.setAlertsGroupID(segData[selSecIndex][0].id);
      SettingsAlertsUIModule.presentationController.setAlertID(segData[selSecIndex][1][selRowIndex].id);
    } else if(alertPrefLevel === this.alertLevelConfig.GROUP){
      selRowIndex = this.view.segGroupsAlerts.selectedRowIndex[1];
      var segData1 = this.view.segGroupsAlerts.data;
      SettingsAlertsUIModule.presentationController.setAlertID(segData1[0][1][selRowIndex].id);
    }
  },
  /**
  * used to set the channel data based on backend response.
  * @param {object} channelData - Backend channel response to be set.
  */
  setChannelData: function(supportedChannels,subscribedChannels) {
    this.view.flxAlertChannelSwitches.removeAll();
    for(var i = 0; i < supportedChannels.length; i++) {
      var channel = this.view.flxChannelRowDummy.clone("" + i);
      this.view.flxAlertChannelSwitches.add(channel);
      this.view[i+"lblData"].text = supportedChannels[i].channeltext_Description;
      this.view[i+"switchRow"].selectedIndex = subscribedChannels.indexOf(supportedChannels[i].channel_id) >= 0 ? 0 : 1;
      this.view[i+"flxChannelRowDummy"].isVisible=true;
      this.supportedChannelList = supportedChannels;
      this.view[i+"switchRow"].onSlide = this.onChannelSwitchToggle;
    }
    
  },
  /*
  * on slide action fo channels switch
  */
  onChannelSwitchToggle : function(){
    this.isMasterSwitchToggle = false;
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    var setPreferParam;
    if(SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration() === this.alertLevelConfig.CATEGORY){
      this.buildParamsAndSetAlertPreferences();
    } else if(SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration() === this.alertLevelConfig.GROUP){
      setPreferParam = this.createSetPreferencesPayload();
      this.updateCurrentGroupValue(1, setPreferParam);
    }else if(SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration() === this.alertLevelConfig.ALERT){
      setPreferParam = this.createSetPreferencesPayload();
      this.updateCurrentAlertValue(2, setPreferParam);
    }
  },
  /**
  * used to set the alert flexes visibility.
  * @param {boolean} visible - boolean value of visibility.
  */
  setAlertFlexesVisibility: function(visible) {
    this.view.flxEnable.setVisibility(visible);
    this.view.flxAlertChannelSwitches.setVisibility(visible);
  },
  /**
  * used to set the alert data to the form.
  * @param {object} alertData - alertData from backend service response.
  */
  bindData: function() {
    var navManager = applicationManager.getNavigationManager();
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    var alertData = navManager.getCustomInfo("frmAlertsEditPreferences");
    //this.channelsMasterData =  navManager.getCustomInfo("alertsChannels");
    var alertLevelConfig = SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration();
    this.channelsMasterData=this.setchannelMasterData(alertData,alertLevelConfig);
    this.setAlertFlexesVisibility(true);
    this.view.flxsegments.setEnabled(true);
    this.view.flxDisableAlertsGreyOut.setVisibility(false);
    this.view.lblAlertFrequencyValue.info ={"data":""};
    this.view.lblAlertFrequencyValue.text = "";
    if(alertLevelConfig === this.alertLevelConfig.CATEGORY){
      this.showAlertCategoryLevelUI();
      this.setCategoryLevelData(alertData);
      this.setAlertGroupsData(alertData);
    } else if(alertLevelConfig === this.alertLevelConfig.GROUP){
      this.showAlertGroupLevelUI();
      this.setGroupLevelData(alertData);
      this.setAlertsData(alertData);
    } else if(alertLevelConfig === this.alertLevelConfig.ALERT){
      this.showAlertLevelUI(alertData);
      this.setAlertLevelData(alertData);
    }
    var enableFrequency = (alertData.alertConfiguration.length > 0 &&
                           alertData.alertConfiguration[0].enableFrequency === "1") ? true : false;
    if(enableFrequency === false)
      this.changeFrequencyOptionVisibility(alertLevelConfig, false);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.flxChannelRowDummy.forceLayout();
  },
  /*
  * show UI for category level configuration
  */
  showAlertCategoryLevelUI : function(){
    this.view.lblReceiveAlerts.text = kony.i18n.getLocalizedString("kony.mb.Alerts.EditAlertChannelFrequencyPreferences");
    this.view.lblEnableAlertsMain.text = kony.i18n.getLocalizedString("kony.mb.alerts.enableDisableAllAlerts");
    this.view.flxHeaderSeperator.setVisibility(true);
    this.view.flxAlertFrequencyHeader.setVisibility(false);
    this.view.flxSetAlertAttributeValue.setVisibility(false);
    this.view.flxKeypad.setVisibility(false);
    this.view.flxGroupsAlertsSegment.setVisibility(true);
    this.view.flxAlertFreqSeperatorBottom.setVisibility(false);
    this.view.flxSubHeaderText.setVisibility(true);
    this.view.flxBodyTxt.setVisibility(true);
    this.view.lblAlertFrequencyValue.skin = "sknLbl727272SSPR15px";
    this.view.flxDisableAlertsGreyOut.top = "-75%";
    this.view.flxsegments.height = "75%";
    this.view.flxsegments.forceLayout();
  },
  /*
  * show UI for alert group level configuration
  */
  showAlertGroupLevelUI : function(){
    this.view.lblReceiveAlerts.text = kony.i18n.getLocalizedString("kony.mb.Alerts.EditAlertChannelFrequencyPreferences");
    this.view.lblEnableAlertsMain.text = kony.i18n.getLocalizedString("kony.mb.alerts.enableDisableAllAlerts");
    this.view.lblBodyTxt.text = kony.i18n.getLocalizedString("kony.mb.Alerts.EditAlertPreferencesForAlertGroup");
    this.view.flxHeaderSeperator.setVisibility(false);
    this.view.flxAlertFrequencyHeader.setVisibility(false);
    this.view.flxSetAlertAttributeValue.setVisibility(false);
    this.view.flxKeypad.setVisibility(false);
    this.view.flxGroupsAlertsSegment.setVisibility(true);
    this.view.flxAlertFreqSeperatorBottom.setVisibility(false);
    this.view.flxSubHeaderText.setVisibility(true);
    this.view.flxBodyTxt.setVisibility(false);
    this.view.flxDisableAlertsGreyOut.top = "-88%";
    this.view.flxsegments.height = "88%";
    this.view.flxsegments.forceLayout();
  },
  /*
  * show UI for alert level configuration
  */
  showAlertLevelUI : function(){
    this.view.lblReceiveAlerts.text = kony.i18n.getLocalizedString("kony.mb.alerts.EditChannelPreferences");
    this.view.lblEnableAlertsMain.text = "Recieve Alert";
    this.view.flxHeaderSeperator.setVisibility(true);
    this.view.flxAlertFrequencyHeader.setVisibility(true);
    this.view.flxGroupsAlertsSegment.setVisibility(false);
    this.view.flxKeypad.setVisibility(false);
    this.view.flxSetAlertAttributeValue.setVisibility(true);
    this.view.flxAlertFreqSeperatorBottom.setVisibility(true);
    this.view.flxSubHeaderText.setVisibility(false);
    this.view.flxBodyTxt.setVisibility(true);
    this.view.flxDaysValue.setVisibility(false);
    this.view.flxToValue.setVisibility(false);
    this.view.flxDisableAlertsGreyOut.top = "-85%";
    this.view.flxsegments.height = "85%";
    this.resetAttributeUI();
    this.view.flxsegments.forceLayout();

  },
   /*
  * set alert preferences data for category level configuration
  * @param: selected category preference data
  */
  setCategoryLevelData : function(alertsData){
    var navManager = applicationManager.getNavigationManager();
    var categoryInfo = navManager.getCustomInfo("selectedCategoryInfo");
    this.setTitleText(navManager.getCustomInfo("frmAlertsListHeader"));
    //set text for based on account id/type level
    if(categoryInfo.isAccountLevel === "true") {
      this.view.lblBodyTxt.text = (applicationManager.getConfigurationManager().getAccountIDLevelAlertsFlag() === true) ?
        kony.i18n.getLocalizedString("kony.mb.alerts.editAlertPreferences") :
      kony.i18n.getLocalizedString("kony.mb.alerts.EditAlertPreferencesForAccountType");
    } else{
      this.view.lblBodyTxt.text = kony.i18n.getLocalizedString("kony.mb.Alerts.EditAlertPreferencesForCategory");
    }
    var supportedChannels = alertsData.alertCategory.supportedChannels.split(",");
    var subscribedChannels = (alertsData.alertCategory.subscribedChannels && alertsData.alertCategory.subscribedChannels.length > 0) ?
        alertsData.alertCategory.subscribedChannels.split(",") : [];
    var subscribedFreq = alertsData.alertCategory.subscribedFrequency;
    if(subscribedFreq && subscribedFreq.length > 0){
      this.changeFrequencyOptionVisibility(this.alertLevelConfig.CATEGORY, true);
      this.view.lblAlertFrequencyValue.info.data = subscribedFreq[0];
      this.view.lblAlertFrequencyValue.text = this.getFrequencyStringValue(subscribedFreq[0]);
    } else{
      this.changeFrequencyOptionVisibility(this.alertLevelConfig.CATEGORY, false);
    }
    var mapSuppChannels = this.channelsMasterData.filter(function(rec){
     if(supportedChannels.indexOf(rec.channel_id) >= 0)
       return rec;
    });
    this.setChannelData(mapSuppChannels, subscribedChannels);
    var categorySubscribed = alertsData.categorySubscription.isSubscribed === "true" ? 0: 1;
    this.view.switchReceiveAlerts.selectedIndex = categorySubscribed;
    this.setAlertSwitchesVisibility(categorySubscribed === 0 ? true : false);
    this.view.switchReceiveAlerts.onSlide = this.onMasterSwitchToggle.bind(this, alertsData);
  },
   /*
  * set alert preferences data for group level configuration
  * @param: selected category preference data
  */
  setGroupLevelData : function(alertsData){
    var currGroupData = this.getSelectedAlertDetails(alertsData,1);
    this.setTitleText(currGroupData.alerttypetext_DisplayName);
    var supportedChannels = currGroupData.supportedChannels.split(",");
    var subscribedChannels = (currGroupData.subscribedChannels && currGroupData.subscribedChannels.length > 0) ?
        currGroupData.subscribedChannels.split(",") : [];
    var subscribedFreq = currGroupData.subscribedFrequency;
    if(subscribedFreq && subscribedFreq.length > 0){
      this.changeFrequencyOptionVisibility(this.alertLevelConfig.GROUP, true);
      this.view.lblAlertFrequencyValue.info.data = subscribedFreq[0];
      this.view.lblAlertFrequencyValue.text = this.getFrequencyStringValue(subscribedFreq[0]);
    } else{
      this.changeFrequencyOptionVisibility(this.alertLevelConfig.GROUP, false);
    }
    var mapSuppChannels = this.channelsMasterData.filter(function(rec){
     if(supportedChannels.indexOf(rec.channel_id) >= 0)
       return rec;
    });
    this.setChannelData(mapSuppChannels, subscribedChannels);
    this.setAlertSwitchesVisibility(true);
  },
   /*
  * set alert preferences data for alert level configuration
  * @param: selected category preference data
  */
  setAlertLevelData : function(alertsData){
    var currAlertData = this.getSelectedAlertDetails(alertsData,2);
    this.setTitleText(currAlertData.alertsubtypetext_displayName);
    var supportedChannels = currAlertData.supportedChannels.split(",");
    var subscribedChannels = (currAlertData.subscribedChannels && currAlertData.subscribedChannels.length > 0) ?
        currAlertData.subscribedChannels.split(",") : [];
    var subscribedFreq = currAlertData.subscribedFrequency;
    if(subscribedFreq && subscribedFreq.length > 0){
      this.changeFrequencyOptionVisibility(this.alertLevelConfig.ALERT, true);
      this.view.lblAlertFrequencyValue.info.data = subscribedFreq[0];
      this.view.lblAlertFrequencyValue.text = this.getFrequencyStringValue(subscribedFreq[0]);
    } else{
      this.changeFrequencyOptionVisibility(this.alertLevelConfig.ALERT, false);
    }
    var mapSuppChannels = this.channelsMasterData.filter(function(rec){
     if(supportedChannels.indexOf(rec.channel_id) >= 0)
       return rec;
    });
    this.setChannelData(mapSuppChannels, subscribedChannels);
    var alertSubscribed = currAlertData.isSubscribed === "true" ? 0: 1;
    this.view.switchReceiveAlerts.selectedIndex = alertSubscribed;
    this.setAlertSwitchesVisibility(alertSubscribed === 0 ? true:false);
    this.setAlertAttributeDetails(alertsData);
    this.view.switchReceiveAlerts.onSlide = this.onMasterSwitchToggle.bind(this, alertsData);
  },
  /*
  * set alert groups and corresponding alerts data to segment
  * @param: selected category dpreferenc data
  */
  setAlertGroupsData : function(alertsData){
    var scopeObj = this;
    var widgetMap = {
      "id":"id",
      "flxAlertsListingRow":"flxAlertsListingRow",
      "lblName":"lblName",
      "lblValue":"lblValue",
      "flxImage":"flxImage",
      "imgArrow":"imgArrow",
      "flxSeperator":"flxSeperator",
      "flxTransactionListHeader":"flxTransactionListHeader",
      "lblHeader":"lblHeader",
      "flxTypeOneShadow":"flxTypeOneShadow",
      "flxShadowBottom":"flxShadowBottom"
    };
    var alertGroups = alertsData.alertTypes;
    var alerts = [];
    if(alertGroups.length >0){
      var segData = alertGroups.map(function(rec){
        if(rec.alertSubTypes)
          alerts = rec.alertSubTypes.map(scopeObj.mappingAlertsDataSegment);
        var group = {
          "id":rec.alerttype_id,
          "lblHeader":rec.alerttypetext_DisplayName,
          "flxTypeOneShadow":"flxTypeOneShadow",
          "flxShadowBottom":{"isVisible":false},
          "template":"flxTransactionListHeader",
        };
        return [group,alerts];

      });
      this.view.segGroupsAlerts.widgetDataMap = widgetMap;
      this.view.segGroupsAlerts.setData(segData);
      this.view.segGroupsAlerts.info = {"data":alertsData };
      this.view.flxGroupsAlertsSegment.setVisibility(true);
    } else{
      this.view.flxGroupsAlertsSegment.setVisibility(false);
    }
    this.view.flxGroupsAlertsSegment.forceLayout();
  },
  /*
  * set alerts data to segment
  * @param: array of alerts
  */
  setAlertsData : function(alertsData){
    var widgetMap = {
      "id":"id",
      "flxAlertsListingRow":"flxAlertsListingRow",
      "lblName":"lblName",
      "lblValue":"lblValue",
      "flxImage":"flxImage",
      "imgArrow":"imgArrow",
      "flxSeperator":"flxSeperator",
      "flxTransactionListHeader":"flxTransactionListHeader",
      "lblHeader":"lblHeader",
      "flxTypeOneShadow":"flxTypeOneShadow",
      "flxShadowBottom":"flxShadowBottom"
    };
    var filteredGroupAlerts = this.getSelectedAlertDetails(alertsData,1);
    if(filteredGroupAlerts.alertSubTypes && filteredGroupAlerts.alertSubTypes.length > 0){
      var segData = [];
      var alertsMapData = filteredGroupAlerts.alertSubTypes.map(this.mappingAlertsDataSegment);
      var alertsHeader = {
        "lblHeader": kony.i18n.getLocalizedString("kony.mb.Settings.Alerts"),
        "flxTypeOneShadow":"flxTypeOneShadow",
        "flxShadowBottom":{"isVisible":false},
        "template":"flxTransactionListHeader",
      };
      segData.push([alertsHeader,alertsMapData]);
      this.view.segGroupsAlerts.widgetDataMap = widgetMap;
      this.view.segGroupsAlerts.setData(segData);
      this.view.segGroupsAlerts.info = {"data":alertsData};
      this.view.flxGroupsAlertsSegment.setVisibility(true);
    } else{
      this.view.flxGroupsAlertsSegment.setVisibility(false);
    }
    this.view.flxGroupsAlertsSegment.forceLayout();
  },
  /*
  * segment data mapping for alerts list
  * @param: alert
  * @return: mapped alert Json
  */
  mappingAlertsDataSegment : function(alert){
    var value = "";
    if(alert.alertAttribute && alert.alertAttribute.alertattribute_type && alert.alertAttribute.alertattribute_type === "AMOUNT"){
      value = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(alert.alertsubtype_value1);
      if(alert.alertCondition && alert.alertCondition.NoOfFields && alert.alertCondition.NoOfFields === "2"){
        value = value + " - "+ applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(alert.alertsubtype_value2);
      }
    } else{
      value = alert.alertsubtype_value1;
    }
    if (kony.i18n.getCurrentLocale() === "ar_AE"){
      return {
        "id":alert.alertsubtype_id,
        "lblName":alert.alertsubtypetext_displayName,
        "lblValue":value,
        "flxImage":{"isVisible":value ? true : false},
        "imgArrow":"chevron_reverse.png",
        "flxSeperator":"flxSeperator",
        "template":"flxAlertsListingRow",
      };
    }
    else{
      return {
        "id":alert.alertsubtype_id,
        "lblName":alert.alertsubtypetext_displayName,
        "lblValue":value,
        "flxImage":{"isVisible":value ? true : false},
        "imgArrow":"chevron_1.png",
        "flxSeperator":"flxSeperator",
        "template":"flxAlertsListingRow",
      };
    }
  },
  /*
  * form the frequency values string
  * @param: subscribed frequency obj
  * @return: frequency string
  */
  getFrequencyStringValue : function(freqObj){
    var formatUtility = applicationManager.getFormatUtilManager();
    var freqId = freqObj.alertFrequencyId ? this.getDisplayValueForFreq(freqObj.alertFrequencyId) : "";
    var freqVal = "";
    if(freqObj.alertFrequencyId === "WEEKLY"){
      freqVal = freqObj.frequencyValue ? this.getDisplayNameForDay(freqObj.frequencyValue) + ", " : "";
    }else{
      freqVal = freqObj.frequencyValue ? freqObj.frequencyValue + ", " : "";
    }
     
    var freqTime = freqObj.frequencyTime ? formatUtility.getTwelveHourTimeString(freqObj.frequencyTime) : "";
    var freqString = freqId+", "+ freqVal+""+ freqTime;
    return freqString;
  },
  /*
  * show/hide the edit frequency option
  * @param: alertLevel - CATEGORY/GROUP/ALERT
  * @param: true/false
  */
  changeFrequencyOptionVisibility : function(alertLevel,isVisible){
    if(alertLevel === this.alertLevelConfig.ALERT){
      this.view.flxAlertFrequencyHeader.setVisibility(isVisible);
      this.view.flxAlertFrequency.setVisibility(isVisible);
    }else{  
      this.view.flxAlertFrequency.setVisibility(isVisible);
    }
  },
  /*
  * set alert attribute details in case of alert level
  * @param: alertsData
  */
  setAlertAttributeDetails : function(alertsData){
    var currAlert = this.getSelectedAlertDetails(alertsData,2);
    this.view.lblAlertMessage.text = currAlert.alertsubtypetext_description;
    if(currAlert.alertAttribute){
      this.view.flxSetAlertAttributeValue.setVisibility(true);
      if(currAlert.alertAttribute && currAlert.alertAttribute.alertattribute_id && currAlert.alertAttribute.alertattribute_type === "AMOUNT"){
        this.setKeypadStringValue(currAlert);
        this.view.flxAmount.setVisibility(true);
        this.view.flxToValue.setVisibility(false);
        this.view.flxDaysValue.setVisibility(false);
        this.view.flxAmount.setEnabled(true);
        this.updateAmountValue(1);
        if(currAlert.alertCondition && currAlert.alertCondition.NoOfFields && currAlert.alertCondition.NoOfFields === "2"){
          this.updateAmountValue(2);
          this.view.flxToValue.setVisibility(true);
          this.view.flxToValue.setEnabled(true);
        }
      } else if(currAlert.alertAttribute && currAlert.alertAttribute.alertattribute_id && currAlert.alertAttribute.alertattribute_type !== "AMOUNT"){
        this.setKeypadStringValue(currAlert);
        this.updateInputBullets();
        this.view.flxAmount.setVisibility(false);
        this.view.flxToValue.setVisibility(false);
        this.view.flxDaysValue.setVisibility(true);
      }
    } else{
      this.view.flxSetAlertAttributeValue.setVisibility(false);
    }
  },
  /**
  * show/hide the keypad
  * @method toggleKeypad
  * @param {boolean} - visible
  */
  toggleKeypad : function(visible){
    if(visible === true){
      this.view.flxsegments.height = "45%";
      this.view.flxKeypad.setVisibility(true);
      this.view.flxsegments.scrollToEnd();
    } else{
      this.view.flxsegments.height = "85%";
      this.view.flxKeypad.setVisibility(false);
    }
    this.view.flxBody.forceLayout();
  },
  /*
  * get detils of selected alert from the category details response
  * @param: alertsData-category details response
  * @param: option- return selected alertgroup / alert detail based on option
  * @return: alertGroup/alert data json updated with selected alert details
  */
  getSelectedAlertDetails : function(alertsData,option){
    var groupId = "", alertId ="",selectedAlert = alertsData;
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    groupId = SettingsAlertsUIModule.presentationController.getAlertsGroupID();
    alertId = SettingsAlertsUIModule.presentationController.getAlertID();
    var alertGroups = alertsData.alertTypes;
    for(var i=0;i<alertGroups.length;i++){
      if(alertGroups[i].alerttype_id ===groupId){
        selectedAlert = alertGroups[i];
        break;
      }
    }
    if(option === 1){
      return selectedAlert;
    }else if(option === 2){
      //get selected alert from selected group
      var alerts = selectedAlert.alertSubTypes ? selectedAlert.alertSubTypes : []; 
      for(var j=0; j< alerts.length; j++){
        var alert = selectedAlert.alertSubTypes[j];
        if(alertId === alert.alertsubtype_id){
          selectedAlert = alert;
          return selectedAlert;
        }
      }
    }

  },
   /*
  * form set alert preferences request payload
  * @param: preferences data
  */
  createSetPreferencesPayload : function(){
    var navManager = applicationManager.getNavigationManager();
    var alertData = navManager.getCustomInfo("frmAlertsEditPreferences");
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    var setPreferParam = {
      "alertCategoryId": SettingsAlertsUIModule.presentationController.getAlertsCategoryID(),
      "isSubscribed":alertData.categorySubscription.isSubscribed,
      "alertSubscription":{
        "preferenceLevel": SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration(),
        "groups": []
      }
     
    };
    setPreferParam.alertSubscription.groups = this.getAlertGroupForSetPreferences(alertData);
     //set channels,frequence in case category level preference
    if(SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration() === this.alertLevelConfig.CATEGORY){
      setPreferParam.alertSubscription["chanls"] = this.getCurrentAlertChannelToSetPreferences();
      if(this.view.flxAlertFrequency.isVisible === true && alertData.alertCategory.subscribedFrequency){
        setPreferParam.alertSubscription["freq"] = {"id": alertData.alertCategory.subscribedFrequency[0].alertFrequencyId || "",
                                  "value": alertData.alertCategory.subscribedFrequency[0].frequencyValue || "",
                                  "time": alertData.alertCategory.subscribedFrequency[0].frequencyTime || ""};
      }else{
        setPreferParam.alertSubscription["freq"] = null;
      }
    }
    var categoryInfo = navManager.getCustomInfo("selectedCategoryInfo");
    //in case of account level alerts
    if(categoryInfo.isAccountLevel === "true" && applicationManager.getConfigurationManager().getAccountIDLevelAlertsFlag() === true) {
      setPreferParam["accountId"] = SettingsAlertsUIModule.presentationController.getAccountID();
    } else if(categoryInfo.isAccountLevel === "true" && applicationManager.getConfigurationManager().getAccountIDLevelAlertsFlag() === false){
      setPreferParam["accountTypeId"] = SettingsAlertsUIModule.presentationController.getAccountTypeID();
    }
    return setPreferParam;
    
  },
  /*
  * create alert groups/alerts payload required to set alert preferences
  * @param: preferences data
  * @return: alert groups array formatted for set alert preferencess call
  */
  getAlertGroupForSetPreferences : function(alertData){
    var scopeObj = this;
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    var alertGroupsArr = [];
    for(var i =0; i< alertData.alertTypes.length; i++){
      var groupObj ={
        "typeID": alertData.alertTypes[i].alerttype_id,
        "isSub": alertData.alertTypes[i].isSubscribed === "true" ? true : false,
        "alerts":[]
      };
       //set channels,frequence in case group level preference
      if(SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration() === this.alertLevelConfig.GROUP){
        groupObj["chanls"] = this.getChannelListToSetPreferences(alertData.alertTypes[i]);
        if(this.view.flxAlertFrequency.isVisible === true && alertData.alertTypes[i].subscribedFrequency){
          groupObj["freq"] = {"id": alertData.alertTypes[i].subscribedFrequency[0].alertFrequencyId || "",
                              "value": alertData.alertTypes[i].subscribedFrequency[0].frequencyValue || "",
                              "time": alertData.alertTypes[i].subscribedFrequency[0].frequencyTime || ""};
        } else{
          groupObj["freq"] = null;
        }
      }
      //ALERTS in group
      var alertsOfGroup = alertData.alertTypes[i].alertSubTypes ? alertData.alertTypes[i].alertSubTypes : [];
      var alertsArr = alertsOfGroup.map(function(alert){
        var alertObj = {
          "id": alert.alertsubtype_id,
          "value1": alert.alertsubtype_value1 || "",
          "isSub" : alert.isSubscribed === "true" ? true : false
        };
        if(alert.alertCondition && alert.alertCondition.NoOfFields === "2")
          alertObj["value2"] = alert.alertsubtype_value2;
        //set channels,frequence in case alert level preference
        if(SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration() === scopeObj.alertLevelConfig.ALERT){
          alertObj["chanls"] = scopeObj.getChannelListToSetPreferences(alert);
          if(scopeObj.view.flxAlertFrequency.isVisible === true && alert.subscribedFrequency){
            alertObj["freq"] = {"id": alert.subscribedFrequency[0].alertFrequencyId || "",
                                "value": alert.subscribedFrequency[0].frequencyValue || "",
                                "time": alert.subscribedFrequency[0].frequencyTime || ""};
          }else{
            alertObj["freq"] = null;
          }
        }
        return alertObj;
      });
      groupObj.alerts = alertsArr;
      alertGroupsArr.push(groupObj);
    }
    return alertGroupsArr;
  },
  /*
  * used to update subscribed,channel,frequency values for current group
  * @param: option(1/2) - indicates which param to update 
  */
  updateCurrentGroupValue : function(option, setPreferParam){
    var groupId ="";
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    groupId = SettingsAlertsUIModule.presentationController.getAlertsGroupID();
    var alertGroup = setPreferParam.alertSubscription.groups;
    for(var i=0; i<alertGroup.length; i++){
      if(alertGroup[i].typeID === groupId){
        if(option === 1){
          alertGroup[i].chanls = this.getCurrentAlertChannelToSetPreferences();
        } 
        break;
      }
    }
    this.buildParamsAndSetAlertPreferences(setPreferParam);
  },
  /*
  * used to update subscribed,channel,frequency values for current alert
  * @param: option(1/2/3) - indicates which param to update 
  */
  updateCurrentAlertValue : function(option, setPreferParam){
    var alertId = "",groupId ="", alerts = [], isValid = true;
    this.isMasterSwitchToggle = false;
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    var navManager = applicationManager.getNavigationManager();
    alertId = SettingsAlertsUIModule.presentationController.getAlertID();
    groupId = SettingsAlertsUIModule.presentationController.getAlertsGroupID();
    var alertGroups = setPreferParam.alertSubscription.groups;
    //get current group from array
    for(var i=0; i<alertGroups.length; i++){
      if(alertGroups[i].typeID === groupId){
        alerts = alertGroups[i].alerts;
        break; 
      }
    }
    for(var j=0; j<alerts.length; j++){
      if(alerts[j].id === alertId){
        if(option === 1){
          alerts[j].isSub = this.view.switchReceiveAlerts.selectedIndex === 0 ? true : false;
          var groupSub = this.getGroupSubBasedOnAlertSub(alerts);
          alertGroups[i].isSub = groupSub;
        } else if(option === 2){
          alerts[j].chanls = this.getCurrentAlertChannelToSetPreferences();
        } else{
          isValid = this.validateAttributeValue();
          alerts[j] = (isValid === true) ? this.updateAlertAttributeValue(alerts[j]) : alerts[j];
        }
        break;
      }
    }
    if(isValid){
      this.buildParamsAndSetAlertPreferences(setPreferParam);
    } else{
      this.bindGenericError(kony.i18n.getLocalizedString("kony.mb.common.validAmount"));           
    }
  },
  /*
   *update group subscription based on all alerts sub
   *@param: prefPayload - set prefernces req payload
   *@return : group subscription - true/false
   */
  getGroupSubBasedOnAlertSub : function(alertsList){
    var trueCount = 0;
    for(var k=0;k<alertsList.length; k++){
      if(alertsList[k].isSub === true){
        trueCount = trueCount +1;
      }
    }
    if(trueCount === 0){
      return false;
    } else{
      return true;
    }
  },
  /*
  * get display value for frequency
  * @param: frequency id
  */
  getDisplayValueForFreq : function(id){
    var configManager = applicationManager.getConfigurationManager();
    var displayValue = configManager.constants[id] || "";
    return displayValue;
  },
  /*
  * get display value for days
  * @param: day id
  */
  getDisplayNameForDay : function(id){
    var configManager = applicationManager.getConfigurationManager();
    var days = configManager.getDaysDisplayNames();
    var dayValue = days[id] || "";
    return dayValue;
   },
   /**
  * @method setKeypadChar - update variable with char typed
  * @param {char} char - each character from the amount entered.
  * @return 
  */
  setKeypadChar: function(char) {
    try{
      if(this.view.flxAmount.isVisible || this.view.flxToValue.isVisible){
        if (char === '.') {
          if (this.isPeriodUsed === false) {
            this.isPeriodUsed = true;
          } else {
            return;
          }
        }
        var keyPadStringValue = (this.selectedTextbox === 1) ? this.keypadString : this.keypadString2;
        keyPadStringValue = keyPadStringValue + char;
        var firstChar1 = keyPadStringValue[0];
        keyPadStringValue = keyPadStringValue.split("");
        for(var i=1; i<keyPadStringValue.length; i++){
          if(keyPadStringValue[i]==='.'){
            keyPadStringValue[i-1] = keyPadStringValue[i+1];
            i++;
          }else{
            keyPadStringValue[i-1]=keyPadStringValue[i];
          }
        }
        keyPadStringValue = keyPadStringValue.join("");
        keyPadStringValue = keyPadStringValue.substr(0, keyPadStringValue.length-1);
        if(firstChar1!=='0'){
          keyPadStringValue = firstChar1 + keyPadStringValue;
        }
        if(this.selectedTextbox === 1) this.keypadString = keyPadStringValue;
        else if(this.selectedTextbox === 2) this.keypadString2 = keyPadStringValue;
        this.updateAmountValue(this.selectedTextbox);
      }
      else{
        if(this.selectedTextbox === 1) this.keypadString = this.keypadString + char;
        else if(this.selectedTextbox === 2) this.keypadString2 = this.keypadString2 + char;
        this.updateInputBullets();
      }
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
    } 
  },
  /**
  * used to clear the amount value from the amount label.
  * @param {} 
  */
  clearKeypadChar: function () {
    try{
      var keyPadStringValue = (this.selectedTextbox === 1) ? this.keypadString : this.keypadString2;
      if(this.view.flxAmount.isVisible){
        if(keyPadStringValue ==='0.00') return;

        keyPadStringValue = keyPadStringValue.split("");
        for(var i=keyPadStringValue.length-2; i>=0; i--){
          if(keyPadStringValue[i]=== '.'){
            keyPadStringValue[i+1] = keyPadStringValue[i-1];
            i--;
          }else{
            keyPadStringValue[i+1] = keyPadStringValue[i];
          }
        } 
        keyPadStringValue = keyPadStringValue.join("");
        keyPadStringValue = keyPadStringValue.substr(1);
        if(keyPadStringValue[0]=== '.'){
          keyPadStringValue = '0'+ keyPadStringValue;
        }
        if(this.selectedTextbox === 1) this.keypadString = keyPadStringValue;
        else if(this.selectedTextbox === 2) this.keypadString2 = keyPadStringValue;
        this.updateAmountValue(this.selectedTextbox);
      }
      else{
        if (keyPadStringValue.length === 1) {
          this.keypadString = '';
          this.updateInputBullets();
        }
        if (keyPadStringValue.length !== 0) {
          this.keypadString = keyPadStringValue.substr(0, keyPadStringValue.length - 1);
          this.updateInputBullets();
        }
      }
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
    } 
  },
  /**
  * used to update the amount value to the amount label.
  * @param {}
  */
  updateAmountValue: function(option){
    try {
      if(option === 1 && (this.keypadString==='0.00' || this.keypadString==="")){
       // this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.flxDone.setEnabled(false);
        this.view.lblAmount.text = this.view.keypad.formatAmount('0.00');
      } else if(option === 2 && (this.keypadString2==='0.00' || this.keypadString2==="")){
       // this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.flxDone.setEnabled(false);
        this.view.lblToValue1.text = this.view.keypad.formatAmount('0.00');
      }
      else{
        var keypadStringCommas = '0.00';
        var beforeDecimal = (option === 1) ? this.keypadString.split('.')[0] :this.keypadString2.split('.')[0] ;
        var afterDecimal = (option === 1) ? this.keypadString.split('.')[1] : this.keypadString2.split('.')[1];
        if(afterDecimal === undefined) {
          afterDecimal = "00";
        }
        if(beforeDecimal.length>3){
          var withCommas = (beforeDecimal.length)/3;
          var withoutCommas = (beforeDecimal.length)%3;
          var temp = '';
          if(withoutCommas!==0){
            temp = beforeDecimal.substr(0, withoutCommas)+',';
          }
          for(var i = withoutCommas; i<beforeDecimal.length; i+=3){
            temp+=beforeDecimal.substr(i, 3)+',';
          }
          beforeDecimal = temp.substr(0, temp.length-1);
        }
        keypadStringCommas = beforeDecimal + '.'+afterDecimal;
       // this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.flxDone.setEnabled(true);
        if(option === 1) this.view.lblAmount.text = this.view.keypad.formatAmount(keypadStringCommas);
        else if(option === 2) this.view.lblToValue1.text = this.view.keypad.formatAmount(keypadStringCommas);
      }
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }         
  },
   /**
  * used to update the attribute value to label other than amount
  * @param {}
  */
  updateInputBullets: function() {
    if (this.keypadString === "") {
      this.view.lblDaysValue.text = "0";
      this.view.lblDaysValue.skin = "skinlblDarkened";
      this.view.flxDone.setEnabled(false);
      //this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      //this.view.btnContinue.focusSkin = "sknBtnOnBoardingInactive";
    }
    else {
      this.view.lblDaysValue.text = this.keypadString;
      this.view.lblDaysValue.skin = "sknLbl4a4a4aSSP42px";
      if (parseInt(this.keypadString) !== 0) {
        this.view.flxDone.setEnabled(true);
        //this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        //this.view.btnContinue.focusSkin = "sknBtn0095e4RoundedffffffSSP26px";
      } else {
        this.view.flxDone.setEnabled(false);
        //this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        //this.view.btnContinue.focusSkin = "sknBtnOnBoardingInactive";
      }
    }
    this.view.forceLayout();
  },
  /*
  * assign variables with the alert values from data
  * @param: alert data
  */
  setKeypadStringValue: function(typeData){
    if(typeData.alertAttribute && typeData.alertAttribute.alertattribute_type === "AMOUNT"){
      if (typeData.alertsubtype_value1 !== undefined && typeData.alertsubtype_value1 !== "" && typeData.alertsubtype_value1 !== null) {
        if(typeData.alertsubtype_value1.indexOf(".")===-1)
          this.keypadString = typeData.alertsubtype_value1+".00";
        else
          this.keypadString = typeData.alertsubtype_value1;
      } else {
        this.keypadString = "0.00";
      }
      //in case of 2 values
      if (typeData.alertsubtype_value2 !== undefined && typeData.alertsubtype_value2 !== "" && typeData.alertsubtype_value2 !== null) {
        if(typeData.alertsubtype_value2.indexOf(".")===-1)
          this.keypadString2 = typeData.alertsubtype_value2+".00";
        else
          this.keypadString2 = typeData.alertsubtype_value2;
      } else {
        this.keypadString2 = "0.00";
      }
    }
    else{
      if (typeData.alertsubtype_value1 !== undefined && typeData.alertsubtype_value1 !== "" && typeData.alertsubtype_value1 !== null) {
        this.keypadString = typeData.alertsubtype_value1;
      } else {
        this.keypadString = "0";
      }
      //in case of 2 values
      if (typeData.alertsubtype_value2 !== undefined && typeData.alertsubtype_value2 !== "" && typeData.alertsubtype_value2 !== null) {
        this.keypadString2 = typeData.alertsubtype_value2;
      } else {
        this.keypadString2 = "0";
      }
    }
  },
  /**
  * update the attribute values for the alert
  * @param {object} alertObj - current alert object from set preferences payload 
  * @return {object} alertObj - alertObj with updated attribute values
  */
  updateAlertAttributeValue : function(alertObj){
    this.toggleKeypad(false);
    var amount2, amountWithoutCommas2, validAmountString2;
    var amount1 = this.keypadString.replace(/^0+/, '');
    if(amount1 === ".00")
      amount1 = "0.00";  
    var amountWithoutCommas1=amount1.replace(/,/g , '');
    var validAmountString1=""+amountWithoutCommas1;
    alertObj.value1 = validAmountString1;
    //second attribute
    if(this.view.flxToValue.isVisible === true){
      amount2 = this.keypadString2.replace(/^0+/, '');
      if(amount2 === ".00")
        amount2 = "0.00";  
      amountWithoutCommas2=amount2.replace(/,/g , '');
      validAmountString2=""+amountWithoutCommas2;
      alertObj["value2"]= validAmountString2;
    }
    return alertObj;
  },
   /**
  * validate the attribute values entered
  * @return {boolean} is valid or not	 
  */
  validateAttributeValue : function(){
    var amount2, isValid = true;
    var amount1 = this.keypadString.replace(/^0+/, '');
    isValid = (amount1 >= "1") ? true : false;
    if(isValid && this.view.flxToValue.isVisible === true){
      amount2 = this.keypadString2.replace(/^0+/, '');
      isValid = (amount2 >= "1") ? true : false;
      if(isValid && (parseFloat(this.keypadString) > parseFloat(this.keypadString2))){
        isValid = false;
      }
    }
    return isValid;
  },
  /*
  * clear error validations for attributes
  */
  resetAttributeUI: function(){
    this.selectedTextbox = 1;
    this.view.flxAmountWrapper.skin = "sknFlxffffffBorderf1f1f1Radius3px";
    this.view.flxToValueWrapper.skin = "sknFlxffffffBorderf1f1f1Radius3px";
    this.view.flxDaysWrapper.skin= "sknFlxffffffBorderf1f1f1Radius3px";
  },
  /*
  * show error toast message
  * @param: errorMsg - message to be shown
  */
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  setchannelMasterData: function(alertsData,alertLevelConfig) {
    var supportedChannels,currAlertData;
    if (alertLevelConfig === this.alertLevelConfig.CATEGORY) 
    {
      supportedChannels = alertsData.alertCategory.supportedChannels.split(",");    
    }
    else if (alertLevelConfig === this.alertLevelConfig.GROUP) {
      currAlertData = this.getSelectedAlertDetails(alertsData, 1);
      supportedChannels = currAlertData.supportedChannels.split(",");
    }
    else if (alertLevelConfig === this.alertLevelConfig.ALERT) 
    {
      currAlertData = this.getSelectedAlertDetails(alertsData, 2);
      supportedChannels = currAlertData.supportedChannels.split(",");
    }
    var channelmasterdata = [];
    for (var i = 0; i < supportedChannels.length; i++) {
      var subTypeChannel;
      switch (supportedChannels[i]) {
        case "CH_EMAIL":
          subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.email');
          break;
        case "CH_NOTIFICATION_CENTER":
          subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.Alerts.SecureMessages');
          break;
        case "CH_SMS":
          subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.sms');
          break;
        default:
          subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.Alerts.pushNotifications');
      }
      var channeldata = {
        "channel_id": supportedChannels[i],
        "channeltext_Description": subTypeChannel
      };
      channelmasterdata.push(channeldata);
    }
    return channelmasterdata;
  }
});