define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        isSingleCustomerProfile: true,
        primaryCustomerId: [],
        profileAccess: "",
        init: function () {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.initActions();
            FormControllerUtility.setRequestUrlConfig(this.view.brwBodyTnC);
            this.view.onBreakpointChange = function () {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
        },
        preShow: function () {
            var scope = this;
            this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Pay A Bill");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            this.view.flxServerError.setVisibility(false);
            this.view.flxFromSegment.setVisibility(false);
            this.view.flxFormContent.onClick = function () {
                scope.view.flxFromSegment.setVisibility(false);
            }
               this.view.flxinfo.onClick = function(){
               scope.view.AllForms.setVisibility(!scope.view.AllForms.isVisible);
            }
            this.view.AllForms.flxCross.onClick = function(){
                scope.view.AllForms.setVisibility(false);   
            }
            this.view.imgCancelFilterFrom.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
            this.view.imgLoadingIndicatorFrom.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister");
            this.view.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.enrollNow.proceed");
            this.view.imgClose.toolTip = kony.i18n.getLocalizedString("this.view.imgClose");
            this.view.rtxTC.setVisibility(!CommonUtilities.isMirrorLayoutEnabled())
			this.view.rtxTCArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled())
            this.view.AllForms.RichTextInfo.setVisibility(!CommonUtilities.isMirrorLayoutEnabled())
            this.view.AllForms.RichTextInfoArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled())
        },
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        initActions: function () {
            this.view.lblFavoriteEmailCheckBox.onTouchEnd = this.toggleTnC.bind(this, this.view.lblFavoriteEmailCheckBox);
        },
        onBreakpointChange: function (form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object}  viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function (uiDataMap) {
            if (uiDataMap.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (uiDataMap.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.showDeactivatedView) {
                this.showBillPayActivationScreen(uiDataMap.billPayAcccounts);
            }
            if (uiDataMap.TnCcontent) {
                this.bindTnCData(uiDataMap.TnCcontent);
            }
            if (uiDataMap.serverError) {
                this.setServerError(true, uiDataMap.serverError);
            }
        },
        /**
         * used to show billpay activation screen
         * @param {object} billPayAcccounts bill pay supported sccounts
         */
        showBillPayActivationScreen: function (billPayAcccounts) {
            var self = this;
            self.view.AllForms.isVisible = false;
            //self.setAccountsForActivationScreen(billPayAcccounts);
            this.initializeSegment(billPayAcccounts);
            CommonUtilities.setText(self.view.lblFavoriteEmailCheckBox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, CommonUtilities.getaccessibilityConfig());
            self.view.lblFavoriteEmailCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            CommonUtilities.setText(self.view.lblWarning, kony.i18n.getLocalizedString("i18n.billPay.activateBillPayMsg"), CommonUtilities.getaccessibilityConfig());
            if (CommonUtilities.isCSRMode()) {
                self.view.btnProceed.onClick = CommonUtilities.disableButtonActionForCSRMode();
                self.view.btnProceed.skin = CommonUtilities.disableButtonSkinForCSRMode();
                self.view.btnProceed.focusSkin = CommonUtilities.disableButtonSkinForCSRMode();
                self.view.btnProceed.hoverSkin = CommonUtilities.disableButtonSkinForCSRMode();
            } else {
                self.view.btnProceed.onClick = function () {
                    self.setServerError(false);
                    if (self.view.flxAgree.isVisible && self.view.lblFavoriteEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                        self.view.flxWarning.setVisibility(true);
                        CommonUtilities.setText(self.view.lblWarning, kony.i18n.getLocalizedString("i18n.billPay.activateBillPayProceedError"), CommonUtilities.getaccessibilityConfig());
                    } else {
                        self.view.flxWarning.setVisibility(false);
                        var accountNumber;
                        //if(applicationManager.getConfigurationManager().isCombinedUser === "true")
                        //if(applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false)
                        accountNumber = self.view.segTransferFrom.selectedRowItems[0].accountID;
                        //             else
                        //                 accountNumber = self.view.listbxAccountType.selectedKey;
                        self.presenter.activateBillPay(accountNumber);
                    }
                };
            }
            self.view.forceLayout();
        },
        /**
         * used to set data for accounts in BillPay Actvation Screen
         * @param {object} billPayAccounts bill pay suported accounts
         */
        setAccountsForActivationScreen: function (billPayAccounts) {
            var listBoxData = FormControllerUtility.getListBoxDataFromObjects(billPayAccounts, "accountID", CommonUtilities.getAccountDisplayNameWithBalance);
            this.view.listbxAccountType.masterData = listBoxData;
            this.view.AllForms.isVisible = false;
            this.view.forceLayout();
        },
        /**
         * used to bind Terms and condition data on Activation screen
         * @param {object} TnCcontent bill pay supported sccounts
         */
        bindTnCData: function (TnCcontent) {
            if (TnCcontent.alreadySigned) {
                this.view.flxAgree.setVisibility(false);
            } else {
                CommonUtilities.disableButton(this.view.btnProceed);
                this.view.lblFavoriteEmailCheckBox.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                this.view.flxAgree.setVisibility(true);
                if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                    this.view.btnTandC.onClick = function () {
                        window.open(TnCcontent.termsAndConditionsContent);
                    };
                } else {
                    this.view.btnTandC.onClick = this.showTermsAndConditions;
                    this.setTnCDATASection(TnCcontent.termsAndConditionsContent);
                    FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, TnCcontent.termsAndConditionsContent);
                }
                this.view.flxClose.onClick = this.hideTermsAndConditions;
            }
        },
        /**
         * shows Terms and Conditions Popup.
         */
        showTermsAndConditions: function () {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxTermsAndConditionsPopUp.setVisibility(true);
            scopeObj.view.forceLayout();
        },
        /**
         * hides Terms and Conditions Popup.
         */
        hideTermsAndConditions: function () {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(false);
            scopeObj.view.flxTermsAndConditionsPopUp.setVisibility(false);
            scopeObj.view.forceLayout();
        },
        setTnCDATASection: function (content) {
            this.view.rtxTC.text = content;
        },
        toggleTnC: function (widget) {
            CommonUtilities.toggleFontCheckbox(widget);
            if ((widget.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) || !(this.view.segTransferFrom.selectedRowIndex)) {
                CommonUtilities.disableButton(this.view.btnProceed);
            } else {
                CommonUtilities.enableButton(this.view.btnProceed);
            }
        },
        /**
         * executes and displays the error flex in landing page.
         * @param {boolean} isError used to display the flex
         * @param {object} erroObj  get the exact error mesage
         */
        setServerError: function (isError, erroObj) {
            var scopeObj = this;
            var errorMessage;
            scopeObj.view.flxServerError.setVisibility(isError);
            if (isError) {
                scopeObj.view.rtxErrorMessage.text = kony.i18n.getLocalizedString("i18n.common.OoopsServerError");
                if (!kony.sdk.isNullOrUndefined(erroObj))
                    errorMessage = erroObj.errorMessage || erroObj;
                if (errorMessage) {
                    scopeObj.view.rtxErrorMessage.text = errorMessage;
                }
                scopeObj.view.forceLayout();
            }
        },
        getDataWithSections: function (accounts) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = ["Personal Accounts"];
            accounts.forEach(function (account) {
                var accountType = "Personal Accounts";
                if (account.isBusinessAccount === "false") {
                    //                     if(!kony.sdk.isNullOrUndefined(primaryCustomerId)){
                    if (scopeObj.primaryCustomerId.id === account.Membership_id && scopeObj.primaryCustomerId.type === 'personal') {
                        accountType = "Personal Accounts";
                    }
                    //                      }
                    else {
                        accountType = account.Membership_id;
                    }
                } else {
                    accountType = account.Membership_id;
                }
                if (finalData.hasOwnProperty(accountType) && account.Membership_id === finalData[accountType][0]["membershipId"]) {
                    if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                        finalData[accountType][1].pop();
                    }
                    finalData[accountType][1].push(scopeObj.createSegmentData(account));
                } else {
                    if (accountType !== "Personal Accounts")
                        prioritizeAccountTypes.push(accountType);
                    finalData[accountType] = [{
                        lblTransactionHeader: accountType === "Personal Accounts" ? accountType : account.MembershipName,
                        imgDropDown: "P",
                        flxDropDown: {
                            "onClick": function (context) {
                                scopeObj.showOrHideAccountRows(context);
                            }.bind(this)
                        },
                        template: "flxTransfersFromListHeader",
                        membershipId: account.Membership_id
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
        /**
         * create segment data with account type grouping
         */
        getDataWithAccountTypeSections: function (accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function (account) {
                var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                if (finalData.hasOwnProperty(accountType)) {
                    finalData[accountType][1].push(scopeObj.createSegmentData(account));
                } else {
                    finalData[accountType] = [{
                        lblTransactionHeader: {
                            text: accountType,
                            left: "10dp"
                        },
                        lblSeparator: {
                            "isVisible": "true"
                        },
                        imgDropDown: "P",
                        flxDropDown: {
                            "onClick": function (context) {
                                scopeObj.showOrHideAccountRows(context);
                            }.bind(this),
                            "isVisible": false
                        },
                        template: "flxTransfersFromListHeader",

                    },
                    [scopeObj.createSegmentData(account)]
                    ];
                }
            });
            this.sectionData = [];
            var data = [];
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                }
            }
            return data;
        },
        createSegmentData: function (account) {
            var dataObject = {
                //"lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.getAccountDisplayName(account) : (account.nickName ? account.nickName : account.name),
                "lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + CommonUtilities.getLastFourDigit(account.accountID) : CommonUtilities.getAccountDisplayName(account),
                "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : (account.bankName || account.phone || account.email)) : (CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance, false, account.currencyCode)),
                "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
                "currencyCode": account.currencyCode,
                "imgIcon": {
                    text: account.isBusinessAccount === "true" ? "r" : "s",
                    isVisible: this.profileAccess === "both" ? true : false
                },
                "lblAccType": account.accountType,
                "flxBankIcon": {
                    "isVisible": account.externalIndicator === "true" ? true : false,
                },
                "imgBankIcon": {
                    "src": "bank_icon_hdfc.png"
                },
                "flxAccountListItem": {
                    "isVisible": true
                }

            };
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
                var flxAccountListItem = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountListItem));
                flxAccountListItem["isVisible"] = isRowVisible;
                this.updateKeyAt("flxAccountListItem", flxAccountListItem, i, section);
            }
            segData = this.view.segTransferFromData;
            this.view.segTransferFrom.setSectionAt(segData[section], section);
        },
        updateKeyAt: function (widgetName, value, row, section) {
            var data = this.view.segTransferFrom.data;
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this.view.segTransferFrom.setDataAt(rowDataTobeUpdated, row, section);
        },
        initializeSegment: function (userData) {
            var scopeObj = this;
            //         if(applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false){
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            this.view.flxFromSegment.setVisibility(false);
            FormControllerUtility.disableButton(scopeObj.view.btnProceed);
            this.view.listbxAccountType.setVisibility(false);
            this.view.flxFrom.setVisibility(true);
            this.view.segTransferFrom.rowtemplate = "flxFromAccountsList";
            this.view.segTransferFrom.widgetDataMap = {
                "flxFromAccountsList": "flxFromAccountsList",
                "flxAccountListItem": "flxAccountListItem",
                "lblAccountName": "lblAccountName",
                "flxAmount": "flxAmount",
                "flxSeparator": "flxSeparator",
                "lblAmount": "lblAmount",
                "lblCurrencySymbol": "lblCurrencySymbol",
                "flxTransfersFromListHeader": "flxTransfersFromListHeader",
                "lblTransactionHeader": "lblTransactionHeader",
                "imgDropDown": "imgDropDown",
                "flxDropDown": "flxDropDown",
                "flxIcons": "flxIcons",
                "imgIcon": "imgIcon",
                "flxBankIcon": "flxBankIcon",
                "imgBankIcon": "imgBankIcon",
                "lblAccType": "lblAccType"
            };
            var widgetFromData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(userData) : this.getDataWithSections(userData);
            if (widgetFromData) {
                this.view.segTransferFrom.setData(widgetFromData);
                this.view.flxLoadingContainerFrom.setVisibility(false);
                this.view.flxNoResultsFrom.setVisibility(false);
            }
            const preferredAccNum = this.presenter.getBillPayPreferedAccountNumber();
            scopeObj.preSelectAccount(preferredAccNum);
            this.view.txtTransferFrom.onTouchStart = function () {
                scopeObj.view.flxTypeIcon.setVisibility(false);
                scopeObj.view.lblSelectAccount.setVisibility(false);
                scopeObj.view.flxFromSegment.setVisibility(true);
                scopeObj.view.segTransferFrom.setVisibility(true);
                scopeObj.view.lblFromAmount.setVisibility(false);
                scopeObj.view.forceLayout();
            };
            this.view.segTransferFrom.onRowClick = this.onAccountSelection;
            this.view.flxCancelFilterFrom.onClick = function () {
                scopeObj.view.txtTransferFrom.text = "";
                scopeObj.view.flxCancelFilterFrom.setVisibility(false);
                scopeObj.view.flxFromSegment.setVisibility(true);
            };
            this.view.flxFrom.onClick = function () {
                if (scopeObj.view.txtTransferFrom.isVisible === false) {
                    scopeObj.view.txtTransferFrom.setVisibility(true);
                    scopeObj.view.txtTransferFrom.setFocus();
                    scopeObj.view.lblSelectAccount.setVisibility(false);
                    scopeObj.view.flxTypeIcon.setVisibility(false);
                    scopeObj.view.lblFromAmount.setVisibility(false);
                    scopeObj.view.flxCancelFilterFrom.setVisibility(true);
                    scopeObj.view.flxFromSegment.setVisibility(true);
                }
            };
            //          }
        },
        /**
         * prefill the account
         */
        preSelectAccount: function (accId) {
            if (!accId) return;
            const scope = this;
            const segData = scope.view.segTransferFrom.data;
            let isAccountAvailable = false;
            for (let i = 0; i < segData.length; i++) {
                const sectionRow = segData[i][1];
                for (let j = 0; j < sectionRow.length; j++) {
                    if (sectionRow[j].accountID === accId) {
                        scope.view.segTransferFrom.selectedRowIndex = [i, j];
                        isAccountAvailable = true;
                        break;
                    }
                }
            }
            if (isAccountAvailable) scope.onAccountSelection();
        },
        /**
         * handle the UI when any account is selected
         */
        onAccountSelection: function () {
            const scopeObj = this;
            const segData = scopeObj.view.segTransferFrom.selectedRowItems[0];
            scopeObj.view.txtTransferFrom.text = segData.lblAccountName;
            // scopeObj.view.flxCancelFilterFrom.setVisibility(true);
            scopeObj.view.txtTransferFrom.setVisibility(false);
            scopeObj.view.flxCancelFilterFrom.setVisibility(false);
            scopeObj.view.lblSelectAccount.text = segData.lblAccountName;
            scopeObj.view.lblSelectAccount.setVisibility(true);
            //scopeObj.view.flxTypeIcon.setVisibility(true);
            scopeObj.view.flxTypeIcon.isVisible = scopeObj.profileAccess === "both" ? true : false;
            scopeObj.view.lblTypeIcon.isVisible = scopeObj.profileAccess === "both" ? true : false; //setVisibility(true);
            scopeObj.view.lblTypeIcon.text = segData.imgIcon.text;
            //scopeObj.view.lblFromAmount.setVisibility(true);
            //scopeObj.view.lblFromAmount.text = segData.lblAmount;
            scopeObj.view.flxFromSegment.setVisibility(false);
            if(scopeObj.view.flxAgree.isVisible) {
                if(scopeObj.view.lblFavoriteEmailCheckBox.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {FormControllerUtility.enableButton(scopeObj.view.btnProceed)}
                else {FormControllerUtility.disableButton(scopeObj.view.btnProceed)} 
            }
            else{ FormControllerUtility.enableButton(scopeObj.view.btnProceed);}
        }
    };
});