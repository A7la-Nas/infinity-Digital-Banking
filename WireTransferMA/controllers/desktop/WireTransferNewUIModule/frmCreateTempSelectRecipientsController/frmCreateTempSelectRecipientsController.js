define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
     
    var orientationHandler = new OrientationHandler();
    return {
        closedTemplate: "flxCreateTempSelectRecipients",
        selectedTemplate: "flxCreateTempSelectRecipientsSelected",
        selectedRecordsID: new Set(),
        RecipientResponse: "",
        WireRecipientResponse: "",
        searchResponse: "",
        init: function() { 
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
//           this.view.imgSortRecipientName.toolTip=kony.i18n.getLocalizedString("i18n.PayPerson.recipientName");
          this.view.imgSortAccountName.toolTip = kony.i18n.getLocalizedString("i18n.transfers.accountName");
          this.view.imgSortBankName.toolTip=kony.i18n.getLocalizedString("i18n.transfers.bankName");
          this.view.imgSortAccountType.toolTip=kony.i18n.getLocalizedString("i18n.transfers.accountType");
          this.view.imgSortAddedOn.toolTip=kony.i18n.getLocalizedString("i18n.common.addedOn");
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            this.selectedRecordsID = new Set();
            this.view.Search.txtSearch.text = "";
            this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.transfers.NoExistingRecipients");
            this.view.flxNoRecords.setVisibility(false);
            this.view.segMakeBulkTransfer.setVisibility(true);
            this.view.flxSort.setVisibility(true);
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.flxSearch.setVisibility(true);
            this.view.lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.lblStatus1.text = OLBConstants.SWITCH_ACTION.OFF;
            this.view.lblStatus1.skin = ViewConstants.SKINS.SWITCH_OFF;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMainWrapper']);
        },
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "Create New Template");
            this.view.lblAccountName.text = kony.i18n.getLocalizedString("i18n.PayPerson.recipientName");
            this.view.lblAddedBy.text = kony.i18n.getLocalizedString("i18n.accounts.TransactionType");
            CommonUtilities.disableButton(this.view.btnContinue);
            applicationManager.getNavigationManager().applyUpdates(this);
            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point == 1366) {
                this.view.flxViewOnlySeletced.right = "5dp";
                this.view.flxViewOnlySeletced.left = "";
            }
        },
        /** Manages the upcomming flow
         * @param  {object} viewModel object consisting data based on which new flow has to drive
         */
        updateFormUI: function(viewModel) {
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            } else {
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.manageRecipients) {
                    var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                    var selectedRecipientData = wireTransferModule.presentationController.selectedRecipients;
                    this.WireRecipientView(viewModel.manageRecipients.recipients, selectedRecipientData);
                }
            }
            this.view.forceLayout();
        },
        WireRecipientView: function(data, selectedRecipientData) {
            var newdata = data;
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < selectedRecipientData.length; j++) {
                    if (data[i].payeeId === selectedRecipientData[j].payeeId) {
                        newdata.splice(i, 1);
                    }
                }
            }
            var filteredData = this.filterData(newdata);
            this.WireRecipientResponse = filteredData;
            this.setEditRecipientView(filteredData);
            if ((newdata.length > 0 && filteredData.length == 0) || (newdata.length == 0 && !this.checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_RECEPIENT, OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_RECEPIENT])))
                this.showNoPermission();
            else
                this.showManageTransferRecipients(filteredData);
        },
        filterData: function(recipients) {
            var data = [];
            for (var i = 0; i < recipients.length; i++) {
                if (recipients[i].wireAccountType.toLowerCase() === OLBConstants.BULK_WIRE_TRANSFER_TYPE.DOMESTIC && this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES, OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_RECEPIENT])) {
                    data.push(recipients[i]);
                } else if (recipients[i].wireAccountType.toLowerCase() === OLBConstants.BULK_WIRE_TRANSFER_TYPE.INTERNATIONAL && this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES, OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_RECEPIENT])) {
                    data.push(recipients[i]);
                }
            }
            return data;
        },
        showNoPermission: function() {
            var scopeObj = this;
            scopeObj.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.bulkwire.selectedRecipientPermission");
            scopeObj.view.flxNoRecords.setVisibility(true);
            scopeObj.view.segMakeBulkTransfer.setVisibility(false);
            scopeObj.view.flxSort.setVisibility(false);
            scopeObj.view.flxSearch.setVisibility(false);
        },
        checkAllPermissions: function(permissions) {
            return permissions.every(this.checkUserPermission);
        },
        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },
        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },
        setEditRecipientView: function(data) {
            var self = this;
            this.view.lblStatus1.onTouchEnd = function() {
                self.toggleEditRecipientView();
            }
            this.view.lblStatus.onTouchEnd = function() {
                self.selectAll();
            }
            this.view.btnContinue.onClick = function() {
                self.AddRecipientstoTemplate();
            }
            this.view.btnBack.onClick = function() {
                self.NavigatetoAddTemplate();
            }
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, data);
            this.view.imgSortAccountName.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(self.view);
                if (self.recipientOrder === "DSC") {
                    self.recipientOrder = "ASC";
                    self.view.imgSortAccountName.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.recipientOrder = "DSC";
                    self.view.imgSortAccountName.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                self.sortRecordsBasedOnParams("name", self.recipientOrder);
            }
            this.view.imgSortBankName.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(self.view);
                if (self.recipientOrder === "DSC") {
                    self.recipientOrder = "ASC";
                    self.view.imgSortBankName.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.recipientOrder = "DSC";
                    self.view.imgSortBankName.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                self.sortRecordsBasedOnParams("bankName", self.recipientOrder);
            }
            this.view.imgSortAccountType.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(self.view);
                if (self.recipientOrder === "DSC") {
                    self.recipientOrder = "ASC";
                    self.view.imgSortAccountType.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.recipientOrder = "DSC";
                    self.view.imgSortAccountType.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                self.sortRecordsBasedOnParams("AccountType", self.recipientOrder);
            }
            this.view.imgSortAddedOn.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(self.view);
                if (self.recipientOrder === "DSC") {
                    self.recipientOrder = "ASC";
                    self.view.imgSortAddedOn.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    self.recipientOrder = "DSC";
                    self.view.imgSortAddedOn.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                self.sortRecordsBasedOnParams("AddedBy", self.recipientOrder);
            }
        },
        /** clears the text on search textbox
         */
        onSearchClearBtnClick: function(WireRecipientResponse) {
            var self = this;
            this.disableSearch();
            FormControllerUtility.showProgressBar(this.view);
            this.view.Search.txtSearch.text = "";
            if (this.view.lblStatus1.text === OLBConstants.SWITCH_ACTION.OFF) {
                self.showManageTransferRecipients(WireRecipientResponse);
            } else if (this.view.lblStatus1.text === OLBConstants.SWITCH_ACTION.ON) {
                self.showManageTransferRecipients(this.selectedRecords);
            }
            this.view.flxNoRecords.setVisibility(false);
            this.view.flxSort.setVisibility(true);
            this.view.segMakeBulkTransfer.setVisibility(true);
            this.view.flxbtn.setVisibility(true);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        /** Searches for a payee */
        onSearchBtnClick: function() {
            var self = this;
            FormControllerUtility.showProgressBar(self.view);
            //  self.view.flxError.setVisibility(false);
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
        //Setting data to segment
        showManageTransferRecipients: function(viewModel) {
            var scopeObj = this;
            this.RecipientResponse = viewModel;
            if (viewModel.length === 0) {
                scopeObj.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.transfers.NoExistingRecipients");
                this.view.flxNoRecords.setVisibility(true);
                this.view.segMakeBulkTransfer.setVisibility(false);
                this.view.flxSort.setVisibility(false);
                return;
            } else {
                var dataMap = {
                    "lblDropdown": "lblDropdown",
                    "lblIcon": "lblIcon",
                    "lblAccountName": "lblAccountName",
                    "lblBankName": "lblBankName",
                    "lblAccountType": "lblAccountType",
                    "lblAddedBy": "lblAddedBy",
                    "lblStatus": "lblStatus",
                    "CopylblBankName0c03f4b289d1c44": "CopylblBankName0c03f4b289d1c44",
                    "lblAccNumber": "lblAccNumber",
                    "lblSwiftCode": "lblSwiftCode",
                    "lblIBAN": "lblIBAN",
                    "lblAccNumberValue": "lblAccNumberValue",
                    "lblSwiftCodeValue": "lblSwiftCodeValue",
                    "lblIBANValue": "lblIBANValue",
                    "lblRecipientAddressTitle": "lblRecipientAddressTitle",
                    "lblBankAddressTitle": "lblBankAddressTitle",
                    "lblNoteTitle": "lblNoteTitle",
                    "lblRecipientAddressValue": "lblRecipientAddressValue",
                    "lblBankAddressValue": "lblBankAddressValue",
                    "lblNotesValue": "lblNotesValue",
                    "flxDropdown": "flxDropdown",
                    "CopylblDropdown0h53109cb48a64d": "CopylblDropdown0h53109cb48a64d",
                    "flxStatus": "flxStatus",
                    "lblCurrencyValueOf": "lblCurrencyValueOf"
                };
                var len = viewModel.length;
                var data = [];
                var i;
                var userObject = applicationManager.getUserPreferencesManager().getUserObj();
                var AddedBy = userObject.userfirstname + "" + userObject.userlastname;
                if (applicationManager.getConfigurationManager().isSMEUser === "true" || applicationManager.getConfigurationManager().isCombinedUser === "true") {
                    AddedBy = "-";
                }
                if (userObject.userfirstname === null && userObject.userlastname === null) {
                    AddedBy = "-";
                }
                for (i = 0; i < len; i++) {
                    if (viewModel[i] !== undefined) {
                        var dataObject = {
                            "lblDropdown": {
                                "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                                "toolTip": kony.i18n.getLocalizedString("i18n.bulkwirefiles.viewRecipientDetails")
                            },
                            "lblIcon": {
                                //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false, 
                                "isVisible": false, //applicationManager.getUserPreferencesManager().profileAccess === "both" ? true : false,
                                "text": viewModel[i].isBusinessPayee === "1" ? "r" : "s"
                            },
                            "CopylblDropdown0h53109cb48a64d": {
                                "text": ViewConstants.FONT_ICONS.CHEVRON_UP,
                                "toolTip": kony.i18n.getLocalizedString("i18n.bulkwirefiles.viewRecipientDetails")
                            },
                            "lblAccountName": {
                                "text": viewModel[i].payeeName,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].payeeName,
                                }
                            },
                            "lblBankName": {
                                "text": CommonUtilities.truncateStringWithGivenLength(viewModel[i].bankName, 15),
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].bankName,
                                }
                            },
                            "lblAccountType": {
                                "text": viewModel[i].wireAccountType,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].wireAccountType,
                                }
                            },
                            "lblAddedBy": {
                                "text": AddedBy,
                                "accessibilityconfig": {
                                    "a11yLabel": AddedBy,
                                }
                            },
                            "lblStatus": {
                                "text": viewModel[i].status ? viewModel[i].status : OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].status ? viewModel[i].status : OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                                }
                            },
                            "CopylblBankName0c03f4b289d1c44": {
                                "text": CommonUtilities.truncateStringWithGivenLength(viewModel[i].bankName, 15),
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].bankName,
                                }
                            },
                            "lblAccNumber": {
                                "text": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                                "accessibilityconfig": {
                                    "a11yLabel": "Account Number",
                                }
                            },
                            "lblSwiftCode": {
                                "text": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                                "accessibilityconfig": {
                                    "a11yLabel": "Recipient Type",
                                }
                            },
                            "lblIBAN": {
                                "text": viewModel[i].routingCode ? "Routing Number" : "International Routing Number",
                                "accessibilityconfig": {
                                    "a11yLabel": "Routing Number",
                                }
                            },
                            "lblAccNumberValue": {
                                "text": viewModel[i].accountNumber,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].accountNumber,
                                }
                            },
                            "lblSwiftCodeValue": {
                                "text": viewModel[i].type,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].type,
                                }
                            },
                            "lblIBANValue": {
                                "text": viewModel[i].routingCode ? viewModel[i].routingCode : viewModel[i].internationalRoutingCode,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].routingCode ? viewModel[i].routingCode : viewModel[i].internationalRoutingCode,
                                }
                            },
                            "lblRecipientAddressTitle": {
                                "text": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                                "accessibilityconfig": {
                                    "a11yLabel": "Bank Address",
                                }
                            },
                            "lblBankAddressTitle": {
                                "text": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                                "accessibilityconfig": {
                                    "a11yLabel": "Recipient Address",
                                }
                            },
                            "lblNoteTitle": {
                                "text": kony.i18n.getLocalizedString("kony.mb.accountdetails.swiftCode"),
                                "accessibilityconfig": {
                                    "a11yLabel": "Swift Code",
                                }
                            },
                            "lblBankAddressValue": {
                                "text": (viewModel[i].addressLine1 ? viewModel[i].addressLine1 : "") + " " + (viewModel[i].addressLine2 ? ", " + viewModel[i].addressLine2 : "") + " " + (viewModel[i].cityName ? ", " + viewModel[i].cityName : "") + " " + (viewModel[i].state ? ", " + viewModel[i].state : "") + " " + (viewModel[i].zipCode ? ", " + viewModel[i].zipCode : ""),
                                "accessibilityconfig": {
                                    "a11yLabel": (viewModel[i].addressLine1 ? viewModel[i].addressLine1 : "") + " " + (viewModel[i].addressLine2 ? ", " + viewModel[i].addressLine2 : "") + " " + (viewModel[i].cityName ? ", " + viewModel[i].cityName : "") + " " + (viewModel[i].state ? ", " + viewModel[i].state : "") + " " + (viewModel[i].zipCode ? ", " + viewModel[i].zipCode : ""),
                                }
                            },
                            "lblRecipientAddressValue": {
                                "text": (viewModel[i].bankAddressLine1 ? viewModel[i].bankAddressLine1 : "") + " " + (viewModel[i].bankAddressLine2 ? ", " + viewModel[i].bankAddressLine2 : "") + " " + (viewModel[i].bankCity ? ", " + viewModel[i].bankCity : "") + " " + (viewModel[i].bankState ? ", " + viewModel[i].bankState : "") + " " + (viewModel[i].bankZip ? ", " + viewModel[i].bankZip : ""),
                                "accessibilityconfig": {
                                    "a11yLabel": (viewModel[i].bankAddressLine1 ? viewModel[i].bankAddressLine1 : "") + " " + (viewModel[i].bankAddressLine2 ? ", " + viewModel[i].bankAddressLine2 : "") + " " + (viewModel[i].bankCity ? ", " + viewModel[i].bankCity : "") + " " + (viewModel[i].bankState ? ", " + viewModel[i].bankState : "") + " " + (viewModel[i].bankZip ? ", " + viewModel[i].bankZip : ""),
                                }
                            },
                            "lblNotesValue": {
                                "text": viewModel[i].swiftCode ? viewModel[i].swiftCode : "-",
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].swiftCode,
                                }
                            },
                            "lblCurrencyValueOf": {
                                "text": viewModel[i].payeeId,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].payeeId,
                                }
                            },
                            "flxDropdown": {
                                "onClick": this.onClickToggle,
                            },
                            "flxStatus": {
                                "onClick": this.toggleCheckBox.bind(this)
                            },
                            "template": this.closedTemplate
                        };
                        data.push(dataObject);
                    }
                }
                this.view.segMakeBulkTransfer.widgetDataMap = dataMap;
                this.view.segMakeBulkTransfer.setData(data);
                this.view.flxNoRecords.setVisibility(false);
                this.view.segMakeBulkTransfer.setVisibility(true);
                this.view.flxSort.setVisibility(true);
                this.view.forceLayout();
            }
        },
        /** Calls when we do search */
        searchForRecords: function() {
            var enteredText = this.view.Search.txtSearch.text ? this.view.Search.txtSearch.text.trim() : "";
            enteredText = enteredText.toLocaleLowerCase();
            if (this.view.lblStatus1.text === OLBConstants.SWITCH_ACTION.OFF) {
                var recipientRecord = this.WireRecipientResponse;
            } else if (this.view.lblStatus1.text === OLBConstants.SWITCH_ACTION.ON) {
                var recipientRecord = this.selectedRecords;
            }
            var filteredResponse = {};
            var filteredRecord = [];
            if (recipientRecord.length > 0) {
                recipientRecord.forEach(function(item) {
                    var recipientName = item.payeeNickName.toLocaleLowerCase();
                    var accountNumber = item.accountNumber.toLocaleLowerCase();
                    var type = item.wireAccountType.toLocaleLowerCase();
                    var bankName = item.bankName.toLocaleLowerCase();
                    var payeeName = item.payeeName.toLocaleLowerCase();
                    var accountType = item.type.toLocaleLowerCase();
                    if (recipientName.indexOf(enteredText) >= 0 || accountNumber.indexOf(enteredText) >= 0 || type.indexOf(enteredText) >= 0 || bankName.indexOf(enteredText) >= 0 || payeeName.indexOf(enteredText) >= 0 || accountType.indexOf(enteredText) >= 0) {
                        filteredRecord.push(item);
                    }
                })
            }
            this.searchResponse = filteredRecord;
            if (filteredRecord.length > 0) {
                filteredResponse = filteredRecord;
                this.showManageTransferRecipients(filteredResponse);
            } else {
                this.view.segMakeBulkTransfer.setVisibility(false);
                this.view.flxSort.setVisibility(false);
                this.view.flxNoRecords.setVisibility(true);
                this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.transfers.searchNoPayees");
            }
            FormControllerUtility.hideProgressBar(this.view);
        },
        /** Calls when click on Sorting options */
        sortRecordsBasedOnParams: function(sortParam, sortOrder) {
            var sortrecord = [];
            if (this.view.Search.txtSearch.text.length > 0) {
                var records = this.searchResponse;

            } else {
                if (this.view.lblStatus1.text === OLBConstants.SWITCH_ACTION.OFF) {
                    var records = this.WireRecipientResponse;
                } else if (this.view.lblStatus1.text === OLBConstants.SWITCH_ACTION.ON) {
                    var records = this.selectedRecords;
                }
            }
            for (i = 0; i < records.length; i++) {
                var userObject = applicationManager.getUserPreferencesManager().getUserObj();
                var AddedBy = userObject.userfirstname + "" + userObject.userlastname;
                records[i].AddedBy = AddedBy;
            }
            sortrecord.push(records);
            var record = sortrecord[0];
            if (sortParam === "name") {
                if (sortOrder === "ASC") {
                    record.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name1.payeeName.localeCompare(name2.payeeName)
                    })
                }
                if (sortOrder === "DSC") {
                    record.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name2.payeeName.localeCompare(name1.payeeName)
                    })
                }
            }
            if (sortParam === "bankName") {
                if (sortOrder === "ASC") {
                    record.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name1.bankName.localeCompare(name2.bankName)
                    })
                }
                if (sortOrder === "DSC") {
                    record.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name2.bankName.localeCompare(name1.bankName)
                    })
                }
            }
            if (sortParam === "AccountType") {
                if (sortOrder === "ASC") {
                    record.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name1.wireAccountType.localeCompare(name2.wireAccountType)
                    })
                }
                if (sortOrder === "DSC") {
                    record.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name2.wireAccountType.localeCompare(name1.wireAccountType)
                    })
                }
            }
            if (sortParam === "AddedBy") {
                if (sortOrder === "ASC") {
                    record.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name1.AddedBy.localeCompare(name2.AddedBy)
                    })
                }
                if (sortOrder === "DSC") {
                    record.sort(function(name1, name2) {
                        if (name1 && name2)
                            return name2.AddedBy.localeCompare(name1.AddedBy)
                    })
                }
            }
            var sortedRecord = record;
            this.showManageTransferRecipients(sortedRecord);
            FormControllerUtility.hideProgressBar(this.view);
        },
        /** Onclick of Dropdown icon in segment */
        onClickToggle: function() {
            var index = kony.application.getCurrentForm().segMakeBulkTransfer.selectedRowIndex;
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segMakeBulkTransfer.data;
            for (i = 0; i < data.length; i++) {
                if (i == rowIndex) {
                    if (data[i].lblDropdown.text == ViewConstants.FONT_ICONS.CHEVRON_UP) {
                        data[i].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                        data[i].lblDropdown.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.viewFileDetails");
                        data[i].template = this.closedTemplate;
                    } else {
                        data[i].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                        data[i].lblDropdown.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.hideFileDetails");
                        data[i].template = this.selectedTemplate;
                    }
                } else {
                    data[i].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    data[i].template = this.closedTemplate;
                }
            }
            kony.application.getCurrentForm().segMakeBulkTransfer.setData(data);
            kony.application.getCurrentForm().forceLayout();
            this.AdjustScreen();
        },
        /** Adjust Screen after click of dropdown in segment */
        AdjustScreen: function() {
            this.view.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight =  this.view.flxMainWrapper.info.frame.height + this.view.flxFooter.info.frame.height;
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
        },
        /** calls when we select any recipient */
        toggleCheckBox: function() {
            var index = kony.application.getCurrentForm().segMakeBulkTransfer.selectedRowIndex;
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segMakeBulkTransfer.data;
            if (data[rowIndex].lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                this.updateRecordStatus(data[rowIndex].lblCurrencyValueOf.text, OLBConstants.FONT_ICONS.CHECBOX_SELECTED);
                data[rowIndex].lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
                this.selectedRecordsID.add(data[rowIndex].lblCurrencyValueOf.text);
            } else {
                this.updateRecordStatus(data[rowIndex].lblCurrencyValueOf.text, OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
                data[rowIndex].lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                this.selectedRecordsID.delete(data[rowIndex].lblCurrencyValueOf.text);
            }
            kony.application.getCurrentForm().segMakeBulkTransfer.setDataAt(data[rowIndex], rowIndex);
            var buttonStatus = this.isRecordSelected();
            if (buttonStatus) {
                CommonUtilities.enableButton(this.view.btnContinue);
            } else {
                CommonUtilities.disableButton(this.view.btnContinue);
            }
        },
        updateRecordStatus: function(payeeId, currentStatus) {
            var self = this;
            if (self.RecipientResponse.length > 0) {
                for (var index = 0; index < self.RecipientResponse.length; index++) {
                    if (payeeId === self.RecipientResponse[index].payeeId) {
                        self.RecipientResponse[index].status = currentStatus;
                    }
                }
            }
        },
        /** OnClick of View only selected option */
        toggleEditRecipientView: function() {
            var self = this;
            var selectedRecords = {};
            var Recipients = [];
            var isSelected = this.view.lblStatus1.text;
            if (!this.isRecordSelected() && isSelected === OLBConstants.SWITCH_ACTION.OFF) {
                //                 this.view.lblError.text = "No record is selected.";
                //                 this.view.flxError.setVisibility(true);
            } else {
                //  this.view.flxError.setVisibility(false);
                if (isSelected === OLBConstants.SWITCH_ACTION.OFF) {
                    this.selectedRecordsID.forEach(function(payeeId) {
                        if (self.RecipientResponse.length > 0) {
                            self.RecipientResponse.forEach(function(record) {
                                if (payeeId == record.payeeId) {
                                    record.status = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
                                    Recipients.push(record);
                                }
                            })
                        }
                    });
                    selectedRecords = Recipients;
                    this.view.lblStatus1.text = OLBConstants.SWITCH_ACTION.ON;
                    this.view.lblStatus1.skin = ViewConstants.SKINS.SWITCH_ON;
                    self.selectedRecords = selectedRecords;
                    this.showManageTransferRecipients(selectedRecords);
                } else {
                    this.view.lblStatus1.text = OLBConstants.SWITCH_ACTION.OFF;
                    this.view.lblStatus1.skin = ViewConstants.SKINS.SWITCH_OFF;
                    this.searchForRecords();
                    //this.showManageTransferRecipients(this.WireRecipientResponse);
                }
            }
        },
        /** OnClick of SelectAll Option */
        selectAll: function() {
            var self = this;
            var selectedRecords = {};
            var Recipients = [];
            var isSelected = this.view.lblStatus.text;
            if (isSelected === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                if (self.WireRecipientResponse.length > 0) {
                    self.WireRecipientResponse.forEach(function(record) {
                        record.status = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
                        Recipients.push(record);
                    })
                }
                selectedRecords = Recipients;
                this.view.lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
                self.selectedRecords = selectedRecords;
                this.showManageTransferRecipients(selectedRecords);
                var data = kony.application.getCurrentForm().segMakeBulkTransfer.data;
                for (i = 0; i < data.length; i++) {
                    data[i].lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
                    this.selectedRecordsID.add(data[i].lblCurrencyValueOf.text);
                }
                CommonUtilities.enableButton(this.view.btnContinue);
            } else {
                if (self.WireRecipientResponse.length > 0) {
                    self.WireRecipientResponse.forEach(function(record) {
                        record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                        Recipients.push(record);
                    })
                }
                selectedRecords = Recipients;
                this.view.lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                self.selectedRecords = selectedRecords;
                this.showManageTransferRecipients(selectedRecords);
                var data1 = kony.application.getCurrentForm().segMakeBulkTransfer.data;
                for (i = 0; i < data1.length; i++) {
                    data1[i].lblStatus.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                    this.selectedRecordsID.delete(data1[i].lblCurrencyValueOf.text);
                }
                CommonUtilities.disableButton(this.view.btnContinue);
            }
        },

        isRecordSelected: function() {
            var data = kony.application.getCurrentForm().segMakeBulkTransfer.data;
            var buttonStatus = false;
            var domesticData = data;
            domesticData.forEach(function(item) {
                if (item.lblStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    buttonStatus = true;
                }
            })
            return buttonStatus;
        },
        /** Onclick Back Button */
        NavigatetoAddTemplate: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferModule.presentationController.navigateToAddRecipientsForm();
        },
        /** Onclick Add Button */
        AddRecipientstoTemplate: function() {
            var self = this;
            var selectedRecords = {};
            var Recipients = [];
            var selectedRecipients = [];
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            this.selectedRecordsID.forEach(function(payeeId) {
                if (self.RecipientResponse.length > 0) {
                    self.RecipientResponse.forEach(function(record) {
                        if (payeeId === record.payeeId) {
                            Recipients.push(record);
                        }
                    })
                }
            });
            selectedRecords = Recipients;
            if (selectedRecords.length > 0) {
                for (var i = 0; i < selectedRecords.length; i++) {
                    if (selectedRecords[i].wireAccountType === "Domestic") {
                        var params = {
                            "recipientName": selectedRecords[i].payeeName ? selectedRecords[i].payeeName : "",
                            "recipientAddressLine1": selectedRecords[i].addressLine1 ? selectedRecords[i].addressLine1 : "",
                            "recipientAddressLine2": selectedRecords[i].addressLine2 ? selectedRecords[i].addressLine2 : "",
                            "recipientCity": selectedRecords[i].cityName ? selectedRecords[i].cityName : "",
                            "recipientState": selectedRecords[i].state ? selectedRecords[i].state : "",
                            "recipientZipCode": selectedRecords[i].zipCode ? selectedRecords[i].zipCode : "",
                            "recipientAccountNumber": selectedRecords[i].accountNumber ? selectedRecords[i].accountNumber : "",
                            "accountNickname": selectedRecords[i].payeeNickName ? selectedRecords[i].payeeNickName : "",
                            "recipientBankName": selectedRecords[i].bankName ? selectedRecords[i].bankName : "",
                            "recipientBankAddress1": selectedRecords[i].bankAddressLine1 ? selectedRecords[i].bankAddressLine1 : "",
                            "recipientBankAddress2": selectedRecords[i].bankAddressLine2 ? selectedRecords[i].bankAddressLine2 : "",
                            "recipientBankcity": selectedRecords[i].bankCity ? selectedRecords[i].bankCity : "",
                            "recipientBankstate": selectedRecords[i].bankState ? selectedRecords[i].bankState : "",
                            "recipientBankZipCode": selectedRecords[i].bankZip ? selectedRecords[i].bankZip : "",
                            "bulkWireTransferType": selectedRecords[i].wireAccountType ? selectedRecords[i].wireAccountType : "",
                            "transactionType": selectedRecords[i].type ? selectedRecords[i].type : "",
                            "routingNumber": selectedRecords[i].routingCode ? selectedRecords[i].routingCode : "",
                            "payeeId": selectedRecords[i].payeeId,
                            "isBusinessPayee": selectedRecords[i].isBusinessPayee,
                        };
                    } else if (selectedRecords[i].wireAccountType === "International") {
                        var params = {
                            "recipientName": selectedRecords[i].payeeName ? selectedRecords[i].payeeName : "",
                            "recipientAddressLine1": selectedRecords[i].addressLine1 ? selectedRecords[i].addressLine1 : "",
                            "recipientAddressLine2": selectedRecords[i].addressLine2 ? selectedRecords[i].addressLine2 : "",
                            "recipientCity": selectedRecords[i].cityName ? selectedRecords[i].cityName : "",
                            "recipientState": selectedRecords[i].state ? selectedRecords[i].state : "",
                            "recipientZipCode": selectedRecords[i].zipCode ? selectedRecords[i].zipCode : "",
                            "recipientAccountNumber": selectedRecords[i].accountNumber ? selectedRecords[i].accountNumber : "",
                            "accountNickname": selectedRecords[i].payeeNickName ? selectedRecords[i].payeeNickName : "",
                            "recipientBankName": selectedRecords[i].bankName ? selectedRecords[i].bankName : "",
                            "recipientBankAddress1": selectedRecords[i].bankAddressLine1 ? selectedRecords[i].bankAddressLine1 : "",
                            "recipientBankAddress2": selectedRecords[i].bankAddressLine2 ? selectedRecords[i].bankAddressLine2 : "",
                            "recipientBankcity": selectedRecords[i].bankCity ? selectedRecords[i].bankCity : "",
                            "recipientBankstate": selectedRecords[i].bankState ? selectedRecords[i].bankState : "",
                            "recipientBankZipCode": selectedRecords[i].bankZip ? selectedRecords[i].bankZip : "",
                            "bulkWireTransferType": selectedRecords[i].wireAccountType ? selectedRecords[i].wireAccountType : "",
                            "transactionType": selectedRecords[i].type ? selectedRecords[i].type : "",
                            "internationalRoutingNumber": selectedRecords[i].internationalRoutingCode ? selectedRecords[i].internationalRoutingCode : "",
                            "swiftCode": selectedRecords[i].swiftCode ? selectedRecords[i].swiftCode : "",
                            "payeeId": selectedRecords[i].payeeId,
                            "isBusinessPayee": selectedRecords[i].isBusinessPayee,
                        };
                    }
                    selectedRecipients.push(params);
                }
                if (wireTransferModule.presentationController.isBWTAdditionOfRecordPossible() <= 0 || selectedRecipients.length > wireTransferModule.presentationController.isBWTAdditionOfRecordPossible()) {
                    var value = wireTransferModule.presentationController.isBWTAdditionOfRecordPossible();
                    self.view.rtxDowntimeWarning.text = kony.i18n.getLocalizedString("i18n.bulkWireTemplate.cannotAddMoreThan")+ value +kony.i18n.getLocalizedString("kony.mb.mm.recipients");
                    self.view.flxDowntimeWarning.setVisibility(true);
                    self.view.flxDowntimeWarning.setFocus(true);
                    self.view.forceLayout();
                } else {
                    self.view.flxDowntimeWarning.setVisibility(false);
                    self.selectedRecords = selectedRecipients;
                    FormControllerUtility.showProgressBar(this.view);
                    wireTransferModule.presentationController.addAdditionalKeysInRecipientsRecord(self.selectedRecords, OLBConstants.RECIPIENT_CATEGORY.EXISTING_RECIPIENT);
                    wireTransferModule.presentationController.addSelectedRecipientData(self.selectedRecords);
                    wireTransferModule.presentationController.addData(self.selectedRecords, false);
                    wireTransferModule.presentationController.toggleAddRecFlag();
                    wireTransferModule.presentationController.navigateToAddRecipientsForm();
                }
            }
        }
    };
});