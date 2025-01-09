define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    var orientationHandler = new OrientationHandler();
    var pageNumber;
    var totalNoOfRecords;
    var recordsPerPage = 10;
    var records = [];
    var searchView;
    var filesToBeDownloaded = [];
    var transactionObject = {};
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
        },
        onNavigate: function() {
            var scope = this;
            var params = {};
            var tokenParams = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.security_attributes;
            var isCombinedUser = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.user_attributes.isCombinedUser;
            params.entitlement = {};
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
            this.view.List.showPagination = this.showPagination;
            this.view.List.hidePagination = this.hidePagination;
            this.view.List.showCancelPopup = this.showCancelPopup;
			this.view.List.showSkipPopup = this.showSkipPopup;
            this.view.List.onError = this.onError;
            this.view.List.setFormScope(scope);
            this.view.List.setFormContext(params);
            this.view.List.onButtonAction = this.onButtonAction;
			this.view.GenericMessageNew.closepopup = this.closepopup;
			this.view.flxSuccessMessage.setVisibility(false);
            this.view.flxDowntimeWarning.setVisibility(false);
        },
        preShow: function() {
            this.view.customheadernew.activateMenu("EUROTRANSFERS", "Manage Payments");
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
            this.view.customheadernew.btnSkipNav.onClick = this.skipNav;
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.flxDialogs.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.btnByPass.onClick = this.byPassBlock;
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.DeletePopup.doLayout = CommonUtilities.centerPopupFlex;
        },
        skipNav: function(){
          this.view.lblManagePayments.setActive(true);
        },
        byPassBlock: function(){
          this.view.flxNewPayment.setActive(true);
        },
        onKeyPressCallBack: function (eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
              if (self.view.flxLogout.isVisible === true) {
                 self.view.flxLogout.isVisible = false;
                 self.view.flxDialogs.isVisible = false;
                 self.view.customheadernew.btnLogout.setFocus(true);
              }
              if (self.view.flxDeletePopup.isVisible === true) {
                 self.view.flxDeletePopup.isVisible = false;
                 self.view.flxDialogs.isVisible = false;
              }
            }
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.accessibilityFocusSetup();
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [];
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
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
        },
        /***
         * onError event - Tabs component
         * @params {Object} err 
         ***/
      onError: function(err) {
        FormControllerUtility.hideProgressBar(this.view);
        this.view.flxDowntimeWarning.setVisibility(true);
        this.view.flxSuccessMessage.setVisibility(false);
        this.view.rtxDowntimeWarning.text = err.dbpErrMsg || err.errorInfo;
      },
        /**
         * onTabClick event - Tabs component
         * @params {String} tabId - Id of the tabs that is clicked
         **/
        onTabClick: function(tabId) {
            kony.print(tabId);
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
        showCancelPopup: function (response) {
            if (response.messageDetails || response.message) {
            response.i18n = kony.i18n.getLocalizedString("i18n.DirectDebits.Cancel") + " " + response.orderId;}
            else{response.i18n =  kony.i18n.getLocalizedString("i18n.DirectDebits.CancelDirectDebit");}
            this.view.flxSuccessMessage.setVisibility(true);
            this.view.GenericMessageNew.setContext(response);
            this.view.SearchAndFilter.resetComponent();
            
        },
		showSkipPopup: function(response) {
            if (response.messageDetails || response.message) {
            response.i18n = kony.i18n.getLocalizedString("i18n.DirectDebits.SkipPayment") + " " + response.orderId;
            }else{
                response.i18n = kony.i18n.getLocalizedString("i18n.DirectDebits.CancelSkipPayment");
            }
            this.view.flxSuccessMessage.setVisibility(true);
            this.view.GenericMessageNew.setContext(response);
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
            switch (buttonId) {}
        },
    };
});
