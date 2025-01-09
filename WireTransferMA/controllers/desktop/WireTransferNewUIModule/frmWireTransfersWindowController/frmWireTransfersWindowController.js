define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'IBANUtils', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, CommonUtilities, ViewConstants, IBANUtils, OLBConstants, CampaignUtility) {
     
    var orientationHandler = new OrientationHandler();
    return {
      searchResponse: "",
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnRecent.onClick = this.onRecentTabClick.bind(this); //Recent - Wire Transfer
            this.view.btnManageRecipient.onClick = this.onManageTabClick.bind(this);
            this.view.btnMakeTransfer.onClick = this.onMakeTransferTabClick.bind(this);
            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point == 640  || orientationHandler.isMobile) {
                this.view.btnMakeTransfer.text = kony.i18n.getLocalizedString("i18n.hamburger.transfer");
                this.view.btnManageRecipient.text = kony.i18n.getLocalizedString("i18n.transfers.external_accounts");
                this.view.btnBulkTransferFiles.text = kony.i18n.getLocalizedString("i18n.wireTransfers.Files&Templates");
            }

        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxRightBar', 'wireTransferRightbar.flxInfo', 'flxMain', 'wireTransferRightbar.flxAddAccountWindow']);
            this.setInitialActions();
            CampaignUtility.fetchPopupCampaigns();

        },
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            // this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.customheadernew.activateMenu("Wire Transfer", "Make Transfer");
            this.view.btnBulkTransferFiles.toolTip = kony.i18n.getLocalizedString("i18n.wireTransfers.Files&Templates");
            this.view.btnBulkTransferFiles.setVisibility(this.checkAtLeastOnePermission([
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES
            ]));
            if (this.view.btnBulkTransferFiles.isVisible === true) {
                this.view.btnBulkTransferFiles.onClick = function() {
                    var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                    var params = {
                        "formName": "frmBulkTransferFiles",
                        "bulkWireCategoryFilter": "All"
                    };
                    wireTransferModule.presentationController.showBulkwirefiles(params);
                }
            }
            this.view.btnBulkTransferFiles.text = kony.i18n.getLocalizedString("i18n.wireTransfers.Files&Templates");
            applicationManager.executeAuthorizationFramework(this);
            this.view.wireTransferRightbar.setCallback(this.onCancel);
        },
        /**
         * Binds initial widget actions - Should be called from pre show
         */
        setInitialActions: function() {
            var scopeObj = this;
            this.view.wireTransferRightbar.flxInfo.onClick = this.showOneTimeTransferInfo.bind(this);
            this.view.AllFormsConfirmDetails.flxCross.onClick = function() {
                scopeObj.view.AllFormsConfirmDetails.setVisibility(false);
            };
        },
        /**
         * Shows I-icon for one time transfer
         */
        showOneTimeTransferInfo: function() {
            var scopeObj = this;
            if (scopeObj.view.AllFormsConfirmDetails.isVisible === false) {
                scopeObj.view.AllFormsConfirmDetails.isVisible = true;
                scopeObj.view.AllFormsConfirmDetails.left = scopeObj.view.flxRightBar.info.frame.x + scopeObj.view.wireTransferRightbar.flxInfo.info.frame.x - 135 + "dp";
                scopeObj.view.AllFormsConfirmDetails.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.WireTransfer.msgInfo2OneTime");
                if (scopeObj.view.wireTransferRightbar.flxAccountInfoForAccountTransfer.isVisible === true) scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.info.frame.height - 80 + "dp";
                else scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.info.frame.height - 10 + "dp";
                scopeObj.view.forceLayout();
            } else scopeObj.view.AllFormsConfirmDetails.isVisible = false;
        },
        checkUserFeature: function(feature) {
            return applicationManager.getConfigurationManager().checkUserFeature(feature);
        },
        checkAtLeastOneFeaturePresent: function(features) {
            return features.some(checkUserFeature);
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },
        showManageTab: function() {
            this.view.btnManageRecipient.setVisibility(true);
        },
        hideManageTab: function() {
            this.view.btnManageRecipient.setVisibility(false);
        },
        showRecentTab: function() {
            this.view.btnRecent.setVisibility(true);
        },
        hideRecentTab: function() {
            this.view.btnRecent.setVisibility(false);
        },
        showMakeTransferTab: function() {
            this.view.btnMakeTransfer.setVisibility(true);
        },
        hideMakeTransferTab: function() {
            this.view.btnMakeTransfer.setVisibility(false);
        },
        showAddRecipientButton: function() {
            this.view.btnSendMoney.setVisibility(true);
        },
        hideAddRecipientButton: function() {
            this.view.btnSendMoney.setVisibility(false);
        },
        showOneTimeTransferButton: function() {
            this.view.btnRequestMoney.setVisibility(true);
        },
        hideOneTimeTransferButton: function() {
            this.view.btnRequestMoney.setVisibility(false);
        },

        updateFormUI: function(context) {
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.makeTransferRecipients) {
                this.getWireTransferModule().presentationController.setManageRecipientData(context.makeTransferRecipients);
                this.showMakeTransferRecipients(context.makeTransferRecipients);
                this.initializeCombinedUsersActions(context.makeTransferRecipients);
            }
            if (context.campaign) {
                CampaignUtility.showCampaign(context.campaign, this.view, "flxMain");
            }
        },
        /**
         * Show No Search results - UI logic
         */
        showNoSearchResults: function() {
            if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
                this.view.tablePagination.setVisibility(false);
                this.view.segWireTransfers.setVisibility(false);
                this.view.flxSearch.setVisibility(true);
                this.view.Search.flxClearBtn.setVisibility(true);
                // this.initializeCombinedUsersActions(context);
                this.view.flxNoTransactions.setVisibility(true);
                this.view.lblScheduleAPayment.setVisibility(false);
                this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.onlineHelp.noSearchResults");
                this.view.forceLayout();
            } else {
                this.view.tablePagination.setVisibility(false);
                this.view.segWireTransfers.setVisibility(false);
                this.view.flxSearch.setVisibility(true);
                this.view.flxNoTransactions.setVisibility(true);
                this.view.lblScheduleAPayment.setVisibility(false);
                this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.onlineHelp.noSearchResults");
                this.view.forceLayout();
            }
        },

        showMakeTransferRecipients: function(context) {
            if (context.recipients.length === 0) {
                if (context.searchString) {
                    this.showNoSearchResults();
                    return;
                }
                this.showNoRecipientsScreen(context);
                return;
            }
            this.view.flxNoTransactions.setVisibility(false);
            this.showMakeTransferTabUI();
            var scopeObj = this;
            var accountSpecificData;
            var sortMap = [{
                name: 'nickName',
                imageFlx: this.view.imgSortAccountName,
                clickContainer: this.view.flxAccountName
            }, {
                name: 'bankName',
                imageFlx: this.view.imgSortBankName,
                clickContainer: this.view.flxBankName
            }];
            var break_point = kony.application.getCurrentBreakpoint();
            var MakeTransferData = {
                "btnAction": "btnAction",
                "flxAccountName": "flxAccountName",
                "flxAccountType": "flxAccountType",
                "flxBankName": "flxBankName",
                "flxDropdown": "flxDropdown",
                "flxWireTransferMakeTransfersNewSelected": "flxWireTransferMakeTransfersNewSelected",
                "flxMakeTransferWireTransfersMobileSelectedNew": "flxMakeTransferWireTransfersMobileSelectedNew",
                "flxRow": "flxRow",
                "lblDropdown": "lblDropdown",
                "lblAccountName": "lblAccountName",
                "lblAccountType": "lblAccountType",
                "lblBankName": "lblBankName",
                "lblSeparator": "lblSeparator",
                "lblIdentifier": "lblIdentifier",
                "flxIdentifier": "flxIdentifier",
                "lblAccountHolder": "lblAccountHolder",
                "lblAccountNumber": "lblAccountNumber",
                "lblRoutingNumber": "lblRoutingNumber",
                "lblAccountNumberValue": "lblAccountNumberValue",
                "lblAccountTypeValue": "lblAccountTypeValue",
                "lblAddedOnValue": "lblAddedOnValue",
                "lblSwiftCode": "lblSwiftCode",
                "lblIBANNo": "lblIBANNo",
                "lblBankDetailsTitle": "lblBankDetailsTitle",
                "lblRoutingNumberValue": "lblRoutingNumberValue",
                "lblIBANNumber": "lblIBANNumber",
                "lblBankAddressValue": "lblBankAddressValue",
                "lblRowSeperator": "lblRowSeperator",
                "flxIcon": "flxIcon",
                "lblIcon": "lblIcon"
            };
            var newRecipients  = [];
			if(context.config === undefined){
				newRecipients = context.recipients;
			} else {
		    newRecipients = context.recipients.slice(context.config.offset, context.config.offset+10);
			}
            var segData = newRecipients.map(function(dataItem) {
                var data = {
                    "lblAccountHolder": kony.i18n.getLocalizedString("i18n.WireTransfer.AccountHolder"),
                    "lblAccountNumberValue": dataItem.payeeName,
                    "lblAccountNumber": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "lblAccountTypeValue": dataItem.accountNumber,
                    "btnAction": {
                        "isVisible": scopeObj.checkVisibilityWithPermission(dataItem),
                        "text": kony.i18n.getLocalizedString("i18n.billPay.BillPayMakeTransfer"),
                        "toolTip": kony.i18n.getLocalizedString("i18n.billPay.BillPayMakeTransfer"),
                        "onClick": scopeObj.onMakeTransferActionClick.bind(scopeObj, dataItem, null),
                        "type": dataItem.wireAccountType
                    },
                    "flxWireTransferMakeTransfersNewSelected": {
                        "height": "50dp",
                        "skin": "sknflxffffffnoborder"
                    },
                    "flxMakeTransferWireTransfersMobileSelectedNew": {
                        "height": "60dp",
                        "skin": "sknflxffffffnoborder"
                    },
                    "flxIdentifier": {
                        "skin": "sknFlxIdentifier",
                        "isVisible": false
                    },
                    "lblIdentifier": {
                        "skin": "sknffffff15pxolbfonticons"
                    },
                    "flxIcon": {
                        //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                        "isVisible": applicationManager.getUserPreferencesManager().profileAccess === "both" ? true : false
                    },
                    "lblIcon": {
                        //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                        "isVisible": false,//applicationManager.getUserPreferencesManager().profileAccess === "both" ? true : false,
                        "text": dataItem.isBusinessPayee === "1" ? "r" : "s"
                    },
                    "lblDropdown": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                    "lblAccountName": dataItem.payeeNickName === null ? dataItem.payeeName : dataItem.payeeNickName,
                    "lblAccountType": dataItem.wireAccountType,
                    "lblBankName": dataItem.bankName,
                    "lblSeparator": {
                        "text": ".",
                        "isVisible": false
                    },
                    "lblBankDetailsTitle": "",
                    "lblBankAddressValue": "",
                    "lblSwiftCode": kony.i18n.getLocalizedString("i18n.transfers.bankDetails"),
                    "lblRoutingNumberValue": scopeObj.returnBankAddress(dataItem),
                    "template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxMakeTransferWireTransfersMobileSelectedNew" : "flxWireTransferMakeTransfersNewSelected",
                };
                if (dataItem.wireAccountType === applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) {
                    accountSpecificData = {
                        "lblRoutingNumber": kony.i18n.getLocalizedString("i18n.accounts.routingNumber"),
                        "lblAddedOnValue": dataItem.routingCode,
                        "lblIBANNo": "",
                        "lblIBANNumber": ""
                    };
                } else {
                    accountSpecificData = {
                        "lblRoutingNumber": (IBANUtils.isCountrySupportsIBAN(dataItem.country)) ? kony.i18n.getLocalizedString("i18n.WireTransfer.IBAN") : kony.i18n.getLocalizedString("i18n.wireTransfer.IRC"),
                        "lblAddedOnValue": (IBANUtils.isCountrySupportsIBAN(dataItem.country)) ? dataItem.IBAN : dataItem.internationalRoutingCode,
                        "lblIBANNo": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                        "lblIBANNumber": dataItem.swiftCode
                    };
                }
                var dataKeys = Object.keys(accountSpecificData);
                dataKeys.forEach(function(key) {
                    data[key] = accountSpecificData[key];
                });
                return data;
            });
            var presentationController = this.getWireTransferModule().presentationController;
            this.view.segWireTransfers.widgetDataMap = MakeTransferData;
            if (break_point == 640) {
                for (var i = 0; i < segData.length; i++) {
                    segData[i].template = "flxMakeTransferWireTransfersMobileSelectedNew";
                }
            }
            if (segData.length == 1)
                segData[0].lblSeparator.isVisible = true;
            this.view.segWireTransfers.setData(segData);
            var showPagination = context.searchString === "" || context.searchString === null || context.searchString === undefined;
            if (showPagination) {
                if(context.config.limit > 10){
					context.config.limit = 10;
				}
                this.updatePaginationValue(context.config, "i18n.transfers.external_accounts", presentationController.getNextMakeTransferRecipients.bind(presentationController), presentationController.getPrevioustMakeTransferRecipients.bind(presentationController));
            } else {
                this.view.tablePagination.setVisibility(false);
            }
            FormControllerUtility.setSortingHandlers(sortMap, this.makeTransferRecipientsSortingHandler.bind(this), this);
            FormControllerUtility.updateSortFlex(sortMap, context.config);
            this.configureSearch(context.searchString, this.searchForRecords.bind(this));
            this.view.forceLayout();
            //this.AdjustScreen();
        },
        checkVisibilityWithPermission: function(recipient) {
            if (recipient.wireAccountType === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC)
                return this.checkUserPermission("DOMESTIC_WIRE_TRANSFER_CREATE");
            else
                return this.checkUserPermission("INTERNATIONAL_WIRE_TRANSFER_CREATE");
        },
        getWireTransferModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },
        resetUI: function() {
            this.view.flxPrint.setVisibility(false);
            this.view.flxDownload.setVisibility(false);
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.rtxDowntimeWarning.setVisibility(false);
            this.view.tablePagination.setVisibility(false);
            this.view.flxNoRecipients.setVisibility(false);
        },
        showNoRecipientsScreen: function() {
            this.resetUI();
            this.view.flxNoRecipients.setVisibility(true);
            this.view.flxSearch.setVisibility(false);
            this.view.flxWireTransfersWindow.setVisibility(false);
            this.view.btnSendMoney.onClick = this.onAddAccount.bind(this);
            this.view.btnRequestMoney.onClick = this.onOneTimeTransferActionClick.bind(this);
            this.view.forceLayout();
            //this.showRightBar("noRecipient");
        },
        onAddAccount: function() {
            if ((this.checkUserPermission("DOMESTIC_WIRE_TRANSFER_CREATE_RECEPIENT") === true) || ((this.checkUserPermission("DOMESTIC_WIRE_TRANSFER_CREATE_RECEPIENT") === true) && (this.checkUserPermission("INTERNATIONAL_WIRE_TRANSFER_CREATE_RECEPIENT") === true))) {
                this.getWireTransferModule().presentationController.showWireTransferAddRecipientStep1({
                    landingPageView: "addRecipient"
                });
            } else if (this.checkUserPermission("INTERNATIONAL_WIRE_TRANSFER_CREATE_RECEPIENT") === true) {
                this.getWireTransferModule().presentationController.showWireTransferInternationalStep1({
                    landingPageView: "addRecipientInternational"
                });
            }
        },
        onOneTimeTransferActionClick: function() {
            this.getWireTransferModule().presentationController.showOneTimeWireTransfer({
                landingPageView: "oneTimeTransfer"
            })
        },
        /**
         * Called on Click of Make Transfer Tab
         */
        onMakeTransferTabClick: function() {
            this.view.flxNoTransactions.setVisibility(false);
            this.getWireTransferModule().presentationController.showMakeTransferRecipientList();
            //this.view.Search.txtSearch.setFocus(true);
        },
        /**
         * Called on Click of Recent Tab
         */
        onManageTabClick: function() {
            this.getWireTransferModule().presentationController.showManageRecipientList();
            //this.view.Search.txtSearch.setFocus(true);
        },
        /**
         * Called on Click of Recent Tab
         */
        onRecentTabClick: function() {
            this.getWireTransferModule().presentationController.showRecentTransactions();
            //this.view.Search.txtSearch.setFocus(true);
        },
        showMakeTransferTabUI: function() {
            this.resetUI();
            this.view.flxWireTransfersWindow.setVisibility(true);
            this.view.btnMakeTransfer.skin = "sknBtnAccountSummarySelected";
            this.view.btnRecent.skin = "sknBtnAccountSummaryUnselected";
            this.view.btnManageRecipient.skin = "sknBtnAccountSummaryUnselected";
            this.view.btnBulkTransferFiles.skin = "sknBtnAccountSummaryUnselected";
            this.view.segWireTransfers.setVisibility(true);
            this.view.flxTabsSeperator4.setVisibility(false);
            this.view.flxSortMakeTransfers.setVisibility(true);
            this.view.flxSortRecent.setVisibility(false);
            this.view.flxSearchImage.setVisibility(true);
            this.view.flxTermsAndConditions.setVisibility(true);
            //this.showRightBar("WireTransfersWindow");
        },
        onCancel: function() {
            this.onMakeTransferTabClick();
        },
        onMakeTransferActionClick: function(payeeObject, transactionObject, rowHistory) {
            if (typeof rowHistory === "number") {
                this.setExpandedRow(rowHistory)
            }
            this.getWireTransferModule().presentationController.showMakeTransferForPayee(payeeObject, transactionObject, this.onCancel);
        },
        setExpandedRow: function(rowIndex) {
            this.expandedRow = rowIndex;
        },
        showExpandedRow: function(segment, expandedTemplate, expandedMobileTemplate) {
            if (this.expandedRow !== null && this.expandedRow !== undefined && typeof this.expandedRow === "number") {
                var data = this.view.segWireTransfers.data[this.expandedRow];
                data.lblDropdown = "P";
                data.template = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? expandedMobileTemplate : expandedTemplate;
                segment.setDataAt(data, this.expandedRow)
                this.expandedRow = null;
            }
        },
        setSegmentButtonsBasedOnEntitlements: function(data) {
            var height = 13;
            if (data.type === applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) {
                if (this.checkUserPermission("DOMESTIC_WIRE_TRANSFER_CREATE")) {
                    data.skin = "sknBtnSSP0273e313Px";
                    return data;
                } else {
                    data.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(height);
                    data.onClick = function() {};
                    return data;
                }
            } else {
                if (this.checkUserPermission("INTERNATIONAL_WIRE_TRANSFER_CREATE")) {
                    data.skin = "sknBtnSSP0273e313Px";
                    return data;
                } else {
                    data.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(height);
                    data.onClick = function() {};
                    return data;
                }
            }
        },
        configureSearch: function(searchText, onSearch) {
            this.view.flxSearch.setVisibility(true);
            this.view.Search.txtSearch.text = searchText || "";
            this.checkSearchForm();
            this.view.Search.txtSearch.onDone = function() {
                onSearch({
                    searchString: this.view.Search.txtSearch.text.trim()
                });
            }.bind(this);
            this.view.Search.txtSearch.onKeyUp = this.checkSearchForm.bind(this);
            this.view.Search.flxClearBtn.onClick = function() {
                onSearch({
                    searchString: ""
                });
                this.resetSearchForm();
            }.bind(this)
        },
        checkSearchForm: function() {
            if (this.view.Search.txtSearch.text.trim() === "") {
                this.view.Search.flxClearBtn.setVisibility(false);
            } else {
                this.view.Search.flxClearBtn.setVisibility(true);
            }
            this.view.Search.forceLayout();
        },
        resetSearchForm: function() {
            this.view.Search.txtSearch.text = "";
        },
        returnBankAddress: function(payeeObject, withName) {
            var strings = [payeeObject.bankAddressLine1, payeeObject.bankAddressLine2, payeeObject.bankCity, payeeObject.bankState, payeeObject.bankZip];
            var address = strings.filter(function(string) {
                if (string) {
                    return true
                };
                return false;
            }).join(', ');
            if (withName) {
                address = [payeeObject.bankName, address].filter(function(string) {
                    if (string) {
                        return true;
                    }
                    return false;
                }).join(', ');
            }
            return address;
        },
         updatePaginationValue: function(values, paginationTextKey, onNext, onPrevious) {
            var paginationComponent = this.view.tablePagination;
            paginationComponent.setVisibility(true);
			var recipientDetails = this.getWireTransferModule().presentationController.getManageRecipientData();
           const lastRecord = Math.min((values.offset + values.limit), recipientDetails.recipients.length);
            paginationComponent.lblPagination.text = (values.offset + 1) + " - " + (values.offset + values.limit) + " " + kony.i18n.getLocalizedString(paginationTextKey);
            if (values.offset!== 0 && values.offset <= recipientDetails.recipients.length-1) {
                paginationComponent.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                paginationComponent.flxPaginationPrevious.setEnabled(true);
                paginationComponent.flxPaginationPrevious.onClick = this.onPrevious.bind(values);
            } else {
                paginationComponent.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                paginationComponent.flxPaginationPrevious.setEnabled(false);
            }
           if (recipientDetails.recipients.length<= 10 || lastRecord > recipientDetails.recipients.length-1) {
                paginationComponent.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                paginationComponent.flxPaginationNext.setEnabled(false);
            } else {
                paginationComponent.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                paginationComponent.flxPaginationNext.setEnabled(true);
                paginationComponent.flxPaginationNext.onClick = this.onNext.bind(values);
            }
        },
		
		onPrevious: function(values){
			var recipientDetails = this.getWireTransferModule().presentationController.getManageRecipientData();
			if(recipientDetails.config.offset < recipientDetails.recipients.length){
				recipientDetails.config.offset = recipientDetails.config.offset - 10;
			}
			this.showMakeTransferRecipients(recipientDetails);
		},
		onNext: function(values){
			var recipientDetails = this.getWireTransferModule().presentationController.getManageRecipientData();
			if(recipientDetails.config.offset < recipientDetails.recipients.length){
				recipientDetails.config.offset = recipientDetails.config.offset + 10;
			}
			this.showMakeTransferRecipients(recipientDetails);
		},
        makeTransferRecipientsSortingHandler: function(event, data) {
            //this.getWireTransferModule().presentationController.showMakeTransferRecipientList(data);
        	var paginationManager = applicationManager.getPaginationManager();
            var params = {};
            var recipientSortConfig = {
                'sortBy': 'nickName',
                'defaultSortBy': 'nickName',
                'order': OLBConstants.ASCENDING_KEY,
                'defaultOrder': OLBConstants.ASCENDING_KEY,
                'offset': OLBConstants.DEFAULT_OFFSET,
                'limit': OLBConstants.PAGING_ROWS_LIMIT
            }
            params = paginationManager.getValues(recipientSortConfig, data);
            this.sortRecordsBasedOnParams(params, data);
        },
        /** Calls when click on Sorting options */
        sortRecordsBasedOnParams: function(sortParam, sortOrder) {
            var sortrecord = [];
            var records = this.getWireTransferModule().presentationController.getManageRecipientData();
            sortrecord.push(records);
            var record = sortrecord[0];
            record.config.sortBy = sortParam.sortBy;
            record.config.offset = 0;
            if (sortParam.sortBy === "nickName") {
                var order = (this.view.imgSortAccountName.src == "sorting.png") ? "ASC" : (this.view.imgSortAccountName.src == "sorting_previous.png") ? "DSC" : "ASC";
                if (order === "ASC") {
                    record.config.order = "asc";
                    record.recipients.sort(function(name1, name2) {
                        if (name1 && name2) return name1.payeeNickName.localeCompare(name2.payeeNickName)
                    })
                }
                if (order === "DSC") {
                    record.config.order = "desc";
                    record.recipients.sort(function(name1, name2) {
                        if (name1 && name2) return name2.payeeNickName.localeCompare(name1.payeeNickName)
                    })
                }
            }
            if (sortParam.sortBy === "bankName") {
                var order = (this.view.imgSortBankName.src == "sorting.png") ? "ASC" : (this.view.imgSortBankName.src == "sorting_previous.png") ? "DSC" : "ASC";
                if (order === "ASC") {
                    record.config.order = "asc";
                    record.recipients.sort(function(name1, name2) {
                        if (name1 && name2) return name1.bankName.localeCompare(name2.bankName)
                    })
                }
                if (order === "DSC") {
                    record.config.order = "desc";
                    record.recipients.sort(function(name1, name2) {
                        if (name1 && name2) return name2.bankName.localeCompare(name1.bankName)
                    })
                }
            }
            this.showMakeTransferRecipients(record);
            FormControllerUtility.hideProgressBar(this.view);
        },
        searchForRecords: function(searchText) {
            var enteredText = searchText.searchString.toLocaleLowerCase();
            var recipientDetails = this.getWireTransferModule().presentationController.getManageRecipientData();
            var recipientRecord = recipientDetails;
            var filteredResponse = {};
            var filteredRecord = [];
            if(enteredText!=""){
                if (recipientRecord.recipients.length > 0) {
                    recipientRecord.recipients.forEach(function(item) {
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
                filteredResponse = {"recipients":filteredRecord,"searchString":enteredText};
            }
            else{
                filteredResponse = recipientRecord;
                filteredResponse.config.offset = 0;
            }
            this.showMakeTransferRecipients(filteredResponse);
            FormControllerUtility.hideProgressBar(this.view);
        },
        onBulkTransferFilesTabClick: function() {
            var presentationController = this.getWireTransferModule().presentationController;
            presentationController.navigateToBulkTransferFiles();
        },

        initializeCombinedUsersActions: function(context) {

            if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
                var presentationController = this.getWireTransferModule().presentationController;
                var onSearch = presentationController.showMakeTransferRecipientList.bind(presentationController);
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.flxFiltersList.setVisibility(false);
                } else {
                    this.view.Search.width = "70%";
                    this.view.flxFiltersList.setVisibility(true);
                    this.view.accountTypesWireTransfersWindow.flxAccountTypesSegment.skin = "sknFlxffffffShadowdddcdcBottomRadius";
                    this.initializeSearchAndFilterActions(onSearch, context.searchString);
                    this.initializeFilterSegments(context);
                    this.onFilterSelection(context);
                }
            } else {
                this.view.flxFiltersList.setVisibility(false);
            }

        },

        /*
         * Method to initialize search and filter actions
         */
        initializeSearchAndFilterActions: function(onSearch, searchText) {
            this.view.Search.txtSearch.text = searchText || "";
            this.view.Search.flxClearBtn.setVisibility(false);
            this.view.Search.flxClearBtn.onClick = function() {
                onSearch({
                    searchString: ""
                });
                this.resetSearchForm();
            }.bind(this);
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.Search.txtSearch.onDone = function() {
                onSearch({
                    searchString: this.view.Search.txtSearch.text.trim()
                });
            }.bind(this);
            this.view.Search.btnConfirm.onClick = function() {
                onSearch({
                    searchString: this.view.Search.txtSearch.text.trim()
                });
            }.bind(this);
            this.view.flxFiltersList.onClick = this.onFiltersBtnClick.bind(this);
            /* this.view.LisiBox1.onSelection = function(eventobject, sectionIndex, rowIndex){     
               this.onFilterSelection(eventobject, sectionIndex, rowIndex, context);
             }.bind(this);*/
        },

        /*
         * Method to add data to filter segment
         */
        initializeFilterSegments: function(context) {
            // this.view.LisiBox1.selectedKeyValue = this.view.LisiBox1.masterData[0];                      
            var data = [{
                    "lblUsers": "All Payees"
                },
                {
                    "lblUsers": "Personal Payees"
                },
                {
                    "lblUsers": "Business Payees"
                }
            ];
            this.view.accountTypesWireTransfersWindow.segAccountTypes.widgetDataMap = {
                "lblUsers": "lblUsers"
            };
            this.view.accountTypesWireTransfersWindow.segAccountTypes.setData(data);
            this.view.lblType.text = this.view.accountTypesWireTransfersWindow.segAccountTypes.data[0].lblUsers;
            this.view.accountTypesWireTransfersWindow.segAccountTypes.onRowClick = function() {
                this.onFilterSelection(context);
            }.bind(this);
        },

        /*
         * Method to process segment ui based on selected filter
         */
        onFilterSelection: function(context) {
            var scopeObj = this;
            accounts = context.recipients;
            var data = scopeObj.getSearchAndFilterData(accounts);
            this.view.accountTypesWireTransfersWindow.setVisibility(false);
            data.recipients = data;
            data.config = context.config;
            data.searchString = context.searchString;
            this.showMakeTransferRecipients(data);
            scopeObj.view.forceLayout();
        },

        onFiltersBtnClick: function() {
            this.view.accountTypesWireTransfersWindow.setVisibility(true);
        },
        /**
         * method used to enable or disable the clear button.
         */
        onTxtSearchKeyUp: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.Search.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.Search.flxClearBtn.setVisibility(true);
            } else {
                scopeObj.view.Search.flxClearBtn.setVisibility(false);
            }
            this.view.Search.flxtxtSearchandClearbtn.forceLayout();
        },

        /**
         * method used to clear search
         */
        onSearchClearBtnClick: function(context) {
            var scopeObj = this;
            accounts = context.recipients;
            scopeObj.view.Search.txtSearch.text = "";
            scopeObj.view.Search.flxClearBtn.setVisibility(false);
            var data = scopeObj.getSearchAndFilterData(accounts);
            data.recipients = data;
            data.searchString = context.searchString;
            data.config = context.config;
            this.showMakeTransferRecipients(data);
        },

        /**
         * method to handle the search account functionality
         */
        onSearchBtnClick: function(context) {
            var scopeObj = this;
            accounts = context.recipients;
            var data = scopeObj.getSearchAndFilterData(accounts);
            data.recipients = data;
            data.config = context.config;
            data.searchString = context.searchString;
            this.showMakeTransferRecipients(data);
            scopeObj.view.forceLayout();
        },

        /**
         * method to get data from search and filter values
         */
        getSearchAndFilterData: function(accounts) {
            var scopeObj = this;
            this.view.lblType.text = this.view.accountTypesWireTransfersWindow.segAccountTypes.selectedRowItems !== null ? this.view.accountTypesWireTransfersWindow.segAccountTypes.selectedRowItems[0].lblUsers : this.view.accountTypesWireTransfersWindow.segAccountTypes.data[0].lblUsers;
            var filterQuery = this.view.lblType.text;
            var searchQuery = scopeObj.view.Search.txtSearch.text.trim();

            if (filterQuery.includes("All Payees")) {
                var accountlist = [];
                accountlist = accounts;
                //all accounts will be shown      
            } else if (filterQuery.includes("Personal Payees")) {
                //        accounts = accounts.filter(accounts.type==="Individual");
                var accountlist = [];
                for (i = 0; i < accounts.length; i++) {
                    if (accounts[i].isBusinessPayee === "0") {
                        accountlist.push(accounts[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                accounts = accountlist;
            } else if (filterQuery.includes("Business Payees")) {
                //accounts = accounts.filter(this.isBusinessAccount);
                var accountlist = [];
                for (i = 0; i < accounts.length; i++) {
                    if (accounts[i].isBusinessPayee === "1") {
                        accountlist.push(accounts[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                accounts = accountlist;
            }

            // var data = scopeObj.getDataWithSections(accounts);
            var data = accounts;

            if (!kony.sdk.isNullOrUndefined(searchQuery) && searchQuery !== "") {
                var rowdata = [];
                for (var i = 0; i < data.length; i++) {
                    if ((data[i].bankName && data[i].bankName.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                        (data[i].payeeName && data[i].payeeName.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                        (data[i].wireAccountType && data[i].wireAccountType.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)) {
                        rowdata = data[i];
                    }
                    if (rowdata.length === 0) {
                        //data[i][1][0].flxAccountsRowWrapper["isVisible"] = false;
                        //data[i][1][0].flxNoResultsFound["isVisible"] = true;
                        data[i].isNoRecords = true;
                        data[i].lblNoResultsFound = {
                            "text": kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound")
                        };
                        var noRecordsData = data[i];
                        data[i] = [];
                        data[i].push(noRecordsData);
                    } else {
                        data[i] = [];
                        data[i] = rowdata;
                    }
                }
            }
            return data;
        },

    };
});