define("HomepageMA/AccountsUIModule/userfrmDashboardController", ['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility', 'SBADriverVariables'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility, SBADriverVariables) {
    var orientationHandler = new OrientationHandler();
    let sbaEnrolmentStatuses;
    let isOneYear = true;
    let businessHealth;
    let AccountsData;
    let isSingleBusinessView = false;
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let isLive;
    let sbaFeaturesDetails;
    let selectedSegData;
    let arrayForSBA = [];
    let indexOfBusiness = 0;
    let coreCustomers;
    let SBA_FEATURES;
    let SBA_ENROL_STATUS;
    let callFromIlpCompleteRetry = false;
    let isRetryTriggered = false;
    let selectedBusiness;
    let totalSbaBusiness = 0;
    let configurationManager = applicationManager.getConfigurationManager();
    return {
        /**
         * Method to patch update UI
         * @param {Object} uiData Data from presentation controller
         */
        sectionData: [],
        accounts: [],
        transactions: [],
        offset:0,
        lastRecord:'',
        isFavAccAvailable: false,
        isExtAccAvailable: false,
        isAdvancedFilterApplied: false,
        isCustomFilterApplied: false,
        isDefaultFilterApplied: false,
		TotalCurrency: true,
        accType: [],
        lbl1:"",
        lbl2:"",
        lbl3:"",
        lbl4:"",
        hiddenlblSelectedFilter: '',
        isSingleCustomerProfile: true,
        primaryCustomerId: [],
        accessibleCustomerIds: [],
        accountGroups: [],
        portfoliovaluesflag: true,
        filterIndex: '',
        profileAccess: "",
        cashPositionRequestdata: {},
        frmMenuScroll: false,
        //isAdvanceFilterOpen: false,
        //     isCalendarDropDownOpen: false,
        time: 10,
        customViewFlag: false,
        currentView: '',
        //currentViewData: [],
        currentViewId: '',
        chartDefaultValue: "",
        currentWidth: "",
        portfolioListLoaded: "",
        portfolioClearInterval: "",
        chartData:{},
        cashFlowSelectedWidget : "graph",
        updateFormUI: function(uiData) {
            if (uiData) {
                var scope = this;
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
                if (uiData.serviceError) {
                    this.setServiceError(uiData.serviceError)
                }
                if (uiData.campaignRes) {
                    this.campaignSuccess(uiData.campaignRes);
                }
                if (uiData.campaignError) {
                    this.view.flxBannerContainerDesktop.setVisibility(false);
                    this.view.flxBannerContainerMobile.setVisibility(false);
                }
                if (uiData.welcomeBanner) {
                    this.updateProfileBanner(uiData.welcomeBanner)
                }
                if (uiData.accountsSummary) {
                    if (!kony.sdk.isNullOrUndefined(uiData.accountsSummary.customViewType) && ((uiData.accountsSummary.customViewType === "Create") || (uiData.accountsSummary.customViewType === "Edit"))) {
                        this.isCustomFilterApplied = true;
                        this.isDefaultFilterApplied = false;
                    }
                    if (!kony.sdk.isNullOrUndefined(uiData.isDelete) && uiData.isDelete === true) {
                        if (this.isCustomFilterApplied === true)
                            if (this.currentViewId === uiData.deletedId) {
                                this.currentView = '';
                                this.isCustomFilterApplied = false;
                                this.currentViewId = '';
                                //this.currentViewData = [];
                            }
                    }
                    //this.dashboardRestoreLastView();
                    this.setUserDashboardVisibility();
                    if (uiData.accountsSummary.length == 0) {
                        this.view.flxAccountsContainer.setVisibility(false);
                    } else {
                        this.view.flxAccountsContainer.setVisibility(true);
                        this.updateAccountWidget(uiData.accountsSummary);
                    }
                    this.view.accountListMenu.setVisibility(false);
                }
                if (uiData.customView) {
                    this.setCustomViewsData(uiData.customView);
                }
                if (uiData.unreadCount) {
                    this.updateAlertIcon(uiData.unreadCount);
                    this.updatePriorityCount(uiData.unreadCount.priorityMessageCount);
                }
                if (uiData.UpcomingTransactions) {
                    this.showUpcomingTransactionsWidget(uiData.UpcomingTransactions)
                }
                if (uiData.PFMDisabled) {
                    this.disablePFMWidget()
                }
                if (uiData.PFMMonthlyWidget) {
                    if (!kony.sdk.isNullOrUndefined(this.view.mySpending.donutChart1) && applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.FINANCEMANAGEMENT)) this.view.mySpending.flxMySpendingWrapper.flxMySpending.remove(this.view.mySpending.flxMySpendingWrapper.flxMySpending.donutChart1);
                    this.initlizeDonutChart();
                    this.getPFMMonthlyDonutChart(uiData.PFMMonthlyWidget)
                    this.spendingTableData(uiData.PFMMonthlyWidget);
                }
                if (uiData.outageMessage) {
                    this.setOutageNotification(uiData.outageMessage.show, uiData.outageMessage.message);
                }
                if (uiData.passwordResetWarning) {
                    this.setPasswordResetNotification(uiData.passwordResetWarning.show, uiData.passwordResetWarning.message);
                }
                if (uiData.savedExteranlAccountsModel) {
                    this.presentExternalAccountsAddedConfirmation(uiData.savedExteranlAccountsModel);
                }
                if (uiData.externalBankLoginContext) {
                    this.showExternalBankLogin(uiData.externalBankLoginContext);
                }
                if (uiData.externalBankLogin) {
                    this.onExternalBankLoginSuccess(uiData.externalBankLogin);
                }
                if (uiData.externalBankLoginFailure) {
                    this.onExternalBankLoginFailure(uiData.externalBankFailure);
                }
                if (uiData.saveExternalBankCredentialsSuccess) {
                    this.onSuccessSaveExternalBankCredentailsSuccess(uiData.saveExternalBankCredentialsSuccess)
                }
                if (uiData.saveExternalBankCredentialsFailure) {
                    this.onSuccessSaveExternalBankCredentailsFailure(uiData.saveExternalBankCredentialsFailure)
                }
                if (uiData.externalBankAccountsModel) {
                    if (uiData.externalBankAccountsModel.length > 0) {
                        this.presentExternalAccountsList(uiData.externalBankAccountsModel);
                    } else {
                        this.onAllExternalAccountsAlreadyAdded();
                    }
                }
                if (uiData.TnCresponse) {
                    this.bindTnC(uiData.TnCresponse);
                }
                if (uiData.errorMsg) {
                    this.showError(uiData.errorMsg);
                }
				if (uiData.sbaErrorMsg) {
                    this.showSbaError(uiData.sbaErrorMsg);
                }
                if (uiData.key === BBConstants.CASH_POSITION) {
                    if (!kony.sdk.isNullOrUndefined(this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition)) {
                        this.view.flxMainChartCon.flxCashPostionChart.remove(this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition);
                    }
                    this.initializeCashPositionChart();
                    this.populateCashPositionChart(uiData.responseData);
                    this.initializeCashPositionSeg(uiData.responseData);
                    this.populateCashPositionSeg(uiData.responseData);
                    if(this.cashFlowSelectedWidget === "table"){
                        this.showTable();
                    }
                    else{
                        this.showChart();
                    }
                    this.onBreakpointChange(kony.application.getCurrentBreakpoint());
                }
                if (uiData.key === BBConstants.CASH_POSITION_ERROR) {
                    this.showAlertCashPositionChart(uiData.responseData);
                }
                if (uiData.key === BBConstants.APPROVALS_REQUESTS_COUNT) {
                    this.initApprovalRequestWidget(uiData.responseData);
                }
                if (uiData.key === BBConstants.APPROVALS_REQUESTS_COUNT_FAILURE) {
                    this.approvalRequestsServiceFailure();
                }
                if (uiData.campaign) {
                    CampaignUtility.showCampaign(uiData.campaign, this.view, "flxMain");
                }
                if (uiData.InvestmentAccountsData) {
                    this.loadInvestmentAccounts(uiData.InvestmentAccountsData);
                }
                if (uiData.sbaCashFlowData) {
                        uiData.sbaCashFlowData.recordsPast = isOneYear ? uiData.sbaCashFlowData.recordsPast.slice(-9) : uiData.sbaCashFlowData.recordsPast.slice(-4);
                        this.loadSbaCashFlowData(uiData.sbaCashFlowData);
                        this.view.flxSbaAnalysing.setVisibility(false);
                        if (selectedBusiness && selectedBusiness.sbaEnrolmentStatus.status !== sbaEnrolmentStatuses.COMPLETED) { //&& sbaPermissionCount == sbaPermissionCountInSuccess) {
                            callFromIlpCompleteRetry = false;
                            scope.updateSbaStatus(sbaEnrolmentStatuses.COMPLETED);
                        }
                        scope.toggleSbaFeatures();
                    }
                if (uiData.sbaHealthScore) {
                        scope.view.flxSbaAnalysing.setVisibility(false);
                        applicationManager.sbaJourney.forEach((data) => {
                            if (data.coreCustomerID === selectedBusiness.coreCustomerID && data.hamburgerMenu) {
                                data.hamburgerMenu.cashFlow = true;
                            }
                        });
                        this.view.flxSbaBusinessHealthScore.setVisibility(true);
                        this.view.flxSbaAnalysing.setVisibility(false);
                        this.view.lblGoingWellCount.text = `(${uiData.sbaHealthScore.DriversPositive.length})`;
                        this.view.lblNeedAttentionCount.text = `(${uiData.sbaHealthScore.DriversNegative.length})`;
                        this.loadSbaHealthScoreData(uiData.sbaHealthScore);
                        this.setsegSBADriversData(uiData.sbaHealthScore);
                        if (selectedBusiness && selectedBusiness.sbaEnrolmentStatus.status !== sbaEnrolmentStatuses.COMPLETED) {  //&& sbaPermissionCount == sbaPermissionCountInSuccess) {
                            callFromIlpCompleteRetry = false;
                            this.updateSbaStatus(sbaEnrolmentStatuses.COMPLETED);
                        }
                        scope.toggleSbaFeatures();
                    }
                if (uiData.updateSBAStatus) {
                    var updatedStatus = JSON.parse(uiData.updateSBAStatus.sbaEnrolmentStatus);
                    if (updatedStatus.status == OLBConstants.SBA_ENROLMENT_STATUS_CONFIG.RETRY) {
                        callFromIlpCompleteRetry = false;
                        // Updating SbaJourney object with status RETRY to rectify unwanted calls
                        this.updateSbaJourneyStatus(sbaEnrolmentStatuses.RETRY);
                        this.renderSbaRetryTile();
                    } else if (updatedStatus.status == OLBConstants.SBA_ENROLMENT_STATUS_CONFIG.CANCELED) {
                        this.updateSbaJourneyStatus(sbaEnrolmentStatuses.CANCELED);
                        this.renderApologiesTile(applicationManager.getSelectedSbaBusiness());
                        this.view.flxSba.setVisibility(false);
                    } else {
                        this.updateSbaJourneyStatus(sbaEnrolmentStatuses.COMPLETED);
                    }
                    scope.updateHamburger();
                }
                if (uiData.sbaEnrolmentStatus) {
                    if (uiData.sbaEnrolmentStatus.value.length > 0) {
                        let enrolmentValue = uiData.sbaEnrolmentStatus.value[0];
                        arrayForSBA[indexOfBusiness]["enrolmentStatus"] = {
                            EnrollmentState: enrolmentValue.EnrollmentState.trim(),
                            EventDateTime: enrolmentValue.EventDateTime,
                            EventMinutesAgo: enrolmentValue.EventMinutesAgo,
                        };
                    } else {
                        arrayForSBA[indexOfBusiness]["enrolmentStatus"] = uiData.sbaEnrolmentStatus.value;
                    }
                    applicationManager.setSbaJourney(arrayForSBA);
                    this.storeSBAPermissions();
                    this.enableSbaFunctionality(arrayForSBA[indexOfBusiness].BackendId);
                    scope.updateHamburger();
                }
                if (uiData.sbaEnrolmentError) {
                    scope.updateSbaEnrolmentStatus(false);
                }
                if (uiData.sbaFeatureDetails) {
                    sbaFeaturesDetails = uiData.sbaFeatureDetails.Response;
                    sbaFeaturesDetails.map((feature) => {
                        if (feature.hasOwnProperty("sbaEnrolmentStatus")) {
                            feature.sbaEnrolmentStatus = (typeof feature.sbaEnrolmentStatus) == 'object' ? feature.sbaEnrolmentStatus : JSON.parse(feature.sbaEnrolmentStatus);
                        }
                    });
                    applicationManager.setSbaJourney(sbaFeaturesDetails);
                    this.storeSBAPermissions();
                    scope.getSbaBusiness();
                    scope.updateHamburger();
                }
            }
        },
        spendingTableData: function(chartData) {
            this.view.mySpending.isVisible = true;
            this.view.mySpending.flxMySpending.isVisible = true;
            var scope = this;
            var dataMap = {
                "flxAssets": "flxAssets",
                "flxImgAssetsSort": "flxImgAssetsSort",
                "flxImgTotalSort": "flxImgTotalSort",
                "flxRow": "flxRow",
                "flxSpendingSectionHeader": "flxSpendingSectionHeader",
                "flxSpendingTable": "flxSpendingTable",
                "flxTotal": "flxTotal",
                "imgAssetsSort": "imgAssetsSort",
                "imgTotalSort": "imgTotalSort",
                "lblAssets": "lblAssets",
                "lblSeperator": "lblSeperator",
                "lblTotal": "lblTotal",
                "flxGroup1":"flxGroup1",
                "lblAssetsDupilicate": "lblAssetsDupilicate",
                "lblTotalDupilicate": "lblTotalDupilicate"
            }
            this.view.mySpending.segSpending.widgetDataMap = dataMap;
            var segData = [];
            var data = this.view.mySpending.segSpending.data
            var assetsdummy=data[0][0].lblAssets;
            var totaldummy=data[0][0].lblTotal;
            for (var i = 0; i < chartData.length; i++) {
                var data = {
                    "lblAssets": {
                        "text": chartData[i].categoryName + "(" + scope.getPercentage(chartData[i]) + ")"
                    },
                    "lblAssetsDupilicate":{
                        "text":assetsdummy +" "+chartData[i].categoryName + "(" + scope.getPercentage(chartData[i]) + ")"
                    },
                    "lblTotal": {
                        "text": "$" + chartData[i].cashSpent
                    },
                    "lblTotalDupilicate":{
                        "text":totaldummy +" "+"$" + chartData[i].cashSpent
                    },
                }
                segData.push(data);
            }
            var defaultData = this.view.mySpending.segSpending.data;
            var scope = this;
            defaultData[0][0].flxAssets = {
                "onClick": this.sortExpenses,
                "accessibilityConfig":{
                    a11yLabel:"My Expenses Column. No sort applied. Click to sort in ascending order",
                        "a11yARIA":{
                            "tabindex":0,
                            "role":"button"
                        }
                }
            };
            defaultData[0][0].imgAssetsSort = "sorting.png";
            defaultData[0][0].imgTotalSort = "sorting.png";
            defaultData[0][0].flxTotal = {
                "onClick": function() {
                    var segCombinedData = scope.view.mySpending.segSpending.data;
                    var rowData = scope.view.mySpending.segSpending.data[0][1];
                    for(i=0;i<rowData.length;i++){
                        rowData[i].lblTotal.text = rowData[i].lblTotal.text.slice(1);
                    }
                    var sortByType = "number";
                    var sortOrder = "ASC";
                    if(segCombinedData[0][0].imgTotalSort  === "sorting.png" || segCombinedData[0][0].imgTotalSort === "sorting_next.png"){
                        sortOrder = "ASC";
                        segCombinedData[0][0].imgTotalSort  = "sorting_previous.png";
                        segCombinedData[0][0].flxTotal.accessibilityConfig = {
                            a11yLabel:"Total Amount Column. Sorted in ascending order. Click to sort in descending order",
                            "a11yARIA":{
                                "tabindex":0,
                                "role":"button"
                            }
                        }
                    }
                    else{
                        sortOrder = "DESC";
                        segCombinedData[0][0].imgTotalSort = "sorting_next.png";
                        segCombinedData[0][0].flxTotal.accessibilityConfig = {
                            a11yLabel:"Total Amount Column. Sorted in descending order. Click to sort in ascending order",
                            "a11yARIA":{
                                "tabindex":0,
                                "role":"button"
                            }
                        }
                    }
                    segCombinedData[0][0].imgAssetsSort  = "sorting.png";
                    segCombinedData[0][0].flxAssets.accessibilityConfig = {
                        a11yLabel:"My Expenses Column. No sort applied. Click to sort in ascending order",
                        "a11yARIA":{
                            "tabindex":0,
                            "role":"button"
                        }
                    }
                    rowData.sort(function(a, b) {
                        var data1 = a["lblTotal"].text;
                        var segCombinedData = b["lblTotal"].text;
                        if (sortByType === "number") {
                            data1 = parseInt(data1);
                            segCombinedData = parseInt(segCombinedData);
                        } else {
                            data1 = data1.toLowerCase();
                            segCombinedData = segCombinedData.toLowerCase();
                        }
                        if (data1 > segCombinedData) {
                            if (sortOrder === "ASC") return 1;
                            else if (sortOrder === "DESC") return -1;
                        } else if (data1 < segCombinedData) {
                            if (sortOrder === "ASC") return -1;
                            else if (sortOrder === "DESC") return 1;
                        } else return 0;
                    });
                    for(i=0;i<rowData.length;i++){
                        rowData[i].lblTotal.text = "$"+rowData[i].lblTotal.text;
                    }
                    segCombinedData[0][1] = rowData;
                    scope.view.mySpending.segSpending.setData(segCombinedData);
                    scope.view.mySpending.segSpending.setActive(-1,0,"flxSpendingSectionHeader.flxGroup1.flxRow.flxTotal");
                },
                "accessibilityConfig":{
                    a11yLabel:"Total Amount Column. No sort applied. Click to sort in ascending order",
                        "a11yARIA":{
                            "tabindex":0,
                            "role":"button"
                        }
                }
            };
            defaultData[0][1] = segData;
            this.view.mySpending.segSpending.setData(defaultData);
            this.sortExpenses();
        },
        getPercentage: function(value){
            var percentage = Number((value.cashSpent/value.totalCashSpent)*100).toFixed() + "%";
            return percentage;
        },
        sortExpenses: function() {
            var scope =this;
            var segCombinedData = scope.view.mySpending.segSpending.data;
            var rowData = scope.view.mySpending.segSpending.data[0][1];
            var sortByType = "";
            var sortOrder = "ASC";
            if(segCombinedData[0][0].imgAssetsSort  === "sorting.png" || segCombinedData[0][0].imgAssetsSort === "sorting_next.png"){
                sortOrder = "ASC";
                segCombinedData[0][0].imgAssetsSort  = "sorting_previous.png";
                segCombinedData[0][0].flxAssets.accessibilityConfig = {
                    a11yLabel:"My Expenses Column. Sorted in ascending order. Click to sort in descending order",
                    "a11yARIA":{
                        "tabindex":0,
                        "role":"button"
                    }
                }
            }
            else{
                sortOrder = "DESC";
                segCombinedData[0][0].imgAssetsSort = "sorting_next.png";
                segCombinedData[0][0].flxAssets.accessibilityConfig = {
                    a11yLabel:"My Expenses Column. Sorted in descending order. Click to sort in ascending order",
                    "a11yARIA":{
                        "tabindex":0,
                        "role":"button"
                    }
                }
            }
            segCombinedData[0][0].imgTotalSort  = "sorting.png";
            segCombinedData[0][0].flxTotal.accessibilityConfig = {
                a11yLabel:"Total Amount Column. No sort applied. Click to sort in ascending order",
                "a11yARIA":{
                    "tabindex":0,
                    "role":"button"
                }
            }
            rowData.sort(function(a, b) {
                var data1 = a["lblAssets"].text;
                var segCombinedData = b["lblAssets"].text;
                if (sortByType === "number") {
                    data1 = parseInt(data1);
                    segCombinedData = parseInt(segCombinedData);
                } else {
                    data1 = data1.toLowerCase();
                    segCombinedData = segCombinedData.toLowerCase();
                }
                if (data1 > segCombinedData) {
                    if (sortOrder === "ASC") return 1;
                    else if (sortOrder === "DESC") return -1;
                } else if (data1 < segCombinedData) {
                    if (sortOrder === "ASC") return -1;
                    else if (sortOrder === "DESC") return 1;
                } else return 0;
            });
            segCombinedData[0][1] = rowData;
            scope.view.mySpending.segSpending.setData(segCombinedData);
            scope.view.mySpending.segSpending.setActive(-1,0,"flxSpendingSectionHeader.flxGroup1.flxRow.flxAssets");
        },
        /**
         * Method for refreshing the campaigns using timer
         */
        startTimertoUpdateAds: function() {
            kony.timer.schedule("RefreshCampaign", this.timerFunction, 1, true);
        },
        timerFunction: function() {
            this.time = this.time - 1;
            if (this.time === 0) {
                //if(applicationManager.getConfigurationManager().isMicroAppPresent("CampaignManagementMA")){
                this.loadAccountModule().presentationController.getAccountDashboardCampaignsOnBreakpointChange();
                //}            
                kony.timer.cancel("RefreshCampaign");
            }
        },
        /**
         * Method which is called if the response is succesful.
         * @params {object} -  contains campaign data
         */
        campaignSuccess: function(data) {
            var self = this;
            if (data.length === 0) {
                this.view.flxBannerContainerMobile.setVisibility(false);
                this.view.flxBannerContainerDesktop.setVisibility(false);
            } else if (kony.application.getCurrentBreakpoint() >= 1366 && !orientationHandler.isMobile && !orientationHandler.isTablet) {
                this.view.flxBannerContainerDesktop.setVisibility(true);
                this.view.flxBannerContainerMobile.setVisibility(false);
                this.view.imgBannerDesktop.src = data[0].imageURL;
                this.view.flxBannerContainerDesktop.onClick = function() {
                    CampaignUtility.onClickofInAppCampaign(data[0].destinationURL);
                };
            } else {
                var self = this;
                this.view.flxBannerContainerMobile.setVisibility(true);
                this.view.flxBannerContainerDesktop.setVisibility(false);
                this.view.imgBannerMobile.src = data[0].imageURL;
                this.view.flxBannerContainerMobile.onClick = function() {
                    CampaignUtility.onClickofInAppCampaign(data[0].destinationURL);
                };
            }
            this.AdjustScreen();
        },
        /**
         * Method to init frmAccountsLanding
         */
        initActions: function() {
            FormControllerUtility.setRequestUrlConfig(this.view.brwBodyTnC);
            var config = applicationManager.getConfigurationManager();
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule');
            this.initlizeDonutChart();
            // this.initializeCashPositionChart();
            this.loadAccountModule().presentationController.loadWealthComponents();
           // this.view.investmentLineChart.currentFilter = '';
          //  this.chartDefaultValue = this.view.investmentLineChart.currentFilter;
            this.view.WatchlistDashCard.watchlistPostShow = this.postShowWealthComp;
            this.view.marketIndexDashComp.marketIndexPostShow = this.postShowWealthComp;
            this.view.marketNewsCardComp.marketNewsPostShow = this.postShowWealthComp;
            this.view.recentActivityComp.recentActivityPostShow = this.postShowWealthComp;
            this.view.btnSBALearnMore.onClick = this.navigateToSBAScreen.bind(this);
            this.view.btnSBAOneYear.onClick = this.onClickofCashflowButton.bind(this,true);
            this.view.btnSBASixMonths.onClick = this.onClickofCashflowButton.bind(this,false);
            this.view.btnSbaActionStimulation.onClick = this.navigateToSBAStimulation.bind(this,true);
            this.view.btnSbaViewMoreDetails.onClick = this.navigateToSBAStimulation.bind(this,false);
            this.view.btnBHSViewDetails.onClick = this.showHealthAndDriversPopup.bind(this, true);
            this.view.flxCancel.onClick = this.showHealthAndDriversPopup.bind(this, false);
            this.view.btnAccProvider.onClick = this.navigateToSBAScreen.bind(this);
            this.view.flxChart.onClick = this.showChart;
            this.view.flxTable.onClick = this.showTable;
            this.view.btnAdvancedFiltersDropdown.onFocus = this.hideAdvancedFilters;
            this.view.flxDropDown.onFocus = this.hideAdvancedFilters;
        },
        hideAdvancedFilters: function() {
			if(this.view.flxAdvancedFilters.isVisible == true){
                this.advancedFiltersToggel();
                this.advancedFiltersAccessibility();
                //this.view.btnAdvancedFiltersDropdown.setActive(true);
			}
			},

        /**
         * Shows the business cashflow chart and hides the table
         */
        showChart: function() {
            this.view.flxMainChartCon.isVisible = true;
            this.view.segCashFlow.isVisible = false;
            this.view.flxChart.skin = "skbflx293276blue";
            this.view.lblChartIcon.skin = "sknLblFontType3Selected";
            this.view.flxTable.skin = "slFbox";
            this.view.lblTableIcon.skin = "sknLblFontType3Unselected";
            this.cashFlowSelectedWidget = "chart";
            this.view.flxLegendCredits.onClick = this.onClickCreditCashPosition;
            this.view.flxLegendDebits.onClick = this.onClickDebitCashPosition;
            this.view.flxLegendBalance.onClick = this.onClickTotalBalanceCashPosition;
            this.view.flxLegendCredits.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":0,
                    "aria-labelledby": "lblCreditsTitle",
                }
            }
            this.view.flxLegendDebits.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":0,
                    "aria-labelledby": "lblDebitsTitle",
                }
            }
            this.view.flxLegendBalance.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":0,
                    "aria-labelledby": "lblTotalBalanceTitle",
                }
            }
        },
        /**
         * Hides the business cashflow chart and shows the table
         */
        showTable: function() {
            this.view.flxMainChartCon.isVisible = false;
            this.view.segCashFlow.isVisible = true;
            this.view.flxChart.skin = "slFbox";
            this.view.lblChartIcon.skin = "sknLblFontType3Unselected";
            this.view.flxTable.skin = "skbflx293276blue";
            this.view.lblTableIcon.skin = "sknLblFontType3Selected";
            this.cashFlowSelectedWidget = "table";
            this.view.flxLegendCredits.onClick = null;
            this.view.flxLegendDebits.onClick =  null;
            this.view.flxLegendBalance.onClick = null;
            this.view.flxLegendCredits.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":-1
                }
            }
            this.view.flxLegendDebits.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":-1
                }
            }
            this.view.flxLegendBalance.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":-1
                }
            }
        },
        initializeCashPositionSeg: function(resp) {
            var scope = this;
            var segData = [];
            var row;
            var rowData = [];
            var data = [];
            var widgetMap = {
                "flxCashFlowTable": "flxCashFlowTable",
                "lblDuration": "lblDuration",
                "lblCredit": "lblCredit",
                "lblDebit": "lblDebit",
                "lblTotal": "lblTotal",
                "flxCashFlowSectionHeader": "flxCashFlowSectionHeader",
                "flxImg1": "flxImg1",
                "img1": "img1",
                "flxImg2": "flxImg2",
                "img2": "img2",
                "flxImg3": "flxImg3",
                "img3": "img3",
                "flxImg4": "flxImg4",
                "img4": "img4",
                "flxCashFlowTableMobile": "flxCashFlowTableMobile",
                "flxDropdown": "flxDropdown",
                "lblDropdown": "lblDropdown",
                "lbl1": "lbl1",
                "lbl2": "lbl2",
                "lblCreditValue": "lblCreditValue",
                "lblDebitValue": "lblDebitValue",
                "flxCashFlowSectionHeaderMobile": "flxCashFlowSectionHeaderMobile",
                "flxDetails":"flxDetails",
                "flxDropdown":"flxDropdown",
                "lblDropdown" : "lblDropdown",
                "lblDurationDupilicate": "lblDurationDupilicate",
                "lblCreditDupilicate": "lblCreditDupilicate",
                "lblDebitDupilicate": "lblDebitDupilicate",
                "lblTotalDupilicate": "lblTotalDupilicate"
            };
            this.view.segCashFlow.widgetDataMap = widgetMap;
            var response = this.populateCashPositionSeg(resp);
            //segment partially done. pending things - mobile bp and onclicks and sort functionality
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.lbl2={text:kony.i18n.getLocalizedString("i18n.wealth.total")};
                this.lbl1={text:scope.cashPositionRequestdata.Type};
                segData.push({
                    "lblDuration": {
                        text: scope.cashPositionRequestdata.Type,
                    },
                    "lblCredit": {
                        text: kony.i18n.getLocalizedString("i18n.wealth.total"),
                    },
                    "template": "flxCashFlowSectionHeaderMobile",
                    "flxImg1": { 
                        "onClick": function(eventobject, context) {
                            scope.sortByNumber(context, "lblDuration", 1, 2);
                        }.bind(this),
                        "accessibilityConfig": {
                            "a11yLabel": scope.cashPositionRequestdata.Type+" Column Sorted in Ascending order. Click to Sort in Descending order",
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button"
                            }
                        }
                    },
                    "flxImg2": {
                        "onClick": function(eventobject, context) {
                            scope.sortByNumber(context, "lblCredit", 2, 2);
                        }.bind(this),
                        "accessibilityConfig": {
                           "a11yLabel": kony.i18n.getLocalizedString("i18n.wealth.total")+" Column No Sort Applied. Click to Sort in Ascending order",
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button"
                                
                            }
                        }
                    },
                    "img1": {
                        "src": "sorting_previous.png"
                    },
                    "img2": {
                        "src": "sorting.png"
                    },
                });
                for (i = 0; i < response.length; i++) {
                    row = {
                        "lblDropdown": {
                            "text": "O"
                        },
                        "lbl1": {
                            "text": response[i].month
                        },
                        "lbl2": {
                            "text": CommonUtilities.formatCurrencyWithCommas(response[i].label3)
                        },
                        "lblCredit": {
                            "text": kony.i18n.getLocalizedString("i18n.konybb.accountsLanding.Credit")
                        },
                        "lblCreditValue": {
                            "text": CommonUtilities.formatCurrencyWithCommas(response[i].label1)
                        },
                        "lblDebit": {
                            "text": kony.i18n.getLocalizedString("i18n.konybb.accountsLanding.Debit")
                        },
                        "lblDebitValue": {
                            "text": CommonUtilities.formatCurrencyWithCommas(response[i].label2)
                        },
                        "flxDropdown": {
                            onClick: function(eventobject, context) {
                                this.onClickCashFlowDropdown(context); //to be implemented
                            }.bind(this),
                            "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "button",
                                    "aria-expanded": false
                                }
                            }
                        },
                        "flxDetails":{
                            isVisible: false
                        },
                        "template": "flxCashFlowTableMobile"
                    };
                    rowData.push(row);
                }
                segData.push(rowData);
                data.push(segData);
            } else {
                this.lbl2={text:kony.i18n.getLocalizedString("i18n.konybb.accountsLanding.Credit")};
                this.lbl1={text:scope.cashPositionRequestdata.Type};
                this.lbl3={text:kony.i18n.getLocalizedString("i18n.konybb.accountsLanding.Debit")};
                this.lbl4={text:kony.i18n.getLocalizedString("i18n.wealth.total")};
                segData.push({
                    "lblDuration": {
                        text: scope.cashPositionRequestdata.Type,
                    },
                    "lblCredit": {
                        text: kony.i18n.getLocalizedString("i18n.konybb.accountsLanding.Credit")
                    },
                    "lblDebit": {
                        text: kony.i18n.getLocalizedString("i18n.konybb.accountsLanding.Debit"),
                    },
                    "lblTotal": {
                        text: kony.i18n.getLocalizedString("i18n.wealth.total"),
                    },
                    "template": "flxCashFlowSectionHeader",
                    "flxImg1": {
                        "onClick": function(eventobject, context) {
                            scope.sortByNumber(context, "lblDuration", 1);
                        }.bind(this),
                        "accessibilityConfig": {
                            "a11yLabel": scope.cashPositionRequestdata.Type+" Column Sorted in Ascending order. Click to Sort in Descending order",
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button"
                            }
                        }
                    },
                    "flxImg2": {
                        "onClick": function(eventobject, context) {
                            scope.sortByNumber(context, "lblCredit", 2);
                        }.bind(this),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.konybb.accountsLanding.Credit")+" Column No Sort Applied. Click to Sort in Ascending order",
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button"
                            }
                        }
                    },
                    "flxImg3": {
                        "onClick": function(eventobject, context) {
                            scope.sortByNumber(context, "lblDebit", 3);
                        }.bind(this),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.konybb.accountsLanding.Debit")+" Column No Sort Applied. Click to Sort in Ascending order",
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button"
                            }
                        }
                    },
                    "flxImg4": {
                        "onClick": function(eventobject, context) {
                            scope.sortByNumber(context, "lblTotal", 4);
                        }.bind(this),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.wealth.total")+" Column No Sort Applied. Click to Sort in Ascending order",
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button"
                            }
                        }
                    },
                    "img1": {
                        "src": "sorting_previous.png"
                    },
                    "img2": {
                        "src": "sorting.png"
                    },
                    "img3": {
                        "src": "sorting.png"
                    },
                    "img4": {
                        "src": "sorting.png"
                    }
                });
                for (i = 0; i < response.length; i++) {
                    row = {
                        "lblDuration": {
                            text: response[i].month
                        },
                        "lblDurationDupilicate": {
                            text: scope.cashPositionRequestdata.Type+" "+response[i].month
                        },
                        "lblCredit": {
                            text: CommonUtilities.formatCurrencyWithCommas(response[i].label1)
                        },
                        "lblCreditDupilicate": {
                            text: kony.i18n.getLocalizedString("i18n.konybb.accountsLanding.Credit")+" "+CommonUtilities.formatCurrencyWithCommas(response[i].label1)
                        },
                        "lblDebit": {
                            text: CommonUtilities.formatCurrencyWithCommas(response[i].label2)
                        },
                        "lblDebitDupilicate": {
                            text: kony.i18n.getLocalizedString("i18n.konybb.accountsLanding.Debit")+" "+CommonUtilities.formatCurrencyWithCommas(response[i].label2)
                        },
                        "lblTotal": {
                            text: CommonUtilities.formatCurrencyWithCommas(response[i].label3)
                        },
                        "lblTotalDupilicate": {
                            text: kony.i18n.getLocalizedString("i18n.wealth.total")+" "+CommonUtilities.formatCurrencyWithCommas(response[i].label3)
                        },
                        "template": "flxCashFlowTable"
                    };
                    rowData.push(row);
                }
            segData.push(rowData);
            data.push(segData);
            }
            this.view.segCashFlow.setData(data);
        },
        /**
         * Method to hide or view details of a row in mobile breakpoint for cash flow
         */
        onClickCashFlowDropdown: function(){
            var scopeObj = this;
            if(scopeObj.view.segCashFlow.data){}

        },
        populateCashPositionSeg: function(data) {
            var scope = this;
            data.forEach(function(item) {
                if (scope.cashPositionRequestdata.Type === "Daily") {
                    var formattedDate = CommonUtilities.getFrontendDateString(`${item.month}-${scope.cashPositionRequestdata.month}-${scope.cashPositionRequestdata.endYear}`, "MM/DD/YYYY");
                    item.month = formattedDate;
                }
                else if (scope.cashPositionRequestdata.Type === "Monthly") {
                    var monthMap = {
                        Jan: "January",
                        Feb: "February",
                        Mar: "March",
                        Apr: "April",
                        May: "May",
                        Jun: "June",
                        Jul: "July",
                        Aug: "August",
                        Sep: "September",
                        Oct: "October",
                        Nov: "November",
                        Dec: "December"
                    };
                    item.month = monthMap[item.month] || item.month;
                }
            });
            return data;
        },
        sortByNumber: function(context, colName, colNum, colCount) {
            var scopeObj = this;
            var sortType = "ASC";
            if (scopeObj.view.segCashFlow.data[0][0]["img" + colNum].src === "sorting_previous.png") {
                scopeObj.view.segCashFlow.data[0][0]["img" + colNum].src = "sorting_next.png";
                sortType = "DESC";
                scopeObj.view.segCashFlow.data[0][0]["flxImg" + colNum].accessibilityConfig = {
                    "a11yLabel": scopeObj["lbl"+colNum].text+" Column Sorted in Descending order. Click to Sort in Ascending order",
                    "a11yARIA": {
                        "role": "button"
                    }
                }
            } else {
                scopeObj.view.segCashFlow.data[0][0]["img" + colNum].src = "sorting_previous.png";
                scopeObj.view.segCashFlow.data[0][0]["flxImg" + colNum].accessibilityConfig = {
                    "a11yLabel": scopeObj["lbl"+colNum].text+" Column Sorted in Ascending order. Click to Sort in Descending order",
                    "a11yARIA": {
                        "role": "button"
                    }
                }
            }
            if(!colCount){
                colCount = 4; // for desktop view, 4 columns are there.
            }
            for(var col=1; col<=colCount; col++ ){
                if(col!==colNum){
                    scopeObj.view.segCashFlow.data[0][0]["flxImg" + col].accessibilityConfig = {
                        "a11yLabel": scopeObj["lbl"+col].text+" Column No Sort Applied. Click to Sort in Ascending order",
                        "a11yARIA": {
                            "role": "button"
                        }
                    };
                    scopeObj.view.segCashFlow.data[0][0]["img" + col].src = "sorting.png";
                }
            }

            var colData = scopeObj.view.segCashFlow.data[0][0];
            var dataToSort = scopeObj.view.segCashFlow.data[0][1];
            var sortedData = scopeObj.getSortedData(dataToSort, colName, sortType);
            var segData = [
                [colData, sortedData]
            ];
            scopeObj.view.segCashFlow.setData(segData);
            scopeObj.view.forceLayout();
            if(kony.application.getCurrentBreakpoint()===640){
                var path1="flxCashFlowSectionHeaderMobile.flxMainGroup.flxGroup.flxRow.flxCol"+colNum+".flxImg"+colNum;
                scopeObj.view.segCashFlow.setActive(-1, 0, path1);
            }
            else{
                var path="flxCashFlowSectionHeader.flxMainGroup.flxGroup.flxRow.flxCol"+colNum+".flxImg"+colNum;
                scopeObj.view.segCashFlow.setActive(-1,0,path);
            }
        },
        getSortedData: function(data, sortField, sortType) {
            var scope = this;
            data.sort(function(a, b) {
                var data1 = a[sortField].text;
                var data2 = b[sortField].text;
                function compareMonths(month1, month2) {
                    const months = [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    if(sortType === "ASC"){
                    return months.indexOf(month1) - months.indexOf(month2);
                    }
                    else{
                        return months.indexOf(month2) - months.indexOf(month1);
                    }
                }
                function compareWeeks(week1, week2) {
                    const weekOrder = ["First Week", "Second Week", "Third Week", "Fourth Week", "Fifth Week"];
                    const week1Index = weekOrder.indexOf(week1);
                    const week2Index = weekOrder.indexOf(week2);
                    if(sortType === "ASC"){
                    return week1Index - week2Index;
                    }
                    else{
                        return week2Index - week1Index;
                    }

                }
                if(sortField === "lblCredit" || sortField === "lblDebit" || sortField === "lblTotal"){ //check if its a amount
                    data1 = parseFloat(data1.replace(/[^0-9.-]+/g,""));
                    data2 = parseFloat(data2.replace(/[^0-9.-]+/g,""));
                }
                else if (scope.cashPositionRequestdata.Type === "Monthly") { // Check if it's a month
                    return compareMonths(data1, data2);
                } else if (scope.cashPositionRequestdata.Type === "Weekly") { // Check if it's a week
                    return compareWeeks(data1, data2);
                } else if (scope.cashPositionRequestdata.Type === "Daily") { // Check if it's a week
                    data1 = data1.toLowerCase();
                    data2 = data2.toLowerCase();
                }
                else {
                    data1 = parseInt(data1);
                    data2 = parseInt(data2);
                }
                if (data1 > data2) {
                    if (sortType === "ASC") return 1;
                    else if (sortType === "DESC") return -1;
                  } else if (data1 < data2) {
                    if (sortType === "ASC") return -1;
                    else if (sortType === "DESC") return 1;
                  }              
                  return 0;
            });
            return data;
        },

        /**
         *UI Setup for Dashboard Switcher for combined user
         */
        setupUIForDashboardSwitcher: function() {
            this.currDashboard = 0; //0 is combined, 1 is personal, 2 is business
            var width = kony.application.getCurrentBreakpoint();
            this.dashboardSwitcher = 0;
            if (orientationHandler.isMobile || width === 640) {
                this.view.customheader.topmenu.flxCombined.setVisibility(false);
                this.view.customheader.topmenu.flxCombinedMobile.setVisibility(false);
                this.view.customheader.topmenu.lblDashboardIconMobile.text = "d";
                this.view.customheader.topmenu.flxCombinedAccessMenuMobile.setVisibility(false);
                this.view.customheader.topmenu.lblDropboxMobile.text = "O";
                this.view.customheader.topmenu.flxCombinedMobile.onClick = this.showDashboardSwitcher.bind(this);
                this.view.customheader.topmenu.flxCombinedAccessMobile.onClick = this.showDashboardSwitcher.bind(this);
            } else {
                if (this.view.lblSelectedFilter.text === kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")) {
                    this.view.customheader.topmenu.lblDashboardHeader.text = kony.i18n.getLocalizedString("i18n.header.combined");
                    this.view.customheader.topmenu.lblDashboardIcon.text = "d";
                }
                this.view.customheader.topmenu.flxCombined.setVisibility(false);
                this.view.customheader.topmenu.flxCombinedAccessMenu.setVisibility(false);
                this.view.customheader.topmenu.lblDropbox.text = "O";
                this.view.customheader.topmenu.flxCombined.onClick = this.showDashboardSwitcher.bind(this);
                this.view.customheader.topmenu.flxCombinedAccess.onClick = this.showDashboardSwitcher.bind(this);
                if (orientationHandler.isTablet || width === 1024) {
                    this.view.customheader.topmenu.flxCombined.right = "18dp";
                    this.view.customheader.topmenu.lblDashboardHeader.width = "130dp";
                    this.view.customheader.topmenu.flxCombined.width = "225dp";
                    this.view.customheader.topmenu.lblDashboard.text = "";
                    this.view.customheader.topmenu.flxCombined.forceLayout();
                }
            }
        },
        /**
         *onClick Action for DashboardSwitcher for combined user
         */
        showDashboardSwitcher: function() {
            var self = this;
            var width = kony.application.getCurrentBreakpoint();
            this.closePopupAndFilterScreens("all");
            if (orientationHandler.isMobile || width === 640) {
                if (this.dashboardSwitcher === 1) {
                    this.dashboardSwitcher = 0;
                    self.view.customheader.topmenu.flxCombinedAccessMenuMobile.setVisibility(false);
                    self.view.customheader.topmenu.lblDropboxMobile.text = "O";
                    return;
                }
            } else {
                if (this.dashboardSwitcher === 1) {
                    this.dashboardSwitcher = 0;
                    self.view.customheader.topmenu.flxCombinedAccessMenu.setVisibility(false);
                    self.view.customheader.topmenu.lblDropbox.text = "O";
                    return;
                }
            }
            var data = [{
                "lblDasboardName": {
                    "text": kony.i18n.getLocalizedString("i18n.header.business"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.header.business")
                },
                "lblDashboardIcon": {
                    "isVisible": (orientationHandler.isMobile || width === 640) ? true : false,
                    "text": 'r'
                },
                "flxCombinedAccess": {
                    "onTouchEnd": this.dashboardOnClick.bind(this, 2)
                }
            }, {
                "lblDasboardName": {
                    "text": kony.i18n.getLocalizedString("i18n.header.personal"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.header.personal")
                },
                "lblDashboardIcon": {
                    "isVisible": (orientationHandler.isMobile || width === 640) ? true : false,
                    "text": 's'
                },
                "flxCombinedAccess": {
                    "onTouchEnd": this.dashboardOnClick.bind(this, 1)
                }
            }, {
                "lblDasboardName": {
                    "text": kony.i18n.getLocalizedString("i18n.header.combined"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.header.combined")
                },
                "lblDashboardIcon": {
                    "isVisible": (orientationHandler.isMobile || width === 640) ? true : false,
                    "text": 'c'
                },
                "flxCombinedAccess": {
                    "onTouchEnd": this.dashboardOnClick.bind(this, 0)
                }
            }];
            if (orientationHandler.isMobile || width === 640) {
                if (self.view.customheader.topmenu.flxCombinedAccessMenuMobile.isVisible === true) {
                    this.dashboardSwitcher = 0;
                    self.view.customheader.topmenu.flxCombinedAccessMenuMobile.setVisibility(false);
                    self.view.customheader.topmenu.lblDropboxMobile.text = "O";
                    return;
                }
                self.view.customheader.topmenu.segCombinedAccessMenuMobile.widgetDataMap = {
                    "flxCombinedAccess": "flxCombinedAccess",
                    "lblDasboardName": "lblDasboardName",
                    "lblDashboardIcon": "lblDashboardIcon"
                };
                self.view.customheader.topmenu.segCombinedAccessMenuMobile.setData(data);
                self.view.customheader.topmenu.flxCombinedAccessMenuMobile.setVisibility(true);
                this.dashboardSwitcher = 1;
                self.view.customheader.topmenu.lblDropboxMobile.text = "P";
            } else {
                if (self.view.customheader.topmenu.flxCombinedAccessMenu.isVisible === true) {
                    this.dashboardSwitcher = 0;
                    self.view.customheader.topmenu.flxCombinedAccessMenu.setVisibility(false);
                    self.view.customheader.topmenu.lblDropbox.text = "O";
                    return;
                }
                self.view.customheader.topmenu.segMenuDropdown.widgetDataMap = {
                    "flxCombinedAccess": "flxCombinedAccess",
                    "lblDasboardName": "lblDasboardName",
                    "lblDashboardIcon": "lblDashboardIcon"
                };
                self.view.customheader.topmenu.segMenuDropdown.setData(data);
                self.view.customheader.topmenu.flxCombinedAccessMenu.setVisibility(true);
                this.dashboardSwitcher = 1;
                self.view.customheader.topmenu.lblDropbox.text = "P";
            }
        },
        resetUIforDashboardSwitching: function(self) {
            var width = kony.application.getCurrentBreakpoint();
            //for header
            if (!(orientationHandler.isMobile || width === 1024)) self.view.customheader.topmenu.lblDashboardIcon.setVisibility(true);
            //for left container
            self.view.flxAccountsContainer.setVisibility(true); //Accounts Container
            self.view.AddExternalAccounts.setVisibility(false); //some intermediate step to add external accounts
            self.view.flxMyCashPosition.setVisibility(true); //MyCashPostion Container (Business Cash postion chart)
            self.view.upcomingTransactionsCombined.setVisibility(true); // Upcoming Transactions
            //for right container
            //self.view.flxRightContainer.setVisibility(true);
            self.view.flxApprovalAndRequest.setVisibility(true); //Approvals and Requests Dashboard
            self.view.mySpending.setVisibility(true); //My Spending Charts
            self.view.flxRightContainer.forceLayout();
            //campains are meant to be everywhere
        },
        /**
         *onClick Action for Dashboard Type Selection for combined user
         */
        dashboardRestoreLastView: function() {
            var self = this;
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            if (isCombinedUser) {
                self.currDashboard = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');
                if (kony.sdk.isNullOrUndefined(self.currDashboard) || self.currDashboard === -1) {
                    self.currDashboard = 0;
                    applicationManager.getConfigurationManager().setConfigurationValue('combinedDashboardView', self.currDashboard);
                    if (!((kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) || (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)))
                        if (this.currDashboard === 0) this.setUserDashboardVisibility();
                    return;
                }
                var dashoard2Show = CommonUtilities.cloneJSON(self.currDashboard);
                self.currDashboard = -1;
                self.dashboardOnClick(dashoard2Show);
            }
            if (!((kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) || (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet))) this.setUserDashboardVisibility();
        },
        /**
         *onClick Action for Dashboard Type Selection for combined user
         */
        dashboardOnClick: function(type) {
            var self = this;
            var width = kony.application.getCurrentBreakpoint();
            if (orientationHandler.isMobile || width === 640) {
                self.view.customheader.topmenu.flxCombinedAccessMenuMobile.setVisibility(false);
                this.dashboardSwitcher = 0;
                self.view.customheader.topmenu.lblDropboxMobile.text = "O";
            } else {
                self.view.customheader.topmenu.lblDropbox.text = "O";
                this.dashboardSwitcher = 0;
                self.view.customheader.topmenu.flxCombinedAccessMenu.setVisibility(false);
            }
            if (kony.sdk.isNullOrUndefined(type)) return;
            if (typeof type !== "number") return;
            if (self.currDashboard === type) return; // this is for optimization only
            FormControllerUtility.showProgressBar(self.view);
            self.currDashboard = type;
            //if(kony.sdk.isNullOrUndefined(self.accounts) || self.accounts.length === 0) {
            self.accounts = this.loadAccountModule().presentationController.accounts;
            //}
            applicationManager.getConfigurationManager().setConfigurationValue('combinedDashboardView', self.currDashboard);
            //       if(this.isCombinedUser)
            self.resetUIforDashboardSwitching(self); // this function just shows all the flexes so that this function just have to hide and change texts
            switch (type) {
                case 0:
                    if (orientationHandler.isMobile || width === 640) {
                        self.view.customheader.topmenu.lblDashboardIconMobile.skin = "sknOlbFontsIconsffffff12px";
                        self.view.customheader.topmenu.lblDashboardIconMobile.text = "c";
                    } else {
                        self.view.customheader.topmenu.lblDashboardIcon.skin = "sknOlbFontsIconsNew00000015px";
                        self.view.customheader.topmenu.lblDashboardHeader.text = kony.i18n.getLocalizedString("i18n.header.combined");
                        self.view.customheader.topmenu.lblDashboardHeader.toolTip = kony.i18n.getLocalizedString("i18n.header.combined");
                        self.view.customheader.topmenu.lblDashboardIcon.text = "c";
                    }
                    self.updateAccountWidget(self.accounts, true);
                    self.view.upcomingTransactionsCombined.initSegmentData(self.transactions, orientationHandler, self.accounts, type);
                    break;
                case 1:
                    if (orientationHandler.isMobile || width === 640) {
                        self.view.customheader.topmenu.lblDashboardIconMobile.skin = "sknOlbFontsIconsffffff12px";
                        self.view.customheader.topmenu.lblDashboardIconMobile.text = "s";
                    } else {
                        self.view.customheader.topmenu.lblDashboardIcon.skin = "sknOlbFontsIcons00000015px";
                        self.view.customheader.topmenu.lblDashboardHeader.text = kony.i18n.getLocalizedString("i18n.header.personal");
                        self.view.customheader.topmenu.lblDashboardHeader.toolTip = kony.i18n.getLocalizedString("i18n.header.personal");
                        self.view.customheader.topmenu.lblDashboardIcon.text = "s";
                    }
                    self.view.flxMyCashPosition.setVisibility(false);
                    self.view.flxApprovalAndRequest.setVisibility(false);
                    self.updateAccountWidget(self.accounts, false);
                    self.view.upcomingTransactionsCombined.initSegmentData(self.transactions, orientationHandler, self.accounts, type);
                    break;
                case 2:
                    if (orientationHandler.isMobile || width === 640) {
                        self.view.customheader.topmenu.lblDashboardIconMobile.skin = "sknOlbFontsIconsffffff12px";
                        self.view.customheader.topmenu.lblDashboardIconMobile.text = "r";
                    } else {
                        self.view.customheader.topmenu.lblDashboardIcon.skin = "sknOlbFontsIcons00000015px";
                        self.view.customheader.topmenu.lblDashboardIcon.text = "r";
                        self.view.customheader.topmenu.lblDashboardHeader.text = kony.i18n.getLocalizedString("i18n.header.business");
                        self.view.customheader.topmenu.lblDashboardHeader.toolTip = kony.i18n.getLocalizedString("i18n.header.business");
                    }
                    self.view.mySpending.setVisibility(false);
                    self.updateAccountWidget(self.accounts, true);
                    self.view.upcomingTransactionsCombined.initSegmentData(self.transactions, orientationHandler, self.accounts, type);
                    break;
            }
            FormControllerUtility.hideProgressBar(self.view);
            self.view.forceLayout();
            self.AdjustScreen();
        },
        breakpointChangeHandlerForDashboard() {
            var width = kony.application.getCurrentBreakpoint();
            var isMobile = orientationHandler.isMobile || width === 640;
            var isTablet = orientationHandler.isTablet || width === 1024;
            var isDesktop = !(isMobile || isTablet);
            var dashboard = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');
            var dashboardIcon = "";
            var dashboardtext = "";
            var self = this;
            switch (dashboard) {
                case 0:
                    dashboardIcon = "d";
                    dashboardtext = kony.i18n.getLocalizedString("i18n.header.combined");
                    break;
                case 1:
                    dashboardIcon = "U";
                    dashboardtext = kony.i18n.getLocalizedString("i18n.header.personal");
                    break;
                case 2:
                    dashboardIcon = "c";
                    dashboardtext = kony.i18n.getLocalizedString("i18n.header.business");
                    break;
            }
            if (isMobile) {
                self.view.customheader.topmenu.flxCombined.setVisibility(false);
                //         if(this.isCombinedUser)
                self.view.customheader.topmenu.flxCombinedMobile.setVisibility(false);
                //         else
                self.view.customheader.topmenu.flxCombinedMobile.setVisibility(false);
                self.view.customheader.topmenu.lblDashboardIconMobile.text = dashboardIcon;
                self.view.customheader.topmenu.flxCombinedAccessMenuMobile.setVisibility(false);
                this.dashboardSwitcher = 0;
                self.view.customheader.topmenu.lblDropboxMobile.text = "O";
                self.view.customheader.topmenu.flxCombinedMobile.onClick = this.showDashboardSwitcher.bind(this);
                self.view.customheader.topmenu.flxCombinedAccessMobile.onClick = this.showDashboardSwitcher.bind(this);
            }
            if (isTablet || isDesktop) {
                self.view.customheader.topmenu.flxCombined.setVisibility(false);
                self.view.customheader.topmenu.flxCombinedMobile.setVisibility(false);
                self.view.customheader.topmenu.flxCombinedAccessMenu.setVisibility(false);
                self.view.customheader.topmenu.lblDropbox.text = "O";
                this.dashboardSwitcher = 0;
                self.view.customheader.topmenu.lblDashboardIcon.text = dashboardIcon;
                self.view.customheader.topmenu.lblDashboardHeader.text = dashboardtext;
                self.view.customheader.topmenu.flxCombined.onClick = this.showDashboardSwitcher.bind(this);
                self.view.customheader.topmenu.flxCombinedAccess.onClick = this.showDashboardSwitcher.bind(this);
                if (dashboard === 1) {
                    self.view.customheader.topmenu.lblDashboardIcon.setVisibility(false);
                } else {
                    self.view.customheader.topmenu.lblDashboardIcon.setVisibility(true);
                }
            }
            if (isDesktop) {
                self.view.customheader.topmenu.lblDashboard.text = kony.i18n.getLocalizedString("i18n.header.dashboard");
                self.view.customheader.topmenu.flxCombined.right = "6.5" + ViewConstants.POSITIONAL_VALUES.PERCENTAGE;
                self.view.customheader.topmenu.lblDashboardHeader.width = "150" + ViewConstants.POSITIONAL_VALUES.DP;
                self.view.customheader.topmenu.flxCombined.width = "325" + ViewConstants.POSITIONAL_VALUES.DP;
            }
            if (isTablet) {
                self.view.customheader.topmenu.lblDashboard.text = "";
                self.view.customheader.topmenu.flxCombined.right = "5" + ViewConstants.POSITIONAL_VALUES.DP;
                self.view.customheader.topmenu.lblDashboardHeader.width = "130" + ViewConstants.POSITIONAL_VALUES.DP;
                self.view.customheader.topmenu.flxCombined.width = "225" + ViewConstants.POSITIONAL_VALUES.DP;
            }
            self.view.customheader.topmenu.flxCombined.forceLayout();
            self.view.customheader.topmenu.flxCombinedMobile.forceLayout();
        },
        /**  Returns height of the page
         * @returns {String} height height of the page
         */
        getPageHeight: function() {
            var height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT;
            return height + ViewConstants.POSITIONAL_VALUES.DP;
        },
        /**
         * Method to load and return Messages and Alerts Module.
         * @returns {object} Messages and Alerts Module object.
         */
        loadAccountModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
        },
        /**
         * initlizeDonutChart: Method is used to initlize the DonutChart for custom widget
         */
        initlizeDonutChart: function() {
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxMainWrapper', 'flxFormContent']);
            var legendPosition;
            var chartRight, chartLeft;
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                legendPosition = 'right';
                chartRight = 50;
                chartLeft = 50;
            } else {
                legendPosition = 'bottom';
                chartRight = 25;
                chartLeft = 25;
            }
            var data = [];
            var options = {
                height: 310,
                width: (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? this.view.mySpending.flxMySpending.frame.width : this.view.flxMainWrapper.frame.width * 0.26, //this.view.mySpending.flxMySpending.frame.width,
                position: 'top',
                chartArea: {
                    right: chartRight,
                    left: chartLeft
                },
                title: '',
                pieHole: 0.6,
                pieSliceText: 'none',
                toolTip: {
                    text: 'value'
                },
                legend: legendPosition,
                colors: ["#FEDB64", "#E87C5E", "#6753EC", "#E8A75E", "#3645A7", "#04B6DF", "#8ED174", "#D6B9EA", "#B160DC", "#23A8B1"]
            };
            var donutChart = new kony.ui.CustomWidget({
                "id": "donutChart1",
                "isVisible": true,
                "left": "1" + ViewConstants.POSITIONAL_VALUES.DP,
                "top": "-35" + ViewConstants.POSITIONAL_VALUES.DP,
                "width": (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? "500" + ViewConstants.POSITIONAL_VALUES.DP : "100%", //"500" + ViewConstants.POSITIONAL_VALUES.DP,
                "height": "390" + ViewConstants.POSITIONAL_VALUES.DP,
                "zIndex": 1000000
            }, {
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "widgetName": "DonutChart",
                "chartData": data,
                "chartProperties": options,
                "OnClickOfPie": function() {}
            });
            this.view.mySpending.flxMySpendingWrapper.onClick = function() {
                this.closePopupAndFilterScreens("all");
                if (applicationManager.getConfigurationManager().isMicroAppPresent("FinanceManagementMA")) {
                    var pfmModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PersonalFinanceManagementModule");
                    pfmModule.presentationController.initPFMForm();
                }
            }
            this.view.mySpending.flxMySpendingWrapper.flxMySpending.add(donutChart);
        },
        initializeCashPositionChart: function() {
            var data = [];
            var options = {
                legend: {
                    position: "none"
                },
                seriesType: 'bars',
                series: {
                    0: {
                        type: 'line'
                    },
                    1: {
                        type: 'line'
                    },
                    2: {
                        targetAxisIndex: 1,
                    }
                },
                vAxes: {
                    0: {
                        textPosition: 'none'
                    },
                    1: {}
                },
                colors: ['#04A615', '#FCEADC', '#D9E3EB'],
                bar: {
                    groupWidth: "30%"
                },
                curveType: 'function',
                pointSize: 5,
                vAxis: {
                    format: 'short',
                    minValue: 0,
                    maxValue: 90000,
                    viewWindowMode: 'explicit',
                    viewWindow: {
                        min: 0,
                    },
                    textStyle: {
                        color: '#727272',
                        fontName: "lato-regular",
                        fontSize: 9
                    },
                    gridlines: {
                        count: 10,
                        color: '#E3E3E3g'
                    },
                    baselineColor: '#A0A0A0'
                },
                hAxis: {
                    textStyle: {
                        color: '#727272',
                        fontName: "SourceSansPro-Regular",
                        fontSize: 11
                    }
                },
                chartArea: {
                    left: "5%",
                    width: "85%",
                    height: "80%"
                },
            };
            var comboChart = new kony.ui.CustomWidget({
                "id": "comboChartForCashPosition",
                "isVisible": true,
                "left": "0" + ViewConstants.POSITIONAL_VALUES.DP,
                "top": "0" + ViewConstants.POSITIONAL_VALUES.DP,
                "width": "100%",
                "height": "100%",
                "zIndex": 1000000
            }, {
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "widgetName": "ComboChart",
                "chartData": data,
                "chartProperties": options,
                "OnClickOfBar": function() {}
            });
            this.view.flxMainChartCon.flxCashPostionChart.add(comboChart);
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[0] = '#04A615';
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[1] = '#FCEADC';
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[2] = '#D9E3EB';
            this.view.flxLegendCredits.skin = "sknFlxF8F8F8Bottom04A615Border";
            this.view.flxLegendDebits.skin = "sknFlxF8F8F8NoBorder";
            this.view.flxLegendBalance.skin = "sknFlxF8F8F8NoBorder";
            this.view.lblCreditsValue.skin = "sknSSPSB42424218Px";
            this.view.lblDebitsValue.skin = "sknSSP42424218Px";
            this.view.lblTotalBalanceValue.skin = "sknSSP42424218Px";
            if (kony.sdk.isNullOrUndefined(this.cashPositionRequestdata.Type)) {
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.lblOccurenceMobile.text = kony.i18n.getLocalizedString("i18n.Transfers.Daily") + ": ";
                    this.view.lblSelectionMobile.text = new Date().toLocaleString('default', {
                        month: 'long'
                    }) + ", " + this.view.calendarWidget.lblYear.text;
                } else {
                    this.view.lblOccurence.text = kony.i18n.getLocalizedString("i18n.Transfers.Daily") + ": ";
                    this.view.lblSelection.text = new Date().toLocaleString('default', {
                        month: 'long'
                    }) + ", " + this.view.calendarWidget.lblYear.text;
                }
            } else {
                if (this.cashPositionRequestdata.Type === "Daily") this.onClickDailyTab();
                if (this.cashPositionRequestdata.Type === "Weekly") this.onClickWeeklyTab();
                if (this.cashPositionRequestdata.Type === "Monthly") this.onClickMonthlyTab();
                if (this.cashPositionRequestdata.Type === "Yearly") this.onClickYearlyTab();
            }
            this.lastSelectedTab = "";
        },
        preShow: function() {
            //this.view.flxDowntimeWarning.isVisible = false;
            //this.view.flxOutageClose.onClick = this.outageClose;
            //this.view.btn2.isVisible = false;
            this.portfoliovaluesflag = true;
            this.view.segCashFlow.isVisible = false;
            this.view.flxToggleChartTable.isVisible = true;
            this.view.customheader.topmenu.flxContextualMenu.isVisible = true;
            this.view.customheader.btnSkip.onClick = this.skipNav;
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.advancedFilters.btnCancelFilter.onKeyPress = this.onKeyPressAdvancedFiltersCallBack;
            this.view.onTouchEnd = this.onFormTouchEnd;
            //this.view.customheader.headermenu.btnLogout.onClick = this.showPopUp;
            var scp = this;
            //this.view.CustomPopup.flxCross.onClick = this.closePopup;
            this.view.flxDownTimeClose.onClick = this.closeDownTime;
            this.view.flxDeviceRegistrationClose.onClick = this.closeDeviceRegistration;
          	this.view.flxDowngradeDashboardDisclaimer.isVisible = false;
              this.view.flxServiceError.isVisible = false;
            this.view.flxDowngradeDisclaimerClose.onClick = function(){
                scp.view.flxDowngradeDashboardDisclaimer.isVisible = false;
            }
            this.view.flxSbaClose.onClick = function() {
                scp.view.flxServiceError.isVisible = false;
            }
            var upgradePopup = this.presenter.presentationController.showUpgradePopup;
            if(!kony.sdk.isNullOrUndefined(upgradePopup) && upgradePopup == "downgrade"){
                this.view.flxDowngradeDashboardDisclaimer.isVisible = true;                
            }
            this.view.accountsFilter.lblDefaultFiltersHeader.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
            }
            this.view.accountsFilter.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "aria-live": "off"
                },
            }
            this.view.flxAdvancedFilters.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "aria-live": "off"
                },
            }
            this.view.accountList.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "aria-live": "off"
                },
            }
            this.view.flxFormContent.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.txtSearch.accessibilityConfig = {
                a11yARIA: {
                    "aria-placeholder": ""
                }
            }
            this.view.advancedFilters.lblImageCurrency.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblImage.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblImgGroupDropdown.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.btnReset.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "button"
                },
            }
            this.view.advancedFilters.flxSortBody.accessibilityConfig = {
                "a11yLabel": "Sort By ",
                a11yARIA: {
                    tabindex: -1,
                    "role": "radiogroup",
                },
            }
            this.view.advancedFilters.flxRow1.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                }
            }
            this.view.advancedFilters.lblAccountType.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblGroupCompany.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblAccounts.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblBalance.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblIconGroupCompany.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                    // "role": "radio",
                    // "aria-labelledby": "lblAccounts",
                    // "aria-checked": false,
                },
            }
            this.view.advancedFilters.lblIconAccountType.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                    // "role": "radio",
                    // "aria-labelledby": "lblAccounts",
                    // "aria-checked": false,
                },
            }
            this.view.advancedFilters.flxByAccounts.accessibilityConfig = {
                a11yARIA: {
                    "role": "radio",
                    "aria-labelledby": "lblChoice3",
                    "aria-checked": false
                },
            }
            this.view.advancedFilters.flxByBalance.accessibilityConfig = {
                a11yARIA: {
                    "role": "radio",
                    "aria-labelledby": "lblChoice3",
                    "aria-checked": false
                },
            }
            this.view.advancedFilters.flxByChoice3.accessibilityConfig = {
                a11yARIA: {
                    "role": "radio",
                    "aria-labelledby": "lblChoice3",
                    "aria-checked": false
                },
            }
            this.view.advancedFilters.lblIconAccountName.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                    // "role": "radio",
                    // "aria-labelledby": "lblAccounts",
                    // "aria-checked": false,
                },
            }
            this.view.advancedFilters.flxGroupRow.accessibilityConfig = {
                "a11yLabel": "Group By",
                a11yARIA: {
                    tabindex: -1,
                    "role": "radiogroup",
                },
            }
            this.view.advancedFilters.flxGroupByCompany.accessibilityConfig = {
                a11yARIA: {
                    "role": "radio",
                    "aria-labelledby": "lblGroupCompany",
                    "aria-checked": false,
                },
            }
            this.view.advancedFilters.flxGroupByAccountType.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-labelledby": "lblAccountType",
                        "aria-checked": false,
                    },
                }
                /*this.view.advancedFilters.flxByAccounts.accessibilityConfig = {
                  a11yARIA: {
                    "role": "radio",
                    "aria-labelledby": "lblAccounts",
                    "aria-checked": false,
                  },
                }*/
            this.view.advancedFilters.flxIconBalance.accessibilityConfig = {
                a11yARIA: {
                    "role": "radio",
                    "aria-labelledby": "lblBalance",
                    "aria-checked": false,
                },
            }
            this.view.advancedFilters.lblIconBalance.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                    // "role": "radio",
                    // "aria-labelledby": "lblAccounts",
                    // "aria-checked": false,
                },
            }
            this.view.advancedFilters.flxChoice3.accessibilityConfig = {
                a11yARIA: {
                    //   "role": "radio",
                    "aria-labelledby": "lblChoice3",
                    "aria-checked": false,
                },
            }
            this.view.advancedFilters.lblIconChoice3.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                    // "role": "radio",
                    // "aria-labelledby": "lblAccounts",
                    // "aria-checked": false,
                },
            }
            this.view.advancedFilters.lblSortBy.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                    // "aria-hidden": true
                }
            }
            this.view.advancedFilters.lblGroupBy.accessibilityConfig = {
                    a11yHidden: true,
                    a11yARIA: {
                        tabindex: -1,
                        // "aria-hidden": true
                    }
                }
                /*this.view.customheader.headermenu.lblImageLogout.accessibilityConfig = {
                    a11yHidden: true,
                    a11yARIA: {
                      tabindex: -1,
                    }
                  }*/
            this.view.advancedFilters.lblTypeOfAccounts.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.advancedFilters.lblAccountsHeader.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
                // "aria-hidden": true
            }
            this.view.lblClearSearch.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            };
            this.view.flxClearBtn.accessibilityConfig = {
                a11yLabel: "Clear Search",
                a11yARIA: {
                    "role": "button"
                },
            };
            this.view.advancedFilters.flxDropDown.accessibilityConfig = {
                a11yLabel: "Sort by filter",
                a11yARIA: {
                    "aria-expanded": true,
                    "role": "button",
                },
            }
            this.view.advancedFilters.flxGroupDropDown.accessibilityConfig = {
                a11yLabel: "Sort by group",
                a11yARIA: {
                    "aria-expanded": true,
                    "role": "button",
                },
            }
            this.view.advancedFilters.flxDropdownImage.accessibilityConfig = {
                a11yLabel: "Sort by accounts",
                a11yARIA: {
                    "aria-expanded": true,
                    "role": "button",
                },
            }
            this.view.advancedFilters.flxDropdownCurrency.accessibilityConfig = {
                a11yLabel: "Sort by currency",
                a11yARIA: {
                    "aria-expanded": true,
                    "role": "button",
                },
            }
            this.view.advancedFilters.lblImgDropdown.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxMyApprovals.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxMyRequests.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.lblShowing.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxPriorityMessage.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.priorityMessageTag.flxPriorityMessageClose.accessibilityConfig = {
                a11yLabel: "Close",
                a11yARIA: {
                    role: "button",
                },
            }
            this.view.priorityMessageTag.lblImgMessage.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.priorityMessageTag.flxMsgContent.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.priorityMessageTag.lblPriorityMessageCount.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "status"
                },
            }
            this.view.priorityMessageTag.lblViewMessages.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.priorityMessageTag.imgCross.accessibilityConfig = {
                "a11yHidden": true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxDownTimeClose.accessibilityConfig = {
                a11yLabel: "Close this Notification bar.",
                a11yARIA: {
                    role: "button",
                },
            }
            this.view.flxDowntimeWarning.accessibilityConfig = {
                "a11yARIA": {
                        "role": "alert",
                        "tabindex": -1
                },
            }
            this.view.lblImgCloseDowntimeWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.imgDowntimeWarning.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    "tabindex": -1,
                },
            }
            this.view.lblDowntimeWarning.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
            }
            this.view.imgCloseDowntimeWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxDeviceRegistrationClose.accessibilityConfig = {
                a11yLabel: "Close",
                a11yARIA: {
                    role: "button",
                },
            }
            this.view.flxDeviceRegistrationWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.lblImgDeviceRegistrationClose.accessibilityConfig = {
                "a11yHidden": true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.DeviceRegisrationWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.lblDeviceRegistrationWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "status"
                },
            }
            this.view.imgDeviceRegistrationClose.accessibilityConfig = {
                a11yLabel: "warning",
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxClosePassword.accessibilityConfig = {
                a11yLabel: "Close this Notification bar.",
                a11yARIA: {
                    role: "button",
                },
            }
            this.view.flxPasswordResetWarning.accessibilityConfig = {
                "a11yARIA": {
                        "role": "alert",
                        "tabindex": -1
                },
            }
            this.view.lblImgClosePasswordResetWarning.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    "tabindex": -1
                }
            }
            this.view.ingPasswordResetWarning.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    "tabindex": -1,
                },
            }
            this.view.lblPasswordResetWarning.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
            }
            this.view.imgClosePasswordResetWarning.accessibilityConfig = {
                a11yLabel: "warning",
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxOverdraftWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxCloseWarning.accessibilityConfig = {
                a11yLabel: "Close",
                a11yARIA: {
                    role: "button",
                },
            }
            this.view.lblImgCloseWarning.accessibilityConfig = {
                "a11yHidden": true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.imgOverDraft.accessibilityConfig = {
                a11yLabel: "warning",
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.lblOverdraftWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "status"
                },
            }
            this.view.imgCloseWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxOutageClose.accessibilityConfig = {
                a11yLabel: "close",
                a11yARIA: {
                    "role": "button",
                },
            }
            this.view.lblImgCloseOutageWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.imgInfoIconWarning.accessibilityConfig = {
                a11yLabel: "warning",
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.lblOutageWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "status"
                },
            }
            this.view.imgCloseOutageWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxFilterListBox.accessibilityConfig = {
                //a11yLabel : "All Accounts",
                a11yARIA: {
                    //           role : "radio",
                    //           "aria-labelledby" : "lblShowing",
                    tabindex: -1
                },
            }
            this.view.accountsFilter.flxDefaultFiltersWrapper.accessibilityConfig = {
                "a11yLabel": "Default Views",
                a11yARIA: {
                    role: "radiogroup",
                    tabindex: -1
                },
            }
            this.view.accountsFilter.flxCustomFilterWrapper.accessibilityConfig = {
                    a11yARIA: {
                        tabindex: -1
                    },
                }
                /* this.view.CustomPopup.flxHeader.accessibilityConfig = {

                      a11yARIA: {
                          tabindex: -1,
                      },
                  }
                  this.view.CustomPopup.lblHeading.accessibilityConfig = {
                      a11yLabel: "popup heading",
                      a11yARIA: {
                          tabindex: -1,
                      },
                  }*/
                /*this.view.customheader.imgKony.accessibilityConfig = {
                    a11yARIA: {
                      tabindex: -1,
                    },
                  };*/
                //this.view.CustomPopup.btnNo.onClick = this.closePopup;
                //this.view.CustomPopup.btnYes.onClick = this.logoutAction;
            this.view.customheader.btnSkip.onClick = this.skipNav;
            //alert("hi");
            /* this.view.customheader.flxImgKony.accessibilityConfig = {
                  a11yLabel: "Infinity Digital Banking-Home",
                  a11yARIA: {
                    role: "button"
                  },
                };*/
            /*this.view.customheader.flxHamburgerBack.accessibilityConfig = {
                a11yARIA: {
                  tabindex: -1,
                },
              };*/
            this.view.upcomingTransactionsCombined.imgInfo.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    "tabindex": -1
                }
            };
            /*this.view.customheader.topmenu.lblTransferAndPay.accessibilityConfig = {
                a11yARIA: {
                  tabindex: -1,
                },
              };
              this.view.customheader.btnSkip.accessibilityConfig = {
                "a11yLabel": "Skip to Main Content",
                a11yARIA: {
                  role: "button",
                },
              };
              this.view.customheader.headermenu.flxUserId.accessibilityConfig = {
                a11yLabel: "Profile",
                a11yARIA: {
                },
              };
              this.view.customheader.headermenu.imgUserReset.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                  tabindex: -1,
                },
              };
              this.view.customheader.headermenu.btnLogout.accessibilityConfig = {
                "a11yLabel": kony.i18n.getLocalizedString("i18n.common.logout"),
                a11yARIA: {
                  role: "button"
                },
              };

              this.view.customheader.topmenu.btnHamburger.accessibilityConfig = {
                a11yLabel: "Hamburger Menu",
                a11yARIA: {
                  role: "button"
                },
              };
              this.view.customheader.topmenu.flxaccounts.accessibilityConfig = {
                a11yARIA: {
                  role: "button"
                },
              };
              this.view.customheader.topmenu.flxMenusMain.accessibilityConfig = {
                a11yARIA: {
                  tabindex: -1,
                }
              };
              this.view.customheader.topmenu.flxTransfersAndPay.accessibilityConfig = {
                a11yARIA: {
                  "aria-expanded": false,
                  role: "button",
                },
              }
              this.view.customheader.topmenu.flxMyBills.accessibilityConfig = {
                a11yARIA: {
                  role: "button",
                  "aria-labelledby": "lblMyBills",
                },
              }
              this.view.flxDownTimeClose.accessibilityConfig = {
                a11yARIA: {
                },
              }
              this.view.customheader.topmenu.lblAccounts.accessibilityConfig = {
                a11yARIA: {
                  tabindex: -1,
                },
              };*/
            this.view.flxDropDown.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                    "aria-expanded": false,
                    "aria-labelledby": "lblSelectedFilter",
                },
            };
            this.view.lblDropDown.accessibilityConfig = {
                "a11yHidden": true,
                a11yARIA: {
                    tabindex: -1,
                },
            };
            this.view.lblAdvancedFiltersNumber.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            };
            this.view.btnAdvancedFiltersDropdown.accessibilityConfig = {
                "a11yLabel": "Advanced Filters",
                a11yARIA: {
                    "aria-expanded": false
                },
            };
            this.view.lblSearch.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            };
            /*this.view.customheader.topmenu.lblMyBills.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                  tabindex: -1,
                },
              };*/
            this.view.btnConfirm.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            };
            this.view.upcomingTransactionsCombined.lblHeader.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            };
            this.view.upcomingTransactionsCombined.rtxNoPaymentMessage.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            };
            this.view.welcome.lblWelcome.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.welcome.lblLastLoggedIn.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.calendarWidget.flxCancel.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxApply.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxYearly.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxMonthly.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxWeekly.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxDaily.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxPrevious.accessibilityConfig = {
                a11yLabel: "previous year",
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxNext.accessibilityConfig = {
                a11yLabel: "Next year",
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxYear.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                }
            }
            this.view.calendarWidget.lblPrevious.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.calendarWidget.lblNext.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.lblHeader.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.Acknowledgment.lblUserInformation.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.Acknowledgment.lblCongratulations.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.Acknowledgment.lblSuccessmsg.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.Acknowledgment.lblSelectedAccounts.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankHeading.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankMessage.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.SelectBankOrVendor.lblUserInformation.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.SelectBankOrVendor.lblName.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.accessibilityConfig = {
                a11yARIA: {
                    "role": "textbox",
                    "aria-required": true,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.accessibilityConfig = {
                a11yARIA: {
                    "role": "textbox",
                    "aria-required": true,
                }
            }
            this.view.AddExternalAccounts.SelectBankOrVendor.tbxName.accessibilityConfig = {
                a11yARIA: {
                    "role": "textbox",
                    "aria-required": true,
                    "aria-labelledby": "lblName",
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxImgViewPassword.accessibilityConfig = {
                a11yLabel: "Show Password",
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxEnterUsername.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblLoginUsingSelectedBankError.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblUsernameKey.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblUsernameValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblBankValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblBankKey.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblCheckBox.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblAgree.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxCheckbox.accessibilityConfig = {
                a11yARIA: {
                    "role": "checkbox",
                    "aria-checked": true,
                }
            }
            this.view.mySpending.lblHeader.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.mySpending.flxMySpendingWrapper.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.mySpending.lblOverallSpendingMySpending.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "status"
                }
            }
            this.view.mySpending.imgInfoMySpending.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.mySpending.lblMySpending.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.accountsFilter.imgOr.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.accountsFilter.flxAddNew.accessibilityConfig = {
                a11yARIA: {
                    "role": "link",
                }
            }
            this.view.flxClose.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.imgClose.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblTermsAndConditions.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.totalAssetsCard.lblTitle.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.totalAssetsCard.flxLegendTilte.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.totalAssetsCard.flxToalValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lblTilte.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lblMarketValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lbllUnrealisedPL.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lblUnrealisedPLValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lblTodayPL.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lblTodayPLValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblTilte.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblMarketValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblValueMarketValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lbllUnrealisedPL.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblUnrealisedPLValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblTodayPL.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblTodayPLValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxBannerContainerDesktop.accessibilityConfig = {
                a11yLabel: "BannerDesktop",
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.imgBannerDesktop.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxYearsDropDownMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.imgYearsDropDownMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.btnSelectAccountsMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblSelectionMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxSelectAccountsMobileDropDown.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.imgAccountsDropdownMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxYearsDropDownNewMobile.accessibilityConfig = {
                a11yARIA: {
                    role: "button",
                    "aria-checked": true,
                    "aria-labelledby": "lblSelectionMobile"
                }
            }
            this.view.imgYearsDropDownNewMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxSelectYearsNewMobile.accessibilityConfig = {
                    a11yARIA: {
                        tabindex: -1
                    }
                }
                /* this.view.customfooter.lblCopyright.accessibilityConfig = {

                      a11yARIA: {
                          tabindex: -1,
                      },
                  };*/
            this.view.customheader.headermenu.flxResetUserImg.isVisible = true;
            /*this.view.flxAlertIdle.accessibilityConfig= {
                  a11yARIA: {
                  tabindex: -1,
                },
              };
              this.view.flxAlertIdle.isModalContainer=true;*/
        },
        onFormTouchEnd: function() {
            var currFormObj = kony.application.getCurrentForm();
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                if (currFormObj.customheader.topmenu.flxContextualMenu.isVisible === true) {
                    setTimeout(function() {
                        currFormObj.customheader.topmenu.flxContextualMenu.setVisibility(false);
                        currFormObj.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
                        currFormObj.customheader.topmenu.imgLblTransfers.text = "O";
                    }, "17ms")
                }
            }
        },
        onKeyPressAdvancedFiltersCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {                
                this.advancedFiltersToggel();
                this.advancedFiltersAccessibility();              
                }                
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey==false) {
                eventPayload.preventDefault();
                this.advancedFiltersToggel();
                this.advancedFiltersAccessibility();
                }  
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.accountsFilter.isVisible === true) {
                    self.view.accountsFilter.isVisible = false;
                    self.view.lblDropDown.text = "O";
                    self.view.flxDropDown.setActive(true);
                }
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxLogout.isVisible = false;
                    self.view.customheader.headermenu.btnLogout.setActive(true);
                }
                if (self.view.flxAdvancedFilters.isVisible === true) {
                    this.advancedFiltersToggel();
                    this.advancedFiltersAccessibility();
                }
                if (self.view.accountListMenu.isVisible === true) {
                    self.view.accountListMenu.isVisible = false;
                }
            }
        },

        onKeyPressCallBackAccountListMenu: function(eventobject, eventPayload, context) {
            var scopeObj = this;
            var currFormObj = kony.application.getCurrentForm();
            var selectedAccountRowIndex = scopeObj.view.accountList.segAccounts.selectedRowIndex;
            if (eventPayload.keyCode === 9 && context.sectionIndex === 0 && context.rowIndex === context.widgetInfo.data.length - 1 && !eventPayload.shiftKey) {
                eventPayload.preventDefault();
                currFormObj.accountListMenu.setVisibility(false);
                scopeObj.view.accountList.segAccounts.setActive(selectedAccountRowIndex[1], selectedAccountRowIndex[0], "flxAccountsRowTemplate.flxGroupRowTemplate.flxAccountsRowWrapper.flxAccountsWrapper.flxMenu");
            }
            if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                if (context.rowIndex === 0 && context.sectionIndex === 0) {
                    eventPayload.preventDefault();
                    currFormObj.accountListMenu.setVisibility(false);
                    scopeObj.view.accountList.segAccounts.setActive(selectedAccountRowIndex[1], selectedAccountRowIndex[0], "flxAccountsRowTemplate.flxGroupRowTemplate.flxAccountsRowWrapper.flxAccountsWrapper.flxMenu");
                }
            }
            if (eventPayload.keyCode === 27) {
                eventPayload.preventDefault();
                currFormObj.accountListMenu.setVisibility(false);
                scopeObj.view.accountList.segAccounts.setActive(selectedAccountRowIndex[1], selectedAccountRowIndex[0], "flxAccountsRowTemplate.flxGroupRowTemplate.flxAccountsRowWrapper.flxAccountsWrapper.flxMenu");
            }
        },


        onKeyPressCallBackAccountListMenu: function(eventobject, eventPayload, context ){
            var scopeObj = this;
            var currFormObj = kony.application.getCurrentForm();
            var selectedAccountRowIndex = scopeObj.view.accountList.segAccounts.selectedRowIndex;
            if (eventPayload.keyCode === 9 && context.sectionIndex === 0 && context.rowIndex === context.widgetInfo.data.length - 1 && !eventPayload.shiftKey) {
                eventPayload.preventDefault();
                scopeObj.advancedMenuListToggel();
                scopeObj.view.accountList.segAccounts.setActive(selectedAccountRowIndex[1], selectedAccountRowIndex[0],"flxAccountsRowTemplate.flxGroupRowTemplate.flxAccountsRowWrapper.flxAccountsWrapper.flxMenu");
            }
            if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                if (context.rowIndex === 0 && context.sectionIndex === 0) {
                    eventPayload.preventDefault();
                    scopeObj.advancedMenuListToggel();
                    scopeObj.view.accountList.segAccounts.setActive(selectedAccountRowIndex[1], selectedAccountRowIndex[0],"flxAccountsRowTemplate.flxGroupRowTemplate.flxAccountsRowWrapper.flxAccountsWrapper.flxMenu");
                }
            }
            if (eventPayload.keyCode === 27) {
                eventPayload.preventDefault();
               scopeObj.advancedMenuListToggel();
                scopeObj.view.accountList.segAccounts.setActive(selectedAccountRowIndex[1], selectedAccountRowIndex[0],"flxAccountsRowTemplate.flxGroupRowTemplate.flxAccountsRowWrapper.flxAccountsWrapper.flxMenu");
            }

        },

        closeDownTime: function() {
            this.view.flxDowntimeWarning.isVisible = false;
        },
        closeDeviceRegistration: function() {
            this.view.flxDeviceRegistrationWarning.isVisible = false;
        },
        skipNav: function() {
            if (this.view.flxInvestmentSummaryContainer.isVisible === true) {
                this.view.investmentLineChart.accSetActive();
            } else {
                this.view.lblDashboardHeading.setActive(true);
            }
        },
        /* closePassword: function() {
            this.view.flxPasswordResetWarning.isVisible = false;
        },
        showPopUp: function() {
            this.view.customheader.flxHamburger.isVisible = false;
            this.view.customheader.flxHamburgerBack.isVisible = false;
            this.view.CustomPopup.flxCross.setFocus(true);
            this.view.flxLogout.left = "0%";
            this.view.flxLogout.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxLogout.top = "0%";
            this.view.flxLogout.height = "100%";
            this.view.CustomPopup.centerY = "50%";
            this.view.CustomPopup.isVisible = true;
            this.view.flxLogout.isVisible = true;
            //this.view.CustomPopup.btnCross.setFocus(true);
            this.view.CustomPopup.flxCross.setFocus(true);
        },
        outageClose: function() {
            this.view.flxOutageWarning.isVisible = false;
        },
        closePopup: function() {
            this.view.flxLogout.isVisible = false;
            //scp.view.CustomPopUp.isVisible= false;
            this.view.customheader.headermenu.btnLogout.setFocus(true);
        },
        logoutAction: function() {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AuthUIModule",
                "appName": "AuthenticationMA"
            });
            var context = {
                "action": "Logout"
            };
            authModule.presentationController.doLogout(context);
        },*/
        /**
         * Method that called on preshow of frmAccountsLanding
         */
        preShowFrmAccountsLanding: function() {
            this.preShow();
            this.view.flxTotalAssetsContainer.height = 0;
            var scopeObj = this;
            this.view.accountListMenu.segAccountListActions.onScrolling = function() {
                scopeObj.frmMenuScroll = true;
            };
            isAdvanceFilterOpen = false;
            isCalendarDropDownOpen = false;
            this.view.flxFilterListBox.setVisibility(false);
            this.view.btnAdvancedFiltersDropdown.setVisibility(false);
            this.view.lblShowing.setVisibility(false);
            this.view.flxSearch.setVisibility(false);
            this.filterConfig();
            this.searchBarConfig();
            this.setFlowActions();
            this.isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            this.isRetailUser = applicationManager.getConfigurationManager().getConfigurationValue('isRBUser') === "true";
            this.isBusinessUser = applicationManager.getConfigurationManager().getConfigurationValue('isSMEUser') === "true";
            this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
            this.view.investmentLineChart.currentFilter = "";
            this.chartDefaultValue = this.view.investmentLineChart.currentFilter;
            // LOAD WEALTH modules
            scopeObj.getWealthModules();
            let filterValues = Object.keys(this.chartFilters).map(key => this.chartFilters[key]);
            this.view.investmentLineChart.setChartFilters(filterValues);
            this.accessibleCustomerIds = applicationManager.getUserPreferencesManager().accessibleCustomerIds;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Accounts");
            this.view.onBreakpointChange = function() {
                    scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
                }
                //         if(this.isCombinedUser)
            this.setupUIForDashboardSwitcher();
            this.view.accountsFilter.setVisibility(false);
            this.view.accountListMenu.setVisibility(false);
            this.view.customheader.headermenu.lblNewNotifications.setVisibility(false);
            this.view.customheader.headermenu.imgNotifications.src = ViewConstants.IMAGES.NOTIFICATION_ICON;
            this.view.customheader.customhamburger.activateMenu("Accounts", "My Accounts");
            scopeObj.view.flxDowntimeWarning.setVisibility(false);
            this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
            this.view.accountList.skin = "slFbox";
            this.view.mySpending.lblHeader.skin = "bbSknLbl424242SSP15Px";
            this.view.customheader.topmenu.btnHamburger.skin = "btnHamburgerskn";
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
                this.view.customheader.topmenu.flxMenusMain.right = "-18dp";
                this.view.accountsFilter.imgOr.src = "or_circle_rtl.png";
            }
            this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
            this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
                this.view.flxBannerContainerDesktop.right = "2%";
            }
            //resetting MasterData
            this.accounts = [];
            this.view.mySpending.lblOverallSpendingAmount.isVisible = false;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxImgViewPassword.onClick = this.showPassword;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter', 'flxAccountListAndBanner', 'flxFilterListBox', 'customheader', 'accountListMenu', 'flxPasswordResetWarning', 'flxDowntimeWarning', 'flxOverdraftWarning', 'flxOutageWarning', 'flxMainWrapper', 'flxLeftContainer', 'flxMyCashPosition', 'flxFormContent', 'flxAccountsContainer', 'flxAccountsHeader', 'flxInvestmentSummaryContainer', 'flxApprovalAndRequest']);
            this.view.flxDowntimeWarning.onClick = function() {
                function timerFunc() {
                    scopeObj.setServiceError(false);
                    kony.timer.cancel("mytimerdowntime");
                }
                kony.timer.schedule("mytimerdowntime", timerFunc, 0.1, false);
            }.bind(this);
            if (this.approvalsAndRequestsEntitilementCheck() && applicationManager.getConfigurationManager().isMicroAppPresent("ApprovalRequestMA")) {
                this.loadApprovalsAndRequestCount();
            } else {
                this.approvalRequestsServiceFailure();
            }
            this.currDashboard = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');
            //          if (this.isBusinessUser || (this.isCombinedUser&&this.currDashboard!==1))
            this.loadDashboardWidgets();
            this.initializeCustomViewFilters();
            if (orientationHandler.isMobile) applicationManager.executeAuthorizationFramework(this);
            //applicationManager.getNavigationManager().applyUpdates(this);
            if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.CAMPAIGN)) {
                CampaignUtility.fetchPopupCampaigns();
            }
        },
        flxYearlyOnkeyPress:function(eventObject,eventPayload){
            if(eventPayload.keyCode===9){
                if(eventPayload.shiftKey){
                    eventPayload.preventDefault();
                    this.showDurationDropDown();
                    this.view.flxSelectYears.setActive(true);
                }
            }
            if(eventPayload.keyCode===27){
                eventPayload.preventDefault();
                this.showDurationDropDown();
                this.view.flxSelectYears.setActive(true);
            }
        },
        flxApplyOnkeyPress:function(eventObject,eventPayload){
            if(eventPayload.keyCode===9){
                if(!eventPayload.shiftKey){
                    eventPayload.preventDefault();
                    this.showDurationDropDown();
                    this.view.flxSelectAccounts.setActive(true);
                }
            }
            if(eventPayload.keyCode===27){
                eventPayload.preventDefault();
                this.showDurationDropDown();
                this.view.flxSelectYears.setActive(true);
            }
        },
        calOnKeyPress:function(eventObject,eventPayload){
            if(eventPayload.keyCode===27){
                    eventPayload.preventDefault();
                    this.showDurationDropDown();
                    this.view.flxSelectYears.setActive(true);
            }
        },
        selectAccountsOnKeyPress:function(eventObject,eventPayload){
            if(eventPayload.keyCode===27){
                this.showAccountsDropDown();
            }
            if(eventPayload.keyCode===9){
                if(eventPayload.shiftKey){
                    if(this.view.flxAccountList.isVisible){
                        this.showAccountsDropDown();
                    }
                }
            }
        },
        postShow: function() {
            sbaEnrolmentStatuses = OLBConstants.SBA_ENROLMENT_STATUS_CONFIG;
            this.view.customheader.forceCloseHamburger();
            this.AdjustScreen();
            this.accessibilityFocusSetup();
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.flxApprovalAndRequest.doLayout = function(widget) {
                    widget.info.frame = widget.frame;
                }
                //       this.view.flxPasswordResetWarning.setVisibility(true);
                //this.view.flxDowntimeWarning.isVisible = false;
            this.showHealthAndDriversPopup(false);
            this.view.calendarWidget.onKeyPress=this.calOnKeyPress;
            this.view.flxSelectYears.onKeyPress=this.calOnKeyPress;
            this.view.flxSelectAccounts.onKeyPress=this.selectAccountsOnKeyPress;
            this.view.calendarWidget.flxYearly.onKeyPress = this.flxYearlyOnkeyPress;
            this.view.calendarWidget.flxCancel.onKeyPress = this.flxApplyOnkeyPress;
            this.view.flxChart.accessibilityConfig = {
                a11yLabel: this.view.lblMyChartHeader.text + " Chart view",
                a11yARIA: {
                    "role": "button",
                    "tabindex": 0,
                    
                }
            },
            this.view.flxTable.accessibilityConfig = {
                a11yLabel: this.view.lblMyChartHeader.text + " Table view",
                a11yARIA: {
                    "role": "button",
                    "tabindex": 0,
                    
                }
            },
            this.view.flxSbaDriversMain.doLayout = CommonUtilities.centerPopupFlex;
            this.view.imgSbaClose.onTouchEnd = this.updateSbaStatus.bind(this, sbaEnrolmentStatuses.CANCELED);
            this.view.lblAccProviderClose.onTouchEnd = this.updateSbaStatus.bind(this, sbaEnrolmentStatuses.CANCELED);
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.customheader.customhamburger.collapseAll();
            this.view.mySpending.flxMySpendingTable.isVisible = false;
            var scope = this;
            this.view.mySpending.flxChart.accessibilityConfig = {
                a11yLabel: this.view.mySpending.lblHeader.text+" Chart view",
                a11yARIA:{
                    "role":"button",
                    "tabindex":0,
                    "aria-pressed": true
                }
            },
            this.view.mySpending.flxTable.accessibilityConfig = {
                a11yLabel: this.view.mySpending.lblHeader.text+" Table view",
                a11yARIA:{
                    "role":"button",
                    "tabindex":0,
                    "aria-pressed": false
                }
            },
            this.view.calendarWidget.segChoices.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":-1
                }
            }
            this.view.mySpending.flxChart.onClick = function() {
                scope.view.mySpending.flxMySpendingTable.isVisible = false;
                scope.view.mySpending.flxMySpending.isVisible = true;
                scope.view.mySpending.flxChart.skin = "skbflx293276blue";
                scope.view.mySpending.lblChartIcon.skin = "sknLblFontType3Selected";
                scope.view.mySpending.flxTable.skin = "slFbox";
                scope.view.mySpending.lblTableIcon.skin = "sknLblFontType3Unselected";
				scope.view.mySpending.flxChart.accessibilityConfig = {
                    a11yLabel: scope.view.mySpending.lblHeader.text + " Chart view",
                    a11yARIA: {
                        "role": "button",
                        "tabindex": 0,
                        "aria-pressed": true
                    }
                }
               
			   scope.view.mySpending.flxTable.accessibilityConfig = {
                    a11yLabel: scope.view.mySpending.lblHeader.text + " Table view",
                    a11yARIA: {
                        "role": "button",
                        "tabindex": 0,
                        "aria-pressed": false
                    }
			   }
            }
            this.view.mySpending.flxTable.onClick = function() {
                scope.view.mySpending.flxMySpending.isVisible = false;
                scope.view.mySpending.flxMySpendingTable.isVisible = true;
                scope.view.mySpending.flxChart.skin = "slFbox";
                scope.view.mySpending.lblChartIcon.skin = "sknLblFontType3Unselected";
                scope.view.mySpending.flxTable.skin = "skbflx293276blue";
                scope.view.mySpending.lblTableIcon.skin = "sknLblFontType3Selected";
				scope.view.mySpending.flxChart.accessibilityConfig = {
                    a11yLabel: scope.view.mySpending.lblHeader.text + " Chart view",
                    a11yARIA: {
                        "role": "button",
                        "tabindex": 0,
                        "aria-pressed": false
                    }
                }
               
			   scope.view.mySpending.flxTable.accessibilityConfig = {
                    a11yLabel: scope.view.mySpending.lblHeader.text + " Table view",
                    a11yARIA: {
                        "role": "button",
                        "tabindex": 0,
                        "aria-pressed": true
                    }
			   }
            }
            this.view.selectAccountList.segAccountListActions.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                }
            }
            this.view.accountsFilter.lblDefaultFiltersHeader.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                }
            }
            this.view.accountsFilter.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "aria-live": "off"
                },
            }
            this.view.flxAdvancedFilters.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "aria-live": "off"
                },
            }
            this.view.accountList.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "aria-live": "off"
                },
            }
            this.view.flxFormContent.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.txtSearch.accessibilityConfig = {
                a11yARIA: {
                    "aria-placeholder": ""
                }
            }
            this.view.advancedFilters.lblImageCurrency.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblImage.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblImgGroupDropdown.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.btnReset.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "button"
                },
            }
            this.view.advancedFilters.flxSortBody.accessibilityConfig = {
                "a11yLabel": "Sort By ",
                a11yARIA: {
                    tabindex: -1,
                    "role": "radiogroup",
                },
            }
            this.view.advancedFilters.flxRow1.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                },
            }
            this.view.advancedFilters.lblGroupCompany.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblAccountType.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblAccounts.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblBalance.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.advancedFilters.lblIconGroupCompany.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                    // "role": "radio",
                    // "aria-labelledby": "lblAccounts",
                    // "aria-checked": false,
                },
            }
            this.view.advancedFilters.lblIconAccountType.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                    // "role": "radio",
                    // "aria-labelledby": "lblAccounts",
                    // "aria-checked": false,
                },
            }
            this.view.advancedFilters.lblIconAccountName.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                    // "role": "radio",
                    // "aria-labelledby": "lblAccounts",
                    // "aria-checked": false,
                },
            }
            this.view.advancedFilters.flxGroupByCompany.accessibilityConfig = {
                a11yARIA: {
                    "role": "radio",
                    "aria-labelledby": "lblGroupCompany",
                    "aria-checked": false,
                },
            }
            this.view.advancedFilters.flxGroupByAccountType.accessibilityConfig = {
                a11yARIA: {
                    "role": "radio",
                    "aria-labelledby": "lblAccountType",
                    "aria-checked": false,
                },
            }
            this.view.advancedFilters.flxlblIconAccountName.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                },
            }
            this.view.advancedFilters.flxIconBalance.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                },
            }
            this.view.advancedFilters.lblIconBalance.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                    // "role": "radio",
                    // "aria-labelledby": "lblAccounts",
                    // "aria-checked": false,
                },
            }
            this.view.advancedFilters.flxChoice3.accessibilityConfig = {
                a11yARIA: {
                  // "role": " radio ",
                    "aria-labelledby": "lblChoice3",
                    "aria-checked": false,
                },
            }
            this.view.advancedFilters.lblIconChoice3.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                    // "role": "radio",
                    // "aria-labelledby": "lblAccounts",
                    // "aria-checked": false,
                },
            }
            this.view.advancedFilters.flxByAccounts.accessibilityConfig = {
                a11yARIA: {
                    "role": "radio",
                    "aria-labelledby": "lblChoice3",
                    "aria-checked": false
                },
            }
            this.view.advancedFilters.flxByBalance.accessibilityConfig = {
                a11yARIA: {
                    "role": "radio",
                    "aria-labelledby": "lblChoice3",
                    "aria-checked": false
                },
            }
            this.view.advancedFilters.flxByChoice3.accessibilityConfig = {
                a11yARIA: {
                    "role": "radio",
                    "aria-labelledby": "lblChoice3",
                    "aria-checked": false
                },
            }
            this.view.advancedFilters.lblSortBy.accessibilityConfig = {
                    a11yHidden: true,
                    a11yARIA: {
                        tabindex: -1,
                        // "aria-hidden": true
                    }
                }
                /*this.view.customheader.headermenu.lblImageLogout.accessibilityConfig = {
                    a11yHidden: true,
                    a11yARIA: {
                      tabindex: -1,
                    }
                  }*/
            this.view.advancedFilters.lblAccountsHeader.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
                // "aria-hidden": true
            }
            this.view.advancedFilters.lblTypeOfAccounts.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.advancedFilters.flxDropDown.accessibilityConfig = {
                a11yLabel: "Sort by filter",
                a11yARIA: {
                    "aria-expanded": true,
                    "role": "button",
                },
            }
            this.view.advancedFilters.flxGroupDropDown.accessibilityConfig = {
                a11yLabel: "Sort by group",
                a11yARIA: {
                    "aria-expanded": true,
                    "role": "button",
                },
            }
            this.view.advancedFilters.flxDropdownImage.accessibilityConfig = {
                a11yLabel: "Sort by accounts",
                a11yARIA: {
                    "aria-expanded": true,
                    "role": "button",
                },
            }
            this.view.advancedFilters.flxDropdownCurrency.accessibilityConfig = {
                a11yLabel: "Sort by currency",
                a11yARIA: {
                    "aria-expanded": true,
                    "role": "button",
                },
            }
            this.view.advancedFilters.lblImgDropdown.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.customheader.headermenu.flxResetUserImg.isVisible = true;
            this.view.flxClosePassword.accessibilityConfig = {
                a11yLabel: "Close this Notification bar.",
                a11yARIA: {
                    role: "button",
                },
            }
            this.view.lblShowing.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxPriorityMessage.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.priorityMessageTag.flxPriorityMessageClose.accessibilityConfig = {
                a11yLabel: "Close",
                a11yARIA: {
                    role: "button",
                },
            }
            this.view.priorityMessageTag.lblImgMessage.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.priorityMessageTag.flxMsgContent.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.priorityMessageTag.lblPriorityMessageCount.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "status"
                },
            }
            this.view.priorityMessageTag.lblViewMessages.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.priorityMessageTag.imgCross.accessibilityConfig = {
                "a11yHidden": true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxPasswordResetWarning.accessibilityConfig = {
                "a11yARIA": {
                        "role": "alert",
                        "tabindex": -1
                },
            }
            this.view.lblImgClosePasswordResetWarning.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    "tabindex": -1
                }
            }
            this.view.ingPasswordResetWarning.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    "tabindex": -1,
                },
            }
            this.view.flxMyApprovals.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxMyRequests.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.lblPasswordResetWarning.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
            }
            this.view.imgClosePasswordResetWarning.accessibilityConfig = {
                    a11yLabel: "warning",
                    a11yARIA: {
                        tabindex: -1,
                    },
                }
                /*this.view.customheader.topmenu.lblTransferAndPay.accessibilityConfig = {
                    a11yARIA: {
                      tabindex: -1,
                    },
                  };
                  this.view.customheader.flxHamburgerBack.accessibilityConfig = {
                    a11yARIA: {
                    },
                  };*/
            this.view.flxDownTimeClose.accessibilityConfig = {
                a11yLabel: "Close this Notification bar.",
                a11yARIA: {
                    role: "button",
                },
            }
            this.view.flxDowntimeWarning.accessibilityConfig = {
               "a11yARIA": {
                        "role": "alert",
                        "tabindex": -1
                },
            }
            this.view.lblImgCloseDowntimeWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.imgDowntimeWarning.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    "tabindex": -1,
                },
            }
            this.view.lblDowntimeWarning.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
            };
            this.view.imgCloseDowntimeWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxOverdraftWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxCloseWarning.accessibilityConfig = {
                a11yLabel: "Close",
                a11yARIA: {
                    role: "button",
                },
            }
            this.view.lblImgCloseWarning.accessibilityConfig = {
                "a11yHidden": true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.imgOverDraft.accessibilityConfig = {
                a11yLabel: "warning",
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.lblOverdraftWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "status"
                },
            }
            this.view.imgCloseWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxOutageClose.accessibilityConfig = {
                a11yLabel: "close",
                a11yARIA: {
                    "role": "button",
                },
            }
            this.view.lblImgCloseOutageWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.imgInfoIconWarning.accessibilityConfig = {
                a11yLabel: "warning",
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.lblOutageWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "status"
                },
            }
            this.view.imgCloseOutageWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.flxDeviceRegistrationClose.accessibilityConfig = {
                a11yLabel: "Close",
                a11yARIA: {
                    role: "button",
                },
            }
            this.view.flxDeviceRegistrationWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.lblImgDeviceRegistrationClose.accessibilityConfig = {
                "a11yHidden": true,
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.DeviceRegisrationWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.lblDeviceRegistrationWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "status"
                },
            }
            this.view.imgDeviceRegistrationClose.accessibilityConfig = {
                    a11yLabel: "warning",
                    a11yARIA: {
                        tabindex: -1,
                    },
                }
            
                /*this.view.customheader.flxImgKony.accessibilityConfig = {
                    a11yLabel: "Infinity Digital Banking-Home",
                    a11yARIA: {
                      role: "button",
                    },
                  };*/
                /* this.view.CustomPopup.flxHeader.accessibilityConfig = {

                      a11yARIA: {
                          tabindex: -1,
                      },
                  }
                  this.view.CustomPopup.lblHeading.accessibilityConfig = {
                      a11yLabel: "popup heading",
                      a11yARIA: {
                          tabindex: -1,
                      },
                  };*/
                /*this.view.customheader.imgKony.accessibilityConfig = {
                    a11yARIA: {
                      tabindex: -1,
                    },
                  };
                  this.view.customheader.btnSkip.accessibilityConfig = {
                    "a11yLabel": "Skip to Main Content",
                    a11yARIA: {
                      role: "button",
                    },
                  };
                  this.view.customheader.headermenu.flxUserId.accessibilityConfig = {
                    a11yLabel: "Profile",
                    a11yARIA: {
                      role: "button"
                    },
                  };
                  this.view.customheader.headermenu.imgUserReset.accessibilityConfig = {
                    a11yHidden: true,
                    a11yARIA: {
                      tabindex: -1,
                    },
                  };
                  this.view.customheader.headermenu.btnLogout.accessibilityConfig = {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.common.logout"),
                    a11yARIA: {
                      role: "button"
                    },
                  };*/
            this.view.flxFilterListBox.accessibilityConfig = {
                // a11yLabel : "All Accounts",
                a11yARIA: {
                    //           role : "radio",
                    //           "aria-labelledby" : "lblShowing",
                    tabindex: -1
                },
            }
            this.view.accountsFilter.imgOr.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.accountsFilter.flxAddNew.accessibilityConfig = {
                a11yARIA: {
                    "role": "link",
                }
            }
            this.view.accountsFilter.flxDefaultFiltersWrapper.accessibilityConfig = {
                "a11yLabel": "Default Views",
                a11yARIA: {
                    role: "radiogroup",
                    tabindex: -1
                },
            }
            this.view.accountsFilter.flxCustomFilterWrapper.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                },
            }
            this.view.upcomingTransactionsCombined.imgInfo.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    "tabindex": -1
                }
            };
            /* this.view.customheader.topmenu.btnHamburger.accessibilityConfig = {
                  a11yLabel: "Hamburger menu",
                  a11yARIA: {
                  },
                };
                this.view.customheader.topmenu.flxaccounts.accessibilityConfig = {
                  a11yARIA: {
                    role: "button",
                  },
                };*/
            /*this.view.customheader.topmenu.flxMyBills.accessibilityConfig = {
                a11yARIA: {
                  role: "button",
                  "aria-labelledby": "lblMyBills",
                },
              }
              this.view.customheader.topmenu.lblMyBills.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                  tabindex: -1,
                },
              }
              this.view.customheader.topmenu.flxMenusMain.accessibilityConfig = {
                a11yARIA: {
                  tabindex: -1,
                }
              };
              this.view.customheader.topmenu.flxTransfersAndPay.accessibilityConfig = {
                a11yARIA: {
                  "aria-expanded": false,
                  role: "button",
                },
              }
              this.view.customheader.topmenu.lblAccounts.accessibilityConfig = {
                a11yARIA: {
                  tabindex: -1,
                },
              };*/
            this.view.flxDropDown.accessibilityConfig = {
                a11yARIA: {
                    role: "button",
                    "aria-labelledby": "lblSelectedFilter",
                    "aria-expanded": false,
                },
            };
            this.view.lblDropDown.accessibilityConfig = {
                "a11yHidden": true,
                a11yARIA: {
                    tabindex: -1,
                },
            };
            this.view.lblAdvancedFiltersNumber.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            };
            this.view.btnAdvancedFiltersDropdown.accessibilityConfig = {
                "a11yLabel": "Advanced Filters",
                a11yARIA: {
                    "aria-expanded": false
                },
            };
            this.view.lblSearch.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                },
            };
            this.view.lblClearSearch.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            };
            this.view.flxClearBtn.accessibilityConfig = {
                a11yLabel: "Clear Search",
                a11yARIA: {
                    "role": "button"
                },
            };
            this.view.btnConfirm.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            };
            /*this.view.lblDowntimeWarning.accessibilityConfig={
                a11yLabel : kony.i18n.getLocalizedString("i18n.common.OoopsServerError"),
                a11yARIA:{
                  role : "status",
                  tabindex : -1
                }
              }*/
            /* this.view.flxAlertIdle.accessibilityConfig= {
                  a11yARIA: {
                  tabindex: -1,
                },
              };
              this.view.flxAlertIdle.isModalContainer=true;*/
            this.view.flxSearch.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.welcome.lblWelcome.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.welcome.lblLastLoggedIn.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.calendarWidget.flxCancel.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxApply.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxYearly.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxMonthly.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxWeekly.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxDaily.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxPrevious.accessibilityConfig = {
                a11yLabel: "previous year",
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxNext.accessibilityConfig = {
                a11yLabel: "Next year",
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.calendarWidget.flxYear.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                }
            }
            this.view.calendarWidget.lblPrevious.accessibilityConfig = {
                a11yLabel: "previous year",
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.calendarWidget.lblNext.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.lblHeader.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.Acknowledgment.lblUserInformation.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.Acknowledgment.lblCongratulations.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.Acknowledgment.lblSuccessmsg.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.Acknowledgment.lblSelectedAccounts.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankHeading.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankMessage.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.SelectBankOrVendor.lblUserInformation.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.SelectBankOrVendor.lblName.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.accessibilityConfig = {
                a11yARIA: {
                    "role": "textbox",
                    "aria-required": true,
                }
            }
            this.view.AddExternalAccounts.SelectBankOrVendor.tbxName.accessibilityConfig = {
                a11yARIA: {
                    "role": "textbox",
                    "aria-required": true,
                    "aria-labelledby": "lblName",
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.accessibilityConfig = {
                a11yARIA: {
                    "role": "textbox",
                    "aria-required": true,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxImgViewPassword.accessibilityConfig = {
                a11yLabel: "Show Password",
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxEnterUsername.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblLoginUsingSelectedBankError.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblUsernameKey.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblUsernameValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblBankValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblBankKey.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblCheckBox.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.lblAgree.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxCheckbox.accessibilityConfig = {
                a11yARIA: {
                    "role": "checkbox",
                    "aria-checked": true,
                }
            }
            this.view.mySpending.lblHeader.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.mySpending.flxMySpendingWrapper.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.mySpending.lblOverallSpendingMySpending.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.mySpending.imgInfoMySpending.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.mySpending.lblMySpending.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxClose.accessibilityConfig = {
                a11yARIA: {
                    "role": "button",
                }
            }
            this.view.imgClose.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblTermsAndConditions.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.totalAssetsCard.lblTitle.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.totalAssetsCard.flxLegendTilte.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.totalAssetsCard.flxToalValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lblTilte.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lblMarketValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lbllUnrealisedPL.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lblUnrealisedPLValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lblTodayPL.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.investmentSummaryCard.lblTodayPLValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblTilte.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblMarketValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblValueMarketValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lbllUnrealisedPL.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblUnrealisedPLValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblTodayPL.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblTodayPLValue.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxBannerContainerDesktop.accessibilityConfig = {
                a11yLabel: "BannerDesktop",
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.imgBannerDesktop.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxYearsDropDownMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.imgYearsDropDownMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.btnSelectAccountsMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblSelectionMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxSelectAccountsMobileDropDown.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.imgAccountsDropdownMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxYearsDropDownNewMobile.accessibilityConfig = {
                a11yARIA: {
                    role: "button",
                    "aria-checked": true,
                    "aria-labelledby": "lblSelectionMobile"
                }
            }
            this.view.imgYearsDropDownNewMobile.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxSelectYearsNewMobile.accessibilityConfig = {
                    a11yARIA: {
                        tabindex: -1
                    }
                }
                /*this.view.customheader.headermenu.flxResetUserImg.accessibilityConfig={
                    a11yHidden : true,
                  }*/
            if (kony.application.getCurrentBreakpoint() <= 640) {
                this.view.accountsFilter.top = "47dp";
                this.view.flxAdvancedFilters.top = "47dp";
                this.view.advancedFilters.left = "2%";
                this.view.flxAdvancedFilters.width = "100%";
            } else {
                this.view.accountsFilter.top = "40dp";
                this.view.flxAdvancedFilters.top = "40dp";
            }
            this.view.flxCalendar.top = "50dp";
			this.view.accountsFilter.segDefaultFilters.accessibilityConfig = {
					a11yARIA: {
                        tabindex: -1
                    }
				};
            this.view.selectAccountList.segAccountListActions.onRowClick = this.fetchCashPositionByAccountTypeOnRowClick;
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "HomepageMA",
                "moduleName": "AccountsUIModule"
            });
            var custDashboard = accountsModule.presentationController.customerdashboard;
			accountsModule.presentationController.showbackNavigation = true;
            if (custDashboard === "true") {
                this.view.flxCustomerListback.isVisible = true;
                this.view.flxCustomerDetails.isVisible = true;
				this.view.lblDashboardHeading.isVisible = true;
                this.view.lblDashboardHeading.text = "Customer Details";
                this.view.lblCustName.text = accountsModule.presentationController.customerIdName +" ";
                this.view.lblCustomerId.text = "(" + accountsModule.presentationController.customerId + ")";
				var custCount = accountsModule.presentationController.customeraccounts;	 
				if(custCount !== null){
                 this.view.lblAccountsTotal.text = "Total Accounts (" + custCount.length + ")";
				}
                this.view.flxCustomerListback.onClick = this.customerDashboardNav.bind(this);
                
            } else {
                this.view.flxCustomerListback.isVisible = false;
                this.view.flxCustomerDetails.isVisible = false;
            }
            if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.SMARTBANKINGADVISORY)) {
                SBA_FEATURES = OLBConstants.SBA_FEATURES;
                SBA_ENROL_STATUS = OLBConstants.SBA_ENROL_STATUS;
                this.getSbaDetails();
            }
            this.view.lblDashboardHeading.isVisible=true;
            this.view.flxSelectYears.onKeyPress=this.calendarOnKeyPress;
            this.view.flxAdvancedGroup.skin="sknBorderE3E3E3";
            this.view.mySpending.imgInfoMySpending.accessibilityConfig={
                "a11yHidden":true,
                a11yARIA:{
                    "tabindex":-1
                }
            }
            this.view.flxCustomerDetails.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":-1
                }
            }
        },
        calendarOnKeyPress:function(eventObject,eventPayload){
            if(eventPayload.keyCode===9){
                if(!eventPayload.shiftKey){
                if(this.view.flxCalendar.isVisible===true){
                    eventPayload.preventDefault();
                    this.view.calendarWidget.flxYearly.setActive(true);
                }
                else{
                    eventPayload.preventDefault();
                    this.view.flxSelectAccounts.setActive(true);
                }
            }
            else{
                if(this.view.flxCalendar.isVisible===true){
                    this.showDurationDropDown();
                }
            }
            }
            if(eventPayload.keyCode===27){
                eventPayload.preventDefault();
                this.showDurationDropDown();
        }
        },
        customerDashboardNav: function() {
          this.offset = 0;
          this.lastRecord = '';
		  this.TotalCurrency = true;
		  this.accType = [];
		  this.view.lblSelectedFilter.text = kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts");			
		  this.currentView = "All Accounts";
          var navManager = applicationManager.getNavigationManager();   
          navManager.navigateTo({
                "appName": "HomepageMA",
                "friendlyName": "AccountsUIModule/frmCustomerDashboard"
            });
           var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "HomepageMA",
                "moduleName": "AccountsUIModule"
            });       
            accountsModule.presentationController.navCustomerDashboard();
        },
        postShowWealthComp: function() {
            if (this.view.marketIndexDashComp.isVisible === false && this.view.marketNewsCardComp.isVisible === false) {
                this.view.flxMarketNewsContainer.isVisible = false;
            }
            if (this.view.WatchlistDashCard.isVisible === false) {
                this.view.flxWatchlistContainer.isVisible = false;
            } else {
                var configManager = applicationManager.getConfigurationManager();
                var checkUserPermission = function(permission) {
                    return applicationManager.getConfigurationManager().checkUserPermission(permission);
                }
                let watchListAddInstrumentPermission = configManager.watchlistViewInstrumentPermissions().some(checkUserPermission);
                this.view.flxWatchlistContainer.isVisible = watchListAddInstrumentPermission;
            }
            if (this.view.recentActivityComp.isVisible === false) {
                this.view.flxRecentActivity.isVisible = false;
            }else{
                this.view.flxRecentActivity.isVisible = true;
            }
            if (this.view.flxMarketNewsContainer.isVisible === false && this.view.flxWatchlistContainer.isVisible === false) {
                this.view.flxnewsAndWatch.isVisible = false;
            } else {
                this.view.flxnewsAndWatch.isVisible = true;
            }

            if(this.view.quickLinksNew.isVisible){
            this.view.flxnewsAndWatch.top = "-12dp"
            }
        },
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.txtSearch, this.view.flxSearch]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        /**
            Method to check if the user has access to view any transaction.
            */
        transactionViewAccessCheck: function() {
            var transactionViewAccess = applicationManager.getConfigurationManager().getViewTransactionPermissionsList();
            var checkUserPermission = function(permission) {
                return applicationManager.getConfigurationManager().checkUserPermission(permission);
            };
            var isTransactionViewEnabled = transactionViewAccess.some(checkUserPermission);
            if (isTransactionViewEnabled) return true;
            else return false;
        },
        /**
            Method to enable or disable search bar based on spotlight configuration.
            */
        searchBarConfig: function(accsLen) {
            var searchFlag = applicationManager.getConfigurationManager().getConfigurationValue('isSearchRequired');
            var searchConfigCount = applicationManager.getConfigurationManager().getConfigurationValue('searchCount');
            if (searchFlag !== true) {
                this.view.flxSearch.setVisibility(false);
                return true;
            } else {
                if (searchConfigCount > accsLen) {
                    this.view.flxSearch.setVisibility(false);
                    return true;
                } else {
                    this.view.flxSearch.setVisibility(true);
                }
            }
            return false;
        },
        /**
        Method to enable or disable advanced filter and dropdown based on spotlight configuration.
        */
        filterConfig: function(accsLen) {
            var filterFlag = applicationManager.getConfigurationManager().getConfigurationValue('isFilterRequired');
            var filterConfigCount = applicationManager.getConfigurationManager().getConfigurationValue('filterCount');
            //if (this.isSingleCustomerProfile)
            if (filterFlag !== true) {
                this.view.flxFilterListBox.setVisibility(false);
                this.view.btnAdvancedFiltersDropdown.setVisibility(false);
                this.view.flxAdvancedGroup.setVisibility(false); //osama
                this.view.lblShowing.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1024 || kony.application.getCurrentBreakpoint() >= 1388) {
                    //this.view.flxSearch.left = "58%";
                    //osama
                    this.view.flxSearch.left = "2%";
    
                }
                return true;
            } else {
                if (filterConfigCount > accsLen) {
                    this.view.flxFilterListBox.setVisibility(false);
                    this.view.btnAdvancedFiltersDropdown.setVisibility(false);
                    this.view.flxAdvancedGroup.setVisibility(false); //osama
                    this.view.lblShowing.setVisibility(false);
                    if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1024 || kony.application.getCurrentBreakpoint() >= 1388) {
                        //this.view.flxSearch.left = "58%";
                        //osama
                        this.view.flxSearch.left = "2%";
                
                    }
                    return true;
                } else {
                    this.view.flxFilterListBox.setVisibility(true);
                    this.view.btnAdvancedFiltersDropdown.setVisibility(true);
                    this.view.flxAdvancedGroup.setVisibility(true); //osama
                    this.view.lblShowing.setVisibility(false);
                }
            }
            return false;
        },
        /*
         * Method to initialize search and filter actions
         */
        initializeSearchAndFilterActions: function(accounts) {
            if (this.presenter.presentationController.customerdashboard === "true") {
					accounts = this.presenter.presentationController.customeraccounts;
				} else {
						accounts = this.presenter.presentationController.accounts;
				}
            var searchBarConfigResp = this.searchBarConfig(accounts.length);
            var filterConfigResp = this.filterConfig(accounts.length);
            if (searchBarConfigResp && filterConfigResp){
				this.view.flxAccountsHeader.setVisibility(false);
			} else {
				this.view.flxAccountsHeader.setVisibility(true);
			}
            //      this.view.txtSearch.text = "";
            this.view.flxClearBtn.setVisibility(false);
            this.view.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, accounts);
            this.view.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this, accounts);
            this.view.txtSearch.onDone = this.onSearchBtnClick.bind(this, accounts);
            this.view.btnConfirm.onClick = this.onSearchBtnClick.bind(this, accounts);
            this.view.accountsFilter.setVisibility(false);
            this.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            this.view.flxFilterListBox.onClick = function() {
                if (this.view.accountsFilter.isVisible) {
                    this.view.accountsFilter.origin = true;
                    if (kony.application.getCurrentBreakpoint() === 640 || kony.application.getCurrentBreakpoint() === 1024) {
                        this.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                        this.view.accountsFilter.setVisibility(false);
                        this.AdjustScreen();
                    }
                }
            }.bind(this);
            this.accountsFilterAccessibility();
            this.view.btnAdvancedFiltersDropdown.onClick = function() {
                if (this.lastFilterCriteria.length === 0) this.resetAdvancedFilters();
                var warningsList = [this.view.flxPasswordResetWarning, this.view.flxOutageWarning, this.view.flxOverdraftWarning, this.view.flxDowntimeWarning, this.view.flxDeviceRegistrationWarning, this.view.flxPriorityMessage];
                var count = 0;
                for (var i = 0, size = warningsList.length; i < size; i++) {
                    var item = warningsList[i];
                    if (item.isVisible) {
                        count++;
                    }
                }
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    var diff = 0;
                    diff = diff + (this.view.flxPasswordResetWarning.isVisible ? 80 : 0);
                    diff = diff + (this.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                    if (this.view.flxApprovalAndRequest.isVisible === true) {
                        diff = diff + (this.view.flxApprovalAndRequest.info.frame.height - 8);
                    }
                } else {
                    var diff1 = ((count * 90) - 24);
                    var diff = 0;
                    diff = diff + diff1;
                    diff = diff + (this.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                }
                if (kony.application.getCurrentBreakpoint() === 1024 || kony.application.getCurrentBreakpoint() === 1366) {
                    var diff = 0;
                    diff = diff + (this.view.flxPasswordResetWarning.isVisible ? 80 : 0);
                    diff = diff + (this.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                    if (this.view.flxApprovalAndRequest.isVisible === true) {
                        diff = diff + (this.view.flxApprovalAndRequest.info.frame.height - 8);
                    }
                } else {
                    var diff1 = ((count * 90) - 24);
                    var diff = 0;
                    diff = diff + diff1;
                    diff = diff + (this.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                }
                if (kony.application.getCurrentBreakpoint() === 1380) {
                    var diff = 0;
                    diff = diff + (this.view.flxPasswordResetWarning.isVisible ? 80 : 0);
                    diff = diff + (this.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                    if (this.view.flxApprovalAndRequest.isVisible === true) {
                        diff = diff + (this.view.flxApprovalAndRequest.info.frame.height - 8);
                    }
                } else {
                    var diff1 = ((count * 90) - 24);
                    var diff = 0;
                    diff = diff + diff1;
                    diff = diff + (this.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                }
                if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
                    if (kony.i18n.getCurrentLocale() === "ar_AE") {
                        this.view.flxAdvancedFilters.left = "34dp";
                    }
                } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    if (kony.i18n.getCurrentLocale() === "ar_AE") {
                        this.view.flxAdvancedFilters.left = "30dp";
                    }
                } else {
                    if (kony.i18n.getCurrentLocale() === "ar_AE" || orientationHandler.isMobile) {
                        this.view.flxAdvancedFilters.left = "20dp";
                    }
                }
                this.view.advancedFilters.flxGroupBody.setVisibility(true);
                this.view.advancedFilters.flxSortBody.setVisibility(true);
                this.view.advancedFilters.flxToaBody.setVisibility(true);
                this.view.advancedFilters.flxCurrencyBody.setVisibility(true);
                if (kony.i18n.getCurrentLocale() === "ar_AE") {
                    this.view.advancedFilters.flxAccountsRightContainer.width = "25%";
                    this.view.advancedFilters.flxButtons.btnCancelFilter.right = "4%";
                }
                this.view.advancedFilters.lblImgGroupDropdown.text = 'P';
                this.view.advancedFilters.flxGroupSeperator.setVisibility(true);
                if (!(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)) this.view.advancedFilters.flxSeperatorGroup.top = "20dp";
                this.view.advancedFilters.lblImgDropdown.text = 'P';
                this.view.advancedFilters.flxSeperator.setVisibility(true);
                if (!(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)) this.view.advancedFilters.flxSeperatorSort.top = "20dp";
                this.view.advancedFilters.lblImage.text = 'P';
                this.view.advancedFilters.flxSeperatorToaTitle.setVisibility(true);
                if (!(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile))
                    if (!(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)) this.view.advancedFilters.flxSeperatorToa.top = "20dp";
                this.view.advancedFilters.lblImageCurrency.text = 'P';
                this.view.advancedFilters.flxSeperatorCurrency.setVisibility(true);
                if (!(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)) this.view.advancedFilters.flxSeperatorCurrencyType.top = "20dp";
                if (isAdvanceFilterOpen == true) {
                    isAdvanceFilterOpen = false;
                    this.view.flxAdvancedFilters.setVisibility(false);
                    this.view.btnAdvancedFiltersDropdown.text = 't';
                    this.view.btnAdvancedFiltersDropdown.skin = "sknBtnOLBFontIcons";
                } else {
                    hidePopups();
                    isAdvanceFilterOpen = true;
                    this.view.flxAdvancedFilters.setVisibility(true);
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                     //   this.view.flxAdvancedGroup.width = "100%";
                        this.view.flxAdvancedFilters.right = "0dp";
                     //   this.view.flxAdvancedGroup.right = "0%";
                     //   this.view.btnAdvancedFiltersDropdown.left = "88.5%";
                        this.view.lblAdvancedFiltersNumber.right = "0dp";
                    }
                    this.view.btnAdvancedFiltersDropdown.text = 'g';
                    this.view.btnAdvancedFiltersDropdown.skin = "sknBtnOLBFontIconsnew";
                }
                this.closePopupAndFilterScreens("advanceFilter");
                if (this.view.btnAdvancedFiltersDropdown.text === 'g') this.setLastFilterCriteria();
                if (this.view.btnAdvancedFiltersDropdown.text === 't') {
                    if (this.view.lblAdvancedFiltersNumber.text !== '0') this.view.lblAdvancedFiltersNumber.setVisibility(true);
                    else this.view.lblAdvancedFiltersNumber.setVisibility(false);
                } else this.view.lblAdvancedFiltersNumber.setVisibility(false);
                this.AdjustScreen();
                this.advancedFiltersAccessibility();
            }.bind(this);
            this.view.flxDropDown.onClick = this.showOrHideFilter.bind(this);
        },
        GetSortOrder: function(prop) {
            return function(a, b) {
                if (a[prop].toLowerCase() > b[prop].toLowerCase()) {
                    return 1;
                } else if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
                    return -1;
                }
                return 0;
            }
        },
        updatePriorityCount: function(priorityCount) {
            if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_SECURE_MESSAGE && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_SECURE_MESSAGE.toUpperCase() === "FALSE") {
                priorityCount = 0;
            }
            if (priorityCount === 1) {
                this.view.flxPriorityMessage.setVisibility(true);
                this.view.priorityMessageTag.lblPriorityMessageCount.text = "You've recieved a new Priority Message(s).";
            } else if (priorityCount > 1) {
                this.view.flxPriorityMessage.setVisibility(true);
                this.view.priorityMessageTag.lblPriorityMessageCount.text = "You've recieved " + priorityCount + " new Priority Message(s).";
            } else {
                this.view.flxPriorityMessage.setVisibility(false);
            }
        },
        setFlowActions: function() {
            var scopeObj = this;
            scopeObj.view.priorityMessageTag.lblViewMessages.onTouchEnd = function() {
                if (applicationManager.getConfigurationManager().isMicroAppPresent("SecureMessageMA")) {
                    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AlertsMsgsUIModule",
                        "appName": "SecureMessageMA"
                    });
                    alertsModule.presentationController.showAlertsPage('', {
                        show: "Messages"
                    });
                }
            };
            scopeObj.view.priorityMessageTag.flxPriorityMessageClose.onClick = function() {
                scopeObj.view.flxPriorityMessage.setVisibility(false);
            };
        },
        /* method to fetch the custom views and display in accountsFilter component */
        setCustomViewsData: function(customViews) {
            var scopeObj = this;
            var response = customViews; //this.loadAccountModule().presentationController.customViews;
            if (response.length > 0) {
                this.view.accountsFilter.segCustomFiltersHeader.setVisibility(true);
                this.view.accountsFilter.flxAddNew.setVisibility(true);
                this.view.accountsFilter.flxNoCustomViews.setVisibility(false);
                this.view.accountsFilter.lblCustomFiltersHeader.text = kony.i18n.getLocalizedString("i18n.accounts.customView");
                this.view.accountsFilter.segCustomFiltersHeader.widgetDataMap = {
                    "flxGroupRadioButton": "flxGroupRadioButton",
                    "lblRadioButton": "lblRadioButton",
                    "lblFilterValue": "lblFilterValue",
                    "lblEdit": "lblEdit",
                    "flxEdit": "flxEdit",
                    "response": "response"
                };
                var segdata = [];
                //         var personalContained = [];
                //         var businessContained = [];
                //         var businessIds = [];
                //         var personalIds = [];
                //         response.forEach(function(item){
                //           var responseAccounts = item.accountIds.split(',');
                //           var personalFlag = 0;
                //           var businessFlag = 0;
                //           for(var i=0;i<responseAccounts.length;i++){
                //             if(scopeObj.presenter.presentationController.fetchIsBusinessAccount(responseAccounts[i])==="true")
                //               businessFlag = 1;
                //             else
                //               personalFlag = 1;
                //           }
                //           if (businessFlag === 1 && !businessIds.includes(item.id)){
                //             businessContained.push(item);
                //             businessIds.push(item.id);
                //           }
                //           if (personalFlag === 1 && !personalIds.includes(item.id)) {
                //             personalContained.push(item);
                //             personalIds.push(item.id);
                //           }
                //         });
                //         this.personalContained = personalContained;
                //         this.businessContained = businessContained;
                //         if(this.isCombinedUser){
                //           if(this.currDashboard === 1){
                //             response = personalContained;
                //           }
                //           else if(this.currDashboard === 2){
                //             response = businessContained;
                //           }
                //         }
                response.sort(this.GetSortOrder("name"));
                for (i = 0; i < response.length; i++) {
                    response[i].type = "Edit";
                    var data = {
                        "lblRadioButton": {
                            "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
                            "skin": "sknRadioGreyUnselectedFonticon929292",
                        },
                        "flxGroupRadioButton": {
                            "onClick": scopeObj.setSelectedCustomView,
                            "accessibilityConfig": {
                                "a11yARIA": {
                                    "tabindex": 0,
                                    "role": "radio",
                                    "aria-labelledby": "lblFilterValue",
                                    "aria-checked": false,
                                }
                            }
                        },
                        "lblFilterValue": {
                            "text": response[i].name.length > 20 ? CommonUtilities.truncateStringWithGivenLength(response[i].name + "...", 20) : response[i].name,
                        },
                        "lblEdit": {
                            "text": kony.i18n.getLocalizedString("i18n.accounts.edit")
                        },
                        "flxEdit": {
                            "isVisible": true,
                            "onKeyPress": this.accountsFilterDropDownEdit,
                            "onClick": function(eventobject, context) {
                                scopeObj.navigateToEditCustomview(context)
                            }.bind(this)
                        },
                        "response": response[i]
                    };
                    segdata.push(data);
                }
                if (this.customViewFlag !== true) {
                    this.view.accountsFilter.segCustomFiltersHeader.setData(segdata);
                    this.customViewFlag = false;
                }
                if (this.currentView !== '' && this.isCustomFilterApplied === true) {
                    data = this.view.accountsFilter.segCustomFiltersHeader.data;
                    for (i = 0; i < data.length; i++) {
                        if (data[i].response.id === this.currentViewId) {
                            data[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                            data[i].lblRadioButton.skin = "sknRadioselectedFonticon";
                            data[i].flxGroupRadioButton.accessibilityConfig = {
                                a11yARIA: {
                                    "role": "radio",
                                    "aria-labelledby": "lblFilterValue",
                                    "aria-checked": true,
                                }
                            }
                        } else {
                            data[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                            data[i].lblRadioButton.skin = "sknRadioGreyUnselectedFonticon929292";
                            data[i].flxGroupRadioButton.accessibilityConfig = {
                                a11yARIA: {
                                    "role": "radio",
                                    "aria-labelledby": "lblFilterValue",
                                    "aria-checked": false,
                                }
                            }
                        }
                    }
                    this.view.accountsFilter.segCustomFiltersHeader.setData(data);
                }
            } else {
                //this.view.accountsFilter.segCustomFiltersHeader.setVisibility(false);
                //this.view.accountsFilter.flxAddNew.setVisibility(false);
                this.view.accountsFilter.segCustomFiltersHeader.setVisibility(false);
                this.view.accountsFilter.flxNoCustomViews.setVisibility(true);
                this.view.accountsFilter.lblNoCustomViews.text = kony.i18n.getLocalizedString("i18n.customViews.NoCustomViews");
            }
        },
        /* method to navigate to frmCustomView on clicking Edit button in the custom view segment */
        navigateToEditCustomview: function(context) {
            this.view.lblDropDown.text = 'O';
            var selectedIndex = context.rowIndex; //this.view.accountsFilter.segCustomFiltersHeader.selectedRowIndex[1];
            var data = this.view.accountsFilter.segCustomFiltersHeader.data;
            this.presenter.presentationController.navigateToEditCustomview(data[selectedIndex].response);
        },
        /* method to apply the selected custom view on the dashboard */
        setSelectedCustomView: function(widgetInfo, segInfo) {
            this.offset = 0;
            this.lastRecord = '';
            var rowIndex = segInfo.rowIndex //this.view.accountsFilter.segCustomFiltersHeader.selectedRowIndex[1];
            var selectedIndex = segInfo.sectionIndex; //this.view.accountsFilter.segCustomFiltersHeader.selectedRowIndex[1];
            var data = this.view.accountsFilter.segCustomFiltersHeader.data;
            var response = data[rowIndex].response;
            this.currentView = data[rowIndex].response.name;
            for (i = 0; i < data.length; i++) {
                if (i === rowIndex) {
                    data[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                    data[i].lblRadioButton.skin = "sknRadioselectedFonticon";
                    data[i].flxGroupRadioButton.accessibilityConfig = {
                        a11yARIA: {
                            "role": "radio",
                            "aria-labelledby": "lblFilterValue",
                            "aria-checked": true,
                        }
                    }
                    this.hiddenlblSelectedFilter = data[i].response.name;
                    this.view.lblSelectedFilter.text = data[i].response.name.length > 25 ? CommonUtilities.truncateStringWithGivenLength(data[i].response.name + "...", 25) : data[i].response.name;
                    this.view.lblDropDown.text = this.view.accountsFilter.isVisible === "true" ? 'P' : 'O'; //this.view.lblDropDown.text === 'O' ? 'P' : 'O';
                    this.accountsFilterAccessibility();
                } else {
                    data[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    data[i].lblRadioButton.skin = "sknRadioGreyUnselectedFonticon929292";
                    data[i].flxGroupRadioButton.accessibilityConfig = {
                        a11yARIA: {
                            "role": "radio",
                            "aria-labelledby": "lblFilterValue",
                            "aria-checked": false,
                        }
                    }
                }
            }
            this.view.accountsFilter.segCustomFiltersHeader.setData(data);
            data = this.view.accountsFilter.segDefaultFilters.data;
            for (i = 0; i < data.length; i++) {
                data[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                data[i].lblRadioButton.skin = "sknRadioGreyUnselectedFonticon929292";
                data[i].flxAccountFilterRowTemplate.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-checked": false,
                        "aria-labelledby": "lblFilterValue"
                    }
                }
            }
            this.view.accountsFilter.segDefaultFilters.setData(data);
            var responseAccounts = [];
            responseAccounts = response.accountIds.split(',');
            if (this.presenter.presentationController.customerdashboard === "true") {
					var totalAccounts = this.presenter.presentationController.customeraccounts;
				} else {
						var totalAccounts = this.presenter.presentationController.accounts;
				}	
            var result = [];
            for (j = 0; j < responseAccounts.length; j++) {
                for (i = 0; i < totalAccounts.length; i++) {
                    if (responseAccounts[j] === totalAccounts[i].Account_id) {
                        result.push(totalAccounts[i]);
                        continue;
                    }
                }
            }
            //       var resultData = {accountsSummary: result};
            //        this.presenter.presentationController.navigateToCustomviewDashboard(resultData);
            var resultData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(result) : this.getDataWithSections(result);
            resultData = this.isSingleCustomerProfile ? this.generateTotalBalanceHide(resultData) : resultData;
            this.view.accountList.segAccounts.setData(resultData);
            this.currentViewId = response.id;
            //this.currentViewData = resultData;
            this.isCustomFilterApplied = true;
            this.isDefaultFilterApplied = false;
            this.isAdvancedFilterApplied = false;
            this.getSearchAndFilterData(totalAccounts);
            this.AdjustScreen();
            this.view.accountsFilter.setVisibility(false);
            this.view.forceLayout();
        },
        accountsFilterAccessibility: function() {
            if (this.view.accountsFilter.isVisible === true) {
                this.view.flxDropDown.accessibilityConfig = {
                    a11yARIA: {
                        "aria-expanded": true,
                        "role": "button",
                        "aria-labelledby": "lblSelectedFilter"
                    },
                }
            }
            if (this.view.accountsFilter.isVisible === false) {
                this.view.flxDropDown.accessibilityConfig = {
                    a11yARIA: {
                        "aria-expanded": false,
                        "role": "button",
                        "aria-labelledby": "lblSelectedFilter"
                    },
                }
            }
        },
        advancedFiltersToggel: function() {		
            this.view.flxAdvancedFilters.setVisibility(false);
                isAdvanceFilterOpen = false;
                this.view.btnAdvancedFiltersDropdown.text = (this.view.btnAdvancedFiltersDropdown.text === 'g' ? 't' : 'g');
                this.view.btnAdvancedFiltersDropdown.skin = (this.view.btnAdvancedFiltersDropdown.text === 'g' ? "sknBtnOLBFontIconsnew" : "sknBtnOLBFontIcons");
                this.setLastFilterCriteria();
                this.view.btnAdvancedFiltersDropdown.setFocus(true);
				this.advancedFiltersAccessibility();
                if (this.view.btnAdvancedFiltersDropdown.text === 't') {
                    if (this.view.lblAdvancedFiltersNumber.text !== '0') this.view.lblAdvancedFiltersNumber.setVisibility(true);
                    else this.view.lblAdvancedFiltersNumber.setVisibility(false);
                } else this.view.lblAdvancedFiltersNumber.setVisibility(false);
			
        },
        advancedMenuListToggel: function() {
                    var currFormObj = kony.application.getCurrentForm();
                    currFormObj.accountListMenu.setVisibility(false);
                    sectionLength = currFormObj.accountList.segAccounts.data.length;
                    var data4 = currFormObj.accountList.segAccounts.data;
                    for (i = 0; i < sectionLength; i++) {
                        length2 = currFormObj.accountList.segAccounts.data[i][1]["length"];
                        for (j = 0; j < length2; j++) {
                            if (data4[i][1][j]["template"] === "flxAccountsRowTemplate") {
                                data4[i][1][j]["flxMenu"].accessibilityConfig = {
                                    "a11yLabel": "Open list of quick actions for"+ data4[i][1][j].accountName,
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false
                                    }
                                }
                                currFormObj.accountList.segAccounts.setDataAt(data4[i][1][j], j, i);
                                //currFormObj.forceLayout();
                            }
                        }
                    }
        },
        advancedFiltersAccessibility: function() {
            if (this.view.flxAdvancedFilters.isVisible === true) {
                this.view.btnAdvancedFiltersDropdown.accessibilityConfig = {
                    "a11yLabel": "Advanced Filters",
                    a11yARIA: {
                        "aria-expanded": true,
                    },
                }
                this.view.advancedFilters.btnReset.setFocus(true);
            } else if (this.view.flxAdvancedFilters.isVisible === false) {
                this.view.btnAdvancedFiltersDropdown.accessibilityConfig = {
                    "a11yLabel": "Advanced Filters",
                    a11yARIA: {
                        "aria-expanded": false,
                    },
                }
            }
            //this.view.flxAdvancedFiltersDropdown.setFocus(true);
            this.sortByFiltersAccessibility();
            this.groupByFilterAccessibility();
            this.typesOfAccountsAccessibility();
            this.currencyBodyAccessibility();
        },
        sortByFiltersAccessibility: function() {
            if (this.view.advancedFilters.flxSortBody.isVisible === true) {
                this.view.advancedFilters.flxDropDown.accessibilityConfig = {
                    a11yLabel: "Sort by filter",
                    a11yARIA: {
                        "aria-expanded": true,
                        "role": "button",
                    },
                }
            } else if (this.view.advancedFilters.flxSortBody.isVisible === false) {
                this.view.advancedFilters.flxDropDown.accessibilityConfig = {
                    a11yLabel: "Sort by filter",
                    a11yARIA: {
                        "aria-expanded": false,
                        "role": "button",
                    },
                }
            }
        },
        groupByFilterAccessibility: function() {
            if (this.view.advancedFilters.flxGroupBody.isVisible === true) {
                this.view.advancedFilters.flxGroupDropDown.accessibilityConfig = {
                    a11yLabel: "Sort by group",
                    a11yARIA: {
                        "aria-expanded": true,
                        "role": "button",
                    },
                }
            } else if (this.view.advancedFilters.flxGroupBody.isVisible === false) {
                this.view.advancedFilters.flxGroupDropDown.accessibilityConfig = {
                    a11yLabel: "Sort by group",
                    a11yARIA: {
                        "aria-expanded": false,
                        "role": "button",
                    },
                }
            }
        },
        typesOfAccountsAccessibility: function() {
            if (this.view.advancedFilters.flxToaBody.isVisible === true) {
                this.view.advancedFilters.flxDropdownImage.accessibilityConfig = {
                    a11yLabel: "Sort by accounts",
                    a11yARIA: {
                        "aria-expanded": true,
                        "role": "button",
                    },
                }
            } else if (this.view.advancedFilters.flxToaBody.isVisible === false) {
                this.view.advancedFilters.flxDropdownImage.accessibilityConfig = {
                    a11yLabel: "Sort by account",
                    a11yARIA: {
                        "aria-expanded": false,
                        "role": "button",
                    },
                }
            }
        },
        currencyBodyAccessibility: function() {
            if (this.view.advancedFilters.flxCurrencyBody.isVisible === true) {
                this.view.advancedFilters.flxDropdownCurrency.accessibilityConfig = {
                    a11yLabel: "Sort by currency",
                    a11yARIA: {
                        "aria-expanded": true,
                        "role": "button",
                    },
                }
            } else if (this.view.advancedFilters.flxCurrencyBody.isVisible === false) {
                this.view.advancedFilters.flxDropdownCurrency.accessibilityConfig = {
                    a11yLabel: "Sort by currency",
                    a11yARIA: {
                        "aria-expanded": false,
                        "role": "button",
                    },
                }
            }
        },
        flxByAccountsAccessibility: function() {
            if (this.view.advancedFilters.lblIconAccountName.text === 'M') {
                this.view.advancedFilters.flxByAccounts.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-checked": true,
                        "aria-labelledby": "lblAccounts"
                    }
                }
            } else if (this.view.advancedFilters.lblIconAccountName.text === 'L') {
                this.view.advancedFilters.flxByAccounts.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-checked": false,
                        "aria-labelledby": "lblAccounts"
                    }
                }
            }
        },
        flxByBalanceAccessibilty: function() {
            if (this.view.advancedFilters.lblIconBalance.text === 'M') {
                this.view.advancedFilters.flxByBalance.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-checked": true,
                        "aria-labelledby": "lblBalance"
                    }
                }
            } else if (this.view.advancedFilters.lblIconBalance.text === 'L') {
                this.view.advancedFilters.flxByBalance.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-checked": false,
                        "aria-labelledby": "lblBalance"
                    }
                }
            }
        },
        flxChoice3Accessibility: function() {
            if (this.view.advancedFilters.lblIconChoice3.text === 'M') {
                this.view.advancedFilters.flxByChoice3.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-labelledby": "lblChoice3",
                        "aria-checked": true,
                    },
                }
            } else if (this.view.advancedFilters.lblIconChoice3.text === 'L') {
                this.view.advancedFilters.flxByChoice3.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-checked": false,
                        "aria-labelledby": "lblChoice3"
                    }
                }
            }
        },
        flxGroupByCompanyAccessibility: function() {
            if (this.view.advancedFilters.lblIconGroupCompany.text === 'M') {
                this.view.advancedFilters.flxGroupByCompany.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-labelledby": "lblGroupCompany",
                        "aria-checked": true,
                    },
                }
            } else if (this.view.advancedFilters.lblIconGroupCompany.text === 'L') {
                this.view.advancedFilters.flxGroupByCompany.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-labelledby": "lblGroupCompany",
                        "aria-checked": false,
                    },
                }
            }
        },
        flxGroupByAccountTypeAccessibility: function() {
            if (this.view.advancedFilters.lblIconAccountType.text === 'M') {
                this.view.advancedFilters.flxGroupByAccountType.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-labelledby": "lblAccountType",
                        "aria-checked": true,
                    },
                }
            } else if (this.view.advancedFilters.lblIconAccountType.text === 'L') {
                this.view.advancedFilters.flxGroupByAccountType.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-labelledby": "lblAccountType",
                        "aria-checked": false,
                    },
                }
            }
        },
        /*
         * Method to add data to filter segment
         */
        initializeFilterSegments: function() {
            var accountTypes = this.sectionData;
            var dataMap = {
                "lblRadioButton": "lblRadioButton",
                "lblFilterValue": "lblFilterValue",
                "flxAccountFilterRowTemplate": "flxAccountFilterRowTemplate"
            };
            //       this.view.accountsFilter.segDefaultFilters.onRowClick = function(eventobject, sectionIndex, rowIndex) {
            //         this.onFilterSelection(eventobject, sectionIndex, rowIndex, accounts);
            //       }.bind(this);
            this.view.accountsFilter.segDefaultFilters.widgetDataMap = dataMap;
            var filterData = [];
            var allAccountsFilterValue;
            var allAccountsFilterValueForSegment;
            var viewType = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');
            //       if(viewType === 0){
            //         allAccountsFilterValue = kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts");
            //       }
            //       else if(viewType === 1){
            //         var index = accountTypes.indexOf(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
            // 		if (index !== -1) accountTypes.splice(index, 1);
            //         allAccountsFilterValue = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL") + " " + kony.i18n.getLocalizedString("i18n.accounts.personalAccounts");
            //       }
            //       else if(viewType === 2){
            // 		allAccountsFilterValue = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL") + " " + kony.i18n.getLocalizedString("i18n.accounts.businessAccounts");
            //       }
            //       else
            allAccountsFilterValue = kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts");
            allAccountsFilterValueForSegment = kony.i18n.getLocalizedString("i18n.Homepage.DashboardFilter.allAccounts");
            var allAccounts = {
                "lblRadioButton": {
                    "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO,
                    "skin": "sknRadioselectedFonticon"
                },
                "lblFilterValue": {
                    "text": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + allAccountsFilterValueForSegment,
                    "skin": "bbSknLbl424242SSP15Px"
                },
                "flxAccountFilterRowTemplate": {
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "role": "radio",
                            "aria-checked": true,
                            "aria-labelledby": "lblFilterValue"
                        }
                    },
                    "onKeyPress":this.accountsFilterDropDown,
                    "onClick":this.onFilterSelection
                }
            };
            filterData.push(allAccounts);
            this.view.lblSelectedFilter.text = allAccountsFilterValue;
            var favFlag = applicationManager.getConfigurationManager().getConfigurationValue('isFavoriteRequired');
            var favConfigCount = applicationManager.getConfigurationManager().getConfigurationValue('favoriteCount');
            if (this.isFavAccAvailable && favFlag && favConfigCount <= this.accounts.length) {
                var favoriteAccounts = {
                    "lblRadioButton": {
                        "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
                        "skin": "sknRadioGreyUnselectedFonticon929292"
                    },
                    "lblFilterValue": {
                        "text": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.Accounts.FavouriteAccounts"),
                        "skin": "sknSSP72727215Px"
                    },
                    "flxAccountFilterRowTemplate": {
                        "accessibilityConfig": {
                            "a11yARIA": {
                                "role": "radio",
                                "aria-checked": false,
                                "aria-labelledby": "lblFilterValue"
                            }
                        },
                        "onKeyPress":this.accountsFilterDropDown,
                        "onClick":this.onFilterSelection
                    }
                };
                filterData.push(favoriteAccounts);
            }
            if (this.isSingleCustomerProfile && this.isExtAccAvailable) {
                if (kony.sdk.isNullOrUndefined(this.bankName))
                    for (var i = 0; i < this.accounts.length; i++)
                        if ((kony.sdk.isNullOrUndefined(this.accounts[i].externalIndicator)) || (this.accounts[i].externalIndicator === "false")) {
                            this.bankName = this.accounts[i].bankName;
                            break;
                        }
                var dbxAccounts = {
                    "lblRadioButton": {
                        "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
                        "skin": "sknRadioGreyUnselectedFonticon929292"
                    },
                    "lblFilterValue": {
                        "text": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + this.bankName + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                        "skin": "sknSSP72727215Px"
                    },
                    "flxAccountFilterRowTemplate": {
                        "accessibilityConfig": {
                            "a11yARIA": {
                                "role": "radio",
                                "aria-checked": false,
                                "aria-labelledby": "lblFilterValue"
                            }
                        },
                        "onKeyPress":this.accountsFilterDropDown,
                        "onClick":this.onFilterSelection
                    }
                };
                filterData.push(dbxAccounts);
                var externalAccounts = {
                    "lblRadioButton": {
                        "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
                        "skin": "sknRadioGreyUnselectedFonticon929292"
                    },
                    "lblFilterValue": {
                        "text": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.hamburger.externalAccounts"),
                        "skin": "sknSSP72727215Px"
                    },
                    "flxAccountFilterRowTemplate": {
                        "accessibilityConfig": {
                            "a11yARIA": {
                                "role": "radio",
                                "aria-checked": false,
                                "aria-labelledby": "lblFilterValue"
                            }
                        },
                        "onKeyPress":this.accountsFilterDropDown,
                        "onClick":this.onFilterSelection
                    }
                };
                filterData.push(externalAccounts);
            }
            if (!this.isSingleCustomerProfile)
                for (var i = 0; i < accountTypes.length; i++) {
                    var accountName = this.accountGroups[accountTypes[i]]["membershipName"];
                    var otherAccounts = {
                        "lblRadioButton": {
                            "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
                            "skin": "sknRadioGreyUnselectedFonticon929292"
                        },
                        "lblFilterValue": {
                            "text": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + accountName, // + " " + kony.i18n.getLocalizedString("i18n.Accounts.accounts")
                            "skin": "sknSSP72727215Px"
                        },
                        "flxAccountFilterRowTemplate": {
                            "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "radio",
                                    "aria-checked": false,
                                    "aria-labelledby": "lblFilterValue"
                                }
                            },
                            "onKeyPress":this.accountsFilterDropDown,
                            "onClick":this.onFilterSelection
                        },
                        "membershipId": this.accountGroups[accountTypes[i]]["membershipId"]
                    };
                    filterData.push(otherAccounts);
                }
                //Defect: ARB-33686 - Starts
            if (this.isSingleCustomerProfile)
                for (var i = 0; i < accountTypes.length; i++) {
                    var accountType = this.accountGroups[accountTypes[i]]["accountType"];
                    var otherAccounts = {
                        "lblRadioButton": {
                            "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
                            "skin": "sknRadioGreyUnselectedFonticon929292"
                        },
                        "lblFilterValue": {
                            "text": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + accountType, // + " " + kony.i18n.getLocalizedString("i18n.Accounts.accounts")
                            "skin": "sknSSP72727215Px"
                        },
                        "flxAccountFilterRowTemplate": {
                            "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "radio",
                                    "aria-checked": false,
                                    "aria-labelledby": "lblFilterValue"
                                }
                            },
                            "onKeyPress":this.accountsFilterDropDown,
                            "onClick":this.onFilterSelection
                        },
                        "membershipId": this.accountGroups[accountTypes[i]]["membershipId"],
                        "accountType": accountType
                    };
                    filterData.push(otherAccounts);
                } //Defect: ARB-33686 - Ends
            this.view.accountsFilter.segDefaultFilters.setData(filterData);
            var customViews = this.presenter.presentationController.customViews;
            if (customViews) this.setCustomViewsData(customViews);
        },
        /*method to make service call to fetch custom views */
        initializeCustomViewFilters: function() {
            var isCustomViewPermitted = applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_VIEW_MANAGE");
            if (isCustomViewPermitted) {  
              var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                  "appName": "HomepageMA",
                  "moduleName": "AccountsUIModule"
               });
              var custDashboard = accountsModule.presentationController.customerdashboard;
              if (custDashboard === "true") {              
              var CustomerId = accountsModule.presentationController.customerId
                 var params = {
                  coreCustomerId: CustomerId
                };
                this.loadAccountModule().presentationController.fetchCustomViews(params);
              } else {
                this.loadAccountModule().presentationController.fetchCustomViews();
                }
            }
            this.view.accountsFilter.flxOrLine.setVisibility(isCustomViewPermitted);
            this.view.accountsFilter.flxCustomFilterWrapper.setVisibility(isCustomViewPermitted);
            this.view.accountsFilter.flxAddNew.onClick = this.navigateToCustomViews.bind(this);
        },
        /* method to navigate to frmCustomView on clicking Add New in the custom views section */
        navigateToCustomViews: function() {
            this.view.lblDropDown.text = 'O';
            this.loadAccountModule().presentationController.navigateToCreateCustomview();
        },

        accountsFilterDropDown: function(eventobject, eventPayload, context) {
            var frm = kony.application.getCurrentForm();
            if (eventPayload.keyCode === 9) {
                if (eventPayload.shiftKey) {
                    if (context.rowIndex === 0) {
                        //visibility off for filters flx and set focus to accounts filter dropdown
                        eventPayload.preventDefault();
                        frm.accountsFilter.isVisible = false;
                        frm.lblDropDown.text = "O";
                        frm.flxDropDown.setActive(true);
                        frm.flxDropDown.accessibilityConfig = {
                            a11yARIA: {
                                "aria-expanded": false,
                                "aria-labelledby": "lblSelectedFilter",
                                "role": "button"
                            }
                        };
                    }
                }
            }
             if (eventPayload.keyCode === 27) {
                eventPayload.preventDefault();
                        frm.accountsFilter.isVisible = false;
                        frm.lblDropDown.text = "O";
                        frm.flxDropDown.setActive(true);
                        frm.flxDropDown.accessibilityConfig = {
                            a11yARIA: {
                                "aria-expanded": false,
                                "aria-labelledby": "lblSelectedFilter",
                                "role": "button"
                            }
                        };
            }
        },

        accountsFilterDropDownEdit: function(eventobject, eventPayload, context) {
            var frm = kony.application.getCurrentForm();
            var len = frm.accountsFilter.segCustomFiltersHeader.data.length-1;
            if (eventPayload.keyCode === 9) {
                if (!(eventPayload.shiftKey)) {
                    if (context.rowIndex === len) {
                        //visibility off for filters flx and set focus to accounts filter dropdown
                        eventPayload.preventDefault();
                        frm.accountsFilter.isVisible = false;
                        frm.lblDropDown.text = "O";
                        frm.flxDropDown.setActive(true);
                        frm.flxDropDown.accessibilityConfig = {
                            a11yARIA: {
                                "aria-expanded": false,
                                "aria-labelledby": "lblSelectedFilter",
                                "role": "button"
                            }
                        };
                    }
               }
            }
        },

        /*
         * Method to process segment ui based on selected filter
         */
        onFilterSelection: function() {
            this.offset = 0;
            this.lastRecord = '';
            var rowIndex = this.view.accountsFilter.segDefaultFilters.selectedRowIndex[1];
            if (this.presenter.presentationController.customerdashboard === "true") {
                    var accounts = this.presenter.presentationController.customeraccounts;
				} else {
						var accounts = this.presenter.presentationController.accounts;
				}
            //var rowIndex = context.rowIndex;
            var scopeObj = this;
            var segData = scopeObj.view.accountsFilter.segDefaultFilters.data;
            this.currentView = segData[rowIndex].lblFilterValue.text.slice(5);
            //Since Dropdown should have "all acocunts" but selected filter label should have "All Accounts"
            if(this.currentView == kony.i18n.getLocalizedString("i18n.Homepage.DashboardFilter.allAccounts")){
                this.currentView = kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts");
            }
            for (var i = 0; i < segData.length; i++) {
                if (i === rowIndex) {
                    segData[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                    segData[i].lblRadioButton.skin = "sknRadioselectedFonticon";
                    segData[i].flxAccountFilterRowTemplate.accessibilityConfig = {
                        a11yARIA: {
                            "role": "radio",
                            "aria-checked": true,
                            "aria-labelledby": "lblFilterValue"
                        }
                    }
                    scopeObj.view.lblSelectedFilter.text = segData[i].lblFilterValue.text.slice(5);
                    //Since Dropdown should have "all acocunts" but selected filter label should have "All Accounts"
                    if(scopeObj.view.lblSelectedFilter.text == kony.i18n.getLocalizedString("i18n.Homepage.DashboardFilter.allAccounts")){
                        scopeObj.view.lblSelectedFilter.text = kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts");
                    }                    
                    segData[i].lblFilterValue.skin = "bbSknLbl424242SSP15Px";
                    scopeObj.view.lblSelectedFilter.text = scopeObj.view.lblSelectedFilter.text.length > 25 ? CommonUtilities.truncateStringWithGivenLength(scopeObj.view.lblSelectedFilter.text + "...", 25) : scopeObj.view.lblSelectedFilter.text;
                } else {
                    segData[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    segData[i].lblRadioButton.skin = "sknRadioGreyUnselectedFonticon929292";
                    segData[i].flxAccountFilterRowTemplate.accessibilityConfig = {
                        a11yARIA: {
                            "role": "radio",
                            "aria-checked": false,
                            "aria-labelledby": "lblFilterValue"
                        }
                    }
                    segData[i].lblFilterValue.skin = "sknSSP72727215Px";
                }
                scopeObj.view.accountsFilter.segDefaultFilters.setDataAt(segData[i], i);
            }
           
            var data = scopeObj.view.accountsFilter.segCustomFiltersHeader.data;
            if (!(kony.sdk.isNullOrUndefined(data)) && data.length > 0) {
                for (var j = 0; j < data.length; j++) {
                    data[j].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    data[j].lblRadioButton.skin = "sknRadioGreyUnselectedFonticon929292";
                }
                scopeObj.view.accountsFilter.segCustomFiltersHeader.setData(data);
            }
            scopeObj.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            scopeObj.view.accountsFilter.setVisibility(false);
            this.isCustomFilterApplied = false;
            this.isDefaultFilterApplied = true;
            this.isAdvancedFilterApplied = false;
            this.filterIndex = rowIndex;
            var data = scopeObj.getSearchAndFilterData(accounts);
            //this.initializeAdvancedFilters(accounts);
            scopeObj.view.accountList.segAccounts.setData(data);
            //this.currentViewData = data;
            this.currentViewId = '';
            scopeObj.view.forceLayout();
            //This code checks and handles the SBA related things on selecting accounts or contracts in the dropdowns
            this.hideSbaUI();
            if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.SMARTBANKINGADVISORY)) {
                selectedSegData = segData[rowIndex];
                if (kony.sdk.isNullOrUndefined(sbaFeaturesDetails)) {
                    scopeObj.presenter.presentationController.getSBAFeatureDetails({}, this.view.id);
                }else{
                    scope.getSbaBusiness();
                    scope.updateHamburger();
                }
            }
            scopeObj.AdjustScreen();
            this.view.flxDropDown.setActive(true);
            this.view.flxDropDown.accessibilityConfig = {
                a11yARIA: {
                    "aria-expanded": false,
                    "aria-labelledby": "lblSelectedFilter",
                    "role": "button"
                }
            };
        },
        /**
         * method used to enable or disable the clear button.
         */
        showOrHideFilter: function() {
            this.closePopupAndFilterScreens("defaultView");
            var scopeObj = this;
            if (scopeObj.view.accountsFilter.origin) {
                scopeObj.view.accountsFilter.origin = false;
                scopeObj.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                scopeObj.view.accountsFilter.setVisibility(false);
                return;
            }
            if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
                if (kony.i18n.getCurrentLocale() === "ar_AE") {
                    this.view.accountsFilter.left = "45dp";
                }
            } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                if (kony.i18n.getCurrentLocale() === "ar_AE") {
                    this.view.accountsFilter.left = "35dp";
                }
            } else if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.accountsFilter.left = "0dp";
            } else {
                if (kony.i18n.getCurrentLocale() === "ar_AE" || orientationHandler.isMobile) {
                    this.view.accountsFilter.left = "15dp";
                }
            }
            if (scopeObj.view.lblDropDown.text === ViewConstants.FONT_ICONS.CHEVRON_DOWN) {
                //hidePopups(); // ARB-33686
                scopeObj.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                var warningsList = [scopeObj.view.flxPasswordResetWarning, scopeObj.view.flxOutageWarning, scopeObj.view.flxOverdraftWarning, scopeObj.view.flxDowntimeWarning, scopeObj.view.flxDeviceRegistrationWarning, scopeObj.view.flxPriorityMessage];
                var count = 0;
                for (var i = 0, size = warningsList.length; i < size; i++) {
                    var item = warningsList[i];
                    if (item.isVisible) {
                        count++;
                    }
                }
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    var diff = 0;
                    diff = diff + (scopeObj.view.flxPasswordResetWarning.isVisible ? 80 : 0);
                    diff = diff + (scopeObj.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                } else {
                    var diff1 = ((count * 90) - 24);
                    var diff = 0;
                    diff = diff + diff1;
                    diff = diff + (scopeObj.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                }
                if (kony.application.getCurrentBreakpoint() === 1024 || kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
                    var diff = 0;
                    diff = diff + (scopeObj.view.flxPasswordResetWarning.isVisible ? 80 : 0);
                    diff = diff + (scopeObj.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                } else {
                    var diff1 = ((count * 90) - 24);
                    var diff = 0;
                    diff = diff + diff1;
                    diff = diff + (scopeObj.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                }
                if (kony.application.getCurrentBreakpoint() === 1380 || orientationHandler.isMobile) {
                    var diff = 0;
                    diff = diff + (scopeObj.view.flxPasswordResetWarning.isVisible ? 80 : 0);
                    diff = diff + (scopeObj.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                } else {
                    var diff1 = ((count * 90) - 24);
                    var diff = 0;
                    diff = diff + diff1;
                    diff = diff + (scopeObj.view.flxInvestmentSummaryContainer.isVisible ? this.view.flxInvestmentSummaryContainer.info.frame.height : 0);
                }
                scopeObj.view.accountsFilter.setVisibility(true);
            } else {
                scopeObj.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                scopeObj.view.accountsFilter.setVisibility(false);
            }
            this.view.forceLayout();
            this.accountsFilterAccessibility();
        },
        /*method used to show appropriate components according to the user type
         */
        setUserDashboardVisibility: function() {
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var isRetailUser = applicationManager.getConfigurationManager().getConfigurationValue('isRBUser') === "true";
            var isBusinessUser = applicationManager.getConfigurationManager().getConfigurationValue('isSMEUser') === "true";
            var spendingPermissionCheck = applicationManager.getConfigurationManager().checkUserPermission("PERSONAL_FINANCE_MANAGEMENT");
            if (this.approvalsAndRequestsEntitilementCheck() && applicationManager.getConfigurationManager().checkUserPermission('APPROVAL_MATRIX_VIEW') && applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.APPROVALREQUEST)) this.view.flxApprovalAndRequest.setVisibility(true);
            else this.view.flxApprovalAndRequest.setVisibility(false);
            if (spendingPermissionCheck && applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.FINANCEMANAGEMENT)) this.view.mySpending.setVisibility(true);
            else this.view.mySpending.setVisibility(false);
            if (applicationManager.getConfigurationManager().checkUserPermission('ACCESS_CASH_POSITION')) this.view.flxMyCashPosition.setVisibility(true);
            else this.view.flxMyCashPosition.setVisibility(false);
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.mySpending.imgInfoMySpendingNoDat.setVisibility(false);
                this.view.mySpending.lblimgRound.setVisibility(false);
                this.view.mySpending.lblDataNotAvailable.setVisibility(false);
            }
            //             if (isRetailUser) {
            //                 this.view.flxMyCashPosition.setVisibility(false);
            //                 //this.view.mySpending.setVisibility(true);
            //               if (!((kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) || (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet))){
            //                 this.view.customheader.topmenu.flxCombined.setVisibility(false);
            //                 //this.view.customheader.topmenu.flxFeedback.setVisibility(true);
            //                 //this.view.customheader.topmenu.flxHelp.setVisibility(true);
            //                 this.view.customheader.headermenu.flxMessages.setVisibility(true);
            //                 this.view.customheader.headermenu.flxVerticalSeperator3.setVisibility(true);
            //               }
            //               //this.view.flxApprovalAndRequest.setVisibility(false);
            //             } else if (isBusinessUser) {
            // 				if (this.transactionViewAccessCheck())
            // 					this.view.flxMyCashPosition.setVisibility(true);
            //                // this.view.mySpending.setVisibility(false);
            //               if (!((kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) || (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet))){
            //                 this.view.customheader.topmenu.flxCombined.setVisibility(false);
            //                 //this.view.customheader.topmenu.flxFeedback.setVisibility(true);
            //                // this.view.customheader.topmenu.flxHelp.setVisibility(true);
            //                 this.view.customheader.headermenu.flxMessages.setVisibility(false);
            //                 this.view.customheader.headermenu.flxVerticalSeperator3.setVisibility(false);
            //               }	
            //               // if (this.approvalsAndRequestsEntitilementCheck()) this.view.flxApprovalAndRequest.setVisibility(true);
            //             } else if (isCombinedUser  && this.currDashboard===0) {
            // 				if (this.transactionViewAccessCheck())
            //                 this.view.flxMyCashPosition.setVisibility(true);
            //                 //this.view.mySpending.setVisibility(true);
            //               if (!((kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) || (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet))){
            //                 this.view.customheader.topmenu.flxCombined.setVisibility(false);
            //                 //this.view.customheader.topmenu.flxFeedback.setVisibility(false);
            //                 //this.view.customheader.topmenu.flxHelp.setVisibility(false);
            //                 this.view.customheader.headermenu.flxMessages.setVisibility(false);
            //                 this.view.customheader.headermenu.flxVerticalSeperator3.setVisibility(false);
            //               }		
            //               // if (this.approvalsAndRequestsEntitilementCheck()) this.view.flxApprovalAndRequest.setVisibility(true);
            //             }
        },
        /**method used to initialize advanced filters
         **/
        initializeAdvancedFilters: function(data) {
            this.offset = 0;
            this.lastRecord = '';
            var accounts = data;
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var isRetailUser = applicationManager.getConfigurationManager().getConfigurationValue('isRBUser') === "true";
            var isBusinessUser = applicationManager.getConfigurationManager().getConfigurationValue('isSMEUser') === "true";
			this.allAccountTypes = [];
			this.allCurrencies = [];
            this.accountTypes = [];
            this.accountStatus = [];
            this.currencies = [];
            this.selectedAccountStatus = [];
            this.availableCurrencies = [];
            this.availableAccountTypes = [];
            this.selectedAccountTypes = [];
            this.selectedCurrencies = [];
            this.CurrencyAccountSelected = "";
            this.lastFilterCriteria;
            var scopeObj = this;
            var closedAccounts = accounts.filter(function(account) {
                if (!kony.sdk.isNullOrUndefined(account.accountStatus)) return account.accountStatus === "CLOSED"
            });
            if (closedAccounts.length > 0) {
                this.accountStatus.push("ACTIVE");
                this.accountStatus.push("CLOSED");
                this.view.advancedFilters.flxAccountStatus.isVisible = true;
            } else this.view.advancedFilters.flxAccountStatus.isVisible = false;
            accounts.forEach(function(account) {
                if (!(scopeObj.accountTypes.includes(account.accountType))){
					scopeObj.accountTypes.push(account.accountType);
					scopeObj.allAccountTypes.push(account.accountType);
				}
                if (!(scopeObj.currencies.includes(account.currencyCode))){
					scopeObj.currencies.push(account.currencyCode);
					scopeObj.allCurrencies.push(account.currencyCode);
				}
            });
            this.setTypesOfAccountsSegmentData();
            this.setCurrenciesSegmentData();
            this.view.btnAdvancedFiltersDropdown.text = 't';
            this.view.lblAdvancedFiltersNumber.text = '0';
            this.view.lblAdvancedFiltersNumber.setVisibility(false);
            this.view.advancedFilters.lblIconAccountName.text = 'L';
            this.flxByAccountsAccessibility();
            this.view.advancedFilters.lblIconBalance.text = 'L';
            this.flxByBalanceAccessibilty();
            this.view.advancedFilters.flxDropDown.onClick = function() {
                scopeObj.view.advancedFilters.lblImgDropdown.text = scopeObj.view.advancedFilters.lblImgDropdown.text === 'O' ? 'P' : 'O';
                scopeObj.view.advancedFilters.flxSeperator.setVisibility(!scopeObj.view.advancedFilters.flxSeperator.isVisible);
                scopeObj.view.advancedFilters.flxSortBody.setVisibility(!scopeObj.view.advancedFilters.flxSortBody.isVisible);
                scopeObj.sortByFiltersAccessibility();
                scopeObj.view.advancedFilters.flxSeperatorSort.top = scopeObj.view.advancedFilters.flxSeperatorSort.top === "20dp" ? "0dp" : "20dp";
            };
            this.view.advancedFilters.flxDropdownImage.onClick = function() {
                scopeObj.view.advancedFilters.lblImage.text = scopeObj.view.advancedFilters.lblImage.text === 'O' ? 'P' : 'O';
                scopeObj.view.advancedFilters.flxSeperatorToaTitle.setVisibility(!scopeObj.view.advancedFilters.flxSeperatorToaTitle.isVisible);
                scopeObj.view.advancedFilters.flxToaBody.setVisibility(!scopeObj.view.advancedFilters.flxToaBody.isVisible);
                scopeObj.typesOfAccountsAccessibility();
                scopeObj.view.advancedFilters.flxSeperatorToa.top = scopeObj.view.advancedFilters.flxSeperatorToa.top === "20dp" ? "0dp" : "20dp";
            };
            this.view.advancedFilters.flxDropdownCurrency.onClick = function() {
                scopeObj.view.advancedFilters.lblImageCurrency.text = scopeObj.view.advancedFilters.lblImageCurrency.text === 'O' ? 'P' : 'O';
                scopeObj.view.advancedFilters.flxSeperatorCurrency.setVisibility(!scopeObj.view.advancedFilters.flxSeperatorCurrency.isVisible);
                scopeObj.view.advancedFilters.flxCurrencyBody.setVisibility(!scopeObj.view.advancedFilters.flxCurrencyBody.isVisible);
                scopeObj.currencyBodyAccessibility();
                scopeObj.view.advancedFilters.flxSeperatorCurrencyType.top = scopeObj.view.advancedFilters.flxSeperatorCurrencyType.top === "20dp" ? "0dp" : "20dp";
            };
            this.view.advancedFilters.flxByAccounts.onClick = function() {
                this.view.advancedFilters.lblIconAccountName.text = this.view.advancedFilters.lblIconAccountName.text === 'L' ? 'M' : 'M';
                this.flxByAccountsAccessibility();
                this.view.advancedFilters.lblIconBalance.text = this.view.advancedFilters.lblIconBalance.text === 'M' ? 'L' : 'L';
                this.flxByBalanceAccessibilty();
                this.view.advancedFilters.lblIconChoice3.text = this.view.advancedFilters.lblIconChoice3.text === 'M' ? 'L' : 'L';
                this.flxChoice3Accessibility();
            }.bind(this);
            this.view.advancedFilters.flxByBalance.onClick = function() {
                this.view.advancedFilters.lblIconBalance.text = this.view.advancedFilters.lblIconBalance.text === 'L' ? 'M' : 'M';
                this.flxByBalanceAccessibilty();
                this.view.advancedFilters.lblIconAccountName.text = this.view.advancedFilters.lblIconAccountName.text === 'M' ? 'L' : 'L';
                this.flxByAccountsAccessibility();
                this.view.advancedFilters.lblIconChoice3.text = this.view.advancedFilters.lblIconChoice3.text === 'M' ? 'L' : 'L';
                this.flxChoice3Accessibility();
            }.bind(this);
            this.view.advancedFilters.flxAccountsRightContainer.onClick = function() {
                this.resetAdvancedFilters();
            }.bind(this);
            this.view.advancedFilters.btnCancelFilter.onClick = function() {
                this.view.flxAdvancedFilters.setVisibility(false);
                isAdvanceFilterOpen = false;
                this.view.btnAdvancedFiltersDropdown.text = (this.view.btnAdvancedFiltersDropdown.text === 'g' ? 't' : 'g');
                this.view.btnAdvancedFiltersDropdown.skin = (this.view.btnAdvancedFiltersDropdown.text === 'g' ? "sknBtnOLBFontIconsnew" : "sknBtnOLBFontIcons");
                this.setLastFilterCriteria();
                this.setLastFilterCriteria();
                this.advancedFiltersAccessibility();
                this.view.btnAdvancedFiltersDropdown.setFocus(true);
                if (this.view.btnAdvancedFiltersDropdown.text === 't') {
                    if (this.view.lblAdvancedFiltersNumber.text !== '0') this.view.lblAdvancedFiltersNumber.setVisibility(true);
                    else this.view.lblAdvancedFiltersNumber.setVisibility(false);
                } else this.view.lblAdvancedFiltersNumber.setVisibility(false);
            }.bind(this);
            this.advancedFiltersAccessibility();
            this.view.advancedFilters.btnApplyFilter.onClick = function() {
                this.view.flxAdvancedFilters.setVisibility(false);
                isAdvanceFilterOpen = false;
                this.view.btnAdvancedFiltersDropdown.text = (this.view.btnAdvancedFiltersDropdown.text === 'g' ? 't' : 'g');
                this.view.btnAdvancedFiltersDropdown.skin = (this.view.btnAdvancedFiltersDropdown.text === 'g' ? "sknBtnOLBFontIconsnew" : "sknBtnOLBFontIcons");
                this.setLastFilterCriteria();
                this.isAdvancedFilterApplied = true;
                if (this.presenter.presentationController.customerdashboard === "true") {
					var sfaccounts = this.presenter.presentationController.customeraccounts;
				} else {
					var	sfaccounts = this.presenter.presentationController.accounts;
				}	
                data = this.getSearchAndFilterData(sfaccounts);
                this.view.accountList.segAccounts.setData(data);
                this.view.accountList.forceLayout();
                this.view.forceLayout();
                this.AdjustScreen();
            }.bind(this);
            this.view.advancedFilters.lblActivecheckbox.onTouchEnd = function() {
                this.view.advancedFilters.lblActivecheckbox.text = (this.view.advancedFilters.lblActivecheckbox.text === 'C') ? 'D' : 'C';
                if (this.view.advancedFilters.lblActivecheckbox.text === "C" && !(this.selectedAccountStatus.includes("active"))) this.selectedAccountStatus.push("active");
                var index = this.selectedAccountStatus.indexOf("active");
                if (this.view.advancedFilters.lblActivecheckbox.text === "D") {
                    if (index > -1) this.selectedAccountStatus.splice(index, 1);
                }
            }.bind(this);
            this.view.advancedFilters.lblClosedcheckbox.onTouchEnd = function() {
                this.view.advancedFilters.lblClosedcheckbox.text = (this.view.advancedFilters.lblClosedcheckbox.text === 'C') ? 'D' : 'C';
                if (this.view.advancedFilters.lblClosedcheckbox.text === "C" && !(this.selectedAccountStatus.includes("closed"))) this.selectedAccountStatus.push("closed");
                var index = this.selectedAccountStatus.indexOf("closed");
                if (this.view.advancedFilters.lblClosedcheckbox.text === "D") {
                    if (index > -1) this.selectedAccountStatus.splice(index, 1);
                }
            }.bind(this);
            this.advancedFiltersAccessibility()
            if (this.isSingleCustomerProfile) {
                this.view.advancedFilters.flxGroup.setVisibility(false);
                this.view.advancedFilters.flxSeperatorGroup.setVisibility(false);
                this.view.advancedFilters.flxRow2.setVisibility(false);
                this.view.advancedFilters.flxSortBody.height = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "80dp" : "40dp";
                this.view.advancedFilters.lblAccounts.text = kony.i18n.getLocalizedString("kony.mb.CardMng.AccountName");
                this.view.advancedFilters.lblBalance.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.Balance");
            } else {
                this.view.advancedFilters.lblIconAccountName.text = 'M';
                this.flxByAccountsAccessibility();
                this.view.advancedFilters.flxGroup.setVisibility(true);
                this.view.advancedFilters.flxSeperatorGroup.setVisibility(true);
                this.view.advancedFilters.flxRow2.setVisibility(true);
                this.view.advancedFilters.flxSortBody.height = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "120dp" : "90dp";
                this.view.advancedFilters.lblAccounts.text = kony.i18n.getLocalizedString("i18n.transfers.accountType");
                this.view.advancedFilters.lblBalance.text = kony.i18n.getLocalizedString("kony.mb.CardMng.AccountName");
                this.view.advancedFilters.lblChoice3.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.Balance");
                this.view.advancedFilters.flxGroupDropDown.onClick = function() {
                    scopeObj.view.advancedFilters.lblImgGroupDropdown.text = scopeObj.view.advancedFilters.lblImgGroupDropdown.text === 'O' ? 'P' : 'O';
                    scopeObj.view.advancedFilters.flxGroupSeperator.setVisibility(!scopeObj.view.advancedFilters.flxGroupSeperator.isVisible);
                    scopeObj.view.advancedFilters.flxGroupBody.setVisibility(!scopeObj.view.advancedFilters.flxGroupBody.isVisible);
                    scopeObj.groupByFilterAccessibility();
                    scopeObj.view.advancedFilters.flxSeperatorGroup.top = scopeObj.view.advancedFilters.flxSeperatorGroup.top === "20dp" ? "0dp" : "20dp";
                };
                this.view.advancedFilters.flxGroupByCompany.onClick = function() {
                    this.view.advancedFilters.lblIconGroupCompany.text = this.view.advancedFilters.lblIconGroupCompany.text === 'L' ? 'M' : 'M';
                    this.flxGroupByCompanyAccessibility();
                    this.view.advancedFilters.lblIconAccountType.text = this.view.advancedFilters.lblIconAccountType.text === 'M' ? 'L' : 'L';
                    this.flxGroupByAccountTypeAccessibility();
                    this.view.advancedFilters.flxRow2.setVisibility(true);
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) this.view.advancedFilters.flxSortBody.height = "120dp";
                    else this.view.advancedFilters.flxSortBody.height = "90dp";
                    this.view.advancedFilters.lblIconAccountName.text = 'M';
                    this.flxByAccountsAccessibility();
                    this.view.advancedFilters.lblIconBalance.text = 'L';
                    this.flxByBalanceAccessibilty();
                    this.view.advancedFilters.lblIconChoice3.text = 'L';
                    this.flxChoice3Accessibility();
                    this.view.advancedFilters.lblAccounts.text = kony.i18n.getLocalizedString("i18n.transfers.accountType");
                    this.view.advancedFilters.lblBalance.text = kony.i18n.getLocalizedString("kony.mb.CardMng.AccountName");
                    this.view.advancedFilters.lblChoice3.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.Balance");
                }.bind(this);
                this.view.advancedFilters.flxGroupByAccountType.onClick = function() {
                    this.view.advancedFilters.lblIconAccountType.text = this.view.advancedFilters.lblIconAccountType.text === 'L' ? 'M' : 'M';
                    this.flxGroupByAccountTypeAccessibility();
                    this.view.advancedFilters.lblIconGroupCompany.text = this.view.advancedFilters.lblIconGroupCompany.text === 'M' ? 'L' : 'L';
                    this.flxGroupByCompanyAccessibility();
                    this.view.advancedFilters.flxRow2.setVisibility(false);
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) this.view.advancedFilters.flxSortBody.height = "80dp";
                    else this.view.advancedFilters.flxSortBody.height = "40dp";
                    this.view.advancedFilters.lblIconAccountName.text = 'M';
                    this.flxByAccountsAccessibility();
                    this.view.advancedFilters.lblIconBalance.text = 'L';
                    this.view.advancedFilters.lblIconChoice3.text = 'L';
                    this.flxChoice3Accessibility();
                    this.view.advancedFilters.lblAccounts.text = kony.i18n.getLocalizedString("kony.mb.CardMng.AccountName");
                    this.view.advancedFilters.lblBalance.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.Balance");
                }.bind(this);
                this.view.advancedFilters.flxByChoice3.onClick = function() {
                    this.view.advancedFilters.lblIconChoice3.text = this.view.advancedFilters.lblIconChoice3.text === 'L' ? 'M' : 'M';
                    this.flxChoice3Accessibility();
                    this.view.advancedFilters.lblIconAccountName.text = this.view.advancedFilters.lblIconAccountName.text === 'M' ? 'L' : 'L';
                    this.flxByAccountsAccessibility();
                    this.view.advancedFilters.lblIconBalance.text = this.view.advancedFilters.lblIconBalance.text === 'M' ? 'L' : 'L';
                    this.flxByBalanceAccessibilty();
                }.bind(this);
                this.view.advancedFilters.lblIconGroupCompany.text = 'M';
                this.flxGroupByCompanyAccessibility();
                this.view.advancedFilters.lblIconChoice3.text = 'L';
                this.flxChoice3Accessibility();
                this.view.advancedFilters.lblIconAccountType.text = 'L';
                this.flxGroupByAccountTypeAccessibility();
            }
            this.advancedFiltersAccessibility();
            this.flxByAccountsAccessibility();
            this.flxByBalanceAccessibilty();
            this.flxChoice3Accessibility();
            this.flxGroupByCompanyAccessibility();
            this.flxGroupByAccountTypeAccessibility();
            this.flxGroupByAccountTypeAccessibility();
        },
        toggleAccountscheckBox1: function(context) {
            var selectedIndex = context.rowIndex;
            var data = this.view.advancedFilters.segTypeOfAccounts.data[0][1][selectedIndex];
            if (data.imgCheckBox.text === 'D') this.selectedAccountTypes.push(data.lblAccountType1.text);
            else {
                var index = this.selectedAccountTypes.indexOf(data.lblAccountType1.text);
                if (index > -1) this.selectedAccountTypes.splice(index, 1);
                var segData = this.view.advancedFilters.segTypeOfAccounts.data;
                var selectedFlag = true;
                for (i = 0; i < segData[0][1].length; i++) {
                    if (segData[0][1][i]["imgCheckBox"]["text"] === 'C') selectedFlag = false;
                    if (!kony.sdk.isNullOrUndefined(segData[0][1][i]["lblAccountType2"])) {
                        if (segData[0][1][i]["imgCheckBox2"]["text"] === 'C') selectedFlag = false;
                    }
                }
                if (!selectedFlag) segData[0][0]["imgCheckbox"]["text"] = 'D';
                this.view.advancedFilters.segTypeOfAccounts.setData(segData);
            }
            data.imgCheckBox.text = data.imgCheckBox.text === 'C' ? 'D' : 'C';
            data.flxCheckBox.accessibilityConfig = data.imgCheckBox.text === 'C' ? {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": true,
                    "aria-labelledby": "lblAccountType1"
                }
            } : {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": false,
                    "aria-labelledby": "lblAccountType1"
                }
            };
            this.view.advancedFilters.segTypeOfAccounts.setDataAt(data, selectedIndex, 0);
            if ((this.CurrencyAccountSelected === "" || this.CurrencyAccountSelected === "Accounts") && this.currencies.length > 1) {
                this.CurrencyAccountSelected = "Accounts";
                this.currenciesBasedOnAccounts();
            }
            if (this.selectedAccountTypes.length === 0) {
                this.CurrencyAccountSelected = "";
                this.availableCurrencies = [];
            }
            this.view.advancedFilters.segTypeOfAccounts.setActive(selectedIndex,0,"flxAccountTypeList.flxRow.flxType1.flxCheckBox");
        },
        toggleAccountscheckBox2: function(context) {
            var selectedIndex = context.rowIndex;
            var data = this.view.advancedFilters.segTypeOfAccounts.data[0][1][selectedIndex];
            if (data.imgCheckBox2.text === 'D') this.selectedAccountTypes.push(data.lblAccountType2.text);
            else {
                var index = this.selectedAccountTypes.indexOf(data.lblAccountType2.text);
                if (index > -1) this.selectedAccountTypes.splice(index, 1);
                var segData = this.view.advancedFilters.segTypeOfAccounts.data;
                var selectedFlag = true;
                for (i = 0; i < segData[0][1].length; i++) {
                    if (segData[0][1][i]["imgCheckBox"]["text"] === 'C') selectedFlag = false;
                    if (!kony.sdk.isNullOrUndefined(segData[0][1][i]["lblAccountType2"])) {
                        if (segData[0][1][i]["imgCheckBox2"]["text"] === 'C') selectedFlag = false;
                    }
                }
                if (!selectedFlag) segData[0][0]["imgCheckbox"]["text"] = 'D';
                this.view.advancedFilters.segTypeOfAccounts.setData(segData);
            }
            data.imgCheckBox2.text = data.imgCheckBox2.text === 'C' ? 'D' : 'C';
            data.flxCheckBox2.accessibilityConfig = data.imgCheckBox2.text === 'C' ? {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": true,
                    "aria-labelledby": "lblAccountType2"
                }
            } : {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": false,
                    "aria-labelledby": "lblAccountType2"
                }
            };
            this.view.advancedFilters.segTypeOfAccounts.setDataAt(data, selectedIndex, 0);
            if ((this.CurrencyAccountSelected === "" || this.CurrencyAccountSelected === "Accounts") && this.currencies.length > 1) {
                this.CurrencyAccountSelected = "Accounts";
                this.currenciesBasedOnAccounts();
            }
            if (this.selectedAccountTypes.length === 0) {
                this.CurrencyAccountSelected = "";
                this.availableCurrencies = [];
            }
            this.view.advancedFilters.segTypeOfAccounts.setActive(selectedIndex,0,"flxAccountTypeList.flxRow.flxType2.flxCheckBox2");
        },
        toggleCurrenciescheckBox1: function(context) {
            var selectedIndex = context.rowIndex;
            var data = this.view.advancedFilters.segCurrency.data[0][1][selectedIndex];
            if (data.imgCheckBox.text === 'D') this.selectedCurrencies.push(data.lblCurrencyType1.text);
            else {
                var index = this.selectedCurrencies.indexOf(data.lblCurrencyType1.text);
                if (index > -1) this.selectedCurrencies.splice(index, 1);
                var segData = this.view.advancedFilters.segCurrency.data;
                var selectedFlag = true;
                for (i = 0; i < segData[0][1].length; i++) {
                    if (segData[0][1][i]["imgCheckBox"]["text"] === 'C') selectedFlag = false;
                    if (!kony.sdk.isNullOrUndefined(segData[0][1][i]["lblCurrencyType2"])) {
                        if (segData[0][1][i]["imgCheckBox2"]["text"] === 'C') selectedFlag = false;
                    }
                    if (!kony.sdk.isNullOrUndefined(segData[0][1][i]["lblCurrencyType3"])) {
                        if (segData[0][1][i]["imgCheckBox3"]["text"] === 'C') selectedFlag = false;
                    }
                }
                if (!selectedFlag) segData[0][0]["imgCheckbox"]["text"] = 'D';
                this.view.advancedFilters.segCurrency.setData(segData);
            }
            data.imgCheckBox.text = data.imgCheckBox.text === 'C' ? 'D' : 'C';
            data.flxCheckBoxCurr.accessibilityConfig = data.imgCheckBox.text === 'C' ? {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": true,
                    "aria-labelledby": "lblCurrencyType1"
                }
            } : {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": false,
                    "aria-labelledby": "lblCurrencyType1"
                }
            };
            this.view.advancedFilters.segCurrency.setDataAt(data, selectedIndex, 0);
            if ((this.CurrencyAccountSelected === "" || this.CurrencyAccountSelected === "Currency") && this.accountTypes.length > 1) {
                this.CurrencyAccountSelected = "Currency";
                this.accountsBasedOnCurrencies();
            }
            if (this.selectedCurrencies.length === 0) {
                this.CurrencyAccountSelected = "";
                this.availableAccountTypes = [];
            }
            this.view.advancedFilters.segCurrency.setActive(selectedIndex,0,"flxCurrencyTypeList.flxRow.flxType1.flxCheckBoxCurr");
        },
        toggleCurrenciescheckBox2: function(context) {
            var selectedIndex = context.rowIndex;
            var data = this.view.advancedFilters.segCurrency.data[0][1][selectedIndex];
            if (data.imgCheckBox2.text === 'D') this.selectedCurrencies.push(data.lblCurrencyType2.text);
            else {
                var index = this.selectedCurrencies.indexOf(data.lblCurrencyType2.text);
                if (index > -1) this.selectedCurrencies.splice(index, 1);
                var segData = this.view.advancedFilters.segCurrency.data;
                var selectedFlag = true;
                for (i = 0; i < segData[0][1].length; i++) {
                    if (segData[0][1][i]["imgCheckBox"]["text"] === 'C') selectedFlag = false;
                    if (!kony.sdk.isNullOrUndefined(segData[0][1][i]["lblCurrencyType2"])) {
                        if (segData[0][1][i]["imgCheckBox2"]["text"] === 'C') selectedFlag = false;
                    }
                    if (!kony.sdk.isNullOrUndefined(segData[0][1][i]["lblCurrencyType3"])) {
                        if (segData[0][1][i]["imgCheckBox3"]["text"] === 'C') selectedFlag = false;
                    }
                }
                if (!selectedFlag) segData[0][0]["imgCheckbox"]["text"] = 'D';
                this.view.advancedFilters.segCurrency.setData(segData);
            }
            data.imgCheckBox2.text = data.imgCheckBox2.text === 'C' ? 'D' : 'C';
            data.flxCheckBoxCurr2.accessibilityConfig = data.imgCheckBox2.text === 'C' ? {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": true,
                    "aria-labelledby": "lblCurrencyType2"
                }
            } : {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": false,
                    "aria-labelledby": "lblCurrencyType2"
                }
            };
            this.view.advancedFilters.segCurrency.setDataAt(data, selectedIndex, 0);
            if ((this.CurrencyAccountSelected === "" || this.CurrencyAccountSelected === "Currency") && this.accountTypes.length > 1) {
                this.CurrencyAccountSelected = "Currency";
                this.accountsBasedOnCurrencies();
            }
            if (this.selectedCurrencies.length === 0) {
                this.CurrencyAccountSelected = "";
                this.availableAccountTypes = [];
            }
            this.view.advancedFilters.segCurrency.setActive(selectedIndex,0,"flxCurrencyTypeList.flxRow.flxType2.flxCheckBoxCurr2");
        },
        toggleCurrenciescheckBox3: function(context) {
            var selectedIndex = context.rowIndex;
            var data = this.view.advancedFilters.segCurrency.data[0][1][selectedIndex];
            if (data.imgCheckBox3.text === 'D') this.selectedCurrencies.push(data.lblCurrencyType3.text);
            else {
                var index = this.selectedCurrencies.indexOf(data.lblCurrencyType3.text);
                if (index > -1) this.selectedCurrencies.splice(index, 1);
                var segData = this.view.advancedFilters.segCurrency.data;
                var selectedFlag = true;
                for (i = 0; i < segData[0][1].length; i++) {
                    if (segData[0][1][i]["imgCheckBox"]["text"] === 'C') selectedFlag = false;
                    if (!kony.sdk.isNullOrUndefined(segData[0][1][i]["lblCurrencyType2"])) {
                        if (segData[0][1][i]["imgCheckBox2"]["text"] === 'C') selectedFlag = false;
                    }
                    if (!kony.sdk.isNullOrUndefined(segData[0][1][i]["lblCurrencyType3"])) {
                        if (segData[0][1][i]["imgCheckBox3"]["text"] === 'C') selectedFlag = false;
                    }
                }
                if (!selectedFlag) segData[0][0]["imgCheckbox"]["text"] = 'D';
                this.view.advancedFilters.segCurrency.setData(segData);
            }
            data.imgCheckBox3.text = data.imgCheckBox3.text === 'C' ? 'D' : 'C';
            data.flxCheckBoxCurr3.accessibilityConfig = data.imgCheckBox3.text === 'C' ? {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": true,
                    "aria-labelledby": "lblCurrencyType3"
                }
            } : {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": false,
                    "aria-labelledby": "lblCurrencyType3"
                }
            };
            this.view.advancedFilters.segCurrency.setDataAt(data, selectedIndex, 0);
            if ((this.CurrencyAccountSelected === "" || this.CurrencyAccountSelected === "Currency") && this.accountTypes.length > 1) {
                this.CurrencyAccountSelected = "Currency";
                this.accountsBasedOnCurrencies();
            }
            if (this.selectedCurrencies.length === 0) {
                this.CurrencyAccountSelected = "";
                this.availableAccountTypes = [];
            }
            this.view.advancedFilters.segCurrency.setActive(selectedIndex,0,"flxCurrencyTypeList.flxRow.flxType3.flxCheckBoxCurr3");
        },
        toggleTypeOfAccountsCheckbox: function(context) {
            var selectedIndex = context.rowIndex;
            var data = this.view.advancedFilters.segTypeOfAccounts.data[0][1][selectedIndex];
            if (data.imgCheckBox.text === 'D') this.selectedAccountTypes.push(data.lblAccountType.text);
            else {
                var index = this.selectedAccountTypes.indexOf(data.lblAccountType.text);
                if (index > -1) this.selectedAccountTypes.splice(index, 1);
                var segData = this.view.advancedFilters.segTypeOfAccounts.data;
                var selectedFlag = true;
                for (i = 0; i < segData[0][1].length; i++) {
                    if (segData[0][1][i]["imgCheckBox"]["text"] === 'C') selectedFlag = false;
                }
                if (!selectedFlag) segData[0][0]["imgCheckbox"]["text"] = 'D';
                this.view.advancedFilters.segTypeOfAccounts.setData(segData);
            }
            data.imgCheckBox.text = data.imgCheckBox.text === 'C' ? 'D' : 'C';
            data.flxCheckBoxMobile.accessibilityConfig = data.imgCheckBox.text === 'C' ? {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": true,
                    "aria-labelledby": "lblAccountType"
                }
            } : {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": false,
                    "aria-labelledby": "lblAccountType"
                }
            };
            this.view.advancedFilters.segTypeOfAccounts.setDataAt(data, selectedIndex, 0);
            data.flxCheckBoxMobile.accessibilityConfig = data.imgCheckBox.text === 'C' ? {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": true,
                    "aria-labelledby": "lblAccountType"
                }
            } : {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": false,
                    "aria-labelledby": "lblAccountType"
                }
            };
            if ((this.CurrencyAccountSelected === "" || this.CurrencyAccountSelected === "Accounts") && this.currencies.length > 1) {
                this.CurrencyAccountSelected = "Accounts";
                this.currenciesBasedOnAccounts();
            }
            if (this.selectedAccountTypes.length === 0) {
                this.CurrencyAccountSelected = "";
                this.availableCurrencies = [];
            }
            this.view.advancedFilters.segTypeOfAccounts.setActive(selectedIndex, 0 , "flxTypeOfAccountsListMobile.flxRow.flxCheckBoxMobile");
        },
        toggleCurrenciesCheckbox: function(context) {
            var selectedIndex = context.rowIndex;
            var data = this.view.advancedFilters.segCurrency.data[0][1][selectedIndex];
            if (data.imgCheckBox.text === 'D') this.selectedCurrencies.push(data.lblAccountType.text);
            else {
                var index = this.selectedCurrencies.indexOf(data.lblAccountType.text);
                if (index > -1) this.selectedCurrencies.splice(index, 1);
                var segData = this.view.advancedFilters.segCurrency.data;
                var selectedFlag = true;
                for (i = 0; i < segData[0][1].length; i++) {
                    if (segData[0][1][i]["imgCheckBox"]["text"] === 'C') selectedFlag = false;
                }
                if (!selectedFlag) segData[0][0]["imgCheckbox"]["text"] = 'D';
                this.view.advancedFilters.segCurrency.setData(segData);
            }
            data.imgCheckBox.text = data.imgCheckBox.text === 'C' ? 'D' : 'C';
            data.flxCheckBoxMobile.accessibilityConfig = data.imgCheckBox.text === 'C' ? {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": true,
                    "aria-labelledby": "lblAccountType"
                }
            } : {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": false,
                    "aria-labelledby": "lblAccountType"
                }
            };
            this.view.advancedFilters.segCurrency.setDataAt(data, selectedIndex, 0);
            if ((this.CurrencyAccountSelected === "" || this.CurrencyAccountSelected === "Currency") && this.accountTypes.length > 1) {
                this.CurrencyAccountSelected = "Currency";
                this.accountsBasedOnCurrencies();
            }
            if (this.selectedCurrencies.length === 0) {
                this.CurrencyAccountSelected = "";
                this.availableAccountTypes = [];
            }
            this.view.advancedFilters.segCurrency.setActive(selectedIndex, 0 , "flxTypeOfAccountsListMobile.flxRow.flxCheckBoxMobile");
        },
        
        getAdvancedFilterData: function(data, accounts) {
			var currencies = data.currencies;
			var accountTypes = data.accountTypes;
			var accountStatuses = data.accountStatus;
            var searchQuery = this.view.txtSearch.text.trim();
			var accountTypesPriority = applicationManager.getTypeManager().getAccountTypesByPriority();
		//	accounts.forEach(function(account) {
				if (currencies.length !== 0) accounts = accounts.filter(function(item) {
					if (data.currencies.includes(item.currency)) return true;
					else return false;
				});
				if (accountTypes.length !== 0) accounts = accounts.filter(function(item) {
					if (data.accountTypes.includes(item.accountType)) return true;
					else return false;
				});
				if (accountStatuses.length !== 0) {
					if (accountStatuses.includes("active")) {
						accountStatuses.push("closure_pending");
					}
					accounts = accounts.filter(function(item) {
						if (data.accountStatus.includes(item.accountStatus.toLowerCase())) return true;
						else return false;
					});
				}
				if (data.sortBy === "accountName") accounts = accounts.sort(function(a, b) {
					if (a.accountName < b.accountName) return -1;
					if (a.accountName > b.accountName) return 1;
					return 0;
				});
				else if (data.sortBy === "accountType") accounts = accounts.sort(function(a, b) {
					if (accountTypesPriority.indexOf(a.accountType) < accountTypesPriority.indexOf(b.accountType)) return -1;
					if (accountTypesPriority.indexOf(a.accountType) > accountTypesPriority.indexOf(b.accountType)) return 1;
					return 0;
				});
				else if (data.sortBy === "balance") accounts = accounts.sort(function(a, b) {
					return a.availableBalance - b.availableBalance;
				});
				else if (data.sortBy === "currentBalance") {
					accounts = accounts.sort(function(a, b) {
						let aKey = "availableBalance",
							bKey = "availableBalance";
						if (a.accountType == "Checking" || a.accountType == "Savings") {
							aKey = "currentBalance";
						}
						if (b.accountType == "Checking" || b.accountType == "Savings") {
							bKey = "currentBalance";
						}
						return a[aKey] - b[bKey];
					});
				}
			//});
		        if (!kony.sdk.isNullOrUndefined(searchQuery) && searchQuery !== "") {
                for (var i = 0; i < accounts.length; i++) {
                    accounts = accounts.filter(function(record) {
                        return (record["accountName"] && record["accountName"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) || (record["accountType"] && record["accountType"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) || (record["accountID"] && record["accountID"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) || (record["MembershipName"] && record["MembershipName"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1);
                    });                 
                }
            }
			return accounts;
    },
      
        applyAdvancedFilterSelection: function(accounts) {
            var filterNumber = 0;
            var groupBy = "";
            var data = {};
            var responseData;
            var dualConfiguration = this.getDualBalanceConfiguration();
            if (this.view.advancedFilters.lblIconAccountName.text === "M" && this.view.advancedFilters.lblAccounts.text === kony.i18n.getLocalizedString("i18n.transfers.accountType")) {
                //         this.sortByAccountType();
                data.sortBy = "accountType";
                this.flxByAccountsAccessibility();
            } else if ((this.view.advancedFilters.lblIconAccountName.text === "M" && this.view.advancedFilters.lblAccounts.text === kony.i18n.getLocalizedString("kony.mb.CardMng.AccountName")) || (this.view.advancedFilters.lblIconBalance.text === "M" && this.view.advancedFilters.lblBalance.text === kony.i18n.getLocalizedString("kony.mb.CardMng.AccountName"))) {
                //         this.sortByAccountName();
                data.sortBy = "accountName";
                this.flxByAccountsAccessibility();
                this.flxByBalanceAccessibilty();
            } else if ((this.view.advancedFilters.lblIconChoice3.text === "M" && this.view.advancedFilters.lblChoice3.text === kony.i18n.getLocalizedString("i18n.AccountsDetails.Balance")) || (this.view.advancedFilters.lblIconBalance.text === "M" && this.view.advancedFilters.lblBalance.text === kony.i18n.getLocalizedString("i18n.AccountsDetails.Balance"))) {
                //         this.sortByBalance();
                if (!dualConfiguration.isAvailableBalanceToBeDisplayed && dualConfiguration.isCurrentBalanceToBeDisplayed) {
                    data.sortBy = "currentBalance";
                } else {
                    data.sortBy = "balance";
                }
                this.flxByBalanceAccessibilty();
                this.flxChoice3Accessibility();
            } else data.sortBy = "";
            //newly addded code
            data.accountStatus = JSON.parse(JSON.stringify(this.selectedAccountStatus));
            data.accountTypes = JSON.parse(JSON.stringify(this.selectedAccountTypes));
            data.currencies = JSON.parse(JSON.stringify(this.selectedCurrencies));
            if (this.selectedAccountTypes.length > 0) filterNumber = filterNumber + 1;
            if (this.selectedAccountStatus.length > 0) filterNumber = filterNumber + 1;
            if (this.selectedCurrencies.length > 0) filterNumber = filterNumber + 1;
            if (this.isSingleCustomerProfile && data.sortBy !== "") filterNumber = filterNumber + 1;
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
            var sortedaccounts = this.getAdvancedFilterData(data, accounts);
			var companyGroupedAccounts = this.getDataWithSections(sortedaccounts);
            var accountTypeGroupedAccounts = this.getDataWithAccountTypeSections(sortedaccounts);
            if (this.view.advancedFilters.lblIconGroupCompany.text === "M") {
                responseData = accountsModule.presentationController.getAdvancedFilterResults(data, companyGroupedAccounts);
                groupBy = "companyBanking";
                this.flxGroupByCompanyAccessibility();
            } else if (this.view.advancedFilters.lblIconAccountType.text === "M") {
                responseData = accountsModule.presentationController.getAdvancedFilterResults(data, accountTypeGroupedAccounts);
                groupBy = "accountType";
                this.flxGroupByAccountTypeAccessibility();
            } else {
                responseData = accountsModule.presentationController.getAdvancedFilterResults(data, accountTypeGroupedAccounts);
            }
            if (!this.isSingleCustomerProfile) {
                if (!(groupBy === "companyBanking" && data.sortBy === "accountType")) {
                    if (groupBy !== "") filterNumber = filterNumber + 1;
                    if (data.sortBy !== "") filterNumber = filterNumber + 1;
                }
            }
            if (filterNumber !== 0) {
                this.view.lblAdvancedFiltersNumber.text = filterNumber.toString();
                this.view.lblAdvancedFiltersNumber.setVisibility(true);
            } else {
                this.view.lblAdvancedFiltersNumber.text = '0';
                this.view.lblAdvancedFiltersNumber.setVisibility(false);
            }
            data.groupBy = groupBy;
            this.lastFilterCriteria = CommonUtilities.cloneJSON(data);
            return responseData;
            this.flxByAccountsAccessibility();
            this.flxByBalanceAccessibilty();
            this.flxChoice3Accessibility();
            this.flxGroupByCompanyAccessibility();
            this.flxGroupByAccountTypeAccessibility();
        },
        setLastFilterCriteria: function() {
            if (this.lastFilterCriteria) {
                if (this.isSingleCustomerProfile) this.lastFilterCriteria.groupBy = "accountType";
                if (this.lastFilterCriteria.groupBy === "companyBanking") {
                    this.view.advancedFilters.lblIconGroupCompany.text = 'M';
                    this.flxGroupByCompanyAccessibility();
                    this.view.advancedFilters.lblIconAccountType.text = 'L';
                    this.flxGroupByAccountTypeAccessibility();
                    if (this.lastFilterCriteria.sortBy === "accountType") {
                        this.view.advancedFilters.lblIconAccountName.text = 'M';
                        this.flxByAccountsAccessibility();
                        this.view.advancedFilters.lblIconBalance.text = 'L';
                        this.flxByBalanceAccessibilty();
                        this.view.advancedFilters.lblIconChoice3.text = 'L';
                        this.flxChoice3Accessibility();
                    } else if (this.lastFilterCriteria.sortBy === "accountName") {
                        this.view.advancedFilters.lblIconAccountName.text = 'L';
                        this.flxByAccountsAccessibility();
                        this.view.advancedFilters.lblIconBalance.text = 'M';
                        this.flxByBalanceAccessibilty();
                        this.view.advancedFilters.lblIconChoice3.text = 'L';
                        this.flxChoice3Accessibility();
                    } else if (this.lastFilterCriteria.sortBy === "balance") {
                        this.view.advancedFilters.lblIconAccountName.text = 'L';
                        this.flxByAccountsAccessibility();
                        this.view.advancedFilters.lblIconBalance.text = 'L';
                        this.flxByBalanceAccessibilty();
                        this.view.advancedFilters.lblIconChoice3.text = 'M';
                        this.flxChoice3Accessibility();
                    }
                } else if (this.lastFilterCriteria.groupBy === "accountType") {
                    this.view.advancedFilters.lblIconAccountType.text = 'M';
                    this.flxGroupByAccountTypeAccessibility();
                    this.view.advancedFilters.lblIconGroupCompany.text = 'L';
                    this.flxGroupByCompanyAccessibility();
                    if (this.lastFilterCriteria.sortBy === "accountName") {
                        this.view.advancedFilters.lblIconAccountName.text = 'M';
                        this.flxByAccountsAccessibility();
                        this.view.advancedFilters.lblIconBalance.text = 'L';
                        this.flxByBalanceAccessibilty();
                    } else if (this.lastFilterCriteria.sortBy === "balance") {
                        this.view.advancedFilters.lblIconAccountName.text = 'L';
                        this.flxByAccountsAccessibility();
                        this.view.advancedFilters.lblIconBalance.text = 'M';
                        this.flxByBalanceAccessibilty();
                    }
                }
                if (this.accountTypes.length > 1 && this.lastFilterCriteria.accountTypes) {
                    var accountTypes = this.lastFilterCriteria.accountTypes;
                    var segData = this.view.advancedFilters.segTypeOfAccounts.data;
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                        segData[0][1].forEach(function(rowItem) {
                            rowItem.imgCheckBox.text = accountTypes.includes(rowItem.lblAccountType.text) ? 'C' : 'D';
                        });
                    } else {
                        segData[0][1].forEach(function(rowItem) {
                            rowItem.imgCheckBox.text = accountTypes.includes(rowItem.lblAccountType1.text) ? 'C' : 'D';
                            if (!kony.sdk.isNullOrUndefined(rowItem.lblAccountType2)) rowItem.imgCheckBox2.text = accountTypes.includes(rowItem.lblAccountType2.text) ? 'C' : 'D';
                        });
                        //newly added code
                        var indicator1 = false;
                        for (i = 0; i < segData[0][1].length; i++) {
                            if (segData[0][1][i]["imgCheckBox"]["text"] === 'C' && !kony.sdk.isNullOrUndefined(segData[0][1][i]["lblAccountType2"]) && segData[0][1][i]["imgCheckBox2"]["text"] == 'C') indicator1 = true;
                            else indicator1 = false;
                        }
                        segData[0][0]["imgCheckbox"]["text"] = (indicator == true) ? 'C' : 'D';
                    }
                    this.view.advancedFilters.segTypeOfAccounts.setData(segData);
                }
                if (this.currencies.length > 1 && this.lastFilterCriteria.currencies) {
                    var currencies = this.lastFilterCriteria.currencies;
                    segData = this.view.advancedFilters.segCurrency.data;
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                        segData[0][1].forEach(function(rowItem) {
                            rowItem.imgCheckBox.text = currencies.includes(rowItem.lblAccountType.text) ? 'C' : 'D';
                        });
                    } else {
                        segData[0][1].forEach(function(rowItem) {
                            rowItem.imgCheckBox.text = currencies.includes(rowItem.lblCurrencyType1.text) ? 'C' : 'D';
                            if (!kony.sdk.isNullOrUndefined(rowItem.lblCurrencyType2)) rowItem.imgCheckBox2.text = currencies.includes(rowItem.lblCurrencyType2.text) ? 'C' : 'D';
                            if (!kony.sdk.isNullOrUndefined(rowItem.lblCurrencyType3)) rowItem.imgCheckBox3.text = currencies.includes(rowItem.lblCurrencyType3.text) ? 'C' : 'D';
                        });
                    }
                    this.view.advancedFilters.segCurrency.setData(segData);
                }
                if (this.accountStatus.length > 0) {
                    if (!kony.sdk.isNullOrUndefined(this.lastFilterCriteria.accountStatus)) {
                        var accountStatus = this.lastFilterCriteria.accountStatus;
                        this.view.advancedFilters.lblActivecheckbox.text = (accountStatus.includes("ACTIVE")|| accountStatus.includes("active")) ? 'C' : 'D';
                        this.view.advancedFilters.lblClosedcheckbox.text = (accountStatus.includes("CLOSED")|| accountStatus.includes("closed")) ? 'C' : 'D';
                    } else {
                        this.view.advancedFilters.lblActivecheckbox.text = 'D';
                        this.view.advancedFilters.lblClosedcheckbox.text = 'D';
                    }
                }
            } else this.resetAdvancedFilters();
            this.flxByAccountsAccessibility();
            this.flxByBalanceAccessibilty();
            this.flxChoice3Accessibility();
            this.flxGroupByCompanyAccessibility();
            this.flxGroupByAccountTypeAccessibility();
        },
        setTypesOfAccountsSegmentData: function() {
            var segData = [];
            var row;
            var rowData = [];
            var data = [];
            this.view.advancedFilters.segTypeOfAccounts.widgetDataMap = {
                flxAccountTypeList: "flxAccountTypeList",
                flxRow: "flxRow",
                flxType1: "flxType1",
                flxType2: "flxType2",
                flxTypeOfAccountsHeader: "flxTypeOfAccountsHeader",
                flxCheckBox: "flxCheckBox",
                flxCheckBox2: "flxCheckBox2",
                imgCheckBox: "imgCheckBox",
                imgCheckBox2: "imgCheckBox2",
                imgCheckbox: "imgCheckbox",
                lblAccountType1: "lblAccountType1",
                lblAccountType2: "lblAccountType2",
                lblSelectAll: "lblSelectAll",
                lblAccountType: "lblAccountType",
                flxAccountTypeListMobile: "flxAccountTypeListMobile",
                flxCheckBoxMobile: "flxCheckBoxMobile",
                flxCheckBoxCurr: "flxCheckBoxCurr",
                flxCheckBoxCurr2: "flxCheckBoxCurr2"
                
            };
            if (this.accountTypes.length > 1) {
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    segData.push({
                        "imgCheckbox": {
                            text: 'D',
                            "accessibilityConfig": {
                                "a11yHidden": true,
                            }
                        },
                            "lblSelectAll": {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.SelectAll"),
                                "accessibilityConfig": {
                                    a11yARIA: {
                                        tabindex: -1
                            },
                                }
                            },
                            "template": "flxTypeOfAccountsHeader",
                            "flxCheckBox": {
                                "onClick": this.selectAllTypesOfAccountsMobile.bind(this),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "tabindex": 0,
                                        "role": "checkbox",
                                        "aria-checked": false,
                                        "aria-labelledby":"lblSelectAll"
                                    }
                                }
                            }
                        
                    });
                    for (i = 0; i < this.accountTypes.length; i++) {
                        row = {
                            "lblAccountType": {
                                "text": this.accountTypes[i],
                                "skin": "lblSSP42424213px"
                            },
                            "imgCheckBox": {
                                text: 'D',
                                skin: "sknLblFontTypeIcon003E7520px",
                                "accessibilityConfig": {
                                    "a11yHidden": true,
                                }
                            },
                            "flxCheckBoxMobile": {
                                onClick: function(eventobject, context) {
                                    this.toggleTypeOfAccountsCheckbox(context);
                                }.bind(this),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "role": "checkbox",
                                        "aria-checked": false,
                                        "aria-labelledby":"lblAccountType"
                                    }
                                }
                            },
                            "template": "flxTypeOfAccountsListMobile"
                        };
                        rowData.push(row);
                    }
                    segData.push(rowData);
                    data.push(segData);
                } else {
                    segData.push({
                        "imgCheckbox": {
                            text: 'D',
                            "accessibilityConfig": {
                                    "a11yHidden": true
                            }
                        },
                            "lblSelectAll": {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.SelectAll"),
                                "accessibilityConfig": {
                                    a11yARIA: {
                                        tabindex: -1
                            },
                                }
                            },
                            "template": "flxTypeOfAccountsHeader",
                            "flxCheckBox": {
                                "onClick": this.selectAllTypesOfAccounts.bind(this),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "tabindex": 0,
                                        "role": "checkbox",
                                        "aria-checked": false,
                                        "aria-labelledby":"lblSelectAll"
                                    }
                                }
                            }
                        
                    });
                    for (i = 0; i < this.accountTypes.length; i = i + 2) {
                        if (this.accountTypes[i + 1]) {
                            row = {
                                "lblAccountType1": {
                                    "text": this.accountTypes[i],
                                    "skin": "lblSSP42424213px"
                                },
                                "lblAccountType2": {
                                    "text": this.accountTypes[i + 1],
                                    "skin": "lblSSP42424213px"
                                },
                                "imgCheckBox": {
                                    text: 'D',
                                    skin: "sknLblFontTypeIcon003E7520px",
                                    "accessibilityConfig": {
                                    "a11yHidden": true,
                                }
                                },
                                "flxCheckBox":{
                                    onClick: function(eventobject, context) {
                                        this.toggleAccountscheckBox1(context);
                                    }.bind(this),
                                    accessiblityConfig: {
                                        "a11yARIA": {
                                            "role": "checkbox",
                                            "aria-checked": false,
                                            "aria-labelledby": "lblAccountType1"
                                        }

                                    }
                                },
                                "imgCheckBox2": {
                                    text: 'D',
                                    skin: "sknLblFontTypeIcon003E7520px", 
                                    accessiblityConfig: a11yHidden = true,
                                },
                                "flxCheckBox2":{
                                    onClick: function(eventobject, context) {
                                        this.toggleAccountscheckBox2(context);
                                    }.bind(this),
                                    accessiblityConfig: {
                                        "a11yARIA": {
                                        "role" : "checkbox",
                                        "aria-checked": false,
                                        "aria-labelledby":"lblAccountType2"
                                        }
                                    }
                                },
                                "template": "flxAccountTypeList"
                            };
                        } else {
                            row = {
                                "lblAccountType1": {
                                    "text": this.accountTypes[i],
                                    "skin": "lblSSP42424213px"
                                },
                                "imgCheckBox": {
                                    text: 'D',
                                    skin: "sknLblFontTypeIcon003E7520px",
                                    accessiblityConfig: a11yHidden = true,
                                },
                                "flxCheckBox":{
                                    onClick: function(eventobject, context) {
                                        this.toggleAccountscheckBox1(context);
                                    }.bind(this),
                                    accessiblityConfig: {
                                        "a11yARIA": {
                                        "role" : "checkbox",
                                        "aria-checked": false,
                                        "aria-labelledby":"lblAccountType1"
                                        }
                                    }
                                },
                                "flxType2": {
                                    "isVisible": false
                                },
                                "template": "flxAccountTypeList"
                            };
                        }
                        rowData.push(row);
                    }
                    segData.push(rowData);
                    data.push(segData);
                }
                this.view.advancedFilters.segTypeOfAccounts.setData(data);
                this.view.advancedFilters.flxTypeOfAccounts.setVisibility(true);
                this.view.advancedFilters.flxSeperatorToa.setVisibility(true);
            } else {
                this.view.advancedFilters.flxTypeOfAccounts.setVisibility(false);
                this.view.advancedFilters.flxSeperatorToa.setVisibility(false);
            }
        },
        setCurrenciesSegmentData: function() {
            var segData = [];
            var rowData = [];
            var data = [];
            this.view.advancedFilters.segCurrency.widgetDataMap = {
                flxAccountTypeList: "flxAccountTypeList",
                flxRow: "flxRow",
                flxType1: "flxType1",
                flxType2: "flxType2",
                flxType3: "flxType3",
                flxTypeOfAccountsHeader: "flxTypeOfAccountsHeader",
                flxCheckBox: "flxCheckBox",
                imgCheckBox: "imgCheckBox",
                imgCheckBox2: "imgCheckBox2",
                imgCheckBox3: "imgCheckBox3",
                imgCheckbox: "imgCheckbox",
                lblCurrencyType1: "lblCurrencyType1",
                lblCurrencyType2: "lblCurrencyType2",
                lblCurrencyType3: "lblCurrencyType3",
                lblSelectAll: "lblSelectAll",
                lblAccountType: "lblAccountType",
                flxAccountTypeListMobile: "flxAccountTypeListMobile",
                flxCheckBoxCurr: "flxCheckBoxCurr",
                flxCheckBoxCurr2: "flxCheckBoxCurr2",
                flxCheckBoxMobile:"flxCheckBoxMobile"
            };
            if (this.currencies.length > 1) {
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    segData.push({
                        "imgCheckbox": {
                            text: 'D',        
                            "accessibilityConfig": {
                                    "a11yHidden": true,
                            }
                        },
                            "lblSelectAll": {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.SelectAll"),
                                "accessibilityConfig": {
                                    a11yARIA: {
                                        tabindex: -1
                            },
                                }
                            },
                            "template": "flxTypeOfAccountsHeader",
                            "flxCheckBox": {
                                onClick: this.selectAllCurrenciesMobile.bind(this),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "role": "checkbox",
                                        "aria-checked": false,
                                        "aria-labelledby":"lblSelectAll"
                                    }
                                }
                            }
                    });
                    for (i = 0; i < this.currencies.length; i++) {
                        row = {
                            "lblAccountType": {
                                "text": this.currencies[i],
                                "skin": "lblSSP42424213px"
                            },
                            "imgCheckBox": {
                                text: 'D',
                                skin: "sknLblFontTypeIcon003E7520px",
                                "accessibilityConfig": {
                                    "a11yHidden": true,
                                }
                            },
                            "flxCheckBoxMobile": {
                                onClick: function(eventobject, context) {
                                    this.toggleCurrenciesCheckbox(context);
                                }.bind(this),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "role": "checkbox",
                                        "aria-checked": false,
                                        "aria-labelledby":"lblAccountType"
                                    }
                                }
                            },
                            "template": "flxTypeOfAccountsListMobile"
                        };
                        rowData.push(row);
                    }
                    segData.push(rowData);
                    data.push(segData);
                } else {
                    if (this.currencies.length > 1) {
                        segData.push({
                            "imgCheckbox": {
                                text: 'D',
                                "accessibilityConfig": {
                                    "a11yHidden": true,
                                }
                            },
                                "lblSelectAll": {
                                    text: kony.i18n.getLocalizedString("i18n.TradeFinance.SelectAll"),
                                    "accessibilityConfig": {
                                    a11yARIA: {
                                        tabindex: -1
                                },
                                }
                                },
                                "template": "flxTypeOfAccountsHeader",
                                "flxCheckBox": { 
                                    onClick: this.selectAllCurrencies.bind(this),
                                    "accessibilityConfig": {
                                        "a11yARIA": {
                                            "role": "button",
                                            "aria-checked": false,
                                            "aria-labelledby":"lblSelectAll"
                                        }
                                    }
                                }
                            
                        });
                        for (i = 0; i < this.currencies.length; i = i + 3) {
                            if (this.currencies[i + 2]) {
                                row = {
                                    "lblCurrencyType1": {
                                        "text": this.currencies[i],
                                        "skin": "lblSSP42424213px"
                                    },
                                    "lblCurrencyType2": {
                                        text: this.currencies[i + 1],
                                        "skin": "lblSSP42424213px"
                                    },
                                    "lblCurrencyType3": {
                                        text: this.currencies[i + 2],
                                        "skin": "lblSSP42424213px"
                                    },
                                    "imgCheckBox": {
                                        text: 'D',
                                        skin: "sknLblFontTypeIcon003E7520px",
                                        "accessibilityConfig": {
                                    "a11yHidden": true,
                                }
                                    },
                                    "flxCheckBoxCurr": { 
                                        "accessibilityConfig": {
                                            "a11yARIA": {
                                                "role": "button",
                                                "aria-checked": false,
                                                "aria-labelledby":"lblCurrencyType1"
                                            }
                                        }
                                    },
                                    "onCurrency1Pressed":  function(context) {
                                        this.toggleCurrenciescheckBox1(context);
                                    }.bind(this),
                                    "imgCheckBox2": {
                                        text: 'D',
                                        skin: "sknLblFontTypeIcon003E7520px",
                                        accessiblityConfig: a11yHidden = true,
                                    },
                                    "flxCheckBoxCurr2": { 
                                        "accessibilityConfig": {
                                            "a11yARIA": {
                                                "role": "button",
                                                "aria-checked": false,
                                                "aria-labelledby":"lblCurrencyType2"
                                            }
                                        }
                                    },
                                    "onCurrency2Pressed":  function(context) {
                                        this.toggleCurrenciescheckBox2(context);
                                    }.bind(this),
                                    "imgCheckBox3": {
                                        text: 'D',
                                        skin: "sknLblFontTypeIcon003E7520px",
                                        accessiblityConfig: a11yHidden = true,
                                    },
                                    "flxCheckBoxCurr3": { 
                                        "accessibilityConfig": {
                                            "a11yARIA": {
                                                "role": "button",
                                                "aria-checked": false,
                                                "aria-labelledby":"lblCurrencyType3"
                                            }
                                        }
                                    },
                                    "onCurrency3Pressed":  function(context) {
                                        this.toggleCurrenciescheckBox3(context);
                                    }.bind(this),
                                    "template": "flxCurrencyTypeList"
                                };
                            } else if (this.currencies[i + 1]) {
                                row = {
                                    "lblCurrencyType1": {
                                        "text": this.currencies[i],
                                        "skin": "lblSSP42424213px"
                                    },
                                    "lblCurrencyType2": {
                                        text: this.currencies[i + 1],
                                        "skin": "lblSSP42424213px"
                                    },
                                    "imgCheckBox": {
                                        text: 'D',
                                        skin: "sknLblFontTypeIcon003E7520px",
                                        "accessibilityConfig": {
                                    "a11yHidden": true,
                                }
                                    },
                                    "flxCheckBoxCurr": { 
                                        "accessibilityConfig": {
                                            "a11yARIA": {
                                                "role": "button",
                                                "aria-checked": false,
                                                "aria-labelledby":"lblCurrencyType1"
                                            }
                                        }
                                    },
                                    "onCurrency1Pressed":  function(context) {
                                        this.toggleCurrenciescheckBox1(context);
                                    }.bind(this),

                                    "imgCheckBox2": {
                                        text: 'D',
                                        skin: "sknLblFontTypeIcon003E7520px",
                                        accessiblityConfig: a11yHidden = true,
                                    },
                                    "flxCheckBoxCurr2": { 
                                        "accessibilityConfig": {
                                            "a11yARIA": {
                                                "role": "button",
                                                "aria-checked": false,
                                                "aria-labelledby":"lblCurrencyType2"
                                            }
                                        }
                                    },
                                    "onCurrency2Pressed":  function(context) {
                                        this.toggleCurrenciescheckBox2(context);
                                    }.bind(this),
                                    "flxType3": {
                                        "isVisible": false
                                    },
                                    "template": "flxCurrencyTypeList"
                                };
                            } else if (this.currencies[i]) {
                                row = {
                                    "lblCurrencyType1": {
                                        "text": this.currencies[i],
                                        "skin": "lblSSP42424213px"
                                    },
                                    "imgCheckBox": {
                                        text: 'D',
                                        skin: "sknLblFontTypeIcon003E7520px",
                                        "accessibilityConfig": {
                                            "a11yHidden": true,
                                        }
                                    },
                                    "flxCheckBoxCurr": { 
                                        "accessibilityConfig": {
                                            "a11yARIA": {
                                                "role": "button",
                                                "aria-checked": false,
                                                "aria-labelledby":"lblCurrencyType1"
                                            }
                                        }
                                    },
                                    "onCurrency1Pressed":  function(context) {
                                        this.toggleCurrenciescheckBox1(context);
                                    }.bind(this),
                                    "flxType2": {
                                        "isVisible": false
                                    },
                                    "flxType3": {
                                        "isVisible": false
                                    },
                                    "template": "flxCurrencyTypeList"
                                };
                            }
                            rowData.push(row);
                        }
                        segData.push(rowData);
                        data.push(segData);
                    }
                }
                this.view.advancedFilters.segCurrency.setData(data);
                this.view.advancedFilters.flxCurrency.setVisibility(true);
                this.view.advancedFilters.flxSeperatorCurrencyType.setVisibility(true);
            } else {
                this.view.advancedFilters.flxCurrency.setVisibility(false);
                this.view.advancedFilters.flxSeperatorCurrencyType.setVisibility(false);
            }
        },
        selectAllTypesOfAccounts: function() {
            var data = this.view.advancedFilters.segTypeOfAccounts.data;
            if (data[0][0]["imgCheckbox"]["text"] === 'D') {
                data[0][0]["imgCheckbox"]["text"] = 'C';
                data[0][0]["flxCheckBox"]["accessibilityConfig"] = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": true,
                        "aria-labelledby":"lblSelectAll"
                    }
                }
                for (i = 0; i < data[0][1].length; i++) {
                    data[0][1][i]["imgCheckBox"]["text"] = 'C';
                    if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblAccountType2"])) {
                        data[0][1][i]["imgCheckBox2"]["text"] = 'C';
                    }
                }
                //newly added code
                //this.selectedAccountTypes = JSON.parse(JSON.stringify(this.accountTypes));
				this.selectedAccountTypes = JSON.parse(JSON.stringify(this.allAccountTypes));
            } else {
                data[0][0]["imgCheckbox"]["text"] = 'D';
                data[0][0]["flxCheckBox"]["accessibilityConfig"] = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": false,
                        "aria-labelledby":"lblSelectAll"
                    }
                }
                for (i = 0; i < data[0][1].length; i++) {
                    data[0][1][i]["imgCheckBox"]["text"] = 'D';
                    if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblAccountType2"])) {
                        data[0][1][i]["imgCheckBox2"]["text"] = 'D';
                    }
                }
                //newly added code
                this.selectedAccountTypes = [];
            }
            //this.selectedAccountTypes = this.accountTypes;
            this.view.advancedFilters.segTypeOfAccounts.setData(data);
            this.view.advancedFilters.segTypeOfAccounts.setActive(-1,0,"flxTypeOfAccountsHeader.flxCheckBox");
        },
        selectAllTypesOfAccountsMobile: function() {
            var data = this.view.advancedFilters.segTypeOfAccounts.data;
            if (data[0][0]["imgCheckbox"]["text"] === 'D') {
                data[0][0]["imgCheckbox"]["text"] = 'C';
                data[0][0]["flxCheckBox"]["accessibilityConfig"] = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": true,
                        "aria-labelledby": "lblSelectAll"
                    }
                };
                for (i = 0; i < data[0][1].length; i++) {
                    data[0][1][i]["imgCheckBox"]["text"] = 'C';
                }
            } else if (data[0][0]["imgCheckbox"]["text"] === 'C') {
                data[0][0]["imgCheckbox"]["text"] = 'D';
                data[0][0]["flxCheckBox"]["accessibilityConfig"] = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": false,
                        "aria-labelledby": "lblSelectAll"
                    }
                };
                for (i = 0; i < data[0][1].length; i++) {
                    data[0][1][i]["imgCheckBox"]["text"] = 'D';
                }
            }
            this.selectedAccountTypes = this.accountTypes;
            this.view.advancedFilters.segTypeOfAccounts.setData(data);
            this.view.advancedFilters.segTypeOfAccounts.setActive(-1,0,"flxTypeOfAccountsHeader.flxCheckBox");
        },
        selectAllCurrencies: function() {
            var data = this.view.advancedFilters.segCurrency.data;
            if (data[0][0]["imgCheckbox"]["text"] === 'D') {
                data[0][0]["imgCheckbox"]["text"] = 'C';
                data[0][0]["flxCheckBox"]["accessibilityConfig"] = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": true,
                        "aria-labelledby": "lblSelectAll"
                    }
                };
                for (i = 0; i < data[0][1].length; i++) {
                    data[0][1][i]["imgCheckBox"]["text"] = 'C';
                    if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblCurrencyType2"])) {
                        data[0][1][i]["imgCheckBox2"]["text"] = 'C';
                    }
                    if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblCurrencyType3"])) {
                        data[0][1][i]["imgCheckBox3"]["text"] = 'C';
                    }
                }
                //this.selectedCurrencies = JSON.parse(JSON.stringify(this.currencies));
				this.selectedCurrencies = JSON.parse(JSON.stringify(this.allCurrencies));
            } else {
                data[0][0]["imgCheckbox"]["text"] = 'D';
                data[0][0]["flxCheckBox"]["accessibilityConfig"] = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": false,
                        "aria-labelledby": "lblSelectAll"
                    }
                };
                for (i = 0; i < data[0][1].length; i++) {
                    data[0][1][i]["imgCheckBox"]["text"] = 'D';
                    if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblCurrencyType2"])) {
                        data[0][1][i]["imgCheckBox2"]["text"] = 'D';
                    }
                    if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblCurrencyType3"])) {
                        data[0][1][i]["imgCheckBox3"]["text"] = 'D';
                    }
                }
                this.selectedCurrencies = [];
            }
            //   data[0][0]["imgCheckbox"]["text"] = 'C';
            // for (i = 0; i < data[0][1].length; i++) {
            //   data[0][1][i]["imgCheckBox"]["text"] = 'C';
            //   if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblCurrencyType2"])) {
            //     data[0][1][i]["imgCheckBox2"]["text"] = 'C';
            //   }
            //   if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblCurrencyType3"])) {
            //     data[0][1][i]["imgCheckBox3"]["text"] = 'C';
            //   }
            // }
            //this.selectedCurrencies = this.currencies;
            this.view.advancedFilters.segCurrency.setData(data);
            this.view.advancedFilters.segCurrency.setActive(-1,0,"flxTypeOfAccountsHeader.flxCheckBox");
        },
        selectAllCurrenciesMobile: function() {
            var data = this.view.advancedFilters.segCurrency.data;
            if (data[0][0]["imgCheckbox"]["text"] === 'D') {
                data[0][0]["imgCheckbox"]["text"] = 'C';
                data[0][0]["flxCheckBox"]["accessibilityConfig"] = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": true,
                        "aria-labelledby": "lblSelectAll"
                    }
                };

                for (i = 0; i < data[0][1].length; i++) {
                    data[0][1][i]["imgCheckBox"]["text"] = 'C';
                }
            } else if (data[0][0]["imgCheckbox"]["text"] === 'C') {
                data[0][0]["imgCheckbox"]["text"] = 'D';
                data[0][0]["flxCheckBox"]["accessibilityConfig"] = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": false,
                        "aria-labelledby": "lblSelectAll"
                    }
                };
                for (i = 0; i < data[0][1].length; i++) {
                    data[0][1][i]["imgCheckBox"]["text"] = 'D';
                }
            }
            this.selectedCurrencies = this.currencies;
            this.view.advancedFilters.segCurrency.setData(data);
            this.view.advancedFilters.segCurrency.setActive(-1,0,"flxTypeOfAccountsHeader.flxCheckBox");
        },
        currenciesBasedOnAccounts: function() {
            if (this.presenter.presentationController.customerdashboard === "true") {
                    var accounts = this.presenter.presentationController.customeraccounts;
				} else {
						var accounts = this.presenter.presentationController.accounts;
				}	
            var scopeObj = this;
            scopeObj.availableCurrencies = [];
            if (scopeObj.selectedAccountTypes.length !== 0) {
                accounts.forEach(function(account) {
                    if (scopeObj.selectedAccountTypes.includes(account.accountType)) scopeObj.availableCurrencies.push(account.currencyCode);
                });
                var data = this.view.advancedFilters.segCurrency.data;
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    for (i = 0; i < data[0][1].length; i++) {
                        if (!(this.availableCurrencies.includes(data[0][1][i]["lblAccountType"]["text"]))) {
                            //               data[0][1][i]["lblAccountType"]["skin"] = "sknlbl727272SSP13px";
                            //               data[0][1][i]["imgCheckBox"]["skin"] = "sknLblOlbFontIconsA0A0A020Px";
                            data[0][1][i]["flxCheckBoxMobile"]["onClick"] = function() {};
                        } else {
                            //               data[0][1][i]["lblAccountType"]["skin"] = "lblSSP42424213px";
                            data[0][1][i]["imgCheckBox"]["skin"] = "sknLblFontTypeIcon003E7520px";
                            data[0][1][i]["flxCheckBoxMobile"]["onClick"] = function(eventobject,  context) {
                                this.toggleCurrenciesCheckbox(context);
                            }.bind(this)
                        }
                    }
                } else {
                    for (i = 0; i < data[0][1].length; i++) {
                        if (!(this.availableCurrencies.includes(data[0][1][i]["lblCurrencyType1"]["text"]))) {
                            //               data[0][1][i]["lblCurrencyType1"]["skin"] = "sknlbl727272SSP13px";
                            //               data[0][1][i]["imgCheckBox"]["skin"] = "sknLblOlbFontIconsA0A0A020Px";
                            data[0][1][i]["flxCheckBoxCurr"]["onClick"] = function() {};
                        } else {
                            //               data[0][1][i]["lblCurrencyType1"]["skin"] = "lblSSP42424213px";
                            data[0][1][i]["imgCheckBox"]["skin"] = "sknLblFontTypeIcon003E7520px";
                            data[0][1][i]["flxCheckBoxCurr"]["onClick"] = function(eventobject, context) {
                                this.toggleCurrenciescheckBox1(context);
                            }.bind(this)
                        }
                        if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblCurrencyType2"]))
                            if (!(this.availableCurrencies.includes(data[0][1][i]["lblCurrencyType2"]["text"]))) {
                                //                 data[0][1][i]["lblCurrencyType2"]["skin"] = "sknlbl727272SSP13px";
                                //                 data[0][1][i]["imgCheckBox2"]["skin"] = "sknLblOlbFontIconsA0A0A020Px";
                                data[0][1][i]["flxCheckBoxCurr2"]["onClick"] = function() {};
                            } else {
                                //                 data[0][1][i]["lblCurrencyType2"]["skin"] = "lblSSP42424213px";
                                data[0][1][i]["imgCheckBox2"]["skin"] = "sknLblFontTypeIcon003E7520px";
                                data[0][1][i]["flxCheckBoxCurr2"]["onClick"] = function(eventobject, context) {
                                    this.toggleCurrenciescheckBox2(context);
                                }.bind(this);
                            }
                        if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblCurrencyType3"]))
                            if (!(this.availableCurrencies.includes(data[0][1][i]["lblCurrencyType3"]["text"]))) {
                                //                 data[0][1][i]["lblCurrencyType3"]["skin"] = "sknlbl727272SSP13px";
                                //                 data[0][1][i]["imgCheckBox3"]["skin"] = "sknLblOlbFontIconsA0A0A020Px";
                                data[0][1][i]["flxCheckBoxCurr3"]["onClick"] = function() {};
                            } else {
                                //                 data[0][1][i]["lblCurrencyType3"]["skin"] = "lblSSP42424213px";
                                data[0][1][i]["imgCheckBox3"]["skin"] = "sknLblFontTypeIcon003E7520px";
                                data[0][1][i]["flxCheckBoxCurr3"]["onClick"] = function(eventobject, context) {
                                    this.toggleCurrenciescheckBox3(context);
                                }.bind(this);
                            }
                    }
                }
                this.view.advancedFilters.segCurrency.setData(data);
            } else this.setCurrenciesSegmentData();
        },
        accountsBasedOnCurrencies: function() {
            if (this.presenter.presentationController.customerdashboard === "true") {
                    var accounts = this.presenter.presentationController.customeraccounts;
				} else {
					var accounts = this.presenter.presentationController.accounts;
				}	
            var scopeObj = this;
            scopeObj.availableAccountTypes = [];
            if (scopeObj.selectedCurrencies.length !== 0) {
                accounts.forEach(function(account) {
                    if (scopeObj.selectedCurrencies.includes(account.currencyCode)) scopeObj.availableAccountTypes.push(account.accountType);
                });
                var data = this.view.advancedFilters.segTypeOfAccounts.data;
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    for (i = 0; i < data[0][1].length; i++) {
                        if (!(this.availableAccountTypes.includes(data[0][1][i]["lblAccountType"]["text"]))) {
                            //               data[0][1][i]["lblAccountType"]["skin"] = "sknlbl727272SSP13px";
                            //               data[0][1][i]["imgCheckBox"]["skin"] = "sknLblOlbFontIconsA0A0A020Px";
                            data[0][1][i]["flxCheckBox"]["onClick"] = function() {};
                        } else {
                            //               data[0][1][i]["lblAccountType"]["skin"] = "lblSSP42424213px";
                            //               data[0][1][i]["imgCheckBox"]["skin"] = "sknLblFontTypeIcon003E7520px";
                            data[0][1][i]["flxCheckBoxMobile"]["onClick"] = function(eventobject, context) {
                                this.toggleTypeOfAccountsCheckbox(context);
                            }.bind(this)
                        }
                    }
                } else {
                    for (i = 0; i < data[0][1].length; i++) {
                        if (!(this.availableAccountTypes.includes(data[0][1][i]["lblAccountType1"]["text"]))) {
                            //               data[0][1][i]["lblAccountType1"]["skin"] = "sknlbl727272SSP13px";
                            //               data[0][1][i]["imgCheckBox"]["skin"] = "sknLblOlbFontIconsA0A0A020Px";
                            data[0][1][i]["flxCheckBox"]["onClick"] = function() {};
                        } else {
                            //               data[0][1][i]["lblAccountType1"]["skin"] = "lblSSP42424213px";
                            //               data[0][1][i]["imgCheckBox"]["skin"] = "sknLblFontTypeIcon003E7520px";
                            data[0][1][i]["flxCheckBox"]["onClick"] = function(eventobject, context) {
                                this.toggleAccountscheckBox1(context);
                            }.bind(this);
                        }
                        if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblAccountType2"]))
                            if (!(this.availableAccountTypes.includes(data[0][1][i]["lblAccountType2"]["text"]))) {
                                //                 data[0][1][i]["lblAccountType2"]["skin"] = "sknlbl727272SSP13px";
                                //                 data[0][1][i]["imgCheckBox2"]["skin"] = "sknLblOlbFontIconsA0A0A020Px";
                                data[0][1][i]["flxCheckBox2"]["onClick"] = function() {};
                            } else {
                                //                 data[0][1][i]["lblAccountType2"]["skin"] = "lblSSP42424213px";
                                data[0][1][i]["flxCheckBox2"]["skin"] = "sknLblFontTypeIcon003E7520px";
                                data[0][1][i]["flxCheckBox2"]["onClick"] = function(eventobject, context) {
                                    this.toggleAccountscheckBox2(context);
                                }.bind(this);
                            }
                    }
                }
                this.view.advancedFilters.segTypeOfAccounts.setData(data);
            } else this.setTypesOfAccountsSegmentData();
        },
        resetAdvancedFilters: function() {
            this.offset = 0;
            this.lastRecord = '';
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var isRetailUser = applicationManager.getConfigurationManager().getConfigurationValue('isRBUser') === "true";
            var isBusinessUser = applicationManager.getConfigurationManager().getConfigurationValue('isSMEUser') === "true";
            var data;
            this.selectedAccountStatus = [];
            this.selectedAccountTypes = [];
            this.selectedCurrencies = [];
            this.view.advancedFilters.lblIconAccountName.text = 'L';
            this.flxByAccountsAccessibility();
            this.view.advancedFilters.lblIconBalance.text = 'L';
            this.flxByBalanceAccessibilty();
            if (!this.isSingleCustomerProfile) {
                this.view.advancedFilters.lblIconGroupCompany.text = 'M';
                this.flxGroupByCompanyAccessibility();
                this.view.advancedFilters.lblIconAccountName.text = 'M';
                this.flxByAccountsAccessibility();
                this.view.advancedFilters.lblIconChoice3.text = 'L';
                this.flxChoice3Accessibility();
                this.view.advancedFilters.lblIconAccountType.text = 'L';
                this.flxGroupByAccountTypeAccessibility();
                this.view.advancedFilters.flxRow2.setVisibility(true);
                this.view.advancedFilters.flxSortBody.height = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "120dp" : "90dp";
                this.view.advancedFilters.lblAccounts.text = kony.i18n.getLocalizedString("i18n.transfers.accountType");
                this.view.advancedFilters.lblBalance.text = kony.i18n.getLocalizedString("kony.mb.CardMng.AccountName");
                this.view.advancedFilters.lblChoice3.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.Balance");
            } else {
                this.view.advancedFilters.flxGroup.setVisibility(false);
                this.view.advancedFilters.flxSeperatorGroup.setVisibility(false);
                this.view.advancedFilters.flxRow2.setVisibility(false);
                this.view.advancedFilters.flxSortBody.height = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "80dp" : "40dp";
                this.view.advancedFilters.lblAccounts.text = kony.i18n.getLocalizedString("kony.mb.CardMng.AccountName");
                this.view.advancedFilters.lblBalance.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.Balance");
            }
            if (this.view.advancedFilters.flxTypeOfAccounts.isVisible === true) {
                data = this.view.advancedFilters.segTypeOfAccounts.data;
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    data[0][0]["imgCheckbox"]["text"] = 'D';
                    data[0][0]["imgCheckbox"]["accessibilityConfig"] = {
                        "a11yHidden": true
                    }
                    for (i = 0; i < data[0][1].length; i++) {
                        data[0][1][i]["lblAccountType"]["skin"] = "lblSSP42424213px";
                        data[0][1][i]["imgCheckBox"]["skin"] = "sknLblFontTypeIcon003E7520px";
                        data[0][1][i]["imgCheckBox"]["text"] = "D";
                        data[0][1][i]["imgCheckBox"]["accessibilityConfig"] = {
                            a11yHidden: true
                        }
                    }
                } else {
                    data[0][0]["imgCheckbox"]["text"] = 'D';
                    data[0][0]["imgCheckbox"]["accessibilityConfig"] = {
                        "a11yHidden": true
                    }
                    for (i = 0; i < data[0][1].length; i++) {
                        data[0][1][i]["lblAccountType1"]["skin"] = "lblSSP42424213px";
                        data[0][1][i]["imgCheckBox"]["skin"] = "sknLblFontTypeIcon003E7520px";
                        data[0][1][i]["imgCheckBox"]["text"] = "D";
                        data[0][1][i]["imgCheckBox"]["accessibilityConfig"] = {
                            a11yHidden: true
                        }
                        if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblAccountType2"])) {
                            data[0][1][i]["lblAccountType2"]["skin"] = "lblSSP42424213px";
                            data[0][1][i]["imgCheckBox2"]["skin"] = "sknLblFontTypeIcon003E7520px";
                            data[0][1][i]["imgCheckBox2"]["text"] = "D";
                            data[0][1][i]["imgCheckBox2"]["accessibilityConfig"] = {
                                a11yHidden: true
                            }
                        }
                    }
                }
                this.view.advancedFilters.segTypeOfAccounts.setData(data);
            }
            if (this.view.advancedFilters.flxCurrency.isVisible === true) {
                data = this.view.advancedFilters.segCurrency.data;
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    data[0][0]["imgCheckbox"]["text"] = 'D';
                    data[0][0]["imgCheckbox"]["accessibilityConfig"] = {
                        "a11yHidden": true
                    }
                    for (i = 0; i < data[0][1].length; i++) {
                        data[0][1][i]["lblAccountType"]["skin"] = "lblSSP42424213px";
                        data[0][1][i]["imgCheckBox"]["skin"] = "sknLblFontTypeIcon003E7520px";
                        data[0][1][i]["imgCheckBox"]["text"] = "D";
                        data[0][1][i]["imgCheckBox"]["accessibilityConfig"] = {
                            a11yHidden: true
                        }
                    }
                } else {
                    data[0][0]["imgCheckbox"]["text"] = 'D';
                    data[0][0]["imgCheckbox"]["accessibilityConfig"] = {
                        "a11yHidden": true
                    }
                    for (i = 0; i < data[0][1].length; i++) {
                        data[0][1][i]["lblCurrencyType1"]["skin"] = "lblSSP42424213px";
                        data[0][1][i]["imgCheckBox"]["skin"] = "sknLblFontTypeIcon003E7520px";
                        data[0][1][i]["imgCheckBox"]["text"] = "D";
                        data[0][1][i]["imgCheckBox"]["accessibilityConfig"] = {
                            a11yHidden: true
                        }
                        if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblCurrencyType2"])) {
                            data[0][1][i]["lblCurrencyType2"]["skin"] = "lblSSP42424213px";
                            data[0][1][i]["imgCheckBox2"]["skin"] = "sknLblFontTypeIcon003E7520px";
                            data[0][1][i]["imgCheckBox2"]["text"] = "D";
                            data[0][1][i]["imgCheckBox2"]["accessibilityConfig"] = {
                                a11yHidden: true
                            }
                        }
                        if (!kony.sdk.isNullOrUndefined(data[0][1][i]["lblCurrencyType3"])) {
                            data[0][1][i]["lblCurrencyType3"]["skin"] = "lblSSP42424213px";
                            data[0][1][i]["imgCheckBox3"]["skin"] = "sknLblFontTypeIcon003E7520px";
                            data[0][1][i]["imgCheckBox3"]["text"] = "D";
                            data[0][1][i]["imgCheckBox3"]["accessibilityConfig"] = {
                                a11yHidden: true
                            }
                        }
                    }
                }
                this.view.advancedFilters.segCurrency.setData(data);
            }
            if (this.view.advancedFilters.flxAccountStatus.isVisible === true) {
                this.view.advancedFilters.lblActivecheckbox.text = 'D';
                this.view.advancedFilters.lblClosedcheckbox.text = 'D';
            }
            this.flxByAccountsAccessibility();
            this.flxByBalanceAccessibilty();
            this.flxChoice3Accessibility();
            this.flxGroupByCompanyAccessibility();
            this.flxGroupByAccountTypeAccessibility();
        },
        /**
         * method used to enable or disable the clear button.
         */
        onTxtSearchKeyUp: function(accounts) {
            var scopeObj = this;
            this.closePopupAndFilterScreens("all");
            var searchKeyword = scopeObj.view.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.flxClearBtn.setVisibility(true);
            } else {
                scopeObj.view.flxClearBtn.setVisibility(false);
            }
            this.view.flxSearch.forceLayout();
            hidePopups();
            var data = scopeObj.getSearchAndFilterData(accounts);
            scopeObj.view.accountList.segAccounts.setData(data);
            scopeObj.view.accountList.forceLayout();
            scopeObj.view.forceLayout();
            scopeObj.AdjustScreen();
        },
        /**
         * method used to clear search
         */
        onSearchClearBtnClick: function(accounts) {
            var scopeObj = this;
            scopeObj.view.txtSearch.text = "";
            scopeObj.view.flxClearBtn.setVisibility(false);
            var data = scopeObj.getSearchAndFilterData(accounts);
            scopeObj.view.accountList.segAccounts.setData(data);
            scopeObj.view.accountList.forceLayout();
            scopeObj.view.forceLayout();
            scopeObj.AdjustScreen();
        },
        /**
         * method to handle the search account functionality
         */
        onSearchBtnClick: function(accounts) {
            var scopeObj = this;
            var data = scopeObj.getSearchAndFilterData(accounts);
            scopeObj.view.accountList.segAccounts.setData(data);
            scopeObj.view.accountList.forceLayout();
            scopeObj.view.forceLayout();
            scopeObj.AdjustScreen();
        },
        /**
         * method to get data from search and filter values
         */
        getSearchAndFilterData: function(accounts) {
            var scopeObj = this;
            var closedAccounts = new Map();
            var closedAccts = [];
            accounts.forEach(function(account) {
                if (closedAccounts.has(account.Membership_id)) {
                    closedAccounts.set(account.Membership_id, closedAccounts.get(account.Membership_id) + 1);
                } else {
                    closedAccounts.set(account.Membership_id, 1);
                }
            });
            accounts.forEach(function(account) {
                if (!((closedAccounts.get(account.Membership_id) === 1) && (account.accountStatus === 'CLOSED' || account.accountStatus === 'Closed') && !applicationManager.getConfigurationManager().checkUserPermission('VIEW_CLOSED_ACCOUNT'))) {
                    closedAccts.push(account);
                }
            });
            accounts = closedAccts;
            var filterQuery = scopeObj.view.lblSelectedFilter.text;
            var searchQuery = scopeObj.view.txtSearch.text.trim();
            if (this.isDefaultFilterApplied) {
                if (kony.i18n.getCurrentLocale() === "ar_AE") {
                    if (filterQuery === "ميع الحسابات") {
                        //all account will be shown
                    } else if (filterQuery === "لحسابات المؤجلة") {
                        accounts = accounts.filter(this.isFavourite);
                    } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"))) {
                        accounts = accounts.filter(this.isPersonalAccount);
                    } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"))) {
                        accounts = accounts.filter(this.isBusinessAccount);
                    } else if (filterQuery.includes(this.bankName)) {
                        accounts = accounts.filter(this.isDbx);
                    } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.hamburger.externalAccounts"))) {
                        accounts = accounts.filter(this.isExternal);
                    } else {
                        accounts = accounts.filter(this.cifFilter);
                    }
                } else {
                    if (filterQuery === kony.i18n.getLocalizedString("i18n.serviceRequests.AllAccounts")) {
                        //all accounts will be shown
                    } else if (filterQuery === kony.i18n.getLocalizedString("i18n.Accounts.FavouriteAccounts")) {
                        accounts = accounts.filter(this.isFavourite);
                    } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"))) {
                        accounts = accounts.filter(this.isPersonalAccount);
                    } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"))) {
                        accounts = accounts.filter(this.isBusinessAccount);
                    } else if (filterQuery.includes(this.bankName)) {
                        accounts = accounts.filter(this.isDbx);
                    } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.hamburger.externalAccounts"))) {
                        accounts = accounts.filter(this.isExternal);
                    } else {
                        accounts = accounts.filter(this.cifFilter);
                    }
                }
            }
            if (!kony.sdk.isNullOrUndefined(this.isCustomFilterApplied) && this.isCustomFilterApplied) {
                accounts = accounts.filter(this.isBelongsToCustomView);
                if (!this.isAdvancedFilterApplied) this.initializeAdvancedFilters(accounts);
            }
            if (!kony.sdk.isNullOrUndefined(this.isDefaultFilterApplied) && this.isDefaultFilterApplied) {
                if (!this.isAdvancedFilterApplied) this.initializeAdvancedFilters(accounts);
            }
            accounts = this.applyAdvancedFilterSelection(accounts);
            var data = accounts;
//             if (!kony.sdk.isNullOrUndefined(searchQuery) && searchQuery !== "") {
//                 for (var i = 0; i < data.length; i++) {
//                     var rowdata = data[i][1].filter(function(record) {
//                         return (record["accountName"] && record["accountName"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) || (record["accountType"] && record["accountType"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) || (record["accountID"] && record["accountID"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) || (record["membershipName"] && record["membershipName"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1);
//                     });
//                     if (rowdata.length === 0) {
//                         data.splice(i, 1);
//                         i--;
//                         //             data[i][1][0].flxAccountsRowWrapper["isVisible"] = false;
//                         //             data[i][1][0].flxNoResultsFound["isVisible"] = true;
//                         //             data[i][1][0].isNoRecords = true;
//                         //             data[i][1][0].lblNoResultsFound= {
//                         //               "text": kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound")
//                         //             };
//                         //             data[i][1][0].imgNoResultsFound = {
//                         //               "src" : "info_grey.png"
//                         //             };
//                         //             var noRecordsData = data[i][1][0];
//                         //             data[i][1] = [];
//                         //             data[i][1].push(noRecordsData);
//                     } else {
//                         data[i][1] = [];
//                         data[i][1] = rowdata;
//                     }
//                 }
//             }
            if (this.isSingleCustomerProfile) data = this.generateTotalBalanceHide(data);
            else if (this.isAdvancedFilterApplied) {
                if (this.view.advancedFilters.lblIconGroupCompany.text !== 'M') data = this.generateTotalBalance(data);
                this.flxGroupByCompanyAccessibility();
            }
            return data;
        },
        /*
         * Method to return Business Accounts status
         */
        isBusinessAccount: function(account) {
            return account.isBusinessAccount && account.isBusinessAccount === 'true';
        },
        /*
         * Method to return Personal Accounts status
         */
        isPersonalAccount: function(account) {
            return account.isBusinessAccount && account.isBusinessAccount === 'false';
        },
        /*
         * Method to return accounts grouped by selected cif
         */
        cifFilter: function(account) {
            var membershipId = this.view.accountsFilter.segDefaultFilters.data[this.filterIndex]["membershipId"];
            //  return account.Membership_id && account.Membership_id === membershipId;
            // var MembershipName = this.view.accountsFilter.segDefaultFilters.data[this.filterIndex]["MembershipName"];
            // return account.accountType && (account.accountType+" Accounts") === this.view.lblSelectedFilter.text;
            //Defect: ARB-33686 - Starts
            if ((account.accountType && account.displayName) && (account.accountType + " Accounts") === this.view.lblSelectedFilter.text) {
                return account.accountType && (((account.accountType + " Accounts") === this.view.lblSelectedFilter.text) || ((account.displayName + " Accounts") === this.view.lblSelectedFilter.text));
            } else if (!account.displayName) {
                return account.accountType && (this.view.lblSelectedFilter.text.includes(account.serviceType));
            } else {
                return account.Membership_id && account.Membership_id === membershipId;
            } //Defect: ARB-33686 - Ends
        },
        updateAccountWidget: function(accounts, isDashboardSwitcher) {
            var accountList = (kony.sdk.isNullOrUndefined(accounts) || accounts.constructor !== Array) ? [] : accounts;
            this.accounts = accountList;
            this.customViewFlag = false;
            var isAccountAvailable = accountList.length > 0 ? true : false;
            if (kony.sdk.isNullOrUndefined(isDashboardSwitcher)) isDashboardSwitcher = true;
            //       if(this.isBusinessUser || (this.isCombinedUser&&this.currDashboard===0))
            this.updateCashPositionUiBasedOnAccountsAvailability(isAccountAvailable, isDashboardSwitcher);
            this.view.flxLoading.height = this.view.flxHeader.frame.height + this.view.flxMain.frame.height + this.view.flxFooter.frame.height + "dp";
            this.view.accountList.lblAccountsHeader.skin = ViewConstants.SKINS.LABEL_HEADER_BOLD;
            this.view.flxActions.setVisibility(false);
            this.view.AddExternalAccounts.setVisibility(false);
            this.view.flxWelcomeAndActions.setVisibility(false);
            this.view.accountList.setVisibility(true);
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.customheader.lblHeaderMobile, kony.i18n.getLocalizedString('i18n.hamburger.myaccounts'), accessibilityConfig);
            } else {
                this.view.customheader.customhamburger.activateMenu("ACCOUNTS", "My Accounts");
            }
            if (!(kony.sdk.isNullOrUndefined(accounts.customView))) {
                this.currentView = accounts.customView.name;
                this.currentViewId = accounts.customView.id;
                this.hiddenlblSelectedFilter = accounts.customView.name;
                if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) this.view.lblSelectedFilter.text = accounts.customView.name.length > 20 ? CommonUtilities.truncateStringWithGivenLength(accounts.customView.name + "...", 20) : accounts.customView.name;
                else this.view.lblSelectedFilter.text = accounts.customView.name.length > 25 ? CommonUtilities.truncateStringWithGivenLength(accounts.customView.name + "...", 25) : accounts.customView.name;
                this.view.lblDropDown.text = 'O';
                var data = this.view.accountsFilter.segDefaultFilters.data;
                for (i = 0; i < data.length; i++) {
                    data[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    data[i].lblRadioButton.skin = "sknRadioGreyUnselectedFonticon929292";
                }
                this.view.accountsFilter.segDefaultFilters.setData(data);
                var customViews = this.presenter.presentationController.customViews;
                if (accounts.customViewType === "Create") {
                    var flag = 0;
                    customViews.forEach(function(view) {
                        if (view.id === accounts.customView.id) flag = 1;
                    });
                    if (flag === 0) customViews.push(accounts.customView);
                    this.currentView = this.currentView + "~" + accounts.customView.accountIds;
                }
                if (accounts.customViewType === "Edit") {
                    var index = customViews.findIndex(x => x.id === accounts.customView.id);
                    if (index !== undefined) customViews.splice(index, 1);
                    customViews.push(accounts.customView);
                    this.currentView = this.currentView + "~" + accounts.customView.accountIds;
                }
                this.setCustomViewsData(customViews);
                data = this.view.accountsFilter.segCustomFiltersHeader.data;
                for (i = 0; i < data.length; i++) {
                    if (data[i].response.id === accounts.customView.id) {
                        data[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                        data[i].lblRadioButton.skin = "sknRadioselectedFonticon";
                    } else {
                        data[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                        data[i].lblRadioButton.skin = "sknRadioGreyUnselectedFonticon929292";
                    }
                }
                this.view.accountsFilter.segCustomFiltersHeader.setData(data);
                this.customViewFlag = true;
            }
            this.updateAccountList(accountList);
            this.initializeSearchAndFilterActions(accountList);
            if (this.currentView === '') this.initializeFilterSegments();
            this.lastFilterCriteria = [];
            if (this.currentView !== '') this.getSearchAndFilterData(accounts);
            else this.initializeAdvancedFilters(this.accounts);
            FormControllerUtility.hideProgressBar(this.view);
            this.AdjustScreen();
        },
        /*
         * To initialize cash position chart - to show or hide
         */
        updateCashPositionUiBasedOnAccountsAvailability: function(isAccountAvailable, isDashboardSwitcher) {
            if (isAccountAvailable && this.transactionViewAccessCheck() && isDashboardSwitcher && applicationManager.getConfigurationManager().checkUserPermission('ACCESS_CASH_POSITION')) {
                this.view.flxMyCashPosition.left = "0%";
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.flxMyCashPosition.left = "2%";
                }
                this.view.flxMyCashPosition.setVisibility(true);
                this.setCashPositionFilterData();
            } else {
                this.view.flxMyCashPosition.setVisibility(false);
            }
            this.AdjustScreen();
        },
        /*
Method to show durations drop down
*/
        showDurationDropDown: function() {
            this.closePopupAndFilterScreens("calendarPopUp");
            var unselectedLblSkin = "sknLblSSP4242429Px";
            var selectedLblSkin = "sknLblSSPFFFFFF9Px";
            var unselectedFlxSkin = "slFBox";
            var selectedFlxSkin = "sknFlxBg003E75NoBorder";
            var scopeObj = this;
            this.selectedChoice = [];
            this.numSelected = 0;
            this.selectedTab;
            if (this.lastSelectedTab === "") this.lastSelectedTab = "Daily";
            var selectedMonth;
            var selectedYear;
            var currentYear = new Date().getFullYear();
            if (this.view.flxDurationList.origin) {
                this.view.flxDurationList.origin = false;
                return;
            }
            if (isCalendarDropDownOpen == true) {
                this.view.flxCalendar.isVisible = false;
                isCalendarDropDownOpen = false;
            } else {
                var filterTop = this.view.flxMyCashPosition.frame.y + this.view.flxFilterListBox.frame.y + 47;
                this.view.flxCalendar.left = "30%";
                this.view.flxCalendar.isVisible = true;
                isCalendarDropDownOpen = true;
            }
            var visible = this.view.flxCalendar.isVisible;
            this.view.flxAccountList.setVisibility(false);
            this.view.imgAccountsDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            this.view.imgAccountsDropdownMobile.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            if (visible) {
                this.view.imgYearsDropDownNewMobile.text = 'c';
                this.view.imgYearsDropDown.text = 'c';
            } else {
                this.view.imgYearsDropDownNewMobile.text = 'c';
                this.view.imgYearsDropDown.text = 'c';
            }
            this.view.calendarWidget.lblYear.text = new Date().getFullYear().toString();
            this.view.calendarWidget.flxPrevious.onClick = function() {
                scopeObj.view.calendarWidget.lblYear.text = (parseInt(scopeObj.view.calendarWidget.lblYear.text) - 1).toString();
                scopeObj.selectedTab === "Monthly" ? scopeObj.setYearsData() : scopeObj.setMonthsData();
            };
            this.view.calendarWidget.flxNext.onClick = function() {
                if (scopeObj.view.calendarWidget.lblYear.text !== currentYear.toString()) scopeObj.view.calendarWidget.lblYear.text = (parseInt(scopeObj.view.calendarWidget.lblYear.text) + 1).toString();
                scopeObj.selectedTab === "Monthly" ? scopeObj.setYearsData() : scopeObj.setMonthsData();
            };
            this.view.calendarWidget.lblNextFrom.onTouchEnd = function() {
                if (scopeObj.view.calendarWidget.lblFromYearValue.text !== currentYear.toString()) scopeObj.view.calendarWidget.lblFromYearValue.text = (parseInt(scopeObj.view.calendarWidget.lblFromYearValue.text) + 1).toString();
                scopeObj.setYearsData();
            };
            this.view.calendarWidget.lblNextTo.onTouchEnd = function() {
                if (scopeObj.view.calendarWidget.lblToYearValue.text !== currentYear.toString()) scopeObj.view.calendarWidget.lblToYearValue.text = (parseInt(scopeObj.view.calendarWidget.lblToYearValue.text) + 1).toString();
                scopeObj.setYearsData();
            };
            scopeObj.selectedTab = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? scopeObj.view.lblOccurenceMobile.text : scopeObj.view.lblOccurence.text;
            scopeObj.selectedTab = scopeObj.selectedTab.substr(0, scopeObj.selectedTab.length - 2);
            scopeObj.lastSelectedTab = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? scopeObj.view.lblOccurenceMobile.text : scopeObj.view.lblOccurence.text;
            scopeObj.lastSelectedTab = scopeObj.lastSelectedTab.substr(0, scopeObj.lastSelectedTab.length - 2);
            switch (scopeObj.lastSelectedTab) {
                case "Daily":
                    {
                        this.onClickDailyTab();
                        break;
                    }
                case "Weekly":
                    {
                        this.onClickWeeklyTab();
                        break;
                    }
                case "Monthly":
                    {
                        this.onClickMonthlyTab();
                        break;
                    }
                case "Yearly":
                    {
                        this.onClickYearlyTab();
                        break;
                    }
            }
            this.view.calendarWidget.flxYearly.onClick = this.onClickYearlyTab.bind(this);
            this.view.calendarWidget.flxMonthly.onClick = this.onClickMonthlyTab.bind(this);
            this.view.calendarWidget.flxWeekly.onClick = this.onClickWeeklyTab.bind(this);
            this.view.calendarWidget.flxDaily.onClick = this.onClickDailyTab.bind(this);
            this.view.calendarWidget.flxApply.onClick = function() {
                scopeObj.view.flxCalendar.setVisibility(false);
                var index;
                var longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                switch (scopeObj.selectedTab) {
                    case "Yearly":
                        {
                            scopeObj.view.calendarWidget.lblToYearValue.text = scopeObj.view.calendarWidget.lblToYearValue.text === "-" ? new Date().getFullYear().toString() : scopeObj.view.calendarWidget.lblToYearValue.text;
                            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                                scopeObj.view.lblOccurenceMobile.text = kony.i18n.getLocalizedString("i18n.Transfers.Yearly") + ": ";
                                scopeObj.view.lblSelectionMobile.text = scopeObj.view.calendarWidget.lblFromYearValue.text + " - " + scopeObj.view.calendarWidget.lblToYearValue.text;
                            } else {
                                scopeObj.view.lblOccurence.text = kony.i18n.getLocalizedString("i18n.Transfers.Yearly") + ": ";
                                scopeObj.view.lblSelection.text = scopeObj.view.calendarWidget.lblFromYearValue.text + " - " + scopeObj.view.calendarWidget.lblToYearValue.text;
                            }
                            break;
                        }
                    case "Monthly":
                        {
                            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                                scopeObj.view.lblOccurenceMobile.text = kony.i18n.getLocalizedString("i18n.Transfers.Monthly") + ": ";
                                scopeObj.view.lblSelectionMobile.text = scopeObj.selectedChoice[0];
                            } else {
                                scopeObj.view.lblOccurence.text = kony.i18n.getLocalizedString("i18n.Transfers.Monthly") + ": ";
                                scopeObj.view.lblSelection.text = scopeObj.selectedChoice[0];
                            }
                            break;
                        }
                    case "Weekly":
                        {
                            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                                index = longMonths.findIndex(element => element.includes(scopeObj.selectedChoice));
                                scopeObj.view.lblOccurenceMobile.text = kony.i18n.getLocalizedString("i18n.Transfers.Weekly") + ": ";
                                scopeObj.view.lblSelectionMobile.text = longMonths[index] + ", " + scopeObj.view.calendarWidget.lblYear.text;
                            } else {
                                index = longMonths.findIndex(element => element.includes(scopeObj.selectedChoice));
                                scopeObj.view.lblOccurence.text = kony.i18n.getLocalizedString("i18n.Transfers.Weekly") + ": ";
                                scopeObj.view.lblSelection.text = longMonths[index] + ", " + scopeObj.view.calendarWidget.lblYear.text;
                            }
                            break;
                        }
                    case "Daily":
                        {
                            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                                index = longMonths.findIndex(element => element.includes(scopeObj.selectedChoice));
                                scopeObj.view.lblOccurenceMobile.text = kony.i18n.getLocalizedString("i18n.Transfers.Daily") + ": ";
                                scopeObj.view.lblSelectionMobile.text = longMonths[index] + ", " + scopeObj.view.calendarWidget.lblYear.text;
                            } else {
                                index = longMonths.findIndex(element => element.includes(scopeObj.selectedChoice));
                                scopeObj.view.lblOccurence.text = kony.i18n.getLocalizedString("i18n.Transfers.Daily") + ": ";
                                scopeObj.view.lblSelection.text = longMonths[index] + ", " + scopeObj.view.calendarWidget.lblYear.text;
                            }
                            break;
                        }
                }
                var inputPayLoad = this.getCashPositionRequestData();
                this.cashPositionRequestdata = inputPayLoad;
                this.loadCashposition(inputPayLoad);
                this.lastSelectedTab = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? this.view.lblOccurenceMobile.text : this.view.lblOccurence.text;
                this.lastSelectedTab = this.lastSelectedTab.substr(0, this.lastSelectedTab.length - 2);
                isCalendarDropDownOpen = false;
                this.view.flxSelectYears.setActive(true);
            }.bind(this);
            this.view.calendarWidget.flxCancel.onClick = function() {
                this.view.flxCalendar.setVisibility(false);
                isCalendarDropDownOpen = false;
                this.view.flxSelectYears.setActive(true);
            }.bind(this)
            this.view.flxCalendar.setVisibility(visible);
            this.yearsDropDownAccessibility();
            this.yearsDropDownNewMobileAccessibility();
        },
        yearsDropDownAccessibility: function() {
            if (this.view.flxCalendar.isVisible === true) {
                this.view.flxSelectYears.accessibilityConfig = {
                    a11yARIA: {
                        "aria-expanded": true,
                        "role": "button",
                        "aria-labelledby": "lblSelection"
                    },
                }
            }
            if (this.view.flxCalendar.isVisible === false) {
                this.view.flxSelectYears.accessibilityConfig = {
                    a11yARIA: {
                        "aria-expanded": false,
                        "role": "button",
                        "aria-labelledby": "lblSelection"
                    },
                }
            }
        },
        yearsDropDownNewMobileAccessibility: function() {
            if (this.view.flxCalendar.isVisible === true) {
                this.view.flxYearsDropDownNewMobile.accessibilityConfig = {
                    a11yARIA: {
                        "aria-expanded": true,
                        "role": "button",
                        "aria-labelledby": "lblSelectionMobile"
                    },
                }
            }
            if (this.view.flxCalendar.isVisible === false) {
                this.view.flxYearsDropDownNewMobile.accessibilityConfig = {
                    a11yARIA: {
                        "aria-expanded": false,
                        "role": "button",
                        "aria-labelledby": "lblSelectionMobile"
                    },
                }
            }
        },
        onClickYearlyTab: function() {
            var unselectedLblSkin = "sknLblSSP4242429Px";
            var selectedLblSkin = "sknLblSSPFFFFFF9Px";
            var unselectedFlxSkin = "slFBox";
            var selectedFlxSkin = "ICSknFlx003e75Bg";
            this.numSelected = 0;
            this.selectedChoice = [];
            this.view.calendarWidget.lblFromYearValue.text = "-";
            this.view.calendarWidget.lblToYearValue.text = "-";
            if (this.lastSelectedTab === "Yearly") {
                var selection = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? this.view.lblSelectionMobile.text : this.view.lblSelection.text;
                var splitStr = selection.split('-');
                this.view.calendarWidget.lblFromYearValue.text = splitStr[0].substring(0, 4);
                this.view.calendarWidget.lblToYearValue.text = splitStr[1].substring(1, 5);
            }
            this.view.calendarWidget.flxYearly.skin = selectedFlxSkin;
            this.view.calendarWidget.lblYearly.skin = selectedLblSkin;
            this.view.calendarWidget.flxMonthly.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblMonthly.skin = unselectedLblSkin;
            this.view.calendarWidget.flxWeekly.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblWeekly.skin = unselectedLblSkin;
            this.view.calendarWidget.flxDaily.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblDaily.skin = unselectedLblSkin;
            this.view.calendarWidget.flxYear.setVisibility(false);
            this.view.calendarWidget.flxYearRange.setVisibility(true);
            this.selectedTab = "Yearly";
            this.setYearsData();
        },
        onClickMonthlyTab: function() {
            var unselectedLblSkin = "sknLblSSP4242429Px";
            var selectedLblSkin = "sknLblSSPFFFFFF9Px";
            var unselectedFlxSkin = "slFBox";
            var selectedFlxSkin = "ICSknFlx003e75Bg";
            var selectedYear;
            selectedYear = new Date().getFullYear().toString()
            if (this.lastSelectedTab === "Monthly") {
                var selection = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? this.view.lblSelectionMobile.text : this.view.lblSelection.text;
                selectedYear = selection;
                this.view.calendarWidget.lblYear.text = selectedYear;
            } else {
                var selection = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? this.view.lblSelectionMobile.text : this.view.lblSelection.text;
                selectedYear = selection.substring(selection.length - 4, selection.length);
            }
            this.view.calendarWidget.lblYear.text = selectedYear;
            this.numSelected = 0;
            this.selectedChoice = [];
            this.view.calendarWidget.flxYearly.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblYearly.skin = unselectedLblSkin;
            this.view.calendarWidget.flxMonthly.skin = selectedFlxSkin;
            this.view.calendarWidget.lblMonthly.skin = selectedLblSkin;
            this.view.calendarWidget.flxWeekly.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblWeekly.skin = unselectedLblSkin;
            this.view.calendarWidget.flxDaily.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblDaily.skin = unselectedLblSkin;
            this.view.calendarWidget.flxYear.setVisibility(true);
            this.view.calendarWidget.flxYearRange.setVisibility(false);
            this.selectedTab = "Monthly";
            this.setYearsData();
        },
        onClickWeeklyTab: function() {
            var unselectedLblSkin = "sknLblSSP4242429Px";
            var selectedLblSkin = "sknLblSSPFFFFFF9Px";
            var unselectedFlxSkin = "slFBox";
            var selectedFlxSkin = "ICSknFlx003e75Bg";
            var selectedYear;
            var selectedMonth;
            selectedYear = new Date().getFullYear().toString();
            selectedMonth = new Date().toLocaleString('default', {
                month: 'short'
            });
            if (this.lastSelectedTab === "Weekly" || this.lastSelectedTab === "Daily") {
                var selection = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? this.view.lblSelectionMobile.text : this.view.lblSelection.text;
                var splitSel = selection.split(',');
                selectedMonth = splitSel[0];
                selectedYear = splitSel[1].trim();
            }
            this.numSelected = 0;
            this.selectedChoice = [];
            this.selectedChoice.push(selectedMonth);
            this.view.calendarWidget.lblYear.text = selectedYear;
            this.view.calendarWidget.flxYearly.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblYearly.skin = unselectedLblSkin;
            this.view.calendarWidget.flxMonthly.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblMonthly.skin = unselectedLblSkin;
            this.view.calendarWidget.flxWeekly.skin = selectedFlxSkin;
            this.view.calendarWidget.lblWeekly.skin = selectedLblSkin;
            this.view.calendarWidget.flxDaily.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblDaily.skin = unselectedLblSkin;
            this.view.calendarWidget.flxYear.setVisibility(true);
            this.view.calendarWidget.flxYearRange.setVisibility(false);
            this.selectedTab = "Weekly";
            this.setMonthsData();
        },
        onClickDailyTab: function() {
            var unselectedLblSkin = "sknLblSSP4242429Px";
            var selectedLblSkin = "sknLblSSPFFFFFF9Px";
            var unselectedFlxSkin = "slFBox";
            var selectedFlxSkin = "ICSknFlx003e75Bg";
            var selectedYear;
            var selectedMonth;
            selectedYear = new Date().getFullYear().toString();
            selectedMonth = new Date().toLocaleString('default', {
                month: 'short'
            });
            if (this.lastSelectedTab === "Daily" || this.lastSelectedTab === "Weekly") {
                var selection = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? this.view.lblSelectionMobile.text : this.view.lblSelection.text;
                var splitSel = selection.split(',');
                selectedMonth = splitSel[0];
                selectedYear = splitSel[1].trim();
            }
            this.numSelected = 0;
            this.selectedChoice = [];
            this.selectedChoice.push(selectedMonth);
            this.view.calendarWidget.lblYear.text = selectedYear;
            this.view.calendarWidget.flxYearly.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblYearly.skin = unselectedLblSkin;
            this.view.calendarWidget.flxMonthly.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblMonthly.skin = unselectedLblSkin;
            this.view.calendarWidget.flxWeekly.skin = unselectedFlxSkin;
            this.view.calendarWidget.lblWeekly.skin = unselectedLblSkin;
            this.view.calendarWidget.flxDaily.skin = selectedFlxSkin;
            this.view.calendarWidget.lblDaily.skin = selectedLblSkin;
            this.view.calendarWidget.flxYear.setVisibility(true);
            this.view.calendarWidget.flxYearRange.setVisibility(false);
            this.selectedTab = "Daily";
            this.setMonthsData();
        },
        setYearsData: function() {
            var rowData = [];
            var currentYear = new Date().getFullYear();
            var selection = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? this.view.lblSelectionMobile.text : this.view.lblSelection.text;
            for (i = 2001; i <= currentYear; i = i + 4) {
                var row;
                if (this.selectedTab === "Monthly") {
                    selection = this.view.calendarWidget.lblYear.text;
                    this.selectedChoice.push(this.view.calendarWidget.lblYear.text);
                    if (i + 3 <= currentYear) {
                        row = {
                            "selectedOne": false,
                            "selectedTwo": false,
                            "selectedThree": false,
                            "selectedFour": false,
                            "btnChoice1": {
                                "text": i.toString(),
                                "skin": selection.includes(i.toString()) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice1(segInfo);
                                }.bind(this)
                            },
                            "btnChoice2": {
                                "text": (i + 1).toString(),
                                "skin": selection.includes((i + 1).toString()) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice2(segInfo);
                                }.bind(this)
                            },
                            "btnChoice3": {
                                "text": (i + 2).toString(),
                                "skin": selection.includes((i + 2).toString()) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice3(segInfo);
                                }.bind(this)
                            },
                            "btnChoice4": {
                                "text": (i + 3).toString(),
                                "skin": selection.includes((i + 3).toString()) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onTouchEnd": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice4(segInfo);
                                }.bind(this)
                            },
                        };
                    } else if (i + 2 <= currentYear) {
                        row = {
                            "selectedOne": false,
                            "selectedTwo": false,
                            "selectedThree": false,
                            "selectedFour": false,
                            "btnChoice1": {
                                "text": i.toString(),
                                "skin": selection.includes(i.toString()) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice1(segInfo);
                                }.bind(this)
                            },
                            "btnChoice2": {
                                "text": (i + 1).toString(),
                                "skin": selection.includes((i + 1).toString()) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice2(segInfo);
                                }.bind(this)
                            },
                            "btnChoice3": {
                                "text": (i + 2).toString(),
                                "skin": selection.includes((i + 2).toString()) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice3(segInfo);
                                }.bind(this)
                            },
                            "btnChoice4": {
                                "isVisible": false
                            },
                        };
                    } else if (i + 1 <= currentYear) {
                        row = {
                            "selectedOne": false,
                            "selectedTwo": false,
                            "selectedThree": false,
                            "selectedFour": false,
                            "btnChoice1": {
                                "text": i.toString(),
                                "skin": selection.includes(i.toString()) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice1(segInfo);
                                }.bind(this)
                            },
                            "btnChoice2": {
                                "text": (i + 1).toString(),
                                "skin": selection.includes((i + 1).toString()) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice2(segInfo);
                                }.bind(this)
                            },
                            "btnChoice3": {
                                "isVisible": false
                            },
                            "btnChoice4": {
                                "isVisible": false
                            },
                        };
                    } else if (i <= currentYear) {
                        row = {
                            "selectedOne": false,
                            "selectedTwo": false,
                            "selectedThree": false,
                            "selectedFour": false,
                            "btnChoice1": {
                                "text": i.toString(),
                                "skin": selection.includes(i.toString()) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice1(segInfo);
                                }.bind(this)
                            },
                            "btnChoice2": {
                                "isVisible": false
                            },
                            "btnChoice3": {
                                "isVisible": false
                            },
                            "btnChoice4": {
                                "isVisible": false
                            },
                        };
                    }
                }
                if (this.selectedTab === "Yearly") {
                    if (this.view.calendarWidget.lblFromYearValue.text === "-")
                        if (selection.substring(selection.length - 4, selection.length) === new Date().getFullYear().toString()) {
                            this.view.calendarWidget.lblFromYearValue.text = (new Date().getFullYear() - 1).toString();
                            this.view.calendarWidget.lblToYearValue.text = new Date().getFullYear().toString();
                        } else {
                            this.view.calendarWidget.lblFromYearValue.text = selection.substring(selection.length - 4, selection.length);
                            this.view.calendarWidget.lblToYearValue.text = new Date().getFullYear().toString();
                        }
                    this.selectedChoice.push(this.view.calendarWidget.lblFromYearValue.text);
                    this.selectedChoice.push(this.view.calendarWidget.lblToYearValue.text);
                    if (i + 3 <= currentYear) {
                        row = {
                            "selectedOne": false,
                            "selectedTwo": false,
                            "selectedThree": false,
                            "selectedFour": false,
                            "btnChoice1": {
                                "text": i.toString(),
                                "skin": this.view.calendarWidget.lblFromYearValue.text === i.toString() || this.view.calendarWidget.lblToYearValue.text === i.toString() ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice1(segInfo);
                                }.bind(this)
                            },
                            "btnChoice2": {
                                "text": (i + 1).toString(),
                                "skin": this.view.calendarWidget.lblFromYearValue.text === (i + 1).toString() || this.view.calendarWidget.lblToYearValue.text === (i + 1).toString() ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice2(segInfo);
                                }.bind(this)
                            },
                            "btnChoice3": {
                                "text": (i + 2).toString(),
                                "skin": this.view.calendarWidget.lblFromYearValue.text === (i + 2).toString() || this.view.calendarWidget.lblToYearValue.text === (i + 2).toString() ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice3(segInfo);
                                }.bind(this)
                            },
                            "btnChoice4": {
                                "text": (i + 3).toString(),
                                "skin": this.view.calendarWidget.lblFromYearValue.text === (i + 3).toString() || this.view.calendarWidget.lblToYearValue.text === (i + 3).toString() ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice4(segInfo);
                                }.bind(this)
                            },
                        };
                    } else if (i + 2 <= currentYear) {
                        row = {
                            "selectedOne": false,
                            "selectedTwo": false,
                            "selectedThree": false,
                            "selectedFour": false,
                            "btnChoice1": {
                                "text": i.toString(),
                                "skin": this.view.calendarWidget.lblFromYearValue.text === i.toString() || this.view.calendarWidget.lblToYearValue.text === i.toString() ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice1(segInfo);
                                }.bind(this)
                            },
                            "btnChoice2": {
                                "text": (i + 1).toString(),
                                "skin": this.view.calendarWidget.lblFromYearValue.text === (i + 1).toString() || this.view.calendarWidget.lblToYearValue.text === (i + 1).toString() ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice2(segInfo);
                                }.bind(this)
                            },
                            "btnChoice3": {
                                "text": (i + 2).toString(),
                                "skin": this.view.calendarWidget.lblFromYearValue.text === (i + 2).toString() || this.view.calendarWidget.lblToYearValue.text === (i + 2).toString() ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice3(segInfo);
                                }.bind(this)
                            },
                            "btnChoice4": {
                                "isVisible": false
                            },
                        };
                    } else if (i + 1 <= currentYear) {
                        row = {
                            "selectedOne": false,
                            "selectedTwo": false,
                            "selectedThree": false,
                            "selectedFour": false,
                            "btnChoice1": {
                                "text": i.toString(),
                                "skin": this.view.calendarWidget.lblFromYearValue.text === i.toString() || this.view.calendarWidget.lblToYearValue.text === i.toString() ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice1(segInfo);
                                }.bind(this)
                            },
                            "btnChoice2": {
                                "text": (i + 1).toString(),
                                "skin": this.view.calendarWidget.lblFromYearValue.text === (i + 1).toString() || this.view.calendarWidget.lblToYearValue.text === (i + 1).toString() ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice2(segInfo);
                                }.bind(this)
                            },
                            "btnChoice3": {
                                "isVisible": false
                            },
                            "btnChoice4": {
                                "isVisible": false
                            },
                        };
                    } else if (i <= currentYear) {
                        row = {
                            "selectedOne": false,
                            "selectedTwo": false,
                            "selectedThree": false,
                            "selectedFour": false,
                            "btnChoice1": {
                                "text": i.toString(),
                                "skin": this.view.calendarWidget.lblFromYearValue.text === i.toString() || this.view.calendarWidget.lblToYearValue.text === i.toString() ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                                "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                    this.onSelectChoice1(segInfo);
                                }.bind(this)
                            },
                            "btnChoice2": {
                                "isVisible": false
                            },
                            "btnChoice3": {
                                "isVisible": false
                            },
                            "btnChoice4": {
                                "isVisible": false
                            },
                        };
                    }
                }
                rowData.push(row);
            }
            this.view.calendarWidget.segChoices.setData(rowData);
        },
        setMonthsData: function() {
            var rowData = [];
            var currentYear = new Date().getFullYear();
            var selection = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? this.view.lblSelectionMobile.text : this.view.lblSelection.text;
            var currentMonth = new Date().toLocaleString('default', {
                month: 'short'
            });
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var j = months.indexOf(currentMonth);
            for (i = 0; i < 12; i = i + 4) {
                if (this.view.calendarWidget.lblYear.text === currentYear.toString()) {
                    var row = {
                        "selectedOne": false,
                        "selectedTwo": false,
                        "selectedThree": false,
                        "selectedFour": false,
                        "btnChoice1": {
                            "text": j >= i ? months[i] : "",
                            "skin": selection.includes(months[i]) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                            "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                this.onSelectChoice1(segInfo);
                            }.bind(this)
                        },
                        "btnChoice2": {
                            "text": j >= i + 1 ? months[i + 1] : "",
                            "skin": selection.includes(months[i + 1]) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                            "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                this.onSelectChoice2(segInfo);
                            }.bind(this)
                        },
                        "btnChoice3": {
                            "text": j >= i + 2 ? months[i + 2] : "",
                            "skin": selection.includes(months[i + 2]) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                            "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                this.onSelectChoice3(segInfo);
                            }.bind(this)
                        },
                        "btnChoice4": {
                            "text": j >= i + 3 ? months[i + 3] : "",
                            "skin": selection.includes(months[i + 3]) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                            "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                this.onSelectChoice4(segInfo);
                            }.bind(this)
                        },
                    };
                } else {
                    var row = {
                        "selectedOne": false,
                        "selectedTwo": false,
                        "selectedThree": false,
                        "selectedFour": false,
                        "btnChoice1": {
                            "text": months[i],
                            "skin": selection.includes(months[i]) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                            "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                this.onSelectChoice1(segInfo);
                            }.bind(this)
                        },
                        "btnChoice2": {
                            "text": months[i + 1],
                            "skin": selection.includes(months[i + 1]) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                            "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                this.onSelectChoice2(segInfo);
                            }.bind(this)
                        },
                        "btnChoice3": {
                            "text": months[i + 2],
                            "skin": selection.includes(months[i + 2]) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                            "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                this.onSelectChoice3(segInfo);
                            }.bind(this)
                        },
                        "btnChoice4": {
                            "text": months[i + 3],
                            "skin": selection.includes(months[i + 3]) ? "btnsknSSPFFFFFF15PxBg003E75" : "btnsknBBSSP72727215px",
                            "onClick": function(eventobject, segInfo, xcoord, ycoord, context) {
                                this.onSelectChoice4(segInfo);
                            }.bind(this)
                        },
                    };
                }
                rowData.push(row);
            }
            this.view.calendarWidget.segChoices.setData(rowData);
        },
        onSelectChoice1: function(context, segInfo) {
            if (this.selectedTab !== "Yearly") this.selectedChoice = [];
            var data = this.view.calendarWidget.segChoices.data;
            var rowDataTobeUpdated;
            var selectedRowIndex = context.rowIndex;
            if (this.selectedTab !== "Yearly" || (this.selectedTab === "Yearly" && this.numSelected % 2 !== 1)) {
                for (i = 0; i < data.length; i++) {
                    data[i]["btnChoice1"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice2"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice3"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice4"]["skin"] = "btnsknBBSSP72727215px";
                    rowDataTobeUpdated = data[i];
                    this.view.calendarWidget.segChoices.setDataAt(rowDataTobeUpdated, i, 0);
                }
            }
            if (this.selectedTab === "Yearly" && this.numSelected % 2 === 1) {
                this.view.calendarWidget.lblToYearValue.text = data[selectedRowIndex]["btnChoice1"]["text"];
                this.selectedChoice.push({
                    row: selectedRowIndex,
                    column: 1
                });
                this.numSelected++;
            } else if (this.selectedTab === "Yearly" && this.numSelected % 2 === 0) {
                this.view.calendarWidget.lblFromYearValue.text = data[selectedRowIndex]["btnChoice1"]["text"];
                this.view.calendarWidget.lblToYearValue.text = "-";
                this.selectedChoice.push({
                    row: selectedRowIndex,
                    column: 1
                });
                this.numSelected++;
            }
            if (this.selectedTab !== "Yearly") {
                this.selectedChoice.push(data[selectedRowIndex]["btnChoice1"]["text"]);
            }
            if (this.selectedTab === "Monthly") this.view.calendarWidget.lblYear.text = data[selectedRowIndex]["btnChoice1"]["text"];
            data[selectedRowIndex]["selectedOne"] = true;
            data[selectedRowIndex]["selectedTwo"] = false;
            data[selectedRowIndex]["selectedThree"] = false;
            data[selectedRowIndex]["selectedFour"] = false;
            data[selectedRowIndex]["btnChoice1"]["skin"] = "ICSknBtn003E7515PXBrd3PX";
            rowDataTobeUpdated = data[selectedRowIndex];
            rowDataTobeUpdated["btnChoice1"] = data[selectedRowIndex]["btnChoice1"];
            this.view.calendarWidget.segChoices.setDataAt(rowDataTobeUpdated, selectedRowIndex, 0);
        },
        onSelectChoice2: function(context) {
            if (this.selectedTab !== "Yearly") this.selectedChoice = [];
            var data = this.view.calendarWidget.segChoices.data;
            var rowDataTobeUpdated;
            var selectedRowIndex = context.rowIndex;
            if (this.selectedTab !== "Yearly" || (this.selectedTab === "Yearly" && this.numSelected % 2 !== 1)) {
                for (i = 0; i < data.length; i++) {
                    data[i]["btnChoice1"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice2"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice3"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice4"]["skin"] = "btnsknBBSSP72727215px";
                    rowDataTobeUpdated = data[i];
                    this.view.calendarWidget.segChoices.setDataAt(rowDataTobeUpdated, i, 0);
                }
            }
            if (this.selectedTab === "Yearly" && this.numSelected % 2 === 1) {
                this.view.calendarWidget.lblToYearValue.text = data[selectedRowIndex]["btnChoice2"]["text"];
                this.selectedChoice.push({
                    row: selectedRowIndex,
                    column: 1
                });
                this.numSelected++;
            } else if (this.selectedTab === "Yearly" && this.numSelected % 2 === 0) {
                this.view.calendarWidget.lblFromYearValue.text = data[selectedRowIndex]["btnChoice2"]["text"];
                this.view.calendarWidget.lblToYearValue.text = "-";
                this.selectedChoice.push({
                    row: selectedRowIndex,
                    column: 1
                });
                this.numSelected++;
            }
            if (this.selectedTab !== "Yearly") {
                this.selectedChoice.push(data[selectedRowIndex]["btnChoice2"]["text"]);
            }
            if (this.selectedTab === "Monthly") this.view.calendarWidget.lblYear.text = data[selectedRowIndex]["btnChoice2"]["text"];
            data[selectedRowIndex]["selectedOne"] = false;
            data[selectedRowIndex]["selectedTwo"] = true;
            data[selectedRowIndex]["selectedThree"] = false;
            data[selectedRowIndex]["selectedFour"] = false;
            data[selectedRowIndex]["btnChoice2"]["skin"] = "ICSknBtn003E7515PXBrd3PX";
            rowDataTobeUpdated = data[selectedRowIndex];
            rowDataTobeUpdated["btnChoice2"] = data[selectedRowIndex]["btnChoice2"];
            this.view.calendarWidget.segChoices.setDataAt(rowDataTobeUpdated, selectedRowIndex, 0);
        },
        onSelectChoice3: function(context) {
            if (this.selectedTab !== "Yearly") this.selectedChoice = [];
            var rowDataTobeUpdated;
            var data = this.view.calendarWidget.segChoices.data;
            var selectedRowIndex = context.rowIndex;
            if (this.selectedTab !== "Yearly" || (this.selectedTab === "Yearly" && this.numSelected % 2 !== 1)) {
                for (i = 0; i < data.length; i++) {
                    data[i]["btnChoice1"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice2"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice3"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice4"]["skin"] = "btnsknBBSSP72727215px";
                    rowDataTobeUpdated = data[i];
                    this.view.calendarWidget.segChoices.setDataAt(rowDataTobeUpdated, i, 0);
                }
            }
            if (this.selectedTab === "Yearly" && this.numSelected % 2 === 1) {
                this.view.calendarWidget.lblToYearValue.text = data[selectedRowIndex]["btnChoice3"]["text"];
                this.selectedChoice.push({
                    row: selectedRowIndex,
                    column: 1
                });
                this.numSelected++;
            } else if (this.selectedTab === "Yearly" && this.numSelected % 2 === 0) {
                this.view.calendarWidget.lblFromYearValue.text = data[selectedRowIndex]["btnChoice3"]["text"];
                this.view.calendarWidget.lblToYearValue.text = "-";
                this.selectedChoice.push({
                    row: selectedRowIndex,
                    column: 1
                });
                this.numSelected++;
            }
            if (this.selectedTab !== "Yearly") {
                this.selectedChoice.push(data[selectedRowIndex]["btnChoice3"]["text"]);
            }
            if (this.selectedTab === "Monthly") this.view.calendarWidget.lblYear.text = data[selectedRowIndex]["btnChoice3"]["text"];
            data[selectedRowIndex]["selectedOne"] = false;
            data[selectedRowIndex]["selectedTwo"] = false;
            data[selectedRowIndex]["selectedThree"] = true;
            data[selectedRowIndex]["selectedFour"] = false;
            data[selectedRowIndex]["btnChoice3"]["skin"] = "ICSknBtn003E7515PXBrd3PX";
            rowDataTobeUpdated = data[selectedRowIndex];
            rowDataTobeUpdated["btnChoice3"] = data[selectedRowIndex]["btnChoice3"];
            this.view.calendarWidget.segChoices.setDataAt(rowDataTobeUpdated, selectedRowIndex, 0);
        },
        onSelectChoice4: function(context) {
            if (this.selectedTab !== "Yearly") this.selectedChoice = [];
            var data = this.view.calendarWidget.segChoices.data;
            var rowDataTobeUpdated;
            var selectedRowIndex = context.rowIndex;
            if (this.selectedTab !== "Yearly" || (this.selectedTab === "Yearly" && this.numSelected % 2 !== 1)) {
                for (i = 0; i < data.length; i++) {
                    data[i]["btnChoice1"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice2"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice3"]["skin"] = "btnsknBBSSP72727215px";
                    data[i]["btnChoice4"]["skin"] = "btnsknBBSSP72727215px";
                    rowDataTobeUpdated = data[i];
                    this.view.calendarWidget.segChoices.setDataAt(rowDataTobeUpdated, i, 0);
                }
            }
            if (this.selectedTab === "Yearly" && this.numSelected % 2 === 1) {
                this.view.calendarWidget.lblToYearValue.text = data[selectedRowIndex]["btnChoice4"]["text"];
                this.selectedChoice.push({
                    row: selectedRowIndex,
                    column: 1
                });
                this.numSelected++;
            } else if (this.selectedTab === "Yearly" && this.numSelected % 2 === 0) {
                this.view.calendarWidget.lblFromYearValue.text = data[selectedRowIndex]["btnChoice4"]["text"];
                this.view.calendarWidget.lblToYearValue.text = "-";
                this.selectedChoice.push({
                    row: selectedRowIndex,
                    column: 1
                });
                this.numSelected++;
            }
            if (this.selectedTab !== "Yearly") {
                this.selectedChoice.push(data[selectedRowIndex]["btnChoice4"]["text"]);
            }
            if (this.selectedTab === "Monthly") this.view.calendarWidget.lblYear.text = data[selectedRowIndex]["btnChoice4"]["text"];
            data[selectedRowIndex]["selectedOne"] = false;
            data[selectedRowIndex]["selectedTwo"] = false;
            data[selectedRowIndex]["selectedThree"] = false;
            data[selectedRowIndex]["selectedFour"] = true;
            data[selectedRowIndex]["btnChoice4"]["skin"] = "ICSknBtn003E7515PXBrd3PX";
            rowDataTobeUpdated = data[selectedRowIndex];
            rowDataTobeUpdated["btnChoice4"] = data[selectedRowIndex]["btnChoice4"];
            this.view.calendarWidget.segChoices.setDataAt(rowDataTobeUpdated, selectedRowIndex, 0);
        },
        /*
                  Method to show accounts drop down
                */
        showAccountsDropDown: function() {
            
            this.view.flxDurationList.setVisibility(false);
            
            if (!this.view.flxAccountList.isVisible) {
                this.view.imgAccountsDropdownMobile.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                this.view.imgAccountsDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                this.view.flxAccountList.setVisibility(true);
            } else {
                this.view.imgAccountsDropdownMobile.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                this.view.imgAccountsDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                 this.view.flxAccountList.setVisibility(false);
            }
            
            this.allAccountsAccessibility();
            this.allAccountsMobileAccessibility();
            this.view.flxSelectAccounts.setActive(true);
        },
        allAccountsAccessibility: function() {
            if (this.view.flxAccountList.isVisible === true) {
                this.view.flxSelectAccounts.accessibilityConfig = {
                    a11yARIA: {
                        "aria-expanded": true,
                        "role": "button",
                        "aria-labelledby": "btnSelectAccounts"
                    },
                }
            }
            if (this.view.flxAccountList.isVisible === false) {
                this.view.flxSelectAccounts.accessibilityConfig = {
                    a11yARIA: {
                        "aria-expanded": false,
                        "role": "button",
                        "aria-labelledby": "btnSelectAccounts"
                    },
                }
            }
        },
        allAccountsMobileAccessibility: function() {
            if (this.view.flxAccountList.isVisible === true) {
                this.view.flxSelectAccountsMobile.accessibilityConfig = {
                    a11yARIA: {
                        "aria-expanded": true,
                        "role": "button",
                        "aria-labelledby": "btnSelectAccountsMobile"
                    },
                }
            }
            if (this.view.flxAccountList.isVisible === false) {
                this.view.flxSelectAccountsMobile.accessibilityConfig = {
                    a11yARIA: {
                        "aria-expanded": false,
                        "role": "button",
                        "aria-labelledby": "btnSelectAccountsMobile"
                    },
                }
            }
        },
        /*
                  Method to fetch cash position on duration type drop down click
                */
        fetchCashPositionByDurationOnRowClick: function(seguiWidget, sectionNumber, rowNumber, selectedState) {
            var selectedRow = this.view.durationListMenu.segAccountListActions.selectedRowItems[sectionNumber];
            var duration = selectedRow.lblUsers;
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            this.view.imgYearsDropDown.text = 'c';
            this.view.imgYearsDropDownMobile.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            if (currBreakpoint === 640) {
                this.view.btnSelectYearsMobile.text = duration;
            } else {
                this.view.btnSelectYears.text = duration;
            }
            var inputPayLoad = this.getCashPositionRequestData();
            this.loadCashposition(inputPayLoad);
            /* close the flex duration segment */
            this.view.flxDurationList.setVisibility(false);
        },
        /*
                  Method to fetch cash position on account type drop down click
                */
        fetchCashPositionByAccountTypeOnRowClick: function(context) { //seguiWidget, sectionNumber, rowNumber, selectedState) {
            var data = this.view.selectAccountList.segAccountListActions.data;
            var selectedRow = this.view.selectAccountList.segAccountListActions.selectedRowIndex[1];
            // var selectedRow = context.rowIndex;
            var accountType = data[selectedRow].lblUsers.text;
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            data.forEach(function(rowItem) {
                rowItem["lblRadioButton"]["text"] = "L";
                rowItem["lblRadioButton"]["skin"] = "sknLblOlbFontIconsA0A0A014Px";
                rowItem["flxSelectAccountList"].accessibilityConfig={
                        "a11yARIA": {
                            "role": "radio",
                            "aria-checked": false,
                            "aria-labelledby":"lblUsers"
                        }
                }
            });
            data[selectedRow]["lblRadioButton"]["text"] = "M";
            data[selectedRow]["lblRadioButton"]["skin"] = "sknLblOlbFontIcons003E7514Px";
              data[selectedRow]["flxSelectAccountList"].accessibilityConfig={
                "a11yARIA": {
                    "role": "radio",
                    "aria-checked": true,
                    "aria-labelledby":"lblUsers"
                }
        }
            this.view.selectAccountList.segAccountListActions.setData(data);
            this.view.imgAccountsDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            this.view.imgAccountsDropdownMobile.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            if (currBreakpoint === 640) {
                this.view.btnSelectAccountsMobile.text = accountType;
            } else {
                this.view.btnSelectAccounts.text = accountType;
            }
            var inputPayLoad = this.getCashPositionRequestData();
            this.loadCashposition(inputPayLoad);
            /* close the flex accounts segment */
            this.showAccountsDropDown();
            this.view.flxSelectAccounts.setActive(true);
            this.allAccountsMobileAccessibility();
            this.allAccountsAccessibility();
        },
        /*
                  Method to form the request data based on duration and account type selected from the dropdown
                */
        getCashPositionRequestData: function() {
            var currentYear = new Date().getFullYear();
            var inputPayLoad = {
                "Type": "Daily",
                "startYear": "",
                "endYear": currentYear.toString(),
                "month": new Date().toLocaleString('default', {
                    month: 'short'
                }),
                "AccountType": BBConstants.ALL
            };
            var Type = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? this.view.lblOccurenceMobile.text : this.view.lblOccurence.text;
            var accountType;
            var startYear;
            var endYear;
            var month;
            var splitType = Type.split(":");
            Type = splitType[0];
            if (kony.application.getCurrentBreakpoint() === 640) {
                //duration = this.view.btnSelectAccountsMobile.text;
                accountType = this.view.btnSelectYearsMobile.text;
            } else {
                //duration = this.view.btnSelectYears.text;
                accountType = this.view.btnSelectAccounts.text;
            }
            if (Type === kony.i18n.getLocalizedString("i18n.Transfers.Daily")) {
                inputPayLoad.Type = BBConstants.DAILY;
            } else if (Type === kony.i18n.getLocalizedString("i18n.Transfers.Weekly")) {
                inputPayLoad.Type = BBConstants.WEEKLY;
            } else if (Type === kony.i18n.getLocalizedString("i18n.Transfers.Monthly")) {
                inputPayLoad.Type = BBConstants.MONTHLY;
            } else if (Type === kony.i18n.getLocalizedString("i18n.Transfers.Yearly")) {
                inputPayLoad.Type = BBConstants.YEARLY;
            }
            if (accountType === kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")) {
                inputPayLoad.AccountType = BBConstants.ALL;
            } else {
                inputPayLoad.AccountType = accountType;
            }
            if (this.selectedChoice && (Type === "Daily" || Type === "Weekly")) {
                inputPayLoad.month = this.selectedChoice[0].substr(0, 3);
                inputPayLoad.endYear = this.view.calendarWidget.lblYear.text;
                inputPayLoad.startYear = "";
            } else if (Type === "Monthly") {
                inputPayLoad.endYear = this.view.calendarWidget.lblYear.text;
                inputPayLoad.month = "";
                inputPayLoad.startYear = "";
            } else if (Type === "Yearly") {
                inputPayLoad.startYear = this.view.calendarWidget.lblFromYearValue.text;
                inputPayLoad.endYear = this.view.calendarWidget.lblToYearValue.text;
            }
            return inputPayLoad;
        },
        showAlertCashPositionChart: function(data) {
            /* if the service call fails hide the chart flex*/
            this.view.flxMainChartCon.setVisibility(false);
            /*and show the error flex and the message*/
            var visible = this.view.flxErrorMessage.isVisible ? false : true;
            this.view.flxErrorMessage.setVisibility(visible);
            if (!kony.sdk.isNullOrUndefined(data.errorMessage)) this.view.lblCashPositErrorMionessage.text = data.errorMessage;
            else this.view.flxMyCashPosition.setVisibility(false);
            FormControllerUtility.hideProgressBar(this.view);
            this.AdjustScreen();
        },
        populateCashPositionChart: function(data) {
            var totalCredit = 0;
            var totalDebit = 0;
            var totalBalance = 0;
            /*if the service call succeeds hide the error flex regardless*/
            this.view.flxErrorMessage.setVisibility(false);
            /* to hide the legends of cash position chart */
            this.view.flxLegends.setVisibility(false);
            //Initializing cash position chart widgets
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.flxSelectYearsNewMobile.setVisibility(true);
                this.view.flxSelectAccountsMobile.setVisibility(true);
                this.view.flxSelectYears.setVisibility(false);
                this.view.flxSelectAccounts.setVisibility(false);
                if (this.profileAccess === "both") this.view.flxUserTypeIcon.setVisibility(true);
                else {
                    this.view.flxUserTypeIcon.setVisibility(false);
                    this.view.lblMyChartHeader.left = "2.5%";
                }
                this.view.flxYearsDropDownNewMobile.onClick = this.showDurationDropDown;
                //         this.view.flxYearsDropDownMobile.onTouchEnd = function() {
                //           if (this.view.flxDurationList.isVisible) {
                //             this.view.flxDurationList.origin = true;
                //             if (kony.application.getCurrentBreakpoint() === 640 || kony.application.getCurrentBreakpoint() === 1024) {
                //               this.view.imgYearsDropDownMobile.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                //               this.view.imgYearsDropDown.text = 'c';
                //               this.view.flxDurationList.setVisibility(false);
                //               this.AdjustScreen();
                //             }
                //           }
                //         }.bind(this);
                this.view.flxSelectAccountsMobileDropDown.onClick = this.showAccountsDropDown;
                
            } else {
                this.view.flxSelectYearsNewMobile.setVisibility(false);
                this.view.flxSelectAccountsMobile.setVisibility(false);
                this.view.flxSelectYears.setVisibility(true);
                this.view.flxSelectAccounts.setVisibility(true);
                if (this.profileAccess === "both") this.view.flxUserTypeIcon.setVisibility(true);
                else {
                    this.view.flxUserTypeIcon.setVisibility(false);
                    this.view.lblMyChartHeader.left = "2.5%";
                }
                this.view.flxSelectYears.onClick = this.showDurationDropDown;
                this.view.flxSelectAccounts.onClick = this.showAccountsDropDown;
            }
            this.view.flxLegendCredits.onClick = this.onClickCreditCashPosition;
            this.view.flxLegendDebits.onClick = this.onClickDebitCashPosition;
            this.view.flxLegendBalance.onClick = this.onClickTotalBalanceCashPosition;
            //       this.view.selectAccountList.segAccountListActions.onRowClick = this.fetchCashPositionByAccountTypeOnRowClick;
            //       this.setCashPositionFilterData();
            var maxValue;
            data.forEach(function(item) {
                totalCredit = totalCredit + item.label1;
                totalDebit = totalDebit + item.label2;
                totalBalance = totalBalance + item.label3;
                maxValue = Math.max(maxValue, item.label1, item.label2, item.label3);
            });
            this.view.lblCreditsValue.text = CommonUtilities.formatCurrencyWithCommas(totalCredit);
            this.view.lblDebitsValue.text = CommonUtilities.formatCurrencyWithCommas(totalDebit);
            this.view.lblTotalBalanceValue.text = CommonUtilities.formatCurrencyWithCommas(totalBalance);
            /* and show the chart flex regardless*/
            this.view.flxMainChartCon.setVisibility(true);
            /* dynamic scaling */
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.vAxis.maxValue = maxValue;
            /* feed the data to the bar chart*/
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartData = data;
            // FormControllerUtility.hideProgressBar(this.view);
            this.AdjustScreen();
            this.yearsDropDownAccessibility();
            this.yearsDropDownNewMobileAccessibility();
            this.allAccountsAccessibility();
            this.allAccountsMobileAccessibility();
        },
        /*
                  Method to set duration and account filter data for cash postion chart
                */
        setCashPositionFilterData: function() {
            var scopeObj = this;
            var accountData = [{
                lblUsers: {
                    text: "All Accounts",
                    toolTip: "All Accounts"
                },
                lblRadioButton: {
                    text: 'M',
                    skin: "sknLblOlbFontIcons003E7514Px",
                    accessibilityConfig: {
                        a11yHidden: true
                    }
                },
                flxSelectAccountList: {
                    height:"50dp",
                    onClick: scopeObj.fetchCashPositionByAccountTypeOnRowClick,
                    onKeyPress : scopeObj.flxSelectAccountListKeyPress,
                    //onTouchEnd: function(eventobject, xcoord, ycoord, context) {
                    //  scopeObj.fetchCashPositionByAccountTypeOnRowClick(context);
                    //}.bind(scopeObj),
                    accessibilityConfig: {
                        "a11yARIA": {
                            "role": "radio",
                            "aria-checked": true,
                            "aria-labelledby":"lblUsers"
                        }
                    }
                }
            }];
            //       var durationData = [
            //         {lblUsers : kony.i18n.getLocalizedString("i18n.konybb.cashPosition.lastBusinessWeek")},
            //         {lblUsers : kony.i18n.getLocalizedString("i18n.konybb.cashPosition.thisMonth")},
            //         {lblUsers : kony.i18n.getLocalizedString("i18n.konybb.cashPosition.thisYear")},
            //         {lblUsers : kony.i18n.getLocalizedString("i18n.konybb.cashPosition.lastYear")}
            //       ];
            //       this.view.durationListMenu.segAccountListActions.setData(durationData);
            var entityNames = [];
            if (this.presenter.presentationController.customerdashboard === "true") {
                    var accounts = this.presenter.presentationController.customeraccounts;
				} else {
						var accounts = this.presenter.presentationController.accounts;
				}	
            accounts.forEach(function(account) {
                if (!kony.sdk.isNullOrUndefined(account.MembershipName))
                    if (!entityNames.includes(CommonUtilities.truncateStringWithGivenLength(account.MembershipName, 20))) entityNames.push(CommonUtilities.truncateStringWithGivenLength(account.MembershipName, 20));
            });
            entityNames.forEach(function(name) {
                accountData.push({
                    lblUsers: {
                        text: name.toString(),
                        toolTip: name.toString()
                    }, //+" accounts"},
                    lblRadioButton: {
                        text: 'L',
                        skin: "sknLblOlbFontIconsA0A0A014Px",
                        accessibilityConfig: {
                            a11yHidden: true
                        }
                    },
                    flxSelectAccountList: {
                        height:"50dp",
                        onClick: scopeObj.fetchCashPositionByAccountTypeOnRowClick,
                        onKeyPress : scopeObj.flxSelectAccountListKeyPress,
                        //onTouchEnd: function(eventobject, xcoord, ycoord, context) {
                        // scopeObj.fetchCashPositionByAccountTypeOnRowClick(context);
                        //}.bind(scopeObj),
                        accessibilityConfig: {
                            "a11yARIA": {
                                "role": "radio",
                                "aria-checked": false,
                                "aria-labelledby":"lblUsers"
                            }
                        }
                    }
                })
            })
            this.view.selectAccountList.segAccountListActions.setData(accountData);
        },
        /**
         * Method to trigger loadCashposition
         *@param {object} navObject
         */
         flxSelectAccountListKeyPress:function(eventObject,eventPayload,context){
            if(eventPayload.keyCode===27){
                this.showAccountsDropDown();
            }
            if(eventPayload.keyCode===9){
                if(!eventPayload.shiftKey){
                    if(context.rowIndex===context.widgetInfo.data.length-1){
                        eventPayload.preventDefault();
                        this.showAccountsDropDown();
                        this.view.flxLegendCredits.setActive(true);
                    }
                }
                else{
                    if(context.rowIndex===0){
                        eventPayload.preventDefault();
                        this.showAccountsDropDown();
                    }
                }
            }
         },
        loadCashposition: function(inputParams) {
            var navigationObject = {
                requestData: inputParams,
                onSuccess: {
                    form: "frmDashboard",
                    module: "AccountsUIModule",
                    context: {
                        key: BBConstants.CASH_POSITION,
                        responseData: null
                    }
                },
                onFailure: {
                    form: "frmDashboard",
                    module: "AccountsUIModule",
                    context: {
                        key: BBConstants.CASH_POSITION_ERROR,
                        responseData: null
                    }
                }
            };
            if (applicationManager.getConfigurationManager().checkUserPermission('ACCESS_CASH_POSITION')) {
                this.presenter.presentationController.getCashPosition(navigationObject);
            }
        },
        onClickCreditCashPosition: function() {
            this.closePopupAndFilterScreens("all");
            var chartProperties = {};
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[0] = '#04A615';
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[1] = '#FCEADC';
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[2] = '#D9E3EB';
            for (var k in this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties) {
                if (this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.hasOwnProperty(k)) {
                    chartProperties[k] = this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties[k];
                }
            }
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties = chartProperties;
            this.view.flxLegendCredits.skin = "sknFlxF8F8F8Bottom04A615Border";
            this.view.flxLegendDebits.skin = "sknFlxF8F8F8NoBorder";
            this.view.flxLegendBalance.skin = "sknFlxF8F8F8NoBorder";
            this.view.lblCreditsValue.skin = "sknSSPSB42424218Px";
            this.view.lblDebitsValue.skin = "sknSSP42424218Px";
            this.view.lblTotalBalanceValue.skin = "sknSSP42424218Px";
            this.populateCashPositionChart(this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartData);
        },
        onClickDebitCashPosition: function() {
            this.closePopupAndFilterScreens("all");
            var chartProperties = {};
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[0] = '#DAF2DD';
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[1] = '#E5690B';
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[2] = '#D9E3EB';
            for (var k in this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties) {
                if (this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.hasOwnProperty(k)) {
                    chartProperties[k] = this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties[k];
                }
            }
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties = chartProperties;
            this.view.flxLegendCredits.skin = "sknFlxF8F8F8NoBorder";
            this.view.flxLegendDebits.skin = "sknFlxF8F8F8BottomE5690BBorder";
            this.view.flxLegendBalance.skin = "sknFlxF8F8F8NoBorder";
            this.view.lblCreditsValue.skin = "sknSSP42424218Px";
            this.view.lblDebitsValue.skin = "sknSSPSB42424218Px";
            this.view.lblTotalBalanceValue.skin = "sknSSP42424218Px";
            this.populateCashPositionChart(this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartData);
        },
        onClickTotalBalanceCashPosition: function() {
            this.closePopupAndFilterScreens("all");
            var chartProperties = {};
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[0] = '#DAF2DD';
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[1] = '#FCEADC';
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.colors[2] = '#293276';
            for (var k in this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties) {
                if (this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties.hasOwnProperty(k)) {
                    chartProperties[k] = this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties[k];
                }
            }
            this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartProperties = chartProperties;
            this.view.flxLegendCredits.skin = "sknFlxF8F8F8NoBorder";
            this.view.flxLegendDebits.skin = "sknFlxF8F8F8NoBorder";
            this.view.flxLegendBalance.skin = "sknFlxF8F8F8Bottom003E75Border";
            this.view.lblCreditsValue.skin = "sknSSP42424218Px";
            this.view.lblDebitsValue.skin = "sknSSP42424218Px";
            this.view.lblTotalBalanceValue.skin = "sknSSPSB42424218Px";
            this.populateCashPositionChart(this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartData);
        },
        /**
         * Method to load all the dashboard widgets
         *@param {object} navObject
         */
        loadDashboardWidgets: function(data) {
            var currentYear = new Date().getFullYear();
            if (this.transactionViewAccessCheck()) {
                var inputParams = {
                    "Type": "Daily",
                    "startYear": "",
                    "endYear": currentYear.toString(),
                    "month": new Date().toLocaleString('default', {
                        month: 'short'
                    }),
                    "AccountType": BBConstants.ALL
                };
                this.cashPositionRequestdata = inputParams;
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.lblOccurenceMobile.text = kony.i18n.getLocalizedString("i18n.Transfers.Daily") + ": ";
                    this.view.lblSelectionMobile.text = new Date().toLocaleString('default', {
                        month: 'long'
                    }) + ", " + this.view.calendarWidget.lblYear.text;
                } else {
                    this.view.lblOccurence.text = kony.i18n.getLocalizedString("i18n.Transfers.Daily") + ": ";
                    this.view.lblSelection.text = new Date().toLocaleString('default', {
                        month: 'long'
                    }) + ", " + this.view.calendarWidget.lblYear.text;
                }
                this.loadCashposition(inputParams);
            }
        },
        /**
         * This function gets executed if Stop Check Request Permission is absent for the user.
         */
        removeStopCheckAction: function() {
            var actionsObject = OLBConstants.CONFIG.ACCOUNTS_QUICK_ACTIONS;
            this.modifyObject(actionsObject);
            actionsObject = OLBConstants.CONFIG.ACCOUNTS_SECONDARY_ACTIONS;
            this.modifyObject(actionsObject);
        },
        modifyObject: function(actionsObject) {
            for (var account in actionsObject) {
                if (actionsObject.hasOwnProperty(account)) {
                    actionsObject[account] = actionsObject[account].filter(function(action) {
                        return (action !== OLBConstants.ACTION.STOPCHECKS_PAYMENT);
                    });
                }
            }
        },
        removeViewChequeAction: function() {},
        removeChequeRequestAction: function() {},
        /**
         * This function gets executed if Stop Cheque Request Permission is present for the user.
         */
        addStopCheckAction: function() {},
        /**
         * This function gets executed if Create Cheque Book Request Permission is present for the user.
         */
        addCheckBookRequestAction: function() {},
        /**
         * This function gets executed if View Cheques Permission is present for the user.
         */
        viewMyChequesAction: function() {},
        /**
         * This function shows the masked password on click of the eye icon
         */
        showPassword: function() {
            if (this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.secureTextEntry === true) {
                this.view.AddExternalAccounts.LoginUsingSelectedBank.imgViewPassword.text = "h";
                this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.secureTextEntry = false;
            } else {
                this.view.AddExternalAccounts.LoginUsingSelectedBank.imgViewPassword.text = "i";
                this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.secureTextEntry = true;
            }
        },
        /**
         *
         */
        setAccountListData: function() {},
        /**
         *
         */
        onLoadChangePointer: function() {
            this.view.customheader.imgKony.setFocus(true);
            let currentLocale = kony.i18n.getCurrentLocale();
            //this.view.customheader.imgKony.left = currentLocale === "ar_AE" ? "" : "5px";
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                this.view.customheader.topmenu.btnHamburger.left = "17dp";
                this.view.customheader.imgKony.left = "18dp";
            }
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
                this.view.customheader.imgKony.right = "5dp";
                this.view.customheader.imgKony.left = "";
            }
        },
        /**
         *
         */
        setContextualMenuLeft: function() {
            this.AdjustScreen();
        },
        /**
         * Ui team proposed method to handle screen aligment
         */
        AdjustScreen: function() {
            this.view.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            if (this.view.customheader.info.frame === undefined) {
                return;
            }
            mainheight = this.view.customheader.info.frame.height + this.view.flxMain.info.frame.height;
            var diff = screenheight - mainheight;
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet || kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.flxFooter.marginTop = "20dp";
                this.view.flxFooter.top = "20dp";
            } else {
                if (mainheight < screenheight) {
                    diff = diff - this.view.flxFooter.info.frame.height;
                    if (diff > 0) {
                        this.view.flxFooter.top = mainheight + diff - 100 + ViewConstants.POSITIONAL_VALUES.DP;
                    } else {
                        this.view.flxFooter.top = mainheight - 100 + ViewConstants.POSITIONAL_VALUES.DP;
                    }
                } else {
                    this.view.flxFooter.top = mainheight - 120 + ViewConstants.POSITIONAL_VALUES.DP;
                }
            }
            this.view.forceLayout();
            if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.CAMPAIGN)) {
                CampaignUtility.onBreakpointChange(this.view.campaignpopup, "flxFormContent");
            }
            this.initializeResponsiveViews();
        },
        /**
         * Method to set error message if service call fails
         * @param {boolean} status true/false
         */
        setServiceError: function(status) {
            if (status) {
                this.view.flxDowntimeWarning.setVisibility(true);
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.lblDowntimeWarning, kony.i18n.getLocalizedString("i18n.common.OoopsServerError"), accessibilityConfig);
                this.view.lblDowntimeWarning.setFocus(true);
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            this.view.lblDowntimeWarning.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
            }
            this.AdjustScreen();
        },
        showError: function(errorMsg) {
            if (errorMsg) {
                this.view.flxDowntimeWarning.setVisibility(true);
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.lblDowntimeWarning, errorMsg, accessibilityConfig);
                this.view.lblDowntimeWarning.setFocus(true);
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            kony.application.dismissLoadingScreen();
            this.view.lblDowntimeWarning.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
            }
            this.AdjustScreen();
        },
        showSbaError: function (errorMsg) {
            if (selectedBusiness && (selectedBusiness.sbaEnrolmentStatus.status === sbaEnrolmentStatuses.INPROGRESS || (selectedBusiness.sbaEnrolmentStatus.status === SBA_ENROL_STATUS.SBA_ILP_COMPLETE && (!isLive)))) {
                isRetryTriggered = false;
            } else {
                isRetryTriggered = true;
            }
            if (callFromIlpCompleteRetry && !isRetryTriggered) {
                callFromIlpCompleteRetry = false;
                this.updateSbaStatus(sbaEnrolmentStatuses.RETRY);
            } else if (errorMsg && !callFromIlpCompleteRetry && !this.view.flxSbaAnalysing.isVisible) {
                this.view.flxServiceError.setVisibility(true);
                this.view.lblSbaError.text = errorMsg;
            } else {
                this.view.flxServiceError.setVisibility(false);
            }
            kony.application.dismissLoadingScreen();
            this.AdjustScreen();
        },
        onExternalBankLoginSuccess: function(response) {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
            var username = this.ExternalLoginContextData.username;
            var password = this.ExternalLoginContextData.password;
            var sessionToken = response.params.SessionToken;
            var mainUser = applicationManager.getUserPreferencesManager().getCurrentUserName();
            var bankId = this.ExternalLoginContextData.bankId;
            if (applicationManager.getConfigurationManager().isMicroAppPresent("AuthenticationMA")) {
                authModule.presentationController.saveExternalBankCredentials(username, password, sessionToken, mainUser, bankId);
            }
        },
        onExternalBankLoginFailure: function(response) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.lblLoginUsingSelectedBankError, kony.i18n.getLocalizedString("i18n.login.failedToLogin"), accessibilityConfig);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankError.isVisible = true;
            CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword, "", accessibilityConfig);
            this.enableOrDisableExternalLogin(this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.text, this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.text);
            CommonUtilities.hideProgressBar(this.view);
            this.AdjustScreen();
        },
        /**
         * Method to show outage message
         * @param {Boolean} isOutage true/false
         * @param {String} outageMessage Message to show
         */
        setOutageNotification: function(isOutage, outageMessage) {
            //this.view.flxOutageWarning.isVisible = false;
            var scopeObj = this;
            var outageUI = scopeObj.view.flxOutageWarning;
            var displayMessage = "";
            if (outageMessage && outageMessage.length > 0) {
                outageMessage.forEach(function(message) {
                    displayMessage = displayMessage + message + "\n";
                })
            }
            if (isOutage && !outageUI.isVisible) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                //this.view.lblOutageWarning.text = "outage warning";
                CommonUtilities.setText(scopeObj.view.lblOutageWarning, displayMessage, accessibilityConfig);
                scopeObj.view.flxOutageClose.onClick = function() {
                    scopeObj.setOutageNotification(false);
                    scopeObj.flxOutageWarning.setVisibility(false);
                };
                scopeObj.view.lblOutageWarning.accessibilityConfig = {
                    a11yARIA: {
                        tabindex: -1,
                        "role": "status"
                    },
                }
                outageUI.setVisibility(true);
                scopeObj.view.lblOutageWarning.setFocus(true);
                isOutage = false;
                scopeObj.AdjustScreen();
            } else if (!isOutage && outageUI.isVisible) {
                function timerFunc() {
                    outageUI.setVisibility(false);
                    var acctop = scopeObj.view.accountListMenu.frame.y + 6;
                    scopeObj.view.accountListMenu.top = acctop + "dp";
                    scopeObj.view.forceLayout();
                    kony.timer.cancel("mytimerOuttage");
                }
                kony.timer.schedule("mytimerOuttage", timerFunc, 0.1, false);
            }
            //this.view.flxPasswordResetWarning.isVisible = false;
        },
        setPasswordResetNotification: function(isWarningRequired, warningMessage) {
            var scopeObj = this;
            if (isWarningRequired && warningMessage.passwordExpiryWarningRequired === "true") {
                if (this.presenter.presentationController.customerdashboard === "true"){
					scopeObj.view.flxPasswordResetWarning.setVisibility(false);
				} else {
                scopeObj.view.flxPasswordResetWarning.setVisibility(true);
				}
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                //scopeObj.view.lblPasswordResetWarning.text = "Your password is going to exipre in 30days";
                CommonUtilities.setText(scopeObj.view.lblPasswordResetWarning, kony.i18n.getLocalizedString("i18n.accounts.passwordreset") + " " + warningMessage.passwordExpiryRemainingDays + " " + kony.i18n.getLocalizedString("i18n.accounts.days") + " " + kony.i18n.getLocalizedString("i18n.accounts.resetPasswordWarning"), accessibilityConfig);
                scopeObj.view.lblPasswordResetWarning.accessibilityConfig = {
                    "a11yARIA": {
                        "tabindex": -1
                    },
                }
                scopeObj.view.flxClosePassword.onClick = function() {
                    function timerFunc() {
                        scopeObj.view.flxPasswordResetWarning.setVisibility(false);
                        scopeObj.AdjustScreen();
                        kony.timer.cancel("mytimerPassword");
                    }
                    kony.timer.schedule("mytimerPassword", timerFunc, 0.1, false);
                    scopeObj.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    scopeObj.view.accountsFilter.setVisibility(false);
                };
            } else {
                scopeObj.view.flxPasswordResetWarning.setVisibility(false);
                var acctop = scopeObj.view.accountListMenu.frame.y + 6;
                scopeObj.view.accountListMenu.top = acctop + "dp";
                scopeObj.AdjustScreen();
            }
            scopeObj.AdjustScreen();
            scopeObj.view.forceLayout();
        },
        /**
         * Method updates the frmAccountsDashboard with the user's first name, profile image & last logged
         * @param {JSON} profileBannerData Data of user like login time, name etc
         */
        updateProfileBanner: function(profileBannerData) {
            //  this.view.accountList.segAccounts.setData([]);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.welcome.lblWelcome, kony.i18n.getLocalizedString('i18n.accounts.welcome') + ' ' + profileBannerData.userfirstname + '!', accessibilityConfig);
            CommonUtilities.setText(this.view.welcome.lblLastLoggedIn, kony.i18n.getLocalizedString('i18n.accounts.lastLoggedIn') + ' ' + profileBannerData.lastlogintime, accessibilityConfig);
            if (applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === true && profileBannerData.userImageURL && profileBannerData.userImageURL.trim() != "") this.view.welcome.imgProfile.base64 = profileBannerData.userImageURL;
            else this.view.welcome.imgProfile.src = ViewConstants.IMAGES.USER_GREY_IMAGE;
        },
        /**
         * Returns if a account is favourite or not
         * @param {JSON} account Account whose favourite status needs to be checked
         * @returns {boolean} true/false
         */
        isFavourite: function(account) {
            return account.favouriteStatus && account.favouriteStatus === '1';
        },
        /**
         * Returns if a account is a DBX account or not
         * @param {JSON} account Account whose DBX status needs to be checked
         * @returns {boolean} true/false
         */
        isDbx: function(account) {
            if (account.isExternalAccount) {
                if (account.isExternalAccount === "true") return false;
            } else if (account.externalIndicator) {
                if (account.externalIndicator === "true") return false;
            } else return true;
        },
        /**
         * Returns if a account is external or not
         * @param {JSON} account Account whose external status needs to be checked
         * @returns {boolean} true/false
         */
        isExternal: function(account) {
            if (account.isExternalAccount) {
                if (account.isExternalAccount === "true") return true;
            } else if (account.externalIndicator) {
                if (account.externalIndicator === "true") return true;
            } else return false;
        },
        /**
         * Returns if a account is a part of the custom view or not
         * @param {JSON} account Account whose custom view status needs to be checked
         * @returns {boolean} true/false
         */
        isBelongsToCustomView: function(account) {
            var scopeObj = this;
            var data = this.view.accountsFilter.segCustomFiltersHeader.data;
            var responseAccounts = [];
            data.forEach(function(item) {
                if (item.response.name === scopeObj.hiddenlblSelectedFilter) responseAccounts = item.response.accountIds.split(',');
            });
            return (responseAccounts.includes(account.accountID));
        },
        accountTypeConfig: (function() {
            var accountTypeConfig = {};
            var ApplicationManager = require('ApplicationManager');
            applicationManager = ApplicationManager.getApplicationManager();
            accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING)] = {
                    sideImage: ViewConstants.SIDEBAR_TURQUOISE,
                    sideSkin: ViewConstants.SKINS.SAVINGS_SIDE_BAR,
                    balanceKey: 'availableBalance',
                    balanceTitle: 'i18n.accounts.availableBalance',
                    currentBalanceKey: 'currentBalance',
                    currentBalanceTitle: 'i18n.accounts.currentBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING)] = {
                    sideImage: ViewConstants.SIDEBAR_PURPLE,
                    sideSkin: ViewConstants.SKINS.CHECKINGS_SIDE_BAR,
                    balanceKey: 'availableBalance',
                    balanceTitle: 'i18n.accounts.availableBalance',
                    currentBalanceKey: 'currentBalance',
                    currentBalanceTitle: 'i18n.accounts.currentBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD)] = {
                    sideImage: ViewConstants.SIDEBAR_YELLOW,
                    sideSkin: ViewConstants.SKINS.CREDIT_CARD_SIDE_BAR,
                    balanceKey: 'currentBalance',
                    balanceTitle: 'i18n.accountDetail.availableCredit'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT)] = {
                    sideImage: ViewConstants.SIDEBAR_BLUE,
                    sideSkin: ViewConstants.SKINS.DEPOSIT_SIDE_BAR,
                    balanceKey: 'currentBalance',
                    balanceTitle: 'i18n.accounts.currentBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.MORTGAGE_CARD_SIDE_BAR,
                    balanceKey: 'outstandingBalance',
                    balanceTitle: 'i18n.accounts.outstandingBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.LOAN_SIDE_BAR,
                    balanceKey: 'outstandingBalance',
                    balanceTitle: 'i18n.accounts.outstandingBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE_FACILITY)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.LOAN_SIDE_BAR,
                    balanceKey: 'outstandingBalance',
                    balanceTitle: 'i18n.accounts.outstandingBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.INVESTMENT)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.LOAN_SIDE_BAR,
                    balanceKey: 'marketValue',
                    balanceTitle: 'i18n.accounts.currentBalance'
                },
                accountTypeConfig['Default'] = {
                    sideImage: ViewConstants.SIDEBAR_TURQUOISE,
                    sideSkin: ViewConstants.SKINS.SAVINGS_SIDE_BAR,
                    balanceKey: 'availableBalance',
                    balanceTitle: 'i18n.accounts.availableBalance'
                },
                accountTypeConfig['null'] = {
                    sideImage: ViewConstants.SIDEBAR_TURQUOISE,
                    sideSkin: ViewConstants.SKINS.SAVINGS_SIDE_BAR,
                    balanceKey: 'availableBalance',
                    balanceTitle: 'i18n.accounts.availableBalance'
                }
            return accountTypeConfig;
        })(),
        /**
         * Method to get skins for account
         * @param {String} type Account type of account
         * @returns {String} Skin
         */
        getSkinForAccount: function(type) {
            switch (type) {
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING):
                    return ViewConstants.SKINS.ACCOUNTS_SAVINGS_ROW;
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING):
                    return ViewConstants.SKINS.ACCOUNTS_CHECKING_ROW;
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD):
                    return ViewConstants.SKINS.ACCOUNTS_CREDITCARD_ROW;
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT):
                    return ViewConstants.SKINS.ACCOUNTS_DEPOSIT_ROW;
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE):
                    return ViewConstants.SKINS.ACCOUNTS_MORTGAGE_ROW;
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN):
                    return ViewConstants.SKINS.ACCOUNTS_LOAN_ROW;
                default:
                    return ViewConstants.SKINS.ACCOUNTS_UNCONFIGURED_ACCOUNT_ROW;
            }
        },
        /**
         * Method that gets called to show account details
         * @param {JSON} account Account whose details needs to be shown
         */
        onAccountSelection: function(account) {
            FormControllerUtility.showProgressBar(this.view);
            if (applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")) {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.showAccountDetails(account);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },
        /**
         * Method to toggle account checkbox
         * @param {Number} index index of selectd row
         */
        toggleAccountSelectionCheckbox: function(index) {
            var data = this.view.AddExternalAccounts.LoginUsingSelectedBank.segSelectedAccounts.data[index];
            if (data.lblCheckBox === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                data.lblCheckBox = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                data.flxCheckbox.accessibilityConfig = {
                    a11yARIA: {
                        "role": "checkbox",
                        "aria-checked": false,
                    }
                }
                var indexOfCurrentRow = this.selectedRowIndices.indexOf(index);
                if (indexOfCurrentRow > -1) {
                    this.selectedRowIndices.splice(indexOfCurrentRow, 1);
                }
            } else {
                data.lblCheckBox = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
                data.flxCheckbox.accessibilityConfig = {
                    a11yARIA: {
                        "role": "checkbox",
                        "aria-checked": false,
                    }
                }
                this.selectedRowIndices.push(index);
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.segSelectedAccounts.setDataAt(data, index);
            this.onClickOfSegmentRow();
        },
        /**
         *
         */
        showExternalAccountUpdateAlert: function() {},
        /**
         * Method to get quick actions for accounts
         * @param {Object} dataInput Data inputs like onCancel/accountType etc
         * @returns {Object} quick action for selected account
         */
        getQuickActions: function(dataInput) {
            var self = this;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var onCancel = dataInput.onCancel;
            var quickActions = [{
                    actionName: OLBConstants.ACTION.SCHEDULED_TRANSACTIONS,
                    displayName: dataInput.scheduledDisplayName || kony.i18n.getLocalizedString("i18n.accounts.scheduledTransactions"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.HOMEPAGE],
                    action: function(account) {
                        if (dataInput.showScheduledTransactionsForm) {
                            dataInput.showScheduledTransactionsForm(account);
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.MAKE_A_TRANSFER, //MAKE A TRANSFER
                    displayName: (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") ? kony.i18n.getLocalizedString("i18n.hamburger.transfer") : (dataInput.makeATransferDisplayName || kony.i18n.getLocalizedString("i18n.billPay.BillPayMakeTransfer")),
                    appName: [applicationManager.getConfigurationManager().microappConstants.REGIONALTRANSFER],
                    action: function(account) {
                        //Function call to  open tranfers page with parameter - account obj to be tranferred from.
                        if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true" && applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")) {
                            applicationManager.getModulesPresentationController({
                                "appName": "TransfersMA",
                                "moduleName": "TransferFastUIModule"
                            }).showTransferScreen({
                                accountFrom: dataInput.accountNumber
                            });
                        } else {
                            applicationManager.getModulesPresentationController("TransferModule").showTransferScreen({
                                accountObject: account,
                                onCancelCreateTransfer: onCancel
                            });
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.TRANSFER_MONEY, //MAKE A TRANSFER
                    displayName: (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") ? kony.i18n.getLocalizedString("i18n.hamburger.transfer") : (dataInput.tranferMoneyDisplayName || kony.i18n.getLocalizedString("i18n.billPay.BillPayMakeTransfer")),
                    appName: [applicationManager.getConfigurationManager().microappConstants.REGIONALTRANSFER, applicationManager.getConfigurationManager().microappConstants.UNIFIEDTRANSFER, applicationManager.getConfigurationManager().microappConstants.REGIONALTRANSFER],
                    action: function(account) {
                        //Function call to  open tranfers page with parameter - account obj to be tranferred from.
                        var configManager = applicationManager.getConfigurationManager();
                        if (applicationManager.getConfigurationManager().getDeploymentGeography() == "EUROPE" && applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")) {
                            applicationManager.getModulesPresentationController({
                                "appName": "TransfersMA",
                                "moduleName": "TransferEurUIModule"
                            }).showTransferScreen({
                                context: "MakePaymentOwnAccounts",
                                accountFrom: dataInput.accountNumber
                            });
                            return;
                        }
                        if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true" && applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")) {
                            applicationManager.getModulesPresentationController({
                                "appName": "TransfersMA",
                                "moduleName": "TransferFastUIModule"
                            }).showTransferScreen({
                                accountFrom: dataInput.accountNumber
                            });
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.PAY_MONEY, //Make Payment
                    displayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.makePayFrom"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.REGIONALTRANSFER],
                    action: function(account) {
                        if (applicationManager.getConfigurationManager().getDeploymentGeography() == "EUROPE" && applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")) {
                            if (applicationManager.getConfigurationManager().checkUserFeature("UNIFIED_TRANSFER") && applicationManager.getConfigurationManager().checkUserPermission("UNIFIED_TRANSFER_CREATE") && applicationManager.getConfigurationManager().TransferFlowType === "UTF") {
                                var navMan = applicationManager.getNavigationManager();
                                var data = applicationManager.getUserPreferencesManager().getUserObj();
                                navMan.navigateTo({
                                    "appName": "TransfersMA",
                                    "friendlyName": "frmUTFLanding"
                                }, false, data);
                            } else {
                                applicationManager.getModulesPresentationController({
                                    "appName": "TransfersMA",
                                    "moduleName": "TransferEurUIModule"
                                }).showTransferScreen({
                                    context: "MakePayment",
                                    accountFrom: dataInput.accountNumber
                                });
                                return;
                            }
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.PAY_A_BILL,
                    displayName: (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") ? kony.i18n.getLocalizedString("i18n.Pay.PayBill") : (dataInput.payABillDisplayName || kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payABillFrom")),
                    appName: [applicationManager.getConfigurationManager().microappConstants.BILLPAY],
                    action: function(account) {
                        //Function call to open bill pay screen
                        if (applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA")) {
                            applicationManager.getModulesPresentationController({
                                "appName": "BillPayMA",
                                "moduleName": "BillPaymentUIModule"
                            }).showBillPaymentScreen({
                                "sender": "Accounts",
                                "context": "PayABillWithContext",
                                "loadBills": true,
                                "data": {
                                    "fromAccountNumber": account.accountID,
                                    "show": 'PayABill',
                                    "onCancel": onCancel
                                }
                            });
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.PAY_A_PERSON_OR_SEND_MONEY,
                    displayName: dataInput.sendMoneyDisplayName || kony.i18n.getLocalizedString("i18n.Pay.SendMoney"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.P2PMA],
                    action: function(account) {
                        if (applicationManager.getConfigurationManager().isMicroAppPresent("P2PMA")) {
                            var p2pModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
                            var dataItem = account;
                            dataItem.onCancel = onCancel;
                            p2pModule.presentationController.showPayAPerson("sendMoneyTab", dataItem);
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.PAY_DUE_AMOUNT,
                    displayName: dataInput.payDueAmountDisplayName || kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payDueAmount"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.BILLPAY],
                    action: function(account) {
                        var data = {
                            "accounts": account
                        };
                        if (applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA")) {
                            applicationManager.getModulesPresentationController({
                                "appName": "BillPayMA",
                                "moduleName": "LoanPayUIModule"
                            }).navigateToLoanDue(data);
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.PAYOFF_LOAN,
                    displayName: dataInput.payoffLoanDisplayName || kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payoffLoan"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.BILLPAY],
                    action: function(account) {
                        var data = {
                            "accounts": account
                        };
                        if (applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA")) {
                            applicationManager.getModulesPresentationController({
                                "appName": "BillPayMA",
                                "moduleName": "LoanPayUIModule"
                            }).navigateToLoanPay(data);
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.STOPCHECKS_PAYMENT,
                    displayName: dataInput.stopCheckPaymentDisplayName || kony.i18n.getLocalizedString("i18n.StopcheckPayments.STOPCHECKPAYMENTS"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.ARRANGEMENTS],
                    action: function(account) {
                        if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.ARRANGEMENTS)) {
                            var stopPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "ArrangementsMA",
                                "moduleName": "StopPaymentsUIModule"
                            });
                            stopPaymentsModule.presentationController.showStopPayments({
                                onCancel: onCancel,
                                accountID: account.accountID,
                                "show": OLBConstants.ACTION.SHOW_STOPCHECKS_FORM
                            });
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.REQUEST_CHEQUE_BOOK,
                    displayName: dataInput.requestChequeBookDisplayName || kony.i18n.getLocalizedString("i18n.ChequeBookReq.RequestChequeBook"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.ARRANGEMENTS],
                    action: function(account) {
                        if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.ARRANGEMENTS)) {
                            var stopPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "ArrangementsMA",
                                "moduleName": "StopPaymentsUIModule"
                            });
                            stopPaymentsModule.presentationController.showStopPayments({
                                onCancel: onCancel,
                                accountID: account.accountID,
                                "show": OLBConstants.ACTION.REQUEST_CHEQUE_BOOK_FORM
                            });
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.VIEW_MYCHEQUES,
                    displayName: dataInput.viewMyChequesDisplayName || kony.i18n.getLocalizedString("i18n.ChequeManagement.MyCheques"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.ARRANGEMENTS],
                    action: function(account) {
                        if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.ARRANGEMENTS)) {
                            var stopPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "ArrangementsMA",
                                "moduleName": "StopPaymentsUIModule"
                            });
                            stopPaymentsModule.presentationController.showStopPayments({
                                onCancel: onCancel,
                                accountID: account.accountID,
                                "show": OLBConstants.ACTION.VIEW_MYCHEQUES_FORM
                            });
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.VIEW_STATEMENTS,
                    displayName: dataInput.viewStatementsDisplayName || kony.i18n.getLocalizedString("i18n.ViewStatements.STATEMENTS"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.ARRANGEMENTS],
                    action: function(account) {
                        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "appName": "ArrangementsMA",
                            "moduleName": "AccountsUIModule"
                        });
                        accountsModule.presentationController.showFormatEstatements(account);
                    }
                }, {
                    actionName: OLBConstants.ACTION.UPDATE_ACCOUNT_SETTINGS,
                    displayName: dataInput.updateAccountSettingsDisplayName || kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.updateAccountSettings"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.MANAGEARRANGEMENTS],
                    action: function() {
                        if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.MANAGEARRANGEMENTS)) {
                            var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "ManageArrangementsMA",
                                "moduleName": "ManageArrangementsUIModule"
                            });
                            profileModule.presentationController.enterProfileSettings("accountSettings");
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.REMOVE_ACCOUNT,
                    displayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.removeAccount"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.ACCAGGREGATION],
                    action: function(account) {
                        //                     var externalAccountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExternalAccountsModule");
                        //                     externalAccountsModule.presentationController.deleteConnection(account.accountID);
                        self.showDeletePopUp(account);
                        self.view.accountsFilter.setVisibility(false);
                        self.view.accountListMenu.setVisibility(false);
                    }
                },
                /* {
                          actionName: OLBConstants.ACTION.REFRESH_ACCOUNT,
                          displayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.refreshAccount"),
                          appName : [applicationManager.getConfigurationManager().microappConstants.ACCAGGREGATION],
                          action: function(account) {
                              if(applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.ACCAGGREGATION)){
                                  var externalAccountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "AccAggregationMA", "moduleName" : "ExternalAccountsUIModule"});
                                  externalAccountsModule.presentationController.refreshConsent(account.accountID);
                                  self.view.accountListMenu.setVisibility(false);
                                  self.view.accountsFilter.setVisibility(false);
                              }
                          }
                      },*/
                {
                    actionName: OLBConstants.ACTION.ACCOUNT_PREFERENCES,
                    displayName: kony.i18n.getLocalizedString("i18n.ProfileManagement.AccountPreferences"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.MANAGEARRANGEMENTS],
                    action: function() {
                        if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.MANAGEARRANGEMENTS)) {
                            var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "ManageArrangementsMA",
                                "moduleName": "ManageArrangementsUIModule"
                            });
                            profileModule.presentationController.initializeUserProfileClass();
                            profileModule.presentationController.showPreferredAccounts();
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.EDIT_ACCOUNT,
                    displayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.editAccount"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.MANAGEARRANGEMENTS],
                    action: function(account) {
                        if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.MANAGEARRANGEMENTS)) {
                            var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "ManageArrangementsMA",
                                "moduleName": "ManageArrangementsUIModule"
                            });
                            profileModule.presentationController.initializeUserProfileClass();
                            profileModule.presentationController.showEditExternalAccount(account);
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.ACCOUNT_ALERTS,
                    displayName: kony.i18n.getLocalizedString("i18n.Alerts.AccountAlertSettings"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.ALERTSETTINGS],
                    action: function(account) {
                        if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.ALERTSETTINGS)) {
                            var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "AlertSettingsMA",
                                "moduleName": "SettingsNewAlertsUIModule"
                            });
                            profileModule.presentationController.initializeUserProfileClass();
                            profileModule.presentationController.fetchAlertsCategory("alertSettings2", account.accountID);
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.MANAGE_CARDS, //Manage Card
                    displayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.ManageCards"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.CARDS],
                    action: function(account) {
                        if (applicationManager.getConfigurationManager().isMicroAppPresent("CardsMA")) {
                            var data = {
                                "accounts": account
                            };
                            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "CardsMA",
                                "moduleName": "ManageCardsUIModule"
                            }).presentationController.navigateToCardsFromAccountDashboard(account);
                        }
                    }
                }, {
                    actionName: OLBConstants.ACTION.VIEW_DOCUMENT,
                    displayName: "View Document",
                    appName: [applicationManager.getConfigurationManager().microappConstants.HOMEPAGE],
                    action: function(account) {
                        var accountDetails = {};
                        accountDetails.arrangementId = account.arrangementId;
                        accountDetails.formattedAccountNumber = account.accountName + " ...." + account.accountID.substring(account.accountID.length - 4);;
                        FormControllerUtility.showProgressBar(this.view);
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            moduleName: "AccountServicesUIModule",
                            appName: "ArrangementsMA"
                        }).presentationController.setFormData(accountDetails);
                    }
                }, {
                    actionName: OLBConstants.ACTION.RAISE_A_REQUEST,
                    displayName: kony.i18n.getLocalizedString("i18n.Homepage.raiseaRequest"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.HOMEPAGE],
                    action: function(account) {
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            moduleName: "AlertsMsgsUIModule",
                            appName: "SecureMessageMA"
                        }).presentationController.showAlertsPage("hamburgerMenu", {
                            show: "Messages"
                        });
                    }
                }, {
                    actionName: OLBConstants.ACTION.CHANGE_REPAYMENT_DAY,
                    displayName: "Change Repayment Day",
                    appName: [applicationManager.getConfigurationManager().microappConstants.HOMEPAGE],
                    action: function(account) {
                        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
                        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "appName": "ArrangementsMA",
                            "moduleName": "AccountsUIModule"
                        });
                        accountsModule.presentationController.showChangeRepaymentDayPage(account);
                    }
                }
            ];
            var favFlag = applicationManager.getConfigurationManager().getConfigurationValue('isFavoriteRequired');
            var favConfigCount = applicationManager.getConfigurationManager().getConfigurationValue('favoriteCount');
            if (favFlag && favConfigCount <= this.accounts.length) {
                var favQuickAction = {
                    actionName: OLBConstants.ACTION.SET_AS_FAVOURITE,
                    displayName: kony.i18n.getLocalizedString("i18n.AccountsLanding.setAsFavourite"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.HOMEPAGE],
                    action: function(account) {
                        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
                        accountsModule.presentationController.changeAccountFavouriteStatus(account);
                    }
                };
                quickActions.push(favQuickAction);
                favQuickAction = {
                    actionName: OLBConstants.ACTION.REMOVE_AS_FAVOURITE,
                    displayName: kony.i18n.getLocalizedString("i18n.AccountsLanding.removefavourite"),
                    appName: [applicationManager.getConfigurationManager().microappConstants.HOMEPAGE],
                    action: function(account) {
                        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
                        accountsModule.presentationController.changeAccountFavouriteStatus(account);
                    }
                };
                quickActions.push(favQuickAction);
            }
            return quickActions;
        },
        /**
         * showDeletePopUp :  Method to display pop up for deleting external account.
         */
        showDeletePopUp: function(account) {
            try {
                var scopeObject = this;
                this.view.flxLogout.left = "0%";
                scopeObject.view.flxLogout.height = scopeObject.getPageHeight();
                scopeObject.view.flxLogout.isVisible = true;
                scopeObject.view.flxLogout.setFocus(true);
                this.view.CustomPopup.setFocus(true);
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.CustomPopup.lblHeading, kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.removeAccount"), accessibilityConfig);
                CommonUtilities.setText(this.view.CustomPopup.lblPopupMessage, kony.i18n.getLocalizedString("i18n.AccountsAggregation.AreYouSure"), accessibilityConfig);
                if (CommonUtilities.isCSRMode()) {
                    this.view.CustomPopup.btnYes.onClick = CommonUtilities.disableButtonActionForCSRMode();
                    this.view.CustomPopup.btnYes.skin = CommonUtilities.disableButtonSkinForCSRMode();
                    this.view.CustomPopup.btnYes.focusSkin = CommonUtilities.disableButtonSkinForCSRMode();
                    this.view.CustomPopup.btnYes.hoverSkin = CommonUtilities.disableButtonSkinForCSRMode();
                } else {
                    this.view.CustomPopup.btnYes.onClick = function() {
                        scopeObject.view.flxLogout.left = "-100%";
                        scopeObject.view.flxLogout.isVisible = false;
                        if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.ACCAGGREGATION)) {
                            var externalAccountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "appName": "AccAggregationMA",
                                "moduleName": "ExternalAccountsUIModule"
                            });
                            externalAccountsModule.presentationController.deleteConnection(account.accountID);
                        }
                    };
                }
                this.view.CustomPopup.btnNo.onClick = function() {
                    scopeObject.view.flxLogout.left = "-100%";
                    scopeObject.view.flxLogout.isVisible = true;
                };
                this.view.CustomPopup.flxCross.onClick = function() {
                    scopeObject.view.flxLogout.left = "-100%";
                    scopeObject.view.flxLogout.isVisible = true;
                };
            } catch (error) {}
        },
        /**
         * enableLogoutAction :  Method to reinitialize logout action on popup yes button
         */
        enableLogoutAction: function() {
            try {
                var scopeObj = this;
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.CustomPopup.lblHeading, kony.i18n.getLocalizedString("i18n.common.LogoutMsg"), accessibilityConfig);
                CommonUtilities.setText(this.view.CustomPopup.btnNo, kony.i18n.getLocalizedString("i18n.common.no"), accessibilityConfig);
                CommonUtilities.setText(widgetID, text, accessibilityConfig);
                CommonUtilities.setText(this.view.CustomPopup.btnYes, kony.i18n.getLocalizedString("i18n.common.yes"), accessibilityConfig);
                this.view.CustomPopup.btnNo.toolTip = kony.i18n.getLocalizedString("i18n.common.no");
                this.view.CustomPopup.btnYes.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
                this.view.CustomPopup.btnYes.onClick = function() {
                    if (applicationManager.getConfigurationManager().isMicroAppPresent("AuthenticationMA")) {
                        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
                        context = {
                            action: "Logout"
                        };
                        authModule.presentationController.doLogout(context);
                    }
                    scopeObj.view.flxLogout.left = "-100%";
                };
            } catch (error) {}
        },
        /**
         * Method to get action for specific account
         * @param {Collection} Actions List of Actions
         * @param {String} actionName Name of action
         * @param {JSON} account Account for which action is required
         * @returns {Object} matched action for the account from liat of actions
         */
        getAction: function(Actions, actionName, account) {
            var actionItem, matchedAction;
            for (var i = 0; i < Actions.length; i++) {
                actionItem = Actions[i];
                if (actionItem.actionName === actionName && actionItem.appName) {
                    var flag = false;
                    for (var j = 0; j < actionItem.appName.length; j++) {
                        if (applicationManager.getConfigurationManager().isMicroAppPresent(actionItem.appName[j])) flag = true;
                    }
                    if (flag === true) {
                        matchedAction = {
                            actionName: actionItem.actionName,
                            displayName: actionItem.displayName,
                            action: actionItem.action.bind(null, account)
                        };
                        break;
                    }
                }
            }
            if (!matchedAction) {
                CommonUtilities.ErrorHandler.onError("Action :" + actionName + " is not found, please validate with Contextual actions list.");
                return false;
            }
            return matchedAction;
        },
        /**
         * Method to get quick action view model
         * @param {JSON} account Account for which quick actions are required
         * @param {Collection} actions List of actions
         * @returns {Object} actions viewModel
         */
        getQuickActionsViewModel: function(account, actions) {
            var scopeObj = this;
            var finalActionsViewModel = [];
            if (account.accountType) {
                if (actions.length) {
                    var validActions = actions.filter(function(action) {
                        return scopeObj.loadAccountModule().presentationController.isValidAction(action, account);
                    });
                    var onCancel = function() {
                        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "moduleName": "AccountsUIModule",
                            "appName": "HomepageMA"
                        });
                        accountsModule.presentationController.presentAccountsLanding();
                    };
                    if (this.isFavourite(account) === true) {
                        validActions.push("Remove as Favourite");
                    } else if (this.isFavourite(account) === false) {
                        validActions.push("Set as Favourite");
                    }
                    if (!(applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA") && (applicationManager.getConfigurationManager().features.indexOf('BILL_PAY') > 0))) {
                        validActions.splice(validActions.indexOf(kony.i18n.getLocalizedString("i18n.hamburger.payABill")), validActions.indexOf(kony.i18n.getLocalizedString("i18n.hamburger.payABill")));
                    }
                    finalActionsViewModel = validActions.map(function(action) { //get action object.
                        var quickActions = scopeObj.getQuickActions({
                            onCancel: onCancel,
                            tranferMoneyDisplayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.makeTransferFrom"),
                            payABillDisplayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payABillFrom"),
                            sendMoneyDisplayName: kony.i18n.getLocalizedString("i18n.Pay.SendMoney"),
                            accountAlertsDisplayName: kony.i18n.getLocalizedString("i18n.Alerts.AccountAlertSettings"),
                            accountNumber: account.Account_id || account.accountID
                        });
                        var actions = scopeObj.getAction(quickActions, action, account);
                        if (actions) {
                            return actions;
                        }
                    });
                }
            }
            finalActionsViewModel = finalActionsViewModel.filter(function(element) {
                return element !== undefined;
            });
            return finalActionsViewModel
        },
        /**
         * Method to show actions for accounts on fetching quick action for that specific account
         * @param {JSON} account account whose quick action needs to be fetched
         * @param {Object} actions List of actions
         */
        onFetchQuickActions: function(account, actions) {
            var scopeObj = this;
            var quickActionsViewModel = scopeObj.getQuickActionsViewModel(account, actions)
            var toQuickActionSegmentModel = function(quickAction) {
                return {
                    "lblAction": {
                        "text": quickAction.displayName,
                        //"toolTip": quickAction.displayName,
                    },
                    "lblSeparator": "lblSeparator",
                    "flxActionsMenu": {
                        "onClick": quickAction.action,
                        "onKeyPress": scopeObj.onKeyPressCallBackAccountListMenu,
                        "accessibilityConfig": {
                            "a11yARIA": {
                                "role": "link",
                                "aria-labelledby": "lblAction",
                            }
                        }
                    }
                };
            };
            this.view.accountListMenu.segAccountListActions.setData(quickActionsViewModel.map(toQuickActionSegmentModel));
            //this.view.accountListMenu.imgToolTip.setFocus(true);
            this.view.accountList.forceLayout();
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                scopeObj.view.accountListMenu.left = "";
                scopeObj.view.accountListMenu.right = "55dp";
            } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                scopeObj.view.accountListMenu.left = "";
                scopeObj.view.accountListMenu.right = "75dp";
            } else {
                scopeObj.view.accountListMenu.left = "590dp";
                scopeObj.view.accountListMenu.right = "";
            }
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
                this.view.accountListMenu.flxAccountListActionsSegment.right = "380dp";
            }
            if ((kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) && kony.i18n.getCurrentLocale() === "ar_AE") {
                this.view.accountListMenu.flxAccountListActionsSegment.right = "22dp";
            }
            if ((kony.application.getCurrentBreakpoint() <= 640 || orientationHandler.isMobile) && kony.i18n.getCurrentLocale() === "ar_AE") {
                this.view.accountListMenu.flxAccountListActionsSegment.right = "20dp";
            }
            this.AdjustScreen();
        },
        /**
         * Method to open quick actions
         * @param {JSON} account account whose quick action needs to be seen
         */
        openQuickActions: function(account) {
            var scopeObj = this;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.savings")) {
                account.accountType = "Savings";
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.checking")) {
                account.accountType = "Checking";
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.creditCard")) {
                account.accountType = "CreditCard";
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.current")) {
                account.accountType = "CURRENT";
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.deposit")) {
                account.accountType = "Deposit";
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.external")) {
                account.accountType = "External";
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.investment")) {
                account.accountType = "Investment";
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.lineOfCredit")) {
                account.accountType = "Line Of Credit";
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.loan")) {
                account.accountType = "Loan";
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.account.mortgage")) {
                account.accountType = "Mortgage";
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.others")) {
                account.accountType = "Other";
            }
            //Quick actions Configuration.
            var quickActionsConfig;
            if (account.isExternalAccount) {
                quickActionsConfig = OLBConstants.CONFIG.EXTERNAL_ACCOUNT_QUICK_ACTIONS;
                if (quickActionsConfig) {
                    scopeObj.onFetchQuickActions(account, quickActionsConfig);
                }
            } else {
                quickActionsConfig = OLBConstants.CONFIG.ACCOUNTS_QUICK_ACTIONS;
                if (quickActionsConfig[account.accountType]) {
                    scopeObj.onFetchQuickActions(account, quickActionsConfig[account.accountType]);
                }
            }
        },
        /**
         * Method to create accounts segment view model
         * @param {Collection} accounts List of accounts
         * @returns {JSON} account viewModel
         */
        createAllAccountSegmentsModel: function(account, accsLen) {
            var scopeObject = this;
            var updatedAccountID;
            var updatedAccountName;
			var accType = account.accountType ;
            var accountID = account.accountID;
            var externalaccountID = accountID.substring(accountID.length, accountID.indexOf('-'));
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var dualConfiguration = this.getDualBalanceConfiguration();
            var modifiedAccountType = accType;
            if (accType === "Savings") {
                accType = kony.i18n.getLocalizedString("i18n.accounts.savings");
            } else if (accType === "Checking") {
                accType = kony.i18n.getLocalizedString("i18n.accounts.checking");
            } else if (accType === "Credit Card") { //Defect: ARB-33686 
                accType = kony.i18n.getLocalizedString("i18n.accounts.creditCard");
            } else if (accType === "CURRENT") {
                accType = kony.i18n.getLocalizedString("i18n.accounts.current");
            } else if (accType === "Deposit") {
                accType = kony.i18n.getLocalizedString("i18n.accounts.deposit");
            } else if (accType === "External") {
                accType = kony.i18n.getLocalizedString("i18n.accounts.external");
            } else if (accType === "Investment") {
                accType = kony.i18n.getLocalizedString("i18n.accounts.investment");
            } else if (accType === "Line Of Credit") {
                accType = kony.i18n.getLocalizedString("i18n.accounts.lineOfCredit");
            } else if (accType === "Loan") {
                accType = kony.i18n.getLocalizedString("i18n.accounts.loan");
            } else if (accType === "Mortgage") {
                accType = kony.i18n.getLocalizedString("i18n.account.mortgage");
            } else if (accType === "Other") {
                accType = kony.i18n.getLocalizedString("i18n.accounts.others");
            }
            if (account.externalIndicator && account.externalIndicator === "true") {
                updatedAccountID = externalaccountID;
            } else {
                updatedAccountID = account.accountID
            }
            if (kony.application.getCurrentBreakpoint() <= 640 && (orientationHandler.isMobile)) {
                var truncatedAccountName = CommonUtilities.getAccountName(account);
                truncatedAccountName = truncatedAccountName.substring(0, 20);
                updatedAccountName = CommonUtilities.mergeAccountNameNumber(truncatedAccountName, updatedAccountID); //accType + " " + 
            } else updatedAccountName = CommonUtilities.mergeAccountNameNumber(account.nickName || account.accountName, updatedAccountID);
            var getConfigFor = function(accountType) {
                if (scopeObject.accountTypeConfig[accountType]) {
                    return scopeObject.accountTypeConfig[accountType];
                } else {
                    return scopeObject.accountTypeConfig.Default;
                }
            };
            let currentLocale = kony.i18n.getCurrentLocale();
            var dataObject = {
                "template": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) && dualConfiguration.isAvailableBalanceToBeDisplayed && dualConfiguration.isCurrentBalanceToBeDisplayed ? "flxAccountsRowTemplateMobile" : "flxAccountsRowTemplate",
                "lblAccountName": {
                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP42424213Px" : "sknSSP42424215Px",
                    "text": updatedAccountName,
                    "accessibilityconfig": {
                        "a11yLabel": updatedAccountName
                    }
                },
                "lblAvailableBalanceValue": {
                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP42424213Px" : "sknlbl424242SSPReg24px",
                    "text": CommonUtilities.formatCurrencyWithCommas(account[getConfigFor(modifiedAccountType).balanceKey], false, account.currencyCode),
                    "accessibilityconfig": {
                        "a11yLabel": CommonUtilities.formatCurrencyWithCommas(account[getConfigFor(modifiedAccountType).balanceKey], false, account.currencyCode)
                    }
                },
                "lblAvailableBalanceTitle": {
                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP72727211Px" : "sknSSP72727213Px",
                    "text": kony.i18n.getLocalizedString(getConfigFor(accType).balanceTitle) + String(account.isExternalAccount === true ? ": " + account.availableBalanceUpdatedAt : ""),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString(getConfigFor(accType).balanceTitle) + String(account.isExternalAccount === true ? ": " + account.availableBalanceUpdatedAt : "")
                    }
                },
                "flxAvailableBalance": {
                    "isVisible": (accType !== OLBConstants.ACCOUNT_TYPE.SAVING && accType !== OLBConstants.ACCOUNT_TYPE.CHECKING) ? true : dualConfiguration.isAvailableBalanceToBeDisplayed
                },
                "flxCurrentBalance": {
                    "isVisible": ((accType === OLBConstants.ACCOUNT_TYPE.SAVING || accType === OLBConstants.ACCOUNT_TYPE.CHECKING) && dualConfiguration.isCurrentBalanceToBeDisplayed === true) ? true : false
                },
                "lblCurrentBalanceValue": {
                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP42424213Px" : "sknlbl424242SSPReg24px",
                    "text": CommonUtilities.formatCurrencyWithCommas(account[getConfigFor(accType).currentBalanceKey], false, account.currencyCode),
                    "accessibilityconfig": {
                        "a11yLabel": CommonUtilities.formatCurrencyWithCommas(account[getConfigFor(accType).currentBalanceKey], false, account.currencyCode)
                    },
                    "isVisible": (accType === OLBConstants.ACCOUNT_TYPE.SAVING || accType === OLBConstants.ACCOUNT_TYPE.CHECKING) ? true : false
                },
                "lblCurrentBalanceTitle": {
                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP72727211Px" : "sknSSP72727213Px",
                    "text": kony.i18n.getLocalizedString(getConfigFor(accType).currentBalanceTitle) + String(account.isExternalAccount === true ? ": " + account.availableBalanceUpdatedAt : ""),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString(getConfigFor(accType).currentBalanceTitle) + String(account.isExternalAccount === true ? ": " + account.availableBalanceUpdatedAt : "")
                    },
                    "isVisible": (accType === OLBConstants.ACCOUNT_TYPE.SAVING || accType === OLBConstants.ACCOUNT_TYPE.CHECKING) ? true : false
                },
                "onAccountClick": account.isExternalAccount === true ? scopeObject.showExternalAccountUpdateAlert : scopeObject.onAccountSelection.bind(scopeObject, account),
                "onQuickActions": scopeObject.openQuickActions.bind(scopeObject, account),
                "flxMenu": {
                    "isVisible": !kony.sdk.isNullOrUndefined(account.accountStatus) ? (account.accountStatus.toUpperCase() == "CLOSED" ? false : true) : true,
                    // "skin": self.getSkinForAccount(accType)
                    "accessibilityConfig": {
                        "a11yLabel": "Open list of quick actions for"+ updatedAccountName,
                        "a11yARIA": {
                            "role": "button",
                            "aria-expanded": false,
                        }
                    },
                },
                "flxContent": {                    
                    "accessibilityConfig": {
                        "a11yLabel": "Name of account "+ updatedAccountName+ " Account type " +account.accountType +", Available balance $"+ account.currentBalance+". Click to view details for this account" ,
                        "a11yARIA": {
                         //   "role": "button"
                        }
                    },
                },
                "flxNoResultsFound": {
                    "isVisible": false
                },
                "flxStatus": {
                    "isVisible": !kony.sdk.isNullOrUndefined(account.accountStatus) ? (account.accountStatus.toUpperCase() == "CLOSED" ? true : false) : false
                },
                "isNoRecords": false,
                "imgThreeDotIcon": {
                    "text": ViewConstants.FONT_ICONS.THREE_DOTS_ACCOUNTS,
                    "skin": ViewConstants.SKINS.THREE_DOTS_IMAGE,
                    "isVisible": true,
                    "accessibilityconfig": {
                        //"a11yLabel": "Contextual Menu"
                        "a11yHidden": true,
                    }
                },
                "flxAccountsRowWrapper": {
                    "isVisible": true,
                },
                "lblSeperator": {
                    "isVisible": true
                },
                "userName": account.userName,
                "bankId": account.bankId,
                "membershipName": account.MembershipName ? account.MembershipName : "",
                "accountName": updatedAccountName,
                "accountType": accType,
                "accountID": updatedAccountID,
                "accountBalance": account[getConfigFor(accType).balanceKey],
                "currentBalance": account[getConfigFor(accType).currentBalanceKey],
                "currency": account.currencyCode,
                "favouriteStatus": account.favouriteStatus,
                "isError": account.isError,
                "externalIndicator": account.externalIndicator,
                "isExternalAccount": account.isExternalAccount,
                "accountStatus": account.accountStatus,
                "lblAccountType": {
                    text: (accType === "mortgageFacility") ? kony.i18n.getLocalizedString("i18n.Accounts.displayMortgageFacility") : accType
                },
                "lblAccountTypeHeader": {
                    "text": account.accountRoleType,
                    "accessibilityconfig": {
                        "a11yLabel": account.accountRoleType
                    }
                },
                "flxFavorite": {
                    "accessibilityConfig": {
                        "a11yLabel": "Mark as favourite account"+updatedAccountName,
                        "a11yARIA": {
                            "aria-checked": false,
                            "role": "checkbox"
                        }
                    }
                }
            };
            var favFlag = applicationManager.getConfigurationManager().getConfigurationValue('isFavoriteRequired');
            var favConfigCount = applicationManager.getConfigurationManager().getConfigurationValue('favoriteCount');
            if (favFlag !== true) {
                dataObject.flxFavorite = {
                    "isVisible": false,
                };
            } else {
                if (this.accounts.length >= favConfigCount) {
                    if (CommonUtilities.isCSRMode()) {
                        dataObject.lblFavoriteIcon = scopeObject.isFavourite(account) ? {
                            "text": ViewConstants.FONT_ICONS.FAVOURITE_STAR_ACTIVE,
                            "isVisible": true,
                            "accessibilityconfig": {
                                "a11yLabel": "Mark as favourite account."
                            }
                        } : {
                            "text": ViewConstants.FONT_ICONS.FAVOURITE_STAR_INACTIVE,
                            "isVisible": true,
                            "accessibilityconfig": {
                                "a11yLabel": "Mark as favourite account."
                            }
                        };
                        dataObject.flxFavorite = scopeObject.isFavourite(account) ? {
                            "accessibilityConfig": {
                                "a11yLabel": "Mark as favourite account"+updatedAccountName,
                                "a11yARIA": {
                                    "aria-checked": true,
                                    "role": "checkbox"
                                }
                            }
                        } : {
                            "accessibilityConfig": {
                                "a11yLabel": "Mark as favourite account",
                                "a11yARIA": {
                                    "aria-checked": false,
                                    "role": "checkbox"
                                }
                            }
                        }
                        dataObject.toggleFavourite = CommonUtilities.disableButtonActionForCSRMode;
                    } else {
                        dataObject.lblFavoriteIcon = scopeObject.isFavourite(account) ? {
                            "text": ViewConstants.FONT_ICONS.FAVOURITE_STAR_ACTIVE,
                            "isVisible": true,
                            "accessibilityconfig": {
                                "a11yLabel": "Active Favourite Account"
                            }
                        } : {
                            "text": ViewConstants.FONT_ICONS.FAVOURITE_STAR_INACTIVE,
                            "isVisible": true,
                            "accessibilityconfig": {
                                "a11yLabel": "Inactive Favourite Account"
                            }
                        };
                        dataObject.flxFavorite = scopeObject.isFavourite(account) ? {
                            "accessibilityConfig": {
                                "a11yLabel": "Mark as favourite account"+updatedAccountName,
                                "a11yARIA": {
                                    "aria-checked": true,
                                    "role": "checkbox"
                                }
                            }
                        } : {
                            "accessibilityConfig": {
                                "a11yLabel": "Mark as favourite account",
                                "a11yARIA": {
                                    "aria-checked": false,
                                    "role": "checkbox"
                                }
                            }
                        }
                        dataObject.toggleFavourite = scopeObject.loadAccountModule().presentationController.changeAccountFavouriteStatus.bind(scopeObject.loadAccountModule().presentationController, account);
                    }
                } else {
                    dataObject.flxFavorite = {
                        "isVisible": false,
                    };
                }
            }
            //if (isCombinedUser) {
            if (this.profileAccess === "both") {
                if (account.isBusinessAccount) {
                    if (account.isBusinessAccount === "true") {
                        dataObject.lblRoleIcon = {
                            "text": 'r',
                            "isVisible": true
                        };
                    } else if (account.isBusinessAccount === "false") {
                        dataObject.lblRoleIcon = {
                            "text": 's',
                            "isVisible": true
                        };
                    }
                } else dataObject.lblRoleIcon = {
                    "isVisible": false
                }
            } else {
                dataObject.lblRoleIcon = {
                    "isVisible": false
                }
                dataObject.flxBankIcon = {
                    "isVisible": false
                };
                dataObject.lblBankIcon = {
                    "text": "c",
                    "isVisible": false
                };
                dataObject.imgBankIcon = {
                    "isVisible": false
                };
            }
            if (account.externalIndicator && account.externalIndicator === "true") {
                if (!kony.sdk.isNullOrUndefined(account.logoURL)) {
                    dataObject.flxBankIcon = {
                        "isVisible": true
                    };
                    dataObject.imgBankIcon = {
                        "src": account.logoURL,
                        "isVisible": true
                    };
                    dataObject.lblBankIcon = {
                        "isVisible": false
                    };
                } else {
                    if (!kony.sdk.isNullOrUndefined(account.bankName)) {
                        dataObject.lblBankIcon = {
                            "isVisible": false
                        };
                        dataObject.flxBankIcon = {
                            "isVisible": true
                        };
                        if (account.bankName.toLowerCase().includes("citi")) dataObject.imgBankIcon = {
                            "src": "citi_1x.png",
                            "isVisible": true
                        };
                        else if (account.bankName.toLowerCase().includes("chase")) dataObject.imgBankIcon = {
                            "src": "chase_1x.png",
                            "isVisible": true
                        };
                        else if (account.bankName.toLowerCase().includes("boa")) dataObject.imgBankIcon = {
                            "src": "boa_1x.png",
                            "isVisible": true
                        };
                        else if (account.bankName.toLowerCase().includes("temenos")) dataObject.imgBankIcon = {
                            "src": "temenos_1x.png",
                            "isVisible": true
                        };
                        else {
                            dataObject.flxBankIcon = {
                                "isVisible": false
                            };
                            dataObject.lblBankIcon = {
                                "text": "c",
                                "isVisible": true
                            };
                            dataObject.imgBankIcon = {
                                "isVisible": false
                            };
                        }
                    } else {
                        dataObject.flxBankIcon = {
                            "isVisible": false
                        };
                        dataObject.lblBankIcon = {
                            "text": "c",
                            "isVisible": true
                        };
                        dataObject.imgBankIcon = {
                            "isVisible": false
                        };
                    }
                }
                dataObject.lblAvailableBalanceTitle = {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getDateAndTime(account.processingTime),
                    "top": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "4dp" : "0dp",
                    "accessibilityconfig": {
                        "a11yLabel": CommonUtilities.getDateAndTime(account.processingTime)
                    }
                };
                var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
                var count = 0;
                if (account.expiresAt && account.expiresAt !== undefined) {
                    var targetDate = CommonUtilities.getDateAndTime(account.expiresAt);
                    var expireDate = (targetDate.split(","))[0];
                    var today = kony.os.date(dateFormat);
                    var todayDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(today, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase())
                    var targetDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(expireDate, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase())
                    var difference = targetDateObj - todayDateObj;
                    count = Math.ceil(difference / (1000 * 60 * 60 * 24));
                    if (count <= 0) {
                        dataObject.imgExternalAlert = {
                            src: "alert_1.png",
                            isVisible: true
                        };
                    } else if (count <= account.connectionAlertDays) {
                        dataObject.imgExternalAlert = {
                            src: "info_grey_2.png",
                            isVisible: true
                        };
                    } else {
                        dataObject.imgExternalAlert = {
                            isVisible: false
                        };
                    }
                }
            } else {
                dataObject.lblAvailableBalanceTitle = {
                    "text": kony.i18n.getLocalizedString(getConfigFor(accType).balanceTitle),
                    "top": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "4dp" : "0dp",
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString(getConfigFor(accType).balanceTitle) + String(account.isExternalAccount === true ? ": " + account.availableBalanceUpdatedAt : "")
                    }
                };
                dataObject.lblCurrentBalanceTitle = {
                    "text": kony.i18n.getLocalizedString(getConfigFor(accType).currentBalanceTitle),
                    "top": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "4dp" : "0dp",
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString(getConfigFor(accType).currentBalanceTitle) + String(account.isExternalAccount === true ? ": " + account.availableBalanceUpdatedAt : "")
                    }
                };
                dataObject.imgExternalAlert = {
                    isVisible: false
                };
            }
            if ((accType === OLBConstants.ACCOUNT_TYPE.SAVING || accType === OLBConstants.ACCOUNT_TYPE.CHECKING) && account.availableBalance < 0) {
                dataObject.lblAvailableBalanceTitle = {
                    "text": kony.i18n.getLocalizedString("i18n.Accounts.Overdrawn"),
                    "skin": "sknLblc64d0eSSP14Px",
                    "top": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "4dp" : "0dp",
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.Accounts.Overdrawn") + String(account.isExternalAccount === true ? ": " + account.availableBalanceUpdatedAt : "")
                    }
                };
            }
            //       if(isCombinedUser){
            //         if (account.isBusinessAccount){
            //           if(account.isBusinessAccount === "true") {
            //             dataObject.lblRoleIcon = { "text" : 'r', "isVisible" : true};
            //           } else if (account.isBusinessAccount === "false"){
            //             dataObject.lblRoleIcon = { "text" : 's', "isVisible" : true};
            //           }
            //         }
            //         else
            //           dataObject.lblRoleIcon = { "isVisible" : false}
            //           }
            //       else{
            //         dataObject.lblRoleIcon = { "isVisible" : false}
            //       }
            //         dataObject.flxBankIcon = {
            //           "isVisible": false
            //         };
            //         dataObject.lblBankIcon = {
            //           "text": "c",
            //           "isVisible": false
            //         };
            //         dataObject.imgBankIcon = {
            //           "isVisible": false
            //         };
            //       }
            return dataObject;
        },
        /**
         * Method to create section header for accounts
         * @param {Collection} accounts List of accounts
         */
        getDataWithSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "HomepageMA",
                "moduleName": "AccountsUIModule"
            });
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            //var accessibleCustomerIds = applicationManager.getUserPreferencesManager().accessibleCustomerIds;
            this.view.lblAccountsTotal.text = "Total Accounts (" + this.accounts.length + ")";
            var custDashboard = accountsModule.presentationController.customerdashboard;
            if (custDashboard === "true") {
                try {
                    var customerId = accountsModule.presentationController.customerId;
                    accounts = accounts.filter((account) => account['Membership_id'] == customerId);
                    this.view.lblAccountsTotal.text = "Total Accounts (" + accounts.length + ")";
                } catch (e) {}
            }
            var closedAccounts = new Map();
            var closedAccts = [];
            this.setPagination({
                    'show': true,
                    'offset': this.offset
                }, accounts);
          //  accounts.slice(this.offset, this.lastRecord)
            accounts.forEach(function(account) {
                if (closedAccounts.has(account.Membership_id)) {
                    closedAccounts.set(account.Membership_id, closedAccounts.get(account.Membership_id) + 1);
                } else {
                    closedAccounts.set(account.Membership_id, 1);
                }
            });
            accounts.forEach(function(account) {
                if (!((closedAccounts.get(account.Membership_id) === 1) && (account.accountStatus === 'CLOSED' || account.accountStatus === 'Closed') && !applicationManager.getConfigurationManager().checkUserPermission('VIEW_CLOSED_ACCOUNT'))) {
                    closedAccts.push(account);
                }
            });
            accounts = closedAccts;
			var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
              "appName": "HomepageMA",
              "moduleName": "AccountsUIModule"
              });
            var custDashboard = accountsModule.presentationController.customerdashboard;
            if (custDashboard === "true") {
              var accounts = accounts.slice(this.offset, this.lastRecord)
            }
            var accountTypeIcon = "";
            accounts.forEach(function(account) {
                var accountRoleType = kony.i18n.getLocalizedString("i18n.accounts.personalAccounts");
                if (account.isBusinessAccount === "false") {
                    //                     if(!kony.sdk.isNullOrUndefined(primaryCustomerId)){
                    if ((scopeObj.primaryCustomerId.id === account.Membership_id && scopeObj.primaryCustomerId.type === 'personal') || account.externalIndicator == "true") {
                        accountRoleType = "Personal Accounts";
                        accountTypeIcon = "s";
                    }
                    //                      }
                    else {
                        accountRoleType = account.Membership_id;
                        accountTypeIcon = "s";
                    }
                } else {
                    accountRoleType = account.Membership_id;
                    accountTypeIcon = "r";
                }
                account.accountRoleType = accountRoleType;
                if ((finalData.hasOwnProperty(accountRoleType) && account.Membership_id === finalData[accountRoleType][0]["membershipId"])) {
                    finalData[accountRoleType][1].push(scopeObj.createAllAccountSegmentsModel(account, accounts.length));
                    var totalAccount = finalData[accountRoleType][1].length;
                    finalData[accountRoleType][0].lblAccountTypeNumber = {
                        "text": "(" + totalAccount + ")"
                    }
                } else {
                    finalData[accountRoleType] = [{
                            lblAccountTypeHeader: {
                                "text": accountRoleType === "Personal Accounts" ? accountRoleType : account.MembershipName,
                                "accessibilityconfig": {
                                    "a11yLabel": accountRoleType === "Personal Accounts" ? accountRoleType : account.MembershipName
                                },
                                //"left": isCombinedUser ? "10dp" : "17dp"
                                "left": this.profileAccess === "both" ? "10dp" : "5px",
								"height": "40px"
                            },
                            lblAccountRoleType: {
                                "text": account.isBusinessAccount === "true" ? "r" : "s",
                                //"isVisible": isCombinedUser ? true : false
                                "isVisible": this.profileAccess === "both" ? true : false
                            },
                            lblDropDown: {
                                "text": ViewConstants.FONT_ICONS.CHEVRON_UP,
                                "accessibilityconfig": {
                                    "a11yHidden": true,
                                },
                            },
                            lblTopSeperator: {
                                "isVisible": true
                            },
                            lblBottomSeperator: {
                                "isVisible": true
                            },
							flxHeaderName: {
								"top": "10px"
							},
                            template: "flxAccountsSectionHeader",
                            flxDropDown: {
                                "onClick": function(eventobject, context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": true,
                                        "aria-labelledby": "lblAccountTypeHeader",
                                    }
                                }
                            },
                            //flxAccountRoleType : isCombinedUser ? {"isVisible" : true} : {"isVisible" : false}
                            flxAccountRoleType: this.profileAccess === "both" ? {
                                "isVisible": true
                            } : {
                                "isVisible": false
                            },
                            lblAccountTypeNumber: {
                                "text": "(1)"
                            },
                            membershipId: account.Membership_id,
                            membershipName: account.MembershipName
                        },
                        [scopeObj.createAllAccountSegmentsModel(account, accounts.length)]
                    ];
                }
            });
            finalData = this.sortAccountData(finalData);
             var newData = [];
			var count = this.offset;
			for (i = 0; i < finalData.length; i++) {
                    if (finalData[i][1].length <= this.lastRecord) {
						count = count + finalData[i][1].length;
						if (count > this.lastRecord) {
							
						} else {
                        newData.push(finalData[i]);		
						}
                    }
                }
            return finalData;
        },
        getDataWithAccountTypeSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var paginationrecords = [];
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            this.view.lblAccountsTotal.text = "Total Accounts (" + this.accounts.length + ")";
            this.setPagination({
                    'show': true,
                    'offset': this.offset
                }, accounts);
            for (var key in prioritizeAccountTypes) {
              var accountType = prioritizeAccountTypes[key];
              for (i =0; i<accounts.length; i++){
               if (accounts[i].accountType === accountType) {
               paginationrecords.push(accounts[i]);
              }
              }
            }
			this.sectionData = this.setsectiondata(paginationrecords);
            var accounts = paginationrecords.slice(this.offset, this.lastRecord)
            accounts.forEach(function(account) {
                var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                var totalBalance = 0;
          	    var flag = 0;
                var totalCurrentBalance = 0;
                var accountcount = 0;
                if (finalData.hasOwnProperty(accountType)) {
                    finalData[accountType][1].push(scopeObj.createAllAccountSegmentsModel(account, accounts.length));
                    var totalAccount = finalData[accountType][1].length;
                    finalData[accountType][0].lblAccountTypeNumber = {
                        "text": "(" + totalAccount + ")",
                        "isVisible": false
                    }
                } else {
                    for (i = 0; i < paginationrecords.length; i++) {					 
                        if (paginationrecords[i].accountType === accountType) {   
                               accountcount = accountcount + 1;
                          	   if((OLBConstants.ACCOUNT_TYPE.LOAN === accountType) || (OLBConstants.ACCOUNT_TYPE.MORTGAGE_FACILITY === accountType) || (OLBConstants.ACCOUNT_TYPE.MORTGAGE === accountType))
                               		totalBalance = totalBalance + parseFloat(paginationrecords[i].outstandingBalance || 0.00);
                               else                                   
                               		totalBalance = totalBalance + parseFloat(paginationrecords[i].availableBalance || 0.00);
                                totalCurrentBalance = totalCurrentBalance + parseFloat(Math.abs(paginationrecords[i].currentBalance) || 0.00);                           
                        }
                    }
                  	var leftValue = (kony.application.getCurrentBreakpoint() == 640) ? "43%" : "24%";
                    finalData[accountType] = [{
                            lblAccountTypeHeader: {
                                "text": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                                "accessibilityconfig": {
                                    "a11yLabel": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts")
                                },
                                "left": "5px"
                            },
                            lblAccountRoleType: {
                                "isVisible": false
                            },
                            lblDropDown: {
                                "text": ViewConstants.FONT_ICONS.CHEVRON_UP,
                                "accessibilityconfig": {
                                    "a1yHidden": true
                                },
                            },
                            lblTopSeperator: {
                                "isVisible": true
                            },
                            lblBottomSeperator: {
                                "isVisible": false
                            },
                            lblTotalAccountText: {
                                "isVisible": true,
                                "text": "Total Accounts"
                            },
                            lblAccountTypeCount: {
                              	"left": leftValue,
                                "isVisible": true,
                                "text": "(" + accountcount + ")"
                            },
                            lblTotalAccBalance: {
                                "isVisible": true,
								"text": kony.i18n.getLocalizedString(scopeObj.accountTypeConfig[accountType].balanceTitle),
                            },
                             lblAccountTotalbalance: {
                                "isVisible": true,
								"text": CommonUtilities.formatCurrencyWithCommas(totalBalance.toFixed(2),0,account.currencyCode)
                            },
                            template: "flxAccountsSectionHeader",
                            flxDropDown: {
                                "isVisible": false,
                                "onClick": function(eventobject, context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": true,
                                        "aria-labelledby": "lblAccountTypeHeader",
                                    }
                                }
                            },
                            flxAccountRoleType: {
                                "isVisible": false
                            },
                            flxAccountsTotalBalance: {
                                "isVisible": true
                            },
                            lblAccountTypeNumber: {
                                "text": "(1)",
                                "isVisible": false
                            },
                            membershipId: account.Membership_id
                        },
                        [scopeObj.createAllAccountSegmentsModel(account, accounts.length)]
                    ];
                }
            });
            var data = [];
            if (finalData.hasOwnProperty('Investment')) {
                delete finalData['Investment']
            }
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                }
            }
            for (i = 0; i < data.length; i++) {
                var sortedData = data[i][1];
				for (j = 0; j < sortedData.length; j++){
					for (k =0; k < this.accType.length; k++){
				 	if(this.accType[k] === data[i][0].lblAccountTypeHeader.text && this.TotalCurrency === false){
						data[i][0].lblTotalAccBalance.text = "";
						data[i][0].lblAccountTotalbalance.text = "";
					}
					}
				}
                if (!this.isFavAccAvailable) this.isFavAccAvailable = sortedData.filter(this.isFavourite).length > 0;
                if (!this.isExtAccAvailable) this.isExtAccAvailable = sortedData.filter(this.isExternal).length > 0;
            }
            return data;
        },
		setsectiondata: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function(account) {
                var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                if (finalData.hasOwnProperty(accountType)) {
                    finalData[accountType][1].push(scopeObj.createAllAccountSegmentsModel(account, accounts.length));
                    var totalAccount = finalData[accountType][1].length;
                    finalData[accountType][0].lblAccountTypeNumber = {
                        "text": "(" + totalAccount + ")",
                        "isVisible": false
                    }
                } else {
                    finalData[accountType] = [{
                            lblAccountTypeHeader: {
                                "text": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                                "accessibilityconfig": {
                                    "a11yLabel": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts")
                                },
                                "left": "5px"
                            },
                            membershipId: account.Membership_Id
                        },
                        [scopeObj.createAllAccountSegmentsModel(account, accounts.length)]
                    ];
                }
            });
            var sectionData = [];
			var data = [];
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    sectionData.push(accountType);
					data.push(finalData[accountType]);
                    this.accountGroups[accountType] = {
                        membershipId: finalData[accountType][0]["membershipId"],
                        accountType: accountType === "Personal Accounts" ? accountType : finalData[accountType][0].lblAccountTypeHeader.text
                    };
                }
            }
			for (i = 0; i < data.length; i++) {
                var sortedData = data[i][1];		
                var currency = data[i][1][0].currency;
				for (j = 0; j < sortedData.length; j++){
				 	if(sortedData[j].currency !== currency){
						this.accType.push(data[i][0].lblAccountTypeHeader.text);
						this.TotalCurrency = false
					}
				}
               
            }
            return sectionData;
        },
        totalBalanceAddition: function(data) {
            var totalBalanceTitle;
            for (i = 0; i < data.length; i++) {
                var totalBalance = 0;
                if (data[i][1][0].isNoRecords) {
                    continue;
                }
                var currency = data[i][1][0].currency;
                var flag = 0;
                data[i][1].forEach(function(account) {
                    if (account.accountType === "Savings" || account.accountType === "Checking") totalBalanceTitle = kony.i18n.getLocalizedString("i18n.account.totalBalance");
                    else if (account.accountType === "CreditCard" || account.accountType === "Deposit") totalBalanceTitle = kony.i18n.getLocalizedString("i18n.accounts.totalCurrentBalance");
                    else totalBalanceTitle = kony.i18n.getLocalizedString("i18n.accounts.totalOutstandingBalance");
                    if (account.currency !== currency) flag = 1;
                    else totalBalance = totalBalance + parseFloat(account.accountBalance);
                });
                if (data[i][1].length > 1) {
                    if (flag === 0) {
                        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                            data[i][1].push({
                                "template": "flxRowTotalAccountsGroupBalanceMobile",
                                "lblTotalAccountsTitle": {
                                    text: "Total Accounts"
                                },
                                "lblTotalAccountsValue": {
                                    text: data[i][1].length.toString()
                                },
                                "lblTotalBalanceTitle": {
                                    text: totalBalanceTitle
                                },
                                "lblTotalBalanceValue": {
                                    text: CommonUtilities.formatCurrencyWithCommas(totalBalance, false, currency)
                                },
                                "flxRowTotalAccountsGroupBalanceMobile": {
                                    height: "70dp"
                                }
                            });
                        } else {
                            data[i][1].push({
                                "template": "flxRowTotalAccountsGroupBalance",
                                "lblTotalAccountsTitle": {
                                    text: "Total Accounts: "
                                },
                                "lblTotalAccountsValue": {
                                    text: data[i][1].length.toString()
                                },
                                "lblTotalBalanceTitle": {
                                    text: totalBalanceTitle
                                },
                                "lblTotalBalanceValue": {
                                    text: CommonUtilities.formatCurrencyWithCommas(totalBalance, false, currency)
                                },
                                "flxRowTotalAccountsGroupBalance": {
                                    height: "120dp"
                                }
                            });
                        }
                    } else {
                        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                            data[i][1].push({
                                "template": "flxRowTotalAccountsGroupBalanceMobile",
                                "lblTotalAccountsTitle": {
                                    text: "Total Accounts"
                                },
                                "lblTotalAccountsValue": {
                                    text: data[i][1].length.toString()
                                },
                                "lblTotalBalanceTitle": {
                                    isVisible: false
                                },
                                "lblTotalBalanceValue": {
                                    isVisible: false
                                },
                                "flxRowTotalAccountsGroupBalanceMobile": {
                                    height: "70dp"
                                }
                            });
                        } else {
                            data[i][1].push({
                                "template": "flxRowTotalAccountsGroupBalance",
                                "lblTotalAccountsTitle": {
                                    text: "Total Accounts: "
                                },
                                "lblTotalAccountsValue": {
                                    text: data[i][1].length.toString()
                                },
                                "lblTotalBalanceTitle": {
                                    isVisible: false
                                },
                                "lblTotalBalanceValue": {
                                    isVisible: false
                                },
                                "flxRowTotalAccountsGroupBalance": {
                                    height: "120dp"
                                }
                            });
                        }
                    }
                } else {
                    data[i][1][data[i][1].length - 1]["lblSeperator"] = {
                        "isVisible": false
                    };
                }
            }
            return data;
        },
        getDualBalanceConfiguration: function() {
            var dualConfiguration = OLBConstants.CLIENT_PROPERTIES.DUAL_BALANCE;
            if (dualConfiguration != undefined && dualConfiguration.length > 0) {
                dualConfiguration = JSON.parse(dualConfiguration)
            } else {
                dualConfiguration = {
                    "isAvailableBalanceToBeDisplayed": true,
                    "isCurrentBalanceToBeDisplayed": false
                };
            }
            dualConfiguration.isAvailableBalanceToBeDisplayed = (dualConfiguration.isAvailableBalanceToBeDisplayed === false && dualConfiguration.isCurrentBalanceToBeDisplayed === false) ? true : dualConfiguration.isAvailableBalanceToBeDisplayed;
            return dualConfiguration;
        },
        generateTotalBalanceHide: function(data) {
			return data;
		},
        generateTotalBalance: function(data) {
            var dualConfig = this.getDualBalanceConfiguration();
            for (i = 0; i < data.length; i++) {
                var totalBalance = 0;
                var flag = 0;
                var totalCurrentBalance = 0;
                var currency = data[i][1][0].currency;
                if (data[i][1][0].isNoRecords) {
                    continue;
                }
                data[i][1].forEach(function(account) {
                    if (account.currency !== currency) flag = 1;
                    else {
                        totalBalance = totalBalance + parseFloat(account.accountBalance || 0.00);
                        totalCurrentBalance = totalCurrentBalance + parseFloat(account.currentBalance || 0.00);
                    }
                });
                var getTextForAccountType = function(accountType) {
                    var text = kony.i18n.getLocalizedString("i18n.account.totalBalance");
                    if (accountType === OLBConstants.ACCOUNT_TYPE.SAVING || accountType === OLBConstants.ACCOUNT_TYPE.CHECKING) {
                        text = (dualConfig.isCurrentBalanceToBeDisplayed === true && dualConfig.isAvailableBalanceToBeDisplayed === false) ? kony.i18n.getLocalizedString("i18n.accounts.totalCurrentBalance") : kony.i18n.getLocalizedString("i18n.account.totalBalance");
                    } else if (accountType === OLBConstants.ACCOUNT_TYPE.CREDITCARD || accountType === OLBConstants.ACCOUNT_TYPE.DEPOSIT) {
                        text = kony.i18n.getLocalizedString("i18n.accounts.totalCreditBalance");
                    } else if (accountType === OLBConstants.ACCOUNT_TYPE.LOAN) {
                        text = kony.i18n.getLocalizedString("i18n.accounts.totalOutstandingBalance");
                    }
                    return text;
                };
                var getTotalForAccountType = function(accountType) {
                    var total = totalBalance;
                    if (accountType === OLBConstants.ACCOUNT_TYPE.SAVING || accountType === OLBConstants.ACCOUNT_TYPE.CHECKING || accountType === OLBConstants.ACCOUNT_TYPE.MORTGAGE_FACILITY) {
                        total = (dualConfig.isCurrentBalanceToBeDisplayed === true && dualConfig.isAvailableBalanceToBeDisplayed === false) ? totalCurrentBalance : totalBalance;
                    }
                    return total;
                }
                if (data[i][1].length > 1 && flag === 0) {
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                        data[i][1].push({
                            "template": "flxRowTotalAccountsGroupBalanceMobile",
                            "lblTotalAccountsTitle": {
                                text: getTextForAccountType(data[i][1][0].accountType),
                                centerY: "50%"
                            },
                            "lblTotalAccountsValue": {
                                isVisible: false
                            },
                            "lblTotalBalanceTitle": {
                                isVisible: false
                            },
                            "lblTotalBalanceValue": {
                                text: CommonUtilities.formatCurrencyWithCommas((getTotalForAccountType(data[i][1][0].accountType)).toFixed(2)),
                                centerY: "50%"
                            },
                            "flxRowTotalAccountsGroupBalanceMobile": {
                                height: "50dp"
                            }
                        });
                    } else {
                        data[i][1].push({
                            "template": "flxRowTotalAccountsGroupBalance",
                            "lblTotalAccountsTitle": {
                                text: getTextForAccountType(data[i][1][0].accountType)
                            },
                            "lblTotalAccountsValue": {
                                isVisible: false
                            },
                            "lblTotalBalanceTitle": {
                                isVisible: false
                            },
                            "lblTotalBalanceValue": {
                                text: CommonUtilities.formatCurrencyWithCommas((getTotalForAccountType(data[i][1][0].accountType)).toFixed(2), false, data[i][1][0].currency)
                            },
                            "flxRowTotalAccountsGroupBalance": {
                                //height: "120dp"
                            }
                        });
                    }
                } else {
                    data[i][1][data[i][1].length - 1]["lblSeperator"] = {
                        "isVisible": false
                    };
                }
            }
            return data;
        },
        showOrHideAccountRows: function(context) {
            var section = context.sectionIndex;
            var segData = this.view.accountList.segAccounts.data;
            var isRowVisible = true;
            var dataLength;
            var i;
            var height;
            if (segData[section][0].lblDropDown.text === "O") {
                segData[section][0]["lblDropDown"] = {
                    text: "P"
                };
                segData[section][0]["lblDropDown"].accessibilityConfig = {
                    "a11yHidden": true,
                }
                segData[section][0]["flxDropDown"].accessibilityConfig = {
                    "a11yARIA": {
                        "role": "button",
                        "aria-labelledby": "lblAccountTypeHeader",
                        "aria-expanded": true,
                    }
                }
                isRowVisible = true;
            } else {
                segData[section][0]["lblDropDown"] = {
                    text: "O"
                };
                segData[section][0]["lblDropDown"].accessibilityConfig = {
                    "a11yHidden": true,
                }
                segData[section][0]["flxDropDown"].accessibilityConfig = {
                    "a11yARIA": {
                        "role": "button",
                        "aria-labelledby": "lblAccountTypeHeader",
                        "aria-expanded": false,
                    }
                }
                isRowVisible = false;
            }
            if (!kony.sdk.isNullOrUndefined(segData[section][1][segData[section][1].length - 1].flxRowTotalAccountsGroupBalanceMobile) || !kony.sdk.isNullOrUndefined(segData[section][1][segData[section][1].length - 1].flxRowTotalAccountsGroupBalance)) dataLength = segData[section][1].length - 1;
            else dataLength = segData[section][1].length;
            for (var i = 0; i < dataLength; i++) {
                if (segData[section][1][i].isNoRecords) {
                    var flxNoResultsFound = JSON.parse(JSON.stringify(segData[section][1][i].flxNoResultsFound));
                    flxNoResultsFound["isVisible"] = isRowVisible;
                    this.updateKeyAt("flxNoResultsFound", flxNoResultsFound, i, section);
                } else {
                    var flxAccountsRowWrapper = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountsRowWrapper));
                    flxAccountsRowWrapper["isVisible"] = isRowVisible;
                    this.updateKeyAt("flxAccountsRowWrapper", flxAccountsRowWrapper, i, section);
                }
            }
            if (dataLength === segData[section][1].length - 1) {
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    if (!kony.sdk.isNullOrUndefined(segData[section][1][i].flxRowTotalAccountsGroupBalanceMobile)) {
                        var flxRowTotalAccountsGroupBalanceMobile = JSON.parse(JSON.stringify(segData[section][1][i].flxRowTotalAccountsGroupBalanceMobile));
                        height = (flxRowTotalAccountsGroupBalanceMobile["height"] === "0dp") ? "120dp" : "0dp";
                        flxRowTotalAccountsGroupBalanceMobile["height"] = height;
                        this.updateKeyAt("flxRowTotalAccountsGroupBalanceMobile", flxRowTotalAccountsGroupBalanceMobile, i, section);
                    }
                } else {
                    if (!kony.sdk.isNullOrUndefined(segData[section][1][i].flxRowTotalAccountsGroupBalance)) {
                        var flxRowTotalAccountsGroupBalance = JSON.parse(JSON.stringify(segData[section][1][i].flxRowTotalAccountsGroupBalance));
                        height = (flxRowTotalAccountsGroupBalance["height"] === "0dp") ? "120dp" : "0dp";
                        flxRowTotalAccountsGroupBalance["height"] = height;
                        this.updateKeyAt("flxRowTotalAccountsGroupBalance", flxRowTotalAccountsGroupBalance, i, section);
                    }
                }
            }
            segData[section][0]["lblBottomSeperator"] = {
                isVisible: isRowVisible
            };
            segData = this.view.accountList.segAccounts.data;
            this.view.accountList.segAccounts.setSectionAt(segData[section], section);
            this.view.forceLayout();
            this.AdjustScreen();
            this.view.accountList.segAccounts.setActive(-1,section,"flxAccountsSectionHeader.flxGroupAccountsHeader.flxHeaderWrapper.flxDropDown");
        },
        updateKeyAt: function(widgetName, value, row, section) {
            var data = this.view.accountList.segAccounts.data;
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this.view.accountList.segAccounts.setDataAt(rowDataTobeUpdated, row, section);
        },
        /*
         * Method to sort accounts data
         */
        sortAccountData: function(finalData) {
            var data = [];
            var prioritizeAccountRoleTypes = [];
            var viewType = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');
            var sections = Object.keys(finalData);
            var index = sections.indexOf(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
            if (index > -1) {
                sections.splice(index, 1);
            }
            index = sections.indexOf(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"));
            if (index > -1) {
                sections.splice(index, 1);
            }
            //       if(viewType === 0){
            prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
            prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"));
            prioritizeAccountRoleTypes = prioritizeAccountRoleTypes.concat(sections);
            //       }
            //       else if(viewType === 1){
            //         prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
            //       }
            //       else if(viewType === 2){
            //         prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"));
            //         prioritizeAccountRoleTypes = prioritizeAccountRoleTypes.concat(sections);
            //       }
            //       else {
            //         prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"));
            //         prioritizeAccountRoleTypes = prioritizeAccountRoleTypes.concat(sections);
            //       }
            this.sectionData = [];
            for (var i = 0; i < prioritizeAccountRoleTypes.length; i++) {
                var accountType = prioritizeAccountRoleTypes[i];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                    this.accountGroups[accountType] = {
                        membershipId: finalData[accountType][0]["membershipId"],
                        membershipName: accountType === "Personal Accounts" ? accountType : finalData[accountType][0]["membershipName"]
                    };
                }
            }
            this.isFavAccAvailable = false;
            for (var i = 0; i < data.length; i++) {
                var accoountTypeOrder = applicationManager.getTypeManager().getAccountTypesByPriority();
                var sortedData = data[i][1];
                sortedData.sort(function(a, b) {
                    return accoountTypeOrder.indexOf(a.lblAccountType) - accoountTypeOrder.indexOf(b.lblAccountType);
                });
                data[i][1] = sortedData;
                if (!this.isFavAccAvailable) this.isFavAccAvailable = sortedData.filter(this.isFavourite).length > 0;
            }
            //To Remove Seperator from last record of each section
            //       for (var i = 0; i < data.length; i++) {
            //         var sectionalAccounts = data[i][1];
            //         if(!kony.sdk.isNullOrUndefined(sectionalAccounts) &&
            //            !kony.sdk.isNullOrUndefined(data[i][1][sectionalAccounts.length - 1]) &&
            //            !kony.sdk.isNullOrUndefined(data[i][1][sectionalAccounts.length - 1].lblSeperator) )
            //         {
            //           data[i][1][sectionalAccounts.length - 1].lblSeperator.height = "0dp";
            //         }
            //       }
            return data;
        },
        /**
         * Method to update accounts list
         * @param {Collection} accounts List of accounts
         */
        updateAccountList: function(accounts) {
            var scopeObj = this;
            var data;
            this.view.accountList.segAccounts.widgetDataMap = {
                "lblAccountName": "lblAccountName",
                "lblRoleIcon": "lblRoleIcon",
                "lblFavoriteIcon": "lblFavoriteIcon",
                "imgBankIcon": "imgBankIcon",
                "flxFavorite": "flxFavorite",
                "flxBankIcon": "flxBankIcon",
                "lblBankIcon": "lblBankIcon",
                "lblAccountType": "lblAccountType",
                "lblAvailableBalanceValue": "lblAvailableBalanceValue",
                "lblAvailableBalanceTitle": "lblAvailableBalanceTitle",
                "imgThreeDotIcon": "imgThreeDotIcon",
                "flxMenu": "flxMenu",
                "flxContent":"flxContent",
                "flxAccountRoleType": "flxAccountRoleType",
                "lblAccountRoleType": "lblAccountRoleType",
                "lblAccountTypeHeader": "lblAccountTypeHeader",
				"flxHeaderName": "flxHeaderName",
                "flxDropDown": "flxDropDown",
                "lblDropDown": "lblDropDown",
                "lblSeperator": "lblSeperator",
                "lblBottomSeperator": "lblBottomSeperator",
                "lblTopSeperator": "lblTopSeperator",
                "flxAccountsRowWrapper": "flxAccountsRowWrapper",
                "flxNoResultsFound": "flxNoResultsFound",
                "flxStatus": "flxStatus",
                "lblNoResultsFound": "lblNoResultsFound",
                "imgNoResultsFound": "imgNoResultsFound",
                "lblTotalAccountsTitle": "lblTotalAccountsTitle",
                "lblTotalAccountsValue": "lblTotalAccountsValue",
                "lblTotalBalanceTitle": "lblTotalBalanceTitle",
                "lblTotalBalanceValue": "lblTotalBalanceValue",
              //  "flxRowTotalAccountsGroupBalance": "flxRowTotalAccountsGroupBalance",
              //  "flxRowTotalAccountsGroupBalanceMobile": "flxRowTotalAccountsGroupBalanceMobile",
                "imgExternalAlert": "imgExternalAlert",
                "lblCurrentBalanceValue": "lblCurrentBalanceValue",
                "lblCurrentBalanceTitle": "lblCurrentBalanceTitle",
              	"flxAccountsSectionHeader":"flxAccountsSectionHeader",
                "lblAccountTypeNumber": "lblAccountTypeNumber",
                "lblTotalAccountText": "lblTotalAccountText",
                "lblAccountTypeCount": "lblAccountTypeCount",
                "lblTotalAccBalance": "lblTotalAccBalance",
                "lblAccountTotalbalance": "lblAccountTotalbalance",
                "flxAccountsTotalBalance": "flxAccountsTotalBalance",
                "flxAvailableBalance": "flxAvailableBalance",
                "flxCurrentBalance": "flxCurrentBalance",
                "accountStatus": "accountStatus"
            };
            this.isExtAccAvailable = false;
            this.isFavAccAvailable = false;
            var isCustViewAvailable = false;
            var scopeObj = this;
            if (this.isDefaultFilterApplied === true && this.currentView !== "All Accounts") {
                var filterQuery = this.currentView;
                if (filterQuery === kony.i18n.getLocalizedString("i18n.Accounts.FavouriteAccounts")) {
                    accounts = accounts.filter(this.isFavourite);
                } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"))) {
                    accounts = accounts.filter(this.isPersonalAccount);
                } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"))) {
                    accounts = accounts.filter(this.isBusinessAccount);
                } else if (filterQuery.includes(this.bankName)) {
                    accounts = accounts.filter(this.isDbx);
                } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.hamburger.externalAccounts"))) {
                    accounts = accounts.filter(this.isExternal);
                } else {
                    accounts = accounts.filter(this.cifFilter);
                }
            }
            if (this.isCustomFilterApplied === true) {
                if (this.currentView) {
                    if (this.currDashboard === 1) {
                        this.personalContained.forEach(function(view) {
                            var customViewName = scopeObj.currentView.split('~')[0];
                            if (view.name === customViewName) isCustViewAvailable = true;
                        });
                    } else if (this.currDashboard === 2) {
                        var customViewName = scopeObj.currentView.split('~')[0];
                        this.businessContained.forEach(function(view) {
                            if (view.name === customViewName) isCustViewAvailable = true;
                        });
                    } else isCustViewAvailable = true;
                }
                if (isCustViewAvailable === false) {
                    this.currentView = '';
                    if (this.presenter.presentationController.customerdashboard === "true") {
                        this.accounts = this.presenter.presentationController.customeraccounts;
                    } else {
                            this.accounts = this.presenter.presentationController.accounts;
                    }	
                }
                if (this.currentView !== '' && this.currentView.indexOf("~") === -1) accounts = accounts.filter(this.isBelongsToCustomView);
                //this.view.accountList.segAccounts.setData(this.currentViewData);
                else if (this.currentView.indexOf("~") !== -1) {
                    //this.currentViewData = [];
                    var customViewAccounts = this.currentView.split("~")[1].split(",");
                    this.currentView = this.currentView.split("~")[0];
                    if (this.presenter.presentationController.customerdashboard === "true") {
                          var accountsCV = this.presenter.presentationController.customeraccounts;
                      } else {
                              var accountsCV = this.presenter.presentationController.accounts;
                      }	
                    accounts = [];
                    for (i = 0; i < customViewAccounts.length; i++) {
                        for (j = 0; j < accountsCV.length; j++) {
                            if (customViewAccounts[i] === accountsCV[j].Account_id) {
                                accounts.push(accountsCV[j]);
                            }
                        }
                    }
                }
            }
            //         accountTypeGroupedAccounts = this.getDataWithAccountTypeSections(this.currentViewData);
            //         if (!this.isRetailUser) companyGroupedAccounts = this.getDataWithSections(this.currentViewData);
            //         if (this.isRetailUser) data = accountTypeGroupedAccounts;
            //         else data = companyGroupedAccounts;
            //         data = this.totalBalanceAddition(data);
            //         this.view.accountList.segAccounts.setData(data);
            //         this.currentViewData = data;
            //       }
            //       else {
            //accountTypeGroupedAccounts = this.getDataWithAccountTypeSections(accounts);
            //if (!this.isRetailUser) companyGroupedAccounts = this.getDataWithSections(accounts);
            if (this.isSingleCustomerProfile) data = this.getDataWithAccountTypeSections(accounts);
            else data = this.getDataWithSections(accounts);
            if (this.isSingleCustomerProfile) data = this.generateTotalBalanceHide(data);
            else if (this.isAdvancedFilterApplied) {
                if (this.view.advancedFilters.lblIconGroupCompany.text !== 'M') data = this.generateTotalBalance(data);
                this.flxGroupByCompanyAccessibility();
            }
            if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.SMARTBANKINGADVISORY)) {
                //This piece of code will handle the SBA related things on rendering UI when navigated to dashboard and at first time
                if (this.view.lblSelectedFilter.text === kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")) {
                    if (this.checkAndCountBusinessAccount(data) === 1) {
                        // Having only single business
                        isSingleBusinessView = true;
                        if (applicationManager.getSbaJourney() != '') {
                            // Nav back to dashboard screen
                            this.enableSbaFunctionality(applicationManager.sbaJourney[indexOfBusiness].BackendId);
                            this.updateHamburger();
                        }
                    }
                } else {
                    // Having multiple businesses
                    if (this.checkAndCountBusinessAccount(data) >= 1) {
                        // Nav back to dashboard screen
                        this.enableSbaFunctionality(selectedBusiness.BackendId);
                        this.updateHamburger();
                    }
                }
            }
            if (AccountsData === undefined)
                AccountsData = JSON.parse(JSON.stringify(data));
            this.view.accountList.segAccounts.setData(data);
            this.view.accountList.forceLayout();
            this.view.forceLayout();
            this.AdjustScreen();
            this.flxGroupByCompanyAccessibility();
        },
        /**
         * Method to update alert icon for unread messages
         * @param {Number} unreadCount Unread count of messages
         */
        updateAlertIcon: function(unreadCount) {
            applicationManager.getConfigurationManager().setUnreadMessageCount(unreadCount);
            this.view.customheader.headermenu.updateAlertIcon();
        },
        /**
         * Show Overdraft Notifaction Message
         * @param {String} isOverdraft Param to check if a transaction is over drafted
         * @param {String} overDraftMessage overDraft message (optional)
         */
        setOverdraftNotification: function(isOverdraft, overDraftMessage) {
            var scopeObj = this;
            var overdraftUI = scopeObj.view.flxOverdraftWarning;
            if (isOverdraft && !overdraftUI.isVisible) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(scopeObj.view.lblOverdraftWarning, overDraftMessage || kony.i18n.getLocalizedString("i18n.AccountsLanding.OverDraftWarning"), accessibilityConfig);
                this.view.lblOverdraftWarning.accessibilityConfig = {
                    a11yARIA: {
                        tabindex: -1,
                        "role": "status"
                    },
                }
                scopeObj.view.flxCloseWarning.onClick = function() {
                    scopeObj.setOverdraftNotification.setVisibility(false);
                    scopeObj.flxOverdraftWarning.setVisibility(false);
                };
                overdraftUI.setVisibility(true);
                //scopeObj.view.lblOverdraftWarning.setFocus(true);
                scopeObj.AdjustScreen();
            } else if (!isOverdraft && overdraftUI.isVisible) {
                function timerFunc() {
                    overdraftUI.setVisibility(false);
                    var acctop = scopeObj.view.accountListMenu.frame.y + 5;
                    scopeObj.view.accountListMenu.top = acctop + ViewConstants.POSITIONAL_VALUES.DP;
                    scopeObj.AdjustScreen();
                    kony.timer.cancel("mytimerOverdraft");
                }
                kony.timer.schedule("mytimerOverdraft", timerFunc, 0.1, false);
            }
        },
        /**
         * Method to update upcomming transactions
         * @param {Collection} transactions List of transactions
         */
        showUpcomingTransactionsWidget: function(transactions) {
            var self = this;
            var accounts;
            if (self.accounts.length !== 0) accounts = self.accounts;
            else accounts = self.presenter.presentationController.accounts;
            var currDashboard = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');
            self.transactions = transactions;
            self.view.upcomingTransactionsCombined.initSegmentData(transactions, orientationHandler, accounts, currDashboard);
            self.AdjustScreen();
        },
        /**
         * Method to Hide the PFM Widget on DashBoard Based on the configuration flag. "isPFMWidgetEnabled"
         */
        disablePFMWidget: function() {
            this.view.mySpending.setVisibility(false);
        },
        /**
         * Format data for PFM donut chart
         * @param {Object} monthlyData Monthly data
         * @returns {Object} Formatted Donut chart data
         */
        formatPFMDonutChartData: function(monthlyData) {
            var monthlyDonutChartData = {};

            function addRequireDonutChartFields(month) {
                month.label = month.categoryName;
                month.Value = Number(month.cashSpent);
                month.colorCode = ViewConstants.PFM_CATEGORIES_COLORS[month.categoryName];
                return month;
            }
            var pfmData = monthlyData.map(addRequireDonutChartFields);
            if (monthlyData.length !== 0) {
                monthlyDonutChartData.totalCashSpent = CommonUtilities.formatCurrencyWithCommas(monthlyData[0].totalCashSpent);
            }
            monthlyDonutChartData.pfmChartData = pfmData;
            return monthlyDonutChartData;
        },
        /**
         * Method to get PFM mo0nthly data*
         * @param {Object} PFMData PFM data from backend
         */
        getPFMMonthlyDonutChart: function(PFMData) {
            this.donutChartData = PFMData;
            var donutData = this.formatPFMDonutChartData(PFMData);
            this.view.mySpending.flxMySpendingWrapper.isVisible = true;
            //this.view.mySpending.lblHeader.skin = ViewConstants.SKINS.LABEL_HEADER_BOLD;
            var monthlyChartData = donutData.pfmChartData,
                totalCashSpent = donutData.totalCashSpent;
            if (this.profileAccess === "both") {
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.mySpending.imgMySpendingIcon.skin = "sknLblOLBFontIcons003E7510pxbordere3e3e3";
                    this.view.mySpending.imgMySpendingIcon.width = "18dp";
                    this.view.mySpending.imgMySpendingIcon.height = "18dp";
                    this.view.mySpending.imgMySpendingIcon.text = "s";
                    this.view.mySpending.imgMySpendingIcon.setVisibility(true);
                    this.view.mySpending.lblHeader.left = "0dp";
                    this.view.mySpending.width = "93%";
                    this.view.mySpending.left = "2%";
                } else {
                    this.view.mySpending.imgMySpendingIcon.skin = "sknLblOLBFontIcons003E7512pxbordere3e3e3";
                    //this.view.mySpending.imgMySpendingIcon.skin = "sknLblOLBFontIcons003E7517pxbordere3e3e3";
                    this.view.mySpending.imgMySpendingIcon.text = "s";
                    this.view.mySpending.imgMySpendingIcon.setVisibility(true);
                    this.view.mySpending.lblHeader.left = "0dp";
                }
            } else {
                this.view.mySpending.imgMySpendingIcon.setVisibility(false);
                this.view.mySpending.lblHeader.left = "30dp";
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.mySpending.width = "93%";
                    this.view.mySpending.left = "2%";
                    this.view.mySpending.top = "17dp";
                }
            }
            if (monthlyChartData.length !== 0) {
                this.view.mySpending.flxMySpendingWrapper.flxMySpending.setVisibility(true);
                this.view.mySpending.lblOverallSpendingAmount.isVisible = true;
                this.view.mySpending.flxMySpendingWrapper.flxMySpending.donutChart1.chartData = monthlyChartData;
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.mySpending.flxMySpendingWrapper.lblOverallSpendingAmount, totalCashSpent, accessibilityConfig);
                this.view.lblOverdraftWarning.accessibilityConfig = {
                    a11yARIA: {
                        tabindex: -1,
                        "role": "status"
                    },
                }
                this.view.mySpending.flxSeparator.setVisibility(true);
                this.view.mySpending.flxMySpendingWrapperdataUnavailable.setVisibility(false);
            } else {
                this.view.mySpending.flxMySpendingWrapper.setVisibility(false);
                this.view.mySpending.flxSeparator.setVisibility(false);
                this.view.mySpending.flxMySpendingWrapperdataUnavailable.setVisibility(true);
            }
            this.view.mySpending.flxSeparator.setVisibility(false);
            this.AdjustScreen()
        },
        /**
         * Sets data regarding added external accounts in the segment
         * @param {Collection} accounts List of accounts
         */
        setAddedAccountsData: function(accounts) {
            var self = this;
            var widgetDataMap = {
                "lblCheckBox": "lblCheckBox",
                'lblAccountName': "AccountName",
                'lblAccountNumber': "AccountType",
                'lblAvailableBalanceValue': "AvailableBalanceWithCurrency",
                'lblAvailableBalanceTitle': "AvailableBalanceLabel",
                'lblSeperator': "separator",
                'flxcheckbox': "flxcheckbox"
            };
            this.view.AddExternalAccounts.Acknowledgment.segSelectedAccounts.widgetDataMap = widgetDataMap;
            var data = accounts.map(function(account) {
                return {
                    "AccountName": account.AccountName,
                    "AccountType": account.AccountType,
                    "AvailableBalanceWithCurrency": account.AvailableBalanceWithCurrency,
                    "AvailableBalanceLabel": account.AccountType ? kony.i18n.getLocalizedString(self.accountTypeConfig[account.AccountType.text].balanceTitle) : kony.i18n.getLocalizedString(self.accountTypeConfig["Default"].balanceTitle),
                    "separator": account.separator,
                    "AvailableBalance": account.AvailableBalance,
                    "CurrencyCode": account.CurrencyCode,
                    "AccountNumber": account.Number,
                    "BankId": account.bank_id,
                    "TypeId": account.Type_id,
                    "AccountHolder": account.AccountHolder,
                    "UserName": account.userName
                };
            });
            this.view.AddExternalAccounts.Acknowledgment.segSelectedAccounts.setData(data);
        },
        /**
         * Method to navigate to the acknolodgement
         */
        NavigateToAcknowledgment: function() {
            this.HideAll();
            this.NavigateToAddExternalAccounts();
            this.HideAllExternalAcc();
            this.view.AddExternalAccounts.flxAcknowledgment.isVisible = true;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.AddExternalAccounts.Acknowledgment.btnAddMoreAccounts, kony.i18n.getLocalizedString("i18n.AccountsAggregation.AddMoreAccounts"), accessibilityConfig);
            CommonUtilities.setText(this.view.AddExternalAccounts.Acknowledgment.btnAccountSummary, kony.i18n.getLocalizedString("i18n.AccountsAggregation.AccountSummary"), accessibilityConfig);
            this.view.AddExternalAccounts.Acknowledgment.btnAccountSummary.toolTip = kony.i18n.getLocalizedString("i18n.AccountsAggregation.AccountSummary");
            this.view.AddExternalAccounts.Acknowledgment.btnAddMoreAccounts.toolTip = kony.i18n.getLocalizedString("i18n.AccountsAggregation.AddMoreAccounts");
        },
        /**
         * Navigates to show confirmation for added external accounts
         * @param {Array} addedExternalAccounts External account list
         */
        presentExternalAccountsAddedConfirmation: function(addedExternalAccounts) {
            var selectedAccounts = [];
            for (var i = 0; i < this.selectedRowIndices.length; i++) {
                selectedAccounts.push(this.view.AddExternalAccounts.LoginUsingSelectedBank.segSelectedAccounts.data[this.selectedRowIndices[i]]);
            }
            this.setAddedAccountsData(selectedAccounts);
            this.NavigateToAcknowledgment();
            this.AdjustScreen();
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.AddExternalAccounts.Acknowledgment.lblSuccessmsg, kony.i18n.getLocalizedString("i18n.AcountsAggregation.ExternalAccountAddition.ComfirmationMessage") + " " + this.ExternalLoginContextData.bankName, accessibilityConfig);
            this.view.AddExternalAccounts.Acknowledgment.btnAccountSummary.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule").presentationController.showAccountsDashboard();
            }
            this.view.AddExternalAccounts.Acknowledgment.btnAddMoreAccounts.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule").presentationController.showExternalBankList();
            }
            CommonUtilities.hideProgressBar(this.view);
        },
        /**
         * Method to enable Or Disable External Login
         * @param {String} username username
         * @param {String} password password
         * @returns {Boolean} true/false
         */
        enableOrDisableExternalLogin: function(username, password) {
            if (username && String(username).trim() !== "" && password && String(password).trim() !== "") {
                this.enableButton(this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin);
                return true;
            } else {
                this.disableButton(this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin);
                return false;
            }
        },
        /**
         * Method that logins to external bank
         */
        onClickOfExternalBankLogin: function() {
            if (!(this.enableOrDisableExternalLogin(this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.text, this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.text))) {
                return;
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankError.isVisible = false;
            FormControllerUtility.showProgressBar(this.view);
            this.ExternalLoginContextData.username = this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.text;
            this.ExternalLoginContextData.password = this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.text;
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
            accountModule.presentationController.authenticateUserInExternalBank(this.ExternalLoginContextData.username, this.ExternalLoginContextData.password, this.ExternalLoginContextData.identityProvider);
        },
        /**
         * Method to navigate to login screen
         */
        NavigateToLogin: function() {
            this.HideAll();
            this.NavigateToAddExternalAccounts();
            this.HideAllExternalAcc();
            this.view.AddExternalAccounts.flxLoginUsingSelectedBank.isVisible = true;
            this.view.AddExternalAccounts.setVisibility(true);
            this.view.AddExternalAccounts.flxSelectBankOrVendor.setVisibility(false);
            this.view.AddExternalAccounts.flxLoginUsingSelectedBank.setVisibility(true);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.setVisibility(true);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankError.isVisible = false;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBank.setVisibility(true);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankMain.setVisibility(true);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankHeading.text = kony.i18n.getLocalizedString("i18n.AccountsAggregation.LoginUsingSelectedBank");
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin, kony.i18n.getLocalizedString("i18n.common.login"), accessibilityConfig);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.toolTip = this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.text;
            this.enableOrDisableExternalLogin(this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.text, this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.text);
        },
        /**
         * Method to show External Bank Login
         * @param {Object} data External bank data
         */
        showExternalBankLogin: function(data) {
            this["ExternalLoginContextData"] = data;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.text = "";
            this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.text = "";
            this.view.flxActions.isVisible = true;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.secureTextEntry = true;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.imgflxLoginUsingSelectedBank.src = data.logo;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankMessage.text = "Welcome to " + data.bankName;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.toolTip = kony.i18n.getLocalizedString("i18n.common.login");
            this.view.AddExternalAccounts.LoginUsingSelectedBank.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            //             this.view.AddExternalAccounts.LoginUsingSelectedBank.btnCancel.left = "37.07%";
            this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.isVisible = true;
            this.NavigateToLogin();
            this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.onClick = this.onClickOfExternalBankLogin.bind(this);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.btnCancel.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule").presentationController.showAccountsDashboard();
            };
            this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.onDone = this.onClickOfExternalBankLogin.bind(this);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.onDone = this.onClickOfExternalBankLogin.bind(this);
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankMessage.skin = "sknSSPLight42424220Pxs";
            }
            this.AdjustScreen();
        },
        /**
         * Method to disable button
         * @param {String} button
         */
        disableButton: function(button) {
            button.setEnabled(false);
            button.skin = ViewConstants.SKINS.LOCATE_BTNSHARESEND;
            button.hoverSkin = ViewConstants.SKINS.LOCATE_BTNSHARESEND;
            button.focusSkin = ViewConstants.SKINS.LOCATE_BTNSHARESEND;
        },
        /**
         * Method to enable button
         * @param {String} button
         */
        enableButton: function(button) {
            button.setEnabled(true);
            button.skin = ViewConstants.SKINS.PFM_BTN_ENABLE;
            button.hoverSkin = ViewConstants.SKINS.PFM_BTN_ENABLE_HOVER;
            button.focusSkin = ViewConstants.SKINS.PFM_BTN_ENABLE_FOCUS;
        },
        /**
         * Method to Navigate Account Preferences
         *
         */
        navigateToAccountPreferences: function() {
            if (applicationManager.getConfigurationManager().isMicroAppPresent("PortfolioManagementMA")) {
                var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileModule");
                profileModule.presentationController.showPreferredAccounts();
            }
        },
        /**
         * Method on click of externam bank account
         */
        onSelectionOfExternalBank: function() {
            this.view.AddExternalAccounts.SelectBankOrVendor.tbxName.text = this.view.AddExternalAccounts.SelectBankOrVendor.segBanksList.selectedRowItems[0].BankName;
            this.view.AddExternalAccounts.SelectBankOrVendor.flxBankList.isVisible = false;
            this.enableButton(this.view.AddExternalAccounts.SelectBankOrVendor.btnProceed);
            this.AdjustScreen();
        },
        /**
         * Method that gets triggered on click of Proceed
         */
        onClickOfProceedOnExternalBankList: function() {
            var selectedItem = this.view.AddExternalAccounts.SelectBankOrVendor.segBanksList.selectedRowItems[0];
            this.showExternalBankLogin({
                "identityProvider": selectedItem.IdentityProvider,
                "logo": selectedItem.logo,
                "isOauth2": selectedItem.Oauth2,
                "bankName": selectedItem.BankName,
                "bankId": selectedItem.id
            });
        },
        /**
         * Method on text change of external Bank Search
         */
        onTextChangeOfExternalBankSearch: function() {
            var searchText = this.view.AddExternalAccounts.SelectBankOrVendor.tbxName.text;
            if (searchText && String(searchText).trim() !== "") {
                searchText = String(searchText).trim().toLowerCase();
                var tempArr = [];
                for (var i in this.externalBankSearchList) {
                    if (String(this.externalBankSearchList[i].BankName).trim().toLowerCase().search(searchText) >= 0) {
                        tempArr.push(this.externalBankSearchList[i]);
                    }
                }
                if (tempArr.length > 0) {
                    this.view.AddExternalAccounts.SelectBankOrVendor.segBanksList.setData(tempArr);
                    this.view.AddExternalAccounts.SelectBankOrVendor.flxBankList.isVisible = true;
                } else {
                    this.view.AddExternalAccounts.SelectBankOrVendor.segBanksList.setData([]);
                    this.view.AddExternalAccounts.SelectBankOrVendor.flxBankList.isVisible = false;
                }
            } else {
                this.view.AddExternalAccounts.SelectBankOrVendor.segBanksList.setData([]);
                this.view.AddExternalAccounts.SelectBankOrVendor.flxBankList.isVisible = false;
            }
            this.disableButton(this.view.AddExternalAccounts.SelectBankOrVendor.btnProceed);
            this.AdjustScreen();
        },
        /**
         * Method on click Of Reset ExternalBankList
         *
         */
        onClickOfResetOnExternalBankList: function() {
            this.view.AddExternalAccounts.SelectBankOrVendor.tbxName.text = "";
            this.onTextChangeOfExternalBankSearch();
        },
        /**
         * Method on success Save ExternalBankCredentails
         * @param {JSON} response response
         */
        onSuccessSaveExternalBankCredentailsSuccess: function(response) {
            var self = this;
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
            accountsModule.presentationController.fetchExternalBankAccounts({
                mainUser: applicationManager.getUserPreferencesManager().getCurrentUserName(),
                userName: self.ExternalLoginContextData.username,
                bankId: self.ExternalLoginContextData.bankId
            });
        },
        onSuccessSaveExternalBankCredentailsFailure: function(response) {
            var self = this;
            CommonUtilities.hideProgressBar(this.view);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.lblLoginUsingSelectedBankError, kony.i18n.getLocalizedString("i18n.login.failedToLogin"), accessibilityConfig);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankError.isVisible = true;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.text = "";
            this.enableOrDisableExternalLogin(this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.text, this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.text);
            this.AdjustScreen();
        },
        /**
         * Adds selected external accounts
         */
        addExternalAccounts: function() {
            FormControllerUtility.showProgressBar(this.view);
            var selectedAccounts = [];
            for (var i = 0; i < this.selectedRowIndices.length; i++) {
                selectedAccounts.push(this.view.AddExternalAccounts.LoginUsingSelectedBank.segSelectedAccounts.data[this.selectedRowIndices[i]]);
            }
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule').presentationController.addExternalBankAccounts(selectedAccounts);
        },
        /**
         * Toggles between terms accepted or not accepted
         */
        toggleBetweenTermsAcceptedAndUnaccepted: function() {
            var isAccepted = this.isTermsAndConditionsAccepted;
            if (!isAccepted) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.lblCheckBox, ViewConstants.FONT_ICONS.CHECBOX_SELECTED, accessibilityConfig);
                this.isTermsAndConditionsAccepted = true;
            } else {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.lblCheckBox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, accessibilityConfig);
                this.isTermsAndConditionsAccepted = false;
            }
            this.view.forceLayout();
        },
        /**
         * Method to enable Save button
         */
        enableSaveButton: function() {
            var termsAccepted = this.isTermsAndConditionsAccepted;
            var isAtleastOneAccountSelected = this.isAtLeastOneAccountSelected;
            if (termsAccepted === true && isAtleastOneAccountSelected === true && !CommonUtilities.isCSRMode()) {
                this.enableButton(this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin);
            } else {
                this.disableButton(this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin);
            }
        },
        /**
         * Method gets triggered on click of external account segment row
         */
        onClickOfSegmentRow: function() {
            if (this.selectedRowIndices.length > 0) {
                this.isAtLeastOneAccountSelected = true;
            } else {
                this.isAtLeastOneAccountSelected = false;
            }
            this.enableSaveButton();
        },
        /**
         * Method on Click Of FlxTermsAndconditions
         */
        onClickOfFlxTermsAndconditions: function() {
            this.toggleBetweenTermsAcceptedAndUnaccepted();
            this.enableSaveButton();
        },
        /**
         * Method to get data of external accounts
         * @param {Object} data data
         * @returns {Object} externalAccountsData
         */
        getExternalAccountsData: function(data) {
            var externalAccountsData = data;
            for (var i in externalAccountsData) {
                externalAccountsData[i].separator = ViewConstants.FONT_ICONS.LABEL_IDENTIFIER;
                externalAccountsData[i].isChecked = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
            }
            return externalAccountsData;
        },
        /**
         * Sets data to segment regarding external bank accounts
         * @param {Collection} accounts List of accounts
         */
        setExternalAccountsData: function(accounts) {
            var self = this;
            var widgetDataMap = {
                "lblCheckBox": "lblCheckBox",
                'lblAccountName': "MaskedAccountName",
                'lblAccountNumber': "AccountType",
                'lblAvailableBalanceValue': "AvailableBalanceWithCurrency",
                'lblAvailableBalanceTitle': "AvailableBalanceLabel",
                'lblSeperator': "separator",
                'flxcheckbox': "flxcheckbox"
            };
            this.view.AddExternalAccounts.LoginUsingSelectedBank.segSelectedAccounts.widgetDataMap = widgetDataMap;
            var data = accounts.map(function(account, index) {
                return {
                    "MaskedAccountName": {
                        "text": formatAccountName(account.AccountName, account.Number),
                        "accessibilityconfig": {
                            "a11yLabel": formatAccountName(account.AccountName, account.Number),
                        }
                    },
                    "AccountName": {
                        "text": account.AccountName,
                        "accessibilityconfig": {
                            "a11yLabel": account.AccountName
                        }
                    },
                    "AccountType": {
                        "text": account.AccountType,
                        "accessibilityconfig": {
                            "a11yLabel": account.AccountType,
                        }
                    },
                    "AvailableBalanceWithCurrency": {
                        "text": account.AvailableBalanceWithCurrency,
                        "accessibilityconfig": {
                            "a11yLabel": account.AvailableBalanceWithCurrency,
                        }
                    },
                    "AvailableBalanceLabel": {
                        "text": account.AccountType ? kony.i18n.getLocalizedString(self.accountTypeConfig[account.AccountType].balanceTitle) : kony.i18n.getLocalizedString(self.accountTypeConfig["Default"].balanceTitle),
                        "accessibilityconfig": {
                            "a11yLabel": account.AccountType ? kony.i18n.getLocalizedString(self.accountTypeConfig[account.AccountType].balanceTitle) : kony.i18n.getLocalizedString(self.accountTypeConfig["Default"].balanceTitle),
                        }
                    },
                    "separator": account.separator,
                    "lblCheckBox": ViewConstants.FONT_ICONS.CHECBOX_SELECTED,
                    "accessibilityconfig": {
                        "a11yHidden": true,
                    },
                    "flxcheckbox": {
                        "onClick": self.toggleAccountSelectionCheckbox.bind(this, index),
                        "accessibilityConfig": {
                            "a11yARIA": {
                                "role": "checkbox",
                                "aria-checked": true,
                            }
                        }
                    },
                    "AvailableBalance": account.AvailableBalance,
                    "CurrencyCode": account.CurrencyCode,
                    "AccountNumber": account.Number,
                    "BankId": account.bank_id,
                    "TypeId": account.Type_id,
                    "AccountHolder": account.AccountHolder,
                    "UserName": account.UserName
                };
            });
            this.view.AddExternalAccounts.LoginUsingSelectedBank.segSelectedAccounts.setData(data);
            this.view.forceLayout();
            var selectedIndices = [];
            for (var i = 0; i < data.length; i++) {
                selectedIndices.push(i);
            }
            this.selectedRowIndices = selectedIndices;

            function formatAccountName(accountName, accountNumber) {
                var stringAccNum = String(accountNumber);
                var stringAccName = String(accountName);
                var isLast4Digits = function(index) {
                    return index > (stringAccNum.length - 5);
                };
                var hashedAccountNumber = stringAccNum.split('').map(function(c, i) {
                    return isLast4Digits(i) ? c : 'X';
                }).join('').slice(-5);
                return stringAccName + "-" + hashedAccountNumber;
            }
        },
        /**
         * Method to hide all flex
         */
        HideAll: function() {
            this.view.flxDowntimeWarning.isVisible = false;
            this.view.flxWelcomeAndActions.isVisible = false;
            this.view.flxAccountListAndBanner.isVisible = false;
            this.view.accountListMenu.isVisible = false;
            this.view.accountsFilter.setVisibility(false);
            this.view.AddExternalAccounts.flxSelectBankOrVendor.setVisibility(false);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginSelectAccountsMain.setVisibility(false);
        },
        /**
         * Method to add external account
         */
        NavigateToAddExternalAccounts: function() {
            this.view.flxAccountListAndBanner.isVisible = true;
            this.view.accountList.isVisible = false;
            this.view.AddExternalAccounts.isVisible = true;
            this.view.flxActions.isVisible = true;
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.customheader.lblHeaderMobile, kony.i18n.getLocalizedString('i18n.AccountsAggregation.AddExternalBankAccount'), accessibilityConfig);
            }
        },
        /**
         * Method to hide all external accounts
         */
        HideAllExternalAcc: function() {
            this.view.AddExternalAccounts.flxAcknowledgment.isVisible = false;
            this.view.AddExternalAccounts.flxLoginUsingSelectedBank.isVisible = false;
            this.view.AddExternalAccounts.flxSelectBankOrVendor.isVisible = false;
        },
        /**
         * Method to Navigate To External Bank Accounts List
         */
        NavigateToExternalBankAccountsList: function() {
            this.HideAll();
            this.NavigateToAddExternalAccounts();
            this.HideAllExternalAcc();
            this.view.AddExternalAccounts.flxLoginUsingSelectedBank.isVisible = true;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankMain.isVisible = false;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginSelectAccountsMain.isVisible = true;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin, kony.i18n.getLocalizedString("i18n.AccountsAggregation.ExternalAccountsList.AddAccounts"), accessibilityConfig);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.toolTip = kony.i18n.getLocalizedString("i18n.AccountsAggregation.ExternalAccountsList.AddAccounts");
            CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.btnCancel, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.forceLayout();
            this.AdjustScreen();
        },
        /**
         * Method to present External Accounts List
         * @param {Array} externalAccountsList External accounts list
         */
        presentExternalAccountsList: function(externalAccountsList) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.isTermsAndConditionsAccepted = true;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.imgBank.src = this.ExternalLoginContextData.logo;
            CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.lblUsernameValue, this.ExternalLoginContextData.username, accessibilityConfig);
            CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.lblBankValue, this.ExternalLoginContextData.bankName, accessibilityConfig);
            if (CommonUtilities.isCSRMode()) {
                this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.onClick = CommonUtilities.disableButtonActionForCSRMode();
                this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.skin = CommonUtilities.disableButtonSkinForCSRMode();
                this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.hoverSkin = CommonUtilities.disableButtonSkinForCSRMode();
                this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.focusSkin = CommonUtilities.disableButtonSkinForCSRMode();
            } else {
                this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.onClick = this.addExternalAccounts;
            }
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxCheckbox.onClick = this.onClickOfFlxTermsAndconditions;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.btnTermsAndConditions.toolTip = kony.i18n.getLocalizedString("i18n.common.TnC");
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankHeading.text = kony.i18n.getLocalizedString("i18n.AddExternalAccount.SelectYourAccounts");
            this.view.AddExternalAccounts.LoginUsingSelectedBank.segSelectedAccounts.isVisible = true;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxIAgree.isVisible = true;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxAddAccountsError.isVisible = false;
            //             this.view.AddExternalAccounts.LoginUsingSelectedBank.btnCancel.left = "37.07%";
            this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.isVisible = true;
            this.toggleBetweenTermsAcceptedAndUnaccepted();
            var accounts = this.getExternalAccountsData(externalAccountsList);
            this.setExternalAccountsData(accounts);
            this.AdjustScreen();
            this.onClickOfSegmentRow();
            this.NavigateToExternalBankAccountsList();
            CommonUtilities.hideProgressBar(this.view);
        },
        /**
         * This function shows appropriate message to user in case all the accounts of a particular external bank is already added
         */
        onAllExternalAccountsAlreadyAdded: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.AddExternalAccounts.LoginUsingSelectedBank.imgBank.src = this.ExternalLoginContextData.logo;
            CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.lblUsernameValue, this.ExternalLoginContextData.username, accessibilityConfig);
            CommonUtilities.setText(this.view.AddExternalAccounts.LoginUsingSelectedBank.lblBankValue, this.ExternalLoginContextData.bankName, accessibilityConfig);
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxLoginUsingSelectedBankHeading.text = kony.i18n.getLocalizedString("i18n.AddExternalAccount.SelectYourAccounts");
            this.view.AddExternalAccounts.LoginUsingSelectedBank.segSelectedAccounts.isVisible = false;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxIAgree.isVisible = false;
            this.view.AddExternalAccounts.LoginUsingSelectedBank.flxAddAccountsError.isVisible = true;
            //             this.view.AddExternalAccounts.LoginUsingSelectedBank.btnCancel.left = "68.12%";
            this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin.isVisible = false;
            this.AdjustScreen();
            this.NavigateToExternalBankAccountsList();
            CommonUtilities.hideProgressBar(this.view);
        },
        responsiveViews: {},
        initializeResponsiveViews: function() {
            this.responsiveViews["accountList"] = this.isViewVisible("accountList");
            this.responsiveViews["AddExternalAccounts"] = this.isViewVisible("AddExternalAccounts");
            this.responsiveViews["flxAcknowledgment"] = this.isViewVisible("flxAcknowledgment");
            this.responsiveViews["flxLoginUsingSelectedBank"] = this.isViewVisible("flxLoginUsingSelectedBank");
            this.responsiveViews["flxSelectBankOrVendor"] = this.isViewVisible("flxSelectBankOrVendor");
        },
        isViewVisible: function(container) {
            if (this.view[container] == undefined) {
                return this.view.AddExternalAccounts[container].isVisible;
            } else {
                return this.view[container].isVisible
            }
        },
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmAccountsLandingController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        onBreakpointChange: function(width) {
            kony.print('on breakpoint change');
            var config = applicationManager.getConfigurationManager();
            this.loadAccountModule().presentationController.getAccountDashboardCampaignsOnBreakpointChange();
            orientationHandler.onOrientationChange(this.onBreakpointChange, function() {
                this.view.customheader.onBreakpointChangeComponent(width);
                if (orientationHandler.isMobile) {
                    var width;
                    if (kony.application.getCurrentBreakpoint() > 640) {
                        width = applicationManager.getDeviceUtilManager().getDeviceInfo().screenHeight - 20;
                    } else {
                        width = applicationManager.getDeviceUtilManager().getDeviceInfo().screenWidth - 20;
                    }
                    var height = width * 0.44;
                    this.view.flxBannerContainerMobile.height = height + "dp";
                    this.view.imgBannerMobile.height = height - 20 + "dp";
                    this.AdjustScreen();
                }
            }.bind(this));
            this.view.customheader.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.setupFormOnTouchEnd(width);
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width)
            var views;
            var responsiveFonts = new ResponsiveFonts();
            this.layoutWarningFlexes();
            this.widgetPositioningOnBreakpointChange(width);
            //       if(!this.isRetailUser)
            if (!kony.sdk.isNullOrUndefined(this.view.flxMainChartCon.flxCashPostionChart)) {
                if (this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition !== undefined) {
                    if (!kony.sdk.isNullOrUndefined(this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition)) {
                        this.view.flxMainChartCon.flxCashPostionChart.remove(this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition);
                    }
                }
                this.initializeCashPositionChart();
                this.populateCashPositionChart(this.view.flxMainChartCon.flxCashPostionChart.comboChartForCashPosition.chartData);
            }
            if (width === 640 || orientationHandler.isMobile) {
                this.nullifyPopupOnTouchStart();
                views = Object.keys(this.responsiveViews);
                views.forEach(function(e) {
                    if (scope.view[e] == undefined) {
                        scope.view.AddExternalAccounts[e].isVisible = scope.responsiveViews[e];
                    } else {
                        scope.view[e].isVisible = scope.responsiveViews[e];
                    }
                });
                this.view.mySpending.lblOverallSpendingMySpending.text = kony.i18n.getLocalizedString("i18n.PFM.OverallSpending");
                this.view.imgBannerMobile.src = config.getConfigurationValue("DESKTOP_BANNER_IMAGE");
                if (this.view.AddExternalAccounts.isVisible === true) {
                    var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                    CommonUtilities.setText(this.view.customheader.lblHeaderMobile, kony.i18n.getLocalizedString('i18n.AccountsAggregation.AddExternalBankAccount'), accessibilityConfig);
                } else {
                    var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                    CommonUtilities.setText(this.view.customheader.lblHeaderMobile, kony.i18n.getLocalizedString('i18n.hamburger.myaccounts'), accessibilityConfig);
                }
                this.view.customheader.imgKony.isVisible = false;
                this.view.customheader.flxImgKony.isVisible = false;
                this.view.flxMainChartCon.flxCashPostionChart.height = "200dp";
                this.view.flxMainChartCon.height = "200dp";
                this.view.flxMyCashPosition.height = "700dp";
                this.view.flxMyCashPosition.bottom = "20dp";
                this.view.flxChartContainer.forceLayout();
                responsiveFonts.setMobileFonts();
                this.view.AddExternalAccounts.SelectBankOrVendor.btnReset.skin = "sknBtnffffffBorder0273e31pxRadius2px";
                this.view.lblShowing.text = kony.i18n.getLocalizedString("i18n.LocateUs.Show");
            } else {
                views = Object.keys(this.responsiveViews);
                views.forEach(function(e) {
                    if (scope.view[e] == undefined) {
                        scope.view.AddExternalAccounts[e].isVisible = scope.responsiveViews[e];
                    } else {
                        scope.view[e].isVisible = scope.responsiveViews[e];
                    }
                });
                if (width == 1366) {
                    this.view.flxBannerContainerDesktop.height = ((0.286 * kony.os.deviceInfo().screenWidth) / 2.23) + "dp";
                }
                this.view.flxMainChartCon.flxCashPostionChart.height = "200dp";
                this.view.flxMainChartCon.height = "200dp";
                this.view.flxMyCashPosition.height = "425dp";
                this.view.flxChartContainer.forceLayout();
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.customheader.lblHeaderMobile, "", accessibilityConfig);
                responsiveFonts.setDesktopFonts();
                this.view.mySpending.lblOverallSpendingMySpending.text = kony.i18n.getLocalizedString("i18n.Accounts.Spending");
                this.view.lblShowing.text = kony.i18n.getLocalizedString("i18n.accounts.showing");
            }
            this.AdjustScreen();
        },
        hidePopups: function() {
            var currFormObj = kony.application.getCurrentForm();
            scope = this;
            if (currFormObj.customheader.topmenu.flxContextualMenu.isVisible === true || scope.view.accountsFilter.isVisible === true || (scope.view.accountListMenu.isVisible === true && scope.frmMenuScroll === false)) {
                setTimeout(function() {
                    currFormObj.customheader.topmenu.flxContextualMenu.setVisibility(false);
                    currFormObj.customheader.topmenu.imgLblTransfers.text = "O";
                    currFormObj.customheader.topmenu.flxTransfersAndPay.accessibilityConfig = {
                        a11yARIA: {
                            "aria-expanded": false,
                            "role": "button",
                            "aria-labelledby": "lblTransferAndPay"
                        },
                    }
                    currFormObj.accountListMenu.setVisibility(false);
                    sectionLength = currFormObj.accountList.segAccounts.data.length;
                    var data4 = currFormObj.accountList.segAccounts.data;
                    for (i = 0; i < sectionLength; i++) {
                        length2 = currFormObj.accountList.segAccounts.data[i][1]["length"];
                        for (j = 0; j < length2; j++) {
                            if (data4[i][1][j]["template"] === "flxAccountsRowTemplate") {
                                data4[i][1][j]["flxMenu"].accessibilityConfig = {
                                    "a11yLabel": "Open list of quick actions for"+ data4[i][1][j].accountName,
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false
                                    }
                                }
                                currFormObj.accountList.segAccounts.setDataAt(data4[i][1][j],j,i);
                                currFormObj.forceLayout();
                            }
                        }
                    }
                    currFormObj.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    currFormObj.accountsFilter.setVisibility(false);
                    currFormObj.flxDropDown.accessibilityConfig = {
                        a11yARIA: {
                            "role": "button",
                            "aria-expanded": false,
                            "aria-labelledby": "lblSelectedFilter",
                        },
                    };
                }, "17ms")
            }
        },
        setupFormOnTouchEnd: function(width) {
            var self = this;
            if (width == 640) {
                this.view.onTouchEnd = function() {}
                this.nullifyPopupOnTouchStart();
            } else {
                if (width == 1024) {
                    this.view.onTouchEnd = function() {}
                    this.nullifyPopupOnTouchStart();
                } else {
                    this.view.onTouchEnd = function() {
                        //  hidePopups();
                        self.hidePopups();
                    }
                }
                var userAgent = kony.os.deviceInfo().userAgent;
                if (userAgent.indexOf("iPad") != -1) {
                    this.view.onTouchEnd = function() {}
                    this.nullifyPopupOnTouchStart();
                } else if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1) {
                    this.view.onTouchEnd = function() {}
                    this.nullifyPopupOnTouchStart();
                }
            }
        },
        nullifyPopupOnTouchStart: function() {
            this.view.accountList.flxAccountsRightContainer.onTouchEnd = null;
        },
        layoutWarningFlexes: function() {
            this.view.imgDowntimeWarning.centerY = "50%";
            this.view.flxDeviceRegistrationWarning.height = `60dp`;
            this.view.flxOverdraftWarning.height = "60dp";
            //this.view.imgDowntimeWarning.top = "10dp";
            this.view.lblDowntimeWarning.centerY = "";
            //this.view.lblDowntimeWarning.height = "preferred";
            this.view.flxDownTimeClose.centerY = "";
            this.view.flxDownTimeClose.top = "10dp";
            this.view.flxDownTimeClose.left = "";
            this.view.flxDownTimeClose.right = "10dp";
            this.view.flxDownTimeClose.height = "20dp";
            this.view.flxDownTimeClose.width = "20dp";
            this.view.DeviceRegisrationWarning.centerY = "50%";
            //this.view.DeviceRegisrationWarning.top = "10dp";
            this.view.lblDeviceRegistrationWarning.centerY = "";
            //this.view.lblDeviceRegistrationWarning.height = "preferred";
            this.view.flxDeviceRegistrationClose.centerY = "";
            this.view.flxDeviceRegistrationClose.top = "10dp";
            this.view.flxDeviceRegistrationClose.left = "";
            this.view.flxDeviceRegistrationClose.right = "10dp";
            this.view.flxDeviceRegistrationClose.height = "20dp";
            this.view.flxDeviceRegistrationClose.width = "20dp";
            this.view.ingPasswordResetWarning.centerY = "50%";
            this.view.flxPasswordResetWarning.height = `60dp`;
          	this.view.flxPasswordResetWarning.top = "10dp";
            this.view.flxDowntimeWarning.height = `60dp`;
            this.view.flxOutageWarning.height = "60dp";
          	this.view.flxOutageWarning.top = "20dp";
            this.view.flxRightContainer.left ="30dp";
            if(kony.application.getCurrentBreakpoint() === 1024){
                this.view.flxRightContainer.left ="23dp";
            }
            //this.view.ingPasswordResetWarning.top = "4dp";
            this.view.lblPasswordResetWarning.centerY = "";
            //       this.view.ingPasswordResetWarning.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS
            //this.view.lblPasswordResetWarning.height = "preferred";
            this.view.flxClosePassword.centerY = "";
            this.view.flxClosePassword.top = "17dp";
            this.view.flxClosePassword.left = "";
			if (kony.application.getCurrentBreakpoint() >= 1388) {
                this.view.flxPasswordResetWarning.left = "6.4%";
                this.view.flxPasswordResetWarning.width = "87.8%";
                this.view.flxDowngradeDashboardDisclaimer.width = "87.8%";
            } else if (!orientationHandler.isMobile && !orientationHandler.isTablet) {
                this.view.flxPasswordResetWarning.left = "5.7%";
                this.view.flxPasswordResetWarning.width = "88.8%";
                this.view.flxDowngradeDashboardDisclaimer.width = "88.8%";
            }
            let currentLocale = kony.i18n.getCurrentLocale();
            if (currentLocale === "ar_AE") {
                this.view.flxClosePassword.right = "";
                this.view.flxClosePassword.left = "10dp";
            } else {
                this.view.flxClosePassword.right = "10dp";
            }
            this.view.flxClosePassword.height = "20dp";
            this.view.flxClosePassword.width = "20dp";
            this.view.imgOverDraft.centerY = "50%";
            //this.view.imgOverDraft.top = "10dp";
            this.view.lblOverdraftWarning.centerY = "";
            //this.view.lblOverdraftWarning.height = "preferred";
            this.view.flxCloseWarning.centerY = "";
            this.view.flxCloseWarning.top = "10dp";
            this.view.flxCloseWarning.left = "";
            this.view.flxCloseWarning.right = "10dp";
            this.view.flxCloseWarning.height = "20dp";
            this.view.flxCloseWarning.width = "20dp";
            this.view.flxCloseWarning.centerY = "50%";
            //this.view.imgInfoIconWarning.top = "10dp";
            this.view.lblOutageWarning.centerY = "";
            //this.view.lblOutageWarning.height = "preferred";
            this.view.flxOutageClose.centerY = "";
            this.view.flxOutageClose.top = "10dp";
            this.view.flxOutageClose.left = "";
            this.view.flxOutageClose.right = "10dp";
            this.view.flxOutageClose.height = "20dp";
            this.view.flxOutageClose.width = "20dp";
            if (kony.application.getCurrentBreakpoint() <=640){
                this.view.flxPasswordResetWarning.height = "80dp";
                this.view.flxClosePassword.top = "26dp";
            }
        },
        bindTnC: function(TnCcontent) {
            var checkboxFlex = this.view.AddExternalAccounts.LoginUsingSelectedBank.flxIAgree;
            var checkboxIcon = this.view.AddExternalAccounts.LoginUsingSelectedBank.flxCheckbox;
            var btnTnC = this.view.AddExternalAccounts.LoginUsingSelectedBank.btnTermsAndConditions;
            var confirmButton = this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin;
            if (TnCcontent.alreadySigned) {
                checkboxFlex.setVisibility(false);
            } else {
                CommonUtilities.disableButton(confirmButton);
                checkboxIcon.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                checkboxIcon.onClick = this.toggleTnC.bind(this, checkboxIcon, confirmButton);
                checkboxFlex.setVisibility(true);
                if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                    btnTnC.onClick = function() {
                        window.open(TnCcontent.termsAndConditionsContent);
                    }
                } else {
                    btnTnC.onClick = this.showTermsAndConditionPopUp;
                    this.setTnCDATASection(TnCcontent.termsAndConditionsContent);
                    FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, TnCcontent.termsAndConditionsContent);
                }
                this.view.flxClose.onClick = this.hideTermsAndConditionPopUp;
            }
            this.view.forceLayout();
        },
        showTermsAndConditionPopUp: function() {
            var height = this.view.flxFooter.frame.y + this.view.flxFooter.frame.height;
            this.view.flxTermsAndConditionsPopUp.height = height + "dp";
            this.view.flxTermsAndConditionsPopUp.setVisibility(true);
            this.view.forceLayout();
        },
        hideTermsAndConditionPopUp: function() {
            this.view.flxTermsAndConditionsPopUp.setVisibility(false);
        },
        setTnCDATASection: function(content) {
            this.view.rtxTC.text = content;
        },
        toggleTnC: function(widget, confirmButton) {
            CommonUtilities.toggleFontCheckbox(widget, confirmButton);
            if (widget.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) CommonUtilities.disableButton(confirmButton);
            else CommonUtilities.enableButton(confirmButton);
        },
        /**
         * Method to set data to the Approvals/Requests widget
         */
        initApprovalRequestWidget: function() {
            var checkUserPermission = function(permission) {
                return applicationManager.getConfigurationManager().checkUserPermission(permission);
            };
            var approvalPermissions = applicationManager.getConfigurationManager().getApprovalsFeaturePermissionsList();
            var requestsPermissions = applicationManager.getConfigurationManager().getRequestsFeaturePermissionsList();
            var isApproveEnabled = approvalPermissions.some(checkUserPermission);
            var isRequestsEnabled = requestsPermissions.some(checkUserPermission);
            if (!isApproveEnabled && !isRequestsEnabled) {
                this.view.flxApprovalAndRequest.setVisibility(false);
            } else {
                if (isApproveEnabled) this.updateMyApprovalsWidget();
                else this.view.flxMyApprovals.setVisibility(false);
                if (isRequestsEnabled) this.updateMyRequestsWidget();
                else this.view.flxMyRequests.setVisibility(false);
            }
            this.view.forceLayout();
            //FormControllerUtility.hideProgressBar(this.view);
            this.AdjustScreen();
        },
        /**
         * Method to hide approval requests widget on service failure
         */
        approvalRequestsServiceFailure: function() {
            this.view.flxApprovalAndRequest.setVisibility(false);
            //FormControllerUtility.hideProgressBar(this.view);
            this.AdjustScreen();
        },
        updateMyApprovalsWidget: function() {
            var totalApprovalsCount = 0;
            var breakpoint;
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                breakpoint = {
                    text: "r",
                    Skin: "sknLblOLBFontIcons003E7510pxbordere3e3e3",
                    height: "18dp",
                    width: "18dp",
                }
            } else {
                breakpoint = {
                    text: "r",
                    Skin: "sknLblOLBFontIcons003E7512pxbordere3e3e3",
                    height: "20dp",
                    width: "20dp"
                }
            }
            //     if(applicationManager.getConfigurationManager().transactionsPendingForMyApprovalCount > 0)
            //     	totalApprovalsCount+= applicationManager.getConfigurationManager().transactionsPendingForMyApprovalCount;
            //     if(applicationManager.getConfigurationManager().achTransactionsPendingForMyApprovalCount > 0)
            //     totalApprovalsCount+= applicationManager.getConfigurationManager().achTransactionsPendingForMyApprovalCount;
            //     if(applicationManager.getConfigurationManager().achFilesPendingForMyApprovalCount > 0)
            // 			    totalApprovalsCount+= applicationManager.getConfigurationManager().achFilesPendingForMyApprovalCount;
            var approvalsData = applicationManager.getConfigurationManager().CountResponse;
            var monetaryCount = 0;
            var nonmonetaryCount = 0;
            var totalCount = 0;
            var limitGroupName;
            approvalsData.forEach(function(item) {
                if (item.featureActions.length > 0) {
                    item.featureActions.forEach(function(data) {
                        totalCount += parseInt(data.myApprovalsPending);
                    });
                }
            });
            var approvalData = [
                [{
                        lblWidgetTitle: {
                            "text": kony.i18n.getLocalizedString("i18n.konybb.MyApprovals.Header") + "\(" + totalCount + "\)",
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.konybb.MyApprovals.Header") + "\(" + totalCount + "\)"
                            }
                        },
                        imgApprovals: {
                            text: breakpoint.text,
                            Skin: breakpoint.Skin
                        },
                        //flxImgApproval : this.isCombinedUser && breakpoint ? {isVisible:true, height:breakpoint.height , width:breakpoint.width} : {isVisible:false},
                        flxImgApproval: this.profileAccess === "both" && breakpoint ? {
                            isVisible: true,
                            height: breakpoint.height,
                            width: breakpoint.width
                        } : {
                            isVisible: false
                        },
                        //                 imgApprovals : {text:"r"},
                        //                 flxImgApproval : this.isCombinedUser ? {isVisible:true} : {isVisible:false},
                        btnShowAll: {
                            "text": kony.i18n.getLocalizedString("i18n.common.viewAll"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.common.viewAll")
                            },
                            onClick: function() {
                                var navigationObject = {
                                    "requestData": null,
                                    "onSuccess": {
                                        "form": "frmBBApprovalsDashboard",
                                        "module": "ApprovalsReqUIModule",
                                        "appName": "ApprovalRequestMA",
                                        "context": {
                                            "key": BBConstants.DASHBOARD_DEFAULT_TAB,
                                            "responseData": null
                                        }
                                    },
                                    "onFailure": {
                                        "form": "AuthUIModule/frmLogin",
                                        "module": "AuthUIModule",
                                        "appName": "AuthenticationMA",
                                        "context": {
                                            "key": BBConstants.LOG_OUT,
                                            "responseData": null
                                        }
                                    }
                                };
                                if (applicationManager.getConfigurationManager().isMicroAppPresent("ApprovalRequestMA")) {
                                    var ApprovalsReqModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                        "moduleName": "ApprovalsReqUIModule",
                                        "appName": "ApprovalRequestMA"
                                    });
                                    ApprovalsReqModule.presentationController.noServiceNavigation(navigationObject);
                                }
                            }
                        },
                        template: "flxApprovalsRequestsCountWidgetHeader"
                    },
                    []
                ]
            ];
            //       if(applicationManager.getConfigurationManager().isApproveTransactionEnabled()){
            //         if(applicationManager.getConfigurationManager().transactionsPendingForMyApprovalCount >0)
            //           approvalData[0][1].push({lblName:{"text": kony.i18n.getLocalizedString("i18n.common.transactions"),
            //                         "accessibilityconfig": {
            //                             "a11yLabel": kony.i18n.getLocalizedString("i18n.common.transactions")
            //                         }}, lblOption1Value:{"text":applicationManager.getConfigurationManager().transactionsPendingForMyApprovalCount + "",
            //                         "accessibilityconfig": {
            //                             "a11yLabel": applicationManager.getConfigurationManager().transactionsPendingForMyApprovalCount + ""
            //                         }}});
            //       }
            //       if(applicationManager.getConfigurationManager().isApproveACHEnabled()){
            //         if(applicationManager.getConfigurationManager().achTransactionsPendingForMyApprovalCount > 0)
            //           approvalData[0][1].push({lblName:{"text": kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions"),
            //                         "accessibilityconfig": {
            //                             "a11yLabel": kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions")
            //                         }}, lblOption1Value:{"text": applicationManager.getConfigurationManager().achTransactionsPendingForMyApprovalCount + "",
            //                         "accessibilityconfig": {
            //                             "a11yLabel": applicationManager.getConfigurationManager().achTransactionsPendingForMyApprovalCount + ""
            //                         }}});
            //         if(applicationManager.getConfigurationManager().achFilesPendingForMyApprovalCount > 0)
            //           approvalData[0][1].push({lblName:{"text": kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles"),
            //                         "accessibilityconfig": {
            //                             "a11yLabel": kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles")
            //                         }}, lblOption1Value:{"text": applicationManager.getConfigurationManager().achFilesPendingForMyApprovalCount + "",
            //                         "accessibilityconfig": {
            //                             "a11yLabel": applicationManager.getConfigurationManager().achFilesPendingForMyApprovalCount + ""
            //                         }}});
            //       }
            //             approvalData[0][1].push({
            //                 lblName: {
            //                     "text": "Single Transaction",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": "Single Transaction"
            //                     }
            //                 },
            //                 lblOption1Value: {
            //                     "text": applicationManager.getConfigurationManager().SingleApprovalCount + "",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": applicationManager.getConfigurationManager().SingleApprovalCount + ""
            //                     }
            //                 }
            //             }, {
            //                 lblName: {
            //                     "text": "Bulk Transaction",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": "Bulk Transaction"
            //                     }
            //                 },
            //                 lblOption1Value: {
            //                     "text": applicationManager.getConfigurationManager().BulkApprovalCount + "",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": applicationManager.getConfigurationManager().BulkApprovalCount + ""
            //                     }
            //                 }
            //             }, {
            //                 lblName: {
            //                     "text": "Other Requests",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": "Other Requests"
            //                     }
            //                 },
            //                 lblOption1Value: {
            //                     "text": applicationManager.getConfigurationManager().OtherApprovalCount + "",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": applicationManager.getConfigurationManager().OtherApprovalCount + ""
            //                     }
            //                 }
            //             });
            approvalsData.forEach(function(item) {
                if (item.featureActions.length > 0) {
                    item.featureActions.forEach(function(data) {
                        if (data.actionType === "MONETARY") {
                            monetaryCount += parseInt(data.myApprovalsPending);
                        }
                        if (data.actionType === "NON_MONETARY") {
                            nonmonetaryCount += parseInt(data.myApprovalsPending);
                        }
                    });
                }
                if (item.limitgroupName === "Single Payment") limitGroupName = "Single Transaction";
                else if (item.limitgroupName === "Bulk Payment") limitGroupName = "Bulk Transaction";
                else limitGroupName = (item.limitgroupName.length >= 45) ? (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? CommonUtilities.truncateStringWithGivenLength(item.limitgroupName, 30) : CommonUtilities.truncateStringWithGivenLength(item.limitgroupName, 45) : item.limitgroupName;
                if (item.limitgroupName !== "Other") {
                    approvalData[0][1].push({
                        lblName: {
                            "text": limitGroupName,
                            "accessibilityconfig": {
                                "a11yLabel": limitGroupName
                            }
                        },
                        lblOption1Value: {
                            "text": monetaryCount + "", //applicationManager.getConfigurationManager().SingleApprovalCount + "",
                            "accessibilityconfig": {
                                "a11yLabel": monetaryCount + "" //applicationManager.getConfigurationManager().SingleApprovalCount + ""
                            }
                        }
                    });
                    monetaryCount = 0;
                }
                if (item.limitgroupName === "Other") {
                    approvalData[0][1].push({
                        lblName: {
                            "text": "Other Requests",
                            "accessibilityconfig": {
                                "a11yLabel": "Other Requests"
                            }
                        },
                        lblOption1Value: {
                            "text": nonmonetaryCount + "", //applicationManager.getConfigurationManager().SingleApprovalCount + "",
                            "accessibilityconfig": {
                                "a11yLabel": nonmonetaryCount + "" //applicationManager.getConfigurationManager().SingleApprovalCount + ""
                            }
                        }
                    });
                    nonmonetaryCount = 0;
                }
            });
            this.view.myApprovals.rowTemplate = "flxApprovalsRequestsCountWidgetData";
            if (approvalData[0][1].length > 0) approvalData[0][1][approvalData[0][1].length - 1]["flxSeperator"] = {
                isVisible: false
            };
            var filteredApprovalData = [];
            var approvalDataLength = approvalData[0][1].length;
            for (var i = approvalDataLength; i > 0; i--) {
                var arrayText = parseInt(approvalData[0][1][i - 1].lblOption1Value.text);
                if (arrayText === 0) {
                    filteredApprovalData = approvalData[0][1].splice(i - 1, 1);
                }
            }
            this.view.myApprovals.setWidgetData(approvalData);
            /*if (approvalData[0][1].length > 0) {
                        this.view.flxMyApprovals.setVisibility(true);
                    } else {
                        this.view.flxMyApprovals.setVisibility(false);
                    }*/
            this.view.flxMyApprovals.setVisibility(true);
            this.view.flxApprovalAndRequest.setVisibility(this.view.flxApprovalAndRequest.isVisible);
            this.AdjustScreen();
            this.view.forceLayout();
        },
        updateMyRequestsWidget: function() {
            var breakpoint;
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                breakpoint = {
                    text: "r",
                    Skin: "sknLblOLBFontIcons003E7510pxbordere3e3e3",
                    height: "18dp",
                    width: "18dp",
                }
            } else {
                breakpoint = {
                    text: "r",
                    Skin: "sknLblOLBFontIcons003E7512pxbordere3e3e3",
                    height: "20dp",
                    width: "20dp"
                }
            }
            //       var AwaitingCount = applicationManager.getConfigurationManager().AwaitingCount;
            //       var RejectedCount = applicationManager.getConfigurationManager().RejectedCount;
            //       var ApprovedCount = applicationManager.getConfigurationManager().ApprovedCount;
            //       var TotalRequestsCount = AwaitingCount + RejectedCount + ApprovedCount;
            var requestsData = applicationManager.getConfigurationManager().CountResponse;
            var monetaryCount = 0;
            var nonmonetaryCount = 0;
            var totalCount = 0;
            var limitGroupName;
            requestsData.forEach(function(item) {
                if (item.featureActions.length > 0) {
                    item.featureActions.forEach(function(data) {
                        totalCount += parseInt(data.myRequestsPending);
                    });
                }
            });
            var requestData = [
                [{
                        lblWidgetTitle: {
                            "text": kony.i18n.getLocalizedString("i18n.konybb.ACH.Requests") + "\(" + totalCount + "\)",
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.konybb.ACH.Requests") + "\(" + totalCount + "\)"
                            }
                        },
                        imgApprovals: {
                            text: breakpoint.text,
                            Skin: breakpoint.Skin
                        },
                        //flxImgApproval : this.isCombinedUser && breakpoint ? {isVisible:true, height:breakpoint.height , width:breakpoint.width} : {isVisible:false},
                        flxImgApproval: this.profileAccess === "both" && breakpoint ? {
                            isVisible: true,
                            height: breakpoint.height,
                            width: breakpoint.width
                        } : {
                            isVisible: false
                        },
                        //                 imgApprovals : {text:"r"},
                        //                 flxImgApproval : this.isCombinedUser ? {isVisible:true} : {isVisible:false},
                        btnShowAll: {
                            "text": kony.i18n.getLocalizedString("i18n.common.viewAll"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.common.viewAll")
                            },
                            onClick: function() {
                                var navigationObject = {
                                    "requestData": null,
                                    "onSuccess": {
                                        "form": "frmBBRequestsDashboard",
                                        "module": "ApprovalsReqUIModule",
                                        "appName": "ApprovalRequestMA",
                                        "context": {
                                            "key": BBConstants.DASHBOARD_DEFAULT_TAB,
                                            "responseData": null
                                        }
                                    },
                                    "onFailure": {
                                        "form": "AuthUIModule/frmLogin",
                                        "module": "AuthUIModule",
                                        "appName": "AuthenticationMA",
                                        "context": {
                                            "key": BBConstants.LOG_OUT,
                                            "responseData": null
                                        }
                                    }
                                };
                                if (applicationManager.getConfigurationManager().isMicroAppPresent("ApprovalRequestMA")) {
                                    var ApprovalsReqModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                        "moduleName": "ApprovalsReqUIModule",
                                        "appName": "ApprovalRequestMA"
                                    });
                                    ApprovalsReqModule.presentationController.noServiceNavigation(navigationObject);
                                }
                            }
                        },
                        template: "flxApprovalsRequestsCountWidgetHeader"
                    },
                    []
                ]
            ];
            //       if(AwaitingCount > 0){
            //         requestData[0][1].push({lblName:
            //                                 {"text": kony.i18n.getLocalizedString("i18n.konybb.Common.Awaiting"),
            //                         "accessibilityconfig": {
            //                             "a11yLabel": kony.i18n.getLocalizedString("i18n.konybb.Common.Awaiting")
            //                         }}, lblOption1Value:{"text": AwaitingCount + "",
            //                         "accessibilityconfig": {
            //                             "a11yLabel": AwaitingCount + ""
            //                         }}});
            //       }
            //       if(RejectedCount > 0){
            //         requestData[0][1].push({lblName:{"text": kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected"),
            //                         "accessibilityconfig": {
            //                             "a11yLabel": kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected")
            //                         }}, lblOption1Value:{"text": RejectedCount + "",
            //                         "accessibilityconfig": {
            //                             "a11yLabel": RejectedCount + ""
            //                         }}});
            //       }
            //       if(ApprovedCount > 0){
            //         requestData[0][1].push({lblName:{"text": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),
            //                         "accessibilityconfig": {
            //                             "a11yLabel": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved")
            //                         }}, lblOption1Value:{"text": ApprovedCount + "",
            //                         "accessibilityconfig": {
            //                             "a11yLabel": ApprovedCount + ""
            //                         }}});
            //       }
            this.view.myRequests.rowTemplate = "flxApprovalsRequestsCountWidgetData";
            /*if (requestData[0][1].length > 0)
                        requestData[0][1][requestData[0][1].length - 1]["flxSeperator"] = {
                            isVisible: false
                        };*/
            //             requestData[0][1].push({
            //                 lblName: {
            //                     "text": "Single Transaction",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": "Single Transaction"
            //                     }
            //                 },
            //                 lblOption1Value: {
            //                     "text": applicationManager.getConfigurationManager().SingleRequestsCount + "",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": applicationManager.getConfigurationManager().SingleRequestsCount + ""
            //                     }
            //                 }
            //             }, {
            //                 lblName: {
            //                     "text": "Bulk Transaction",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": "Bulk Transaction"
            //                     }
            //                 },
            //                 lblOption1Value: {
            //                     "text": applicationManager.getConfigurationManager().BulkRequestsCount + "",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": applicationManager.getConfigurationManager().BulkRequestsCount + ""
            //                     }
            //                 }
            //             }, {
            //                 lblName: {
            //                     "text": "Other Requests",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": "Other Requests"
            //                     }
            //                 },
            //                 lblOption1Value: {
            //                     "text": applicationManager.getConfigurationManager().OtherRequestsCount + "",
            //                     "accessibilityconfig": {
            //                         "a11yLabel": applicationManager.getConfigurationManager().OtherRequestsCount + ""
            //                     }
            //                 }
            //             });
            requestsData.forEach(function(item) {
                if (item.featureActions.length > 0) {
                    item.featureActions.forEach(function(data) {
                        if (data.actionType === "MONETARY") {
                            monetaryCount += parseInt(data.myRequestsPending);
                        }
                        if (data.actionType === "NON_MONETARY") {
                            nonmonetaryCount += parseInt(data.myRequestsPending);
                        }
                    });
                }
                if (item.limitgroupName === "Single Payment") limitGroupName = "Single Transaction";
                else if (item.limitgroupName === "Bulk Payment") limitGroupName = "Bulk Transaction";
                else limitGroupName = (item.limitgroupName.length >= 45) ? (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? CommonUtilities.truncateStringWithGivenLength(item.limitgroupName, 30) : CommonUtilities.truncateStringWithGivenLength(item.limitgroupName, 45) : item.limitgroupName;
                if (item.limitgroupName !== "Other") {
                    requestData[0][1].push({
                        lblName: {
                            "text": limitGroupName,
                            "accessibilityconfig": {
                                "a11yLabel": limitGroupName
                            }
                        },
                        lblOption1Value: {
                            "text": monetaryCount + "", //applicationManager.getConfigurationManager().SingleApprovalCount + "",
                            "accessibilityconfig": {
                                "a11yLabel": monetaryCount + "" //applicationManager.getConfigurationManager().SingleApprovalCount + ""
                            }
                        }
                    });
                    monetaryCount = 0;
                }
                if (item.limitgroupName === "Other") {
                    requestData[0][1].push({
                        lblName: {
                            "text": "Other Requests",
                            "accessibilityconfig": {
                                "a11yLabel": "Other Requests"
                            }
                        },
                        lblOption1Value: {
                            "text": nonmonetaryCount + "", //applicationManager.getConfigurationManager().SingleApprovalCount + "",
                            "accessibilityconfig": {
                                "a11yLabel": nonmonetaryCount + "" //applicationManager.getConfigurationManager().SingleApprovalCount + ""
                            }
                        }
                    });
                    nonmonetaryCount = 0;
                }
            });
            var filteredRequestData = [];
            var requestDataLength = requestData[0][1].length;
            for (var i = requestDataLength; i > 0; i--) {
                var arrayText = parseInt(requestData[0][1][i - 1].lblOption1Value.text);
                if (arrayText === 0) {
                    filteredRequestData = requestData[0][1].splice(i - 1, 1);
                }
            }
            this.view.myRequests.setWidgetData(requestData);
            /*if (requestData[0][1].length > 0) {
                        this.view.flxMyRequests.setVisibility(true);
                    } else {
                        this.view.flxMyRequests.setVisibility(false);
                    }*/
            this.view.flxMyRequests.setVisibility(true);
            this.view.flxApprovalAndRequest.setVisibility(this.view.flxApprovalAndRequest.isVisible);
            this.view.forceLayout();
            this.AdjustScreen();
        },
        /**
         * This function will setup UI based on Permissions
         **/
        setPermissionBasedView: function() {
            var configurationManager = applicationManager.getConfigurationManager();
            //Setting OpenNewAccount Visibility based on Permission
            if (applicationManager.getConfigurationManager().checkUserPermission("OPEN_NEW_ACCOUNT")) {
                this.view.btnOpenNewAccount.setVisibility(true);
                this.view.flxSeparator.setVisibility(true);
            } else {
                this.view.btnOpenNewAccount.setVisibility(false);
                this.view.flxSeparator.setVisibility(false);
                this.view.flxPrimaryActions.height = "50dp";
                this.view.flxPrimaryActions.forceLayout();
            }
            //Setting Approvals Visibility based on Permission
            if (configurationManager.isApproveTransactionEnabled() || configurationManager.isApproveACHEnabled()) {
                this.view.flxMyApprovals.setVisibility(true);
            } else {
                this.view.flxMyApprovals.setVisibility(false);
            }
            //Setting Requests Visibility based on Permission
            if (configurationManager.isRequestTransactionEnabled() || configurationManager.isRequestACHEnabled()) {
                this.view.flxMyRequests.setVisibility(true);
            } else {
                this.view.flxMyRequests.setVisibility(false);
            }
            this.AdjustScreen();
        },
        /**
              Method to check if user has permission to view approval and requests count
              */
        approvalsAndRequestsEntitilementCheck: function() {
            var checkUserPermission = function(permission) {
                return applicationManager.getConfigurationManager().checkUserPermission(permission);
            };
            var approvalPermissions = applicationManager.getConfigurationManager().getApprovalsFeaturePermissionsList();
            var requestsPermissions = applicationManager.getConfigurationManager().getRequestsFeaturePermissionsList();
            var isApproveEnabled = approvalPermissions.some(checkUserPermission);
            var isRequestsEnabled = requestsPermissions.some(checkUserPermission);
            if (isApproveEnabled || isRequestsEnabled) return true;
            else return false;
        },
        /**
         * Method to trigger loadApprovalsAndRequestCount
         *@param {object} navObject
         */
        loadApprovalsAndRequestCount: function() {
            var navigationObject = {
                requestData: null,
                onSuccess: {
                    form: "frmDashboard",
                    module: "AccountsUIModule",
                    context: {
                        key: BBConstants.APPROVALS_REQUESTS_COUNT,
                        responseData: null
                    }
                },
                onFailure: {
                    form: "frmDashboard",
                    module: "AccountsUIModule",
                    context: {
                        key: BBConstants.APPROVALS_REQUESTS_COUNT_FAILURE,
                        responseData: null
                    }
                }
            };
            this.presenter.presentationController.fetchPendingCountsOfApprovalAndRequest(navigationObject);
        },
        /*
         * Method to move widgets from left to right containr and vice versa based on breakpoint
         */
        widgetPositioningOnBreakpointChange: function(width) {
            var approvalsWidget = this.view.flxApprovalAndRequest;
            var approvalsWidgetClone = approvalsWidget.clone();
            var spendingsWidget = this.view.mySpending;
            var spendingsWidgetClone = spendingsWidget.clone();
            var chart;
            if (width === 1024 || orientationHandler.isTablet || width === 640 || orientationHandler.isMobile) {
                if (this.view.flxRightContainer.widgets().includes(approvalsWidget)) {
                    this.view.flxRightContainer.remove(approvalsWidget);
                }
                if (!this.view.flxLeftContainer.widgets().includes(approvalsWidget)) {
                    this.view.flxLeftContainer.addAt(approvalsWidgetClone, 1);
                }
                if (this.view.flxRightContainer.widgets().includes(spendingsWidget)) {
                    if (!kony.sdk.isNullOrUndefined(document.getElementById('chart_div_donutChart1'))) chart = document.getElementById('chart_div_donutChart1');
                    this.view.flxRightContainer.remove(spendingsWidget);
                }
                if (!this.view.flxLeftContainer.widgets().includes(spendingsWidget)) {
                    this.view.flxLeftContainer.add(spendingsWidgetClone);
                    if (!kony.sdk.isNullOrUndefined(document.getElementById('frmDashboard_mySpending_donutChart1'))) {
                        var container = document.getElementById('frmDashboard_mySpending_donutChart1');
                        container.appendChild(chart);
                        this.getPFMMonthlyDonutChart(this.PFMData);
                    }
                }
                this.currentWidth = width;
                this.view.flxLogout.height = "100dp";
                this.view.flxFooter.top = "20dp";
                this.view.flxFooter.marginTop = "20dp";
            } else {
                if (this.view.flxLeftContainer.widgets().includes(approvalsWidget)) {
                    this.view.flxLeftContainer.remove(approvalsWidget);
                }
                if (!this.view.flxRightContainer.widgets().includes(approvalsWidget)) {
                    this.view.flxRightContainer.addAt(approvalsWidgetClone, 0);
                }
                if (this.view.flxLeftContainer.widgets().includes(spendingsWidget)) {
                    if (!kony.sdk.isNullOrUndefined(document.getElementById('chart_div_donutChart1'))) chart = document.getElementById('chart_div_donutChart1');
                    this.view.flxLeftContainer.remove(spendingsWidget);
                }
                if (!this.view.flxRightContainer.widgets().includes(spendingsWidget)) {
                    this.view.flxRightContainer.addAt(spendingsWidgetClone, 1);
                    if (!kony.sdk.isNullOrUndefined(document.getElementById('frmDashboard_mySpending_donutChart1'))) {
                        var container = document.getElementById('frmDashboard_mySpending_donutChart1');
                        container.appendChild(chart);
                        this.getPFMMonthlyDonutChart(this.PFMData);
                    }
                }
            }
            if (width === 1024 || orientationHandler.isTablet) {
                if (spendingsWidget.flxMySpendingWrapper.flxMySpending.donutChart1) spendingsWidget.flxMySpendingWrapper.flxMySpending.donutChart1.centerX = "50%";
                else this.view.mySpending.flxMySpendingWrapperdataUnavailable.centerX = "50%";
                if (spendingsWidgetClone.flxMySpendingWrapper.flxMySpending.donutChart1) spendingsWidgetClone.flxMySpendingWrapper.flxMySpending.donutChart1.centerX = "50%";
                else this.view.mySpending.flxMySpendingWrapperdataUnavailable.centerX = "50%";
                approvalsWidget.layoutType = kony.flex.FLOW_HORIZONTAL;
                approvalsWidgetClone.layoutType = kony.flex.FLOW_HORIZONTAL;
                if (this.view.flxMyApprovals.isVisible === true && this.view.flxMyRequests.isVisible === true) {
                    this.view.flxMyApprovals.width = "49%";
                    this.view.flxMyRequests.width = "49%";
                    this.view.flxMyRequests.left = "2%";
                } else if (this.view.flxMyApprovals.isVisible === true) {
                    this.view.flxMyApprovals.width = "100%";
                } else if (this.view.flxMyRequests.isVisible === true) {
                    this.view.flxMyRequests.width = "100%";
                }
            } else {
                approvalsWidget.layoutType = kony.flex.FLOW_VERTICAL;
                approvalsWidgetClone.layoutType = kony.flex.FLOW_VERTICAL;
                this.view.flxMyApprovals.width = "100%";
                this.view.flxMyRequests.width = "100%";
                this.view.flxMyRequests.left = "0%";
            }
            if (width === 640 || orientationHandler.isMobile) {
                //               if(this.isSingleCustomerProfile)
                //                 this.view.flxMyCashPosition.setVisibility(false);
                //               if(this.isBusinessUser)
                //                 this.view.mySpending.setVisibility(false);
                //               if(!this.isSingleCustomerProfile)
                //                 this.view.customheader.topmenu.flxCombinedMobile.setVisibility(false);
                this.view.advancedFilters.flxButtons.reverseLayoutDirection = true;
            } else this.view.advancedFilters.flxButtons.reverseLayoutDirection = false;
            if (width === 1024 || orientationHandler.isTablet) {
                if (!applicationManager.getConfigurationManager().checkUserPermission('ACCESS_CASH_POSITION')) this.view.flxMyCashPosition.setVisibility(false);
                if (!applicationManager.getConfigurationManager().checkUserPermission('PERSONAL_FINANCE_MANAGEMENT')) this.view.mySpending.setVisibility(false);
            }
            if (applicationManager.getDeviceUtilManager().getDeviceInfo().screenWidth === 768) {
                this.view.accountsFilter.left = "110dp";
                this.view.accountsFilter.width = "240dp";
                this.view.flxAdvancedFilters.left = "110dp";
            }
            if (applicationManager.getDeviceUtilManager().getDeviceInfo().screenWidth <= 640) {
                this.view.accountsFilter.top = "47dp";
                this.view.accountsFilter.left = "-53.5dp";
                this.view.accountsFilter.width = "291dp";
            }
            this.view.forceLayout();
        },
        closePopupAndFilterScreens: function(value) {
            switch (value) {
                case "all":
                    this.closeDefaultViewsDropDown();
                    this.closeAdvancedFilter();
                    this.closeCalendarPopUp();
                    this.closePFMDropDown();
                    break;
                case "defaultView":
                    this.closeAdvancedFilter();
                    this.closeCalendarPopUp();
                    this.closePFMDropDown();
                    break;
                case "advanceFilter":
                    this.closeDefaultViewsDropDown();
                    this.closeCalendarPopUp();
                    this.closePFMDropDown();
                    break;
                case "calendarPopUp":
                    this.closeDefaultViewsDropDown();
                    this.closeAdvancedFilter();
                    this.closePFMDropDown();
                    break;
                case "PFMDropDown":
                    this.closeDefaultViewsDropDown();
                    this.closeAdvancedFilter();
                    this.closeCalendarPopUp();
                    this.closePFMDropDown();
                    break;
                default:
                    this.closeDefaultViewsDropDown();
                    this.closeAdvancedFilter();
                    this.closeCalendarPopUp();
                    this.closePFMDropDown();
            }
            this.view.forceLayout();
        },
        closeDefaultViewsDropDown: function() {
            this.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            this.view.accountsFilter.setVisibility(false);
        },
        closeAdvancedFilter: function() {
            this.view.flxAdvancedFilters.setVisibility(false);
            this.view.btnAdvancedFiltersDropdown.text = 't';
            this.view.btnAdvancedFiltersDropdown.skin = "sknBtnOLBFontIcons";
            this.advancedFiltersAccessibility();
        },
        closeCalendarPopUp: function() {
            this.view.flxCalendar.setVisibility(false);
        },
        closePFMDropDown: function() {
            this.view.imgAccountsDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            this.view.flxAccountList.setVisibility(false);
        },
        /**
         * Component totalAssets / Donut Chart
         * Create Dounut chart and bind data
         */
        setGraphData: function(resData) {
            if (resData.response.AssetList && Object.keys(resData.response.AssetList).length > 0) {
                this.view.flxTotalAssetsContainer.height = kony.flex.USE_PREFFERED_SIZE;
                if (Object.keys(resData.response.AssetList.assets).length === 0) {
                    this.view.flxTotalAssetsContainer.isVisible =false;
                }else{
                     this.view.flxTotalAssetsContainer.isVisible =true;
                }
                var assets = resData.response.AssetList;
                this.view.totalAssets.createDonutChart(assets);
                var val = resData.response.AssetList;
                var forUtility = applicationManager.getFormatUtilManager();
                var unrealizedPL = forUtility.formatAmountandAppendCurrencySymbol(val.unRealizedPLAmount, val.referenceCurrency);
                if (val.unRealizedPL == "P") {
                    this.view.lblUnrealisedPLValue.skin = "IWLabelGreenText15Px";
                    this.view.lblUnrealisedPLValue.text = (unrealizedPL != "" && val.unRealizedPLPercentage != "") ? ("+" + unrealizedPL + " " + "(+" + val.unRealizedPLPercentage + "%)") : ((unrealizedPL != "") ? ("+" + unrealizedPL) : ((val.unRealizedPLPercentage != "") ? ("(+" + val.unRealizedPLPercentage + "%)") : ""));
                } else {
                    this.view.lblUnrealisedPLValue.skin = "sknIblEE0005SSPsb45px";
                    this.view.lblUnrealisedPLValue.text = (unrealizedPL != "" && val.unRealizedPLPercentage != "") ? (unrealizedPL + " " +"(" + val.unRealizedPLPercentage + "%)") : ((unrealizedPL != "") ? (unrealizedPL) : ((val.unRealizedPLPercentage != "") ? ("(" + val.unRealizedPLPercentage + "%)") : ""));
                }
            } else {
                this.view.flxTotalAssetsContainer.isVisible = false;
            }
        },
        getAssetsList: function() {
            this.view.flxTotalAssetsContainer.isVisible =false;
            var userManager = applicationManager.getUserPreferencesManager();
            var custId = userManager.getBackendIdentifier();
            if (custId === "") {
                if (userManager.primaryCustomerId.id === "" || userManager.primaryCustomerId.id === undefined) {
                    custId = userManager.accessibleCustomerIds[0].id;
                } else {
                    custId = userManager.primaryCustomerId.id;
                }
            }
            var params = {
                "customerId": custId
            };
            if (applicationManager.getConfigurationManager().isMicroAppPresent("PortfolioManagementMA")) {
                var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    "moduleName": "WealthPortfolioUIModule",
                    "appName": "PortfolioManagementMA"
                }).presentationController;
                wealthModule.getAssetsList(params);
            }
        },
        loadAssetsDetails: function(resData) {
            this.setGraphData(resData);
        },
        /**
         * Component investmentlineChart
         * Create Line chart and bind data
         */
        chartService: function(filter) {
            var userManager = applicationManager.getUserPreferencesManager();
            var custId = userManager.getBackendIdentifier();
            if (custId === "") {
                if (userManager.primaryCustomerId.id === "" || userManager.primaryCustomerId.id === undefined) {
                    custId = userManager.accessibleCustomerIds[0].id;
                } else {
                    custId = userManager.primaryCustomerId.id;
                }
            }
            var params = {
                "customerId": custId,
                "graphDuration": filter
            };
            if (applicationManager.getConfigurationManager().isMicroAppPresent("PortfolioManagementMA")) {
                var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    "moduleName": "WealthPortfolioUIModule",
                    "appName": "PortfolioManagementMA"
                }).presentationController;
                wealthModule.getDashboardGraphDetails(params);
            }
        },
        loadInvestmentAccounts: function(respData) {
            var investmentAccData = [];
            if (respData.response.PortfolioList) {
                var dataFromResponse = respData.response.PortfolioList ? respData.response.PortfolioList.portfolioList : [];
                this.view.lblTilte.text = kony.i18n.getLocalizedString("i18n.wealth.myInvestmentSummary") + "(" + dataFromResponse.length + ")";
                if (dataFromResponse.length > 0) {
                    this.view.flxLoadingData.isVisible = false;
                    this.view.segInvestmentAccounts.removeAll();
                    this.view.segInvestmentAccounts.isVisible = true;
                    this.view.flxNoAccountsResult.isVisible = false;
                    this.view.flxRecentActivity.isVisible = true;
                    if (applicationManager.getConfigurationManager().isMicroAppPresent("PortfolioManagementMA")) {
                        var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                            "moduleName": "WealthPortfolioUIModule",
                            "appName": "PortfolioManagementMA"
                        }).presentationController;
                        wealthModule.setAccountsListObj(dataFromResponse);
                    }
                  scope_WealthPresentationController.isAdvisory = (dataFromResponse[0].investmentType === "Advisory") ? true : false;
                    for (var list in dataFromResponse) {
                        var storeData;
                        var forUtility = applicationManager.getFormatUtilManager();
                        var maskAccountName = CommonUtilities.truncateStringWithGivenLength(dataFromResponse[list].accountName + "....", 26) + CommonUtilities.getLastFourDigit(dataFromResponse[list].accountNumber);
                        var profitLossAmount = forUtility.formatAmountandAppendCurrencySymbol(dataFromResponse[list].unRealizedPLAmount, dataFromResponse[list].referenceCurrency);
                        var accountBal = forUtility.formatAmountandAppendCurrencySymbol(dataFromResponse[list].marketValue, dataFromResponse[list].referenceCurrency);
                        if (dataFromResponse[list].unRealizedPL === "L") {
                            storeData = {
                                portfolioManagedSince: dataFromResponse[list].portfolioManagedSince,
                                accountName: {
                                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP42424213Px" : "sknSSP42424215Px",
                                    "text": maskAccountName,
                                },
                                portfolioId: dataFromResponse[list].portfolioId,
                                referenceCurrency: dataFromResponse[list].referenceCurrency,
                                profitLossAmt: {
                                    "skin": "sknEE0005SSP13px",
                                    "text": dataFromResponse[list].unRealizedPLPercentage !== "" ? "-" + profitLossAmount + " (-" + dataFromResponse[list].unRealizedPLPercentage + "%" + ")" : "-" + profitLossAmount,
                                },
                                accountBalance: {
                                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP42424213Px" : "sknlbl424242SSPReg24px",
                                    "text": accountBal,
                                },
                                imageAccountType: {
                                    "src": "personalaccount.png",
                                    isVisible: true
                                },
                                accountType: dataFromResponse[list].investmentType !== "Advisory" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Investment.key") : kony.i18n.getLocalizedString("i18n.wealth.advisory"),
                                //accountType: "Investment",
                                jointAccount: {
                                    "text": dataFromResponse[list].isJointAccount === "true" ? kony.i18n.getLocalizedString("i18n.wealth.jointHolder") : "",
                                    "isVisible": dataFromResponse[list].isJointAccount === "true" ? true : false
                                },
                                flx: {
                                    "onClick": function(event, context) {
                                        this.onInvestmentAccountSelect(event, context);
                                    }.bind(this)
                                }
                            };
                        } else {
                            var unRealizedPLPerc = dataFromResponse[list].unRealizedPLPercentage;
                            if (unRealizedPLPerc === undefined) {
                                unRealizedPLPerc = "0.00";
                            }
                            storeData = {
                                portfolioManagedSince: dataFromResponse[list].portfolioManagedSince,
                                accountName: {
                                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP42424213Px" : "sknSSP42424215Px",
                                    "text": maskAccountName,
                                },
                                portfolioId: dataFromResponse[list].portfolioId,
                                referenceCurrency: dataFromResponse[list].referenceCurrency,
                                profitLossAmt: {
                                    "skin": "skn2F8523ssp13px",
                                    "text": unRealizedPLPerc !== "" ? "+" + profitLossAmount + " (+" + unRealizedPLPerc + "%" + ")" : "+" + profitLossAmount,
                                },
                                accountBalance: {
                                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP42424213Px" : "sknlbl424242SSPReg24px",
                                    "text": accountBal,
                                },
                                imageAccountType: {
                                    "src": "personalaccount.png",
                                    isVisible: true
                                },
                                //                      accountType: dataFromResponse[list].investmentType,
                                accountType: dataFromResponse[list].investmentType !== "Advisory" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Investment.key") : kony.i18n.getLocalizedString("i18n.wealth.advisory"),
                                //accountType: "Investment",
                                jointAccount: {
                                    "text": dataFromResponse[list].isJointAccount === "true" ? kony.i18n.getLocalizedString("i18n.wealth.jointHolder") : "",
                                    "isVisible": dataFromResponse[list].isJointAccount === "true" ? true : false
                                },
                                flx: {
                                    "onClick": function(event, context) {
                                        this.onInvestmentAccountSelect(event, context);
                                    }.bind(this)
                                }
                            };
                        }
                        storeData.investmentTypeData = dataFromResponse[list].investmentType;
                        investmentAccData.push(storeData);
                        // 
                    }
                    this.view.segInvestmentAccounts.widgetDataMap = {
                        lblAccountName: "accountName",
                        lblProfitBalance: "profitLossAmt",
                        lblAccountBalance: "accountBalance",
                        imgBankLogo: "imageAccountType",
                        //flxBankIcon: "imageBank",
                        lblInvestmentLogo: "accountType",
                        lblJointAccountLogo: "jointAccount",
                        flxInvestmentRow: "flx"
                    };
                    this.view.segInvestmentAccounts.data = investmentAccData;
                } else {
                    this.view.flxLoadingData.isVisible = false;
                    this.view.segInvestmentAccounts.isVisible = false;
                    this.view.flxNoAccountsResult.isVisible = true;
                    this.view.flxInvestmentSummaryContainer.height = kony.flex.USE_PREFFERED_SIZE;
                    this.view.flxRecentActivity.isVisible = false;
                }
            } else {
                this.view.flxLoadingData.isVisible = false;
                this.view.segInvestmentAccounts.isVisible = false;
                this.view.flxNoAccountsResult.isVisible = true;
            }
        },
        isNullOrUndefined: function(val) {
            if (val === null || val === undefined || val === "") {
                return true;
            } else {
                return false;
            }
        },
        lineChartData: function(responseObj) {
            var val = responseObj.response;
            //  this.view.investmentLineChart.onFilterChanged = this.onFilterChanged.bind(this);
            //  this.view.investmentLineChart.isVisible = true;
              this.view.flxPortofolioValues.isVisible = true;
            //  this.view.flxLineChartInvestmentNoResults.isVisible = false;
            var forUtility = applicationManager.getFormatUtilManager();
            if (val.marketValue && this.portfoliovaluesflag) {
                this.portfoliovaluesflag = false;
                var totalVal = forUtility.formatAmountandAppendCurrencySymbol(val.marketValue, val.referenceCurrency);
                var unrealizedPL = forUtility.formatAmountandAppendCurrencySymbol(val.unRealizedPLAmount, val.referenceCurrency);
              //  var todaysPL = forUtility.formatAmountandAppendCurrencySymbol(val.todayPLAmount, val.referenceCurrency);
                this.view.lblValueMarketValue.text = totalVal;
                var flxUnrealisedPL = this.view.flxUnrealisedPL;
                var lbllUnrealisedPL = this.view.lbllUnrealisedPL;
                var lblUnrealisedPLValue = this.view.lblUnrealisedPLValue;
                /*if (val.unRealizedPLAmount >= 0) {
                                lblUnrealisedPLValue.skin = "IWLabelGreenText15Px";
                                lblUnrealisedPLValue.text = "+" + unrealizedPL + " (+" + val.unRealizedPLPercentage + "%)";
                            } else {
                                lblUnrealisedPLValue.skin = "sknIblEE0005SSPsb45px";
                                lblUnrealisedPLValue.text = unrealizedPL + " (" + val.unRealizedPLPercentage + "%)";
                            }
                    */
            } else if (val.marketValue) {
                this.view.flxPortofolioValues.isVisible = true;
                this.view.flxSeparatorInvestment.isVisible = false;
            } else {
                this.view.flxPortofolioValues.isVisible = false;
                this.view.flxSeparatorInvestment.isVisible = false;
            }
            if (!this.isNullOrUndefined(val.performanceValue)) {
                this.view.flxTodayPL.isVisible = true;
                if (scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())) {
                    this.view.lblUnrealisedPLValue.left = "91px";
                    this.view.lblTodayPLValue.left = "92px";
                    this.view.lblTodayPL.text = ":(" + val.performance + ") " + kony.i18n.getLocalizedString("i18n.wealth.performance");
                } else {
                    this.view.lblUnrealisedPLValue.left = "131px";
                    this.view.lblTodayPLValue.left = "131px";
                    this.view.lblTodayPL.text = kony.i18n.getLocalizedString("i18n.wealth.performance") + " (" + val.performance + "):";
                }
                this.onPerformanceFilterChange(val.performance);
                this.view.investmentLineChart.currentFilter = this.chartDefaultValue;
                if(Number(val.performanceValue.slice(1,)) == 0){
                    this.view.lblTodayPLValue.skin = "IWLabelGreenText15Px";
                    this.view.lblTodayPLValue.text = "+"+val.performanceValue.slice(1,) + "%";
                }
                else if (val.performanceValue > 0) {
                    this.view.lblTodayPLValue.skin = "IWLabelGreenText15Px";
                    this.view.lblTodayPLValue.text = val.performanceValue + "%";
                } else {
                    this.view.lblTodayPLValue.skin = "sknIblEE0005SSPsb45px";
                    this.view.lblTodayPLValue.text = val.performanceValue + "%";
                }
                }    
                else {
                  //  this.view.flxTodayPL.isVisible = false;   
                }
            this.view.investmentLineChart.onFilterChanged = this.onFilterChanged.bind(this);
            this.view.investmentLineChart.isVisible = true;
            this.view.flxLineChartInvestmentNoResults.isVisible = false;
            if (val.graphDuration && val.graphDuration.length > 0) {
                var graphData = val.graphDuration;
                if (applicationManager.getConfigurationManager().isMicroAppPresent("PortfolioManagementMA")) {
                    scope_WealthPresentationController.investmentChartCurrency = forUtility.getCurrencySymbol(val.referenceCurrency);
                }
                this.view.investmentLineChart.setChartData(graphData, null);
            } else {
                this.view.flxPortofolioLineChart.isVisible = false;
                this.view.flxSeparator3.isVisible = false;
            }
        },
        chartFilters: {
            ONE_MONTH: '1M',
            ONE_YEAR: '1Y',
            FIVE_YEARS: '5Y',
            YTD: 'YTD',
        },
      onPerformanceFilterChange: function(filter) {
            if (filter === this.chartFilters.ONE_MONTH) {
                this.chartDefaultValue = this.chartFilters.ONE_MONTH;
            } else if (filter === this.chartFilters.ONE_YEAR) {
                this.chartDefaultValue = this.chartFilters.ONE_YEAR;
            } else if (filter === "1 Year") {
                this.chartDefaultValue = "1Y";
            } else if (filter === this.chartFilters.FIVE_YEARS) {
                this.chartDefaultValue = this.chartFilters.FIVE_YEARS
            } else {
                this.chartDefaultValue = this.chartFilters.YTD;
            }
        },
        onFilterChanged: function(filter) {
            var filterMap = "";
            if (filter === this.chartFilters.YTD) {
              this.chartDefaultValue = this.chartFilters.YTD;
              filterMap = "YTD";
              this.chartService(filterMap);
            }
            else if (filter === this.chartFilters.ONE_MONTH) {
                this.chartDefaultValue = this.chartFilters.ONE_MONTH;
                filterMap = "OneM";
                this.chartService(filterMap);
            } else if (filter === this.chartFilters.ONE_YEAR) {
                this.chartDefaultValue = this.chartFilters.ONE_YEAR;
                filterMap = "OneY";
                this.chartService(filterMap);
            } else if (filter === this.chartFilters.FIVE_YEARS) {
                this.chartDefaultValue = this.chartFilters.FIVE_YEARS
                filterMap = "FiveY";
                this.chartService(filterMap);
            } else {
                this.chartService(filterMap);
            }
        },
        onInvestmentAccountSelect: function(event, context) {
            var navManager = applicationManager.getNavigationManager();
            var rowIndexValue = context.rowIndex;
            let Id = context.widgetInfo.data[rowIndexValue].portfolioId;
            let curr = context.widgetInfo.data[rowIndexValue].referenceCurrency;
            let portfolioManagedSince = context.widgetInfo.data[rowIndexValue].portfolioManagedSince;
            scope_WealthPresentationController.portfolioManagedSince = portfolioManagedSince;
            let idAndCurrObj = {
                "portfolioId": Id,
                "currency": curr
            }
            scope_WealthPresentationController.isAdvisory = (context.widgetInfo.data[rowIndexValue].investmentTypeData === "Advisory") ? true : false;
          scope_WealthPresentationController.isInvestmentAccount = !scope_WealthPresentationController.isAdvisory;
            if (applicationManager.getConfigurationManager().isMicroAppPresent("PortfolioManagementMA")) {
                if (scope_WealthPresentationController.jointAccountDetails.portfolioList[rowIndexValue].isJointAccount === "true") {
                    scope_WealthPresentationController.isJointAccount = true;
                } else {
                    scope_WealthPresentationController.isJointAccount = false;
                }
            }
            this.goToPortfolioDetails(idAndCurrObj);
        },
        goToPortfolioDetails: function(dataObject) {
            if (applicationManager.getConfigurationManager().isMicroAppPresent("PortfolioManagementMA")) {
                var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    "moduleName": "WealthPortfolioUIModule",
                    "appName": "PortfolioManagementMA"
                }).presentationController;
                wealthModule.setPortfolioId(dataObject.portfolioId);
                wealthModule.setPortfolioCurrency(dataObject.currency);
                scope_WealthPresentationController.isFirst = true;
            }
            if (applicationManager.getConfigurationManager().checkUserFeature("WEALTH_PORTFOLIO_DETAILS")) {
                new kony.mvc.Navigation({
                    "appName": "PortfolioManagementMA",
                    "friendlyName": "frmPortfolioOverview"
                }).navigate();
            }
        },
        getPortfolioList: function() {
            var userManager = applicationManager.getUserPreferencesManager();
            var custId = userManager.getBackendIdentifier();
            if (custId === "") {
                if (userManager.primaryCustomerId.id === "" || userManager.primaryCustomerId.id === undefined) {
                    custId = userManager.accessibleCustomerIds[0].id;
                } else {
                    custId = userManager.primaryCustomerId.id;
                }
            }
            var params = {
                "customerId": custId
            };
            var wealthModule = applicationManager.getModulesPresentationController({
                "moduleName": "WealthPortfolioUIModule",
                "appName": "PortfolioManagementMA"
            });
            wealthModule.getPortfolioList(params);
        },
      
          setPagination: function(values, viewModel) {
			var paginationCount = applicationManager.getConfigurationManager().getConfigurationValue('accountsPerPage');
			if (paginationCount > this.accounts.length || paginationCount === 0) {
                    this.view.PaginationContainer.setVisibility(false);
                } else {
                    this.view.PaginationContainer.setVisibility(true);
                }
            var recipientDetails = viewModel.length;
            const lastRecord = Math.min((values.offset + paginationCount), recipientDetails);
			this.lastRecord = lastRecord;
            this.view.PaginationContainer.lblPagination.text = (values.offset + 1) + " - " + lastRecord + " Accounts";
			this.view.PaginationContainer.flxPaginationFirst.isVisible = true;
            this.view.PaginationContainer.flxPaginationLast.isVisible = true;
            this.view.PaginationContainer.flxPaginationFirst.right = "0dp";
            if (values.offset !== 0 && values.offset <= recipientDetails - 1) {
                this.view.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                this.view.PaginationContainer.imgPaginationFirst.src = "pagination_first_active.png";
                this.view.PaginationContainer.flxPaginationFirst.setEnabled(true);
                this.view.PaginationContainer.flxPaginationPrevious.setEnabled(true);
                this.view.PaginationContainer.flxPaginationPrevious.onClick = this.onPrevious.bind(this, values, viewModel);
                this.view.PaginationContainer.flxPaginationFirst.onClick = this.onFirst.bind(this, values, viewModel);
            } else {
                this.view.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                this.view.PaginationContainer.imgPaginationFirst.src = "pagination_inactive.png";
                this.view.PaginationContainer.flxPaginationFirst.setEnabled(false);
                this.view.PaginationContainer.flxPaginationPrevious.setEnabled(false);
            }
            if (recipientDetails <= paginationCount || lastRecord > recipientDetails - 1) {
                this.view.PaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                this.view.PaginationContainer.imgPaginationLast.src = "pagination_last_inactive.png";
                this.view.PaginationContainer.flxPaginationLast.setEnabled(false);
                this.view.PaginationContainer.flxPaginationNext.setEnabled(false);
            } else {
                this.view.PaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                this.view.PaginationContainer.imgPaginationLast.src = "pagination_last_active.png";
                this.view.PaginationContainer.flxPaginationLast.setEnabled(true);
                this.view.PaginationContainer.flxPaginationNext.setEnabled(true);
                this.view.PaginationContainer.flxPaginationNext.onClick = this.onNext.bind(this, values, viewModel);
                this.view.PaginationContainer.flxPaginationLast.onClick = this.onLast.bind(this, values, viewModel);
            }
        },
        onFirst: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            var paginationCount = applicationManager.getConfigurationManager().getConfigurationValue('accountsPerPage');
            if (values.offset < recipientDetails) {
                values.offset = 0;
				this.offset = values.offset;
            }
            this.updateAccountList(viewModel);
        },
        onPrevious: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            var paginationCount = applicationManager.getConfigurationManager().getConfigurationValue('accountsPerPage');
            if (values.offset < recipientDetails) {
                values.offset = values.offset - paginationCount;
				this.offset = values.offset;
            }
            this.updateAccountList(viewModel);
        },
        onNext: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            var paginationCount = applicationManager.getConfigurationManager().getConfigurationValue('accountsPerPage');
            if (values.offset < recipientDetails) {
                values.offset = values.offset + paginationCount;
				this.offset = values.offset;
            }
            this.updateAccountList(viewModel);
        },
        onLast: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            var paginationCount = applicationManager.getConfigurationManager().getConfigurationValue('accountsPerPage');
            if (values.offset < recipientDetails) {
                var value = Math.floor(recipientDetails/paginationCount)
                values.offset = Math.min(paginationCount * value, recipientDetails)
				this.offset = values.offset;
            }
            this.updateAccountList(viewModel);
        },

        // CHECK PERMISSIONS and LOAD WEALTH MODULES
        getWealthModules: function() {
            var configManager = applicationManager.getConfigurationManager();
            var checkUserPermission = function(permission) {
                return applicationManager.getConfigurationManager().checkUserPermission(permission);
            }
            var userManager = applicationManager.getUserPreferencesManager();
            var custId = userManager.getBackendIdentifier();
            //custId = "1234";
            if (custId === "") {
                if ((userManager.primaryCustomerId.id === "" || userManager.primaryCustomerId.id === undefined) && userManager.accessibleCustomerIds[0]) {
                    custId = userManager.accessibleCustomerIds[0].id;
                } else {
                    custId = userManager.primaryCustomerId.id;
                }
            }
            let self = this;
            // TOP NEWS AND RECENT MARKETS PERMISSIONS CHECK AND PASS TO COMPONENT
            // get market index business component
            var marketIndexParam = {};
            //           let marketIndexPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_MARKET_AND_NEWS_MARKET_VIEW");
            //           let marketTopNewsPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_MARKET_AND_NEWS_TOP_NEWS_VIEW");
            //           let marketNewsViewDetails = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_MARKET_AND_NEWS_TOP_NEWS_DETAILS_VIEW");    
            let marketIndexPermission = configManager.getMarketIndexPermissionsList().some(checkUserPermission);
            let marketTopNewsPermission = configManager.getTopNewsPermissionsList().some(checkUserPermission);
            let marketNewsViewDetails = configManager.getNewsDetailsPermissionsList().some(checkUserPermission);
            self.view.marketIndexDashComp.isVisible = marketIndexPermission;
            self.view.marketIndexDashComp.getCriteria(marketIndexParam, marketIndexPermission, marketNewsViewDetails);
            // get Market News Component
            var marketNewsParam = {
                "Topic": "OLUSBUS",
                "pageSize": 4,
                "ReturnPrivateNetworkURL": "false"
            };
            self.view.marketNewsCardComp.isVisible = marketTopNewsPermission;
            self.view.marketNewsCardComp.getCriteria(marketNewsParam, marketTopNewsPermission, marketNewsViewDetails);
            if (marketIndexPermission === false && marketTopNewsPermission === false) {
                self.view.flxMarketNewsContainer.isVisible = false;
            }
            // WATCHLIST CHECK AND PASS PERMISSION TO COMPONENT
            //          let watchListAddInstrumentPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_WATCHLIST_INSTRUMENT_VIEW");
            let watchListAddInstrumentPermission = configManager.watchlistViewInstrumentPermissions().some(checkUserPermission);
            self.view.flxWatchlistContainer.isVisible = watchListAddInstrumentPermission;
            var watchlistParams = {
                "sortBy": "instrumentName",
                "pageSize": "5",
                "pageOffset": "0"
            };
            self.view.WatchlistDashCard.getCriteria(watchlistParams, watchListAddInstrumentPermission);
            //RECENT ACTIVITY CHECK AND PASS PERMISSION TO Component
            //          let recentActivityPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_INVESTMENT_DETAILS_RECENT_ACTIVITY_VIEW");
            let recentActivityPermission = configManager.getRecentActivityPermissionsList().some(checkUserPermission);
            self.view.flxRecentActivity.isVisible = recentActivityPermission;
            var recentActivParams = {
                "customerId": custId
            };
            self.view.recentActivityComp.getCustomerId(recentActivParams, recentActivityPermission);
            // CHECK ASSETS PERMISSIONS      
            //          let assetsPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_INVESTMENT_DETAILS_TOTAL_ASSETS_VIEW");
            let assetsPermission = configManager.getTotalAssetsPermissionsList().some(checkUserPermission);
            this.view.flxTotalAssetsContainer.isVisible = assetsPermission;
            if (assetsPermission === true) {
                this.getAssetsList();
            } else {
                this.view.flxTotalAssetsContainer.height = 0;
            }
            // CHECK PORTOFOLIO PERMISSIONS
            //          let portofolioPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_INVESTMENT_DETAILS_INVESTMENT_SUMMARY_VIEW");
            let portofolioPermission = configManager.getInvestmentSummaryPermissionsList().some(checkUserPermission);
            this.view.flxInvestmentSummaryContainer.isVisible = portofolioPermission;
            if (portofolioPermission === true) {
                this.onFilterChanged(this.chartDefaultValue);
                this.runPortfolioServiceCheck();
                this.getPortfolioList();
            }
        },
        portfolioListLoaded: function() {
            this.portfolioListLoaded = true;
        },
        disablePortfoliolist: function() {
            this.view.flxInvestmentSummaryContainer.height = 0;
        },
        servPortfolioLoaded: function() {
            clearInterval(this.portfolioClearInterval);
        },
        runPortfolioServiceCheck: function() {
            this.portfolioClearInterval = setInterval(this.checkPortfolioServResp, 300);
        },
        checkPortfolioServResp: function() {
            // applicationManager.getPresentationUtility().showLoadingScreen();
            if (this.portfolioListLoaded === true) {
                this.servPortfolioLoaded();
                applicationManager.getPresentationUtility().dismissLoadingScreen();
            }
        },
      
   /**
     * @api : navigateToSBAScreen
     * This function is resposible for navigating to Smart Banking Advisory Info Screen
     * @return : NA
     */
      navigateToSBAScreen: function(){
        applicationManager.getModulesPresentationController({ appName: 'SBAdvisoryMA', moduleName: 'EnrolmentModule' }).navigateToScreens('SBAInfo');
      },
      
      loadSbaCashFlowData: function(responseData) {
        var forUtility = applicationManager.getFormatUtilManager();
        this.view.lblCashInFlowAmt.text = forUtility.formatAmountandAppendCurrencySymbol(responseData.currMoneyIn);
        this.view.lblCashOutFlowAmt.text = forUtility.formatAmountandAppendCurrencySymbol(responseData.currMoneyOut);
        this.view.lblCashOnHandAmt.text = forUtility.formatAmountandAppendCurrencySymbol(responseData.currCashOnHand);
        this.chartData.chartProperties = {
          height: '100%',
          width: '100%',
          legend: 'none',
          slantedText: false,
          curveType: 'function',
          focusTarget: 'category',
          series: {
            0: {
              color: '#54D75D',
              lineWidth: 3,
              lineDashStyle: [4, 2]
            },
            1: {
              color: '#FF8600',
              lineWidth: 3,
              lineDashStyle: [2, 2]
            },
            2: {
              color: '#008495',
              lineWidth: 3,
            }
          },
          tooltip: {
            isHtml: true
          },
          type: 'line',
          annotations: {
            style: 'line',
            textStyle: {
              color: '#646464',
              fontName: 'CircularStd-Book',
              fontSize: 13,
            },
          },
          chartArea: {
            bottom: 25,
            height: '257px',
            left: 65,
            right: 20,
            top: 20,
            width: '100%',
          },
          hAxis: {
            textStyle: {
              color: '#424242',
              fontName: 'SourceSansPro-Regular',
              fontSize: 13,
            },
            slantedText: false,
          },
          vAxis: {
            format: 'short',
            textStyle: {
              color: '#727272',
              fontName: 'SourceSansPro-Regular',
              fontSize: 13,
            },
          },
          crosshair: {
            focused: {
              color: '#999999'
            },
            orientation: 'vertical',
            trigger: 'focus',
          }
        };
        this.chartData.data = [
            ['x', {
              type: 'string',
              role: 'annotation'
            }, {
              type: 'string',
              role: 'annotationText'
            }, {
              type: 'string',
              role: 'tooltip',
              p: {
                html: true
              }
            }, kony.i18n.getLocalizedString("i18n.SBAdvisory.cashInflow"), {
              type: 'boolean',
              role: 'certainty'
            }, kony.i18n.getLocalizedString("i18n.SBAdvisory.cashOutflow"), {
              type: 'boolean',
              role: 'certainty'
            }, kony.i18n.getLocalizedString("i18n.SBAdvisory.cashOnHand"), {
              type: 'boolean',
              role: 'certainty'
            }]
          ];
        this.addGraphData(responseData);
        this.view.flxSbaMainCashFlowGraph.setVisibility(true);
        this.view.CashFlowchart.data = JSON.stringify(this.chartData);
      },
      addGraphData: function(customData) {
        var scope = this;
        if (!scope.isEmpty(customData)) {
          customData.recordsPast.forEach((historicalData, index) => {
            var shortMonth = scope.getDateMonthShortFormat(historicalData.date);
            if (scope.getDateMonthShortFormat(historicalData.date) === 'Jan') {
              this.chartData.data.push([
                shortMonth,
                scope.getDateYear(historicalData.date),
                '',
                scope.setTooltipContent(historicalData, false),
                scope.parseFloatTwoDecimals(historicalData.moneyIn),
                true,
                scope.parseFloatTwoDecimals(historicalData.moneyOut),
                true,
                scope.parseFloatTwoDecimals(historicalData.cashOnHand),
                true
              ]);
            } else if (index === customData.recordsPast.length - 1) {
              this.chartData.data.push([
                shortMonth,
                kony.i18n.getLocalizedString("i18n.ImportLC.Today"),
                '',
                scope.setTooltipContent(historicalData, false),
                scope.parseFloatTwoDecimals(historicalData.moneyIn),
                true,
                scope.parseFloatTwoDecimals(historicalData.moneyOut),
                true,
                scope.parseFloatTwoDecimals(historicalData.cashOnHand),
                true
              ]);
            } else if (index === 0) {
              this.chartData.data.push([
                shortMonth,
                scope.getDateYear(historicalData.date),
                "",
                scope.setTooltipContent(historicalData, false),
                scope.parseFloatTwoDecimals(historicalData.moneyIn),
                true,
                scope.parseFloatTwoDecimals(historicalData.moneyOut),
                true,
                scope.parseFloatTwoDecimals(historicalData.cashOnHand),
                true
              ]);
            } else {
              this.chartData.data.push([
                shortMonth,
                null,
                null,
                scope.setTooltipContent(historicalData, false),
                scope.parseFloatTwoDecimals(historicalData.moneyIn),
                true,
                scope.parseFloatTwoDecimals(historicalData.moneyOut),
                true,
                scope.parseFloatTwoDecimals(historicalData.cashOnHand),
                true
              ]);
            }
          });
          let predictiveRecords = [];
          const date = new Date(customData.recordsPast[customData.recordsPast.length-1].date);
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let fullYear = date.getFullYear();
          customData.recordsPredictive.map((item, index) => {
            let predictiveMonth = month + (index + 1);
            let year = (predictiveMonth) <= 12 ? fullYear : fullYear + ((predictiveMonth) % 12);
            let currentDate = `${year}-${predictiveMonth <= 12 ? predictiveMonth : (predictiveMonth % 12).toString().padStart(2, '0')}-${day}`;
            item.date = currentDate;
            predictiveRecords.push(item);
          });
          predictiveRecords.forEach((predictiveData) => {
            var shortMonth = scope.getDateMonthShortFormat(predictiveData.date);
            this.chartData.data.push([
              shortMonth,
              null, null,
              scope.setTooltipContent(predictiveData, true),
              predictiveData.hasOwnProperty("moneyIn") ? scope.parseFloatTwoDecimals(predictiveData.moneyIn) : scope.parseFloatTwoDecimals(""),
              false,
              predictiveData.hasOwnProperty("moneyOut") ? scope.parseFloatTwoDecimals(predictiveData.moneyOut) : scope.parseFloatTwoDecimals(""),
              false,
              predictiveData.hasOwnProperty("netDisposableIncome") ? scope.parseFloatTwoDecimals(predictiveData.netDisposableIncome) : scope.parseFloatTwoDecimals(""),
              false
            ]);
          });
        }
      },

     isEmpty: function(obj) {
       for (var prop in obj) {
         if (obj.hasOwnProperty(prop)) {
           return false;
         }
       }
       return JSON.stringify(obj) === JSON.stringify({});
     },

     getDateMonthLongFormat: function(date) {
        let month = new Date(date).toLocaleString('en', {
          month: 'long'
        });
        return kony.i18n.getLocalizedString(`kony.mb.Months.${month}`)
      },

     getDateMonthShortFormat: function(date) {
       return new Date(date).toLocaleString('en', {
         month: 'short'
       });
     },

     getDateYear: function(date) {
       return new Date(date).toLocaleString('en', {
         year: 'numeric'
       });
     },			

        setTooltipContent: function (dataTable, isPredictiveData) {
            var scope = this;
            if (isPredictiveData) {
                return (
                    '<div class="tooltipContainer"><div class="tooltipTitleCashFlow divider"><p>' +
                    scope.getDateMonthLongFormat(dataTable.date) +
                    '</p><div class="closeBtnContainer"><button id="closeBtn" class="closeBtn">X</button></div></div><div class="tooltipInfoContainer"><div class="tooltipMoneyFlow"><h4>'+ kony.i18n.getLocalizedString("i18n.SBAdvisory.netDisposableIncome") + '</h4><br><br><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft">' + kony.i18n.getLocalizedString("i18n.SBAdvisory.projectedBalance") + '</p><p class="tooltipMoneyFlowListItemRight">' +
                    scope.getMoneyFormat(parseFloat(dataTable.netDisposableIncome || 0)) +
                    '</p></div>');
            } else {
                return (
                    '<div class="tooltipContainer"><div class="tooltipTitleCashFlow divider"><p>' +
                    scope.getDateMonthLongFormat(dataTable.date) +
                    '</p><div class="closeBtnContainer"><button id="closeBtn" class="closeBtn">X</button></div></div><div class="tooltipInfoContainer"><div class="tooltipMoneyFlow"><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft"><img src= "./desktopweb/images/cashinflow.png">&nbsp;' + kony.i18n.getLocalizedString("i18n.SBAdvisory.cashInflow") + '</p><p class="tooltipMoneyFlowListItemRight">' +
                    scope.getMoneyFormat(dataTable.moneyIn || 0) +
                    '</p></div><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft"><img src="./desktopweb/images/cashoutflow.png">&nbsp;' + kony.i18n.getLocalizedString("i18n.SBAdvisory.cashOutflow") + '</p><p class="tooltipMoneyFlowListItemRight">' +
                    scope.getMoneyFormat(parseFloat(dataTable.moneyOut || 0)) +
                    '</p></div><div class="tooltipMoneyFlowListCashFlow divider"><p class="tooltipMoneyFlowListItemLeft"><img src="./desktopweb/images/cfonhandhand.png">&nbsp;' + kony.i18n.getLocalizedString("i18n.SBAdvisory.cashOnHand") + '</p><p class="tooltipMoneyFlowListItemRight">' +
                    scope.getMoneyFormat(parseFloat(dataTable.cashOnHand || 0)) +
                    '</p></div><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft">' + kony.i18n.getLocalizedString("i18n.SBAdvisory.closingBalance") + '</p><p class="tooltipMoneyFlowListItemRight">' +
                    scope.getMoneyFormat(parseFloat(dataTable.closingBalance || 0)) +
                    '</p></div><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft">' + kony.i18n.getLocalizedString("i18n.SBAdvisory.monthlyTotal") + '</p><p class="tooltipMoneyFlowListItemRight">' +
                    scope.getMoneyFormat(parseFloat(dataTable.monthlyTotal || 0)) +
                    '</p></div><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft">' + kony.i18n.getLocalizedString("i18n.SBAdvisory.monthlyChange") + '</p><p class="tooltipMoneyFlowListItemRight">' +
                    dataTable.monthlyChange +
                    '</p></div>');
            }
        },

     getMoneyFormat: function(amount) {
       var scope = this;
       var formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         currency: 'USD',
         minimumFractionDigits: 0,
       });
       if(typeof(amount) === "string") {
         return amount;
       } else {
         if(isNaN(amount)) {
           return "-";
         } else {
           return formatter.format(amount)
         }
       }
     },

    parseFloatTwoDecimals: function(strAmount) {
       return parseFloat(parseFloat(strAmount).toFixed(2));
      },
      
        loadSbaHealthScoreData: function (resData) {
            businessHealth = {
                "healthScore": resData.currentScore
            };
            this.view.flxSbaBusinessHealthScore.setVisibility(true);
            this.view.HealthScore.data = JSON.stringify(businessHealth);
        },

        onClickofCashflowButton: function(isYearEnabled){
            var scope = this;
            var param = {
                "subscriber": "123456"
            };
            if(isYearEnabled){
               this.view.btnSBAOneYear.skin = "ICSknBtnAccountSummarySelected13px";
               this.view.btnSBASixMonths.skin = "ICSknBtnAccountSummaryUnselected13px"; 
            }else{
                this.view.btnSBAOneYear.skin = "ICSknBtnAccountSummaryUnselected13px";
                this.view.btnSBASixMonths.skin = "ICSknBtnAccountSummarySelected13px";                 
            }
            isOneYear = isYearEnabled;
            scope.presenter.presentationController.getCashFlow(param, this.view.id);
        },

        /**
         * @api : navigateToSBAStimulation
         * This function is resposible for navigating to Smart Banking Advisory Stimulation Screen
         * @return : NA
         */
        navigateToSBAStimulation: function (buttonType) {
             var data = {};
            data.formName = this.view.id;
            data.buttonType = buttonType;
            applicationManager.getModulesPresentationController({ appName: 'SBAdvisoryMA', moduleName: 'EnrolmentModule' }).navigateToScreens('SBAStimulation', data);
        },

        /**
        * @api : showHealthAndDriversPopup
        * This function is resposible for showing business health and drivers popup
        * @return : NA
        */
        showHealthAndDriversPopup: function (param) {
            var scope = this;
            this.view.flxSBADriversPopUp.setVisibility(param);
            if (businessHealth) {
                if (param) {
                    this.view.popUpBusinessHealth.data = JSON.stringify(businessHealth);
                } else {
                    this.view.HealthScore.data = JSON.stringify(businessHealth);
                }
            }
        },

        /**
         * @api : setsegSBADriversWidgetMap
         * This function is resposible for setting widgetMap for segment inorder to display SBA driver details
         * @return : NA
         */
        setsegSBADriversWidgetMap: function () {
            this.view.segDrivers.widgetDataMap = {
                "flxContent": "flxContent",
                "flxHeading": "flxHeading",
                "flxMain": "flxMain",
                "flxMainContent": "flxMainContent",
                "flxSbaDrivers": "flxSbaDrivers",
                "imgDriver": "imgDriver",
                "imgHeading": "imgHeading",
                "lblField": "lblField",
                "lblHeader": "lblHeader",
                "lblIndicator": "lblIndicator",
                "lblValue": "lblValue",
                "flxIndicator": "flxIndicator"
            }
        },

        /**
         * @api : setsegSBADriversData
         * This function is resposible for setting SBA driver details to segment
         * @return : NA
         */
        setsegSBADriversData: function (data) {
            var scope = this;
            var driversData = [];
            var section1 = [];
            var section2 = [];
            scope.setsegSBADriversWidgetMap();
            var positiveDrivers = data.DriversPositive;
            var negativeDrivers = data.DriversNegative;
            var driverVariable = SBADriverVariables.collection_variables.driverConstants;
            section1 = [{
                imgHeading: {
                    src: "warning.png",
                    isVisible: true
                },
                lblHeader: {
                    text: `(${data.DriversNegative.length}) ${kony.i18n.getLocalizedString('i18n.SBAdvisory.thingsThat')}`,
                    skin: "ICSknLble5690b13pxSemibold"
                },
                flxHeading: {
                    top: "30dp"
                }
            },
            []
            ];
            negativeDrivers.forEach((negDriver) => {
                section1[1].push({
                    lblValue: {
                        text: driverVariable.find(item => item.key === negDriver.name) ? driverVariable.find(item => item.key === negDriver.name).value.negative + applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(negDriver.value) : NA
                    },
                    lblIndicator: {
                        skin: "ICSknLblbge5690b",
                        width: `${parseInt(negDriver.percentage)}%`
                    },
                    imgDriver: {
                        isVisible: false,
                    }
                })
            });
            section2 = [{
                imgHeading: {
                    src: "like.png",
                    isVisible: true,
                    width: '24dp',
                    height: '24dp'
                },
                lblHeader: {
                    text: `(${data.DriversPositive.length}) ${kony.i18n.getLocalizedString('i18n.SBAdvisory.thingsThatAreGoingWell')}`,
                    skin: "ICSknLbl04a61513pxSemibold"
                }
            },
            []
            ];
            positiveDrivers.forEach((posDriver) => {
                section2[1].push({
                    lblValue: {
                        text: driverVariable.find(item => item.key === posDriver.name) ? driverVariable.find(item => item.key === posDriver.name).value.positive + applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(posDriver.value) : NA
                    },
                    lblIndicator: {
                        skin: "ICSknLblbg00850e",
                        width: `${parseInt(posDriver.percentage)}%`
                    },
                    imgDriver: {
                        isVisible: false,
                    }
                })
            });
            driversData.push(section2);
            driversData.push(section1);
            this.view.segDrivers.setData(driversData);
        },

        /**
        * @api : checkAndCountBusinessAccount
        * This function is resposible for checking individual accounts and finding business contracts
        * @return : NA
        */
        checkAndCountBusinessAccount: function (segData) {
            let hasbusinessAcc = 0;
            let memberShipId = "";
            segData.forEach((data) => {
                data[1].forEach((acc) => {
                    if (this.presenter.presentationController.fetchIsBusinessAccount(acc.accountID) === "true") {
                        //This piece of code will check whether this account is business account or not
                        if (memberShipId != acc.lblAccountTypeHeader.text) {
                            hasbusinessAcc++;
                            memberShipId = acc.lblAccountTypeHeader.text;
                        }
                    }
                });
            });
            //It is hold the total business contracts
            return hasbusinessAcc;
        },
      
        /**
         * @api : updateHamburger
         * This function is resposible for updating hamburger based on business accounts available in order to show SBA related data
         * @return : NA
         */
        updateHamburger: function () {
            var scope = this;
            try {
                let sbaJourneyArray = applicationManager.getSbaJourney();
                sbaJourneyArray.map((business, index) => {
                    if (business.featuresAndPermissions.SBA_XAI_DASHBOARD || business.featuresAndPermissions.SBA_AID) {
                        // If business is having SBA_XAI_DASHBOARD, then it's eligible for SBA
                        applicationManager.sbaJourney[index].hamburgerMenu = {
                            sba: true,
                            enrol: false,
                            cashFlow: false,
                        };
                        if (business.hasOwnProperty("enrolmentStatus") || business.hasOwnProperty("sbaEnrolmentStatus")) {
                            isLive = business.sbaEnrolmentStatus && business.sbaEnrolmentStatus.hasOwnProperty("isLive") ? JSON.parse(business.sbaEnrolmentStatus.isLive) : true;
                            //for single business case, getStatus returning empty array[]. so handling especially for that
                            if (isSingleBusinessView && (kony.sdk.isArray(business.enrolmentStatus) && business.sbaEnrolmentStatus.status === sbaEnrolmentStatuses.ENABLED)) {
                                delete business.enrolmentStatus;
                            }
                            if ((isLive || kony.sdk.isNullOrUndefined(isLive)) && business.hasOwnProperty("enrolmentStatus")) {
                                // getStatus/getEnrolment status is available
                                // business.enrolmentStatus.status = "";
                                // TODO: Remove above line
                                if (business.enrolmentStatus == "") {
                                    // Fresh/Revoked User
                                    applicationManager.sbaJourney[index].hamburgerMenu.enrol = true;
                                    applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                } else if (business.enrolmentStatus.EnrollmentState === SBA_ENROL_STATUS.SBA_PENDING_AUTH || business.enrolmentStatus.EnrollmentState == SBA_ENROL_STATUS.SBA_ILP_STARTED) {
                                    if (business.enrolmentStatus.EnrollmentState == SBA_ENROL_STATUS.SBA_ILP_STARTED && business.enrolmentStatus.EventMinutesAgo > scope_configManager.sbaEventMinutesAgo.ILP_StartedEventMinutesAgo) {
                                        // 60 min after ILP_Started
                                        applicationManager.sbaJourney[index].hamburgerMenu.enrol = true;
                                        applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                    } else {
                                        // ConnectionStatus_PendingAuth  Logged into accounting SW but not received the success response
                                        // ILP_Started - Logged in with accounting SW but waiting for response from AC SW
                                        applicationManager.sbaJourney[index].hamburgerMenu.enrol = false;
                                        applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                    }
                                } else if (business.enrolmentStatus.EnrollmentState == SBA_ENROL_STATUS.SBA_ILP_COMPLETE) {
                                    if (business.enrolmentStatus.EventMinutesAgo < scope_configManager.sbaEventMinutesAgo.ILP_CompleteEventMinutesAgo) {
                                        // Analyzing tile: Logged in with accounting SW and got response from AC SW but waiting for analytics response
                                        applicationManager.sbaJourney[index].hamburgerMenu.enrol = false;
                                        applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                        scope.updateHamburgerForChartAndHealthScore(business, index);
                                    } else if (business.enrolmentStatus.EventMinutesAgo >= scope_configManager.sbaEventMinutesAgo.ILP_CompleteEventMinutesAgo) {
                                        // ILP_Complete with more than or equal to 360 min waiting time
                                        scope.ilpCompleteAfterTimeoutHamburger(business, index);
                                    }
                                } else if (business.enrolmentStatus.EnrollmentState == SBA_ENROL_STATUS.SBA_DEAUTHORIZED) {
                                    applicationManager.sbaJourney[index].hamburgerMenu.enrol = true;
                                    applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                }
                            } else {
                                // getStatus/getEnrolment status is not available
                                let sbaEnrolmentStatus = business.sbaEnrolmentStatus.status;
                                if (sbaEnrolmentStatus == sbaEnrolmentStatuses.ENABLED) {
                                    applicationManager.sbaJourney[index].hamburgerMenu.enrol = true;
                                    applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                    //second condition in order to check we are in live flow with revoked status.since we are not getting enrolmentStatus object
                                } else if (sbaEnrolmentStatus == sbaEnrolmentStatuses.REVOKED || (isLive && (sbaEnrolmentStatus == sbaEnrolmentStatuses.COMPLETED || sbaEnrolmentStatus === sbaEnrolmentStatuses.INPROGRESS) && (!business.hasOwnProperty("enrolmentStatus")))) {
                                    applicationManager.sbaJourney[index].hamburgerMenu.enrol = true;
                                    applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                } else if (sbaEnrolmentStatus == sbaEnrolmentStatuses.RETRY || sbaEnrolmentStatus == sbaEnrolmentStatuses.CANCELED) {
                                    applicationManager.sbaJourney[index].hamburgerMenu.enrol = true;
                                    applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                } else if (sbaEnrolmentStatus == SBA_ENROL_STATUS.SBA_PENDING_AUTH || sbaEnrolmentStatus == SBA_ENROL_STATUS.SBA_ILP_STARTED) {
                                    if (sbaEnrolmentStatus == SBA_ENROL_STATUS.SBA_ILP_STARTED && business.sbaEnrolmentStatus.EventMinutesAgo > scope_configManager.sbaEventMinutesAgo.ILP_StartedEventMinutesAgo) {
                                        // 60 min after ILP_Started
                                        applicationManager.sbaJourney[index].hamburgerMenu.enrol = true;
                                        applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                    } else {
                                        // ConnectionStatus_PendingAuth  Logged into accounting SW but not received the success response
                                        // ILP_Started - Logged in with accounting SW but waiting for response from AC SW
                                        applicationManager.sbaJourney[index].hamburgerMenu.enrol = false;
                                        applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                    }
                                } else if (sbaEnrolmentStatus == SBA_ENROL_STATUS.SBA_ILP_COMPLETE || sbaEnrolmentStatus == sbaEnrolmentStatuses.COMPLETED) {
                                    if (business.sbaEnrolmentStatus.EventMinutesAgo < scope_configManager.sbaEventMinutesAgo.ILP_CompleteEventMinutesAgo) {
                                        // Logged in with accounting SW and got response from AC SW but waiting for analytics response (Within 360 min)
                                        applicationManager.sbaJourney[index].hamburgerMenu.enrol = false;
                                        applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                    } else if (business.sbaEnrolmentStatus.EventMinutesAgo >= scope_configManager.sbaEventMinutesAgo.ILP_CompleteEventMinutesAgo || sbaEnrolmentStatus == sbaEnrolmentStatuses.COMPLETED) {
                                        // ILP_Complete with more than or equal to 360 min waiting time
                                        scope.ilpCompleteAfterTimeoutHamburger(business, index);
                                    }
                                } else if (sbaEnrolmentStatus == SBA_ENROL_STATUS.SBA_DEAUTHORIZED) {
                                    applicationManager.sbaJourney[index].hamburgerMenu.enrol = true;
                                    applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                                }
                            }
                        }
                    } else {
                        applicationManager.sbaJourney[index].hamburgerMenu.enrol = true;
                        applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                    }
                });
                this.setHamburgerConfig();
            } catch (err) {
                var errorObj = {
                    "method": "updateHamburger",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :getSbaDetails
         * geting SBA details
         * @arg1 {name} : Response to load data
         * @return : NA
         */
        getSbaDetails: function () {
            var scope = this;
            try {
                var userAttributes = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
                if (applicationManager.getSbaJourney() == '' && applicationManager.getUserPreferencesManager().getUserObj().hasOwnProperty('CoreCustomers')) {
                    // Logged user contains Businesses/Contracts
                    coreCustomers = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers;
                    coreCustomers = coreCustomers.filter(data => JSON.parse(data.isBusiness))
                    totalSbaBusiness = coreCustomers.length;
                    indexOfBusiness = 0;
                    arrayForSBA = [];
                    if (totalSbaBusiness === 1) {
                        arrayForSBA.push({
                            BackendId: coreCustomers[indexOfBusiness].coreCustomerID || "",
                            sbaEnrolmentStatus: (userAttributes.sbaEnrolmentStatus && JSON.parse(userAttributes.sbaEnrolmentStatus)) || "",
                            Customer_id: userAttributes.customer_id || "",
                            features: applicationManager.getConfigurationManager().getUserFeatures() || [],
                            permissions: applicationManager.getConfigurationManager().getUserPermissions() || []
                        });
                        this.callSbaEnrollmentStatus(coreCustomers[indexOfBusiness].coreCustomerID);
                    }
                } 
            } catch (err) {
                var errorObj = {
                    "method": "getSbaDetails",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :updateSbaEnrolmentStatus
         * Updating the SBA array with enrolment status
         * @arg1 {name} : Response to load data
         * @return : NA
         */
        updateSbaEnrolmentStatus: function (isSbaEnrolmentConfigured, sbaEnrolmentStatus) {
            var scope = this;
            try {
                if (isSbaEnrolmentConfigured) {
                    if (sbaEnrolmentStatus.value.length > 0) {
                        // Enrolment started/completed
                        let enrolmentValue = sbaEnrolmentStatus.value[0];
                        arrayForSBA[indexOfBusiness]["enrolmentStatus"] = {
                            EnrollmentState: enrolmentValue.EnrollmentState.trim(),
                            eventDateTime: enrolmentValue.EventDateTime,
                            EventMinutesAgo: enrolmentValue.EventMinutesAgo,
                        };
                    } else {
                        // Enrolement not started or revoked
                        arrayForSBA[indexOfBusiness].enrolmentStatus = "";
                    }
                } else {
                    arrayForSBA[indexOfBusiness].enrolmentStatus = "";
                }
                applicationManager.setSbaJourney(arrayForSBA);
                this.enableSbaFunctionality(arrayForSBA[0].BackendId);
            } catch (err) {
                var errorObj = {
                    "method": "updateSbaEnrolmentStatus",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : enableSbaFunctionality
         * Enables SBA functionality
         * @arg1 {coreCustomerId} : coreCustomerId to get SBA details
         * @return : NA
         */
        enableSbaFunctionality: function (coreCustomerId) {
            var scope = this;
            try {
                let sbaJourneyObj = applicationManager.getSbaJourney();
                sbaJourneyObj.map(business => {
                    if (business.featuresAndPermissions.SBA_XAI_DASHBOARD || business.featuresAndPermissions.SBA_AID) {
                        if (business.BackendId == coreCustomerId) {
                            applicationManager.setSelectedSbaBusiness(business);
                            selectedBusiness = applicationManager.getSelectedSbaBusiness();
                            // business.enrolmentStatus = '';
                            // TODO: Remove above line
                            scope.hideSbaUI();
                            if ((business.hasOwnProperty("enrolmentStatus") || business.hasOwnProperty("sbaEnrolmentStatus")) && !(business.sbaEnrolmentStatus == '' && business.enrolmentStatus == '')) {
                                isLive = business.sbaEnrolmentStatus && business.sbaEnrolmentStatus.hasOwnProperty("isLive") ? JSON.parse(business.sbaEnrolmentStatus.isLive) : true;
                                //for single business case, getStatus returning empty array[]. so handling especially for that
                                if (isSingleBusinessView && (kony.sdk.isArray(business.enrolmentStatus) && business.sbaEnrolmentStatus.status === sbaEnrolmentStatuses.ENABLED)) {
                                    delete business.enrolmentStatus;
                                }
                                if ((isLive || kony.sdk.isNullOrUndefined(isLive)) && business.hasOwnProperty("enrolmentStatus")) {
                                    // getEnrolmentStatus/getStatus is enabled
                                    if (business.enrolmentStatus == '') {
                                        // Business is not enrolled to SBA (Fresh User)
                                        scope.view.flxSba.setVisibility(true);
                                        if (business.sbaEnrolmentStatus.status !== sbaEnrolmentStatuses.ENABLED) {
                                            // Business is revoked from SBA
                                            scope.hideSbaUI();
                                        }
                                    } else if (business.enrolmentStatus.EnrollmentState == SBA_ENROL_STATUS.SBA_PENDING_AUTH || business.enrolmentStatus.EnrollmentState == SBA_ENROL_STATUS.SBA_ILP_STARTED) {
                                        if (business.enrolmentStatus.EnrollmentState == SBA_ENROL_STATUS.SBA_ILP_STARTED && business.enrolmentStatus.EventMinutesAgo > scope_configManager.sbaEventMinutesAgo.ILP_StartedEventMinutesAgo) {
                                            // 60 min after ILP_Started
                                            scope.renderApologiesTile(business);
                                        } else {
                                            // ConnectionStatus_PendingAuth  Logged into accounting SW but not received the success response
                                            // ILP_Started - Logged in with accounting SW but waiting for response from AC SW
                                            scope.pendingAuthOrIlpStartedTile();
                                        }
                                    } else if (business.enrolmentStatus.EnrollmentState == SBA_ENROL_STATUS.SBA_ILP_COMPLETE) {
                                        if (business.enrolmentStatus.EventMinutesAgo < scope_configManager.sbaEventMinutesAgo.ILP_CompleteEventMinutesAgo) {
                                            // Logged in with accounting SW and got response from AC SW but waiting for analytics response
                                            scope.view.flxSbaAnalysing.setVisibility(true);
                                            scope.callSbaChartAndHealthScore(business);
                                        } else if (business.enrolmentStatus.EventMinutesAgo >= scope_configManager.sbaEventMinutesAgo.ILP_CompleteEventMinutesAgo) {
                                            // ILP_Complete with more than or equal to 360 min waiting time
                                            scope.ilpCompleteAfterTimeout(business);
                                        }
                                    } else if (business.enrolmentStatus.EnrollmentState == SBA_ENROL_STATUS.SBA_DEAUTHORIZED) {
                                        scope.renderApologiesTile(business);
                                    }
                                } else {
                                    // getEnrolmentStatus/getStatus is disabled
                                    let sbaEnrolmentStatus = business.sbaEnrolmentStatus.status;
                                    if (business.sbaEnrolmentStatus.hasOwnProperty('eventDateTime')) {
                                        // Getting minutes difference between two times
                                        const now = new Date();
                                        let currentTime = new Date(now.toISOString());
                                        let eventDateTime = new Date(business.sbaEnrolmentStatus.eventDateTime);
                                        business.sbaEnrolmentStatus['EventMinutesAgo'] = Math.round((currentTime - eventDateTime) / (1000 * 60));
                                    }
                                    if (sbaEnrolmentStatus == sbaEnrolmentStatuses.ENABLED) {
                                        scope.view.flxSba.setVisibility(true);
                                        //second condition in order to check we are in live flow with revoked status.since we are not getting enrolmentStatus object
                                    } else if (sbaEnrolmentStatus == sbaEnrolmentStatuses.REVOKED || (isLive && (sbaEnrolmentStatus == sbaEnrolmentStatuses.COMPLETED || sbaEnrolmentStatus === sbaEnrolmentStatuses.INPROGRESS) && (!business.hasOwnProperty("enrolmentStatus")))) {
                                        scope.hideSbaUI();
                                    } else if (sbaEnrolmentStatus == sbaEnrolmentStatuses.RETRY || sbaEnrolmentStatus == sbaEnrolmentStatuses.CANCELED) {
                                        scope.renderSbaRetryTile(business);
                                    } else if (sbaEnrolmentStatus == SBA_ENROL_STATUS.SBA_PENDING_AUTH || sbaEnrolmentStatus == SBA_ENROL_STATUS.SBA_ILP_STARTED) {
                                        if (sbaEnrolmentStatus == SBA_ENROL_STATUS.SBA_ILP_STARTED && business.sbaEnrolmentStatus.EventMinutesAgo > scope_configManager.sbaEventMinutesAgo.ILP_StartedEventMinutesAgo) {
                                            // 60 min after ILP_Started
                                            scope.renderApologiesTile(business);
                                        } else {
                                            // ConnectionStatus_PendingAuth  Logged into accounting SW but not received the success response
                                            // ILP_Started - Logged in with accounting SW but waiting for response from AC SW
                                            scope.pendingAuthOrIlpStartedTile();
                                        }
                                    } else if (sbaEnrolmentStatus == SBA_ENROL_STATUS.SBA_ILP_COMPLETE || sbaEnrolmentStatus == sbaEnrolmentStatuses.COMPLETED) {
                                        if (business.sbaEnrolmentStatus.EventMinutesAgo < scope_configManager.sbaEventMinutesAgo.ILP_CompleteEventMinutesAgo) {
                                            // Logged in with accounting SW and got response from AC SW but waiting for analytics response (Within 360 min)
                                            scope.view.flxSbaAnalysing.setVisibility(true);
                                        } else if (business.sbaEnrolmentStatus.EventMinutesAgo >= scope_configManager.sbaEventMinutesAgo.ILP_CompleteEventMinutesAgo || sbaEnrolmentStatus == sbaEnrolmentStatuses.COMPLETED) {
                                            // ILP_Complete with more than or equal to 360 min waiting time
                                            scope.ilpCompleteAfterTimeout(business);
                                        }
                                    } else if (sbaEnrolmentStatus == SBA_ENROL_STATUS.SBA_DEAUTHORIZED) {
                                        scope.renderApologiesTile(business);
                                    }
                                }
                            } else {
                                scope.view.flxSba.setVisibility(true);
                            }
                        }
                    }
                });
            } catch (err) {
                var errorObj = {
                    "method": "enableSbaFunctionality",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : hideSbaUI
         * Hide/show the SBA UI
         * @return : NA
         */
        hideSbaUI: function () {
            var scope = this;
            try {
                scope.view.flxSba.setVisibility(false);
                scope.view.flxSbaAnalysing.setVisibility(false);
                scope.view.flxSbaMainCashFlowGraph.setVisibility(false);
                scope.view.flxSbaBusinessHealthScore.setVisibility(false);
                scope.view.flxSbaInsights.setVisibility(false);
                scope.view.flxAccProviderStatus.setVisibility(false);
                scope.view.flxServiceError.setVisibility(false);
            } catch (err) {
                var errorObj = {
                    "method": "hideSbaUI",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : renderSbaRetryTile
         * Showing retry tile
         * @return : NA
         */
        renderSbaRetryTile: function(business) {
            var scope = this;
            try {
                // 360 min after ILP_Complete
                scope.hideSbaUI();
                if (business && business.sbaEnrolmentStatus.status === sbaEnrolmentStatuses.CANCELED) {
                    scope.view.flxAccProviderStatus.setVisibility(false);
                } else {
                scope.view.lblAccProviderClose.setVisibility(true);
                scope.view.btnAccProvider.setVisibility(true);
                scope.view.flxAccProviderFailed.setVisibility(true);
                scope.view.flxAccProviderInprogress.setVisibility(false);
                scope.view.lblAccProviderConnection.text = kony.i18n.getLocalizedString("i18n.SBAdvisory.ILP_Complete");
                scope.view.btnAccProvider.text = kony.i18n.getLocalizedString('i18n.qrpayments.Retry');
                scope.view.flxAccProviderStatus.setVisibility(true);
                }
                scope.updateHamburger();
            } catch (err) {
                var errorObj = {
                    "method": "renderSbaRetryTile",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : updateSbaJourneyStatus
         * Update the application's SbaJourney
         * @arg1 {statusToUpdate} : Status of the business
         * @return : NA
         */
        updateSbaJourneyStatus: function (statusToUpdate) {
            var scope = this;
            try {
                let tempSbaJourney = applicationManager.getSbaJourney();
                const now = new Date();
                let isoString = now.toISOString();
                tempSbaJourney.map((business, index) => {
                    if (business.BackendId == selectedBusiness.BackendId) {
                        tempSbaJourney[index].sbaEnrolmentStatus.status = statusToUpdate;
                        tempSbaJourney[index].sbaEnrolmentStatus.eventDateTime = isoString;
                    }
                });
                applicationManager.setSbaJourney(tempSbaJourney);
            } catch (err) {
                var errorObj = {
                    "method": "updateSbaJourneyStatus",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : updateSbaStatus
         * Updating with appropriate status
         * @arg1 {statusToUpdate} : Status of the business
         * @return : NA
         */
        updateSbaStatus: function (statusToUpdate) {
            var scope = this;
            try {
                let tempSbaEnrolmentStatus;
                if (statusToUpdate === sbaEnrolmentStatuses.COMPLETED && !isLive) {
                    tempSbaEnrolmentStatus = {
                        status: statusToUpdate,
                        eventDateTime: selectedBusiness.sbaEnrolmentStatus.eventDateTime,
                        isLive: isLive
                    };
                } else {
                    const now = new Date();
                    let isoString = now.toISOString();
                    tempSbaEnrolmentStatus = {
                        status: statusToUpdate,
                        eventDateTime: isoString
                    };
                }
                tempSbaEnrolmentStatus = JSON.stringify(tempSbaEnrolmentStatus);
                let payload = {
                    customerId: selectedBusiness.Customer_id,
                    sbaEnrolmentStatus: tempSbaEnrolmentStatus,
                }
                this.presenter.presentationController.updateSBAStatus(payload, scope.view.id);
            } catch (err) {
                var errorObj = {
                    "method": "updateSbaStatus",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : toggleSbaFeatures
         * Toggling SBA features based on features & permissions
         * @return : NA
         */
        toggleSbaFeatures: function () {
            var scope = this;
            try {
                if (selectedBusiness.featuresAndPermissions.SBA_INSIGHTS) {
                    scope.view.flxSbaInsights.setVisibility(true);
                }
                
            } catch (err) {
                var errorObj = {
                    "method": "toggleSbaFeatures",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : renderApologiesTile
         * Rendering Apologies Tile
         * @return : NA
         */
        renderApologiesTile: function(business) {
            var scope = this;
            try {
                if (business.sbaEnrolmentStatus.status === sbaEnrolmentStatuses.CANCELED) {
                    scope.view.flxAccProviderStatus.setVisibility(false);
                } else {
                scope.view.lblAccProviderClose.setVisibility(true);
                scope.view.btnAccProvider.setVisibility(true);
                scope.view.btnAccProvider.text = kony.i18n.getLocalizedString('i18n.SBAdvisory.enrol');
                scope.view.flxAccProviderFailed.setVisibility(true);
                scope.view.flxAccProviderStatus.setVisibility(true);
                scope.view.flxAccProviderInprogress.setVisibility(false);
                scope.view.lblAccProviderConnection.text = kony.i18n.getLocalizedString("i18n.SBAdvisory.ILP_Started");
                }
            } catch (err) {
                var errorObj = {
                    "method": "renderApologiesTile",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : pendingAuthOrIlpStartedTile
         * render UI for pendingAuth Or IlpStarted
         * @return : NA
         */
        pendingAuthOrIlpStartedTile: function () {
            var scope = this;
            try {
                scope.view.lblAccProviderClose.setVisibility(false);
                scope.view.btnAccProvider.setVisibility(false);
                scope.view.flxAccProviderFailed.setVisibility(false);
                scope.view.flxAccProviderStatus.setVisibility(true);
                scope.view.flxAccProviderInprogress.setVisibility(true);
                scope.view.lblAccProviderConnection.text = kony.i18n.getLocalizedString("i18n.SBAdvisory.connectionInprogress");
            } catch (err) {
                var errorObj = {
                    "method": "pendingAuthOrIlpStartedTile",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : ilpCompleteAfterTimeout
         * ILP complete after timeout logic
         * @arg1 {business} : Selected business
         * @return : NA
         */
        ilpCompleteAfterTimeout: function (business) {
            var scope = this;
            try {
                if (business.sbaEnrolmentStatus.status != sbaEnrolmentStatuses.COMPLETED && business.sbaEnrolmentStatus.status != sbaEnrolmentStatuses.CANCELED) {
                    callFromIlpCompleteRetry = true;
                    scope.view.flxSbaAnalysing.setVisibility(true);
                } 
                if (business.sbaEnrolmentStatus.status != sbaEnrolmentStatuses.RETRY && business.sbaEnrolmentStatus.status != sbaEnrolmentStatuses.CANCELED) {
                    scope.callSbaChartAndHealthScore(business);
                } else {
                    scope.renderSbaRetryTile(business);
                }
            } catch (err) {
                var errorObj = {
                    "method": "ilpCompleteAfterTimeout",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : ilpCompleteAfterTimeoutHamburger
         * ILP complete after timeout logic for hamburger
         * @arg1 {business} : Selected business
         * @return : NA
         */
        ilpCompleteAfterTimeoutHamburger: function (business, index) {
            var scope = this;
            try {
                if (business.sbaEnrolmentStatus.status != sbaEnrolmentStatuses.COMPLETED && business.sbaEnrolmentStatus.status != sbaEnrolmentStatuses.CANCELED) {
                    // Analyzing tile
                    applicationManager.sbaJourney[index].hamburgerMenu.enrol = false;
                    applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                }
                if (business.sbaEnrolmentStatus.status != sbaEnrolmentStatuses.RETRY && business.sbaEnrolmentStatus.status != sbaEnrolmentStatuses.CANCELED) {
                    scope.updateHamburgerForChartAndHealthScore(business, index);
                } else {
                    // Retry
                    applicationManager.sbaJourney[index].hamburgerMenu.enrol = true;
                    applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = false;
                }
            } catch (err) {
                var errorObj = {
                    "method": "ilpCompleteAfterTimeoutHamburger",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : callSbaEnrollmentStatus
         * this function responsible for making service call to get SBA Enrollment status
         * @arg1 {feature} : 
         * @return : NA
         */
        callSbaEnrollmentStatus: function(coreCustomerID) {
            var scope = this;
            try {
                let payload = {
                    subscriber: coreCustomerID || "",
                }
                scope.presenter.presentationController.getSbaEnrolmentStatus(payload, scope.view.id);
            } catch (err) {
                var errorObj = {
                    "method": "callSbaEnrollmentStatus",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : callSbaChartAndHealthScore
         * this function responsible for making service call for SBA charts and business health score
         * @arg1 {business}: defines business to be updated
         * @return : NA
         */
        callSbaChartAndHealthScore: function (business) {
            var scope = this;
            try {
                var param = {
                    subscriber: business.BackendId
                };
                if (business.featuresAndPermissions.SBA_XAI_DASHBOARD) {
                    scope.presenter.presentationController.getCashFlow(param, scope.view.id);
                }
                if (business.featuresAndPermissions.SBA_BUSINESS_HEALTH_SCORE) {
                    scope.presenter.presentationController.getHealthScore(param, scope.view.id);
                }
            } catch (err) {
                var errorObj = {
                    "method": "callSbaChartAndHealthScore",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : updateHamburgerForChartAndHealthScore
         * this function responsible for updating hamburger based on SBA charts and business health score
         * @arg1 {business, index} : defines business to updated ,at particular position
         * @return : NA
         */        
        updateHamburgerForChartAndHealthScore: function (business, index) {
            var scope = this;
            try {
                if (business.featuresAndPermissions.SBA_XAI_DASHBOARD && business.sbaEnrolmentStatus.status != sbaEnrolmentStatuses.COMPLETED) {
                } else if (business.sbaEnrolmentStatus.status === sbaEnrolmentStatuses.COMPLETED) {
                    applicationManager.sbaJourney[index].hamburgerMenu.enrol = false;
                    applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = true;
                }
                if (business.featuresAndPermissions.SBA_BUSINESS_HEALTH_SCORE && business.sbaEnrolmentStatus.status != sbaEnrolmentStatuses.COMPLETED) {
                } else if (business.sbaEnrolmentStatus.status === sbaEnrolmentStatuses.COMPLETED) {
                    applicationManager.sbaJourney[index].hamburgerMenu.enrol = false;
                    applicationManager.sbaJourney[index].hamburgerMenu.cashFlow = true;
                }
            } catch (err) {
                var errorObj = {
                    "method": "updateHamburgerForChartAndHealthScore",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setHamburgerConfig
         * this function responsible for setting finalized consolidated hamburger changes
         * @arg1 {} : 
         * @return : NA
         */
        setHamburgerConfig: function () {
            var scope = this;
            try {
                let sbaJourney = applicationManager.getSbaJourney();
                let sbaHamburgerConfig = applicationManager.getConfigurationManager().isSBAVisible;
                sbaJourney.map(business => {
                    if (business.hasOwnProperty("hamburgerMenu")) {
                        if (business.hamburgerMenu.hasOwnProperty("sba")) {
                            // Displaying SBA main option
                            sbaHamburgerConfig.sba = isSingleBusinessView ? business.hamburgerMenu.sba : business.hamburgerMenu.sba || sbaHamburgerConfig.sba
                        }
                        if (business.hamburgerMenu.hasOwnProperty("enrol")) {
                            // Displaying Enrol option under SBA
                            sbaHamburgerConfig.enrol = isSingleBusinessView ? business.hamburgerMenu.enrol : business.hamburgerMenu.enrol || sbaHamburgerConfig.enrol
                        }
                        if (business.hamburgerMenu.hasOwnProperty("cashFlow")) {
                            // Displaying Enrol option under SBA
                            if (business.featuresAndPermissions.SBA_XAI_DASHBOARD) {
                                sbaHamburgerConfig.cashFlow = isSingleBusinessView ? business.hamburgerMenu.cashFlow : business.hamburgerMenu.cashFlow || sbaHamburgerConfig.cashFlow
                            }
                        }
                        if ((business.sbaEnrolmentStatus && business.sbaEnrolmentStatus.status === sbaEnrolmentStatuses.COMPLETED) && business.featuresAndPermissions.SBA_RECEVIABLES_VIEW) {
                            sbaHamburgerConfig.receivables = isSingleBusinessView ? business.featuresAndPermissions.SBA_RECEVIABLES_VIEW : business.featuresAndPermissions.SBA_RECEVIABLES_VIEW || sbaHamburgerConfig.receivables
                        }
                        if ((business.sbaEnrolmentStatus && business.sbaEnrolmentStatus.status === sbaEnrolmentStatuses.COMPLETED) && business.featuresAndPermissions.SBA_PAYABLES_VIEW) {
                            sbaHamburgerConfig.payables = isSingleBusinessView ? business.featuresAndPermissions.SBA_PAYABLES_VIEW : business.featuresAndPermissions.SBA_PAYABLES_VIEW || sbaHamburgerConfig.payables
                        }
                        //If any one of the previous business hamburger options is false,we are hiding. else we are showing sba options
                        if (!(business.hamburgerMenu.enrol || sbaHamburgerConfig.enrol) && !(business.hamburgerMenu.cashFlow || sbaHamburgerConfig.cashFlow) && !(business.hamburgerMenu.receivables || sbaHamburgerConfig.receivables) && !(business.hamburgerMenu.payables || sbaHamburgerConfig.payables)) {
                            sbaHamburgerConfig.sba = false;
                        }
                    }
                });
                applicationManager.getConfigurationManager().isSBAVisible = sbaHamburgerConfig;
                let customHamburger = this.view.customheader.customhamburger;
                customHamburger.generateMenu();
            } catch (err) {
                var errorObj = {
                    "method": "setHamburgerConfig",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : getSbaBusiness
         * this function resposible for executing selected business from filter dropdown
         * @arg1 {} :
         * @return : NA
         */
        getSbaBusiness: function () {
            var scope = this;
            try {
                sbaFeaturesDetails.forEach((business) => {
                    if (business.BackendId === selectedSegData.membershipId) {
                        scope.enableSbaFunctionality(business.BackendId);
                    }
                });
            } catch (err) {
                var errorObj = {
                    "method": "getSbaBusiness",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * @api : storeSBAPermissions
         * this function resposible for storing business related permissions
         * @arg1 {} : 
         * @return : NA
         */
        storeSBAPermissions: function(businesses, mainFeature) {
            var scope = this;
            try {
                var businesses = applicationManager.getSbaJourney();
                businesses.forEach((business) => {
                    business['featuresAndPermissions'] = {
                        [SBA_FEATURES.SBA_XAI_DASHBOARD]: business.permissions.includes(SBA_FEATURES.CASHFLOW_PREDICTION_CHART_VIEW) || false,
                        [SBA_FEATURES.SBA_BUSINESS_HEALTH_SCORE]: business.permissions.includes(SBA_FEATURES.SBA_BUSINESS_HEALTH_SCORE_VIEW) || false,
                        [SBA_FEATURES.SBA_INSIGHTS]: business.permissions.includes(SBA_FEATURES.SBA_INSIGHTS_VIEW) || false,
                        [SBA_FEATURES.SBA_AID]: (business.permissions.includes(SBA_FEATURES.SBA_PAYABLES_VIEW) || business.permissions.includes(SBA_FEATURES.SBA_RECEVIABLES_VIEW)) || false,
                        [SBA_FEATURES.SBA_PAYABLES_VIEW]: business.permissions.includes(SBA_FEATURES.SBA_PAYABLES_VIEW) || false,
                        [SBA_FEATURES.SBA_RECEVIABLES_VIEW]: business.permissions.includes(SBA_FEATURES.SBA_RECEVIABLES_VIEW) || false,
                        [SBA_FEATURES.SBA_SIMULATION]: business.permissions.includes(SBA_FEATURES.SBA_SIMULATION_VIEW) || false
                    }
                });
            } catch (err) {
                var errorObj = {
                    "method": "storeSBAPermissions",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        onError: function(err) {
            var errMsg = JSON.stringify(err);
            errMsg.level = "frmConnectAccount1";
            // kony.ui.Alert(errMsg);
        },
        onNavigate:function(){
            var scope = this;
            var context = {
                "parentScope": scope,
                "entitlements": [],
                "links": [{
                    "entitlement": ["UNIFIED_TRANSFER"],
                    "accountTypes": ["ALL"],
                    "fontIconText": "\ue985",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.common.TransferFunds"),
                    "linkAction": "navigateToTransferScreen",
                    "visible": applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA"),
                },
                {
                    "entitlement": ["P2P"],
                    "accountTypes": ["ALL"],
                    "fontIconText": "\ue96e",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.payments.payAPerson"),
                    "linkAction": "navigateToP2PScreen",
                    "visible": applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA"),
                },
                {
                    "entitlement": ["BILL_PAY"],
                    "accountTypes": ["ALL"],
                    "fontIconText": "\ue97c",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.hamburger.payABill"),
                    "linkAction": "navigateToBillPayScreen",
                    "visible": applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA"),
                }
            ]
        };
        context['entitlements'] = applicationManager.getConfigurationManager().features ? applicationManager.getConfigurationManager().features : [];
        this.view.quickLinksNew.setContext(context);
        },
        navigateToTransferScreen: function() {
            applicationManager.getModulesPresentationController({
                            "appName": "TransfersMA",
                            "moduleName": "TransferEurUIModule"
                        }).showTransferScreen({
                            context: "MakePayment"
                        });
        },
        navigateToBillPayScreen: function() {
            var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "BillPayMA", "moduleName" : "BillPaymentUIModule"});
            billPayModule.presentationController.showBillPaymentScreen({
                context: "MakeOneTimePayment"
            });
        },
        navigateToP2PScreen: function() {
            // var p2pModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "TransfersMA", "moduleName" : "PayAPersonModule"});
            // p2pModule.presentationController.showPayAPerson("sendMoneyTab");
            var navMan = applicationManager.getNavigationManager();
            var data = applicationManager.getUserPreferencesManager().getUserObj();
            navMan.navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "frmUTFLanding"
            }, false, data);
        },
        hideQuickLniks:function(){
            this.view.quickLinksNew.setVisibility(false);
        }
    };
});