define(['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    var alertData = [];
    return {
        updateFormUI: function(viewModel) {
            if (viewModel !== undefined) {
                if (viewModel.serverError) {
                    this.showServerError(viewModel.serverError);
                } else {
                    if (viewModel.isLoading !== undefined) {
                        this.changeProgressBarState(viewModel.isLoading);
                    }
                    if (viewModel.AlertsDataById) {
                        alertData = viewModel.AlertsDataById;
                        this.setAlertsDataToUI(viewModel.AlertsDataById);
                        FormControllerUtility.hideProgressBar(this.view);
                    }
                }
            }
            this.view.lblAlertsHeading.setActive(true);
        },
        preShow: function() {
            var self = this;
            this.view.setVisibility(true);
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
            this.view.postShow = this.postShowProfile;
            this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile', 'flxRight']);
            this.view.profileMenu.checkLanguage();
            //this.view.profileMenu.forceInitializeProfileMenu();
            //this.view.customheadernew.activateMenu("Settings", "Alert Settings");
            this.setFlowActions();
            this.setAccessibility();
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Alerts");
            this.view.lblSMSInfo.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.SMS");
            this.view.lblSMSInfo2.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.SMS");
            this.view.lblPushInfo.text = kony.i18n.getLocalizedString("i18n.Alertsettings.PushNotifications");
            this.view.lblPushInfo2.text = kony.i18n.getLocalizedString("i18n.Alertsettings.PushNotifications");
            this.view.lblEmailInfo.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId");
            this.view.lblEmailInfo2.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId");
            this.view.lblNotifInfo.text = kony.i18n.getLocalizedString("i18n.alertSettings.NotifCenter");
            this.view.lblNotifInfo2.text = kony.i18n.getLocalizedString("i18n.alertSettings.NotifCenter");
            this.view.lblEnableAlerts.text = kony.i18n.getLocalizedString("i18n.Alerts.ENABLEALERTS");
            this.view.rtxAlertsWarning.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.ViewAlert");
            this.view.rtxAlertsWarning2.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.ViewAlert");
            this.view.lblFrequencyTitle.text = kony.i18n.getLocalizedString("i18n.PayPerson.frequency");
            this.view.lblChannelsTitle.text = kony.i18n.getLocalizedString("i18n.Alerts.SelectChannels");
            this.view.btnAlertSave.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Save");
            this.view.btnAlertCancel.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            alertData = [];
            this.view.onBreakpointChange = function() {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
                this.view.flxSMSIconInfo.left = "2%";
                this.view.flxEmailIconInfo.left = "27%";
                this.view.flxPushIconInfo.left = "43%";
                this.view.flxNotifIconInfo.left = "60%";
            }
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                if (this.view.lblCollapseMobile.text == "P") {
                    this.view.lblCollapseMobile.text = "O";
                    this.view.flxLeft.setVisibility(false);
                    this.view.flxRight.setVisibility(true);
                }
            } else {
                this.view.flxRight.setVisibility(true);
            }
            this.view.flxAlertsSegment.accessibilityConfig = {
                a11yARIA: {
                    "aria-live": "off",
                    tabindex: -1
                }
            };
            this.view.flxAlertButtons.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "aria-live": "off",
                    tabindex: -1
                }
            }
            this.view.btnAlertCancel.accessibilityConfig = {
                a11yLabel:"Cancel edit settings process",
                a11yARIA: {
                    "aria-live": "off",
                    tabindex: 0
                }
            };
            this.view.btnAlertSave.accessibilityConfig = {
                a11yLabel:"Save account alerts settings",
                a11yARIA: {
                    "aria-live": "off",
                    tabindex: 0
                }
            };
            this.view.flxFormContent.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                }
            };
            this.view.flxNoAlertsFound.setVisibility(false);
            this.view.flxAlertsSegment.setVisibility(true);
            this.view.forceLayout();
        },
        /**
         * *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
         *  Method to set the text in mobile breakpoint
         */
        setSelectedValue: function(text) {
            var self = this;
            self.view.lblAccountSettingsMobile.text = kony.i18n.getLocalizedString(text);
        },
        /**
         *  Method to set ui for the component in mobile breakpoint
         */
        toggleMenuMobile: function() {
            if (this.view.lblCollapseMobile.text == "O") {
                this.view.lblCollapseMobile.text = "P";
                this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                    "a11yLabel": "Mobile Menu",
                    "a11yARIA": {
                        "tabindex": 0,
                        "aria-expanded": true
                    }
                }
                this.view.flxLeft.setVisibility(true);
                this.view.flxRight.setVisibility(false);
            } else {
                this.view.lblCollapseMobile.text = "O";
                this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                    "a11yLabel": "Mobile Menu",
                    "a11yARIA": {
                        "tabindex": 0,
                        "aria-expanded": false
                    }
                }
                this.view.flxLeft.setVisibility(false);
                this.view.flxRight.setVisibility(true);
            }
        },
        /**
         * *@param {Boolean} isLoading- True or false to show/hide the progess bar
         *  Method to set show/hide the progess bar
         */
        changeProgressBarState: function(isLoading) {
            if (isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            }
        },
        postShowProfile: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            //             this.view.profileMenu.flxSeperator.height = this.view.flxRight.info.frame.height;
            //      	    this.view.flxLeft.height = this.view.flxRight.info.frame.height;
            this.view.flxEnableSwitch.accessibilityConfig = {
                "a11yLabel": "Enable Alerts",
                "a11yARIA": {
                    // "aria-disabled":true,
                    "tabindex": 0,
                    "role": "checkbox",
                    "aria-checked": false
                }
            }
            this.view.flxAlertsSegment.setEnabled(false);
            this.view.flxAlertsBody.setEnabled(false);
            var scope = this;
            if (this.view.lblSwitch.text === "m") {
                this.view.flxEnableSwitch.accessibilityConfig = {
                    "a11yLabel": "Enable Alerts",
                    "a11yARIA": {
                        //"aria-disabled":true,
                        "tabindex": 0,
                        "role": "checkbox",
                        "aria-checked": true
                    }
                };
            } else {
                this.view.flxEnableSwitch.accessibilityConfig = {
                    "a11yLabel": "Enable Alerts",
                    "a11yARIA": {
                        //"aria-disabled":true,
                        "tabindex": 0,
                        "role": "checkbox",
                        "aria-checked": false
                    }
                };
            }
            this.view.flxMain.accessibilityConfig = {
                a11yARIA: {
                    "role": "main",
                    "tabindex": -1
                }
            }
            this.toggleChannelClick();
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.segAlertsListing.accessibilityConfig = {
                "a11yARIA": {
                    "aria-live": "off",
                    "tabindex": -1
                }
            }
            this.view.flxInvalidAmount.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":-1,
                    "role":"alert"
                }
            }
            this.view.customheadernew.collapseAll();
            this.view.lblAlertsHeading.setActive(true);
        },
        onKeyPressCallBack: function(eventobject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxDialogs.isVisible) {
                    this.view.flxDialogs.isVisible = false;
                }
                if (kony.application.getCurrentBreakpoint() === 640) {
                    if (this.view.flxLeft.isVisible) {
                        this.toggleMenuMobile();
                        this.view.flxAccountSettingsCollapseMobile.setActive(true);
                    }
                }
                this.view.customheadernew.onKeyPressCallBack(eventobject, eventPayload);
            }
        },
        toggleChannelClick: function() {
            var segData = this.view.segAlertsListing.data;
            for (var i = 0; i < segData.length; i++) {
                if (segData[i][1].length !== 0) {
                    for (var j = 0; j < segData[i][1].length; j++) {
                        if (segData[i][1][j].template === "flxGroupAlertRowDW" || segData[i][1][j].template === "flxGroupAlertRowTablet" || segData[i][1][j].template === "flxGroupAlertRowMobile") {
                            if (segData[i][1][j].flxAlertCheckBox.text === "C") {
                                segData[i][1][j].flxChannels.enable = true;
                            } else {
                                segData[i][1][j].flxChannels.enable = false;
                            }
                        }
                        if (segData[i][0].template === "flxGroupAlertsHeaderDW" || segData[i][0].template === "flxGroupAlertsHeaderMobile" || segData[i][0].template === "flxGroupAlertsHeaderTablet") {
                            if (segData[i][0].flxGroupCheckBox.text === "C") {
                                segData[i][0].flxChannels.enable = true;
                            } else {
                                segData[i][0].flxChannels.enable = false;
                            }
                        }
                    }
                } else {
                    if (segData[i][0].template === "flxGroupAlertsHeaderDW" || segData[i][0].template === "flxGroupAlertsHeaderMobile" || segData[i][0].template === "flxGroupAlertsHeaderTablet") {
                        if (segData[i][0].flxGroupCheckBox.text === "C") {
                            segData[i][0].flxChannels.enable = true;
                        } else {
                            segData[i][0].flxChannels.enable = false;
                        }
                    }
                }
            }
            this.view.segAlertsListing.setData(segData);
        },
        onBreakpointChange: function(width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.profileMenu.onBreakpointChangeComponent(width);
            orientationHandler.onOrientationChange(this.onBreakpointChange);
            if (alertData.alertsData) {
                this.setAlertsDataToUI(alertData);
            }
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Alerts");
                this.view.customheadernew.lblHeaderMobile.accessibilityConfig = {
                    a11yARIA: {
                        tabindex: -1
                    }
                };
                this.view.lblAccountSettingsMobile.text = this.view.lblAlertsHeading.text;
                this.view.customheadernew.btnHamburgerNew.setFocus(true);
                this.view.flxLeft.accessibilityConfig = {
                    a11yARIA: {
                        "aria-live": "off",
                        "tabindex": -1
                    }
                };
                this.view.flxRight.accessibilityConfig = {
                    a11yARIA: {
                        "aria-live": "off",
                        "tabindex": -1
                    }
                }
            } else {
                this.view.flxLeft.accessibilityConfig = {
                    a11yARIA: {
                        "tabindex": -1
                    }
                }
                this.view.flxRight.accessibilityConfig = {
                    a11yARIA: {
                        "tabindex": -1
                    }
                }
            }
            if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
                if (kony.i18n.getCurrentLocale() === "en_US") {
                    this.view.flxEmailIconInfo.left = "20%";
                    this.view.flxPushIconInfo.left = "34%";
                    this.view.flxNotifIconInfo.left = "57%";
                    this.view.flxPushIconInfo.width = "25%";
                    this.view.flxNotifIconInfo.width = "25%";
                }
            }
            this.view.forceLayout();
        },
        setAccessibility: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.lblCollapseMobile.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                }
            };
            this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                "a11yLabel": "Dropdown",
                "a11yARIA": {
                    "tabindex": 0,
                    "aria-expanded": false,
                }
            };
        },
        /**
         *  Method to set the Form Flow Actions such as button onclick events
         */
        setFlowActions: function() {
            var scopeObj = this;
        },
        /**
         *Method is used to call respective functions based on alert preference
         **/
        setAlertsDataToUI: function(alertsModel) {
            var scopeObj = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            var alertsViewModel = alertsModel.alertsData;
            var isInitialLoad = alertsViewModel.categorySubscription.isInitialLoad;
            //var isModifyScreen = this.view.btnEditAlerts.isVisible === true ? false : true;
            this.enableFrequency = alertsViewModel.alertConfiguration[0].enableFrequency === "1" ? true : false;
            var isEnabledScreen = (alertsViewModel.categorySubscription.isSubscribed === "true") ? "m" : "n";
            if (this.view.lblSwitch.text !== isEnabledScreen) this.view.lblSwitch.text = isEnabledScreen;
            /*if (alertsModel.accountId) { // for account level category
              this.view.flxAlertsStatus.setVisibility(false);
              this.view.flxEnableAlertsSwitch.setVisibility(true);
            } else{*/
              this.view.flxAlertsStatus.setVisibility(true);
              this.view.flxEnableAlertsSwitch.setVisibility(false);
            //}
            this.view.lblAlertStatusIndicator.skin = (alertsViewModel.categorySubscription.isSubscribed === "true") ?  ViewConstants.SKINS.ACTIVE_STATUS_SKIN : "sknstatusDeactivateUMNew";
            this.view.lblAlertsStatus.text = (alertsViewModel.categorySubscription.isSubscribed === "true") ? kony.i18n.getLocalizedString("i18n.alerts.alertsEnabled") :kony.i18n.getLocalizedString("i18n.Alerts.DisabledAlerts");
            if (scopeObj.view.lblSwitch.text === "n") {
                scopeObj.view.lblSwitch.skin = "skn727272fonticons";
            } else {
                scopeObj.view.lblSwitch.skin = "sknfonticontoggleON45px";
            }
            this.setFrequencyData();
            var AlertsCategories = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.getAlertsCategoryResponse();
            for (var i = 0; i < AlertsCategories.records.length; i++) {
                if (AlertsCategories.records[i].alertcategory_id === alertsModel.AlertCategoryId) {
                    this.view.profileMenu.activateMenu("ALERTSETTINGS", AlertsCategories.records[i].alertcategory_Name);
                    if(alertsModel.accountId){ // for account level category, show account nickname and account num
                      var accNickname = alertsModel.accountDetails ? alertsModel.accountDetails.nickName : alertsModel.accountDetails.accountName;
                      var formattedAccountText = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").
                                                                presentationController.formatText(accNickname, 24, alertsModel.accountId, 4);
                      this.view.lblAlertsHeading.text = formattedAccountText;
                        this.view.lblHeading.accessibilityConfig = {
                            a11yARIA: {
                                tabindex: -1
                            },
                            a11yLabel: formattedAccountText + " alerts Settings"
                        }
                        this.view.btnEditAlerts.accessibilityConfig = {
                            a11yLabel: "Edit alerts settings for " + formattedAccountText
                        }
                        this.view.btnAlertSave.accessibilityConfig = {
                            a11yLabel: "Save " + formattedAccountText + " alerts settings",
                            a11yARIA: {
                                "aria-live": "off",
                                tabindex: 0
                            }
                        };
                        this.view.btnAlertCancel.accessibilityConfig = {
                            a11yLabel: "Cancel edit " + formattedAccountText + " alerts settings",
                            a11yARIA: {
                                "aria-live": "off",
                                tabindex: 0
                            }
                        };

                    } else{
                      this.view.lblAlertsHeading.text = AlertsCategories.records[i].alertcategory_Name;
                        if (this.view.lblAlertsHeading.text === "Security") {
                            this.view.lblHeading.accessibilityConfig = {
                                a11yARIA: {
                                    tabindex: -1
                                },
                                a11yLabel: "Security alerts Settings"
                            }
                            this.view.btnEditAlerts.accessibilityConfig = {
                                a11yLabel: "Edit alerts settings for security"
                            }
                            this.view.btnAlertSave.accessibilityConfig = {
                                a11yLabel: "Save security alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };
                            this.view.btnAlertCancel.accessibilityConfig = {
                                a11yLabel: "Cancel edit security alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };
                        }
                        else if(this.view.lblAlertsHeading.text === "Transaction & Payment"){
                            this.view.lblHeading.accessibilityConfig = {
                                a11yARIA: {
                                    tabindex: -1
                                },
                                a11yLabel: "Transaction & Payments alerts Settings"
                            }
                            this.view.btnEditAlerts.accessibilityConfig = {
                                a11yLabel: "Edit alerts settings for transaction and payment"
                            }
                            this.view.btnAlertSave.accessibilityConfig = {
                                a11yLabel: "Save Transaction & Payments alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };
                            this.view.btnAlertCancel.accessibilityConfig = {
                                a11yLabel: "Cancel edit Transaction & Payments alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };
                        }
                        else if(this.view.lblAlertsHeading.text === "Account"){
                            this.view.lblHeading.accessibilityConfig = {
                                a11yARIA: {
                                    tabindex: -1
                                },
                                a11yLabel: "Account alerts Settings"
                            }
                            this.view.btnEditAlerts.accessibilityConfig = {
                                a11yLabel: "Edit alerts settings for accounts"
                            }
                            this.view.btnAlertSave.accessibilityConfig = {
                                a11yLabel: "Save Account alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };
                            this.view.btnAlertCancel.accessibilityConfig = {
                                a11yLabel: "Cancel edit Account alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };
                            
                        }
                        else if(this.view.lblAlertsHeading.text === "Approvals"){
                            this.view.lblHeading.accessibilityConfig = {
                                a11yARIA: {
                                    tabindex: -1
                                },
                                a11yLabel: "Approvals alerts Settings"
                            }
                            this.view.btnEditAlerts.accessibilityConfig = {
                                a11yLabel: "Edit alerts settings for approvals"
                            }
                            this.view.btnAlertSave.accessibilityConfig = {
                                a11yLabel: "Save Approvals alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };
                            this.view.btnAlertCancel.accessibilityConfig = {
                                a11yLabel: "Cancel edit Approvals alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };

                        }
                        else if(this.view.lblAlertsHeading.text === "Trade Finance"){
                            this.view.lblHeading.accessibilityConfig = {
                                a11yARIA: {
                                    tabindex: -1
                                },
                                a11yLabel: "Trade finance alerts Settings"
                            }
                            this.view.btnEditAlerts.accessibilityConfig = {
                                a11yLabel: "Edit alerts settings for trade finance"
                            }
                            this.view.btnAlertSave.accessibilityConfig = {
                                a11yLabel: "Save Trade Finance alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };
                            this.view.btnAlertCancel.accessibilityConfig = {
                                a11yLabel: "Cancel edit Trade Finance alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };
                        }
                        else if(this.view.lblAlertsHeading.text === "Trade Supply Finance"){
                            this.view.lblHeading.accessibilityConfig = {
                                a11yARIA: {
                                    tabindex: -1
                                },
                                a11yLabel: "Trade supply finance alerts Settings"
                            }
                            this.view.btnEditAlerts.accessibilityConfig = {
                                a11yLabel: "Edit alerts settings for trade supply finance"
                            }
                            this.view.btnAlertSave.accessibilityConfig = {
                                a11yLabel: "Save Trade Supply Finance alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };
                            this.view.btnAlertCancel.accessibilityConfig = {
                                a11yLabel: "Cancel edit Trade Supply Finance alerts settings",
                                a11yARIA: {
                                    "aria-live": "off",
                                    tabindex: 0
                                }
                            };
                        }
                    }
                    this.view.lblAccountSettingsMobile.text = AlertsCategories.records[i].alertcategory_Name;
                    this.view.btnEditAlerts.text = kony.i18n.getLocalizedString("i18n.billPay.Edit");
                    //this.view.btnEditAlerts.toolTip=kony.i18n.getLocalizedString("i18n.common.modifiy");
                    this.view.title = "Alerts Settings " + AlertsCategories.records[i].alertcategory_Name;
                }
            }
            /*if (alertsModel.accountId) { // for account level category
                this.view.btnAlertSave.setVisibility(true);
                this.view.btnAlertCancel.setVisibility(true);
                this.view.flxAlertBtnSeperator.setVisibility(true);
            } else {*/
                this.view.btnAlertSave.setVisibility(false);
                this.view.btnAlertCancel.setVisibility(false);
                this.view.flxAlertBtnSeperator.setVisibility(false);
            //}
            if (alertsViewModel.alertConfiguration[0].alertPreferenceView === "CATEGORY") {
                this.setCategoryChannelsToUI(alertsViewModel.alertCategory.supportedChannels, alertsViewModel.alertCategory.subscribedChannels, isInitialLoad);
                this.setCategoryFrequencyData(alertsViewModel.alertCategory.subscribedFrequency);
                if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    this.view.flxChannelsFrequencyTab.setVisibility(true);
                } else {
                    this.view.flxChannelsFrequency.setVisibility(true);
                }
            } else {
                this.view.flxChannelsFrequency.setVisibility(false);
                this.view.flxChannelsFrequencyTab.setVisibility(false);
            }
            if (alertsViewModel.alertConfiguration[0].alertPreferenceView !== "CATEGORY") {
                if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    this.view.flxAlertsSegment.top = "10dp";
                } else if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.flxAlertsSegment.top = "0dp";
                } else {
                    this.view.flxAlertsSegment.top = "0dp";
                }
            } else {
                if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    this.view.flxAlertsSegment.top = "5dp";
                } else if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.flxAlertsSegment.top = "0dp";
                } else {
                    this.view.flxAlertsSegment.top = "10dp";
                }
            }
            this.view.lblSwitch.setEnabled(false);
            this.view.flxChannelsFrequency.setEnabled(false);
            this.view.flxChannelsFrequencyTab.setEnabled(false);
            this.view.segAlertsListing.setEnabled(false);
            this.alertPreference = alertsViewModel.alertConfiguration[0].alertPreferenceView;
            if (alertsViewModel.alertTypes.length === 0) {
                scopeObj.view.flxNoAlertsFound.setVisibility(true);
                scopeObj.view.flxAlertsSegment.setVisibility(false);
            } else if (this.alertPreference === "ALERT") this.setAlertLevelAlertsSegData(alertsViewModel.alertTypes, isInitialLoad);
            else if (this.alertPreference === "GROUP") this.setGroupLevelAlertsSegData(alertsViewModel.alertTypes, isInitialLoad);
            else if (this.alertPreference === "CATEGORY") this.setCategoryLevelAlertsSegData(alertsViewModel.alertTypes);
            this.isServiceCallNeeded = false;
            this.view.flxEnableSwitch.onClick = function() {
                if (scopeObj.view.lblSwitch.text === "m") {
                    scopeObj.view.lblSwitch.skin = "skn727272fonticons";
                    scopeObj.view.lblSwitch.text = "n";
                    scopeObj.view.flxAlertsSegment.setEnabled(false);
                    scopeObj.view.flxEnableSwitch.accessibilityConfig = {
                        "a11yLabel": "Enable Alerts",
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "checkbox",
                            "aria-checked": false
                        }
                    }
                } else {
                    scopeObj.view.lblSwitch.skin = "sknfonticontoggleON45px";
                    scopeObj.view.lblSwitch.text = "m";
                    scopeObj.view.flxAlertsSegment.setEnabled(true);
                    scopeObj.view.flxEnableSwitch.accessibilityConfig = {
                        "a11yLabel": "Enable Alerts",
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "checkbox",
                            "aria-checked": true
                        }
                    }
                }
                if ((isInitialLoad === "true" || isInitialLoad === true) && scopeObj.view.lblSwitch.text === "m") scopeObj.initialAlertsToggle(alertsModel);
                scopeObj.ToggleSwitchAlerts();
                scopeObj.toggleChannelClick();
                scopeObj.view.flxEnableSwitch.setActive(true);
            };
            /*if (alertsModel.AlertCategoryId === "ALERT_CAT_ACCOUNTS") {
                this.view.btnEditAlerts.setVisibility(false);
                this.ToggleSwitchAlerts();
                this.view.flxAlertsBody.setEnabled(true);
                this.view.lblSwitch.setEnabled(true);
                this.view.flxChannelsFrequency.setEnabled(true);
                this.view.flxChannelsFrequencyTab.setEnabled(true);
            } else {*/
                if (alertsViewModel.alertTypes.length === 0) {
                    this.view.btnEditAlerts.setVisibility(false);
                } else {
                    this.view.btnEditAlerts.setVisibility(true);
                }
            //}
            this.view.btnEditAlerts.onClick = scopeObj.onEditAlertsClick.bind(this, alertsModel.AlertCategoryId);
            this.view.btnAlertCancel.onClick = scopeObj.onClickCancelAlerts.bind(this, alertsModel);
            if (CommonUtilities.isCSRMode()) {
                this.view.btnAlertSave.onClick = CommonUtilities.disableButtonActionForCSRMode();
                this.view.btnAlertSave.skin = CommonUtilities.disableButtonSkinForCSRMode();
                this.view.btnAlertSave.focusSkin = CommonUtilities.disableButtonSkinForCSRMode();
            } else {
                this.view.btnAlertSave.onClick = scopeObj.onAlertSaveClick.bind(this, alertsModel);
            }
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile', 'flxRight']);
            this.view.profileMenu.flxSeperator.height = this.view.flxRight.info.frame.height;
            this.view.flxLeft.height = this.view.flxRight.info.frame.height;
            this.view.flxAlertsBody.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         *Method is used to set frequency data at category level
         * @param [{"alertFrequencyId":"","frequencyValue":"","frequencyTime":""}] Frequency object JSON
         **/
        setCategoryFrequencyData: function(subscribedFreq) {
            if (subscribedFreq && this.enableFrequency) {
                if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    this.view.lstBoxFrequency1Tab.masterData = this.frequencyList.category;
                    this.view.lstBoxFrequency1Tab.selectedKey = subscribedFreq[0].alertFrequencyId;
                    if (subscribedFreq[0].alertFrequencyId === "DAILY") {
                        this.view.flxFrequency2Tab.setVisibility(false);
                    } else {
                        this.view.flxFrequency2Tab.setVisibility(true);
                        this.view.lstBoxFrequency2Tab.masterData = subscribedFreq[0].alertFrequencyId === "WEEKLY" ? this.frequencyList.weeks : this.frequencyList.dates;
                        this.view.lstBoxFrequency2Tab.selectedKey = subscribedFreq[0].frequencyValue;
                    }
                    this.view.lstBoxFrequency3Tab.masterData = this.frequencyList.time;
                    this.view.lstBoxFrequency3Tab.selectedKey = applicationManager.getFormatUtilManager().getTwelveHourTimeString(subscribedFreq[0].frequencyTime);
                    this.view.flxCategoryFrequency.setVisibility(false);
                    this.view.flxCategoryFrequencyTab.setVisibility(true);
                } else {
                    this.view.lstBoxFrequency1.masterData = this.frequencyList.category;
                    this.view.lstBoxFrequency1.selectedKey = subscribedFreq[0].alertFrequencyId;
                    if (subscribedFreq[0].alertFrequencyId === "DAILY") {
                        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                            this.view.flxFrequency3.left = "2%";
                        }
                        this.view.flxFrequency2.setVisibility(false);
                    } else {
                        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                            this.view.flxFrequency2.left = "2%";
                            this.view.flxFrequency3.left = "66%";
                        }
                        this.view.flxFrequency2.setVisibility(true);
                        this.view.lstBoxFrequency2.masterData = subscribedFreq[0].alertFrequencyId === "WEEKLY" ? this.frequencyList.weeks : this.frequencyList.dates;
                        this.view.lstBoxFrequency2.selectedKey = subscribedFreq[0].frequencyValue;
                    }
                    this.view.lstBoxFrequency3.masterData = this.frequencyList.time;
                    this.view.lstBoxFrequency3.selectedKey = applicationManager.getFormatUtilManager().getTwelveHourTimeString(subscribedFreq[0].frequencyTime);
                    this.view.flxCategoryFrequencyTab.setVisibility(false);
                    this.view.flxCategoryFrequency.setVisibility(true);
                }
            } else {
                this.view.flxCategoryFrequency.setVisibility(false);
                this.view.flxCategoryFrequencyTab.setVisibility(false);
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.flxChannelsFrequency.height = "124px";
                }
                if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    this.view.flxChannelsFrequencyTab.height = "74px";
                }
            }
            this.setAlertsFlowActions();
            this.view.forceLayout();
        },
        /**
         *Method is used to set channels data at category level
         * @param {String,String,Boolean} supported channels string , subscribed channels string , isInitialLoad flag
         **/
        setCategoryChannelsToUI: function(supportedChannels, subscribedChannels, isInitialLoad) {
            var channelsData = supportedChannels.split(",");
            var channelIcons = {
                "CH_SMS": {
                    "text": "v",
                    "normalSkin": "sknLblSMS727272FontIcon",
                    "selectedSkin": "btnSknEnabled"
                },
                "CH_EMAIL": {
                    "text": "w",
                    "normalSkin": "sknLblEmail727272FontIcon",
                    "selectedSkin": "btnSknEnabled"
                },
                "CH_PUSH_NOTIFICATION": {
                    "text": "x",
                    "normalSkin": "sknLblPush727272FontIcon",
                    "selectedSkin": "btnSknEnabled"
                },
                "CH_NOTIFICATION_CENTER": {
                    "text": "y",
                    "normalSkin": "sknLblNotification727272FontIcon",
                    "selectedSkin": "btnSknEnabled"
                }
            };
            var channelsCount = 0;
            if (isInitialLoad === "true" || isInitialLoad === true || subscribedChannels === undefined) subscribedChannels = "";
            this.view.flxChannel1.skin = "slFbox";
            this.view.flxChannel2.skin = "slFbox";
            this.view.flxChannel3.skin = "slFbox";
            this.view.flxChannel4.skin = "slFbox";
            this.view.flxChannel1Tab.skin = "slFbox";
            this.view.flxChannel2Tab.skin = "slFbox";
            this.view.flxChannel3Tab.skin = "slFbox";
            this.view.flxChannel4Tab.skin = "slFbox";
            for (var i = 0; i < channelsData.length; i++) {
                this.view["flxChannel" + (i + 1)].setVisibility(true);
                this.view["flxChannel" + (i + 1) + "Tab"].setVisibility(true);
                if (i !== 0) {
                    this.view["flxVerticalSeparator" + (i)].setVisibility(true);
                    this.view["flxVerticalSeparator" + (i) + "Tab"].setVisibility(true);
                }
                this.view["flxChannel" + (i + 1)].text = channelIcons[channelsData[i]].text;
                this.view["lblChannel" + (i + 1) + "Tab"].text = channelIcons[channelsData[i]].text;
              this.view["lblChannel" + (i + 1)].text = channelIcons[channelsData[i]].text;
                this.view["flxChannel" + (i + 1)].info = {
                    "id": channelsData[i],
                    "isSelected": false,
                    "normalSkin": "sknBtnOLBFontIcons",
                    "selectedSkin": "btnSknEnabled"
                };
                this.view["lblChannel" + (i + 1) + "Tab"].info = {
                    "id": channelsData[i],
                    "isSelected": false,
                    "normalSkin": channelIcons[channelsData[i]].normalSkin,
                    "selectedSkin": channelIcons[channelsData[i]].selectedSkin
                };
              this.view["lblChannel" + (i + 1)].info = {
                    "id": channelsData[i],
                    "isSelected": false,
                    "normalSkin": channelIcons[channelsData[i]].normalSkin,
                    "selectedSkin": channelIcons[channelsData[i]].selectedSkin
                };
                if (subscribedChannels.indexOf(channelsData[i]) >= 0) {
                    // this.view["flxChannel"+(i+1)].onClick();
                    this.view["flxChannel" + (i + 1)].skin = this.view["flxChannel" + (i + 1)].info.selectedSkin;
                    if (this.view["flxChannel" + (i + 1)].info.id === "CH_EMAIL") {
                        this.view["flxChannel" + (i + 1)].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":true
                            }
                        }
                    } else if (this.view["flxChannel" + (i + 1)].info.id === "CH_NOTIFICATION_CENTER") {
                        this.view["flxChannel" + (i + 1)].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.alertSettings.NotifCenter"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":true
                            }
                        }
                    } else if (this.view["flxChannel" + (i + 1)].info.id === "CH_PUSH_NOTIFICATION") {
                        this.view["flxChannel" + (i + 1)].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.Alertsettings.PushNotifications"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":true
                            }
                        }
                    } else {
                        this.view["flxChannel" + (i + 1)].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.SMS"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":true
                            }
                        }
                    }
                    this.view["lblChannel" + (i + 1) + "Tab"].skin = this.view["lblChannel" + (i + 1) + "Tab"].info.selectedSkin;
                    //this.view["flxChannel" + (i + 1)].skin = "bbSknFlxffffffWithShadow1";
                    this.view["flxChannel" + (i + 1) + "Tab"].skin = "bbSknFlxffffffWithShadow1";
                    this.view["flxChannel" + (i + 1)].info.isSelected = true;
                    this.view["lblChannel" + (i + 1) + "Tab"].info.isSelected = true;
                    // this.view["flxChannel"+(i+1)+"Tab"].onClick();
                } else {
                    this.view["flxChannel" + (i + 1)].skin = this.view["flxChannel" + (i + 1)].info.normalSkin;
                    if (this.view["flxChannel" + (i + 1)].info.id === "CH_EMAIL") {
                        this.view["flxChannel" + (i + 1)].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":false
                            }
                        }
                    } else if (this.view["flxChannel" + (i + 1)].info.id === "CH_NOTIFICATION_CENTER") {
                        this.view["flxChannel" + (i + 1)].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.alertSettings.NotifCenter"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":false
                            }
                        }
                    } else if (this.view["flxChannel" + (i + 1)].info.id === "CH_PUSH_NOTIFICATION") {
                        this.view["flxChannel" + (i + 1)].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.Alertsettings.PushNotifications"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":false
                            }
                        }
                    } else {
                        this.view["flxChannel" + (i + 1)].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.SMS"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":false
                            }
                        }
                    }
                    this.view["lblChannel" + (i + 1) + "Tab"].skin = this.view["lblChannel" + (i + 1) + "Tab"].info.normalSkin;
                    //this.view["flxChannel" + (i + 1)].skin = "slFbox";
                    this.view["flxChannel" + (i + 1) + "Tab"].skin = "slFbox";
                    this.view["flxChannel" + (i + 1)].info.isSelected = false;
                    this.view["lblChannel" + (i + 1) + "Tab"].info.isSelected = false;
                }
            }
            for (var x = i + 1; x <= 4; x++) {
                this.view["flxChannel" + x].setVisibility(false);
                this.view["flxVerticalSeparator" + (x - 1)].setVisibility(false);
                this.view["flxChannel" + x + "Tab"].setVisibility(false);
                this.view["flxVerticalSeparator" + (x - 1) + "Tab"].setVisibility(false);
            }
            this.view.flxChannels.width = (channelsData.length) * 55 + "px";
            this.view.flxChannelsTab.width = (channelsData.length) * 55 + "px";
            this.view.forceLayout();
        },
        /**
         *setAlertsFlowActions- function to add actions for alerts flow
         */
        setAlertsFlowActions: function() {
            //functions for menu flow
            var scopeObj = this;
            this.view.flxChannel1.onClick = function() {
                var info = scopeObj.view.lblChannel1.info;
                scopeObj.view.flxChannels.skin = "sknFlxffffffNoShadowbodere3e3round3px";
                if (info && info.isSelected === true) {
                    scopeObj.view.flxChannel1.skin = "slFbox";
                    scopeObj.view.lblChannel1.info.isSelected = false;
                    scopeObj.view.lblChannel1.skin = scopeObj.view.lblChannel1.info.normalSkin;
                    scopeObj.view.flxChannel2.skin = scopeObj.view.flxChannel2.skin === "bbSknFlxffffffWithShadow2" ? "bbSknFlxffffffWithShadow1" : "slFbox";
                } else {
                    scopeObj.view.flxChannel1.skin = "bbSknFlxffffffWithShadow1";
                    scopeObj.view.lblChannel1.info.isSelected = true;
                    scopeObj.view.lblChannel1.skin = scopeObj.view.lblChannel1.info.selectedSkin;
                    scopeObj.view.flxChannel2.skin = scopeObj.view.flxChannel2.skin === "bbSknFlxffffffWithShadow1" ? "bbSknFlxffffffWithShadow2" : "slFbox";
                }
            };
            this.view.flxChannel2.onClick = function() {
                var info = scopeObj.view.lblChannel2.info;
                scopeObj.view.flxChannels.skin = "sknFlxffffffNoShadowbodere3e3round3px";
                if (info && info.isSelected === true) {
                    scopeObj.view.flxChannel2.skin = "slFbox";
                    scopeObj.view.lblChannel2.info.isSelected = false;
                    scopeObj.view.lblChannel2.skin = scopeObj.view.lblChannel2.info.normalSkin;
                    scopeObj.view.flxChannel3.skin = scopeObj.view.flxChannel3.skin === "bbSknFlxffffffWithShadow2" ? "bbSknFlxffffffWithShadow1" : "slFbox";
                } else {
                    scopeObj.view.flxChannel2.skin = scopeObj.view.flxChannel1.skin === "bbSknFlxffffffWithShadow1" ? "bbSknFlxffffffWithShadow2" : "bbSknFlxffffffWithShadow1";
                    scopeObj.view.lblChannel2.info.isSelected = true;
                    scopeObj.view.lblChannel2.skin = scopeObj.view.lblChannel2.info.selectedSkin;
                    scopeObj.view.flxChannel3.skin = scopeObj.view.flxChannel3.skin === "bbSknFlxffffffWithShadow1" ? "bbSknFlxffffffWithShadow2" : "slFbox";
                }
            };
            this.view.flxChannel3.onClick = function() {
                var info = scopeObj.view.lblChannel3.info;
                scopeObj.view.flxChannels.skin = "sknFlxffffffNoShadowbodere3e3round3px";
                if (info && info.isSelected === true) {
                    scopeObj.view.flxChannel3.skin = "slFbox";
                    scopeObj.view.lblChannel3.info.isSelected = false;
                    scopeObj.view.lblChannel3.skin = scopeObj.view.lblChannel3.info.normalSkin;
                    scopeObj.view.flxChannel4.skin = scopeObj.view.flxChannel4.skin === "bbSknFlxffffffWithShadow2" ? "bbSknFlxffffffWithShadow1" : "slFbox";
                } else {
                    scopeObj.view.flxChannel3.skin = scopeObj.view.flxChannel2.skin !== "slFbox" ? "bbSknFlxffffffWithShadow2" : "bbSknFlxffffffWithShadow1";
                    scopeObj.view.lblChannel3.info.isSelected = true;
                    scopeObj.view.lblChannel3.skin = scopeObj.view.lblChannel3.info.selectedSkin;
                    scopeObj.view.flxChannel4.skin = scopeObj.view.flxChannel4.skin === "bbSknFlxffffffWithShadow1" ? "bbSknFlxffffffWithShadow2" : "slFbox";
                }
            };
            this.view.flxChannel4.onClick = function() {
                var info = scopeObj.view.lblChannel4.info;
                scopeObj.view.flxChannels.skin = "sknFlxffffffNoShadowbodere3e3round3px";
                if (info && info.isSelected === true) {
                    scopeObj.view.flxChannel4.skin = "slFbox";
                    scopeObj.view.lblChannel4.skin = scopeObj.view.lblChannel4.info.normalSkin;
                    scopeObj.view.lblChannel4.info.isSelected = false;
                } else {
                    scopeObj.view.flxChannel4.skin = scopeObj.view.flxChannel3.skin !== "slFbox" ? "bbSknFlxffffffWithShadow2" : "bbSknFlxffffffWithShadow1";
                    scopeObj.view.lblChannel4.info.isSelected = true;
                    scopeObj.view.lblChannel4.skin = scopeObj.view.lblChannel4.info.selectedSkin;
                }
            };
            this.view.flxChannel1Tab.onClick = function() {
                var info = scopeObj.view.lblChannel1Tab.info;
                scopeObj.view.flxChannelsTab.skin = "sknFlxffffffNoShadowbodere3e3round3px";
                if (info && info.isSelected === true) {
                    scopeObj.view.flxChannel1Tab.skin = "slFbox";
                    scopeObj.view.lblChannel1Tab.info.isSelected = false;
                    scopeObj.view.lblChannel1Tab.skin = scopeObj.view.lblChannel1Tab.info.normalSkin;
                    scopeObj.view.flxChannel2Tab.skin = scopeObj.view.flxChannel2Tab.skin === "bbSknFlxffffffWithShadow2" ? "bbSknFlxffffffWithShadow1" : "slFbox";
                } else {
                    scopeObj.view.flxChannel1Tab.skin = "bbSknFlxffffffWithShadow1";
                    scopeObj.view.lblChannel1Tab.info.isSelected = true;
                    scopeObj.view.lblChannel1Tab.skin = scopeObj.view.lblChannel1Tab.info.selectedSkin;
                    scopeObj.view.flxChannel2Tab.skin = scopeObj.view.flxChannel2Tab.skin === "bbSknFlxffffffWithShadow1" ? "bbSknFlxffffffWithShadow2" : "slFbox";
                }
            };
            this.view.flxChannel2Tab.onClick = function() {
                var info = scopeObj.view.lblChannel2Tab.info;
                scopeObj.view.flxChannelsTab.skin = "sknFlxffffffNoShadowbodere3e3round3px";
                if (info && info.isSelected === true) {
                    scopeObj.view.flxChannel2Tab.skin = "slFbox";
                    scopeObj.view.lblChannel2Tab.info.isSelected = false;
                    scopeObj.view.lblChannel2Tab.skin = scopeObj.view.lblChannel2Tab.info.normalSkin;
                    scopeObj.view.flxChannel3Tab.skin = scopeObj.view.flxChannel3Tab.skin === "bbSknFlxffffffWithShadow2" ? "bbSknFlxffffffWithShadow1" : "slFbox";
                } else {
                    scopeObj.view.flxChannel2Tab.skin = scopeObj.view.flxChannel1Tab.skin === "bbSknFlxffffffWithShadow1" ? "bbSknFlxffffffWithShadow2" : "bbSknFlxffffffWithShadow1";
                    scopeObj.view.lblChannel2Tab.info.isSelected = true;
                    scopeObj.view.lblChannel2Tab.skin = scopeObj.view.lblChannel2Tab.info.selectedSkin;
                    scopeObj.view.flxChannel3Tab.skin = scopeObj.view.flxChannel3Tab.skin === "bbSknFlxffffffWithShadow1" ? "bbSknFlxffffffWithShadow2" : "slFbox";
                }
            };
            this.view.flxChannel3Tab.onClick = function() {
                var info = scopeObj.view.lblChannel3Tab.info;
                scopeObj.view.flxChannelsTab.skin = "sknFlxffffffNoShadowbodere3e3round3px";
                if (info && info.isSelected === true) {
                    scopeObj.view.flxChannel3Tab.skin = "slFbox";
                    scopeObj.view.lblChannel3Tab.info.isSelected = false;
                    scopeObj.view.lblChannel3Tab.skin = scopeObj.view.lblChannel3Tab.info.normalSkin;
                    scopeObj.view.flxChannel4Tab.skin = scopeObj.view.flxChannel4Tab.skin === "bbSknFlxffffffWithShadow2" ? "bbSknFlxffffffWithShadow1" : "slFbox";
                } else {
                    scopeObj.view.flxChannel3Tab.skin = scopeObj.view.flxChannel2Tab.skin !== "slFbox" ? "bbSknFlxffffffWithShadow2" : "bbSknFlxffffffWithShadow1";
                    scopeObj.view.lblChannel3Tab.info.isSelected = true;
                    scopeObj.view.lblChannel3Tab.skin = scopeObj.view.lblChannel3Tab.info.selectedSkin;
                    scopeObj.view.flxChannel4Tab.skin = scopeObj.view.flxChannel4Tab.skin === "bbSknFlxffffffWithShadow1" ? "bbSknFlxffffffWithShadow2" : "slFbox";
                }
            };
            this.view.flxChannel4Tab.onClick = function() {
                var info = scopeObj.view.lblChannel4Tab.info;
                scopeObj.view.flxChannelsTab.skin = "sknFlxffffffNoShadowbodere3e3round3px";
                if (info && info.isSelected === true) {
                    scopeObj.view.flxChannel4Tab.skin = "slFbox";
                    scopeObj.view.lblChannel4Tab.info.isSelected = false;
                    scopeObj.view.lblChannel4Tab.skin = scopeObj.view.lblChannel4Tab.info.normalSkin;
                } else {
                    scopeObj.view.flxChannel4Tab.skin = scopeObj.view.flxChannel3Tab.skin !== "slFbox" ? "bbSknFlxffffffWithShadow2" : "bbSknFlxffffffWithShadow1";
                    scopeObj.view.lblChannel4Tab.info.isSelected = true;
                    scopeObj.view.lblChannel4Tab.skin = scopeObj.view.lblChannel4Tab.info.selectedSkin;
                }
            };
            // Frequency listboxes actions
            this.view.lstBoxFrequency1.onSelection = function() {
                scopeObj.displayBasedOnSelectedFrequency();
            };
            this.view.lstBoxFrequency2.onSelection = function() {
                scopeObj.view.lstBoxFrequency2.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
            };
            this.view.lstBoxFrequency3.onSelection = function() {
                scopeObj.view.lstBoxFrequency3.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
            };
            this.view.lstBoxFrequency1Tab.onSelection = function() {
                scopeObj.displayBasedOnSelectedFrequency();
            };
            this.view.lstBoxFrequency2Tab.onSelection = function() {
                scopeObj.view.lstBoxFrequency2Tab.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
            };
            this.view.lstBoxFrequency3Tab.onSelection = function() {
                scopeObj.view.lstBoxFrequency3Tab.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
            };
        },
        /**
         *Method is used to set master data for frequency
         **/
        setFrequencyData: function() {
            var category = [
                ["MONTHLY", "Monthly"],
                ["WEEKLY", "Weekly"],
                ["DAILY", "Daily"]
            ];
            var weekData = [
                ["SELECT", "Select"],
                ["MONDAY", "Monday"],
                ["TUESDAY", "Tuesday"],
                ["WEDNESDAY", "Wednesday"],
                ["THURSDAY", "Thursday"],
                ["FRIDAY", "Friday"],
                ["SATURDAY", "Saturday"],
                ["SUNDAY", "Sunday"]
            ]
            var monthDates = [
                ["SELECT", "Select"]
            ];
            for (var i = 1; i <= 31; i++) {
                monthDates.push([i.toString(), i.toString()]);
            }
            var time = [
                ["SELECT", "Select"]
            ];
            var timeString = "";
            for (var j = 1; j < 13; j++) {
                timeString = j;
                time.push([timeString + ":00AM", timeString + ":00AM"], [timeString + ":30AM", timeString + ":30AM"]);
            }
            for (var j = 1; j < 13; j++) {
                timeString = j;
                time.push([timeString + ":00PM", timeString + ":00PM"], [timeString + ":30PM", timeString + ":30PM"]);
            }
            this.frequencyList = {
                "category": category,
                "weeks": weekData,
                "dates": monthDates,
                "time": time
            };
        },
        /**
         *Method is used to set segment data at ALERT level
         **/
        setAlertLevelAlertsSegData: function(alertTypesData, isInitialLoad) {
            var self = this;
            var widgetMap = {
                "flxCategoryAlertsHeader": "flxCategoryAlertsHeader",
                "flxCategoryAlertsContainer": "flxCategoryAlertsContainer",
                "flxGroupCheckBox": "flxGroupCheckBox",
                "lblGroupCheckBoxIcon": "lblGroupCheckBoxIcon",
                "lblGroupName": "lblGroupName",
                "lblGroupAlertsCount": "lblGroupAlertsCount",
                "flxFrequencyFields": "flxFrequencyFields",
                "lblFrequencyTitle": "lblFrequencyTitle",
                "flxFrequency": "flxFrequency",
                "flxFrequencyBox1": "flxFrequencyBox1",
                "lstBoxFrequency1": "lstBoxFrequency1",
                "flxFrequencyBox2": "flxFrequencyBox2",
                "lstBoxFrequency2": "lstBoxFrequency2",
                "flxFrequencyBox3": "flxFrequencyBox3",
                "lstBoxFrequency3": "lstBoxFrequency3",
                "flxChannels": "flxChannels",
                "flxChannel1": "flxChannel1",
                "lblChannel1": "lblChannel1",
                "flxVerticalSeparator1": "flxVerticalSeparator1",
                "flxChannel2": "flxChannel2",
                "lblChannel2": "lblChannel2",
                "flxVerticalSeparator2": "flxVerticalSeparator2",
                "flxChannel3": "flxChannel3",
                "lblChannel3": "lblChannel3",
                "flxVerticalSeparator3": "flxVerticalSeparator3",
                "flxChannel4": "flxChannel4",
                "lblChannel4": "lblChannel4",
                "flxGroupAlertRowDW": "flxGroupAlertRowDW",
                "flxGroupAlertRowTablet": "flxGroupAlertRowTablet",
                "flxGroupAlertRowMobile": "flxGroupAlertRowMobile",
                "flxAlert": "flxAlert",
                "flxFullSeperator": "flxFullSeperator",
                "flxdummy": "flxdummy",
                "flxAlertName": "flxAlertName",
                "flxAlertCheckBox": "flxAlertCheckBox",
                "lblAlertCheckBoxIcon": "lblAlertCheckBoxIcon",
                "lblAlertName": "lblAlertName",
                "flxAmountAttribute": "flxAmountAttribute",
                "flxAttributeValues": "flxAttributeValues",
                "flxAlertAttribute1": "flxAlertAttribute1",
                "lblAttributeTitle1": "lblAttributeTitle1",
                "lblFromValue": "lblFromValue",
                "flxAmount1": "flxAmount1",
                "lblCurrencySymbol1": "lblCurrencySymbol1",
                "tbxAmount1": "tbxAmount1",
                "flxAlertAttribute2": "flxAlertAttribute2",
                "lblToValue": "lblToValue",
                "flxAmount2": "flxAmount2",
                "lblCurrencySymbol2": "lblCurrencySymbol2",
                "tbxAmount2": "tbxAmount2",
                "flxAlertAttribute3": "flxAlertAttribute3",
                "lblAttributeTitle3": "lblAttributeTitle3",
                "lblToValue2": "lblToValue2",
                "flxAmount3": "flxAmount3",
                "lblCurrencySymbol3": "lblCurrencySymbol3",
                "tbxAmount3": "tbxAmount3",
                "flxSeperator": "flxSeperator",
                "showToVal": "showToVal",
                "recordData": "recordData",
                "alertsubtype_id": "alertsubtype_id",
                "alerttype_id": "alerttype_id",
                "supportedChannels": "supportedChannels",
                "subscribedChannels": "subscribedChannels"
            };
            var segData = [];
            var rows = [];
            var subscribedAlertsCount = 0;
            for (var i = 0; i < alertTypesData.length; i++) {
                var sectionData = self.mapAlertLevelGroupSection(alertTypesData[i]);
                rows = [];
                subscribedAlertsCount = 0;
                if (alertTypesData[i].alertSubTypes.length > 0) {
                    for (var j = 0; j < alertTypesData[i].alertSubTypes.length; j++) {
                        rows.push(self.mapAlertLevelAlertRow(alertTypesData[i].alertSubTypes[j], alertTypesData[i].isSubscribed, isInitialLoad));
                        if (alertTypesData[i].alertSubTypes[j].isSubscribed === "true") {
                            subscribedAlertsCount++;
                        }
                    }
                    rows[rows.length - 1].flxSeperator.isVisible = false;
                    rows[rows.length - 1].flxFullSeperator.isVisible = true;
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                        rows[rows.length - 1].flxSeperator.isVisible = false;
                        rows[rows.length - 1].flxFullSeperator.isVisible = false;
                        rows[rows.length - 1].flxdummy.isVisible = true;
                        rows[rows.length - 1].flxAlert.skin = "sknFlxfffffborder4rd";
                    }
                }
                if ((subscribedAlertsCount !== alertTypesData[i].alertSubTypes.length) && alertTypesData[i].isSubscribed === "true") sectionData.lblGroupCheckBoxIcon.text = "z";
                if (alertTypesData[i].isSubscribed === "true") {
                    sectionData.lblGroupAlertsCount.text = "(" + subscribedAlertsCount + "/" + alertTypesData[i].alertSubTypes.length + ")";
                    sectionData.lblGroupAlertsCount.isVisible = true;
                }
                segData.push([sectionData, rows]);
            }
            this.view.segAlertsListing.widgetDataMap = widgetMap;
            this.view.segAlertsListing.setData(segData);
            this.view.forceLayout();
        },
        /**
         *Method is used to set mapping data for Group section at ALERT/CATEGORY level
         **/
        mapAlertLevelGroupSection: function(secData) {
            var self = this;
            return {
                "alerttype_id": secData.alerttype_id,
                "flxGroupCheckBox": {
                    "text": secData.isSubscribed === "true" ? "C" : "D",
                    "onClick": self.toggleGroupCheckBox,
                    "skin": "btnsknDisabled",
                    "accessibilityConfig": {
                        //"a11yLabel": secData.isSubscribed === "true" ? kony.i18n.getLocalizedString("i18n.accountSettings.checked") + " " + secData.alerttypetext_DisplayName : kony.i18n.getLocalizedString("i18n.accountSettings.unchecked") + " " + secData.alerttypetext_DisplayName,
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": secData.isSubscribed === "true" ? true : false,
                            "aria-labelledby": "lblGroupName",
                            "tabindex": 0
                        }
                    }
                },
                "lblGroupName": {
                    "text": secData.alerttypetext_DisplayName
                },
                "lblGroupAlertsCount": {
                    "isVisible": false,
                    "text": "0/" + secData.alertSubTypes.length
                },
                "isEdited": false,
                "flxCategoryAlertsContainer": {
                    "skin": "sknFlxf8f7f8BorderRad4px"
                },
                "template": "flxCategoryAlertsHeader",
            };
        },
        /**
         *Method is used to set mapping data for Alert section at ALERT level
         **/
        mapAlertLevelAlertRow: function(rowData, isGroupSubscribed, isInitialLoad) {
            var self = this;
            var showToVal = false;
            var template = "";
            var isTablet = false;
            var frqText1 = "";
            var frqText2 = "SELECT";
            var frqText3 = "SELECT";
            var showSep = true;
            var fullsep = false;
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                template = "flxGroupAlertRowTablet";
                isTablet = true;
            } else if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                template = "flxGroupAlertRowMobile";
                isTablet = true;
                showSep = false;
                fullsep = true;
            } else {
                template = "flxGroupAlertRowDW";
            }
            if (rowData.alertCondition && rowData.alertCondition.id === "IN_BETWEEN") showToVal = true;
            if (rowData.subscribedFrequency) {
                frqText1 = rowData.subscribedFrequency[0].alertFrequencyId;
                frqText2 = rowData.subscribedFrequency[0].frequencyValue === "" || rowData.subscribedFrequency[0].frequencyValue === "null" || rowData.subscribedFrequency[0].frequencyValue === "0" || rowData.subscribedFrequency[0].frequencyValue === undefined ? "SELECT" : rowData.subscribedFrequency[0].frequencyValue;
                frqText3 = applicationManager.getFormatUtilManager().getTwelveHourTimeString(rowData.subscribedFrequency[0].frequencyTime);
            }
            var rowJSON = {
                "recordData": rowData,
                "alertsubtype_id": rowData.alertsubtype_id,
                "flxAlertCheckBox": {
                    "text": isGroupSubscribed === "true" && rowData.isSubscribed === "true" ? "C" : "D",
                    "skin": "sknBtnOLBFontIcons",
                    "onClick": self.toggleAlertCheckBox,
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "checkbox",
                            "aria-labelledby": "lblAlertName",
                            "aria-checked": isGroupSubscribed === "true" && rowData.isSubscribed === "true" ? true : false
                        }
                    }
                },
                /* "lblAlertCheckBoxIcon": {
                         "text": isGroupSubscribed === "true" && rowData.isSubscribed === "true" ? "C" : "D",
                         "skin": OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN,
                         "accessibilityConfig": {
                           "a11yLabel": isGroupSubscribed === "true" && rowData.isSubscribed === "true" ? kony.i18n.getLocalizedString("i18n.accountSettings.checked") + " " + rowData.alertsubtypetext_displayName : kony.i18n.getLocalizedString("i18n.accountSettings.unchecked") + " " + rowData.alertsubtypetext_displayName,
                           "a11yARIA": {
                             "tabindex": 0
                           }
                         }
                       },*/
                "lblAlertName": {
                    "text": rowData.alertsubtypetext_displayName
                },
                "flxFrequencyFields": {
                    "isVisible": isGroupSubscribed === "true" && rowData.isSubscribed === "true" && self.enableFrequency && frqText1 !== "" ? true : false
                },
                "flxFrequencyBox1": {
                    "width": isTablet === true ? (frqText2 === "SELECT" ? "49%" : "100%") : "28%"
                },
                "flxFrequencyBox3": {
                    "top": isTablet === true ? (frqText2 === "SELECT" ? "0dp" : "50dp") : "0dp"
                },
                "flxFrequencyBox2": {
                    "isVisible": frqText2 === "SELECT" ? false : true
                },
                "lstBoxFrequency1": {
                    "accessibilityConfig":{
                        "a11yLabel": "Select Frequency to receive Alerts"
                    },
                    "masterData": self.frequencyList.category,
                    "selectedKey": frqText1 !== "" ? frqText1 : "DAILY",
                    "onSelection": function() {
                        self.onFrequencySelection(arguments[1], 1)
                    },
                    "skin": "sknlbxalto42424215pxBordere3e3e32pxRadius"
                },
                "lstBoxFrequency2": {
                    "accessibilityConfig":{
                        "a11yLabel": frqText1 === "MONTHLY" ? "Select date" : "Select day"
                    },
                    "masterData": frqText1 === "MONTHLY" ? self.frequencyList.dates : self.frequencyList.weeks,
                    "selectedKey": frqText2,
                    "onSelection": function() {
                        self.onFrequencySelection(arguments[1], 2)
                    },
                    "skin": "sknlbxalto42424215pxBordere3e3e32pxRadius"
                },
                "lstBoxFrequency3": {
                    "accessibilityConfig":{
                        "a11yLabel": "Select time"
                    },
                    "masterData": self.frequencyList.time,
                    "selectedKey": frqText3,
                    "onSelection": function() {
                        self.onFrequencySelection(arguments[1], 3)
                    },
                    "skin": "sknlbxalto42424215pxBordere3e3e32pxRadius"
                },
                "flxAmountAttribute": {
                    "isVisible": isGroupSubscribed === "true" && rowData.isSubscribed === "true" && rowData.alertAttribute ? true : false
                },
                "lblAttributeTitle1": {
                    "text": rowData.alertsubtypetext_description
                },
                "lblFromValue": {
                    "text": kony.i18n.getLocalizedString("i18n.alertSettings.FromValue"),
                    "isVisible": showToVal
                },
                "flxAmount1": {
                    "skin": "sknBorder727272bgffffff"
                },
                "lblCurrencySymbol1": {
                    "isVisible": false
                },
                "tbxAmount1": {
                    "text": rowData.alertsubtype_value1 && rowData.alertsubtype_value1 !== 'null' ? applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(rowData.alertsubtype_value1) : "0",
                    "accessibilityConfig":{
                        "a11yARIA":{
                            "aria-labelledby":"lblAlertName",
                            "tabindex" : 0
                        }
                    }
                },
                "flxAlertAttribute2": {
                    "isVisible": isTablet === false && showToVal
                },
                "flxAmount2": {
                    "skin": "sknBorder727272bgffffff"
                },
                "lblCurrencySymbol2": {
                    "isVisible": false
                },
                "tbxAmount2": {
                    "text": rowData.alertsubtype_value2 && rowData.alertsubtype_value2 !== 'null' ? applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(rowData.alertsubtype_value2) : "0"
                },
                "flxAlertAttribute3": {
                    "isVisible": rowData.isSubscribed === "true" && isTablet && showToVal
                },
                "flxAmount3": {
                    "skin": "sknBorder727272bgffffff"
                },
                "lblCurrencySymbol3": {
                    "isVisible": false
                },
                "tbxAmount3": {
                    "text": rowData.alertsubtype_value2 && rowData.alertsubtype_value2 !== 'null' ? applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(rowData.alertsubtype_value2) : "0"
                },
                "flxChannels": {
                    "width": "220px",
                    "isVisible": true,
                    "accessibilityConfig": {
                        "a11yLabel":"Pick alert channels for"+  rowData.alertsubtypetext_displayName ,
                        "a11yARIA": {
                            "role": "group",
                            "tabindex": -1
                        }
                    }
                },
                "flxChannel1": {
                    "text": "v",
                    "skin": "sknBtnOLBFontIcons",
                    "isVisible": true,
                    "onClick": self.channelOnClick.bind(this, 1),
                    "info": {},
                    "accessibilityConfig": {
                        "a11yLabel":"Message",
                        "a11yARIA": {
                            "role": "checkbox",
                            "tabindex": 0,
                            "aria-checked":false
                        }
                    }
                },
                //"lblChannel1":{"text":"v","skin":"slFbox","info":{}},
                "flxChannel2": {
                    "text": "w",
                    "skin": "sknBtnOLBFontIcons",
                    "isVisible": true,
                    "onClick": self.channelOnClick.bind(this, 2),
                    "info": {},
                    "accessibilityConfig": {
                        "a11yLabel":"Email",
                        "a11yARIA": {
                            "role": "checkbox",
                            "tabindex": 0,
                            "aria-checked":false
                        }
                    }
                },
                //"lblChannel2":{"text":"w","skin":"slFbox","info":{}},
                "flxChannel3": {
                    "text": "x",
                    "skin": "sknBtnOLBFontIcons",
                    "isVisible": true,
                    "onClick": self.channelOnClick.bind(this, 3),
                    "info": {},
                    "accessibilityConfig": {
                        "a11yLabel":"Push Notification",
                        "a11yARIA": {
                            "role": "checkbox",
                            "tabindex": 0,
                            "aria-checked":false
                        }
                    }
                },
                //"lblChannel3":{"text":"x","skin":"slFbox","info":{}},
                "flxChannel4": {
                    "text": "y",
                    "skin": "sknBtnOLBFontIcons",
                    "isVisible": true,
                    "onClick": self.channelOnClick.bind(this, 4),
                    "info": {},
                    "accessibilityConfig": {
                        "a11yLabel":"Notification",
                        "a11yARIA": {
                            "role": "checkbox",
                            "tabindex": 0,
                            "aria-checked":false
                        }
                    }
                },
                //"lblChannel4":{"text":"y","skin":"slFbox","info":{}},
                "flxVerticalSeparator1": {
                    "isVisible": true
                },
                "flxVerticalSeparator2": {
                    "isVisible": true
                },
                "flxVerticalSeparator3": {
                    "isVisible": true
                },
                "flxSeperator": {
                    "isVisible": showSep
                },
                "flxFullSeperator": {
                    "isVisible": fullsep
                },
                "flxAlert": {
                    "skin": "sknFlxffffffBordere3e3e3"
                },
                "flxdummy": {
                    "isVisible": false
                },
                "supportedChannels": rowData.supportedChannels,
                "subscribedChannels": rowData.subscribedChannels ? rowData.subscribedChannels : "",
                "showToVal": showToVal,
                "template": template,
            };
            var finalJSON = [];
            finalJSON = self.setAlertChannelsToUI(rowData.supportedChannels, rowJSON.flxAlertCheckBox.text === "C" ? rowJSON.subscribedChannels : "", rowJSON);
            return finalJSON;
        },
        /**
         *Method is used to set segment data at GROUP level
         **/
        setGroupLevelAlertsSegData: function(alertTypesData, isInitialLoad) {
            var self = this;
            var widgetMap = {
                "flxGroupAlertsHeaderDW": "flxGroupAlertsHeaderDW",
                "flxGroupAlertsHeaderTablet": "flxGroupAlertsHeaderTablet",
                "flxGroupAlertsHeaderMobile": "flxGroupAlertsHeaderMobile",
                "flxGroupAlertsContainer": "flxGroupAlertsContainer",
                "flxGroupAlertsContainerTablet": "flxGroupAlertsContainerTablet",
                "flxGroupCheckBox": "flxGroupCheckBox",
                "lblGroupCheckBoxIcon": "lblGroupCheckBoxIcon",
                "lblGroupName": "lblGroupName",
                "flxFrequencyFields": "flxFrequencyFields",
                "lblFrequencyTitle": "lblFrequencyTitle",
                "flxFrequency": "flxFrequency",
                "flxFrequencyBox1": "flxFrequencyBox1",
                "flxFrequencyBox2": "flxFrequencyBox2",
                "flxFrequencyBox3": "flxFrequencyBox3",
                "lstBoxFrequency1": "lstBoxFrequency1",
                "lstBoxFrequency2": "lstBoxFrequency2",
                "lstBoxFrequency3": "lstBoxFrequency3",
                "lblChannelsTitle": "lblChannelsTitle",
                "flxChannels": "flxChannels",
                "flxChannel1": "flxChannel1",
                "lblChannel1": "lblChannel1",
                "flxVerticalSeparator1": "flxVerticalSeparator1",
                "flxChannel2": "flxChannel2",
                "lblChannel2": "lblChannel2",
                "flxVerticalSeparator2": "flxVerticalSeparator2",
                "flxChannel3": "flxChannel3",
                "lblChannel3": "lblChannel3",
                "flxVerticalSeparator3": "flxVerticalSeparator3",
                "flxChannel4": "flxChannel4",
                "lblChannel4": "lblChannel4",
                "flxCategoryAlertRow": "flxCategoryAlertRow",
                "flxAlert": "flxAlert",
                "flxdummy": "flxdummy",
                "flxFullSeperator": "flxFullSeperator",
                "lblAlertName": "lblAlertName",
                "flxAttributes": "flxAttributes",
                "flxAttributeValues": "flxAttributeValues",
                "flxAlertAttribute1": "flxAlertAttribute1",
                "lblAttributeTitle1": "lblAttributeTitle1",
                "lblFromValue": "lblFromValue",
                "flxAmount1": "flxAmount1",
                "lblCurrencySymbol1": "lblCurrencySymbol1",
                "tbxAmount1": "tbxAmount1",
                "flxAlertAttribute2": "flxAlertAttribute2",
                "lblToValue": "lblToValue",
                "flxAmount2": "flxAmount2",
                "lblCurrencySymbol2": "lblCurrencySymbol2",
                "tbxAmount2": "tbxAmount2",
                "flxAlertAttribute3": "flxAlertAttribute3",
                "lblAttributeTitle3": "lblAttributeTitle3",
                "lblToValue2": "lblToValue2",
                "flxAmount3": "flxAmount3",
                "lblCurrencySymbol3": "lblCurrencySymbol3",
                "tbxAmount3": "tbxAmount3",
                "flxSeperator": "flxSeperator",
                "flxFullSeperator": "flxFullSeperator",
                "showToVal": "showToVal",
                "recordData": "recordData",
                "alertsubtype_id": "alertsubtype_id",
                "alerttype_id": "alerttype_id",
                "supportedChannels": "supportedChannels",
                "lblSegRoleSeperator": "lblSegRoleSeperator",
                "subscribedChannels": "subscribedChannels"
            };
            var segData = [];
            var rows = [];
            for (var i = 0; i < alertTypesData.length; i++) {
                var sectionData = self.mapGroupLevelGroupSection(alertTypesData[i], isInitialLoad);
                rows = [];
                if (alertTypesData[i].alertSubTypes.length > 0) {
                    for (var j = 0; j < alertTypesData[i].alertSubTypes.length; j++) {
                        rows.push(self.mapGroupLevelAlertRow(alertTypesData[i].alertSubTypes[j], alertTypesData[i].isSubscribed));
                    }
                    rows[rows.length - 1].flxSeperator.isVisible = false;
                    rows[rows.length - 1].flxFullSeperator.isVisible = true;
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                        rows[rows.length - 1].flxSeperator.isVisible = false;
                        rows[rows.length - 1].flxFullSeperator.isVisible = false;
                        rows[rows.length - 1].flxdummy.isVisible = true;
                        rows[rows.length - 1].flxAlert.skin = "sknFlxfffffborder4rd";
                    }
                } else if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    sectionData.flxGroupAlertsContainerTablet.skin = "skflxbgf7f8f7border4pxe3e3e3";
                }
                segData.push([sectionData, rows]);
            }
            this.view.segAlertsListing.widgetDataMap = widgetMap;
            this.view.segAlertsListing.setData(segData);
            this.view.forceLayout();
        },
        /**
         *Method is used to set mapping for group section at GROUP level
         **/
        mapGroupLevelGroupSection: function(secData, isInitialLoad) {
            var self = this;
            var isTablet = false;
            var template = "flxGroupAlertsHeaderDW";
            var dropDownSkin = "sknLblOlbFontIconsA0A0A012Px";
            var frqText1 = "";
            var frqText2 = "SELECT";
            var frqText3 = "SELECT";
            var showSep = false;
            var fullsep = true;
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                template = "flxGroupAlertsHeaderTablet";
                isTablet = true;
            } else if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                template = "flxGroupAlertsHeaderMobile";
                isTablet = true;
                showSep = false;
                fullsep = true;
            } else {
                template = "flxGroupAlertsHeaderDW";
            }
            if (secData.subscribedFrequency) {
                frqText1 = secData.subscribedFrequency[0].alertFrequencyId;
                frqText2 = secData.subscribedFrequency[0].frequencyValue === "" || secData.subscribedFrequency[0].frequencyValue === "null" || secData.subscribedFrequency[0].frequencyValue === "0" || secData.subscribedFrequency[0].frequencyValue === undefined ? "SELECT" : secData.subscribedFrequency[0].frequencyValue;
                frqText3 = secData.subscribedFrequency[0].frequencyTime ? applicationManager.getFormatUtilManager().getTwelveHourTimeString(secData.subscribedFrequency[0].frequencyTime) : "SELECT";
            }
            if (secData.isSubscribed === "true") dropDownSkin = "sknLblFontTypeIcon1a98ff12pxOther";
            var rowJSON = {
                "alerttype_id": secData.alerttype_id,
                "flxGroupCheckBox": {
                    "text": secData.isSubscribed === "true" ? "C" : "D",
                    "onClick": self.toggleGroupCheckBox,
                    "skin": "btnsknDisabled",
                    "accessibilityConfig": {
                        //"a11yLabel": secData.isSubscribed === "true" ? kony.i18n.getLocalizedString("i18n.accountSettings.checked") + " " + secData.alerttypetext_DisplayName : kony.i18n.getLocalizedString("i18n.accountSettings.unchecked") + " " + secData.alerttypetext_DisplayName,
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": secData.isSubscribed === "true" ? true : false,
                            "aria-labelledby": "lblGroupName",
                            "tabindex": 0
                        }
                    }
                },
                "lblGroupName": {
                    "text": secData.alerttypetext_DisplayName
                },
                "flxFrequencyFields": {
                    "isVisible": self.enableFrequency && frqText1 !== "" ? true : false
                },
                "flxFrequencyBox1": {
                    "width": isTablet === true ? (frqText2 === "SELECT" ? "49%" : "100%") : "28%"
                },
                "flxFrequencyBox3": {
                    "top": isTablet === true ? (frqText2 === "SELECT" ? "0dp" : "50dp") : "0dp"
                },
                "flxFrequencyBox2": {
                    "isVisible": frqText2 === "SELECT" ? false : true
                },
                "lstBoxFrequency1": {
                    "accessibilityConfig":{
                        "a11yLabel": "Select Frequency to receive Alerts"
                    },
                    "masterData": self.frequencyList.category,
                    "selectedKey": frqText1 === "" ? "DAILY" : frqText1,
                    "onSelection": function() {
                        self.onFrequencySelection(arguments[1], 1)
                    },
                    "skin": "sknlbxalto42424215pxBordere3e3e32pxRadius"
                },
                "lstBoxFrequency2": {
                    "accessibilityConfig":{
                        "a11yLabel": frqText1 === "MONTHLY" ? "Select date" : "Select day"
                    },
                    "masterData": frqText1 === "MONTHLY" ? self.frequencyList.dates : self.frequencyList.weeks,
                    "selectedKey": frqText2,
                    "onSelection": function() {
                        self.onFrequencySelection(arguments[1], 2)
                    },
                    "skin": "sknlbxalto42424215pxBordere3e3e32pxRadius"
                },
                "lstBoxFrequency3": {
                    "accessibilityConfig":{
                        "a11yLabel": "Select time"
                    },
                    "masterData": self.frequencyList.time,
                    "selectedKey": frqText3,
                    "onSelection": function() {
                        self.onFrequencySelection(arguments[1], 3)
                    },
                    "skin": "sknlbxalto42424215pxBordere3e3e32pxRadius"
                },
                "lblChannelsTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.Alerts.SelectChannels")
                },
                "lblFrequencyTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.PayPerson.frequency")
                },
                "flxChannels": template === "flxGroupAlertsHeaderDW" ? {
                    "width": "180px",
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "role": "group",
                            "tabindex": -1
                        },
                        "a11yLabel": secData.alerttypetext_DisplayName.includes("Alert")? secData.alerttypetext_DisplayName + " Channels" : secData.alerttypetext_DisplayName + " Alert Channels"
                    }
                } : {
                    "width": "220px",
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "role": "group",
                            "tabindex": -1
                        },
                        "a11yLabel": secData.alerttypetext_DisplayName.includes("Alert")? secData.alerttypetext_DisplayName + " Channels" : secData.alerttypetext_DisplayName + " Alert Channels"
                    }
                },
                "flxChannel1": {
                    "text": "v",
                    "skin": "sknBtnOLBFontIcons",
                    "isVisible": true,
                    "onClick": self.channelOnClick.bind(this, 1),
                    "info": {},
                    "accessibilityConfig": {
                        "a11yLabel":"Message",
                        "a11yARIA": {
                            "role": "checkbox",
                            "tabindex": 0,
                            "aria-checked":false
                        }
                    }
                },
                //"lblChannel1":{"text":"v","skin":"slFbox","info":{}},
                "flxChannel2": {
                    "text": "w",
                    "skin": "sknBtnOLBFontIcons",
                    "isVisible": true,
                    "onClick": self.channelOnClick.bind(this, 2),
                    "info": {},
                    "accessibilityConfig": {
                        "a11yLabel":"Email",
                        "a11yARIA": {
                            "role": "checkbox",
                            "tabindex": 0,
                            "aria-checked":false
                        }
                    }
                },
                //"lblChannel2":{"text":"w","skin":"slFbox","info":{}},
                "flxChannel3": {
                    "text": "x",
                    "skin": "sknBtnOLBFontIcons",
                    "isVisible": true,
                    "onClick": self.channelOnClick.bind(this, 3),
                    "info": {},
                    "accessibilityConfig": {
                        "a11yLabel":"Push Notification",
                        "a11yARIA": {
                            "role": "checkbox",
                            "tabindex": 0,
                            "aria-checked":false
                        }
                    }
                },
                //"lblChannel3":{"text":"x","skin":"slFbox","info":{}},
                "flxChannel4": {
                    "text": "y",
                    "skin": "sknBtnOLBFontIcons",
                    "isVisible": true,
                    "onClick": self.channelOnClick.bind(this, 4),
                    "info": {},
                    "accessibilityConfig": {
                        "a11yLabel":"Notification",
                        "a11yARIA": {
                            "role": "checkbox",
                            "tabindex": 0,
                            "aria-checked":false
                        }
                    }
                },
                //"lblChannel4":{"text":"y","skin":"slFbox","info":{}},
                "flxVerticalSeparator1": {
                    "isVisible": true
                },
                "flxVerticalSeparator2": {
                    "isVisible": true
                },
                "flxVerticalSeparator3": {
                    "isVisible": true
                },
                "flxSeperator": {
                    "isVisible": showSep
                },
                "flxFullSeperator": {
                    "isVisible": fullsep
                },
                "flxAlert": {
                    "skin": "sknFlxffffffBordere3e3e3"
                },
                "flxdummy": {
                    "isVisible": false
                },
                "flxGroupAlertsContainerTablet": {
                    "skin": "sknFlxf8f7f8BorderRad4px"
                },
                "supportedChannels": secData.supportedChannels,
                "subscribedChannels": secData.subscribedChannels ? secData.subscribedChannels : "",
                "template": template
            };
            var finalJSON = [];
            finalJSON = self.setAlertChannelsToUI(secData.supportedChannels, rowJSON.flxGroupCheckBox.text === "C" ? rowJSON.subscribedChannels : "", rowJSON);
            return finalJSON;
        },
        /**
         *Method is used to set mapping for alert section at GROUP/CATEGORY level
         **/
        mapGroupLevelAlertRow: function(rowData, isGroupSubscribed) {
            var isTablet = false;
            var showToVal = false;
            var showSep = true;
            var fullsep = false;
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                isTablet = true;
            } else if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                showSep = false;
                fullsep = true;
            }
            if (rowData.alertCondition && rowData.alertCondition.id === "IN_BETWEEN") showToVal = true;
            return {
                "recordData": rowData,
                "alertsubtype_id": rowData.alertsubtype_id,
                "lblAlertName": {
                    "text": rowData.alertsubtypetext_displayName
                },
                "flxAttributes": {
                    "isVisible": isGroupSubscribed === "true" && rowData.alertAttribute ? true : false
                },
                "lblAttributeTitle1": {
                    "text": rowData.alertsubtypetext_description
                },
                "lblFromValue": {
                    "text": kony.i18n.getLocalizedString("i18n.alertSettings.FromValue"),
                    "isVisible": showToVal
                },
                "tbxAmount1": {
                    "text": rowData.alertsubtype_value1 && rowData.alertsubtype_value1 !== 'null' ? applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(rowData.alertsubtype_value1) : "0",
                    "accessibilityConfig":{
                        "a11yARIA":{
                            "aria-labelledby":"lblAlertName",
                            "tabindex" : 0
                        }
                    }
                },
                "flxAmount1": {
                    "skin": "sknBorder727272bgffffff"
                },
                "flxAmount2": {
                    "skin": "sknBorder727272bgffffff"
                },
                "flxAmount3": {
                    "skin": "sknBorder727272bgffffff"
                },
                "lblCurrencySymbol1": {
                    "isVisible": false
                },
                "lblCurrencySymbol2": {
                    "isVisible": false
                },
                "lblCurrencySymbol3": {
                    "isVisible": false
                },
                "flxAlertAttribute2": {
                    "isVisible": isTablet === false && showToVal
                },
                "tbxAmount2": {
                    "text": rowData.alertsubtype_value2 && rowData.alertsubtype_value2 !== 'null' ? applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(rowData.alertsubtype_value2) : "0"
                },
                "flxAlertAttribute3": {
                    "isVisible": isGroupSubscribed === "true" && isTablet && showToVal ? true : false
                },
                "tbxAmount3": {
                    "text": rowData.alertsubtype_value2 && rowData.alertsubtype_value2 !== 'null' ? applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(rowData.alertsubtype_value2) : "0"
                },
                "flxSeperator": {
                    "isVisible": showSep
                },
                "flxFullSeperator": {
                    "isVisible": fullsep
                },
                "flxAlert": {
                    "skin": "sknFlxffffffBordere3e3e3"
                },
                "flxdummy": {
                    "isVisible": false
                },
                "showToVal": showToVal,
                "template": "flxCategoryAlertRow"
            }
        },
        /**
         *Method is used to set data for segment at CATEGORY level
         **/
        setCategoryLevelAlertsSegData: function(alertTypesData) {
            var self = this;
            var widgetMap = {
                "flxCategoryAlertsHeader": "flxCategoryAlertsHeader",
                "flxCategoryAlertsContainer": "flxCategoryAlertsContainer",
                "flxGroupCheckBox": "flxGroupCheckBox",
                "lblGroupCheckBoxIcon": "lblGroupCheckBoxIcon",
                "lblGroupName": "lblGroupName",
                "lblGroupAlertsCount": "lblGroupAlertsCount",
                "flxCategoryAlertRow": "flxCategoryAlertRow",
                "flxAlert": "flxAlert",
                "flxdummy": "flxdummy",
                "flxFullSeperator": "flxFullSeperator",
                "lblAlertName": "lblAlertName",
                "flxAttributes": "flxAttributes",
                "flxAttributeValues": "flxAttributeValues",
                "flxAlertAttribute1": "flxAlertAttribute1",
                "lblAttributeTitle1": "lblAttributeTitle1",
                "lblFromValue": "lblFromValue",
                "flxAmount1": "flxAmount1",
                "lblCurrencySymbol1": "lblCurrencySymbol1",
                "tbxAmount1": "tbxAmount1",
                "flxAlertAttribute2": "flxAlertAttribute2",
                "lblToValue": "lblToValue",
                "flxAmount2": "flxAmount2",
                "lblCurrencySymbol2": "lblCurrencySymbol2",
                "tbxAmount2": "tbxAmount2",
                "flxAlertAttribute3": "flxAlertAttribute3",
                "lblAttributeTitle3": "lblAttributeTitle3",
                "lblToValue2": "lblToValue2",
                "flxAmount3": "flxAmount3",
                "lblCurrencySymbol3": "lblCurrencySymbol3",
                "tbxAmount3": "tbxAmount3",
                "flxSeperator": "flxSeperator",
                "flxFullSeperator": "flxFullSeperator",
                "showToVal": "showToVal",
                "recordData": "recordData",
                "alertsubtype_id": "alertsubtype_id",
                "alerttype_id": "alerttype_id"
            };
            var segData = [];
            var rows = [];
            for (var i = 0; i < alertTypesData.length; i++) {
                var sectionData = self.mapAlertLevelGroupSection(alertTypesData[i]);
                rows = [];
                if (alertTypesData[i].alertSubTypes.length > 0) {
                    for (var j = 0; j < alertTypesData[i].alertSubTypes.length; j++) {
                        rows.push(self.mapGroupLevelAlertRow(alertTypesData[i].alertSubTypes[j], alertTypesData[i].isSubscribed));
                    }
                    rows[rows.length - 1].flxSeperator.isVisible = false;
                    rows[rows.length - 1].flxFullSeperator.isVisible = true;
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                        rows[rows.length - 1].flxSeperator.isVisible = false;
                        rows[rows.length - 1].flxFullSeperator.isVisible = false;
                        rows[rows.length - 1].flxdummy.isVisible = true;
                        rows[rows.length - 1].flxAlert.skin = "sknFlxfffffborder4rd";
                    }
                } else if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    sectionData.flxCategoryAlertsContainer.skin = "skflxbgf7f8f7border4pxe3e3e3";
                }
                segData.push([sectionData, rows]);
            }
            this.view.segAlertsListing.widgetDataMap = widgetMap;
            this.view.segAlertsListing.setData(segData);
            this.view.forceLayout();
        },
        /**
         *Method is used to set channels data for group/alert sections at GROUP/ALERT level respectively
         **/
        setAlertChannelsToUI: function(supportedChannels, subscribedChannels, rowJSON) {
            var channelsData = supportedChannels.split(",");
            var channelIcons = {
                "CH_SMS": {
                    "text": "v",
                    "normalSkin": "sknLblSMS727272FontIcon",
                    "selectedSkin": "btnSknEnabled"
                },
                "CH_NOTIFICATION_CENTER": {
                    "text": "y",
                    "normalSkin": "sknLblNotification727272FontIcon",
                    "selectedSkin": "btnSknEnabled"
                },
                "CH_PUSH_NOTIFICATION": {
                    "text": "x",
                    "normalSkin": "sknLblPush727272FontIcon",
                    "selectedSkin": "btnSknEnabled"
                },
                "CH_EMAIL": {
                    "text": "w",
                    "normalSkin": "sknLblEmail727272FontIcon",
                    "selectedSkin": "btnSknEnabled"
                }
            };
            for (var i = 0; i < channelsData.length; i++) {
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    // by default all skin = slfboxdeselectedrighte3e3e3
                    //rowJSON["flxChannel" + (i + 1)].skin = "slfboxdeselectedrighte3e3e3";
                    rowJSON["flxChannel" + (i + 1)].isVisible = true;
                    rowJSON["flxChannel" + (i + 1)].text = channelIcons[channelsData[i]].text;
                    if (i <= 2) rowJSON["flxVerticalSeparator" + (i + 1)].isVisible = false;
                    rowJSON["flxChannel" + (i + 1)].info = {
                        "id": channelsData[i],
                        "isSelected": false,
                        "normalSkin": channelIcons[channelsData[i]].normalSkin,
                        "selectedSkin": channelIcons[channelsData[i]].selectedSkin
                    };
                    rowJSON["flxChannel" + (i + 1)].skin = rowJSON["flxChannel" + (i + 1)].info.normalSkin;
                    if (subscribedChannels.indexOf(channelsData[i]) >= 0) {
                        /* rowJSON["lblChannel"+(i+1)].info.isSelected=true;
                                                        rowJSON["lblChannel"+(i+1)].skin=rowJSON["lblChannel"+(i+1)].info.selectedSkin;
                                                        rowJSON["flxChannel"+(i+1)].skin=rowJSON["flxChannel"+i]&&rowJSON["flxChannel"+i].skin==="slFbox"?"bbSknFlxffffffWithShadow1": "bbSknFlxffffffWithShadow2";
                                                        }else{/*/
			            rowJSON["flxChannel" + (i + 1)].info.isSelected = true;
                        rowJSON["flxChannel" + (i + 1)].skin = rowJSON["flxChannel" + (i + 1)].info.selectedSkin;
                        if (channelIcons[channelsData[i]].text === "v") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "SMS",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "w") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Email",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "x") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Push notifications",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "y") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Notifications",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                       // rowJSON["flxChannel" + (i + 1)].info.isSelected = false;
                        var opt = i + 1;
                        switch (opt) {
                            case 1:
                                //rowJSON["flxChannel" + (opt)].skin = "sknFlxBgFFFFFFBr003e75Rd3pxlefttopbottom2";
                                //rowJSON["flxChannel" + (opt + 1)].skin = rowJSON["flxChannel" + (opt + 1)].info.selectedSkin;
                                break;
                                /* case 2:
                                                                                if (rowJSON["lblChannel" + (opt - 1)].info.isSelected) {
                                                                                    rowJSON["flxChannel" + (opt)].skin = "sknFlxBgFFFFFFBr003e75Noborder2";
                                                                                    rowJSON["flxChannel" + (opt - 1)].skin = "sknFlxBgFFFFFFBr003e75Rd3pxlefttopbottom";
                                                                                } else {
                                                                                    rowJSON["flxChannel" + (opt)].skin = "sknFlxBgFFFFFFBr003e75Noborder";
                                                                                    rowJSON["flxChannel" + (opt - 1)].skin = "slFbox";
                                                                                }
                                                                                break;
                                                                            case 3:
                                                                                if (rowJSON["lblChannel" + (opt - 1)].info.isSelected) {
                                                                                    rowJSON["flxChannel" + (opt)].skin = "sknFlxBgFFFFFFBr003e75Noborder2";
                                                                                    rowJSON["flxChannel" + (opt - 1)].skin = "sknFlxBgFFFFFFBr003e75Noborder";
                                                                                } else {
                                                                                    rowJSON["flxChannel" + (opt)].skin = "sknFlxBgFFFFFFBr003e75Noborder";
                                                                                    rowJSON["flxChannel" + (opt - 1)].skin = "slfboxdeselectedrighte3e3e3";
                                                                                    // rowJSON["flxChannel"+(opt-2)].skin="slFbox";
                                                                                }
                                                                                break;
                                                                            case 4:
                                                                                if (rowJSON["lblChannel" + (opt - 1)].info.isSelected) {
                                                                                    rowJSON["flxChannel" + (opt)].skin = "sknFlxBgFFFFFFBr003e75Rd3pxrighttopbottom";
                                                                                    rowJSON["flxChannel" + (opt - 1)].skin = "sknFlxBgFFFFFFBr003e75Noborder";
                                                                                } else {
                                                                                    rowJSON["flxChannel" + (opt)].skin = "sknFlxBgFFFFFFBr003e75Rd3pxrighttopbottom";
                                                                                    rowJSON["flxChannel" + (opt - 1)].skin = "slFbox";
                                                                                    // rowJSON["flxChannel"+(opt-2)].skin="slFbox";
                                                                                }
                                                                                break;*/
                        }
                    } else {
                        rowJSON["flxChannel" + (i + 1)].skin = rowJSON["flxChannel" + (i + 1)].info.normalSkin;
                        rowJSON["flxChannel" + (i + 1)].info.isSelected = false;
                        if (channelIcons[channelsData[i]].text === "v") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "SMS",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "w") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Email",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "x") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Push notifications",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "y") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Notifications",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                        var opt = i + 1;
                        /* switch (opt) {
                                                            case 1:
                                                                rowJSON["flxChannel" + (opt)].skin = "sknBtnOLBFontIcons";
                                                                break;
                                                            case 2:
                                                                if (rowJSON["flxChannel" + (opt - 1)].info.isSelected) {
                                                                    rowJSON["flxChannel" + (opt)].skin = "sknBtnOLBFontIcons";
                                                                }
                                                                break;
                                                            case 3:
                                                                if (rowJSON["flxChannel" + (opt - 1)].info.isSelected && (!rowJSON["flxChannel" + (opt - 2)].info.isSelected)) {
                                                                    rowJSON["flxChannel" + (opt - 1)].skin = "sknBtnOLBFontIcons";
                                                                }
                                                                break;
                                                            case 4:
                                                                if (rowJSON["flxChannel" + (opt - 1)].info.isSelected && (!rowJSON["flxChannel" + (opt - 2)].info.isSelected)) {
                                                                    rowJSON["flxChannel" + (opt - 1)].skin = "sknBtnOLBFontIcons";
                                                                }
                                                                break;
                                                        }*/
                    }
                } else {
                    //rowJSON["flxChannel" + (i + 1)].skin = "btnsknDisabled";
                    rowJSON["flxChannel" + (i + 1)].isVisible = true;
                    rowJSON["flxChannel" + (i + 1)].text = channelIcons[channelsData[i]].text;
                    rowJSON["flxChannel" + (i + 1)].info = {
                        "id": channelsData[i],
                        "isSelected": false,
                        "normalSkin": channelIcons[channelsData[i]].normalSkin,
                        "selectedSkin": channelIcons[channelsData[i]].selectedSkin
                    };
                    if (subscribedChannels.indexOf(channelsData[i]) >= 0) {
                        rowJSON["flxChannel" + (i + 1)].info.isSelected = true;
                        rowJSON["flxChannel" + (i + 1)].skin = rowJSON["flxChannel" + (i + 1)].info.selectedSkin;
                        if (channelIcons[channelsData[i]].text === "v") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "SMS",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":true
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "w") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Email",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":true
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "x") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Push notifications",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":true
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "y") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Notifications",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":true
                                }
                            }
                        }
                        //rowJSON["flxChannel"+(i+1)].skin=rowJSON["flxChannel"+i]&&rowJSON["flxChannel"+i].skin==="slFbox"?"bbSknFlxffffffWithShadow1": "bbSknFlxffffffWithShadow2";
                    } else {
                        rowJSON["flxChannel" + (i + 1)].skin = rowJSON["flxChannel" + (i + 1)].info.normalSkin;
                        if (channelIcons[channelsData[i]].text === "v") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "SMS",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "w") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Email",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "x") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Push notifications",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                        if (channelIcons[channelsData[i]].text === "y") {
                            rowJSON["flxChannel" + (i + 1)].accessibilityConfig = {
                                "a11yLabel": "Notifications",
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "tabindex": 0,
                                    "aria-checked":false
                                }
                            }
                        }
                    }
                }
            }
            for (var x = i + 1; x <= 4; x++) {
                rowJSON["flxChannel" + x].isVisible = false;
                rowJSON["flxVerticalSeparator" + (x - 1)].isVisible = false;
            }
            if (rowJSON.template === "flxGroupAlertRowDW" || rowJSON.template === "flxGroupAlertRowTablet" || rowJSON.template === "flxGroupAlertsHeaderTablet") {
                rowJSON.flxChannels.width = (channelsData.length) * 45 + "px";
            } else {
                rowJSON.flxChannels.width = ((channelsData.length) * 45 + 5)+ "px";
            }
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                rowJSON.flxChannels.width = ((channelsData.length) * 45 + 2) + "px";
            }
            if (rowJSON.template === "flxGroupAlertRowTablet" || rowJSON.template === "flxGroupAlertsHeaderTablet") {
                rowJSON.flxChannels.width = (channelsData.length) * 50 + "px";
            }
            return rowJSON;
        },
        /**
         *Method is used to set selected channels skin at both ALERT&GROUP level
         **/
        channelOnClick: function(opt, a, b) {
            var secIndex = 0;
            var rowIndex = 0;
            var data = this.view.segAlertsListing.data;
            var selectedRowData = [];
            var isSubscribed = false;
            if (this.alertPreference === "GROUP") {
                secIndex = b.sectionIndex;
                selectedRowData = data[secIndex][0];
                isSubscribed = selectedRowData.flxGroupCheckBox.text === "C" ? true : false;
            } else {
                secIndex = b.sectionIndex;
                rowIndex = b.rowIndex;
                selectedRowData = data[secIndex][1][rowIndex];
                isSubscribed = selectedRowData.flxAlertCheckBox.text === "C" ? true : false;
            }
            if (isSubscribed) { //to enable onclick for only subscribed group/alert
                var info = selectedRowData["flxChannel" + opt].info;
                if (info && info.isSelected === true) {
                    //selectedRowData["flxChannel" + opt].skin = "btnsknDisabled";
                    selectedRowData["flxChannel" + opt].info.isSelected = false;
                    selectedRowData["flxChannel" + opt].skin = "sknBtnOLBFontIcons";
                    if (selectedRowData["flxChannel" + opt].info.id === "CH_EMAIL") {
                        selectedRowData["flxChannel" + opt].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":false
                            }
                        }
                    } else if (selectedRowData["flxChannel" + opt].info.id === "CH_NOTIFICATION_CENTER") {
                        selectedRowData["flxChannel" + opt].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.alertSettings.NotifCenter"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":false
                            }
                        }
                    } else if (selectedRowData["flxChannel" + opt].info.id === "CH_PUSH_NOTIFICATION") {
                        selectedRowData["flxChannel" + opt].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.Alertsettings.PushNotifications"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":false
                            }
                        }
                    } else {
                        selectedRowData["flxChannel" + opt].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.SMS"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":false
                            }
                        }
                    }
                    //for mobile breakpoint
                    /* if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                                                  switch (opt) {
                                                      case 1:
                                                          selectedRowData["flxChannel" + (opt)].skin = (selectedRowData["flxChannel" + (opt + 1)].skin === "slfboxdeselectedrighte3e3e3" || selectedRowData["flxChannel" + (opt + 1)].skin === "slFbox") ? "slfboxdeselectedrighte3e3e3" : "slFbox";
                                                          break;
                                                      case 2:
                                                          if (selectedRowData["lblChannel" + (opt - 1)].info.isSelected) {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "sknFlxBgFFFFFFBr003e75Rd3pxlefttopbottom2";
                                                          } else {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "slfboxdeselectedrighte3e3e3";
                                                          }
                                                          selectedRowData["flxChannel" + (opt)].skin = (selectedRowData["flxChannel" + (opt - 1)].skin === "sknFlxBgFFFFFFBr003e75Rd3pxlefttopbottom2" && selectedRowData["flxChannel" + (opt + 1)].skin === "sknFlxBgFFFFFFBr003e75Noborder") ? "slFbox" : "slfboxdeselectedrighte3e3e3";
                                                          break;
                                                      case 3:
                                                          if (selectedRowData["lblChannel" + (opt - 1)].info.isSelected) {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "sknFlxBgFFFFFFBr003e75Noborder2";
                                                          } else {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "slfboxdeselectedrighte3e3e3";
                                                          }
                                                          selectedRowData["flxChannel" + (opt)].skin = (selectedRowData["flxChannel" + (opt - 1)].skin === "slfboxdeselectedrighte3e3e3" && selectedRowData["flxChannel" + (opt + 1)].skin === "sknFlxBgFFFFFFBr003e75Rd3pxrighttopbottom") ? "slFbox" : "slfboxdeselectedrighte3e3e3";
                                                          break;
                                                      case 4:
                                                          if (selectedRowData["lblChannel" + (opt - 1)].info.isSelected) {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "sknFlxBgFFFFFFBr003e75Noborder2";
                                                          } else {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "slfboxdeselectedrighte3e3e3";
                                                          }
                                                          selectedRowData["flxChannel" + (opt)].skin = "slFbox"; //(selectedRowData["flxChannel"+(opt-1)].skin==="sknFlxBgFFFFFFBr003e75Noborder" && selectedRowData["flxChannel"+(opt+1)].skin==="slfbox")?"sknFlxBgFFFFFFBr003e75Noborder2":"sknFlxBgFFFFFFBr003e75Noborder";
                                                          break
                                                  }
                                              } else //other breakpoint
                                              {
                                                  //if (selectedRowData["flxChannel" + (opt + 1)]) selectedRowData["flxChannel" + (opt + 1)].skin = selectedRowData["flxChannel" + (opt + 1)].skin === "sknBtnOLBFontIcons" ? "sknBtnOLBFontIcons" : "btnsknDisabled";
                                              }*/
                } else {
                    //selectedRowData["flxChannel" + opt].skin = selectedRowData["flxChannel" + (opt - 1)] && selectedRowData["flxChannel" + (opt - 1)].skin !== "btnsknDisabled" ? "sknBtnOLBFontIcons" : "sknBtnOLBFontIcons";
                    selectedRowData["flxChannel" + opt].info.isSelected = true;
                    selectedRowData["flxChannel" + opt].skin = "btnSknEnabled";
                    if (selectedRowData["flxChannel" + opt].info.id === "CH_EMAIL") {
                        selectedRowData["flxChannel" + opt].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":true
                            }
                        }
                    } else if (selectedRowData["flxChannel" + opt].info.id === "CH_NOTIFICATION_CENTER") {
                        selectedRowData["flxChannel" + opt].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.alertSettings.NotifCenter"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":true
                            }
                        }
                    } else if (selectedRowData["flxChannel" + opt].info.id === "CH_PUSH_NOTIFICATION") {
                        selectedRowData["flxChannel" + opt].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.Alertsettings.PushNotifications"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":true
                            }
                        }
                    } else {
                        selectedRowData["flxChannel" + opt].accessibilityConfig = {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.SMS"),
                            "a11yARIA": {
                                "role": "checkbox",
                                "tabindex": 0,
                                "aria-checked":true
                            }
                        }
                    }
                    /*if (selectedRowData["lblChannel" + opt].info.id === "CH_EMAIL"){
                                              selectedRowData["lblChannel" + opt].accessibilityConfig = {
                                                "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.Unselected") + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId") + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Info")
                                              }
                                            }
                                            else if (selectedRowData["lblChannel" + opt].info.id === "CH_NOTIFICATION_CENTER"){
                                              selectedRowData["lblChannel" + opt].accessibilityConfig = {
                                                "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.Unselected") + " " + kony.i18n.getLocalizedString("i18n.alertSettings.NotifCenter") + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Info")
                                              }
                                            }
                                            else if (selectedRowData["lblChannel" + opt].info.id === "CH_PUSH_NOTIFICATION"){
                                              selectedRowData["lblChannel" + opt].accessibilityConfig = {
                                                "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.Unselected") + " " + kony.i18n.getLocalizedString("i18n.Alertsettings.PushNotifications") + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Info")
                                              }
                                            }
                                            else {
                                              selectedRowData["lblChannel" + opt].accessibilityConfig = {
                                                "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.Unselected") + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.SMS") + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Info")
                                              }
                                            }*/
                    //for mobile breakpoint
                    /* if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                                                  switch (opt) {
                                                      case 1:
                                                          selectedRowData["flxChannel" + (opt)].skin = selectedRowData["flxChannel" + (opt + 1)].skin === "slfboxdeselectedrighte3e3e3" ? "sknFlxBgFFFFFFBr003e75Rd3pxlefttopbottom2" : "sknFlxBgFFFFFFBr003e75Rd3pxlefttopbottom";
                                                          break;
                                                      case 2:
                                                          if (selectedRowData["lblChannel" + (opt - 1)].info.isSelected) {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "sknFlxBgFFFFFFBr003e75Rd3pxlefttopbottom";
                                                          } else {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "slfboxdeselectedrighte3e3e3";
                                                          }
                                                          selectedRowData["flxChannel" + (opt)].skin = ((selectedRowData["flxChannel" + (opt - 1)].skin === "sknFlxBgFFFFFFBr003e75Rd3pxlefttopbottom" || selectedRowData["flxChannel" + (opt - 1)].skin === "slfboxdeselectedrighte3e3e3") && (selectedRowData["flxChannel" + (opt + 1)].skin === "slfboxdeselectedrighte3e3e3" || selectedRowData["flxChannel" + (opt + 1)].skin === "slFbox")) ? "sknFlxBgFFFFFFBr003e75Noborder2" : "sknFlxBgFFFFFFBr003e75Noborder";
                                                          break;
                                                      case 3:
                                                          if (selectedRowData["lblChannel" + (opt - 1)].info.isSelected) {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "sknFlxBgFFFFFFBr003e75Noborder";
                                                          } else {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "slfboxdeselectedrighte3e3e3";
                                                          }
                                                          selectedRowData["flxChannel" + (opt)].skin = (selectedRowData["flxChannel" + (opt - 1)].skin === "sknFlxBgFFFFFFBr003e75Noborder" && selectedRowData["flxChannel" + (opt + 1)].skin === "sknFlxBgFFFFFFBr003e75Rd3pxrighttopbottom") || (selectedRowData["flxChannel" + (opt + 1)].skin === "sknFlxBgFFFFFFBr003e75Rd3pxrighttopbottom") ? "sknFlxBgFFFFFFBr003e75Noborder" : "sknFlxBgFFFFFFBr003e75Noborder2";
                                                          break;
                                                      case 4:
                                                          if (selectedRowData["lblChannel" + (opt - 1)].info.isSelected) {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "sknFlxBgFFFFFFBr003e75Noborder";
                                                          } else {
                                                              selectedRowData["flxChannel" + (opt - 1)].skin = "slfboxdeselectedrighte3e3e3";
                                                          }
                                                          selectedRowData["flxChannel" + (opt)].skin = "sknFlxBgFFFFFFBr003e75Rd3pxrighttopbottom"; //(selectedRowData["flxChannel"+(opt-1)].skin==="sknFlxBgFFFFFFBr003e75Noborder" && selectedRowData["flxChannel"+(opt+1)].skin==="slfbox")?"sknFlxBgFFFFFFBr003e75Noborder2":"sknFlxBgFFFFFFBr003e75Noborder";
                                                          break;
                                                  }
                                              } else //other breakpoint
                                              {
                                                  //if (selectedRowData["flxChannel" + (opt + 1)]) selectedRowData["flxChannel" + (opt + 1)].skin = selectedRowData["flxChannel" + (opt + 1)].skin === "sknBtnOLBFontIcons" ? "sknBtnOLBFontIcons" : "btnsknDisabled";
                                              }*/
                }
                if (this.alertPreference === "GROUP") {
                    data[secIndex][0] = selectedRowData
                    this.view.segAlertsListing.setData(data);
                } else this.view.segAlertsListing.setDataAt(selectedRowData, rowIndex, secIndex);
                this.view.flxAlertsBody.forceLayout();
                // this.AdjustScreen();
                this.view.forceLayout();
            }
            this.view.segAlertsListing.setActive(b.rowIndex, b.sectionIndex, "flxGroupAlertsHeaderDW.flxGroupAlertsContainer.flxGroup.flxCategoryChannels.flxChannels.flxChannel" + opt);
        },
        setTabRole : function(){

        },
        /**
         *Method is used to update the alerts data on checkbox click
         **/
        toggleAlertCheckBox: function(a, b) {
            var data = this.view.segAlertsListing.data;
            var secIndex = b.sectionIndex;
            var selectedSecData = data[secIndex];
            var rowIndex = b.rowIndex;
            var selectedRowData = data[secIndex][1][rowIndex];
            var selectedAlerts = 0;
            if (selectedRowData.flxAlertCheckBox.text === "D") {
                selectedRowData.flxAlertCheckBox.text = "C";
                selectedRowData.flxAlertCheckBox.accessibilityConfig = {
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "checkbox",
                        "aria-labelledby": "lblAlertName",
                        "aria-checked": true
                    }
                }
                selectedRowData.flxFrequencyFields.isVisible = true;
                selectedRowData.flxAmountAttribute.isVisible = true;
                selectedRowData.flxFrequencyFields.isVisible = selectedRowData.recordData.subscribedFrequency ? true : false;
                selectedRowData.flxAmountAttribute.isVisible = selectedRowData.recordData.alertAttribute ? true : false;
                selectedRowData.flxAlertAttribute3.isVisible = (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) && selectedRowData.showToVal ? true : false;
                selectedRowData = this.setAlertChannelsToUI(selectedRowData.supportedChannels, selectedRowData.subscribedChannels, selectedRowData)
            } else {
                selectedRowData.flxAlertCheckBox.text = "D";
                selectedRowData.flxAlertCheckBox.accessibilityConfig = {
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "checkbox",
                        "aria-labelledby": "lblAlertName",
                        "aria-checked": false
                    }
                }
                selectedRowData.flxFrequencyFields.isVisible = false;
                selectedRowData.flxAmountAttribute.isVisible = false;
                selectedRowData.flxAlertAttribute3.isVisible = false;
                selectedRowData = this.setAlertChannelsToUI(selectedRowData.supportedChannels, "", selectedRowData);
            }
            for (var i = 0; i < selectedSecData[1].length; i++) {
                if (selectedSecData[1][i].flxAlertCheckBox.text === "C") selectedAlerts++;
            }
            selectedSecData[0].flxGroupCheckBox.text = selectedAlerts === selectedSecData[1].length ? "C" : selectedAlerts === 0 ? "D" : "C";
            selectedSecData[0].lblGroupAlertsCount.text = "(" + selectedAlerts + "/" + selectedSecData[1].length + ")";
            if (selectedAlerts === 0) {
                selectedSecData[0].flxGroupCheckBox.accessibilityConfig = {
                    a11yARIA: {
                        "tabindex": 0,
                        "aria-labelledby": "lblGroupName",
                        "aria-checked": false,
                        "role": "checkbox"
                    }
                }
            } else {
                selectedSecData[0].flxGroupCheckBox.accessibilityConfig = {
                    a11yARIA: {
                        "tabindex": 0,
                        "aria-labelledby": "lblGroupName",
                        "aria-checked": true,
                        "role": "checkbox"
                    }
                }
            }
            selectedSecData[0].lblGroupAlertsCount.isVisible = selectedAlerts === 0 ? false : true;
            selectedSecData[1][rowIndex] = selectedRowData;
            data[secIndex] = selectedSecData;
            this.view.segAlertsListing.setData(data);
            this.view.flxAlertsBody.forceLayout();
            this.toggleChannelClick();
            //  this.AdjustScreen();
            this.view.forceLayout();
            this.view.segAlertsListing.setActive(b.rowIndex,b.sectionIndex,"flxAlertCheckBox");
        },
        /**
         *Method is used to update groups&alerts row data on checkbox click
         **/
        toggleGroupCheckBox: function(a, b) {
            var data = this.view.segAlertsListing.data;
            var secIndex = b.sectionIndex; //this.view.segAlertsListing.selectedRowIndex[0];
            var selectedSecData = data[secIndex];
            if (this.alertPreference === "GROUP" || this.alertPreference === "CATEGORY") {
                if (selectedSecData[0].flxGroupCheckBox.text === "D") {
                    selectedSecData[0].flxGroupCheckBox.text = "C";
                    var boolValue = true;
                    if (this.view.lblSwitch.text === "m") {
                        boolValue = false;
                    } else {
                        boolValue = true;
                    }
                    selectedSecData[0].flxGroupCheckBox.accessibilityConfig = {
                        //"a11yLabel": kony.i18n.getLocalizedString("i18n.accountSettings.checked") + " " + selectedSecData[0].lblGroupName.text,
                        "a11yARIA": {
                            "aria-labelledby": "lblGroupName",
                            "role": "checkbox",
                            "aria-checked": true,
                            //"aria-disabled": boolValue,
                            "tabindex": 0
                        }
                    }
                    for (var x = 0; x < selectedSecData[1].length; x++) {
                        selectedSecData[1][x].flxAttributes.isVisible = true;
                        selectedSecData[1][x].flxAlertAttribute3.isVisible = (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) && selectedSecData[1][x].showToVal ? true : false;
                    }
                    if (this.alertPreference === "GROUP") selectedSecData[0] = this.setAlertChannelsToUI(selectedSecData[0].supportedChannels, selectedSecData[0].subscribedChannels, selectedSecData[0]);
                } else {
                    selectedSecData[0].flxGroupCheckBox.text = "D";
                    var boolValue = true;
                    if (this.view.lblSwitch.text === "m") {
                        boolValue = false;
                    } else {
                        boolValue = true;
                    }
                    selectedSecData[0].flxGroupCheckBox.accessibilityConfig = {
                        //"a11yLabel": kony.i18n.getLocalizedString("i18n.accountSettings.unchecked") + " " + selectedSecData[0].lblGroupName.text,
                        "a11yARIA": {
                            "aria-labelledby": "lblGroupName",
                            "role": "checkbox",
                            "aria-checked": false,
                            //"aria-disabled": boolValue,
                            "tabindex": 0
                        }
                    }
                    for (var x = 0; x < selectedSecData[1].length; x++) {
                        selectedSecData[1][x].flxAttributes.isVisible = false;
                        selectedSecData[1][x].flxAlertAttribute3.isVisible = false;
                    }
                    if (this.alertPreference === "GROUP") selectedSecData[0] = this.setAlertChannelsToUI(selectedSecData[0].supportedChannels, "", selectedSecData[0]);
                }
            } else {
                if (selectedSecData[0].flxGroupCheckBox.text === "D") {
                    selectedSecData[0].lblGroupAlertsCount.text = "(" + selectedSecData[1].length + "/" + selectedSecData[1].length + ")";
                    selectedSecData[0].lblGroupAlertsCount.isVisible = true;
                    selectedSecData[0].flxGroupCheckBox.text = "C";
                    var boolValue = true;
                    if (this.view.lblSwitch.text === "m") {
                        boolValue = false;
                    } else {
                        boolValue = true;
                    }
                    selectedSecData[0].flxGroupCheckBox.accessibilityConfig = {
                        //"a11yLabel": kony.i18n.getLocalizedString("i18n.accountSettings.checked") + " " + selectedSecData[0].lblGroupName.text,
                        "a11yARIA": {
                            "aria-labelledby": "lblGroupName",
                            "role": "checkbox",
                            "aria-checked": true,
                            //"aria-disabled": boolValue,
                            "tabindex": 0
                        }
                    }
                    for (var y = 0; y < selectedSecData[1].length; y++) {
                        selectedSecData[1][y].flxAlertCheckBox.text = "C";
                        selectedSecData[1][y].flxAlertCheckBox.accessibilityConfig = {
                            "a11yARIA": {
                                "role": "checkbox",
                                "aria-checked": "true",
                                "tabindex": 0,
                                "aria-labelledby": "lblAlertName"
                            }
                        }
                        selectedSecData[1][y].flxFrequencyFields.isVisible = selectedSecData[1][y].recordData.subscribedFrequency ? true : false;
                        selectedSecData[1][y].flxAmountAttribute.isVisible = selectedSecData[1][y].recordData.alertAttribute ? true : false;
                        selectedSecData[1][y].flxAlertAttribute3.isVisible = (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) && selectedSecData[1][y].showToVal ? true : false;
                        selectedSecData[1][y] = this.setAlertChannelsToUI(selectedSecData[1][y].supportedChannels, selectedSecData[1][y].subscribedChannels, selectedSecData[1][y]);
                    }
                } else {
                    selectedSecData[0].flxGroupCheckBox.text = "D";
                    var boolValue = true;
                    if (this.view.lblSwitch.text === "m") {
                        boolValue = false;
                    } else {
                        boolValue = true;
                    }
                    selectedSecData[0].flxGroupCheckBox.accessibilityConfig = {
                        //"a11yLabel": kony.i18n.getLocalizedString("i18n.accountSettings.unchecked") + " " + selectedSecData[0].lblGroupName.text,
                        "a11yARIA": {
                            "aria-labelledby": "lblGroupName",
                            "role": "checkbox",
                            "aria-checked": false,
                            //"aria-disabled":boolValue,
                            "tabindex": 0
                        }
                    }
                    selectedSecData[0].lblGroupAlertsCount.isVisible = false;
                    for (var y = 0; y < selectedSecData[1].length; y++) {
                        selectedSecData[1][y].flxAlertCheckBox.text = "D";
                        selectedSecData[1][y].flxAlertCheckBox.accessibilityConfig = {
                            "a11yARIA": {
                                "role": "checkbox",
                                "aria-checked": "false",
                                "tabindex": 0,
                                "aria-labelledby": "lblAlertName"
                            }
                        }
                        selectedSecData[1][y].flxFrequencyFields.isVisible = false;
                        selectedSecData[1][y].flxAmountAttribute.isVisible = false;
                        selectedSecData[1][y].flxAlertAttribute3.isVisible = false;
                        selectedSecData[1][y] = this.setAlertChannelsToUI(selectedSecData[1][y].supportedChannels, "", selectedSecData[1][y]);
                    }
                }
            }
            data[secIndex] = selectedSecData;
            this.view.segAlertsListing.setData(data);
            this.view.flxAlertsBody.forceLayout();
            //  this.AdjustScreen();
            this.toggleChannelClick();
            this.view.forceLayout();
            this.view.segAlertsListing.setActive(b.rowIndex, b.sectionIndex, "flxGroupAlertsHeaderDW.flxGroupAlertsContainer.flxGroup.flxGroupCheckBox");
        },
        /**
         *Method is used to call enable/disable the segment based on switch selection
         **/
        ToggleSwitchAlerts: function() {
            var scopeObj = this;
            if (this.view.flxAlertsSegment.isVisible) {
                if (this.view.lblSwitch.text === "m") {
                    this.enableAlertsSegment(true);
                } else {
                    this.enableAlertsSegment(false);
                }
                this.view.forceLayout();
            }
            var isEnabled = this.view.lblSwitch.text === "m" ? true : false;
            if (this.alertPreference === "CATEGORY") {
                this.view.flxChannelsFrequency.setEnabled(isEnabled);
            }
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile', 'flxRight']);
            this.view.profileMenu.flxSeperator.height = this.view.flxRight.info.frame.height;
            this.view.flxLeft.height = this.view.flxRight.info.frame.height;
        },
        /**
         *Method is used to set frequency data based on frequency type selection at CATEGORY level
         **/
        displayBasedOnSelectedFrequency: function() {
            var preference = this.alertPreference;
            this.view.flxFrequency2.setVisibility(true);
            this.view.flxFrequency2Tab.setVisibility(true);
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                if (this.view.lstBoxFrequency1Tab.selectedKey === "WEEKLY") this.view.lstBoxFrequency2Tab.masterData = this.frequencyList.weeks;
                else if (this.view.lstBoxFrequency1Tab.selectedKey === "MONTHLY") this.view.lstBoxFrequency2Tab.masterData = this.frequencyList.dates;
                else this.view.flxFrequency2Tab.setVisibility(false);
                this.view.lstBoxFrequency2Tab.selectedKey = "SELECT";
                this.view.lstBoxFrequency3Tab.selectedKey = "SELECT";
            } else {
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    if (this.view.lstBoxFrequency1.selectedKey === "WEEKLY" || this.view.lstBoxFrequency1.selectedKey === "MONTHLY") {
                        this.view.flxFrequency2.left = "2%";
                        this.view.flxFrequency3.left = "66%";
                    } else {
                        this.view.flxFrequency3.left = "2%";
                    }
                }
                if (this.view.lstBoxFrequency1.selectedKey === "WEEKLY") this.view.lstBoxFrequency2.masterData = this.frequencyList.weeks;
                else if (this.view.lstBoxFrequency1.selectedKey === "MONTHLY") this.view.lstBoxFrequency2.masterData = this.frequencyList.dates;
                else this.view.flxFrequency2.setVisibility(false);
                this.view.lstBoxFrequency2.selectedKey = "SELECT";
                this.view.lstBoxFrequency3.selectedKey = "SELECT";
            }
        },
        /**
         *Method is used to set frequency data based on frequency type selection at ALERT&GROUP levels
         **/
        onFrequencySelection: function(args, opt) {
            var self = this;
            var secIndex = 0;
            var rowIndex = args.rowIndex;
            var data = this.view.segAlertsListing.data;
            var selectedRowData = [];
            secIndex = args.sectionIndex;
            if (this.alertPreference === "GROUP") {
                selectedRowData = data[secIndex][0];
            } else {
                selectedRowData = data[secIndex][1][rowIndex];
            }
            if (opt === 1) {
                selectedRowData.flxFrequencyBox2.isVisible = true;
                selectedRowData.flxFrequencyBox1.width = ((kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) || (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)) ? "100%" : "28%";
                selectedRowData.flxFrequencyBox3.top = ((kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) || (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)) ? "50dp" : "0dp";
                if (selectedRowData.lstBoxFrequency1.selectedKey === "WEEKLY") selectedRowData.lstBoxFrequency2 = {
                    "accessibilityConfig":{
                        "a11yLabel": "Select day"
                    },
                    "masterData": this.frequencyList.weeks,
                    "selectedKey": "SELECT",
                    "onSelection": function() {
                        self.onFrequencySelection(arguments[1], 2)
                    },
                    "skin": "sknlbxalto42424215pxBordere3e3e32pxRadius"
                };
                else if (selectedRowData.lstBoxFrequency1.selectedKey === "MONTHLY") selectedRowData.lstBoxFrequency2 = {
                    "accessibilityConfig":{
                        "a11yLabel": "Select date"
                    },
                    "masterData": this.frequencyList.dates,
                    "selectedKey": "SELECT",
                    "onSelection": function() {
                        self.onFrequencySelection(arguments[1], 2)
                    },
                    "skin": "sknlbxalto42424215pxBordere3e3e32pxRadius"
                };
                else {
                    selectedRowData.flxFrequencyBox2.isVisible = false;
                    selectedRowData.flxFrequencyBox1.width = ((kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) || (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)) ? "49%" : "28%";
                    selectedRowData.flxFrequencyBox3.top = "0dp";
                }
                selectedRowData.lstBoxFrequency3.selectedKey = "SELECT";
            } else if (opt === 2) {
                selectedRowData.lstBoxFrequency2.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
                selectedRowData.lstBoxFrequency3.selectedKey = "SELECT";
            } else {
                selectedRowData.lstBoxFrequency3.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
            }
            if (this.alertPreference === "GROUP") {
                data[secIndex][0] = selectedRowData;
                this.view.segAlertsListing.setData(data);
            } else {
                data[secIndex][1][rowIndex] = selectedRowData;
                this.view.segAlertsListing.setData(data);
            }
            this.view.forceLayout();
            this.view.segAlertsListing.setActive(args.rowIndex, args.sectionIndex, "flxGroupAlertsHeaderDW.flxGroupAlertsContainer.flxGroup.flxFrequencyFields.flxFrequency.flxFrequencyBox" + opt + ".lstBoxFrequency" + opt);
        },
        /**
         *Method is used to set edit page
         **/
        onEditAlertsClick: function() {
            this.view.flxAlertsBody.setEnabled(true);
            this.view.lblSwitch.setEnabled(true);
            this.view.flxChannelsFrequency.setEnabled(true);
            this.view.flxChannelsFrequencyTab.setEnabled(true);
            this.view.segAlertsListing.setEnabled(this.view.lblSwitch.text === "m" ? true : false);
            FormControllerUtility.showProgressBar(this.view);
            this.view.btnEditAlerts.setVisibility(false);
            this.view.flxAlertButtons.setVisibility(true);
            this.view.btnAlertSave.setVisibility(true);
            this.view.btnAlertCancel.setVisibility(true);
            this.view.flxAlertBtnSeperator.setVisibility(true);
            this.view.flxAlertsBody.forceLayout();
            this.view.flxEnableAlertsSwitch.setVisibility(true);
            this.view.flxAlertsStatus.setVisibility(false);
            this.enableAlertsSegment(this.view.lblSwitch.text === "m" ? true : false);
            //  this.AdjustScreen();
            FormControllerUtility.hideProgressBar(this.view);
            if (this.view.lblSwitch.text === "m") {
                this.view.flxAlertsSegment.setEnabled(true);
                this.view.segAlertsListing.setEnabled(true);
                this.view.flxEnableSwitch.accessibilityConfig = {
                    "a11yLabel": "Enable Alerts",
                    "a11yARIA": {
                        //"aria-disabled":true,
                        "tabindex": 0,
                        "role": "checkbox",
                        "aria-checked": true
                    }
                };
            } else {
                this.view.flxAlertsSegment.setEnabled(false);
                this.view.flxEnableSwitch.accessibilityConfig = {
                    "a11yLabel": "Enable Alerts",
                    "a11yARIA": {
                        //"aria-disabled":true,
                        "tabindex": 0,
                        "role": "checkbox",
                        "aria-checked": false
                    }
                };
            }
            this.ToggleSwitchAlerts();
            this.toggleChannelClick();
            this.view.flxAlertButtons.accessibilityConfig = {
                a11yHidden: false,
                a11yARIA: {
                    "aria-live": "off",
                    tabindex: -1
                }
            }
            this.view.flxEnableSwitch.setActive(true);
        },
        /**
         *onClickCancelAlerts- function that triggers on click of button Modify of  alerts
         *@param {Object} alertsViewModel - alerts payload
         */
        onClickCancelAlerts: function(alertsViewModel) {
            if (alertsViewModel.accountId === undefined) {
                FormControllerUtility.showProgressBar(this.view);
                var params = {
                    "AlertCategoryId": alertsViewModel.AlertCategoryId
                };
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.fetchAlertsDataById(params);
            } else {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.navigateToAccountAlerts("alertSettings2");
            }
            this.view.flxEnableSwitch.accessibilityConfig = {
                "a11yLabel": "Enable Alerts",
                "a11yARIA": {
                    //"aria-disabled":true,
                    "tabindex": 0,
                    "role": "checkbox",
                    "aria-checked": false
                }
            };
            if (this.view.lblSwitch.text === "m") {
                this.view.flxAlertsSegment.setEnabled(false);
            } else {
                this.view.flxAlertsSegment.setEnabled(true);
            }
            this.view.flxAlertButtons.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "aria-live": "off",
                    tabindex: -1
                }
            }
        },
        /**
         *AdjustScreen- function to adjust the footer
         */
        AdjustScreen: function() {
            this.view.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.customheadernew.info.frame.height + this.view.flxContainer.info.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - this.view.flxFooter.info.frame.height;
                if (diff > 0) this.view.flxFooter.top = mainheight + diff + "dp";
                else this.view.flxFooter.top = mainheight + "dp";
            } else {
                this.view.flxFooter.top = mainheight + "dp";
            }
            this.view.forceLayout();
            // this.initializeResponsiveViews();
        },
        /**
         *Method is used to enable/disable the checkboxes in segment
         * @param boolean (based on toggle switch selected index)
         **/
        enableAlertsSegment: function(isEnable) {
            var checkBoxskin = "sknBtnOLBFontIcons";
            this.view.segAlertsListing.setEnabled(true);
            if (!isEnable) {
                checkBoxskin = "btnsknDisabled";
                this.view.segAlertsListing.setEnabled(false);
            }
            var data = this.view.segAlertsListing.data;
            for (var i = 0; i < data.length; i++) {
                data[i][0].flxGroupCheckBox.skin = checkBoxskin;
                if (this.alertPreference === "ALERT") {
                    for (var j = 0; j < data[i][1].length; j++) {
                        data[i][1][j].flxAlertCheckBox.skin = checkBoxskin;
                    }
                }
            }
            this.view.segAlertsListing.setData(data);
            if (this.alertPreference === "CATEGORY") {
                this.view.flxChannelsFrequency.setEnabled(isEnable);
                this.view.flxChannelsFrequencyTab.setEnabled(isEnable);
            }
            this.view.forceLayout();
        },
        /**
         *Method is used to call updateAlerts by collecting payloads from respective preference based functions
         **/
        onAlertSaveClick: function(alertsViewModel) {
            // var data=this.view.segAlertsCategory.data;
            var requestPayload;
            if (this.alertPreference === "CATEGORY") requestPayload = this.generateCategoryAlertsPayload(alertsViewModel);
            if (this.isValidData(alertsViewModel)) {
                if (this.alertPreference === "GROUP") requestPayload = this.generateGroupAlertsPayload(alertsViewModel);
                else if (this.alertPreference === "ALERT") requestPayload = this.generateAlertLevelAlertsPayload(alertsViewModel);
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.updateAlerts(requestPayload, alertsViewModel);
            }
            if (this.view.lblSwitch.text === "m") {
                this.view.flxAlertsSegment.setEnabled(true);
                this.view.segAlertsListing.setEnabled(true);
                this.view.flxEnableSwitch.accessibilityConfig = {
                    "a11yLabel": "Enable Alerts",
                    "a11yARIA": {
                        //"aria-disabled":true,
                        "tabindex": 0,
                        "role": "checkbox",
                        "aria-checked": true
                    }
                };
            } else {
                this.view.flxAlertsSegment.setEnabled(false);
                this.view.flxEnableSwitch.accessibilityConfig = {
                    "a11yLabel": "Enable Alerts",
                    "a11yARIA": {
                        //"aria-disabled":true,
                        "tabindex": 0,
                        "role": "checkbox",
                        "aria-checked": false
                    }
                };
            }
        },
        /**
         *Method is used to generate update payload at CATEGORY level
         **/
        generateCategoryAlertsPayload: function(alertsModel) {
            if (alertsModel.accountId === undefined) {
                var payload = {
                    "alertCategoryId": alertsModel.AlertCategoryId,
                    "isSubscribed": this.view.lblSwitch.text === "m" ? true : false,
                    "alertSubscription": {
                        "preferenceLevel": this.alertPreference,
                        "chanls": [],
                        "groups": []
                    }
                }
            } else {
                var payload = {
                    "alertCategoryId": alertsModel.AlertCategoryId,
                    "accountId": alertsModel.accountId,
                    "isSubscribed": this.view.lblSwitch.text === "m" ? true : false,
                    "alertSubscription": {
                        "preferenceLevel": this.alertPreference,
                        "chanls": [],
                        "groups": []
                    }
                }
            }
            var alertsViewModel = alertsModel.alertsData;
            var groupsData = [];
            var groupJSON = {};
            var alertJSON = {};
            if (this.view.flxAlertsSegment.isVisible) {
                var data = this.view.segAlertsListing.data;
                for (var i = 0; i < data.length; i++) {
                    groupJSON = {};
                    groupJSON.typeID = data[i][0].alerttype_id;
                    groupJSON.isSub = data[i][0].flxGroupCheckBox.text !== "D" ? true : false;
                    groupJSON.alerts = [];
                    for (var j = 0; j < data[i][1].length; j++) {
                        alertJSON = {};
                        alertJSON.id = data[i][1][j].alertsubtype_id;
                        alertJSON.value1 = CommonUtilities.deFormatAmount(data[i][1][j].tbxAmount1.text);
                        alertJSON.value2 = (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? CommonUtilities.deFormatAmount(data[i][1][j].tbxAmount3.text) : CommonUtilities.deFormatAmount(data[i][1][j].tbxAmount2.text);
                        alertJSON.isSub = alertsViewModel.alertTypes[i].alertSubTypes[j].isSubscribed === "true" ? true : false;
                        groupJSON.alerts.push(alertJSON);
                    }
                    groupsData.push(groupJSON);
                }
            }
            payload.alertSubscription.groups = groupsData;
            var channelsData = [];
            var supChanls = alertsViewModel.alertCategory.supportedChannels.split(",");
            for (var x = 1; x <= supChanls.length; x++) {
                if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    channelsData.push({
                        "id": this.view["lblChannel" + x + "Tab"].info.id,
                        "isSub": this.view["lblChannel" + x + "Tab"].info.isSelected
                    });
                } else {
                    channelsData.push({
                        "id": this.view["lblChannel" + x].info.id,
                        "isSub": this.view["lblChannel" + x].info.isSelected
                    });
                }
            }
            payload.alertSubscription.chanls = channelsData;
            if (((kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) && this.view.flxCategoryFrequencyTab.isVisible)) {
                payload.alertSubscription.freq = {};
                payload.alertSubscription.freq.id = this.view.lstBoxFrequency1Tab.selectedKey;
                if (this.view.lstBoxFrequency1Tab.selectedKey !== "DAILY") payload.alertSubscription.freq.value = this.view.lstBoxFrequency2Tab.selectedKey;
                payload.alertSubscription.freq.time = applicationManager.getFormatUtilManager().getTwentyFourHourTimeString(this.view.lstBoxFrequency3Tab.selectedKey);
            } else if (this.view.flxCategoryFrequency.isVisible) {
                payload.alertSubscription.freq = {};
                payload.alertSubscription.freq.id = this.view.lstBoxFrequency1.selectedKey;
                if (this.view.lstBoxFrequency1.selectedKey !== "DAILY") payload.alertSubscription.freq.value = this.view.lstBoxFrequency2.selectedKey;
                payload.alertSubscription.freq.time = applicationManager.getFormatUtilManager().getTwentyFourHourTimeString(this.view.lstBoxFrequency3.selectedKey);
            }
            return payload;
        },
        /**
         *Method is used to call respective preference level validation functions
         **/
        isValidData: function(alertsModel) {
            var isValid = true;
            var data = this.view.segAlertsListing.data;
            if (this.view.lblSwitch.text === "m") {
                if (this.alertPreference === "CATEGORY") {
                    isValid = this.validateCategoryLevel(alertsModel.alertsData);
                } else if (this.alertPreference === "GROUP") {
                    isValid = this.validateGroupLevel(alertsModel.alertsData);
                } else {
                    isValid = this.validateAlertLevel(alertsModel.alertsData);
                }
            } else {
                this.view.flxChannels.skin = "sknFlxffffffNoShadowbodere3e3round3px";
            }
            return isValid;
        },
        /**
         *Method is used to validate entered data at CATEGORY level
         **/
        validateCategoryLevel: function(alertsModel) {
            var isValid = true;
            var supportedChans = 0;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.common.errorEditData");
            this.view.flxInvalidAmount.setVisibility(false);
            if (this.view.flxCategoryFrequencyTab.isVisible && kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                this.view.lstBoxFrequency2Tab.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
                this.view.lstBoxFrequency3Tab.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
                if (this.view.flxFrequency2Tab.isVisible && this.view.lstBoxFrequency2Tab.selectedKey === "SELECT") {
                    this.view.lstBoxFrequency2Tab.skin = "sknlbxff0000SSP15px";
                    this.view.flxInvalidAmount.setVisibility(true);
                    isValid = false;
                }
                if (this.view.lstBoxFrequency3Tab.selectedKey === "SELECT") {
                    this.view.flxInvalidAmount.setVisibility(true);
                    this.view.lstBoxFrequency3Tab.skin = "sknlbxff0000SSP15px";
                    isValid = false;
                }
            } else if (this.view.flxCategoryFrequency.isVisible) {
                this.view.lstBoxFrequency2.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
                this.view.lstBoxFrequency3.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
                if (this.view.flxFrequency2.isVisible && this.view.lstBoxFrequency2.selectedKey === "SELECT") {
                    this.view.lstBoxFrequency2.skin = "sknlbxff0000SSP15px";
                    this.view.flxInvalidAmount.setVisibility(true);
                    isValid = false;
                }
                if (this.view.lstBoxFrequency3.selectedKey === "SELECT") {
                    this.view.flxInvalidAmount.setVisibility(true);
                    this.view.lstBoxFrequency3.skin = "sknlbxff0000SSP15px";
                    isValid = false;
                }
            }
            var supChanls = alertsModel.alertCategory.supportedChannels.split(",");
            for (var i = 1; i <= supChanls.length; i++) {
                if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    if (this.view["lblChannel" + i + "Tab"].info.isSelected === true) supportedChans++;
                } else {
                    if (this.view["lblChannel" + i].info.isSelected === true) supportedChans++;
                }
            }
            if (supportedChans === 0) {
                isValid = false;
                this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.profile.editSecureAccessSettingsError");
                this.view.flxInvalidAmount.setVisibility(true);
                this.view.flxChannels.skin = "sknFlxFF0000Op100Radius3px";
            } else this.view.flxChannels.skin = "sknFlxffffffNoShadowbodere3e3round3px";
            if (this.view.flxAlertsSegment.isVisible) {
                var data = this.view.segAlertsListing.data;
                for (var x = 0; x < data.length; x++) {
                    for (var y = 0; y < data[x][1].length; y++) {
                        data[x][1][y].flxAmount1.skin = "sknBorder727272bgffffff";
                        data[x][1][y].flxAmount2.skin = "sknBorder727272bgffffff";
                        data[x][1][y].flxAmount3.skin = "sknBorder727272bgffffff";
                        if (data[x][1][y].flxAttributes.isVisible) {
                            var amount1 = Number(CommonUtilities.deFormatAmount(data[x][1][y].tbxAmount1.text));
                            if (isNaN(amount1) || amount1 <= 0) {
                                isValid = false;
                                this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.common.errorEditData");
                                this.view.flxInvalidAmount.setVisibility(true);
                                data[x][1][y].flxAmount1.skin = "sknFlxFF0000Op100Radius3px";
                            }
                            if (data[x][1][y].showToVal) {
                                var amount2 = Number(CommonUtilities.deFormatAmount(((kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? data[x][1][y].tbxAmount3.text : data[x][1][y].tbxAmount2.text)));
                                if (amount2 <= 0 || isNaN(amount2) || amount2 <= amount1) {
                                    isValid = false;
                                    this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.common.errorEditData");
                                    data[x][1][y].flxAmount2.skin = "sknFlxFF0000Op100Radius3px";
                                    data[x][1][y].flxAmount3.skin = "sknFlxFF0000Op100Radius3px";
                                    this.view.flxInvalidAmount.setVisibility(true);
                                }
                            }
                        }
                    }
                }
                this.view.segAlertsListing.setData(data);
            }
            this.view.flxAlertsBody.forceLayout();
            //   this.AdjustScreen();
            this.view.forceLayout();
            return isValid;
        },
        /**
         *Method is used to validate entered data at GROUP level
         **/
        validateGroupLevel: function(alertsModel) {
            var isValid = true;
            var supportedChans = 0;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.common.errorEditData");
            this.view.flxInvalidAmount.setVisibility(false);
            if (this.view.flxAlertsSegment.isVisible) {
                var data = this.view.segAlertsListing.data;
                for (var x = 0; x < data.length; x++) {
                    supportedChans = 0;
                    data[x][0].lstBoxFrequency2.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
                    data[x][0].lstBoxFrequency3.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
                    if (data[x][0].flxGroupCheckBox.text === "C") {
                        if (data[x][0].flxFrequencyFields.isVisible && data[x][0].flxFrequencyBox2.isVisible && data[x][0].lstBoxFrequency2.selectedKey === "SELECT") {
                            data[x][0].lstBoxFrequency2.skin = "sknlbxff0000SSP15px";
                            this.view.flxInvalidAmount.setVisibility(true);
                            isValid = false;
                        }
                        if (data[x][0].flxFrequencyFields.isVisible && data[x][0].lstBoxFrequency3.selectedKey === "SELECT") {
                            this.view.flxInvalidAmount.setVisibility(true);
                            data[x][0].lstBoxFrequency3.skin = "sknlbxff0000SSP15px";
                            isValid = false;
                        }
                        var supChanls = alertsModel.alertTypes[x].supportedChannels.split(",");
                        for (var i = 1; i <= supChanls.length; i++) {
                            if (data[x][0]["flxChannel" + i].info.isSelected === true) supportedChans++;
                        }
                        if (supportedChans === 0) {
                            isValid = false;
                            this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.profile.editSecureAccessSettingsError");
                            this.view.flxInvalidAmount.setVisibility(true);
                            data[x][0].flxChannels.skin = "sknFlxFF0000Op100Radius3px";
                        } else data[x][0].flxChannels.skin = "sknFlxffffffNoShadowbodere3e3round3px";
                        for (var y = 0; y < data[x][1].length; y++) {
                            data[x][1][y].flxAmount1.skin = "sknBorder727272bgffffff";
                            data[x][1][y].flxAmount2.skin = "sknBorder727272bgffffff";
                            data[x][1][y].flxAmount3.skin = "sknBorder727272bgffffff";
                            if (data[x][1][y].flxAttributes.isVisible) {
                                var amount1 = Number(CommonUtilities.deFormatAmount(data[x][1][y].tbxAmount1.text));
                                if (isNaN(amount1) || amount1 <= 0) {
                                    isValid = false;
                                    this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.common.errorEditData");
                                    this.view.flxInvalidAmount.setVisibility(true);
                                    data[x][1][y].flxAmount1.skin = "sknFlxFF0000Op100Radius3px";
                                }
                                if (data[x][1][y].showToVal) {
                                    var amount2 = Number(CommonUtilities.deFormatAmount(((kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? data[x][1][y].tbxAmount3.text : data[x][1][y].tbxAmount2.text)));
                                    if (amount2 <= 0 || isNaN(amount2) || amount2 <= amount1) {
                                        isValid = false;
                                        this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.common.errorEditData");
                                        data[x][1][y].flxAmount2.skin = "sknFlxFF0000Op100Radius3px";
                                        data[x][1][y].flxAmount3.skin = "sknFlxFF0000Op100Radius3px";
                                        this.view.flxInvalidAmount.setVisibility(true);
                                    }
                                }
                            }
                        }
                    }
                }
                this.view.segAlertsListing.setData(data);
            }
            this.view.flxAlertsBody.forceLayout();
            //   this.AdjustScreen();
            this.view.forceLayout();
            return isValid;
        },
        /**
         *Method is used to validate entered data at ALERT level
         **/
        validateAlertLevel: function(alertsModel) {
            var isValid = true;
            var supportedChans = 0;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.common.errorEditData");
            this.view.flxInvalidAmount.setVisibility(false);
            if (this.view.flxAlertsSegment.isVisible) {
                var data = this.view.segAlertsListing.data;
                for (var x = 0; x < data.length; x++) {
                    for (var y = 0; y < data[x][1].length; y++) {
                        supportedChans = 0;
                        if (data[x][1][y].flxAlertCheckBox.text === "C") {
                            data[x][1][y].lstBoxFrequency2.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
                            data[x][1][y].lstBoxFrequency3.skin = "sknlbxalto42424215pxBordere3e3e32pxRadius";
                            if (data[x][1][y].flxFrequencyFields.isVisible && data[x][1][y].flxFrequencyBox2.isVisible && data[x][1][y].lstBoxFrequency2.selectedKey === "SELECT") {
                                data[x][1][y].lstBoxFrequency2.skin = "sknlbxff0000SSP15px";
                                this.view.flxInvalidAmount.setVisibility(true);
                                isValid = false;
                            }
                            if (data[x][1][y].flxFrequencyFields.isVisible && data[x][1][y].lstBoxFrequency3.selectedKey === "SELECT") {
                                this.view.flxInvalidAmount.setVisibility(true);
                                data[x][1][y].lstBoxFrequency3.skin = "sknlbxff0000SSP15px";
                                isValid = false;
                            }
                            var supChanls = alertsModel.alertTypes[x].alertSubTypes[y].supportedChannels.split(",");
                            for (var i = 1; i <= supChanls.length; i++) {
                                if (data[x][1][y]["flxChannel" + i].info.isSelected === true) supportedChans++;
                            }
                            if (supportedChans === 0) {
                                isValid = false;
                                this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.profile.editSecureAccessSettingsError");
                                this.view.flxInvalidAmount.setVisibility(true);
                                data[x][1][y].flxChannels.skin = "sknFlxFF0000Op100Radius3px";
                            } else data[x][1][y].flxChannels.skin = "sknFlxffffffNoShadowbodere3e3round3px";
                            data[x][1][y].flxAmount1.skin = "sknBorder727272bgffffff";
                            data[x][1][y].flxAmount2.skin = "sknBorder727272bgffffff";
                            data[x][1][y].flxAmount3.skin = "sknBorder727272bgffffff";
                            if (data[x][1][y].flxAmountAttribute.isVisible) {
                                var amount1 = Number(CommonUtilities.deFormatAmount(data[x][1][y].tbxAmount1.text));
                                if (isNaN(amount1) || amount1 <= 0) {
                                    isValid = false;
                                    this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.common.errorEditData");
                                    this.view.flxInvalidAmount.setVisibility(true);
                                    data[x][1][y].flxAmount1.skin = "sknFlxFF0000Op100Radius3px";
                                }
                                if (data[x][1][y].showToVal) {
                                    var amount2 = Number(CommonUtilities.deFormatAmount(((kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? data[x][1][y].tbxAmount3.text : data[x][1][y].tbxAmount2.text)));
                                    if (amount2 <= 0 || isNaN(amount2) || amount2 <= amount1) {
                                        isValid = false;
                                        this.view.lblInvalidAmount.text = kony.i18n.getLocalizedString("i18n.common.errorEditData");
                                        data[x][1][y].flxAmount2.skin = "sknFlxFF0000Op100Radius3px";
                                        data[x][1][y].flxAmount3.skin = "sknFlxFF0000Op100Radius3px";
                                        this.view.flxInvalidAmount.setVisibility(true);
                                    }
                                }
                            }
                        }
                    }
                }
                this.view.segAlertsListing.setData(data);
            }
            this.view.flxAlertsBody.forceLayout();
            //   this.AdjustScreen();
            this.view.forceLayout();
            return isValid;
        },
        /**
         *Method is used to generate update payload at GROUP level
         **/
        generateGroupAlertsPayload: function(alertsModel) {
            if (alertsModel.accountId === undefined) {
                var payload = {
                    "alertCategoryId": alertsModel.AlertCategoryId,
                    "isSubscribed": this.view.lblSwitch.text === "m" ? true : false,
                    "alertSubscription": {
                        "preferenceLevel": this.alertPreference,
                        "chanls": [],
                        "groups": []
                    }
                }
            } else {
                var payload = {
                    "alertCategoryId": alertsModel.AlertCategoryId,
                    "accountId": alertsModel.accountId,
                    "isSubscribed": this.view.lblSwitch.text === "m" ? true : false,
                    "alertSubscription": {
                        "preferenceLevel": this.alertPreference,
                        "chanls": [],
                        "groups": []
                    }
                }
            }
            var alertsViewModel = alertsModel.alertsData;
            var groupsData = [];
            var groupJSON = {};
            var alertJSON = {};
            if (this.view.flxAlertsSegment.isVisible) {
                var data = this.view.segAlertsListing.data;
                for (var i = 0; i < data.length; i++) {
                    groupJSON = {};
                    groupJSON.typeID = data[i][0].alerttype_id;
                    groupJSON.isSub = data[i][0].flxGroupCheckBox.text !== "D" ? true : false;
                    groupJSON.alerts = [];
                    groupJSON.chanls = [];
                    groupJSON.freq = {};
                    var channelsData = [];
                    var supChanls = alertsViewModel.alertTypes[i].supportedChannels.split(",");
                    for (var x = 1; x <= supChanls.length; x++) {
                        channelsData.push({
                            "id": data[i][0]["flxChannel" + x].info.id,
                            "isSub": data[i][0]["flxChannel" + x].info.isSelected
                        });
                    }
                    groupJSON.chanls = channelsData;
                    if (data[i][0].flxFrequencyFields.isVisible) {
                        groupJSON.freq.id = data[i][0].lstBoxFrequency1.selectedKey;
                        if (data[i][0].lstBoxFrequency1.selectedKey !== "DAILY") groupJSON.freq.value = data[i][0].lstBoxFrequency2.selectedKey;
                        groupJSON.freq.time = applicationManager.getFormatUtilManager().getTwentyFourHourTimeString(data[i][0].lstBoxFrequency3.selectedKey);
                    }
                    for (var j = 0; j < data[i][1].length; j++) {
                        alertJSON = {};
                        alertJSON.id = data[i][1][j].alertsubtype_id;
                        alertJSON.value1 = CommonUtilities.deFormatAmount(data[i][1][j].tbxAmount1.text);
                        alertJSON.value2 = (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? CommonUtilities.deFormatAmount(data[i][1][j].tbxAmount3.text) : CommonUtilities.deFormatAmount(data[i][1][j].tbxAmount2.text);
                        alertJSON.isSub = alertsViewModel.alertTypes[i].alertSubTypes[j].isSubscribed === "true" ? true : false;
                        groupJSON.alerts.push(alertJSON);
                    }
                    groupsData.push(groupJSON);
                }
            }
            payload.alertSubscription.groups = groupsData;
            return payload;
        },
        /**
         *Method is used to generate update payload at ALERT level
         **/
        generateAlertLevelAlertsPayload: function(alertsModel) {
            if (alertsModel.accountId === undefined) {
                var payload = {
                    "alertCategoryId": alertsModel.AlertCategoryId,
                    "isSubscribed": this.view.lblSwitch.text === "m" ? true : false,
                    "alertSubscription": {
                        "preferenceLevel": this.alertPreference,
                        "chanls": [],
                        "groups": []
                    }
                }
            } else {
                var payload = {
                    "alertCategoryId": alertsModel.AlertCategoryId,
                    "accountId": alertsModel.accountId,
                    "isSubscribed": this.view.lblSwitch.text === "m" ? true : false,
                    "alertSubscription": {
                        "preferenceLevel": this.alertPreference,
                        "chanls": [],
                        "groups": []
                    }
                }
            }
            var alertsViewModel = alertsModel.alertsData;
            var groupsData = [];
            var groupJSON = {};
            var alertJSON = {};
            if (this.view.flxAlertsSegment.isVisible) {
                var data = this.view.segAlertsListing.data;
                for (var i = 0; i < data.length; i++) {
                    groupJSON = {};
                    groupJSON.typeID = data[i][0].alerttype_id;
                    groupJSON.isSub = data[i][0].flxGroupCheckBox.text !== "D" ? true : false;
                    groupJSON.alerts = [];
                    for (var j = 0; j < data[i][1].length; j++) {
                        alertJSON = {};
                        alertJSON.id = data[i][1][j].alertsubtype_id;
                        alertJSON.value1 = CommonUtilities.deFormatAmount(data[i][1][j].tbxAmount1.text);
                        alertJSON.value2 = (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? CommonUtilities.deFormatAmount(data[i][1][j].tbxAmount3.text) : CommonUtilities.deFormatAmount(data[i][1][j].tbxAmount2.text);
                        alertJSON.isSub = data[i][1][j].flxAlertCheckBox.text === "C" ? true : false;
                        alertJSON.chanls = [];
                        var channelsData = [];
                        var supChanls = alertsViewModel.alertTypes[i].alertSubTypes[j].supportedChannels.split(",");
                        for (var x = 1; x <= supChanls.length; x++) {
                            channelsData.push({
                                "id": data[i][1][j]["flxChannel" + x].info.id,
                                "isSub": data[i][1][j]["flxChannel" + x].info.isSelected
                            });
                        }
                        alertJSON.chanls = channelsData;
                        if (data[i][1][j].flxFrequencyFields.isVisible) {
                            alertJSON.freq = {};
                            alertJSON.freq.id = data[i][1][j].lstBoxFrequency1.selectedKey;
                            if (data[i][1][j].lstBoxFrequency1.selectedKey !== "DAILY") alertJSON.freq.value = data[i][1][j].lstBoxFrequency2.selectedKey;
                            alertJSON.freq.time = applicationManager.getFormatUtilManager().getTwentyFourHourTimeString(data[i][1][j].lstBoxFrequency3.selectedKey);
                        }
                        groupJSON.alerts.push(alertJSON);
                    }
                    groupsData.push(groupJSON);
                }
            }
            payload.alertSubscription.groups = groupsData;
            return payload;
        },
        /**
         *Method is used to enable/disable when isInitialLoad is true at ALERT&GROUP&CATEGORY levels
         **/
        initialAlertsToggle: function(alertsModel) {
            var alertsViewModel = alertsModel.alertsData;
            if (this.alertPreference === "CATEGORY") {
                this.setCategoryChannelsToUI(alertsViewModel.alertCategory.supportedChannels, alertsViewModel.alertCategory.supportedChannels, false);
            }
            for (var i = 0; i < alertsViewModel.alertTypes.length; i++) {
                alertsViewModel.alertTypes[i].isSubscribed = "true";
                if (this.alertPreference === "GROUP") alertsViewModel.alertTypes[i].subscribedChannels = alertsViewModel.alertTypes[i].supportedChannels;
                for (var j = 0; j < alertsViewModel.alertTypes[i].alertSubTypes.length; j++) {
                    alertsViewModel.alertTypes[i].alertSubTypes[j].isSubscribed = "true";
                    if (this.alertPreference === "ALERT") alertsViewModel.alertTypes[i].alertSubTypes[j].subscribedChannels = alertsViewModel.alertTypes[i].alertSubTypes[j].supportedChannels;
                }
            }
            if (this.alertPreference === "ALERT") this.setAlertLevelAlertsSegData(alertsViewModel.alertTypes, true);
            else if (this.alertPreference === "GROUP") this.setGroupLevelAlertsSegData(alertsViewModel.alertTypes, true);
            else if (this.alertPreference === "CATEGORY") this.setCategoryLevelAlertsSegData(alertsViewModel.alertTypes);
            this.view.flxAlertsBody.forceLayout();
            //  this.AdjustScreen();
            this.view.forceLayout();
        },
        clearCategoryLevelValidation: function() {
            this.view.flxInvalidAmount.setVisibility(false);
            this.view.flxChannels.skin = "sknFlxffffffNoShadowbodere3e3round3px";
        },
    };
  });