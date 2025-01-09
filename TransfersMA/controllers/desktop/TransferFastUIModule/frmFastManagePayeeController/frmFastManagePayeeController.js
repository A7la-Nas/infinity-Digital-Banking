/************************************************************************************************/
define(['commonUtilities', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function (commonUtilities, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
     
    var entryState = {};
    return {
        profileAccess: "",
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            var scopeObj = this;
            scopeObj.offset = OLBConstants.DEFAULT_OFFSET;
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            scopeObj.view.btnExternalAccounts.toolTip = kony.i18n.getLocalizedString('i18n.topmenu.accounts');
            scopeObj.view.btnRecipients.toolTip = kony.i18n.getLocalizedString('i18n.p2p.PayAPerson');
            //External Accounts
            scopeObj.externalAccountsSortMap = [{
                name: 'beneficiaryName',
                imageFlx: scopeObj.view.imgSortDateExternal,
                clickContainer: scopeObj.view.flxSortDateExternal
            }, {
                name: 'bankName',
                imageFlx: scopeObj.view.imgSortDescriptionExternal,
                clickContainer: scopeObj.view.flxSortDescriptionExternal
            }, {
                name: 'isVerified',
                imageFlx: scopeObj.view.imgSortTypeExternal,
                clickContainer: scopeObj.view.flxSortAmountExternal
            }];
            scopeObj.manageRecipientSortMap = [{
                name: 'name',
                imageFlx: scopeObj.view.imgSortName,
                clickContainer: scopeObj.view.flxName
            }];
            FormControllerUtility.setSortingHandlers(scopeObj.externalAccountsSortMap, scopeObj.onExternalAccountsSortClickHandler, scopeObj);
            this.view.lblAddBankAccount.toolTip = kony.i18n.getLocalizedString('i18n.FastTransfers.AddDBXAccount');
            this.view.lblAddKonyAccount.toolTip = kony.i18n.getLocalizedString('i18n.FastTransfers.AddExternalAccount');
            this.view.lblAddInternationalAccount.toolTip = kony.i18n.getLocalizedString('i18n.FastTransfers.AddInternationalAccount');
            this.view.lblAddNonKonyAccount.toolTip = kony.i18n.getLocalizedString('i18n.FastTransfers.AddPersonToPersonRecipient');
            this.view.lblViewP2PSettings.toolTip = kony.i18n.getLocalizedString('i18n.FastTransfers.ViewPersonToPersonSettings');
            this.view.lblDeactivateP2P.toolTip = kony.i18n.getLocalizedString('i18n.FastTransfers.DeactivatePersonToPerson');
            this.view.flxAddBankAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addDBXAccount"
                });
            }
            this.view.flxAddKonyAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addExternalAccount"
                });
            }
            this.view.flxAddInternationalAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addInternationalAccount"
                });
            }
            this.view.flxAddReciepient.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addRecipient"
                });
            }
            this.view.flxViewP2PSettings.onClick = function () {
                scopeObj.transfersFastPresentationController.fetchP2PdataSettings(kony.application.getCurrentForm().id);
            }
            this.view.flxDeactivateP2P.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    deactivateRecipient: true
                });
            }
            if (kony.application.getCurrentBreakpoint() == 640) {
                scopeObj.view.Search.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.billpay.SearchMessageMobile");
            } else {
                scopeObj.view.Search.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.billPay.SearchMessage");
            }
        },
        addInfinityBankAccount: function () {
            this.transfersFastPresentationController.showTransferScreen({
                initialView: "addDBXAccount"
            });
        },
        addExternalAccount: function () {
            this.transfersFastPresentationController.showTransferScreen({
                initialView: "addExternalAccount"
            });
        },
        addInternationalAccount: function () {
            this.transfersFastPresentationController.showTransferScreen({
                initialView: "addInternationalAccount"
            });
        },
        addPersonToPersonRecipient: function () {
            this.transfersFastPresentationController.showTransferScreen({
                initialView: "addRecipient"
            });
        },
        viewP2PSettings: function () {
            this.transfersFastPresentationController.fetchP2PdataSettings(kony.application.getCurrentForm().id);
        },
        deactivateP2PSettings: function () {
            this.transfersFastPresentationController.showTransferScreen({
                deactivateRecipient: true
            });
        },
        onNavigate: function (context) {
            if (context) {
                if (context.refreshComponent !== undefined) {
                    entryState.refreshComponent = context.refreshComponent;
                } else entryState.refreshComponent = "";
                if (context.showPreviousTab !== undefined) {
                    entryState.showPreviousTab = context.showPreviousTab;
                } else entryState.showPreviousTab = "";
                entryState.activeTab = context.activeTab || '';
            } else entryState = {};
        },
        preShow: function () {
            var scope = this;
            var params = {};
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            var tokenParams = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.security_attributes;
            var isCombinedUser = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes.isCombinedUser;
            params.entitlement = {};
            if (Object.keys(entryState).length > 0) {
                params.entryState = {};
                params.entryState = entryState;
            }
            params.isCombinedUser = isCombinedUser;
            params.entitlement.features = JSON.parse(tokenParams.features);
            params.entitlement.permissions = JSON.parse(tokenParams.permissions);
            var paginationDetails = this.view.pagination.getDefaultOffsetAndLimit();
            this.view.pagination.fetchPaginatedRecords = this.fetchPaginatedRecords;
            this.view.pagination.onError = this.onError;
            this.view.BeneficiaryList.updatePaginationBar = this.updatePaginationBar;
            this.view.BeneficiaryList.onResetPagination = this.onResetPagination;
            //params.tabSelected = selectedTab;
            // params.defaultFilter = "All";
            params.offset = paginationDetails.offset;
            params.limit = paginationDetails.limit;
            this.view.BeneficiaryList.showPagination = this.showPagination;
            this.view.BeneficiaryList.hidePagination = this.hidePagination;
            this.view.BeneficiaryList.setParentScope(scope);
            this.view.BeneficiaryList.setContext(params);
            this.view.BeneficiaryList.onError = this.onError;
            this.view.quicklinks.setParentScopeAndEntitlements(scope, params.entitlement);
            this.view.quicklinks.onError = this.onError;
            this.view.quicklinksP2P.setParentScopeAndEntitlements(scope, params.entitlement);
            this.view.quicklinksP2P.onError = this.onError;
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Fast Transfers");
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "External Accounts");
            this.view.btnExternalAccounts.onClick = this.getExternalAccounts.bind(this);
            this.view.btnRecipients.onClick = this.showRecipientsData.bind(this);
            CampaignUtility.fetchPopupCampaigns();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxMain', 'flxFooter']);
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.doLayout = commonUtilities.centerPopupFlex;
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxLogout.isVisible = false;
                    self.view.flxDialogs.isVisible = false;
                    self.view.customheadernew.btnLogout.setFocus(true);
            }}
        },
        hideQuicklinks2: function () {
            this.view.quicklinksP2P.isVisible = false;
        },
        showQuicklinks2: function () {
            if (kony.application.getCurrentBreakpoint() >= 1366) {
                this.view.quicklinksP2P.isVisible = true;
            }
        },
        onAccountsSendMoney: function (selectedData) {
            var accountTo = {
                accountTo: selectedData.accountNumber,
                Id: selectedData.Id,
                displayName: selectedData.beneficiaryName
            };
            this.transfersFastPresentationController.showTransferScreen(accountTo);
        },
        onAccountsViewActivity: function (selectedData) {
            this.transfersFastPresentationController.showSelectedAccountTransactions({
                "beneficiaryId": selectedData.Id,
                "accountNumber": selectedData.accountNumber,
                "accountName": selectedData.beneficiaryName,
                "onCallbackManagerPayee": function () {
                    applicationManager.getNavigationManager().navigateTo("frmFastManagePayee", undefined, {
                        "refreshComponent": false,
                        "showPreviousTab": true
                    });
                }
            });
        },
        onAddRecipient: function () {
            this.transfersFastPresentationController.showTransferScreen({
                showRecipientGateway: true
            });
        },
        onError: function (err) {
            kony.application.dismissLoadingScreen();
           kony.print(JSON.stringify(err));
        },
        p2pSendMoney: function (selectedData) {
            var self = this;
            self.transfersFastPresentationController.showTransferScreen({
                accountTo: selectedData.PayPersonId,
                displayName: selectedData.name
            });
        },
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.view.customheadernew.imgKonyHamburger.src="kony_logo.png";
        },
        showInternalAccFlx: function () {
            this.view.flxAddBankAccount.setVisibility(true);
        },
        hideInternalAccFlx: function () {
            this.view.flxAddBankAccount.setVisibility(false);
        },
        showExternalAccFlx: function () {
            this.view.flxAddKonyAccount.setVisibility(true);
        },
        hideExternalAccFlx: function () {
            this.view.flxAddKonyAccount.setVisibility(false);
        },
        showInternationalAccFlx: function () {
            this.view.flxAddInternationalAccount.setVisibility(true);
        },
        hideInternationalAccFlx: function () {
            this.view.flxAddInternationalAccount.setVisibility(false);
        },
        showP2PAccFlx: function () {
            this.view.btnRecipients.setVisibility(true);
        },
        hideP2PAccFlx: function () {
            this.view.btnRecipients.setVisibility(false);
        },
        showP2PManageSettingFlx: function () {
            this.view.flxViewP2PSettings.setVisibility(true);
        },
        hideP2PManageSettingFlx: function () {
            this.view.flxViewP2PSettings.setVisibility(false);
        },
        showP2PDeactivateFlx: function () {
            this.view.flxDeactivateP2P.setVisibility(true);
        },
        hideP2PDeactivateFlx: function () {
            this.view.flxDeactivateP2P.setVisibility(false);
        },
        showAddP2PFlx: function () {
            var payApersonEligibility = applicationManager.getUserPreferencesManager().checkP2PEligibilityForUser();
            if (payApersonEligibility !== 'Activated' && !applicationManager.getConfigurationManager().checkUserPermission("P2P_ACTIVATE")) {
                this.view.flxAddReciepient.setVisibility(false);
            } else {
                this.view.flxAddReciepient.setVisibility(true);
            }
        },
        hideAddP2PFlx: function () {
            this.view.flxAddReciepient.setVisibility(false);
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent();
            this.view.customfooternew.onBreakpointChangeComponent();
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopup1.onBreakpointChangeComponent(scope.view.CustomPopup1, width);
        },
        /**
         * Clear the search text box
         */
        clearSearchText: function () {
            this.prevSearchText = '';
            this.view.flxSearch.Search.txtSearch.text = '';
            this.prevRecipientsSearchText = '';
            this.view.flxRecipientsSearch.Search1.txtSearch.text = '';
            this.disableRecipientSearch();
            this.disableSearch();
            this.view.forceLayout();
        },
        /**
         * used to get the show Recipients
         */
        showRecipientsData: function () {
            var scopeObj = this;
            scopeObj.clearSearchText();
            scopeObj.view.btnRecipients.onClick = scopeObj.transfersFastPresentationController.showRecipients();
        },
        /**
         * used to get the external accounts
         */
        getExternalAccounts: function () {
            var scopeObj = this;
            scopeObj.clearSearchText();
            scopeObj.view.btnExternalAccounts.onClick = scopeObj.transfersFastPresentationController.showExternalAccounts();
        },
        /** Manages the upcomming flow
         * @param  {object} viewModel object consisting data based on which new flow has to drive
         */
        updateFormUI: function (viewModel) {
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            } else {
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.externalAccounts) {
                    this.clearSearchText();
                    this.showExternalAccounts(viewModel.externalAccounts, viewModel.config, viewModel.pagination);
                }
                if (viewModel.viewSelectedExternalAccount) {
                    this.showSelectedExternalAccount(viewModel.viewSelectedExternalAccount);
                }
                if (viewModel.viewExternalAccountTransactionActivity) {
                    this.showExternalAccountTransactionActivity(viewModel.viewExternalAccountTransactionActivity);
                }
                if (viewModel.searchTransferPayees) {
                    this.showSearchTransferPayees(viewModel.searchTransferPayees);
                }
                if (viewModel.ShowRecipients) {
                    this.clearSearchText();
                    this.setManageRecipientSegmentData(viewModel.ShowRecipients, viewModel.pagination);
                    FormControllerUtility.setSortingHandlers(this.manageRecipientSortMap, this.onMangeRecipientSortClickHandler, this);
                    FormControllerUtility.updateSortFlex(this.manageRecipientSortMap, viewModel.pagination);
                }
                if (viewModel.searchPayAPerson) {
                    this.showSearchRecipients(viewModel.searchPayAPerson);
                }
                if (viewModel.campaign) {
                    CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMain");
                }
            }
            this.view.forceLayout();
        },
        /**
         * This method is used as an onclick handler for manage recipients tab.
         */
        onMangeRecipientSortClickHandler: function (event, data) {
            var scopeObj = this;
            scopeObj.transfersFastPresentationController.showRecipients(data);
        },
        /** On External Account  Sort click handler.
         * @param  {object} event object
         * @param  {object} data New Sorting Data
         */
        onExternalAccountsSortClickHandler: function (event, data) {
            var scopeObj = this;
            scopeObj.first = 0;
            scopeObj.transfersFastPresentationController.showExternalAccounts(data);
        },
        /** On Search is complete show external accounts
         * @param  {array} viewModel Array of recipients
         */
        showSearchTransferPayees: function (viewModel) {
            var scopeObj = this;
            this.view.flxPagination.setVisibility(false);
            if (viewModel.error) {
                scopeObj.showExternalAccounts("errorExternalAccounts");
                return;
            }
            if (viewModel.externalAccounts.length === 0) {
                scopeObj.view.flxSortExternal.setVisibility(true);
                scopeObj.view.segmentTransfers.setVisibility(false);
                scopeObj.view.flxRecipientsSearch.setVisibility(false);
                scopeObj.view.flxNoTransactions.setVisibility(true);
                scopeObj.view.flxNoTransactions.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.transfers.searchNoPayees');
                scopeObj.view.btnAddRecipient.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient");
                scopeObj.view.btnAddRecipient.text = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient");
                scopeObj.view.btnAddRecipient.onClick = function () {
                    scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
                    scopeObj.transfersFastPresentationController.showTransferScreen({
                        showRecipientGateway: true
                    });
                }
                scopeObj.view.forceLayout();
                return;
            }
            scopeObj.showExternalAccounts(viewModel.externalAccounts, viewModel.searchInputs, {}, true);
        },
        /** On Search is complete show recipients
         * @param  {array} viewModel Array of recipients
         */
        showSearchRecipients: function (viewModel) {
            var scopeObj = this;
            this.view.flxPagination.setVisibility(false);
            if (viewModel.error) {
                scopeObj.showExternalAccounts("errorExternalAccounts");
                FormControllerUtility.hideProgressBar(this.view);
                return;
            }
            if (viewModel.payAPersonData.length === 0) {
                scopeObj.view.flxSortExternal.setVisibility(false);
                scopeObj.view.segmentTransfers.setVisibility(false);
                scopeObj.view.flxRecipientsSearch.setVisibility(false);
                scopeObj.view.flxNoTransactions.setVisibility(true);
                scopeObj.view.flxNoTransactions.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.transfers.searchNoPayees');
                scopeObj.view.btnAddRecipient.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient");
                scopeObj.view.btnAddRecipient.text = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient");
                scopeObj.view.btnAddRecipient.onClick = function () {
                    scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
                    scopeObj.transfersFastPresentationController.showTransferScreen({
                        showRecipientGateway: true
                    });
                }
                scopeObj.view.forceLayout();
                FormControllerUtility.hideProgressBar(this.view);
                return;
            }
            this.setManageRecipientSegmentData(viewModel.payAPersonData, {}, true);
        },
        /**
         * used to search the recipients
         */
        onRecipientSearchBtnClick: function () {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxRecipientsSearch.Search1.txtSearch.text.trim();
            scopeObj.transfersFastPresentationController.searchPayAPerson({
                'searchKeyword': searchKeyword
            });
            scopeObj.prevRecipientsSearchText = searchKeyword;
        },
        /** clears the text on search textbox
         */
        onRecipientSearchClearBtnClick: function () {
            var scopeObj = this;
            scopeObj.view.Search1.flxClearBtn.setVisibility(false);
            scopeObj.transfersFastPresentationController.showRecipients();
            //scopeObj.view.flxPagination.setVisibility(true);
            this.prevRecipientsSearchText = '';
            this.view.flxRecipientsSearch.Search1.txtSearch.text = '';
            this.view.forceLayout();
        },
        /** On Search Text Key Up
         * @param  {object} event object
         */
        onRecipientTxtSearchKeyUp: function (event) {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxRecipientsSearch.Search1.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.flxRecipientsSearch.Search1.txtSearch.onDone = scopeObj.onRecipientSearchBtnClick.bind(scopeObj);
                scopeObj.enableRecipientSearch();
            } else {
                scopeObj.view.flxRecipientsSearch.Search1.txtSearch.onDone = function () { };
                scopeObj.disableRecipientSearch();
            }
        },
        /** Searches for a payee */
        onSearchBtnClick: function () {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearch.Search.txtSearch.text.trim();
            if (scopeObj.prevSearchText !== searchKeyword) {
                scopeObj.transfersFastPresentationController.searchTransferPayees({
                    'searchKeyword': searchKeyword
                });
                scopeObj.prevSearchText = searchKeyword;
            }
        },
        /** On Search Text Key Up
         * @param  {object} event object
         */
        onTxtSearchKeyUp: function (event) {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearch.Search.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.flxSearch.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.enableSearch();
            } else {
                scopeObj.view.flxSearch.Search.txtSearch.onDone = function () { };
                scopeObj.disableSearch();
            }
            this.view.flxSearch.forceLayout();
        },
        /**
         * Enables the search
         */
        enableRecipientSearch: function () {
            this.view.flxRecipientsSearch.Search1.flxClearBtn.setVisibility(true);
        },
        /** Disables Search Button
         */
        disableRecipientSearch: function () {
            this.view.flxRecipientsSearch.Search1.flxClearBtn.setVisibility(false);
        },
        /** Disables Search Button
         */
        disableSearch: function () {
            this.view.flxSearch.Search.flxClearBtn.setVisibility(false);
        },
        /** Enable Search Button
         */
        enableSearch: function () {
            this.view.flxSearch.Search.flxClearBtn.setVisibility(true);
        },
        /** clears the text on search textbox
         */
        onSearchClearBtnClick: function () {
            var scopeObj = this;
            scopeObj.view.Search.flxClearBtn.setVisibility(false);
            scopeObj.transfersFastPresentationController.showExternalAccounts();
            //scopeObj.view.flxPagination.setVisibility(true);
            this.prevSearchText = '';
            this.view.flxSearch.Search.txtSearch.text = '';
            this.view.forceLayout();
        },
        /**
         * used to set the Reciepients UI
         */
        setRecipientsUI: function () {
            this.setRecipientRightBar();
            this.view.segmentTransfers.setVisibility(true);
            this.view.flxRecipientsSearch.setVisibility(true);
            this.view.flxNoTransactions.setVisibility(false);
            //this.view.flxPagination.setVisibility(true);
            this.view.flxRecipientsWrapper.setVisibility(true);
            this.view.flxSortExternal.setVisibility(false);
            this.setSkinInActive(this.view.btnExternalAccounts);
            this.setSkinActive(this.view.btnRecipients);
            this.view.btnExternalAccounts.onClick = this.getExternalAccounts.bind(this);
            this.view.btnRecipients.onClick = this.showRecipientsData.bind(this);
        },
        /**
         * used to set the Reciepients UI
         */
        setExternalAccountsUI: function () {
            this.view.flxMakeTransferError.setVisibility(false);
            this.view.flxNoTransactions.setVisibility(false);
            this.view.flxSearch.setVisibility(true);
            this.view.segmentTransfers.setVisibility(true);
            this.view.flxRecipientsWrapper.setVisibility(false);
            this.setExternalAccountRightBar();
            commonUtilities.setText(this.view.lblSortDateExternal, kony.i18n.getLocalizedString("i18n.transfers.benificiaryName"), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblSortDescriptionExternal, kony.i18n.getLocalizedString("i18n.transfers.bankName"), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblSortTypeExternal, kony.i18n.getLocalizedString("i18n.billPay.Status"), commonUtilities.getaccessibilityConfig());
            this.view.flxSortExternal.setVisibility(true);
            this.setSkinActive(this.view.btnExternalAccounts);
            this.setSkinInActive(this.view.btnRecipients);
            this.view.btnExternalAccounts.onClick = this.getExternalAccounts.bind(this);
            this.view.btnRecipients.onClick = this.showRecipientsData.bind(this);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
            this.view.customheadernew.imgLblTransfers.text = "O";
        },
        /**
         * Used to set the active skin to the tab.
         * @param {Object} obj - contains the widget reference.
         */
        setSkinActive: function (obj) {
            obj.skin = ViewConstants.SKINS.TAB_SELECTED;
        },
        /**
         * Used to set the in-active skin to the tab.
         * @param {Object} obj - contains the widget reference.
         */
        setSkinInActive: function (obj) {
            obj.skin = ViewConstants.SKINS.TAB_INACTIVE;
            if (kony.application.getCurrentBreakpoint() !== 640) {
                obj.hoverSkin = ViewConstants.SKINS.TAB_HOVER;
            }
        },
        /**
         * used to set the recipients search
         */
        setRecipientsSearchBar: function () {
            var scopeObj = this;
            scopeObj.view.flxSearch.setVisibility(false);
            if (applicationManager.getConfigurationManager().getConfigurationValue("canSearchP2PPersons") === "true") {
                scopeObj.view.flxRecipientsSearch.setVisibility(true);
                scopeObj.view.flxRecipientsSearch.Search1.imgCross.setVisibility(true);
                scopeObj.view.flxRecipientsSearch.Search1.btnConfirm.onClick = scopeObj.onRecipientSearchBtnClick.bind(scopeObj);
                scopeObj.view.flxRecipientsSearch.Search1.flxClearBtn.onClick = scopeObj.onRecipientSearchClearBtnClick.bind(scopeObj);
                scopeObj.view.flxRecipientsSearch.Search1.txtSearch.onKeyUp = scopeObj.onRecipientTxtSearchKeyUp.bind(scopeObj);
                if (kony.application.getCurrentBreakpoint() == 640) scopeObj.view.Search1.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.billpay.SearchMessageMobile");
                else scopeObj.view.Search1.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.billPay.SearchMessage");
            } else {
                scopeObj.view.flxRecipientsSearch.setVisibility(false);
            }
        },
        /**
         * setManageRecipientSegmentData - Sets the data for Manage Recipient segment.
         * @param {array} managepayeesData- A list of recipients.
         */
        setManageRecipientSegmentData: function (managePayeesData, paginationValues, isSearch) {
            var self = this;
            self.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            self.setRecipientsSearchBar();
            self.setRecipientsUI();
            if (applicationManager.getUserPreferencesManager().checkP2PEligibilityForUser() !== "Activated") {
                this.showActivateP2PScreen();
            } else if (managePayeesData.length === 0) {
                this.view.flxNoTransactions.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.FastTransfers.NoP2PAccounts');
                this.showNoTransactions(kony.i18n.getLocalizedString("i18n.transfers.externalAccount"));
            } else {
                if (!isSearch) {
                    self.setPagination({
                        'show': true,
                        'offset': paginationValues.offset,
                        'limit': paginationValues.limit,
                        'recordsLength': managePayeesData.length,
                        'text': kony.i18n.getLocalizedString("i18n.transfers.external_accounts")
                    }, this.prevRecipients, this.nextRecipients);
                } else {
                    this.view.flxPagination.setVisibility(false);
                }
                managePayeesData = managePayeesData.map(function (payeeRecord) {
                    var btnRemoveRecipient = {
                        "onClick": commonUtilities.isCSRMode() ? commonUtilities.disableButtonActionForCSRMode() : function () {
                            self.deleteP2PRecipient();
                            //self.view.flxPagination.setVisibility("true");
                            self.view.flxPagination.forceLayout();
                        },
                        "text": kony.i18n.getLocalizedString("i18n.FastTransfers.RemoveRecipient"),
                        "toolTip": kony.i18n.getLocalizedString("i18n.FastTransfers.RemoveRecipient"),
                    };
                    var btnEdit = {
                        "onClick": function () {
                            self.editP2PRecipient();
                        },
                        "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                        "toolTip": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                    };
                    var btnAction = {
                        "onClick": function () {
                            var data = self.view.segmentTransfers.data;
                            var index = self.view.segmentTransfers.selectedRowIndex[1];
                            var selectedData = data[index];
                            self.transfersFastPresentationController.showTransferScreen({
                                accountTo: selectedData.PayPersonId,
                                displayName: selectedData.beneficiaryName
                            });
                        },
                        "text": kony.i18n.getLocalizedString("i18n.Pay.SendMoney"),
                        "toolTip": kony.i18n.getLocalizedString("i18n.Pay.SendMoney"),
                    };
                    var btnViewActivity = {
                        "onClick": function () {
                            self.onP2PViewActiviy();
                        },
                        "text": kony.i18n.getLocalizedString("i18n.transfers.viewActivity"),
                        "toolTip": kony.i18n.getLocalizedString("i18n.transfers.viewActivity"),
                    };
                    var dataObject = {
                        "btnEdit": btnEdit,
                        "btnAction": btnAction,
                        "btnViewActivity": btnViewActivity,
                        "flxBottomSeperator": "flxBottomSeperator",
                        "flxColumn1": "flxColumn1",
                        "flxColumn2": "flxColumn2",
                        "flxColumn3": "flxColumn3",
                        "flxDeleteAction": "flxDeleteAction",
                        "flxDetails": "flxDetails",
                        "flxExternalAccountsTransfers": "flxExternalAccountsTransfers",
                        "flxDropdown": "flxDropdown",
                        "flxEditAction": "flxEditAction",
                        "btnIdentifier": "btnIdentifier",
                        //"lblIdentifier": "lblIdentifier",
                        "ManageRecipient": "ManageRecipient",
                        "ManageRecipientSelected": "ManageRecipientSelected",
                        "flxName": "flxName",
                        "flxPrimaryContact": "flxPrimaryContacy",
                        "flxRow": "flxRow",
                        "flxSelectedRowWrapper": "flxSelectedRowWrapper",
                        "flxSeperator": "flxSeperator",
                        "imgDropdown": {
                            "src": ViewConstants.IMAGES.ARRAOW_DOWN,
                            "accessibilityconfig": {
                                "a11yLabel": "View Transaction details"
                            }
                        },
                        "lblAccountName": {
                            "text": payeeRecord.name,
                            "accessibilityconfig": {
                                "a11yLabel": payeeRecord.name,
                            }
                        },
                        "lblPrimaryContact": {
                            "text": payeeRecord.primaryContactForSending,
                            "accessibilityconfig": {
                                "a11yLabel": payeeRecord.primaryContactForSending,
                            }
                        },
                        "lblRegisteredEmail1": {
                            "text": payeeRecord.email ? payeeRecord.email : kony.i18n.getLocalizedString("i18n.common.none"),
                            "accessibilityconfig": {
                                "a11yLabel": payeeRecord.email ? payeeRecord.email : kony.i18n.getLocalizedString("i18n.common.none"),
                            }
                        },
                        "lblRegisteredEmail2": {
                            "text": payeeRecord.secondaryEmail ? payeeRecord.secondaryEmail : "",
                            "accessibilityconfig": {
                                "a11yLabel": payeeRecord.secondaryEmail ? payeeRecord.secondaryEmail : "",
                            }
                        },
                        "lblRegisteredEmails": {
                            "text": kony.i18n.getLocalizedString("i18n.PayAPerson.RegisteredEmail"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.PayAPerson.RegisteredEmail"),
                            }
                        },
                        "lblRegisteredPhone": {
                            "text": kony.i18n.getLocalizedString("i18n.PayAPerson.RegisteredPhone"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.PayAPerson.RegisteredPhone"),
                            }
                        },
                        "lblRegisteredPhone1": {
                            "text": payeeRecord.phone ? payeeRecord.phone : kony.i18n.getLocalizedString("i18n.common.none"),
                            "accessibilityconfig": {
                                "a11yLabel": payeeRecord.phone ? payeeRecord.phone : kony.i18n.getLocalizedString("i18n.common.none"),
                            }
                        },
                        "lblRegisteredPhone2": {
                            "text": payeeRecord.secondaryPhoneNumber ? payeeRecord.secondaryPhoneNumber : "",
                            "accessibilityconfig": {
                                "a11yLabel": payeeRecord.secondaryPhoneNumber ? payeeRecord.secondaryPhoneNumber : "",
                            }
                        },
                        "recipientID": payeeRecord.PayPersonId,
                        "recipientNickName": payeeRecord.nickName,
                        "lblSeparator": {
                            "text": "lblSeparator",
                            "accessibilityconfig": {
                                "a11yLabel": "lblSeparator",
                            }
                        },
                        "lblSeparatorSelected": {
                            "text": "lblSeparatorSelected",
                            "accessibilityconfig": {
                                "a11yLabel": "lblSeparatorSelected",
                            }
                        },
                        "imgRowSelected": ViewConstants.IMAGES.ARRAOW_UP,
                        "template": (kony.application.getCurrentBreakpoint() == 640) ? "flxFastTransfersRecipientsMobile" : "flxFastTransfersRecipientsUnselected",
                        "email": payeeRecord.email,
                        "secondaryEmail": payeeRecord.secondaryEmail,
                        "secondaryPhone": payeeRecord.secondaryPhoneNumber,
                        "name": payeeRecord.name,
                        "nickName": payeeRecord.nickName,
                        "phone": payeeRecord.phone,
                        "flxDetail": "flxDetail",
                        "flxRowOne": "flxRowOne",
                        "flxRowTwo": "flxRowTwo",
                        "flxActions": "flxActions",
                        "PayPersonId": payeeRecord.PayPersonId,
                        "flxIdentifier": {
                            "width": "0.63%"
                        },
                        "flxAccountNumberTitle": "flxAccountNumberTitle",
                        "lblAccountNumberTitle": {
                            "text": kony.i18n.getLocalizedString("i18n.FastTransfers.RegisteredEmailAddress"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.FastTransfers.RegisteredEmailAddress"),
                            }
                        },
                        "lblAccountNumberValue": {
                            "text": (payeeRecord.email !== null) ? payeeRecord.email : '-',
                            "accessibilityconfig": {
                                "a11yLabel": payeeRecord.email,
                            }
                        },
                        "flxRoutingNumberTitle": "flxRoutingNumberTitle",
                        "lblRoutingNumberTitle": {
                            "text": kony.i18n.getLocalizedString("i18n.TransferEur.nickName"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.TransferEur.nickName"),
                            }
                        },
                        "lblRoutingNumberValue": {
                            "text": payeeRecord.nickName,
                            "accessibilityconfig": {
                                "a11yLabel": payeeRecord.nickName,
                            }
                        },
                        "flxAccountTypeTitle": "flxAccountTypeTitle",
                        "lblAccountTypeTitle": {
                            "text": kony.i18n.getLocalizedString("i18n.FastTransfers.RegisteredPhoneNumber"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.FastTransfers.RegisteredPhoneNumber"),
                            }
                        },
                        "lblAccountTypeValue": {
                            "text": (payeeRecord.phone !== null) ? payeeRecord.phone : '-',
                            "accessibilityconfig": {
                                "a11yLabel": payeeRecord.phone,
                            }
                        },
                        "flxAccountHolderTitle": "flxAccountHolderTitle",
                        "btnRemoveRecipient": btnRemoveRecipient,
                        "imgIcon": {
                            //"isVisible" : (configurationManager.isCombinedUser==="true") ? true :false,
                            "isVisible": this.profileAccess === "both" ? true : false,
                            "text": payeeRecord.isBusinessPayee == "1" ? "r" : "s"
                        },
                        "flxIcon": {
                            // "isVisible" : (configurationManager.isCombinedUser==="true") ? true :false}
                            "isVisible": this.profileAccess === "both" ? true : false,
                        }
                    };
                    if (commonUtilities.isCSRMode()) {
                        dataObject.btnRemoveRecipient.skin = commonUtilities.disableSegmentButtonSkinForCSRMode(13);
                    }
                    return dataObject;
                });
                var dataMap = {
                    "imgIcon": "imgIcon",
                    "flxIcon": "flxIcon",
                    "btnAction": "btnAction",
                    "btnDelete": "btnDelete",
                    "btnEdit": "btnEdit",
                    "btnSendMoney": "btnSendMoney",
                    "btnViewActivity": "btnViewActivity",
                    "flxBottomSeperator": "flxBottomSeperator",
                    "flxExternalAccountsTransfers": "flxExternalAccountsTransfers",
                    "flxColumn1": "flxColumn1",
                    "flxColumn2": "flxColumn2",
                    "flxColumn3": "flxColumn3",
                    "flxDeleteAction": "flxDeleteAction",
                    "flxDetails": "flxDetails",
                    "flxDetail": "flxDetail",
                    "flxDropdown": "flxDropdown",
                    "flxEditAction": "flxEditAction",
                    "flxIdentifier": "flxIdentifier",
                    "lblIdentifier": "lblIdentifier",
                    "ManageRecipient": "ManageRecipient",
                    "ManageRecipientSelected": "ManageRecipientSelected",
                    "flxName": "flxName",
                    "flxPrimaryContact": "flxPrimaryContact",
                    "flxRow": "flxRow",
                    "flxSelectedRowWrapper": "flxSelectedRowWrapper",
                    "flxSeperator": "flxSeperator",
                    "imgDropdown": "imgDropdown",
                    "lblAccountName": "lblAccountName",
                    "lblPrimaryContact": "lblPrimaryContact",
                    "lblRegisteredEmail1": "lblRegisteredEmail1",
                    "lblRegisteredEmail2": "lblRegisteredEmail2",
                    "lblRegisteredEmails": "lblRegisteredEmails",
                    "lblRegisteredPhone": "lblRegisteredPhone",
                    "lblRegisteredPhone1": "lblRegisteredPhone1",
                    "lblRegisteredPhone2": "lblRegisteredPhone2",
                    "lblSeparator": "lblSeparator",
                    "lblSeparatorSelected": "lblSeparatorSelected",
                    "imgRowSelected": "imgRowSelected",
                    "flxRowOne": "flxRowOne",
                    "flxRowTwo": "flxRowTwo",
                    "flxActions": "flxActions",
                    "flxAccountNumberTitle": "flxAccountNumberTitle",
                    "lblAccountNumberTitle": "lblAccountNumberTitle",
                    "lblAccountNumberValue": "lblAccountNumberValue",
                    "flxRoutingNumberTitle": "flxRoutingNumberTitle",
                    "lblRoutingNumberTitle": "lblRoutingNumberTitle",
                    "lblRoutingNumberValue": "lblRoutingNumberValue",
                    "flxAccountTypeTitle": "flxAccountTypeTitle",
                    "flxAccountHolderTitle": "flxAccountHolderTitle",
                    "lblAccountTypeTitle": "lblAccountTypeTitle",
                    "lblAccountTypeValue": "lblAccountTypeValue",
                    "btnRemoveRecipient": "btnRemoveRecipient"
                };
                self.view.segmentTransfers.widgetDataMap = dataMap;
                if (managePayeesData.length > 0) {
                    self.view.segmentTransfers.setData(managePayeesData);
                }
            }
            FormControllerUtility.hideProgressBar(this.view);
        },
        editP2PRecipient: function (selectedData) {
            selectedData.payPersonId = selectedData.PayPersonId;
            selectedData.recipientName = selectedData.name;
            if (selectedData.primaryContactForSending && this.isValidEmail(selectedData.primaryContactForSending)) {
                if (selectedData.email) {
                    selectedData.radioTextValue = selectedData.email;
                    selectedData.selectedRadioBackendValue = "email";
                } else {
                    selectedData.radioTextValue = selectedData.phone;
                    selectedData.selectedRadioBackendValue = "phone";
                }
            } else {
                if (selectedData.phone) {
                    selectedData.radioTextValue = selectedData.phone;
                    selectedData.selectedRadioBackendValue = "phone";
                } else {
                    selectedData.radioTextValue = selectedData.email;
                    selectedData.selectedRadioBackendValue = "email";
                }
            }
            selectedData.flowType = "EDIT";
            selectedData.beneficiaryType = "P2P";
            applicationManager.getNavigationManager().setCustomInfo('editComponentP2P', selectedData);
            this.transfersFastPresentationController.showView("frmFastP2P");
        },
        isValidEmail: function (value) {
            var emailRegx = "^[a-zA-Z0-9_+&*-]+(?:\\." + "[a-zA-Z0-9_+&*-]+)*@" + "(?:[a-zA-Z0-9-]+\\.)+[a-z" + "A-Z]{2,7}$";
            if (!value.match(emailRegx)) {
                return false;
            }
            return true;
        },
        /**
         * used to set the Exrternal Accounts serach
         */
        setExtenalAccountsSearch: function () {
            var scopeObj = this;
            scopeObj.view.flxRecipientsSearch.setVisibility(false);
            if (applicationManager.getConfigurationManager().getConfigurationValue("canSearchTransfers") === "true") {
                scopeObj.view.flxSearch.setVisibility(true);
                scopeObj.view.flxSearch.Search.imgCross.setVisibility(true);
                scopeObj.view.flxSearch.Search.btnConfirm.onClick = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.view.flxSearch.Search.flxClearBtn.onClick = scopeObj.onSearchClearBtnClick.bind(scopeObj);
                scopeObj.view.flxSearch.Search.txtSearch.onKeyUp = scopeObj.onTxtSearchKeyUp.bind(scopeObj);
            } else {
                scopeObj.view.flxSearch.setVisibility(false);
            }
        },
        /**returns the recipients which are to be shown
         * @param  {object} viewModel Data of External accounts
         */
        dataAccPermissions: function (viewModel) {
            var accounts = viewModel.filter(function (record) {
                if (record.isInternationalAccount === "true") {
                    return (applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT") === true);
                }
                if (record.isSameBankAccount === "true") {
                    return (applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_VIEW_RECEPIENT") === true);
                }
                if (record.isSameBankAccount === "false" && record.isInternationalAccount === "false") {
                    return (applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT") === true);
                }
            });
            return accounts;
        },
        checkEditRecipientPermission: function (account) {
            if (account.isInternationalAccount === "true") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT");
            } else if (account.isSameBankAccount === "true") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT");
            } else if (account.isSameBankAccount === "false" && account.isInternationalAccount === "false") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT");
            }
            return false;
        },
        checkRemoveRecipientPermission: function (account) {
            if (account.isInternationalAccount === "true") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT");
            } else if (account.isSameBankAccount === "true") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT");
            } else if (account.isSameBankAccount === "false" && account.isInternationalAccount === "false") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT");
            }
            return false;
        },
        checkViewRecipientPermission: function (account) {
            if (account.isInternationalAccount === "true") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT");
            } else if (account.isSameBankAccount === "true") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_VIEW_RECEPIENT");
            } else if (account.isSameBankAccount === "false" && account.isInternationalAccount === "false") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT");
            }
            return false;
        },
        checkCreateTransferPermission: function (account) {
            if (account.isInternationalAccount === "true") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
            } else if (account.isSameBankAccount === "true") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_CREATE");
            } else if (account.isSameBankAccount === "false" && account.isInternationalAccount === "false") {
                return applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE");
            }
            return false;
        },
        /**UI entrypoint for external accounts
         * @param  {object} viewModel Data of External accounts
         * @param  {object} config Configuration for the Pagination
         * @param {boolean} search used to set the visibulity
         */
        showExternalAccounts: function (viewModel, config, pagination, isSearch) {
            var scopeObj = this;
            viewModel = this.dataAccPermissions(viewModel);
            scopeObj.setExtenalAccountsSearch();
            scopeObj.setExternalAccountsUI();
            if (viewModel === "errorExternalAccounts") {
                this.hideAll();
                this.showServerError();
                this.view.forceLayout();
            } else if ((viewModel === undefined) || ((viewModel instanceof Array) && viewModel.length === 0)) {
                this.view.flxNoTransactions.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.FastTransfers.NoAccounts');
                this.showNoTransactions(kony.i18n.getLocalizedString("i18n.transfers.externalAccount"));
            } else {
                this.sortFlex(kony.i18n.getLocalizedString("i18n.transfers.externalAccount"));
                this.view.forceLayout();
                var break_point = kony.application.getCurrentBreakpoint();
                var externalAccountDataMap = {
                    "imgIcon": "imgIcon",
                    "flxIcon": "flxIcon",
                    "btnBankDetails": "btnBankDetails",
                    "btnDelete": "btnDelete",
                    "btnEdit": "btnEdit",
                    "btnViewActivity": "btnViewActivity",
                    "btnAction": "btnAction",
                    "btnCancel": "btnCancel",
                    "btnMakeTransfer": "btnMakeTransfer",
                    "btnSave": "btnSave",
                    "flxDropdown": "flxDropdown",
                    "imgDropdown": "imgDropdown",
                    "lblAccountHolderTitle": "lblAccountHolderTitle",
                    "lblAccountHolderValue": "lblAccountHolderValue",
                    "lblAccountName": "lblAccountName",
                    "lblAccountNumberTitle": "lblAccountNumberTitle",
                    "lblAccountNumberValue": "lblAccountNumberValue",
                    "lblAccountTypeTitle": "lblAccountTypeTitle",
                    "lblAccountTypeValue": "lblAccountTypeValue",
                    "lblAddedOnTitle": "lblAddedOnTitle",
                    "lblAddedOnValue": "lblAddedOnValue",
                    "lblBankDetailsTitle": "lblBankDetailsTitle",
                    "lblBankName": "lblBankName",
                    "lblIdentifier": "lblIdentifier",
                    "lblRoutingNumberTitle": "lblRoutingNumberTitle",
                    "lblRoutingNumberValue": "lblRoutingNumberValue",
                    "lblSeparator": "lblSeparator",
                    "lblSeparatorActions": "lblSeparatorActions",
                    "lblStatus": "lblStatus",
                    "txtAccountName": "txtAccountName",
                    "txtAccountNumber": "txtAccountNumber",
                    "txtAccountType": "txtAccountType",
                    "lblSeparatorLineActions": "lblSeparatorLineActions",
                    "lblSeparatorLineActions1": "lblSeparatorLineActions1",
                    "lblSeparatorLineActions2": "lblSeparatorLineActions2",
                    "lblRowSeperator": "lblRowSeperator",
                    "btnRemoveRecipient": "btnRemoveRecipient",
                    "IBAN": "IBAN",
                    "Id": "Id"
                };
                var len = viewModel.length;

                function getMappings(context) {
                    if (context.routingNumberDetails) {
                        context = context.routingNumberDetails;
                        if (context.lblRoutingNumberTitle) {
                            if (context.lblRoutingNumberTitle.isInternationalAccount === "true") {
                                return kony.i18n.getLocalizedString("i18n.accounts.swiftCode");
                            } else {
                                return kony.i18n.getLocalizedString("i18n.accounts.routingNumber");
                            }
                        }
                        if (context.lblRoutingNumberValue) {
                            if (context.lblRoutingNumberValue.isInternationalAccount === "true") {
                                return context.lblRoutingNumberValue.swiftCode;
                            } else if (context.lblRoutingNumberValue.isSameBankAccount === "false") {
                                return context.lblRoutingNumberValue.routingNumber;
                            } else {
                                return kony.i18n.getLocalizedString("i18n.common.NA");
                            }
                        }
                    }
                    if (context.accountStatus) {
                        if (context.accountStatus.isVerified === "true" || context.accountStatus.isVerified === "1") {
                            return kony.i18n.getLocalizedString("i18n.transfers.verified");
                        } else {
                            return kony.i18n.getLocalizedString("i18n.accounts.pending");
                        }
                    }
                    if (context.viewActivity) {
                        if (applicationManager.getConfigurationManager().getConfigurationValue("fundTransferHistory") === 'true' && context.viewActivity.isVerified === "true") {
                            return {
                                "text": kony.i18n.getLocalizedString("i18n.transfers.viewActivity"),
                                "toolTip": kony.i18n.getLocalizedString("i18n.transfers.viewActivity"),
                                "isVisible": scopeObj.checkViewRecipientPermission(context.viewActivity),
                                "onClick": function (eventobject, context) {
                                    scopeObj.onExternalAccountsViewActivity(context.rowIndex);
                                }
                            }
                        } else {
                            return {
                                "isVisible": false
                            }
                        }
                    }
                    if (context.btnActivityAccountStatus) {
                        if (context.btnActivityAccountStatus.isVerified === "true" || context.btnActivityAccountStatus.isVerified === "1") {
                            return {
                                "text": kony.i18n.getLocalizedString("i18n.Pay.SendMoney"),
                                "toolTip": kony.i18n.getLocalizedString("i18n.Pay.SendMoney"),
                                "isVisible": scopeObj.checkCreateTransferPermission(context.btnActivityAccountStatus),
                                "onClick": function () {
                                    var accountTo = {
                                        accountTo: context.btnActivityAccountStatus.accountNumber,
                                        Id: context.btnActivityAccountStatus.Id,
                                        displayName: context.btnActivityAccountStatus.beneficiaryName
                                    };
                                    scopeObj.transfersFastPresentationController.showTransferScreen(accountTo);
                                }
                            };
                        } else {
                            return {
                                "isVisible": false
                                // "text": kony.i18n.getLocalizedString("i18n.transfers.verifyAccount"),
                                // "toolTip": kony.i18n.getLocalizedString("i18n.transfers.verifyAccount"),
                                // "onClick": function () {
                                //     scopeObj.onBtnVerifyAccount();
                                // }
                            };
                        }
                    }
                    if (context.congigkeyPlug) {
                        if (applicationManager.getConfigurationManager().getConfigurationValue('addExternalAccount') === 'true') {
                            return true;
                        } else if (applicationManager.getConfigurationManager().getConfigurationValue('addExternalAccount') === 'false' && context.congigkeyPlug.isVerified === "true") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
                if (!isSearch) {
                    scopeObj.setPagination({
                        'show': true,
                        'offset': pagination.offset,
                        'limit': pagination.limit,
                        'recordsLength': viewModel.length,
                        'text': kony.i18n.getLocalizedString("i18n.hamburger.externalAccounts")
                    }, this.prevExternalAccounts, this.nextExternalAccounts);
                }
                var data = [];
                var i;
                for (i = 0; i < len; i++) {
                    if (viewModel[i] !== undefined && getMappings({
                        "congigkeyPlug": viewModel[i]
                    })) {
                        var accName = viewModel[i].nickName;
                        var dataObject = {
                            "IBAN": viewModel[i].IBAN,
                            "Id": viewModel[i].Id,
                            "btnDelete": {
                                "text": kony.i18n.getLocalizedString("i18n.FastTransfers.RemoveRecipient"),
                                "toolTip": kony.i18n.getLocalizedString("i18n.FastTransfers.RemoveRecipient"),
                                "isVisible": scopeObj.checkRemoveRecipientPermission(viewModel[i]),
                                "onClick": commonUtilities.isCSRMode() ? FormControllerUtility.disableButtonActionForCSRMode() : function (eventobject, context) {
                                    scopeObj.onExternalAccountDelete(viewModel.length, context.rowIndex);
                                    //scopeObj.view.flxPagination.setVisibility("true");
                                    scopeObj.view.flxPagination.forceLayout();
                                }
                            },
                            "imgIcon": {
                                //"isVisible" : (configurationManager.isCombinedUser==="true") ? true :false,
                                "isVisible": this.profileAccess === "both" ? true : false,
                                "text": viewModel[i].isBusinessPayee == "1" ? "r" : "s"
                            },
                            "flxIcon": {
                                "isVisible": this.profileAccess === "both" ? true : false
                            },
                            //"isVisible" : (configurationManager.isCombinedUser==="true") ? true :false},  
                            "btnEdit": {
                                "toolTip": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                                "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                                "isVisible": scopeObj.checkEditRecipientPermission(viewModel[i]),
                                "onClick": function (eventobject, context) {
                                    scopeObj.externalAccountsSegmentRowClickEdit(accName, context.rowIndex);
                                }
                            },
                            "btnViewActivity": getMappings({
                                "viewActivity": viewModel[i]
                            }),
                            "btnAction": getMappings({
                                "btnActivityAccountStatus": viewModel[i]
                            }),
                            "btnCancel": {
                                "text": kony.i18n.getLocalizedString('i18n.transfers.Cancel'),
                                "toolTip": kony.i18n.getLocalizedString('i18n.transfers.Cancel'),
                                "onClick": function () {
                                    scopeObj.showUnselectedRow();
                                }
                            },
                            "btnSave": {
                                "text": kony.i18n.getLocalizedString('i18n.ProfileManagement.Save'),
                                "toolTip": kony.i18n.getLocalizedString('i18n.common.saveChanges'),
                                "isVisible": scopeObj.checkEditRecipientPermission(viewModel[i]),
                                "onClick": commonUtilities.isCSRMode() ? FormControllerUtility.disableButtonActionForCSRMode() : null
                            },
                            "btnRemoveRecipient": {
                                "text": kony.i18n.getLocalizedString("i18n.FastTransfers.RemoveRecipient"),
                                "toolTip": kony.i18n.getLocalizedString("i18n.FastTransfers.RemoveRecipient"),
                                "isVisible": scopeObj.checkRemoveRecipientPermission(viewModel[i]),
                                "onClick": commonUtilities.isCSRMode() ? FormControllerUtility.disableButtonActionForCSRMode() : function (eventobject, context) {
                                    scopeObj.onExternalAccountDelete(viewModel.length, context.rowIndex);
                                    //scopeObj.view.flxPagination.setVisibility("true");
                                    scopeObj.view.flxPagination.forceLayout();
                                }
                            },
                            "imgDropdown": {
                                "src": ViewConstants.IMAGES.ARROW_DOWN,
                                "accessibilityconfig": {
                                    "a11yHidden": false,
                                    "a11yLabel": "View Transaction Details"
                                }
                            },
                            "lblAccountHolderTitle": {
                                "text": kony.i18n.getLocalizedString("i18n.transfers.accountType"),
                                "isVisible": kony.sdk.isNullOrUndefined(viewModel[i].accountType) ? false : true
                            },
                            "lblAccountHolderValue": {
                                "text": viewModel[i].accountType,
                                "isVisible": kony.sdk.isNullOrUndefined(viewModel[i].accountType) ? false : true,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].accountType,
                                }
                            },
                            "lblAccountName": {
                                text: viewModel[i].beneficiaryName,
                                //left : (configurationManager.isCombinedUser==="true" ? "10dp"  : "0dp")
                                left: (this.profileAccess === "both" ? "10dp" : "0dp")
                            },
                            "lblAccountNumberTitle": kony.i18n.getLocalizedString('i18n.common.accountNumber'),
                            "lblAccountNumberValue": {
                                text: viewModel[i].accountNumber
                            },
                            "lblAccountTypeTitle": getMappings({
                                routingNumberDetails: {
                                    lblRoutingNumberTitle: viewModel[i]
                                }
                            }),
                            "lblAccountTypeValue": getMappings({
                                routingNumberDetails: {
                                    lblRoutingNumberValue: viewModel[i]
                                }
                            }) || "NA",
                            "lblAddedOnTitle": kony.i18n.getLocalizedString('i18n.common.addedOn'),
                            "lblAddedOnValue": commonUtilities.getFrontendDateString(viewModel[i].createdOn),
                            "lblBankDetailsTitle": kony.i18n.getLocalizedString('i18n.transfers.bankDetails'),
                            "lblBankName": kony.sdk.isNullOrUndefined(viewModel[i].bankName) ? "N/A" : viewModel[i].bankName,
                            "isSameBankAccount": viewModel[i].isSameBankAccount,
                            "isInternationalAccount": viewModel[i].isInternationalAccount,
                            //"lblIdentifier": "lblIdentifier",
                            "lblRoutingNumberTitle": kony.i18n.getLocalizedString("i18n.TransferEur.nickName"),
                            "lblRoutingNumberValue": {
                                "text": viewModel[i].nickName,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].nickName,
                                }
                            },
                            "lblSeparator": viewModel[i].beneficiaryName,
                            "lblSeparatorActions": "lblSeparatorActions",
                            "lblStatus": getMappings({
                                accountStatus: viewModel[i]
                            }),
                            "template": (kony.application.getCurrentBreakpoint() == 640) ? "flxExternalAccountsFastTransfersMobile" : "flxFastExternalAccountsTransfersUnselected",
                            "txtAccountName": {
                                "text": viewModel[i].nickName,
                                "placeholder": ""
                            },
                            "txtAccountNumber": {
                                "text": viewModel[i].accountNumber,
                                "placeholder": ""
                            },
                            "txtAccountType": {
                                "text": viewModel[i].accountType,
                                "placeholder": ""
                            }
                        };
                        if (commonUtilities.isCSRMode()) {
                            dataObject.btnDelete.skin = commonUtilities.disableSegmentButtonSkinForCSRMode(13);
                            dataObject.btnSave.skin = FormControllerUtility.disableButtonSkinForCSRMode();
                        }
                        data.push(dataObject);
                    }
                }
                this.view.segmentTransfers.widgetDataMap = externalAccountDataMap;
                //                 if (break_point == 640) {
                //                     for (i = 0; i < data.length; i++) {
                //                         data[i].template = "flxExternalAccountUnselected";
                //                     }
                //                     this.view.flxSortExternal.setVisibility(false);
                //                 }
                this.view.flxSearch.setVisibility(true);
                this.view.segmentTransfers.setData(data);
                this.view.flxAddAccountWindow.setVisibility(true);
                FormControllerUtility.updateSortFlex(this.externalAccountsSortMap, config);
            }
        },
        /**
         * used to get the transactions of that account
         */
        onExternalAccountsViewActivity: function (index) {
            var self = this;
            var data = this.view.segmentTransfers.data;
            this.transfersFastPresentationController.showSelectedAccountTransactions({
                "accountNumber": data[index].lblAccountNumberValue.text,
                "accountName": data[index].lblAccountName.text,
                "onCallbackManagerPayee": function () {
                    applicationManager.getNavigationManager().navigateTo("frmFastManagePayee");
                }
            });
        },
        /**
         * used to get the transactions of that p2p account
         */
        onP2PViewActiviy: function (selectedData) {
            var self = this;
            //             var index = this.view.segmentTransfers.selectedRowIndex[1];
            //             var data = this.view.segmentTransfers.data;
            this.transfersFastPresentationController.showSelectedP2PTransactions({
                "payPersonId": selectedData.PayPersonId,
                "accountName": selectedData.name,
                "onCallbackManagerPayee": function () {
                    applicationManager.getNavigationManager().navigateTo("frmFastManagePayee");
                }
            });
        },
        /**
         * used to set the external accounts right bar
         */
        setExternalAccountRightBar: function (accName) {
            this.view.flxChangeTransferTypeHeader.setVisibility(false);
            this.view.flxAddAccountWindow.top = "0px";
            this.view.flxPayAPersonsettings.setVisibility(false);
            //this.setConfigurabilityForAddExternalAccounts();
        },
        /**
         * used to set the Recipients Right Menu
         */
        setRecipientRightBar: function () {
            this.view.flxChangeTransferTypeHeader.setVisibility(false);
            this.view.flxAddAccountWindow.top = "0px";
            this.setPayAPersonSettings();
            //this.setConfigurabilityForAddExternalAccounts();
        },
        /**
         * used to set the pay a person settings right menu
         */
        setPayAPersonSettings: function () {
            var scopeObj = this;
            if (scopeObj.transfersFastPresentationController.checkP2pEligibility() === "Activated") {
                this.view.flxPayAPersonsettings.setVisibility(true);
            } else {
                this.view.flxPayAPersonsettings.setVisibility(false);
            }
        },
        /**
         * used to set the configurabulity of add external accounts
         */
        /*setConfigurabilityForAddExternalAccounts: function () {
            if (this.getTransferTypeVisibility(OLBConstants.TRANSFER_TYPES.OWN_INTERNAL_ACCOUNTS)) {
                this.view.flxAddBankAccount.setVisibility(true);
            } else {
                this.view.flxAddBankAccount.setVisibility(false);
            }
            if (this.getTransferTypeVisibility(OLBConstants.TRANSFER_TYPES.OTHER_EXTERNAL_ACCOUNT)) {
                this.view.flxAddKonyAccount.setVisibility(true);
            } else {
                this.view.flxAddKonyAccount.setVisibility(false);
            }
            if (this.getTransferTypeVisibility(OLBConstants.TRANSFER_TYPES.INTERNATIONAL_ACCOUNT)) {
                this.view.flxAddInternationalAccount.setVisibility(true);
            } else {
                this.view.flxAddInternationalAccount.setVisibility(false);
            }
            this.view.flxAddReciepient.setVisibility(true);
        },*/
        /** Decides whether to show a Transfer Type
         * @returns {boolean} true if type needs to be shown , false otherwise
         */
        getTransferTypeVisibility: function (transferType) {
            switch (transferType) {
                case OLBConstants.TRANSFER_TYPES.OWN_INTERNAL_ACCOUNTS:
                    return applicationManager.getConfigurationManager().getConfigurationValue("isKonyBankAccountsTransfer") === "true";
                case OLBConstants.TRANSFER_TYPES.OTHER_INTERNAL_MEMBER:
                    return applicationManager.getConfigurationManager().getConfigurationValue("isOtherKonyAccountsTransfer") === "true";
                case OLBConstants.TRANSFER_TYPES.OTHER_EXTERNAL_ACCOUNT:
                    return applicationManager.getConfigurationManager().getConfigurationValue("isOtherBankAccountsTransfer") === "true";
                case OLBConstants.TRANSFER_TYPES.INTERNATIONAL_ACCOUNT:
                    return applicationManager.getConfigurationManager().getConfigurationValue("isInternationalAccountsTransfer") === "true";
                default:
                    break;
            }
        },
        /**Callback for Edit Button on external accounts
         */
        externalAccountsSegmentRowClickEdit: function (data) {
            //     var data = this.view.segmentTransfers.data[index];
            data.recipientName = data.beneficiaryName;
            if (data.isInternationalAccount === "true") {
                data.flowType = "EDIT";
                data.beneficiaryType = "International";
                applicationManager.getNavigationManager().setCustomInfo('editComponentP2P', data);
                this.transfersFastPresentationController.showView("frmFastP2P");
            } else if (data.isSameBankAccount === "true") {
                data.flowType = "EDIT";
                data.beneficiaryType = "Same Bank";
                applicationManager.getNavigationManager().setCustomInfo('editComponentP2P', data);
                this.transfersFastPresentationController.showView("frmFastP2P");
            } else {
                data.flowType = "EDIT";
                data.beneficiaryType = "External";
                applicationManager.getNavigationManager().setCustomInfo('editComponentP2P', data);
                this.transfersFastPresentationController.showView("frmFastP2P");
            }
        },
        /**Configure Pagination for previous Recipients
         */
        prevRecipients: function () {
            var self = this;
            self.transfersFastPresentationController.fetchPreviousRecipientsList();
        },
        /**Configure Pagination for Next Button of Recipients
         */
        nextRecipients: function () {
            var self = this;
            self.getNextRecipients();
        },
        /**Configure Pagination for previous External Accounts
         */
        prevExternalAccounts: function () {
            var self = this;
            self.transfersFastPresentationController.fetchPreviousExternalAccounts();
        },
        /**Configure Pagination for Next Button of External Accounts
         */
        nextExternalAccounts: function () {
            var self = this;
            self.getNextExternalAccounts();
        },
        /**Shows Next External Accounts - From pagination
         */
        getNextRecipients: function () {
            var scopeObj = this;
            this.view.tablePagination.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
            scopeObj.transfersFastPresentationController.fetchNextRecipientsList();
        },
        /**Shows Next External Accounts - From pagination
         */
        getNextExternalAccounts: function () {
            var scopeObj = this;
            this.view.tablePagination.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
            scopeObj.transfersFastPresentationController.fetchNextExternalAccounts();
        },
        /**Shows Previous External Accounts
         */
        getPreviousExternalAccounts: function () {
            var self = this;
            if (self.offset >= ViewConstants.MAGIC_NUMBERS.LIMIT) {
                self.transfersFastPresentationController.fetchPreviousExternalAccounts();
            } else {
                this.view.tablePagination.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
            }
        },
        /**Hides all the main flexes and  Resets UI
         */
        hideAll: function () {
            var scopeObj = this;
            scopeObj.view.flxNoTransactions.setVisibility(false);
            scopeObj.view.flxPagination.setVisibility(false);
            scopeObj.view.flxRecipientsWrapper.setVisibility(false);
            this.view.segmentTransfers.setVisibility(false);
        },
        /**Show Server error in the UI
         * @param  {object} viewModel ViewModel containing server error message
         */
        showServerError: function (viewModel) {
            var scopeObj = this;
            scopeObj.view.flxMakeTransferError.setVisibility(true);
            scopeObj.view.rtxMakeTransferError.text = kony.i18n.getLocalizedString("i18n.common.OoopsServerError");
        },
        /**Show Empty View
         * @param {String} context Value which is not present
         */
        showNoTransactions: function (context) {
            var scopeObj = this;
            scopeObj.hideAll();
            scopeObj.view.flxSortExternal.setVisibility(false);
            scopeObj.view.segmentTransfers.setVisibility(false);
            scopeObj.view.flxRecipientsSearch.setVisibility(false);
            scopeObj.view.flxNoTransactions.setVisibility(true);
            commonUtilities.setText(scopeObj.view.btnAddRecipient, kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient"), commonUtilities.getaccessibilityConfig());
            scopeObj.view.btnAddRecipient.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient");
            scopeObj.view.btnAddRecipient.onClick = function () {
                scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    showRecipientGateway: true
                });
            }
            scopeObj.view.forceLayout();
        },
        showActivateP2PScreen: function () {
            var scopeObj = this;
            scopeObj.view.flxNoTransactions.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.FastTransfers.ActivatePersonToPersonLabel');
            scopeObj.hideAll();
            scopeObj.view.flxSortExternal.setVisibility(false);
            scopeObj.view.segmentTransfers.setVisibility(false);
            scopeObj.view.flxRecipientsSearch.setVisibility(false);
            scopeObj.view.flxNoTransactions.setVisibility(true);
            scopeObj.view.btnAddRecipient.width = "200" + ViewConstants.POSITIONAL_VALUES.DP;
            commonUtilities.setText(scopeObj.view.btnAddRecipient, kony.i18n.getLocalizedString("i18n.PayAPerson.activatePayAPerson"), commonUtilities.getaccessibilityConfig());
            scopeObj.view.btnAddRecipient.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.activatePayAPerson");
            scopeObj.view.btnAddRecipient.onClick = function () {
                scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    activateRecipient: true
                });
            }
            scopeObj.view.forceLayout();
        },
        /**Configure Sort Flex
         * @param  {string} tab Type of tab and shows sort flex
         */
        sortFlex: function (tab) {
            if (tab === kony.i18n.getLocalizedString("i18n.transfers.externalAccount")) {
                this.view.flxSortExternal.setVisibility(true);
                commonUtilities.setText(this.view.lblSortDateExternal, kony.i18n.getLocalizedString("i18n.transfers.benificiaryName"), commonUtilities.getaccessibilityConfig());
                commonUtilities.setText(this.view.lblSortDescriptionExternal, kony.i18n.getLocalizedString("i18n.transfers.bankName"), commonUtilities.getaccessibilityConfig());
                commonUtilities.setText(this.view.lblSortTypeExternal, kony.i18n.getLocalizedString("i18n.billPay.Status"), commonUtilities.getaccessibilityConfig());
            } else if (tab === kony.i18n.getLocalizedString("i18n.transfers.recent")) {
                this.view.flxSortExternal.setVisibility(false);
                commonUtilities.setText(this.view.lblSortDateExternal, kony.i18n.getLocalizedString("i18n.transfers.transactionDate"), commonUtilities.getaccessibilityConfig());
                commonUtilities.setText(this.view.lblSortDescriptionExternal, kony.i18n.getLocalizedString("i18n.transfers.benificiaryName"), commonUtilities.getaccessibilityConfig());
                commonUtilities.setText(this.view.lblSortTypeExternal, kony.i18n.getLocalizedString("i18n.transfers.amountlabel"), commonUtilities.getaccessibilityConfig());
            }
        },
        /**Callbacks for External Account Delete Button
         */
        onExternalAccountDelete: function (length, index) {
            var scopeObj = this;
            commonUtilities.setText(scopeObj.view.CustomPopup.lblHeading, kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(scopeObj.view.CustomPopup.lblPopupMessage, kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccountMsg"), commonUtilities.getaccessibilityConfig());
            scopeObj.view.flxLogout.height = this.getPageHeight();
            scopeObj.view.flxLogout.left = "0%";
            scopeObj.view.CustomPopup.lblHeading.setFocus(true);
            var data = this.view.segmentTransfers.data;
            var id = data[index].Id;
            var IBAN = data[index].IBAN;
            var samebankAccount = data[index].isSameBankAccount;
            var internationalAccount = data[index].isInternationalAccount;
            var accountNumber = data[index].txtAccountNumber.text;
            var payload = {};
            if (IBAN != null) {
                payload = {
                    "IBAN": IBAN,
                    "Id": id,
                    "isSameBankAccount": samebankAccount,
                    "isInternationalAccount": internationalAccount
                };
            } else {
                payload = {
                    "accountNumber": accountNumber,
                    "Id": id,
                    "isSameBankAccount": samebankAccount,
                    "isInternationalAccount": internationalAccount
                };
            }
            this.view.CustomPopup.btnYes.toolTip = kony.i18n.getLocalizedString('i18n.common.deleteTheAccount');
            this.view.flxDialogs.setVisibility(true);
            this.view.CustomPopup.btnYes.onClick = function () {
                scopeObj.transfersFastPresentationController.deleteExternalAccount(payload, length);
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxLogout.left = "-100%";
            };
            this.view.CustomPopup.btnNo.toolTip = kony.i18n.getLocalizedString('i18n.common.noDontDelete');
            this.view.CustomPopup.btnNo.onClick = function () {
                scopeObj.view.flxLogout.left = "-100%";
                scopeObj.view.flxDialogs.setVisibility(false);
            };
            this.view.CustomPopup.flxCross.onClick = function () {
                scopeObj.view.flxLogout.left = "-100%";
                scopeObj.view.flxDialogs.setVisibility(false);
            };
        },
        /**  Returns height of the page
         * @returns {String} height height of the page
         */
        getPageHeight: function () {
            var height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT;
            return height + ViewConstants.POSITIONAL_VALUES.DP;
        },
        /**
         * This method is used to delete a recipient from manage recipients tab in pay a person.
         */
        deleteP2PRecipient: function () {
            var self = this;
            var data = this.view.segmentTransfers.data;
            var index = this.view.segmentTransfers.selectedRowIndex[1];
            var payeeID = data[index].recipientID;
            self.showQuitScreen({
                "negative": function () {
                    self.closeQuitScreen();
                },
                "positive": function () {
                    self.closeQuitScreen();
                    // kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule").presentationController.deleteRecipient(payeeID);
                    self.transfersFastPresentationController.deleteRecipient(payeeID);
                }
            }, kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"), kony.i18n.getLocalizedString("i18n.PayAPerson.DeleteRecipientMessage"));
        },
        /**
         * This method is used to show the popup.
         * @param {object} actions - this takes an object with an action for "yes" and "No".
         * @param {String} header - The header message for that popup.
         * @param {String} message - The message for the popup.
         */
        showQuitScreen: function (actions, header, message) {
            var scopeObj = this;
            if (header) {
                commonUtilities.setText(this.view.CustomPopup1.lblHeading, header, commonUtilities.getaccessibilityConfig());
            }
            if (message) {
                commonUtilities.setText(this.view.CustomPopup1.lblPopupMessage, message, commonUtilities.getaccessibilityConfig());
            }
            this.view.flxDialogs.setVisibility(true);
            this.view.CustomPopup1.btnNo.onClick = actions.negative;
            this.view.CustomPopup1.btnYes.onClick = actions.positive;
            var height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height;
            this.view.flxCancelPopup.height = height + "dp";
            this.view.flxCancelPopup.left = "0%";
            this.view.flxCancelPopup.setVisibility(true);
            this.view.CustomPopup1.lblHeading.setFocus(true);
            this.view.CustomPopup1.flxCross.onClick = function () {
                scopeObj.view.flxCancelPopup.left = "-100%";
                scopeObj.view.flxDialogs.setVisibility(false);
            };
        },
        /**
         * This method is used to dismiss the popup.
         */
        closeQuitScreen: function () {
            this.view.flxDialogs.setVisibility(false);
            this.view.flxCancelPopup.setVisibility(false);
        },
        /**
         * setPagination:   used to set pagination.
         * @param {obejct} data list of records
         * @param {function} previousCallBack -- previous button handler
         * @param {function}  nextCallBack -- next button handler
         */
        setPagination: function (data, previousCallBack, nextCallBack) {
            var scopeObj = this;
            if (data && data.show === true) {
                //this.view.flxPagination.setVisibility(true);
                var offset = data.offset;
                var limit = data.limit || OLBConstants.PAGING_ROWS_LIMIT;
                var recordsLength = data.recordsLength;
                commonUtilities.setText(this.view.tablePagination.lblPagination, (offset + 1) + " - " + (offset + recordsLength) + " " + data.text, commonUtilities.getaccessibilityConfig());
                if (data.offset > 0) {
                    scopeObj.view.tablePagination.flxPaginationPrevious.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                    scopeObj.view.tablePagination.flxPaginationPrevious.onClick = previousCallBack;
                } else {
                    scopeObj.view.tablePagination.flxPaginationPrevious.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                    scopeObj.view.tablePagination.flxPaginationPrevious.onClick = null;
                }
                if (recordsLength >= OLBConstants.PAGING_ROWS_LIMIT) {
                    scopeObj.view.tablePagination.flxPaginationNext.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                    scopeObj.view.tablePagination.flxPaginationNext.onClick = nextCallBack;
                } else {
                    scopeObj.view.tablePagination.flxPaginationNext.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                    scopeObj.view.tablePagination.flxPaginationNext.onClick = null;
                }
            } else {
                scopeObj.view.flxPagination.setVisibility(false);
                scopeObj.view.tablePagination.flxPaginationPrevious.onClick = null;
                scopeObj.view.tablePagination.flxPaginationNext.onClick = null;
            }
        },
        fetchPaginatedRecords: function (offset, limit) {
            this.view.BeneficiaryList.onPagination(offset, limit);
        },
        onResetPagination: function () {
            this.view.pagination.resetStartIndex();
        },
        updatePaginationBar: function (paginatedRecordsLength, totalNoOfRecords) {
            this.view.pagination.updatePaginationBar(paginatedRecordsLength, totalNoOfRecords);
        },
        showPagination: function () {
            this.view.pagination.setVisibility(true);
        },
        hidePagination: function () {
            this.view.pagination.setVisibility(false);
        }
    };
});