define(['FormControllerUtility', 'CommonUtilities', 'IBANUtils', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, CommonUtilities, IBANUtils, ViewConstants, OLBConstants, CampaignUtility) {
     
    var orientationHandler = new OrientationHandler();
    return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnRecent.onClick = this.onRecentTabClick.bind(this); //Recent - Wire Transfer
            this.view.btnManageRecipient.onClick = this.onManageTabClick.bind(this);
            this.view.btnMakeTransfer.onClick = this.onMakeTransferTabClick.bind(this);
            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point == 640 || orientationHandler.isMobile) {
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
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "History");
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
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.view.wireTransferRightbar.setCallback(this.onCancel);
        },
        getWireTransferModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },
        /**
         * @param {context} context Context for the UI
         */
        updateFormUI: function(context) {
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.wireTransactions) {
                this.getWireTransferModule().presentationController.setwireTransfersTransactions(context.wireTransactions);
                this.showRecentTransactions(context.wireTransactions);
                this.initializeCombinedUsersActions(context.wireTransactions);
            }
            if (context.campaign) {
                CampaignUtility.showCampaign(context.campaign, this.view, "flxMain");
            }
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
        showMakeTransferButton: function() {
            this.view.lblScheduleAPayment.setVisibility(true);
        },
        hideMakeTransferButton: function() {
            this.view.lblScheduleAPayment.setVisibility(false);
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
        /**
         * Called on Click of Make Transfer Tab
         */
        onMakeTransferTabClick: function() {
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
            this.view.flxNoTransactions.setVisibility(false);
            this.view.flxSortRecent.setVisibility(true);
            this.getWireTransferModule().presentationController.showRecentTransactions({
                "searchString": ""
            });
            //this.view.Search.txtSearch.setFocus(true);
        },
        /**
         * Display No Transaction Screen - UI logic
         * @member frmWireTransferController
         * @returns {void} - None
         * @throws {void} - None
         */
        showNoTransactionsScreen: function() {

            if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
                this.showRecentTabUI();
                //this.initializeCombinedUsersActions(context);
                this.view.flxSearch.setVisibility(true);
                this.view.Search.flxClearBtn.setVisibility(true);
                this.view.segWireTransfers.setVisibility(false);
                this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.transfers.noTransactions');
                this.view.flxNoTransactions.setVisibility(true);
                this.view.flxSortRecent.setVisibility(false);
                this.view.tablePagination.setVisibility(false);
                this.view.lblScheduleAPayment.onClick = function() {
                    this.getWireTransferModule().presentationController.showWireTransfer();
                }.bind(this);
                this.view.forceLayout();
            } else {
                this.showRecentTabUI();
                this.view.flxSearch.setVisibility(false);
                this.view.segWireTransfers.setVisibility(false);
                this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.transfers.noTransactions');
                this.view.flxNoTransactions.setVisibility(true);
                this.view.flxSortRecent.setVisibility(false);
                this.view.tablePagination.setVisibility(false);
                this.view.lblScheduleAPayment.onTouchEnd = function() {
                    this.getWireTransferModule().presentationController.showWireTransfer();
                }.bind(this);
                this.view.forceLayout();
            }
        },
        /**
         * UI logic to show recent tab
         */
        showRecentTabUI: function() {
            //this.resetUI();
            //this.view.customheader.customhamburger.activateMenu("WIRE TRANSFER", "History");
            //this.view.lblAddAccountHeading.setVisibility(false);
            this.view.flxWireTransfersWindow.setVisibility(true);
            //this.view.lblAddAccountHeading.text="Wire Transfer";
            //this.view.customheader.lblHeaderMobile.text = this.view.lblAddAccountHeading.text;
            // this.view.breadcrumb.setBreadcrumbData([{
            //     text: kony.i18n.getLocalizedString("i18n.transfers.wireTransfer")
            // }, {
            //     text: kony.i18n.getLocalizedString("i18n.transfers.recent")
            // }]);
            this.view.btnRecent.skin = "sknBtnAccountSummarySelected";
            this.view.btnMakeTransfer.skin = "sknBtnAccountSummaryUnselected";
            this.view.btnManageRecipient.skin = "sknBtnAccountSummaryUnselected";
            this.view.btnBulkTransferFiles.skin = "sknBtnAccountSummaryUnselected";
            //this.showAllSeperatorsWireTransfer();
            this.view.flxTermsAndConditions.setVisibility(true);
            this.view.segWireTransfers.setVisibility(true);
            this.view.flxTabsSeperator4.setVisibility(false);
            this.view.flxTabsSeperator1.setVisibility(false);
            this.view.flxSortMakeTransfers.setVisibility(false);
            this.view.flxSortRecent.setVisibility(true);
            this.view.flxSearchImage.setVisibility(false);
            //this.showRightBar("WireTransfersWindow");
        },
        /**
         * @param {object} data Data of the row
         * Configure the segment action buttons based on entitlements
         * @returns {Object} Returns the segment data for button
         */
        setSegmentButtonsBasedOnEntitlements: function(data) {
            var height = 13;
            if (data.type === applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) {
                if (applicationManager.getConfigurationManager().isDomesticWireTransferEnabled === "true") {
                    data.skin = "sknBtnSSP0273e313Px";
                    return data;
                } else {
                    data.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(height);
                    data.onClick = function() {};
                    return data;
                }
            } else {
                if (applicationManager.getConfigurationManager().isInternationalWireTransferEnabled === "true") {
                    data.skin = "sknBtnSSP0273e313Px";
                    return data;
                } else {
                    data.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(height);
                    data.onClick = function() {};
                    return data;
                }
            }
        },
        onCancel: function() {
            this.onRecentTabClick();
        },
        onMakeTransferActionClick: function(payeeObject, transactionObject, rowHistory) {
            if (typeof rowHistory === "number") {
                this.setExpandedRow(rowHistory)
            }
            payeeObject = this.returnPayeeObject(payeeObject, transactionObject);
            this.getWireTransferModule().presentationController.showMakeTransferForPayee(payeeObject, transactionObject, this.onCancel);
        },
        returnPayeeObject: function (recipientsData, transaction) {
            var key = transaction.payeeId;
            for (var index = 0; index < recipientsData.length; index++) {
                if (recipientsData[index].payeeId === key) return recipientsData[index];
            }
            return false;
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
        /**
         * Return currency symbol corresponding to currency name
         * @param {Array} data -currency masterdata
         * @param {string} value -value for which currency name need to be searched
         * @returns {string} Currency Symbol
         */
        returnCurrencySymbolFromValue: function(data, value) {
            var currObj = data.filter(function(item) {
                if (item.name === value) {
                    return true;
                }
                return false;
            });
            return data[0].symbol;
        },
        /**
         * Get standard currencies name with their symbols
         * @returns {objetc[]} - array of JSONs with currency name and symbol
         */
        getCurrency: function() {
            return applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.CURRENCIES;
        },
        /**
         * Recent Transaction Sorting Handler
         */
        recentTransactionSortingHandler: function(event, data) {
            //this.getWireTransferModule().presentationController.showRecentTransactions(data);
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
            var records = this.getWireTransferModule().presentationController.getwireTransfersTransactions();
            sortrecord.push(records);
            var record = sortrecord[0];
            record.config.sortBy = sortParam.sortBy;
            record.config.offset = 0;
            var records = record.transactions.Transactions;
            if (sortParam.sortBy === "nickName") {
                var order = (this.view.imgSortSentTo.src == "sorting.png") ? "ASC" : (this.view.imgSortSentTo.src == "sorting_previous.png") ? "DSC" : "ASC";
                if (order === "ASC") {
                    record.config.order = "asc";
                    records.sort(function(name1, name2) {
                        if (name1 && name2) return name1.payeeNickName.localeCompare(name2.payeeNickName)
                    })
                }
                if (order === "DSC") {
                    record.config.order = "desc";
                    records.sort(function(name1, name2) {
                        if (name1 && name2) return name2.payeeNickName.localeCompare(name1.payeeNickName)
                    })
                }
            }
            if (sortParam.sortBy === "transactionDate") {
                var order = (this.view.imgSortDate.src == "sorting.png") ? "ASC" : (this.view.imgSortDate.src == "sorting_previous.png") ? "DSC" : "ASC";
                if (order === "ASC") {
                    record.config.order = "asc";
                    records.sort(function(name1, name2) {
                        if (name1 && name2) return CommonUtilities.getFrontendDateString(name1.transactionDate).localeCompare(CommonUtilities.getFrontendDateString(name2.transactionDate))
                    })
                }
                if (order === "DSC") {
                    record.config.order = "desc";
                    records.sort(function(name1, name2) {
                        if (name1 && name2) return CommonUtilities.getFrontendDateString(name2.transactionDate).localeCompare(CommonUtilities.getFrontendDateString(name1.transactionDate))
                    })
                }
            }
           if (sortParam.sortBy === "amount") {
                var order = (this.view.imgSortType.src == "sorting.png") ? "ASC" : (this.view.imgSortType.src == "sorting_previous.png") ? "DSC" : "ASC";
                if (order === "ASC") {
                    record.config.order = "asc";
                    records.sort(function(name1, name2) {
                        if (name1 && name2) return (name1.amount).localeCompare(name2.amount)
                    })
                }
                if (order === "DSC") {
                    record.config.order = "desc";
                    records.sort(function(name1, name2) {
                        if (name1 && name2) return name2.amount.localeCompare(name1.amount)
                    })
                }
            }
            this.showRecentTransactions(record);
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         * Bind segment data for Recent tab
         * @param {Transaction[]} transactions Array of transaction Object
         * @param {object} config Searching|Sorting|Pagination Config
         */
        showRecentTransactions: function(context) {
            var recipientsData = context.wiretransferRecipient;
            if (context.transactions.Transactions.length === 0) {
                this.showNoTransactionsScreen(context);
                return;
            }
			this.view.flxNoTransactions.setVisibility(false);
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            this.showRecentTabUI();
            var sortMap = [{
                    name: 'transactionDate',
                    imageFlx: this.view.imgSortDate,
                    clickContainer: this.view.flxSortDate
                },
                {
                    name: 'nickName',
                    imageFlx: this.view.imgSortSentTo,
                    clickContainer: this.view.flxSortSentTo
                },
                {
                    name: 'amount',
                    imageFlx: this.view.imgSortType,
                    clickContainer: this.view.flxSortAmount
                }
            ];
            var scopeObj = this;
            var break_point = kony.application.getCurrentBreakpoint();
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA", "moduleName": "AccountsUIModule"});
            var widgetDataMap = {
                "CopylblSeparator0dc0066e561ec4f": "CopylblSeparator0dc0066e561ec4f",
                "btnAction": "btnAction",
                "btnCancel1": "btnCancel1",
                "btnCancel2": "btnCancel2",
                "btnDownloadReport": "btnDownloadReport",
                "btnRepeat": "btnRepeat",
                "flxActions": "flxActions",
                "flxAmount": "flxAmount",
                "flxCurrency": "flxCurrency",
                "flxDate": "flxDate",
                "flxDetail": "flxDetail",
                "flxDropdown": "flxDropdown",
                "flxFromAccountTitle": "flxFromAccountTitle",
                "flxFromAccountValue": "flxFromAccountValue",
                "flxIdentifier": "flxIdentifier",
                "flxNoteTitle": "flxNoteTitle",
                "flxNoteValue": "flxNoteValue",
                "flxRecentTransfers": "flxRecentTransfers",
                "flxRecentTransfersNewSelected": "flxRecentTransfersNewSelected",
                "flxRecentsWireTransfersMobileSelectedNew": "flxRecentsWireTransfersMobileSelectedNew",
                "flxRecurrenceTitle": "flxRecurrenceTitle",
                "flxRecurrenceValue": "flxRecurrenceValue",
                "flxReferenceNumberTitle": "flxReferenceNumberTitle",
                "flxReferenceNumberValue": "flxReferenceNumberValue",
                "flxRow": "flxRow",
                "flxRowFour": "flxRowFour",
                "flxRowOne": "flxRowOne",
                "flxRowThree": "flxRowThree",
                "flxRowTwo": "flxRowTwo",
                "flxSelectedRowWrapper": "flxSelectedRowWrapper",
                "flxSendTo": "flxSendTo",
                "flxStatusTitle": "flxStatusTitle",
                "flxStatusValue": "flxStatusValue",
                "flxTransactionFee": "flxTransactionFee",
                "imgDropdown": "imgDropdown",
                "lblAmount": "lblAmount",
                "lblCurrencyTitle": "lblCurrencyTitle",
                "lblCurrencyValue": "lblCurrencyValue",
                "lblDate": "lblDate",
                "lblDropdown": "lblDropdown",
                "lblFromAccountTitle": "lblFromAccountTitle",
                "lblFromAccountValue": "lblFromAccountValue",
                "lblFromAccountValuemod": "lblFromAccountValuemod",
                "lblIdentifier": "lblIdentifier",
                "lblNoteTitle": "lblNoteTitle",
                "lblNoteValue": "lblNoteValue",
                "lblNoteValuemod": "lblNoteValuemod",
                "lblRecurrenceTitle": "lblRecurrenceTitle",
                "lblRecurrenceValue": "lblRecurrenceValue",
                "lblRecurrenceValuemod": "lblRecurrenceValuemod",
                "lblReferenceNumberTitle": "lblReferenceNumberTitle",
                "lblReferenceNumberValue": "lblReferenceNumberValue",
                "lblReferenceNumberValuemod": "lblReferenceNumberValuemod",
                "lblTransferCurrencyValue": "lblTransferCurrencyValue",
                "lblRowSeperator": "lblRowSeperator",
                "lblSendTo": "lblSendTo",
                "lblSeparator": "lblSeparator",
                "lblStatusTitle": "lblStatusTitle",
                "lblStatusValue": "lblStatusValue",
                "lblStatusValuemod": "lblStatusValuemod",
                "lblTransactionFeeTitle": "lblTransactionFeeTitle",
                "lblTransactionFeeValue": "lblTransactionFeeValue",
                "lblTransferCurrencyTitle": "lblTransferCurrencyTitle",
                "lblAmountRecieved": "lblAmountRecieved",
                "lblReceivedValue": "lblReceivedValue",
                "lblFromIcon": "lblFromIcon",
                "lblSendIcon": "lblSendIcon"
            };
            var newTransactions  = [];
			if(context.config === undefined){
				newTransactions = context.transactions;
			} else {
                var transactions = context.transactions.Transactions ? context.transactions.Transactions : context.transactions;
                newTransactions = transactions.slice(context.config.offset, context.config.offset + 10);
			}
            var data = newTransactions.map(function(dataItem) {
                return {

                    "btnDownloadReport": {
                        "isVisible": false
                    },
                    "flxActions": {
                        "isVisible": false
                    },

                    "btnAction": {
                        "isVisible": scopeObj.checkVisibilityWithPermission(dataItem, recipientsData),
                        "text": kony.i18n.getLocalizedString("i18n.accounts.repeat"),
                        "toolTip": kony.i18n.getLocalizedString("i18n.common.repeatThisTransaction"),
                        "onClick": scopeObj.onMakeTransferActionClick.bind(this, recipientsData, dataItem),
                        "type": dataItem.wireAccountType
                    },
                    "btnRepeat": {
                        "isVisible": scopeObj.checkVisibilityWithPermission(dataItem, recipientsData),
                        "text": kony.i18n.getLocalizedString("i18n.accounts.repeat"),
                        "toolTip": kony.i18n.getLocalizedString("i18n.common.repeatThisTransaction"),
                        "onClick": scopeObj.onMakeTransferActionClick.bind(this, recipientsData, dataItem),
                        "width": "100%",
                        "type": dataItem.wireAccountType
                    },
                    "flxRecentTransfersNewSelected": {
                        "height": "50dp",
                        "skin": "sknflxffffffnoborder"
                    },
                    "flxRecentsWireTransfersMobileSelectedNew": {
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
                    "lblDropdown": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                    "lblDate": CommonUtilities.getFrontendDateString(dataItem.transactionDate),
                    "lblSendTo": dataItem.payeeNickName ? dataItem.payeeNickName : dataItem.payeeName,
                    "lblAmount": CommonUtilities.formatCurrencyWithCommas(dataItem.amount, false, dataItem.payeeCurrency),
                    "lblFromAccountTitle": kony.i18n.getLocalizedString("i18n.transfers.lblFrom"),
                    "lblReferenceNumberValue": dataItem.transactionId,
                    "lblReferenceNumberTitle": kony.i18n.getLocalizedString('i18n.transfers.RefrenceNumber'),
                    "lblFromAccountValue": CommonUtilities.getAccountDisplayName({
                        name: dataItem.fromAccountName,
                        accountID: dataItem.fromAccountNumber,
                        nickName: dataItem.fromNickName,
                        Account_id: dataItem.fromAccountNumber
                    }),
                    "lblStatusTitle": (dataItem.wireAccountType === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) ? kony.i18n.getLocalizedString('i18n.accounts.routingNumber') : (IBANUtils.isCountrySupportsIBAN(dataItem.country)) ? kony.i18n.getLocalizedString("i18n.WireTransfer.IBAN") : kony.i18n.getLocalizedString("i18n.wireTransfer.IRC"),
                    "lblStatusValue": (dataItem.wireAccountType === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) ? dataItem.routingNumber : (IBANUtils.isCountrySupportsIBAN(dataItem.country)) ? (dataItem.IBAN ? dataItem.IBAN : '') : (dataItem.internationalRoutingCode ? dataItem.internationalRoutingCode : ''),
                    "lblRecurrenceTitle": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "lblRecurrenceValue": dataItem.payeeAccountNumber,
                    "lblCurrencyTitle": kony.i18n.getLocalizedString('i18n.transfers.accountType'),
                    "lblCurrencyValue": dataItem.wireAccountType,
                    "lblTransactionFeeTitle": kony.i18n.getLocalizedString("i18n.transfers.bankDetails"),
                    "lblTransactionFeeValue": scopeObj.returnBankAddress(dataItem),
                    "lblSeparator": ".",
                    "lblRowSeperator": ".",
                    "lblNoteTitle": kony.i18n.getLocalizedString("i18n.WireTransfer.TransactionFee"),
                    "lblTransferCurrencyTitle": {
                        "isVisible": true,
                        "text": kony.i18n.getLocalizedString("i18n.WireTransfer.TransferCurrency")
                    },
                    "lblAmountRecieved": {
                        "isVisible": true,
                        "text": kony.i18n.getLocalizedString("i18n.WireTransfer.AmountReceived")
                    },
                    "lblNoteValue": CommonUtilities.formatCurrencyWithCommas(dataItem.fee, true),
                    "lblTransferCurrencyValue": {
                        "isVisible": true,
                        "text": dataItem.payeeCurrency
                    },
                    "lblFromIcon": {
                        //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                        "isVisible": applicationManager.getUserPreferencesManager().profileAccess === "both" ? true : false,
                        "text": accountsModule.presentationController.fetchIsBusinessAccount(dataItem.fromAccountNumber) === "true" ? "r" : "s"
                    },
                    "lblSendIcon": {
                        //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                        "isVisible": false, //applicationManager.getUserPreferencesManager().profileAccess === "both" ? true : false,
                        "text": dataItem.isBusinessPayee === "1" ? "r" : "s"
                    },
                    "lblCurrencySymbol": {
                        "isVisible": true,
                        "text": scopeObj.returnCurrencySymbolFromValue(scopeObj.getCurrency(), dataItem.payeeCurrency)
                    },
                    "lblReceivedValue": {
                        "isVisible": true,
                        "text": CommonUtilities.formatCurrencyWithCommas(dataItem.amountRecieved, true)
                    },
                    "template": (kony.application.getCurrentBreakpoint() === 640) ? "flxRecentsWireTransfersMobileSelectedNew" : "flxRecentTransfersNewSelected"
                }
            });
            this.view.segWireTransfers.widgetDataMap = widgetDataMap;
            this.view.segWireTransfers.setData(data);
            FormControllerUtility.setSortingHandlers(sortMap, this.recentTransactionSortingHandler.bind(this), this);
            FormControllerUtility.updateSortFlex(sortMap, context.config);
            var presentationController = this.getWireTransferModule().presentationController;
        	context.config.limit = 10;
			this.updatePaginationValue(
                context.config,
                "i18n.common.transactions",
                presentationController.getNextWireTransactions.bind(presentationController),
                presentationController.getPreviousWireTransactions.bind(presentationController)
            )
            //this.view.flxSearch.setVisibility(false);
            this.view.forceLayout();
        },
        checkVisibilityWithPermission: function(dataItem, recipientsData) {
            if (this.checkPayeeIdInRecipientData(dataItem, recipientsData)) {
                if (dataItem.wireAccountType === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC)
                    return this.checkUserPermission("DOMESTIC_WIRE_TRANSFER_CREATE");
                else
                    return this.checkUserPermission("INTERNATIONAL_WIRE_TRANSFER_CREATE");
            } else
                return false;
        },

        checkPayeeIdInRecipientData: function(dataItem, recipientsData) {
            var key = dataItem.payeeId;
            for (var index = 0; index < recipientsData.length; index++) {
                if (recipientsData[index].payeeId === key)
                    return true;
            }
            return false;
        },

        updatePaginationValue: function(values, paginationTextKey, onNext, onPrevious) {
            var paginationComponent = this.view.tablePagination;
            paginationComponent.setVisibility(true);
			var recipientDetails = this.getWireTransferModule().presentationController.getwireTransfersTransactions();
            paginationComponent.lblPagination.width ="35%";
            const lastRecord = Math.min((values.offset + values.limit), recipientDetails.transactions.Transactions.length);
            paginationComponent.lblPagination.text = (values.offset + 1) + " - " + lastRecord + " " + kony.i18n.getLocalizedString(paginationTextKey);
            if (values.offset!== 0 && values.offset <= recipientDetails.transactions.Transactions.length-1) {
                paginationComponent.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                paginationComponent.flxPaginationPrevious.setEnabled(true);
                paginationComponent.flxPaginationPrevious.onClick = this.onPrevious.bind(values);
            } else {
                paginationComponent.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                paginationComponent.flxPaginationPrevious.setEnabled(false);
            }
           if (recipientDetails.transactions.Transactions.length<= 10 || lastRecord > recipientDetails.transactions.Transactions.length-1) {
                paginationComponent.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                paginationComponent.flxPaginationNext.setEnabled(false);
            } else {
                paginationComponent.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                paginationComponent.flxPaginationNext.setEnabled(true);
                paginationComponent.flxPaginationNext.onClick = this.onNext.bind(values);
            }
        },
		
		onPrevious: function(values){
			var recipientDetails = this.getWireTransferModule().presentationController.getwireTransfersTransactions();
			if(recipientDetails.config.offset < recipientDetails.transactions.Transactions.length){
				recipientDetails.config.offset = recipientDetails.config.offset - 10;
			}
			this.showRecentTransactions(recipientDetails);
		},
		onNext: function(values){
			var recipientDetails = this.getWireTransferModule().presentationController.getwireTransfersTransactions();
			if(recipientDetails.config.offset < recipientDetails.transactions.Transactions.length){
				recipientDetails.config.offset = recipientDetails.config.offset + 10;
			}
			this.showRecentTransactions(recipientDetails);
		},

        onBulkTransferFilesTabClick: function() {
            var presentationController = this.getWireTransferModule().presentationController;
            presentationController.navigateToBulkTransferFiles();
        },

        /*
         * Method to initialize search and filter actions
         */
        initializeSearchAndFilterActions: function(context, searchText) {
            this.view.Search.txtSearch.text = searchText || "";
            this.view.Search.flxClearBtn.setVisibility(false);
            this.view.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, context);
            this.view.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.Search.txtSearch.onDone = this.onSearchBtnClick.bind(this, context);
            this.view.Search.btnConfirm.onClick = this.onSearchBtnClick.bind(this, context);
            this.view.flxFiltersList.onClick = this.onFiltersBtnClick.bind(this);
            /* this.view.LisiBox1.onSelection = function(eventobject, sectionIndex, rowIndex){     
               this.onFilterSelection(eventobject, sectionIndex, rowIndex, context);
             }.bind(this);*/
        },

        initializeCombinedUsersActions: function(context) {
            if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
                // var presentationController =  this.getWireTransferModule().presentationController;
                // var onSearch =   presentationController.showMakeTransferRecipientList.bind(presentationController);
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.flxFiltersList.setVisibility(false);
                } else {
                    this.view.Search.width = "70%";
                    this.view.flxFiltersList.setVisibility(true);
                    this.view.accountTypesWireTransfersRecent.flxAccountTypesSegment.skin = "sknFlxffffffShadowdddcdcBottomRadius";
                    this.initializeSearchAndFilterActions(context, context.searchString);
                    this.initializeFilterSegments(context);
                    this.onFilterSelection(context);
                }
            } else {
                this.view.flxFiltersList.setVisibility(false);
                this.view.flxSearch.setVisibility(false);
            }

        },

        onFiltersBtnClick: function() {
            this.view.accountTypesWireTransfersRecent.setVisibility(true);
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
            this.view.accountTypesWireTransfersRecent.segAccountTypes.widgetDataMap = {
                "lblUsers": "lblUsers"
            };
            this.view.accountTypesWireTransfersRecent.segAccountTypes.setData(data);
            this.view.lblType.text = this.view.accountTypesWireTransfersRecent.segAccountTypes.data[0].lblUsers;
            this.view.accountTypesWireTransfersRecent.segAccountTypes.onRowClick = function() {
                this.onFilterSelection(context);
            }.bind(this);

        },


        /*
         * Method to process segment ui based on selected filter
         */
        onFilterSelection: function(context) {
            var scopeObj = this;
            accounts = context.transactions;
            var data = scopeObj.getSearchAndFilterData(accounts);
            this.view.accountTypesWireTransfersRecent.setVisibility(false);
            data.transactions = data;
            data.config = context.config;
            data.searchString = context.searchString;
            this.showRecentTransactions(data);
            scopeObj.view.forceLayout();
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
            accounts = context.transactions;
            scopeObj.view.Search.txtSearch.text = "";
            scopeObj.view.Search.flxClearBtn.setVisibility(false);
            /* var data = scopeObj.getSearchAndFilterData(accounts);     
             data.transactions = data;
             data.searchString = context.searchString;
             data.config = context.config;*/
            this.showRecentTransactions(context);
        },

        /**
         * method to handle the search account functionality
         */
        onSearchBtnClick: function(context) {
            var scopeObj = this;
            accounts = context.transactions;
            var data = scopeObj.getSearchAndFilterData(accounts);
            data.transactions = data;
            data.config = context.config;
            data.searchString = context.searchString;
            this.showRecentTransactions(data);
            scopeObj.view.forceLayout();
        },

        /**
         * method to get data from search and filter values
         */
        getSearchAndFilterData: function(accounts) {
            var scopeObj = this;
            this.view.lblType.text = this.view.accountTypesWireTransfersRecent.segAccountTypes.selectedRowItems !== null ? this.view.accountTypesWireTransfersRecent.segAccountTypes.selectedRowItems[0].lblUsers : this.view.accountTypesWireTransfersRecent.segAccountTypes.data[0].lblUsers;
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
                        (data[i].payeeNickName && data[i].payeeNickName.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                        (data[i].wireAccountType && data[i].wireAccountType.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)) {
                        //rowdata = data[i];
                        rowdata.push(data[i]);
                    }
                    if (rowdata.length === 0) {
                        //data[i][1][0].flxAccountsRowWrapper["isVisible"] = false;
                        //data[i][1][0].flxNoResultsFound["isVisible"] = true;
                        /*data[i].isNoRecords = true;
                        data[i].lblNoResultsFound= {
                          "text": kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound")
                        };
                        var noRecordsData = data[i];
                        data[i] = [];
                        data[i].push(noRecordsData);*/
                    }
                    /*else{
                      data[i] = [];
                      data[i] = rowdata;
                    }*/
                }
                data = rowdata
            }
            return data;
        },

    };
});