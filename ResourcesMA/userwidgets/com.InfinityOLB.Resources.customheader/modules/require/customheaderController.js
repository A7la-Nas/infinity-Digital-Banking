/*eslint require-jsdoc:0
          complexity:0
*/

define(['CommonUtilities', 'TopbarConfig', 'FormControllerUtility','ViewConstants'], function (CommonUtilities, TopbarConfig, FormControllerUtility,ViewConstants) {
  toggle = 1;
  function getTotalHeight() {
    return kony.os.deviceInfo().screenHeight;
    //     var height = 0;
    //     var widgets = kony.application.getCurrentForm().widgets();
    //     for (var i = 0; i < 3; i++) {
    //       var widget = widgets[i];
    //       height += widget.frame.height;
    //     }
    //     height += kony.application.getCurrentForm().flxFooter.frame.y;
    //     return height;
  }
  var orientationHandler = new OrientationHandler();
  var sourceWidget = null;
  return {
    setupLogout: function () {
      this.view.customhamburger.flxLogout.onClick = this.showLogout.bind(this,this.view.topmenu.btnHamburger);
      if (TopbarConfig.config.LOGOUT.excludedForms.indexOf(kony.application.getCurrentForm().id) < 0) {
        this.view.headermenu.btnLogout.text = "";
        this.view.headermenu.btnLogout.setVisibility(true);
        //this.view.headermenu.imgLogout.setVisibility(true);
        this.view.headermenu.btnLogout.onClick = this.showLogout.bind(this,this.view.headermenu.btnLogout);
      }    
    },
    showLogout: function(widgetPath) {
      sourceWidget = widgetPath;
      var currentForm = kony.application.getCurrentForm();
      if ('flxLogout' in currentForm) {
        currentForm.flxLogout.isVisible = true;
        currentForm.flxLogout.isModalContainer=true;
        currentForm.flxLogout.setVisibility(true);
        this.closeHamburgerMenuLogout();
        var children = currentForm.widgets();
        var footerHeight = 0;
        if (!(currentForm.id === "frmLocateUs" && orientationHandler.isMobile)) {
          footerHeight = currentForm.flxFooter ? currentForm.flxFooter.frame.height + (currentForm.flxFooter.frame.y - (children[0].frame.height + children[1].frame.height)) : 0;
        }
        var height = children[0].frame.height + children[1].frame.height + footerHeight;
        //currentForm.flxLogout.setVisibility(true);
        currentForm.flxLogout.height = kony.os.deviceInfo().screenHeight + "dp";
        currentForm.flxLogout.left = "0%";
        currentForm.flxLogout.accessibilityConfig={
          a11yARIA : {
            tabindex : -1,
          }
        }
        var popupComponent = currentForm.flxLogout.widgets()[0];
        popupComponent.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.logout");
        popupComponent.accessibilityConfig = {
          "a11yARIA": {
            "role": "dialog",
            tabindex: -1,
          }
        }
        popupComponent.lblHeading.accessibilityConfig = {
          "a11yARIA": {
            tabindex:-1,
          }
        };
        popupComponent.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.common.LogoutMsg");
        popupComponent.lblPopupMessage.accessibilityConfig = {
          "a11yARIA": {
            tabindex:-1,
          }
        };
        popupComponent.flxSeperator.accessibilityConfig = {
          "a11yHidden":true,
          "a11yARIA": {
            tabindex:-1,
          }
        };
        popupComponent.flxSeperator2.accessibilityConfig = {
          "a11yHidden":true,
          "a11yARIA": {
            tabindex:-1,
          }
        };
        popupComponent.flxCross.accessibilityConfig = {
          a11yLabel: "Close the sign out dialog",
          a11yARIA: {
            tabindex: 0,
            role: "button"
          }
        };
        popupComponent.btnNo.accessibilityConfig = {
          a11yLabel: "No, stay signed in",
          a11yARIA: {
            tabindex: 0,
            role: "button"
          }
        };
        popupComponent.btnYes.accessibilityConfig = {
          a11yLabel: "Yes, sign me out",
          a11yARIA: {
            tabindex: 0,
            role: "button"
          }
        };
        popupComponent.flxCross.isVisible = true;
        popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
        popupComponent.btnYes.onClick = function() {
          FormControllerUtility.showProgressBar(kony.application.getCurrentForm());
          TopbarConfig.config.LOGOUT.onClick();
          currentForm.flxLogout.left = "-100%";
          currentForm.flxLogout.isVisible = false;
          currentForm.customheader.headermenu.btnLogout.setFocus(true);
        };
        popupComponent.btnNo.onClick = function() {
          currentForm.flxLogout.left = "-100%";
          currentForm.flxLogout.isVisible = false;
          if(sourceWidget!==null){
            sourceWidget.setActive(true);
            sourceWidget=null;
          }
        }
        popupComponent.flxCross.onClick = function() {
          currentForm.flxLogout.left = "-100%";
          currentForm.flxLogout.isVisible = false;
          if(sourceWidget!==null){
            sourceWidget.setActive(true);
            sourceWidget=null;
          }
        }
        popupComponent.lblHeading.setActive(true);
      }
    },

    initHeader: function () {
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ["flxHeaderMain"]);
      var configurationManager = applicationManager.getConfigurationManager();
      var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "HomepageMA",
                                "moduleName": "AccountsUIModule"
                            });
      var custDashboard = accountsModule.presentationController.customerdashboard;
      if (custDashboard === "true")
      	this.view.topmenu.lblAccounts.text = kony.i18n.getLocalizedString("i18n.common.overview");
      else
        this.view.topmenu.lblAccounts.text = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
      this.setupContextualActions();
      this.setupHamburger();      
      this.setupLogout();
      this.setupUserActions();
      this.setHoverSkins();
      this.setCustomHeaderLogo();
      this.isAccountsEnabled();
      var scope= this;
      var messageText = this.view.headermenu.imgMessages.text;
      CommonUtilities.setText(this.view.headermenu.imgMessages, kony.i18n.getLocalizedString("i18n.a11y.common.messages"), CommonUtilities.getaccessibilityConfig());
      this.view.headermenu.imgMessages.text = messageText;
      //CommonUtilities.setText(this.view.headermenu.imgUserReset, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), CommonUtilities.getaccessibilityConfig());
      flag = 0;
      if (configurationManager.isFastTransferEnabled == "true") 
      {
        this.view.topmenu.lblTransferAndPay.text = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
        // this.view.topmenu.lblTransferAndPay.toolTip = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
        // this.view.topmenu.lblMyBills.toolTip = kony.i18n.getLocalizedString("i18n.Pay.MyBills");
        // this.view.topmenu.imgLblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
      }
      if(kony.application.getCurrentForm().id !== "frmEnrollBusiness")
        this.view.topmenu.flxaccounts.onClick = TopbarConfig.config.ACCOUNTS.onClick;
      this.view.topmenu.flxMyBills.onClick = TopbarConfig.config.BILLS.onClick;
      this.view.headermenu.flxNotifications.onClick = TopbarConfig.config.NOTIFICATIONS.onClick;
      this.view.headermenu.flxMessages.onClick = TopbarConfig.config.MESSAGES.onClick;
      this.view.topmenu.flxHelp.onClick = TopbarConfig.config.HELP.onClick;
      this.view.topmenu.flxFeedbackimg.onClick = TopbarConfig.config.FEEDBACK.onClick;
      //this.view.flxImgKony.onClick= this.showDashboardScreen;
      //this.view.customhamburger.flxLogo.onClick = this.showDashboardScreen;
      this.view.topmenu.flxCombinedAccessMenu.isVisible = false;
      this.view.headermenu.imgMessages.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Message")
      }
      this.view.headermenu.lblNotifications.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts")
      }
      this.view.imgKony.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.common.infinityDB")
        "a11yLabel":"Infinity digital banking",
        a11yARIA:{
          tabindex:-1
        }

      };
      this.view.topmenu.lblAccounts.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.flxContextualMenu.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
          "aria-live": "off"
        },
      }
      this.view.topmenu.lblTransferAndPay.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.hamburger.transfers")
      }
      this.view.topmenu.lblMyBills.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.Pay.MyBills")
      }
      this.view.topmenu.Label0dcf00103bdba46.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.hamburger.transfer"),
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.CopyLabel0bb648d916e554d.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.FastTransfer.TransferActivities"),
        a11yARIA: {
          tabindex: -1,
        },
      }      
      this.view.topmenu.CopyLabel0a8b12f7002084d.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient"),
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.CopyLabel0h9e71b8a76ad44.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient"),
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.headermenu.lblImageLogout.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.imgKony.accessibilityConfig = {
        a11ylabel : "Infinity Digital Banking",
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.flxImgKony.accessibilityConfig = {
        a11yARIA: {
          tabindex : -1
        },
      }
      this.view.flxHamburgerBack.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.lblTransferAndPay.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.btnSkip.accessibilityConfig = {
        "a11yLabel": "Skip to Main Content",
        a11yARIA: {
          role: "button",
        },
      };
      this.view.headermenu.flxUserId.accessibilityConfig={
        a11yLabel : "Profile",
        a11yARIA:{
            tabindex : 0,
            role : "button",
            "aria-expanded" : false
        }
    }
      this.view.headermenu.imgUserReset.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
        },
      };
      this.view.headermenu.btnLogout.accessibilityConfig = {
        "a11yLabel": this.isPreLoginView? kony.i18n.getLocalizedString("i18n.common.login"):kony.i18n.getLocalizedString("i18n.common.logout"),
        a11yARIA: {
          role: "button"
        },
      };
      this.view.flxHamburger.accessibilityConfig = {
        a11yARIA: {
          "aria-modal": true,
          "role": "dialog"
        },
      }
      this.view.topmenu.btnHamburger.accessibilityConfig = {
        a11yLabel: "Main navigation menu",
        a11yARIA: {
          "tabindex":0,
          "role": "button",
          "aria-expanded":false
        },
      };
      this.view.topmenu.flxMenusMain.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      };
      this.view.topmenu.flxTransfersAndPay.accessibilityConfig = {
        a11yARIA: {
          "aria-expanded": false,
          "role": "button",
          "aria-labelledby":"lblTransferAndPay"
        },
      }
      this.view.topmenu.flxMyBills.accessibilityConfig = {
        a11yARIA: {
          role: "button",
          "aria-labelledby": "lblMyBills",
        },
      }
      this.view.topmenu.lblAccounts.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.lblMyBills.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.headermenu.flxMessages.accessibilityConfig = {
        a11yLabel : "Messages",
        a11yARIA : {
            role : "button",
            tabindex:0
        }
    }
    this.view.headermenu.flxNotifications.accessibilityConfig = {
        a11yLabel : "Notifications",
        a11yARIA : {
            role : "button",
            tabindex:0
        }
    }
    this.view.flxUserActions.accessibilityConfig={
      "a11yARIA":{
        "aria-live": "off",
        "tabindex" : -1
      }
    }
      this.onBreakpointChangeComponent();
    },

    showDashboardScreen: function(){
      if(applicationManager.getUserPreferencesManager().isUserLoggedin()) {
        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "HomepageMA", "moduleName" : "AccountsUIModule"});
        accountsModule.presentationController.showAccountsDashboard();
      }
    },
    setCustomHeaderLogo : function() {   
      CommonUtilities.setText(this.view.imgKony, kony.i18n.getLocalizedString("i18n.a11y.common.logo"), CommonUtilities.getaccessibilityConfig());
      var configurationManager = applicationManager.getConfigurationManager();
      if(configurationManager.isSMEUser === "true") {
        // this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.SME;
        this.setHeaderLogoResponsiveForSMEandMBB();
      }
      else if(configurationManager.isMBBUser === "true"){
        // this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.MBB;
        this.setHeaderLogoResponsiveForSMEandMBB();
      }
      // else if(configurationManager.isRBUser === "true")this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.RB;
      // else this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.GENERIC;
    },
    setHeaderLogoResponsiveForSMEandMBB : function() {
      var width = kony.application.getCurrentBreakpoint();
      var orientationHandler = new OrientationHandler();

      if(orientationHandler.isDesktop) {
        if(width === 1366){
          this.view.flxImgKony.width = "175dp";
          this.view.flxImgKony.left = "70dp";
        }
        else if(width === 1380 || width === constants.BREAKPOINT_MAX_VALUE){
          this.view.flxImgKony.width = "180dp";
          this.view.flxImgKony.left = "72dp";
        }
      }
      else if(orientationHandler.isTablet){
        if(width === 1024){
          this.view.flxImgKony.width = "175dp";
          this.view.flxImgKony.left = "70dp";
        }
        else if(width === 1366){
          this.view.flxImgKony.width = "175dp";
          this.view.flxImgKony.left = "72dp";
        }
        else if(width === 1380 || width === constants.BREAKPOINT_MAX_VALUE){
          this.view.flxImgKony.width = "180dp";
          this.view.flxImgKony.left = "75dp";
        }
      }
    },
    setupUserActions: function() {
      var scope = this;
      this.view.segUserActions.widgetDataMap = {
        lblSeparator: "lblSeparator",
        lblUsers: "lblUsers",
        btnUsers : "btnUsers",
        flxSegUserActions:"flxSegUserActions"
      };
      var actions = TopbarConfig.config.USER_ACTIONS.filter(function(action){
        return (!action.isVisible || action.isVisible());
      })
      if(actions.length === 0){
        this.view.headermenu.flxResetUserImg.setVisibility(true);
        this.view.headermenu.flxUserId.setVisibility(false);
        this.view.headermenu.imgUserReset.setVisibility(true);
        // this.view.headermenu.flxVerticalSeperator2.setVisibility(false);
      }
      this.view.segUserActions.setData(actions.map(function(configItem) {
        return {
          lblSeparator: "L",
          flxSegUserActions:{
             "accessibilityConfig":{
              "a11yARIA":{
                "tabindex":-1,
                "aria-live":"off"
              }
            }
          },
          lblUsers: {
            "text": kony.i18n.getLocalizedString(configItem.text),
            "accessibilityConfig":{
              "a11yHidden":true,
              "a11yARIA":{
                "tabindex":-1
              }
            }
            // "toolTip": kony.i18n.getLocalizedString(configItem.text)
          },
          btnUsers : {
            "isVisible":true,
            "onClick":scope.userActionsOnclick,
            "accessibilityConfig":{
              "a11yARIA":{
                "tabindex":0,
                "role" : "link",
                "aria-labelledby":"lblUsers"
              }
            }
          },
        }
      }));
    },
    userActionsOnclick : function(widgetInfo,rowInfo){
      var actions = TopbarConfig.config.USER_ACTIONS.filter(function (action) {
        return (!action.isVisible || action.isVisible());
      })
      actions[rowInfo.rowIndex].onClick();
    },


    /**
     * Method will set email attribute to  user from  entitlement configuration  
   **/
    setEmailForUserObj : function() {
      var userEntitlementsEmailIds = applicationManager.getUserPreferencesManager().getEntitlementEmailIds();
      for(var i = 0; i < userEntitlementsEmailIds.length; i++) {
        if (userEntitlementsEmailIds[i].isPrimary === "true") {
          return userEntitlementsEmailIds[i].Value;
        }
      }
      return "";
    },
    setupUserProfile: function () {
      var userObject = applicationManager.getUserPreferencesManager().getUserObj();
      var userImageURL = applicationManager.getUserPreferencesManager().getUserImage();
      if(applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === true && userImageURL && userImageURL.trim() != ""){
        this.view.headermenu.imgUserReset.base64 = ""; 
        this.view.headermenu.imgUserReset.base64 = userImageURL ;
      }
      else
        this.view.headermenu.imgUserReset.src =  ViewConstants.IMAGES.USER_DEFAULT_IMAGE;
      if(applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === true && userImageURL && userImageURL.trim() != "") 
        this.view.CopyimgToolTip0i580d9acc07c42.base64 = userImageURL;
      else
        this.view.CopyimgToolTip0i580d9acc07c42.src =  ViewConstants.IMAGES.USER_DEFAULT_IMAGE;
      this.view.lblName.text = (userObject.userlastname === null) ? userObject.userfirstname : (userObject.userfirstname === null) ? userObject.userlastname : userObject.userfirstname + " " + userObject.userlastname;
      this.view.lblUserEmail.text = this.setEmailForUserObj();
      this.view.flxUserActions.isVisible = false;
    },
    setupContextualActions: function () {
      var scope = this;
      var configurationManager = applicationManager.getConfigurationManager();
      if(!this.isTransfersAndPayEnabled() && !this.isBillPayEnabled() && applicationManager.getUserPreferencesManager().isLoggedIn === true){
        this.view.topmenu.flxTransfersAndPay.setVisibility(false);
        this.view.topmenu.flxSeperator1.setVisibility(false);
        this.view.topmenu.imgLblTransfers.setVisibility(false);
        this.view.topmenu.lblTransferAndPay.setVisibility(false);
      }else{
        this.view.topmenu.flxTransfersAndPay.onClick = this.openContextualMenu.bind(this);
        this.view.topmenu.flxTransfersAndPay.onTouchEnd = function () {
          if (scope.view.topmenu.flxContextualMenu.isVisible) {
            scope.view.topmenu.flxTransfersAndPay.origin = true;
            if(kony.application.getCurrentBreakpoint()==640 || kony.application.getCurrentBreakpoint()==1024){
              scope.view.topmenu.flxContextualMenu.isVisible = false;
              scope.view.topmenu.flxTransfersAndPay.skin="flxHoverSkinPointer";
              scope.view.topmenu.imgLblTransfers.text = "O";
            }
          }
        }
        TopbarConfig.config.getContextualMenu().forEach(function(contextualItem) {
          scope.view.topmenu[contextualItem.widget].setVisibility(!contextualItem.isVisible || contextualItem.isVisible())
          scope.view.topmenu[contextualItem.widget].onClick = contextualItem.onClick;
        });
      }
    },
    openContextualMenu: function() {
      var scope = this;
      if (scope.view.topmenu.flxTransfersAndPay.skin === "sknFlxHeaderTransfersSelected") {
        scope.view.topmenu.flxTransfersAndPay.skin = "flxHoverSkinPointer";
        scope.view.topmenu.flxTransfersAndPay.hoverSkin = "flxHoverSkinPointer000000op10";
        scope.view.topmenu.imgLblTransfers.text = "O";
        scope.view.topmenu.flxTransfersAndPay.accessibilityConfig = {
          a11yARIA: {
            "aria-expanded": false,
            "role": "button",
            "aria-labelledby": "lblTransferAndPay"
          },
        };
      } else {
        scope.view.topmenu.flxTransfersAndPay.skin = "sknFlxHeaderTransfersSelected";
        scope.view.topmenu.imgLblTransfers.text = "P";
        scope.view.topmenu.flxTransfersAndPay.accessibilityConfig = {
          a11yARIA: {
            "aria-expanded": true,
            "role": "button",
            "aria-labelledby": "lblTransferAndPay"
          },
        };
      }
      scope.view.topmenu.showContextualMenu();
      scope.closeTransfers();
    },
    setupHamburger: function () {
      var scope = this;
      //this.view.customhamburger.setItemSelectListener(this.closeHamburgerMenu.bind(this));
      this.view.topmenu.btnHamburger.onClick = function(){
        scope.openHamburgerMenu();
      }
      this.view.flxHamburgerBack.onClick = this.closeHamburgerMenu.bind(this);
      this.view.customhamburger.flxClose.onClick = this.closeHamburgerMenu.bind(this);
    },
    openHamburgerMenu: function () {
      // For Scroll to top.
      this.view.flxHeaderMain.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1,
          "aria-live": "off"
        }
      }
      this.view.customhamburger.flxMenu.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
          "aria-live": "off"
        }
      }
      this.view.customhamburger.flxClose.setFocus(true);
      this.view.imgKony.setFocus(true);
      this.view.flxHamburger.isVisible=true;
      this.view.customhamburger.flxClose.setFocus(true);
      this.showBackFlex();
      var scope = this;
      var animationDefinition = {
        100: {
          "left": 0
        }
      };
      var animationConfiguration = {
        duration: 0.8,
        fillMode: kony.anim.FILL_MODE_FORWARDS
      };
      var callbacks = {
        animationEnd: function () {
          scope.view.customhamburger.forceLayout();
        }
      };
      var animationDef = kony.ui.createAnimation(animationDefinition);
      this.view.flxHamburger.animate(animationDef, animationConfiguration, callbacks);
      this.view.customhamburger.flxClose.setActive(true);
      this.view.flxHamburger.isModalContainer = true;
      this.view.topmenu.btnHamburger.accessibilityConfig = {
        a11yLabel: "Main navigation menu",
        a11yARIA: {
          "tabindex":0,
          "role": "button",
          "aria-expanded":true //to check with DAC
        },
      };
    },
    closeHamburgerMenuLogout: function () {
      var self = this;
      var animationDefinition = {
        100: {
          "left": "-200.13%"
        }
      };
      var animationConfiguration = {
        duration: 0.8,
        fillMode: kony.anim.FILL_MODE_FORWARDS
      };
      var callbacks = {
        animationEnd: function () {
          self.view.flxHamburger.isVisible=false;
          self.hideBackFlex();
          if(sourceWidget.id==="btnHamburger"){
            var currentForm = kony.application.getCurrentForm();
            if(currentForm.flxLogout){
            var popupComponent = currentForm.flxLogout.widgets()[0];
            popupComponent.lblHeading.setActive(true);
            }
        }
        }
      };
      var animationDef = kony.ui.createAnimation(animationDefinition);
      this.view.flxHamburger.animate(animationDef, animationConfiguration, callbacks);
      this.view.topmenu.btnHamburger.accessibilityConfig = {
        a11yLabel: "Main navigation menu",
        a11yARIA: {
          "tabindex":0,
          "role": "button",
          "aria-expanded":false
        },
      };
      //this.view.topmenu.btnHamburger.setFocus(true);
    },
    closeHamburgerMenu: function () {
      var self = this;
      var animationDefinition = {
        100: {
          "left": "-200.13%"
        }
      };
      var animationConfiguration = {
        duration: 0.8,
        fillMode: kony.anim.FILL_MODE_FORWARDS
      };
      var callbacks = {
        animationEnd: function () {
          self.view.flxHamburger.isVisible=false;
          self.hideBackFlex();
        }
      };
      var animationDef = kony.ui.createAnimation(animationDefinition);
      this.view.flxHamburger.animate(animationDef, animationConfiguration, callbacks);
      this.view.topmenu.btnHamburger.accessibilityConfig = {
        a11yLabel: "Main navigation menu",
        a11yARIA: {
          "tabindex":0,
          "role": "button",
          "aria-expanded":false
        },
      };
      this.view.topmenu.btnHamburger.setFocus(true);
    },
    showBackFlex: function () {
      this.view.flxHamburgerBack.height = getTotalHeight() + "px";
      this.view.customhamburger.flxMenuWrapper.top = "0dp";
      this.view.flxHamburger.height = getTotalHeight() + "px";
      this.view.customhamburger.flxMenu.height = getTotalHeight() -2 + "px";
      this.view.customhamburger.flxScroll.height = getTotalHeight()-60 + "px";
      this.view.flxHamburgerBack.isVisible = true;
      this.view.flxHamburger.isVisible = true;
      this.view.forceLayout();
    },
    hideBackFlex: function () {
      this.view.flxHamburgerBack.height = "0px";
      this.view.flxHamburgerBack.isVisible = false;
      this.view.flxHamburger.isVisible = false;
      this.view.forceLayout();
    },
    showUserActions: function () {
        if(this.view.flxUserActions.isVisible === false){
          this.view.headermenu.flxUserId.accessibilityConfig={
              a11yLabel : "Profile",
              a11yARIA:{
                  tabindex : 0,
                  role : "button",
                  "aria-expanded" : true
              }
          }
      }
      else{
          this.view.headermenu.flxUserId.accessibilityConfig={
              a11yLabel : "Profile",
              a11yARIA:{
                  tabindex : 0,
                  role : "button",
                  "aria-expanded" : false
              }
          }
      }
      if(this.view.flxHeaderMain.info.frame.x==0){
        this.view.flxUserActions.left = -410 + this.view.flxHeaderMain.info.frame.width + "dp";
        if(kony.application.getCurrentBreakpoint()==1024|| orientationHandler.isTablet){
          this.view.flxUserActions.left = -365 + this.view.flxHeaderMain.info.frame.width + "dp";
        }
      }else{
        this.view.flxUserActions.left = 945 + this.view.flxHeaderMain.info.frame.x + "dp";
      }
      if (this.view.flxUserActions.isVisible === false) {
        hidePopups();
        this.view.headermenu.imgDropdown.src = "profile_dropdown_uparrow.png";
        this.view.flxUserActions.isVisible = true;
        this.view.topmenu.flxContextualMenu.isVisible = false;
        this.view.topmenu.flxTransfersAndPay.skin="flxHoverSkinPointer";
        this.view.topmenu.imgLblTransfers.text = "O";
        this.view.headermenu.flxUserId.setActive(true);
        //this.view.segUserActions.setActive(0,-1);
      } else {
        this.view.headermenu.imgDropdown.src = "profile_dropdown_arrow.png";
        this.view.flxUserActions.isVisible = false;
        this.view.headermenu.flxUserId.setActive(true);
      }
    },
    forceCloseHamburger: function () {
      this.hideBackFlex();
      this.view.flxHamburger.isVisible=false;
      this.view.flxHamburger.left = "-200%";
      this.view.forceLayout();
    },
    isBillPayEnabled: function () {
      var configurationManager = applicationManager.getConfigurationManager();
      if(configurationManager.isMicroAppPresent("BillPayMA") === true)
        return applicationManager.getConfigurationManager().checkUserFeature("BILL_PAY")
      else
        return false;
    },
    isTransfersAndPayEnabled: function () {
      var configurationManager = applicationManager.getConfigurationManager();
      if(configurationManager.isMicroAppPresent("TransfersMA") === true
         || configurationManager.isMicroAppPresent("BillPayMA") === true || configurationManager.isMicroAppPresent("WireTransferMA") === true) {
        return [
          "INTERNATIONAL_ACCOUNT_FUND_TRANSFER",
          "INTER_BANK_ACCOUNT_FUND_TRANSFER",
          "INTRA_BANK_FUND_TRANSFER",
          "TRANSFER_BETWEEN_OWN_ACCOUNT",
          "P2P"
        ].some(function (permission) {
          return applicationManager.getConfigurationManager().checkUserFeature(permission);
        })
      } else
        return false;
    },
    isAccountsEnabled: function () {
      var configurationManager = applicationManager.getConfigurationManager();
      if(configurationManager.isMicroAppPresent("HomepageMA") === true)
        this.view.topmenu.flxaccounts.setVisibility(true);
      else
        this.view.topmenu.flxaccounts.setVisibility(false);
    },
    postShowFunction: function() {
      var scope = this;
      scope.view.customhamburger.flxHamburgerHeader.accessibilityConfig={
      a11yARIA:{
        tabindex:-1
      }
    }
    
    this.view.topmenu.flxTransfersAndPay.onKeyPress = function(eventobject, eventPayload) {
      if (eventPayload.keyCode === 9) {
          if (eventPayload.shiftKey) {
              scope.view.topmenu.flxContextualMenu.isVisible = false;
              scope.view.topmenu.flxTransfersAndPay.accessibilityConfig = {
                  a11yARIA: {
                  "aria-expanded": false,
                  "role": "button",
                  "aria-labelledby": "lblTransferAndPay"
              }
          },
          scope.view.topmenu.imgLblTransfers.text = "O";
              eventPayload.preventDefault();
              scope.view.topmenu.flxaccounts.setActive(true);
          }
      }
  },
    this.view.customhamburger.flxLogout.onKeyPress = function(eventObject,eventPayload){
      if(eventPayload.keyCode===9){
        if(eventPayload.shiftKey){
          var widget=scope.view.customhamburger.flxMenuWrapper.widgets()[scope.view.customhamburger.flxMenuWrapper.widgets().length-2];
          var subWidget=scope.view.customhamburger.flxMenuWrapper.widgets()[scope.view.customhamburger.flxMenuWrapper.widgets().length-1];
          if(subWidget.isVisible===false){
              eventPayload.preventDefault();
              widget.setActive(true);
          }
          else{
            var subMenuWidget = subWidget.widgets()[subWidget.widgets().length-1];
            eventPayload.preventDefault();
            subMenuWidget.setActive(true);
          }
          }
          else{
              scope.view.customhamburger.flxHamburgerHeader.setActive(true);
          }
      }
      if(eventPayload.keyCode===27){
        var frm=kony.application.getCurrentForm();
          if(frm.id==="frmLocateUs"){
            frm.flxFormContent.clipBounds = false;
            frm.flxFormContent.height = kony.os.deviceInfo().screenHeight + 300;
          }
        scope.closeHamburgerMenu();
      }
    }
      this.view.flxUserActions.left = 945 + this.view.flxHeaderMain.frame.x + "dp";

      var configurationManager = applicationManager.getConfigurationManager();
      this.setupUserProfile();
      if (configurationManager.isFastTransferEnabled == "true") {
        if (this.isTransfersAndPayEnabled()) {
          if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile){
            this.view.topmenu.flxSeperator1.setVisibility(false);
            this.view.topmenu.flxTransfersAndPay.setVisibility(false);
          }
          else{
            //this.view.topmenu.flxSeperator1.setVisibility(true);
            this.view.topmenu.flxTransfersAndPay.setVisibility(true);
          }
        } else {
          this.view.topmenu.flxSeperator1.setVisibility(false);
          this.view.topmenu.flxTransfersAndPay.setVisibility(false);
        }
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile || !this.isBillPayEnabled())
        {
          this.view.topmenu.flxSeperator4.setVisibility(false);
          this.view.topmenu.flxMyBills.setVisibility(false);
        }
        else
        {
         // this.view.topmenu.flxSeperator4.setVisibility(true);
          this.view.topmenu.flxMyBills.setVisibility(true);  
        }
      }
      if (!this.isBillPayEnabled() && !this.isTransfersAndPayEnabled()) {
        this.view.topmenu.flxSeperator1.setVisibility(false);
        this.view.topmenu.flxSeperator4.setVisibility(false);
      }
      this.view.flxHamburger.setVisibility(false);
      this.view.forceLayout();
      this.view.topmenu.flxFeedback.setVisibility(false);
      this.view.topmenu.flxHelp.setVisibility(false);
      this.view.topmenu.flxTransfersAndPay.accessibilityConfig = {
        a11yARIA: {
          "aria-expanded": false,
          "role": "button",
          "aria-labelledby": "lblTransferAndPay"
        },
      };

      this.view.customhamburger.flxClose.accessibilityConfig = {
        "a11yLabel": "Close ",
        a11yARIA: {
          "role": "button",
        },
      };
      this.view.customhamburger.lblCollapseAccounts.toolTip = "";
      this.view.customhamburger.lbfonticonlLogout.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1
        }
      };
      this.view.customhamburger.lblLogout.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      };
      this.view.customhamburger.flxLogout.accessibilityConfig = {
        a11yARIA: {
          "role": "button",
          "aria-labelledby": this.view.customhamburger.lblLogout.id,
        },

      };
      this.view.imgKony.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.common.infinityDB")
        "a11yLabel": "Infinity digital banking",
        a11yARIA: {
          tabindex: -1
        }
      };
      this.view.headermenu.lblImageLogout.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.headermenu.lblImageLogout.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.topmenu.lblTransferAndPay.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      };
      this.view.flxHamburgerBack.accessibilityConfig = {
        a11yARIA: {
          tabindex : -1,
        },
      };
      this.view.imgKony.accessibilityConfig = {
        a11yLabel : "Infinity Digital Banking",
        a11yARIA: {
          tabindex: -1,
        },
      };
      this.view.btnSkip.accessibilityConfig = {
        "a11yLabel": "Skip to Main Content",
        a11yARIA: {
          role: "button",
        },
      };
      this.view.headermenu.flxUserId.accessibilityConfig={
        a11yLabel : "Profile",
        a11yARIA:{
            tabindex : 0,
            role : "button",
            "aria-expanded" : false
        }
    }
      this.view.headermenu.imgUserReset.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        },
      };
      this.view.headermenu.btnLogout.accessibilityConfig = {
        a11yLabel: this.isPreLoginView? kony.i18n.getLocalizedString("i18n.common.login"):kony.i18n.getLocalizedString("i18n.common.logout"),
        a11yARIA: {
          role: "button"
        },
      };
      this.view.flxImgKony.accessibilityConfig = {
        a11yARIA: {
			tabindex : -1
        },
      };
      this.view.topmenu.btnHamburger.accessibilityConfig = {
        a11yLabel: "Main navigation menu",
        a11yARIA: {
          "tabindex":0,
          "role": "button",
          "aria-expanded":false
        },
      };
      this.view.topmenu.flxaccounts.accessibilityConfig = {
        a11yARIA: {
          role: "link",
        },
      };      
      this.view.topmenu.flxMyBills.accessibilityConfig = {
        a11yARIA: {
          role: "button",
          "aria-labelledby": "lblMyBills",
        },
      };
      this.view.topmenu.lblMyBills.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.flxMenusMain.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      };
      this.view.topmenu.flxTransfersAndPay.accessibilityConfig = {
        a11yARIA: {
          "aria-expanded": false,
          "role": "button",
          "aria-labelledby":"lblTransferAndPay"
        },
      }
      this.view.topmenu.lblAccounts.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      };
      this.view.headermenu.flxResetUserImg.accessibilityConfig={
        a11yHidden : true,
        a11yARIA : {
          tabindex : -1,
        }
      }
      this.view.headermenu.imgMessages.accessibilityConfig={
        a11yHidden : true,
        a11yARIA:{
          tabindex : -1
        }
      }
      this.view.headermenu.lblNotifications.accessibilityConfig ={
        a11yHidden : true,
        a11yARIA:{
          tabindex : -1
        }
     }
     this.view.lblName.accessibilityConfig={
       "a11yARIA":{
         tabindex:-1
       }
     }
     this.view.onKeyPress = this.onKeyPressCallBack;
     this.view.topmenu.onKeyPress = this.onKeyPressCallBack;
     this.view.segUserActions.onKeyPress = this.onKeyPressCallBack;
     this.view.headermenu.flxLegalEntityDropdown.onKeyPress = this.onKeyPressLEFlx;
     this.view.headermenu.flxSegLegalEntity.onKeyPress = this.onKeyPressCallBack;
     this.view.customhamburger.flxLegalEntityDropdownHamburger.onKeyPress = this.onKeyPressLEHamFlx;
     this.view.customhamburger.flxSegLegalEntityHamburger.onKeyPress = this.onKeyPressCallBack;
     this.view.customhamburger.onKeyPress = this.onKeyPressCallBack;
     this.view.customhamburger.flxMenu.onKeyPress = this.onKeyPressCallBack;
     this.view.headermenu.flxUserId.onKeyPress = this.userActionsFocus;
     this.view.headermenu.btnLogout.onKeyPress = this.settingsFocus;
     this.view.headermenu.btnLogout.onKeyPress = this.settingsFocus;
            this.closeTransfers();
    this.view.topmenu.flxSeperator1.isVisible=false;
    this.view.topmenu.flxSeperator4.isVisible=false;
        },

        onKeyPressLEHamFlx: function (eventObject, eventPayload, context) {
          var scope = this;
          if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
              if(scope.view.customhamburger.flxSegLegalEntityHamburger.isVisible===true)
              scope.view.customhamburger.toggleLEDropdown(scope.view.customhamburger.flxSegLegalEntityHamburger, scope.view.customhamburger.lblLegalEntityDropdownIconHamburger);
          }
          if (eventPayload.keyCode === 27) {
              if(scope.view.flxSegLegalEntityHamburger.isVisible===true){
            scope.view.customhamburger.toggleLEDropdown(scope.view.customhamburger.flxSegLegalEntityHamburger, scope.view.customhamburger.lblLegalEntityDropdownIconHamburger);}
            scope.view.flxLegalEntityDropdownHamburger.setActive(true);
          }
        },

        onKeyPressLEFlx: function (eventObject, eventPayload, context) {
          var scope = this;
          if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
            if(scope.view.headermenu.flxSegLegalEntity.isVisible===true)
              scope.view.headermenu.toggleLEDropdown(scope.view.headermenu.flxSegLegalEntity, scope.view.headermenu.lblLegalEntityDropdownIcon);
          }
          if (eventPayload.keyCode === 27) {
            scope.view.headermenu.toggleLEDropdown(scope.view.headermenu.flxSegLegalEntity, scope.view.headermenu.lblLegalEntityDropdownIcon);
            scope.view.headermenu.flxLegalEntityDropdown.setActive(true);
          }
        },

        closeTransfers: function() {
          var form = kony.application.getCurrentForm();
          if (form.customheader.topmenu.flxContextualMenu) {
              var firstWidget = form.customheader.topmenu.flxContextualMenu.widgets()[0];
              if (applicationManager.getConfigurationManager().getDeploymentGeography() === "EUROPE") {
                  var length = form.customheader.topmenu.flxContextualMenu.widgets().length - 1;
              } else {
                  var length = form.customheader.topmenu.flxContextualMenu.widgets().length - 2;
              }
            var widgetlength = "";
            var widget = form.customheader.topmenu.flxContextualMenu.widgets()[length];
            widgetlength = length-1;
            if (widget.isVisible === false) {
              widget = form.customheader.topmenu.flxContextualMenu.widgets()[length - 1];
              widgetlength = length-2;
            }
              var scope = this;
              firstWidget.onKeyPress = function(eventobject, eventPayload) {
                if (eventPayload.keyCode === 9) {
                    if (eventPayload.shiftKey) {
                        scope.openContextualMenu();
                        eventPayload.preventDefault();
                        scope.view.topmenu.flxTransfersAndPay.setActive(true);
                    }
                }
                if(eventPayload.keyCode === 27){
                    if (applicationManager.getConfigurationManager().getDeploymentGeography() === "EUROPE") {
                        scope.openContextualMenu();
                        eventPayload.preventDefault();
                        scope.view.topmenu.flxTransfersAndPay.setActive(true);
                    } else {
                            scope.openContextualMenu();
                            eventPayload.preventDefault();
                            scope.view.topmenu.flxMyBills.setActive(true);
                    }
                }
            }
              widget.onKeyPress = function(eventobject, eventPayload) {
                  if (eventPayload.keyCode === 9 || eventPayload.keyCode === 27) {
                      if (eventPayload.shiftKey) {
                          eventPayload.preventDefault();
                          form.customheader.topmenu.flxContextualMenu.widgets()[widgetlength].setActive(true);
                      } else {
                      if (applicationManager.getConfigurationManager().getDeploymentGeography() === "EUROPE") {
                          scope.openContextualMenu();
                          eventPayload.preventDefault();
                          scope.view.topmenu.flxTransfersAndPay.setActive(true);
                      } else {
                          if(eventPayload.keyCode === 27){
                              scope.openContextualMenu();
                      eventPayload.preventDefault();
                      scope.view.topmenu.flxTransfersAndPay.setActive(true);  
                            }
                            else
                            {
                              scope.openContextualMenu();   
                              eventPayload.preventDefault();
                              scope.view.topmenu.flxMyBills.setActive(true); 
                            }             
                      }
                  }
              }
          }
          }
      },
  settingsFocus : function(eventObject, eventPayload){
    var scope = this;
    if(eventPayload.keyCode === 9){
        if(eventPayload.shiftKey){
            if(scope.view.flxUserActions.isVisible){
                eventPayload.preventDefault();
                scope.view.segUserActions.setActive(scope.view.segUserActions.data.length-1,-1,"btnUsers");
            }
            else if(scope.view.headermenu.flxUserId.isVisible){
                eventPayload.preventDefault();
                scope.view.headermenu.flxUserId.setActive(true);
            } else {
                eventPayload.preventDefault();
                scope.view.btnSkip.setActive(true);
            }
        }
    }
    if(eventPayload.keyCode === 27){
        scope.onKeyPressCallBack(eventObject,eventPayload);
    }

},
    userActionsFocus : function(eventObject,eventPayload){
      var scope = this;
      if(eventPayload.keyCode===9){
        if(eventPayload.shiftKey){
          eventPayload.preventDefault();
          scope.view.headermenu.flxNotifications.setActive(true);
          scope.view.flxUserActions.isVisible=false;
          scope.view.headermenu.flxUserId.accessibilityConfig={
            a11yLabel : "Profile",
            a11yARIA:{
                tabindex : 0,
                role : "button",
                "aria-expanded" : false
            }
        }
         }
         else{
          if(scope.view.flxUserActions.isVisible){
            scope.view.segUserActions.setActive(0,-1);
            scope.view.segUserActions.accessibilityConfig={
              "a11yARIA":{
                "tabindex":-1,
                "aria-live":"off"
              }
            }
          }
        }
      }
      if(eventPayload.keyCode === 27){
        if(scope.view.flxUserActions.isVisible===true){
            scope.showUserActions();
            scope.view.headermenu.flxUserId.setActive(true);
          }
    }
    },
    setHoverSkins: function() {
      this.view.imgKony.cursorType="pointer";
      var currForm = kony.application.getCurrentForm().id;
      this.setDefaultHoverSkins();
      this.view.topmenu.flxContextualMenu.isVisible = false;
      this.view.topmenu.flxCombinedAccessMenu.isVisible = false;
      this.view.topmenu.imgLblTransfers.text = "O";
      this.setDefaultSkins();
      if(currForm === 'frmAccountsDetails' || currForm === 'frmAccountsLanding' || currForm === 'frmBBAccountsLanding' || currForm === 'frmDashboard' || currForm === 'frmEnrollBusiness'){
        this.view.topmenu.flxaccounts.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.topmenu.flxaccounts.accessibilityConfig = {
          a11yARIA:{
             role: "link",
            "aria-current":true
          }
        };
      }
      else if(currForm === 'frmTransfers' || currForm === 'frmPayAPerson' || currForm === 'frmWireTransfer' || currForm === 'frmAcknowledgement' || currForm === 'frmConfirm' || currForm === 'frmVerifyAccount')
        this.view.topmenu.flxTransfersAndPay.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
      else if(currForm === 'frmCustomerFeedback' || currForm === 'frmCustomerFeedbackSurvey'){
        this.view.topmenu.flxFeedbackimg.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.topmenu.flxFeedbackimg.skin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.topmenu.lblFeedback.skin = "sknLblffffff15pxSSP";
      }
      else if(currForm === 'frmOnlineHelp')
        this.view.topmenu.flxHelp.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer"; 
      else if(currForm === 'frmBillPay')
      {
        this.view.topmenu.flxMyBills.skin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.topmenu.flxMyBills.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer"; 
      }
    },

    onKeyPressCallBack: function(eventObject, eventPayload){
      var scope = this;
      if(eventPayload.keyCode === 27){
          if(sourceWidget!==null){ 
            sourceWidget.setActive(true);
            sourceWidget=null;
          }
        else if(scope.view.flxHamburger.isVisible===true){
          if (scope.view.customhamburger.flxSegLegalEntityHamburger.isVisible === true) {
            scope.view.customhamburger.toggleLEDropdown(scope.view.customhamburger.flxSegLegalEntityHamburger, scope.view.customhamburger.lblLegalEntityDropdownIconHamburger);
            scope.view.customhamburger.flxLegalEntityDropdownHamburger.setActive(true);
          }
          else{
          scope.closeHamburgerMenu();
          var frm=kony.application.getCurrentForm();
          if(frm.id==="frmLocateUs"){
            frm.flxFormContent.clipBounds = false;
            frm.flxFormContent.height = kony.os.deviceInfo().screenHeight + 300;
          }
          scope.view.topmenu.btnHamburger.setFocus(true);
          }
        }
        else if(scope.view.topmenu.flxContextualMenu.isVisible === true){
          scope.openContextualMenu();
          scope.view.topmenu.flxTransfersAndPay.setActive(true);
        }
        else if(scope.view.flxUserActions.isVisible===true){
          scope.showUserActions();
          scope.view.headermenu.flxUserId.setActive(true);
        }
          else if (scope.view.headermenu.flxSegLegalEntity.isVisible === true) {
            scope.view.headermenu.toggleLEDropdown(scope.view.headermenu.flxSegLegalEntity, scope.view.headermenu.lblLegalEntityDropdownIcon);
            scope.view.headermenu.flxLegalEntityDropdown.setActive(true);
          }
      }
    },

    setDefaultHoverSkins: function() {
      this.view.topmenu.flxaccounts.hoverSkin = "flxHoverSkinPointer000000op10";
      this.view.topmenu.flxTransfersAndPay.hoverSkin = "flxHoverSkinPointer000000op10";
      this.view.topmenu.flxMyBills.hoverSkin = "flxHoverSkinPointer000000op10";
    }  ,
    setDefaultSkins: function(){
      this.view.topmenu.flxMyBills.skin = "flxHoverSkinPointer";
    },
    onBreakpointChangeComponent: function(width){
      if(width==undefined || width==null){
        width = kony.application.getCurrentBreakpoint();
      }
      var scope = this;
      this.view.flxUserActions.setVisibility(false);
      this.view.lblHeaderMobile.setVisibility(false);

      if(this.isPreLoginView){
        this.showPreLoginView();
      }else{
        this.showPostLoginView();
      }

      if(width === 640 || orientationHandler.isMobile){
        scope.view.flxTopmenu.top="0dp";
        scope.view.customhamburger.width = "90%";
        scope.view.flxImgKony.isVisible = false;
        scope.view.imgKony.isVisible=false;
        scope.view.customhamburger.imgKony.left = "12%";
        scope.view.customhamburger.flxClose.left= "86.5%";
        scope.view.flxHeaderMain.width="100%";
        scope.view.topmenu.btnHamburger.left="13dp";
        this.view.lblHeaderMobile.setVisibility(true);
      }else if(width === 1024 || width === 768 || orientationHandler.isTablet){
        scope.view.flxTopmenu.top="70dp";
        scope.view.customhamburger.width = "60%";
        scope.view.flxImgKony.isVisible = true;
        scope.view.imgKony.isVisible=true;
        scope.view.flxImgKony.left="20dp";
        scope.view.headermenu.right="15dp";
        scope.view.topmenu.flxCombinedAccess.right="15dp";
        scope.view.topmenu.flxCombinedAccess.right="18dp";
        scope.view.topmenu.flxFeedback.right="-0.5%";
        scope.view.topmenu.flxFeedback.width="130dp";
        scope.view.topmenu.lblFeedback.right = "0px";
        // scope.view.topmenu.flxverseperator2.right = "17dp"
        scope.view.topmenu.flxHelp.right = "132dp";
        scope.view.topmenu.flxHelp.width = "50dp";
        scope.view.topmenu.flxCombined.right = "0dp";
        scope.view.topmenu.lblHelp.centerx="50%";
        scope.view.topmenu.lblHelp.centerX = "50%";
        scope.view.flxImgKony.left = "24dp";
        scope.view.topmenu.btnHamburger.left="24dp";
        scope.view.headermenu.width="100%";
        scope.view.headermenu.right="";
        scope.view.flxHeaderMain.left = "0%";
        scope.view.flxHeaderMain.width="100%";
        scope.view.flxHeaderMain.centerX="";
        scope.view.headermenu.right="28dp";
        scope.view.imgKony.top = "0dp";
        scope.view.customhamburger.flxLegalEntityHamburger.isVisible=false;
      }else if(width===1366){
        scope.view.flxTopmenu.top="70dp";
        scope.view.flxHeaderMain.width="88%"
        scope.view.flxHeaderMain.centerx="50%";
        scope.view.flxHeaderMain.centerX="50%";

        scope.view.headermenu.right="-10dp";
        scope.view.topmenu.flxCombinedAccess.right="-10dp";
        scope.view.topmenu.flxCombined.right="-13dp";

        scope.view.flxTopmenu.width = "100%"
        scope.view.topmenu.width = "100%";
        scope.view.topmenu.flxMenusMain.width = "100%"
        scope.view.topmenu.btnHamburger.left="0dp"
        scope.view.topmenu.btnHamburger.width="45dp";
        //scope.view.topmenu.imgMenu.left= "-2dp";

        scope.view.topmenu.flxFeedback.right="-3.5%";
        scope.view.topmenu.flxFeedback.width="130dp";
        scope.view.topmenu.lblFeedback.right = "0px";
        // scope.view.topmenu.flxverseperator2.right = "17dp"
        scope.view.topmenu.flxHelp.right = "102dp";
        scope.view.topmenu.flxHelp.width = "50dp";
        scope.view.topmenu.flxCombined.right = "0dp";
        scope.view.topmenu.lblHelp.centerx="50%";
        scope.view.topmenu.lblHelp.centerX = "50%";
		scope.view.flxImgKony.isVisible=true;
        scope.view.imgKony.isVisible=true;
        scope.view.flxImgKony.left="0dp";
        scope.view.flxImgKony.width="100dp";


        scope.view.customhamburger.width = "500dp";
        scope.view.customhamburger.flxClose.left= "92%";
        scope.view.customhamburger.flxLegalEntityHamburger.isVisible=false;
      }else{
        scope.view.customhamburger.flxLegalEntityHamburger.isVisible=false;
        if(kony.application.getCurrentForm().id === "frmEnrollBusiness"){
          scope.view.flxHeaderMain.width = "88%";
        }
        else {
          scope.view.flxHeaderMain.width = "1366dp";
        }
        scope.view.flxHeaderMain.centerx="50%";
        scope.view.flxHeaderMain.centerX="50%";

        if(width === 1920 || width >1366) {
          scope.view.flxTopmenu.top="70dp";
          scope.view.flxImgKony.left="83dp";
          scope.view.headermenu.width="1200dp";                    
          scope.view.headermenu.centerX="50%";
          scope.view.topmenu.width="1200dp";
          scope.view.topmenu.centerX="50%";
          //scope.view.flxHeaderMain.left = "4.5%";
        }

        //scope.view.headermenu.right="-7dp";
        //scope.view.topmenu.flxCombinedAccess.right="-7dp";
        //scope.view.topmenu.flxCombined.right="-10dp";
        scope.view.flxTopmenu.width = "100%";
        scope.view.topmenu.flxMenusMain.width = "100%"
        //scope.view.topmenu.btnHamburger.left = "0dp";
        scope.view.topmenu.btnHamburger.width="45dp";
        //scope.view.topmenu.imgMenu.left= "-2dp";

        //scope.view.topmenu.flxFeedback.right="-3.5%";
        scope.view.topmenu.flxFeedback.width="130dp";
        //scope.view.topmenu.lblFeedback.right = "0px";
        //scope.view.topmenu.flxverseperator2.right = "15dp"
        //scope.view.topmenu.flxHelp.right = "102dp";
        scope.view.topmenu.flxHelp.width = "50dp";
        //scope.view.topmenu.flxCombined.right = "0dp";
        scope.view.topmenu.lblHelp.centerx="50%";
        scope.view.topmenu.lblHelp.centerX = "50%";
		scope.view.flxImgKony.isVisible=true;
        scope.view.imgKony.isVisible=true;
        //scope.view.flxImgKony.left="0dp";
        scope.view.flxImgKony.width="100dp";

        scope.view.customhamburger.width = "28%";
        scope.view.customhamburger.flxClose.left= "92%";
      }
      scope.view.flxHamburger.width = "100%";

      if(width==640 || orientationHandler.isMobile){
        this.view.topmenu.flxTransfersAndPay.onTouchEnd = null;
      }else if(width==1024 || orientationHandler.isTablet){
        this.view.topmenu.flxTransfersAndPay.onTouchEnd = null;
      } 
      if (width === 640) {
        this.view.topmenu.flxaccounts.isVisible = false;
        // this.view.topmenu.flxSeperator1.isVisible = false;
        this.view.topmenu.flxTransfersAndPay.isVisible = false;
        this.view.headermenu.isVisible = false;
      } else {
        this.view.headermenu.isVisible = true;
        if (!this.isPreLoginView) {
          this.view.topmenu.flxaccounts.isVisible = true;
          // this.view.topmenu.flxSeperator1.isVisible = true;
          this.view.topmenu.flxTransfersAndPay.isVisible = true;
        }
      }
      str = kony.i18n.getCurrentLocale();
      if (str === "ar_AE") {
        this.view.headermenu.lblImageLogout.text = "/";
        this.view.topmenu.btnHamburger.skin = "btnHamburgerRtlskn";
      } else {
        this.view.headermenu.lblImageLogout.text = "l";
        this.view.topmenu.btnHamburger.skin = "btnHamburgerskn";
      }

      /* dropdown visibility check for single/multi entity flow */
      let singleEntityValue = "true";
      if (applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity") !== undefined) {
        singleEntityValue = applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity");
      }
      let userLegalEntitesSize = applicationManager.getMultiEntityManager().getUserLegalEntitiesSize();
      if (singleEntityValue === "false") {
        this.view.headermenu.flxLegalEntity.setEnabled(true);
        this.view.customhamburger.flxLegalEntityHamburger.setEnabled(true);
        if (userLegalEntitesSize > 0) {
          if (kony.application.getCurrentBreakpoint() === 640) {
            this.view.customhamburger.flxLegalEntityHamburger.setVisibility(true);
          } else {
            this.view.headermenu.flxLegalEntity.setVisibility(true);
            // this.view.headermenu.flxVerticalSeperator4.setVisibility(true);
          }
          if (userLegalEntitesSize === 1) {
            this.view.headermenu.flxLegalEntity.setEnabled(false);
            this.view.customhamburger.flxLegalEntityHamburger.setEnabled(false);
          }
        } else {
          this.view.customhamburger.flxLegalEntityHamburger.setVisibility(false);
          this.view.headermenu.flxLegalEntity.setVisibility(false);
          // this.view.headermenu.flxVerticalSeperator4.setVisibility(false);
        }
      } else {
        this.view.customhamburger.flxLegalEntityHamburger.setVisibility(false);
        this.view.headermenu.flxLegalEntity.setVisibility(false);
        // this.view.headermenu.flxVerticalSeperator4.setVisibility(false);
      }
      this.view.flxHamburgerBack.height = getTotalHeight() + "px";
      this.view.flxHamburger.height = getTotalHeight() + "px";
      this.view.customhamburger.flxMenuWrapper.top = "0dp";
      this.view.customhamburger.flxMenu.height = getTotalHeight() -2 + "px";
      this.view.customhamburger.flxScroll.height = getTotalHeight()-60 + "px";
      this.view.forceLayout();
    },
    isPreLoginView: false,
    showPreLoginView: function(){
      this.isPreLoginView = true;
      if(orientationHandler.isMobile || kony.application.getCurrentBreakpoint()==640){
        this.view.topmenu.flxMenusMain.setVisibility(false);
        this.view.flxTopmenu.setVisibility(true);
        this.view.flxBottomBlue.setVisibility(true);
      }else{
        this.view.height = "70dp";
        this.view.parent.height = "70dp";
        this.view.flxHeaderMain.height = "70dp";
        this.view.flxTopmenu.setVisibility(false);
        this.view.flxBottomContainer.height = "70dp";
        this.view.flxBottomBlue.setVisibility(false);
        this.view.flxSeperatorHor2.top = "70dp";
        this.view.headermenu.flxNotifications.isVisible = false;
        this.view.headermenu.flxMessages.isVisible = false;
        // this.view.headermenu.flxVerticalSeperator1.isVisible = false;
        // this.view.headermenu.flxVerticalSeperator3.isVisible = false;
        this.view.headermenu.flxResetUserImg.isVisible = false;
        this.view.headermenu.flxUserId.isVisible = false;            
        // this.view.headermenu.btnLogout.toolTip = kony.i18n.getLocalizedString("i18n.common.login");
        this.view.headermenu.btnLogout.setVisibility(true);
        this.view.headermenu.imgLogout.src = "login_icon_locateus.png";
        //this.view.headermenu.imgLogout.toolTip = kony.i18n.getLocalizedString("i18n.common.login");
        this.view.headermenu.flxWarning.right = "40dp";
        this.view.headermenu.flxWarning.setVisibility(true);
      }
    },
    showPostLoginView: function(){
      var configurationManager = applicationManager.getConfigurationManager();
      var isRetailUser = applicationManager.getConfigurationManager().getConfigurationValue('isRBUser') === "true";
      this.isPreLoginView = false;

      if(orientationHandler.isMobile || kony.application.getCurrentBreakpoint()==640){
        this.view.topmenu.flxMenusMain.setVisibility(true);
        this.view.flxTopmenu.setVisibility(true);
        this.view.flxBottomBlue.setVisibility(true);
      }else{
        this.view.height = "120dp";
        this.view.parent.height = "120dp";
        this.view.flxHeaderMain.height = "120dp";
        this.view.flxTopmenu.setVisibility(true);
        this.view.flxBottomContainer.height = "120dp";
        this.view.flxBottomBlue.setVisibility(true);
        this.view.flxSeperatorHor2.top = "120dp";

        this.view.headermenu.flxNotifications.isVisible = configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE);
        if(isRetailUser){
          // this.view.headermenu.flxVerticalSeperator3.isVisible = configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE);
          this.view.headermenu.flxMessages.isVisible = configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE);
          if(this.view.headermenu.flxMessages.isVisible) {
            this.view.headermenu.flxMessages.right = "210dp";
          }
        }
        // this.view.headermenu.flxVerticalSeperator1.isVisible = configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE);
        this.view.headermenu.flxResetUserImg.isVisible = true;
        this.view.headermenu.flxUserId.isVisible = true;            
        //this.view.headermenu.btnLogout.toolTip = kony.i18n.getLocalizedString("i18n.common.logout");
        // this.view.headermenu.imgMessages.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Message");
        //this.view.headermenu.lblNotifications.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts");
        //this.view.headermenu.imgUserReset.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
        this.view.headermenu.btnLogout.setVisibility(true);
        this.view.headermenu.imgLogout.src = "logout.png";
        // this.view.headermenu.imgLogout.toolTip = kony.i18n.getLocalizedString("i18n.common.logout");
        this.view.headermenu.flxWarning.setVisibility(false);
      }
    }
  };
});