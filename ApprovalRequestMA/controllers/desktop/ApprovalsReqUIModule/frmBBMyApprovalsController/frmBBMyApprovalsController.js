define(['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    return {

        /** Global Variables **/
        ApprovalsReqModule: null,
        defaultTab: kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions"),
        forms: {
            userDetails: "frmUserManagementDetails",
            ApprovalViewDetails: "frmApprovalViewDetails"
        },
        dashboardSortParams: {},
        fetchParams: {},
        filterParams: {},
        activeTab: null,

        /**
         * updateFormUI : Will be called by the navigate method, when current form is to be updated
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} uiModel - with 2 values, Key and ResponseData
         * @return {} 
         * @throws {}
         */
        updateFormUI: function(uiModel) {
            if (uiModel) {
                switch (uiModel.key) {
                    case BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS:
                        this.onTabClick({
                            text: kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions")
                        });
                        break;
                    case BBConstants.FETCH_ACH_TRANSACTIONS_PENDING_APPROVALS:
                        this.onTabClick({
                            text: kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions")
                        });
                        break;
                    case BBConstants.FETCH_ACH_FILES_PENDING_APPROVALS:
                        this.onTabClick({
                            text: kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles")
                        });
                        break;
                    case BBConstants.DASHBOARD_DEFAULT_TAB:
                        this.setUpDefaultView();
                        break;
                    case BBConstants.MYAPPROVALS_TRANSACTIONS:
                        this.view.TabPaneNew.TabsHeaderNew.focusTab(1);
                        this.setupTransactionsView(uiModel.responseData);
                        break;
                    case BBConstants.MYAPPROVALS_ACH_TRANSACTIONS:
                        this.view.TabPaneNew.TabsHeaderNew.focusTab(2);
                        this.setupACHTransactionsView(uiModel.responseData);
                        break;
                    case BBConstants.MYAPPROVALS_ACH_FILES:
                        this.view.TabPaneNew.TabsHeaderNew.focusTab(3);
                        this.setupACHFilesView(uiModel.responseData);
                        break;
                    case BBConstants.MYAPPROVALS_BULK_PAYMENTS:
                        this.view.TabPaneNew.TabsHeaderNew.focusTab(4);
                        this.onTabClick({
                            text: kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader")
                        });
                        break;
                    case BBConstants.LOADING_INDICATOR:
                        FormControllerUtility.showProgressBar(this.view);
                        break;
                    case BBConstants.SERVICE_ERROR:
                        this.showDownTimeMessage(uiModel.responseData);
                        break;
                }
            }
            if (uiModel.campaignRes) {
                this.campaignSuccess(uiModel.campaignRes);
            }
            if (uiModel.campaignError) {
                this.view.dbRightContainerNew.flxBannerWrapper.setVisibility(false);
                if (!kony.sdk.isNullOrUndefined(this.view.flxBannerContainerDesktop)) {
                    this.view.flxBannerContainerDesktop.setVisibility(false);
                }
                if (!kony.sdk.isNullOrUndefined(this.view.flxBannerContainerMobile)) {
                    this.view.flxBannerContainerMobile.setVisibility(false);
                }
            }
            if (uiModel.fetchApprovalsForBulkPay) {
                this.setupBulkPaymentsView(uiModel.fetchApprovalsForBulkPay);
            }
            if (uiModel.progressBar === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (uiModel.progressBar === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },


        /**
         * onInit : This needs to be invoked on onInit action of this form
         * @member of {frmBBMyApprovalsController}
         * @param {}
         * @return {} 
         * @throws {}
         */
        onInit: function() {
            this.ApprovalsReqModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        },


        /**
         * onPreShow : This needs to be invoked on onPreshow action of this form
         * @member of {frmBBMyApprovalsController}
         * @param {} 
         * @return {} 
         * @throws {}
         */
        onPreShow: function() {
            var scopeObj = this;
            this.setPermissionBasedView();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['customheader', 'flxContentContainer', 'flxFooter', 'flxHeaderMain', 'flxMain','flxFormContent']);

            /* hamburger and top menu settings */
            this.view.flxContentContainer.setVisibility(true);
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.customheader.topmenu.btnHamburger.skin = "btnHamburgerskn";
            this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
            this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
            this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
            this.view.customheader.forceCloseHamburger();
            this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals");
            this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));

            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };

            this.view.TabPaneNew.TabsHeaderNew.btnTab1.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.toolTip = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onKeyUp = this.hideOrShowCloseIcon.bind(this);
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.toolTip = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.onClick = this.onTabClick;

            this.view.TabPaneNew.TabsHeaderNew.btnTab2.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
            this.view.TabPaneNew.TabsHeaderNew.btnTab2.toolTip = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
            this.view.TabPaneNew.TabsHeaderNew.btnTab2.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPaneNew.TabsHeaderNew.btnTab2.onClick = this.onTabClick;

            this.view.TabPaneNew.TabsHeaderNew.btnTab3.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");
            this.view.TabPaneNew.TabsHeaderNew.btnTab3.toolTip = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");
            this.view.TabPaneNew.TabsHeaderNew.btnTab3.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPaneNew.TabsHeaderNew.btnTab3.onClick = this.onTabClick;

            this.view.TabPaneNew.TabsHeaderNew.btnTab4.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentsApprovalsFeaturePermissionsList());
            this.view.TabPaneNew.TabsHeaderNew.btnTab4.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader");
            this.view.TabPaneNew.TabsHeaderNew.btnTab4.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader");
            this.view.TabPaneNew.TabsHeaderNew.btnTab4.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPaneNew.TabsHeaderNew.btnTab4.onClick = this.onTabClick;

            this.view.TabPaneNew.TabsHeaderNew.btnTab5.isVisible = false;
            this.view.TabPaneNew.TabsHeaderNew.btnTab6.isVisible = false;

            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point === 640 || orientationHandler.isMobile) {
                this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxempty";
                this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowMobileTemplate";
            } else {
                this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxACHMyApprovalsHeader";
                this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowTemplate";
            }

            var onSegReload = function() {
                scopeObj.view.forceLayout();
                scopeObj.adjustScreen(50);
            };
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
            this.view.TabPaneNew.TabBodyNew.setSegmentReloadAction(onSegReload);
            this.setupRightContainer();
            this.initializeDashboardSortParams();
            this.initializeFetchParams();
            this.initializeFilterParams();
            this.view.flxPopupConfirmation.isVisible = false;

            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.onClick = function() {
                if (this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible) {
                    this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin = true;
                }
            }.bind(this);
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.onClick = function() {
                this.setDropdownVisiblility();
            }.bind(this);
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.onRowClick = function() {
                this.segViewTypesRowClick(this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.selectedRowItems[0].lblViewTypeName.text);
            }.bind(this);
        },

        setDropdownVisiblility: function() {
            if (this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin) {
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin = false;
                return;
            }
            if (!this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible) {
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.clipBounds = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.clipBounds = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = true;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setVisibility(true);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.setVisibility(true);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxdownarrow.png";
            } else {
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setVisibility(false);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
            }
        },

        segViewTypesRowClick: function(lblvalue) {
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = lblvalue;
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
            if (lblvalue !== kony.i18n.getLocalizedString("i18n.konybb.Common.All")) {
                if (lblvalue == kony.i18n.getLocalizedString("i18n.konybb.Common.PaymentsOnly")) {
                    this.fetchParams.filterByParam = "transactionTypeName";
                    this.fetchParams.filterByValue = "Payment";
                }
                if (lblvalue == kony.i18n.getLocalizedString("i18n.konybb.Common.CollectionsOnly")) {
                    this.fetchParams.filterByParam = "transactionTypeName";
                    this.fetchParams.filterByValue = "Collection";
                }
                this.filterParams.ACHTransactions = this.fetchParams.filterByValue + "," + this.fetchParams.filterByParam;

            } else {
                this.fetchParams.filterByParam = "";
                this.fetchParams.filterByValue = "";
            }
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
            this.invokeFetchACHTransactions();
        },

        initializeDashboardSortParams: function() {
            this.dashboardSortParams = {
                "Transactions": {
                    "Date": ViewConstants.IMAGES.SORTING_NEXT,
                    "TransactionType": ViewConstants.IMAGES.SORTING_NEXT,
                    "AccountType": ViewConstants.IMAGES.SORTING_NEXT
                },
                "ACHTransactions": {
                    "Date": ViewConstants.IMAGES.SORTING_NEXT,
                    "Amount": ViewConstants.IMAGES.SORTING_NEXT,
                    "TemplateTypeName": ViewConstants.IMAGES.SORTING_NEXT
                },
                "ACHFiles": {
                    "DebitAmount": ViewConstants.IMAGES.SORTING_NEXT,
                    "CreditAmount": ViewConstants.IMAGES.SORTING_NEXT,
                    "FileStatus": ViewConstants.IMAGES.SORTING_NEXT
                },
                "bulkPayments": {
                    "Description": ViewConstants.IMAGES.SORTING_NEXT,
                    "Date": ViewConstants.IMAGES.SORTING_NEXT,
                    "InitiatedBy": ViewConstants.IMAGES.SORTING_NEXT
                }
            };
        },

        initializeFetchParams: function() {
            this.fetchParams = {
                "searchString": "",
                "sortByParam": "",
                "sortOrder": "",
                "pageSize": "",
                "pageOffset": "",
                "filterByTransactionType": "",
                "filterByStatus": "",
                "filterByParam": "",
                "filterByValue": ""
            };
        },

        initializeFilterParams: function() {
            this.filterParams = {
                "ACHTransactions": ".",
                "ACHFiles": ".",
            };
        },

        updateFetchParams: function(sortParam, sortOrder) {
            this.fetchParams.searchString = CommonUtilities.validateSearchString(this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text);
            if (!kony.sdk.isNullOrUndefined(sortParam))
                this.fetchParams.sortByParam = sortParam;
            if (!kony.sdk.isNullOrUndefined(sortOrder))
                this.fetchParams.sortOrder = sortOrder;
            this.fetchParams.pageSize = this.view.TabPaneNew.PaginationContainer.getPageSize() + 1;
            this.fetchParams.pageOffset = this.view.TabPaneNew.PaginationContainer.getPageOffset();
            if (this.activeTab === BBConstants.ACH_TRANSACTIONS)
                this.fetchParams.filterByTransactionType = (this.filterParams.ACHTransactions === ".") ? "" : this.filterParams.ACHTransactions;
            else if (this.activeTab === BBConstants.ACH_FILES)
                this.fetchParams.filterByStatus = (this.filterParams.ACHFiles === ".") ? "" : this.filterParams.ACHFiles;
        },

        /**
         * setPermissionBasedView : Fetch permissions from Configuration manager and set the view based on permissions
         * @member of {frmBBMyRequestsController}
         * @param {} 
         * @return {} 
         * @throws {}
         */
        setPermissionBasedView: function() {
            if (applicationManager.getConfigurationManager().isRequestTransactionEnabled() || applicationManager.getConfigurationManager().isRequestACHEnabled()) {
                this.view.dbRightContainerNew.flxActions.setVisibility(true);
            } else {
                this.view.dbRightContainerNew.flxActions.setVisibility(false);
            }

            this.view.TabPaneNew.TabsHeaderNew.btnTab1.isVisible = this.checkAtLeastOnePermission(
                applicationManager.getConfigurationManager().getGeneralTransactionApprovalFeaturePermissionsList()
            );
            this.view.TabPaneNew.TabsHeaderNew.btnTab2.isVisible = this.checkAtLeastOnePermission(
                applicationManager.getConfigurationManager().getACHTransactionApprovalsFeaturePermissionsList()
            );
            this.view.TabPaneNew.TabsHeaderNew.btnTab3.isVisible = this.checkAtLeastOnePermission(
                applicationManager.getConfigurationManager().getACHFileApprovalsFeaturePermissionsList()
            );

        },


        /**
         * setupRightContainer : method to show right container with appropriate actions buttons
         * @member of {frmBBMyApprovalsController}
         * @param {} 
         * @return {} 
         * @throws {}
         */
        setupRightContainer: function() {
            var scopeObj = this;
            this.view.dbRightContainerNew.lblActionHeader.setVisibility(false);
            this.view.dbRightContainerNew.flxActionHeaderSeperator.setVisibility(false);
            this.view.dbRightContainerNew.lblActionHeader.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.ApproveTransaction");

            this.view.dbRightContainerNew.btnAction1.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getRequestsFeaturePermissionsList());
            this.view.dbRightContainerNew.btnAction1.text = kony.i18n.getLocalizedString("i18n.konybb.Common.MyRequests");
            this.view.dbRightContainerNew.btnAction1.onClick = function() {
                scopeObj.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBBMyRequests", BBConstants.DASHBOARD_DEFAULT_TAB);
            };

            //       	this.view.dbRightContainerNew.flxAction2.isVisible=this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentsApprovalsFeaturePermissionsList()) ;
            this.view.dbRightContainerNew.flxAction2.isVisible = false;
            this.view.dbRightContainerNew.btnAction2.text = kony.i18n.getLocalizedString("i18n.konybb.Common.approvalHistory");
            this.view.dbRightContainerNew.btnAction2.onClick = function() {
                scopeObj.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBBApprovalHistory", BBConstants.DASHBOARD_DEFAULT_TAB);
            };

            //       	this.view.dbRightContainerNew.flxAction3.isVisible=this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentRequestPermissionsList()) ;
            this.view.dbRightContainerNew.flxAction3.isVisible = false;
            this.view.dbRightContainerNew.btnAction3.text = kony.i18n.getLocalizedString("i18n.konybb.Common.requestHistory");
            this.view.dbRightContainerNew.btnAction3.onClick = function() {
                scopeObj.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBBRequestHistory", BBConstants.DASHBOARD_DEFAULT_TAB);
            };
            this.setRightContainerUI();
        },

        setRightContainerUI: function() {
            this.view.dbRightContainerNew.flxActionHeaderSeperator.setVisibility(false);
            this.view.dbRightContainerNew.lblActionHeader.setVisibility(false);
            if (this.view.dbRightContainerNew.btnAction1.isVisible === true && this.view.dbRightContainerNew.btnAction2.isVisible === true) {
                this.view.dbRightContainerNew.flxActionSeperator.isVisible = true;
            } else {
                this.view.dbRightContainerNew.flxActionSeperator.isVisible = false;
            }
            if (this.view.dbRightContainerNew.btnAction3.isVisible === true && (this.view.dbRightContainerNew.btnAction2.isVisible === true || this.view.dbRightContainerNew.btnAction1.isVisible === true)) {
                this.view.dbRightContainerNew.flxACtionSeperator2.isVisible = true;
            } else {
                this.view.dbRightContainerNew.flxACtionSeperator2.isVisible = false;
            }
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },

        /**
         * setUpDefaultView : to setup the data of the default Tab View on loading the Dashboard
         * @member of {frmBBMyApprovalsController}
         * @param {}
         * @return {} 
         * @throws {}
         */
        setUpDefaultView: function() {

            if (this.checkAtLeastOnePermission(
                    applicationManager.getConfigurationManager().getGeneralTransactionApprovalFeaturePermissionsList()
                )) {
                this.defaultTab = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
            } else if (this.checkAtLeastOnePermission(
                    applicationManager.getConfigurationManager().getACHTransactionApprovalsFeaturePermissionsList()
                )) {
                this.defaultTab = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
            } else if (this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getACHFileApprovalsFeaturePermissionsList())) {
                this.defaultTab = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");
            }

            this.onTabClick({
                text: this.defaultTab
            });
            this.view.forceLayout();
            this.adjustScreen(50);
        },

        fetchGeneralTransactionApprovals: function(sortParam, sortOrder) {
            this.updateFetchParams(sortParam, sortOrder);
            var navObj = {
                requestData: this.fetchParams,
                onSuccess: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.MYAPPROVALS_TRANSACTIONS,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            this.ApprovalsReqModule.presentationController.getGeneralTransactionsPendingForMyApprovals(navObj);
        },

        fetchACHTransactionApprovals: function(sortParam, sortOrder) {
            this.updateFetchParams(sortParam, sortOrder);
            var navObj = {
                requestData: this.fetchParams,
                onSuccess: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.MYAPPROVALS_ACH_TRANSACTIONS,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            this.ApprovalsReqModule.presentationController.getACHTransactionsPendingForMyApprovals(navObj);
        },

        fetchACHFileApprovals: function(sortParam, sortOrder) {
            this.updateFetchParams(sortParam, sortOrder);
            var navObj = {
                requestData: this.fetchParams,
                onSuccess: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.MYAPPROVALS_ACH_FILES,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            this.ApprovalsReqModule.presentationController.getACHFilesPendingForMyApprovals(navObj);
        },

        invokeFetchGeneralTransactions: function() {
            this.updateFetchParams();
            this.setPaginationComponentForGeneralTransactions();
            this.fetchGeneralTransactionApprovals("scheduledDate", "DESC");
        },

        invokeFetchACHTransactions: function() {
            this.updateFetchParams();
            this.setPaginationComponentForACHTransactions();
            this.fetchACHTransactionApprovals("createdts", "DESC");
        },

        invokeFetchACHFiles: function() {
            this.updateFetchParams();
            this.setPaginationComponentForACHFiles();
            this.fetchACHFileApprovals();
        },

        invokeFetchBulkPayments: function() {
            this.updateFetchParams();
            this.setPaginationComponentForBulkPaymentsView();
            this.fetchBulkPaymentApprovals();
        },

        /**
         * onTabClick : to be executed on every tab click based on tab name.
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} eventobject - Event object details of a Button 
         * @return {} 
         * @throws {}
         */
        onTabClick: function(eventobject) {
            var scopeObj = this;

            if (kony.sdk.isNullOrUndefined(eventobject)) return;
            if (kony.sdk.isNullOrUndefined(eventobject.text)) return;

            this.initializeFetchParams();
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
            this.view.TabPaneNew.TabsHeaderNew.clickTab(eventobject);
            if (eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions") || eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.myApproval.TransactionsApproval") || eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.Approvals.TransactionsApproval")) {
                this.activeTab = BBConstants.GENERAL_TRANSACTIONS;
                this.changeHeaderRowTemplates();
                this.invokeFetchGeneralTransactions();
            } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions")) {
                this.activeTab = BBConstants.ACH_TRANSACTIONS;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
                this.changeHeaderRowTemplates();
                this.invokeFetchACHTransactions();
            } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles")) {
                this.activeTab = BBConstants.ACH_FILES;
                this.changeHeaderRowTemplates();
                this.invokeFetchACHFiles();
            } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader")) {
                this.activeTab = BBConstants.BULKPAYMENTS;
                this.changeHeaderRowTemplates();
                this.invokeFetchBulkPayments();
            }
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = false;
                this.view.TabPaneNew.TabSearchBarNew.flxOptions.isVisible = false;
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("konybb.i18n.searchTransactionOrTemplate");
            }
            this.adjustScreen(50);
        },

        /**
        This method is used to set pagination component data for general transactions dashboard
        **/
        setPaginationComponentForGeneralTransactions: function() {
            this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
            this.view.TabPaneNew.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.common.transactions"));
            this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchGeneralTransactionApprovals);
            this.view.TabPaneNew.PaginationContainer.setIntervalHeader();
        },

        /**
        This method is used to set pagination component data for ach transactions dashboard
        **/
        setPaginationComponentForACHTransactions: function() {
            this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
            this.view.TabPaneNew.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions"));
            this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchACHTransactionApprovals);
            this.view.TabPaneNew.PaginationContainer.setIntervalHeader();
        },

        /**
        This method is used to set pagination component data for ach files dashboard
        **/
        setPaginationComponentForACHFiles: function() {
            this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
            this.view.TabPaneNew.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles"));
            this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchACHFileApprovals);
            this.view.TabPaneNew.PaginationContainer.setIntervalHeader();
        },

        /**
         * setupTransactionsView : To create View for Showing General Transactions which are pending for approval
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} generalTransactions - Array of JSONObjects  
         * @return {} 
         * @throws {}
         */
        setupTransactionsView: function(generalTransactions) {
            this.adjustScreen(1000);
            this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = false;
            this.view.TabPaneNew.TabSearchBarNew.flxSearch.width = "95%";
            var break_point = kony.application.getCurrentBreakpoint();
            var SectionData = {
                flxACHFiles: {
                    "isVisible": false
                },
                flxACHTransactions: {
                    "isVisible": true
                },
                flxApprovalHeader: {
                    "isVisible": false
                },
                flxSegBBUserApprovalsHeader: {
                    "isVisible": false
                },
                imgSortDate: this.dashboardSortParams.Transactions.Date,
                imgSortAmount: this.dashboardSortParams.Transactions.AccountType,
                imgSortRequestType: this.dashboardSortParams.Transactions.TransactionType,
                btnDate: kony.i18n.getLocalizedString("i18n.konybb.Common.Date"),
                btnRequestType: kony.i18n.getLocalizedString("i18n.konybb.Common.TransactionType"),
                lblTrAccountType: kony.i18n.getLocalizedString("i18n.billPay.Payee"),
                btnTrAmount: kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),
                lblTrActions: kony.i18n.getLocalizedString("i18n.konybb.Common.Actions"),
                flxDate: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.Transactions.Date;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.Transactions.Date = img;
                        this.fetchGeneralTransactionApprovals("scheduledDate", order);
                    }.bind(this)
                },
                flxRequestType: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.Transactions.TransactionType;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.Transactions.TransactionType = img;
                        this.fetchGeneralTransactionApprovals("featureName", order);
                    }.bind(this)
                },
                flxTrAmount: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.Transactions.AccountType;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.Transactions.AccountType = img;
                        this.fetchGeneralTransactionApprovals("amount", order);
                    }.bind(this)
                }
            };

            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Common.SearchTransPayeeCreatedBy");

            if (break_point === 640 || orientationHandler.isMobile) {
                this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(442);
            } else {
                this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(201);
            }

            this.view.TabPaneNew.setSearchData([
                ["lblTrRequestType", "lblTrAccountType", "lblTrCreatedByValue"]
            ]);
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = this.invokeFetchGeneralTransactions;
            this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.invokeFetchGeneralTransactions();
            }.bind(this);
            this.view.TabPaneNew.TabBodyNew.setSectionData([SectionData]);

            if (generalTransactions.length === 0) {
                /* Data When there are No General Transactions to show */
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.showNoGeneralTransactions();
            } else {
                this.showGeneralTransactions();
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(generalTransactions);
                if (generalTransactions.length === this.view.TabPaneNew.PaginationContainer.getPageSize() + 1) {
                    generalTransactions.pop();
                }
                var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
                applicationManager.getNavigationManager().applyUpdates(this);
                applicationManager.executeAuthorizationFramework(this);
                if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                    //if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
                    for (var i = 0; i <= generalTransactions.length; i++) {
                        try {
                            if (generalTransactions[i].isBusinessAccount !== undefined && generalTransactions[i].isBusinessAccount !== null) {
                                generalTransactions[i].lblFromIcon = accountsModule.presentationController.fetchIsBusinessAccount(generalTransactions[i].isBusinessAccount.text) === "true" ? "r" : "s";
                                generalTransactions[i].lblFromIconRow = accountsModule.presentationController.fetchIsBusinessAccount(generalTransactions[i].isBusinessAccount.text) === "true" ? "r" : "s";
                            }
                        } catch (err) {}
                    }
                    this.view.TabPaneNew.TabBodyNew.addDataForSections([generalTransactions]);
                } else {
                    this.view.TabPaneNew.TabBodyNew.addDataForSections([generalTransactions]);
                }
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(50);
        },

        showGeneralTransactions: function() {
            var scope = this;
            var break_point = kony.application.getCurrentBreakpoint();
            var height;
            if (break_point === 640 || orientationHandler.isMobile) {
                height = "70dp";
            } else {
                height = "51dp";
            }
            var defaultValues = {
                flxMain: {
                    "height": height
                },
                flxMyApprovalsRowHeader: {
                    "skin": "slFboxffffff"
                },
                flxNoRecords: {
                    "isVisible": false
                },
                flxFiles: {
                    "isVisible": false
                },
                flxFileDetails: {
                    "isVisible": false
                },
                flxTransactions: {
                    "isVisible": true
                },
                flxTransactionDetails: {
                    "isVisible": true,
                    "height": (break_point === 640 || orientationHandler.isMobile) ? "300dp" : "150dp"
                },
                flxTopSeperator: {
                    "isVisible": true
                },
                flxUserApprovalDetails: {
                    "isVisible": false
                },
                flxUserApprovalsRowHeader: {
                    "isVisible": false
                },
                flxTrActions: {
                    "onClick": scope.approveTransaction
                },
                btnTrActionsMobile: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myApproval.Approve"),
                    "isVisible": (break_point === 640 || orientationHandler.isMobile) ? true : false,
                    "onClick": scope.approveTransaction
                },
                lblTrStatus: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myApproval.Approve"),
                    "isVisible": (break_point === 640 || orientationHandler.isMobile) ? false : true
                },
                lblCurrSymbol: {
                    "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
                },
                imgDropDown: {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O"
                },
                btnReject: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject"),
                    "onClick": this.showRejectTransactionPopup
                },
                btnViewDetails: {
                    "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                    "onClick": function(eventobject, context) {
                        this.viewDetailsOfSelectedRecord(eventobject, context, BBConstants.GEN_TRANSACTION_VIEW_DETAILS);
                    }.bind(this)
                },
                lblTrTemplateName: {
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.transactionID")
                },
                lblTrCreatedOn: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn"),
                    "isVisible": false
                },
                lblTrCreatedOnValue: {
                    "isVisible": false
                },
                lblTrCreatedBy: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedBy")
                },
                lblTrApprovals: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"),
                    "isVisible": true
                },
                lblRecurrence: {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.lblFrequency")
                },
                lblFrequency: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.DebitAccount")
                },
                lblTransParam: {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.recurrence"),
                    "isVisible": true
                },
                lblDetailsSeperator: {
                    "text": "-",
                    "skin": "sknSeparatore3e3e3"
                },
                lblActionSeperator: {
                    "text": "-",
                    "skin": "sknSeparatore3e3e3"
                },
                lblActionSeperator2: {
                    "text": "-",
                    "skin": "sknSeparatore3e3e3"
                },
                flxBottomSeperator: {
                    "text": "-",
                    "skin": "sknSeparatore3e3e3"
                },
                flxIcon: {
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                    "isVisible": applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false ? true : false,
                },
                flxIconRow: {
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                    "isVisible": applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false ? true : false,
                }
            };

            var rowDataMap = {
                lblDate: "Date",
                lblTrAccountType: "Payee",
                lblTrRequestType: "TransactionType",
                lblTrAmount: "Amount",
                lblTrCreatedOnValue: "CreatedOn",
                lblTrTemplateNameValue: "Transaction_id",
                lblTrCreatedByValue: "userName",
                lblTrApprovalsValue: "Approval",
                lblRecurrenceValue: "Frequency",
                lblFrequencyValue: "DebitAccount",
                lblTransParamValue: "Reccurence",
                lblFromIcon: "lblFromIcon",
                lblFromIconRow: "lblFromIconRow",
                lblTransStatus: "Status"
            };

            this.view.TabPaneNew.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defaultValues]);
        },

        showNoGeneralTransactions: function() {
            var dataMap = {
                lblNoRecords: "lblMsg",
                imgError: "imgError"
            };
            var NODATAFLEXHEIGHT = "450dp";
            var defValues = {
                flxMain: {
                    "height": NODATAFLEXHEIGHT
                },
                flxMyApprovalsRowHeader: {
                    "isVisible": false
                },
                flxMyApprovalsRowDetails: {
                    "isVisible": false
                },
                flxNoRecords: {
                    "isVisible": true
                },
                imgError: {
                    "src": "info_grey.png"
                }
            };
            this.view.TabPaneNew.TabBodyNew.setRowDataMap([dataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defValues]);
            this.view.TabPaneNew.TabBodyNew.addRowsData([
                [{
                    "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.NoTransactions")
                }]
            ]);
        },


        serachGeneralTransactions: function() {
            this.showGeneralTransactions();
            this.view.TabPaneNew.searchAndFilterData();
            if (this.view.TabPaneNew.TabBodyNew.getData()[0][1].length <= 0) {
                this.showNoGeneralTransactions();
            }
        },


        /**
         * setupACHTransactionsView : To create View for Showing ACH Transactions which are pending for approval
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} ACHTransactionData - Array of JSONObjects  
         * @return {} 
         * @throws {}
         */
        setupACHTransactionsView: function(ACHTransactionData) {
            this.adjustScreen(1000);
            var break_point = kony.application.getCurrentBreakpoint();
            this.breakpointChangesACHTransactions(break_point);

            var trSectionData = {
                flxACHFiles: {
                    "isVisible": false
                },
                flxACHTransactions: {
                    "isVisible": true
                },
                flxTransactions: {
                    "isVisible": true
                },
                lblApprovalHeader: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions")
                },
                flxSegBBUserApprovalsHeader: {
                    "isVisible": false
                },
                imgSortDate: this.dashboardSortParams.ACHTransactions.Date,
                imgSortAmount: this.dashboardSortParams.ACHTransactions.Amount,
                imgSortRequestType: this.dashboardSortParams.ACHTransactions.TemplateTypeName,
                btnDate: kony.i18n.getLocalizedString("i18n.konybb.Common.Date"),
                btnRequestType: kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType"),
                lblTrAccountType: kony.i18n.getLocalizedString("i18n.konybb.Common.Debit/CreditAccount"),
                btnTrAmount: kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),
                lblTrActions: kony.i18n.getLocalizedString("i18n.konybb.Common.Actions"),
                flxDate: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ACHTransactions.Date;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.ACHTransactions.Date = img;
                        this.fetchACHTransactionApprovals("createdts", order);
                    }.bind(this)
                },
                flxRequestType: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ACHTransactions.TemplateTypeName;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.ACHTransactions.TemplateTypeName = img;
                        this.fetchACHTransactionApprovals("templateTypeName", order);
                    }.bind(this)
                },
                flxTrAmount: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ACHTransactions.Amount;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.ACHTransactions.Amount = img;
                        this.fetchACHTransactionApprovals("totalAmount", order);
                    }.bind(this)
                }
            };

            if (break_point === 640 || orientationHandler.isMobile) {
                this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(382);
            } else {
                this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(201);
            }

            var searchString = (kony.sdk.isNullOrUndefined(this.fetchParams.searchString)) ? "" : this.fetchParams.searchString;
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = searchString;
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Common.SearchTransactionTemplate");
            this.view.TabPaneNew.setSearchData([
                ["lblTrTemplateNameValue", "lblTrAccountType", "lblTrRequestType", "lblTrCreatedByValue"]
            ]);
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = this.invokeFetchACHTransactions;
            this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.invokeFetchACHTransactions();
            }.bind(this);
            this.view.TabPaneNew.TabBodyNew.setSectionData([trSectionData]);

            if (ACHTransactionData.length === 0) {
                /* Data When there are No ACH Transactions to show */
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.showNoACHTransactions();
            } else {
                this.showACHTranscations();
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(ACHTransactionData);
                if (ACHTransactionData.length === this.view.TabPaneNew.PaginationContainer.getPageSize() + 1) {
                    ACHTransactionData.pop();
                }
                var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
                applicationManager.getNavigationManager().applyUpdates(this);
                applicationManager.executeAuthorizationFramework(this);
                if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                    //if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
                    for (var i = 0; i <= ACHTransactionData.length; i++) {
                        try {
                            if (ACHTransactionData[i].DebitAccount !== undefined && ACHTransactionData[i].DebitAccount !== null) {
                                ACHTransactionData[i].lblFromIcon = accountsModule.presentationController.fetchIsBusinessAccount(ACHTransactionData[i].DebitAccount) === "true" ? "r" : "s";

                            }
                        } catch (err) {}
                    }
                    this.view.TabPaneNew.TabBodyNew.addDataForSections([ACHTransactionData]);
                } else {
                    this.view.TabPaneNew.TabBodyNew.addDataForSections([ACHTransactionData]);
                }
            }

            // 	    this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.masterData = 
            //         [
            //         	[".", kony.i18n.getLocalizedString("i18n.konybb.Common.All")],
            //         	["Payment,transactionTypeName", kony.i18n.getLocalizedString("i18n.konybb.Common.PaymentsOnly")],
            //         	["Collection,transactionTypeName", kony.i18n.getLocalizedString("i18n.konybb.Common.CollectionsOnly")]
            //       	];

            //       this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.selectedKey = this.filterParams.ACHTransactions;
            //       this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.onSelection = function(eventobject) {
            //         var selectedKey = eventobject.selectedKey;
            //         this.filterParams.ACHTransactions = selectedKey;
            //         if(selectedKey !== "."){
            //           var params = eventobject.selectedKey.split(",")
            //           this.fetchParams.filterByValue = params.splice(0,params.length/2).toString();
            //           this.fetchParams.filterByParam = params.toString();
            //         }
            //         else{
            //           this.fetchParams.filterByParam = "";
            //           this.fetchParams.filterByValue = "";
            //         }
            //         this.invokeFetchACHTransactions();
            //       }.bind(this);


            var obj_arr = [];
            obj_arr = [{
                "flxSeparator": {
                    "isVisible": false
                },
                "lblViewTypeName": {
                    text: kony.i18n.getLocalizedString("i18n.konybb.Common.All"),
                }
            }, {
                "flxSeparator": {
                    "isVisible": false
                },
                "lblViewTypeName": {
                    text: kony.i18n.getLocalizedString("i18n.konybb.Common.PaymentsOnly"),
                }
            }, {
                "flxSeparator": {
                    "isVisible": false
                },
                "lblViewTypeName": {
                    text: kony.i18n.getLocalizedString("i18n.konybb.Common.CollectionsOnly"),
                }
            }];
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setData(obj_arr);

            this.breakpointChangesACHTransactions(break_point);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(50);
        },

        serachACHTransactions: function() {
            this.showACHTranscations();
            this.view.TabPaneNew.searchAndFilterData();
            if (this.view.TabPaneNew.TabBodyNew.getData()[0][1].length <= 0) {
                this.showNoACHTransactions();
            }
        },

        updatePaginationContainerUI: function(responseData) {
            var isMaxLimitReached = responseData.length <= BBConstants.PAGE_SIZE;
            this.view.TabPaneNew.PaginationContainer.setIsMaxLimitReached(isMaxLimitReached);
            this.view.TabPaneNew.PaginationContainer.updateUI();
        },

        showACHTranscations: function() {
            var scope = this;
            var break_point = kony.application.getCurrentBreakpoint();
            var height;
            if (break_point === 640 || orientationHandler.isMobile) {
                height = "70dp";
            } else {
                height = "51dp";
            }
            var trDefaultValues = {
                flxMain: {
                    "height": height
                },
                flxMyApprovalsRowHeader: {
                    "skin": "slFboxffffff"
                },
                flxNoRecords: {
                    "isVisible": false
                },
                flxFiles: {
                    "isVisible": false
                },
                flxFileDetails: {
                    "isVisible": false
                },
                flxTransactions: {
                    "isVisible": true
                },
                flxIcon: {
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                    "isVisible": applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false ? true : false,
                },
                flxIconRow: {
                    "isVisible": false
                },
                flxTransactionDetails: {
                    "isVisible": true,
                    "height": (break_point === 640 || orientationHandler.isMobile) ? "240dp" : "150dp"
                },
                flxTopSeperator: {
                    "isVisible": true
                },
                flxUserApprovalDetails: {
                    "isVisible": false
                },
                flxUserApprovalsRowHeader: {
                    "isVisible": false
                },
                flxTrActions: {
                    "onClick": scope.approveACHTransaction
                },
                btnTrActionsMobile: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myApproval.Approve"),
                    "isVisible": (break_point === 640 || orientationHandler.isMobile) ? true : false,
                    "onClick": scope.approveACHTransaction
                },
                lblTrStatus: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myApproval.Approve"),
                    "isVisible": (break_point === 640 || orientationHandler.isMobile) ? false : true
                },
                lblCurrSymbol: {
                    "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
                },
                imgDropDown: {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O"
                },
                btnReject: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject"),
                    "onClick": this.showRejectACHTransactionPopup
                },
                btnViewDetails: {
                    "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                    "onClick": function(eventobject, context) {
                        this.viewDetailsOfSelectedRecord(eventobject, context, BBConstants.ACH_TRANSACTION_VIEW_DETAILS);
                    }.bind(this)
                },
                lblTrTemplateName: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.common.templateName")
                },
                lblTrCreatedOn: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn")
                },
                lblTrCreatedBy: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedBy")
                },
                lblTrApprovals: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"),
                    "isVisible": true
                },
                lblDetailsSeperator: {
                    "text": "-",
                    "skin": "sknSeparatore3e3e3"
                },
                lblActionSeperator: {
                    "text": "-",
                    "skin": "sknSeparatore3e3e3"
                },
                lblActionSeperator2: {
                    "text": "-",
                    "skin": "sknSeparatore3e3e3"
                },
                flxBottomSeperator: {
                    "text": "-",
                    "skin": "sknSeparatore3e3e3"
                }
            };
            var rowDataMap = {
                lblDate: "TransmittedDate",
                lblTrAccountType: "DebitOrCreditAccount",
                lblTrRequestType: "RequestType",
                lblTrAmount: "Amount",
                lblTrCreatedOnValue: "CreatedOn",
                lblTrTemplateNameValue: "TemplateName",
                lblTrCreatedByValue: "CreatedBy",
                lblTrApprovalsValue: "Approval",
                lblFromIcon: "lblFromIcon",
                lblTransStatus: "Status"
            };

            this.view.TabPaneNew.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([trDefaultValues]);

        },

        showNoACHTransactions: function() {
            var dataMap = {
                lblNoRecords: "lblMsg",
                imgError: "imgError"
            };
            var NODATAFLEXHEIGHT = "450dp";
            var defValues = {
                flxMain: {
                    "height": NODATAFLEXHEIGHT
                },
                flxMyApprovalsRowHeader: {
                    "isVisible": false
                },
                flxMyApprovalsRowDetails: {
                    "isVisible": false
                },
                flxNoRecords: {
                    "isVisible": true
                },
                imgError: {
                    "src": "info_grey.png"
                }
            };
            this.view.TabPaneNew.TabBodyNew.setRowDataMap([dataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defValues]);
            this.view.TabPaneNew.TabBodyNew.addRowsData([
                [{
                    "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.NoACHTransactions")
                }]
            ]);
        },


        /**
         * breakpointChangesACHTransactions : method to setup the view based on break point values
         * @member of {frmBBMyRequestsController}
         * @param { integer } break_point : break_point value 
         * @return {} 
         * @throws {}
         */
        breakpointChangesACHTransactions: function(break_point) {
            if (break_point === 640 || orientationHandler.isMobile) {
                this.view.TabPaneNew.TabSearchBarNew.flxSearch.width = "94%";
                this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = false;
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.common.searchTransactionOrTemplate");
            } else {
                this.view.TabPaneNew.TabSearchBarNew.flxSearch.width = "66%";
                this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = true;
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Common.SearchTransactionTemplate");
            }
            this.view.forceLayout();
        },

        /**
         * Method to check whether the user typed anything in the search bar and making the UI compatible according to the actions of the user
         */
        hideOrShowCloseIcon: function() {
            if (this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text.trim() === "") {
                this.view.TabPaneNew.TabSearchBarNew.imgClear.setVisibility(false);
            } else {
                this.view.TabPaneNew.TabSearchBarNew.imgClear.setVisibility(true);
            }
            this.view.TabPaneNew.TabSearchBarNew.forceLayout();
        },


        /**
         * setupACHFilesView : To create View for Showing ACH Files which are pending for approval
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} ACHFilesData - Array of JSONObjects  
         * @return {} 
         * @throws {}
         */
        setupACHFilesView: function(ACHFilesData) {
            this.adjustScreen(1000);
            this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = false;
            this.view.TabPaneNew.TabSearchBarNew.flxSearch.width = "95%";
            var break_point = kony.application.getCurrentBreakpoint();
            var sectionData = {
                flxACHFiles: {
                    "isVisible": true
                },
                flxACHTransactions: {
                    "isVisible": false
                },
                flxSegBBUserApprovalsHeader: {
                    "isVisible": false
                },
                imgTotalDebitAmount: this.dashboardSortParams.ACHFiles.DebitAmount,
                imgTotalCreditAmount: this.dashboardSortParams.ACHFiles.CreditAmount,
                lblFileName: kony.i18n.getLocalizedString("i18n.konybb.Common.FileName"),
                btnTotalDebitAmount: kony.i18n.getLocalizedString("i18n.konybb.Common.TotalDebitAmt"),
                btnTotalCreditAmount: kony.i18n.getLocalizedString("i18n.konybb.Common.TotalCreditAmt"),
                lblFileActions: kony.i18n.getLocalizedString("i18n.konybb.Common.Actions"),
                flxTotalDebitAmount: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ACHFiles.DebitAmount;
                        img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                        var order = (img === "sorting_next.png") ? "DESC" : "ASC";
                        this.dashboardSortParams.ACHFiles.DebitAmount = img;
                        this.fetchACHFileApprovals("debitAmount", order);
                    }.bind(this)
                },
                flxTotalCreditAmount: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ACHFiles.CreditAmount;
                        img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                        var order = (img === "sorting_next.png") ? "DESC" : "ASC";
                        this.dashboardSortParams.ACHFiles.CreditAmount = img;
                        this.fetchACHFileApprovals("creditAmount", order);
                    }.bind(this)
                }
            };

            if (break_point === 640 || orientationHandler.isMobile) {
                this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(442);
            } else {
                this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(201);
            }

            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;;
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Common.SearchByFIleName");
            this.view.TabPaneNew.setSearchData([
                ["lblFileName"]
            ]);
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = this.invokeFetchACHFiles;
            this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.invokeFetchACHFiles();
            }.bind(this);
            this.view.TabPaneNew.TabBodyNew.setSectionData([sectionData]);

            if (ACHFilesData.length === 0) {
                /* Data When there are No ACH Files to show */
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.showNoACHFiles();
            } else {
                this.showACHFiles();
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(ACHFilesData);
                if (ACHFilesData.length === this.view.TabPaneNew.PaginationContainer.getPageSize() + 1) {
                    ACHFilesData.pop();
                }
                this.view.TabPaneNew.TabBodyNew.addDataForSections([ACHFilesData]);
            }

            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(50);
        },

        serachACHFiles: function() {
            this.showACHFiles();
            this.view.TabPaneNew.searchAndFilterData();
            if (this.view.TabPaneNew.TabBodyNew.getData()[0][1].length <= 0) {
                this.showNoACHFiles()
            }
        },

        showACHFiles: function() {

            var break_point = kony.application.getCurrentBreakpoint();
            var height;
            if (break_point === 640 || orientationHandler.isMobile) {
                height = "70dp";
            } else {
                height = "51dp";
            }

            var defaultValues = {
                flxMain: {
                    "height": height
                },
                flxMyApprovalsRowHeader: {
                    "skin": "slFboxffffff"
                },
                flxNoRecords: {
                    "isVisible": false
                },
                flxFiles: {
                    "isVisible": true
                },
                flxFileDetails: {
                    "isVisible": true,
                    "height": (break_point === 640 || orientationHandler.isMobile) ? "300dp" : "150dp"
                },
                flxTopSeperator: {
                    "isVisible": true
                },
                flxTransactions: {
                    "isVisible": false
                },
                flxTransactionDetails: {
                    "isVisible": false
                },
                flxUserApprovalDetails: {
                    "isVisible": false
                },
                flxUserApprovalsRowHeader: {
                    "isVisible": false
                },
                lblCurSym: {
                    "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
                },
                lblFileStatus: {
                    "isVisible": false
                },
                lblCurrSym: {
                    "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
                },
                imgDropDown: {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O"
                },
                btnFileActions: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myApproval.Approve"),
                    "onClick": this.approveACHFile
                },
                btnReject: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject"),
                    "onClick": this.showRejectACHFilePopup
                },
                btnViewDetails: {
                    "text": (break_point === 640 || orientationHandler.isMobile) ? kony.i18n.getLocalizedString("i18n.konybb.myApproval.Approve") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                    "onClick": function(eventobject, context) {
                        if (break_point === 640 || orientationHandler.isMobile)
                            this.approveACHFile(eventobject, context);
                        else
                            this.viewDetailsOfSelectedRecord(eventobject, context, BBConstants.ACH_FILE_VIEW_DETAILS);
                    }.bind(this)
                },
                lblUpdatedDateAndTime: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Files.UploadDateTime")
                },
                lblNumberOfDebits: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Files.NumbOfDebits")
                },
                lblNumberOfCredits: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Files.NumbOfCredits")
                },
                lblUploadedBy: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Files.UploadedBy")
                },
                lblCompanyID: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Files.CompanyID")
                },
                lblFileRequestType: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType")
                },
                lblNumberOfPrenotes: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"),
                    "isVisible": true
                },
                lblTdebitAmount: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.TotalDebitAmt")
                },
                lblTcreditAmount: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.TotalCreditAmt")
                },
                lblDetailsSeperator: {
                    "text": "-",
                    "skin": "sknSeparatore3e3e3"
                },
                lblActionSeperator: {
                    "text": "-",
                    "skin": "sknSeparatore3e3e3"
                }
            };

            var rowDataMap = {
                lblFileName: "FileName",
                lblUpdatedDateAndTimeValue: "UpdatedDateAndTime",
                lblNumberOfDebitsValue: "NumberOfDebits",
                lblNumberOfCreditsValue: "NumberOfCredits",
                lblCompanyIDValue: "CompanyID",
                lblFileRequestTypeValue: "FileRequestType",
                lblUploadedByValue: "userName",
                lblNumberOfPrenotesValue: "Approver",
                lblTdebitAmount: kony.i18n.getLocalizedString("i18n.konybb.Common.TotalDebitAmt"),
                lblTcreditAmount: kony.i18n.getLocalizedString("i18n.konybb.Common.TotalCreditAmt"),
                lblTotalCreditAmount: "TotalCreditAmount",
                lblTotalDebitAmount: "TotalDebitAmount"
            };

            this.view.TabPaneNew.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defaultValues]);
        },

        showNoACHFiles: function() {
            var dataMap = {
                lblNoRecords: "lblMsg"
            };
            var NODATAFLEXHEIGHT = "450dp";
            var defValues = {
                flxMain: {
                    "height": NODATAFLEXHEIGHT
                },
                flxMyApprovalsRowHeader: {
                    "isVisible": false
                },
                flxMyApprovalsRowDetails: {
                    "isVisible": false
                },
                flxNoRecords: {
                    "isVisible": true
                }
            };
            this.view.TabPaneNew.TabBodyNew.setRowDataMap([dataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defValues]);
            this.view.TabPaneNew.TabBodyNew.addRowsData([
                [{
                    "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.NoACHFiles")
                }]
            ]);
        },


        /**
         * approveTransaction : onClick of Approve a General Transaction
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} eventObject - button object 
         * @param {JSON Object} context - Selected segment Row Data  
         * @return {} 
         * @throws {}
         */
        approveTransaction: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            var TransactionId = selectedRowData["Request_id"];
            var scopeObj = this;
            var params = {
                "Request_id": TransactionId,
                "Comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),
                "Action": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved")
            };
            FormControllerUtility.showProgressBar(this.view);
            var navObj = {
                requestData: params,
                onSuccess: {
                    form: this.forms.ApprovalViewDetails,
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.APPROVED_TRANSACTION_ACK,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            scopeObj.ApprovalsReqModule.presentationController.approveBBGeneralTransactions(navObj);
        },


        /**
         * showRejectTransactionPopup : onClick of Reject a General Transaction
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} eventObject - button object 
         * @param {JSON Object} context - Selected segment Row Data  
         * @return {} 
         * @throws {}
         */
        showRejectTransactionPopup: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            var Request_id = selectedRowData["Request_id"];

            var popupConfig = {};

            popupConfig.header = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
            popupConfig.msg = kony.i18n.getLocalizedString("i18n.konybb.myApproval.RejectTransConfirm");
            popupConfig.commentsVisibility = true;
            popupConfig.commentsText = "";
            popupConfig.nextText = kony.i18n.getLocalizedString("i18n.common.yes");
            popupConfig.cancelText = kony.i18n.getLocalizedString("i18n.common.no");
            popupConfig.nextOnClick = this.rejectTransaction.bind(this, Request_id);

            this.showPopup(popupConfig);
            FormControllerUtility.scrollToTop();
        },


        /**
         * rejectTransaction : onClick of Yes in Pop-up for Reject a General Transaction.
         * @member of {frmBBMyApprovalsController}
         * @param {string} Request_id - Request_id of General Transaction to Reject
         * @return {} 
         * @throws {}
         */
        rejectTransaction: function(Request_id) {
            var Comments = this.view.flxPopupNew.trComments.text;
            var req = {
                "Request_id": Request_id,
                "Action": kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected"),
                "Comments": Comments
            };
            this.hidePopup();
            FormControllerUtility.showProgressBar(this.view);
            var navObj = {
                requestData: req,
                onSuccess: {
                    form: this.forms.ApprovalViewDetails,
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.REJECTED_TRANSACTION_ACK,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            this.ApprovalsReqModule.presentationController.rejectBBGeneralTransactions(navObj);
        },


        /**
         * approveACHTransaction : approve the selected ACH Transacton - presentation call
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} eventobject - Event object details of a 
         * @param {JSON Object} context - selected section details 
         * @return {} 
         * @throws {}
         */
        approveACHTransaction: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            var ACHTransactionId = selectedRowData["Request_id"];
            var scopeObj = this;
            var req = {
                "Request_id": ACHTransactionId,
                "Comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),
                "Action": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved")
            };
            FormControllerUtility.showProgressBar(this.view);
            var navObj = {
                requestData: req,
                onSuccess: {
                    form: this.forms.ApprovalViewDetails,
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.APPROVED_ACH_TRANSACTION_ACK,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            this.ApprovalsReqModule.presentationController.approveACHTransactions(navObj);
        },


        /**
         * showRejectACHTransactionPopup : Show pop-up to confirm Reject ACHTransaction
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} eventobject - Event object details of a 
         * @param {JSON Object} context - selected section details 
         * @return {} 
         * @throws {}
         */
        showRejectACHTransactionPopup: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            var Request_id = selectedRowData["Request_id"];

            var popupConfig = {};

            popupConfig.header = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
            popupConfig.msg = kony.i18n.getLocalizedString("i18n.konybb.myApproval.RejectTransConfirm");
            popupConfig.commentsVisibility = true;
            popupConfig.commentsText = "";
            popupConfig.nextText = kony.i18n.getLocalizedString("i18n.common.yes");
            popupConfig.cancelText = kony.i18n.getLocalizedString("i18n.common.no");
            popupConfig.nextOnClick = this.rejectACHTransaction.bind(this, Request_id);

            this.showPopup(popupConfig);
            FormControllerUtility.scrollToTop();
        },


        /**
         * rejectACHTransaction : Reject the selected ACH Transacton, based on Yes on Pop-up - presentation call
         * @member of {frmBBMyApprovalsController}
         * @param {string} Request_id - ID of the ACH Transaction to be Rejected
         * @return {} 
         * @throws {}
         */
        rejectACHTransaction: function(Request_id) {
            var Comments = this.view.flxPopupNew.trComments.text;
            var req = {
                "Request_id": Request_id,
                "Comments": Comments,
                "Action": kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected")
            };
            this.hidePopup();
            FormControllerUtility.showProgressBar(this.view);
            var navObj = {
                requestData: req,
                onSuccess: {
                    form: this.forms.ApprovalViewDetails,
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.REJECTED_ACH_TRANSACTION_ACK,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            this.ApprovalsReqModule.presentationController.rejectACHTransactions(navObj);
        },


        /**
         * showRejectACHFilePopup : onClick of Reject an ACH File
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} eventObject - button object 
         * @param {JSON Object} context - Selected segment Row Data  
         * @return {} 
         * @throws {}
         */
        showRejectACHFilePopup: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            var Request_id = selectedRowData["Request_id"];
            var popupConfig = {};

            popupConfig.header = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");
            popupConfig.msg = kony.i18n.getLocalizedString("i18n.konybb.myApproval.RejectFileConfirm");
            popupConfig.commentsVisibility = true;
            popupConfig.commentsText = "";
            popupConfig.nextText = kony.i18n.getLocalizedString("i18n.common.yes");
            popupConfig.cancelText = kony.i18n.getLocalizedString("i18n.common.no");
            popupConfig.nextOnClick = this.rejectACHFile.bind(this, Request_id);

            this.showPopup(popupConfig);
        },


        /**
         * rejectACHFile : onClick of Yes, in Reject an ACHFile Pop-up - perform the reject service call
         * @member of {frmBBMyApprovalsController}
         * @param {String} Request_id - ID to delete the ACH File   
         * @return {} 
         * @throws {}
         */
        rejectACHFile: function(Request_id) {
            var Comments = this.view.flxPopupNew.trComments.text;
            var req = {
                "Request_id": Request_id,
                "Comments": Comments,
                "Action": kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected")
            };
            this.hidePopup();
            FormControllerUtility.showProgressBar(this.view);
            var navObj = {
                requestData: req,
                onSuccess: {
                    form: this.forms.ApprovalViewDetails,
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.REJECTED_ACH_FILE_ACK,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            this.ApprovalsReqModule.presentationController.rejectACHFiles(navObj);
        },


        /**
         * approveTransaction : onClick of Approve a General Transaction
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} eventObject - button object 
         * @param {JSON Object} context - Selected segment Row Data  
         * @return {} 
         * @throws {}
         */
        approveACHFile: function(eventobject, context) {
            var scopeObj = this;
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            var Request_id = selectedRowData["Request_id"];
            var req = {
                "Request_id": Request_id,
                "Comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),
                "Action": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved")
            };
            FormControllerUtility.showProgressBar(this.view);
            var navObj = {
                requestData: req,
                onSuccess: {
                    form: this.forms.ApprovalViewDetails,
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.APPROVED_ACH_FILE_ACK,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            scopeObj.ApprovalsReqModule.presentationController.approveACHFiles(navObj);
        },


        /**
         * showDownTimeMessage : This method is called inorder to show error messages related to server
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object } errorData - JSON data of the error details 
         * @return {} 
         * @throws {}
         */
        showDownTimeMessage: function(errorData) {
            this.view.flxContentContainer.setVisibility(false);
            this.view.flxDowntimeWarning.setVisibility(true);
            this.view.lblDowntimeWarning.text = errorData.errorMessage;
            this.view.imgCloseDowntimeWarning.setVisibility(false);
            this.view.flxDowntimeWarning.skin = "sknFFFFFFmodbr3px";
            this.view.lblDowntimeWarning.skin = "bbSknLblFF001FLatoBold15Px";
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(50);
        },


        /**
         * adjustScreen : adjust the screen setting with a new added height
         * @member of {frmBBMyRequestsController}
         * @param { integer } data - extra size to be added to the mainHeight
         * @return {} 
         * @throws {}
         */
        adjustScreen: function(data) {
            this.view.flxFooter.isVisible = true;
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.customheader.info.frame.height + this.view.flxContentContainer.info.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - this.view.flxFooter.info.frame.height;
                if (diff > 0)
                    this.view.flxFooter.top = mainheight + diff + data + "dp";
                else
                    this.view.flxFooter.top = mainheight + data + "dp";
                this.view.forceLayout();
            } else {
                this.view.flxFooter.top = mainheight + data + "dp";
                this.view.forceLayout();
            }
        },


        /**
         * hidePopup : hide the popup screen on UI
         * @member of {frmBBMyRequestsController}
         * @param {} 
         * @return {} 
         * @throws {}
         */
        hidePopup: function() {
            this.view.flxPopupNew.trComments.text = "";
            this.view.flxPopupConfirmation.isVisible = false;
            this.view.forceLayout();
        },


        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmBBMyApprovalsController}
         * @param {integer} width - current browser width
         * @return {} 
         * @throws {}
         */
        onBreakpointChange: function(width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            orientationHandler.onOrientationChange(this.onBreakpointChange);
            var responsiveFonts = new ResponsiveFonts();
            this.view.customheader.onBreakpointChangeComponent(width);
            if (width === 640 || orientationHandler.isMobile) {
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.myapprovals.SearchTransactionOrTemplate");
                this.view.customheader.lblHeaderMobile.isVisible = true;
                this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxempty";
                this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowMobileTemplate";
                this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.skin = "sknlistbxMobile";
                this.view.TabPaneNew.TabSearchBarNew.flxDropDown.skin = "slFbox";
                this.view.TabPaneNew.TabsHeaderNew.skin = "sknFlxscrollffffffShadowCustom";
                this.view.TabPaneNew.TabSearchBarNew.flxBoxSearch.skin = "sknFlxffffffborderradE3E3E3";
                this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = false;
                this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals");
                this.view.TabPaneNew.TabSearchBarNew.skin = "bbsknf8f7f8WithoutBorder";
                responsiveFonts.setMobileFonts();
                var curr = kony.application.getCurrentForm();
                curr.forceLayout();
            } else {
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Common.SearchTransPayeeCreatedBy");
                this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxACHMyApprovalsHeader";
                this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowTemplate";
                this.view.customheader.lblHeaderMobile.isVisible = false;
                this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.skin = "bbSknListBox424242SSP15px";
                this.view.TabPaneNew.TabSearchBarNew.flxDropDown.skin = "skne3e3e3br3pxradius";
                this.view.TabPaneNew.TabsHeaderNew.skin = "slFSbox";
                this.view.TabPaneNew.TabSearchBarNew.flxBoxSearch.skin = "skne3e3e3br3pxradius";
                this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = true;
                this.view.TabPaneNew.TabSearchBarNew.skin = "slFbox";
                responsiveFonts.setDesktopFonts();
                this.view.customheader.lblHeaderMobile.text = " ";
                var curr = kony.application.getCurrentForm();
                curr.forceLayout();
            }
            this.adjustScreen(50);
            this.ApprovalsReqModule.presentationController.getApprovalsReqCampaigns();
        },

        /**
         * viewDetailsOfSelectedRecord : view details of selected record by navigating to frmACHDashboard
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} eventObject - button object 
         * @param {JSON Object} context - Selected segment Row Data
         * @param {JSON Object} transactionType - Transaction type to set value of key in navigation Object
         * @return {} 
         * @throws {}
         */
        viewDetailsOfSelectedRecord: function(eventobject, context, transactionType) {
            var scopeObj = this;
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            FormControllerUtility.showProgressBar(this.view);
            var navObj = {
                requestData: {
                    selectedRowData: selectedRowData,
                    isApprovalData: true,
                    isRequestData: false
                },
                onSuccess: {
                    form: this.forms.ApprovalViewDetails,
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: transactionType,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyApprovals",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            scopeObj.ApprovalsReqModule.presentationController.noServiceNavigate(navObj);
        },

        /**
         * showPopup : show the pop-up screen with the passed pop-up config
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} popupConfig : Object with values for header, message, buttons and actions to the button on the Pop-Up 
         * @return {} 
         * @throws {}
         */
        showPopup: function(popupConfig) {
            this.view.flxPopupConfirmation.height = this.view.customheader.info.frame.height + this.view.flxContentContainer.info.frame.height + this.view.flxFooter.info.frame.height;
            this.view.flxPopupNew.lblHeader.text = popupConfig.header;
            this.view.flxPopupNew.lblPopupMsg.text = popupConfig.msg;
            this.view.flxPopupNew.flxComments.isVisible = popupConfig.commentsVisibility;
            this.view.flxPopupNew.trComments.text = popupConfig.commentsText;
            this.view.flxPopupNew.formActionsNew.btnNext.text = popupConfig.nextText;
            this.view.flxPopupNew.formActionsNew.btnCancel.text = popupConfig.cancelText;
            this.view.flxPopupNew.formActionsNew.btnNext.onClick = popupConfig.nextOnClick;
            this.view.flxPopupNew.formActionsNew.btnCancel.onClick = this.hidePopup;
            this.view.flxPopupNew.flxClose.isVisible = true;
            this.view.flxPopupNew.flxClose.cursorType = "pointer";
            this.view.flxPopupNew.flxClose.onClick = this.hidePopup;
            this.view.flxPopupConfirmation.isVisible = true;
            this.view.flxPopupNew.trComments.onKeyUp = function() {
                if (this.view.flxPopupNew.trComments.text.trim() !== "" && this.view.flxPopupNew.trComments.text !== null) {
                    CommonUtilities.enableButton(this.view.flxPopupNew.formActionsNew.btnNext);
                } else {
                    CommonUtilities.disableButton(this.view.flxPopupNew.formActionsNew.btnNext);
                }
            }.bind(this);
            CommonUtilities.disableButton(this.view.flxPopupNew.formActionsNew.btnNext);
            this.view.forceLayout();
        },

        campaignSuccess: function(data) {
            var CampaignManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('CampaignManagement');
            CampaignManagementModule.presentationController.updateCampaignDetails(data);
            var self = this;
            if (data.length === 0) {

                this.view.dbRightContainerNew.flxBannerWrapper.setVisibility(false);
            } else {
                this.view.dbRightContainerNew.flxBannerWrapper.setVisibility(true);

                this.view.dbRightContainerNew.imgBanner.src = data[0].imageURL;
                this.view.dbRightContainerNew.imgBanner.onTouchStart = function() {
                    CampaignUtility.onClickofInAppCampaign(data[0].destinationURL);
                };
            }

            this.adjustScreen(50);
        },

        changeHeaderRowTemplates: function() {
            var break_point = kony.application.getCurrentBreakpoint();
            if (this.activeTab === BBConstants.BULKPAYMENTS) {
                this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBulkPaymentsViewHeader";
                this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxBulkPaymentsViewRowTemplate";
            } else {
                if (break_point === 640 || orientationHandler.isMobile) {
                    this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxempty";
                    this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowMobileTemplate";
                } else {
                    this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxACHMyApprovalsHeader";
                    this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowTemplate";
                }
            }
        },

        fetchBulkPaymentApprovals: function() {
            this.updateFetchParams();
            this.ApprovalsReqModule.presentationController.fetchPendingBulkPaymentApprovals(this.fetchParams);
        },

        setupBulkPaymentsView: function(response) {
            this.adjustScreen(1000);
            this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = false;
            this.view.TabPaneNew.TabSearchBarNew.flxSearch.width = "95%";
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.common.searchTransactionOrTemplate");
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = this.fetchBulkPaymentApprovals;
            this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.fetchBulkPaymentApprovals();
            }.bind(this);
            this.view.TabPaneNew.setSearchData([
                ["lblOpDescription", "lblOpStatus"]
            ]);


            var sectionData = {
                "flxOngoingPayments": {
                    "isVisible": true
                },
                "flxUploadingFiles": {
                    "isVisible": false
                },
                "flxPaymentHistory": {
                    "isVisible": false
                },
                "btnDescription": {
                    "text": "Description"
                },
                "btnDate": {
                    "text": "Date"
                },
                "btnStatus": {
                    "text": "Initiated By"
                },
                "lblActions": {
                    "text": kony.i18n.getLocalizedString("i18n.wireTransfers.Actions")
                },
                "imgSortDesc": this.dashboardSortParams.bulkPayments.Description,
                "imgDate": this.dashboardSortParams.bulkPayments.Date,
                "imgStatus": this.dashboardSortParams.bulkPayments.InitiatedBy,
                "flxDescription": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.bulkPayments.Description;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.bulkPayments.Description = img;
                        this.updateFetchParams("Description", order);
                        this.fetchBulkPaymentApprovals();
                    }.bind(this)
                },
                "flxDate": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.bulkPayments.Date;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.bulkPayments.Date = img;
                        this.updateFetchParams("Date", order);
                        this.fetchBulkPaymentApprovals();
                    }.bind(this)
                },
                "flxStatus": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.bulkPayments.InitiatedBy;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.bulkPayments.InitiatedBy = img;
                        this.updateFetchParams("InitiatedBy", order);
                        this.fetchBulkPaymentApprovals();
                    }.bind(this)
                }
            };
            var defaultValues = {
                flxMain: {
                    "height": "51dp"
                },
                flxBulkPaymentsViewHeader: {
                    "skin": "slFboxffffff"
                },
                flxNoRecords: {
                    "isVisible": false
                },
                flxBPViewHeader: {
                    "isVisible": true,
                    "skin": "slFboxffffff"
                },
                flxTopSeperator: {
                    "isVisible": true
                },
                flxBottomSeperator: {
                    "isVisible": true
                },
                flxOngoingPaymentsHeader: {
                    "isVisible": true
                },
                flxOngoingPaymentsDetails: {
                    "isVisible": true
                },
                flxUploadingFilesDetails: {
                    "isVisible": false
                },
                flxUploadingFilesHeader: {
                    "isVisible": false
                },
                flxPaymentHistoryHeader: {
                    "isVisible": false
                },
                flxPaymentHistoryDetails: {
                    "isVisible": false
                },
                flxApprove: {
                    "isVisible": false
                },
                flxReject: {
                    "isVisible": false
                },
                imgDropDown: {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O"
                },
                btnOpActions: {
                    "text": "View Payment",
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        this.navigateToviewDetails(eventobject, context);
                    }.bind(this)
                },
                lblOpActions: {
                    "isVisible": false,
                },
                lblOPFromAccount: {
                    "text": "From Account"
                },
                lblOPTotalTransactions: {
                    "text": "Total Transactions"
                },
                lblOPTotalAmount: {
                    "text": "Total Amount"
                },
                lblOPInitiatedBy: {
                    "text": "Status"
                },
                lblOPPaymentID: {
                    "text": "Payment ID"
                },
            };
            var rowDataMap = {
                lblDate: "lblDate",
                lblOpDescription: "lblOpDescription",
                lblOpStatus: "lblOpStatus",
                lblOPFromAccount: "lblOPFromAccount",
                lblOPTotalTransactions: "lblOPTotalTransactions",
                lblOPTotalAmount: "lblOPTotalAmount",
                lblOPInitiatedBy: "lblOPInitiatedBy",
                lblOPPaymentID: "lblOPPaymentID",
                lblOPFromAccountValue: "lblOPFromAccountValue",
                lblOPTotalTransactionsValue: "lblOPTotalTransactionsValue",
                lblOPTotalAmountValue: "lblOPTotalAmountValue",
                lblOPnitiatedByValue: "lblOPnitiatedByValue",
                lblOPPaymentIDValue: "lblOPPaymentIDValue",
            };
            this.view.TabPaneNew.TabBodyNew.setSectionData([sectionData]);
            this.view.TabPaneNew.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defaultValues]);
            if (response.length === 0) {
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.showNoPendingBulkPayments();
            } else {
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(response);
                if (response.length === this.view.TabPaneNew.PaginationContainer.getPageSize() + 1) {
                    response.pop();
                }
                this.view.TabPaneNew.TabBodyNew.addDataForSections([response]);
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(50);
        },

        showNoPendingBulkPayments: function() {
            var dataMap = {
                lblNoRecords: "lblMsg"
            };
            var NODATAFLEXHEIGHT = "450dp";
            var defValues = {
                flxMain: {
                    "height": NODATAFLEXHEIGHT
                },
                flxBPViewHeader: {
                    "isVisible": false
                },
                flxBPTemplateDetails: {
                    "isVisible": false
                },
                flxNoRecords: {
                    "isVisible": true
                }
            };
            this.view.TabPaneNew.TabBodyNew.setRowDataMap([dataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defValues]);
            this.view.TabPaneNew.TabBodyNew.addRowsData([
                [{
                    "lblMsg": "No Pending Approvals"
                }]
            ]);
        },

        setPaginationComponentForBulkPaymentsView: function() {
            this.view.TabPaneNew.PaginationContainer.isVisible = true;
            this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
            this.view.TabPaneNew.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.common.transactions"));
            this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchBulkPaymentApprovals);
            this.view.TabPaneNew.PaginationContainer.setIntervalHeader();
        },

        navigateToviewDetails: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            selectedRowData.isHistoryFlow = false;
            this.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBulkPaymentsReview", BBConstants.APPROVER_VIEW_PAYMENT, selectedRowData);
        },

    };
});