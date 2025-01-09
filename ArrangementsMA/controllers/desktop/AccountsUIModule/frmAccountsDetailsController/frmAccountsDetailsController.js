var downloadflag = 0;
var downloadSearchResult;
var frontImageView = "",
    backImageView = "",
    frontImageDownload = "",
    backImageDownload = "",
    draftImage = "",
    draftDownload = "",
    externalDownload = "",
    externalImage = "";
var accountDetailsGlobal;
var context = {};
var fileNames = [];
var transactionObject = {};
var isMortgage = false;
var accountType = "";
var quickLinksCount = 0;
var sweepID = '';
var searchPerformed = false;
define("ArrangementsMA/AccountsUIModule/userfrmAccountsDetailsController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility', 'CacheUtils'], function(CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility, CacheUtils) {
    var orientationHandler = new OrientationHandler();
    return {
        transactionsTemplate: "",
        transactionsSelectedTemplate: "",
        checkImagesTemplate: "",
        accountType: "",
		fileName: "",
        accountSummaryLoaded: false,
        transactionListLoaded: false,
        isSingleCustomerProfile: true,
        primaryCustomerId: [],
        profileAccess: "",
		transactionList: [],
        selectedTab: "Posted",
        transactionListdata: null,
        landingSelectedAccount: "",
        account: "",
		offset:0,
        lastRecord:'',
      	criteria: [],
        blockedFundsData : [],
        summaryOnClick: false,
        //isAccountTypeOpen: false,
        //isMoreActionOpen: false,
        onNavigate: function(params) {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule').presentationController.updateCurrentAccount(params);
            if (!params) {
                params = {};
            }
            this.landingSelectedAccount = params.accountID;
            params.entitlement = {};
            params.entitlement.features = applicationManager.getConfigurationManager().getUserFeatures();
            var userPermissionsList = applicationManager.getConfigurationManager().getUserPermissions();
            if(typeof(userPermissionsList)==="string"){
                userPermissionsList = JSON.parse(userPermissionsList);
            }
            var userPermissions = Array.from(userPermissionsList);
            var accountLevelPerm = [];
            if (params.hasOwnProperty("actions")) {
                accountLevelPerm = params.actions;
            }
            var permissionList = ["VIEW_LOAN_SCHEDULE", "VIEW_INSTALLMENT_SUMMARY","CLOSE_ACCOUNT-CREATE"];
            for (var i = 0; i < permissionList.length; i++) {
                if (!accountLevelPerm.includes(permissionList[i])) {
                    const index = userPermissions.indexOf(permissionList[i]);
                    if (index > -1) {
                        userPermissions.splice(index,1);
                    }
                }
            }
            params.entitlement.permissions = userPermissions;
            this.context = params;
            if (applicationManager.getConfigurationManager().getDeploymentGeography() == "US") {
                params.regionSpecification = [{
                    "label": "Routing Number:",
                    "value": "routingNumber"
                }];
            } else {
                params.regionSpecification = [{
                    "label": "IBAN:",
                    "value": "IBAN"
                }];
            }
            if (params && params.hasOwnProperty("availableBalance") && params.availableBalance) {
                params.availableBalanceValue = params.availableBalanace;
            }
            if (params && params.hasOwnProperty("isBusinessAccount") && params.isBusinessAccount == "true") {
                params.nameSpecification = [{
                    "label": "Company Name:",
                    "value": "MembershipName"
                }];
            } else {
                params.nameSpecification = [{
                    "label": "Customer Name:",
                    "value": "accountHolder.fullname"
                }];
            }
            params.customerId = applicationManager.getUserPreferencesManager().getUserObj().userId;
            params.transactionsCount = applicationManager.getConfigurationManager().transactionsCount;
            this.accountSummaryLoaded = false;
            this.summaryOnClick = false;
            this.transactionListLoaded = false;
            accountDetailsGlobal = params;
            this.account = params;
         //   this.view.accountTransactionList.setContext(params);
            this.setUpNewQuickLinks(params);
            this.view.summary.setContext(params);
            //right side actions components
            var scopeObj = this;
            this.updatePrimaryActions(params, scopeObj);
            this.updateQuicklinksMobileActions(params, scopeObj);
            if (params.accountType === "CreditCard" || params.accountType === "Checking" || params.accountType === "Savings" || params.accountType === kony.i18n.getLocalizedString("i18n.accounts.savings") || params.accountType === kony.i18n.getLocalizedString("i18n.accounts.checking") || params.accountType === kony.i18n.getLocalizedString("i18n.accounts.creditCard")) {
                this.updateSecondaryActions(params, scopeObj);
                // scopeObj.view.flxSecondaryActions.setVisibility(true);
              	if(scopeObj.view.quicklinks.isVisible === true)
                  scopeObj.view.flxSecondaryActions.top = "20dp";
              	else
                  scopeObj.view.flxSecondaryActions.top = "0dp";
            } else {
                scopeObj.view.flxSecondaryActions.setVisibility(false); //scopeObj.view.quicklinksHid.setVisibility(false);  
            }
            if (!kony.sdk.isNullOrUndefined(params.accountStatus) && params.accountStatus.toUpperCase() == "CLOSED") {
                finalParam = [{
                    "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewStatements",
                        "context": "",
                        "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                }]
                scopeObj.view.quicklinks.setContext(finalParam);
                scopeObj.view.flxSecondaryActions.setVisibility(false);
                // scopeObj.view.quicklinks.setVisibility(true);
            }
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("frmConfirmClosure", params);
            this.accountType = params.accountType;
            if (this.accountType === "mortgageFacility") {
                this.isMortgage = true;
            }
            this.view.flxHeading.setVisibility(true);
        },
        /**
         * Method to patch update any section of form
         * @param {Object} uiData Data for updating form sections
         */
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
                if (uiData.frontDownload) {
                    frontImageDownload = uiData.frontDownload;
                }
                if(uiData.bankDate){
                    this.bankDate = uiData.bankDate;
                    this.setCalenderDate(uiData.bankDate["currentWorkingDate"])
                }
                if (uiData.backDownload) {
                    backImageDownload = uiData.backDownload;
                }
                if (uiData.draftDownload) {
                    draftDownload = uiData.draftDownload;
                }
                if (uiData.isSweeps) {
                    this.showSweepError(uiData.isSweeps)
                }
                if (uiData.frontImage) {
                    frontImageView = uiData.frontImage;
                    if (frontImageView !== "" && backImageView !== "") this.showCheckImage(transaction, frontImageView, backImageView, transaction.transactionDate, transaction.amount, transaction.memo, transaction.transactionType);
                }
                if (uiData.backImage) {
                    backImageView = uiData.backImage;
                    if (frontImageView !== "" && backImageView !== "") this.showCheckImage(transaction, frontImageView, backImageView, transaction.transactionDate, transaction.amount, transaction.memo, transaction.transactionType);
                }
                if (uiData.externalDownload) {
                    this.externalDownload = uiData.externalDownload;
                }
                if (uiData.externalImage) {
                    this.externalImage = uiData.externalImage;
                }
                if (uiData.draftImage) {
                    draftImage = uiData.draftImage;
                    this.showCheckImage(transaction, transaction.frontImage1, transaction.backImage1, transaction.transactionDate, transaction.amount, transaction.memo, transaction.transactionType);
                }
                if (uiData.showOnServerError) {
                    if(uiData.errorMessage){
                        if(uiData.errorMessage.serverErrorRes && uiData.errorMessage.serverErrorRes.opstatus === 1234){
                            this.showAdhocStatementDownloadMessage(uiData.errorMessage.serverErrorRes.errmsg);
                        }else{
                            this.showServerError(uiData.showOnServerError)
                        }
                    }else{
                        this.showServerError(uiData.showOnServerError)
                    }
                }
                 if (uiData.accountList) {
					 var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "appName": "HomepageMA",
                        "moduleName": "AccountsUIModule"
					 });
					 var custDashboard = accountsModule.presentationController.customerdashboard;
					 var accounts = null;
					 if (custDashboard === "true") {
                        var customeraccounts = accountsModule.presentationController.customeraccounts;
						this.updateAccountList(customeraccounts);
					 } else {
						this.updateAccountList(uiData.accountList);
					 }
                }
                if (uiData.accountDetails) {
                    this.accountType = uiData.accountDetails.accountType;
                    this.showAccountSummary();
                    this.showAccountDetailsScreen();
                    this.updateAccountTransactionsTypeSelector(uiData.accountDetails.accountType).call(this);
                    this.updateAccountDetails(uiData.accountDetails);
                    this.updateAccountInfo(uiData.accountDetails);
                    //this.setSecondayActions(uiData.accountDetails); //Set Secondary actions
                    //this.setRightSideActions(uiData.accountDetails);
                }
                if (uiData.transactionDetails) {
                    this.hideSearchFlex();
                 //   this.highlightTransactionType(uiData.transactionDetails.dataInputs.transactionType);
                  	this.selectedTab = "Posted";
                  	this.updateTransactions(uiData.transactionDetails);
					this.transactionListdata = uiData.transactionDetails;
                    this.updatePaginationBar(uiData.transactionDetails);
                    FormControllerUtility.setSortingHandlers(this.transactionsSortMap, this.onTransactionsSortClickHandler, this);
                    FormControllerUtility.updateSortFlex(this.transactionsSortMap, uiData.transactionDetails.dataInputs.sortConfig);
                }
				if (uiData.blockedFunds) {
                    this.hideSearchFlex();
                    //    this.highlightTransactionType(uiData.transactionDetails.dataInputs.transactionType);
                    this.updateBlockedTransactions(uiData.blockedFunds);
                    this.blockTransListdata = uiData.blockedFunds;
                    //   this.updatePaginationBar(uiData.blockedFunds);
                    //   FormControllerUtility.setSortingHandlers(this.transactionsSortMap, this.onTransactionsSortClickHandler, this);
                    //   FormControllerUtility.updateSortFlex(this.transactionsSortMap, uiData.transactionDetails.dataInputs.sortConfig);
                }
                if (uiData.loanSchedule) {
                  	this.loanScheduledata = uiData.loanSchedule;
					if (this.loanScheduledata.loanTransactions !== undefined) {
						var loanSchedules = this.loanScheduledata.loanTransactions;
					} else {
						var loanSchedules = this.loanScheduledata
					}
                    if (loanSchedules && loanSchedules.length > 0) {
                      this.cacheUtils.setData(loanSchedules);
                      this.cacheUtils.applySorting("paymentDate", "desc");
                      this.updateLoanTransactions(this.cacheUtils._sortedData);
                    }else
                      this.updateLoanTransactions(loanSchedules);
                }
                if (uiData.noMoreRecords) {
                    this.showNoMoreRecords()
                }
                if (uiData.searchTransactions) {
                    this.showSearchedTransaction(uiData.searchTransactions);
                    this.updateSearchTransactionView()
                }
                if (uiData.estatement) {
                    this.showViewStatements(uiData.estatement.account)
                    this.initViewStatements(uiData.estatement)
                    if (uiData.showCombinedStatements) {
                        this.checkDownloadStatusOfCombinedStatement();
                    }
                }
                if (uiData.showDownloadStatement) {
                    this.downloadUrl(uiData.showDownloadStatement);
                }
                if (uiData.transactionDownloadFile) {
                    this.downLoadTransactionFile(uiData.transactionDownloadFile)
                }
				if (uiData.transactionAttachmentFile) {
                    this.fileName = uiData.transactionAttachmentFile.match(/fileName=([^&]+)/)[1];
                    this.downLoadAttachmentFile(uiData.transactionAttachmentFile)
                }
                if (uiData.campaign) {
                    CampaignUtility.showCampaign(uiData.campaign, this.view, "flxMainWrapper");
                }
                if (uiData.fileIdEstatements) {
                    this.statementsURL(uiData.fileIdEstatements, uiData.fileName);
                }
                if (uiData.combinedstatements) {
                    this.combinedstatementsURL(uiData.combinedstatements);
                }
            }
        },
        /**
         * Method to load and return Messages and Alerts Module.
         * @returns {object} Messages and Alerts Module object.
         */
        loadAccountModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
        },
        /**
         * Method to initialize frmAccountDetails
         */
        initFrmAccountDetails: function() {
            var self = this;
            var formatUtil = applicationManager.getFormatUtilManager();
          	let defaultParams = {
              "sortBy": "desc", //this.criteria["sortBy"],
              "pageSize": applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage'),
              "onUpdate" : this.cacheCallBack,
              "filterParam": "transactionType",
              "filterValue": "All",
              "sortOrder": "desc",
              //   "segregationTypes" : this.transactionListTypes,
              //   "segregationField" : this._segregationDecider
			};
          	this.cacheUtils = new CacheUtils(defaultParams);
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            this.transactionsSortMap = [{
                name: 'transactionDate',
                imageFlx: this.view.transactions.imgSortDate,
                clickContainer: this.view.transactions.flxSortDate
            }, {
                name: 'amount',
                imageFlx: this.view.transactions.imgSortAmount,
                clickContainer: this.view.transactions.flxSortAmount
            }];
            this.view.transactions.imgSortType.setVisibility(false);
            this.view.transactions.imgSortDescription.setVisibility(false);
            this.view.transactions.imgSortBalance.setVisibility(false);
            this.view.flxCloseDowntimeWarning.onClick = function() {
                self.showServerError(false);
                self.updateRightContainerUI();
            };
             this.view.flxCloseAdhoc.onClick = function() {
                self.view.flxAdhocLink.setVisibility(false);
                self.view.flxBackNavigation.top = "-8dp";
                self.updateRightContainerUI();
            };
            var today = new Date();
            this.searchViewModel = {
                searchPerformed: false,
                visible: false,
                searchResults: [],
                keyword: '',
                transactionTypes: self.objectToListBoxArray(self.transactionTypes),
                transactionTypeSelected: OLBConstants.BOTH,
                timePeriods: self.objectToListBoxArray(self.timePeriods),
                timePeriodSelected: "CHOOSE_TIME_RANGE",
                fromCheckNumber: '',
                toCheckNumber: '',
                fromAmount: '',
                toAmount: '',
                fromDate: [today.getDate(), today.getMonth() + 1, today.getFullYear()],
                toDate: [today.getDate(), today.getMonth() + 1, today.getFullYear()]
            };
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            this.view.transactions.txtAmountRangeFrom.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
            this.view.transactions.txtAmountRangeTo.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
            this.view.summary.onError = function(errorObject) {
                //your code
            }
        },
        /**  Returns height of the page
         * @returns {String} height height of the page
         */
        getPageHeight: function() {
            var height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT;
            return height + ViewConstants.POSITIONAL_VALUES.DP;
        },
        /**
         * Method that gets called on preshow of frmAccountDetails
         */
        preshowFrmAccountDetails: function() {
            //this.view.summary.height ="218px";
            this.view.flxMain.zIndex = 2;
            this.performTransactionSearch = false;
            this.view.btnAdhocClick.onClick = this.navigationToAdhocStatements;
            this.view.flxAdhocLink.setVisibility(false);
            
            this.view.flxSecondaryActions.setVisibility(false);
            this.view.quicklinks.setVisibility(false);
            this.performBlockedSearch = false ;
            this.accountCurrency = "$";
            this.searchData = [];
            this.isNextFlow= false;
            this.renderSearchUI(false);
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "ArrangementsMA",
                "moduleName": "AccountsUIModule"
            });
            accountsModule.presentationController.getBankDate();
            this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            var scopeObj = this;
            isAccountTypeOpen = false;
            isMoreActionOpen = false;
            var params = {};
            //var tokenParams = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.security_attributes;
            params.entitlement = {};
            params.entitlement.features = applicationManager.getConfigurationManager().getUserFeatures();
            var userPermissionsList = applicationManager.getConfigurationManager().getUserPermissions();
            if(typeof(userPermissionsList)==="string"){
                userPermissionsList = JSON.parse(userPermissionsList);
            }
            var userPermissions = Array.from(userPermissionsList);
            var accountLevelPerm = [];
            if (accountDetailsGlobal.hasOwnProperty("actions")) {
                accountLevelPerm = accountDetailsGlobal.actions;
            }
            var permissionList = ["VIEW_LOAN_SCHEDULE", "VIEW_INSTALLMENT_SUMMARY","CLOSE_ACCOUNT-CREATE"];
            for (var i = 0; i < permissionList.length; i++) {
                if (!accountLevelPerm.includes(permissionList[i])) {
                    const index = userPermissions.indexOf(permissionList[i]);
                    if (index > -1) {
                        userPermissions.splice(index,1);
                    }
                }
            }
            params.entitlement.permissions = userPermissions;
            scopeObj.view.quicklinks.setParentScopeAndEntitlements(scopeObj, params.entitlement);
            scopeObj.view.quicklinks.onError = this.onError;
            scopeObj.view.quicklinksHid.setParentScopeAndEntitlements(scopeObj, params.entitlement);
            scopeObj.view.quicklinksHid.onError = scopeObj.onError;
            scopeObj.view.quicklinksMobile.setParentScopeAndEntitlements(scopeObj, params.entitlement);
            scopeObj.view.quicklinksMobile.onError = this.onError;
         //   scopeObj.view.accountTransactionList.downloadTransactionList = this.showDownloadPopup;
         //   scopeObj.view.accountTransactionList.printTransactionList = this.onComponentClickPrint;
         //   scopeObj.view.accountTransactionList.contextualActionButtonOnClick = this.getContextualData;
            this.view.viewStatementsnew.btnCombinedStatements.onClick = this.showCombinedStatement;
            this.view.viewStatementsnew.btnEStatements.onClick = this.showEStatement;
            this.resetSearchFields();
         /*   scopeObj.view.accountTransactionList.onError = function() {
                FormControllerUtility.hideProgressBar(this.view);
            };
            scopeObj.view.accountTransactionList.requestStart = function() {
                FormControllerUtility.showProgressBar(this.view);
            };
            scopeObj.view.accountTransactionList.requestEnd = function() {
                scopeObj.transactionListLoaded = true;
                scopeObj.callHideLoadingIndicator();
            };*/
            scopeObj.view.summary.requestStart = function() {
                //Loading start
            };
            scopeObj.view.summary.requestEnd = function() {
                scopeObj.accountSummaryLoaded = true;
                scopeObj.callHideLoadingIndicator();
            };
            scopeObj.view.btnCancelSearch.onClick = function() {
                scopeObj.view.flxAdvanceSearch.setVisibility(false);
                scopeObj.view.flxSearch.setActive(true);
            };
            scopeObj.view.flxSearch.onClick = function() {
               
                scopeObj.view.flxAdvanceSearch.setVisibility(true);
                scopeObj.resetSearchFields();
                scopeObj.view.lblHeading.setActive(true);
            };
            scopeObj.view.lstbxTimePeriod.onSelection = function() {
                if (scopeObj.view.lstbxTimePeriod.selectedKey === "CustomDateRange") {
					if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
						scopeObj.view.flxSearchContainer.height = "840dp";
						scopeObj.view.flxSearchContainerWrapper.height = "660dp";
						scopeObj.view.flxLeftSearch.height = "500dp";
					}else if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
						scopeObj.view.flxSearchContainer.height = "730dp";
						scopeObj.view.flxSearchContainerWrapper.height = "594dp";
						scopeObj.view.flxLeftSearch.height = "510dp";
					}
                    scopeObj.view.flxDateRange.setVisibility(true);
                } else {
                    scopeObj.view.flxDateRange.setVisibility(false);
					if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
						scopeObj.view.flxLeftSearch.height = "415dp";
						scopeObj.view.flxSearchContainerWrapper.height = "575dp";
						scopeObj.view.flxSearchContainer.height = "755dp";
					}else if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
						scopeObj.view.flxLeftSearch.height = "425dp";
						scopeObj.view.flxSearchContainerWrapper.height = "509dp";
						scopeObj.view.flxSearchContainer.height = "645dp";
					}
                }
                scopeObj.view.forceLayout();
            }
            scopeObj.view.btnSearch.onClick = function() {
	            searchPerformed = true;
                scopeObj.isNextFlow = false;
				scopeObj.view.flxActionsContainer.skin = "slFbox";
				scopeObj.view.btnAdvanceSeachResults.setVisibility(true);
				if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
					scopeObj.view.flxTabsWrapper.skin = "sknFlxBottomBorder";
					scopeObj.view.flxSearchItemsWrapper.skin = "sknFlxBottomBorder";				
				}
                var params = scopeObj.prepareCriteriaForSearch();
                if (scopeObj.view.imgRadioBtnAccountType1.text === "M") {
                    scopeObj.performTransactionSearch = true;
                    scopeObj.performBlockedSearch = false;
                    scopeObj.transactionSearcCriteria = params;
                    scopeObj.initiateTransactionSearch(params);
                } else {
                    scopeObj.performTransactionSearch = false;
                    scopeObj.performBlockedSearch = true;
                    scopeObj.initiateBlockedFundsSearch(params);
                }
                scopeObj.renderSearchUI(true);
            };
            scopeObj.view.flxRadioBtnAccountType1.onClick = function() {
                scopeObj.view.imgRadioBtnAccountType1.text = "M";
                scopeObj.view.imgRadioBtnAccountType2.text = "L";
                scopeObj.view.imgRadioBtnAccountType1.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
                scopeObj.view.imgRadioBtnAccountType2.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                scopeObj.view.flxKeywordRefererence.setVisibility(false);
                scopeObj.view.flxKeywordAmount.setVisibility(true);
                scopeObj.view.flxTransactionTypeCheck.setVisibility(true);
                scopeObj.view.flxRadioBtnAccountType1.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-checked": true,
                        "aria-labelledby": "lblAccountTypeRadio1",
                        "role": "radio"
                    }
                }
                scopeObj.view.flxRadioBtnAccountType2.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-checked": false,
                        "aria-labelledby": "lblAccountTypeRadio2",
                        "role": "radio"
                    }
                }
            };
            scopeObj.view.flxRadioBtnAccountType2.onClick = function() {
                scopeObj.view.imgRadioBtnAccountType1.text = "L";
                scopeObj.view.imgRadioBtnAccountType2.text = "M";
                scopeObj.view.imgRadioBtnAccountType1.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                scopeObj.view.imgRadioBtnAccountType2.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
                scopeObj.view.flxKeywordRefererence.setVisibility(true);
                scopeObj.view.flxKeywordAmount.setVisibility(false);
                scopeObj.view.flxTransactionTypeCheck.setVisibility(false);
                scopeObj.view.flxRadioBtnAccountType1.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-checked": false,
                        "aria-labelledby": "lblAccountTypeRadio1",
                        "role": "radio"
                    }
                }
                scopeObj.view.flxRadioBtnAccountType2.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-checked": true,
                        "aria-labelledby": "lblAccountTypeRadio2",
                        "role": "radio"
                    }
                }
             
            };
            scopeObj.view.imgCloseAS.onTouchEnd = function() {
                scopeObj.view.flxAdvanceSearch.setVisibility(false);
                scopeObj.view.flxSearch.setActive(true);
            };
         /*   scopeObj.view.accountTransactionList.getBtnEntitlement = function(transaction, btnId, callback) {
                var configManager = applicationManager.getConfigurationManager();
                var formatUtil = applicationManager.getFormatUtilManager();
                if (btnId === "Dispute") {
                    var dateDiff = formatUtil.getNumberOfDaysBetweenTwoDates(formatUtil.getDateObjectfromString(transaction.transactionDate), new Date());
                    if (configManager.getDisputeConfig(transaction.transactionType) === "true") {
                        if (transaction.statusDescription !== "Pending" && dateDiff <= configManager.getDisputeDuration() && ((configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === true || configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === "true"))) {
                            if (configManager.getDisputeCDConfig("both") || (configManager.getDisputeCDConfig("debit") && formatUtil.isDebitTransaction(transaction.amount)) || (configManager.getDisputeCDConfig("credit") && formatUtil.isCreditTransaction(transaction.amount))) {
                                callback(true);
                            } else {
                                callback(false);
                            }
                        } else {
                            callback(false);
                        }
                    } else {
                        callback(false);
                    }
                }
                if (btnId === "View Requests") {
                    if ((configManager.checkUserFeature("STOP_PAYMENT_REQUEST") || configManager.checkUserFeature("DISPUTE_TRANSACTIONS")) && (transaction.isDisputed === true || transaction.isDisputed === "true")) callback(true);
                    else callback(false);
                }
            };*/
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.transactionsTemplate = "flxSegTransactionsRowSavingsMobile";
                this.transactionsSelectedTemplate = "flxSegTransactionRowSelectedMobile";
                this.checkImagesTemplate = "flxSegCheckImagesMobile";
                //this.view.flxActions.isVisible = false;
                //this.view.flxActionsMobile.isVisible = true;
                this.view.flxActionsMobile.onClick = this.showMobQuickLinksActions;
            } else {
                this.transactionsTemplate = "flxSegTransactionRowSavings";
                this.transactionsSelectedTemplate = "flxSegTransactionRowSelected";
                this.checkImagesTemplate = "flxSegCheckImages";
                this.view.flxActionsMobile.isVisible = false;
                this.view.flxActions.isVisible = true;
            }
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            scopeObj.view.transactions.calDateFrom.hidePreviousNextMonthDates = true;
            scopeObj.view.transactions.calDateTo.hidePreviousNextMonthDates = true;
            this.view.accountActionsMobile.isVisible = false;
            this.view.quicklinksMobile.isVisible = false; /*quick links Mobile*/
            //this.onBreakpointChange(kony.application.getCurrentBreakpoint());
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule').presentationController;
            this.view.customheader.forceCloseHamburger();
            this.view.accountTypes.isVisible = false;
            //this.view.moreActions.isVisible = false;
            this.view.quicklinksHid.isVisible = false; /*quick links Hid*/
            this.view.flxEditRule.isVisible = false;
            //resetting Masterdata
            this.view.transactions.flxNoTransactions.isVisible = false;
            //setting serach visiblity off~first visit of form
            this.searchViewModel.visible = false;
            this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
            //  this.view.customheader.topmenu.flxMenu.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
            this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            this.view.customheader.topmenu.lblFeedback.skin = ViewConstants.SKINS.FEEDBACK_TOP_MENU_BLANK;
            if (CommonUtilities.isPrintEnabled()) {
                this.view.transactions.imgPrintIcon.toolTip = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.accounts.print"));
                if ((kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) || (kony.application.getCurrentBreakpoint() == 1024 || orientationHandler.isTablet)) {
                    this.view.transactions.flxPrint.setVisibility(false);
                } else {
                    this.view.transactions.flxPrint.setVisibility(true);
                }
                if (CommonUtilities.isCSRMode()) {
                    this.view.transactions.imgPrintIcon.onTouchStart = CommonUtilities.disableButtonActionForCSRMode();
                } else {
                    this.view.transactions.imgPrintIcon.onTouchStart = this.onClickPrint;
                }
            } else {
                this.view.transactions.flxPrint.setVisibility(false);
            }
            //initializing search
            this.renderSearchForm(this.searchViewModel);
            this.clearSearch();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxMain', 'flxFooter', 'accountSummary', 'flxMainDesktop', 'flxRight', 'flxInfo', 'customheader', 'flxMainWrapper', 'flxDowntimeWarning', 'flxSecondaryActions', 'imgAccountTypes', 'flxActions', 'segTransactions', 'flxAccountTypes', 'accountTypes', 'summary', 'flxFormContent']);
            this.updateSearchTransactionView();
            //breadcrumb data
            this.view.breadcrumb.setBreadcrumbData([{
                text: kony.i18n.getLocalizedString("i18n.topmenu.accounts")
            }, {
                text: kony.i18n.getLocalizedString("i18n.transfers.accountDetails")
            }]);
            this.view.breadcrumb.btnBreadcrumb1.toolTip = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.topmenu.accounts"));
            this.view.breadcrumb.lblBreadcrumb2.toolTip = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.transfers.accountDetails"));
            //actions for buttons and flex
            this.view.accountSummary.btnAccountInfo.onClick = function() {
                accactflag = 0;
                scopeObj.showAccountInfo();
            };
            this.view.btnSecondaryActionsMobile.onClick = function() {
                scopeObj.view.accountTypes.setVisibility(false);
                //scopeObj.showMobileActions();
                scopeObj.showMobileQuickLinksActions(); /* quick Links Mobile */
                scopeObj.view.quicklinksMobile.accSetFocus();
            };
            // this.view.imgSecondaryActions.onTouchEnd = function() {
            //     //scopeObj.showMoreActions();
            //     scopeObj.showQuickLinksHid();
            // };
            this.view.accountSummary.btnAccountSummary.onClick = function() {
                scopeObj.showAccountSummary();
            };
            this.view.accountSummary.btnBalanceDetails.onClick = function() {
                scopeObj.showBalanceDetails();
            };
            this.view.flxDownload.toolTip = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.common.Download"));
             //Commented as Download functionality is not working frequently
          /*  if (CommonUtilities.isCSRMode()) {               
                this.view.flxDownload.onClick = CommonUtilities.disableButtonActionForCSRMode();
            } else {*/
                if (kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024) {
                    this.view.flxDownload.isVisible = true;
                } else {
                    this.view.flxDownload.isVisible = true;
                }  
                this.view.flxDownload.onClick = scopeObj.showDownloadPopup;              
          //  }
            
            this.view.downloadTransction.btnClose.onClick = function() {
                scopeObj.view.flxDownloadTransaction.isVisible = false;
                scopeObj.view.flxDownload.setActive(true);
             //   scopeObj.view.accountTransactionList.setBackFocus();
            };
            this.view.downloadLoanSchedule.btnClose.onClick = function() {
                scopeObj.view.flxDownloadLoanSchedule.isVisible = false;
            };
            this.view.downloadLoanSchedule.flxCloseDowntimeWarning.onClick = function() {
                scopeObj.view.downloadLoanSchedule.flxDowntimeWarning.isVisible = false;
            };
            this.view.searchDownloadTransction.btnClose.onClick = function() {
				scopeObj.view.searchDownloadTransction.flxKeyword.isVisible = false;
                scopeObj.view.searchDownloadTransction.flxTimePeriod.isVisible = false;
                scopeObj.view.searchDownloadTransction.flxAmountRange.isVisible = false;
                scopeObj.view.searchDownloadTransction.flxType.isVisible = false;
                scopeObj.view.searchDownloadTransction.flxCheckNumber.isVisible = false;
                scopeObj.view.flxSearchDownloadTransaction.isVisible = false;
             //   scopeObj.view.accountTransactionList.setBackFocus();
            };
            this.view.CheckImage.btnCancel.onClick = function() {
                scopeObj.view.flxCheckImage.setVisibility(false);
            };
            this.view.customheader.customhamburger.activateMenu("ACCOUNTS", "My Accounts");
            this.view.accountActionsMobile.setVisibility(false);
            this.view.quicklinksMobile.setVisibility(false); /*quick links Mobile*/
            this.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            applicationManager.getNavigationManager().applyUpdates(this);
            CampaignUtility.fetchPopupCampaigns();
            //this.view.flxDownloadAttachment.isVisibile = false;
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                this.view.flxPrimaryActions.setVisibility(false);
                this.view.quicklinks.setVisibility(false);
              	this.view.flxTransactionListHeader.width = "92%";
              	this.view.flxTransactionListHeader.left = "3.5%";
              	this.view.flxTransactionsList.width = "92%";
              	this.view.flxTransactionsList.left = "3.5%";
            }
            this.accessibilityFunction();
            this.view.flxBackNavigation.setVisibility(true);
			if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() == 1380 || orientationHandler.isDesktop){
				this.view.flxBackNavigation.top = "-8px";
			}
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "HomepageMA",
                "moduleName": "AccountsUIModule"
            });
            var custDashboard = accountsModule.presentationController.customerdashboard;
            if (custDashboard === "true") {
            this.view.lblBack.text = accountsModule.presentationController.customerIdName + " (" + accountsModule.presentationController.customerId + ")";
			this.view.lblBackMobile.text = accountsModule.presentationController.customerIdName + " (" + accountsModule.presentationController.customerId + ")";
			this.view.imgBack.src = "arrow_left.png";
			this.view.imgBackMobile.src = "arrow_left.png";
            this.view.flxImgBackNavigation.onClick = this.navigateToAccounts.bind(this);
			this.view.flxImgBackNav.onClick = this.navigateToAccounts.bind(this);
            } else {
              this.view.lblBack.text = "Accounts";
			  this.view.lblBackMobile.text = "Accounts";
              this.view.flxImgBackNavigation.onClick = this.navigateToAccounts.bind(this);
			  this.view.flxImgBackNav.onClick = this.navigateToAccounts.bind(this);
            }
            if (this.accountType == "mortgageFacility") {
                this.view.flxBackNavigation.setVisibility(true);
                this.view.lblBack.text="Back to Mortgage Facility";
                this.view.lblBackMobile.text="Back to Mortgage Facility";
                this.view.flxImgBackNavigation.onClick = this.navigateToMortgageFacility.bind(this);
                this.view.flxImgBackNav.onClick = this.navigateToMortgageFacility.bind(this);
            }
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.flxDownloadTransaction.downloadTransction.flxPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.flxAccountTypes.onKeyPress = this.onAccountKeyPressCallBack;
            this.view.flxAdvanceSearch.onKeyPress = this.onSearchKeyPressCallBack;
            this.view.flxSecondaryActions.onKeyPress = this.onActionKeyPressCallBack;
            this.view.customheader.btnSkip.onClick = function() {
                scopeObj.view.lblHeader.setActive(true);
            }
            this.view.btnByPass.onClick = function() {
                scopeObj.view.lblTransactions.setActive(true);
            }
            this.view.btnByPass2.onClick = function() {
                scopeObj.view.quicklinks.accSetFocus();
            }
            this.view.flxFilters.accessibilityConfig = {
                "a11yARIA": {
                    "role": "tablist",
                    "tabindex": -1
                }
            }
            this.view.btnAll.accessibilityConfig = {
                "a11yARIA": {
                    "aria-selected": true,
                    "role": "tab"
                }
            }
            this.view.btnFilter2.accessibilityConfig = {
                "a11yARIA": {
                    "aria-selected": false,
                    "role": "tab"
                }
            }
            this.view.btnFilter3.accessibilityConfig = {
                "a11yARIA": {
                    "aria-selected": false,
                    "role": "tab"
                }
            }
			this.view.btnAll.onClick = function() {
                scopeObj.selectedTab = "Posted";
                scopeObj.updateTransactions(scopeObj.transactionListdata);
                scopeObj.setTabAccessibility(scopeObj.selectedTab);
            }
            this.view.btnFilter2.onClick = function() {
                scopeObj.selectedTab = "Pending";
                scopeObj.updateTransactions(scopeObj.transactionListdata);         
                scopeObj.setTabAccessibility(scopeObj.selectedTab);         
            }
            this.view.btnFilter3.onClick = function() {
                scopeObj.selectedTab = "Blocked";
              	scopeObj.highlightType();
              	var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                  "appName": "ArrangementsMA",
                  "moduleName": "AccountsUIModule"
              	});
              	accountsModule.presentationController.getBlockedTransactions(this.account);
                scopeObj.setTabAccessibility(scopeObj.selectedTab);
			//	scopeObj.updateBlockedTransactions(scopeObj.blockTransListdata);
            }
          	this.view.btnLoanSchedule.onClick = function() {
              	scopeObj.renderSearchUI(false);
                scopeObj.selectedTab = "LoanSchedule";
              	scopeObj.transactionType = "LoanSchedule";
                scopeObj.highlightType();
              	var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                  "appName": "ArrangementsMA",
                  "moduleName": "AccountsUIModule"
              	});
              	accountsModule.presentationController.getLoanTransactions(this.account);
				//scopeObj.updateLoanTransactions(scopeObj.loanScheduledata);
            }
          	this.view.btnAllLoan.onClick = function() {
                scopeObj.selectedTab = "All";
				scopeObj.updateTransactions(scopeObj.transactionListdata);
            }
            this.view.summary.onSummaryTabClick = function(input) {
                if(input === "tab1")
                scopeObj.summaryOnClick = false;
                else
                scopeObj.summaryOnClick = true;
            }
            this.view.flxSTPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.downloadTransction.doLayout = CommonUtilities.centerPopupFlex;
          	this.view.flxDateSort.onClick  = this.flxDateonClick;
          	this.view.flxAmountSort.onClick  = this.flxAmountOnClick;
          	this.view.flxTypeSort.onClick  = this.flxTransTypeOnClick;
          	this.view.flxAmtSort.onClick = this.flxBlockedTransAmtOnClick;
          	this.view.flxFromSort.onClick = this.flxFromDateOnClick;
          	this.view.flxToSort.onClick = this.flxToDateOnClick;
          	this.view.imgDateSortl.onTouchEnd = this.flxDatelonClick;
			this.view.imgAmountSortl.onTouchEnd = this.flxAmountlOnClick;
			this.view.imgInterestSort.onTouchEnd = this.flxInterestlOnClick;
            this.showAccountTypesDropdown();
            this.showSecondaryActionsDropdown();
            this.checkAccountStatus();
          	scopeObj.view.btnAllLoan.skin = "sknBtnSSPSemiboldSelected";
            scopeObj.view.btnLoanSchedule.skin = "sknBtnAccountSummaryUnselectedTransfer424242";	
            this.view.flxPrint.onClick = this.onClickPrint;			
        },
				
        setTabAccessibility: function(data){
            if (data === "Posted"){
                this.view.btnAll.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-selected": true,
                        "role": "tab"
                    }
                }
                this.view.btnFilter2.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-selected": false,
                        "role": "tab"
                    }
                }
                this.view.btnFilter3.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-selected": false,
                        "role": "tab"
                    }
                }
            } else if (data === "Pending"){
                this.view.btnAll.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-selected": false,
                        "role": "tab"
                    }
                }
                this.view.btnFilter2.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-selected": true,
                        "role": "tab"
                    }
                }
                this.view.btnFilter3.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-selected": false,
                        "role": "tab"
                    }
                }
            } else {
                this.view.btnAll.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-selected": false,
                        "role": "tab"
                    }
                }
                this.view.btnFilter2.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-selected": false,
                        "role": "tab"
                    }
                }
                this.view.btnFilter3.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-selected": true,
                        "role": "tab"
                    }
                }
            }
        },
        resetSearchFields: function () {
            var scopeObj= this;
          	if (this.accountType == "mortgageFacility" || this.accountType == "Loan") {
				scopeObj.view.flxAccountTypeRadio2.setVisibility(false);
			}else{
				scopeObj.view.flxAccountTypeRadio2.setVisibility(true);
			}
            if(scopeObj.selectedTab =="Blocked")
            {
                 
                scopeObj.view.imgRadioBtnAccountType1.text = "L";
                scopeObj.view.imgRadioBtnAccountType2.text = "M";
                scopeObj.view.imgRadioBtnAccountType1.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                scopeObj.view.imgRadioBtnAccountType2.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
                scopeObj.view.flxKeywordRefererence.setVisibility(true);
                scopeObj.view.flxKeywordAmount.setVisibility(false);
                scopeObj.view.flxTransactionTypeCheck.setVisibility(false);
         
           
           
            }
            else
            {
                 scopeObj.view.imgRadioBtnAccountType1.text = "M";
                scopeObj.view.imgRadioBtnAccountType2.text = "L";
                scopeObj.view.imgRadioBtnAccountType1.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
                scopeObj.view.imgRadioBtnAccountType2.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                scopeObj.view.flxKeywordRefererence.setVisibility(false);
                scopeObj.view.flxKeywordAmount.setVisibility(true);
                scopeObj.view.flxTransactionTypeCheck.setVisibility(true);
           
            
            }
            this.view.txtAmountRangeFrom.text = "";
            this.view.txtAmountRangeTo.text = "";
            this.view.txtKeyword.text = "";
            this.view.txtCheckNumberFrom.text = "";
            this.view.txtCheckNumberTo.text = "";
            this.view.txtKeywordBlocked.text = "";
            this.view.lstbxTransactionType.selectedKey = "All";
            this.view.lstbxTimePeriod.selectedKey = "7days";
            this.view.txtReference.text = "";
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
				this.view.flxLeftSearch.height = "415dp";
				this.view.flxSearchContainerWrapper.height = "575dp";
				this.view.flxSearchContainer.height = "755dp";
			}else if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
				this.view.flxLeftSearch.height = "425dp";
				this.view.flxSearchContainerWrapper.height = "509dp";
				this.view.flxSearchContainer.height = "645dp";
			}
            this.view.flxDateRange.setVisibility(false);            
            this.view.calDateFrom.dateComponents = [
                null,
                null,
                null
            ];
            this.view.calDateTo.dateComponents = [
                null,
                null,
                null
            ];
            if(this.bankDate){
                this.setCalenderDate(this.bankDate["currentWorkingDate"])
            }
            this.view.forceLayout();
        },
        checkAccountStatus: function() {
            var currentForm = kony.application.getCurrentForm();
            currentForm.flxPopup.left = "-100%";
            currentForm.flxPopup.isVisibile = false;
            scopeObj = this;
            if (this.account) {
                if (!kony.sdk.isNullOrUndefined(this.account.accountStatus) && this.account.accountStatus.toUpperCase() == "CLOSURE_PENDING") {
                    scopeObj.view.flxDowntimeWarning.isVisible = true;
                    scopeObj.view.imgDowntimeWarning.src = "aa_process.png";
                    scopeObj.view.lblDowntimeWarning.text = "Your request for Account Closure is under process.";
                    scopeObj.view.lblDowntimeWarning.centerY = "50%";
                    scopeObj.view.lblDowntimeWarning.left = "15dp";
                    scopeObj.view.flxDowntimeWarning.skin = "slfBoxffffffB1R5";
                    scopeObj.view.imgCloseDowntimeWarning.isVisible = false;
                } else if (!kony.sdk.isNullOrUndefined(this.account.accountStatus) && this.account.accountStatus.toUpperCase() == "CLOSED") {
                    scopeObj.view.flxDowntimeWarning.isVisible = true;
                    scopeObj.view.imgDowntimeWarning.src = "aa_password_error.png";
                    scopeObj.view.lblDowntimeWarning.text = "This account is closed and is no longer active.";
                    scopeObj.view.lblDowntimeWarning.centerY = "50%";
                    scopeObj.view.lblDowntimeWarning.left = "15dp";
                    scopeObj.view.lblDowntimeWarning.skin = "sknlblErrorEE0005SSP15px";
                    scopeObj.view.flxDowntimeWarning.skin = "slfBoxffffffB1R5";
                    scopeObj.view.imgCloseDowntimeWarning.isVisible = false;
                } else {
                    scopeObj.view.flxDowntimeWarning.isVisible = false;
                }
            }
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var scopeObj = this;
            if (eventPayload.keyCode === 27) {
                if (scopeObj.view.flxDownloadTransaction.isVisible === true) {
                    scopeObj.view.flxDownloadTransaction.isVisible = false;
                 //   scopeObj.view.accountTransactionList.setBackFocus();
                }
                if (scopeObj.view.quicklinksHid.isVisible === true) {
                    scopeObj.view.quicklinksHid.isVisible = false;
                    scopeObj.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                    // scopeObj.view.flxSecondaryActions.setActive(true);
                    scopeObj.view.flxSecondaryActions.accessibilityConfig = {
                        "a11yARIA": {
                            role: "button",
                            "aria-labelledby": "lblSecondaryActions",
                            "aria-expanded": false
                        }
                    }
                }
                if (scopeObj.view.accountTypes.isVisible === true) {
                    scopeObj.view.accountTypes.isVisible = false;
                    scopeObj.view.flxAccountTypes.setActive(true);
                    scopeObj.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                    scopeObj.view.flxAccountTypes.accessibilityConfig = {
                        "a11yLabel":"Currently showing details of " + scopeObj.view.lblAccountTypes.text + ". Click to show list of accounts.",
                        "a11yARIA": {
                            role: "button",
                            "aria-expanded": false
                        }
                    }
                }
                if (scopeObj.view.quicklinksMobile.isVisible === true) {
                    scopeObj.view.btnSecondaryActionsMobile.setFocus(true);
                    scopeObj.view.quicklinksMobile.isVisible = false;
                }
                if (scopeObj.view.downloadTransction.isVisible === true || scopeObj.view.searchDownloadTransction.isVisible === true || scopeObj.view.downloadLoanSchedule.isVisible === true) {
                    scopeObj.view.flxDownloadTransaction.isVisible = false;
                    scopeObj.view.flxSearchDownloadTransaction.isVisible = false;
                    scopeObj.view.flxDownloadLoanSchedule.isVisible = false;
                }
                if (scopeObj.view.flxLogout.isVisible) {
                    scopeObj.view.flxLogout.isVisible = false;
                    scopeObj.view.customheader.headermenu.btnLogout.setFocus(true);
                }
                scopeObj.view.customheader.onKeyPressCallBack(eventObject, eventPayload);
            }
        },
        onSegKeyPressCallBack: function(eventObject, eventPayload, context){
            var scope = this;
            if (eventPayload.keyCode === 27){
                if (scope.view.accountTypes.isVisible === true){
                    scope.view.accountTypes.setVisibility(false);
                    scope.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                    scope.view.flxAccountTypes.setActive(true);
                } else if (scope.view.flxAccountTypesSection.isVisible === true){
                    scope.view.flxAccountTypesSection.setVisibility(false);
                    scope.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                    scope.view.flxAccountTypes.setActive(true);
                }
            }
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey === false && context.sectionIndex === 1 && context.rowIndex === context.widgetInfo.data.length - 1){
                scope.view.accountTypes.setVisibility(false);
                scope.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            }
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey === false && context.rowIndex === 0 && context.sectionIndex === context.widgetInfo.data.length - 1){
                scope.view.flxAccountTypesSection.setVisibility(false);
                scope.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            }
            if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                if (context.rowIndex === 0 && context.sectionIndex === 0) {
                    scope.view.accountTypes.setVisibility(false);
                    scope.view.flxAccountTypesSection.setVisibility(false);
                    scope.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                    eventPayload.preventDefault();
                    scope.view.flxAccountTypes.setActive(true);
                }
            }
        },
        onAccountKeyPressCallBack: function (eventObject, eventPayload) {
            var scope = this;
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                scope.view.accountTypes.setVisibility(false);
                scope.view.flxAccountTypesSection.setVisibility(false);
                scope.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            }
        },
        onSearchKeyPressCallBack: function(eventObject, eventPayload){
            var scope = this;
            if (eventPayload.keyCode === 27){
                scope.view.flxAdvanceSearch.setVisibility(false);
                scope.view.flxSearch.setActive(true);
            }
        },
        onActionKeyPressCallBack: function(eventObject, eventPayload){
            var scope = this;
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey){
                if (scope.view.quicklinksHid.isVisible) {
                    scope.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                    scope.view.quicklinksHid.isVisible = false; /*quick links Hid*/
                    scope.view.flxSecondaryActions.accessibilityConfig = {
                        "a11yARIA": {
                            role: "button",
                            "aria-labelledby": "lblSecondaryActions",
                            "aria-expanded": false
                        }
                    };
                    scope.view.flxActions.zIndex = 1;
                }
            }
        },
        navigateToAccounts: function() {
          /*  var navManager = applicationManager.getNavigationManager();   
             navManager.navigateTo({
                "appName": "HomepageMA",
                "friendlyName": "AccountsUIModule/frmDashboard"
            });*/
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "HomepageMA"
            });
            accountsModule.presentationController.showAccountsDashboard();
        },
        navigateToMortgageFacility: function() {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmMortgageAccountDetails");
        },
        onError: function() {
            FormControllerUtility.hideProgressBar(this.view);
        },
        callHideLoadingIndicator: function() {
            if (this.accountSummaryLoaded && this.transactionListLoaded) {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },
        showAccountTypesDropdown: function() {
            var scopeObj = this;
            this.view.flxAccountTypes.onClick = function() {
				scopeObj.view.accountTypes.left = "0dp";
                scopeObj.view.accountTypes.width = "260dp";
                if (scopeObj.view.accountTypes.isVisible) {
                    if (kony.application.getCurrentBreakpoint() == 1380 || kony.application.getCurrentBreakpoint() == 1366) {
                        scopeObj.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_UP;
                        scopeObj.view.accountTypes.isVisible = true;
                    }
                    if (kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024) {
                        scopeObj.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                        scopeObj.view.accountTypes.isVisible = false;						
                    }
                }
                // if (scopeObj.view.flxAccountTypesSection.isVisible) {
                //     scopeObj.view.flxAccountTypesSection.origin = true;
                // }
				if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    flag = 0;
                    scopeObj.view.accountTypes.width = "368dp";
                }else{
					scopeObj.view.accountTypes.width = "338dp";
				}
                scopeObj.view.accountActionsMobile.setVisibility(false);
                scopeObj.view.quicklinksMobile.setVisibility(false); /*quick links Mobile*/
                scopeObj.alignAccountTypesToAccountSelectionImg();
                scopeObj.showAccountTypes();
            }            
        },
        showSecondaryActionsDropdown: function() {
            var scopeObj = this;
            this.view.flxSecondaryActions.onClick = function() {
                if (scopeObj.view.quicklinksHid.isVisible) {
                    if (kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024) {
                        scopeObj.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                        scopeObj.view.quicklinksHid.isVisible = false; /*quick links Hid*/
                    }
                }
            }
            this.view.flxSecondaryActions.onClick = function() {
                if (scopeObj.view.quicklinksHid.isVisible) {
                    scopeObj.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                    scopeObj.view.quicklinksHid.isVisible = false; /*quick links Hid*/
                    scopeObj.view.flxSecondaryActions.accessibilityConfig = {
                        "a11yARIA": {
                            role: "button",
                            "aria-labelledby": "lblSecondaryActions",
                            "aria-expanded": false
                        }
                    };
                    scopeObj.view.flxActions.zIndex = 1;
                    scopeObj.AdjustScreen();
                } else {
                    scopeObj.showQuickLinksHid();
                    scopeObj.view.flxSecondaryActions.accessibilityConfig = {
                        "a11yARIA": {
                            role: "button",
                            "aria-labelledby": "lblSecondaryActions",
                            "aria-expanded": true
                        }
                    };
                    scopeObj.view.flxActions.zIndex = 10;
                }
            };
        },
        accessibilityFunction: function() {
            this.view.flxMainWrapper.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1,
                    role: "main"
                },
            }
            this.view.imgAccountTypeIcon.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    tabindex: -1
                },
            }
            this.view.imgAccountTypes.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    tabindex: -1
                },
            }
            this.view.btnViewAccountInfo.accessibilityConfig = {
                "a11yARIA": {
                    role: "button"
                },
            }
            this.view.lblAccountTypes.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    tabindex: -1
                },
            }
            this.view.flexRight.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                },
            }
            this.view.lblAsOf.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                },
            }
            this.view.flxAccountTypes.accessibilityConfig = {
                "a11yLabel":"Currently showing details of " + this.view.lblAccountTypes.text + ". Click to show list of accounts.",
                "a11yARIA": {
                    role: "button",
                    "aria-expanded": false
                }
            }
            this.view.accountTypes.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1,
                    "aria-live": "off"
                }
            }
            this.view.imgSecondaryActions.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.lblSecondaryActions.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.flxSecondaryActions.accessibilityConfig = {
                "a11yARIA": {
                    role: "button",
                    "aria-labelledby": "lblSecondaryActions",
                    "aria-expanded": false
                }
            }
            this.view.flxDownloadTransaction.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.accountSummary.flxInfo.accessibilityConfig = {
                a11yLabel: "Read more information about  your current available balance ",
                a11yARIA: {
                  tabindex: 0,
                  role: "button"
                }
              };
            this.view.downloadTransction.flxPopup.accessibilityConfig = {
                "a11yARIA": {
                    "aria-live": "off",
                    "role": "dialog",
                    tabindex: -1
                }
            }
            this.view.downloadTransction.flxHeader.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.downloadTransction.lblHeader.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                },
                "tagName": "h2"
            }
            this.view.downloadTransction.infoIcon.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.downloadTransction.lblDisclaimer.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.downloadTransction.lblPickDateRange.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.downloadTransction.lblTo.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.downloadTransction.lblSelectFormat.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.downloadTransction.lbxSelectFormat.accessibilityConfig = {
                "a11yARIA": {
                    "aria-labelledby": "lblSelectFormat"
                }
            }
            this.view.downloadTransction.btnClose.accessibilityConfig = {
                "a11yLabel": kony.i18n.getLocalizedString("i18n.settings.closeDeletePopup"),
                "a11yARIA": {
                    role: "button"
                }
            }
            this.view.downloadTransction.btnCancel.accessibilityConfig = {
                "a11yLabel": "Cancel, downloading this transaction process",
                "a11yARIA": {
                    role: "button"
                }
            }
            this.view.downloadTransction.btnDownload.accessibilityConfig = {
                "a11yLabel": "yes, download this transaction process",
                "a11yARIA": {
                    role: "button"
                }
            }
            this.view.customfooter.lblCopyright.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.CheckImage.lblCheckDetails.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.viewStatementsnew.flxYearInfo.accessibilityConfig = {
                "a11yLabel": this.view.viewStatementsnew.lblSelectYears.text + " " + this.view.viewStatementsnew.lblSelectedYear.text,
                "a11yARIA": {
                    "role": "button",
                    "aria-expanded": false,
                }
            }
        },
        /**
         * Method to show Download popup
         */
        showDownloadPopup: function(selectedTransactionType) {
          //  this.transactionType = selectedTransactionType;
          var formatUtil = applicationManager.getFormatUtilManager();
            if (!(searchPerformed === true)) {
                downloadflag = 0;
                if (this.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN) && this.transactionType === "LoanSchedule") {
                    this.view.flxDownloadTransaction.isVisible = false;
                    this.view.downloadLoanSchedule.flxDowntimeWarning.setVisibility(false);
                    this.view.flxDownloadLoanSchedule.isVisible = true;
                    this.view.flxDownloadLoanSchedule.height = "100%";//this.getPageHeight();
                    this.view.downloadLoanSchedule.lblHeader.setFocus(true);
                    this.view.downloadLoanSchedule.lbxSelectFormat.masterData = [
                        ["csv", "CSV"],
                        ["pdf", "PDF"]
                    ];
                    this.view.downloadLoanSchedule.lbxSelectFormat.selectedKey = "csv";
                    this.view.downloadLoanSchedule.lbxSelectType.masterData = [
                        ["all", "All"],
                        ["paid", "Paid"],
                        ["overdue", "Overdue"],
                        ["future", "Future"]
                    ];
                    this.view.downloadLoanSchedule.lbxSelectType.selectedKey = "all";
                    this.view.downloadLoanSchedule.btnDownload.onClick = this.initDownLoadFile;
                } else {
                    this.view.flxDownloadLoanSchedule.isVisible = false;
                    var maxDateRange = [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()];
                    this.view.downloadTransction.flxDowntimeWarning.setVisibility(false);
                    this.view.flxDownloadTransaction.isVisible = true;
                    this.view.flxDownloadTransaction.isModalContainer = true;
                    this.view.flxDownloadTransaction.height = "100%";//this.getPageHeight();
                    if ((kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) || (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)) {
                        this.view.flxDownloadTransaction.height = "100%";
                        this.view.downloadTransction.flxPopup.top = "300dp";
                        this.view.flxDownloadTransaction.height = "250%";
                    }
                  	if(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                  		this.view.downloadTransction.lblDisclaimer.width =  "85%";
                      	this.view.downloadTransction.flxDisclaimer.height = "82%";
                      	this.view.downloadTransction.flxInfoIcon.top = "13dp";
                        this.view.downloadTransction.flxPopup.width = "300dp";
                        this.view.downloadTransction.flxDisclaimer.width = "260dp";
                        this.view.downloadTransction.flxPopup.top = "150dp";
                        this.view.downloadTransction.height = "150%";
                    }
                    //this.view.downloadTransction.calFromDate.date = [];
                    this.view.downloadTransction.calFromDate.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
                    this.view.downloadTransction.calToDate.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
                    this.view.downloadTransction.calToDate.dateComponents = maxDateRange;
                    this.view.downloadTransction.calFromDate.dateComponents = maxDateRange;
                    this.view.downloadTransction.calFromDate.validEndDate = maxDateRange;
                    this.view.downloadTransction.calToDate.validEndDate = maxDateRange;
                    this.view.downloadTransction.lbxSelectFormat.masterData = [
                        ["csv", "CSV"],
                        ["xls", "Excel"],
                        ["pdf", "PDF"],
                        ["qfx", "QFX"],
                        ["qbo", "QBO"]
                    ];
                    this.view.downloadTransction.lbxSelectFormat.selectedKey = "csv";
                    this.view.downloadTransction.btnDownload.onClick = this.initDownLoadFile;
                    this.view.downloadTransction.lblHeader.setActive(true);
                  	this.view.downloadTransction.lblSelectFormat.text = kony.i18n.getLocalizedString("kony.mb.achfiledetail.fileType")+":";
                    this.view.onKeyPress = this.onKeyPressCallBack;
                }
            } else {
                downloadSearchResult = this.transactionSearcCriteria;
                downloadflag = 1;
                this.view.searchDownloadTransction.flxDowntimeWarning.setVisibility(false);
                this.view.flxSearchDownloadTransaction.isVisible = true;
                this.view.flxSearchDownloadTransaction.height = "100%";//this.getPageHeight();
                this.view.searchDownloadTransction.lblHeader.setFocus(true);
              	this.view.searchDownloadTransction.flxKeyword.isVisible = false;
              	this.view.searchDownloadTransction.flxType.isVisible = false;
              	this.view.searchDownloadTransction.flxAmountRange.isVisible = false;
              	this.view.searchDownloadTransction.flxCheckNumber.isVisible = false;
              	this.view.searchDownloadTransction.flxTimePeriod.isVisible = false;
                if (downloadSearchResult !== undefined) {
		    if (downloadSearchResult.searchDescription !== undefined && downloadSearchResult.searchDescription !== "") {
			this.view.searchDownloadTransction.flxKeyword.isVisible = true;
                        this.view.searchDownloadTransction.lblKeyword.isVisible = true;
                        this.view.searchDownloadTransction.lblKeywordValue.isVisible = true;
		    	this.view.searchDownloadTransction.lblKeywordValue.text = downloadSearchResult.searchDescription;
                    }
                    if (downloadSearchResult.transactionType !== undefined) {
                        if (downloadSearchResult.transactionType === "Both") this.view.searchDownloadTransction.lblTypeValue.text = "All Transactions";
                        else this.view.searchDownloadTransction.lblTypeValue.text = downloadSearchResult.transactionType;
                        this.view.searchDownloadTransction.flxType.isVisible = true;
                        this.view.searchDownloadTransction.lblTypeTitle.isVisible = true;
                        this.view.searchDownloadTransction.lblTypeValue.isVisible = true;
                    }
                    if (downloadSearchResult.searchStartDate !== undefined && downloadSearchResult.searchStartDate !== "" && downloadSearchResult.searchEndDate !== undefined && downloadSearchResult.searchEndDate !== "") {
                        this.view.searchDownloadTransction.flxTimePeriod.isVisible = true;
                        this.view.searchDownloadTransction.lblTimePeriodTitle.isVisible = true;
                        this.view.searchDownloadTransction.lblTimePeriodValue.isVisible = true;                        
                      	if (scopeObj.view.lstbxTimePeriod.selectedKey != "CustomDateRange") 
							this.view.searchDownloadTransction.lblTimePeriodValue.text = scopeObj.view.lstbxTimePeriod.selectedKeyValue[1];
						else{
                          	var startDate = formatUtil.getFormattedSelectedDate(formatUtil.getDateObjectfromString(downloadSearchResult.searchStartDate));
                          	var endDate = formatUtil.getFormattedSelectedDate(formatUtil.getDateObjectfromString(downloadSearchResult.searchEndDate));
                          	var date = startDate + " to " + endDate;
                        	this.view.searchDownloadTransction.lblTimePeriodValue.text = date;
                        }
                    }
                    if (downloadSearchResult.searchMaxAmount !== undefined && downloadSearchResult.searchMaxAmount !== "" && downloadSearchResult.searchMinAmount !== undefined && downloadSearchResult.searchMinAmount !== "") {
                        this.view.searchDownloadTransction.flxAmountRange.isVisible = true;
                        this.view.searchDownloadTransction.lblAmountRangeTitle.isVisible = true;
                        this.view.searchDownloadTransction.lblAmountRangeValue.isVisible = true;
                        var amount = this.accountCurrency + downloadSearchResult.searchMinAmount + " to " + this.accountCurrency + downloadSearchResult.searchMaxAmount;
                        this.view.searchDownloadTransction.lblAmountRangeValue.text = amount;
                    }
                    if (downloadSearchResult.fromCheckNumber !== undefined && downloadSearchResult.fromCheckNumber !== "" && downloadSearchResult.toCheckNumber !== undefined && downloadSearchResult.toCheckNumber !== "") {
                        this.view.searchDownloadTransction.flxCheckNumber.isVisible = true;
                        this.view.searchDownloadTransction.lblCheckNumberValue.isVisible = true;
                        this.view.searchDownloadTransction.lblCheckNumberTitle.isVisible = true;
                        var check = downloadSearchResult.fromCheckNumber + " to " + downloadSearchResult.toCheckNumber;
                        this.view.searchDownloadTransction.lblCheckNumberValue.text = check;
                    }
                }
                this.view.searchDownloadTransction.lbxSelectFormat.masterData = [
                    ["csv", "CSV"],
                    ["xls", "Excel"],
                    ["pdf", "PDF"],
                    ["qfx", "QFX"],
                    ["qbo", "QBO"]
                ];
                this.view.searchDownloadTransction.lbxSelectFormat.selectedKey = "csv";
                this.view.searchDownloadTransction.btnDownload.onClick = this.initDownLoadFile;
                this.view.searchDownloadTransction.btnClose.setFocus(true);
            }
        },
        updateRightContainerUI: function() {
            if (kony.application.getCurrentBreakpoint() > 1024) {
                this.view.flxActions.top = "-240dp";
            }
            if (kony.application.getCurrentBreakpoint() == 1024) {
                this.view.flxActions.top = "20dp";
                this.view.flxActions.zIndex = 10;
            }         	
        },
        /**
         * Method to download transaction file
         * @param {String} fileUrl
         */
        downLoadTransactionFile: function(fileUrl) {
            var data = {
                "url": fileUrl
            };
            this.callDownloadService(data, kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.transactionDetails.title);
            this.view.downloadTransction.flxDowntimeWarning.setVisibility(false);
            FormControllerUtility.hideProgressBar(this.view);
        },
		downLoadAttachmentFile: function(fileUrl) {
            var data = {
                "url": fileUrl
            };
            this.callAttachmentDownloadService(data, this.fileName.slice(0, -4)); //this.presenter.attachments[0].fileName.slice(0,-4)
            this.view.downloadTransction.flxDowntimeWarning.setVisibility(false);
            FormControllerUtility.hideProgressBar(this.view);
        },
		callAttachmentDownloadService: function(mfDownloadURL, fileName) {
            try {
                var self = this;
                var authToken = KNYMobileFabric.currentClaimToken;
                var xhr = new kony.net.HttpRequest();
                xhr.open('GET', mfDownloadURL.url, true);
                xhr.setRequestHeader("X-Kony-Authorization", authToken);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.responseType = "blob";
                xhr.onReadyStateChange = function() {
                    try {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            self.downloadAttachmentFromResponse(xhr.response, fileName);
                        } else if (xhr.status !== 200) {
                            kony.print(" ERROR: Error downloadin csv");
                        }
                    } catch (err) {
                        kony.print(" ERROR:" + err);
                    }
                };
                xhr.send();
            } catch (err) {
                kony.print(" ERROR:" + err);
            }
        },
        downloadAttachmentFromResponse: function(csvData, fileName) {
            var format = "";
            fileType = this.fileName.slice(-3);
            switch (fileType) {
                case "csv":
                    format = "text/csv;charset=utf-8,";
                    break;
                case "xls":
                    format = "application/vnd.ms-excel;charset=utf-8,";
                    break;
                case "pdf":
                    format = "application/pdf;charset=utf-8,";
                    break;
            }
            var blobObj = new Blob([csvData], {
                type: format
            });
            var url = URL.createObjectURL(blobObj);
            var downloadLink = document.createElement("a");
            downloadLink.setAttribute('href', url);
            downloadLink.download = fileName + "." + fileType;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            kony.print("----" + fileType + "file downloaded----");
        },
        callDownloadService: function(mfDownloadURL, fileName) {
            try {
                var self = this;
                var authToken = KNYMobileFabric.currentClaimToken;
                var xhr = new kony.net.HttpRequest();
                xhr.open('GET', mfDownloadURL.url, true);
                xhr.setRequestHeader("X-Kony-Authorization", authToken);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.responseType = "blob";
                xhr.onReadyStateChange = function() {
                    try {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            self.downloadFileFromResponse(xhr.response, fileName);
                        } else if (xhr.status !== 200) {
                            kony.print(" ERROR: Error downloadin csv");
                        }
                    } catch (err) {
                        kony.print(" ERROR:" + err);
                    }
                };
                xhr.send();
            } catch (err) {
                kony.print(" ERROR:" + err);
            }
        },
        downloadFileFromResponse: function(csvData, fileName) {
            var format = "";
            fileType = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.transactionDetails.fileType;
            switch (fileType) {
                case "csv":
                    format = "text/csv;charset=utf-8,";
                    break;
                case "xls":
                    format = "application/vnd.ms-excel;charset=utf-8,";
                    break;
                case "pdf":
                    format = "application/pdf;charset=utf-8,";
                    break;
            }
            var blobObj = new Blob([csvData], {
                type: format
            });
            var url = URL.createObjectURL(blobObj);
            var downloadLink = document.createElement("a");
            downloadLink.setAttribute('href', url);
            downloadLink.download = fileName + "." + fileType;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            kony.print("----" + fileType + "file downloaded----");
        },
        /**
         * Method to init download file functionality
         */
        initDownLoadFile: function() {
            var message;
            var scope = this;
            if (downloadflag === 0) {
                if (!(message = this.getFileDownloadErrorMessage())) {
                    FormControllerUtility.showProgressBar(this.view);
                    var downloadFileParams = {};
                    if (this.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN) && this.transactionType === "LoanSchedule") {
                        downloadFileParams.format = this.view.downloadLoanSchedule.lbxSelectFormat.selectedKeyValue[0];
                        downloadFileParams.installmentType = this.view.downloadLoanSchedule.lbxSelectType.selectedKeyValue[0];
                        downloadFileParams.transactionType = this.transactionType;
                        this.loadAccountModule().presentationController.downloadTransactionFile(downloadFileParams);
                        this.view.flxDownloadLoanSchedule.isVisible = false;
                    } else {
						var transType = "BOTH";
						if(this.selectedTab === "Pending")
							transType = "Pending";
						else if(this.selectedTab === "Posted")
							transType = "Posted";
                      	else if (this.selectedTab === "Blocked") 
                          transType = "Blocked";
                      	else if (this.selectedTab === "LoanSchedule") 
                          transType = "LoanSchedule";
                        if(this.performTransactionSearch)
                            transType = "Blocked";
                        downloadFileParams.fromDate = "";//CommonUtilities.sendDateToBackend(this.view.downloadTransction.calFromDate.formattedDate);
                        downloadFileParams.toDate = "";//CommonUtilities.sendDateToBackend(this.view.downloadTransction.calToDate.formattedDate);
                        downloadFileParams.format = this.view.downloadTransction.lbxSelectFormat.selectedKeyValue[0];
                        downloadFileParams.isSearchParam = false;
                        downloadFileParams.transactionType = transType;//this.transactionType === OLBConstants.ALL ? OLBConstants.BOTH : this.transactionType;
                      	downloadFileParams.searchTransactionType = transType
                        this.loadAccountModule().presentationController.downloadTransactionFile(downloadFileParams);
                        this.view.flxDownloadTransaction.isVisible = false;
                    }
                } else {
                    if (this.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN) && this.transactionType === "LoanSchedule") {
                        this.view.downloadLoanSchedule.flxDowntimeWarning.setVisibility(true);
                        accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                        CommonUtilities.setText(this.view.downloadLoanSchedule.lblDowntimeWarning, message, accessibilityConfig);
                        this.view.downloadLoanSchedule.lblDowntimeWarning.setFocus(true);
                        this.view.lblDowntimeWarning.setFocus(true);
                    } else {
                        this.view.downloadTransction.flxDowntimeWarning.setVisibility(true);
                        accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                        CommonUtilities.setText(this.view.downloadTransction.lblDowntimeWarning, message, accessibilityConfig);
                        this.view.downloadTransction.lblDowntimeWarning.setFocus(true);
                        this.view.lblDowntimeWarning.setFocus(true);
                    }
                }
            } else {
                FormControllerUtility.showProgressBar(this.view);
                var searchDownloadFileParams = {};
                var startDate = downloadSearchResult.searchStartDate;
                var endDate = downloadSearchResult.searchEndDate;
                if (scope.context.hasOwnProperty("Account_id")) var accountID = scope.context.Account_id;
                else if (scope.context.hasOwnProperty("accountID")) var accountID = scope.context.accountID;
                var commandObj = {
                    transactionType: downloadSearchResult.transactionType,
                    searchDescription: downloadSearchResult.searchDescription,
                    searchMinAmount: downloadSearchResult.searchMinAmount,
                    searchMaxAmount: downloadSearchResult.searchMaxAmount,
                    searchStartDate: startDate,
                    searchEndDate: endDate,
                    isScheduled: false, //as per the reqirement from backend explicitly sending this value
                    fromCheckNumber: downloadSearchResult.fromCheckNumber,
                    toCheckNumber: downloadSearchResult.toCheckNumber,
                    accountID: accountID,
					offset: downloadSearchResult.offset,
					order: downloadSearchResult.order,
					requestType: downloadSearchResult.requestType,
					searchDateRange: downloadSearchResult.searchDateRange,
                  	accountNumber: accountID,
                  	searchTransactionType: downloadSearchResult.transactionType
                };
                if (this.selectedTab === "Blocked")
                {
                    commandObj.searchTransactionType="Blocked";
                    commandObj.lockReason=downloadSearchResult.lockReason;
                    commandObj.lockedEventId=downloadSearchResult.lockedEventId;

                }
                searchDownloadFileParams.searchParams = commandObj;
                searchDownloadFileParams.format = this.view.searchDownloadTransction.lbxSelectFormat.selectedKeyValue[0];
                searchDownloadFileParams.isSearchParam = true;
                searchDownloadFileParams.transactionType = downloadSearchResult.transactionTypeSelected === OLBConstants.ALL ? OLBConstants.BOTH : downloadSearchResult.transactionTypeSelected;
                this.loadAccountModule().presentationController.downloadTransactionFile(searchDownloadFileParams);
				this.view.searchDownloadTransction.flxKeyword.isVisible = false;
                this.view.searchDownloadTransction.flxTimePeriod.isVisible = false;
                this.view.searchDownloadTransction.flxAmountRange.isVisible = false;
                this.view.searchDownloadTransction.flxType.isVisible = false;
                this.view.searchDownloadTransction.flxCheckNumber.isVisible = false;
                this.view.flxSearchDownloadTransaction.isVisible = false;
            }
        },
        /**
         * Method to show error message if Download is not completed
         * @param {Object} obj
         * @returns {Boolean} true/false
         */
        getFileDownloadErrorMessage: function(obj) {
            if (this.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN) && this.transactionType === "LoanSchedule") {
                if (!this.view.downloadLoanSchedule.lbxSelectType.selectedKeyValue) {
                    return kony.i18n.getLocalizedString("i18n.AccountDetails.installmentTypeEmpty");
                }
                if (!this.view.downloadLoanSchedule.lbxSelectFormat.selectedKeyValue) {
                    return kony.i18n.getLocalizedString("i18n.AccountsDetails.formatEmpty");
                }
                return false;
            } else {
              /*  var fromDateObj = this.view.downloadTransction.calFromDate;
                var toDateObj = this.view.downloadTransction.calToDate;
                if (!fromDateObj.formattedDate || fromDateObj.formattedDate === "") {
                    return kony.i18n.getLocalizedString("i18n.Calendar.startDateEmpty");
                }
                if (!toDateObj.formattedDate || toDateObj.formattedDate === "") {
                    return kony.i18n.getLocalizedString("i18n.Calendar.endDateEmpty");
                }
                var fromDate = new Date(fromDateObj.year, fromDateObj.month - 1, fromDateObj.day);
                var toDate = new Date(toDateObj.year, toDateObj.month - 1, toDateObj.day);
                if (fromDate > new Date()) {
                    return kony.i18n.getLocalizedString("i18n.Calendar.futureStartDate");
                }
                if (toDate > new Date()) {
                    return kony.i18n.getLocalizedString("i18n.Calendar.futureEndDate");
                }
                if (fromDate > toDate) {
                    return kony.i18n.getLocalizedString("i18n.Calendar.startDateGreater");
                }
                var maxYearDate = fromDate;
                maxYearDate.setFullYear(maxYearDate.getFullYear() + 1);
                maxYearDate.setDate(maxYearDate.getDate() - 1);
                if (toDate > maxYearDate) {
                    return kony.i18n.getLocalizedString("i18n.Calendar.maximumRange");
                }
                return false;*/
            }
        },
        /**
         * Method that gets called on postshow of frmAccountDetails
         */
        postShowFrmAccountDetails: function() {
            var scopeObj = this;
            this.view.customheader.forceCloseHamburger();
            this.view.AllForms.flxCross.onClick = function() {
                scopeObj.view.AllForms.setVisibility(false);
            };
            this.view.accountSummary.flxInfo.onClick = function() {
                if (scopeObj.view.AllForms.isVisible === false) {
                    scopeObj.view.AllForms.setVisibility(true);
                    if (scopeObj.view.flxDowntimeWarning.isVisible === true) scopeObj.view.AllForms.top = "360dp";
                    else scopeObj.view.AllForms.top = "280dp";
                    if (kony.application.getCurrentBreakpoint() > 1024) {
                        //To Fix ARB-10347
                        scopeObj.view.AllForms.left = scopeObj.view.flxMain.info.frame.x + scopeObj.view.accountSummary.info.frame.x + scopeObj.view.accountSummary.flxMainDesktop.info.frame.x + scopeObj.view.accountSummary.flxRight.info.frame.x + scopeObj.view.accountSummary.flxInfo.info.frame.x - 125 + "dp";
                    } else {
                        scopeObj.view.AllForms.right = "10dp";
                        scopeObj.view.AllForms.left = "";
                    }
                    if (orientationHandler.isMobile || orientationHandler.isTablet) {
                        scopeObj.view.AllForms.right = "10dp";
                        scopeObj.view.AllForms.left = "";
                    }
                } else {
                    scopeObj.view.AllForms.setVisibility(false);
                }
            };
            this.showAccountStatements();
			var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "HomepageMA",
                "moduleName": "AccountsUIModule"
            });
          /*  if(accountsModule.presentationController.showbackNavigation === false){           
              this.view.viewStatementsnew.flxConfirmButtons.isVisible = false;
            }*/
            
            this.view.flxTransactions.width = "100%";
            if (!this.view.quicklinks.link1Text.length) {
                scopeObj.view.quicklinks.isVisible = false;
            };
            if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1388 || orientationHandler.isDesktop) {
                scopeObj.view.flxSecondaryActions.right = "0%";
                scopeObj.view.flxTransactions.right = "5%";
                // scopeObj.view.quicklinks.setVisibility(true);
            }
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                if (this.view.quicklinksHid.link1Text == "quicklinks Hid 1") {
                    this.view.quicklinks.isVisible = false;
                    this.view.quicklinksHid.isVisible = false;
                    this.view.flxSecondaryActions.isVisible = true;
                    this.view.quicklinks.width = "32%";
                    this.view.quicklinks.left = "2%";
                }
                this.view.flxActions.width = "92%";
                this.view.flxActions.left = "27dp";
                this.view.flxSecondaryActions.width = "100%";
                this.view.imgSecondaryActions.right = "30dp";
            }
          	this.view.forceLayout();
            this.accessibilityFunction();
            if (this.view.quicklinks.link3Text === "Pay Off Loan") {
                this.view.flxActions.height = "65dp";
            }
            this.view.flxLogout.isVisible = false;
            this.updateRightContainerUI();
            this.view.downloadLoanSchedule.flxPopup.top = "150dp";
            this.view.imgExpired.accessibilityConfig = {
                "a11yLabel" : "Warning",
                "a11yARIA" : {
                    "role" : "presentation",
                    "tabindex" : -1
                }
            }
            if(scopeObj.view.quicklinks.isVisible === true)
                scopeObj.view.flxSecondaryActions.top = "20dp";
            else
                scopeObj.view.flxSecondaryActions.top = "0dp";  
	    this.AdjustScreen();
        },
        /**
         * Method to show server error on frmAccountDetails
         * @param {Boolean} status true/false
         */
        showServerError: function(status) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblDowntimeWarning, kony.i18n.getLocalizedString("i18n.common.OoopsServerError"), accessibilityConfig);
            if (status === true) {
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.lblDowntimeWarning.setFocus(true);
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            this.updateRightContainerUI();
            this.AdjustScreen();
        },
        /**
         * Method to show server error on frmAccountDetails
         * @param {string} sweepError message to show in the Ui
         */
        showSweepError : function(sweepError) {
            this.view.lblDowntimeWarning.text = sweepError;
            this.view.flxDowntimeWarning.setVisibility(true);
            this.updateRightContainerUI();
            this.AdjustScreen();
        },
        /**
         * Method to handle transactions sorting
         * @param {Object} event event like click etc
         * @param {JSON} data data of sortType value
         */
        onTransactionsSortClickHandler: function(event, data) {
            data['transactionType'] = this.transactionType;
            this.loadAccountModule().presentationController.Transactions.showTransactionsByType(data);
        },
        /**
         * Method to update the layout of the page
         */
        AdjustScreen: function(rowData) {
            this.view.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.customheader.info.frame.height + this.view.flxMainWrapper.info.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - this.view.flxFooter.info.frame.height;
                if (diff > 0) {
                    this.view.flxFooter.top = mainheight + diff - 70 + ViewConstants.POSITIONAL_VALUES.DP;
                } else {
                    this.view.flxFooter.top = mainheight - 70 + ViewConstants.POSITIONAL_VALUES.DP;
                }
            } else {
                this.view.flxFooter.top = (mainheight - 90) + ViewConstants.POSITIONAL_VALUES.DP;
            }
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                var ht = "";
				if (rowData != undefined && rowData.flxExpandedView.isVisible === true)
					ht = this.view.flxMain.info.frame.height - 222;
				else
					ht = this.view.flxMain.info.frame.height - 173;
                this.view.flxFooter.top = ht + ViewConstants.POSITIONAL_VALUES.DP; //"0px";
            }
            if (kony.application.getCurrentBreakpoint() <= 1024 && kony.application.getCurrentBreakpoint() > 640) {
                this.view.customfooter.flxFooterMenu.left = "25px";
            }
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                this.view.flxFooter.top = this.view.flxMainWrapper.info.frame.height;//this.view.flxMain.info.frame.height + 30;
            }
            if (kony.application.getCurrentBreakpoint() >= 1366) {
                this.view.flxFooter.top = this.view.flxMain.info.frame.height;//this.view.flxMain.info.frame.height + 60;
            }
            this.view.forceLayout();
        },
        /**
         * Method to clear search component for frmAccountDetails
         */
        clearSearch: function() {
            downloadflag = 0;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var today = new Date();
            var formatUtil = applicationManager.getFormatUtilManager();
       /*     this.view.transactions.txtKeyword.text = "";
            this.view.transactions.txtKeywordBlocked.text = "";
            this.view.transactions.lstbxTransactionType.selectedKey = OLBConstants.BOTH;
            this.view.transactions.lstbxTimePeriod.selectedKey = OLBConstants.CHOOSE_TIME_RANGE;
            this.onTimePeriodChange();
            this.view.transactions.txtCheckNumberTo.text = ""
            this.view.transactions.txtCheckNumberFrom.text = ""
            this.view.transactions.txtAmountRangeTo.text = ""
            this.view.transactions.txtAmountRangeFrom.text = ""
            this.view.transactions.calDateFrom.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
            this.view.transactions.calDateTo.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];*/
        },
        /**
         * Method to get list box items for transaction type
         * @param {String} obj  object for transactiontype or timeperiod
         * @returns {Collection} List of transaction/time period
         */
        objectToListBoxArray: function(obj) {
            var list = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    list.push([key, kony.i18n.getLocalizedString(obj[key])]);
                }
            }
            return list;
        },
        transactionTypes: {
            Both: 'i18n.accounts.allTransactions',
            Deposit: 'i18n.accounts.deposits',
            Withdrawal: 'i18n.accounts.withdrawls',
            Checks: 'i18n.accounts.checks',
            Transfers: "i18n.hamburger.transfers",
            BillPay: "i18n.billPay.BillPay",
            P2PDebits: 'i18n.accounts.p2pDebits',
            P2PCredits: 'i18n.accounts.p2pCredits'
        },
        timePeriods: {
            CHOOSE_TIME_RANGE: 'i18n.accounts.chooseTimeRange',
            LAST_SEVEN_DAYS: 'i18n.accounts.lastSevenDays',
            LAST_FOURTEEN_DAYS: 'i18n.accounts.lastFourteenDays',
            LAST_ONE_MONTH: 'i18n.accounts.lastOneMonth',
            LAST_TWO_MONTHS: 'i18n.accounts.lastTwoMonths',
            LAST_THREE_MONTHS: 'i18n.accounts.lastThreeMonths',
            LAST_SIX_MONTHS: 'i18n.accounts.lastSixMonths',
            LAST_TWELVE_MONTHS: 'i18n.accounts.lastTwelveMonths',
            CUSTOM_DATE_RANGE: 'i18n.accounts.customDateRange'
        },
        /**
         * Method to update Search ViewModel
         * @returns {JSON} Search View Model
         */
        updateSearchViewModel: function() {
            this.searchViewModel.keyword = this.view.transactions.txtKeyword.text.trim();
            this.searchViewModel.transactionTypeSelected = this.view.transactions.lstbxTransactionType.selectedKey;
            this.searchViewModel.timePeriodSelected = this.view.transactions.lstbxTimePeriod.selectedKey;
            this.searchViewModel.fromCheckNumber = this.view.transactions.txtCheckNumberFrom.text.trim();
            this.searchViewModel.toCheckNumber = this.view.transactions.txtCheckNumberTo.text.trim();
            this.searchViewModel.fromDate = this.getDateComponent(this.view.transactions.calDateFrom.formattedDate);
            this.searchViewModel.fromAmount = (this.view.transactions.txtAmountRangeFrom.text.trim() !== "") ? applicationManager.getFormatUtilManager().deFormatAmount(this.view.transactions.txtAmountRangeFrom.text.trim()) : (this.view.transactions.txtAmountRangeFrom.text.trim());
            this.searchViewModel.toAmount = (this.view.transactions.txtAmountRangeTo.text.trim() !== "") ? applicationManager.getFormatUtilManager().deFormatAmount(this.view.transactions.txtAmountRangeTo.text.trim()) : (this.view.transactions.txtAmountRangeTo.text.trim());
            this.searchViewModel.currency = this.view.transactions.lblCurrencySymbolFrom.text.trim();
            this.searchViewModel.toDate = this.getDateComponent(this.view.transactions.calDateTo.formattedDate);
            return this.searchViewModel;
        },
        /**
         * Method to validate the user for search
         * @param {JSON} formData Search View Model
         * @returns {Boolean} tru/false
         */
        userCanSearch: function(formData) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;

            function checkIfEmpty(value) {
                if (value === null || value === "") {
                    return true;
                }
                return false;
            }
            if (!checkIfEmpty(formData.keyword)) {
                return true;
            } else if (formData.transactionTypeSelected !== OLBConstants.BOTH) {
                return true;
            } else if (formData.timePeriodSelected !== OLBConstants.CHOOSE_TIME_RANGE) {
                return true;
            } else if (!checkIfEmpty(formData.fromCheckNumber) && !checkIfEmpty(formData.toCheckNumber)) {
                return true;
            } else if (!checkIfEmpty(formData.fromAmount) && !checkIfEmpty(formData.toAmount)) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * Method to update the Search Button State
         */
        checkSearchButtonState: function() {
            var formData = this.updateSearchViewModel({});
            if (this.userCanSearch(formData)) {
                this.view.transactions.enableSearchButton();
            } else {
                this.view.transactions.disableSearchButton();
            }
        },
        /**
         * Method to handle Time Period Change
         */
        onTimePeriodChange: function() {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            if (this.view.transactions.lstbxTimePeriod.selectedKey === OLBConstants.CUSTOM_DATE_RANGE) {
                this.view.transactions.showByDateWidgets();
            } else {
                this.view.transactions.hideByDateWidgets();
            }
            this.checkSearchButtonState();
        },
        /**
         * Method to get the date Range
         * @param {JSON} searchviewmodel JSON of search view
         * @returns {JSON} JSON with start and end date
         */
        getDateRangeForTimePeriod: function(searchviewmodel) {
            var startDate = null;
            var endDate = null;
            var formatUtil = applicationManager.getFormatUtilManager();
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            if (searchviewmodel.timePeriodSelected === OLBConstants.CHOOSE_TIME_RANGE) {
                startDate = "";
                endDate = "";
            } else if (searchviewmodel.timePeriodSelected === 'CUSTOM_DATE_RANGE') {
                function padDigits(n) {
                    n = n + '';
                    return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
                }
                var dd_mm_yyyy_startDate = padDigits(searchviewmodel.fromDate[0]) + "/" + padDigits(searchviewmodel.fromDate[1]) + "/" + searchviewmodel.fromDate[2];
                var dd_mm_yyyy_endDate = padDigits(searchviewmodel.toDate[0]) + "/" + padDigits(searchviewmodel.toDate[1]) + "/" + searchviewmodel.toDate[2];
                startDate = formatUtil.getFormatedDateString(formatUtil.getDateObjectFromCalendarString(dd_mm_yyyy_startDate, "DD/MM/YYYY"), formatUtil.getBackendDateFormat());
                endDate = formatUtil.getFormatedDateString(formatUtil.getDateObjectFromCalendarString(dd_mm_yyyy_endDate, "DD/MM/YYYY"), formatUtil.getBackendDateFormat());
            } else {
                var dateConfig = {
                    LAST_SEVEN_DAYS: 7,
                    LAST_FOURTEEN_DAYS: 14,
                    LAST_ONE_MONTH: 30,
                    LAST_TWO_MONTHS: 60,
                    LAST_THREE_MONTHS: 90,
                    LAST_SIX_MONTHS: 180,
                    LAST_TWELVE_MONTHS: 365
                };
                var today = new Date();
                endDate = formatUtil.getFormatedDateString(today, formatUtil.getBackendDateFormat());
                today.setDate(today.getDate() - dateConfig[searchviewmodel.timePeriodSelected]);
                startDate = formatUtil.getFormatedDateString(today, formatUtil.getBackendDateFormat());
            }
            return {
                startDate: startDate,
                endDate: endDate
            };
        },
        /**
         * Method to make search call
         */
        startSearch: function() {
            FormControllerUtility.showProgressBar(this.view);
            this.searchViewModel.searchPerformed = true;
            //this.updateSearchViewModel();
            this.searchViewModel.dateRange = this.getDateRangeForTimePeriod(this.searchViewModel);
            this.loadAccountModule().presentationController.fetchTransactionsBySearch(this.searchViewModel);
            downloadSearchResult = this.searchViewModel;
            downloadflag = 1;
        },
        /**
         * Method to bind search actions
         */
        bindSearchFormActions: function() {
            this.view.transactions.btnSearch.onClick = function() {
                this.updateSearchViewModel();
                this.startSearch();
            }.bind(this);
            this.view.transactions.btnCancel.onClick = function() {
                this.clearSearch();
                this.searchViewModel.visible = false;
                this.view.transactions.setSearchVisible(false);
                this.presenter.showAccountDetails()
                this.AdjustScreen();
            }.bind(this);
            this.view.transactions.txtKeyword.onKeyUp = this.checkSearchButtonState.bind(this);
            this.view.transactions.lstbxTransactionType.onSelection = this.checkSearchButtonState.bind(this);
            this.view.transactions.txtCheckNumberFrom.onKeyUp = this.checkSearchButtonState.bind(this);
            this.view.transactions.lstbxTimePeriod.onSelection = this.onTimePeriodChange.bind(this);
            this.view.transactions.txtCheckNumberTo.onKeyUp = this.checkSearchButtonState.bind(this);
            FormControllerUtility.wrapAmountField(this.view.transactions.txtAmountRangeFrom).onKeyUp(this.checkSearchButtonState.bind(this));
            FormControllerUtility.wrapAmountField(this.view.transactions.txtAmountRangeTo).onKeyUp(this.checkSearchButtonState.bind(this));
            var scopeObj = this
            this.view.transactions.calDateFrom.onSelection = function() {
                var fromdate = scopeObj.view.transactions.calDateFrom.formattedDate;
                var today = new Date();
                scopeObj.view.transactions.calDateTo.enableRangeOfDates([fromdate[0], fromdate[1], fromdate[2]], [today.getDate(), today.getMonth() + 1, today.getFullYear()], "skn", true);
            };
        },
        /**
         * Method to update the value in search form
         * @param {JSON} searchViewModel Search View Model
         */
        renderSearchForm: function(searchViewModel) {
            var isMobile = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile);
            this.view.transactions.setSearchVisible(true, isMobile);
            this.view.transactions.setSearchResultsVisible(false);
            this.view.transactions.txtKeyword.text = searchViewModel.keyword;
            this.view.transactions.lstbxTransactionType.masterData = searchViewModel.transactionTypes;
            this.view.transactions.lstbxTransactionType.selectedKey = searchViewModel.transactionTypeSelected;
            this.view.transactions.lstbxTimePeriod.masterData = searchViewModel.timePeriods;
            this.view.transactions.lstbxTimePeriod.selectedKey = searchViewModel.timePeriodSelected;
            this.view.transactions.txtCheckNumberFrom.text = searchViewModel.fromCheckNumber;
            this.view.transactions.txtCheckNumberTo.text = searchViewModel.toCheckNumber;
            this.view.transactions.txtAmountRangeFrom.text = searchViewModel.fromAmount;
            this.view.transactions.txtAmountRangeTo.text = searchViewModel.toAmount;
            this.view.transactions.calDateFrom.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            this.view.transactions.calDateTo.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            this.view.transactions.calDateFrom.dateComponents = searchViewModel.fromDate;
            this.view.transactions.calDateTo.dateComponents = searchViewModel.toDate;
            this.onTimePeriodChange();
            this.checkSearchButtonState();
        },
        /**
         * Method to get date component
         * @param {string} - Date string
         * @returns {Object} - dateComponent Object
         */
        getDateComponent: function(dateString) {
            var dateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(dateString, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
            return [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
        },
        /**
         * Method to hide Search Flex
         */
        hideSearchFlex: function() {
            this.view.transactions.setSearchVisible(false);
            this.view.transactions.setSearchResultsVisible(false);
        },
        /**
         * Method to update search View model
         */
        updateSearchTransactionView: function() {
            var self = this;
            this.view.transactions.flxSearch.toolTip = kony.i18n.getLocalizedString("i18n.billPay.Search");
            this.view.transactions.flxSearch.onClick = function() {
                if (self.searchViewModel.visible === true) {
                    self.searchViewModel.visible = false;
                    self.view.transactions.setSearchVisible(false);
                } else {
                    self.searchViewModel.visible = true;
                    self.view.transactions.setSearchVisible(true);
                }
                self.AdjustScreen();
            };
            if (this.searchViewModel.visible && !this.searchViewModel.searchPerformed) {
                this.renderSearchForm(this.searchViewModel);
            } else if (this.searchViewModel.visible && this.searchViewModel.searchPerformed) {
                this.showSearchResults(this.searchViewModel);
            } else {
                this.hideSearchFlex();
            }
            this.view.transactions.flxSearch.toolTip = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.billPay.Search"));
            this.bindSearchFormActions();
            this.AdjustScreen();
        },
        /**
         * Method to modify search
         */
        modifySearch: function() {
            this.searchViewModel.visible = true;
            searchPerformed = false;
            this.renderSearchForm(this.searchViewModel);
            this.AdjustScreen();
        },
        /**
         * Method to show Search Results
         * @param {JSON} searchViewModel searchViewModel - search view model
         */
        showSearchResults: function(searchViewModel) {
            var self = this;
            this.view.transactions.btnModifySearch.onClick = function() {
                self.modifySearch();
            };
            this.view.transactions.btnClearSearch.onClick = function() {
                self.presenter.showAccountDetails()
            };
            this.view.transactions.setSearchVisible(false);
            this.view.transactions.setSearchResultsVisible(true);
            this.configureActionsForTags(searchViewModel);
        },
        /**
         * Method to handle footer alignment
         */
        footeralignment: function() {
            if (kony.os.deviceInfo().screenHeight >= "900") {
                var mainheight = 0;
                var screenheight = kony.os.deviceInfo().screenHeight;
                mainheight = this.view.customheader.info.frame.height;
                mainheight = mainheight + this.view.flxMain.info.frame.height;
                var diff = screenheight - mainheight;
                if (diff > 0) {
                    this.view.flxFooter.top = diff + ViewConstants.POSITIONAL_VALUES.DP;
                }
            }
        },
        /**
         * Method to show or hide account info
         */
        showAccountInfo: function() {
            //this.view.moreActions.setVisibility(false);
            this.view.quicklinksHid.setVisibility(false); /*quick links Hid*/
            this.view.accountActionsMobile.setVisibility(false);
            this.view.quicklinksMobile.setVisibility(false); /*quick links Mobile*/
            this.view.accountSummary.btnAccountInfo.skin = ViewConstants.SKINS.ACCOUNT_SUMMARY_SELETED;
            //this.view.accountSummary.btnAccountInfo.hoverSkin = ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_SELECTED_HOVER;
            this.view.accountSummary.btnAccountSummary.skin = ViewConstants.SKINS.TAB_INACTIVE;
            //this.view.accountSummary.btnAccountSummary.hoverSkin = ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_UNSELECTED_HOVER;
            this.view.accountSummary.btnBalanceDetails.skin = ViewConstants.SKINS.TAB_INACTIVE;
            //this.view.accountSummary.btnBalanceDetails.hoverSkin = ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_UNSELECTED_HOVER;
            this.view.accountSummary.flxSummaryDesktop.isVisible = false;
            this.view.accountSummary.flxBalanceDetailDesktop.isVisible = false;
            this.view.accountSummary.flxAccountInfoDesktop.isVisible = true;
            this.view.accountSummary.flxAccountInfoDesktop.flxWrapperHorizontal.isVisible = true;
            this.view.accountSummary["flxWrapper"].isVisible = true;
            this.view.accountSummary["flxWrapper1"].isVisible = true;
            if (kony.application.getCurrentBreakpoint() !== 640) {
                this.view.accountSummary["flxWrapper1"].left = "0dp";
            }
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.accountSummary.flxAccountInfoDesktop.flxWrapperHorizontal.height = "64dp";
            }
            if (kony.application.getCurrentBreakpoint() === 640) {
                if (this.view.accountSummary["flxRoutingNumber"].isVisible === false) {
                    this.view.accountSummary.flxAccountInfoDesktop.flxWrapperHorizontal.height = "32dp";
                }
                if (this.view.accountSummary["flxSwiftCode"].isVisible === false) {
                    this.view.accountSummary.flxAccountInfoDesktop.flxWrapperHorizontal.height = "32dp";
                }
            }
            if (this.view.accountSummary["flxRoutingNumber"].isVisible === false && this.view.accountSummary["flxSwiftCode"].isVisible === false) {
                this.view.accountSummary.flxAccountInfoDesktop.flxWrapperHorizontal.isVisible = false;
            }
            if (this.view.accountSummary["flxRoutingNumber"].isVisible === false) {
                this.view.accountSummary["flxWrapper"].isVisible = false;
                if (kony.application.getCurrentBreakpoint() !== 640) {
                    this.view.accountSummary["flxWrapper1"].left = "-0.5%";
                }
            }
            if (this.view.accountSummary["flxSwiftCode"].isVisible === false) {
                this.view.accountSummary["flxWrapper1"].isVisible = false;
            }
            this.view.accountSummary.lblAccountNumber.setFocus(true);
            this.view.accountSummary.height = "";
            this.view.forceLayout();
        },
        /**
         * Method to show Account Types popup
         */
        showAccountTypes: function() {
            this.closeMoreActionPopUp();
            if (this.view.accountTypes.origin) {
                this.view.accountTypes.origin = false;
                return;
            }
            if (this.view.flxAccountTypesSection.origin) {
                this.view.flxAccountTypesSection.origin = false;
                return;
            }
            if (this.isSingleCustomerProfile) {
                if (this.view.accountTypes.isVisible == false) {
                    this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_UP;
                    if (this.view.flxDowntimeWarning.isVisible === true) {
                        this.view.accountTypes.top = "25dp";
                    }
                    this.view.accountTypes.isVisible = true;
                    isAccountTypeOpen = true;
                    this.view.flxAccountTypes.accessibilityConfig = {
                        "a11yLabel":"Currently showing details of " + this.view.lblAccountTypes.text + ". Click to show list of accounts.",
                        "a11yARIA": {
                            role: "button",
                            "aria-expanded": true
                        }
                    };
                } else {
                    this.view.accountTypes.isVisible = false;
                    this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                    isAccountTypeOpen = false;
                    this.view.flxAccountTypes.accessibilityConfig = {
                        "a11yLabel":"Currently showing details of " + this.view.lblAccountTypes.text + ". Click to show list of accounts.",
                        "a11yARIA": {
                            role: "button",
                            "aria-expanded": false
                        }
                    };
                }
            } else {
                if (this.view.flxAccountTypesSection.isVisible == false) {
                    this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_UP;
                    if (this.view.flxDowntimeWarning.isVisible === true) {
                        if (kony.application.getCurrentBreakpoint() == 1024 || orientationHandler.isTablet) {
                            this.view.flxAccountTypesSection.top = "60dp";
                        } else {
                            this.view.flxAccountTypesSection.top = 60 + this.view.flxDowntimeWarning.info.frame.height + 10 + ViewConstants.POSITIONAL_VALUES.DP;
                        }
                    } else {
                        if (kony.application.getCurrentBreakpoint() == 1024 || orientationHandler.isTablet) {
                            this.view.flxAccountTypesSection.top = "60dp";
                        } else {
                            this.view.flxAccountTypesSection.top = "3px";
                        }
                    }
                    this.view.flxAccountTypesSection.isVisible = true;
                    isAccountTypeOpen = true;
                    this.view.flxAccountTypes.accessibilityConfig = {
                        "a11yLabel":"Currently showing details of " + this.view.lblAccountTypes.text + ". Click to show list of accounts.",
                        "a11yARIA": {
                            role: "button",
                            "aria-expanded": true
                        }
                    }
                } else {
                    this.view.flxAccountTypesSection.isVisible = false;
                    this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                    isAccountTypeOpen = false;
                    this.view.flxAccountTypes.accessibilityConfig = {
                        "a11yLabel":"Currently showing details of " + this.view.lblAccountTypes.text + ". Click to show list of accounts.",
                        "a11yARIA": {
                            role: "button",
                            "aria-expanded": false
                        }
                    }
                }
            }
            this.view.forceLayout();
        },
        /**
         * Method to handle show More Actions
         
        showMoreActions: function() {
            var scopeObj = this;
            this.closeAccountTypesPopUp();
            if (scopeObj.view.moreActions.origin) {
                scopeObj.view.moreActions.origin = false;
                return;
            }
            setTimeout((function() {
                if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    scopeObj.showTabletActions()
                    return;
                }
                if (scopeObj.view.moreActions.isVisible) {
                    this.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                    this.view.moreActions.isVisible = false;
                    showMoreActionsFlag = 0;
                } else {
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                        this.view.moreActions.isVisible = true;
                    } else {
                        this.view.moreActions.width = this.view.flxSecondaryActions.info.frame.width + "dp";
                        this.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_UP;
                        var top = this.view.flxSecondaryActions.info.frame.y + 120;
                        if (this.view.flxDowntimeWarning.isVisible) {
                            top = top + 80;
                        }
                        this.view.moreActions.top = top + "dp";
                        var right = (this.view.flxMainWrapper.info.frame.width - this.view.flxMain.info.frame.width) / 2;
                        right += 0.06 * this.view.flxMain.info.frame.width;
                        //                     if (kony.application.getCurrentBreakpoint() >= 1380) {
                        //                         right -= 24;
                        //                     }
                        this.view.moreActions.right = right + "dp";
                        this.view.moreActions.setVisibility(true);
                        if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                            this.view.moreActions.right = "2%";
                            this.view.moreActions.top = "410dp";
                        }
                    }
                    showMoreActionsFlag = 1;
                    this.view.forceLayout();
                }
            }).bind(this), 0);
        },*/
        /** 
         * Method to handle show More Quick Links (quicklinksHid)
         */
        showQuickLinksHid: function() {
            var scopeObj = this;
            var isMirrorLayoutEnabled = CommonUtilities.isMirrorLayoutEnabled();
            this.closeAccountTypesPopUp();
            setTimeout((function() {
                if ((kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) || (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)) {
                  if(this.accountType == "mortgageFacility" || this.accountType == "Loan"){
                    this.view.flxPrimaryActions.setVisibility(false);
                    } else {
                      this.view.flxPrimaryActions.setVisibility(false);
                    }
                    this.view.quicklinks.setVisibility(false);
                    scopeObj.showTabletQuickLinksActions(); /* quick Links Mobile */
                    return;
                } else {
                    this.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_UP;
                    this.view.quicklinksHid.setVisibility(true);
                    // if (this.view.quicklinksHid.isVisible === true) {
                    //     scopeObj.view.quicklinksHid.accSetFocus();
                    // }
                    if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                        this.view.quicklinksHid.right = "2%";
                        this.view.quicklinksHid.top = "410dp";
                    }
                    // showMoreActionsFlag = 1;
                    this.updateRightContainerUI();
                    this.view.forceLayout();
                    this.AdjustScreen();
                }
            }).bind(this), 0);
        },
        /* END show quick links Hid*/
        /**
         * Method to show balance details
         */
        showBalanceDetails: function() {
            this.view.moreActions.setVisibility(false);
            this.view.quicklinksHid.setVisibility(false); /*quick links Hid*/
            this.view.accountActionsMobile.setVisibility(false);
            this.view.quicklinksMobile.setVisibility(false); /*quick links Mobile*/
            this.view.accountSummary.flxSummaryDesktop.isVisible = false;
            this.view.accountSummary.lblTotalCreditsTitle.setFocus(true);
            this.view.accountSummary.flxAccountInfoDesktop.isVisible = false;
            this.view.accountSummary.flxBalanceDetailDesktop.isVisible = true;
            this.view.accountSummary.btnAccountInfo.skin = ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_UNSELECTED;
            //this.view.accountSummary.btnAccountInfo.hoverSkin = ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_UNSELECTED_HOVER;
            this.view.accountSummary.btnAccountSummary.skin = ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_UNSELECTED;
            //this.view.accountSummary.btnAccountSummary.hoverSkin = ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_UNSELECTED_HOVER;
            this.view.accountSummary.btnBalanceDetails.skin = ViewConstants.SKINS.ACCOUNT_SUMMARY_SELETED;
            //this.view.accountSummary.btnBalanceDetails.hoverSkin = ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_SELECTED_HOVER;
            this.view.accountSummary.height = "";
        },
        /**
         * Method to create Accounts List segment view model
         * @param {JSON} account Account for which you want to create view Model
         * @returns {JSON} View model
         */
        createAccountListSegmentsModel: function(account) {
            var updatedAccountID;
            var truncatedAccountName = CommonUtilities.getAccountName(account);
            truncatedAccountName = truncatedAccountName.substring(0, 27);
            var accountID = account.accountID;
            var externalaccountID = accountID.substring(accountID.length, accountID.indexOf('-'));
            if (account.externalIndicator && account.externalIndicator === "true") {
                updatedAccountID = externalaccountID;
            } else {
                updatedAccountID = account.accountID
            }
            this.view.accountTypes.segAccountTypes.onRowClick = this.loadAccountModule().presentationController.showAccountDetails.bind(this.loadAccountModule().presentationController, account)
            return {
                "lblUsers": {
                    "text": CommonUtilities.mergeAccountNameNumber(truncatedAccountName, updatedAccountID),
                    "toolTip": CommonUtilities.changedataCase(CommonUtilities.getAccountName(account))
                },
                "lblSeparator": "Separator",
                "flxAccountTypes": {
                    "onClick": this.loadAccountModule().presentationController.showAccountDetails.bind(this.loadAccountModule().presentationController, account)
                },
                "flxAccountTypesMobile": {
                    "onClick": this.loadAccountModule().presentationController.showAccountDetails.bind(this.loadAccountModule().presentationController, account)
                },
                template: kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile ? "flxAccountTypesMobile" : "flxAccountTypes"
            };
        },
        /**
         * Method to update accounts list segment
         * @param {Collection} accountList List of accounts
         */
        updateAccountList: function(accountList) {
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"|| applicationManager.getConfigurationManager().isSMEUser === "true"){
            if (!this.isSingleCustomerProfile) {
                this.view.segAccountTypes.rowtemplate = "flxRowDefaultAccounts";
                this.view.segAccountTypes.sectionHeaderTemplate = "flxTransfersFromListHeader";
                this.view.segAccountTypes.widgetDataMap = {
                    "flxTransfersFromListHeader": "flxTransfersFromListHeader",
                    "lblTransactionHeader": "lblTransactionHeader",
                    "imgDropDown": "imgDropDown",
                    "flxDropDown": "flxDropDown",
                    "lblTopSeperator": "lblTopSeperator",
                    "lblDefaultAccountIcon": "lblDefaultAccountIcon",
                    "lblDefaultAccountName": "lblDefaultAccountName",
                    "flxRowDefaultAccounts": "flxRowDefaultAccounts",
                    "lblSeparator": "lblSeparator",
                    "accountId": "accountId",
                    "lblAccountRoleType": "lblAccountRoleType"
                };
                if (this.isMortgage) {
                    mortgagePlans = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AccountServicesUIModule",
                        "appName": "ArrangementsMA"
                    }).presentationController.mortgagePlans;
                    var widgetFromData = this.getDataWithSections(mortgagePlans);
                } else {
                    var widgetFromData = this.getDataWithSections(accountList);
                }
                this.view.segAccountTypes.setData(widgetFromData);
                this.view.flxAccountTypesSection.forceLayout();
                this.AdjustScreen();
            } else {
                var accounts = accountList.map(this.createAccountListSegmentsModel);
                //         var dataMap = {
                //           "flxAccountTypes": "flxAccountTypes",
                //           "flxAccountTypesMobile": "flxAccountTypesMobile",
                //           "lblSeparator": "lblSeparator",
                //           "lblUsers": "lblUsers"
                //         };
                var dataMap = {
                    "flxTransfersFromListHeader": "flxTransfersFromListHeader",
                    "lblTransactionHeader": "lblTransactionHeader",
                    "imgDropDown": "imgDropDown",
                    "flxDropDown": "flxDropDown",
                    "lblTopSeperator": "lblTopSeperator",
                    "lblDefaultAccountIcon": "lblDefaultAccountIcon",
                    "lblDefaultAccountName": "lblDefaultAccountName",
                    "flxRowDefaultAccounts": "flxRowDefaultAccounts",
                    "lblSeparator": "lblSeparator",
                    "accountId": "accountId",
                    "lblAccountRoleType": "lblAccountRoleType"
                };
                if (this.isMortgage) {
                    mortgagePlans = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AccountServicesUIModule",
                        "appName": "ArrangementsMA"
                    }).presentationController.mortgagePlans;
                    var widgetData = this.getDataWithSections(mortgagePlans);
                } else {
                    var widgetData = this.getDataWithAccountTypeSections(accountList);
                }
                this.view.accountTypes.segAccountTypes.widgetDataMap = dataMap;
                this.view.accountTypes.segAccountTypes.setData(widgetData);
                this.view.accountTypes.forceLayout();
                this.AdjustScreen();
            }
        },
        /**
         * Method to create Accounts List segment view model
         * @param {JSON} account Account for which you want to create view Model
         * @returns {JSON} View model
         */
        createCombinedAccountListSegmentsModel: function(account) {
            var updatedAccountID;
            var truncatedAccountName = CommonUtilities.getAccountName(account);
            truncatedAccountName = truncatedAccountName.substring(0, 27);
            var accountID = account.accountID;
            var externalaccountID = accountID.substring(accountID.length, accountID.indexOf('-'));
            if (account.externalIndicator && account.externalIndicator === "true") {
                updatedAccountID = externalaccountID;
            } else {
                updatedAccountID = account.accountID
            }
            return {
                "lblDefaultAccountName": {
                    "text": CommonUtilities.mergeAccountNameNumber(truncatedAccountName, updatedAccountID),
                    "toolTip": CommonUtilities.changedataCase(CommonUtilities.getAccountName(account)),
                    "accessibilityConfig": {
                        "a11yARIA": {
                            tabindex: -1
                        }
                    }
                },
                "accountID": account.Account_id || account.accountID || account.accountNumber,
                "lblDefaultAccountIcon": {
                    "text": account.isBusinessAccount === "true" ? "r" : "s",
                    //"isVisible":(applicationManager.getConfigurationManager().isCombinedUser==="true")?true:false,
                    "isVisible": this.profileAccess === "both" ? true : false,
                    "accessibilityConfig": {
                        "a11yHidden": true,
                        "a11yARIA": {
                            tabindex: -1
                        }
                    }
                },
                "lblSeparator": "Separator",
                "flxRowDefaultAccounts": {
                    "onClick": this.loadAccountModule().presentationController.showAccountDetails.bind(this.loadAccountModule().presentationController, account),
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "role": "button",
                            "aria-labelledby": "lblDefaultAccountName"
                        }
                    },
                    "onKeyPress": this.onSegKeyPressCallBack
                },
                template: kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile ? "flxRowDefaultAccounts" : "flxRowDefaultAccounts"
            };
        },
        /*create row model for view statements
         */
        createSegmentsRowModel: function(account) {
            return {
                "lblDefaultAccountName": {
                    "text": CommonUtilities.getAccountDisplayName(account),
                    "toolTip": CommonUtilities.changedataCase(CommonUtilities.getAccountDisplayName(account)),
                    "accessibilityConfig": {
                        "a11yARIA": {
                            tabindex: -1
                        }
                    }
                },
                "accountID": account.Account_id || account.accountID || account.accountNumber,
                "lblDefaultAccountIcon": {
                    "text": account.isBusinessAccount === "true" ? "r" : "s",
                    //"isVisible":(applicationManager.getConfigurationManager().isCombinedUser==="true")?true:false,
                    "isVisible": this.profileAccess === "both" ? true : false,
                    "accessibilityConfig": {
                        "a11yHidden": true,
                        "a11yARIA": {
                            tabindex: -1
                        }
                    }
                },
                "lblSeparator": "Separator",
                "flxRowDefaultAccounts": {
                    "onClick": this.onAccountSelect.bind(this),
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "role": "button",
                            "aria-labelledby": "lblDefaultAccountName"
                        }
                    }
                },
                template: kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile ? "flxRowDefaultAccounts" : "flxRowDefaultAccounts"
            };
        },
        /**
         * Method to show account summary
         */
        showAccountSummary: function() {
            //this.view.moreActions.setVisibility(false);
            this.view.quicklinksHid.setVisibility(false); /*quick links Hid*/
            this.view.accountActionsMobile.setVisibility(false);
            this.view.quicklinksMobile.setVisibility(false); /*quick links Mobile*/
            this.view.accountSummary.flxSummaryDesktop.isVisible = true;
            //this.view.accountSummary.lblExtraFieldTitle.setFocus(true);
            this.view.accountSummary.flxBalanceDetailDesktop.isVisible = false;
            this.view.accountSummary.flxAccountInfoDesktop.isVisible = false;
            this.view.accountSummary.btnAccountSummary.skin = ViewConstants.SKINS.ACCOUNT_SUMMARY_SELETED;
            //this.view.accountSummary.btnAccountSummary.hoverSkin = ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_SELECTED_HOVER;
            this.view.accountSummary.btnBalanceDetails.skin = ViewConstants.SKINS.TAB_INACTIVE;
            //this.view.accountSummary.btnBalanceDetails.hoverSkin = ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_UNSELECTED_HOVER;
            this.view.accountSummary.btnAccountInfo.skin = ViewConstants.SKINS.TAB_INACTIVE;
            //this.view.accountSummary.btnAccountInfo.hoverSkin = ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_UNSELECTED_HOVER;
            this.view.accountSummary.height = "";
        },
        /**
         * Method to show account details screen and hide estatement flexes
         */
        showAccountDetailsScreen: function() {
            this.view.flxHeader.isVisible = true;
            this.view.flxMainWrapper.isVisible = true;
            this.view.flxMain.isVisible = true;
            this.view.flxEditRule.isVisible = false;
            this.view.flxCheckImage.isVisible = false;
            this.view.flxDownloadTransaction.isVisible = false;
            var text1 = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
            var text2 = kony.i18n.getLocalizedString("i18n.transfers.accountDetails");
            this.view.breadcrumb.setBreadcrumbData([{
                text: text1
            }, {
                text: text2
            }]);
            if (kony.application.getCurrentBreakpoint() <= 640 && (orientationHandler.isMobile)) {
                this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.transfers.accountDetails");
            }
            if (kony.i18n.getCurrentLocale() === "ar_AE" && (kony.application.getCurrentBreakpoint() <= 640 || orientationHandler.isMobile)) {
              //  this.view.accountTransactionList.right = "-8dp";
                this.view.flxTransactions.width = "90%";
            }
            this.view.CustomPopup.lblHeading.setFocus(true);
            this.view.flxAccountTypesAndInfo.isVisible = true;
            this.view.flxAccountSummaryAndActions.isVisible = true;
            this.view.flxViewStatements.isVisible = false;
            if (kony.application.getCurrentBreakpoint() == 1024 || orientationHandler.isTablet) {
                this.view.flxTransactions.isVisible = false;
            } else {
                this.view.flxTransactions.isVisible = true;
            }
            //this.view.transactions.flxSortDate.left = "5.5%";
            this.view.flxFooter.isVisible = true;
            this.view.accountTypes.isVisible = false;
            this.view.flxAccountTypesSection.isVisible = false;
            //this.view.moreActions.isVisible = false;
            this.view.quicklinksHid.isVisible = false; /*quick links Hid*/
            this.view.moreActionsDup.isVisible = false;
            this.view.breadcrumb.isVisible = false;
            this.AdjustScreen();
        },
        /**
         * Method to show/ hide flexes and sorting header base d on account type
         * @param {String} accountType Account type of the account
         */
        updateAccountTransactionsTypeSelector: function(accountType) {
            switch (accountType) {
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING):
                    return function() {
                        this.view.transactions.flxTabsChecking.isVisible = true;
                        this.view.transactions.flxTabsCredit.isVisible = false;
                        this.view.transactions.flxTabsDeposit.isVisible = false;
                        this.view.transactions.flxTabsLoan.isVisible = false;
                        this.view.transactions.flxSortType.isVisible = true;
                        this.view.transactions.lblSortType.isVisible = true;
                        this.view.accountSummary.flxExtraField.isVisible = false;
                    }
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CURRENT):
                    return function() {
                        this.view.transactions.flxTabsChecking.isVisible = true;
                        this.view.transactions.flxTabsCredit.isVisible = false;
                        this.view.transactions.flxTabsDeposit.isVisible = false;
                        this.view.transactions.flxTabsLoan.isVisible = false;
                        this.view.transactions.flxSortType.isVisible = false;
                        this.view.accountSummary.flxExtraField.isVisible = false;
                        this.view.transactions.lblSortType.isVisible = false;
                        this.view.transactions.imgSortType.isVisible = false;
                    }
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD):
                    return function() {
                        this.view.transactions.flxTabsChecking.isVisible = false;
                        this.view.transactions.flxTabsCredit.isVisible = true;
                        this.view.transactions.flxTabsDeposit.isVisible = false;
                        this.view.transactions.flxTabsLoan.isVisible = false;
                        this.view.transactions.flxSortType.isVisible = false;
                        this.view.transactions.lblSortType.isVisible = false;
                        this.view.transactions.imgSortType.isVisible = false;
                    }
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN):
                    return function() {
                        this.view.transactions.flxTabsChecking.isVisible = false;
                        this.view.transactions.flxTabsCredit.isVisible = false;
                        this.view.transactions.flxTabsDeposit.isVisible = false;
                        this.view.transactions.flxTabsLoan.isVisible = true;
                        this.view.transactions.flxSortType.isVisible = true;
                        this.view.transactions.lblSortType.isVisible = true;
                        this.view.transactions.imgSortType.isVisible = false;
                    }
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT):
                    return function() {
                        this.view.transactions.flxTabsChecking.isVisible = false;
                        this.view.transactions.flxTabsCredit.isVisible = false;
                        this.view.transactions.flxTabsDeposit.isVisible = true;
                        this.view.transactions.flxTabsLoan.isVisible = false;
                        this.view.transactions.flxSortType.isVisible = false;
                        this.view.transactions.lblSortType.isVisible = false;
                        this.view.transactions.imgSortType.isVisible = false;
                    }
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING):
                    return function() {
                        this.view.transactions.flxTabsChecking.isVisible = true;
                        this.view.transactions.flxTabsCredit.isVisible = false;
                        this.view.transactions.flxTabsDeposit.isVisible = false;
                        this.view.transactions.flxTabsLoan.isVisible = false;
                        this.view.transactions.flxSortType.isVisible = true;
                        this.view.accountSummary.flxExtraField.isVisible = false;
                        this.view.transactions.lblSortType.isVisible = true;
                    }
                default:
                    return function() {
                        this.view.transactions.flxTabsChecking.isVisible = false;
                        this.view.transactions.flxTabsCredit.isVisible = false;
                        this.view.transactions.flxTabsDeposit.isVisible = false;
                        this.view.transactions.flxTabsLoan.isVisible = true;
                        this.view.transactions.flxSortType.isVisible = false;
                        this.view.accountSummary.flxExtraField.isVisible = false;
                        this.view.transactions.lblSortType.isVisible = false;
                        this.view.transactions.imgSortType.isVisible = false;
                    }
            };
        },
        /**
         * Method to gets sking for selected account type of accounts
         * @param {String} type Account type of account
         * @returns {String} Skin for selected account type
         */
        getSkinForAccount: function(type) {
            switch (type) {
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING):
                    return ViewConstants.SKINS.ACCOUNT_DETAILS_IDENTIFIER_SAVINGS
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING):
                    return ViewConstants.SKINS.ACCOUNT_DETAILS_IDENTIFIER_CHECKING
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD):
                    return ViewConstants.SKINS.ACCOUNT_DETAILS_IDENTIFIER_CREDIT_CARD
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT):
                    return ViewConstants.SKINS.ACCOUNT_DETAILS_IDENTIFIER_DEPOSIT
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE):
                    return ViewConstants.SKINS.ACCOUNT_DETAILS_IDENTIFIER_MORTGAGE
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN):
                    return ViewConstants.SKINS.ACCOUNT_DETAILS_IDENTIFIER_LOAN
                default:
                    return ViewConstants.SKINS.ACCOUNT_DETAILS_IDENTIFIER_UNCONFIGURED
            }
        },
        /**
         * Method to update account details- account details section
         * @param {JSON} account Account whose details needs to be updated
         */
        updateAccountDetails: function(account) {
            var scopeObj = this;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            var formatManager = applicationManager.getFormatUtilManager();
            this.accountCurrency = applicationManager.getConfigurationManager().currencyCode[account.currencyCode];
            this.view.lblCurrencySymbolFrom.text=this.accountCurrency;
            this.view.lblCurrencySymbolTo.text=this.accountCurrency;
            var count = 0;
            if (account.expiresAt && account.expiresAt !== undefined) {
                var targetDate = CommonUtilities.getDateAndTime(account.expiresAt);
                var expireDate = (targetDate.split(","))[0];
                var today = kony.os.date(dateFormat);
                var todayDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(today, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase())
                var targetDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(expireDate, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase())
                var difference = targetDateObj - todayDateObj;
                count = Math.ceil(difference / (1000 * 60 * 60 * 24));
            }
            var updatedAccountID;
            var accountID = account.accountID;
            var externalaccountID = accountID.substring(accountID.length, accountID.indexOf('-'));
            if (account.externalIndicator && account.externalIndicator === "true") {
                updatedAccountID = externalaccountID;
            } else {
                updatedAccountID = account.accountID
            }
            this.view.accountSummary.flxIdentifier.skin = this.getSkinForAccount(account.accountType);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            if (kony.application.getCurrentBreakpoint() <= 640 && (orientationHandler.isMobile)) {
                var truncatedAccountName = CommonUtilities.getAccountName(account);
                truncatedAccountName = truncatedAccountName.substring(0, 27);
                updatedAccountName = CommonUtilities.mergeAccountNameNumber(truncatedAccountName, updatedAccountID);
            } else updatedAccountName = CommonUtilities.mergeAccountNameNumber(account.nickName || account.accountName, updatedAccountID);
            CommonUtilities.setText(this.view.lblAccountTypes, updatedAccountName);
            CommonUtilities.setText(this.view.AllForms.lblInfo, kony.i18n.getLocalizedString("i18n.WireTransfers.Information"));
            this.view.lblAccountTypes.parent.forceLayout();
            this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            this.view.downloadTransction.btnCancel.onClick = function(accountObj) {
                scopeObj.view.flxDownloadTransaction.isVisible = false;
                scopeObj.view.flxDownload.setActive(true);
                //scopeObj.loadAccountModule().presentationController.showAccountDetails(accountObj);
              //  scopeObj.view.accountTransactionList.setBackFocus();
            }.bind(this, account);
            this.view.downloadLoanSchedule.btnCancel.onClick = function(accountObj) {
                scopeObj.view.flxDownloadLoanSchedule.isVisible = false;
                //scopeObj.loadAccountModule().presentationController.showAccountDetails(accountObj);
            }.bind(this, account);
            this.view.searchDownloadTransction.btnCancel.onClick = function(accountObj) {
				scopeObj.view.flxSearchDownloadTransaction.isVisible = false;
				/*scopeObj.view.searchDownloadTransction.flxKeyword.isVisible = false;
                scopeObj.view.searchDownloadTransction.flxTimePeriod.isVisible = false;
                scopeObj.view.searchDownloadTransction.flxAmountRange.isVisible = false;
                scopeObj.view.searchDownloadTransction.flxType.isVisible = false;
                scopeObj.view.searchDownloadTransction.flxCheckNumber.isVisible = false;
                this.updateSearchViewModel();
                this.startSearch();*/
             //   scopeObj.view.accountTransactionList.setBackFocus();
            }.bind(this, account);
            if (account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING)) {
                if (kony.application.getCurrentBreakpoint() !== 640) {
                    this.view.accountSummary.flxExtraField.isVisible = true;
                    this.view.accountSummary.flxPendingWithdrawals.isVisible = false;
                    // this.view.accountSummary.flxLeft.height = "215dp";
                    this.view.accountSummary.btnBalanceDetails.text = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    this.view.accountSummary.btnBalanceDetails.toolTip = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceRightTitle, kony.i18n.getLocalizedString("i18n.accounts.currentBalance"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceRightValue, CommonUtilities.formatCurrencyWithCommas(account.currentBalance, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldTitle, kony.i18n.getLocalizedString("i18n.accountDetail.pendingDeposit"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldValue, CommonUtilities.formatCurrencyWithCommas(account.pendingDeposit, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceTitle, kony.i18n.getLocalizedString("i18n.accountDetail.pendingWithdrawals"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.pendingWithdrawal, false, account.currencyCode), accessibilityConfig);
                    if (account && account.isBusinessAccount && account.isBusinessAccount == "true") {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.common.companyName"), accessibilityConfig);
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.MembershipName, accessibilityConfig);
                    } else {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.customerName"), accessibilityConfig);
                        try {
                            var customerName = JSON.parse(account.accountHolder);
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, customerName.fullname, accessibilityConfig);
                        } catch (e) {
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.accountHolder, accessibilityConfig);
                        }
                    }
                    CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidTitle, kony.i18n.getLocalizedString("i18n.accountDetails.lastPaidInterest"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidValue, CommonUtilities.formatCurrencyWithCommas(account.dividendLastPaidAmount, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblPaidOnTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidInterestYTD"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblPaidOnValue, CommonUtilities.formatCurrencyWithCommas(account.dividendPaidYTD, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidOn"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsValue, CommonUtilities.getFrontendDateString(account.lastPaymentDate), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.creditInterestRate"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsValue, account.dividendRate + '%', accessibilityConfig);
                    if (account.externalIndicator && account.externalIndicator === "true") {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getDateAndTime(account.processingTime));
                        this.view.flxRenewExpired.setVisibility(true);
                        this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime2");
                        this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                        this.view.imgExpired.src = "bluealert_2.png";
                        this.view.btnRenew.onClick = this.renewConnectionInfo.bind(this, account);
                        if (count <= 0) {
                            this.view.imgExpired.src = "alert_1.png";
                            this.view.lblRenewExpired.skin = "skntxtSSPff000015pxlbl";
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired1");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired2");
                        } else if (count <= account.connectionAlertDays) {
                            this.view.imgExpired.src = "bluealert_2.png";
                            this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime3");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime3");
                        }
                        this.view.flxRenewExpired.forceLayout();
                    } else {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getFrontendDateString(new Date().toISOString()));
                        this.view.flxRenewExpired.setVisibility(false);
                    }
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceTitle, kony.i18n.getLocalizedString("i18n.accounts.availableBalance"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode), accessibilityConfig);
                    this.view.AllForms.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.iIcon.accounts.SavingCurrentAccount");
                    this.view.accountSummary.flxDummyOne.isVisible = false;
                    this.view.accountSummary.flxDummyTwo.isVisible = false;
                    this.view.accountSummary.flxDividentRate.setVisibility(false);
                    this.view.accountSummary.flxDividentRateYTD.setVisibility(false);
                    this.view.accountSummary.flxPendingDeposits.setVisibility(true);
                    this.view.accountSummary.flxCurrentBalance.setVisibility(true);
                    this.view.accountSummary.flxCurrentBalanceRight.setVisibility(true);
                } else {
                    this.view.accountSummary.flxExtraField.isVisible = true;
                    this.view.accountSummary.flxPendingWithdrawals.isVisible = false;
                    //  this.view.accountSummary.flxLeft.height = "preferred";
                    this.view.accountSummary.btnBalanceDetails.text = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    this.view.accountSummary.btnBalanceDetails.toolTip = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceRightTitle, kony.i18n.getLocalizedString("i18n.accounts.currentBalance"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceRightValue, CommonUtilities.formatCurrencyWithCommas(account.currentBalance, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldTitle, kony.i18n.getLocalizedString("i18n.accountDetail.pendingDeposit"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldValue, CommonUtilities.formatCurrencyWithCommas(account.pendingDeposit, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceTitle, kony.i18n.getLocalizedString("i18n.accountDetail.pendingWithdrawals"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.pendingWithdrawal, false, account.currencyCode), accessibilityConfig);
                    if (account && account.isBusinessAccount && account.isBusinessAccount == "true") {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.common.companyName"), accessibilityConfig);
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.MembershipName, accessibilityConfig);
                    } else {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.customerName"), accessibilityConfig);
                        try {
                            var customerName = JSON.parse(account.accountHolder);
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, customerName.fullname, accessibilityConfig);
                        } catch (e) {
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.accountHolder, accessibilityConfig);
                        }
                    }
                    CommonUtilities.setText(this.view.accountSummary.lblDividentRateYTDTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidInterestYTD"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblDividentRateYTDValue, CommonUtilities.formatCurrencyWithCommas(account.dividendPaidYTD, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblDividentRateTitle, kony.i18n.getLocalizedString("i18n.accountDetail.creditInterestRate"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblDividentRateValue, account.dividendRate + '%', accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidOn"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsValue, CommonUtilities.getFrontendDateString(account.lastPaymentDate), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsTitle, kony.i18n.getLocalizedString("i18n.accountDetails.lastPaidInterest"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsValue, CommonUtilities.formatCurrencyWithCommas(account.dividendLastPaidAmount, false, account.currencyCode), accessibilityConfig);
                    if (account.externalIndicator && account.externalIndicator === "true") {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getDateAndTime(account.processingTime));
                        this.view.flxRenewExpired.setVisibility(true);
                        this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime2");
                        this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                        this.view.imgExpired.src = "bluealert_2.png";
                        this.view.btnRenew.onClick = this.renewConnectionInfo.bind(this, account);
                        if (count <= 0) {
                            this.view.imgExpired.src = "alert_1.png";
                            this.view.lblRenewExpired.skin = "skntxtSSPff000015pxlbl";
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired1");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired2");
                        } else if (count <= account.connectionAlertDays) {
                            this.view.imgExpired.src = "bluealert_2.png";
                            this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime3");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime4");
                        }
                        this.view.flxRenewExpired.forceLayout();
                    } else {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getFrontendDateString(new Date().toISOString()));
                        this.view.flxRenewExpired.setVisibility(false);
                    }
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceTitle, kony.i18n.getLocalizedString("i18n.accounts.availableBalance"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode), accessibilityConfig);
                    this.view.AllForms.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.iIcon.accounts.SavingCurrentAccount");
                    this.view.accountSummary.flxDummyOne.isVisible = false;
                    this.view.accountSummary.flxDummyTwo.isVisible = false;
                    this.view.accountSummary.flxDividentRate.setVisibility(true);
                    this.view.accountSummary.flxDividentRateYTD.setVisibility(true);
                    this.view.accountSummary.flxPendingDeposits.setVisibility(true);
                    this.view.accountSummary.flxCurrentBalance.setVisibility(true);
                    this.view.accountSummary.flxTotalCredits.setVisibility(true);
                    this.view.accountSummary.flxTotalDebts.setVisibility(true);
                    this.view.accountSummary.flxPaidOn.setVisibility(false);
                    this.view.accountSummary.flxLastDividentPaid.setVisibility(false);
                    this.view.accountSummary.flxCurrentBalanceRight.setVisibility(true);
                }
            }
            if (account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD)) {
                this.view.accountSummary.flxExtraField.isVisible = true;
                this.view.accountSummary.flxPendingWithdrawals.isVisible = true;
                // this.view.accountSummary.flxLeft.height = "286dp";
                this.view.accountSummary.btnBalanceDetails.text = kony.i18n.getLocalizedString("i18n.accountDetail.balanceAndBillDetail");
                this.view.accountSummary.btnBalanceDetails.toolTip = kony.i18n.getLocalizedString("i18n.accountDetail.balanceAndBillDetail");
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.accountSummary.lblExtraFieldTitle, kony.i18n.getLocalizedString("i18n.accountDetail.availableCredit"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblExtraFieldValue, CommonUtilities.formatCurrencyWithCommas(account.availableCredit, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceTitle, kony.i18n.getLocalizedString("i18n.accountDetail.currentDueAmount"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.currentAmountDue, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.loan.dueOn"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, CommonUtilities.getFrontendDateString(account.dueDate), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPendingWithdrawalsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPendingWithdrawalsValue, CommonUtilities.formatCurrencyWithCommas(account.creditLimit, false, account.currencyCode), accessibilityConfig);
                if (account.externalIndicator && account.externalIndicator === "true") {
                    CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getDateAndTime(account.processingTime));
                    this.view.flxRenewExpired.setVisibility(true);
                    this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime2");
                    this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                    this.view.imgExpired.src = "bluealert_2.png";
                    this.view.btnRenew.onClick = this.renewConnectionInfo.bind(this, account);
                    if (count <= 0) {
                        this.view.imgExpired.src = "alert_1.png";
                        this.view.lblRenewExpired.skin = "skntxtSSPff000015pxlbl";
                        if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired1");
                        else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired2");
                    } else if (count <= account.connectionAlertDays) {
                        this.view.imgExpired.src = "bluealert_2.png";
                        this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                        if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime3");
                        else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime4");
                    }
                    this.view.flxRenewExpired.forceLayout();
                } else {
                    CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getFrontendDateString(new Date().toISOString()));
                    this.view.flxRenewExpired.setVisibility(false);
                }
                CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceTitle, kony.i18n.getLocalizedString("i18n.accounts.currentBalance"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.currentBalance, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.currentDueAmount"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsValue, CommonUtilities.formatCurrencyWithCommas(account.currentAmountDue, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.minimumDueAmount"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsValue, CommonUtilities.formatCurrencyWithCommas(account.minimumDue, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paymentDueDate"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateValue, CommonUtilities.getFrontendDateString(account.dueDate), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateYTDTitle, kony.i18n.getLocalizedString("i18n.accountDetail.lastStatementBalance"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateYTDValue, CommonUtilities.formatCurrencyWithCommas(account.lastStatementBalance, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidTitle, kony.i18n.getLocalizedString("i18n.accountDetail.lastPaymentAmount"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidValue, CommonUtilities.formatCurrencyWithCommas(account.lastPaymentAmount, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPaidOnTitle, kony.i18n.getLocalizedString("i18n.accountDetail.lastPaymentDate"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPaidOnValue, CommonUtilities.getFrontendDateString(account.lastPaymentDate), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDummyOneTitle, kony.i18n.getLocalizedString("i18n.accountDetail.rewardBalance"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDummyOneValue, account.availableCredit, accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDummyTwoTitle, kony.i18n.getLocalizedString("i18n.accountDetail.interestRate"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDummyTwoValue, CommonUtilities.formatCurrencyWithCommas(account.interestRate, false, account.currencyCode) + '%', accessibilityConfig);
                this.view.AllForms.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.iIcon.accounts.CreditCard");
                this.view.accountSummary.flxDummyOne.isVisible = true;
                this.view.accountSummary.flxDummyTwo.isVisible = true;
                this.view.accountSummary.flxDividentRate.setVisibility(true);
                this.view.accountSummary.flxDividentRateYTD.setVisibility(true);
                this.view.accountSummary.flxPendingDeposits.setVisibility(true);
                this.view.accountSummary.flxCurrentBalance.setVisibility(true);
                this.view.accountSummary.flxCurrentBalanceRight.setVisibility(false);
            }
            if (account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN) || account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE)) {
                this.view.accountSummary.btnBalanceDetails.text = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                this.view.accountSummary.btnBalanceDetails.toolTip = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                this.view.accountSummary.flxExtraField.isVisible = true;
                // this.view.accountSummary.flxLeft.height = "preferred";
                this.view.accountSummary.flxLeft.bottom = "23dp";
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.accountSummary.lblExtraFieldTitle, kony.i18n.getLocalizedString("i18n.accountDetail.principalBalance"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblExtraFieldValue, CommonUtilities.formatCurrencyWithCommas(account.principalBalance, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceTitle, kony.i18n.getLocalizedString("i18n.accountDetail.principalAmount"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.principalValue, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.currentDueAmount"), accessibilityConfig);
                if (account.nextPaymentAmount === undefined || account.nextPaymentAmount === "") account.nextPaymentAmount = 0;
                if (account.nextPaymentDate === undefined || account.nextPaymentDate === "") account.nextPaymentDate = "NA";
                CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, CommonUtilities.formatCurrencyWithCommas(account.nextPaymentAmount, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPendingWithdrawalsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.nextPaymentDueDate"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPendingWithdrawalsValue, CommonUtilities.getFrontendDateString(account.nextPaymentDate), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.interestRate"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsValue, CommonUtilities.formatCurrencyWithCommas(account.interestRate, false, account.currencyCode) + '%', accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.interestPaidYTD"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsValue, CommonUtilities.formatCurrencyWithCommas(account.interestPaidYTD, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateTitle, kony.i18n.getLocalizedString("i18n.accountDetail.lastPaymentAmount"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateValue, CommonUtilities.formatCurrencyWithCommas(account.lastPaymentAmount, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateYTDTitle, kony.i18n.getLocalizedString("i18n.accountDetail.lastPaymentDate"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateYTDValue, CommonUtilities.getFrontendDateString(account.lastPaymentDate), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidTitle, kony.i18n.getLocalizedString("i18n.accountDetail.originalAmount"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidValue, CommonUtilities.formatCurrencyWithCommas(account.originalAmount, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPaidOnTitle, kony.i18n.getLocalizedString("i18n.accountDetail.originalDate"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPaidOnValue, CommonUtilities.getFrontendDateString(account.openingDate), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDummyOneTitle, kony.i18n.getLocalizedString("i18n.loan.payOffAmount"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDummyOneValue, CommonUtilities.formatCurrencyWithCommas(account.payoffAmount, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblPendingWithdrawalsTitle, kony.i18n.getLocalizedString("i18n.loan.dueOn"), accessibilityConfig);
                this.view.AllForms.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.iIcon.accounts.Loan");
                this.view.accountSummary.flxDummyOne.isVisible = true;
                this.view.accountSummary.flxDummyTwo.setVisibility(false);
                this.view.accountSummary.flxDividentRate.setVisibility(true);
                this.view.accountSummary.flxDividentRateYTD.setVisibility(true);
                this.view.accountSummary.flxPendingDeposits.setVisibility(true);
                this.view.accountSummary.flxPendingWithdrawals.setVisibility(true);
                this.view.accountSummary.flxCurrentBalance.setVisibility(true);
                this.view.accountSummary.flxCurrentBalanceRight.setVisibility(false);
                if (account.externalIndicator && account.externalIndicator === "true") {
                    CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getDateAndTime(account.processingTime));
                    this.view.flxRenewExpired.setVisibility(true);
                    this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime2");
                    this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                    this.view.imgExpired.src = "bluealert_2.png";
                    this.view.btnRenew.onClick = this.renewConnectionInfo.bind(this, account);
                    if (count <= 0) {
                        this.view.imgExpired.src = "alert_1.png";
                        this.view.lblRenewExpired.skin = "skntxtSSPff000015pxlbl";
                        if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired1");
                        else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired2");
                    } else if (count <= account.connectionAlertDays) {
                        this.view.imgExpired.src = "bluealert_2.png";
                        this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                        if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime3");
                        else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime4");
                    }
                    this.view.flxRenewExpired.forceLayout();
                } else {
                    CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getFrontendDateString(new Date().toISOString()));
                    this.view.flxRenewExpired.setVisibility(false);
                }
                CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceTitle, kony.i18n.getLocalizedString("i18n.accounts.RemainingBalance"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance, false, account.currencyCode), accessibilityConfig);
            }
            if (account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT)) {
                if (kony.application.getCurrentBreakpoint() !== 640) {
                    this.view.accountSummary.btnBalanceDetails.text = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    this.view.accountSummary.btnBalanceDetails.toolTip = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    this.view.accountSummary.flxExtraField.isVisible = true;
                    this.view.accountSummary.flxPendingWithdrawals.isVisible = false;
                    // this.view.accountSummary.flxLeft.height = "215dp";
                    var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldTitle, kony.i18n.getLocalizedString("i18n.accountDetail.interestEarned"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldValue, CommonUtilities.formatCurrencyWithCommas(account.interestEarned, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceTitle, kony.i18n.getLocalizedString("i18n.accountDetail.maturityDate"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceValue, CommonUtilities.getFrontendDateString(account.maturityDate), accessibilityConfig);
                    if (account && account.isBusinessAccount && account.isBusinessAccount == "true") {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.common.companyName"), accessibilityConfig);
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.MembershipName, accessibilityConfig);
                    } else {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.customerName"), accessibilityConfig);
                        try {
                            var customerName = JSON.parse(account.accountHolder);
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, customerName.fullname, accessibilityConfig);
                        } catch (e) {
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.accountHolder, accessibilityConfig);
                        }
                    }
                    // CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.maturityDate"), accessibilityConfig);
                    //  CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsValue, CommonUtilities.getFrontendDateString(account.maturityDate), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsTitle, kony.i18n.getLocalizedString("i18n.accountDetails.lastPaidInterest"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsValue, CommonUtilities.formatCurrencyWithCommas(account.dividendLastPaidAmount, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblDividentRateTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidInterestYTD"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblDividentRateValue, CommonUtilities.formatCurrencyWithCommas(account.dividendPaidYTD, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblDividentRateYTDTitle, kony.i18n.getLocalizedString("i18n.accountDetail.settlementAccount"), accessibilityConfig);
                    if (account.payoutAccount !== null) {
                        CommonUtilities.setText(this.view.accountSummary.lblDividentRateYTDValue, account.payoutAccount, accessibilityConfig);
                    } else {
                        CommonUtilities.setText(this.view.accountSummary.lblDividentRateYTDValue, "", accessibilityConfig);
                    }
                    CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidTitle, kony.i18n.getLocalizedString("i18n.accountDetail.creditInterestRate"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidValue, account.interestRate + '%', accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblPaidOnTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidOn"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblPaidOnValue, CommonUtilities.getFrontendDateString(account.dividendLastPaidDate) || "", accessibilityConfig);
                    this.view.AllForms.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.iIcon.accounts.Deposit");
                    this.view.accountSummary.flxDummyTwo.isVisible = false;
                    this.view.accountSummary.flxDummyOne.setVisibility(false);
                    this.view.accountSummary.flxTotalCredits.setVisibility(false);
                    this.view.accountSummary.flxDividentRateYTD.setVisibility(true);
                    this.view.accountSummary.flxDividentRate.setVisibility(true);
                    this.view.accountSummary.flxPendingDeposits.setVisibility(true);
                    this.view.accountSummary.flxCurrentBalance.setVisibility(true);
                    this.view.accountSummary.flxCurrentBalanceRight.setVisibility(false);
                    if (account.externalIndicator && account.externalIndicator === "true") {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getDateAndTime(account.processingTime));
                        this.view.flxRenewExpired.setVisibility(true);
                        this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime2");
                        this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                        this.view.imgExpired.src = "bluealert_2.png";
                        this.view.btnRenew.onClick = this.renewConnectionInfo.bind(this, account);
                        if (count <= 0) {
                            this.view.imgExpired.src = "alert_1.png";
                            this.view.lblRenewExpired.skin = "skntxtSSPff000015pxlbl";
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired1");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired2");
                        } else if (count <= account.connectionAlertDays) {
                            this.view.imgExpired.src = "bluealert_2.png";
                            this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime3");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime4");
                        }
                        this.view.flxRenewExpired.forceLayout();
                    } else {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getFrontendDateString(new Date().toISOString()));
                        this.view.flxRenewExpired.setVisibility(false);
                    }
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceTitle, kony.i18n.getLocalizedString("i18n.accounts.currentBalance"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.currentBalance, false, account.currencyCode), accessibilityConfig);
                } else {
                    this.view.accountSummary.btnBalanceDetails.text = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    this.view.accountSummary.btnBalanceDetails.toolTip = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    this.view.accountSummary.flxExtraField.isVisible = true;
                    this.view.accountSummary.flxPendingWithdrawals.isVisible = false;
                    // this.view.accountSummary.flxLeft.height = "Preferred";
                    var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldTitle, kony.i18n.getLocalizedString("i18n.accountDetail.interestEarned"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldValue, CommonUtilities.formatCurrencyWithCommas(account.interestEarned, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceTitle, kony.i18n.getLocalizedString("i18n.accountDetail.maturityDate"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceValue, CommonUtilities.getFrontendDateString(account.maturityDate), accessibilityConfig);
                    if (account && account.isBusinessAccount && account.isBusinessAccount == "true") {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.common.companyName"), accessibilityConfig);
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.MembershipName, accessibilityConfig);
                    } else {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.customerName"), accessibilityConfig);
                        try {
                            var customerName = JSON.parse(account.accountHolder);
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, customerName.fullname, accessibilityConfig);
                        } catch (e) {
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.accountHolder, accessibilityConfig);
                        }
                    }
                    //   CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.maturityDate"), accessibilityConfig);
                    //   CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsValue, CommonUtilities.getFrontendDateString(account.maturityDate), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.creditInterestRate"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsValue, account.dividendRate + '%', accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblDividentRateTitle, kony.i18n.getLocalizedString("i18n.accountDetails.lastPaidInterest"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblDividentRateValue, CommonUtilities.formatCurrencyWithCommas(account.dividendLastPaidAmount, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidInterestYTD"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidValue, CommonUtilities.formatCurrencyWithCommas(account.dividendPaidYTD, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblPaidOnTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidOn"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblPaidOnValue, CommonUtilities.getFrontendDateString(account.dividendLastPaidDate) || "", accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblDummyOneTitle, kony.i18n.getLocalizedString("i18n.accountDetail.settlementAccount"), accessibilityConfig);
                    if (account.payoutAccount !== null) {
                        CommonUtilities.setText(this.view.accountSummary.lblDummyOneValue, account.payoutAccount, accessibilityConfig);
                    } else {
                        CommonUtilities.setText(this.view.accountSummary.lblDummyOneValue, "", accessibilityConfig);
                    }
                    this.view.AllForms.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.iIcon.accounts.Deposit");
                    this.view.accountSummary.flxDummyTwo.isVisible = false;
                    this.view.accountSummary.flxDummyOne.setVisibility(true);
                    this.view.accountSummary.flxDividentRateYTD.setVisibility(false);
                    this.view.accountSummary.flxDividentRate.setVisibility(true);
                    this.view.accountSummary.flxPendingDeposits.setVisibility(true);
                    this.view.accountSummary.flxTotalCredits.setVisibility(true);
                    this.view.accountSummary.flxCurrentBalance.setVisibility(true);
                    this.view.accountSummary.flxPaidOn.setVisibility(true);
                    this.view.accountSummary.flxLastDividentPaid.setVisibility(true);
                    this.view.accountSummary.flxTotalDebts.setVisibility(true);
                    this.view.accountSummary.flxTotalCredits.setVisibility(false);
                    this.view.accountSummary.flxCurrentBalanceRight.setVisibility(false);
                    if (account.externalIndicator && account.externalIndicator === "true") {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getDateAndTime(account.processingTime));
                        this.view.flxRenewExpired.setVisibility(true);
                        this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime2");
                        this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                        this.view.imgExpired.src = "bluealert_2.png";
                        this.view.btnRenew.onClick = this.renewConnectionInfo.bind(this, account);
                        if (count <= 0) {
                            this.view.imgExpired.src = "alert_1.png";
                            this.view.lblRenewExpired.skin = "skntxtSSPff000015pxlbl";
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired1");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired2");
                        } else if (count <= account.connectionAlertDays) {
                            this.view.imgExpired.src = "bluealert_2.png";
                            this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime3");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime4");
                        }
                        this.view.flxRenewExpired.forceLayout();
                    } else {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getFrontendDateString(new Date().toISOString()));
                        this.view.flxRenewExpired.setVisibility(false);
                    }
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceTitle, kony.i18n.getLocalizedString("i18n.accounts.currentBalance"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.currentBalance, false, account.currencyCode), accessibilityConfig);
                }
            }
            if (account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING) || account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CURRENT)) {
                if (kony.application.getCurrentBreakpoint() !== 640) {
                    this.view.accountSummary.flxExtraField.isVisible = true;
                    this.view.accountSummary.flxPendingWithdrawals.isVisible = false;
                    // this.view.accountSummary.flxLeft.height = "215dp";
                    this.view.accountSummary.btnBalanceDetails.text = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    this.view.accountSummary.btnBalanceDetails.toolTip = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceRightTitle, kony.i18n.getLocalizedString("i18n.accounts.currentBalance"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceRightValue, CommonUtilities.formatCurrencyWithCommas(account.currentBalance, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldTitle, kony.i18n.getLocalizedString("i18n.accountDetail.pendingDeposit"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldValue, CommonUtilities.formatCurrencyWithCommas(account.pendingDeposit, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceTitle, kony.i18n.getLocalizedString("i18n.accountDetail.pendingWithdrawals"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.pendingWithdrawal, false, account.currencyCode), accessibilityConfig);
                    if (account && account.isBusinessAccount && account.isBusinessAccount == "true") {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.common.companyName"), accessibilityConfig);
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.MembershipName, accessibilityConfig);
                    } else {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.customerName"), accessibilityConfig);
                        try {
                            var customerName = JSON.parse(account.accountHolder);
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, customerName.fullname, accessibilityConfig);
                        } catch (e) {
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.accountHolder, accessibilityConfig);
                        }
                    }
                    CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidOn"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsValue, CommonUtilities.getFrontendDateString(account.lastPaymentDate), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.creditInterestRate"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsValue, account.dividendRate + '%', accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidTitle, kony.i18n.getLocalizedString("i18n.accountDetails.lastPaidInterest"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidValue, CommonUtilities.formatCurrencyWithCommas(account.dividendLastPaidAmount, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblPaidOnTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidInterestYTD"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblPaidOnValue, CommonUtilities.formatCurrencyWithCommas(account.dividendPaidYTD, false, account.currencyCode), accessibilityConfig);
                    if (account.externalIndicator && account.externalIndicator === "true") {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getDateAndTime(account.processingTime));
                        this.view.flxRenewExpired.setVisibility(true);
                        this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime2");
                        this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                        this.view.imgExpired.src = "bluealert_2.png";
                        this.view.btnRenew.onClick = this.renewConnectionInfo.bind(this, account);
                        if (count <= 0) {
                            this.view.imgExpired.src = "alert_1.png";
                            this.view.lblRenewExpired.skin = "skntxtSSPff000015pxlbl";
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired1");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired2");
                        } else if (count <= account.connectionAlertDays) {
                            this.view.imgExpired.src = "bluealert_2.png";
                            this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime3");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime4");
                        }
                        this.view.flxRenewExpired.forceLayout();
                    } else {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getFrontendDateString(new Date().toISOString()));
                        this.view.flxRenewExpired.setVisibility(false);
                    }
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceTitle, kony.i18n.getLocalizedString("i18n.accounts.availableBalance"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode), accessibilityConfig);
                    this.view.AllForms.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.iIcon.accounts.SavingCurrentAccount");
                    this.view.accountSummary.flxDummyOne.setVisibility(false);
                    this.view.accountSummary.flxDummyTwo.setVisibility(false);
                    this.view.accountSummary.flxDividentRate.setVisibility(false);
                    this.view.accountSummary.flxDividentRateYTD.setVisibility(false);
                    this.view.accountSummary.flxPendingDeposits.setVisibility(true);
                    this.view.accountSummary.flxCurrentBalance.setVisibility(true);
                    this.view.accountSummary.flxCurrentBalanceRight.setVisibility(true);
                } else {
                    this.view.accountSummary.flxExtraField.isVisible = true;
                    this.view.accountSummary.flxPendingWithdrawals.isVisible = false;
                    // this.view.accountSummary.flxLeft.height = "preferred";
                    this.view.accountSummary.btnBalanceDetails.text = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    this.view.accountSummary.btnBalanceDetails.toolTip = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                    var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceRightTitle, kony.i18n.getLocalizedString("i18n.accounts.currentBalance"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceRightValue, CommonUtilities.formatCurrencyWithCommas(account.currentBalance, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldTitle, kony.i18n.getLocalizedString("i18n.accountDetail.pendingDeposit"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblExtraFieldValue, CommonUtilities.formatCurrencyWithCommas(account.pendingDeposit, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceTitle, kony.i18n.getLocalizedString("i18n.accountDetail.pendingWithdrawals"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.pendingWithdrawal, false, account.currencyCode), accessibilityConfig);
                    if (account && account.isBusinessAccount && account.isBusinessAccount == "true") {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.common.companyName"), accessibilityConfig);
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.MembershipName, accessibilityConfig);
                    } else {
                        CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.customerName"), accessibilityConfig);
                        try {
                            var customerName = JSON.parse(account.accountHolder);
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, customerName.fullname, accessibilityConfig);
                        } catch (e) {
                            CommonUtilities.setText(this.view.accountSummary.lblPendingDepositsValue, account.accountHolder, accessibilityConfig);
                        }
                    }
                    CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidOn"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsValue, CommonUtilities.getFrontendDateString(account.lastPaymentDate), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsTitle, kony.i18n.getLocalizedString("i18n.accountDetails.lastPaidInterest"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsValue, CommonUtilities.formatCurrencyWithCommas(account.dividendLastPaidAmount, false, account.currencyCode), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidTitle, kony.i18n.getLocalizedString("i18n.accountDetail.creditInterestRate"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblLastDividentPaidValue, account.dividendRate + '%', accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblPaidOnTitle, kony.i18n.getLocalizedString("i18n.accountDetail.paidInterestYTD"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblPaidOnValue, CommonUtilities.formatCurrencyWithCommas(account.dividendPaidYTD, false, account.currencyCode), accessibilityConfig);
                    if (account.externalIndicator && account.externalIndicator === "true") {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getDateAndTime(account.processingTime));
                        this.view.flxRenewExpired.setVisibility(true);
                        this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime2");
                        this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                        this.view.imgExpired.src = "bluealert_2.png";
                        this.view.btnRenew.onClick = this.renewConnectionInfo.bind(this, account);
                        if (count <= 0) {
                            this.view.imgExpired.src = "alert_1.png";
                            this.view.lblRenewExpired.skin = "skntxtSSPff000015pxlbl";
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired1");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired1");
                        } else if (count <= account.connectionAlertDays) {
                            this.view.imgExpired.src = "bluealert_2.png";
                            this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                            if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime3");
                            else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime4");
                        }
                        this.view.flxRenewExpired.forceLayout();
                    } else {
                        CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getFrontendDateString(new Date().toISOString()));
                        this.view.flxRenewExpired.setVisibility(false);
                    }
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceTitle, kony.i18n.getLocalizedString("i18n.accounts.availableBalance"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode), accessibilityConfig);
                    this.view.AllForms.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.iIcon.accounts.SavingCurrentAccount");
                    this.view.accountSummary.flxDummyOne.setVisibility(false);
                    this.view.accountSummary.flxDummyTwo.setVisibility(false);
                    this.view.accountSummary.flxDividentRate.setVisibility(false);
                    this.view.accountSummary.flxDividentRateYTD.setVisibility(false);
                    this.view.accountSummary.flxTotalCredits.setVisibility(true);
                    this.view.accountSummary.flxLastDividentPaid.setVisibility(true);
                    this.view.accountSummary.flxPaidOn.setVisibility(true);
                    this.view.accountSummary.flxTotalDebts.setVisibility(true);
                    this.view.accountSummary.flxPendingDeposits.setVisibility(true);
                    this.view.accountSummary.flxPendingWithdrawals.setVisibility(false);
                    this.view.accountSummary.flxCompanyName.setVisibility(false);
                    this.view.accountSummary.flxCurrentBalance.setVisibility(true);
                    this.view.accountSummary.flxCurrentBalanceRight.setVisibility(true);
                }
            }
            if (account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LINE_OF_CREDIT)) {
                this.view.accountSummary.btnBalanceDetails.text = kony.i18n.getLocalizedString("i18n.accountDetail.balanceAndInterestDetail");
                this.view.accountSummary.btnBalanceDetails.toolTip = kony.i18n.getLocalizedString("i18n.accountDetail.balanceAndInterestDetail");
                this.view.accountSummary.flxExtraField.isVisible = false;
                this.view.accountSummary.flxPendingWithdrawals.isVisible = false;
                // this.view.accountSummary.flxLeft.height = "215dp";
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceTitle, kony.i18n.getLocalizedString("i18n.accounts.availableBalance"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceRightTitle, kony.i18n.getLocalizedString("i18n.accounts.currentBalance"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblCurrentBalanceRightValue, CommonUtilities.formatCurrencyWithCommas(account.currentBalance, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.interestRate"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalCreditsValue, CommonUtilities.formatCurrencyWithCommas(account.interestRate, false, account.currencyCode) + '%', accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsTitle, kony.i18n.getLocalizedString("i18n.accountDetail.regularPaymentAmount"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblTotalDebtsValue, CommonUtilities.formatCurrencyWithCommas(account.regularPaymentAmount, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateTitle, kony.i18n.getLocalizedString("i18n.accountDetail.currentDueAmount"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateValue, CommonUtilities.formatCurrencyWithCommas(account.currentAmountDue, false, account.currencyCode), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateYTDTitle, kony.i18n.getLocalizedString("i18n.accountDetail.dueDate"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblDividentRateYTDValue, CommonUtilities.getFrontendDateString(account.dueDate), accessibilityConfig);
                this.view.accountSummary.flxBalanceDetailsRight.isVisible = false;
                if (account.externalIndicator && account.externalIndicator === "true") {
                    CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getDateAndTime(account.processingTime));
                    this.view.flxRenewExpired.setVisibility(true);
                    this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime2");
                    this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                    this.view.imgExpired.src = "bluealert_2.png";
                    this.view.btnRenew.onClick = this.renewConnectionInfo.bind(this, account);
                    if (count <= 0) {
                        this.view.imgExpired.src = "alert_1.png";
                        this.view.lblRenewExpired.skin = "skntxtSSPff000015pxlbl";
                        if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired1");
                        else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionExpired2");
                    } else if (count <= account.connectionAlertDays) {
                        this.view.imgExpired.src = "bluealert_2.png";
                        this.view.lblRenewExpired.skin = "sknSSP4176a415px"
                        if (kony.application.getCurrentBreakpoint() > 1024) this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime3");
                        else this.view.lblRenewExpired.text = kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime1") + count + kony.i18n.getLocalizedString("i18n.accountDetails.connectionTime4");
                    }
                    this.view.flxRenewExpired.forceLayout();
                } else {
                    CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getFrontendDateString(new Date().toISOString()));
                    this.view.flxRenewExpired.setVisibility(false);
                }
                CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceTitle, kony.i18n.getLocalizedString("i18n.accounts.availableBalance"), accessibilityConfig);
                CommonUtilities.setText(this.view.accountSummary.lblAvailableBalanceValue, CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode), accessibilityConfig);
                this.view.accountSummary.flxDummyOne.isVisible = false;
                this.view.accountSummary.flxDummyTwo.isVisible = false;
                this.view.accountSummary.flxPaidOn.isVisible = false;
                this.view.accountSummary.flxDividentRate.setVisibility(true);
                this.view.accountSummary.flxDividentRateYTD.setVisibility(true);
                this.view.accountSummary.flxPendingDeposits.setVisibility(false);
                this.view.accountSummary.flxCurrentBalance.setVisibility(true);
                this.view.accountSummary.flxCurrentBalanceRight.setVisibility(true);
            }
            if (account.accountType == 'mortgageFacility') {
                CommonUtilities.setText(this.view.flexRight.lblAsOf, kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + CommonUtilities.getFrontendDateString(new Date().toISOString()));
            }
            if (this.isSingleCustomerProfile === false) {
                //if(applicationManager.getConfigurationManager().isCombinedUser === "true") {
                this.view.flxImgAccountTypeIcon.isVisible = this.profileAccess === "both" ? true : false;
                if (account.isBusinessAccount === "true") {
                    this.view.imgAccountTypeIcon.text = 'r';
                    this.view.accountSummary.flxCompanyName.setVisibility(true);
                    var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                    this.view.accountSummary.lblCompanyNameColon.text = ":"
                    CommonUtilities.setText(this.view.accountSummary.lblCompanyName, kony.i18n.getLocalizedString("i18n.common.companyName"), accessibilityConfig);
                    CommonUtilities.setText(this.view.accountSummary.lblCompanyNameValue, account.MembershipName, accessibilityConfig);
                } else if (account.isBusinessAccount === "false") {
                    this.view.imgAccountTypeIcon.text = 's';
                    this.view.accountSummary.flxCompanyName.setVisibility(false);
                }
                CommonUtilities.setText(this.view.lblAccountTypes, CommonUtilities.getAccountName(account) + "...." + (updatedAccountID.substr(-4)));
                //CommonUtilities.setText(this.view.lblAccountTypes, CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account) , updatedAccountID))
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                    this.view.accountSummary.lblAvailableBalanceValue.right = "10dp";
                    this.view.accountSummary.lblAvailableBalanceValue.height = "21px";
                    this.view.accountSummary.lblAvailableBalanceValue.top = "0dp";
                    //this.view.imgAccountTypes.left = "3%";
                    //this.view.lblAccountTypes.width = "80%";
                    this.view.accountSummary.flxLeft5.left = "10dp";
                    this.view.accountSummary.lblCompanyNameValue.left = "10dp";
                }
                this.view.lblAccountTypes.parent.forceLayout();
            } else {
                this.view.flxImgAccountTypeIcon.isVisible = false;
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                    this.view.accountSummary.lblAvailableBalanceValue.right = "10dp";
                    this.view.accountSummary.lblAvailableBalanceValue.height = "21px";
                    this.view.accountSummary.lblAvailableBalanceValue.top = "0dp";
                    //this.view.imgAccountTypes.left = "10%";
                    //this.view.lblAccountTypes.width = "80%";
                    this.view.accountSummary.flxLeft5.left = "10dp";
                    this.view.accountSummary.lblCompanyNameValue.left = "10dp";
                }
                this.view.accountSummary.flxCompanyName.setVisibility(false);
            }
            this.view.flexRight.lblAsOf.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.lblAccountTypes.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
            this.view.accountSummary.forceLayout();
            this.updateRightContainerUI();
        },
        renewConnectionInfo: function(account) {
            var arrangementsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            });
            var bankCode = arrangementsModule.presentationController.accountDetails.Accounts[0].bankCode;
            var params = {
                bankCode: account.bankCode || bankCode,
                type: "reauthenticateConnection"
            }
            var externalAccountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ExternalAccountsUIModule",
                "appName": "AccAggregationMA"
            });
            externalAccountMod.presentationController.getTermsAndConditions(params);
        },
        /**
         * Method to align account types to AccountSelection images
         */
        alignAccountTypesToAccountSelectionImg: function() {
            var getNumber = function(str) {
                if (str.length > 2) {
                    return Number(str.substring(0, str.length - 2));
                }
                return 0;
            };
            var topImgCenter = this.view.imgAccountTypes.info.frame.x + (this.view.imgAccountTypes.info.frame.width / 2);
            var bottomImgLeftPos = (topImgCenter - (getNumber(this.view.accountTypes.imgToolTip.width) / 2));
            this.view.accountTypes.imgToolTip.left = bottomImgLeftPos + ViewConstants.POSITIONAL_VALUES.DP;
        },
        /**
         * Method to update account information
         * @param {JSON} account Account whose information needs to be updated
         */
        updateAccountInfo: function(account) {
            var controller = this;
            var LabelToDisplayMap = {
                accountNumber: kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                routingNumber: kony.i18n.getLocalizedString("i18n.accounts.routingNumber"),
                swiftCode: kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                accountName: kony.i18n.getLocalizedString("i18n.accounts.primaryholder"),
                primaryAccountHolder: (account && (account.isBusinessAccount || account.isBusinessAccount == "true")) ? kony.i18n.getLocalizedString("i18n.common.companyName") : kony.i18n.getLocalizedString("i18n.accounts.primaryholder"),
                jointHolder: kony.i18n.getLocalizedString("i18n.accounts.jointHolder"),
                creditcardNumber: kony.i18n.getLocalizedString("i18n.accountDetail.creditCardNumber"),
                creditIssueDate: kony.i18n.getLocalizedString("i18n.accountDetail.creditIssueDate"),
                iban: kony.i18n.getLocalizedString("i18n.Accounts.IBAN")
            };
            var accountHolderFullName = function(accountHolder) {
                try {
                    var accountHolder = JSON.parse(accountHolder);
                    return accountHolder.fullname;
                } catch (exception) {
                    return accountHolder;
                }
            };
            var jointAccountHolders = function(accountHolderslist) {
                var accountHoldersNameList = "";
                try {
                    accountHolders = JSON.parse(accountHolderslist);
                    for (var index in accountHolders) {
                        accountHoldersNameList = accountHoldersNameList + accountHolders[index].fullname + ", ";
                    }
                    accountHoldersNameList = accountHoldersNameList.slice(0, -2);
                    return accountHoldersNameList;
                } catch (exception) {
                    return accountHolderslist
                }
            };
            var accountInfo = {
                accountName: CommonUtilities.getAccountName(account),
                accountNumber: CommonUtilities.getMaskedAccountNumber(account.accountID),
                accountID: account.accountID,
                accountType: account.accountType,
                routingNumber: account.routingNumber,
                swiftCode: account.swiftCode,
                primaryAccountHolder: (account && (account.isBusinessAccount || account.isBusinessAccount == "true")) ? account.MembershipName : accountHolderFullName(account.accountHolder),
                jointHolder: jointAccountHolders(account.jointHolders),
                creditIssueDate: CommonUtilities.getFrontendDateString(account.openingDate),
                creditcardNumber: account.creditCardNumber,
                iban: account.IBAN ? applicationManager.getFormatUtilManager().formatIBAN(account.IBAN) : ""
            }
            var AccountTypeConfig = {};
            AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING)] = ['accountNumber', 'routingNumber', 'swiftCode', 'primaryAccountHolder', 'jointHolder', 'iban'];
            AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD)] = ['creditcardNumber', '', '', 'primaryAccountHolder', 'creditIssueDate', 'iban'];
            AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE)] = ['accountNumber', '', '', 'primaryAccountHolder', 'jointHolder', 'iban'];
            AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN)] = ['accountNumber', '', '', 'primaryAccountHolder', 'jointHolder', 'iban'];
            AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT)] = ['accountNumber', '', '', 'primaryAccountHolder', 'jointHolder', 'iban'];
            AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING)] = ['accountNumber', 'routingNumber', 'swiftCode', 'primaryAccountHolder', 'jointHolder', 'iban'];
            AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE_FACILITY)] = ['accountNumber', '', '', 'primaryAccountHolder', 'jointHolder', 'iban'];
            var AccountInfoUIConfigs = [{
                flx: 'flx' + 'AccountNumber',
                label: 'lbl' + 'AccountNumber',
                value: 'lbl' + 'AccountNumber' + 'Value'
            }, {
                flx: 'flx' + 'RoutingNumber',
                label: 'lbl' + 'RoutingNumber',
                value: 'lbl' + 'RoutingNumber' + 'Value'
            }, {
                flx: 'flx' + 'SwiftCode',
                label: 'lbl' + 'SwiftCode',
                value: 'lbl' + 'SwiftCode' + 'Value'
            }, {
                flx: 'flx' + 'PrimaryHolder',
                label: 'lbl' + 'PrimaryHolder',
                value: 'lbl' + 'PrimaryHolder' + 'Value'
            }, {
                flx: 'flx' + 'JointHolder',
                label: 'lbl' + 'JointHolder' + 'Title',
                value: 'lbl' + 'JointHolder' + 'Value'
            }, {
                flx: 'flx' + 'IBAN',
                label: 'lbl' + 'IBANCode',
                value: 'lbl' + 'IBANCode' + 'Value'
            }];
            AccountInfoUIConfigs.map(function(uiConfig, i) {
                var toShow = null;
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
                var key = AccountTypeConfig[account.accountType][i];
                if (key) {
                    if (accountInfo[key]) {
                        toShow = {
                            label: key,
                            value: accountInfo[key]
                        };
                    }
                }
                return {
                    uiConfig: uiConfig,
                    toShow: toShow
                };
            }).forEach(function(config) {
                if (config.toShow === null) {
                    controller.view.accountSummary[config.uiConfig.flx].isVisible = false;
                    controller.view.accountSummary[config.uiConfig.label].text = '';
                    controller.view.accountSummary[config.uiConfig.value].text = '';
                } else {
                    controller.view.accountSummary[config.uiConfig.flx].isVisible = true;
                    controller.view.accountSummary[config.uiConfig.label].text = LabelToDisplayMap[config.toShow.label];
                    controller.view.accountSummary[config.uiConfig.value].text = config.toShow.value;
                    if (config.uiConfig.flx === "flxIBAN") {
                        CommonUtilities.enableCopy(controller.view.accountSummary[config.uiConfig.value]);
                    }
                }
            });
            this.view.accountSummary.forceLayout();
        },
        /**
         * Method to get quick actions for accounts
         * @param {Object} dataInput Data inputs like onCancel/accountType etc
         * @returns {Object} quick action for selected account
         */
        getQuickActions: function(dataInput) {
            var onCancel = dataInput.onCancel;
            var quickActions = [{
                actionName: ViewConstants.ACTION.SCHEDULED_TRANSACTIONS,
                displayName: dataInput.scheduledDisplayName || kony.i18n.getLocalizedString("i18n.accounts.scheduledTransactions"),
                action: function(account) {
                    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
                    accountsModule.presentationController.showScheduledTransactionsForm(account);
                }
            }, {
                actionName: ViewConstants.ACTION.MAKE_A_TRANSFER, //MAKE A TRANSFER
                displayName: (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") ? kony.i18n.getLocalizedString("i18n.hamburger.transfer") : (dataInput.makeATransferDisplayName || kony.i18n.getLocalizedString("i18n.billPay.BillPayMakeTransfer")),
                action: function(account) {
                    //Function call to  open tranfers page with parameter - account obj to be tranferred from.
                    if (applicationManager.getConfigurationManager().getDeploymentGeography() == "EUROPE") {
                        applicationManager.getModulesPresentationController("TransferEurModule").showTransferScreen({
                            context: "MakePayment",
                            accountFrom: dataInput.accountNumber
                        });
                        return;
                    }
                    if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") {
                        applicationManager.getModulesPresentationController("TransferFastModule").showTransferScreen({
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
                actionName: ViewConstants.ACTION.TRANSFER_MONEY, //MAKE A TRANSFER
                displayName: (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") ? kony.i18n.getLocalizedString("i18n.hamburger.transfer") : (dataInput.tranferMoneyDisplayName || kony.i18n.getLocalizedString("i18n.billPay.BillPayMakeTransfer")),
                action: function(account) {
                    //Function call to  open tranfers page with parameter - account obj to be tranferred from.
                    if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") {
                        applicationManager.getModulesPresentationController("TransferFastModule").showTransferScreen({
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
                actionName: ViewConstants.ACTION.PAY_A_BILL,
                displayName: (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") ? kony.i18n.getLocalizedString("i18n.Pay.PayBill") : (dataInput.payABillDisplayName || kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payABillFrom")),
                action: function(account) {
                    //Function call to open bill pay screen
                    var billPaymentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentModule");
                    billPaymentModule.presentationController.showBillPaymentScreen({
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
            }, {
                actionName: ViewConstants.ACTION.PAY_A_PERSON_OR_SEND_MONEY,
                displayName: dataInput.sendMoneyDisplayName || kony.i18n.getLocalizedString("i18n.Pay.SendMoney"),
                action: function(account) {
                    var p2pModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
                    var dataItem = account;
                    dataItem.onCancel = onCancel;
                    p2pModule.presentationController.showPayAPerson("sendMoneyTab", dataItem);
                }
            }, {
                actionName: ViewConstants.ACTION.PAY_DUE_AMOUNT,
                displayName: dataInput.payDueAmountDisplayName || kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payDueAmount"),
                action: function(account) {
                    account.currentAmountDue = CommonUtilities.formatCurrencyWithCommas(account.currentAmountDue);
                    account.currentAmountDue = account.currentAmountDue.slice(1);
                    var data = {
                        "accounts": account
                    };
                    var loanModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoanPayModule");
                    loanModule.presentationController.navigateToLoanDue(data);
                }
            }, {
                actionName: ViewConstants.ACTION.PAYOFF_LOAN,
                displayName: dataInput.payoffLoanDisplayName || kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payoffLoan"),
                action: function(account) {
                    account.principalBalance = CommonUtilities.formatCurrencyWithCommas(account.principalBalance);
                    account.payOffCharge = CommonUtilities.formatCurrencyWithCommas(account.payOffCharge);
                    var data = {
                        "accounts": account
                    };
                    var loanModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoanPayModule");
                    loanModule.presentationController.navigateToLoanPay(data);
                }
            }, {
                actionName: ViewConstants.ACTION.STOPCHECKS_PAYMENT,
                displayName: dataInput.stopCheckPaymentDisplayName || kony.i18n.getLocalizedString("i18n.StopcheckPayments.STOPCHECKPAYMENTS"),
                action: function(account) {
                    var stopPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("StopPaymentsModule");
                    stopPaymentsModule.presentationController.showStopPayments({
                        onCancel: onCancel,
                        accountID: account.accountID,
                        "show": ViewConstants.ACTION.SHOW_STOPCHECKS_FORM
                    });
                }
            }, {
                actionName: ViewConstants.ACTION.REQUEST_CHEQUE_BOOK,
                displayName: dataInput.requestChequeBookDisplayName || kony.i18n.getLocalizedString("i18n.ChequeBookRequests.ChequeBookRequests"),
                action: function(account) {
                    var requestChequeGroupModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("StopPaymentsModule");
                    requestChequeGroupModule.presentationController.showStopPayments({
                        onCancel: onCancel,
                        accountID: account.accountID,
                        "show": ViewConstants.ACTION.REQUEST_CHEQUE_BOOK
                    });
                }
            }, {
                actionName: ViewConstants.ACTION.VIEW_MYCHEQUES,
                displayName: dataInput.viewMyChequesDisplayName || kony.i18n.getLocalizedString("i18n.ChequeManagement.MyCheques"),
                action: function(account) {
                    var stopPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("StopPaymentsModule");
                    stopPaymentsModule.presentationController.showStopPayments({
                        onCancel: onCancel,
                        accountID: account.accountID,
                        "show": ViewConstants.ACTION.VIEW_MYCHEQUES_FORM
                    });
                }
            }, {
                actionName: ViewConstants.ACTION.VIEW_STATEMENTS,
                displayName: dataInput.viewStatementsDisplayName || kony.i18n.getLocalizedString("i18n.ViewStatements.STATEMENTS"),
                action: function(account) {
                    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
                    accountsModule.presentationController.showFormatEstatements(account);
                }
            }, {
                actionName: ViewConstants.ACTION.UPDATE_ACCOUNT_SETTINGS,
                displayName: dataInput.updateAccountSettingsDisplayName || kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.updateAccountSettings"),
                action: function() {
                    var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileModule");
                    profileModule.presentationController.enterProfileSettings("accountSettings");
                }
            }, {
                actionName: ViewConstants.ACTION.REMOVE_ACCOUNT,
                displayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.removeAccount"),
                action: function(account) {
                    var accountData = account;
                    var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
                    accountModule.presentationController.showAccountDeletionPopUp(accountData);
                }
            }, {
                actionName: ViewConstants.ACTION.ACCOUNT_PREFERENCES,
                displayName: kony.i18n.getLocalizedString("i18n.ProfileManagement.AccountPreferences"),
                action: function() {
                    var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileModule");
                    profileModule.presentationController.enterProfileSettings("accountSettings");
                }
            }, {
                actionName: ViewConstants.ACTION.EDIT_ACCOUNT,
                displayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.editAccount"),
                action: function(account) {
                    var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileModule");
                    profileModule.presentationController.initializeUserProfileClass();
                    profileModule.presentationController.showEditExternalAccount(account);
                }
            }, {
                actionName: ViewConstants.ACTION.SAVINGS_POT,
                displayName: kony.i18n.getLocalizedString("i18n.savingsPot.mySavingsPot"),
                action: function(account) {
                    var savingsPotModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "SavingsPotUIModule",
                        "appName": "SavingsPotMA"
                    });
                    savingsPotModule.presentationController.fetchSavingsPot(account.Account_id);
                },
            }, {
                actionName: ViewConstants.ACTION.SHOW_DISPUTE_LIST,
                displayName: kony.i18n.getLocalizedString("i18n.StopCheckPayments.DisputedTransactions"),
                action: function() {
                    var disputeModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DisputeTransactionUIModule");
                    disputeModule.presentationController.showDisputeTransactionModule({
                        show: OLBConstants.ACTION.SHOW_DISPUTE_LIST
                    });
                }
            }];
            return quickActions;
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
                if (actionItem.actionName === actionName) {
                    matchedAction = {
                        actionName: actionItem.actionName,
                        displayName: actionItem.displayName,
                        action: actionItem.action.bind(null, account)
                    };
                    break;
                }
            }
            if (!matchedAction) {
                CommonUtilities.ErrorHandler.onError("Action :" + actionName + " is not found, please validate with Contextial actions list.");
                return false;
            }
            return matchedAction;
        },
        /**
         * Method to set secondary actions for selected account type
         * @param {JSON} account Account for which secondary actions are required
         */
        setSecondayActions: function(account) {
            var self = this;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var onCancel = function() {
                self.loadAccountModule().presentationController.presentAccountDetails();
            };
            //Secondary action object array
            var SecondaryActions = this.getQuickActions({
                onCancel: onCancel
            });
            var accountType = account.accountType,
                validActions,
                finalActions = [];
            if (accountType) {
                var SecondaryActionsConfig = OLBConstants.CONFIG.ACCOUNTS_SECONDARY_ACTIONS;
                var actions = SecondaryActionsConfig[account.accountType];
                if (actions.length) {
                    validActions = actions.filter(function(action) {
                        return self.loadAccountModule().presentationController.isValidAction(action, account);
                    });
                    finalActions = validActions.map(function(action) { //get action object.
                        return self.getAction(SecondaryActions, action, account);
                    });
                }
            }
            var dataMap = {
                "lblUsers": "lblUsers",
                "lblSeparator": "lblSeparator ",
                "flxAccountTypes": "flxAccountTypes"
            };
            var secondaryActions = finalActions.map(function(dataItem) {
                return {
                    "lblUsers": {
                        "text": dataItem.displayName,
                        "toolTip": CommonUtilities.changedataCase(dataItem.displayName),
                        "accessibilityconfig": {
                            "a11yLabel": dataItem.displayName,
                        }
                    },
                    "lblSeparator": " ",
                    "flxAccountTypes": {
                        "onClick": dataItem.action
                    }
                };
            });
            this.view.moreActions.segAccountTypes.widgetDataMap = dataMap;
            this.view.moreActions.segAccountTypes.setData(secondaryActions);
            this.view.moreActions.forceLayout();
            this.AdjustScreen();
        },
        /**
         * Reset Right side Actions UI
         */
        resetRightSideActions: function() {
            var scopeObj = this;
            for (var i = 0; i < scopeObj.rightActionButtons.length; i++) {
                scopeObj.rightActionButtons[i].setVisibility(false);
                scopeObj.rightActionButtons[i].onClick = null;
                if (i >= 0 && i < scopeObj.rightActionSeparator.length) {
                    scopeObj.rightActionSeparator[i].setVisibility(false);
                }
            }
            this.view.forceLayout();
        },
        filterActionsForBusineesAccount: function(actions, account) {
            if (account.isBusinessAccount !== "true") return actions;
            for (var index = 0; index < actions.length; index++) {
                if (actions[index] === "Savings Pot") {
                    actions.splice(index, 1);
                    index--;
                }
            }
            return actions;
        },
        /**
         * Method to set actions for the right top section of frmAccountDetails
         * @param {JSON} account Account for which actions are needed
         */
        setRightSideActions: function(account) {
            var self = this;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var onCancel = function() {
                self.loadAccountModule().presentationController.presentAccountDetails();
            };
            //Right side action object array
            var RightSideActions = this.getQuickActions({
                onCancel: onCancel,
                showScheduledTransactionsForm: self.loadAccountModule().presentationController.showScheduledTransactionsForm.bind(self.loadAccountModule().presentationController),
                payABillDisplayName: kony.i18n.getLocalizedString("i18n.Pay.PayBill"),
                makeATransferDisplayName: kony.i18n.getLocalizedString("i18n.billPay.BillPayMakeTransfer"),
                payDueAmountDisplayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payDueAmount"),
                payoffLoanDisplayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payoffLoan"),
                viewStatementsDisplayName: kony.i18n.getLocalizedString("i18n.ViewStatements.STATEMENTS"),
                viewBillDisplayName: kony.i18n.getLocalizedString("i18n.accounts.viewBill"),
                updateAccountSettingsDisplayName: kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.updateAccountSettings"),
                stopCheckPaymentDisplayName: kony.i18n.getLocalizedString("i18n.StopcheckPayments.STOPCHECKPAYMENTS"),
                requestChequeBookDisplayName: kony.i18n.getLocalizedString("i18n.ChequeBookReq.RequestChequeBook"),
                accountNumber: account.Account_id || account.accountID
            });
            var accountType = account.accountType,
                validActions,
                finalActions = [];
            if (accountType) {
                var RightSideActionsConfig = OLBConstants.CONFIG.ACCOUNTS_RIGHTSIDE_ACTIONS;
                var actions = RightSideActionsConfig[account.accountType];
                if (account.accountType === OLBConstants.ACCOUNT_TYPE.SAVING || account.accountType === OLBConstants.ACCOUNT_TYPE.CHECKING) {
                    actions = this.filterActionsForBusineesAccount(actions, account);
                }
                if (actions.length) {
                    validActions = actions.filter(function(action) {
                        return self.loadAccountModule().presentationController.isValidAction(action, account);
                    });
                    finalActions = validActions.map(function(action) { //get action object.
                        return self.getAction(RightSideActions, action, account);
                    });
                }
            }
            var dataItem, j;
            var viewModel = finalActions || [];
            // Right action buttonas
            self.rightActionButtons = [
                self.view.btnScheduledTransfer,
                self.view.btnMakeTransfer,
                self.view.btnPayABill,
                self.view.btnCheckRequest
            ];
            // Right action saparators
            self.rightActionSeparator = [
                self.view.flxSeparatorPrimaryActions,
                self.view.flxSeparatorPrimaryActionsTwo,
                self.view.flxSeparatorPrimaryActionsThree
            ];
            self.resetRightSideActions(); //Reset Actions
            var isAtleastOneVisible = false;
            if (viewModel.length === 0) {
                self.view.flxPrimaryActions.setVisibility(false);
            } else {
                //mobilself.view.flxPrimaryActions.setVisibility(true);
                for (var i = 0; i < viewModel.length && viewModel.length <= self.rightActionButtons.length; i++) {
                    isAtleastOneVisible = true;
                    dataItem = viewModel[i];
                    self.rightActionButtons[i].text = dataItem.displayName;
                    self.rightActionButtons[i].setVisibility(true);
                    self.rightActionButtons[i].onClick = dataItem.action;
                    self.rightActionButtons[i].toolTip = CommonUtilities.changedataCase(dataItem.displayName);
                    j = i - 1;
                    if (j >= 0 && j < self.rightActionSeparator.length) {
                        if (!orientationHandler.isTablet && kony.application.getCurrentBreakpoint() != 1024) self.rightActionSeparator[j].setVisibility(true);
                    }
                }
                if (!isAtleastOneVisible) {
                    self.view.flxPrimaryActions.setVisibility(false);
                }
            }
            this.view.forceLayout();
        },
        //Function to set primary actions
        updatePrimaryActions: function(account, scopeObj) {
            var configManager = applicationManager.getConfigurationManager();
            if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.creditCard")) {
                var param = [{
                    "linkText": kony.i18n.getLocalizedString('kony.tab.BillPay.PayBill'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayBill",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewStatements",
                        "context": "",
                        "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                }];
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.deposit")) {
                var param = [{
                    "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewStatements",
                        "context": "",
                        "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.updateAccountSettings'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionUpdateAccountSettings",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ManageArrangemntsMA")
                }];
            } else if (account.accountType === kony.i18n.getLocalizedString("i18n.accounts.loan") || account.accountType === kony.i18n.getLocalizedString("i18n.account.mortgage")) {
                var param = [{
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.payDueAmount'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayDueAmount",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewStatements",
                        "context": "",
                        "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.payoffLoan'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayoffLoan",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.updateAccountSettings'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionUpdateAccountSettings",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ManageArrangementsMA")
                }];
            } else if (account.accountType === "mortgageFacility") {
              if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                var param = [{
                        "linkText": 'Partial Repayment ',
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionPartialRepayment",
                            "context": "",
                            "entitlement": ["EARLY_PARTIAL_REPAYMENT-VIEW"]
                        },
                        "accessibilityConfig": {},
                        "visibility": true
                    }];
              } else {

                  var param = [{
                      "linkText": 'Raise a Request',
                      "linkCTA": {
                          "level": "Form",
                          "method": "actionRaiseARequest",
                          "context": "",
                          "entitlement": ["MESSAGES_CREATE_OR_REPLY"]
                      },
                      "accessibilityConfig": {
                          "a11yARIA": {
                              role: "link",
                          }
                      },
                      "visibility": true
                  }, {
                      "linkText": 'Change Repayment Account',
                      "linkCTA": {
                          "level": "Form",
                          "method": "actionChangeRepaymentAccount",
                          "context": "",
                          "entitlement": ["CHANGE_REPAYMENT_ACCOUNT-VIEW"]
                      },
                      "accessibilityConfig": {},
                      "visibility": true
                  }, {
                      "linkText": 'Partial Repayment ',
                      "linkCTA": {
                          "level": "Form",
                          "method": "actionPartialRepayment",
                          "context": "",
                          "entitlement": ["EARLY_PARTIAL_REPAYMENT-VIEW"]
                      },
                      "accessibilityConfig": {},
                      "visibility": true
                  }];
              }
            } else if (account.isBusinessAccount == "false" || !account.isBusinessAccount || account.isBusinessAccount === undefined) {
                var param = [{
                    "linkText": kony.i18n.getLocalizedString('i18n.savingsPot.mySavingsPot'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionSavingsPot",
                        "context": "",
                        "entitlement": ["GOAL_POT_VIEW", "BUDGET_POT_VIEW"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("SavingsPotMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.billPay.BillPayMakeTransfer'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionTransferMoney",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().TransferFlowType === "UTF" ? false : applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.accounts.paymoney'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayMoney",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")
                }];
            } else {
                var param = [{
                    "linkText": kony.i18n.getLocalizedString('i18n.billPay.BillPayMakeTransfer'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionTransferMoney",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().TransferFlowType === "UTF" ? false : applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.accounts.paymoney'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayMoney",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")
                }];
            }
            var finalParam = scopeObj.getMenuItemsByMicroapp(param);
            quickLinksCount = finalParam.length;
            if (!kony.sdk.isNullOrUndefined(this.account.accountStatus)) {
                if (this.account.accountStatus.toUpperCase() == "CLOSED") {
                    finalParam = [{
                        "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionViewStatements",
                            "context": "",
                            "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                    }]
                }
            }
            scopeObj.view.quicklinks.setContext(finalParam);
            // if (finalParam.length > 0) scopeObj.view.quicklinks.setVisibility(true);
        },
        actionPartialRepayment: function() {
            var navMan = applicationManager.getNavigationManager();
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.isFromMortgage = 0;
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmPartialRepaymentTermsAndCond"
            });
        },
        actionRaiseARequest: function() {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                moduleName: "AlertsMsgsUIModule",
                appName: "SecureMessageMA"
            }).presentationController.showAlertsPage("hamburgerMenu", {
                show: "Messages"
            });
        },
        actionChangeRepaymentAccount: function() {
            var navMan = applicationManager.getNavigationManager();
            var configManager = applicationManager.getConfigurationManager();
            account = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.repaymentAccount = account;
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmChangeRepaymentAccountNew"
            });
        },
        getMenuItemsByMicroapp: function(menuData) {
            var data = [];
            for (i = 0; i < menuData.length; i++) {
                if (!kony.sdk.isNullOrUndefined(menuData[i].visibility)) {
                    if (menuData[i].visibility) data.push(menuData[i]);
                } else data.push(menuData[i]);
            }
            return data;
        },
        //Function to set secondary actions
        updateSecondaryActions: function(account, scopeObj) {
            if (account.accountType === "CreditCard" || account.accountType === kony.i18n.getLocalizedString("i18n.accounts.creditCard")) {
                var param = [{
                    "linkText": kony.i18n.getLocalizedString('i18n.StopCheckPayments.DisputedTransactions'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewDisputedTransactions",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.updateAccountSettings'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionUpdateAccountSettings",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ManageArrangementsMA")
                }];
            } else if (account.accountType === "mortgageFacility") {
              if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                var param = [{
                        "linkText": 'Partial Repayment ',
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionPartialRepayment",
                            "context": "",
                            "entitlement": ["EARLY_PARTIAL_REPAYMENT-VIEW"]
                        },
                        "accessibilityConfig": {},
                        "visibility": true
                    }];
              } else {

                  var param = [{
                      "linkText": 'Raise a Request',
                      "linkCTA": {
                          "level": "Form",
                          "method": "actionRaiseARequest",
                          "context": "",
                          "entitlement": ["MESSAGES_CREATE_OR_REPLY"]
                      },
                      "accessibilityConfig": {
                          "a11yARIA": {
                              role: "link",
                          }
                      },
                      "visibility": true
                  }, {
                      "linkText": 'Change Repayment Account',
                      "linkCTA": {
                          "level": "Form",
                          "method": "actionChangeRepaymentAccount",
                          "context": "",
                          "entitlement": ["CHANGE_REPAYMENT_ACCOUNT-VIEW"]
                      },
                      "accessibilityConfig": {},
                      "visibility": true
                  }, {
                      "linkText": 'Partial Repayment ',
                      "linkCTA": {
                          "level": "Form",
                          "method": "actionPartialRepayment",
                          "context": "",
                          "entitlement": ["EARLY_PARTIAL_REPAYMENT-VIEW"]
                      },
                      "accessibilityConfig": {},
                      "visibility": true
                  }];
              }
            } else if (account.accountType === "Checking" || account.accountType === "Savings" || account.accountType === kony.i18n.getLocalizedString("i18n.accounts.savings") || account.accountType === kony.i18n.getLocalizedString("i18n.accounts.checking")) {
                var configManager = applicationManager.getConfigurationManager();
                sweepID = account.accountID;
                var chequeBookReqCreatePerm = configManager.checkAccountAction(this.landingSelectedAccount, "CHEQUE_BOOK_REQUEST_CREATE");
                var param = [{
                    "linkText": kony.i18n.getLocalizedString('kony.tab.BillPay.PayBill'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayBill",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewStatements",
                        "context": "",
                        "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.StopCheckPayments.DisputedTransactions'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewDisputedTransactions",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.ChequeManagement.StopChequeRequest'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionRequestStopCheques",
                        "context": "",
                        "entitlement": ["STOP_PAYMENT_REQUEST_CREATE"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.updateAccountSettings'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionUpdateAccountSettings",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    },
                    "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ManageArrangementsMA")
                }];
                if (!kony.sdk.isNullOrUndefined(this.account.accountStatus) && this.account.accountStatus == "ACTIVE" && (kony.sdk.isNullOrUndefined(this.account.currentBalance) || this.account.currentBalance === "0" || this.account.currentBalance === "")) {
                    var param3 = {
                        "linkText": "Close This Account",
                        "linkCTA": {
                            "level": "Form",
                            "method": "showPopup",
                            "context": "",
                            "entitlement": ["CLOSE_ACCOUNT-CREATE"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": true
                    }
                    param = param.concat(param3);
                }
                if (!account.isSweepCreated) {
                    var param2 = {
                        "linkText": "Create Sweep",
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionCreateSweep",
                            "context": "",
                            "entitlement": ["ACCOUNT_SWEEP_CREATE"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("AccountSweepsMA")
                    }
                    param = param.concat(param2);
                } else {
                    var param2 = {
                        "linkText": "View Sweep",
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionViewSweep",
                            "context": "",
                            "entitlement": ["ACCOUNT_SWEEP_VIEW"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("AccountSweepsMA")
                    }
                    param = param.concat(param2);
                }
                if (chequeBookReqCreatePerm) {
                    var param1 = {
                        "linkText": kony.i18n.getLocalizedString('i18n.ChequeBookReq.ChequeBookRequest'),
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionRequestChequeBook",
                            "context": "",
                            "entitlement": ["CHEQUE_BOOK_REQUEST_CREATE"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                    }
                    param = param.concat(param1);
                }
            }
            var finalParam = scopeObj.getMenuItemsByMicroapp(param);
            scopeObj.view.quicklinksHid.setContext(finalParam);
        },
        actionViewSweep: function() {
            applicationManager.getModulesPresentationController({
                appName: 'AccountSweepsMA',
                moduleName: 'AccountSweepsUIModule'
            }).showSweepScreen({
                context: "viewSweeps"
            }, sweepID);
        },
        actionCreateSweep: function() {
            applicationManager.getModulesPresentationController({
                appName: 'AccountSweepsMA',
                moduleName: 'AccountSweepsUIModule'
            }).showSweepScreen({
                context: "createSweep"
            });
        },
        resetPopUp: function() {
            var currentForm = kony.application.getCurrentForm();
            var popupComponent = currentForm.flxLogout.widgets()[0];
            popupComponent.btnYes.isVisibile = true;
            popupComponent.btnNo.isVisibile = true;
            popupComponent.btnYes.text = "Yes";
            popupComponent.btnNo.text = "No";
            popupComponent.imgLoading.isVisibile = true;
            popupComponent.lblPopupMessage.left = "20dp";
            popupComponent.flxSeperator2.isVisible = false;
        },
        actionCloseAccount: function() {
            swiftCode = this.view.summary.tab3field6backendmapping;
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("swiftCode", swiftCode);
            payload = {
                accountID: accountDetailsGlobal.accountID
            };
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.ValidateClosure(payload);
            //             kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            //                 "moduleName": "AccountServicesUIModule",
            //                 "appName": "ArrangementsMA"
            //             }).presentationController.getMortgageDetails(data);
            // kony.application.showLoadingScreen()
            // navMan.navigateTo({
            //     "appName": "ArrangementsMA",
            //     "friendlyName": "AccountServicesUIModule/frmConfirmClosure"
            // });
        },
        validateClosure: function() {
            var currentForm = kony.application.getCurrentForm();
            var popupComponent = currentForm.CustomPopupNew;
            context = {
                Heading: "Close Account",
                Message: "Checking Account Status...",
                btn1: "Proceed",
                btn2: "Cancel",
                serperator2Visibility: false,
                Loading: true
            };
            popupComponent.setContext(context);
            this.actionCloseAccount();
        },
        showPopup: function() {
            var currentForm = kony.application.getCurrentForm();
            currentForm.flxPopup.left = "0%";
            currentForm.flxPopup.setVisibility(true);
            comp = currentForm.CustomPopupNew;
            context = {
                Heading: "Close Account",
                Message: "Are you sure you want to proceed with the process of closing '" + accountDetailsGlobal.nickName + " - " + accountDetailsGlobal.accountID.slice(-4) + "'",
                btn1: "Proceed",
                btn2: "Cancel",
                serperator2Visibility: true
            };
            comp.resetPopup();
            comp.setContext(context);
        },
        resetPopUpBc: function() {
            var currentForm = kony.application.getCurrentForm();
            var popupComponent = currentForm.flxLogout.widgets()[0];
            popupComponent.btnYes.isVisibile = true;
            popupComponent.btnNo.isVisibile = true;
            popupComponent.btnYes.text = "Yes";
            popupComponent.btnNo.text = "No";
            popupComponent.imgLoading.isVisibile = true;
            popupComponent.lblPopupMessage.left = "20dp";
            popupComponent.flxSeperator2.isVisible = false;
        },
        actionCloseAccountBc: function() {
            swiftCode = this.view.summary.tab3field6backendmapping;
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("swiftCode", swiftCode);
            data = {
                    accountID: "MORT12345"
                }
                //             kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                //                 "moduleName": "AccountServicesUIModule",
                //                 "appName": "ArrangementsMA"
                //             }).presentationController.getMortgageDetails(data);
                // kony.application.showLoadingScreen()
                // navMan.navigateTo({
                //     "appName": "ArrangementsMA",
                //     "friendlyName": "AccountServicesUIModule/frmConfirmClosure"
                // });
        },
        validateClosureBc: function() {
            var currentForm = kony.application.getCurrentForm();
            var popupComponent = currentForm.flxLogout.widgets()[0];
            currentForm.flxLogout.left = "0%";
            currentForm.flxLogout.isVisible = true;
            popupComponent.btnYes.isVisible = false;
            popupComponent.btnNo.isVisible = false;
            popupComponent.lblPopupMessage.text = "Checking Account Status...";
            popupComponent.lblPopupMessage.left = "60dp";
            popupComponent.imgLoading.isVisibile = true;
            popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
            scope = this;
            scope.actionCloseAccount();
        },
        showPopupBc: function() {
            this.resetPopUp();
            var currentForm = kony.application.getCurrentForm();
            if ('flxLogout' in currentForm) {
                currentForm.flxLogout.isVisible = true;
                currentForm.flxLogout.isModalContainer = true;
                var children = currentForm.widgets();
                var footerHeight = 0;
                if (!(currentForm.id === "frmLocateUs" && orientationHandler.isMobile)) {
                    footerHeight = currentForm.flxFooter ? currentForm.flxFooter.frame.height + (currentForm.flxFooter.frame.y - (children[0].frame.height + children[1].frame.height)) : 0;
                }
                var height = children[0].frame.height + children[1].frame.height + footerHeight;
                //currentForm.flxLogout.setVisibility(true);
                currentForm.flxLogout.height = kony.os.deviceInfo().screenHeight + "dp";
                currentForm.flxLogout.left = "0%";
                currentForm.flxLogout.accessibilityConfig = {
                    a11yARIA: {
                        tabindex: -1,
                    }
                }
                var popupComponent = currentForm.flxLogout.widgets()[0];
                //popupComponent.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.logout");
                popupComponent.lblHeading.text = "Close Account";
                popupComponent.lblHeading.accessibilityConfig = {
                    "a11yARIA": {
                        tabindex: -1,
                    }
                };
                // popupComponent.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.common.LogoutMsg");
                popupComponent.lblPopupMessage.text = "Are you sure you want to proceed with the process of closing '" + accountDetailsGlobal.nickName + " - " + accountDetailsGlobal.accountID.slice(-4) + "'";
                popupComponent.btnYes.text = "Proceed";
                popupComponent.btnNo.text = "Cancel";
                popupComponent.flxSeperator2.isVisible = true;
                popupComponent.lblPopupMessage.accessibilityConfig = {
                    "a11yARIA": {
                        tabindex: -1,
                    }
                };
                popupComponent.flxSeperator.accessibilityConfig = {
                    "a11yHidden": true,
                    "a11yARIA": {
                        tabindex: -1,
                    }
                };
                popupComponent.flxSeperator2.accessibilityConfig = {
                    "a11yHidden": true,
                    "a11yARIA": {
                        tabindex: -1,
                    }
                };
                popupComponent.btnNo.accessibilityConfig = {
                    "a11yARIA": {
                        tabindex: 0,
                        role: "button"
                    }
                };
                popupComponent.btnYes.accessibilityConfig = {
                    "a11yARIA": {
                        tabindex: 0,
                        role: "button"
                    }
                };
                popupComponent.flxCross.accessibilityConfig = {
                    "a11yLabel": "close",
                    "a11yARIA": {
                        tabindex: 0,
                        role: "button"
                    }
                };
                scopeObj = this;
                popupComponent.flxCross.isVisible = true;
                popupComponent.flxCross.setFocus(true);
                popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
                popupComponent.btnYes.onClick = function() {
                    scopeObj.validateClosure();
                };
                popupComponent.btnNo.onClick = function() {
                    currentForm.flxLogout.left = "-100%";
                    currentForm.flxLogout.isVisible = false;
                    currentForm.customheader.headermenu.btnLogout.setFocus(true);
                }
                popupComponent.flxCross.onClick = function() {
                    currentForm.flxLogout.left = "-100%";
                    currentForm.flxLogout.isVisible = false;
                    currentForm.customheader.headermenu.btnLogout.setFocus(true);
                }
            }
        },
        //Function to set quick links MOBILE actions
        updateQuicklinksMobileActions: function(account, scopeObj) {
            var configManager = applicationManager.getConfigurationManager();
            var chequeBookReqCreatePerm = false;
          	if(this.landingSelectedAccount)
            	chequeBookReqCreatePerm = configManager.checkAccountAction(this.landingSelectedAccount, "CHEQUE_BOOK_REQUEST_CREATE");
            if (account.accountType === "CreditCard") {
                var param = [{
                    "linkText": kony.i18n.getLocalizedString('kony.tab.BillPay.PayBill'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayBill",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewStatements",
                        "context": "",
                        "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.StopCheckPayments.DisputedTransactions'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewDisputedTransactions",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.updateAccountSettings'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionUpdateAccountSettings",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }];
            } else if (account.accountType === "mortgageFacility") {
              if((kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) || (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)) {
                var param = [{
                        "linkText": 'Partial Repayment ',
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionPartialRepayment",
                            "context": "",
                            "entitlement": ["EARLY_PARTIAL_REPAYMENT-VIEW"]
                        },
                        "accessibilityConfig": {},
                        "visibility": true
                    }];
              } else {
                  var param = [{
                      "linkText": 'Raise a Request',
                      "linkCTA": {
                          "level": "Form",
                          "method": "actionRaiseARequest",
                          "context": "",
                          "entitlement": ["MESSAGES_CREATE_OR_REPLY"]
                      },
                      "accessibilityConfig": {
                          "a11yARIA": {
                              role: "link",
                          }
                      },
                      "visibility": true
                  }, {
                      "linkText": 'Change Repayment Account',
                      "linkCTA": {
                          "level": "Form",
                          "method": "actionChangeRepaymentAccount",
                          "context": "",
                          "entitlement": ["CHANGE_REPAYMENT_ACCOUNT-VIEW"]
                      },
                      "accessibilityConfig": {},
                      "visibility": true
                  }, {
                      "linkText": 'Partial Repayment ',
                      "linkCTA": {
                          "level": "Form",
                          "method": "actionPartialRepayment",
                          "context": "",
                          "entitlement": ["EARLY_PARTIAL_REPAYMENT-VIEW"]
                      },
                      "accessibilityConfig": {},
                      "visibility": true
                  }];
              }
              } else if (account.accountType === "Deposit" || account.accountType === kony.i18n.getLocalizedString("i18n.accounts.deposit")) {
                  var param = [{
                      "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                      "linkCTA": {
                          "level": "Form",
                          "method": "actionViewStatements",
                          "context": "",
                          "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                      },
                      "accessibilityConfig": {
                          "a11yARIA": {
                              role: "link",
                          }
                      }
                  }, {
                      "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.updateAccountSettings'),
                      "linkCTA": {
                          "level": "Form",
                          "method": "actionUpdateAccountSettings",
                          "context": "",
                          "entitlement": []
                      },
                      "accessibilityConfig": {
                          "a11yARIA": {
                              role: "link",
                          }
                      }
                  }];
            } else if (account.accountType === "Loan" || account.accountType === kony.i18n.getLocalizedString("i18n.accounts.loan")) {
                var param = [{
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.payDueAmount'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayDueAmount",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewStatements",
                        "context": "",
                        "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.payoffLoan'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayoffLoan",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.updateAccountSettings'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionUpdateAccountSettings",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }];
            } else if (account.isBusinessAccount == "false" || !account.isBusinessAccount || account.isBusinessAccount === undefined) {
                var param = [{
                    "linkText": kony.i18n.getLocalizedString('i18n.billPay.BillPayMakeTransfer'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionTransferMoney",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.accounts.paymoney'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayMoney",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.savingsPot.mySavingsPot'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionSavingsPot",
                        "context": "",
                        "entitlement": ["GOAL_POT_VIEW", "BUDGET_POT_VIEW"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('kony.tab.BillPay.PayBill'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayBill",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewStatements",
                        "context": "",
                        "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.StopCheckPayments.DisputedTransactions'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewDisputedTransactions",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.ChequeManagement.StopChequeRequest'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionRequestStopCheques",
                        "context": "",
                        "entitlement": ["STOP_PAYMENT_REQUEST_CREATE"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.updateAccountSettings'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionUpdateAccountSettings",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }];
                if (!account.isSweepCreated) {
                    var param2 = {
                        "linkText": "Create Sweep",
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionCreateSweep",
                            "context": "",
                            "entitlement": ["ACCOUNT_SWEEP_CREATE"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("AccountSweepsMA")
                    }
                    param = param.concat(param2);
                } else {
                    var param2 = {
                        "linkText": "View Sweep",
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionViewSweep",
                            "context": "",
                            "entitlement": ["ACCOUNT_SWEEP_VIEW"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("AccountSweepsMA")
                    }
                    param = param.concat(param2);
                }
                if (!kony.sdk.isNullOrUndefined(this.account.accountStatus) && this.account.accountStatus == "ACTIVE" && (kony.sdk.isNullOrUndefined(this.account.currentBalance) || this.account.currentBalance === "0" || this.account.currentBalance === "")) {
                    var param3 = {
                        "linkText": "Close This Account",
                        "linkCTA": {
                            "level": "Form",
                            "method": "showPopup",
                            "context": "",
                            "entitlement": ["CLOSE_ACCOUNT-CREATE"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": true
                    }
                    param = param.concat(param3);
                }
                if (chequeBookReqCreatePerm) {
                    var param1 = {
                        "linkText": kony.i18n.getLocalizedString('i18n.ChequeBookReq.ChequeBookRequest'),
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionRequestChequeBook",
                            "context": "",
                            "entitlement": ["CHEQUE_BOOK_REQUEST_CREATE"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        }
                    }
                    param = param.concat(param1);
                }
            } else {
                var param = [{
                    "linkText": kony.i18n.getLocalizedString('i18n.billPay.BillPayMakeTransfer'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionTransferMoney",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.accounts.paymoney'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayMoney",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('kony.tab.BillPay.PayBill'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionPayBill",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewStatements",
                        "context": "",
                        "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.StopCheckPayments.DisputedTransactions'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewDisputedTransactions",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.ChequeManagement.StopChequeRequest'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionRequestStopCheques",
                        "context": "",
                        "entitlement": ["STOP_PAYMENT_REQUEST_CREATE"]
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }, {
                    "linkText": kony.i18n.getLocalizedString('i18n.Accounts.ContextualActions.updateAccountSettings'),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionUpdateAccountSettings",
                        "context": "",
                        "entitlement": []
                    },
                    "accessibilityConfig": {
                        "a11yARIA": {
                            role: "link",
                        }
                    }
                }];
                if (!account.isSweepCreated) {
                    var param2 = {
                        "linkText": "Create Sweep",
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionCreateSweep",
                            "context": "",
                            "entitlement": ["ACCOUNT_SWEEP_CREATE"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("AccountSweepsMA")
                    }
                    param = param.concat(param2);
                } else {
                    var param2 = {
                        "linkText": "View Sweep",
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionViewSweep",
                            "context": "",
                            "entitlement": ["ACCOUNT_SWEEP_VIEW"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("AccountSweepsMA")
                    }
                    param = param.concat(param2);
                }
                if (!kony.sdk.isNullOrUndefined(this.account.accountStatus) && this.account.accountStatus == "ACTIVE" && (kony.sdk.isNullOrUndefined(this.account.currentBalance) || this.account.currentBalance === "0" || this.account.currentBalance === "")) {
                    var param3 = {
                        "linkText": "Close This Account",
                        "linkCTA": {
                            "level": "Form",
                            "method": "showPopup",
                            "context": "",
                            "entitlement": ["CLOSE_ACCOUNT-CREATE"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": true
                    }
                    param = param.concat(param3);
                }
                if (chequeBookReqCreatePerm) {
                    var param1 = {
                        "linkText": kony.i18n.getLocalizedString('i18n.ChequeBookReq.ChequeBookRequest'),
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionRequestChequeBook",
                            "context": "",
                            "entitlement": ["CHEQUE_BOOK_REQUEST_CREATE"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        }
                    }
                    param = param.concat(param1);
                }
            }
            if (!kony.sdk.isNullOrUndefined(this.account.accountStatus)) {
                if (this.account.accountStatus.toUpperCase() == "CLOSED") {
                    param = [{
                        "linkText": kony.i18n.getLocalizedString('i18n.ViewStatements.STATEMENTS'),
                        "linkCTA": {
                            "level": "Form",
                            "method": "actionViewStatements",
                            "context": "",
                            "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"]
                        },
                        "accessibilityConfig": {
                            "a11yARIA": {
                                role: "link",
                            }
                        },
                        "visibility": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                    }]
                }
            }
            scopeObj.view.quicklinksMobile.setContext(param);
        },
        actionSavingsPot: function() {
            var savingsPotModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "SavingsPotUIModule",
                "appName": "SavingsPotMA"
            });
            savingsPotModule.presentationController.fetchSavingsPot(this.context.accountID);
        },
        actionPayMoney: function() {
            //Function call to  open tranfers page with parameter - account obj to be tranferred from.
            if (applicationManager.getConfigurationManager().getDeploymentGeography() == "EUROPE" && applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")) {
                if (applicationManager.getConfigurationManager().checkUserFeature("UNIFIED_TRANSFER") && applicationManager.getConfigurationManager().checkUserPermission("UNIFIED_TRANSFER_CREATE") && applicationManager.getConfigurationManager().TransferFlowType === "UTF") {
                    var data = applicationManager.getUserPreferencesManager().getUserObj();
                    var navMan = applicationManager.getNavigationManager();
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
                        accountFrom: this.context.accountID
                    });
                    return;
                }
            }
            if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") {
                applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "TransferFastUIModule"
                }).showTransferScreen({
                    accountFrom: this.context.accountID
                });
            }
        },
        actionTransferMoney: function() {
            //Function call to  open tranfers page with parameter - account obj to be tranferred from.
            if (applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")) {
                if (applicationManager.getConfigurationManager().getDeploymentGeography() == "EUROPE") {
                    applicationManager.getModulesPresentationController({
                        "appName": "TransfersMA",
                        "moduleName": "TransferEurUIModule"
                    }).showTransferScreen({
                        context: "MakePaymentOwnAccounts",
                        accountFrom: this.context.accountID
                    });
                    return;
                }
                if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") {
                    applicationManager.getModulesPresentationController({
                        "appName": "TransfersMA",
                        "moduleName": "TransferFastUIModule"
                    }).showTransferScreen({
                        accountFrom: this.context.accountID
                    });
                }
            }
        },
        actionScheduledTransactions: function() {
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
            accountsModule.presentationController.showScheduledTransactionsForm(this.context);
        },
        actionPayBill: function() {
            //Function call to open bill pay screen
            var self = this;
            var onCancel = function() {
                self.loadAccountModule().presentationController.presentAccountDetails();
            };
            applicationManager.getModulesPresentationController({
                "appName": "BillPayMA",
                "moduleName": "BillPaymentUIModule"
            }).showBillPaymentScreen({
                "sender": "Accounts",
                "context": "PayABillWithContext",
                "loadBills": true,
                "data": {
                    "fromAccountNumber": this.context.accountID,
                    "show": 'PayABill',
                    "onCancel": onCancel
                }
            });
        },
        actionPayDueAmount: function() {
            var data = {
                "accounts": this.context
            };
            applicationManager.getModulesPresentationController({
                "appName": "BillPayMA",
                "moduleName": "LoanPayUIModule"
            }).navigateToLoanDue(data);
        },
        actionViewStatements: function() {
          	kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.navFromAccDetails = true;
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
            accountsModule.presentationController.showFormatEstatements(this.context);
        },
        actionViewMyCheques: function() {
            var stopPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "ArrangementsMA",
                "moduleName": "StopPaymentsUIModule"
            });
            stopPaymentsModule.presentationController.showStopPayments({
                //onCancel: onCancel,
                accountID: this.context.accountID,
                "show": OLBConstants.ACTION.VIEW_MYCHEQUES_FORM
            });
        },
        actionViewDisputedTransactions: function() {
            var disputeModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DisputeTransactionUIModule");
            disputeModule.presentationController.showDisputeTransactionModule({
                show: OLBConstants.ACTION.SHOW_DISPUTE_LIST
            });
        },
        actionRequestChequeBook: function() {
            var self = this;
            var onCancel = function() {
                self.loadAccountModule().presentationController.presentAccountDetails();
            };
            var stopPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "ArrangementsMA",
                "moduleName": "StopPaymentsUIModule"
            });
            stopPaymentsModule.presentationController.showStopPayments({
                onCancel: onCancel,
                accountID: this.context.accountID,
                "show": OLBConstants.ACTION.REQUEST_CHEQUE_BOOK_FORM
            });
        },
        actionRequestStopCheques: function() {
            var self = this;
            var onCancel = function() {
                self.loadAccountModule().presentationController.presentAccountDetails();
            };
            var stopPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "ArrangementsMA",
                "moduleName": "StopPaymentsUIModule"
            });
            stopPaymentsModule.presentationController.showStopPayments({
                onCancel: onCancel,
                accountID: this.context.accountID,
                "show": OLBConstants.ACTION.SHOW_STOPCHECKS_FORM
            });
        },
        actionPayoffLoan: function() {
            var data = {
                "accounts": this.context
            };
            applicationManager.getModulesPresentationController({
                "appName": "BillPayMA",
                "moduleName": "LoanPayUIModule"
            }).navigateToLoanPay(data);
        },
        actionUpdateAccountSettings: function() {
            var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ManageArrangementsUIModule",
                "appName": "ManageArrangementsMA"
            });
            profileModule.presentationController.enterProfileSettings("accountSettings");
        },
      
      	highlightType: function(){
			var scopeObj = this;
          	if(this.selectedTab === "Posted"){
          		scopeObj.view.btnAll.skin = "sknBtnSSPSemiboldSelected";
                scopeObj.view.btnFilter2.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
                scopeObj.view.btnFilter3.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
            } else if(this.selectedTab === "Pending"){
               scopeObj.view.btnAll.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
               scopeObj.view.btnFilter2.skin = "sknBtnSSPSemiboldSelected";
               scopeObj.view.btnFilter3.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
            } else if(this.selectedTab === "Blocked"){
               scopeObj.view.btnAll.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
               scopeObj.view.btnFilter2.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
               scopeObj.view.btnFilter3.skin = "sknBtnSSPSemiboldSelected";
            } else if(this.selectedTab === "All"){
               scopeObj.view.btnAllLoan.skin = "sknBtnSSPSemiboldSelected";
               scopeObj.view.btnLoanSchedule.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
            } else if(this.selectedTab === "LoanSchedule"){
               scopeObj.view.btnAllLoan.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
               scopeObj.view.btnLoanSchedule.skin = "sknBtnSSPSemiboldSelected";
            }
        },
        /**
         *  Method to handle highlight Transaction Type
         * @param {String} transactionType transaction type of the transaction
         */
        highlightTransactionType: function(transactionType) {
            var skins = {
                selected: ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_SELECTED,
                unselected: ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_UNSELECTED,
                hover: ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_SELECTED_HOVER,
                hovered: ViewConstants.SKINS.ACCOUNT_DETAILS_SUMMARY_UNSELECTED_HOVER
            };
            var transactionTypeToButtonIdMap = {
                'All': ['btnAllChecking', 'btnAllCredit', 'btnAllDeposit', 'btnAllLoan'],
                'Checks': ['btnChecksChecking'],
                'Deposits': ['btnDepositsChecking', 'btnDepositDeposit'],
                'Transfers': ['btnTransfersChecking'],
                'Withdrawals': ['btnWithdrawsChecking', 'btnWithdrawDeposit'],
                'Payments': ['btnPaymentsCredit'],
                'Purchases': ['btnPurchasesCredit'],
                'Interest': ['btnInterestDeposit']
            };
            var tabs = [this.view.transactions.flxTabsChecking,
                this.view.transactions.flxTabsCredit,
                this.view.transactions.flxTabsDeposit,
                this.view.transactions.flxTabsLoan
            ];
            var currentTab = tabs.filter(function(tab) {
                return tab.isVisible === true;
            })[0];
            if (transactionTypeToButtonIdMap[transactionType]) {
                var isForTransactionType = function(button) {
                    return transactionTypeToButtonIdMap[transactionType].some(function(buttonId) {
                        return buttonId === button.id;
                    });
                };
                var updateButtonSkin = function(button) {
                    if (isForTransactionType(button)) {
                        if (kony.application.getCurrentBreakpoint() == 640) button.top = "0dp";
                        else button.top = "-1dp";
                        button.skin = skins.selected;
                        button.hoverSkin = skins.hover;
                    } else {
                        if (kony.application.getCurrentBreakpoint() == 640) button.top = "0dp";
                        else button.top = "-1dp";
                        button.skin = skins.unselected;
                        button.hoverSkin = skins.hovered;
                    }
                };
                var getButtonsFrom = function(tab) {
                    var hasText = function(text) {
                        return function(fullText) {
                            return fullText.indexOf(text) > -1;
                        };
                    };
                    var getValueFrom = function(object) {
                        return function(key) {
                            return object[key];
                        };
                    };
                    return Object.keys(tab).filter(hasText('btn')).map(getValueFrom(tab));
                };
                getButtonsFrom(currentTab).forEach(updateButtonSkin);
            }
        },
        /**
         * Method to check for pending transaction
         * @param {JSON} transaction transactions
         * @returns {Boolean} true/false
         */
        isPendingTransaction: function(transaction) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            return typeof transaction.statusDescription === 'string' && transaction.statusDescription.toLowerCase() === OLBConstants.PENDING;
        },
        /**
         * Method to check for successful transaction
         * @param {JSON} transaction transactions
         * @returns {Boolean} true/false
         */
        isSuccessfulTransacion: function(transaction) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            return typeof transaction.statusDescription === 'string' && transaction.statusDescription.toLowerCase() === OLBConstants.SUCCESSFUL;
        },
        /**
         * Method to get mapping for different type of transactions
         * @param {String} context context for which mappings are required
         * @param {JSON} transaction current transaction
         * @param {JSON} account account for which mapping is required
         * @param {Object} transactionProperties  transactionProperties like isTransactionDisputed etc
         * @returns {JSON} mappings for requested type
         */
        getMappings: function(context, transaction, account, transactionProperties) {
            var self = this;
            var configManager = applicationManager.getConfigurationManager();
            var formatUtil = applicationManager.getFormatUtilManager();
            var isTransactionDisputed = transactionProperties.isTransactionDisputed;
            //           if (context === "imgError") {
            //               if (isTransactionDisputed === true) {
            //                   return {
            //                       "isVisible": true
            //                   };
            //               } else {
            //                   return {
            //                       "isVisible": false
            //                   };
            //               }
            //           }
            if (context === "imgWarning") {
                if (isTransactionDisputed === true) {
                    return {
                        "isVisible": true
                    };
                } else {
                    return {
                        "isVisible": false
                    };
                }
            }
            if (context === "btnViewRequests") {
                if ((configManager.checkUserFeature("STOP_PAYMENT_REQUEST") || configManager.checkUserPermission("DISPUTE_TRANSACTIONS_VIEW")) && isTransactionDisputed === true) {
                    return {
                        "isVisible": true,
                        "text": kony.i18n.getLocalizedString('i18n.stopChecks.ViewRequests'),
                        "onClick": function() {
                            self.loadAccountModule().presentationController.onViewDisputedRequets(transaction);
                        },
                        "accessibilityconfig": {
                            "a11yLabel": kony.i18n.getLocalizedString('i18n.StopCheckPayments.ViewRequests'),
                        }
                    };
                } else {
                    return {
                        "isVisible": false
                    };
                }
            }
            if (context === "btnDisputeTransaction") {
                var dateDiff = formatUtil.getNumberOfDaysBetweenTwoDates(formatUtil.getDateObjectfromString(transaction.transactionDate), new Date());
                if (configManager.getDisputeConfig(transaction.transactionType) === "true") {
                    if (transaction.isScheduled !== "true" && transaction.statusDescription !== "Pending" && dateDiff <= configManager.getDisputeDuration() && (configManager.checkUserPermission("DISPUTE_TRANSACTIONS_VIEW") === true || configManager.checkUserPermission("DISPUTE_TRANSACTIONS_MANAGE") === true || isTransactionDisputed === false)) {
                        if (configManager.getDisputeCDConfig("both") || (configManager.getDisputeCDConfig("debit") && formatUtil.isDebitTransaction(transaction.amount)) || (configManager.getDisputeCDConfig("credit") && formatUtil.isCreditTransaction(transaction.amount))) {
                            return {
                                "text": kony.i18n.getLocalizedString('i18n.accounts.disputeTransaction'),
                                "isVisible": true,
                                "onClick": function() {
                                    self.loadAccountModule().presentationController.onDisputeTransaction(transaction);
                                },
                                "accessibilityconfig": {
                                    "a11yLabel": kony.i18n.getLocalizedString('i18n.accounts.disputeTransaction'),
                                }
                            };
                        } else {
                            return {
                                "isVisible": false
                            };
                        }
                    } else {
                        return {
                            "isVisible": false
                        };
                    }
                } else {
                    return {
                        "isVisible": false
                    };
                }
                //   if (configManager.checkUserPermission("DISPUTE_TRANSACTIONS_VIEW") === false || configManager.checkUserPermission("DISPUTE_TRANSACTIONS_MANAGE") === false || isTransactionDisputed === true) {
                //     return {
                //       "isVisible": false
                //     };
                //   } else {
                //     if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.DEPOSIT) ||
                //         transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.INTEREST) ||
                //         transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.RECEIVEDREQUEST)) {
                //       return {
                //         "isVisible": false
                //       };
                //     } else {
                //       return {
                //         "text": kony.i18n.getLocalizedString('i18n.accounts.disputeTransaction'),
                //         "isVisible": true,
                //         "onClick": function() {
                //           self.loadAccountModule().presentationController.onDisputeTransaction(transaction);
                //         },
                //         "accessibilityconfig": {
                //           "a11yLabel": kony.i18n.getLocalizedString('i18n.accounts.disputeTransaction'),
                //         }
                //       };
                //     }
                //   }
                // }
            }
            if (context === "btnDownload") {
                return {
                    "text": kony.i18n.getLocalizedString('i18n.common.Download'),
                    "isVisible": true,
                    "centerX": "50%", //(kony.application.getCurrentBreakpoint() == 1024|| orientationHandler.isTablet) ? false : true,
                    "toolTip": CommonUtilities.changedataCase(kony.i18n.getLocalizedString('i18n.common.Download')),
                    "onClick": function() {
                        self.onClickDownloadRow();
                    },
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.common.Download'),
                    }
                };
            }
            if (context === "lblDisputedWarning") {
                if (isTransactionDisputed === true) {
                    return {
                        "text": kony.i18n.getLocalizedString('i18n.StopCheckPayments.DisputedWarning'),
                        "isVisible": true,
                    };
                }
            }
            if (context === "btnPrint") {
                if (CommonUtilities.isPrintEnabled()) {
                    return {
                        "text": kony.i18n.getLocalizedString('i18n.accounts.print'),
                        "isVisible": false, //(kony.application.getCurrentBreakpoint() == 1024|| orientationHandler.isTablet) ? false : true,
                        "toolTip": CommonUtilities.changedataCase(kony.i18n.getLocalizedString('i18n.common.PrintThisTransaction')),
                        "onClick": function() {
                            self.onClickPrintRow();
                        },
                        "accessibilityconfig": {
                            "a11yLabel": kony.i18n.getLocalizedString('i18n.accounts.print'),
                        }
                    };
                } else {
                    return {
                        "isVisible": false
                    };
                }
            }
            if (context === "nickName") {
                return self.getDataByType(account.accountType, transaction).ToValue || "";
            }
        },
        /**
         * Method to get actions for repeat button for each transaction
         * @param {Object} transactionProperties transactionProperties like isTransactionDisputed etc
         * @param {JSON} transaction transaction for which repeat actions are required
         * @returns {Object} repeat button properties like text tooltip etc
         */
        btnRepeatActions: function(transactionProperties, transaction) {
            var self = this;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var isModuleEnabled = self.isTransactionTypeEnabled(transaction);
            if (isModuleEnabled && transactionProperties.isRepeatSupportAccount && transactionProperties.isRepeatableTransaction && !transactionProperties.isTransactionDisputed && !transactionProperties.isFeesOrInterestTransaction && transaction.statusDescription.toLowerCase() === OLBConstants.SUCCESSFUL) {
                return {
                    "text": kony.i18n.getLocalizedString('i18n.accounts.repeat'),
                    "toolTip": CommonUtilities.changedataCase(kony.i18n.getLocalizedString('i18n.common.repeatThisTransaction')),
                    "isVisible": false,
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.accounts.repeat'),
                    },
                    "onClick": function() {
                        self.onRepeatTransaction(transaction)
                    }
                };
            } else {
                return {
                    "text": kony.i18n.getLocalizedString('i18n.accounts.repeat'),
                    "isVisible": false,
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.accounts.repeat'),
                    },
                    "onClick": function() {}
                };
            }
        },
        /**
         * Return the given transaction type supports the module or not based on config.
         * @param {JSON} transaction transaction for which repeat actions are required
         * @returns {boolean} whether the transaction type enalbed or not
         */
        isTransactionTypeEnabled: function(transaction) {
            var isModuleEnabled = false;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var configurationManager = applicationManager.getConfigurationManager();
            if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.EXTERNALTRANSFER) || transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.INTERNALTRANSFER)) {
                isModuleEnabled = !(configurationManager.isKonyBankAccountsTransfer === "false" && configurationManager.isOtherKonyAccountsTransfer === "false" && configurationManager.isOtherBankAccountsTransfer === "false" && configurationManager.isInternationalAccountsTransfer === "false");
            } else if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.BILLPAY)) {
                isModuleEnabled = configurationManager.isBillPayEnabled === "true";
            } else if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.P2P)) {
                isModuleEnabled = configurationManager.ispayAPersonEnabled === "true";
            } else if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.LOAN)) {
                isModuleEnabled = true;
            } else if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.WIRE)) {
                isModuleEnabled = applicationManager.getUserPreferencesManager().getWireTransferEligibleForUser();
            }
            return isModuleEnabled;
        },
        onClickDownloadRow: function() {
            var rowIndex = this.view.transactions.segTransactions.selectedRowIndex[1];
            var secIndex = this.view.transactions.segTransactions.selectedRowIndex[0];
            var data = this.view.transactions.segTransactions.data[secIndex][1][rowIndex];
            var searchDownloadFileParams = {
                "format": "pdf",
                "transactionId": data.lblToValue.text,
                "transactionType": data.lblType.text
            };
            searchDownloadFileParams.isSearchParam = false;
            this.loadAccountModule().presentationController.downloadTransactionFile(searchDownloadFileParams);
        },
        /**
         * Method that gets called on click of repeat transaction
         * @param {JSON} transaction transaction that needs to be repeated
         */
        onRepeatTransaction: function(transaction) {
            var transactionData;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var onCancel = this.presenter.presentAccountDetails.bind(this.presenter);
            if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.EXTERNALTRANSFER) || transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.INTERNALTRANSFER)) {
                transactionData = {
                    "amount": Math.abs(transaction.amount),
                    "frequencyEndDate": transaction.frequencyEndDate,
                    "frequencyStartDate": transaction.frequencyStartDate,
                    "frequencyType": transaction.frequencyType,
                    "fromAccountNumber": transaction.fromAccountNumber,
                    "isScheduled": "false",
                    "numberOfRecurrences": transaction.numberOfRecurrences,
                    "scheduledDate": transaction.scheduledDate,
                    "toAccountNumber": transaction.toAccountNumber,
                    "transactionDate": transaction.transactionDate,
                    "ExternalAccountNumber": transaction.ExternalAccountNumber,
                    "transactionId": transaction.transactionId,
                    "notes": transaction.transactionsNotes,
                    "transactionType": transaction.transactionType,
                    "category": transaction.category,
                    "isInternationalAccount": transaction.isInternationalAccount,
                    "serviceName": transaction.serviceName
                };
                if (transaction.isInternationalAccount === "false" && transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.EXTERNALTRANSFER)) {
                    transactionData.IBAN = transaction.IBAN ? transaction.IBAN : "",
                        transactionData.toAccountName = transaction.toAccountName ? transaction.toAccountName : "";
                } else if (transaction.isInternationalAccount === "true" && transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.EXTERNALTRANSFER)) {
                    transactionData.swiftCode = transaction.swiftCode ? transaction.swiftCode : "";
                    transactionData.toAccountName = transaction.toAccountName ? transaction.toAccountName : "";
                    transactionData.bankName = transaction.bankName ? transaction.bankName : "";
                    transactionData.ExternalAccountNumber = transaction.ExternalAccountNumber ? transaction.ExternalAccountNumber : "";
                }
                this.loadAccountModule().presentationController.repeatTransfer(transactionData, onCancel);
            } else if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.BILLPAY))) {
                transactionData = {
                    "payeeNickname": transaction.payeeNickName || transaction.payeeName,
                    "dueAmount": transaction.billDueAmount,
                    "payeeId": transaction.payeeId,
                    "billid": transaction.billid,
                    "sendOn": transaction.scheduledDate,
                    "notes": transaction.transactionsNotes,
                    "amount": String(Math.abs(transaction.amount)),
                    "fromAccountName": transaction.fromAccountName,
                    "fromAccountNumber": transaction.fromAccountNumber,
                    "lastPaidAmount": transaction.billPaidAmount || transaction.lastPaidAmount,
                    "lastPaidDate": transaction.billPaidDate || transaction.lastPaidDate,
                    "nameOnBill": transaction.nameOnBill,
                    "eBillSupport": transaction.eBillSupport,
                    "eBillStatus": transaction.eBillEnable,
                    "billDueDate": transaction.billDueDate,
                    "billCategory": transaction.billCategoryId,
                    "billCategoryName": transaction.billCategory,
                    "billGeneratedDate": transaction.billGeneratedDate,
                    "ebillURL": transaction.ebillURL,
                    "frequencyEndDate": transaction.frequencyEndDate,
                    "frequencyStartDate": transaction.frequencyStartDate,
                    "frequencyType": transaction.frequencyType,
                    "numberOfRecurrences": transaction.numberOfRecurrences,
                    "isScheduled": transaction.isScheduled,
                    "serviceName": transaction.serviceName
                }
                this.loadAccountModule().presentationController.repeatBillPay(transactionData, onCancel);
            } else if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.P2P)) {
                this.loadAccountModule().presentationController.repeatP2P(transaction, onCancel);
            } else if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.WIRE)) {
                transactionData = {
                    payeeNickName: transaction.payeeNickName,
                    payeeName: transaction.payeeName,
                    payeeCurrency: transaction.payeeCurrency,
                    type: transaction.payeeType,
                    wireAccountType: transaction.wireAccountType,
                    accountNumber: transaction.payeeAccountNumber,
                    routingCode: transaction.routingNumber,
                    country: transaction.country,
                    IBAN: transaction.IBAN ? applicationManager.getFormatUtilManager().formatIBAN(transaction.IBAN) : "",
                    fromAccountNumber: transaction.fromAccountNumber,
                    swiftCode: transaction.swiftCode,
                    internationalRoutingCode: transaction.internationalRoutingCode,
                    payeeId: transaction.payeeId,
                    bankAddressLine1: transaction.bankAddressLine1,
                    bankAddressLine2: transaction.bankAddressLine2,
                    bankCity: transaction.bankCity,
                    bankState: transaction.bankState,
                    bankZip: transaction.bankZip,
                    bankName: transaction.bankName,
                    addressLine1: transaction.payeeAddressLine1,
                    addressLine2: transaction.payeeAddressLine2,
                    cityName: transaction.cityName,
                    state: transaction.state,
                    transactionsNotes: transaction.transactionsNotes,
                    amount: Math.abs(transaction.amount),
                    amountRecieved: Math.abs(transaction.amountRecieved),
                    zipCode: transaction.zipCode,
                    serviceName: transaction.serviceName
                };
                this.loadAccountModule().presentationController.repeatWireTransfer(transactionData, onCancel);
            }
        },
        /**
         * Method to handle onClick of the transaction segment list to toggle
         */
        onClickToggle: function() {
            var scopeObj = this;
            var index = kony.application.getCurrentForm().transactions.segTransactions.selectedRowIndex;
            var sectionIndex = index[0];
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().transactions.segTransactions.data;
            var section = data.length;
            var collapseAll = function(segments, section) {
                segments.forEach(function(segment, i) {
                    if (segment.template === scopeObj.checkImagesTemplate || segment.template === scopeObj.transactionsSelectedTemplate) {
                        segment.template = scopeObj.transactionsTemplate;
                        segment.imgDropdown = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                        kony.application.getCurrentForm().transactions.segTransactions.setDataAt(segment, i, section);
                    }
                });
            };
            var type = data[sectionIndex][1][rowIndex].lblType.text;
            var txnref = data[sectionIndex][1][rowIndex].lblToValue.text;
            var userManager = applicationManager.getUserPreferencesManager();
            var customerId = userManager.getBackendIdentifier();
            if (type === "Cheque" || type === "Draft") {
                frontImageView = "";
                backImageView = "";
                draftImage = "";
                frontImageDownload = "";
                backImageDownload = "";
                draftDownload = "";
                if (type === "Cheque") {
                    var imagefront = {
                        "customerId": customerId,
                        "accountId": accountDetailsGlobal.accountID,
                        "transactionRef": txnref,
                        "mediaType": "png",
                        "transactionType": type,
                        "page": "0"
                    };
                    var imageback = {
                        "customerId": customerId,
                        "accountId": accountDetailsGlobal.accountID,
                        "transactionRef": txnref,
                        "mediaType": "png",
                        "transactionType": type,
                        "page": "1"
                    };
                    this.loadAccountModule().presentationController.viewImage(imagefront);
                    this.loadAccountModule().presentationController.viewImage(imageback);
                    this.loadAccountModule().presentationController.downloadImage(imagefront);
                    this.loadAccountModule().presentationController.downloadImage(imageback);
                } else {
                    var draftimage = {
                        "customerId": customerId,
                        "accountId": accountDetailsGlobal.accountID,
                        "transactionRef": txnref,
                        "mediaType": "png",
                        "transactionType": type,
                        "page": "0"
                    };
                    this.loadAccountModule().presentationController.viewImage(draftimage);
                    this.loadAccountModule().presentationController.downloadImage(draftimage);
                }
            }
            if (data[sectionIndex][1]) {
                if ((data[sectionIndex][1][rowIndex].lblTypeValue === "CheckWithdrawal" || data[sectionIndex][1][rowIndex].lblTypeValue === "CheckDeposit") && data[sectionIndex][1][rowIndex].template === this.transactionsTemplate) {
                    while (section--) {
                        collapseAll(data[section][1], section);
                    }
                    data[sectionIndex][1][rowIndex].imgDropdown = ViewConstants.FONT_ICONS.CHEVRON_UP;
                    data[sectionIndex][1][rowIndex].template = this.checkImagesTemplate;
                } else if (data[sectionIndex][1][rowIndex].template === this.transactionsTemplate) {
                    while (section--) {
                        collapseAll(data[section][1], section);
                    }
                    data[sectionIndex][1][rowIndex].imgDropdown = ViewConstants.FONT_ICONS.CHEVRON_UP;
                    data[sectionIndex][1][rowIndex].template = this.transactionsSelectedTemplate;
                } else {
                    data[sectionIndex][1][rowIndex].imgDropdown = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    data[sectionIndex][1][rowIndex].template = this.transactionsTemplate;
                }
                kony.application.getCurrentForm().transactions.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
                // var data1 = kony.application.getCurrentForm().transactions.segTransactions.clonedTemplates[sectionIndex][1][rowIndex].info.frame.height; //To be fixed
                // data[sectionIndex][1][rowIndex].flxIdentifier.height = data1 + "dp";
                kony.application.getCurrentForm().transactions.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
            } else {
                if ((data[sectionIndex][1][rowIndex].lblTypeValue === "CheckWithdrawal" || data[sectionIndex][1][rowIndex].lblTypeValue === "CheckDeposit") && data[rowIndex].template === this.transactionsTemplate) {
                    collapseAll(data, sectionIndex);
                    data[rowIndex].imgDropdown = ViewConstants.FONT_ICONS.CHEVRON_UP;
                    data[rowIndex].template = this.checkImagesTemplate;
                } else if (data[rowIndex].template === this.transactionsTemplate) {
                    collapseAll(data, sectionIndex);
                    data[rowIndex].imgDropdown = ViewConstants.FONT_ICONS.CHEVRON_UP;
                    data[rowIndex].template = this.transactionsSelectedTemplate;
                } else {
                    data[rowIndex].imgDropdown = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    data[rowIndex].template = this.transactionsTemplate;
                }
                kony.application.getCurrentForm().transactions.segTransactions.setDataAt(data[rowIndex], rowIndex, sectionIndex);
            }
            this.view.transactions.forceLayout();
            this.AdjustScreen();
        },
        /**
         * Method to assign action for print row click
         */
        onClickPrintRow: function() {
            var rowIndex = this.view.transactions.segTransactions.selectedRowIndex[1];
            var secIndex = this.view.transactions.segTransactions.selectedRowIndex[0];
            var data = this.view.transactions.segTransactions.data[secIndex][1][rowIndex];
            this.loadAccountModule().presentationController.showTransferPrintPage({
                transactionRowData: data,
                accountDisplayName: this.view.lblAccountTypes.text
            });
        },
        /**
         * onClickPrint : Method to assign action for print
         */
       onClickPrint: function() {
            var currAccount = this.context;
			var navMan = applicationManager.getNavigationManager();
            this.selectedInfo = {};
            this.selectedInfo.accountName = this.view.lblAccountTypes.text;
			this.selectedInfo.currentBalance = currAccount.currentBalance;
			this.selectedInfo.principalBalance = currAccount.principalBalance;
			this.selectedInfo.AccountName = currAccount.AccountName;
			this.selectedInfo.AccountNumber = currAccount.Account_id;
			this.selectedInfo.pendingDeposits = this.view.summary.tab1field1backendmapping;
			this.selectedInfo.pendingWithdrawals = this.view.summary.tab1field2backendmapping;
            this.selectedInfo.selectedTab = this.selectedTab;
			var data = this.view.segTransactionList.data;
            navMan.setCustomInfo("frmNewPrintTransaction", this.selectedInfo);
			navMan.setCustomInfo("frmNewPrintTransactionData", data);
            applicationManager.getNavigationManager().navigateTo({
                appName: "ArrangementsMA",
                friendlyName: "AccountsUIModule/frmNewPrintTransaction"
            })
        },
        onComponentClickPrint: function(data) {
            var accountDisplayName = this.view.lblAccountTypes.text;
            this.presenter.showPrintPage({
                transactions: data,
                accountDisplayName: accountDisplayName
            });
        },
        onClickDownloadRowComponent: function(data) {
            var transactionId = "";
            if (data.hasOwnProperty("statementReference") && !kony.sdk.isNullOrUndefined(data.statementReference)) {
                transactionId = data.statementReference;
            } else if (data.hasOwnProperty("Id") && !kony.sdk.isNullOrUndefined(data.Id)) {
                transactionId = data.Id;
            }
            var searchDownloadFileParams = {
                "format": "pdf",
                "transactionId": transactionId,
                "transactionType": data.transactionType,
                "transactionDetails": data
            };
            searchDownloadFileParams.isSearchParam = false;
            this.loadAccountModule().presentationController.downloadTransactionFile(searchDownloadFileParams);
        },
        getContextualData: function(data) {
            var self = this;
            var amount = 0;
            var overDueDate = "";
            if (data != null && data.hasOwnProperty("id") && data.id) {
                if (data.id === "payOverDue") {
                    if (data.hasOwnProperty("installmentAmount") && data.installmentAmount) {
                        amount = data.installmentAmount;
                    } else {
                        amount = 0;
                    }
                    if (data.hasOwnProperty("paymentDate") && data.paymentDate) {
                        overDueDate = data.paymentDate;
                    }
                    this.navigateToLoanDue(amount, overDueDate);
                }
                if (data.id === "Dispute") {
                    self.loadAccountModule().presentationController.onDisputeTransaction(data);
                }
                if (data.id === "View Requests") {
                    self.loadAccountModule().presentationController.onViewDisputedRequets(data);
                }
                if (data.id === "Download") {
                    self.onClickDownloadRowComponent(data);
                }
                if (data.id === "Cheque") {
                    self.fetchCheckImages(data);
                }
                if (data.id === "SwiftPayment") {
                    self.downloadSwiftTransaction(data);
                }
                if (data.id === "Attachments") {
                    if (data.fileNames.length > 0) self.showAttachments(data);
                }
            }
        },
        showAttachments: function(data) {
            var scope = this;
            fileNames = this.presenter.attachments;
            if (fileNames !== undefined) {
                this.view.setContentOffset({
                    x: "0%",
                    y: "0%"
                }, true);
                scope.view.flxDownloadAttachment.setVisibility(true);
                if (fileNames.length === 1) scope.view.btnDownload.text = kony.i18n.getLocalizedString("i18n.common.Download");
                else scope.view.btnDownload.text = kony.i18n.getLocalizedString("i18n.common.DownloadAll");
                scope.view.flxButtons.btnCancel.onClick = function() {
                    scope.view.flxDownloadAttachment.setVisibility(false);
                };
                scope.view.flxButtons.btnDownload.onClick = function() {
                    if (fileNames.length > 0) {
                        var count = 0;
                        FormControllerUtility.showProgressBar(this.view);
                        for (var i = 0; i < fileNames.length; i++) {
                            //this.fileName = fileNames[i].fileName;
                            scope.loadAccountModule().presentationController.downloadAttachments(null, fileNames[i], i);
                        }
                        FormControllerUtility.hideProgressBar(this.view);
                    }
                };
                this.setDownloadSegmentData(fileNames);
            }
        },
        setDownloadSegmentData: function(filesList) {
            var scope = this;
            var downloadAttachmentsData = [];
            for (var i = 0; i < filesList.length; i++) {
                downloadAttachmentsData[i] = {};
                downloadAttachmentsData[i].filename = filesList[i].fileName;
                downloadAttachmentsData[i]["imgDownloadAttachment"] = {
                    "src": "download_blue.png"
                };
            }
            scope.view.segDownloadItems.widgetDataMap = {
                "lblDownloadAttachment": "filename",
                "imgDownloadAttachment": "imgDownloadAttachment",
            };
            scope.view.segDownloadItems.setData(downloadAttachmentsData);
        },
        downloadSingleFile: function(dataItem) {
            var scopeObj = this;
            scopeObj.loadAccountModule().presentationController.downloadAttachments(transactionObject, dataItem, 0);
        },
        downloadSwiftTransaction: function(data) {
            externalImage = "", externalDownload = "";
            var self = this;
            var transaction = data;
            var account = accountDetailsGlobal;
            var userManager = applicationManager.getUserPreferencesManager();
            var customerId = userManager.getBackendIdentifier();
            var params = {
                "customerId": customerId,
                "accountId": account.accountID,
                "transactionRef": transaction.transactionId,
                "mediaType": "pdf",
                "transactionType": transaction.transactionType,
                "page": "0"
            }
            self.loadAccountModule().presentationController.externalView(params);
            params.mediaType = "pdf";
            self.loadAccountModule().presentationController.externalDownload(params);
            self.downloadExternalTransfer(transaction, account);
        },
        fetchCheckImages: function(data) {
            var type = data.transactionType;
            var txnref = data.transactionId;
            FormControllerUtility.showProgressBar(this.view);
            var userManager = applicationManager.getUserPreferencesManager();
            var customerId = userManager.getBackendIdentifier();
            frontImageView = "";
            backImageView = "";
            draftImage = "";
            frontImageDownload = "";
            backImageDownload = "";
            draftDownload = "";
            transaction = data;
            if (type === "Cheque") {
                var imagefront = {
                    "customerId": customerId,
                    "accountId": accountDetailsGlobal.accountID,
                    "transactionRef": txnref,
                    "mediaType": "png",
                    "transactionType": type,
                    "page": "0"
                };
                var imageback = {
                    "customerId": customerId,
                    "accountId": accountDetailsGlobal.accountID,
                    "transactionRef": txnref,
                    "mediaType": "png",
                    "transactionType": type,
                    "page": "1"
                };
                this.loadAccountModule().presentationController.viewImage(imagefront);
                this.loadAccountModule().presentationController.viewImage(imageback);
                this.loadAccountModule().presentationController.downloadImage(imagefront);
                this.loadAccountModule().presentationController.downloadImage(imageback);
            } else {
                var draftimage = {
                    "customerId": customerId,
                    "accountId": accountDetailsGlobal.accountID,
                    "transactionRef": txnref,
                    "mediaType": "png",
                    "transactionType": type,
                    "page": "0"
                };
                this.loadAccountModule().presentationController.viewImage(draftimage);
                this.loadAccountModule().presentationController.downloadImage(draftimage);
            }
        },
        navigateToLoanDue: function(amount, overDueDate) {
            var account = this.context;
            if (account == null || account === undefined) {
                account = {};
            }
            amount = CommonUtilities.formatCurrencyWithCommas(amount);
            amount = amount.slice(1);
            account.currentAmountDue = amount;
            account.nextPaymentAmount = amount;
            account.nextPaymentDate = overDueDate;
            var data = {
                "accounts": account
            };
            applicationManager.getModulesPresentationController({
                "appName": "BillPayMA",
                "moduleName": "LoanPayUIModule"
            }).navigateToLoanDue(data);
        },
        /**
         * Method to show Check Image
         * @param {String} frontImage front image of check
         * @param {String} backImage back image of check
         * @param {String} postDate post date of check
         * @param {String} amount amount of check
         * @param {String} memo memo on check
         */
        showCheckImage: function(transaction, frontImage, backImage, postDate, amount, memo, transactionType) {
            var self = this;
            this.view.CheckImage.imgCheckImage.src = "";
            this.view.CheckImage.imgCheckImageZoom.src = "";
            this.view.CheckImage.imgZoomIcon.text = "z";
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            if (transactionType === "Draft") {
                this.draftView();
            } else {
                this.checkView();
            }
            CommonUtilities.setText(this.view.CheckImage.lblPostDateValue, CommonUtilities.getFrontendDateString(postDate), accessibilityConfig);
            CommonUtilities.setText(this.view.CheckImage.lblAmountValue, self.getDisplayCurrencyFormatWrapper(transaction, amount, true), accessibilityConfig);
            CommonUtilities.setText(this.view.CheckImage.lblMemoValue, (memo === undefined || memo === null || memo === "") ? kony.i18n.getLocalizedString("i18n.common.none") : memo, accessibilityConfig);
            this.view.flxCheckImage.height = self.getPageHeight();
            this.view.flxCheckImage.setVisibility(true);
            this.view.CheckImage.lblCheckDetails.setFocus(true);
            FormControllerUtility.hideProgressBar(this.view);
            this.AdjustScreen();
        },
        checkView: function() {
            var self = this;
            if (frontImageView !== "No records were found that matched the selection criteria" && backImageView !== "No records were found that matched the selection criteria") {
                this.view.CheckImage.lblCheckDetails.text = kony.i18n.getLocalizedString("i18n.CheckImage.CheckDetails");
                this.view.CheckImage.imgCheckImage.setVisibility(true);
                this.view.CheckImage.imgCheckImageZoom.setVisibility(false);
                this.view.CheckImage.flxNoimage.setVisibility(false);
                this.view.CheckImage.flxImageHolder.setVisibility(true);
                this.view.CheckImage.flxFlip.setVisibility(true);
                this.view.CheckImage.imgCheckImage.base64 = frontImageView;
                this.view.CheckImage.flxFlip.onClick = function() {
                    if (self.view.CheckImage.imgCheckImage.base64 === frontImageView) {
                        self.view.CheckImage.imgCheckImage.base64 = backImageView;
                    } else {
                        self.view.CheckImage.imgCheckImage.base64 = frontImageView;
                    }
                };
                this.view.CheckImage.flxZoom.onClick = function() {
                    if (self.view.CheckImage.imgZoomIcon.text === "z") {
                        self.view.CheckImage.imgZoomIcon.text = "e";
                        if (self.view.CheckImage.imgCheckImage.base64 === frontImageView) {
                            self.view.CheckImage.imgCheckImage.setVisibility(false);
                            self.view.CheckImage.imgCheckImageZoom.setVisibility(true);
                            self.view.CheckImage.imgCheckImageZoom.base64 = frontImageView;
                        } else {
                            self.view.CheckImage.imgCheckImage.setVisibility(false);
                            self.view.CheckImage.imgCheckImageZoom.setVisibility(true);
                            self.view.CheckImage.imgCheckImageZoom.base64 = backImageView;
                        }
                    } else {
                        self.view.CheckImage.imgZoomIcon.text = "z";
                        if (self.view.CheckImage.imgCheckImage.base64 === frontImageView) {
                            self.view.CheckImage.imgCheckImage.setVisibility(true);
                            self.view.CheckImage.imgCheckImageZoom.setVisibility(false);
                            self.view.CheckImage.imgCheckImage.base64 = frontImageView;
                        } else {
                            self.view.CheckImage.imgCheckImage.setVisibility(true);
                            self.view.CheckImage.imgCheckImageZoom.setVisibility(false);
                            self.view.CheckImage.imgCheckImage.base64 = backImageView;
                        }
                    }
                };
                this.view.CheckImage.flxPrint.onClick = function() {
                    if (self.view.CheckImage.imgCheckImage.base64 === frontImageView) self.downloadUrl(frontImageDownload);
                    else self.downloadUrl(backImageDownload);
                };
                this.view.CheckImage.flxDownload.onClick = function() {
                    //        self.presenter.showTransferPrintPage({
                    //         checkIamge: self.view.CheckImage.imgCheckImage.base64
                    //        });
                    kony.os.print();
                };
            } else {
                this.view.CheckImage.imgCheckImage.setVisibility(false);
                this.view.CheckImage.imgCheckImageZoom.setVisibility(false);
                this.view.CheckImage.flxNoimage.setVisibility(true);
                this.view.CheckImage.flxImageHolder.setVisibility(false);
            }
        },
        draftView: function() {
            var self = this;
            this.view.CheckImage.lblCheckDetails.text = kony.i18n.getLocalizedString("i18n.CheckImage.DraftDetails");
            this.view.CheckImage.flxFlip.setVisibility(false);
            if (draftImage !== "No records were found that matched the selection criteria") {
                this.view.CheckImage.imgCheckImage.setVisibility(true);
                this.view.CheckImage.imgCheckImageZoom.setVisibility(false);
                this.view.CheckImage.flxNoimage.setVisibility(false);
                this.view.CheckImage.flxImageHolder.setVisibility(true);
                this.view.CheckImage.imgCheckImage.base64 = draftImage;
                this.view.CheckImage.flxPrint.onClick = function() {
                    self.downloadUrl(draftDownload);
                };
                this.view.CheckImage.flxDownload.onClick = function() {
                    kony.os.print();
                };
                this.view.CheckImage.flxZoom.onClick = function() {
                    if (self.view.CheckImage.imgZoomIcon.text === "z") {
                        self.view.CheckImage.imgZoomIcon.text = "e";
                        self.view.CheckImage.imgCheckImage.setVisibility(false);
                        self.view.CheckImage.imgCheckImageZoom.setVisibility(true);
                        self.view.CheckImage.imgCheckImageZoom.base64 = draftImage;
                    } else {
                        self.view.CheckImage.imgZoomIcon.text = "z";
                        self.view.CheckImage.imgCheckImage.setVisibility(true);
                        self.view.CheckImage.imgCheckImageZoom.setVisibility(false);
                        self.view.CheckImage.imgCheckImageZoom.base64 = draftImage;
                    }
                };
            } else {
                this.view.CheckImage.imgCheckImage.setVisibility(false);
                this.view.CheckImage.imgCheckImageZoom.setVisibility(false);
                this.view.CheckImage.flxNoimage.setVisibility(true);
                this.view.CheckImage.flxImageHolder.setVisibility(false);
            }
        },
        /**
         * Method to get transactions value based on the account type
         * @param {String} accountType account type of transaction
         * @param {JSON} transaction current transaction
         * @returns {Object} required values for transaction type
         */
        getDataByType: function(accountType, transaction) {
            var nickname;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            if (transaction) {
                nickname = transaction.payPersonName || transaction.payeeNickName || transaction.payeeName || transaction.toAccountName || " ";
            }
            switch (accountType) {
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING):
                    {
                        return {
                            editText: kony.i18n.getLocalizedString('i18n.accounts.editRule'),
                            transactionText: kony.i18n.getLocalizedString('i18n.accounts.disputeTransaction'),
                            ToText: kony.i18n.getLocalizedString('i18n.common.To'),
                            ToValue: transaction !== undefined ? nickname : " ",
                            withdrawFlag: true,
                            rememberFlag: false, // Made false as it's Not in scope R4
                            typeText: kony.i18n.getLocalizedString('i18n.common.Type')
                        }
                    }
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING):
                    {
                        return {
                            editText: kony.i18n.getLocalizedString('i18n.accounts.editRule'),
                            transactionText: kony.i18n.getLocalizedString('i18n.accounts.disputeTransaction'),
                            ToText: kony.i18n.getLocalizedString('i18n.common.To'),
                            ToValue: transaction !== undefined ? nickname : " ",
                            withdrawFlag: true,
                            rememberFlag: false, // Made false as it's Not in scope R4
                            typeText: kony.i18n.getLocalizedString('i18n.common.Type')
                        }
                    }
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD):
                    {
                        return {
                            editText: kony.i18n.getLocalizedString('i18n.common.Download'),
                            transactionText: kony.i18n.getLocalizedString('i18n.accounts.repeatTransaction'),
                            ToText: kony.i18n.getLocalizedString("i18n.transfers.RefrenceNumber"),
                            ToValue: transaction !== undefined ? transaction.transactionId : " ",
                            withdrawFlag: false,
                            rememberFlag: false,
                            typeText: kony.i18n.getLocalizedString('i18n.accounts.TransactionType')
                        }
                    }
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CURRENT):
                    {
                        return {
                            editText: kony.i18n.getLocalizedString('i18n.accounts.editRule'),
                            transactionText: kony.i18n.getLocalizedString('i18n.accounts.disputeTransaction'),
                            ToText: kony.i18n.getLocalizedString('i18n.common.To'),
                            ToValue: transaction !== undefined ? nickname : " ",
                            withdrawFlag: true,
                            rememberFlag: false, // Made false as it's Not in scope R4
                            typeText: kony.i18n.getLocalizedString('i18n.common.Type')
                        }
                    }
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN):
                    {
                        return {
                            editText: kony.i18n.getLocalizedString('i18n.common.Download'),
                            transactionText: kony.i18n.getLocalizedString('i18n.accounts.repeatTransaction'),
                            ToText: kony.i18n.getLocalizedString("i18n.transfers.RefrenceNumber"),
                            ToValue: transaction !== undefined ? transaction.transactionId : " ",
                            withdrawFlag: false,
                            rememberFlag: false,
                            typeText: kony.i18n.getLocalizedString('i18n.accounts.TransactionType')
                        }
                    }
                case applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT):
                    {
                        return {
                            editText: kony.i18n.getLocalizedString('i18n.common.Download'),
                            transactionText: kony.i18n.getLocalizedString('i18n.accounts.repeatTransaction'),
                            ToText: kony.i18n.getLocalizedString("i18n.transfers.RefrenceNumber"),
                            ToValue: transaction !== undefined ? transaction.transactionId : " ",
                            withdrawFlag: false,
                            rememberFlag: false,
                            typeText: kony.i18n.getLocalizedString('i18n.accounts.TransactionType')
                        }
                    }
                case applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.WIRE):
                    {
                        return {
                            editText: kony.i18n.getLocalizedString('i18n.accounts.editRule'),
                            transactionText: kony.i18n.getLocalizedString('i18n.accounts.disputeTransaction'),
                            ToText: kony.i18n.getLocalizedString('i18n.common.To'),
                            ToValue: transaction !== undefined ? nickname : " ",
                            withdrawFlag: false,
                            rememberFlag: false,
                            typeText: kony.i18n.getLocalizedString('i18n.common.Type')
                        }
                    }
                default:
                    {
                        return {
                            editText: kony.i18n.getLocalizedString('i18n.accounts.editRule'),
                            transactionText: kony.i18n.getLocalizedString('i18n.accounts.disputeTransaction'),
                            ToText: kony.i18n.getLocalizedString("i18n.transfers.RefrenceNumber"),
                            ToValue: transaction !== undefined ? transaction.transactionId : " ",
                            withdrawFlag: true,
                            rememberFlag: false, // Made false as it's Not in scope R4
                            typeText: kony.i18n.getLocalizedString('i18n.common.Type')
                        }
                    }
            }
        },
        /**
         * Method to get data map for checks
         * @param {JSON} transaction transaction for which data is required
         * @param {String} transactionType transactionType for which data is required
         * @param {JSON} account Account for which data is required
         * @param {String} isTransactionTypeIconVisible check for isTransactionTypeIconVisible
         * @param {Object} transactionProperties transactionProperties like istransactionrepeatable etc
         * @returns {JSON} view Model for checks
         */
        getDataMapForChecks: function(transaction, transactionType, account, isTransactionTypeIconVisible, transactionProperties) {
            accountDetailsGlobal = account;
            var self = this;
            return {
                "lblIdentifier": "",
                "flxCheck2": {
                    "isVisible": transaction.frontImage2 ? true : false
                },
                "lblTransactionFeeKey": {
                    "text": "Transaction Fee",
                    "isVisible": false,
                },
                "lblTransactionFeeValue": {
                    "text": "5.00",
                    "isVisible": false,
                },
                "lblCurrencyAmountTitle": {
                    "text": "Currency",
                    "isVisible": false,
                },
                "lblCurrencyAmountValue": {
                    "text": "US Dollar($)",
                    "isVisible": false,
                },
                "flxCash": {
                    isVisible: transaction.cashAmount ? true : false
                },
                "btnPrint": {
                    text: self.getMappings("btnPrint", transaction, account, transactionProperties),
                },
                "btnEditRule": {
                    "isVisible": "false"
                },
                "btnRepeat": {
                    "isVisible": false
                },
                "lblWithdrawalAmountTitle": {
                    "text": kony.i18n.getLocalizedString('i18n.StopPayments.Checkno'),
                    "isVisible": true,
                    "accessibilityconfig": {
                        "a11yLabel": this.transactionTypeLabelName(transaction),
                        "a11yARIA ": {
                            tabIndex: this.getDataByType(account.accountType).withdrawFlag ? 0 : -1
                        }
                    }
                },
                "lblWithdrawalAmountValue": {
                    "text": (transactionProperties.isCheckNumberAvailable) ? transaction.checkNumber : "NA",
                    "isVisible": true,
                    "onTouchEnd": function() {
                        //transactionDetailsGlobal = transaction
                        self.showCheckImage(transaction, transaction.frontImage1, transaction.backImage1, transaction.transactionDate, transaction.amount, transaction.memo, transaction.transactionType);
                    },
                    "accessibilityconfig": {
                        "a11yLabel": self.getDisplayCurrencyFormatWrapper(transaction, transaction.amount, false),
                        "a11yARIA ": {
                            tabIndex: this.getDataByType(account.accountType).withdrawFlag ? 0 : -1
                        }
                    }
                },
                "lblTypeValue": {
                    "text": CommonUtilities.getFrontendDateString(transaction.transactionDate),
                    "isVisible": true,
                    "accessibilityconfig": {
                        "a11yLabel": transactionType
                    }
                },
                "lblTypeTitle": {
                    "text": kony.i18n.getLocalizedString('i18n.accounts.posted'),
                    "isVisible": true,
                    "accessibilityconfig": {
                        "a11yLabel": this.getDataByType(account.accountType).typeText
                    }
                },
                "lblToTitle": {
                    "text": kony.i18n.getLocalizedString('i18n.konybb.common.ReferenceNumber'),
                    "accessibilityconfig": {
                        "a11yLabel": this.getDataByType(account.accountType).ToText,
                        "a11yARIA ": {
                            tabIndex: transactionProperties.isFeesOrInterestTransaction ? -1 : 0
                        }
                    }
                },
                "lblToValue": {
                    "text": transaction.transactionId,
                    "accessibilityconfig": {
                        "a11yLabel": self.getMappings("nickName", transaction, account, transactionProperties),
                        "a11yARIA ": {
                            tabIndex: transactionProperties.isFeesOrInterestTransaction ? -1 : 0
                        }
                    }
                },
                "btnDisputeTransaction": self.getMappings("btnDisputeTransaction", transaction, account, transactionProperties),
                "btnDownload": self.getMappings("btnDownload", transaction, account, transactionProperties),
                "lblWithdrawalAmountTitle2": {
                    "text": kony.i18n.getLocalizedString('i18n.accounts.withdrawalAmount'),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.accounts.withdrawalAmount')
                    }
                },
                "imgCheckImage1Icon": {
                    "text": ViewConstants.FONT_ICONS.CHECK_BOX_ICON,
                    "accessibilityconfig": {
                        "a11yLabel": ViewConstants.FONT_ICONS.CHECK_BOX_ICON
                    }
                },
                "imgCheckImage2Icon": {
                    "text": ViewConstants.FONT_ICONS.CHECK_BOX_ICON,
                    "accessibilityconfig": {
                        "a11yLabel": ViewConstants.FONT_ICONS.CHECK_BOX_ICON
                    }
                },
                "lblType": {
                    "text": (applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) != null ? applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) : transactionType),
                    "isVisible": isTransactionTypeIconVisible(),
                    "accessibilityconfig": {
                        "a11yLabel": (applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) != null ? applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) : transactionType),
                        "a11yARIA ": isTransactionTypeIconVisible()
                    }
                },
                "lblSeparator": "lblSeparator",
                "lblSeparator2": "lblSeparator2",
                "lblSeparatorActions": "lblSeparatorActions",
                "lblSeperatorhor1": "lblSeperatorhor1",
                "lblSeperatorhor2": "lblSeperatorhor2",
                "lblSeperatorhor3": "lblSeperatorhor3",
                "lblSeperatorhor4": "lblSeperatorhor4",
                "lblSeperatorhor5": "lblSeperatorhor5",
                "lblTotalValue": {
                    "text": kony.i18n.getLocalizedString('i18n.CheckImages.Total'),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.CheckImages.Total')
                    }
                },
                "lblCheck1Ttitle": {
                    "text": transaction.checkNumber1,
                    "accessibilityconfig": {
                        "a11yLabel": transaction.checkNumber1
                    }
                },
                "lblCheck2Ttitle": {
                    "text": transaction.checkNumber2,
                    "accessibilityconfig": {
                        "a11yLabel": transaction.checkNumber2
                    }
                },
                "flxCheckImageIcon": {
                    "onClick": function() {
                        self.showCheckImage(transaction.frontImage1, transaction.backImage1, transaction.transactionDate, transaction.withdrawlAmount1, transaction.memo);
                    }
                },
                "flxCheckImage2Icon": {
                    "onClick": function() {
                        self.showCheckImage(transaction.frontImage2, transaction.backImage2, transaction.transactionDate, transaction.withdrawlAmount2, transaction.memo);
                    }
                },
                "lblBankName1": {
                    "text": transaction.bankName1,
                    "accessibilityconfig": {
                        "a11yLabel": transaction.bankName1
                    }
                },
                "lblBankName2": {
                    "text": transaction.bankName2,
                    "accessibilityconfig": {
                        "a11yLabel": transaction.bankName2
                    }
                },
                "lblWithdrawalAmountCheck1": {
                    "text": transaction.withdrawlAmount1 ? self.getDisplayCurrencyFormatWrapper(transaction, transaction.withdrawlAmount1, false) : "",
                    "accessibilityconfig": {
                        "a11yLabel": transaction.withdrawlAmount1 ? self.getDisplayCurrencyFormatWrapper(transaction, transaction.withdrawlAmount1, false) : "",
                        "a11yARIA ": {
                            tabIndex: transaction.withdrawlAmount1 ? 0 : -1
                        }
                    }
                },
                "lblWithdrawalAmountCheck2": {
                    "text": transaction.withdrawlAmount2 ? self.getDisplayCurrencyFormatWrapper(transaction, transaction.withdrawlAmount2, false) : "",
                    "accessibilityconfig": {
                        "a11yLabel": transaction.withdrawlAmount2 ? self.getDisplayCurrencyFormatWrapper(transaction, transaction.withdrawlAmount2, false) : "",
                        "a11yARIA ": {
                            tabIndex: transaction.withdrawlAmount2 ? 0 : -1
                        }
                    }
                },
                "lblWithdrawalAmountCash": {
                    "text": transaction.cashAmount ? self.getDisplayCurrencyFormatWrapper(transaction, transaction.cashAmount, false) : "",
                    "accessibilityconfig": {
                        "a11yLabel": transaction.cashAmount ? self.getDisplayCurrencyFormatWrapper(transaction, transaction.cashAmount, false) : "",
                        "a11yARIA ": {
                            tabIndex: transaction.cashAmount ? 0 : -1
                        }
                    }
                },
                "lblWithdrawalAmount": {
                    "text": transaction.totalCheckAmount ? self.getDisplayCurrencyFormatWrapper(transaction, transaction.totalCheckAmount, false) : "",
                    "accessibilityconfig": {
                        "a11yLabel": transaction.totalCheckAmount ? self.getDisplayCurrencyFormatWrapper(transaction, transaction.totalCheckAmount, false) : "",
                        "a11yARIA ": {
                            tabIndex: transaction.totalCheckAmount ? 0 : -1
                        }
                    }
                },
                "txtFieldMemo": {
                    "placeholder": kony.i18n.getLocalizedString('i18n.CheckImages.MemoOptional'),
                    "isVisible": true,
                    "text": transaction.memo ? transaction.memo : ""
                },
                "imgDropdown": {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                    "accessibilityconfig": {
                        "a11yLabel": "View Transaction Details"
                    }
                },
                "flxDropdown": "flxDropdown",
                "lblDate": {
                    "text": CommonUtilities.getFrontendDateString(transaction.transactionDate),
                    "accessibilityconfig": {
                        "a11yLabel": CommonUtilities.getFrontendDateString(transaction.transactionDate)
                    }
                },
                "lblDescription": {
                    "text": transaction.description || kony.i18n.getLocalizedString('i18n.common.none'),
                    "accessibilityconfig": {
                        "a11yLabel": transaction.description || kony.i18n.getLocalizedString('i18n.common.none')
                    }
                },
                "lblAmount": {
                    "text": self.getDisplayCurrencyFormatWrapper(transaction, transaction.amount, true),
                    "accessibilityconfig": {
                        "a11yLabel": self.getDisplayCurrencyFormatWrapper(transaction, transaction.amount, true)
                    }
                },
                "lblBalance": {
                    "isVisible": self.isPendingTransaction(transaction) ? false : true,
                    "text": transaction.fromAccountBalance ? self.getDisplayCurrencyFormatWrapper(transaction, transaction.fromAccountBalance, false) : kony.i18n.getLocalizedString('i18n.common.none'),
                    "accessibilityconfig": {
                        "a11yLabel": transaction.fromAccountBalance ? self.getDisplayCurrencyFormatWrapper(transaction, transaction.fromAccountBalance, false) : kony.i18n.getLocalizedString('i18n.common.none')
                    }
                },
                "template": this.transactionsTemplate
            };
        },
        getDisplayCurrencyFormatWrapper: function(transactionObj, amount, considerTransactionCurrency) {
            var self = this;
            if (considerTransactionCurrency) {
                if (transactionObj.transactionCurrency != undefined && transactionObj.transactionCurrency != "" && transactionObj.transactionCurrency != null) {
                    var amount = applicationManager.getConfigurationManager().getCurrency(transactionObj.transactionCurrency) + CommonUtilities.formatCurrencyWithCommas(amount, true);
                } else {
                    var amount = CommonUtilities.getDisplayCurrencyFormat(amount);
                }
            } else {
                var amount = CommonUtilities.getDisplayCurrencyFormat(amount);
            }
            if (amount) {
                if (amount.match(/-/)) {
                    amount = "-" + amount.replace(/-/, "");
                }
            }
            return amount;
        },
        /**
         * Method to get data map for wire transfer
         * @param {JSON} transaction transaction for which data is required
         * @param {String} transactionType transactionType for which data is required
         * @param {JSON} account Account for which data is required
         * @param {String} isTransactionTypeIconVisible check for isTransactionTypeIconVisible
         * @param {Object} transactionProperties transactionProperties like istransactionrepeatable etc
         * @returns {JSON} view Model for checks
         */
        getDataMapForWire: function(transaction, transactionType, account, isTransactionTypeIconVisible, transactionProperties) {
            var self = this;
            return {
                "lblNoteTitle": {
                    "text": kony.i18n.getLocalizedString('i18n.accounts.Note'),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.accounts.Note'),
                    }
                },
                "lblNoteValue": {
                    "text": (transaction.transactionsNotes) ? transaction.transactionsNotes : kony.i18n.getLocalizedString("i18n.common.none"),
                    "accessibilityconfig": {
                        "a11yLabel": (transaction.transactionsNotes) ? transaction.transactionsNotes : kony.i18n.getLocalizedString("i18n.common.none"),
                    }
                },
                "lblFrequencyTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.lblFrequency") + " :",
                    "isVisible": false
                },
                "lblTransactionFeeKey": {
                    "text": "Transaction Fee",
                    "isVisible": false,
                },
                "lblTransactionFeeValue": {
                    "text": "$5.00",
                    "isVisible": false,
                },
                "lblCurrencyAmountTitle": {
                    "text": "Currency" + " :",
                    "isVisible": false,
                },
                "lblCurrencyAmountValue": {
                    "text": "US Dollar($)",
                    "isVisible": false,
                },
                "lblFrequencyValue": {
                    "text": transaction.frequencyType || kony.i18n.getLocalizedString('i18n.transfers.frequency.once'),
                    "isVisible": false
                },
                "lblRecurrenceTitle": {
                    "text": kony.i18n.getLocalizedString('i18n.accounts.recurrence') + " :",
                    "isVisible": false
                },
                "lblDescription": transaction.description || kony.i18n.getLocalizedString('i18n.common.none'),
                "lblRecurrenceValue": {
                    "text": transaction.numberOfRecurrences,
                    "isVisible": false
                },
                "lblIdentifier": {
                    "text": ViewConstants.FONT_ICONS.LABEL_IDENTIFIER,
                    "accessibilityconfig": {
                        "a11yLabel": ViewConstants.FONT_ICONS.LABEL_IDENTIFIER,
                    }
                },
                "flxIdentifier": {
                    "height": "100dp"
                },
                "imgDropdown": {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                    "accessibilityconfig": {
                        "a11yLabel": "View Transaction Details"
                    }
                },
                "flxDropdown": "flxDropdown",
                "lblDate": {
                    "text": CommonUtilities.getFrontendDateString(transaction.transactionDate),
                    "accessibilityconfig": {
                        "a11yLabel": CommonUtilities.getFrontendDateString(transaction.transactionDate),
                    }
                },
                "lblType": {
                    "text": (applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) != null ? applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) : transactionType),
                    "isVisible": true,
                    "accessibilityconfig": {
                        "a11yLabel": (applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) != null ? applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) : transactionType),
                    }
                },
                "flxRememberCategory": {
                    "isVisible": false
                },
                "lblDisputedWarning": {
                    "text": self.getMappings("lblDisputedWarning", transaction, account, transactionProperties),
                    "accessibilityconfig": {
                        "a11yLabel": self.getMappings("lblDisputedWarning", transaction, account, transactionProperties),
                    }
                },
                "imgError": self.getMappings("imgError", transaction, account, transactionProperties),
                "imgWarning": self.getMappings("imgWarning", transaction, account, transactionProperties),
                "btnViewRequests": self.getMappings("btnViewRequests", transaction, account, transactionProperties),
                "lblCategory": " ",
                "imgCategoryDropdown": " ",
                "lblAmount": {
                    "text": self.getDisplayCurrencyFormatWrapper(transaction, transaction.amount, true),
                    "accessibilityconfig": {
                        "a11yLabel": self.getDisplayCurrencyFormatWrapper(transaction, transaction.amount, true),
                    }
                },
                "lblBalance": {
                    "isVisible": self.isPendingTransaction(transaction) ? false : true,
                    "text": transaction.fromAccountBalance ? CommonUtilities.formatCurrencyWithCommas(transaction.fromAccountBalance, false, account.currencyCode) : kony.i18n.getLocalizedString('i18n.common.none'),
                    "accessibilityconfig": {
                        "a11yLabel": transaction.fromAccountBalance ? CommonUtilities.formatCurrencyWithCommas(transaction.fromAccountBalance, false, account.currencyCode) : kony.i18n.getLocalizedString('i18n.common.none'),
                    }
                },
                "lblSeparator": "lblSeparator",
                "lblSeparator2": "lblSeparator2",
                "btnPrint": self.getMappings("btnPrint", transaction, account, transactionProperties),
                "btnDisputeTransaction": self.getMappings("btnDisputeTransaction", transaction, account, transactionProperties),
                "btnDownload": self.getMappings("btnDownload", transaction, account, transactionProperties),
                "btnRepeat": this.btnRepeatActions(transactionProperties, transaction),
                "lblSeparatorActions": "lblSeparatorActions",
                "lblTypeTitle": {
                    "text": this.getDataByType(account.accountType).typeText + " :",
                    "accessibilityconfig": {
                        "a11yLabel": this.getDataByType(account.accountType).typeText,
                    }
                },
                "lblToTitle": {
                    "text": this.getDataByType(account.accountType).ToText + " :",
                    "isVisible": true,
                    "accessibilityconfig": {
                        "a11yLabel": this.getDataByType(account.accountType).ToText
                    }
                },
                "lblSeparatorDetailHeader": "lblSeparatorDetailHeader",
                "lblTypeValue": {
                    "text": transactionType,
                    "accessibilityconfig": {
                        "a11yLabel": transactionType,
                    }
                },
                "lblToValue": {
                    "text": self.getMappings("nickName", transaction, account, transactionProperties),
                    "isVisible": true,
                    "accessibilityconfig": {
                        "a11yLabel": self.getMappings("nickName", transaction, account, transactionProperties)
                    }
                },
                "lblWithdrawalAmountTitle": {
                    "isVisible": false,
                },
                "lblWithdrawalAmountValue": {
                    "isVisible": false,
                },
                "lblSeparatorDetailData": "lblSeparatorDetailData",
                "template": this.transactionsTemplate
            }
        },
        /**
         * Method to get data map for common accounts like savings/checking etc
         * @param {JSON} transaction transaction for which data is required
         * @param {String} transactionType transactionType for which data is required
         * @param {JSON} account Account for which data is required
         * @param {String} isTransactionTypeIconVisible check for isTransactionTypeIconVisible
         * @param {Object} transactionProperties transactionProperties like istransactionrepeatable etc
         * @returns {JSON} view Model for checks
         */
        getDataMapForCommonAccounts: function(transaction, transactionType, account, isTransactionTypeIconVisible, transactionProperties) {
            var self = this;
            var numberOfRecurrences;
            var description = "";
            var external = false;
            var accountHolderFullName = function(accountHolder) {
                try {
                    var accountHolder = JSON.parse(accountHolder);
                    return accountHolder.fullname;
                } catch (exception) {
                    return accountHolder;
                }
            };
            if (transactionType === "SwiftPayment") {
                external = true;
            }
            if (transaction.numberOfRecurrences === undefined || transaction.numberOfRecurrences === null || transaction.numberOfRecurrences === "0") {
                numberOfRecurrences = kony.i18n.getLocalizedString('i18n.common.none');
            } else {
                numberOfRecurrences = transaction.numberOfRecurrences;
            }
            if (!kony.sdk.isNullOrUndefined(transaction.transactionType)) description = description + transaction.transactionType + " | ";
            if (!kony.sdk.isNullOrUndefined(transaction.transactionDate)) description = description + "TransactionDate " + CommonUtilities.getMonthFormattedDate(transaction.transactionDate) + " | ";
            if (!kony.sdk.isNullOrUndefined(account.accountHolder)) description = description + accountHolderFullName(account.accountHolder) + " | ";
            if (!kony.sdk.isNullOrUndefined(transaction.fromAccountName)) description = description + "From " + transaction.fromAccountName;
            if (!kony.sdk.isNullOrUndefined(transaction.fromAccountNumber)) description = description + " " + transaction.fromAccountNumber.slice(-4) + " | ";
            if (!kony.sdk.isNullOrUndefined(transaction.amount)) description = description + "Amount " + this.getDisplayCurrencyFormatWrapper(transaction, transaction.amount, true) + " | ";
            if (!kony.sdk.isNullOrUndefined(transaction.transactionId)) description = description + "Reference Number: " + transaction.transactionId;
            return {
                "lblNoteTitle": {
                    "text": kony.i18n.getLocalizedString('i18n.accounts.Note') + " :",
                    "isVisible": transactionProperties.isFeesOrInterestTransaction ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.accounts.Note'),
                        "a11yARIA ": {
                            tabIndex: transactionProperties.isFeesOrInterestTransaction ? -1 : 0
                        }
                    }
                },
                "lblNoteValue": {
                    "text": (transaction.transactionsNotes) ? transaction.transactionsNotes : kony.i18n.getLocalizedString("i18n.common.none"),
                    "isVisible": transactionProperties.isFeesOrInterestTransaction ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": (transaction.transactionsNotes) ? transaction.transactionsNotes : kony.i18n.getLocalizedString("i18n.common.none"),
                        "a11yARIA ": {
                            tabIndex: transactionProperties.isFeesOrInterestTransaction ? -1 : 0
                        }
                    }
                },
                "lblTransactionFeeKey": {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.TransactionFee"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.TransfersEur.TransactionFee"),
                    }
                },
                "lblTransactionFeeValue": {
                    "text": (transaction.fee != undefined && transaction.fee != null && transaction.fee != "") == true ? CommonUtilities.formatCurrencyWithCommas(transaction.fee) : "",
                    "accessibilityconfig": {
                        "a11yLabel": (transaction.fee != undefined && transaction.fee != null && transaction.fee != "") == true ? CommonUtilities.formatCurrencyWithCommas(transaction.fee) : "",
                        "a11yARIA ": {
                            tabIndex: (transaction.fee != undefined && transaction.fee != null && transaction.fee != "") == true ? 0 : -1
                        }
                    }
                },
                "lblCurrencyAmountTitle": {
                    "text": transaction.transactionCurrency ? kony.i18n.getLocalizedString("i18n.common.Currency") + " :" : "",
                    "accessibilityconfig": {
                        "a11yLabel": transaction.transactionCurrency ? kony.i18n.getLocalizedString("i18n.common.Currency") : "",
                        "a11yARIA ": {
                            tabIndex: transaction.transactionCurrency ? 0 : -1
                        }
                    }
                },
                "lblCurrencyAmountValue": {
                    "text": transaction.transactionCurrency ? transaction.transactionCurrency : "",
                    "accessibilityconfig": {
                        "a11yLabel": transaction.transactionCurrency ? transaction.transactionCurrency : "",
                        "a11yARIA ": {
                            tabIndex: transaction.transactionCurrency ? 0 : -1
                        }
                    }
                },
                "lblFrequencyTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.ProfileManagement.Type") + " :",
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.Type"),
                        "a11yARIA ": {
                            tabIndex: transactionProperties.isFeesOrInterestTransaction ? -1 : 0
                        }
                    }
                },
                "lblFrequencyValue": {
                    "text": transaction.transactionType,
                    "accessibilityconfig": {
                        "a11yLabel": transaction.transactionType,
                        "a11yARIA ": {
                            tabIndex: transactionProperties.isFeesOrInterestTransaction ? -1 : 0
                        }
                    }
                },
                "lblRecurrenceTitle": {
                    "text": kony.i18n.getLocalizedString('i18n.AccountsDetails.Balance') + " :",
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.AccountsDetails.Balance'),
                        "a11yARIA ": {
                            tabIndex: transactionProperties.isFeesOrInterestTransaction ? -1 : 0
                        }
                    }
                },
                "lblDescription": {
                    "text": transaction.description || kony.i18n.getLocalizedString('i18n.common.none'),
                    "accessibilityconfig": {
                        "a11yLabel": transaction.description || kony.i18n.getLocalizedString('i18n.common.none')
                    }
                },
                "lblRecurrenceValue": {
                    "text": transaction.fromAccountBalance ? CommonUtilities.formatCurrencyWithCommas(transaction.fromAccountBalance, false, account.currencyCode) : kony.i18n.getLocalizedString('i18n.common.none'),
                    "accessibilityconfig": {
                        "a11yLabel": transaction.fromAccountBalance ? CommonUtilities.formatCurrencyWithCommas(transaction.fromAccountBalance, false, account.currencyCode) : kony.i18n.getLocalizedString('i18n.common.none'),
                        "a11yARIA ": {
                            tabIndex: transactionProperties.isFeesOrInterestTransaction ? -1 : 0
                        }
                    }
                },
                "lblIdentifier": {
                    "text": ViewConstants.FONT_ICONS.LABEL_IDENTIFIER,
                    "accessibilityconfig": {
                        "a11yLabel": ViewConstants.FONT_ICONS.LABEL_IDENTIFIER
                    }
                },
                "flxIdentifier": {
                    "height": "100dp"
                },
                "imgDropdown": {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                    "accessibilityconfig": {
                        "a11yLabel": "View Transaction Details"
                    }
                },
                "flxDropdown": "flxDropdown",
                "lblDate": {
                    "text": CommonUtilities.getFrontendDateString(transaction.transactionDate),
                    "accessibilityconfig": {
                        "a11yLabel": CommonUtilities.getFrontendDateString(transaction.transactionDate),
                    }
                },
                "lblType": {
                    "text": (applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) != null ? applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) : transactionType),
                    "isVisible": isTransactionTypeIconVisible(),
                    "accessibilityconfig": {
                        "a11yLabel": (applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) != null ? applicationManager.getTypeManager().getTransactionTypeDisplayValue(transactionType) : transactionType),
                        "a11yARIA ": {
                            tabIndex: isTransactionTypeIconVisible ? 0 : -1
                        }
                    }
                },
                "flxRememberCategory": {
                    "isVisible": this.getDataByType(account.accountType).rememberFlag
                },
                "imgRememberCategory": {
                    "src": ViewConstants.IMAGES.UNCHECKED_IMAGE,
                    "isVisible": this.getDataByType(account.accountType).rememberFlag
                },
                "lblRememberCategory": {
                    "text": kony.i18n.getLocalizedString('i18n.accounts.rememberCategory'),
                    "isVisible": this.getDataByType(account.accountType).rememberFlag,
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.accounts.rememberCategory'),
                        "a11yARIA ": {
                            tabIndex: this.getDataByType(account.accountType).rememberFlag ? 0 : -1
                        }
                    }
                },
                "lblCategory": " ",
                "imgCategoryDropdown": " ",
                "lblAmount": {
                    "text": self.getDisplayCurrencyFormatWrapper(transaction, transaction.amount, true),
                    "accessibilityconfig": {
                        "a11yLabel": self.getDisplayCurrencyFormatWrapper(transaction, transaction.amount, true),
                    }
                },
                "lblBalance": {
                    "isVisible": self.isPendingTransaction(transaction) ? false : true,
                    "text": transaction.fromAccountBalance ? CommonUtilities.formatCurrencyWithCommas(transaction.fromAccountBalance, false, account.currencyCode) : kony.i18n.getLocalizedString('i18n.common.none'),
                    "accessibilityconfig": {
                        "a11yLabel": transaction.fromAccountBalance ? CommonUtilities.formatCurrencyWithCommas(transaction.fromAccountBalance, false, account.currencyCode) : kony.i18n.getLocalizedString('i18n.common.none'),
                    }
                },
                "lblSeparator": "lblSeparator",
                "lblSeparator2": "lblSeparator2",
                "btnPrint": self.getMappings("btnPrint", transaction, account, transactionProperties),
                "btnEditRule": {
                    "text": this.getDataByType(account.accountType).editText,
                    "accessibilityconfig": {
                        "a11yLabel": this.getDataByType(account.accountType).editText,
                    }
                },
                "btnDisputeTransaction": self.getMappings("btnDisputeTransaction", transaction, account, transactionProperties),
                "btnDownload": self.getMappings("btnDownload", transaction, account, transactionProperties),
                "btnViewRequests": self.getMappings("btnViewRequests", transaction, account, transactionProperties),
                "imgError": self.getMappings("imgError", transaction, account, transactionProperties),
                "imgWarning": self.getMappings("imgWarning", transaction, account, transactionProperties),
                "lblDisputedWarning": {
                    "text": self.getMappings("lblDisputedWarning", transaction, account, transactionProperties),
                    "accessibilityconfig": {
                        "a11yLabel": self.getMappings("lblDisputedWarning", transaction, account, transactionProperties),
                    }
                },
                "btnRepeat": this.btnRepeatActions(transactionProperties, transaction),
                "lblfrmAccountNumber": {
                    "text": transaction.fromAcc,
                    "accessibilityconfig": {
                        "a11yLabel": transaction.fromAcc
                    }
                },
                "lblSeparatorActions": "lblSeparatorActions",
                "lblTypeTitle": {
                    "text": kony.i18n.getLocalizedString('i18n.accounts.posted') + " :",
                    "isVisible": true,
                    //"isVisible": transactionProperties.isPostedDateAvailable,
                    "accessibilityconfig": {
                        "a11yLabel": this.getDataByType(account.accountType).typeText
                    }
                },
                "lblToTitle": {
                    "text": kony.i18n.getLocalizedString('i18n.konybb.common.ReferenceNumber') + " :",
                    "accessibilityconfig": {
                        "a11yLabel": this.getDataByType(account.accountType).ToText,
                        "a11yARIA ": {
                            tabIndex: transactionProperties.isFeesOrInterestTransaction ? -1 : 0
                        }
                    }
                },
                "fromAccountName": transaction.fromAccountName,
                "lblWithdrawalAmountTitle": {
                    "text": kony.i18n.getLocalizedString('i18n.StopPayments.Checkno') + " :",
                    "isVisible": transactionProperties.isCheckNumberAvailable,
                    "accessibilityconfig": {
                        "a11yLabel": this.transactionTypeLabelName(transaction),
                        "a11yARIA ": {
                            tabIndex: this.getDataByType(account.accountType).withdrawFlag ? 0 : -1
                        }
                    }
                },
                "lblSeparatorDetailHeader": "lblSeparatorDetailHeader",
                "lblTypeValue": {
                    "text": CommonUtilities.getFrontendDateString(transaction.transactionDate),
                    "isVisible": true,
                    //"isVisible": transactionProperties.isPostedDateAvailable,
                    "accessibilityconfig": {
                        "a11yLabel": transactionType
                    }
                },
                "lblToValue": {
                    "text": transaction.transactionId,
                    "isVisible": (external) ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": self.getMappings("nickName", transaction, account, transactionProperties),
                        "a11yARIA ": {
                            tabIndex: transactionProperties.isFeesOrInterestTransaction ? -1 : 0
                        }
                    }
                },
                "lblExternalToValue": {
                    "text": transaction.transactionId,
                    "isVisible": (external) ? true : false,
                    "onTouchEnd": function() {
                        externalImage = "", externalDownload = "";
                        var userManager = applicationManager.getUserPreferencesManager();
                        var customerId = userManager.getBackendIdentifier();
                        var params = {
                            "customerId": customerId,
                            "accountId": account.accountID,
                            "transactionRef": transaction.transactionId,
                            "mediaType": "png",
                            "transactionType": transaction.transactionType,
                            "page": "0"
                        }
                        self.loadAccountModule().presentationController.externalView(params);
                        params.mediaType = "pdf";
                        self.loadAccountModule().presentationController.externalDownload(params);
                        self.downloadExternalTransfer(transaction, account);
                    },
                    "accessibilityconfig": {
                        "a11yLabel": self.getMappings("nickName", transaction, account, transactionProperties),
                        "a11yARIA ": {
                            tabIndex: transactionProperties.isFeesOrInterestTransaction ? -1 : 0
                        }
                    }
                },
                "lblExternalAccountNumber": {
                    "text": transaction.externalAccountNumber,
                    "accessibilityconfig": {
                        "a11yLabel": transaction.externalAccountNumber
                    }
                },
                "lblSeparatorDetailData": "lblSeparatorDetailData",
                "txtMemo": (!transaction.transactionsNotes) ? transaction.transactionsNotes : kony.i18n.getLocalizedString("i18n.common.none"),
                "toAcc": transaction.toAcc,
                "externalAcc": transaction.externalAccountNumber,
                "template": this.transactionsTemplate
            };
        },
        downloadExternalTransfer: function(transaction, account) {
            var self = this;
            if (this.externalImage !== "No records were found that matched the selection criteria") {
                this.view.CustomPopup.lblPopupMessage.text = "Do you want to download " + transaction.transactionId + " ?";
                var userManager = applicationManager.getUserPreferencesManager();
                var customerId = userManager.getBackendIdentifier();
                var params = {
                    "customerId": customerId,
                    "accountId": account.accountID,
                    "transactionRef": transaction.transactionId,
                    "mediaType": "pdf",
                    "transactionType": transaction.transactionType,
                    "page": "0"
                };
                this.view.CustomPopup.btnYes.onClick = function() {
                    self.downloadUrl(self.externalDownload);
                    self.view.flxLogout.setVisibility(false);
                };
                this.view.CustomPopup.btnNo.onClick = function() {
                    self.view.flxLogout.setVisibility(false);
                };
            } else {
                var self = this;
                this.view.CustomPopup.lblPopupMessage.text = "File not available";
                this.view.CustomPopup.btnYes.isVisibile = false;
                this.view.CustomPopup.btnNo.isVisibile = false;
                this.view.CustomPopup.forceLayout();
            }
            this.view.flxLogout.left = "0" + ViewConstants.POSITIONAL_VALUES.PERCENTAGE;
            this.view.flxLogout.height = this.getPageHeight();
            this.view.flxLogout.setVisibility(true);
            this.view.CustomPopup.lblHeading.setFocus(true);
            this.view.CustomPopup.lblHeading.text = "Download Transaction";
            this.view.CustomPopup.forceLayout();
            this.view.CustomPopup.lblcross.onTouchEnd = function() {
                self.view.flxLogout.setVisibility(false);
            };
        },
        getPageHeight: function() {
            var height = this.view.flxHeader.info.frame.height + this.view.flxMainWrapper.info.frame.height + this.view.flxFooter.info.frame.height + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT;
            return height + ViewConstants.POSITIONAL_VALUES.DP;
        },
        /**
         * Method to Label Name based on Transaction Type
         * @param {object} transaction transaction for which data is required
         * @returns {string} Label Name
         */
        transactionTypeLabelName: function(transaction) {
            if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.DEPOSIT)) {
                return kony.i18n.getLocalizedString('i18n.common.depositedAmount');
            } else if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.CREDIT)) {
                return kony.i18n.getLocalizedString('i18n.common.creditedAmount');
            } else if (transaction.transactionCurrency) {
                if (applicationManager.getConfigurationManager().getBaseCurrency() === transaction.transactionCurrency) {
                    return kony.i18n.getLocalizedString('i18n.accounts.withdrawalAmount');
                } else {
                    return kony.i18n.getLocalizedString('i18n.common.convertedAmount');
                }
            }
            return kony.i18n.getLocalizedString('i18n.accounts.withdrawalAmount');
        },
        /**
         * Method to create segment model for the transactions
         * @param {Object} dataInputs data inputs like account, transactiontype etc
         * @param {JSON} transaction Current transaction
         * @returns {JSON} dataMap for the segment
         */
        createTransactionSegmentModel: function(dataInputs, transaction) {
            var dataMap;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var account = dataInputs.account;
            var transactionType = transaction.transactionType; //[Checking, Saving, Loan] etc
            var requestedTransactionType = dataInputs.transactionType; // [All, Deposit, Loan] etc
            var isTransactionTypeIconVisible = function() {
                return requestedTransactionType === OLBConstants.ALL && (account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING) || account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING) || account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN));
            }
            var isRepeatSupportAccount = (account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING) || account.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING));
            var isRepeatableTransaction = (transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.INTERNALTRANSFER) || transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.EXTERNALTRANSFER) || transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.BILLPAY) || transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.P2P)) || (transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.WIRE) && !(transaction.isPayeeDeleted === "true"));
            var isTransactionDisputed = (transaction.isDisputed === true || transaction.isDisputed === "true"); //MF has issue with so we are checking both boolean and string values.
            var isFeesOrInterestTransaction = (transactionType == OLBConstants.TRANSACTION_TYPE.TAX || transactionType == OLBConstants.TRANSACTION_TYPE.POS || transactionType == OLBConstants.TRANSACTION_TYPE.INTERNETTRANSACTION || transactionType == OLBConstants.TRANSACTION_TYPE.CARDPAYMENT || transactionType == OLBConstants.TRANSACTION_TYPE.FEE || transactionType == OLBConstants.TRANSACTION_TYPE.CREDIT || transactionType == OLBConstants.TRANSACTION_TYPE.FEES || transactionType === OLBConstants.TRANSACTION_TYPE.INTERESTCREDIT || transactionType === OLBConstants.TRANSACTION_TYPE.INTERESTDEBIT);
            var transactionProperties = {
                transactionType: transactionType,
                requestedTransactionType: requestedTransactionType,
                isTransactionTypeIconVisible: isTransactionTypeIconVisible,
                isRepeatSupportAccount: isRepeatSupportAccount,
                isRepeatableTransaction: isRepeatableTransaction,
                isTransactionDisputed: isTransactionDisputed,
                isFeesOrInterestTransaction: isFeesOrInterestTransaction,
                isPostedDateAvailable: transaction.postedDate ? true : false,
                isCheckNumberAvailable: (transaction.checkNumber && transaction.checkNumber > 0) ? true : false
            }
            if (isTransactionTypeIconVisible()) {
                this.view.transactions.flxSortType.setVisibility(true);
            } else {
                this.view.transactions.flxSortType.setVisibility(false);
            }
            if (transactionType === "Checks" || transactionType === "CheckWithdrawal" || transactionType === "CheckDeposit" || transactionType === "Draft" || transactionType === "Cheque") {
                dataMap = this.getDataMapForChecks(transaction, transactionType, account, isTransactionTypeIconVisible, transactionProperties);
            } else
            if (transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.WIRE)) {
                dataMap = this.getDataMapForWire(transaction, transactionType, account, isTransactionTypeIconVisible, transactionProperties);
            } else {
                dataMap = this.getDataMapForCommonAccounts(transaction, transactionType, account, isTransactionTypeIconVisible, transactionProperties);
            }
            dataMap.flxDropdown = {
                "onClick": this.onClickToggle
            };
            var breakpoint = kony.application.getCurrentBreakpoint();
            if (breakpoint === 640) {
                dataMap.flxAmount = {
                    right: "15dp"
                };
            } else {
                var amtLeft = "75%";
                var typeLeft = "60.3%";
                if (breakpoint === 1024) {
                    amtLeft = "64%";
                    typeLeft = "55.3%";
                }
                dataMap.flxAmount = {
                    left: amtLeft
                };
                dataMap.flxType = {
                    left: typeLeft
                };
                dataMap.flxWithdrawalAmountHeader = {
                    left: "38%"
                };
            }
            return dataMap;
        },
        /**
         * Method to handle adjust ui for transactions
         * @param {Boolean} isPresent true/false
         */
        adjustUIForTransactions: function(isPresent) {
            if (isPresent) {
                this.view.transactions.flxNoTransactions.isVisible = false;
                this.view.transactions.flxSeparatorNoResults.isVisible = true;
                this.view.transactions.flxSort.isVisible = true;
                if (kony.application.getCurrentBreakpoint() !== 640) {
                    this.view.transactions.segTransactions.top = "0dp";
                } else this.view.transactions.segTransactions.top = "40dp";
            } else {
                this.view.transactions.flxNoTransactions.isVisible = true;
                this.view.transactions.flxSeparatorNoResults.isVisible = false;
                this.view.transactions.segTransactions.top = "40dp";
                this.view.transactions.flxSort.isVisible = false;
                this.view.transactions.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.accounts.noTransactionFound");
            }
        },
      	
      	enableDisableDownload(enabled){
          	if(enabled === true) {
              this.view.flxDownload.setEnabled(true);
              this.view.flxPrint.setEnabled(true);
              this.view.imgDownloadIcon.skin = "sknOlbFonts0273e3";
              this.view.imgPrintIcon.skin = "sknOlbFonts0273e3";
            } else{
              this.view.flxDownload.setEnabled(false);
              this.view.flxPrint.setEnabled(false);
              this.view.imgDownloadIcon.skin = "sknOlbFontsa0a0a0";
              this.view.imgPrintIcon.skin = "sknOlbFontsa0a0a0";
            }
        },
      
      	updateLoanTransactions: function(transactionDetails) {
            var scope = this;
            var transactions = [];
          	var secOverdue = [];
          	var secPaid = [];
            var formatUtil = applicationManager.getFormatUtilManager();
            this.view.flxSearch.setVisibility(false);
            this.enableDisableDownload(true);
            this.view.PaginationContainer.setVisibility(true);
            this.view.flxPaginationContainer.setVisibility(true);
            this.view.segTransactionList.setVisibility(true);
            this.view.flxNoTransactions.setVisibility(false);
            this.view.segTransactionList.setData([]);
            this.view.flxSortOptions.setVisibility(false);
            this.view.flxBlockedSortOptions.setVisibility(false);
            this.view.flxLoanSortOptions.setVisibility(true);
            this.view.lblPrincipal.text = kony.i18n.getLocalizedString("i18n.accounts.principal");
            this.view.lblInterest.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.INTEREST");
          	this.view.lblInfoText.text = kony.i18n.getLocalizedString("i18n.accounts.showingLoanSchedules");
            if (transactionDetails.loanTransactions !== undefined) {
                var loanList = transactionDetails.loanTransactions;
            } else {
                var loanList = transactionDetails
            }
            if (loanList && loanList.length > 0) {
                transactions = loanList;
                this.cacheUtils.setData(transactions);
                var dataMap = {
                    "flxRowGroup": "flxRowGroup",
                    "flxCollapsedView": "flxCollapsedView",
                    "flxCheveron": "flxCheveron",
                    "lblCheveron": "lblCheveron",
                    "flxCollapsedContent": "flxCollapsedContent",
                    "flxSep": "flxSep",
                    "flxExpandedView": "flxExpandedView",
                    "lblStrip": "lblStrip",
                    "lbl1": "lbl1",
                    "lbl2": "lbl2",
                    "lbl3": "lbl3",
                    "lbl4": "lbl4",
                  	"flxSeparator": "flxSeparator",
					"lblCharges": "lblCharges",
					"lblChargesValue": "lblChargesValue",
					"lblTax": "lblTax",
					"lblTaxValue": "lblTaxValue",
					"lblInsurance": "lblInsurance",
					"lblInsuranceValue": "lblInsuranceValue",
					"lblActions": "lblActions",
					"lblDisupute": "lblDisupute",
					"flx1" : "flx1",
					"flx2" : "flx2",
					"flx3" : "flx3",
					"flx4" : "flx4",
                  	"flx5" : "flx5",
                  	"flx6" : "flx6",
                  	"lblPrincipal" : "lblPrincipal",
                  	"lblInterest" : "lblInterest",
                  	"flxLoanNameHeader": "flxLoanNameHeader",
					"lblAccountName2" : "lblAccountName2",
                  	"flxBottomSeparator": "flxBottomSeparator",
                    "flxSeparator3": "flxSeparator3"
                }
                this.view.segTransactionList.widgetDataMap = dataMap;
                this.view.segTransactionList.sectionHeaderTemplate = "flxLoanNameHeader";
              	if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                  this.view.segTransactionList.rowTemplate = "flxLoanScheduleTransactionMobile";
                  var data = transactions.map(function(res) {
                        return {
                            "lbl1": {
                                "text": formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.paymentDate))
                            },
                            "lbl2": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.amount, res.transactionCurrency)
                            },
                            "lbl3": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.principal, res.transactionCurrency)
                            },
                            "lbl4": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.interest, res.transactionCurrency)
                            },
                            "lblChargesValue": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.charges, res.transactionCurrency)
                            },
                            "lblTaxValue": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.tax, res.transactionCurrency)
                            },
                            "lblCheveron": {
                                  "text": "O"
                            },
                            "flxSeparator": {
                                "isVisible": true
                            },
                            "flxSep": {
                                "isVisible": false
                            },
                            "flxExpandedView": {
                                "isVisible": false
                            },
                            "lblStrip": {
                                "isVisible": false
                            },
                            "flxBottomSeparator": {
                                "isVisible": false
                            },
                            "flxCheveron": {
                                "onClick": scope.onToggleLoanTrans.bind(scope)
                            },
                          	"lblDisupute": {
                              "onTouchEnd": function(context) {
                                  scope.btnPayOverdueOnClick(res);
                              }.bind(this)
							},
                          	"installmentType": res.installmentType
                        }
                	});
                } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                  this.view.segTransactionList.rowTemplate = "flxLoanScheduleTransactionTablet";
                  var data = transactions.map(function(res) {
                        return {
                            "lbl1": {
                                "text": formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.paymentDate))
                            },
                            "lbl2": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.amount, res.transactionCurrency)
                            },
                            "lbl3": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.principal, res.transactionCurrency)
                            },
                            "lbl4": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.interest, res.transactionCurrency)
                            },
                            "lblChargesValue": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.charges, res.transactionCurrency)
                            },
                            "lblTaxValue": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.tax, res.transactionCurrency)
                            },
                            "lblCheveron": {
                                  "text": "O"
                            },
                            "flxSeparator": {
                                "isVisible": true
                            },
                            "flxSep": {
                                "isVisible": false
                            },
                            "flxExpandedView": {
                                "isVisible": false
                            },
                            "lblStrip": {
                                "isVisible": false
                            },
                            "flxBottomSeparator": {
                                "isVisible": false
                            },
                            "flxCheveron": {
                                "onClick": scope.onToggleLoanTrans.bind(scope)
                            },
                          	"lblDisupute": {
                              "onTouchEnd": function(context) {
                                  scope.btnPayOverdueOnClick(res);
                              }.bind(this)
							},
                          	"installmentType": res.installmentType
                        }
                	});
                } else{
                  this.view.segTransactionList.rowTemplate = "flxLoanScheduleTransactionTemplate";
                  var data = transactions.map(function(res) {
                        return {
                            "lbl1": {
                                "text": formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.paymentDate)),
                                "width":"180px"
                            },
                            "lbl2": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.amount, res.transactionCurrency),
                                "width":"190px"
                            },
                            "lbl3": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.principal, res.transactionCurrency),
                                "width":"300px"
                            },
                            "lbl4": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.interest, res.transactionCurrency),
                                "width":"290px"
                            },
                            "lblChargesValue": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.charges, res.transactionCurrency)
                            },
                            "lblTaxValue": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.tax, res.transactionCurrency)
                            },
                            "lblCheveron": {
                                  "text": "O"
                            },
                            "flxSeparator": {
                                "isVisible": true
                            },
                            "flxSep": {
                                "isVisible": false
                            },
                            "flxExpandedView": {
                                "isVisible": false
                            },
                            "lblStrip": {
                                "isVisible": false
                            },
                            "flxBottomSeparator": {
                                "isVisible": false
                            },
                            "flxCheveron": {
                                "onClick": scope.onToggleLoanTrans.bind(scope)
                            },
                          	"lblDisupute": {
                              "onTouchEnd": function(context) {
                                  scope.btnPayOverdueOnClick(res);
                              }.bind(this)
							},
                          	"installmentType": res.installmentType
                        }
                	});
                }
				this.setPagination({
                    'show': true,
                    'offset': this.offset
                }, transactions);
				data = data.slice(this.offset, this.lastRecord)
                for (var i = 0; i < data.length; i++) {
                    if ("DUE" === data[i].installmentType) {
                        secOverdue.push(data[i]);
                    } else {
                        secPaid.push(data[i]);
                    }
                }
              	if(secOverdue.length === 0){
                  var sectionData = [
                    [
                      {"lblAccountName2":{
                         "text": kony.i18n.getLocalizedString("i18n.AccountSummary.paidInstallments"),
                         "skin": "ICSknlbl424242SSP15pxSemibold"
                      },
                      "flxSeparator3": {
                                "isVisible": false
                            },
                            "flxLoanNameHeader":{
                                "bottom":"50dp"
                      }
                      },secPaid
                    ]
                  ]
                } else if(secPaid.length === 0){
                  var sectionData = [
                    [
                      {"lblAccountName2":{
                         "text": kony.i18n.getLocalizedString("i18n.AccountSummary.overdueInstallments"),
                         "skin": "ICSknlbl424242SSP15pxSemibold"
                      },
                      "flxSeparator3": {
                                "isVisible": false
                      }},secOverdue
                    ]
                  ]
                } else{
                  var sectionData = [
                    [
                      {"lblAccountName2":{
                         "text": kony.i18n.getLocalizedString("i18n.AccountSummary.overdueInstallments"),
                         "skin": "ICSknlbl424242SSP15pxSemibold"
                      },
                      "flxSeparator3": {
                                "isVisible": false
                      }},secOverdue
                    ],
                    [
                      {"lblAccountName2":{
                        "text": kony.i18n.getLocalizedString("i18n.AccountSummary.paidInstallments"),
                        "skin": "ICSknlbl424242SSP15pxSemibold"
                      },
                      "flxSeparator3": {
                                "isVisible": false
                            },
                            "flxLoanNameHeader":{
                                "bottom":"50dp"
                            }
                        }, secPaid]
                  ];
                }
             this.view.segTransactionList.setData(sectionData);
                FormControllerUtility.hideProgressBar(this.view);
                this.AdjustScreen();
            }else{
              this.enableDisableDownload(false);
              this.view.segTransactionList.setVisibility(false);
              this.view.flxNoTransactions.setVisibility(true);
              this.view.PaginationContainer.setVisibility(false);
              this.view.flxPaginationContainer.setVisibility(false);
              this.view.flxLoanSortOptions.setVisibility(false);
              FormControllerUtility.hideProgressBar(this.view);
              this.AdjustScreen();
            }
        },
        /**
         * Method to update transaction segment
         * @param {JSON} transactionDetails transactionDetails like transactions, transactiontype, accounts etc
         */
        updateTransactions: function(transactionDetails) {
            var scope = this;
            var transactions = []; 
          	var formatUtil = applicationManager.getFormatUtilManager();
          	this.highlightType();
          	this.view.flxSearch.setVisibility(true);
          	this.enableDisableDownload(true);
          	this.view.flxSortOptions.setVisibility(true);
          	this.view.flxBlockedSortOptions.setVisibility(false);
          	this.view.flxLoanSortOptions.setVisibility(false);
          	this.view.lblInfoText.text = kony.i18n.getLocalizedString("i18n.accounts.showingLatestTransactions");
          	this.view.PaginationContainer.setVisibility(true);
          	this.view.flxPaginationContainer.setVisibility(true);
            this.view.segTransactionList.setVisibility(true);
            this.view.flxNoTransactions.setVisibility(false);
			this.view.flxNoTransactions.top = "10dp";
          	this.view.segTransactionList.setData([]);
          	if (this.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN) || this.accountType === "mortgageFacility"){
              this.view.flxTabsLoan.isVisible = true;
              this.view.flxTabsWrapper.isVisible = false;
            }else{
              this.view.flxTabsWrapper.isVisible = true;
          	  this.view.flxTabsLoan.isVisible = false;
            }
            if(transactionDetails.transactions !== undefined){
				var TranList = transactionDetails.transactions;
			} else {
				var TranList = transactionDetails
			}		
            if (this.selectedTab === "Pending") {
                for (var index = 0; index < TranList.length; index++) {
                    if (TranList[index].statusDescription === "Pending") {
                        transactions.push(TranList[index]);
                    }
                }
            } else if (this.selectedTab === "Posted") {
                for (var index = 0; index < TranList.length; index++) {
                    if (TranList[index].statusDescription === "Successful") {
                        transactions.push(TranList[index]);
                    }
                }
            } else {
                transactions = TranList;
            }
            if(this.performTransactionSearch){
                this.view.lblInfoText.text = "Matched Transactions for advanced search criteria";
            }
          	this.cacheUtils.setData(transactions);
			this.transactionList = transactions;
            var dataMap = {
                "flxRowGroup": "flxRowGroup",
                "flxCollapsedView": "flxCollapsedView",
                "flxCheveron": "flxCheveron",
                "lblCheveron": "lblCheveron",
                "flxCollapsedContent": "flxCollapsedContent",
                "flxDispute": "flxDispute",
                "flxDownload": "flxDownload",
				"flxAttachments": "flxAttachments",
                "flxSep": "flxSep",
                "flxExpandedView": "flxExpandedView",
                "lblRefNumber": "lblRefNumber",
                "lblTransDate": "lblTransDate",
                "lblStrip": "lblStrip",
                "lblDisupute": "lblDisupute",
                "lblDownload": "lblDownload",
                "lblBalancevalue": "lblBalancevalue",
                "lblTypeValue": "lblTypeValue",
                "lblDescValue": "lblDescValue",
                "lbl1": "lbl1",
                "lbl2": "lbl2",
                "lbl3": "lbl3",
                "lbl4": "lbl4",
                "lbl5": "lbl5",
              	"flxSeparator": "flxSeparator",
              	"flxBottomSeparator": "flxBottomSeparator",
                "lblTransaction": "lblTransaction"
            }
            this.view.segTransactionList.widgetDataMap = dataMap;
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
              	this.view.lbldate.left = "28%";
              	this.view.flxSearch.left = "5.5%";
              	this.view.imgAmountSort.left = "147dp";
              	this.view.lblAmount.left = "85dp";
                this.view.segTransactionList.rowTemplate = "flx5ColumnTemplateChangeMobile";
                var data = transactions.map(function(res) {
                    return {
                        "lbl1": {
                            "text": formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.transactionDate))
                        },
                        "lbl2": {
                            "text": formatUtil.formatAmountandAppendCurrencySymbol(res.amount, res.transactionCurrency?res.transactionCurrency:scope.accountCurrency)
                        },
                        "lblBalancevalue": {
                            "text": formatUtil.formatAmountandAppendCurrencySymbol(res.fromAccountBalance, res.transactionCurrency?res.transactionCurrency:scope.accountCurrency)
                        },
                        "lblTypeValue": {
                            "text": res.transactionType
                        },
                        "lblDescValue": {
                            "text": res.description
                        },
                        "lblTransDate": {
                            "text": formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.valueDateTime))
                        },
                        "lblRefNumber": {
                            "text": res.transactionId
                        },
                        "lblCheveron": {
                            "text": 'O'
                        },
                        "flxSeparator": {
                            "isVisible": true
                        },
                        "flxSep": {
                            "isVisible": false
                        },
                        "flxExpandedView": {
                            "isVisible": false
                        },
                        "lblStrip": {
                            "isVisible": false
                        },
                        "flxBottomSeparator": {
                            "isVisible": false
                        },
						"data": res,
						"flxDownload": {
                            "accessibilityConfig": {
                                "a11yLabel": "Download details of transaction with reference number" + res.Id,
                                "a11yARIA": {
                                    "role": "button"
                                }
                            },
                            "onClick": function(context) {
                                scope.btnDownloadOnClick(res);
                            }.bind(this)
                        },
                        "flxDispute": {
                            "accessibilityConfig": {
                                "a11yLabel": "Dispute transaction with reference number" + res.Id,
                                "a11yARIA": {
                                    "role": "button"
                                }
                            },
                            "onClick": function(context) {
								scope.btnDisputeOnClick(res);
                            }.bind(this)
                        },
						"flxAttachments": {
                            "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "button"
                                }
                            },
                            "onClick": function(context) {
                                scope.showAttachments(res);
                            }.bind(this)
                        },
						"lblDownload": {},
						"lblDisupute": {},
                        "flxCheveron": {
                            "onClick": scope.onToggleTrans.bind(scope),
                            "accessibilityConfig": {
                                "a11yLabel": "Show more details for reference number" + res.Id,
                                "a11yARIA": {
                                    "aria-expanded": false,
                                    "role": "button"
                                }
                            }
                        },
                        "lblTransaction": {
                            "text": kony.i18n.getLocalizedString('i18n.wealth.valueDatemb')
                        },
                    }
                });
            } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                this.view.segTransactionList.rowTemplate = "flx5ColumnTemplateTablet";
                var data = transactions.map(function(res) {
                    return {
                        "lbl1": {
                            "text": formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.transactionDate))
                        },
                        "lbl2": {
                            "text": formatUtil.formatAmountandAppendCurrencySymbol(res.amount, res.transactionCurrency?res.transactionCurrency:scope.accountCurrency)
                        },
                        "lbl3": {
                            "text": formatUtil.formatAmountandAppendCurrencySymbol(res.fromAccountBalance, res.transactionCurrency?res.transactionCurrency:scope.accountCurrency)
                        },
                        "lbl4": {
                            "text": res.transactionType
                        },
                        "lblDescValue": {
                            "text": res.description,
                        },
                        "lblTransDate": {
                            "text": formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.valueDateTime))
                        },
                        "lblRefNumber": {
                            "text": res.transactionId
                        },
                        "lblCheveron": {
                            "text": 'O'
                        },
                        "flxSeparator": {
                            "isVisible": true
                        },
                        "flxSep": {
                            "isVisible": false
                        },
                        "flxExpandedView": {
                            "isVisible": false
                        },
                        "lblStrip": {
                            "isVisible": false
                        },
                        "flxBottomSeparator": {
                            "isVisible": false
                        },
						"data": res,
						"flxDownload": {
                            "accessibilityConfig": {
                                "a11yLabel": "Download details of transaction with reference number" + res.Id,
                                "a11yARIA": {
                                    "role": "button"
                                }
                            },
                            "onClick": function(context) {
                                scope.btnDownloadOnClick(res);
                            }.bind(this)
                        },
                        "flxDispute": {
                            "accessibilityConfig": {
                                "a11yLabel": "Dispute transaction with reference number" + res.Id,
                                "a11yARIA": {
                                    "role": "button"
                                }
                            },
                            "onClick": function(context) {
								scope.btnDisputeOnClick(res);
                            }.bind(this)
                        },
						"flxAttachments": {
                            "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "button"
                                }
                            },
                            "onClick": function(context) {
                                scope.showAttachments(res);
                            }.bind(this)
                        },
						"lblDownload": {},
						"lblDisupute": {},
                        "flxCheveron": {
                            "onClick": scope.onToggleTrans.bind(scope),
                            "accessibilityConfig": {
                                "a11yLabel": "Show more details for reference number" + res.Id,
                                "a11yARIA": {
                                    "aria-expanded": false,
                                    "role": "button"
                                }
                            }
                        },
                        "lblTransaction": {
                            "text": kony.i18n.getLocalizedString('i18n.wealth.valueDatemb')
                        },
                    }
                });
            } else {
                this.view.segTransactionList.rowTemplate = "flx5ColumnTemplateChangeDesktop";
                var data = transactions.map(function(res) {
                    return {
                        "lbl1": {
                            "text": formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.transactionDate))
                        },
                        "lbl2": {
                            "text": formatUtil.formatAmountandAppendCurrencySymbol(res.amount, res.transactionCurrency?res.transactionCurrency:scope.accountCurrency)
                        },
                        "lbl3": {
                            "text": formatUtil.formatAmountandAppendCurrencySymbol(res.fromAccountBalance, res.transactionCurrency?res.transactionCurrency:scope.accountCurrency)
                        },
                        "lbl4": {
                            "text": res.transactionType
                        },
                        "lbl5": {
                            "text": res.description
                        },
                        "lblTransDate": {
                            "text": formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.valueDateTime))
                        },
                        "lblRefNumber": {
                            "text": res.transactionId
                        },
                        "lblCheveron": {
                            "text": 'O'
                        },
                        "flxSeparator": {
                            "isVisible": true
                        },
                        "flxSep": {
                            "isVisible": false
                        },
                        "flxExpandedView": {
                            "isVisible": false
                        },
                        "lblStrip": {
                            "isVisible": false
                        },
                        "flxBottomSeparator": {
                            "isVisible": false
                        },
						"data": res,
                        "flxDownload": {
                            "accessibilityConfig": {
                                "a11yLabel": "Download details of transaction with reference number" + res.Id,
                                "a11yARIA": {
                                    "role": "button"
                                }
                            },
                            "onClick": function(context) {
                                scope.btnDownloadOnClick(res);
                            }.bind(this)
                        },
                        "flxDispute": {
                            "accessibilityConfig": {
                                "a11yLabel": "Dispute transaction with reference number" + res.Id,
                                "a11yARIA": {
                                    "role": "button"
                                }
                            },
                            "onClick": function(context) {
								scope.btnDisputeOnClick(res);
                            }.bind(this)
                        },
						"flxAttachments": {
                            "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "button"
                                }
                            },
                            "onClick": function(context) {
                                scope.showAttachments(res);
                            }.bind(this)
                        },
						"lblDownload": {},
						"lblDisupute": {},
                        "flxCheveron": {
                            "onClick": scope.onToggleTrans.bind(scope),
                            "accessibilityConfig": {
                                "a11yLabel": "Show more details for reference number" + res.Id,
                                "a11yARIA": {
                                    "aria-expanded": false,
                                    "role": "button"
                                }
                            }
                        },
                        "lblTransaction": {
                            "text": kony.i18n.getLocalizedString('i18n.wealth.valueDatemb')
                        },
                    }
                });
            }
            if (this.performTransactionSearch) {
                if (data.length != 0) {
                    this.view.segTransactionList.setData(data);
                    this.searchData = data;
                } else {
                    if (this.transactionSearcCriteria.offset > 1) {
                        this.transactionSearcCriteria.offset--;
                    }
                    this.view.segTransactionList.setData(this.searchData);
                  	this.enableDisableDownload(false);
                    if(this.isNextFlow == false){
                        this.view.segTransactionList.setVisibility(false);
                        this.view.flxNoTransactions.setVisibility(true);
                        this.view.PaginationContainer.setVisibility(false);
                      	this.view.flxPaginationContainer.setVisibility(false);
                        this.view.flxSortOptions.setVisibility(false);
                    }
                }
                this.setSearchPagination({
                    'show': true,
                    'offset': this.transactionSearcCriteria.offset
                }, this.transactionList);
            } else {
                this.setPagination({
                    'show': true,
                    'offset': this.offset
                }, this.transactionList);
                this.view.segTransactionList.setData(data.slice(this.offset, this.lastRecord));
                if(data.length == 0){
                    this.view.segTransactionList.setVisibility(false);
                    this.view.flxNoTransactions.setVisibility(true);
                  	this.enableDisableDownload(false);
                }
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.AdjustScreen();
        },
      
      	onToggleTrans: function(widgetInfo, segInfo) {
            var self = this;
            try {
                var scopeObj = this;
                var index = [segInfo.rowIndex, segInfo.sectionIndex];
                var sectionIndex = index[1];
                var rowIndex = index[0];
                var data = scopeObj.view.segTransactionList.data;
                var rowData = data[rowIndex];
                self.rowData = rowData;
                var section = data.length;
                if (rowData.flxExpandedView.isVisible !== true) {
					var transactionId = rowData.lblRefNumber.text;
                    var attachements = this.presenter.retrieveAttachments(transactionId);
                    while (section--) {
						var segment = data[section];
						segment.lblCheveron["text"] = "O";
                      	segment.flxExpandedView.isVisible = false;
                      	segment.lblStrip.isVisible = false;
                      	segment.flxBottomSeparator.isVisible = false;
                      	segment.flxSep.isVisible = false;
						segment.flxSeparator.isVisible = true;
                        segment.flxCheveron.accessibilityConfig = {
                            "a11yLabel": "Show more details for reference number" + segment.lblRefNumber.text,
                            "a11yARIA": {
                                "aria-expanded": false,
                                "role": "button"
                            }
                        }
                        scopeObj.view.segTransactionList.setDataAt(segment, section, 0);
                    }
                    rowData.lblCheveron["text"] = "P";
                    rowData.flxExpandedView.isVisible = true;
                  	rowData.lblStrip.isVisible = true;
                  	rowData.flxBottomSeparator.isVisible = true;
                    rowData.flxSep.isVisible = true;
                    rowData.flxSeparator.isVisible = false;
                    rowData.flxCheveron.accessibilityConfig = {
                        "a11yLabel": "Hide details for reference number" + rowData.lblRefNumber.text,
                        "a11yARIA": {
                            "aria-expanded": true,
                            "role": "button"
                        }
                    }
                    scopeObj.view.segTransactionList.setDataAt(rowData, rowIndex, sectionIndex);
                    kony.application.dismissLoadingScreen();
                } else {
                    rowData.lblCheveron["text"] = "O";
                    rowData.flxExpandedView.isVisible = false;
                  	rowData.lblStrip.isVisible = false;
                  	rowData.flxBottomSeparator.isVisible = false;
                    rowData.flxSep.isVisible = false;
                    rowData.flxSeparator.isVisible = true;
                    rowData.flxCheveron.accessibilityConfig = {
                        "a11yLabel": "Show more details for reference number" + rowData.lblRefNumber.text,
                        "a11yARIA": {
                            "aria-expanded": false,
                            "role": "button"
                        }
                    }
                    scopeObj.view.segTransactionList.setDataAt(rowData, rowIndex, sectionIndex);
                }
              	this.AdjustScreen(rowData);
                if (this.view.segTransactionList.rowTemplate === "flx5ColumnTemplateChangeDesktop") {
                    this.view.segTransactionList.setActive(rowIndex, sectionIndex, "flx5ColumnTemplateChangeDesktop.flxRowGroup.flxCollapsedView.flxCheveron");
                } else if (this.view.segTransactionList.rowTemplate === "flx5ColumnTemplateTablet") {
                    this.view.segTransactionList.setActive(rowIndex, sectionIndex, "flx5ColumnTemplateTablet.flxRowGroup.flxCollapsedView.flxCheveron");
                } else {
                    this.view.segTransactionList.setActive(rowIndex, sectionIndex, "flx5ColumnTemplateChangeMobile.flxRowGroup.flxCollapsedView.flxCheveron");
                }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in setting the data in details view",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
      
      	onToggleLoanTrans: function(widgetInfo, segInfo) {
            var self = this;
            try {
                var scopeObj = this;
                var index = [segInfo.rowIndex, segInfo.sectionIndex];
                var sectionIndex = index[1];
                var rowIndex = index[0];
                var data = scopeObj.view.segTransactionList.data;
                var rowData = data[0][1][rowIndex];
                self.rowData = rowData;
                var section = data[0][1].length;
                if (rowData.flxExpandedView.isVisible !== true) {
                    while (section--) {
                        var segment = data[0][1][section];
                        segment.lblCheveron["text"] = "O";
                        segment.flxExpandedView.isVisible = false;
                      	segment.lblStrip.isVisible = false;
                        segment.flxSep.isVisible = false;
                        segment.flxBottomSeparator.isVisible = false;
						segment.flxSeparator.isVisible = true;
                        scopeObj.view.segTransactionList.setDataAt(segment, section, 0);
                    }
                    rowData.lblCheveron["text"] = "P";
                    rowData.flxExpandedView.isVisible = true;
                  	rowData.lblStrip.isVisible = true;
                    rowData.flxBottomSeparator.isVisible = true;
                    rowData.flxSep.isVisible = true;
                    rowData.flxSeparator.isVisible = false;
                    scopeObj.view.segTransactionList.setDataAt(rowData, rowIndex, sectionIndex);
                    kony.application.dismissLoadingScreen();
                } else {
                    rowData.lblCheveron["text"] = "O";
                    rowData.flxExpandedView.isVisible = false;
                  	rowData.lblStrip.isVisible = false;
                    rowData.flxBottomSeparator.isVisible = false;
                    rowData.flxSep.isVisible = false;
                    rowData.flxSeparator.isVisible = true;
                    scopeObj.view.segTransactionList.setDataAt(rowData, rowIndex, sectionIndex);
                }
              	this.AdjustScreen();
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in setting the data in details view",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
      
        showTransactionDetails: function(context) {
            var index = context.rowIndex;
            if (context.widgetInfo.data[index].lblCheveron.text === "O") {
                context.widgetInfo.data[index].lblCheveron.text = "P";
                context.widgetInfo.data[index].flxExpandedView.isVisible = true;
                context.widgetInfo.data[index].flxSep.isVisible = true;
                context.widgetInfo.data[index].flxSeparator.isVisible = false;
                context.widgetInfo.data[index].flxCheveron.accessibilityConfig = {
                    "a11yLabel": "Hide details for reference number" + context.widgetInfo.data[index].lbl1.text,
                    "a11yARIA": {
                        "aria-expanded": true,
                        "role": "button"
                    }
                }
            } else {
                context.widgetInfo.data[index].lblCheveron.text = "O";
                context.widgetInfo.data[index].flxExpandedView.isVisible = false;
                context.widgetInfo.data[index].flxSep.isVisible = false;
                context.widgetInfo.data[index].flxSeparator.isVisible = true;
                context.widgetInfo.data[index].flxCheveron.accessibilityConfig = {
                    "a11yLabel": "Show more details for reference number" + context.widgetInfo.data[index].lbl1.text,
                    "a11yARIA": {
                        "aria-expanded": false,
                        "role": "button"
                    }
                }
            }
            this.view.segTransactionList.setData(context.widgetInfo.data);
            this.AdjustScreen();
            if (this.view.segTransactionList.rowTemplate === "flx5ColumnTemplateTablet") {
                this.view.segTransactionList.setActive(context.rowIndex, context.sectionIndex, "flx5ColumnTemplateTablet.flxRowGroup.flxCollapsedView.flxCheveron");
            } else {
                this.view.segTransactionList.setActive(context.rowIndex, context.sectionIndex, "flx5ColumnTemplateChangeMobile.flxRowGroup.flxCollapsedView.flxCheveron");
            }
        },
        setPagination: function(values, viewModel) {
            var paginationCount = applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
            var recipientDetails = viewModel.length;
            const lastRecord = Math.min((values.offset + paginationCount), recipientDetails);
            this.lastRecord = lastRecord;
            var page = parseInt((values.offset / paginationCount) + 1);
            var lastPage = (Math.ceil(recipientDetails / paginationCount));
            this.view.PaginationContainer.lblPagination.text = page + " - " + lastPage + " Pages";
            this.view.PaginationContainer.flxPaginationFirst.isVisible = true;
            this.view.PaginationContainer.flxPaginationLast.isVisible = true;
            this.view.PaginationContainer.flxPaginationFirst.right = "0dp";
            if (values.offset !== 0 && values.offset <= recipientDetails - 1) {
                this.view.PaginationContainer.imgPaginationPrevious.src = "pagination_back_blue.png";
                this.view.PaginationContainer.imgPaginationFirst.src = "pagination_first_active.png";
                this.view.PaginationContainer.flxPaginationFirst.setEnabled(true);
                this.view.PaginationContainer.flxPaginationPrevious.setEnabled(true);
                this.view.PaginationContainer.flxPaginationPrevious.onClick = this.onPrevious.bind(this, values, viewModel);
                this.view.PaginationContainer.flxPaginationFirst.onClick = this.onFirst.bind(this, values, viewModel);
            } else {
                this.view.PaginationContainer.imgPaginationPrevious.src = "pagination_back_inactive.png";
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
                this.view.PaginationContainer.imgPaginationNext.src = "pagination_blue.png";
                this.view.PaginationContainer.imgPaginationLast.src = "pagination_last_active.png";
                this.view.PaginationContainer.flxPaginationLast.setEnabled(true);
                this.view.PaginationContainer.flxPaginationNext.setEnabled(true);
                this.view.PaginationContainer.flxPaginationNext.onClick = this.onNext.bind(this, values, viewModel);
                this.view.PaginationContainer.flxPaginationLast.onClick = this.onLast.bind(this, values, viewModel);
            }
        },
        setSearchPagination: function(values, viewModel) {
            var paginationCount = applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
            var recipientDetails = viewModel.length;
            var count = (values.offset-1) * paginationCount;
            if(recipientDetails!=0){
                this.view.PaginationContainer.lblPagination.text = (count+1) + " - " + parseInt(count+recipientDetails) + " Records";
            }else{
                this.view.PaginationContainer.lblPagination.text = (count+1) + " - " + parseInt(count+paginationCount) + " Records";
            }
            this.view.PaginationContainer.flxPaginationFirst.isVisible = true;
            this.view.PaginationContainer.flxPaginationLast.isVisible = true;
            this.view.PaginationContainer.flxPaginationFirst.right = "0dp"; 
            this.view.PaginationContainer.imgPaginationLast.src = "pagination_last_inactive.png";
            this.view.PaginationContainer.flxPaginationLast.setEnabled(false); 
            if (values.offset !== 1) {
                this.view.PaginationContainer.imgPaginationPrevious.src = "pagination_back_blue.png";
                this.view.PaginationContainer.imgPaginationFirst.src = "pagination_first_active.png";
                this.view.PaginationContainer.flxPaginationFirst.setEnabled(true);
                this.view.PaginationContainer.flxPaginationPrevious.setEnabled(true);
                this.view.PaginationContainer.flxPaginationPrevious.onClick = this.onPrevious.bind(this, values, viewModel);
                this.view.PaginationContainer.flxPaginationFirst.onClick = this.onFirst.bind(this, values, viewModel);
            } else {
                this.view.PaginationContainer.imgPaginationPrevious.src = "pagination_back_inactive.png";
                this.view.PaginationContainer.imgPaginationFirst.src = "pagination_inactive.png";
                this.view.PaginationContainer.flxPaginationFirst.setEnabled(false);
                this.view.PaginationContainer.flxPaginationPrevious.setEnabled(false);
            }
            if (values.offset < 1 || recipientDetails < paginationCount ) {
                this.view.PaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                // this.view.PaginationContainer.imgPaginationLast.src = "pagination_last_inactive.png";
                // this.view.PaginationContainer.flxPaginationLast.setEnabled(false);
                this.view.PaginationContainer.flxPaginationNext.setEnabled(false);
            } else {
                this.view.PaginationContainer.imgPaginationNext.src = "pagination_blue.png";
                // this.view.PaginationContainer.imgPaginationLast.src = "pagination_last_active.png";
                // this.view.PaginationContainer.flxPaginationLast.setEnabled(true);
                this.view.PaginationContainer.flxPaginationNext.setEnabled(true);
                this.view.PaginationContainer.flxPaginationNext.onClick = this.onNext.bind(this, values, viewModel);
                this.view.PaginationContainer.flxPaginationLast.onClick = this.onLast.bind(this, values, viewModel);
            }
        },
        onFirst: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            if (values.offset < recipientDetails) {
                values.offset = 0;
                this.offset = values.offset;
            }
            if(this.performTransactionSearch == true){
                this.transactionSearcCriteria.offset = 1;
                this.initiateTransactionSearch(this.transactionSearcCriteria);
            } else if (this.performBlockedSearch == true)
            {
                
                this.transactionSearcCriteria.offset==1;
                this.initiateBlockedFundsSearch(this.transactionSearcCriteria);
            } else {
                if (scopeObj.selectedTab == "Blocked") this.updateBlockedTransactions(viewModel, values);
				else if(scopeObj.selectedTab === "LoanSchedule") this.updateLoanTransactions(viewModel, values);
                else this.updateTransactions(viewModel, values);
            }
        },
        onPrevious: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            var paginationCount = applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
            if (values.offset < recipientDetails) {
                values.offset = values.offset - paginationCount;
                this.offset = values.offset;
            }
            if(this.performTransactionSearch == true){
                this.transactionSearcCriteria.offset--;
                this.initiateTransactionSearch(this.transactionSearcCriteria);
            } else if (this.performBlockedSearch == true)
            {
                
                this.transactionSearcCriteria.offset--;
                this.transactionSearcCriteria.pageStart--;
                this.initiateBlockedFundsSearch(this.transactionSearcCriteria);
            } else {
                if (scopeObj.selectedTab == "Blocked") this.updateBlockedTransactions(viewModel, values);
				else if(scopeObj.selectedTab === "LoanSchedule") this.updateLoanTransactions(viewModel, values);
                else this.updateTransactions(viewModel, values);
            }
        },
        onNext: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            var paginationCount = applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
            if (values.offset < recipientDetails) {
                values.offset = values.offset + paginationCount;
                this.offset = values.offset;
            }
            if(this.performTransactionSearch == true){
                this.isNextFlow= true;
                this.transactionSearcCriteria.offset++;
                this.initiateTransactionSearch(this.transactionSearcCriteria);
            } else if (this.performBlockedSearch == true)
            {
                 this.isNextFlow = true;
                this.transactionSearcCriteria.offset++;
                this.transactionSearcCriteria.pageStart++;
                this.initiateBlockedFundsSearch(this.transactionSearcCriteria);
            } else {
                if (scopeObj.selectedTab == "Blocked") this.updateBlockedTransactions(viewModel, values);
				else if(scopeObj.selectedTab === "LoanSchedule") this.updateLoanTransactions(viewModel, values);
                else this.updateTransactions(viewModel, values);
            }
        },
        onLast: function(values, viewModel) {
            var recipientDetails = viewModel.length;
            var paginationCount = applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
            if (values.offset < recipientDetails) {
                var value = Math.floor(recipientDetails / paginationCount)
                values.offset = Math.min(paginationCount * value, recipientDetails)
                this.offset = values.offset===recipientDetails ? (values.offset-paginationCount) : values.offset;
            }
            if (scopeObj.selectedTab == "Blocked") this.updateBlockedTransactions(viewModel, values);
			else if(scopeObj.selectedTab === "LoanSchedule") this.updateLoanTransactions(viewModel, values);
            else this.updateTransactions(viewModel, values);
        },
        /**
         * Method to show searched transactions
         * @param {JSON} searchUIData Contains transactions and accounts inside datainputs
         */
        showSearchedTransaction: function(searchUIData) {
            var controller = this;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            this.highlightTransactionType(OLBConstants.ALL);
            this.view.transactions.flxPagination.setVisibility(false);
            var transactions = searchUIData.transactions;
            var dataInputs = searchUIData.dataInputs;
            this.adjustUIForTransactions(transactions.length > 0);
            var createSegmentSection = function(transactions, sectionHeaderText) {
                return [{
                        "lblTransactionHeader": sectionHeaderText,
                        "lblSeparator": "."
                    },
                    transactions.map(controller.createTransactionSegmentModel.bind(this, dataInputs))
                ];
            };
            var pendingTransactionsSection = createSegmentSection(transactions.filter(this.isPendingTransaction), {
                "text": kony.i18n.getLocalizedString('i18n.accounts.pending'),
                "skin": "sknLblPendingTransactions",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.accounts.pending'),
                }
            });
            var postedTransactionsSection = createSegmentSection(transactions.filter(this.isSuccessfulTransacion), {
                "text": kony.i18n.getLocalizedString('i18n.accounts.posted'),
                "skin": "sknlblSSP5daf0b15px",
                "accessibilityconfig": {
                    "a11yLabel": kony.i18n.getLocalizedString('i18n.accounts.posted'),
                }
            });
            var transactionsExistInSection = function(section) {
                return section[1] && section[1].length && section[1].length > 0;
            };
            this.view.transactions.segTransactions.setData([pendingTransactionsSection, postedTransactionsSection].filter(transactionsExistInSection));
            this.view.transactions.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
            this.AdjustScreen();
        },
        /**
         *  Method to count tag state
         */
        tagState: {
            visible: 0,
            NUMBER_OF_TAGS: 5,
            decrement: function() {
                if (this.visible > 0) {
                    this.visible--;
                }
            },
            increment: function() {
                if (this.visible < this.NUMBER_OF_TAGS) {
                    this.visible++;
                }
            }
        },
        getTagConfig: function(searchViewModel) {
            var scopeObj = this;
            var config;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var formatManager = applicationManager.getFormatUtilManager();
            var currency = formatManager.getCurrencySymbolCode(searchViewModel.currency);
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                config = [{
                    actionOn: 'flxCancelKeywordM',
                    hide: ['flxKeywordWrapper'],
                    clearPropertiesFromViewModel: [{
                        propertyName: 'keyword',
                        resetValue: ''
                    }],
                    value: {
                        label: 'lblKeywordValueM',
                        computedValue: function() {
                            if (searchViewModel.keyword === "") {
                                return null;
                            }
                            return searchViewModel.keyword;
                        }.bind(scopeObj)
                    }
                }, {
                    actionOn: 'flxCancelTypeM',
                    hide: ['flxTypeWrapper'],
                    clearPropertiesFromViewModel: [{
                        propertyName: 'transactionTypeSelected',
                        resetValue: OLBConstants.BOTH
                    }],
                    value: {
                        label: 'lblTypeValueM',
                        computedValue: function() {
                            if (searchViewModel.transactionTypeSelected === OLBConstants.BOTH) {
                                return null;
                            }
                            return kony.i18n.getLocalizedString(this.transactionTypes[searchViewModel.transactionTypeSelected]);
                        }.bind(scopeObj)
                    }
                }, {
                    actionOn: 'flxCancelAmountRangeM',
                    hide: ['flxAmountRangeWrapper'],
                    clearPropertiesFromViewModel: [{
                        propertyName: 'fromAmount',
                        resetValue: ''
                    }, {
                        propertyName: 'toAmount',
                        resetValue: ''
                    }],
                    value: {
                        label: 'lblAmountRangeValueM',
                        computedValue: function() {
                            if (searchViewModel.fromAmount === "" || searchViewModel.toAmount === "") {
                                return null;
                            }
                            return CommonUtilities.formatCurrencyWithCommas(searchViewModel.fromAmount, false, currency) + " to " + CommonUtilities.formatCurrencyWithCommas(searchViewModel.toAmount, false, currency);
                        }.bind(scopeObj)
                    }
                }, {
                    actionOn: 'flxCancelDateRangeM',
                    hide: ['flxDateRangeWrapper'],
                    clearPropertiesFromViewModel: [{
                        propertyName: 'timePeriodSelected',
                        resetValue: OLBConstants.CHOOSE_TIME_RANGE
                    }],
                    value: {
                        label: 'lblDateRangeValueM',
                        computedValue: function() {
                            if (searchViewModel.timePeriodSelected === OLBConstants.CHOOSE_TIME_RANGE) {
                                return null;
                            } else if (searchViewModel.timePeriodSelected === OLBConstants.CUSTOM_DATE_RANGE) {
                                var fromDate = this.view.transactions.calDateFrom.formattedDate;
                                var toDate = this.view.transactions.calDateTo.formattedDate;
                                return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
                            }
                            return kony.i18n.getLocalizedString(this.timePeriods[searchViewModel.timePeriodSelected]);
                        }.bind(scopeObj)
                    }
                }, {
                    actionOn: 'flxCancelCheckNumberM',
                    hide: ['flxCheckNumberWrapper'],
                    clearPropertiesFromViewModel: [{
                        propertyName: 'fromCheckNumber',
                        resetValue: ''
                    }, {
                        propertyName: 'toCheckNumber',
                        resetValue: ''
                    }],
                    value: {
                        label: 'lblCheckNumberValueM',
                        computedValue: function() {
                            if (searchViewModel.fromCheckNumber === "" || searchViewModel.toCheckNumber === "") {
                                return null;
                            }
                            return searchViewModel.fromCheckNumber + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + searchViewModel.toCheckNumber;
                        }.bind(scopeObj)
                    }
                }];
            } else {
                config = [{
                    actionOn: 'flxCancelKeyword',
                    hide: ['lblKeywordTitle', 'lblKeywordValue'],
                    clearPropertiesFromViewModel: [{
                        propertyName: 'keyword',
                        resetValue: ''
                    }],
                    value: {
                        label: 'lblKeywordValue',
                        computedValue: function() {
                            if (searchViewModel.keyword === "") {
                                return null;
                            }
                            return searchViewModel.keyword;
                        }.bind(scopeObj)
                    }
                }, {
                    actionOn: 'flxCancelType',
                    hide: ['lblTypeValue', 'lblTypeTitle'],
                    clearPropertiesFromViewModel: [{
                        propertyName: 'transactionTypeSelected',
                        resetValue: OLBConstants.BOTH
                    }],
                    value: {
                        label: 'lblTypeValue',
                        computedValue: function() {
                            if (searchViewModel.transactionTypeSelected === OLBConstants.BOTH) {
                                return null;
                            }
                            return kony.i18n.getLocalizedString(this.transactionTypes[searchViewModel.transactionTypeSelected]);
                        }.bind(scopeObj)
                    }
                }, {
                    actionOn: 'flxCancelAmountRange',
                    hide: ['lblAmountRangeTitle', 'lblAmountRangeValue'],
                    clearPropertiesFromViewModel: [{
                        propertyName: 'fromAmount',
                        resetValue: ''
                    }, {
                        propertyName: 'toAmount',
                        resetValue: ''
                    }],
                    value: {
                        label: 'lblAmountRangeValue',
                        computedValue: function() {
                            if (searchViewModel.fromAmount === "" || searchViewModel.toAmount === "") {
                                return null;
                            }
                            return CommonUtilities.formatCurrencyWithCommas(searchViewModel.fromAmount, false, currency) + " to " + CommonUtilities.formatCurrencyWithCommas(searchViewModel.toAmount, false, currency);
                        }.bind(scopeObj)
                    }
                }, {
                    actionOn: 'flxCancelDateRange',
                    hide: ['lblDateRangeTitle', 'lblDateRangeValue'],
                    clearPropertiesFromViewModel: [{
                        propertyName: 'timePeriodSelected',
                        resetValue: OLBConstants.CHOOSE_TIME_RANGE
                    }],
                    value: {
                        label: 'lblDateRangeValue',
                        computedValue: function() {
                            if (searchViewModel.timePeriodSelected === OLBConstants.CHOOSE_TIME_RANGE) {
                                return null;
                            } else if (searchViewModel.timePeriodSelected === OLBConstants.CUSTOM_DATE_RANGE) {
                                var fromDate = this.view.transactions.calDateFrom.formattedDate;
                                var toDate = this.view.transactions.calDateTo.formattedDate;
                                return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
                            }
                            return kony.i18n.getLocalizedString(this.timePeriods[searchViewModel.timePeriodSelected]);
                        }.bind(scopeObj)
                    }
                }, {
                    actionOn: 'flxCancelCheckNumber',
                    hide: ['lblCheckNumberTitle', 'lblCheckNumberValue'],
                    clearPropertiesFromViewModel: [{
                        propertyName: 'fromCheckNumber',
                        resetValue: ''
                    }, {
                        propertyName: 'toCheckNumber',
                        resetValue: ''
                    }],
                    value: {
                        label: 'lblCheckNumberValue',
                        computedValue: function() {
                            if (searchViewModel.fromCheckNumber === "" || searchViewModel.toCheckNumber === "") {
                                return null;
                            }
                            return searchViewModel.fromCheckNumber + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + searchViewModel.toCheckNumber;
                        }.bind(scopeObj)
                    }
                }];
            }
            return config;
        },
        setFlxSearchResultsHeight: function(numberOfVisibleTags) {
            if (numberOfVisibleTags == 0) return;
            var x = (numberOfVisibleTags * 22) + (numberOfVisibleTags * 10);
            var y = x + 37;
            var z = y + 43;
            this.view.transactions.flxSearchItemsMobile.height = x + "dp";
            this.view.transactions.flxWrapper.height = y + "dp";
            this.view.transactions.flxSearchResults.height = z + "dp";
            this.AdjustScreen();
        },
        /**
         * Method to show searched tags
         * @param {Object} searchViewModel search view model
         */
        configureActionsForTags: function(searchViewModel) {
            var scopeObj = this;
            var tagConfig = scopeObj.getTagConfig(searchViewModel);

            function generateClickListenerForTag(config) {
                return function() {
                    hideTag(config);
                    scopeObj.tagState.decrement();
                    config.clearPropertiesFromViewModel.forEach(function(property) {
                        scopeObj.searchViewModel[property.propertyName] = property.resetValue;
                    });
                    FormControllerUtility.showProgressBar(this.view);
                    if (scopeObj.tagState.visible === 0) {
                        scopeObj.presenter.showAccountDetails();
                    } else {
                        scopeObj.startSearch();
                    }
                    scopeObj.view.transactions.forceLayout();
                };
            }

            function hideTag(config) {
                scopeObj.view.transactions[config.actionOn].setVisibility(false);
                config.hide.forEach(function(widgetToHide) {
                    scopeObj.view.transactions[widgetToHide].setVisibility(false);
                });
                scopeObj.view.transactions.forceLayout();
            }

            function showTag(config) {
                scopeObj.view.transactions[config.actionOn].setVisibility(true);
                config.hide.forEach(function(widgetToHide) {
                    scopeObj.view.transactions[widgetToHide].setVisibility(true);
                });
                scopeObj.view.transactions.forceLayout();
                scopeObj.tagState.increment();
            }
            this.tagState.visible = 0;
            tagConfig.forEach(function(config) {
                if (config.value.computedValue() === null) {
                    hideTag(config);
                } else {
                    showTag(config);
                    scopeObj.view.transactions[config.actionOn].onClick = generateClickListenerForTag(config);
                    scopeObj.view.transactions[config.value.label].text = config.value.computedValue();
                }
            });
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                scopeObj.setFlxSearchResultsHeight(scopeObj.tagState.visible);
            }
            this.AdjustScreen();
        },
        /**
         * showNoMoreRecords - Handles zero records scenario in navigation.
         */
        showNoMoreRecords: function() {
            this.view.transactions.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
            this.view.transactions.flxPaginationNext.setEnabled(false);
            kony.ui.Alert(kony.i18n.getLocalizedString("i18n.navigation.norecordsfound"));
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         * Method to update Pagination Bar
         * @param {Object} transactionDetails transaction details like pagination, transactions etc
         */
        updatePaginationBar: function(transactionDetails) {
            var pagination = transactionDetails.pagination;
            var dataInputs = transactionDetails.dataInputs;
            dataInputs.resetSorting = false;
            var account = dataInputs.account;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.transactions.lblPagination, (pagination.offset + 1) + " - " + (pagination.offset + pagination.limit) + " " + kony.i18n.getLocalizedString('i18n.common.transactions'), accessibilityConfig);
            this.view.transactions.flxPaginationPrevious.onClick = this.loadAccountModule().presentationController.fetchPreviousTransactions.bind(this.loadAccountModule().presentationController, account, dataInputs);
            this.view.transactions.flxPaginationNext.onClick = this.loadAccountModule().presentationController.fetchNextTransactions.bind(this.loadAccountModule().presentationController, account, dataInputs);
            this.view.transactions.imgPaginationFirst.isVisible = false;
            this.view.transactions.imgPaginationLast.isVisible = false;
            if (pagination.offset >= pagination.paginationRowLimit) {
                this.view.transactions.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                this.view.transactions.flxPaginationPrevious.setEnabled(true);
            } else {
                this.view.transactions.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                this.view.transactions.flxPaginationPrevious.setEnabled(false);
            }
            if (pagination.limit < pagination.paginationRowLimit) {
                this.view.transactions.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                this.view.transactions.flxPaginationNext.setEnabled(false);
            } else {
                this.view.transactions.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                this.view.transactions.flxPaginationNext.setEnabled(true);
            }
            this.AdjustScreen();
        },
        /**
         * Method to show E-Statements
         * @param {JSON} account account for which e-statements are required
         */
        showViewStatements: function(account) {
            this.view.quicklinks.setVisibility(false);
            this.view.flxMain.zIndex = 204;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            if (kony.application.getCurrentBreakpoint() <= 640 && (orientationHandler.isMobile)) {
                this.view.viewStatementsnew.lblViewStatements.text = kony.i18n.getLocalizedString("i18n.ViewStatements.STATEMENTS");
            }
            var text1 = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
            var text2 = kony.i18n.getLocalizedString("i18n.transfers.accountDetails");
            var text3 = kony.i18n.getLocalizedString("i18n.ViewStatements.STATEMENTS");
            this.view.breadcrumb.setBreadcrumbData([{
                text: text1
            }, {
                text: text2,
                callback: this.loadAccountModule().presentationController.showAccountDetails.bind(this.loadAccountModule().presentationController, account)
            }, {
                text: text3
            }]);
            this.view.viewStatementsnew.lblViewStatements.text = kony.i18n.getLocalizedString("i18n.ViewStatements.STATEMENTS");
            this.view.viewStatementsnew.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.ViewStatements.GoToAccountSummary");
            this.view.viewStatementsnew.btnConfirm.toolTip = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.ViewStatements.BackToAccountDetails"));
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                  "appName": "HomepageMA",
                  "moduleName": "AccountsUIModule"
               });
          	var navFromAccDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.navFromAccDetails;
            var custDashboard = accountsModule.presentationController.customerdashboard;
            if (navFromAccDetails) {
				if (custDashboard === "true") {
					this.view.viewStatementsnew.btnModify.setVisibility(false);
				}else {
					this.view.viewStatementsnew.btnModify.setVisibility(true);
				}
                this.view.viewStatementsnew.btnConfirm.setVisibility(true);
            } else {
                this.view.viewStatementsnew.btnModify.setVisibility(false);
                this.view.viewStatementsnew.btnConfirm.setVisibility(false);
            }
         	this.view.flxHeader.setVisibility(true);
            this.view.flxMainWrapper.setVisibility(true);
            this.view.flxMain.setVisibility(true);
            this.view.flxLogout.setVisibility(false);
            this.view.CustomPopup.lblHeading.setFocus(true);
            this.view.flxFooter.setVisibility(true);
            this.view.breadcrumb.setVisibility(false);
            this.view.flxRenewExpired.setVisibility(false);
            this.view.flxViewStatements.setVisibility(true);
            this.view.downloadTransction.lblPickDateRange.setVisibility(true);
            this.view.downloadTransction.lblTo.setVisibility(true);
            this.view.downloadTransction.flxFromDate.setVisibility(true);
            this.view.downloadTransction.flxToDate.setVisibility(true);
            this.view.flxEditRule.setVisibility(false);
            this.view.flxCheckImage.setVisibility(false);
            this.view.flxAccountTypesAndInfo.setVisibility(false);
            this.view.flxAccountSummaryAndActions.setVisibility(false);
            this.view.flxTransactions.setVisibility(false);
            this.view.accountTypes.setVisibility(false);
            this.view.moreActions.setVisibility(false);
            this.view.accountActionsMobile.setVisibility(false);
            this.view.quicklinksMobile.setVisibility(false); /*quick links Mobile*/
            this.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            this.view.moreActionsDup.setVisibility(false);
            this.view.flxDownloadTransaction.setVisibility(false);
            //this.view.ViewStatements.Segment0d986ba7141b544.setData([]);
            this.format = "pdf";
            this.view.viewStatementsnew.forceLayout();
            this.AdjustScreen();
        },
        /**
         * map function for months
         * @param {Number} month month number
         * @returns {String} Month
         */
        fetchMonth: function(month) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            switch (month) {
                case 1:
                    return OLBConstants.MONTHS_FULL.January;
                case 2:
                    return OLBConstants.MONTHS_FULL.February;
                case 3:
                    return OLBConstants.MONTHS_FULL.March;
                case 4:
                    return OLBConstants.MONTHS_FULL.April;
                case 5:
                    return OLBConstants.MONTHS_FULL.May;
                case 6:
                    return OLBConstants.MONTHS_FULL.June;
                case 7:
                    return OLBConstants.MONTHS_FULL.July;
                case 8:
                    return OLBConstants.MONTHS_FULL.August;
                case 9:
                    return OLBConstants.MONTHS_FULL.September;
                case 10:
                    return OLBConstants.MONTHS_FULL.October;
                case 11:
                    return OLBConstants.MONTHS_FULL.November;
                case 12:
                    return OLBConstants.MONTHS_FULL.December;
                default:
                    return "None";
            }
        },
        /**
         * Populates month in view Statements flex basing on year, accountID
         */
        setMonthsData: function() {
            var self = this;
            var userselectedYear;
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var year = parseInt(this.view.viewStatementsnew.lblSelectedYear.text);
            if (year) {
                userselectedYear = year;
            }
            var accountID = this.currentAccountId;
            inputParams = {
                "page": "1",
                "accountNumber": accountID,
                "customerNumber": applicationManager.getUserPreferencesManager().getUserId(),
                "year": userselectedYear,
                "subType": "Statement"
            }
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true
                }
            });
            this.loadAccountModule().presentationController.getMonthlyStatements(inputParams, function sucess(data) {
                self.setMonthsDataNewSuccessCallback(data);
            }, function failure(data) {
                applicationManager.getNavigationManager().updateForm({
                    showLoadingIndicator: {
                        status: false
                    }
                })
                self.setMonthsDataNewfailureCallback(data);
                kony.print("FailureCallback");
            });
            this.view.viewStatementsnew.flxYearInfo.accessibilityConfig = {
                "a11yLabel": this.view.viewStatementsnew.lblSelectYears.text + " " + this.view.viewStatementsnew.lblSelectedYear.text,
                "a11yARIA": {
                    "role": "button",
                    "aria-expanded": false,
                }
            }
        },
        setMonthsDataNewfailureCallback: function(response) {
            var self = this;
            self.view.viewStatementsnew.flxMonthStatements1.setVisibility(false);
            self.view.viewStatementsnew.flxMonthStatements2.setVisibility(false);
            self.view.viewStatementsnew.flxMonthStatements3.setVisibility(false);
            self.view.viewStatementsnew.flxMonthStatements4.setVisibility(false);
            self.view.viewStatementsnew.flxMonthStatements5.setVisibility(false);
            self.view.viewStatementsnew.flxMonthStatements6.setVisibility(false);
            self.view.viewStatementsnew.flxMonthStatements7.setVisibility(false);
            self.view.viewStatementsnew.flxMonthStatements8.setVisibility(false);
            self.view.viewStatementsnew.flxMonthStatements9.setVisibility(false);
            self.view.viewStatementsnew.flxMonthStatements10.setVisibility(false);
            self.view.viewStatementsnew.flxMonthStatements11.setVisibility(false);
            self.view.viewStatementsnew.flxMonthStatements12.setVisibility(false);
            self.view.viewStatementsnew.flxNoRecordsFound.setVisibility(true);
            self.AdjustScreen();
        },
        setMonthsDataNewSuccessCallback: function(response) {
            var self = this;
            var monthsOrder;
            var monthsASCOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var monthsDSCOrder = ["December", "November", "October", "September", "August", "July", "June", "May", "April", "March", "February", "January"];
            var sortImageType = this.view.viewStatementsnew.imgSortDate.src;
            if (sortImageType.indexOf("sorting_next") !== -1) {
                monthsOrder = monthsDSCOrder;
            } else {
                monthsOrder = monthsASCOrder;
            }
            var statementsWidgetDataMap = {
                "btnStatement1": "btnStatement1",
            };
            for (var i = 0; i < monthsOrder.length; i++) {
                var data = [];
                var individualMonthStatements;
                var individualMonthStatementsCount;
                monthName = monthsOrder[i];
                if (response[monthName] && response[monthName][0]) {
                    individualMonthStatements = response[monthName][0];
                    individualMonthStatementsCount = Object.keys(individualMonthStatements).length;
                } else {
                    individualMonthStatementsCount = 0;
                }
                switch (i) {
                    case 0:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles1.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements1.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements1.flexDataMonth1.lblMonth1.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles1.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements1.setVisibility(false);
                        }
                        break;
                    case 1:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles2.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements2.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements2.flexDataMonth2.lblMonth2.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles2.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements2.setVisibility(false);
                        }
                        break;
                    case 2:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles3.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements3.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements3.flexDataMonth3.lblMonth3.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles3.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements3.setVisibility(false);
                        }
                        break;
                    case 3:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles4.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements4.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements4.flexDataMonth4.lblMonth4.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles4.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements4.setVisibility(false);
                        }
                        break;
                    case 4:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles5.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements5.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements5.flexDataMonth5.lblMonth5.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles5.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements5.setVisibility(false);
                        }
                        break;
                    case 5:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles6.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements6.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements6.flexDataMonth6.lblMonth6.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles6.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements6.setVisibility(false);
                        }
                        break;
                    case 6:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles7.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements7.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements7.flexDataMonth7.lblMonth7.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles7.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements7.setVisibility(false);
                        }
                        break;
                    case 7:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles8.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements8.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements8.flexDataMonth8.lblMonth8.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles8.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements8.setVisibility(false);
                        }
                        break;
                    case 8:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles9.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements9.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements9.flexDataMonth9.lblMonth9.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles9.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements9.setVisibility(false);
                        }
                        break;
                    case 9:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles10.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements10.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements10.flexDataMonth10.lblMonth10.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles10.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements10.setVisibility(false);
                        }
                        break;
                    case 10:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles11.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements11.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements11.flexDataMonth11.lblMonth11.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles11.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements11.setVisibility(false);
                        }
                        break;
                    case 11:
                        self.view.viewStatementsnew.SegmentMonthWiseFiles12.widgetDataMap = statementsWidgetDataMap;
                        if (individualMonthStatementsCount > 0) {
                            self.view.viewStatementsnew.flxMonthStatements12.setVisibility(true);
                            self.view.viewStatementsnew.flxMonthStatements12.flexDataMonth12.lblMonth12.text = monthName;
                            data = this.getMonthlyStatementData(individualMonthStatements);
                            self.view.viewStatementsnew.SegmentMonthWiseFiles12.setData(data);
                        } else {
                            self.view.viewStatementsnew.flxMonthStatements12.setVisibility(false);
                        }
                        break;
                }
            }
            self.view.viewStatementsnew.flxSort.onClick = self.sortViewStatementsMonthWise.bind(this, response);
            self.view.viewStatementsnew.flxNoRecordsFound.isVisible = false;
            self.view.flxViewStatements.forceLayout();
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false
                }
            });
            this.AdjustScreen();
        },
        sortViewStatementsMonthWise: function(data) {
            var self = this;
            var sortImageType = self.view.viewStatementsnew.imgSortDate.src;
            if (sortImageType.indexOf("sorting_next") !== -1) {
                self.view.viewStatementsnew.imgSortDate.src = "sorting_previous.png";
            } else {
                if (sortImageType.indexOf("sorting_previous") !== -1) {
                    self.view.viewStatementsnew.imgSortDate.src = "sorting_next_3.png";
                }
            }
            this.setMonthsDataNewSuccessCallback(data);
        },
        /**
         * populating years to listbox
         */
        setYearsToSegment: function() {
            var numberOfYearsToViewStatements = applicationManager.getConfigurationManager().getConfigurationValue('numberOfYearsToViewStatements');
            var date = new Date();
            var yy = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear();
            this.view.viewStatementsnew.lblSelectedYear.text = yy.toString();
            var segmentData = [];
            for (var i = 0; i < numberOfYearsToViewStatements; i++, yy--) {
                var yearsData = {};
                yearsData.lblFilterValue = yy.toString();
                segmentData.push(yearsData);
            }
            var widgetDataMap = {
                "lblFilterValue": "lblFilterValue"
            };
            this.view.viewStatementsnew.segYears.rowTemplate = "flxFileFilter";
            this.view.viewStatementsnew.segYears.widgetDataMap = widgetDataMap;
            this.view.viewStatementsnew.segYears.setData(segmentData);
            this.view.viewStatementsnew.segYears.onRowClick = this.onSelectionOfYear;
            this.view.viewStatementsnew.lblYearDropdown.text = "d";
            this.view.viewStatementsnew.flxYearInfo.onClick = this.onYearClick.bind(this);
            this.view.viewStatementsnew.forceLayout();
        },
        /**
         * Method to show accounts for selection
         * @param {JSON} presentAccounts present accounts
         * @returns {Object} List of accounts
         */
        showAccountsForSelection: function(presentAccounts) {
            var list = [];
            for (var i = 0; i < presentAccounts.length; i++) {
                var tempList = [];
                tempList.push(presentAccounts[i].accountID);
                var name = CommonUtilities.getAccountDisplayName(presentAccounts[i]);
                tempList.push(name);
                list.push(tempList);
            }
            return list;
        },
        /**
         * On selection of new account from list box
         */
        onSelectionOfNewAccount: function() {
            var account = this.view.viewStatementsnew.segAccounts.selectedRowItems[0];
            this.currentAccountId = account.accountID || account.Account_id;
            this.view.viewStatementsnew.lblAccountName.text = account.lblDefaultAccountName.text;
            this.view.viewStatementsnew.flxAccounts.setVisibility(false);
            var date = new Date();
            this.setMonthsData();
        },
        onSelectionOfYear: function() {
            var year = this.view.viewStatementsnew.segYears.selectedRowItems[0];
            this.view.viewStatementsnew.lblSelectedYear.text = year.lblFilterValue;
            this.view.viewStatementsnew.flxYears.setVisibility(false);
            this.setMonthsData();
        },
        /**
         * Method to update accounts list
         * @param {Object} uiData list of accounts
         */
        updateListBox: function(uiData) {
            //var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            var isBusinessUser = applicationManager.getConfigurationManager().getConfigurationValue('isSMEUser') === "true";
            var allAccounts = uiData.allAccounts;
            var currentAccount = uiData.account;
            this.currentAccountId = uiData.account.Account_id || uiData.account.accountID;
            this.view.viewStatementsnew.lblAccountName.text = CommonUtilities.getAccountDisplayName(currentAccount);
            this.view.viewStatementsnew.lblAccountsDropdown.text = "d";
            this.view.viewStatementsnew.flxAccountSelectedValue.onClick = this.onAccountClick.bind(this);
            if (!isSingleCustomerProfile) {
                this.view.viewStatementsnew.flxAccountSelectedValue.setVisibility(true);
                this.view.viewStatementsnew.lstSelectAccount.setVisibility(false);
                this.view.viewStatementsnew.lblAccountIcon.isVisible = true;
                this.view.viewStatementsnew.lblAccountName.left = "10dp";
                this.view.viewStatementsnew.lblAccountIcon.text = currentAccount.isBusinessAccount === "true" ? "r" : "s";
                this.setAccountsData(allAccounts);
            } else {
                this.view.viewStatementsnew.flxAccountSelectedValue.setVisibility(true);
                this.view.viewStatementsnew.lstSelectAccount.setVisibility(false);
                this.view.viewStatementsnew.lblAccountIcon.isVisible = false;
                this.view.viewStatementsnew.lblAccountName.left = "15dp";
                this.setAccountsData(allAccounts);
            }
            this.view.viewStatementsnew.flxAccountSelectedValue.accessibilityConfig = {
                "a11yLabel": this.view.viewStatementsnew.lblKeySelectAccount.text + " " + this.view.viewStatementsnew.lblAccountName.text,
                "a11yARIA": {
                    "role": "button",
                    "aria-expanded": false,
                    "aria-live": "off"
                }
            }
            this.view.viewStatementsnew.forceLayout();
        },
        /*To toggle the dropdown flex
         */
        onAccountClick: function() {
            this.view.viewStatementsnew.flxAccounts.setVisibility(!this.view.viewStatementsnew.flxAccounts.isVisible);
            if (this.view.viewStatementsnew.flxAccounts.isVisible === true) {
                this.view.viewStatementsnew.flxAccountSelectedValue.accessibilityConfig = {
                    "a11yLabel": this.view.viewStatementsnew.lblKeySelectAccount.text + " " + this.view.viewStatementsnew.lblAccountName.text,
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": true
                    }
                }
            } else {
                this.view.viewStatementsnew.flxAccountSelectedValue.accessibilityConfig = {
                    "a11yLabel": this.view.viewStatementsnew.lblKeySelectAccount.text + " " + this.view.viewStatementsnew.lblAccountName.text,
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": false
                    }
                }
            }
        },
        onYearClick: function() {
            this.view.viewStatementsnew.flxYears.setVisibility(!this.view.viewStatementsnew.flxYears.isVisible);
            if (this.view.viewStatementsnew.flxYears.isVisible === true) {
                this.view.viewStatementsnew.flxYearInfo.accessibilityConfig = {
                    "a11yLabel": this.view.viewStatementsnew.lblSelectYears.text + " " + this.view.viewStatementsnew.lblSelectedYear.text,
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": true
                    }
                }
            } else {
                this.view.viewStatementsnew.flxYearInfo.accessibilityConfig = {
                    "a11yLabel": this.view.viewStatementsnew.lblSelectYears.text + " " + this.view.viewStatementsnew.lblSelectedYear.text,
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": false
                    }
                }
            }
            this.view.viewStatementsnew.flxYears.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1,
                    "aria-live": "off"
                }
            }
        },
        /*To set data to the view statement accounts dropdown
         */
        setAccountsData: function(accounts) {
            var dataMap = {
                "lblDefaultAccountIcon": "lblDefaultAccountIcon",
                "lblDefaultAccountName": "lblDefaultAccountName",
                "accountId": "accountId",
                "lblAccountRoleType": "lblAccountRoleType",
                "lblAccountTypeHeader": "lblAccountTypeHeader",
                "flxDefaultAccountsHeader": "flxDefaultAccountsHeader",
                "flxAccountRoleType": "flxAccountRoleType",
                "lblTransactionHeader": "lblTransactionHeader",
                "flxDropDown": "flxDropDown"
            };
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            var isBusinessUser = applicationManager.getConfigurationManager().getConfigurationValue('isSMEUser') === "true";
            if (!isSingleCustomerProfile) {
                this.view.viewStatementsnew.segAccounts.rowTemplate = "flxRowDefaultAccounts";
                this.view.viewStatementsnew.segAccounts.widgetDataMap = dataMap;
                var data = this.getViewDataWithSections(accounts);
                this.view.viewStatementsnew.segAccounts.setData(data);
                this.view.viewStatementsnew.segAccounts.onRowClick = this.onAccountSelect.bind(this);
                this.view.viewStatementsnew.forceLayout();
            } else {
                this.view.viewStatementsnew.segAccounts.widgetDataMap = dataMap;
                var data = this.getViewDataWithAccountTypeSections(accounts);
                this.view.viewStatementsnew.segAccounts.setData(data);
                this.view.viewStatementsnew.segAccounts.onRowClick = this.onSelectionOfNewAccount;
                this.view.viewStatementsnew.forceLayout();
            }
        },
        onAccountSelect: function() {
            var account = this.view.viewStatementsnew.segAccounts.selectedRowItems[0];
            this.currentAccountId = account.accountID || account.Account_id;
            this.view.viewStatementsnew.lblAccountIcon.text = account.lblDefaultAccountIcon.text;
            this.view.viewStatementsnew.lblAccountName.text = account.lblDefaultAccountName.text;
            this.view.viewStatementsnew.flxAccounts.setVisibility(false);
        },
        /**
         * Method to Init e-statements view
         * @param {Object} uiData UI data containing current account and all accounts
         */
        initViewStatements: function(uiData) {
            this.view.viewStatementsnew.flxCombinedStatements.isVisible = false;
            this.view.viewStatementsnew.btnConfirm.text = kony.i18n.getLocalizedString("i18n.ViewStatements.BackToAccountDetails");
            this.view.viewStatementsnew.btnCombinedStatements.onClick = this.checkDownloadStatusOfCombinedStatement;
            this.view.viewStatementsnew.flxDownload.onClick = this.DownloadCombinedStatement;
            var isRetailUser = applicationManager.getConfigurationManager().getConfigurationValue('isRBUser') === "true";
            var scopeObj = this;
            this.setYearsToSegment();
            this.updateListBox(uiData);
            this.view.viewStatementsnew.btnModify.onClick = function() {
				var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
							"appName": "HomepageMA",
							"moduleName": "AccountsUIModule"
						});
				var custDashboard = accountsModule.presentationController.customerdashboard;
				if (custDashboard === "true") {
                var navManager = applicationManager.getNavigationManager();
                navManager.navigateTo({
                "appName": "HomepageMA",
                "friendlyName": "AccountsUIModule/frmDashboard"
            });
			} else {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                }).presentationController.showAccountsDashboard();
			}
            }.bind(this)
            this.view.viewStatementsnew.btnConfirm.onClick = function() {
                var btnConfirmText = this.view.viewStatementsnew.btnConfirm.text;
                if (btnConfirmText !== kony.i18n.getLocalizedString("i18n.combinedStatements.GenarateStatement")) {
                    //var accountID = this.currentAccountId;
                    //scopeObj.loadAccountModule().presentationController.fetchUpdatedAccountDetails(accountID);
                    var account = uiData.account;
                    scopeObj.loadAccountModule().presentationController.showAccountDetails(account);
                } else {
                    var AccountServicesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountServicesUIModule");
                    AccountServicesModule.presentationController.navigateToConsolidatedStatements();
                }
                this.view.flxHeading.setVisibility(true);
                this.updateRightContainerUI();
            }.bind(this)
            this.setMonthsData();
            this.view.flxHeading.setVisibility(false);
            FormControllerUtility.hideProgressBar(this.view);
            this.AdjustScreen();
        },
        /**
         * Method to download any given URL data
         * @param {String} downloadUrl Download URL
         */
        downloadUrl: function(downloadUrl) {
            var data = {
                "url": downloadUrl
            };
            CommonUtilities.downloadFile(data);
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmAccountDetailsController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        detailsButtonText: "",
        flagDetailsBtn: false,
        onBreakpointChange: function(width) {
            kony.print('on breakpoint change');
            orientationHandler.onOrientationChange(this.onBreakpointChange);
            this.view.accountSummary.btnBalanceDetails.text = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
            this.view.customheader.onBreakpointChangeComponent(width);
            if (this.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING) || this.accountType === applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING)) {
                this.view.accountSummary.flxCurrentBalanceRight.setVisibility(true);
            } else {
                this.view.accountSummary.flxCurrentBalanceRight.setVisibility(false);
            }
            this.setAccountSumamryFontSizes();
            this.setupFormOnTouchEnd(width);
            this.checkAccountStatus();
            this.view.moreActions.setVisibility(false);
            this.view.accountActionsMobile.setVisibility(false);
            this.view.quicklinksMobile.setVisibility(false); /*quick links Mobile*/
            var scope = this;
            var responsiveFonts = new ResponsiveFonts();
            this.view.flxSecondaryActions.zindex = 100;
            if (this.flagDetails === false) {
                this.detailsButtonText = this.view.accountSummary.btnBalanceDetails.text;
                this.flagDeatils = true;
            }
			if ((width === 640 || orientationHandler.isMobile) ||(width === 1024 || kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)) {
                if (this.accountType == "mortgageFacility" || this.accountType == "Loan") {
                    this.view.flxPrimaryActions.setVisibility(false);
                    this.view.quicklinks.setVisibility(false);
                    this.view.btnScheduledTransfer.text = kony.i18n.getLocalizedString("i18n.Homepage.raiseaRequest");
                    this.view.btnMakeTransfer.text = kony.i18n.getLocalizedString("i18n.mortgageAccount.ChangeRepaymentAccount");
                    this.view.btnScheduledTransfer.onClick = this.actionRaiseARequest;
                    this.view.btnMakeTransfer.onClick = this.actionChangeRepaymentAccount;
                } else {
                    this.view.flxPrimaryActions.setVisibility(false);
                }
                if (!kony.sdk.isNullOrUndefined(this.account.accountStatus) && this.account.accountStatus.toUpperCase() == "CLOSED") {
                    // this.view.quicklinksMobile.setVisibility(true);
                    this.view.flxSecondaryActions.setVisibility(false);
                } else {
                    this.view.quicklinks.setVisibility(false);
                    // this.view.flxSecondaryActions.setVisibility(true);
                }                
                if (this.view.flxViewStatements.isVisible === true) {
                    this.view.flxActions.isVisible = false;
                }                
            }
			this.showSecondaryActionsDropdown();
            if (width === 640 || orientationHandler.isMobile) {
                this.view.flxSearchItemMobile.setVisibility(true);
                this.view.flxSearchItemResponsive.setVisibility(false);
                this.detailsButtonText = this.view.accountSummary.btnBalanceDetails.text;
                this.view.accountSummary.btnBalanceDetails.text = kony.i18n.getLocalizedString("i18n.accountDetail.interestDetail");
                responsiveFonts.setMobileFonts();
                //this.view.flxActions.isVisible = false;
				this.view.flxHeader.height = "50px";
                if (kony.i18n.getCurrentLocale() === "ar_AE") {
                    this.view.flxAccountTypesAndInfo.left = "45%";
                    this.view.flxAccountTypesAndInfo.flexRight.centerX = "70%";
                    this.view.flxAccountTypes.width = "90%";
                }
                this.view.transactions.flxSort.height = "0dp";
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.customheader.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.transfers.accountDetails"), accessibilityConfig);
                //CommonUtilities.setText(this.view.customheader.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.olb.AccountStatements"), accessibilityConfig);
                this.view.btnSecondaryActionsMobile.zIndex = 100;
            //    this.view.btnSecondaryActionsMobile.isVisible = true;
                this.view.accountSummary.skin = "sknFlxffffffShadowdddcdcnoradius"
                    // this.view.transactions.flxTabsChecking.skin = "sknFlxffffffShadowdddcdcnoradius";
                    // this.view.transactions.flxTabsCredit.skin = "sknFlxffffffShadowdddcdcnoradius";
                    // this.view.transactions.flxTabsDeposit.skin = "sknFlxffffffShadowdddcdcnoradius";
                    // this.view.transactions.flxTabsLoan.skin = "sknFlxffffffShadowdddcdcnoradius";
                this.view.transactions.lblTransactions.skin = "slLabel0d8a72616b3cc47";
                this.view.accountSummary.lblAvailableBalanceValue.skin = "sknSSP42424220Px";
                this.transactionsTemplate = "flxSegTransactionsRowSavingsMobile";
                this.transactionsSelectedTemplate = "flxSegTransactionRowSelectedMobile";
                this.checkImagesTemplate = "flxSegCheckImagesMobile";                
                var data = this.view.transactions.segTransactions.data;
                if (data == undefined) return;
                for (var i = 0; i < data.length; i++) {
                    data[i][1].map(function(e) {
                        if (e.template === "flxSegCheckImages") {
                            e.lblToTitle2 = e.lblToTitle;
                            e.lblTypeTitle2 = e.lblTypeTitle;
                            e.lblWithdrawalAmountTitle2 = e.lblWithdrawalAmountTitle;
                            e.template = scope.checkImagesTemplate;
                        } else {
                            e.lblToTitle2 = e.lblToTitle;
                            e.lblTypeTitle2 = e.lblTypeTitle;
                            e.lblWithdrawalAmountTitle2 = e.lblWithdrawalAmountTitle;
                            e.template = scope.transactionsTemplate;
                            e.imgDropdown = ViewConstants.FONT_ICONS.CHEVRON_DOWN
                        }
                    });
                }
                this.view.transactions.segTransactions.setData(data);
            } else if (width === 1366 || width === 1380) {
                this.view.flxSearchItemMobile.setVisibility(false);
                this.view.flxSearchItemResponsive.setVisibility(true);
                this.detailsButtonText = this.view.accountSummary.btnBalanceDetails.text
                responsiveFonts.setDesktopFonts();
                this.view.flxActions.isVisible = true;
                this.view.flxActionsMobile.isVisible = false;
              //  this.view.flxActions.quicklinks.width = "100%";
                if (kony.i18n.getCurrentLocale() === "ar_AE") {
                    //this.view.flxActions.quicklinks.right = "20dp";
                    this.view.flxAccountTypesAndInfo.left = "80%";
                    this.view.flxAccountTypesAndInfo.flexRight.centerX = "-40dp";
                    this.view.flxSecondaryActions.right = "20dp";
                    this.view.summary.right = "";
                    this.view.summary.left = "20dp";
                } else {
                    this.view.flxSearchItemMobile.setVisibility(false);
                    this.view.flxSearchItemResponsive.setVisibility(true);
                    this.view.flxActions.quicklinks.left = "0dp";
                }
                if (this.view.flxViewStatements.isVisible === true) {
                    this.view.flxActions.isVisible = false;
                }
                this.view.transactions.flxSort.height = "40dp";
                this.view.accountSummary.skin = "slfBoxffffffB1R5"
                this.view.transactions.flxTabsChecking.skin = "slFbox";
                this.view.transactions.flxTabsCredit.skin = "slFSbox";
                this.view.transactions.flxTabsDeposit.skin = "slFSbox";
                this.view.transactions.flxTabsLoan.skin = "slFbox";
                this.view.transactions.lblTransactions.skin = "sknSSP42424220Px";
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.customheader.lblHeaderMobile, "", accessibilityConfig);
                this.view.btnSecondaryActionsMobile.isVisible = false;
                this.transactionsTemplate = "flxSegTransactionRowSavings";
                this.transactionsSelectedTemplate = "flxSegTransactionRowSelected";
                this.checkImagesTemplate = "flxSegCheckImages";
                var data = this.view.transactions.segTransactions.data;
                if (data == undefined) return;
                for (var i = 0; i < data.length; i++) {
                    data[i][1].map(function(e) {
                        if (e.template === "flxSegCheckImagesMobile") {
                            e.lblToTitle2 = e.lblToTitle;
                            e.lblTypeTitle2 = e.lblTypeTitle;
                            e.lblWithdrawalAmountTitle2 = e.lblWithdrawalAmountTitle;
                            e.template = scope.checkImagesTemplate
                        } else {
                            e.lblToTitle2 = e.lblToTitle;
                            e.lblTypeTitle2 = e.lblTypeTitle;
                            e.lblWithdrawalAmountTitle2 = e.lblWithdrawalAmountTitle;
                            e.template = scope.transactionsTemplate;
                            e.imgDropdown = ViewConstants.FONT_ICONS.CHEVRON_DOWN
                        }
                    });
                }
                this.view.transactions.segTransactions.setData(data);
            } else {
              /*  this.view.accountTransactionList.left = "6.4%";
                this.view.accountTransactionList.right = "6.4%";
                this.view.accountTransactionList.width = "";*/
            }  
			if(width === 1024 || kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
				if (kony.i18n.getCurrentLocale() === "ar_AE") {
                    this.view.flxSecondaryActions.bottom = "200dp";
                    this.view.flxSecondaryActions.right = "2dp";
                    this.view.summary.right = "";
                    this.view.summary.left = "20dp";
                }
				this.view.summary.width = "92%";
                this.view.summary.left = "27dp";
                this.view.flxActionsMobile.isVisible = false;
              //  this.view.accountTransactionList.left = "27dp";
              //  this.view.accountTransactionList.width = "92%";
			}
            this.showAccountTypesDropdown();
            this.updateRightContainerUI();
            this.AdjustScreen();
        },
        setAccountSumamryFontSizes: function() {
            var keySkin, valueSkin;
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                keySkin = "sknLblSSP72727213px";
                valueSkin = "slLabel0e787cd0f0b534d";
            } else {
                keySkin = "sknLblSSP72727215px";
                valueSkin = "slLabel0d8a72616b3cc47";
            }
            this.view.accountSummary.flxCurrentBalanceRight.right = "0dp";
            this.view.accountSummary.lblTotalCreditsTitle.skin = keySkin;
            this.view.accountSummary.lblTotalDebtsTitle.skin = keySkin;
            this.view.accountSummary.lblDividentRateTitle.skin = keySkin;
            this.view.accountSummary.lblDividentRateYTDTitle.skin = keySkin;
            this.view.accountSummary.lblLastDividentPaidTitle.skin = keySkin;
            this.view.accountSummary.lblPaidOnTitle.skin = keySkin;
            this.view.accountSummary.lblDummyOneTitle.skin = keySkin;
            this.view.accountSummary.lblDummyTwoTitle.skin = keySkin;
            this.view.accountSummary.lblRoutingNumber.skin = keySkin;
            this.view.accountSummary.lblAccountNumber.skin = keySkin;
            this.view.accountSummary.lblIBANCode.skin = keySkin;
            this.view.accountSummary.lblPrimaryHolder.skin = keySkin;
            this.view.accountSummary.lblJointHolderTitle.skin = keySkin;
            this.view.accountSummary.lblSwiftCode.skin = keySkin;
            this.view.accountSummary.lblTotalCreditsValue.skin = valueSkin;
            this.view.accountSummary.lblTotalDebtsValue.skin = valueSkin;
            this.view.accountSummary.lblDividentRateValue.skin = valueSkin;
            this.view.accountSummary.lblDividentRateYTDValue.skin = valueSkin;
            this.view.accountSummary.lblLastDividentPaidValue.skin = valueSkin;
            this.view.accountSummary.lblPaidOnValue.skin = valueSkin;
            this.view.accountSummary.lblDummyOneValue.skin = valueSkin;
            this.view.accountSummary.lblDummyTwoValue.skin = valueSkin;
            this.view.accountSummary.lblRoutingNumberValue.skin = valueSkin;
            this.view.accountSummary.lblAccountNumberValue.skin = valueSkin;
            this.view.accountSummary.lblIBANCodeValue.skin = valueSkin;
            this.view.accountSummary.lblPrimaryHolderValue.skin = valueSkin;
            this.view.accountSummary.lblJointHolderValue.skin = valueSkin;
            this.view.accountSummary.lblSwiftCodeValue.skin = valueSkin;
        },
        setupFormOnTouchEnd: function(width) {
            if (width == 640) {
                this.view.onTouchEnd = function() {}
                this.nullifyPopupOnTouchStart();
            } else {
                if (width == 1024) {
                    this.view.onTouchEnd = function() {}
                    this.nullifyPopupOnTouchStart();
                } else {
                    this.view.onTouchEnd = function() {
                        hidePopups();
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
            //this.view.flxAccountTypes.onClick = null;
            this.view.flxSecondaryActions.onClick = null;
        },
        /**
         * showMobileActions : Mobile only dialog for actions on accounts
         * @member of {frmAccountDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
        showMobileActions: function() {
            if (flag == 1) {
                this.view.accountActionsMobile.isVisible = false;
                //this.view.quicklinksMobile.isVisible = false;/*quick links Mobile*/
                flag = 0;
                this.view.forceLayout();
                return;
            }
            flag = 1;
            var data = [];
            var primary = this.view.flxPrimaryActions.widgets();
            for (var i = 0; i < primary.length; i += 2) {
                if (primary[i].isVisible) {
                    var temp = {
                        "flxAccountTypes": {
                            "onClick": primary[i].onClick
                        },
                        "lblUsers": {
                            "text": primary[i].text,
                            "toolTip": primary[i].text,
                            "accessibilityconfig": {
                                "a11yLabel": primary[i].text
                            }
                        }
                    };
                    data.push(temp);
                }
            }
            var secondaryActions = this.view.moreActions.segAccountTypes.data;
            secondaryActions.forEach(function(e) {
                data.push(e);
            });
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                data = data.filter(function(value, index, arr) {
                    return value["lblUsers"]["text"] !== kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.updateAccountSettings");
                });
            }
            this.view.accountActionsMobile.segAccountTypes.setData(data);
            this.view.accountActionsMobile.isVisible = true;
            //this.view.quicklinksMobile.isVisible = true;/*quick links Mobile*/
            this.AdjustScreen();
        },
        showTabletActions: function() {
            if (this.view.accountActionsMobile.isVisible) {
                this.view.accountActionsMobile.isVisible = false;
                //this.view.quicklinksMobile.isVisible = false; /*quick links Mobile*/
                this.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            } else {
                var data = [];
                var primary = this.view.flxPrimaryActions.widgets();
                if (primary[2].isVisible) {
                    var temp = {
                        "flxAccountTypes": {
                            onClick: primary[2].onClick
                        },
                        "lblUsers": {
                            "text": primary[2].text,
                            "toolTip": primary[2].text
                        }
                    }
                    data.push(temp);
                }
                var secondaryActions = this.view.moreActions.segAccountTypes.data;
                secondaryActions.forEach(function(e) {
                    if (e.lblUsers.text !== primary[2].text) {
                        data.push(e);
                    }
                });
                this.view.accountActionsMobile.segAccountTypes.setData(data);
                this.view.accountActionsMobile.right = "28dp";
                //this.view.quicklinksMobile.right = "28dp"; /*quick links Mobile*/
                this.view.accountActionsMobile.width = this.view.flxSecondaryActions.info.frame.width + "dp";
                //this.view.quicklinksMobile.width = this.view.flxSecondaryActions.info.frame.width + "dp";  /*quick links Mobile*/
                this.view.accountActionsMobile.isVisible = true;
                //this.view.quicklinksMobile.isVisible = true; /*quick links Mobile*/
                this.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_UP;
                var top = this.view.flxActions.info.frame.y + 100;
                if (this.view.flxDowntimeWarning.isVisible) {
                    top = top + 80;
                }
                this.view.accountActionsMobile.top = top + "dp";
                //this.view.quicklinksMobile.top = top + "dp";  /*quick links Mobile*/
                this.view.forceLayout();
            }
        },
        showMobileQuickLinksActions: function() {
            if (this.view.quicklinksMobile.isVisible) {
                this.view.quicklinksMobile.isVisible = false; /*quick links Mobile*/
                this.view.forceLayout();
                return;
            } else {
                this.view.quicklinksMobile.isVisible = true; /*quick links Mobile*/
                this.view.quicklinksMobile.top = "140dp";
                this.AdjustScreen();
            }
        },
        showTabletQuickLinksActions: function() {
            if (this.view.quicklinksMobile.isVisible) {
                this.view.quicklinksMobile.isVisible = false; /*quick links Mobile*/
                this.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            } else {
                //this.view.quicklinksMobile.left = "0dp"; /*quick links Mobile*/
                this.view.quicklinksMobile.width = this.view.flxSecondaryActions.info.frame.width +  40 + "dp"; /*quick links Mobile*/
                this.view.quicklinksMobile.isVisible = true; /*quick links Mobile*/
                this.view.imgSecondaryActions.src = ViewConstants.IMAGES.ARRAOW_UP;
                var top = this.view.flxActions.info.frame.y + 100;
                if (this.view.flxDowntimeWarning.isVisible) {
                    top = top + 80;
                }
              	this.view.lblSecondaryActions.left = "0dp";
				this.view.lblSecondaryActions.right = "0dp";
              	 if (kony.application.getCurrentBreakpoint() == 1024 || OrientationHandler.isTablet) {
                   //this.view.quicklinksMobile.centerX = "49.5%";
                   if (this.view.flxRenewExpired.isVisible === true && this.view.flxDowntimeWarning.isVisible === true) {
						this.view.quicklinksMobile.top = "205dp";
					} else if (this.view.flxRenewExpired.isVisible === true || this.view.flxDowntimeWarning.isVisible === true) {
						this.view.quicklinksMobile.top = "185dp";
					} else {
                    	this.view.quicklinksMobile.top = "55dp";
                    }
                } else if (kony.application.getCurrentBreakpoint() == 640 || OrientationHandler.isMobile) {
                    this.view.quicklinksMobile.top = "5dp";
                  	this.view.quicklinksMobile.left = "0dp";
                  	this.view.quicklinksMobile.flxMain.left = "10dp";
                  	this.view.quicklinksMobile.flxMain.width = "100%";
                  	this.view.quicklinksMobile.width = "310dp";
					this.view.quicklinksMobile.centerX = "50%";
                } else {
                  this.view.quicklinksMobile.top = top + "dp"; /*quick links Mobile*/
                }
                this.view.forceLayout();
            }
            this.AdjustScreen();
        },
        /* Function to segregate accounts for view statements accounts dropdown
         */
        getAccountsDropdownDataWithSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = [];
            var business = kony.i18n.getLocalizedString("i18n.accounts.Business");
            var personal = kony.i18n.getLocalizedString("i18n.accounts.Personal");
            accounts.forEach(function(account) {
                var accountType = personal;
                if (account.isBusinessAccount === "true") {
                    if (kony.sdk.isNullOrUndefined(account.MembershipName)) accountType = business;
                    else accountType = account.MembershipName;
                }
                if (finalData.hasOwnProperty(accountType)) {
                    if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                        finalData[accountType][1].pop();
                    }
                    finalData[accountType][1].push(scopeObj.createSegmentData(account));
                } else {
                    prioritizeAccountTypes.push(accountType);
                    finalData[accountType] = [{
                            lblAccountRoleType: accountType === personal ? "s" : "r",
                            lblAccountTypeHeader: {
                                text: accountType,
                                left: "20dp"
                            },
                            flxAccountRoleType: {
                                "isVisible": false
                            },
                            template: "flxDefaultAccountsHeader"
                        },
                        [scopeObj.createSegmentData(account)]
                    ];
                }
            });
            return this.sortAccountData(finalData);
        },
        /*Row data for dropdown
         */
        createSegmentData: function(account) {
            var updatedAccountID;
            var truncatedAccountName = CommonUtilities.getAccountName(account);
            truncatedAccountName = truncatedAccountName.substring(0, 27);
            var accountID = account.accountID;
            var externalaccountID = accountID.substring(accountID.length, accountID.indexOf('-'));
            if (account.externalIndicator && account.externalIndicator === "true") {
                updatedAccountID = externalaccountID;
            } else {
                updatedAccountID = account.accountID
            }
            var dataObject = {
                "lblDefaultAccountName": CommonUtilities.mergeAccountNameNumber(truncatedAccountName, updatedAccountID),
                "accountID": account.Account_id || account.accountID || account.accountNumber,
                "lblDefaultAccountIcon": {
                    "isVisible": (this.profileAccess === "both") ? true : false,
                    "text": account.isBusinessAccount === "true" ? "r" : "s",
                    "accessibilityConfig": {
                        "a11yHidden": true,
                        "a11yARIA": {
                            tabindex: -1
                        }
                    }
                }, //account.isBusinessAccount === "true" ? "r" : "s",
                "flxRowDefaultAccounts": {
                    "isVisible": true,
                    "onClick": this.loadAccountModule().presentationController.showAccountDetails.bind(this.loadAccountModule().presentationController, account),
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "role": "button",
                            "aria-labelledby": "lblDefaultAccountName"
                        }
                    }
                }
            };
            return dataObject;
        },
        sortAccountData: function(finalData) {
            var data = [];
            var prioritizeAccountRoleTypes = [];
            var viewType = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');
            var sections = Object.keys(finalData);
            var index = sections.indexOf(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
            if (index > -1) {
                sections.splice(index, 1);
            }
            prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
            prioritizeAccountRoleTypes = prioritizeAccountRoleTypes.concat(sections);
            this.sectionData = [];
            for (var i = 0; i < prioritizeAccountRoleTypes.length; i++) {
                var accountType = prioritizeAccountRoleTypes[i];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                }
            }
            for (var i = 0; i < data.length; i++) {
                var accoountTypeOrder = applicationManager.getTypeManager().getAccountTypesByPriority();
                var sortedData = data[i][1];
                sortedData.sort(function(a, b) {
                    return accoountTypeOrder.indexOf(a.lblAccountType) - accoountTypeOrder.indexOf(b.lblAccountType);
                });
                data[i][1] = sortedData;
            }
            return data;
        },
        /**
         * creates segment with account numbers and other details with particular header values
         */
        getDataWithSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser;
            var prioritizeAccountTypes = [];
            //       if(isCombinedUser==="true"){
            prioritizeAccountTypes.push("Personal Accounts");
            //         }
            accounts.forEach(function(account) {
                var accountType = "Personal Accounts";
                if (account.isBusinessAccount === "false") {
                    //                     if(!kony.sdk.isNullOrUndefined(primaryCustomerId)){
                    if (scopeObj.primaryCustomerId.id === account.Membership_id && scopeObj.primaryCustomerId.type === 'personal') {
                        accountType = "Personal Accounts";
                        //             accountTypeIcon = "s";
                    }
                    //                      }
                    else {
                        accountType = account.Membership_id;
                        //             accountTypeIcon = "s";
                    }
                } else {
                    accountType = account.Membership_id;
                    //           accountTypeIcon = "r";
                }
                if (finalData.hasOwnProperty(accountType) && account.Membership_id === finalData[accountType][0]["membershipId"]) {
                    if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                        finalData[accountType][1].pop();
                    }
                    finalData[accountType][1].push(scopeObj.createCombinedAccountListSegmentsModel(account));
                } else {
                    if (accountType != "Personal Accounts") prioritizeAccountTypes.push(accountType);
                    finalData[accountType] = [{
                            lblTransactionHeader: accountType === "Personal Accounts" ? accountType : account.MembershipName,
                            flxTransfersFromListHeader: {
                                "isVisible": false
                            },
                            lblSeparator: {
                                "isVisible": "true"
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this),
                                "isVisible": false
                            },
                            template: "flxTransfersFromListHeader",
                            membershipId: account.Membership_id
                        },
                        [scopeObj.createCombinedAccountListSegmentsModel(account)]
                    ];
                }
            });
            var data = [];
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                }
            }
            return data;
        },
        /*create segment data with account type grouping
         */
        getDataWithAccountTypeSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function(account) {
                var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                if (finalData.hasOwnProperty(accountType)) {
                    finalData[accountType][1].push(scopeObj.createCombinedAccountListSegmentsModel(account));
                    var totalAccount = finalData[accountType][1].length;
                    finalData[accountType][0].lblAccountTypeNumber = {
                        "text": "(" + totalAccount + ")"
                    }
                } else {
                    finalData[accountType] = [{
                            lblTransactionHeader: {
                                text: accountType,
                                left: "10dp"
                            },
                            lblSeparator: {
                                "isVisible": "true"
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this),
                                "isVisible": false
                            },
                            template: "flxTransfersFromListHeader",
                        },
                        [scopeObj.createCombinedAccountListSegmentsModel(account)]
                    ];
                }
            });
            this.sectionData = [];
            var data = [];
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                }
            }
            return data;
        },
        /**
         * creates segment with account numbers and other details with particular header values for view statements
         */
        getViewDataWithSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser;
            var prioritizeAccountTypes = [];
            //       if(isCombinedUser==="true"){
            prioritizeAccountTypes.push("Personal Accounts");
            //         }
            accounts.forEach(function(account) {
                var accountType = "Personal Accounts";
                if (account.isBusinessAccount === "false") {
                    //                     if(!kony.sdk.isNullOrUndefined(primaryCustomerId)){
                    if (scopeObj.primaryCustomerId.id === account.Membership_id && scopeObj.primaryCustomerId.type === 'personal') {
                        accountType = "Personal Accounts";
                        //             accountTypeIcon = "s";
                    }
                    //                      }
                    else {
                        accountType = account.Membership_id;
                        //             accountTypeIcon = "s";
                    }
                } else {
                    accountType = account.Membership_id;
                    //           accountTypeIcon = "r";
                }
                if (finalData.hasOwnProperty(accountType) && account.Membership_id === finalData[accountType][0]["membershipId"]) {
                    if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                        finalData[accountType][1].pop();
                    }
                    finalData[accountType][1].push(scopeObj.createSegmentsRowModel(account));
                } else {
                    if (accountType != "Personal Accounts") prioritizeAccountTypes.push(accountType);
                    finalData[accountType] = [{
                            lblTransactionHeader: accountType === "Personal Accounts" ? accountType : account.MembershipName,
                            lblSeparator: {
                                "isVisible": "true"
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this),
                                "isVisible": false
                            },
                            template: "flxTransfersFromListHeader",
                            membershipId: account.Membership_id
                        },
                        [scopeObj.createSegmentsRowModel(account)]
                    ];
                }
            });
            var data = [];
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                }
            }
            return data;
        },
        /*create segment data with account type grouping for view statements
         */
        getViewDataWithAccountTypeSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function(account) {
                var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                if (finalData.hasOwnProperty(accountType)) {
                    finalData[accountType][1].push(scopeObj.createSegmentsRowModel(account));
                    var totalAccount = finalData[accountType][1].length;
                    finalData[accountType][0].lblAccountTypeNumber = {
                        "text": "(" + totalAccount + ")"
                    }
                } else {
                    finalData[accountType] = [{
                            lblTransactionHeader: {
                                text: accountType,
                                left: "10dp"
                            },
                            lblSeparator: {
                                "isVisible": "true"
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this),
                                "isVisible": false
                            },
                            template: "flxTransfersFromListHeader",
                        },
                        [scopeObj.createSegmentsRowModel(account)]
                    ];
                }
            });
            this.sectionData = [];
            var data = [];
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                }
            }
            return data;
        },
        /**
         * It shows or hides the particular section 
         */
        showOrHideAccountRows: function(context) {
            var section = context.rowContext.sectionIndex;
            var segData = this.view.segTransferFrom.data;
            var isRowVisible = true;
            if (segData[section][0].imgDropDown.text === "O") {
                segData[section][0]["imgDropDown"] = {
                    text: "P"
                };
                isRowVisible = true;
            } else {
                segData[section][0]["imgDropDown"] = {
                    text: "O"
                };
                isRowVisible = false;
            }
            for (var i = 0; i < segData[section][1].length; i++) {
                var flxAccountListItem = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountListItem));
                flxAccountListItem["isVisible"] = isRowVisible;
                this.updateKeyAt("flxAccountListItem", flxAccountListItem, i, section);
            }
            segData = this.view.segTransferFromData;
            this.view.segTransferFrom.setSectionAt(segData[section], section);
        },
        dowloandEFSFile: function(documentid, fileNameToDisplay) {
            this.formURL(documentid, fileNameToDisplay);
        },
        formURL: function(documentid, fileNameToDisplay) {
            var fileid;
            var fileName;
            if (documentid != null && documentid != undefined, fileNameToDisplay != null && fileNameToDisplay != undefined) {
                fileid = documentid;
                fileName = fileNameToDisplay;
            }
            var params = {
                "id": fileid,
                "revision": "1"
            };
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
            accountsModule.presentationController.getfileId(params, fileName);
        },
        statementsURL: function(fileIdEstatements, fileName) {
            var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url
            var serviceURL = mfURL + "/objects/EStatements?";
            var paramURL = "mediaType=" + "pdf";
            paramURL = paramURL + "&fileName=" + fileName;
            paramURL = paramURL + "&fileId=" + fileIdEstatements;
            var data = {};
            data.url = serviceURL + paramURL;
            //this.dowloadwithurl(data,fileName, "pdf" );
            this.dowloadwithurl(data);
        },
        combinedstatementsURL: function(response) {
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false
                }
            });
            var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
            var serviceURL = mfURL + "/objects/CombinedStatements?";
            var paramURL = "fileType=" + response.fileType;
            paramURL = paramURL + "&fileName=" + response.fileName;
            paramURL = paramURL + "&id=" + response.id;
            var data = {};
            data.url = serviceURL + paramURL;
            //this.dowloadwithurl(data,response.fileName,response.fileType);
            this.dowloadwithurl(data);
        },
        //   dowloadwithurl: function(data,fileName,fileType) {
        //     if (data) {
        //       if (data.url) {
        //         this.combinedStatementsDownloadService(data.url, fileName,fileType);
        //       } else {
        //         return "Url is Invalid : " + data.url;
        //       }
        //     }
        //   },
        dowloadwithurl: function(data) {
            if (data) {
                if (data.url) {
                    var element = document.createElement('a');
                    element.setAttribute('href', data.url);
                    element.setAttribute('download', data.filename || 'download');
                    element.setAttribute('target', '_blank'); //Tmp fix : Chrome blocked cross orgin download- so in chrome we are opening the file in new window.
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                } else {
                    return "Url is Invalid : " + data.url;
                }
            }
        },
        combinedStatementsDownloadService: function(mfDownloadURL, fileName, fileType) {
            try {
                var self = this;
                var authToken = KNYMobileFabric.currentClaimToken;
                var xhr = new kony.net.HttpRequest();
                xhr.open('GET', mfDownloadURL, true);
                xhr.setRequestHeader("X-Kony-Authorization", authToken);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.responseType = "blob";
                xhr.onReadyStateChange = function() {
                    try {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            self.combinedStatementsDownloadResponse(xhr.response, fileName, fileType);
                        } else if (xhr.status !== 200) {
                            kony.print(" ERROR: Error downloadin csv");
                        }
                    } catch (err) {
                        kony.print(" ERROR:" + err);
                    }
                };
                xhr.send();
            } catch (err) {
                kony.print(" ERROR:" + err);
            }
        },
        combinedStatementsDownloadResponse: function(csvData, fileName, fileType) {
            var format = "";
            switch (fileType) {
                case "csv":
                    format = "text/csv;charset=utf-8,";
                    break;
                case "xlsx":
                    format = "text/csv;charset=utf-8,";
                    break;
                case "pdf":
                    format = "text/csv;charset=utf-8,";
                    break;
            }
            var blobObj = new Blob([csvData], {
                type: format
            });
            var url = URL.createObjectURL(blobObj);
            var downloadLink = document.createElement("a");
            downloadLink.setAttribute('href', url);
            downloadLink.download = fileName + "." + fileType;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            kony.print("----" + fileType + "file downloaded----");
        },
        getMonthlyStatementData: function(individualMonthStatements) {
            var statementId;
            var statementDetails;
            var fileNameToDisplay;
            var data = [];
            for (var key in individualMonthStatements) {
                statementDetails = individualMonthStatements[key].split('/');
                fileNameToDisplay = statementDetails[0];
                statementId = statementDetails[1];
                var rowData = {
                    "btnStatement1": {
                        "text": fileNameToDisplay,
                        "accessibilityconfig": {
                            "a11yLabel": fileNameToDisplay
                        },
                        "onClick": this.dowloandEFSFile.bind(this, statementId, fileNameToDisplay)
                    }
                }
                data.push(rowData);
            }
            return data;
        },
        closeMoreActionPopUp: function() {
            this.view.moreActions.setVisibility(false);
        },
        closeAccountTypesPopUp: function() {
            if (this.isSingleCustomerProfile) {
                this.view.accountTypes.isVisible = false;
                this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            } else {
                this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                this.view.flxAccountTypesSection.isVisible = false;
            }
        },
        showAccountStatements: function() {
            var scope = this;
            var configManager = applicationManager.getConfigurationManager();
			var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "HomepageMA",
                "moduleName": "AccountsUIModule"
            });
			if(accountsModule.presentationController.showbackNavigation === false){           
              this.view.flxBackNavigation.isVisible = false;
            }
            var combinedStatements = configManager.checkUserPermission('VIEW_COMBINED_STATEMENTS');
            var eStatements = configManager.checkUserPermission('VIEW_ESTATEMENTS');
            if (combinedStatements === true && eStatements === false) {
                if (kony.application.getCurrentBreakpoint() === 640) {
                    scope.view.viewStatementsnew.btnCombinedStatements.skin = "sknBtnSSP42424213SelectedTabBold";
                } else {
                    scope.view.viewStatementsnew.btnCombinedStatements.skin = "sknBtnSSP42424217PxSelectedTab";
                }
                scope.view.viewStatementsnew.btnEStatements.isVisible = false;
                scope.checkDownloadStatusOfCombinedStatement();
            } else if (combinedStatements === false && eStatements === true) {
                scope.view.viewStatementsnew.btnCombinedStatements.setVisibility(false);
            }
            this.AdjustScreen();
        },
        showEStatement: function() {
            this.view.viewStatementsnew.flxYears.setVisibility(false);
            this.view.viewStatementsnew.flxAccounts.setVisibility(false);
            try {
                if (kony.application.getCurrentBreakpoint() === 640) {
                    this.view.viewStatementsnew.btnEStatements.skin = "sknBtnSSP42424213SelectedTabBold";
                    this.view.viewStatementsnew.btnCombinedStatements.skin = "sknBtnSSPRegularXUnselectedTab";
                } else {
                    this.view.viewStatementsnew.btnEStatements.skin = "sknBtnSSP42424217PxSelectedTab";
                    this.view.viewStatementsnew.btnCombinedStatements.skin = "sknBtnSSP72727217PxUnSelectedTab";
                }
                this.view.viewStatementsnew.flxMain.isVisible = true;
                this.view.viewStatementsnew.flxCombinedStatements.isVisible = false;
                this.view.viewStatementsnew.btnConfirm.text = kony.i18n.getLocalizedString("i18n.ViewStatements.BackToAccountDetails");
                this.view.viewStatementsnew.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.ViewStatements.BackToAccountDetails");
                this.AdjustScreen();
            } catch (err) {
                kony.print(err);
            }
        },
        showCombinedStatement: function() {
            try {
                if (kony.application.getCurrentBreakpoint() === 640) {
                    this.view.viewStatementsnew.btnEStatements.skin = "sknBtnSSPRegularXUnselectedTab";
                    this.view.viewStatementsnew.btnCombinedStatements.skin = "sknBtnSSP42424213SelectedTabBold";
                } else {
                    this.view.viewStatementsnew.btnEStatements.skin = "sknBtnSSP72727217PxUnSelectedTab";
                    this.view.viewStatementsnew.btnCombinedStatements.skin = "sknBtnSSP42424217PxSelectedTab";
                }
                this.view.viewStatementsnew.flxMain.isVisible = false;
                this.view.viewStatementsnew.flxCombinedStatements.isVisible = true;
                this.view.viewStatementsnew.btnConfirm.text = kony.i18n.getLocalizedString("i18n.combinedStatements.GenarateStatement");
                this.view.viewStatementsnew.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.combinedStatements.GenarateStatement");
                this.AdjustScreen();
            } catch (err) {
                kony.print(err);
            }
        },
        DownloadCombinedStatement: function() {
            var self = this;
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true
                }
            });
            var payload = {
                "fileId": this.view.viewStatementsnew.imgDownload.fileId
            };
            //this.loadAccountModule().presentationController.DownloadCombinedStatement(payload)
            this.loadAccountModule().presentationController.getcombinedstatements(payload)
        },
        checkDownloadStatusOfCombinedStatement: function() {
            var self = this;
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true
                }
            });
            var payload = {};
            payload.userId = applicationManager.getUserPreferencesManager().getUserObj().userId;
            this.loadAccountModule().presentationController.checkDownloadStatusOfCombinedStatement(payload, function sucess(data) {
                self.checkDownloadStatusOfCombinedStatementSucCallback(data);
            }, function failure(data) {
                applicationManager.getNavigationManager().updateForm({
                    showLoadingIndicator: {
                        status: false
                    }
                })
                self.checkDownloadStatusOfCombinedStatementFailureCallback(data);
            })
        },
        checkDownloadStatusOfCombinedStatementSucCallback: function(res) {
            this.showCombinedStatement();
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false
                }
            });
            if (res.status !== undefined && res.fileId !== undefined && res.fileName !== undefined) {
                var date = new Date(res.generatedDate);
                var outputDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
                this.view.viewStatementsnew.flxFileDownload.setVisibility(true);
                this.view.viewStatementsnew.lbnFileName.text = res.fileName;
                this.view.viewStatementsnew.imgDownload.fileId = res.fileId;
                this.view.viewStatementsnew.lblGeneratedOnDate.text = outputDate;
                this.view.viewStatementsnew.lblDownload.text = this.getDownloadStatusMessage(res.status);
                this.view.viewStatementsnew.imgFileType.src = this.getImageByType(res.fileType);
                this.view.viewStatementsnew.imgDownload.src = this.getDownloadStatusImage(res.status);
                if (res.status === "Success") {
                    this.view.viewStatementsnew.lblInfoMessage.text = kony.i18n.getLocalizedString("i18n.olb.ViewStatementInfoWithHyphen");
                    this.view.viewStatementsnew.flxDownload.setEnabled(true);
                } else if (res.status === "InProgress") {
                    this.view.viewStatementsnew.lblInfoMessage.text = kony.i18n.getLocalizedString("i18n.accountStatements.statementDownloadProgress");
                    this.view.viewStatementsnew.flxDownload.setEnabled(false);
                } else if (res.status === "Failed") {
                    this.view.viewStatementsnew.lblInfoMessage.text = kony.i18n.getLocalizedString("i18n.accountStatements.statementFailed");
                    this.view.viewStatementsnew.flxDownload.setEnabled(false);
                }
                //To-Do Need to give this skin
                //this.view.viewStatementsnew.flxFileDownload.skin="";
            } else {
                this.view.viewStatementsnew.lblInfoMessage.text = kony.i18n.getLocalizedString("i18n.accountStatements.noStatementAvailable");
                this.view.viewStatementsnew.flxFileDownload.setVisibility(false);
            }
            this.view.viewStatementsnew.flxDownload.accessibilityConfig = {
                "a11yLabel": this.view.viewStatementsnew.lbnFileName.text + " " + this.view.viewStatementsnew.lblDownload.text,
                "a11yARIA": {
                    role: "button"
                }
            }
        },
        checkDownloadStatusOfCombinedStatementFailureCallback: function(response) {
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false
                }
            })
        },
        getImageByType: function(type) {
            var image;
            switch (type) {
                case "pdf":
                    image = ViewConstants.IMAGES.PDF_IMAGE;
                    break;
                case "csv":
                    image = ViewConstants.IMAGES.CSV_IMAGE;
                    break;
                case "xlsx":
                    image = ViewConstants.IMAGES.XLS_IMAGE;
                    break;
            }
            return image;
        },
        getDownloadStatusMessage: function(status) {
            //Change to i18N Keys
            var downloadstatus;
            switch (status) {
                case "Success":
                    downloadstatus = kony.i18n.getLocalizedString("i18n.common.Download");
                    break;
                case "InProgress":
                    downloadstatus = kony.i18n.getLocalizedString("i18N.common.inProgress");
                    break;
                case "Failed":
                    downloadstatus = kony.i18n.getLocalizedString("i18n.common.failed");
                    break;
            }
            return downloadstatus;
        },
        getDownloadStatusImage: function(status) {
            var image;
            switch (status) {
                case "Success":
                    image = "download_2x.png";
                    break;
                case "InProgress":
                    image = "inprogress.png"; //"centralize_location_blue.png";
                    break;
                case "Failed":
                    image = "aa_password_error.png";
                    break;
            }
            return image;
        },
		updateBlockedTransactions: function(transactionDetails) {
            var scope = this;
            var transactions = [];
          	var formatUtil = applicationManager.getFormatUtilManager();
          	this.view.flxSearch.setVisibility(true);
          	this.enableDisableDownload(true);
          	this.view.segTransactionList.setVisibility(true);
            this.view.flxNoTransactions.setVisibility(false);
          	this.view.flxSortOptions.setVisibility(false);
          	this.view.flxBlockedSortOptions.setVisibility(true);
            this.view.PaginationContainer.setVisibility(true);
            this.view.flxPaginationContainer.setVisibility(true);
			this.view.segTransactionList.setData([]);
          	this.view.lblInfoText.text = kony.i18n.getLocalizedString("i18n.accounts.showingBlockedTransactions");
            this.view.lblReferenceNumber.text = kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber");
            this.view.lblFromDate.text = kony.i18n.getLocalizedString("i18n.accounts.fromDate");
            this.view.lblToDate.text = kony.i18n.getLocalizedString("i18n.accounts.toDate");
            if (transactionDetails.transactions !== undefined) {
                var tranList = transactionDetails.transactions;
            } else {
                var tranList = transactionDetails
            }
         
            if (tranList && tranList.length > 0) {
				transactions = tranList;
              	this.cacheUtils.setData(transactions);
                  this.blockedFundsData = transactions;
                var dataMap = {
                    "flxRowGroup": "flxRowGroup",
                    "flxCollapsedView": "flxCollapsedView",
                    "flxCheveron": "flxCheveron",
                    "lblCheveron": "lblCheveron",
                    "flxCollapsedContent": "flxCollapsedContent",
                    "flxSep": "flxSep",
                    "flxExpandedView": "flxExpandedView",
                    "lblRefNumber": "lblRefNumber",
                    "lblTransDate": "lblTransDate",
                    "lblStrip": "lblStrip",
                    "lblDisupute": "lblDisupute",
                    "lblDownload": "lblDownload",
                    "lbl1": "lbl1",
                    "lbl2": "lbl2",
                    "lbl3": "lbl3",
                    "lbl4": "lbl4",
                    "lbl5": "lbl5",
                  	"flxSeparator": "flxSeparator",
					"lblBal": "lblBal",
					"lblBalancevalue": "lblBalancevalue",
					"lblType": "lblType",
					"lblTypeValue": "lblTypeValue",
					"lblDescValue": "lblDescValue",
					"lblTransaction": "lblTransaction",
					"lblTransDate": "lblTransDate",
					"lblRefNum": "lblRefNum",
					"lblRefNumber": "lblRefNumber",
					"lblActions": "lblActions",
					"lblDisupute": "lblDisupute",
					"lblDownload": "lblDownload",
					"flx1" : "flx1",
					"flx2" : "flx2",
					"flx3" : "flx3",
					"flx4" : "flx4",
					"flx5" : "flx5",
					"flx6" : "flx6",
                }
                this.view.segTransactionList.widgetDataMap = dataMap;
				if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                  	this.view.lblReferenceNumber.left = "28%";
                  	this.view.lblReferenceNumber.width = "65%";
                    this.view.imgAmt.left = "149dp";
                    this.view.lblAmt.left = "85dp";
                    this.view.segTransactionList.rowTemplate = "flx5ColumnTemplateChangeMobile";
                    var data = transactions.map(function(res) {
                        return {
                            "lbl1": {
                                "text": res.transactionReference
                            },
                            "lbl2": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.lockedAmount, res.transactionCurrency?res.transactionCurrency:scope.accountCurrency)
                            },
                            "lblBal": {
                                "text": kony.i18n.getLocalizedString("i18n.accounts.fromDate")
                            },
                            "lblBalancevalue": {
                                "text": !kony.sdk.isNullOrUndefined(res.fromDate) ? formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.fromDate)) : ""
                            },
                            "lblType": {
                                "text": kony.i18n.getLocalizedString("i18n.accounts.toDate")
                            },
                            "lblTypeValue": {
                                "text": !kony.sdk.isNullOrUndefined(res.toDate) ? formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.toDate)) : ""
                            },
                            "lblDescValue": {
                                "text": res.lockReason
                            },
                            "flx4": {
                                "isVisible": false
                            },
                            "flx5": {
                                "isVisible": false
                            },
                            "flx6": {
                                "isVisible": false
                            },
                            "flxSeparator": {
                                "isVisible": true
                            },
                            "flxSep": {
                                "isVisible": false
                            },
                            "flxExpandedView": {
                                "isVisible": false
                            },
                            "lblDownload": {
                                "isVisible": false
                            },
                            "lblCheveron": {
                                  "text": "O"
                            },
                            "flxCheveron": {
                                "onClick": function(eventobject, segInfo, xcoord, context) {
                                    scope.showTransactionDetails(segInfo);
                                }.bind(this),
                                "accessibilityConfig": {
                                    "a11yLabel": "Show more details for reference number" + res.lockedEventId,
                                    "a11yARIA": {
                                        "aria-expanded": false,
                                        "role": "button"
                                    }
                                }
                            },
                        }
                    });
                }else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                  this.view.segTransactionList.rowTemplate = "flx5ColumnTemplateTablet";
                  var data = transactions.map(function(res) {
                      return {
                          "lbl1": {
                              "text": res.transactionReference
                          },
                          "lbl2": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.lockedAmount, res.transactionCurrency?res.transactionCurrency:scope.accountCurrency)
                          },
                          "lbl3": {
                              "text": !kony.sdk.isNullOrUndefined(res.fromDate) ? formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.fromDate)) : ""
                          },
                          "lbl4": {
                              "text": !kony.sdk.isNullOrUndefined(res.toDate) ? formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.toDate)) : ""
                          },
                          "lblDescValue": {
                              "text": res.lockReason,
                          },
                          "lblTransaction": {
                              "isVisible": false
                          },
                          "lblTransDate": {
                              "isVisible": false
                          },
                          "lblRefNum": {
                              "isVisible": false
                          },
                          "lblRefNumber": {
                              "isVisible": false
                          },
                          "lblActions": {
                              "isVisible": false
                          },
                          "lblDisupute": {
                              "isVisible": false
                          },
                          "lblDownload": {
                              "isVisible": false
                          },
                          "lblCheveron": {
                              "text": 'O'
                          },
                          "flxSeparator": {
                              "isVisible": true
                          },
                          "flxSep": {
                              "isVisible": false
                          },
                          "flxExpandedView": {
                              "isVisible": false
                          },
                          "flxCheveron": {
                              "onClick": function(eventobject, segInfo, xcoord, context) {
                                  scope.showTransactionDetails(segInfo);
                              }.bind(this),
                              "accessibilityConfig": {
                                "a11yLabel": "Show more details for reference number" + res.lockedEventId,
                                "a11yARIA": {
                                    "aria-expanded": false,
                                    "role": "button"
                                }
                            }
                          },
                      }
                  });
            } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() > 1366 ){
					this.view.flxReferenceNumber.left = "5%";
                    this.view.flxReferenceNumber.width = "14%";
					this.view.flxAmt.left = "24%";
                    this.view.flxAmt.width = "15%";
					this.view.flxFromDate.left = "36.5%";
                    this.view.flxFromDate.width = "12%";
					this.view.imgFromDate.left = "51%";
					this.view.flxToDate.left = "45%";
                    this.view.flxToDate.width = "13%";
					this.view.flxDesc.left = "55%";
                    this.view.flxDesc.width = "15%";
                    this.view.segTransactionList.rowTemplate = "flx5ColumnTemplateChangeDesktop";
                    var data = transactions.map(function(res) {
                        return {
                            "lbl1": {
                                "text": res.transactionReference,
                                "width": "14%"
                            },
                            "lbl2": {
                                "text": formatUtil.formatAmountandAppendCurrencySymbol(res.lockedAmount, res.transactionCurrency?res.transactionCurrency:scope.accountCurrency)
                            },
                            "lbl3": {
                                "text": !kony.sdk.isNullOrUndefined(res.fromDate) ? formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.fromDate)) : ""
                            },
                            "lbl4": {
                                "text": !kony.sdk.isNullOrUndefined(res.toDate) ? formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(res.toDate)) : ""
                            },
                            "lbl5": {
                                "text": res.lockReason
                            },
                            "flxCheveron": {
                                "accessibilityConfig": {
                                    "a11yLabel": ""
                                }
                            },
                            "lblCheveron": {
                                  "text": ""
                            },
                            "flxSeparator": {
                                "isVisible": true
                            },
                            "flxSep": {
                                "isVisible": false
                            },
                            "flxExpandedView": {
                                "isVisible": false
                            },							
							"lblStrip": {
								"isVisible": false
							}
                        }
                    });
                }
                this.view.segTransactionList.setData(data);
                if (this.performBlockedSearch) {
                if (data.length != 0) {
                    this.view.segTransactionList.setData(data);
                    this.searchData = data;
                } else {
                    if (this.transactionSearcCriteria.offset > 1) {
                        this.transactionSearcCriteria.offset--;
                    }
                    this.view.segTransactionList.setData(this.searchData);
                    if (this.isNextFlow == false) {
                        this.view.segTransactionList.setVisibility(false);
                        this.view.flxNoTransactions.setVisibility(true);
                        this.view.PaginationContainer.setVisibility(false);
                        this.view.flxPaginationContainer.setVisibility(false);
                        this.view.flxSortOptions.setVisibility(false);
                    }
                }
                this.setSearchPagination({
                    'show': true,
                    'offset': this.transactionSearcCriteria.offset
                }, this.blockedFundsData);
            } else {
                this.setPagination({
                    'show': true,
                    'offset': this.offset
                }, this.blockedFundsData);
                this.view.segTransactionList.setData(data.slice(this.offset, this.lastRecord));
                if (data.length == 0) {
                    this.view.segTransactionList.setVisibility(false);
                    this.view.flxNoTransactions.setVisibility(true);
                }
            }
               
            } else{
               this.enableDisableDownload(false);
               this.view.segTransactionList.setVisibility(false);
               this.view.flxNoTransactions.setVisibility(true);
               this.view.PaginationContainer.setVisibility(false);
               this.view.flxPaginationContainer.setVisibility(false);
               this.view.flxSortOptions.setVisibility(false);
                  }
               FormControllerUtility.hideProgressBar(this.view);
               this.AdjustScreen();
        },
		
	resetSortingImages: function(){
      var self =this;
      try
      {
        this.view.imgDateSort.src = "sorting.png";
        this.view.imgAmountSort.src = "sorting.png";
        this.view.imgTypeSort.src = "sorting.png";        
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the sorting images",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
	
    resetBlockedTransSortingImages: function(){
      var self =this;
      try
      {
        this.view.imgFromDate.src = "sorting.png";
        this.view.imgAmt.src = "sorting.png";
        this.view.imgToDate.src = "sorting.png";        
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the sorting images",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    
    resetLoanTransSortingImages: function() {
            var self = this;
            try {
                this.view.imgDateSortl.src = "sorting.png";
                this.view.imgAmountSortl.src = "sorting.png";
                this.view.imgInterestSort.src = "sorting.png";
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in setting the sorting images",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
    },
      
	flxDateonClick: function(){
      var self = this;
      try
      {
        var image= "sorting.png";
        this.criteria["sortBy"] = "transactionDate";
		this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgDateSort.src === "sorting_next.png" || this.view.imgDateSort.src === "sorting.png")
        {
          image = "sorting_previous.png",
          this.criteria["order"] = "asc";
            this.view.flxDateSort.accessibilityConfig = {
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "Date column. Sorted in ascending order. Click to Sort in Descending order."
            }
        }
        else if (this.view.imgDateSort.src === "sorting_previous.png") {
            image = "sorting_next.png",
                this.criteria["order"] = "desc";
            this.view.flxDateSort.accessibilityConfig = {
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "Date column. Sorted in descending order. Click to Sort in Ascending order."
            }
        }
        this.resetSortingImages();
        this.view.imgDateSort.src = image;
        this.getCacheData();
        if(this.offset === 0)
           this.updateTransactions(this.cacheUtils._sortedData);
		else{
          var values = {
                  'show': true,
                  'offset': this.offset
                  };
          this.onFirst(values, this.cacheUtils._sortedData);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 1 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
      
    flxAmountOnClick: function() {
       var self = this;
 	   try {
         var image = "sorting.png";
         this.criteria["sortBy"] = "amount";
         this.criteria["order"] = "desc";
         this.state = "sortedData";
         if (this.view.imgAmountSort.src === "sorting_next.png" || this.view.imgAmountSort.src === "sorting.png") {
            image = "sorting_previous.png",
            this.criteria["order"] = "asc";
            this.view.flxAmountSort.accessibilityConfig ={
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "Amount column. Sorted in ascending order. Click to Sort in Descending order."
            }
         } else if (this.view.imgAmountSort.src === "sorting_previous.png") {
             image = "sorting_next.png",
             this.criteria["order"] = "desc";
             this.view.flxAmountSort.accessibilityConfig ={
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "Amount column. Sorted in descending order. Click to Sort in Ascending order."
            }
         }
         this.resetSortingImages();
         this.view.imgAmountSort.src = image;
         this.getCacheData();
         if(this.offset === 0)
           this.updateTransactions(this.cacheUtils._sortedData);
		 else{
           var values = {
                  'show': true,
                  'offset': this.offset
                  };
            this.onFirst(values, this.cacheUtils._sortedData);
         }
       } catch (err) {
          var errorObj = {
            "errorInfo": "Error in setting the criteria and invoking column 1 related service call",
            "errorLevel": "Business",
            "error": err
          };
          self.onError(errorObj);
          }
      },
		
	flxTransTypeOnClick: function() {
        var self = this;
        try {
           var image = "sorting.png";
           this.criteria["sortBy"] = "transactionType";
           this.criteria["order"] = "desc";
           this.state = "sortedData";
           if (this.view.imgTypeSort.src === "sorting_next.png" || this.view.imgTypeSort.src === "sorting.png") {
              image = "sorting_previous.png",
              this.criteria["order"] = "asc";
              this.view.flxTypeSort.accessibilityConfig ={
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "Type column. Sorted in ascending order. Click to Sort in Descending order."
            }
           } else if (this.view.imgTypeSort.src === "sorting_previous.png") {
               image = "sorting_next.png",
               this.criteria["order"] = "desc";
               this.view.flxTypeSort.accessibilityConfig ={
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "Type column. Sorted in descending order. Click to Sort in Ascending order."
            }
           }
           this.resetSortingImages();
           this.view.imgTypeSort.src = image;
    	   this.getCacheData();
           if(this.offset === 0)
		   		this.updateTransactions(this.cacheUtils._sortedData);
		   else{
             var values = {
                  'show': true,
                  'offset': this.offset
                  };
             this.onFirst(values, this.cacheUtils._sortedData);
           }
         } catch (err) {
            var errorObj = {
   	            "errorInfo": "Error in setting the criteria and invoking column 1 related service call",
                "errorLevel": "Business",
                 "error": err
            };
            self.onError(errorObj);
         }
   	},
      
    flxBlockedTransAmtOnClick: function() {
       var self = this;
 	   try {
         var image = "sorting.png";
         this.criteria["sortBy"] = "lockedAmount";
         this.criteria["order"] = "desc";
         this.state = "sortedData";
         if (this.view.imgAmt.src === "sorting_next.png" || this.view.imgAmt.src === "sorting.png") {
            image = "sorting_previous.png",
            this.criteria["order"] = "asc";
            this.view.flxAmtSort.accessibilityConfig ={
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "Amount column. Sorted in ascending order. Click to Sort in Descending order."
            }
         } else if (this.view.imgAmt.src === "sorting_previous.png") {
             image = "sorting_next.png",
             this.criteria["order"] = "desc";
             this.view.flxAmtSort.accessibilityConfig ={
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "Amount column. Sorted in descending order. Click to Sort in Ascending order."
            }
         }
         this.resetBlockedTransSortingImages();
         this.view.imgAmt.src = image;
         this.getCacheData();
         this.updateBlockedTransactions(this.cacheUtils._sortedData);
       } catch (err) {
          var errorObj = {
            "errorInfo": "Error in setting the criteria and invoking column 1 related service call",
            "errorLevel": "Business",
            "error": err
          };
          self.onError(errorObj);
          }
      },
      
    flxFromDateOnClick: function() {
       var self = this;
 	   try {
         var image = "sorting.png";
         this.criteria["sortBy"] = "fromDate";
         this.criteria["order"] = "desc";
         this.state = "sortedData";
         if (this.view.imgFromDate.src === "sorting_next.png" || this.view.imgFromDate.src === "sorting.png") {
            image = "sorting_previous.png",
            this.criteria["order"] = "asc";
            this.view.flxFromSort.accessibilityConfig ={
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "From date column. Sorted in ascending order. Click to Sort in Descending order."
            }
         } else if (this.view.imgFromDate.src === "sorting_previous.png") {
             image = "sorting_next.png",
             this.criteria["order"] = "desc";
             this.view.flxFromSort.accessibilityConfig ={
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "From date column. Sorted in descending order. Click to Sort in Ascending order."
            }
         }
         this.resetBlockedTransSortingImages();
         this.view.imgFromDate.src = image;
         this.getCacheData();
         this.updateBlockedTransactions(this.cacheUtils._sortedData);
       } catch (err) {
          var errorObj = {
            "errorInfo": "Error in setting the criteria and invoking column 1 related service call",
            "errorLevel": "Business",
            "error": err
          };
          self.onError(errorObj);
          }
      },
      
    flxToDateOnClick: function() {
       var self = this;
 	   try {
         var image = "sorting.png";
         this.criteria["sortBy"] = "toDate";
         this.criteria["order"] = "desc";
         this.state = "sortedData";
         if (this.view.imgToDate.src === "sorting_next.png" || this.view.imgToDate.src === "sorting.png") {
            image = "sorting_previous.png",
            this.criteria["order"] = "asc";
            this.view.flxToSort.accessibilityConfig ={
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "To date column. Sorted in ascending order. Click to Sort in Descending order."
            }
         } else if (this.view.imgToDate.src === "sorting_previous.png") {
             image = "sorting_next.png",
             this.criteria["order"] = "desc";
             this.view.flxToSort.accessibilityConfig ={
                "a11yARIA": {
                    "role": "button"
                },
                "a11yLabel": "To date column. Sorted in descending order. Click to Sort in Ascending order."
            }
         }
         this.resetBlockedTransSortingImages();
         this.view.imgToDate.src = image;
         this.getCacheData();
         this.updateBlockedTransactions(this.cacheUtils._sortedData);
       } catch (err) {
          var errorObj = {
            "errorInfo": "Error in setting the criteria and invoking column 1 related service call",
            "errorLevel": "Business",
            "error": err
          };
          self.onError(errorObj);
          }
      },
      
    flxDatelonClick: function() {
            var self = this;
            try {
                var image = "sorting.png";
                this.criteria["sortBy"] = "paymentDate";
                this.criteria["order"] = "desc";
                this.state = "sortedData";
                if (this.view.imgDateSortl.src === "sorting_next.png" || this.view.imgDateSortl.src === "sorting.png") {
                    image = "sorting_previous.png",
                        this.criteria["order"] = "asc";
                } else if (this.view.imgDateSortl.src === "sorting_previous.png") {
                    image = "sorting_next.png",
                        this.criteria["order"] = "desc";
                }
                this.resetLoanTransSortingImages();
                this.view.imgDateSortl.src = image;
                this.getCacheData();
                if (this.offset === 0) this.updateLoanTransactions(this.cacheUtils._sortedData);
                else {
                    var values = {
                        'show': true,
                        'offset': this.offset
                    };
                    this.onFirst(values, this.cacheUtils._sortedData);
                }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in setting the criteria and invoking column 1 related service call",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
    },
      
    flxAmountlOnClick: function() {
            var self = this;
            try {
                var image = "sorting.png";
                this.criteria["sortBy"] = "amount";
                this.criteria["order"] = "desc";
                this.state = "sortedData";
                if (this.view.imgAmountSortl.src === "sorting_next.png" || this.view.imgAmountSortl.src === "sorting.png") {
                    image = "sorting_previous.png",
                        this.criteria["order"] = "asc";
                } else if (this.view.imgAmountSortl.src === "sorting_previous.png") {
                    image = "sorting_next.png",
                        this.criteria["order"] = "desc";
                }
                this.resetLoanTransSortingImages();
                this.view.imgAmountSortl.src = image;
                this.getCacheData();
                if (this.offset === 0) this.updateLoanTransactions(this.cacheUtils._sortedData);
                else {
                    var values = {
                        'show': true,
                        'offset': this.offset
                    };
                    this.onFirst(values, this.cacheUtils._sortedData);
                }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in setting the criteria and invoking column 1 related service call",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
    },
      
	flxInterestlOnClick: function() {
            var self = this;
            try {
                var image = "sorting.png";
                this.criteria["sortBy"] = "amount";
                this.criteria["order"] = "desc";
                this.state = "sortedData";
                if (this.view.imgInterestSort.src === "sorting_next.png" || this.view.imgInterestSort.src === "sorting.png") {
                    image = "sorting_previous.png",
                        this.criteria["order"] = "asc";
                } else if (this.view.imgInterestSort.src === "sorting_previous.png") {
                    image = "sorting_next.png",
                        this.criteria["order"] = "desc";
                }
                this.resetLoanTransSortingImages();
                this.view.imgInterestSort.src = image;
                this.getCacheData();
                if (this.offset === 0) this.updateLoanTransactions(this.cacheUtils._sortedData);
                else {
                    var values = {
                        'show': true,
                        'offset': this.offset
                    };
                    this.onFirst(values, this.cacheUtils._sortedData);
                }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in setting the criteria and invoking column 1 related service call",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
    },
     
    getCacheData: function(){
      var self = this;
      try
      {
        //var filterValues = this.getFilterValue();
        if(this.state === "pagination")
        {
          this.cacheUtils.applyPagination(offset, this.noOfRecords);
          this.tab6CacheUtils.pageSize = this.noOfRecords;
        }
        else if(this.state === "filterData")
        {
          this.onResetPagination();
          this.cacheUtils.applyFilter("transactionType",filterValues);
        }
        else if(this.state === "sortedData")
        {
       //   this.onResetPagination();
          this.cacheUtils.applySorting(this.criteria["sortBy"],this.criteria["order"]);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the get cache data method.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
	
	btnDownloadOnClick: function(res){
		var data = res;
        var scope = this;
		data.Id = res.transactionId;
		data.id = "Download";
		data.fromAccountNumber=(scopeObj.context.Account_id) ? scopeObj.context.Account_id : (scopeObj.context.accountID) ? scopeObj.context.accountID : (scopeObj.context.account_id) ? scopeObj.context.account_id : "";
		data.fromAccountName=(scopeObj.context.accountName) ? scopeObj.context.accountName : (scopeObj.context.nickName) ? scopeObj.context.nickName : (scopeObj.context.displayName) ? scopeObj.context.displayName : "";
		var currentForm = kony.application.getCurrentForm();
        rowIndex1 = currentForm.segTransactionList.selectedRowIndex[1];
        secIndex1 = currentForm.segTransactionList.selectedRowIndex[0];
		this.view.flxSTDisclaimerInfo.skin = "sknFlxffffffborderradE3E3E3";
		currentForm.flxSingleTransactionDownload.setVisibility(true);
        currentForm.flxSTPopup.accessibilityConfig = {
            a11yARIA: {
                "role": "dialog",
              tabindex: -1
            }
          };
        currentForm.lblSTHeader.accessibilityConfig = {
            a11yARIA: {
              tabindex: -1
            },
            "tagName": "h2"
          };
        currentForm.btnSTClose.accessibilityConfig = {
            a11yLabel: kony.i18n.getLocalizedString("i18n.settings.closeDeletePopup"),
            a11yARIA: {
              tabindex: 0,
              role: "button"
            }
          };
         currentForm.btnSTCancel.accessibilityConfig = {
            a11yLabel: "Cancel, downloading this transaction process",
            a11yARIA: {
              tabindex: 0,
              role: "button"
            }
          };
         currentForm.btnSTDownload.accessibilityConfig = {
            a11yLabel: "yes,download this transaction process",
            a11yARIA: {
              tabindex: 0,
              role: "button"
            }
          };
        currentForm.lblSTHeader.setActive(true);
		currentForm.btnSTDownload.onClick = function(){
			scopeObj.getContextualData(data);
		currentForm.flxSingleTransactionDownload.setVisibility(false);
		};
		currentForm.btnSTCancel.onClick = function() {
			currentForm.flxSingleTransactionDownload.setVisibility(false);
            scope.setDownloadActive(rowIndex1, secIndex1);
		};
		currentForm.btnSTClose.onClick = function() {
			currentForm.flxSingleTransactionDownload.setVisibility(false);
            scope.setDownloadActive(rowIndex1, secIndex1);
		};                                     
	},
      
    btnDisputeOnClick: function(res){
      	var data = res;
      	data.id = "Dispute";
		data.fromAccountNumber=(scopeObj.context.Account_id) ? scopeObj.context.Account_id : (scopeObj.context.accountID) ? scopeObj.context.accountID : (scopeObj.context.account_id) ? scopeObj.context.account_id : "";
        data.fromAccountName=(scopeObj.context.accountName) ? scopeObj.context.accountName : (scopeObj.context.nickName) ? scopeObj.context.nickName : (scopeObj.context.displayName) ? scopeObj.context.displayName : "";
		data.accountName = scopeObj.context.accountName;
        scopeObj.getContextualData(data);
    },
      
    btnPayOverdueOnClick: function(res){
      	var data = res;
      	data.id = "payOverDue";
		data.accountName = scopeObj.context.accountName;
        scopeObj.getContextualData(data);
    },
    setDownloadActive: function(rowIndex, secIndex){
        var scope = this;
        if (scope.view.segTransactionList.rowTemplate === "flx5ColumnTemplateChangeDesktop") {
            scope.view.segTransactionList.setActive(rowIndex, secIndex, "flx5ColumnTemplateChangeDesktop.flxRowGroup.flxExpandedView.flx3.flxDownload");
        } else if (scope.view.segTransactionList.rowTemplate === "flx5ColumnTemplateTablet") {
            scope.view.segTransactionList.setActive(rowIndex, secIndex, "flx5ColumnTemplateTablet.flxRowGroup.flxExpandedView.flx4.flxDownload");
        } else {
            scope.view.segTransactionList.setActive(rowIndex, secIndex, "flx5ColumnTemplateChangeMobile.flxRowGroup.flxExpandedView.flxDownload");
        }
    },
    cacheCallBack: function(data,params){
		this.totalRecords = params.pagination.totalSize;
	},
    renderSearchUI: function(visible) {
        var scope = this;
        this.view.flxAdvanceSearch.setVisibility(false);
        this.view.flxFilters.setVisibility(!visible);
        this.view.flxSearchItems.setVisibility(visible);
        this.view.flxSearchResultActions.setVisibility(visible);
        this.view.flxSearch.setVisibility(!visible);
        this.view.btnClearSearch.onClick = function() {
          		searchPerformed = false;
				scope.view.btnAdvanceSeachResults.setVisibility(false);
				scope.view.flxActionsContainer.skin = "sknFlxBottomBorder";
                if(scopeObj.selectedTab=="Blocked")
                {
                     scope.offset = 0;
                scope.performBlockedSearch = false;
                scope.renderSearchUI(false);
                     scopeObj.selectedTab = "Blocked";
                scopeObj.view.btnAll.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
                scopeObj.view.btnFilter2.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
                scopeObj.view.btnFilter3.skin = "sknBtnSSPSemiboldSelected";
                     kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AccountsUIModule",
                        "appName": "ArrangementsMA"
                    }).presentationController.getBlockedTransactions(this.account);
               
                } else {
            scope.offset = 0;
            scope.performTransactionSearch = false;
            scope.renderSearchUI(false);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.showSelectedAccountTransaction(this.account, null, null, false);

            }
        }
        this.view.btnModifySearch.onClick = function() {
	    searchPerformed = false;
            scope.view.flxAdvanceSearch.setVisibility(true);
        }
            if (this.performTransactionSearch || this.performBlockedSearch) {
            this.showSearchItems();
        }
    },
    showSearchItems: function() {
    	this.showFlexSearchType(false);
        this.showFlexSearchDateRange(false);
        this.showFlexSearchKeyword(false);
        this.showFlexSearchAmountRange(false);
        this.showFlexSearchCheckNumber(false);

        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
            this.view.flxSearchItemMobile.setVisibility(true);
            this.view.flxSearchItemResponsive.setVisibility(false);
        }else{
            this.view.flxSearchItemMobile.setVisibility(false);
            this.view.flxSearchItemResponsive.setVisibility(true);
        }

        if(this.performTransactionSearch){
           if (this.transactionSearcCriteria.searchDescription!=undefined && this.transactionSearcCriteria.searchDescription != "") {
               this.showFlexSearchKeyword(true);
               this.view.lblKeywordValue.text = this.view.txtKeyword.text;
               this.view.lblKeywordValueMobile.text = this.view.txtKeyword.text;
               this.view.flxCancelKeyword.onClick = this.clearSearchItem.bind(this, ["searchDescription"]);
               this.view.flxCancelKeywordMobile.onClick = this.clearSearchItem.bind(this, ["searchDescription"]);
           }
           if ((this.transactionSearcCriteria.transactionType != "" || this.transactionSearcCriteria.transactionType != null) && this.view.lstbxTransactionType.selectedKey != "All") {
               this.showFlexSearchType(true);
               this.view.lblTypeValue.text = this.view.lstbxTransactionType.selectedKeyValue[1];
               this.view.lblTypeValueMobile.text = this.view.lstbxTransactionType.selectedKeyValue[1];
               this.view.lblTypeTitle.text = "Type: ";
               this.view.lblTypeTitleMobile.text = "Type: ";
               this.view.flxCancelType.onClick = this.clearSearchItem.bind(this, ["transactionType"]);
               this.view.flxCancelTypeMobile.onClick = this.clearSearchItem.bind(this, ["transactionType"]);
            }
            if (this.transactionSearcCriteria.searchMinAmount != "" || this.transactionSearcCriteria.searchMaxAmount != "") {
                this.showFlexSearchAmountRange(true);
                this.view.lblAmountRangeValue.text = this.accountCurrency + this.view.txtAmountRangeFrom.text + " to " + this.accountCurrency+ this.view.txtAmountRangeTo.text;
                this.view.lblAmountRangeValueMobile.text = this.view.lblAmountRangeValue.text;
                this.view.flxCancelAmountRange.onClick = this.clearSearchItem.bind(this, ["searchMinAmount", "searchMaxAmount"]);
                this.view.flxCancelAmountRangeMobile.onClick = this.clearSearchItem.bind(this, ["searchMinAmount", "searchMaxAmount"]);
            }
             if (this.transactionSearcCriteria.fromCheckNumber != "" || this.transactionSearcCriteria.toCheckNumber != "") {
                this.showFlexSearchCheckNumber(true);
                this.view.lblCheckNumberValue.text = "" + this.view.txtCheckNumberFrom.text + " to " + this.view.txtCheckNumberTo.text;
                this.view.lblCheckNumberValueMobile.text = this.view.lblCheckNumberValue.text;
                this.view.flxCancelCheckNumber.onClick = this.clearSearchItem.bind(this, ["fromCheckNumber", "toCheckNumber"]);
                this.view.flxCancelCheckNumberMobile.onClick = this.clearSearchItem.bind(this, ["fromCheckNumber", "toCheckNumber"]);
            }
        }else if(this.performBlockedSearch){
        	if (this.transactionSearcCriteria.lockReason!=undefined && this.transactionSearcCriteria.lockReason != "") {
               this.showFlexSearchKeyword(true);
               this.view.lblKeywordValue.text = this.view.txtKeywordBlocked.text;
               this.view.lblKeywordValueMobile.text = this.view.txtKeywordBlocked.text;
               this.view.flxCancelKeyword.onClick = this.clearSearchItem.bind(this, ["lockReason"]);
               this.view.flxCancelKeywordMobile.onClick = this.clearSearchItem.bind(this, ["lockReason"]);
             }
             if (this.transactionSearcCriteria.lockedEventId!=undefined && this.transactionSearcCriteria.lockedEventId != "") {
                this.showFlexSearchType(true);
                this.view.lblTypeValue.text = this.view.txtReference.text;
                this.view.lblTypeValueMobile.text = this.view.txtReference.text;
                this.view.lblTypeTitle.text = kony.i18n.getLocalizedString('kony.mb.chequeManagement.refNumber');
                this.view.lblTypeTitleMobile.text = kony.i18n.getLocalizedString('kony.mb.chequeManagement.refNumber');
                this.view.flxCancelType.onClick = this.clearSearchItem.bind(this, ["lockedEventId"]);
                this.view.flxCancelTypeMobile.onClick = this.clearSearchItem.bind(this, ["lockedEventId"]);
             }
        }
        if (this.transactionSearcCriteria.searchStartDate != "" || this.transactionSearcCriteria.searchEndDate != "") {
            this.showFlexSearchDateRange(true);
            var startDate = this.transactionSearcCriteria["searchStartDate"].replaceAll("-", "/");
            var endDate = this.transactionSearcCriteria["searchEndDate"].replaceAll("-", "/");      
            var displayStartDate = this.transactionSearcCriteria["displayStartDate"];
            var displayEndDate = this.transactionSearcCriteria["displayEndDate"];
            var dateFormat = applicationManager.getConfigurationManager().getDateFormatCP();
            if(dateFormat === "dmy"){
                this.view.lblDateRangeValue.text = "" + displayStartDate + " to " + displayEndDate;
                this.view.lblDateRangeValueMobile.text = this.view.lblDateRangeValue.text;
            }
            else{
                this.view.lblDateRangeValue.text = "" + startDate + " to " + endDate;
                this.view.lblDateRangeValueMobile.text = this.view.lblDateRangeValue.text;
            }
            if (this.view.lstbxTimePeriod.selectedKey != "CustomDateRange") {
                this.view.lblDateRangeValue.text = this.view.lstbxTimePeriod.selectedKeyValue[1];
                this.view.lblDateRangeValueMobile.text = this.view.lblDateRangeValue.text;
            }
            this.view.flxCancelDateRange.onClick = this.showClearSearchError;//this.clearSearchItem.bind(this, ["searchStartDate", "searchEndDate","searchStartDate"]);
            this.view.flxCancelDateRangeMobile.onClick = this.showClearSearchError;//this.clearSearchItem.bind(this, ["searchStartDate", "searchEndDate","searchStartDate"]);
        }
        this.view.forceLayout();
    },

    showClearSearchError: function(){
        var scope = this;
        this.view.flxClearSearchError.setVisibility(true);
        this.view.btnSEOk.onClick = function(){
            scope.view.flxClearSearchError.setVisibility(false);
        }
        this.view.btnSECancel.onClick = function(){
            scope.view.flxClearSearchError.setVisibility(false);
        }
        this.view.btnSEClose.onClick = function(){
            scope.view.flxClearSearchError.setVisibility(false);
        }
    },

    clearSearchItem: function(searchFields) {
	searchPerformed = false;
        
        if(searchFields[0] === "transactionType"){
            this.view.lstbxTransactionType.selectedKey = "All";
            this.transactionSearcCriteria.transactionType = "All";
        } 
        else{
            for (var i = 0; i < searchFields.length; i++) {
                this.transactionSearcCriteria[searchFields[i]] = "";
            }
        }     
        this.showSearchItems();
            if(this.performTransactionSearch)
        this.initiateTransactionSearch(this.transactionSearcCriteria);
            else
            this.initiateBlockedFundsSearch(this.transactionSearcCriteria);

    },
    initiateTransactionSearch: function(params) {
        FormControllerUtility.showProgressBar(this.view);
        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "appName": "ArrangementsMA",
            "moduleName": "AccountsUIModule"
        }).presentationController;
        accountsModule.searchTransactionForAccount(params);
    },
        initiateBlockedFundsSearch: function(params) {
             FormControllerUtility.showProgressBar(this.view);
        this.blockedSearchCriteria = params;
             scopeObj.transactionSearcCriteria = params;
        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "appName": "ArrangementsMA",
            "moduleName": "AccountsUIModule"
        }).presentationController;
        accountsModule.searchBlockedTransactions(params);
    },
    prepareCriteriaForSearch: function() {
        var dateObj = this.getDateRange();
        var params = {
            "accountID": this.account.accountID,
            "transactionType": this.view.lstbxTransactionType.selectedKey,
            "offset": 1,
            "isScheduled": false,
            "order": "desc",
            "requestType": "search",
            "searchMinAmount": this.view.txtAmountRangeFrom.text,
            "searchMaxAmount": this.view.txtAmountRangeTo.text,
            "searchDescription": this.view.txtKeyword.text,
            "searchStartDate": dateObj.startDate,
            "searchEndDate": dateObj.endDate,
            "displayEndDate": dateObj.displayEndDate,
            "displayStartDate": dateObj.displayStartDate,
            "searchDateRange": scopeObj.view.lstbxTimePeriod.selectedKey,
            "fromCheckNumber": this.view.txtCheckNumberFrom.text,
            "toCheckNumber": this.view.txtCheckNumberTo.text
        }
        if(scopeObj.view.imgRadioBtnAccountType1.text == "L")
        {
            params.lockReason=this.view.txtKeywordBlocked.text;
            params.lockedEventId=this.view.txtReference.text;
                params.pageStart =1;
        }
        return params;
    },
    getDateRange: function() {
        var dateObj = {
            "startDate": "",
            "endDate": "",
            "displayStartDate": "",
            "displayEndDate": ""
        }
        var date = new Date();
        if (scopeObj.view.lstbxTimePeriod.selectedKey != "CustomDateRange") {
            dateObj.endDate = "" + date.getFullYear() + "-" + this.getNumber(parseInt(date.getMonth() + 1)) + "-" + this.getNumber(date.getDate());
            switch (scopeObj.view.lstbxTimePeriod.selectedKey) {
                case "7days":
                    date = new Date(new Date().setDate(date.getDate() - 7));
                    dateObj.startDate = "" + date.getFullYear() + "-" + this.getNumber(parseInt(date.getMonth() + 1)) + "-" + this.getNumber(date.getDate());
                    break;
                case "14days":
                    date = new Date(new Date().setDate(date.getDate() - 14));
                    dateObj.startDate = "" + date.getFullYear() + "-" + this.getNumber(parseInt(date.getMonth() + 1)) + "-" + this.getNumber(date.getDate());
                    break;
                case "1month":
                    date = new Date(new Date().setDate(date.getDate() - 30));
                    dateObj.startDate = "" + date.getFullYear() + "-" + this.getNumber(parseInt(date.getMonth() + 1)) + "-" + this.getNumber(date.getDate());
                    break;
                case "2month":
                    date = new Date(new Date().setDate(date.getDate() - 61));
                    dateObj.startDate = "" + date.getFullYear() + "-" + this.getNumber(parseInt(date.getMonth() + 1)) + "-" + this.getNumber(date.getDate());
                    break;
                case "6month":
                    date = new Date(new Date().setDate(date.getDate() - 182));
                    dateObj.startDate = "" + date.getFullYear() + "-" + this.getNumber(parseInt(date.getMonth() + 1)) + "-" + this.getNumber(date.getDate());
                    break;
                case "12month":
                    date = new Date(new Date().setDate(date.getDate() - 365));
                    dateObj.startDate = "" + date.getFullYear() + "-" + this.getNumber(parseInt(date.getMonth() + 1)) + "-" + this.getNumber(date.getDate());
                    break;
                default:
                    dateObj.startDate = "";
                    dateObj.endDate = "";
            }
        }else{
            fromDate = this.view.calDateFrom.dateComponents;
            toDate = this.view.calDateTo.dateComponents;
            dateObj.endDate = "" + toDate[2] + "-" + this.getNumber(toDate[1]) + "-" + this.getNumber(toDate[0]);
            dateObj.startDate = "" + fromDate[2] + "-" + this.getNumber(fromDate[1]) + "-" + this.getNumber(fromDate[0]);
            dateObj.displayEndDate = "" + this.getNumber(toDate[0]) + "/" + this.getNumber(toDate[1]) + "/" + toDate[2];
            dateObj.displayStartDate = "" + this.getNumber(fromDate[0]) + "/" + this.getNumber(fromDate[1]) + "/" + fromDate[2];
        }
        return dateObj;
    },
    setCalenderDate: function(date){
        var dateComponents = date.split("-")
        this.view.calDateFrom.dateComponents = [
            parseInt(dateComponents[2]),
            parseInt(dateComponents[1]),
            parseInt(dateComponents[0])
        ];
        this.view.calDateTo.dateComponents = [
            parseInt(dateComponents[2]),
            parseInt(dateComponents[1]),
            parseInt(dateComponents[0])
        ];
    },
    getNumber: function(num) {
        if (num > -1 && num < 10) {
            return "0" + num;
        }
        return "" + num;
    },
      
	showAdhocStatementDownloadMessage: function(errorMessage) {
       var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      // this.view.lblDowntimeWarning.text = errorMessage;
     //  this.view.flxDowntimeWarning.setVisibility(true);
    //   this.view.lblDowntimeWarning.setFocus(true);
       this.view.flxAdhocLink.setVisibility(true);
       this.view.flxBackNavigation.top = "25dp";
       this.updateRightContainerUI();
       this.AdjustScreen();
       this.view.lblAdhocLink.setFocus(true);
    },
        navigationToAdhocStatements: function() {
			var params = {
				"adhoc" : "adhoc",
				"account" : this.context
			};
      new kony.mvc.Navigation({
            "appName": "ArrangementsMA",
            "friendlyName": "frmViewStatements"
            }).navigate(params);
        
    },
    showMobQuickLinksActions: function() {
            if (this.view.quicklinksMobile.isVisible) {
                this.view.quicklinksMobile.isVisible = false; /*quick links Mobile*/
                this.view.imgSecActionsMobile.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            } else {
                this.view.quicklinksMobile.right = "0dp"; /*quick links Mobile*/
                this.view.quicklinksMobile.width = "94.5%";
                this.view.quicklinksMobile.isVisible = true; /*quick links Mobile*/
                this.view.imgSecActionsMobile.src = ViewConstants.IMAGES.ARRAOW_UP;
                var top = this.view.flxActions.info.frame.y + 100;
                if (this.view.flxDowntimeWarning.isVisible) {
                    top = top + 80;
                }
              	if(this.summaryOnClick === true){
					if (this.view.flxRenewExpired.isVisible === true && this.view.flxDowntimeWarning.isVisible === true) {
						this.view.quicklinksMobile.top = "565dp";
					} else if (this.view.flxRenewExpired.isVisible === true || this.view.flxDowntimeWarning.isVisible === true) {
						this.view.quicklinksMobile.top = "431dp";
					} else {
						this.view.quicklinksMobile.top = "387dp";
					}
				}else{
					if (this.view.flxRenewExpired.isVisible === true && this.view.flxDowntimeWarning.isVisible === true) {
						this.view.quicklinksMobile.top = "670dp";
					} else if (this.view.flxRenewExpired.isVisible === true || this.view.flxDowntimeWarning.isVisible === true) {
						this.view.quicklinksMobile.top = "536dp";
					} else {
						this.view.quicklinksMobile.top = "492dp";
					}
				}
                this.view.quicklinksMobile.left = "10dp";
            } 
            this.view.forceLayout();           
        },  
        showFlexSearchType: function(visible) {
            var scope = this;
            scope.view.lblTypeTitle.setVisibility(visible);
            scope.view.lblTypeValue.setVisibility(visible);
            scope.view.flxCancelType.setVisibility(visible); 
            scope.view.flxTypeMobile.setVisibility(visible);      
        }, 
        showFlexSearchDateRange: function(visible) {
            var scope = this;
            scope.view.lblDateRangeTitle.setVisibility(visible);
            scope.view.lblDateRangeValue.setVisibility(visible);
            scope.view.flxCancelDateRange.setVisibility(visible);
            scope.view.flxDateRangeMobile.setVisibility(visible);     
        }, 
        showFlexSearchKeyword: function(visible) {
            var scope = this;
            scope.view.lblKeywordTitle.setVisibility(visible);
            scope.view.lblKeywordValue.setVisibility(visible);
            scope.view.flxCancelKeyword.setVisibility(visible);
            scope.view.flxKeywordMobile.setVisibility(visible);
        }, 
        showFlexSearchAmountRange: function(visible) {
            var scope = this;
            scope.view.lblAmountRangeTitle.setVisibility(visible);
            scope.view.lblAmountRangeValue.setVisibility(visible);
            scope.view.flxCancelAmountRange.setVisibility(visible);
            scope.view.flxAmountRangeMobile.setVisibility(visible);   
        }, 
        showFlexSearchCheckNumber: function(visible) {
            var scope = this;
            scope.view.lblCheckNumberTitle.setVisibility(visible);
            scope.view.lblCheckNumberValue.setVisibility(visible);
            scope.view.flxCancelCheckNumber.setVisibility(visible);
            scope.view.flxCheckNumberMobile.setVisibility(visible);
        },    
        setUpNewQuickLinks:function(account){
            var scope = this;
            var context = {
                "accountType" : account.accountType,
                "parentScope": scope,
                "entitlements": [],
                "links": [{
                    "entitlement": ["BILL_PAY"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.creditCard")],
                    "fontIconText": "\ue985",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("kony.tab.BillPay.PayBill"),
                    "linkAction": "actionPayBill",
                    "visible": applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA")
                },
                {
                    "entitlement": ["default"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.creditCard"),kony.i18n.getLocalizedString("i18n.accounts.savings"),kony.i18n.getLocalizedString("i18n.accounts.checking")],
                    "fontIconText": "\ue985",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.StopCheckPayments.DisputedTransactions"),
                    "linkAction": "actionViewDisputedTransactions",
                    "visible": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                },
                {
                    "entitlement": ["VIEW_COMBINED_STATEMENTS", "VIEW_ESTATEMENTS"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.creditCard"),kony.i18n.getLocalizedString("i18n.accounts.deposit"),kony.i18n.getLocalizedString("i18n.accounts.loan"),kony.i18n.getLocalizedString("i18n.account.mortgage"),kony.i18n.getLocalizedString("i18n.accounts.savings"),kony.i18n.getLocalizedString("i18n.accounts.checking")],
                    "fontIconText": "\ue97c",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.ViewStatements.STATEMENTS"),
                    "linkAction": "actionViewStatements",
                    "visible": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                },
                {
                    "entitlement": ["default"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.loan"),kony.i18n.getLocalizedString("i18n.account.mortgage")],
                    "fontIconText": "\ue95e",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payDueAmount"),
                    "linkAction": "actionPayDueAmount",
                    "visible": applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA")
                },
                {
                    "entitlement": ["default"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.loan"),kony.i18n.getLocalizedString("i18n.account.mortgage")],
                    "fontIconText": "\ue949",
                    "fontIconSkin": "",
                    "linkText":  kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payoffLoan"),
                    "linkAction": "actionPayoffLoan",
                    "visible": applicationManager.getConfigurationManager().isMicroAppPresent("BillPayMA")
                },
                {
                    "entitlement": ["default"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.loan"),kony.i18n.getLocalizedString("i18n.account.mortgage"),kony.i18n.getLocalizedString("i18n.accounts.creditCard"),kony.i18n.getLocalizedString("i18n.accounts.savings"),kony.i18n.getLocalizedString("i18n.accounts.checking")],
                    "fontIconText": "\ue973",
                    "fontIconSkin": "",
                    "linkText":  kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.updateAccountSettings"),
                    "linkAction": "actionUpdateAccountSettings",
                    "visible": applicationManager.getConfigurationManager().isMicroAppPresent("ManageArrangementsMA")
                },
                {
                    "entitlement": ["EARLY_PARTIAL_REPAYMENT-VIEW"],
                    "accountTypes": ["mortgageFacility"],
                    "fontIconText": "\ue971",
                    "fontIconSkin": "",
                    "linkText":  "Partial Repayment",
                    "linkAction": "actionPartialRepayment",
                    "visible": true
                },
                {
                    "entitlement": ["MESSAGES_CREATE_OR_REPLY-VIEW"],
                    "accountTypes": ["mortgageFacility"],
                    "fontIconText": "\ue953",
                    "fontIconSkin": "",
                    "linkText":  "Raise a Request",
                    "linkAction": "actionRaiseARequest",
                    "visible": true
                },
                {
                    "entitlement": ["CHANGE_REPAYMENT_ACCOUNT-VIEW"],
                    "accountTypes": ["mortgageFacility"],
                    "fontIconText": "\ue900",
                    "fontIconSkin": "",
                    "linkText":  "Change Repayment Account",
                    "linkAction": "actionChangeRepaymentAccount",
                    "visible": true
                },
                {
                    "entitlement": ["default"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.savings"), kony.i18n.getLocalizedString("i18n.accounts.checking")],
                    "fontIconText": "\ue96e",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.billPay.BillPayMakeTransfer"),
                    "linkAction": "actionTransferMoney",
                    "visible": ("false" != account.isBusinessAccount && account.isBusinessAccount && void 0 !== account.isBusinessAccount) && ("UTF" !== applicationManager.getConfigurationManager().TransferFlowType && applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA"))
                },
                {
                    "entitlement": ["default"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.savings"), kony.i18n.getLocalizedString("i18n.accounts.checking")],
                    "fontIconText": "\ue96e",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.accounts.paymoney"),
                    "linkAction": "actionPayMoney",
                    "visible": ("false" != account.isBusinessAccount && account.isBusinessAccount && void 0 !== account.isBusinessAccount) && applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")
                }, {
                    "entitlement": ["GOAL_POT_VIEW", "BUDGET_POT_VIEW"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.savings"), kony.i18n.getLocalizedString("i18n.accounts.checking")],
                    "fontIconText": "\ue962",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.savingsPot.mySavingsPot"),
                    "linkAction": "actionSavingsPot",
                    "visible": !("false" != account.isBusinessAccount && account.isBusinessAccount && void 0 !== account.isBusinessAccount) && applicationManager.getConfigurationManager().isMicroAppPresent("SavingsPotMA")
                },
                {
                    "entitlement": ["default"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.savings"), kony.i18n.getLocalizedString("i18n.accounts.checking")],
                    "fontIconText": "\ue95e",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.accounts.paymoney"),
                    "linkAction": "actionPayMoney",
                    "visible": !("false" != account.isBusinessAccount && account.isBusinessAccount && void 0 !== account.isBusinessAccount) && applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")
                },
                {
                    "entitlement": ["STOP_PAYMENT_REQUEST_CREATE"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.savings"), kony.i18n.getLocalizedString("i18n.accounts.checking")],
                    "fontIconText": "\ue922",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.ChequeManagement.StopChequeRequest"),
                    "linkAction": "actionRequestStopCheques",
                    "visible": applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                },
                {
                    "entitlement": ["CLOSE_ACCOUNT-CREATE"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.savings"), kony.i18n.getLocalizedString("i18n.accounts.checking")],
                    "fontIconText": "\ue900",
                    "fontIconSkin": "",
                    "linkText": "Close This Account",
                    "linkAction": "showPopup",
                    "visible": (!kony.sdk.isNullOrUndefined(this.account.accountStatus) && "ACTIVE" == this.account.accountStatus && (kony.sdk.isNullOrUndefined(this.account.currentBalance) || "0" === this.account.currentBalance || "" === this.account.currentBalance))
                },
                {
                    "entitlement": ["ACCOUNT_SWEEP_VIEW","ACCOUNT_SWEEP_CREATE"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.savings"), kony.i18n.getLocalizedString("i18n.accounts.checking")],
                    "fontIconText": "\ue96f",
                    "fontIconSkin": "",
                    "linkText": "Manage Sweep",
                    "linkAction": "actionViewSweep",
                    "visible": applicationManager.getConfigurationManager().isMicroAppPresent("AccountSweepsMA")
                },
                {
                    "entitlement": ["CHEQUE_BOOK_REQUEST_CREATE"],
                    "accountTypes": [kony.i18n.getLocalizedString("i18n.accounts.savings"), kony.i18n.getLocalizedString("i18n.accounts.checking")],
                    "fontIconText": "\ue921",
                    "fontIconSkin": "",
                    "linkText": kony.i18n.getLocalizedString("i18n.ChequeBookReq.ChequeBookRequest"),
                    "linkAction": "actionRequestChequeBook",
                    "visible": applicationManager.getConfigurationManager().checkAccountAction(this.landingSelectedAccount, "CHEQUE_BOOK_REQUEST_CREATE") && applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")
                }
            ]            
        };
        var accountID = account.Account_id || account.accountID || account.accountNumber
        context['entitlements'] = applicationManager.getConfigurationManager().accountPermissions[accountID]["actions"];
        context.entitlements = context.entitlements.concat(applicationManager.getConfigurationManager().getUserPermissions());
        context.entitlements = context.entitlements.concat(applicationManager.getConfigurationManager().getUserFeatures());
        this.view.quickLinksNew.setContext(context);
        },
        hideQuickLniks:function(){
            this.view.quickLinksNew.setVisibility(false);
        }
    };
});