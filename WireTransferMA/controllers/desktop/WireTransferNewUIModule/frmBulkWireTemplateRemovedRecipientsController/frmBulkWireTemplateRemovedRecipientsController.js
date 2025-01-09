define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {
        closedTemplate: "flxBulkWireRemovedRecipients",
        selectedTemplate: "flxBulkWireRemoveSelected",
        templateDetails: "",
        removedRecipientData: [],
        recipientData: [],
        checkingAccounts: [],
        searchResult: "",

        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view);
                    } else {
                        FormControllerUtility.hideProgressBar(this.view);
                    }
                }
                if (uiData.data) {
                    this.setTemplateRecipientsData(uiData.data);
                }
            }
        },

        init: function() {
            var self = this;
            this.view.onDeviceBack = function() {};
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onBreakpointChange = function() {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
        },

        loadBulkWireModule: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            return wireTransferModule;
        },

        preShow: function() {
            var self = this;
            this.view.Search.txtSearch.text = '';
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            CommonUtilities.disableButton(this.view.btnAddRecipient);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxFooter', 'flxHeader']);
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.btnBack.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                self.changeAllStatus(OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
                var params = {
                    "bulkWireTemplateResponse": self.recipientData,
                    "accountsResponse": self.checkingAccounts,
                    "templateDetails": self.templateDetails,
                    "removedRecipientData": self.removedRecipientData,
                    "isEdit": true
                };
                self.loadBulkWireModule().presentationController.showBulkWireEditRecipientTemplate(params, true);
            }
            this.view.btnAddRecipient.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                self.addRemoveSelectedRecipient(OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
                var params = {
                    "bulkWireTemplateResponse": self.recipientData,
                    "accountsResponse": self.checkingAccounts,
                    "templateDetails": self.templateDetails,
                    "removedRecipientData": self.removedRecipientData,
                    "isEdit": true
                };
                self.loadBulkWireModule().presentationController.showBulkWireEditRecipientTemplate(params, true);
            }
            this.view.imgSortRecName.onTouchEnd = function() {
                var data;
                FormControllerUtility.showProgressBar(self.view);
                self.view.imgSortAmount.src = OLBConstants.IMAGES.SORTING;
                if (self.recipientNameOrder === "DSC") {
                    self.recipientNameOrder = "ASC";
                    self.view.imgSortRecName.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.recipientNameOrder = "DSC";
                    self.view.imgSortRecName.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                if (self.searchResult.length !== 0) {
                    data = self.searchResult;
                    self.sortTemplateRecords(data, "recipientName", self.recipientNameOrder, "string");
                } else {
                    data = self.removedRecipientData;
                    self.sortTemplateRecords(data, "recipientName", self.recipientNameOrder, "string");
                }
            }
            this.view.imgSortAmount.onTouchEnd = function() {
                var data;
                FormControllerUtility.showProgressBar(self.view);
                self.view.imgSortRecName.src = OLBConstants.IMAGES.SORTING;
                if (self.amountOrder === "DSC") {
                    self.amountOrder = "ASC";
                    self.view.imgSortAmount.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.amountOrder = "DSC";
                    self.view.imgSortAmount.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                if (self.searchResult.length !== 0) {
                    data = self.searchResult;
                    self.sortTemplateRecords(data, "amount", self.amountOrder, "string");
                } else {
                    data = self.removedRecipientData;
                    self.sortTemplateRecords(data, "amount", self.amountOrder, "string");
                }
            }
            this.view.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, self.removedRecipientData);
            this.view.imgSortFromAcc.setVisibility(false);
            this.view.imgSortCurrency.setVisibility(false);
            this.view.flxSelectAll.onClick = this.selectAllOnClick.bind(this);
            this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;

        },

        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.customheadernew.activateMenu("Wire Transfer", "Make Bulk Transfer");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },

        setTemplateRecipientsData: function(data) {
            this.templateDetails = data.templateDetails;
            this.removedRecipientData = data.removedRecipientData;
            this.recipientData = data.recipientData;
            this.checkingAccounts = data.checkingAccounts;
            this.setRecipientsData(data.removedRecipientData);
        },

        isDomestic: function(recipient) {
            return typeof recipient.bulkWireTransferType === 'string' && recipient.bulkWireTransferType.toLowerCase() === OLBConstants.BULK_WIRE_TRANSFER_TYPE.DOMESTIC;
        },

        isInternational: function(recipient) {
            return typeof recipient.bulkWireTransferType === 'string' && recipient.bulkWireTransferType.toLowerCase() === OLBConstants.BULK_WIRE_TRANSFER_TYPE.INTERNATIONAL;
        },

        setRecipientsData: function(data) {
            var controller = this;
            var createSegmentSection = function(recipients, sectionHeaderText) {
                if (recipients.length > 0) {
                    return [{
                            "lblHeader": "" + sectionHeaderText.text + "(" + recipients.length + ")",
                            "lblSeparator": ".",
							"lblStatusHeader": OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
							"flxStatusHeader": {
								"isVisible": false
							}
                        },
                        recipients.map(controller.createRecipientSegmentTemplateModel.bind(this))
                    ];
                }
            };
            var domesticRecipientsSection = createSegmentSection(data.filter(this.isDomestic), {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                "toolTip": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                "skin": "sknlbl424242bold15px",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                }
            });
            var internationalRecipientsSection = createSegmentSection(data.filter(this.isInternational), {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader'),
                "toolTip": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader'),
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
            this.view.segRemovedRecipient.widgetDataMap = {
                "lblAmount": "lblAmount",
                "lblDropdown": "lblDropdown",
                "lblFrom": "lblFrom",
                "lblRecipient": "lblRecipient",
                "lblSeparator": "lblSeparator",
                "lblAccNumber": "lblAccNumber",
                "lblAccNumberValue": "lblAccNumberValue",
                "lblBankAddressValue": "lblBankAddressValue",
                "lblBankAddressTitle": "lblBankAddressTitle",
                "lblBankName": "lblBankName",
                "lblBankNameValue": "lblBankNameValue",
                "lblCurrency": "lblCurrency",
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
                "lblStatus": "lblStatus",
				"lblStatusHeader": "lblStatusHeader",
				"flxStatusHeader": "flxStatusHeader",
                "lblSwiftCode": "lblSwiftCode",
                "lblSwiftCodeValue": "lblSwiftCodeValue",
                "lblTransactionTypeValue": "lblTransactionTypeValue",
                "lblTransactionTypeTitle": "lblTransactionTypeTitle",
                "flxSegment": "flxSegment",
				"lblStatusHeader": "lblStatusHeader",
				"flxStatusHeader": "flxStatusHeader",
                "segBulkWireAckSelected": "segBulkWireAckSelected",
                "segBulkWireConfirmTransfer": "segBulkWireConfirmTransfer",
                "flxDropdown": "flxDropdown",
                "lblHeader": "lblHeader",
                "flxIdentifier": "flxIdentifier",
                "flxStatus": "flxStatus",
            }
            var domesticCount = (domesticRecipientsSection && domesticRecipientsSection[1]) ? domesticRecipientsSection[1].length : 0;
            var internationalCount = (internationalRecipientsSection && internationalRecipientsSection[1]) ? internationalRecipientsSection[1].length : 0;
            if (domesticCount + internationalCount === 0) {
                this.showNoTransactionAvailableUI();
            } else {
                this.view.flxNoRecords.setVisibility(false);
                this.view.flxSegRemovedRecipient.setVisibility(true);
                this.view.flxSort.setVisibility(true);
                this.view.segRemovedRecipient.setData([domesticRecipientsSection, internationalRecipientsSection].filter(transactionsExistInSection));
            }
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
        },

        showNoTransactionAvailableUI: function() {
            this.view.flxNoRecords.setVisibility(true);
            this.view.flxSegRemovedRecipient.setVisibility(false);
            this.view.flxSort.setVisibility(false);
        },

        createRecipientSegmentTemplateModel: function(recipientData) {
            var isDomestic = this.isDomestic(recipientData);
            return {
                "lblRecipient": {
                    "text": recipientData.recipientName,
                    "toolTip": recipientData.recipientName,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientName,
                    }
                },
                "lblFrom": {
                    "text": recipientData.accountObject ? CommonUtilities.getAccountDisplayName(recipientData.accountObject) : "-",
                    "toolTip": recipientData.accountObject ? CommonUtilities.getAccountDisplayName(recipientData.accountObject) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.accountObject ? CommonUtilities.getAccountDisplayName(recipientData.accountObject) : "-",
                    }
                },
                "lblCurrency": {
                    "text": recipientData.currency ? recipientData.currency : "-",
                    "toolTip": recipientData.currency,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.currency,
                    }
                },
                "lblAmount": {
                    "text": recipientData.amount ? CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true) + "" : "-",
                    "toolTip": CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true) + "",
                    "accessibilityconfig": {
                        "a11yLabel": CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true),
                    }
                },
                "lblAccNumber": {
                    "text": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    }
                },
                "lblAccNumberValue": {
                    "text": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    "toolTip": recipientData.recipientAccountNumber,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientAccountNumber,
                    }
                },
                "lblTransactionTypeTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "isVisible": isDomestic ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    }
                },
                "lblTransactionTypeValue": {
                    "text": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    "toolTip": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    "isVisible": isDomestic ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    }
                },
                "lblIBAN": {
                    "text": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "toolTip": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "accessibilityconfig": {
                        "a11yLabel": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    }
                },
                "lblIBANValue": {
                    "text": isDomestic ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingNumber ? recipientData.internationalRoutingNumber : "-"),
                    "toolTip": isDomestic ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingNumber ? recipientData.internationalRoutingNumber : "-"),
                    "accessibilityconfig": {
                        "a11yLabel": isDomestic ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingNumber ? recipientData.internationalRoutingNumber : "-"),
                    }
                },
                "lblRecipientType": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    }
                },
                "lblRecipientTypeValue": {
                    "text": recipientData.transactionType,
                    "toolTip": recipientData.transactionType,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.transactionType,
                    }
                },
                "lblBankName": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankName"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.transfers.bankName"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankName"),
                    }
                },
                "lblBankNameValue": {
                    "text": recipientData.recipientBankName,
                    "toolTip": recipientData.recipientBankName,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientBankName,
                    }
                },
                "lblSwiftCode": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    }
                },
                "lblSwiftCodeValue": {
                    "text": recipientData.bulkWireTransferType,
                    "toolTip": recipientData.bulkWireTransferType,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType,
                    }
                },
                "lblRecipientAddressTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    }
                },
                "lblRecipientAddressValue": {
                    "text": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.recipientState ? ", " + recipientData.recipientState : "") + "" + (recipientData.recipientZipCode ? " " + recipientData.recipientZipCode : ""),
                    "toolTip": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.recipientState ? ", " + recipientData.recipientState : "") + "" + (recipientData.recipientZipCode ? " " + recipientData.recipientZipCode : ""),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.recipientState ? ", " + recipientData.recipientState : "") + "" + (recipientData.recipientZipCode ? " " + recipientData.recipientZipCode : ""),
                    }
                },
                "lblBankAddressTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    }
                },
                "lblBankAddressValue": {
                    "text": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.recipientBankstate ? ", " + recipientData.recipientBankstate : "") + "" + (recipientData.recipientBankZipCode ? " " + recipientData.recipientBankZipCode : ""),
                    "toolTip": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.recipientBankstate ? ", " + recipientData.recipientBankstate : "") + "" + (recipientData.recipientBankZipCode ? " " + recipientData.recipientBankZipCode : ""),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.recipientBankstate ? ", " + recipientData.recipientBankstate : "") + "" + (recipientData.recipientBankZipCode ? " " + recipientData.recipientBankZipCode : ""),
                    }
                },
                "lblNoteTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    "isVisible": false,
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    }
                },
                "lblNotesValue": {
                    "text": recipientData.note + "",
                    "toolTip": recipientData.note + "",
                    "isVisible": false,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.note,
                    }
                },
                "flxDropdown": {
                    "onClick": this.onClickToggle,
                },
                "lblDropdown": {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                },
                "lblStatus": {
                    "text": recipientData.status ? recipientData.status : OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                    "toolTip": recipientData.status,
                },
                "flxStatus": {
                    "onClick": this.toggleCheckBox,
                },
                "bulkWireTemplateLineItemID": recipientData.bulkWireTemplateLineItemID,
                "flxIdentifier": "flxIdentifier",
                "lblIdentifier": ".",
                "lblSeparator2": ".",
                "template": this.closedTemplate,
            }
        },

        selectAllOnClick: function() {
            FormControllerUtility.showProgressBar(this.view);
            if (this.view.lblSelectAll.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
                this.changeAllStatus(OLBConstants.FONT_ICONS.CHECBOX_SELECTED);
                CommonUtilities.enableButton(this.view.btnAddRecipient);
            } else {
                this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                this.changeAllStatus(OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
                CommonUtilities.disableButton(this.view.btnAddRecipient);
            }
            this.setRecipientsData(this.removedRecipientData);
        },

        changeAllStatus: function(status) {
            this.removedRecipientData.forEach(function(item) {
                item.status = status;
            });
        },

        onClickToggle: function() {
            var scopeObj = this;
            var index = kony.application.getCurrentForm().segRemovedRecipient.selectedRowIndex;
            var sectionIndex = index[0];
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segRemovedRecipient.data;
            var section = data.length;
            var collapseAll = function(segments, section) {
                segments.forEach(function(segment, i) {
                    if (segment.template === scopeObj.selectedTemplate) {
                        segment.template = scopeObj.closedTemplate;
                        segment.lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                        kony.application.getCurrentForm().segRemovedRecipient.setDataAt(segment, i, section);
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
                kony.application.getCurrentForm().segRemovedRecipient.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
            }
        },

        toggleCheckBox: function() {
            var index = kony.application.getCurrentForm().segRemovedRecipient.selectedRowIndex;
            var sectionIndex = index[0];
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segRemovedRecipient.data;
            if (data[sectionIndex][1][rowIndex].lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                data[sectionIndex][1][rowIndex].lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
            } else {
                data[sectionIndex][1][rowIndex].lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            }
            if (this.isRecordSelected() === true) {
                CommonUtilities.enableButton(this.view.btnAddRecipient);
            } else {
                CommonUtilities.disableButton(this.view.btnAddRecipient);
            }
            kony.application.getCurrentForm().segRemovedRecipient.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
        },

        isRecordSelected: function() {
            var data = kony.application.getCurrentForm().segRemovedRecipient.data;
            var flag = false;
            var domesticData = [];
            if (data[0]) {
                domesticData = data[0][1];
            }
            domesticData.forEach(function(item) {
                if (item.lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    flag = true;
                }
            })
            var internationalData = [];
            if (data[1]) {
                internationalData = data[1][1];
            }
            internationalData.forEach(function(item) {
                if (item.lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    flag = true;
                }
            })
            return flag;
        },

        addRemoveSelectedRecipient: function() {
            var self = this;
            var data = kony.application.getCurrentForm().segRemovedRecipient.data;
            var domesticData = [];
            if (data && data[0]) {
                domesticData = data[0][1];
            }
            var internationalData = [];
            if (data && data[1]) {
                internationalData = data[1][1];
            }
            domesticData.forEach(function(bulkWireTemplateLineItem) {
                self.removedRecipientData.forEach(function(record, index) {
                    if (bulkWireTemplateLineItem.lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED && bulkWireTemplateLineItem.bulkWireTemplateLineItemID === record.bulkWireTemplateLineItemID) {
                        self.recipientData.push(record);
                        self.removedRecipientData.splice(index, 1);
                    }
                })
            });
            internationalData.forEach(function(bulkWireTemplateLineItem) {
                self.removedRecipientData.forEach(function(record, index) {
                    if (bulkWireTemplateLineItem.lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED && bulkWireTemplateLineItem.bulkWireTemplateLineItemID === record.bulkWireTemplateLineItemID) {
                        self.recipientData.push(record);
                        self.removedRecipientData.splice(index, 1);
                    }
                })
            });
        },

        sortTemplateRecords: function(data, sortParam, sortOrder, type) {
            var sortedRecord;
            if (type === "string")
                sortedRecord = this.loadBulkWireModule().presentationController.sortBWTStringRecords(data, sortParam, sortOrder);
            if (type === "number")
                sortedRecord = this.loadBulkWireModule().presentationController.sortBWTNumberRecords(data, sortParam, sortOrder);
            this.setRecipientsData(sortedRecord);
        },


        /** clears the text on search textbox
         */
        onSearchClearBtnClick: function() {
            var self = this;
            this.disableSearch();
            FormControllerUtility.showProgressBar(this.view);
            this.view.Search.txtSearch.text = "";
            self.setRecipientsData(self.removedRecipientData);
            this.searchResult = [];
            this.view.forceLayout();
        },

        /** Searches for a payee */
        onSearchBtnClick: function() {
            var self = this;
            FormControllerUtility.showProgressBar(self.view);
            self.view.flxError.setVisibility(false);
            var data = self.loadBulkWireModule().presentationController.BWTLocalSearch(this.removedRecipientData, self.view.Search.txtSearch.text.trim());
            this.searchResult = data;
            self.setRecipientsData(data);
            this.view.forceLayout();
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
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            kony.print('on breakpoint change');
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            orientationHandler.onOrientationChange(this.onBreakpointChange);
        }

    };
});