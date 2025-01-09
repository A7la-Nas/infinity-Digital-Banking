define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    var orientationHandler = new OrientationHandler();
    return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onTouchEnd = this.formOnTouchEndHandler;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "ManageActivitiesUIModule"});
            this.Europresenter = applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferEurUIModule"});
            this.initActions();
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.DeletePopup.onBreakpointChangeComponent(scope.view.DeletePopup, width);
            //commenting the below method and adding the required method in form on touch end handler
            // FormControllerUtility.setupFormOnTouchEnd(width);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        onNavigate: function() {
            var scope = this;
            var params = {};
             var tokenParams = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.security_attributes;
            var accounts = this.getAccountMap(applicationManager.getAccountManager().getInternalAccounts());
			var isCombinedUser = this.getCombinedUserFlag(accounts);
            params.entitlement = {};
            params.accounts = accounts;
            params.isCombinedUser = isCombinedUser;
            params.entitlement.features = JSON.parse(tokenParams.features);
            params.entitlement.permissions = JSON.parse(tokenParams.permissions);
            this.view.tabs.setContext(params);
            var selectedTab = this.view.tabs.tabDefaultSelected;
            this.view.tabs.setSelectedTab(selectedTab);
            var paginationDetails = this.view.pagination.getDefaultOffsetAndLimit();
            this.view.tabs.onError = this.onError;
            this.view.tabs.onTabClick = this.onTabClick;
            this.view.SearchAndFilter.onError = this.onError;
            this.view.SearchAndFilter.onSearchDone = this.onSearchDone;
            this.view.SearchAndFilter.onFilterSelect = this.onFilterSelect;
            this.view.pagination.fetchPaginatedRecords = this.fetchPaginatedRecords;
            this.view.pagination.onError = this.onError;
            this.view.List.updatePaginationBar = this.updatePaginationBar;
            this.view.List.onResetPagination = this.onResetPagination;
            params.tabSelected = selectedTab;
            // params.defaultFilter = "All";
            params.offset = paginationDetails.offset;
            params.limit = paginationDetails.limit;
            this.view.List.showCancelPopup = this.showCancelPopup;
            this.view.List.showPagination = this.showPagination;
            this.view.List.hidePagination = this.hidePagination;
            this.view.List.onError = this.onError;
            this.view.List.setFormScope(scope);
            this.view.List.setFormContext(params);
            this.view.List.onButtonAction = this.onButtonAction;
            this.view.List.viewAttachment = this.viewAttachment;
            this.view.GenericMessageNew.closepopup = this.closepopup;
            this.view.flxSuccessMessage.setVisibility(false);
            this.view.flxDowntimeWarning.setVisibility(false);
        },
		getAccountMap: function(accounts){
			var accountMap = {};
            accounts.forEach(function(account) {
            accountMap[account.accountID] = account.isBusinessAccount;
            });
            return accountMap;
        },
      
		getCombinedUserFlag: function(accountMap) {
			let booleanSet = new Set();
			for (let key in accountMap) {
				booleanSet.add(accountMap[key]);
			}
        return (booleanSet.size > 1) ? "true" : "false";
       },
        preShow: function () {
            this.view.customheadernew.activateMenu("EUROTRANSFERS", "Manage Payments");
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
            this.view.btnByPass.onClick = this.byPassFun;
        },

        // {
        //   widget:"",
        //   hideFunction : "",
        //   shouldBeVisible: false
        // },
        touchEndSubscribers : new Map(),

        formOnTouchEndHandler: function(){
            //when a user clicks on dropdown item onTouchEnd is triggered first and click is not registered
            //this delay postpones the onTouchEnd so that the click is registered
            kony.timer.schedule("touchEndTimer", this.hideSubscribedWidgetsIfVisible, 0.1, false);
            FormControllerUtility.hidePopupsNew();
        },

        hideSubscribedWidgetsIfVisible: function() {
            this.touchEndSubscribers.forEach((value, key, map) =>{
                if (value.shouldBeVisible) {
                    value.shouldBeVisible = false;
                    kony.print("**~~**"+key+" has shouldBeVisible is true, so set it up as false and not hiding it");
                    return;
                }
                else if (value.widget.isVisible) {
                    value.hideFunction();
                    kony.print("**~~**"+key+" hidden");
                    return;
                }
                kony.print("**~~**"+key+" is not visible");
            })
        },

        subscribeToTouchEnd : function(subscriberKey,subscriberValue){
            if (this.touchEndSubscribers.has(subscriberKey)) {
            kony.print("same key exists");
            return false;
            }
            let value = {
            widget : subscriberValue.widget,
            hideFunction : subscriberValue.hideFunction,
            shouldBeVisible : subscriberValue.shouldBeVisible
            }
            this.touchEndSubscribers.set(subscriberKey,value);
            return true;
        },

        updateTouchEndSubscriber:function(subscriberKey,subscriberValue){
            if (!this.touchEndSubscribers.has(subscriberKey)) {
            kony.print("key doesn't exist");
            return false;
            }
            let value = this.touchEndSubscribers.get(subscriberKey);
            if (subscriberValue.shouldBeVisible !== undefined && subscriberValue.shouldBeVisible !== null) {
            value.shouldBeVisible = subscriberValue.shouldBeVisible;
            this.touchEndSubscribers.set(subscriberKey,value);
            return true;
            }
            kony.print("Can only update shouldBeVisible");
            return false;
        },
        byPassFun: function () {
            this.view.flxNewPayment.setActive(true);
        },
        postShow: function () {
            var scopeObj = this;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.view.CustomPopup.onKeyPress = this.popUpDismiss;
            this.view.CustomPopup1.onKeyPress = this.popUpDismiss;
            this.view.CustomPopup1.doLayout = CommonUtilities.centerPopupFlex;
            this.view.customheadernew.btnSkipNav.onClick = function () {
                scopeObj.view.lblManagePayments.setActive(true);
            };
          	this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            // this.view.flxDialogs.isVisible = false;
            this.view.flxMain.accessibilityConfig = {
                a11yARIA:{
                    "tabindex": -1,
                    "role":"main"
                }
            }
            this.view.flxFormContent.accessibilityConfig = {
                a11yARIA:{
                    "tabindex": -1,
                }
            }
            this.view.flxMainContainer.accessibilityConfig = {
                a11yARIA:{
                    "tabindex": -1,
                }
            }
        },
        popUpDismiss: function(a, b) {
            if (b.keyCode === 27) {
                this.view.customheadernew.onKeyPressCallBack(a, b);
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxDialogs.setVisibility(false);
                    this.view.flxLogout.setVisibility(false);
                    this.view.customheadernew.btnLogout.setFocus(true);
                }
                if(this.view.flxDownloadReportPopup.isVisible === true){
                    this.toggleDownloadReportPopup(false);
                }
            }
        },
        initActions: function() {
            var scopeObj = this;
            this.view.flxNewPayment.onClick = function() {
                scopeObj.Europresenter.showTransferScreen({
                    context: "MakePayment"
                })
            };
            this.view.flxPaymentActivities.onClick = function() {
                scopeObj.ManageActivitiesPresenter.showTransferScreen({
                    context: ""
                })
            };
            this.view.flxManageBeneficiaries.onClick = function() {
                scopeObj.ManageActivitiesPresenter.showTransferScreen({
                    context: "ManageBeneficiaries"
                })
            };
            this.view.SearchAndFilter.subscribeToTouchEnd = this.subscribeToTouchEnd;
            this.view.SearchAndFilter.updateTouchEndSubscriber = this.updateTouchEndSubscriber;
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
      updateFormUI: function(viewModel) {
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
        /***
         * onError event - Tabs component
         * @params {Object} err 
         ***/
        onError: function(err) {
            kony.application.dismissLoadingScreen();
            this.view.flxDowntimeWarning.setVisibility(true);
			this.view.flxSuccessMessage.setVisibility(false);
			this.view.rtxDowntimeWarning.text = err.dbpErrMsg;
        },
        /**
         * onTabClick event - Tabs component
         * @params {String} tabId - Id of the tabs that is clicked
         **/
        onTabClick: function(tabId) {
            console.log(tabId);
            var scopeObj = this;
            if (tabId === "transfersTab") {
                scopeObj.ManageActivitiesPresenter.showTransferScreen({
                    context: "PastPayments"
                });
            } else if (tabId === "recurringTab") {
                scopeObj.ManageActivitiesPresenter.showTransferScreen({
                    context: "ScheduledPayments"
                });
            } else if (tabId === "directDebitsTab") {
                scopeObj.ManageActivitiesPresenter.showTransferScreen({
                    context: "DirectDebits"
                });
            }
        },
        /**
         * Method to handle onDone event of Search Textbox
         * @param {String} searchKeyword - contains entered text in Search Textbox
         */
        onSearchDone: function(searchKeyword) {
            FormControllerUtility.showProgressBar(this.view);
            this.view.List.onSearch(searchKeyword);
        },
        /**
         * Method to handle onRowClick event of Filter Dropdown
         * @param {String} selectedFilter - contains selected filter info
         */
        onFilterSelect: function(selectedFilter) {
          	FormControllerUtility.showProgressBar(this.view);
            this.view.List.onFilter(selectedFilter);
        },
        fetchPaginatedRecords: function(offset, limit) {
            this.view.List.onPagination(offset, limit);
        },
        onResetPagination: function() {
            this.view.pagination.resetStartIndex();
        },
        updatePaginationBar: function(paginatedRecordsLength, totalNoOfRecords) {
            this.view.flxFormContent.setContentOffset({ x: "0%", y: "0%" }, true);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.pagination.updatePaginationBar(paginatedRecordsLength, totalNoOfRecords);
        },
        showPagination: function() {
            this.view.pagination.setVisibility(true);
        },
        hidePagination: function() {
            this.view.pagination.setVisibility(false);
        },
        showCancelPopup: function(response) {
            if (kony.sdk.isNullOrUndefined(response.dbpErrMsg)) {
                 response.i18n = (response.status === "Pending" ? kony.i18n.getLocalizedString("i18n.Transfers.CancelTransactionApprovalMessage") : kony.i18n.getLocalizedString("i18n.Transfers.CancelTransactionSuccessMessage")) + " " + kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber:") + " " + response.referenceId || response.transactionId;
            }else{
                response.i18n = kony.i18n.getLocalizedString("i18n.Transfers.CancelTransactionFailureMessage");
            }
            this.view.flxSuccessMessage.setVisibility(true);
            this.view.GenericMessageNew.setContext(response);
            this.view.SearchAndFilter.resetComponent();
        },
        closepopup: function() {
            this.view.flxSuccessMessage.setVisibility(false);
        },
        /**
         * Method to handle button onClick event
         * @param {String} buttonId - contains clicked button id
         * @param {Object} data - contains service response data
         */
        onButtonAction: function(buttonId, data) {
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
        executeEdit: function(dataItem) {
            var scopeObj = this;
            if (dataItem.transactionType === "InternalTransfer") {
                scopeObj.Europresenter.showTransferScreen({
                    "context": "MakePaymentOwnAccounts",
                    "editTransaction": dataItem
                });
            } else {
                scopeObj.Europresenter.showTransferScreen({
                    "context": "MakePayment",
                    "editTransaction": dataItem
                });
            }

        },
        executeRepeat: function(dataItem) {
            var scopeObj = this;
            if (scope_configManager.TransferFlowType === "CTF") {
                if (dataItem.transactionType === "InternalTransfer") {
                    scopeObj.Europresenter.showTransferScreen({
                        "context": "MakePaymentOwnAccounts",
                        "editTransaction": dataItem
                    });
                } else {
                    scopeObj.Europresenter.showTransferScreen({
                        "context": "MakePayment",
                        "editTransaction": dataItem
                    });
                }
            } else {
                var frmName = "", transferType = "", isP2PFlow = false;
                if (dataItem.serviceName === "INTRA_BANK_FUND_TRANSFER_CREATE" || dataItem.serviceName === "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE") {
                    frmName = "frmUTFSameBankTransfer";
                    transferType = "Same Bank";
                } else if (dataItem.serviceName === "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") {
                    frmName = "frmUTFDomesticTransfer";
                    transferType = "Domestic Transfer";
                } else if (dataItem.serviceName === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") {
                    frmName = "frmUTFInternationalTransfer";
                    transferType = "International Transfer";
                } else {
                    isP2PFlow = true;
                    frmName = { appName: "TransfersMA", friendlyName: "frmUTFP2PTransfer" };
                    transferType = "Pay a Person";
                }
                const context = {
                    "transferType": transferType,
                    "transferFlow": "Repeat",
                    "transactionObject": dataItem
                };
                if (isP2PFlow) {
                    if (applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")) {
                        applicationManager.getNavigationManager().navigateTo(frmName, false, context);
                    }
                } else {
                    const navObj = {
                        context: this,
                        params: context,
                        callbackModelConfig: {
                        "frm": frmName,
                        "UIModule": "UnifiedTransferFlowUIModule",
                        "appName": "TransfersMA"
                        }
                    };
                    kony.mvc.getNavigationManager().navigate(navObj);
                }
            }
        },
        executeViewAttachment: function(fileNames) {
            var scopeObj = this;
            this.view.setContentOffset({
                x: "0%",
                y: "0%"
            }, true);
            scopeObj.view.flxDialogs.setVisibility(true);
            this.attachments = fileNames;
            scopeObj.view.flxDownloadsPopup.setVisibility(true);
            scopeObj.view.btnDownload.text = (fileNames.length === 1) ? kony.i18n.getLocalizedString("i18n.common.Download") : kony.i18n.getLocalizedString("i18n.common.DownloadAll");
            scopeObj.view.btnDownload.toolTip = scopeObj.view.btnDownload.text;
            scopeObj.view.flxButtons.btnCancel.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxDownloadsPopup.setVisibility(false);
            };
            scopeObj.view.flxButtons.btnDownload.onClick = function() {
                if (fileNames.length > 0) {
                    var count = 0;
                    FormControllerUtility.showProgressBar(this.view);
                    for (var i = 0; i < fileNames.length; i++) {
                        setTimeout(scopeObj.ManageActivitiesPresenter.downloadAttachments.bind(this, false, fileNames, i, "frmPastPaymentsEurNew"), count);
                        count += 1000;
                    }
                    FormControllerUtility.hideProgressBar(this.view);
                }
            };
            this.setDownloadSegmentData(fileNames);
        },
        downloadSingleFile: function(dataItem) {
            var scopeObj = this;
            scopeObj.ManageActivitiesPresenter.downloadAttachments(true, dataItem, 0, "frmPastPaymentsEurNew");
        },
        setDownloadSegmentData: function(filesList) {
            var scopeObj = this;
            var downloadAttachmentsData = [];
            for (var i = 0; i < filesList.length; i++) {
                downloadAttachmentsData[i] = {};
                downloadAttachmentsData[i].filename = filesList[i].fileName;
                downloadAttachmentsData[i]["imgDownloadAttachment"] = {
                    src: "download_blue.png",
                    cursorType: 'pointer',
                    toolTip: kony.i18n.getLocalizedString("i18n.common.Download"),
                    onTouchEnd: scopeObj.downloadSingleFile.bind(scopeObj, filesList[i])
                };
            }
            scopeObj.view.segDownloadItems.widgetDataMap = {
                "lblDownloadAttachment": "filename",
                "imgDownloadAttachment": "imgDownloadAttachment",
            };
            scopeObj.view.segDownloadItems.setData(downloadAttachmentsData);
        },
        downloadAttachmentsFile: function(fileUrl) {
            FormControllerUtility.showProgressBar(this.view);
            var data = {
                "url": fileUrl
            };
            CommonUtilities.downloadFile(data);
            FormControllerUtility.hideProgressBar(this.view);
        },
		showDownloadError: function(response){
           this.view.flxSuccessMessage.setVisibility(true);
           this.view.GenericMessageNew.setContext(response.serverErrorRes);
        },
        viewAttachment: function(transactionId, viewAttachmentCallback) {
            this.ManageActivitiesPresenter.retrieveAttachments(transactionId, viewAttachmentCallback);
        },
      toggleDownloadReportPopup: function(flag) {
        this.view.flxDialogs.setVisibility(flag);
        this.view.flxDownloadReportPopup.setVisibility(flag);
        if(flag === false){
            this.view.List.setbackPopupFocus();
        }   
        if(this.view.flxDownloadReportPopup.isVisible === true){
            this.view.CustomPopup1.lblHeading.setActive(true);
            this.view.CustomPopup1.isModalContainer = true;
        }
      },
      downloadReport: function(data) {
        var scope = this;
        this.toggleDownloadReportPopup(true);
        this.view.CustomPopup1.flxCross.accessibilityConfig = {
            a11yLabel: "Close this download Report dialog",
            a11yARIA: {
              tabindex: 0,
              role: "button"
            }
          };
         this.view.CustomPopup1.btnNo.accessibilityConfig = {
            a11yLabel: "No, don't download this report ",
            a11yARIA: {
              tabindex: 0,
              role: "button"
            }
          };
         this.view.CustomPopup1.btnYes.accessibilityConfig = {
            a11yLabel: "yes, download this report",
            a11yARIA: {
              tabindex: 0,
              role: "button"
            }
          };
        this.view.CustomPopup1.flxCross.onClick = this.toggleDownloadReportPopup.bind(scope,false);
        this.view.CustomPopup1.btnNo.onClick = this.toggleDownloadReportPopup.bind(scope,false);
        this.view.CustomPopup1.btnYes.onClick = function() {
          scope.toggleDownloadReportPopup(false);
          scope.ManageActivitiesPresenter.downloadReport(data, scope.view.id);
        };
      }
    };
});