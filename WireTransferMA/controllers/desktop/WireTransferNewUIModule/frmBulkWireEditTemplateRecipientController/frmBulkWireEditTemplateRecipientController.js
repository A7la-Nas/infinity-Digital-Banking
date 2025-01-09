define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {

        checkingAccounts: "",
        recipientData: "",
        templateDetails: "",
        validCurrency:"true",
        validFromAccount:"true",
        validAmount:"true",
        removedRecipientData: [],
        searchResult: [],
        closedTemplate: "CopyflxBulkWireAck0d7b48b49605b4f",
        selectedTemplate: "flxBWTEditiRecipient",
        switchOff : 1,
        switchOn : 0,
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
                if (uiData.templateRecipientsData) {
                    this.BWTRecipientEditView(uiData.templateRecipientsData);
                }
            }
        },

        init: function() {
            this.view.onDeviceBack = function() {};
            this.view.preShow = this.preShowFrmBulkWireEditTemplateRecipient;
            this.view.postShow = this.postShowFrmBulkWireEditTemplateRecipient;
            this.setActions();
        },

        preShowFrmBulkWireEditTemplateRecipient: function() {
            var self = this;
            this.searchResult = [];
            this.removedRecipientData = [];
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.imgSortDescription.setVisibility(false);
            this.view.imgSortCurrency.setVisibility(false);
            this.view.flxError.setVisibility(false);
            CommonUtilities.setText(this.view.btnNewTransfer, kony.i18n.getLocalizedString("i18n.common.proceed"), accessibilityConfig);
            this.view.btnNewTransfer.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            this.view.segmentTemplate.setData([]);
            this.view.Search.flxClearBtn.setVisibility(false);
            CommonUtilities.disableButton(this.view.btnApplyChanges);
            this.view.Search.txtSearch.text = "";
            this.view.onBreakpointChange = function() {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.tbxAmount.text = "";
        },

        postShowFrmBulkWireEditTemplateRecipient: function() {
            this.view.customheadernew.activateMenu("Wire Transfer", "Make Bulk Transfer");
            if (kony.os.deviceInfo().screenWidth < 1024) {
                this.view.lblRemoveRecipients.skin = "sknLblSSP42424213px";
            } else
                this.view.lblRemoveRecipients.skin = "slLabel0d8a72616b3cc47";
            applicationManager.getNavigationManager().applyUpdates(this);
        },

        setActions: function() {
            var self = this;
            this.view.btnNewTransfer.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                var data = {
                    "removedRecipientData": self.removedRecipientData,
                    "recipientData": self.updateBulkWireTemplateRecords(),
                    "templateDetails": self.templateDetails,
                    "checkingAccounts": self.checkingAccounts,
                }
                if (self.validateRecords(data.recipientData)) {
                    self.view.flxError.setVisibility(false);
                    self.loadBulkWireModule().presentationController.navigateToTransferBWTConfirm(data);
                } else {
                    self.showErrorMsg();
                }
            }
            this.view.btnMakeAnother.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                var params = {
                    "formName": "frmMakeBulkTransferTemplate",
                    "bulkWireCategoryFilter": OLBConstants.BULKWIRE_CATEGORY_FILTER.TEMPLATES
                };
                self.loadBulkWireModule().presentationController.showBulkwirefiles(params);
            }
            this.view.flxSelectAll.onClick = this.selectAllOnClick.bind(this);
            this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        },

        loadBulkWireModule: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            return wireTransferModule;
        },

        BWTRecipientEditView: function(data) {
            this.saveDefaultValues(data);
            this.setEditRecipientView(this.checkingAccounts);
            var finalData = data.bulkWireTemplateResponse;
            this.setTemplateRecipientData(finalData, null, null, null)
        },

        saveDefaultValues: function(data) {
            this.checkingAccounts = data.accountsResponse;
            this.templateDetails = data.templateDetails;
            if (data.removedRecipientData && data.removedRecipientData.length > 0)
                this.removedRecipientData = data.removedRecipientData;
            if (!data.isEdit) {
                this.recipientData = this.addAdditionalFields(data.bulkWireTemplateResponse);
            }
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblTemplateNameTitle, kony.i18n.getLocalizedString("i18n.bulkWire.templateName"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblTemplateName, this.templateDetails.bulkWireName, accessibilityConfig);
        },

        addAdditionalFields: function(recipientData) {
            var self = this;
            for (var index = 0; index < recipientData.length; index++) {
                var item = recipientData[index];
                if (!self.isRequiredPermissionAvailable(item)) {
                    recipientData.splice(index, 1);
                    index--;
                } else {
                    item.currency = applicationManager.getConfigurationManager().getCurrency(self.templateDetails.defaultCurrency) || "$";
                    item.amount = "";
                    item.isDeleted = false;
                    item.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                    item.fromAccountNumber = self.getMatchingAccount(self.templateDetails.defaultFromAccount);
                    item.accountObject = self.getAccountObject(item.fromAccountNumber);
                }
            }
            return recipientData;
        },

        getMatchingAccount: function(accountNumber) {
            for (var index = 0; index < this.checkingAccounts.length; index++) {
                if (this.checkingAccounts[index].Account_id === accountNumber) {
                    return accountNumber;
                }
            }
            return this.checkingAccounts.length > 0 ? this.checkingAccounts[0].Account_id : "";
        },

        isRequiredPermissionAvailable: function(record) {
            var type = record.bulkWireTransferType.toLowerCase();
            if (type === OLBConstants.BULK_WIRE_TRANSFER_TYPE.DOMESTIC) {
                return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE]);
            }
            if (type === OLBConstants.BULK_WIRE_TRANSFER_TYPE.INTERNATIONAL) {
                return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE]);
            }
        },

        checkAllPermissions: function(permissions) {
            return permissions.every(this.checkUserPermission);
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        showErrorMsg: function() {
            this.view.lblError.text = kony.i18n.getLocalizedString("i81n.BulkWires.editErrorMsg");
            this.view.lblTemplateName.setFocus(true);
            this.view.flxError.setVisibility(true);
            FormControllerUtility.hideProgressBar();
        },
        setEditRecipientView: function(data) {
            var self = this;
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, self.recipientData);
            var accountsList = FormControllerUtility.getListBoxDataFromObjects(data, "accountID", CommonUtilities.getAccountDisplayName);
            accountsList.push(["None", "None"]);
            this.view.lbxAccounts.masterData = accountsList;
            this.view.lbxAccounts.selectedKey = "None";
            this.view.lbxAccounts.onSelection = function() {
                self.enableDisableApply();
            };
            var currencyList = FormControllerUtility.getListBoxDataFromObjects(this.getCurrency(), "name", "symbol");
            currencyList.push(["None", "None"]);
            this.view.lbxCurrency.masterData = currencyList;
            this.view.lbxCurrency.selectedKey = "None";
            this.view.lbxCurrency.onSelection = function() {
                self.enableDisableApply();
            };
            this.view.tbxAmount.onKeyUp = function() {
                self.enableDisableApply();
            };
            this.view.btnApplyChanges.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                var selectedAccount = self.view.lbxAccounts.selectedKeyValue[0];
                var selectedCurrency = self.view.lbxCurrency.selectedKeyValue[1];
                var changedAmount = self.view.tbxAmount.text ? self.view.tbxAmount.text.trim() : null;
                var data;
                self.view.flxError.setVisibility(false);
                if (selectedAccount === "None") {
                    selectedAccount = null;
                }
                if (selectedCurrency === "None") {
                    selectedCurrency = null;
                }
                if (self.view.switchStatus.selectedIndex === this.switchOn) {
                    data = self.recipientData.filter(self.selectedRecords);
                    self.updateRecordValues(data, selectedAccount, selectedCurrency, changedAmount);
                } else {
                    data = self.recipientData;
                    self.updateRecordValues(data, selectedAccount, selectedCurrency, changedAmount);
                }
                self.setTemplateRecipientData(data, selectedAccount, selectedCurrency, changedAmount);
            }
            this.view.btnRemove.onClick = function() {
                if (self.isRecordSelected()) {
                    FormControllerUtility.showProgressBar(self.view);
                    self.removeSelectedRecipient();
                    self.setTemplateRecipientData(self.recipientData, null, null, null);
                    CommonUtilities.disableButton(self.view.btnApplyChanges);
                } else {
                    self.view.lblError.text = "No record is removed.";
                    self.view.flxError.setVisibility(true);
                }
            }
            this.view.lblViewRemovedRecipients.onTouchEnd = function() {
                if (self.removedRecipientData.length > 0) {
                    FormControllerUtility.showProgressBar(self.view);
                    self.updateBulkWireTemplateRecords();
                    self.view.Search.txtSearch.text = "";
                    var data = {
                        "removedRecipientData": self.removedRecipientData,
                        "recipientData": self.recipientData,
                        "templateDetails": self.templateDetails,
                        "checkingAccounts": self.checkingAccounts,
                    }
                    self.loadBulkWireModule().presentationController.showRemovedRecipientTemplate(data);
                } else {
                    self.view.lblError.text = "No record is removed.";
                    self.view.flxError.setVisibility(true);
                }
            }
            this.view.switchStatus.onTouchEnd = function() {
                self.toggleEditRecipientTemplateView();
            }
            this.view.imgSortRecipient.onTouchEnd = function() {
                var data;
                FormControllerUtility.showProgressBar(self.view);
                self.view.imgSortType.src = OLBConstants.IMAGES.SORTING;
                if (self.recipientNameOrder === "DSC") {
                    self.recipientNameOrder = "ASC";
                    self.view.imgSortRecipient.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.recipientNameOrder = "DSC";
                    self.view.imgSortRecipient.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                if (self.searchResult.length !== 0) {
                    data = self.searchResult;
                    if (self.view.switchStatus.selectedIndex === self.switchOn) {
                        data = data.filter(self.selectedRecords);
                    }
                    self.sortTemplateRecords(data, "recipientName", self.recipientNameOrder, "string");
                } else {
                    data = self.recipientData;
                    if (self.view.switchStatus.selectedIndex === self.switchOn) {
                        data = data.filter(self.selectedRecords);
                    }
                    self.sortTemplateRecords(data, "recipientName", self.recipientNameOrder, "string");
                }
            }
            this.view.imgSortType.onTouchEnd = function() {
                var data;
                FormControllerUtility.showProgressBar(self.view);
                self.view.imgSortRecipient.src = OLBConstants.IMAGES.SORTING;
                if (self.amountOrder === "DSC") {
                    self.amountOrder = "ASC";
                    self.view.imgSortType.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.amountOrder = "DSC";
                    self.view.imgSortType.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                if (self.searchResult.length !== 0) {
                    data = self.searchResult;
                    if (self.view.switchStatus.selectedIndex === self.switchOn) {
                        data = data.filter(self.selectedRecords);
                    }
                    self.sortTemplateRecords(data, "amount", self.amountOrder, "string");
                } else {
                    data = self.recipientData;
                    if (self.view.switchStatus.selectedIndex === self.switchOn) {
                        data = data.filter(self.selectedRecords);
                    }
                    self.sortTemplateRecords(data, "amount", self.amountOrder, "string");
                }
            }
        },

        enableDisableApply: function() {
            var self = this;
            var selectedAccount = self.view.lbxAccounts.selectedKeyValue[0];
            var selectedCurrency = self.view.lbxCurrency.selectedKeyValue[1];
            var changedAmount = self.view.tbxAmount.text ? self.view.tbxAmount.text.trim() : null;
            if ((selectedAccount !== "None" || selectedCurrency !== "None" || changedAmount !== null) && self.isRecordSelected()) {
                CommonUtilities.enableButton(this.view.btnApplyChanges);
            } else {
                CommonUtilities.disableButton(this.view.btnApplyChanges);
            }
        },

        isDomestic: function(recipient) {
            return typeof recipient.bulkWireTransferType === 'string' && recipient.bulkWireTransferType.toLowerCase() === OLBConstants.BULK_WIRE_TRANSFER_TYPE.DOMESTIC;
        },

        isInternational: function(recipient) {
            return typeof recipient.bulkWireTransferType === 'string' && recipient.bulkWireTransferType.toLowerCase() === OLBConstants.BULK_WIRE_TRANSFER_TYPE.INTERNATIONAL;
        },

        setTemplateRecipientData: function(data, selectedAccount, selectedCurrency, changedAmount) {
            var controller = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            var createSegmentSection = function(recipients, sectionHeaderText) {
                if (recipients.length > 0) {
                    return [{
                            "lblHeader": "" + sectionHeaderText.text + "(" + recipients.length + ")",
                            "lblSeparator": ".",
                            "lblStatusHeader": OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                            "flxStatusHeader": {
                                "onClick": controller.selectAllOnClick.bind(controller),
                                "isVisible": false
                            }
                        },
                        recipients.map(controller.createRecipientTemplateSegmentModel.bind(this, changedAmount, selectedCurrency, selectedAccount))
                    ];
                }
            };
            var domesticRecipientsSection = createSegmentSection(data.filter(this.isDomestic), {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                "skin": "sknlbl424242bold15px",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                }
            });
            var internationalRecipientsSection = createSegmentSection(data.filter(this.isInternational), {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader'),
                "skin": "sknlbl424242bold15px",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader'),
                }
            });
            var transactionsExistInSection = function(section) {
                if (section) {
                    return section[1] && section[1].length && section[1].length > 0;
                }
            }
            this.view.segmentTemplate.widgetDataMap = {
                "flxDropdown": "flxDropdown",
                "lblDropdown": "lblDropdown",
                "lblRecipient": "lblRecipient",
                "listAccounts": "listAccounts",
                "ListBox0f204cf65e9ec44": "ListBox0f204cf65e9ec44",
                "TextField0ff78082759ce44": "TextField0ff78082759ce44",
                "lblStatus": "lblStatus",
                "lblHeader": "lblHeader",
                "flxStatus": "flxStatus",
                "lblAmount": "lblAmount",
                "flxCurrency": "flxCurrency",
                "lblSeparator": "lblSeparator",
                "lblFromAccountNo": "lblFromAccountNo",
                "lblReferenceID": "lblReferenceID",
                "lblAccNumber": "lblAccNumber",
                "lblAccNumberValue": "lblAccNumberValue",
                "lblBankAddressValue": "lblBankAddressValue",
                "lblBankAddressTitle": "lblBankAddressTitle",
                "lblBankName": "lblBankName",
                "lblBankNameValue": "lblBankNameValue",
                "lblCurrencyValueOf": "lblCurrencyValueOf",
                "lblIBAN": "lblIBAN",
                "lblIBANValue": "lblIBANValue",
                "lblIdentifier": "lblIdentifier",
                "lblNoteTitle": "lblNoteTitle",
                "lblNotesValue": "lblNotesValue",
                "lblRecipientAddressTitle": "lblRecipientAddressTitle",
                "lblRecipientAddressValue": "lblRecipientAddressValue",
                "lblRecipientType": "lblRecipientType",
                "lblRecipientTypeValue": "lblRecipientTypeValue",
                "lblRowSeperator": "lblRowSeperator",
                "lblSeparator2": "lblSeparator2",
                "lblSwiftCode": "lblSwiftCode",
                "lblSwiftCodeValue": "lblSwiftCodeValue",
                "lblTransactionTypeValue": "lblTransactionTypeValue",
                "lblTransactionTypeTitle": "lblTransactionTypeTitle",
                "flxSegment": "flxSegment",
                "flxIdentifier": "flxIdentifier",
                "lblSelectAll": "lblSelectAll",
                "lblStatusHeader": "lblStatusHeader",
                "flxStatusHeader": "flxStatusHeader"
            }
            var domesticCount = (domesticRecipientsSection && domesticRecipientsSection[1]) ? domesticRecipientsSection[1].length : 0;
            var internationalCount = (internationalRecipientsSection && internationalRecipientsSection[1]) ? internationalRecipientsSection[1].length : 0;
            var totalRecipients = domesticCount + internationalCount;
            this.view.lblCount.text = "(" + (domesticCount + internationalCount + "") + ")";
            CommonUtilities.setText(this.view.lblTotalRecipients, "" + totalRecipients, accessibilityConfig);
            CommonUtilities.setText(this.view.lblDomesticRecipients, "" + domesticCount, accessibilityConfig);
            CommonUtilities.setText(this.view.lblInternationalRecipients, "" + internationalCount, accessibilityConfig);
            if (totalRecipients === 0) {
                this.showNoTransactionAvailableUI();
            } else {
                this.view.flxNoTransactions.setVisibility(false);
                this.view.flxSegment.setVisibility(true);
                this.view.flxSort.setVisibility(true);
                CommonUtilities.enableButton(this.view.btnNewTransfer);
                this.view.segmentTemplate.setData([domesticRecipientsSection, internationalRecipientsSection].filter(transactionsExistInSection));
            }
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
        },

        createRecipientTemplateSegmentModel: function(changedAmount, selectedCurrency, selectedAccount, recipientData) {
            var self = this;
            var isDomestic = this.isDomestic(recipientData);
            return {
                "lblRecipient": {
                    "text": recipientData.recipientName,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientName,
                    }
                },
                "listAccounts": {
                    "masterData": (this.checkingAccounts.length === 0) ? [
                        ["", ""]
                    ] : FormControllerUtility.getListBoxDataFromObjects(this.checkingAccounts, "accountID", CommonUtilities.getAccountDisplayName),
                    "selectedKey": (selectedAccount && recipientData.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) ? selectedAccount : recipientData.fromAccountNumber,
                    "onSelection": self.onAccountSelection.bind(this, recipientData.bulkWireTemplateLineItemID)
                },
                "ListBox0f204cf65e9ec44": {
                    "masterData": FormControllerUtility.getListBoxDataFromObjects(this.getCurrency(), "name", "symbol"),
                    "selectedKey": (selectedCurrency && recipientData.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) ? selectedCurrency : recipientData.currency,
                    "onSelection": self.onCurrencySelection.bind(this, recipientData.bulkWireTemplateLineItemID)
                },
                "TextField0ff78082759ce44": {
                    "text": (changedAmount && recipientData.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) ? CommonUtilities.formatCurrencyWithCommas(changedAmount, true) : (recipientData.amount != "") ? CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true) : "",
                    "accessibilityconfig": {
                        "a11yLabel": (changedAmount && recipientData.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) ? CommonUtilities.formatCurrencyWithCommas(changedAmount, true) : (recipientData.amount != "") ? CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true) : "",
                    },
                    "onKeyUp": self.onAmountSelection.bind(this, recipientData.bulkWireTemplateLineItemID)
                },
                "lblStatus": {
                    "text": recipientData.status ? recipientData.status : OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.status ? recipientData.status : OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                    }
                },
                "lblAccNumber": {
                    "text": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    }
                },
                "lblAccNumberValue": {
                    "text": recipientData.recipientAccountNumber,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientAccountNumber,
                    }
                },
                "lblIBAN": {
                    "text": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "accessibilityconfig": {
                        "a11yLabel": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    }
                },
                "lblIBANValue": {
                    "text": isDomestic ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingNumber ? recipientData.internationalRoutingNumber : "-"),
                    "accessibilityconfig": {
                        "a11yLabel": isDomestic ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingNumber ? recipientData.internationalRoutingNumber : "-"),
                    }
                },
                "lblTransactionTypeTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "isVisible": isDomestic ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    }
                },
                "lblTransactionTypeValue": {
                    "text": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    "isVisible": isDomestic ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    }
                },
                "lblRecipientType": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    }
                },
                "lblRecipientTypeValue": {
                    "text": recipientData.transactionType,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.transactionType,
                    }
                },
                "lblBankName": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankName"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankName"),
                    }
                },
                "lblBankNameValue": {
                    "text": recipientData.recipientBankName,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientBankName,
                    }
                },
                "lblSwiftCode": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    }
                },
                "lblSwiftCodeValue": {
                    "text": recipientData.bulkWireTransferType ? recipientData.bulkWireTransferType : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType ? recipientData.bulkWireTransferType : "-",
                    }
                },
                "lblRecipientAddressTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    }
                },
                "lblRecipientAddressValue": {
                    "text": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.recipientState ? ", " + recipientData.recipientState : "") + "" + (recipientData.recipientZipCode ? " " + recipientData.recipientZipCode : ""),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.recipientState ? ", " + recipientData.recipientState : "") + "" + (recipientData.recipientZipCode ? " " + recipientData.recipientZipCode : ""),
                    }
                },
                "lblBankAddressTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    }
                },
                "lblBankAddressValue": {
                    "text": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.recipientBankstate ? ", " + recipientData.recipientBankstate : "") + "" + (recipientData.recipientBankZipCode ? " " + recipientData.recipientBankZipCode : ""),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.recipientBankstate ? ", " + recipientData.recipientBankstate : "") + "" + (recipientData.recipientBankZipCode ? " " + recipientData.recipientBankZipCode : ""),
                    }
                },
                "flxIdentifier": "flxIdentifier",
                "lblDropdown": {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                    "isVisible": true
                },
                "flxStatus": {
                    "onClick": this.toggleTemplateCheckBox.bind(this)
                },
                "flxDropdown": {
                    "onClick": this.onClickToggle,
                },
                "lblSeparator2": ".",
                "bulkWireTemplateLineItemID": recipientData.bulkWireTemplateLineItemID,
                "template": this.closedTemplate,
            }
        },

        onAccountSelection: function(bulkWireTemplateLineItemID, widget) {
            for (var index = 0; index < this.recipientData.length; index++) {
                if (this.recipientData[index].bulkWireTemplateLineItemID === bulkWireTemplateLineItemID) {
                    this.recipientData[index].fromAccountNumber = widget.selectedKeyValue[0];
                    this.recipientData[index].accountObject = this.getRespectiveAccount(this.recipientData[index].fromAccountNumber);
                    break;
                }
            }
        },

        getRespectiveAccount: function(accountId) {
            for (var index = 0; index < this.checkingAccounts.length; index++) {
                if (this.checkingAccounts[index].Account_id === accountId) {
                    return this.checkingAccounts[index];
                }
            }
        },

        onCurrencySelection: function(bulkWireTemplateLineItemID, widget) {
            for (var index = 0; index < this.recipientData.length; index++) {
                if (this.recipientData[index].bulkWireTemplateLineItemID === bulkWireTemplateLineItemID) {
                    this.recipientData[index].currency = widget.selectedKeyValue[1];
                    break;
                }
            }
        },

        onAmountSelection: function(bulkWireTemplateLineItemID, widget) {
            for (var index = 0; index < this.recipientData.length; index++) {
                if (this.recipientData[index].bulkWireTemplateLineItemID === bulkWireTemplateLineItemID) {
                    this.recipientData[index].amount = widget.text;
                    break;
                }
            }
        },

        onClickToggle: function() {
            var scopeObj = this;
            var index = kony.application.getCurrentForm().segmentTemplate.selectedRowIndex;
            var sectionIndex = index[0];
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segmentTemplate.data;
            var section = data.length;
            var collapseAll = function(segments, section) {
                segments.forEach(function(segment, i) {
                    if (segment.template === scopeObj.selectedTemplate) {
                        segment.template = scopeObj.closedTemplate;
                        segment.lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                        kony.application.getCurrentForm().segmentTemplate.setDataAt(segment, i, section);
                    }
                });
            };
            if (data[sectionIndex][1]) {
                if (data[sectionIndex][1][rowIndex].template === this.closedTemplate) {
                    while (section--) {
                        collapseAll(data[section][1], section);
                    }
                    data[sectionIndex][1][rowIndex].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                    data[sectionIndex][1][rowIndex].template = this.selectedTemplate;
                } else {
                    data[sectionIndex][1][rowIndex].lblDropdown = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    data[sectionIndex][1][rowIndex].template = this.closedTemplate;
                }
                kony.application.getCurrentForm().segmentTemplate.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
                //var data1 =  kony.application.getCurrentForm().segmentTemplate.clonedTemplates[sectionIndex][1][rowIndex].frame.height;
                //data[sectionIndex][1][rowIndex].flxIdentifier.height= data1 +"dp";
                kony.application.getCurrentForm().segmentTemplate.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
            }
        },

        updateBulkWireTemplateRecords: function() {
            var self = this;
            var flag = false;
            var data = kony.application.getCurrentForm().segmentTemplate.data;
            var domesticData = [];
            if (data && data[0]) {
                domesticData = data[0][1];
            }
            var internationalData = [];
            if (data && data[1]) {
                internationalData = data[1][1];
            }
            domesticData.forEach(function(bulkWireTemplateLineItem) {
                self.recipientData.forEach(function(record) {
                    if (bulkWireTemplateLineItem.bulkWireTemplateLineItemID === record.bulkWireTemplateLineItemID) {
                        record.fromAccountNumber = bulkWireTemplateLineItem.listAccounts.selectedKey;
                        record.currency = bulkWireTemplateLineItem.ListBox0f204cf65e9ec44.selectedKey;
                        record.amount = bulkWireTemplateLineItem.TextField0ff78082759ce44.text;
                        record.accountObject = self.getAccountObject(record.fromAccountNumber, OLBConstants.BULK_WIRE_TRANSFER_TYPE.DOMESTIC);
                        record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                    }
                })
            });
            internationalData.forEach(function(bulkWireTemplateLineItem) {
                self.recipientData.forEach(function(record) {
                    if (bulkWireTemplateLineItem.bulkWireTemplateLineItemID === record.bulkWireTemplateLineItemID) {
                        record.fromAccountNumber = bulkWireTemplateLineItem.listAccounts.selectedKey;
                        record.currency = bulkWireTemplateLineItem.ListBox0f204cf65e9ec44.selectedKey;
                        record.amount = bulkWireTemplateLineItem.TextField0ff78082759ce44.text;
                        record.accountObject = self.getAccountObject(record.fromAccountNumber, OLBConstants.BULK_WIRE_TRANSFER_TYPE.INTERNATIONAL);
                        record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                    }
                })
            });
            return self.recipientData;
        },

        getAccountObject: function(accountNumber, type) {
            for (var index = 0; index < this.checkingAccounts.length; index++) {
                if (accountNumber === this.checkingAccounts[index].Account_id) {
                    this.checkingAccounts[index].associatedType = type;
                    return this.checkingAccounts[index];
                }
            }
        },

        toggleTemplateCheckBox: function() {
            var index = kony.application.getCurrentForm().segmentTemplate.selectedRowIndex;
            var sectionIndex = index[0];
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segmentTemplate.data;
            if (data[sectionIndex][1][rowIndex].lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                this.updateRecordStatus(data[sectionIndex][1][rowIndex].bulkWireTemplateLineItemID, OLBConstants.FONT_ICONS.CHECBOX_SELECTED);
                data[sectionIndex][1][rowIndex].lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
            } else {
                this.updateRecordStatus(data[sectionIndex][1][rowIndex].bulkWireTemplateLineItemID, OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
                data[sectionIndex][1][rowIndex].lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            }
            kony.application.getCurrentForm().segmentTemplate.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
            var buttonStatus = this.isRecordSelected();
            if (buttonStatus) {
                CommonUtilities.enableButton(this.view.btnApplyChanges);

            } else {
                CommonUtilities.disableButton(this.view.btnApplyChanges);
            }
            if (this.view.switchStatus.selectedIndex === this.switchOn) {
                data = this.recipientData.filter(this.selectedRecords);
                FormControllerUtility.showProgressBar(this.view);
                this.setTemplateRecipientData(data, null, null, null);
            }
            this.enableDisableApply();
        },

        isRecordSelected: function() {
            var data = kony.application.getCurrentForm().segmentTemplate.data;
            var selectedStatus = false;
            var domesticData = [];
            if (data[0]) {
                domesticData = data[0][1];
            }
            domesticData.forEach(function(item) {
                if (item.lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    selectedStatus = true;
                }
            })
            var internationalData = [];
            if (data[1]) {
                internationalData = data[1][1];
            }
            internationalData.forEach(function(item) {
                if (item.lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    selectedStatus = true;
                }
            })
            return selectedStatus;
        },

        updateRecordStatus: function(bulkWireTemplateLineItemID, currentStatus) {
            var self = this;
            for (var index = 0; index < self.recipientData.length; index++) {
                if (bulkWireTemplateLineItemID === self.recipientData[index].bulkWireTemplateLineItemID) {
                    self.recipientData[index].status = currentStatus;
                    break;
                }
            }
        },

        removeSelectedRecipient: function() {
            for (var index = 0; index < this.recipientData.length; index++) {
                if (this.recipientData[index].status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    this.recipientData[index].status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                    this.removedRecipientData.push(this.recipientData[index]);
                    this.recipientData.splice(index, 1);
                    index--;
                }
            }
        },

        selectAllOnClick: function() {
            FormControllerUtility.showProgressBar(this.view);
            if (this.view.lblSelectAll.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
                this.changeAllStatus(OLBConstants.FONT_ICONS.CHECBOX_SELECTED);

            } else {
                this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                this.view.switchStatus.selectedIndex = this.switchOff;
                this.changeAllStatus(OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
            }
            var data;
            if (this.view.switchStatus.selectedIndex === this.switchOn) {
                data = this.recipientData.filter(this.selectedRecords);
            } else {
                data = this.recipientData;
            }
            FormControllerUtility.showProgressBar(this.view);
            this.setTemplateRecipientData(data, null, null, null);
            this.enableDisableApply();
        },

        changeAllStatus: function(status) {
            this.recipientData.forEach(function(item) {
                item.status = status;
            });
        },

        updateRecordValues: function(data, selectedAccount, selectedCurrency, changedAmount) {
            var self = this;
            data.forEach(function(item) {
                if (item.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    if (selectedAccount !== null) {
                        item.fromAccountNumber = selectedAccount;
                        item.accountObject = self.getAccountObject(selectedAccount);
                    }
                    if (selectedCurrency !== null) {
                        item.currency = selectedCurrency;
                    }
                    if (changedAmount !== null) {
                        item.amount = changedAmount;
                    }
                }
            });
        },

        toggleEditRecipientTemplateView: function() {
            var self = this;
            var isSelected = this.view.switchStatus.selectedIndex;
            if (!this.isRecordSelected() && isSelected === this.switchOff) {
                this.view.lblError.text = "No record is selected.";
                this.view.flxError.setVisibility(true);
            } else {
                this.view.flxError.setVisibility(false);
                if (isSelected === this.switchOff) {
                    var currentSelectedRecords = [];
                    var data = this.recipientData;
                    if (this.searchResult.length > 0) {
                        data = this.searchResult;
                    }
                    currentSelectedRecords = data.filter(this.selectedRecords);
                    FormControllerUtility.showProgressBar(this.view);
                    this.setTemplateRecipientData(currentSelectedRecords, null, null, null);
                } else {
                    var data = this.recipientData;
                    if (this.view.Search.txtSearch.text && this.view.Search.txtSearch.text.length() > 0) {
                        data = this.searchResult;
                    }
                    FormControllerUtility.showProgressBar(this.view);
                    this.setTemplateRecipientData(data, null, null, null);
                }
            }
        },

        sortTemplateRecords: function(data, sortParam, sortOrder, type) {
            var sortedRecord;
            if (type === "string")
                sortedRecord = this.loadBulkWireModule().presentationController.sortBWTStringRecords(data, sortParam, sortOrder);
            if (type === "number")
                sortedRecord = this.loadBulkWireModule().presentationController.sortBWTNumberRecords(data, sortParam, sortOrder);
            this.setTemplateRecipientData(sortedRecord, null, null, null);
        },

        selectedRecords: function(recipient) {
            return recipient.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
        },

        getCurrency: function() {
            return applicationManager.getConfigurationManager().OLBConstants.BULKWIRETRANSFERCONSTANT.CURRENCIES;
        },

        validateRecords: function(data) {
            this.validateAccounts(data);
            this.validateCurrency(data);
            this.validateAmount(data);
            if (this.validFromAccount && this.validCurrency && this.validAmount) {
                return true;
            }
            return false;
        },

        validateAccounts: function(data) {
            this.validFromAccount = false;
            for (var index = 0; index < data.length; index++) {
                var type = data[index].accountObject && data[index].accountObject.associatedType;
                if (data[index].fromAccountNumber !== undefined && data[index].fromAccountNumber !== null && type !== undefined && type !== null && this.isAccountPermitted(data[index].fromAccountNumber, type) !== false)
                this.validFromAccount= true;
            }
            return this.validFromAccount;
        },

        isAccountPermitted: function(accountID, type) {
            var config = applicationManager.getConfigurationManager();
            if (type === OLBConstants.BULK_WIRE_TRANSFER_TYPE.DOMESTIC) {
                type = OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE_RECEPIENT;
            }
            if (type === OLBConstants.BULK_WIRE_TRANSFER_TYPE.INTERNATIONAL) {
                type = OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE_RECEPIENT;
            }
            return config.checkAccountAction(accountID, type);
        },

        validateCurrency: function(data) {
            this.validCurrency = false;
            for (var index = 0; index < data.length; index++) {
                if (data[index].currency !== undefined && data[index].currency !== null) 
                this.validCurrency= true;
            }
            return this.validCurrency;
        },

        validateAmount: function(data) {
            this.validAmount = false;
            for (var index = 0; index < data.length; index++) {
                if (data[index].amount !== undefined && data[index].amount !== null && data[index].amount !== "" && (data[index].amount > 0) && CommonUtilities.isValidAllAmount(data[index].amount)) 
                this.validAmount= true;
            }
            return this.validAmount;
        },

        showNoTransactionAvailableUI: function() {
            this.view.flxNoTransactions.setVisibility(true);
            this.view.flxSegment.setVisibility(false);
            this.view.lblScheduleAPayment.setVisibility(false);
            this.view.flxSort.setVisibility(false);
            kony.application.getCurrentForm().segmentTemplate.data = [];
            CommonUtilities.disableButton(this.view.btnNewTransfer);
        },


        /** clears the text on search textbox
         */
        onSearchClearBtnClick: function(bulkWireFileTemplateResponse) {
            var self = this;
            this.disableSearch();
            FormControllerUtility.showProgressBar(this.view);
            this.view.Search.txtSearch.text = "";
            if (this.view.switchStatus.selectedIndex === this.switchOn) {
                self.setTemplateRecipientData(bulkWireFileTemplateResponse.filter(self.selectedRecords), null, null, null);
            } else {
                self.setTemplateRecipientData(bulkWireFileTemplateResponse, null, null, null);
            }
            this.searchResult = [];
            this.view.forceLayout();
        },

        /** Searches for a payee */
        onSearchBtnClick: function() {
            var self = this;
            FormControllerUtility.showProgressBar(self.view);
            self.view.flxError.setVisibility(false);
            var additionalSearchParam = null;
            if (this.view.switchStatus.selectedIndex === this.switchOn) {
                additionalSearchParam = {
                    key: "status",
                    value: OLBConstants.FONT_ICONS.CHECBOX_SELECTED
                }
            }
            var data = self.loadBulkWireModule().presentationController.BWTLocalSearch(this.recipientData, self.view.Search.txtSearch.text.trim(), additionalSearchParam);
            this.searchResult = data;
            self.setTemplateRecipientData(data, null, null, null);
        },

        /** Disables Search Button
         */
        disableSearch: function() {
            this.view.flxSearch.Search.flxClearBtn.setVisibility(false);
        },
        /** Enable Search Button
         */
        enableSearch: function() {
            this.view.flxSearch.Search.flxClearBtn.setVisibility(true);
        },

        /** On Search Text Key Up
         * @param  {object} event object
         */
        onTxtSearchKeyUp: function(event) {
            var scopeObj = this;
            scopeObj.view.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
            scopeObj.view.Search.btnConfirm.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
            scopeObj.enableSearch();
            this.view.flxSearch.forceLayout();
        },

        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            kony.print('on breakpoint change');
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            orientationHandler.onOrientationChange(this.onBreakpointChange);
        }

    };
});