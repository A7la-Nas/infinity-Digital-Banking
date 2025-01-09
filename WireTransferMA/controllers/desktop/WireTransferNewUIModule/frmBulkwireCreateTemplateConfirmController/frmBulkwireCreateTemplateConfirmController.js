define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {
        BWTUnSelectedTemplate: "flxbulkWireViewTemplate",
        BWTSelectedTemplate: "flxbulkWireViewTemplateSelected",
        recipientData: "",
        recipientNameOrder: "ASC",
        bulkWireTransferTypeOrder: "ASC",
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.serverError) {
                    this.showServerError(uiData.serverError);
                } else {
                    this.showServerError(false);
                }
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
            }
        },

        setVerifyForm: function() {
            var countheader = kony.i18n.getLocalizedString("i18n.bulkwires.addedRecipients") + "(" + this.recipientData.length + ")";
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblRecipientsHeader, countheader, accessibilityConfig);
            this.view.lblRecipientsHeader.toolTip = countheader;
            this.setBWTRecipientData(this.recipientData);
            this.view.btnDelete.onClick = this.navigateToEditTemplate.bind(this);
            this.view.btnContinue.onClick = this.createTemplate.bind(this, this.recipientData);
        },
        navigateToEditTemplate: function(formData) {
            FormControllerUtility.showProgressBar(this.view);
            this.bulkwirefilesPresentationController.EditAddedRecipients();
        },

        createTemplate: function(formData) {
            FormControllerUtility.showProgressBar(this.view);
            var templateDetails = {};
            templateDetails.defaultFromAccount = this.bulkwirefilesPresentationController.getDefaultFromAccount();
            templateDetails.defaultCurrency = applicationManager.getFormatUtilManager().getCurrencySymbolCode(this.bulkwirefilesPresentationController.getDefaultCurrency());
            templateDetails.bulkWireTemplateName = this.bulkwirefilesPresentationController.getBulkWireTemplateName();
            templateDetails.Recipients = formData;
            this.bulkwirefilesPresentationController.createBWTemplate(templateDetails);
            FormControllerUtility.hideProgressBar(this.view);
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
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.bulkwirefilesPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController;
            CommonUtilities.setText(this.view.lblverifyconfirm, kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.wireTemplate.createTemplateVC"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblKey1, kony.i18n.getLocalizedString("i18n.wireTemplate.templateName"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblKey2, kony.i18n.getLocalizedString("i18n.wireTemplate.defFromAcc"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblKey3, kony.i18n.getLocalizedString("i18n.wireTemplate.DefaultCurrency"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnEditDetails, kony.i18n.getLocalizedString("i18n.billPay.Edit"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnEditTemplate, kony.i18n.getLocalizedString("i18n.billPay.Edit"), accessibilityConfig);
            //CommonUtilities.setText(this.view.btnContinue,kony.i18n.getLocalizedString("i18n.bulkwire.deleteTemplate"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnDelete, kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnBack, kony.i18n.getLocalizedString("i18n.konybb.common.cancel"), accessibilityConfig);
            this.view.lblverifyconfirm.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails");
            this.view.lblHeading.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.createTemplateVC");
            this.view.lblKey1.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.templateName");
            this.view.lblKey2.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.defFromAcc");
            this.view.lblKey3.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.DefaultCurrency");
            this.view.btnEditDetails.toolTip = kony.i18n.getLocalizedString("i18n.billPay.Edit");
            this.view.btnEditTemplate.toolTip = kony.i18n.getLocalizedString("i18n.billPay.Edit");
            //this.view.btnContinue.toolTip =kony.i18n.getLocalizedString("i18n.bulkwires.deleteTemplate");
            this.view.btnDelete.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.btnBack.onClick = this.navigateToBWDashboard;
            this.view.Search.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.billpay.searchForKeywords");
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().profileAccess === "both") {
                this.view.lblValueIcon.setVisibility(true);
            }
        },

        navigateToBWDashboard: function() {
            FormControllerUtility.showProgressBar(this.view)
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferModule.presentationController.resetPrimaryDetails();
            wireTransferModule.presentationController.resetRecipientData();
            wireTransferModule.presentationController.showBulkwirefiles({
                "formName": "frmBulkTransferFiles"
            });
        },
        /**
         * post show Method 
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "Create New Template");
            this.view.customheadernew.setDefaultHoverSkins();
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * pre show Method 
         */
        preShow: function() {
            this.view.imgSortBankName.setVisibility(true);
            this.view.imgSortBankName.toolTip=kony.i18n.getLocalizedString("i18n.payments.sortByBankName");
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.Search.flxClearBtn.setVisibility(false);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            var fromAcc = this.bulkwirefilesPresentationController.getDefaultFromAccount();
            var templateName = this.bulkwirefilesPresentationController.getBulkWireTemplateName();
            if(!(/^([a-zA-Z0-9 ]+)$/.test(templateName)))
			{
				var text1 = templateName.replace(/[^A-Za-z0-9]/g, "");
                templateName = text1;
			}
            var currency = this.bulkwirefilesPresentationController.getDefaultCurrency();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxFooter', 'flxHeader']);
            CommonUtilities.setText(this.view.rtxValue1, templateName, accessibilityConfig);
            var defaultCurrency = currency;
            switch (currency) {
                case "$":
                    defaultCurrency = "$ (USD)";
                    break;
                case "€":
                    defaultCurrency = "€ (EUR)";
                    break;
                case "₹":
                    defaultCurrency = "₹ (INR)";
                    break;
                case "£":
                    defaultCurrency = "£ (GBP)";
                    break;

            }
            CommonUtilities.setText(this.view.rtxValue3, applicationManager.getFormatUtilManager().getCurrencySymbol(defaultCurrency), accessibilityConfig);
            this.view.rtxValue1.toolTip = templateName;
            this.view.rtxValue3.toolTip = defaultCurrency;
            this.recipientData = this.bulkwirefilesPresentationController.recipientData;
            this.setVerifyForm();
            this.view.btnEditDetails.onClick = this.navigateToEditPrimaryDetails.bind(this);
            this.view.btnEditTemplate.onClick = this.navigateToEditTemplate.bind(this);
            this.enableSorting();
            this.enableSearching();
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA", "moduleName": "AccountsUIModule"});
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().profileAccess === "both") {
                this.view.lblValueIcon.setVisibility(true);
                this.view.lblValueIcon.text = accountsModule.presentationController.fetchIsBusinessAccount(fromAcc) === "true" ? "r" : "s";
            }
            var accountObj = applicationManager.getAccountManager().getInternalAccountByID(fromAcc);
            var accountDisplayName = CommonUtilities.getAccountDisplayNameNew(accountObj);
            this.view.rtxValue2.toolTip = accountDisplayName;
            CommonUtilities.setText(this.view.rtxValue2, accountDisplayName, accessibilityConfig);

        },
        navigateToEditPrimaryDetails: function() {
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.navigateToCreateTemplateForm();
            } else {
                FormControllerUtility.showProgressBar(this.view);
                this.bulkwirefilesPresentationController.navigateFromAcktoPrimary();
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
                scopeObj.view.imgSortAccountType.src = ViewConstants.IMAGES.SORTING;
                scopeObj.sortRecords(scopeObj.recipientData, "recipientName", scopeObj.recipientNameOrder);
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
                scopeObj.sortRecords(scopeObj.recipientData, "recipientBankName", scopeObj.bankNameOrder);
            }
            this.view.imgSortAccountType.onTouchEnd = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                if (scopeObj.bulkWireTransferTypeOrder === "DSC") {
                    scopeObj.bulkWireTransferTypeOrder = "ASC";
                    scopeObj.view.imgSortAccountType.src = ViewConstants.IMAGES.SORTING_PREVIOUS;
                } else {
                    scopeObj.bulkWireTransferTypeOrder = "DSC";
                    scopeObj.view.imgSortAccountType.src = ViewConstants.IMAGES.SORTING_NEXT;
                }
                scopeObj.view.imgSortAccountName.src = ViewConstants.IMAGES.SORTING;
                scopeObj.sortRecords(scopeObj.recipientData, "bulkWireTransferType", scopeObj.bulkWireTransferTypeOrder);
            }
        },

        enableSearching: function() {
            this.view.Search.txtSearch.text = "";
            this.view.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this);
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
        },

        setBWTRecipientData: function(data) {
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
                "flxbulkWireViewTemplateSelected": "flxbulkWireViewTemplateSelected",
                "imgDropdown": "imgDropdown",
                "lblBank": "lblBank",
                "lblBankAddressValue2": "lblBankAddressValue2",
                "lblBankDetailsTitle": "lblBankDetailsTitle",
                "lblDomesticTitle": "lblDomesticTitle",
                "lblDomesticValue": "lblDomesticValue",
                "lblDropdown": "lblDropdown",
                "lblHeader": "lblHeader",
                "lblIBANNo": "lblIBANNo",
                "lblIBANNumber": "lblIBANNumber",
                "lblIdentifier": "lblIdentifier",
                "lblInternationalTitle": "lblInternationalTitle",
                "lblInternationalValue": "lblInternationalValue",
                "lblLastUsed": "lblLastUsed",
                "lblLastUsedDate": "lblLastUsedDate",
                "lblRecipient": "lblRecipient",
                "lblIcon": "lblIcon",
                "lblReferenceID": "lblReferenceID",
                "lblRowSeperator": "lblRowSeperator",
                "lblSeparator": "lblSeparator",
                "lblTotalTitle": "lblTotalTitle",
                "lblTotalValue": "lblTotalValue",
                "flxbulkWireViewTemplate": "flxbulkWireViewTemplate",
                "segbulkWireViewTemplate": "segbulkWireViewTemplate",
                "segbulkWireViewTemplateSelected": "segbulkWireViewTemplateSelected"
            };
            if (data.length > 0) {
                this.view.flxNoTransactions.setVisibility(false);
                this.view.flxSegment.setVisibility(true);
                this.view.flxSortMakeTransfers.setVisibility(true);
                var createSegmentSection = function(recipients, sectionHeaderText) {
                    if (recipients.length > 0) {
                        return [{
                                "lblHeader": "" + sectionHeaderText.text + "(" + recipients.length + ")",
                                "lblSeparator": "."
                            },
                            recipients.map(controller.createBWTRecipientSegmentModel.bind(this))
                        ];
                    }
                };
                var domesticCount = data.filter(function(item) {
                    return item.bulkWireTransferType == "Domestic";
                });
                var internationalCount = data.filter(function(item) {
                    return item.bulkWireTransferType == "International";
                });
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
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.bulkwires.existingRecipients"),
                    }
                });
                var manuallyAddedSection = createSegmentSection(manuallyAddedRecipients, {
                    "text": kony.i18n.getLocalizedString("i18n.bulkwires.manuallyAdded"),
                    "skin": "sknlbl424242bold15px",
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.bulkwires.manuallyAdded"),
                    }
                });

                var transactionsExistInSection = function(section) {
                    if (section) {
                        return section[1] && section[1].length && section[1].length > 0;
                    }
                }
                var extractedRecipientsSection = createSegmentSection(extractedRecipients, {
                    "text": kony.i18n.getLocalizedString("i18n.bulkwires.extractedFromFile"),
                    "skin": "sknlbl424242bold15px",
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.bulkwires.extractedFromFile"),
                    }
                });

                this.view.segmentTransfers.setData([existingRecipientsSection, manuallyAddedSection, extractedRecipientsSection].filter(transactionsExistInSection));
            } else {
                this.showNoRecordAvailableMsg();
            }
            if (this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES,
                    OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES
                ])) {
                this.view.btnContinue.setVisibility(true);
            } else if (this.checkAtLeastOnePermission([
                    OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES
                ]) && domesticCount.length !== 0 && internationalCount.length === 0) {
                this.view.btnContinue.setVisibility(true);
            } else if (this.checkAtLeastOnePermission([
                    OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES
                ]) && domesticCount.length === 0 && internationalCount.length !== 0) {
                this.view.btnContinue.setVisibility(true);
            } else {
                this.view.btnContinue.setVisibility(false);
            }
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
        },

        showNoRecordAvailableMsg: function() {
            this.view.flxNoTransactions.setVisibility(true);
            this.view.flxSegment.setVisibility(false);
            this.view.flxSortMakeTransfers.setVisibility(false);
        },

        createBWTRecipientSegmentModel: function(recipientData) {
            return {
                "lblRecipient": {
                    "text": recipientData.recipientName ? recipientData.recipientName : "-",
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
                "lblSeparator": ".",
                "lblBank": {
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
                "lblTotalValue": {
                    "text": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    "toolTip": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    }
                },
                "lblDomesticTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    }
                },
                "lblDomesticValue": {
                    "text": recipientData.bulkWireTransferType ? recipientData.bulkWireTransferType : "-",
                    "toolTip": recipientData.bulkWireTransferType ? CommonUtilities.changedataCase(recipientData.bulkWireTransferType) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType ? recipientData.bulkWireTransferType : "-",
                    }
                },
                "lblLastUsed": {
                    "text": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "toolTip": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    }
                },
                "lblLastUsedDate": {
                    "text": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? recipientData.routingNumber : recipientData.internationalRoutingNumber,
                    "toolTip": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? recipientData.routingNumber : recipientData.internationalRoutingNumber,
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? recipientData.routingNumber : recipientData.internationalRoutingNumber,
                    }
                },
                "lblInternationalTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    }
                },
                "lblInternationalValue": {
                    "text": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.bankState ? ", " + recipientData.bankState : ""),
                    "toolTip": CommonUtilities.changedataCase(recipientData.recipientBankAddress1 + " " + recipientData.recipientBankAddress2),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.bankState ? ", " + recipientData.bankState : ""),
                    }
                },
                "lblBankDetailsTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    }
                },
                "lblBankAddressValue2": {
                    "text": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.state ? ", " + recipientData.state : "") + "" + (recipientData.recipientZipCode ? ", " + recipientData.recipientZipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
                    "toolTip": CommonUtilities.changedataCase(recipientData.recipientAddressLine1 + " " + recipientData.recipientAddressLine2),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.state ? ", " + recipientData.state : "") + "" + (recipientData.recipientZipCode ? ", " + recipientData.recipientZipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
                    }
                },
                "flxIBANNumber": {
                    "isVisible": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? false : true
                },
                "flxIBANNo": {
                    "isVisible": (recipientData.bulkWireTransferType).toLowerCase() == "domestic" ? false : true
                },
                "lblIBANNo": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    }
                },
                "lblIBANNumber": {
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
                "recipientID": recipientData.recipientID,
                "template": this.BWTUnSelectedTemplate,
            }
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
            }
        },

        sortRecords: function(data, sortParam, sortOrder) {
            var sortedRecord = this.bulkwirefilesPresentationController.sortBWTStringRecords(data, sortParam, sortOrder);
            this.setBWTRecipientData(sortedRecord);
        },

        /** Disables Search Button*/
        disableSearch: function() {
            this.view.flxSearchBox.Search.flxClearBtn.setVisibility(false);
        },
        /** Enable Search Button
         */
        enableSearch: function() {
            this.view.flxSearchBox.Search.flxClearBtn.setVisibility(true);
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
                scopeObj.view.Search.flxClearBtn.setVisibility(true);
                scopeObj.enableSearch();
            } else {
                scopeObj.view.flxSearchBox.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
            }
            this.view.flxSearch.forceLayout();
        },

        /** Searches for a payee */
        onSearchBtnClick: function() {
            var self = this;
            var searchResult;
            var text = self.view.Search.txtSearch.text.trim();
            searchResult = this.bulkwirefilesPresentationController.BWTLocalSearch(this.recipientData, text);
            this.setBWTRecipientData(searchResult);
        },

        /** clears the text on search textbox */
        onSearchClearBtnClick: function() {
            this.disableSearch();
            FormControllerUtility.showProgressBar(this.view);
            this.view.Search.txtSearch.text = "";
            this.view.Search.flxClearBtn.setVisibility(false);
            this.setBWTRecipientData(this.recipientData);
            this.view.forceLayout();
        },
        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },

        checkAllPermissions: function(permissions) {
            return permissions.every(this.checkUserPermission);
        },
    };
});