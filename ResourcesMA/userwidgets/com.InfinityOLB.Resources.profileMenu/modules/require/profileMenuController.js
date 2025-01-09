define( ['ProfileMenuConfig', 'ViewConstants', 'CommonUtilities'], function(ProfileMenuConfig, ViewConstants, CommonUtilities) {
  var MENU_CONTAINER = "flxProfileMenu";
  var SAMPLE_MENU = "flxMenuItem";
  var SAMPLE_SUB_MENU = "flxSubMenu";
  var SAMPLE_SUB_MENU_ITEM = "flxSubMenuItem";
  var onItemSelectListener = null;
  return {
    initialized: false,
    activateWhenInitialized: null,
    isPreLoginView: false,
    initialLanguage: null,
    initialLegalEntity: null,
    preShow: function() {
      if (!this.initialized) { // need to integrate service call to get alert categories
        this.generateMenu();
        this.initialized = true;
        if (this.activateWhenInitialized) {
          this.activateMenu(this.activateWhenInitialized.parentId, this.activateWhenInitialized.childId)
          this.activateWhenInitialized = null;
        }
      }
      this.onBreakpointChangeComponent();
      var frm = kony.application.getCurrentForm();
      if(frm.customheadernew){
        frm.customheadernew.btnSkipNav.onClick = this.skipToMainContent;
      }
      this.checkCurrentLegalEntity();
    },
    skipToMainContent : function(){
      var frm = kony.application.getCurrentForm();
      if (frm.lblHeading === undefined) {
        frm.lblContentHeader.setActive(true);
      } else {
        frm.lblHeading.setActive(true);
      }
    },
    postShow: function() {
      this.view.forceLayout();
      this.menuItemOnKeyPress();
      var currForm = kony.application.getCurrentForm();
      currForm.onKeyPress = this.menuCollapse;
    },
    menuItemOnKeyPress: function () {
      var currForm = kony.application.getCurrentForm();
      var menuLength = currForm.profileMenu.flxProfileMenu.widgets().length - 2;
      var lastWidget = currForm.profileMenu.flxProfileMenu.widgets()[menuLength];
      var firstWidget = currForm.profileMenu.flxProfileMenu.widgets()[2];
      lastWidget.onKeyPress = this.lastWidgetOnKeyPressCallback;
      firstWidget.onKeyPress = this.firstWidgetOnKeyPressCallback;
    },
    menuCollapse:function(eventObject, eventPayload){
      var currForm = kony.application.getCurrentForm();
      if (eventPayload.keyCode === 27) {
        if (kony.application.getCurrentBreakpoint() === 640) {
          if (currForm.flxLeft.isVisible) {
              this.toggleMenuMobile();
          }
        }
      }
    },
    toggleMenuMobile: function () {
      var currForm = kony.application.getCurrentForm();
      if (currForm.lblCollapseMobile.text == "O") {
        currForm.lblCollapseMobile.text = "P";
        currForm.flxLeft.setVisibility(true);
        currForm.flxRight.setVisibility(false);
        currForm.flxAccountSettingsCollapseMobile.setActive(true);;
        currForm.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          a11yARIA: {
            "aria-labelledby": "lblAccountSettingsMobile",
            "aria-expanded": true,
            "tabindex": 0,
            "role": "button"
          }
        }
      }
    },
    lastWidgetOnKeyPressCallback: function (eventObj, eventPayload) {
      var currForm = kony.application.getCurrentForm();
      var subMenuLength = currForm.profileMenu.flxProfileMenu.widgets().length - 1;
      var finalWidget = currForm.profileMenu.flxProfileMenu.widgets()[subMenuLength];
      var finalSubMenu = finalWidget.widgets()[finalWidget.widgets().length - 1];
      if (kony.application.getCurrentBreakpoint() === 640) {
        if (finalWidget.isVisible) {
          finalSubMenu.onKeyPress = this.finalSubMenuOnKeyPressCallback;
        }
        else {
          this.finalSubMenuOnKeyPressCallback(eventObj, eventPayload);
        }
      }
    },
    finalSubMenuOnKeyPressCallback: function (eventObj, eventPayload) {
      var currForm = kony.application.getCurrentForm();
      if (eventPayload.keyCode === 9 && eventPayload.shiftKey === false) {
        this.collapseAll();
        currForm.lblCollapseMobile.text = "O";
        currForm.flxLeft.setVisibility(false);
        currForm.flxRight.setVisibility(true);
        currForm.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          a11yARIA: {
            "aria-labelledby": "lblAccountSettingsMobile",
            "aria-expanded": false,
            "tabindex": 0,
            "role": "button"
          }
        }
        eventPayload.preventDefault();
        currForm.flxAccountSettingsCollapseMobile.setActive(true);
      }
    },
    firstWidgetOnKeyPressCallback: function (eventObj, eventPayload) {
      var currForm = kony.application.getCurrentForm();
      if (kony.application.getCurrentBreakpoint() === 640) {
        if (eventPayload.keyCode === 9) {
          if (eventPayload.shiftKey) {
            this.collapseAll();
            currForm.lblCollapseMobile.text = "O";
            currForm.flxLeft.setVisibility(false);
            currForm.flxRight.setVisibility(true);
            currForm.flxAccountSettingsCollapseMobile.accessibilityConfig = {
              a11yARIA: {
                "aria-labelledby": "lblAccountSettingsMobile",
                "aria-expanded": false,
                "tabindex": 0,
                "role": "button"
              }
            }
            eventPayload.preventDefault();
            currForm.flxAccountSettingsCollapseMobile.setActive(true);
          }
        }
      }
    },
    /**
         * *@param {String} width - width of the screen/breakpoint
         *  Method to set the layout properties at the specific breakpoint
         */
    onBreakpointChangeComponent: function(width) {
      if (width == undefined || width == null) {
        width = kony.application.getCurrentBreakpoint();
      }
      if (width > 1024) {
        this.view.minHeight = this.view.parent.height;
        this.view[MENU_CONTAINER].height = (kony.os.deviceInfo().screenHeight - 40) + "dp";
      }
    },
    checkLanguage: function() {
      if (this.initialLanguage !== null && (this.initialLanguage !== kony.i18n.getCurrentLocale())) {
        this.forceInitializeProfileMenu();
      }
    },
    checkCurrentLegalEntity: function () {
      var self = this;
      if (this.initialLegalEntity !== null && (this.initialLegalEntity !== applicationManager.getUserPreferencesManager().getCurrentLegalEntity())) {
        let widgets = self.view.flxProfileMenu.widgets();
        widgets.forEach(function (widget, i) {
          if (i > 1) self.view.flxProfileMenu.remove(widget);
        });
        self.generateMenu();
      }
    },
    /**
         * Activates the menu
         * @param {string} parentId of parent menu
         * @param {string} childId of parent menu
         */
    activateMenu: function(parentId, childId) {
      if (!this.initialized) {
        this.activateWhenInitialized = {
          parentId: parentId,
          childId: childId
        }
        return;
      }
      var parentIndex = 0;
      var menuObject = null;
      var visibleIndex = 1; //One as offset for sample widget 
      ProfileMenuConfig.config.forEach(function(menuItem) {
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
        var visibleChildIndex = 1; //One as offset for sample widget 
        var children = this.view[MENU_CONTAINER].widgets();
        this.collapseAll();
        this.resetSkins();
        children[parentIndex * 2].accessibilityConfig = {
          a11yARIA: {
            role : "button",
            tabindex: 0,
            "aria-expanded": true,
            "aria-labelledby": children[parentIndex * 2].widgets()[1].id
          }
        }
        this.expandWithoutAnimation(children[parentIndex * 2 + 1]);
        children[parentIndex * 2].widgets()[2].widgets()[0].text = "P";
        /*children[parentIndex * 2].widgets()[2].widgets()[0].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.profile.Collapse") + " " + kony.i18n.getLocalizedString(menuObject.text)
                        };*/
        if (menuObject.subMenu.children.length === 0) {
          children[parentIndex * 2].widgets()[2].widgets()[0].text = "O";
          children[parentIndex * 2].widgets()[2].widgets()[0].width = "11dp";
          children[parentIndex * 2].widgets()[2].widgets()[0].height = "12dp";
        }
        if (childId) {
          var childObject = null;
          menuObject.subMenu.children.forEach(function(childItem) {
            if (!childItem.isVisible || childItem.isVisible()) {
              if (childItem.id.toLowerCase() === childId.toLowerCase()) {
                childIndex = visibleChildIndex;
                childObject = childItem;
              } else if (parentId.toLowerCase() === "alertsettings") {
                children[parentIndex * 2 + 1].widgets()[visibleChildIndex].widgets()[0].skin = "sknLblSSP72727213px";
                children[parentIndex * 2 + 1].widgets()[visibleChildIndex].accessibilityConfig={
                  "a11yARIA":{
                    "tabindex":0,
                    "role":"link",
                    "aria-current":false
                  }
                }
              }
              visibleChildIndex++;
            }
          });
          if (childObject) {
            children[parentIndex * 2 + 1].widgets()[childIndex].skin = ViewConstants.SKINS.CURSOR_SKIN;
            children[parentIndex * 2 + 1].widgets()[childIndex].hoverSkin = ViewConstants.SKINS.CURSOR_SKIN;
            children[parentIndex * 2 + 1].widgets()[childIndex].widgets()[0].skin = "sknLblProfileMenurSelected";
            children[parentIndex * 2 + 1].widgets()[childIndex].accessibilityConfig={
              "a11yARIA":{
                "tabindex":0,
                "role":"link",
                "aria-current":true
              }
            }
          }
        }
      }
    },
    /**
         * *@param {Object} widget - menu item data
         *  Method to expand the menu item without animation
         */
    expandWithoutAnimation: function(widget) {
      widget.isVisible = true;
      widget.height = (widget.widgets().length - 1) * 40;
      this.view.forceLayout();
    },
    /**
         *  Method to reset the skins for all the submenus
         */
    resetSkins: function() {
      var subMenus = this.view[MENU_CONTAINER].widgets().filter(function(child, i) {
        return i % 2 !== 0;
      })
      subMenus.forEach(function(subMenu) {
        subMenu.widgets().forEach(function(subMenuItem) {
          subMenuItem.skin = ViewConstants.SKINS.CURSOR_SKIN;
          subMenuItem.hoverSkin = ViewConstants.SKINS.HAMBURGER_HOVER_SKIN;
          subMenuItem.widgets()[1].skin = ViewConstants.SKINS.HAMBURGER_UNSELECTED_SKIN;
        })
      })
    },
    /**
         * Generate prefix by removing whitespace
         * @param {string} id Id of ite,
         * @returns {string} id with whitespace removed
         */
    getPrefix: function(id) {
      return id.replace(/ /g, '')
    },
    /**
         * Toggles the sub menu
         * @param {kony.ui.FlexContainer} widget Submenu widget to toggle 
         * @param {kony.ui.FlexContainer} imgArrow imgArrow to toggle
         */
    toggle: function(parentWidget, widget, imgArrow, menuItem) {
      var menuText = widget.id.split("flx")[0];
      //             if(menuText === "APPROVALMATRIX"){
      //               imgArrow.text = "Q";
      //               var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew");
      //               settingsModule.presentationController.enterProfileSettings("approvalMatrix");
      //             } else {
      if (widget.isVisible === true) {
        this.collapseAll(menuItem);
        imgArrow.text = "O"
      } else {
        this.collapseAll(this.activeMenu);
        this.activeMenu = menuText;
        if (imgArrow.text != "P") {
          imgArrow.text = "P";
          //imgArrow.toolTip = kony.i18n.getLocalizedString("i18n.profile.Collapse");
          this.view.forceLayout();
        }
        this.expand(widget);
        parentWidget.accessibilityConfig = {
          a11yARIA: {
            role : "button",
            tabindex: 0,
            "aria-expanded": true,
            "aria-labelledby": parentWidget.widgets()[1].id
          }
        }
      }
      //  }
      this.view.forceLayout();
    },
    /**
         * Collapses the subMenu
         * @param {kony.ui.FlexContainer} widget Submenu widget to expand
         */
    expand: function(widget) {
      var scope = this;
      var children = widget.widgets();
      widget.isVisible = true;
      var animationDefinition = {
        100: {
          "height": (widget.widgets().length - 1) * 40
        }
      };
      var animationConfiguration = {
        duration: 0.5,
        fillMode: kony.anim.FILL_MODE_FORWARDS
      };
      var callbacks = {
        animationEnd: function() {
          // scope.checkLogoutPosition();
          //widget.widgets()[0].setFocus(true);
          scope.view.forceLayout();
        }
      };
      var animationDef = kony.ui.createAnimation(animationDefinition);
      widget.animate(animationDef, animationConfiguration, callbacks);
    },
    /**
         * Collapse All the sub menu items
         */
    collapseAll: function(menuText) {
      var self = this;
      var menuItems = this.view[MENU_CONTAINER].widgets();
      //MENU_CONTAINER.isVisible = false;
      menuItems.forEach(function(menuItem, i) {
        if (i % 2 === 0) {
          menuItem.accessibilityConfig = {
            a11yARIA: {
              role : "button",
              tabindex: 0,
              "aria-expanded": false,
              "aria-labelledby": menuItems[i].widgets()[1].id
            }
          }
        }
        if (i % 2 !== 0) {
          self.collapseWithoutAnimation(menuItem);
          var imageWidget = menuItems[i - 1].widgets()[2].widgets()[0];
          if (imageWidget.text === "P") {
            imageWidget.text = "O";
            //imageWidget.toolTip = kony.i18n.getLocalizedString("i18n.profile.Expand");
          }
        }
      })
      var width = kony.application.getCurrentBreakpoint();
      if (width == 640) {
        this.view.minHeight = "525dp";
        this.view[MENU_CONTAINER].height = "500dp";
      } else {
        this.view.minHeight = this.view.parent.height;
        this.view[MENU_CONTAINER].height = (kony.os.deviceInfo().screenHeight - 80) + "dp";
      }
      self.view.forceLayout();
    },
    /**
         * Collapse the submenu item
         * @param {kony.ui.FlexContainer} widget submenu flex to collapse
         */
    collapseWithoutAnimation: function(widget) {
      widget.height = 0;
      //widget.accessibility
      widget.isVisible = false;
      this.view.forceLayout();
    },
    /**
         * Generates View of the menu dynamically
         */
    generateMenu: function() {
      var self = this;
      this.initialLanguage = kony.i18n.getCurrentLocale();
      this.initialLegalEntity = applicationManager.getUserPreferencesManager().getCurrentLegalEntity();
      ProfileMenuConfig.config.forEach(function(menuItem) {
        var configurationManager = applicationManager.getConfigurationManager();
        if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.ALERTSETTINGS) === true && menuItem.id === "ALERTSETTINGS" ) {
          var AlertsData = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "SettingsNewAlertsUIModule",
            "appName": "AlertSettingsMA"
          }).presentationController.getAlertsCategoryResponse();
          if (AlertsData !== undefined) {
            var data = self.generateAlertsmenu(AlertsData);
            menuItem.subMenu.children.splice(1);
            for (var i = 0; i < data.length; i++) {
              //data[i].isVisible = true;
              menuItem.subMenu.children.push(data[i]);
            }
          }
        }
        if (!menuItem.isVisible || menuItem.isVisible()) {
          var parentMenuView = self.getParentMenuItemView(menuItem);
          var subMenuView = self.getSubMenuView(menuItem);
          //Added for frame updations on Animation End 
          subMenuView.doLayout = function(widget) {}
          var imgArrow = parentMenuView.widgets()[2].widgets()[0];
          var flxArrow = parentMenuView.widgets()[2];
          //                     if (menuItem.id === "APPROVALMATRIX") {
          // 						 imgArrow.text = "Q";
          // 						}
          if (menuItem.subMenu.children.length === 0) {
            flxArrow.isVisible = true;
            imgArrow.isVisible = true;
            imgArrow.text = "O";
            imgArrow.width = "11dp";
            imgArrow.height = "12dp";
            if (kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024) {
              flxArrow.left = "89%";
            } else {
              flxArrow.left = "89%";
            }
            self.view.forceLayout();
            parentMenuView.onClick = menuItem.onClick;
          } else {
            if (kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024) {
              flxArrow.left = "89%";
            } else {
              flxArrow.left = "89%";
            }
            self.view.forceLayout();
            parentMenuView.onClick = self.toggle.bind(self, parentMenuView, subMenuView, imgArrow, menuItem);
          }
          self.view[MENU_CONTAINER].add(parentMenuView, subMenuView);
        }
      });
    },
    generateAlertsmenu: function(response) {
      var widgetsMap = [];
      for (var i = 0; i < response.records.length; i++) {
        if (!(response.records[i].Groups_count === "0" || (response.records[i].Alerts_count && response.records[i].Alerts_count === "0") || response.records[i].alertcategory_status_id !== "SID_ACTIVE")) {
          var temp = {
            id: response.records[i].alertcategory_Name,
            configuration: "",
            text: response.records[i].alertcategory_Name,
            toolTip: response.records[i].alertcategory_Name,
            onClick: function(text) {
              for (var i = 0; i < response.records.length; i++) {
                if (this.trim(String) === response.records[i].alertcategory_Name && response.records[i].alertcategory_accountLevel === "true") {
                  var Alert = response.records[i].alertcategory_id;
                  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "SettingsNewAlertsUIModule",
                    "appName": "AlertSettingsMA"
                  }).presentationController.setAlertsMenuValues(Alert);
                  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "SettingsNewAlertsUIModule",
                    "appName": "AlertSettingsMA"
                  }).presentationController.navigateToAccountAlerts("alertSettings2");
                } else if (this.trim(String) === response.records[i].alertcategory_Name && response.records[i].alertcategory_accountLevel === "false") {
                  var params = {
                    "AlertCategoryId": response.records[i].alertcategory_id
                  };
                  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "SettingsNewAlertsUIModule",
                    "appName": "AlertSettingsMA"
                  }).presentationController.fetchAlertsDataById(params);
                }
              }
            }.bind(response.records[i].alertcategory_Name),
            isVisible: function() {
              return true;
            }
          };
          widgetsMap.push(temp);
        }
      }
      return widgetsMap;
    },
    /**
         * Generates view of sub menu item
         * @param {object} subMenuItem Sub Menu Item Config
         * @param {string} id Id for prefixing
         * @param {boolean} removeSeperator Removes the seperator 
         * @returns {kony.ui.FlexContainer} Sub menu Item view
         */
    getSubMenuItemView: function(subMenuItem, id, removeSeperator) {
      var subMenuItemView = this.view[SAMPLE_SUB_MENU_ITEM].clone(id);
      subMenuItemView.widgets()[0].text = kony.i18n.getLocalizedString(subMenuItem.text);
      if (kony.i18n.getLocalizedString(subMenuItem.text) === "") {
        subMenuItemView.widgets()[0].text = subMenuItem.text;
      }
      /*subMenuItemView.widgets()[0].toolTip = kony.i18n.getLocalizedString(subMenuItem.toolTip);
            if (kony.i18n.getLocalizedString(subMenuItem.toolTip) === "") {
                if (subMenuItem.toolTip !== undefined) {
                    subMenuItemView.widgets()[0].toolTip = subMenuItem.toolTip;
                }
            }*/
      subMenuItemView.widgets()[0].accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        }
      };
      subMenuItemView.widgets()[1].accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        }
      };
      subMenuItemView.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": 0,
          "role": "link",
          "aria-current": false
        }
      };
      //subMenuItemView.isVisible = false;
      subMenuItemView.onClick = this.bindAction(subMenuItem.onClick)
      return subMenuItemView;
    },
    /**
         * Bind onclick to profile menu item
         * @param {function} originalOnclick Original OnClick from config
         * @returns {function} Composed function
         */
    bindAction: function(originalOnclick) {
      return function() {
        if (onItemSelectListener) {
          onItemSelectListener();
        }
        originalOnclick();
        var frm=kony.application.getCurrentForm();
        if(frm.id==="frmAccountAlertsEdit"){
          frm.flxRight.isVisible = true;
        }
      }
    },
    /**
         * Generates the view of sub menu
         * @param {object} menuItem config of item
         * @returns {kony.ui.FlexContainer} returns the view of submenu
         */
    getSubMenuView: function(menuItem) {
      var self = this;
      var subMenuView = this.view[SAMPLE_SUB_MENU].clone(this.getPrefix(menuItem.id));
      subMenuView.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1,
          "aria-live": "off"
        }
      }
      menuItem.subMenu.children.forEach(function(subMenuItem, index) {
        if (!subMenuItem.isVisible || subMenuItem.isVisible.call(ProfileMenuConfig)) {
          var subMenuItemView = self.getSubMenuItemView(subMenuItem, self.getPrefix(menuItem.id) + index, index !== menuItem.subMenu.children.length - 1);
          subMenuItemView.isVisible = true;
          subMenuView.add(subMenuItemView);
        }
      })
      // Hide Sample Widget
      subMenuView.widgets()[0].isVisible = false;
      subMenuView.isVisible = false;
      return subMenuView;
    },
    /**
         * Generate View for Parent menu Item
         * @param {string} menuItem Title of Parent Menu Item
         * @returns {kony.ui.FlexContainer} Returns the flex container object
         */
    getParentMenuItemView: function(menuItem) {
      var parentMenuFlex = this.view[SAMPLE_MENU].clone(this.getPrefix(menuItem.id));
      var childWidgets = parentMenuFlex.widgets();
      //image-fc-label
      parentMenuFlex.accessibilityConfig = {
        "a11yARIA": {
          "aria-labelledby": childWidgets[1].id,
          "aria-expanded": false,
          "tabindex": 0
        }
      };
      childWidgets[0].accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          "tabindex": -1
        }
      };
      childWidgets[0].text = menuItem.icon;
      if (typeof menuItem.icon === "function") {
        childWidgets[0].text = menuItem.icon();
      } else {
        childWidgets[0].text = menuItem.icon;
      }
      if (typeof menuItem.text === "function") {
        childWidgets[1].text = kony.i18n.getLocalizedString(menuItem.text());
        childWidgets[1].accessibilityConfig = {
          //"a11yLabel": kony.i18n.getLocalizedString(menuItem.text()),
          "a11yARIA": {
            "tabindex": -1
          }
        };
        childWidgets[2].accessibilityConfig = {
          //"a11yLabel":"Expand"+ kony.i18n.getLocalizedString(menuItem.text()),
          "a11yHidden": true,
          "a11yARIA": {
            "tabindex": -1
          }
        };
      } else {
        childWidgets[1].text = kony.i18n.getLocalizedString(menuItem.text);
        childWidgets[1].accessibilityConfig = {
          //"a11yLabel": kony.i18n.getLocalizedString(menuItem.text()),
          "a11yARIA": {
            "tabindex": -1
          }
        };
        childWidgets[2].accessibilityConfig = {
          //"a11yLabel":"Expand"+ kony.i18n.getLocalizedString(menuItem.text()),
          "a11yHidden": true,
          "a11yARIA": {
            "tabindex": -1
          }
        };
      }
      /* if (typeof menuItem.toolTip === "function") {
                      childWidgets[1].toolTip = kony.i18n.getLocalizedString(menuItem.toolTip());
                      childWidgets[0].toolTip = kony.i18n.getLocalizedString(menuItem.toolTip());
                  } else {
                      childWidgets[1].toolTip = kony.i18n.getLocalizedString(menuItem.toolTip);
                      childWidgets[0].toolTip = kony.i18n.getLocalizedString(menuItem.toolTip);
                  }*/
      if (kony.application.getCurrentBreakpoint() === 640) {
        childWidgets[2].left = "0%";
        childWidgets[2].width = "100%";
      }
      parentMenuFlex.isVisible = true;
      childWidgets[2].widgets()[0].accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          "tabindex": -1
        }
      };
      return parentMenuFlex;
    },
    /**
         * Method to regenerate profile menu and service call to repaint it
         */
    forceInitializeProfileMenu: function() {
      // need to remove all the generated menu items
      var self = this;
      var widgets = self.view.flxProfileMenu.widgets();
      widgets.forEach(function(widget, i) {
        if (i > 1) self.view.flxProfileMenu.remove(widget);
      });
      setTimeout(function() {
        self.generateMenu();
      }, 1000);
      this.initialized = false;
    }
  };
});