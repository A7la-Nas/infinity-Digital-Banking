define(['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  var manageAccountAccessData = null;
  return {
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
        if (viewModel.manageAccountAccessResponse) {
          this.manageAccountAccessData = viewModel;
          this.setManageAccountAccessData(viewModel.manageAccountAccessResponse);
        }
        if (viewModel.managePSD2Error) {
          this.manageAccountAccessData = viewModel;
          this.setNoMaaData(viewModel.managePSD2Error, viewModel.action);
        }
        //this.AdjustScreen();
        this.view.forceLayout();
      }
    },

    init: function() {
      var self = this;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.forceLayout();
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
    },

    preShow: function() {
      var self = this;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile', 'flxRight']);
      if (this.view.lblCollapseMobile.text === "P") {
        this.view.lblCollapseMobile.text = "O";
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
      }
      this.view.flxLeft.setVisibility(true);
      this.view.lblCollapseMobile.text = "O";
      this.view.profileMenu.activateMenu("Manage Account Access", "From Third Parties");
      this.view.customheadernew.activateMenu("Settings", "Manage Account Access");
      this.setSelectedValue("i18n.ProfileManagement.ManageAccountAccess");
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.setAccessibility();
      this.view.forceLayout();
      this.view.profileMenu.checkLanguage();
    },
    setAccessibility: function() {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.imgMAAError.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.MAAErrorInfoIcon"),
        "a11yARIA": {
          "tabindex": -1
        }
      };
    },
    onBreakpointChange: function(width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (this.manageAccountAccessData && this.manageAccountAccessData.manageAccountAccessResponse ) {
        this.setManageAccountAccessData(this.manageAccountAccessData.manageAccountAccessResponse);
      }
      if (this.manageAccountAccessData  && this.manageAccountAccessData.managePSD2Error) {
        this.setNoMaaData(this.manageAccountAccessData.managePSD2Error, this.manageAccountAccessData.action);
      }
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.ManageAccountAccess"), accessibilityConfig);
      }
      this.view.forceLayout();
    },

    postShow: function() {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.profileMenu.flxSeperator.height = this.view.flxRight.info.frame.height;
      this.view.flxLeft.height = this.view.flxRight.info.frame.height;
      this.view.forceLayout();
    },

    /**
        * *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
        *  Method to set the text in mobile breakpoint
        */
    setSelectedValue: function(text) {
      var self = this;
      CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text), CommonUtilities.getaccessibilityConfig());
    },

    /**
        *  Method to set ui for the component in mobile breakpoint
        */
    toggleMenuMobile: function() {
      if (this.view.lblCollapseMobile.text == "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text = "O";
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
      }
    },

    setManageAccountAccessData: function(data) {
      this.view.lblMAANotification.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.FromThirdPartiesNotification");
      this.view.lblMAAHeader.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.FromThirdParties");
      this.view.flxManageAccountAccessWrapper.setVisibility(true);
      this.view.flxMAAContainer.removeAll();
      this.view.flxMAAContainerContent.removeAll();
      this.view.flxMAAContainerContentDescRow.removeAll();
      var self = this;
      var tppExists = false;
      if (data) {
        data.sort(function(a, b) {
          if(a.consentStatus === b.consentStatus)
            return new Date(a.lastActionDate) - new Date(b.lastActionDate);
          if(a.consentStatus > b.consentStatus)
            return -1;
          if(a.consentStatus < b.consentStatus)
            return 1;
        })
        var allBanksContainer = "flxMAAContainer";
        var allBanksItem = "flxMAAContainerItem";
        var allAccountsItem = "flxMAANameAccount";
        var allDescItem = "flxMAAContainerContentDesc";
        var allAccountsContainer = "flxMAAContainerContent";
        var allDescContainer = "flxMAAContainerContentDescRow";
        var tppIndex = 0;
        for (var item in data) {
          //         if (data[item].consentStatus.toUpperCase() !== "REVOKEDBYPSU") {
          tppExists = true;
          var bankItem = self.view[allBanksItem].clone("flxBank" + item);
          var childWidgetsBank = bankItem.widgets();
          var flexAccounts = childWidgetsBank[1].widgets()[2];
          if (data[item].tppStatus.toUpperCase() === "BLOCKED") {
            childWidgetsBank[0].isVisible = true;
            var blockedMessage = kony.i18n.getLocalizedString("i18n.ProfileManagement.blocked");
            childWidgetsBank[0].widgets()[1].text = blockedMessage.replace("${bankName}", data[item].thirdpartyprovider);
            childWidgetsBank[0].widgets()[1].accessibilityconfig = {
              "a11yLabel": blockedMessage.replace("${bankName}", data[item].thirdpartyprovider)
            };
          }
          if (data[item].consentStatus.toUpperCase() === "VALID") {
            childWidgetsBank[1].widgets()[0].widgets()[1].widgets()[1].widgets()[0].text = kony.i18n.getLocalizedString("i18n.ProfileManagement.ExpiresOn") + " " + this.setExpDate(data[item].validUntil).expiryDate;
            childWidgetsBank[1].widgets()[0].widgets()[1].widgets()[1].widgets()[0].accessibilityconfig = {
              "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.ExpiresOn") + " " + this.setExpDate(data[item].validUntil).expiryDate
            };
            childWidgetsBank[1].widgets()[0].widgets()[1].widgets()[2].widgets()[0].text = "(" + this.setExpDate(data[item].validUntil).daysLeft + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.daysLeft") + ")";
            childWidgetsBank[1].widgets()[0].widgets()[1].widgets()[2].widgets()[0].accessibilityconfig = {
              "a11yLabel": "(" + this.setExpDate(data[item].validUntil).daysLeft + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.daysLeft") + ")"
            };
            //childWidgetsBank[1].widgets()[0].widgets()[1].left = "6%";
            if(kony.application.getCurrentBreakpoint() > 1366){
              if (data[item].consentStatus === "valid") {
                  childWidgetsBank[1].widgets()[0].widgets()[1].left = "29%";
              }
          }
            if (this.setExpDate(data[item].validUntil).daysLeft >= 10)
              childWidgetsBank[1].widgets()[0].widgets()[1].widgets()[2].widgets()[0].skin = "sknLbl04AA1615pxSSP";
            else
              childWidgetsBank[1].widgets()[0].widgets()[1].widgets()[2].widgets()[0].skin = "sknLblE5690B15pxSSP";

            childWidgetsBank[1].widgets()[3].isVisible = (applicationManager.getConfigurationManager().checkUserPermission("PSD2_TPP_CONSENT_REVOKE") ? true : false);

            this.view.flxMAAContainerContentLine.isVisible = (applicationManager.getConfigurationManager().checkUserPermission("PSD2_TPP_CONSENT_REVOKE") ? true : false);
            childWidgetsBank[1].widgets()[3].widgets()[0].onClick = self.onBtnClick.bind(null, data[item].arrangementId, data[item].thirdpartyprovider);

          } else {
            var lblStatus = "";
            var expDate = "";
            switch (data[item].consentStatus.toUpperCase()){
              case "EXPIRED":
                lblStatus = kony.i18n.getLocalizedString("i18n.ProfileManagement.ExpiredOn");
                expDate = this.setExpDate(data[item].validUntil).expiryDate;
                break;
              case "REVOKEDBYPSU":
                lblStatus = kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokedByPSUOn");
                expDate = this.setExpDate(data[item].lastActionDate).expiryDate;
                break;					
              case "TERMINATEDBYTPP":
                lblStatus = kony.i18n.getLocalizedString("i18n.ProfileManagement.TerminatedByTPPOn");
                expDate = this.setExpDate(data[item].lastActionDate).expiryDate;
                break;
              default :
                lblStatus = "Non valid from: ";
                expDate = this.setExpDate(data[item].lastActionDate).expiryDate;
            }
            
            childWidgetsBank[1].widgets()[0].widgets()[1].widgets()[1].widgets()[0].text = lblStatus + " " + expDate;
            childWidgetsBank[1].widgets()[0].widgets()[1].widgets()[1].widgets()[0].accessibilityconfig = {
              "a11yLabel": lblStatus + " " + expDate
            };
            childWidgetsBank[1].widgets()[0].widgets()[1].widgets()[1].widgets()[0].skin = "sknlblff000015px";
            childWidgetsBank[1].widgets()[0].widgets()[1].widgets()[1].width = "62%";
            childWidgetsBank[1].widgets()[0].widgets()[1].widgets()[2].widgets()[0].isVisible = false;
            //childWidgetsBank[1].widgets()[0].widgets()[1].left = "6%";
            if(kony.application.getCurrentBreakpoint() === 1366) {
              if (data[item].consentStatus === "revokedByPsu") {
                    childWidgetsBank[1].widgets()[0].widgets()[1].left = "31%";
              }
            } else  if (kony.application.getCurrentBreakpoint() > 1366) {
              if (data[item].consentStatus === "revokedByPsu") {
                  childWidgetsBank[1].widgets()[0].widgets()[1].left = "33%";
              }
          }

            childWidgetsBank[1].widgets()[3].isVisible = false;
            this.view.flxMAAContainerContentLine.isVisible = false;
          }

          childWidgetsBank[1].widgets()[0].widgets()[0].widgets()[0].src = (data[item].imagePath  && data[item].imagePath !== "") ? data[item].imagePath : "bank_icon.png";
          childWidgetsBank[1].widgets()[0].widgets()[0].widgets()[1].text = data[item].thirdpartyprovider;
          childWidgetsBank[1].widgets()[0].widgets()[0].widgets()[1].accessibilityconfig = {
            "a11yLabel": data[item].thirdpartyprovider
          };

          for ( var subItem = 0; subItem < data[item].accountIBANs.length; subItem++) {
            var accountItem = self.view[allAccountsItem].clone("flxAccount" + item + subItem);
            var childWidgetsAccount = accountItem.widgets();
            childWidgetsAccount[0].widgets()[0].widgets()[0].onClick = self.onAccountDescrClick.bind(this, tppIndex, subItem);
            childWidgetsAccount[0].widgets()[0].widgets()[1].widgets()[0].text = data[item].accountIBANs[subItem].shortName;
            childWidgetsAccount[0].widgets()[0].widgets()[1].widgets()[0].accessibilityconfig = {
              "a11yLabel": data[item].accountIBANs[subItem].shortName
            };
            let iban = data[item].accountIBANs[subItem].accountIBAN;
            if (iban.length > 6){
              iban = iban.match(/.{1,4}/g).join(' ');
            }
            childWidgetsAccount[0].widgets()[0].widgets()[2].widgets()[0].text = iban;
            childWidgetsAccount[0].widgets()[0].widgets()[1].widgets()[0].accessibilityconfig = {
              "a11yLabel": data[item].accountIBANs[subItem].accountIBAN
            };
            var flexDescr = childWidgetsAccount[1];

            if (data[item].signUpService.toUpperCase() === "CBPII") {
              var descItem = self.view[allDescItem].clone("flxAccount" + item + subItem + subItemDesc);
              var childWidgetsDesc = descItem.widgets();
              childWidgetsDesc[1].widgets()[0].text = kony.i18n.getLocalizedString("i18n.ProfileManagement.CBPII");
              childWidgetsDesc[1].widgets()[1].text = kony.i18n.getLocalizedString("i18n.ProfileManagement.CBPII");
              descItem.isVisible = true;
              flexDescr.add(descItem);
            } else {
              if (data[item].accountIBANs[subItem].consents !== undefined){

                for (var subItemDesc in data[item].accountIBANs[subItem].consents) {
                  var descItem = self.view[allDescItem].clone("flxAccount" + item + subItem + subItemDesc);
                  var childWidgetsDesc = descItem.widgets();
                  childWidgetsDesc[1].widgets()[0].text = data[item].accountIBANs[subItem].consents[subItemDesc].description;
                  childWidgetsDesc[1].widgets()[1].text = data[item].accountIBANs[subItem].consents[subItemDesc].fullDescription;
                  descItem.isVisible = true;
                  flexDescr.add(descItem);

                }
              }

           }
            accountItem.isVisible = true;
            flexAccounts.add(accountItem);
          }
          self.view[allBanksContainer].add(bankItem);


          bankItem.isVisible = true;
          tppIndex += 1;
          //          }
        }
      }
      if (tppExists === false) {
        this.setNoMaaData(kony.i18n.getLocalizedString("i18n.ProfileManagement.consent.psd2.noConsents"), "get");
      } else {
        this.view.flxMAANotificationError.setVisibility(false);
        this.view.flxMAANotification.setVisibility(true);
        this.view.flxMAAErrors.setVisibility(false);
      }
      if (applicationManager.getConfigurationManager().checkUserPermission("PSD2_TPP_CONSENT_VIEW")) {

      }
    },

    setExpDate: function(data) {      
     var formUt = applicationManager.getFormatUtilManager();
     var configManager = applicationManager.getConfigurationManager();
     var expiryDate = new Date(data);
     var currentDate = new Date();
     var dateDiff = formUt.getNumberOfDaysBetweenTwoDates(expiryDate, currentDate);
     var language = configManager.getLocale().replace("_","-");
     var formatedExpiryDate = ("0" + expiryDate.getDate()).slice(-2) + " " + expiryDate.toLocaleDateString(language, {month: 'short'}) + " " + expiryDate.getFullYear();
     return {
       "daysLeft": dateDiff,
       "expiryDate": formatedExpiryDate
     };
    },

    onBtnClick: function(arrangementId, tppName) {
      var self = this;
      this.view.flxRevokedPopup.setVisibility(true);
      this.view.lblRevokedHeadingBank.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.revoked") + tppName + "?";
      this.view.lblRevokedHeadingBank.accessibilityconfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.revoked") + tppName + "?"
      };
      this.view.flxClose.onClick = function() {
        self.view.flxRevokedPopup.setVisibility(false);
      };
      this.view.btnNoRevoked.onClick = function() {
        self.view.flxRevokedPopup.setVisibility(false);
      };
      this.view.btnYesRevoked.onClick = function() {
        self.view.flxRevokedPopup.setVisibility(false);
        FormControllerUtility.showProgressBar(this.view);
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "PSD2ConsentUIModule", "appName" : "ConsentMgmtMA"}).presentationController.updateRevokeAccountAccess(arrangementId);
        self.view.forceLayout();
      };
    },

    onAccountDescrClick: function(item, subItem) {
      var self = this;
      var flxAccountsContainer = self.view.flxMAAContainer.widgets();
      //item, subitem = the clicked row for description
      for (var i = 0; i < flxAccountsContainer.length; i++) {
        var flxBankRow = flxAccountsContainer[i].widgets()[1].widgets()[2];
        var flxAccountsItem = flxBankRow.widgets();
        for (var j = 0; j < flxAccountsItem.length; j++) {
          //verify if this is the clicked one
          var descRow = flxAccountsItem[j].widgets()[1];
          if (item === i && subItem === j) {                
            if (descRow.isVisible) {
              descRow.isVisible = false;
              flxAccountsItem[j].widgets()[0].skin = "sknFlxLineUnSelected";
              flxAccountsItem[j].widgets()[0].widgets()[0].widgets()[0].widgets()[0].src = "listboxuparrow.png";
            } else {
              flxAccountsItem[j].widgets()[0].widgets()[1].isVisible = true;
              descRow.isVisible = true;
              flxAccountsItem[j].widgets()[0].skin = "sknFlxLineSelected";
              flxAccountsItem[j].widgets()[0].widgets()[0].widgets()[0].widgets()[0].src = "listboxdownarrow.png";
            }
          } else {                
            flxAccountsItem[j].widgets()[0].widgets()[0].widgets()[0].widgets()[0].src = "listboxuparrow.png";
            descRow.isVisible = false;
            flxAccountsItem[j].widgets()[0].skin = "sknFlxLineUnSelected";
          }
        }
      }
      self.view.forceLayout();
    },

    setNoMaaData: function(errorMsg, action) {
      this.view.flxManageAccountAccessWrapper.setVisibility(true);
      this.view.flxMAAErrors.setVisibility(true);
      this.view.lblMAAErrorMessage.text = errorMsg;
      this.view.lblMAAErrorMessage.accessibilityconfig = {
        "a11yLabel": errorMsg
      };
      this.view.flxMAANotification.setVisibility(false);

      if (action === "get") {
        this.view.flxMAAContainer.removeAll();
        this.view.flxMAAContainerContent.removeAll();
        this.view.flxMAAContainerContentDescRow.removeAll();
      }
      FormControllerUtility.hideProgressBar(this.view);
      //this.showManageAccountAccessView();
    },

    setFlowActions: function() {
      var scopeObj = this;
      var self = this;
      this.view.flxManageAccountAccessSubMenu.onClick = function() {
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "PSD2ConsentUIModule", "appName" : "ConsentMgmtMA"}).presentationController.showManageAccountAccess();
      };
    },

    showManageAccountAccessView: function() {
      var scopeObj = this;
      //this.showManageAccountAccess();
      //this.collapseAll();
      //this.expand(this.view.flxManageAccountAccessSubMenu);
      this.view.lblManageAccountAccessCollapse.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
      this.view.lblManageAccountAccessCollapse.toolTip = "Collapse";
      this.view.customheadernew.activateMenu("Settings", "Manage Account Access");
      this.view.lblManageAccountAccessCollapse.accessibilityConfig = {
        "a11yLabel": "Collapse"
      };
      this.view.forceLayout();
    },

    //show showManageAccountAccess
    //showManageAccountAccess: function() {
    //this.showViews(["flxManageAccountAccessWrapper"]);
    //},
    /**
    * *@param {Boolean} isLoading- True or false to show/hide the progess bar
    *  Method to set show/hide the progess bar
    */
    changeProgressBarState: function(isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
  };
});
