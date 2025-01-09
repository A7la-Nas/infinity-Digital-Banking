define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    return {
        BWTUnSelectedTemplate: "flxBWTEditRecipientFileUnselected",
        BWTSelectedTemplate: "flxBWTCreateRecipientTemplateSelected",
        extractedDataFromFile: "",
        recipientNameOrder: "ASC",
        bulkWireTransferTypeOrder: "ASC",
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
                if (uiData.fileRecipientData) {
                    this.showRecipients(uiData.fileRecipientData);
                }
            }
        },
        init: function() {
            this.view.preShow = this.preShowFrmBWTCreateRecipientFile;
            this.view.postShow = this.postShowFrmBWTCreateRecipientFile;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        preShowFrmBWTCreateRecipientFile: function() {
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblAccountType, kony.i18n.getLocalizedString("i18n.konybb.Common.TransactionType"), accessibilityConfig);
            this.view.customheadernew.activateMenu("Wire Transfer", "Create New Template");
            this.view.Search.flxClearBtn.setVisibility(false);
            this.view.imgSortRecipient.src = OLBConstants.IMAGES.SORTING;
            this.view.imgSortAccountType.src = OLBConstants.IMAGES.SORTING;
            this.view.flxErrorFlow.setVisibility(false);
            this.enableSorting();
            this.enableSearching();
            this.setActions();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        },
        postShowFrmBWTCreateRecipientFile: function() {
            this.view.imgSortRecipient.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByRecipientName");
            this.view.imgSortBankName.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByBankName");
            this.view.imgSortAccountType.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByTransactionType");
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        setActions: function() {
            var self = this;
            this.view.btnCancel.onClick = function() {
                self.loadModule().presentationController.showBulkWireAddTemplateFile();
            }
            this.view.btnAdd.onClick = function() {
                if (self.loadModule().presentationController.isBWTAdditionOfRecordPossible() <= 0 || self.extractedDataFromFile.length > self.loadModule().presentationController.isBWTAdditionOfRecordPossible()) {
                    var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "WireTransferNewUIModule",
                        "appName": "WireTransferMA"
                    });
                    var value = wireTransferModule.presentationController.isBWTAdditionOfRecordPossible();
                    self.view.rtxDowntimeWarning.text = kony.i18n.getLocalizedString("i18n.bulkWireTemplate.cannotAddMoreThan") + value + kony.i18n.getLocalizedString("kony.mb.mm.recipients");
                    self.view.flxDowntimeWarning.setVisibility(true);
                    self.view.lblEditRecipientsHeading.setFocus(true);
                    self.view.forceLayout();
                } else {
                    self.loadModule().presentationController.addData(self.extractedDataFromFile, false);
                    self.loadModule().presentationController.toggleAddRecFlag();
                    self.loadModule().presentationController.navigateToAddRecipientsForm();
                    self.view.flxErrorFlow.setVisibility(false);
                }
            }
        },
        enableSorting: function() {
            var scopeObj = this;
            this.view.imgSortRecipient.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                scopeObj.view.imgSortAccountType.src = OLBConstants.IMAGES.SORTING;
                if (scopeObj.recipientNameOrder === "DSC") {
                    scopeObj.recipientNameOrder = "ASC";
                    scopeObj.view.imgSortRecipient.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    scopeObj.recipientNameOrder = "DSC";
                    scopeObj.view.imgSortRecipient.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                scopeObj.sortRecords(scopeObj.extractedDataFromFile, "recipientName", scopeObj.recipientNameOrder);
            }
            this.view.imgSortBankName.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                if (scopeObj.bankNameOrder === "DSC") {
                    scopeObj.bankNameOrder = "ASC";
                    scopeObj.view.imgSortBankName.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    scopeObj.bankNameOrder = "DSC";
                    scopeObj.view.imgSortBankName.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                scopeObj.sortRecords(scopeObj.extractedDataFromFile, "recipientBankName", scopeObj.bankNameOrder);
            };
            this.view.imgSortAccountType.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                scopeObj.view.imgSortRecipient.src = OLBConstants.IMAGES.SORTING;
                if (scopeObj.bulkWireTransferTypeOrder === "DSC") {
                    scopeObj.bulkWireTransferTypeOrder = "ASC";
                    scopeObj.view.imgSortAccountType.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    scopeObj.bulkWireTransferTypeOrder = "DSC";
                    scopeObj.view.imgSortAccountType.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                scopeObj.sortRecords(scopeObj.extractedDataFromFile, "bulkWireTransferType", scopeObj.bulkWireTransferTypeOrder);
            }
        },
        enableSearching: function() {
            this.view.Search.txtSearch.text = "";
            this.view.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this);
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
        },
        loadModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "WireTransferNewUIModule",
                "appName": "WireTransferMA"
            });
        },
        showRecipients: function(data) {
            this.extractedDataFromFile = data;
            this.loadModule().presentationController.addAdditionalKeysInRecipientsRecord(data, OLBConstants.RECIPIENT_CATEGORY.EXTRACTED_FROM_FILE);
            this.setBWTRecipientData(data);
        },
        setBWTRecipientData: function(data) {
            var controller = this;
            var createSegment = function(data) {
                if (data.length > 0) {
                    return data.map(controller.createBWTRecipientSegmentModel.bind(this))
                }
            };
            var recipientsData = createSegment(data);
            this.view.segmentFileTransactions.widgetDataMap = {
                "lblSeparator": "lblSeparator",
                "lblDropdown": "lblDropdown",
                "lblRecipientName": "lblRecipientName",
                "lblIcon": "lblIcon",
                "lblBankName": "lblBankName",
                "lblTransactionsType": "lblTransactionsType",
                "lblActions": "lblActions",
                "lblSeparator1": "lblSeparator1",
                "flxDropdown": "flxDropdown",
                "lblAccountName": "lblAccountName",
                "lblAccNumber": "lblAccNumber",
                "lblRecipientType": "lblRecipientType",
                "lblRoutingNumber": "lblRoutingNumber",
                "lblAccNumberValue": "lblAccNumberValue",
                "lblRecipientTypeValue": "lblRecipientTypeValue",
                "lblRoutingNumberValue": "lblRoutingNumberValue",
                "lblBankAddressTitle": "lblBankAddressTitle",
                "lblBankAddressValue": "lblBankAddressValue",
                "lblRecipientAddressTitle": "lblRecipientAddressTitle",
                "lblRecipientAddressValue": "lblRecipientAddressValue",
                "lblSwiftCodeTitle": "lblSwiftCodeTitle",
                "lblSwiftCodeValue": "lblSwiftCodeValue",
                "flxActions": "flxActions",
                "segBWTEditRecipientFileUnselected": "segBWTEditRecipientFileUnselected",
                "segBWTCreateRecipientTemplateSelected": "segBWTCreateRecipientTemplateSelected",
                "flxSegment": "flxSegment"
            }
            if (recipientsData && recipientsData.length > 0) {
                this.view.NoTransactions.setVisibility(false);
                this.view.flxSegment.setVisibility(true);
                this.view.flxSort.setVisibility(true);
                FormControllerUtility.enableButton(this.view.btnAdd);
                this.view.segmentFileTransactions.setData(recipientsData);
            } else {
                this.showNoRecordAvailableMsg();
            }
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
        },
        showNoRecordAvailableMsg: function() {
            this.view.NoTransactions.setVisibility(true);
            this.view.flxSegment.setVisibility(false);
            this.view.flxSort.setVisibility(false);
            this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.transfers.searchNoPayees");
            FormControllerUtility.disableButton(this.view.btnAdd);
        },
        createBWTRecipientSegmentModel: function(recipientData) {
            var isDomestic = recipientData.bulkWireTransferType === "Domestic" ? true : false;
            return {
                "lblRecipientName": {
                    "text": recipientData.recipientName ? recipientData.recipientName : "-",
                    "toolTip": recipientData.recipientName ? CommonUtilities.changedataCase(recipientData.recipientName) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientName ? recipientData.recipientName : "-",
                    }
                },
                "lblBankName": {
                    "text": recipientData.recipientBankName ? recipientData.recipientBankName : "-",
                    "toolTip": recipientData.recipientBankName ? CommonUtilities.changedataCase(recipientData.recipientBankName) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientBankName ? recipientData.recipientBankName : "-",
                    }
                },
                "lblTransactionsType": {
                    "text": recipientData.bulkWireTransferType ? recipientData.bulkWireTransferType : "-",
                    "toolTip": recipientData.bulkWireTransferType ? CommonUtilities.changedataCase(recipientData.bulkWireTransferType) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType ? recipientData.bulkWireTransferType : "-",
                    }
                },
                "lblIcon": {
                    "isVisible": false,
                    "text": recipientData.transactionType === "Individual" ? "s" : "r"
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
                    "toolTip": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
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
                    "text": recipientData.transactionType ? recipientData.transactionType : "-",
                    "toolTip": recipientData.transactionType ? CommonUtilities.changedataCase(recipientData.transactionType) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.transactionType ? recipientData.transactionType : "-",
                    }
                },
                "lblRoutingNumber": {
                    "text": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "toolTip": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "accessibilityconfig": {
                        "a11yLabel": isDomestic ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    }
                },
                "lblRoutingNumberValue": {
                    "text": isDomestic ? recipientData.routingNumber : recipientData.internationalRoutingNumber,
                    "toolTip": isDomestic ? recipientData.routingNumber : recipientData.internationalRoutingNumber,
                    "accessibilityconfig": {
                        "a11yLabel": isDomestic ? recipientData.routingNumber : recipientData.internationalRoutingNumber,
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
                    "text": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.recipientBankstate ? ", " + recipientData.recipientBankstate : "") + "" + (recipientData.recipientBankZipCode ? ", " + recipientData.recipientBankZipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
                    "toolTip": CommonUtilities.changedataCase(recipientData.recipientBankAddress1 + " " + recipientData.recipientBankAddress2),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.recipientBankstate ? ", " + recipientData.recipientBankstate : "") + "" + (recipientData.recipientBankZipCode ? ", " + recipientData.recipientBankZipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
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
                    "text": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.state ? ", " + recipientData.state : "") + "" + (recipientData.recipientZipCode ? ", " + recipientData.recipientZipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
                    "toolTip": CommonUtilities.changedataCase(recipientData.recipientAddressLine1 + " " + recipientData.recipientAddressLine2),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.state ? ", " + recipientData.state : "") + "" + (recipientData.recipientZipCode ? ", " + recipientData.recipientZipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
                    }
                },
                "lblSwiftCodeTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "isVisible": isDomestic ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    }
                },
                "lblSwiftCodeValue": {
                    "text": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    "toolTip": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    "isVisible": isDomestic ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    }
                },
                "flxDropdown": {
                    "onClick": this.onClickBWTRowToggle
                },
                "flxActions": {
                    "onClick": this.removeRecord
                },
                "lblDropdown": {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN
                },
                "lblActions": {
                    "text": kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister"),
                    }
                },
                "recipientID": recipientData.recipientID,
                "template": this.BWTUnSelectedTemplate,
            }
        },
        onClickBWTRowToggle: function() {
            var scopeObj = this;
            var index = kony.application.getCurrentForm().segmentFileTransactions.selectedRowIndex;
            var rowIndex = index[1];
            var sectionIndex = index[0];
            var data = kony.application.getCurrentForm().segmentFileTransactions.data;
            var section = data.length;
            var collapseAll = function(segments, section) {
                segments.forEach(function(segment, i) {
                    if (segment.template === scopeObj.BWTSelectedTemplate) {
                        segment.template = scopeObj.BWTUnSelectedTemplate;
                        segment.lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                        kony.application.getCurrentForm().segmentFileTransactions.setDataAt(segment, i, section);
                    }
                });
            };
            if (data) {
                if (data[rowIndex].template === this.BWTUnSelectedTemplate) {
                    while (section--) {
                        collapseAll(data, 0);
                    }
                    data[rowIndex].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                    data[rowIndex].template = this.BWTSelectedTemplate;
                } else {
                    data[rowIndex].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    data[rowIndex].template = this.BWTUnSelectedTemplate;
                }
                kony.application.getCurrentForm().segmentFileTransactions.setDataAt(data[rowIndex], rowIndex, sectionIndex);
            }
        },
        removeRecord: function() {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            var data = kony.application.getCurrentForm().segmentFileTransactions.data;
            var index = kony.application.getCurrentForm().segmentFileTransactions.selectedRowIndex;
            var rowIndex = index[1];
            var removedRecordId = data[rowIndex].recipientID;
            this.removeLocalRecord(removedRecordId);
        },
        removeLocalRecord: function(removedRecordId) {
            for (var index = 0; index < this.extractedDataFromFile.length; index++) {
                if (this.extractedDataFromFile[index].recipientID === removedRecordId) {
                    this.extractedDataFromFile.splice(index, 1);
                    break;
                }
            }
            this.setBWTRecipientData(this.extractedDataFromFile);
        },
        sortRecords: function(data, sortParam, sortOrder) {
            var sortedRecord = this.loadModule().presentationController.sortBWTStringRecords(data, sortParam, sortOrder);
            this.setBWTRecipientData(sortedRecord);
        },
        /** Disables Search Button*/
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
            } else {
                scopeObj.view.Search.txtSearch.onDone = scopeObj.onSearchClearBtnClick.bind(scopeObj);
                scopeObj.view.Search.btnConfirm.onDone = scopeObj.onSearchClearBtnClick.bind(scopeObj);
            }
            scopeObj.view.Search.flxClearBtn.setVisibility(true);
            this.view.flxSearch.forceLayout();
        },
        /** Searches for a payee */
        onSearchBtnClick: function() {
            var self = this;
            var searchResult;
            var text = self.view.Search.txtSearch.text.trim();
            searchResult = this.loadModule().presentationController.BWTLocalSearch(this.extractedDataFromFile, text);
            this.setBWTRecipientData(searchResult);
        },
        /** clears the text on search textbox */
        onSearchClearBtnClick: function() {
            this.disableSearch();
            FormControllerUtility.showProgressBar(this.view);
            this.view.Search.txtSearch.text = "";
            this.view.Search.flxClearBtn.setVisibility(false);
            this.setBWTRecipientData(this.extractedDataFromFile);
            this.view.forceLayout();
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
    }
});