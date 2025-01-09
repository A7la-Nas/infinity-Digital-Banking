define(['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function (CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    var flexVisibility = false;
    return {
        primaryCustomerId: {},
        accounts:null,
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);

            if (viewModel.showPrefferedView) { }
            if (viewModel.getPreferredAccountsList) this.showPreferredAccountsList(viewModel.getPreferredAccountsList);
            this.view.lblAccountsHeader.setActive(true);
        },
        init: function () {
            var self = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
            this.setFlowActions();
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");

        },
        postShow: function () {
            applicationManager.getNavigationManager().applyUpdates(this);
            this.changeProgressBarState(false);
            this.view.forceLayout();
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.customheadernew.collapseAll();
            this.view.lblAccountsHeader.setActive(true);
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
        onBreakpointChange: function (width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.profileMenu.onBreakpointChangeComponent(width);
            orientationHandler.onOrientationChange(this.onBreakpointChange);
            if(this.accounts!==null)
            this.showPreferredAccountsList(this.accounts);
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.updateSettingAndPreferences"), accessibilityConfig);
            }
            this.view.forceLayout();
        },
        preShow: function () {
            var self = this;
           // this.view.btnEdit.toolTip = kony.i18n.getLocalizedString("i18n.billPay.Edit");
            this.view.flxRight.setVisibility(true);
            this.changeProgressBarState(true);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile']);
            this.view.lblCollapseMobile.text = "O";
            this.view.customheadernew.activateMenu("Settings", "Account Settings");
            this.view.profileMenu.checkLanguage();
            this.view.profileMenu.activateMenu("ACCOUNTSETTINGS", "Account Preferences");
            this.setSelectedValue("i18n.ProfileManagement.AccountPreferences");
            this.view.onBreakpointChange = function () {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
            this.setAccessibility();
			//this.view.lblHeading.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
        },
        /**
        * *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
        *  Method to set the text in mobile breakpoint
        */
        setSelectedValue: function (text) {
           var self = this;
      CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text) , CommonUtilities.getaccessibilityConfig());
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

        /**
        *  Method to set the Accessibility configurations
        */
        setAccessibility: function () {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.updateSettingAndPreferences"), accessibilityConfig);
              CommonUtilities.setText(this.view.lblWarning1, kony.i18n.getLocalizedString("i18n.accountSettings.noAccounts"), accessibilityConfig);
            this.view.lblHeading.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
                "a11yLabel": this.view.lblAccountsHeader.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
            };
              this.view.lblCollapseMobile.accessibilityConfig = {
                  "a11yARIA": {
                      "tabindex": -1
                   }
              };
              this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                  "a11yLabel": "Dropdown"
              };
              this.view.imgWarning1.accessibilityConfig={
                "a11yARIA": 
                {
                  "tabindex" : -1
                }
              }; 
              /*this.view.lblAccountsHeader.accessibilityConfig = {
                  "a11yLabel": kony.i18n.getLocalizedString("i18n.topmenu.accounts")
              };*/
        },
        /**
        *  Method to set the Form Flow Actions such as button onclick events
        */
        setFlowActions: function () {
            var scopeObj = this;

        },

        /*********************Ankit Refactored***************************/
        /**
         * Method to set email got from backend
         * @param {Object} response - response of email JSON got from backend
         */
        setEmailsToLbx: function (response) {
            var data = [];
            var section = this.editContext.sectionIndex;
            var index = this.editContext.rowIndex; //this.view.segAccounts.selectedRowIndex[1];
            var accData = this.view.segAccounts.data[section][1][index];
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
            this.view.flxTermsAndConditions.isVisible = true;
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
            this.view.flxTermsAndConditions.setVisibility(true);
            this.view.forceLayout();
        },
        hideTermsAndConditionPopUp: function () {
            this.view.flxTermsAndConditions.setVisibility(false);
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
            var data = self.this.view.segAccounts.data[sectionIndex][1][index];
            if (self.this.view.tbxAccountNickNameValue.text === "" || self.this.view.tbxAccountNickNameValue.text === null) {
                data.nickName = data.lblAccountHolderValue;
            } else {
                data.nickName = self.this.view.tbxAccountNickNameValue.text;
            }
            if (data.external === true) {
                data = {
                    Account_id: data.accountIdPk,
                    NickName: data.nickName,
                    FavouriteStatus: self.this.view.lblFavoriteEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ? "true" : "false",
                    external: true,
                };
            } else {
                data = {
                    accountID: self.this.view.lblAccountNumberValue.text,
                    nickName: data.nickName,
                    favouriteStatus: self.this.view.lblFavoriteEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ? 1 : 0,
                    eStatementEnable: self.this.view.lblEnableEStatementsCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ? 1 : 0,
                    email: self.this.view.lblEnableEStatementsCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ? self.this.view.lbxEmailForReceiving.selectedKeyValue[1] : " ",
                };
            }
            FormControllerUtility.showProgressBar(self.view);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileModule").presentationController.savePreferredAccountsData(data);
        },
        /**
         * Method to prefill the data while editing prefered account
         * @param {boolean} errorScenario true/false
         */
        onPreferenceAccountEdit: function (context, errorScenario) {
			applicationManager.getPresentationUtility().showLoadingScreen();
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule").presentationController.getTncContent(OLBConstants.TNC_FLOW_TYPES.Estatements_TnC);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule").presentationController.setAccountPrefContext({
                "onPreferenceAccountEdit": { "context": context, "errorScenario": errorScenario, "scopeObj": this }
            });
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
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileModule").presentationController.setAccountsPreference(updatedAccounts);
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
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileModule").presentationController.setAccountsPreference(updatedAccounts);
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
            this.accounts = viewModel;
            var scopeObj = this;
            this.view.customheadernew.activateMenu("Settings", "Account Settings");

            //     this.accountDataStore = cloneJS ON(viewModel);
            //   this.view.customheader.customhamburger.activateMenu("Settings", "Account Settings");
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
                this.view.flxDowntimeWarning1.setVisibility(true);
                this.view.segAccounts.setVisibility(false);
                FormControllerUtility.hideProgressBar(this.view);
            } else {
                this.view.flxDowntimeWarning1.setVisibility(false);
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
            var mapViewModel = function(data, index, viewModel) {
                var currBreakpoint = kony.application.getCurrentBreakpoint();
                var acclen=this.accounts.length;
                var favFlag = applicationManager.getConfigurationManager().getConfigurationValue('isFavoriteRequired');
                var favConfigCount = applicationManager.getConfigurationManager().getConfigurationValue('favoriteCount');
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
                        "accessibilityConfig": {
                            "a11yLabel": ""
                        },
                    },
                    "lblMarkAsFavouriteAccountCheckBoxIcon": {
                        isVisible: (favFlag && acclen>favConfigCount)?true:false,
                        text: data.imgFavoriteCheckBox === ViewConstants.IMAGES.CHECKED_IMAGE ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                        "accessibilityConfig": {
                            "a11yLabel": data.imgFavoriteCheckBox === ViewConstants.IMAGES.CHECKED_IMAGE ? kony.i18n.getLocalizedString("i18n.Alerts.Enabled") + " " + kony.i18n.getLocalizedString("i18n.accountSettings.markAsFavorite") + data.AccountNumber : kony.i18n.getLocalizedString("i18n.Alerts.Disabled") + " " + kony.i18n.getLocalizedString("i18n.accountSettings.markAsFavorite") + data.AccountNumber
                        }
                    },
                    "lblEstatementCheckBoxIcon": (data.external) ? {
                        isVisible: false
                    } : {
                        text: data.imgEStatementCheckBox === ViewConstants.IMAGES.CHECKED_IMAGE ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                        "accessibilityConfig": {
                            "a11yLabel": data.imgEStatementCheckBox === ViewConstants.IMAGES.CHECKED_IMAGE ? kony.i18n.getLocalizedString("i18n.Alerts.Enabled") + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.E-statementEnabled") + data.AccountNumber : kony.i18n.getLocalizedString("i18n.Alerts.Disabled") + kony.i18n.getLocalizedString("i18n.ProfileManagement.E-statementEnabled") + " " + data.AccountNumber,
                            "a11yHidden": true
                        }
                    },
                    "lblMoveUpIcon": {
                        isVisible: false
                    },
                    "lblMoveDownIcon": {
                        isVisible: false
                    },
                    "lblAccountName": {
                        "text": kony.sdk.isNullOrUndefined(data.nickName) ? data.AccountName : data.nickName,
                        "accessibilityConfig": {
                            "a11yLabel": ""
                        },
                    },
                    "lblAccountHolderKey": {
                        "text": kony.i18n.getLocalizedString('i18n.ProfileManagement.AccountHolder'),
                        "accessibilityConfig": {
                            "a11yLabel": ""
                        },
                    },
                    "lblAccountHolderColon": {
                        "text": ": ",
                        "accessibilityConfig": {
                            "a11yLabel": ": "
                        },
                    },
                    "lblAccountHolderValue": {
                        "text": data.MembershipName,
                        "accessibilityConfig": {
                            "a11yLabel": ""
                        },
                    },
                    "lblAccountNumberKey": {
                        "text": kony.i18n.getLocalizedString('i18n.ProfileManagement.AccountNumber'),
                        "accessibilityConfig": {
                            "a11yLabel": ""
                        },
                    },
                    "lblAccountNumberValue": {
                        "text": data.AccountNumber,
                        "accessibilityConfig": {
                            "a11yLabel": ""
                        },
                    },
                    "lblAccountTypeKey": {
                        "text": kony.i18n.getLocalizedString('i18n.ProfileManagement.AccountType'),
                        "accessibilityConfig": {
                            "a11yLabel": ""
                        },
                    },
                    "lblAccountNumberColon": {
                        "text": ": ",
                        "accessibilityConfig": {
                            "a11yLabel": ": "
                        },
                    },
                    "lblAccountTypeValue": {
                        "text": data.AccountType,
                        "accessibilityConfig": {
                            "a11yLabel": ""
                        },
                    },
                    "imgEStatementCheckBox": data.imgEStatementCheckBox,
                    "lblAccountTypeColon": {
                        "text": ": ",
                        "accessibilityConfig": {
                            "a11yLabel": ": "
                        },
                    },
                    "imgFavoriteCheckBox": data.imgFavoriteCheckBox,
                    "lblMarkAsFavorite": {
                        isVisible: (favFlag && acclen>favConfigCount)?true:false,
                        "text": kony.i18n.getLocalizedString("i18n.accountSettings.markAsFavorite"),
                        "accessibilityConfig": {
                            "a11yLabel": ""
                        },
                    },
                    "flxMarkAsFavorite":{
                        isVisible: (favFlag && acclen>favConfigCount)?true:false
                    },
                    "flxEStatementCheckBox":{
                        "accessibilityConfig": {
                            //"a11yLabel": data.imgEStatementCheckBox === ViewConstants.IMAGES.CHECKED_IMAGE ? "Estatement enabled" : "Estatement disabled",
                            "a11yARIA": {
                                "tabindex": -1,
                                "role":"checkbox",
                                "aria-checked":data.imgEStatementCheckBox === ViewConstants.IMAGES.CHECKED_IMAGE ? true : false,
                                "aria-readonly":true,
                                "aria-labelledby":"lblEStatement"
                            }                            
                        },
                    },
                    "lblEStatement": (data.external) ? {
                        isVisible: false
                    } : {
                        "text": kony.i18n.getLocalizedString("i18n.ProfileManagement.E-statementEnabled"),
                        "accessibilityConfig": {
                           // "a11yLabel": data.imgEStatementCheckBox === ViewConstants.IMAGES.CHECKED_IMAGE ? "Estatement enabled" : "Estatement disabled",
                            "a11yHidden": true
                        },
                    },
                    "btnEdit": {
                        text: kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                       // toolTip:kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                      "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.billPay.EditAccountSettings") + data.AccountName
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
                    "imgMoveUp": {
                        isVisible: false
                    },
                    "lblMove": {
                        isVisible: false
                    },
                    "imgMoveDown": {
                        isVisible: false

                    },
                    "flxMoveDown": {
                        isVisible: false

                    },
                    "lblSeperator": {
                        "text": "",
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AccountPreferencesSeperator"),
                            "a11yARIA":
                            {
                                "tabindex": -1
                            },
                            "a11yHidden" : true 
                        }
                    },
                    "lblSeperator2": {
                        "text": "",
                        "accessibilityConfig": {
                            "a11yLabel": "",
                            "a11yARIA":
                            {
                                "tabindex": -1
                            },
                            "a11yHidden" : true 
                        }
                    },
                    "lblseperator3": {
                        "text": "",
                        "accessibilityConfig": {
                            "a11yLabel": "",
                            "a11yARIA":
                            {
                                "tabindex": -1
                            }
                        }
                    },
                    "template": (currBreakpoint === 640 || orientationHandler.isMobile) ? "flxAccountRowMobile" : "flxAccountRow",
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

            this.view.segAccounts.widgetDataMap = dataMap;
            if (isCombinedUser || isBusinessUser)
                this.view.segAccounts.sectionHeaderSkin = "segAccountListItemHeaderPMCombinedAccess";
            else
                this.view.segAccounts.sectionHeaderSkin = "segAccountListItemHeaderPM";
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                for (i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i][1].length; j++)
                        data[i][1][j].template = "flxAccountRowTabletNew";
                }
            };
            if(data.length===0){
                this.view.flxDowntimeWarning1.setVisibility(true);
                this.view.segAccounts.setVisibility(false);
                FormControllerUtility.hideProgressBar(this.view);
            }
            else {
                this.view.flxDowntimeWarning1.setVisibility(false);
                this.view.segAccounts.setVisibility(true);
                this.view.segAccounts.setData(data);
            }
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
                                //lblTransactionHeader: applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                                lblTransactionHeader: {
                                    "text":  applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                                    "accessibilityConfig": {
                                            "a11yLabel": ""
                                            //"a11yValue": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                                    },
                                },
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
                            //lblTransactionHeader: accountRoleType === "Personal Accounts" ? accountRoleType : account.MembershipName,
                            lblTransactionHeader: {
                                "text": accountRoleType === "Personal Accounts" ? accountRoleType : account.MembershipName,
                                "accessibilityConfig": {
                                    "a11yLabel": accountRoleType === "Personal Accounts" ? accountRoleType : account.MembershipName,
                                },
                            },
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