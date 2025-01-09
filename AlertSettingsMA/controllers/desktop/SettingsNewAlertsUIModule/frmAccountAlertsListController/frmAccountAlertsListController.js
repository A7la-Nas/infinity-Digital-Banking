define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
	alertaccounts:null,
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.serverError) {
          this.showServerError(viewModel.serverError);
        } else {
          if (viewModel.isLoading !== undefined) {
            this.changeProgressBarState(viewModel.isLoading);
          }
           if (viewModel.accountAlertsData) {
              this.setAccountAlerts(viewModel.accountAlertsData);
              FormControllerUtility.hideProgressBar(this.view);
           }
        }
      }
      this.view.lblAlertsHeading.setActive(true);
    },
    preShow:function()
    {
      var self=this;
      this.view.flxRight.setVisibility(true);
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.postShow=this.postShowProfile;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.profileMenu.checkLanguage();
      //this.view.profileMenu.forceInitializeProfileMenu();
      //this.view.customheadernew.activateMenu("Settings","Alert Settings");
      this.setFlowActions();
      this.setAccessibility();
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      }
      this.view.forceLayout();
    },
    /**
	* *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
	*  Method to set the text in mobile breakpoint
	*/
    setSelectedValue: function (text) {
      var self = this;
      self.view.lblAccountSettingsMobile.text = kony.i18n.getLocalizedString(text);
    },
    /**
	*  Method to set ui for the component in mobile breakpoint
	*/
    toggleMenuMobile: function () {
      if (this.view.lblCollapseMobile.text == "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": 0,
            "aria-expanded": true,
            "aria-labelledby":"lblAccountSettingsMobile",
            "role":"button"
          }
        }
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text  = "O";
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": 0,
            "aria-expanded": false,
            "aria-labelledby":"lblAccountSettingsMobile",
            "role":"button"
          }
        }
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
      }
    }, 
     
     
    
    /**
	* *@param {Boolean} isLoading- True or false to show/hide the progess bar
	*  Method to set show/hide the progess bar
	*/
    changeProgressBarState: function(isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      }
    },
    postShowProfile: function() { 
      applicationManager.getNavigationManager().applyUpdates(this);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //this.view.lblHeading.toolTip=kony.i18n.getLocalizedString("i18n.bulkWire.acknowledgmentHeader");
      this.view.lblHeading.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
      this.view.forceLayout();
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.customheadernew.collapseAll();
      this.view.lblAlertsHeading.setActive(true);
    },
    onKeyPressCallBack : function(eventobject,eventPayload){
        if(eventPayload.keyCode===27){
        if(this.view.flxDialogs.isVisible){
            this.view.flxDialogs.isVisible = false; 
        }
        if(kony.application.getCurrentBreakpoint()===640){
          if(this.view.flxLeft.isVisible){
              this.toggleMenuMobile();
              this.view.flxAccountSettingsCollapseMobile.setActive(true);
          }
      }
        this.view.customheadernew.onKeyPressCallBack(eventobject,eventPayload);
        }
      },
    onBreakpointChange: function (width) {
      var scope = this;
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
	  if(this.alertaccounts!==null)
            this.setAccountAlerts(this.alertaccounts);
    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Alerts");
      this.view.flxLeft.accessibilityConfig={
          a11yARIA:{
              "aria-live": "off",
              "tabindex":-1
          }
      };
      this.view.flxRight.accessibilityConfig={
          a11yARIA:{
              "aria-live": "off",
              "tabindex":-1
          }
      }
  }
  else{
      this.view.flxLeft.accessibilityConfig={
          a11yARIA:{
              "tabindex":-1
          }
      }
      this.view.flxRight.accessibilityConfig={
          a11yARIA:{
              "tabindex":-1
          }
      }
  }
      this.view.forceLayout();      
    },
    setAccessibility: function(){
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.customheadernew.lblHeaderMobile.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.Alerts");
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
        "a11yARIA": {
          "role":"button",
          "tabindex": 0,
          "aria-expanded": false,
          "aria-labelledby": "lblAccountSettingsMobile"
        }
      }
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": kony.i18n.getLocalizedString("i18n.Alerts.AccountAlertSettingsRight")
      };

     
    },  
    /**
	*  Method to set the Form Flow Actions such as button onclick events
	*/
    setFlowActions:function(){
      var scopeObj=this;
     
    },
    
      /**
      * Method to handle UI of account alerts
      */
   setAccountAlerts: function(alertsData) {        
      var accounts = [];
	  this.alertaccounts = alertsData;
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      var accountdetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('SettingsNewAlertsUIModule');
      var AlertName = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.getAlertsMenuValues();
      var AlertsCategories = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.getAlertsCategoryResponse();
               for(var i=0; i<AlertsCategories.records.length; i++){
                    if(AlertsCategories.records[i].alertcategory_id === AlertName){
                    this.view.profileMenu.activateMenu("ALERTSETTINGS", AlertsCategories.records[i].alertcategory_Name);
                    this.view.lblAlertsHeading.text=AlertsCategories.records[i].alertcategory_Name;
                    this.view.lblAccountSettingsMobile.text= AlertsCategories.records[i].alertcategory_Name;
					this.view.title = AlertsCategories.records[i].alertcategory_Name;
                    }
                }
      this.view.lblAlertsWarning.text= kony.i18n.getLocalizedString("i18n.Profilemanagement.lblAlertsWarningNew");
      accounts = accountdetails.presentationController.accounts; 
      
      for(var i=0; i < accounts.length; i++){
				for(var j=0; j < alertsData.accountAlerts.length; j++){
				  if(accounts[i].Account_id === alertsData.accountAlerts[j].accountID){
					accounts[i]["isEnabled"] = alertsData.accountAlerts[j].isEnabled;
				  }
				} 
       }
      this.setAccountAlertsByGrouping(accounts);
     // FormControllerUtility.hideProgressBar(this.view);
    },
    
   
    
            
    setAccountAlertsByGrouping: function(alertsInput) {
        var filterList = function (input) {
          try {
            let accountData = JSON.parse(JSON.stringify(input));
            let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase())) && (item["externalIndicator"] == null ||item["externalIndicator"] == 'false')));
            return filteredAccountData;
          } catch(err){
            return input;
          }
        };
        var alerts = filterList(alertsInput);
        var scopeObj = this;
		var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
        var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;   
        var isBusinessUser = applicationManager.getConfigurationManager().getConfigurationValue('isSMEUser') === "true";
        
        this.view.segAlerts.widgetDataMap = {
            flxAccountTypeAlerts: "flxAccountTypeAlerts",
            flxRow2: "flxRow2",
            lblAccountType: "lblAccountType",
            btnModifyAlerts: "btnModifyAlerts",
            flxAlertsRow1: "flxAlertsRow1",
            flxAlertsStatusCheckbox: "flxAlertsStatusCheckbox",
            lblAlertStatusIndicator: "lblAlertStatusIndicator",
            lblAlertsStatus: "lblAlertsStatus",
            flxSeperator: "flxSeperator",
            lblSeperator: "lblSeperator",
            lblSeparator: "lblSeparator",
            lblAccountName: "lblAccountName",
            lblUsers:"lblUsers",
            flxAccountTypes:"flxAccountTypes",
            lblAccountNumber: "lblAccountNumber"
        };    
       this.view.segAlerts.setVisibility(true);
       var widgetFromData = isSingleCustomerProfile ? this.getDataWithAccountTypeSections(alerts) : this.getDataWithSections(alerts);
        if (widgetFromData) {
          this.view.segAlerts.setData(widgetFromData);
        }
    },
    
    /**
    *  creates the segment row data with section header , account number and other details
    */
    getDataWithAccountTypeSections: function(accounts){
      var scopeObj = this;
      var finalData = {};
      var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
      var headerTemplate="";
      var mobile = false ;
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) 
      {
        mobile = true;
      }
      headerTemplate="flxAccountTypes";
      accounts.forEach(function(account){
        var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
        if(finalData.hasOwnProperty(accountType)){
          finalData[accountType][1].push(account);
        }else{
          finalData[accountType] = [{
            lblUsers: {
              "left" :mobile === true? "6dp":"20dp",
              "text": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
            },
             lblSeparator: {
                "text": ".",
                "isVisible": true,
              },
            flxAccountTypes :{
              "skin" :mobile === true ? "sknFlxf8f7f8Border0": "sknflxBgffffffPointer"
            },
            template: headerTemplate
          },[account]];
        }});
      this.sectionData = [];
      var data=[];
      for(var key in prioritizeAccountTypes){
        var accountType=prioritizeAccountTypes[key];
        if(finalData.hasOwnProperty(accountType)){
          data.push(finalData[accountType]);
          this.sectionData.push(accountType);
        }
      }
      
        for (var section = 0; section < data.length; section++) {
          var sectionAccounts = data[section][1];   
          for (j = 0; j < sectionAccounts.length; j++) {                       
            data[section][1][j] = this.createSegmentData(sectionAccounts[j],null,flag);
          }
        }        
     
      return data;
    },
    
     getDataWithSections: function(accounts) {
                   var scopeObj = this;
                   var finalData = {};
                   var mobile = false ;
                   if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) 
                   {
                     mobile = true;
                   }
					var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
                    var headerTemplate = "";
                    var primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
                    headerTemplate = "flxAccountTypes";
                    accounts.forEach(function(account) {
                        var accountRoleType = kony.i18n.getLocalizedString("i18n.accounts.personalAccounts");
                        if (account.isBusinessAccount === "false") {
                            if (primaryCustomerId.id === account.Membership_id && primaryCustomerId.type === 'personal') {
                                accountRoleType = "Personal Accounts";
                            } else {
                                accountRoleType = account.Membership_id;
                            }
                        } else {
                            accountRoleType = account.Membership_id;
                        }
                        account.accountRoleType = accountRoleType;
                        if (finalData.hasOwnProperty(accountRoleType) && account.Membership_id === finalData[accountRoleType][0]["membershipId"]) {
                            finalData[accountRoleType][1].push(account);
                        } else {
                            finalData[accountRoleType] = [{
                                    lblUsers: {
                                        "left" :mobile === true? "6dp":"20dp",
                                        "text": accountRoleType === "Personal Accounts" ? accountRoleType : account.MembershipName,
                                    },
                                    lblSeparator: {
                                        "text": ".",
                                        "isVisible": true,
                                    }, 
                                  flxAccountTypes :{
                                    "skin" :mobile === true ? "sknFlxf8f7f8Border0": "sknflxBgffffffPointer"
                                  },
                                    membershipId: account.Membership_id,
                                    membershipName: account.MembershipName,
                                    template: headerTemplate
                                },
                                [account]
                            ];
                        }
                    });
                     var sectionData = [];
					 var data = [];
					var prioritizeAccountRoleTypes = [];
                    var viewType = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');
                    var sections = Object.keys(finalData);
                    var index = sections.indexOf(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
                    if (index > -1) {
                        sections.splice(index, 1);
                    }
                    index = sections.indexOf(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"));
                    if (index > -1) {
                        sections.splice(index, 1);
                    }
                    prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
                    prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"));
                    prioritizeAccountRoleTypes = prioritizeAccountRoleTypes.concat(sections);
					 for (var key in prioritizeAccountRoleTypes) {
                        var accountRoleType = prioritizeAccountRoleTypes[key];
                        if (finalData.hasOwnProperty(accountRoleType)) {
                            data.push(finalData[accountRoleType]);
                            sectionData.push(accountRoleType);
                        }
                    }
                    for (var section = 0; section < data.length; section++) {
                        var sectionAccounts = data[section][1];
                        for (j = 0; j < sectionAccounts.length; j++) {
                            data[section][1][j] = this.createSegmentData(sectionAccounts[j]);
                        }
                    }
                    return data;
                },

    
  createSegmentData: function(account) {
		var dataObject;
	    dataObject = this.settingRowDataForAccount(account);
		return dataObject;
	},
    
    settingRowDataForAccount: function(account) {
        var scopeObj = this;
      var mobile = false ;
           if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) 
             {
               mobile = true;
             }
		var dataObject = {
			 lblAccountName: {
                text: account.nickName,
              },
              btnModifyAlerts: {
                text: "View",//kony.i18n.getLocalizedString("kony.alerts.viewModify"),
                "accessibilityConfig": {
                  "a11yLabel": kony.i18n.getLocalizedString("kony.alerts.viewModify") + " Account alerts for account " + account.accountID,
                  "a11yARIA":{
                    "role":"button",
                    "tabindex":0
                  }
                },
               onClick: scopeObj.onViewModifyAlertByID.bind(this,account, account.alertID)
              },
              lblAlertStatusIndicator: {
                skin: account.isEnabled === "false" ? "sknstatusDeactivateUMNew": ViewConstants.SKINS.ACTIVE_STATUS_SKIN,
              },
              lblAlertsStatus: {
                text: account.isEnabled === "false" ? kony.i18n.getLocalizedString("i18n.Alerts.DisabledAlerts") : kony.i18n.getLocalizedString("i18n.alerts.alertsEnabled"),
              },
              lblSeperator: {
                "text": ".",
              },
              lblAccountNumber: {
                "skin" :mobile === true?"bbSknLbl424242SSP17Px" : "sknlbl727272SSP13px",
                "text": kony.i18n.getLocalizedString("i18n.common.accountNumber") + " " + account.accountID,
              },
              template: "flxAccountIdAlerts"
		};
		return dataObject;
	},
    
    onViewModifyAlertByID: function(accountDetails,alertID) {
      var accountID = accountDetails.Account_id;
        var AlertName = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.getAlertsMenuValues();
            var params = {
                "AlertCategoryId": AlertName,
                "AccountId": accountID
            };
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.fetchAlertsDataById(params, accountDetails);
    },
    
    onViewModifyAlerts: function(accountTypeId,alertID) {
        var params = {
            "AlertCategoryId": alertID,
            "AccountId": accountTypeId
        };
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileModule").presentationController.fetchAlertsDataById(params);
    },
    
  };
});