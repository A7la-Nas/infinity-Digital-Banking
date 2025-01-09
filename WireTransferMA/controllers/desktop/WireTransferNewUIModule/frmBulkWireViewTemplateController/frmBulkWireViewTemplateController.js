define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {

        closedTemplate: "flxbulkWireViewTemplate",
        selectedTemplate: "flxbulkWireViewTemplateSelected",
        recipientData: "",
        recipientNameOrder: "ASC",
        bulkWireTransferTypeOrder: "ASC",
        templateID: "",
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.serverError) {
                    this.showServerError(uiData.serverError);
                } else {
                    this.showServerError(false);
                }
                if (uiData.isLoading) {
                    if (uiData.isLoading === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
                if (uiData.primaryDetails) {
                    this.setPrimaryDetails(uiData.primaryDetails);
                }
                if (uiData.notSearchFlow) {
                    this.clearSearchText();
                }
                if (uiData.Recipients) {
                    this.setRecipients(uiData.Recipients);
                }
                if (uiData.updateTemplateSuccess) {
                    this.setUpdateTemplateUI(uiData.updateTemplateSuccess);
                }
            }
            this.view.forceLayout();
        },

        setUpdateTemplateUI: function(isUpdateFlow) {
            this.view.flxMakeTransferAck.setVisibility(isUpdateFlow);
        },

        checkAllPermissions: function(permissions) {
            return permissions.every(this.checkUserPermission);
        },
        checkAccountPermissions: function(permission) {
            var accounts = applicationManager.getAccountManager().getInternalAccounts();
            return accounts.some(function(account) {
                return account.accountType === "Checking" && applicationManager.getConfigurationManager().checkAccountAction(account.accountID, permission);
            });
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        setPrimaryDetails: function(primaryDetails) {
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            this.view.flxMakeTransferAck.setVisibility(false);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            var templateName = primaryDetails.bulkWireTemplateName;
			if(!(/^([a-zA-Z0-9 ]+)$/.test(templateName)))
			{
				var text1 = templateName.replace(/[^A-Za-z0-9]/g, "");
                templateName = text1;
			}
      CommonUtilities.setText(this.view.rtxValue1, templateName, accessibilityConfig);
            CommonUtilities.setText(this.view.rtxValue3, applicationManager.getFormatUtilManager().getCurrencySymbol(primaryDetails.defaultCurrency), accessibilityConfig);
            this.view.rtxValue1.toolTip = primaryDetails.bulkWireTemplateName;
            this.view.rtxValue3.toolTip = primaryDetails.defaultCurrency;
            var accountObj = applicationManager.getAccountManager().getInternalAccountByID(primaryDetails.defaultFromAccount);
            if (accountObj != null && accountObj != "" && accountObj != undefined) {
                var accountDisplayName = CommonUtilities.getAccountDisplayNameNew(accountObj);
            } else {
                var accountDisplayName = "X" + primaryDetails.defaultFromAccount.substr(-4);
            }
            this.view.rtxValue2.toolTip = accountDisplayName;
            CommonUtilities.setText(this.view.rtxValue2, accountDisplayName, accessibilityConfig);
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().profileAccess === "both") {
                this.view.lblValueIcon.setVisibility(true);
                this.view.lblValueIcon.text = accountObj.isBusinessAccount === "true" ? "r" : "s";
            }
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (((primaryDetails.noOfDomesticTransactions >= 0 && primaryDetails.noOfInternationalTransactions >= 0 && this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES
                    ])) ||
                    (primaryDetails.noOfDomesticTransactions >= 0 && primaryDetails.noOfInternationalTransactions == 0 && this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES)) ||
                    (primaryDetails.noOfInternationalTransactions >= 0 && primaryDetails.noOfDomesticTransactions == 0 && this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES))) &&
                !(currBreakpoint === 640 || orientationHandler.isMobile)) {
                if (currBreakpoint === 640) {
                    this.view.btnEditDetails.setVisibility(false);
                    this.view.btnEditTemplate.setVisibility(false);
                } else {
                    this.view.btnEditDetails.setVisibility(true);
                    this.view.btnEditTemplate.setVisibility(true);
                }
            } else {
                this.view.btnEditDetails.setVisibility(false);
                this.view.btnEditTemplate.setVisibility(false);
            }

            if (!(currBreakpoint === 640 || orientationHandler.isMobile) && ((primaryDetails.noOfDomesticTransactions > 0 && primaryDetails.noOfInternationalTransactions > 0 && this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_DELETE_BULK_TEMPLATES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_DELETE_BULK_TEMPLATES
                    ])) ||
                    (primaryDetails.noOfDomesticTransactions > 0 && primaryDetails.noOfInternationalTransactions == 0 && this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_DELETE_BULK_TEMPLATES)) ||
                    (primaryDetails.noOfInternationalTransactions > 0 && primaryDetails.noOfDomesticTransactions == 0 && this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_DELETE_BULK_TEMPLATES)))) {
                this.view.btnDelete.setVisibility(true);
            } else if (!(currBreakpoint === 640 || orientationHandler.isMobile) && primaryDetails.noOfDomesticTransactions == 0 && primaryDetails.noOfInternationalTransactions == 0 && (this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_DELETE_BULK_TEMPLATES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_DELETE_BULK_TEMPLATES
                    ]) || this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_DELETE_BULK_TEMPLATES) ||
                    this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_DELETE_BULK_TEMPLATES))) {
                FormControllerUtility.disableButton(this.view.btnDelete);
                this.view.btnDelete.setVisibility(true);
            } else {
                this.view.btnDelete.setVisibility(false);
            }
            if (((primaryDetails.noOfDomesticTransactions > 0 && primaryDetails.noOfInternationalTransactions > 0 &&
                        ((this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES) && this.checkAccountPermissions(OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE)) ||
                            (this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES) && this.checkAccountPermissions(OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE)))) ||
                    (primaryDetails.noOfDomesticTransactions > 0 && primaryDetails.noOfInternationalTransactions == 0 && this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES) && this.checkAccountPermissions(OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE)) ||
                    (primaryDetails.noOfInternationalTransactions > 0 && primaryDetails.noOfDomesticTransactions == 0 && this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES) && this.checkAccountPermissions(OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE))) && !(currBreakpoint === 640 || orientationHandler.isMobile)) {
                this.view.btnContinue.setVisibility(true);
                FormControllerUtility.enableButton(this.view.btnContinue);
            } else if ((primaryDetails.noOfDomesticTransactions == 0 && primaryDetails.noOfInternationalTransactions == 0) && !(currBreakpoint === 640 || orientationHandler.isMobile) &&
                ((this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES) && this.checkAccountPermissions(OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE)) ||
                    (this.checkUserPermission(OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES) && this.checkAccountPermissions(OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE)))) {
                this.view.btnContinue.setVisibility(true);
                FormControllerUtility.disableButton(this.view.btnContinue);
            } else {
                this.view.btnContinue.setVisibility(false);
            }
            this.view.btnEditDetails.onClick = this.navigateToEditPrimaryDetails.bind(this);
            this.view.btnEditTemplate.onClick = this.navigateToEditTemplate.bind(this);
            this.templateID = this.bulkwirefilesPresentationController.getBulkWireTemplateID();
            this.view.btnDelete.onClick = this.deleteTemplate.bind(this, this.templateID);
            this.view.btnContinue.onClick = this.makeBulkTransfer.bind(this, primaryDetails.bulkWireTemplateName);
        },

        setRecipients: function(recipientData) {
            var countheader = kony.i18n.getLocalizedString("i18n.bulkwires.addedRecipients") + "(" + recipientData.recipientsResponse.length + ")";
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblRecipientsHeader, countheader, accessibilityConfig);
            this.view.lblRecipientsHeader.toolTip = countheader;
            this.setBWTRecipientData(recipientData.recipientsResponse, recipientData.sortConfig);
        },
        hideAckPopup: function() {
            this.view.flxMakeTransferAck.setVisibility(false);
        },
        /**
         * hides the cancel activation popup.
         */
        hideCancelPopUp: function() {
            this.view.flxDelete.setVisibility(false);
            this.view.flxDialogs.setVisibility(false);
            this.view.flxDelete.left = "100%";
        },
        deleteTemplate: function(templateID) {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxDelete.setVisibility(true);
            this.view.flxDelete.left = "0%";
            scopeObj.view.deletePopup.btnYes.onClick = function() {
                scopeObj.view.flxDelete.setVisibility(false);
                FormControllerUtility.showProgressBar(scopeObj.view);
                scopeObj.bulkwirefilesPresentationController.deleteTemplate({
                    "bulkWireTemplateID": templateID
                });
            };

        },

        makeBulkTransfer: function(filename) {
            FormControllerUtility.showProgressBar(this.view);
            var scopeObj = this;
            var params = {
                "bulkWireID": scopeObj.templateID,
                "bulkWireName": filename
            }
            this.bulkwirefilesPresentationController.showBulkWireEditRecipientTemplate(params);
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
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        /**
         * Init Method 
         */

        init: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.bulkwirefilesPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController;
            this.view.flxSearchBox.setVisibility(true);
            this.view.flxSearchBox.Search.imgCross.setVisibility(true);
            this.view.flxSearchBox.Search.btnConfirm.onClick = this.onSearchBtnClick.bind(this);
            this.view.flxSearchBox.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this);
            this.view.flxSearchBox.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            CommonUtilities.setText(this.view.lblverifyconfirm, kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.bulkWire.ViewTemplateHeader"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblKey1, kony.i18n.getLocalizedString("i18n.wireTemplate.templateName"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblKey2, kony.i18n.getLocalizedString("i18n.wireTemplate.defFromAcc"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblKey3, kony.i18n.getLocalizedString("i18n.wireTemplate.DefaultCurrency"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnEditDetails, kony.i18n.getLocalizedString("i18n.billPay.Edit"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnEditTemplate, kony.i18n.getLocalizedString("i18n.billPay.Edit"), accessibilityConfig);
            //CommonUtilities.setText(this.view.btnContinue,kony.i18n.getLocalizedString("i18n.bulkwire.deleteTemplate"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnDelete, kony.i18n.getLocalizedString("i18n.bulkWire.deleteTemplate"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnBack, kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK"), accessibilityConfig);
            this.view.lblverifyconfirm.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails");
            this.view.lblHeading.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.ViewTemplateHeader");
            this.view.lblKey1.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.templateName");
            this.view.lblKey2.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.defFromAcc");
            this.view.lblKey3.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.DefaultCurrency");
            this.view.btnEditDetails.toolTip = kony.i18n.getLocalizedString("i18n.billPay.Edit");
            this.view.btnEditTemplate.toolTip = kony.i18n.getLocalizedString("i18n.billPay.Edit");
            this.view.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.makeBulkTransfer");
            this.view.btnDelete.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.deleteTemplate");
            this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            this.view.btnBack.onClick = this.navigateToBWDashboard;
            this.view.deletePopup.btnNo.onClick = this.hideCancelPopUp;
            this.view.deletePopup.flxCross.onClick = this.hideCancelPopUp;
            this.view.flxMakeTransferAck.flxClearBtn.onClick = this.hideAckPopup;
            scopeObj.bulkWireTemplateSortMap = [{
                    name: 'recipientName',
                    imageFlx: scopeObj.view.imgSortAccountName,
                    clickContainer: scopeObj.view.flxAccountName
                },
                {
                    name: 'recipientBankName',
                    imageFlx: scopeObj.view.imgSortBankName,
                    clickContainer: scopeObj.view.flxBankName
                },
                {
                    name: 'bulkWireTransferType',
                    imageFlx: scopeObj.view.imgSortAccountType,
                    clickContainer: scopeObj.view.flxReference
                }
            ];
            this.setSortHandlers(scopeObj.bulkWireTemplateSortMap, scopeObj.onbulkWireTemplatesSortClickHandler, scopeObj);
        },
        setSortHandlers: function(sortMap, clickHandler, scope) {
            var scopeObj = this;
            sortMap.forEach(function(item) {
                item.clickContainer.onClick = clickHandler.bind(scope || scopeObj, event, {
                    'sortBy': item.name,
                    'imageFlx': item.imageFlx
                });
            });
        },
        navigateToBWDashboard: function() {
            FormControllerUtility.showProgressBar(this.view)
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            var params = {
                "formName": "frmBulkTransferFiles",
                "bulkWireCategoryFilter": "All" 
            };
            wireTransferModule.presentationController.showBulkwirefiles(params);
        },
        /**
         * post show Method 
         */
        postShow: function() {
            this.view.lblFileNameValue.text = kony.i18n.getLocalizedString("i18n.bulkWire.ViewTemplateHeader");
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "Bulk Transfer Files");
            this.view.customheadernew.setDefaultHoverSkins();
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * pre show Method 
         */
        preShow: function() {
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.Search.flxClearBtn.setVisibility(false);
            this.view.flxDialogs.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        },

        /** On bulk wire file  Sort click handler.
         * @param  {object} event object
         * @param  {object} data New Sorting Data
         */
        onbulkWireTemplatesSortClickHandler: function(event, data) {

            var scopeObj = this;
            scopeObj.first = 0;
            var img = data.imageFlx.src;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var params = {
                'offset': data.offset,
                'sortBy': data.sortBy,
                'order': (img === "sorting_next.png") ? OLBConstants.DESCENDING_KEY : OLBConstants.ASCENDING_KEY,
                'searchString': data.searchString ? data.searchString : "",
                'bulkWireTemplateID': scopeObj.templateID
            };
            FormControllerUtility.showProgressBar(this.view);
            this.bulkwirefilesPresentationController.fetchRecipientsByTemplateID(params, false);
        },
        navigateToEditPrimaryDetails: function() {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            var params = {
                "bulkWireTemplateID": scopeObj.templateID
            }
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.setBulkWireTemplateId(params);
            this.bulkwirefilesPresentationController.navigateFromEditAckoPrimary();
        },

        navigateToEditTemplate: function(formData) {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferModule.presentationController.editselectedRecipients = [];
            var params = {
                "bulkWireTemplateID": scopeObj.templateID
            };
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.setBulkWireTemplateId(params);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWiretemplatesEditRecipients(params, false);
        },

        setBWTRecipientData: function(data, config) {
            var controller = this;
            this.view.segmentTransfers.widgetDataMap = {
                "flxAccNumberValue": "flxAccNumberValue",
                "flxBankAddress": "flxBankAddress",
                "flxBulkWireAckSelectedMobile": "flxBulkWireAckSelectedMobile",
                "flxColumnOne": "flxColumnOne",
                "flxColumnTwo": "flxColumnTwo",
                "flxDetail": "flxDetail",
                "flxFrom": "flxFrom",
                "flxIBAN": "flxIBAN",
                "flxNote": "flxNote",
                "flxRecentsWireTransfersMobile": "flxRecentsWireTransfersMobile",
                "flxRecipientAddress": "flxRecipientAddress",
                "flxRecipientType": "flxRecipientType",
                "flxRow": "flxRow",
                "flxTransactionType": "flxTransactionType",
                "lbCurrencyValueOf": "lbCurrencyValueOf",
                "lbFromAccountValue": "lbFromAccountValue",
                "lblAccNumber": "lblAccNumber",
                "lblAccNumberValue": "lblAccNumberValue",
                "lblAmount": "lblAmount",
                "lblAmountValue": "lblAmountValue",
                "lblBankAddress": "lblBankAddress",
                "lblBankValue": "lblBankValue",
                "lblCurrency": "lblCurrency",
                "lblFromAccount": "lblFromAccount",
                "lblIBAN": "lblIBAN",
                "lblIBANValue": "lblIBANValue",
                "lblNote": "lblNote",
                "lblNoteValue": "lblNoteValue",
                "lblRecipientAddress": "lblRecipientAddress",
                "lblRecipientAddressValue": "lblRecipientAddressValue",
                "lblRecipientTypeTitle": "lblRecipientTypeTitle",
                "lblRecipientTypeValue": "lblRecipientTypeValue",
                "lblStatus": "lblStatus",
                "lblSwiftCode": "lblSwiftCode",
                "lblSwiftCodeValue": "lblSwiftCodeValue",
                "lblTransactionType": "lblTransactionType",
                "lblTransactionTypeValue": "lblTransactionTypeValue",
                "lblBankAddressValue2": "lblBankAddressValue2",
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
                "lblBankAddressValue": "lblBankAddressValue",
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
                "lblReferenceID": "lblReferenceID",
                "lblRowSeperator": "lblRowSeperator",
                "lblSeparator": "lblSeparator",
                "lblTotalTitle": "lblTotalTitle",
                "lblTotalValue": "lblTotalValue",
                "flxbulkWireViewTemplate": "flxbulkWireViewTemplate",
                "segbulkWireViewTemplate": "segbulkWireViewTemplate",
                "segbulkWireViewTemplateSelected": "segbulkWireViewTemplateSelected",
                "lblIcon": "lblIcon"
            };
            if (data.length > 0) {
                this.view.flxNoTransactions.setVisibility(false);
                this.view.flxSegment.setVisibility(true);
                var currBreakpoint = kony.application.getCurrentBreakpoint();
                if (currBreakpoint === 640 || orientationHandler.isMobile) {
                    this.view.flxSortMakeTransfers.setVisibility(false);
                    this.closedTemplate = "flxBulkWireAckMobile";
                    this.selectedTemplate = "flxBulkWireAckSelectedMobile";
                } else {
                    this.view.flxSortMakeTransfers.setVisibility(true);
                    this.closedTemplate = "flxbulkWireViewTemplate";
                    this.selectedTemplate = "flxbulkWireViewTemplateSelected";
                }
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
                if (this.view.flxSearchBox.Search.txtSearch.text.length > 0) {
                    this.view.flxSearchBox.Search.flxClearBtn.setVisibility(true);
                }
                this.view.segmentTransfers.setData([existingRecipientsSection, manuallyAddedSection, extractedRecipientsSection].filter(transactionsExistInSection));
                FormControllerUtility.updateSortFlex(this.bulkWireTemplateSortMap, config);
            } else {
                this.showNoRecordAvailableMsg();
            }
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
        },

        showNoRecordAvailableMsg: function() {
            this.view.flxNoTransactions.setVisibility(true);
            this.view.flxSegment.setVisibility(false);
            this.view.flxSortMakeTransfers.setVisibility(false);
            if (this.view.flxSearchBox.Search.txtSearch.text.length > 0) {
                this.view.flxSearchBox.Search.flxClearBtn.setVisibility(true);
                this.view.flxNoTransactions.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.transfers.searchNoPayees');
            } else {
                this.view.flxNoTransactions.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.bulkwires.noRecipientsAdded');
            }
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
                "lblSeparator": ".",
                "lblBank": {
                    "text": recipientData.recipientBankName ? recipientData.recipientBankName : "-",
                    "toolTip": recipientData.recipientBankName ? CommonUtilities.changedataCase(recipientData.recipientBankName) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientBankName ? recipientData.recipientBankName : "-",
                    }
                },
                "lblBankValue": {
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
                "lblStatus": {
                    "isVisible": false
                },
                "lblAmountValue": {
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
                "lblFromAccount": {
                    "text": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    }
                },
                "flxIdentifier": "flxIdentifier",
                //"lblIdentifier": "lblIdentifier",
                "lblTotalValue": {
                    "text": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    "toolTip": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.recipientAccountNumber ? recipientData.recipientAccountNumber : "-",
                    }
                },
                "lbFromAccountValue": {
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
                    "text": recipientData.transactionType ? recipientData.transactionType : "-",
                    "toolTip": recipientData.transactionType ? CommonUtilities.changedataCase(recipientData.transactionType) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.transactionType ? recipientData.transactionType : "-",
                    }
                },
                "lblRecipientTypeTitle": {
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
                "lblLastUsed": {
                    "text": recipientData.bulkWireTransferType == "Domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "toolTip": recipientData.bulkWireTransferType == "Domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType == "Domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    }
                },
                "lblLastUsedDate": {
                    "text": recipientData.bulkWireTransferType == "Domestic" ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingCode ? recipientData.internationalRoutingCode : "-"),
                    "toolTip": recipientData.bulkWireTransferType == "Domestic" ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingCode ? recipientData.internationalRoutingCode : "-"),
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType == "Domestic" ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingCode ? recipientData.internationalRoutingCode : "-"),
                    }
                },
                "lblAccNumber": {
                    "text": recipientData.bulkWireTransferType == "Domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "toolTip": recipientData.bulkWireTransferType == "Domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType == "Domestic" ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"),
                    }
                },
                "lblAccNumberValue": {
                    "text": recipientData.bulkWireTransferType == "Domestic" ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingCode ? recipientData.internationalRoutingCode : "-"),
                    "toolTip": recipientData.bulkWireTransferType == "Domestic" ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingCode ? recipientData.internationalRoutingCode : "-"),
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bulkWireTransferType == "Domestic" ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingCode ? recipientData.internationalRoutingCode : "-"),
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
                "lblBankAddressValue": {
                    "text": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.state ? ", " + recipientData.state : "") + "" + (recipientData.recipientZipCode ? ", " + recipientData.recipientZipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
                    "toolTip": CommonUtilities.changedataCase(recipientData.recipientAddressLine1 + " " + recipientData.recipientAddressLine2),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientAddressLine1 ? recipientData.recipientAddressLine1 : "") + " " + (recipientData.recipientAddressLine2 ? ", " + recipientData.recipientAddressLine2 : "") + " " + (recipientData.recipientCity ? ", " + recipientData.recipientCity : "") + " " + (recipientData.state ? ", " + recipientData.state : "") + "" + (recipientData.recipientZipCode ? ", " + recipientData.recipientZipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
                    }
                },
                "lblBankAddress": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    }
                },
                "lblBankAddressValue2": {
                    "text": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.bankState ? ", " + recipientData.bankState : ""),
                    "toolTip": CommonUtilities.changedataCase(recipientData.recipientBankAddress1 + " " + recipientData.recipientBankAddress2),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.recipientBankAddress1 ? recipientData.recipientBankAddress1 : "") + " " + (recipientData.recipientBankAddress2 ? ", " + recipientData.recipientBankAddress2 : "") + " " + (recipientData.recipientBankcity ? ", " + recipientData.recipientBankcity : "") + " " + (recipientData.bankState ? ", " + recipientData.bankState : ""),
                    }
                },
                "lblRecipientAddress": {
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
                "lblSwiftCode": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    }
                },
                "lblSwiftCodeValue": {
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
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? ((!kony.sdk.isNullOrUndefined(recipientData.payeeId)) ? true : false) : false,
                    "isVisible": false, //applicationManager.getUserPreferencesManager().profileAccess === "both" ? ((!kony.sdk.isNullOrUndefined(recipientData.payeeId)) ? true : false) : false,
                    "text": recipientData.isBusinessPayee === "1" ? "r" : "s"
                },
                "flxTransactionType": {
                    "isVisible": false
                },
                "flxIBAN": {
                    "isVisible": false
                },
                "flxNote": {
                    "isVisible": false
                },
                "recipientID": recipientData.recipientID,
                "template": this.closedTemplate,
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
            }
        },

        /**
         * Clear the search text box
         */
        clearSearchText: function() {
            this.prevSearchText = '';
            this.view.flxSearchBox.Search.txtSearch.text = '';
            this.disableSearch();
            this.view.forceLayout();
        },


        /** On Search Text Key Up
         * @param  {object} event object
         */
        onTxtSearchKeyUp: function(event) {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearchBox.Search.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.flxSearchBox.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.enableSearch();
            } else {
                scopeObj.view.flxSearchBox.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.disableSearch();
            }
            this.view.flxSearchBox.forceLayout();
        },

        /** Disables Search Button
         */
        disableSearch: function() {
            this.view.flxSearchBox.Search.flxClearBtn.setVisibility(false);
        },
        /** Enable Search Button
         */
        enableSearch: function() {
            this.view.flxSearchBox.Search.flxClearBtn.setVisibility(true);
        },
        /** clears the text on search textbox
         */
        onSearchClearBtnClick: function() {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            this.disableSearch();
            var params = {
                'bulkWireTemplateID': scopeObj.templateID
            };
            this.bulkwirefilesPresentationController.fetchRecipientsByTemplateID(params, false);
            this.prevSearchText = '';
            this.view.flxSearchBox.Search.txtSearch.text = '';
            this.view.forceLayout();
        },

        /** Searches for a payee */
        onSearchBtnClick: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearchBox.Search.txtSearch.text.trim();
            if (scopeObj.prevSearchText !== searchKeyword) {
                FormControllerUtility.showProgressBar(this.view);
                var params = {
                    'bulkWireTemplateID': scopeObj.templateID,
                    'searchString': searchKeyword
                };
                this.bulkwirefilesPresentationController.fetchRecipientsByTemplateID(params, false);
                scopeObj.prevSearchText = searchKeyword;
            }
        },

    };
});