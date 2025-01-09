define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {
        BWTUnSelectedTemplate: "flxMakeTransfersTransfersUnselected",
        BWTSelectedTemplate: "flxWireTransferMakeTransfersNewSelected",
        recipientData: "",
        recipientNameOrder: "ASC",
        bulkWireTransferTypeOrder: "ASC",
        updateFormUI: function(viewModel) {
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            } else {
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.bulkWireTemplates) {
                    this.setBWTRecipientData(viewModel.bulkWireTemplates, viewModel.config);
                }
                if (viewModel.updateTemplateSuccess) {
                    this.setUpdateTemplateUI(viewModel.updateTemplateSuccess);
                }
            }
            this.view.forceLayout();
        },

        setUpdateTemplateUI: function(isUpdateFlow) {
            if (isUpdateFlow === "remove") {
                this.view.flxMakeTransferAck.rtxMakeTransferError.text = kony.i18n.getLocalizedString('i18n.konybb.templateUpdateSuccess');
                this.view.flxMakeTransferAck.setVisibility(true);
            } else {
                this.view.flxMakeTransferAck.rtxMakeTransferError.text = kony.i18n.getLocalizedString('i18n.bulkwires.recipientsSuccess');
                this.view.flxMakeTransferAck.setVisibility(isUpdateFlow);
            }
        },

        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },

        /**
         * Method to show server error
         * @param {Boolean} status true/false
         */
        showServerError: function(status) {
            if (status === false) {
                this.view.flxMakeTransferError.setVisibility(false);
            } else {
                this.view.rtxError.text = status;
                this.view.rtxError.toolTip = status;
                this.view.flxMakeTransferError.setVisibility(true);
                this.view.flxMakeTransferError.setFocus(true);
            }
            this.view.forceLayout();
        },

        /**
         * Init Method 
         */

        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.flxMakeTransferAck.setVisibility(false);
            this.view.lblHeading.text = kony.i18n.getLocalizedString('i18n.bulkwires.editrecipientbutton');
            this.view.deletePopup.btnNo.onClick = this.hideCancelPopUp;
            this.view.deletePopup.flxCross.onClick = this.hideCancelPopUp;
            var scopeObj = this;
            scopeObj.bulkwirefilesPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController;
            this.view.flxExistingRecipients.onTouchEnd = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.showEditExistingRecipientList();
            }
            this.view.flxExtractFromFile.onTouchEnd = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.showBulkWireAddTemplateFile();
            }
            this.view.flxManualRecipients.onTouchEnd = function() {
                this.navToAddRecipientManually("createRecipients", "");
            }.bind(this);
            this.view.btnBack.onClick = function() {
                var templateID = scopeObj.bulkwirefilesPresentationController.getBulkWireTemplateID();
                var params = {
                    "bulkWireTemplateID": templateID
                };
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.fetchRecipientsByTemplateID(params, false);
            }
            this.view.btnContinue.onClick = function() {
                var templateID = scopeObj.bulkwirefilesPresentationController.getBulkWireTemplateID();
                var params = {
                    "bulkWireTemplateID": templateID
                };
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.fetchRecipientsByTemplateID(params, true);
            }
            this.view.flxClearBtn.onTouchEnd = function() {
                this.view.flxMakeTransferAck.setVisibility(false);
                this.view.forceLayout();
            }.bind(this);
            scopeObj.bulkWireTemplateSortMap = [{
                    name: 'recipientName',
                    imageFlx: scopeObj.view.imgSortAccountName,
                    clickContainer: scopeObj.view.flxAccountName
                },
                {
                    name: 'transactionType',
                    imageFlx: scopeObj.view.imgSortAccountType,
                    clickContainer: scopeObj.view.flxAccountType
                }
            ];
            FormControllerUtility.setSortingHandlers(scopeObj.bulkWireTemplateSortMap, scopeObj.onbulkWireTemplatesSortClickHandler, scopeObj);

        },
        /**
         * post show Method 
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.lblverifyconfirm.text = kony.i18n.getLocalizedString('i18n.bulkwires.addRecipientHeader');
            this.view.customheadernew.activateMenu("Wire Transfer", "Create New Template");
            this.view.customheadernew.setDefaultHoverSkins();
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            if (wireTransferModule.presentationController.getAddRecFlag() === true) {
                this.view.flxMakeTransferAck.setVisibility(true);
                wireTransferModule.presentationController.toggleAddRecFlag();
            }
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * pre show Method 
         */
        preShow: function() {
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferModule.presentationController.editselectedRecipients = [];
            this.view.flxDialogs.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        },

        /** On bulk wire file  Sort click handler.
         * @param  {object} event object
         * @param  {object} data New Sorting Data
         */
        onbulkWireTemplatesSortClickHandler: function(event, data) {
            var scopeObj = this;
            var templateID = this.bulkwirefilesPresentationController.getBulkWireTemplateID();
            scopeObj.first = 0;
            var params = {
                'offset': data.offset,
                'sortBy': data.sortBy,
                'bulkWireTemplateID': templateID
            }
            scopeObj.bulkwirefilesPresentationController.showBulkWiretemplatesEditRecipients(params);
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
        /** clears the text on search textbox
         */
        onSearchClearBtnClick: function() {
            var scopeObj = this;
            scopeObj.view.flxSearch.Search.flxClearBtn.setVisibility(false);
            var templateID = this.bulkwirefilesPresentationController.getBulkWireTemplateID();
            scopeObj.bulkwirefilesPresentationController.showBulkWiretemplatesEditRecipients({
                'bulkWireTemplateID': templateID
            });
            this.prevSearchText = '';
            this.view.flxSearch.Search.txtSearch.text = '';
            this.view.forceLayout();
        },

        /** Searches for a payee */
        onSearchBtnClick: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearch.Search.txtSearch.text.trim();
            var templateID = this.bulkwirefilesPresentationController.getBulkWireTemplateID();
            if (scopeObj.prevSearchText !== searchKeyword) {
                scopeObj.bulkwirefilesPresentationController.showBulkWiretemplatesEditRecipients({
                    'searchKeyword': searchKeyword,
                    'bulkWireTemplateID': templateID
                });
                scopeObj.prevSearchText = searchKeyword;
            }

        },
        /** On Search Text Key Up
         * @param  {object} event object
         */
        onTxtSearchKeyUp: function(event) {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearch.Search.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.flxSearch.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.enableSearch();
            } else {
                scopeObj.view.flxSearch.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.disableSearch();
            }
            this.view.flxSearch.forceLayout();
        },

        /**
         * used to set the Bulk Wire Files serach
         */
        setBulkWireTemplateSearch: function() {
            var scopeObj = this;
            scopeObj.view.flxSearch.setVisibility(true);
            scopeObj.view.flxSearch.Search.imgCross.setVisibility(true);
            scopeObj.view.flxSearch.Search.btnConfirm.onClick = scopeObj.onSearchBtnClick.bind(scopeObj);
            scopeObj.view.flxSearch.Search.flxClearBtn.onClick = scopeObj.onSearchClearBtnClick.bind(scopeObj);
            scopeObj.view.flxSearch.Search.txtSearch.onKeyUp = scopeObj.onTxtSearchKeyUp.bind(scopeObj);
        },


        setBWTRecipientData: function(data, config) {
            var controller = this;
            this.recipientData = data;
            controller.setBulkWireTemplateSearch();
            this.view.segmentTransfers.widgetDataMap = {
                "flxAccountHolder": "flxAccountHolder",
                "flxAccountNumber": "flxAccountNumber",
                "flxAccountNumberValue": "flxAccountNumberValue",
                "flxAccountTypeValue": "flxAccountTypeValue",
                "flxAddedOnValue": "flxAddedOnValue",
                "flxBank": "flxBank",
                "flxBankDetails": "flxBankDetails",
                "flxBankDetailsTitle": "flxBankDetailsTitle",
                "flxBulkWireHeader": "flxBulkWireHeader",
                "flxCurrency": "flxCurrency",
                "flxDetail": "flxDetail",
                "flxDropdown": "flxDropdown",
                "flxIBANNo": "flxIBANNo",
                "flxIBANNumber": "flxIBANNumber",
                "flxIdentifier": "flxIdentifier",
                "flxManageRecipients": "flxManageRecipients",
                "flxReferenceID": "flxReferenceID",
                "flxRoutingNumber": "flxRoutingNumber",
                "flxRoutingNumberValue": "flxRoutingNumberValue",
                "flxRowFour": "flxRowFour",
                "flxRowOne": "flxRowOne",
                "flxRowThree": "flxRowThree",
                "flxRowTwo": "flxRowTwo",
                "flxSelectedRowWrapper": "flxSelectedRowWrapper",
                "flxSwiftCode": "flxSwiftCode",
                "flxWrapper": "flxWrapper",
                "flxWireTransferMakeTransfersNewSelected": "flxWireTransferMakeTransfersNewSelected",
                "imgDropdown": "imgDropdown",
                "lblBankName": "lblBankName",
                "lblBankAddressValue": "lblBankAddressValue",
                "lblBankDetailsTitle": "lblBankDetailsTitle",
                "lblDomesticTitle": "lblDomesticTitle",
                "lblAccountType": "lblAccountType",
                "flxAccountType": "flxAccountType",
                "lblDropdown": "lblDropdown",
                "lblHeader": "lblHeader",
                "lblIBANNo": "lblIBANNo",
                "lblIBANNumber": "lblIBANNumber",
                "lblIdentifier": "lblIdentifier",
                "lblInternationalTitle": "lblInternationalTitle",
                "lblInternationalValue": "lblInternationalValue",
                "lblLastUsed": "lblLastUsed",
                "lblLastUsedDate": "lblLastUsedDate",
                "lblAccountName": "lblAccountName",
                "lblReferenceID": "lblReferenceID",
                "lblRowSeperator": "lblRowSeperator",
                "lblSeparator": "lblSeparator",
                "lblTotalTitle": "lblTotalTitle",
                "lblAccountHolder": "lblAccountHolder",
                "flxSegment": "flxSegment",
                "btnAction": "btnAction",
                "btnEdit": "btnEdit",
                "lblAccountNumber": "lblAccountNumber",
                "lblAccountNumberValue": "lblAccountNumberValue",
                "lblAccountTypeValue": "lblAccountTypeValue",
                "lblAddedOnValue": "lblAddedOnValue",
                "lblRoutingNumber": "lblRoutingNumber",
                "lblSwiftCode": "lblSwiftCode",
                "lblLineItemID": "lblLineItemID",
                "lblRoutingNumberValue": "lblRoutingNumberValue",
                "lblIcon": "lblIcon",
                "flxMakeTransfersTransfersUnselected": "flxMakeTransfersTransfersUnselected",
                "segMakeTransferWireTransfersUnselected": "segMakeTransferWireTransfersUnselected",
                "segMakeTransferWireTransfersNewSelected": "segMakeTransferWireTransfersNewSelected"
            };
            if (data.length > 0) {
                this.view.flxNoTransactions.setVisibility(false);
                this.view.flxSegment.setVisibility(true);
                this.view.flxSortMakeTransfers.setVisibility(true);
                var createSegmentSection = function(recipients, sectionHeaderText) {
                    if (recipients.length > 0) {
                        return [{
                                "lblHeader": "" + sectionHeaderText.text + " (" + recipients.length + ")",
                                "lblSeparator": "."
                            },
                            recipients.map(controller.createBWTRecipientSegmentModel.bind(this))
                        ];
                    }
                };
                var existingRecipients = data.filter(function(item) {
                    return item.templateRecipientCategory == "EXISTINGRECIPIENT";
                });
                var manuallyAddedRecipients = data.filter(function(item) {
                    return item.templateRecipientCategory == "MANUALLYADDED";
                });
                var extractedRecipients = data.filter(function(item) {
                    return item.templateRecipientCategory == "EXTRACTEDFROMFILE";
                });
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.addExistingEditRecipients(existingRecipients);
                var existingRecipientsSection = createSegmentSection(existingRecipients, {
                    "text": kony.i18n.getLocalizedString("i18n.bulkwires.existingRecipients"),
                    "skin": "sknlbl424242bold15px",
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                    }
                });
                var manuallyAddedSection = createSegmentSection(manuallyAddedRecipients, {
                    "text": kony.i18n.getLocalizedString("i18n.bulkwires.manuallyAdded"),
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
                var extractedRecipientsSection = createSegmentSection(extractedRecipients, {
                    "text": "Extracted Recipients",
                    "skin": "sknlbl424242bold15px",
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                    }
                });

                this.view.segmentTransfers.setData([existingRecipientsSection, manuallyAddedSection, extractedRecipientsSection].filter(transactionsExistInSection));
                FormControllerUtility.updateSortFlex(this.bulkWireTemplateSortMap, config);
                CommonUtilities.enableButton(this.view.btnContinue);
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                var flagStatus = wireTransferModule.presentationController.getAddRecFlag();
                if (this.view.flxSearch.Search.txtSearch.text.length > 0) {
                    this.view.flxSearch.Search.flxClearBtn.setVisibility(true);
                }
                if (flagStatus === true) {
                    this.view.flxMakeTransferAck.setVisibility(false);
                    wireTransferModule.presentationController.toggleAddRecFlag();
                }
            } else {
                this.showNoRecordAvailableMsg();
            }
            this.view.lblRecipientsHeader.text = kony.i18n.getLocalizedString('i18n.bulkwires.addedRecipients') + " (" + data.length + ")";
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            if (wireTransferModule.presentationController.isBWTAdditionOfRecordPossible() <= 0) {
                this.view.lblExistingRecipients.skin = "sknlbla0a0a015px";
                this.view.lblManualRecipients.skin = "sknlbla0a0a015px";
                this.view.lblExtractFromFile.skin = "sknlbla0a0a015px";
                this.view.flxExistingRecipients.onTouchEnd = function() {}
                this.view.flxExtractFromFile.onTouchEnd = function() {}
                this.view.flxManualRecipients.onTouchEnd = function() {}
            } else {
                this.view.lblExistingRecipients.skin = "sknSSP4176a415px";
                this.view.lblManualRecipients.skin = "sknSSP4176a415px";
                this.view.lblExtractFromFile.skin = "sknSSP4176a415px";
                this.view.flxExistingRecipients.onTouchEnd = function() {
                    var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                    wireTransferModule.presentationController.showEditExistingRecipientList();
                }
                this.view.flxExtractFromFile.onTouchEnd = function() {
                    var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                    wireTransferModule.presentationController.showBulkWireEditTemplateFile();

                };
                this.view.flxManualRecipients.onTouchEnd = function() {
                    this.navToAddRecipientManually("createRecipients", "");
                }.bind(this);
            }
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
        },

        showNoRecordAvailableMsg: function() {
            this.view.flxNoTransactions.setVisibility(true);
            this.view.flxSegment.setVisibility(false);
            this.view.flxSortMakeTransfers.setVisibility(false);
            if (this.view.flxSearch.Search.txtSearch.text.length > 0) {
                this.view.flxSearch.Search.flxClearBtn.setVisibility(true);
                this.view.flxNoTransactions.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.transfers.searchNoPayees');
                CommonUtilities.disableButton(this.view.btnContinue);
            } else {
                this.view.flxNoTransactions.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.bulkwires.noRecipientsAdded');
            }
        },

        createBWTRecipientSegmentModel: function(recipientData) {
            return {
                "lblAccountName": {
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
                "lblReferenceID": {
                    "text": recipientData.bulkWireTransferType ? recipientData.bulkWireTransferType : "-",
                    "toolTip": recipientData.bulkWireTransferType ? CommonUtilities.changedataCase(recipientData.bulkWireTransferType) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType ? recipientData.bulkWireTransferType : "-",
                    }
                },
                "lblTotalTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    }
                },
                "lblAccountHolder": {
                    "text":kony.i18n.getLocalizedString("i18n.common.accountNumber") ,
                    "toolTip": kony.i18n.getLocalizedString("i18n.common.accountNumber")

                },
                "lblAccountNumberValue": {
                    "text": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    "toolTip": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    }
                },
                "lblAccountNumber": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType")

                },
                "lblAccountTypeValue": {
                    "text": recipientData.transactionType ? recipientData.transactionType : "-",
                    "toolTip": recipientData.transactionType ? recipientData.transactionType : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.transactionType ? recipientData.transactionType : "-",
                    }
                },
                "lblDomesticTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    }
                },
                "lblAccountType": {
                    "text": recipientData.bulkWireTransferType ? recipientData.bulkWireTransferType : "-",
                    "toolTip": recipientData.bulkWireTransferType ? CommonUtilities.changedataCase(recipientData.bulkWireTransferType) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType ? recipientData.bulkWireTransferType : "-",
                    }
                },
                "lblRoutingNumber": {
                    "text": recipientData.routingNumber ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : "International Routing Number",
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.routingNumber"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.routingNumber"),
                    }
                },
                "lblAddedOnValue": {
                    "text": recipientData.routingNumber ? recipientData.routingNumber : recipientData.internationalRoutingNumber,
                    "toolTip": recipientData.routingNumber ? recipientData.routingNumber : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.routingNumber ? recipientData.routingNumber : "-",
                    }
                },
                "lblSwiftCode": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    }
                },
                "lblRoutingNumberValue": {
                    "text": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.recipientBankstate ? ", " + recipientData.recipientBankstate : "") + " " + (recipientData.recipientBankZipCode ? ", " + recipientData.recipientBankZipCode : ""),
                    "toolTip": CommonUtilities.changedataCase(recipientData.recipientBankAddress1 + " " + recipientData.recipientBankAddress2),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.recipientBankstate ? ", " + recipientData.recipientBankstate : "") + " " + (recipientData.recipientBankZipCode ? ", " + recipientData.recipientBankZipCode : ""),
                    }
                },
                "lblIBANNo": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    }
                },
                "lblIBANNumber": {
                    "text": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.state ? ", " + recipientData.state : "") + "" + (recipientData.recipientZipCode ? ", " + recipientData.recipientZipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
                    "toolTip": CommonUtilities.changedataCase(recipientData.recipientAddressLine1 + " " + recipientData.recipientAddressLine2),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.state ? ", " + recipientData.state : "") + "" + (recipientData.recipientZipCode ? ", " + recipientData.recipientZipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
                    }
                },
                "lblBankDetailsTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    }
                },
                "lblBankAddressValue": {
                    "text": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    "toolTip": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    }
                },
                "flxDropdown": {
                    "onClick": this.onClickBWTRowToggle
                },
                "lblDropdown": {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN
                },
                "lblIcon": {
                    //"isVisible" : applicationManager.getConfigurationManager().isCombinedUser === "true" ? ((!kony.sdk.isNullOrUndefined(recipientData.payeeId)) ? true : false) : false,
                    "isVisible": false, //applicationManager.getUserPreferencesManager().profileAccess === "both" ? ((!kony.sdk.isNullOrUndefined(recipientData.payeeId)) ? true : false) : false,
                    "text": recipientData.isBusinessPayee === "1" ? "r" : "s"
                },
                "lblLineItemID": {
                    "text": recipientData.payeeId,
                    "toolTip": recipientData.bulkWireTemplateLineItemID
                },
                "btnAction": {
                    "text": kony.i18n.getLocalizedString("i18n.bulkwires.Remove"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.bulkwires.Remove"),
                    "onClick": this.removeRecipientPopup
                },
                "btnEdit": {
                    "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                    "isVisible": recipientData.templateRecipientCategory === "EXISTINGRECIPIENT" ? false : true,
                    "onClick": this.onClickEditButton

                },
                "recipientID": recipientData.recipientID,
                "template": this.BWTUnSelectedTemplate,
            };
        },
        onClickBWTRowToggle: function() {
            var scopeObj = this;
            var index = kony.application.getCurrentForm().segmentTransfers.selectedRowIndex;
            var sectionIndex = index[0];
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segmentTransfers.data;
            var section = data.length;
            var collapseAll = function(segments, section) {
                segments.forEach(function(segment, i) {
                    if (segment.template === scopeObj.BWTSelectedTemplate) {
                        segment.template = scopeObj.BWTUnSelectedTemplate;
                        segment.lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                        kony.application.getCurrentForm().segmentTransfers.setDataAt(segment, i, section);
                    }
                });
            };
            if (data[sectionIndex][1]) {
                if (data[sectionIndex][1][rowIndex].template === this.BWTUnSelectedTemplate) {
                    while (section--) {
                        collapseAll(data[section][1], section);
                    }
                    data[sectionIndex][1][rowIndex].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                    data[sectionIndex][1][rowIndex].template = this.BWTSelectedTemplate;
                } else {
                    data[sectionIndex][1][rowIndex].lblDropdown = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    data[sectionIndex][1][rowIndex].template = this.BWTUnSelectedTemplate;
                }
                kony.application.getCurrentForm().segmentTransfers.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
                // var data1 =  kony.application.getCurrentForm().segmentTransfers.clonedTemplates[sectionIndex][1][rowIndex].frame.height;
                // data[sectionIndex][1][rowIndex].flxIdentifier.height= data1 +"dp";
                kony.application.getCurrentForm().segmentTransfers.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
            }
        },

        getWireTransferNewModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },

        removeRecipientPopup: function(widget,segInfo) {
            var scopeObj = this;
            scopeObj.view.deletePopup.lblHeading = kony.i18n.getLocalizedString("i18n.bulkwires.RemovedRecipient");
            scopeObj.view.deletePopup.lblPopupMessage = kony.i18n.getLocalizedString("i18n.wireTransfers.removeRecipientConfirmation");
            scopeObj.view.deletePopup.btnYes.onClick = scopeObj.removeRecipient.bind(scopeObj,segInfo);
            scopeObj.view.flxDelete.left = "0%";
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxDelete.setVisibility(true);
            scopeObj.view.forceLayout();
        },

        hideCancelPopUp: function() {
            this.view.flxDelete.setVisibility(false);
            this.view.flxDialogs.setVisibility(false);
            this.view.flxDelete.left = "100%";
        },

        removeRecipient: function(segInfo) {
            this.hideCancelPopUp();
            FormControllerUtility.showProgressBar(this.view);
            var templateDetails = {};
            var Recipients = [];
            var templateID = this.bulkwirefilesPresentationController.getBulkWireTemplateID();
            templateDetails.bulkWireTemplateID = templateID;
            var rowIndex = segInfo.rowIndex;
            var secIndex = segInfo.sectionIndex;
            var data = this.view.segmentTransfers.data[secIndex][1][rowIndex];
            bulkWireTemplateLineItemID = data.lblLineItemID.toolTip;
            payeeId = data.lblLineItemID.text;
            var params = {
                "bulkWireTemplateLineItemID": bulkWireTemplateLineItemID
            }
            Recipients.push(params);
            templateDetails.Recipients = Recipients;
            var params1 = {
                "bulkWireTemplateLineItemID": bulkWireTemplateLineItemID,
                "payeeId": payeeId
            }
            this.bulkwirefilesPresentationController.removeTemplateLineItem(templateDetails);
            this.bulkwirefilesPresentationController.removeExistingEditRecipients(params1);
        },
        onClickEditButton: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            var rowIndex = kony.application.getCurrentForm().segmentTransfers.selectedRowIndex[1];
            var secIndex = kony.application.getCurrentForm().segmentTransfers.selectedRowIndex[0];
            var data1 = kony.application.getCurrentForm().segmentTransfers.data[secIndex][1][rowIndex];
            var newData = [];
            var selectedData = [];
            selectedData.push(data1);
            for (var i = 0; i < this.recipientData.length; i++) {
                for (var j = 0; j < selectedData.length; j++) {
                    if (this.recipientData[i].bulkWireTemplateLineItemID === selectedData[j].lblLineItemID.toolTip) {
                        newData.push(this.recipientData[i]);
                    }
                }
            }
            this.navToAddRecipientManually("editFlow", newData[0]);
        },
        navToAddRecipientManually: function(flow, records) {
            var states = this.getWireTransferNewModule().presentationController.getStates();
            if (states.length != 0) {
                this.checkPermissions(states, flow, records);
            } else {
                this.getWireTransferNewModule().presentationController.fetchStatesForAddRecipientsManually("United States", "Edit", flow, records);
            }
        },
        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },

        checkPermissions: function(states, flow, records) {
            var domesticPermission = this.checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES]);
            var internationalPermission = this.checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES]);
            var userPermissions = {
                domesticPermission,
                internationalPermission
            };
            if (flow === "createRecipients") {
                if (domesticPermission) {
                    // applicationManager.getNavigationManager().navigateTo("frmEditTempAddDomestic");
                    var obj = {
                        "context": this,
                        "callbackModelConfig": {
                            "frmEditTempAddDomestic": true
                        }
                    };
                    var navManager = kony.mvc.getNavigationManager();
                    navManager.navigate(obj);
                    if (internationalPermission) {
                        applicationManager.getNavigationManager().updateForm({
                            permissions: userPermissions,
                            states: states.region_details_view,
                        }, "frmEditTempAddDomestic");
                    } else {
                        applicationManager.getNavigationManager().updateForm({
                            permissions: userPermissions,
                            states: states.region_details_view,
                        }, "frmEditTempAddDomestic");
                    }
                } else {
                    // applicationManager.getNavigationManager().navigateTo("frmEditTempAddInternational");
                    var obj = {
                        "context": this,
                        "callbackModelConfig": {
                            "frmEditTempAddInternational": true
                        }
                    };
                    var navManager = kony.mvc.getNavigationManager();
                    navManager.navigate(obj);
                    applicationManager.getNavigationManager().updateForm({
                        permissions: userPermissions,
                        states: states.region_details_view,
                    }, "frmEditTempAddInternational");
                }
            } else {
                if (records.bulkWireTransferType === "Domestic") {
                    // applicationManager.getNavigationManager().navigateTo("frmEditTempAddDomestic");
                    var obj = {
                        "context": this,
                        "callbackModelConfig": {
                            "frmCreateTempAddInternational": true
                        }
                    };
                    var navManager = kony.mvc.getNavigationManager();
                    navManager.navigate(obj);
                    applicationManager.getNavigationManager().updateForm({
                        permissions: userPermissions,
                        states: states.region_details_view,
                        Edit: records
                    }, "frmEditTempAddDomestic");
                } else {
                    // applicationManager.getNavigationManager().navigateTo("frmEditTempAddInternational");
                    var obj = {
                        "context": this,
                        "callbackModelConfig": {
                            "frmEditTempAddInternational": true
                        }
                    };
                    var navManager = kony.mvc.getNavigationManager();
                    navManager.navigate(obj);
                    applicationManager.getNavigationManager().updateForm({
                        permissions: userPermissions,
                        states: states.region_details_view,
                        Edit: records
                    }, "frmEditTempAddInternational");
                }
            }
        },
    };
});