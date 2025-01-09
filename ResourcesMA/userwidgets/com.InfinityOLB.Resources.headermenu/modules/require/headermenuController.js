define(['ViewConstants'],function(ViewConstants) {

  var MIN_ENTITIES_RECORDS_TO_ALLOW_SEARCH = 5;

	return {
      postShow: function() {
        str = kony.i18n.getCurrentLocale();
        if (str === "ar_AE") {
            this.view.lblImageLogout.text = "/";
            }
        else {
            this.view.lblImageLogout.text = "l";
            }
        this.view.flxLegalEntityDropdown.accessibilityConfig = {
          a11yLabel : this.view.lblLegalEntity.text + " " + this.view.lblLegalEntityText.text,
          a11yARIA: {
            "role": "button",
            "aria-expanded": false,
            "tabindex": 0
          }
        };
        },
    onEntityClick: function () {
      var scope = this;
      scope.onEntitySwitchInDropdown(scope.view.segLegalEntity, scope.view.flxSegLegalEntity, scope.view.lblLegalEntityText, scope.populateLEList);
    },
      
      /**
       * Set badge size 
       */
      setMessageBadgeSize: function()
      {
        var numberOfMessages = parseInt(this.view.lblNewNotifications.text);
        if(numberOfMessages<=99)
          {
            this.view.lblNewNotifications.width="15dp";
            this.view.lblNewNotifications.height="15dp";
          }
        else
          {
            
            this.view.lblNewNotifications.width="20dp";
            this.view.lblNewNotifications.height="20dp";
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
      /**
       * Calls when this component shows on Form
       */
	  headerPreShow:function() {
          let scope = this;
          var configurationManager = applicationManager.getConfigurationManager();
          var isUserLoggedIn = applicationManager.getUserPreferencesManager().isUserLoggedin();
          if(configurationManager.enableAlertsIcon==="true" && 
          isUserLoggedIn && configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE)) {
               this.view.flxNotifications.isVisible=true;
          }
          else{
           		this.view.flxNotifications.isVisible=false;
          }
          this.updateAlertIcon();
        this.handleMessageVisiblity();
        this.view.forceLayout();
        
      this.view.lblLegalEntityDropdownIcon.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          "tabindex": -1
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
      this.view.flxSegLegalEntity.accessibilityConfig = {
        a11yARIA: {
          "aria-live": "off",
          "tabindex": -1
        }
      };
        this.view.flxNotifications.accessibilityConfig = {
                    "a11yLabel": "Alerts",
                    "a11yARIA": {
                        role: "button",
                    }
                };
      let singleEntityValue = "true";
      if (applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity") !== undefined) {
        singleEntityValue = applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity");
      }
      let userLegalEntitesSize = applicationManager.getMultiEntityManager().getUserLegalEntitiesSize();
      if (singleEntityValue === "false") {
        this.view.flxLegalEntity.setEnabled(true);
        if (userLegalEntitesSize > 0) {
          this.view.flxLegalEntity.setVisibility(true);
          // this.view.flxVerticalSeperator4.setVisibility(true);
          this.view.tbxLESearch.onKeyUp = this.performSearch.bind(this);
          this.view.flxLECross.onClick = this.populateLEList.bind(this);
          this.view.flxLegalEntityDropdown.onClick = this.toggleLEDropdown.bind(this, this.view.flxSegLegalEntity, this.view.lblLegalEntityDropdownIcon);
          this.view.flxLegalEntityDropdown.onKeyPress = this.onKeyPressLEFlx;
          this.view.segLegalEntity.accessibilityConfig = {
            "a11yARIA": {
              "tabindex": -1
            }
          }
          if (userLegalEntitesSize === 1)
            this.view.flxLegalEntity.setEnabled(false);
          this.populateLEList();
        } else {
          this.view.flxLegalEntity.setVisibility(false);
          // this.view.flxVerticalSeperator4.setVisibility(false);
        }
      } else {
        this.view.flxLegalEntity.setVisibility(false);
        // this.view.flxVerticalSeperator4.setVisibility(false);
      }
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

    performSearch: function () {
      let scope = this;
      if (this.view.tbxLESearch.text.trim().length > 0) {
        this.view.flxLECross.isVisible = true;
        var entityData = this.view.segLegalEntity.info.data;
        var searchText = this.view.tbxLESearch.text.toLowerCase();
        var statusName = "";
        var filteredData = entityData.filter(function (rec) {
          statusName = rec.lblDescription.text.toLowerCase();
          if (statusName.indexOf(searchText) >= 0) return rec;
        });
        if (filteredData.length === 0) {
          this.view.segLegalEntity.setVisibility(false);
        } else {
          this.view.segLegalEntity.setVisibility(true);
          this.view.segLegalEntity.setData(filteredData);
        }
      } else {
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
            skin: 'ICSKNLbl42424215PxWordBreak'
          },
          "id": entityData.id,
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
      this.view.lblLegalEntityText.text = selectedEntityData && selectedEntityData ? selectedEntityData.companyName : "";
      this.view.lblLegalEntityDropdownIcon.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
      this.view.flxSegLegalEntity.setVisibility(false);
      this.view.forceLayout();
    },

    toggleLEDropdown: function (flx, lbl) {
      var segData = this.view.segLegalEntity.data;
      if (segData.length <= MIN_ENTITIES_RECORDS_TO_ALLOW_SEARCH) {
        this.view.flxLESearch.isVisible = false;
        this.view.flxSegLegalEntity.height = segData.length >= 3 ?  '150dp' : 50 * segData.length + 2 + 'dp';
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

    addTermsAndConditionsLegalEntityPopup: function () {
      let currForm = kony.application.getCurrentForm();
      if (!currForm.flxTermsAndConditionsLegalEntity) {
        var flxTermsAndConditionsLegalEntity = new kony.ui.FlexContainer({
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
          "skin": "sknflx000000op50",
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
          "a11yARIA": {
            "tabindex": 0
          }
        };
        currForm.tandcLegalEntity.btnCancelTAndC.onClick = scope.onClickOfCancelTAndCLegalEntity.bind(scope, flx, callback);
        currForm.tandcLegalEntity.btnAcceptTAndC.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": 0
          }
        };
        currForm.tandcLegalEntity.btnAcceptTAndC.onClick = scope.onClickOfAcceptTAndCLegalEntity.bind(scope, seg, flx, lbl, callback);
        currForm.flxTermsAndConditionsLegalEntity.setVisibility(true);
        currForm.forceLayout();
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
    },

    onClickOfCancelTAndCLegalEntity: function (flx, callback) {
      let scope = this;
      flx.setVisibility(false);
      scope.hideTermsAndConditionsLegalEntityPopup();
      callback();
    },

    handleMessageVisiblity: function () {
      var scope = this;
      var configurationManager = applicationManager.getConfigurationManager();
      scope.view.flxMessages.setVisibility(configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE));
    }

  };
});