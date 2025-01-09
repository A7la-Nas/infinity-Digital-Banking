define(['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    return {

        /** Global Variables **/
        ApprovalsReqModule: null,
        defaultTab: kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"),
        activeTab: null,

        /**
         * updateFormUI : Will be called by the navigate method, when current form is to be updated
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} uiModel - with 2 values, Key and ResponseData
         * @return {} 
         * @throws {}
         */
        updateFormUI: function(context) {
            if (context.progressBar === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (context.progressBar === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.campaignRes) {
                this.campaignSuccess(context.campaignRes);
            }
            if (context.campaignError) {
                this.view.flxBannerContainerDesktop.setVisibility(false);
                this.view.flxBannerContainerMobile.setVisibility(false);
            }
            if (context.key === BBConstants.DASHBOARD_DEFAULT_TAB) {
                this.onTabClick({
                    text: kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader")
                });
            }
            if (context.fetchApprovalHistoryForBulkPay) {
                this.setupBulkPaymentsView(context.fetchApprovalHistoryForBulkPay);
            }

            this.view.forceLayout();
            this.adjustScreen(0);
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
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['customheader', 'flxMain', 'flxHeader', 'flxFooter', 'flxContentContainer', 'flxHeaderMain','flxFormContent']);
            var scopeObj = this;
            this.view.customheader.forceCloseHamburger();
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };

            this.view.flxContentContainer.setVisibility(true);
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.customheader.topmenu.btnHamburger.skin = "btnHamburgerskn";
            this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
            this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
            this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
            this.view.customheader.forceCloseHamburger();
            this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.approvalHistory"));
            var onSegReload = function() {
                scopeObj.view.forceLayout();
                scopeObj.adjustScreen(50);
            };
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
            this.view.TabPaneNew.TabBodyNew.setSegmentReloadAction(onSegReload);
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

            this.setupRightContainer();
            this.loadDashboard();
            this.view.forceLayout();
            this.adjustScreen(0);
        },

        /**
         * onPostShow :  postShow event Function for the form
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */
        onPostShow: function() {
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(0);
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
                if (lblvalue == "Approved") {
                    this.fetchParams.filterByParam = "status";
                    this.fetchParams.filterByValue = "Approved";
                }
                if (lblvalue == "Rejected") {
                    this.fetchParams.filterByParam = "status";
                    this.fetchParams.filterByValue = "Rejected";
                }
                this.filterParams.bulkPayments = this.fetchParams.filterByValue + "," + this.fetchParams.filterByParam;

            } else {
                this.fetchParams.filterByParam = "";
                this.fetchParams.filterByValue = "";
            }
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
            this.fetchBulkPaymentHistory();
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
                this.view.customheader.lblHeaderMobile.isVisible = true;
                this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.Common.approvalHistory");
                this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.skin = "sknlistbxMobile";
                this.view.TabPaneNew.TabSearchBarNew.flxDropDown.skin = "slFbox";
                this.view.TabPaneNew.TabsHeaderNew.skin = "sknFlxscrollffffffShadowCustom";
                this.view.TabPaneNew.TabSearchBarNew.flxBoxSearch.skin = "sknFlxffffffborderradE3E3E3";
                this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = false;
                this.view.TabPaneNew.TabSearchBarNew.skin = "bbsknf8f7f8WithoutBorder";
                responsiveFonts.setMobileFonts();
                var curr = kony.application.getCurrentForm();
                curr.forceLayout();
            } else {
                this.view.customheader.lblHeaderMobile.isVisible = false;
                this.view.customheader.lblHeaderMobile.text = " ";
                this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.skin = "bbSknListBox424242SSP15px";
                this.view.TabPaneNew.TabSearchBarNew.flxDropDown.skin = "skne3e3e3br3pxradius";
                this.view.TabPaneNew.TabsHeaderNew.skin = "slFSbox";
                this.view.TabPaneNew.TabSearchBarNew.flxBoxSearch.skin = "skne3e3e3br3pxradius";
                this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = true;
                this.view.TabPaneNew.TabSearchBarNew.skin = "slFbox";
                this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxApprovalHistoryHeader";
                this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxApprovalHistoryRowTemplate";
                responsiveFonts.setDesktopFonts();
                var curr = kony.application.getCurrentForm();
                curr.forceLayout();
            }
            this.adjustScreen(50);
            this.ApprovalsReqModule.presentationController.getApprovalsReqCampaigns();
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

        loadDashboard: function() {
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentsApprovalsFeaturePermissionsList());
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader");
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader");
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onKeyUp = this.hideOrShowCloseIcon.bind(this);
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.onClick = this.onTabClick;
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.skin = "sknBtnSSP42424217PxSelectedTab";
            this.view.TabPaneNew.TabsHeaderNew.btnTab2.isVisible = false;
            this.view.TabPaneNew.TabsHeaderNew.btnTab3.isVisible = false;
            this.view.TabPaneNew.TabsHeaderNew.btnTab5.isVisible = false;
            this.view.TabPaneNew.TabsHeaderNew.btnTab6.isVisible = false;
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
            this.initializeFilterParams();
            this.initializeDashboardSortParams();
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
            this.view.TabPaneNew.TabsHeaderNew.clickTab(eventobject);
            if (eventobject.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader")) {
                this.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader");
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
                this.invokeBulkPaymentHistory();
            }
            this.adjustScreen(50);
        },

        initializeFetchParams: function() {
            this.fetchParams = {
                "searchString": "",
                "sortByParam": "",
                "sortOrder": "",
                "pageSize": "",
                "pageOffset": "",
                "filterByParam": "",
                "filterByValue": ""
            };
        },

        initializeFilterParams: function() {
            this.filterParams = {
                "bulkPayments": ".",
            };
        },

        initializeDashboardSortParams: function() {
            this.dashboardSortParams = {
                "bulkPayments": {
                    "Description": ViewConstants.IMAGES.SORTING_NEXT,
                    "Date": ViewConstants.IMAGES.SORTING_NEXT,
                    "Status": ViewConstants.IMAGES.SORTING_NEXT
                }
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
            if (this.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader") && this.filterParams.bulkPayments === ".") {
                this.fetchParams.filterByParam = "";
                this.fetchParams.filterByValue = "";
            }
        },

        invokeBulkPaymentHistory: function() {
            this.updateFetchParams();
            this.setPaginationComponentForBulkPaymentsView();
            this.fetchBulkPaymentHistory();
        },

        fetchBulkPaymentHistory: function() {
            this.updateFetchParams();
            this.ApprovalsReqModule.presentationController.fetchBulkPaymentApprovalHistory(this.fetchParams);
        },

        setupBulkPaymentsView: function(response) {
            this.adjustScreen(1000);
            var break_point = kony.application.getCurrentBreakpoint();
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.common.searchTransactionOrTemplate");
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = this.fetchBulkPaymentHistory;
            this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.fetchBulkPaymentHistory();
            }.bind(this);
            //     this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.masterData = 
            //         [
            //           [".", kony.i18n.getLocalizedString("i18n.konybb.Common.All")],
            //           ["Approved,status", "Approved"],
            //           ["Rejected,status", "Rejected"]
            //     ];    
            //     this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.selectedKey = this.filterParams.bulkPayments;
            //       this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.onSelection = function(eventobject) {
            //         var selectedKey = eventobject.selectedKey;
            //         this.filterParams.bulkPayments = selectedKey;
            //         if(selectedKey !== "."){
            //           var params = eventobject.selectedKey.split(",")
            //           this.fetchParams.filterByValue = params.splice(0,params.length/2).toString();
            //           this.fetchParams.filterByParam = params.toString();
            //         }
            //         else{
            //           this.fetchParams.filterByParam = "";
            //           this.fetchParams.filterByValue = "";
            //         }
            //         this.fetchBulkPaymentHistory();
            //     }.bind(this);

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
                    text: "Approved",
                }
            }, {
                "flxSeparator": {
                    "isVisible": false
                },
                "lblViewTypeName": {
                    text: "Rejected",
                }

            }];
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setData(obj_arr);


            this.view.TabPaneNew.setSearchData([
                ["lblOpDescription", "lblOpStatus"]
            ]);

            var sectionData = {
                "flxBulkPayments": {
                    "isVisible": true
                },
                "btnDescription": {
                    "text": kony.i18n.getLocalizedString("kony.pfm.desc"),
                },
                "btnDate": {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.Date"),
                },
                "btnStatus": {
                    "text": kony.i18n.getLocalizedString("i18n.ChequeManagement.Status")
                },
                "lblActions": {
                    "text": kony.i18n.getLocalizedString("i18n.wireTransfers.Actions")
                },
                "imgSortDesc": this.dashboardSortParams.bulkPayments.Description,
                "imgDate": this.dashboardSortParams.bulkPayments.Date,
                "imgStatus": this.dashboardSortParams.bulkPayments.Status,
                "flxDescription": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.bulkPayments.Description;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.bulkPayments.Description = img;
                        this.updateFetchParams("Description", order);
                        this.fetchBulkPaymentHistory();
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
                        this.fetchBulkPaymentHistory();
                    }.bind(this)
                },
                "flxStatus": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.bulkPayments.Status;
                        img = (img === ViewConstants.IMAGES.SORTING_NEXT) ? ViewConstants.IMAGES.SORTING_PREVIOUS : ViewConstants.IMAGES.SORTING_NEXT;
                        var order = (img === ViewConstants.IMAGES.SORTING_NEXT) ? "DESC" : "ASC";
                        this.dashboardSortParams.bulkPayments.Status = img;
                        this.updateFetchParams("Status", order);
                        this.fetchBulkPaymentHistory();
                    }.bind(this)
                }
            };

            var defaultValues = {
                flxMain: {
                    "height": "51dp"
                },
                flxApprovalHistoryHeader: {
                    "skin": "slFboxffffff"
                },
                flxHeader: {
                    "skin": "slFboxffffff"
                },
                flxNoRecords: {
                    "isVisible": false
                },
                flxBulkPaymentsDetails: {
                    "isVisible": true
                },
                imgDropDown: {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O"
                },
                btnOpActions: {
                    "text": kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewPayment"),
                    "onClick": function(eventobject, context) {
                        this.navigateToviewDetails(eventobject, context);
                    }.bind(this)
                },
                lblOPInitiatedBy: {
                    "isVisible": false
                },
                lblOPnitiatedByValue: {
                    "isVisible": false
                }
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
                this.showNoBulkPaymentsHistory();
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

        showNoBulkPaymentsHistory: function() {
            var dataMap = {
                lblNoRecords: "lblMsg"
            };
            var NODATAFLEXHEIGHT = "450dp";
            var defValues = {
                flxMain: {
                    "height": NODATAFLEXHEIGHT
                },
                flxHeader: {
                    "isVisible": false
                },
                flxTemplateDetails: {
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
                    "lblMsg": "No Approval History"
                }]
            ]);
        },

        updatePaginationContainerUI: function(responseData) {
            var isMaxLimitReached = responseData.length <= BBConstants.PAGE_SIZE;
            this.view.TabPaneNew.PaginationContainer.setIsMaxLimitReached(isMaxLimitReached);
            this.view.TabPaneNew.PaginationContainer.updateUI();
        },

        /**
        This method is used to set pagination component data for general transactions dashboard
        **/
        setPaginationComponentForBulkPaymentsView: function() {
            this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
            this.view.TabPaneNew.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.common.transactions"));
            this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchBulkPaymentHistory);
            this.view.TabPaneNew.PaginationContainer.setIntervalHeader();
        },

        /**
         * setupRightContainer : method to show right container with appropriate actions buttons
         * @member of {frmBBMyApprovalHistoryController}
         * @param {} 
         * @return {} 
         * @throws {}
         */
        setupRightContainer: function() {
            this.view.dbRightContainerNew.lblActionHeader.setVisibility(false);
            this.view.dbRightContainerNew.flxActionHeaderSeperator.setVisibility(false);
            var scopeObj = this;
            this.view.dbRightContainerNew.lblActionHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.approvalHistory");
            this.view.dbRightContainerNew.btnAction1.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getApprovalsFeaturePermissionsList());
            this.view.dbRightContainerNew.btnAction1.text = kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals");
            this.view.dbRightContainerNew.btnAction1.onClick = function() {
                scopeObj.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBBMyApprovals", BBConstants.DASHBOARD_DEFAULT_TAB);
            };
            this.view.dbRightContainerNew.flxAction2.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getRequestsFeaturePermissionsList());
            this.view.dbRightContainerNew.btnAction2.text = kony.i18n.getLocalizedString("i18n.konybb.Common.MyRequests");
            this.view.dbRightContainerNew.btnAction2.onClick = function() {
                scopeObj.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBBMyRequests", BBConstants.DASHBOARD_DEFAULT_TAB);
            };
            this.view.dbRightContainerNew.flxAction3.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentRequestPermissionsList());
            this.view.dbRightContainerNew.btnAction3.text = kony.i18n.getLocalizedString("i18n.konybb.Common.requestHistory");
            this.view.dbRightContainerNew.btnAction3.onClick = function() {
                scopeObj.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBBRequestHistory", BBConstants.DASHBOARD_DEFAULT_TAB);
            };
            this.setRightContainerUI();
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
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

        navigateToviewDetails: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            selectedRowData.isHistoryFlow = true;
            this.ApprovalsReqModule.presentationController.noServiceNavigateToForm("frmBulkPaymentsReview", BBConstants.APPROVER_VIEW_PAYMENT, selectedRowData);
        },


    };
});