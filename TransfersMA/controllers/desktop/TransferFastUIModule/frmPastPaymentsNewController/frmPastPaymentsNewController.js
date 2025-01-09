define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    var orientationHandler = new OrientationHandler();
    var pageNumber;
    var totalNoOfRecords;
    var recordsPerPage = 10;
    var records = [];
    var searchView;
    var filesToBeDownloaded = [];
    var transactionObject = {};
    return {
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            this.initActions();
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.DeletePopup.onBreakpointChangeComponent(scope.view.DeletePopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        onNavigate: function () {
            var scope = this;
            var params = {};
            var tokenParams = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.security_attributes;
            //var isCombinedUser = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.user_attributes.isCombinedUser;
            var accounts = this.getAccountMap(applicationManager.getAccountManager().getInternalAccounts());
            var isCombinedUser = this.getCombinedUserFlag(accounts);
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            params.entitlement = {};
            params.isCombinedUser = isCombinedUser;
            params.accounts = accounts;
            params.entitlement.features = JSON.parse(tokenParams.features);
            params.entitlement.permissions = JSON.parse(tokenParams.permissions);
            this.view.tabs.setContext(params);
            var selectedTab = this.view.tabs.tabDefaultSelected;
            var paginationDetails = this.view.pagination.getDefaultOffsetAndLimit();
            this.view.tabs.setSelectedTab(selectedTab);
            this.view.tabs.onError = this.onError;
            this.view.tabs.onTabClick = this.onTabClick;
            this.view.SearchAndFilter.onError = this.onError;
            this.view.SearchAndFilter.onSearchDone = this.onSearchDone;
            this.view.SearchAndFilter.onFilterSelect = this.onFilterSelect;
            this.view.pagination.fetchPaginatedRecords = this.fetchPaginatedRecords;
            this.view.pagination.onError = this.onError;
            this.view.List.updatePaginationBar = this.updatePaginationBar;
            this.view.List.onResetPagination = this.onResetPagination;
            this.view.List.showCancelPopup = this.showCancelPopup;
            params.tabSelected = selectedTab;
            // params.defaultFilter = "All";
            params.offset = paginationDetails.offset;
            params.limit = paginationDetails.limit;
            this.view.List.showPagination = this.showPagination;
            this.view.List.hidePagination = this.hidePagination;
            this.view.List.onError = this.onError;
            this.view.List.onButtonAction = this.onButtonAction;
            this.view.List.setFormScope(scope);
            this.view.List.setFormContext(params);
            this.view.List.viewAttachment = this.viewAttachment;
        },
        getAccountMap: function (accounts) {
            var accountMap = {};
            accounts.forEach(function (account) {
                accountMap[account.accountID] = account.isBusinessAccount;
            });
            return accountMap;
        },
        getCombinedUserFlag: function (accountMap) {
            let booleanSet = new Set();
            for (let key in accountMap) {
                booleanSet.add(accountMap[key]);
            }
            return (booleanSet.size > 1) ? "true" : "false";
        },
      preShow: function () {
        var scopeObj = this;
        this.view.customheadernew.activateMenu("EUROTRANSFERS", "Manage Payments");
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        this.view.flxSuccessMessage.setVisibility(false);
        scopeObj.view.customheadernew.activateMenu("FASTTRANSFERS", "Transfer Money");
        this.view.customheadernew.btnSkipNav.onClick = function () {
            scopeObj.view.lblManagePayments.setActive(true);

        };
        this.view.btnByPass.onClick = this.byPassFun;
        this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
        this.view.CustomPopup.onKeyPress = this.popUpDismiss;
      },
      byPassFun: function () {
        this.view.flxAddaccountHeader.setActive(true);
    },
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.view.customheadernew.lblHeaderMobile.skin="bbSknLbl42424215pxSemibold";
            //this.accessibilityFocusSetup();
        },
        popUpDismiss: function(a, b) {
            if (b.keyCode === 27) {
                this.view.customheadernew.onKeyPressCallBack(a, b);
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxDialogs.setVisibility(false);
                    this.view.flxLogout.setVisibility(false);
                    this.view.customheadernew.btnLogout.setFocus(true);
                }
                // if(this.view.flxDownloadReportPopup.isVisible === true){
                //     this.toggleDownloadReportPopup(false);
                // }
            }
        },
        showInternalAccFlx: function () {
            this.view.flxAddaccountHeader.setVisibility(true);
        },
        hideInternalAccFlx: function () {
            this.view.flxAddaccountHeader.setVisibility(false);
            this.view.flxSeperator.setVisibility(false);
        },
        showExternalAccFlx: function () {
            this.view.flxAddKonyAccount.setVisibility(true);
        },
        hideExternalAccFlx: function () {
            this.view.flxAddKonyAccount.setVisibility(false);
            this.view.flxSperator2.setVisibility(false);
        },
        showInternationalAccFlx: function () {
            this.view.flxAddNonKonyAccount.setVisibility(true);
        },
        hideInternationalAccFlx: function () {
            this.view.flxAddNonKonyAccount.setVisibility(false);
            this.view.flxSeperator3.setVisibility(false);
        },
        showP2PAccFlx: function () {
            this.view.flxAddInternationalAccount.setVisibility(true);
        },
        hideP2PAccFlx: function () {
            this.view.flxAddInternationalAccount.setVisibility(false);
            this.view.flxSeparator4.setVisibility(false);
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function () {
            let widgets = [
                [this.view.txtSearch, this.view.flxtxtSearchandClearbtn]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        initActions: function () {
            var scopeObj = this;
            var userPreferenceManager = applicationManager.getUserPreferencesManager();
            this.view.flxAddaccountHeader.onClick = function () {
                scopeObj.addInternalAccount();
            };
            this.view.flxAddKonyAccount.onClick = function () {
                scopeObj.addExternalAccount();
            };
            this.view.flxAddNonKonyAccount.onClick = function () {
                scopeObj.addInternationalAccount();
            };
            if (userPreferenceManager.profileAccess === "business" || (userPreferenceManager.primaryCustomerId.type === "business" && userPreferenceManager.singleCustomerProfile === true)) this.view.flxAddInternationalAccount.setVisibility(false);
            this.view.flxAddInternationalAccount.onClick = function () {
                scopeObj.addP2PAccount();
            };
            this.view.flxCross.onClick = function () {
                scopeObj.view.flxSuccessMessage.setVisibility(false);
            };
        },
        closePopup: function () {
            this.view.flxDialogs.setVisibility(false);
            this.view.flxDownloadsPopup.setVisibility(false);
        },
        /***
         * onError event - Tabs component
         * @params {Object} err 
         ***/
        onError: function (err) {
            kony.application.dismissLoadingScreen();
           kony.print(JSON.stringify(err));
        },
        addInternalAccount: function () {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController.showTransferScreen({
                initialView: "addDBXAccount"
            });
        },
        addExternalAccount: function () {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController.showTransferScreen({
                initialView: "addExternalAccount"
            });
        },
        addInternationalAccount: function () {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController.showTransferScreen({
                initialView: "addInternationalAccount"
            });
        },
        addP2PAccount: function () {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController.showTransferScreen({
                initialView: "addRecipient"
            });
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.transactionDownloadFile) {
                this.downloadAttachmentsFile(viewModel.transactionDownloadFile);
            }
            if (viewModel.downloadError) {
                this.showDownloadError(viewModel.downloadError);
            }
        },
        /**
         * onTabClick event - Tabs component
         * @params {String} tabId - Id of the tabs that is clicked
         **/
        onTabClick: function (tabId) {
            console.log(tabId);
            var scopeObj = this;
            if (tabId === "transfersTab") {
                scopeObj.presenter.showTransferScreen({
                    initialView: "PastPayments"
                });
            } else if (tabId === "recurringTab") {
                scopeObj.presenter.showTransferScreen({
                    initialView: "ScheduledPayments"
                }); //context: "ScheduledPayments"
            } else if (tabId === "directDebitsTab") {
                scopeObj.presenter.showTransferScreen({
                    initialView: "DirectDebits"
                });
            }
        },
        /**
         * Method to handle button onClick event
         * @param {String} buttonId - contains clicked button id
         * @param {Object} data - contains service response data
         */
        onButtonAction: function (buttonId, data) {
            switch (buttonId) {
                case "Edit":
                    this.executeEdit(data);
                    break;
                case "Repeat":
                    this.executeRepeat(data);
                    break;
                case "View Attachment":
                    this.executeViewAttachment(data);
                    break;
                case "Download Report":
                    this.downloadReport(data);
                    break;
            }
        },
        /**
         * Method to handle onDone event of Search Textbox
         * @param {String} searchKeyword - contains entered text in Search Textbox
         */
        onSearchDone: function (searchKeyword) {
            this.view.List.onSearch(searchKeyword);
        },
        /**
         * Method to handle onRowClick event of Filter Dropdown
         * @param {String} selectedFilter - contains selected filter info
         */
        onFilterSelect: function (selectedFilter) {
            this.view.List.onFilter(selectedFilter);
        },
        fetchPaginatedRecords: function (offset, limit) {
            this.view.List.onPagination(offset, limit);
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
        },
        executeEdit: function (dataItem) {
            var scopeObj = this;
            scopeObj.presenter.showTransferScreen({
                "initialView": "Editpayment",
                "editTransaction": dataItem
            });
        },
        executeRepeat: function (dataItem) {
            var scopeObj = this;
            scopeObj.presenter.showTransferScreen({
                "initialView": "Repeatpayment",
                "repeatTransaction": dataItem
            });
        },
        executeViewAttachment: function (dataItem) {
            var scopeObj = this;
            filesToBeDownloaded = dataItem.fileNames;
            transactionObject = dataItem;
            this.view.setContentOffset({
                x: "0%",
                y: "0%"
            }, true);
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxDownloadsPopup.setVisibility(true);
            if (filesToBeDownloaded.length === 1) scopeObj.view.btnDownload.text = kony.i18n.getLocalizedString("i18n.common.Download");
            else scopeObj.view.btnDownload.text = kony.i18n.getLocalizedString("i18n.common.DownloadAll");
            scopeObj.view.flxButtons.btnCancel.onClick = function () {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxDownloadsPopup.setVisibility(false);
            };
            scopeObj.view.flxButtons.btnDownload.onClick = function () {
                if (dataItem.fileNames.length > 0) {
                    var count = 0;
                    FormControllerUtility.showProgressBar(this.view);
                    for (var i = 0; i < dataItem.fileNames.length; i++) {
                        setTimeout(scopeObj.presenter.downloadAttachments.bind(this, null, dataItem, i), count);
                        count += 1000;
                    }
                    FormControllerUtility.hideProgressBar(this.view);
                }
            };
            this.setDownloadSegmentData(dataItem.fileNames);
        },
        setDownloadSegmentData: function (filesList) {
            var scopeObj = this;
            var downloadAttachmentsData = [];
            for (var i = 0; i < filesList.length; i++) {
                downloadAttachmentsData[i] = {};
                downloadAttachmentsData[i].filename = filesList[i].fileName;
                downloadAttachmentsData[i]["imgDownloadAttachment"] = {
                    "src": "download_blue.png"
                };
            }
            scopeObj.view.segDownloadItems.widgetDataMap = {
                "lblDownloadAttachment": "filename",
                "imgDownloadAttachment": "imgDownloadAttachment",
            };
            scopeObj.view.segDownloadItems.setData(downloadAttachmentsData);
        },
        showCancelPopup: function (response) {
            if (response.dbpErrMsg) {
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.flxSuccessMessage.setVisibility(false);
                this.view.rtxDowntimeWarning.text = response.dbpErrMsg;
            } else {
                this.view.flxSuccessMessage.setVisibility(true);
                this.view.flxDowntimeWarning.setVisibility(false);
                this.view.lblRefrenceNumberValue.text = response.referenceId || response.transactionId;
                this.view.lblSuccessAcknowledgement.text = response.status === "Pending" ? kony.i18n.getLocalizedString("i18n.Transfers.CancelTransactionApprovalMessage") : kony.i18n.getLocalizedString("i18n.Transfers.CancelTransactionSuccessMessage");
            }
            this.view.SearchAndFilter.resetComponent();
        },
        downloadAttachmentsFile: function (fileUrl) {
            FormControllerUtility.showProgressBar(this.view);
            var data = {
                "url": fileUrl
            };
            CommonUtilities.downloadFile(data);
            FormControllerUtility.hideProgressBar(this.view);
        },
        showDownloadError: function (response) {
            if (response.errorMessage) {
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.flxSuccessMessage.setVisibility(false);
                this.view.rtxDowntimeWarning.text = response.errorMessage;
            }
        },
        viewAttachment: function (transactionId, viewAttachmentCallback) {
            this.presenter.retrieveAttachments(transactionId, viewAttachmentCallback);
        },
      toggleDownloadReportPopup: function(flag) {
        this.view.flxDialogs.setVisibility(flag);
        this.view.flxDownloadReportPopup.setVisibility(flag);
      },
      downloadReport: function(data) {
        var scope = this;
        this.toggleDownloadReportPopup(true);
        this.view.btnClose.onClick = this.toggleDownloadReportPopup.bind(scope,false);
        this.view.btnDownloadCancel.onClick = this.toggleDownloadReportPopup.bind(scope,false);
        this.view.btnProceed.onClick = function() {
          scope.toggleDownloadReportPopup(false);
          scope.ManageActivitiesPresenter.downloadReport(data, scope.view.id);
        };
      }
    };
});