define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function (CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();

  return {
    MIN_RECORDS_TO_ALLOW_SEARCH: 5,
    selectedRowIndex:0,
    selectedEntityData: {},
    userLegalEntitiesData: [],
 
    updateFormUI: function (viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.serverError) {
          this.showServerError(viewModel.serverError);
        } else {
          if (viewModel.isLoading !== undefined) {
            this.changeProgressBarState(viewModel.isLoading);
          } else if (viewModel.tnCResponse) {
            this.showTermsAndConditionsLegalEntityPopup(viewModel.tnCResponse);
          } else if (viewModel.updateDefaultEntityResponse) {
            this.showAcknowledgementScreen(viewModel.updateDefaultEntityResponse);
          }
        }
      }
    },
 
    init: function () {
      var self = this;
      this.view.preShow = this.preshow;
      this.view.postShow = this.postshow;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      this.setFlowActions();
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "EntityPreferences");
      this.view.onBreakpointChange = function () {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
    },
 
    preshow: function () {
      this.selectedEntityData = {};
      this.userLegalEntitiesData = applicationManager.getMultiEntityManager().getUserLegalEntitiesListArr();
      this.defaultEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
      this.view.flxRight.setVisibility(true);
      this.view.flxDialogs.setVisibility(false);
      this.view.flxDialogs.isModalContainer = false;
      this.view.flxTermsAndConditionLegalEntity.setVisibility(false);
      this.changeProgressBarState(true);
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile']);
      this.view.lblCollapseMobile.text = "O";
      this.view.customheadernew.activateMenu("Settings", "Profile Settings");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("PROFILESETTINGS", "EntityPreferences");
      this.setSelectedValue("i18n.Profile.EntityPreferences");
      this.view.TermsAndConditionLegalEntity.onKeyPress = this.onKeyPressCallBack;
      this.view.flxAccountSettingsCollapseMobile.onKeyPress= this.btnPressCallBack;
      this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
      this.setAccessibility();
     // this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
     // this.view.btnSave.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
     // this.view.btnEditPreference.toolTip = kony.i18n.getLocalizedString("i18n.Profile.EditPreferences");
    //  this.view.TermsAndConditionLegalEntity.btnAcceptTAndC.toolTip = kony.i18n.getLocalizedString("i18n.TradeFinance.Accept");
     // this.view.TermsAndConditionLegalEntity.btnCancelTAndC.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
      this.view.imgDisclaimer.src = "info_icon_blue.png";
      this.view.forceLayout();
    },
 
    postshow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.lblEntityPreferences.text = kony.i18n.getLocalizedString("i18n.Profile.EntityPreferences");
     // this.view.lblEntityPreferences.toolTip = kony.i18n.getLocalizedString("i18n.Profile.EntityPreferences");
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      if (this.defaultEntity)
        this.setDataToSegment();
      else
        this.setDataDefaultEntityNotSelected();
      this.changeProgressBarState(false);
      this.view.forceLayout();
      this.view.TermsAndConditionLegalEntity.doLayout = CommonUtilities.centerPopupFlex;
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.lblEntityPreferences.setActive(true);
      this.view.segEntityList.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR
    },
    onKeyPressCallBack: function(eventObject, eventPayload) {
      var self = this;
      if (eventPayload.keyCode === 27) {
          if (self.view.flxTermsAndConditionLegalEntity.isVisible === true) {
              self.view.flxTermsAndConditionLegalEntity.isVisible = false;
              self.view.flxDialogs.isVisible = false;
              self.view.btnSave.setFocus(true);
          }
          if (self.view.flxLogout.isVisible === true) {
              self.view.flxLogout.isVisible = false;
              self.view.flxDialogs.isVisible = false;
            //  self.view.customheadernew.btnLogout.setFocus(true);
          self.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
        }
      }
  },
  btnPressCallBack: function(eventObject, eventPayload) {
    if (eventPayload.keyCode === 27) {
              if(this.view.lblCollapseMobile.text === "P") {
           this.view.lblCollapseMobile.text = "O";
                this.view.flxLeft.setVisibility(false);
                this.view.flxRight.setVisibility(true);
        //this.view.flxAccountSettingsCollapseMobile.setActive(true);;
                this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                    a11yARIA: {
                        "aria-labelledby": "lblAccountSettingsMobile",
                        "aria-expanded": false,
                        "tabindex": 0,
                        "role": "button"
                    }
                }
           this.view.flxAccountSettingsCollapseMobile.setActive(true);
        }
    }
        if ( eventPayload.keyCode === 9 && eventPayload.shiftKey ) {
          if(this.view.lblCollapseMobile.text === "P") {
           this.view.lblCollapseMobile.text = "O";
                this.view.flxLeft.setVisibility(false);
                this.view.flxRight.setVisibility(true);
        //this.view.flxAccountSettingsCollapseMobile.setActive(true);;
                this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                    a11yARIA: {
                        "aria-labelledby": "lblAccountSettingsMobile",
                        "aria-expanded": false,
                        "tabindex": 0,
                        "role": "button"
                    }
                }
                eventPayload.preventDefault();
           this.view.flxAccountSettingsCollapseMobile.setActive(true);
           }
        }
       
         },
    /**
    * *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
    *  Method to set the text in mobile breakpoint
    */
    setSelectedValue: function (text) {
      var self = this;
      CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text), CommonUtilities.getaccessibilityConfig());
    },
 
    /**
    **  Method to set ui for the component in mobile breakpoint
    */
    toggleMenuMobile: function () {
      if (this.view.lblCollapseMobile.text === "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text = "O";
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
      }
    },
 
    /**
    *  Method to set the Accessibility configurations
    */
 
   
    setAccessibility: function () {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.customheadernew.lblAccounts.toolTip = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
      CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
      this.view.lblCollapseMobile.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        }
      };
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
        "a11yLabel": "Dropdown"
      };
      this.view.flxLECross.accessibilityConfig = {
        "a11yLabel": "clear search",
        "a11yARIA": {
          "role": "button",
          "tabindex": 0
        }
      };
      this.view.btnEditPreference.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": 0
        }
      };
      this.view.TermsAndConditionLegalEntity.btnCancelTAndC.accessibilityConfig = {
        "a11yLabel": "Reject terms and conditions",
                "a11yARIA": {
                    "tabindex": 0
                }
            };
            this.view.TermsAndConditionLegalEntity.btnAcceptTAndC.accessibilityConfig = {
        "a11yLabel": "Accept terms and conditions",
                "a11yARIA": {
                    "tabindex": 0
                }
            };
            this.view.btnSave.accessibilityConfig = {
        "a11yLabel": "Update entity preferences",
                "a11yARIA": {
                    "tabindex": 0
                }
            };
            this.view.btnCancel.accessibilityConfig = {
        "a11yLabel": "Cancel edit entity preferences process",
                "a11yARIA": {
                    "tabindex": 0
        }
      };
    },
 
    /**
    * *@param {Boolean} isLoading- True or false to show/hide the progess bar
    *  Method to set show/hide the progess bar
    */
    changeProgressBarState: function (isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
 
    setFlowActions: function () {
      var scopeObj = this;
      scopeObj.view.btnEditPreference.onClick = this.onEditPreferenceClick;
      scopeObj.view.btnCancel.onClick = function () {
        scopeObj.setDataToSegment();
        scopeObj.view.btnEditPreference.setActive(true);
      };
      scopeObj.view.btnSave.onClick = this.getTermsAndConditions;
      scopeObj.view.btnBackToPreferences.onClick = function () {
        scopeObj.setDataToSegment();
        scopeObj.view.lblEntityPreferences.setActive(true);
      };
      scopeObj.view.TermsAndConditionLegalEntity.btnAcceptTAndC.onClick = scopeObj.onClickofAcceptTermsAndConditionLegalEntity.bind(this);
      scopeObj.view.TermsAndConditionLegalEntity.btnCancelTAndC.onClick = scopeObj.onClickofCancelTermsAndConditionLegalEntity.bind(this);
      scopeObj.view.TermsAndConditionLegalEntity.flxClose.onClick = scopeObj.onClickofCancelTermsAndConditionLegalEntity.bind(this);
 
      scopeObj.view.txtSearch.onKeyUp = this.performSearch;
      scopeObj.view.flxLECross.onClick = function () {
        scopeObj.view.txtSearch.text = "";
        scopeObj.view.flxLECross.isVisible = false;
        scopeObj.onEditPreferenceClick();
      }
    },
 
    setDataToSegment: function () {
      var scopeObj = this;
      let userLegalEntitesSize = applicationManager.getMultiEntityManager().getUserLegalEntitiesSize();
      let userLegalEntitiesListObj = applicationManager.getMultiEntityManager().getUserLegalEntitiesListObj();
 
      scopeObj.view.flxBacktoPreferencesContainer.setVisibility(false);
      scopeObj.view.flxChangeEntityWrapper.setVisibility(true);
 
      scopeObj.view.flxDisclaimer.setVisibility(false);
      scopeObj.view.flxEntitiesHeader.setVisibility(false);
      scopeObj.view.flxButtons.setVisibility(false);
      scopeObj.view.btnEditPreference.setVisibility(true);
      scopeObj.view.lblEntityPreferences.text =  kony.i18n.getLocalizedString("i18n.Profile.EntityPreferences");
      if (userLegalEntitesSize === 1)
        scopeObj.view.btnEditPreference.setVisibility(false);
 
      scopeObj.view.btnSave.setEnabled(false);
      scopeObj.view.btnSave.skin = "sknBtn293276radius3";
     
      let data = [];
      let segEntityListHeight;
      let userLegalEntities = scopeObj.userLegalEntitiesData;
 
      for (let index = 0; index < userLegalEntities.length; index++) {
        let rowData = {};
        rowData.flxImage = {
          "isVisible": false,
          "accessibilityConfig": {
            "a11yLabel": "text",
                                "a11yARIA": {
                                    "role": "radio",
                                    "aria-labelledby": "lblEntityName",
                                    "aria-checked": scopeObj.defaultEntity && scopeObj.defaultEntity === userLegalEntities[index].id ? true : false
                                }
                            },
        };
        rowData.lblEntityName = {
          "text": userLegalEntities[index].companyName
        };
        rowData.flxDefaultEntity = {
          "isVisible": scopeObj.defaultEntity && scopeObj.defaultEntity === userLegalEntities[index].id ? true : false
        };
        rowData.lblSeperator = {
          "isVisible": (index === userLegalEntities.length - 1) ? false : true
        };
        rowData.legalEntityId = userLegalEntities[index].id;
        data.push(rowData);
      }
 
      scopeObj.view.segEntityList.rowTemplate = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxProfileManagementDefaultEntityMobile" : "flxProfileManagementDefaultEntity";
      scopeObj.view.segEntityList.removeAll();
      scopeObj.view.segEntityList.setEnabled(false);
 
      if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
        segEntityListHeight = data.length < 9 ? (data.length * 53) : (9 * 53);
        if (userLegalEntitiesListObj && Object.keys(userLegalEntitiesListObj).length > 0 && userLegalEntitiesListObj[scopeObj.defaultEntity])
          segEntityListHeight = segEntityListHeight + 20;
      } else
        segEntityListHeight = data.length < 10 ? (data.length * 60) : (10 * 60)
 
      scopeObj.view.segEntityList.height = segEntityListHeight + "dp";
      scopeObj.view.flxEntityList.height = scopeObj.view.flxEntitiesHeader.isVisible ? (55 + segEntityListHeight) + "dp" : segEntityListHeight + "dp";
      scopeObj.view.segEntityList.widgetDataMap = scopeObj.widgetDataMap();
      scopeObj.view.segEntityList.setData(data);
    },
 
    setDataDefaultEntityNotSelected: function () {
      var scopeObj = this;
 
      scopeObj.view.flxNoRecords.setVisibility(false);
      scopeObj.view.segEntityList.setVisibility(true);
      scopeObj.view.flxDisclaimer.setVisibility(true);
      scopeObj.view.flxEntitiesHeader.setVisibility(true);
      scopeObj.view.btnEditPreference.setVisibility(false);
      scopeObj.view.flxBacktoPreferencesContainer.setVisibility(false);
      scopeObj.view.flxChangeEntityWrapper.setVisibility(true);
 
      scopeObj.view.flxButtons.setVisibility(true);
      scopeObj.view.btnSave.setEnabled(false);
      scopeObj.view.btnSave.text = kony.i18n.getLocalizedString("i18n.Profile.SetAsDefault");
      //scopeObj.view.btnSave.toolTip = kony.i18n.getLocalizedString("i18n.Profile.SetAsDefault");
      scopeObj.view.btnCancel.setVisibility(false);
      scopeObj.view.btnSave.skin = "sknBtnE2E9F0radius2";
 
      let data = [];
      let segEntityListHeight;
      let userLegalEntities = scopeObj.userLegalEntitiesData;
      let userLegalEntitiesListObj = applicationManager.getMultiEntityManager().getUserLegalEntitiesListObj();
 
      for (let index = 0; index < userLegalEntities.length; index++) {
        let rowData = {};
        rowData.flxImage = {
          "isVisible": true,
          "accessibilityConfig": {
            "a11yARIA": {
                "role": "radio",
                "aria-labelledby": "lblEntityName",
                "aria-checked": scopeObj.defaultEntity && scopeObj.defaultEntity === userLegalEntities[index].id ? true : false
            }
         },
        };
        rowData.imgRadioBtn = {
          "src": "radiounselectedblue.png"
        };
        rowData.lblEntityName = {
          "text": userLegalEntities[index].companyName
        };
        rowData.flxDefaultEntity = {
          "isVisible": scopeObj.defaultEntity && scopeObj.defaultEntity === userLegalEntities[index].id ? true : false
        };
        rowData.lblSeperator = {
          "isVisible": (index === userLegalEntities.length - 1) ? false : true
        };
        rowData.legalEntityId = userLegalEntities[index].id;
        data.push(rowData);
      }
 
      if (data.length > scopeObj.MIN_RECORDS_TO_ALLOW_SEARCH) {
        scopeObj.view.flxSearch.setVisibility(true);
        scopeObj.view.txtSearch.text = "";
        scopeObj.view.flxLECross.isVisible = false;
      }
      else {
        scopeObj.view.flxSearch.setVisibility(false);
      }
 
      scopeObj.view.segEntityList.removeAll();
      scopeObj.view.segEntityList.setEnabled(true);
      scopeObj.view.segEntityList.rowTemplate = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxProfileManagementDefaultEntityMobile" : "flxProfileManagementDefaultEntity";
 
      if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
        segEntityListHeight = data.length < 7 ? (data.length * 53) : (7 * 53);
        if (userLegalEntitiesListObj && Object.keys(userLegalEntitiesListObj).length > 0 && userLegalEntitiesListObj[scopeObj.defaultEntity])
          segEntityListHeight = segEntityListHeight + 20;
      } else
        segEntityListHeight = data.length < 7 ? (data.length * 60) : (7 * 60);
 
      scopeObj.view.segEntityList.height = segEntityListHeight + "dp";
      scopeObj.view.flxEntityList.height = scopeObj.view.flxEntitiesHeader.isVisible ? (58 + segEntityListHeight) + "dp" : segEntityListHeight + "dp";
      scopeObj.view.segEntityList.widgetDataMap = scopeObj.widgetDataMap();
      scopeObj.view.segEntityList.setData(data);
      scopeObj.view.segEntityList.onRowClick = scopeObj.onEntityRowClick;
    },
 
    onEditPreferenceClick: function () {
      var scopeObj = this;
 
      scopeObj.view.flxBacktoPreferencesContainer.setVisibility(false);
      scopeObj.view.flxChangeEntityWrapper.setVisibility(true);
 
      scopeObj.view.flxNoRecords.setVisibility(false);
      scopeObj.view.segEntityList.setVisibility(true);
      scopeObj.view.segEntityList.removeAll();
      scopeObj.view.segEntityList.setEnabled(true);
 
      scopeObj.view.flxDisclaimer.setVisibility(true);
      scopeObj.view.flxEntitiesHeader.setVisibility(true);
      scopeObj.view.flxButtons.setVisibility(true);
      scopeObj.view.btnEditPreference.setVisibility(false);
 
      scopeObj.view.btnCancel.setVisibility(true);
      scopeObj.view.btnSave.setVisibility(true);
      scopeObj.view.lblEntityPreferences.text = kony.i18n.getLocalizedString("i18n.Profile.EditEntityPreferences");
      scopeObj.view.btnSave.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
      scopeObj.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
 
      let data = [];
      let segEntityListHeight;
      let selectedOption;
      let userLegalEntities = scopeObj.userLegalEntitiesData;
      let userLegalEntitiesListObj = applicationManager.getMultiEntityManager().getUserLegalEntitiesListObj();
 
      for (let index = 0; index < userLegalEntities.length; index++) {
        let rowData = {};
		scopeObj.selectedRowIndex = scopeObj.defaultEntity && scopeObj.defaultEntity === userLegalEntities[index].id ? index : scopeObj.selectedRowIndex;
        rowData.flxImage = {
          "isVisible": true,
          "accessibilityConfig": {
                                "a11yARIA": {
                      "tabindex": 0,
                                    "role": "radio",
                                    "aria-labelledby": "lblEntityName",
                                    "aria-checked": scopeObj.defaultEntity && scopeObj.defaultEntity === userLegalEntities[index].id ? true : false
                                }
                            },
        };
        rowData.imgRadioBtn = {
          "src": scopeObj.defaultEntity && scopeObj.defaultEntity === userLegalEntities[index].id ? "radioselected.png" : "radiounselectedblue.png"
        };
        rowData.lblEntityName = {
          "text": userLegalEntities[index].companyName
        };
        rowData.flxDefaultEntity = {
          "isVisible": scopeObj.defaultEntity && scopeObj.defaultEntity === userLegalEntities[index].id ? true : false
        };
        rowData.lblSeperator = {
          "isVisible": (index === userLegalEntities.length - 1) ? false : true
        };
        rowData.legalEntityId = userLegalEntities[index].id;
        if (scopeObj.defaultEntity && scopeObj.defaultEntity === userLegalEntities[index].id) {
          selectedOption = index;
        }
        data.push(rowData);
      }
 
      if (data.length > scopeObj.MIN_RECORDS_TO_ALLOW_SEARCH) {
        scopeObj.view.flxSearch.setVisibility(true);
        scopeObj.view.txtSearch.text = "";
        scopeObj.view.flxLECross.isVisible = false;
      }
      else {
        scopeObj.view.flxSearch.setVisibility(false);
      }
 
      if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
        segEntityListHeight = data.length < 7 ? (data.length * 53) : (7 * 53);
        if (userLegalEntitiesListObj && Object.keys(userLegalEntitiesListObj).length > 0 && userLegalEntitiesListObj[scopeObj.defaultEntity])
          segEntityListHeight = segEntityListHeight + 20;
      } else
        segEntityListHeight = data.length < 7 ? (data.length * 60) : (7 * 60);
 
      scopeObj.view.segEntityList.height = segEntityListHeight + "dp";
      scopeObj.view.flxEntityList.height = scopeObj.view.flxEntitiesHeader.isVisible ? (58 + segEntityListHeight) + "dp" : segEntityListHeight + "dp";
 
      scopeObj.view.segEntityList.rowTemplate = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxProfileManagementDefaultEntityMobile" : "flxProfileManagementDefaultEntity";
      scopeObj.view.segEntityList.widgetDataMap = scopeObj.widgetDataMap();
      scopeObj.view.segEntityList.setData(data);
 
      if (scopeObj.selectedEntityData.legalEntityId) {
        data.forEach((entityData, index) => {
          if (entityData.legalEntityId === scopeObj.selectedEntityData.legalEntityId) {
            scopeObj.view.segEntityList.selectedRowIndex = [0, index];
          }
        });
      } else if (selectedOption !== null && selectedOption !== undefined && selectedOption !== "") {
        scopeObj.view.segEntityList.selectedRowIndex = [0, selectedOption];
      }
      scopeObj.view.segEntityList.info = { "data": scopeObj.view.segEntityList.data };
      scopeObj.view.segEntityList.onRowClick = scopeObj.onEntityRowClick;
      scopeObj.enableDisableButton();
      scopeObj.view.lblEntityPreferences.setActive(true);
    },
 
    widgetDataMap: function () {
      let dataMap = {
        flxImage: "flxImage",
        imgRadioBtn: "imgRadioBtn",
        lblEntityName: "lblEntityName",
        flxDefaultEntity: "flxDefaultEntity",
        lblDefaultEntity: "lblDefaultEntity",
        lblSeperator: "lblSeperator",
        legalEntityId: "legalEntityId"
      };
      return dataMap;
    },
 
    onEntityRowClick: function (a,b,c,d) {
          var scopeObj = this;
          if (scopeObj.view.segEntityList.selectedRowIndex !== null) {
            scopeObj.selectedEntityData = scopeObj.view.segEntityList.data[c];
          }
          var rowdata = scopeObj.view.segEntityList.data[c];
                if(rowdata.imgRadioBtn.src !== "radioselected.png" ) {
                    rowdata.imgRadioBtn.src = "radioselected.png"
                rowdata.flxImage.accessibilityConfig = {
                    "a11yARIA": {
                                          "tabindex": 0,
                                        "role": "radio",
                                        "aria-labelledby": "lblEntityName",
                                       "aria-checked": true
                                    },
                }
                scopeObj.view.segEntityList.setDataAt(rowdata,c,b);
          scopeObj.selectedRowIndex=c;
                }
          for ( var i=0; i<scopeObj.view.segEntityList.data.length; i++) {
                    if (i !==c) {
                        var rowdata = scopeObj.view.segEntityList.data[i];
                    rowdata.imgRadioBtn.src = "radiounselectedblue.png";
                rowdata.flxImage.accessibilityConfig = {
                    "a11yARIA": {
                                          "tabindex": 0,
                                        "role": "radio",
                                        "aria-labelledby": "lblEntityName",
                                       "aria-checked": false
                                    },
                }
                scopeObj.view.segEntityList.setDataAt(rowdata,i,b);
                    }
                }
          scopeObj.enableDisableButton();
          scopeObj.view.segEntityList.setActive(c,b,"flxProfileManagementDefaultEntity.flxRow.flxContainer.flxImage");
        },
		
    enableDisableButton: function () {
      var scopeObj = this;
      if (scopeObj.defaultEntity && scopeObj.selectedEntityData.legalEntityId && scopeObj.defaultEntity !== scopeObj.selectedEntityData.legalEntityId) {
        scopeObj.view.btnSave.setEnabled(true);
        scopeObj.view.btnSave.skin = "sknBtn0273e3Border0273e3pxOp100Radius2px";
      } else if (scopeObj.defaultEntity && scopeObj.selectedEntityData.legalEntityId && scopeObj.defaultEntity === scopeObj.selectedEntityData.legalEntityId) {
        scopeObj.view.btnSave.setEnabled(false);
        scopeObj.view.btnSave.skin = "sknBtnE2E9F0radius2";
      } else if (!scopeObj.defaultEntity && scopeObj.selectedEntityData.legalEntityId) {
        scopeObj.view.btnSave.setEnabled(true);
        scopeObj.view.btnSave.skin = "sknBtn0273e3Border0273e3pxOp100Radius2px";
      }
    },
 
    onClickofAcceptTermsAndConditionLegalEntity: function () {
      let scopeObj = this;
      let params = {};
      let selectedEntityRowData = scopeObj.view.segEntityList.data[scopeObj.selectedRowIndex];
      if (selectedEntityRowData) {
        params = {
          "flowType": OLBConstants.TNC_FLOW_TYPES.Login_TnC,
          "selectedLegalEntityId": selectedEntityRowData.legalEntityId
        };
        FormControllerUtility.showProgressBar(this.view);
        var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "SettingsNewUIModule",
          "appName": "ManageProfileMA"
        });
        profileModule.presentationController.createTnC(params);
      }
    },
    updateDefaultEntity: function () {
      var scopeObj = this;
      let selectedEntityRowData = scopeObj.view.segEntityList.data[scopeObj.selectedRowIndex];
      if (selectedEntityRowData && selectedEntityRowData.legalEntityId !== scopeObj.defaultEntity) {
        FormControllerUtility.showProgressBar(this.view);
        var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "SettingsNewUIModule",
          "appName": "ManageProfileMA"
        });
        profileModule.presentationController.updateDefaultEntity(selectedEntityRowData.legalEntityId);
      }
    },
 
    showTermsAndConditionsLegalEntityPopup: function (tnCResponse) {
      var scopeObj = this;
      if (tnCResponse.alreadySigned) {
        scopeObj.updateDefaultEntity();
      } else {
        this.view.flxDialogs.setVisibility(true);
        this.view.flxDialogs.isModalContainer = true;
        this.view.flxLogout.setVisibility(false);
        this.view.flxTermsAndConditionLegalEntity.setVisibility(true);
        //this.view.TermsAndConditionLegalEntity.flxClose.setActive(true);
        this.view.TermsAndConditionLegalEntity.TermsAndConditionBody.text = tnCResponse.termsAndConditionsContent;
        this.view.forceLayout();
        FormControllerUtility.hideProgressBar(this.view);
        this.view.TermsAndConditionLegalEntity.lblHeading.setActive(true);
      }
    },
 
    showAcknowledgementScreen: function (response) {
      var scopeObj = this;
      if (response && response.customer[0].defaultLegalEntity) {
        scopeObj.defaultEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
        let selectedEntityRowData = scopeObj.view.segEntityList.data.find(entityData => entityData.legalEntityId === scopeObj.defaultEntity);
        let defEntityName = selectedEntityRowData.lblEntityName.text;
        scopeObj.hideTermsAndConditionsLegalEntityPopup();
        scopeObj.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.Profile.EntityPreferences.defaultEntityUpdateSuccessMsg").replace("%field%", defEntityName);
        scopeObj.view.flxBacktoPreferencesContainer.setVisibility(true);
        scopeObj.view.flxChangeEntityWrapper.setVisibility(false);
        FormControllerUtility.hideProgressBar(this.view);
      }
      scopeObj.view.lblEntityPreferencesTitle.setActive(true);
    },
 
    hideTermsAndConditionsLegalEntityPopup: function () {
      var scopeObj = this;
      scopeObj.view.flxDialogs.setVisibility(false);
      scopeObj.view.flxDialogs.isModalContainer = false;
      scopeObj.view.flxTermsAndConditionLegalEntity.setVisibility(false);
    },
 
    getTermsAndConditions: function () {
      FormControllerUtility.showProgressBar(this.view);
      let selectedEntityRowData = this.view.segEntityList.data[this.selectedRowIndex];
      var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "SettingsNewUIModule", "appName": "ManageProfileMA" });
      profileModule.presentationController.getTncContent(OLBConstants.TNC_FLOW_TYPES.Login_TnC, selectedEntityRowData.legalEntityId);
    },
 
    onClickofCancelTermsAndConditionLegalEntity: function () {
      let scopeObj = this;
      scopeObj.hideTermsAndConditionsLegalEntityPopup();
      scopeObj.view.btnSave.setFocus(true);
    },
 
    performSearch: function () {
      var scopeObj = this;
      let segEntityListHeight;
      if (this.view.txtSearch.text.trim().length > 0) {
        this.view.flxLECross.isVisible = true;
        var entityData = scopeObj.view.segEntityList.info.data;
        var searchText = this.view.txtSearch.text.toLowerCase();
        var statusName = "";
        var filteredData = entityData.filter(function (rec) {
          statusName = rec.lblEntityName.text.toLowerCase();
          if (statusName.indexOf(searchText) >= 0) return rec;
        });
        if (filteredData.length === 0) {
          this.view.segEntityList.setVisibility(false);
          this.view.flxNoRecords.setVisibility(true);
          this.view.flxButtons.setVisibility(false);
        } else {
          this.view.flxNoRecords.setVisibility(false);
          this.view.segEntityList.setVisibility(true);
          this.view.flxButtons.setVisibility(true);
 
          if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
            segEntityListHeight = filteredData.length < 7 ? (filteredData.length * 53) : (7 * 53);
            if (userLegalEntitiesListObj && Object.keys(userLegalEntitiesListObj).length > 0 && userLegalEntitiesListObj[scopeObj.defaultEntity])
              segEntityListHeight = segEntityListHeight + 20;
          } else
            segEntityListHeight = filteredData.length < 7 ? (filteredData.length * 60) : (7 * 60);
 
          scopeObj.view.segEntityList.height = segEntityListHeight + "dp";
          scopeObj.view.flxEntityList.height = scopeObj.view.flxEntitiesHeader.isVisible ? (58 + segEntityListHeight) + "dp" : segEntityListHeight + "dp";
 
          this.view.segEntityList.setData(filteredData);
 
          filteredData.forEach((entityData, index) => {
            if (entityData.legalEntityId === this.selectedEntityData.legalEntityId) {
              scopeObj.view.segEntityList.selectedRowIndex = [0, index];
            }
          });
 
          scopeObj.enableDisableButton();
        }
      } else {
        scopeObj.onEditPreferenceClick();
      }
      this.view.forceLayout();
    },
 
    /**
    * onBreakpointChange : Handles ui changes on .
    * @param {integer} width - current browser width
    * @return {}
    * @throws {}
    */
    onBreakpointChange: function (width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
      }
      this.view.forceLayout();
    },
 
  };
});