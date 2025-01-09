define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants, CampaignUtility) {
     
    var fromSeg = true;
    return {
        profileAccess: "",
        init: function () {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.customheadernew.btnSkipNav.onClick = this.onSkipNav;
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
           // this.view.btnActivate.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.Save");
           // this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.billPay.Edit");
          //  this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.flxCancelPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.flxFrom.onKeyPress = this.onKeyPressCallBackFrom;

        },
        preShow: function () {
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.flxActivateMain.setVisibility(false);
            this.view.flxSubConfirmation.setVisibility(true);
            this.view.flxDialogs.setVisibility(false);
            this.view.flxDowntimeWarning.setVisibility(false);
            CampaignUtility.fetchPopupCampaigns();
            this.view.forceLayout();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain']);
       //     this.view.btnCancelSettings.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");

        },
        onFormTouchEnd: function () {
            this.hidePopups();
        },
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.accessibilityFocusSetup();
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.title = "Person to Person Settings";
        },
                /**
         * closes any popups when logged esc key
         */
        onKeyPressCallBack: function(eventObj, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxDialogs.isVisible) {
                    if (this.view.flxLogout.isVisible) {
                        this.view.customheadernew.btnLogout.setFocus(true);
                    }else if(this.view.flxCancelPopup.isVisible){
						this.view.btnCancelSettings.setFocus(true);
					}
					this.view.flxCancelPopup.isVisible = false;
                    this.view.flxDialogs.isVisible = false;
                }
            }
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function () {
            let widgets = [
                [this.view.txtTransferFrom, this.view.flxFrom]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        onBreakpointChange: function (form, width) {
            var scope = this
            this.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CancelPopup.onBreakpointChangeComponent(scope.view.CancelPopup, width);
        },
        setupFormOnTouchEnd: function (width) {
            var self = this;
            if (width == 640) {
                this.view.onTouchEnd = function () { }
            } else {
                if (width == 1024) {
                    this.view.onTouchEnd = function () { }
                } else {
                    this.view.onTouchEnd = function () {
                        self.hidePopups();
                    }
                }
            }
        },
        hidePopups: function () {
            var currFormObj = kony.application.getCurrentForm();
            currFormObj.customheadernew.flxUserActions.isVisible = false;
            if ((currFormObj.flxFromSegment.isVisible === true && fromSeg === true)) {
                fromSeg = false;
            } else if ((currFormObj.flxFromSegment.isVisible === true && fromSeg === false)) {
                if (this.view.txtTransferFrom.text !== "" && currFormObj.flxFromSegment.isVisible === true) {
                    this.view.txtTransferFrom.text = "";
                    this.view.flxCancelFilterFrom.setVisibility(false);
                    //this.fetchFromAccountsBySearch();
                }
                currFormObj.flxFromSegment.setVisibility(false);
                fromSeg = true;
            } else if ((currFormObj.flxFromSegment.isVisible === false && fromSeg === false)) {
                fromSeg = true;
            }
            if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
                currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
                currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
                currFormObj.customheadernew.imgLblTransfers.text = "O";
            }
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object}  viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.userDetails && viewModel.accounts) {
                this.setP2PSettings(viewModel);
            }
            if (viewModel.serverError) {
                this.view.rtxDowntimeWarning.text = viewModel.serverError;
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.flxFormContent.forceLayout();
            }
            if (viewModel.campaign) {
                CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMain");
            }
        },
        setP2PSettings: function (data) {
            var scopeObj = this;
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "HomepageMA",
                "moduleName": "AccountsUIModule"
            });
            CommonUtilities.setText(scopeObj.view.lblBankNameValue, data.userDetails.userName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAccountNumberValue, data.userDetails.phone, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAccountTypeValue, data.userDetails.email, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblRecipientNameValue, applicationManager.getUserPreferencesManager().getDefaultToAccountforP2P(), CommonUtilities.getaccessibilityConfig());
            scopeObj.view.btnModify.onClick = function () {
                applicationManager.getNavigationManager().navigateTo(data.userDetails.formId, undefined, {
                    "refreshComponent": false,
                    "showPreviousTab": true
                });
            };
            scopeObj.view.btnConfirm.onClick = function () {
                scopeObj.editP2PSettings(data);
				scopeObj.view.customheadernew.btnSkipNav.setActive(true);
            };
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (this.profileAccess === "both") {
                scopeObj.view.flxDefaultAccountUser.setVisibility(true);
                scopeObj.view.lblDefaultAccountUser.setVisibility(true);
                scopeObj.view.lblDefaultAccountUser.text = accountsModule.presentationController.fetchIsBusinessAccount(applicationManager.getUserPreferencesManager().getDefaultToAccountforP2P()) === "true" ? "r" : "s"
            } else {
                scopeObj.view.listbxAcccFrDeposit.setVisibility(true);
                scopeObj.view.flxDefaultAccountUser.setVisibility(false);
            }
        },
        /**
         * edit p2p details page.
         * @param {Object} userData - contains recepient info like name, phone number, email and transaction object fields like deposit account number and name.
         */
        editP2PSettings: function (userData) {
            var scopeObj = this;
            scopeObj.view.flxActivateMain.setVisibility(true);
            scopeObj.view.flxSubConfirmation.setVisibility(false);
            scopeObj.view.listbxAcccFrDeposit.masterData = scopeObj.showAccountsForP2PActiveSettings(userData.accounts);
            scopeObj.view.listbxAcccFrDeposit.selectedKey = applicationManager.getUserPreferencesManager().getDefaultToAccountforP2P();
            this.initializeSegment(userData);
            scopeObj.view.tbxNameValue.text = userData.userDetails.userName;
            scopeObj.view.tbxRegisteredPhoneValue.text = userData.userDetails.phone;
            scopeObj.view.tbxRegisteredEmailValue.text = userData.userDetails.email;
            scopeObj.view.lblNameValue.setVisibility(false);
            scopeObj.view.lblRegisteredPhoneValue.setVisibility(false);
            scopeObj.view.lblRegisteredEmailValue.setVisibility(false);
            scopeObj.view.lblDefaultDepositAccountValue.setVisibility(false);
            scopeObj.view.tbxNameValue.setVisibility(true);
            scopeObj.view.tbxRegisteredPhoneValue.setVisibility(true);
            scopeObj.view.tbxRegisteredEmailValue.setVisibility(true);
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                scopeObj.view.listbxAcccFrDeposit.setVisibility(false);
                scopeObj.view.flxFrom.setVisibility(true);
            } else {
                scopeObj.view.listbxAcccFrDeposit.setVisibility(true);
            }
            scopeObj.view.tbxNameValue.setEnabled(false);
            scopeObj.view.tbxRegisteredPhoneValue.setEnabled(false);
            scopeObj.view.tbxRegisteredEmailValue.setEnabled(false);
            scopeObj.view.btnCancelSettings.onClick = function () {
                scopeObj.showCancelPopup();
            };
            scopeObj.view.btnActivate.onClick = function () {
                //if(applicationManager.getConfigurationManager().isCombinedUser === "true")
                if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) scopeObj.transfersFastPresentationController.updateP2PPreferencesForUser({
                    "defaultDepositAccount": scopeObj.view.segTransferFrom.selectedRowItems[0].lblAccountName,
                    "formId": kony.application.getCurrentForm().id
                });
                else scopeObj.transfersFastPresentationController.updateP2PPreferencesForUser({
                    "defaultDepositAccount": scopeObj.view.listbxAcccFrDeposit.selectedKey,
                    "formId": kony.application.getCurrentForm().id
                });
            };
            scopeObj.view.customheadernew.activateMenu("FASTTRANSFERS", "Transfer Money");
			scopeObj.view.listbxAcccFrDeposit.accessibilityConfig = {
				"a11yLabel": "Currently selected "+scopeObj.view.listbxAcccFrDeposit.selectedKey+".Click to show list of accounts.",
				a11yARIA: {
                  "aria-labelledby": "lblDefaultAccountForDeposit"
				}
			};
            scopeObj.view.flxFormContent.forceLayout();
        },
        /**
         * method is used to get the payment accounts
         * @param {Object} presentAccounts - contains the list of accounts.
         */
        showAccountsForP2PActiveSettings: function (presentAccounts) {
            var list = [];
            for (var i = 0; i < presentAccounts.length; i++) {
                var tempList = [];
                tempList.push(presentAccounts[i].accountID);
                var tempAccountNumber = presentAccounts[i].accountID;
                tempList.push(presentAccounts[i].accountName + " ..." + tempAccountNumber.slice(-4));
                list.push(tempList);
            }
            return list;
        },
        /**
         * skip to main content in accessibility flow
         */
        onSkipNav: function() {
            this.view.lblTransfers.setActive(true);
        },
        /**
         * show or hide cancel popup
         */
        showCancelPopup: function () {
            var scopeObj = this;
            
           
            scopeObj.view.flxCancelPopup.left = "0%";
            var popupComponent = scopeObj.view.flxCancelPopup.widgets()[0];
            popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
            popupComponent.btnYes.onClick = function () {
				scopeObj.view.flxLogout.setVisibility(true);
				scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
                scopeObj.view.flxActivateMain.setVisibility(false);
                scopeObj.view.flxSubConfirmation.setVisibility(true);
				scopeObj.view.customheadernew.btnSkipNav.setActive(true);
            };
            popupComponent.btnNo.onClick = function () {
				scopeObj.view.flxLogout.setVisibility(true);
				scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
				scopeObj.view.btnCancelSettings.setActive(true);
            };
            popupComponent.flxCross.onClick = function () {
				scopeObj.view.flxLogout.setVisibility(true);
				scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
				scopeObj.view.btnCancelSettings.setActive(true);
            };
            scopeObj.view.CancelPopup.btnYes.accessibilityConfig = {
                    "a11yLabel": "Yes , cancel editing p2p settings"
                };
                scopeObj.view.CancelPopup.btnNo.accessibilityConfig = {
                    "a11yLabel": "No , continue editing p2p settings"
                };
                 scopeObj.view.CancelPopup.flxCross.accessibilityConfig = {
                    "a11yLabel": "Close , cancel editing p2p settings dialog"
                };
				scopeObj.view.flxLogout.setVisibility(false);
				scopeObj.view.flxCancelPopup.setVisibility(true);
             scopeObj.view.flxDialogs.setVisibility(true);
            
            scopeObj.view.flxFormContent.forceLayout();
        },
        getDataWithSections: function (accounts) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = [];
            accounts.forEach(function (account) {
                var accountType = "Personal Accounts";
                if (account.isBusinessAccount === "false") accountType = "Personal Accounts";
                else accountType = "Daisy Pvt Ltd";
                if (finalData.hasOwnProperty(accountType)) {
                    if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                        finalData[accountType][1].pop();
                    }
                    finalData[accountType][1].push(scopeObj.createSegmentData(account));
                } else {
                    prioritizeAccountTypes.push(accountType);
                    finalData[accountType] = [{
                        lblTransactionHeader: accountType,
                        imgDropDown: "P",
                        flxDropDown: {
                            "onClick": function (context) {
                                scopeObj.view.flxFromSegment.setVisibility(true);
                                scopeObj.showOrHideAccountRows(context)
                            }.bind(this)
                        },
                        template: "flxTransfersFromListHeader"
                    },
                    [scopeObj.createSegmentData(account)]
                    ];
                }
            });
            var data = [];
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                }
            }
            return data;
        },
        /*  Fetches the img on basis bank name
         */
        getBankIcon: function (account) {
            var bankName = account.bankName;
            if (!kony.sdk.isNullOrUndefined(account.logoURL)) {
                return account.logoURL;
            }
            var img = ViewConstants.IMAGES.HDFC_BANK_IMAGE;
            switch (bankName) {
                case "Citibank":
                    img = ViewConstants.IMAGES.CITI_BANK_IMAGE;
                    break;
                case "Bank of America":
                    img = ViewConstants.IMAGES.BOA_BANK_IMAGE;
                    break;
                case "National Bank":
                    img = ViewConstants.IMAGES.CHASE_BANK_IMAGE;
                    break;
                case "infinity":
                    img = ViewConstants.IMAGES.HDFC_BANK_IMAGE;
                    break;
            }
            return img;
        },
        createSegmentData: function (account) {
            var dataObject = {
                "lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.getAccountDisplayName(account) : (account.nickName ? account.nickName : account.name),
                // "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? CommonUtilities.formatCurrencyWithCommas(account.availableBalance,false,account.currencyCode) : (account.bankName || account.phone || account.email)) : (CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance,false,account.currencyCode)),
                "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
                "currencyCode": account.currencyCode,
                "imgIcon": account.isBusinessUser === true ? "r" : "s",
                "lblAccType": account.accountType,
                "imgBankIcon": {
                    "isVisible": account.externalIndicator === "true" ? true : false,
                    "src": this.getBankIcon(account)
                },
                "flxBankIcon": {
                    "isVisible": account.externalIndicator === "true" ? true : false
                },
                "flxAccountListItem": {
                    "isVisible": true
                }
            };
            //} 
            return dataObject;
        },
        showOrHideAccountRows: function (context) {
            var section = context.rowContext.sectionIndex;
            var segData = this.view.segTransferFrom.data;
            var isRowVisible = true;
            if (segData[section][0].imgDropDown.text === "O") {
                segData[section][0]["imgDropDown"] = {
                    text: "P"
                };
                isRowVisible = true;
            } else {
                segData[section][0]["imgDropDown"] = {
                    text: "O"
                };
                isRowVisible = false;
            }
            for (var i = 0; i < segData[section][1].length; i++) {
                var flxAccountListItem1 = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountListItem));
                flxAccountListItem1["isVisible"] = isRowVisible;
                this.updateKeyAt("flxAccountListItem", flxAccountListItem1, i, section);
            }
            this.view.segTransferFrom.setSectionAt(segData[section], section);
        },
        updateKeyAt: function (widgetName, value, row, section) {
            var data = this.view.segTransferFrom.data;
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this.view.segTransferFrom.setDataAt(rowDataTobeUpdated, row, section);
        },
        onClickFromAcct :  function (){
             var scopeObj = this;
            if (scopeObj.view.txtTransferFrom.isVisible === false) {
                        scopeObj.view.txtTransferFrom.setVisibility(true);
                        scopeObj.view.txtTransferFrom.setFocus();
                        scopeObj.view.lblSelectAccount.setVisibility(false);
                        scopeObj.view.flxTypeIcon.setVisibility(false);
                        scopeObj.view.lblFromAmount.setVisibility(false);
                        scopeObj.view.flxCancelFilterFrom.setVisibility(true);
                        scopeObj.view.flxFromSegment.setVisibility(true);
                    }
        },

        onKeyPressCallBackFrom :  function(eventObj,eventPayload){
            if(eventPayload.keyCode === 27){
                this.onClickFromAcct();
            }
        },

        initializeSegment: function (userData) {
            var scopeObj = this;
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                FormControllerUtility.disableButton(scopeObj.view.btnActivate);
                this.view.listbxAcccFrDeposit.setVisibility(false);
                this.view.segTransferFrom.rowtemplate = "flxFromAccountsList";
                this.view.segTransferFrom.widgetDataMap = {
                    "flxFromAccountsList": "flxFromAccountsList",
                    "flxAccountListItem": "flxAccountListItem",
                    "lblAccountName": "lblAccountName",
                    "flxAmount": "flxAmount",
                    "flxSeparator": "flxSeparator",
                    "lblAmount": "lblAmount",
                    "lblCurSym": "lblCurSym",
                    "flxTransfersFromListHeader": "flxTransfersFromListHeader",
                    "lblTransactionHeader": "lblTransactionHeader",
                    "imgDropDown": "imgDropDown",
                    "flxDropDown": "flxDropDown",
                    "flxIcons": "flxIcons",
                    "imgIcon": "imgIcon",
                    "imgBankIcon": "imgBankIcon",
                    "flxBankIcon": "flxBankIcon",
                    "lblAccType": "lblAccType"
                };
                var widgetFromData = this.getDataWithSections(userData.accounts);
                if (widgetFromData) {
                    this.view.segTransferFrom.setData(widgetFromData);
                    this.view.flxLoadingContainerFrom.setVisibility(false);
                    this.view.flxNoResultsFrom.setVisibility(false);
                }
                this.view.txtTransferFrom.onTouchStart = function () {
                    scopeObj.view.flxTypeIcon.setVisibility(false);
                    scopeObj.view.lblSelectAccount.setVisibility(false);
                    scopeObj.view.flxFromSegment.setVisibility(true);
                    scopeObj.view.segTransferFrom.setVisibility(true);
                    scopeObj.view.lblFromAmount.setVisibility(false);
                    scopeObj.view.forceLayout();
                };
                this.view.segTransferFrom.onRowClick = function () {
                    var segData = scopeObj.view.segTransferFrom.selectedRowItems[0];
                    scopeObj.view.txtTransferFrom.text = segData.lblAccountName;
                    // scopeObj.view.flxCancelFilterFrom.setVisibility(true);
                    scopeObj.view.txtTransferFrom.setVisibility(false);
                    scopeObj.view.flxCancelFilterFrom.setVisibility(false);
                    scopeObj.view.lblSelectAccount.text = segData.lblAccountName;
                    scopeObj.view.lblSelectAccount.setVisibility(true);
                    scopeObj.view.flxTypeIcon.setVisibility(true);
                    scopeObj.view.lblTypeIcon.setVisibility(true);
                    scopeObj.view.lblTypeIcon.text = segData.imgIcon;
                    //scopeObj.view.lblFromAmount.setVisibility(true);
                    //scopeObj.view.lblFromAmount.text = segData.lblAmount;
                    scopeObj.view.flxFromSegment.setVisibility(false);
                    FormControllerUtility.enableButton(scopeObj.view.btnActivate);
                };
                this.view.flxCancelFilterFrom.onClick = function () {
                    scopeObj.view.txtTransferFrom.text = "";
                    scopeObj.view.flxCancelFilterFrom.setVisibility(false);
                    scopeObj.view.flxFromSegment.setVisibility(true);
                };
                this.view.flxFrom.onClick = this.onClickFromAcct;
            }
        },
    };
});