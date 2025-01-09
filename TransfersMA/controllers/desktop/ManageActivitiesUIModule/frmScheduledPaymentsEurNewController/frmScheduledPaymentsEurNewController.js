define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    var orientationHandler = new OrientationHandler();
    return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
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
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.btnSkipRight.isVisible = this.view.flxRight.isVisible? true : false;
        },

    onNavigate: function () {
      var scope = this;
      var params = {};
      var tokenParams = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.security_attributes;
      this.ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "ManageActivitiesUIModule"});
      var accounts = this.getAccountMap(applicationManager.getAccountManager().getInternalAccounts());
      var isCombinedUser = this.getCombinedUserFlag(accounts);
      params.entitlement = {};
      params.accounts = accounts;
      params.isCombinedUser = isCombinedUser;
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
      params.tabSelected = selectedTab;
      // params.defaultFilter = "All";
      params.offset = paginationDetails.offset;
      params.limit =  paginationDetails.limit;
      this.view.List.showCancelPopup = this.showCancelPopup;
      this.view.List.showPagination = this.showPagination;
      this.view.List.hidePagination = this.hidePagination;
      this.view.List.onError = this.onError;
      this.view.List.onButtonAction = this.onButtonAction;
      this.view.List.viewAttachment = this.viewAttachment;
      this.view.flxSuccessMessage.setVisibility(false);
      this.view.flxDowntimeWarning.setVisibility(false);
      this.view.GenericMessageNew.closepopup = this.closeSuccessPopup;
      this.view.List.setFormScope(scope);
      this.view.List.setFormContext(params);
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
      var scope = this;
      this.view.customheadernew.activateMenu("EUROTRANSFERS", "Manage Payments");
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
      scope.setAccessibility();
      scope.view.btnSkipRight.onClick = function() {
        scope.view.btnNewPayment.setFocus(true);
      };
      scope.view.customheadernew.btnSkipNav.onClick = function() {
        scope.view.lblManagePayments.setActive(true);
      };
      this.view.flxLeft.doLayout = function(){
        this.view.flxPagination.top = this.view.flxLeft.frame.height + "dp";
      }.bind(this);
    },
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      applicationManager.executeAuthorizationFramework(this);
      this.accessibilityFocusSetup();
    },
    /**
     * Set foucs handlers for skin of parent flex on input focus 
     */
    accessibilityFocusSetup: function () {
      let widgets = [];
      for (let i = 0; i < widgets.length; i++) {
        CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
      }
    },
    initActions: function () {
      var scopeObj = this;
      this.view.btnNewPayment.onClick = function () { scopeObj.Europresenter.showTransferScreen({ context: "MakePayment" }) };
      this.view.flxPaymentActivities.onClick = function () { scopeObj.ManageActivitiesPresenter.showTransferScreen({ context: "" }) };
      this.view.btnManageBeneficiaries.onClick = function () { scopeObj.ManageActivitiesPresenter.showTransferScreen({ context: "ManageBeneficiaries" }) };
    },

    closePopup: function () {
      this.view.flxDialogs.setVisibility(false);
      this.view.flxDownloadsPopup.setVisibility(false);
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
      } else if (viewModel.transactionDownloadFile) {
        this.downloadAttachmentsFile(viewModel.transactionDownloadFile);
      }
    },
    /***
    * onError event - Tabs component
    * @params {Object} err 
    ***/
    onError: function (err) {
      kony.application.dismissLoadingScreen();
      this.view.flxDowntimeWarning.setVisibility(true);
      this.view.flxSuccessMessage.setVisibility(false);
      this.view.rtxDowntimeWarning.text = err.dbpErrMsg;
    },
    /**
    * onTabClick event - Tabs component
    * @params {String} tabId - Id of the tabs that is clicked
    **/
    onTabClick: function(tabId){
      console.log(tabId);
      var scopeObj = this;
      if(tabId==="transfersTab"){
        scopeObj.ManageActivitiesPresenter.showTransferScreen({ context: "PastPayments" }); 
      }else if(tabId==="recurringTab"){
         scopeObj.ManageActivitiesPresenter.showTransferScreen({ context: "ScheduledPayments" });
      }else if(tabId==="directDebitsTab"){
        scopeObj.ManageActivitiesPresenter.showTransferScreen({ context: "DirectDebits" });
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
        case "Download Advice":
          //this.executeViewAttachment(data);
          break;
      }
    },
    /**
     * Method to handle onDone event of Search Textbox
     * @param {String} searchKeyword - contains entered text in Search Textbox
     */
    onSearchDone: function (searchKeyword) {
     FormControllerUtility.showProgressBar(this.view);
      this.view.List.onSearch(searchKeyword);
    },
    /**
     * Method to handle onRowClick event of Filter Dropdown
     * @param {String} selectedFilter - contains selected filter info
     */
    onFilterSelect: function (selectedFilter) {
      FormControllerUtility.showProgressBar(this.view);
      this.view.List.onFilter(selectedFilter);
    },
    fetchPaginatedRecords: function (offset, limit) {
      this.view.List.onPagination(offset, limit);
    },
    onResetPagination: function () {
      this.view.pagination.resetStartIndex();
    },
    updatePaginationBar: function (paginatedRecordsLength, totalNoOfRecords) {
      this.view.flxFormContent.setContentOffset({ x: "0%", y: "0%" }, true);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.pagination.updatePaginationBar(paginatedRecordsLength, totalNoOfRecords);
    },
    showPagination: function(){
      this.view.pagination.setVisibility(true);
    },
     hidePagination: function(){
      this.view.pagination.setVisibility(false);
    },
    showCancelPopup: function(response) {
      if (kony.sdk.isNullOrUndefined(response.dbpErrMsg)) {
        response.i18n = (response.status === "Pending" ? kony.i18n.getLocalizedString("i18n.Transfers.CancelTransactionApprovalMessage") : kony.i18n.getLocalizedString("i18n.Transfers.CancelTransactionSuccessMessage")) +" " + kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber:") + " " + response.referenceId || response.transactionId;
      }else{
        response.i18n = kony.i18n.getLocalizedString("i18n.Transfers.CancelTransactionFailureMessage");
      }
      this.view.flxSuccessMessage.setVisibility(true);
      this.view.GenericMessageNew.setContext(response);
      this.view.SearchAndFilter.resetComponent();
    },
    
     closeSuccessPopup: function() {
      this.view.flxSuccessMessage.setVisibility(false);
    },
    executeEdit:function(dataItem){
      var scopeObj = this;
      if (scope_configManager.TransferFlowType === "CTF") {
        if (dataItem.transactionType === "InternalTransfer") {
          scopeObj.Europresenter.showTransferScreen({
            "context": "MakePaymentOwnAccounts",
            "editTransaction": dataItem
          });
        }
        else {
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
          "transferFlow": "Edit",
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
      scopeObj.view.flxDownloadsPopup.setVisibility(true);
      this.attachments = fileNames;
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
            setTimeout(scopeObj.ManageActivitiesPresenter.downloadAttachments.bind(this, false, fileNames, i, "frmScheduledPaymentsEurNew"), count);
            count += 1000;
          }
          FormControllerUtility.hideProgressBar(this.view);
        }
      };
      this.setDownloadSegmentData(fileNames);
    },
      downloadSingleFile: function(dataItem) {
        var scopeObj = this;
        scopeObj.ManageActivitiesPresenter.downloadAttachments(true, dataItem, 0, "frmScheduledPaymentsEurNew");
      },

    setDownloadSegmentData: function(filesList){
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
  
    viewAttachment: function(transactionId, viewAttachmentCallback) {
      this.ManageActivitiesPresenter.retrieveAttachments(transactionId, viewAttachmentCallback);
    },
   
    setAccessibility: function() {
      this.view.flxMain.accessibilityConfig = {
        "a11yARIA" : {
          "role" : "main",
          "tabindex" : -1
        }
      },
      this.view.flxNote.accessibilityConfig = {
        "a11yARIA" : {
          "role" : "status"
        }
      },
      this.view.flxNewPayment.accessibilityConfig = {
        "a11yARIA" : {
          "tabindex" : -1
        }
      },
	  this.view.flxPaymentActivities.accessibilityConfig = {
        "a11yARIA" : {
          "tabindex" : -1
        }
      },
      this.view.flxManageBeneficiaries.accessibilityConfig = {
        "a11yARIA" : {
          "tabindex" : -1
        }
      };      
    }
  };
});