define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    return {
        closedTemplate: "flxBulkWireAck",
        selectedTemplate: "flxBulkWireAckSelected",
        bulkWireFileID: "",
        bulkWireFileName: "",
        addedBy: "",
        addedOn: "",
        bulkWireFileInfo: "",
        bulkWireFileResponse: "",
        checkingAccounts: [],
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
                if (uiData.serviceError) {
                    //TODO
                }
                if (uiData.fileDetails) {
                    this.setFileDetails(uiData.fileDetails);
                }
                if (uiData.recipientsData) {
                    this.setRecipientsData(uiData.recipientsData, uiData.config);
                    this.view.flxSearch.Search.imgCross.setVisibility(false);
                }
                if (uiData.searchBulkWireFiles) {
                    this.showSearchBulkWireFiles(uiData.searchBulkWireFiles);
                }
            }
        },
        showBtnTransfer: function() {
            var flag = this.showorhideMakeTransfer();
            this.view.btnMakeBulkTransfer.setVisibility(flag);
        },
        showorhideMakeTransfer: function() {
            var rowData = this.bulkWireFileResponse;
            if (rowData.International.length == 0 && rowData.Domestic.length > 0) {
                return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,
                    OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE
                ]);
            } else if (rowData.International.length > 0 && rowData.Domestic.length == 0) {
                return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES,
                    OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE
                ]);
            } else if (rowData.International.length > 0 && rowData.Domestic.length > 0) {
                return (this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,
                    OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE
                ]) || this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES,
                    OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE
                ]));
            } else if (rowData.International.length == 0 && rowData.Domestic.length == 0) {
                return false;
            }
        },
        showBacktoFilesTemplates: function() {
            var flag = this.checkAtLeastOnePermission([
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_BULKWIRES,
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_BULKWIRES,
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES
            ]);
            this.view.btnNewTransfer.setVisibility(flag);
        },
        checkAllPermissions: function(permissions) {
            return permissions.every(this.checkUserPermission);
        },
        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },
        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            var scopeObj = this;
            scopeObj.bulkwirefilesPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "WireTransferNewUIModule",
                "appName": "WireTransferMA"
            }).presentationController;
            this.showBacktoFilesTemplates();
            this.view.btnMakeBulkTransfer.onClick = function() {
                scopeObj.makeBulkTransfer();
            };
            this.view.btnNewTransfer.onClick = function() {
                scopeObj.navigateTobulkFiles();
            };
            this.view.btnNewTransfer.hoverSkin = "sknBtnSecondaryFocusSSP3343a815PxHover";
            this.view.btnNewTransfer.focusSkin = "sknBtnSecondaryFocusSSP3343a815Px";
            this.view.btnMakeAnother.hoverSkin = "sknBtnHoverSSPFFFFFF15Px";
            this.view.btnMakeAnother.focusSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
            this.view.btnNewTransfer.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.backToBulkTransferFiles");
            this.view.imgSortFromAccountNumber.toolTip = kony.i18n.getLocalizedString("i18n.PayPerson.recipientName");
            this.view.imgSortRecipient.toolTip = kony.i18n.getLocalizedString("i18n.transfers.fromAccount");
            scopeObj.bulkWireFileLineItemsSortMap = [{
                name: 'recipientName',
                imageFlx: scopeObj.view.imgSortRecipient,
                clickContainer: scopeObj.view.flxSortRecipient
            }, {
                name: 'recipientBankName',
                imageFlx: scopeObj.view.imgSortBankName,
                clickContainer: scopeObj.view.flxSortBankName
            }, {
                name: 'amount',
                imageFlx: scopeObj.view.imgSortType,
                clickContainer: scopeObj.view.flxSortAmount
            }];
            FormControllerUtility.setSortingHandlers(scopeObj.bulkWireFileLineItemsSortMap, scopeObj.onbulkWireFileTransactionsSortClickHandler, scopeObj);
        },
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.customheadernew.activateMenu("Wire Transfer", "Bulk Transfer Files");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        preShow: function() {
            var scopeObj = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.bulkWire.ViewFileHeader"), accessibilityConfig);
            //this.setRecipientsData(recipientsData); // this is to be removed , just kept for testing purpose, eventually update method will take care of everyting.
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
        },
        setFileDetails: function(fileData) {
            var self = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblFileName, fileData.bulkWireFileName, accessibilityConfig);
            CommonUtilities.setText(this.view.lblAddedByKey, kony.i18n.getLocalizedString("i18n.bulkWire.addedBy"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblAddedByValue, fileData.addedBy, accessibilityConfig);
            CommonUtilities.setText(this.view.lblAddedOnKey, kony.i18n.getLocalizedString("i18n.bulkWire.addedOn"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblAddedOnValue, fileData.addedOn, accessibilityConfig);
            this.addedBy = fileData.addedBy;
            this.addedOn = fileData.addedOn;
            this.bulkWireFileName = fileData.bulkWireFileName;
            this.bulkWireFileID = fileData.bulkWireFileID;
            this.view.lblFileName.text = CommonUtilities.truncateStringWithGivenLength(fileData.bulkWireFileName, 25);
            this.view.lblFileName.toolTip = fileData.bulkWireFileName;
        },
        filterAccount: function(fromAccountNumber) {
            var currAccounts = this.checkingAccounts;
            for (var index = 0; index < currAccounts.length; index++) {
                if (currAccounts[index].accountID == fromAccountNumber) {
                    return currAccounts[index];
                }
            }
            return false;
        },
        /**
         * Clear the search text box
         */
        clearSearchText: function() {
            this.prevSearchText = '';
            this.view.flxSearch.Search.txtSearch.text = '';
            this.disableSearch();
            this.view.forceLayout();
        },
        /**
         * used to set the Bulk Wire Files serach
         */
        setBulkWireFileSearch: function() {
            var scopeObj = this;
            scopeObj.view.flxSearch.setVisibility(true);
            scopeObj.view.flxSearch.Search.imgCross.setVisibility(true);
            scopeObj.view.flxSearch.Search.btnConfirm.onClick = scopeObj.onSearchBtnClick.bind(scopeObj);
            scopeObj.view.flxSearch.Search.flxClearBtn.onClick = scopeObj.onSearchClearBtnClick.bind(scopeObj);
            scopeObj.view.flxSearch.Search.txtSearch.onKeyUp = scopeObj.onTxtSearchKeyUp.bind(scopeObj);
        },
        /** On Search Text Key Up
         * @param  {object} event object
         */
        onTxtSearchKeyUp: function() {
            var scopeObj = this;
            scopeObj.view.flxSearch.Search.imgCross.setVisibility(true);
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
        /** On Search is complete show external accounts
         * @param  {array} viewModel Array of recipients
         */
        showSearchBulkWireFiles: function(viewModel) {
            var scopeObj = this;
            if (viewModel.error) {
                scopeObj.setRecipientsData("errorExternalAccounts");
                return;
            }
            if (viewModel.bulkWireResponse.length === 0) {
                scopeObj.view.flxSort.setVisibility(false);
                scopeObj.view.segmentFileTransactions.setVisibility(false);
                scopeObj.view.NoTransactions.setVisibility(true);
                scopeObj.view.NoTransactions.rtxNoPaymentMessage.text = "No Records Found";
                scopeObj.view.NoTransactions.lblScheduleAPayment.text = "";
                scopeObj.view.forceLayout();
                return;
            }
            scopeObj.setRecipientsData(viewModel, viewModel.searchInputs, {}, true);
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
            scopeObj.bulkwirefilesPresentationController.showBulkWireLineItems({
                'bulkWireFileID': scopeObj.bulkWireFileID,
                'searchString': "",
                'bulkWireFileName': scopeObj.bulkWireFileName,
                'addedBy': scopeObj.addedBy,
                'addedOn': scopeObj.addedOn
            });
            this.prevSearchText = '';
            this.view.flxSearch.Search.txtSearch.text = '';
            this.view.forceLayout();
        },
        /** Searches for a file line items */
        onSearchBtnClick: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearch.Search.txtSearch.text.trim();
            if (scopeObj.prevSearchText !== searchKeyword) {
                scopeObj.bulkwirefilesPresentationController.showBulkWireLineItems({
                    'searchKeyword': searchKeyword,
                    'bulkWireFileID': scopeObj.bulkWireFileID,
                    'bulkWireFileName': scopeObj.bulkWireFileName,
                    'addedBy': scopeObj.addedBy,
                    'addedOn': scopeObj.addedOn
                });
                scopeObj.prevSearchText = searchKeyword;
            }
        },
        /**
        set the segment data for the file line iitems
        */
        setRecipientsData: function(recipientsData, config) {
            var controller = this;
            this.setRecipientView();
            this.bulkWireFileResponse = recipientsData.bulkWireResponse;
            this.setBulkWireFileSearch();
            this.showorhideMakeTransfer();
            this.showBtnTransfer();
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.closedTemplate = "flxBulkWireAckMobile";
                this.selectedTemplate = "flxBulkWireAckSelectedMobile";
            } else {
                this.closedTemplate = "flxBulkWireAck";
                this.selectedTemplate = "flxBulkWireAckSelected";
            }
            if (recipientsData.isSearchSort !== true) {
                this.checkingAccounts = recipientsData.accountsResponse;
            }
            //this.adjustUIForTransactions(recipientsData); // To check empty data
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            var createSegmentSection = function(recipients, sectionHeaderText) {
                if (recipients.length > 0) {
                    return [{
                            "lblHeader": sectionHeaderText,
                            "lblSeparator": "."
                        },
                        recipients.map(controller.createRecipientSegmentModel.bind(this))
                    ];
                }
            };
            var domesticRecipientsSection = createSegmentSection(recipientsData.bulkWireResponse.Domestic, {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader') + " (" + recipientsData.bulkWireResponse.Domestic.length + ")",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                }
            });
            var internationalRecipientsSection = createSegmentSection(recipientsData.bulkWireResponse.International, {
                "text": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader') + " (" + recipientsData.bulkWireResponse.International.length + ")",
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
                "lblBankValue": "lblBankValue",
                "lblNoteValue": "lblNoteValue",
                "lblNote": "lblNote",
                "lblRecipientValue": "lblRecipientValue",
                "lbFromAccountValue": "lbFromAccountValue",
                "lblRecipientTypeTitle": "lblRecipientTypeTitle",
                "lblTransactionTypeValue": "lblTransactionTypeValue",
                "lblBankAddressValue": "lblBankAddressValue",
                "lblRecipientAddress": "lblRecipientAddress",
                "lblAmountValue": "lblAmountValue",
                "lblAmount": "lblAmount",
                "lblDropdown": "lblDropdown",
                "lblFromAccount": "lblFromAccount",
                "lblRecipient": "lblRecipient",
                "lblReferenceID": "lblReferenceID",
                "lblSeparator": "lblSeparator",
                "lblAccNumber": "lblAccNumber",
                "lblAccNumberValue": "lblAccNumberValue",
                "lblBankAddress": "lblBankAddress",
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
                "lblTransactionType": "lblTransactionType",
                "lblTransactionTypeTitle": "lblTransactionTypeTitle",
                "flxSegment": "flxSegment",
                "segBulkWireAckSelected": "segBulkWireAckSelected",
                "segBulkWireAck": "segBulkWireAck",
                "segBulkWireAckMobile": "segBulkWireAckMobile",
                "segBulkWireAckSelectedMobile": "segBulkWireAckSelectedMobile",
                "flxDropdown": "flxDropdown",
                "lblHeader": "lblHeader",
                "lblFromAccountNo": "lblFromAccountNo",
                "flxIdentifier": "flxIdentifier"
            };
            var domesticCount = (domesticRecipientsSection && domesticRecipientsSection[1]) ? domesticRecipientsSection[1].length : 0;
            var internationalCount = (internationalRecipientsSection && internationalRecipientsSection[1]) ? internationalRecipientsSection[1].length : 0;
            if (domesticCount + internationalCount === 0) {
                this.view.NoTransactions.setVisibility(true);
                this.view.flxSort.setVisibility(false);
                this.view.flxSegment.setVisibility(false);
            } else {
                this.view.NoTransactions.setVisibility(false);
                this.view.flxSegment.setVisibility(true);
                this.view.flxSort.setVisibility(true);
                this.view.segmentTransfers.setData([domesticRecipientsSection, internationalRecipientsSection].filter(transactionsExistInSection));
            }
            FormControllerUtility.updateSortFlex(this.bulkWireFileLineItemsSortMap, config);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            // this.AdjustScreen();
        },
        createRecipientSegmentModel: function(recipientData) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            return {
                "lblBankValue": {
                    "text": recipientData.recipientBankName,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientBankName,
                    }
                },
                
                "lblTransactionTypeTitle":{
                    "isVisible":false
                  },
                "lblFromAccountNo": {
                    "text": recipientData.recipientBankName,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientBankName,
                    }
                },
                
                "lblTransactionTypeValue": {
                    "isVisible":false
                },
                "lblNoteValue": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    }
                },
                "lblNote": {
                    "text": recipientData.note,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.note,
                    }
                },
                "lblRecipientValue": {
                    "text": recipientData.recipientName,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientName,
                    }
                },
                "lbFromAccountValue": {
                    "text": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "",
                    "accessibilityconfig": {
                        "a11yLabel": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "",
                    }
                },
                "lblRecipientTypeTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    }
                },
                //     "lblTransactionTypeValue": {
                //      "text": recipientData.bulkWireTransferType,
                //      "accessibilityconfig": {
                //       "a11yLabel": recipientData.bulkWireTransferType,
                //      }
                //},
                "lblTransactionType": {
                    "text": recipientData.bulkWireTransferType,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType,
                    }
                },
                "lblBankAddressValue": {
                    "text": recipientData.recipientBankAddress2 + " " + recipientData.recipientBankAddress1,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientBankAddress2 + " " + recipientData.recipientBankAddress1,
                    }
                },
                "lblRecipientAddress": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    }
                },
                "lblAmountValue": {
                    "text": applicationManager.getConfigurationManager().getCurrency(recipientData.currency) + recipientData.amount,
                    "accessibilityconfig": {
                        "a11yLabel": applicationManager.getConfigurationManager().getCurrency(recipientData.currency) + recipientData.amount,
                    }
                },
                "lblRecipient": {
                    "text": recipientData.recipientName,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientName,
                    }
                },
                "lblFromAccount": {
                    "text": recipientData.recipientBankName,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientBankName,
                    }
                },
                "lblReferenceID": {
                    "text": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "",
                    "accessibilityconfig": {
                        "a11yLabel": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "",
                    }
                },
                "lblAmount": {
                    "text": applicationManager.getConfigurationManager().getCurrency(recipientData.currency) + recipientData.amount,
                    "accessibilityconfig": {
                        "a11yLabel": applicationManager.getConfigurationManager().getCurrency(recipientData.currency) + recipientData.amount,
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
                "lblSwiftCode": {
                    "text": recipientData.bulkWireTransferType == "Domestic" ? kony.i18n.getLocalizedString("i18n.transfers.routingNumber") : kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType == "Domestic" ? kony.i18n.getLocalizedString("i18n.transfers.routingNumber") : kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    }
                },
                "lblSwiftCodeValue": {
                    "text": recipientData.bulkWireTransferType == "Domestic" ? recipientData.routingNumber : recipientData.swiftCode,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType == "Domestic" ? recipientData.routingNumber : recipientData.swiftCode,
                    }
                },
                "lblIBAN": {
                    "text": kony.i18n.getLocalizedString("i18n.Accounts.IBAN"),
                    "isVisible": recipientData.bulkWireTransferType == "Domestic" ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.Accounts.IBAN"),
                    }
                },
                "lblIBANValue": {
                    "text": recipientData.internationalRoutingNumber,
                    "isVisible": recipientData.bulkWireTransferType == "Domestic" ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.internationalRoutingNumber,
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
                    "text": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    }
                },
                "lblBankNameValue": {
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
                    "text": recipientData.recipientAddressLine1 + " " + recipientData.recipientAddressLine2,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientAddressLine1 + " " + recipientData.recipientAddressLine2,
                    }
                },
                "lblBankAddressTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    }
                },
                "lblBankAddress": {
                    "text": recipientData.recipientBankAddress2 + " " + recipientData.recipientBankAddress1,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientBankAddress2 + " " + recipientData.recipientBankAddress1,
                    }
                },
                "lblNoteTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    }
                },
                "lblNotesValue": {
                    "text": recipientData.note,
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.note,
                    }
                },
                "flxDropdown": {
                    "onClick": this.onClickToggle,
                },
                "lblDropdown": {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN
                },
                "flxIdentifier": "flxIdentifier",
                //"lblIdentifier": "lblIdentifier",
                "lblSeparator": " ",
                "lblSeparator2": " ",
                "lblRowSeperator": " ",
                "template": this.closedTemplate,
            };
        },
        makeBulkTransfer: function() {
            var scopeObj = this;
            scopeObj.bulkwirefilesPresentationController.showBulkWireConfirmTransfer({
                'bulkWireFileID': scopeObj.bulkWireFileID,
                'bulkWireFileName': scopeObj.bulkWireFileName
            });
        },
        navigateTobulkFiles: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "WireTransferNewUIModule",
                "appName": "WireTransferMA"
            });
            var params = {
                "formName": "frmBulkTransferFiles",
                "bulkWireCategoryFilter": "All"
            };
            wireTransferModule.presentationController.showBulkwirefiles(params);
        },
        setRecipientView: function() {
            var self = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.Search.txtSearch.onKeyUp = function() {
                if (self.view.Search.txtSearch.text.trim() && self.view.Search.txtSearch.text.trim().length > 3) {
                    self.bulkwirefilesPresentationController.showBulkWireLineItems({
                        bulkWireFileID: self.bulkWireFileID,
                        searchString: self.view.Search.txtSearch.text.trim(),
                        bulkWireFileName: self.bulkWireFileName,
                        addedBy: self.addedBy,
                        addedOn: self.addedOn
                    }, "search");
                }
            };
            this.view.Search.flxClearBtn.onClick = function() {
                if (self.view.Search.txtSearch.text.trim() && self.view.Search.txtSearch.text.trim().length > 3) {
                    self.bulkwirefilesPresentationController.showBulkWireLineItems({
                        bulkWireFileID: self.bulkWireFileID,
                        searchString: "",
                        bulkWireFileName: self.bulkWireFileName,
                        addedBy: self.addedBy,
                        addedOn: self.addedOn
                    });
                } else {
                    self.onSearchClearBtnClick();
                    self.view.Search.txtSearch.text = "";
                }
            };
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
                    data[sectionIndex][1][rowIndex].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    data[sectionIndex][1][rowIndex].template = this.closedTemplate;
                }
                kony.application.getCurrentForm().segmentTransfers.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
                //    var data1 = kony.application.getCurrentForm().segmentTransfers.clonedTemplates[sectionIndex][1][rowIndex].frame.height;
                //    data[sectionIndex][1][rowIndex].flxIdentifier.height = data1 + "dp";
                kony.application.getCurrentForm().segmentTransfers.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
            }
            // this.AdjustScreen();
        },
        /** On bulk wire file  Sort click handler.
         * @param  {object} event object
         * @param  {object} data New Sorting Data
         */
        onbulkWireFileTransactionsSortClickHandler: function(event, data) {
            var scopeObj = this;
            scopeObj.first = 0;
            data.bulkWireFileID = scopeObj.bulkWireFileID;
            data.bulkWireFileName = scopeObj.bulkWireFileName;
            data.addedBy = scopeObj.addedBy;
            data.addedOn = scopeObj.addedOn;
            scopeObj.bulkwirefilesPresentationController.showBulkWireLineItems(data);
        },
        /**
         * Ui team proposed method to handle screen aligment
         */
        AdjustScreen: function() {
            this.view.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height;
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
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        }
    };
});