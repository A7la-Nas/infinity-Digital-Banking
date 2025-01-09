/*eslint require-jsdoc:0
    complexity:0
*/
define(['ViewConstants', 'CommonUtilities', 'TopbarConfig', 'HamburgerConfig', 'FormControllerUtility'], function (ViewConstants, CommonUtilities, TopbarConfig, HamburgerConfig, FormControllerUtility) {
function getTotalHeight() {
  return kony.os.deviceInfo().screenHeight;
  //   var height = 0;
  //   var widgets = kony.application.getCurrentForm().widgets();
  //   for (var i = 0; i < 3; i++) {
  //     var widget = widgets[i];
  //     height += widget.frame.height;
  //   }
  //   height += kony.application.getCurrentForm().flxFooter.frame.y;
  //   return height;
}

var orientationHandler = new OrientationHandler();
var MENU_CONTAINER = "flxHamburgerMenu";
var SAMPLE_MENU = "flxMenuItem";
var SAMPLE_SUB_MENU = "flxSubMenu";
var SAMPLE_SUB_MENU_ITEM = "flxSubMenuItem";
var onItemSelectListener = null;
var sourceWidget=null;
var MIN_ENTITIES_RECORDS_TO_ALLOW_SEARCH = 5;

return {
  initialized: false,
  actiavteWhenInitialized: null,
  isPreLoginView: false,
  preShow: function () {
    this.initialized = false;
    FormControllerUtility.updateWidgetsHeightInInfo(this.view, ["flxMenuContainer", "flxMenuWrapper", "lblTransferAndPay"]);
    var configurationManager = applicationManager.getConfigurationManager();
    var isUserLoggedIn = applicationManager.getUserPreferencesManager().isUserLoggedin();
    if (configurationManager.enableAlertsIcon === "true" && isUserLoggedIn && configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE)) {
      this.view.flxNotifications.isVisible = true;
      // this.view.flxSeparator1.isVisible = true;
    } else {
      this.view.flxNotifications.isVisible = false;
      // this.view.flxSeparator1.isVisible = false;
    }
    if (!this.initialized && applicationManager.getUserPreferencesManager().isUserLoggedin()) {
      var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "HomepageMA",
                                "moduleName": "AccountsUIModule"
                            });
      var custDashboard = accountsModule.presentationController.customerdashboard;
      if (custDashboard === "true")
      	this.view.lblAccounts.text = kony.i18n.getLocalizedString("i18n.common.overview");
      else
        this.view.lblAccounts.text = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
      this.generateMenu();
      this.initialized = true;
      if (this.actiavteWhenInitialized) {
        this.activateMenu(this.actiavteWhenInitialized.parentId, this.actiavteWhenInitialized.childId)
        this.actiavteWhenInitialized = null;
      }
    }
    CommonUtilities.setText(this.view.imgKony, kony.i18n.getLocalizedString("i18n.a11y.common.logo"), CommonUtilities.getaccessibilityConfig());
    var messageText = this.view.imgMessages.text;
    CommonUtilities.setText(this.view.imgMessages, kony.i18n.getLocalizedString("i18n.a11y.common.messages"), CommonUtilities.getaccessibilityConfig());
    this.view.imgMessages.text = messageText;
    this.setupContextualActions();
    this.setupHamburger();
    this.setupLogout();
    this.setupUserActions();
    this.setHoverSkins();
    this.isAccountsEnabled();
    flag = 0;
    //this.view.lblTransferAndPay.toolTip = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
    //this.view.lblMyBills.toolTip = kony.i18n.getLocalizedString("i18n.Pay.MyBills");
    //this.view.imgLblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
    this.view.flxAccounts.onClick = TopbarConfig.config.ACCOUNTS.onClick;
    this.view.flxMyBills.onClick = TopbarConfig.config.BILLS.onClick;
    this.view.flxNotifications.onClick = TopbarConfig.config.NOTIFICATIONS.onClick;
    this.view.flxMessages.onClick = TopbarConfig.config.MESSAGES.onClick;
    this.view.flxHelp.onClick = TopbarConfig.config.HELP.onClick;
    this.view.flxFeedback.onClick = TopbarConfig.config.FEEDBACK.onClick;
    this.view.flxUser.onClick = this.showUserActions;
    //this.view.flxImgKonyHamburger.onClick = this.showDashboardScreen;
    //this.view.flximgKony.onClick = this.showDashboardScreen;
    this.forceCloseHamburger();
    this.view.btnHamburgerNew.skin = "btnHamburgerskn";
    this.view.flxContextualMenu.setVisibility(false);
    this.view.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU_HOVER;
    this.view.flximgKony.accessibilityConfig = {
      a11yARIA: {
        tabindex: -1
      }
    }
    this.view.btnSkipNav.accessibilityConfig = {
      "a11yLabel": "Skip to Main Content",
      a11yARIA: {
        role : "button",
      },
    }
    this.view.flxMessages.accessibilityConfig = {
      "a11yLabel": "Messages",
      "a11yARIA": {
        role : "button",
      }
    }
    this.view.flxNotifications.accessibilityConfig = {
      "a11yLabel": "Alerts",
      "a11yARIA": {
        role : "button",
      }
    }
    this.view.flxUser.accessibilityConfig={
      a11yLabel : "Profile",
      a11yARIA:{
          tabindex : 0,
          role : "button",
          "aria-expanded" : false
      }
    }
    this.view.flxUserActions.accessibilityConfig={
      "a11yARIA":{
        "aria-live": "off",
        "tabindex" : -1
      }
    }
    this.view.imgLogout.accessibilityConfig = {
      a11yHidden : true,
      a11yARIA: {
      },
    }
    this.view.lblImageLogout.accessibilityConfig = {
      a11yHidden : true,
      a11yARIA: {
        tabindex: -1,
      },
    }
    this.view.btnLogout.accessibilityConfig = {
      "a11yLabel": kony.i18n.getLocalizedString("i18n.common.logout"),
      a11yARIA: {
        "role": "button",
        "tabindex":0
      },
    }
    this.view.btnHamburgerNew.accessibilityConfig = {
      "a11yLabel": "Main navigation menu",
      a11yARIA: {
        role : "button",
        tabindex:0,
        "aria-expanded":false
      },
    }
    this.view.flxAccounts.accessibilityConfig = {
      "a11yLabel": "Accounts",
      a11yARIA: {
        role : "link"
      },
    }
    this.view.flxTransfersAndPay.accessibilityConfig = {
      a11yARIA: {
        role : "button",
        "aria-labelledby":"lblTransferAndPay",
        "tabindex":0,
        "aria-expanded":false
      },
    }
    this.view.flxMyBills.accessibilityConfig = {
      "a11yLabel": "My Bills",
      a11yARIA: {
        role : "button"
      },
    }
    this.view.btnHamburgerNew.accessibilityConfig = {
      "a11yLabel": "Main navigation menu",
      a11yARIA: {
        role : "button",
        tabindex:0,
        "aria-expanded":false
      },
    }
    this.view.flxClose.accessibilityConfig = {
      "a11yLabel": "Close main navigation menu",
      a11yARIA: {
        role : "button",
      },
    }
    this.view.flxImgKonyHamburger.accessibilityConfig = {
      a11yARIA: {
        tabindex: -1
      },
    }
    this.view.lblAccounts.accessibilityConfig = {
      // "a11yLabel": kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
      "a11yHidden":true,
      "a11yARIA": {
        "tabindex": -1
      }
    }
    this.view.flxHamburger.accessibilityConfig = {
      // "a11yLabel": kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
      "a11yARIA": {
        "tabindex": -1,
        "aria-live":"off",
        "aria-modal": true,
        "role": "dialog"
      }
    }
    // this.view.lblTransferAndPay.accessibilityConfig = {
    //   "a11yLabel": "Payments and Transfers",
    //   "a11yARIA": {
    //     "tabindex": -1
    //   }
    // }
    this.view.lblMyBills.accessibilityConfig = {
      a11yHidden : true,
      "a11yARIA": {
        "tabindex": -1
      }
    }
    this.view.imgMessages.accessibilityConfig = {
      "a11yARIA": {
        "tabindex": -1,
        "aria-hidden":true
      }  
    }
    
    this.view.imgUser.accessibilityConfig = {
      "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"),
      a11yARIA: {
      },
    }
    this.view.lblNotifications.accessibilityConfig = {
      a11yARIA: {
        tabindex: -1,
        "aria-hidden" : true
      },
    }      
    this.view.imgKonyHamburger.accessibilityConfig = {
      a11yLabel : "Infinity Digital Banking",
      a11yARIA: {
        tabindex: -1
      },
    }
    this.view.flxMenuItem.accessibilityConfig = {
      a11yARIA: {
        "role" : "button"
      },
    }
    /*     
    this.view.Label0dcf00103bdba46.accessibilityConfig = {
      "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.hamburger.transfer"),
      a11yARIA: {
        tabindex: -1,
      },
    }
    this.view.CopyLabel0bb648d916e554d.accessibilityConfig = {
      "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.Transfers.TRANSFERACTIVITIES"),
      a11yARIA: {
        tabindex: -1,
      },
    }
    this.view.CopyLabel0a8b12f7002084d.accessibilityConfig = {
      "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient"),
      a11yARIA: {
        tabindex: -1,
      },
    }
    this.view.CopyLabel0h9e71b8a76ad44.accessibilityConfig = {
      "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient"),
      a11yARIA: {
        tabindex: -1,
      },
    }
    */
    this.view.imgKony.accessibilityConfig = {
      a11yLabel : "Infinity Digital Banking",
      a11yARIA: {
        tabindex: -1
      },
    };
    this.view.imgLblTransfers.accessibilityConfig = {
      //"a11yLabel": kony.i18n.getLocalizedString("i18n.common.infinityDB"),
      "a11yHidden": true,
      a11yARIA: {
        tabindex: -1,
      },
    };
    this.view.lblLegalEntityDropdownIconHamburger.accessibilityConfig = {
      "a11yHidden": true,
      "a11yARIA": {
        "tabindex": -1
      },
    };
   this.view.flxLegalEntityDropdownHamburger.accessibilityConfig = {
      a11yLabel : this.view.lblLegalEntityHamburger.text + " " + this.view.lblLegalEntityTextHamburger.text,
      a11yARIA: {
        "role": "button",
        "aria-expanded": false,
        "tabindex": 0
      }
    };
    this.view.flxSegLegalEntityHamburger.accessibilityConfig = {
      a11yARIA: {
        "aria-live": "off",
        "tabindex": -1
      }
    };
    this.view.lblLegalEntityDropdownIcon.accessibilityConfig = {
      "a11yHidden": true,
      "a11yARIA": {
        "tabindex": -1
      },
    };
      this.view.flxLegalEntityDropdown.accessibilityConfig = {
        a11yLabel : this.view.lblLegalEntity.text + " " + this.view.lblLegalEntityText.text,
        a11yARIA: {
          "role": "button",
          "aria-expanded": false,
          "tabindex": 0
        }
      };
    this.view.flxSegLegalEntity.accessibilityConfig = {
      a11yARIA: {
        "aria-live": "off",
        "tabindex": -1
      }
    };
    this.onBreakpointChangeComponent();
    this.closeHamburgerMenu();
    let singleEntityValue = "true";
    if (applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity") !== undefined) {
      singleEntityValue = applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity");
    }
    let userLegalEntitesSize = applicationManager.getMultiEntityManager().getUserLegalEntitiesSize();
    if (singleEntityValue === "false") {
      this.view.flxLegalEntityHamburger.setEnabled(true);
      this.view.flxLegalEntity.setEnabled(true);
      if (userLegalEntitesSize > 0) {
        if (kony.application.getCurrentBreakpoint() === 640) {
          this.view.flxLegalEntity.setVisibility(false);
          this.view.flxLegalEntityHamburger.setVisibility(true);
          // this.view.flxVerticalSeperator4.setVisibility(false);
        } else {
          this.view.flxLegalEntity.setVisibility(true);
          this.view.flxLegalEntityHamburger.setVisibility(false);
          // this.view.flxVerticalSeperator4.setVisibility(true);
        }
        if (userLegalEntitesSize === 1) {
          this.view.flxLegalEntity.setEnabled(false);
          this.view.flxLegalEntityHamburger.setEnabled(false);
        }
        this.view.flxLegalEntityDropdown.onClick = this.toggleLEDropdown.bind(this, this.view.flxSegLegalEntity, this.view.lblLegalEntityDropdownIcon);
        this.view.tbxLESearch.onKeyUp = this.performSearch.bind(this);
        this.view.flxLECross.onClick = this.populateLEList.bind(this);
        this.view.flxLegalEntityDropdownHamburger.onClick = this.toggleLEDropdown1.bind(this, this.view.flxSegLegalEntityHamburger, this.view.lblLegalEntityDropdownIconHamburger);
        this.view.tbxLESearchHamburger.onKeyUp = this.performSearch1.bind(this);
        this.view.flxLECrossHamburger.onClick = this.populateLEList1.bind(this);
        let scope = this;
        this.view.segLegalEntity.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": -1
          }
        }
        this.view.segLegalEntityHamburger.onRowClick = function () {
          scope.onEntitySwitchInDropdown(scope.view.segLegalEntityHamburger, scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityTextHamburger, scope.populateLEList1);
        };
        this.populateLEList();
        this.populateLEList1();
      } else {
        this.view.flxLegalEntity.setVisibility(false);
        this.view.flxLegalEntityHamburger.setVisibility(false);
        // this.view.flxVerticalSeperator4.isVisible = false;
      }
    } else {
      this.view.flxLegalEntity.setVisibility(false);
      this.view.flxLegalEntityHamburger.setVisibility(false);
      // this.view.flxVerticalSeperator4.isVisible = false;
    }
    this.view.onKeyPress = this.onKeyPressCallBack;
    this.view.segUserActions.onKeyPress = this.onKeyPressCallBack;
    this.view.flxHamburger.onKeyPress = this.onKeyPressCallBack;
    this.view.flxLegalEntityDropdown.onKeyPress = this.onKeyPressLEFlx;
    this.view.flxSegLegalEntity.onKeyPress = this.onKeyPressCallBack;
    this.view.flxLegalEntityDropdownHamburger.onKeyPress = this.onKeyPressLEHamFlx;
    this.view.flxSegLegalEntityHamburger.onKeyPress = this.onKeyPressCallBack;
    this.updateAlertIcon();
  },

  onKeyPressLEFlx: function (eventObject, eventPayload, context) {
    var scope = this;
    if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
      if(scope.view.flxSegLegalEntity.isVisible===true)
        scope.toggleLEDropdown(scope.view.flxSegLegalEntity, scope.view.lblLegalEntityDropdownIcon);
    }
    if (eventPayload.keyCode === 27) {
      scope.toggleLEDropdown(scope.view.flxSegLegalEntity, scope.view.lblLegalEntityDropdownIcon);
      scope.view.flxLegalEntityDropdown.setActive(true);
    }
  },
  
  fetchTermsAndConditions: function (requestObj, callback) {
    let accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
    accountsModule.presentationController.fetchTermsAndConditions(requestObj, callback);
  },

  updateTermsAndConditions: function (requestObj, callback) {
    let accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
    accountsModule.presentationController.updateTermsAndConditions(requestObj, callback);
  },

  onEntitySwitchInDropdown: function (seg, flx, lbl, callback) {
    let scope = this;
    let selectedEntityRowData = seg.selectedRowItems[0];
    let selectedEntityData;
    if (selectedEntityRowData) {
      selectedEntityData = seg.data.find(entityData => entityData.id === selectedEntityRowData.id);
    }
    let checkTermsAndConditionsAlreadySignedCallback = function (response) {
      if (response && !response.alreadySigned) {
        scope.showTermsAndConditionsLegalEntityPopup(response, seg, flx, lbl, callback);
      } else {
        callback();
      }
    };
    if (selectedEntityData) {
      let request = {
        "id": selectedEntityData.id
      };
      scope.fetchTermsAndConditions(request, checkTermsAndConditionsAlreadySignedCallback);
    }
  },
  
  performSearch:function(){
    let scope = this;
    if(this.view.tbxLESearch.text.trim().length>0){
      this.view.flxLECross.isVisible=true;
      var entityData = this.view.segLegalEntity.info.data;
      var searchText = this.view.tbxLESearch.text.toLowerCase();
      var statusName = "";
      var filteredData = entityData.filter(function(rec) {
          statusName = rec.lblDescription.text.toLowerCase();
          if (statusName.indexOf(searchText) >= 0) return rec;
        });
        if (filteredData.length === 0) {
          this.view.segLegalEntity.setVisibility(false);
          //this.view.segLegalEntity.richTexNoResult.setVisibility(true);
        } else {
          //this.view.segLegalEntity.richTexNoResult.setVisibility(false);
          this.view.segLegalEntity.setVisibility(true);
          this.view.segLegalEntity.setData(filteredData);
        }
    }else{
      this.populateLEList();
    }
    this.view.forceLayout();
  },
  
  populateLEList: function () {
    let scope = this;
    this.view.segLegalEntity.widgetDataMap = {
      "flxMultiEntityList": "flxMultiEntityList",
      "lblDescription": 'lblDescription',
      "id": "id"
    };
    let segData = [];
    let entitiesData = applicationManager.getMultiEntityManager().getUserLegalEntitiesListArr();
    for (let entityData of entitiesData) {
      segData.push({
        "flxMultiEntityList": {
          onClick: scope.onEntityClick,
          onKeyPress: scope.onLEKeyPressCallback
        },
        "lblDescription": {
          text: entityData.companyName,
          toolTip: entityData.companyName,
          skin: 'ICSKNLbl42424215PxWordBreak',
        },
        "id": entityData.id
      });
    };
    this.view.segLegalEntity.setData(segData);
    this.view.segLegalEntity.info = {
      "data": this.view.segLegalEntity.data
    };
    this.view.segLegalEntity.setVisibility(true);
    this.view.flxLegalEntityDropdown.accessibilityConfig = {
        a11yLabel : this.view.lblLegalEntity.text + " " + this.view.lblLegalEntityText.text,
        a11yARIA: {
          "role": "button",
          "aria-expanded": false,
          "tabindex": 0
        }
      };
    if (segData.length <= MIN_ENTITIES_RECORDS_TO_ALLOW_SEARCH) {
      this.view.flxLESearch.isVisible = false;
    } else {
      this.view.flxLESearch.isVisible = true;
      this.view.tbxLESearch.text = "";
      this.view.flxLECross.isVisible = false;
    }
    let currentLegalEntity = applicationManager.getUserPreferencesManager().getCurrentLegalEntity();
    let selectedEntityData = entitiesData.find(entityData => entityData.id === currentLegalEntity);
    this.view.lblLegalEntityText.text = selectedEntityData && selectedEntityData.companyName ? selectedEntityData.companyName : "";
    this.view.lblLegalEntityDropdownIcon.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
    this.view.flxSegLegalEntity.setVisibility(false);
    this.view.forceLayout();
  },
  
  toggleLEDropdown: function (flx, lbl) {
    var segData = this.view.segLegalEntity.data;
    if (segData.length <= MIN_ENTITIES_RECORDS_TO_ALLOW_SEARCH) {
      this.view.flxLESearch.isVisible = false;
      this.view.flxSegLegalEntity.height = segData.length >= 3 ?  '150dp' : 50 * segData.length + 1 + 'dp';
      this.view.segLegalEntity.height = '100%'
    } else {
      this.view.flxLESearch.isVisible = true;
      this.view.tbxLESearch.text = "";
      this.view.flxLECross.isVisible = false;
      this.view.flxSegLegalEntity.height = '175dp'
      this.view.segLegalEntity.height = '85%'
    }
    if (flx.isVisible) {
      flx.setVisibility(false);
      lbl.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
        this.view.flxLegalEntityDropdown.accessibilityConfig = {
        a11yLabel : this.view.lblLegalEntity.text + " " + this.view.lblLegalEntityText.text,
        a11yARIA: {
          "role": "button",
          "aria-expanded": false,
          "tabindex": 0
        }
      };
    } else {
      flx.setVisibility(true);
      lbl.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
      this.view.flxLegalEntityDropdown.accessibilityConfig = {
        a11yLabel : this.view.lblLegalEntity.text + " " + this.view.lblLegalEntityText.text,
        a11yARIA: {
          "role": "button",
          "aria-expanded": true,
          "tabindex": 0
        }
      };
    }
    this.view.forceLayout();
    this.view.flxLegalEntityDropdown.setActive(true);
  },

  performSearch1:function(){
    let scope = this;
    if(this.view.tbxLESearchHamburger.text.trim().length>0){
      this.view.flxLECrossHamburger.isVisible=true;
      var entityData = this.view.segLegalEntityHamburger.info.data;
      var searchText = this.view.tbxLESearchHamburger.text.toLowerCase();
      var statusName = "";
      var filteredData = entityData.filter(function(rec) {
          statusName = rec.lblDescription.text.toLowerCase();
          if (statusName.indexOf(searchText) >= 0) return rec;
        });
        if (filteredData.length === 0) {
          this.view.segLegalEntityHamburger.setVisibility(false);
        } else {
          this.view.segLegalEntityHamburger.setVisibility(true);
          this.view.segLegalEntityHamburger.setData(filteredData);
        }
    }else{
      this.populateLEList1();
    }
    this.view.forceLayout();
  },

  populateLEList1: function () {
    let scope = this;
    this.view.segLegalEntityHamburger.widgetDataMap = {
      "lblDescription": 'lblDescription',
      "flxMultiEntityList":"flxMultiEntityList",
      "id": "id"
    };
    let segData = [];
    let entitiesData = applicationManager.getMultiEntityManager().getUserLegalEntitiesListArr();;
    for (let entityData of entitiesData) {
      segData.push({
        "flxMultiEntityList": {
          onKeyPress: scope.onHamLEKeyPressCallback
        },
        "lblDescription": {
          text: entityData.companyName,
          toolTip: entityData.companyName,
          skin: 'ICSKNLbl42424215PxWordBreak'
        },
        "id": entityData.id
      });
    }
    this.view.segLegalEntityHamburger.setData(segData);
    this.view.segLegalEntityHamburger.info = {
      "data": this.view.segLegalEntityHamburger.data
    };
    this.view.segLegalEntityHamburger.setVisibility(true);
    this.view.flxLegalEntityDropdownHamburger.accessibilityConfig = {
      a11yLabel : this.view.lblLegalEntityHamburger.text + " " + this.view.lblLegalEntityTextHamburger.text,
      a11yARIA: {
        "role": "button",
        "aria-expanded": false,
        "tabindex": 0
      }
    };
    if (segData.length <= MIN_ENTITIES_RECORDS_TO_ALLOW_SEARCH) {
      this.view.flxLESearchHamburger.isVisible = false;
    } else {
      this.view.flxLESearchHamburger.isVisible = true;
      this.view.tbxLESearchHamburger.text = "";
      this.view.flxLECrossHamburger.isVisible = false;
    }
    let currentLegalEntity = applicationManager.getUserPreferencesManager().getCurrentLegalEntity();
    let selectedEntityData = entitiesData.find(entityData => entityData.id === currentLegalEntity);
    this.view.lblLegalEntityTextHamburger.text = selectedEntityData && selectedEntityData.companyName ? selectedEntityData.companyName : "";
    this.view.lblLegalEntityDropdownIconHamburger.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
    this.view.flxSegLegalEntityHamburger.setVisibility(false);
    this.view.forceLayout();
  },
  
  toggleLEDropdown1: function (flx, lbl) {
    var segData = this.view.segLegalEntityHamburger.data;
    if (segData.length <= MIN_ENTITIES_RECORDS_TO_ALLOW_SEARCH) {
      this.view.flxLESearchHamburger.isVisible = false;
    } else {
      this.view.flxLESearchHamburger.isVisible = true;
      this.view.tbxLESearchHamburger.text = "";
      this.view.flxLECrossHamburger.isVisible = false;
    }
    if (flx.isVisible) {
      flx.setVisibility(false);
      lbl.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
     this.view.flxLegalEntityDropdownHamburger.accessibilityConfig = {
      a11yLabel : this.view.lblLegalEntityHamburger.text + " " + this.view.lblLegalEntityTextHamburger.text,
      a11yARIA: {
        "role": "button",
        "aria-expanded": false,
        "tabindex": 0
      }
    };
    } else {
      flx.setVisibility(true);
      lbl.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
      this.view.flxLegalEntityDropdownHamburger.accessibilityConfig = {
      a11yLabel : this.view.lblLegalEntityHamburger.text + " " + this.view.lblLegalEntityTextHamburger.text,
      a11yARIA: {
        "role": "button",
        "aria-expanded": true,
        "tabindex": 0
      }
    };
    }
    this.view.forceLayout();
    this.view.flxLegalEntityDropdownHamburger.setActive(true);
  },

  addTermsAndConditionsLegalEntityPopup: function () {
    let currForm = kony.application.getCurrentForm();
    if (!currForm.flxTermsAndConditionsLegalEntity) {
      var flxTermsAndConditionsLegalEntity = new kony.ui.FlexScrollContainer({
        "id": "flxTermsAndConditionsLegalEntity",
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": false,
        "top": "0dp",
        "left": "0dp",
        "width": "100%",
        "height": "100%",
        "isVisible": false,
        "layoutType": kony.flex.FREE_FORM,
        "isModalContainer": true,
        "skin": "ICSknScrlFlx000000OP40",
        "zIndex": 1000,
        "appName": "ResourcesMA"
      }, {}, {});
      flxTermsAndConditionsLegalEntity.setDefaultUnit(kony.flex.DP);
      currForm.add(flxTermsAndConditionsLegalEntity);
    }
    if (!currForm.flxTermsAndConditionsLegalEntity.tandcLegalEntity) {
      var componentTAndCLegalEntity = new com.InfinityOLB.Resources.TermsAndConditionLegalEntity({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "id": "tandcLegalEntity",
        "layoutType": kony.flex.FLOW_VERTICAL,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": true,
        "appName": "ResourcesMA"
      });
      flxTermsAndConditionsLegalEntity.add(componentTAndCLegalEntity);
	  currForm.tandcLegalEntity.doLayout = CommonUtilities.centerPopupFlex;
    }
  },

  showTermsAndConditionsLegalEntityPopup: function (response, seg, flx, lbl, callback) {
    let scope = this;
    if (kony.application.getCurrentForm()) {
      let currForm = kony.application.getCurrentForm();
      if (!currForm.flxTermsAndConditionsLegalEntity || !currForm.flxTermsAndConditionsLegalEntity.tandcLegalEntity) {
        scope.addTermsAndConditionsLegalEntityPopup();
      }
      currForm.tandcLegalEntity.TermsAndConditionBody.text = response && response.termsAndConditionsContent ? response.termsAndConditionsContent : "";
      currForm.tandcLegalEntity.flxClose.setActive(true);
      currForm.tandcLegalEntity.flxClose.onClick = scope.onClickOfCancelTAndCLegalEntity.bind(scope, flx, callback);
      currForm.tandcLegalEntity.btnCancelTAndC.accessibilityConfig = {
		  "a11yLabel": "Reject terms and conditions",
        "a11yARIA": {
          "tabindex": 0
        }
      };
      currForm.tandcLegalEntity.btnCancelTAndC.onClick = scope.onClickOfCancelTAndCLegalEntity.bind(scope, flx, callback);
      currForm.tandcLegalEntity.btnAcceptTAndC.accessibilityConfig = {
		  "a11yLabel": "Accept terms and conditions",
        "a11yARIA": {
          "tabindex": 0
        }
      };
      currForm.tandcLegalEntity.btnAcceptTAndC.onClick = scope.onClickOfAcceptTAndCLegalEntity.bind(scope, seg, flx, lbl, callback);
      currForm.flxTermsAndConditionsLegalEntity.setVisibility(true);
      currForm.forceLayout();
	 // currForm.flxTermsAndConditionsLegalEntity.tandcLegalEntity.lblHeading.setActive(true);
	  currForm.tandcLegalEntity.onKeyPress = this.onKeyPressTnC;
	  kony.application.dismissLoadingScreen();
	  currForm.flxTermsAndConditionsLegalEntity.tandcLegalEntity.lblHeading.setActive(true);
    }
  },

  hideTermsAndConditionsLegalEntityPopup: function () {
    let currForm = kony.application.getCurrentForm();
    currForm.flxTermsAndConditionsLegalEntity.setVisibility(false);
    currForm.remove(currForm.flxTermsAndConditionsLegalEntity);
  },

  onClickOfAcceptTAndCLegalEntity: function (seg, flx, lbl, callback) {
    let scope = this;
    let selectedEntityRowData = seg.selectedRowItems[0];
    let selectedEntityData = seg.data.find(entityData => entityData.id === selectedEntityRowData.id);
    let requestObj = {
      "id": selectedEntityData.id
    };
    scope.hideTermsAndConditionsLegalEntityPopup();
    scope.updateTermsAndConditions(requestObj, callback);
	scope.view.flxLegalEntityDropdown.setActive(true);
  },

  onClickOfCancelTAndCLegalEntity: function (flx, callback) {
    let scope = this;
    flx.setVisibility(false);
    scope.hideTermsAndConditionsLegalEntityPopup();
    callback();
	//scope.view.flxLegalEntityDropdown.setActive(true);
	if (kony.application.getCurrentBreakpoint() == 640) {
			   scope.view.flxLegalEntityDropdownHamburger.setActive(true); 
		   }  else {
			  scope.view.flxLegalEntityDropdown.setActive(true); 
		   };		   
  },

  onKeyPressCallBack: function (eventObject, eventPayload) {
    var scope = this;
    if (eventPayload.keyCode === 27) {
      if(sourceWidget!==null){ 
        sourceWidget.setActive(true);
        sourceWidget=null;
      }
      else if (scope.view.flxHamburgerBack.isVisible === true) {
      if(scope.view.flxSegLegalEntityHamburger.isVisible===true){
        scope.toggleLEDropdown1(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);
        scope.view.flxLegalEntityDropdownHamburger.setActive(true);
      }
      else{
        scope.closeHamburgerMenu();
        scope.view.btnHamburgerNew.setFocus(true);
      }
      }
      else if (scope.view.flxContextualMenu.isVisible === true) {
        scope.openContextualMenu();
        scope.view.flxTransfersAndPay.setActive(true);
      }
      else if(scope.view.flxUserActions.isVisible===true){
        scope.showUserActions();
        scope.view.flxUser.setActive(true);
      }
      else if(scope.view.flxSegLegalEntity.isVisible===true){
        scope.toggleLEDropdown(scope.view.flxSegLegalEntity, scope.view.lblLegalEntityDropdownIcon);
        scope.view.flxLegalEntityDropdown.setActive(true);
      }
    }
    
  },
  
   onKeyPressTnC: function (eventObject, eventPayload) {
			var scope = this;
	   if (eventPayload.keyCode === 27) {
		   if (kony.application.getCurrentBreakpoint() == 640) {
			 let currForm = kony.application.getCurrentForm();
		   if (currForm.flxTermsAndConditionsLegalEntity.isVisible===true) {
			   currForm.flxTermsAndConditionsLegalEntity.setVisibility(false);
			   scope.toggleLEDropdown1(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);
                scope.view.flxLegalEntityDropdownHamburger.setActive(true);  
		   } 
		   } else {
		   let currForm = kony.application.getCurrentForm();
			   currForm.flxTermsAndConditionsLegalEntity.setVisibility(false);
			   scope.toggleLEDropdown(scope.view.flxSegLegalEntity, scope.view.lblLegalEntityDropdownIcon);
              scope.view.flxLegalEntityDropdown.setActive(true);
	   };
	   }
   },

  onLEKeyPressCallback: function (eventObject, eventPayload, context) {
    var scope = this;
    if (eventPayload.keyCode === 9 && context.sectionIndex === 0 && context.rowIndex === context.widgetInfo.data.length - 1 && !eventPayload.shiftKey) {
      scope.toggleLEDropdown(scope.view.flxSegLegalEntity, scope.view.lblLegalEntityDropdownIcon);
      scope.view.flxLegalEntityDropdown.setActive(true);
    }
    if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
      if (context.rowIndex === 0 && context.sectionIndex === 0) {
        scope.toggleLEDropdown(scope.view.flxSegLegalEntity, scope.view.lblLegalEntityDropdownIcon);
        eventPayload.preventDefault();
        scope.view.flxLegalEntityDropdown.setActive(true);
      }
    }
    if (eventPayload.keyCode === 27) {
      scope.toggleLEDropdown(scope.view.flxSegLegalEntity, scope.view.lblLegalEntityDropdownIcon);
      scope.view.flxLegalEntityDropdown.setActive(true);
    }
  },

  onHamLEKeyPressCallback: function (eventObject, eventPayload, context) {
    var scope = this;
    if (eventPayload.keyCode === 9 && context.sectionIndex === 0 && context.rowIndex === context.widgetInfo.data.length - 1 && !eventPayload.shiftKey) {
      scope.toggleLEDropdown1(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);
      scope.view.flxLegalEntityDropdownHamburger.setActive(true);
    }
    if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
      if (context.rowIndex === 0 && context.sectionIndex === 0) {
        scope.toggleLEDropdown1(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);
        eventPayload.preventDefault();
        scope.view.flxLegalEntityDropdownHamburger.setActive(true);
      }
    }
    if (eventPayload.keyCode === 27) {
      scope.toggleLEDropdown1(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);
      scope.view.flxLegalEntityDropdownHamburger.setActive(true);
    }
  },

  isBillPayEnabled: function () {
    var configurationManager = applicationManager.getConfigurationManager();
    if (configurationManager.isMicroAppPresent("BillPayMA") === true)
      return applicationManager.getConfigurationManager().checkUserFeature("BILL_PAY")
    else
      return false;
  },
  isTransfersAndPayEnabled: function () {
    var configurationManager = applicationManager.getConfigurationManager();
    if (configurationManager.isMicroAppPresent("TransfersMA") === true
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
    if (configurationManager.isMicroAppPresent("HomepageMA") === true)
      this.view.flxAccounts.setVisibility(true);
    else
      this.view.flxAccounts.setVisibility(false);
  },
  postShow: function () {
    var scope = this;
    scope.view.flxHamburgerHeader.accessibilityConfig={
      a11yARIA:{
        tabindex:-1
      }
    }
   
    this.view.flxTransfersAndPay.onKeyPress = function(eventobject, eventPayload) {
      if (eventPayload.keyCode === 9) {
          if (eventPayload.shiftKey) {
              scope.view.flxContextualMenu.isVisible = false;
              scope.view.flxTransfersAndPay.accessibilityConfig = {
                  a11yARIA: {
                  "aria-expanded": false,
                  "role": "button",
                  "aria-labelledby": "lblTransferAndPay"
              }
          },
          scope.view.imgLblTransfers.text = "O";
          eventPayload.preventDefault();
              scope.view.flxAccounts.setActive(true);
          }
      }
  },
    this.view.flxLogout.onKeyPress = function(eventObject,eventPayload){
      if(eventPayload.keyCode===9){
        if(eventPayload.shiftKey){
          var widget=scope.view.flxHamburgerMenu.widgets()[scope.view.flxHamburgerMenu.widgets().length-2];
          var subWidget=scope.view.flxHamburgerMenu.widgets()[scope.view.flxHamburgerMenu.widgets().length-1];
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
          scope.view.flxHamburgerHeader.setActive(true);
          }
      }
      if(eventPayload.keyCode===27){
        scope.closeHamburgerMenu();
      }
    }
    var configurationManager = applicationManager.getConfigurationManager();
    this.view.flxMenuRight.setVisibility(false);
    this.view.flxUserActions.left = 945 + this.view.flxMenuContainer.frame.x + "dp";
    var flex_menu_width = 50;
    this.view.btnHamburgerNew.width = flex_menu_width + "dp";
    var flex_accounts_width = 35 + this.view.lblAccounts.frame.width + 60;
    this.view.flxAccounts.width = flex_accounts_width + "dp";
    var flex_transfers_width;
    if (configurationManager.getDeploymentGeography() == "EUROPE") {
      flex_transfers_width = 150 + 80;
      this.view.lblTransferAndPay.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentsAndTransfers");
      // this.view.lblTransferAndPay.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentsAndTransfers");
    } else {
      flex_transfers_width = 50 + this.view.lblTransferAndPay.info.frame.width + 50;
    }
    this.view.flxTransfersAndPay.width = flex_transfers_width + "dp";
    //var left_for_contextual_menu = flex_transfers_width + 1;
    var left_for_contextual_menu = flex_transfers_width;
    left_for_contextual_menu = "-" + left_for_contextual_menu + "dp";
    this.view.flxContextualMenu.left = left_for_contextual_menu;
    this.view.flxContextualMenu.width = flex_transfers_width + "dp";
    this.setupUserProfile();
    if (configurationManager.isFastTransferEnabled == "true") {
      if (this.isTransfersAndPayEnabled()) {
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)
          this.view.flxTransfersAndPay.setVisibility(false);
        else
          this.view.flxTransfersAndPay.setVisibility(true);
      } else {
        this.view.flxTransfersAndPay.setVisibility(false);
      }
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile || !this.isBillPayEnabled()) {
        // this.view.flxSeperatorNew.setVisibility(false);
        this.view.flxMyBills.setVisibility(false);
      }
      else {
        // this.view.flxSeperatorNew.setVisibility(true);
        this.view.flxMyBills.setVisibility(true);
      }
    }
    if (!this.isBillPayEnabled() && !this.isTransfersAndPayEnabled()) {
      // this.view.flxSeperator1.setVisibility(false);
      // this.view.flxSeperatorNew.setVisibility(false);
    }
    if (kony.i18n.getCurrentLocale() === "ar_AE") {
        this.view.lblImageLogout.text = "/";
            }
            else {
              this.view.lblImageLogout.text = "l";
            }
    this.setCustomHeaderLogo();
    this.setHeaderLogo();
    this.view.forceLayout();
    var scope = this;
    this.view.flxTransfersAndPay.accessibilityConfig = {
        a11yARIA: {
          "aria-expanded":false,
          "role": "button",
          "aria-labelledby": "lblTransferAndPay"
        },
      };
      this.view.flxLogout.accessibilityConfig={
        a11yARIA:{
          role:"button",
          "aria-labelledby":this.view.lblLogout.id,
        }
      };
      this.view.lblLogout.accessibilityConfig={
        a11yARIA:{
          tabindex:-1,
        }
      };
      this.view.lblLogoutIcon.accessibilityConfig={
        "a11yHidden":true,
        a11yARIA:{
          tabindex:-1
        }
      }
    this.view.btnLogout.isVisible = true;
    this.view.flxContextualMenu.accessibilityConfig = {
      a11yARIA: {
        "aria-live": "off",
        tabindex: -1,
      },
    } 
    this.view.lblName.accessibilityConfig={
      "a11yARIA":{
        tabindex : -1
      }
    }
    this.view.flxUser.onKeyPress = this.userFocus;
    this.view.flxHamburger.onKeyPress = this.onKeyPressCallBack;
    this.view.flxImgKonyHamburger.onKeyPress = this.onKeyPressCallBack;
    this.view.flxSegLegalEntityHamburger.onKeyPress = this.onKeyPressCallBack;
		this.view.flxSegLegalEntity.onKeyPress  = this.onKeyPressCallBack;
    this.view.flxLegalEntityDropdownHamburger.accessibilityConfig = {
      a11yLabel : this.view.lblLegalEntityHamburger.text + " " + this.view.lblLegalEntityTextHamburger.text,
      a11yARIA: {
        "role": "button",
        "aria-expanded": false,
        "tabindex": 0
      }
    };
    this.view.flxLegalEntityDropdown.accessibilityConfig = {
      a11yLabel : this.view.lblLegalEntity.text + " " + this.view.lblLegalEntityText.text,
      a11yARIA: {
        "role": "button",
        "aria-expanded": false,
        "tabindex": 0
      }
    };
    this.view.btnLogout.onKeyPress = this.settingsFocus;
    this.view.imgKonyHamburger.src="kony_logo.png";
    this.closeTransfers();
  },

  onKeyPressLEHamFlx: function (eventObject, eventPayload, context) {
    var scope = this;
    if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
        if(scope.view.flxSegLegalEntityHamburger.isVisible===true)
        scope.toggleLEDropdown1(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);
    }
    if (eventPayload.keyCode === 27) {
        if(scope.view.flxSegLegalEntityHamburger.isVisible===true){
      scope.toggleLEDropdown1(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);}
      scope.view.flxLegalEntityDropdownHamburger.setActive(true);
    }
  },

  onEntityClick: function () {
    var scope = this; 
    scope.onEntitySwitchInDropdown(scope.view.segLegalEntity, scope.view.flxSegLegalEntity, scope.view.lblLegalEntityText, scope.populateLEList);
  },
  closeTransfers: function() {
    var form = kony.application.getCurrentForm();
    if (form.customheadernew.flxContextualMenu) {
        if (applicationManager.getConfigurationManager().getDeploymentGeography() === "EUROPE") {
            var length = form.customheadernew.flxContextualMenu.widgets().length - 1;
        } else {
            var length = form.customheadernew.flxContextualMenu.widgets().length - 2;
        }
        var firstWidget = form.customheadernew.flxContextualMenu.widgets()[0];
        var widgetlength="";
        var widget = form.customheadernew.flxContextualMenu.widgets()[length];
        widgetlength=length-1;
        if(widget.isVisible===false){
          widget = form.customheadernew.flxContextualMenu.widgets()[length-1];
          widgetlength=length-2;
        }
        var scope = this;
        firstWidget.onKeyPress = function(eventobject, eventPayload) {
          if (eventPayload.keyCode === 9) {
              if (eventPayload.shiftKey) {
                  scope.openContextualMenu();
                  eventPayload.preventDefault();
                  scope.view.flxTransfersAndPay.setActive(true);
              }
          }
          if(eventPayload.keyCode === 27){
          if (applicationManager.getConfigurationManager().getDeploymentGeography() === "EUROPE") {
              scope.openContextualMenu();
              eventPayload.preventDefault();
              scope.view.flxTransfersAndPay.setActive(true);
          } else {
                  scope.openContextualMenu();
                  eventPayload.preventDefault();
                  scope.view.flxMyBills.setActive(true);
          }
      }
      }
        widget.onKeyPress = function(eventobject, eventPayload) {
            if (eventPayload.keyCode === 9 || eventPayload.keyCode === 27) {
                if (eventPayload.shiftKey) {
                    eventPayload.preventDefault();
                    form.customheadernew.flxContextualMenu.widgets()[widgetlength].setActive(true);
                } else {
                    if (applicationManager.getConfigurationManager().getDeploymentGeography() === "EUROPE") {
                        scope.openContextualMenu();
                        eventPayload.preventDefault();
                        scope.view.flxTransfersAndPay.setActive(true);
                    } else {
                        if(eventPayload.keyCode === 27){
                            scope.openContextualMenu();
                    eventPayload.preventDefault();
                    scope.view.flxTransfersAndPay.setActive(true);  
                          }
                          else
                          {
                            scope.openContextualMenu();   
                            eventPayload.preventDefault();
                            scope.view.flxMyBills.setActive(true); 
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
            else{
                eventPayload.preventDefault();
                scope.view.flxUser.setActive(true);
            }
        }
        else{
          eventPayload.preventDefault();
          scope.view.btnHamburgerNew.setActive(true);
        }
    }
    if(eventPayload.keyCode === 27){
        scope.onKeyPressCallBack(eventObject,eventPayload);
    }

},
  userFocus : function(eventObj, eventPayload){
    var scope = this;
    if(eventPayload.keyCode===9){
        if(eventPayload.shiftKey){
          eventPayload.preventDefault();
          scope.view.flxNotifications.setActive(true);
          scope.view.flxUserActions.isVisible = false;
          scope.view.flxUser.accessibilityConfig={
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
          scope.view.flxUser.setActive(true);
        }
  }
  },


  showDashboardScreen: function () {
    if (applicationManager.getUserPreferencesManager().isUserLoggedin()) {
      var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "HomepageMA", "moduleName": "AccountsUIModule" });
      accountsModule.presentationController.showAccountsDashboard();
    }
  },

  setupLogout: function () {
    this.view.flxLogout.onClick = this.showLogout.bind(this,this.view.btnHamburgerNew);
    this.view.lblLogoutIcon.accessibilityConfig = {
      // "a11yLabel": kony.i18n.getLocalizedString("i18n.common.logout") + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Icon"),
      "a11yHidden":true,
      a11yARIA: {
        tabindex: -1,
        
      },
    };
    this.view.lblLogout.accessibilityConfig = {
      "a11yLabel": kony.i18n.getLocalizedString("i18n.common.logout"),
      a11yARIA: {
        tabindex: -1,
      },
    };
    if (TopbarConfig.config.LOGOUT.excludedForms.indexOf(kony.application.getCurrentForm().id) < 0) {
      this.view.btnLogout.text = "";
      this.view.btnLogout.setVisibility(true);
      //this.view.imgLogout.setVisibility(true);
      this.view.btnLogout.onClick = this.showLogout.bind(this,this.view.btnLogout);
    }
  },
  showLogout: function (widgetPath) {
    sourceWidget=widgetPath;
    var scope=this;
    this.view.flxHamburgerBack.isVisible = false;
    var currentForm = kony.application.getCurrentForm();
    if (('flxLogout' in currentForm) && ('flxDialogs' in currentForm)) {
      this.closeHamburgerMenuLogout();
      currentForm.flxDialogs.setVisibility(true);
      currentForm.flxLogout.setVisibility(true);
      if (kony.application.getCurrentForm().id === "frmUTFLanding"){
        this.removeRTFocus();
      }
      currentForm.flxLogout.isModalContainer = true;
      currentForm.flxLogout.accessibilityConfig = {
        "a11yARIA":{
          "tabindex":-1,
        }
      }
      currentForm.flxDialogs.isModalContainer = true;
      currentForm.flxLogout.left = "0%";
      var popupComponent = currentForm.flxLogout.widgets()[0];
      popupComponent.flxCross.isVisible = true;
      popupComponent.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.logout");
      if (kony.application.getCurrentBreakpoint() === 640) {
        popupComponent.flxSeperator2.top = "160dp";
      }
      popupComponent.accessibilityConfig = {
        "a11yARIA": {
          "role": "dialog",
          tabindex: -1,
        }
      }
      popupComponent.lblHeading.accessibilityConfig = {
        "a11yARIA":{
          tabindex:-1,
        }
      }
      popupComponent.lblPopupMessage.accessibilityConfig = {
        "a11yARIA":{
          tabindex:-1,
        }
      }
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
      popupComponent.flxSeperator.accessibilityConfig = {
        "a11yHidden":true,
        "a11yARIA":{
          tabindex:-1,
        }
      }
      popupComponent.flxSeperator2.accessibilityConfig = {
        "a11yHidden":true,
        "a11yARIA":{
          tabindex:-1,
        }
      }
      popupComponent.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.common.LogoutMsg");
      popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
      var scopeObj = this;
      popupComponent.btnYes.onClick = function () {
        FormControllerUtility.showProgressBar(kony.application.getCurrentForm());
        TopbarConfig.config.LOGOUT.onClick();
        currentForm.flxDialogs.isModalContainer = false;
        currentForm.flxDialogs.setVisibility(false);
        currentForm.flxLogout.left = "-100%";
      };
      popupComponent.btnNo.onClick = function () {
        currentForm.flxDialogs.isModalContainer = false;
        currentForm.flxDialogs.setVisibility(false);
        currentForm.flxLogout.left = "-100%";
        currentForm.flxLogout.isVisible = false;
        if(sourceWidget!==null){
          sourceWidget.setActive(true);
          sourceWidget=null;
        }
        if (kony.application.getCurrentForm().id === "frmUTFLanding"){
          scopeObj.setRTIndex();
        }
      }
      popupComponent.flxCross.onClick = function () {
        currentForm.flxDialogs.isModalContainer = false;
        currentForm.flxDialogs.setVisibility(false);
        currentForm.flxLogout.left = "-100%";
        currentForm.flxLogout.isVisible = false;
        if(sourceWidget!==null){ 
          sourceWidget.setActive(true);
          sourceWidget=null;
        }
        if (kony.application.getCurrentForm().id === "frmUTFLanding"){
          scopeObj.setRTIndex();
        }
      }
      popupComponent.lblHeading.setActive(true)
    }
  },
  setupUserActions: function () {
    var scope = this;
    this.view.segUserActions.widgetDataMap = {
      lblSeparator: "lblSeparator",
      lblUsers: "lblUsers",
      btnUsers : "btnUsers",
      flxSegUserActions:"flxSegUserActions"
    };
    var actions = TopbarConfig.config.USER_ACTIONS.filter(function (action) {
      return (!action.isVisible || action.isVisible());
    })
    if (actions.length === 0) {
      this.view.flxUser.setVisibility(true);
      this.view.imgUser.setVisibility(true);
      // this.view.flxSeperator2.setVisibility(true);
    }
    this.view.segUserActions.setData(actions.map(function (configItem) {
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
         "accessibilityConfig": {
           "a11yARIA": {
             "tabindex": 0,
             "role": "link",
             "aria-labelledby":"lblUsers"
           }
         }
       }
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
  setEmailForUserObj: function () {
    var userEntitlementsEmailIds = applicationManager.getUserPreferencesManager().getEntitlementEmailIds();
    for (var i = 0; i < userEntitlementsEmailIds.length; i++) {
      if (userEntitlementsEmailIds[i].isPrimary === "true") {
        return userEntitlementsEmailIds[i].Value;
      }
    }
    return "";
  },
  setupUserProfile: function () {
    var userObject = applicationManager.getUserPreferencesManager().getUserObj();
    var userImageURL = applicationManager.getUserPreferencesManager().getUserImage();
    if (applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === true && userImageURL && userImageURL.trim() != "")
      this.view.imgUser.base64 = userImageURL;
    else
      this.view.imgUser.src = ViewConstants.IMAGES.USER_DEFAULT_IMAGE;
    if (applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === true && userImageURL && userImageURL.trim() != "")
      this.view.CopyimgToolTip0i580d9acc07c42.base64 = userImageURL;
    else
      this.view.CopyimgToolTip0i580d9acc07c42.src = ViewConstants.IMAGES.USER_DEFAULT_IMAGE;
    this.view.lblName.text = (userObject.userlastname === null) ? userObject.userfirstname : (userObject.userfirstname === null) ? userObject.userlastname : userObject.userfirstname + " " + userObject.userlastname;
    this.view.lblUserEmail.text = this.setEmailForUserObj();
    this.view.flxUserActions.isVisible = false;
  },
  setupContextualActions: function () {
    var scope = this;
    var configurationManager = applicationManager.getConfigurationManager();
    if (!this.isTransfersAndPayEnabled() && !this.isBillPayEnabled()) {
      this.view.flxTransfersAndPay.setVisibility(false);
      this.view.imgLblTransfers.setVisibility(false);
      this.view.lblTransferAndPay.setVisibility(false);
    } else {
      this.view.flxTransfersAndPay.onClick = this.openContextualMenu.bind(this);
      this.view.flxTransfersAndPay.onTouchStart = function () {
        //return;
        if (scope.view.flxContextualMenu.isVisible) {
          scope.view.flxTransfersAndPay.origin = true;
          if (kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024) {
            scope.view.flxContextualMenu.isVisible = false;
            scope.view.flxTransfersAndPay.skin = "flxHoverSkinPointer";
            scope.view.imgLblTransfers.text = "O";
          }
        }
      }
      TopbarConfig.config.getContextualMenu().forEach(function (contextualItem) {
        scope.view[contextualItem.widget].setVisibility(!contextualItem.isVisible || contextualItem.isVisible())
        scope.view[contextualItem.widget].onClick = contextualItem.onClick;
      });
      
    }
  },
  openContextualMenu: function () {
    
    var scope = this;

    if (scope.view.flxTransfersAndPay.skin === "sknFlxHeaderTransfersSelected") {
      scope.view.flxTransfersAndPay.skin = "flxHoverSkinPointer";
      scope.view.flxTransfersAndPay.hoverSkin = "flxHoverSkinPointer000000op10";
      this.view.flxTransfersAndPay.accessibilityConfig = {
        a11yARIA: {
          "aria-expanded":false,
          "role": "button",
          "aria-labelledby": "lblTransferAndPay"
        },
      };
      scope.view.imgLblTransfers.text = "O";
    } else {
      scope.view.flxTransfersAndPay.skin = "sknFlxHeaderTransfersSelected";
      this.view.flxTransfersAndPay.accessibilityConfig = {
        a11yARIA: {
          "aria-expanded":true,
          "role": "button",
          "aria-labelledby": "lblTransferAndPay"
        },
      };
      scope.view.imgLblTransfers.text = "P";
    }
    scope.view.showContextualMenu();
  },
  setupHamburger: function () {
    var scope = this;
    this.setItemSelectListener(this.closeHamburgerMenu.bind(this));
    this.view.btnHamburgerNew.onClick = function () {
      scope.openHamburgerMenu();
    }
    this.view.flxHamburgerBack.onClick = this.closeHamburgerMenu.bind(this);
    this.view.flxClose.onClick = this.closeHamburgerMenu.bind(this);
  },
  openHamburgerMenu: function() {
    this.view.flxHamburger.isVisible = true;
    this.view.flxHamburgerBack.isVisible = true;
    this.view.flxHamburger.isModalContainer = true;
    this.showBackFlex();
    if (kony.application.getCurrentForm().id === "frmUTFLanding"){
      this.removeRTFocus();
    }
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
        animationEnd: function() {
            scope.view.forceLayout();
        }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxHamburger.animate(animationDef, animationConfiguration, callbacks);
    this.view.flxClose.setActive(true);
    var frm=kony.application.getCurrentForm();
    if(frm.id==="frmAccountAlertsList"||frm.id==="frmAccountAlertsEdit"||frm.id==="frmAlertCommunication"){
        frm.flxFormContent.height = kony.os.deviceInfo().screenHeight;
        frm.flxFormContent.enableScrolling = false;
    }
    this.view.btnHamburgerNew.accessibilityConfig = {
      "a11yLabel": "Main navigation menu",
      a11yARIA: {
        role : "button",
        tabindex:0,
        "aria-expanded":true //to check with DAC
      },
    }
  },
  closeHamburgerMenuLogout: function() {
    var self = this;
    self.view.flxHamburger.isVisible = false;
    self.view.flxHamburgerBack.isVisible = false;
    if (kony.application.getCurrentForm().id === "frmUTFLanding"){
      this.setRTIndex();
    }
    var animationDefinition = {
        100: {
            "left": "-200.13%"
        }
    };
    var animationConfiguration = {
        duration: 1.5,
        fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
        animationEnd: function() {
            self.hideBackFlex()
        }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxHamburger.animate(animationDef, animationConfiguration, callbacks);
    //this.view.btnHamburgerNew.setFocus(true);
    var frm=kony.application.getCurrentForm();
    if(frm.id==="frmAccountAlertsList"||frm.id==="frmAccountAlertsEdit"||frm.id==="frmAlertCommunication"){
        frm.flxFormContent.height = "100%";
        frm.flxFormContent.enableScrolling = true;
    }
    this.view.btnHamburgerNew.accessibilityConfig = {
      "a11yLabel": "Main navigation menu",
      a11yARIA: {
        role : "button",
        tabindex:0,
        "aria-expanded":false
      },
    }
  },
  closeHamburgerMenu: function() {
    var self = this;
    self.view.flxHamburger.isVisible = false;
    self.view.flxHamburgerBack.isVisible = false;
    if (kony.application.getCurrentForm().id === "frmUTFLanding"){
      this.setRTIndex();
    }
    var animationDefinition = {
        100: {
            "left": "-200.13%"
        }
    };
    var animationConfiguration = {
        duration: 1.5,
        fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
        animationEnd: function() {
            self.hideBackFlex()
        }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxHamburger.animate(animationDef, animationConfiguration, callbacks);
    this.view.btnHamburgerNew.setFocus(true);
    var frm=kony.application.getCurrentForm();
    if(frm.id==="frmAccountAlertsList"||frm.id==="frmAccountAlertsEdit"||frm.id==="frmAlertCommunication"){
        frm.flxFormContent.height = "100%";
        frm.flxFormContent.enableScrolling = true;
    }
    this.view.btnHamburgerNew.accessibilityConfig = {
      "a11yLabel": "Main navigation menu",
      a11yARIA: {
        role : "button",
        tabindex:0,
        "aria-expanded":false
      },
    }
  },
  removeRTFocus: function(){
    elementsToSearch = ["LearnMore1","LearnMore2","LearnMore3","LearnMore4"];
    elementsToSearch.forEach(ele=>{
      let learnMore = document.getElementById(ele);
      if (learnMore !== null) {
        learnMore.tabIndex = -1;
      }
    })
  },
  setRTIndex: function () {
    elementsToSearch = ["LearnMore1","LearnMore2","LearnMore3","LearnMore4"];
    elementsToSearch.forEach(ele=>{
      let learnMore = document.getElementById(ele);
      if (learnMore !== null) {
        learnMore.tabIndex = 0;
      }
    })
  },
  showBackFlex: function () {
    this.view.flxHamburgerBack.height = getTotalHeight() + "px";
    this.view.flxHamburger.height = getTotalHeight() + "px";
    this.view.flxScroll.height = getTotalHeight()-60 + "px";
    this.view.flxHamburgerBack.isVisible = true;
    this.view.flxHamburger.isVisible = true;
    this.view.forceLayout();
  },
  hideBackFlex: function () {
    this.view.flxHamburgerBack.isVisible = false;
    this.view.flxHamburger.isVisible = false;
    this.view.forceLayout();
  },
  showUserActions: function () {
      if(this.view.flxUserActions.isVisible === false){
        this.view.flxUser.accessibilityConfig={
            a11yLabel : "Profile",
            a11yARIA:{
                tabindex : 0,
                role : "button",
                "aria-expanded" : true
            }
        }
    }
    else{
        this.view.flxUser.accessibilityConfig={
            a11yLabel : "Profile",
            a11yARIA:{
                tabindex : 0,
                role : "button",
                "aria-expanded" : false
            }
        }
    }
    if (this.view.flxMenuContainer.info.frame.x == 0) {
      this.view.flxUserActions.left = -410 + this.view.flxMenuWrapper.info.frame.width + "dp";
      if (kony.application.getCurrentBreakpoint() == 1024 || orientationHandler.isTablet) {
        this.view.flxUserActions.left = -365 + this.view.flxMenuWrapper.info.frame.width + "dp";
      }
    } else {
      this.view.flxUserActions.left = 945 + this.view.flxMenuWrapper.info.frame.x + "dp";
    }
    if (this.view.flxUserActions.isVisible === false) {
      this.view.flxUserActions.isVisible = true;
      this.view.flxUser.setActive(true);
    } else {
      this.view.flxUserActions.isVisible = false;
      this.view.flxUser.setActive(true);
    }
  },
  forceCloseHamburger: function () {
    this.hideBackFlex();
    this.view.flxHamburger.left = "-200%";
    this.view.forceLayout();
    this.view.btnHamburgerNew.setFocus(true);
  },

  setHoverSkins: function () {
    var currForm = kony.application.getCurrentForm().id;
    this.view.imgKony.cursorType = "pointer";
    this.setDefaultHoverSkins();
    this.view.flxContextualMenu.isVisible = false;
    this.view.imgLblTransfers.text = "O";
    this.setDefaultSkins();
    try {
      if (currForm === 'frmAccountsDetails' || currForm === 'frmAccountsLanding' || currForm === 'frmBBAccountsLanding' || currForm === 'frmExternalAccounts' || currForm === 'frmDashboard'){
        this.view.flxAccounts.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
       currForm.view.flxAccounts.accessibilityConfig = {
          a11yARIA:{
             role: "link",
            "aria-current":true
          }
        };
    }
      else if (currForm === 'frmTransfers' || currForm === 'frmPayAPerson' || currForm === 'frmWireTransfer' || currForm === 'frmAcknowledgement' || currForm === 'frmConfirm' || currForm === 'frmVerifyAccount')
        this.view.flxTransfersAndPay.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
      else if (currForm === 'frmCustomerFeedback' || currForm === 'frmCustomerFeedbackSurvey') {
        this.view.flxFeedback.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.flxFeedback.skin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.lblFeedback.skin = "sknLblffffff15pxSSP";
      } else if (currForm === 'frmOnlineHelp')
        this.view.flxHelp.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
      else if (kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "BillPayMA", "moduleName": "BillPaymentUIModule" }).moduleConfig.Forms.desktop[currForm]) {
        this.view.flxMyBills.skin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.flxMyBills.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.flxTransfersAndPay.skin = "slFbox";
      }
      else if (kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "RegionalTransferMA", "moduleName": "TransferFastUIModule" }).moduleConfig.Forms.desktop[currForm] || kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "RegionalTransferMA", "moduleName": "TransferEurUIModule" }).moduleConfig.Forms.desktop[currForm]) {
        this.view.flxMyBills.skin = "slFbox";
        this.view.flxAccounts.skin = "slFbox";
        this.view.flxTransfersAndPay.skin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.flxTransfersAndPay.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
      }
    }
    catch (err) { }
  },
  setDefaultHoverSkins: function () {
    this.view.flxAccounts.hoverSkin = "flxHoverSkinPointer000000op10";
    this.view.flxTransfersAndPay.hoverSkin = "flxHoverSkinPointer000000op10";
    this.view.flxMyBills.hoverSkin = "flxHoverSkinPointer000000op10";
  },
  setDefaultSkins: function () {
    this.view.flxMyBills.skin = "flxHoverSkinPointer";
  },
  onBreakpointChangeComponent: function (width) {
    if (width === undefined || width === null || typeof (width) === "object") {
      width = kony.application.getCurrentBreakpoint();
    }
    var scope = this;

    this.setLayoutProperties(width);
    this.view.flxUserActions.setVisibility(false);
    this.view.lblHeaderMobile.setVisibility(false);

    if (this.isPreLoginView) {
      this.showPreLoginView();
    } else {
      this.showPostLoginView();
    }
    if (kony.i18n.getCurrentLocale() === "ar_AE") {
            if (kony.application.getCurrentBreakpoint() >= 1024 || orientationHandler.isTablet || orientationHandler.isDesktop)
              {
                this.view.flxUser.right = "37dp"
            }
        }
      else {
        this.view.flxUser.right = "73dp"  
      } 

    if (width === 640 || orientationHandler.isMobile) {
      scope.view.flxHamburger.width = "90%";
      scope.view.imgKonyHamburger.isVisible = true;
      this.view.lblHeaderMobile.setVisibility(true);
      this.view.flxShadowContainer.setVisibility(false);
    } else if (width === 1024 || width === 768 || orientationHandler.isTablet) {
      scope.view.flxHamburger.width = "60%";
      scope.view.imgKonyHamburger.isVisible = true;
    } else {
      if (width === 1366) {
        scope.view.flxHamburger.width = "500dp";
      }
      else {
        scope.view.flxHamburger.width = "28%";
      }
      scope.view.imgKonyHamburger.isVisible = true;
    }
    if (width == 640 || orientationHandler.isMobile) {
      this.view.flxTransfersAndPay.onClick = null;
    } else {
      this.view.flxTransfersAndPay.onClick=this.openContextualMenu.bind(this);
      }
      str = kony.i18n.getCurrentLocale();
      if (str === "ar_AE") {
        this.view.lblImageLogout.text = "/";
        this.view.lblLogoutIcon.text = "/";
        this.view.btnHamburgerNew.skin="btnHamburgerRtlskn";
      } else {
        this.view.lblImageLogout.text = "l";
        this.view.lblLogoutIcon.text = "l";
        this.view.btnHamburgerNew.skin="btnHamburgerskn";

    }

    let singleEntityValue = "true";
    if (applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity") !== undefined) {
      singleEntityValue = applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity");
    }
    let userLegalEntitesSize = applicationManager.getMultiEntityManager().getUserLegalEntitiesSize();
    if (singleEntityValue === "false") {
      this.view.flxLegalEntity.setEnabled(true);
      this.view.flxLegalEntityHamburger.setEnabled(true);
      if (userLegalEntitesSize > 0) {
        if (kony.application.getCurrentBreakpoint() === 640) {
          this.view.flxLegalEntity.setVisibility(false);
          this.view.flxLegalEntityHamburger.setVisibility(true);
          // this.view.flxVerticalSeperator4.setVisibility(false);
        } else {
          this.view.flxLegalEntity.setVisibility(true);
          this.view.flxLegalEntityHamburger.setVisibility(false);
          // this.view.flxVerticalSeperator4.setVisibility(true);
        }
        if (userLegalEntitesSize === 1) {
          this.view.flxLegalEntity.setEnabled(false);
          this.view.flxLegalEntityHamburger.setEnabled(false);
        }
      } else {
        this.view.flxLegalEntity.setVisibility(false);
        this.view.flxLegalEntityHamburger.setVisibility(false);
        // this.view.flxVerticalSeperator4.isVisible = false;
      }
    } else {
      this.view.flxLegalEntity.setVisibility(false);
      this.view.flxLegalEntityHamburger.setVisibility(false);
      // this.view.flxVerticalSeperator4.isVisible = false;
    }
    this.view.flxHamburgerBack.height = getTotalHeight() + "px";
    this.view.flxHamburger.height = getTotalHeight() + "px";
    this.view.flxScroll.height = getTotalHeight()-60 + "px";
    if(kony.application.getCurrentBreakpoint()===640){
      this.view.flxClose.left="90%";
    }
    else{
      this.view.flxClose.left="92%";
    }
  },
  setLayoutProperties: function (width) {
    if (width == 640 || orientationHandler.isMobile) {
      this.view.height = "50dp";
      this.view.parent.height = "50dp";
      this.view.flxLogoAndActionsWrapper.width = "100%";
      this.view.flxMenuWrapper.width = "100%";
      this.view.flxLogoAndActions.isVisible = false;
      this.view.flxMenuContainer.top = "0dp";
      this.view.lblHeaderMobile.isVisible = true;
      this.view.flxMenuLeft.left = "10dp";
      this.view.flxMenuRight.isVisible = false;
      this.view.flxAccounts.isVisible = false;
      // this.view.flxSeperator1.isVisible = false;
      this.view.flxTransfersAndPay.isVisible = false;
      this.view.flxContextualMenu.isVisible = false;
    } else if (width == 1024 || orientationHandler.isTablet) {
      this.view.height = "120dp";
      this.view.parent.height = "120dp";
      this.view.flxLogoAndActionsWrapper.width = "100%";
      this.view.flxMenuWrapper.width = "100%";
      this.view.flxLogoAndActions.isVisible = true;
      this.view.flxMenuContainer.top = "70dp";
      this.view.lblHeaderMobile.isVisible = false;
      this.view.flxMenuRight.isVisible = false;
      this.view.flxAccounts.isVisible = true;
      // this.view.flxSeperator1.isVisible = true;
      this.view.flxTransfersAndPay.isVisible = true;
      this.view.flxContextualMenu.isVisible = false;
      this.view.flximgKony.left = "20dp";
      this.view.flxActionsMenu.right = "15dp";
      this.view.flxMenuLeft.left = "17dp";
      this.view.flxMenuRight.right = "22dp";
      this.view.flxMenuRight.width = "40%";

      this.view.flxFeedback.right = "-4%";
      this.view.flxFeedback.width = "130dp";
      this.view.lblFeedback.right = "0px";
      this.view.flxverseperator2.left = "17dp"
      this.view.flxHelp.right = "114dp";
      this.view.flxHelp.width = "50dp";
      this.view.lblHelp.centerx = "50%";
      this.view.lblHelp.centerX = "50%";

    } else if (width == 1366 && orientationHandler.isDesktop) {
      this.view.flxLogout.width = "87.09%";
      this.view.flxLogout.centerX = "50%";
      this.view.height = "120dp";
      this.view.parent.height = "120dp";
      this.view.flxLogoAndActionsWrapper.width = "100%";
      this.view.flxMenuWrapper.width = "100%";
      this.view.flxLogoAndActions.isVisible = true;
      this.view.flxMenuContainer.top = "70dp";
      this.view.lblHeaderMobile.isVisible = false;
      this.view.flxMenuRight.isVisible = false;
      this.view.flxAccounts.isVisible = true;
      // this.view.flxSeperator1.isVisible = true;
      this.view.flxTransfersAndPay.isVisible = true;
      this.view.flxContextualMenu.isVisible = false;
      this.view.flximgKony.left = "83dp";
      this.view.flxMenuRight.width = "30%";
      this.view.flxActionsMenu.right = "71dp";
      this.view.flxMenuLeft.left = "78dp";
      this.view.flxMenuRight.right = "55dp";
      this.view.flxHamburger.width = "500dp";
      this.view.flxFeedback.right = "-4%";
      this.view.flxFeedback.width = "130dp";
      this.view.lblFeedback.right = "0px";
      this.view.flxverseperator2.left = "17dp"
      this.view.flxHelp.right = "114dp";
      this.view.flxHelp.width = "50dp";
      this.view.lblHelp.centerx = "50%";
      this.view.lblHelp.centerX = "50%";
    } else {
      this.view.flxLogout.width = "87.09%";
      this.view.flxLogout.centerX = "50%";
      this.view.height = "120dp";
      this.view.parent.height = "122dp";
      this.view.flxLogoAndActionsWrapper.width = "1366dp";
      this.view.flxMenuWrapper.width = "1366dp";
      this.view.flxLogoAndActions.isVisible = true;
      this.view.flxMenuContainer.top = "70dp";
      this.view.lblHeaderMobile.isVisible = false;
      this.view.flxMenuRight.isVisible = false;
      this.view.flxAccounts.isVisible = true;
      // this.view.flxSeperator1.isVisible = true;
      this.view.flxTransfersAndPay.isVisible = true;
      this.view.flxContextualMenu.isVisible = false;
      this.view.flximgKony.left = "83dp";
      this.view.flxActionsMenu.right = "76dp";
      this.view.flxMenuRight.width = "30%"
      this.view.flxMenuLeft.left = "78dp";
      this.view.flxMenuRight.right = "70dp";

      this.view.flxFeedback.right = "-4%";
      this.view.flxFeedback.width = "130dp";
      this.view.lblFeedback.right = "0px";
      this.view.flxverseperator2.left = "17dp"
      this.view.flxHelp.right = "114dp";
      this.view.flxHelp.width = "50dp";
      this.view.lblHelp.centerx = "50%";
      this.view.lblHelp.centerX = "50%";
    }
  },
  setHeaderLogo: function () {
    var configurationManager = applicationManager.getConfigurationManager();
    if (configurationManager.isSMEUser === "true") {
      // this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.SME;
      this.setHeaderLogoResponsiveForSMEandMBB();
    }
    else if (configurationManager.isMBBUser === "true") {
      // this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.MBB;
      this.setHeaderLogoResponsiveForSMEandMBB();
    }
    // else if (configurationManager.isRBUser === "true") this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.RB;
    // else this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.GENERIC;
  },
  setHeaderLogoResponsiveForSMEandMBB: function () {
    var width = kony.application.getCurrentBreakpoint();
    var orientationHandler = new OrientationHandler();

    if (orientationHandler.isDesktop) {
      if (width === 1366) {
        this.view.flximgKony.width = "100dp";
        this.view.flximgKony.left = "83dp";
      }
      else if (width === 1380 || width === constants.BREAKPOINT_MAX_VALUE) {
        this.view.flximgKony.width = "100dp";
        this.view.flximgKony.left = "83dp";
      }
    }
    else if (orientationHandler.isTablet) {
      if (width === 1024) {
        this.view.flximgKony.width = "100dp";
        this.view.flximgKony.left = "20dp";
      }
      else if (width === 1366) {
        this.view.flximgKony.width = "100dp";
        this.view.flximgKony.left = "83dp";
      }
      else if (width === 1380 || width === constants.BREAKPOINT_MAX_VALUE || width > 1380) {
        this.view.flximgKony.width = "100dp";
        this.view.flximgKony.left = "83dp";
      }
    }
  },
  showPreLoginView: function () {
    this.isPreLoginView = true;

    if (orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640) {
      this.view.flxMenuContainer.setVisibility(true);
      this.view.flxMenuWrapper.setVisibility(false);
    } else {
      this.view.height = "70dp";
      this.view.flxMenuContainer.setVisibility(false);
      this.view.flxShadowContainer.top = "70dp";
      this.view.flxNotifications.isVisible = false;
      this.view.flxMessages.isVisible = false;
      // this.view.flxSeperator1.isVisible = false;
      this.view.flxUser.isVisible = true;
      // this.view.btnLogout.toolTip = kony.i18n.getLocalizedString("i18n.common.login");
      this.view.btnLogout.setVisibility(true);
      this.view.imgLogout.src = "login_icon_locateus.png";
      this.view.flxWarning.setVisibility(true);
    }
  },
  showPostLoginView: function () {
    var configurationManager = applicationManager.getConfigurationManager();
    var isRetailUser = applicationManager.getConfigurationManager().getConfigurationValue('isRBUser') === "true";
    this.isPreLoginView = false;

    if (orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640) {
      this.view.flxMenuContainer.setVisibility(true);
      this.view.flxMenuWrapper.setVisibility(true);
    } else {
      this.view.height = "120dp";
      this.view.flxMenuContainer.setVisibility(true);
      this.view.flxShadowContainer.top = "120dp";
      this.view.flxNotifications.isVisible = configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE);
      if (isRetailUser) {
        // this.view.flxVerticalSeperator3.isVisible = configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE);
        this.view.flxMessages.isVisible = configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE);
        if (this.view.flxMessages.isVisible)
          this.view.flxMessages.right = "210dp";
      }
      // this.view.flxSeperator1.isVisible = configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE);
      this.view.flxUser.isVisible = true;
      //this.view.btnLogout.toolTip = kony.i18n.getLocalizedString("i18n.common.logout");
      //this.view.imgMessages.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Message");
      // this.view.lblNotifications.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts");
      this.view.btnLogout.setVisibility(true);
      this.view.imgLogout.src = "logout.png";
      this.view.flxWarning.setVisibility(false);
    }
  },

  setMessageBadgeSize: function () {
    var numberOfMessages = parseInt(this.view.lblNewNotifications.text);
    if (numberOfMessages <= 99) {
      this.view.lblNewNotifications.width = "15dp";
      this.view.lblNewNotifications.height = "15dp";
    } else {
      this.view.lblNewNotifications.width = "20dp";
      this.view.lblNewNotifications.height = "20dp";
    }
  },
  updateAlertIcon: function () {
    //this.view.lblNewNotifications.setVisibility(false);
    var unreadCount = applicationManager.getConfigurationManager().getUnreadMessageCount();
    if (unreadCount.count > 0) {
      this.view.imgNotifications.src = ViewConstants.IMAGES.NOTIFICATION_FLAG;
      this.view.lblNewNotifications.setVisibility(true);
      this.view.flxNotifications.accessibilityConfig = {
        "a11yLabel": "Alerts - New notifications available",
        "a11yARIA": {
            role: "button",
        }
    };
    } else {
      this.view.imgNotifications.src = ViewConstants.IMAGES.NOTIFICATION_ICON;
      this.view.lblNewNotifications.setVisibility(false);
      this.view.flxNotifications.accessibilityConfig = {
        "a11yLabel": "Alerts",
        "a11yARIA": {
            role: "button",
        }
    };
    }
  },

  navigateToBillPay: function () {
    this.view.flxContextualMenu.isVisible = false;
    this.view.btnHamburgerNew.skin = "btnHamburgerskn"
    this.view.flxAccounts.skin = "slFbox";
    this.view.flxTransfersAndPay.skin = "sknFlxFFFFFbrdr3343a8";
    this.view.forceLayout();
  },
  showContextualMenu: function () {
    var configurationManager = applicationManager.getConfigurationManager();
    if (this.view.flxTransfersAndPay.origin) {
      this.view.flxTransfersAndPay.origin = false;
      this.view.flxTransfersAndPay.skin = "flxHoverSkinPointer";
      this.view.imgLblTransfers.text = "O";
      return;
    }
    if (this.view.flxContextualMenu.isVisible === true) {
      this.view.flxTransfersAndPay.skin = "flxHoverSkinPointer";
      this.view.flxContextualMenu.isVisible = false;
      this.view.imgLblTransfers.text = "O";
      this.view.forceLayout();
    } else {
      this.view.flxContextualMenu.isVisible = true;
      this.view.flxTransfersAndPay.skin = "sknFlxHeaderTransfersSelected";
      this.view.imgLblTransfers.text = "P";
      this.view.forceLayout();
    }
    this.view.flxPayMultipleBeneficiaries.isVisible = false;
    if (configurationManager.isFastTransferEnabled == "true") {
      if (this.isTransfersAndPayEnabled()) {
        this.view.Label0dcf00103bdba46.text = kony.i18n.getLocalizedString("i18n.hamburger.transfer");
        this.view.Label0dcf00103bdba46.toolTip = kony.i18n.getLocalizedString("i18n.hamburger.transfer");
        this.view.CopyLabel0bb648d916e554d.text = kony.i18n.getLocalizedString("i18n.Transfers.TRANSFERACTIVITIES");
        this.view.CopyLabel0bb648d916e554d.toolTip = kony.i18n.getLocalizedString("i18n.Transfers.TRANSFERACTIVITIES");
        this.view.CopyLabel0a8b12f7002084d.text = kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient");
        this.view.CopyLabel0a8b12f7002084d.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient");
        this.view.CopyLabel0h9e71b8a76ad44.text = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient");
        this.view.CopyLabel0h9e71b8a76ad44.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient");
      }

    }
    if (configurationManager.getDeploymentGeography() == "EUROPE") {
      this.view.Label0dcf00103bdba46.text = kony.i18n.getLocalizedString("i18n.TransfersEur.MakePayment");
      this.view.Label0dcf00103bdba46.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.MakePayment");
      this.view.CopyLabel0bb648d916e554d.text = kony.i18n.getLocalizedString("i18n.TransfersEur.TransferBetweenAccounts");
      this.view.CopyLabel0bb648d916e554d.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.TransferBetweenAccounts");
      this.view.CopyLabel0a8b12f7002084d.text = kony.i18n.getLocalizedString("i18n.TransfersEur.ManageBeneficiaries");
      this.view.CopyLabel0a8b12f7002084d.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.ManageBeneficiaries");
      this.view.CopyLabel0h9e71b8a76ad44.text = kony.i18n.getLocalizedString("i18n.TransfersEur.ManageTransactions");
      this.view.CopyLabel0h9e71b8a76ad44.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.ManageTransactions");
      this.view.lblPayMultipleBeneficiaries.text = kony.i18n.getLocalizedString("i18n.Transfers.PayMultipleBeneficiaries");
      this.view.lblPayMultipleBeneficiaries.toolTip = kony.i18n.getLocalizedString("i18n.Transfers.PayMultipleBeneficiaries");
      let accessibleCustomerIds = applicationManager.getUserPreferencesManager().accessibleCustomerIds;
      var isBusiness = false;
      for (var i = 0; i < accessibleCustomerIds.length; i++) {
          if (accessibleCustomerIds[i].type === "business") {
              isBusiness = true;
          }
      }
      if (isBusiness == true) this.view.flxPayMultipleBeneficiaries.isVisible = false;
      else this.view.flxPayMultipleBeneficiaries.isVisible = true;
    }
    this.view.flxTransferMoney.accessibilityConfig = {
      // "a11yLabel": this.view.Label0dcf00103bdba46.text,
      a11yARIA: {
        // tabindex: -1,
        role : "link"
      },
    }
    this.view.flxPayBills.accessibilityConfig = {
      // "a11yLabel": this.view.CopyLabel0bb648d916e554d.text,
      a11yARIA: {
        // tabindex: -1,
        role : "link"
      },
    }
    this.view.flxSendMoney.accessibilityConfig = {
      // "a11yLabel": this.view.CopyLabel0a8b12f7002084d.text,
      a11yARIA: {
        // tabindex: -1,
        role : "link"
      },
    }
    this.view.flxWireMoney.accessibilityConfig = {
      // "a11yLabel": this.view.CopyLabel0h9e71b8a76ad44.text,
      a11yARIA: {
        // tabindex: -1,
        role : "link"
      },
    }
    this.view.flxPayMultipleBeneficiaries.accessibilityConfig = {
      a11yARIA: {
        role : "link"
      },
    }
    this.closeTransfers();
  },

  navigateToTransfers: function () {
    this.view.flxContextualMenu.isVisible = false;
    this.view.btnHamburgerNew.skin = "btnHamburgerskn";
    this.view.flxAccounts.skin = "slFbox";
    this.view.flxTransfersAndPay.skin = "sknFlxFFFFFbrdr3343a8";
    this.view.forceLayout();
  },
  navigatetoAccounts: function () {
    this.view.btnHamburgerNew.skin = "btnHamburgerskn";
    this.view.flxAccounts.skin = "sknFlxFFFFFbrdr3343a8";
    this.view.flxTransfersAndPay.skin = "copyslfbox1";
    this.view.forceLayout();
  },
  setItemSelectListener: function (listener) {
    onItemSelectListener = listener;
  },

  /**
   * Activates the menu
   * @param {string} parentId of parent menu
   * @param {string} childId of parent menu
   */
  activateMenu: function (parentId, childId) {
    if (!this.initialized) {
      this.actiavteWhenInitialized = {
        parentId: parentId,
        childId: childId
      }
      return;
    }
    var parentIndex = 0;
    var menuObject = null;
    var visibleIndex = 1;  //One as offset for sample widget 
    HamburgerConfig.config.forEach(function (menuItem) {
      if (!menuItem.isVisible || menuItem.isVisible()) {
        if (menuItem.id.toLowerCase() === parentId.toLowerCase()) {
          parentIndex = visibleIndex;
          menuObject = menuItem;
        }
        visibleIndex++;
      }
    });
    if (menuObject) {
      this.activeMenu = menuObject.id;
      var childIndex = -1;
      var visibleChildIndex = 1;  //One as offset for sample widget 
      var children = this.view[MENU_CONTAINER].widgets();
      this.collapseAll();
      this.resetSkins();
      this.expandWithoutAnimation(children[parentIndex * 2 + 1]);
      children[parentIndex * 2].widgets()[2].widgets()[0].src = "chevron_up.png";
      children[parentIndex * 2].widgets()[2].widgets()[0].accessibilityConfig = {
        // "a11yLabel": "Collapse " + menuObject.id + " Menu",
        "a11yHidden" : true,
        a11yARIA : {
          tabindex : -1
        }
      };
      if (menuObject.id === "Exchange Rates") {
        children[parentIndex * 2].widgets()[2].widgets()[0].accessibilityConfig = {
          "a11yLabel": "",
          a11yARIA : {
            tabindex : -1
          }
        }
      }
      if (menuObject.subMenu.children.length === 0) {
        children[parentIndex * 2].widgets()[2].widgets()[0].src = "right_arrow.png";
        // children[parentIndex * 2].widgets()[2].widgets()[0].width = "11dp";
        // children[parentIndex * 2].widgets()[2].widgets()[0].height = "12dp";
        children[parentIndex * 2].widgets()[2].widgets()[0].width = "8dp";
        children[parentIndex * 2].widgets()[2].widgets()[0].height = "13dp";
      }
      if (childId) {
        var childObject = null;
        menuObject.subMenu.children.forEach(function (childItem) {
          if (!childItem.isVisible || childItem.isVisible()) {
            if (childItem.id.toLowerCase() === childId.toLowerCase()) {
              childIndex = visibleChildIndex;
              childObject = childItem;
            }
            visibleChildIndex++;
          }
        });
        if (childObject) {
          children[parentIndex * 2 + 1].widgets()[childIndex].skin = "skncursor";
          children[parentIndex * 2 + 1].widgets()[childIndex].hoverSkin = "skncursor";
          children[parentIndex * 2 + 1].widgets()[childIndex].widgets()[0].skin = "sknLblHamburgerSelected";
          children[parentIndex * 2 + 1].widgets()[childIndex].accessibilityConfig = {
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "link",
                                "aria-current": true
                            }
                        };
        }
      }
    }

  },

  expandWithoutAnimation: function (widget) {
    widget.height = (widget.widgets().length - 1) * 60;
    // widget.isVisible = true;
    this.view.forceLayout();
  },

  resetSkins: function () {
    var subMenus = this.view[MENU_CONTAINER].widgets().filter(function (child, i) {
      return i % 2 !== 0;
    })

    subMenus.forEach(function (subMenu) {
      subMenu.widgets().forEach(function (subMenuItem) {
        subMenuItem.skin = "skncursor";
        subMenuItem.hoverSkin = "sknFlxHoverHamburger";
        subMenuItem.widgets()[0].skin = "sknLblHamburgerUnSelected";
      })
    })

  },

  /**
   * Generate prefix by removing whitespace
   * @param {string} id Id of ite,
   * @returns {string} id with whitespace removed
   */
  getPrefix: function (id) {
    return id.replace(/ /g, '')
  },

  /**
   * Toggles the sub menu
   * @param {kony.ui.FlexContainer} widget Submenu widget to toggle 
   * @param {kony.ui.FlexContainer} imgArrow imgArrow to toggle
   */
  toggle: function (widget, imgArrow ,parentWidget) {
    var menuText = widget.id.split("flx")[0];
    if (imgArrow.src !== "dropdown_expand.png") {
      this.collapseAll();
      imgArrow.src = "dropdown_expand.png";
      //imgArrow.toolTip = "Expand";
      imgArrow.accessibilityConfig = {
        //"a11yLabel": "Expand " + menuText + " Menu",
        "a11yHidden" : true,
        a11yARIA: {
          // "aria-expaned":false,
          tabindex: -1
          }
      };
      if(imgArrow.src !== "right_arrow.png"){
      parentWidget.accessibilityConfig = {
        //"a11yHidden" : true,
        "a11yARIA":{
          role:"button",
          "aria-expanded" : false,
            "aria-labelledby":parentWidget.widgets()[1].id,
        }
      };
    }
      if (menuText === "Exchange Rates") {
        imgArrow.accessibilityConfig = {
          "a11yLabel": "",
          a11yARIA: {
            tabindex: -1,
            }
        }
      }
    } else {
      this.collapseAll(this.activeMenu);
      //if(imgArrow.src === "dropdown_expand.png"){
      this.activeMenu = menuText;
      imgArrow.src = "chevron_up.png";
      //imgArrow.toolTip = "Collapse";
      imgArrow.accessibilityConfig = {
        // "a11yLabel": "Collapse " + menuText + " Menu",
        "a11yHidden" : true,
        a11yARIA: {
          // "aria-expanded":true,
          tabindex: -1
          },
      };
      parentWidget.accessibilityConfig = {
        //"a11yHidden" : true,
        "a11yARIA":{
          role:"button",
          "aria-expanded" : true,
            "aria-labelledby":parentWidget.widgets()[1].id,
        }
      };
      if (menuText === "Exchange Rates") {
        imgArrow.accessibilityConfig = {
          "a11yLabel": "",
          a11yARIA: {
            tabindex: -1,
            },
        };
      }
      this.view.forceLayout();
      // }
      this.expand(widget);
    }
    this.view.forceLayout();
  },

  /**
   * Collapses the subMenu
   * @param {kony.ui.FlexContainer} widget Submenu widget to expand
   */
  expand: function (widget) {
    widget.isVisible=true;
    var scope = this;
    var animationDefinition = {
      100: {
        "height": (widget.widgets().length - 1) * 60
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
      animationEnd: function () {
        // scope.checkLogoutPosition();
        widget.widgets()[0].setFocus(true);
        scope.view.forceLayout();
      }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    widget.animate(animationDef, animationConfiguration, callbacks);
  },

  /**
   * Collapse All the sub menu items
   */
  collapseAll: function (menuText) {
    var self = this;
    var menuItems = this.view[MENU_CONTAINER].widgets();
    menuItems.forEach(function (menuItem, i) {
      if (i % 2 !== 0) {
        self.collapseWithoutAnimation(menuItem);
        var imageWidget = menuItems[i - 1].widgets()[2].widgets()[0];
        var parentWidget = menuItems[i - 1];
        if(imageWidget.src !== "right_arrow.png"){
          parentWidget.accessibilityConfig = {
            "a11yARIA": {
              role: "button",
              "aria-expanded": false,
              "aria-labelledby": parentWidget.widgets()[1].id,
            }
          };
        }
        if (imageWidget.src === "chevron_up.png") {
          imageWidget.src = "dropdown_expand.png";
          //imageWidget.toolTip = "Expand";
          if (menuText !== undefined) {
            imageWidget.accessibilityConfig = {
              // "a11yLabel": "Expand " + menuText + " Menu",
              "a11yHidden":true,
              a11yARIA: {
                tabindex: -1,
                },
            };
          }
          if (menuText === "Exchange Rates") {
            imageWidget.accessibilityConfig = {
              "a11yLabel": "",
              a11yARIA: {
                tabindex: -1,
                },
            }
          }
          //                      imageWidget.accessibilityConfig = {
          //                     "a11yLabel" :  "Expand Menu"
          //                 };
        }

      }

    })
    self.view.forceLayout();
  },

  /**
   * Collapse the submenu item
   * @param {kony.ui.FlexContainer} widget submenu flex to collapse
   */
  collapseWithoutAnimation: function (widget) {
    widget.height = 0;
    widget.isVisible = false;
    this.view.forceLayout();
  },

  /**
   * Generates View of the menu dynamically
   */
  generateMenu: function () {
    var self = this;
    let widgets = this.view[MENU_CONTAINER].widgets();
    for (let i = 2; i < widgets.length; i++) {
      this.view[MENU_CONTAINER].remove(widgets[i]);
    }
    HamburgerConfig.config.forEach(function (hamburgerItem) {
      if (!hamburgerItem.isVisible || hamburgerItem.isVisible()) {
        var parentMenuView = self.getParentMenuItemView(hamburgerItem);
        var subMenuView = self.getSubMenuView(hamburgerItem);
        //Added for frame updations on Animation End 
        subMenuView.doLayout = function (widget) { }
        var imgArrow = parentMenuView.widgets()[2].widgets()[0];
        var flxArrow = parentMenuView.widgets()[2];
        if (hamburgerItem.subMenu.children.length === 0) {
          flxArrow.isVisible = false;
          imgArrow.isVisible = false;
          imgArrow.src = "right_arrow.png";
          imgArrow.accessibilityConfig = {
            //"a11yLabel": "Expand " + hamburgerItem.id + " Menu",
            "a11yHidden" : true,
            a11yARIA:{
              "aria-expanded":false,
              tabindex : -1
            }
          };
          
          parentMenuView.accessibilityConfig = {
            //"a11yHidden" : true,
            "a11yARIA":{
              role:"button",
                "aria-labelledby":parentMenuView.widgets()[1].id,
            }
          };

        
          if (hamburgerItem.id === "Exchange Rates") {
            imgArrow.accessibilityConfig = {
              "a11yLabel": "",
              a11yARIA: {
                tabindex: -1,
                },
            }
          }
          imgArrow.width = "11dp";
          imgArrow.height = "12dp";
          if (kony.application.getCurrentBreakpoint() == 640) {
            flxArrow.left = "88%";
            self.view.flxClose.left = "88%";
          } else {
            flxArrow.left = "92%";
            self.view.flxClose.left = "92%";
          }
          self.view.forceLayout();
          parentMenuView.onClick = hamburgerItem.onClick;
        }
        else {
          if (kony.application.getCurrentBreakpoint() == 640) {
            flxArrow.left = "88%";
            self.view.flxClose.left = "88%";
          } else {
            flxArrow.left = "92%";
            self.view.flxClose.left = "92%";
            imgArrow.src = "dropdown_expand.png";
            imgArrow.accessibilityConfig = {
              // "a11yLabel": "Expand " + hamburgerItem.id + " Menu",
              "a11yHidden" : true,
              a11yARIA: {
                "aria-expanded":false,
                tabindex: -1
                },
            }
            if (hamburgerItem.id === "Exchange Rates") {
              imgArrow.accessibilityConfig = {
                "a11yLabel": "",
                a11yARIA: {
                  tabindex: -1,
                  },
              }
            }
          }
          self.view.forceLayout();
          if(imgArrow.src !== "right_arrow.png"){
          parentMenuView.accessibilityConfig = {
            //"a11yHidden" : true,
            "a11yARIA":{
              role:"button",
              "aria-expanded" : false,
                "aria-labelledby":parentMenuView.widgets()[1].id,
            }
          };
        }
          parentMenuView.onClick = self.toggle.bind(self, subMenuView, imgArrow ,parentMenuView);
        }
        self.view[MENU_CONTAINER].add(parentMenuView, subMenuView);
      }

    });
  },

  /**
    * Generates view of sub menu item
    * @param {object} subMenuItem Sub Menu Item Config
    * @param {string} id Id for prefixing
    * @param {boolean} removeSeperator Removes the seperator 
    * @returns {kony.ui.FlexContainer} Sub menu Item view
    */
  getSubMenuItemView: function (subMenuItem, id, removeSeperator) {
    var subMenuItemView = this.view[SAMPLE_SUB_MENU_ITEM].clone(id);
    subMenuItemView.widgets()[0].text = kony.i18n.getLocalizedString(subMenuItem.text);
    subMenuItemView.widgets()[0].accessibilityConfig = {
      //"a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString(subMenuItem.text),
      // "a11yHidden" : true,
      a11yARIA: {
        tabindex: -1
      }
    }
    //subMenuItemView.widgets()[0].toolTip = kony.i18n.getLocalizedString(subMenuItem.toolTip);
    if (removeSeperator) {
      subMenuItemView.removeAt(1);
    }
    subMenuItemView.onClick = this.bindAction(subMenuItem.onClick)
    subMenuItemView.accessibilityConfig = { "a11yARIA": {
                "role": "link",
                "aria-current": false
            }};
    return subMenuItemView;
  },

  /**
    * Bind onclick to hamburger item
    * @param {function} originalOnclick Original OnClick from config
    * @returns {function} Composed function
    */
  bindAction: function (originalOnclick) {
    return function () {
      if (onItemSelectListener) {
        onItemSelectListener();
      }
      originalOnclick();
    }
  },

  /**
    * Generates the view of sub menu
    * @param {object} hamburgerItem config of item
    * @returns {kony.ui.FlexContainer} returns the view of submenu
    */
  getSubMenuView: function (hamburgerItem) {
    var self = this;
    var subMenuView = this.view[SAMPLE_SUB_MENU].clone(this.getPrefix(hamburgerItem.id));
    hamburgerItem.subMenu.children.forEach(function (subMenuItem, index) {
      if (!subMenuItem.isVisible || subMenuItem.isVisible.call(HamburgerConfig)) {
        var subMenuItemView = self.getSubMenuItemView(subMenuItem, self.getPrefix(hamburgerItem.id) + index, index !== hamburgerItem.subMenu.children.length - 1);
        subMenuItemView.isVisible = true;
        subMenuView.add(subMenuItemView);
      }

    })
    // Hide Sample Widget
    subMenuView.widgets()[0].isVisible = false;
    subMenuView.isVisible = true;
    return subMenuView;
  },

  /**
    * Generate View for Parent menu Item
    * @param {string} hamburgerItem Title of Parent Menu Item
    * @returns {kony.ui.FlexContainer} Returns the flex container object
    */
  getParentMenuItemView: function (hamburgerItem) {
    var parentMenuFlex = this.view[SAMPLE_MENU].clone(this.getPrefix(hamburgerItem.id));
    var childWidgets = parentMenuFlex.widgets();
    if (typeof hamburgerItem.icon === "function") {
      childWidgets[0].text = hamburgerItem.icon();
    }
    else {
      childWidgets[0].text = hamburgerItem.icon;
    }
    if (typeof hamburgerItem.text === "function") {
      childWidgets[1].text = kony.i18n.getLocalizedString(hamburgerItem.text());
      childWidgets[1].accessibilityConfig = {
        //"a11yLabel": kony.i18n.getLocalizedString("i18n.hamburger.viewOptions") + " " + kony.i18n.getLocalizedString(hamburgerItem.text()) + " " + kony.i18n.getLocalizedString("i18n.hamburger.Menu"),
        //"a11yHidden" : true,
        a11yARIA: {
          tabindex: -1,
        },
      }
      //assign the same a11y label to the parentMenuFlex
      childWidgets[0].accessibilityConfig = {
        //"a11yLabel": kony.i18n.getLocalizedString(hamburgerItem.text()) + " " + kony.i18n.getLocalizedString("i18n.hamburger.Menu"),
        "a11yHidden" : true,
        a11yARIA: {
          tabindex: -1,
        },
      }
    }
    else {
      childWidgets[1].text = kony.i18n.getLocalizedString(hamburgerItem.text);
      childWidgets[1].accessibilityConfig = {
        //"a11yLabel": kony.i18n.getLocalizedString("i18n.hamburger.viewOptions") + " " + kony.i18n.getLocalizedString(hamburgerItem.text) + " " + kony.i18n.getLocalizedString("i18n.hamburger.Menu"),
        //"a11yHidden" : true,
        a11yARIA: {
          tabindex: -1,
        },
      }
      childWidgets[0].accessibilityConfig = {
        //"a11yLabel": kony.i18n.getLocalizedString(hamburgerItem.text) + " " + kony.i18n.getLocalizedString("i18n.hamburger.Menu"),
        "a11yHidden" : true,
        a11yARIA: {
          tabindex: -1,
        },
      }
    }
    // if (typeof hamburgerItem.toolTip === "function") {
    //   childWidgets[1].toolTip = kony.i18n.getLocalizedString(hamburgerItem.toolTip());
    //   childWidgets[0].toolTip = kony.i18n.getLocalizedString(hamburgerItem.toolTip());

    // }
    // else {
    //   childWidgets[1].toolTip = kony.i18n.getLocalizedString(hamburgerItem.toolTip);
    //   childWidgets[0].toolTip = kony.i18n.getLocalizedString(hamburgerItem.toolTip);

    // }
    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
      childWidgets[3].left = "0%";
      childWidgets[3].width = "100%";
    }

    if (hamburgerItem.id == "TRANSFERS") {
      childWidgets[0].skin = "sknLblFontType0273E330px";
    }
    if (hamburgerItem.id == "About Us") {
      childWidgets[0].skin = "sknLblFontType0273E320px";
    }
    if (hamburgerItem.id == "TradeFinance") {
      childWidgets[0].skin = "sknLblFontTypeTradeFinance";
    }
    parentMenuFlex.isVisible = true;
    //assign tabindex
    parentMenuFlex.accessibilityConfig = {
      a11yARIA: {
      }
    }
    return parentMenuFlex;
  },

  setCustomHeaderLogo: function () {
    // var configurationManager = applicationManager.getConfigurationManager();
    // if (configurationManager.isSMEUser === "true") this.view.imgKony.src = "sbb.png";
    // else if (configurationManager.isRBUser === "true") this.view.imgKony.src = "kony_logo.png";
    // else if (configurationManager.isMBBUser === "true") this.view.imgKony.src = "mbb.png";
    // else this.view.imgKony.src = "kony_logo_white.png";
  },

  /**
    * For Change Language Support
    */
  forceInitializeHamburger: function () {
    this.generateMenu();
    this.initialized = true;
  }
};
});