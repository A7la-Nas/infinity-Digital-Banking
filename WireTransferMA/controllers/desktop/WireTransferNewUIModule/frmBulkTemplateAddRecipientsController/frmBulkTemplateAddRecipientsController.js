define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {
        BWTUnSelectedTemplate: "flxMakeTransfersTransfersUnselected",
        BWTSelectedTemplate: "flxWireTransferMakeTransfersNewSelected",
        recipientData: "",
        recipientNameOrder: "ASC",
        bulkWireTransferTypeOrder: "ASC",
        bankNameOrder: "ASC",
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.serverError) {
                    this.showServerError(uiData.serverError);
                } else {
                    this.showServerError(false);
                    if (uiData.recipientData && uiData.recipientData.length > 0) {
                        this.setRecipientData(uiData.recipientData);
                    }
                    if (uiData.recipientData && uiData.recipientData.length === 0) {
                        this.showNoTransactionAvailableUI();
                    }
                    if (uiData.editData) {
                        uiData.editData = false;
                        //  this.setButtonsForEdit();
                    }
                    if (uiData.showLoadingIndicator) {
                        if (uiData.showLoadingIndicator.status === true) {
                            FormControllerUtility.showProgressBar(this.view)
                        } else {
                            FormControllerUtility.hideProgressBar(this.view)
                        }
                    }
                }
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
            this.view.lblHeading.text = kony.i18n.getLocalizedString('i18n.bulkwires.createTemplateAddRecipientsHeader');
            this.view.lblHeading.toolTip = kony.i18n.getLocalizedString('i18n.bulkwires.createTemplateAddRecipientsHeader');
            this.view.CustomPopupCancel.btnNo.onClick = this.hideCancelPopUp;
            this.view.CustomPopupCancel.flxCross.onClick = this.hideCancelPopUp;
            this.view.flxExistingRecipients.onTouchEnd = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.showExistingRecipientList();
            }
            this.view.flxExtractFromFile.onTouchEnd = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.showBulkWireAddTemplateFile();
            }
            this.view.flxManualRecipients.onTouchEnd = function() {
                this.navToAddRecipientManually("createRecipients", "");
            }.bind(this);
            this.view.btnBack.onClick = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.navigateToCreateTemplateForm();
            }
            this.view.btnContinue.onClick = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.navigateToTemplateConfirmForm();
            }
            this.view.flxClearBtn.onTouchEnd = function() {
                this.view.flxMakeTransferAck.setVisibility(false);
                this.view.forceLayout();
            }.bind(this);
            this.enableSorting();
            this.enableSearching();

        },
        /**
         * post show Method 
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.lblverifyconfirm.text = kony.i18n.getLocalizedString('i18n.bulkwires.addRecipientHeader');
            this.view.lblverifyconfirm.toolTip = kony.i18n.getLocalizedString('i18n.bulkwires.addRecipientHeader');
            this.view.lblAccountName.text = kony.i18n.getLocalizedString("i18n.PayPerson.recipientName");
            this.view.lblAccountType.text = kony.i18n.getLocalizedString("i18n.accounts.TransactionType");
            this.view.customheadernew.activateMenu("Wire Transfer", "Create New Template");
            this.view.customheadernew.setDefaultHoverSkins();
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            if (wireTransferModule.presentationController.getAddRecFlag() === true) {
                this.view.rtxMakeTransferError.text = kony.i18n.getLocalizedString("i18n.bulkwires.recipientsSuccess");
                this.view.flxMakeTransferAck.setVisibility(true);
                wireTransferModule.presentationController.toggleAddRecFlag();
                this.view.forceLayout();
            } else {
                this.view.flxMakeTransferAck.setVisibility(false);
            }
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * pre show Method 
         */
        preShow: function() {
            //  this.view.btnCancel.right = "28.6%";
            this.view.btnBack.setVisibility(true);
            this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.bulkwires.noRecipientsAdded");
            this.view.btnCancel.onClick = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.resetPrimaryDetails();
                wireTransferModule.presentationController.resetRecipientData();
                wireTransferModule.presentationController.navigateToBulkTransferFiles();
            }
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.flxDialogs.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        },
        setRecipientData: function(data) {

            var controller = this;
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
                "lblIcon": "lblIcon",
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
                "lblRoutingNumberValue": "lblRoutingNumberValue",
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
                FormControllerUtility.enableButton(this.view.btnContinue);
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                var flagStatus = wireTransferModule.presentationController.getAddRecFlag();
                if (flagStatus === true) {
                    this.view.flxMakeTransferAck.setVisibility(false);
                    wireTransferModule.presentationController.toggleAddRecFlag();
                }
            } else {
                this.showNoRecordAvailableMsg();
            }
            this.view.lblRecipientsHeader.text = kony.i18n.getLocalizedString('i18n.bulkwires.addedRecipients') + " (" + data.length + ")";
            this.view.lblRecipientsHeader.toolTip = kony.i18n.getLocalizedString('i18n.bulkwires.addedRecipients') + " (" + data.length + ")";
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
                    wireTransferModule.presentationController.showExistingRecipientList();
                }
                this.view.flxExtractFromFile.onTouchEnd = function() {
                    var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                    wireTransferModule.presentationController.showBulkWireAddTemplateFile();
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
            this.view.lblRecipientsHeader.text = kony.i18n.getLocalizedString('i18n.bulkwires.addedRecipients') + "(0)";
            this.view.lblRecipientsHeader.toolTip = kony.i18n.getLocalizedString('i18n.bulkwires.addedRecipients') + "(0)";
            FormControllerUtility.disableButton(this.view.btnContinue);
        },

        createBWTRecipientSegmentModel: function(recipientData) {
            var scopeObj = this;
            return {
                "lblAccountName": {
                    "text": recipientData.recipientName ? CommonUtilities.truncateStringWithGivenLength(recipientData.recipientName, 25) : "-",
                    "toolTip": recipientData.recipientName ? CommonUtilities.changedataCase(recipientData.recipientName) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientName ? recipientData.recipientName : "-",
                    }
                },
                "lblIcon": {
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? ((!kony.sdk.isNullOrUndefined(recipientData.payeeId)) ? true : false) : false,
                    "isVisible": false, //applicationManager.getUserPreferencesManager().profileAccess === "both" ? ((!kony.sdk.isNullOrUndefined(recipientData.payeeId)) ? true : false) : false,
                    "text": recipientData.isBusinessPayee === "1" ? "r" : "s"
                },
                "lblBankName": {
                    "text": recipientData.recipientBankName ? CommonUtilities.truncateStringWithGivenLength(recipientData.recipientBankName, 15) : "-",
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
                    "text": recipientData.recipientAccountNumber ? CommonUtilities.truncateStringWithGivenLength(recipientData.recipientAccountNumber, 15) : "-",
                    "toolTip": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    }
                },
                "lblAccountNumber": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "toolTip": "Recipient Typer"

                },
                "lblSeparator": ".",
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
                    "text": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "toolTip": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    }
                },
                "lblAddedOnValue": {
                    "text": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? CommonUtilities.truncateStringWithGivenLength(recipientData.routingNumber, 15) : CommonUtilities.truncateStringWithGivenLength(recipientData.internationalRoutingNumber, 15),
                    "toolTip": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? recipientData.routingNumber : recipientData.internationalRoutingNumber,
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? recipientData.routingNumber : recipientData.internationalRoutingNumber,
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
                    "text": (recipientData.recipientBankAddress1 ? CommonUtilities.truncateStringWithGivenLength(recipientData.recipientBankAddress1, 25) : "") + " " + (recipientData.recipientBankAddress2 ? ", " + CommonUtilities.truncateStringWithGivenLength(recipientData.recipientBankAddress2, 25) : "") + " " + (recipientData.recipientBankcity ? ", " + CommonUtilities.truncateStringWithGivenLength(recipientData.recipientBankcity, 25) : "") + " " + (recipientData.bankState ? ", " + CommonUtilities.truncateStringWithGivenLength(recipientData.bankState, 25) : "") + " " + (recipientData.recipientBankZipCode ? ", " + CommonUtilities.truncateStringWithGivenLength(recipientData.recipientBankZipCode, 25) : ""),
                    "toolTip": CommonUtilities.changedataCase(recipientData.recipientBankAddress1 + " " + recipientData.recipientBankAddress2 + " " + recipientData.recipientBankZipCode),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.bankState ? ", " + recipientData.bankState : "") + " " + (recipientData.recipientBankZipCode ? ", " + recipientData.recipientBankZipCode : ""),
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
                    "text": (recipientData.recipientAddressLine1 ? CommonUtilities.truncateStringWithGivenLength(recipientData.recipientAddressLine1, 25) : "") + " " + (recipientData.recipientAddressLine2 ? ", " + CommonUtilities.truncateStringWithGivenLength(recipientData.recipientAddressLine2, 25) : "") + " " + (recipientData.recipientCity ? ", " + CommonUtilities.truncateStringWithGivenLength(recipientData.recipientCity, 25) : "") + " " + (recipientData.state ? ", " + CommonUtilities.truncateStringWithGivenLength(recipientData.state, 25) : "") + "" + (recipientData.recipientZipCode ? ", " + CommonUtilities.truncateStringWithGivenLength(recipientData.recipientZipCode, 25) : "") + "" + (recipientData.country ? ", " + CommonUtilities.truncateStringWithGivenLength(recipientData.country, 25) : ""),
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
                    "text": (recipientData.bulkWireTransferType).toLowerCase() !== "domestic" ? CommonUtilities.truncateStringWithGivenLength(recipientData.swiftCode, 25) : "-",
                    "toolTip": (recipientData.bulkWireTransferType).toLowerCase() !== "domestic" ? recipientData.swiftCode : "-",
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.bulkWireTransferType).toLowerCase() !== "domestic" ? recipientData.swiftCode : "-",
                    }
                },
                "flxDropdown": {
                    "onClick": this.onClickBWTRowToggle
                },
                "lblDropdown": {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN
                },
                "btnAction": {
                    "text": kony.i18n.getLocalizedString("i18n.bulkwires.Remove"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.bulkwires.Remove"),
                    "onClick": function(eventObject, context) {
                        var selectedItems = scopeObj.view.segmentTransfers.data[context.sectionIndex][1][context.rowIndex];
                        scopeObj.removeRecipientPopup(selectedItems);
                    }
                },
                "btnEdit": {
                    "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                    "isVisible": recipientData.templateRecipientCategory === "EXISTINGRECIPIENT" ? false : true,
                    "onClick": function(eventObject, context) {
                        var selectedItems = this.view.segmentTransfers.data[context.sectionIndex][1][context.rowIndex];
                        var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                        var record = wireTransferModule.presentationController.getRecord([selectedItems]);
                        this.navToAddRecipientManually("editRecipient", record);
                    }.bind(this)

                },
                "recipientID": recipientData.recipientID,
                "template": this.BWTUnSelectedTemplate,
            };
        },

        removeRecipientPopup: function(selectedItems) {
            var scopeObj = this;
            scopeObj.view.CustomPopupCancel.lblHeading = kony.i18n.getLocalizedString("i18n.bulkwires.RemovedRecipient");
            scopeObj.view.CustomPopupCancel.lblPopupMessage = kony.i18n.getLocalizedString("i18n.wireTransfers.removeRecipientConfirmation");
            scopeObj.view.CustomPopupCancel.btnYes.onClick = this.removeRecipient.bind(this, selectedItems);
            scopeObj.view.flxCancelPopup.left = "0%";
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.forceLayout();
        },

        hideCancelPopUp: function() {
            this.view.flxCancelPopup.setVisibility(false);
            this.view.flxDialogs.setVisibility(false);
            this.view.flxCancelPopup.left = "100%";
        },

        removeRecipient: function(selectedItems) {
            this.hideCancelPopUp();
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferModule.presentationController.removeRecord([selectedItems]);
            wireTransferModule.presentationController.removeSelectedExistingRecord([selectedItems]);
            this.setRecipientData(wireTransferModule.presentationController.getRecipientData());
            this.view.rtxMakeTransferError.text = kony.i18n.getLocalizedString("i18n.konybb.removeRecipientSuccess");
            this.view.flxMakeTransferAck.setVisibility(true);
            this.view.lblHeading.setFocus(true);
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
        enableSorting: function() {
            var scopeObj = this;
            this.view.imgSortAccountName.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                if (scopeObj.recipientNameOrder === "DSC") {
                    scopeObj.recipientNameOrder = "ASC";
                    scopeObj.view.imgSortAccountName.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    scopeObj.recipientNameOrder = "DSC";
                    scopeObj.view.imgSortAccountName.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                scopeObj.sortRecords(wireTransferModule.presentationController.getRecipientData(), "recipientName", scopeObj.recipientNameOrder);
            };
            this.view.imgSortBankName.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                if (scopeObj.bankNameOrder === "DSC") {
                    scopeObj.bankNameOrder = "ASC";
                    scopeObj.view.imgSortBankName.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    scopeObj.bankNameOrder = "DSC";
                    scopeObj.view.imgSortBankName.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                scopeObj.sortRecords(wireTransferModule.presentationController.getRecipientData(), "recipientBankName", scopeObj.bankNameOrder);
            };
            this.view.imgSortAccountType.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                if (scopeObj.bulkWireTransferTypeOrder === "DSC") {
                    scopeObj.bulkWireTransferTypeOrder = "ASC";
                    scopeObj.view.imgSortAccountType.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    scopeObj.bulkWireTransferTypeOrder = "DSC";
                    scopeObj.view.imgSortAccountType.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                scopeObj.sortRecords(wireTransferModule.presentationController.getRecipientData(), "bulkWireTransferType", scopeObj.bulkWireTransferTypeOrder);
            }
        },
        enableSearching: function() {
            this.view.Search.txtSearch.text = "";
            this.view.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this);
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
        },

        sortRecords: function(data, sortParam, sortOrder) {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            var sortedRecord = wireTransferModule.presentationController.sortBWTStringRecords(data, sortParam, sortOrder);
            this.setRecipientData(sortedRecord);
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
            scopeObj.view.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
            scopeObj.view.Search.btnConfirm.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
            scopeObj.view.Search.flxClearBtn.setVisibility(true);
            scopeObj.enableSearch();
            this.view.flxSearch.forceLayout();
        },

        /** Searches for a payee */
        onSearchBtnClick: function() {
            var self = this;
            var searchResult;
            var text = self.view.Search.txtSearch.text.trim();
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            searchResult = wireTransferModule.presentationController.BWTLocalSearch(wireTransferModule.presentationController.getRecipientData(), text);
            if (searchResult !== "") {
                this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.transfers.searchNoPayees");
            }
            this.setRecipientData(searchResult);
        },

        /** clears the text on search textbox */
        onSearchClearBtnClick: function() {
            this.disableSearch();
            FormControllerUtility.showProgressBar(this.view);
            this.view.Search.txtSearch.text = "";
            this.view.Search.flxClearBtn.setVisibility(false);
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            this.setRecipientData(wireTransferModule.presentationController.getRecipientData());
            this.view.forceLayout();
        },
        showNoTransactionAvailableUI: function() {
            this.view.flxNoTransactions.setVisibility(true);
            this.view.flxSegment.setVisibility(false);
            this.view.lblRecipientsHeader.text = kony.i18n.getLocalizedString('i18n.bulkwires.addedRecipients') + "(0)";
            this.view.lblRecipientsHeader.toolTip = kony.i18n.getLocalizedString('i18n.bulkwires.addedRecipients') + "(0)";
            //this.view.lblScheduleAPayment.setVisibility(false);
            this.view.flxSortMakeTransfers.setVisibility(false);
            this.view.forceLayout();
            FormControllerUtility.disableButton(this.view.btnContinue);
        },
        getWireTransferNewModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },
        setButtonsForEdit: function() {
            // this.view.btnBack.setVisibility(false);
            //  this.view.btnCancel.right = "14.4%";
            this.view.btnCancel.onClick = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.navigateToTemplateConfirmForm();
            }
            this.view.forceLayout();
        },
        navToAddRecipientManually: function(flow, records) {
            var states = this.getWireTransferNewModule().presentationController.getStates();
            if (states.length != 0) {
                this.checkPermissions(states, flow, records);
            } else {
                this.getWireTransferNewModule().presentationController.fetchStatesForAddRecipientsManually("United States", "Add", flow, records);
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
                    // applicationManager.getNavigationManager().navigateTo("frmCreateTempAddDomestic");
                    var obj = {
                        "context": this,
                        "callbackModelConfig": {
                            "frmCreateTempAddDomestic": true
                        }
                    };
                    var navManager = kony.mvc.getNavigationManager();
                    navManager.navigate(obj);
                    if (internationalPermission) {
                        applicationManager.getNavigationManager().updateForm({
                            permissions: userPermissions,
                            states: states.region_details_view,
                        }, "frmCreateTempAddDomestic");
                    } else {
                        applicationManager.getNavigationManager().updateForm({
                            permissions: userPermissions,
                            states: states.region_details_view,
                        }, "frmCreateTempAddDomestic");
                    }
                } else {
                    // applicationManager.getNavigationManager().navigateTo("frmCreateTempAddInternational");
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
                    }, "frmCreateTempAddInternational");
                }
            } else {
                if (records.bulkWireTransferType === "Domestic") {
                    // applicationManager.getNavigationManager().navigateTo("frmCreateTempAddDomestic");
                    var obj = {
                        "context": this,
                        "callbackModelConfig": {
                            "frmCreateTempAddDomestic": true
                        }
                    };
                    var navManager = kony.mvc.getNavigationManager();
                    navManager.navigate(obj);
                    applicationManager.getNavigationManager().updateForm({
                        permissions: userPermissions,
                        states: states.region_details_view,
                        Edit: records
                    }, "frmCreateTempAddDomestic");
                } else {
                    // applicationManager.getNavigationManager().navigateTo("frmCreateTempAddInternational");
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
                    }, "frmCreateTempAddInternational");
                }
            }
        },
    };
});