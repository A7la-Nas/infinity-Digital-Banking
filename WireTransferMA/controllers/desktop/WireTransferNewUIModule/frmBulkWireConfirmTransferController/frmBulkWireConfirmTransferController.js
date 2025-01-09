define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {
        closedTemplate: "flxBulkWireConfirmTransfer",
        selectedTemplate: "flxBulkWireAckSelected",
        bulkWireFileID: "",
        bulkWireFileResponse: "",
        bulkWireFileInfo: "",
        checkingAccounts: [],
        removedRecipientData: "",
        isAllPermitableAccountsAvailable: true,
        sortBy: "",
        orderBy: "",
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
                if (uiData.fileDetails) {
                    this.setFileDetails(uiData.fileDetails);
                }
                if (uiData.recipientsData) {
                    this.setRecipientsData(uiData.recipientsData);
                }
                if (uiData.errorMessage) {
                    this.showCreateErrorMsg(uiData.errorMessage);
                }
            }
        },

        init: function() {
            this.view.onDeviceBack = function() {};
        },

        preShowConfirmBulkWireTransfer: function() {
            var scopeObj = this;
            this.view.Search.txtSearch.text = '';
            this.view.lblFileName.text = "";
            this.view.lblTotalRecipients.text = "";
            this.view.lblDomesticRecipients.text = "";
            this.view.lblInternationalRecipients.text = "";
            this.view.btnConfirmTransfer.text = kony.i18n.getLocalizedString("i18n.bulkwires.confirmtransfer");
            this.view.btnConfirmTransfer.toolTip = kony.i18n.getLocalizedString("i18n.bulkwires.confirmtransfer");
            this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.btnCancel.setVisibility(false);
            this.view.btnCancel.hoverSkin = "sknBtnSecondaryFocusSSP3343a815PxHover";
            this.view.btnCancel.focusSkin = "sknBtnSecondaryFocusSSP3343a815Px";
            this.view.btnBack.hoverSkin = "sknBtnSecondaryFocusSSP3343a815PxHover";
            this.view.btnBack.focusSkin = "sknBtnSecondaryFocusSSP3343a815Px";
            this.view.btnConfirmTransfer.hoverSkin = "sknBtnHoverSSPFFFFFF15Px";
            this.view.btnConfirmTransfer.focusSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
            this.view.errorMsg.setVisibility(false);
            this.view.Search.flxClearBtn.setVisibility(false);
            this.view.imgSortDescription.setVisibility(false);
            this.view.CopyimgSortType0h9f902c55d0c44.setVisibility(false);
            this.view.lblSortRecipient.toolTip = kony.i18n.getLocalizedString("i18n.transfers.benificiaryName");
            this.view.imgSortRecipient.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.sortByName");
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
                    "formName": "frmMakeBulkTransfer",
                    "bulkWireCategoryFilter": "Files"
                };
                scopeObj.loadBulkWireModule().presentationController.showBulkwirefiles(params);
            }
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.bulkwires.EditRecipientHeader"), accessibilityConfig);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxFooter', 'flxMain', 'customheadernew']);
        },

        postShowConfirmBulkWireTransfer: function() {
            this.view.customheadernew.activateMenu("Wire Transfer", "Make Bulk Transfer");
            applicationManager.getNavigationManager().applyUpdates(this);
        },

        setFileDetails: function(fileData) {
            var self = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblFileNameTitle, kony.i18n.getLocalizedString("i18n.bulkWire.fileName") + ":", accessibilityConfig);
            CommonUtilities.setText(this.view.lblFileName, fileData.bulkWireFileName, accessibilityConfig);
            this.view.lblFileName.toolTip = fileData.bulkWireFileName;
            this.bulkWireFileID = fileData.bulkWireFileID;
            this.bulkWireFileInfo = fileData;
            this.setBulkWireConfirmActions();
        },

        setBulkWireConfirmActions: function() {
            var self = this;
            this.view.btnConfirmTransfer.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                self.createBulkWireTransactions();
            }
        },

        loadBulkWireModule: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            return wireTransferModule;
        },

        showCreateErrorMsg: function(data) {
            this.view.errorMsg.setVisibility(true);
            this.view.errorMsg.text = data.errorMessage;
            this.view.errorMsg.skin = "sknLabelSSPFF000015Px";
            FormControllerUtility.hideProgressBar(this.view)
            this.view.forceLayout();
        },

        createBulkWireTransactions: function() {
            var self = this;
            var bulkWireRecords = [];
            var Domestic = this.bulkWireFileResponse.Domestic;
            var International = this.bulkWireFileResponse.International;
            var domesticCount = 0;
            var internationalCount = 0;
            if (Domestic.length > 0) {
                Domestic.forEach(function(item) {
                    if (item.isDeleted !== true) {
                        bulkWireRecords.push(self.getBulkWireTransactionMappings(item))
                        domesticCount++;
                    }
                })
            }
            if (International.length > 0) {
                International.forEach(function(item) {
                    if (item.isDeleted !== true) {
                        bulkWireRecords.push(self.getBulkWireTransactionMappings(item))
                        internationalCount++;
                    }
                })
            }
            var bulkPay = {
                "bulkWireFileID": this.bulkWireFileInfo.bulkWireFileID,
                "totalCountOfTransactions": domesticCount + internationalCount,
                "totalCountOfDomesticTransactions": domesticCount,
                "totalCountOfInternationalTransactions": internationalCount,
                "BWrecords": bulkWireRecords,
                "fileID": this.bulkWireFileInfo.bulkWireFileName
            }
            var requestObj = {
                bulkPayString: JSON.stringify(bulkPay)
            }
            self.loadBulkWireModule().presentationController.createBulkWireTransaction(requestObj, this.bulkWireFileInfo);
        },

        getBulkWireTransactionMappings: function(recipientData) {
            return {
                "fromAccountNumber": recipientData.fromAccountNumber,
                "amount": applicationManager.getFormatUtilManager().deFormatAmount(recipientData.amount),
                "transactionType": "Wire",
                "transactionsNotes": recipientData.note,
                "payeeNickName": recipientData.accountNickname || recipientData.recipientName,
                "payeeAccountNumber": recipientData.recipientAccountNumber,
                "payeeAddressLine1": recipientData.recipientAddressLine1,
                "payeeAddressLine2": recipientData.recipientAddressLine2,
                "payeeName": recipientData.recipientName,
                "payeeCurrency": recipientData.currency,
                "swiftCode": recipientData.swiftCode,
                "wireAccountType": recipientData.bulkWireTransferType,
                "country": recipientData.recipientCountryName,
                "bankName": recipientData.recipientBankName,
                "internationalRoutingCode": recipientData.internationalRoutingNumber,
                "zipCode": recipientData.recipientZipCode,
                "cityName": recipientData.recipientCity,
                "state": recipientData.recipientState,
                "bankAddressLine1": recipientData.recipientBankAddress1,
                "bankAddressLine2": recipientData.recipientBankAddress2,
                "bankCity": recipientData.recipientBankcity,
                "bankState": recipientData.recipientBankstate,
				"transactionCurrency": recipientData.currency,
                "payeeType": recipientData.transactionType
            }
        },
        filterAccount: function(fromAccountNumber) {
            var currAccounts = this.checkingAccounts;
            var config = applicationManager.getConfigurationManager();
            for (var index = 0; index < currAccounts.length; index++) {
                var flag = config.checkAccountAction(currAccounts[index].accountID, "DOMESTIC_WIRE_TRANSFER_CREATE_RECEPIENT") || config.checkAccountAction(currAccounts[index].accountID, "INTERNATIONAL_WIRE_TRANSFER_CREATE_RECEPIENT");
                if (currAccounts[index].accountID === fromAccountNumber && flag) {
                    return currAccounts[index];
                }
            }
            this.isAllPermitableAccountsAvailable = false;
            return false;
        },

        setRecipientsData: function(recipientsData, isSearch) {
            var controller = this;
            this.setRecipientView();
            var data = "";
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            if (isSearch !== true) {
                this.bulkWireFileResponse = recipientsData.bulkWireResponse;
                this.removedRecipientData = recipientsData.removedRecipientData;
                data = recipientsData.bulkWireResponse;
            } else {
                data = recipientsData;
            }
            CommonUtilities.setText(this.view.lblTotalRecipientsTitle, kony.i18n.getLocalizedString("i18n.bulkwires.totalreipients"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblDomesticTitle, kony.i18n.getLocalizedString("i18n.bulkWires.domesticRecipientsHeader") + ":", accessibilityConfig);
            CommonUtilities.setText(this.view.lblInternationalTitle, kony.i18n.getLocalizedString("i18n.bulkWires.internationalRecipientsHeader") + ":", accessibilityConfig);
            //this.adjustUIForTransactions(recipientsData); // To check empty data
            if (recipientsData.isSearchSort != true && isSearch !== true) {
                this.checkingAccounts = recipientsData.accountsResponse;
                if (this.checkingAccounts.length === 0) {
                    CommonUtilities.disableButton(controller.view.btnConfirmTransfer);
                }
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
            var domesticRecipientsSection = createSegmentSection(data.Domestic, {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                "skin": "sknlbl424242bold15px",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                }
            });
            var internationalRecipientsSection = createSegmentSection(data.International, {
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
            domesticRecipientsSection = this.removeNullRecords(domesticRecipientsSection);
            internationalRecipientsSection = this.removeNullRecords(internationalRecipientsSection);
            var domesticCount = (domesticRecipientsSection && domesticRecipientsSection[1]) ? domesticRecipientsSection[1].length : 0;
            var internationalCount = (internationalRecipientsSection && internationalRecipientsSection[1]) ? internationalRecipientsSection[1].length : 0;
            var totalRecipients = domesticCount + internationalCount;
            if (totalRecipients === 0) {
                CommonUtilities.disableButton(this.view.btnEditRecipient);
                CommonUtilities.disableButton(this.view.btnConfirmTransfer);
            } else {
                CommonUtilities.enableButton(this.view.btnEditRecipient);
                CommonUtilities.enableButton(this.view.btnConfirmTransfer);
            }
            if (controller.removedRecipientData && ((controller.removedRecipientData.Domestic && controller.removedRecipientData.Domestic.length > 0) || (controller.removedRecipientData.International && controller.removedRecipientData.International.length > 0))) {
                CommonUtilities.enableButton(this.view.btnEditRecipient);
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
            if (controller.isAllPermitableAccountsAvailable === false) {
                CommonUtilities.disableButton(this.view.btnConfirmTransfer);
            }
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
            //  this.AdjustScreen();
        },

        showNoTransactionAvailableUI: function() {
            this.view.flxNoTransactions.setVisibility(true);
            this.view.flxSegment.setVisibility(false);
            this.view.lblScheduleAPayment.setVisibility(false);
            this.view.flxSort.setVisibility(false);
            CommonUtilities.disableButton(this.view.btnConfirmTransfer);
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
            if (recipientData.isDeleted !== true) {
                return {
                    "lblRecipient": {
                        "text": recipientData.recipientName,
                        "accessibilityconfig": {
                            "a11yLabel": recipientData.recipientName,
                        }
                    },
                    "lblFromAccountNo": {
                        "text": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "",
                        "accessibilityconfig": {
                            "a11yLabel": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "",
                        }
                    },
                    "lblReferenceID": {
                        "text": applicationManager.getConfigurationManager().getCurrency(recipientData.currency),
                        "accessibilityconfig": {
                            "a11yLabel": applicationManager.getConfigurationManager().getCurrency(recipientData.currency),
                        }
                    },
                    "lblAmount": {
                        "text": CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true),
                        "accessibilityconfig": {
                            "a11yLabel": CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true),
                        }
                    },
                    "lblAccNumber": {
                        "text": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                        "accessibilityconfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                        }
                    },
                    "lblAccNumberValue": {
                        "text": recipientData.fromAccountNumber,
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
                        "text": recipientData.bulkWireTransferType,
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
                        },
                        "isVisible": isDomestic ? false : true
                    },
                    "lblNotesValue": {
                        "text": recipientData.note,
                        "accessibilityconfig": {
                            "a11yLabel": recipientData.note,
                        },
                        "isVisible": isDomestic ? false : true
                    },
                    "flxDropdown": {
                        "onClick": this.onClickToggle,
                    },
                    "lblDropdown": {
                        "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN
                    },
                    "flxIdentifier": "flxIdentifier",
                    "template": this.closedTemplate,
                }
            }
            return null;
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
                //    var data1 =  kony.application.getCurrentForm().segmentTransfers.clonedTemplates[sectionIndex][1][rowIndex].frame.height;
                //   data[sectionIndex][1][rowIndex].flxIdentifier.height= data1 +"dp";
                kony.application.getCurrentForm().segmentTransfers.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
            }
            //   this.AdjustScreen();
        },
        /** clears the text on search textbox
         */
        onSearchClearBtnClick: function(bulkWireFileResponse) {
            var self = this;
            this.disableSearch();
            FormControllerUtility.showProgressBar(this.view);
            this.view.Search.txtSearch.text = "";
            this.view.Search.flxClearBtn.setVisibility(false);
            this.setRecipientsData(bulkWireFileResponse, true);
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
            var domesticRecord = this.bulkWireFileResponse.Domestic;
            var internationalRecord = this.bulkWireFileResponse.International;
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

        setRecipientView: function() {
            var self = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblverifyconfirm, kony.i18n.getLocalizedString("i18n.bulkwires.verifyheader"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblVerifyRecipients, kony.i18n.getLocalizedString("i18n.bulkwires.verifyrecipients"), accessibilityConfig);
            this.view.btnEditRecipient.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                var data = {};
                data.bulkWireFileResponse = self.bulkWireFileResponse;
                data.checkingAccounts = self.checkingAccounts;
                data.bulkWireFileInfo = self.bulkWireFileInfo;
                data.removedRecipientData = self.removedRecipientData;
                self.loadBulkWireModule().presentationController.showBulkWireEditTransfer(data);
            }
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, self.bulkWireFileResponse);
        },
        sortRecordsBasedOnParams: function(sortParam, sortOrder) {
            var record = this.bulkWireFileResponse;
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
            sortedRecord.isSearchSort = true;
            sortedRecord.Domestic = domesticData;
            sortedRecord.International = internationalData;
            this.setRecipientsData(sortedRecord, true);
        },
        /**
         * Ui team proposed method to handle screen aligment
         */
        AdjustScreen: function() {
            this.view.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.customheadernew.info.frame.height + this.view.flxMain.info.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - this.view.flxFooter.info.frame.height;
                if (diff > 0) {
                    this.view.flxFooter.top = mainheight + diff + ViewConstants.POSITIONAL_VALUES.DP;
                } else {
                    this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
                }
            } else {
                this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
            }
            this.view.forceLayout();
            //this.initializeResponsiveViews();
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            kony.print('on breakpoint change');
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            orientationHandler.onOrientationChange(this.onBreakpointChange);
        }
    };
});