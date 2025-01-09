define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants", 'CampaignUtility'], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstant, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
     
    return {
        fromAck: false,
        accountSelected: null,
        defaultAccounts: null,
        updateFormUI: function(context) {
            if (context) {
                if (context.showLoadingIndicator) {
                    if (context.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
                if (context.fromDefaultAccounts) {
                    this.defaultAccounts = context.fromDefaultAccounts;
                    this.setDefaultAccounts(context.fromDefaultAccounts);
                    this.checkForContinueEnable.call(this);
                }
                if (context && context.fromAck == true) {
                    this.fromAck = true;
                    this.setDefaultAccounts.call(this);
                    this.checkForContinueEnable.call(this);
                }
                if (context.campaign) {
                    CampaignUtility.showCampaign(context.campaign, this.view, "flxMain");
                }
            }
        },

        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblAddAccountHeading, kony.i18n.getLocalizedString("i18n.wireTemplates.editPrimaryDetails"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblProvidePrimaryDetails, kony.i18n.getLocalizedString("i18n.wireTemplate.providePrimaryDetails"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblTemplateNameHeading, kony.i18n.getLocalizedString("i18n.konybb.common.templateName"), accessibilityConfig);
            CommonUtilities.setText(this.view.lbDefAccHeading, kony.i18n.getLocalizedString("i18n.wireTemplate.DefAccount"), accessibilityConfig);
            CommonUtilities.setText(this.view.lbDefCurrency, kony.i18n.getLocalizedString("i18n.wireTemplate.DefCurrency"), accessibilityConfig);
            this.view.lstDefaultAccount.placeholder = kony.i18n.getLocalizedString("i18n.wireTemplate.selectDefaultAccount");
            this.view.lstDefaultCurrency.placeholder = kony.i18n.getLocalizedString("i18n.wireTemplate.selectDefaultCurrency");
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.wireTemplates.editPrimaryDetails");
            this.view.lbDefCurrency.text = kony.i18n.getLocalizedString("i18n.wireTemplate.selectDefaultCurrency");
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            this.view.tbxRecipientName.restrictCharactersSet = specialCharactersSet;
            this.view.tbxRecipientName.maxTextLength = 50;
            this.view.tbxRecipientName.onKeyUp = function() {
                var text = this.view.tbxRecipientName.text;
                if(!(/^([a-zA-Z0-9]+)$/.test(this.view.tbxRecipientName.text.trim())))
                {
                    var text1 = text.replace(/[^A-Za-z0-9]/g, "");
                    this.view.tbxRecipientName.text = text1;
                }
                this.checkForContinueEnable();
            }.bind(this);
            this.view.btnCancel.onClick = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                var params = {
                    "formName": "frmBulkTransferFiles"
                };
                wireTransferModule.presentationController.resetPrimaryDetails();
                wireTransferModule.presentationController.resetRecipientData();
                wireTransferModule.presentationController.showBulkwirefiles(params);
            }


        },


        preShow: function() {
            var self = this;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.flxMain.onClick = function() {
                self.view.flxFromSegment.setVisibility(false);
                self.view.flxCancelFilterFrom.setVisibility(false);
            }
            this.view.onBreakpointChange = function() {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            CampaignUtility.fetchPopupCampaigns();
        },

        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "Create New Template");
            this.view.customheadernew.setDefaultHoverSkins();
            applicationManager.getNavigationManager().applyUpdates(this);
            this.checkForContinueEnable.call(this);
            this.accessibilityFocusSetup();
            this.view.tbxRecipientName.restrictCharactersSet = "~#^|$%&*!@-=}{][|,><`':;\"\\";
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.txtTransferFrom, this.view.flxFromtxt]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        //     loadBulkWireModule : function(){
        //       var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
        //       return wireTransferModule;
        //     },


        onBreakpointChange: function(form, width) {
            kony.print('on breakpoint change');
            var scope = this;
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            orientationHandler.onOrientationChange(this.onBreakpointChange);
        },


        setDefaultAccounts: function(data) {
            if (this.fromAck === false) {
                var accountsList = FormControllerUtility.getListBoxDataFromObjects(data, "accountID", CommonUtilities.getAccountDisplayName);
                this.view.lstDefaultAccount.masterData = accountsList.length === 0 ? [
                    ["", ""]
                ] : accountsList;
            }
            if (accountsList)
                this.initializeSegment(data, accountsList[0][0]);
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            var templateName = wireTransferModule.presentationController.getBulkWireTemplateName();
            var defaultAccount = wireTransferModule.presentationController.getDefaultFromAccount();
            var defaultCurrency = wireTransferModule.presentationController.getDefaultCurrency();
            this.view.tbxRecipientName.text = templateName;
            if (applicationManager.getConfigurationManager().isCombinedUser === "false") {
                this.view.lstDefaultAccount.masterData = FormControllerUtility.getListBoxDataFromObjects(this.defaultAccounts, "accountID", CommonUtilities.getAccountDisplayName);
                this.view.lstDefaultAccount.selectedKey = defaultAccount !== "" ? defaultAccount : accountsList[0][0];
            }
            this.view.lstDefaultAccount.onSelection = this.checkForContinueEnable;
            var currencyList = FormControllerUtility.getListBoxDataFromObjects(this.getCurrency(), "name", "symbol");
            for (var i = 0; i < currencyList.length; i++) {
                switch (currencyList[i][0]) {
                    case "$":
                        currencyList[i][1] = "$ (USD)";
                        break;
                    case "€":
                        currencyList[i][1] = "€ (EUR)";
                        break;
                    case "₹":
                        currencyList[i][1] = "₹ (INR)";
                        break;
                    case "£":
                        currencyList[i][1] = "£ (GBP)";
                        break;

                }
            }
            this.view.lstDefaultCurrency.masterData = currencyList;
            this.view.lstDefaultCurrency.selectedKey = defaultCurrency !== "" ? defaultCurrency : currencyList[0][0];
            this.view.lstDefaultCurrency.onSelection = this.checkForContinueEnable;
            FormControllerUtility.hideProgressBar(this.view)

        },
        getCurrency: function() {
            return applicationManager.getConfigurationManager().OLBConstants.BULKWIRETRANSFERCONSTANT.CURRENCIES;
        },
        checkForContinueEnable: function() {
            var account = null;
            if (!kony.sdk.isNullOrUndefined(this.view.segTransferFrom.selectedRowIndex)) {
                var secIndex = this.view.segTransferFrom.selectedRowIndex[0];
                var rowIndex = this.view.segTransferFrom.selectedRowIndex[1];
                account = this.view.segTransferFrom.data[secIndex][1][rowIndex].accountID;
            }
            var templateName = this.view.tbxRecipientName.text;
            var selectedAccount = account || this.view.lstDefaultAccount.selectedKey;
            var selectedCurrency = this.view.lstDefaultCurrency.selectedKey;
            if (templateName.length >= 1 && templateName.length <= 50 && selectedCurrency && selectedAccount) {
                FormControllerUtility.enableButton(this.view.btnContinue);
                if (this.fromAck == true) {
                    this.fromAck = false;
                    this.view.btnContinue.onClick = function() {
                        var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                        var defFromAccount;
                        if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
                            if (this.view.txtTransferFrom.text !== "") {
                                defFromAccount = selectedAccount;
                            } else {
                                FormControllerUtility.disableButton(this.view.btnContinue);
                            }
                        } else {
                            defFromAccount = this.view.lstDefaultAccount.selectedKey;
                        }
                        var params = {
                            "defaultFromAccount": defFromAccount, //this.view.lstDefaultAccount.selectedKey,
                            "defaultCurrency": this.view.lstDefaultCurrency.selectedKey,
                            "bulkWireTemplateName": this.view.tbxRecipientName.text
                        };
                        wireTransferModule.presentationController.setPrimaryDetails(params);
                        wireTransferModule.presentationController.navigateToTemplateConfirmForm();
                    }.bind(this);
                } else {
                    this.view.btnContinue.onClick = this.setPrimaryDetails.bind(this);
                }

            } else {
                FormControllerUtility.disableButton(this.view.btnContinue);
                this.view.btnContinue.onClick = function() {};

            }
        },
        setPrimaryDetails: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            var defFromAccount;
            if (this.view.txtTransferFrom.text !== "") {
                    if (kony.sdk.isNullOrUndefined(this.view.segTransferFrom.selectedRowIndex))
                        this.view.segTransferFrom.selectedRowIndex = this.accountSelected;
                    var secIndex = this.view.segTransferFrom.selectedRowIndex[0];
                    var rowIndex = this.view.segTransferFrom.selectedRowIndex[1];
                    defFromAccount = this.view.segTransferFrom.data[secIndex][1][rowIndex].accountID;
            }
            else {
                defFromAccount = this.view.lstDefaultAccount.selectedKey;
            }
            var params = {
                "defaultFromAccount": defFromAccount,
                "defaultCurrency": this.view.lstDefaultCurrency.selectedKey,
                "bulkWireTemplateName": this.view.tbxRecipientName.text
            };
            wireTransferModule.presentationController.setPrimaryDetails(params);
            wireTransferModule.presentationController.fetchStatesCreateTemplate("United States");
            wireTransferModule.presentationController.navigateToAddRecipientsForm();
        },

        getDataWithSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = [];
            accounts.forEach(function(account) {
                var accountType = kony.i18n.getLocalizedString("i18n.accounts.personalAccounts");
                if (account.isBusinessAccount === "true") {
                    if (kony.sdk.isNullOrUndefined(account.MembershipName)) {
                        account.MembershipName = kony.i18n.getLocalizedString("i18n.accounts.businessAccounts");
                    }
                    accountType = account.MembershipName;
                }
                account.accountRoleType = accountType;

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
                                "onClick": function(context, eventObject) {
                                    scopeObj.showOrHideAccountRows(context, eventObject)
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


        getBankIcon: function(account) {
            var bankName = account.bankName;
            if (!kony.sdk.isNullOrUndefined(account.logoURL)) {
                return account.logoURL;
            }
            var img = ViewConstant.IMAGES.HDFC_BANK_IMAGE;
            switch (bankName) {
                case "Citibank":
                    img = ViewConstant.IMAGES.CITI_BANK_IMAGE;
                    break;
                case "Bank of America":
                    img = ViewConstant.IMAGES.BOA_BANK_IMAGE;
                    break;
                case "National Bank":
                    img = ViewConstant.IMAGES.CHASE_BANK_IMAGE;
                    break;
                case "infinity":
                    img = ViewConstant.IMAGES.HDFC_BANK_IMAGE;
                    break;

            }
            return img;
        },
        /**
         *  creates the row template with account number and other details
         */

        createSegmentData: function(account) {
            var dataObject = {
                "lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.getAccountDisplayName(account) : (account.nickName ? account.nickName : account.name),
                "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? CommonUtilities.formatCurrencyWithCommas(account.availableBalance,false,account.currencyCode) : (account.bankName || account.phone || account.email)) : (CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance,false,account.currencyCode)),
                "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
                "currencyCode": account.currencyCode,
                "imgIcon": account.isBusinessAccount === "true" ? "r" : "s",
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

        /**
         * It shows or hides the particular section 
         */
        showOrHideAccountRows: function(context, eventObject) {
            var section = eventObject.sectionIndex;
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
                this.updateKeyAt("flxFromAccountsList", flxAccountListItem1, i, section);
            }
            segData = this.view.segTransferFrom.data;
            this.view.segTransferFrom.setSectionAt(segData[section], section);
        },

        updateKeyAt: function(widgetName, value, row, section) {
            var data = this.view.segTransferFrom.data;
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this.view.segTransferFrom.setDataAt(rowDataTobeUpdated, row, section);
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
            //CommonUtilities.setText(this.view.lblFromAmount, (account[0].accountType !== "CreditCard") ? CommonUtilities.formatCurrencyWithCommas(account[0].availableBalance,false,account[0].currencyCode) : CommonUtilities.formatCurrencyWithCommas(account[0].availableCredit,false,account[0].currencyCode) , CommonUtilities.getaccessibilityConfig());
            this.view.lblSelectAccount.setVisibility(true);
            // this.view.lblFromAmount.setVisibility(true);      
            // this.view.lblCurrencySymbol.text = applicationManager.getFormatUtilManager().getCurrencySymbol(account[0].currencyCode);      
            var posi = 0,
                posj = 0;
            var fromSelectedId = (account[0].accountID || account[0].Account_id);
            //if (configurationManager.isCombinedUser === "true") {
            if (applicationManager.getUserPreferencesManager().profileAccess === "both") {
                this.view.flxTypeIcon.setVisibility(true);
                this.view.lblTypeIcon.text = account[0].isBusinessAccount === "true" ? "r" : "s";
            }
            var widgetFromData = this.getDataWithSections(fromAccountsList);
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
         * Initialises the segment data if its a combined user
         */
        initializeSegment: function(userData, frmAcc) {
            var scopeObj = this;
            //if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                this.view.lstDefaultAccount.setVisibility(false);
                this.view.flxFromtxt.setVisibility(true);
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
                var widgetFromData = this.getDataWithSections(userData);
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                var defaultAccount = wireTransferModule.presentationController.getDefaultFromAccount();
                this.view.forceLayout();
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
                    scopeObj.view.lblTypeIcon.text = segData.imgIcon;
                    // scopeObj.view.lblFromAmount.setVisibility(true);
                    scopeObj.view.lblFromAmount.text = segData.lblAmount;
                    scopeObj.view.flxFromSegment.setVisibility(false);
                    scopeObj.accountSelected = scopeObj.view.segTransferFrom.selectedRowIndex;
                    scopeObj.checkForContinueEnable();

                };
                this.view.flxCancelFilterFrom.onClick = function() {
                    scopeObj.view.txtTransferFrom.text = "";
                    scopeObj.view.segTransferFrom.selectedRowIndex = null;
                    scopeObj.view.flxCancelFilterFrom.setVisibility(false);
                    scopeObj.view.flxFromSegment.setVisibility(false);
                    scopeObj.checkForContinueEnable();
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
                if (defaultAccount === "") {
                    this.prefillFromAccount(frmAcc, userData);
                } else {
                    this.prefillFromAccount(defaultAccount, userData);
                }
            }
        },

    };
});