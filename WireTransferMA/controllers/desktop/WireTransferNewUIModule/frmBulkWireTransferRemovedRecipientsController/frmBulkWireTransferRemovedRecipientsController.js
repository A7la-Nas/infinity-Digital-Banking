define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {
        closedTemplate: "flxBulkWireRemovedRecipients",
        selectedTemplate: "flxBulkWireRemoveSelected",
        bulkWireFileID: "",
        bulkWireFileResponse: "",
        checkingAccounts: [],
        alreadyRemovedRecipientData: "",
        selectedRecordsID: new Set(),
        originaRecipientlData: "",
        fileInfo: "",
        editData: "",
        sortBy: "",
        orderBy: "",

        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view);
                    } else {
                        FormControllerUtility.hideProgressBar(this.view);
                    }
                }
                if (uiData.recipientsData) {
                    this.setRecipientsData(uiData.recipientsData);
                }
            }
        },

        init: function() {
            var self = this;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = function() {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
        },

        loadBulkWireModule: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            return wireTransferModule;
        },

        /** clears the text on search textbox
         */
        onSearchClearBtnClick: function(editData) {
            var self = this;
            this.disableSearch();
            FormControllerUtility.showProgressBar(this.view);
            this.view.Search.txtSearch.text = "";
            self.setRecipientsData(self.editData, false);
            this.view.forceLayout();
        },

        /** Searches for a payee */
        onSearchBtnClick: function() {
            var self = this;
            FormControllerUtility.showProgressBar(self.view);
            self.view.flxError.setVisibility(false);
            self.searchForRecords();
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
            var searchKeyword = scopeObj.view.Search.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.view.Search.btnConfirm.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.enableSearch();
            } else {
                scopeObj.view.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.view.Search.btnConfirm.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.disableSearch();
            }
            this.view.flxSearch.forceLayout();
        },


        preShow: function() {
            var self = this;
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.Search.txtSearch.text = '';
            this.view.imgSortRecName.toolTip=kony.i18n.getLocalizedString("i18n.payments.sortByRecipientName");
            this.view.imgSortAmount.toolTip=kony.i18n.getLocalizedString("i18n.payments.sortByAmount");
            CommonUtilities.disableButton(this.view.btnAddRecipient);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxFooter', 'flxHeader']);
            this.view.btnBack.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                var newData = self.addRemoveSelectedRecipient(OLBConstants.FONT_ICONS.CHECBOX_SELECTED);
                var response = {};
                response.checkingAccounts = self.checkingAccounts;
                response.bulkWireFileResponse = newData;
                response.bulkWireFileInfo = self.fileInfo;
                response.removedRecipientData = self.alreadyRemovedRecipientData;
                self.loadBulkWireModule().presentationController.showBulkWireEditTransfer(response);
            }
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.btnAddRecipient.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                var newData = self.addRemoveSelectedRecipient(OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
                var removedRecipientData = self.addRemoveSelectedRecipient(OLBConstants.FONT_ICONS.CHECBOX_SELECTED);
                var response = {};
                response.checkingAccounts = self.checkingAccounts;
                response.bulkWireFileResponse = newData;
                response.bulkWireFileInfo = self.fileInfo;
                response.removedRecipientData = removedRecipientData;
                self.loadBulkWireModule().presentationController.showBulkWireEditTransfer(response);
            }
            this.view.imgSortRecName.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(self.view);
                if (self.recipientOrder === "DSC") {
                    self.recipientOrder = "ASC";
                    self.view.imgSortRecName.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.recipientOrder = "DSC";
                    self.view.imgSortRecName.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                self.sortRecordsBasedOnParams("name", self.recipientOrder);
            }
            this.view.imgSortAmount.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(self.view);
                if (self.amountOrder === "DSC") {
                    self.amountOrder = "ASC";
                    self.view.imgSortAmount.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.amountOrder = "DSC";
                    self.view.imgSortAmount.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                self.sortRecordsBasedOnParams("amount", self.amountOrder);
            }
            this.view.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, self.editData);
            this.view.imgSortFromAcc.setVisibility(false);
            this.view.imgSortCurrency.setVisibility(false);
        },

        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.customheadernew.activateMenu("Wire Transfer", "Make Bulk Transfer");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },


        setRecipientsData: function(data, isSearchSort) {
            var controller = this;
            var recipientsData;
            if (isSearchSort) {
                recipientsData = data;
            } else {
                this.editData = data;
                recipientsData = data.removedRecipientData;
                this.alreadyRemovedRecipientData = data.removedRecipientData;
                this.bulkWireFileResponse = data.originaRecipientlData;
                this.checkingAccounts = data.checkingAccounts;
                this.fileInfo = data.bulkWireFileInfo;
            }
            var createSegmentSection = function(recipients, sectionHeaderText) {
                if (recipients.length > 0) {
                    return [{
                            "lblHeader": "" + sectionHeaderText.text + "(" + recipients.length + ")",
                            "lblSeparator": "."
                        },
                        recipients.map(controller.createRecipientSegmentModel.bind(this))
                    ];
                }
            };
            var transactionsExistInSection = function(section) {
                if (section) {
                    return section[1] && section[1].length && section[1].length > 0;
                }
            }
            var domesticRecipientsSection = createSegmentSection(recipientsData.Domestic, {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                "toolTip": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                "skin": "sknlbl424242bold15px",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                }
            });
            var internationalRecipientsSection = createSegmentSection(recipientsData.International, {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader'),
                "toolTip": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader'),
                "skin": "sknlbl424242bold15px",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader'),
                }
            });
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
                "lblSwiftCode": "lblSwiftCode",
                "lblSwiftCodeValue": "lblSwiftCodeValue",
                "lblTransactionTypeValue": "lblTransactionTypeValue",
                "lblTransactionTypeTitle": "lblTransactionTypeTitle",
                "flxSegment": "flxSegment",
                "segBulkWireAckSelected": "segBulkWireAckSelected",
                "segBulkWireConfirmTransfer": "segBulkWireConfirmTransfer",
                "flxDropdown": "flxDropdown",
                "lblHeader": "lblHeader",
                "flxIdentifier": "flxIdentifier",
                "flxStatus": "flxStatus"
            }
            domesticRecipientsSection = this.removeNullRecords(domesticRecipientsSection);
            internationalRecipientsSection = this.removeNullRecords(internationalRecipientsSection);
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

        removeNullRecords: function(data) {
            var finalData = [];
            if (data && data[0]) {
                finalData.push(data[0]);
            }
            var recipientData = [];
            if (data && data[1]) {
                var record = data[1];
                for (var index = 0; index < record.length; index++) {
                    if (record[index] !== null) {
                        recipientData.push(record[index]);
                    }
                }
            }
            finalData.push(recipientData);
            return finalData;
        },

        isDomestic: function(recipient) {
            return typeof recipient.bulkWireTransferType === 'string' && recipient.bulkWireTransferType.toLowerCase() === OLBConstants.BULK_WIRE_TRANSFER_TYPE.DOMESTIC;
        },

        createRecipientSegmentModel: function(recipientData) {
            var isDomestic = this.isDomestic(recipientData);
            if (recipientData.isDeleted === true) {
                return {
                    "lblRecipient": {
                        "text": recipientData.recipientName,
                        "toolTip": recipientData.recipientName,
                        "accessibilityconfig": {
                            "a11yLabel": recipientData.recipientName,
                        }
                    },
                    "lblFrom": {
                        "text": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "",
                        "toolTip": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "",
                        "accessibilityconfig": {
                            "a11yLabel": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "",
                        }
                    },
                    "lblCurrency": {
                        "text": applicationManager.getConfigurationManager().getCurrency(recipientData.currency),
                        "toolTip": applicationManager.getConfigurationManager().getCurrency(recipientData.currency),
                        "accessibilityconfig": {
                            "a11yLabel": applicationManager.getConfigurationManager().getCurrency(recipientData.currency),
                        }
                    },
                    "lblAmount": {
                        "text": CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true),
                        "toolTip": CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true),
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
                        "text": recipientData.fromAccountNumber,
                        "toolTip": recipientData.fromAccountNumber,
                        "accessibilityconfig": {
                            "a11yLabel": recipientData.fromAccountNumber,
                        }
                    },
                    "lblTransactionTypeTitle": {
                        "text": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.Note") : kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                        "accessibilityconfig": {
                            "a11yLabel": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.Note") : kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                        }
                    },
                    "lblTransactionTypeValue": {
                        "text": isDomestic ? (recipientData.note ? recipientData.note : "-") : (recipientData.swiftCode ? recipientData.swiftCode : "-"),
                        "accessibilityconfig": {
                            "a11yLabel": isDomestic ? (recipientData.note ? recipientData.note : "-") : (recipientData.swiftCode ? recipientData.swiftCode : "-"),
                        }
                    },
                    "lblIBAN": {
                        "text": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.IBAN"),
                        "accessibilityconfig": {
                            "a11yLabel": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.IBAN"),
                        }
                    },
                    "lblIBANValue": {
                        "text": isDomestic ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingNumber ? recipientData.internationalRoutingNumber : "-"),
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
                        "accessibilityconfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                        },
                        "isVisible": isDomestic ? false : true
                    },
                    "lblNotesValue": {
                        "text": recipientData.note,
                        "toolTip": recipientData.note,
                        "accessibilityconfig": {
                            "a11yLabel": recipientData.note,
                        },
                        "isVisible": isDomestic ? false : true
                    },
                    "flxDropdown": {
                        "onClick": this.onClickToggle,
                    },
                    "lblDropdown": {
                        "text": "O"
                    },
                    "lblStatus": {
                        "text": recipientData.status ? recipientData.status : OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                        "toolTip": recipientData.status,
                    },
                    "flxStatus": {
                        "onClick": this.toggleCheckBox,
                    },
                    "bulkWireFileLineItemID": recipientData.bulkWireFileLineItemID,
                    "flxIdentifier": "flxIdentifier",
                    "template": this.closedTemplate,
                }
            }
            return null;
        },

        filterAccount: function(fromAccountNumber) {
            var currAccounts = this.checkingAccounts;
            for (var index = 0; index < currAccounts.length; index++) {
                if (currAccounts[index].accountID === fromAccountNumber) {
                    return currAccounts[index];
                }
            }
            return false;
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
                this.selectedRecordsID.add(data[sectionIndex][1][rowIndex].bulkWireFileLineItemID);
            } else {
                data[sectionIndex][1][rowIndex].lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                this.selectedRecordsID.delete(data[sectionIndex][1][rowIndex].bulkWireFileLineItemID);
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
            var buttonStatus = false;
            var domesticData = [];
            if (data[0]) {
                domesticData = data[0][1];
            }
            domesticData.forEach(function(item) {
                if (item.lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    buttonStatus = true;
                }
            })
            var internationalData = [];
            if (data[1]) {
                internationalData = data[1][1];
            }
            internationalData.forEach(function(item) {
                if (item.lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    buttonStatus = true;
                }
            })
            return buttonStatus;
        },

        searchForRecords: function() {
            var enteredText = this.view.Search.txtSearch.text ? this.view.Search.txtSearch.text.trim() : "";
            enteredText = enteredText.toLocaleLowerCase();
            var domesticRecord = this.alreadyRemovedRecipientData.Domestic;
            var internationalRecord = this.alreadyRemovedRecipientData.International;
            var filteredResponse = {};
            var filteredDomesticRecord = [];
            var filteredInternationalRecord = [];
            if (domesticRecord.length > 0) {
                domesticRecord.forEach(function(item) {
                    var item_amount = "" + item.amount;
                    var routingNumber = "" + item.routingNumber;
                    var internationalRoutingNumber = "" + item.internationalRoutingNumber;
                    var recipientName = item.recipientName.toLocaleLowerCase();
                    var recipientBankName = item.recipientBankName.toLocaleLowerCase();
                    var transactionType = item.transactionType.toLocaleLowerCase();
                    var swiftCode = item.swiftCode.toLocaleLowerCase();
                    var fromAccountNumber = item.fromAccountNumber.toLocaleLowerCase();
                    var note = item.note.toLocaleLowerCase();
                    var bulkWireTransferType = item.bulkWireTransferType.toLocaleLowerCase();
                    var recipientAddressLine1 = item.recipientAddressLine1.toLocaleLowerCase();
                    var recipientAddressLine2 = item.recipientAddressLine2.toLocaleLowerCase();
                    var recipientCity = item.recipientCity.toLocaleLowerCase();
                    var recipientState = item.recipientState.toLocaleLowerCase();
                    var recipientZipCode = "" + item.recipientZipCode;
                    var recipientBankAddress1 = item.recipientBankAddress1.toLocaleLowerCase();
                    var recipientBankAddress2 = item.recipientBankAddress2.toLocaleLowerCase();
                    var recipientBankcity = item.recipientBankcity.toLocaleLowerCase();
                    var recipientBankstate = item.recipientBankstate.toLocaleLowerCase();
                    var recipientBankZipCode = "" + item.recipientBankZipCode;
                    if (recipientName.indexOf(enteredText) >= 0 || recipientBankName.indexOf(enteredText) >= 0 ||
                        transactionType.indexOf(enteredText) >= 0 || swiftCode.indexOf(enteredText) >= 0 ||
                        fromAccountNumber.indexOf(enteredText) >= 0 || note.indexOf(enteredText) >= 0 ||
                        item_amount.indexOf(enteredText) >= 0 || routingNumber.indexOf(enteredText) >= 0 || internationalRoutingNumber.indexOf(enteredText) >= 0 ||
                        bulkWireTransferType.indexOf(enteredText) >= 0 || recipientAddressLine1.indexOf(enteredText) >= 0 || recipientAddressLine2.indexOf(enteredText) >= 0 ||
                        recipientCity.indexOf(enteredText) >= 0 || recipientState.indexOf(enteredText) >= 0 || recipientZipCode.indexOf(enteredText) >= 0 ||
                        recipientBankAddress1.indexOf(enteredText) >= 0 || recipientBankAddress2.indexOf(enteredText) >= 0 ||
                        recipientBankcity.indexOf(enteredText) >= 0 || recipientBankstate.indexOf(enteredText) >= 0 ||
                        recipientBankZipCode.indexOf(enteredText) >= 0) {
                        filteredDomesticRecord.push(item);
                    }
                })
            }
            if (internationalRecord.length > 0) {
                internationalRecord.forEach(function(item) {
                    var item_amount = "" + item.amount;
                    var routingNumber = "" + item.routingNumber;
                    var internationalRoutingNumber = "" + item.internationalRoutingNumber;
                    var recipientName = item.recipientName.toLocaleLowerCase();
                    var recipientBankName = item.recipientBankName.toLocaleLowerCase();
                    var transactionType = item.transactionType.toLocaleLowerCase();
                    var swiftCode = item.swiftCode.toLocaleLowerCase();
                    var fromAccountNumber = item.fromAccountNumber.toLocaleLowerCase();
                    var note = item.note.toLocaleLowerCase();
                    var bulkWireTransferType = item.bulkWireTransferType.toLocaleLowerCase();
                    var recipientAddressLine1 = item.recipientAddressLine1.toLocaleLowerCase();
                    var recipientAddressLine2 = item.recipientAddressLine2.toLocaleLowerCase();
                    var recipientCity = item.recipientCity.toLocaleLowerCase();
                    var recipientState = item.recipientState.toLocaleLowerCase();
                    var recipientZipCode = "" + item.recipientZipCode;
                    var recipientBankAddress1 = item.recipientBankAddress1.toLocaleLowerCase();
                    var recipientBankAddress2 = item.recipientBankAddress2.toLocaleLowerCase();
                    var recipientBankcity = item.recipientBankcity.toLocaleLowerCase();
                    var recipientBankstate = item.recipientBankstate.toLocaleLowerCase();
                    var recipientBankZipCode = "" + item.recipientBankZipCode;
                    if (recipientName.indexOf(enteredText) >= 0 || recipientBankName.indexOf(enteredText) >= 0 ||
                        transactionType.indexOf(enteredText) >= 0 || swiftCode.indexOf(enteredText) >= 0 ||
                        fromAccountNumber.indexOf(enteredText) >= 0 || note.indexOf(enteredText) >= 0 ||
                        item_amount.indexOf(enteredText) >= 0 || routingNumber.indexOf(enteredText) >= 0 || internationalRoutingNumber.indexOf(enteredText) >= 0 ||
                        bulkWireTransferType.indexOf(enteredText) >= 0 || recipientAddressLine1.indexOf(enteredText) >= 0 || recipientAddressLine2.indexOf(enteredText) >= 0 ||
                        recipientCity.indexOf(enteredText) >= 0 || recipientState.indexOf(enteredText) >= 0 || recipientZipCode.indexOf(enteredText) >= 0 ||
                        recipientBankAddress1.indexOf(enteredText) >= 0 || recipientBankAddress2.indexOf(enteredText) >= 0 ||
                        recipientBankcity.indexOf(enteredText) >= 0 || recipientBankstate.indexOf(enteredText) >= 0 ||
                        recipientBankZipCode.indexOf(enteredText) >= 0) {
                        filteredInternationalRecord.push(item);
                    }
                })
            }
            filteredResponse.Domestic = filteredDomesticRecord;
            filteredResponse.International = filteredInternationalRecord;
            this.setRecipientsData(filteredResponse, true);
        },

        addRemoveSelectedRecipient: function(status) {
            var self = this;
            var removedRecipientsID = new Set();
            var data = kony.application.getCurrentForm().segRemovedRecipient.data;
            var domesticData = [];
            if (data && data[0] && self.alreadyRemovedRecipientData.Domestic.length !== 0) {
                domesticData = data[0][1];
            }
            domesticData.forEach(function(item) {
                if (item.lblStatus.text === status) {
                    removedRecipientsID.add(item.bulkWireFileLineItemID); //removedRecipientsID is unchecked ones
                }
            })
            var internationalData = [];
            if (data && data[1]) {
                internationalData = data[1][1];
            }
            if (self.alreadyRemovedRecipientData.Domestic.length === 0 && self.alreadyRemovedRecipientData.International.length > 0) {
                internationalData = data[0][1];
            }
            internationalData.forEach(function(item) {
                if (item.lblStatus.text === status) {
                    removedRecipientsID.add(item.bulkWireFileLineItemID);
                }
            })
            var newRecipientData = [];
            var Domestic = [];
            var International = [];
            if (self.bulkWireFileResponse.Domestic.length > 0) {
                self.bulkWireFileResponse.Domestic.forEach(function(record) {
                    if (!removedRecipientsID.has(record.bulkWireFileLineItemID)) {
                        if (status === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                            record.isDeleted = false;
                            record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                        }
                        Domestic.push(record);
                    }
                })
            }
            if (self.bulkWireFileResponse.International.length > 0) {
                self.bulkWireFileResponse.International.forEach(function(record) {
                    if (!removedRecipientsID.has(record.bulkWireFileLineItemID)) {
                        if (status === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                            record.isDeleted = false;
                            record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                        }
                        International.push(record);
                    }
                })
            }
            newRecipientData.Domestic = Domestic;
            newRecipientData.International = International;
            return newRecipientData;
        },

        sortRecordsBasedOnParams: function(sortParam, sortOrder) {
            var record = this.alreadyRemovedRecipientData;
            var domesticData = record.Domestic;
            var internationalData = record.International;
            if (sortParam === "name") {
                if (sortOrder === "ASC") {
                    domesticData.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name1.recipientName.localeCompare(name2.recipientName)
                    })
                    internationalData.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name1.recipientName.localeCompare(name2.recipientName)
                    })
                }
                if (sortOrder === "DSC") {
                    domesticData.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name2.recipientName.localeCompare(name1.recipientName)
                    })
                    internationalData.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name2.recipientName.localeCompare(name1.recipientName)
                    })
                }
            }
            if (sortParam === "amount") {
                if (sortOrder === "ASC") {
                    domesticData.sort(function(amount1, amount2) {
                        return amount1.amount - amount2.amount;
                    })
                    internationalData.sort(function(amount1, amount2) {
                        return amount1.amount - amount2.amount;
                    })
                }
                if (sortOrder === "DSC") {
                    domesticData.sort(function(amount1, amount2) {
                        return amount2.amount - amount1.amount;
                    })
                    internationalData.sort(function(amount1, amount2) {
                        return amount2.amount - amount1.amount;
                    })
                }
            }
            var sortedRecord = {};
            sortedRecord.Domestic = domesticData;
            sortedRecord.International = internationalData;
            this.setRecipientsData(sortedRecord, true);
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