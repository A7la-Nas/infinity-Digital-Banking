define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {
        bulkWireFileResponse: "",
        checkingAccounts: [],
        fileInfo: "",
        selectedRecordsID: new Set(),
        closedTemplate: "CopyflxBulkWireAck0d7b48b49605b4f",
        removedRecipientData: "",
        isDataRemoved: false,
        selectedRecords: "",
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
                if (uiData.bulkWireEditResponse) {
                    this.bulkWireRecipientEditView(uiData.bulkWireEditResponse);
                }
            }
        },

        init: function() {
            this.view.onDeviceBack = function() {};
        },

        preShowFrmBulkWireEditRecipient: function() {
            var self = this;
            this.view.imgSortRecipient.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByRecipientName");
            this.view.imgSortDescription.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.sortByFromaccount");
            this.view.imgSortCurrency.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.sortByCurrency");
            this.view.imgSortType.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByAmount");
            this.view.Search.txtSearch.text = '';
            self.selectedRecordsID = new Set();
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.lblStatus.text = OLBConstants.SWITCH_ACTION.OFF;
            this.view.Search.flxClearBtn.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxFooter', 'customheadernew', 'flxMain']);
            CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.bulkwires.EditRecipientHeader"), accessibilityConfig);
            this.view.imgSortRecipient.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(self.view);
                if (self.recipientOrder === "DSC") {
                    self.recipientOrder = "ASC";
                    self.view.imgSortRecipient.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.recipientOrder = "DSC";
                    self.view.imgSortRecipient.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                self.sortRecordsBasedOnParams("name", self.recipientOrder);
            }
            this.view.imgSortType.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(self.view);
                if (self.amountOrder === "DSC") {
                    self.amountOrder = "ASC";
                    self.view.imgSortType.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.amountOrder = "DSC";
                    self.view.imgSortType.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                self.sortRecordsBasedOnParams("amount", self.amountOrder);
            }
            CommonUtilities.disableButton(this.view.btnApplyChanges);
            this.view.flxError.setVisibility(false);
            // this.view.imgSortDescription.setVisibility(false);
            // this.view.imgSortCurrency.setVisibility(false);
            this.view.btnMakeAnother.hoverSkin = "sknBtnffffffBorder3343a81pxRadius2px";
            this.view.btnMakeAnother.focusSkin = "sknBtnffffffBorder0273e31pxRadius2px";
            this.view.btnRemove.hoverSkin = "sknBtnSecondaryFocusSSP3343a815PxHover";
            this.view.btnRemove.focusSkin = "sknBtnSecondaryFocusSSP3343a815Px";
            this.view.btnNewTransfer.focusSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
            this.view.btnNewTransfer.hoverSkin = "sknBtnHoverSSPFFFFFF15Px";

            this.view.onBreakpointChange = function() {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            this.view.tbxAmount.text = "";
        },

        postShowFrmBulkWireEditRecipient: function() {
            this.view.customheadernew.activateMenu("Wire Transfer", "Make Bulk Transfer");
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        loadBulkWireModule: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            return wireTransferModule;
        },

        bulkWireRecipientEditView: function(data) {
            this.bulkWireFileResponse = data.bulkWireFileResponse;
            this.checkingAccounts = data.checkingAccounts;
            this.fileInfo = data.bulkWireFileInfo;
            this.removedRecipientData = data.removedRecipientData;
            this.setEditBulkWireRecipientView(data.checkingAccounts);
            this.setRecipientData(data.bulkWireFileResponse, null, null, null);
        },
        setEditBulkWireRecipientView: function(data) {
            var self = this;
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
                if (self.view.lblStatus.text === OLBConstants.SWITCH_ACTION.ON) {
                    data = self.selectedRecords;
                } else {
                    data = self.bulkWireFileResponse;
                }
                self.setRecipientData(data, selectedAccount, selectedCurrency, changedAmount)
            }
            this.view.btnMakeAnother.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                self.removeSelectedStatus();
                wireTransferModule.presentationController.showBulkWireConfirmTransfer(self.bulkWireFileResponse, self.removedRecipientData, "EDIT_FLOW");
            }
            this.view.btnNewTransfer.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                var data = self.updateBulkWireRecords();
                self.loadBulkWireModule().presentationController.showBulkWireConfirmTransfer(data, self.removedRecipientData, "EDIT_FLOW");
            }
            this.view.lblStatus.onTouchEnd = function() {
                self.toggleEditRecipientView();
            }
            this.view.btnRemove.onClick = function() {
                if (self.isRecordSelected()) {
                    self.isDataRemoved = true;
                    FormControllerUtility.showProgressBar(self.view);
                    var newRecipientData = self.removeSelectedRecipient();
                    self.setRecipientData(newRecipientData, null, null, null);
                    CommonUtilities.disableButton(self.view.btnApplyChanges);
                } else {
                    self.view.lblError.text = "No record is removed.";
                    self.view.flxError.setVisibility(true);
                }
            }
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, self.bulkWireFileResponse);
            this.view.lblViewRemovedRecipients.onTouchEnd = function() {
                if (self.removedRecipientData && (self.removedRecipientData.Domestic.length > 0 || self.removedRecipientData.International.length > 0)) {
                    FormControllerUtility.showProgressBar(self.view);
                    self.view.Search.txtSearch.text = "";
                    self.loadBulkWireModule().presentationController.showRemovedRecipient(self.removedRecipientData, self.bulkWireFileResponse, self.checkingAccounts, self.fileInfo);
                } else {
                    self.view.lblError.text = "No record is removed.";
                    self.view.flxError.setVisibility(true);
                }
            }
        },

        removeSelectedStatus: function() {
            var domestic = this.bulkWireFileResponse ? this.bulkWireFileResponse.Domestic : [];
            var international = this.bulkWireFileResponse ? this.bulkWireFileResponse.International : [];
            var index;
            for (index = 0; index < domestic.length; index++) {
                this.updateRecordStatus(domestic[index].bulkWireFileLineItemID, OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
            }
            for (index = 0; index < international.length; index++) {
                this.updateRecordStatus(international[index].bulkWireFileLineItemID, OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
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
        /** clears the text on search textbox
         */
        onSearchClearBtnClick: function(bulkWireFileResponse) {
            var self = this;
            this.disableSearch();
            FormControllerUtility.showProgressBar(this.view);
            this.view.Search.txtSearch.text = "";
            self.setRecipientData(bulkWireFileResponse, null, null, null);
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

        getCurrency: function() {
            return applicationManager.getConfigurationManager().OLBConstants.BULKWIRETRANSFERCONSTANT.CURRENCIES;
        },

        setRecipientData: function(recipientsData, selectedAccount, selectedCurrency, changedAmount) {
            var controller = this;
            var createSegmentSection = function(recipients, sectionHeaderText) {
                if (recipients.length > 0) {
                    return [{
                            "lblHeader": "" + sectionHeaderText.text + "(" + recipients.length + ")",
                            "lblSeparator": "."
                        },
                        recipients.map(controller.createRecipientSegmentModel.bind(this, changedAmount, selectedCurrency, selectedAccount))
                    ];
                }
            };
            var domesticRecipientsSection = createSegmentSection(recipientsData.Domestic, {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                "skin": "sknlbl424242bold15px",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                }
            });
            var internationalRecipientsSection = createSegmentSection(recipientsData.International, {
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
            this.view.segmentTransfers.widgetDataMap = {
                "flxDropdown": "flxDropdown",
                "lblDropdown": "lblDropdown",
                "lblRecipient": "lblRecipient",
                "listAccounts": "listAccounts",
                "ListBox0f204cf65e9ec44": "ListBox0f204cf65e9ec44",
                "TextField0ff78082759ce44": "TextField0ff78082759ce44",
                "lblStatus": "lblStatus",
                "lblHeader": "lblHeader",
                "flxStatus": "flxStatus",
                "segBulkWireEditConfirmTransfer": "segBulkWireEditConfirmTransfer",
                "lblAmount": "lblAmount",
                "flxCurrency": "flxCurrency"
            }
            domesticRecipientsSection = this.removeNullRecords(domesticRecipientsSection);
            internationalRecipientsSection = this.removeNullRecords(internationalRecipientsSection);
            var domesticCount = (domesticRecipientsSection && domesticRecipientsSection[1]) ? domesticRecipientsSection[1].length : 0;
            var internationalCount = (internationalRecipientsSection && internationalRecipientsSection[1]) ? internationalRecipientsSection[1].length : 0;
            this.view.lblCount.text = "(" + (domesticCount + internationalCount + "") + ")";
            if (domesticCount + internationalCount === 0) {
                this.showNoTransactionAvailableUI();
            } else {
                this.view.flxNoTransactions.setVisibility(false);
                this.view.flxSegment.setVisibility(true);
                this.view.flxSort.setVisibility(true);
                CommonUtilities.enableButton(this.view.btnNewTransfer);
                this.view.segmentTransfers.setData([domesticRecipientsSection, internationalRecipientsSection].filter(transactionsExistInSection));
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
            kony.application.getCurrentForm().segmentTransfers.data = [];
            CommonUtilities.disableButton(this.view.btnNewTransfer);
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

        createRecipientSegmentModel: function(changedAmount, selectedCurrency, selectedAccount, recipientData) {
            if (recipientData.isDeleted !== true) {
                return {
                    "lblRecipient": {
                        "text": recipientData.recipientName,
                        "accessibilityconfig": {
                            "a11yLabel": recipientData.recipientName,
                        }
                    },
                    "listAccounts": {
                        "masterData": FormControllerUtility.getListBoxDataFromObjects(this.checkingAccounts, "accountID", CommonUtilities.getAccountDisplayName),
                        "selectedKey": (selectedAccount && recipientData.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) ? selectedAccount : recipientData.fromAccountNumber,
                        "onSelection": function() {}
                    },
                    "ListBox0f204cf65e9ec44": {
                        "masterData": FormControllerUtility.getListBoxDataFromObjects(this.getCurrency(), "name", "symbol"),
                        "selectedKey": (selectedCurrency && recipientData.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) ? selectedCurrency : applicationManager.getConfigurationManager().getCurrency(recipientData.currency),
                        "onSelection": function() {}
                    },
                    "TextField0ff78082759ce44": {
                        "text": (changedAmount && recipientData.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) ? CommonUtilities.formatCurrencyWithCommas(changedAmount, true) : CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true),
                        "accessibilityconfig": {
                            "a11yLabel": (changedAmount && recipientData.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) ? CommonUtilities.formatCurrencyWithCommas(changedAmount, true) : CommonUtilities.formatCurrencyWithCommas(recipientData.amount, true),
                        }
                    },
                    "lblStatus": {
                        "text": recipientData.status ? recipientData.status : OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                        "accessibilityconfig": {
                            "a11yLabel": recipientData.status ? recipientData.status : OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                        }
                    },
                    "lblDropdown": {
                        "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                        "isVisible": false
                    },
                    "flxStatus": {
                        "onClick": this.toggleCheckBox.bind(this)
                    },
                    "bulkWireFileLineItemID": recipientData.bulkWireFileLineItemID,
                    "template": this.closedTemplate,
                }
            }
            return null;
        },

        getSelectedAccount: function(fromAccountNumber) {
            var currAccounts = this.checkingAccounts;
            for (var index = 0; index < currAccounts.length; index++) {
                if (currAccounts[index].accountID === fromAccountNumber) {
                    return CommonUtilities.getAccountDisplayName(currAccounts[index]);
                }
            }
        },

        toggleCheckBox: function() {
            var index = kony.application.getCurrentForm().segmentTransfers.selectedRowIndex;
            var sectionIndex = index[0];
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segmentTransfers.data;
            if (data[sectionIndex][1][rowIndex].lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                this.updateRecordStatus(data[sectionIndex][1][rowIndex].bulkWireFileLineItemID, OLBConstants.FONT_ICONS.CHECBOX_SELECTED);
                data[sectionIndex][1][rowIndex].lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
                this.selectedRecordsID.add(data[sectionIndex][1][rowIndex].bulkWireFileLineItemID);
            } else {
                this.updateRecordStatus(data[sectionIndex][1][rowIndex].bulkWireFileLineItemID, OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
                data[sectionIndex][1][rowIndex].lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                this.selectedRecordsID.delete(data[sectionIndex][1][rowIndex].bulkWireFileLineItemID);
            }
            kony.application.getCurrentForm().segmentTransfers.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
            var buttonStatus = this.isRecordSelected();
            if (buttonStatus) {
                CommonUtilities.enableButton(this.view.btnApplyChanges);

            } else {
                CommonUtilities.disableButton(this.view.btnApplyChanges);
            }
            this.enableDisableApply();
        },

        updateRecordStatus: function(bulkWireFileLineItemID, currentStatus) {
            var self = this;
            if (self.bulkWireFileResponse.Domestic.length > 0) {
                for (var index = 0; index < self.bulkWireFileResponse.Domestic.length; index++) {
                    if (bulkWireFileLineItemID === self.bulkWireFileResponse.Domestic[index].bulkWireFileLineItemID) {
                        self.bulkWireFileResponse.Domestic[index].status = currentStatus;
                    }
                }
            }
            if (self.bulkWireFileResponse.International.length > 0) {
                for (var index = 0; index < self.bulkWireFileResponse.International.length; index++) {
                    if (bulkWireFileLineItemID === self.bulkWireFileResponse.International[index].bulkWireFileLineItemID) {
                        self.bulkWireFileResponse.International[index].status = currentStatus;
                    }
                }
            }
        },

        isRecordSelected: function() {
            var data = kony.application.getCurrentForm().segmentTransfers.data;
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
            var domesticRecord = this.bulkWireFileResponse.Domestic;
            var internationalRecord = this.bulkWireFileResponse.International;
            var filteredResponse = {};
            var filteredDomesticRecord = [];
            var filteredInternationalRecord = [];
            if (domesticRecord.length > 0) {
                domesticRecord.forEach(function(item) {
                    var item_amount = "" + item.amount;
                    var recipientName = item.recipientName.toLocaleLowerCase();
                    var fromAccountNumber = item.fromAccountNumber.toLocaleLowerCase();
                    if (recipientName.indexOf(enteredText) >= 0 || fromAccountNumber.indexOf(enteredText) >= 0 || item_amount.indexOf(enteredText) >= 0) {
                        filteredDomesticRecord.push(item);
                    }
                })
            }
            if (internationalRecord.length > 0) {
                internationalRecord.forEach(function(item) {
                    var item_amount = "" + item.amount;
                    var recipientName = item.recipientName.toLocaleLowerCase();
                    var fromAccountNumber = item.fromAccountNumber.toLocaleLowerCase();
                    if (recipientName.indexOf(enteredText) >= 0 || fromAccountNumber.indexOf(enteredText) >= 0 || item_amount.indexOf(enteredText) >= 0) {
                        filteredInternationalRecord.push(item);
                    }
                })
            }
            filteredResponse.Domestic = filteredDomesticRecord;
            filteredResponse.International = filteredInternationalRecord;
            this.setRecipientData(filteredResponse, null, null, null);
        },

        toggleEditRecipientView: function() {
            var self = this;
            var selectedRecords = {};
            var Domestic = [];
            var International = [];
            var isSelected = this.view.lblStatus.text;
            if (!this.isRecordSelected() && isSelected === OLBConstants.SWITCH_ACTION.OFF) {
                this.view.lblError.text = "No record is selected.";
                this.view.flxError.setVisibility(true);
            } else {
                this.view.flxError.setVisibility(false);
                if (isSelected === OLBConstants.SWITCH_ACTION.OFF) {
                    this.selectedRecordsID.forEach(function(bulkWireFileLineItemID) {
                        if (self.bulkWireFileResponse.Domestic.length > 0) {
                            self.bulkWireFileResponse.Domestic.forEach(function(record) {
                                if (bulkWireFileLineItemID == record.bulkWireFileLineItemID) {
                                    record.status = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
                                    Domestic.push(record);
                                }
                            })
                        }
                        if (self.bulkWireFileResponse.International.length > 0) {
                            self.bulkWireFileResponse.International.forEach(function(record) {
                                if (bulkWireFileLineItemID == record.bulkWireFileLineItemID) {
                                    record.status = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
                                    International.push(record);
                                }
                            })
                        }
                    });
                    selectedRecords.Domestic = Domestic;
                    selectedRecords.International = International;
                    this.view.lblStatus.text = OLBConstants.SWITCH_ACTION.ON;
                    self.selectedRecords = selectedRecords;
                    this.setRecipientData(selectedRecords, null, null, null);
                } else {
                    this.view.lblStatus.text = OLBConstants.SWITCH_ACTION.OFF;
                    this.setRecipientData(this.bulkWireFileResponse, null, null, null);
                }
            }
        },

        removeSelectedRecipient: function() {
            var self = this;
            var data = kony.application.getCurrentForm().segmentTransfers.data;
            var domesticData = [];
            var removedRecipientsID = new Set();
            if (data[0]) {
                domesticData = data[0][1];
            }
            domesticData.forEach(function(item) {
                if (item.lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    removedRecipientsID.add(item.bulkWireFileLineItemID);
                }
            })
            var internationalData = [];
            if (data[1]) {
                internationalData = data[1][1];
            }
            internationalData.forEach(function(item) {
                if (item.lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    removedRecipientsID.add(item.bulkWireFileLineItemID);
                }
            })
            var newRecipientData = [];
            var Domestic = [];
            var International = [];
            var removedRecipientData = [];
            var removedDomestic = [];
            var removedInternational = [];
            var finalData = "";
            if (this.view.lblStatus.text === OLBConstants.SWITCH_ACTION.ON) {
                finalData = self.selectedRecords;
            } else {
                finalData = self.bulkWireFileResponse;
            }
            if (finalData.Domestic.length > 0) {
                finalData.Domestic.forEach(function(record) {
                    if (removedRecipientsID.has(record.bulkWireFileLineItemID)) {
                        record.isDeleted = true;
                        record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                        removedDomestic.push(record);
                    } else {
                        Domestic.push(record);
                    }
                })
            }
            if (finalData.International.length > 0) {
                finalData.International.forEach(function(record) {
                    if (removedRecipientsID.has(record.bulkWireFileLineItemID)) {
                        record.isDeleted = true;
                        record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                        removedInternational.push(record);
                    } else {
                        International.push(record);
                    }
                })
            }
            newRecipientData.Domestic = Domestic;
            newRecipientData.International = International;
            removedRecipientData.Domestic = removedDomestic;
            removedRecipientData.International = removedInternational;
            if (self.removedRecipientData && (self.removedRecipientData.Domestic.length > 0 || self.removedRecipientData.International.length > 0)) {
                this.updateRemovedRecipient(removedRecipientData);
            } else {
                self.removedRecipientData = removedRecipientData;
            }
            return newRecipientData;
        },

        updateRemovedRecipient: function(newremovedRecipientData) {
            var self = this;
            var domestic = newremovedRecipientData.Domestic;
            var international = newremovedRecipientData.International;
            var index;
            for (index = 0; index < domestic.length; index++) {
                self.removedRecipientData.Domestic.push(domestic[index]);
            }
            for (index = 0; index < international.length; index++) {
                self.removedRecipientData.International.push(international[index]);
            }
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
            sortedRecord.Domestic = domesticData;
            sortedRecord.International = internationalData;
            this.setRecipientData(sortedRecord, null, null, null);
        },

        updateBulkWireRecords: function() {
            var self = this;
            var data = kony.application.getCurrentForm().segmentTransfers.data;
            var domesticData = [];
            if (data && data[0]) {
                domesticData = data[0][1];
            }
            var internationalData = [];
            if (data && data[1]) {
                internationalData = data[1][1];
            }
            if (self.bulkWireFileResponse.Domestic.length === 0 && self.bulkWireFileResponse.International.length > 0) {
                internationalData = data[0][1];
            }

            domesticData.forEach(function(bulkWireFileLineItem) {
                if (self.bulkWireFileResponse.Domestic.length > 0) {
                    self.bulkWireFileResponse.Domestic.forEach(function(record) {
                        if (bulkWireFileLineItem.bulkWireFileLineItemID === record.bulkWireFileLineItemID) {
                            record.fromAccountNumber = bulkWireFileLineItem.listAccounts.selectedKey;
                            record.currency = applicationManager.getFormatUtilManager().getCurrencySymbolCode(bulkWireFileLineItem.ListBox0f204cf65e9ec44.selectedKey);
                            record.amount = bulkWireFileLineItem.TextField0ff78082759ce44.text;
                            record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                        }
                    })
                }
            });
            internationalData.forEach(function(bulkWireFileLineItem) {
                if (self.bulkWireFileResponse.International.length > 0) {
                    self.bulkWireFileResponse.International.forEach(function(record) {
                        if (bulkWireFileLineItem.bulkWireFileLineItemID === record.bulkWireFileLineItemID) {
                            record.fromAccountNumber = bulkWireFileLineItem.listAccounts.selectedKey;
                            record.currency = applicationManager.getFormatUtilManager().getCurrencySymbolCode(bulkWireFileLineItem.ListBox0f204cf65e9ec44.selectedKey);
                            record.amount = bulkWireFileLineItem.TextField0ff78082759ce44.text;
                            record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                        }
                    })
                }
            });
            return self.bulkWireFileResponse;
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
             
            orientationHandler.onOrientationChange(this.onBreakpointChange);
        }

    };
});