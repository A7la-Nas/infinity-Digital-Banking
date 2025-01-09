define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
      selectedRow: 0,
      flowtype: null,
	  disabledEntities: null,
      entityList: null,
      updateFormUI: function(viewModel) {
        if (viewModel !== undefined) {
          if (viewModel.eBankingAccessLanding){this.showEBankingAccess(viewModel.eBankingAccessLanding);}
          if(viewModel.termsAndConditionsContent){
            this.setTncContent(viewModel.termsAndConditionsContent);
          }
          if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);  
        }
        this.view.lblEBamkingAccessHeader.setActive(true);
      },
    preShow: function () {
      scopeObj = this;
      document.addEventListener('keydown', function (event) {
        if(event.which === 27 && scopeObj.view.flxLogout.isVisible===true){
          scopeObj.view.flxLogout.setVisibility(false);
          scopeObj.view.flxDialogs.setVisibility(false);
          scopeObj.view.customheadernew.btnLogout.setFocus(true);       
        }
        else if(event.which === 27 && scopeObj.view.flxDeletePopUp.isVisible===true){
          scopeObj.view.flxDeletePopUp.setVisibility(false);
          scopeObj.view.flxDialogs.setVisibility(false);
          var data = scopeObj.view.segListOfEntities.data;
          for (var selectedIndex = 0; selectedIndex < data.length; selectedIndex++) {
            if (data[selectedIndex].imgSelect.src === "activecheckbox.png") {
              break;
            }
          }
          scopeObj.resetSelectedEntities();
          scopeObj.view.segListOfEntities.setActive(selectedIndex, 0, "flxEBankingListOfEntities.flxMainWrapper.flxSelect");
          scopeObj.view.forceLayout();
        }
      });
        this.view.flxRight.setVisibility(true);
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
        this.view.lblCollapseMobile.text  = "O";
        this.view.customheadernew.activateMenu("Settings","Profile Settings");
        this.view.profileMenu.checkLanguage();
        this.view.profileMenu.activateMenu("PROFILESETTINGS","eBankingAccess");
        this.setSelectedValue("i18n.profile.eBankingAccess");
        this.entityList=undefined;
		this.view.tbxSearchBox.onTextChange = this.searchEntity;
		this.view.flxClearSearch.onTouchStart = this.clearSearch;
        this.setAccessibility();
        this.view.flxLogout.onKeyPress = this.onKeyPressCallbackLogout;
        this.view.flxTermsAndConditions.onKeyPress = this.onKeyPressCallbackTnC;
        this.view.flxDelete.doLayout = CommonUtilities.centerPopupFlex;
        this.view.forceLayout();
      },

      onKeyPressCallbackLogout: function (eventObject, eventPayload) {
        var scopeObj = this;
        if (eventPayload.keyCode === 27) {
          if (scopeObj.view.flxDialogs.isVisible === true) {
            scopeObj.view.flxDialogs.setVisibility(false);
            scopeObj.view.flxLogout.setVisibility(false);
            scopeObj.view.customheadernew.btnLogout.setActive(true);
          }
        }
      }, 

      onKeyPressCallbackTnC: function (eventObject, eventPayload) {
        var scopeObj = this;
        if (eventPayload.keyCode === 27) {
          if (scopeObj.view.flxDialogs.isVisible === true) {
            scopeObj.view.flxDialogs.setVisibility(false);
            scopeObj.view.flxTermsAndConditions.setVisibility(false);
            if(scopeObj.view.segListOfEntities.isVisible){
              scopeObj.view.segListOfEntities.setActive(selectedRow,0,"flxEBankingListOfEntities.flxMainWrapper.flxTnC.btnTnC");
          }
          else{
          scopeObj.view.btnTermsAndConditionsEbankingaccess.setActive(true);
          }
          }
        }
      }, 

      init:function(){
        var self=this;
        applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
        this.view.preShow=this.preShow;
        this.view.postShow=this.postShow;
        this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
        this.view.onBreakpointChange = function() {
          self.onBreakpointChange(kony.application.getCurrentBreakpoint());
        };
        this.setFlowActions();
      },
      /**
      * *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
      *  Method to set the text in mobile breakpoint
      */
      setSelectedValue: function (text) {
       var self = this;
       self.view.lblAccountSettingsMobile.text=kony.i18n.getLocalizedString(text);
      //CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text) , CommonUtilities.getaccessibilityConfig());
      },
      setTncContent: function(TncContent){
        var scopeObj = this; 
        this.view.flxDialogs.setVisibility(true);
        scopeObj.view.flxDialogs.isModalContainer = true;
        this.view.flxTermsAndConditions.setVisibility(true);
        this.view.forceLayout();
        FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, TncContent);
        FormControllerUtility.hideProgressBar(this.view);
        this.view.btnClose.onClick= function(){
          scopeObj.view.flxDialogs.isModalContainer = false;
          scopeObj.view.flxTermsAndConditions.setVisibility(false);   
          scopeObj.view.flxDialogs.setVisibility(false);
          if (scopeObj.view.segListOfEntities.isVisible) {
            scopeObj.view.segListOfEntities.setActive(selectedRow, 0, "flxEBankingListOfEntities.flxMainWrapper.flxTnC.btnTnC");
          }
          else {
            scopeObj.view.btnTermsAndConditionsEbankingaccess.setActive(true);
          }
        };
        this.view.lblTermsAndConditions.setActive(true);
      },
      /**
      *  Method to set the Accessibility configurations
      */
    setAccessibility: function() {
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": this.view.lblEBamkingAccessHeader.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
      };
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig={
        "a11yARIA": {
          "aria-expanded": false,
           role: "button",
           "aria-labelledby":"lblAccountSettingsMobile"
        }
      }
      this.view.flxCheckbox.accessibilityConfig = {
        "a11yLabel": this.view.lblAgree.text + " " + this.view.btnTermsAndConditionsEbankingaccess.text,
        "a11yARIA": {
          "aria-checked": "false",
          role: "checkbox",
          "aria-required": true
        }
      };
      this.view.flxImgCheckBox.accessibilityConfig =
      {
        "a11yARIA": {
          "aria-checked": false,
          "aria-labelledby": "lblSelectAll",
          "role": "checkbox",
          "tabindex": 0
        }
      }
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        // this.view.btnTermsAndConditionsEbankingaccess.toolTip = kony.i18n.getLocalizedString("i18n.common.TnC");
        // this.view.btnEBankingAccessSave.toolTip = kony.i18n.getLocalizedString("i18n.profile.eBankingDisable");
        // this.view.customheadernew.lblAccounts.toolTip=kony.i18n.getLocalizedString("i18n.topmenu.accounts");
      this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
       // CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
        //CommonUtilities.setText(this.view.lblEBamkingAccessHeader, kony.i18n.getLocalizedString("i18n.profile.eBankingAccess"), accessibilityConfig);
        //CommonUtilities.setText(this.view.lblEBankingAccessNotification, kony.i18n.getLocalizedString("i18n.profile.eBankingDescription"), accessibilityConfig);
        //CommonUtilities.setText(this.view.lblRulesEBankingAcces, kony.i18n.getLocalizedString("i18n.profile.pleaseNote"), accessibilityConfig);
        //CommonUtilities.setText(this.view.lblSecurityRuleEBA1, kony.i18n.getLocalizedString("i18n.profile.eBankingTandC"), accessibilityConfig);
        //CommonUtilities.setText(this.view.lblSecurityRuleEBA2, kony.i18n.getLocalizedString("i18n.logout.reachOutBank"), accessibilityConfig);
        //CommonUtilities.setText(this.view.lblAgree, kony.i18n.getLocalizedString("i18n.ProfileManagement.IAccept"), accessibilityConfig);
      this.view.btnTermsAndConditionsEbankingaccess.text = kony.i18n.getLocalizedString("i18n.common.TnC");
      // CommonUtilities.setText(this.view.btnTermsAndConditionsEbankingaccess, kony.i18n.getLocalizedString("i18n.common.TnC"), accessibilityConfig);
        //CommonUtilities.setText(this.view.btnEBankingAccessSave, kony.i18n.getLocalizedString("i18n.profile.eBankingDisable"), accessibilityConfig);    
        //CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
        this.view.btnEBankingAccessSave.accessibilityConfig = {
           "a11yLabel": "Disable ebanking access for selected entities"
        };
      //   this.view.imgClose.accessibilityConfig = {
      //      "a11yLabel": kony.i18n.getLocalizedString("i18n.common.close")
      //   }
      //   this.view.lblCollapseMobile.accessibilityConfig = {
      //     "a11yARIA": {
      //         "tabindex": -1
      //     }
      //   };
      //   this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
      //     "a11yLabel": "Dropdown"
      //   };
      //   this.view.flxCheckbox.accessibilityConfig = {
      //     "a11yARIA" :{
      //       "role":"checkbox"
      //     },
      //   };
      }, 
      onBreakpointChange: function (width) {
        FormControllerUtility.setupFormOnTouchEnd(width);
        responsiveUtils.onOrientationChange(this.onBreakpointChange);
        this.view.customheadernew.onBreakpointChangeComponent(width);
        this.view.customfooternew.onBreakpointChangeComponent(width);
        this.view.profileMenu.onBreakpointChangeComponent(width);
        orientationHandler.onOrientationChange(this.onBreakpointChange);
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          this.view.customheadernew.lblHeaderMobile.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
          //CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
          this.view.flxLogout.top = "50dp";
          this.view.flxDelete.height = "400dp";
        }
        this.view.forceLayout();      
      },
      disableButton: function(button) {
        button.setEnabled(false);
        button.skin = "sknBtnBlockedSSPFFFFFF15Px";
      },

      enableButton: function(button) {
        button.setEnabled(true);
        button.skin = "sknBtnNormalSSPFFFFFF15Px";
      },

      setFlowActions:function(){
        var scopeObj=this;
        //this.view.flxCheckbox.onClick=this.toggleTnC.bind(scopeObj,scopeObj.view.lblRememberMeIcon);
        this.view.btnEBankingAccessSave.onClick = this.setDisableEntitiesPopUp;
        this.view.btnTermsAndConditionsEbankingaccess.onClick= scopeObj.showTermsAndConditionsForEBA.bind(scopeObj);
      },
      
      showTermsAndConditionsForEBA: function(scope, row){
        if (row) {
          selectedRow = row.rowIndex || 0;
        }
        FormControllerUtility.showProgressBar(this.view);
        var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"});
        profileModule.presentationController.getTncContent();
      },
      /**
      *  Method to set ui for the component in mobile breakpoint
      */
      toggleMenuMobile: function () {
        if (this.view.lblCollapseMobile.text === "O") {
          this.view.lblCollapseMobile.text = "P";
          this.view.flxLeft.setVisibility(true);
          this.view.flxRight.setVisibility(false);
          this.view.flxAccountSettingsCollapseMobile.accessibilityConfig={
            "a11yARIA": {
              "aria-expanded": true,
               role: "button",
               "aria-labelledby":"lblAccountSettingsMobile"
            }
          }
        } else {
          this.view.lblCollapseMobile.text  = "O";
          this.view.flxLeft.setVisibility(false);
          this.view.flxRight.setVisibility(true);
          this.view.flxAccountSettingsCollapseMobile.accessibilityConfig={
            "a11yARIA": {
              "aria-expanded": false,
               role: "button",
               "aria-labelledby":"lblAccountSettingsMobile"
            }
          }
        }
      }, 
      showEBankingAccess: function(entities){
        var self=this;
        var scopObj= this;
        scopObj.disableButton(scopObj.view.btnEBankingAccessSave);
        this.view.lblEBamkingAccessHeader.text = kony.i18n.getLocalizedString("i18n.profile.eBankingAccess");
        this.view.flxEBankingAccessMainContainer.setVisibility(true);
		        this.view.flxAcknowledgementWrapper.setVisibility(false);
        this.view.btnEBankingAccessSave.text = kony.i18n.getLocalizedString("i18n.profile.eBankingDisable");
        if(kony.application.getCurrentBreakpoint() !== 640){
          this.view.btnEBankingAccessSave.width = "250dp";
        }
        //this.view.btnTermsAndConditionsEbankingaccess.onClick= self.showTermsAndConditionsForEBA.bind(self);
        //scopObj.view.btnEBankingAccessSave.onClick = this.showEbankingAccessPopup.bind(this);
        this.setUI(entities);
        this.setEntitiesToSeg(entities);
        this.view.imgSelectAll.src = "inactivecheckbox.png";
        this.view.flxImgCheckBox.onClick = this.toggleSelectAllCheckBox;
        this.disabledEntities = [];
      },

      setUI : function(entities){
        if(entities.customerlegalentity.length > 5){
          this.view.flxSearchWrapper.setVisibility(true);
          this.view.flxSelectAll.setVisibility(true);
          if(kony.application.getCurrentBreakpoint() !== 640){
            this.view.flxEntityTitle.height = "60dp";
            this.view.lblEntityTitle.top= "20dp";
          }
        }
      },
      
      setEntitiesToSeg : function(data){
        this.view.segListOfEntities.widgetDataMap = {
          imgSelect: "imgSelect",
          lblEntityName: "companyName",
          flxDefaultEntity: "flxDefaultEntity",
          imgStatus: "imgStatus",
          lblEntityStatus: "lblEntityStatus",
          btnTnC: "btnTnC",
          flxTnC : "flxTnC",
          flxSelect: "flxSelect",
          flxEntity: "flxEntity",
          flxStatus: "flxStatus",
          flxSeparator: "flxSeparator"
        };
        data = this.formatEntitiesData(data.customerlegalentity);
        this.entityList = data;
        this.view.segListOfEntities.setData(data);
        FormControllerUtility.hideProgressBar(this.view);
      },
      
      formatEntitiesData : function(data){
        var activeEntities = [];
        var inactiveEntities = [];
        var defaultEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
        
        var isMobileDevice = ((kony.application.getCurrentBreakpoint() === 640) || orientationHandler.isMobile);
        for (var arrIndex = 0; arrIndex < data.length; arrIndex++) {
          if(data[arrIndex].legalEntityId === defaultEntity && data[arrIndex].Status_id === "SID_CUS_ACTIVE"){
            data[arrIndex]['flxDefaultEntity'] = {
              "isVisible" : true,
              //"left" : 50 + data[arrIndex].companyName.length + 5 + "dp"
            }
            if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
				data[arrIndex]['flxDefaultEntity'] = {
					"isVisible": true,
					width: "40%"
                }
			}
            if(isMobileDevice){
              data[arrIndex]['flxTnC'] = {
                "top": "65dp"
                //"left": 50 + data[arrIndex].companyName.length + 5 + "dp"
              }
            }
          }
          data[arrIndex]["btnTnC"] = {
            "onClick": this.showTermsAndConditionsForEBA.bind(arrIndex)
          }
          switch (data[arrIndex].Status_id) {
            case "SID_CUS_ACTIVE":
              activeEntities.push(data[arrIndex]);
              data[arrIndex]['flxSelect'] = {
                "onClick": function (eventobject, context) {
                  scopeObj.toggleCheckBox(context);
                }.bind(this),
                "accessibilityConfig": {
                  a11yARIA:{
                    "aria-checked": false,
                    "aria-labelledby": "lblEntityName",
                    "role": "checkbox",
                    "tabindex": 0
                  }
                }
              };
              data[arrIndex]['imgSelect'] = {
                "src": "inactivecheckbox.png"
              };
              break;
            case "SID_CUS_SUSPENDED":
              data[arrIndex]['imgStatus'] = {
                "src": "orange.png"
              },
                data[arrIndex]['lblEntityStatus'] = {
                "text": "Inactive"
              },
                data[arrIndex]['flxTnC'] = {
                "isVisible": false
              },
                data[arrIndex]['imgSelect'] = {
                "src": "unchecked_box_1.png"
              },
                data[arrIndex]['flxEntity'] = {
                "top": "30dp"
              },
                data[arrIndex]['flxSelect'] = {
                "top": "30dp"
              },
                data[arrIndex]['flxStatus'] = {
                "top": "30dp"
              }
              if(isMobileDevice){
                data[arrIndex]['flxStatus'] = {
                  "width": "60dp",
                  "top": "30dp"
                },
                  data[arrIndex]['lblEntityStatus'] = {
                  "width": "45dp",
                  "text": "Inactive"
                }
              }
              inactiveEntities.push(data[arrIndex])
              break;
          }
          if(arrIndex === data.length-1){
            data[arrIndex]['flxSeparator'] = {
                  "isVisible": false
            }
          }
        }
        var sortedEntities = activeEntities.concat(inactiveEntities);
        return sortedEntities;
      },
      
      toggleSelectAllCheckBox: function() {
        var data = this.view.segListOfEntities.data;
        if(!kony.sdk.isNullOrUndefined(data)){
          if(this.view.imgSelectAll.src === "activecheckbox.png"){
            this.view.imgSelectAll.src = "inactivecheckbox.png";
            this.view.flxImgCheckBox.accessibilityConfig = 
            {
              a11yARIA:{
              "aria-checked": false,
              "aria-labelledby": "lblSelectAll",
              "role": "checkbox",
              "tabindex": 0
              }
          };
            for(var index = 0; index < data.length; index++){
              if(data[index].Status_id !== "SID_CUS_SUSPENDED"){
                data[index]['imgSelect'] = {
                  "src": "inactivecheckbox.png"
                };
                data[index]['flxSelect'] = {
                  "accessibilityConfig": {
                    a11yARIA:{
                    "aria-checked": false,
                    "aria-labelledby": "lblEntityName",
                    "role": "checkbox",
                    "tabindex": 0
                  }
                }
                };
              }
            }
          } else{
            this.view.imgSelectAll.src = "activecheckbox.png";
            this.view.flxImgCheckBox.accessibilityConfig = 
            {
              a11yARIA:{
              "aria-checked": true,
              "aria-labelledby": "lblSelectAll",
              "role": "checkbox",
              "tabindex": 0
              }
          };
            for(var index = 0; index < data.length; index++){
              if(data[index].Status_id !== "SID_CUS_SUSPENDED"){
                data[index]['imgSelect'] = {
                  "src": "activecheckbox.png"
                };
                data[index]['flxSelect'] = {
                  "accessibilityConfig": {
                    a11yARIA:{
                    "aria-checked": true,
                    "aria-labelledby": "lblEntityName",
                    "role": "checkbox",
                    "tabindex": 0
                    }
                  }
                };
              }
            }
          }
        }
        this.view.segListOfEntities.setData(data);
        this.entityList=this.view.segListOfEntities.data;
        this.enableEBankingAccess();
        this.view.flxImgCheckBox.setActive(true);
      },
      toggleCheckBox: function(data) {
        var index = data.rowIndex;
        var segData = this.view.segListOfEntities.data;

        var isAllEntitiesSelected = true;
        if(!kony.sdk.isNullOrUndefined(segData[index])){
          if(segData[index].imgSelect.src === "activecheckbox.png"){
            segData[index].imgSelect.src = "inactivecheckbox.png";
            segData[index].flxSelect.accessibilityConfig = {
              a11yARIA: {
                "aria-checked": false,
                "aria-labelledby": "lblEntityName",
                "role": "checkbox",
                "tabindex": 0
              }
          };
          }else{
            segData[index].imgSelect.src = "activecheckbox.png";
            segData[index].flxSelect.accessibilityConfig = {
              a11yARIA: {
                "aria-checked": true,
                "aria-labelledby": "lblEntityName",
                "role": "checkbox",
                "tabindex": 0
              }
          };
          }
          //Checking is all the accounts of the section is selected
          for (var selectedEntityIndex = 0; selectedEntityIndex < segData.length; selectedEntityIndex++) {
            if(segData[selectedEntityIndex].Status_id !== "SID_CUS_SUSPENDED"){
              if(segData[selectedEntityIndex].imgSelect.src==="inactivecheckbox.png"){
                isAllEntitiesSelected=false;
              }
            }
          }
          if(isAllEntitiesSelected){
            this.view.imgSelectAll.src = "activecheckbox.png";
            this.view.flxImgCheckBox.accessibilityConfig = 
            {
              a11yARIA:{
              "aria-checked": true,
              "aria-labelledby": "lblSelectAll",
              "role": "checkbox",
              "tabindex": 0
              }
          }
          }else{
            this.view.imgSelectAll.src = "inactivecheckbox.png";
            this.view.flxImgCheckBox.accessibilityConfig = 
            {
              a11yARIA:{
              "aria-checked": false,
              "aria-labelledby": "lblSelectAll",
              "role": "checkbox",
              "tabindex": 0
              }
          }
          }
          this.view.segListOfEntities.setData(segData);
          this.entityList=this.view.segListOfEntities.data;
          this.enableEBankingAccess();
          this.view.segListOfEntities.setActive(index,0,"flxEBankingListOfEntities.flxMainWrapper.flxSelect");
        }
      },
      enableEBankingAccess : function(){
        var data=this.view.segListOfEntities.data;
        var isAnyEntitySelected= false;
        var scopeobj = this;
        //Checking if any of the entity is selected
        for (var selectedIndex = 0; selectedIndex < data.length; selectedIndex++) {
          if(data[selectedIndex].imgSelect.src==="activecheckbox.png"){
            isAnyEntitySelected=true;
            break;
          }              
        }
        if(isAnyEntitySelected){
          scopeobj.enableButton(this.view.btnEBankingAccessSave);
        }else{
          scopeobj.disableButton(this.view.btnEBankingAccessSave);
        } 
      },
      
      setDisableEntitiesPopUp: function(){
        
          if(this.view.btnEBankingAccessSave.text !== "Done")
            this.showEbankingAccessPopup();
          else {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
              "moduleName": "SettingsNewUIModule",
              "appName": "ManageProfileMA"
            }).presentationController.showBankingAccess();
          }
        
      },

      setDisabledEntitiesSeg: function(){
        var data = this.view.segListOfEntities.data;
        var selectedEntities = [];
        var formattedEntities = [];
        this.flowtype = "";
        var count =0;
        this.view.segDisabledListOfEntities.widgetDataMap = {
          lblDisabledEntity: "companyName",
          flxDefaultEntity: "flxDefaultEntity"
        };
        var defaultEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
        
        var currentLegalEntity = applicationManager.getUserPreferencesManager().getCurrentLegalEntity();
        for (var selectedEntityIndex = 0; selectedEntityIndex < data.length; selectedEntityIndex++) {
          if (data[selectedEntityIndex].legalEntityId === defaultEntity) {
            data[selectedEntityIndex]['flxDefaultEntity'] = {
              "isVisible": true,
              "width": "85dp"
            }
          }
          if (data[selectedEntityIndex].Status_id !== "SID_CUS_SUSPENDED" && data[selectedEntityIndex].imgSelect.src === "activecheckbox.png") {
            //count++;
            formattedEntities.push(data[selectedEntityIndex]);
            selectedEntities.push(data[selectedEntityIndex].legalEntityId);
          }
        }
        if(this.view.imgSelectAll.src === "activecheckbox.png"){
          this.flowtype = "All Entities";
        }else{
          for(var Index = 0; Index < selectedEntities.length; Index++){
            if(selectedEntities[Index] === defaultEntity && currentLegalEntity === defaultEntity){
              this.flowtype = "Default Entity Equalto Current Entity";
            }
            else if(selectedEntities[Index] === defaultEntity && currentLegalEntity !== defaultEntity){
              this.flowtype = "Default Entity NotEqualto Current Entity";
            }
            else if(selectedEntities[Index] === currentLegalEntity){
              this.flowtype = "Current Entity";
            }else this.flowtype = "Neither Current Nor Default Entity";
          }
        }
        this.disabledEntities = formattedEntities;
        this.view.segDisabledListOfEntities.setData(formattedEntities);
        return selectedEntities;
      },
      
      showEbankingAccessPopup: function(){
        var scopeObj = this;
        this.view.flxDeletePopUp.setVisibility(true);
        this.view.flxLogout.setVisibility(false);
        this.view.flxDialogs.setVisibility(true);
        scopeObj.view.flxDialogs.isModalContainer = true;
        this.view.lblDeleteHeader.text = kony.i18n.getLocalizedString("i18n.profile.eBankingDisable");
        //this.view.lblConfirmDelete.text =  kony.i18n.getLocalizedString("i18n.profile.eBankingAlertMsg");
        this.view.lblConfirmDelete.text = kony.i18n.getLocalizedString("i18n.profile.eBankingAccessPopUpMessage");
        		var selectedEntities = this.setDisabledEntitiesSeg();
        this.view.forceLayout();
        this.view.lblDeleteHeader.setActive(true);
        
     this.view.btnDeleteClose.accessibilityConfig = {
      a11yLabel: kony.i18n.getLocalizedString("i18n.settings.closeDisableEbankingDialog"),
      a11yARIA: {
        tabindex: 0,
        role: "button"
      }
    };
    this.view.btnDeleteYes.accessibilityConfig = {
      a11yLabel: kony.i18n.getLocalizedString("i18n.settings.yesDisableEbankingAccess"),
      a11yARIA: {
        tabindex: 0,
        role: "button"
      }
    };
    this.view.btnDeleteNo.accessibilityConfig = {
      a11yLabel: kony.i18n.getLocalizedString("i18n.settings.noDontDisableEbankingAccess"),
      a11yARIA: {
        tabindex: 0,
        role: "button"
      }
    };
        this.view.btnDeleteNo.onClick= function(){
          scopeObj.view.flxDialogs.isModalContainer = false;
          scopeObj.view.flxDialogs.setVisibility(false);
          scopeObj.view.flxDeletePopUp.setVisibility(false);
          var data = scopeObj.view.segListOfEntities.data;
          for (var selectedIndex = 0; selectedIndex < data.length; selectedIndex++) {
            if (data[selectedIndex].imgSelect.src === "activecheckbox.png") {
              break;
            }
          }
          scopeObj.resetSelectedEntities();
          scopeObj.view.segListOfEntities.setActive(selectedIndex, 0, "flxEBankingListOfEntities.flxMainWrapper.flxSelect");
        };
        this.view.btnDeleteClose.onClick= function(){
          scopeObj.view.flxDialogs.isModalContainer = false;
          scopeObj.view.flxDialogs.setVisibility(false);
          scopeObj.view.flxDeletePopUp.setVisibility(false);
          var data = scopeObj.view.segListOfEntities.data;
          for (var selectedIndex = 0; selectedIndex < data.length; selectedIndex++) {
            if (data[selectedIndex].imgSelect.src === "activecheckbox.png") {
              break;
            }
          }
          scopeObj.resetSelectedEntities();
          scopeObj.view.segListOfEntities.setActive(selectedIndex, 0, "flxEBankingListOfEntities.flxMainWrapper.flxSelect");
        };
        this.view.btnDeleteYes.onClick= function(){
          FormControllerUtility.showProgressBar(this.view);
          var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"});
          profileModule.presentationController.disableEBankingAccess(selectedEntities,scopeObj.flowtype);
        };
      },
      
      resetSelectedEntities: function(){
        var scopeobj = this;
        var data = this.view.segListOfEntities.data;
        var defaultEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
        for (var index = 0; index < data.length; index++) {
          if (data[index].Status_id !== "SID_CUS_SUSPENDED") {
            data[index]['imgSelect'] = {
              "src": "inactivecheckbox.png"
            };
            data[index].flxSelect.accessibilityConfig = {
              "a11yARIA": {
                "aria-checked": false,
                "aria-labelledby": "lblEntityName",
                "role": "checkbox",
                "tabindex": 0
              }
            };
          }
          if (data[index].legalEntityId === defaultEntity && data[index].Status_id === "SID_CUS_SUSPENDED"){
            data[index]['flxDefaultEntity'] = {
              "isVisible": false,
            }
          }
          else if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
            data[index]['flxDefaultEntity'] = {
              width: "40%",
              isVisible: true
          }
          }
        }
        this.view.segListOfEntities.setData(data);
        this.entityList=this.view.segListOfEntities.data;
        this.view.imgSelectAll.src = "inactivecheckbox.png";
        scopeobj.disableButton(this.view.btnEBankingAccessSave);
      },
      
      searchEntity: function(){
        var navObj = applicationManager.getNavigationManager();
        var searchtext = this.view.tbxSearchBox.text.toLowerCase();
        this.view.flxClearSearch.isVisible = true;
        //this.entityList = this.view.segListOfEntities.data;
        if (searchtext) {
          var data = [];
          // headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingTransactions"));
          data = this.entityList;
          var searchSegmentData = applicationManager.getDataProcessorUtility().commonSegmentSearch("companyName", searchtext, data);
          if (searchSegmentData.length > 0) {
            this.checkForDefaultEntity();
            this.view.segListOfEntities.setData(searchSegmentData);
          } 
        } else {
          if (this.entityList !== undefined && this.entityList.length > 0) {
            this.checkForDefaultEntity();
            this.view.segListOfEntities.setData(this.entityList);
            this.view.flxClearSearch.isVisible = false;
          }
        }
        //this.AdjustScreen();
      },
    
      clearSearch: function(){
        this.view.tbxSearchBox.text = "";
        this.checkForDefaultEntity();
        this.view.segListOfEntities.setData(this.entityList);
        this.view.flxClearSearch.isVisible = false;
      },
	
      checkForDefaultEntity: function(){
        var defaultEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
        for (var index = 0; index < this.entityList.length; index++) {
          if (this.entityList[index].legalEntityId === defaultEntity && this.entityList[index].Status_id === "SID_CUS_SUSPENDED"){
            this.entityList[index]['flxDefaultEntity'] = {
              "isVisible": false,
            }
          }
        }
      },
      
      ackScreen: function(disabledEntityType, response){
        var scopeobj = this;
        this.view.lblEBamkingAccessHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        this.view.flxEBankingAccessMainContainer.setVisibility(false);
        this.view.flxAcknowledgementWrapper.setVisibility(true);
        var entityNames = "";
        this.view.btnEBankingAccessSave.text = kony.i18n.getLocalizedString("kony.mb.common.done");
        if(kony.application.getCurrentBreakpoint() !== 640){
          this.view.btnEBankingAccessSave.width = "150dp";
        }
        scopeobj.enableButton(this.view.btnEBankingAccessSave);
        if(this.disabledEntities.length > 1){
          entityNames = this.disabledEntities[0].companyName;
          for (var selectedEntityIndex = 1; selectedEntityIndex <= this.disabledEntities.length; selectedEntityIndex++) {
            entityNames = entityNames.concat(",", this.disabledEntities[selectedEntityIndex].companyName);
          }
        }else entityNames = this.disabledEntities[0].companyName;
        switch(disabledEntityType){
          case "Default Entity NotEqualto Current Entity":
            this.view.lblConfirmationMessage.text = kony.i18n.getLocalizedString("i18n.profile.eBankingAckMessage") + " " + entityNames + ".";
            this.view.lblConfirmationDescription.setVisibility(true);
            break;
          case "Neither Current Nor Default Entity":
            this.view.lblConfirmationMessage.text = kony.i18n.getLocalizedString("i18n.profile.eBankingAckMessage") + " " + entityNames + ".";
            break;
        }
        this.view.flxDialogs.isModalContainer = false;
        this.view.flxDialogs.setVisibility(false);
        this.view.flxDeletePopUp.setVisibility(false);
        this.view.btnEBankingAccessSave.setFocus(true);
        FormControllerUtility.hideProgressBar(this.view);
      },
      
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
      postShow: function() { 
        applicationManager.getNavigationManager().applyUpdates(this);
        this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight -this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp"; 
        this.view.forceLayout();  
       // var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
       // CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
       this.view.lblHeading.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
       this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
       this.view.flxTC.doLayout = CommonUtilities.centerPopupFlex;
      // this.view.btnDeleteYes.toolTip=kony.i18n.getLocalizedString("i18n.common.yes");
      //   this.view.btnDeleteNo.toolTip=kony.i18n.getLocalizedString("i18n.common.no");
      this.view.lblEBamkingAccessHeader.setActive(true);
      },
  
    };
  });	