/**
 * Description of Module representing a Confirm form.
 * @module frmBillPayHistoryController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility, CampaignUtility) {
     
    var orientationHandler = new OrientationHandler();


    return /** @alias module:frmBillPayHistoryController */ {
        /** updates the present Form based on required function.
         * @param {uiDataMap[]} uiDataMap
         */
        profileAccess: "",
        postshowflag: true,
		focusonDropdown : false,
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.billpayHistory) {
                this.binduserBillPayHistory(uiDataMap.billpayHistory);
                this.initializeSearchAndFilterActions(uiDataMap.billpayHistory);
                FormControllerUtility.updateSortFlex(this.historySortMap, uiDataMap.billpayHistory.noOfRecords);
            }
            if (uiDataMap.serverError) {
                this.setServerError(uiDataMap.serverError);
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            //             if (uiDataMap.billpayHistory && uiDataMap.billpayHistory.searchVisibility) {
            //                 this.binduserBillPayHistory(uiDataMap.billpayHistory.billpayHistory, null, uiDataMap.billpayHistory.searchVisibility);
            //                 FormControllerUtility.updateSortFlex(this.historySortMap, uiDataMap.billpayHistory.noOfRecords);
            //             }
            //             else if(uiDataMap.billpayHistory){
            //                 this.binduserBillPayHistory(uiDataMap.billpayHistory);
            //                 FormControllerUtility.updateSortFlex(this.historySortMap, uiDataMap.billpayHistory.noOfRecords);
            //             }
            if (uiDataMap.billDueData) {
                this.bindTotalEbillAmountDue(uiDataMap.billDueData);
            }
            if (uiDataMap.campaign) {
                CampaignUtility.showCampaign(uiDataMap.campaign, this.view, "flxMain");
            }
        },

        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            this.initActions();
        },
        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scopeObj.view.CustomPopupCancel, width);
        },
        preShow: function() {
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Bill Pay History");
            CampaignUtility.fetchPopupCampaigns();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain']);
          /*  this.view.btnAllPayees.toolTip = kony.i18n.getLocalizedString("i18n.billPay.AllPayees");
            this.view.btnPayementDue.toolTip = kony.i18n.getLocalizedString("i18n.billPay.PaymentDue");
            this.view.btnScheduled.toolTip = kony.i18n.getLocalizedString("i18n.billPay.scheduled");
            this.view.btnHistory.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHistory");
            this.view.btnManagePayee.toolTip = kony.i18n.getLocalizedString("i18n.billPay.ManagePayee");
            this.view.txtSearch.toolTip = kony.i18n.getLocalizedString("i18n.payments.searchtooltip");
            this.view.imgSortDate.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.sortByDate");
            this.view.imgInfo.toolTip = kony.i18n.getLocalizedString("kony.mb.NAO.Info");
            this.view.imgPaginationNext.toolTip = kony.i18n.getLocalizedString("i18n.common.next");
            this.view.imgPaginationPrevious.toolTip = kony.i18n.getLocalizedString("i18n.payments.previous");
            this.view.imgSortType.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByType");
            this.view.imgSortCategory.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByStatus");
            this.view.imgSortAmount.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByAmount");
            this.view.imgSortDescription.toolTip = kony.i18n.getLocalizedString("18n.payments.sortByDescription");
			*/
            postshowflag = true;
			focusonDropdown = false;
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.title = "Bill Pay History";
           
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.flxCancelPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.flxDialogs.isModalContainer = true;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.accountTypesBillPayHistory.setVisibility(false);
            this.view.flxFiltersList.accessibilityConfig = {
                "a11yLabel": "Currently viewing " + this.view.lblType.text + ". Click here to show list of views",
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0,
                    "aria-expanded": false
                }
            };
			this.view.flxFiltersListMain.accessibilityConfig = {   
               
                "a11yARIA": {
                   
                    "tabindex": -1,
                 
                }
            };
            postshowflag = true;
			 if (kony.application.getCurrentBreakpoint() <= 1024) this.view.btnBypass.setVisibility(false);
        },
		onKeyPressCallBack: function (eventObject, eventPayload) {
            var scopeObj = this;
            if (eventPayload.keyCode === 27) {
                if (scopeObj.view.accountTypesBillPayHistory.isVisible) {
                    scopeObj.view.accountTypesBillPayHistory.setVisibility(false);
                     scopeObj.view.flxFiltersList.accessibilityConfig = {
                            "a11yLabel": "Currently viewing " + this.view.lblType.text + ". Click here to show list of views",
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        };
					scopeObj.view.flxFiltersList.setActive(true);	
                }


                else if (scopeObj.view.flxLogout.isVisible) {
                    scopeObj.view.flxDialogs.isVisible = false;
                    scopeObj.view.flxLogout.setVisibility(false);
                    scopeObj.view.customheadernew.btnLogout.setActive(true);
                }
            }
            else if (eventPayload.keyCode === 9) {
                if (eventPayload.shiftKey) {
                    if (scopeObj.view.accountTypesBillPayHistory.isVisible) {
                        scopeObj.view.accountTypesBillPayHistory.setVisibility(false);
                        scopeObj.view.flxFiltersList.accessibilityConfig = {
                            "a11yLabel": "Currently viewing " + this.view.lblType.text + ". Click here to show list of views",
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        };
                    }
                }
            }
        },
        /**
         * used perform the initialize activities.
         *
         */
        initActions: function() {
            var scopeObj = this;
            scopeObj.setHistorySorting();
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                scopeObj.view.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.billpay.SearchMessageMobile");
            } else {
                scopeObj.view.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.billPay.SearchMessage");
            }
            //           	scopeObj.view.btnConfirm.onClick = scopeObj.onSearchBtnClick.bind(scopeObj);
            //           	scopeObj.view.txtSearch.onKeyUp = scopeObj.onTxtSearchKeyUp.bind(scopeObj);
            //           	scopeObj.view.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
            //           	scopeObj.view.flxClearBtn.onClick = scopeObj.onSearchClearBtnClick.bind(scopeObj);	
            //           	scopeObj.view.flxFiltersList.onClick = scopeObj.onFiltersBtnClick.bind(scopeObj);
            scopeObj.setTabActions();
            this.view.customheadernew.btnSkipNav.onClick = this.onSkipNav;
			this.view.btnByPass.onClick =  this.onbtnByPassClick;
        },

		/** accessibility values for sorting coloumns
		*/
		setAccessibilityConfigForSorting: function (fieldname,sortType) {
			switch(fieldname){
				case "transactionDate":
				if (sortType === "asc") {
                this.view.flxSortDate.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortDate.text + 'column. Sorted in Ascending order. Click to Sort in Descending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
            } else if (sortType === "desc") {
                this.view.flxSortDate.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortDate.text + ' column. Sorted in Descending order. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                }
            }
			this.view.flxSendTo.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortDescription.text + 'column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				this.view.flxAmount.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortAmount.text + ' column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				
				this.view.flxStatus.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortBalance.text + ' column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				if(!postshowflag)this.view.flxSortDate.setActive(true);
			break;
			case "nickName":
			
			if (sortType === "asc") {
                this.view.flxSendTo.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortDescription.text + 'column. Sorted in Ascending order. Click to Sort in Descending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
            } else if (sortType === "desc") {
                this.view.flxSendTo.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortDescription.text + ' column. Sorted in Descending order. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
            }
			this.view.flxSortDate.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortDate.text + 'column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				this.view.flxAmount.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortAmount.text + ' column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				
				this.view.flxStatus.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortBalance.text + ' column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				if(!postshowflag)this.view.flxSendTo.setActive(true);
			break;
				
			
			case "amount":
				if (sortType === "asc") {
                this.view.flxAmount.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortAmount.text + 'column. Sorted in Ascending order. Click to Sort in Descending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
            } else if (sortType === "desc") {
                this.view.flxAmount.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortAmount.text + ' column. Sorted in Descending order. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
            }
			this.view.flxSortDate.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortDate.text + 'column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				this.view.flxSendTo.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortDescription.text + 'column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				
				this.view.flxStatus.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortBalance.text + ' column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				 if(!postshowflag)this.view.flxAmount.setActive(true);
			break;
			case "statusDesc":
				if (sortType === "asc") {
                this.view.flxStatus.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortBalance.text + 'column. Sorted in Ascending order. Click to Sort in Descending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
            } else if (sortType === "desc") {
                this.view.flxStatus.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortBalance.text + ' column. Sorted in Descending order. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
            }
			this.view.flxSortDate.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortDate.text + 'column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				this.view.flxSendTo.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortDescription.text + 'column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				this.view.flxAmount.accessibilityConfig = {
                    "a11yLabel": this.view.lblSortAmount.text + ' column. No Sort applied. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                };
				if(!postshowflag)this.view.flxStatus.setActive(true);
			break;			
			}
            postshowflag = false;
			if(focusonDropdown){ 
			focusonDropdown =  false;
			this.view.flxFiltersList.setActive(true);
			
			}
        },
           /**
         * skip to main content in accessibility flow
         */
        onSkipNav: function() {
            this.view.lblPayABill.setActive(true);
        },
		onbtnByPassClick: function() {
            this.view.flxAddPayee.setActive(true);
        },

        /**
         * sorting history configurations
         */
        setHistorySorting: function() {
            var scopeObj = this;
            scopeObj.historySortMap = [{
                    name: 'transactionDate',
                    imageFlx: scopeObj.view.imgSortDate,
                    clickContainer: scopeObj.view.flxSortDate
                },
                {
                    name: 'nickName',
                    imageFlx: scopeObj.view.imgSortDescription,
                    clickContainer: scopeObj.view.flxSendTo
                },
                {
                    name: 'amount',
                    imageFlx: scopeObj.view.imgSortAmount,
                    clickContainer: scopeObj.view.flxAmount
                },
                {
                    name: 'statusDesc',
                    imageFlx: scopeObj.view.imgSortCategory,
                    clickContainer: scopeObj.view.flxStatus
                },
            ];
            FormControllerUtility.setSortingHandlers(scopeObj.historySortMap, scopeObj.onHistorySortClickHandler, scopeObj);
        },

        /**
         * used to set the actions
         */
        setTabActions: function() {
            this.view.btnAllPayees.onClick = this.loadAllPayees.bind(this);
            this.view.btnPayementDue.onClick = this.loadPayementDues.bind(this);
            this.view.btnScheduled.onClick = this.loadScheduleBills.bind(this);
            this.view.btnHistory.onClick = this.loadBillPayHistory.bind(this);
            this.view.btnManagePayee.onClick = this.loadManagePayees.bind(this);
            this.view.flxAddPayee.onClick = this.loadAddPayee.bind(this);
            this.view.flxMakeOneTimePayment.onClick = this.loadOneTimePayement.bind(this);
        },


        /**
         * setPagination:   used to set pagination.
         * @param {obejct} data list of records
         * @param {function} previousCallBack -- previous button handler
         * @param {function}  nextCallBack -- next button handler
         */
        setPagination: function(data, previousCallBack, nextCallBack) {
            var scopeObj = this;
            if (data && data.show === true) {
                this.view.flxPagination.setVisibility(true);
                var offset = data.offset;
                var limit = data.limit || OLBConstants.PAGING_ROWS_LIMIT;
                var recordsLength = data.recordsLength;
                CommonUtilities.setText(this.view.lblPagination, (offset + 1) + " - " + (offset + recordsLength) + " " + data.text, CommonUtilities.getaccessibilityConfig());
                if (data.offset > 0) {
                    scopeObj.view.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                    scopeObj.view.flxPaginationPrevious.accessibilityConfig ={
                        "a11yLabel": `Previous Page`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                    scopeObj.view.flxPaginationPrevious.onClick = previousCallBack;
                } else {
                    scopeObj.view.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                    scopeObj.view.flxPaginationPrevious.accessibilityConfig ={
                        "a11yLabel": `Previous Page disabled`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": -1
                        }
                    }
                    scopeObj.view.flxPaginationPrevious.onClick = null;
                }
                if (recordsLength >= OLBConstants.PAGING_ROWS_LIMIT) {
                    scopeObj.view.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                    scopeObj.view.flxPaginationNext.accessibilityConfig ={
                        "a11yLabel": `Next Page`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                    scopeObj.view.flxPaginationNext.onClick = nextCallBack;
                } else {
                    scopeObj.view.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                    scopeObj.view.flxPaginationNext.accessibilityConfig ={
                        "a11yLabel": `Next Page disabled`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": -1
                        }
                    }
                    scopeObj.view.flxPaginationNext.onClick = null;
                }
            } else {
                scopeObj.view.flxPagination.setVisibility(false);
                scopeObj.view.flxPaginationPrevious.onClick = null;
                scopeObj.view.flxPaginationNext.onClick = null;
            }
        },

        /**
         * On History sort Click handler
         * @param {object} event
         * @param {object} data
         */
        onHistorySortClickHandler: function(event, data) {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            scopeObj.presenter.fetchUserBillPayHistory(data);
        },

        /**
         * used to load the Bulk Payees
         */
        loadAllPayees: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "BulkPayees",
                loadBills: true
            });
        },

        /**
         * used to load the Due Payements
         */
        loadPayementDues: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "DueBills",
                loadBills: true
            });
        },

        /**
         * used to load the scheduled bills
         */
        loadScheduleBills: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "ScheduleBills",
                loadBills: true
            });
        },

        /**
         * used to load the bill pay history
         */
        loadBillPayHistory: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "History",
                loadBills: true
            });
        },

        /**
         * used to load the manage payees
         */
        loadManagePayees: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "ManagePayees",
                loadBills: true
            });
        },

        /**
         * used to load the Payee Module
         */
        loadAddPayee: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "AddPayee"
            });
        },

        /**
         * used to load the Payee Module
         */
        loadOneTimePayement: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "MakeOneTimePayment",
                callbackModelConfig: {
                    history: true
                }
            });
        },
        /**
         * executes and displays the error flex in landing page.
         * @param {boolean} isError used to display the flex
         * @param {object} erroObj  get the exact error mesage
         */
        setServerError: function(erroObj) {
            var scopeObj = this;
            scopeObj.view.flxDowntimeWarning.setVisibility(true);
            if (erroObj.errorMessage) {
                scopeObj.view.rtxDowntimeWarning.text = erroObj.errorMessage;
            } else {
                scopeObj.view.rtxDowntimeWarning.text = kony.i18n.getLocalizedString("i18n.common.OoopsServerError");
            }
            FormControllerUtility.hideProgressBar(scopeObj.view);
            scopeObj.view.forceLayout();
        },

        /**
         * used to load the  due payements
         * @param {object} billDueData due bills
         */
        bindTotalEbillAmountDue: function(dueBills) {
            var scopeObj = this;
            if (dueBills && dueBills.count === 0) {
                scopeObj.view.flxTotalEbillAmountDue.setVisibility(false);
            } else {
                scopeObj.view.flxTotalEbillAmountDue.setVisibility(true);
                CommonUtilities.setText(scopeObj.view.lblBills, dueBills.count + " " + kony.i18n.getLocalizedString("i18n.billPay.eBills"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEbillAmountDueValue, scopeObj.formatAmount(String(dueBills.totalDueAmount)), CommonUtilities.getaccessibilityConfig());
            }
            scopeObj.view.forceLayout();
        },

        /**
         * method to bind  billPay history data.
         * @param {object} data list of history records.
         */
        binduserBillPayHistory: function(data) { //, noofRecords, searchvisibility) {
            //data = { "billpayHistory": data.billpayHistory ? data.billpayHistory : data, "noofRecords": data.noOfRecords, "searchView": searchvisibility }
            var scopeObj = this;
            scopeObj.view.flxNoPayment.setVisibility(false);
            scopeObj.view.flxMainContainer.setVisibility(true);
            scopeObj.view.segmentBillpay.setVisibility(true);
            scopeObj.view.flxHorizontalLine1.setVisibility(true);
                scopeObj.view.flxHorizontalLine2.setVisibility(true);
            //if(configurationManager.isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                scopeObj.view.flxSearch.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    scopeObj.view.flxFiltersList.setVisibility(false);
                    scopeObj.view.flxtxtSearchandClearbtn.right = "3.5%";
                }
            } else {
                scopeObj.view.flxSearch.setVisibility(false);
            }
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                scopeObj.view.flxBillPayeeHistoryHeader.setVisibility(false);
            } else {
                scopeObj.view.flxBillPayeeHistoryHeader.setVisibility(true);
            }
            if (data.noMoreRecords) {
                this.view.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                this.view.flxPaginationNext.onClick = null;
                kony.ui.Alert(kony.i18n.getLocalizedString("i18n.navigation.norecordsfound"));
                return;
            }
            if (data.noHistory === true || !data.billpayHistory || data.billpayHistory.length === 0) {
                scopeObj.showNoPayementDetails({
                    noPaymentMessageI18Key: "i18n.billpay.noTransactionHistory"
                });
				if(focusonDropdown){ 
			focusonDropdown =  false;
			this.view.flxFiltersList.setActive(true);
			
			}
            }
            //             if (data.billpayHistory.noHistory === true || data.billpayHistory.length === 0) {
            //                 if(data.billpayHistory.noHistory === true) {
            //                     scopeObj.showNoPayementDetails({
            //                     noPaymentMessageI18Key: "i18n.billpay.noTransactionHistory"
            //                 });
            //                 scopeObj.view.flxSearch.setVisibility(false);
            //                 }
            //                 if(data.searchView && data.billpayHistory.length === 0) {
            //                     scopeObj.showNoPayementDetails({
            //                         noPaymentMessageI18Key: "i18n.PayAPerson.NoRecords"
            //                     });
            //                 }
            //             } 
            else {
                var dataMap = {
                    "lblIdentifier": "lblIdentifier",
                    "lblDropdown": "lblDropdown",
                    "flxDropdown": "flxDropdown",
                    "lblDate": "lblDate",
					"lblDateA": "lblDateA",
                    "flxSendToUser": "flxSendToUser",
                    "lblSendToUser": "lblSendToUser",
                    "lblSendTo": "lblSendTo",
					"lblSendToA": "lblSendToA",
                    "lblSortAmount": "lblSortAmount",
					"lblSortAmountA": "lblSortAmountA",
                    "lblSortBalance": "lblSortBalance",
					"lblSortBalanceA": "lblSortBalanceA",
                    "btnRepeat": "btnRepeat",
                    "lblRefrenceNumber": "lblRefrenceNumber",
                    "lblRefrenceNumberValue": "lblRefrenceNumberValue",
                    "flxSentFromUser": "flxSentFromUser",
                    "lblSentFromUser": "lblSentFromUser",
                    "lblSentFrom": "lblSentFrom",
                    "lblSentFromValue": "lblSentFromValue",
                    "lblNotes": "lblNotes",
                    "lblNotesValue": "lblNotesValue",
                    "btnEdit": "btnEdit",
                    "lblSeparator": "lblSeparator",
                    "lblSeperatorone": "lblSeperatorone",
                    "flxIdentifier": "flxIdentifier",
                    "lblSeparator2": "lblSeparator2",
                    "flxBillPaymentHistorySelected": "flxBillPaymentHistorySelected",
                    "flxBillPaymentHistorySelectedMobile": "flxBillPaymentHistorySelectedMobile",
					"flxBottom":"flxBottom"
                }
                var userbillPayHistory = data.billpayHistory.map(function(dataItem) {
                    dataItem.lastPaidDate = dataItem.transactionDate;
                    dataItem.RefrenceNumber = dataItem.referenceId;
                    dataItem.SentFrom = dataItem.fromAccountName;
                    dataItem.lastPaidAmount = scopeObj.formatAmount(dataItem.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency));
                    dataItem.Status = dataItem.statusDescription;
                    dataItem.Notes = dataItem.transactionsNotes || '';
                    dataItem.eBillStatus = dataItem.eBillEnable;
                    dataItem.billGeneratedDate = dataItem.billGeneratedDate;
                    dataItem.billDueDate = dataItem.billDueDate;
                    dataItem.dueAmount = scopeObj.formatAmount(dataItem.billDueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency));
                    dataItem.payeeNickname = dataItem.payeeNickName;
                    return {
						"RefrenceNumber":dataItem.RefrenceNumber,
                        "lblDropdown": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                        "flxDropdown": {						
                            onClick: scopeObj.handleSegmentRowView.bind(scopeObj),
							 "accessibilityConfig": {
                        "a11yLabel": "Show more details for reference number " + dataItem.referenceId,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": false
                        }
                    }
                        },
                        "lblIdentifier": {
                            "skin": "sknffffff15pxolbfonticons"
                        },
                        "flxIdentifier": {
                            "skin": "sknFlxIdentifier"
                        },
                        "lblSeparator": "A",
                        "lblSeperatorone": "A",
                        "lblSeparator2": "A",
                        "lblDate": {
                            "text": scopeObj.getDateFromDateString(dataItem.transactionDate, "YYYY-MM-DDTHH:MM:SS"),
                             "accessibilityConfig ": {
                                "a11yHidden": true
                            },
                        },
						  "lblDateA": {
                            "text": scopeObj.view.lblSortDate.text + " " +scopeObj.getDateFromDateString(dataItem.transactionDate, "YYYY-MM-DDTHH:MM:SS"),
                            "accessibilityconfig": {
                                "a11yLabel": scopeObj.view.lblSortDate.text + " " +scopeObj.getDateFromDateString(dataItem.transactionDate, "YYYY-MM-DDTHH:MM:SS")
                            }
                        },
                        "flxBillPaymentHistorySelected": {
                            "height": "50dp",
                            "skin": "sknflxffffffnoborder"
                        },
                        "flxBillPaymentHistorySelectedMobile": {
                            "height": "69dp",
                            "skin": "sknflxffffffnoborder"
                        },
                        "flxSendToUser": {
                            //"isVisible": (applicationManager.getConfigurationManager().isCombinedUser === "true") ? true : false
                            "isVisible": false, //this.profileAccess === "both" ? true : false,
                        },
                        "lblSendToUser": {
                            "isVisible": this.profileAccess === "both" ? true : false,
                            //"isVisible": (applicationManager.getConfigurationManager().isCombinedUser === "true") ? true : false,
                            "text": dataItem.isBusinessPayee === "1" ? "r" : "s",
                        },
                        "lblSendTo": {
                            "text": dataItem.payeeNickname,
                             "accessibilityConfig ": {
                                "a11yHidden": true
                            },
                        },
						"lblSendToA": {
                            "text": scopeObj.view.lblSortDescription.text+" "+dataItem.payeeNickname,
                            "accessibilityconfig": {
                                "a11yLabel": scopeObj.view.lblSortDescription.text+" "+dataItem.payeeNickname
                            }
                        },
                        "lblSortAmount": {
                            "text": dataItem.lastPaidAmount,
                            "accessibilityConfig ": {
                                "a11yHidden": true
                            },
                        },
						"lblSortAmountA": {
                            "text": scopeObj.view.lblSortAmount.text+" "+dataItem.lastPaidAmount,
                            "accessibilityconfig": {
                                "a11yLabel": scopeObj.view.lblSortAmount.text+" "+dataItem.lastPaidAmount
                            }
                        },
                        "lblSortBalance": {
                            "text": dataItem.Status,
                             "accessibilityConfig ": {
                                "a11yHidden": true
                            },
                        },
						 "lblSortBalanceA": {
                            "text": scopeObj.view.lblSortBalance.text+" "+dataItem.Status,
                            "accessibilityconfig": {
                                "a11yLabel": scopeObj.view.lblSortBalance.text+" "+dataItem.Status
                            }
                        },
                        "btnRepeat": {
                            "text": kony.i18n.getLocalizedString("i18n.accounts.repeat"),
                            "left": CommonUtilities.isMirrorLayoutEnabled() ? "15px" : "2px",
                            "onClick": function() {
                                dataItem.onCancel = function() {
                                    kony.mvc.getNavigationManager().navigate({
                                        context: this,
                                        callbackModelConfig: {
                                            history: true
                                        }
                                    });
                                };
                                scopeObj.presenter.showBillPaymentScreen({
                                    "sender": null,
                                    "context": 'PayABill',
                                    "loadBills": true,
                                    "data": dataItem
                                });
                            },
                            "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE"),
								 "accessibilityConfig": {
                        "a11yLabel": "Repeat payment for reference number" + dataItem.referenceId,
                        "a11yARIA": {
                            "role": "link",
                            "tabindex": 0
                        }
                    }
                        },
                        "lblRefrenceNumber": {
                            "text": kony.i18n.getLocalizedString("i18n.transfers.RefrenceNumber"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.RefrenceNumber")
                            }
                        },
                        "lblRefrenceNumberValue": {
                            "text": dataItem.RefrenceNumber,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.RefrenceNumber
                            }
                        },
                        "flxSentFromUser": {
                            "isVisible": scopeObj.profileAccess === "both" ? true : false,
                            //"isVisible": (applicationManager.getConfigurationManager().isCombinedUser === "true") ? true : false
                        },
                        "lblSentFromUser": {
                            "isVisible": scopeObj.profileAccess === "both" ? true : false,
                            //"isVisible": (applicationManager.getConfigurationManager().isCombinedUser === "true") ? true : false,
                            "text": scopeObj.presenter.isBusinessAccount(dataItem.fromAccountNumber) === "true" ? "r" : "s"
                        },
                        "lblSentFrom": {
                            "text": kony.i18n.getLocalizedString("i18n.billPay.sentFrom"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.billPay.sentFrom")
                            }
                        },
                        "lblSentFromValue": {
                            "text": CommonUtilities.getAccountDisplayName({
                                name: dataItem.fromAccountName,
                                accountID: dataItem.fromAccountNumber,
                                nickName: dataItem.fromNickName,
                                Account_id: dataItem.fromAccountNumber
                            }),
                            "accessibilityconfig": {
                                "a11yLabel": CommonUtilities.getAccountDisplayName({
                                    name: dataItem.fromAccountName,
                                    accountID: dataItem.fromAccountNumber,
                                    nickName: dataItem.fromNickName,
                                    Account_id: dataItem.fromAccountNumber
                                }),
                            }
                        },
                        "lblNotes": {
                            "text": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.Note")
                            }
                        },
                        "lblNotesValue": {
                            "text": dataItem.Notes ? dataItem.Notes : kony.i18n.getLocalizedString("i18n.common.none"),
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.Notes ? dataItem.Notes : kony.i18n.getLocalizedString("i18n.common.none")
                            }
                        },
                        "btnEdit": {
                            "text": kony.i18n.getLocalizedString("i18n.transfers.downloadReport"),
                            "right": CommonUtilities.isMirrorLayoutEnabled() ? "15px" : "",
                            "onClick": function() {
                                scopeObj.presenter.downloadTransactionReport(dataItem.RefrenceNumber);
                            },
                            "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE"),
							"accessibilityconfig": {
								  "a11yLabel":kony.i18n.getLocalizedString("i18n.transfers.downloadReport")+"for reference number"+dataItem.RefrenceNumber,
                                "a11yARIA": {
                            "role": "button",
                            "tabindex": -1
							}
                            }
                        },
						  "flxBottom":{
							  "accessibilityConfig ":{
								"a11yHidden": true
							  }
						},
                        "template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxBillPaymentHistorySelectedMobile" : "flxBillPaymentHistorySelected"
                    }
                });
                this.view.segmentBillpay.widgetDataMap = dataMap;
                CommonUtilities.setText(this.view.lblPagination, (data.noOfRecords.offset + 1) + " - " + (data.noOfRecords.offset + data.noOfRecords.limit) + " " + kony.i18n.getLocalizedString("i18n.common.transactions"), CommonUtilities.getaccessibilityConfig());
                this.view.segmentBillpay.setData(userbillPayHistory);
                this.setPagination({
                    'show': true,
                    'offset': data.noOfRecords.offset,
                    'limit': data.noOfRecords.limit,
                    'recordsLength': data.billpayHistory.length,
                    'text': kony.i18n.getLocalizedString("i18n.common.transactions")
                }, this.prevHistory, this.nextHistory);
                scopeObj.view.flxNoPayment.setVisibility(false);
				this.setAccessibilityConfigForSorting(data.noOfRecords.sortBy,data.noOfRecords.order);
                //                     if (searchView) {
                //                         this.view.flxPagination.setVisibility(false);
                //                         scopeObj.view.flxBillPayeeHistoryHeader.setVisibility(false);
                //                     } else {
                //                         scopeObj.view.txtSearch.text= "";
                //                         scopeObj.view.flxClearBtn.setVisibility(false);
                //                     }
            }
            //           if(data.noofRecords){
            // 					this.setPagination({
            //                     'show': true,
            //                     'offset': data.noofRecords.offset,
            //                     'limit': data.noofRecords.limit,
            //                     'recordsLength': data.billpayHistory.length,
            //                     'text': kony.i18n.getLocalizedString("i18n.common.transactions")
            // 					}, this.prevHistory, this.nextHistory);
            // 				}		
            // 				var searchView = data.searchView;
            // 				data = data.billpayHistory;
            //FormControllerUtility.hideProgressBar(this.view);
            scopeObj.view.forceLayout();
        },

        /*
         * method to display the types of payees list
         */
        onFiltersBtnClick: function() {
            this.view.accountTypesBillPayHistory.setVisibility(!this.view.accountTypesBillPayHistory.isVisible);
            this.view.accountTypesBillPayHistory.skin = "slfBoxffffffB1R5";
            this.view.accountTypesBillPayHistory.flxAccountTypesSegment.skin = "slfBoxffffffB1R5";
            // this.view.accountTypesBillPayHistory.segAccountTypes.rowSkin = "slfBoxffffffB1R5";
            var dropdownallylbl = this.view.accountTypesBillPayHistory.isVisible ? "Currently viewing " + this.view.lblType.text + ". Click here to hide list of views" : "Currently viewing " + this.view.lblType.text + ". Click here to show list of views";
            this.view.flxFiltersList.accessibilityConfig = {
                "a11yLabel": dropdownallylbl,
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0,
                    "aria-expanded": this.view.accountTypesBillPayHistory.isVisible
                }
            };
			this.view.flxFiltersList.setActive(true);
        },

        /*
         * Method to initialize search and filter actions
         */
        initializeSearchAndFilterActions: function(billpayHistorydata) {
            this.initializeFilterSegments();
            this.view.txtSearch.text = "";
            this.view.flxClearBtn.setVisibility(false);
            this.view.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, billpayHistorydata);
            this.view.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.txtSearch.onDone = this.onSearchBtnClick.bind(this, billpayHistorydata);
            this.view.btnConfirm.onClick = this.onSearchBtnClick.bind(this, billpayHistorydata);
            this.view.flxFiltersList.onClick = this.onFiltersBtnClick.bind(this);
			
            this.view.accountTypesBillPayHistory.segAccountTypes.onRowClick = this.onFilterSelection.bind(this, billpayHistorydata);
            //this.view.accountTypesBillPaySchedule.segAccountTypes.onRowClick = function(eventobject, sectionIndex, rowIndex){     
            //this.onFilterSelection(eventobject, sectionIndex, rowIndex, scheduledBills);
            //}.bind(this);
        },

        /*
         * Method to add data to filter segment
         */
        initializeFilterSegments: function() {
            // this.view.a = this.view.LisiBox1.masterData[0]; 

            //this.view.accountTypesBillPaySchedule.setVisibility(true);
            var data = [
                {
                    "flxAccountTypes":{
                        "height":"40dp",
						 "onKeyPress": this.onSegKeyPressCallBack,
                    "accessibilityConfig": {
                        "a11yLabel": `All Payees`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                    },
                    "lblSeparator":{
                        "text":"lblSeparator",
                        "isVisible":true
                    },
                    "lblUsers": {
                        "text":"All Payees",
                        "left":"10dp"
                    }
                },
                {
                    "flxAccountTypes":{
                        "height":"40dp",
							 "onKeyPress": this.onSegKeyPressCallBack,
                    "accessibilityConfig": {
                        "a11yLabel": "Personal Payees",
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                    },
                    "lblSeparator":{
                        "text":"lblSeparator",
                        "isVisible":true
                    },
                    "lblUsers": {
                        "text":"Personal Payees",
                        "left":"10dp"
                    }
                },
                {
                    "flxAccountTypes":{
                        "height":"40dp",
							 "onKeyPress": this.onSegKeyPressCallBack,
                    "accessibilityConfig": {
                        "a11yLabel": "Business Payees",
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                    },
                    "lblSeparator":{
                        "text":"lblSeparator",
                        "isVisible":true
                    },
                    "lblUsers": {
                        "text":"Business Payees",
                        "left":"10dp"
                    }
                }
            ];
            this.view.accountTypesBillPayHistory.segAccountTypes.widgetDataMap = {
                "lblUsers": "lblUsers",
                "flxAccountTypes":"flxAccountTypes",
                "lblSeparator":"lblSeparator"
            };
            this.view.accountTypesBillPayHistory.height="120dp";
            this.view.accountTypesBillPayHistory.segAccountTypes.setData(data);
            this.view.lblType.text = this.view.accountTypesBillPayHistory.segAccountTypes.data[0].lblUsers.text;
			//this.view.flxFiltersList.setActive(true);
        },

        onSegKeyPressCallBack: function (eventObject, eventPayload, context) {
            var scopeObj = this;
			if (eventPayload.keyCode === 13) focusonDropdown =true;// so that focus remains in the dropdown only
            //Esc Key
            if (eventPayload.keyCode === 27) {
                scopeObj.view.accountTypesBillPayHistory.setVisibility(false);
               
                scopeObj.view.flxFiltersList.accessibilityConfig = {
                    "a11yLabel": "Currently viewing " + this.view.lblType.text + ". Click here to show list of views",
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": false
                    }
                };
            }
            //Tab key
            else if (eventPayload.keyCode === 9) {
                //Shift + Tab key
                if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                    eventPayload.preventDefault();
                    if (context.rowIndex === 1) {
                        context.widgetInfo.setActive(0, 0, "flxAccountTypes")
                    } else if (context.rowIndex === 2) {
                        context.widgetInfo.setActive(1, 0, "flxAccountTypes")
                    } else if (context.rowIndex === 3) {
                        context.widgetInfo.setActive(2, 0, "flxAccountTypes")
                    }
                    if (context.rowIndex === 0 && context.sectionIndex === 0) {
                        scopeObj.view.accountTypesBillPayHistory.setVisibility(false);
                        scopeObj.view.flxFiltersList.accessibilityConfig = {
                            "a11yLabel": "Currently viewing " + this.view.lblType.text + ". Click here to show list of views",
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        };
                        scopeObj.view.flxFiltersList.setActive(true);
                    }
                }
                else if (context.rowIndex === context.widgetInfo.data.length - 1) {
                    scopeObj.view.accountTypesBillPayHistory.setVisibility(false);
                    
                    scopeObj.view.flxFiltersList.accessibilityConfig = {
                        "a11yLabel": "Currently viewing " + this.view.lblType.text + ". Click here to show list of views",
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": false
                        }
                    };
					scopeObj.view.flxFiltersList.setActive(true);
                }
            }
			if(!scopeObj.view.accountTypesBillPayHistory.isVisible) scopeObj.view.flxFiltersList.setActive(true);
        },
        /*
         * Method to process segment ui based on selected filter
         */
        onFilterSelection: function(dataItem) {
            var scopeObj = this;
            //var segData = this.view.accountTypesBillPaySchedule.segAccountTypes.data;
            billpayHistory = dataItem.billpayHistory;
            this.view.accountTypesBillPayHistory.setVisibility(false);
            scopeObj.view.flxFiltersList.accessibilityConfig = {
                "a11yLabel": "Currently viewing " + this.view.lblType.text + ". Click here to show list of views",
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0,
                    "aria-expanded": false
                }
            };
            var data = scopeObj.getSearchAndFilterData(billpayHistory);
            this.binduserBillPayHistory({
                billpayHistory: data,
                noOfRecords: dataItem.noOfRecords
            });
            scopeObj.view.forceLayout();
        },
        /**
         * method used to enable or disable the clear button.
         */
        onTxtSearchKeyUp: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.flxClearBtn.setVisibility(true);
            } else {
                scopeObj.view.flxClearBtn.setVisibility(false);
            }
            this.view.flxtxtSearchandClearbtn.forceLayout();
        },
        /**
         * method used to clear search
         */
        onSearchClearBtnClick: function(billpayHistorydata) {
            var scopeObj = this;
            scopeObj.view.txtSearch.text = "";
            scopeObj.view.flxClearBtn.setVisibility(false);
            this.binduserBillPayHistory(billpayHistorydata); 
			scopeObj.view.txtSearch.setActive(true);			
        },
        /**
         * method to handle the search account functionality
         */
        onSearchBtnClick: function(dataItem) {
            var scopeObj = this;
            billpayHistory = dataItem.billpayHistory;
            var data = scopeObj.getSearchAndFilterData(billpayHistory);
            this.binduserBillPayHistory({
                billpayHistory: data,
                noOfRecords: dataItem.noOfRecords
            });
            scopeObj.view.forceLayout();
        },
        /**
         * method to get data from search and filter values
         */
        getSearchAndFilterData: function(billpayHistory) {
            var scopeObj = this;
            var selectedAccountType = this.view.accountTypesBillPayHistory.segAccountTypes.selectedRowItems;
            this.view.lblType.text = (selectedAccountType !== null && selectedAccountType.length !== 0) ? selectedAccountType[0].lblUsers.text : this.view.accountTypesBillPayHistory.segAccountTypes.data[0].lblUsers.text;
            var filterQuery = this.view.lblType.text;
			this.view.flxFiltersList.accessibilityConfig = {
                "a11yLabel": "Currently viewing " + filterQuery + ". Click here to show list of views",
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0,
                    "aria-expanded": false
                }
            };
            var searchQuery = scopeObj.view.txtSearch.text.trim();

            if (filterQuery.includes("All Payees")) {
                var accountlist = [];
                accountlist = billpayHistory;
                //all accounts will be shown      
            } else if (filterQuery.includes("Personal Payees")) {
                //        accounts = accounts.filter(accounts.type==="Individual");
                var accountlist = [];
                for (i = 0; i < billpayHistory.length; i++) {
                    if (billpayHistory[i].isBusinessPayee === "0") {
                        accountlist.push(billpayHistory[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                billpayHistory = accountlist;
            } else if (filterQuery.includes("Business Payees")) {
                //accounts = accounts.filter(this.isBusinessAccount);
                var accountlist = [];
                for (i = 0; i < billpayHistory.length; i++) {
                    if (billpayHistory[i].isBusinessPayee === "1") {
                        accountlist.push(billpayHistory[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                billpayHistory = accountlist;
            }

            // var data = scopeObj.getDataWithSections(accounts);
            if (searchQuery !== "") {
                var data = billpayHistory;
                var searchresults = [];
                if (!kony.sdk.isNullOrUndefined(searchQuery) && searchQuery !== "") {

                    var j = 0;
                    for (var i = 0; i < data.length; i++) {
                        var rowdata = null;
                        if ((data[i].amount && data[i].amount.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                            (data[i].payeeName && data[i].payeeName.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                            (data[i].statusDescription && data[i].statusDescription.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)) {
                            rowdata = data[i];
                        }
                        if (kony.sdk.isNullOrUndefined(rowdata)) {
                            //data[i][1][0].flxAccountsRowWrapper["isVisible"] = false;
                            //data[i][1][0].flxNoResultsFound["isVisible"] = true;
                            data[i].isNoRecords = true;
                            data[i].lblNoResultsFound = {
                                "text": kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound")
                            };
                            var noRecordsData = data[i];
                            //data[i] = [];
                            if (data[i].isNoRecords === false) {
                                searchresults[j].push(noRecordsData);
                                j++;
                            }
                        } else {
                            //data[i] = [];
                            searchresults[j] = rowdata;
                            j++;
                        }
                    }
                }
                return searchresults;
            } else {
                return billpayHistory;
            }
        },
        /**
         * previous history
         */
        prevHistory: function() {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            scopeObj.presenter.fetchPreviousUserBillPayHistory();
        },
        /**
         * next history
         */
        nextHistory: function() {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            scopeObj.presenter.fetchNextUserBillPayHistory();
        },
        /**
         * used to format the amount
         * @param {string} amount amount
         * @param {boolean} currencySymbolNotRequired currency symbol required
         * @returns {string} formated amount
         */
        formatAmount: function(amount, currencySymbolNotRequired, currencySymbol) {
            if (currencySymbolNotRequired) {
                return applicationManager.getFormatUtilManager().formatAmount(amount);
            } else {
                return applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(amount, currencySymbol);
            }
        },
        /**
         * used to show the no payees flow.
         * @param {message} message used to show the no message message on the page
         */
        showNoPayementDetails: function(message) {
            var scopeObj = this;
            if (message) {
                scopeObj.view.flxNoPayment.setVisibility(true);
                scopeObj.view.segmentBillpay.setVisibility(false);
                scopeObj.view.flxHorizontalLine1.setVisibility(false);
                scopeObj.view.flxHorizontalLine2.setVisibility(false);
                scopeObj.view.flxBillPayeeHistoryHeader.setVisibility(false);
                scopeObj.setPagination({
                    show: false
                });
                scopeObj.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString(message.noPaymentMessageI18Key);
            }
        },
        /**
         * used to convert the CalenderFormat Date
         * @param {String} dateString string formated date
         * @param {string} inputFormat input format
         * @returns {string} outputDate output date
         */
        getDateFromDateString: function(dateString, inputFormat) {
            var fu = applicationManager.getFormatUtilManager();
            var dateObj = fu.getDateObjectfromString(dateString, inputFormat);
            var outputDate = fu.getFormatedDateString(dateObj, fu.getApplicationDateFormat());
            return outputDate;
        },
        /**
         * used to show the permission based UI
         */
        showAllCreatePayeeOptions: function() {
            this.view.btnAllPayees.setVisibility(true);
            this.view.btnPayementDue.setVisibility(true);
            this.view.btnScheduled.setVisibility(true);
            this.view.flxMakeOneTimePayment.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideAllCreatePayeeOptions: function() {
            this.view.btnAllPayees.setVisibility(false);
            this.view.btnPayementDue.setVisibility(false);
            this.view.btnScheduled.setVisibility(false);
            this.view.flxMakeOneTimePayment.setVisibility(false);
        },
        /**
         * used to show the permission based UI
         */
        showAddPayeeOption: function() {
            this.view.flxAddPayee.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideAddPayeeOption: function() {
            this.view.flxAddPayee.setVisibility(false);
        },
        /**
         * used to show the permission based UI
         */
        showManagePayeeOption: function() {
            this.view.btnManagePayee.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideManagePayeeOption: function() {
            this.view.btnManagePayee.setVisibility(false);
        },
        /**
         * used to show the permission based UI
         */
        showHistoryOption: function() {
            this.view.btnHistory.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideHistoryOption: function() {
            this.view.btnHistory.setVisibility(false);
        },
        /**
         * Method to handle the segment row view on click of dropdown
         */
        handleSegmentRowView: function () {
            var scopeObj = this;
            const rowIndex = scopeObj.view.segmentBillpay.selectedRowIndex[1];
            const data = scopeObj.view.segmentBillpay.data;
            var pre_val;
            var requiredView = [];
            const collapsedView = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", { "Mobile": "69dp", "Default": "50dp" }, "sknflxffffffnoborder"];
            const expandedView = ["P", true, "sknflxBg4a90e2op100NoBorder", "sknSSP4176a415px", { "Mobile": "310dp", "Default": "145dp" }, "sknFlxfbfbfb"];
            if (previous_index_history === rowIndex) {
                requiredView = data[rowIndex].lblDropdown === "P" ? collapsedView : expandedView;
                this.toggleSegmentRowView(rowIndex, requiredView, requiredView === collapsedView ? 0 : 1);
            } else {
                if (previous_index_history >= 0) {
                    pre_val = previous_index_history;
                    this.toggleSegmentRowView(pre_val, collapsedView,0);
                }
                pre_val = rowIndex;
                this.toggleSegmentRowView(rowIndex, expandedView,1);
            }
            previous_index_history = rowIndex;
        },
        /**
         * Method to toggle the segment row view
         * @param {Number} index - index of segment row to toggle
         * @param {Array} viewData - data which need to be assigned to toggled view
         */
        toggleSegmentRowView: function (index, viewData,viewtype) {
            var scopeObj = this;
            var data = scopeObj.view.segmentBillpay.data;
            data[index].lblDropdown = viewData[0];
            data[index].flxIdentifier.isVisible = viewData[1];
            data[index].flxIdentifier.skin = viewData[2];
            data[index].lblIdentifier.skin = viewData[3];
            data[index].flxBillPaymentHistorySelected.height = viewData[4]['Default'];
            data[index].flxBillPaymentHistorySelected.skin = viewData[5];
            data[index].flxBillPaymentHistorySelectedMobile.height = viewData[4]['Mobile'];
            data[index].flxBillPaymentHistorySelectedMobile.skin = viewData[5];
			 if (viewtype == 1) {
			data[index].flxDropdown.accessibilityConfig =  {
                        "a11yLabel": "hide details for reference number " + data[index].RefrenceNumber,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": true
                        }
                    };
					 data[index].flxBottom.accessibilityConfig = {
                    "a11yHidden": false
                };
				data[index].btnEdit.accessibilityConfig = {
					"a11yLabel":kony.i18n.getLocalizedString("i18n.transfers.downloadReport")+"for reference number"+data[index].RefrenceNumber,
                                "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
				};
			}else{
				data[index].flxDropdown.accessibilityConfig =  {
                        "a11yLabel": "Show more details for reference number " + data[index].RefrenceNumber,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": false
                        }
                    };
					data[index].flxBottom.accessibilityConfig = {
                    "a11yHidden": true
                };
				data[index].btnEdit.accessibilityConfig = {
					"a11yLabel":kony.i18n.getLocalizedString("i18n.transfers.downloadReport")+"for reference number"+data[index].RefrenceNumber,
                                "a11yARIA": {
                            "role": "button",
                            "tabindex": -1
                        }
				};
			}
			
            scopeObj.view.segmentBillpay.setDataAt(data[index], index);
			kony.application.getCurrentForm().segmentBillpay.setActive(index, 0, 'flxBillPaymentHistorySelected.flxDropdown');
        }

    };
});