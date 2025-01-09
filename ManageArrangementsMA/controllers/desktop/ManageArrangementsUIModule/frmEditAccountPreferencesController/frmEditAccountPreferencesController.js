define(['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function (CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    var flexVisibility = false;
    return {
        primaryCustomerId: {},
        accountPrefScopeObj: null,
        accountNUmber: null,
        txtNickName :null,
        editData : null,
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
            if (viewModel.errorEditPrefferedAccounts) this.onPreferenceAccountEdit(null, viewModel.errorEditPrefferedAccounts, null);
            if (viewModel.onPreferenceAccountEdit) this.onPreferenceAccountEdit(viewModel.onPreferenceAccountEdit.context, viewModel.onPreferenceAccountEdit.errorScenario, viewModel.onPreferenceAccountEdit.scopeObj);
            if (viewModel.TnCcontent) {
                this.bindTnCData(viewModel.TnCcontent);
            }
            if (viewModel.showPrefferedView) { }
            if (viewModel.getPreferredAccountsList) this.showPreferredAccountsList(viewModel.getPreferredAccountsList);
            this.view.lblEditAccountsHeader.setActive(true);
        },
        init: function () {
            var self = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
            this.setFlowActions();
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
        },
        onBreakpointChange: function (width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.profileMenu.onBreakpointChangeComponent(width);
            orientationHandler.onOrientationChange(this.onBreakpointChange);
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.updateSettingAndPreferences"), accessibilityConfig);
            }
            this.setPreferenceAccountEditScreen();
            this.view.forceLayout();
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
        /**
            * Method to Enable a button
            * @param {String} button - ID of the button to be enabled
            */
        enableButton: function (button) {
            if (!CommonUtilities.isCSRMode() && button != undefined) {
                button.setEnabled(true);
                button.skin = "sknbtnSSPffffff15px0273e3bg";
                button.hoverSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
                button.focusSkin = "sknBtnHoverSSPFFFFFF15Px0273e3";
            }
        },
        preShow: function () {
            var self = this;
            this.view.flxRight.setVisibility(true);
            this.changeProgressBarState(true);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile', 'flxContainer']);
            this.view.lblCollapseMobile.text = "O";
            this.view.customheadernew.activateMenu("Settings", "Account Settings");
            this.view.profileMenu.checkLanguage();
            this.view.profileMenu.activateMenu("ACCOUNTSETTINGS", "Account Preferences");
            this.setSelectedValue("i18n.Accounts.ContextualActions.editAccount");
            this.view.onBreakpointChange = function () {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
            this.setAccessibility();
        },
        postShow: function () {
            var scopObj=this;
            applicationManager.getNavigationManager().applyUpdates(this);
            this.changeProgressBarState(false);
            this.view.forceLayout();
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.customheadernew.collapseAll();   
            this.view.lblEditAccountsHeader.setActive(true);         
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
        /**
        * *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
        *  Method to set the text in mobile breakpoint
        */
        setSelectedValue: function (text) {
           var self = this;
           CommonUtilities.setText(self.view.lblAccountSettingsMobile,  kony.i18n.getLocalizedString("i18n.ProfileManagement.AccountPreferences"), CommonUtilities.getaccessibilityConfig());
        },
        /**
        *  Method to set ui for the component in mobile breakpoint
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
		setPreferenceAccountEditScreen: function () {
			if (this.view.lblEnableEStatementsCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
				this.view.flxTCCheckBox.setVisibility(true);
				this.view.flxTCContentsCheckbox.setVisibility(true);
				this.view.flxEmailForReceiving.setVisibility(true);
				CommonUtilities.setText(this.view.lblTCContentsCheckbox, ViewConstants.FONT_ICONS.CHECBOX_SELECTED, CommonUtilities.getaccessibilityConfig());
				this.view.lblTCContentsCheckbox.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
				if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile || kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
					this.view.flxPleaseNoteTheFollowingPoints.height = "184dp";
					this.view.flxMain.height = "970dp";
				} else this.view.flxPleaseNoteTheFollowingPoints.height = "160dp";
			} else {
				this.view.flxTCCheckBox.setVisibility(false);
				this.view.flxTCContentsCheckbox.setVisibility(false);
				this.view.flxEmailForReceiving.setVisibility(false);
				CommonUtilities.setText(this.view.lblTCContentsCheckbox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, CommonUtilities.getaccessibilityConfig());
				this.view.lblTCContentsCheckbox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
				if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile || kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
					this.view.flxPleaseNoteTheFollowingPoints.height = "142dp";
					this.view.flxMain.height = "810dp";
				} else this.view.flxPleaseNoteTheFollowingPoints.height = "130dp";
			}
        },
        /**
        *  Method to set the Accessibility configurations
        */
        setAccessibility: function () {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.updateSettingAndPreferences"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblEnableEStatements, kony.i18n.getLocalizedString("i18n.accountSettings.enableEStatments"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnEditAccountsSave, kony.i18n.getLocalizedString("i18n.ProfileManagement.Save"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnEditAccountsCancel, kony.i18n.getLocalizedString("i18n.konybb.common.cancel"), accessibilityConfig);
            this.view.lblHeading.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
                "a11yLabel": this.view.lblEditAccountsHeader.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
            };
            this.view.lblCollapseMobile.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                 }
            };
            this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                 "a11yLabel": "Dropdown"
            };
            this.view.imgInfoTC.accessibilityConfig = {
                "a11yARIA":
                {
                    "tabindex": -1
                },
              "a11yHidden": true
            };
            this.view.tbxAccountNickNameValue.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": 0,
                    "aria-labelledby": "lblAccountNickNameKey",
                    "aria-autocomplete": "none"
                }
            };
            this.view.lblAccountNickNameKey.accessibilityConfig = {
                "a11yLabel": ""
            };
            this.view.lblFullNameKey.accessibilityConfig = {
                "a11yLabel": ""
            };
            this.view.lblAccountTypeKey.accessibilityConfig = {
                "a11yLabel": ""
            };
            this.view.lblAccountNumberKey.accessibilityConfig = {
                "a11yLabel": ""
            };
            this.view.lblFavoriteAccount.accessibilityConfig = {
                "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.FavAccount")
            };
            this.view.lblPleaseNoteTheFollowingPoints.accessibilityConfig = {
                "a11yLabel": ""
            };
            this.view.lblOnceEStatementsServiceisActivated.accessibilityConfig = {
                "a11yLabel": ""
            };
            this.view.btnTermsAndConditions.accessibilityConfig = {
                "a11yARIA": {
                      "role": "link",
                      },
                "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.TermsAndConditions")
            };
            /*this.view.lblEmailForReceive.accessibilityConfig = {
                "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.SendToThisEmailAddress")
            };*/
            this.view.imgInfoTC.accessibilityConfig = {
                "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditAccountPreferencesInfo"),
              	"a11yHidden": true
            };

        },
        /**
        *  Method to set the Form Flow Actions such as button onclick events
        */
        setFlowActions: function () {
            var scopeObj = this;
            /*this.view.tbxAccountNickNameValue.onTextChange = function(){
                //CommonUtilities.setText(scopeObj.view.tbxAccountNickNameValue,scopeObj.view.tbxAccountNickNameValue.text.trim() , CommonUtilities.getaccessibilityConfig());
                scopeObj.view.tbxAccountNickNameValue.accessibilityConfig ={
                    "a11yValue":scopeObj.view.tbxAccountNickNameValue.text.trim()
                }
            };*/
            this.view.flxTCContentsCheckbox.onClick = function () {
                if (scopeObj.view.lblTCContentsCheckbox.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                    CommonUtilities.setText(scopeObj.view.lblTCContentsCheckbox, ViewConstants.FONT_ICONS.CHECBOX_SELECTED, CommonUtilities.getaccessibilityConfig());
                    scopeObj.view.lblTCContentsCheckbox.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
                    scopeObj.enableButton(scopeObj.view.btnEditAccountsSave);
                    scopeObj.view.lblTCContentsCheckbox.accessibilityConfig = {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accountSettings.checked") + " " + kony.i18n.getLocalizedString("i18n.common.TnC"),
                      	"a11yHidden": true
                    };
                    scopeObj.view.flxTCContentsCheckbox.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked":true
                            },
                    };
                } else {
                    CommonUtilities.setText(scopeObj.view.lblTCContentsCheckbox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, CommonUtilities.getaccessibilityConfig());
                    scopeObj.view.lblTCContentsCheckbox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
                    scopeObj.disableButton(scopeObj.view.btnEditAccountsSave);
                    scopeObj.view.flxTCContentsCheckbox.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked":false
                            },
                    };
                    scopeObj.view.lblTCContentsCheckbox.accessibilityConfig = {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accountSettings.unchecked") + " " + kony.i18n.getLocalizedString("i18n.common.TnC"),
                      	"a11yHidden": true
                    };
                }
            };

        },

        /*********************Ankit Refactored***************************/
        /**
         * Method to set email got from backend
         * @param {Object} response - response of email JSON got from backend
         */
        setEmailsToLbx: function (response, scopeObj) {
            var data = [];
            var section = this.editContext.sectionIndex;
            var index = this.editContext.rowIndex; //this.view.segAccounts.selectedRowIndex[1];
            var accData = scopeObj.view.segAccounts.data[section][1][index];
            var list = [];
            if (accData.email !== null && accData.email !== " " && accData.email !== undefined) {
                list.push("assignedEmail");
                list.push(accData.email);
                data.push(list);
            } else {
                data.push(["email", "-"]);
            }
            for (var i = 0; i < response.length; i++) {
                list = [];
                if (accData.email !== response[i].Value) {
                    (response[i].id) ? list.push(response[i].id) : list.push("");
                    list.push(response[i].Value);
                    data.push(list);
                }
            }
            this.view.lbxEmailForReceiving.masterData = data;
            if (accData.email === null || accData.email === " " || accData.email === undefined) {
                this.view.lbxEmailForReceiving.selectedKey = "email";
            } else {
                this.view.lbxEmailForReceiving.selectedKey = "assignedEmail";
            }
        },
        /**
         * Method to enable/disable the button of terms and condition
         */
        showTermsAndConditions: function () {
            this.enableButton(this.view.btnSave);
            var currForm = this.view;
            currForm.flxTermsAndConditions.height = currForm.flxHeader.info.frame.height + currForm.flxContainer.info.frame.height + currForm.flxFooter.info.frame.height;
            this.view.flxDialogs.setVisibility(true);
            this.view.flxDialogs.isModalContainer = true;
            this.view.flxTermsAndConditions.isVisible = true;
            this.view.flxTermsAndConditions.accessibilityConfig= {
                "a11yARIA": {
                    "role": "dialog",
                }
            };
            this.view.lblTermsAndConditions.setFocus(true);
            if (CommonUtilities.isFontIconChecked(this.view.lblEnableEStatementsCheckBox) === true && CommonUtilities.isFontIconChecked(this.view.lblTCContentsCheckbox) === true) {
                if (CommonUtilities.isFontIconChecked(this.view.lblTCContentsCheckbox) === false) {
                    CommonUtilities.toggleFontCheckbox(this.view.lblTCContentsCheckbox);
                }
            } else {
                if (CommonUtilities.isFontIconChecked(this.view.lblTCContentsCheckbox) === true) {
                    CommonUtilities.toggleFontCheckbox(this.view.lblTCContentsCheckbox);
                }
            }
        },
        bindTnCData: function (TnCcontent) {
            if (TnCcontent.alreadySigned) {
                this.view.flxTCCheckBox.setVisibility(false);
            } else {
                this.view.flxTCCheckBox.setVisibility(true);
                this.view.flxTCContentsCheckbox.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.flxPleaseNoteTheFollowingPoints.height = "184dp";
                }
              	else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    this.view.flxPleaseNoteTheFollowingPoints.height = "192dp";
                }
              else {
                    this.view.flxPleaseNoteTheFollowingPoints.height = "170dp";
                }
                if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                    this.view.btnTermsAndConditions.onClick = function () {
                        window.open(TnCcontent.termsAndConditionsContent);
                    }
                } else {
                    this.view.btnTermsAndConditions.onClick = this.showTermsAndConditionPopUp;
                }
                this.view.flxClose.onClick = this.hideTermsAndConditionPopUp;
                this.setTnCDATASection(TnCcontent.termsAndConditionsContent);
            }
        },
        showTermsAndConditionPopUp: function () {
            var height = this.view.flxHeader.info.frame.height + this.view.flxContainer.info.frame.height + this.view.flxFooter.info.frame.height;
            this.view.flxTermsAndConditions.height = height + "dp";
            this.view.flxDialogs.setVisibility(true);
            this.view.flxDialogs.isModalContainer = true;
            this.view.flxTermsAndConditions.setVisibility(true);
          	this.view.flxTermsAndConditions.accessibilityConfig= {
                "a11yARIA": {
                    "role": "dialog",
                }
            };
          	this.view.lblTermsAndConditions.setActive(true);
            this.view.lblTCContentsCheckbox.accessibilityConfig = {
                "a11yLabel": this.view.lblTCContentsCheckbox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ?  kony.i18n.getLocalizedString("i18n.accountSettings.checked")+" "+kony.i18n.getLocalizedString("i18n.common.TnC") + data.AccountNumber :  kony.i18n.getLocalizedString("i18n.accountSettings.unchecked") + kony.i18n.getLocalizedString("i18n.common.TnC") +"for "+ this.accountNumber,
              	"a11yHidden": true
            };
            this.view.forceLayout();
        },
        hideTermsAndConditionPopUp: function () {
            this.view.flxDialogs.isModalContainer = false;
            this.view.flxDialogs.setVisibility(false);
            this.view.flxTermsAndConditions.setVisibility(false);
          	this.view.btnTermsAndConditions.setActive(true);
        },
        setTnCDATASection: function (content) {
            this.view.rtxTC.text = content;
            FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, content);

            /*     if (document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer")) {
                     document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer").innerHTML = content;
                 } else {
                     if (!document.getElementById("iframe_brwBodyTnC").newOnload) {
                         document.getElementById("iframe_brwBodyTnC").newOnload = document.getElementById("iframe_brwBodyTnC").onload;
                     }
                     document.getElementById("iframe_brwBodyTnC").onload = function() {
                         document.getElementById("iframe_brwBodyTnC").newOnload();
                         document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer").innerHTML = content;
                 }
                }*/
        },
        /**
         * Method to save details of account on click of save button
         */
        onSaveAccountDetails: function () {
            var self = this;
            var sectionIndex = this.editContext.sectionIndex;
            var index = this.editContext.rowIndex; //self.this.view.segAccounts.selectedRowIndex[1];
            var data = (this.accountPrefScopeObj).view.segAccounts.data[sectionIndex][1][index];
            if (self.view.tbxAccountNickNameValue.text === "" || self.view.tbxAccountNickNameValue.text === null) {
                data.nickName = data.lblAccountHolderValue;
            } else {
                data.nickName = self.view.tbxAccountNickNameValue.text;
            }
            if (data.external === true) {
                data = {
                    Account_id: data.accountIdPk,
                    NickName: data.nickName,
                    FavouriteStatus: self.view.lblFavoriteEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ? "true" : "false",
                    external: true,
                };
            } else {
                data = {
                    accountID: self.view.lblAccountNumberValue.text,
                    nickName: data.nickName,
                    favouriteStatus: self.view.lblFavoriteEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ? 1 : 0,
                    eStatementEnable: self.view.lblEnableEStatementsCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ? 1 : 0,
                    email: self.view.lblEnableEStatementsCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ? self.view.lbxEmailForReceiving.selectedKeyValue[1] : " ",
                };
            }
            FormControllerUtility.showProgressBar(self.view);
            this.editData = data;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "ManageArrangementsUIModule", "appName" : "ManageArrangementsMA"}).presentationController.savePreferredAccountsData(data);
        },
        /**
         * Method to prefill the data while editing prefered account
         * @param {boolean} errorScenario true/false
         */
        onPreferenceAccountEdit: function (context, errorScenario, scopeObj) {
            this.view.btnEditAccountsSave.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.Save");
            this.view.btnEditAccountsCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");

            var currBreakpoint = kony.application.getCurrentBreakpoint();
            this.accountPrefScopeObj = scopeObj;
            this.view.tbxAccountNickNameValue.maxTextLength = 16;
            if (errorScenario === true) {
                if (this.txtNickName !== this.editData.nickName){
                    this.editData.nickName = this.txtNickName;
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "ManageArrangementsUIModule",
                        "appName": "ManageArrangementsMA"
                    }).presentationController.savePreferredAccountsData(this.editData);
                }
                this.view.flxErrorEditAccounts.setVisibility(true);
                CommonUtilities.setText(this.view.lblErrorEditAccounts, kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"), CommonUtilities.getaccessibilityConfig());
            } else {
                this.editContext = context;
                CommonUtilities.setText(this.view.lblIAccept, kony.i18n.getLocalizedString("i18n.ProfileManagement.IAccept"), CommonUtilities.getaccessibilityConfig());
                this.view.flxErrorEditAccounts.setVisibility(false);

                var self = this;
                var section = context.sectionIndex; //this.view.segAccounts.selectedRowIndex[0]
                var index = context.rowIndex; //this.view.segAccounts.selectedRowIndex[1];
                var data = scopeObj.view.segAccounts.data[section][1][index];
                if (data.nickName === data.lblAccountHolderValue.text) {
                    this.view.tbxAccountNickNameValue.text = data.lblAccountHolderValue.text;
                    this.txtNickName = data.lblAccountHolderValue.text;
					//this.view.tbxAccountNickNameValue.text = "";
                } else {
                    this.view.tbxAccountNickNameValue.text = data.nickName;
                    this.txtNickName = data.nickName;
					//this.view.tbxAccountNickNameValue.text = data.lblAccountHolderValue.text;
                }
                if (data.lblAccountsTypeIcon["isVisible"]) {
                    this.view.lblAccountIcon.setVisibility(true);
                    this.view.lblAccountIcon.text = data.lblAccountsTypeIcon["text"];
                }
                this.accountNumber = data.lblAccountNumberValue.text;
                CommonUtilities.setText(this.view.lblFullNameValue, data.lblAccountHolderValue.text, CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(this.view.lblAccountTypeValue, data.lblAccountTypeValue.text, CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(this.view.lblAccountNumberValue, data.lblAccountNumberValue.text, CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(this.view.lblFavoriteEmailCheckBox, data.lblMarkAsFavouriteAccountCheckBoxIcon.text, CommonUtilities.getaccessibilityConfig());
                this.view.lblFavoriteEmailCheckBox.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
                this.view.lblFavoriteEmailCheckBox.accessibilityConfig = {
                    "a11yLabel": this.view.lblFavoriteEmailCheckBox.text=== ViewConstants.FONT_ICONS.CHECBOX_SELECTED?  kony.i18n.getLocalizedString("i18n.accountSettings.checked")+" " +kony.i18n.getLocalizedString("i18n.accountSettings.markAsFavorite"):  kony.i18n.getLocalizedString("i18n.accountSettings.unchecked")+" "+ kony.i18n.getLocalizedString("i18n.accountSettings.markAsFavorite"),
                  	"a11yHidden": true

                };
                //           this.view.lblFavoriteEmailCheckBox.onTouchEnd = function() {
                //               self.toggleFontCheckBox(self.this.view.lblFavoriteEmailCheckBox);
                //           };
                if (data.external === false) {
                    this.view.lblTCContentsCheckbox.setVisibility(true);
                    this.view.flxPleaseNoteTheFollowingPoints.setVisibility(true);
                    this.view.flxEnableEStatementsCheckBox.setVisibility(true);
                    this.view.btnTermsAndConditions.setVisibility(true);
                    CommonUtilities.setText(this.view.lblEnableEStatementsCheckBox, data.lblEstatementCheckBoxIcon.text, CommonUtilities.getaccessibilityConfig());
                    this.view.lblEnableEStatementsCheckBox.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
                    CommonUtilities.setText(this.view.lblTCContentsCheckbox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, CommonUtilities.getaccessibilityConfig());
                    this.view.lblTCContentsCheckbox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
                    this.view.btnTermsAndConditions.onClick = this.showTermsAndConditionPopUp;
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "ManageArrangementsUIModule", "appName" : "ManageArrangementsMA"}).presentationController.getUserEmail();
                    if (this.view.lblEnableEStatementsCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                        this.view.flxTCCheckBox.setVisibility(true);
                        this.view.flxTCContentsCheckbox.setVisibility(true);
                        CommonUtilities.setText(this.view.lblTCContentsCheckbox, ViewConstants.FONT_ICONS.CHECBOX_SELECTED, CommonUtilities.getaccessibilityConfig());
                        this.view.lblTCContentsCheckbox.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
                        if (currBreakpoint === 640 || orientationHandler.isMobile || currBreakpoint === 1024 || orientationHandler.isTablet) {
                          this.view.flxPleaseNoteTheFollowingPoints.height = "184dp";
                          this.view.flxMain.height = "970dp";
                        }
                        else
                        this.view.flxPleaseNoteTheFollowingPoints.height = "160dp";
                       
                    } else {
                        this.view.flxTCCheckBox.setVisibility(false);
                        this.view.flxTCContentsCheckbox.setVisibility(false);
                        CommonUtilities.setText(this.view.lblTCContentsCheckbox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, CommonUtilities.getaccessibilityConfig());
                        this.view.lblTCContentsCheckbox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
                        if (currBreakpoint === 640 || orientationHandler.isMobile || currBreakpoint === 1024 || orientationHandler.isTablet) {
                          this.view.flxPleaseNoteTheFollowingPoints.height = "142dp";
                          this.view.flxMain.height = "810dp";
                        }
                        else
                          this.view.flxPleaseNoteTheFollowingPoints.height = "130dp";
                    }
                } else {
                    this.view.flxEmailForReceiving.setVisibility(false);
                    this.view.flxTCCheckBox.setVisibility(false);
                    this.view.flxTCContentsCheckbox.setVisibility(false);
                    this.view.lblTCContentsCheckbox.setVisibility(false);
                    this.view.flxPleaseNoteTheFollowingPoints.setVisibility(false);
                    this.view.flxEnableEStatementsCheckBox.setVisibility(false);
                    this.view.btnTermsAndConditions.setVisibility(false);
                    if (currBreakpoint === 640 || orientationHandler.isMobile || currBreakpoint === 1024 || orientationHandler.isTablet) { 
						this.view.flxMain.height = "810dp";
					}
                }
                if (this.view.lblEnableEStatementsCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED && this.view.lblTCContentsCheckbox.text !== ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    this.disableButton(this.view.btnEditAccountsSave);
                    this.disableButton(this.view.btnSave);
                } else {
                    this.disableButton(this.view.btnEditAccountsSave);
                    this.view.flxTCCheckBox.setVisibility(true);
                    this.enableButton(this.view.btnSave);
                }
                this.view.lblEnableEStatementsCheckBox.accessibilityConfig = {
                    "a11yLabel": this.view.lblEnableEStatementsCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ?  kony.i18n.getLocalizedString("i18n.accountSettings.checked")+" "+kony.i18n.getLocalizedString("i18n.ProfileManagement.E-statementEnabled")  :  kony.i18n.getLocalizedString("i18n.accountSettings.unchecked") +" "+ kony.i18n.getLocalizedString("i18n.ProfileManagement.E-statementEnabled"),
                  	"a11yHidden": true
                };
                this.view.lblTCContentsCheckbox.accessibilityConfig = {
                    "a11yLabel": this.view.lblTCContentsCheckbox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ?  kony.i18n.getLocalizedString("i18n.accountSettings.checked")+" "+kony.i18n.getLocalizedString("i18n.common.TnC") :  kony.i18n.getLocalizedString("i18n.accountSettings.unchecked")+ " "+ kony.i18n.getLocalizedString("i18n.common.TnC"),
                  	"a11yHidden": true
                };
                this.view.tbxAccountNickNameValue.onKeyUp = function () {
                    var regex = new RegExp("^[a-zA-Z0-9 _.-]+$");
                    if (regex.test(self.view.tbxAccountNickNameValue.text)) {
                        if(data.nickName !==  self.view.tbxAccountNickNameValue.text){
							self.enableButton(self.view.btnEditAccountsSave);
						} else {
							self.disableButton(self.view.btnEditAccountsSave);
						}
                    } else {
                        self.disableButton(self.view.btnEditAccountsSave);
                    }
                }

                this.view.flximgEnableEStatementsCheckBox.onClick = function () {
                    self.toggleCheckBoxEditAccounts(self.view.lblEnableEStatementsCheckBox);
					//newly added code
					if (self.view.lblEnableEStatementsCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED && self.view.lblTCContentsCheckbox.text !== ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    self.disableButton(self.view.btnEditAccountsSave);
					self.view.flxTCCheckBox.setVisibility(true);
                    self.disableButton(self.view.btnSave);                    
                } else {
                    self.enableButton(self.view.btnEditAccountsSave);
                    //this.view.flxTCCheckBox.setVisibility(true);
                    self.enableButton(self.view.btnSave);                    
                }
                    self.view.lblEnableEStatementsCheckBox.accessibilityConfig = {
                        "a11yLabel": self.view.lblEnableEStatementsCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ?  kony.i18n.getLocalizedString("i18n.accountSettings.checked")+" "+kony.i18n.getLocalizedString("i18n.ProfileManagement.E-statementEnabled") :  kony.i18n.getLocalizedString("i18n.accountSettings.unchecked") +" "+ kony.i18n.getLocalizedString("i18n.ProfileManagement.E-statementEnabled"),
                      	"a11yHidden": true
                    };
                    self.view.lblTCContentsCheckbox.accessibilityConfig = {
                        "a11yLabel": self.view.lblTCContentsCheckbox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ?  kony.i18n.getLocalizedString("i18n.accountSettings.checked")+" "+kony.i18n.getLocalizedString("i18n.common.TnC") :  kony.i18n.getLocalizedString("i18n.accountSettings.unchecked") +" "+ kony.i18n.getLocalizedString("i18n.common.TnC"),
                      	"a11yHidden": true
                    };
                };
                this.view.btnEditAccountsCancel.onClick = function () {
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "ManageArrangementsUIModule", "appName" : "ManageArrangementsMA"}).presentationController.showPreferredAccounts();
                };
                var label=self.view.lblEnableEStatementsCheckBox.text;
				var sat=self.view.lblEnableEStatementsCheckBox.text;
                this.view.flxFavoriteEmailCheckBox.onClick = function () {
                    self.toggleFontCheckBox(self.view.lblFavoriteEmailCheckBox);
                    sat = (sat === ViewConstants.FONT_ICONS.CHECBOX_SELECTED)? ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED : ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
					if(label==sat){
                        self.disableButton(self.view.btnEditAccountsSave);
                      	self.view.flxFavoriteEmailCheckBox.accessibilityConfig = {
                            "a11yARIA": {
                                "role": "checkbox",
                                "aria-labelledby": "lblFavoriteAccount",
                                "aria-checked": false
                            },
                        };
					}
					else{
						self.enableButton(self.view.btnEditAccountsSave);
                      	self.view.flxFavoriteEmailCheckBox.accessibilityConfig = {
                            "a11yARIA": {
                                "role": "checkbox",
                                "aria-labelledby": "lblFavoriteAccount",
                                "aria-checked": true
                            },
                        };
					}
                    self.view.lblFavoriteEmailCheckBox.accessibilityConfig = {
                        "a11yLabel": self.view.lblFavoriteEmailCheckBox.text=== ViewConstants.FONT_ICONS.CHECBOX_SELECTED?  kony.i18n.getLocalizedString("i18n.accountSettings.checked")+" " +kony.i18n.getLocalizedString("i18n.accountSettings.markAsFavorite") :  kony.i18n.getLocalizedString("i18n.accountSettings.unchecked")+" "+ kony.i18n.getLocalizedString("i18n.accountSettings.markAsFavorite"),
                      	"a11yHidden": true
    
                    };
                };
                if (CommonUtilities.isCSRMode()) {
                    this.view.btnEditAccountsSave.onClick = CommonUtilities.disableButtonActionForCSRMode();
                    this.view.btnEditAccountsSave.skin = CommonUtilities.disableButtonSkinForCSRMode();
                    this.view.btnEditAccountsSave.focus = CommonUtilities.disableButtonSkinForCSRMode();
                } else {
                    this.view.btnEditAccountsSave.onClick = this.onSaveAccountDetails;
                }

                if (applicationManager.getConfigurationManager().editNickNameAccountSettings === "true") {
                    this.view.flxAccountNickName.setVisibility(true);
                } else {
                    this.view.flxAccountNickName.setVisibility(false);
                }
                if (data.email && this.view.lblEnableEStatementsCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    var response = applicationManager.getUserPreferencesManager().getEntitlementEmailIds();
                    this.setEmailsToLbx(response, scopeObj);
                    this.view.flxEmailForReceiving.setVisibility(true);
                    this.view.lbxEmailForReceiving.setVisibility(true);
                } else {
                    this.view.flxEmailForReceiving.setVisibility(false);
                }
                FormControllerUtility.hideProgressBar(this.view);
                //  this.AdjustScreen();
            }
        },
        /**
         * Method to move a particular account upwards
         */
        onBtnMoveUp: function () {
            var section = this.view.segAccounts.selectedRowIndex[0]
            var index = this.view.segAccounts.selectedRowIndex[1];
            var segData = this.view.segAccounts.data[section][1];
            var updatedAccounts = [{
                accountNumber: segData[index].lblAccountNumberValue.text,
                accountPreference: segData[index - 1].accountPreference.toString(),
            }, {
                accountNumber: segData[index - 1].lblAccountNumberValue.text,
                accountPreference: segData[index].accountPreference.toString(),
            }]
            FormControllerUtility.showProgressBar(this.view);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "ManageArrangementsUIModule", "appName" : "ManageArrangementsMA"}).presentationController.setAccountsPreference(updatedAccounts);
        },
        /**
         * Method to move a particular account downwards
         */
        onBtnMoveDown: function () {
            var section = this.view.segAccounts.selectedRowIndex[0]
            var index = this.view.segAccounts.selectedRowIndex[1];
            var segData = this.view.segAccounts.data[section][1];
            var updatedAccounts = [{
                accountNumber: segData[index].lblAccountNumberValue.text,
                accountPreference: segData[index + 1].accountPreference.toString(),
            }, {
                accountNumber: segData[index + 1].lblAccountNumberValue.text,
                accountPreference: segData[index].accountPreference.toString(),
            }]
            FormControllerUtility.showProgressBar(this.view);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "ManageArrangementsUIModule", "appName" : "ManageArrangementsMA"}).presentationController.setAccountsPreference(updatedAccounts);
        },
        setDataForEmailListBox: function (response) {
            var data = [];
            var list = [];
            var i;
            for (i = 0; i < response.length; i++) {
                list = [];
                if (response[i].isPrimary === "true") {
                    list.push("primaryemail");
                    list.push(response[i].Value);
                    data.push(list);
                }
            }
            for (i = 0; i < response.length; i++) {
                list = [];
                if (data[0][1] !== response[i].Value) {
                    (response[i].id) ? list.push(response[i].id) : list.push("");
                    list.push(response[i].Value);
                    data.push(list);
                }
            }
            this.view.lbxEmailForReceiving.masterData = data;
            this.view.lbxEmailForReceiving.selectedKey = "primaryemail";
        },
        /**
            * Method to assign images when checkbox is clicked
            * @param {String} imgCheckBox- ID of the checkbox
            */
        toggleCheckBox: function (imgCheckBox) {
            if (imgCheckBox.src === ViewConstants.IMAGES.UNCHECKED_IMAGE) {
                imgCheckBox.src = ViewConstants.IMAGES.CHECKED_IMAGE;
            } else {
                imgCheckBox.src = ViewConstants.IMAGES.UNCHECKED_IMAGE;
            }
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
        /**
           * Method to assign images when checkbox is clicked in accounts
           * @param {String} imgCheckBox- ID of the checkbox
           */
        toggleCheckBoxEditAccounts: function (imgCheckBox) {
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            this.toggleFontCheckBox(imgCheckBox);
            if (CommonUtilities.isFontIconChecked(imgCheckBox) === true) {
                this.view.flxTCCheckBox.setVisibility(true);
                this.view.flxEmailForReceiving.setVisibility(true);
                this.view.flxTCContentsCheckbox.setVisibility(true);
                if (currBreakpoint === 640 || orientationHandler.isMobile || currBreakpoint === 1024 || orientationHandler.isTablet) {
                    this.view.flxPleaseNoteTheFollowingPoints.height = "184dp";
					this.view.flxMain.height = "970dp";
                }
                else
                    this.view.flxPleaseNoteTheFollowingPoints.height = "160dp";
                var emailObj = applicationManager.getUserPreferencesManager().getEntitlementEmailIds();
                this.setDataForEmailListBox(emailObj);
                this.view.lbxEmailForReceiving.setVisibility(true);
              	this.view.flximgEnableEStatementsCheckBox.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-labelledby": "lblEnableEStatements",
                        "aria-checked": true
                    },
                };
            } else {
                this.view.flxTCCheckBox.setVisibility(false);
                this.view.flxTCContentsCheckbox.setVisibility(false);
                this.view.lbxEmailForReceiving.setVisibility(false);
                this.view.flxEmailForReceiving.setVisibility(false);
                if (currBreakpoint === 640 || orientationHandler.isMobile || currBreakpoint === 1024 || orientationHandler.isTablet) {
                    this.view.flxPleaseNoteTheFollowingPoints.height = "142dp";
                    this.view.flxMain.height = "810dp";
                }
                else
                    this.view.flxPleaseNoteTheFollowingPoints.height = "120dp";
                if (CommonUtilities.isFontIconChecked(this.view.lblTCContentsCheckbox) === true) {
                    CommonUtilities.toggleFontCheckbox(this.view.lblTCContentsCheckbox);
                }
              this.view.flximgEnableEStatementsCheckBox.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-labelledby": "lblEnableEStatements",
                        "aria-checked": false
                    },
                };
            }if ((CommonUtilities.isFontIconChecked(imgCheckBox) === true) && (this.view.lblTCContentsCheckbox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED)){
              this.enableButton(this.view.btnEditAccountsSave);}
           else {
			  this.disableButton(this.view.btnEditAccountsSave);}
        },
        accountTypeConfig: (function () {
            var accountTypeConfig = {};
            var ApplicationManager = require('ApplicationManager');
            applicationManager = ApplicationManager.getApplicationManager();
            accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING)] = {
                sideImage: ViewConstants.IMAGES.SIDEBAR_TURQUOISE,
                skin: ViewConstants.SKINS.SAVINGS_SIDE_BAR,
                image: ViewConstants.IMAGES.ACCOUNT_CHANGE_TURQUOISE
            };
            accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING)] = {
                sideImage: ViewConstants.IMAGES.SIDEBAR_PURPLE,
                skin: ViewConstants.SKINS.CHECKINGS_SIDE_BAR,
                image: ViewConstants.IMAGES.ACCOUNT_CHANGE_PURPLE
            };
            accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD)] = {
                sideImage: ViewConstants.IMAGES.SIDEBAR_YELLOW,
                skin: ViewConstants.SKINS.CREDIT_CARD_SIDE_BAR,
                image: ViewConstants.IMAGES.ACCOUNT_CHANGE_YELLOW
            };
            accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT)] = {
                sideImage: ViewConstants.IMAGES.SIDEBAR_BLUE,
                skin: ViewConstants.SKINS.DEPOSIT_SIDE_BAR,
                image: ViewConstants.IMAGES.ACCOUNT_CHANGE_TURQUOISE
            };
            accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE)] = {
                sideImage: ViewConstants.IMAGES.SIDEBAR_BROWN,
                skin: ViewConstants.SKINS.MORTGAGE_CARD_SIDE_BAR,
                image: ViewConstants.IMAGES.ACCOUNT_CHANGE_YELLOW
            };
            accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN)] = {
                sideImage: ViewConstants.IMAGES.SIDEBAR_BROWN,
                skin: ViewConstants.SKINS.MORTGAGE_CARD_SIDE_BAR,
                image: ViewConstants.IMAGES.ACCOUNT_CHANGE_YELLOW
            };
            accountTypeConfig['Default'] = {
                sideImage: ViewConstants.IMAGES.SIDEBAR_TURQUOISE,
                skin: ViewConstants.SKINS.SAVINGS_SIDE_BAR,
                image: ViewConstants.IMAGES.ACCOUNT_CHANGE_TURQUOISE
            }
            return accountTypeConfig;
        })(),
        /**
            * Method to get configurations for accounts
            * @param {string} accountType account type
            * @returns
            */
        getConfigFor: function (accountType) {
            if (this.accountTypeConfig[accountType]) {
                return this.accountTypeConfig[accountType];
            } else {
                return this.accountTypeConfig.Default;
            }
        },
        /**
           * Method to generate accounts viewmodel for account preferences
           * @param {JSON} accountsData Data related to account
           * @returns JSON accounts data
           */
        generateViewModelAccounts: function (accountsData) {
            accountsData = JSON.parse(JSON.stringify(accountsData));
            var getAccountHolder = function (accHolder) {
                try {
                    var nameObj = JSON.parse(accHolder);
                    return nameObj.fullname;
                } catch (exception) {
                    return accHolder;
                }
            }
            if (accountsData.isExternalAccount) {
                return {
                    "accountIdPK": accountsData.accountID,
                    "flxIdentifier": this.getConfigFor(accountsData.accountType).skin,
                    "AccountName": accountsData.AccountName,
                    "AccountHolder": accountsData.accountHolder,
                    "AccountNumber": accountsData.accountID,
                    "AccountType": accountsData.accountType,
                    "imgFavoriteCheckBox": (String(accountsData.favouriteStatus) !== "0") ? ViewConstants.IMAGES.CHECKED_IMAGE : ViewConstants.IMAGES.UNCHECKED_IMAGE,
                    "imgMenu": this.getConfigFor(accountsData.accountType).image,
                    "imgEStatementCheckBox": ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                    "fullName": "",
                    "nickName": accountsData.nickName,
                    "accountPreference": Number.MAX_SAFE_INTEGER,
                    "email": "",
                    "external": true
                }
            } else {
                return {
                    "flxIdentifier": this.getConfigFor(accountsData.accountType).skin,
                    "AccountName": accountsData.accountName,
                    "AccountHolder": getAccountHolder(accountsData.accountHolder),
                    "AccountNumber": accountsData.accountID,
                    "AccountType": accountsData.accountType,
                    "imgFavoriteCheckBox": accountsData.favouriteStatus == "1" ? ViewConstants.IMAGES.CHECKED_IMAGE : ViewConstants.IMAGES.UNCHECKED_IMAGE,
                    "imgEStatementCheckBox": (accountsData.eStatementEnable == "true" || accountsData.eStatementEnable == "1") ? ViewConstants.IMAGES.CHECKED_IMAGE : ViewConstants.IMAGES.UNCHECKED_IMAGE,
                    "imgMenu": this.getConfigFor(accountsData.accountType).image,
                    "fullName": accountsData.firstName + " " + accountsData.lastName,
                    "nickName": accountsData.nickName,
                    "accountPreference": Number(accountsData.accountPreference),
                    "email": accountsData.email,
                    "external": false,
                    "displayName": accountsData.displayName,
                    "isBusinessAccount": (accountsData.isBusinessAccount === "true"),
                    "MembershipName": accountsData.MembershipName,
                    "Membership_id": accountsData.Membership_id,
                }
            }
        },



        /**
            * Method to show accounts preffered list
            * @param {Collection} viewModel Array od accounts jsons
            */
        showPreferredAccountsList: function (viewModel) {
            this.view.profileMenu.activateMenu("ACCOUNTSETTINGS", "Account Preferences");

            var scopeObj = this;
            // this.accountDataStore = cloneJS ON(viewModel);
            //  this.view.customheader.customhamburger.activateMenu("Settings", "Account Settings");
            /*    this.view.tbxAccountNickNameValue.onKeyUp = function() {
                    var regex = new RegExp("^[a-zA-Z0-9 _.-]*$");
                    if (regex.test(scopeObj.view.tbxAccountNickNameValue.text)) {
                        scopeObj.enableButton(scopeObj.view.btnEditAccountsSave);
                    } else {
                        scopeObj.disableButton(scopeObj.view.btnEditAccountsSave);
                    }
                    if (scopeObj.view.tbxAccountNickNameValue.text.trim() == "") {
                        scopeObj.disableButton(scopeObj.view.btnEditAccountsSave);
                    }
                };
                this.showAccounts();
                this.collapseAll();
                this.expandWithoutAnimation(this.view.flxAccountSettingsSubMenu);
                this.view.lblAccountSettingsCollapse.text = ViewConstants.FONT_ICONS.CHEVRON_UP;*/
            if (viewModel.errorCase === true) {
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.segAccounts.setVisibility(false);
                FormControllerUtility.hideProgressBar(this.view);
            } else {
                //   this.view.flxDowntimeWarning.setVisibility(false);
                this.setAccountsSegmentData(viewModel.map(this.generateViewModelAccounts));
                //   this.setSelectedSkin("flxAccountPreferences");
                this.view.segAccounts.setVisibility(true);
            }
        },
        /**
         * Method to map accounts data to segment
         * Array od accounts jsons
         * @param {*} viewModel
         */
        setAccountsSegmentData: function (viewModel) {
            var self = this;
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            var isBusinessUser = applicationManager.getConfigurationManager().getConfigurationValue('isSMEUser') === "true";
            var dataMap = {
                "btnEdit": "btnEdit",
                "flxAccountHolder": "flxAccountHolder",
                "flxContent": "flxContent",
                "flxAccountHolderKey": "flxAccountHolderKey",
                "flxAccountHolderValue": "flxAccountHolderValue",
                "flxAccountListItemWrapper": "flxAccountListItemWrapper",
                "flxAccountName": "flxAccountName",
                "flxAccountNumber": "flxAccountNumber",
                "flxAccountNumberKey": "flxAccountNumberKey",
                "flxAccountNumberValue": "flxAccountNumberValue",
                "flxAccountRow": "flxAccountRow",
                "flxAccountType": "flxAccountType",
                "flxAccountTypeKey": "flxAccountTypeKey",
                "flxAccountTypeValue": "flxAccountTypeValue",
                "flxEStatement": "flxEStatement",
                "flxEStatementCheckBox": "flxEStatementCheckBox",
                "flxFavoriteCheckBox": "flxFavoriteCheckBox",
                "flxLeft": "flxLeft",
                "flxMarkAsFavorite": "flxMarkAsFavorite",
                //"flxMenu": "flxMenu",
                "flxRight": "flxRight",
                "imgEStatementCheckBox": "imgEStatementCheckBox",
                "imgFavoriteCheckBox": "imgFavoriteCheckBox",
                "flxIdentifier": "flxIdentifier",
                "imgMenu": "imgMenu",
                "lblAccountHolderColon": "lblAccountHolderColon",
                "lblAccountHolderKey": "lblAccountHolderKey",
                "lblAccountHolderValue": "lblAccountHolderValue",
                "lblAccountName": "lblAccountName",
                "lblAccountNumberColon": "lblAccountNumberColon",
                "lblAccountNumberKey": "lblAccountNumberKey",
                "lblAccountNumberValue": "lblAccountNumberValue",
                "lblAccountTypeColon": "lblAccountTypeColon",
                "lblAccountTypeKey": "lblAccountTypeKey",
                "lblAccountTypeValue": "lblAccountTypeValue",
                "lblEStatement": "lblEStatement",
                "lblMarkAsFavorite": "lblMarkAsFavorite",
                "lblSepeartorlast": "lblSepeartorlast",
                "lblSeperator": "lblSeperator",
                "lblSeperator2": "lblSeperator2",
                "lblseperator3": "lblseperator3",
                "lblsepeartorfirst": "lblsepeartorfirst",
                "flxMoveUp": "flxMoveUp",
                "flxMoveDown": "flxMoveDown",
                "imgMoveUp": "imgMoveUp",
                "lblMove": "lblMove",
                "imgMoveDown": "imgMoveDown",
                "lblMarkAsFavouriteAccountCheckBoxIcon": "lblMarkAsFavouriteAccountCheckBoxIcon",
                "lblEstatementCheckBoxIcon": "lblEstatementCheckBoxIcon",
                "lblMoveUpIcon": "lblMoveUpIcon",
                "lblMoveDownIcon": "lblMoveDownIcon",
                "btn": "btn",
                "template": "template",
                "lblTransactionHeader": "lblTransactionHeader",
                "lblAccountsTypeIcon": "lblAccountsTypeIcon"
            };
            var mapViewModel = function (data, index, viewModel) {
                var dataObject = {
                    "btn": {
                        text: ""
                    },
                    "accountPreference": data.accountPreference,
                    "accountIdPk": (data.external) ? data.accountIdPK : "",
                    "external": data.external,
                    "fullName": data.fullName,
                    "nickName": data.nickName,
                    "flxIdentifier": {
                        "skin": data.flxIdentifier
                    },
                    "lblTransactionHeader": {
                        "text": data.AccountType,
                        "accessibilityconfig": {
                            "a11yLabel": data.AccountType,
                        },
                    },
                    "lblMarkAsFavouriteAccountCheckBoxIcon": {
                        text: data.imgFavoriteCheckBox === ViewConstants.IMAGES.CHECKED_IMAGE ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                        "accessibilityconfig": {
                            "a11yLabel": data.imgFavoriteCheckBox === ViewConstants.IMAGES.CHECKED_IMAGE ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                        }
                    },
                    "lblEstatementCheckBoxIcon": (data.external) ? {
                        isVisible: false
                    } : {
                            text: data.imgEStatementCheckBox === ViewConstants.IMAGES.CHECKED_IMAGE ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                            "accessibilityconfig": {
                                "a11yLabel": data.imgEStatementCheckBox === ViewConstants.IMAGES.CHECKED_IMAGE ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                            }
                        },
                    "lblMoveUpIcon": index !== 0 ? {

                        text: ViewConstants.FONT_ICONS.LABEL_IDENTIFIER,
                        "accessibilityconfig": {
                            "a11yLabel": ViewConstants.FONT_ICONS.LABEL_IDENTIFIER,
                        },
                        isVisible: false,
                        skin: ViewConstants.SKINS.FONT_ICON_BLUE_21PX
                    } : {

                            text: ViewConstants.FONT_ICONS.LABEL_IDENTIFIER,
                            "accessibilityconfig": {
                                "a11yLabel": ViewConstants.FONT_ICONS.LABEL_IDENTIFIER,
                            },
                            isVisible: false,
                            skin: ViewConstants.SKINS.LABEL_MOVE_INACTIVE
                        },
                    "lblMoveDownIcon": {
                        isVisible: false,
                        text: ViewConstants.FONT_ICONS.DISABLE_DOWN,
                        "accessibilityconfig": {
                            "a11yLabel": ViewConstants.FONT_ICONS.DISABLE_DOWN,
                        },
                        skin: ViewConstants.SKINS.FONT_ICON_BLUE_21PX
                    },
                    "lblAccountName": {
                        "text": data.AccountName,
                        "accessibilityconfig": {
                            "a11yLabel": data.AccountName,
                        },
                    },
                    "lblAccountHolderKey": {
                        "text": kony.i18n.getLocalizedString('i18n.ProfileManagement.AccountHolder'),
                        "accessibilityconfig": {
                            "a11yLabel": kony.i18n.getLocalizedString('i18n.ProfileManagement.AccountHolder'),
                        },
                    },
                    "lblAccountHolderColon": {
                        "text": ": ",
                        "accessibilityconfig": {
                            "a11yLabel": ": ",
                        },
                    },
                    "lblAccountHolderValue": {
                        "text": data.AccountHolder,
                        "accessibilityconfig": {
                            "a11yLabel": data.AccountHolder,
                        },
                    },
                    "lblAccountNumberKey": {
                        "text": kony.i18n.getLocalizedString('i18n.ProfileManagement.AccountNumber'),
                        /*"accessibilityconfig": {
                            "a11yLabel": kony.i18n.getLocalizedString('i18n.ProfileManagement.AccountNumber'),
                        },*/
                    },
                    "lblAccountNumberValue": {
                        "text": data.AccountNumber,
                        "accessibilityconfig": {
                            "a11yLabel": data.AccountNumber,
                        },
                    },
                    "lblAccountTypeKey": {
                        "text": kony.i18n.getLocalizedString('i18n.ProfileManagement.AccountType'),
                        "accessibilityconfig": {
                            "a11yLabel": kony.i18n.getLocalizedString('i18n.ProfileManagement.AccountType'),
                        },
                    },
                    "lblAccountNumberColon": {
                        "text": ": ",
                        "accessibilityconfig": {
                            "a11yLabel": ": ",
                        },
                    },
                    "lblAccountTypeValue": {
                        "text": data.AccountType,
                        "accessibilityconfig": {
                            "a11yLabel": data.AccountType,
                        },
                    },
                    "imgEStatementCheckBox": data.imgEStatementCheckBox,
                    "lblAccountTypeColon": {
                        "text": ": ",
                        "accessibilityconfig": {
                            "a11yLabel": ": ",
                        },
                    },
                    "imgFavoriteCheckBox": data.imgFavoriteCheckBox,
                    "lblMarkAsFavorite": {
                        "text": "Mark as Favorite Account",
                        "accessibilityconfig": {
                            "a11yLabel": "Mark as Favorite Account",
                        },
                    },
                    "lblEStatement": (data.external) ? {
                        isVisible: false
                    } : {
                            "text": kony.i18n.getLocalizedString("i18n.ProfileManagement.E-statementEnabled"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.E-statementEnabled"),
                            },
                        },
                    "btnEdit": {
                        text: kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                        "accessibilityconfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                        },
                        "isVisible": applicationManager.getConfigurationManager().checkUserPermission("ACCOUNT_SETTINGS_EDIT"),
                        onClick: function (eventobject, context) {
                            self.onPreferenceAccountEdit(context, null)
                        }.bind(this)
                    },
                    /* "flxMenu": {
                         "skin": "slFbox",
                         "isVisible": applicationManager.getConfigurationManager().reOrderAccountPreferences === "true" ? true : false
                     },*/
                    "imgMenu": data.imgMenu,
                    "imgMoveUp": (data.external) ? {
                        isVisible: false
                    } : (index !== 0 ? ViewConstants.IMAGES.ACTIVE_UP : ViewConstants.IMAGES.DISABLE_UP),
                    "lblMove": {
                        isVisible: false
                    },
                    "imgMoveDown": (data.external) ? {
                        isVisible: false
                    } : ViewConstants.IMAGES.DISABLE_DOWN,
                    "lblSepeartorlast": "lblSepeartorlast",
                    "lblsepeartorfirst": "lblsepeartorfirst",
                    "flxMoveUp": (data.external) ? {
                        isVisible: false
                    } : {
                            onClick: function () {
                                if (index !== 0) {
                                    self.onBtnMoveUp();
                                }
                            }
                        },
                    "flxMoveDown": (data.external) ? {
                        isVisible: false
                    } : {
                            onClick: function () {
                                self.onBtnMoveDown();
                            }
                        },
                    "lblSeperator": "lblSeperator",
                    "lblSeperator2": "lblSeperator2",
                    "lblseperator3": "lblseperator3",
                    "template": "flxAccountRow",
                    "email": data.email,
                    "lblAccountsTypeIcon": {
                        //"isVisible" :  (isCombinedUser)? true : false,
                        "isVisible": this.profileAccess === "both" ? true : false,
                        "text": (data.isBusinessAccount) ? "r" : "s"
                    }
                };
                if (CommonUtilities.isCSRMode()) {
                    dataObject.flxMoveUp.onClick = CommonUtilities.disableButtonActionForCSRMode();
                    dataObject.flxMoveDown.onClick = CommonUtilities.disableButtonActionForCSRMode();
                }
                return dataObject;
            };
            var data = self.getDataWithSections(viewModel, mapViewModel.bind(this));
            var len = data.length;
            var i = 0;
            if (len !== 0) {
                for (i = 0; i < data.length; i++) {
                    var rowCount = data[i][1].length;
                    data[i][1][rowCount - 1].imgMoveDown = ViewConstants.IMAGES.DISABLE_DOWN;
                    data[i][1][rowCount - 1].lblMoveDownIcon = {
                        text: ViewConstants.FONT_ICONS.DISABLE_DOWN,
                        skin: ViewConstants.SKINS.LABEL_MOVE_INACTIVE
                    };
                    data[i][1][rowCount - 1].flxMoveDown = function () { };
                    data[i][1][0].imgMoveUp = ViewConstants.IMAGES.DISABLE_UP;
                    data[i][1][0].lblMoveUpIcon = {
                        text: ViewConstants.FONT_ICONS.LABEL_IDENTIFIER,
                        skin: ViewConstants.SKINS.LABEL_MOVE_INACTIVE
                    };
                    //                      data[i][1][0].lblMarkAsFavouriteAccountCheckBoxIcon = {
                    //                           skin: "sknlblOLBFonts0273E420pxOlbFontIcons",
                    //                           text: "D"
                    //                       };
                    //                      data[i][1][0].lblEstatementCheckBoxIcon = {
                    //                           skin: "sknlblOLBFonts0273E420pxOlbFontIcons",
                    //                           text: "D"
                    //                       };
                    data[i][1][0].flxMoveUp = function () { };
                }
            }
            this.view.segAccounts.widgetDataMap = dataMap;
            if (isCombinedUser || isBusinessUser)
                this.view.segAccounts.sectionHeaderSkin = "segAccountListItemHeaderPMCombinedAccess";
            else
                this.view.segAccounts.sectionHeaderSkin = "segAccountListItemHeaderPM";
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                for (i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i][1].length; j++)
                        data[i][1][j].template = "flxAccountRowTablet";
                }
            };
            this.view.segAccounts.setData(data);
            this.view.forceLayout();
            //    this.AdjustScreen();
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         * Method to create section header for accounts
         * @param {Collection} accounts List of accounts
         */
        getDataWithSections: function (viewModel, mapViewModel) {
            var finalData = {};
            var scopeObj = this;
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            var retailUser = applicationManager.getConfigurationManager().getConfigurationValue('isRBUser') === "true";
            var business = kony.i18n.getLocalizedString("i18n.accounts.Business");
            var personal = kony.i18n.getLocalizedString("i18n.accounts.Personal");
            var accountTypes = [];

            viewModel.forEach(function (account, index, viewModel) {
                if (isSingleCustomerProfile) {
                    if (account.external != true) {
                        var accountType = applicationManager.getTypeManager().getAccountType(account.AccountType);
                        if (finalData.hasOwnProperty(accountType)) {
                            finalData[accountType][1].push(mapViewModel(account, index, viewModel));
                        } else {
                            finalData[accountType] = [{
                                lblTransactionHeader: applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ?
                                    applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                                template: "flxAccountListItemHeaderPM"
                            },
                            [mapViewModel(account, index, viewModel)]
                            ]
                        }
                    }
                } else {
                    var accountRoleType = personal;
                    var accountTypeIcon = "";
                    if (account.isBusinessAccount === false) {
                        if (scopeObj.primaryCustomerId != undefined && scopeObj.primaryCustomerId.id === account.Membership_id && scopeObj.primaryCustomerId.type === 'personal') {
                            accountRoleType = "Personal Accounts";
                            accountTypeIcon = "s";
                        } else {
                            accountRoleType = account.Membership_id;
                            accountTypeIcon = "s";
                        }
                    } else {
                        accountRoleType = account.Membership_id;
                        accountTypeIcon = "r";
                    }
                    if (finalData.hasOwnProperty(accountRoleType) && account.Membership_id === finalData[accountRoleType][0]["membershipId"]) {
                        finalData[accountRoleType][1].push(mapViewModel(account, index, viewModel));
                    } else {
                        finalData[accountRoleType] = [{
                            lblTransactionHeader: accountRoleType === "Personal Accounts" ? accountRoleType : account.MembershipName,
                            template: "flxAccountListItemHeaderPM",
                            membershipId: account.Membership_id,
                        },
                        [mapViewModel(account, index, viewModel)]
                        ];
                        //                 if(accountRoleType!==personal)
                        //                   accountTypes.push(accountRoleType);
                    }
                }
            })
            var data = [];
            if (!isSingleCustomerProfile) {
                data = this.sortAccountData(finalData, accountTypes);
            } else {
                for (var key in prioritizeAccountTypes) {
                    var accountType = prioritizeAccountTypes[key];
                    if (finalData.hasOwnProperty(accountType)) {
                        data.push(finalData[accountType]);
                    }
                }
            }
            return data;
        },
        sortAccountData: function (finalData) {
            var data = [];
            var prioritizeAccountRoleTypes = [];
            var viewType = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');

            var sections = Object.keys(finalData);
            var index = sections.indexOf(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
            if (index > -1) {
                sections.splice(index, 1);
            }

            prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
            prioritizeAccountRoleTypes = prioritizeAccountRoleTypes.concat(sections);

            this.sectionData = [];

            for (var i = 0; i < prioritizeAccountRoleTypes.length; i++) {
                var accountType = prioritizeAccountRoleTypes[i];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                }
            }


            for (var i = 0; i < data.length; i++) {
                var accoountTypeOrder = applicationManager.getTypeManager().getAccountTypesByPriority();
                var sortedData = data[i][1];
                sortedData.sort(function (a, b) {
                    return accoountTypeOrder.indexOf(a.lblAccountType) - accoountTypeOrder.indexOf(b.lblAccountType);
                });
                data[i][1] = sortedData;

            }

            return data;
        },

        sortAccountData1: function (finalData, accountTypes) {
            var data = [];
            var personal = kony.i18n.getLocalizedString("i18n.accounts.Personal");

            if (finalData[personal][1].length != 0)
                data.push(finalData[personal]);
            accountTypes.forEach(function (type) {
                if (finalData[type][1].length != 0)
                    data.push(finalData[type]);
            });

            for (var i = 0; i < data.length; i++) {
                var accoountTypeOrder = applicationManager.getTypeManager().getAccountTypesByPriority();
                var sortedData = data[i][1];
                sortedData.sort(function (a, b) {
                    return accoountTypeOrder.indexOf(a.lblAccountTypeValue) - accoountTypeOrder.indexOf(b.lblAccountTypeValue);
                });
                data[i][1] = sortedData;
            }

            return data;
        }
    };
});