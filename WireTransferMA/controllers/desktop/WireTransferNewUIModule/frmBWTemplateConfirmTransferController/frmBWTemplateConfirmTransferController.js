define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {
        closedTemplate: "flxBulkWireConfirmTransfer",
        selectedTemplate: "flxBulkWireAckSelected",
        bwTemplateResponse: "",
        bwTemplateInfo: "",
        tempData: "",
        sortBy: "",
        orderBy: "",
        templateDetails: "",
        removedRecipientData: [],
        checkingAccounts: [],
        recipientData: [],

        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
                if (uiData.templateDetails) {
                    this.saveDefaultValues(uiData);
                    this.setTemplateDetails(uiData.templateDetails);
                }
                if (uiData.recipientData) {
                    this.bwTemplateResponse = uiData.recipientData;
                    this.setRecipientsData(uiData.recipientData, false);
                }
                if (uiData.errorMessage) {
                    this.showCreateErrorMsg(uiData.errorMessage);
                }
            }
        },

        isDomestic: function(recipient) {
            return typeof recipient.bulkWireTransferType === 'string' && recipient.bulkWireTransferType.toLowerCase() === OLBConstants.BULK_WIRE_TRANSFER_TYPE.DOMESTIC;
        },

        isInternational: function(recipient) {
            return typeof recipient.bulkWireTransferType === 'string' && recipient.bulkWireTransferType.toLowerCase() === OLBConstants.BULK_WIRE_TRANSFER_TYPE.INTERNATIONAL;
        },

        isExistingRecipient: function(recipient) {
            return typeof recipient.templateRecipientCategory === 'string' && recipient.templateRecipientCategory.toLowerCase() === OLBConstants.RECIPIENT_CATEGORY.EXISTING_RECIPIENT.toLowerCase();
        },

        init: function() {
            var scopeObj = this;
            this.view.onDeviceBack = function() {};
            this.view.btnConfirmTransfer.text = kony.i18n.getLocalizedString("i18n.bulkwires.confirmtransfer");
            this.view.btnConfirmTransfer.toolTip = kony.i18n.getLocalizedString("i18n.bulkwires.confirmtransfer");
            this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            this.view.btnConfirmTransfer.onClick = this.createBulkWireTransactions.bind(this);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.lblSortRecipient.toolTip = kony.i18n.getLocalizedString("i18n.transfers.benificiaryName");
            this.view.imgSortRecipient.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.sortByName");
            CommonUtilities.setText(this.view.lblverifyconfirm, kony.i18n.getLocalizedString("i18n.bulkwires.verifyheader"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblTotalRecipientsTitle, kony.i18n.getLocalizedString("i18n.bulkwires.totalreipients"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblDomesticTitle, kony.i18n.getLocalizedString("i18n.bulkWires.domesticRecipientsHeader") + ":", accessibilityConfig);
            CommonUtilities.setText(this.view.lblInternationalTitle, kony.i18n.getLocalizedString("i18n.bulkWires.internationalRecipientsHeader") + ":", accessibilityConfig);
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.imgSortRecipient.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                if (scopeObj.recipientOrder === "DSC") {
                    scopeObj.recipientOrder = "ASC";
                    scopeObj.view.imgSortRecipient.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    scopeObj.recipientOrder = "DSC";
                    scopeObj.view.imgSortRecipient.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                scopeObj.sortRecordsBasedOnParams("name", scopeObj.recipientOrder);
            }
            this.view.imgSortType.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                if (scopeObj.amountOrder === "DSC") {
                    scopeObj.amountOrder = "ASC";
                    scopeObj.view.imgSortType.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    scopeObj.amountOrder = "DSC";
                    scopeObj.view.imgSortType.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                scopeObj.sortRecordsBasedOnParams("amount", scopeObj.amountOrder);
            }
            this.view.btnBack.onClick = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                var params = {
                    "bulkWireTemplateResponse": scopeObj.recipientData,
                    "accountsResponse": scopeObj.checkingAccounts,
                    "templateDetails": scopeObj.templateDetails,
                    "removedRecipientData": scopeObj.removedRecipientData,
                    "isEdit": true
                };
                scopeObj.loadBulkWireModule().presentationController.showBulkWireEditRecipientTemplate(params, true);
            }
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.bulkwires.EditRecipientHeader"), accessibilityConfig);
        },

        preShowConfirmBulkWireTransfer: function() {
            var self = this;
            this.view.Search.txtSearch.text = '';
            this.view.btnCancel.setVisibility(true);
            this.view.btnCancel.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                var params = {
                    "formName": "frmMakeBulkTransferTemplate",
                    "bulkWireCategoryFilter": OLBConstants.BULKWIRE_CATEGORY_FILTER.TEMPLATES
                };
                self.loadBulkWireModule().presentationController.showBulkwirefiles(params);
            }
            this.view.errorMsg.setVisibility(false);
            this.view.Search.flxClearBtn.setVisibility(false);
            this.view.imgSortDescription.setVisibility(false);
            this.view.imgSortReferenceID.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(self.view, ['flxHeader', 'flxFooter']);
        },

        postShowConfirmBulkWireTransfer: function() {
            this.view.customheadernew.activateMenu("Wire Transfer", "Make Bulk Transfer");
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.setDefaultHoverSkins();
            applicationManager.getNavigationManager().applyUpdates(this);
        },

        setTemplateDetails: function(fileData) {
            var self = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblFileName, fileData.bulkWireName, accessibilityConfig);
            this.view.lblFileName.toolTip = fileData.bulkWireName;
            this.bwTemplateInfo = fileData;
        },

        loadBulkWireModule: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            return wireTransferModule;
        },

        showCreateErrorMsg: function(data) {
            this.view.errorMsg.setVisibility(true);
            this.view.errorMsg.text = data;
            FormControllerUtility.hideProgressBar(this.view)
            this.view.forceLayout();
        },

        saveDefaultValues: function(data) {
            this.templateDetails = data.templateDetails;
            this.removedRecipientData = data.removedRecipientData;
            this.checkingAccounts = data.checkingAccounts;
            this.recipientData = data.recipientData;
        },

        createBulkWireTransactions: function() {
            var self = this;
            FormControllerUtility.showProgressBar(self.view);
            var bulkWireRecords = [];
            if (this.bwTemplateResponse.length > 0) {
                this.bwTemplateResponse.forEach(function(item) {
                    bulkWireRecords.push(self.getBulkWireTransactionMappings(item))
                })
            }
            var bulkPay = {
                "bulkWireTemplateID": this.bwTemplateInfo.bulkWireID,
                "bulkWireName": this.bwTemplateInfo.bulkWireName,
                "bulkWireType": "Template",
                "totalCountOfTransactions": this.bwTemplateInfo.domesticCount + this.bwTemplateInfo.internationalCount,
                "totalCountOfDomesticTransactions": this.bwTemplateInfo.domesticCount,
                "totalCountOfInternationalTransactions": this.bwTemplateInfo.internationalCount,
                "BWrecords": bulkWireRecords,
            }
            var requestObj = {
                bulkPayString: JSON.stringify(bulkPay)
            }
            self.loadBulkWireModule().presentationController.createBulkWireTemplateTransaction(requestObj, this.bwTemplateInfo);
        },

        getBulkWireTransactionMappings: function(recipientData) {
            var recipientObject = {
                "fromAccountNumber": recipientData.fromAccountNumber,
                "amount": applicationManager.getFormatUtilManager().deFormatAmount(recipientData.amount),
                "transactionType": "Wire",
                "payeeNickName": recipientData.accountNickname || recipientData.recipientName,
                "payeeAccountNumber": recipientData.recipientAccountNumber,
                "payeeAddressLine1": recipientData.recipientAddressLine1,
                "payeeAddressLine2": recipientData.recipientAddressLine2,
                "payeeName": recipientData.recipientName,
                "payeeCurrency": recipientData.currency,
                "wireAccountType": recipientData.bulkWireTransferType,
                "country": recipientData.recipientCountryName,
                "bankName": recipientData.recipientBankName,
                "zipCode": recipientData.recipientZipCode,
                "cityName": recipientData.recipientCity,
                "state": recipientData.recipientState,
                "bankAddressLine1": recipientData.recipientBankAddress1,
                "bankAddressLine2": recipientData.recipientBankAddress2,
                "bankCity": recipientData.recipientBankcity,
                "bankState": recipientData.recipientBankstate,
				"transactionCurrency": applicationManager.getFormatUtilManager().getCurrencySymbolCode(recipientData.currency),
                "payeeType": recipientData.transactionType
            }
            if (this.isInternational(recipientData)) {
                recipientObject.swiftCode = recipientData.swiftCode;
                recipientObject.internationalRoutingCode = recipientData.internationalRoutingNumber;
            } else {
                recipientObject.routingNumber = recipientData.routingNumber;
            }
            if (this.isExistingRecipient(recipientData)) {
                recipientObject.payeeId = recipientData.payeeId;
            }
            return recipientObject;
        },

        setRecipientsData: function(data, isSearch) {
            this.tempData = data;
            var controller = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
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
            var domesticRecipientsSection = createSegmentSection(data.filter(controller.isDomestic), {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                "skin": "sknlbl424242bold15px",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                }
            });
            var internationalRecipientsSection = createSegmentSection(data.filter(controller.isInternational), {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader'),
                "skin": "sknlbl424242bold15px",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader'),
                }
            });
            this.view.segmentTransfers.widgetDataMap = {
                "lblAmount": "lblAmount",
                "lblDropdown": "lblDropdown",
                "lblFromAccountNo": "lblFromAccountNo",
                "lblRecipient": "lblRecipient",
                "lblReferenceID": "lblReferenceID",
                "lblSeparator": "lblSeparator",
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
                "flxNoteTitle": "flxNoteTitle",
                "flxNotes": "flxNotes",
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
            }
            var domesticCount = (domesticRecipientsSection && domesticRecipientsSection[1]) ? domesticRecipientsSection[1].length : 0;
            var internationalCount = (internationalRecipientsSection && internationalRecipientsSection[1]) ? internationalRecipientsSection[1].length : 0;
            if (!isSearch) {
                this.bwTemplateInfo.domesticCount = domesticCount;
                this.bwTemplateInfo.internationalCount = internationalCount;
            }
            var totalRecipients = domesticCount + internationalCount;
            if (totalRecipients === 0) {
                CommonUtilities.disableButton(this.view.btnConfirmTransfer);
            } else {
                CommonUtilities.enableButton(this.view.btnConfirmTransfer);
            }
            CommonUtilities.setText(this.view.lblTotalRecipients, "" + totalRecipients, accessibilityConfig);
            CommonUtilities.setText(this.view.lblDomesticRecipients, "" + domesticCount, accessibilityConfig);
            CommonUtilities.setText(this.view.lblInternationalRecipients, "" + internationalCount, accessibilityConfig);
            if (domesticCount + internationalCount === 0) {
                this.showNoTransactionAvailableUI();
            } else {
                this.view.flxNoTransactions.setVisibility(false);
                this.view.flxSegment.setVisibility(true);
                this.view.flxSort.setVisibility(true);
                this.view.segmentTransfers.setData([domesticRecipientsSection, internationalRecipientsSection].filter(transactionsExistInSection));
            }
            this.view.forceLayout();
            this.view.Search.flxClearBtn.onClick = this.onSearchClearBtnClick;
            FormControllerUtility.hideProgressBar(this.view);
        },

        showNoTransactionAvailableUI: function() {
            this.view.flxNoTransactions.setVisibility(true);
            this.view.flxSegment.setVisibility(false);
            this.view.lblScheduleAPayment.setVisibility(false);
            this.view.flxSort.setVisibility(false);
            CommonUtilities.disableButton(this.view.btnConfirmTransfer);
        },

        isDomestic: function(recipient) {
            return typeof recipient.bulkWireTransferType === 'string' && recipient.bulkWireTransferType.toLowerCase() === OLBConstants.BULK_WIRE_TRANSFER_TYPE.DOMESTIC;
        },

        createRecipientSegmentModel: function(recipientData) {
            var isDomestic = this.isDomestic(recipientData);
            return {
                "lblRecipient": {
                    "text": recipientData.recipientName ? recipientData.recipientName : "",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientName ? recipientData.recipientName : "",
                    }
                },
                "flxNotes": {
                    "isVisible": false
                },
                "flxNoteTitle": {
                    "isVisible": false
                },
                "lblFromAccountNo": {
                    "text": (recipientData.accountObject) ? CommonUtilities.getAccountDisplayName(recipientData.accountObject) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.accountObject) ? CommonUtilities.getAccountDisplayName(recipientData.accountObject) : "-",
                    }
                },
                "lblReferenceID": {
                    "text": recipientData.currency ? recipientData.currency : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.currency ? recipientData.currency : "-",
                    }
                },
                "lblAmount": {
                    "text": recipientData.amount ? CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.amount ? CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true) : "-",
                    }
                },
                "lblAccNumber": {
                    "text": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    }
                },
                "lblAccNumberValue": {
                    "text": recipientData.fromAccountNumber ? recipientData.fromAccountNumber : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.fromAccountNumber ? recipientData.fromAccountNumber : "-",
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
                "lblRecipientType": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    }
                },
                "lblRecipientTypeValue": {
                    "text": recipientData.transactionType ? recipientData.transactionType : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.transactionType ? recipientData.transactionType : "-",
                    }
                },
                "lblBankName": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankName"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankName"),
                    }
                },
                "lblBankNameValue": {
                    "text": recipientData.recipientBankName ? recipientData.recipientBankName : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientBankName ? recipientData.recipientBankName : "-",
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
                        "a11yLabel": recipientData.bulkWireTransferType,
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
                "lblNoteTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    }
                },
                "lblNotesValue": {
                    "text": recipientData.note ? recipientData.note : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.note ? recipientData.note : "-",
                    }
                },
                "flxDropdown": {
                    "onClick": this.onClickToggle,
                },
                "lblDropdown": {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN
                },
                "flxIdentifier": "flxIdentifier",
                "lblSeparator2": ".",
                "lblIdentifier": ".",
                "template": this.closedTemplate,
            }

        },

        onClickToggle: function() {
            var scopeObj = this;
            var index = kony.application.getCurrentForm().segmentTransfers.selectedRowIndex;
            var sectionIndex = index[0];
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segmentTransfers.data;
            var section = data.length;
            var collapseAll = function(segments, section) {
                segments.forEach(function(segment, i) {
                    if (segment.template === scopeObj.selectedTemplate) {
                        segment.template = scopeObj.closedTemplate;
                        segment.lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                        kony.application.getCurrentForm().segmentTransfers.setDataAt(segment, i, section);
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
                kony.application.getCurrentForm().segmentTransfers.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
                //  var data1 =  kony.application.getCurrentForm().segmentTransfers.clonedTemplates[sectionIndex][1][rowIndex].frame.height;
                //  data[sectionIndex][1][rowIndex].flxIdentifier.height= data1 +"dp";
                kony.application.getCurrentForm().segmentTransfers.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
            }
            //   this.AdjustScreen();
        },
        /** clears the text on search textbox
         */
        onSearchClearBtnClick: function() {
            var self = this;
            this.disableSearch();
            FormControllerUtility.showProgressBar(this.view);
            this.view.Search.txtSearch.text = "";
            this.view.Search.flxClearBtn.setVisibility(false);
            this.setRecipientsData(self.bwTemplateResponse, true);
            this.view.forceLayout();
        },

        /** Searches for a payee */
        onSearchBtnClick: function() {
            var self = this;
            self.searchForRecords();
        },

        searchForRecords: function() {
            var enteredText = this.view.Search.txtSearch.text ? this.view.Search.txtSearch.text.trim() : "";
            enteredText = enteredText.toLocaleLowerCase();
            var tempRecords = this.bwTemplateResponse;
            var filteredResponse = [];
            if (tempRecords.length > 0) {
                tempRecords.forEach(function(item) {
                    var item_amount = "" + item.amount;
                    var routingNumber = "" + item.routingNumber;
                    var internationalRoutingNumber = "" + item.internationalRoutingNumber;
                    var recipientName = item.recipientName ? item.recipientName.toLocaleLowerCase() : "";
                    var recipientBankName = item.recipientBankName ? item.recipientBankName.toLocaleLowerCase() : "";
                    var transactionType = item.transactionType ? item.transactionType.toLocaleLowerCase() : "";
                    var swiftCode = item.swiftCode ? item.swiftCode.toLocaleLowerCase() : "";
                    var fromAccountNumber = item.fromAccountNumber ? item.fromAccountNumber.toLocaleLowerCase() : "";
                    var bulkWireTransferType = item.bulkWireTransferType ? item.bulkWireTransferType.toLocaleLowerCase() : "";
                    var recipientAddressLine1 = item.recipientAddressLine1 ? item.recipientAddressLine1.toLocaleLowerCase() : "";
                    var recipientAddressLine2 = item.recipientAddressLine2 ? item.recipientAddressLine2.toLocaleLowerCase() : "";
                    var recipientCity = item.recipientCity ? item.recipientCity.toLocaleLowerCase() : "";
                    var recipientState = item.recipientState ? item.recipientState.toLocaleLowerCase() : "";
                    var recipientZipCode = "" + item.recipientZipCode;
                    var recipientBankAddress1 = item.recipientBankAddress1 ? item.recipientBankAddress1.toLocaleLowerCase() : "";
                    var recipientBankAddress2 = item.recipientBankAddress2 ? item.recipientBankAddress2.toLocaleLowerCase() : "";
                    var recipientBankcity = item.recipientBankcity ? item.recipientBankcity.toLocaleLowerCase() : "";
                    var recipientBankstate = item.recipientBankstate ? item.recipientBankstate.toLocaleLowerCase() : "";
                    var recipientBankZipCode = "" + item.recipientBankZipCode;
                    if (recipientName.indexOf(enteredText) >= 0 || recipientBankName.indexOf(enteredText) >= 0 ||
                        transactionType.indexOf(enteredText) >= 0 || swiftCode.indexOf(enteredText) >= 0 ||
                        fromAccountNumber.indexOf(enteredText) >= 0 || item_amount.indexOf(enteredText) >= 0 || routingNumber.indexOf(enteredText) >= 0 || internationalRoutingNumber.indexOf(enteredText) >= 0 ||
                        bulkWireTransferType.indexOf(enteredText) >= 0 || recipientAddressLine1.indexOf(enteredText) >= 0 || recipientAddressLine2.indexOf(enteredText) >= 0 ||
                        recipientCity.indexOf(enteredText) >= 0 || recipientState.indexOf(enteredText) >= 0 || recipientZipCode.indexOf(enteredText) >= 0 ||
                        recipientBankAddress1.indexOf(enteredText) >= 0 || recipientBankAddress2.indexOf(enteredText) >= 0 ||
                        recipientBankcity.indexOf(enteredText) >= 0 || recipientBankstate.indexOf(enteredText) >= 0 ||
                        recipientBankZipCode.indexOf(enteredText) >= 0) {
                        filteredResponse.push(item);
                    }
                })
            }
            this.setRecipientsData(filteredResponse, true);
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

        sortRecordsBasedOnParams: function(sortParam, sortOrder) {
            var sortedData = this.tempData;
            if (sortParam === "name") {
                if (sortOrder === "ASC") {
                    sortedData.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name1.recipientName.localeCompare(name2.recipientName)
                    })
                }
                if (sortOrder === "DSC") {
                    sortedData.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name2.recipientName.localeCompare(name1.recipientName)
                    })
                }
            }
            if (sortParam === "amount") {
                if (sortOrder === "ASC") {
                    sortedData.sort(function(amount1, amount2) {
                        return amount1.amount - amount2.amount;
                    })
                }
                if (sortOrder === "DSC") {
                    sortedData.sort(function(amount1, amount2) {
                        return amount2.amount - amount1.amount;
                    })
                }
            }
            this.setRecipientsData(sortedData, true);
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