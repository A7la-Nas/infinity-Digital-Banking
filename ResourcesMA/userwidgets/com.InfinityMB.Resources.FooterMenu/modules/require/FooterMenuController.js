define(['./FooterMenuBusinessController', './FooterMenuStore', 'ComponentUtility'], function (BusinessController, FooterMenuStore, ComponentUtility) {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.componentUtility = new ComponentUtility();
      this.store = FooterMenuStore;
      this.businessController = new BusinessController(this);
      this.businessController.store = this.store;
      this.businessController.componentUtility = this.componentUtility;
      FooterMenuStore.subscribe(this.render.bind(this), this);
      this.footerMenuMasterData = [];
      this.actionSequence = "";
      this.skins = {
        selectedSkin: "sknLbl424242SSPSBR13px",
	   unSelectedSkin: "sknLbl424242SSPR13px"
      };
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineGetter(this, 'serviceParameters', () => {
        return this._serviceParameters;
      });
      defineSetter(this, 'serviceParameters', value => {
        this._serviceParameters = value;
      });
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
      defineGetter(this, 'dataFormatting', () => {
        return this._dataFormatting;
      });
      defineSetter(this, 'dataFormatting', value => {
        this._dataFormatting = value;
      });
      defineGetter(this, 'conditionalMappingKey', () => {
        return this._conditionalMappingKey;
      });
      defineSetter(this, 'conditionalMappingKey', value => {
        this._conditionalMappingKey = value;
      });
      defineGetter(this, 'conditionalMapping', () => {
        return this._conditionalMapping;
      });
      defineSetter(this, 'conditionalMapping', value => {
        this._conditionalMapping = value;
      });
      defineGetter(this, 'defaultSelectionConfig', () => {
        return this._defaultSelectionConfig;
      });
      defineSetter(this, 'defaultSelectionConfig', value => {
        this._defaultSelectionConfig = value;
      });
    },

    /**
     * @api : setContext
     * Method to set the context value
     * @param {Object} footerMenuDataconfig - component context data from Parent widget
     * @return : NA
     */
    setContext: function (footerMenuDataconfig) {
      var scope = this;
      try {
        if ((Object.keys(footerMenuDataconfig).length > 0) && !scope.componentUtility.isEmptyNullUndefined(footerMenuDataconfig)) {
          this.actionSequence = "";
          scope.businessController.setEntitlements(footerMenuDataconfig.entitlements)
          scope.businessController.setDataInCollection(footerMenuDataconfig, "context");
        }
      } catch (error) {
        scope.setError("setContext", error);
      }
    },

    /**
     * @api : render
     * gets invoked when collection gets updated
     * @return : NA
     */
    render: function () {
      var scope = this;
      try {
        let collectionObj = FooterMenuStore.getState().Collection;
        if (!scope.componentUtility.isEmptyNullUndefined(collectionObj.context) && this.actionSequence === "") {
          scope.groupMenuArrayData(collectionObj.context);
        }
        else if(this.actionSequence === "onMenuSelection") {
          let footerMenuMasterData = scope.footerMenuMasterData.footerMenus;
          scope.handleCallToAction(footerMenuMasterData[collectionObj.context.selectedItemIndex - 1]);
          scope.selectNavLink(collectionObj.context.selectedItemIndex);
        }
      } catch (error) {
        scope.setError("render", error);
      }
    },

    /**
     * @api : groupMenuArrayData
     * Method to merge both default and customized menu items into single data
     * @param {Object} menuItems - contains both Default and custom Menu information
     * @return : NA
     */
    groupMenuArrayData: function (menuItems) {
      var scope = this;
      try {
        let finalArray = [], footerMenuJSON = {};
        if(!scope.componentUtility.isEmptyNullUndefined(menuItems[scope.businessController.getFieldValueFromMapping(scope._dataMapping["defaultMenus"])])) {
        finalArray = menuItems[scope.businessController.getFieldValueFromMapping(scope._dataMapping["defaultMenus"])];
        let masterArray = [...finalArray];
        let customMenus = menuItems[scope.businessController.getFieldValueFromMapping(scope._dataMapping["customMenus"])];
        let customMenusDefault = menuItems[scope.businessController.getFieldValueFromMapping(scope._dataMapping["customMenusDefault"])];
        let customMenusEntitled = [];                               
        let isMicroAppPresent = false;
        let isEntitled = false;
        let entitlementsStr;
        let entitlementsStrFormat;
         if(!scope.componentUtility.isEmptyNullUndefined(applicationManager)){
           var configManager = applicationManager.getConfigurationManager(); 
         }
        for (let i = 0; i < customMenus.length; i++) {
          isMicroAppPresent = true; //!scope.componentUtility.isEmptyNullUndefined(configManager) ? configManager.isMicroAppPresent(customMenus[i].navigation.appName) : true;
          entitlementsStr =  customMenus[i].entitlements;
          entitlementsStrFormat = entitlementsStr.substring(1, entitlementsStr.length - 1).split("'").join("");
          isEntitled = scope.businessController.isEntitled(entitlementsStrFormat.split(","));
          if(isMicroAppPresent && isEntitled){
            customMenusEntitled.push(customMenus[i]);
            if(customMenusEntitled.length >= 2) { break; }
          }
        }
        masterArray.splice(1, 0, customMenusEntitled[0] || customMenusDefault[0], customMenusEntitled[1] || customMenusDefault[1]);
        footerMenuJSON["footerMenus"] = masterArray;
        footerMenuJSON["notification"] = menuItems[scope.businessController.getFieldValueFromMapping(scope._dataMapping["notification"])];
        scope.footerMenuMasterData = footerMenuJSON;
        scope.bindFooterMenuAction();
        }
      } catch (error) {
        scope.setError("groupMenuArrayData", error);
      }
    },

    /**
     * @api : bindFooterMenuAction
     * Bind actions for Menu items
     * @return : NA
     */
    bindFooterMenuAction: function () {
      var scope = this;
      try {
        let footerMenuMasterData = scope.footerMenuMasterData.footerMenus;
        let isSelected = false;
        for (let index = 1; index <= footerMenuMasterData.length; index++) {
          let flxName = "flxNav" + index;
          scope.view[flxName].onClick = scope.onMenuSelection.bind(scope, index);
          if (!scope.componentUtility.isEmptyNullUndefined(scope.businessController.getParsedValue(scope._defaultSelectionConfig))) {
            if (scope.businessController.getParsedValue(footerMenuMasterData[index - 1].label) === scope.businessController.getParsedValue(scope._defaultSelectionConfig)) {
              scope.selectNavLink(index);
              isSelected = true;
            } else if (footerMenuMasterData[index - 1].isActive && !isSelected) {
              scope.selectNavLink(index);
            }
          } else {
            if (footerMenuMasterData[index - 1].isActive) {
              scope.selectNavLink(index);
            }
          }
        }
      } catch (error) {
        scope.setError("bindFooterMenuAction", error);
      }
    },

    /**
     * @api : onMenuSelection
     * Push the selected Menu item to collection to retain selection
     * @Param {Number} selectedIndex - Index to identify currently selected menu
     * @return : NA
     */
    onMenuSelection: function (selectedIndex) {
      var scope = this;
      try {
        let footerMenuMasterData = scope.footerMenuMasterData.footerMenus;
        let getFieldMapping = scope.businessController.getFieldValueFromMapping(scope._defaultSelectionConfig);
        if (!scope.componentUtility.isEmptyNullUndefined(getFieldMapping)) {
          let selectedData = {};
          this.actionSequence = "onMenuSelection";
          selectedData[getFieldMapping] = footerMenuMasterData[selectedIndex - 1].label;
          selectedData["selectedItemIndex"] = selectedIndex;
          scope.businessController.setDataInCollection(selectedData, "context");
        }
      } catch (error) {
        scope.setError("onMenuSelection", error);
      }
    },

    /**
     * @api : selectNavLink
     * Responsible to assign selected Icon and Skin for selected Menu
     * @Param {Number} defaultMenu - Index to identify currently selected menu
     * @return : NA
     */
    selectNavLink: function (defaultMenu = 1) {
      var scope = this;
      try {
        switch (defaultMenu) {
          case 1:
            scope.setMenuData(1);
            break;
          case 2:
            scope.setMenuData(2);
            break;
          case 3:
            scope.setMenuData(3);
            break;
          case 4:
            scope.setMenuData(4);
            break;
          default:
            break;
        }
      } catch (error) {
        scope.setError("selectNavLink", error);
      }
    },

    /**
     * @api : setMenuData
     * Responsible to set text, skin and Image source for footer Menu
     * @Param {Number} selectedIndex - Index to identify currently selected menu
     * @return : NA
     */
    setMenuData: function (selectedIndex) {
      var scope = this;
      try {
        let footerMenuMasterData = scope.footerMenuMasterData.footerMenus;
        if(footerMenuMasterData[0].isActive === true)
          selectedIndex = 1;
        for (let menuIndex = 1; menuIndex <= footerMenuMasterData.length; menuIndex++) {
          if (menuIndex === selectedIndex) {
            scope.view["lblNav" + selectedIndex].skin = scope.skins.selectedSkin;
            scope.view["imgNav" + selectedIndex].src = footerMenuMasterData[selectedIndex - 1].selectedIcon;
          } else {
            scope.view["lblNav" + menuIndex].skin = scope.skins.unSelectedSkin;
            scope.view["imgNav" + menuIndex].src = footerMenuMasterData[menuIndex - 1].icon;
          }
          scope.view["lblNav" + menuIndex].text = scope.businessController.getParsedValue(footerMenuMasterData[menuIndex - 1].label);
        }
        if(scope.footerMenuMasterData.notification.isNotificationAvailable) {
          scope.updateNotificationDot(selectedIndex);
        }
        scope.view.forceLayout();
      } catch (error) {
        scope.setError("setMenuData", error);
      }
      this.forFooterRtl();
    },

    /**
     * @api : updateNotificationDot
     * Responsible to set skin and Image source based on Notofication status of user
     * @Param {Number} selectedIndex - Index to identify currently selected menu
     * @return : NA
     */
    updateNotificationDot: function(selectedIndex) {
      var scope = this;
      try {
        let footerMenuMasterData = scope.footerMenuMasterData.notification;
        if(selectedIndex === 4) {
           scope.view["lblNav" + selectedIndex].skin = scope.skins.selectedSkin;
           scope.view["imgNav" + selectedIndex].src = footerMenuMasterData.selectedIcon;
        } else {
          this.view.lblNav4.skin = scope.skins.unSelectedSkin;
          this.view.imgNav4.src = footerMenuMasterData.icon;
        }
      } catch (error) {
        scope.setError("updateNotificationDot", error);
      }
    },

    /**
	* @api : setError
	* communicate error handling from component view controller to parent widget.
    * @Param: {String} methodName -method from which error message is received
    * @Param: {Object} error -  error response
	* @return : NA
	*/
    setError: function(methodName, error) {
      var scope = this;
      let errorObj = {
          "level": "ComponentViewController",
          "method": methodName,
          "error": error
        };
      scope.onError(errorObj);
    },
    
    forFooterRtl: function(){
      var scope = this;
     if(kony.i18n.getCurrentLocale() === "ar_AE"){       
       this.view.flxNav1.left = "75%";
       this.view.flxNav2.left = "50%";
       this.view.flxNav3.left = "25%";
       this.view.flxNav4.left = "0%";
     }
     else {
       this.view.flxNav1.left = "0%";
       this.view.flxNav2.left = "25%";
       this.view.flxNav3.left = "50%";
       this.view.flxNav4.left = "75%";
     }
 }
  };
});