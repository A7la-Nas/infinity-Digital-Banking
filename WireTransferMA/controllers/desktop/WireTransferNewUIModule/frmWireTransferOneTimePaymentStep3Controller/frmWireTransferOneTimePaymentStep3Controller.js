define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        isSingleCustomerProfile: true,
        primaryCustomerId: [],
        profileAccess: "",
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxRightBar', 'flxMain', 'wireTransferRightbar.flxInfo']);
            this.setInitialActions();
            this.makeTransferAmountField = FormControllerUtility.wrapAmountField(this.view.tbxAmount).onKeyUp(this.checkMakeTransferForm.bind(this));
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "Add Recipient");
            applicationManager.getNavigationManager().applyUpdates(this);
            this.accessibilityFocusSetup();
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.txtTransferFrom, this.view.flxFromtxt],
                [this.view.tbxAmount, this.view.flxAmount]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        /**
         * Binds initial widget actions - Should be called from pre show
         */
        setInitialActions: function() {
            var scopeObj = this;
            this.view.wireTransferRightbar.flxInfo.onClick = this.showOneTimeTransferInfo.bind(this);
            this.view.AllFormsConfirmDetails.flxCross.onClick = function() {
                scopeObj.view.AllFormsConfirmDetails.setVisibility(false);
            };
        },
        /**
         * Shows I-icon for one time transfer
         */
        showOneTimeTransferInfo: function() {
            var scopeObj = this;
            if (scopeObj.view.AllFormsConfirmDetails.isVisible === false) {
                scopeObj.view.AllFormsConfirmDetails.isVisible = true;
                scopeObj.view.AllFormsConfirmDetails.left = scopeObj.view.flxRightBar.info.frame.x + scopeObj.view.wireTransferRightbar.flxInfo.info.frame.x - 135 + "dp";
                scopeObj.view.AllFormsConfirmDetails.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.WireTransfer.msgInfo2OneTime");
                if (scopeObj.view.wireTransferRightbar.flxAccountInfoForAccountTransfer.isVisible === true) scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.info.frame.height - 80 + "dp";
                else scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.info.frame.height - 10 + "dp";
                scopeObj.view.forceLayout();
            } else scopeObj.view.AllFormsConfirmDetails.isVisible = false;
        },
        updateFormUI: function(context) {
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.makeTransfer) {
                this.showOneTimeTransferTransactionDetails(context.makeTransfer);
            }
            if (context.limits) {
                this.limits = context.limits;
            }
            if (context.errorResponse) {
                this.limitsError = context.errorResponse.errorMessage;
            }
            if (context.wireTransferError) {
                this.showMakeTransferUI();
                this.showServerError(context.wireTransferError.errorMessage);
            }
        },
        /**
         * Checks the Wire Transfer form for completion and enable/disable the continue button.
         */
        checkMakeTransferForm: function() {
            if (this.makeTransferAmountField.isValidAmount() && this.makeTransferAmountField.getAmountValue() > 0 && this.getWireTransferData().fromAccountNumber !== "TestKey") {
                FormControllerUtility.enableButton(this.view.btnStep3MakeTransfer);
            } else {
                FormControllerUtility.disableButton(this.view.btnStep3MakeTransfer);
            }
        },
        hideFieldError: function() {
            this.view.flxDowntimeWarning.setVisibility(false);
        },
        /**
         * Returns the wire Transfer Module
         * @returns {object} Reference to wire transfer module.
         */
        getWireTransferModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },

        /**
         * Ui logic for showing make transfer form.
         */
        showMakeTransferUI: function() {
            this.view.flxTermsAndConditions.setVisibility(true);
            this.view.flxHeader.setFocus(true);
            this.view.tbxNote.placeholder = kony.i18n.getLocalizedString("i18n.wireTransfer.enterReasonForTransfer");
        },
        /**
         * Returns the data for a Wire Transfer
         * @returns {object} Key value data for wire transfer
         */
        getWireTransferData: function() {
            this.view.lbxStep3Currency.selectedKey = this.view.lblCurrencySymbol.text;
            var accountName;
            var accountNumber;
            var fromAccountType;
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                accountName = this.view.segTransferFrom.selectedRowItems[0].lblAccountName;
                accountNumber = this.view.segTransferFrom.selectedRowItems[0].accountID;
                fromAccountType = this.view.segTransferFrom.selectedRowItems[0].imgIcon.text;
            } else {
                accountName = this.view.segTransferFrom.selectedRowItems[0].lblAccountName;
                accountNumber = this.view.segTransferFrom.selectedRowItems[0].accountID;
            }

            return {
                payeeObject: this.selectedPayeeObject,
                // fromAccountName: this.view.lbxStep3From.selectedKeyValue[1],
                // fromAccountNumber: this.view.lbxStep3From.selectedKeyValue[0],
                fromAccountNumber: accountNumber,
                fromAccountName: accountName,
                fromAccountType: fromAccountType,
                currencySymbol: this.view.lbxStep3Currency.selectedKeyValue[0],
                currency: applicationManager.getConfigurationManager().getWireTransferCurrency(this.view.lbxStep3Currency.selectedKeyValue[0]),
                amount: this.makeTransferAmountField.getAmount(),
                transactionFee: applicationManager.getConfigurationManager().wireTranferFees,
                reasonForTransfer: this.view.tbxNote.text.trim()
            }
        },
        checkTransactionLimit: function(viewModel) {
            var payeeObj = this.getWireTransferData();
            if (!this.limits) {
                var featureAction = payeeObj.payeeObject.wireAccountType === "Domestic" ? "DOMESTIC_WIRE_TRANSFER_CREATE" : "INTERNATIONAL_WIRE_TRANSFER_CREATE";
                this.getWireTransferModule().presentationController.getLimits(featureAction);
                if (this.limitsError) {
                    //show Error flex
                    this.showDenialError(this.limitsError);
                    return;
                }
            }
            var limit = this.limits.accounts.filter(this.userAccountsFilter.bind(this, payeeObj));
            var viewmodel = {};
            var errMsg = "";
            viewmodel.limit = limit[0].limits;
            if (parseFloat(payeeObj.amount) < parseFloat(viewmodel.limit.MIN_TRANSACTION_LIMIT)) {
                errMsg = kony.i18n.getLocalizedString("i18n.common.minTransactionError") + " " + CommonUtilities.formatCurrencyWithCommas(viewmodel.limit.MIN_TRANSACTION_LIMIT);
            } else if (parseFloat(payeeObj.amount) > parseFloat(viewmodel.limit.MAX_TRANSACTION_LIMIT)) {
                errMsg = kony.i18n.getLocalizedString("i18n.common.maxTransactionError") + " " + CommonUtilities.formatCurrencyWithCommas(viewmodel.limit.MAX_TRANSACTION_LIMIT);
            } else {
                if (viewmodel.limit.AUTO_DENIED_TRANSACTION_LIMIT) {
                    var minValue = Math.min(parseFloat(viewmodel.limit.AUTO_DENIED_TRANSACTION_LIMIT), parseFloat(viewmodel.limit.MAX_TRANSACTION_LIMIT));
                    if (parseFloat(payeeObj.amount) > minValue) {
                        errMsg = kony.i18n.getLocalizedString("i18n.common.maxTransactionError") + " " + CommonUtilities.formatCurrencyWithCommas(minValue);
                    }
                }
            }
            if (errMsg !== "") {
                this.showDenialError(errMsg);
            } else {
                this.onMakeTransferContinue(payeeObj);
            }
        },

        showDenialError: function(errMsg) {
            this.showServerError(errMsg);
        },

        userAccountsFilter: function(formData, userAccount) {
            if (formData.fromAccountNumber === userAccount.accountId) {
                return userAccount.limits;
            }
        },

        /**
         * Handle server error, shows serverFlex
         * @param {object} serverError error
         */
        showServerError: function(serverError) {
            this.view.flxDowntimeWarning.setVisibility(true);
            this.view.rtxDowntimeWarning.setVisibility(true);
            this.view.rtxDowntimeWarning.text = serverError;
            this.view.forceLayout();
            //this.AdjustScreen();
        },
        /**
         * Called when make transfer continue button is pressed.
         */
        onMakeTransferContinue: function() {
            this.hideFieldError();
            this.getWireTransferModule().presentationController.navigateToConfirmationScreen(this.getWireTransferData());
        },
        /**
         * Shows transactions details form for one time transfer and binds actions
         * @member frmWireTransferController
         * @param  {object} data  - Data from backend
         * @param  {function} [onCancel]  - Optional callback for cancel button
         */
        showOneTimeTransferTransactionDetails: function(data, onCancel) {
            var payee = data.payee;
            this.resetMakeTransferForm();
            this.initializeSegment(data.checkingAccounts);
            this.fillPayeeDetailsForMakeTransfer(data.payee || data.transactionObject, data.checkingAccounts);
            this.selectedPayeeObject = data.payee || data.transactionObject;
            if (data.checkingAccounts.length > 0) {
                var listBoxData = FormControllerUtility.getListBoxDataFromObjects(data.checkingAccounts, "accountID", CommonUtilities.getAccountDisplayNameWithBalance);
                this.view.lbxStep3From.masterData = listBoxData;
                this.view.lbxStep3From.selectedKey = listBoxData[0] ? listBoxData[0][0] : "";
                this.view.lbxStep3From.onSelection = this.onFromAccountChanged.bind(this, data.checkingAccounts);
                this.onFromAccountChanged(data.checkingAccounts);
            } else {
                this.view.lbxStep3From.setVisibility(true);
            }
            //             var listBoxData = FormControllerUtility.getListBoxDataFromObjects(data.checkingAccounts, "accountID", CommonUtilities.getAccountDisplayNameWithBalance);
            //             this.view.lbxStep3From.masterData = listBoxData;
            this.setCurrencyData();
            this.configureCurrencyField(payee.wireAccountType);
            //             this.view.lbxStep3From.onSelection = this.onFromAccountChanged.bind(this, data.checkingAccounts);
            //             this.onFromAccountChanged(data.checkingAccounts);
            this.view.lblToValue.text = payee.payeeNickName;
            this.view.lblBankValue.text = payee.bankName;
            this.view.tbxNote.onKeyUp = this.checkMakeTransferForm;
            this.view.btnStep3Back.onClick = this.setOneTimeTransferStep.bind(this);
            this.view.btnStep3Cancel.onClick = this.showConfirmDialog.bind(this, "i18n.PayAPerson.Quit", "i18n.wireTransfer.cancelOneTimeTransfer", onCancel, "i18n.common.noDontCancel", "i18n.transfers.Cancel");
            this.view.btnStep3MakeTransfer.onClick = this.checkTransactionLimit.bind(this, onCancel);
            this.view.forceLayout();
            this.checkMakeTransferForm();
        },
        /**
         * Resets the make transfer form.
         */
        resetMakeTransferForm: function() {
            FormControllerUtility.disableButton(this.view.btnStep3MakeTransfer);
            this.view.tbxAmount.text = "";
            this.view.tbxNote.text = "";
            this.hideFieldError();
        },
        /**
         * Fills the payee details in make transfer form
         * @param {Payee} payeeObject Payee object for transfer
         */
        fillPayeeDetailsForMakeTransfer: function(payeeObject, accounts) {
            this.view.lblToValue.text = kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " : " + payeeObject.payeeNickName;
            this.view.lblBankValue.text = kony.i18n.getLocalizedString("i18n.CheckImages.Bank") + " : " + payeeObject.bankName;
            this.view.flxStep3Currency.isVisible = (payeeObject.wireAccountType === applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) ? false : true;
            if (payeeObject.isModify === "true") {
                this.prefillFromAccount(payeeObject.fromAccountNumber, accounts);
                this.view.tbxNote.text = payeeObject.transactionsNotes;
                this.view.tbxAmount.text = CommonUtilities.formatCurrencyWithCommas(payeeObject.amount, true);
            }
        },
        setOneTimeTransferStep: function() {
            // applicationManager.getNavigationManager().navigateTo("frmWireTransferOneTimePaymentStep2");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmWireTransferOneTimePaymentStep2": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
        },


        prefillFromAccount: function(accountFrom, fromAccountsList) {
            var configurationManager = applicationManager.getConfigurationManager();
            var account = {};
            if (fromAccountsList) {
                account = fromAccountsList.filter(function(record) {
                    return ((record["accountID"] && record["accountID"].toUpperCase() === accountFrom.toUpperCase()) || (record["accountNumber"] && record["accountNumber"].toUpperCase() === accountFrom.toUpperCase()));
                });
            }
            this.view.txtTransferFrom.text = (account[0].accountID || account[0].Account_id) ? CommonUtilities.getAccountDisplayName(account[0]) : account[0].nickName;
            this.view.txtTransferFrom.setVisibility(false);
            this.view.flxCancelFilterFrom.setVisibility(false);
            CommonUtilities.setText(this.view.lblSelectAccount, (account[0].accountID || account[0].Account_id) ? CommonUtilities.getAccountDisplayName(account[0]) : account[0].nickName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(this.view.lblFromAmount, (account[0].accountType !== "CreditCard") ? CommonUtilities.formatCurrencyWithCommas(account[0].availableBalance, false, account[0].currencyCode) : CommonUtilities.formatCurrencyWithCommas(account[0].availableCredit, false, account[0].currencyCode), CommonUtilities.getaccessibilityConfig());
            this.view.lblSelectAccount.setVisibility(true);
            this.view.lblFromAmount.setVisibility(true);
            this.view.lblCurrencySymbol.text = applicationManager.getFormatUtilManager().getCurrencySymbol(account[0].currencyCode);
            var posi = 0,
                posj = 0;
            var fromSelectedId = (account[0].accountID || account[0].Account_id);
            //if (configurationManager.isCombinedUser === "true") {
            if (this.profileAccess === "both") {
                this.view.flxTypeIcon.setVisibility(true);
                this.view.lblTypeIcon.text = account[0].isBusinessAccount === "true" ? "r" : "s";
            } else {
                this.view.flxTypeIcon.setVisibility(false);
            }
            var widgetFromData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(fromAccountsList) : this.getDataWithSections(fromAccountsList);
            for (var i = 0; i < widgetFromData.length; i++) {
                for (var j = 0; j < widgetFromData[i][1].length; j++) {
                    if (widgetFromData[i][1][j].accountID === fromSelectedId) {
                        posi = i;
                        posj = j;
                        break;
                    }
                }
            }
            this.view.segTransferFrom.selectedRowIndex = [posi, posj];
        },

        /**
         * Show Confirm Dialog
         * @param {string} headingKey  - i18n of heading
         * @param {string} messageKey  - i18n of message
         * @param {function} onYesPressed  - callback for yes button
         * @param {string} noBtnTooltip  - i18n for tooltip
         * @param {string} yesBtnTooltip - i18n of tooltip
         */
        showConfirmDialog: function(headingKey, messageKey, onYesPressed, noBtnTooltip, yesBtnTooltip) {
            this.view.flxDialogs.setVisibility(true);
            this.view.flxPopup.setVisibility(true);
            var height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height;
            this.view.flxPopup.height = height + "dp";
            this.view.CustomPopup.setFocus(true);
            if (noBtnTooltip) {
                this.view.CustomPopup.btnNo.toolTip = kony.i18n.getLocalizedString(noBtnTooltip);
            } else {
                this.view.CustomPopup.btnNo.toolTip = kony.i18n.getLocalizedString("i18n.common.no");
            }
            if (yesBtnTooltip) {
                this.view.CustomPopup.btnYes.toolTip = kony.i18n.getLocalizedString(yesBtnTooltip);
            } else {
                this.view.CustomPopup.btnYes.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
            }
            this.view.CustomPopup.lblHeading.text = kony.i18n.getLocalizedString(headingKey);
            this.view.CustomPopup.lblPopupMessage.text = kony.i18n.getLocalizedString(messageKey);
            this.view.forceLayout();
            //Quit Pop-Up Message Box
            this.view.CustomPopup.flxCross.onClick = function() {
                this.view.flxPopup.setVisibility(false);
            }.bind(this);
            this.view.CustomPopup.btnNo.onClick = function() {
                this.view.flxPopup.setVisibility(false);
                this.view.flxDialogs.setVisibility(false);
            }.bind(this);
            this.view.CustomPopup.btnYes.onClick = function() {
                this.view.flxPopup.setVisibility(false);
                if (onYesPressed !== undefined || typeof onYesPressed === "function")
                    onYesPressed();
                else {
                    var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                    wireTransferNewModule.presentationController.showLandingPageView();
                }
                //this.disableTnC();
            }.bind(this);
        },
        /**
         * Sets Currency Values for One time transfer
         */
        setCurrencyData: function() {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            this.view.lbxStep3Currency.masterData = FormControllerUtility.getListBoxDataFromObjects(this.getCurrency(), "symbol", "name");
            this.view.lbxStep3Currency.selectedKey = this.returnKeyForListboxFromValue(this.view.lbxStep3Currency, OLBConstants.CURRENCY_NAME); //To set Dollar BY-DEFAULT
            this.onCurrencyChanged(this.view.lblCurrencySymbol, this.view.lbxStep3Currency);
        },
        /**
         * Return key corresponding to value for Listbox
         * @param {widget} listbox -widget Id
         * @param {string} value -value for which key need to be searched
         * @returns {string} Key of the listbox
         */
        returnKeyForListboxFromValue: function(listbox, value) {
            var data = listbox.masterData;
            data = data.filter(function(item) {
                return item[1] === value
            });
            return data[0] ? data[0][0] : listbox.masterData[0][0];
        },
        onCurrencyChanged: function(label, listbox) {
            label.text = listbox.selectedKeyValue ? listbox.selectedKeyValue[0] : listbox.masterData[0][0];
        },
        /**
         * Get standard currencies name with their symbols
         * @returns {objetc[]} - array of JSONs with currency name and symbol
         */
        getCurrency: function() {
            return applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.CURRENCIES;
        },
        /**
         * Confgures the currency field in OTT
         * @param {string} accountType - DOmestic/International
         */
        configureCurrencyField: function(accountType) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            if (accountType === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) {
                this.view.flxStep3Currency.setVisibility(false);
            } else {
                this.view.flxStep3Currency.setVisibility(true);
                this.view.lbxStep3Currency.onSelection = this.onCurrencyChanged.bind(this, this.view.lblCurrencySymbol);
            }
        },

        onFromAccountChanged: function(accounts) {
            var fromAccount = this.getFromAccount(accounts, this.view.lbxStep3From.selectedKey);
            this.view.lblCurrencySymbol.text = applicationManager.getFormatUtilManager().getCurrencySymbol(fromAccount.currencyCode);
        },
        /**
         * Return account object corresponding to account number for Listbox
         * @param {widget} listbox -widget Id
         * @param {string} value -value for which account object needs to be searched
         * @returns {string} Key of the listbox
         */
        getFromAccount: function(accounts, value) {
            var data = accounts;
            data = data.filter(function(item) {
                return item.accountID === value
            });
            return data[0];
        },

        getDataWithSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = ["Personal Accounts"];
            accounts.forEach(function(account) {
                var accountType = kony.i18n.getLocalizedString("i18n.accounts.personalAccounts");
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
                account.accountRoleType = accountType;

                if (finalData.hasOwnProperty(accountType) && account.Membership_id === finalData[accountType][0]["membershipId"]) {
                    if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                        finalData[accountType][1].pop();
                    }
                    finalData[accountType][1].push(scopeObj.createSegmentData(account));
                } else {
                    if(accountType !== "Personal Accounts")
                      prioritizeAccountTypes.push(accountType);
                    finalData[accountType] = [{
                            lblTransactionHeader: accountType === "Personal Accounts" ? accountType : account.MembershipName,
                            imgDropDown: "P",
                            flxDropDown: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context)
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

        /*create segment data with account type grouping
         */
        getDataWithAccountTypeSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function(account) {
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
                                "onClick": function(context) {
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


        /**
         *  creates the row template with account number and other details
         */

        createSegmentData: function(account) {
            var dataObject = {
                "lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.getAccountDisplayName(account) : (account.nickName ? account.nickName : account.name),
                "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : (account.bankName || account.phone || account.email)) : (CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance, false, account.currencyCode)),
                "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
                "currencyCode": account.currencyCode,
                "imgIcon": {
                    "text": account.isBusinessAccount === "true" ? "r" : "s",
                    //"isVisible" : applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                    "isVisible": this.profileAccess === "both" ? true : false
                },
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
            return dataObject;
        },

        /*  Fetches the img on basis bank name
         */
        getBankIcon: function(account) {
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
        /**
         * It shows or hides the particular section 
         */
        showOrHideAccountRows: function(context) {
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
            segData = this.view.segTransferFromData;
            this.view.segTransferFrom.setSectionAt(segData[section], section);
        },

        updateKeyAt: function(widgetName, value, row, section) {
            var data = this.view.segTransferFrom.data;
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this.view.segTransferFrom.setDataAt(rowDataTobeUpdated, row, section);
        },


        /**
         * Initialises the segment data if its a combined or a business user
         */
        initializeSegment: function(userData) {
            var scopeObj = this;
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"||applicationManager.getConfigurationManager().isSMEUser === "true"){
            //if(applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false||applicationManager.getConfigurationManager().isSMEUser === "true"){
            this.view.lbxStep3From.setVisibility(false);
            this.view.flxFromtxt.setVisibility(true);
            // this.view.lblToIcon.setVisibility(true);
            this.view.flxTypeIcon.setVisibility(false);
            this.view.lblSelectAccount.text = "";
            this.view.lblTypeIcon.text = "";
            this.view.lblFromAmount.text = "";
            this.view.txtTransferFrom.setVisibility(true);
            this.view.flxFromSegment.setVisibility(false);
            this.view.txtTransferFrom.text = "";
            // this.view.lblToIcon.setVisibility(true);
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
            var widgetFromData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(userData) : this.getDataWithSections(userData);
            if (widgetFromData) {
                this.view.segTransferFrom.setData(widgetFromData);
                this.view.flxLoadingContainerFrom.setVisibility(false);
                this.view.flxNoResultsFrom.setVisibility(false);
            }
            this.view.txtTransferFrom.onTouchStart = function() {
                scopeObj.view.flxTypeIcon.setVisibility(false);
                scopeObj.view.lblSelectAccount.setVisibility(false);
                scopeObj.view.flxFromSegment.setVisibility(true);
                scopeObj.view.segTransferFrom.setVisibility(true);
                scopeObj.view.lblFromAmount.setVisibility(false);
                scopeObj.view.forceLayout();
            };
            this.view.segTransferFrom.onRowClick = function() {
                var segData = scopeObj.view.segTransferFrom.selectedRowItems[0];
                scopeObj.view.txtTransferFrom.text = segData.lblAccountName;
                // scopeObj.view.flxCancelFilterFrom.setVisibility(true);
                scopeObj.view.txtTransferFrom.setVisibility(false);
                scopeObj.view.flxCancelFilterFrom.setVisibility(false);
                scopeObj.view.lblSelectAccount.text = segData.lblAccountName;
                scopeObj.view.lblSelectAccount.setVisibility(true);
                scopeObj.view.flxTypeIcon.setVisibility(true);
                scopeObj.view.lblTypeIcon.setVisibility(true);
                scopeObj.view.lblTypeIcon.text = segData.imgIcon.text;
                scopeObj.view.lblFromAmount.setVisibility(true);
                scopeObj.view.lblFromAmount.text = segData.lblAmount;
                scopeObj.view.flxFromSegment.setVisibility(false);

            };
            this.view.flxCancelFilterFrom.onClick = function() {
                scopeObj.view.txtTransferFrom.text = "";
                scopeObj.view.flxCancelFilterFrom.setVisibility(false);
                scopeObj.view.flxFromSegment.setVisibility(true);
            };

            this.view.flxFromtxt.onClick = function() {
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
            //           }
        },

    };
});