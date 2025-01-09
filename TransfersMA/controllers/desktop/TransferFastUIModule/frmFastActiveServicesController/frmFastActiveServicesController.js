define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        init: function () {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = function () {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
            this.view.btnActivate.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.activate");
            this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
        },
        preShow: function () {
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "Transfer Money");
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.flxDialogs.setVisibility(false);
            FormControllerUtility.disableButton(this.view.btnActivate);
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
        },
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CancelCustomPopup.onBreakpointChangeComponent(scope.view.CancelCustomPopup, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
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
                this.setUserActivationDetails(viewModel);
            }
            if (viewModel.serverError) {
                this.view.rtxDowntimeWarning.text = viewModel.serverError;
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.flxFormContent.forceLayout();
            }
        },
        /**
         * sets user activation data in confirmation page.
         * @param {Object} userData - contains recepient info like name, phone number, email and transaction object fields like deposit account number and name.
         */
        setUserActivationDetails: function (userData) {
            var scopeObj = this;
            scopeObj.view.tbxNameValue.text = userData.userDetails.userName;
            scopeObj.view.tbxRegisteredPhoneValue.text = userData.userDetails.phone;
            scopeObj.view.tbxRegisteredEmailValue.text = userData.userDetails.email;
            this.initializeSegment(userData);
            scopeObj.view.listbxAcccFrDeposit.masterData = scopeObj.showAccountsForP2PActiveSettings(userData.accounts);
            scopeObj.view.tbxNameValue.setEnabled(false);
            scopeObj.view.tbxRegisteredPhoneValue.setEnabled(false);
            scopeObj.view.tbxRegisteredEmailValue.setEnabled(false);
           scopeObj.view.listbxAcccFrDeposit.onSelection = function(){
                scopeObj.view.listbxAcccFrDeposit.selectedKey ?  FormControllerUtility.enableButton(scopeObj.view.btnActivate) :  FormControllerUtility.disableButton(scopeObj.view.btnActivate)
            };
            scopeObj.view.btnActivate.onClick = function () {
                //if(applicationManager.getConfigurationManager().isCombinedUser === "true")
                if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) scopeObj.transfersFastPresentationController.ActivateP2P({
                    "defaultDepositAccount": scopeObj.view.segTransferFrom.selectedRowItems[0].accountID,
                    "formId": kony.application.getCurrentForm().id
                });
                else scopeObj.transfersFastPresentationController.ActivateP2P({
                    "defaultDepositAccount": scopeObj.view.listbxAcccFrDeposit.selectedKey,
                    "formId": kony.application.getCurrentForm().id
                });
            };
            scopeObj.view.btnCancel.onClick = function () {
                scopeObj.showCancelPopUp();
            }
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
         * shows the cancel activation popup.
         */
        showCancelPopUp: function () {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopUp.setVisibility(true);
            scopeObj.view.CancelCustomPopup.btnYes.onClick = function () {
                scopeObj.view.flxCancelPopUp.setVisibility(false);
                applicationManager.getNavigationManager().navigateTo("frmFastActiveRecipient");
            };
        },
        /**
         * hides the cancel activation popup.
         */
        hideCancelPopUp: function () {
            this.view.flxCancelPopUp.setVisibility(false);
            this.view.flxDialogs.setVisibility(false);
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
                                scopeObj.showOrHideAccountRows(context);
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
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                this.view.listbxAcccFrDeposit.setVisibility(false);
                FormControllerUtility.disableButton(scopeObj.view.btnActivate);
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
            }
        },
    };
});