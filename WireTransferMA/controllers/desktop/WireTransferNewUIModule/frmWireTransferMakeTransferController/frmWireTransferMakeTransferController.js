define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants', 'IBANUtils'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants, IBANUtils) {
     
    var limits;
    return {
        limits: null,
        limitsError: null,
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
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxRightBar', 'wireTransferRightbar.flxInfo']);
            this.setInitialActions();
            this.makeTransferAmountField = FormControllerUtility.wrapAmountField(this.view.tbxAmount).onKeyUp(this.checkMakeTransferForm.bind(this));
            this.configManager = applicationManager.getConfigurationManager();

        },
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "Make Transfer");
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.wireTransferRightbar.setCallback(this.onCancel);
            this.accessibilityFocusSetup();
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.txtTransferFrom, this.view.flxFromtxt],
                [this.view.tbxAmount, this.view.flxAmountWithSymbol]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        onCancel: function() {
            this.getWireTransferModule().presentationController.showMakeTransferRecipientList();
        },
        /**
         * Binds initial widget actions - Should be called from pre show
         */
        setInitialActions: function() {
            var scopeObj = this;
            FormControllerUtility.updateWidgetsHeightInInfo(scopeObj, []);
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
        /**
         * Returns the wire Transfer Module
         * @returns {object} Reference to wire transfer module.
         */
        getWireTransferModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },

        updateFormUI: function(context) {
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.makeTransfer) {
                this.showMakeTransferForPayee(context.makeTransfer);
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
         * Make Transfer Entry point for a payee
         * @param {Payee} payeeObject payeeObject for which transfer needs to be done
         * @param {Accounts[]} checkingAccounts Checking Accounts of the user.
         */
        showMakeTransferForPayee: function(context) {
            var scopeObj = this;
            this.resetMakeTransferForm();
            this.fillPayeeDetailsForMakeTransfer(context.payee || context.transactionObject);
            this.selectedPayeeObject = context.payee || context.transactionObject;
            //var makeTransfer = this.view.MakeTransfer;
            // let toMembershipId = JSON.parse(context.payee.cif)[0].coreCustomerId.split(',');
            let toMembershipId = [];
            JSON.parse(context.payee.cif).forEach(x => toMembershipId.push(...x.coreCustomerId.split(',')));
            context.checkingAccounts = context.checkingAccounts.filter(x => toMembershipId.includes(x.Membership_id));

            this.initializeSegment(context.checkingAccounts);
            if (context.checkingAccounts.length > 0) {
                var listBoxData = FormControllerUtility.getListBoxDataFromObjects(context.checkingAccounts, "accountID", CommonUtilities.getAccountDisplayNameWithBalance);
                this.view.lbxFrom.masterData = listBoxData;
                //this.view.lbxFrom.selectedKey = listBoxData[0] ? listBoxData[0][0] : "";
                this.view.lbxFrom.onSelection = this.onFromAccountChanged.bind(this, context.checkingAccounts);
                this.view.flxNoAccountsFrom.setVisibility(false);
                this.view.lbxFrom.setVisibility(false);
                this.onFromAccountChanged(context.checkingAccounts);
            } else {
                this.view.lbxFrom.setVisibility(false);
                this.view.flxNoAccountsFrom.setVisibility(true);
            }
            this.view.lbxChooseCurrency.masterData = FormControllerUtility.getListBoxDataFromObjects(this.getCurrency(), "symbol", "name");
            this.view.lbxChooseCurrency.selectedKey = this.returnKeyForListboxFromValue(this.view.lbxChooseCurrency, applicationManager.getConfigurationManager().OLBConstants.CURRENCY_NAME);
            this.view.tbxNotes.onKeyUp = this.checkMakeTransferForm;
            this.view.btnStepContinue.onClick = this.checkTransactionLimit.bind(this);
            if (kony.sdk.isNullOrUndefined(context.onCancel)) {
                this.view.btnStepCancel.onClick = this.onCancel;
            } else {
                this.view.btnStepCancel.onClick = context.onCancel;
            }
            this.view.lbxChooseCurrency.onSelection = this.onCurrencyChanged.bind(this, this.view.lblCurrencySymbol);
            this.view.lblCurrencySymbol.text = this.configManager.configurations.items.CURRENCYCODE;
            this.showMakeTransferUI();
            if (context.transactionObject) {
                this.fillTransactionDetails(context.transactionObject, context.checkingAccounts);
            }
            this.view.forceLayout();
            this.checkMakeTransferForm();
        },

        onFromAccountChanged: function(accounts) {
            var fromAccount = (this.view.lbxFrom.selectedKey)?this.getFromAccount(accounts, this.view.lbxFrom.selectedKey):this.getFromAccount(accounts, accounts[0].Account_id);
            this.view.lblCurrencySymbol.text = applicationManager.getFormatUtilManager().getCurrencySymbol(fromAccount.currencyCode);
        },

        onCurrencyChanged: function(label, listbox) {
            label.text = listbox.selectedKeyValue ? listbox.selectedKeyValue[0] : listbox.masterData[0][0];
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
        /**
         * Show Make Transfer Repeat Details
         * @param {Object} transactionObject Transaction  Object for repeat
         * @param {Object} payee Payee  Object for repeat
         */
        fillTransactionDetails: function(transactionObject, fromAccountsList) {
            var makeTransfer = this.view.MakeTransfer;
            this.prefillFromAccount(transactionObject.fromAccountNumber, fromAccountsList);
            this.view.lbxFrom.selectedKey = transactionObject.fromAccountNumber;
            this.view.lbxChooseCurrency.selectedKey = this.returnKeyForListboxFromValue(this.view.lbxChooseCurrency, transactionObject.currency);
            this.view.tbxAmount.text = CommonUtilities.formatCurrencyWithCommas(transactionObject.amount, true);
            this.view.tbxNotes.text = transactionObject.transactionsNotes;
            this.onCurrencyChanged(this.view.lblCurrencySymbol, this.view.lbxChooseCurrency);
            //             if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
           
            //             }
            if (transactionObject.fromAccountNumber != null && transactionObject.payeeCurrency != null && transactionObject.amount != null) {
                FormControllerUtility.enableButton(this.view.btnStepContinue);
            }


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
            // if (configurationManager.isCombinedUser === "true") {
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
         * Ui logic for showing make transfer form.
         */
        showMakeTransferUI: function() {
            this.view.flxTermsAndConditions.setVisibility(true);
            this.view.flxHeader.setFocus(true);
            this.view.tbxNotes.placeholder = kony.i18n.getLocalizedString("i18n.wireTransfer.enterReasonForTransfer");
        },
        /**
         * Checks the Wire Transfer form for completion and enable/disable the continue button.
         */
        checkMakeTransferForm: function() {
            if (this.makeTransferAmountField.isValidAmount() && this.makeTransferAmountField.getAmountValue() > 0 && this.getWireTransferData().fromAccountNumber !== "TestKey") {
                FormControllerUtility.enableButton(this.view.btnStepContinue);
            } else {
                FormControllerUtility.disableButton(this.view.btnStepContinue);
            }
        },
        /**
         * Returns the data for a Wire Transfer
         * @returns {object} Key value data for wire transfer
         */
        getWireTransferData: function() {
            this.view.lbxChooseCurrency.selectedKey = this.view.lblCurrencySymbol.text;
            var accountName;
            var accountNumber;
            var fromAccountType;
            //              if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            accountName = this.view.segTransferFrom.selectedRowItems[0].lblAccountName;
            accountNumber = this.view.segTransferFrom.selectedRowItems[0].accountID;
            fromAccountType = this.view.segTransferFrom.selectedRowItems[0].imgIcon.text;
            //              }else{
            //                accountName = this.view.lbxFrom.selectedKeyValue[1];
            //                accountNumber = this.view.lbxFrom.selectedKeyValue[0];
            //              }

            return {
                payeeObject: this.selectedPayeeObject,
                // fromAccountName: this.view.lbxFrom.selectedKeyValue[1],
                // fromAccountNumber: this.view.lbxFrom.selectedKeyValue[0],
                fromAccountType: fromAccountType,
                fromAccountName: accountName,
                fromAccountNumber: accountNumber,
                currencySymbol: this.view.lbxChooseCurrency.selectedKeyValue[0],
                currency: applicationManager.getConfigurationManager().getWireTransferCurrency(this.view.lbxChooseCurrency.selectedKeyValue[0]),
                amount: this.makeTransferAmountField.getAmount(),
                transactionFee: applicationManager.getConfigurationManager().wireTranferFees,
                reasonForTransfer: (this.view.tbxNotes.text != undefined || this.view.tbxNotes.text != null) ? this.view.tbxNotes.text.trim() : ""
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
                this.onMakeTransferContinue(viewModel);
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

        hideFieldError: function() {
            this.view.flxDowntimeWarning.setVisibility(false);
        },
        /**
         * Called when make transfer continue button is pressed.
         */
        onMakeTransferContinue: function() {
            this.hideFieldError();
            this.getWireTransferModule().presentationController.navigateToConfirmationScreen(this.getWireTransferData(), this.onCancel);
        },
        /**
         * Get standard currencies name with their symbols
         * @returns {objetc[]} - array of JSONs with currency name and symbol
         */
        getCurrency: function() {
            return applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.CURRENCIES;
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
                return item[0] === applicationManager.getFormatUtilManager().getCurrencySymbol(value) || item[1] ===value
            });
            return data[0] ? data[0][0] : listbox.masterData[0][0];
        },
        /**
         * Resets the make transfer form.
         */
        resetMakeTransferForm: function() {
            FormControllerUtility.disableButton(this.view.btnStepContinue);
            this.view.tbxAmount.text = "";
            this.view.tbxNotes.text = "";
            this.view.flxDowntimeWarning.setVisibility(false);
        },
        /**
         * Fills the payee details in make transfer form
         * @param {Payee} payeeObject Payee object for transfer
         */
        fillPayeeDetailsForMakeTransfer: function(payeeObject) {
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (this.profileAccess === "both") {
                this.view.lblToIcon.text = payeeObject.isBusinessPayee === "1" ? "r" : "s";
                this.view.lblToIcon.setVisibility(false);
            } else {
                this.view.lblToIcon.setVisibility(false);
            }
            this.view.lblTo.text = kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " : " + payeeObject.payeeNickName;
            this.view.lblBank.text = kony.i18n.getLocalizedString("i18n.CheckImages.Bank") + " : " + payeeObject.bankName;
            this.view.flxCurrency.isVisible = (payeeObject.wireAccountType === applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) ? false : true;
        },


        /**
         * creates segment with account numbers and other details with particular header values
         */
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
         *  creates the row template with account number and other details
         */

        createSegmentData: function(account) {
            var orientationHandler = new OrientationHandler();
            var isMobileDevice = ((kony.application.getCurrentBreakpoint() === 640) || orientationHandler.isMobile);
            var dataObject = {
                // "lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.getAccountDisplayName(account) : (account.nickName ? account.nickName : account.name),
                "lblAccountName": (account.accountID || account.Account_id) ? (isMobileDevice ? CommonUtilities.truncateStringWithGivenLength(account.accountName + "....", 15) + CommonUtilities.getLastFourDigit(account.accountID) : CommonUtilities.getAccountDisplayName(account)) : account.nickName,
                "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : (account.bankName || account.phone || account.email)) : (CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance, false, account.currencyCode)),
                "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
                "currencyCode": account.currencyCode,
                "imgIcon": {
                    "text": account.isBusinessAccount === "true" ? "r" : "s",
                    //"isVisible" : applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                    "isVisible": this.profileAccess === "both" ? true : false
                },
                "lblAccType": {
					"text": account.accountType,
					"left": this.profileAccess === "both" ? "7px" : "20px",
				},
                "imgBankIcon": {
                    //if ( account.externalIndicator === "true") {
                    "isVisible": account.externalIndicator === "true" ? true : false,

                    "src": this.getBankIcon(account)
                },
                "flxBankIcon": {
                    "isVisible": account.externalIndicator === "true" ? true : false
                },
                "flxAccountListItem": {
                    "isVisible": true
                },
              "lblSeparator": {
                  "isVisible": true
                }
            };
            return dataObject;
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
         * Initialises the segment data if its a combined user
         */
        initializeSegment: function(userData) {
            var scopeObj = this;
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"|| applicationManager.getConfigurationManager().isSMEUser === "true"){
            //if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                this.view.lbxFrom.setVisibility(false);
                this.view.flxFromtxt.setVisibility(true);
                //this.view.lblToIcon.setVisibility(true);
                //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
                if (this.profileAccess === "both") {
                    this.view.lblToIcon.setVisibility(false);
                } else {
                    this.view.lblToIcon.setVisibility(false);
                }
                this.view.flxTypeIcon.setVisibility(false);
                this.view.lblSelectAccount.text = "";
                this.view.lblTypeIcon.text = "";
                this.view.lblFromAmount.text = "";
                this.view.txtTransferFrom.setVisibility(true);
                this.view.flxFromSegment.setVisibility(false);
                this.view.txtTransferFrom.text = "";
                this.view.segTransferFrom.rowtemplate = "flxFromAccountsList";
                this.view.segTransferFrom.widgetDataMap = {
                    "flxFromAccountsList": "flxFromAccountsList",
                    "flxAccountListItem": "flxAccountListItem",
                    "lblAccountName": "lblAccountName",
                    "flxAmount": "flxAmount",
                    "flxSeparator": "flxSeparator",
                    "lblSeparator": "lblSeparator",
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
                var widgetFromData = this.getDataWithSections(userData);
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
                    scopeObj.view.lblCurrencySymbol.text = scopeObj.configManager.currencyCode[segData.currencyCode]
                    // scopeObj.view.flxCancelFilterFrom.setVisibility(true);
                    scopeObj.view.txtTransferFrom.setVisibility(false);
                    scopeObj.view.flxCancelFilterFrom.setVisibility(false);
                    scopeObj.view.lblSelectAccount.text = segData.lblAccountName;
                    scopeObj.view.lblSelectAccount.setVisibility(true);
                    //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
                    if (this.profileAccess === "both") {
                        scopeObj.view.flxTypeIcon.setVisibility(true);
                    } else {
                        scopeObj.view.flxTypeIcon.setVisibility(false);
                    }
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
            //}
        },

    };
});