define("ManageProfileMA/SettingsNewUIModule/userfrmEditAddressController", ['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    this.getAddressPayLoad = {};
    var primaryCall = false;
    var globalScope = this;
    var isPrimaryAccount = false;
    return {
        enableSeparateAddress: false,
        /**
         * Init Method 
         */
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShowProfile;
            //CommonUtilities.setText(this.view.btnAddNewAddressMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewAddress"), CommonUtilities.getaccessibilityConfig());
            //CommonUtilities.setText(this.view.btnAddNewPersonalAddressMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewAddress"), CommonUtilities.getaccessibilityConfig());
            this.setFlowActions();
          
        },
        setFlowActions: function() {
            var scopeObj = this;
            this.view.addressInfo.flxCross.onClick = function() {
                scopeObj.view.addressInfo.isVisible = false;
            }
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = function() {
                    scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
                }
           var valManager = applicationManager.getValidationUtilManager();
           this.view.tbxEditZipcode.onTextChange = function(){
           scopeObj.view.tbxEditZipcode.restrictCharactersSet = "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\" ;
          };
                /*this.view.tbxEditAddressLine1.onTextChange = function(){
             //CommonUtilities.setText(scopeObj.view.tbxEditAddressLine1,scopeObj.view.tbxEditAddressLine1.text.trim() , CommonUtilities.getaccessibilityConfig());
              scopeObj.view.tbxEditAddressLine1.accessibilityConfig ={
                  "a11yValue":scopeObj.view.tbxEditAddressLine1.text.trim()
              }
            }; 
          this.view.tbxEditAddressLine2.onTextChange = function(){
              //CommonUtilities.setText(scopeObj.view.tbxEditAddressLine2,scopeObj.view.tbxEditAddressLine2.text.trim() , CommonUtilities.getaccessibilityConfig());
              scopeObj.view.tbxEditAddressLine2.accessibilityConfig ={
                    "a11yValue":scopeObj.view.tbxEditAddressLine2.text.trim()
              }
            }; 
          this.view.tbxEditCountry.onTextChange = function(){
              CommonUtilities.setText(scopeObj.view.tbxEditCountry,scopeObj.view.tbxEditCountry.text.trim() , CommonUtilities.getaccessibilityConfig());
          	  scopeObj.view.tbxEditState.accessibilityConfig ={
              "a11yValue":scopeObj.view.tbxEditState.selectedKeyValue[1]
            };   
          }; */
            this.view.tbxEditState.onTextChange = function() {
                scopeObj.view.tbxEditState.text = scopeObj.view.tbxEditState.text.trim();
            };
            /*this.view.tbxEdtCity.onTextChange = function(){
               //CommonUtilities.setText(scopeObj.view.tbxEdtCity,scopeObj.view.tbxEdtCity.text.trim() , CommonUtilities.getaccessibilityConfig());
               scopeObj.view.tbxEdtCity.accessibilityConfig ={
                 "a11yValue":scopeObj.view.tbxEdtCity.text.trim()
               }
             };
            this.view.tbxEditZipcode.onTextChange = function(){
              //CommonUtilities.setText(scopeObj.view.tbxEditZipcode,scopeObj.view.tbxEditZipcode.text.trim() , CommonUtilities.getaccessibilityConfig());
               scopeObj.view.tbxEditZipcode.accessibilityConfig ={
                 "a11yValue":scopeObj.view.tbxEditZipcode.text.trim()
               }
             };*/
            this.view.tbxEditCity.onSelection = function() {
                scopeObj.view.tbxEditCity.text = scopeObj.view.tbxEditCity.selectedKeyValue[1];
            };
            /*this.view.lbxEditType.onSelection = function(){
                  //CommonUtilities.setText(scopeObj.view.lbxEditType, scopeObj.view.lbxEditType.selectedKeyValue[1], CommonUtilities.getaccessibilityConfig());
                  scopeObj.view.lbxEditType.accessibilityConfig = {
                      "a11yValue" : kony.i18n.getLocalizedString("i18n.ProfileManagement.Address") +" "+ kony.i18n.getLocalizedString("i18n.common.Type") + " " + scopeObj.view.lbxEditType.selectedKeyValue[1]
                  }
              };*/
        },
        onBreakpointChange: function(width) {
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.profileMenu.onBreakpointChangeComponent(width);
            orientationHandler.onOrientationChange(this.onBreakpointChange);
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
              this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
              this.view.flxLeft.accessibilityConfig = {
                "a11yARIA": {
                  "tabindex": -1,
                  "aria-live": "off"
                }
              };
              this.view.flxRight.accessibilityConfig = {
                "a11yARIA": {
                  "tabindex": -1,
                  "aria-live": "off"
                }
              };            
            }
            else{
              this.view.flxLeft.accessibilityConfig = {
                "a11yARIA": {
                  "tabindex": -1
                }
              };
              this.view.flxRight.accessibilityConfig = {
                "a11yARIA": {
                  "tabindex": -1
                }
              };
            }
            this.view.forceLayout();
        },
      /**
         *  Method to set the Accessibility configurations
         */
        setAccessibility: function() {
            //CommonUtilities.setText(this.view.lblAddressHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Address"), accessibilityConfig);
            //CommonUtilities.setText(this.view.lblSetAsPreferred, kony.i18n.getLocalizedString("i18n.ProfileManagement.SetAsPreferredCommunicationAddress"), accessibilityConfig);
            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
            this.view.lblHeading.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
                "a11yLabel": this.view.lblEditAddressHeader.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
            };
            // CommonUtilities.setText(this.view.lblEditAddressHeader, kony.i18n.getLocalizedString("i18n.ProfileManagement.editAddress"), accessibilityConfig);
            this.view.btnEditAddressSave.text = kony.i18n.getLocalizedString("kony.mb.common.submit");
            this.view.btnEditAddressCancel.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            /*this.view.lblErrorEditAddress.accessibilityConfig = {
                "a11yLabel": kony.i18n.getLocalizedString("i18n.settings.accessibility.error")
            };
            this.view.lblEditInfoTxt.accessibilityConfig = {
                "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddAnotherPrimaryAddress")
            };*/
            this.view.btnEditAddressSave.accessibilityConfig = {
                "a11yLabel": "Submit address details"
            };
            this.view.btnEditAddressCancel.accessibilityConfig = {
                "a11yLabel": "Cancel edit address process"
            };
        },
        updateFormUI: function(viewModel) {
            if (viewModel !== undefined) {
                if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
                if (viewModel.campaign) {
                    CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxContainer");
                }
                if (viewModel.editAddress){
                   globalScope.isPrimary = viewModel.editAddress.isPreferredAddress;
                   globalScope.isPrimaryAccount = viewModel.editAddress.isPreferredAddress;
                   globalScope.primaryCall = viewModel.editAddress.isPreferredAddress;
                   this.showEditAddressForm(viewModel.editAddress);
                   this.view.flxEditSetAsPreferred.setVisibility(true);
                   this.view.flxInfoEditAddress.setVisibility(true);
                   /*
                   Moving this to work the functionality correctly, And also changed conditions to show check box properly*/
                   //Address flow
                    if (!(applicationManager.getConfigurationManager().checkUserPermission("UPDATE_PRIMARY_ADDRESS")) || globalScope.isPrimary == true) {
					    this.view.flxEditSetAsPreferred.setVisibility(false);
					    this.view.flxInfoEditAddress.setVisibility(false);
				    }
                }
                if (viewModel.addressList === null) {
                    viewModel.addressList = [];
                    FormControllerUtility.hideProgressBar(this.view);
                }
            }
            this.view.forceLayout();
            this.view.lblEditAddressHeader.setActive(true);
        },
        preShow: function() {
            var self = this;
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
            this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxContainer']);
            this.view.lblCollapseMobile.text = "O";
            this.view.flxRight.setVisibility(true);
            this.view.profileMenu.checkLanguage();
            this.view.profileMenu.activateMenu("PROFILESETTINGS", "Address");
            this.view.customheadernew.activateMenu("Settings", "Profile Settings");
            this.setSelectedValue("i18n.ProfileManagement.Address");
            this.view.addressInfo.isVisible = false;
            this.view.flxProfileError.setVisibility(false);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.view.flxMain.height = "880dp";
            }
            this.setDataForUploadFileComp();
            var scopeObj = this;
            this.setAccessibility();
            
            this.view.flxEditSetAsPreferredCheckBox.onClick = function() {
                if(globalScope.isPrimaryAccount!=true){
                scopeObj.toggleFontCheckBox(scopeObj.view.lblEditSetAsPreferredCheckBox);
                if (scopeObj.view.lblEditSetAsPreferredCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    if(!(applicationManager.getUserPreferencesManager().getBackendIdentifier() === '')){
                    scopeObj.view.flxSupportingDocs.setVisibility(true);
                    globalScope.primaryCall = true;
                    }
                } else {
                    if(!(applicationManager.getUserPreferencesManager().getBackendIdentifier() === '')){
                    scopeObj.view.flxSupportingDocs.setVisibility(false);
                    globalScope.primaryCall = false;
                }
                }
            }
            scopeObj.primaryComAccessibiltyChange();
            };
            this.restrictSpecialCharacterSet();
            if (!CommonUtilities.isCSRMode()) {
                this.setUpdateAddressValidationActions();
            }
            this.view.forceLayout();
            this.primaryComAccessibiltyChange();
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.onKeyPress = this.onKeyPressCallBack;
        },
        onKeyPressCallBack: function(eventObject, eventPayload){
         if (eventPayload.keyCode === 27) {
           if (this.view.flxDialogs.isVisible === true) {
             this.view.flxDialogs.isVisible = false;
             this.view.customheadernew.btnLogout.setFocus(true);
           }
           if(kony.application.getCurrentBreakpoint()===640){
             if(this.view.flxLeft.isVisible === true){
               this.toggleMenuMobile();
               this.view.flxAccountSettingsCollapseMobile.setActive(true);
             }
           }
           this.view.customheadernew.onKeyPressCallBack(eventObject,eventPayload);
         }
        },
        primaryComAccessibiltyChange: function() {
          var scopeObj=this;
          if (scopeObj.view.lblEditSetAsPreferredCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED){
            scopeObj.view.flxEditSetAsPreferredCheckBox.accessibilityConfig = {
              "a11yARIA": {
                "aria-labelledby": "lblEditSetAsPreferred",
                "role": "checkbox",
                "aria-checked": true
              }
            };
          }
          else{
            scopeObj.view.flxEditSetAsPreferredCheckBox.accessibilityConfig = {
              "a11yARIA": {
                "aria-labelledby": "lblEditSetAsPreferred",
                "role": "checkbox",
                "aria-checked": false
              }
            };
          }
        },
        /**
         * *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
         *  Method to set the text in mobile breakpoint
         */
        setSelectedValue: function(text) {
            var self = this;
            self.view.lblAccountSettingsMobile.text = kony.i18n.getLocalizedString(text);
        },
        toggleFontCheckBox: function(imgCheckBox) {
            if (imgCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                imgCheckBox.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                imgCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            } else {
                imgCheckBox.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
                imgCheckBox.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            }
        },
        toggleMenuMobile: function() {
            if (this.view.lblCollapseMobile.text == "O") {
                this.view.lblCollapseMobile.text = "P";
                this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                  "a11yARIA": {
                    "aria-labelledby": "lblAccountSettingsMobile",
                    "role": "button",
                    "aria-expanded": true
                  }
                };
                this.view.flxLeft.setVisibility(true);
                this.view.flxRight.setVisibility(false);
            } else {
                this.view.lblCollapseMobile.text = "O";
                this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                  "a11yARIA": {
                    "aria-labelledby": "lblAccountSettingsMobile",
                    "role": "button",
                    "aria-expanded": false
                  }
                };
                this.view.flxLeft.setVisibility(false);
                this.view.flxRight.setVisibility(true);
            }
        },
        changeProgressBarState: function(isLoading) {
            if (isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },
        postShowProfile: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.forceLayout();
            this.view.lblEditAddressHeader.setActive(true);
        },
        /**
         * Method to hide all the flex of main body
         * @param {Object} editAddressViewModel - None
         */
        showEditAddressForm: function(editAddressViewModel) {
            var self = this;
            var scopeObj = this;
            //this.hideAll();
            this.view.flxEditAddressWrapper.setVisibility(true);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.view.flxAddressWrapper.height = "830dp";
            }
            if (editAddressViewModel.serverError) {
                if (currBreakpoint === 640 || orientationHandler.isMobile) {
                    this.view.flxMain.height = "750dp";
                }
                this.view.flxProfileError.setVisibility(true);
                this.view.rtxError.text = editAddressViewModel.serverError.errorMessage;
            } else {
                this.view.lbxEditType.masterData = editAddressViewModel.addressTypes || "";
                if (editAddressViewModel.addressTypeSelected) this.view.lbxEditType.selectedKey = editAddressViewModel.addressTypeSelected;
                this.view.tbxEditAddressLine1.text = editAddressViewModel.addressLine1 || "";
                this.view.tbxEditAddressLine2.text = editAddressViewModel.addressLine2 || "";
                self.view.tbxEdtCity.text = (editAddressViewModel.city) ? editAddressViewModel.city : editAddressViewModel.citySelected || "";
                this.view.lbxEditCountry.masterData = editAddressViewModel.countryNew;
                var country = (editAddressViewModel.countrySelected) ? editAddressViewModel.countrySelected : (editAddressViewModel.CountryCode) ? (editAddressViewModel.CountryCode) : editAddressViewModel.countryNew[0][0];
                if (country.length !== 2) {
                    country = "1";
                }
                this.view.lbxEditCountry.selectedKey = country;
                //this.view.lbxEditState.selectedKey = editAddressViewModel.stateSelected;
                if (country !== "1") {
                    data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "SettingsNewUIModule",
                        "appName": "ManageProfileMA"
                    }).presentationController.getSpecifiedCitiesAndStates("country", editAddressViewModel.countrySelected, editAddressViewModel.stateNew);
                    self.view.lbxEditState.masterData = (editAddressViewModel.countrySelected) ? data.states : editAddressViewModel.stateNew;
                    self.view.lbxEditState.selectedKey = (editAddressViewModel.stateSelected) ? editAddressViewModel.stateSelected : editAddressViewModel.stateNew[0][0];
                } else {
                    self.view.lbxEditState.setEnabled(false);
                    self.view.lbxEditState.masterData = editAddressViewModel.stateNew;
                    self.view.lbxEditState.selectedKey = editAddressViewModel.stateNew[0][0];
                }
                this.view.lbxEditCountry.onSelection = function() {
                    var data = [];
                    var countryId = self.view.lbxEditCountry.selectedKeyValue[0];
                    if (countryId == "1") {
                        self.checkUpdateAddressForm();
                        self.view.lbxEditState.masterData = editAddressViewModel.stateNew;
                        self.view.lbxEditState.selectedKey = editAddressViewModel.stateNew[0][0];
                        self.view.lbxEditState.setEnabled(false);
                        //self.disableButton(self.view.btnEditAddressSave);
                    } else {
                        self.checkUpdateAddressForm();
                        self.view.lbxEditState.setEnabled(true);
                        //self.disableButton(self.view.btnEditAddressSave);
                        data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "moduleName": "SettingsNewUIModule",
                            "appName": "ManageProfileMA"
                        }).presentationController.getSpecifiedCitiesAndStates("country", countryId, editAddressViewModel.stateNew);
                        self.view.lbxEditState.masterData = data.states;
                        self.view.lbxEditState.selectedKey = data.states[0][0];
                    }
                    //CommonUtilities.setText(scopeObj.view.lbxEditCountry,scopeObj.view.lbxEditCountry.selectedKeyValue[1] , CommonUtilities.getaccessibilityConfig());
                        //CommonUtilities.setText(scopeObj.view.lbxEditState, scopeObj.view.lbxEditState.selectedKeyValue[1], CommonUtilities.getaccessibilityConfig());                
                        /*self.view.lbxEditState.accessibilityConfig = {
                        "a11yValue" : kony.i18n.getLocalizedString("i18n.ProfileManagement.selectState") +" "+ scopeObj.view.lbxEditState.selectedKeyValue[1]
                        }*/
                };
                this.view.lbxEditState.onSelection = function() {
                    var data = [];
                    var stateId = self.view.lbxEditState.selectedKeyValue[0];
                    self.checkUpdateAddressForm();
                    //CommonUtilities.setText(scopeObj.view.lbxEditState,scopeObj.view.lbxEditState.selectedKeyValue[1] , CommonUtilities.getaccessibilityConfig());
                };
                //self.view.tbxEditCountry.text = editAddressViewModel.country || "";
                //self.view.tbxEditState.text = editAddressViewModel.state || "";
                self.view.tbxEdtCity.text = (editAddressViewModel.city) ? editAddressViewModel.city : (editAddressViewModel.citySelected) ? editAddressViewModel.citySelected : "";
                this.view.tbxEditZipcode.text = editAddressViewModel.zipcode || "";
                this.view.lblEditSetAsPreferredCheckBox.skin = editAddressViewModel.isPreferredAddress ? ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN : ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
                // if(editAddressViewModel['isPreferredAddress']==false)
                // {
                //     this.view.flxEditSetAsPreferred.setVisibility(false);
                //     this.view.flxInfoEditAddress.setVisibility(false);
                // }
                if(editAddressViewModel['isPreferredAddress']==true && !(applicationManager.getUserPreferencesManager().getBackendIdentifier() === ''))
                {
                    this.view.flxSupportingDocs.setVisibility(true);
                }
                this.view.lblEditSetAsPreferredCheckBox.text = editAddressViewModel.isPreferredAddress ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED ;
                //this.view.flxEditSetAsPreferred.setVisibility(!editAddressViewModel.isPreferredAddress);
                this.checkUpdateAddressForm();
                if (CommonUtilities.isCSRMode()) {
                    this.view.btnEditAddressSave.onClick = CommonUtilities.disableButtonActionForCSRMode();
                    this.view.btnEditAddressSave.skin = CommonUtilities.disableButtonSkinForCSRMode();
                } else {
                    this.view.btnEditAddressSave.onClick = function() {
                        FormControllerUtility.showProgressBar(self.view);
                        if (globalScope.primaryCall && !(applicationManager.getUserPreferencesManager().getBackendIdentifier() === '')) {
                            globalScope.getAddressPayLoad["isPrimary"] = true;
                            globalScope.getAddressPayLoad["addressId"] = editAddressViewModel.addressId;
                            self.getFileData(editAddressViewModel);
                        } else {
                            var data = this.getUpdateAddressData();
                            data.addressId = editAddressViewModel.addressId;
                            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.updateAddress(data);
                        }
                    }.bind(this);
                    this.view.btnEditAddressCancel.onClick = function() {
                        //   applicationManager.getNavigationManager().navigateTo("frmAddressSettings");
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "moduleName": "SettingsNewUIModule",
                            "appName": "ManageProfileMA"
                        }).presentationController.showUserAddresses();
                    };
                }
                /*scopeObj.view.tbxEditAddressLine1.accessibilityConfig ={
                  "a11yValue":scopeObj.view.tbxEditAddressLine1.text.trim()
                };
                scopeObj.view.tbxEditAddressLine2.accessibilityConfig ={
                  "a11yValue":scopeObj.view.tbxEditAddressLine2.text.trim()
                };
                scopeObj.view.tbxEdtCity.accessibilityConfig ={
                  "a11yValue":scopeObj.view.tbxEdtCity.text.trim()
                };
                scopeObj.view.tbxEditZipcode.accessibilityConfig ={
                  "a11yValue":scopeObj.view.tbxEditZipcode.text.trim()
                };*/
                //CommonUtilities.setText(scopeObj.view.tbxEditAddressLine1,scopeObj.view.tbxEditAddressLine1.text.trim() , CommonUtilities.getaccessibilityConfig());
                //CommonUtilities.setText(scopeObj.view.tbxEditAddressLine2,scopeObj.view.tbxEditAddressLine2.text.trim() , CommonUtilities.getaccessibilityConfig());
                scopeObj.view.tbxEditCountry.text = scopeObj.view.tbxEditCountry.text.trim();
                scopeObj.view.tbxEditState.text = scopeObj.view.tbxEditState.text.trim();
                //CommonUtilities.setText(scopeObj.view.tbxEdtCity,scopeObj.view.tbxEdtCity.text.trim() , CommonUtilities.getaccessibilityConfig());
                //CommonUtilities.setText(scopeObj.view.tbxEditZipcode,scopeObj.view.tbxEditZipcode.text.trim() , CommonUtilities.getaccessibilityConfig());
                scopeObj.view.tbxEditCity.text = scopeObj.view.tbxEditCity.selectedKeyValue[1];
                scopeObj.view.lbxEditState.text = scopeObj.view.lbxEditState.selectedKeyValue[1];
                scopeObj.view.lbxEditCountry.text = scopeObj.view.lbxEditCountry.selectedKeyValue[1];
                // CommonUtilities.setText(scopeObj.view.lbxEditType, scopeObj.view.lbxEditType.selectedKeyValue[1], CommonUtilities.getaccessibilityConfig());
                /*this.view.lbxEditType.accessibilityConfig = {
                 "a11yValue" : kony.i18n.getLocalizedString("i18n.ProfileManagement.Address") +" "+ kony.i18n.getLocalizedString("i18n.common.Type") + " " + scopeObj.view.lbxEditType.selectedKeyValue[1]
                 }*/
                this.view.forceLayout();
            }
        },
        /**
         * Method to Enable a button
         * @param {String} button - ID of the button to be enabled
         */
        enableButton: function(button) {
            if (!CommonUtilities.isCSRMode()) {
                button.setEnabled(true);
                button.skin = "sknbtnSSPffffff15px0273e3bg";
                button.hoverSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
                button.focusSkin = "sknBtnHoverSSPFFFFFF15Px0273e3";
            }
        },
        /**
         * Method to Disable a button
         * @param {String} button - ID of the button to be disabled
         */
        disableButton: function(button) {
            button.setEnabled(false);
            button.skin = "sknBtnBlockedSSPFFFFFF15Px";
            button.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
            button.focusSkin = "sknBtnBlockedSSPFFFFFF15Px";
        },
        setDataForUploadFileComp: function() {
            var isMandatory = true;
            var navMan = applicationManager.getNavigationManager();
            var files = navMan.getCustomInfo("modifyFileData");
            var filesData = [];
            if (!kony.sdk.isNullOrUndefined(files)) {
                filesData = this.getFormattedFileDataForComp(files);
            }
            var config = {
                "selectMultipleFiles": false,
                "filter": ['image/png', 'image/jpeg', 'application/pdf']
            }
            var dataComp = {
                // "title": kony.i18n.getLocalizedString("kony.onboarding.documents.adddocuments"),
                // "description": kony.i18n.getLocalizedString("kony.onboarding.documents.lblUploadDescription.text"),
                // "uploadFilesDocCallback": this.uploadFilesCallback.bind(this, userActionName, false, key, coApplicantKey, isMandatory, applicantType,areMultipleUserActionsPresent),//userActions[key][i].ActionMetaData.Skippable),
                // "fileSelectedCallback": this.fileSelectedCallBack.bind(this, userActionName),
                // "downloadCallback": this.downloadCallback.bind(this),
                "removeFileCallback": this.removeFileCallback.bind(this, isMandatory),
                // "checkEvidenceCallback": this.checkEvidenceCallback.bind(this, isMandatory),
                // "deleteEvidenceCallback": this.deleteEvidenceCallback.bind(this, isMandatory),
                // "removeFileUpdateCallback": this.removeFileUpdateCallback.bind(this, isMandatory),
                // "removeFileDropdownCallback": this.removeFileDropdownCallback.bind(this, isMandatory),
                // "filesData": filesData,
                "config": config,
                // "fulfilmentId": fulfilmentId,
                // "hasUploadState": false
            };
            this.view.uploadFiles.setData(dataComp);
        },
        getFormattedFileDataForComp: function(files) {
            var fileData = [];
            files.forEach(function(file) {
                var fileObject = {
                    "fileObj": {
                        "documentName": file[1]
                    },
                    documentDescription: "file a added",
                    clientDocID: file[2]
                };
                fileData.push(fileObject);
            })
            return fileData;
        },
        removeFileCallback: function(isMandatory, file, uniqueId, removeSuccess, removeFailure, removeSuccessDocument, isUpload, componentParentData) {
            removeSuccess();
        },
        /**
         * method to get data for a file
         * @returns 
         */
        getFileData: function(editAddressViewModel) {
            var browsedFiles = this.view.uploadFiles.getData();
            var attachments = [],
                fileData = {};
            var scope = this;
            var reader = new FileReader();

            function readFile(index) {
                if (index >= browsedFiles.length) {
                    globalScope.getAddressPayLoad["Documents"] = attachments;
                    globalScope.getAddressPayLoad["UpdatePrimaryAddress"] = scope.getPrimaryUpdateAddressData(editAddressViewModel);
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "SettingsNewUIModule",
                        "appName": "ManageProfileMA"
                    }).presentationController.saveAddress(globalScope.getAddressPayLoad);
                    //self.uploadUserActionDocument(attachments, userActionName, isSkippable, groupHeader, coApplicantKey, isMandatory, applicantType, filesUploaded, toggleSubmitButton, toggleSkipButton, uploadFileSucessCallback, uploadFileErrorCallback, componentParentData, onDocSubmit, showUploadBtn,{},areMultipleUserActionsPresent,appFulfilmentID);
                } else {
                    var newFile = browsedFiles[index];
                    fileData = {};
                    fileData.fileName = newFile[0].name;
                    fileData.fileType = newFile[0].file.type;
                    fileData.fileInfo = newFile[1];
                    fileData.fileClientId = newFile[2];
                    fileData.fileTypeOfProof = newFile[3];
                    reader.onloadend = function(e) {
                        var base64String = e.target.result;
                        base64String = base64String.replace("data:;base64,", "");
                        base64String = base64String.replace("data:image/png;base64,", "");
                        base64String = base64String.replace("data:application/octet-stream;base64,", "");
                        base64String = base64String.replace("data:image/jpeg;base64,", "");
                        base64String = base64String.replace("data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,", "");
                        base64String = base64String.replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
                        base64String = base64String.replace("data:application/vnd.ms-excel;base64,", "");
                        fileData.fileContents = base64String.replace("data:application/pdf;base64,", "");
                        attachments.push(fileData);
                        readFile(index + 1);
                    };
                    reader.readAsDataURL(newFile[0].file);
                }
            }
            readFile(0);
        },
        /**
         * Method to show data after updating the New Address scenario
         */
        getUpdateAddressData: function() {
            var addrLine1 = (this.view.tbxEditAddressLine1.text) ? this.view.tbxEditAddressLine1.text.trim() : "";
            var addrLine2 = (this.view.tbxEditAddressLine2.text) ? this.view.tbxEditAddressLine2.text.trim() : "";
            var Country_id = this.view.lbxEditCountry.selectedKey;
            var Region_id = (this.view.lbxEditState.selectedKey !== 'lbl1') ? this.view.lbxEditState.selectedKey : "";
            var City_id = (this.view.tbxEdtCity.text) ? this.view.tbxEdtCity.text.trim() : "";
            var ZipCode = (this.view.tbxEditZipcode.text) ? this.view.tbxEditZipcode.text.trim() : "";
            var Addr_type = (this.view.lbxEditType.selectedKey) ? this.view.lbxEditType.selectedKey : "";
            return [{
                addrLine1: addrLine1,
                addrLine2: addrLine2,
                Country_id: Country_id,
                countrySelected: Country_id,
                Region_id: Region_id,
                City_id: City_id,
                ZipCode: ZipCode,
                isPrimary: this.view.lblEditSetAsPreferredCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED,
                Addr_type: Addr_type
            }];
        },
        getPrimaryUpdateAddressData: function(editAddressViewModel) {
           var data = applicationManager.getAccountManager().getInternalAccounts();
          	var customerId = data[0].coreCustomerId;
            var customerName = data[0].coreCustomerName;
            var addrLine1 = (this.view.tbxEditAddressLine1.text) ? this.view.tbxEditAddressLine1.text.trim() : "";
            var addrLine2 = (this.view.tbxEditAddressLine2.text) ? this.view.tbxEditAddressLine2.text.trim() : "";
            var countrySelected = this.view.lbxEditCountry.selectedKeyValue[1];
            var stateSelected = (this.view.lbxEditState.selectedKey !== 'lbl1') ? this.view.lbxEditState.selectedKeyValue[1] : "";
            var citySelected = (this.view.tbxEdtCity.text) ? this.view.tbxEdtCity.text.trim() : "";
            var ZipCode = (this.view.tbxEditZipcode.text) ? this.view.tbxEditZipcode.text.trim() : "";
            var Addr_type = (this.view.lbxEditType.selectedKey) ? this.view.lbxEditType.selectedKey : "";
            //JSON FORMAT TO RETURN CURRENT AND NEW VALUE
            var AddType = this.getJson("Addr_type", editAddressViewModel.Addr_type, Addr_type);
            var Add1 = this.getJson("AddressLine1", editAddressViewModel.addressLine1, addrLine1);
            var Add2 = this.getJson("AddressLine2", editAddressViewModel.addressLine2, addrLine2);
            var Country = this.getJson("Country", editAddressViewModel.countrySelected, countrySelected);
            var state = this.getJson("State", editAddressViewModel.stateSelected, stateSelected);
            var city = this.getJson("City", editAddressViewModel.city, citySelected);
            var zip = this.getJson("PostalCode", editAddressViewModel.zipcode, ZipCode);
            return [{
                addrLine1: addrLine1,
                addrLine2: addrLine2,
                countrySelected: countrySelected, // this.view.lbxCountry.selectedKey,
                zipcode: ZipCode,
                isPrimary: this.view.lblEditSetAsPreferredCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED,
                Addr_type: Addr_type,
                stateSelected: stateSelected, //this.view.lbxState.selectedKey,
                citySelected: citySelected,
                customerID: customerId,
                customerName: customerName,
                Addr_id : editAddressViewModel.addressId
            },
            {
            "requestData":[
                Add1,
                Add2,
                Country, // this.view.lbxCountry.selectedKey,
                zip,
                AddType,
                state, //this.view.lbxState.selectedKey,
                city ]
        }
        ];
    },
    /**
     * Method to return JSON format
     */
     getJson:function(fieldName,currentValue,newValue)
     {
        if(currentValue === undefined)
        {
            return {"fieldName":fieldName,"displayName":fieldName,"currentValue":"","newValue":newValue};
        }
        else{
         return {"fieldName":fieldName,"displayName":fieldName,"currentValue":currentValue,"newValue":newValue};
        }
     },
        /**
         * Method to validate the edited address
         */
        checkUpdateAddressForm: function() {
            if (!CommonUtilities.isCSRMode()) {
                var addAddressFormData = this.getUpdateAddressData();
                if (addAddressFormData.addrLine1 === '') {
                    this.disableButton(this.view.btnEditAddressSave);
                } else if (!this.isValid(addAddressFormData[0].ZipCode)) {
                    this.disableButton(this.view.btnEditAddressSave);
                } else if (addAddressFormData.Country_id === '1') {
                    this.disableButton(this.view.btnEditAddressSave);
                    //} else if (addAddressFormData.Region_id === 'lbl1') {
                    //this.disableButton(this.view.btnEditAddressSave);
                } else if (addAddressFormData.City_id === '') {
                    this.disableButton(this.view.btnEditAddressSave);
                } else {
                    this.enableButton(this.view.btnEditAddressSave);
                }
            }
        },
        isValid: function(zipCode){
            var validationManager = applicationManager.getValidationUtilManager();
            var isValidZipCode = validationManager.isValidZip(zipCode);
            if (isValidZipCode === true) {
                return true;
            } else return false;
         },
         restrictSpecialCharacterSet: function(){
            var scopeObj = this;
            scopeObj.view.tbxEditZipcode.restrictCharactersSet = "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\" ;
         },
        /**
         * Method to assign validation action on the edit address fields
         */
        setUpdateAddressValidationActions: function() {
            //this.disableButton(this.view.btnEditAddressSave);
            this.view.tbxEditAddressLine1.onKeyUp = this.checkUpdateAddressForm.bind(this);
            this.view.tbxEditAddressLine2.onKeyUp = this.checkUpdateAddressForm.bind(this);
            this.view.tbxEditZipcode.onKeyUp = this.checkUpdateAddressForm.bind(this);
            this.view.tbxEdtCity.onKeyUp = this.checkUpdateAddressForm.bind(this);
            this.view.tbxEditCountry.onKeyUp = this.checkUpdateAddressForm.bind(this);
            this.view.tbxEditState.onKeyUp = this.checkUpdateAddressForm.bind(this);
        },
        /**
         * Method to assign validation action on the edit address fields
         */
        getBase64: function(file, successCallback) {
            var reader = new FileReader();
            reader.onloadend = function() {
                successCallback(reader.result);
            };
            reader.readAsDataURL(file);
        },
        /**
         * Method to edit the address which is already set
         * @param {Object} address- All the fields of the Address
         */
        editAddress: function(address) {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "SettingsNewUIModule",
                "appName": "ManageProfileMA"
            }).presentationController.getEditAddressView(address);
        },
    }
});
define("ManageProfileMA/SettingsNewUIModule/frmEditAddressControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** init defined for frmEditAddress **/
    AS_Form_b47c0ffc3ab2403993f030df17f79c1a: function AS_Form_b47c0ffc3ab2403993f030df17f79c1a(eventobject) {
        var self = this;
        this.init();
    }
});
define("ManageProfileMA/SettingsNewUIModule/frmEditAddressController", ["ManageProfileMA/SettingsNewUIModule/userfrmEditAddressController", "ManageProfileMA/SettingsNewUIModule/frmEditAddressControllerActions"], function() {
    var controller = require("ManageProfileMA/SettingsNewUIModule/userfrmEditAddressController");
    var controllerActions = ["ManageProfileMA/SettingsNewUIModule/frmEditAddressControllerActions"];
    return kony.visualizer.mixinControllerActions(controller, controllerActions);
});
