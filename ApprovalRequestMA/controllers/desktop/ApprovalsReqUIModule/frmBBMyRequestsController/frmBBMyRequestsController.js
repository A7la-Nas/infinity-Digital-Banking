define(['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    return {

        /** Global Variables **/

        ApprovalsReqModule: null,
        defaultTab: kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions"),
        forms: {
            ApprovalViewDetails: "frmApprovalViewDetails"
        },
        dashboardSortParams: {},
        fetchParams: {},
        filterParams: {},
        activeTab: null,

        /**
         * updateFormUI : Will be called by the navigate method, when current form is to be updated
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} uiModel - with 2 values, Key and ResponseData
         * @return {} 
         * @throws {}
         */
        updateFormUI: function(uiModel) {
            if (uiModel) {
                switch (uiModel.key) {
                    case BBConstants.FETCH_TRANSACTIONS_REQUESTS:
                        this.onTabClick({
                            text: kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions")
                        });
                        break;
                    case BBConstants.FETCH_ACH_TRANSACTIONS_REQUESTS:
                        this.onTabClick({
                            text: kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions")
                        });
                        break;
                    case BBConstants.FETCH_ACH_FILES_REQUESTS:
                        this.onTabClick({
                            text: kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles")
                        });
                        break;
                    case BBConstants.DASHBOARD_DEFAULT_TAB:
                        this.setUpDefaultView();
                        break;
                    case BBConstants.MYREQUESTS_TRANSACTIONS:
                        this.view.TabPane.TabsHeaderNew.focusTab(1);
                        this.setupTransactionsView(uiModel.responseData);
                        break;
                    case BBConstants.MYREQUESTS_ACH_TRANSACTIONS:
                        this.view.TabPane.TabsHeaderNew.focusTab(2);
                        this.setupACHTransactionsView(uiModel.responseData);
                        break;
                    case BBConstants.MYREQUESTS_ACH_FILES:
                        this.view.TabPane.TabsHeaderNew.focusTab(3);
                        this.setupACHFilesView(uiModel.responseData);
                        break;
                    case BBConstants.MYREQUESTS_BULK_PAYMENTS:
                        this.view.TabPane.TabsHeaderNew.focusTab(4);
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
                this.view.flxBannerContainerDesktop.setVisibility(false);
                this.view.flxBannerContainerMobile.setVisibility(false);
            }
            if (uiModel.fetchRequestsForBulkPay) {
                this.setupBulkPaymentsView(uiModel.fetchRequestsForBulkPay);
            }
            if (uiModel.progressBar === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (uiModel.progressBar === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },


        /**
    	This needs to be invoked on onInit action of this form
    **/
        onInit: function() {
            this.ApprovalsReqModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },

        /**
         * setPermissionBasedView : Fetch permissions from Configuration manager and set the view based on permissions
         * @member of {frmBBMyRequestsController}
         * @param {} 
         * @return {} 
         * @throws {}
         */
        setPermissionBasedView: function() {
            if (applicationManager.getConfigurationManager().isApproveTransactionEnabled() || applicationManager.getConfigurationManager().isApproveACHEnabled()) {
                this.view.dbRightContainer.flxActions.setVisibility(true);
            } else {
                this.view.dbRightContainer.flxActions.setVisibility(false);
            }


            this.view.TabPane.TabsHeaderNew.btnTab1.isVisible = this.checkAtLeastOnePermission(
                applicationManager.getConfigurationManager().getCreateGeneralTransactionPermissionsList()
            );
            this.view.TabPane.TabsHeaderNew.btnTab2.isVisible = this.checkAtLeastOnePermission(
                applicationManager.getConfigurationManager().getCreateACHTransactionPermissionsList()
            );
            this.view.TabPane.TabsHeaderNew.btnTab3.isVisible = this.checkAtLeastOnePermission(
                applicationManager.getConfigurationManager().getUploadACHFilePermissionsList()
            );
        },


        /**
         * onPreShow : This needs to be invoked on onPreshow action of this form
         * @member of {frmBBMyRequestsController}
         * @param {} 
         * @return {} 
         * @throws {}
         */
        onPreShow: function() {
            var scopeObj = this;
            this.setPermissionBasedView();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['customheader', 'flxContentContainer', 'flxFooter', 'flxHeaderMain', 'flxMain','flxFormContent']);
            //hamburger and top menu settings
            this.view.customheader.topmenu.btnHamburger.skin = "btnHamburgerskn";
            this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
            this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
            this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
            this.view.customheader.forceCloseHamburger();

            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
            this.view.TabPane.TabSearchBarNew.tbxSearch.onKeyUp = this.hideOrShowCloseIcon.bind(this);
            this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.MyRequests");
            this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.myRequests.Header"));

            this.view.TabPane.TabsHeaderNew.btnTab1.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
            this.view.TabPane.TabsHeaderNew.btnTab1.toolTip = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
            this.view.TabPane.TabsHeaderNew.btnTab1.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPane.TabsHeaderNew.btnTab1.onClick = this.onTabClick;

            this.view.TabPane.TabsHeaderNew.btnTab2.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
            this.view.TabPane.TabsHeaderNew.btnTab2.toolTip = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
            this.view.TabPane.TabsHeaderNew.btnTab2.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPane.TabsHeaderNew.btnTab2.onClick = this.onTabClick;

            this.view.TabPane.TabsHeaderNew.btnTab3.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");
            this.view.TabPane.TabsHeaderNew.btnTab3.toolTip = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");
            this.view.TabPane.TabsHeaderNew.btnTab3.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPane.TabsHeaderNew.btnTab3.onClick = this.onTabClick;

            this.view.TabPane.TabsHeaderNew.btnTab4.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentRequestPermissionsList());
            this.view.TabPane.TabsHeaderNew.btnTab4.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader");
            this.view.TabPane.TabsHeaderNew.btnTab4.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader");
            this.view.TabPane.TabsHeaderNew.btnTab4.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPane.TabsHeaderNew.btnTab4.onClick = this.onTabClick;


            var onSegReload = function() {
                scopeObj.view.forceLayout();
                scopeObj.adjustScreen(50);
            };

            this.view.TabPane.TabBodyNew.setSegmentReloadAction(onSegReload);
            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point === 640 || orientationHandler.isMobile) {
                this.view.TabPane.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxempty";
                this.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowMobileTemplate";
                this.view.TabPane.TabsHeaderNew.btnTab1.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
                this.view.TabPane.TabsHeaderNew.btnTab2.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction");
                this.view.TabPane.TabsHeaderNew.btnTab3.setVisibility(false);
            } else {
                this.view.TabPane.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxACHMyApprovalsHeader";
                this.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowTemplate";
            }

            this.view.TabPane.TabSearchBarNew.tbxSearch.text = "";
            this.initializeDashboardSortParams();
            this.initializeFetchParams();
            this.initializeFilterParams();

            this.setupRightContainer();
            this.view.flxPopupConfirmation.isVisible = false;
            this.view.flxContentContainer.setVisibility(true);
            this.view.flxDowntimeWarning.setVisibility(false);

            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.onClick = function() {
                if (this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible) {
                    this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin = true;
                }
            }.bind(this);
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.onClick = function() {
                this.setDropdownVisiblility();
            }.bind(this);
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.onRowClick = function() {
                this.segViewTypesRowClick(this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.selectedRowItems[0].lblViewTypeName.text);
            }.bind(this);
        },

        setDropdownVisiblility: function() {
            if (this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin) {
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin = false;
                return;
            }
            if (!this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible) {
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.clipBounds = false;
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.clipBounds = false;
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = true;
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setVisibility(true);
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.setVisibility(true);
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxdownarrow.png";
            } else {
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setVisibility(false);
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
            }
        },

        segViewTypesRowClick: function(lblvalue) {
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = lblvalue;
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
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
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
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
            this.fetchParams.searchString = CommonUtilities.validateSearchString(this.view.TabPane.TabSearchBarNew.tbxSearch.text);
            if (!kony.sdk.isNullOrUndefined(sortParam))
                this.fetchParams.sortByParam = sortParam;
            if (!kony.sdk.isNullOrUndefined(sortOrder))
                this.fetchParams.sortOrder = sortOrder;
            this.fetchParams.pageSize = this.view.TabPane.PaginationContainer.getPageSize() + 1;
            this.fetchParams.pageOffset = this.view.TabPane.PaginationContainer.getPageOffset();
            if (this.activeTab === BBConstants.ACH_TRANSACTIONS)
                this.fetchParams.filterByTransactionType = (this.filterParams.ACHTransactions === ".") ? "" : this.filterParams.ACHTransactions;
            else if (this.activeTab === BBConstants.ACH_FILES)
                this.fetchParams.filterByStatus = (this.filterParams.ACHFiles === ".") ? "" : this.filterParams.ACHFiles;
        },

        /**
         * setupRightContainer : method to show right container with appropriate actions buttons
         * @member of {frmBBMyRequestsController}
         * @param {} 
         * @return {} 
         * @throws {}
         */
        setupRightContainer: function() {
            var scopeObj = this;
            this.view.dbRightContainer.lblActionHeader.setVisibility(false);
            this.view.dbRightContainer.flxActionHeaderSeperator.setVisibility(false);
            this.view.dbRightContainer.lblActionHeader.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.ApproveTransaction");
            this.view.dbRightContainer.btnAction1.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getApprovalsFeaturePermissionsList());
            this.view.dbRightContainer.btnAction1.text = kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals");
            this.view.dbRightContainer.btnAction1.onClick = function() {
                scopeObj.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBBMyApprovals", BBConstants.DASHBOARD_DEFAULT_TAB);
            };
            //             this.view.dbRightContainer.flxAction2.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentsApprovalsFeaturePermissionsList()) ;
            this.view.dbRightContainer.flxAction2.isVisible = false;
            this.view.dbRightContainer.btnAction2.text = kony.i18n.getLocalizedString("i18n.konybb.Common.approvalHistory");
            this.view.dbRightContainer.btnAction2.onClick = function() {
                scopeObj.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBBApprovalHistory", BBConstants.DASHBOARD_DEFAULT_TAB);
            };
            //             this.view.dbRightContainer.flxAction3.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentRequestPermissionsList()) ;
            this.view.dbRightContainer.flxAction3.isVisible = false;
            this.view.dbRightContainer.btnAction3.text = kony.i18n.getLocalizedString("i18n.konybb.Common.requestHistory");
            this.view.dbRightContainer.btnAction3.onClick = function() {
                scopeObj.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBBRequestHistory", BBConstants.DASHBOARD_DEFAULT_TAB);
            };
            this.setRightContainerUI();
        },

        setRightContainerUI: function() {
            this.view.dbRightContainer.flxActionHeaderSeperator.setVisibility(false);
            this.view.dbRightContainer.lblActionHeader.setVisibility(false);
            if (this.view.dbRightContainer.btnAction1.isVisible === true && this.view.dbRightContainer.btnAction2.isVisible === true) {
                this.view.dbRightContainer.flxActionSeperator.isVisible = true;
            } else {
                this.view.dbRightContainer.flxActionSeperator.isVisible = false;
            }
            if (this.view.dbRightContainer.btnAction3.isVisible === true && (this.view.dbRightContainer.btnAction2.isVisible === true || this.view.dbRightContainer.btnAction1.isVisible === true)) {
                this.view.dbRightContainer.flxACtionSeperator2.isVisible = true;
            } else {
                this.view.dbRightContainer.flxACtionSeperator2.isVisible = false;
            }
        },

        /**
         * setUpDefaultView : to setup the data of the default Tab View on loading the Dashboard
         * @member of {frmBBMyApprovalsController}
         * @param {}
         * @return {} 
         * @throws {}
         */
        setUpDefaultView: function() {

            if (this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getCreateGeneralTransactionPermissionsList())) {
                this.defaultTab = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
            } else if (this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getCreateACHTransactionPermissionsList())) {
                this.defaultTab = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
            } else if (this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getUploadACHFilePermissionsList())) {
                this.defaultTab = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");
            }

            this.onTabClick({
                text: this.defaultTab
            });
            this.view.forceLayout();
            this.adjustScreen(50);
        },

        fetchGeneralTransactionRequests: function(sortParam, sortOrder) {
            this.updateFetchParams(sortParam, sortOrder);
            var navObj = {
                requestData: this.fetchParams,
                onSuccess: {
                    form: "frmBBMyRequests",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.MYREQUESTS_TRANSACTIONS,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyRequests",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            this.ApprovalsReqModule.presentationController.fetchTransactionRequests(navObj);
        },

        fetchACHTransactionRequests: function(sortParam, sortOrder) {
            this.updateFetchParams(sortParam, sortOrder);
            var navObj = {
                requestData: this.fetchParams,
                onSuccess: {
                    form: "frmBBMyRequests",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.MYREQUESTS_ACH_TRANSACTIONS,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyRequests",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            this.ApprovalsReqModule.presentationController.fetchACHTransactionRequests(navObj);
        },

        fetchACHFileRequests: function(sortParam, sortOrder) {
            this.updateFetchParams(sortParam, sortOrder);
            var navObj = {
                requestData: this.fetchParams,
                onSuccess: {
                    form: "frmBBMyRequests",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.MYREQUESTS_ACH_FILES,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyRequests",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            this.ApprovalsReqModule.presentationController.fetchACHFileRequests(navObj);
        },

        invokeFetchGeneralTransactions: function() {
            this.updateFetchParams();
            this.setPaginationComponentForGeneralTransactions();
            this.fetchGeneralTransactionRequests("scheduledDate", "DESC");
        },

        invokeFetchACHTransactions: function() {
            this.updateFetchParams();
            this.setPaginationComponentForACHTransactions();
            this.fetchACHTransactionRequests("createdts", "DESC");
        },

        invokeFetchACHFiles: function() {
            this.updateFetchParams();
            this.setPaginationComponentForACHFiles();
            this.fetchACHFileRequests();
        },

        invokeFetchBulkPayments: function() {
            this.updateFetchParams();
            this.setPaginationComponentForBulkPaymentsView();
            this.fetchBulkPaymentRequests();
        },

        /**
         * onTabClick : to be executed on every tab click based on tab name and Change the tab names to customize for your requirement.
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} eventobject - Event object details of a Button 
         * @return {} 
         * @throws {}
         */
        onTabClick: function(eventobject) {
            var scopeObj = this;

            if (kony.sdk.isNullOrUndefined(eventobject)) return;
            if (kony.sdk.isNullOrUndefined(eventobject.text)) return;

            this.view.TabPane.TabsHeaderNew.clickTab(eventobject);
            this.initializeFetchParams();
            this.view.TabPane.TabSearchBarNew.tbxSearch.text = "";
            if (eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions") || eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.Approvals.TransactionsApproval")) {
                this.activeTab = BBConstants.GENERAL_TRANSACTIONS;
                this.changeHeaderRowTemplates();
                this.invokeFetchGeneralTransactions();
            } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions") || eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction")) {
                this.activeTab = BBConstants.ACH_TRANSACTIONS;
                this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
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
        },

        /**
        This method is used to set pagination component data for general transactions dashboard
        **/
        setPaginationComponentForGeneralTransactions: function() {
            this.view.TabPane.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPane.PaginationContainer.setLowerLimit(1);
            this.view.TabPane.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.common.transactions"));
            this.view.TabPane.PaginationContainer.setServiceDelegate(this.fetchGeneralTransactionRequests);
            this.view.TabPane.PaginationContainer.setIntervalHeader();
        },

        /**
        This method is used to set pagination component data for ach transactions dashboard
        **/
        setPaginationComponentForACHTransactions: function() {
            this.view.TabPane.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPane.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions"));
            this.view.TabPane.PaginationContainer.setLowerLimit(1);
            this.view.TabPane.PaginationContainer.setServiceDelegate(this.fetchACHTransactionRequests);
            this.view.TabPane.PaginationContainer.setIntervalHeader();
        },

        /**
        This method is used to set pagination component data for ach files dashboard
        **/
        setPaginationComponentForACHFiles: function() {
            this.view.TabPane.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPane.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles"));
            this.view.TabPane.PaginationContainer.setLowerLimit(1);
            this.view.TabPane.PaginationContainer.setServiceDelegate(this.fetchACHFileRequests);
            this.view.TabPane.PaginationContainer.setIntervalHeader();
        },

        updatePaginationContainerUI: function(responseData) {
            var isMaxLimitReached = responseData.length <= BBConstants.PAGE_SIZE;
            this.view.TabPane.PaginationContainer.setIsMaxLimitReached(isMaxLimitReached);
            this.view.TabPane.PaginationContainer.updateUI();
        },

        /**
         * showDownTimeMessage : This method is called inorder to show error messages related to server
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object } errorData - JSON data of the error 
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
         * setupTransactionsView : method to build a Setup for the View for Showing Transactions Tab with Details of the service data
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} transactionData : Modified Data from Service to put into a segment
         * @return {} 
         * @throws {}
         */
        setupTransactionsView: function(transactionData) {
            this.adjustScreen(1000);
            var self = this;
            this.view.TabPane.TabSearchBarNew.flxDropDown.isVisible = false;
            this.view.TabPane.TabSearchBarNew.flxSearch.width = "95%";
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
                lblTrAccountType: kony.i18n.getLocalizedString("i18n.konybb.Common.Payee"),
                lblTrRequestType: kony.i18n.getLocalizedString("i18n.konybb.Common.TransactionType"),
                btnTrAmount: kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),
                lblTrActions: kony.i18n.getLocalizedString("i18n.konybb.myRequests.status"),
                lblTransStatus: kony.i18n.getLocalizedString("i18n.konybb.myRequests.status"),
                flxDate: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.Transactions.Date;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.Transactions.Date = img;
                        this.fetchGeneralTransactionRequests("scheduledDate", order);
                    }.bind(this)
                },
                flxRequestType: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.Transactions.TransactionType;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.Transactions.TransactionType = img;
                        this.fetchGeneralTransactionRequests("featureName", order);
                    }.bind(this)
                },
                flxTrAmount: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.Transactions.AccountType;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.Transactions.AccountType = img;
                        this.fetchGeneralTransactionRequests("amount", order);
                    }.bind(this)
                },
            };


            this.view.TabPane.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;
            this.view.TabPane.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Common.SearchTransPayeeCreatedBy");
            if (break_point === 640 || orientationHandler.isMobile) {
                this.view.TabPane.TabBodyNew.setExpandableRowHeight(440);
            } else {
                this.view.TabPane.TabBodyNew.setExpandableRowHeight(201);
            }
            this.view.TabPane.setSearchData([
                ["lblTrRequestType", "lblTrAccountType", "lblTrCreatedByValue"]
            ]);
            this.view.TabPane.TabSearchBarNew.tbxSearch.onDone = function() {
                this.invokeFetchGeneralTransactions();
            }.bind(this);
            this.view.TabPane.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPane.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.invokeFetchGeneralTransactions();
            }.bind(this);
            this.view.TabPane.TabBodyNew.setSectionData([SectionData]);

            if (transactionData.length === 0) {
                this.showNoGeneralTransactions();
                this.view.TabPane.PaginationContainer.isVisible = false;
            } else {
                this.showGeneralTransactions();
                this.view.TabPane.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(transactionData);
                if (transactionData.length === this.view.TabPane.PaginationContainer.getPageSize() + 1) {
                    transactionData.pop();
                }
                var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
                applicationManager.getNavigationManager().applyUpdates(this);
                applicationManager.executeAuthorizationFramework(this);
                //if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
                if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                    for (var i = 0; i <= transactionData.length; i++) {
                        try {
                            if (transactionData[i].isBusinessAccount !== undefined && transactionData[i].isBusinessAccount !== null) {
                                transactionData[i].lblFromIcon = accountsModule.presentationController.fetchIsBusinessAccount(transactionData[i].isBusinessAccount.text) === "true" ? "r" : "s";
                                transactionData[i].lblFromIconRow = accountsModule.presentationController.fetchIsBusinessAccount(transactionData[i].isBusinessAccount.text) === "true" ? "r" : "s";
                            }
                        } catch (err) {}
                    }
                }
                this.view.TabPane.TabBodyNew.addDataForSections([transactionData]);
            }

            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(50);
        },

        serachGeneralTransactions: function() {
            this.showGeneralTransactions();
            this.view.TabPane.searchAndFilterData();
            if (this.view.TabPane.TabBodyNew.getData()[0][1].length <= 0) {
                this.showNoGeneralTransactions();
            }
        },

        showGeneralTransactions: function() {

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
                    "height": (break_point === 640 || orientationHandler.isMobile) ? "" : "150dp"
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
                lblCurrSymbol: {
                    "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
                },
                imgDropDown: {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O"
                },
                btnReject: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw"),
                    "onClick": this.showWithdrawTransactionPopup
                },
                btnTrActionsMobile: {
                    "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                    "onClick": function(eventobject, context) {
                        this.viewDetailsOfSelectedRecord(eventobject, context, BBConstants.GEN_TRANSACTION_VIEW_DETAILS);
                    }.bind(this),
                    "isVisible": (break_point === 640 || orientationHandler.isMobile) ? true : false
                },
                btnViewDetails: {
                    "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                    "onClick": function(eventobject, context) {
                        this.viewDetailsOfSelectedRecord(eventobject, context, BBConstants.GEN_TRANSACTION_VIEW_DETAILS);
                    }.bind(this),
                    "isVisible": (break_point === 640 || orientationHandler.isMobile) ? false : true
                },
                lblTrTemplateName: {
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.transactionID")
                },
                lblTrCreatedOn: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.CreatedOn"),
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
                lblTrStatuslabel: {
                    "isVisible": (break_point === 640 || orientationHandler.isMobile) ? false : true,
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.status")
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
                    "isVisible": applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false ? true : false,
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                },
                flxIconRow: {
                    "isVisible": applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false ? true : false,
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
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
                lblFrequencyValue: "DebitOrCreditAccount",
                btnReject: "Action",
                btnTrActionsMobile: "Action",
                flxBtnRejectAction: "flxBtnReject",
                lblTransStatus: "Status",
                lblTransParamValue: "Reccurence",
                flxTrActions: "flxTrActions1",
                lblFromIcon: "lblFromIcon",
                lblFromIconRow: "lblFromIconRow"
            };

            if (!(break_point === 640 || orientationHandler.isMobile))
                rowDataMap["lblTrStatus"] = "Status";
            this.view.TabPane.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPane.TabBodyNew.setDefaultValues([defaultValues]);
        },

        showNoGeneralTransactions: function() {
            var dataMap = {
                lblNoRecords: "lblMsg"
            };
            var defValues = {
                flxMain: {
                    "height": "450dp"
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
            };
            this.view.TabPane.TabBodyNew.setRowDataMap([dataMap]);
            this.view.TabPane.TabBodyNew.setDefaultValues([defValues]);
            this.view.TabPane.TabBodyNew.addRowsData([
                [{
                    "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.myRequests.NoTransactions")
                }]
            ]);
        },

        /**
         * Method to check whether the user typed anything in the search bar and making the UI compatible according to the actions of the user
         */
        hideOrShowCloseIcon: function() {
            if (this.view.TabPane.TabSearchBarNew.tbxSearch.text.trim() === "") {
                this.view.TabPane.TabSearchBarNew.imgClear.setVisibility(false);
            } else {
                this.view.TabPane.TabSearchBarNew.imgClear.setVisibility(true);
            }
            this.view.TabPane.TabSearchBarNew.forceLayout();
        },

        /**
         * setupACHTransactionsView : method to build a Setup for the View for Showing ACH Transactions Tab with Details of the service data
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} achTransactionsData : Modified Data from Service to put into a segment
         * @return {} 
         * @throws {}
         */
        setupACHTransactionsView: function(achTransactionsData) {
            this.adjustScreen(1000);
            var self = this;
            this.view.TabPane.TabSearchBarNew.flxDropDown.isVisible = true;
            this.view.TabPane.TabSearchBarNew.flxSearch.width = "66%";
            var break_point = kony.application.getCurrentBreakpoint();
            var trSectionData = {
                flxACHFiles: {
                    "isVisible": false
                },
                flxACHTransactions: {
                    "isVisible": true
                },
                flxSegBBUserApprovalsHeader: {
                    "isVisible": false
                },
                flxTransactions: {
                    "isVisible": true
                },
                lblApprovalHeader: {
                    text: kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions")
                },
                imgSortDate: this.dashboardSortParams.ACHTransactions.Date,
                imgSortAmount: this.dashboardSortParams.ACHTransactions.Amount,
                imgSortRequestType: this.dashboardSortParams.ACHTransactions.TemplateTypeName,
                btnDate: kony.i18n.getLocalizedString("i18n.konybb.Common.Date"),
                btnRequestType: kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType"),
                lblTrAccountType: kony.i18n.getLocalizedString("i18n.konybb.Common.Debit/CreditAccount"),
                btnTrAmount: kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),
                lblTrActions: kony.i18n.getLocalizedString("i18n.konybb.myRequests.status"),
                lblTransStatus: kony.i18n.getLocalizedString("i18n.konybb.myRequests.status"),
                flxDate: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ACHTransactions.Date;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.ACHTransactions.Date = img;
                        this.fetchACHTransactionRequests("createdts", order);
                    }.bind(this)
                },
                flxRequestType: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ACHTransactions.TemplateTypeName;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.ACHTransactions.TemplateTypeName = img;
                        this.fetchACHTransactionRequests("templateTypeName", order);
                    }.bind(this)
                },
                flxTrAmount: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ACHTransactions.Amount;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.ACHTransactions.Amount = img;
                        this.fetchACHTransactionRequests("totalAmount", order);
                    }.bind(this)
                },
            };

            this.view.TabPane.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;
            this.view.TabPane.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Common.SearchTransactionTemplate");
            if (break_point === 640 || orientationHandler.isMobile) {
                this.view.TabPane.TabBodyNew.setExpandableRowHeight(382);
                this.view.TabPane.TabSearchBarNew.flxSearch.width = "94%";
            } else {
                this.view.TabPane.TabBodyNew.setExpandableRowHeight(201);
            }
            this.view.TabPane.setSearchData([
                ["lblTrTemplateNameValue", "lblTrAccountType", "lblTrRequestType", "lblTrCreatedByValue"]
            ]);
            this.view.TabPane.TabSearchBarNew.tbxSearch.onDone = function() {
                this.invokeFetchACHTransactions();
            }.bind(this);
            this.view.TabPane.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPane.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.invokeFetchACHTransactions();
            }.bind(this);
            this.view.TabPane.TabBodyNew.setSectionData([trSectionData]);
            if (achTransactionsData.length === 0) {
                this.showNoACHTransactions();
                this.view.TabPane.PaginationContainer.isVisible = false;
            } else {
                this.showACHTransactions();
                this.view.TabPane.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(achTransactionsData);
                if (achTransactionsData.length === this.view.TabPane.PaginationContainer.getPageSize() + 1) {
                    achTransactionsData.pop();
                }
                var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
                applicationManager.getNavigationManager().applyUpdates(this);
                applicationManager.executeAuthorizationFramework(this);
                //if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
                if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                    for (var i = 0; i <= achTransactionsData.length; i++) {
                        try {
                            if (achTransactionsData[i].DebitAccount !== undefined && achTransactionsData[i].DebitAccount !== null) {
                                achTransactionsData[i].lblFromIcon = accountsModule.presentationController.fetchIsBusinessAccount(achTransactionsData[i].DebitAccount) === "true" ? "r" : "s";
                            }
                        } catch (err) {}
                    }
                }
                this.view.TabPane.TabBodyNew.addDataForSections([achTransactionsData]);
            }
            //         this.view.TabPane.TabSearchBarNew.listBoxViewType.masterData = [
            //             [".", kony.i18n.getLocalizedString("i18n.konybb.Common.All")],
            //            	["Payment,transactionTypeName", kony.i18n.getLocalizedString("i18n.konybb.Common.PaymentsOnly")],
            //             ["Collection,transactionTypeName", kony.i18n.getLocalizedString("i18n.konybb.Common.CollectionsOnly")]
            //         ];

            //       	this.view.TabPane.TabSearchBarNew.listBoxViewType.selectedKey = this.filterParams.ACHTransactions;
            //       	this.view.TabPane.TabSearchBarNew.listBoxViewType.onSelection = function(eventobject) {
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
            //         	this.invokeFetchACHTransactions();
            //         }.bind(this);

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
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setData(obj_arr);

            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.TabPane.TabSearchBarNew.flxDropDown.isVisible = false;
                this.view.TabPane.TabSearchBarNew.flxOptions.isVisible = false;
                this.view.TabPane.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("konybb.i18n.searchTransactionOrTemplate");
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(0);
        },

        serachACHTransactions: function() {
            this.showACHTransactions();
            this.view.TabPane.searchAndFilterData();
            if (this.view.TabPane.TabBodyNew.getData()[0][1].length <= 0) {
                this.showNoACHTransactions();
            }
        },

        showACHTransactions: function() {
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
                lblCurrSymbol: {
                    "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
                },
                imgDropDown: {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O"
                },
                btnReject: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw"),
                    "onClick": this.showWithdrawACHTransactionPopup
                },
                btnTrActionsMobile: {
                    "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                    "onClick": function(eventobject, context) {
                        this.viewDetailsOfSelectedRecord(eventobject, context, BBConstants.ACH_TRANSACTION_VIEW_DETAILS);
                    }.bind(this),
                    "isVisible": (break_point === 640 || orientationHandler.isMobile) ? true : false
                },
                btnViewDetails: {
                    "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                    "onClick": function(eventobject, context) {
                        this.viewDetailsOfSelectedRecord(eventobject, context, BBConstants.ACH_TRANSACTION_VIEW_DETAILS);
                    }.bind(this),
                    "isVisible": (break_point === 640 || orientationHandler.isMobile) ? false : true
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
                lblTrStatuslabel: {
                    "isVisible": (break_point === 640 || orientationHandler.isMobile) ? false : true,
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.status")
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
                    "isVisible": applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false ? true : false,
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                },
                flxIconRow: {
                    "isVisible": false,
                }
            };

            var rowDataMap = {
                lblDate: "TransmittedDate",
                lblTrAccountType: "DebitOrCreditAccount",
                lblTrRequestType: "RequestType",
                lblTrAmount: "Amount",
                lblTrCreatedOnValue: "CreatedOn",
                lblTrTemplateNameValue: "TemplateName",
                lblTrCreatedByValue: "userName",
                lblTrApprovalsValue: "Approval",
                btnReject: "Action",
                btnTrActionsMobile: "Action",
                flxBtnRejectAction: "flxBtnReject",
                lblTransStatus: "Status",
                flxTrActions: "flxTrActions1",
                lblFromIcon: "lblFromIcon"
            };

            if (!(break_point === 640 || orientationHandler.isMobile))
                rowDataMap["lblTrStatus"] = "Status";
            this.view.TabPane.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPane.TabBodyNew.setDefaultValues([trDefaultValues]);
        },

        showNoACHTransactions: function() {
            var dataMap = {
                lblNoRecords: "lblMsg"
            };
            var defValues = {
                flxMain: {
                    "height": "450dp"
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
            };
            this.view.TabPane.TabBodyNew.setRowDataMap([dataMap]);
            this.view.TabPane.TabBodyNew.setDefaultValues([defValues]);
            this.view.TabPane.TabBodyNew.addRowsData([
                [{
                    "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.myRequests.NoACHTransactions")
                }]
            ]);
        },

        /**
         * setupACHFilesView : method to build a Setup for the View for Showing ACHFiles Tab with Details of the service data
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} achFilesData : Modified Data from Service to put into a segment
         * @return {} 
         * @throws {}
         */
        setupACHFilesView: function(achFilesData) {
            this.adjustScreen(1000);
            this.view.TabPane.TabSearchBarNew.flxDropDown.isVisible = false;
            var break_point = kony.application.getCurrentBreakpoint();
            this.view.TabPane.TabSearchBarNew.flxSearch.width = "95%";
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
                lblFileActions: kony.i18n.getLocalizedString("i18n.konybb.myRequests.status"),
                flxTotalDebitAmount: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ACHFiles.DebitAmount;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.ACHFiles.DebitAmount = img;
                        this.fetchACHFileRequests("debitAmount", order);
                    }.bind(this)
                },
                flxTotalCreditAmount: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ACHFiles.CreditAmount;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.ACHFiles.CreditAmount = img;
                        this.fetchACHFileRequests("creditAmount", order);
                    }.bind(this)
                },
            };

            this.view.TabPane.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;
            this.view.TabPane.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Common.SearchByFIleName");

            if (break_point === 640 || orientationHandler.isMobile) {
                this.view.TabPane.TabBodyNew.setExpandableRowHeight(442);
            } else {
                this.view.TabPane.TabBodyNew.setExpandableRowHeight(201);
            }

            this.view.TabPane.setSearchData([
                ["lblFileName"]
            ]);
            this.view.TabPane.TabSearchBarNew.tbxSearch.onDone = function() {
                this.invokeFetchACHFiles();
            }.bind(this);
            this.view.TabPane.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPane.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.invokeFetchACHFiles();
            }.bind(this);
            this.view.TabPane.TabBodyNew.setSectionData([sectionData]);
            if (achFilesData.length === 0) {
                this.showNoACHFiles();
                this.view.TabPane.PaginationContainer.isVisible = false;
            } else {
                this.showACHFiles();
                this.view.TabPane.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(achFilesData);
                if (achFilesData.length === this.view.TabPane.PaginationContainer.getPageSize() + 1) {
                    achFilesData.pop();
                }
                this.view.TabPane.TabBodyNew.addDataForSections([achFilesData]);
            }

            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(0);
        },

        serachACHFiles: function() {
            this.showACHFiles();
            this.view.TabPane.searchAndFilterData();
            if (this.view.TabPane.TabBodyNew.getData()[0][1].length <= 0) {
                this.showNoACHFiles();
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
                lblFileStatus: {
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
                lblCurrSym: {
                    "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
                },
                imgDropDown: {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O"
                },
                btnReject: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw"),
                    "onClick": this.showWithdrawACHFilePopup
                },
                btnViewDetails: {
                    "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                    "onClick": function(eventobject, context) {
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
                lblachFileStatus: {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.status"),
                    "isVisible": true
                },
            };

            var rowDataMap = {
                lblFileName: "FileName",
                lblTotalDebitAmount: "TotalDebitAmount",
                lblTotalCreditAmount: "TotalCreditAmount",
                lblUpdatedDateAndTimeValue: "UpdatedDateAndTime",
                lblNumberOfDebitsValue: "NumberOfDebits",
                lblNumberOfCreditsValue: "NumberOfCredits",
                lblCompanyIDValue: "CompanyID",
                lblFileRequestTypeValue: "FileRequestType",
                lblUploadedByValue: "userName",
                lblNumberOfPrenotesValue: "Approver",
                lblFileStatus: "FileStatus",
                lblachFileStatusValue: "FileStatus",
                btnReject: "Action",
                flxBtnRejectAction: "flxBtnReject",
                lblTdebitAmount: kony.i18n.getLocalizedString("i18n.konybb.Common.TotalDebitAmt"),
                lblTcreditAmount: kony.i18n.getLocalizedString("i18n.konybb.Common.TotalCreditAmt")
            };

            this.view.TabPane.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPane.TabBodyNew.setDefaultValues([defaultValues]);
        },

        showNoACHFiles: function() {
            var dataMap = {
                lblNoRecords: "lblMsg"
            };
            var defValues = {
                flxMain: {
                    "height": "450dp"
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
            };
            this.view.TabPane.TabBodyNew.setRowDataMap([dataMap]);
            this.view.TabPane.TabBodyNew.setDefaultValues([defValues]);
            this.view.TabPane.TabBodyNew.addRowsData([
                [{
                    "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.myRequests.NoACHFiles")
                }]
            ]);
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
            this.view.flxPopup.trComments.text = "";
            this.view.flxPopupConfirmation.isVisible = false;
            this.view.forceLayout();
        },


        /**
         * showWithdrawPopup : show the pop-up screen with the passed pop-up config
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} popupConfig : Object with values for header, message, buttons and actions to the button on the Pop-Up 
         * @return {} 
         * @throws {}
         */
        showWithdrawPopup: function(popupConfig) {
            this.view.flxPopupConfirmation.height = this.view.customheader.info.frame.height + this.view.flxContentContainer.info.frame.height + this.view.flxFooter.info.frame.height;

            this.adjustPopupUI();

            this.view.flxPopup.lblHeader.text = popupConfig.header;
            this.view.flxPopup.lblPopupMsg.text = popupConfig.msg;
            this.view.flxPopup.flxComments.isVisible = popupConfig.commentsVisibility;
            this.view.flxPopup.commentsText = popupConfig.commentsText;
            this.view.flxPopup.formActionsNew.btnNext.text = popupConfig.nextText;
            this.view.flxPopup.formActionsNew.btnCancel.text = popupConfig.cancelText;
            this.view.flxPopup.formActionsNew.btnNext.onClick = popupConfig.nextOnClick;
            this.view.flxPopup.trComments.onKeyUp = function() {
                if (this.view.flxPopup.trComments.text.trim() !== "") {
                    CommonUtilities.enableButton(this.view.flxPopup.formActionsNew.btnNext);
                } else {
                    CommonUtilities.disableButton(this.view.flxPopup.formActionsNew.btnNext);
                }
            }.bind(this);

            CommonUtilities.disableButton(this.view.flxPopup.formActionsNew.btnNext);
            this.view.flxPopup.formActionsNew.btnCancel.onClick = function() {
                this.hidePopup();
            }.bind(this);

            this.view.flxPopup.flxHeader.setVisibility(true);
            this.view.flxPopup.imgClose.setVisibility(true);
            this.view.flxPopup.flxClose.setVisibility(true);
            this.view.flxPopup.flxClose.cursorType = "pointer";
            this.view.flxPopup.flxClose.zIndex = 10000;
            this.view.flxPopup.flxClose.onClick = function() {
                this.hidePopup();
            }.bind(this);

            this.view.flxPopupConfirmation.isVisible = true;
            this.view.forceLayout();
        },


        /**
         * adjustPopupUI : Setup the pop-Up UI
         * @member of {frmBBMyRequestsController}
         * @param {}
         * @return {} 
         * @throws {}
         */
        adjustPopupUI: function() {
            this.view.flxPopup.imgClose.isVisible = false;
            this.view.flxPopup.flxClose.isVisible = false;
            this.view.flxPopup.formActionsNew.isVisible = true;
            this.view.flxPopup.flxPlaceHolder.isVisible = false;
            this.view.flxPopup.lblPopupMsg.isVisible = true;
            this.view.flxPopup.lblCommnets.isVisible = true;
            this.view.flxPopup.lblCommnets.isEnabled = true;
        },


        /**
         * showWithdrawTransactionPopup : onclick of withdraw button show Pop-Up with the given config
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} eventobject - button object which triggered the onClick action
         * @param {} context - segment context where the button onclick got triggered
         * @return {} 
         * @throws {}
         */
        showWithdrawTransactionPopup: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPane.TabBodyNew.getData()[section][1][row];
            var inputParams = {
                "Request_id": selectedRowData.Request_id
            };

            var actionText = eventobject.text;
            var popupConfig = {};

            if (actionText == kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw")) {
                popupConfig.popupType = kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw");
                popupConfig.header = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
                popupConfig.msg = kony.i18n.getLocalizedString("i18n.konybb.myRequests.TransWithdrawConfirm");
                popupConfig.commentsVisibility = true;
                popupConfig.commentsText = "";
                popupConfig.nextText = kony.i18n.getLocalizedString("i18n.common.yes");
                popupConfig.cancelText = kony.i18n.getLocalizedString("i18n.common.no");
                popupConfig.nextOnClick = this.withdrawTransaction.bind(this, inputParams);
            }

            this.showWithdrawPopup(popupConfig);
            FormControllerUtility.scrollToTop();
        },


        /**
         * withdrawTransaction : call the presentation controller with navigation object to withdraw the Transaction
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} inputParams - object with request_id and other needed data to withdraw a Transaction
         * @return {} 
         * @throws {}
         */
        withdrawTransaction: function(inputParams) {
            var scopeObj = this;
            this.hidePopup();
            FormControllerUtility.showProgressBar(this.view);
            var navObj = {
                requestData: inputParams,
                onSuccess: {
                    form: this.forms.ApprovalViewDetails,
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.WITHDRAWN_TRANSACTION_ACK,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyRequests",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            scopeObj.ApprovalsReqModule.presentationController.withdrawTransactionRequest(navObj);
        },


        /**
         * showWithdrawACHTransactionPopup : onclick of withdraw button in ACHTransaction show Pop-Up with the given config
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} eventobject - button object which triggered the onClick action
         * @param {} context - segment context where the button onclick got triggered
         * @return {} 
         * @throws {}
         */
        showWithdrawACHTransactionPopup: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPane.TabBodyNew.getData()[section][1][row];
            var inputParams = {
                "Request_id": selectedRowData.Request_id
            };

            var actionText = eventobject.text;
            var popupConfig = {};
            if (actionText == kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw")) {
                popupConfig.popupType = kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw");
                popupConfig.header = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
                popupConfig.msg = kony.i18n.getLocalizedString("i18n.konybb.myRequests.TransWithdrawConfirm");
                popupConfig.commentsVisibility = true;
                popupConfig.commentsText = "";
                popupConfig.nextText = kony.i18n.getLocalizedString("i18n.common.yes");
                popupConfig.cancelText = kony.i18n.getLocalizedString("i18n.common.no");
                popupConfig.nextOnClick = this.withdrawACHTransaction.bind(this, inputParams);
            }

            this.showWithdrawPopup(popupConfig);
        },


        /**
         * withdrawACHTransaction : call the presentation controller with navigation object to withdraw the ACH Transaction
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} inputParams - object with request_id and other needed data to withdraw a ACH Transaction
         * @return {} 
         * @throws {}
         */
        withdrawACHTransaction: function(inputParams) {
            var scopeObj = this;
            this.hidePopup();
            FormControllerUtility.showProgressBar(this.view);
            var navObj = {
                requestData: inputParams,
                onSuccess: {
                    form: this.forms.ApprovalViewDetails,
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.WITHDRAWN_ACH_TRANSACTION_ACK,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyRequests",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            scopeObj.ApprovalsReqModule.presentationController.withdrawACHTransactionRequest(navObj);
        },


        /**
         * showWithdrawACHFilePopup : onclick of withdraw button in ACH File show Pop-Up with the given config
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} eventobject - button object which triggered the onClick action
         * @param {} context - segment context where the button onclick got triggered
         * @return {} 
         * @throws {}
         */
        showWithdrawACHFilePopup: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPane.TabBodyNew.getData()[section][1][row];
            var inputParams = {
                "Request_id": selectedRowData.Request_id
            };

            var actionText = eventobject.text;
            var popupConfig = {};
            if (actionText == kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw")) {
                popupConfig.popupType = kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw");
                popupConfig.header = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");
                popupConfig.msg = kony.i18n.getLocalizedString("i18n.konybb.myRequests.FileWithdrawConfirm");
                popupConfig.commentsVisibility = true;
                popupConfig.commentsText = "";
                popupConfig.nextText = kony.i18n.getLocalizedString("i18n.common.yes");
                popupConfig.cancelText = kony.i18n.getLocalizedString("i18n.common.no");
                popupConfig.nextOnClick = this.withdrawACHFile.bind(this, inputParams);
            }
            this.showWithdrawPopup(popupConfig);
        },


        /**
         * withdrawACHFile : call the presentation controller with navigation object to withdraw the ACH File
         * @member of {frmBBMyRequestsController}
         * @param {JSON Object} inputParams - object with request_id and other needed data to withdraw a ACH File
         * @return {} 
         * @throws {}
         */
        withdrawACHFile: function(inputParams) {
            var scopeObj = this;
            this.hidePopup();
            FormControllerUtility.showProgressBar(this.view);
            var navObj = {
                requestData: inputParams,
                onSuccess: {
                    form: this.forms.ApprovalViewDetails,
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.WITHDRAWN_ACH_FILE_ACK,
                        responseData: {}
                    }
                },
                onFailure: {
                    form: "frmBBMyRequests",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            scopeObj.ApprovalsReqModule.presentationController.withdrawACHFileRequest(navObj);
        },

        /**
         * viewDetailsOfSelectedRecord : view details of selected record by navigating to frmACHDashboard
         * @member of {frmBBMyRequestsController}
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
            var selectedRowData = this.view.TabPane.TabBodyNew.getData()[section][1][row];
            FormControllerUtility.showProgressBar(this.view);
            var navObj = {
                requestData: {
                    selectedRowData: selectedRowData,
                    isApprovalData: false,
                    isRequestData: true
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
                    form: "frmBBMyRequests",
                    module: "ApprovalsReqUIModule",
                    context: {
                        key: BBConstants.SERVICE_ERROR,
                        responseData: {}
                    }
                }
            };
            scopeObj.ApprovalsReqModule.presentationController.noServiceNavigate(navObj);
        },

        campaignSuccess: function(data) {
            var CampaignManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('CampaignManagement');
            CampaignManagementModule.presentationController.updateCampaignDetails(data);
            var self = this;
            if (data.length === 0) {

                this.view.dbRightContainer.flxBannerWrapper.setVisibility(false);
            } else {
                this.view.dbRightContainer.flxBannerWrapper.setVisibility(true);

                this.view.dbRightContainer.imgBanner.src = data[0].imageURL;
                this.view.dbRightContainer.imgBanner.onTouchStart = function() {
                    CampaignUtility.onClickofInAppCampaign(data[0].destinationURL);
                };
            }

            this.adjustScreen(50);
        },


        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmBBMyRequestsController}
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
            if (width == 640 || orientationHandler.isMobile) {
                this.view.TabPane.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxempty";
                this.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowMobileTemplate";
                this.view.customheader.lblHeaderMobile.isVisible = true;
                this.view.TabPane.TabSearchBarNew.listBoxViewType.skin = "sknlistbxMobile";
                this.view.TabPane.TabSearchBarNew.flxDropDown.skin = "slFbox";
                this.view.TabPane.TabSearchBarNew.skin = "bbsknf8f7f8WithoutBorder";
                this.view.TabPane.TabsHeaderNew.skin = "sknFlxscrollffffffShadowCustom";
                responsiveFonts.setMobileFonts();
            } else {
                this.view.TabPane.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxACHMyApprovalsHeader";
                this.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowTemplate";
                this.view.customheader.lblHeaderMobile.isVisible = false;
                this.view.TabPane.TabSearchBarNew.listBoxViewType.skin = "bbSknListBox424242SSP15px";
                this.view.TabPane.TabSearchBarNew.flxDropDown.skin = "skne3e3e3br3pxradius";
                this.view.TabPane.TabsHeaderNew.skin = "slFSbox";
                this.view.TabPane.TabSearchBarNew.skin = "slFSbox";
                responsiveFonts.setDesktopFonts();
                this.view.customheader.lblHeaderMobile.text = "";
            }
            var curr = kony.application.getCurrentForm();
            curr.forceLayout();
            this.adjustScreen(0);
            this.ApprovalsReqModule.presentationController.getApprovalsReqCampaigns();
        },

        changeHeaderRowTemplates: function() {
            var break_point = kony.application.getCurrentBreakpoint();
            if (this.activeTab === BBConstants.BULKPAYMENTS) {
                this.view.TabPane.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBulkPaymentsViewHeader";
                this.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxBulkPaymentsViewRowTemplate";
            } else {
                if (break_point === 640 || orientationHandler.isMobile) {
                    this.view.TabPane.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxempty";
                    this.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowMobileTemplate";
                } else {
                    this.view.TabPane.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxACHMyApprovalsHeader";
                    this.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxACHMyApprovalsRowTemplate";
                }
            }
        },

        fetchBulkPaymentRequests: function() {
            this.updateFetchParams();
            this.ApprovalsReqModule.presentationController.fetchPendingBulkPaymentRequests(this.fetchParams);
        },

        setupBulkPaymentsView: function(response) {
            this.adjustScreen(1000);
            this.view.TabPane.TabSearchBarNew.flxDropDown.isVisible = false;
            this.view.TabPane.TabSearchBarNew.flxSearch.width = "95%";
            this.view.TabPane.TabSearchBarNew.tbxSearch.text = "";
            this.view.TabPane.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.common.searchTransactionOrTemplate");
            this.view.TabPane.TabSearchBarNew.tbxSearch.onDone = this.fetchBulkPaymentRequests;
            this.view.TabPane.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPane.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.fetchBulkPaymentRequests();
            }.bind(this);
            this.view.TabPane.setSearchData([
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
                        this.fetchBulkPaymentRequests();
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
                        this.fetchBulkPaymentRequests();
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
                        this.fetchBulkPaymentRequests();
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

            this.view.TabPane.TabBodyNew.setSectionData([sectionData]);
            this.view.TabPane.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPane.TabBodyNew.setDefaultValues([defaultValues]);
            if (response.length === 0) {
                this.view.TabPane.PaginationContainer.isVisible = false;
                this.showNoPendingBulkPayments();
            } else {
                this.view.TabPane.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(response);
                if (response.length === this.view.TabPane.PaginationContainer.getPageSize() + 1) {
                    response.pop();
                }
                this.view.TabPane.TabBodyNew.addDataForSections([response]);
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(0);
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
            this.view.TabPane.TabBodyNew.setRowDataMap([dataMap]);
            this.view.TabPane.TabBodyNew.setDefaultValues([defValues]);
            this.view.TabPane.TabBodyNew.addRowsData([
                [{
                    "lblMsg": "No Pending Requests"
                }]
            ]);
        },

        setPaginationComponentForBulkPaymentsView: function() {
            this.view.TabPane.PaginationContainer.isVisible = true;
            this.view.TabPane.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPane.PaginationContainer.setLowerLimit(1);
            this.view.TabPane.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.common.transactions"));
            this.view.TabPane.PaginationContainer.setServiceDelegate(this.fetchBulkPaymentRequests);
            this.view.TabPane.PaginationContainer.setIntervalHeader();
        },

        navigateToviewDetails: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPane.TabBodyNew.getData()[section][1][row];
            selectedRowData.isHistoryFlow = false;
            this.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBulkPaymentsReview", BBConstants.REQUESTS_VIEW_PAYMENT, selectedRowData);
        },

    };
});