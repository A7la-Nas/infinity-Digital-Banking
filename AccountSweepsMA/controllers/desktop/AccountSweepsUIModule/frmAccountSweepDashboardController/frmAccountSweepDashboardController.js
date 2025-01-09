define(["FormControllerUtility", "CommonUtilities", "OLBConstants", "ViewConstants"], function (FormControllerUtility, CommonUtilities, OLBConstants, ViewConstants) {
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let contentScope, contentPopupScope, titleActionScope;
    let isFilterApplied = false;
    let prevSelectedIndex;
    let sweepsData = {};
    let sweepAccData = [];
    let recordsPerPage;
    let pageNumber;
    let cancelContext;
    let isTablet = false;
	let selCustomer = "";
    return {
		offset: 0,
        lastRecord: '',
        /**
         * Sets the initial actions for form
         */
        cancelPopupData: {
            "lblPopupMessage": "${i18n{i18n.AccountSweep.DeactivatesweepFuture}}",
            "message": kony.i18n.getLocalizedString("i18n.AccountSweep.DeactivatesweepFuture"),
            "lblHeading": "${i18n{i18n.AccountSweep.CancelSweep}}",
            "heading": kony.i18n.getLocalizedString("i18n.AccountSweep.CancelSweep"),
            "btnNo": "${i18n{i18n.TradeSupplyFinance.Cancel}}",
            "noText": kony.i18n.getLocalizedString("i18n.common.no"),
            "btnYes": {
                "btnYesValue": "$${i18n{i18n.common.yes}}",
                "callToAction": {
                    "appName": "AccountSweepsMA",
                    "form": "",
                    "module": "AccountSweepsUIModule",
                    "presentationControllerMethod": "deleteSweep",
                    "params": ""
                }
            },
            "yesText": kony.i18n.getLocalizedString("i18n.common.yes")
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.formTemplate12.onError = this.onError;
            this.initFormActions();
        },
        /**
         * @api : onBreakPointChange
         * Based on break point design will change
         * @return : NA
        */
        onBreakpointChange: function(form, width) {
            if (width === 640) {
                this.view.formTemplate12.pageTitleVisibility = false;
				this.view.formTemplate12.flxContentTCCenter.flxExistingSweepInfo.top = "20px";
				this.view.formTemplate12.flxContentTCCenter.flxExistingSweepInfo.height = "145px"
				this.view.formTemplate12.flxContentTCCenter.lblSweepnfIoIcon.top = "-35px";
				this.view.formTemplate12.flxContentTCCenter.lblSweepInfoMsgValue.top = "-37px";
				this.view.formTemplate12.flxContentTCCenter.flxNoSweepMsg.top = "40px";
				this.view.formTemplate12.flxContentTCCenter.flxNoSweepMsg.left = "-5px";
            } else {
                this.view.formTemplate12.pageTitleVisibility = true;
                this.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString("i18n.accountsweeps.accountSweep");
				this.view.formTemplate12.flxContentTCCenter.flxSweepListing.top = "11dp";
            }
             if (width <= 1024 && width > 640) {
                isTablet = true;
                this.view.formTemplate12.flxContentTCCenter.flxSecondaryAccount.left = "30.5%";
                this.view.formTemplate12.flxContentTCCenter.flxSweepCondition.left = "54%";
                this.view.formTemplate12.flxContentTCCenter.flxAmount.right = "18%";
				this.view.formTemplate12.flxContentTCCenter.flxPrimaryAccount.left = "6%",
                this.view.formTemplate12.flxContentTCCenter.flxStatus.setVisibility(false);
            } else {
                isTablet = false;
            }
        },
        /**
         * Performs the actions required before rendering form
         */
        preShow: function() {
            contentPopupScope.setVisibility(false);
            //    var offsetLimit = pagination.getDefaultOffsetAndLimit();
            //    this.offset = offsetLimit.offset;
            this.resetLogoutPopupData();
            //   recordsPerPage = offsetLimit.limit;
            //   pagination.fetchPaginatedRecords = this.fetchPaginatedRecords;
            //   pagination.resetStartIndex();
            //   pagination.collapseDropDown();
            this.resetForm();
            if (this.presenter.custDashboard === "true") {
                contentScope.flxCustomerID.setVisibility(true);
                this.showCustomers();
            } else {
                contentScope.flxCustomerID.setVisibility(false);
            }  
        },

        showCustomers: function(){
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "appName": "HomepageMA",
                        "moduleName": "AccountsUIModule"
            });        
            var custDashboard = accountsModule.presentationController.customerdashboard;
            contentScope.segCustIDList.widgetDataMap = {
                    "lblListValue": "lblListValue",
                    "flxFrequencyListDropdown":"flxFrequencyListDropdown"
            };
            if(custDashboard === "true"){
                let masterData = [];
                var coreCustomers = accountsModule.presentationController.Customers;
                coreCustomers.map(response => {
                    var name = response.MembershipName + " ("+response.membershipId+")";
                    masterData.push({
                        "flxFrequencyListDropdown":{
                            "accessibilityConfig":{
                                "a11yARIA":{
                                    "role":"button",
                                    "aria-labelledby":"lblListValue",
                                    "tabindex":0
                                }
                            },
                            "onKeyPress":this.customerKeyPress
                        },
                        "lblListValue": {
                            text: name,
                            "left": "12dp",
                        },
						"membershipId": response.membershipId
                    });
                });
                contentScope.segCustIDList.setData(masterData);
				if(this.presenter.isEmptyNullOrUndefined(this.selCustomer)){
					this.selCustomer = coreCustomers[0].MembershipName + " (" + coreCustomers[0].membershipId + ")";
					contentScope.lblCustomerID.text = coreCustomers[0].MembershipName + " (" + coreCustomers[0].membershipId + ")";
                    contentScope.flxCustomerIDDisplay.accessibilityConfig={
                        "a11yLabel":"Currently Viewing "+contentScope.lblCustomerID.text+" Click here to show list of Customer",
                            "a11yARIA":{
                                "tabindex":0,
                                "aria-expanded":false,
                                "role":"button"
                            }
                    }
				}else{
					contentScope.lblCustomerID.text = this.selCustomer;
                    contentScope.flxCustomerIDDisplay.accessibilityConfig={
                        "a11yLabel":"Currently Viewing "+contentScope.lblCustomerID.text+" Click here to show list of Customer",
                            "a11yARIA":{
                                "tabindex":0,
                                "aria-expanded":false,
                                "role":"button"
                            }
                    }
				}
					
            }
        },
        showCustomersDropDown: function() {
			if(contentScope.lblCustIdDropDown.text === "O"){
				contentScope.lblCustIdDropDown.text = "P";
				contentScope.flxCustIDListDropDown.setVisibility(true);
                contentScope.flxCustomerIDDisplay.accessibilityConfig={
                    "a11yLabel":"Hide list of Customers",
                        "a11yARIA":{
                            "tabindex":0,
                            "aria-expanded":true,
                            "role":"button"
                        }
                }
			}else{
				contentScope.flxCustIDListDropDown.setVisibility(false);
				contentScope.lblCustIdDropDown.text = "O";
                contentScope.flxCustomerIDDisplay.accessibilityConfig={
                    "a11yLabel":"Currently Viewing "+contentScope.lblCustomerID.text+" Click here to show list of Customer",
                        "a11yARIA":{
                            "tabindex":0,
                            "aria-expanded":false,
                            "role":"button"
                        }
                }
			}
            contentScope.flxCustomerIDDisplay.setActive(true);
        },
        onSelectionOfCustomer: function() {
            contentScope.flxCustIDListDropDown.setVisibility(false);
			contentScope.lblCustIdDropDown.text = "O";
            contentScope.lblCustomerID.text = contentScope.segCustIDList.selectedRowItems[0].lblListValue.text;
            contentScope.flxCustomerIDDisplay.accessibilityConfig={
                "a11yLabel":"Currently Viewing "+contentScope.lblCustomerID.text+" Click here to show list of Customer",
                    "a11yARIA":{
                        "tabindex":0,
                        "aria-expanded":false,
                        "role":"button"
                    }
            }
            this.presenter.coreCustomerId = contentScope.segCustIDList.selectedRowItems[0].membershipId;
			this.selCustomer = contentScope.segCustIDList.selectedRowItems[0].lblListValue.text;
            this.presenter.getAllsweeps(contentScope.segCustIDList.selectedRowItems[0].membershipId);
            contentScope.flxCustomerIDDisplay.setActive(true);
        },
        /**
         * Performs the actions required after rendering form
         */
        postShow: function() {
          	var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "HomepageMA",
                                "moduleName": "AccountsUIModule"
                            });
            var custDashboard = accountsModule.presentationController.customerdashboard;
            if (custDashboard === "true")
                this.view.formTemplate12.accountText = kony.i18n.getLocalizedString("i18n.common.overview");
            else
                this.view.formTemplate12.accountText = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
            applicationManager.getNavigationManager().applyUpdates(this);
			contentScope.flxCustomerID.onBlur = CommonUtilities.hideAllPopups;
			CommonUtilities.addToListner({
                widget: contentScope.flxCustIDListDropDown,
                hideFunc: this.showCustomersDropDown.bind(this, "lblCustIdDropDown", "flxCustIDListDropDown")
            });
            this.setAccessibility();
            contentScope.flxConditions.onKeyPress = this.conditionsKeyPress;
            contentScope.segSweep.clipBounds=false;
            contentScope.lblView.skin="ICSknLbl424242SSPRegular15px";
            if(kony.os.deviceInfo().screenHeight<400){
                if(kony.os.deviceInfo().screenWidth>640 && kony.os.deviceInfo().screenWidth<=1024){
                    contentScope.flxPrimaryAccount.width="20%";
                    contentScope.flxSecondaryAccount.width="24%";
                    contentScope.flxSecondaryAccount.left="28%";
                    contentScope.flxSweepCondition.width="21%";
                    contentScope.flxSweepCondition.left="52%";

                }
            }
            contentScope.tbxSearch.placeholder="Search by Keywords";
        },
        mainKeyPress : function(eventObject,eventPayload,context){
            if(eventPayload.keyCode===27){
                    eventPayload.preventDefault();
                    this.toggleFilterDropDownVisibility();
            }
            if(eventPayload.keyCode===9){
                if(eventPayload.shiftKey){
                    if(context.rowIndex===0){
                        eventPayload.preventDefault();
                        this.toggleFilterDropDownVisibility();
                    }
                }
                else{
                    if(context.rowIndex===context.widgetInfo.data.length-1){
                        this.toggleFilterDropDownVisibility();
                    }
                }
            }
        },
        showCustomersKeyPress : function(eventObject,eventPayload){
            if(eventPayload.keyCode===27){
                if(contentScope.flxCustIDListDropDown.isVisible===true){
                    eventPayload.preventDefault();
                    this.showCustomersDropDown();
                }
            }
            if(eventPayload.keyCode===9){
                if(eventPayload.shiftKey){
                if(contentScope.flxCustIDListDropDown.isVisible===true){
                    this.showCustomersDropDown();
                }
            }
            }
        },
        customerKeyPress : function(eventObject,eventPayload,context){
            if (eventPayload.keyCode === 27) {
                eventPayload.preventDefault();
                this.showCustomersDropDown();
            }
            if (eventPayload.keyCode === 9) {
                if (eventPayload.shiftKey) {
                    if (context.rowIndex === 0) {
                        eventPayload.preventDefault();
                        this.showCustomersDropDown();
                    }
                }
                else {
                    if (context.rowIndex === context.widgetInfo.data.length - 1) {
                        this.showCustomersDropDown();
                    }
                }
            }
        },
        conditionsKeyPress : function(eventObject,eventPayload){
            if(eventPayload.keyCode===27){
                if(contentScope.flxListDropDown.isVisible===true){
                    eventPayload.preventDefault();
                    this.toggleFilterDropDownVisibility();
                }
            }
            if(eventPayload.keyCode===9){
                if(eventPayload.shiftKey){
                if(contentScope.flxListDropDown.isVisible===true){
                    this.toggleFilterDropDownVisibility();
                }
            }
            }
        },
        setAccessibility : function(){
            contentScope.flxPrimaryAccount.accessibilityConfig={
                "a11yLabel":"Primary Account Sorted in descending order, Click to sort in ascending order",
                "a11yARIA":{
                    "role":"button",
                    "tabindex":0
                }
            };
            contentScope.flxSecondaryAccount.accessibilityConfig={
                "a11yLabel":"Secondary Account no sort Applied, Click to sort in Ascending order",
                "a11yARIA":{
                    "role":"button",
                    "tabindex":0
                }
            };
            contentScope.flxSweepCondition.accessibilityConfig={
                "a11yLabel":"Sweep Condition no sort Applied, Click to sort in Ascending order",
                "a11yARIA":{
                    "role":"button",
                    "tabindex":0
                }
            };
            contentScope.flxConditions.accessibilityConfig={
                "a11yLabel":"Currently Viewing "+contentScope.lblConditions.text+" Click here to show list of view",
                "a11yARIA":{
                    "role":"button",
                    "aria-expanded":false,
                    "role":"button"
                }
            }
        },
        /**
         * Method to initialise form actions
         */
        initFormActions: function() {
            var scope = this;
            try {
                this.presenter = applicationManager.getModulesPresentationController({
                    appName: 'AccountSweepsMA',
                    moduleName: 'AccountSweepsUIModule'
                });
                contentScope = this.view.formTemplate12.flxContentTCCenter;
                contentPopupScope = this.view.formTemplate12.flxContentPopup;
                titleActionScope = this.view.formTemplate12.flxTCButtons;
               // pagination = this.view.formTemplate12.flxContentTCCenter.pagination;
                formatUtilManager = applicationManager.getFormatUtilManager();
                contentScope.tbxSearch.text = "";
                contentScope.flxListDropDown.setVisibility(false);
                contentScope.lblFilterDropDown.text = ViewConstants.FONT_ICONS.THREE_DOTS_ACCOUNTS;
                contentScope.flxClear.setVisibility(false);
                contentScope.tbxSearch.onTouchStart = contentScope.flxListDropDown.setVisibility(false);
                contentScope.flxClear.onClick = function() {
                    contentScope.tbxSearch.text = "";
                    scope.performSearch();
                    contentScope.tbxSearch.setActive(true);
                };
                contentScope.segFilterList.widgetDataMap = {
                    "flxFilterOptions": "flxFilterOptions",
                    "flxMain": "flxMain",
                    "lblRadio": "lblRadio",
                    "lblFilterValue": "lblFilterValue"
                };
                contentScope.flxPrimaryAccount.onClick = this.sort.bind(this, "primaryAccountName", contentScope.ImgSortIcon1);
                contentScope.flxSecondaryAccount.onClick = this.sort.bind(this, "secondaryAccountName", contentScope.ImgSortIcon2);
                contentScope.flxSweepCondition.onClick = this.sort.bind(this, "sweepType", contentScope.ImgSortIcon3);
                contentScope.tbxSearch.onTextChange = this.performSearch;
                contentScope.tbxSearch.onDone = this.performSearch.bind(this);
                contentScope.flxPagination.zIndex = 0;
                contentScope.flxConditions.onClick = this.toggleFilterDropDownVisibility.bind(this);
                contentScope.btnCreateNewSweep.onClick = function() {
                    scope.presenter.showSweepScreen({
                        context: "createSweep"
                    },{
                        "isEdit" : false,
                        "isModify" : false
                    });
                };
				contentScope.flxCustomerIDDisplay.onClick = this.showCustomersDropDown;
                contentScope.flxCustomerIDDisplay.onKeyPress = this.showCustomersKeyPress;
                contentScope.flxCustomerIDDisplay.accessibilityConfig={
                    "a11yLabel":"Currently Viewing "+contentScope.lblCustomerID.text+" Click here to show list of Customer",
                        "a11yARIA":{
                            "tabindex":0,
                            "aria-expanded":false,
                            "role":"button"
                        }
                }
				contentScope.segCustIDList.onRowClick = this.onSelectionOfCustomer.bind(this);
            } catch (err) {
                var errorObj = {
                    "method": "initFormActions",
                    "error": err
                };
                this.onError(errorObj);
            }
        },
        /**
         * Entry point method for the form controller
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            }
            if (viewModel.sweeps) {
                this.sweepsData = viewModel.sweeps;
                pageNumber = 1;
                this.renderDataInDashboardList(this.sweepsData);
               // pagination.updatePaginationBar(0, viewModel.sweeps.length);
            }
            if (viewModel.deletesweep) {
                if(this.presenter.isEmptyNullOrUndefined(viewModel.deletesweep.serviceRequestId)){
					this.view.formTemplate12.showBannerError({
						i18n: kony.i18n.getLocalizedString('i18n.accountSweeps.successfullyDeleted'),
						errorDetails: ""
					});
				}else{
					this.view.formTemplate12.showBannerError({
						i18n: kony.i18n.getLocalizedString('i18n.accountSweeps.successfullyDeleted'),
						errorDetails: JSON.stringify(kony.i18n.getLocalizedString("kony.mb.common.refNumberColon") + " " + viewModel.deletesweep.serviceRequestId)
					});
				}
                this.resetLogoutPopupData();
            }
            if (viewModel.deleteFailure) {
                this.view.formTemplate12.showBannerError({
                    dbpErrMsg: kony.i18n.getLocalizedString('i18n.accountSweeps.SweepCouldNotBeDeleted'),
                    i18n: kony.i18n.getLocalizedString('i18n.accountSweeps.SweepCouldNotBeDeleted'),
                    errorDetails:  JSON.stringify(kony.i18n.getLocalizedString("i18n.accountSweeps.deleteFailureMessage") )
                });
                this.resetLogoutPopupData();
            }
        },
        /**
         * Method to search the response data 
         */
        performSearch: function() {
            var searchtext = contentScope.tbxSearch.text.toLowerCase();
            contentScope.flxClear.setVisibility(searchtext.length >= 1);
            if (searchtext.length >= 2) {
                FormControllerUtility.showProgressBar();
                contentScope.segSweep.setVisibility(true);
                contentScope.segSweep.removeAll();
                let recordsData = applicationManager.getDataProcessorUtility().multipleCommonSegmentSearch(["primaryAccountNumber", "secondaryAccountNumber", "primaryAccountName", "secondaryAccountName"], searchtext, this.sweepsData);
                if (recordsData.length > 0) {
                    this.renderDataInDashboardList(recordsData);
                } else {
                    this.showSearchView(true);
                }
                FormControllerUtility.hideProgressBar();
            } else {
                this.renderDataInDashboardList(this.sweepsData);
                this.showSearchView(false);
            }
        },
        /**
         * Method to perform the filter operation on  the response data 
         */
        toggleFilterDropDownVisibility: function() {
            try {
                if (contentScope.lblFilterDropDown.text === ViewConstants.FONT_ICONS.THREE_DOTS_ACCOUNTS) {
                    if (this.isFilterApplied) {
                        contentScope.segFilterList.setData(this.segFilterData);
                    } else {
                        this.setSweepFilterData();
                    }
                    contentScope.flxListDropDown.setVisibility(true);
                    contentScope.lblFilterDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                    contentScope.flxConditions.accessibilityConfig={
                        "a11yLabel":"Hide list of views",
                        "a11yARIA":{
                            "tabindex":0,
                            "aria-expanded":true,
                            "role":"button"
                        }
                    }
                } else {
                    contentScope.flxListDropDown.setVisibility(false);
                    contentScope.lblFilterDropDown.text = ViewConstants.FONT_ICONS.THREE_DOTS_ACCOUNTS;
                    contentScope.flxConditions.accessibilityConfig={
                        "a11yLabel":"Currently Viewing "+contentScope.lblConditions.text+" Click here to show list of view",
                        "a11yARIA":{
                            "tabindex":0,
                            "aria-expanded":false,
                            "role":"button"
                        }
                    }
                }
                contentScope.flxConditions.setActive(true);
            } catch (err) {
                var errorObj = {
                    "method": "toggleFilterDropDownVisibility",
                    "error": err
                };
                this.onError(errorObj);
            }
        },
        /**
         * Method to reset the data
         */
        resetForm: function() {
            contentScope.ImgSortIcon1.src = "sorting_next.png";
            contentScope.flxListDropDown.setVisibility(false);
            this.view.formTemplate12.hideBannerError();
            contentScope.lblConditions.text = kony.i18n.getLocalizedString("i18n.accountsweeps.allConditions");
            this.resetImages(contentScope.ImgSortIcon1);
            contentScope.flxClear.setVisibility(false);
            contentScope.tbxSearch.text = "";
            this.showNosweeps(false);
            this.showSearchView(false);
            this.isFilterApplied = false;
            contentScope.btnCreateNewSweep.setVisibility(this.presenter.checkUserPermission('ACCOUNT_SWEEP_CREATE'))
            contentScope.lblFilterDropDown.text = ViewConstants.FONT_ICONS.THREE_DOTS_ACCOUNTS;
        },
        /**
         * Method to set the data to filter segment
         */
        setSweepFilterData: function() {
            try {
                this.segFilterData = [];
                this.segFilterData = [{
                    "lblRadio": ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO,
                    "lblFilterValue": kony.i18n.getLocalizedString("i18n.accountsweeps.allConditions"),
                    "flxMain": {
                        onClick: this.filterRowOnClick,
                        onKeyPress:this.mainKeyPress,
                        "accessibilityConfig":{
                            "a11yARIA":{
                                "tabindex":0,
                                "role":"radio",
                                "aria-checked":true,
                                "aria-labelledby":"lblFilterValue"
                            }
                        }
                    }
                }, {
                    "lblRadio": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
                    "lblFilterValue": kony.i18n.getLocalizedString("i18n.signatory.above"),
                    "flxMain": {
                        onClick: this.filterRowOnClick,
                        onKeyPress:this.mainKeyPress,
                        "accessibilityConfig":{
                            "a11yARIA":{
                                "tabindex":0,
                                "role":"radio",
                                "aria-checked":false,
                                "aria-labelledby":"lblFilterValue"
                            }
                        }
                    }
                }, {
                    "lblRadio": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
                    "lblFilterValue": kony.i18n.getLocalizedString("i18n.accountsweeps.below"),
                    "flxMain": {
                        onClick: this.filterRowOnClick,
                        onKeyPress:this.mainKeyPress,
                        "accessibilityConfig":{
                            "a11yARIA":{
                                "tabindex":0,
                                "role":"radio",
                                "aria-checked":false,
                                "aria-labelledby":"lblFilterValue"
                            }
                        }
                    }
                }, {
                    "lblRadio": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
                    "lblFilterValue": kony.i18n.getLocalizedString("i18n.accountsweeps.both"),
                    "flxMain": {
                        onClick: this.filterRowOnClick,
                        onKeyPress:this.mainKeyPress,
                        "accessibilityConfig":{
                            "a11yARIA":{
                                "tabindex":0,
                                "role":"radio",
                                "aria-checked":false,
                                "aria-labelledby":"lblFilterValue"
                            }
                        }
                    }
                }];
                contentScope.segFilterList.setData(this.segFilterData);
            } catch (err) {
                var errorObj = {
                    "method": "setSweepFilterData",
                    "error": err
                };
                this.onError(errorObj);
            }
        },
        /**
         * Method to select filter datas
         */
        filterRowOnClick: function() {
            try {
                var segmentdata = contentScope.segFilterList.data;
                var index = contentScope.segFilterList.selectedRowIndex;
                var rowIndex = index[1];
                for (var i = 0; i < segmentdata.length; i++) {
                    if (i !== rowIndex) {
                        segmentdata[i].lblRadio = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                        segmentdata[i].flxMain.accessibilityConfig={
                            "a11yARIA":{
                                "tabindex":0,
                                "role":"radio",
                                "aria-checked":false,
                                "aria-labelledby":"lblFilterValue"
                            }
                        }
                    }
                }
                segmentdata[rowIndex].lblRadio = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                segmentdata[rowIndex].flxMain.accessibilityConfig={
                    "a11yARIA":{
                        "tabindex":0,
                        "role":"radio",
                        "aria-checked":true,
                        "aria-labelledby":"lblFilterValue"
                    }
                }
                contentScope.lblConditions.text = segmentdata[rowIndex].lblFilterValue;
                contentScope.flxListDropDown.setVisibility(false);
                contentScope.flxClear.setVisibility(false);
                contentScope.tbxSearch.text = "";
                contentScope.segFilterList.setData(segmentdata);
                this.isFilterApplied = true;
                this.segFilterData = segmentdata;
                contentScope.lblFilterDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                this.presenter.filterByValue = rowIndex === 0 ? "" : segmentdata[rowIndex].lblFilterValue;
                this.presenter.getAllsweeps();
                contentScope.flxConditions.accessibilityConfig={
                    "a11yLabel":"Currently Viewing "+contentScope.lblConditions.text+" Click here to show list of view",
                    "a11yARIA":{
                        "tabindex":0,
                        "aria-expanded":false,
                        "role":"button"
                    }
                }
                kony.application.dismissLoadingScreen();
                contentScope.flxConditions.setActive(true);
            } catch (err) {
                var errorObj = {
                    "method": "filterRowOnClick",
                    "error": err
                };
                this.onError(errorObj);
            }
        },
        /**
         * Method to set listing data in the dashboard segment
         */
        renderDataInDashboardList: function(data, config) {
            try {
                var scope = this;
                if (data.length === 0 || data.length === undefined) {
                    this.showNosweeps(true);
                    return;
                }
               // data = data.slice((pageNumber - 1) * recordsPerPage, pageNumber * recordsPerPage);
                let masterData = [];
                if (kony.application.getCurrentBreakpoint() > 640) {
                    contentScope.segSweep.rowTemplate = "flxSweepListingTemp";
                } else {
                    contentScope.segSweep.rowTemplate = "flxSweepListingTempMobile";
                }
                let template = contentScope.segSweep.rowTemplate;
                contentScope.segSweep.widgetDataMap = {
                    "lblCoulmn1": "lblCoulmn1",
                    "lblColumn1Accessibility": "lblColumn1Accessibility",
                    "lblCoulmn2Accessibility": "lblCoulmn2Accessibility",
                    "lblColumn3Accessibility": "lblColumn3Accessibility",
                    "lblCoulmn4Accessibility": "lblCoulmn4Accessibility",
                    "lblCoulmn5Accessibility": "lblCoulmn5Accessibility",
                    "lblRowCoulmn1Key": "lblRowCoulmn1Key",
                    "lblRowCoulmn1Value": "lblRowCoulmn1Value",
                    "lblRowCoulmn2Key": "lblRowCoulmn2Key",
                    "lblRowCoulmn2Value": "lblRowCoulmn2Value",
                    "lblCoulmn2": "lblCoulmn2",
                    "lblRowCoulmn3Key": "lblRowCoulmn3Key",
                    "lblRowCoulmn3Value": "lblRowCoulmn3Value",
                    "lblRowCoulmn4Key": "lblRowCoulmn4Key",
                    "lblRowCoulmn4Value": "lblRowCoulmn4Value",
                    "lblCoulmn4": "lblCoulmn4",
                    "btnEdit": "btnEdit",
                    "btnAction": "btnAction",
                    "lblDropdown": "lblDropdown",
                    "flxIdentifier": "flxIdentifier",
                    "lblIdentifier": "lblIdentifier",
                    "flxSweepListingTemp": "flxSweepListingTemp",
                    "flxSweepListingTempMobile": "flxSweepListingTempMobile",
                    "flxManageBeneficiaries": "flxManageBeneficiaries",
                    "flxDropDown2": "flxDropDown2",
                    "flxDropdown": "flxDropdown",
                    "lblAccountName": "lblAccountName",
                    "lblCoulmn3": "lblCoulmn3",
                    "lblCoulmn5": "lblCoulmn5",
                    "lblAccBalance": "lblAccBalance",
                    "lblAccBalance2": "lblAccBalance2",
                    "lblBalance1": "lblBalance1",
                    "lblAccountNumberValue": "lblAccountNumberValue",
                    "lblFrequencyValue": "lblFrequencyValue",
                    "lblSeparator": "lblSeparator",
                    "lblSeperatorMain": "lblSeperatorMain",
                    "lblTopSeparator": "lblTopSeparator",
                    "lblRowCoulmnTabValue": "lblRowCoulmnTabValue",
                    "lblRowCoulmnTab": "lblRowCoulmnTab",
                    "lblStatusValue": "lblStatusValue",
                    "lblDot": "lblDot",
                    "lblDotTab": "lblDotTab",
                    "lblDotMobile": "lblDotMobile",
                    "lblBottomSeparator": "lblBottomSeparator",
                    "flxCoulmn1": "flxCoulmn1",
                    "flxCoulmn2": "flxCoulmn2",
                    "flxCoulmn3": "flxCoulmn3",
                    "flxCoulmn4": "flxCoulmn4",
                    "flxCoulmn5": "flxCoulmn5",
                    "flxBtnAction": "flxBtnAction",
                    "flxRowColumn2": "flxRowColumn2",
                    "flxRowColumn3": "flxRowColumn3",
                    "flxDetailAction": "flxDetailAction",
                    "flxStatusTab": "flxStatusTab",
                    "flxDetails": "flxDetails",
                    "flxDetail":"flxDetail",
                    "flxDetailsRow1": "flxDetailsRow1",
                    "flxRowColumn1": "flxRowColumn1",
                    "flxRowColumn4": "flxRowColumn4",
                };
                data.map(response => {
                    var Status;
                    var RequestId;
                    var formattedPrimaryName = (kony.application.getCurrentBreakpoint() === 640) ? (CommonUtilities.truncateStringWithGivenLength(response.primaryAccountName, 18) + "...." + CommonUtilities.getLastFourDigit(response.primaryAccountNumber)) : (CommonUtilities.truncateStringWithGivenLength(response.primaryAccountName + "....", 26) + CommonUtilities.getLastFourDigit(response.primaryAccountNumber));
                    if (response.serviceRequestId === undefined || response.serviceRequestId === null) {
                        RequestId = "Hide";
                    }
                    if (response.endDate === undefined || response.endDate === null) {
                        Status = "Active";
                    } else {
                        var bankDateComponent = this.presenter.bankDate.currentWorkingDate;
                        var bankDate = new Date(bankDateComponent).getTime();
                        var newEndDate = response.endDate.split("/");
                        newEndDate = new Date(newEndDate[2], newEndDate[1] - 1, newEndDate[0])
                        newEndDate = newEndDate.getTime();
                        if (newEndDate > bankDate) {
                            Status = "Active";
                        } else {
                            Status = "InActive";
                        }
                    }
                    masterData.push({
                        "flxDropdown": {
                            "isVisible": true,
                            "accessibilityConfig":{
                                "a11yLabel":"Show more details of sweep for Primary Account "+formattedPrimaryName,
                                "a11yARIA":{
                                    "role":"button",
                                    "tabindex":0,
                                    "aria-expanded":false
                                }
                            }
                        },
                        "flxCoulmn1": {
                            "left": isTablet ? "10px" : "0px",
                        },
                        "flxCoulmn2": {
                            "left": isTablet ? "27%" : "22%",
                        },
                        "flxCoulmn3": {
                            "left": isTablet ? "51.5%" : "45.5%",
                        },
                        "flxCoulmn4": {
                            "right": isTablet ? "18%" : "28.5%"
                        },
                        "flxBtnAction": {
                            "right": isTablet ? "4%" : "2.9%"
                        },
                        "flxDetails": {
                            "height": isTablet ? "140px" : "83px",
                            "isVisible":false
                        },
                        "flxDetail": {
                            "isVisible":false
                        },
                        "flxDetailsRow1": {
                            "left": isTablet ? "6%" : "5%"
                        },
                        "flxDetailAction": {
                            "right": isTablet ? "4%" : "2.9%"
                        },
                        "flxRowColumn1": {
                            "isVisible": (RequestId === "Hide") ? false : true,
                            "left": isTablet ? "100px" : "0px",
                            "top": isTablet ? "20px" : "20px"
                        },
                        "flxRowColumn2": {
                            "left": (RequestId === "Hide") ? isTablet ? "26%" : "0px" : isTablet ? "40%" : "22%",
                            "top": isTablet ? "20px" : "20px"
                        },
                        "flxRowColumn3": {
                            "left": (RequestId === "Hide") ? isTablet ? "51%" : "22%" : isTablet ? "59%" : "45.5%",
                            "top": isTablet ? "20px" : "20px"
                        },
                        "flxRowColumn4": {
                            "left": (RequestId === "Hide") ? isTablet ? "0%" : "45.5%" : isTablet ? "0%" : "67%",
                            "top": isTablet ? "70px" : "20px"
                        },
                        "lblDropdown": {
                            "text": ViewConstants.FONT_ICONS.THREE_DOTS_ACCOUNTS
                        },
                        "flxIdentifier": {
                            "isVisible": false,
                            "height": isTablet ? "180dp" : "133dp"
                        },
                        "lblIdentifier": {
                            "skin": "sknLabelDummy"
                        },
                        "lblSeperatorMain": {
                            "isVisible": true
                        },
                        "lblSeparator": {
                            "isVisible": false
                        },
                        "lblBottomSeparator": {
                            "isVisible": true,
                            "text": "Label"
                        },
                        "flxSweepListingTemp": {
                            "height": "53dp",
                            "skin": "sknflxffffffnoborder"
                        },
                        "flxDropDown2": {
                            "isVisible": true,
                            "width":"20dp",
                            "height":"40dp",
                            "accessibilityConfig":{
                                "a11yLabel":"Hide more details of sweep for Primary Account "+formattedPrimaryName,
                                "a11yARIA":{
                                    "role":"button",
                                    "tabindex":0,
                                    "aria-expanded":true
                                }
                            }
                        },
                        "flxSweepListingTempMobile": {
                            "height": "75dp"
                        },
                        "flxStatusTab": {
                            "isVisible": isTablet ? true : false,
                            "top": isTablet ? "20px" : "20px",
                        },
                        "lblTopSeparator": {
                            "height": "1dp",
                            "bottom": "2dp",
                            isVisible: response.sweepType === "Both" ? true : false
                        },
                        "flxManageBeneficiaries": {
                            "height": "75dp",
                            "top": response.sweepType === "Both" ? "1dp" : "0dp",
                        },
                        "lblAccountName": {
                            "text": formattedPrimaryName
                        },
                        "lblAccBalance": {
                            "text": (response.sweepType === "Below") ? formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.belowSweepAmount), response.currencyCode) : (response.sweepType === "Above") ? formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.aboveSweepAmount), response.currencyCode) : (response.sweepType === "Both") ? ("Above" + " " + formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.aboveSweepAmount), response.currencyCode) + "\n" + "Below" + " " + formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.belowSweepAmount), response.currencyCode)) : NA
                        },
                        "lblBalance1": {
                            "text": (response.sweepType === "Below") ? formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.belowSweepAmount), response.currencyCode) : (response.sweepType === "Above") ? formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.aboveSweepAmount), response.currencyCode) : (response.sweepType === "Both") ? ("Above" + " " + formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.aboveSweepAmount), response.currencyCode) + "\n" + "Below" + " " + formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.belowSweepAmount), response.currencyCode)) : NA
                        },
                        "lblCoulmn1": {
                            "text": formattedPrimaryName,
                            "width": isTablet ? "80%" : "100%",
                            "skin": isTablet ? "sknLblSSP15pxtrucation" : "slLabel0d8a72616b3cc47"
                        },
                        "lblColumn1Accessibility": {
                            "text": contentScope.lblPrimaryAccount.text+" "+formattedPrimaryName
                        },
                        "lblCoulmn2": {
                            "text": CommonUtilities.truncateStringWithGivenLength(response.secondaryAccountName + "....", 26) + CommonUtilities.getLastFourDigit(response.secondaryAccountNumber),
                            "width": isTablet ? "80%" : "100%",
                            "skin": isTablet ? "sknLblSSP15pxtrucation" : "slLabel0d8a72616b3cc47"
                        },
                        "lblCoulmn2Accessibility": {
                            "text": contentScope.lblSecondaryAccount.text+" "+CommonUtilities.truncateStringWithGivenLength(response.secondaryAccountName + "....", 26) + CommonUtilities.getLastFourDigit(response.secondaryAccountNumber)
                        },
                        "lblCoulmn3": {
                            "text": response.sweepType
                        },
                        "lblColumn3Accessibility": {
                            "text": contentScope.lblSweepCondition.text+" "+response.sweepType
                        },
                        "lblAccBalance2": {
                            "text": response.sweepType
                        },
                        "lblAccountNumberValue": {
                            "text": response.sweepType
                        },
                        "lblCoulmn4": {
                            "text": (response.sweepType === "Below") ? formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.belowSweepAmount), response.currencyCode) : (response.sweepType === "Above") ? formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.aboveSweepAmount), response.currencyCode) : (response.sweepType === "Both") ? ("Above" + " " + formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.aboveSweepAmount), response.currencyCode) + "\n" + "Below" + " " + formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.belowSweepAmount), response.currencyCode)) : NA
                        },
                        "lblCoulmn4Accessibility": {
                            "text": (response.sweepType === "Below") ? formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.belowSweepAmount), response.currencyCode) : (response.sweepType === "Above") ? formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.aboveSweepAmount), response.currencyCode) : (response.sweepType === "Both") ? ("Above" + " " + formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.aboveSweepAmount), response.currencyCode) + "\n" + "Below" + " " + formatUtilManager.appendCurrencySymbol(formatUtilManager.formatAmount(response.belowSweepAmount), response.currencyCode)) : NA
                        },
                        "lblCoulmn5": {
                            "text": isTablet ? "" : Status,
                            "isVisible":isTablet ? false : true,
                            "right": (Status === "InActive") ? "14%" : "21%"
                        },
                        "lblCoulmn5Accessibility": {
                            "text": isTablet ? "" : contentScope.lblStatus.text+" "+Status,
                            "isVisible":isTablet ? false : true,
                        },
                        "lblDot": {
                            "isVisible": isTablet ? false : true,
                            "skin": (Status === "InActive") ? "sknlbldotGray" : "lbldotgreen"
                        },
                        "lblDotTab": {
                            "skin": (Status === "InActive") ? "sknlbldotGray" : "lbldotgreen"
                        },
                        "lblDotMobile": {
                            "skin": (Status === "InActive") ? "sknlbldotGray" : "lbldotgreen"
                        },
                        "lblRowCoulmn1Key": {
                            "text": kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber")
                        },
                        "lblRowCoulmn1Value": {
                            "text": response.serviceRequestId
                        },
                        "lblRowCoulmn2Key": {
                            "text": kony.i18n.getLocalizedString("i18n.transfers.lblFrequency")
                        },
                        "lblRowCoulmn2Value": {
                            "text": response.frequency
                        },
                        "lblFrequencyValue": {
                            "text": response.frequency
                        },
                        "lblRowCoulmn3Key": {
                            "text": "Next Occurrence on"
                        },
                        "lblRowCoulmn3Value": {
                            "text": response.startDate
                        },
                        "lblRowCoulmn4Key": {
                            "text": kony.i18n.getLocalizedString("i18n.transfers.end_date")
                        },
                        "lblRowCoulmn4Value": {
                            "text": (response.endDate === null) ? "End Manually" : response.endDate
                        },
                        "lblRowCoulmnTab": {
                            "text": "Status"
                        },
                        "lblRowCoulmnTabValue": {
                            "text": Status
                        },
                        "lblStatusValue": {
                            "text": Status
                        },
                        "btnEdit": {
                            "isVisible": (Status === "InActive") ? false : this.presenter.checkUserPermission('ACCOUNT_SWEEP_DELETE'),
                            "right":(kony.os.deviceInfo().screenHeight<400 && kony.application.getCurrentBreakpoint()===1024)?"-10dp":"0dp",
                            "text": "Cancel Sweep",
                            "accessibilityConfig":{
                                "a11yLabel":"Cancel sweep for primary account "+formattedPrimaryName,
                                "a11yARIA":{
                                    "tabindex":0
                                }
                            },
                            "onClick": function(widgetInfo,context) {
                                cancelContext=context;
                                scope.customPopup(response, formattedPrimaryName);
                            }
                        },
                        "btnAction": {
                            "isVisible": this.presenter.checkUserPermission('ACCOUNT_SWEEP_EDIT'),
                            "text": kony.i18n.getLocalizedString("i18n.accounts.edit"),
                            "accessibilityConfig":{
                                "a11yLabel":"Edit sweep for primary account "+formattedPrimaryName,
                                "a11yARIA":{
                                    "tabindex":0
                                }
                            },
                            "onClick": function() {
                                scope.navigateBtnEdit(response);
                            }
                        },
                        "template": template
                    });
                });
                this.showSearchView(false);
                sweepAccData = masterData;
				this.setPagination({
                    'show': true,
                    'offset': this.offset
                }, masterData);
                for(var i=0;i<masterData.length;i++){
                    masterData[i].lblCoulmn4Accessibility.text=contentScope.lblAmount.text+" "+masterData[i].lblCoulmn4.text.replace("\n"," ");
                }
                contentScope.segSweep.setData(masterData.slice(this.offset, this.lastRecord));
                contentScope.flxSweepMainContent.setVisibility(true);
                contentScope.flxExistingSweepInfo.setVisibility(false);
                contentScope.flxNoAccountSweep.setVisibility(false);
                contentScope.flxSearchAndFilter.setVisibility(true);
               // contentScope.flxPagination.setVisibility(true);
            } catch (err) {
                var errorObj = {
                    "method": "renderDataInDashboardList",
                    "error": err
                };
                this.onError(errorObj);
            }
        },
		
		setPagination: function(values, viewModel) {
            var paginationCount = 10;
            if (this.sweepsData.length <= paginationCount) {
                contentScope.flxPagination.setVisibility(false);
            } else {
                contentScope.flxPagination.setVisibility(true);
            }
            var recipientDetails = viewModel.length;
            const lastRecord = Math.min((values.offset + paginationCount), recipientDetails);
            this.lastRecord = lastRecord;
            var page = parseInt((values.offset / paginationCount) + 1);
            var lastPage = (Math.ceil(recipientDetails / paginationCount));
            contentScope.flxPagination.PaginationContainer.lblPagination.text = page + " - " + lastPage + " Pages"; 
			contentScope.flxPagination.PaginationContainer.lblPagination.width = "70px";
            contentScope.flxPagination.PaginationContainer.flxPaginationFirst.isVisible = true;
            contentScope.flxPagination.PaginationContainer.flxPaginationLast.isVisible = true;
            contentScope.flxPagination.PaginationContainer.flxPaginationFirst.right = "0dp";
			contentScope.flxPagination.PaginationContainer.flxPaginationFirst.left = "175dp";
			contentScope.flxPagination.PaginationContainer.flxPaginationPrevious.left = "0dp";
			contentScope.flxPagination.PaginationContainer.flxPaginationLast.left = "0dp";
            contentScope.flxPagination.PaginationContainer.flxPagination.right = "0dp";
            contentScope.flxPagination.PaginationContainer.top = "0dp";
            contentScope.flxPagination.PaginationContainer.imgPaginationLast.accessibilityConfig={
                "a11yHidden":true,
                "a11yARIA":{
                    "tabindex":-1
                }
            };
            contentScope.flxPagination.PaginationContainer.imgPaginationNext.accessibilityConfig={
                "a11yHidden":true,
                "a11yARIA":{
                    "tabindex":-1
                }
            };
            contentScope.flxPagination.PaginationContainer.imgPaginationPrevious.accessibilityConfig={
                "a11yHidden":true,
                "a11yARIA":{
                    "tabindex":-1
                }
            };
            contentScope.flxPagination.PaginationContainer.imgPaginationFirst.accessibilityConfig={
                "a11yHidden":true,
                "a11yARIA":{
                    "tabindex":-1
                }
            };
            contentScope.flxPagination.PaginationContainer.lblPagination.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":-1
                }
            };
            if (values.offset !== 0 && values.offset <= recipientDetails - 1) {
                contentScope.flxPagination.PaginationContainer.imgPaginationPrevious.src = "pagination_back_blue.png";
                contentScope.flxPagination.PaginationContainer.imgPaginationFirst.src = "pagination_first_active.png";
                contentScope.flxPagination.PaginationContainer.flxPaginationFirst.setEnabled(true);
                contentScope.flxPagination.PaginationContainer.flxPaginationFirst.accessibilityConfig={
                    "a11yLabel":"First Page",
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":0
                    }
                };
                contentScope.flxPagination.PaginationContainer.flxPaginationPrevious.accessibilityConfig={
                    "a11yLabel":"Previous Page",
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":0
                    }
                }
                contentScope.flxPagination.PaginationContainer.flxPaginationPrevious.setEnabled(true);
                contentScope.flxPagination.PaginationContainer.flxPaginationPrevious.onClick = this.onPrevious.bind(this, values, viewModel);
                contentScope.flxPagination.PaginationContainer.flxPaginationFirst.onClick = this.onFirst.bind(this, values, viewModel);
            } else {
                contentScope.flxPagination.PaginationContainer.imgPaginationPrevious.src = "pagination_back_inactive.png";
                contentScope.flxPagination.PaginationContainer.imgPaginationFirst.src = "pagination_inactive.png";
                contentScope.flxPagination.PaginationContainer.flxPaginationFirst.setEnabled(false);
                contentScope.flxPagination.PaginationContainer.flxPaginationPrevious.setEnabled(false);
                contentScope.flxPagination.PaginationContainer.flxPaginationFirst.accessibilityConfig={
                    "a11yLabel":"First Page",
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":-1
                    }
                };
                contentScope.flxPagination.PaginationContainer.flxPaginationPrevious.accessibilityConfig={
                    "a11yLabel":"Previous Page",
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":-1
                    }
                }
            }
            if (recipientDetails <= paginationCount || lastRecord > recipientDetails - 1) {
                contentScope.flxPagination.PaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                contentScope.flxPagination.PaginationContainer.imgPaginationLast.src = "pagination_last_inactive.png";
                contentScope.flxPagination.PaginationContainer.flxPaginationLast.setEnabled(false);
                contentScope.flxPagination.PaginationContainer.flxPaginationNext.setEnabled(false);
                contentScope.flxPagination.PaginationContainer.flxPaginationLast.accessibilityConfig={
                    "a11yLabel":"Last Page",
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":-1
                    }
                };
                contentScope.flxPagination.PaginationContainer.flxPaginationNext.accessibilityConfig={
                    "a11yLabel":"Next Page",
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":-1
                    }
                }
            } else {
                contentScope.flxPagination.PaginationContainer.imgPaginationNext.src = "pagination_blue.png";
                contentScope.flxPagination.PaginationContainer.imgPaginationLast.src = "pagination_last_active.png";
                contentScope.flxPagination.PaginationContainer.flxPaginationLast.setEnabled(true);
                contentScope.flxPagination.PaginationContainer.flxPaginationNext.setEnabled(true);
                contentScope.flxPagination.PaginationContainer.flxPaginationLast.accessibilityConfig={
                    "a11yLabel":"Last Page",
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":0
                    }
                };
                contentScope.flxPagination.PaginationContainer.flxPaginationNext.accessibilityConfig={
                    "a11yLabel":"Next Page",
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":0
                    }
                }
                contentScope.flxPagination.PaginationContainer.flxPaginationNext.onClick = this.onNext.bind(this, values, viewModel);
                contentScope.flxPagination.PaginationContainer.flxPaginationLast.onClick = this.onLast.bind(this, values, viewModel);
            }
        },
        onFirst: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            var paginationCount = 10;
            if (values.offset < recipientDetails) {
                values.offset = 0;
                this.offset = values.offset;
            }
            this.renderDataInDashboardList(this.sweepsData, values);
        },
        onPrevious: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            var paginationCount = 10;
            if (values.offset < recipientDetails) {
                values.offset = values.offset - paginationCount;
                this.offset = values.offset;
            }
            this.renderDataInDashboardList(this.sweepsData, values);
        },
        onNext: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            var paginationCount = 10;
            if (values.offset < recipientDetails) {
                values.offset = values.offset + paginationCount;
                this.offset = values.offset;
            }
            this.renderDataInDashboardList(this.sweepsData, values);
        },
        onLast: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            var paginationCount = 10;
            if (values.offset < recipientDetails) {
                values.offset = values.offset + paginationCount;
                this.offset = values.offset;
            }
            this.renderDataInDashboardList(this.sweepsData, values);
        },
        /**
         * Method to set the data based on search criteria 
         */
        showSearchView: function(visible) {
            contentScope.segSweep.setVisibility(!visible);
            contentScope.flxNoAccounts.setVisibility(visible);
            contentScope.rtxNoAccounts.text = this.isFilterApplied ? kony.i18n.getLocalizedString("i18n.TransfersEur.noResults") : kony.i18n.getLocalizedString("i18n.payments.noSearchResultsFound");
            //contentScope.flxPagination.setVisibility(!visible);
        },
        /**
         * Method to show No sweep banner if no records are found
         */
        showNosweeps: function(visible) {
            if (this.isFilterApplied) {
                this.showSearchView(true);
                return;
            }
            contentScope.flxSweepMainContent.setVisibility(!visible);
            contentScope.flxExistingSweepInfo.setVisibility(visible);
            contentScope.flxNoAccountSweep.setVisibility(visible);
            contentScope.flxSearchAndFilter.setVisibility(!visible);
            contentScope.flxPagination.setVisibility(!visible);
        },
        /**
         * Update sort icons and trigger a action to presentation controller to sort
         */
        sort: function(sortByParam, img) {
            this.presenter.sortByParam = sortByParam;
            var widget="";
            var a11yLabel="";
            if (img.src === "sorting_next.png" || img.src === "sorting.png") {
                img.src = "sorting_previous.png";
                this.presenter.sortOrder = "asc";
                if(sortByParam==="primaryAccountName"){
                    widget="flxPrimaryAccount";
                    a11yLabel="primary account";
                }
                else if(sortByParam==="secondaryAccountName"){
                    widget="flxSecondaryAccount";
                    a11yLabel="secondary account";
                }
                else{
                    widget="flxSweepCondition";
                    a11yLabel="sweep condition";
                }
                contentScope[widget].accessibilityConfig={
                    "a11yLabel":a11yLabel+" Sorted in ascending order, Click to sort in descending order",
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":0
                    }
                };
            } else {
                img.src = "sorting_next.png";
                this.presenter.sortOrder = "desc";
                if(sortByParam==="primaryAccountName"){
                    widget="flxPrimaryAccount";
                    a11yLabel="primary account";
                }
                else if(sortByParam==="secondaryAccountName"){
                    widget="flxSecondaryAccount";
                    a11yLabel="secondary account";
                }
                else{
                    widget="flxSweepCondition";
                    a11yLabel="sweep condition";
                }
                contentScope[widget].accessibilityConfig={
                    "a11yLabel":a11yLabel+" Sorted in descending order, Click to sort in ascending order",
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":0
                    }
                };
            }
            this.resetImages(img);
            this.presenter.getAllsweeps();
            kony.application.dismissLoadingScreen();
            contentScope[widget].setActive(true);
        },
        /**
         * resetImages.
         * This method resets the sorting images.
         */
        resetImages: function(imageWidget) {
            for (var i = 1; i <= 3; i++) {
                if (imageWidget.id === ("ImgSortIcon" + i)) {
                    continue;
                }
                contentScope["ImgSortIcon" + i].src = "sorting.png";
                contentScope["ImgSortIcon" + i].parent.parent.accessibilityConfig={
                    "a11yLabel":contentScope["ImgSortIcon" + i].parent.parent.id.slice(3,contentScope["ImgSortIcon" + i].parent.parent.id.length)+" No Sort Applied, Click to sort in ascending order",
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":0
                    }
                }
            }
        },
        /**
         * Method to handle delete popup 
         */
        customPopup: function(data, account) {
            let scope = this;
            let payload = {};
            payload.primaryAccountNumber = data.primaryAccountNumber;
            payload.secondaryAccountNumber = data.secondaryAccountNumber;
            payload.belowSweepAmount = this.presenter.isEmptyNullOrUndefined(data.belowSweepAmount) ? "" : data.belowSweepAmount;
            payload.aboveSweepAmount = this.presenter.isEmptyNullOrUndefined(data.aboveSweepAmount) ? "" : data.aboveSweepAmount;
            payload.frequency = data.frequency;
            payload.startDate = data.startDate;
            payload.endDate = this.presenter.isEmptyNullOrUndefined(data.endDate) ? "" : data.endDate;
            payload.primaryAccountName = data.primaryAccountName;
            payload.secondaryAccountName = data.secondaryAccountName;
            payload.currencyCode = data.currencyCode;
            var bankDate = this.presenter.bankDate["currentWorkingDate"];
            var bankDate = new Date(bankDate).getTime();
            this.cancelPopupData['lblPopupMessage'] = "${i18n{i18n.AccountSweep.DeactivateSweepPresent}}";
            this.cancelPopupData['message'] = kony.i18n.getLocalizedString("i18n.AccountSweep.DeactivateSweepPresent");
            this.cancelPopupData["noClick"] = scope.resetLogoutPopupData.bind(scope);
            if (!kony.sdk.isNullOrUndefined(payload.endDate)) {
                var endDate = payload.endDate.split("/");
                endDate = new Date(endDate[2], endDate[1] - 1, endDate[0])
                endDate = endDate.getTime();
                if (bankDate < endDate) {
                    scope.cancelPopupData['lblPopupMessage'] = "${i18n{i18n.AccountSweep.DeactivateSweepFuture}}";
                    var msg = kony.i18n.getLocalizedString("i18n.AccountSweep.DeactivateSweepFuture");
                    msg = msg.replace("*", payload.endDate ? payload.endDate : "Future Date");
                    scope.cancelPopupData['message'] = msg;
                } else {
                    scope.cancelPopupData['lblPopupMessage'] = "${i18n{i18n.AccountSweep.DeactivateSweepPresent}}";
                    scope.cancelPopupData['message'] = kony.i18n.getLocalizedString("i18n.AccountSweep.DeactivateSweepPresent");
                }
            }
            scope.cancelPopupData["popupsetActive"]= function() {
                if(kony.application.getCurrentBreakpoint()===640){
                contentScope.segSweep.setActive(cancelContext.rowIndex,cancelContext.sectionIndex,"flxSweepListingTempMobile.flxMainGroup.flxGroup.flxSelectedRowWrapper.flxDetail.flxActions.btnEdit");
                }
                else{
                    contentScope.segSweep.setActive(cancelContext.rowIndex,cancelContext.sectionIndex,"flxSweepListingTemp.flxMainGroup.flxGroup.flxDetails.flxDetailAction.btnEdit");
                }
            },
            scope.cancelPopupData["closea11yLabel"]= "Close this Popup",
            scope.cancelPopupData["yesa11yLabel"]= "Yes, cancel sweep",
            scope.cancelPopupData["noa11yLabel"]= "No, don't cancel sweep",
            this.cancelPopupData['btnYes']['callToAction']['params'] = payload;
            this.cancelPopupData["yesClick"] = this.deleteSweep.bind(this, payload, scope.view.id);
            this.view.formTemplate12.customPopupData = this.cancelPopupData;
            this.view.formTemplate12.setPopup(this.cancelPopupData);
            // this.resetLogoutPopupData();
        },
        deleteSweep: function(data, frm){
            this.presenter.deleteSweep(data, frm);
        },
        /**
         * Method to navigate to Create New Sweep Form 
         */
        navigateBtnEdit: function(data) {
            data.isEdit = true;
            this.presenter.showSweepScreen({
                context: "createSweep"
            }, data);
        },
        /**
         * Method to get records of a particular page
         * @return {Array} Manage Beneficiaries of a particular page
         */
        getDataOfPage: function() {
            return this.sweepsData.slice((pageNumber - 1) * recordsPerPage, pageNumber * recordsPerPage);
        },
        /**
         * @function fetchPaginatedRecords
         * updates the segment based on the number of records per page selected or next/previous buttons are clicked
         * @input_arguement offset: offset of the record to be rendered in UI
         * @input_arguement noOfRecords: total number of beneficiary records
         * @return NA
         */
        fetchPaginatedRecords: function(offset, noOfRecords) {
            recordsPerPage = noOfRecords;
            this.offset = offset;
            if (offset === 0) {
                this.renderDataInDashboardList(this.sweepsData);
                this.offsetFlag = offset;
            } else {
                this.renderDataInDashboardList(this.sweepsData.slice(offset, offset + noOfRecords));
            }
            pagination.updatePaginationBar(noOfRecords, this.sweepsData.length);
        },
        /**
         * Method to show server error in form 
         * @param {String} errorMsg - Error Message from server
         */
        showServerError: function(errorMsg) {
            this.view.formTemplate12.showBannerError({
                dbpErrMsg: errorMsg
            });
            this.showSearchView(true);
        },
        /**
         * Error thrown from catch block of form controller
         */
        onError: function(err) {
            kony.print(JSON.stringify(err));
        },
        resetLogoutPopupData: function() {
            this.view.formTemplate12.customPopupData = {
                "lblPopupMessage": "${i18n{i18n.common.LogoutMsg}}",
                "lblHeading": "${i18n{i18n.login.signOut}}",
                "btnNo": "${i18n{i18n.common.no}}",
                "noText" : kony.i18n.getLocalizedString("i18n.common.no"),
                "btnYes": {
                    "btnYesValue": "$${i18n{i18n.common.yes}}",
                    "callToAction": {
                        "appName": "AuthenticationMA",
                        "form": "",
                        "module": "AuthUIModule",
                        "presentationControllerMethod": "doLogout",
                        "params": {
                            "action": "Logout"
                        }
                    }
                },
                "yesText": kony.i18n.getLocalizedString("i18n.common.yes")
            }
        }
    };
});


