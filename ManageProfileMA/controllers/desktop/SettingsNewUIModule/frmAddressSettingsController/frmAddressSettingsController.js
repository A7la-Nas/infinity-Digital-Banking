define(['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function (CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    let status={};
    var globalScope = this;
    var length = 0;
    var responsiveUtils = new ResponsiveUtils();
    return {
        enableSeparateAddress : false,
   
    /**
     * Init Method 
     */

    init: function() {
      var scopeObj = this;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShowProfile;
      CommonUtilities.setText(this.view.btnAddNewAddressMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewAddress"), CommonUtilities.getaccessibilityConfig());
      //CommonUtilities.setText(this.view.btnAddNewPersonalAddressMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewAddress"), CommonUtilities.getaccessibilityConfig());
      this.view.addressInfo.flxCross.onClick = function(){
        scopeObj.view.addressInfo.isVisible = false;
      }
      this.view.onDeviceBack = function() {};
      this.view.onBreakpointChange = function () {
        scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
       }
            
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
            this.view.CustomPopup.top="20dp";
            CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
        }
        if(kony.os.deviceInfo().deviceWidth <1366 && kony.os.deviceInfo().deviceWidth >1024)
        {
            this.view.lblNoInfoWarningImage.top = "9dp";
        }
        this.view.forceLayout();      
      },
      /**
	*  Method to set the Accessibility configurations
	*/
    setAccessibility: function(){
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
        CommonUtilities.setText(this.view.btnAddNewAddress, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewAddress"), accessibilityConfig);
        CommonUtilities.setText(this.view.btnAddNewPersonalAddress, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewAddress"), accessibilityConfig);
        CommonUtilities.setText(this.view.btnAddNewAddressMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewAddress"), accessibilityConfig);
        CommonUtilities.setText(this.view.btnAddNewPersonalAddressMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewAddress"), accessibilityConfig);
        //CommonUtilities.setText(this.view.lblAddressHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Address"), accessibilityConfig);
        //CommonUtilities.setText(this.view.lblAddNewAddressHeader, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewAddress"), accessibilityConfig);
        CommonUtilities.setText(this.view.btnAddNewAddressAdd, kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD"), accessibilityConfig);
        CommonUtilities.setText(this.view.btnAddNewAddressCancel, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
        //CommonUtilities.setText(this.view.lblSetAsPreferred, kony.i18n.getLocalizedString("i18n.ProfileManagement.SetAsPreferredCommunicationAddress"), accessibilityConfig);
        //CommonUtilities.setText(this.view.lblEditAddressHeader, kony.i18n.getLocalizedString("i18n.ProfileManagement.editAddress"), accessibilityConfig);
        CommonUtilities.setText(this.view.btnEditAddressSave, kony.i18n.getLocalizedString("i18n.ProfileManagement.Save"), accessibilityConfig);
        CommonUtilities.setText(this.view.btnEditAddressCancel, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
        this.view.lblHeading.accessibilityConfig = {
            "a11yARIA": {
                "tabindex": -1
            },
            "a11yLabel": this.view.lblAddressHeading.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
        };
        this.view.segprofilemanagementAddressnew.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddressesList")
        };
        this.view.tbxAddressLine1.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.AddressLine1")
        };
        this.view.lbxType.accessibilityConfig = {
            "a11yLabel":  kony.i18n.getLocalizedString("i18n.common.Type")
        };
        this.view.tbxAddressLine2.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.AddressLine2")
        };
        this.view.tbxCityName.accessibilityConfig = {
            "a11yLabel":  kony.i18n.getLocalizedString("i18n.WireTransfer.CityName")
        };
        this.view.tbxZipcode.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.common.zipcode")
        };
        this.view.lblSetAsPreferredCheckBox.accessibilityConfig = {
            "a11yLabel":  kony.i18n.getLocalizedString("i18n.settings.accessibility.checkbox")
        };
        this.view.imgInfo.accessibilityConfig = {
            "a11yLabel":  kony.i18n.getLocalizedString("i18n.WireTransfers.Information")
        };
        this.view.lblInfoTxt.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddAnotherPrimaryAddress")
        };
        this.view.imgErrorAddAddress.accessibilityConfig = {
            "a11yLabel":   kony.i18n.getLocalizedString("i18n.settings.accessibility.error")
        };
        this.view.lbxEditType.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.common.Type")
        };
        this.view.tbxEditAddressLine1.accessibilityConfig = {
            "a11yLabel":  kony.i18n.getLocalizedString("i18n.WireTransfer.AddressLine1")
        };
        this.view.tbxEditAddressLine2.accessibilityConfig = {
            "a11yLabel":  kony.i18n.getLocalizedString("i18n.WireTransfer.AddressLine2")
        };
        this.view.imgEditInfo.accessibilityConfig = {
            "a11yLabel":  kony.i18n.getLocalizedString("i18n.WireTransfers.Information")
        };
        this.view.lblEditSetAsPreferred.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.SetAsPreferredCommunicationAddress")
        };
        this.view.lblEditSetAsPreferredCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.settings.accessibility.checkbox")
        };
        this.view.tbxEditZipcode.accessibilityConfig = {
            "a11yLabel":  kony.i18n.getLocalizedString("i18n.common.zipcode")
        };
        this.view.tbxEdtCity.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.CityName")
        };
        this.view.tbxEditState.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.common.state")
        };
        this.view.tbxEditCountry.accessibilityConfig = {
            "a11yLabel":  kony.i18n.getLocalizedString("i18n.WireTransfer.Country")
        };
        this.view.lblErrorEditAddress.accessibilityConfig = {
            "a11yLabel":  kony.i18n.getLocalizedString("i18n.settings.accessibility.error")
        };
        this.view.lblEditInfoTxt.accessibilityConfig = {
            "a11yLabel":  kony.i18n.getLocalizedString("i18n.ProfileManagement.AddAnotherPrimaryAddress")
        };
        this.view.lblCollapseMobile.accessibilityConfig = {
             "a11yARIA": {
                "tabindex": -1
              }
        };
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
            "a11yLabel": "Dropdown"
        };
        this.view.flxDeleteClose.accessibilityConfig = {
            a11yLabel : kony.i18n.getLocalizedString("i18n.settings.closeDeletePopup"),
            a11yARIA : {
              tabindex : 0,
              role : "button"
            }
        }
        this.view.btnYes.accessibilityConfig = {
            a11yLabel :kony.i18n.getLocalizedString("i18n.settings.yesDeleteAddress"),
            a11yARIA : {
                tabindex : 0,
                role : "button"
              }
        }
        this.view.btnNo.accessibilityConfig = {
            a11yLabel : kony.i18n.getLocalizedString("i18n.settings.noDontDeleteAddress"),
            a11yARIA : {
                tabindex : 0,
                role : "button"
              }
        }
        this.view.flxSetAsPreferredCheckBox.accessibilityConfig = {
            "a11yARIA": 
            {
                "tabindex" : -1
            }
        };
        this.view.flxEditSetAsPreferredCheckBox.accessibilityConfig = {
            "a11yARIA": 
            {
                "tabindex" : -1
            }
        };
        if (this.view.flxInfo.isVisible === true) {
            this.view.flxInfoIcon.accessibilityConfig = {
                "a11yARIA": {
                    "role": "button",
                    "aria-haspopup": "dialog",
                    "aria-expanded": true
                },
                "a11yLabel": kony.i18n.getLocalizedString("i18n.settings.knowMoreAboutAddress")
            };
        } else {
            this.view.flxInfoIcon.accessibilityConfig = {
                "a11yARIA": {
                    "role": "button",
                    "aria-haspopup": "dialog",
                    "aria-expanded": false
                },
                "a11yLabel": kony.i18n.getLocalizedString("i18n.settings.knowMoreAboutAddress")
            };
        }
        this.view.flxInfo.accessibilityConfig = {
            "a11yARIA": {
                "role": "dialog",
                "tabindex": -1
            }
        }
        this.view.segprofilemanagementAddressnew.accessibilityConfig = {
            "a11yARIA": {
                "tabindex": -1
            }
        };
        this.view.segPersonalAddresses.accessibilityConfig = {
            "a11yARIA": {
                "tabindex": -1
            }
        };
        this.view.segBusinessAddresses.accessibilityConfig = {
            "a11yARIA": {
                "tabindex": -1
            }
        };
      },  
        updateFormUI: function (viewModel) {
            if (viewModel !== undefined) {
                if (viewModel.isLoading !== undefined)
                    this.changeProgressBarState(viewModel.isLoading);
                if (viewModel.campaign) {
                    CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxContainer");
                }
                if (viewModel.addNewAddress)
                    this.showAddNewAddressForm(viewModel.addNewAddress);
                if (viewModel.editAddress)
                    this.showEditAddressForm(viewModel.editAddress);
                if (viewModel.addressList) {
                    if(viewModel.addressList.length === 0){
                        viewModel.addressList = [];
                        FormControllerUtility.hideProgressBar(this.view);
                    }
                    if (viewModel.statusMessage != undefined) {
                        if (viewModel.statusMessage.serviceReqs != undefined) {
                            globalScope.length = viewModel.statusMessage.serviceReqs['length'];
                            if (globalScope.length != 0 && viewModel.statusMessage.serviceReqs[globalScope.length - 1].serviceReqStatus == "Admin Approval Pending") {
                                globalScope.status = viewModel.statusMessage.serviceReqs[globalScope.length - 1].serviceReqStatus;
                            }
                        }
                    }
                    this.updateAddressList(viewModel.addressList);
                }
                
            }
            this.view.forceLayout();
            if (this.view.flxErrorAddAddress.isVisible === true){
                this.view.flxHeader.setFocus(true);
            }
            this.view.lblAddressHeading.setActive(true);
        },
        preShow: function () {
            var self = this;          
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
          	this.view.segprofilemanagementAddressnew.removeAll();
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
            var scopeObj = this;
            this.setAccessibility();
           //Address flow
            this.view.btnAddNewAddress.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "SettingsNewUIModule",
                    "appName": "ManageProfileMA"
                }).presentationController.getAddNewAddressView();
            };
            this.view.btnAddNewPersonalAddress.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "SettingsNewUIModule",
                    "appName": "ManageProfileMA"
                }).presentationController.getAddNewAddressView();
            };
            this.view.btnAddNewAddressMobile.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "SettingsNewUIModule",
                    "appName": "ManageProfileMA"
                }).presentationController.getAddNewAddressView();
            };
            this.view.btnAddNewPersonalAddressMobile.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "SettingsNewUIModule",
                    "appName": "ManageProfileMA"
                }).presentationController.getAddNewAddressView();
            };
            this.view.btnAddNewAddressCancel.onClick = function () {
                scopeObj.showAddresses();
            };
            this.view.btnAddNewAddressAdd.onClick = function () {
                //write code to ADD new Address
                scopeObj.showAddresses();
            };
            this.view.btnEditAddressCancel.onClick = function () {
                scopeObj.showAddresses();
            };
            this.view.btnEditAddressSave.onClick = function () {
                //Add code to save new address
                scopeObj.showAddresses();
            };
            this.view.flxSetAsPreferredCheckBox.onClick = function () {
                if (totalAddress != 0) {
                    scopeObj.toggleFontCheckBox(scopeObj.view.lblSetAsPreferredCheckBox);
                }
            };
            this.view.flxEditSetAsPreferredCheckBox.onClick = function () {
                scopeObj.toggleFontCheckBox(scopeObj.view.lblEditSetAsPreferredCheckBox);
            };
            if (!CommonUtilities.isCSRMode()) {
                this.setNewAddressValidationActions();
                this.setUpdateAddressValidationActions();
            }
            this.view.forceLayout();
        },
        /**
         * *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
         *  Method to set the text in mobile breakpoint
         */
        setSelectedValue: function (text) {
          var self = this;
      CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text) , CommonUtilities.getaccessibilityConfig());
        },
        toggleFontCheckBox: function (imgCheckBox) {
            if (imgCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                imgCheckBox.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                imgCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            } else {
                imgCheckBox.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
                imgCheckBox.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            }
        },
        onKeyPressCallBack: function(eventObject, eventPayload){
            var scopeObj = this;
            var kIndex;
            if (eventPayload.keyCode === 27) {
                if (scopeObj.view.flxInfo.isVisible === true) {
                    scopeObj.view.flxInfo.isVisible = false;
                    scopeObj.view.flxInfoIcon.accessibilityConfig = {
                        a11yARIA: {
                            role: "button",
                            "aria-haspopup": "dialog",
                            "aria-expanded": false
                        },
                        "a11yLabel":kony.i18n.getLocalizedString("i18n.settings.knowMoreAboutAddress")
                    };
                    scopeObj.view.flxInfoIcon.setActive(true);
                }
                var data = scopeObj.view.segprofilemanagementAddressnew.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].flxEdit !== undefined) {
                        if (data[i].flxEdit.isVisible === true) {
                            data[i].flxEdit.isVisible = false;
                            kIndex=i;
                            var addr = data[i].flxImgElipses.accessibilityConfig.a11yLabel;
                            data[i].flxImgElipses.accessibilityConfig = {
                                "a11yLabel": addr,
                                "a11yARIA": {
                                    "aria-expanded": false,
                                    "aria-haspopup": "dialog",
                                    "aria-labelledby": "lblHome",
                                    "role": "button",
                                    "tabindex": 0
                                }
                            }
                        }
                    }
                }
                scopeObj.view.segprofilemanagementAddressnew.setData(data);
                eventPayload.preventDefault();  
                scopeObj.view.segprofilemanagementAddressnew.setActive(kIndex, 0, "flxProfileManagement.flxAddressWrapper.flxAddressDetailContainer.flxAreaOfAddress.flxImgElipses");
                if (scopeObj.view.flxDelete.isVisible === true){
                    scopeObj.view.flxDelete.isVisible = false;
                    scopeObj.view.flxDialogs.isVisible = false;
                }
                if (scopeObj.view.flxLogout.isVisible === true){
                    scopeObj.view.flxLogout.isVisible = false;
                    scopeObj.view.flxDialogs.isVisible = false;
                    scopeObj.view.customheadernew.btnLogout.setActive(true);
                }
            }
            if (eventPayload.shiftKey && eventPayload.keyCode === 9){
                var data = scopeObj.view.segprofilemanagementAddressnew.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].flxEdit !== undefined) {
                        if (data[i].btnDelete.isVisible === false) {
                            data[i].flxEdit.isVisible = false;
                            var addr = data[i].flxImgElipses.accessibilityConfig.a11yLabel;
                            data[i].flxImgElipses.accessibilityConfig = {
                                "a11yLabel": addr,
                                "a11yARIA": {
                                    "aria-expanded": false,
                                    "aria-haspopup": "dialog",
                                    "aria-labelledby": "lblHome",
                                    "role": "button",
                                    "tabindex": 0
                                }
                            }
                        }
                    }
                }
                scopeObj.view.segprofilemanagementAddressnew.setData(data);
            }
        },
        onEditKeyPressCallback: function(eventObject,eventPayload){
            var scopeObj = this;
            var index = 0;
            if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                var data = scopeObj.view.segprofilemanagementAddressnew.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].flxEdit !== undefined) {
                        if (data[i].flxEdit.isVisible === true) {
                            data[i].flxEdit.isVisible = false;
                            index = i;
                            var addr = data[i].flxImgElipses.accessibilityConfig.a11yLabel;
                            data[i].flxImgElipses.accessibilityConfig = {
                                "a11yLabel": addr,
                                "a11yARIA": {
                                    "aria-expanded": false,
                                    "aria-haspopup": "dialog",
                                    "aria-labelledby": "lblHome",
                                    "role": "button",
                                    "tabindex": 0
                                }
                            }
                        }
                    }
                }
                scopeObj.view.segprofilemanagementAddressnew.setData(data);
                eventPayload.preventDefault();
                scopeObj.view.segprofilemanagementAddressnew.setActive(index, 0, "flxProfileManagement.flxAddressWrapper.flxAddressDetailContainer.flxAreaOfAddress.flxImgElipses");
            }
            if (eventPayload.keyCode === 27) {
                var data = scopeObj.view.segprofilemanagementAddressnew.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].flxEdit !== undefined) {
                        if (data[i].flxEdit.isVisible === true) {
                            data[i].flxEdit.isVisible = false;
                            index = i;
                            var addr = data[i].flxImgElipses.accessibilityConfig.a11yLabel;
                            data[i].flxImgElipses.accessibilityConfig = {
                                "a11yLabel": addr,
                                "a11yARIA": {
                                    "aria-expanded": false,
                                    "aria-haspopup": "dialog",
                                    "aria-labelledby": "lblHome",
                                    "role": "button",
                                    "tabindex": 0
                                }
                            }
                        }
                    }
                }
                scopeObj.view.segprofilemanagementAddressnew.setData(data);
                eventPayload.preventDefault();
                scopeObj.view.segprofilemanagementAddressnew.setActive(index, 0, "flxProfileManagement.flxAddressWrapper.flxAddressDetailContainer.flxAreaOfAddress.flxImgElipses");
            }
        },
        infoOnKeyPress: function(eventObject, eventPayload, context) {
            var scopeObj = this;
            if (eventObject.id === "flxCloseIcon") {
                if (eventPayload.keyCode === 9 && eventPayload.shiftKey === false) {
                    eventPayload.preventDefault();
                    scopeObj.view.flxInfo.isVisible = false;
                    scopeObj.view.flxInfoIcon.accessibilityConfig = {
                        a11yARIA: {
                            role: "button",
                            "aria-haspopup": "dialog",
                            "aria-expanded": false
                        },
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.settings.knowMoreAboutAddress")
                    };
                    scopeObj.view.flxInfoIcon.setActive(true);
                }
            }
            if (eventObject.id === "lblInfo") {
                if (eventPayload.keyCode === 9 && eventPayload.shiftKey === true) {
                    eventPayload.preventDefault();
                    scopeObj.view.flxInfo.isVisible = false;
                    scopeObj.view.flxInfoIcon.accessibilityConfig = {
                        a11yARIA: {
                            role: "button",
                            "aria-haspopup": "dialog",
                            "aria-expanded": false
                        },
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.settings.knowMoreAboutAddress")
                    };
                    scopeObj.view.flxInfoIcon.setActive(true);
                }
            }
            if (eventPayload.keyCode === 27){
                eventPayload.preventDefault();
                scopeObj.view.flxInfo.isVisible = false;
                scopeObj.view.flxInfoIcon.accessibilityConfig = {
                    a11yARIA: {
                        role: "button",
                        "aria-haspopup": "dialog",
                        "aria-expanded": false
                    },
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.settings.knowMoreAboutAddress")
                };
                scopeObj.view.flxInfoIcon.setActive(true);
            }
        },
        onDeleteKeyPressCallback: function(eventObject, eventPayload) {
            var scopeObj = this;
            var index = 0;
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey === false){
                var data = scopeObj.view.segprofilemanagementAddressnew.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].flxEdit !== undefined) {
                        if (data[i].flxEdit.isVisible === true) {
                            data[i].flxEdit.isVisible = false;
                            index = i;
                            var addr = data[i].flxImgElipses.accessibilityConfig.a11yLabel;
                            data[i].flxImgElipses.accessibilityConfig = {
                                "a11yLabel": addr,
                                "a11yARIA": {
                                    "aria-expanded": false,
                                    "aria-haspopup": "dialog",
                                    "aria-labelledby": "lblHome",
                                    "role": "button",
                                    "tabindex": 0
                                }
                            }
                        }
                    }
                }
                scopeObj.view.segprofilemanagementAddressnew.setData(data);
                eventPayload.preventDefault();
                scopeObj.view.segprofilemanagementAddressnew.setActive(index, 0, "flxProfileManagement.flxAddressWrapper.flxAddressDetailContainer.flxAreaOfAddress.flxImgElipses");
            }
            if (eventPayload.keyCode === 27) {
                var data = scopeObj.view.segprofilemanagementAddressnew.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].flxEdit !== undefined) {
                        if (data[i].flxEdit.isVisible === true) {
                            data[i].flxEdit.isVisible = false;
                            index = i;
                            var addr = data[i].flxImgElipses.accessibilityConfig.a11yLabel;
                            data[i].flxImgElipses.accessibilityConfig = {
                                "a11yLabel": addr,
                                "a11yARIA": {
                                    "aria-expanded": false,
                                    "aria-haspopup": "dialog",
                                    "aria-labelledby": "lblHome",
                                    "role": "button",
                                    "tabindex": 0
                                }
                            }
                        }
                    }
                }
                scopeObj.view.segprofilemanagementAddressnew.setData(data);
                eventPayload.preventDefault();
                scopeObj.view.segprofilemanagementAddressnew.setActive(index, 0, "flxProfileManagement.flxAddressWrapper.flxAddressDetailContainer.flxAreaOfAddress.flxImgElipses");
            }
        },
        /**
           * Method to hide all the flex of main body
           * @param {Object} addAddressViewModel - None
           */
        showAddNewAddressForm: function (addAddressViewModel) {
            var self = this;
            this.hideAll();
            this.view.flxAddNewAddressWrapper.setVisibility(true);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
             this.view.flxAddressWrapper.height = "800dp";
            }
            if (addAddressViewModel.serverError) {
                this.view.flxErrorAddAddress.setVisibility(true);
                CommonUtilities.setText(this.view.lblErrortxt, addAddressViewModel.serverError.errorMessage, CommonUtilities.getaccessibilityConfig());
            } else {
                this.view.flxErrorAddAddress.setVisibility(false);
            if(addAddressViewModel.addressTypes.length>0){
              this.view.lbxType.masterData = addAddressViewModel.addressTypes;
            this.view.lbxType.selectedKey = addAddressViewModel.addressTypeSelected;
            }
            this.view.tbxAddressLine1.text = addAddressViewModel.addressLine1;
            this.view.tbxAddressLine2.text = addAddressViewModel.addressLine2;
            this.view.lbxCountry.masterData = addAddressViewModel.countryNew;
            this.view.lbxCountry.selectedKey = addAddressViewModel.countrySelected;
            this.view.lbxState.masterData = addAddressViewModel.stateNew;
            this.view.lbxState.selectedKey = addAddressViewModel.stateSelected;
            this.view.tbxZipcode.text = addAddressViewModel.zipcode;
            this.view.lblSetAsPreferredCheckBox.skin = addAddressViewModel.isPreferredAddress ? ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN : ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            var countryId = self.view.lbxCountry.selectedKeyValue[0];
            if (countryId == "1") {
                self.view.lbxState.setEnabled(false);
            }
            this.view.lbxCountry.onSelection = function () {
                var data = [];
                var countryId = self.view.lbxCountry.selectedKeyValue[0];
                if (countryId == "1") {
                    self.checkNewAddressForm();
                    self.view.lbxState.masterData = addAddressViewModel.stateNew;
                    self.view.lbxState.selectedKey = addAddressViewModel.stateSelected;
                    self.view.lbxCountry.selectedKey = countryId;
                    self.view.lbxState.setEnabled(false);
                 } else {
                    self.view.lbxState.setEnabled(true);
                    self.view.lbxCountry.selectedKey = countryId;
                    data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.getSpecifiedCitiesAndStates("country", countryId, addAddressViewModel.stateNew);
                    self.view.lbxState.masterData = data.states;
                    self.view.lbxState.selectedKey = addAddressViewModel.stateSelected;
                    var stateId = self.view.lbxState.selectedKeyValue[0];
                    if (stateId == "lbl1") {
                        self.checkNewAddressForm();
                        self.view.lbxCountry.masterData = addAddressViewModel.countryNew;
                        self.view.lbxCountry.selectedKey = countryId;
                    } else {
                        self.view.lbxState.setEnabled(true);
                        self.checkNewAddressForm();
                    }
                }
            };
            this.view.lbxState.onSelection = function () {
                var data = [];
                var stateId = self.view.lbxState.selectedKeyValue[0];
                if (stateId == "lbl1") {
                    self.checkNewAddressForm();
                } else {
                    self.view.lbxState.setEnabled(true);
                    data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.getSpecifiedCitiesAndStates("state", stateId, addAddressViewModel.cityNew);
                }
                self.checkNewAddressForm();
            };
            if (totalAddress == 0) {
                this.view.lblSetAsPreferredCheckBox.skin = addAddressViewModel.isPreferredAddress ? ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN : ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
                CommonUtilities.setText(this.view.lblSetAsPreferredCheckBox, addAddressViewModel.isPreferredAddress ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_SELECTED, CommonUtilities.getaccessibilityConfig());
            }
            else {
                CommonUtilities.setText(this.view.lblSetAsPreferredCheckBox, addAddressViewModel.isPreferredAddress ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, CommonUtilities.getaccessibilityConfig());
            }
            this.checkNewAddressForm();
            this.view.btnAddNewAddressAdd.onClick = function () {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.saveAddress(this.getNewAddressFormData());
            }.bind(this);
            }
        },
        /**
          * Method to show data related to New Address scenario
          * @param {Object} - which sets the data
          */
        getNewAddressFormData: function () {
            return {
                addrLine1: this.view.tbxAddressLine1.text.trim(),
                addrLine2: this.view.tbxAddressLine2.text.trim(),
                countrySelected:this.view.lbxCountry.selectedKey,// this.view.lbxCountry.selectedKey,
                zipcode: this.view.tbxZipcode.text.trim(),
                isPreferredAddress: this.view.lblSetAsPreferredCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED,
                Addr_type: this.view.lbxType.selectedKey,
                stateSelected: this.view.lbxState.selectedKey,//this.view.lbxState.selectedKey,
                citySelected: this.view.tbxCityName.text.trim()//.selectedKey
            };
        },

        /**
         * Method to validate the address entered
         */
        checkNewAddressForm: function () {
            var addAddressFormData = this.getNewAddressFormData();
            if (addAddressFormData.addressLine1 === '') {
                this.disableButton(this.view.btnAddNewAddressAdd);
            } else if (addAddressFormData.zipcode === '') {
                this.disableButton(this.view.btnAddNewAddressAdd);
            } else if (addAddressFormData.city === '') {
                this.disableButton(this.view.btnAddNewAddressAdd);
            } else if (addAddressFormData.countrySelected === "1") {
                this.disableButton(this.view.btnAddNewAddressAdd);
            } else if (addAddressFormData.stateSelected === "lbl1") {
                this.disableButton(this.view.btnAddNewAddressAdd);
            } else if (addAddressFormData.citySelected === "") {
                this.disableButton(this.view.btnAddNewAddressAdd);
            } else {
                this.enableButton(this.view.btnAddNewAddressAdd);
            }
        },

        /**
         *  Method to set ui for the component in mobile breakpoint
         */
        toggleMenuMobile: function () {
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
        changeProgressBarState: function (isLoading) {
            if (isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },
        postShowProfile: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.onKeyPress = this.onKeyPressCallBack.bind(this);
            this.view.flxCloseIcon.onKeyPress = this.infoOnKeyPress.bind(this);
            this.view.lblInfo.onKeyPress = this.infoOnKeyPress.bind(this);
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack.bind(this);
            this.view.segprofilemanagementAddressnew.onKeyPress =  this.onKeyPressCallBack.bind(this);
            this.view.flxDelete.onKeyPress = this.onKeyPressCallBack.bind(this);
            this.view.forceLayout();
            this.view.lblAddressHeading.setActive(true);
        },

        /**
         * Method to hide all the flex of main body
         * @param {Object} editAddressViewModel - None
         */
        showEditAddressForm: function (editAddressViewModel) {
            var self = this;
            this.hideAll();
            this.view.flxEditAddressWrapper.setVisibility(true);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
             this.view.flxAddressWrapper.height = "800dp";
            }
          if(editAddressViewModel.addressTypes.length>0){
             this.view.lbxEditType.masterData = editAddressViewModel.addressTypes;
            this.view.lbxEditType.selectedKey = editAddressViewModel.addressTypeSelected;
          }
            this.view.tbxEditAddressLine1.text = editAddressViewModel.addressLine1;
            this.view.tbxEditAddressLine2.text = editAddressViewModel.addressLine2 || "";
			self.view.tbxEdtCity.text = (editAddressViewModel.city)?editAddressViewModel.city:editAddressViewModel.citySelected || "";            
            data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.getSpecifiedCitiesAndStates("country", editAddressViewModel.countrySelected, editAddressViewModel.stateNew);
            self.view.lbxEditState.masterData = data.states;
            self.view.lbxEditState.selectedKey = editAddressViewModel.stateSelected;
            this.view.lbxEditCountry.masterData = editAddressViewModel.countryNew;
            this.view.lbxEditCountry.selectedKey = editAddressViewModel.countrySelected;
            this.view.lbxEditState.selectedKey = editAddressViewModel.stateSelected;
            this.view.lbxEditCountry.onSelection = function() {
                var data = [];
                var countryId = self.view.lbxEditCountry.selectedKeyValue[0];
                if (countryId == "1") {
                    self.checkUpdateAddressForm();
                    self.view.lbxEditState.masterData = editAddressViewModel.stateNew;
                    self.view.lbxEditState.selectedKey = editAddressViewModel.stateNew[0][0];
                    self.view.lbxEditState.setEnabled(false);
                    self.disableButton(self.view.btnEditAddressSave);
                } else {
                    self.view.lbxEditState.setEnabled(true);
                    self.disableButton(self.view.btnEditAddressSave);
                    data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.getSpecifiedCitiesAndStates("country", countryId, editAddressViewModel.stateNew);
                    self.view.lbxEditState.masterData = data.states;
                    self.view.lbxEditState.selectedKey = data.states[0][0];
                }
            };
            this.view.lbxEditState.onSelection = function() {
                var data = [];
                var stateId = self.view.lbxEditState.selectedKeyValue[0];
                if (stateId == "lbl1") {
                    self.disableButton(self.view.btnEditAddressSave);
                } else {
                    self.enableButton(self.view.btnEditAddressSave);
                }
            };
            
            
            self.view.tbxEditCountry.text = editAddressViewModel.country || "";
            self.view.tbxEditState.text = editAddressViewModel.state || "";
            this.view.tbxEditZipcode.text = editAddressViewModel.zipcode;
            this.view.lblEditSetAsPreferredCheckBox.skin = editAddressViewModel.isPreferredAddress ? ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN : ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            CommonUtilities.setText(this.view.lblEditSetAsPreferredCheckBox, editAddressViewModel.isPreferredAddress ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, CommonUtilities.getaccessibilityConfig());
            this.view.flxEditSetAsPreferred.setVisibility(!editAddressViewModel.isPreferredAddress);
            this.checkUpdateAddressForm();
            if (CommonUtilities.isCSRMode()) {
                this.view.btnEditAddressSave.onClick = CommonUtilities.disableButtonActionForCSRMode();
                this.view.btnEditAddressSave.skin = CommonUtilities.disableButtonSkinForCSRMode();
            } else {
                this.view.btnEditAddressSave.onClick = function () {
                    FormControllerUtility.showProgressBar(self.view);
                    var data = this.getUpdateAddressData();
                    data.addressId = editAddressViewModel.addressId;
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.saveAddress(data);
                }.bind(this);
            }
            this.view.forceLayout();
        },
        /**
          * Method to Enable a button
          * @param {String} button - ID of the button to be enabled
          */
        enableButton: function (button) {
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
        disableButton: function (button) {
            button.setEnabled(false);
            button.skin = "sknBtnBlockedSSPFFFFFF15Px";
            button.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
            button.focusSkin = "sknBtnBlockedSSPFFFFFF15Px";
        },
        hideAll: function () {
            this.view.flxAddressesWrapper.setVisibility(false);
            this.view.flxAddNewAddressWrapper.setVisibility(false);
            this.view.flxEditAddressWrapper.setVisibility(false);
        },
        /**
          * Method to show data after updating the New Address scenario
          */
        getUpdateAddressData: function () {
            return {
                addrLine1: this.view.tbxEditAddressLine1.text.trim(),
                addrLine2: this.view.tbxEditAddressLine2.text.trim(),
                Country_id: this.view.lbxEditCountry.selectedKey,
                Region_id: this.view.lbxEditState.selectedKey,
                City_id: this.view.tbxEdtCity.text,
                ZipCode: this.view.tbxEditZipcode.text.trim(),
                isPrimary: this.view.lblEditSetAsPreferredCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED,
                Addr_type: this.view.lbxEditType.selectedKey
            };
        },
        /**
           * Method to validate the edited address
           */
        checkUpdateAddressForm: function () {
            if (!CommonUtilities.isCSRMode()) {
                var addAddressFormData = this.getUpdateAddressData();
                if (addAddressFormData.addrLine1 === '') {
                    this.disableButton(this.view.btnEditAddressSave);
                } else if (addAddressFormData.ZipCode === '') {
                    this.disableButton(this.view.btnEditAddressSave);
                } else if (addAddressFormData.Country_id === '1') {
                    this.disableButton(this.view.btnEditAddressSave);
                } else if (addAddressFormData.Region_id === 'lbl1') {
                    this.disableButton(this.view.btnEditAddressSave);
                } else if (addAddressFormData.City_id === '') {
                    this.disableButton(this.view.btnEditAddressSave);
                } else {
                    this.enableButton(this.view.btnEditAddressSave);
                }
            }
        },
        /**
           * Method to assign validation action on the address fields
           */
        setNewAddressValidationActions: function () {
            this.disableButton(this.view.btnAddNewAddressAdd);
            this.view.tbxAddressLine1.onKeyUp = this.checkNewAddressForm.bind(this);
            this.view.tbxAddressLine2.onKeyUp = this.checkNewAddressForm.bind(this);
            this.view.tbxZipcode.onKeyUp = this.checkNewAddressForm.bind(this);
            this.view.tbxCityName.onKeyUp = this.checkNewAddressForm.bind(this);
        },
        /**
         * Method to assign validation action on the edit address fields
         */
        setUpdateAddressValidationActions: function () {
            this.disableButton(this.view.btnEditAddressSave);
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
        getBase64: function (file, successCallback) {
            var reader = new FileReader();
            reader.onloadend = function () {
                successCallback(reader.result);
            };
            reader.readAsDataURL(file);
        },
        /**
          * Method to update the list of address
          * @param {Object} addressListViewModel- list of addresses
          */
        updateAddressList: function (addressListViewModel) {
            this.showAddresses();
            var currBreakpoint = kony.application.getCurrentBreakpoint();
             if (addressListViewModel.serverError) {
                this.view.flxProfileError.setVisibility(true);
                CommonUtilities.setText(this.view.rtxError, addressListViewModel.serverError.errorMessage, CommonUtilities.getaccessibilityConfig());
            } else {
            if (addressListViewModel.length >= 3 || !applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")) {
                this.view.btnAddNewAddress.setVisibility(false);
               this.view.btnAddNewAddressMobile.setVisibility(false);
            } else {
               if (currBreakpoint === 640 || orientationHandler.isMobile) {
                    this.view.btnAddNewAddressMobile.setVisibility(true);
                //    this.view.btnAddNewPersonalAddressMobile.setVisibility(true);
                }
                else{
                    this.view.btnAddNewAddress.setVisibility(true);
                    //this.view.btnAddNewPersonalAddress.setVisibility(true);    
                }
            }
            this.setAddressSegmentData(addressListViewModel);
           }
        },
        showAddresses: function () {
            this.hideAll();
            this.view.flxAddressesWrapper.setVisibility(true);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
             this.view.flxAddressWrapper.height = "550dp";
            }
           
        },
        sortByPrimary: function(arr, val, prop) {
            var top = [];
            var rest = [];
            for (var el of arr) {
                if (el[prop] == val) {
                    top.push(el)
                } else {
                    rest.push(el);
                }
            }
            return top.concat(rest);
        },
        /**
         * Method to set all the data of the address module
         * @param {Object} userAddresses- List of all the addresses related to user
         */
        setAddressSegmentData: function (userAddressesNotSorted) {
            var userAddresses = this.sortByPrimary(userAddressesNotSorted, "true", "isPrimary");
            totalAddress = userAddresses.length;
            for (i = 0; i < totalAddress; i++) {
                if (userAddresses[i].isPrimary === "true" && globalScope.length != 0) {
                   
                    userAddresses[i].statusMsg = globalScope.status;
                }
            }
            if(totalAddress>0){
            this.view.flxAddressBody.setVisibility(true);
            this.view.flxNoInfoWarning.setVisibility(false);
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var scopeObj = this;
            var userPersonalAddresses = [];
            var userBusinessAddresses = [];
            if (isCombinedUser) {
                userAddresses.forEach(function (item) {
                    if (item.isTypeBusiness === "true")
                        userBusinessAddresses.push(item);
                    else
                        userPersonalAddresses.push(item);
                });
                this.view.flxAddresses.setVisibility(false);
                this.view.flxCombinedAddresses.setVisibility(true);
            }
            else {
                this.view.flxAddresses.setVisibility(true);
                this.view.flxCombinedAddresses.setVisibility(false);
            }
            function getDeleteAddressEmailListener(address) {
                return function () {
                    var currForm = scopeObj.view;
                    //currForm.flxDeletePopUp.height = currForm.flxHeader.info.frame.height + currForm.flxContainer.info.frame.height + currForm.flxFooter.info.frame.height;
                    currForm.flxDialogs.setVisibility(true);
                    currForm.flxDelete.setVisibility(true);
                    currForm.flxLogout.setVisibility(false);
                    currForm.CopyflxDelete0e50a3339fe454b.top = "190dp";
                    currForm.flxDialogs.accessibilityConfig = {
                        "a11yARIA": {
                            "tabindex": -1
                        }
                    }
                    currForm.flxDelete.accessibilityConfig = {
                        "a11yARIA": {
                            "tabindex": -1
                        }
                    }
                    currForm.CopyflxDelete0e50a3339fe454b.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "dialog",
                            "tabindex": -1
                        }
                    }
                    currForm.flxDialogs.isModalContainer = true;
                    currForm.lblDeleteHeader.setActive(true);
                    scopeObj.view.flxDelete.left = "0%";
                    currForm.forceLayout();
                    currForm.btnYes.onClick = function () {
                        scopeObj.view.flxDelete.setFocus(true);
                        scopeObj.view.flxDialogs.isModalContainer = false;
                        scopeObj.view.flxDialogs.setVisibility(false);
                        scopeObj.view.flxDelete.setVisibility(false);
                        scopeObj.view.flxDelete.left = "-100%";
                        scopeObj.view.forceLayout();
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.deleteAddress(address);
                    };
                    currForm.btnNo.onClick = function () {
                        scopeObj.view.flxDelete.setFocus(true);
                        scopeObj.view.flxDialogs.isModalContainer = false;
                        scopeObj.view.flxDialogs.setVisibility(false);
                        scopeObj.view.flxDelete.setVisibility(false);
                        scopeObj.view.flxDelete.left = "-100%";
                        scopeObj.view.forceLayout();
                        var segData = scopeObj.view.segprofilemanagementAddressnew.data;
                        for (var i = 0; i < segData.length; i++) {
                            if (address.AddressLine1 === segData[i].lblAddressLine1.text) {
                                scopeObj.view.segprofilemanagementAddressnew.rowTemplate = "flxProfileManagement";
                                scopeObj.view.segprofilemanagementAddressnew.setActive(i, 0, "flxProfileManagement.flxAddressWrapper.flxEdit.btnDelete");
                            }
                        }
                    };
                    currForm.flxDeleteClose.onClick = function() {
                        scopeObj.view.flxDelete.setFocus(true);
                        scopeObj.view.flxDialogs.isModalContainer = false;
                        scopeObj.view.flxDialogs.setVisibility(false);
                        scopeObj.view.flxDelete.setVisibility(false);
                        scopeObj.view.forceLayout();
                        var segData = scopeObj.view.segprofilemanagementAddressnew.data;
                        for (var i = 0; i < segData.length; i++) {
                            if (address.AddressLine1 === segData[i].lblAddressLine1.text) {
                                scopeObj.view.segprofilemanagementAddressnew.rowTemplate = "flxProfileManagement";
                                scopeObj.view.segprofilemanagementAddressnew.setActive(i, 0, "flxProfileManagement.flxAddressWrapper.flxEdit.btnDelete");
                            }
                        }
                    };
                }
            }
            function getEditAddressListener(address) {
                return function () {
                    scopeObj.editAddress(address, userAddresses);
                };
            }
            
            var dataMap = {
                "btnEdit": "btnEdit",
                "btnDelete":"btnDelete",
                "flxPendingRequest":"flxPendingRequest",
                "imgPendingIcon":"imgPendingIcon",
                "lblPendingRequest":"lblPendingRequest",
                "flxImgElipses":"flxImgElipses",
                "imgelipses":"imgelipses",
                "flxAddress": "flxAddress",
                "flxProfileManagement":"flxProfileManagement",
                "flxAddressWrapper": "flxAddressWrapper",
                "flxEdit": "flxEdit",
                "flxAddressDetailContainer":"flxAddressDetailContainer",
                "lblAddessLine2": "lblAddessLine2",
                "lblAddressLine1": "lblAddressLine1",
                "lblAddressLine3": "lblAddressLine3",
                "lblAddressType": "lblAddressType",
                "flxUsedFor":"flxUsedFor",
                "lblUsedFor": "lblUsedFor",
                "imgInfoIcon":"imgInfoIcon",
                "flxPrimary":"flxPrimary",
                "lblPrimary":"lblPrimary",
                "flxAreaOfAddress":"flxAreaOfAddress",
                "lblHome":"lblHome",
                "lblSeperator": "lblSeperator"

            };
           /* this.segprofilemanagementAddressnew.flxImgElipses.onClick = function(){
                this.segprofilemanagementAddressnew.flxEdit.setVisibility(true);
            };*/
            // var addressTypes = {
            //     "ADR_TYPE_WORK": kony.i18n.getLocalizedString("i18n.common.Work"),
            //     "ADR_TYPE_HOME": kony.i18n.getLocalizedString("kony.tab.common.home")
            // }
            var flexWidth = "135px";
            var textToShow = "";
            if (isCombinedUser) {
                var personalData = userPersonalAddresses.map(function (address) {
                    if (address.isPrimary === "true" && address.isAlertsRequired === "true" && scopeObj.enableSeparateAddress) {
                        flexWidth = "175px";
                        textToShow = kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryAlertComm");
                      } else if (address.isAlertsRequired === "true" && scopeObj.enableSeparateAddress) {
                        flexWidth = "120px";
                        textToShow = kony.i18n.getLocalizedString("i18n.alertSettings.alertComm");
                      } else if (address.isPrimary === "true") {
                        flexWidth = "135px";
                        textToShow = kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryComm");
                      }
                    var state = "";
                    if (address.RegionName === undefined) {
                        state = "";
                    } else {
                        state = address.RegionName + ", ";
                    }
                    var city = (address.CityName)?address.CityName:address.City_id;
                      var dataObject = {
                        "lblHome": {
                            "text": (address.isPrimary === 'true') ? kony.i18n.getLocalizedString("kony.tab.common.home") : kony.i18n.getLocalizedString("i18n.common.Work"),
                            /*"accessibilityConfig": {
                                "a11yLabel": addressTypes[address.AddressType],
                            },*/
                        },
                        "lblAddressLine1": {
                            "text": address.AddressLine1,
                            /*"accessibilityConfig": {
                                "a11yLabel": address.AddressLine1,
                                "a11yARIA": 
					{
						"tabindex" : 1
					}
                            },*/
                        },
                        "lblAddessLine2": {
                            "text": address.AddressLine2 !== undefined && address.AddressLine2 !== null && address.AddressLine2 !== ""  ? address.AddressLine2 : (city === "" || city === undefined || city === null) ? (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))):city + ", " + (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))),
                            /*"accessibilityConfig": {
                                "a11yLabel": address.AddressLine2 ? address.AddressLine2 : (city + ', ' + state + (address.CountryCode)?address.CountryCode:(address.Country_id)?(address.Country_id):""  + ', ' + (address.ZipCode)?address.ZipCode:""),
                                "a11yARIA": 
					{
						"tabindex" : 1,
						"role": "button"
					}
                            },*/
                        },
                        "lblAddressLine3": {
                            "text": address.AddressLine2 ? (city === "" || city === undefined || city === null) ? (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))):city + ", " + (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))): "",
                            /*"accessibilityConfig": {
                                "a11yLabel": address.AddressLine2 ? (city + ', ' + state + ((address.CountryCode)?address.CountryCode:(address.Country_id)?(address.Country_id):"")  + ', ' + ((address.ZipCode)?address.ZipCode:"")) : "",
                                "a11yARIA": 
					{
						"tabindex" : 0
					}
                            },*/
                        },
                        "flxImgElipses": {
                            "accessibilityConfig": {
                                "a11yLabel": (address.isPrimary === 'true') ? "Open list of quick actions for Home Address" : "Open list of quick actions for Work Address",
                                "a11yARIA": {
                                    "aria-haspopup": "dialog",
                                    "aria-labelledby": "lblHome",
                                    "role": "button",
                                    "tabindex": (address.isPrimary == "true") ? ((applicationManager.getConfigurationManager().checkUserPermission("UPDATE_PRIMARY_ADDRESS")) ? 0 : -1) : 0
                                }
                            },
                        },
                        "btnEdit": {
                            "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                            "accessibilityConfig": {
                                "a11yLabel": (address.isPrimary === 'true') ? "Edit Home Address" : "Edit Work Address",
                                "a11yARIA": 
					{
						"tabindex" : 0,
						"role": "button"
					}
                            },
                            onClick: getEditAddressListener(address),
                            "onKeyPress": scopeObj.onEditKeyPressCallback,
                            isVisible: (address.isPrimary == "true") ? ((applicationManager.getConfigurationManager().checkUserPermission("UPDATE_PRIMARY_ADDRESS")) ? true : false) : true
                        },
                        "btnDelete": {
                            "text": address.isPrimary === "true" ? "" : kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
                            "accessibilityConfig": {
                                "a11yARIA":{
                                    "aria-haspopup": "dialog"
                                },
                                "a11yLabel": address.isPrimary === "true" ? "Delete Home Address" : "Delete Work Address",
                            },
                            onClick: CommonUtilities.isCSRMode() ? CommonUtilities.disableButtonActionForCSRMode() : getDeleteAddressEmailListener(address),
                            "onKeyPress": scopeObj.onDeleteKeyPressCallback,
                            isVisible: applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")?(address.isPrimary === "true" ?false:true):false
                        },
                        "flxUsedFor": {
                            "isVisible": address.isPrimary === "true" || (address.isAlertsRequired === "true" && scopeObj.enableSeparateAddress) ? true : false
                        },
                        "flxPrimary": {
                            "width": "160dp"
                        },
                        "lblPrimary": {
                            "text": textToShow,
                            /*"accessibilityConfig": {
                                "a11yLabel": textToShow,
                            },*/
                        },
                        "flxPendingRequest": {
                            "isVisible": address.statusMsg ? true : false
                        },
                        // "lblPendingRequest": {
                        //     "text": address.statusMsg === "true" ? true : false
                        // },
                        "lblUsedFor": {
                            "text": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor"),
                            /*"accessibilityConfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor")
                            }*/
                        },
                        "lblSeperator": {
                            "text":"",
                            "accessibilityConfig": {
                              "a11yLabel": "",
                            }
                            },
                        "template": "flxProfileManagement"
                    }
                    if (CommonUtilities.isCSRMode()) {
                        dataObject.btnDelete.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(13);
                    }
                    return dataObject;
                })
                var businessData = userBusinessAddresses.map(function (address) {
                    if (address.isPrimary === "true" && address.isAlertsRequired === "true" && scopeObj.enableSeparateAddress) {
                        flexWidth = "175px";
                        textToShow = kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryAlertComm");
                    } else if (address.isAlertsRequired === "true" && scopeObj.enableSeparateAddress) {
                        flexWidth = "120px";
                        textToShow = kony.i18n.getLocalizedString("i18n.alertSettings.alertComm");
                    } else if (address.isPrimary === "true") {
                        flexWidth = "135px";
                        textToShow = kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryComm");
                    }
                    var state = "";
                    if (address.RegionName === undefined) {
                        state = "";
                    } else {
                        state = address.RegionName + ", ";
                    }
                    var city = (address.CityName)?address.CityName:address.City_id;
                    var dataObject = {
                        "lblAddressType": {
                            "text": (address.isPrimary === 'true') ? kony.i18n.getLocalizedString("kony.tab.common.home") : kony.i18n.getLocalizedString("i18n.common.Work"),
                           /* "accessibilityConfig": {
                                "a11yLabel": addressTypes[address.AddressType],
                            },*/
                        },
                        "lblAddressLine1": {
                            "text": address.AddressLine1,
                            /*"accessibilityConfig": {
                                "a11yLabel": address.AddressLine1,
                            },*/
                        },
                        "lblAddessLine2": {
                            "text": address.AddressLine2 !== undefined && address.AddressLine2 !== null && address.AddressLine2 !== ""  ? address.AddressLine2 : (city === "" || city === undefined || city === null) ? (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))):city + ", " + (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))),
                           /* "accessibilityConfig": {
                                "a11yLabel": address.AddressLine2 ? address.AddressLine2 : (city + ', ' + state + ((address.CountryCode)?address.CountryCode:(address.Country_id)?(address.Country_id):"")  + ', ' + ((address.ZipCode)?address.ZipCode:"")),
                            }, */
                        },
                        "lblAddressLine3": {
                            "text": address.AddressLine2 ? (city === "" || city === undefined || city === null) ? (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))):city + ", " + (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))): "",
                           /* "accessibilityConfig": {
                                "a11yLabel": address.AddressLine2 ? (city + ', ' + state + ((address.CountryCode)?address.CountryCode:(address.Country_id)?(address.Country_id):"")  + ', ' + ((address.ZipCode)?address.ZipCode:"")) : "",
                            }, */
                        },
                        "flxImgElipses": {
                            "accessibilityConfig": {
                                "a11yLabel": (address.isPrimary === 'true') ? "Home Address" : "Work Address",
                                "a11yARIA": {
                                    "aria-haspopup": "dialog",
                                    "aria-labelledby": "lblHome",
                                    "role": "button",
                                    "tabindex": (address.isPrimary == "true") ? ((applicationManager.getConfigurationManager().checkUserPermission("UPDATE_PRIMARY_ADDRESS")) ? 0 : -1) : 0
                                }
                            },
                        },
                        "btnEdit": {
                            "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                            "accessibilityConfig": {
                                "a11yLabel": (address.isPrimary === 'true') ? "Edit Home Address" : "Edit Work Address",
                            },
                            onClick: getEditAddressListener(address),
                            "onKeyPress": scopeObj.onEditKeyPressCallback,
                            isVisible: (address.isPrimary == "true") ? ((applicationManager.getConfigurationManager().checkUserPermission("UPDATE_PRIMARY_ADDRESS")) ? true : false) : true
                        },
                        "btnDelete": {
                            "text": address.isPrimary === "true" ? "" : kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
                            "accessibilityConfig": {
                                "a11yARIA":{
                                    "aria-haspopup": "dialog"
                                },
                                "a11yLabel": address.isPrimary === "true" ? "Delete Home Address" : "Delete Work Address",
                            },
                            onClick: CommonUtilities.isCSRMode() ? CommonUtilities.disableButtonActionForCSRMode() : getDeleteAddressEmailListener(address),
                            "onKeyPress": scopeObj.onDeleteKeyPressCallback,
                            isVisible: applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")?(address.isPrimary === "true" ?false:true):false
                        },
                        "flxUsedFor": {
                            "isVisible": address.isPrimary === "true" || (address.isAlertsRequired === "true" && scopeObj.enableSeparateAddress) ? true : false
                          },
                          "flxPrimary": {
                            "width": "160dp"
                          },
                          "lblPrimary": {
                            "text": textToShow,
                           /* "accessibilityConfig": {
                              "a11yLabel": textToShow,
                            }, */
                          },
                          "flxPendingRequest": {
                            "isVisible": address.statusMsg ? true : false
                        },
                        // "lblPendingRequest": {
                        //     "text": address.statusMsg === "true" ? true : false
                        // },
                          "lblUsedFor": {
                            "text": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor"),
                           /* "accessibilityConfig": {
                              "a11yLabel": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor")
                            } */
                          },
                          "lblSeperator": {
                            "text":"",
                            "accessibilityConfig": {
                              "a11yLabel": "",
                            }
                            },
                        "template": "flxProfileManagement"
                    }
                    if (CommonUtilities.isCSRMode()) {
                        dataObject.btnDelete.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(13);
                    }
                    return dataObject;
                })
                if (personalData.length === 3){
                    this.view.btnAddNewPersonalAddress.setVisibility(false);
                 //   this.view.btnAddNewPersonalAddressMobile.setVisibility(false);
                }
                else{
                    this.view.btnAddNewPersonalAddress.setVisibility(true);
                 /*   var currBreakpoint = kony.application.getCurrentBreakpoint();
                    if (currBreakpoint === 640 || orientationHandler.isMobile) {
                        this.view.btnAddNewPersonalAddressMobile.setVisibility(true);
                    }*/
                }
                if (personalData.length === 0)
                    this.view.flxPersonalAddressBody.setVisibility(false);
                else
                    this.view.flxPersonalAddressBody.setVisibility(true);
                this.view.segPersonalAddresses.widgetDataMap = dataMap;
                this.view.segBusinessAddresses.widgetDataMap = dataMap;
                this.view.segPersonalAddresses.setData(personalData);
                this.view.segBusinessAddresses.setData(businessData);
            }
            else {
                var data = userAddresses.map(function (address) {
                    if (address.isPrimary === "true" && address.isAlertsRequired === "true" && scopeObj.enableSeparateAddress) {
                        flexWidth = "175px";
                        textToShow = kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryAlertComm");
                      } else if (address.isAlertsRequired === "true" && scopeObj.enableSeparateAddress) {
                        flexWidth = "120px";
                        textToShow = kony.i18n.getLocalizedString("i18n.alertSettings.alertComm");
                      } else if (address.isPrimary === "true") {
                        flexWidth = "135px";
                        textToShow = kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryComm");
                      }
                    var state = "";
                    if (address.RegionName === undefined) {
                        state = "";
                    } else {
                        state = address.RegionName + ", ";
                    }
                    var city = (address.CityName)?address.CityName:address.City_id;
                    var dataObject = {
                        "lblHome": {
                            "text": (address.isPrimary === 'true') ? kony.i18n.getLocalizedString("kony.tab.common.home") : kony.i18n.getLocalizedString("i18n.common.Work"),
                            /*"accessibilityConfig": {
                                "a11yLabel": addressTypes[address.AddressType],
                            },*/
                        },
                        "lblAddressLine1": {
                            "text": address.AddressLine1,
                           /* "accessibilityConfig": {
                                "a11yLabel": address.AddressLine1,
                                "a11yARIA": 
                                {
                                    "tabindex" : 1
                                }
                            }, */
                        },
                        "lblAddessLine2": {
                            "text": address.AddressLine2 !== undefined && address.AddressLine2 !== null && address.AddressLine2 !== ""  ? address.AddressLine2 : (city === "" || city === undefined || city === null) ? (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))):city + ", " + (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))),
                           /* "accessibilityConfig": {
                                "a11yLabel": address.AddressLine2 ? address.AddressLine2 : (city + ', ' + state + (address.CountryCode)?address.CountryCode:(address.Country_id)?(address.Country_id):""  + ', ' + (address.ZipCode)?address.ZipCode:""),
                                "a11yARIA": 
                                {
                                    "tabindex" : 0
                             }
                            }, */
                        },
                        "lblAddressLine3": {
                            "text": address.AddressLine2 ? (city === "" || city === undefined || city === null) ? (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))):city + ", " + (state === "" || state === ", " ? (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : "")) : state + ", " + (((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") === "" ? (address.ZipCode) ? address.ZipCode : "" : ((address.CountryCode) ? address.CountryCode : (address.Country_id) ? (address.Country_id) : "") + ", " + ((address.ZipCode) ? address.ZipCode : ""))): "",
                           /* "accessibilityConfig": {
                                "a11yLabel": address.AddressLine2 ? (city + ', ' + state + ((address.CountryCode)?address.CountryCode:(address.Country_id)?(address.Country_id):"")  + ', ' + ((address.ZipCode)?address.ZipCode:"")) : "",
                                "a11yARIA": 
                                {
                                    "tabindex" : 1,
                                    "role": "button"
                                }
                            }, */
                        },
                        "flxImgElipses": {
                            "accessibilityConfig": {
                                "a11yLabel": (address.isPrimary === 'true') ? "Home Address" : "Work Address",
                                "a11yARIA": {
                                    "aria-expanded": false,
                                    "aria-haspopup": "dialog",
                                    "aria-labelledby": "lblHome",
                                    "role": "button",
                                    "tabindex": (address.isPrimary == "true") ? ((applicationManager.getConfigurationManager().checkUserPermission("UPDATE_PRIMARY_ADDRESS")) ? 0 : -1) : 0
                                }
                            },
                        },
                        "imgelipses": {
                            "isVisible":(address.isPrimary == "true") ? ((applicationManager.getConfigurationManager().checkUserPermission("UPDATE_PRIMARY_ADDRESS")) ? true : false) : true
                        },
                        "btnEdit": {
                            "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                            "accessibilityConfig": {
                                "a11yLabel": (address.isPrimary === 'true') ? "Edit Home Address" : "Edit Work Address",
                                "a11yARIA": 
                                {
                                    "tabindex" : 0,
                                    "role": "button"
                                }
                            },
                            onClick: getEditAddressListener(address),
                            "onKeyPress": scopeObj.onEditKeyPressCallback,
                            isVisible: (address.isPrimary == "true") ? ((applicationManager.getConfigurationManager().checkUserPermission("UPDATE_PRIMARY_ADDRESS")) ? true : false) : true
                        },

                        "btnDelete": {
                            "text": address.isPrimary === "true" ? "" : kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
                            "accessibilityConfig": {
                                "a11yARIA":{
                                    "aria-haspopup": "dialog"
                                },
                                "a11yLabel": address.isPrimary === "true" ? "Delete Home Address" : "Delete Work Address",
                            },
                            onClick: CommonUtilities.isCSRMode() ? CommonUtilities.disableButtonActionForCSRMode() : getDeleteAddressEmailListener(address),
                            "onKeyPress": scopeObj.onDeleteKeyPressCallback,
                            isVisible: applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")?(address.isPrimary === "true" ?false:true):false
                        },
                        "flxUsedFor": {
                            "isVisible": address.isPrimary === "true" || (address.isAlertsRequired === "true" && scopeObj.enableSeparateAddress) ? true : false
                          },
                          "flxPrimary": {
                            "width": "160dp"
                          },
                          "lblPrimary": {
                            "text": textToShow,
                           /* "accessibilityConfig": {
                              "a11yLabel": textToShow,
                            }, */
                          },
                          "flxPendingRequest": {
                            "isVisible": address.statusMsg ? true : false
                        },
                        // "lblPendingRequest": {
                        //     "text": address.statusMsg === "true" ? true : false
                        // },
                          "lblUsedFor": {
                            "text": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor"),
                           /* "accessibilityConfig": {
                              "a11yLabel": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor")
                            } */
                          },
                          "lblSeperator": {
                            "text":"",
                            "accessibilityConfig": {
                              "a11yLabel": "",
                            }
                            },
                        "template": "flxProfileManagement"
                    }
                    if (CommonUtilities.isCSRMode()) {
                        dataObject.btnDelete.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(13);
                    }
                    return dataObject;
                })
                this.view.segprofilemanagementAddressnew.widgetDataMap = dataMap;
                this.view.segprofilemanagementAddressnew.setData(data);
               /* this.view.segprofilemanagementAddressnew.flxImgElipses.onclick = function()
                {
                    this.flxOnclick();
			
                 };*/
            }
            }
          else{
            this.view.flxAddressBody.setVisibility(false);
            this.view.flxNoInfoWarning.setVisibility(true);
          }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        /**
          * Method to edit the address which is already set
          * @param {Object} address- All the fields of the Address
          */
        editAddress: function (address) {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.getEditAddressView(address);
        },



    }
});